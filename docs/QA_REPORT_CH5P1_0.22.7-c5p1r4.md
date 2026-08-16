# QA REPORT — LAST WITNESS
## Chapter V Phase I — Return to Bangkok
Build: `0.22.7-c5p1r4`
Date: 2026-08-16

## Scope
Revision 4 applies the exact Somchai portrait assets supplied in the latest owner message and preserves the prior targeted fixes from Revision 3.

## Implemented in this revision
1. Replaced `somchai-sad.png` with the exact supplied sad / grieving Somchai portrait.
2. Replaced `somchai-shocked.png` with the exact supplied shocked Somchai portrait.
3. Tuned Somchai portrait crop rules so Chapter V Phase I dialogue presentation matches the previously accepted portrait sizing pattern more closely.
4. Retained previously requested fixes already present in Revision 3:
   - stronger dialogue panel opacity
   - raised condominium walk clip timestamp placement
   - improved North condominium framing
   - improved North portrait crop
   - updated walkthrough sync/build label

## Files changed
- `assets/images/chapter-05/phase-01/somchai-sad.png`
- `assets/images/chapter-05/phase-01/somchai-shocked.png`
- `css/chapter-05-phase-01.css`
- `js/chapters/chapter-05/01-return-to-bangkok.js`
- `js/engine/33-chapter-05-loader.js`
- `js/engine/34-chapter-05-owner-walkthrough.js`
- `docs/CHAPTER_05_PHASE_01_REVISION_4.md`
- `docs/QA_REPORT_CH5P1_0.22.7-c5p1r4.md`
- `docs/UPLOAD_PATHS_CH5P1_0.22.7-c5p1r4.txt`
- `docs/MANIFEST_SHA256_CH5P1_0.22.7-c5p1r4.txt`

## Automated validation
### `run_r2_qa.py`
- PASS
- No page errors
- No console errors
- Walkthrough still opens and syncs to Custody Window
- Walkthrough build label: `0.22.3-w1 · C5W 0.22.7-c5w2 · P1 0.22.7-c5p1r4`

### `run_arrival_lifecycle_qa.py`
- PASS
- No errors
- Arrival card lifecycle / resume behavior preserved

### `run_custody_qa.py`
- PASS
- No errors
- Custody Window puzzle flow preserved

## Notes
Visual test harnesses in this environment are limited, but the actual Somchai dialogue asset files were replaced directly and the package was revalidated after the change.

## Conclusion
Build `0.22.7-c5p1r4` is ready as the refreshed upload-only package for Chapter V Phase I.
