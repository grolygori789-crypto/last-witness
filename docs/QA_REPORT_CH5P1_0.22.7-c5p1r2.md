# QA REPORT — Chapter V Phase I `0.22.7-c5p1r2`

## Classification

Scoped corrective revision under authoritative Runtime `0.22.7`. This is **pre-acceptance** and does not claim physical Android PASS.

## Source / syntax checks

PASS:
- `js/chapters/chapter-05/01-return-to-bangkok.js` parses with `node --check`.
- `js/engine/33-chapter-05-loader.js` parses with `node --check`.
- `js/engine/34-chapter-05-owner-walkthrough.js` parses with `node --check`.
- No stale `c5p1r1`, `c5b1`, `c5b2`, or phantom Chapter V QA-extension version remains in affected runtime code.
- `index.html` visible Settings fallback remains `BUILD 0.22.7`.
- Production Save Manager remains byte-identical to current Production and uses `LW_SAVE_BUILD="0.22.7"`.

## Browser harness

Chromium headless harness, current Chapter V source, accepted Phase V dialogue geometry.

PASS at 432×768:
- Developer order: Chapter IV Phase I–VIII → Chapter V Phase I → Hidden Case Inspector.
- Chapter V Dev Jump closes Developer modal automatically.
- Dev Jump enters `ch5P1Landing` directly.
- Landing Skip enters `ch5P1ArrivalCard`.
- Arrival card contains zero `#ch5P1ArrivalContinue` controls.
- After 3.2 s, arrival card advances to `ch5P1Police`.
- Dialogue bottom: 690 px; Progress top: 733 px; clear gap: **43 px**.
- Somchai `...What?` uses `somchai-shocked.png`.
- Somchai grief / coffee / custody lines use `somchai-sad.png`.
- Owner Walkthrough opens on Chapter V Phase I, exposes 6 Chapter V steps, and Sync maps custody context to `CUSTODY WINDOW`.
- No page errors or console errors.

PASS at 393×873:
- Dialogue bottom: 795 px; Progress top: 838 px; clear gap: **43 px**.
- No page errors.

## CUSTODY WINDOW regression

PASS:
- Wrong record order returns `NOT SUPPORTED BY THE RECORD`.
- Correct order advances to Step 2: `PROTECTION ORDER → RECORDS SEALED → HAND-CARRY TRANSFER`.
- Unsupported culprit-style conclusion is rejected.
- Correct finding `The chain is valid. The timing still deserves review.` completes the minigame.
- Completion flags remain: custody window verified, Kittisak order valid, Somchai transfer documented.

## Arrival-card lifecycle regression

PASS in simulated Page Lifecycle harness:
- Arrival card remained active after 2.7 s while a simulated `pagehide` state was active.
- On simulated `pageshow`, remaining hold time resumed and then advanced to Police Station.
- No page errors.

## North QA harness note

The browser harness validated the Chapter V North QA direct-entry path under a QA-only mocked tester-authorized session because `page.set_content()` uses an opaque origin where native `sessionStorage` is unavailable. Under that authorized-session harness:
- Chapter V Phase I is ordered after Chapter IV Phase VIII.
- Clicking it closes the North QA modal and enters `ch5P1Landing` directly.

The production North QA authentication system itself was **not modified** by this revision. Physical-device North QA remains part of owner acceptance.

## Build-linkage gate

Verified source identities:
- Runtime: `0.22.7`
- Runtime Build Label: `0.22.7`
- Settings fallback: `0.22.7`
- Save-facing build: `0.22.7`
- North QA base: `0.22.7`
- Developer Navigation base: `0.22.7-d1`, whose base build matches Runtime
- Owner Walkthrough base: `0.22.3-w1` unchanged independent module
- Chapter V Phase I: `0.22.7-c5p1r2`
- Chapter V Loader: `0.22.7-c5b3`
- Chapter V Owner Walkthrough extension: `0.22.7-c5w1`

No fake base Runtime bump is introduced.

## Acceptance still required

Owner physical Android test must verify at minimum:
- Dev Jump ordering and automatic close/entry.
- North QA ordering and automatic close/entry.
- Landing cinematic → 3-second auto card → Evidence Division.
- Somchai shock/sad portrait crop on the real device.
- Dialogue / Progress separation in both EN and TH.
- Music/video pause in background and automatic resume from prior position.
- Owner Walkthrough Chapter V sync and read-only behavior.
- Save/Load resume and Return to Title audio boundary.
