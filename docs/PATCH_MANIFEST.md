# LAST WITNESS 0.8.0 Candidate — Chapter III Phase III

## Production target

- Game: LAST WITNESS
- Branch to update: `restore-game-recovered`
- Required baseline: owner-tested build `0.7.11`
- Candidate build after upload: `0.8.0`
- New playable scope: Chapter III Phase III, Changi Airport

## Modified production files

- `index.html`
- `js/engine/12-investigation-lifecycle.js`
- `js/chapters/chapter-02/05-chapter2-integration.js`

## New production files

- `css/chapter-03-phase-03.css`
- `js/chapters/chapter-03/02-changi-airport.js`
- `assets/images/chapter-03/phase-03/singapore-arrival.jpg`
- `assets/images/chapter-03/phase-03/changi-arrival-operations.jpg`
- `assets/images/chapter-03/phase-03/immigration-officer/neutral.png`
- `assets/images/chapter-03/phase-03/immigration-officer/speaking.png`
- `assets/images/chapter-03/phase-03/immigration-officer/assessing.png`
- `assets/images/chapter-03/phase-03/immigration-officer/checking-document.png`
- `assets/audio/chapter-03/phase-03/singapore-arrival-transition.mp3`
- `assets/audio/chapter-03/phase-03/changi-airport-ambience.mp3`

## Files deliberately not modified

- Chapter III Phase I–II runtime: `js/chapters/chapter-03/01-title-phase1.js`
- Existing Chapter III CSS: `css/chapter-03.css`
- Core dialogue engine
- Global audio owners
- Character Journal registry
- Chapter I and Chapter II story files, except the Chapter II–III loader

Phase III is an additive module loaded after the stable Phase I–II runtime. This preserves the owner-tested aircraft scene and limits regression risk.
