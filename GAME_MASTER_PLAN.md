# LAST WITNESS – GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-07-24  
> **Current owner-confirmed production baseline:** `BUILD 0.9.3`  
> **Owner device result:** `PASSED – PHASE IV AND PORTRAIT MASTER QC CONFIRMED`  
> **Next production target:** `CHAPTER III – PHASE V: MARINA BAY`
>
> This document replaces the previous `GAME_MASTER_PLAN.md` revision dated 2026-07-23.
>
> GitHub runtime files remain the Source of Truth for code and deployed assets.  
> This file is the Source of Truth for Canon, owner-confirmed status, workflow, architecture, current playable boundary, unresolved risks and the exact continuation point for a new chat.

---

# 0. EXECUTIVE HANDOFF

## Project identity

- Game: **LAST WITNESS**
- Studio: **BENEDICT INTERACTIVE**
- Repository: `grolygori789-crypto/last-witness`
- Production branch: `restore-game-recovered`
- Live game: `https://grolygori789-crypto.github.io/last-witness/`
- Primary planning file: `GAME_MASTER_PLAN.md`
- Target platform: mobile-first browser game
- Primary owner test device: Android Chrome
- Primary layout: portrait 9:16
- Genre: Narrative Detective Adventure / Interactive Crime Investigation
- Core principle:

> **A valid credential proves access, not identity.**

## Current playable scope

The owner has confirmed the latest build through:

1. Chapter I – ROOM 1807
2. Chapter II – THE PERFECT STRANGER
3. Chapter II ending – THE ELEVEN-MINUTE LIE
4. Chapter III Phase I – Detective Office / Timeline Reconstruction
5. Chapter III Phase II – Bangkok to Singapore / Takeoff and In-flight
6. Chapter III Phase III – Changi Airport
7. Chapter III Phase IV – Singapore Investigation Office
8. Phase IV portrait master repair for Cheryl and Farid

The current normal playable boundary is:

> **Phase IV complete → Continue to Phase V → Phase V WIP fallback card**

Phase V content is not implemented yet.

## Current owner-confirmed baseline

**BUILD 0.9.3**

Owner confirmation received after testing:

- revised Cheryl portraits
- revised Farid portraits
- dialogue-frame fit
- transparent edge cleanup
- Phase IV flow already working from 0.9.2
- portrait defect considered resolved

Do not revert Cheryl/Farid assets, CSS or Phase IV paths to 0.9.0, 0.9.1 or 0.9.2 versions.

## Immediate next job

**Chapter III Phase V – Marina Bay**

The Phase IV ending currently points to Marina Bay because opening the limited office review wakes a dormant audit subscriber that queries the same transaction through a public network gateway near Marina Bay.

At this point the team does **not** know whether this is:

- an automated callback
- surveillance
- a watcher
- an Adrian signal
- a deliberate lure
- an unrelated service response

Do not call the endpoint, gateway or subscriber a suspect without evidence.

---

# 1. COMMUNICATION AND OWNER WORKFLOW

## Conversation style

- Address the owner as **พี่เบนซ์**
- Refer to the assistant as **บิ๊ว**
- Use a feminine Thai voice
- Use direct, natural Thai
- Do not overclaim success
- Do not make the owner repeat already documented project facts

## Delivery ownership

The owner always uploads files to GitHub personally.

The assistant must never:

- create a branch
- push
- commit
- update GitHub directly
- delete repository files
- modify GitHub Pages directly
- change repository structure without owner approval

The assistant must:

1. fetch latest branch
2. inspect runtime ownership
3. work locally
4. test honestly
5. create one ZIP
6. list upload paths
7. provide SHA-256
8. let the owner upload

---

# 2. NON-NEGOTIABLE STARTUP PROCEDURE FOR EVERY NEW CHAT

Before editing any file:

1. Fetch the latest `GAME_MASTER_PLAN.md`.
2. Fetch the latest `index.html`.
3. Confirm the branch is `restore-game-recovered`.
4. Confirm current cache-query versions and script load order.
5. Fetch every file connected to the requested task.
6. Search for:
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
7. Prove the root cause or identify the correct implementation owner.
8. Patch the fewest files needed.
9. Run syntax and static validation.
10. Test the actual affected flow where the environment allows.
11. State what was and was not tested.
12. Deliver a ZIP only.

Never patch from:

- memory
- an old ZIP
- a previous chat attachment
- an older branch copy
- a generated reconstruction of a current runtime file

---

# 3. SOURCE-OF-TRUTH HIERARCHY

1. **Latest GitHub runtime on `restore-game-recovered`**
   - code
   - assets
   - load order
   - paths
   - current deployed behavior

2. **Latest `GAME_MASTER_PLAN.md`**
   - Canon
   - owner-confirmed status
   - workflow
   - unresolved mysteries
   - intended future phases
   - owner secrets
   - testing and delivery rules

3. **Owner’s newest real-device result**
   - final truth for visible behavior
   - overrides assumptions from static inspection

When runtime and plan conflict:

- inspect both
- identify which one is stale
- do not silently rewrite Canon to match an accidental code defect
- do not silently rewrite working code to match an outdated plan

---

# 4. CURRENT PRODUCTION STATUS

## Baseline

**LAST WITNESS BUILD 0.9.3**

Status:

`OWNER-CONFIRMED PASSED`

## Stable confirmed scope

- Chapter I complete
- Chapter II complete
- Chapter III Phase I complete
- Chapter III Phase II complete
- Chapter III Phase III complete
- Chapter III Phase IV complete
- Fullscreen display and exit controls
- Save Manager modal in fullscreen
- title/settings Exit Game flow
- Changi investigation lifecycle
- Changi evidence gating
- Changi minigame
- Changi direct transition to Phase IV
- Phase IV driving transition
- Singapore office choice
- Phase IV evidence lifecycle
- Phase IV Compare button gate
- Phase IV minigame
- Phase IV Marina Bay handoff
- Cheryl/Farid portrait fit and edge quality

## Current playable ending

After Phase IV completion, the player may press:

`CONTINUE TO PHASE V`

The runtime currently routes to `chapter3Wip` with:

- title: `PHASE V · MARINA BAY`
- message that Phase V is in development
- progress saved
- Return to Title

This WIP screen is the current legitimate endpoint, not a defect.

---

# 5. BUILD HISTORY

## 0.7.6

- canonical Character Journal unread state
- duplicate North red-dot repair
- deterministic Police character unlock
- named Save Manager
- IndexedDB named saves
- Export/Import
- Chapter III departure dialogue completion

## 0.7.7

- Room 1807 victim separated from Daniel Voss
- `E.` to Elena continuity
- archived toxicology record correction
- Temporary Operational Profile 18-07 terminology
- 06:17 terminology lock
- FS-12 / Terminal Three continuity
- Police → Forensic handoff
- Medical evidence boundary
- Timeline Reconstruction
- in-flight narrative continuity
- Chapter II completion wording

## 0.7.8

- Save Manager top close control
- mobile footer controls
- automatic close after successful save

## 0.7.9

- stale Character Journal state filtered
- no Character menu in Chapter I
- Chapter II North unlock gate restored
- first Journal contains only Benedict and North
- developer all-character unlock cleared on fresh Chapter II

## 0.7.10

- Police relationship initialization
- all three Police choices repaired
- clean Police ambience boundary
- owner-confirmed stable baseline at that stage

## 0.8.0

- Chapter III Phase III Changi Airport introduced
- booking, movement and accepted request investigation
- Passenger Trail Reconciliation minigame
- Immigration Officer portrait and arrival sequence

## 0.8.1

- investigation lifecycle shared runtime
- Phase III narrative-first hotspot sequencing
- save/resume support for Changi
- fullscreen/portrait preparation

## 0.8.2

Owner-confirmed passed:

- fullscreen from Tap to Begin
- fullscreen controls in Settings and Game Menu
- Save/Load modal visible above fullscreen
- browser-safe Exit Game fallback
- title and Settings exit paths
- Immigration Officer portrait enlarged and cleaned

## 0.9.0

- Phase IV Singapore Investigation Office introduced
- driving transition
- Inspector Cheryl Goh introduction
- Farid Rahman introduction
- limited read-only office review
- three office evidence items
- Limited Header Comparison
- Phase V Marina Bay handoff

## 0.9.1

- Changi hotspots/minigame gate repaired
- Phase III completion card removed from normal flow
- Changi closing dialogue transitions directly to driving clip
- driving transition card separated from video layer
- initial Cheryl/Farid portrait repair
- Kittisak role issue discovered afterward

## 0.9.2

- Chapter III dynamic load order corrected
- in-flight → Changi handoff repaired
- Compare button lifecycle repaired
- Character Canon verification layer added
- Kittisak corrected to Police Captain
- Cheryl/Farid portrait set rebuilt, but visual QC still failed owner review

## 0.9.3

Owner-confirmed passed:

- all 12 Cheryl portraits rebuilt
- all 17 Farid portraits rebuilt
- true transparent alpha
- zero RGB in fully transparent pixels
- white halo removed
- no vertical/horizontal stretching
- consistent 744×1000 canvas
- face and upper torso prioritized
- stable anchor
- authored at 100% runtime scale
- CSS transform tricks removed
- dialogue-frame result accepted by owner

---

# 6. VERIFIED GITHUB SNAPSHOT

Snapshot verified while preparing this document on 2026-07-24.

This table is informational only. A future chat must fetch again.

| Path | Verified blob SHA | Current role |
|---|---|---|
| `GAME_MASTER_PLAN.md` | `4de02047254da2bbc431b04bbe8fc22be22457f1` | previous plan being replaced |
| `index.html` | `e30f3fb1f20399d51de9aba220802361a5da15d9` | static DOM and load order |
| `js/engine/02-audio-save.js` | `2668239dcd375b210a90856d132d19c4f2464410` | Save Manager and legacy/base audio |
| `js/engine/12-investigation-lifecycle.js` | `be3c09f87c7644cbb9adcea3097035613e835307` | shared investigation lifecycle |
| `js/engine/13-fullscreen-display.js` | `22340bb5030f082b9d725ad07830095f02bd3be9` | fullscreen and Exit Game |
| `js/engine/14-character-canon.js` | `715ece225689a8698d4c099886fb6f902d77ce93` | Character Journal Canon overlay |
| `js/chapters/chapter-02/05-chapter2-integration.js` | `12b813a5ee0205b3344c9c2f4f538166a0387de8` | Chapter III dynamic loader |
| `js/chapters/chapter-03/01-title-phase1.js` | `6e108c3475589e708262474260c2128941b9df0c` | Phase I–II runtime |
| `js/chapters/chapter-03/02-changi-airport.js` | `df50301acf1624182ee3733960df7d9c12bb1ece` | Phase III runtime |
| `js/chapters/chapter-03/03-singapore-office.js` | `2d8c2bb0e643b21467880e0fb1b5cc3212eaa822` | Phase IV runtime |
| `css/chapter-03-phase-04.css` | `4aa34fcd126e18ab41aa2833b0142d5dab0d3a6e` | Phase IV UI and portrait rendering |

---

# 7. CURRENT STATIC LOAD ORDER

## CSS from `index.html`

1. `css/style.css`
2. `css/forensic-phase.css`
3. `css/medical-examiner.css`
4. `css/investigation-lifecycle.css?v=0711`
5. `css/fullscreen-display.css?v=0802`
6. `css/chapter-03-phase-04.css?v=0930`

Chapter III base and Changi CSS are also loaded dynamically by the Chapter II integration runtime.

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

## Dynamic Chapter III order

`05-chapter2-integration.js` loads:

1. `css/chapter-03.css?v=074`
2. `css/chapter-03-phase-03.css?v=0801`
3. `js/chapters/chapter-03/01-title-phase1.js?v=0920`
4. `js/chapters/chapter-03/02-changi-airport.js?v=0920`
5. `js/chapters/chapter-03/03-singapore-office.js?v=0930`

This sequence is mandatory.

The 0.9.2 repair fixed a previous defect where Changi listeners could be installed before the Phase I–II flight DOM/runtime existed.

Do not re-add Phase III or IV as independent static script tags.

---

# 8. IMPORTANT VERSION QUIRKS THAT ARE NOT CURRENT DEFECTS

- `01-title-phase1.js` still identifies internally as version `0.7.7`.
  - Its current behavior is stable.
  - The loader query is newer because integration changed around it.
  - Do not rename only for cosmetic consistency.

- `05-chapter2-integration.js` file header/cache is 0.9.3, while its exported `LastWitnessChapter2Integration.version` may still report `0.9.2`.
  - Owner passed the current build.
  - Treat as a non-blocking metadata mismatch.
  - Correct only when legitimately editing that loader.

- `02-audio-save.js` still stores its historical Save Manager build/version values.
  - Phase IV updates the visible settings build label to 0.9.3.
  - Do not alter Save schema or migration solely to make labels match.

---

# 9. RUNTIME OWNERSHIP MAP

## `01-runtime-data.js`

Owns:

- `$` and `$$`
- base state
- localization dictionary
- base PORTRAITS registry
- base audio references
- clue data
- legacy save keys

## `02-audio-save.js`

Owns:

- Save Manager
- auto save
- named manual saves
- IndexedDB
- localStorage fallback
- export/import `.lwsave`
- delete
- restore snapshots
- legacy save migration
- base audio/volume behavior
- Police clean-loop boundary

## `03-journal-progress.js`

Legacy helpers remain present:

- original relationship helpers
- portrait lookup
- legacy journal rendering
- progress helpers

Do not use it as the main Canon Journal owner.

## `04-ui-dialogue.js`

Owns:

- `show(screen)`
- base screen transitions
- chapter intro
- base dialogue runtime before override
- base evidence entry
- late Chapter II journal repair

## `05-developer-tools.js`

Owns:

- developer access
- developer scene jumps
- reset tools

Developer access code:

`room1807`

Do not expose Developer Mode in normal UI.

## `06-regression-fixes.js`

Important active override:

- replaces global `runDialogue`
- live TH/EN dialogue handling
- history recording
- Police evidence inspection repair
- Case File repair
- Save button rebinding

Any dialogue work must inspect this file.

## `07-dialogue-continuity.js`

Owns normalized dialogue prompt:

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

Production owner for:

- scene-aware ambience
- Room 1807 audio
- Apartment audio
- Forensic audio
- Medical audio
- evidence collection cue
- puzzle cue
- scanner cue
- ducking
- one-shot cleanup
- stale state repair

Do not create a third audio controller.

## `06-content-registry-dev.js`

Canonical Journal registry owner for:

- visibility
- story gates
- unread arrays
- red dot
- Character Cards
- details
- Ratchata fallback
- registry persistence
- stale filtering
- developer character unlock

Storage key:

`lastWitness.contentRegistry.v3`

## `14-character-canon.js`

One-time post-registry Canon mutation.

Current registered Character Journal entries:

1. Benedict
2. North
3. Elena
4. Somchai
5. Kittisak Siriwat
6. Ratchata (Dr. Singh)

No polling or observer.

## `12-investigation-lifecycle.js`

Shared narrative-first lifecycle.

Important rule:

- no hotspot should become interactive before the required dialogue has finished
- no review/minigame button should appear behind dialogue
- no new polling or observer

## `13-fullscreen-display.js`

Owns:

- fullscreen UI
- automatic attempt after Tap to Begin
- Settings and menu fullscreen controls
- overlay-root safety
- Save Manager visibility in fullscreen
- Exit Game confirmation
- browser-safe exit fallback

## Phase III module

`02-changi-airport.js`

Owns:

- arrival transition
- Changi scene
- airport evidence
- Passenger Trail Reconciliation
- Changi ambience
- in-flight handoff bridge
- direct Phase IV transition
- Changi Case File entries
- Phase III state

## Phase IV module

`03-singapore-office.js`

Owns:

- driving transition
- Phase IV location card
- Singapore office
- Cheryl/Farid dialogue portraits
- office choice
- office evidence
- Limited Header Comparison
- Marina Bay handoff
- Phase IV ambience
- Phase IV Case File entries
- Phase IV state
- visible build label 0.9.3

---

# 10. STATE MODEL

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

## State ownership rule

Before writing any flag, identify:

- initializer
- persistence owner
- restore owner
- UI derivation
- stale-state repair
- later override

Never write a flag merely because it makes a button appear.

---

# 11. SAVE / LOAD

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
- busy-state double-tap protection
- auto-close after save

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
- chapter3 state
- canonical character arrays
- unread arrays
- evidence registry
- language
- sound
- music
- sfx

## Phase III–IV restore requirement

Before restoring a Chapter III screen:

1. load Phase I–II runtime
2. load Changi runtime
3. load Phase IV runtime
4. restore snapshot
5. call the appropriate resume bridge
6. reconstruct scene audio
7. reconstruct overlay/dialogue/hotspot/button lifecycle

Do not blindly resume media from stale element state.

---

# 12. CHARACTER JOURNAL BEHAVIOR

## Chapter I

- Character menu hidden
- no Character Cards
- stale entries filtered

## Chapter II opening

Before the full North office dialogue ends:

- Character menu hidden
- North not unlocked

After the conversation:

- Benedict unlocked
- North unlocked
- one feature toast
- North unread
- one red dot

## Later gates

- Elena after proper Café introduction
- Somchai and Kittisak after Police introduction
- Ratchata at Medical Examiner

## Current Phase IV limitation

Cheryl and Farid are implemented as dialogue characters and portrait registries, but they are **not currently registered as Character Journal entries**.

This is not an owner-reported blocker in 0.9.3, but it remains an incomplete Journal integration relative to the long-term design.

Rule for future work:

- do not silently add them during unrelated Phase V work
- when Journal expansion is approved, add Cheryl and Farid after their formal Phase IV introductions
- preserve unread-dot behavior
- avoid duplicate unlocks on Save/Load
- use real profile assets from the accepted 0.9.3 portrait set

---

# 13. CURRENT CHARACTER JOURNAL CANON

## Benedict

- Name: Benedict
- Thai: เบเนดิกต์
- Age: 42
- Role: Detective / นักสืบ
- Status: Lead Investigator / หัวหน้าผู้สืบสวน
- Protagonist
- Calm, observant, natural humour
- Does not accuse without evidence
- Final decision-maker

## North

- Name: North
- Thai: นอร์ธ
- Age: 32
- Role: IT Specialist / ผู้เชี่ยวชาญด้านไอที
- Status: Trusted Partner / คู่หูที่ไว้ใจได้
- Precise technical investigator
- Dry humour
- Low tolerance for unsupported conclusions
- Leads technical analysis, but does not replace Benedict

## Elena

- Role: Forensic Analyst / นักวิเคราะห์นิติวิทยาศาสตร์
- Status: Professional Contact / ผู้ร่วมงานในคดี
- Gives real and useful information
- Publicly credible
- Do not alter her public description to imply villainy

## Somchai

- Role: Police Officer / เจ้าหน้าที่ตำรวจ
- Status: Cooperative / ให้ความร่วมมือ
- Bangkok officer
- Flirtatious and theatrical
- Competent once focused

## Kittisak Siriwat

- Thai name: กิตติศักดิ์ ศิริวัฒน์
- Role: Police Captain
- Thai role: ร้อยตำรวจเอก
- Status: Reserved
- Current Thai runtime status: `ระมัดระวังตัว`
- Intended semantic meaning: reserved, restrained, not emotionally open

Owner discussion:

- `Reserved` is a short current impression, not his rank
- a more literal Thai polish could be `สงวนท่าที`
- no wording change was ordered after 0.9.3
- do not alter without approval

Bio:

- disciplined Police Captain
- controls access to certified evidence
- refuses conclusions beyond evidence

## Ratchata (Dr. Singh)

Display name must remain:

`Ratchata (Dr. Singh)`

- Age: 43
- Role: Senior Medical Examiner
- Thai Sikh forensic pathologist
- Independent Expert
- dry humour
- scientifically strict

Portrait fallback:

1. `assets/images/ratchata/profile.png`
2. `assets/images/ratchata/neutral.png`

---

# 14. CHARACTER STATUS SEMANTICS

The short status on a Character Card is currently static.

Examples:

- Lead Investigator
- Trusted Partner
- Professional Contact
- Cooperative
- Reserved
- Independent Expert

It is not currently recalculated from relationship values.

Dynamic values that may change:

- Trust
- Respect
- Affection
- Suspicion
- Relationship average

The owner discussed dynamic status progression but chose to defer it because it would expand testing and is not needed for the current Phase V production path.

Do not implement dynamic status during unrelated work.

Possible future polish:

`Reserved → Professional Respect → Cooperative Ally → Trusted Contact`

A future implementation should derive status at render time rather than add a new Save field.

---

# 15. PORTRAIT MASTER STANDARD

## Owner-confirmed standard

A dialogue portrait exists to look excellent inside the dialogue frame.

It does **not** need to reproduce the entire source pose.

Priority:

1. face
2. expression
3. upper torso
4. stable framing
5. clean silhouette
6. identity
7. only then hands/props/lower body

## Required production rules

- enlarge when needed
- crop lower body freely
- crop arms/props if they damage framing
- face and torso clearly visible
- emotion immediately readable
- no stretching
- fixed canvas
- consistent anchor
- true transparent alpha
- no white halo
- no checkerboard
- no residual matte
- no white RGB in transparent pixels
- inspect on dark dialogue background
- fit should visually match Benedict and North

## Current 0.9.3 assets

Canvas:

`744 × 1000 RGBA PNG`

### Cheryl, 12

Path:

`assets/images/chapter-03/phase-04/cheryl/`

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

### Farid, 17

Path:

`assets/images/chapter-03/phase-04/farid/`

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

## Runtime portrait rule

Current CSS displays authored canvases at:

- width 100%
- height 100%
- `object-fit: cover`
- `object-position: center top`
- no transform
- no forced 102% scaling

Do not reintroduce CSS scaling tricks.

---

# 16. CHAPTER TITLES

## Chapter I

**ROOM 1807**

## Chapter II

**THE PERFECT STRANGER**

## Chapter II ending/case label

**THE ELEVEN-MINUTE LIE**

Thai:

**คำลวงสิบเอ็ดนาที**

This is not the Chapter II title.

## Chapter III

**THE BORROWED MINUTES**

Thai:

**สิบเอ็ดนาทีที่ถูกยืม**

Do not rename Chapter III to `BROKEN ALIBI`.

---

# 17. MAIN STORY CANON

The mystery repeatedly separates:

1. what physically happened
2. what official records claim happened
3. which permission was accepted
4. which device/route the event claimed
5. who actually used it
6. who authored the larger plan

A valid profile, token, credential or signature can establish:

- accepted access
- an allowed role
- a claimed device
- an accepted route
- a valid signature

It does not establish:

- operator identity
- physical presence
- authorship
- motive
- mastermind identity

---

# 18. CHAPTER I – ROOM 1807

Status:

`COMPLETE AND PLAYABLE`

## Victim rule

The Room 1807 victim is not Daniel Voss.

## Main evidence

- Victim’s Phone
- blood-stained evidence
- cleared Laptop
- half-packed Suitcase
- warning message
- missed calls from `R.`
- pier note

## Main deduction

- body moved
- room staged
- laptop history cleared
- suitcase suggests intended departure
- phone positioned for investigators
- true objects arranged into a false sequence

## Ending

Unknown caller:

> “You looked in the wrong room.”

## Unresolved

- Room 1807 victim identity
- full meaning of 1807
- identity of `R.`
- pier meeting
- caller identity
- reason Benedict and North were targeted

`R.` is not confirmed as Ratchata.

---

# 19. CHAPTER II – THE PERFECT STRANGER

Status:

`COMPLETE AND PLAYABLE`

Victim:

Daniel Voss, 38.

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
- Daniel’s investigation board
- Hotel 1807 links
- “Ask E. about the corrected time”
- Orchid Café draft
- draft edited 05:51

## Elena continuity

North identifies `E.` through an investigative step.

Elena verifies an archived-case toxicology record, not Daniel’s future postmortem record.

She provides true information.

## Police findings

- certified export
- custody envelope
- accepted Evidence Division permission
- profile 18-07
- FS-12 / Terminal Three
- local session offline

## Forensic findings

- sealed sample genuine
- raw scientific result genuine
- 06:17 Laboratory Accession Record
- 05:58 changed to 06:09
- accepted permission used
- event claims FS-12
- operator unverified

## Medical findings

- death before corrected digital collection time
- official discovery 06:20
- laboratory accession 06:17
- manipulation targeted chronology
- body cannot identify operator

---

# 20. CANONICAL DANIEL TIMELINE

| Time | Canon event |
|---|---|
| 05:47 | Daniel’s building accepts Temporary Operational Profile 18-07 |
| 05:51 | Daniel’s Orchid Café draft is edited |
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

Do not say the credential physically walked into the building.

### 06:09

- accepted Evidence Division permission
- Temporary Operational Profile 18-07
- event claims FS-12
- source route later traced through Singapore infrastructure
- operator unverified

### 06:17

Always means:

**Laboratory Accession Record created**

Do not casually rename it as custody, delivery, report generation or case creation.

### 06:20

Official reported discovery of Daniel.

---

# 21. TEMPORARY OPERATIONAL PROFILE 18-07

`18-07` is not a person.

It is a Temporary Operational Profile capable of carrying accepted roles/permissions across connected systems.

## Proven use at 05:47

- accepted by Daniel’s building
- resident-access role
- operator unknown

## Proven use at 06:09

- accepted Evidence Division permission
- changed `COLLECTION_TIME`
- event claims FS-12
- local FS-12 session offline
- route reaches Singapore infrastructure
- operator unknown

Do not write dialogue that treats 18-07 as a confirmed human identity.

---

# 22. CHAPTER III STRUCTURE

## Three converging routes

- `chapter3_timeline`
- `chapter3_old_cases`
- `chapter3_access`

They change emphasis only.

They must converge into one campaign.

## Central mechanism

Singapore is an Infrastructure Nexus for a system that can attach genuine evidence to an engineered official chronology.

Planned full mechanism:

- offline/delayed devices create Signed Local Events
- delayed events are submitted later
- events inside an eleven-minute Reconciliation Window remain eligible
- accepted events can be ordered by Device Timestamp
- outside-window events are flagged
- attacker exploits accepted rules

Phase IV proves that the rule exists.

Phase IV does **not** yet prove:

- raw event order
- source device
- full exploit
- operator
- mastermind

The full mechanism remains for the Digital Forensics climax.

---

# 23. PHASE I – DETECTIVE OFFICE

Status:

`IMPLEMENTED AND OWNER-TESTED`

Day card:

- Day 3
- 08:40 AM
- Bangkok
- Detective Office
- The Missing Passenger

## Findings

- foreign endpoint is Singapore
- Daniel had a real booking
- passenger record missing
- Daniel never checked in
- profile 18-07 carried accepted event through Singapore node at 06:09
- booking/access trail do not prove travel

## Timeline Reconstruction solution

1. 05:47 profile accepted by building
2. 05:51 Café draft edited
3. 05:58 original sample collected
4. 06:09 collection time revised
5. 06:17 Laboratory Accession Record created
6. 06:20 official discovery

---

# 24. PHASE II – BANGKOK TO SINGAPORE

Status:

`IMPLEMENTED AND OWNER-TESTED`

## Media

- `assets/video/chapter-03/phase-02/airplane-takeoff.mp4`
- `assets/video/chapter-03/phase-02/airplane-takeoff-poster.jpg`
- `assets/images/chapter-03/phase-02/airplane-cabin.png`
- cabin ambience WebM preferred, MP3 fallback

## Findings

- Changi confirms booking
- no Daniel check-in
- no Daniel boarding
- no Daniel immigration movement
- profile 18-07 request reached Singapore infrastructure
- Singapore Police assigned a liaison
- liaison not named before formal Phase IV introduction

## Current transition

After the entire in-flight dialogue finishes, Changi’s module schedules the arrival transition.

This was repaired in 0.9.2.

Do not bind Changi before the flight runtime exists.

---

# 25. PHASE III – CHANGI AIRPORT

Status:

`IMPLEMENTED AND OWNER-TESTED`

## Time/location

- Day 3
- Early Afternoon
- Singapore
- Changi Airport
- Arrival Operations

## Opening tone

Operational, controlled and investigative.

The chicken-rice/Prada exchange is allowed as restrained partner humour.

Approved line:

> One more chicken-rice joke and you’ll owe me a Prada by tonight.

## Evidence

### Confirmed Booking and Travel Record

Proves:

- real Bangkok–Singapore reservation
- passport details attached
- seat assigned
- no successful check-in

Does not prove Daniel created the reservation or appeared.

### Passenger Movement and CCTV Index

Proves no Daniel:

- check-in
- baggage acceptance
- boarding scan
- arrival-gate event
- immigration clearance
- CCTV match

### Accepted Verification Request

At 06:09:

- Singapore infrastructure relayed request
- references Daniel booking
- carries accepted Evidence Division permission
- resolves to 18-07
- operator unverified

## Minigame

**Passenger Trail Reconciliation**

Correct classification:

### Documents

- confirmed booking exists
- passport details and seat assignment attached

### Physical Movement

- no check-in/baggage/boarding/immigration
- no CCTV match

### System Access

- Singapore accepted/relayed request at 06:09
- request resolves to 18-07, operator unknown

Correct conclusion:

> The travel identity entered connected systems, but the person did not complete the journey.

## Phase III closing

- Daniel did not travel
- records travelled
- accepted request continues into restricted SPF environment
- local liaison approved office review

## Transition rule

The old Phase III completion card is hidden in the normal flow.

After the closing dialogue:

1. Phase III state completes
2. Changi audio stops
3. Phase IV driving transition begins directly

---

# 26. PHASE IV – SINGAPORE INVESTIGATION OFFICE

Status:

`IMPLEMENTED AND OWNER-TESTED`

## Time/location card

- Day 3
- Early Evening
- Singapore Investigation Office
- Local Access, Limited Trust

## Driving transition

Assets:

- `assets/video/chapter-03/phase-04/drive-to-investigation-office.mp4`
- `assets/audio/chapter-03/phase-04/drive-to-investigation-office.mp3`

Rules:

- video full-screen
- only Skip Transition over video
- no large location panel over the driving footage
- after video, separate location card
- then office scene

## Background/audio

- `assets/images/chapter-03/phase-04/singapore-investigation-office.png`
- `assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3`

## Formal introductions

### Inspector Cheryl Goh

- SPF liaison
- sharp
- controlled
- skeptical
- limits access initially
- not a villain
- does not let routes become suspects

### Farid Rahman

- Singaporean Malay
- Digital Forensics Specialist
- friendly
- technically capable
- works with North
- no romance with North
- not comic relief

## Player choice with Cheryl

1. Evidence first
2. Urgency
3. Cooperate with read-only limit

All choices converge.

## Access level

Only:

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
- signed delayed events inside window remain eligible

Does not prove:

- full mechanism
- source device
- operator

## Limited Header Comparison solution

1. Original 05:58 → **Original Header**
2. Corrected 06:09 → **Corrected Header**
3. Both signatures validate / corrected claims FS-12 → **Shared**
4. Eleven-minute reconciliation rule → **Policy Marker**

Correct conclusion:

> Two versions passed validation and an eleven-minute reconciliation rule exists, but raw event order, source device and operator remain unproven.

Internal correct conclusion ID:

`inside_window`

## Compare button lifecycle

It appears only when:

- Cheryl/Farid introduction complete
- player choice complete
- scene stage is investigation
- all three evidence items collected
- evidence dialogue finished
- no evidence panel open
- no matrix open
- no choice panel open
- matrix not already complete

It must remain hidden and disabled before that.

## Phase IV closing deduction

- two accepted states exist
- eleven-minute rule exists
- Authentication proves accepted access
- Validation proves accepted records
- Attribution remains empty
- Room 1807 staged real objects
- current system stages a timeline using real records
- this remains a working theory, not a charge

## Marina Bay handoff

Opening the review wakes a dormant audit subscriber.

It queries the same transaction through a public gateway near Marina Bay.

Current possibilities remain unresolved.

Cheryl permits endpoint verification but forbids calling it a suspect.

---

# 27. PHASE V – MARINA BAY

Status:

`NEXT PRODUCTION TARGET`

Not implemented.

## Required function

- investigation transition
- surveillance tension
- endpoint verification
- contact setup
- possible indication the team is being watched
- possible Adrian signal
- no tourism montage

## Mandatory continuity from Phase IV

The team arrives because of:

- fresh audit query
- same transaction
- public network gateway
- near Marina Bay
- uncertain origin

Do not invent an unrelated lead.

## Narrative boundaries

At Phase V start:

- Daniel did not travel
- route did
- two headers validate
- eleven-minute policy exists
- raw order unknown
- operator unknown
- mastermind unknown
- Elena not suspected openly
- Adrian not yet confirmed as source
- gateway is not a person
- query may be automatic

## Recommended Phase V structure

### Opening

- direct transition from office
- meaningful location/time card only if time advances
- Marina Bay framed as operational terrain, not postcard scenery

### Investigation

Possible elements:

- identify gateway location class
- distinguish public network exit from physical operator location
- inspect timestamps and short-lived subscriber session
- North/Farid technical collaboration
- Cheryl controls lawful access
- Benedict observes human behavior and physical surveillance

### Tension

Possible fair signals:

- repeated observer position
- a device that changes network path when noticed
- a camera blind spot used deliberately
- a message timed to the team’s arrival
- a public-space contact protocol

Do not immediately confirm Adrian.

### Exit to Phase VI

Evidence should justify:

- Serviced Apartment / Safehouse
- a burner phone
- architecture document
- encrypted drive
- credential clue

The move must be earned by evidence, not convenience.

## Phase V asset direction

Background:

- 864×1536
- noir graphic novel
- Marina Bay recognizable but not tourist-commercial
- evening/night operational lighting
- no embedded UI
- no malformed signage
- no pseudo-text

Audio:

- city ambience
- distant traffic/water/urban hum
- no loud tourist crowd
- readable dialogue
- separate from office ambience

---

# 28. PHASE VI – SERVICED APARTMENT / SAFEHOUSE

Planned evidence:

- Burner Phone
- Architecture Document
- Encrypted Drive
- Fragmented Data

Possible minigame:

**Safe Code / Credential Unlock**

Rules:

- answer derived from evidence
- possibly linked to 18-07
- mobile-friendly
- no arbitrary number
- no permanent fail
- no softlock

---

# 29. PHASE VII – HAWKER CENTRE

Adrian meeting.

Rules:

- public
- populated
- tense despite crowd
- chosen for cameras and witnesses
- Adrian gives only part of the truth
- Benedict chooses approach
- North verifies claims
- no full plot dump
- no villain caricature
- no cowardly Adrian

---

# 30. PHASE VIII – DIGITAL FORENSICS LAB / SECURE SERVER FACILITY

Climax:

- access Raw Reconciliation Record
- operational time pressure
- delayed Signed Local Events
- prove conflicting logs can both validate
- reveal method
- do not reveal mastermind

Roles:

- North leads system analysis
- Farid supports reconstruction
- Cheryl supplies authority/access
- Adrian limited or remote help
- Benedict connects method to motive/operator behavior

---

# 31. PHASE IX – CHAPTER END

Must prove:

- Singapore is infrastructure route
- conflicting chronologies can both validate
- evidence may be real while sequence false
- credential validity does not identify operator
- Adrian knows system but is not mastermind

Elena may contact from Thailand.

Her information:

- true
- useful
- strategically timed
- not confession
- not villain-coded

Ending question:

> Who chose which event would be recorded, and which event would be forgotten?

---

# 32. OWNER-LEVEL CHARACTER SECRETS

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
- false information from her merely to make her look guilty

Her method is selective truth and timing.

## Adrian

- former System Architect
- fugitive
- complicit insider
- not mastermind
- not architect of the full murder plan

May be guilty of:

- concealment
- failure to report
- enabling
- fleeing
- evidence-supported complicity

---

# 33. AUDIO GOVERNANCE

## Channels

- Music
- Ambience
- SFX

## Existing owners

- `02-audio-save.js`
- `11-production-stabilization.js`

Do not create a third audio manager.

## UI click

Owner:

`08-stability-repair.js`

Rules:

- embedded WAV
- pointerdown
- immediate
- one press, one sound
- no synthetic tick feel
- no duplicate Android playback

## Evidence cue

- one playback
- separate from puzzle success
- no second tail
- stops on scene exit

## Police ambience

Stable clean boundary:

- start 4.6 seconds
- end 45.0 seconds

Do not disturb without full trace and real-device test.

## Phase II

- takeoff video audio via SFX
- cabin ambience via Music
- dialogue ducking
- media stops on exit/restore

## Phase III

Paths:

- `assets/audio/chapter-03/phase-03/singapore-arrival-transition.mp3`
- `assets/audio/chapter-03/phase-03/changi-airport-ambience.mp3`

## Phase IV

Paths:

- `assets/audio/chapter-03/phase-04/drive-to-investigation-office.mp3`
- `assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3`

No audio files changed in 0.9.3.

---

# 34. UI AND INVESTIGATION LIFECYCLE

## Dialogue

- one tap advances one line
- no double advance
- prompt normalized
- portrait/emotion match speaker
- onComplete is authoritative
- do not expose next gameplay layer until onComplete

## Hotspots

Before available:

- hidden/disabled
- no pointer events
- no keyboard focus
- no yellow point behind dialogue

When available:

- yellow

After collected:

- green

## Evidence

Required flow:

1. open
2. inspect
3. reveal detail
4. Add to Case File
5. close
6. dialogue
7. next control unlock

## Review/minigame buttons

Must not appear:

- behind dialogue
- behind evidence panel
- before all evidence
- from stale Save state
- while another overlay is open

## Mobile

Test at minimum:

- 360×800
- 412×915

Account for:

- browser bar
- Android nav bar
- safe-area bottom
- dialogue box height
- fixed controls
- scrollable modal body only

---

# 35. FULLSCREEN AND EXIT

Owner-confirmed in 0.8.2.

Requirements:

- fullscreen can begin from user gesture
- Settings control available
- menu control available
- Save Manager remains visible
- no stretching of scenes
- Exit Game saves current progress
- browser close attempt where permitted
- safe fallback when browser forbids close

Do not move modals outside the fullscreen root.

---

# 36. VISUAL DIRECTION

## Backgrounds

`864 × 1536`

Style:

- noir graphic novel
- cel-shaded
- heavy ink
- angular shadows
- cinematic crime adventure
- bright enough for mobile

## Rules

- no embedded UI unless requested
- no chapter title baked into background
- no pseudo-text
- exact readable text or no text
- inspect signs
- no malformed English
- preserve clean composition behind dialogue UI

---

# 37. CURRENT KNOWN NON-BLOCKING ITEMS

These are not owner-reported failures in 0.9.3.

## Character Journal Cheryl/Farid

Not yet registered.

Future integration requires approval and full Save/Load/red-dot testing.

## Kittisak Thai status wording

Current runtime:

`ระมัดระวังตัว`

Meaning intended:

`สงวนท่าที`

Owner did not request a patch after discussion.

## Dynamic Character Card statuses

Deferred polish.

## Version metadata mismatch

Integration export may still report 0.9.2.

Do not patch alone.

## Static page title

`<title>Last Witness — Chapter 1</title>` remains legacy.

Not a current gameplay blocker.

---

# 38. TECHNICAL RISKS

## Classic global overrides

Several files redefine global functions.

Always search the entire load chain.

## Dynamic runtime

Chapter III DOM is injected dynamically.

Do not bind to nonexistent elements before modules load.

## Observer proliferation

Existing observers already cover:

- dialogue prompts
- journal reconciliation
- character detection
- some state repairs

Do not add another observer unless existing ownership cannot solve the problem.

## Audio overlap

Two owners cooperate.

Trace both.

## Save compatibility

Any Phase V screen must be added to:

- screen label
- snapshot/restore
- Chapter III runtime preparation
- resume logic
- audio reconstruction
- menu/save controls
- state defaults

## Portrait regressions

Do not:

- resize source directly into fixed canvas
- stretch
- leave white RGB in transparent pixels
- use CSS transform to repair bad assets
- reduce face to tiny full-body thumbnail
- crop Farid to face only
- reintroduce white halo

---

# 39. TESTING STANDARD

For every patch:

## Static

- JavaScript syntax
- CSS parse
- HTML validity where practical
- asset existence
- relative paths
- duplicate IDs
- cache query
- missing portrait emotion
- PNG mode/dimensions where relevant

## Flow

- fresh entry
- opening dialogue
- every choice affected
- evidence open/inspect/collect/close
- post-evidence dialogue
- review/minigame gate
- wrong answer
- reset
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

## Honesty

Never claim:

- Android test
- live GitHub Pages test
- audio listening
- full browser regression
- 100% success

unless actually completed.

Owner device is final truth.

---

# 40. DELIVERY FORMAT

Every code delivery:

- one ZIP
- preserved repository paths
- changed-file manifest
- upload instructions
- SHA-256
- test report
- clear limitations

Never tell the owner to clear Site Data by default.

Clearing Site Data may destroy saves.

---

# 41. NEXT-CHAT ZERO-EXPLANATION HANDOFF

A new assistant must behave as though the owner has said:

> Continue LAST WITNESS from BUILD 0.9.3.  
> Repository: `grolygori789-crypto/last-witness`.  
> Branch: `restore-game-recovered`.  
> Read the latest `GAME_MASTER_PLAN.md`, then fetch latest `index.html` and all files relevant to Phase V.  
> Do not patch from memory or an old ZIP.  
> Do not push or modify GitHub.  
> Work locally and deliver one ZIP.  
> Current owner-confirmed playable boundary is Phase IV complete.  
> Next target is Phase V Marina Bay.  
> Preserve all Chapter I–IV continuity, Save/Load, fullscreen, audio, investigation lifecycle and the accepted 0.9.3 Cheryl/Farid portraits.  
> Elena is the unrevealed mastermind. Adrian is not the mastermind.  
> The Phase IV lead is a fresh audit query through a public network gateway near Marina Bay. It is not yet attributed to a person.

The new assistant should not ask the owner to restate the project.

---

# 42. MASTER PLAN UPDATE PROTOCOL

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

Before replacing:

1. fetch latest version
2. preserve confirmed Canon
3. preserve unresolved mysteries
4. preserve owner secrets
5. preserve workflow
6. preserve future Chapter III plan
7. record new owner result
8. keep filename exactly:
   - `GAME_MASTER_PLAN.md`

---

# 43. CURRENT CANON SUMMARY

## Confirmed in game

- ROOM 1807 staged
- Room 1807 victim is not Daniel
- Daniel investigated related pattern
- profile 18-07 is operational profile, not person
- canonical six-event timeline
- genuine science
- engineered chronology
- FS-12 / Terminal Three
- offline local session
- Singapore route
- Daniel booking real
- Daniel did not travel
- Changi separates documents, movement and access
- two office headers validate
- eleven-minute policy exists
- raw order/operator unresolved
- Marina Bay audit query lead

## Confirmed by owner, secret from player

- Elena is mastermind
- Elena is killer
- Adrian is not mastermind

## Unresolved

- `R.`
- Room 1807 victim
- warning caller
- pier meeting
- full 1807 meaning
- operator of accepted events
- source of Marina Bay query
- exact exploit
- how permissions were acquired
- final mastermind reveal path

---

# END OF MASTER PLAN

Do not delete or replace this file without preserving:

- BUILD 0.9.3 owner pass
- repository rules
- latest load order
- Save/Load continuity
- fullscreen/exit behavior
- Character Journal gates
- Kittisak Police Captain Canon
- 0.9.3 portrait standard
- Chapter I–IV Canon
- Phase V Marina Bay handoff
- Elena secret
- Adrian boundary
- complete Phase VI–IX blueprint
- next-chat zero-explanation handoff
