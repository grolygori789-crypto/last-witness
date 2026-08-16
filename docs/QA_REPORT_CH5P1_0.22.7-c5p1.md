# QA REPORT — LAST WITNESS Chapter V Phase I

**Candidate:** `0.22.7-c5p1`  
**Base Runtime:** `0.22.7`  
**Status:** LOCAL PRE-ACCEPTANCE CANDIDATE

## Tests actually performed

### Source / syntax

- `node --check` PASS: `js/chapters/chapter-05/01-return-to-bangkok.js`
- `node --check` PASS: `js/engine/33-chapter-05-loader.js`
- `node --check` PASS: modified `js/engine/02-audio-save.js`
- current Production `02-audio-save.js` was reconstructed by reversing only the intended local edits; Git blob SHA matched current Production exactly: `2668239dcd375b210a90856d132d19c4f2464410`
- current Production `index.html` baseline Git blob SHA verified: `de3a894ae64d964e0afe695c393d9ba0449b8736`
- candidate `index.html` diff against that baseline is limited to: fresh cache for `02-audio-save.js`, plus one new `33-chapter-05-loader.js` script entry

### Browser harness

Headless Chromium / Playwright harness, not a physical Android test:

- EN 432×768 ordinary Briefing: PASS
  - dialogue / Progress do not overlap
  - measured vertical gap between dialogue lower edge and Progress: 38px
- TH 393×873 ordinary Briefing: PASS
  - dialogue / Progress do not overlap
  - measured vertical gap: 38px
- CUSTODY WINDOW 432×768: PASS, footer remains inside viewport
- CUSTODY WINDOW 393×873: PASS, footer remains inside viewport
- CUSTODY WINDOW wrong order: PASS, rejects with `NOT SUPPORTED BY THE RECORD`
- correct order → Step 2: PASS
- unsupported conclusion: PASS, rejected without Game Over
- supported timing conclusion → finding → influence modal: PASS
- Chapter V Dev button injection: PASS in harness
- Chapter V North QA button injection: PASS in harness
- North QA Copy Test Info payload contains no Hidden Case scores/routes/ending labels: PASS
- browser page-error pass after audio fade repair: PASS

### Media inspection

- Bangkok landing MP4: H.264 720×1280, 24 fps, AAC stereo 48 kHz, ~10.005 s
- Walk-to-condo MP4: H.264 720×1280, 24 fps, AAC stereo 48 kHz, ~10.005 s
- Opening score: stereo MP3 44.1 kHz, ~66.011 s
- Walk-to-condo score: stereo MP3 48 kHz, ~188.664 s
- all three Chapter V still images: 864×1536 portrait

## Build linkage audit

| Endpoint | Production | Candidate | Source | Result |
|---|---|---|---|---|
| Base Runtime | 0.22.7 | 0.22.7 | existing Runtime/bootstrap | PASS / unchanged |
| Settings fallback | 0.22.7 | 0.22.7 | `index.html` | PASS |
| Runtime Build Label | 0.22.7 | 0.22.7 | existing module 25 | PASS / unchanged |
| Owner Dev base build | 0.22.7 | 0.22.7 | existing module 18 | PASS / unchanged |
| North QA base build | 0.22.7 | 0.22.7 | existing module 24 | PASS / unchanged |
| Save snapshot build | **0.7.10** | **0.22.7** | `js/engine/02-audio-save.js` | PASS / repaired |
| Save Manager visible version source | 0.7.10 then patched later | 0.22.7 | `js/engine/02-audio-save.js` | PASS / repaired |
| Save module identity | implicit 0.7.10 | 0.7.10-s1 | `js/engine/02-audio-save.js` | PASS |
| Save JS cache | 0710 | 0227s1 | `index.html` | PASS |
| Ch V loader | none | 0.22.7-c5b1 | module 33 | PASS |
| Ch V Phase I | none | 0.22.7-c5p1 | Ch V module | PASS |
| Ch V North QA extension | none | 0.22.7-c5qa1 | Ch V module | PASS |

## Canon / spoiler checks

- Chapter IV remains exactly eight phase buttons; source module 18 is untouched
- Chapter V Phase I is a separate Chapter V entry, not a ninth Chapter IV phase
- no Hidden Case API mutation in the Chapter V module
- Elena is not an influence-choice target and receives no sinister reveal language
- Kittisak / Somchai suspicion is evidence-boundary based rather than a guilt declaration
- North's public removed state and secret survival are preserved

## Not tested / owner QA still required

The following are **not claimed as tested**:

- physical Android Chrome behavior
- real deployed GitHub Pages cache behavior
- full sequential Chapter IV → Chapter V playthrough on device
- real background/minimize/foreground lifecycle on Android
- manual Save/Load across every Chapter V checkpoint on deployed runtime
- device audio balance through speakers/headphones

Owner Android Chrome remains final acceptance authority. `GAME_MASTER_PLAN.md` acceptance/history must not be updated until owner deployment and acceptance.
