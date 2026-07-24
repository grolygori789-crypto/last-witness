# Test Report — Build 0.9.2 Candidate

## Source verification completed
- Fetched the latest `GAME_MASTER_PLAN.md` from `restore-game-recovered`.
- Fetched the latest `index.html` and related Chapter III/Character Registry runtime files.
- Confirmed the effective production baseline was Build 0.9.1 before modification.

## Automated/static checks passed
- JavaScript syntax:
  - `05-chapter2-integration.js`
  - `02-changi-airport.js`
  - `03-singapore-office.js`
  - `14-character-canon.js`
- Static Chapter III load-order validation:
  - no early static Changi load
  - no early static Phase IV load
  - dynamic order is Phase I–II → Changi → Singapore Office
- Phase IV Compare gate unit test:
  - hidden during intro
  - hidden during choice dialogue
  - hidden before all evidence
  - visible only in the correct investigation-ready state
  - hidden while an overlay is open
  - hidden after completion
- Character canon module mock test passed.
- Portrait validation:
  - Cheryl: 12 RGBA PNG files
  - Farid: 17 RGBA PNG files
  - every file: `744 × 1000`
  - transparent corners verified
  - aspect ratio preserved
- Visual portrait preview inspected on a dark dialogue-style background.

## Not claimed
- The full game was not run in a local Chromium browser because the available environment blocks localhost pages by organization policy.
- No Android, live GitHub Pages, real audio, or real Save/Load pass is claimed.
- Final approval still depends on the owner's device test.
