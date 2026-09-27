# Personal Homepage and CMS — Complete Build Checklist

Document created: 2026-09-27  
Source documents: `requirements.md`, `initial-notes.md`, and `README.md`  
Status: implementation checklist and durable project memory

## 0. Checklist rules

- [ ] Treat this file as the implementation source of truth and progress tracker.
- [ ] Update this file whenever a requirement, implementation decision, task status, or verification result changes.
- [ ] Do not update other planning/requirements Markdown files unless the owner explicitly authorizes it.
- [ ] Do not mark an item complete until its implementation and proportionate verification are complete.
- [ ] Record important evidence beside completed items: test name, command, screenshot, deployment URL, commit, or documentation path.
- [ ] Use `[ ]` for not started, `[-]` for in progress or partially complete, `[x]` for verified complete, and `[!]` for blocked with an explanation.
- [ ] Keep cloud and local-deployment work clearly distinguished.
- [ ] Keep optional/future work clearly distinguished from the core release.

## 1. Confirm and record implementation decisions

- [x] Select supported Java version. Java 21 LTS; recorded in `.java-version` and `apps/editorial-api/pom.xml`.
- [x] Select supported Spring Boot version. Spring Boot 4.1.1; recorded in `apps/editorial-api/pom.xml`.
- [x] Select Node.js version. Node 24 LTS; recorded in `.nvmrc` and root `package.json`.
- [x] Select React and Vite versions. React 19.3 and Vite 8.3; recorded in both application manifests.
- [x] Select the public React SSR approach compatible with Cloudflare Workers. React Router 8 framework mode with the Cloudflare Vite plugin and SSR enabled.
- [x] Select CSS strategy without imposing a generic Bootstrap appearance. Tailwind CSS 4 utilities, CSS-first theme tokens, and limited `@apply` component classes; no Sass preprocessor.
- [ ] Select final font families with English, Traditional Chinese, and mixed-text support.
- [ ] Define layout breakpoints based on available space.
- [ ] Define the authentication/session implementation for the single owner account.
- [ ] Validate CKEditor 5 licensing and required zero-cost features.
- [ ] If CKEditor is unsuitable, document and select an equivalent editor such as Tiptap core.
- [ ] Prototype and select the Chinese search tokenisation/indexing strategy.
- [ ] Select the Render plan/runtime configuration after testing cold-start and resource constraints.
- [ ] Recheck current Cloudflare, D1, Workers, Render, and editor pricing/limits before deployment.
- [x] Define the site timezone; `Asia/Hong_Kong` is the application default in `application.properties`.
- [ ] Decide the bounded public publication refresh target, no more than 60 seconds under normal operation.
- [ ] Document all decisions and their reasons in this checklist or an explicitly authorized technical document.

## 2. Repository and project foundation

- [x] Initialize/verify Git repository and ignore generated files, secrets, local databases, and build output. Evidence: root `.gitignore`.
- [x] Establish the repository structure.
  - [x] `apps/cms` for the React/Vite owner interface.
  - [x] `apps/public-site` for public React rendering.
  - [x] `apps/editorial-api` for Spring Boot.
  - [x] `workers/public-read` for published-only D1 reads/rendering integration.
  - [x] `packages/contracts` for versioned contracts/shared schemas.
  - [x] `packages/design-system` for tokens and shared React components.
  - [x] `packages/content-renderer` for approved article rendering.
  - [x] `database/migrations` for D1/SQLite-compatible migrations.
  - [x] `database/fixtures` for search and acceptance fixtures.
  - [x] `docs` for deployment and operations documentation.
- [x] Add root development scripts for install, build, test, lint, and type-check. Evidence: root `package.json` and `scripts/*.mjs`.
- [ ] Add code formatting and linting configuration.
- [x] Add configuration templates containing placeholders only. Evidence: root and app `.env.example` files plus zero-ID Wrangler placeholders.
- [x] Add separate development, staging, production, and local profiles. Evidence: Vite mode files, Spring profile properties, and Wrangler environments.
- [ ] Define an explicit versioned API contract.
- [ ] Establish shared fixtures to prevent Java/Worker behavior drift.
- [ ] Establish automated checks for frontend, backend, migrations, and contracts.
- [x] Document prerequisites and initial developer setup. Evidence: `docs/environment-setup.md`.

## 3. Shared design system

### 3.1 Tokens

- [ ] Define typography tokens for heading, body, muted, caption, and code text.
- [ ] Define spacing tokens, initially considering 4, 8, 12, 16, 24, 32, 48, and 64 px.
- [ ] Define radius tokens: small, medium, large, and intentional pill usage.
- [ ] Define border tokens.
- [ ] Define shadow/elevation tokens.
- [ ] Define semantic color tokens.
- [ ] Define content widths: reading, standard, and wide.
- [ ] Define focus-state tokens.
- [ ] Define motion durations/easing and reduced-motion behavior.
- [ ] Define touch-target minimums.
- [ ] Define responsive grid rules.

### 3.2 Shared component variants

- [ ] Implement padding variants: compact, standard, and spacious.
- [ ] Implement card variants: article, artwork, and project.
- [ ] Implement button/link variants: primary, secondary, quiet, and destructive.
- [ ] Implement image variants: inline, wide, full artwork, and gallery.
- [ ] Implement table variants: standard, compact, and comparison.
- [ ] Ensure authors select named variants rather than arbitrary pixel/CSS values.
- [ ] Ensure token changes propagate across all corresponding components.

### 3.3 Buttons and controls

- [ ] Build primary button.
- [ ] Build secondary button.
- [ ] Build quiet/ghost button.
- [ ] Build destructive button.
- [ ] Build icon button with an accessible name.
- [ ] Build link-styled button/link treatment.
- [ ] Build toggle button.
- [ ] Build switch control.
- [ ] Build checkbox.
- [ ] Build radio group.
- [ ] Build segmented control where appropriate.
- [ ] Support default, hover, focus-visible, pressed, loading, and disabled states.
- [ ] Ensure controls work with keyboard and touch and never require hover.

### 3.4 Form components

- [ ] Build text input.
- [ ] Build textarea.
- [ ] Build search input.
- [ ] Build URL input with validation feedback.
- [ ] Build slug field.
- [ ] Build select.
- [ ] Build accessible combobox.
- [ ] Build multi-select/tag picker.
- [ ] Build date input/date-range picker.
- [ ] Build locale selector/tabs.
- [ ] Build field label, help text, warning, and inline error components.
- [ ] Build form-level validation summary.
- [ ] Preserve entered data when validation or API submission fails.

### 3.5 Feedback and state components

- [ ] Build alert/banner.
- [ ] Build toast/notification.
- [ ] Build loading spinner/progress indicator.
- [ ] Build skeleton states without excessive layout movement.
- [ ] Build empty state.
- [ ] Build no-results state distinct from an empty collection.
- [ ] Build unavailable/error state with safe retry.
- [ ] Build request-ID error presentation.
- [ ] Build recovery notice.
- [ ] Build service-starting/cold-start state.
- [ ] Build modal/dialog with focus trapping, dismissal, and focus restoration.
- [ ] Build confirmation dialog for destructive/material actions.
- [ ] Build pagination.

## 4. Theme and palette system

### 4.1 Theme data and derivation

- [ ] Define stable theme ID, name, schema version, published version, base colors, overrides, and availability state.
- [ ] Support base roles: background, surface, text, primary accent, and secondary accent.
- [ ] Generate muted text.
- [ ] Generate subtle and elevated surfaces.
- [ ] Generate borders.
- [ ] Generate hover and pressed colors.
- [ ] Generate text-on-accent colors.
- [ ] Generate focus rings.
- [ ] Generate selection backgrounds.
- [ ] Keep semantic error, warning, and success roles independent.
- [ ] Document a consistent color-derivation method.
- [ ] Validate foreground/background contrast.
- [ ] Permit explicit overrides where generated colors fail accessibility.
- [ ] Store semantic styles in content, never theme-specific color literals.

### 4.2 Reader theme behavior

- [ ] Let readers choose any enabled published palette.
- [ ] Provide “Use site default”.
- [ ] Persist the selected palette ID in local storage without an account.
- [ ] Resolve palette in order: valid reader choice, CMS default, built-in fallback.
- [ ] Fall back safely when a palette is disabled or removed.
- [ ] Apply the palette early enough to minimize incorrect-theme flash.
- [ ] Handle blocked/unavailable local storage gracefully.
- [ ] Apply preference across pages and reloads on the same browser/device.
- [ ] Keep the model extensible for future light/dark variants.

### 4.3 CMS theme management

- [ ] List palettes and statuses.
- [ ] Create a palette.
- [ ] Edit a palette.
- [ ] Preview a palette.
- [ ] Publish a palette without rebuilding articles.
- [ ] Disable a palette safely.
- [ ] Select the site default palette.
- [ ] Preview text, cards, tables, code, buttons, forms, disabled controls, and focus states.
- [ ] Flag unreadable derived combinations.
- [ ] Allow corrections before publication.

## 5. Public application shell and routing

- [ ] Add locale-prefixed routing for `/en/` and `/zh-hant/`.
- [ ] Implement route shapes for categories, posts, projects, and search.
- [ ] Resolve human-readable slugs to stable IDs.
- [ ] Store redirects for previous slugs.
- [ ] Preserve filters, sort, and pagination in URL query parameters.
- [ ] Ensure browser Back/Forward restores result state.
- [ ] Ensure shared URLs restore the same result state.
- [ ] Return meaningful initial HTML through server rendering/generation.
- [ ] Define the publication refresh mechanism.
- [ ] Build an editorial masthead/compact studio header.
- [ ] Build desktop navigation.
- [ ] Build accessible mobile navigation.
- [ ] Keep search, language, and theme controls discoverable on mobile.
- [ ] Build breadcrumbs.
- [ ] Build footer with About and configured external links.
- [ ] Build localized not-found page.
- [ ] Build localized unavailable/error page.
- [ ] Add unique titles, descriptions, canonical URLs, and link-preview metadata.
- [ ] Generate sitemap containing published routes only.
- [ ] Add alternate-language metadata only for actually published translations.
- [ ] Consider RSS/Atom after the first publishing loop; do not block core release.

## 6. Public homepage

- [ ] Display site identity.
- [ ] Display navigation and search access.
- [ ] Display language selector.
- [ ] Display theme selector.
- [ ] Display short owner introduction.
- [ ] Support optional featured post or project.
- [ ] Display curated/latest calligraphy entries.
- [ ] Display curated/latest audio entries.
- [ ] Display curated/latest coding entries.
- [ ] Link every section to its full list.
- [ ] Make sections intentional with only one or two entries.
- [ ] Hide empty sections where appropriate.
- [ ] Configure visible categories in the CMS.
- [ ] Configure homepage section order.
- [ ] Configure entry limit per section.
- [ ] Configure optional featured entries.
- [ ] Prevent new categories from automatically overcrowding the homepage.
- [ ] Add a whole-section thumbnail visibility control.
- [ ] Support section presentation with thumbnails.
- [ ] Support section presentation without thumbnails.
- [ ] Add per-post thumbnail choice for each placement: inherit, show, or hide.
- [ ] Make the per-post choice override the section setting.
- [ ] Ensure thumbnail-less cards leave no blank image space and retain balanced layout.

## 7. Category, archive, and coding grids

### 7.1 Generic category/archive template

- [ ] Build one reusable category/list template for initial and CMS-created categories.
- [ ] Display localized category title and description.
- [ ] Display responsive cards/list.
- [ ] Display relevant filters only.
- [ ] Display sorting controls.
- [ ] Display pagination.
- [ ] Display clear empty state.
- [ ] Display distinct filtered-to-zero state.
- [ ] Display list-loading failure state.
- [ ] Collapse filters into an accessible panel on narrow screens.
- [ ] Add a whole-grid/section thumbnail visibility control in the CMS.
- [ ] Support thumbnail and thumbnail-less presentations.
- [ ] Add per-post placement override: inherit, show, or hide.
- [ ] Make per-post choice take precedence over the grid/section setting.
- [ ] Reflow thumbnail-less cards without reserving image space.

### 7.2 Category-specific filters

- [ ] Add calligraphy filters for script.
- [ ] Add calligraphy filters for material/tool.
- [ ] Add calligraphy filters for series.
- [ ] Add audio equipment-type filters such as IEM and DAC.
- [ ] Add audio brand filters.
- [ ] Add coding format filters for project/development note.
- [ ] Add coding technology filters.
- [ ] Do not show irrelevant category-specific filters elsewhere.

### 7.3 Coding compact application grid

- [ ] Provide an additional compact grid view for coding applications.
- [ ] Show app name.
- [ ] Show publication date.
- [ ] Show short description.
- [ ] Show thumbnail only when enabled by section/per-post settings.
- [ ] Link every grid item to its project detail page.
- [ ] Reduce column count responsively.
- [ ] Preserve thumbnail proportions.
- [ ] Avoid page-level horizontal scrolling.
- [ ] Ensure the thumbnail-less version is balanced and compact.

## 8. Public content detail templates

### 8.1 Shared article shell

- [ ] Display breadcrumbs.
- [ ] Display clear title hierarchy.
- [ ] Display introduction/excerpt.
- [ ] Display author.
- [ ] Display publication date.
- [ ] Display optional updated date.
- [ ] Display category and locale metadata.
- [ ] Display tags.
- [ ] Apply readable content width and body spacing.
- [ ] Render captions consistently.
- [ ] Render related entries at the article end with a bounded count.
- [ ] Position comments consistently when implemented/enabled.
- [ ] Store full timestamps while omitting exact display time by default.
- [ ] Add collapsible table of contents for long articles.
- [ ] Collapse table of contents above the body on narrow screens.
- [ ] Allow galleries to be wider than reading text.
- [ ] Keep tables and code horizontally scrollable inside their containers.
- [ ] Prevent page-level horizontal scrolling.

### 8.2 Calligraphy/journal page

- [ ] Render inline images.
- [ ] Render full artwork without forced cropping.
- [ ] Render galleries and captions.
- [ ] Render reflections/narrative.
- [ ] Render optional materials/tools.

### 8.3 Audio review page

- [ ] Display product/model.
- [ ] Display brand.
- [ ] Display equipment type.
- [ ] Display listening setup.
- [ ] Render review narrative.
- [ ] Render comparisons.
- [ ] Support optional numerical scores without requiring them.

### 8.4 Project page

- [ ] Display stable project description.
- [ ] Display screenshots.
- [ ] Display project status.
- [ ] Display technology tags.
- [ ] Display live URL when present.
- [ ] Display repository URL when present.
- [ ] Display reflections.
- [ ] Allow project records to evolve without redeploying the external application.

### 8.5 Development note page

- [ ] Render rich text.
- [ ] Render code blocks.
- [ ] Support an optional related-project reference.

### 8.6 Shared article components

- [ ] Build article header.
- [ ] Build metadata row.
- [ ] Build tag chip.
- [ ] Build status badge.
- [ ] Build responsive image.
- [ ] Build figure with caption.
- [ ] Build gallery renderer.
- [ ] Build keyboard/touch-accessible lightbox.
- [ ] Build callout/note variants.
- [ ] Build safe code block.
- [ ] Build semantic data table.
- [ ] Build project reference/card.
- [ ] Build related-content cards.
- [ ] Handle failed images without collapsing surrounding layout.

## 9. Public search

### 9.1 Search interface

- [ ] Build localized search page.
- [ ] Search title only.
- [ ] Search body only.
- [ ] Search title and body.
- [ ] Search English queries.
- [ ] Search Chinese queries without requiring spaces.
- [ ] Search mixed-language queries.
- [ ] Search all published languages.
- [ ] Filter search by locale.
- [ ] Filter by category ID.
- [ ] Filter by content format.
- [ ] Filter by tags.
- [ ] Filter by equipment type where applicable.
- [ ] Filter by brand where applicable.
- [ ] Filter by publication date range.
- [ ] Clearly state that the date range uses publication date.
- [ ] Sort by relevance.
- [ ] Sort by newest publication.
- [ ] Sort by oldest publication.
- [ ] Default to newest publication when there is no query.
- [ ] Paginate results.
- [ ] Clear filters.
- [ ] Safely render snippets and highlights.
- [ ] Preserve search state in the URL.

### 9.2 Search implementation

- [ ] Index only published titles, excerpts, and visible article text.
- [ ] Decide whether visible captions are included and document it.
- [ ] Exclude markup, drafts, private metadata, and administrative content.
- [ ] Derive searchable plain text from validated content, not raw HTML.
- [ ] Weight title matches above body-only matches.
- [ ] Use deterministic secondary ordering for stable pagination.
- [ ] Parameterize search queries.
- [ ] Bound query length.
- [ ] Validate filters and sorting values.
- [ ] Treat malformed full-text syntax as user input, not a SQL error.
- [ ] Avoid unbounded full-table scans.
- [ ] Version and document search-index generation.
- [ ] Provide a search-index rebuild operation.
- [ ] Convert inclusive site-timezone date selections to an unambiguous server range.

### 9.3 Required search fixtures

- [ ] English title match with case difference.
- [ ] English body match with case difference.
- [ ] Chinese title phrase without spaces.
- [ ] Chinese body phrase without spaces.
- [ ] Mixed `耳機 DAC` query.
- [ ] Brand/model tokens with numbers or punctuation.
- [ ] Title-only search excluding a body-only match.
- [ ] Date-range boundaries in `Asia/Hong_Kong` or configured timezone.
- [ ] Newly created category appearing without deployment.
- [ ] Published versus draft translations of the same post.
- [ ] Unpublication removing a search result.
- [ ] Stable pagination with equal publication timestamps.

## 10. Internationalization and bilingual content

- [ ] Keep UI translations outside component logic.
- [ ] Translate public navigation.
- [ ] Translate public controls and labels.
- [ ] Translate loading, empty, and error states.
- [ ] Translate date formatting.
- [ ] Translate the CMS interface.
- [ ] Support `en`.
- [ ] Support `zh-Hant`.
- [ ] Permit future locales without restructuring the database.
- [ ] Use URL locale as the active public locale.
- [ ] Use stored preference only to guide initial entry.
- [ ] Do not redirect away from an explicitly selected locale URL.
- [ ] Link translations through the shared post ID.
- [ ] Give each translation its own title, excerpt, body, slug, and publication history.
- [ ] Permit a post to exist in only one language.
- [ ] Clearly label fallback/original-language content.
- [ ] Never present fallback content as translated.
- [ ] Localize media alt text and captions with documented fallback rules.
- [ ] Localize taxonomy labels/descriptions with documented fallback rules.
- [ ] Render correct page language metadata.
- [ ] Support Chinese and mixed Latin font rendering/line wrapping.
- [ ] Avoid disrupting Chinese IME composition during autosave or shortcuts.
- [ ] Preserve original Chinese text.
- [ ] Do not assume Traditional/Simplified equivalence in the baseline.

## 11. Owner authentication and CMS shell

- [ ] Build owner sign-in screen.
- [ ] Implement a single-owner account model without public registration.
- [ ] Prefer secure HttpOnly session cookies.
- [ ] Protect cookie-authenticated mutations against CSRF.
- [ ] Define and test SameSite/cookie-domain behavior for actual deployment.
- [ ] Restrict CORS to configured CMS origins if cross-origin access is used.
- [ ] Rate-limit login and sensitive endpoints.
- [ ] Invalidate the server session on logout.
- [ ] Preserve a recoverable local editing copy when a session expires.
- [ ] Build logout-completed state.
- [ ] Build login-rejected state.
- [ ] Build session-expired state.
- [ ] Build CSRF-rejected state.
- [ ] Build a responsive CMS application shell.
- [ ] Use a bounded navigation rail on suitable desktop widths.
- [ ] Use an accessible menu and stacked panels on tablet/phone.
- [ ] Keep save and publish controls visible without covering content or the virtual keyboard.
- [ ] Show the target environment prominently for local/cloud operations.

## 12. CMS dashboard

- [ ] Show recent drafts.
- [ ] Show recently published posts.
- [ ] Show pending imports.
- [ ] Show recovery notices.
- [ ] Show actionable system errors.
- [ ] Avoid non-actionable analytics dominating the dashboard.
- [ ] Show honest cold-start/connecting state.
- [ ] Provide bounded retry for unavailable services.

## 13. CMS post list

- [ ] List posts with pagination.
- [ ] Filter by draft/published/archived state.
- [ ] Filter by category.
- [ ] Filter by format.
- [ ] Filter by locale.
- [ ] Filter by text.
- [ ] Show title.
- [ ] Show locale availability.
- [ ] Show updated date.
- [ ] Show publication date.
- [ ] Show whether unpublished changes exist.
- [ ] Add clear loading, empty, no-results, and error states.
- [ ] Add create-post action.
- [ ] Add safe archive behavior.

## 14. CMS post editor

### 14.1 Structured fields

- [ ] Edit title.
- [ ] Edit slug.
- [ ] Edit excerpt/short description.
- [ ] Select primary category.
- [ ] Select format.
- [ ] Select tags.
- [ ] Select optional series.
- [ ] Select author.
- [ ] Select/create language version without overwriting another translation.
- [ ] Select cover image.
- [ ] Configure card thumbnail visibility: inherit, show, or hide.
- [ ] Make the per-post thumbnail choice work for applicable homepage/category/content placements.
- [ ] Edit format-specific details.
- [ ] Edit publication metadata.
- [ ] Edit comment override: inherit, enabled, or disabled.
- [ ] Clearly identify comments as unavailable until the submission backend exists.

### 14.2 Rich-text editor

- [ ] Support headings.
- [ ] Support paragraphs.
- [ ] Support inline emphasis.
- [ ] Support safe links.
- [ ] Support ordered and unordered lists.
- [ ] Support quotes.
- [ ] Support code blocks.
- [ ] Support semantic tables.
- [ ] Insert media-library images.
- [ ] Add/edit captions.
- [ ] Insert a gallery reference with preset layout, width, spacing, and caption visibility.
- [ ] Insert media with preset display mode.
- [ ] Insert callout/note with approved variants.
- [ ] Insert project reference/card.
- [ ] Avoid layout tables as an arbitrary layout mechanism.
- [ ] Do not make manually typed shortcodes the primary interface.
- [ ] Use one authoritative saved representation for every controlled component.
- [ ] Preserve editor content through save and reopen.
- [ ] Keep editor dependencies out of the public bundle.

### 14.3 Editor workflow controls

- [ ] Display accurate idle state.
- [ ] Display dirty/unsaved state.
- [ ] Display saving state.
- [ ] Display saved state only after server acknowledgment.
- [ ] Display save-failed state.
- [ ] Display offline/local-recovery state.
- [ ] Display conflict state.
- [ ] Provide manual save where useful.
- [ ] Provide private preview.
- [ ] Provide revision history.
- [ ] Provide publish action.
- [ ] Provide unpublish action.
- [ ] Provide archive action.
- [ ] Keep critical controls usable with touch and virtual keyboards.
- [ ] Warn before abandoning unsaved edits where supported.

## 15. Content validation and rendering pipeline

- [ ] Send structured fields and editor output in authenticated JSON requests.
- [ ] Treat browser validation as feedback only.
- [ ] Validate fields and expected version on the server.
- [ ] Sanitize allowed HTML and component attributes.
- [ ] Validate media, gallery, project, and taxonomy references.
- [ ] Reject executable content.
- [ ] Reject unsafe URLs.
- [ ] Prefer explicit validation errors over silently dropping meaningful content.
- [ ] Store sanitised, round-trippable HTML and approved component metadata.
- [ ] Do not use editor-private runtime state as the portability contract.
- [ ] Maintain a content schema version.
- [ ] Preserve intended tables, captions, and components after reload.
- [ ] Store external media references by stable media ID.
- [ ] Render public content through the shared design system without loading the editor.
- [ ] Use the same renderer/rules for private preview and public pages.
- [ ] Add article/import/revision/media payload size limits.

## 16. Autosave, concurrency, revisions, and publication

### 16.1 Autosave and recovery

- [ ] Autosave after a short idle period, initially about two seconds.
- [ ] Do not submit every keystroke.
- [ ] Retry transient failures without duplicating revisions.
- [ ] Never overwrite newer content during retry.
- [ ] Keep a practical local recovery copy keyed by post, locale, and base revision.
- [ ] Reconcile local recovery against the latest server version.
- [ ] Document that local recovery is not guaranteed permanent storage.

### 16.2 Optimistic concurrency

- [ ] Include expected version/concurrency token with every mutation.
- [ ] Return a conflict instead of overwriting stale edits.
- [ ] Stop autosave after a conflict.
- [ ] Offer reload latest version.
- [ ] Offer copying/recovering local changes.
- [ ] Offer explicit conflict resolution.
- [ ] Test conflict behavior between phone and computer sessions.

### 16.3 Revision history

- [ ] Store immutable revision checkpoints.
- [ ] Store source, owner, timestamp, and schema version.
- [ ] Coalesce autosave history to avoid one revision per keystroke.
- [ ] Show a readable revision list.
- [ ] Inspect earlier revisions.
- [ ] Restore an earlier revision as a new draft.
- [ ] Never silently publish a restored revision.
- [ ] Preserve current draft heads and published pointers during pruning.
- [ ] Document bounded retention policy.
- [ ] Preserve explicit publication checkpoints by default.
- [ ] Monitor storage growth from revisions.

### 16.4 Preview and publication

- [ ] Require authentication or narrowly scoped short-lived access for previews.
- [ ] Prevent preview/draft responses from entering public caches.
- [ ] Prevent preview/draft content from entering search indexes.
- [ ] Saving a draft must never modify the live revision.
- [ ] Permit a published revision and newer unpublished draft simultaneously.
- [ ] Publish a specifically validated revision/snapshot.
- [ ] Publish translations independently.
- [ ] Unpublish a language version from detail/list/search.
- [ ] Archive records without exposing them publicly.
- [ ] Make repeated publication requests idempotent.
- [ ] Keep publication pointer and searchable data consistent.
- [ ] Refresh affected detail/list/search caches.
- [ ] Surface cache-refresh failure and provide retry.
- [ ] Ensure unpublished content cannot remain public indefinitely.

## 17. Media library

### 17.1 Media data and editing

- [ ] Define stable media ID.
- [ ] Store immutable import identifier when applicable.
- [ ] Store localized display names.
- [ ] Store direct image URL.
- [ ] Store optional thumbnail URL.
- [ ] Store optional Postimages source-page URL.
- [ ] Store localized alt text.
- [ ] Store localized default caption.
- [ ] Store optional dimensions.
- [ ] Store optional credit.
- [ ] Store created/updated timestamps.
- [ ] Validate supported URL protocols and URL shape.
- [ ] Distinguish direct image URL from hosting page URL in the UI.
- [ ] Search registered media.
- [ ] Select media from the library.
- [ ] Add and edit links/metadata.
- [ ] Show where an asset is used.
- [ ] Explain that shared URL/metadata changes affect published uses.
- [ ] Require reassignment or archival before deleting in-use media.

### 17.2 Library performance and states

- [ ] Paginate or virtualize media results.
- [ ] Lazy-load thumbnails near the viewport.
- [ ] Limit active preview requests, initially 4–6.
- [ ] Cancel no-longer-relevant queued work where practical.
- [ ] Prefer thumbnail URLs for grids.
- [ ] Load originals only for explicit large preview.
- [ ] Avoid routing routine previews through Spring Boot.
- [ ] Use fixed-size placeholders to prevent layout movement.
- [ ] Keep a failed preview local to its card.
- [ ] Provide per-card retry.
- [ ] Keep URL fields editable after preview failure.

## 18. Media CSV/bulk import

### 18.1 Input and parsing

- [ ] Accept CSV containing at least `directImageUrl`.
- [ ] Accept optional localized names.
- [ ] Accept optional localized alt text and captions.
- [ ] Accept optional gallery.
- [ ] Accept optional source-page URL.
- [ ] Accept optional thumbnail URL.
- [ ] Accept optional dimensions and credit.
- [ ] Optionally accept bulk Postimages “Thumbnail for websites” HTML.
- [ ] Prefer website HTML rather than BBCode.
- [ ] Parse and sanitize supplied HTML.
- [ ] Extract anchor/source-page URL.
- [ ] Extract thumbnail image URL.
- [ ] Extract proposed alt/name text.
- [ ] Discard supplied markup after extraction.
- [ ] Never store or render pasted import HTML as article content.
- [ ] Parse CSV locally without fetching every remote image.
- [ ] Ignore completely blank rows.
- [ ] Mark non-empty rows without a valid direct image URL as skipped with row error.
- [ ] Normalize safe fields.
- [ ] Detect duplicate direct URLs.

### 18.2 Stable import identifiers and generated names

- [ ] Allocate one immutable identifier per accepted asset.
- [ ] Format identifier as UTC timestamp plus zero-padded batch sequence.
- [ ] Allocate sequence centrally once per asset.
- [ ] Reuse the exact identifier for all localized generated names.
- [ ] Preserve allocation through preview, retries, and chunk boundaries.
- [ ] Generate missing English name from Chinese as `zh_image/{gallery-or-ungrouped}_{identifier}`.
- [ ] Generate missing Chinese name from English as `en_image/{gallery-or-ungrouped}_{identifier}`.
- [ ] Generate both missing names as `image/{gallery-or-ungrouped}_{identifier}`.
- [ ] Allow generated names to be edited before import.
- [ ] Keep stable media/import IDs unchanged after display-name edits.

### 18.3 Thumbnail reconciliation

- [ ] Match thumbnail records using reliable extracted values.
- [ ] Never trust row order when values disagree.
- [ ] Display matched records.
- [ ] Display unmatched records.
- [ ] Display duplicate records.
- [ ] Display ambiguous records.
- [ ] Require owner correction rather than silent guessing.

### 18.4 Import preview and commit

- [ ] Show 25–50 records per page or use virtualization.
- [ ] Show lazy-loaded preview grid.
- [ ] Allow metadata/name correction.
- [ ] Show parsed state.
- [ ] Show parsed-with-warnings state.
- [ ] Show invalid state.
- [ ] Show awaiting-reconciliation state.
- [ ] Show ready state.
- [ ] Commit in bounded, idempotent, retry-safe chunks.
- [ ] Show importing state and progress.
- [ ] Handle partial success.
- [ ] Report created, updated, skipped, and failed counts.
- [ ] Provide downloadable row-level result details.
- [ ] Do not remotely fetch every URL during parsing/save.
- [ ] Protect any optional server-side URL checks against unsafe fetching/SSRF.

## 19. Galleries

- [ ] Define stable gallery ID.
- [ ] Store gallery name and optional description.
- [ ] Add media items to galleries.
- [ ] Permit an asset in multiple galleries.
- [ ] Store ordered gallery items.
- [ ] Store per-placement caption overrides.
- [ ] Reorder by drag where appropriate.
- [ ] Provide keyboard and touch alternatives to dragging.
- [ ] Reference galleries from articles using stable IDs.
- [ ] Support layout, width, spacing, and caption-visibility presets.
- [ ] Default artwork to complete-image display.
- [ ] Permit cropping only for explicit thumbnail/card presentation rules.
- [ ] Show where a gallery is used.
- [ ] Explain that shared gallery changes affect every current use.
- [ ] Require reassignment or archival before deleting an in-use gallery.
- [ ] Clarify that article revisions restore references/settings, not historical external image bytes.

## 20. Taxonomy management

- [ ] Manage categories.
- [ ] Store stable category IDs instead of using names/slugs as foreign keys.
- [ ] Edit category slug.
- [ ] Edit localized category names/descriptions.
- [ ] Edit category display order.
- [ ] Edit enabled status.
- [ ] Edit navigation visibility independently.
- [ ] Archive categories.
- [ ] Require reassignment before deleting a category in use.
- [ ] Ensure category renaming never breaks post relationships.
- [ ] Make a new category appear in the editor after normal refresh.
- [ ] Make a new category appear in search filters without deployment.
- [ ] Provide a working generic public list without deployment.
- [ ] Keep homepage/navigation inclusion separately configurable.
- [ ] Manage tags.
- [ ] Manage translated tag labels where required.
- [ ] Manage brands as filtering dimensions.
- [ ] Manage equipment types as filtering dimensions.
- [ ] Do not force brands/equipment into nested category pages.
- [ ] Document that new categories reuse existing formats and do not imply arbitrary new fields/components.

## 21. Homepage, navigation, and site settings CMS

- [ ] Edit site identity.
- [ ] Edit localized About content.
- [ ] Manage external links.
- [ ] Manage homepage sections.
- [ ] Select visible categories.
- [ ] Order sections.
- [ ] Set entry limits.
- [ ] Select optional featured entries.
- [ ] Configure section-wide thumbnail defaults.
- [ ] Preview thumbnail and thumbnail-less section layouts.
- [ ] Manage navigation visibility separately from category enabled state.
- [ ] Select default theme.
- [ ] Set default comment policy, initially disabled.
- [ ] Set site timezone.
- [ ] Configure/document revision retention.

## 22. Comments — schema now, feature later

### 22.1 Core-release representation

- [ ] Store site-level comment default, initially disabled.
- [ ] Store per-post override: inherit, enabled, or disabled.
- [ ] Clearly identify comment submission as unavailable until implemented.
- [ ] Never display a misleading working public form before backend completion.

### 22.2 Later comment capability

- [ ] Accept validated public comments.
- [ ] Safely render comment content.
- [ ] Put new anonymous comments into moderation.
- [ ] Show comment date and moderation state appropriately.
- [ ] Allow owner approval.
- [ ] Allow owner hide.
- [ ] Allow owner deletion.
- [ ] Add basic abuse controls and rate limits.
- [ ] When submissions are disabled, keep previously approved comments visible unless deliberately hidden.

## 23. Domain model and database

- [ ] Model author/owner identity and public author metadata.
- [ ] Model stable post identity and shared settings.
- [ ] Model post translations and independent draft/published pointers.
- [ ] Model immutable revisions.
- [ ] Model categories and translations.
- [ ] Model tags and assignments.
- [ ] Model brands.
- [ ] Model equipment types.
- [ ] Model audio review details.
- [ ] Model project details.
- [ ] Model post relationships.
- [ ] Model media assets.
- [ ] Model galleries/items.
- [ ] Model themes and published versions.
- [ ] Model site settings.
- [ ] Model search documents/index metadata.
- [ ] Model comment settings and future comments.
- [ ] Model sessions and scoped publishing credentials.
- [ ] Model old-slug redirects.
- [ ] Use stable opaque IDs.
- [ ] Use UTC timestamps in storage.
- [ ] Enforce locale/slug uniqueness in the selected route namespace.
- [ ] Require a primary category for each post.
- [ ] Keep tags and brands separate from the primary category.
- [ ] Enforce references and prevent orphaned records.
- [ ] Ensure search indexes are rebuildable.
- [ ] Ensure draft-only changes do not alter public metadata/search.
- [ ] Document which shared settings have immediate public effects.
- [ ] Create explicit versioned migrations compatible with D1 and local SQLite.
- [ ] Test relevant SQLite/D1 behavior differences.

## 24. Spring Boot editorial API

- [ ] Configure embedded web server.
- [ ] Serve the compiled React/Vite CMS from Spring Boot static resources.
- [ ] Add client-route fallback for CMS routes.
- [ ] Keep `/api/**` controlled by Spring controllers.
- [ ] Structure controllers → services → repository interfaces.
- [ ] Implement D1 HTTP repository adapter.
- [ ] Implement local SQLite repository adapter.
- [ ] Keep all editorial writes behind Spring Boot.
- [ ] Keep D1 SQL/tokens out of browser code.
- [ ] Add authentication resource group.
- [ ] Add posts/translations/revisions resource group.
- [ ] Add publication resource group.
- [ ] Add media resource group.
- [ ] Add galleries resource group.
- [ ] Add taxonomy resource group.
- [ ] Add themes resource group.
- [ ] Add settings resource group.
- [ ] Add search/index-maintenance resource group as needed.
- [ ] Add imports/exports resource group.
- [ ] Add optional comments resource group only when implemented.
- [ ] Validate pagination and payload limits.
- [ ] Return structured field and row validation errors.
- [ ] Separate public and administrative response models.
- [ ] Use idempotency/request IDs for safe import and publication retries.
- [ ] Expose limited health information without secrets/private configuration.

## 25. API error handling and CMS states

- [ ] Handle `400 VALIDATION_FAILED` while preserving input.
- [ ] Handle `401 AUTH_REQUIRED` with recovery copy and sign-in prompt.
- [ ] Handle `403 FORBIDDEN`/CSRF failure without unsafe auto-retry.
- [ ] Handle `404 NOT_FOUND` contextually without clearing editor data.
- [ ] Handle `409 VERSION_CONFLICT` with autosave stop and resolution options.
- [ ] Handle `409 DUPLICATE_VALUE` with the conflicting value highlighted.
- [ ] Handle `413 PAYLOAD_TOO_LARGE` while preserving local input.
- [ ] Handle `415 UNSUPPORTED_FORMAT` with accepted-format guidance.
- [ ] Handle `422 REFERENCE_INVALID` with each broken reference identified.
- [ ] Handle `429 RATE_LIMITED` using server retry guidance/manual retry.
- [ ] Handle `500 INTERNAL_ERROR` with request ID and safe retry.
- [ ] Handle `502 UPSTREAM_ERROR` with bounded retry.
- [ ] Handle `503 SERVICE_UNAVAILABLE`/cold start with connecting state and backoff.
- [ ] Handle `504 UPSTREAM_TIMEOUT` as an unknown outcome requiring reconciliation.
- [ ] Keep thumbnail errors on their media cards.
- [ ] Keep import errors on their rows.
- [ ] Use screen-level failures only when the entire screen cannot function.
- [ ] Never expose credentials, raw SQL, stack traces, or article bodies in errors/logs.

## 26. Public Cloudflare Worker/read application

- [ ] Match locale and route.
- [ ] Query only published records through a D1 binding.
- [ ] Return localized rendered not-found page when no published record exists.
- [ ] Select shared homepage/category/article/project/search templates.
- [ ] Render meaningful React HTML on the server.
- [ ] Hydrate only optional browser interactions.
- [ ] Keep public rendering independent of Render/Spring Boot availability.
- [ ] Keep the Worker small and avoid duplicating the editorial backend.
- [ ] Prevent all draft/admin fields from public responses.
- [ ] Use compatible contracts in cloud and local deployments.
- [ ] Implement bounded cache refresh/invalidation after publication changes.

## 27. Security and secret boundaries

- [ ] Keep D1/Cloudflare tokens in server-side secrets only.
- [ ] Keep Wrangler credentials in trusted local/CI environments only.
- [ ] Keep credentials out of frontend bundles.
- [ ] Keep credentials out of browser storage.
- [ ] Keep credentials out of exports.
- [ ] Keep credentials out of repository files/history.
- [ ] Keep credentials out of logs.
- [ ] Never expose a general-purpose public SQL proxy.
- [ ] Ensure public endpoints expose published data only.
- [ ] Require owner session/scoped credential for administrative endpoints.
- [ ] Apply authorization to direct API calls, not only UI routes.
- [ ] Sanitize content and URLs server-side.
- [ ] Add request size limits.
- [ ] Add rate limits where appropriate.
- [ ] Avoid SSRF in any optional remote URL checks.
- [ ] Log safe request identifiers without private content.
- [ ] Test that guessed draft URLs and API calls never disclose drafts.

## 28. Import, export, backup, and recovery

### 28.1 Portable content export

- [ ] Define a versioned JSON package.
- [ ] Include posts and translations.
- [ ] Include applicable revisions.
- [ ] Include media references.
- [ ] Include galleries, order, and captions.
- [ ] Include taxonomy and relationships.
- [ ] Optionally include themes/settings through explicit choices.
- [ ] Include schema version, export time, and stable IDs.
- [ ] Preserve Unicode, timestamps, ordering, and relationships.
- [ ] Exclude credentials, sessions, and private infrastructure settings.
- [ ] Exclude image bytes by default and document external references.
- [ ] Optionally provide lossy human-readable Markdown export with clear labeling.

### 28.2 Portable import

- [ ] Validate the package before applying changes.
- [ ] Reject unsupported schema versions with actionable guidance.
- [ ] Show entity counts.
- [ ] Show validation errors.
- [ ] Show reference problems.
- [ ] Show conflicts.
- [ ] Support explicit create/update/skip decisions or a documented batch policy.
- [ ] Make repeat imports safe.
- [ ] Identify partial failures.
- [ ] Never automatically publish imported drafts.
- [ ] Process large imports in bounded resumable/retryable batches.

### 28.3 Backup and restore

- [ ] Document D1 backup/export.
- [ ] Document D1 restore.
- [ ] Document local SQLite backup.
- [ ] Document local SQLite restore.
- [ ] Test restoration into a clean non-production environment.
- [ ] Rebuild search index after restoration.
- [ ] Document that restoring references cannot restore deleted Postimages files.
- [ ] Recommend retaining original image files independently.

## 29. Local-deployment branch

- [ ] Create the separate `local-deployment` branch when implementation reaches that stage.
- [ ] Keep cloud deployment as the primary development line.
- [ ] Preserve shared UI, contracts, schemas, and business rules.
- [ ] Prefer profiles/adapters over divergent business-logic copies.
- [ ] Document how shared fixes flow between branches.
- [ ] Run public frontend locally.
- [ ] Run CMS locally.
- [ ] Run Spring Boot locally.
- [ ] Use persistent local SQLite.
- [ ] Provide compatible local public-read/search endpoints.
- [ ] Run without production Cloudflare/Render credentials.
- [ ] Store database files outside ephemeral build directories and exclude them from Git.
- [ ] Provide local secrets/config template with placeholders only.
- [ ] Bind to localhost by default.
- [ ] Require an explicit authenticated choice for LAN exposure.
- [ ] Document that external Postimages media still needs internet access.
- [ ] Document setup, start, stop, reset, and backup.
- [ ] Consider an optional container-based launcher.

## 30. Local-to-cloud content transfer

- [ ] Keep local and cloud databases independent.
- [ ] Do not add silent bidirectional synchronization.
- [ ] Use import/export as the baseline transfer mechanism.
- [ ] Send local-to-cloud publishing through the authenticated cloud editorial API.
- [ ] Apply the same validation, authorization, revision, and publication rules as browser CMS.
- [ ] Never write directly from a local client to production D1.
- [ ] Show the target environment prominently.
- [ ] Preserve stable IDs or use an explicit ID mapping.
- [ ] Detect remote changes.
- [ ] Offer conflict resolution instead of overwriting silently.
- [ ] Never let local deletion automatically delete cloud content.
- [ ] Do not imply bulk deletion/synchronization from package publishing.

## 31. Cloud deployment

### 31.1 Spring Boot/Render

- [ ] Build the React/Vite CMS for production.
- [ ] Copy/package CMS output into Spring Boot static resources.
- [ ] Deploy the combined Spring Boot/CMS service to Render.
- [ ] Configure server-side D1 HTTP credentials as Render secrets.
- [ ] Verify same-origin session and CSRF behavior on desktop.
- [ ] Verify same-origin session and CSRF behavior on phone/tablet.
- [ ] Measure and document free-tier cold start behavior.
- [ ] Show honest connecting/retrying states.
- [ ] Do not use artificial keep-alive traffic as the baseline.

### 31.2 Cloudflare

- [ ] Configure Wrangler.
- [ ] Configure environments/bindings without committing secrets.
- [ ] Create/apply D1 migrations in the correct order.
- [ ] Deploy public Worker/assets.
- [ ] Verify published-only D1 reads.
- [ ] Verify public reading while Render is asleep/unavailable.
- [ ] Stay within free Cloudflare services for the baseline.
- [ ] Do not use Cloudflare Containers while claiming a free baseline.
- [ ] Document Worker request/CPU and D1 constraints.
- [ ] Index/paginate/bound operations to fit service limits.
- [ ] Handle quota/service failures without corrupting editorial state.

### 31.3 Release operations

- [ ] Separate development/staging and production data/credentials.
- [ ] Document schema migration order.
- [ ] Document compatible API/Worker deployment order.
- [ ] Document rollback limitations and recovery steps.
- [ ] Verify normal publication requires no frontend code redeploy.
- [ ] Verify article editing never redeploys independent software projects.

## 32. Accessibility and responsive verification

- [ ] Test public site on desktop width.
- [ ] Test public site on tablet width.
- [ ] Test public site on phone width.
- [ ] Test CMS on desktop width.
- [ ] Test CMS on tablet width.
- [ ] Test CMS on phone width.
- [ ] Drive layout from available space, not device-name detection.
- [ ] Reduce card/grid columns responsively.
- [ ] Preserve gallery proportions across widths.
- [ ] Ensure article text stays readable.
- [ ] Ensure no page-level horizontal scrolling.
- [ ] Keep wide tables/code scrollable within containers.
- [ ] Move CMS settings side panels into mobile-accessible panels/sections.
- [ ] Test touch interaction.
- [ ] Test keyboard-only navigation.
- [ ] Ensure no essential operation depends on hover.
- [ ] Ensure no essential operation depends only on drag-and-drop.
- [ ] Verify visible keyboard focus.
- [ ] Verify accessible control names.
- [ ] Verify sufficient touch target sizes.
- [ ] Verify dialog focus trap, Escape/dismissal, and focus restoration.
- [ ] Require meaningful alt text or explicit decorative designation.
- [ ] Respect reduced-motion preferences.
- [ ] Test with virtual keyboard open.
- [ ] Ensure save/publish controls remain accessible above the virtual keyboard.
- [ ] Test language/theme controls on narrow screens.
- [ ] Run automated accessibility checks and manual spot checks.

## 33. Performance, reliability, and observability

- [ ] Keep editor code out of the public bundle.
- [ ] Lazy-load non-critical images.
- [ ] Use dimensions/aspect ratios to reduce layout shift.
- [ ] Use responsive images/previews when legitimately available.
- [ ] Do not assume undocumented Postimages transformation APIs.
- [ ] Paginate all potentially large lists.
- [ ] Bound import/export and article sizes.
- [ ] Add request timeouts and bounded retries.
- [ ] Make retry outcomes reconcilable/idempotent.
- [ ] Add safe server error logging with request IDs.
- [ ] Exclude credentials and article bodies from normal failure logs.
- [ ] Monitor storage growth.
- [ ] Monitor publication/cache-refresh failures.
- [ ] Monitor search-index failures.
- [ ] Provide lightweight operational view or documented provider-dashboard workflow.
- [ ] Document availability limits; do not promise unlimited traffic or always-on free hosting.

## 34. Testing strategy

- [ ] Add unit tests for domain validation.
- [ ] Add unit tests for thumbnail setting precedence: post override > section/grid default.
- [ ] Add unit tests for theme derivation and contrast validation.
- [ ] Add unit tests for generated media names/identifiers.
- [ ] Add unit tests for date-range timezone conversion.
- [ ] Add unit tests for content sanitization.
- [ ] Add repository contract tests shared by D1 and SQLite adapters where practical.
- [ ] Add migration tests against clean databases.
- [ ] Add API integration tests for authentication and CSRF.
- [ ] Add API integration tests for optimistic concurrency.
- [ ] Add API integration tests for publication/unpublication.
- [ ] Add API integration tests for idempotent retries.
- [ ] Add editor save/reload round-trip tests.
- [ ] Add gallery/table/caption/custom-component round-trip tests.
- [ ] Add public draft-leakage tests.
- [ ] Add public SSR/content tests.
- [ ] Add search fixture tests.
- [ ] Add import preview/reconciliation/chunk-retry tests.
- [ ] Add export/re-import relationship tests.
- [ ] Add browser tests for Back/Forward and URL-restored filters.
- [ ] Add responsive browser tests for key public/CMS flows.
- [ ] Add keyboard and touch interaction tests.
- [ ] Add broken-image isolation tests.
- [ ] Add cold-start/unavailable-state tests where practical.
- [ ] Add deployment smoke tests for staging and production.

## 35. Acceptance criteria verification

- [ ] **AC-01:** Homepage displays the three initial subjects with consistent cards and a usable sparse-content state.
- [ ] **AC-02:** A new CMS category appears in editor/search filters and has a working public list without code deployment.
- [ ] **AC-03:** Owner can create, preview, and publish from desktop and phone.
- [ ] **AC-04:** Readers cannot access drafts by list, search, guessed URL, API, or cache.
- [ ] **AC-05:** Editing a published article autosaves a draft without modifying the live revision.
- [ ] **AC-06:** Reloading after acknowledged save restores saved content.
- [ ] **AC-07:** Network failure produces an accurate save-failure/recovery state.
- [ ] **AC-08:** Concurrent edits from two devices produce a conflict rather than silent data loss.
- [ ] **AC-09:** Restoring history creates a draft and requires explicit publication.
- [ ] **AC-10:** Editor galleries, tables, captions, and content survive save/reopen.
- [ ] **AC-11:** Executable markup and unsafe links are rejected or safely removed server-side.
- [ ] **AC-12:** A Postimages asset can be reused; URL correction updates references.
- [ ] **AC-13:** Gallery order, captions, and complete-artwork display work on phone and desktop.
- [ ] **AC-14:** English and Chinese versions can be edited/published independently.
- [ ] **AC-15:** Missing translations are clearly labeled as fallback/original language.
- [ ] **AC-16:** Search passes English, Chinese, mixed, date, category, and publication fixtures.
- [ ] **AC-17:** Search URLs preserve filters/sort/pagination through reload and navigation.
- [ ] **AC-18:** CMS-published theme applies across components without rewriting posts.
- [ ] **AC-19:** Reader theme preference survives reload and falls back safely.
- [ ] **AC-20:** Theme preview flags unreadable combinations and permits correction.
- [ ] **AC-21:** Tables/code scroll internally; mobile pages do not overflow horizontally.
- [ ] **AC-22:** Navigation, dialogs, and key editing controls work with keyboard and touch.
- [ ] **AC-23:** Cloudflare/D1 credentials are absent from payloads, bundles, logs, exports, and repository history.
- [ ] **AC-24:** Unauthenticated mutations fail, including direct API attempts.
- [ ] **AC-25:** Public reading/search works while Spring Boot is asleep/unavailable.
- [ ] **AC-26:** Publication/unpublication updates public detail/list/search within the documented bound.
- [ ] **AC-27:** Export/re-import into a clean environment preserves content and relationships.
- [ ] **AC-28:** Local branch runs without production credentials and retains data after restart.
- [ ] **AC-29:** Local-to-cloud import detects conflicts and does not silently publish/delete remote content.
- [ ] **AC-30:** Baseline cloud deployment uses no paid Cloudflare service.
- [ ] **AC-31:** Migrations and backup restoration are verified in non-production.
- [ ] **AC-32:** Comment settings are represented; no enabled public form exists before backend completion.
- [ ] **AC-33:** Coding provides a responsive compact app grid containing app name, date, short description, and an optional thumbnail.
- [ ] **AC-34:** Homepage/category/content sections can switch all cards between thumbnail and thumbnail-less presentation.
- [ ] **AC-35:** Each post can inherit, show, or hide its thumbnail, and its explicit choice overrides the section/grid default.

## 36. Documentation deliverables

- [ ] Keep this checklist current.
- [ ] Document system architecture.
- [ ] Document API contracts.
- [ ] Document database schema and migrations.
- [ ] Document content schema/version migrations.
- [ ] Document design-system tokens and variants.
- [ ] Document theme derivation and accessibility rules.
- [ ] Document search behavior and Chinese tokenisation.
- [ ] Document media registration and import workflow.
- [ ] Document publication, cache refresh, and failure recovery.
- [ ] Document cloud setup and deployment.
- [ ] Document secrets/configuration without including secret values.
- [ ] Document local-deployment branch setup and operation.
- [ ] Document import/export and local-to-cloud transfer.
- [ ] Document backup/restore and verified recovery results.
- [ ] Document free-plan limits, cold starts, and availability expectations.
- [ ] Record meaningful verification commands/results.

## 37. Recommended implementation sequence

### Phase 1 — Foundation and risk proofs

- [ ] Complete implementation decisions and repository foundation.
- [ ] Build initial design tokens and core controls.
- [ ] Prove Spring Boot deployment on Render.
- [ ] Prove server-side D1 HTTP access.
- [ ] Prove local SQLite repository behavior.
- [ ] Prove same-origin CMS authentication on desktop and phone.
- [ ] Validate editor licensing.
- [ ] Prove minimal gallery save/reload round trip.
- [ ] Prototype Chinese search using required fixtures.
- [ ] Prove public React server rendering on Cloudflare.

### Phase 2 — Complete editorial loop

- [ ] Implement schema and migrations.
- [ ] Implement owner authentication and CMS shell.
- [ ] Implement taxonomy basics.
- [ ] Implement media registration/library.
- [ ] Implement gallery management.
- [ ] Implement post list and editor.
- [ ] Implement bilingual versions.
- [ ] Implement autosave and recovery.
- [ ] Implement optimistic concurrency.
- [ ] Implement revision history.
- [ ] Implement private preview.
- [ ] Implement publish/unpublish.
- [ ] Implement published-only public reads/rendering.

### Phase 3 — Public experience

- [ ] Implement homepage.
- [ ] Implement generic category/archive page.
- [ ] Implement compact coding application grid.
- [ ] Implement section-wide and per-post thumbnail controls.
- [ ] Implement shared article shell and format-specific detail pages.
- [ ] Implement navigation, About, footer, and supporting pages.
- [ ] Implement full bilingual interface/content behavior.
- [ ] Implement search and all required filters.
- [ ] Implement theme CMS and reader preference.
- [ ] Complete responsive/accessibility verification.

### Phase 4 — Portability and operational readiness

- [ ] Complete media CSV/HTML bulk import.
- [ ] Complete portable import/export.
- [ ] Complete local-deployment branch.
- [ ] Complete local-to-cloud publishing.
- [ ] Verify backups and clean-environment restoration.
- [ ] Verify cache refresh and failure handling.
- [ ] Verify security boundaries.
- [ ] Complete all acceptance criteria.
- [ ] Complete deployment and operations documentation.

### Later milestone — Public comments

- [ ] Implement public submission only after moderation and abuse controls are ready.
- [ ] Verify comments before changing their capability status from unavailable.

## 38. Explicitly out of scope for the initial release

- [ ] Do not implement automatic Postimages uploads.
- [ ] Do not store image binaries in D1.
- [ ] Do not build a general-purpose drag-and-drop website builder.
- [ ] Do not allow arbitrary CSS, JavaScript, or executable post HTML.
- [ ] Do not implement multi-user collaborative editing.
- [ ] Do not implement ecommerce or subscriptions.
- [ ] Do not implement reader accounts/social-network features.
- [ ] Do not implement automatic translation.
- [ ] Do not implement AI search or paid search infrastructure.
- [ ] Do not run portfolio applications inside the CMS.
- [ ] Do not use paid Cloudflare Containers while claiming a free baseline.
- [ ] Do not allow future optional work to block the first complete publishing loop.
