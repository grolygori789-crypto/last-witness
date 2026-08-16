# LAST WITNESS — QA REPORT

## Production Candidate
- Base Runtime: `0.22.8`
- Chapter V Phase I: `0.22.8-c5p1r9`
- Chapter V loader: `0.22.8-c5b6`
- Chapter V Owner Walkthrough extension: `0.22.8-c5w3`
- Save module: `0.7.10-s2`
- Commit name: `fix(ch5-p1): replace landing clip and repair North condo portraits`

## Owner defects addressed
1. Replaced the Chapter V opening landing clip with the user-supplied corrected asset `VID_20260817_004628.mp4` at `assets/video/chapter-05/phase-01/bangkok-landing.mp4`.
2. Police / Briefing / Condo secondary notes remain plain text with no forced box, and their vertical gap under the objective is tightened from `7 px` to `3 px`.
3. `NORTH · OFF RECORD` stays plain text and is repositioned to the upper-right zone to avoid covering North's face.
4. `TAP TO CONTINUE` is rendered with non-breaking spacing so it stays a single line in the portrait corner.
5. Added dedicated North `concerned` and `relieved` dialogue portrait assets cropped from the approved North expression sheet so the full head and part of the torso remain visible in the two problematic condo dialogue shots.
6. Somchai portrait brightness is reduced again for closer parity with the other dialogue portraits.

## Validation summary
- JS syntax check: **PASS** (`33-chapter-05-loader.js`, `01-return-to-bangkok.js`)
- New landing clip present: **PASS**
- New North portrait assets present: **PASS**
- Upload path manifest updated to include new asset files: **PASS**

## Test honesty
This package was updated and validated in the local build workspace. It is **not** a physical Android acceptance PASS. P'Benz's device test remains the final truth.


## R9 delta
- Replaced `assets/video/chapter-05/phase-01/bangkok-landing.mp4` with the corrected reverse-fixed landing clip supplied by owner.
- Refreshed Chapter 5 Phase 1 North dialogue portraits for `"How bad was he?"` and `"Good. Then we keep it that way."` using full-head/full-upper-body assets derived from the North expression sheet.
