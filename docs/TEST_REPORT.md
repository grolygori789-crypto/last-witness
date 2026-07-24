# Test Report — Build 0.8.1 Candidate

## Passed

- JavaScript syntax for all modified and added JavaScript files
- Index load order and cache-version checks
- Build label and Save snapshot build bridge updated to 0.8.1
- Full Screen controls injected once into Settings and Game Menu
- Tap to Begin requests Full Screen within the original user gesture
- Full Screen enter, exit and browser-owned state-change simulation
- Unsupported-browser behavior
- Permission-denied behavior with non-blocking feedback
- Thai and English Full Screen labels
- Game Menu closes after its Full Screen command
- Changi fresh flow regression
- Changi partial-save restore
- Changi completed-save restore
- Changi Thai dialogue and approved jokes
- Immigration officer portrait alpha transparency
- Transparent pixels contain zero RGB data
- White-matte edge contamination substantially reduced
- Portrait width increased while preserving 768 × 1024 production dimensions

## Portrait scale changes

- Neutral: approximately 24.1% wider visible subject
- Speaking: approximately 24.1% wider visible subject
- Assessing: approximately 20.0% wider visible subject
- Checking document: approximately 18.0% wider visible subject

The document pose remains slightly less enlarged so the passport remains readable in the dialogue frame.

## Not tested

- Real Android Chrome Fullscreen API behavior
- GitHub Pages cache behavior after upload
- Device-specific navigation-bar and gesture-bar behavior
- Visual confirmation on the owner's exact screen
- Real-device portrait framing after browser font and viewport differences

The patch remains a Candidate until owner testing passes.
