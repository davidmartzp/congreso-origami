#!/usr/bin/env python3
"""
optimize_images.py — Compresor de imágenes para angular-ob
=============================================================
Recorre los directorios de imágenes del proyecto, comprime JPG/PNG,
opcionalmente convierte a WebP y genera un reporte detallado.

Uso:
    python3 optimize_images.py              # modo interactivo
    python3 optimize_images.py --dry-run    # sólo muestra qué haría, sin modificar
    python3 optimize_images.py --webp       # convierte también a WebP
    python3 optimize_images.py --restore    # restaura los backups originales
    python3 optimize_images.py --help       # muestra esta ayuda
"""

import argparse
import os
import shutil
import sys
from pathlib import Path
from typing import NamedTuple

try:
    from PIL import Image, ImageOps
except ImportError:
    print("❌  Pillow no está instalado. Ejecuta: pip install Pillow")
    sys.exit(1)

# ── Configuración ────────────────────────────────────────────────────────────

SCAN_DIRS = [
    "public/images",
    "app-ob/storage/app/public/images",
]

BACKUP_SUFFIX = ".bak_original"

# Calidad JPEG (1-95). 82 es un buen equilibrio calidad/tamaño.
JPEG_QUALITY = 82

# Calidad WebP (1-100).
WEBP_QUALITY = 80

# Ancho máximo en píxeles. Las imágenes más anchas se redimensionan
# manteniendo la proporción. 0 = no redimensionar.
MAX_WIDTH = 1920

# Alto máximo en píxeles. 0 = no redimensionar.
MAX_HEIGHT = 1920

# Extensiones que se procesarán
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp"}

# Extensiones que no se comprimen por su naturaleza vectorial/animada
SKIP = {".svg", ".gif", ".ico"}

# ── Tipos ────────────────────────────────────────────────────────────────────

class Result(NamedTuple):
    path: Path
    original_bytes: int
    final_bytes: int
    action: str          # "compressed", "webp", "skipped", "error"
    note: str = ""

# ── Helpers ──────────────────────────────────────────────────────────────────

def human(n: int) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if abs(n) < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"

def savings_pct(original: int, final: int) -> str:
    if original == 0:
        return "0%"
    pct = (1 - final / original) * 100
    return f"{pct:+.1f}%"

def backup_path(p: Path) -> Path:
    return p.with_suffix(p.suffix + BACKUP_SUFFIX)

def has_backup(p: Path) -> bool:
    return backup_path(p).exists()

def make_backup(p: Path) -> None:
    dest = backup_path(p)
    if not dest.exists():
        shutil.copy2(p, dest)

def collect_images(root: Path) -> list[Path]:
    images = []
    for ext in SUPPORTED:
        images.extend(root.rglob(f"*{ext}"))
        images.extend(root.rglob(f"*{ext.upper()}"))
    # Deduplicar y ordenar
    seen = set()
    result = []
    for p in sorted(images):
        if p not in seen:
            seen.add(p)
            result.append(p)
    return result

def resize_if_needed(img: Image.Image) -> tuple[Image.Image, bool]:
    """Redimensiona si supera MAX_WIDTH o MAX_HEIGHT."""
    if MAX_WIDTH == 0 and MAX_HEIGHT == 0:
        return img, False
    w, h = img.size
    max_w = MAX_WIDTH or w
    max_h = MAX_HEIGHT or h
    if w <= max_w and h <= max_h:
        return img, False
    img = ImageOps.exif_transpose(img)  # corrige orientación EXIF antes de resize
    img.thumbnail((max_w, max_h), Image.LANCZOS)
    return img, True

# ── Procesamiento ─────────────────────────────────────────────────────────────

def process_image(path: Path, dry_run: bool, to_webp: bool) -> Result:
    original_bytes = path.stat().st_size
    ext = path.suffix.lower()

    try:
        img = Image.open(path)
    except Exception as e:
        return Result(path, original_bytes, original_bytes, "error", str(e))

    img, was_resized = resize_if_needed(img)

    # ── Convertir a WebP ───────────────────────────────────────────────────
    if to_webp and ext != ".webp":
        webp_path = path.with_suffix(".webp")
        if not dry_run:
            make_backup(path)
            rgb = img.convert("RGB") if img.mode in ("RGBA", "P") else img
            rgb.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
            # Elimina el original sólo si el webp es más pequeño
            if webp_path.stat().st_size < original_bytes:
                path.unlink()
                final_bytes = webp_path.stat().st_size
            else:
                webp_path.unlink()
                final_bytes = original_bytes
        else:
            # En dry-run estimamos el tamaño con una compresión simulada
            import io
            buf = io.BytesIO()
            rgb = img.convert("RGB") if img.mode in ("RGBA", "P") else img
            rgb.save(buf, "WEBP", quality=WEBP_QUALITY, method=6)
            final_bytes = buf.tell()
        note = "→ .webp" + (" + resize" if was_resized else "")
        return Result(path, original_bytes, final_bytes, "webp", note)

    # ── Comprimir en el mismo formato ─────────────────────────────────────
    import io
    buf = io.BytesIO()

    if ext in (".jpg", ".jpeg"):
        # Asegurar modo RGB (JPEGs no soportan transparencia)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        # Preservar info EXIF si existe
        exif = img.info.get("exif", b"")
        kwargs = {"format": "JPEG", "quality": JPEG_QUALITY, "optimize": True}
        if exif:
            kwargs["exif"] = exif
        img.save(buf, **kwargs)

    elif ext == ".png":
        # Para PNGs con transparencia, mantener modo RGBA
        img.save(buf, format="PNG", optimize=True, compress_level=9)

    elif ext == ".webp":
        img.save(buf, format="WEBP", quality=WEBP_QUALITY, method=6)

    compressed_bytes = buf.tell()

    # Solo guardar si hay ahorro real
    if compressed_bytes < original_bytes:
        if not dry_run:
            make_backup(path)
            with open(path, "wb") as f:
                f.write(buf.getvalue())
        final_bytes = compressed_bytes
        note = "resize" if was_resized else ""
    else:
        final_bytes = original_bytes
        note = "ya optimizada"

    return Result(path, original_bytes, final_bytes, "compressed", note)

# ── Restaurar backups ─────────────────────────────────────────────────────────

def restore_backups(root: Path) -> None:
    restored = 0
    for bak in root.rglob(f"*{BACKUP_SUFFIX}"):
        original = bak.with_suffix("")  # quita .bak_original
        # Si el original fue renombrado a .webp, restaurar el original
        if not original.exists():
            # Puede que exista como .webp
            webp = original.with_suffix(".webp")
            if webp.exists():
                webp.unlink()
        shutil.copy2(bak, original)
        bak.unlink()
        print(f"  ✔ Restaurado: {original.name}")
        restored += 1
    if restored == 0:
        print("  No se encontraron backups para restaurar.")
    else:
        print(f"\n  {restored} archivo(s) restaurado(s).")

# ── Reporte ───────────────────────────────────────────────────────────────────

def print_report(results: list[Result], dry_run: bool) -> None:
    total_original = sum(r.original_bytes for r in results)
    total_final = sum(r.final_bytes for r in results)
    saved = total_original - total_final
    errors = [r for r in results if r.action == "error"]

    prefix = "🔍 [DRY-RUN] " if dry_run else ""

    print(f"\n{'─'*65}")
    print(f"  {prefix}REPORTE DE OPTIMIZACIÓN")
    print(f"{'─'*65}")
    print(f"  {'Archivo':<42} {'Antes':>7} {'Después':>7} {'Ahorro':>7}")
    print(f"  {'─'*42} {'─'*7} {'─'*7} {'─'*7}")

    for r in sorted(results, key=lambda x: x.original_bytes - x.final_bytes, reverse=True):
        rel = r.path.relative_to(Path.cwd()) if r.path.is_relative_to(Path.cwd()) else r.path
        name = str(rel)
        if len(name) > 42:
            name = "…" + name[-41:]
        pct = savings_pct(r.original_bytes, r.final_bytes)
        icon = "⚠️ " if r.action == "error" else ("✨" if r.final_bytes < r.original_bytes else "·")
        extra = f" ({r.note})" if r.note else ""
        print(f"  {icon} {name:<40} {human(r.original_bytes):>7} {human(r.final_bytes):>7} {pct:>7}{extra}")

    print(f"{'─'*65}")
    print(f"  Total imágenes procesadas : {len(results)}")
    print(f"  Tamaño original           : {human(total_original)}")
    print(f"  Tamaño final              : {human(total_final)}")
    print(f"  Ahorro total              : {human(saved)} ({savings_pct(total_original, total_final)})")
    if errors:
        print(f"  Errores                   : {len(errors)}")
    print(f"{'─'*65}")
    if not dry_run and saved > 0:
        print("  💾 Backups guardados con sufijo .bak_original")
        print("  🔄 Para restaurar: python3 optimize_images.py --restore")
    print()

# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    global JPEG_QUALITY, WEBP_QUALITY, MAX_WIDTH, MAX_HEIGHT  # noqa: PLW0603
    parser = argparse.ArgumentParser(
        description="Compresor de imágenes para angular-ob",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="Simula la compresión sin modificar archivos")
    parser.add_argument("--webp", action="store_true",
                        help="Convierte imágenes JPG/PNG a WebP")
    parser.add_argument("--restore", action="store_true",
                        help="Restaura los backups originales")
    parser.add_argument("--quality", type=int, default=None,
                        help=f"Calidad JPEG/WebP (1-95, default JPEG={JPEG_QUALITY}, WebP={WEBP_QUALITY})")
    parser.add_argument("--max-width", type=int, default=None,
                        help=f"Ancho máximo px (default={MAX_WIDTH}, 0=sin límite)")
    parser.add_argument("--max-height", type=int, default=None,
                        help=f"Alto máximo px (default={MAX_HEIGHT}, 0=sin límite)")
    parser.add_argument("dirs", nargs="*",
                        help="Directorios adicionales a procesar")
    args = parser.parse_args()

    # Aplicar overrides de configuración
    if args.quality:
        JPEG_QUALITY = args.quality
        WEBP_QUALITY = args.quality
    if args.max_width is not None:
        MAX_WIDTH = args.max_width
    if args.max_height is not None:
        MAX_HEIGHT = args.max_height

    project_root = Path(__file__).parent

    # ── Restaurar ──────────────────────────────────────────────────────────
    if args.restore:
        print("\n🔄 Restaurando backups...\n")
        for d in SCAN_DIRS + list(args.dirs):
            target = (project_root / d) if not Path(d).is_absolute() else Path(d)
            if target.exists():
                restore_backups(target)
        return

    # ── Recopilar directorios ──────────────────────────────────────────────
    targets = []
    all_dirs = SCAN_DIRS + list(args.dirs)
    for d in all_dirs:
        p = (project_root / d) if not Path(d).is_absolute() else Path(d)
        if p.exists():
            targets.append(p)
        else:
            print(f"⚠️  Directorio no encontrado, se omite: {p}")

    if not targets:
        print("❌ No se encontraron directorios de imágenes.")
        sys.exit(1)

    # ── Recopilar imágenes ─────────────────────────────────────────────────
    all_images: list[Path] = []
    for t in targets:
        found = collect_images(t)
        # Excluir backups
        found = [p for p in found if BACKUP_SUFFIX not in p.name]
        all_images.extend(found)

    if not all_images:
        print("No se encontraron imágenes para procesar.")
        return

    mode = "DRY-RUN — " if args.dry_run else ""
    webp_note = " (+ conversión a WebP)" if args.webp else ""
    print(f"\n🖼️  {mode}Procesando {len(all_images)} imagen(es){webp_note}...\n")

    # ── Procesar ───────────────────────────────────────────────────────────
    results: list[Result] = []
    for i, img_path in enumerate(all_images, 1):
        print(f"  [{i:>3}/{len(all_images)}] {img_path.name:<50}", end="\r", flush=True)
        result = process_image(img_path, dry_run=args.dry_run, to_webp=args.webp)
        results.append(result)

    print(" " * 70, end="\r")  # limpiar línea de progreso

    # ── Reporte ────────────────────────────────────────────────────────────
    print_report(results, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
