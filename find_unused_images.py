#!/usr/bin/env python3
"""
find_unused_images.py — Barrido de imágenes no utilizadas en angular-ob
========================================================================
Analiza todos los archivos fuente del proyecto y cruza con las imágenes
en disco para detectar las que nadie referencia.

Fuentes analizadas:
  • src/**  (TypeScript, HTML, SCSS, JSON)
  • app-ob/resources/**  (Blade/PHP de Laravel)
  • Base de datos MySQL → tabla workshops.image  (taller_* dinámicos)

Directorios de imágenes escaneados:
  • public/images/          → referencias estáticas
  • app-ob/storage/app/public/images/ → imágenes de talleres (dinámicas)

Uso:
    python3 find_unused_images.py              # sólo reporte
    python3 find_unused_images.py --delete     # mueve no-usadas a _unused/
    python3 find_unused_images.py --purge      # elimina definitivamente
    python3 find_unused_images.py --help
"""

import argparse
import os
import re
import shutil
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent

# ── Directorios de imágenes en disco ─────────────────────────────────────────

IMAGE_DIRS = [
    PROJECT_ROOT / "public" / "images",
    PROJECT_ROOT / "app-ob" / "storage" / "app" / "public" / "images",
]

# ── Directorios de código fuente a escanear ───────────────────────────────────

SOURCE_DIRS = [
    PROJECT_ROOT / "src",
    PROJECT_ROOT / "app-ob" / "resources",
]

SOURCE_EXTS = {".ts", ".html", ".scss", ".css", ".json", ".php", ".blade"}

# ── Extensiones de imagen consideradas ───────────────────────────────────────

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".JPG", ".JPEG", ".PNG"}

# ── Sufijo de backup al mover ─────────────────────────────────────────────────

UNUSED_SUBDIR = "_unused"

# ── DB (MySQL) ─────────────────────────────────────────────────────────────────

ENV_FILE = PROJECT_ROOT / "app-ob" / ".env"


def load_env(path: Path) -> dict:
    env = {}
    if not path.exists():
        return env
    for line in path.read_text().splitlines():
        line = line.strip()
        if line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        env[k.strip()] = v.strip()
    return env


def fetch_db_images(env: dict) -> set[str]:
    """Consulta MySQL y devuelve el conjunto de filenames usados en workshops."""
    import subprocess

    host     = env.get("DB_HOST", "localhost")
    port     = env.get("DB_PORT", "3306")
    database = env.get("DB_DATABASE", "")
    user     = env.get("DB_USERNAME", "")
    password = env.get("DB_PASSWORD", "")

    # Intentar primero con mysql-connector-python si está disponible
    try:
        import mysql.connector  # type: ignore
        conn = mysql.connector.connect(
            host=host, port=int(port), database=database,
            user=user, password=password, connection_timeout=5,
        )
        cur = conn.cursor()
        cur.execute("SELECT DISTINCT image FROM workshops WHERE image IS NOT NULL AND image != ''")
        rows = {row[0] for row in cur.fetchall()}
        cur.close()
        conn.close()
        return rows
    except ImportError:
        pass
    except Exception as e:
        print(f"  ⚠️  mysql-connector error: {e}")
        return set()

    # Fallback: usar el cliente mysql de línea de comandos con archivo de credenciales
    try:
        import tempfile
        # Escribir credenciales en archivo temporal para evitar problemas con
        # caracteres especiales en el password al pasarlo por shell
        cfg_content = (
            "[client]\n"
            f"host={host}\n"
            f"port={port}\n"
            f"user={user}\n"
            f"password={password}\n"
            f"database={database}\n"
        )
        with tempfile.NamedTemporaryFile(mode="w", suffix=".cnf",
                                         delete=False, prefix=".mysql_tmp_") as tf:
            tf.write(cfg_content)
            cfg_path = tf.name

        try:
            result = subprocess.run(
                [
                    "mysql",
                    f"--defaults-extra-file={cfg_path}",
                    "-e",
                    "SELECT DISTINCT image FROM workshops WHERE image IS NOT NULL AND image != '';",
                    "--batch", "--skip-column-names",
                ],
                capture_output=True, text=True, timeout=10,
            )
        finally:
            os.unlink(cfg_path)

        if result.returncode == 0:
            rows = {line.strip() for line in result.stdout.splitlines() if line.strip()}
            return rows
        else:
            err = result.stderr.strip()
            # Ignorar el warning de password inseguro si hay resultados
            err_clean = "\n".join(l for l in err.splitlines() if "Warning" not in l)
            if err_clean:
                print(f"  ⚠️  mysql CLI error: {err_clean[:120]}")
            return set()
    except FileNotFoundError:
        print("  ⚠️  Cliente mysql no encontrado.")
        return set()
    except Exception as e:
        print(f"  ⚠️  Error consultando BD: {e}")
        return set()

# ── Recolectar imágenes en disco ──────────────────────────────────────────────

def collect_disk_images() -> dict[Path, list[Path]]:
    """Devuelve {directorio_base: [ruta_absoluta, ...]}"""
    result: dict[Path, list[Path]] = {}
    for img_dir in IMAGE_DIRS:
        if not img_dir.exists():
            print(f"  ⚠️  Directorio no encontrado: {img_dir}")
            continue
        files = []
        for ext in IMAGE_EXTS:
            files.extend(img_dir.rglob(f"*{ext}"))
        # Excluir la carpeta _unused (resultados anteriores)
        files = [f for f in files if UNUSED_SUBDIR not in f.parts]
        result[img_dir] = sorted(set(files))
    return result

# ── Extraer referencias en código fuente ─────────────────────────────────────

# Captura cualquier nombre de archivo de imagen (con o sin ruta relativa)
_FILENAME_RE = re.compile(
    r'[\w\-.()\[\] ]+\.(?:jpe?g|png|webp|gif)',
    re.IGNORECASE,
)

def collect_source_references() -> set[str]:
    """Devuelve el conjunto de filenames (sólo nombre, sin directorio) encontrados en el código."""
    refs: set[str] = set()
    for src_dir in SOURCE_DIRS:
        if not src_dir.exists():
            continue
        for root, dirs, files in os.walk(src_dir):
            # Excluir node_modules y dist
            dirs[:] = [d for d in dirs if d not in {"node_modules", "dist", "vendor", ".git"}]
            for fname in files:
                fpath = Path(root) / fname
                if fpath.suffix.lower() not in SOURCE_EXTS:
                    continue
                try:
                    text = fpath.read_text(encoding="utf-8", errors="ignore")
                except OSError:
                    continue
                for match in _FILENAME_RE.findall(text):
                    refs.add(match.strip())
    return refs

# ── Análisis ──────────────────────────────────────────────────────────────────

def analyse(disk: dict[Path, list[Path]],
            code_refs: set[str],
            db_refs: set[str],
            db_available: bool) -> tuple[list[Path], list[Path], list[Path]]:
    """
    Clasifica cada imagen en disco como:
      used      → referenciada en código o BD
      unused    → no referenciada en ningún lado
      db_only   → imagen taller_* sólo verificable por BD (DB no disponible)
    """
    used: list[Path] = []
    unused: list[Path] = []
    unverified: list[Path] = []   # taller_* cuando DB no disponible

    for img_dir, files in disk.items():
        is_taller_dir = "storage" in str(img_dir)

        for fpath in files:
            fname = fpath.name

            # ── Imágenes de talleres (dinámicas) ──────────────────────────
            if is_taller_dir:
                if not db_available:
                    unverified.append(fpath)
                elif fname in db_refs:
                    used.append(fpath)
                else:
                    unused.append(fpath)
                continue

            # ── Imágenes estáticas (public/images) ────────────────────────
            if fname in code_refs:
                used.append(fpath)
            else:
                unused.append(fpath)

    return used, unused, unverified

# ── Reporte ───────────────────────────────────────────────────────────────────

def human(n: int) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if abs(n) < 1024.0:
            return f"{n:.1f} {unit}"
        n /= 1024.0
    return f"{n:.1f} TB"

def print_report(used, unused, unverified, db_available: bool) -> None:
    total_unused_bytes = sum(p.stat().st_size for p in unused)
    total_used_bytes   = sum(p.stat().st_size for p in used)

    print(f"\n{'─'*68}")
    print(f"  RESULTADO DEL BARRIDO")
    print(f"{'─'*68}")

    if unused:
        print(f"\n  ❌  IMÁGENES NO UTILIZADAS ({len(unused)}) — "
              f"liberable: {human(total_unused_bytes)}\n")
        for p in sorted(unused, key=lambda x: -x.stat().st_size):
            rel = p.relative_to(PROJECT_ROOT)
            print(f"    {human(p.stat().st_size):>8}  {rel}")
    else:
        print("\n  ✅  No se encontraron imágenes sin usar.")

    if unverified:
        print(f"\n  ⚠️  NO VERIFICADAS (BD no disponible) — {len(unverified)} imágenes taller_*")
        print(f"      Ejecuta con BD accesible para verificar estas imágenes.")

    print(f"\n{'─'*68}")
    print(f"  Imágenes en uso          : {len(used):>4}  ({human(total_used_bytes)})")
    print(f"  Imágenes sin usar        : {len(unused):>4}  ({human(total_unused_bytes)})")
    if unverified:
        print(f"  Sin verificar (taller_*) : {len(unverified):>4}")
    print(f"{'─'*68}\n")

# ── Acciones ──────────────────────────────────────────────────────────────────

def move_to_unused(files: list[Path]) -> None:
    """Mueve archivos a una carpeta _unused dentro de su directorio padre."""
    moved = 0
    for fpath in files:
        dest_dir = fpath.parent / UNUSED_SUBDIR
        dest_dir.mkdir(exist_ok=True)
        dest = dest_dir / fpath.name
        shutil.move(str(fpath), str(dest))
        print(f"  📦 Movida → {dest.relative_to(PROJECT_ROOT)}")
        moved += 1
    print(f"\n  {moved} archivo(s) movido(s) a carpetas '{UNUSED_SUBDIR}/'.")
    print("  Para restaurarlas: muévelas manualmente de vuelta a su directorio original.")
    print("  Para eliminarlas definitivamente: python3 find_unused_images.py --purge\n")


def purge_files(files: list[Path]) -> None:
    """Elimina definitivamente los archivos."""
    deleted = 0
    freed = 0
    for fpath in files:
        size = fpath.stat().st_size
        fpath.unlink()
        print(f"  🗑️  Eliminada: {fpath.relative_to(PROJECT_ROOT)}")
        freed += size
        deleted += 1
    # También purgar las carpetas _unused si existen
    for img_dir in IMAGE_DIRS:
        unused_dir = img_dir / UNUSED_SUBDIR
        if unused_dir.exists():
            for f in unused_dir.iterdir():
                size = f.stat().st_size
                f.unlink()
                freed += size
                deleted += 1
                print(f"  🗑️  Eliminada: {f.relative_to(PROJECT_ROOT)}")
            unused_dir.rmdir()

    print(f"\n  {deleted} archivo(s) eliminado(s). Espacio liberado: {human(freed)}\n")

# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Barrido de imágenes no utilizadas en angular-ob",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--delete", action="store_true",
                        help="Mueve imágenes no usadas a carpeta _unused/ (seguro, reversible)")
    parser.add_argument("--purge", action="store_true",
                        help="Elimina definitivamente archivos no usados (incluye _unused/ previas)")
    parser.add_argument("--no-db", action="store_true",
                        help="No consultar la base de datos (taller_* se marcan como no verificadas)")
    args = parser.parse_args()

    print("\n🔍 Escaneando imágenes en disco…")
    disk = collect_disk_images()
    total_disk = sum(len(v) for v in disk.values())
    print(f"   {total_disk} imágenes encontradas en disco.")

    print("🔍 Escaneando referencias en código fuente…")
    code_refs = collect_source_references()
    print(f"   {len(code_refs)} nombres de archivo únicos referenciados.")

    # ── Base de datos ──────────────────────────────────────────────────────
    db_refs: set[str] = set()
    db_available = False

    if not args.no_db:
        print("🔍 Consultando base de datos MySQL…")
        env = load_env(ENV_FILE)
        db_refs = fetch_db_images(env)
        if db_refs:
            db_available = True
            print(f"   {len(db_refs)} imágenes de taller referenciadas en BD.")
        else:
            print("   BD no disponible — imágenes taller_* no verificadas.")

    # ── Análisis ───────────────────────────────────────────────────────────
    used, unused, unverified = analyse(disk, code_refs, db_refs, db_available)

    # ── Reporte ────────────────────────────────────────────────────────────
    print_report(used, unused, unverified, db_available)

    if not unused:
        return

    # ── Acciones ───────────────────────────────────────────────────────────
    if args.purge:
        confirm = input(f"  ⚠️  ¿Eliminar definitivamente {len(unused)} archivos? [s/N]: ")
        if confirm.lower() == "s":
            purge_files(unused)
        else:
            print("  Cancelado.\n")
    elif args.delete:
        move_to_unused(unused)
    else:
        print("  Opciones disponibles:")
        print("    --delete   Mueve las no usadas a _unused/  (reversible)")
        print("    --purge    Elimina definitivamente\n")


if __name__ == "__main__":
    main()
