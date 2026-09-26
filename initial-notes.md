# Initial Implementation Notes

Document date: 2026-09-26  
Status: initial implementation guidance aligned with `requirements.md`

## 1. Deployment shape

Spring Boot applications normally include an embedded servlet server; Spring Boot's default traditional web stack uses embedded Tomcat. The production Spring Boot service on Render can therefore serve both the compiled React/Vite CMS and the CMS JSON API.

```text
Owner browser
    -> Render Spring Boot/Tomcat
       -> React/Vite CMS static build
       -> authenticated CMS API
       -> Cloudflare D1 HTTP API

Public reader
    -> Cloudflare React SSR/public Worker
       -> D1 binding
       -> Postimages image delivery
```

Build the CMS with Vite, copy its production output into Spring Boot's static resources during the application build, and configure fallback routing so CMS client routes return the CMS entry document while `/api/**` remains controlled by Spring controllers.

This arrangement simplifies same-origin cookies, CSRF protection, and CORS. It does not remove Render free-tier cold starts: when the whole service is asleep, the first CMS document request can wait for startup. That is acceptable for the owner-only CMS, but the public website must remain on Cloudflare and must not depend on Render being awake.

Spring Boot owns all editorial CRUD and domain rules. It accesses D1 through the authenticated Cloudflare D1 HTTP API using a narrowly scoped token stored only in Render secrets. Controllers call services, and services call repository interfaces; browser code never receives SQL or the D1 token.

## 2. Public HTML rendering

The public Cloudflare Worker acts like an HTML controller:

1. Match locale and route.
2. Query the published record through a D1 binding.
3. Return a rendered not-found page if no published record exists.
4. Select the shared article, project, category, or search template.
5. Render React to meaningful HTML on the server.
6. Return the HTML and then hydrate optional browser interactions.

Draft and administrative rendering remains private. Public rendering never calls the sleeping Render service.

## 3. Error and operational states

Errors should be isolated to the smallest affected component. Every state should say what happened, whether data is safe, and what action is available. Do not expose credentials, raw SQL, stack traces, or article bodies.

### 3.1 HTTP/API mapping

| Status/code | Meaning in this application | CMS behaviour |
| --- | --- | --- |
| 400 `VALIDATION_FAILED` | Malformed or unsupported input | Keep entered data; show field and row errors |
| 401 `AUTH_REQUIRED` | No valid owner session | Preserve a local recovery copy and request sign-in |
| 403 `FORBIDDEN` | Session lacks permission or CSRF check failed | Do not retry automatically; explain and offer reload/sign-in |
| 404 `NOT_FOUND` | Resource does not exist | Show contextual not-found state; do not clear editor data |
| 409 `VERSION_CONFLICT` | A newer version exists | Stop autosave and offer reload, copy, or conflict resolution |
| 409 `DUPLICATE_VALUE` | Slug, stable ID, or import identity conflicts | Highlight the conflicting value and offer correction |
| 413 `PAYLOAD_TOO_LARGE` | Article/import/chunk exceeds the configured bound | Keep local input and request a smaller batch |
| 415 `UNSUPPORTED_FORMAT` | Unsupported CSV/package/media input | Identify the accepted format without attempting import |
| 422 `REFERENCE_INVALID` | Media, gallery, project, or taxonomy reference is invalid | Identify each broken reference and block publish |
| 429 `RATE_LIMITED` | Login, API, D1, or remote-host request limit reached | Back off using server guidance and provide manual retry |
| 500 `INTERNAL_ERROR` | Unexpected application error | Show a request ID and safe retry; retain recoverable edits |
| 502 `UPSTREAM_ERROR` | D1 or another required upstream returned an invalid response | Report upstream failure and make retry bounded |
| 503 `SERVICE_UNAVAILABLE` | Backend/D1 is unavailable or starting | Show connecting/unavailable state and retry with backoff |
| 504 `UPSTREAM_TIMEOUT` | D1 or another required operation timed out | Preserve state; mark outcome unknown until reconciliation |

### 3.2 CMS UI states

- Initial service/document loading after a Render cold start.
- Session expired, login rejected, CSRF rejected, and logout completed.
- Draft idle, dirty, saving, saved, save failed, offline recovery available, and conflict detected.
- Validation errors for fields, article components, URLs, references, and publication readiness.
- Preview loading, preview expired, preview unavailable, and renderer failure.
- Publishing/unpublishing in progress, succeeded, failed, or committed with public refresh pending/failed.
- CSV parsed, parsed with warnings, invalid, awaiting thumbnail reconciliation, ready, importing, partially imported, retryable, or complete.
- Media preview queued, loading, loaded, unavailable, malformed, or blocked by the remote host.
- Empty list, no search results, filtered-to-zero results, and list-loading failure are distinct states.

An error affecting one media thumbnail stays on that card. A failed import row stays on that row. Only a failure that prevents the entire screen from functioning should produce a screen-level error.

## 4. Postimages and media workflow

The application does not upload image bytes to Postimages. The owner uploads to Postimages manually and imports references into the CMS.

### 4.1 Preferred import inputs

The first input is a CSV containing at least a direct original-image URL. Optional columns include English and Chinese names, English and Chinese alt text/captions, gallery, source-page URL, thumbnail URL, dimensions, and credit.

```csv
directImageUrl,nameEn,nameZhHant,gallery,altEn,altZhHant,captionEn,captionZhHant
https://i.postimg.cc/example/image.jpg,,,calligraphy,,,,
```

The second, optional input is a bulk paste of Postimages **Thumbnail for websites** HTML. HTML is preferred over BBCode because standard parsing can extract:

- `<a href>` as the Postimages source-page URL;
- `<img src>` as the thumbnail candidate;
- `<img alt>` as proposed metadata.

The importer sanitises and parses this input, then discards the markup. It never stores or renders the supplied HTML. "Hotlink for websites" may contain the original rather than a small thumbnail and should not be treated as proof that a thumbnail exists.

### 4.2 Import sequence

1. Parse the CSV locally without fetching every image.
2. Ignore completely blank rows.
3. Mark non-empty rows without a valid direct image URL as skipped with a row-level explanation.
4. Normalize safe fields and detect duplicate direct URLs.
5. Allocate one import identifier per accepted image.
6. Optionally parse the pasted thumbnail HTML.
7. Match thumbnails to CSV images using reliable extracted values; never rely on row order alone when values disagree.
8. Show matched, unmatched, duplicate, and ambiguous records in a reconciliation view.
9. Display a lazy-loaded preview grid and allow metadata/name correction.
10. Commit confirmed records in bounded, idempotent chunks.
11. Report created, updated, skipped, and failed counts with downloadable row details.

### 4.3 Missing-name generation

Each accepted image receives one immutable identifier:

```text
{UTC timestamp}_{zero-padded batch sequence}
```

Example: `20260926T143012Z_0007`.

The number is assigned once to the image before localized names are generated. English and Chinese processing must never maintain separate counters. Import preview, retry, and database chunking preserve the same allocation.

- Chinese present, English absent: `zh_image/{gallery-slug-or-ungrouped}_{identifier}`
- English present, Chinese absent: `en_image/{gallery-slug-or-ungrouped}_{identifier}`
- Both absent: use `image/{gallery-slug-or-ungrouped}_{identifier}` for both locale names

Thus, one asset can never accidentally receive `_0007` in English and `_0008` in Chinese. Generated names remain editable before import. The stable media ID and import identifier do not change after a display-name edit.

### 4.4 Preview and request control

- Render 25–50 records per page or use a virtualized list.
- Load thumbnails only when their cards approach the viewport.
- Limit active preview requests to a small configurable number, initially 4–6.
- Cancel queued work for records no longer visible when practical.
- Prefer the thumbnail URL in CMS grids and load the direct original only for explicit large preview.
- Do not proxy routine Postimages previews through Spring Boot.
- Do not fetch remote URLs during CSV parsing merely to validate that they exist.
- Show fixed-size placeholders so failed/slow images do not move the layout.
- Give every failed preview a per-card retry and editable URL fields.

## 5. Core CMS placement

The Render-served CMS includes:

- Dashboard and recovery notices
- Post list, editor, structured fields, rich-text editor, preview, revisions, and publication controls
- Media library, CSV import wizard, thumbnail reconciliation, asset editor, and gallery editor
- Category, tag, brand, and equipment-type management
- Theme and site-settings management
- Import/export and operational history

The CMS uses a responsive application shell. Desktop may use a bounded navigation rail; phone and tablet use an accessible menu and stacked editing panels. Save status and publish controls remain visible without covering editor content or the virtual keyboard.
