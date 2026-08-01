# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-08-02 01:57 ICT
> **Replaces planning blob:** `8b9ee62eb8ba0f2d193c14c6592f5756a4390ed3`
> **Repository:** `grolygori789-crypto/last-witness`
> **Production and Default branch:** `production-rebuild`
> **Owner-approved runtime baseline commit:** `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
> **Owner-confirmed playable baseline:** `CHAPTER IV · PHASE III COMPLETE`
> **Latest owner-approved runtime build:** `0.16.4`
> **Latest owner-approved narrative module:** `CHAPTER IV · PHASE III · 0.16.3`
> **Current legitimate endpoint:** `CHAPTER IV · PHASE III COMPLETE -> NEXT: THE MAN BEHIND THE ALIAS`
> **Immediate next production target:** `CHAPTER IV · PHASE IV - THE MAN BEHIND THE ALIAS`
> **Baseline status:** `OWNER-TESTED · OWNER-APPROVED · FROZEN UNTIL DIRECT OWNER INSTRUCTION`
>
> Runtime commit `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f` is the current owner-approved code and asset baseline. The previous frozen runtime commit `ffdc94777c5fbaefdc281f1148b59aff3adf8abe` remains historical evidence of the approved Phase II boundary but is no longer the current playable baseline.
>
> Uploading this planning document will create a later documentation-only commit. That later commit must not be interpreted as a new runtime build unless code or assets are included and separately approved.
>
> GitHub runtime on `production-rebuild` is the Source of Truth for code, assets, paths, cache queries and load order. This file is the Source of Truth for Canon, owner-confirmed acceptance, owner-level secrets, workflow, technical governance, future architecture and the exact continuation point for a new chat.

---

# 0. EXECUTIVE ZERO-EXPLANATION HANDOFF

## Project identity

- Game: **LAST WITNESS**
- Studio: **BENEDICT INTERACTIVE**
- Repository: `grolygori789-crypto/last-witness`
- Production branch: `production-rebuild`
- Default branch: `production-rebuild`
- Live game: `https://grolygori789-crypto.github.io/last-witness/`
- Planning filename: `GAME_MASTER_PLAN.md`
- Platform: mobile-first browser game
- Primary browser: Chrome
- Primary owner test platform: Android Chrome
- Primary orientation: portrait 9:16
- Genre: Narrative Detective Adventure / Interactive Crime Investigation
- Art direction: neo-noir graphic novel, cel-shaded, heavy ink, angular shadows, cinematic crime-adventure and readable on mobile

## Current approved state

The owner has played the live game on Android Chrome through the complete Chapter IV Phase III endpoint and approved the result.

Approved playable content:

1. Chapter I complete
2. Chapter II complete
3. Chapter III complete
4. Chapter IV Phase I complete
5. Chapter IV Phase II complete
6. Chapter IV Phase III complete

Current endpoint:

- `CHAPTER IV · PHASE III COMPLETE`
- `PACKET TRAIL RECONSTRUCTED`
- `NEXT · THE MAN BEHIND THE ALIAS`

Immediate next target:

- `CHAPTER IV · PHASE IV`
- `THE MAN BEHIND THE ALIAS`

## Current accepted build chain

- Chapter IV Phase I module: `0.13.2`
- Chapter IV Phase II module: `0.14.9`
- Chapter IV Phase II portrait guard: `0.15.0`
- Chapter IV Phase III module: `0.16.3`
- Chapter IV Phase III CSS content header: `0.16.2`, loaded with cache query `v=0163`
- Runtime bootstrap: `0.16.4`
- Production commit: `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`

## Owner-confirmed resolved defect

The Jakarta Character Journal profile-switching failure is resolved.

Exact former failure:

1. Use Developer Mode to unlock all characters.
2. Enter Chapter IV Phase II or the Jakarta runtime.
3. Open Maya's profile.
4. Return to the Character grid.
5. Attempt to open another character.
6. The other profile failed because Maya's custom detail DOM did not preserve the base Character Journal detail contract.

Root cause:

- Maya's custom detail shell lacked:
  - `data-detail-name`
  - `data-detail-status`
  - `data-detail-metrics`
  - `data-detail-notes`
- The base Character Journal reused the shell and then received null targets.
- The resulting JavaScript failure prevented later character profiles from opening.

Approved fix:

- Added the four required detail markers to Maya's custom profile shell.
- Bumped Phase II module from `0.14.8` to `0.14.9`.
- Bumped bootstrap from `0.16.3` to `0.16.4`.
- Did not modify the central Character registry, Chapter I gate, Chapter II unlock timing or Dev Unlock semantics.

Owner result:

- Profile switching after Maya now works.
- Chapter IV Phase III completes.
- The project is ready to proceed to Phase IV.

## Absolute freeze rule

The owner-approved runtime through Chapter IV Phase III must not be changed without direct owner instruction.

Do not:

- restore to another commit
- move the branch reference
- create or delete branches
- merge or rebase
- edit approved Chapter I, II or III runtime
- edit approved Chapter IV Phase I, II or III without a scoped owner request
- replace approved assets
- modify GitHub Pages settings
- change Default Branch
- add a repair layer, listener, observer, timer or global state mutation without proof
- rewrite Character gates while repairing a scene-local defect
- infer approval for Phase IV code or assets before its blueprint is approved

A request to inspect, plan, explain or create a local file is not permission to modify GitHub.

## Immediate production order

1. Preserve the approved Chapter I through Chapter IV Phase III runtime.
2. Read this file from beginning to end.
3. Inspect current Production files and load order.
4. Design Phase IV around the broker handle and the physical Arman encounter.
5. Obtain owner approval of the Phase IV implementation and asset blueprint.
6. Implement Phase IV locally with the smallest safe scope.
7. Test Save/Load, Character Journal, Case File, audio, Developer Mode and Phase III to IV handoff.
8. Deliver a ZIP for owner upload.
9. Do not write to GitHub without explicit current-turn authorization.
10. Owner Android Chrome testing remains the final acceptance gate.

## Core investigative principle

> **A valid credential proves access, not identity.**

Always separate:

1. what physically happened
2. what records claim happened
3. which credential, role or permission the system accepted
4. which device, timestamp or route an event claimed
5. who physically operated the system
6. who authored a tool
7. who adapted or brokered the tool
8. who deployed the tool
9. who selected the victim, room and timing
10. who owned the final decision

Never collapse these layers into one person without corroborated evidence.

---

# 1. OWNER COMMUNICATION AND WORKING STYLE

- Address the owner as **พี่เบนซ์**.
- Refer to the assistant as **บิ๊ว**.
- Use a feminine Thai voice.
- Use direct, natural Thai.
- Do not make the owner repeat facts already stored here.
- Do not pretend uncertainty is certainty.
- Do not call a static check an Android test.
- Do not claim success until the owner tests the build.
- Do not claim a file exists before it has actually been created.
- Do not call an attempted command or proposed script a completed deliverable.
- Keep the owner informed during long tasks.
- Report permission, filesystem, connector and runtime limitations immediately.
- After a failed method, diagnose the cause before trying again.
- After two failures of the same approach, stop and switch methods.
- Do not leave the owner waiting without a concrete artifact.
- Never say Production is safe unless the relevant behavior has been verified.
- Distinguish code evidence, simulated testing, browser testing and owner-device testing.
- Do not repeatedly promise that a defect is fixed without reproducing the exact owner sequence.
- When a bug is sequence-dependent, test the same sequence in the same order.

## Mandatory efficiency discipline

For every task:

1. identify the smallest real problem
2. read this entire file
3. inspect current GitHub Production files
4. inspect the actual implementation owner
5. patch the minimum number of files
6. prefer a direct deterministic fix over fragile automation
7. treat owner-supplied images as references unless replacement is explicitly requested
8. solve CSS defects in CSS before regenerating assets
9. do not touch working characters while repairing another character
10. do not regenerate approved art without direct instruction
11. produce the artifact before claiming completion
12. include QA evidence and exact testing limits
13. avoid broad searches or rebuilding when a local edit is enough
14. do not let visual appeal override identity, story function, anatomy or project tone
15. do not create speculative files before the blueprint is approved
16. reproduce the reported defect before modifying code whenever the environment permits
17. verify the defect is absent after the patch using the same route
18. verify nearby frozen behavior did not change

---

# 2. GITHUB OWNERSHIP AND DELIVERY RULE

For normal code, asset and planning work:

- the owner uploads Production files personally
- work locally
- preserve repository-relative paths
- do not push
- do not commit
- do not create or delete branches
- do not move refs
- do not modify GitHub Pages
- do not change repository settings
- do not delete repository files

A direct GitHub write is allowed only when the owner explicitly authorizes that exact write in the current conversation.

## Planning-document rule

This file is a local replacement for `GAME_MASTER_PLAN.md`.

Current replacement facts:

- previous planning blob: `8b9ee62eb8ba0f2d193c14c6592f5756a4390ed3`
- current owner-approved runtime commit: `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
- this upload should be documentation-only
- the docs-only commit must not be treated as a runtime change

## Required implementation package

Every code package must contain:

- one ZIP
- preserved repository paths
- changed-file manifest
- installation instructions
- test report
- SHA-256
- exact statement of what was tested
- exact statement of what was not tested
- base branch and base commit
- changed-file count
- no unrelated files
- a clearly displayed **Suggested Commit Name**
- the same Suggested Commit Name inside the installation document
- a commit name of no more than 50 characters when the owner platform enforces that limit

## Planning-document delivery

- filename must remain exactly `GAME_MASTER_PLAN.md`
- preserve Canon and owner secrets
- preserve proof boundaries and future plans
- preserve owner-accepted runtime facts
- record proposed, implemented and owner-approved status separately
- include local SHA-256
- never upgrade a proposal into accepted implementation status without owner confirmation

---

# 3. SOURCE-OF-TRUTH HIERARCHY

1. **Owner's latest real-device result**
   - final truth for visible and playable behavior
   - overrides static assumptions
   - current result: Chapter I through Chapter IV Phase III passed and was approved
   - current profile-switching result: passed after opening Maya and then other characters

2. **Approved GitHub runtime baseline**
   - branch: `production-rebuild`
   - runtime commit: `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
   - code, assets, paths, cache queries and load order

3. **Latest `GAME_MASTER_PLAN.md`**
   - Canon
   - owner-confirmed acceptance
   - owner-level secrets
   - unresolved mysteries
   - future chapter design
   - workflow
   - ending architecture
   - exact handoff

When sources conflict:

- inspect all relevant sources
- identify which source is stale
- do not rewrite Canon to match a defect
- do not break accepted runtime to match obsolete planning text
- ask only when available evidence cannot resolve the conflict
- never silently choose an older branch or old ZIP
- owner real-device behavior wins over a harness assumption

---

# 4. CURRENT VERIFIED PRODUCTION SNAPSHOT

Verified and owner-approved on 2026-08-02.

## Repository state

- Repository: `grolygori789-crypto/last-witness`
- Production branch: `production-rebuild`
- Default branch: `production-rebuild`
- Branch count after cleanup: one Production branch
- Deleted obsolete branch: `main`
- Current owner-approved runtime commit: `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
- Historical Phase II baseline: `ffdc94777c5fbaefdc281f1148b59aff3adf8abe`
- Live owner result: playable through Chapter IV Phase III

## Acceptance commit chain

1. `9d2219b306ae939c4f15468aab90ff787cc01e88`
   - `Redesign Phase III packet trail and localization`
   - introduced the approved Phase III reconstruction flow

2. `1407e22ff436fe90ed11ace9062ce3cc37781707`
   - `Fix Jakarta Journal and remote speaker labels`
   - added scene-local Farid remote labeling and Jakarta Journal work

3. `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
   - `Fix Maya profile switching in Jakarta`
   - fixed the Maya-to-other-profile switching defect
   - current approved runtime baseline

## Important file snapshot

| Path | Blob SHA | Current role |
|---|---|---|
| `GAME_MASTER_PLAN.md` before this replacement | `8b9ee62eb8ba0f2d193c14c6592f5756a4390ed3` | previous planning source |
| `index.html` | `e30f3fb1f20399d51de9aba220802361a5da15d9` | static DOM and static load order |
| `js/engine/06-content-registry-dev.js` | `e404cc2c2c47dac9bca12e54874c4e6ee1e1d4f2` | authoritative Journal/Case File/Dev registry |
| `js/engine/14-character-canon.js` | `b05c41572c7c4f2d27a4d180dc3225dc72c50c95` | canonical Character Journal mutation |
| `js/chapters/chapter-02/05-chapter2-integration.js` | `a90af7d17259d54e7525c6d574edc12455c63b23` | Chapter III loader and legacy integration |
| `js/chapters/chapter-04/01-afterimage.js` | `b61d3e8a9e118e9437b8bdf5eb5cb0a9b99c1df2` | Chapter IV Phase I |
| `css/chapter-04-phase-02.css` | `16d08f45f1a2b336c96cc70d03086f7b6f379062` | accepted Jakarta layout and Maya visual rules |
| `js/chapters/chapter-04/02a-jakarta-portrait-guard.js` | `218a2abaa0dcab60c2f3764877e910959f74285c` | deterministic Cheryl/Farid portrait fill |
| `js/chapters/chapter-04/02-jakarta-arrival.js` | `fcced27af919a1e5b352a5b25281ed4b98a6b8f2` | Phase II module 0.14.9 and Maya Journal extension |
| `css/chapter-04-phase-03.css` | `bd58144584ddd961bcc0d29c690c9b2e10559f51` | Phase III mobile-first UI |
| `js/chapters/chapter-04/03-packet-provenance.js` | `83b9d2e123e212e48e063859de93881edbb1fd5a` | Phase III module 0.16.3 |
| `js/engine/09-defect-hotfix.js` | `3beb573b4201846ddc8594ec02a4b6dc33221e8e` | runtime bootstrap 0.16.4 |

## Runtime build distinction

- Chapter IV Phase I: `0.13.2`
- Chapter IV Phase II: `0.14.9`
- Phase II portrait guard: `0.15.0`
- Thai localization: `0.15.2`
- Targeted QC: `0.15.3`
- Police portrait alignment: `0.15.4`
- Chapter IV Phase III: `0.16.3`
- Runtime bootstrap: `0.16.4`
- Legacy Chapter II/III integration may still display `0.12.1`

Do not interpret the legacy visible Settings label as the actual playable boundary. Do not change it casually.

## Owner-confirmed acceptance

The owner played and accepted:

- Chapter I
- Chapter II
- Chapter III
- Chapter IV Phase I
- Chapter IV Phase II
- Chapter IV Phase III
- Chapter I has no premature Character mode
- Character Mode begins in Chapter II according to the original accepted gate
- Developer Unlock All does not replace the Chapter I/II visibility rules
- Phase II story, choices and Token Verification
- Maya final portrait and Character Journal presentation
- original dark navy Maya suit
- pure black Maya portrait background
- visible Maya bob-hair silhouette
- accepted Maya scale and visual weight
- Farid remote-from-Singapore labeling
- Farid remote suffix shown in blue while the name remains in normal speaker color
- Phase III Evidence Review
- Phase III step-by-step Packet Trail reconstruction
- Phase III lawful next-lead selection
- Phase III completion and handoff to `THE MAN BEHIND THE ALIAS`
- Maya-to-other-character profile switching after the 0.16.4 fix
- Return to Title
- live game access after branch and Pages recovery

## Frozen playable boundary

> `CHAPTER IV · PHASE III COMPLETE`

Next narrative card:

> `NEXT · THE MAN BEHIND THE ALIAS`

No owner-reported blocking defect remains at the approved endpoint.

---

# 5. CURRENT LOAD ORDER

## Static CSS from `index.html`

1. `css/style.css`
2. `css/forensic-phase.css`
3. `css/medical-examiner.css`
4. `css/investigation-lifecycle.css?v=0711`
5. `css/fullscreen-display.css?v=0802`
6. `css/chapter-03-phase-04.css?v=0930`

## Static JavaScript

The static chain is order-sensitive. It includes:

1. runtime data
2. audio and Save
3. Journal and progress
4. UI and dialogue
5. Developer tools
6. Chapter II modules
7. Chapter I module
8. regression and continuity layers
9. Chapter II integration
10. content registry and Character Canon
11. investigation lifecycle
12. fullscreen owner
13. Production stabilization
14. compatibility bootstrap

Do not reorder without a complete audit.

## Dynamic Chapter III order

1. `js/chapters/chapter-03/01-title-phase1.js`
2. `js/chapters/chapter-03/02-changi-airport.js`
3. `js/chapters/chapter-03/03-singapore-office.js`
4. `js/chapters/chapter-03/04-marina-bay.js`
5. `js/chapters/chapter-03/05-serviced-apartment.js`
6. `js/chapters/chapter-03/06-hawker-centre.js`
7. `js/chapters/chapter-03/07-digital-forensics-lab.js`
8. `js/chapters/chapter-03/08-callback.js`

## Current dynamic Chapter IV bootstrap

`js/engine/09-defect-hotfix.js` Build `0.16.4` loads:

1. `js/engine/15-thai-localization.js?v=0152`
2. `js/engine/16-targeted-qc-fixes.js?v=0153`
3. `js/engine/17-police-portrait-alignment.js?v=0154`
4. `js/chapters/chapter-04/01-afterimage.js?v=0132`
5. `css/chapter-04-phase-02.css?v=0149`
6. `js/chapters/chapter-04/02a-jakarta-portrait-guard.js?v=0150`
7. `js/chapters/chapter-04/02-jakarta-arrival.js?v=0164`
8. `css/chapter-04-phase-03.css?v=0163`
9. `js/chapters/chapter-04/03-packet-provenance.js?v=0163`

The bootstrap currently ends at Phase III.

## Future Phase IV load-safety lock

A future Phase IV module must not repeat any prior startup-state regression.

Mandatory rules:

- module definition and preload must be side-effect-free
- loading a script must not set `state.chapter = 4`
- loading a script must not set an active Phase IV screen
- loading a script must not unlock Arman
- loading a script must not unlock Character mode
- initialization may create isolated defaults only when entering or resuming Phase IV
- global story chapter changes only through real entry, resume or Developer jump
- Chapter I must continue to hide Character mode
- Chapter II must continue to reveal Character mode at its original accepted timing
- Character Journal gates must use actual story progress and explicit unlock state
- the Phase III completion screen must not be hidden or rerouted merely because Phase IV code loaded

Do not add Phase IV to the global bootstrap until startup behavior is proved safe.

---

# 6. NON-NEGOTIABLE STARTUP PROCEDURE

Before editing any Production file:

1. read this entire file
2. confirm `production-rebuild`
3. confirm runtime baseline `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
4. fetch latest `index.html`
5. fetch current file SHAs
6. inspect static and dynamic load order
7. fetch every runtime file involved in the task
8. inspect current assets involved in the task
9. inspect global overrides
10. inspect direct, capture and bubbling listeners
11. inspect MutationObservers and timers
12. inspect state initialization and migration
13. inspect Save/Load restore
14. inspect audio ownership
15. inspect Character Journal and Case File gates
16. inspect Developer Mode
17. identify the true implementation owner
18. reproduce the reported defect where possible
19. prove the root cause
20. patch the fewest files possible
21. run syntax and static checks
22. test the affected flow where the environment permits
23. test the exact owner sequence for sequence-dependent defects
24. state exact testing limits
25. deliver locally unless a specific GitHub write is authorized

Never patch from:

- memory alone
- an old ZIP
- an old chat attachment
- an obsolete branch
- a detached historical commit
- a reconstructed imitation of a current runtime file
- an old Phase III package

---

# 7. RUNTIME OWNERSHIP MAP

## Base and shared systems

### `01-runtime-data.js`

Owns:

- base state
- localization
- base portraits
- clues
- base audio references
- shared globals
- legacy Save keys

### `02-audio-save.js`

Owns:

- Auto Save
- named saves
- IndexedDB slots
- localStorage fallback
- `.lwsave` export and import
- delete and restore
- legacy migration
- base volume controls

### `04-ui-dialogue.js`

Owns base:

- `show(screen)`
- screen transitions
- chapter intro
- base dialogue
- some evidence behavior

### `06-regression-fixes.js`

Active ownership:

- global `runDialogue` override
- live TH/EN dialogue
- history
- Police evidence repair
- Case File repair
- Save-button rebinding

### `07-dialogue-continuity.js`

Owns normalized:

- `TAP TO CONTINUE`
- `แตะเพื่อดำเนินต่อ`

Do not add another prompt observer.

### `08-stability-repair.js`

Owns:

- immediate UI click
- pointerdown response
- duplicate touch suppression
- legacy stability repairs
- dynamic Production-stabilization loading

### `11-production-stabilization.js`

Primary shared audio owner for:

- scene-aware ambience
- early chapter audio
- evidence cue
- puzzle cue
- scanner cue
- ducking
- one-shot cleanup
- stale-state repair

Shared APIs include:

- `LastWitnessAudioCue.playInspection`
- `LastWitnessAudioCue.playPuzzleSuccess`
- `LastWitnessProductionAudio.refresh`

Do not create another global audio manager.

### `12-investigation-lifecycle.js`

Owns narrative-first lifecycle:

- dialogue before hotspots
- review gating
- puzzle gating
- no polling
- no unnecessary observers

### `13-fullscreen-display.js`

Owns:

- fullscreen
- Settings and menu controls
- Save Manager in fullscreen root
- Exit Game
- browser-safe fallback

### `06-content-registry-dev.js`

Authoritative owner for:

- Character Journal
- Case File registry
- story gates
- unread arrays
- red dots
- Character Cards
- Developer unlocks
- stale filtering
- persistence

Storage key:

`lastWitness.contentRegistry.v3`

### `14-character-canon.js`

Canonical Character Journal mutation layer.

Do not create parallel Character truth.

## Integration owner

### `05-chapter2-integration.js`

Owns:

- Chapter II to III transition
- Chapter III dynamic loading
- Chapter III Save/Resume preparation
- legacy visible build label
- Developer jumps through Chapter III
- mobile background lifecycle guard
- rain boundary
- Return to Title bridge

It does not own Chapter IV runtime loading.

## Chapter IV owners

### `01-afterimage.js`

Owns:

- Chapter IV intro
- Phase I AFTERIMAGE
- Evidence Route Board
- Phase I choice
- Analyst of Record query
- Phase I state and restore
- transition to Phase II

### `02-jakarta-arrival.js`

Current module: `0.14.9`.

Owns:

- Singapore to Jakarta flight
- airport, office and lab scenes
- Maya introduction and Journal extension
- Farid remote label in Phase II
- Token Verification
- Phase II audio
- Phase II state and restore
- Phase II completion bridge
- Return to Title
- Phase II Developer jumps
- Maya custom Character detail markup
- accepted 0.16.4 profile-contract fix

The Maya Journal extension must preserve the base detail contract:

- `data-detail-shell`
- `data-detail-portrait`
- `data-detail-name`
- `data-detail-status`
- `data-detail-metrics`
- `data-detail-notes`

### `02a-jakarta-portrait-guard.js`

Owns deterministic one-time missing portrait fills for Cheryl and Farid.

Rules:

- no observer
- no timer
- no polling
- existing approved mappings win
- no dialogue mutation

### `03-packet-provenance.js`

Current module: `0.16.3`.

Owns:

- Phase III seamless continuation in the existing Jakarta Verification Lab
- phase-local state initialization and legacy migration
- four-record Evidence Review
- one-time Case File collection per evidence item
- circular Previous/Next review navigation
- step-by-step Packet Trail reconstruction
- lawful next-lead selection
- Phase III dialogue and localization
- Farid remote label in Phase III
- Phase III Save/Resume
- Phase III Developer jump
- Phase III completion card
- handoff to `THE MAN BEHIND THE ALIAS`

### `09-defect-hotfix.js`

Current role:

- legacy repair layer disabled
- deterministic localization and QC loading
- deterministic Phase I, II and III bootstrap
- no global repair polling
- no gameplay override
- current runtime build `0.16.4`

---

# 8. STATE MODEL AND SAVE/LOAD

## Core fields

- `screen`
- `found`
- `history`
- `sound`
- `music`
- `sfx`
- `language`
- `chapter`
- `progress`
- `checkpoint`
- `characters`
- `relationships`
- `flags`
- `personality`
- `journal`
- `forensic`
- `medical`
- `chapter3`
- `chapter4`
- `endingProfile`
- `lwCharactersUnlocked`
- `lwCharactersUnread`
- `lwEvidenceUnlocked`
- `lwJournalEnabled`

## Cross-chapter ending profile

```js
state.endingProfile = {
  evidenceIntegrity: 0,
  attributionProof: 0,
  chainOfCustody: 0,
  witnessProtection: 0,
  northSafety: 0,
  allianceStrength: 0,
  publicRecordControl: 0,
  elenaSuspicion: 0,
  accusedParty: "",
  witnessStatus: "unknown",
  northStatus: "active",
  adrianStatus: "unresolved",
  armanStatus: "unresolved"
};
```

Do not expose a crude morality meter. Consequences appear through evidence, trust, admissibility, safety and public-record control.

## Phase I state

`state.chapter4.phase1` owns:

- started
- chapterCardSeen
- locationCardSeen
- introComplete
- choiceMade
- choiceApplied
- choiceKey
- boardAssignments
- boardAttempts
- boardComplete
- boardDebriefSeen
- workingTheoryAdded
- querySeen
- queryCuePlayed
- queryAcknowledged
- closingDialogueComplete
- complete
- stage

## Phase II state

`state.chapter4.phase2` owns:

- started
- flightComplete
- routeCardSeen
- airportIntroComplete
- mayaUnlocked
- mayaUnread
- officeIntroComplete
- choiceMade
- choiceApplied
- choiceKey
- legalBriefComplete
- verificationStarted
- verificationSteps
- consoleWarnings
- verificationComplete
- evidenceCollected
- closingDialogueComplete
- complete
- stage

## Implemented Phase III state

`state.chapter4.phase3` owns:

```js
{
  started: false,
  introComplete: false,
  captureAuthorized: false,
  evidenceCollected: [],
  evidenceViewed: [],
  activeEvidenceId: "",
  evidenceDebriefSeen: false,
  trailDebriefSeen: false,
  provenanceAssignments: {},
  provenanceAttempts: 0,
  provenanceComplete: false,
  activeTrailIndex: 0,
  leadChoice: "",
  leadAttempts: 0,
  leadComplete: false,
  authorshipComplete: false,
  legalDebriefSeen: false,
  brokerLeadEstablished: false,
  brokerHandle: "",
  armanLeadStatus: "unresolved",
  closingDialogueComplete: false,
  complete: false,
  stage: "capture"
}
```

Phase III migration supports older prototype fields and values, including:

- old provenance category names
- old Matrix state
- old `authorshipComplete`
- old `provenanceDebriefSeen`
- old stages such as `matrix`, `provenance` and `evidence-review`

Loading the Phase III script remains story-state neutral. Entry initialization is scoped to Phase III entry, resume or Developer jump.

## Phase III completion flags

Exact runtime fields:

- `ch4_p3_palimsest_build_proven`
- `ch4_p3_jakarta_handoff_proven`
- `ch4_p3_bangkok_deployment_supported`
- `ch4_p3_decision_owner_unresolved`
- `ch4_p3_broker_inquiry_authorised`

The runtime field `palimsest` contains a legacy spelling in the key. Do not casually rename it without Save migration. Canon spelling remains `PALIMPSEST`.

## Storage

Auto Save:

`last_witness_rc1_auto`

Legacy manual:

`last_witness_rc1_manual`

Named Save IndexedDB:

- database: `last_witness_saves`
- store: `slots`
- key path: `id`
- index: `updatedAt`

Fallback:

`last_witness_named_saves_v1`

## Restore rule

Before restoring late Chapter III or Chapter IV:

1. load prior modules in narrative order
2. initialize isolated defaults
3. apply migration
4. restore snapshot
5. call the correct phase resume bridge
6. reconstruct active screen
7. reconstruct audio
8. reconstruct dialogue, modal, evidence and puzzle lifecycle
9. reconstruct Journal and Case File extensions
10. preserve completed-state behavior
11. never let a future module overwrite the restored chapter merely because it loaded

Each new phase must own:

- initializer
- migration
- restore bridge
- checkpoint names
- audio restoration
- modal restoration
- Developer jump
- completed-state resume

---

# 9. CHARACTER CANON

## Benedict

- Age: 42
- Detective and Lead Investigator
- protagonist
- final human decision-maker
- calm, observant and psychologically sharp
- reads motive, hesitation, wording, restraint and timing
- uses language skillfully without theatrics
- dry, restrained humour
- enjoys movement and active cases
- dislikes binding commitment and settled life
- does not accuse without evidence
- must not become a passenger while North solves everything

Long-term romantic Canon:

- may genuinely care for Cheryl
- may reciprocate part of her feeling
- does not choose a permanent partner
- chooses a mobile investigative life
- is honest when avoidance is no longer possible
- final choice is forward motion, not settling down

## North

- Age: 32
- IT Specialist and Technical Investigator
- Benedict's trusted long-term partner
- serious, concise and highly observant
- dry wit
- leads technical analysis
- rejects unsupported attribution
- understands Authentication vs Attribution
- becomes an active target in Chapter IV
- never a passive victim
- must consent to the false-success operation
- no romance with Farid
- partnership with Benedict is the emotional spine

Physical and swimwear Canon:

- leanest of North, Cheryl and Maya
- lean-fit, healthy and agile
- naturally athletic midsection
- toned arms and legs
- compact silhouette
- realistic adult proportions
- minimalist, clean and functional bikini direction
- no passive pin-up posing
- no anatomy inflation to compete with Maya or Cheryl

## Elena

Public role:

- Forensic Analyst
- credible professional ally
- calm, intelligent and useful
- gives true information
- controls timing and sequence
- appears trustworthy
- no villain coding before evidence earns suspicion

Owner secret:

- mastermind
- killed the Chapter I victim
- killed Daniel Voss
- decision owner
- selected victim, room and minute
- used legitimate Bangkok evidence access
- deployed watcher logic through a valid signed package
- curated true evidence into a false official chronology
- does not need to falsify scientific results

Forbidden before earned reveal:

- villain lighting
- suspicious smirk
- confession-like dialogue
- theatrical cruelty
- villain music
- fake facts inserted only to make her guilty
- premature accusation

## Inspector Cheryl Goh

- Age: 40
- SPF liaison
- measured authority
- disciplined, sharp and legally strict
- protects proof boundaries
- respects North
- genuine long-term ally
- develops serious feelings for Benedict through respect
- keeps professional control
- romance never overpowers the case
- remains dignified when Benedict chooses no permanent partner
- no love triangle with Maya or North

Physical and swimwear Canon:

- athletic-curvy
- second most voluptuous
- slightly less full-figured than Maya
- strong shoulders and toned waist
- physically capable
- tomboy confidence
- sporty, assertive and movement-ready bikini
- do not feminize her into another person
- do not make her a shy caricature

## Farid Rahman

- Age: 31
- Singaporean Malay
- Digital Forensics Specialist
- fast, meticulous, friendly and technically serious
- respects North
- no romance with North
- not comic relief
- preserves alternative explanations
- remains in Singapore during Chapter IV Phase II and Phase III support
- holds the original raw mirror and original watcher capture

Accepted remote labels:

- English: `Farid Rahman (Remote · Singapore)`
- Thai: `Farid Rahman (ต่อสายจากสิงคโปร์)`

Accepted visual treatment in Jakarta:

- `Farid Rahman` remains in the normal speaker-name color.
- The remote-presence suffix appears in blue.
- The blue treatment communicates that Farid is not physically in Jakarta.
- Use the same remote-presence logic for later Jakarta scenes while Farid remains in Singapore.

## Ratchata (Dr. Singh)

Display name exactly:

`Ratchata (Dr. Singh)`

- Age: 43
- Senior Medical Examiner
- Thai Sikh forensic pathologist
- dry humour
- independent and scientifically strict
- not `R.` unless future evidence proves otherwise

Portrait fallback:

1. `assets/images/ratchata/profile.png`
2. `assets/images/ratchata/neutral.png`

## Adrian Tan Wei Ming

- Singaporean Chinese
- age 43 to 47
- former System Architect
- fugitive and complicit insider
- key witness
- cautious, intelligent and exhausted by hiding
- distrusts police and institutions
- designed legitimate reconciliation architecture
- concealed or failed to report misuse
- may be guilty of enabling, concealment or flight
- not mastermind
- did not design the complete murder plan
- strong false-conviction target
- never a coward or cartoon villain

## Arman Suryadi

- Indonesian
- age 39
- hacker, toolmaker and wrapper specialist
- connected to PALIMPSEST
- intelligent, dangerous, tired and complicit
- not mastermind
- did not select victims, rooms or eleven-minute events
- may have sold, adapted, brokered or protected the tool
- real face appears in Chapter IV Phase IV
- Chapter III hood feed is a digital mask
- attribution requires source evidence, live behavior and corroboration
- Phase III establishes a lawful broker/toolmaker lead but does not establish his identity

## Inspector Maya Pranoto

- Indonesian National Police Cybercrime liaison
- Age: 37 in implemented runtime
- disciplined, practical and intelligent
- understands Jakarta infrastructure and local law
- professional equal to Cheryl
- not obstructionist
- skeptical of turning a relay into a suspect
- becomes a regional ally
- no romance with Benedict
- no love triangle
- Journal unlocks at formal introduction

Accepted visual lock:

- original dark navy suit
- suit remains visibly navy
- pure black portrait background
- subtle contour preserves black bob silhouette
- face and upper torso have strong visual weight
- no tiny distant portrait
- no damaged crop
- no colored connector under neck
- no missing shoulders or blazer
- accepted asset set frozen
- do not touch Cheryl or Farid while changing Maya

Accepted Character Journal contract:

- Maya may use a custom profile renderer.
- The custom renderer must retain the base detail data attributes.
- Opening Maya must not break any other character profile.
- The owner approved the 0.16.4 fix.

Physical and swimwear Canon:

- most voluptuous and visually full-figured of the three
- full bust, defined waist and fuller hips and thighs
- strong and healthy
- realistic support and weight distribution
- elegant, confident and luxurious bikini direction
- commercially believable, not fantasy lingerie
- remains composed and authoritative
- no romance with Benedict
- no harem coding

## Body-separation rule

- Maya: voluptuous, elegant, strongest curves
- Cheryl: athletic-curvy, tomboy confidence
- North: lean-fit, agile and health-conscious

Difference must come from full anatomy, posture, movement and garment construction, not one shared body with different breast sizes.

## Kawin Nopparat

Owner-level future Canon:

- Chapter I Room 1807 victim
- Thai man, age 41
- Regional Access Governance and Compliance Auditor at Meridian Evidence Systems
- discovered repeated Temporary Operational Profile 18-07 use
- planned to meet a registrar contact at the pier
- killed by Elena
- body moved and staged in Room 1807
- identity unknown to player until Chapter V

## Rinrada "Rin" Sornchai

Owner-level future Canon:

- Thai woman, age 37
- former Identity and Access Registrar
- living witness implied by `R.`
- `R.` refers fairly to Rin and the Registrar role
- saw the emergency credential path
- witnessed Elena's physical presence around the pier exchange
- went off-grid to survive
- definitive living Last Witness
- introduced in Chapter V
- testimony requires corroboration
- retains agency

---

# 10. CHARACTER JOURNAL

## Story gates

### Chapter I

- Character menu hidden
- no Character Cards
- no Journal unlock toast
- stale entries filtered
- future Chapter modules must not expose Character mode
- Developer Unlock must not force the menu into Chapter I
- this gate is owner-tested and frozen

### Chapter II

Character Mode appears normally according to the original accepted Chapter II flow.

Unlock order:

- Benedict and North after the office opening
- Elena after Café introduction
- Somchai and Kittisak after Police introduction
- Ratchata at Medical Examiner

Absolute preservation rule:

- do not move Character Mode earlier
- do not delay it
- do not replace the gate while fixing Jakarta
- do not change the Chapter II toast timing
- do not change the original Chapter II cards unless directly requested

### Chapter III

- Cheryl and Farid after formal Singapore Office introduction
- Adrian after Hawker Centre identity verification
- no PALIMPSEST card
- no alias or tool-family card

### Chapter IV

- Maya after formal airport introduction
- Arman only after source evidence and physical encounter support identity in Phase IV
- no hooded UNKNOWN SOURCE card
- no swimwear duplicate cards
- scene costumes are not new identities
- Farid remains the same Character card while supporting remotely

### Chapter V

- Kawin when identity is established
- Rinrada after physical introduction and consent

## Developer Unlock rules

- Dev Unlock All unlocks known registered Character entries for testing.
- It must not rewrite Chapter I visibility rules.
- It must not change Chapter II's normal feature-unlock timing.
- It must not mutate story Canon.
- It must not create an Arman card before the runtime registry contains an approved Arman entry.
- It must not make aliases into Characters.

## Accepted card layout

- raw portrait `<img>`
- portrait approximately `78 × 88`
- name upper-right
- status below name
- Relationship in the original information column
- no 54×54 wrapper
- no oversized redesign
- no global resizing

## Accepted detail contract

The base Character detail shell expects:

- `[data-detail-shell]`
- `[data-detail-portrait]`
- `[data-detail-name]`
- `[data-detail-status]`
- `[data-detail-metrics]`
- `[data-detail-notes]`

Any custom detail view must preserve these targets or fully own every subsequent switch. Prefer preserving the contract.

## Portrait standard

Priority:

1. identity
2. face
3. expression
4. upper torso
5. stable framing
6. clean silhouette
7. useful props only

Standard canvas:

`744 × 1000`

General standard is transparent alpha. Maya Phase II is an approved pure-black-background exception.

---

# 11. SEASON AND CHAPTER STRUCTURE

## Season 1

1. Chapter I - `ROOM 1807`
2. Chapter II - `THE PERFECT STRANGER`
3. Chapter III - `THE BORROWED MINUTES`

Season 1 complete.

## Season 2

4. Chapter IV - `SHADOW OF THE TRUTH`
5. Chapter V - `THE MISSING PIECE`
6. Chapter VI - `THE FINAL MOVE`
7. Chapter VII - `LAST WITNESS`

Season 2 is active.

`PALIMPSEST` is an alias and tool family, not the Chapter IV title.

## Chapter IV phase-count lock

Chapter IV has exactly eight phases:

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET PROVENANCE / implemented player-facing `PACKET TRAIL`
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

Do not add a ninth phase without owner approval.

## Internal phase-language rule

- Phase numbers may be used in file names, state, Developer Mode, Save labels and planning documents.
- Characters must not speak as though they know they are inside a game phase.
- Avoid dialogue such as `Phase IV starts...` or `the next phase begins...`.
- Player-facing handoffs should name the story objective or title, for example `NEXT · THE MAN BEHIND THE ALIAS`.

## Locked titles

- Chapter I: **ROOM 1807**
- Chapter II: **THE PERFECT STRANGER**
- Chapter II ending: **THE ELEVEN-MINUTE LIE**
- Thai: **คำลวงสิบเอ็ดนาที**
- Chapter III: **THE BORROWED MINUTES**
- Thai: **สิบเอ็ดนาทีที่ถูกยืม**
- Chapter IV: **SHADOW OF THE TRUTH**
- Chapter V: **THE MISSING PIECE**
- Chapter VI: **THE FINAL MOVE**
- Chapter VII: **LAST WITNESS**

---

# 12. CORE STORY CANON

## Scientific truth

- toxicology is genuine
- samples are genuine
- biological findings are genuine
- chronology around evidence is engineered
- solution is not fake science

## Daniel lock

Daniel Voss dies in Chapter II.

He never:

- returns alive
- becomes a living suspect
- becomes the Last Witness
- operates the system after death

He may continue through drafts, recordings, archives, contacts and scheduled signals prepared before death.

## Room 1807 victim lock

- not Daniel
- unresolved to player through Chapter IV
- future identity: Kawin Nopparat
- reveal in Chapter V

## `R.` lock

Through Chapter IV:

- not confirmed as Ratchata
- not publicly solved

Forward truth:

- connects to Rinrada
- Registrar role is part of the fair clue
- earned reveal in Chapter V

## Temporary Operational Profile 18-07

`18-07` is not a person.

It may carry:

- accepted role
- accepted permission
- device claim
- delayed event
- route metadata

It does not prove physical entry, operator, identity, motive or mastermind.

## Architecture layers

1. Adrian designed legitimate offline reconciliation architecture.
2. Arman/PALIMPSEST built or adapted the outer wrapper.
3. A local actor deployed trusted packages and watcher logic.
4. Elena owned final decisions:
   - victim
   - room
   - timing
   - discovery sequence
   - cleanup priority

Architecture, authorship, brokerage, deployment and decision ownership are separate.

## Phase III proof boundary now locked

Phase III proves or supports:

- source build belongs to the PALIMPSEST family
- Jakarta-linked infrastructure handled the route or handoff
- the broker layer differs from deployment
- trusted Bangkok conditions supported local deployment
- a decision-trigger structure exists
- the decision owner remains unknown
- an unverified broker handle may be observed under controlled authority

Phase III does not prove:

- Arman is the sender
- Arman is the operator
- Arman deployed the Bangkok watcher
- Arman selected victims
- Arman is mastermind
- Elena involvement
- final operator at 05:47
- final operator at 06:09
- decision owner

## North threat escalation

- North separates authorship, route, deployment and decision ownership.
- `ANALYST OF RECORD` identifies the role that understood the pattern.
- North threatens the attribution gap protecting Elena.
- Elena chooses neutralization.
- The attempt must remain deniable.
- It should resemble accident, operational failure or another actor's violence.
- North remains active and analytical.
- Benedict cannot use her as bait without consent.
- The attempt produces evidence.

---

# 13. CANONICAL DANIEL TIMELINE

| Time | Canon event |
|---|---|
| 05:47 | Daniel's building accepts Temporary Operational Profile 18-07 with resident-access role |
| 05:51 | Daniel's Orchid Café draft is edited |
| 05:58 | original toxicology sample is collected |
| 06:09 | `COLLECTION_TIME` revised from 05:58 to 06:09 using accepted Evidence Division permission |
| 06:17 | Laboratory Accession Record created |
| 06:20 | Daniel officially reported discovered |

Locked wording:

### 05:47

- building accepted profile 18-07
- profile carried resident-access role
- operator unknown

Never say a credential physically walked into the building.

### 06:09

- accepted Evidence Division permission
- profile 18-07
- corrected event claims FS-12
- route reaches Singapore infrastructure
- operator unknown

### 06:17

Always:

**Laboratory Accession Record created**

### 06:20

Official reported discovery.

---

# 14. CHAPTER I - ROOM 1807

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Evidence:

- Victim's Phone
- Blood-stained Cloth
- Victim's Laptop
- Half-packed Suitcase
- warning message
- missed calls from `R.`
- pier note

Deduction:

- body moved
- room staged
- laptop selectively cleared
- intended departure interrupted
- phone positioned for investigators
- true objects arranged into false order

Ending:

> "You looked in the wrong room."

Forward truth:

- victim is Kawin
- Kawin audited 18-07 reuse
- arranged pier meeting with Rinrada
- Elena killed him
- Elena staged Room 1807
- warning caller is Elena through masked channel

Known technical debt:

- static intro still says `HOTEL 1807`
- Canon title is `ROOM 1807`
- do not mix this correction into Phase IV without owner approval

---

# 15. CHAPTER II - THE PERFECT STRANGER

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Victim:

Daniel Voss, 38.

Phase order:

1. Detective Office
2. Victim Apartment
3. Orchid Café
4. Police Station / Evidence Division
5. Forensic Science
6. Medical Examiner
7. Chapter ending

Key findings:

- two coffee mugs
- Temporary Profile 18-07
- Daniel's investigation board
- Room 1807 connection
- `Ask E. about the corrected time`
- Café draft edited at 05:51
- certified extract
- sealed custody envelope
- Evidence Division permission
- FS-12
- offline local session
- genuine science
- correction from 05:58 to 06:09
- discovery at 06:20

Elena continuity:

- North reaches `E.` through investigation
- Elena provides true archived information
- no impossible future knowledge
- no villain coding

Ending routes:

- `chapter3_timeline`
- `chapter3_old_cases`
- `chapter3_access`

All converge.

Character Mode rule:

- Character Mode begins during Chapter II according to the accepted original implementation.
- This behavior is frozen.
- Jakarta repairs must not alter it.

---

# 16. CHAPTER III - THE BORROWED MINUTES

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Purpose:

Explain how true evidence survives inside false chronology without revealing the mastermind.

## Central mechanism

- delayed and offline devices create Signed Local Events
- signed events may arrive later
- events inside the eleven-minute Reconciliation Window remain eligible
- accepted events may display by Device Timestamp
- conflicting certified views may both validate
- the system obeys rules while the official story remains false

## Phase I - Detective Office

Timeline solution:

1. 05:47 profile accepted
2. 05:51 draft edited
3. 05:58 sample collected
4. 06:09 time revised
5. 06:17 accession record
6. 06:20 discovery

Conclusion:

- Daniel never boarded
- booking travelled
- profile travelled through infrastructure

## Phase II - Bangkok to Singapore

- operational travel
- no tourism montage
- Benedict and North partnership

## Phase III - Changi Airport

Conclusion:

> Travel identity entered systems. Daniel did not complete the journey.

## Phase IV - Singapore Investigation Office

Introduces Cheryl and Farid.

Limited Header Comparison:

1. 05:58 Original Header
2. 06:09 Corrected Header
3. both validate and corrected claims FS-12
4. eleven-minute rule is Policy

## Phase V - Marina Bay

Confidence Review:

- public gateway exit: PROVEN
- subscriber reacted: SUPPORTED
- operator physically present: UNPROVEN
- token reached serviced-apartment network: PROVEN
- Adrian controlled session: UNPROVEN

## Phase VI - Serviced Apartment

Credential solution:

- profile: `18-07`
- permission: `EVIDENCE DIVISION`
- device: `FS-12`
- window: `11 MINUTES`

## Phase VII - Hawker Centre

Adrian physically introduced.

Evidence:

- Revoked Offline Signature Token
- Secure Reconciliation Mirror Locator

## Phase VIII - Digital Forensics Lab

Raw Receipt Order:

1. original accession received
2. offline device reconnects
3. signed local event received
4. 18-07 permission accepted
5. certified header rebuilt

Trust Layer:

- signature: PROVEN
- permission: PROVEN
- device time: CLAIMED
- display order: DERIVED
- human operator: UNRESOLVED
- credential identity: UNRESOLVED

## Phase IX - Callback

Revelations:

- watcher entered through signed Bangkok forensic package
- callback woke after raw-mirror milestone
- PALIMPSEST survives broken clocks
- someone else taught it to lie
- PALIMPSEST did not choose body, room or minute
- cleanup is separate
- Jakarta route and Bangkok decision path are separate
- cleanup deployed before the team left Bangkok

Key warning:

> Look for the person who decided when the room would be found.

Closing:

> One in Jakarta. One in Bangkok.

---

# 17. COMPLETE OWNER-LEVEL MYSTERY TRUTH

Secret from player.

## Meridian Evidence Systems

Fictional regional infrastructure provider serving Bangkok, Singapore and Jakarta.

Legitimate purpose:

- preserve signed local events
- support delayed synchronization
- maintain chain-of-custody continuity
- operate through offline or network failure

Weakness:

- authenticates accepted credentials and signatures
- does not independently prove human operator
- displayed chronology may inherit claimed device time

## Adrian

- created legitimate reconciliation architecture
- learned it was forked and abused
- concealed, delayed and fled
- guilty of enabling or concealment
- not murder mastermind

## Arman

PALIMPSEST can:

- preserve records across broken clocks
- fail over relays
- scrub operator metadata
- protect anonymous delivery
- survive suppression

Arman sold, brokered or adapted it. He did not choose Kawin, Daniel, Room 1807 or the eleven-minute events.

## Elena

Belief:

> Facts do not govern institutions. Records do.

She:

- chose which truth remained visible
- used sequence as authority
- used credibility to guide investigators
- moved from curation to murder

Her mistake:

- Benedict reads intention
- North reconstructs attribution gaps
- Rinrada remembers physical action
- Cheryl protects proof boundaries
- Farid preserves alternatives

## Kawin murder

- discovered 18-07 reuse
- planned to meet Rinrada
- Elena killed him
- Elena staged Room 1807

## Daniel murder

- continued Kawin's work
- connected Room 1807, 18-07, `E.`, corrected time and Singapore
- Elena killed him
- attached genuine science to engineered chronology

## Watcher

- deployed through Elena's legitimate forensic access
- signed Bangkok package carried dormant watcher
- watcher waited for North's raw-mirror milestone
- cleanup tried to erase callback token while preserving official record

## Why Elena allowed investigation

She wanted:

- independent validation of curated narrative
- North to expose technical actors
- Adrian and Arman as plausible targets
- Rinrada to react
- a public record that survived scrutiny

---

# 18. CHAPTER IV - SHADOW OF THE TRUTH

## Current status

- Phase I: complete and owner-approved
- Phase II: complete and owner-approved
- Phase III: complete and owner-approved
- Phase IV: immediate next production target
- Phase V to VIII: planned
- total phases: eight

## Phase I - AFTERIMAGE

Status:

`COMPLETE · MODULE 0.13.2 · OWNER-APPROVED · FROZEN`

Location:

Singapore Investigation Office.

Route Board:

| Item | Lane |
|---|---|
| Wrapper Fingerprint | Jakarta |
| Rendezvous Token | Jakarta |
| Bangkok Signed Package | Bangkok |
| Cleanup Credential | Bangkok |
| Decision Owner | Unresolved |

North target beat:

- authenticated query
- term: `ANALYST OF RECORD`
- North is the search term
- Benedict refuses to use her without consent
- North refuses protection through exclusion

Proof:

- route and deployment separate
- North recognized as analytical role
- no identity result
- legal basis for Jakarta cooperation

## Phase II - JAKARTA ARRIVAL

Status:

`COMPLETE · MODULE 0.14.9 · OWNER-APPROVED · FROZEN`

Scene sequence:

1. Singapore departure: 23:20 SGT
2. flight: 1 h 50 m
3. Jakarta arrival: 00:10 WIB
4. Cybercrime Operations: 01:05 WIB
5. Verification Lab: 01:18 WIB
6. Day 5

Team physically in Jakarta:

- Benedict
- North
- Cheryl
- Maya

Farid remains remote in Singapore with:

- original raw mirror
- original watcher capture

North carries:

- sanitized analysis clone
- no live credential
- no callback route

Maya authority:

- token validation authority
- certificate wrapper access
- one passive response
- no live trace
- no intrusion
- no raid from an IP address
- no physical attribution from relay address

Token Verification order:

1. `PRESERVE TOKEN HASH`
2. `CLONE INTO SANDBOX`
3. `SEND PASSIVE CHALLENGE`
4. `COMPARE RESPONSE GRAMMAR`

Rejected:

- `OPEN LIVE RENDEZVOUS`
- `TRACE RESPONDER`

Findings:

- token genuine
- single-use
- Jakarta broker route real
- response grammar supports PALIMPSEST family
- no face
- no address
- no sender identity
- no operator identity
- no deployer identity
- no decision owner

Packet layers:

1. Source-Build Fingerprint
2. Jakarta Relay Exit
3. Broker Handoff
4. Local Deployment Echo
5. Decision Trigger

North result:

- system did not ask her name
- recognized role `ATTRIBUTION ANALYST`
- role is not identity

Accepted transition principle:

- do not use development terms such as `Phase IV` inside character dialogue
- Phase III continues seamlessly inside the lab
- player-facing transition is the investigative act, not a game-phase announcement

Character Journal resolution:

- Maya profile uses the accepted custom renderer
- opening Maya no longer breaks other profiles
- owner approved Build 0.16.4 behavior

## Phase III - PACKET PROVENANCE / PACKET TRAIL

Status:

`COMPLETE · MODULE 0.16.3 · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Runtime presentation:

- seamless continuation inside Jakarta Verification Lab
- local time: 01:24 WIB
- player-facing scene label: `PACKET TRAIL` / `เส้นทางข้อมูล`
- no redundant Phase card in character dialogue
- no character says `Phase IV`

Starting point:

- controlled capture authorized
- token response preserved
- Farid remote in Singapore
- Maya owns local legal authority
- North leads technical interpretation
- Benedict maintains human inference and decisions
- Cheryl maintains admissibility and jurisdiction

Purpose:

Separate:

- tool origin
- network route
- broker handoff
- local deployment
- decision owner

### Phase III flow

1. Introductory legal and technical boundary dialogue
2. Review four captured records
3. Add each evidence item to the Case File once
4. Reconstruct five packet-trail records one at a time
5. Receive targeted feedback on incorrect assignments
6. Select the next lawful lead
7. Authorize controlled observation of the broker handle
8. Complete Phase III

### Evidence Review

Evidence IDs and player-facing records:

1. `source_build_hash`
   - PALIMPSEST Build Signature
   - proves tool origin

2. `broker_ledger_fragment`
   - Broker Ledger Fragment
   - supports broker handoff

3. `jakarta_authorization_echo`
   - Jakarta Relay Authorisation
   - proves network route

4. `deployment_condition_echo`
   - Bangkok Deployment Conditions
   - supports local deployment

Behavior:

- review is repeatable
- Previous and Next are circular
- Close remains available
- each item may be added once
- collected items show an in-case-file state
- last active evidence is restored
- reconstruction opens after all four are collected

### Primary minigame

Player-facing title:

- English: `RECONSTRUCT THE PACKET TRAIL`
- Thai: `ต่อเส้นทางของข้อมูล`

Display model:

- one record at a time
- `1 / 5` through `5 / 5`
- five category choices per record
- Back and Next
- Start Over
- final Confirm
- selection persists
- close and resume preserve progress
- no permanent failure
- wrong answers return to the first incorrect record with explanatory feedback

Correct map:

| Record | Correct layer |
|---|---|
| PALIMPSEST Build Signature | Tool Origin |
| Jakarta Relay Exit | Network Route |
| Broker Ledger Handoff | Broker Handoff |
| Bangkok Activation Conditions | Local Deployment |
| Decision Trigger | Still Unknown |

### Lawful next-lead decision

Question:

- English: `What can we pursue without outrunning the evidence?`
- Thai: `เราตามเบาะแสใดต่อได้โดยไม่ล้ำเกินหลักฐาน?`

Options:

1. accuse the relay operator as toolmaker
2. trace the unverified broker handle under controlled observation
3. treat the Bangkok deployment record as the decision owner

Correct lead:

- trace the unverified broker handle under controlled observation

Wrong choices teach:

- a route does not identify a toolmaker
- deployment does not identify target selection or decision ownership

### Character roles

- North leads reconstruction
- Benedict frames the human inference and rejects convenient blame
- Maya authorizes controlled observation
- Cheryl maintains evidentiary limits
- Farid validates the sealed Singapore copy remotely
- no Arman portrait or Journal unlock
- no Elena or Adrian appearance required

### Approved closing dialogue function

Maya authorizes tracing the handle under controlled observation and forbids contact without authorization.

North states that the team must find the man behind the alias before others define him.

Benedict closes with restrained humour about introductions before indictments.

No character says `Phase IV`.

### Completion

Player-facing completion:

- `PACKET TRAIL RECONSTRUCTED`
- `ต่อเส้นทางข้อมูลสำเร็จ`

Results:

- TOOL ORIGIN: PALIMPSEST FAMILY
- DELIVERY ROUTE: JAKARTA-LINKED
- LOCAL DEPLOYMENT: BANGKOK-LINKED
- DECISION MAKER: UNKNOWN

Next:

- `NEXT · THE MAN BEHIND THE ALIAS`
- `ถัดไป · คนหลังนามแฝง`

### End proof

Proven or supported:

- PALIMPSEST-family source build
- Jakarta handoff route
- broker layer exists
- Bangkok deployment condition exists
- decision maker remains unknown
- lawful basis exists to observe the probable toolmaker or broker handle

Not proven:

- Arman selected victims
- Arman is mastermind
- Arman is murderer
- Arman is the sender
- Arman is the operator
- Elena involvement
- final operator at 05:47
- final operator at 06:09
- decision owner

## Phase IV - THE MAN BEHIND THE ALIAS

Status:

`IMMEDIATE NEXT PRODUCTION TARGET · BLUEPRINT REQUIRED · NOT IMPLEMENTED`

Purpose:

- physical encounter with Arman
- real face reveal
- hood feed excluded as identification
- North verifies behavior against source evidence
- Benedict reads fear of being framed
- Arman admits authorship, adaptation, brokerage or protection at the correct proof level
- Arman knew abuse was possible
- Arman did not choose victims
- legitimate Bangkok client supplied deployment conditions
- no direct proof of client identity

Entry condition from Phase III:

- broker inquiry authorized
- broker handle remains unverified
- Arman status is probable toolmaker or broker, not confirmed identity
- team must remain within Indonesian legal authority
- no uncontrolled contact

Required design questions before coding:

1. exact broker-handle value and whether it remains partially masked
2. exact physical location selected through Phase III evidence
3. how Maya authorizes observation and contact
4. how the team verifies that the physical man corresponds to the source behavior
5. how the scene avoids turning technical skill into proof of murder
6. when Arman's real portrait and Character Journal entry unlock
7. which new backgrounds and expressions are genuinely required
8. how Phase IV leads naturally to `NORTH IS MARKED`

First likely new asset package:

- Arman physical portrait and expression set
- Phase IV location backgrounds
- phase-local ambience if existing audio is insufficient
- evidence art only where DOM/CSS is insufficient

Do not create Phase IV assets before the owner approves the blueprint.

## Phase V - NORTH IS MARKED

Locked narrative function:

- North is a strategic threat
- adversary attempts to remove her
- attempt is deniable
- North remains active
- attack creates evidence
- phase feeds into false success

Owner-confirmed setting:

A natural undercover Indonesian hotel, resort, pool, beach club or coastal surveillance sequence selected by Phase IV evidence.

North, Cheryl and Maya use distinct tourist-cover bikinis.

- Maya: most voluptuous, elegant and strongest curves
- Cheryl: athletic-curvy, tomboy and movement-ready
- North: lean-fit, minimalist and agile

Rules:

- adult and story-integrated
- commercially realistic swimwear
- no identical poses
- no impossible anatomy
- no harem coding
- no romance between Maya and Benedict
- no romance between North and Farid
- surveillance remains primary
- visual appeal must not erase police or technical competence

Threat rhythm:

1. Arrival and cover
2. False calm
3. Anomaly
4. North singled out
5. Attempt or near-attempt
6. Realization that attacker needs a record of North's removal
7. transition to false-success plan

Attack method remains unapproved until the Phase V blueprint.

## Phase VI - THE FALSE SUCCESS

- attacker believes North removed
- hidden live channel preserved
- Farid maintains decoy telemetry
- Cheryl and Maya control legal perimeter
- North consents and designs deception
- Benedict does not decide over her body
- public record may say missing, injured or dead
- North remains alive and operational

## Phase VII - RELAY FACILITY CLIMAX

- preserve relay authorization echo
- Arman assists under conditions
- cleanup triggers
- North works through hidden channel
- capture Registrar reference `R.`
- prove Bangkok watcher deployment predates Singapore trip
- Elena sends true useful information slightly too early
- no obvious villain reveal

## Phase VIII - SHADOW OF THE TRUTH

- public record says North removed
- North secretly alive
- antagonist believes the record
- Benedict returns toward Bangkok
- Jakarta identifies toolmaker, not decision owner
- `R.` becomes next human lead

Closing direction:

> Let her believe the record.

---

# 19. CHAPTER V - THE MISSING PIECE

Purpose:

Supply human continuity systems cannot manufacture.

Reveals:

- Kawin identity
- why Room 1807 mattered
- who `R.` is
- pier meeting
- living Last Witness
- first earned suspicion of Elena

Public state:

- North missing, injured or presumed dead

Private state:

- North alive under protection

Phases:

1. Return to Bangkok
2. Name in Room 1807
3. Room/Profile Cross-Map
4. Daniel's Handoff
5. The Registrar
6. Pier Reconstruction
7. Witness Extraction
8. The Missing Piece

Minigames:

- Victim Identity Reconstruction
- 1807 / 18-07 Correlation
- Pier Event Reconstruction

Key reveal:

`Kawin Nopparat`

Key witness:

`Rinrada "Rin" Sornchai`

Rin saw Elena physically present around the pier exchange but did not witness every murder action. Testimony requires corroboration.

---

# 20. CHAPTER VI - THE FINAL MOVE

Purpose:

Strategic war over the final official record.

Elena activates Continuity Protocol to:

- migrate records
- certify final chronology
- frame Adrian, Arman or North
- erase attribution path
- control public discovery

Phases:

1. Case Theory Without a Charge
2. Controlled Leak
3. Alliance Assignment
4. Continuity Protocol
5. Attack on Safe Chain
6. Evidence Division Breach
7. Elena Knows
8. Two Staging Sites
9. The Final Move

Minigames:

- Controlled Leak Correlation
- Authority Chain Reconstruction
- parallel priority operation

Elena remains controlled and philosophical, not cartoonish.

---

# 21. CHAPTER VII - LAST WITNESS

Purpose:

Resolve:

- victims
- architecture
- wrapper author
- deployer
- decision owner
- physical witness
- legal case

Opening alerts:

1. Room 1807
2. pier

Phases:

1. The Room Repeats
2. The Pier
3. Rescue / Preserve
4. Elena Confrontation
5. The Last Record
6. Final Accusation
7. Record or Release
8. Ending

Final minigame:

`THE LAST RECORD`

Map facts into:

- physical event
- record claim
- accepted credential
- tool author
- broker
- deployer
- operator
- decision owner
- motive
- opportunity
- chain of custody

Historical truth remains fixed even when the legal package is incomplete.

---

# 22. ENDING ARCHITECTURE

Historical truth is fixed:

- Elena is mastermind
- Elena killed Kawin
- Elena killed Daniel

What changes:

- evidence preservation
- survival
- proof
- accusation
- institution acceptance
- public record
- character epilogues

## Ending 1 - TRUE CONVICTION

Requires:

- Elena accused
- strong attribution
- clean custody
- local decision path
- witness survives
- North evidence survives
- physical and digital corroboration

## Ending 2 - RIGHT NAME, NO CASE

- team knows truth
- conviction fails
- Elena walks or disappears
- witness may survive
- North may remain hunted

## Ending 3 - FALSE CONVICTION

Targets:

- Adrian
- Arman

Conditions:

- persuasive architecture or tool evidence
- weak decision-owner proof
- wrong accusation
- institution accepts easier story

## Ending 4 - THE PERFECT RECORD

- witness lost
- North framed or discredited
- evidence chain destroyed
- institution accepts false chronology
- final image echoes Room 1807

Fairness:

- no ending changes the murderer
- Adrian never becomes mastermind
- Arman never becomes decision owner
- North never becomes mastermind
- Daniel never returns alive
- wrong endings remain understandable
- no single dialogue choice determines the ending

---

# 23. RELATIONSHIP AND ALLIANCE DESIGN

## Benedict and North

- central partnership
- trust through inclusion
- North consents to false success
- Benedict incorporates technical judgment
- no romance
- partnership continues
- Phase V strengthens operational trust

## Benedict and Cheryl

Progression:

1. respect
2. restrained amusement
3. trust
4. shared risk
5. genuine feeling
6. acceptance that Benedict will not settle

Do not:

- make Cheryl adolescent
- make North a romantic rival
- create a Maya love triangle
- use the resort scene as cheap jealousy

## Maya and Benedict

- professional chemistry only
- no romance
- no harem structure

## North and Farid

- technical respect
- dry banter
- no romance
- remote-support status must remain clear while Farid is in Singapore

## North and Arman

- hostility and curiosity
- technical recognition
- no confusion of skill and innocence

## Benedict and Elena

- psychological duel inside cooperation
- Elena guides narrative
- Benedict tests timing and knowledge
- no accusation before proof

---

# 24. AUDIO GOVERNANCE

Owners:

- `02-audio-save.js`
- `11-production-stabilization.js`
- scene-local modules
- integration lifecycle guard

Do not create another global audio manager.

## UI click

- pointerdown
- immediate
- one press, one sound
- no duplicate Android playback
- real click

## Evidence and puzzle cues

- evidence cue plays once
- puzzle success is separate
- Inspect does not play collection cue
- stop on scene exit

## Accepted Phase II audio

- takeoff fades before route card
- no lingering airplane sound
- airport ambience subdued
- lab ambience subdued
- dialogue remains dominant
- Farid remote dialogue does not add an ambience owner
- Return to Title stops Phase II media

## Accepted Phase III audio

- reuses the verification score under Phase III ownership
- phase-local ducking for dialogue and overlays
- inspection cue for evidence and navigation
- puzzle-success cue for reconstruction and lawful-lead success
- no alarm
- no villain sting
- no global manager
- no polling repair
- completion stops the phase-local score

## Phase IV audio

Before implementation:

- decide whether the physical Arman location needs new ambience
- preserve dialogue dominance
- do not signal guilt through villain music
- no identity-reveal sting that implies murder guilt
- stop Phase III audio cleanly at entry

## Phase V audio

- credible public leisure ambience
- water, distant guests and hotel activity
- restrained hidden tension
- no vacation montage
- no comedy reveal sting
- no villain music for Elena
- dialogue remains dominant

---

# 25. MOBILE, FULLSCREEN AND UI

## Fullscreen

- begins after user gesture
- Settings control
- menu control
- Save Manager in fullscreen root
- Exit Game fallback
- backgrounding may exit fullscreen
- no automatic re-entry without gesture

## Mobile widths

Check:

- 320 CSS px
- 360×800
- 390 CSS px
- 412×915
- 430 CSS px where practical

Account for:

- browser address bar
- Android navigation
- safe-area bottom
- dialogue height
- long Thai
- two-line buttons
- scrollable modal body

## Phase III accepted UI logic

- modal cards center in the actual runtime
- Close is visible and consistent
- Evidence Previous/Next are separate from collection
- reconstruction shows one record at a time
- Back preserves selection
- Next requires a choice
- Start Over is secondary
- final Confirm appears only after all assignments
- resume actions return to the active task
- no disabled button should visually resemble a dead end without explanation
- Thai and English labels remain legible on mobile

## Background art

Standard:

`864 × 1536`

Style:

- noir graphic novel
- cel-shaded
- heavy ink
- angular shadows
- bright enough for mobile
- operational, not tourist postcard
- no pseudo-text
- exact text or no text

## Portrait compositing

- actual crop matters
- black background pure black where specified
- dark clothing readable
- hair silhouette readable
- no global character changes
- use Benedict and North as weight references
- do not shrink faces to solve full-body needs

---

# 26. EVIDENCE AND MINIGAME STANDARD

Every evidence item must:

- advance story
- support deduction
- justify location or decision
- have Case File summary
- preserve proof boundary

No decorative evidence.

Every minigame must be:

- mobile-friendly
- tap-first
- approximately 30 to 60 seconds
- Reset-capable
- no softlock
- no permanent fail
- wrong answers teach logic
- success cue separate from evidence cue
- derived from collected evidence
- mechanically distinct

Implemented minigames include:

1. Timeline Reconstruction
2. Passenger Trail Reconciliation
3. Limited Header Comparison
4. Marina Bay Confidence Review
5. Credential Header Unlock
6. Adrian Claim Cross-Check
7. Raw Receipt Order
8. Trust Layer Mapping
9. Wrapper Trace
10. Mirror Preservation
11. Volatile Callback Containment
12. Cleanup Decision
13. Dead Drop Preservation
14. Phase I Evidence Route Board
15. Rendezvous Token Verification
16. Packet Trail Reconstruction
17. Lawful Next-Lead Selection

Phase III design correction now locked:

- do not return to the rejected 25-button all-at-once provenance form
- do not restore the redundant five-row Confidence Matrix
- preserve the step-by-step reconstruction
- preserve the final lawful-lead decision

Planned:

1. Phase IV identity/source-behavior verification
2. Decoy Telemetry Control
3. Relay Authorization Preservation
4. Victim Identity Reconstruction
5. Room/Profile Cross-Map
6. Pier Event Reconstruction
7. Controlled Leak Correlation
8. Authority Chain Reconstruction
9. Parallel Scene Prioritization
10. The Last Record

Avoid renamed duplicates.

---

# 27. TESTING STANDARD

## Static

- JS syntax
- CSS parsing
- HTML validity where practical
- asset existence
- paths
- duplicate IDs
- cache queries
- portraits
- dimensions
- alpha and background behavior
- audio decode
- changed-file scope

## Runtime flow

- fresh New Game from Chapter I
- Chapter I Character mode remains hidden
- Chapter II Character Mode appears at the accepted point
- opening dialogue
- choices
- evidence open
- Inspect
- collect
- Close and reopen
- post-evidence dialogue
- puzzle gate
- wrong answer
- Reset
- correct answer
- closing
- transition
- Return to Title

## Character regression gate

Before every future Chapter IV delivery:

1. hard reload with clean state
2. start Chapter I
3. confirm no Character mode
4. confirm no Character toast
5. confirm no future characters
6. enter Chapter II and confirm Character Mode appears normally
7. confirm Chapter II unlock timing
8. confirm Dev Unlock All still works
9. confirm Chapter III Character cards open
10. enter Jakarta
11. open Maya profile
12. return to grid
13. open every other available profile
14. switch repeatedly between Maya and other characters
15. close and reopen the Journal
16. test Thai and English
17. confirm Save/Load does not promote early chapters to Chapter IV
18. confirm future module loading does not expose Character mode early

The exact Maya-first sequence is mandatory because the former defect was sequence-dependent.

## Phase III regression gate

- Phase II to III handoff
- intro dialogue
- Evidence Review all four items
- Previous/Next circular behavior
- Add each once
- close and resume
- reconstruction forward and back
- selection persistence
- wrong answer feedback
- Start Over
- correct completion
- lawful-lead wrong answers
- correct lawful lead
- completion card
- checkpoint `ch4_phase3_complete`
- progress 100%
- Return to Title
- Save/Load before, during and after each modal
- completed-state resume

## Save

- Auto Save
- Continue
- named save
- load
- choice state
- investigation state
- before, during and after puzzle
- completed resume
- export and import
- stale state
- legacy Phase III migration

## Settings

- TH/EN
- sound
- music
- SFX
- fullscreen
- Exit Game

## Honesty

Never claim:

- Android test
- iPhone test
- live Pages test
- listening test
- complete browser regression
- 100% success

unless actually performed.

Owner-device result is final.

Current owner-device truth:

- Android Chrome passed through Phase III
- Maya profile switching passed
- Phase III approved

---

# 28. CURRENT ACCEPTED LIMITATIONS AND TECHNICAL DEBT

Accepted and known:

- iPhone Safari not owner-tested
- iOS Add to Home Screen not owner-tested
- fullscreen may exit after backgrounding
- legacy global build label may remain `0.12.1`
- static Chapter I intro says `HOTEL 1807`
- Canon title is `ROOM 1807`
- Phase II CSS header may retain an older comment while accepted final rules are appended
- Phase III CSS header says `0.16.2` while Production cache query is `v=0163`
- some internal asset queries may remain older than bootstrap query
- do not clean accepted runtime without a scoped reason
- do not clear Site Data by default because it can erase saves
- Phase IV assets are not locked until blueprint approval
- Phase V exact location, attack method, colors and asset list remain unresolved
- body hierarchy and scene function are locked

## Editorial localization debt

Phase III localization and UI language were redesigned and approved.

A broader Chapter IV Phase I and Phase II subtitle-quality language audit was previously requested but has not been implemented as a complete separate pass.

Known concerns may include:

- mixed Thai and English technical terminology
- literal technical phrasing
- some stiff dialogue or UI labels

Rules:

- do not silently rewrite frozen Phase I or II while building Phase IV
- preserve necessary immutable technical terms
- schedule the broad language audit only under direct owner instruction
- do not mistake Phase III language approval for a full Phase I/II rewrite

No owner-reported blocking runtime defect remains at the Phase III endpoint.

---

# 29. BUILD AND BASELINE HISTORY

## 0.7.x to 0.12.1

- Canon separation
- Save Manager
- Journal gates
- Chapter III routes
- Changi
- Singapore Office
- Marina Bay
- Serviced Apartment
- Hawker Centre
- Adrian
- Digital Forensics Lab
- Callback
- Season 1 accepted

## 0.13.2

- Chapter IV Phase I AFTERIMAGE
- Evidence Route Board
- North becomes Analyst of Record target
- two-hands split

## 0.14.0 to 0.14.7

- Phase II implementation
- audio balance
- takeoff ambience
- Farid remote label
- Maya role wrapping
- portrait iteration
- owner-approved initial Phase II boundary

## 0.14.8 / Bootstrap 0.16.3

- Jakarta Journal and remote-speaker-label patch
- Farid remote suffix styling
- first attempt to stabilize Character profile handling
- did not fully resolve Maya-first profile switching

## 0.14.9 / Bootstrap 0.16.4

- exact Maya detail DOM contract repair
- added required detail data attributes
- preserved central Journal gate and registry
- owner tested and approved

## Phase III 0.16.2 to 0.16.3

- replaced the dense all-at-once provenance form
- removed redundant Confidence Matrix
- introduced repeatable Evidence Review
- introduced step-by-step Packet Trail reconstruction
- introduced lawful next-lead decision
- rewrote Phase III player-facing language
- removed game-development phase language from closing dialogue
- added centered mobile modal and completion presentation
- added Farid remote-presence styling in Phase III
- owner completed and approved Phase III

## Approved runtime recovery 2026-08-01

- created `production-rebuild` from `ffdc94777c5fbaefdc281f1148b59aff3adf8abe`
- set `production-rebuild` as Default Branch
- removed obsolete `main`
- restored live playability
- owner played from Chapter I through Chapter IV Phase II
- Phase II baseline approved

## Current baseline promotion 2026-08-02

- Phase III implementation committed at `9d2219b...`
- Jakarta Journal/remote patch committed at `1407e22...`
- Maya profile-switching fix committed at `61dfaec...`
- owner played through Phase III
- owner approved the profile fix
- current runtime baseline promoted to `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
- playable boundary promoted to Chapter IV Phase III complete

---

# 30. TECHNICAL RISKS

## Future-module state pollution

Highest-priority risk:

- a future Chapter module loaded during startup must not change global chapter state
- a module definition must not unlock Character mode
- a preload must not claim active ownership of screen or checkpoint

## Character regression

Do not:

- expose Characters in Chapter I
- remove Character Mode from its normal Chapter II appearance
- gate solely on a chapter value that a future module can mutate
- add global portrait wrappers
- move Relationship
- resize all cards
- duplicate red dots
- unlock aliases
- overwrite professional portraits with swimwear art
- replace the base detail DOM contract
- assume a card opens merely because Maya opens

Mandatory sequence:

- Maya first, then every other Character.

## Global overrides

Search the full chain before editing.

## Dynamic DOM

Chapter III and IV inject DOM at runtime. Bind only after injection.

## Observer proliferation

Do not add observers when direct binding, CSS or explicit resume can solve the problem.

## Audio overlap

Trace base audio, stabilization, scene-local audio and lifecycle before adding playback.

## Save compatibility

Every future screen must be added to:

- labels
- restore preparation
- resume
- audio reconstruction
- menu and Save controls
- state defaults
- Developer jump

## Proof regression

Do not equate:

- Jakarta with Arman
- broker handle with Arman identity
- hood feed with Arman identity
- Adrian with mastermind
- 18-07 with a person
- valid credential with Elena
- witness statement with a complete legal case
- attack on North with direct proof of Elena before corroboration

---

# 31. EXACT NEXT-CHAT OPERATING INSTRUCTION

A new assistant must behave as though the owner has said:

> Continue LAST WITNESS from the owner-approved Production baseline.
> Repository: `grolygori789-crypto/last-witness`.
> Production and Default branch: `production-rebuild`.
> Owner-approved runtime baseline commit: `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`.
> Read `GAME_MASTER_PLAN.md` from beginning to end before proposing anything.
> A later commit containing only this plan is documentation-only and must not be mistaken for a new runtime build.
> Chapter I through Chapter IV Phase III passed owner Android Chrome testing.
> Current endpoint is `NEXT · THE MAN BEHIND THE ALIAS`.
> Phase IV is the next production target and is not implemented.
> Do not touch, restore, merge, rebase or rebuild approved Chapter I, II, III or Chapter IV Phase I to III.
> Do not write to GitHub without exact current-turn authorization.
> Work locally and deliver a ZIP.
> Before Phase IV implementation, audit startup load order, global state mutation, Save/Load, Character Journal gates, Case File, audio and Developer Mode.
> Chapter I must remain free of Character mode.
> Character Mode must continue to appear normally in Chapter II.
> Loading a future module must not set `state.chapter = 4` or unlock Arman.
> Phase IV initialization must occur only on Phase IV entry, resume or intentional Developer jump.
> Preserve Maya's approved assets and profile contract.
> Test Developer Unlock, open Maya first, then open every other profile.
> Farid remains remote in Singapore and his remote suffix uses blue styling.
> Phase IV reveals Arman's physical identity only after source behavior and physical corroboration.
> Arman is not mastermind and not decision owner.
> Obtain owner approval of the Phase IV implementation and asset blueprint before coding or asset production.

---

# 32. COPY-PASTE PROMPT FOR NEW CHAT

```text
บิ๊ว เราจะทำโปรเจกต์ LAST WITNESS ต่อจาก Production ที่อนุมัติล่าสุดครับ

ก่อนตอบหรือเสนอการแก้ไข ให้เปิดและอ่าน GAME_MASTER_PLAN.md ล่าสุดจาก GitHub ตั้งแต่ต้นจนจบ แล้วตรวจ Runtime ปัจจุบันจริง ห้ามใช้ความจำ ZIP เก่า Branch เก่า หรือ Phase III เก่าแทนไฟล์บน Production

ข้อมูลหลัก
- Repository: grolygori789-crypto/last-witness
- Production และ Default Branch: production-rebuild
- Owner-approved Runtime Baseline: 61dfaec35cb8990ac9ea3fafa28d39bee8e4698f
- หลังอัปโหลด Master Plan อาจมี Commit ใหม่ที่แก้เฉพาะเอกสาร ห้ามตีความว่าเป็น Runtime Build ใหม่
- Live game: https://grolygori789-crypto.github.io/last-witness/
- Chapter I, II, III และ Chapter IV Phase I-III ผ่านการเล่นจริงของพี่บน Android Chrome แล้ว
- จุดจบปัจจุบัน: CHAPTER IV PHASE III COMPLETE / PACKET TRAIL RECONSTRUCTED / NEXT: THE MAN BEHIND THE ALIAS
- Phase IV ยังไม่ Implement
- Runtime ตั้งแต่ Chapter I ถึง Phase III ถูก Freeze ห้ามแตะจนกว่าพี่จะสั่งตรงๆ

กฎเด็ดขาด
1. เรียกพี่ว่า “พี่เบนซ์” และเรียกตัวเองว่า “บิ๊ว”
2. ห้าม Push Commit Branch Merge Rebase Delete Restore หรือแก้ GitHub โดยไม่มีคำสั่งชัดเจนในข้อความปัจจุบัน
3. ทำงานในเครื่องและส่ง ZIP ให้พี่อัปโหลด
4. ห้ามอ้าง Android Test หรือ Live Test ถ้าไม่ได้ทำจริง
5. ทุกคำว่าเสร็จต้องมี Artifact เปิดได้จริง
6. ตรวจ index.html, load order, cache query, dynamic injection, Save/Load, audio owner, Character Journal, Case File และ Developer Mode
7. แก้ไฟล์ให้น้อยที่สุด
8. ห้ามสร้าง observer polling global audio manager หรือ state repair ซ้อนโดยไม่มีหลักฐาน
9. ห้ามขอให้พี่เล่า Canon หรือส่ง Asset เดิมซ้ำก่อนตรวจ GitHub
10. Suggested Commit Name ต้องแสดงชัดเจน ไม่เกิน 50 ตัวอักษร และใส่ในเอกสารติดตั้งด้วย

Regression Gate สำคัญที่สุด
- Chapter I ต้องไม่มี Character mode
- ห้ามมี Character unlock toast ใน Chapter I
- Character Mode ต้องปรากฏตามปกติใน Chapter II
- ห้ามแก้ Gate เดิมของ Chapter II เพื่อซ่อม Jakarta
- ห้ามมีตัวละครอนาคตโผล่ก่อนเวลา
- Future module ที่ถูกโหลดห้ามเขียน state.chapter = 4
- Future module ห้ามเปลี่ยน screen checkpoint Journal หรือ unlock ตอน startup
- Phase IV initialization ต้องเกิดเฉพาะตอนเข้า Phase IV, Resume Phase IV หรือ Developer Jump ที่ตั้งใจ
- ก่อนส่ง Phase IV ต้องทดสอบ New Game Chapter I, Chapter II unlock, Dev Unlock All, Save/Load และ Phase III entry
- ใน Jakarta ต้องทดสอบลำดับ Dev Unlock → เปิด Maya → กลับ → เปิดตัวละครอื่นทุกคน

Canon หลัก
- A valid credential proves access, not identity.
- Benedict อายุ 42 เป็น protagonist และผู้ตัดสินใจมนุษย์
- North อายุ 32 เป็น Technical Lead และคู่หูหลัก ไม่ใช่เหยื่อ passive
- Elena คือ Mastermind และฆาตกรจริง แต่ห้าม Villain Coding ก่อนหลักฐานพอ
- Adrian มีส่วนผิดแต่ไม่ใช่ Mastermind
- Arman/PALIMPSEST เป็น Toolmaker/Wrapper Specialist แต่ไม่ใช่ Decision Owner
- Chapter III hood feed เป็น Digital Mask ไม่ใช่หลักฐานตัวตน
- Phase III พิสูจน์ Tool Origin, Jakarta Handoff และ Bangkok Deployment แต่ Decision Owner ยังไม่ทราบ
- Maya เป็นตำรวจไซเบอร์อินโดนีเซีย ไม่มี romance กับ Benedict
- Cheryl มีความรู้สึกต่อ Benedict แต่คดีมาก่อน
- Benedict สุดท้ายไม่เลือกคู่รักถาวร
- Farid สนับสนุนระยะไกลจาก Singapore และคำสถานะ Remote ใช้สีฟ้า
- Chapter I victim คือ Kawin แต่ผู้เล่นยังไม่รู้จน Chapter V
- R. เชื่อมกับ Rinrada และ Registrar role
- Historical truth คงที่ทุก Ending

สถานะ Chapter IV
1. AFTERIMAGE ผ่านและ Freeze
2. JAKARTA ARRIVAL ผ่านและ Freeze
3. PACKET PROVENANCE / PACKET TRAIL ผ่านและ Freeze
4. THE MAN BEHIND THE ALIAS คือ Target ถัดไป
5. NORTH IS MARKED มีภารกิจแฝงตัวในรีสอร์ต โรงแรม สระว่ายน้ำหรือชายฝั่งอินโดนีเซีย
6. THE FALSE SUCCESS ทำให้คนร้ายเชื่อว่า North ถูกกำจัด
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

งานแรกของห้องใหม่
1. ยืนยัน Branch และ Runtime Baseline
2. อ่าน Phase III endpoint และ Phase IV plan
3. ตรวจ Character Journal regression ก่อนเสนอ Implementation
4. ออกแบบ Phase IV blueprint และ asset list ที่จำเป็นจริง
5. ห้ามสร้าง Asset หรือเขียนโค้ดจน Blueprint ได้รับอนุมัติ
6. สรุปผลตรวจแบบชัดเจนและไม่ให้พี่รอโดยไม่มี Deliverable
```

---

# 33. MASTER PLAN UPDATE PROTOCOL

Update this file whenever any change occurs to:

- Production branch
- Default Branch
- approved runtime baseline
- owner acceptance
- playable boundary
- Canon
- owner secret
- character role
- Character Journal gate
- Character Journal DOM contract
- Save schema
- storage key
- runtime path
- load order
- audio owner
- asset path
- new phase
- known or resolved defect
- next target
- ending architecture
- visual and body Canon
- North threat or false-success operation

Before replacement:

1. fetch the latest file
2. preserve Canon
3. preserve unresolved mysteries
4. preserve owner secrets
5. preserve workflow
6. preserve technical ownership
7. record owner result
8. keep exact filename
9. record replaced blob SHA
10. include local SHA-256
11. distinguish runtime changes from documentation-only changes
12. remove stale endpoint claims
13. preserve unresolved editorial debt instead of silently declaring it complete

---

# 34. CURRENT CANON SUMMARY

## Confirmed to player after Phase III

- Room 1807 staged
- Room 1807 victim not Daniel
- Daniel investigated the pattern
- Daniel dead
- 18-07 is a profile, not a person
- science genuine
- chronology engineered
- Daniel did not travel
- records travelled
- two headers validate
- eleven-minute policy exists
- raw order differs from display
- Marina Bay exit not source
- serviced apartment handoff not occupant proof
- Adrian former architect, not proven mastermind
- PALIMPSEST tool family and alias
- Jakarta infrastructure nexus, not identity
- watcher entered through trusted Bangkok chain
- cleanup separate
- route points Jakarta
- deployment and decision path point Bangkok
- North recognized as analytical role
- token genuine and single-use
- Jakarta broker route real
- PALIMPSEST build origin established
- broker handoff layer established or supported
- Bangkok deployment condition supported
- decision owner unresolved
- controlled observation of broker handle authorized
- next lead is the man behind the alias
- Phase III complete

## Secret owner truth

- Elena mastermind
- Elena killed Kawin
- Elena killed Daniel
- Chapter I victim is Kawin
- `R.` connects to Rinrada
- Rinrada is living Last Witness
- Elena owns decision layer
- Adrian not mastermind
- Arman not decision owner
- North targeted
- Elena decides North must be removed
- historical truth fixed
- four major endings
- Benedict chooses no permanent partner
- Chapter IV has eight phases
- Phase V contains resort or pool surveillance
- Maya most voluptuous
- Cheryl athletic-curvy
- North lean-fit
- Phase V attack enables Phase VI false success

## Unresolved to player after Phase III

- Room 1807 victim identity
- identity of `R.`
- warning caller
- pier meeting
- operator at 05:47
- operator at 06:09
- watcher deployment controller
- PALIMPSEST human identity
- Arman identity
- exact broker-handle owner
- decision owner
- Elena path
- living Last Witness
- final admissible case
- exact attack on North
- exact resort contact and location

---

# 35. OWNER-CONFIRMED VISUAL-STORY ADDENDUM

This section overrides older planning text that contradicts it.

Locked facts:

1. Chapter IV has exactly eight phases.
2. Phase III is complete and owner-approved.
3. Phase IV is `THE MAN BEHIND THE ALIAS`.
4. North becomes a direct threat because her analysis reaches attribution.
5. The adversary plans to eliminate North.
6. Phase V is the natural placement for the undercover resort sequence.
7. Location is selected by Phase IV evidence.
8. North, Cheryl and Maya use tourist cover and distinct bikinis.
9. Maya is most voluptuous.
10. Cheryl is athletic-curvy and slightly less full-figured than Maya.
11. North is leanest, healthy, fit and agile.
12. Identity and competence remain intact.
13. The scene serves surveillance and threat escalation.
14. It leads to Phase VI false success.
15. It is not disposable fan service.
16. It is not a romance route.
17. Anatomy, clothing and mobile framing must remain realistic.
18. Farid remains visibly remote while in Singapore.
19. Arman's physical reveal must not imply mastermind guilt.

Asset timing:

- assets through Phase III already exist in GitHub
- do not request old folders again before inspecting paths
- Phase IV is the first current target likely to require a new character asset package
- Phase IV assets require an approved blueprint
- Phase V requires a separate approved asset blueprint before creation

---

# 36. APPROVED BASELINE PRESERVATION LOCK

The following is the authoritative frozen record:

```text
Repository:
grolygori789-crypto/last-witness

Production and Default Branch:
production-rebuild

Owner-Approved Runtime Baseline Commit:
61dfaec35cb8990ac9ea3fafa28d39bee8e4698f

Historical Phase II Baseline Commit:
ffdc94777c5fbaefdc281f1148b59aff3adf8abe

Latest Approved Runtime Build:
0.16.4

Latest Approved Narrative Module:
Chapter IV Phase III 0.16.3

Approved Playable Scope:
Chapter I
Chapter II
Chapter III
Chapter IV Phase I
Chapter IV Phase II
Chapter IV Phase III

Current Endpoint:
CHAPTER IV · PHASE III COMPLETE
PACKET TRAIL RECONSTRUCTED
NEXT · THE MAN BEHIND THE ALIAS

Phase IV:
NOT IMPLEMENTED
IMMEDIATE NEXT PRODUCTION TARGET

Owner Result:
PLAYED ON ANDROID CHROME
PASSED THROUGH PHASE III
MAYA PROFILE SWITCHING PASSED
OWNER-APPROVED

Runtime Status:
FROZEN UNTIL DIRECT OWNER INSTRUCTION
```

Do not replace this file without preserving:

- branch and baseline distinction
- current approved commit `61dfaec...`
- owner approval through Phase III
- Chapter I Character gate
- normal Chapter II Character Mode appearance
- Dev Unlock behavior
- Maya profile-switching fix and DOM contract
- Farid remote label and blue remote suffix
- Phase I, II and III frozen status
- Maya visual lock
- current bootstrap order
- Save/Load continuity
- fullscreen and audio lifecycle
- Character Journal layout
- Character Journal detail contract
- Chapter I to III Canon
- Daniel death lock
- Room 1807 victim separation
- Daniel timeline
- Chapter III puzzle solutions
- Chapter IV Phase I, II and III proof boundaries
- Phase III implemented flow and solutions
- Phase IV next-target status
- startup side-effect prohibition
- Elena secret
- Adrian and Arman boundaries
- Kawin and Rinrada forward Canon
- relationship and ending Canon
- Chapter IV to VII plan
- alternate ending architecture
- Chapter IV eight-phase lock
- North elimination threat
- Phase V undercover scene
- body and swimwear differentiation
- Phase V to VI false-success continuity
- asset timing and no-resend rule
- unresolved Phase I/II localization audit
- new-chat handoff
- efficient minimal working discipline

# END OF MASTER PLAN
