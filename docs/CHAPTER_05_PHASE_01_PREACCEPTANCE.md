# LAST WITNESS — Chapter V Phase I Pre-Acceptance Release Notes

**Release class:** scoped Chapter V content extension + save build-linkage repair  
**Authoritative base Runtime:** `0.22.7` (unchanged)  
**Chapter V Phase I module:** `0.22.7-c5p1`  
**Chapter V loader:** `0.22.7-c5b1`  
**Chapter V North QA extension:** `0.22.7-c5qa1`  
**Save Manager module:** `0.7.10-s1` / save-facing Runtime identity `0.22.7`

> PRE-ACCEPTANCE ONLY. This document does not claim owner acceptance and does not alter `GAME_MASTER_PLAN.md` acceptance/history.

## Story scope

Implements `CHAPTER V · PHASE I · RETURN TO BANGKOK` while preserving the current Master Plan spine:

- return-flight landing / Bangkok arrival
- return to the existing Chapter II Evidence Division location
- secure internal briefing with Benedict, Elena, Somchai and Kittisak
- North remains publicly removed and secretly alive
- Kittisak's protective order remains procedurally plausible while its timing remains review-worthy
- Somchai's protected hand-carry remains documented and suspicious without proving guilt
- Elena remains ordinary, sympathetic and low-signal
- one short investigation minigame, `CUSTODY WINDOW`
- private condominium transition and North reveal
- handoff to `PHASE II · NAME IN ROOM 1807`

## UI / UX scope

- ordinary scenes reuse the accepted Chapter IV Phase V / VII shell
- dialogue uses the accepted Phase V baseline rather than the elevated Phase VIII variation
- Progress remains visible below ordinary dialogue and reaches `100%` only at genuine Phase I completion
- location/time and completion cards reuse accepted LAST WITNESS card language
- only the internal `CUSTODY WINDOW` interaction is bespoke
- no global dialogue/HUD/Progress redesign

## Audio scope

- `opening-scene-c5p1.mp3`: landing through Police Station / secure briefing
- `walk-to-condo-scene.mp3`: walk-to-condo cinematic through Phase I completion
- original audio embedded in both supplied MP4 cinematics is preserved
- score uses scene-aware gain, smooth ducking under dialogue/minigame/choices, and controlled handoff between the two score beds
- custom loop windows avoid the long source tails
- background/minimize pauses Chapter V phase-owned media while preserving positions
- foreground resumes the appropriate current media automatically without an unrelated tap

## Build-linkage repair

Production `js/engine/02-audio-save.js` previously wrote save snapshot build `0.7.10` while Runtime was `0.22.7`. This package surgically changes save-facing build identity to `0.22.7`, removes the stale temporary Settings relabel, gives the Save Manager its independent `0.7.10-s1` module identity, and adds Chapter V save/restore routing.

## Locked / untouched

- no Chapter I–IV phase source files changed
- no Chapter IV Phase VIII source file changed
- no Hidden Case scoring/state logic changed
- no ending logic changed
- no base Runtime bump
- no Owner Walkthrough source change
- no base Developer Navigation source change
- no base North QA source change
- no GitHub write performed by the assistant
