# LAST WITNESS 0.9.1 — Phase IV Production Repair Candidate

## Scope
This patch repairs the owner-reported Phase III → Phase IV presentation and sequencing defects on top of the current `0.9.0` production branch.

## Changed files
- `index.html`
- `css/chapter-03-phase-04.css`
- `js/chapters/chapter-03/02-changi-airport.js`
- `js/chapters/chapter-03/03-singapore-office.js`
- `assets/images/chapter-03/phase-04/cheryl/*.png` (12 portraits)
- `assets/images/chapter-03/phase-04/farid/*.png` (17 portraits)

## Repairs included
1. Changi review/minigame button remains hidden until the final evidence dialogue fully completes.
2. Phase III completion card is bypassed. The closing dialogue now hands directly to the approved driving transition.
3. Driving transition follows the takeoff presentation model:
   - clean full-screen video
   - skip control only during playback
   - separate full-screen Day / Time / Location card after the clip
   - office scene begins after the card
4. Cheryl and Farid portraits were rebuilt as close head-and-shoulder RGBA assets with consistent anchoring, larger facial scale and cleaned matte edges.
5. Phase IV story was tightened against Chapter I–III canon and deliberately stops short of proving the full reconciliation mechanism.
6. Build label and cache versions updated to `0.9.1` / `0910`.
