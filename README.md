# Congreso Origami Bogotá

Este repositorio reúne las aplicaciones del sitio y la administración de **Origami Bogotá**.

## Aplicaciones del repositorio

| Ruta | Aplicación | Stack | Propósito |
| --- | --- | --- | --- |
| `/` | Frontend web principal | Angular 19 + SSR | Sitio público, páginas informativas, inscripciones, talleres, recursos y CMS bajo `/congreso/*`. |
| `/app-ob` | Backend/API | Laravel 9 | API consumida por el frontend, autenticación del CMS y lógica de datos del congreso. |

## Cómo se conectan

- El frontend Angular consume la API definida en `src/environments/environment*.ts`.
- En desarrollo, el frontend apunta a `http://origami.test/api`.
- En producción, el frontend apunta a `https://origamibogota.com/app-ob/api`.
- El área administrativa del frontend vive en rutas `/congreso/*`, pero sus datos y autenticación dependen del backend Laravel.

## Frontend Angular (raíz del repo)

Aplicación Angular standalone con SSR. El build genera salida en `dist/angular-ob` y puede servirse con Node.

### Comandos principales

```bash
npm install
npm start
npm run build
npm test
```

### Otros comandos útiles

```bash
npm run watch
npm run serve:ssr:angular-ob
npx ng test --watch=false --include="src/app/components/workshops-menu/workshops-menu.component.spec.ts" --browsers=ChromeHeadless
```

### Responsabilidades principales

- Sitio público multilenguaje con prefijos `/en`, `/pt` y `/fr`
- Rutas públicas como `inscripciones`, `talleres`, `recursos` y `booklet`
- CMS en `/congreso/login`, `/congreso/dashboard`, `/congreso/asistentes` y `/congreso/talleres`
- SEO y traducciones gestionados desde la propia app Angular

## Backend Laravel (`app-ob/`)

Aplicación Laravel que actúa como backend del proyecto. Contiene `artisan`, `composer.json`, `phpunit.xml`, `resources/`, `database/` y el pipeline de assets con Laravel Mix.

### Comandos de frontend/assets dentro de `app-ob`

```bash
cd app-ob
npm install
npm run dev
npm run watch
npm run prod
```

### Archivos clave del backend

- `app-ob/.env` y `app-ob/.env.example`: configuración del entorno Laravel
- `app-ob/composer.json`: dependencias PHP y configuración base del proyecto
- `app-ob/package.json`: build de assets con Laravel Mix
- `app-ob/database/`: migraciones, factories y seeders del backend

## Estructura útil adicional

- `public/`: assets estáticos servidos por Angular
- `src/`: código fuente del frontend Angular
- `.github/copilot-instructions.md`: guía interna para futuras sesiones de Copilot en este repositorio
- `MANUAL_USUARIO.md`: documentación funcional para usuarios

## Nota rápida de arranque

Si vas a trabajar localmente en el flujo completo:

1. Levanta o configura el backend Laravel para exponer la API esperada.
2. Verifica que `src/environments/environment.ts` apunte a esa URL local.
3. Inicia el frontend Angular desde la raíz con `npm start`.
