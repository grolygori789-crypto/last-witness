# Test Report — 0.8.0 Candidate

## Static checks passed

- JavaScript syntax: `02-changi-airport.js`
- JavaScript syntax: modified `05-chapter2-integration.js`
- JavaScript syntax: modified `12-investigation-lifecycle.js`
- `index.html` parsed without structural failure
- all referenced Phase III production assets exist
- Changi and arrival backgrounds are 864 × 1536
- all four immigration-officer portraits are 768 × 1024 RGBA PNGs with real alpha transparency
- both MP3 files are readable by FFprobe

## Chromium simulated-runtime checks passed

### Full fresh flow

- Phase II completion hands off to Singapore arrival
- arrival transition opens
- Changi scene opens
- evidence hotspots remain locked during opening dialogue
- opening dialogue completes
- hotspots reveal
- all three evidence items can be inspected and added
- green state appears after collection
- reconciliation minigame unlocks
- correct classification advances
- unsupported conclusions do not advance
- supported conclusion advances
- closing dialogue completes
- Phase III completion card opens
- checkpoint becomes `ch3_phase3_complete`

### Save/Load state checks

- partial Phase III state restores to Changi
- opening dialogue does not restart after intro completion
- collected evidence restores green
- uncollected evidence restores yellow
- completed Phase III restores the completion card
- a save after the correct conclusion resumes the closing sequence

### Localization checks

- Thai Changi location text renders
- immigration-officer speaker name renders in Thai on scene entry
- approved Thai chicken-rice line is registered
- approved Prada line is registered
- Phase III dialogue uses localization keys, allowing the active line's body text to redraw when the global language renderer runs

### Direct aircraft handoff check

A simulated final click on the in-flight dialogue, followed by the Phase II completion state update, routed to `chapter3ArrivalTransition` with checkpoint `ch3_phase3_arrival`. No JavaScript page error was reported.

## Not tested here

- Android Chrome on the owner's device
- deployed GitHub Pages cache behaviour
- real speaker/headphone audio balance
- uninterrupted listening across the full 318-second Changi ambience file
- every legacy save created by every historical build

The candidate must remain labeled 0.8.0 Candidate until owner-device regression passes.
