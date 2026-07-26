# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-07-26  
> **Current owner-confirmed production baseline:** `BUILD 0.10.9E`  
> **Latest verified production commit at preparation time:** `737b498ceae4dc17ea758feead6ec550b7cafc2c`  
> **Owner result:** `PASSED - ALL PLAYABLE SCENES THROUGH CHAPTER III PHASE V: MARINA BAY`  
> **Current normal playable boundary:** `PHASE V COMPLETE -> PHASE VI SERVICED APARTMENT WIP FALLBACK`  
> **Next production target:** `CHAPTER III - PHASE VI: SERVICED APARTMENT / SUSPECTED SAFEHOUSE`
>
> This document replaces the previous `GAME_MASTER_PLAN.md` revision dated 2026-07-24.
>
> GitHub runtime files on `restore-game-recovered` remain the Source of Truth for deployed code, paths, assets and load order.  
> This file is the Source of Truth for Canon, owner-confirmed status, workflow, architecture, production history, unresolved mysteries, future phase design and the exact continuation point for a new chat.

---

# 0. EXECUTIVE HANDOFF

## Project identity

- Game: **LAST WITNESS**
- Studio: **BENEDICT INTERACTIVE**
- Repository: `grolygori789-crypto/last-witness`
- Production branch: `restore-game-recovered`
- Live game: `https://grolygori789-crypto.github.io/last-witness/`
- Primary planning file: `GAME_MASTER_PLAN.md`
- Target: mobile-first browser narrative game
- Primary orientation: portrait 9:16
- Primary owner test platform: Android Chrome
- Genre: Narrative Detective Adventure / Interactive Crime Investigation
- Current production build: `0.10.9E`
- Current completed playable content: Chapter I through Chapter III Phase V
- Immediate next implementation: Chapter III Phase VI

## Core investigative principle

> **A valid credential proves access, not identity.**

The game repeatedly separates:

1. what physically happened
2. what records claim happened
3. which role, credential or permission was accepted
4. which device or route an event claimed
5. who actually operated the system
6. who designed the larger plan

Never collapse those layers into one conclusion.

## Current owner-confirmed playable scope

The owner has tested and accepted:

1. Chapter I - `ROOM 1807`
2. Chapter II - `THE PERFECT STRANGER`
3. Chapter II ending - `THE ELEVEN-MINUTE LIE`
4. Chapter III Phase I - Detective Office / Timeline Reconstruction
5. Chapter III Phase II - Bangkok to Singapore / Takeoff and In-flight
6. Chapter III Phase III - Changi Airport
7. Chapter III Phase IV - Singapore Investigation Office
8. Chapter III Phase V - Marina Bay
9. Character Journal through Cheryl and Farid
10. Evidence inspection action layout through build `0.10.9E`
11. Android background-audio pause and scene-aware resume behavior
12. Current Save/Load, fullscreen, Case File, Character Journal and Developer Mode behavior relevant to the completed scope

## Current legitimate endpoint

After Phase V completes, the runtime routes to the existing `chapter3Wip` fallback with Phase VI copy:

- title: `PHASE VI · SERVICED APARTMENT`
- the managed-network lead identifies a serviced apartment that may be operating as a safehouse
- lawful site verification is justified
- progress is saved
- player may return to title

This is the current intended endpoint, not a defect.

## Immediate next job

**Chapter III Phase VI - Serviced Apartment / Suspected Safehouse**

Do not begin with asset production.

Begin with:

1. fetch latest GitHub
2. confirm `BUILD 0.10.9E` remains the branch baseline
3. inspect Phase V completion and fallback ownership
4. design the Phase VI blueprint
5. define evidence purpose, scene state, Save/Load fields, minigame lifecycle and transition to Phase VII
6. obtain owner approval for the blueprint
7. implement the fewest files required

---

# 1. COMMUNICATION AND OWNER WORKFLOW

## Conversation style

- Address the owner as **พี่เบนซ์**
- Refer to the assistant as **บิ๊ว**
- Use a feminine Thai voice
- Use direct, natural Thai
- Do not make the owner repeat facts already recorded here
- Be candid about uncertainty
- Do not describe static checks as real-device tests
- Do not claim success until the owner tests the build

## GitHub ownership

The owner uploads files personally.

The assistant must never:

- create a branch
- push
- commit
- update GitHub directly
- delete repository files
- modify GitHub Pages directly
- change repository structure without owner approval

The assistant must:

1. fetch the latest production branch
2. inspect the current runtime ownership
3. work locally
4. test honestly
5. deliver the replacement files
6. preserve repository-relative paths
7. provide changed-file list
8. provide SHA-256
9. let the owner upload

## Delivery preference

For code changes:

- deliver one ZIP
- preserve repository paths
- include a manifest
- include upload instructions
- include a test report
- include SHA-256

For a single planning document such as this file:

- deliver `GAME_MASTER_PLAN.md` directly
- keep the filename exact
- provide SHA-256

---

# 2. NON-NEGOTIABLE STARTUP PROCEDURE FOR EVERY NEW CHAT

Before editing any project file:

1. Fetch the latest `GAME_MASTER_PLAN.md`.
2. Fetch the latest `index.html`.
3. Confirm the branch is `restore-game-recovered`.
4. Check the latest commit.
5. Confirm current cache-query versions and script load order.
6. Fetch every file connected to the requested task.
7. Inspect for:
   - overwritten global functions
   - capture listeners
   - bubbling listeners
   - MutationObservers
   - timers
   - state repair
   - Save/Load restore logic
   - dynamic script loading
   - audio ownership
   - compatibility shims
8. Prove the root cause or identify the correct implementation owner.
9. Patch the fewest files possible.
10. Run syntax and static validation.
11. Test the actual affected flow where the environment permits.
12. State exactly what was and was not tested.
13. Deliver locally. Do not write to GitHub.

Never patch from:

- memory alone
- an old ZIP
- a previous chat attachment
- an older branch copy
- a generated reconstruction of a current runtime file

A local package may be used only after proving its base file matches the latest GitHub blob byte-for-byte.

---

# 3. SOURCE-OF-TRUTH HIERARCHY

1. **Latest GitHub runtime on `restore-game-recovered`**
   - code
   - assets
   - paths
   - current load order
   - deployed behavior

2. **Latest `GAME_MASTER_PLAN.md`**
   - Canon
   - owner-confirmed production status
   - intended story design
   - owner secrets
   - unresolved mysteries
   - future phases
   - workflow and testing rules

3. **Owner's newest real-device result**
   - final truth for visible behavior
   - overrides assumptions from static inspection

When runtime and plan conflict:

- inspect both
- identify which is stale
- do not rewrite Canon to match an accidental code defect
- do not rewrite working code to match an outdated plan
- ask only when the conflict cannot be resolved from evidence

---

# 4. CURRENT PRODUCTION STATUS

## Baseline

**LAST WITNESS BUILD 0.10.9E**

Status:

`OWNER-CONFIRMED PASSED`

Latest verified commit when this document was prepared:

`737b498ceae4dc17ea758feead6ec550b7cafc2c`

## Stable confirmed scope

- Chapter I complete
- Chapter II complete
- Chapter III Phase I complete
- Chapter III Phase II complete
- Chapter III Phase III complete
- Chapter III Phase IV complete
- Chapter III Phase V complete
- Phase V exit to Phase VI fallback works
- Fullscreen controls
- Save Manager modal in fullscreen
- title/settings Exit Game flow
- Character Journal story gates
- Cheryl and Farid Character Journal integration
- exact restored Character Journal card layout
- Case File normal progression
- Developer Unlock All without normal-story leakage
- Changi evidence and Passenger Trail Reconciliation
- Singapore Office evidence and Limited Header Comparison
- Marina Bay evidence and Confidence Review
- evidence single-button centering across scoped evidence panels
- Inspect magnifier icon
- hidden misleading `Tap evidence to inspect` hint
- Android background audio pauses when app is backgrounded or screen is locked
- correct scene audio is reconstructed when the game returns
- rain loop boundary is tightened
- owner accepts that mobile browser fullscreen may be lost after returning from background

## Current playable boundary

> **Phase V complete -> Phase VI WIP fallback**

There is no implemented Phase VI investigation yet.

## Next production target

> **Chapter III Phase VI - Serviced Apartment / Suspected Safehouse**

---

# 5. VERIFIED GITHUB SNAPSHOT

Snapshot verified while preparing this document on 2026-07-26.

This table is informational. Every future chat must fetch again.

| Path | Verified blob SHA | Current role |
|---|---|---|
| `GAME_MASTER_PLAN.md` | `c79f61b25807aada4eae93f74afb99f67cb44340` | old plan replaced by this revision |
| `index.html` | `e30f3fb1f20399d51de9aba220802361a5da15d9` | static DOM and static load order |
| `css/style.css` | `1d832019740cd8c00afc6a4c647c3f095dd874d6` | global UI and evidence-card base styles |
| `css/chapter-03-phase-04.css` | `4aa34fcd126e18ab41aa2833b0142d5dab0d3a6e` | Phase IV UI and portrait rendering |
| `css/chapter-03-phase-05.css` | `49c7fd677aa6efd50500c48c06a6708a62ae4b6b` | Phase V Marina Bay UI |
| `js/engine/02-audio-save.js` | `2668239dcd375b210a90856d132d19c4f2464410` | Save Manager and base audio |
| `js/engine/06-content-registry-dev.js` | `2f3199ec29abd9392c1e419493d21b4fcce0b173` | Character Journal, Case File registry and Developer integration |
| `js/engine/11-production-stabilization.js` | `a0869df63e607d2388bdc905181d1bd6e9c3e5a5` | scene-aware production audio and evidence cues |
| `js/engine/12-investigation-lifecycle.js` | `be3c09f87c7644cbb9adcea3097035613e835307` | shared narrative-first investigation lifecycle |
| `js/engine/13-fullscreen-display.js` | `22340bb5030f082b9d725ad07830095f02bd3be9` | fullscreen and Exit Game |
| `js/engine/14-character-canon.js` | `f2c68f568efb2e8089735111cd6dcdde843e63a8` | Character Journal Canon overlay |
| `js/chapters/chapter-02/05-chapter2-integration.js` | `bcff0fbf41fd14677936c8a92140201ed6674f45` | build label, Chapter III loader, mobile lifecycle guard and evidence action polish |
| `js/chapters/chapter-03/01-title-phase1.js` | `6e108c3475589e708262474260c2128941b9df0c` | Phase I and Phase II |
| `js/chapters/chapter-03/02-changi-airport.js` | `df50301acf1624182ee3733960df7d9c12bb1ece` | Phase III |
| `js/chapters/chapter-03/03-singapore-office.js` | `e988ca6b6cbac5bf8b50e0738ebd5e83a3582f38` | Phase IV |
| `js/chapters/chapter-03/04-marina-bay.js` | `97a2ce875033cdc34b84891a6bfcbbc4d08730b3` | Phase V |

---

# 6. CURRENT LOAD ORDER

## Static CSS order

The current static page loads:

1. `css/style.css`
2. `css/forensic-phase.css`
3. `css/medical-examiner.css`
4. `css/investigation-lifecycle.css?v=0711`
5. `css/fullscreen-display.css?v=0802`
6. `css/chapter-03-phase-04.css?v=0930`

Chapter III base, Changi and Phase V CSS are loaded dynamically by the Chapter II integration runtime.

## Static JavaScript order

1. `js/engine/01-runtime-data.js`
2. `js/engine/02-audio-save.js?v=0710`
3. `js/engine/03-journal-progress.js`
4. `js/engine/04-ui-dialogue.js`
5. `js/engine/05-developer-tools.js`
6. `js/chapters/chapter-02/01-cafe-police.js?v=0710`
7. `js/chapters/chapter-02/02-apartment-office.js?v=079`
8. `js/chapters/chapter-01/chapter-01.js`
9. `js/engine/06-regression-fixes.js`
10. `js/chapters/chapter-02/03-forensic-science.js?v=0711`
11. `js/engine/07-dialogue-continuity.js`
12. `js/engine/08-stability-repair.js`
13. `js/chapters/chapter-02/04-medical-examiner.js?v=0711`
14. `js/chapters/chapter-02/05-chapter2-integration.js?v=0930`
15. `js/engine/06-content-registry-dev.js?v=079`
16. `js/engine/14-character-canon.js?v=0920`
17. `js/engine/09-defect-hotfix.js`
18. `js/engine/10-defect-repair-0.4.0.js`
19. `js/engine/12-investigation-lifecycle.js?v=0801`
20. `js/engine/13-fullscreen-display.js?v=0802`

Some historical repair files may be disabled internally. Inspect runtime behavior rather than judging only by filenames.

## Dynamic Chapter III order

`05-chapter2-integration.js` loads:

### CSS

1. `css/chapter-03.css?v=074`
2. `css/chapter-03-phase-03.css?v=0801`
3. `css/chapter-03-phase-05.css?v=0109`

### JavaScript

1. `js/chapters/chapter-03/01-title-phase1.js?v=0920`
2. `js/chapters/chapter-03/02-changi-airport.js?v=0920`
3. `js/chapters/chapter-03/03-singapore-office.js?v=0109`
4. `js/chapters/chapter-03/04-marina-bay.js?v=0109`

This sequence is mandatory.

Do not add Phase III, IV or V as independent static script tags.

Phase VI should be added to this dynamic chain only after its runtime is implemented and its restore order is understood.

---

# 7. RUNTIME OWNERSHIP MAP

## `01-runtime-data.js`

Owns:

- base state
- localization dictionary
- base portrait registry
- clue data
- base audio references
- legacy save keys
- shared `$` and `$$` in the classic-script environment

## `02-audio-save.js`

Owns:

- Auto Save
- named manual saves
- IndexedDB save slots
- localStorage fallback
- export/import `.lwsave`
- delete
- restore snapshots
- legacy migration
- base volume controls
- Police clean-loop boundary

## `03-journal-progress.js`

Contains legacy helpers:

- relationship helpers
- portrait lookup
- legacy journal rendering
- progress helpers

It is not the authoritative current Character Journal owner.

## `04-ui-dialogue.js`

Owns base:

- `show(screen)`
- screen transitions
- chapter intro
- dialogue runtime before later overrides
- base evidence entry
- some late Chapter II repair behavior

## `05-developer-tools.js`

Owns:

- Developer access
- base Developer scene jumps
- reset tools

Developer access code:

`room1807`

Never expose Developer Mode in normal UI.

## `06-regression-fixes.js`

Important active override:

- replaces global `runDialogue`
- live TH/EN dialogue handling
- history recording
- Police evidence repair
- Case File repair
- Save button rebinding

Any dialogue or Police evidence work must inspect this file.

## `07-dialogue-continuity.js`

Owns the normalized prompt:

- `TAP TO CONTINUE`
- `แตะเพื่อดำเนินต่อ`

Do not add another prompt observer.

## `08-stability-repair.js`

Owns:

- immediate embedded-WAV click
- pointerdown response
- duplicate touch suppression
- legacy click suppression
- several portrait/UI/state repairs
- dynamic load of `11-production-stabilization.js`

## `11-production-stabilization.js`

Primary production owner for:

- scene-aware ambience
- Room 1807 audio
- Apartment audio
- Forensic audio
- Medical audio
- evidence collection cue
- puzzle success cue
- scanner cue
- ducking
- one-shot cleanup
- stale state repair

Do not create a third audio controller.

## `12-investigation-lifecycle.js`

Shared narrative-first investigation lifecycle.

Rules:

- dialogue must finish before hotspots activate
- review/minigame buttons must not appear behind dialogue
- no polling
- no additional MutationObserver unless unavoidable

## `13-fullscreen-display.js`

Owns:

- fullscreen entry
- automatic fullscreen attempt after user gesture
- Settings fullscreen control
- menu fullscreen control
- modal visibility within fullscreen root
- Exit Game confirmation
- browser-safe exit fallback

## `06-content-registry-dev.js`

Authoritative Character Journal and registry owner for:

- Character menu visibility
- story gates
- canonical Character Cards
- exact card markup
- unread arrays
- red dots
- Character detail view
- Case File registry
- Ratchata fallback
- Cheryl/Farid migration
- Developer unlock all
- stale filtering
- storage persistence

Storage key:

`lastWitness.contentRegistry.v3`

## `14-character-canon.js`

One-time Canon mutation after registry load.

Current Canon entries:

1. Benedict
2. North
3. Elena
4. Somchai
5. Kittisak Siriwat
6. Ratchata (Dr. Singh)
7. Inspector Cheryl Goh
8. Farid Rahman

No polling and no observer.

## `05-chapter2-integration.js`

Current build:

`0.10.9E`

Owns:

- Chapter II to Chapter III transition
- Chapter III dynamic runtime preparation
- Chapter III save-resume preparation
- current visible build label
- Chapter III Developer jumps
- central mobile background-audio guard
- rain loop boundary guard
- Evidence action layout polish
- fallback routing

Do not turn it into a general dumping ground. New Phase VI logic should live in a dedicated Phase VI module.

## Phase I-II module

`js/chapters/chapter-03/01-title-phase1.js`

Owns:

- Chapter III title and route entry
- Phase I Detective Office
- Timeline Reconstruction
- departure decision
- takeoff transition
- Phase II in-flight scene
- Phase II state
- Phase I-II resume bridge

## Phase III module

`js/chapters/chapter-03/02-changi-airport.js`

Owns:

- Singapore arrival transition
- Changi Airport
- Phase III evidence
- Passenger Trail Reconciliation
- Changi ambience
- in-flight handoff bridge
- direct Phase IV transition
- Phase III Case File entries
- Phase III state

## Phase IV module

`js/chapters/chapter-03/03-singapore-office.js`

Owns:

- driving transition
- Phase IV location card
- Singapore Investigation Office
- Cheryl/Farid scene portraits
- office choice
- Phase IV evidence
- Limited Header Comparison
- Phase V handoff
- Phase IV ambience
- Phase IV Case File entries
- Phase IV state

## Phase V module

`js/chapters/chapter-03/04-marina-bay.js`

Owns:

- Phase V location card
- Marina Bay scene
- field approach choice
- Phase V hotspots
- three Phase V evidence items
- surveillance beat
- Confidence Review
- Phase V Case File entries
- Phase V ambience
- Phase V completion
- Phase VI WIP fallback
- Phase V state
- Phase V resume bridge

---

# 8. STATE MODEL

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
- `lwCharactersUnlocked`
- `lwCharactersUnread`
- `lwEvidenceUnlocked`
- `lwJournalEnabled`

## Phase III state

`state.chapter3.phase3`

Fields:

- `started`
- `arrivalSeen`
- `introComplete`
- `evidenceCollected`
- `puzzleAssignments`
- `puzzleComplete`
- `closingDialogueComplete`
- `complete`
- `stage`

## Phase IV state

`state.chapter3.phase4`

Fields:

- `started`
- `transitionSeen`
- `travelCardSeen`
- `introComplete`
- `choiceMade`
- `choiceKey`
- `evidenceCollected`
- `matrixAssignments`
- `matrixComplete`
- `closingDialogueComplete`
- `complete`
- `stage`

## Phase V state

`state.chapter3.phase5`

Fields:

- `started`
- `locationCardSeen`
- `introComplete`
- `choiceMade`
- `choiceKey`
- `evidenceCollected`
- `confidenceAssignments`
- `controlledProbeComplete`
- `surveillanceBeatSeen`
- `managedNetworkLeadFound`
- `interactionComplete`
- `closingDialogueComplete`
- `complete`
- `stage`

## Planned Phase VI state

Do not implement before the Phase VI blueprint is approved.

Recommended initial shape:

`state.chapter3.phase6`

Possible fields:

- `started`
- `locationCardSeen`
- `introComplete`
- `entryChoiceMade`
- `entryChoiceKey`
- `evidenceCollected`
- `credentialFragments`
- `safeCodeAttempts`
- `credentialUnlockComplete`
- `encryptedDriveFound`
- `architectureDocumentFound`
- `burnerPhoneFound`
- `fragmentReconstructionComplete`
- `adrianPresenceUnproven`
- `closingDialogueComplete`
- `complete`
- `stage`

The final fields must follow the approved Phase VI design. Do not create speculative flags merely to make controls appear.

## State ownership rule

Before writing a state field, identify:

- initializer
- persistence owner
- restore owner
- UI derivation
- migration behavior
- stale-state repair
- later override

Never write a flag only because it makes a button visible.

---

# 9. SAVE / LOAD

## Storage

Auto Save:

`last_witness_rc1_auto`

Legacy manual key:

`last_witness_rc1_manual`

Named Save IndexedDB:

- database: `last_witness_saves`
- store: `slots`
- key path: `id`
- index: `updatedAt`

Fallback:

`last_witness_named_saves_v1`

## Features

- multiple named slots
- overwrite confirmation
- Auto Save card
- Load
- Export
- Import
- Delete
- mobile footer
- top `×`
- footer `CLOSE`
- backdrop close
- Escape close
- busy-state protection
- automatic close after a successful save

## Snapshot coverage

Includes:

- current screen
- found evidence
- dialogue history
- chapter
- progress
- checkpoint
- character state
- relationships
- flags
- personality
- journal
- forensic
- medical
- Chapter III state
- canonical character arrays
- unread arrays
- evidence registry
- language
- sound
- music
- sfx

## Chapter III restore requirement

Before restoring a Chapter III screen:

1. load Phase I-II runtime
2. load Changi runtime
3. load Phase IV runtime
4. load Phase V runtime
5. restore snapshot
6. call the appropriate resume bridge
7. reconstruct scene audio
8. reconstruct overlay, dialogue, hotspot and button lifecycle

When Phase VI is implemented, it must be inserted into this preparation order before restoring a Phase VI screen.

Do not blindly resume media from stale element state.

## Save compatibility rule for Phase VI

Any Phase VI implementation must cover:

- fresh entry
- Auto Save
- named save
- load during entry choice
- load during investigation
- load before credential puzzle
- load during puzzle
- load after puzzle
- load before closing dialogue
- completed Phase VI resume
- Return to Title and Continue
- export/import

---

# 10. CHARACTER JOURNAL

## Story gates

### Chapter I

- Character menu hidden
- no Character Cards
- stale entries filtered

### Chapter II opening

Before the full Benedict/North office conversation ends:

- Character menu hidden
- North not unlocked

After conversation completion:

- Benedict unlocked
- North unlocked
- one feature toast
- North unread
- one red dot

### Later Chapter II

- Elena after proper Café introduction
- Somchai and Kittisak after Police introduction
- Ratchata at Medical Examiner

### Chapter III Phase IV

- Cheryl unlocks after her formal introduction / Phase IV choice progression
- Farid unlocks after his formal introduction and technical participation
- migration may restore missing Cheryl/Farid entries from legitimate Phase IV state
- migrated unread dot appears once
- Save/Load must not duplicate the dot
- Developer jump may prime them quietly without unread dots

## Current exact card layout

Build `0.10.9A` restored the accepted Character Journal structure.

Do not reintroduce the rejected wrapper layouts from `0.10.4` to `0.10.7`.

Accepted card structure:

- raw portrait `<img>`
- portrait approximately `78 × 88`
- name positioned at the upper-right of the portrait
- status directly beneath the name
- Relationship remains in the original information column
- no 54×54 portrait wrapper
- no oversized portrait card
- no Relationship column pushed unnaturally to the right
- no CSS scaling trick

## Current Character Journal Canon

### Benedict

- Age: 42
- Role: Detective / นักสืบ
- Status: Lead Investigator / หัวหน้าผู้สืบสวน
- protagonist
- calm and observant
- natural humour
- does not accuse without evidence
- final decision-maker

### North

- Age: 32
- Role: IT Specialist / ผู้เชี่ยวชาญด้านไอที
- Status: Trusted Partner / คู่หูที่ไว้ใจได้
- precise technical investigator
- dry wit
- rejects unsupported conclusions
- leads system analysis
- does not replace Benedict

### Elena

- Role: Forensic Analyst / นักวิเคราะห์นิติวิทยาศาสตร์
- Status: Professional Contact / ผู้ร่วมงานในคดี
- publicly credible
- gives useful true information
- do not imply villainy in public Character Journal copy

### Somchai

- Role: Police Officer / เจ้าหน้าที่ตำรวจ
- Status: Cooperative / ให้ความร่วมมือ
- theatrical and flirtatious
- competent once focused

### Kittisak Siriwat

Display:

- English: `Kittisak Siriwat`
- Thai: `กิตติศักดิ์ ศิริวัฒน์`

Role:

- Police Captain
- Thai: ร้อยตำรวจเอก

Status:

- English: `Reserved`
- current Thai runtime: `ระมัดระวังตัว`

The owner discussed `สงวนท่าที` as a more literal Thai option but did not order the change.

Do not alter during unrelated work.

### Ratchata (Dr. Singh)

Display name must remain exactly:

`Ratchata (Dr. Singh)`

- Age: 43
- Role: Senior Medical Examiner
- Thai Sikh forensic pathologist
- independent expert
- dry humour
- scientifically strict

Portrait fallback:

1. `assets/images/ratchata/profile.png`
2. `assets/images/ratchata/neutral.png`

### Inspector Cheryl Goh

- Age: 40
- Role: Singapore Police Liaison
- Status: Measured Authority
- sharp, controlled and skeptical
- separates lawful access from unsupported accusation
- not a villain
- respects North after seeing her work
- remains an important potential ally

### Farid Rahman

- Age: 31
- Singaporean Malay
- Role: Digital Forensics Specialist
- Status: Collaborative Analyst
- fast and meticulous
- friendly without becoming comic relief
- works closely with North
- no romance with North
- tests claims without turning possibilities into facts

## Static status rule

Character Card status labels are currently static.

Relationship metrics may change, but status text is not recalculated.

Do not implement dynamic statuses during unrelated Phase VI work.

---

# 11. PORTRAIT MASTER STANDARD

## Priority

1. identity
2. face
3. expression
4. upper torso
5. stable framing
6. clean silhouette
7. hands/props only when they improve the frame

## Required rules

- enlarge when needed
- crop lower body freely
- crop arms or props when necessary
- face and torso readable immediately
- no stretching
- fixed canvas
- consistent anchor
- true transparent alpha
- no white halo
- no checkerboard
- no residual matte
- no white RGB in fully transparent pixels
- inspect against dark dialogue UI
- visually fit Benedict and North

## Accepted Cheryl set

Path:

`assets/images/chapter-03/phase-04/cheryl/`

Canvas:

`744 × 1000 RGBA PNG`

Files:

- `neutral.png`
- `skeptical.png`
- `side.png`
- `arms_crossed.png`
- `surprised.png`
- `thinking.png`
- `faint_smile.png`
- `explaining.png`
- `alert.png`
- `concerned.png`
- `closed_off.png`
- `reading.png`

## Accepted Farid set

Path:

`assets/images/chapter-03/phase-04/farid/`

Canvas:

`744 × 1000 RGBA PNG`

Files:

- `neutral.png`
- `side.png`
- `tablet.png`
- `smirk.png`
- `look_up.png`
- `surprised.png`
- `explaining.png`
- `amused.png`
- `thinking.png`
- `concerned.png`
- `warm_smile.png`
- `focused.png`
- `alert.png`
- `downcast.png`
- `arms_crossed.png`
- `tablet_read.png`
- `coffee.png`

## Runtime rule

- width 100%
- height 100%
- `object-fit: cover`
- `object-position: center top`
- no transform
- no forced 102% scaling

Do not reintroduce CSS transform tricks.

---

# 12. CHAPTER AND SEASON STRUCTURE

## Season 1

- Chapter I
- Chapter II
- Chapter III

Season 1 ends only after Chapter III Phase IX is complete.

Do not implement Season selection or Season UI before Phase IX is complete unless the owner explicitly changes this decision.

## Season 2

Planned:

- Chapter IV
- Chapter V
- Chapter VI
- Chapter VII

Chapter IV begins the direct danger to North.

## Chapter titles

### Chapter I

**ROOM 1807**

### Chapter II

**THE PERFECT STRANGER**

### Chapter II ending / case label

**THE ELEVEN-MINUTE LIE**

Thai:

**คำลวงสิบเอ็ดนาที**

This is not the Chapter II title.

### Chapter III

**THE BORROWED MINUTES**

Thai:

**สิบเอ็ดนาทีที่ถูกยืม**

Do not rename Chapter III to `BROKEN ALIBI`.

---

# 13. CORE STORY CANON

## Locked principles

The system can accept:

- valid credentials
- valid role profiles
- valid permission routes
- valid signatures
- claimed devices
- accepted delayed events

Those facts do not prove:

- operator identity
- physical presence
- authorship
- motive
- mastermind identity

## Scientific truth

The scientific evidence is genuine.

The chronology around the evidence is engineered.

Do not turn the plot into forged toxicology or fake science.

## Daniel death lock

Daniel Voss dies in Chapter II.

He must never:

- return alive
- become a living suspect
- become a living witness
- meet Benedict or North later
- secretly control the system after Chapter II

Daniel may continue through:

- posthumous drafts
- archived investigations
- contacts
- files
- recordings
- scheduled signals
- evidence he prepared before death

## Last Witness lock

The eventual living key implied by the title must be someone other than Daniel.

That person has not yet been introduced as the definitive Last Witness.

## Room 1807 victim lock

The Chapter I victim is not Daniel Voss.

Their identity remains unresolved.

## `R.` lock

`R.` is not confirmed as Ratchata.

Do not reveal `R.` early.

`R.` may involve:

- operational identity
- route
- registrar
- Singapore relay
- another person

No final answer is locked publicly yet.

---

# 14. CHAPTER I - ROOM 1807

Status:

`COMPLETE AND OWNER-TESTED`

## Main evidence

- Victim's Phone
- Blood-stained Cloth
- Victim's Laptop
- Half-packed Suitcase
- warning message
- missed calls from `R.`
- pier note

## Main deduction

- body moved
- room staged
- laptop activity selectively cleared
- suitcase indicates intended departure
- phone positioned for investigators
- true objects arranged into a false sequence

## Ending

Unknown caller:

> “You looked in the wrong room.”

## Unresolved

- victim identity
- full meaning of 1807
- identity of `R.`
- pier meeting
- caller identity
- reason Benedict and North were targeted

---

# 15. CHAPTER II - THE PERFECT STRANGER

Status:

`COMPLETE AND OWNER-TESTED`

Victim:

Daniel Voss, age 38.

Different victim from Chapter I.

## Phase order

1. Detective Office
2. Victim Apartment
3. Orchid Café
4. Police Station / Evidence Division
5. Forensic Science Unit
6. Medical Examiner
7. Chapter II ending

## Apartment findings

- two coffee mugs
- profile 18-07 access record
- Daniel's investigation board
- Hotel 1807 links
- “Ask E. about the corrected time”
- Orchid Café draft
- draft edited at 05:51

## Elena continuity

- North identifies `E.` through an investigative step
- Elena verifies an archived-case toxicology record
- Elena does not verify Daniel's future postmortem record before it exists
- Elena gives true information

## Police findings

- certified export
- sealed custody envelope
- accepted Evidence Division permission
- Temporary Operational Profile 18-07
- FS-12 / Terminal Three
- claimed workstation
- local session offline

## Forensic findings

- sealed sample genuine
- raw scientific result genuine
- Laboratory Accession Record at 06:17
- `COLLECTION_TIME` changed from 05:58 to 06:09
- accepted permission used
- corrected event claims FS-12
- operator unverified

## Medical findings

- biological death window precedes corrected digital collection time
- official discovery at 06:20
- Laboratory Accession Record exists at 06:17
- manipulation targeted chronology
- body cannot identify the operator

---

# 16. CANONICAL DANIEL TIMELINE

| Time | Canon event |
|---|---|
| 05:47 | Daniel's building accepts Temporary Operational Profile 18-07 |
| 05:51 | Daniel's Orchid Café draft is edited |
| 05:58 | Original toxicology sample is collected |
| 06:09 | `COLLECTION_TIME` changes from 05:58 to 06:09 using accepted Evidence Division permission |
| 06:17 | Laboratory Accession Record is created |
| 06:20 | Daniel is officially reported discovered |

## Locked terminology

### 05:47

Use:

- building accepted profile 18-07
- profile carried a resident-access role
- person not established

Do not say the credential physically entered the building.

### 06:09

- accepted Evidence Division permission
- Temporary Operational Profile 18-07
- corrected event claims FS-12
- route later reaches Singapore infrastructure
- operator unverified

### 06:17

Always means:

**Laboratory Accession Record created**

Do not casually rename it as:

- custody
- delivery
- report generation
- case creation

### 06:20

Official reported discovery of Daniel.

---

# 17. TEMPORARY OPERATIONAL PROFILE 18-07

`18-07` is not a person.

It is a Temporary Operational Profile capable of carrying accepted roles or permissions across connected systems.

## Proven at 05:47

- accepted by Daniel's building
- resident-access role
- operator unknown

## Proven at 06:09

- accepted Evidence Division permission
- changed `COLLECTION_TIME`
- corrected event claims FS-12
- local FS-12 session offline
- route reaches Singapore infrastructure
- operator unknown

Do not write dialogue that treats 18-07 as a confirmed human identity.

---

# 18. CHAPTER III OVERARCHING STRUCTURE

## Converging routes

- `chapter3_timeline`
- `chapter3_old_cases`
- `chapter3_access`

They change emphasis only.

They converge into one campaign.

## Central mechanism

Singapore is an Infrastructure Nexus for a system that can attach genuine evidence to an engineered official chronology.

Planned complete mechanism:

- offline or delayed devices create Signed Local Events
- delayed events are submitted later
- events inside an eleven-minute Reconciliation Window remain eligible
- accepted events can be ordered by Device Timestamp
- events outside the window are flagged
- an attacker exploits valid system rules

## Proof progression

Phase IV proves:

- two headers can both validate
- an eleven-minute policy exists

Phase V proves:

- a dormant subscriber reacted after the office review
- a public gateway is an exit, not a source
- the route can respond while automation remains possible
- the same short-lived token later enters a managed serviced-apartment network
- lawful site verification is justified

Still unproven after Phase V:

- raw event order
- source device
- physical operator
- human controller of the subscriber
- Adrian's involvement in the subscriber
- full exploit
- mastermind

---

# 19. PHASE I - DETECTIVE OFFICE

Status:

`COMPLETE AND OWNER-TESTED`

## Time and location

- Day 3
- 08:40 AM
- Bangkok
- Detective Office
- `THE MISSING PASSENGER`

## Findings

- foreign endpoint is Singapore
- Daniel had a real booking
- passenger movement is absent
- Daniel never checked in
- profile 18-07 carried an accepted event through Singapore infrastructure at 06:09
- booking and access trail do not prove travel

## Timeline Reconstruction solution

1. 05:47 profile accepted by building
2. 05:51 Café draft edited
3. 05:58 original sample collected
4. 06:09 collection time revised
5. 06:17 Laboratory Accession Record created
6. 06:20 official discovery

## Minigame standard

- six events
- tap-first
- mobile-friendly
- Reset available
- no permanent fail
- no softlock
- intended duration 30-60 seconds

---

# 20. PHASE II - BANGKOK TO SINGAPORE

Status:

`COMPLETE AND OWNER-TESTED`

## Media

- `assets/video/chapter-03/phase-02/airplane-takeoff.mp4`
- `assets/video/chapter-03/phase-02/airplane-takeoff-poster.jpg`
- `assets/images/chapter-03/phase-02/airplane-cabin.png`
- cabin ambience WebM preferred
- MP3 fallback

## Narrative purpose

- short travel transition
- no tourism montage
- confirms the next investigative questions
- preserves Benedict/North partner tone

## Findings carried forward

- real booking
- no Daniel check-in
- no Daniel boarding
- no Daniel immigration movement
- profile 18-07 request reached Singapore infrastructure
- Singapore Police assigned a liaison
- liaison not named before formal Phase IV introduction

## Transition rule

Changi starts only after the full in-flight dialogue finishes.

Do not bind Changi before the Phase I-II runtime and flight DOM exist.

---

# 21. PHASE III - CHANGI AIRPORT

Status:

`COMPLETE AND OWNER-TESTED`

## Time and location

- Day 3
- Early Afternoon
- Singapore
- Changi Airport
- Arrival Operations

## Tone

Operational, controlled and investigative.

The restrained chicken-rice / Prada partner exchange is approved.

Approved line:

> One more chicken-rice joke and you'll owe me a Prada by tonight.

## Evidence

### Confirmed Booking and Travel Record

Proves:

- real Bangkok-Singapore reservation
- passport details attached
- seat assigned
- no successful check-in

Does not prove Daniel created the booking or appeared.

### Passenger Movement and CCTV Index

Proves no Daniel:

- check-in
- baggage acceptance
- boarding scan
- immigration clearance
- CCTV match at expected points

### Accepted Verification Request

At 06:09:

- Singapore infrastructure relayed the request
- request references Daniel's travel identity
- carries accepted Evidence Division permission
- resolves to 18-07
- operator unverified

## Passenger Trail Reconciliation

Correct classification:

### Documents

- confirmed booking exists
- passport details and seat assignment attached

### Physical Movement

- no check-in
- no baggage
- no boarding
- no immigration
- no CCTV match

### System Access

- Singapore relayed accepted request at 06:09
- request resolves to 18-07
- operator unknown

Correct conclusion:

> The travel identity entered connected systems, but the person did not complete the journey.

## Closing

- Daniel did not travel
- records travelled
- accepted request continues into restricted SPF environment
- local liaison approved limited office review

## Transition

The old Phase III completion card is not used in normal flow.

After closing dialogue:

1. Phase III completes
2. Changi audio stops
3. Phase IV driving transition starts directly

---

# 22. PHASE IV - SINGAPORE INVESTIGATION OFFICE

Status:

`COMPLETE AND OWNER-TESTED`

## Time and location

- Day 3
- Early Evening
- Singapore Investigation Office
- `LOCAL ACCESS, LIMITED TRUST`

## Driving transition

Assets:

- `assets/video/chapter-03/phase-04/drive-to-investigation-office.mp4`
- `assets/audio/chapter-03/phase-04/drive-to-investigation-office.mp3`

Rules:

- video full-screen
- only Skip Transition over video
- no large location panel over footage
- separate location card after video
- office scene follows

## Background and ambience

- `assets/images/chapter-03/phase-04/singapore-investigation-office.png`
- `assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3`

## Formal introductions

### Inspector Cheryl Goh

- SPF liaison
- sharp
- controlled
- skeptical
- limits access
- not an obstructionist caricature
- refuses to turn a route into a suspect

### Farid Rahman

- Singaporean Malay
- Digital Forensics Specialist
- friendly and fast
- works with North
- no romance
- not comic relief

## Player choice

1. Evidence first
2. Urgency
3. Cooperate with read-only limit

All converge.

## Access level

Available:

- certified headers
- relay acknowledgements
- policy marker

Restricted:

- Raw Reconciliation Record
- raw event order
- source device
- operator

## Evidence

### Relay Acknowledgement

Proves:

- 06:09 verification event acknowledged
- accepted Evidence Division permission
- resolves to 18-07
- operator unknown

### Validation Headers

Proves:

- original header 05:58
- corrected header 06:09
- both signatures validate
- corrected event claims FS-12
- raw order restricted

### Policy Marker

Proves:

- eleven-minute reconciliation rule exists
- signed delayed events inside the window remain eligible

Does not prove:

- full mechanism
- source device
- operator

## Limited Header Comparison

Correct assignments:

1. Original 05:58 -> Original Header
2. Corrected 06:09 -> Corrected Header
3. Both signatures validate / corrected claims FS-12 -> Shared
4. Eleven-minute rule -> Policy Marker

Correct conclusion:

> Two versions passed validation and an eleven-minute reconciliation rule exists, but raw event order, source device and operator remain unproven.

Internal correct conclusion ID:

`inside_window`

## Closing deduction

- two accepted states exist
- eleven-minute rule exists
- Authentication proves accepted access
- Validation proves accepted records
- Attribution remains empty
- Room 1807 staged true objects
- the current system stages a chronology using true records
- this is a working theory, not a charge

## Phase V handoff

Opening the limited review wakes a dormant audit subscriber.

It requests the same transaction digest through a public gateway near Marina Bay.

Possible explanations remain:

- automatic callback
- watcher
- surveillance
- deliberate lure
- Adrian signal
- unrelated service behavior

The endpoint, gateway and subscriber are not suspects.

---

# 23. PHASE V - MARINA BAY

Status:

`COMPLETE AND OWNER-TESTED`

## Scene identity

English:

`THE EXIT IS NOT THE SOURCE`

Thai:

`ทางออกไม่ใช่ต้นทาง`

## Time and location

- Day 3
- Night
- Singapore
- Marina Bay Promenade

## Main objective

Verify the public gateway without turning a route into a suspect.

## Characters present

- Benedict
- North
- Inspector Cheryl Goh
- Farid Rahman

No Elena and no Adrian physically appear in this scene.

## Visual and audio assets

Background:

`assets/images/chapter-03/phase-05/marina-bay-promenade-night.png`

Ambience:

`assets/audio/chapter-03/phase-05/marina-bay-outdoor-ambience.mp3`

The background is bright enough for mobile, recognizable as Marina Bay and treated as operational terrain rather than tourism imagery.

## Field approach choice

- Observe first
- Test the route
- Change position

All choices converge into the same evidence structure.

The choice may alter emphasis and relationship flavor but not Canon.

## Evidence

### 1. Audit Subscriber Session Snapshot

Establishes:

- dormant subscriber wakes after limited office review
- request uses the same transaction digest
- query exits through a Marina Bay public gateway
- session is short-lived
- operator field is blank

Does not establish:

- physical operator at Marina Bay
- human controller
- Adrian
- source location

Key observation:

> This establishes timing and network exit, not human presence at Marina Bay.

### 2. Controlled Route Response

Cheryl approves one read-only integrity challenge.

Results:

- no payload
- no contact attempt
- route moves from public gateway to carrier relay
- same digest remains
- same ephemeral token remains

Supports:

- a responsive process

Does not eliminate:

- automatic failover
- programmed behavior
- non-human automation

### 3. Managed-Network Handoff

Establishes:

- same short-lived token
- accepted by a managed serviced-apartment network controller
- network zone identified

Does not establish:

- room
- device owner
- operator
- Adrian

This evidence is sufficient for lawful site verification.

It is not sufficient for arrest or attribution.

## Surveillance beat

The scene may show:

- a repeated observer position
- a person crossing multiple sightlines
- route shift occurring when the team repositions

Cheryl allows only a description.

No identity and no detention.

Farid preserves automatic failover as a valid explanation.

Benedict keeps both explanations alive.

This begins the larger **Observer Pattern / Feedback Loop** for later chapters.

## Confidence Review

Statements and correct classifications:

| Statement | Correct classification |
|---|---|
| Traffic exited through the Marina Bay public gateway | `PROVEN` |
| The subscriber reacted to the controlled integrity challenge | `SUPPORTED` |
| The operator was physically present at the public gateway | `UNPROVEN` |
| The same short-lived token later reached a managed serviced-apartment network | `PROVEN` |
| Adrian controlled the subscriber session | `UNPROVEN` |

Correct outcome:

> The location lead is lawful; the operator remains unresolved.

## Phase V closing facts

- public gateway was an exit, not a source
- same short-lived token later entered a managed serviced-apartment network
- network zone only
- no room
- no device owner
- no operator
- not enough to name Adrian
- subscriber changed behavior after being examined
- current result is a pattern, not a culprit

## Phase V state checkpoints

Relevant checkpoint:

`ch3_phase5_confidence_review`

Completion checkpoint:

`ch3_phase5_complete`

## Exit to Phase VI

The managed-network lead identifies a serviced apartment that may be operating as a safehouse.

A lawful site check is justified.

The normal runtime currently routes to the Phase VI WIP fallback.

---

# 24. PHASE VI - SERVICED APARTMENT / SUSPECTED SAFEHOUSE

Status:

`NEXT PRODUCTION TARGET - NOT IMPLEMENTED`

## Location purpose

The serviced apartment is a **site lead**, not a confirmed Adrian residence.

The team arrives because the same short-lived token reached a managed serviced-apartment network controller.

Do not begin the scene by claiming:

- Adrian owns the room
- Adrian was physically present
- Adrian operated the token
- the location is definitely a safehouse
- the observer at Marina Bay was Adrian

Use language such as:

- suspected safehouse
- serviced-apartment network zone
- site verification
- possible operational staging point
- lawful search or controlled access, depending on the approved setup

## Narrative function

Phase VI should:

1. turn the network-zone lead into a physical investigation
2. preserve the distinction between place and person
3. reveal tools, architecture or preparation rather than mastermind identity
4. deepen the Observer Pattern / Feedback Loop
5. provide evidence that justifies the Phase VII Hawker Centre meeting
6. avoid resolving Adrian too early
7. avoid revealing Elena

## Recommended opening

- direct continuation from Phase V
- short location card
- Day 3, later night unless the approved blueprint advances time
- Cheryl establishes legal scope
- Farid confirms network-zone limits
- North identifies technical entry points
- Benedict decides the human investigation approach

## Core cast

Recommended:

- Benedict
- North
- Inspector Cheryl Goh
- Farid Rahman

Adrian should not be physically present unless the owner explicitly approves a change.

## Planned evidence pool

Use only items that serve the story.

### Burner Phone

Possible function:

- contact protocol
- short-lived messages
- public-space meeting instruction
- evidence of staged communication
- observer feedback signal

Must not automatically prove Adrian owned or used it.

### Architecture Document

Possible function:

- old reconciliation architecture
- Signed Local Event flow
- subscriber or audit-monitor structure
- credential routing
- system limitations
- evidence that someone understood the system deeply

It should teach architecture without fully revealing the exploit.

### Encrypted Drive

Possible function:

- fragmented logs
- contact map
- configuration
- old case archive
- meeting key

Do not make it a convenient full confession archive.

### Fragmented Data

Possible function:

- deleted message pieces
- architecture diagram fragments
- token metadata
- contact timing

Add only when it improves the investigation.

## Primary minigame

**Safe Code / Credential Unlock**

Requirements:

- clue derived from collected evidence
- may connect to 18-07
- no arbitrary random number
- mobile-friendly
- tap-first option
- 30-60 seconds
- Reset
- no permanent fail
- no softlock
- puzzle success cue separate from evidence collection cue

Possible safe answer must be approved from the final evidence design.

Do not default to `1807` merely because it is familiar.

## Optional secondary interaction

**Fragment Reconstruction**

Use only when it meaningfully reveals:

- architecture structure
- deleted meeting instruction
- encrypted-drive index
- subscriber configuration

Do not add it as filler.

## Intended deduction boundary

By Phase VI end, the team may prove:

- the serviced-apartment network was used as an operational handoff
- tools or documents connect to the reconciliation architecture
- someone prepared for observation or route changes
- a public meeting protocol points toward Adrian

They must not yet prove:

- Adrian is mastermind
- Adrian controlled every event
- Elena is involved
- the exact full exploit
- the operator at 05:47 or 06:09
- the identity of the Marina Bay observer

## Exit to Phase VII

Evidence should justify:

- a Hawker Centre meeting
- Adrian choosing a public place with cameras and witnesses
- a time or verification phrase
- Benedict selecting an approach
- North checking Adrian's claims against logs

The transition must be earned by evidence.

## Implementation order

1. write full Phase VI blueprint
2. owner approval
3. identify required assets
4. define state defaults and checkpoints
5. define Save/Load restore cases
6. implement scene runtime
7. implement evidence
8. implement minigame
9. implement Case File entries
10. implement audio ownership
11. implement Developer jump
12. add dynamic load order
13. regression test Phase V -> VI and VI -> VII fallback

---

# 25. PHASE VII - HAWKER CENTRE

Status:

`PLANNED`

## Adrian Tan Wei Ming

- Singaporean Chinese man
- age 43-47
- former System Architect
- key witness
- fugitive
- complicit insider
- highly intelligent
- cautious
- exhausted by hiding
- dry humour
- speaks only when necessary
- distrusts police and systems
- not cowardly
- not a cartoon villain
- not mastermind

## Scene rules

- real public Hawker Centre
- populated
- tense despite crowd
- chosen for cameras and witnesses
- Adrian gives part of the truth
- no full plot dump
- Benedict chooses conversational approach
- North verifies claims against logs
- Cheryl preserves lawful scope
- Farid may support technical verification

## Narrative purpose

Adrian explains architecture.

He does not identify the mastermind.

He may look like the major suspect while remaining distinct from the true controller.

---

# 26. PHASE VIII - DIGITAL FORENSICS LAB / SECURE SERVER FACILITY

Status:

`PLANNED CLIMAX`

## Core objective

Access the Raw Reconciliation Record.

## Required elements

- operational time pressure
- eleven-minute window
- delayed Signed Local Events
- simultaneous validation of conflicting logs
- raw order reconstruction
- source-device question
- method reveal
- mastermind remains hidden

## Roles

- North leads system analysis
- Farid supports reconstruction
- Cheryl provides lawful access and authority
- Adrian provides limited or remote architectural help
- Benedict connects technical method to human purpose and behavior

## Minigame direction

Possible combination:

- Dual Log Comparison
- Raw Event Ordering
- eleven-minute deadline or staged time pressure

No permanent fail and no softlock.

The player must learn why two contradictory records can both pass the system's rules.

---

# 27. PHASE IX - CHAPTER III END

Status:

`PLANNED`

## Must prove

- Singapore is infrastructure route
- conflicting chronologies can both validate
- evidence may be real while sequence is false
- credential validity does not identify operator
- Adrian understands the system but is not mastermind

## Must not reveal

- Elena as mastermind
- Elena as killer
- final operator chain
- full Season 2 solution

## Elena ending contact

Elena may contact from Thailand.

Her information must be:

- true
- useful
- strategically timed
- not a confession
- not villain-coded

## Ending question

> Who chose which event would be recorded, and which event would be forgotten?

## Season transition

At Chapter III end:

- antagonist recognizes that North understands too much
- Chapter IV begins the danger to North
- Season 1 closes
- Season UI may be considered only after Phase IX is complete

---

# 28. SEASON 2 DIRECTION

## Chapter IV

North becomes a target.

The Phase V Observer Pattern becomes personal.

The antagonist does not target North merely because she is nearby. North is dangerous because she understands the system's attribution gap.

## Chapters V-VII

Exact chapter plans require future approval, but must preserve:

- fixed historical truth
- player-built case variation
- fair clues
- no retcon of Chapters I-III
- Benedict as final decision-maker
- North as technical lead
- Elena's public credibility until the reveal path earns suspicion
- Adrian as possible false target, not mastermind

## Four ending architecture

The underlying truth is fixed.

The case constructed by the player varies.

### 1. TRUE CONVICTION

- Elena identified correctly
- evidence legally and logically sufficient
- conviction achieved

### 2. RIGHT NAME, NO CASE

- Elena identified correctly
- proof insufficient, contaminated, inadmissible or strategically incomplete
- truth known but conviction fails

### 3. FALSE CONVICTION

- another person, potentially Adrian, is convicted
- evidence chain appears persuasive
- the wrong person takes the blame

### 4. THE PERFECT RECORD

- institutional scapegoat or engineered official narrative wins
- North may be framed or absorbed into the record
- system preserves a clean false chronology

Do not create endings where the historical truth changes.

---

# 29. OWNER-LEVEL SECRETS

## Elena

Confirmed by owner:

- mastermind
- real killer

Do not reveal in Chapter III.

Do not use:

- villain lighting
- suspicious facial coding
- obvious evasiveness
- confession-like lines
- false information merely to make her look guilty
- musical villain cues
- exaggerated pauses
- sudden cruelty without earned context

Her method:

- true information
- selective timing
- controlled sequence
- credible professional help

Fair clues must become clear in retrospect without making her obvious during Chapter III.

## Adrian

- former System Architect
- fugitive
- complicit insider
- not mastermind
- not architect of the entire murder plan

May be guilty of:

- concealment
- failure to report
- enabling
- fleeing
- evidence-supported complicity

He may be a plausible false-conviction target.

## North

- not mastermind
- not secretly compromised by default
- becomes dangerous because she understands Authentication vs Attribution
- hunted beginning in Chapter IV

## Benedict

- remains protagonist
- makes final human deductions
- chooses approaches
- connects motive, behavior and evidence
- never becomes a passive passenger while North solves everything

---

# 30. AUDIO GOVERNANCE

## Owners

- `02-audio-save.js`
- `11-production-stabilization.js`
- scene-local modules for their own ambience
- `05-chapter2-integration.js` for central background lifecycle guard and rain boundary

Do not create another global audio manager.

## UI click

Owner:

`08-stability-repair.js`

Rules:

- embedded WAV
- pointerdown
- immediate
- one press, one sound
- no duplicate Android playback

## Evidence cue

- one playback
- distinct from puzzle success
- no second tail
- stop on scene exit
- collection cue must not be used for Inspect

## Police ambience

Clean boundary:

- start 4.6 seconds
- end 45.0 seconds

Do not alter without a full trace and owner test.

## Phase II

- takeoff video audio uses SFX
- cabin ambience uses Music
- dialogue ducks ambience
- media stops on exit and restore

## Phase III

- `assets/audio/chapter-03/phase-03/singapore-arrival-transition.mp3`
- `assets/audio/chapter-03/phase-03/changi-airport-ambience.mp3`

## Phase IV

- `assets/audio/chapter-03/phase-04/drive-to-investigation-office.mp3`
- `assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3`

## Phase V

- `assets/audio/chapter-03/phase-05/marina-bay-outdoor-ambience.mp3`

## Background lifecycle behavior

Builds `0.10.8` and later add a central lifecycle guard.

When the game moves to background:

- visibilitychange is primary
- pagehide and blur are fallbacks
- all audio/video pause
- UI one-shots reset
- evidence cue stops
- rain boundary timer stops

When the game returns:

- do not blindly resume every media element
- refresh the active scene owner
- respect sound and music settings
- schedule rain boundary only when appropriate

Owner Android result:

- audio stops when backgrounded or screen locked
- audio returns with the correct scene after reopening

Not owner-confirmed:

- iPhone Safari
- iOS Add to Home Screen

## Fullscreen after backgrounding

Mobile browsers may exit fullscreen when the app is backgrounded.

The owner accepts this current limitation.

Player can re-enter fullscreen through Settings.

Do not build brittle fullscreen re-entry hacks without a browser-supported user gesture.

## Rain loop

The main rain track uses a controlled boundary rather than native blind looping.

Current values:

- loop start: `0.06`
- trim before end: `0.34`

Do not edit the audio asset or add crossfades unless a new audible defect is proven.

---

# 31. FULLSCREEN AND EXIT

Owner-confirmed baseline behavior:

- fullscreen can begin from a user gesture
- Settings control available
- menu control available
- Save Manager visible inside fullscreen
- scenes do not stretch
- Exit Game saves current progress
- browser close attempted where permitted
- safe fallback when close is forbidden

Do not move modals outside the fullscreen root.

---

# 32. UI AND INVESTIGATION LIFECYCLE

## Dialogue

- one tap advances one line
- no double advance
- prompt normalized
- portrait and emotion match speaker
- completion callback is authoritative
- next gameplay layer appears only after dialogue completion

## Hotspots

Before available:

- hidden or disabled
- no pointer events
- no keyboard focus
- no visible yellow point behind dialogue

When available:

- yellow

After collected:

- green

## Evidence flow

General intended flow:

1. open
2. Inspect
3. reveal detail
4. Add to Case File / Collect Evidence
5. close
6. post-evidence dialogue
7. next control unlock

Some scenes intentionally keep Inspect available after collection for rereading.

Do not force every evidence module into identical logic.

## Evidence hint and action layout

Build `0.10.9B` removed the misleading visible hint:

`Tap evidence to inspect`

The evidence image is not universally clickable, so no replacement hint was added.

Build `0.10.9C` added:

- centered single Inspect action
- line-style magnifier icon
- no emoji icon

Build `0.10.9D` expanded single-action centering to collection actions.

Build `0.10.9E` replaced name-specific logic with a scoped rule:

> Inside verified Evidence action rows, when exactly one button remains in layout, center that button. When two or more buttons remain, preserve the scene's native layout.

Scoped panels:

- `#room1807EvidencePanel .evidence-actions`
- `#apartmentEvidence .evidence-actions`
- `#policeEvidencePanel .evidence-actions`
- `#forensicEvidencePanel .evidence-actions`
- `#medicalEvidencePanel .evidence-actions`
- `#ch3ChangiEvidencePanel .evidence-actions`
- `#ch3OfficeEvidencePanel .evidence-actions`
- `#ch3P5Evidence .actions`

Single-button width:

`clamp(168px, 54%, 260px)`

Important:

- disabled buttons still count as visible layout items
- `[hidden]`, `.hidden` and inline `display:none` remove a button from the count
- Inspect magnifier applies only to Inspect buttons
- Close-only state is centered
- multi-button Singapore Office and Marina Bay layouts remain unchanged
- no Evidence logic or listeners changed

Owner confirmed build `0.10.9E` passed.

Do not revert to broad `.actions` selectors or separate Inspect/Collect/Close rules.

## Review and minigame controls

Must not appear:

- behind dialogue
- behind evidence panel
- before required evidence
- from stale Save state
- while another overlay is open

---

# 33. MOBILE UI STANDARD

Minimum layout checks:

- 320 CSS px width for defensive narrow-screen checks
- 360×800
- 390 CSS px width
- 412×915
- 430 CSS px width where practical

Account for:

- browser address bar
- Android navigation bar
- safe-area bottom
- dialogue box height
- fixed controls
- scrollable modal body only
- long Thai labels
- two-line action labels

Primary text and controls must remain readable without zoom.

---

# 34. VISUAL DIRECTION

## Background size

`864 × 1536`

## Style

- noir graphic novel
- cel-shaded
- heavy ink
- angular shadows
- cinematic crime adventure
- bright enough for mobile

## Rules

- no embedded UI unless explicitly required
- no chapter title baked into backgrounds
- no pseudo-text
- exact readable text or no text
- inspect signage
- no malformed English
- preserve clean composition behind dialogue UI
- operational environments, not decorative postcards
- lived-in practical detail
- no repeated AI clutter

## Phase VI visual target

Serviced Apartment / suspected safehouse should feel:

- upscale enough to support managed network infrastructure
- used temporarily
- organized but not showroom-perfect
- technically prepared
- subtly abandoned or interrupted
- no obvious villain lair
- no giant clue arrows
- no text baked into the background

---

# 35. EVIDENCE AND MINIGAME STANDARDS

## Evidence rule

Every evidence item must:

- advance the story
- support a deduction
- justify a location or decision
- have a Case File summary
- preserve proof boundaries

Do not create decorative evidence.

## Minigame standard

- mobile-friendly
- tap-first
- 30-60 seconds
- Reset
- no softlock
- no permanent fail
- success cue separate from collection cue
- noir tech tone
- correct answer derived from evidence
- wrong answer teaches the proof boundary

## Implemented minigames

1. Timeline Reconstruction
2. Passenger Trail Reconciliation
3. Limited Header Comparison
4. Marina Bay Confidence Review

## Planned minigames

5. Safe Code / Credential Unlock
6. optional Fragment Reconstruction
7. Raw Reconciliation / Dual Log climax

---

# 36. BUILD HISTORY

## 0.7.6

- canonical Character Journal unread state
- duplicate North red-dot repair
- deterministic Police character unlock
- named Save Manager
- IndexedDB named saves
- Export/Import
- Chapter III departure dialogue completion

## 0.7.7

- Room 1807 victim separated from Daniel
- `E.` to Elena continuity
- archived toxicology correction
- 18-07 terminology
- 06:17 terminology lock
- FS-12 / Terminal Three continuity
- Police to Forensic handoff
- Medical evidence boundary
- Timeline Reconstruction
- in-flight continuity
- Chapter II completion wording

## 0.7.8

- Save Manager top close
- mobile footer
- automatic close after save

## 0.7.9

- stale Journal state filtered
- no Character menu in Chapter I
- Chapter II North gate restored
- first Journal contains Benedict and North only
- Developer all-character leak cleared on fresh Chapter II

## 0.7.10

- Police relationship initialization
- three Police choices repaired
- clean Police ambience boundary

## 0.8.0

- Changi Airport introduced
- three-system investigation
- Passenger Trail Reconciliation
- Immigration Officer and arrival sequence

## 0.8.1

- shared investigation lifecycle
- narrative-first hotspot sequencing
- Changi Save/Resume
- fullscreen preparation

## 0.8.2

Owner-confirmed at that stage:

- fullscreen from Tap to Begin
- Settings/menu fullscreen controls
- Save Manager above fullscreen
- browser-safe Exit Game
- Immigration Officer portrait improvement

## 0.9.0

- Singapore Investigation Office introduced
- Cheryl and Farid
- limited read-only review
- Phase IV evidence
- Limited Header Comparison
- Marina Bay lead

## 0.9.1

- Changi gate repair
- direct Phase III to IV transition
- driving card separation
- initial Cheryl/Farid portrait repair

## 0.9.2

- dynamic load order corrected
- flight to Changi handoff repaired
- Compare lifecycle repaired
- Character Canon layer
- Kittisak corrected to Police Captain

## 0.9.3

Owner-confirmed:

- final Cheryl/Farid portrait rebuild
- true alpha
- clean edges
- stable 744×1000 canvas
- no stretch
- dialogue-frame fit accepted

## 0.10.0

- initial Phase V Marina Bay implementation
- Phase V evidence and Confidence Review
- Phase VI fallback

## 0.10.1

- Phase V UI spacing and placement polish

## 0.10.2

- Phase V Developer jump and audio integration work

## 0.10.3

- Phase IV duplicate evidence and Case File repair
- combined Phase IV/Phase V progression stabilization

## 0.10.4

- progression, characters, build label and transparency work
- introduced rejected 54×54 Character Journal portrait wrapper regression

## 0.10.5

Rejected Character Journal experiment:

- portrait became too large
- layout visually regressed

Do not restore.

## 0.10.6

Rejected Character Journal experiment:

- attempted medium portrait
- Relationship layout shifted incorrectly

Do not restore.

## 0.10.7

- Character Journal rollback attempt
- did not fully restore raw pre-Ratchata markup
- Phase V CSS header currently retains historical `0.10.7`

## 0.10.8

- central mobile audio lifecycle stabilization
- background pause
- scene-aware return
- rain-loop boundary

## 0.10.9

- combined Character Journal and mobile-audio baseline
- Phase IV and Phase V modules identify internally as `0.10.9`
- Character Canon updated through Cheryl and Farid

## 0.10.9A

- exact pre-Ratchata Character Journal card markup restored
- raw portrait image layout
- no new CSS owner or listener

## 0.10.9B

- misleading Evidence hint hidden globally
- Inspect flow retained

## 0.10.9C

- single Inspect action centered
- line magnifier icon added

## 0.10.9D

- single Collect/Add action centered
- Close-only gap discovered afterward

## 0.10.9E

Current owner-confirmed production baseline:

- scoped eight-panel Evidence action audit
- any single visible Evidence button centers
- multi-button layouts remain native
- Close-only states repaired
- no logic/listener/state changes
- owner tested all scenes through Marina Bay and confirmed pass

---

# 37. VERSION QUIRKS THAT ARE NOT CURRENT DEFECTS

- `01-title-phase1.js` still identifies internally as `0.7.7`.
  - behavior is stable
  - do not rename for cosmetics alone

- `02-changi-airport.js` identifies as `0.9.2`.
  - current Phase III behavior is accepted

- Phase IV and V modules identify internally as `0.10.9`.
  - global production build is `0.10.9E`

- `css/chapter-03-phase-05.css` header says `0.10.7`.
  - current file is active and owner-accepted
  - do not change only for the comment

- `index.html` cache query for the integration file remains historical.
  - runtime visible build is set by the integration module
  - change cache queries only when needed for an actual deployment concern

- static HTML `<title>` may still carry legacy Chapter I wording.
  - Chapter III runtime sets the document title
  - not a gameplay blocker

---

# 38. CURRENT ACCEPTED LIMITATIONS

## iPhone

Not owner-tested for:

- Safari
- Add to Home Screen
- background-audio lifecycle
- fullscreen return

Do not claim iPhone validation.

## Fullscreen return

Mobile browser may leave fullscreen after backgrounding.

Accepted for now.

## Dynamic Character statuses

Deferred.

## Kittisak Thai status

Current `ระมัดระวังตัว` remains until owner requests a wording change.

## Phase VI

Only fallback exists.

No playable Phase VI scene yet.

---

# 39. TECHNICAL RISKS

## Classic global overrides

Several files redefine globals.

Search the full load chain before editing.

## Dynamic DOM

Chapter III DOM is injected at runtime.

Do not bind Phase VI listeners before its DOM exists.

## Observer proliferation

Existing observers already cover:

- dialogue prompts
- some state repairs
- language updates
- journal behavior

Do not add another observer when CSS or existing lifecycle ownership can solve the task.

## Audio overlap

Trace:

- base audio
- production stabilization
- scene-local owner
- integration background guard

## Save compatibility

New Phase VI screens must be added to:

- screen labels
- snapshot and restore
- runtime preparation
- resume logic
- audio reconstruction
- menu/save controls
- state defaults
- Developer jump

## Character Journal regressions

Do not:

- add portrait wrappers
- move Relationship into a new column
- resize accepted portraits
- reintroduce 0.10.4-0.10.7 layouts
- duplicate Cheryl/Farid unread dots

## Evidence layout regressions

Do not:

- target every `.actions` container globally
- count disabled buttons as hidden
- create separate brittle rules for Inspect, Collect and Close
- alter Evidence logic while fixing layout
- remove Inspect from scenes where it reveals metadata

---

# 40. TESTING STANDARD

## Static

- JavaScript syntax
- CSS parsing
- HTML validity where practical
- asset existence
- relative paths
- duplicate IDs
- cache query
- missing portrait emotions
- PNG mode and dimensions when relevant

## Flow

- fresh entry
- opening dialogue
- each affected choice
- evidence open
- Inspect
- collect
- Close
- reopen collected evidence
- Inspect again
- Close-only state
- post-evidence dialogue
- review/minigame gate
- wrong answer
- Reset
- correct answer
- closing dialogue
- transition
- Return to Title

## Save

- Auto Save
- Continue
- Named Save
- load named
- save during choice
- save during investigation
- save before minigame
- save during minigame
- save after minigame
- export/import
- stale state

## Settings

- TH/EN
- sound
- music
- SFX
- fullscreen
- Exit Game

## Mobile audio

- background app
- lock screen
- return to same scene
- sound disabled
- music zero
- scene transition after return
- one-shots do not replay

## Honesty

Never claim:

- Android test
- iPhone test
- live GitHub Pages test
- audio listening
- complete browser regression
- 100% success

unless actually completed.

The owner's real-device test is final truth.

---

# 41. DELIVERY FORMAT

Every code package:

- one ZIP
- preserved repository paths
- changed-file manifest
- upload instructions
- SHA-256
- test report
- limitations

Do not tell the owner to clear Site Data by default.

Clearing Site Data may destroy saves.

Use cache-busting or normal refresh guidance first unless a specific stale-cache problem is proven.

---

# 42. NEXT-CHAT ZERO-EXPLANATION HANDOFF

A new assistant must behave as though the owner has said:

> Continue LAST WITNESS from owner-confirmed BUILD 0.10.9E.  
> Repository: `grolygori789-crypto/last-witness`.  
> Branch: `restore-game-recovered`.  
> Read the latest `GAME_MASTER_PLAN.md`, then fetch latest `index.html` and every runtime file relevant to Phase VI.  
> Do not patch from memory, an old ZIP or a previous conversation attachment.  
> Do not push, commit, create a branch or modify GitHub.  
> Work locally and let me upload.  
> Every playable scene from Chapter I through Chapter III Phase V Marina Bay is complete and owner-tested.  
> The current endpoint is the Phase VI Serviced Apartment WIP fallback.  
> The next target is Chapter III Phase VI: Serviced Apartment / Suspected Safehouse.  
> Start with a complete Phase VI blueprint before assets or implementation.  
> Preserve Save/Load, fullscreen, audio lifecycle, Character Journal, Case File, Developer Mode and the 0.10.9E Evidence button layout.  
> Daniel Voss is dead. The Room 1807 victim is not Daniel.  
> Elena is the unrevealed mastermind and killer. Do not reveal or villain-code her in Chapter III.  
> Adrian is a complicit former System Architect and fugitive, but not mastermind.  
> Phase V proved a managed serviced-apartment network handoff, not Adrian's presence or control.  
> Benedict remains final decision-maker. North leads technical analysis. Cheryl controls lawful access. Farid supports digital forensics.

The new assistant must not ask the owner to restate the project.

---

# 43. MASTER PLAN UPDATE PROTOCOL

Update this file whenever any of these change:

- production baseline
- owner test result
- playable boundary
- Canon
- character role
- Character Journal gates
- Save schema
- storage key
- runtime path
- load order
- audio owner
- asset path
- new phase
- known defect
- resolved defect
- next production target
- Season structure
- ending architecture

Before replacing:

1. fetch latest file
2. preserve confirmed Canon
3. preserve unresolved mysteries
4. preserve owner secrets
5. preserve workflow
6. preserve future Chapter III plan
7. preserve Season 2 and endings
8. record new owner result
9. keep filename exactly `GAME_MASTER_PLAN.md`

---

# 44. CURRENT CANON SUMMARY

## Confirmed in game

- Room 1807 staged
- Room 1807 victim is not Daniel
- Daniel investigated the pattern
- Daniel dies in Chapter II
- 18-07 is an operational profile, not a person
- six-event canonical timeline
- science genuine
- chronology engineered
- FS-12 / Terminal Three
- local session offline
- Singapore infrastructure route
- Daniel booking genuine
- Daniel did not travel
- Changi separates documents, physical movement and access
- two Phase IV headers validate
- eleven-minute policy exists
- raw order and operator unresolved
- dormant audit subscriber woke after limited review
- Marina Bay public gateway was an exit, not a source
- responsive behavior observed
- automation still possible
- same short-lived token reached a managed serviced-apartment network
- lawful Phase VI site verification justified
- Adrian control unproven

## Confirmed by owner, secret from player

- Elena is mastermind
- Elena is killer
- Adrian is not mastermind
- North will become a target in Chapter IV
- four ending architecture
- fixed truth with variable constructed case

## Unresolved

- identity of `R.`
- Room 1807 victim
- warning caller
- pier meeting
- full meaning of 1807
- operator of 05:47 event
- operator of 06:09 event
- controller of audit subscriber
- Marina Bay observer identity
- exact full exploit
- how permissions were acquired
- Elena reveal path
- identity of the eventual living Last Witness

---

# END OF MASTER PLAN

Do not delete or replace this file without preserving:

- `BUILD 0.10.9E` owner pass
- latest GitHub workflow rules
- current load order
- Save/Load continuity
- fullscreen and background-audio behavior
- exact Character Journal layout
- Cheryl/Farid Canon and unlock gates
- evidence single-button centering rule
- Daniel death lock
- Room 1807 victim separation
- canonical Daniel timeline
- Phase I-V completed Canon
- Phase VI next-work blueprint
- complete Phase VII-IX direction
- Elena secret
- Adrian boundary
- Season 2 direction
- four endings
- next-chat zero-explanation handoff
