# LAST WITNESS 0.8.1 Candidate

## Patch scope

This patch contains two presentation and usability improvements:

1. Browser Full Screen support
2. Larger, alpha-clean immigration officer dialogue portraits

No story, evidence, minigame, relationship, audio or Save/Load progression logic was redesigned.

## Verified GitHub baseline

Branch: `restore-game-recovered`

The local 0.8.0 source used for this patch was verified against the current GitHub blob SHAs before modification:

- `index.html` — `0a0931c3b953bf636ee3e7c55a38b1f71a83f648`
- `css/chapter-03-phase-03.css` — `d42971d0935e668862eb0146e7b88b2bc5e39580`
- `js/engine/12-investigation-lifecycle.js` — `055f0b971809beacf280e3e20a6a65956273dfca`
- `js/chapters/chapter-02/05-chapter2-integration.js` — `b138351ae99e50055457e090c5d612efd286b0ea`
- `js/chapters/chapter-03/02-changi-airport.js` — `4802f622fa465d732aa4e470296f508e357c7677`
- Immigration officer `neutral.png` — `1d4e21ca25f8d8293f676caab4c5f5f70ae8dadb`
- Immigration officer `speaking.png` — `9822271dc59c9084cfc39a315205e0d1b244786a`
- Immigration officer `assessing.png` — `71ff0b13f8777251acafe1bcb3e5909eafb60b3e`
- Immigration officer `checking-document.png` — `0cbd2b3c4c14475f23090ad80c39f303b79602b9`

## Production files

### Modified

- `index.html`
- `css/chapter-03-phase-03.css`
- `js/engine/12-investigation-lifecycle.js`
- `js/chapters/chapter-02/05-chapter2-integration.js`
- `js/chapters/chapter-03/02-changi-airport.js`
- Four immigration officer PNG portraits

### Added

- `css/fullscreen-display.css`
- `js/engine/13-fullscreen-display.js`

## Implementation ownership

`13-fullscreen-display.js` is the sole Full Screen owner. It does not wrap `show()`, does not create an audio owner, does not use polling or MutationObserver, and does not persist browser Full Screen state in saves.
