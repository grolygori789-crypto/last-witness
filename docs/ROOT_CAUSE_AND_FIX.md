# Verified Root Causes and Fixes

## 1. Flight dialogue completed but Changi did not start

### Root cause
`index.html` loaded the Changi and Singapore-office modules statically before the dynamically loaded Chapter III Phase I–II runtime existed. The Changi module therefore initialized before `window.LastWitnessChapter3` and before `#chapter3FlightDialogue` had been created. Later, Chapter II integration attempted to load Changi again, but the module's version guard prevented a second initialization.

The result was that the Changi resume wrapper and final-flight-dialogue handoff listener were never installed against the real Chapter III runtime.

### Fix
- Removed static Phase III/IV script tags from `index.html`.
- Chapter II integration now owns one deterministic load chain:
  1. `01-title-phase1.js`
  2. `02-changi-airport.js`
  3. `03-singapore-office.js`
- Changi now initializes only after the flight screen and `LastWitnessChapter3` API exist.
- The final flight click is evaluated after the dialogue callback has committed `phase2Complete`.
- No polling loop or new MutationObserver was added.

## 2. Compare button visible from the beginning

### Root cause
The visibility calculation depended primarily on collected evidence and overlay state. It did not require the office introduction, Cheryl choice, and access-grant stage to be complete. Stale evidence state could therefore make the disabled control visible behind dialogue or the response panel.

### Fix
The Compare button is now physically hidden and becomes available only when all of these are true:
- Cheryl/Farid introduction has completed
- Benedict has made the liaison response choice
- Phase IV is in the `investigation` stage
- all three office evidence items have been collected
- the final evidence dialogue is no longer active
- no evidence, choice, or matrix overlay is open
- the matrix has not already been completed

`openMatrix()` repeats the same guard, so visual state cannot bypass gameplay state.

## 3. Cheryl and Farid portraits stretched or over-zoomed

### Root cause
The previous images used inconsistent tight crops and CSS enlargement. Some source subjects filled the full transparent canvas differently, producing long stretched-looking Cheryl images and Farid frames containing almost only his face.

### Fix
- Rebuilt all portraits from the approved source sheets.
- Preserved the original aspect ratio for every expression.
- Removed only connected pale background areas, preserving eyes and teeth.
- Cleaned pale matte contamination at the silhouette edge.
- Normalized all images to transparent `744 × 1000` canvases.
- Cheryl: consistent head, shoulders, and upper torso.
- Farid: consistent head, shoulders, and upper torso without face-only zoom.
- Removed Phase IV CSS enlargement and transforms.

## 4. Character Journal role error and canon drift risk

### Root cause
The authoritative registry listed Kittisak as a generic Police Officer even though the Police Station dialogue establishes him as Captain Kittisak Siriwat / ร้อยตำรวจเอกกิตติศักดิ์ ศิริวัฒน์.

### Fix
Added a one-time canon-verification module loaded immediately after the existing Character Registry. It updates identity fields only and does not alter portraits, unlock state, relationship values, or gameplay metrics.
