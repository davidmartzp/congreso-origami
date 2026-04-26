# Copilot Instructions

## Build, test, and lint commands

The main workspace is the Angular application at the repository root.

| Task | Command | Notes |
| --- | --- | --- |
| Install dependencies | `npm install` | Run at the repo root. |
| Start the dev server | `npm start` | Runs `ng serve` on the Angular app. |
| Production build | `npm run build` | Builds the SSR app defined in `angular.json`. |
| Development build watch | `npm run watch` | Runs `ng build --watch --configuration development`. |
| Run all Angular unit tests | `npm test` | Runs `ng test`. |
| Run a single spec file | `npx ng test --watch=false --include="src/app/components/workshops-menu/workshops-menu.component.spec.ts" --browsers=ChromeHeadless` | `ng test` supports `--include` for targeted specs. |
| Serve the built SSR app | `npm run serve:ssr:angular-ob` | Expects a successful build first. |

There is currently **no root lint script** and no `lint` target in `angular.json`.

## High-level architecture

- The root project is an **Angular 19 standalone application with SSR**. `angular.json` builds with `outputMode: "server"`, the browser/server bundle is emitted under `dist/angular-ob`, and `src/server.ts` provides the Express SSR entrypoint.
- Routing is centralized in `src/app/app.routes.ts`. The public site uses **Spanish slugs as the canonical route names** (`/inscripciones`, `/talleres`, `/recursos`, etc.). Other languages reuse the same slugs and only add a prefix (`/en`, `/pt`, `/fr`). The CMS/admin area lives under `/congreso/*`.
- Public pages in `src/app/pages/**` are mostly **composition shells** that assemble standalone UI sections from `src/app/components/site/**`. CMS screens use `src/app/pages/cms/**` plus reusable admin UI in `src/app/components/cms/**`.
- Localization is **application-managed**, not Angular i18n. All copy and SEO strings live in `src/app/i18n/translations.ts`. `TranslationService` derives the active language from the URL prefix, exposes signal-based computed translations, and updates `<html lang>`.
- SEO is handled in code. Public pages call `SeoService.setPage(...)`, which reads translated SEO metadata from `TRANSLATIONS` and keeps the canonical URL in sync with router navigation.
- API access is handled by Angular services under `src/app/services/**`, all built from `environment.apiUrl`. Production points to `https://origamibogota.com/app-ob/api`, so the Angular frontend is coupled to the separate Laravel app in `app-ob/`.

## Key conventions

- Prefer **standalone components** and local `imports` arrays. The root app is bootstrapped with `bootstrapApplication`; do not introduce NgModules for new feature work unless an existing area already requires one.
- For new public pages, keep route slugs in Spanish, add them once in `pageRoutes`, and let the language prefix handle locale switching. If the page is public-facing, also wire `SeoService.setPage(...)` and add the matching key under `SiteTranslations['seo']`.
- For translatable UI, read text through `TranslationService` with `computed(() => this.ts.t().section)` and update **all languages together** in `src/app/i18n/translations.ts`.
- CMS authentication is based on `localStorage`, using `OB_access_token` and `OB_user`. Route protection happens in `CongresoAuthGuard`, and authenticated services usually attach the bearer token manually with `HttpHeaders` instead of relying on an interceptor.
- Keep HTTP calls inside the dedicated service classes in `src/app/services/**`. Components generally consume those services rather than building endpoint URLs inline.
- Backend payloads are often normalized close to the consuming screen before being rendered or edited. Preserve those normalization steps when changing admin flows, especially for attendee data that mixes numbers, booleans, nullable fields, and backend-specific status values.
- Static site assets are served from `public/` and referenced directly as paths like `images/...`; this codebase does not follow the typical `src/assets` pattern for most frontend media.
