# LAST WITNESS - GAME MASTER PLAN

> **CANONICAL MASTER REFERENCE / ZERO-QUESTION ROOM HANDOFF**
>
> **Revision:** 2026-08-16 13:46 ICT  
> **Game:** LAST WITNESS  
> **Studio:** BENEDICT INTERACTIVE  
> **Repository:** `grolygori789-crypto/last-witness`  
> **Production/default branch:** `production-rebuild`  
> **Latest inspected Production runtime-code/maintenance HEAD before this documentation-only handoff update:** `4034fc263a75118f143e8ce6d1d908ff5598c33d`  
> **HEAD message:** `Fix P7 P8 background audio lifecycle`  
> **Owner physical Android acceptance:** `PASS · 2026-08-16` — P7/P8 background pause and foreground automatic resume accepted; no extra tap required; P8 Matrix Exit no longer reawakens background audio  
> **Authoritative Runtime build:** `0.22.7`  
> **Current accepted playable boundary:** `CHAPTER IV COMPLETE · OWNER CURRENT-PASS ACCEPTED`  
> **Chapter IV:** exactly 8 phases; no Phase IX without explicit owner approval  
> **Chapters I–IV status:** owner-reviewed by Dev Mode Jump / real-device spot checks and accepted for current continuation; later reproducible defects may still be repaired  
> **Next story objective:** `CHAPTER V · PHASE I · RETURN TO BANGKOK`  
> **Hidden Case Architecture:** base engine module `0.21.0`, active from Phase VIII  
> **Owner Hidden Case Inspector:** visual, temporary simulation sandbox; synthetic adjustments never write canonical case state
> **Owner Walkthrough Mode:** module `0.22.3-w1`; read-only guided walkthrough/verified solutions from Chapter I through Chapter IV Phase VIII; Owner-only  
> **Dialogue presentation restore:** Runtime `0.22.6`; restored pre-adjustment Runtime `0.22.3` dialogue/progress presentation remains the active frozen baseline  
> **Phase VIII Matrix Exit:** module `0.22.7-m1`; Disclosure Matrix now supports explicit Close → Secure Debrief → Resume without canonical state mutation  
> **Chapter IV P7/P8 Audio Lifecycle:** maintenance module `0.22.7-a1`; background pauses scoped P7/P8 media and foreground restores the same playback position without user interaction  
> **Adaptive model:** `P8 CALCULATE → Ch V INFLUENCE → Ch VI DIVERGE → Ch VII RESOLVE`

This file supersedes all older Master Plan revisions. It preserves the locked long-game mystery architecture while updating actual Production status after the owner's current-pass review of Chapters I–IV.

A documentation-only change to this file does **not** require a Runtime build increment. Runtime `0.22.7` remains the authoritative base build. The scoped audio-lifecycle maintenance module `0.22.7-a1` is loaded directly with its own cache key and does not change Runtime, Dev, North QA, Save-facing build identity, dialogue/progress presentation, Phase VIII core logic, or Hidden Case state.

This revision is the **final zero-question room-handoff contract** for beginning Chapters V–VII. After the owner uploads this documentation-only file, GitHub HEAD will naturally advance to the documentation commit; that does **not** change the runtime-code baseline above unless code changes are also made. A new room must inspect current Production before any repair or implementation, but must not reopen locked decisions merely because the documentation commit SHA differs from the runtime-code baseline recorded here.

---

# 0. SOURCE OF TRUTH / OWNER OVERRIDE

When sources conflict, use this order:

1. owner's latest real-device observation
2. current Production Runtime
3. this Master Plan
4. owner-approved binary assets
5. repository history / QA evidence
6. older documents
7. assistant memory

A real-device result overrides local confidence, mock tests, syntax checks and assumptions.

## Current acceptance interpretation

The owner has now reviewed Chapters I–IV at a practical continuation level using Owner Developer Mode jumps and real-device spot checks and considers the current state acceptable to move forward.

This means:

- Chapters I–IV are **accepted for current continuation**
- Chapter IV Phase VIII is **owner-accepted for the current production pass**
- Chapter V may begin
- accepted systems should not be reopened for optional polishing without a real reason
- later reproducible defects are still valid defects and may be repaired surgically
- this acceptance is **not** a claim that every path, viewport, Save/Load permutation or full sequential playthrough has been exhaustively tested
- later fixes do not invalidate the current acceptance unless they reveal a genuine regression or canonical conflict

Use the rule:

> **Accepted for continuation does not mean immune from future defect repair.**

## GitHub write rule

Do not write GitHub without explicit authorization in the current turn. Normal workflow is:

`inspect Production → local repair → test → package → owner uploads`

If the owner explicitly authorizes the current GitHub write, modify only the identified scope on `production-rebuild`.

Commit messages must be **50 characters or fewer**.

## Do not ask the owner to repeat locked decisions

A new room must not ask again for project identity, chapter plans, hidden-case rules, Elena canon, UI reuse rules, Build linkage, Dev/North QA separation, Phase VIII structure, Chapters I–IV acceptance status or GitHub policy when those answers exist here or in current Production.

Ask only when a genuinely new owner decision is required.

## QA honesty

Never call a patch Android-tested unless a physical Android device was used. Never call Node syntax, static checks, jsdom, mocked media or simulated playback “real-device E2E.” State exactly what ran.

Owner Android Chrome is final acceptance truth.

When the owner asks for a fix and file: diagnose, fix, test, package, then explain. Do not make the owner wait through a long diagnostic monologue without a deliverable.

---

# 1. PROJECT / VISUAL IDENTITY

- Mobile-first portrait 9:16
- Android Chrome primary practical target
- modern iOS Safari additional target
- neo-noir graphic novel
- cel-shaded rendering
- heavy ink contour
- angular shadows
- cinematic crime-adventure framing
- restrained dark surfaces
- warm gold / muted blue UI accents
- premium mobile readability

The entire game must look and behave like one product.

---

# 2. REUSE-FIRST UI / UX CONTRACT — NON-NEGOTIABLE

Before creating a normal scene, phase card, chapter card, location/time card, flight card, dialogue box, HUD, progress bar, evidence card, completion card or transition, inspect the closest **owner-approved proven implementation** and reuse its DOM, CSS primitives, geometry, spacing, timing, animation and interaction behavior.

**Change the content inside a proven structure before inventing a new structure.**

Examples:

- normal Chapter IV/V scene → begin from proven Phase V / Phase VII shell
- flight → begin from proven Singapore → Jakarta flight structure
- location/time card → begin from accepted location card
- completion card → begin from accepted completion card

## Phase/chapter card symbol prohibition

Do not invent square symbols, abstract icon blocks, novelty sigils or decorative symbol panels unless owner explicitly requests them.

Use the closest accepted card as template. Preserve typography, spacing, rule lines, timing and transition behavior. Replace only chapter/phase/title/location/date/time/copy required by the new content.

Do not add a phase-title card when accepted continuity is direct cinematic → location card.

A card is a continuity device, not an art-style experiment.

## Minigame exception

Minigames may be bespoke, premium and highly professional. They must still clearly belong to LAST WITNESS through compatible palette, typography, modal language, safe-area behavior, mobile interaction and narrative tone.

A minigame may be special; it may not look like a different game.

## Proven Chapter IV scene primitives

Prefer the proven Phase V / VII foundation:

- `screen`
- `ch4-p5-scene`
- `ch4-p5-shade`
- `ch4-p5-topbar`
- `ch4-p5-label`
- `ch4-p5-objective`
- `ch4-p5-dialogue`
- `ch4-p5-action`
- `ch4-p5-progress`
- `ch4-p5-progress-fill`

Phase-specific classes extend these, not replace their geometry.

Do not casually override global `.screen` geometry, especially with `position:relative` on a phase screen. That exact mistake previously produced active DOM with a visually collapsed black screen.

Progress reaches `100%` only at genuine completion.

## Chapters V–VII Interface / UI shell preservation lock — OWNER NON-NEGOTIABLE

For Chapters V, VI and VII, the established LAST WITNESS interface is an **implementation contract**, not merely visual inspiration. The existing owner-approved runtime must be studied first and reused as the source structure.

The rule is:

> **Study the proven shell, preserve the shell, replace only the story/content payload inside it.**

For every new ordinary scene, card, dialogue surface, HUD, Progress presentation, location/time card, evidence panel, choice panel, flight/route presentation, completion card and transition:

1. inspect the closest owner-approved Production implementation in the existing Chapters I–IV runtime
2. reuse its DOM hierarchy, CSS primitives, geometry, spacing, safe-area treatment, typography hierarchy, border/radius language, button language, animation rhythm, z-index relationships and interaction behavior
3. change only what the new content actually requires: IDs, text, character/portrait, image/video/audio asset, evidence payload, choice payload, state key, chapter/phase metadata and phase-specific logic
4. extend proven classes only when a real new requirement cannot be expressed by the existing shell
5. any visible structural redesign requires explicit owner approval before implementation

Without explicit owner approval, **do not** independently:

- move or resize established dialogue shells
- change dialogue height/bottom position, portrait well, grid proportions, frame, border or radius
- move or redesign Progress UI
- change topbar/HUD geometry, icon style or safe-area behavior
- invent new card geometry, title-card decoration, symbols, badges or ornamental blocks
- change established fonts, type scale, tracking philosophy or button shape
- introduce a new normal-scene layout because it appears cleaner or more modern
- normalize Phase-specific geometry merely for visual symmetry
- replace proven transitions with a new animation language
- globally patch a local defect

A new chapter number is **not** permission for a new interface language. Chapters V–VII must feel as though they were always part of the same shipped game.

### Canonical reference pattern

- ordinary investigation scene → proven Phase V / Phase VII scene shell
- dialogue → existing accepted dialogue shell and portrait registry
- location/time card → closest accepted location/time card
- flight/takeoff/route → proven Singapore → Jakarta / Jakarta → Bangkok continuity pattern
- evidence review → closest accepted evidence modal/card
- completion → closest accepted completion card
- minigame → bespoke internal interaction is allowed, but modal framing, typography, palette, safe area, touch behavior and exit/resume expectations must remain LAST WITNESS

If a genuinely new interaction has no suitable existing shell, first prove that no accepted primitive fits. Only then design the smallest compatible extension. Do not redesign surrounding UI to accommodate the new feature.

### Dialogue geometry freeze / historical Progress behavior

The owner has explicitly frozen dialogue geometry across the accepted Chapters I–IV baseline. Do not modify dialogue height, bottom position, portrait-well geometry, frame/border/radius or grid proportions unless a reproducible defect makes a scene unusable or the owner explicitly requests a redesign.

The Chapter IV Phase VIII ordinary dialogue sitting somewhat higher than an idealized uniform baseline is an **accepted visual variation**, not a reason to normalize all phases. Phase VI cinematic-CG dialogue is also an accepted special surface and must remain isolated.

Chapter I's historical shared-layout behavior can place Progress behind an ordinary dialogue because both occupy the same lower lane while dialogue has the higher z-index. This predates Runtime `0.22.4`; it is not evidence that the restored `0.22.6` baseline failed. It is accepted for continuation as a known legacy presentation limitation. If the owner later chooses to repair it, the repair must be a dedicated Progress/HUD-only task: **do not move Dialogue to fix Progress**, and audit Chapters I–IV comprehensively before release.

## Dialogue / Progress presentation restore — Runtime 0.22.6

Owner real-device review showed that the Runtime `0.22.4–0.22.5` dialogue-positioning experiment introduced unacceptable presentation regressions, including missing or overlapping Progress UI and distorted dialogue framing in some scenes. Runtime `0.22.6` therefore restores the exact pre-adjustment presentation behavior of Runtime `0.22.3` before any new dialogue/progress redesign is attempted.

Canonical restore contract:

- Runtime `0.22.3` is the behavioral source for dialogue/progress presentation
- do not load `css/chapter-04-dialogue-positioning.css`
- `css/chapter-04-dialogue-positioning.css` is retained only as an inert retired file so an upload-only package can neutralize the previous Production file without requiring a delete operation
- Chapter I–III shared dialogue/progress behavior is not modified by this restore
- Chapter IV phase source CSS/JS remains unchanged from the accepted pre-adjustment baseline
- Owner Walkthrough remains `0.22.3-w1` and is not reverted
- Hidden Case remains `0.21.0`; Phase VIII remains `0.22.2`
- no Save/Load, audio, evidence, minigame, checkpoint, route or Hidden Case behavior changes
- any future dialogue/progress redesign must start from this restored baseline and be validated on owner Android before becoming canonical

---

# 3. RUNTIME BUILD LINKAGE — EVERY RUNTIME RELEASE

Current base build: **0.22.7**.

All player-facing, owner-facing, QA-facing and save-facing Runtime build identities must resolve to the same base build.

## BUILD LINKAGE IS ATOMIC / ZERO-TOLERANCE — RELEASE BLOCKER CONTRACT

This rule is absolute for every future Production release from Chapter V through Chapter VII and for any maintenance release that changes shipped runtime behavior. **Build linkage is one atomic release transaction.** A package is not a valid release merely because gameplay code works. The release is valid only when every affected build-facing endpoint, loader expectation, cache key, QA surface and release artifact is internally consistent.

**Any mismatch in any affected endpoint is a RELEASE BLOCKER. Do not package, upload, merge, publish or call the build complete until the mismatch is fixed at the authoritative source.**

Mandatory interpretation rules:

- Owner Developer Mode and North QA are **mandatory release endpoints**, never optional secondary tooling.
- Settings build, Owner Dev build, North QA build, Runtime Build Label, global Runtime identity, document dataset identity and save-facing version metadata where present must never disagree after a base Runtime change.
- A changed JS/CSS/module file must receive a fresh cache key or loader generation where that file is cache-addressed. Never reuse the previous cache key for changed shipped code.
- A loader's expected module version must match the module actually loaded. Never let a stale `ready()` / expected-version check silently accept or reject the wrong generation.
- A visible label must reflect the authoritative build; never cosmetically relabel an older runtime to hide an underlying mismatch.
- Never repair build mismatch with MutationObservers, polling label patches, fallback overlays or post-load cosmetic rewrites. Fix the source build/version/loader linkage.
- Never ship first and “sync Dev/North/build labels later.” Synchronization happens **before packaging**.
- Do not infer that a successful main-game screen means Dev Mode or North QA linkage is correct. They must be checked explicitly.
- Do not infer that Dev Mode working means North QA is correct, or vice versa. Each endpoint requires its own verification.
- Do not infer that a documentation string proves runtime linkage. Runtime/source/loader values must be inspected directly.

### Release identity taxonomy — no ambiguous versioning

There are three different version concepts and they must never be conflated:

1. **Base Runtime build** — the visible/player-facing release identity, currently `0.22.7`. When this changes, every mandatory base-build endpoint listed below must synchronize atomically.
2. **Independent module version** — a stable subsystem may keep its own older internal version when its source did not change, for example Hidden Case `0.21.0`, Phase VIII core `0.22.2`, Owner Walkthrough `0.22.3-w1`. Do **not** fake-bump these merely to imitate the Runtime shell.
3. **Scoped maintenance/module suffix** — a deliberately isolated patch may remain under the same base Runtime only when explicitly designated and documented, with its own unique version/cache identity, for example `0.22.7-m1` or `0.22.7-a1`. This exception does **not** permit visible build mismatch and does not excuse stale loader/cache expectations.

If there is uncertainty over whether a change is a base Runtime release or a scoped independent maintenance module, **stop before packaging and resolve the release identity explicitly**. Never improvise version semantics mid-package.

### Mandatory base-Runtime synchronization endpoints

Whenever the **base Runtime number changes**, verify and synchronize all applicable endpoints before packaging, even when an individual tool's behavior did not otherwise change:

- `index.html` visible/fallback Settings build text
- `index.html` bootstrap cache key / generation
- `js/engine/09-defect-hotfix.js` header build and startup generation
- `window.LastWitnessRuntimeBuild`
- `document.documentElement.dataset.runtimeBuild`
- Runtime Build Label module version / expected version / cache
- Settings-visible build
- Owner Developer Mode visible build
- Developer Phase Navigation base version, loader cache and expected version
- North QA visible build
- North QA module version, loader cache and expected version
- Save-facing build/version metadata where the current Save Manager exposes it
- every changed phase/module loader cache key
- every changed module expected-version/ready check
- any current build value copied into diagnostics, Copy Test Info or owner/QA surfaces
- QA report release identity
- release notes release identity
- upload ZIP / source package naming
- manifest naming/content
- checksum filename/content references
- upload instructions / commit instructions where build identity is stated

**Developer Navigation may use a suffix such as `-d1`, but its base portion must equal the current Runtime. North QA's base must equal the current Runtime. Neither may be left on the previous base build after a Runtime increment.**

### When Dev Mode / North QA changes without a base Runtime increment

If Owner Developer Mode or North QA source itself changes while the base Runtime intentionally remains unchanged:

- update that module's own version/suffix
- update its cache key
- update the bootstrap/direct loader expected version
- keep its base portion compatible with the authoritative Runtime
- verify its visible build remains the authoritative base Runtime
- verify no hidden/owner-only data leaks into North QA
- document the scoped maintenance identity in the Master Plan/release notes

A Dev/North source change with stale module version or stale cache key is also a **RELEASE BLOCKER**.

### Post-package and post-upload verification

Packaging is not the final proof. After creating the upload artifact, verify the artifact itself, not only the working directory:

1. enumerate ZIP paths and compare against the intended allowlist
2. verify packaged bytes match the validated source files
3. search packaged build-facing files for stale prior-build strings and stale cache generations
4. verify no unintended QA/source/support files entered the upload-only package
5. verify checksum against the final archive bytes

After the owner uploads to GitHub, the next room/turn must read current Production HEAD and spot-check the actual landed build-facing files before treating the upload as canonical. **Never assume “uploaded” means every path landed correctly.**

### Release stop conditions

Stop the release and do not package/publish when any of the following is true:

- Settings and Runtime disagree
- Owner Dev and Runtime disagree
- North QA and Runtime disagree
- Dev/North loader expected version disagrees with module source version
- a changed file still uses its previous cache key
- Runtime Label/global/dataset identity disagrees
- Save-facing version is stale where applicable
- upload artifact contains unintended paths
- QA/release notes/package names identify a different base build
- stale previous-build strings remain in an affected authoritative path without an explicit historical/documentation reason
- a scoped maintenance module is not explicitly versioned/documented
- there is uncertainty about which version is authoritative

The correct response to any stop condition is **fix first, re-run linkage validation, then package again**. No exception for “small” changes.

## Required endpoints when Runtime build changes

### `index.html`

- Settings fallback `LAST WITNESS · BUILD X.Y.Z`
- cache key for `js/engine/09-defect-hotfix.js`
- any changed direct loader references

Current index bootstrap generation: `0227r1`.

### `js/engine/09-defect-hotfix.js`

Synchronize:

- header build
- `window.LastWitnessRuntimeBuild`
- changed dynamic CSS/JS cache keys
- expected Phase VIII version when Phase VIII changes
- Developer cache / expected version
- North QA cache / expected version
- Runtime Build Label cache / expected version

Current bootstrap is Startup Recovery `0227R1`, Runtime `0.22.7`.

### `js/engine/18-developer-phase-navigation.js`

Current `0.22.7-d1`.

Suffix may differ, but base build must match current Runtime.

### `js/engine/24-north-qa-access.js`

Current `0.22.7`.

### `js/engine/25-runtime-build-label.js`

Current `0.22.7`.

It synchronizes:

- `window.LastWitnessRuntimeBuild`
- `document.documentElement.dataset.runtimeBuild`
- Settings build
- North QA build
- Developer build
- `LastWitnessSaveManager.version` where available

### `js/engine/30-owner-walkthrough-mode.js` + `css/owner-walkthrough-mode.css`

Current Owner Walkthrough module: `0.22.3-w1`.

Bootstrap cache generation: `0223w1`.

The module is Owner-only and read-only. It may read current screen/checkpoint/stage context but must not mutate gameplay, Save, Hidden Case, progress, evidence, choices, audio or North QA state.

### `css/chapter-04-dialogue-positioning.css`

Retired in Runtime `0.22.6`. The file is inert and is not loaded by the bootstrap.

This retired file must remain inert unless the owner explicitly approves a future replacement design. Runtime `0.22.6` does not load it.

### `js/engine/31-p8-matrix-exit.js` + `css/chapter-04-phase-08-matrix-exit.css`

Current Phase VIII Matrix Exit controller: `0.22.7-m1`, bootstrap cache `v=0227m1`.

Contract:

- scoped only to the Phase VIII Disclosure Matrix
- provides explicit Close and Resume controls
- Close returns visually to Secure Debrief without completing or resetting the Matrix
- existing card placements and attempts remain intact
- no checkpoint, Save, Hidden Case, evidence, progress, dialogue geometry or route mutation
- the pause state is presentation-only and session-local; reloading while the canonical stage is `matrix` reopens the Matrix normally
- no broad MutationObserver and no repair loader

### `js/engine/32-c4-p7-p8-audio-lifecycle.js`

Current scoped maintenance module: `0.22.7-a1`, direct loader cache `v=0227a1`.

Contract:

- authoritative Runtime base remains `0.22.7`; this micro-maintenance does not fake-bump independent build-facing modules
- scope only Chapter IV Phase VII / VIII continuous-media lifecycle behavior
- background pause preserves media position
- foreground resumes appropriate active media automatically
- background play attempts from timers/controllers are suppressed
- no phase core, dialogue, Progress, CSS, Save/Load, checkpoint, Hidden Case, Dev, North QA or Walkthrough mutation
- owner physical Android acceptance: PASS 2026-08-16

### changed phase modules

If a phase JS/CSS changes, update its own version/cache and bootstrap expectations consistently.

Current Phase VIII JS/CSS generation remains `0.22.2` / `v=0222` (unchanged independent phase module).

## Stable independent modules

An unchanged module does not need a fake internal increment merely because Runtime changes.

Hidden Case engine remains `0.21.0`.

No unchanged module may cause a visible Runtime build mismatch.

## Release artifact naming

Use the same base build in ZIP, QA report, manifest, checksum filename, upload instructions and release notes.

## Mandatory build release gate

Run this gate for every base Runtime release. Run the applicable subset for scoped maintenance releases, but never skip a relevant check.

1. classify the release explicitly: base Runtime / independent module / scoped maintenance
2. choose and record the authoritative base Runtime
3. enumerate the exact affected repository paths before editing
4. update every affected source version
5. update every changed-file cache key / loader generation
6. update every affected loader expected-version / ready check
7. verify `index.html` fallback/visible build
8. verify bootstrap header/startup generation and `window.LastWitnessRuntimeBuild`
9. verify `document.documentElement.dataset.runtimeBuild`
10. verify Settings build
11. verify Owner Developer Mode build and Developer Navigation version/cache/expectation
12. verify North QA build and North QA version/cache/expectation
13. verify Runtime Build Label version/cache/expectation
14. verify Save-facing version metadata where applicable
15. verify changed phase/module versions and caches
16. search all affected authoritative build-facing files for stale prior-build strings/cache keys, excluding clearly historical documentation only
17. run syntax/static/build-linkage validation
18. create the upload artifact and verify exact path allowlist + byte equality
19. verify QA report/release notes/package/manifest/checksum all identify the same intended release
20. package/present the release only after every applicable item passes

**One failed applicable item = RELEASE BLOCKER.** Do not downgrade it to a warning. Do not hide a build mismatch with another observer. Fix the authoritative sources and rerun the gate from the affected step onward.

After owner upload, re-read Production HEAD and the landed build-facing files before declaring the release canonical.

Master Plan-only documentation changes do not bump Runtime.

---

# 4. STARTUP / LOADER SAFETY

Historical pre-restore dialogue/progress regression head:

`80c6b5c5189141c83887b81733ac6ee459a8c7d3` — `Keep Chapter IV progress visible in dialogue`

This is retained only as regression history; it is **not** the current Production baseline and its `0.22.4–0.22.5` presentation behavior must not be revived.

Historical Runtime-code baseline before Walkthrough:

`42a677a4e84132bb19d4f58dd5b1d8cd607e46c3` — `Fix P8 portraits and owner case inspector`

Historical safe startup recovery baseline:

`a3490e895a6147e2e675b5c392d3f5fb317d0977` — `Fixed cached startup repaire loader`

Current bootstrap generation is Startup Recovery `0227R1`.

A temporary Phase VIII repair loader was previously added and later reverted because it broke startup.

**Do not resurrect it.**

A prior broad MutationObserver watching/changing classes under `#game` caused startup/UI lock behavior.

**Do not recreate this architecture.**

Fix source DOM/CSS/JS directly.

Every Runtime release must verify before deeper phase QA:

- Splash → Title
- New Game
- Continue
- Load
- Settings
- Developer access
- North QA access
- current build label
- Title audio

---

# 5. SAVE / LOAD / STATE

Do not create a parallel Save system.

Preserve existing manual Save, Load, autosave and checkpoints.

Persist as applicable:

- ordinary `state`
- `state.chapter4`
- `state.endingProfile`
- hidden-case state / ledger-derived state
- evidence/found
- flags
- checkpoint
- phase-specific state
- North public-removal state
- `R.` lead
- future Rin / Last Record
- final route only once genuinely locked

Restore order:

1. ordinary state
2. hidden state/migration
3. ledger uniqueness
4. recompute hidden totals
5. adaptive route state where needed
6. scene resume
7. correct scene audio

Hidden scoring must be idempotent across load, re-entry, backgrounding, restart and evidence revisit.

Restart Current must not stack score.

A changed replayed choice replaces the old contribution.

Unknown legacy choice = no invented score.

---

# 6. AUDIO LIFECYCLE — BACKGROUND AUDIO ZERO-TOLERANCE CONTRACT

No accidental dead air when a continuous score bed is intended, and **no LAST WITNESS phase audio may continue playing after the browser/app has been hidden, backgrounded, minimized or otherwise removed from the active foreground**. This is a permanent product rule for all current and future chapters.

Dialogue, evidence, choices and minigames should normally **duck** music rather than hard-stop it. Use smooth fades and restore automatically.

## Canonical foreground/background behavior

When the browser/app leaves the foreground:

- pause all continuous media owned by the active phase immediately
- preserve `currentTime`; backgrounding is a pause, not a restart
- preserve the information required to restore the correct media/volume/ducking state
- no timer, observer, modal controller, minigame controller, fade loop or delayed callback may reawaken media while hidden
- if any scoped `play()` attempt occurs while backgrounded, it must be suppressed/re-paused so the track cannot audibly or temporally advance
- video and ambience follow the same lifecycle principle when they are phase-owned continuous media

When the browser/app returns to the foreground:

- resume the **appropriate current scene audio automatically** from the preserved position
- restore the current scene's correct volume and ducking state
- do not reset to the beginning unless the scene itself intentionally restarted
- do not require the player to tap a tab, dialogue, button or empty area merely to wake the score
- do not resurrect media from a phase/screen that stopped being active while backgrounded

Use robust Page Lifecycle coverage appropriate to the implementation. The accepted `0.22.7-a1` maintenance pattern uses `visibilitychange`, `pagehide` / lifecycle fallback and foreground `visibilitychange`, `pageshow` and `focus`, while guarding against background replay attempts. Future phases must preserve the same behavioral contract even if implementation details evolve.

## Phase VII / VIII incident — permanent regression lesson

The owner found on physical Android that Phase VII paused when minimized but failed to resume until an unrelated interaction, while Phase VIII could continue/reawaken audio in the background because a Matrix Exit session timer called its audio mode repeatedly. Maintenance module `0.22.7-a1` repaired both classes of defect.

**Owner physical Android acceptance on 2026-08-16: PASS.**

Accepted behavior now confirmed:

- Phase VII background → audio stops
- Phase VII foreground → audio resumes automatically from the prior point without extra interaction
- Phase VIII background → scoped media remains paused
- Phase VIII Matrix Exit controller cannot reawaken audio while backgrounded
- Phase VIII foreground → correct scene audio resumes automatically

This incident must be remembered and applied proactively to Chapters V–VII. Do not wait for the owner to rediscover the same defect in a new phase. Every phase with continuous media must be designed and QA'd against this contract from the start.

## Hard audio boundaries

Return to Title is a hard boundary: phase-specific music/ambience stops immediately and Title audio restores. Phase transitions must stop foreign phase audio before starting the incoming phase. Save/Load/resume must restore only the appropriate scene audio.

Music must fit LAST WITNESS, not merely loop correctly. Avoid harsh airport noise, intrusive announcements or high-frequency ambience that competes with reading.

## Mandatory future audio QA

For every Chapter V–VII phase containing continuous music, ambience or video, test at minimum: normal scene, dialogue duck, modal/evidence/choice state, minigame open, minigame closed/paused if applicable, background while each state is active, remain backgrounded long enough for timers to fire, foreground without touching the screen, phase change, Save/Load resume and Return Title. Physical Android Chrome remains the final acceptance authority.

---

# 7. PORTRAIT / DIALOGUE CONTRACT

Ordinary dialogue uses the accepted global portrait registry unless a special owner-approved set is explicitly required.

A portrait fails QA if:

- white matte/halo visible
- lower/right/left white edge visible
- half head/face cut unintentionally
- face badly off-center
- portrait stretched
- identity drifts
- unused matte exposed

Repair order:

1. `overflow:hidden`
2. scale slightly so edge falls out of frame
3. adjust `object-position`
4. translate only as needed
5. preserve full important head/face
6. if source cannot frame attractively, use another already-approved expression/portrait

The Phase VIII Maya/Cheryl edge defect was repaired through scoped scale/crop behavior in Runtime `0.22.2`.

Do not solve a local portrait defect by changing global portrait geometry unless the defect is proven global.

Keep established Chapter IV dialogue shell unless owner asks for redesign.

## Bilingual cinematic dialogue / subtitle contract — Thai and English

All player-facing dialogue in Chapters V–VII must read like **high-quality native film/series subtitles**, not translation copy and not game-development placeholder text. This applies equally to Thai and English.

The Thai and English versions are two native-written performances of the **same dramatic intent**, not a literal sentence-by-sentence conversion. Preserve the same facts, implication, emotional temperature, relationship dynamic and investigation meaning, while allowing word order, idiom, sentence length and line division to differ naturally between languages.

### English standard

- contemporary native spoken English appropriate to a serious crime thriller
- contractions and natural ellipsis where the character would genuinely use them
- concise, speakable rhythm rather than formal written prose
- no ESL-like construction, Thai word-order carryover, textbook phrasing or artificial exposition
- technical/legal language remains accurate but sounds like something that character would actually say aloud

### Thai standard

- natural contemporary spoken Thai with cinematic subtitle economy
- preserve status, familiarity, restraint, tension and personality through pronouns/particles/omission naturally, not mechanically
- avoid literal English syntax, stiff translated vocabulary, unnatural complete sentences and bureaucratic wording unless the speaker intentionally speaks institutionally
- technical terms may remain English/transliterated when that is what real investigators/technical staff would naturally say
- the Thai line must feel written by a native Thai screenwriter who understands the scene, not translated by a machine

### Subtitle rhythm

- prioritize meaning + subtext + voice over lexical equivalence
- keep lines comfortably readable on portrait mobile
- break on natural semantic beats
- cut redundant explanation when the visual/action already carries it
- do not repeat the same fact in dialogue merely to ensure the player noticed it
- dramatic pauses must arise from character behavior and scene pressure, not suspicious artificial wording
- a line must survive an aloud test: if it sounds written rather than spoken, rewrite it

### Character voice lock

Dialogue must remain recognizably character-specific. Do not let every investigator speak in one generic "smart detective" voice.

- **Benedict** — experienced, observant, controlled and concise; dry when appropriate; thinks in evidence boundaries; does not speechify to prove intelligence
- **North** — calm, analytically exact, understated, dryly amused at times; notices contradiction and system behavior; never robotic and never reduced to comic relief
- **Cheryl** — competent Singapore investigator; clean, precise, socially perceptive, capable of restrained warmth/dry teasing without losing professional credibility
- **Maya** — confident field/legal authority in Indonesia; direct, grounded and decisive; can relax into subtle playfulness but never becomes frivolous
- **Farid** — remote technical analyst; precise, low-drama and verification-focused; explains only what the team needs
- **Kittisak** — institutional authority with credible protective logic; controlled and plausible; dialogue must support both legitimate duty and suspicion without villain coding
- **Somchai** — discreet operational professional; economical speech; protected-source/off-book handling should feel practiced rather than theatrically secretive
- **Adrian** — polished lawful architect; technically exact; truthful inside carefully defended boundaries; liability awareness underneath composure
- **Arman** — intelligent broker/toolmaker; measured, selective and hard to overread; controlled disclosure rather than melodramatic evasion
- **Ika** — guarded, capable and physically credible; terse when pressured; never written as a cartoon assassin
- **Narin** — operationally credible, pressured and defensive around real wrongdoing; must remain dangerous/viable enough to support a serious principal theory
- **Elena** — ordinary, kind, credible, socially normal and harmlessly fallible until late Chapter VII; no sinister cadence, loaded wording, mysterious knowing pauses or dialogue that rewards meta-suspicion
- **Rin** — intelligent, frightened, evasive, procedurally compromised and institutionally distrustful; reveals information in earned layers and must never become an exposition machine
- **Ratchata** — forensic/physical-evidence clarity; professional and concrete rather than narrative-theory driven

Where relationship context changes warmth or directness, preserve the core voice first. Never distort personality merely to force a plot beat.

### Dialogue spoiler discipline

Dialogue/subtitles are part of the mystery system. They must obey the same spoiler firewall as evidence. In particular: unknown-principal language remains gender-neutral; Elena cannot receive special ominous phrasing before late Chapter VII; Rin cannot be named before her Chapter V reveal; Hidden Case scores/thresholds/routes never leak through seemingly casual dialogue.

### Bilingual dialogue QA gate

Before a phase is accepted, review every Thai/English dialogue line for: native naturalness, character identity, cinematic rhythm, factual equivalence, subtext equivalence, mobile readability, spoiler safety and continuity with prior scenes. A technically correct translation that sounds unnatural **fails QA**.

---

# 8. OWNER DEVELOPER MODE

Owner Developer Mode is unrestricted owner test access and remains distinct from North QA.

The owner has used Dev Mode Jump as the current practical review method for Chapters I–IV and considers those chapters acceptable for continuation as of this revision.

That acceptance does not convert Dev Jump into exhaustive full-play E2E. Future reproducible defects remain repairable.

Current Chapter IV list must contain exactly these eight canonical entries:

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

No Phase IX without explicit owner approval.

`Token Verification` is an internal Phase II checkpoint, never an extra phase button.

A Dev jump must close Dev UI, stop foreign media, clear incompatible overlays, prime only canonical prerequisites, avoid unrelated chapter flashes and enter the requested phase deterministically.

Only Owner Developer Mode may expose Hidden Case internals:

- per-source deltas
- suspect totals
- case dimensions
- eligibility/prosecutability
- contradiction pressure
- evidence breadth
- top/secondary theory
- projected ending
- Elena attribution convergence
- Elena prosecutability convergence
- missing Elena gates
- global evidence integrity
- legacy backfill ledger
- deterministic ending dry-run

## Owner Hidden Case Inspector — Runtime 0.22.2

The old raw JSON/code-dump presentation is replaced by an Owner-only visual simulation sandbox.

The inspector may display:

- suspect portrait or approved fallback presentation
- suspect name
- live score/status
- visual score bar
- synthetic `− / +` adjustment controls
- editable synthetic values where implemented
- global case dimensions
- live leader
- simulated leader
- reset-to-live-state control

Synthetic adjustment rules are non-negotiable:

- temporary only
- no write to Hidden Case ledger
- no write to Save data
- no write to canonical case state
- no autosave
- no permanent route mutation
- closing/resetting discards synthetic overrides

This sandbox exists to accelerate Alternate Ending / eligibility testing without contaminating the real investigation state.

## Owner Walkthrough Mode — Runtime 0.22.3-w1

Owner Developer Mode includes a professional read-only Walkthrough covering the currently accepted playable content from Chapter I through Chapter IV Phase VIII.

Purpose:

- show the current walkthrough step
- state the next action clearly
- provide a restrained hint
- reveal a verified solution when the Production logic has a deterministic answer
- label narrative/relationship choices as `NO FAILURE PATH` when no single correct answer exists
- allow manual Chapter/Phase browsing
- allow `SYNC TO GAME` using current screen/checkpoint/stage context
- minimize to a compact pill while gameplay continues

Safety contract:

- Owner-only
- never available to North QA
- read-only with respect to gameplay state
- no Hidden Case write
- no Save write
- no checkpoint/progress/evidence/choice mutation
- no automatic puzzle completion
- no synthetic click injection
- no audio control
- no broad `MutationObserver`
- polling/sync may update Walkthrough UI only
- closing/minimizing the guide must not change gameplay

Walkthrough answers are derived from current Production logic. Deterministic puzzle solutions must match the actual validators in source; narrative choices must not be falsely presented as objectively correct.

---

# 9. NORTH QA

North QA is limited blind-tester access.

Current module: `0.22.7`.

It shares canonical Developer Phase Navigation for Chapter IV entry so reset/media/state behavior remains aligned.

North QA may test:

- chapter/phase access
- routing
- dialogue
- normal UI
- evidence unlocks
- media
- Save/Load
- Restart / Return Title
- state continuity
- build label
- mobile interaction

North QA must **never** expose:

- hidden score numbers
- score deltas
- route leader
- projected ending
- thresholds
- Elena gate names/count
- choice ledger
- ending simulator
- owner-only mystery diagnostics
- Owner Hidden Case simulation controls
- Owner Walkthrough Mode, hints or verified solutions

Blind-test integrity is a product requirement.

---

# 10. HIDDEN CASE ARCHITECTURE

LAST WITNESS does **not** end by asking the player to choose the killer.

Ordinary investigative decisions across Chapters I–VII quietly build legal/evidentiary case state.

At the end, the backend reveals which case the entire investigation became capable of proving.

> **The game does not ask who you think the killer is. It reveals which case your entire investigation became capable of proving.**

Current engine:

`js/engine/28-hidden-case-architecture.js`

Current module version:

`0.21.0`

Properties:

- deterministic
- auditable by owner
- invisible to normal player
- idempotent
- Save/Load safe by design
- visible relationship values never used as criminal attribution

Canonical principal profiles:

- Kittisak
- Narin
- Adrian
- Arman
- Ika
- Elena

Somchai is high-suspicion conditional/support/cleaner route unless a future owner decision promotes him to a standalone false-conviction principal.

Case dimensions include:

- attribution
- motive
- means
- opportunity
- concealment/obstruction
- corroboration
- admissibility
- evidence breadth
- institutional support/prosecutability
- contradiction pressure

Global integrity concepts include:

- evidenceIntegrity
- chainOfCustody
- witnessProtection
- northSafety
- publicRecordControl
- institutionalTrust
- corroborationBreadth
- alternativeHypothesesPreserved
- physicalTruthIntegrity
- chronologyIntegrity
- originalRecordIntegrity
- future Rin/Last Record state

Every hidden scoring source needs a stable unique source ID and owner-auditable reason.

Visible relationship system remains frozen/separate:

- Trust
- Respect
- Affection / Attachment
- Suspicion
- Character Journal presentation

No final killer-selection UI, visible suspect score, visible route percentage, visible ending meter or visible Elena-unlock meter in normal gameplay.

---

# 11. HISTORICAL TRUTH VS PLAYER KNOWLEDGE

Historical truth is fixed in every ending:

- Elena is mastermind / Decision Owner
- Elena killed Kawin Nopparat
- Elena killed Daniel Voss
- Elena selected victims
- Elena selected room/timing conditions
- Elena controlled discovery sequence
- Elena controlled cleanup priority

Alternate endings are different provable/accepted legal realities, not alternate histories.

Elena must not be proved in Chapter IV or V, must not become obvious in Chapter VI, and becomes fully serious only in late Chapter VII synthesis.

Blind-play target:

- Phase VIII: Elena outside normal Top 3
- Chapter V: low-probability
- Chapter VI: below principal false suspects
- early Chapter VII: multiple non-Elena theories stronger
- late Chapter VII: Elena serious only after cross-class synthesis

Practical target: roughly under 10% first-play suspicion for most blind testers until late Chapter VII.

Visible Elena remains ordinary, kind, credible, socially normal, harmlessly fallible, sometimes irrelevant and never villain-coded.

Prohibited Elena tells include:

- mysterious smiles
- villain pauses
- “she knows too much” framing
- suspicious perfect intuition
- conspicuous alibis
- unique technical signature
- secret operator calls
- Elena-named pre-reveal phase
- gendered unknown-principal clues

## Sensitive canon / spoiler firewall — room-internal only

The following information is deliberately sensitive. It belongs in the Master Plan and Owner-only reasoning because losing it would break the long-form mystery, but it must not leak into normal player UI, North QA diagnostics, early dialogue, asset names intended for player exposure or pre-reveal chapter/phase titles.

- Elena is the fixed historical murderer/mastermind/Decision Owner in every route
- the five mandatory false-conviction-capable principals are Kittisak, Narin, Adrian, Arman and Ika
- Somchai is strongly suspicious cleaner/accomplice/conditional support but is not currently a mandatory standalone false-conviction principal
- Rin is `R.` and the future Last Witness/registrar, but Chapter IV may expose only `R.`
- alternate endings change what can be proved/accepted legally or institutionally; they never change who historically committed the murders
- visible relationship values are not criminal-attribution scores
- the player is never asked to choose a killer from a final list
- Elena must remain low-signal through Chapter V, below the principal false theories in Chapter VI, and becomes fully serious only during late Chapter VII cross-class synthesis
- Elena true conviction requires both attribution convergence and prosecutability convergence with multiple independent evidence classes
- RIGHT NAME, NO CASE is allowed when truth is understood but the legal bridge fails
- FALSE CONVICTION is a sustainable wrong case against a person guilty of real serious wrongdoing but not the historical murders
- THE PERFECT RECORD represents a surviving institutional narrative / inability to reopen when no clean correct prosecution survives
- no single clue, confession, email, CCTV frame, timestamp, witness or database row may solve Elena
- no ordinary single choice may decide the ending

The core writing discipline remains:

> **Elena does not create the red herring. She creates conditions in which the red herring creates itself.**

And the core ending discipline remains:

> **The game does not ask who you think the killer is. It reveals which case your entire investigation became capable of proving.**

Treat these as spoiler-security constraints, not just plot notes.

---

# 12. CORE MYSTERY / FALSE PRINCIPALS

Mandatory false-conviction-capable principals:

1. Kittisak
2. Narin
3. Adrian
4. Arman
5. Ika

Somchai remains mandatory high-suspicion cleaner/accomplice/conditional support.

Each false principal must possess:

- real serious wrongdoing
- a real secret
- plausible murder motive
- means
- opportunity/delegation
- authentic obstruction
- several evidence classes
- reason for incomplete cooperation
- a late contradiction

The player's error is **causal attribution**, not fact recognition.

The same true event can support different causal stories.

No single clue uniquely proves Elena before late Chapter VII.

Core technical principle:

> **A valid credential proves access, not identity.**

Temporary Operational Profile `18-07` is a profile, not a person.

Historical responsibility layers:

- Adrian = lawful architecture + concealed continuity liability
- Arman = adapted wrapper / blind broker + deeper behavior/payment/ledger metadata
- Narin = trusted Bangkok deployment + real wrongdoing/concealment/motive
- Ika = later Aster field/recovery layer + unresolved pre-Aster history
- Kittisak = off-book institutional continuity/containment
- Somchai = off-book physical transfer/protected-source handling
- Elena = murder decision, victim selection, physical murders, timing/discovery/cleanup priority

Core Elena method:

> **Elena does not create the red herring. She creates conditions in which the red herring creates itself.**

## Kittisak

Real dark truth: off-book continuity/containment operation, emergency authority beyond normal oversight, protected sources/assets, compartmentalized records, Somchai sealed transfers.

Why he can look like mastermind: authority, access, audit restriction, information control, intermediary capacity, plausible institutional motive.

Late contradiction: cannot fully explain preselection of both victims/timing across the whole chain.

## Narin

Real dark truth: trusted Bangkok deployment, bypassed change control, illicit compensation/protected interest, altered/suppressed deployment records, real fear of disclosure.

Why he can look like mastermind: trusted local access, proximity, deployment capability, motive, record manipulation, opportunity.

Late contradiction: selection/chronology begins before he could know enough to choose both victims/timing.

## Adrian

Real dark truth: lawful architect who concealed undocumented continuity/emergency path and liability/regulatory/private-contract exposure.

Why he can look like mastermind: privileged architecture, hidden failover capability, internally valid record behavior, motive to protect liability.

Late contradiction: cannot fully explain physical victim-selection chronology.

## Arman

Real dark truth: engineered blind brokerage but retained behavior/payment/urgency/region/return-channel fingerprints and deeper ledger.

Why he can look like mastermind: tool authorship, sophistication, network compartmentalization, identity shielding, obstruction.

Late contradiction: technical concealment cannot explain full physical victim-selection chronology.

## Ika

Real dark truth: incomplete licensed history, pre-Aster aliases, unlicensed contracts, travel gaps, concealed violent work.

Why she can look like mastermind: proven violence, field capability, surveillance tradecraft, hidden prior work, North attack.

Late contradiction: hidden work overlaps case but does not complete murder act.

## Somchai

Real dark truth: off-book physical transfers, evidence movement outside normal visibility, protected-source handling, secure routes.

Can appear as Kittisak cleaner, physical remover or independent operator using institutional cover.

---

# 13. COOPERATION PARADOX

Central question:

> **Why did people with serious secrets give the team exactly enough truth to move forward?**

Canonical principle:

> **A truthful confession can be a form of concealment.**

North:

> `Nobody lied about the part they gave us.`

Benedict:

> `That doesn't mean they gave us the whole truth.`

Do not over-explain afterward.

Adrian disclosed authentic lawful architecture but not full continuity liability.

Arman disclosed an authentic package but protected deeper broker metadata.

Ika's later Aster timeline is true but not her complete earlier biography.

Kittisak genuinely wants the murder solved while protecting an off-book containment program.

Somchai cooperates until protected-source/off-book handling is threatened.

---

# 14. R. / RIN

`R.` remains unresolved through Chapter IV.

Future identity:

**Rinrada “Rin” Sornchai**

Role:

**Former Identity and Access Registrar · Last Witness**

Rin enters active mystery in Chapter V.

She is not a magical exposition witness.

She retained/copied material she should not possess, may have made an out-of-procedure credential action, hid for self-protection, distrusts institutions and withholds part of the Last Record until custody is trusted.

---

# 15. CHAPTER IV CANON

Exactly eight phases:

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

**Chapter IV is now owner-accepted for current continuation.**

P1–P8 are maintenance locked except:

- reproducible defects
- integration blockers
- backward-compatible persistence requirements
- owner-requested changes

Do not reopen accepted scenes merely to polish them.

## Phase VII locked handoff

- Day 6
- 07:22 WIB
- North Jakarta · Indonesia
- JKT-R7 Relay Facility
- maintenance window 07:30–07:45
- false completion receipt 05:43
- North attribution-watch closes 05:44
- archive 18-07 continuity-transfer queue 05:46
- one-time handshake 05:51
- contractor Aster Recovery
- Maya owns perimeter/warrant
- Cheryl protects Singapore mirror
- no live credential crosses border
- R-18 physically correlated
- reader clock normalized
- relay isolated lawfully
- residual path active
- secondary continuity supported
- Decision Owner unresolved

Required flags:

- `ch4_p7_facility_lawfully_inspected`
- `ch4_p7_reader_clock_normalized`
- `ch4_p7_r18_correlated`
- `ch4_p7_isolation_order_authorized`
- `ch4_p7_residual_path_observed`
- `ch4_p7_secondary_continuity_supported`
- `ch4_p7_decision_owner_unresolved`
- `ch4_p7_phase8_handoff_ready`

Checkpoint: `ch4_phase7_complete`.

Phase VII's reuse of established Phase V primitives is the engineering model for future ordinary scenes.

---

# 16. CHAPTER IV PHASE VIII — SHADOW OF THE TRUTH

Phase VIII closes Jakarta operationally but does not solve the mastermind.

It consolidates JKT-R7 proof, exposes Cooperation Paradox, preserves North public false removal/secret survival, keeps Decision Owner unresolved, establishes `R.` as next lead, strengthens non-Elena theories, seeds Kittisak suspicion, closes Indonesia lawfully and ends before Bangkok arrival.

Current Runtime Phase VIII: `0.22.2`.

Files:

- `js/chapters/chapter-04/08-shadow-of-truth.js`
- `css/chapter-04-phase-08.css`

**Owner current-pass acceptance is complete.**

Later reproducible defects may still be repaired surgically.

## Opening

`P7 → approved statement-return cinematic → location/time card → Secure Debrief`

No extra Phase VIII title card.

Opening asset:

`assets/video/chapter-04/phase-08/opening-statement-return.mp4`

Approved source duration: approximately 9.47 seconds.

## Secure Debrief card

- DAY 6
- 09:18 WIB
- NORTH JAKARTA · INDONESIA
- JKT-R7 · SECURE DEBRIEF
- POST-INCIDENT STATEMENT CLEARED · EVIDENCE RECONCILIATION

Approved image:

`assets/images/chapter-04/phase-08/secure-debrief-room.png`

Shows Benedict, North, Maya, Cheryl, and Farid remote on wall screen.

Cheryl is physically in Jakarta. Farid is remote in Singapore.

### Secure Debrief composition freeze

The current composition is accepted even though the objective overlay partially obscures Farid's face on the wall display.

Do **not** vertically shift/reframe the entire scene merely to reveal more of Farid unless a later real-device defect demonstrates a genuine readability problem.

Farid's remote presence remains understandable from the monitor composition and visible analyst labeling.

Do not replace this image with a darker alternative or crush owner-approved brightness with overlay.

## Disclosure Matrix

Subjects:

1. Adrian
2. Arman
3. Ika

Slots:

1. WHAT THEY GAVE
2. WHAT IT PROVED
3. WHAT IT DID NOT PROVE
4. WHO / WHAT BECAME NEXT TARGET

Canonical answers:

### Adrian

- Lawful continuity architecture
- base architecture authentic/authorized
- does not prove who used continuity outside documented deployment boundary
- next: implementation / wrapper layer

### Arman

- execution package / wrapper cache
- delivery package authentic
- does not prove who sat behind blind broker / deeper ledger
- next: field deployment layer

### Ika

- Aster employment timeline
- Aster recruited her after the murders
- does not prove operational history before Aster
- next: earlier aliases / travel history

Interaction is tap-to-place, mobile-first and safe-area aware.

Footer/buttons must never fall outside viewport.

Hidden method choice after Matrix:

- boundaries
- chronology
- custody

Bangkok custody response:

- written
- parallel
- log

No choice directly names murderer.

## Evidence IDs

- `ch4_p8_disclosure_matrix`
- `ch4_p8_arman_boundary`
- `ch4_p8_ika_pre_aster_gap`
- `ch4_p8_bangkok_preservation_order`
- `ch4_p8_registrar_trace`
- `ch4_p8_north_public_removal`

## Bangkok notice

Valid Emergency Evidence Continuity Order:

- authority: Kittisak
- transfer: Somchai
- rationale: source protection / cross-jurisdiction continuity

It can be read as careful institutional protection or evidence control using correct paperwork.

## R. lead

Cross-map Room 1807, Profile 18-07, pier contact and registrar activity.

`R.` becomes next lawful lead.

Do not reveal Rin by name in Chapter IV.

## Departure

Approved asset:

`assets/images/chapter-04/phase-08/jakarta-departure-corridor.png`

Card:

- SOEKARNO-HATTA · INTERNATIONAL DEPARTURES
- DAY 6 · 16:42 WIB

North:

> `They still have me listed as removed.`

Benedict:

> `Good.`

North:

> `And if they check again?`

Benedict:

> `Let them believe the record.`

Gender-neutral unknown-principal language is mandatory.

The NORTH · REMOVED information card must remain readable and player-acknowledged rather than disappearing before the player can absorb it.

## Takeoff structure — Singapore → Jakarta continuity

Jakarta → Bangkok reuses the proven Singapore → Jakarta flight language.

Sequence:

1. reach `100%` before boarding/takeoff
2. show takeoff video without phase progress UI
3. preserve proven header/Skip behavior
4. route card appears after natural end or intentional Skip
5. route card shows Jakarta → Bangkok with premium mobile hierarchy
6. Continue → Chapter IV Complete

Current route:

- JAKARTA
- SOEKARNO-HATTA
- TAKEOFF 18:10 WIB
- BANGKOK
- DIRECT

Video:

`assets/video/chapter-03/phase-02/airplane-takeoff.mp4`

Bangkok arrival belongs to Chapter V Phase I only.

## P8 music — dedicated Runtime 0.22.1+ mix

Opening/Location/Debrief uses the dedicated Investigation C4P8 score.

Departure/Takeoff/Complete uses the dedicated Departure C4P8 score.

Canonical assets:

- `assets/audio/chapter-04/phase-08/investigation-c4p8.mp3`
- `assets/audio/chapter-04/phase-08/departure-c4p8.mp3`

Runtime balances their differing source loudness through controlled gain rather than flattening the masters.

Dialogue, Matrix, evidence and choices duck the score rather than hard-stop it.

Departure score continues through Takeoff and Chapter IV Complete.

Return to Title stops Phase VIII audio immediately and restores Title audio.

## Portrait acceptance

Historical defects:

- Maya lower white matte
- Cheryl right white edge
- North bad half-face/head crop

Current acceptance target:

- zero visible white edge
- full readable head
- balanced framing
- local scale/crop correction before global repair
- another accepted expression may be used if a source cannot frame cleanly

Runtime `0.22.2` applies scoped Maya/Cheryl scale/crop correction.

## Owner Hidden Case Inspector

Runtime `0.22.2` replaces the raw code dump with an Owner Dev visual simulation sandbox.

This is not normal player UI and is not North QA UI.

Synthetic controls must remain temporary and non-persistent.

## Completion card

- JAKARTA OPERATION / CLOSED
- NORTH PUBLIC RECORD / REMOVED
- R. / REGISTRAR TRACE
- CASE ATTRIBUTION / UNRESOLVED
- NEXT · CHAPTER V · THE MISSING PIECE
- RETURN TO TITLE

No fake Chapter V gameplay.

---

# 17. PHASE VIII REGRESSION HISTORY — DO NOT REPEAT

## 0.21.0 initial release

Major defects:

- approved opening MP4 omitted
- P7 visibility interfered with
- static checks described too strongly

Lesson: a package is not complete if an approved binary is missing.

## 0.21.1 / 0.21.2 black screens

Lesson: use the owner's last visible successful screen to isolate the boundary instead of repeatedly patching the same assumption.

## broad MutationObserver repair

A broad class-repair observer caused startup/UI lock.

Lesson: never continuously “repair” canonical scene classes after construction.

## custom P8 geometry

P8 phase classes once overrode global screen geometry with `position:relative` and collapsed scenes.

Lesson: reuse `.screen` + proven Phase V/VII geometry.

## bootstrap/cache mismatch

Visible build and loaded modules diverged.

Lesson: Build linkage is an atomic release requirement.

## mocked media overclaim

A harness with mocked media was described too strongly.

Lesson: mocked playback is not real playback E2E.

## 0.21.8 playable milestone

Owner physical Android confirmed opening, location, Debrief, Matrix and Departure were playable.

This established the major black-screen geometry fix.

## 0.21.9 polish feedback

Owner identified music mismatch, harsh airport sound, Maya/Cheryl matte edges, North crop and takeoff-card obstruction.

## 0.22.0 recovery

Introduced recovered direct-core Phase VIII implementation and synchronized startup recovery after removal of the broken temporary repair loader.

Historical safe recovery baseline:

`a3490e895a6147e2e675b5c392d3f5fb317d0977`

**Do not resurrect the reverted repair loader.**

## 0.22.1 Phase VIII defect/polish pass

Introduced:

- dedicated Investigation C4P8 music
- dedicated Departure C4P8 music
- controlled music ducking/crossfade
- Return-to-Title phase-audio hard boundary
- stronger portrait crop correction
- player-readable NORTH · REMOVED handling
- `100%` completion before takeoff
- no takeoff progress bar
- improved Jakarta → Bangkok route hierarchy
- synchronized Runtime build linkage

## 0.22.2 portrait + Owner Inspector pass

Introduced:

- additional scoped Maya/Cheryl scale/crop correction
- Owner Hidden Case Inspector visual presentation
- temporary synthetic `− / +` controls
- simulation state isolated from canonical Hidden Case / Save / ledger
- synchronized Runtime `0.22.2`
- Developer `0.22.2-d1`
- North QA `0.22.2`

Current Production HEAD at this documentation update:

`42a677a4e84132bb19d4f58dd5b1d8cd607e46c3`

Message:

`Fix P8 portraits and owner case inspector`

## 0.22.3 Owner Walkthrough tooling

Runtime `0.22.3` adds an isolated Owner-only Walkthrough module without changing accepted Chapter I–IV gameplay logic.

Introduced:

- professional read-only walkthrough overlay
- Chapter I → Chapter IV Phase VIII coverage
- context-sensitive sync to current screen/checkpoint/stage
- exact Production-verified solutions for deterministic minigames
- explicit `NO FAILURE PATH` labeling for non-failing narrative choices
- hint / show-solution controls
- manual Chapter/Phase browsing
- minimized gameplay-safe guide pill
- North QA exclusion
- no canonical state or Save mutation
- synchronized Runtime `0.22.3`
- Developer `0.22.3-d1`
- North QA `0.22.3`
- Walkthrough module `0.22.3-w1`

Phase VIII remains the accepted independent module `0.22.2`; Hidden Case remains `0.21.0`. Neither is bumped merely to match the Runtime shell because neither module changed.

## 0.22.4 Chapter IV dialogue positioning

Runtime `0.22.4` introduces a presentation-only Chapter IV ordinary-dialogue normalization after owner review found the Chapter IV dialogue boxes were progressively elevated relative to the better-balanced Chapter I reference.

Introduced:

- isolated `css/chapter-04-dialogue-positioning.css`
- lower ordinary dialogue baseline across Chapter IV Phase I–VIII
- no dialogue-height changes
- no portrait-well/crop/grid changes
- matching progress pill presentation-hidden only while ordinary dialogue is visible
- automatic progress reappearance when dialogue closes
- no changes to progress values/state
- no changes to Phase VI cinematic CG dialogue
- no changes to phase JS, story, evidence, choices, Save/Load, Hidden Case, audio, minigames, combat or Owner Walkthrough logic
- synchronized Runtime `0.22.4`
- Developer `0.22.4-d1`
- North QA `0.22.4`
- Runtime Build Label `0.22.4`

Owner Walkthrough remains independent module `0.22.3-w1`; Phase VIII remains `0.22.2`; Hidden Case remains `0.21.0`.

## 0.22.5 Chapter IV dialogue-time Progress visibility

Owner Android review accepted the lower Runtime `0.22.4` dialogue placement but showed that hiding Progress during speech removed useful orientation feedback. Runtime `0.22.5` corrects only that presentation defect.

Introduced:

- accepted ordinary-dialogue baseline remains `bottom: calc(18px + var(--bottom,14px))`
- matching Progress remains visible during ordinary dialogue
- dialogue-time Progress becomes a compact one-line rail below the dialogue box
- percentage text and progress bar are both retained
- rail uses the safe strip between the dialogue lower edge and device bottom safe area
- rail geometry is independent of dialogue text height, so long dialogue can grow upward without collision
- original per-phase Progress geometry returns automatically when dialogue closes
- Phase VI cinematic CG dialogue / Progress behavior remains unchanged
- no changes to phase JS, story, progress values, Save/Load, Hidden Case, audio, minigames, combat or Owner Walkthrough logic
- synchronized Runtime `0.22.5`
- Developer `0.22.5-d1`
- North QA `0.22.5`
- Runtime Build Label `0.22.5`

Owner Walkthrough remains independent module `0.22.3-w1`; Phase VIII remains `0.22.2`; Hidden Case remains `0.21.0`.

## 0.22.6 Restore pre-dialogue-adjustment presentation

Owner Android review rejected the combined Runtime `0.22.4–0.22.5` dialogue/progress presentation experiment. Runtime `0.22.6` restores the pre-adjustment Runtime `0.22.3` behavior while preserving later release chronology.

Restored:

- pre-adjustment dialogue geometry and positioning behavior
- pre-adjustment Progress presentation behavior
- bootstrap module order from Runtime `0.22.3` with current `0.22.6` build linkage
- Owner Walkthrough `0.22.3-w1` remains active

Retired:

- loading of `css/chapter-04-dialogue-positioning.css`
- Runtime `0.22.4` low-dialogue override
- Runtime `0.22.5` compact below-dialogue Progress rail

The retired stylesheet is left inert only so the owner can neutralize it through an upload-only GitHub replacement without a separate delete operation.

## 0.22.7 Phase VIII Disclosure Matrix exit path

Owner real-device review found that the Phase VIII Disclosure Matrix had no player-controlled exit: once opened, the player had to finish all three subjects or leave the game. Runtime `0.22.7` adds an isolated presentation controller without reopening dialogue geometry or the accepted investigation logic.

Introduced:

- explicit `×` close control in the Disclosure Matrix header
- close returns to the existing Secure Debrief scene
- visible `RESUME DISCLOSURE MATRIX` control while the Matrix is paused
- current placements, subject index and attempts remain intact
- resume returns to the same in-progress Matrix
- no Matrix auto-completion, reset or evidence award
- no Hidden Case, Save schema, checkpoint, route, Progress or dialogue-geometry mutation
- audio returns to normal Secure Debrief level while visually paused and re-ducks when the Matrix resumes
- Phase VIII core remains `0.22.2`; the exit controller is independent module `0.22.7-m1`

## 0.22.7-a1 Chapter IV Phase VII / VIII audio lifecycle maintenance

Owner physical Android review exposed two lifecycle defects after the Matrix Exit maintenance: Phase VII stopped in background but did not resume automatically on foreground until another UI interaction, while Phase VIII could remain/reawaken in background because the Matrix Exit session-local audio guard continued calling audio mode while hidden.

Introduced as isolated maintenance module `js/engine/32-c4-p7-p8-audio-lifecycle.js` with cache `v=0227a1`; authoritative Runtime remains `0.22.7`.

Contract:

- scope only Phase VII and Phase VIII media families
- background pause preserves playback position
- foreground returns to the proper active media automatically without unrelated touch
- background replay attempts are suppressed/re-paused and rewound to the captured position
- no dialogue, Progress, portrait, Matrix validator, evidence, choice, checkpoint, Save/Load, Hidden Case, route, Dev Jump, North QA or Owner Walkthrough mutation
- no change to P7 core, P8 core, Matrix Exit core or Chapter IV CSS

**Owner physical Android acceptance on 2026-08-16: PASS.** The reported P7 and P8 lifecycle defects are closed. This pattern is a permanent regression lesson for Chapters V–VII.

## Current owner acceptance

After the above recovery and maintenance, the owner has performed a practical Dev Mode Jump / real-device review across Chapters I–IV and accepts the current result for continuation. The latest P7/P8 audio lifecycle maintenance is additionally confirmed PASS on physical Android.

Do not reinterpret this as an exhaustive guarantee that no future defect can exist.

---

# 18. CHAPTER IV FINAL END STATE — OWNER ACCEPTED

Current canonical end-state:

- Jakarta operation closed
- Decision Owner unresolved
- North publicly removed / secretly alive
- false-removal belief preserved
- Arman viable
- Adrian viable
- Ika viable
- Narin viable
- Kittisak active suspect direction
- Somchai custody/execution suspicion
- `R.` next lead
- Elena low-signal/unproven
- Benedict/North depart Indonesia
- Bangkok arrival reserved for Chapter V

Status:

`CHAPTER IV COMPLETE · PHASE VIII OWNER-ACCEPTED`

Acceptance basis:

`Owner Dev Mode Jump / real-device current-pass review`

This state is frozen for story continuation.

Only reproducible defects, integration blockers, backward-compatible persistence needs or explicit owner changes should modify Chapters I–IV.

---

# 19. CHAPTER V — THE MISSING PIECE

Exactly eight planned phases:

1. RETURN TO BANGKOK
2. NAME IN ROOM 1807
3. ROOM / PROFILE CROSS-MAP
4. DANIEL'S HANDOFF
5. THE REGISTRAR
6. PIER RECONSTRUCTION
7. WITNESS EXTRACTION
8. THE MISSING PIECE

Adaptive mode: **INFLUENCE**.

Target roughly 75–85% shared canonical spine, 15–25% adaptive emphasis.

## Phase 1 — RETURN TO BANGKOK

This is now the **immediate story-production objective**.

Open on return flight/approach/landing/Bangkok arrival.

Kittisak has already ordered selected files sealed or compartmentalized for source protection.

Somchai physically moved a protected evidence package while Benedict returned from Jakarta.

Kittisak has a reasonable explanation, but the timing is suspicious.

Elena remains ordinary/background if present.

Do not reopen Jakarta merely to create a new bridge. Chapter IV is closed.

## Phase 2 — NAME IN ROOM 1807

Reveal Room 1807 victim:

**Kawin Nopparat**

Raise Narin suspicion sharply.

Narin may have known Kawin operationally/professionally, had reason to fear disclosure, deployment intersects Kawin access window, and a record changed after disappearance.

Kittisak may also have known protected identity earlier than Benedict was told.

## Phase 3 — ROOM / PROFILE CROSS-MAP

Build multi-theory board crossing:

- Room evidence
- Profile 18-07
- architecture
- wrapper
- deployment
- physical movement
- custody
- institutional access

The same board must seriously support Narin, Kittisak, Adrian and Arman.

Elena is not formal board focus.

## Phase 4 — DANIEL'S HANDOFF

Daniel's prepared material contains an ambiguous warning about a gatekeeper/authority layer.

It is authentic but role-based rather than name-based and can plausibly implicate Kittisak, Adrian or Narin depending on causal interpretation.

## Phase 5 — THE REGISTRAR

Locate `R.` and reveal Rin.

Rin is intelligent, frightened, evasive, procedurally compromised, distrustful of institutions and not fully cooperative.

She reveals registrar anomalies and the distinction between accepted access and physical identity.

She does not solve the case.

## Phase 6 — PIER RECONSTRUCTION

Reconstruct physical event connected to Kawin/Daniel.

Reopen Ika through pre-Aster alias, travel gap, unlicensed field work or physical-capability evidence.

Aster recruitment after murders remains true but no longer reads as full-biography exoneration.

## Phase 7 — WITNESS EXTRACTION

A real threat forces emergency movement of Rin/protected source.

Kittisak orders off-book protection through Somchai.

Intent is protective; procedure is visibility-breaking and suspicious.

At the same time:

- Ika-related tradecraft appears
- Narin resists/disappears
- Adrian restricts system path
- Arman protects/destroys a key

Different suspects behave badly for different reasons.

## Phase 8 — THE MISSING PIECE

Prove multiple real concealment systems coexist.

The missing piece is **not Elena**.

It is recognition that several people are hiding different crimes inside the same evidence field.

End-state:

- Kittisak top-tier
- Narin top-tier
- Adrian viable
- Arman viable
- Ika viable
- Somchai cleaner/accomplice plausible
- Rin valuable but guarded
- Elena low-suspicion

Open Chapter VI with `CASE THEORY WITHOUT A CHARGE`.

## Chapter V adaptive rule

Adaptive state may change pressure target, follow-up question, optional evidence context, which two/three theories North compares and minor scene emphasis.

It may not change historical facts.

Use top two/top three viable theories, not only current leader.

Elena hidden values never grant early Elena spotlight.

---

# 20. CHAPTER VI — THE FINAL MOVE

Nine planned phases:

1. CASE THEORY WITHOUT A CHARGE
2. CONTROLLED LEAK
3. ALLIANCE ASSIGNMENT
4. CONTINUITY PROTOCOL
5. ATTACK ON SAFE CHAIN
6. EVIDENCE DIVISION BREACH
7. THE QUIET CHANNEL
8. TWO STAGING SITES
9. THE FINAL MOVE

Adaptive mode: **DIVERGE**.

Target roughly 60–70% shared spine, 30–40% adaptive variation.

Do not create five entirely separate Chapter VIs.

## CASE THEORY WITHOUT A CHARGE

Construct five serious principal cases: Kittisak, Narin, Adrian, Arman, Ika.

Each needs motive, means, opportunity, evidence, obstruction and unresolved contradiction.

No UI tells player which is real.

## CONTROLLED LEAK

Different controlled pieces travel through different channels.

No uniquely identifiable Elena bait packet.

Reactions:

- Kittisak changes institutional handling
- Narin changes movement/contacts
- Adrian restricts technical branch
- Arman protects escrow/keys
- Ika-linked operators move physically
- Somchai executes sealed instruction

All suspicious; none proves murder.

## ALLIANCE ASSIGNMENT

Divide responsibility across witness, custody, technical verification, institutional warrant and field movement.

Choices alter chain quality, witness safety, alliance strength and prosecutability.

## CONTINUITY PROTOCOL

Reveal a legitimate emergency protocol intersecting Adrian architecture, Arman wrapper compatibility, Narin deployment, Kittisak emergency use, Somchai transfers and Ika/Aster recovery touchpoints.

Same protocol supports several false-principal theories.

It does not identify Elena.

## ATTACK ON SAFE CHAIN

Compromise protected chain.

Evidence supports multiple readings:

- Ika physical tradecraft
- Arman abstraction
- Narin deployment
- Adrian architecture
- Kittisak/Somchai internal timing

Do not resolve initiator early.

## EVIDENCE DIVISION BREACH

Expose Somchai off-book movement and Kittisak containment program.

This should create the strongest Kittisak suspicion spike.

Kittisak controlling evidence can be true in a limited institutional sense without proving murder.

## THE QUIET CHANNEL

This replaces any old `ELENA KNOWS` concept.

Seed one/two Elena-compatible latent facts as mundane administrative details.

No direct Elena confrontation.

Chapter VII synthesis changes their meaning.

## TWO STAGING SITES

Reveal near-simultaneous staging paths.

Lone-operator theories weaken while mastermind/accomplice theories strengthen.

Each false-principal theory can still explain the issue differently.

## THE FINAL MOVE

High-stakes preservation/trust action.

Do not reveal Elena.

End Chapter VI with at least three strong principal theories, preferably all five in some states.

Last Witness / Last Record becomes central.

---

# 21. CHAPTER VII — LAST WITNESS

Eight planned phases:

1. THE ROOM REPEATS
2. THE PIER
3. RESCUE / PRESERVE
4. FIVE PRINCIPALS
5. THE LAST RECORD
6. FINAL RECONSTRUCTION
7. THE WEIGHT OF PROOF
8. RECORD OR RELEASE / ENDING

Adaptive mode: **RESOLVE**.

Old `FINAL ACCUSATION` concept is revoked.

No killer-choice list.

## THE ROOM REPEATS

Pattern repeats in a way compatible with several theories.

Not uniquely Elena.

## THE PIER

Complete physical reconstruction and separate:

- physical presence
- prior knowledge
- delegated access
- decision ownership

## RESCUE / PRESERVE

High-stakes evidence/witness preservation.

Player choices determine survival of witness, physical evidence, clean custody, original record and technical corroboration.

These choices may close legal gates but never change historical truth.

## FIVE PRINCIPALS

Present maximum-strength false principal cases for:

- Kittisak
- Narin
- Adrian
- Arman
- Ika

Somchai may appear as cleaner/accomplice/conditional support.

Do not ask player to choose.

## THE LAST RECORD

Rin / Last Record provides the first evidence class none of the five false principals can fully absorb.

It must not simply say `Elena did it.`

It exposes structural contradiction across:

- sequence
- physical event
- accepted record
- who could know what when
- decision selection vs later execution

## FINAL RECONSTRUCTION

Only here may Elena become fully serious.

Minimum convergence must include several independent classes, including:

- physical/human
- chronology/decision order
- additional decision/motive/original-record support

No single clue/class is enough.

Backend states:

1. Elena convergence unavailable
2. Elena attribution supported but not prosecutable
3. Elena full convergence

## THE WEIGHT OF PROOF

Backend sequence:

1. finalize evidence/witness state
2. evaluate suspect eligibility
3. compute wrong-case prosecutable strength
4. compute Elena attribution convergence
5. compute Elena prosecutability convergence
6. apply fatal contradictions/admissibility failures
7. resolve strongest sustainable case
8. lock final route deterministically

Player sees consequence, not arithmetic.

## RECORD OR RELEASE / ENDING

Resolve:

- legal case
- public record
- institutional record
- witness fate
- North fate
- principal
- Elena fate
- false-principal consequences
- Kittisak/Somchai consequences
- Rin/Last Record consequences

---

# 22. ENDING ARCHITECTURE

Four families:

1. TRUE CONVICTION
2. RIGHT NAME, NO CASE
3. FALSE CONVICTION
4. THE PERFECT RECORD

FALSE CONVICTION mandatory variants:

- Kittisak
- Narin
- Adrian
- Arman
- Ika

Resolver order:

1. validate hidden state
2. evidence/global gates
3. legal eligibility
4. Elena attribution convergence
5. Elena prosecutability convergence
6. compare eligible strength
7. contradiction/fatal contradiction
8. ending family
9. false-principal identity if relevant
10. freeze route

No randomness.

TRUE CONVICTION requires both Elena attribution and prosecutability convergence plus clean multi-class support, chain, Last Record, chronology and physical/legal bridges.

RIGHT NAME, NO CASE means historical truth is understood but legal bridge fails through broken chain, lost original, unusable Last Record, compromised witness, missing physical/chronology bridge or inadequate corroboration.

FALSE CONVICTION means institution accepts the strongest eligible wrong case against a suspect guilty of serious wrongdoing but not the historical murders.

False-conviction tie breaks:

1. admissible corroboration breadth
2. clean chain/evidence integrity
3. motive+means+opportunity completeness
4. unresolved contradiction severity
5. human/physical corroboration
6. institutional sustainability

THE PERFECT RECORD occurs when no clean prosecution survives or an accepted wrong institutional narrative becomes too complete to reopen.

---

# 23. EVIDENCE ARCHITECTURE

Evidence classes:

1. physical
2. human witness
3. record
4. credential/permission
5. device/timestamp
6. network/route
7. tool/authorship
8. deployment
9. institutional authority
10. financial/broker
11. motive/victim-selection

Each mandatory false principal should have at least three independent classes, authentic obstruction, dark secret, plausible motive, opportunity/delegation and surviving contradiction by late Chapter VI.

Elena proof requires multiple independent classes including:

- physical/human bridge
- chronology/decision-order bridge
- at least one formerly innocuous latent clue

Do not solve the mystery with one confession, email, CCTV frame, timestamp, recording, witness statement or database row.

---

# 24. ADAPTIVE STORY RULES

Canonical progression:

- P8 = CALCULATE
- Ch V = INFLUENCE
- Ch VI = DIVERGE
- Ch VII = RESOLVE

Adaptive variation may change:

- emphasis
- follow-up dialogue
- optional scenes
- pressure target
- suspect response prominence
- evidence foregrounding
- legal theory viability

It may not change historical murderer or established physical facts to satisfy score.

Anti-snowball rule:

A leader-focused sequence must preserve competition, reveal contradiction, strengthen another suspect or add legal risk.

Prefer top-pair/top-three theory targeting over only `highestScore`.

No Elena hidden value may automatically generate early Elena screen time.

> **Story creates score consequences. Score does not invent arbitrary story facts.**

---

# 25. CHARACTER DUTY MATRIX

| Character | Phase VIII | Chapter V | Chapter VI | Chapter VII |
|---|---|---|---|---|
| Benedict | notices disclosure boundaries | rebuilds Bangkok case | manages competing theories | final reconstruction / proof consequence |
| North | detects Cooperation Paradox | hidden analyst / registrar map | telemetry / contradiction | technical Last Record reconstruction |
| Elena | ordinary low-signal | useful but not central | mundane presence / latent trace | revealed only after late synthesis |
| Kittisak | institutional anomaly seeded | major institutional suspect | strongest internal-control theory | viable false principal |
| Somchai | suspicious handling | off-book transfers | cleaner/custody suspicion | accomplice/conditional support |
| Adrian | cooperation reinterpreted | hidden architecture | Continuity Protocol conflict | viable false principal |
| Arman | controlled disclosure | deeper ledger | broker/technical principal | viable false principal |
| Narin | unresolved Bangkok layer | dominant operational suspect | deployment/motive/evasion | viable false principal |
| Ika | pre-Aster reopened | physical/travel suspicion | field-network principal | viable false principal |
| Rin | unresolved R. | introduced guarded | protected witness/registrar | Last Witness / Last Record |
| Ratchata | physical evidence | sample continuity | preservation pressure | physical contradiction |
| Cheryl | Singapore chain | admissibility | mirror preservation | original-chain authentication |
| Farid | remote verification | hidden-channel auth | telemetry/mirror integrity | original vs rewrite |
| Maya | closes Jakarta | mostly off-stage | Indonesia support if required | Jakarta chain confirmation |

---

# 26. QA / RELEASE GATE

Chapters I–IV are currently accepted for continuation, but every future Runtime release must still protect the following regression surface.

## Startup

- Splash → Title
- New Game
- Continue
- Load
- Settings
- Developer access
- North QA
- Title audio
- current build label

## Phase VIII regression surface

Disclosure Matrix exit-path maintenance checks:

- Matrix header exposes a clear `×` close control on portrait mobile
- Close never confirms, resets or advances the Matrix
- Close returns to Secure Debrief with no modal overlay remaining visible
- Resume control is visible only while the incomplete Matrix is presentation-paused
- card placements, current subject and attempt counts are unchanged across Close → Resume
- Resume reopens the same Matrix state
- Matrix completion still follows the original validator and transition path
- Save/Load while canonical stage is `matrix` remains canonical; reload may reopen the Matrix rather than persisting the temporary paused presentation
- Hidden Case snapshot is unchanged by Close → Resume alone
- dialogue geometry and Progress presentation remain byte-for-byte outside this new scoped module
- North QA may use the normal player-facing Close/Resume controls; no Owner-only data is exposed

1. DEV → Ch IV → P8
2. opening
3. Skip
4. location card
5. Debrief full-screen geometry
6. first dialogue
7. Matrix Adrian
8. Matrix Arman
9. Matrix Ika
10. theory choice
11. Arman evidence
12. Ika evidence
13. Bangkok notice
14. Bangkok choice
15. registrar evidence
16. closing debrief
17. Departure
18. NORTH · REMOVED readability
19. Departure reaches 100% before takeoff
20. Takeoff has no phase progress UI
21. takeoff video unobstructed
22. route card after natural end/Skip
23. Complete
24. Return Title
25. Phase VIII audio stops
26. Title audio restores

## Save/Load

- manual Save inside P8
- Load inside P8
- P7 completion → P8
- Matrix persistence
- evidence persistence
- North removal persistence
- R. lead persistence
- Restart Current
- Return Title
- no hidden-score duplication

## Audio

- Investigation C4P8 starts with opening
- location continuity
- dialogue duck
- Matrix duck
- evidence/choice duck
- crossfade to Departure C4P8
- Departure
- takeoff
- Complete
- background pause with no audible/temporal advance
- remain backgrounded long enough for phase/minigame timers to fire; no timer may reawaken audio
- foreground resume from preserved position automatically without extra tap
- P7 normal scene background → foreground
- P7 minigame/evidence state background → foreground where applicable
- P8 normal Debrief background → foreground
- P8 Matrix open background → foreground
- P8 Matrix presentation-paused / Resume visible background → foreground
- phase transition while backgrounded must not resurrect foreign phase audio
- Return Title stop/restore
- physical Android Chrome final acceptance

## Portraits

Inspect every P8 expression actually used for Maya, Cheryl, North, Benedict and Farid.

No white matte, bad crop or half-head.

## Owner Hidden Case Inspector

Verify:

- owner-only visibility
- visual suspect presentation
- status bars
- synthetic `− / +`
- Reset to Live State
- no canonical ledger mutation
- no Save mutation
- no autosave from synthetic adjustment
- closing/reopening returns to live state
- North QA cannot access it

## Owner Walkthrough Mode

Verify:

- button appears only in Owner Developer tools
- Chapter I–IV catalog opens
- `SYNC TO GAME` follows the active context without changing state
- deterministic minigames show the Production-correct solution
- narrative choices display `NO FAILURE PATH` where appropriate
- Hint and Show Solution are presentation-only
- Prev/Next and Chapter/Phase browse do not alter gameplay
- Minimize/restore does not interrupt gameplay or audio
- closing the Walkthrough changes no gameplay state
- no Save/autosave action from Walkthrough
- no Hidden Case mutation
- North QA cannot see or open Walkthrough

## Mobile viewports

At minimum:

- 360×740
- 375×812
- 390×844
- 412×915
- 430×932

Check:

- footer clipping
- safe-area
- route card
- portrait framing
- progress
- horizontal overflow
- primary-button reachability
- Owner Inspector controls where relevant

## Build linkage

Settings, Owner Dev, North QA, Developer Navigation, Runtime Build Label, global Runtime build, document dataset build, save metadata where applicable, bootstrap generation, changed-module cache keys and expected-version checks must all agree with the intended release identity. Any affected mismatch is a RELEASE BLOCKER, not a cosmetic defect.

## Hidden secrecy

Normal UI/North QA must not expose scores, deltas, routes, projected endings, Elena gates or ending simulator.

---

# 27. CURRENT PRODUCTION STATUS AT THIS REVISION

Current authoritative Runtime: **0.22.7**.

Latest inspected Production runtime-code/maintenance HEAD before this documentation-only handoff update:

`4034fc263a75118f143e8ce6d1d908ff5598c33d`

Message:

`Fix P7 P8 background audio lifecycle`

Parent:

`aa2ecddd2ad3a05f1d1b9b03a47bd28c354b8509` — `Add P8 matrix close and resume`

After the owner uploads this Master Plan, repository HEAD will advance to that documentation-only commit. Treat `4034fc...` as the latest verified runtime-code/maintenance baseline recorded by this handoff unless current Production inspection shows later code.

Relevant recent history:

- `a3490e895a6147e2e675b5c392d3f5fb317d0977` — `Fixed cached startup repaire loader`
- `f40746a066ece657f85808fae10e36c4f5a07e8a` — `Update master plan for room handoff`
- `7fccff4ebc9ee4e1eca6b5735febb196b985940b` — `Fix C4P8 defects and sync runtime 0.22.1`
- `42a677a4e84132bb19d4f58dd5b1d8cd607e46c3` — `Fix P8 portraits and owner case inspector`
- `05007557d2972df80cf8e615f5e4a7e32ba2059e` — `Accept Chapters I-IV and advance to Chapter V`
- `88bb3bf3fea7af3fe823331556d0e29afad8d67b` — `Add owner walkthrough and sync runtime 0.22.3`
- `ff378fc981c7b7a68305953b3ddf4b0be1b4b24f` — `Lower Chapter IV dialogue and sync 0.22.4`
- `80c6b5c5189141c83887b81733ac6ee459a8c7d3` — `Keep Chapter IV progress visible in dialogue`
- `5e2dadb9faedbd86e26cdbe446e7e31d9de99381` — `Restore pre-dialogue layout baseline 0.22.6`
- `aa2ecddd2ad3a05f1d1b9b03a47bd28c354b8509` — `Add P8 matrix close and resume`
- `4034fc263a75118f143e8ce6d1d908ff5598c33d` — `Fix P7 P8 background audio lifecycle`

Current modules / presentation state:

- Runtime: `0.22.7`
- Phase VIII core: `0.22.2` (unchanged independent module)
- Developer Navigation: `0.22.7-d1`
- North QA: `0.22.7`
- Runtime Build Label: `0.22.7`
- Owner Walkthrough: `0.22.3-w1` (unchanged independent Owner-only module)
- Hidden Case engine: `0.21.0`
- Phase VIII Matrix Exit: `0.22.7-m1`
- P7/P8 Audio Lifecycle maintenance: `0.22.7-a1`
- Chapter IV dialogue/progress presentation: restored to Runtime `0.22.3` behavior; `css/chapter-04-dialogue-positioning.css` inert and not loaded
- Dialogue geometry: frozen across accepted Chapters I–IV unless reproducible unusability or explicit owner redesign request

Canonical runtime rules:

- **Use the direct core implementation. Do not re-enable the reverted repair loader.**
- **Do not revive Runtime 0.22.4–0.22.5 dialogue/progress overrides.**
- **Do not let any active phase audio continue/reawaken while the app/browser is backgrounded.**
- **Do not redesign established interface shells in Chapters V–VII; clone proven structure and change only content payload/internal logic.**

## Owner Android acceptance snapshot

Physical Android Chrome is the highest acceptance authority. Current owner-confirmed state:

- P8 Matrix Close → Secure Debrief → Resume: accepted
- Matrix placements/attempts survive Close → Resume: accepted
- P7 background audio pauses: accepted
- P7 foreground audio resumes automatically from the prior position without extra interaction: accepted
- P8 background audio remains paused: accepted
- P8 Matrix Exit no longer reawakens background audio: accepted
- P8 foreground audio returns appropriately: accepted

These confirmations close the currently reported Matrix-exit and P7/P8 audio-lifecycle defects.

## Chapters I–IV current status

The owner has completed a practical current-pass review using Developer Mode jumps / real-device spot checks and considers Chapters I–IV acceptable to continue development.

Status:

- Chapter I: accepted for current continuation
- Chapter II: accepted for current continuation
- Chapter III: accepted for current continuation
- Chapter IV: accepted for current continuation
- Phase VIII: owner-accepted current pass
- current P7/P8 audio lifecycle defect: closed on physical Android
- future reproducible defects: repair surgically when actually observed
- optional speculative polishing: do not reopen accepted systems by default

This is the active handoff state.

---

# 28. IMMEDIATE NEXT-ROOM PRIORITY

**Begin Chapter V Phase I.**

Do not require another Chapter IV acceptance loop before starting Chapter V unless the owner reports a new reproducible defect.

Sequence:

1. read this Master Plan
2. inspect current Production when current repo truth matters
3. use Runtime `0.22.7`, restored pre-adjustment presentation, P8 Matrix Exit `0.22.7-m1` and accepted Audio Lifecycle `0.22.7-a1` as the baseline
4. treat Chapters I–IV as accepted maintenance-locked content
5. preserve Chapter IV final evidence/flags/state
6. begin `CHAPTER V · PHASE I · RETURN TO BANGKOK` without another Chapter IV redesign cycle
7. follow Chapter V canonical structure and INFLUENCE adaptive model
8. before building each UI surface, inspect and clone the closest accepted shell; change only content/internal payload unless the owner explicitly authorizes structural redesign
9. write Thai and English dialogue as independent native cinematic subtitle performances with locked character voices and identical investigative meaning
10. apply background-audio zero-tolerance lifecycle behavior proactively to every new continuous-media phase
11. preserve Hidden Case determinism, spoiler secrecy and Owner/North separation
12. synchronize every Runtime build endpoint on any future Runtime release
13. if a genuine older-chapter defect appears later, isolate and repair only that reproducible defect
14. do not reopen accepted content for optional redesign unless the owner asks

### Maintenance rule for Chapters I–IV

A later defect report does **not** mean Chapters I–IV return to “unaccepted” status globally.

Treat it as:

`accepted baseline + isolated maintenance defect`

unless the defect proves a wider regression.

---

# 29. PROHIBITED SHORTCUTS

Do not:

- reveal Elena in Ch IV/V
- make Elena dominant in Ch VI
- name a pre-reveal phase after Elena
- use gendered unknown-principal language
- treat cooperation as innocence
- treat role separation as exoneration
- clear Ika because Aster hired her later
- clear Arman because he made only a tool
- clear Adrian because architecture was lawful
- clear Kittisak because he is authority
- clear Somchai because he follows orders
- make Narin harmless
- create fake evidence solely to frame innocents
- make Elena micromanage every reaction
- make every suspect obstruct the same way
- solve the mystery with one clue
- make Rin an exposition machine
- use visible relationship as murderer score
- create final killer-selection UI
- rewrite accepted Chapters I–IV for scoring convenience
- create Ch IV Phase IX without approval
- invent a new normal UI shell when a proven one fits
- add square-symbol phase-card decoration without approval
- override proven screen geometry casually
- add broad repair MutationObservers
- resurrect reverted P8 repair loader
- call mocked media a real playback test
- release mismatched Build labels
- claim Android acceptance without Android
- expose Owner Hidden Case simulation controls to North QA
- expose Owner Walkthrough, hints or verified solutions to North QA
- let Walkthrough mutate gameplay, Save, Hidden Case, checkpoints, evidence, choices or audio
- use Walkthrough auto-completion as evidence that a gameplay path actually works
- let synthetic Owner Inspector values write canonical case state
- reopen accepted Chapters I–IV for speculative polish without owner request
- redesign established Chapter V–VII normal UI shells without explicit owner approval
- treat existing UI as loose inspiration instead of a structure to reuse
- alter dialogue geometry to solve a Progress/HUD issue
- allow any timer/controller to replay phase media while hidden/backgrounded
- require a player tap merely to resume continuous score after returning to foreground
- ship Thai or English dialogue that is literal, stiff, translator-like, non-native or character-generic
- give Elena suspiciously loaded wording, villain cadence or meta-foreshadowing before late Chapter VII

---

# 30. MASTER QUALITY STANDARD

The mystery from Phase VIII through Chapter VII should feel:

**nearly impossible before reconstruction, disturbingly inevitable afterward.**

Desired emotional sequence:

1. rejection
2. disorientation
3. recognition
4. inevitability
5. replay aftershock

Every major phase from Phase VIII onward must:

- advance at least one strong non-Elena theory
- preserve or strengthen another
- plant/preserve/reinterpret a future evidence dependency
- avoid increasing Elena visible suspicion beyond allowed stage

The smartest visible characters may correctly identify architect, toolmaker, deployer, violent operator, institutional gatekeeper, cleaner and registrar and still miss the Decision Owner.

Canonical final idea:

> **Elena built a crime in which the evidence told the truth about almost everyone except the question that mattered most.**

---

# 31. FINAL NON-NEGOTIABLE SUMMARY

- Owner physical Android evidence is highest authority.
- Current authoritative Runtime is `0.22.7`.
- Latest inspected runtime-code/maintenance HEAD before this documentation-only handoff is `4034fc263a75118f143e8ce6d1d908ff5598c33d` — `Fix P7 P8 background audio lifecycle`.
- A later documentation-only Master Plan commit may advance GitHub HEAD without changing that runtime-code baseline.
- P8 Matrix Exit `0.22.7-m1` is owner-accepted.
- P7/P8 Audio Lifecycle `0.22.7-a1` is owner-confirmed PASS on physical Android.
- Background/minimized phase audio must remain paused; foreground continuous audio must resume automatically from the correct prior position without unrelated user interaction. Apply this proactively to Chapters V–VII.
- Chapters I–IV are owner-accepted for current continuation after practical Dev Mode Jump / real-device review.
- Acceptance is not a claim of exhaustive defect-free E2E coverage.
- Later reproducible defects in Chapters I–IV may be repaired surgically without reopening the whole accepted baseline.
- Chapter IV has exactly 8 phases. No Phase IX without explicit owner approval.
- Chapter IV final story state is frozen for continuation.
- Immediate story objective is `CHAPTER V · PHASE I · RETURN TO BANGKOK`.
- Chapters V–VII must preserve the established LAST WITNESS Interface/UI identity **exactly**: inspect the closest proven Production structure, reuse its shell, and change only content/internal payload unless the owner explicitly authorizes structural redesign.
- Existing normal UI is an implementation contract, not loose design inspiration.
- Do not independently alter established dialogue geometry, HUD, Progress geometry, topbar, cards, typography hierarchy, button language, safe-area behavior or normal transition language.
- Runtime `0.22.6` restored dialogue/progress presentation to the pre-adjustment Runtime `0.22.3` behavior. Runtime `0.22.4–0.22.5` presentation experiments are retired.
- Dialogue geometry across the accepted Chapters I–IV baseline is frozen unless a reproducible unusable defect or explicit owner request justifies change.
- If Progress is repaired later, do not move Dialogue to solve it; isolate the HUD/Progress fix and audit comprehensively.
- Do not add novelty square-symbol cards or arbitrary decorative UI.
- Minigames may be bespoke internally but must remain visibly/behaviorally LAST WITNESS and provide sane exit/resume behavior where appropriate.
- Do not casually override global screen geometry.
- Do not use broad repair MutationObservers.
- Do not resurrect the reverted P8 repair loader.
- Build identity must synchronize across index/bootstrap/Settings/Dev/North QA/Runtime Label/save-facing metadata whenever the base Runtime changes.
- Build linkage is atomic and zero-tolerance: one affected mismatch blocks release. Never package/upload first and synchronize labels/Dev/North later.
- Owner Developer Mode and North QA are mandatory release endpoints and must be explicitly validated independently on every affected release.
- Every changed shipped module must use a fresh cache key/loader generation and matching expected-version check where applicable; stale cache/version linkage is a release blocker.
- Scoped maintenance under an unchanged base Runtime is allowed only when explicitly classified, uniquely versioned/cached, documented and free of visible/base-build mismatch.
- After owner upload, verify current Production HEAD and landed build-facing files before treating the release as canonical.
- Thai and English dialogue must each be native, cinematic, speakable and character-specific, like premium crime-series subtitles. Never use literal/translator-like copy.
- Thai and English may differ naturally in wording/line breaks, but must preserve the same facts, subtext, emotional temperature and investigative meaning.
- Unknown-principal language remains gender-neutral until canon permits otherwise.
- Elena must never receive suspicious wording, ominous framing or unnatural prescience before late Chapter VII.
- Relationship system remains separate from criminal attribution.
- Hidden Case is deterministic, auditable, idempotent and player-invisible.
- Owner Hidden Case Inspector synthetic controls are temporary and never mutate canonical ledger/Save state.
- Owner Walkthrough `0.22.3-w1` is Owner-only/read-only and covers Chapter I through Chapter IV Phase VIII.
- Deterministic Walkthrough solutions come from actual Production validators; non-failing choices must be labeled accordingly.
- North QA never sees hidden scores/routes/gates, ending projections, Elena gates, Owner simulation controls or Owner Walkthrough content.
- Player never chooses a killer from a final list.
- Five mandatory false principals: Kittisak, Narin, Adrian, Arman, Ika.
- Somchai remains strongly suspicious cleaner/accomplice/conditional support.
- Rin is `R.` / future Last Witness but is not named in Chapter IV.
- Elena is historical murderer/mastermind/Decision Owner in every route.
- Elena remains low-signal through Chapter V, below principal false theories in Chapter VI and becomes fully serious only in late Chapter VII synthesis.
- Elena true conviction requires attribution + prosecutability convergence with multiple independent evidence classes.
- Alternate endings alter what the investigation can prove/sustain, never historical truth.
- P8 = CALCULATE; Ch V = INFLUENCE; Ch VI = DIVERGE; Ch VII = RESOLVE.
- No retcon merely to rescue weak plotting.
- No single clue solves the mystery.
- No single ordinary choice decides the ending.
- Every ending must be traceable to the full investigation.
- Accepted content is maintenance locked, not permanently immune from future reproducible defect repair.
- New rooms must not ask the owner to repeat any decision already locked in this Master Plan.

This is the canonical zero-question continuation contract from the owner-accepted Chapters I–IV Production baseline into Chapter V and through Chapter VII final resolution. Read it before implementing, inspect current Production when repo truth matters, preserve the proven product language, and ask the owner only when a genuinely new creative/product decision is required.
