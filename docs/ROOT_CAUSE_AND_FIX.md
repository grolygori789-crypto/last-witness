# Root Cause and Fix

## 1. Changi review button visible behind dialogue
### Root cause
Collecting the final evidence item updated the evidence state and closed the panel before the evidence dialogue runtime had asserted its active flag. Closing the panel called the review-state calculation while all evidence was collected and `dialogueActive` was still false, so the review button became visible behind the dialogue.

### Fix
- Lock dialogue state before closing the evidence panel.
- Recalculate review visibility when dialogue begins and when it completes.
- Unlock the review button only after the completion callback of the final evidence dialogue.

## 2. Unwanted Phase III completion card
### Root cause
The Phase III closing callback explicitly routed to the completion-card endpoint.

### Fix
- Replace that endpoint with a direct Phase IV handoff.
- Completed Phase III saves restored on the Changi screen also route directly to the transition.
- The old card remains unreachable for save compatibility and is always hidden.

## 3. Text panel covering the driving clip
### Root cause
The Day / Time / Location card was rendered inside the same transition layer as the video and remained visible during playback.

### Fix
The transition now mirrors the airplane takeoff structure:
1. video layer fills the screen
2. only Skip Transition is visible
3. video ends or is skipped
4. video layer closes
5. a clean full-screen arrival card appears
6. the office scene opens

## 4. Cheryl and Farid portrait quality
### Root cause
The first extraction used broad full-body crops and a near-white threshold that retained a pale matte around the subjects. The characters were also bottom-aligned too low for the shared 110-pixel dialogue portrait frame.

### Fix
- Re-extracted all expressions from source sheets.
- Recovered transparent alpha and decontaminated pale edge pixels.
- Reframed to head-and-shoulders.
- Normalized to `744 × 1000` RGBA canvases.
- Matched facial size and anchor to Benedict/North dialogue presentation.
- Added Phase IV-scoped portrait fitting rules without changing global portraits.
