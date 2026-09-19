# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Rayax is a Next.js (App Router) single-page tool for generating X-ray ("R-графія") diagnostic report text in Ukrainian. A radiologist picks a body zone (ОГК, Череп, ШВХ, ГВХ, ПВХ, суглоби, etc.), fills in form fields describing findings, and the app assembles formatted report paragraphs that get pushed into a TinyMCE rich-text editor for the final document. There is no backend/API — all state is client-side Redux, and `localStorage` is used to persist the editor's text across "new patient" resets.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — Next.js/ESLint

There is no test suite configured (`react-scripts`/`@testing-library` are installed as deps but no `test` script or test files exist).

## Environment

- `NEXT_PUBLIC_TINY_EDITOR_API_KEY` in `.env` — TinyMCE API key. TinyMCE itself is self-hosted from `public/tinymce/` (loaded via `tinymceScriptSrc="/tinymce/tinymce.min.js"` in [TextEditor.js](src/components/TextEditor/TextEditor.js)), not loaded from TinyMCE's CDN.

## Architecture

The app follows a **repeating three-part pattern per anatomical "zone"** (ОГК/chest, Череп/skull, ШВХ/cervical spine, ГВХ/thoracic spine, ПВХ/lumbar spine, ОЧП/abdomen, and various joints/limbs):

1. **Data files** (`src/data/<ZONE>/*.js`) — plain arrays/strings of Ukrainian option text, e.g. `<ZONE>Views`, `<zone>NormaNenorma`, `<zone>NenormaItems`, and `<ZONE>_notNorma/*` files holding sentence fragments for abnormal findings. These are just constants — no logic.
2. **Zone form component** (`src/components/zones/<Zone>.js`) — renders `<AddOptionBlock>`/`<FormFloatingSelect>` dropdowns driven by the data files above, using local `useState` counters (arrays of `{id: uuid}`) to let the user add/remove repeatable option rows (e.g. multiple findings of the same category). Dispatches redux actions on selection/removal.
3. **Redux slice** (`src/components/redux/slices/*.js`) — most zones don't get their own slice; instead they write into the shared **`universalSliceReducer`** (generic numbered arrays like `commaUniversalArray_1..6`, `semicolonUniversalArray_1`, keyed by a per-field `floatingId` so multiple zones can reuse the same "slots"). A few zones with more unique shapes have dedicated slices (`ogkSliseReducer`, `cherepSliseReducer`, `ppnSliseReducer`, `zoneInfoSliseReducer` for zone/side/projection/norma selection, `pacientInfoSliseReducer`, `documentSliseReducer`, `newZoneSlise`, `descriptionOnlyReducer`).

**Report generation is centralized**, not per-zone: [zoneInfoPattern.js](src/patternsText/zoneInfoPattern.js) (`ZoneInfoPattern`) is one large function that reads the currently selected `zone` from `zoneInfo` state plus all the relevant slice text, and contains an `if (zone === "...")` branch per zone that builds the final report string/JSX (including the R-графія/ЕЕД(mSv) header table). [pacientInfoPattern.js](src/patternsText/pacientInfoPattern.js) similarly renders the patient-info header block. Both are rendered to HTML via `renderToString` (from `react-dom/server`, used client-side) before being pushed into Redux/localStorage/the editor.

**Component flow**: [page.js](src/app/page.js) → `PacientCard` (one per patient) → `PatientInfo` (header fields) + one or more `ImagineOptions` (one per zone entry added) → [ImagineOptions.js](src/components/ImagineOptions.js) renders the zone picker and conditionally mounts the matching zone component from `src/components/zones/`, plus an "Додати" button that runs `ZoneInfoPattern`/`PacientInfoPattern`, dispatches the resulting text into `documentSliseReducer`, and resets the per-zone slices for the next entry. `descriptionOnly` mode reuses the same `ImagineOptions`/zone components but skips the R-графія header and patient block (for adding a bare findings paragraph without a new visit record).

When adding a new zone, the pattern to follow is: add a data folder, a zone component, wire selection into `FloatingLabel.js`'s `handleZoneSelect` (which centrally dispatches into the universal/ogk/cherep slices based on which data array the selected value belongs to — see the large `if (someViews.includes(selectedZone))` chain there), add a branch in `ZoneInfoPattern`, and register the zone in `src/data/zones.js` (plus `zonesWithSides`/`zonesWithOnly2Projection`/`zonesWithOnlyDirectProjection` if relevant) and `ImagineOptions.js`'s conditional render list.

Path alias `@/*` maps to `src/*` (see [jsconfig.json](jsconfig.json)).

## Notes

- UI text, variable/data names, and comments are a mix of Ukrainian (UI-facing) and Russian (many code comments) — this is normal for this codebase, not a mistake to "fix".
- Styling: Bootstrap 5 (`bootstrap.css` imported globally) + `react-bootstrap` + Tailwind utility classes side by side, plus component-scoped CSS files (`Banner/banner.css`, `PatientInfo/patientInfo.css`).
