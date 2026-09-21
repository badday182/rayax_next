# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Rayax is a Next.js (App Router) single-page tool for generating X-ray ("R-графія") diagnostic report text in Ukrainian. A radiologist picks a body zone (ОГК, Череп, ШВХ, ГВХ, ПВХ, суглоби, etc.), fills in form fields describing findings, and the app assembles formatted report paragraphs that get pushed into a TinyMCE rich-text editor for the final document. Most state is client-side Redux, with `localStorage` persisting the editor's text across "new patient" resets. The only backend is Supabase, used narrowly for user auth and per-user custom dropdown options (see below) — everything else about the app is still purely client-side.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — Next.js/ESLint

There is no test suite configured (`react-scripts`/`@testing-library` are installed as deps but no `test` script or test files exist).

## Environment

- `NEXT_PUBLIC_TINY_EDITOR_API_KEY` in `.env` — TinyMCE API key. TinyMCE itself is self-hosted from `public/tinymce/` (loaded via `tinymceScriptSrc="/tinymce/tinymce.min.js"` in [TextEditor.js](src/components/TextEditor/TextEditor.js)), not loaded from TinyMCE's CDN.
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env` — Supabase project used for auth + `custom_options` table (see [supabaseClient.js](src/lib/supabaseClient.js)). Email confirmation is left at Supabase's default; the built-in email sender has a low rate limit (`email rate limit exceeded` after a handful of signups in a short window) — fine for real usage, but during manual testing prefer confirming/creating test users directly in Supabase Dashboard → Authentication → Users rather than repeatedly hitting the signup form.

## Architecture

The app follows a **repeating three-part pattern per anatomical "zone"** (ОГК/chest, Череп/skull, ШВХ/cervical spine, ГВХ/thoracic spine, ПВХ/lumbar spine, ОЧП/abdomen, and various joints/limbs):

1. **Data files** (`src/data/<ZONE>/*.js`) — plain arrays/strings of Ukrainian option text, e.g. `<ZONE>Views`, `<zone>NormaNenorma`, `<zone>NenormaItems`, and `<ZONE>_notNorma/*` files holding sentence fragments for abnormal findings. These are just constants — no logic.
2. **Zone form component** (`src/components/zones/<Zone>.js`) — renders `<AddOptionBlock>`/`<FormFloatingSelect>` dropdowns driven by the data files above, using local `useState` counters (arrays of `{id: uuid}`) to let the user add/remove repeatable option rows (e.g. multiple findings of the same category). Dispatches redux actions on selection/removal.
3. **Redux slice** (`src/components/redux/slices/*.js`) — most zones don't get their own slice; instead they write into the shared **`universalSliceReducer`** (generic numbered arrays like `commaUniversalArray_1..6`, `semicolonUniversalArray_1`, keyed by a per-field `floatingId` so multiple zones can reuse the same "slots"). A few zones with more unique shapes have dedicated slices (`ogkSliseReducer`, `cherepSliseReducer`, `ppnSliseReducer`, `zoneInfoSliseReducer` for zone/side/projection/norma selection, `pacientInfoSliseReducer`, `documentSliseReducer`, `newZoneSlise`, `descriptionOnlyReducer`).

**Report generation is centralized**, not per-zone: [zoneInfoPattern.js](src/patternsText/zoneInfoPattern.js) (`ZoneInfoPattern`) is one large function that reads the currently selected `zone` from `zoneInfo` state plus all the relevant slice text, and contains an `if (zone === "...")` branch per zone that builds the final report string/JSX (including the R-графія/ЕЕД(mSv) header table). [pacientInfoPattern.js](src/patternsText/pacientInfoPattern.js) similarly renders the patient-info header block. Both are rendered to HTML via `renderToString` (from `react-dom/server`, used client-side) before being pushed into Redux/localStorage/the editor.

**Component flow**: [page.js](src/app/page.js) → `PacientCard` (one per patient) → `PatientInfo` (header fields) + one or more `ImagineOptions` (one per zone entry added) → [ImagineOptions.js](src/components/ImagineOptions.js) renders the zone picker and conditionally mounts the matching zone component from `src/components/zones/`, plus an "Додати" button that runs `ZoneInfoPattern`/`PacientInfoPattern`, dispatches the resulting text into `documentSliseReducer`, and resets the per-zone slices for the next entry. `descriptionOnly` mode reuses the same `ImagineOptions`/zone components but skips the R-графія header and patient block (for adding a bare findings paragraph without a new visit record).

When adding a new zone, the pattern to follow is: add a data folder, a zone component, wire selection into `FloatingLabel.js`'s `handleZoneSelect` (which centrally dispatches into the universal/ogk/cherep slices based on which data array the selected value belongs to — see the large `if (someViews.includes(selectedZone))` chain there), add a branch in `ZoneInfoPattern`, and register the zone in `src/data/zones.js` (plus `zonesWithSides`/`zonesWithOnly2Projection`/`zonesWithOnlyDirectProjection` if relevant) and `ImagineOptions.js`'s conditional render list.

Path alias `@/*` maps to `src/*` (see [jsconfig.json](jsconfig.json)).

## Auth and user-added custom options

Logged-in users can save their own text options into the "finding" dropdowns (the ones rendered via `AddOptionBlock`), so next time those options appear first in that same dropdown. This bolts onto the value-membership dispatch mechanism above rather than replacing it:

- [AuthProvider.js](src/components/Auth/AuthProvider.js) — thin React Context (not Redux — it wraps the external Supabase auth session, not app domain data) wrapping `supabase.auth`. Exposes `useAuth()` → `{ user, loading, signUp, signIn, signOut, signInWithGoogle }`. Mounted in [layout.js](src/app/layout.js) inside `ReduxProvider`. On login/logout it dispatches `fetchCustomOptions`/`clearCustomOptions` into Redux. Google sign-in avoids Supabase's built-in-email rate limit entirely (no confirmation email involved) — requires a Google Cloud OAuth client configured with redirect URI `<SUPABASE_PROJECT_URL>/auth/v1/callback`, wired up in Supabase Dashboard → Authentication → Sign In / Providers → Google.
- [customOptionsSliceReducer.js](src/components/redux/slices/customOptionsSliceReducer.js) — Redux slice (unlike auth, this _is_ domain state, consistent with the rest of the app) holding `{ byKey: { [fieldKey]: string[] } }`, fetched from/written to the Supabase `custom_options` table (`user_id`, `field_key`, `value`, RLS-scoped to the owning user).
- `fieldKeyByArray` (exported from [FloatingLabel.js](src/components/FloatingLabel.js)) is a curated allowlist `Map` from a specific static data array (e.g. `fiziologKifos`, `cherepViews`) to a stable string key. It intentionally excludes structural selectors (`zones`, `sides`, `ogkViews`, the `*NormaNenorma` arrays) — only "finding"/"заключення" arrays are customizable.
- [AddOptionBlock.js](src/components/AddOptionBlock.js) looks up `fieldKeyByArray.get(items)` (reference equality — reliable because every zone component passes the imported array directly, never a copy) and merges the user's saved values into what gets rendered: **`[items[0], ...custom, ...items.slice(1)]`, never a plain prepend**. `items[0]` must stay pinned because it's read as a sentinel/default elsewhere (`zoneInfoPattern.js`'s "nothing selected" fallback, and the mount-time default-sync effect in `FloatingLabel.js` via `src/data/viewsToEditSemicolUnivArray_1.js`'s `firstElements`) — putting a custom value at index 0 would desync the visibly-selected dropdown value from what actually lands in the generated report. It also renders the small "Зберегти" input that calls `addCustomOption`, guarded against saving anything containing `svoiVaryant` ("Пустий варіант") text, which is a pre-existing placeholder sentinel meaning "print nothing, let the doctor type manually" — a saved custom option must stay distinguishable from that.
- `FloatingLabel.js`'s `handleZoneSelect` cannot just check the plain static array anymore (a custom value isn't a member of it), so every allowlisted `someArray.includes(selectedZone)` check was replaced with a local `matches(someArray, selectedZone)` helper that also checks `customOptionsByKey[fieldKeyByArray.get(someArray)]` first. This is the piece that makes a custom selection actually dispatch into the same redux slot as a static one, so it reaches `zoneInfoPattern.js`'s output.
- The static arrays in `src/data/**` and `zoneInfoPattern.js` itself are **never mutated** — merging only happens locally in `AddOptionBlock`'s render and in the `matches()` check, so SSR/hydration stays consistent (custom options simply aren't present until the client-side Supabase fetch resolves, same pattern the app already used for restoring `textToDoc` from `localStorage` in `page.js`).
- Known pre-existing gap this doesn't fix: the "Кісток тазу" zone (`zoneInfoPattern.js`'s `Кісток тазу` branch) prints one fixed paragraph for any non-default selection regardless of the actual text chosen — a custom option saved there is selectable but won't be reflected in the generated report. Not touched, since it's a pre-existing zone quirk unrelated to this feature.
- Fixed while building this: ГВХ's "Висота тіл хребців" field passes `vysotaTilHrebtsivGvh` into its `AddOptionBlock`, a different (mostly-but-not-fully overlapping) array than `vysotaTilHrebtsivShvh`. It had no `fieldKeyByArray` entry at all and no `matches()` dispatch branch in `handleZoneSelect`, so it silently had no "Зберегти" UI and its one GVH-specific static option never reached the report. Both are now fixed with their own dedicated key (not aliased to ШВХ's, to avoid cervical/thoracic custom options bleeding into each other's dropdowns).

## Managing saved custom options: /account

[account/page.js](src/app/account/page.js) — a dedicated route (not a modal), reachable by clicking the avatar in [Header.js](src/components/Header/Header.js). Reads `state.customOptions.byKey` directly (already populated on login, no extra fetch) and cross-references it against [customizableFieldsCatalog.js](src/data/customizableFieldsCatalog.js) — a display-only `{ key, zone, label }` list mirroring `fieldKeyByArray`'s keys (used only for human-readable headings here, never for logic) — to render one card per field that actually has saved values, skipping empty ones. Each value is edit-in-place (local draft state, save disabled until changed and non-empty) or deletable (with a confirm prompt).

`updateCustomOption`/`deleteCustomOption` (added to `customOptionsSliceReducer.js`) deliberately match rows by the natural key `(user_id, field_key, value)` — exactly the table's existing `unique` constraint — rather than tracking each row's `id` client-side, so `byKey`'s shape (`{ [fieldKey]: string[] }`) never changes and `FloatingLabel.js`'s `matches()` / `AddOptionBlock.js`'s merge logic needed zero changes. Because Supabase `.update()`/`.delete()` don't error on a zero-row match, both thunks append `.select()` and explicitly throw if nothing came back (guards against a stale draft silently no-oping, e.g. two tabs open).

Requires two more RLS policies beyond the original `select`/`insert` ones (run once in Supabase SQL Editor):

```sql
create policy "update own custom options" on public.custom_options
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own custom options" on public.custom_options
  for delete using (auth.uid() = user_id);
```

## Custom "Норма/Не норма" templates (ОГК, ГВХ, ШВХ, ПВХ)

Separate from the per-field custom options above: for "single-list" zones (Череп, ППН, ОЧП, joints, etc.) the "Норма/Не норма" selector already goes through `AddOptionBlock`, so the existing custom-option mechanism already lets a user's selected dropdown value double as the full report text — nothing extra was needed there. But ОГК/ГВХ/ШВХ/ПВХ have a **structural** top-level "Норма/Не норма" `FormFloatingSelect` (not via `AddOptionBlock`) whose value `zoneInfoPattern.js` matches against specific hardcoded strings to build a multi-part report — the dropdown's title and the eventual report text are different things there, so a user-added entry needs a separate title and description.

- `public.norm_templates` (`user_id`, `zone`, `title`, `description`, `unique(user_id, zone, title)`, full select/insert/update/delete RLS from the start — unlike `custom_options`, this table got all four policies up front instead of adding update/delete later) — see [normTemplatesSliceReducer.js](src/components/redux/slices/normTemplatesSliceReducer.js) (`state.normTemplates.byZone: { [zone]: {title, description}[] }`, fetched on login in `AuthProvider.js` alongside `fetchCustomOptions`/`fetchProfile`).
- [AddNormTemplateButton.js](src/components/AddNormTemplateButton.js) — reusable "Додати свою норму/не норму" button + modal (two fields: title shown in the dropdown, description that becomes the report). Used once per connected zone file (`Ogk.js`, `Gvh.js`, `Shvh.js`, `Pvh.js`), each of which merges its zone's templates into the structural `*NormaNenorma` array (`[arr[0], ...templateTitles, ...arr.slice(1)]` — same pinned-`[0]` rule as `AddOptionBlock`, since e.g. `ogkNormaNenorma[0]` is read as the "nothing selected" default in `zoneInfoPattern.js`).
- `FloatingLabel.js`'s `normArrayToZone` Map (parallel to `fieldKeyByArray`, but a different Redux slice/shape) plus a `matchesNormTitle()` helper make a custom title dispatch `editNorma` the same as a static value would — extended per zone (`ogkNormaNenorma`/`gvhNormaNenorma`/`shvhNormaNenorma`/`pvhNormaNenorma` are all registered now).
- `zoneInfoPattern.js`'s **first-ever edit**: right after reading `zone`/`norma`, it looks up `matchedNormTemplate = normTemplatesByZone[zone]?.find(t => t.title === norma)`. The entire pre-existing zone-branch chain (ОГК through Передні відділи стопи) is wrapped in `if (!matchedNormTemplate) { ... }` unchanged, followed by `if (matchedNormTemplate) { report = matchedNormTemplate.description; }`. `radiography`/`mSv` are computed earlier and untouched — a template only overrides the finding text, not the imaging-procedure header. For any zone with no templates registered in `normArrayToZone`, `matchedNormTemplate` is always `undefined`, so this is a no-op there.
- `/account` renders a second section ("Мої шаблони норми/не норми") reading `state.normTemplates.byZone`, one card per zone with values, each template's title and description independently editable and deletable (same `updateX`/`deleteX`-by-natural-key + `.select()`-guard pattern as `custom_options`).

## Premium status

There's no payment integration — premium is granted manually by the site owner via Supabase, not self-serve. `public.profiles` (`id` references `auth.users(id)`, `email`, `is_premium boolean default false`) has a row auto-created per signup by a Postgres trigger (`on_auth_user_created` → `handle_new_user()`). RLS only grants `select` to the owning row — there's deliberately no `insert`/`update` policy for the `authenticated` role, so a user can never grant themselves premium from the client; only the project owner running SQL (or using Table Editor) as the Postgres role can flip `is_premium`. [profileSliceReducer.js](src/components/redux/slices/profileSliceReducer.js) fetches this once per login (same trigger point as `fetchCustomOptions`, wired in `AuthProvider.js`) into `state.profile.isPremium`. Currently gates two things, both read via `useSelector((state) => state.profile.isPremium)`: a "Premium" badge on the avatar in [Header.js](src/components/Header/Header.js), and hiding the donation banner entirely ([Banner.jsx](src/components/Banner/Banner.jsx) returns `null` when premium).

## Notes

- UI text, variable/data names, and comments are a mix of Ukrainian (UI-facing) and Russian (many code comments) — this is normal for this codebase, not a mistake to "fix".
- Styling: Bootstrap 5 (`bootstrap.css` imported globally) + `react-bootstrap` + Tailwind utility classes side by side, plus component-scoped CSS files (`Banner/banner.css`, `PatientInfo/patientInfo.css`).
