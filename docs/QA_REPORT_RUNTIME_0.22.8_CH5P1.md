# LAST WITNESS — QA REPORT

## Production Candidate
- Base Runtime: `0.22.8`
- Chapter V Phase I: `0.22.8-c5p1r7`
- Chapter V loader: `0.22.8-c5b5`
- Chapter V Owner Walkthrough extension: `0.22.8-c5w3`
- Save module: `0.7.10-s2`
- Developer navigation: `0.22.8-d1`
- North QA: `0.22.8`
- Commit name: `Fix CH5P1 layout and bump runtime 0.22.8`

## Owner defects addressed
1. Secondary scene notes returned to plain text with no added box/background/border. Police, Briefing and Condo notes are positioned dynamically **7 px below the objective**.
2. `NORTH · OFF RECORD` uses the real reveal DOM id and is placed upper-right, plain text, away from North's face.
3. `TAP TO CONTINUE` uses one fixed bottom-right portrait anchor across Chapter V Phase I and is forced to one line.
4. North dialogue portraits use `object-fit: contain`, bottom-centered, with no zoom transform.
5. Somchai portrait crop/scale is retained; brightness is reduced to `0.88` (12% darker).
   The local sad/shocked source assets match the current production Git blob SHAs exactly, so only presentation brightness changed.
6. The condominium card after Benedict's walk has no Continue element and auto-enters the condo after 3000 ms.
7. The owner-selected brighter condominium / North reveal image bytes were verified unchanged.
8. Base Runtime was advanced atomically from `0.22.7` to `0.22.8` across Settings, Runtime, Save metadata, Runtime Label, Developer navigation, North QA and cache generations.

## Browser geometry QA — 432 × 873
- Police secondary-note gap: **7 px**
- Briefing secondary-note gap: **7 px**
- Police note background: `none` / `rgba(0, 0, 0, 0)` / border `0px`
- `TAP TO CONTINUE` one-line: **PASS**
- Same Tap anchor across sampled Kittisak / Benedict / Somchai / Benedict / Elena: **TRUE**
- Tap horizontally inside portrait area: **TRUE**
- North portrait: fit `contain`, position `50% 100%`, transform `none`
- Somchai filter: `brightness(0.88)`
- Reveal note: right distance `16.0 px`, background `none`, border `0px`
- Condo card Continue element count: **0**
- Screen after 3.15 s: `ch5P1Condo`

## Walkthrough QA
- Extension: `0.22.8-c5w3`
- Chapter V catalog present: **TRUE**
- Build label: `0.22.3-w1 · C5W 0.22.8-c5w3 · P1 0.22.8-c5p1r7`
- Condo guidance explicitly states no Continue button and ~3 second automatic transition.

## Runtime / Build QA
- window runtime: `0.22.8`
- document dataset: `0.22.8`
- Settings: `LAST WITNESS · BUILD 0.22.8`
- Developer: `BUILD 0.22.8`
- North QA: `BUILD 0.22.8`
- SaveManager version: `0.22.8`
- Save snapshot build: `0.22.8`

## Regression / source-integrity proof
For `index.html`, Save Manager, bootstrap, Dev Navigation, North QA and Runtime Build Label, the new files were normalized back to the previous runtime/version/cache strings and their Git blob SHAs were compared with the current `production-rebuild` source. **All six match exactly.** This demonstrates those core files contain only the intended build-linkage changes.

## Intentional independent versions retained
- P8 Matrix Exit: `0.22.7-m1` / cache `0227m1`
- P7/P8 Audio Lifecycle direct index cache: `0227a1`
- Owner Walkthrough base: `0.22.3-w1`
These are independent subsystem identities and were not fake-bumped because their source did not change.

## Test honesty
Browser geometry / interaction harness, syntax checks and release-gate validation passed. This is **not an Android physical-device PASS**. P'Benz's deployed Android test remains final acceptance truth.
