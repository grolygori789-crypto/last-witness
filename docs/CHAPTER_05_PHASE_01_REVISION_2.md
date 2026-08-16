# LAST WITNESS — Chapter V Phase I Revision 2

**Release class:** scoped Chapter V Phase I corrective extension  
**Authoritative base Runtime:** `0.22.7` (unchanged)  
**Chapter V Phase I:** `0.22.7-c5p1r2`  
**Chapter V loader:** `0.22.7-c5b3`  
**Owner Walkthrough extension:** `0.22.7-c5w1`  
**Existing Owner Walkthrough base:** `0.22.3-w1` (unchanged)  
**Existing North QA base:** `0.22.7` (unchanged)  
**Existing Developer Phase Navigation base:** `0.22.7-d1` (unchanged)

> PRE-ACCEPTANCE. Physical Android owner acceptance is still required before this revision is canonical.

## Corrective scope

1. Bangkok arrival card after the landing cinematic is now presentation-only. It has no Continue button and advances automatically after approximately 3 seconds.
2. The arrival-card timer participates in the Phase I foreground/background lifecycle. Backgrounding pauses its remaining hold time; foreground resumes the remaining hold instead of silently advancing while hidden.
3. Somchai now uses the owner-supplied shocked portrait for the immediate North reaction and the owner-supplied sad portrait for grief / subsequent serious custody lines in the same briefing.
4. Somchai portrait framing is scoped to Chapter V Phase I dialogue only and preserves the accepted Phase V dialogue geometry.
5. Owner Developer Mode places `Chapter V · Phase I · Return to Bangkok` immediately after Chapter IV Phase VIII and before later Owner tooling such as Hidden Case Inspector.
6. Chapter V Dev Jump closes Dev/QA/drawer overlays before entering the landing cinematic. No manual Close step is required.
7. North QA places Chapter V Phase I immediately after Chapter IV Phase VIII. The Chapter V entry closes QA overlays before entering the landing cinematic.
8. Chapter V QA text reports authoritative Runtime build `0.22.7`, base North QA module `0.22.7`, and the exact Chapter V Phase I extension version `0.22.7-c5p1r2`.
9. Owner Walkthrough now includes six read-only Chapter V Phase I steps, including the correct CUSTODY WINDOW solution and Phase II handoff. The base Walkthrough module is not rewritten.

## Regression boundary

This revision does **not** modify Chapter I–IV phase source, Hidden Case, Chapter IV Phase VIII, the accepted Chapter IV audio lifecycle module, the base Developer Phase Navigation module, the base North QA module, or the base Owner Walkthrough module.

The existing Save Manager build repair remains unchanged: save-facing Runtime identity is `0.22.7`.
