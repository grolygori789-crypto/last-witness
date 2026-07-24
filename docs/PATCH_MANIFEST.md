# LAST WITNESS 0.8.2 Candidate

## Scope

- Fix Save/Load Manager visibility while native Full Screen is active.
- Add Exit Game to the Title Screen and Settings.
- Preserve all Chapter I-III story, evidence, audio and Save/Load data structures.

## Modified production files

- `index.html`
- `css/fullscreen-display.css`
- `js/engine/13-fullscreen-display.js`

## Root cause

Build 0.8.1 requested Full Screen on `#game`, while the dynamically created Save Manager was appended to `document.body`. Browsers render only the fullscreen element and its descendants, so the Save Manager opened outside the visible fullscreen tree and appeared only after Full Screen ended.

## Resolution

- Request Full Screen on the document root.
- Defensively move the Save Manager under `#game` before Save/Load actions.
- Keep the repair event-driven. No polling or MutationObserver was added.
