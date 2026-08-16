# LAST WITNESS — Chapter V Phase I Revision 5

Build tag: 0.22.7-c5p1r5
Package type: upload-only patch

## Addressed owner defects
1. Dialogue prompt positioning fixed:
   - `Tap to continue` restored to a locked absolute bottom-right position inside the dialogue copy area.
   - Dialogue bottom offset lowered to sit closer to the progress bar.

2. Dialogue box spacing adjusted:
   - Main Chapter 5 Phase 1 dialogue containers lowered versus r4.
   - Condo / North reveal dialogue variants also lowered.

3. Portrait framing corrected:
   - Portrait wrapper now forces full-frame fill.
   - Benedict, North, and Somchai portrait scale/object-position retuned to reduce bottom float and improve fill.
   - North portrait crop shifted to reveal the left side of the face more cleanly.

4. North condo / reveal text overlap reduced:
   - Scene note positioning moved lower for Condo / Reveal.
   - North reveal background framing shifted to reduce `NORTH · OFF RECORD` overlap on North's face.

5. Version linkage updated:
   - Loader and owner walkthrough references updated to `c5p1r5`.

## Files changed
- `css/chapter-05-phase-01.css`
- `js/chapters/chapter-05/01-return-to-bangkok.js`
- `js/engine/33-chapter-05-loader.js`
- `js/engine/34-chapter-05-owner-walkthrough.js`
- documentation / manifest files in `docs/`
