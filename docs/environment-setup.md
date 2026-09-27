# Environment foundation: build it by hand

This repository has two different React applications because they solve two
different availability problems:

```text
Owner -> Render -> Spring Boot/Tomcat -> compiled CMS + /api -> D1 HTTP API
Reader -> Cloudflare Worker -> React Router SSR -> D1 binding (published only)
```

The CMS is allowed to wait for a Render cold start. The public site must not call
Render, so readers can still receive server-rendered pages while Render sleeps.

## 1. Tool versions

- Node.js 24 LTS (`.nvmrc`). Node 25 on this machine is end-of-life; do not use it
  for the project lockfile.
- Java 21 LTS (`.java-version`) as the portable deployment target. A newer JDK
  can compile the project because Maven emits Java 21 bytecode.
- Spring Boot 4.1.1 and Maven 3.6.3 or newer.
- React 19.3, Vite 8.3, Tailwind CSS 4.3, and React Router 8.

Install/use Node with your version manager, then verify the machine:

```bash
nvm install 24
nvm use
npm run check:env
```

If you use `fnm`, `asdf`, or Volta, select Node 24 using that tool instead.

## 2. Install JavaScript dependencies

From the repository root:

```bash
npm install
```

This is an npm workspace. One root install supplies both React applications and
the shared packages. Commit the generated `package-lock.json` after reviewing it.

## 3. Understand the environment layers

| Layer | Purpose | Data | Public URL |
| --- | --- | --- | --- |
| `test` | automated tests | fixtures/temporary data | none |
| `local` | offline local-deployment branch | local SQLite file | localhost |
| `development` | daily feature work | disposable local SQLite/D1 | localhost |
| `staging` | stable integration check | separate staging D1 | protected/shared URL |
| PR preview | one feature branch | isolated preview data where affordable | temporary URL |
| `production` | real readers and owner | production D1 | real domains |

Never point a preview or test process at production D1. Code can be promoted
between layers; credentials and databases cannot.

## 4. Configure local values

Frontend `VITE_*` variables are public. They are compiled into browser code, so
they may contain an API path or site URL but never a password or API token.

For Spring Boot local development, the committed development profile already
uses a local path. To override it without committing the value:

```bash
export SPRING_PROFILES_ACTIVE=development
export LOCAL_DB_PATH=./data/my-development.db
```

Cloud credentials belong in Render's secret environment variables:

```text
SPRING_PROFILES_ACTIVE=staging or production
APP_ENV=staging or production
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_D1_DATABASE_ID=...
CLOUDFLARE_D1_API_TOKEN=...
```

Do not prefix secrets with `VITE_`.

## 5. Run each process separately first

Terminal 1 — Spring Boot editorial API:

```bash
npm run dev:api
```

Terminal 2 — private CMS at `http://localhost:5174`:

```bash
npm run dev:cms
```

Terminal 3 — public SSR site at `http://localhost:5173`:

```bash
npm run dev:public
```

After each works by itself, `npm run dev` starts all three. Learning them
separately first makes port, proxy, and profile errors much easier to diagnose.

## 6. How CMS packaging works

During development, Vite proxies `/api` from port 5174 to Spring Boot on 8080.
In production, there is no cross-origin request: the CMS build is written to
`apps/editorial-api/target/generated-resources/static`, Maven packages those
files into the Spring Boot jar, and Tomcat serves both the page and `/api`.

Run the complete build:

```bash
npm run build
```

Then run the packaged service locally:

```bash
SPRING_PROFILES_ACTIVE=local java -jar apps/editorial-api/target/editorial-api-0.1.0-SNAPSHOT.jar
```

## 7. Tailwind, CSS, and JSX

Tailwind v4 is the CSS build tool and does not support a Sass/SCSS preprocessing
workflow. Use all three patterns intentionally:

1. Utility classes directly in JSX: `className="mt-6 max-w-2xl text-muted"`.
2. Repeated patterns in `@layer components` with `@apply`.
3. Theme tokens and ordinary/nested CSS in the `.css` file.

Examples are in `apps/cms/src/App.jsx` and `apps/cms/src/styles.css`.

## 8. Cloudflare staging and previews

Before any deploy, create three D1 databases (development, staging, production)
and replace the zero UUID placeholders in `apps/public-site/wrangler.jsonc`.
Do not reuse the production ID in another environment.

For a stable staging build:

```bash
CLOUDFLARE_ENV=staging npm --workspace @homepage/public-site run build
npx --workspace @homepage/public-site wrangler deploy
```

For a code-only preview of an uploaded Worker version, use the workspace's
`deploy:preview` script. Remember that a version URL reuses configured resources;
it is not automatically an isolated copy of D1.

## 9. Render staging and production

Create two Render web services from the same repository: one linked to the
staging branch/profile and one to production. Use:

```text
Build command: npm install && npm run build:cms && mvn -f apps/editorial-api/pom.xml clean package
Start command: java -jar apps/editorial-api/target/editorial-api-0.1.0-SNAPSHOT.jar
```

Set `SPRING_PROFILES_ACTIVE`, `APP_ENV`, and the three Cloudflare secrets in the
Render dashboard. Spring reads Render's `PORT` automatically. Render PR service
previews can cost money and can copy environment settings, so do not enable them
until preview data isolation and the current plan cost are understood.

## 10. The next safe build steps

1. Run the health endpoint and both React shells locally.
2. Add the SQLite adapter behind a repository interface.
3. Add D1 migrations and fixtures; run the same fixtures against SQLite and D1.
4. Add authentication before any editorial write endpoint.
5. Replace placeholder D1 IDs, then deploy staging only.
6. Verify staging before creating the production services and database.

