# LAST WITNESS – GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-07-23  
> **Current production baseline:** `0.7.10`  
> **Owner device result:** `PASSED – NO DEFECT REPORTED IN THE LATEST REGRESSION ROUND`
>
> เอกสารฉบับนี้แทนที่สถานะเก่าที่เคยหยุดอยู่ที่แพตช์ 0.5.5 และรวบรวม Production, Runtime Ownership, Canon, Gameplay, Character Journal, Save/Load, Audio, UI, Chapter III Blueprint, Known Risks และกฎส่งมอบล่าสุดไว้ในไฟล์เดียว
>
> ก่อนทำงานทุกครั้ง ต้อง Fetch ไฟล์ล่าสุดจาก GitHub branch `restore-game-recovered` ใหม่เสมอ แม้ข้อมูลในเอกสารนี้จะละเอียดเพียงใดก็ตาม เพราะ GitHub Runtime Files คือ Source of Truth สำหรับโค้ดจริง ส่วนเอกสารนี้คือ Source of Truth สำหรับ Canon, Production Status, Workflow และ Handoff

---

# 0. EXECUTIVE HANDOFF

## Current Truth

- Game: **LAST WITNESS**
- Studio: **BENEDICT INTERACTIVE**
- Repository: `grolygori789-crypto/last-witness`
- Production branch: `restore-game-recovered`
- Live game: `https://grolygori789-crypto.github.io/last-witness/`
- Primary planning file: `GAME_MASTER_PLAN.md`
- Current owner-confirmed baseline: **BUILD 0.7.10**
- Current playable scope:
  - Chapter I complete
  - Chapter II complete
  - Chapter III Phase I complete
  - Chapter III Phase II complete through the in-flight scene
- Next planned production work:
  - **Chapter III Phase III – Changi Airport / Arrival Operations Corridor**
- Latest owner test:
  - Save/Load flow passed
  - Save Manager exit flow passed
  - Character Journal gates passed
  - Police Station choices passed
  - Police ambience tail fix passed
  - Owner reported **no defect** in the latest regression round

## Critical Continuation Rule

A new chat must never begin by editing from memory, an old ZIP, or files from the previous chat.

Required first action:

1. Fetch the latest `GAME_MASTER_PLAN.md`.
2. Fetch the latest `index.html`.
3. Confirm the current Build label and script load order.
4. Fetch every file related to the requested work.
5. Inspect overlapping listeners, MutationObservers, timers, state repair, audio owners and legacy overrides.
6. Explain the verified root cause or implementation plan before modifying code.
7. Work locally.
8. Deliver a ZIP only.
9. The owner uploads to GitHub personally.

---

# 1. PROJECT IDENTITY

## Game Title

**LAST WITNESS**

## Studio / Brand

**BENEDICT INTERACTIVE**

## Tagline

**The dead don't talk. Evidence does.**

Thai:

**คนตายพูดไม่ได้ แต่หลักฐานพูดแทนได้**

## Genre

- Narrative Detective Adventure
- Interactive Crime Investigation
- Evidence-based mystery
- Story-driven dialogue
- Light relationship and personality choices
- Mobile-first browser game

## Target Platform

- Browser game
- Google Chrome
- Android is the owner's primary real-device test environment
- Mobile-first
- Portrait orientation
- Primary layout target: 9:16
- Important UI must remain accessible while the browser address bar and Android navigation controls are visible

## Core Tone

- Crime mystery
- Noir-inspired atmosphere
- Serious investigation with restrained dry humour
- Intelligent and professional characters
- Conclusions must be supported by evidence
- No careless accusation before the evidence supports it
- Singapore must remain part of the investigation, not a tourism sequence

## Core Narrative Principle

The game repeatedly separates:

1. What physically happened
2. What official records claim happened
3. Which permission the system accepted
4. Which device or route the event claimed
5. Who actually used that permission

> **A valid credential proves access, not identity.**

Authentication proves the system accepted a credential or permission. Attribution asks who actually operated it.

---

# 2. REPOSITORY, BRANCH AND DELIVERY GOVERNANCE

## Repository

`grolygori789-crypto/last-witness`

## Production Branch

`restore-game-recovered`

## Live Game

`https://grolygori789-crypto.github.io/last-witness/`

## Primary Planning File

`GAME_MASTER_PLAN.md`

## Source-of-Truth Rules

- GitHub is the Source of Truth for runtime code and assets.
- This Master Plan is the Source of Truth for owner-confirmed Canon, status, constraints and handoff.
- Never patch from memory.
- Never patch from an old ZIP.
- Never patch from a previous chat attachment.
- Always fetch the latest branch before every task.
- When runtime and plan conflict, inspect both and identify which one is stale before changing anything.
- Do not silently convert a proposal into Canon.

## Mandatory Procedure Before Any Code Change

1. Inspect the latest `restore-game-recovered` branch.
2. Read `GAME_MASTER_PLAN.md`.
3. Inspect `index.html`.
4. Confirm CSS, JavaScript, Audio and dynamic runtime load order.
5. Inspect every file related to the report or feature.
6. Check:
   - inline handlers
   - bubbling and capture listeners
   - overwritten global functions
   - MutationObservers
   - timers
   - audio lifecycle owners
   - state repair
   - Save/Load restore
   - legacy compatibility shims
7. State the verified root cause or implementation ownership.
8. Patch the fewest files necessary.
9. Test the exact runtime flow.
10. Report exactly what was and was not tested.
11. Deliver modified files as one ZIP.
12. List every upload path.
13. The owner uploads the files personally.

## Prohibited Actions

- Do not create a GitHub branch.
- Do not commit or push.
- Do not update or delete GitHub files directly.
- Do not modify GitHub Pages directly.
- Do not restructure the repository without owner approval.
- Do not add another hotfix, polling loop, observer or audio controller merely to cover an unresolved conflict.
- Do not claim 100% success before the owner tests the real device.
- Do not claim Android, live-site or audio listening tests unless actually performed.
- Do not ask the owner to clear Site Data as a default step because it can destroy saves. Use it only when state migration or cache diagnosis genuinely requires it.

---

# 3. CURRENT PRODUCTION STATUS

## Production Baseline

**LAST WITNESS BUILD 0.7.10**

Status:

`OWNER-CONFIRMED PASSED – NO DEFECT REPORTED IN LATEST REGRESSION ROUND`

## Scope Confirmed Stable by the Current Work Cycle

- Chapter I opening and Room 1807 flow
- Chapter II Detective Office
- Victim's Apartment
- Orchid Café
- Police Station
- Forensic Science
- Medical Examiner
- Chapter II ending
- Chapter III Phase I
- Timeline Reconstruction
- Chapter III Phase II takeoff and in-flight scene
- Save Manager:
  - Named saves
  - Load
  - Delete
  - Export
  - Import
  - Auto save
  - Visible exit controls
  - Auto-close after successful save
- Character Journal:
  - Hidden in Chapter I
  - Hidden during the first Chapter II North conversation
  - Unlocks after the full North office conversation
  - Adds Benedict and North only at first unlock
  - Story-gated character additions
  - Red unread dot behavior
  - Stale-character filtering
- Police Station:
  - Three response choices
  - Relationship initialization
  - Evidence progression
  - Transition to Forensic
  - Clean ambience loop without the silent/click tail

## Current Playable Boundary

The game currently ends after **Chapter III Phase II**, in flight from Bangkok to Singapore.

Chapter III Phase III and later phases are planned but not implemented in the current production runtime.

## Next Production Target

**Chapter III Phase III – CHANGI AIRPORT**

Primary purpose:

- Separate physical passenger movement from system access
- Verify that Daniel had a real booking but did not check in, board or cross immigration
- Trace profile 18-07 and Singapore infrastructure without claiming that Daniel travelled
- Prepare the introduction of Singapore Police liaison and the move to the Singapore Investigation Office

---

# 4. VERIFIED PRODUCTION SNAPSHOT

The following SHAs were verified from `restore-game-recovered` while preparing this handoff on 2026-07-23.

These SHAs are a snapshot, not permission to skip a new fetch.

| Path | Verified blob SHA | Role |
|---|---|---|
| `GAME_MASTER_PLAN.md` | `6c3531863194d265631c854b757ef20fb6765a7e` | Previous outdated plan being replaced |
| `index.html` | `258da71584c2ce8571de1e0e6a5c52107ef01410` | Static DOM, CSS and script order |
| `js/engine/01-runtime-data.js` | `54e7c26ab5b4a7a510a9d42a4e6a5a89f6fbf86e` | State, localization, base registries |
| `js/engine/02-audio-save.js` | `2668239dcd375b210a90856d132d19c4f2464410` | Save Manager and base audio, Build 0.7.10 |
| `js/engine/03-journal-progress.js` | `0c5d765532f02d0f0181e76debbad414720d7501` | Legacy journal/relationship helpers |
| `js/engine/04-ui-dialogue.js` | `f9f59e017c959ccd269426a616f53609e84adad9` | Screen routing and shared UI |
| `js/engine/05-developer-tools.js` | `1e99a7dd72ee1da007699fa37523cd3aa6d048c4` | Developer access and jumps |
| `js/engine/06-regression-fixes.js` | `23b6a7bdc8dfecedb3195322d1d1ff22743502db` | Global dialogue/police/evidence overrides |
| `js/engine/07-dialogue-continuity.js` | `c6a6c45be8daa9fcb71f0d2da68e1bf4c74a7e31` | Dialogue prompt normalization |
| `js/engine/08-stability-repair.js` | `5ccf580e2bcfd41bdd1429e60154270bef6df197` | Immediate click owner and runtime loader |
| `js/engine/11-production-stabilization.js` | `a0869df63e607d2388bdc905181d1bd6e9c3e5a5` | Production scene audio/evidence runtime |
| `js/engine/06-content-registry-dev.js` | `48d587212e349f51df4fa523e70c8efaa8eae187` | Canon Character Journal owner |
| `js/engine/09-defect-hotfix.js` | `246bedca156cb36788275420fb43980d13110bce` | Disabled compatibility shim |
| `js/engine/10-defect-repair-0.4.0.js` | `32cff707669d941181d80183d46cf409c60f7462` | Disabled compatibility shim |
| `js/chapters/chapter-01/chapter-01.js` | `febe10dd4b838567b8849a9d2550da96b5546dc9` | Chapter I flow |
| `js/chapters/chapter-02/01-cafe-police.js` | `2498766c7ddd355073740ce051ece6c6ddfb6930` | Café and Police, 0.7.10 |
| `js/chapters/chapter-02/02-apartment-office.js` | `0c46ea3756c4a6b98a2e8b727f38693251b5d360` | Office and Apartment, 0.7.9 |
| `js/chapters/chapter-02/03-forensic-science.js` | `3f003d6f7bf95090ab7036b523613944278cb291` | Forensic, 0.7.7 |
| `js/chapters/chapter-02/04-medical-examiner.js` | `4cc196c0a8761e03877759d8ce2cc6b362bf4fc3` | Medical Examiner, 0.7.7 |
| `js/chapters/chapter-02/05-chapter2-integration.js` | `946ea0b5ea26d2ee4651e74e746c5d5e855c905a` | Chapter II→III integration, 0.7.7 |
| `js/chapters/chapter-03/01-title-phase1.js` | `6e108c3475589e708262474260c2128941b9df0c` | Chapter III Phase I–II, 0.7.7 |

---

# 5. STATIC AND DYNAMIC LOAD ORDER

## CSS from `index.html`

1. `css/style.css`
2. `css/forensic-phase.css`
3. `css/medical-examiner.css`

## Static JavaScript Load Order

This order is legacy-sensitive. Do not reorder casually.

1. `js/engine/01-runtime-data.js`
2. `js/engine/02-audio-save.js?v=0710`
3. `js/engine/03-journal-progress.js`
4. `js/engine/04-ui-dialogue.js`
5. `js/engine/05-developer-tools.js`
6. `js/chapters/chapter-02/01-cafe-police.js?v=0710`
7. `js/chapters/chapter-02/02-apartment-office.js?v=079`
8. `js/chapters/chapter-01/chapter-01.js`
9. `js/engine/06-regression-fixes.js`
10. `js/chapters/chapter-02/03-forensic-science.js?v=077`
11. `js/engine/07-dialogue-continuity.js`
12. `js/engine/08-stability-repair.js`
13. `js/chapters/chapter-02/04-medical-examiner.js?v=077`
14. `js/chapters/chapter-02/05-chapter2-integration.js?v=077`
15. `js/engine/06-content-registry-dev.js?v=079`
16. `js/engine/09-defect-hotfix.js`
17. `js/engine/10-defect-repair-0.4.0.js`

## Dynamic Loads

### Production stabilization

`08-stability-repair.js` dynamically loads:

`js/engine/11-production-stabilization.js?v=073`

This file is the main production owner for scene-aware investigation audio, evidence cues, Room 1807 audio, Forensic/Medical audio and several state/runtime repairs.

### Chapter III

`05-chapter2-integration.js` dynamically loads:

- `css/chapter-03.css?v=074`
- `js/chapters/chapter-03/01-title-phase1.js?v=077`

The static `chapter3Wip` screen in `index.html` is a fallback if the dynamic runtime cannot load. It is not the current normal Chapter III experience.

## Load-Order Warning

Several functions are intentionally defined early and overridden later.

Examples:

- `runDialogue`
- `policeText`
- Police evidence handlers
- Save button handlers
- global `play`
- Character Journal rendering
- scene audio refresh
- screen transition behavior

Never edit one definition without searching the entire loaded runtime for later assignments, capture listeners and observers.

---

# 6. RUNTIME OWNERSHIP MAP

## `01-runtime-data.js`

Owns:

- DOM helpers `$` and `$$`
- base portraits
- base audio element references
- localization dictionary
- default state object
- auto/manual legacy storage keys
- clue metadata

## `02-audio-save.js` – Build 0.7.10

Owns:

- base ambience entry
- Police clean-loop boundary
- auto save snapshot
- named manual saves
- IndexedDB persistence
- localStorage fallback
- Save Manager UI
- Save/Load/Export/Import/Delete
- legacy manual save migration
- Chapter III runtime preparation before restore
- Build label

## `03-journal-progress.js`

Owns legacy helpers for:

- portrait lookup
- relationship calculations
- original Character Journal rendering
- progress and related UI

The canonical story-gated Character Journal is now owned by `06-content-registry-dev.js`, but the legacy helpers still exist and must be inspected before any journal change.

## `04-ui-dialogue.js`

Owns:

- chapter intro cards
- `show(screen)`
- base screen transition routing
- automatic ambience call
- base Chapter II late-screen journal repair
- evidence collection entry

## `05-developer-tools.js`

Owns:

- hidden developer access
- version-tap access flow
- developer scene jumps
- developer reset and fresh-scene tools

Current developer access code in runtime:

`room1807`

Do not expose Developer Mode as normal player UI.

## `06-regression-fixes.js`

Important override layer:

- replaces global `policeText`
- replaces global `runDialogue`
- owns live TH/EN dialogue rendering
- repairs Police evidence inspection
- repairs Case File behavior
- rebinds Save buttons

Any dialogue, localization or Police input change must inspect this file.

## `07-dialogue-continuity.js`

Uses a MutationObserver to normalize every `.dialogue .next` prompt to:

- `TAP TO CONTINUE`
- `แตะเพื่อดำเนินต่อ`

Do not add another prompt-normalization observer.

## `08-stability-repair.js`

Owns:

- immediate embedded-WAV UI click
- duplicate physical-touch suppression
- disabling legacy MP3 click playback
- portrait repair for Elena, Somchai and Kittisak
- review-button affordance
- Character Card affordance
- Medical hotspot color repair
- dynamic load of `11-production-stabilization.js`

## `11-production-stabilization.js`

Owns the production investigation runtime for:

- scene-aware audio
- Room 1807 noir loop
- Apartment audio lifecycle
- Forensic loop
- Medical loop
- Evidence inspection cue
- Puzzle success cue
- Scanner cue
- scene audio ducking
- one-shot cleanup
- stale state repair
- several evidence transitions

Do not create a third audio controller. Reconcile `02-audio-save.js` and this file before changing ambience.

## `06-content-registry-dev.js`

Canonical owner of:

- Character Journal visibility
- allowed character IDs
- character unlock gates
- unread state
- red dots
- stale-character filtering
- Character Cards and details
- Ratchata portrait fallback
- developer character unlock
- registry persistence

Storage key:

`lastWitness.contentRegistry.v3`

## `09` and `10`

Both are disabled compatibility shims and intentionally install no listeners, observers, polling or audio overrides.

Do not revive their historical logic.

---

# 7. STATE MODEL

## Core Runtime State

Important fields include:

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

## State Ownership Rule

Never write a flag simply because it produces the desired UI.

First identify:

- who initializes it
- who persists it
- who repairs it
- who derives UI from it
- who filters it on load
- who may overwrite it later in the script order

## Fresh Run Rules

### New Game

Must start with:

- Chapter I
- no Characters menu
- no stale Character Cards
- no Chapter II/III story flags
- fresh Chapter I evidence and history

### New Chapter II

Must reset:

- Character Journal feature gate
- character unlocked list
- character unread list
- stale Elena/Somchai/Kittisak/Ratchata state
- Police phase state
- Forensic state
- Medical state
- Chapter III route flags
- visible Forensic and Medical hotspot states

---

# 8. SAVE / LOAD SYSTEM

## Current Build

`0.7.10`

## Save Format

- Format: `LAST_WITNESS_SAVE`
- Save version: `1`
- Build value stored in snapshot: `0.7.10`

## Storage

### Auto Save

localStorage key:

`last_witness_rc1_auto`

### Legacy Manual Key

`last_witness_rc1_manual`

Legacy manual saves are migrated to a named slot and the old key is removed.

### Named Save Database

- IndexedDB database: `last_witness_saves`
- Object store: `slots`
- Key path: `id`
- Index: `updatedAt`

### Fallback

localStorage key:

`last_witness_named_saves_v1`

## Save Manager Features

- Multiple named saves
- Duplicate-name overwrite confirmation
- Auto Save card
- Load
- Export to `.lwsave`
- Import `.lwsave` or JSON
- Delete
- Persistent-storage request where supported
- Mobile-safe footer
- top-right `×` close button
- footer `CLOSE` button
- backdrop close
- Escape key close
- `CANCEL` before saving
- busy-state protection against double tap
- `GAME SAVED` status
- automatic return to game approximately 700 ms after a successful save

## Snapshot Fields

Save snapshot includes:

- screen
- found evidence
- dialogue history
- timestamp
- chapter
- progress
- checkpoint
- character state
- relationships
- flags
- personality
- journal state
- Forensic state
- Medical state
- Chapter III state
- canonical character unlocks
- canonical unread characters
- evidence registry
- language
- sound
- music
- sfx

## Restore Rules

- Rebuild `found` as a `Set`
- Restore settings
- Reconstruct the target screen
- Re-enter the relevant Chapter II scene
- Load Chapter III runtime before restoring a Chapter III save
- Filter story characters against actual progress
- Refresh Character Journal visibility, cards and dots
- Reconstruct audio from the restored scene instead of blindly resuming stale playback

## Save Compatibility Rule

Any new phase must be represented in:

- `screenLabel`
- snapshot state
- restore route
- Chapter III runtime preparation
- scene-specific resume logic
- audio reconstruction
- journal/evidence repair where applicable

---

# 9. CHARACTER JOURNAL – CURRENT CANON BEHAVIOR

## Feature Gate

### Chapter I

- Characters menu hidden
- no Character Cards
- stale entries from an older run must not appear

### Chapter II Phase I before North conversation ends

- Characters menu hidden
- North not yet added to the Journal
- canonical unlocked array remains empty

### After the full North Detective Office conversation ends

Unlock exactly:

1. Benedict
2. North

Expected behavior:

- Characters menu appears
- one feature toast
- North is unread
- one red dot
- Apartment entry must not create a second red dot

## Later Story Gates

### Elena

Unlock after her proper Orchid Café introduction completes.

### Somchai and Kittisak

Unlock after the Police Station introduction completes.

Both may be added in one journal update because they are introduced in the same scene.

### Ratchata

Unlock when he is introduced at the Medical Examiner.

Display name:

**Ratchata (Dr. Singh)**

Portrait fallback:

1. `assets/images/ratchata/profile.png`
2. `assets/images/ratchata/neutral.png`

## Unread Rules

- Red dot appears only for genuinely new story entries
- Opening Characters clears all current unread entries
- Re-entering a scene must not resurrect a cleared dot
- Save/Load preserves unread state
- canonical runtime arrays are authoritative
- stale localStorage character IDs are filtered by story flags

## Developer Unlock

Developer unlock may show every character only while the developer flag is active.

A New Game or new Chapter II run must clear the developer all-character flag.

---

# 10. CHAPTER TITLE GOVERNANCE

## Chapter I

**ROOM 1807**

Status: `CONFIRMED IN GAME`

## Chapter II

**THE PERFECT STRANGER**

Status: `CURRENT WORKING CHAPTER TITLE`

## Chapter II Ending / Case Label

**THE ELEVEN-MINUTE LIE**

Thai:

**คำลวงสิบเอ็ดนาที**

This is the case/ending label, not the Chapter II title.

## Chapter III

**THE BORROWED MINUTES**

Thai:

**สิบเอ็ดนาทีที่ถูกยืม**

Status: `CONFIRMED IN GAME / ACTIVE CHAPTER`

## Longer-Term Working Title Pool

- BROKEN ALIBI
- THE MISSING PIECE
- SHADOW OF THE TRUTH
- THE FINAL MOVE
- LAST WITNESS

These titles are not chapter-number locked.

Do not silently rename Chapter III to `BROKEN ALIBI`.

---

# 11. MAIN CHARACTERS

## Benedict

### Identity

- Age: 42
- Role: Detective
- Status: Lead Investigator
- Player-facing protagonist

### Personality

- Calm
- Observant
- Natural humour under pressure
- Playful without becoming a clown
- Notices human contradictions
- Does not accuse without evidence

### Narrative Function

- Main protagonist
- Questions witnesses and suspects
- Makes player-facing decisions
- Connects technical evidence to motive, opportunity and operator behavior
- Must remain essential even when North leads technical work

### Player Approaches

- Warm
- Observant
- Direct

Choices may affect:

- dialogue
- relationships
- personality values
- investigation tone
- Chapter III route acknowledgement

---

## North

### Identity

- Age: 32
- Role: IT Specialist / Technical Investigator
- Status: Benedict's trusted partner

### Personality

- Serious
- Intelligent
- Highly observant
- Precise
- Concise
- Dry humour
- Low tolerance for unsupported claims

### Relationship with Benedict

- Established close partners
- Strong trust
- Natural teasing
- Shared history
- Neither solves everything alone

### Chapter III Role

- Discovers the Singapore endpoint
- Leads system analysis
- Explains Authentication versus Attribution
- Works with Farid
- Tests Adrian's statements
- Leads technical work during the lab climax

### Balance Rule

North leads technical interpretation. Benedict remains the protagonist and final decision-maker.

---

## Elena

### Public Identity

- Forensic Analyst
- Intelligent and trusted professional collaborator
- Calm, precise and technically capable
- Gives real information
- Appears credible

### Owner-Level Secret

`CONFIRMED BY OWNER – DO NOT REVEAL IN CHAPTER III`

Elena is the mastermind and the real killer.

### Long-Term Writing Rules

- Do not reveal this in Chapter III.
- Do not use obvious villain dialogue.
- Do not use villain lighting or suspicious staging.
- Do not make her theatrical or suddenly evasive.
- Elena gives true information.
- She controls which truth arrives, when it arrives and in what order.
- Clues must be fair in retrospect.
- Clues must remain subtle.
- She likely remains in Thailand and assists remotely.
- She does not need to travel to Singapore.
- A late Chapter III contact may be factually correct but strategically timed.

---

## Daniel Voss

- Age: 38
- Chapter II victim
- Different person from the unidentified Room 1807 victim
- Investigated Hotel 1807 and linked shell entities
- Found the same eleven-minute shift in three older cases
- Asked Elena to verify a toxicology record from an archived case
- Did not ask her to inspect his own postmortem record before his death
- Had a real Singapore booking
- Did not check in or board
- His access trail reached Singapore infrastructure

---

## Adrian Tan Wei Ming

### Identity

- Singaporean Chinese man
- Age approximately 43–47
- Former System Architect
- Key Witness
- Fugitive
- Complicit Insider
- Not the mastermind

### Personality

- Highly intelligent
- Guarded
- Exhausted from hiding
- Dry humour
- Speaks only when necessary
- Distrusts police and the system
- Must not be cowardly or cartoonishly evil

### Visual Direction

- Middle-aged Asian man
- Grey shirt
- Dark blazer or coat
- Senior technical expert appearance
- Visible stress and lack of sleep
- Approved 12-expression Character Sheet

### Story Function

- Met at a Hawker Centre
- Understands the Reconciliation Window
- Explains Signed Local Events
- May possess an Encrypted Drive or Architecture Document
- Can appear suspicious
- Later evidence shows he is fleeing the person controlling the system

### Guilt Boundary

May be guilty of:

- concealment
- failure to report
- enabling the system
- fleeing
- other evidence-supported complicity

He did not design the complete murder plan and is not the mastermind.

---

## Inspector Cheryl Goh

### Identity

- Singaporean Chinese woman
- Age approximately 38–42
- Singapore Police Force liaison
- Cross-border case coordinator

### Personality

- Sharp
- Emotionally controlled
- Authoritative
- Skeptical
- Rejects unsupported conclusions
- Not impressed by Benedict's reputation or charm alone
- Develops respect for North
- Must not become a flat obstacle or villain

### Visual Direction

- Asian woman around 40
- Pixie cut
- Navy or dark-blue clothing
- SPF badge
- Approved 12-expression Character Sheet

### Story Function

- Formally introduced at Singapore Investigation Office
- Questions why a Thai case reaches Singapore infrastructure
- Restricts access initially
- Opens access after sufficient evidence
- May become an important ally

### Introduction Timing

The in-flight scene may say Singapore Police assigned a liaison.

Do not name Cheryl before her formal introduction unless the owner changes this rule.

---

## Farid Rahman

### Identity

- Singaporean Malay man
- Age approximately 29–34
- Digital Forensics Specialist
- Not Indian

### Personality

- Friendly
- Fast-working
- Speaks quickly when excited by data
- Highly capable
- Restrained technical jokes
- Respects North
- Must not become comic relief

### Relationship Boundary

No romance with North.

### Visual Direction

- Singaporean Malay man
- Olive jacket
- Dark T-shirt
- SPF badge
- Tablet
- Coffee may appear
- Approved 16-expression Character Sheet

### Story Function

- Works with North on logs
- Demonstrates two conflicting logs that both validate
- Explains Offline Signature Token
- Investigates Singapore node and profile 18-07
- Important in the Digital Forensics climax

---

## Ratchata (Dr. Singh)

### Identity

- Age: 43
- Senior Medical Examiner
- Thai Sikh forensic pathologist
- Independent expert

### Personality

- Scientifically strict
- Dry humour
- Restrained deadpan delivery
- Refuses to make the body prove more than it can

### Story Function

- Confirms toxicology is genuine
- Establishes an independent death window
- Supports the conclusion that chronology was engineered
- Does not claim to identify the operator

---

## Somchai

- Bangkok police officer / investigation officer
- Flirtatious and theatrical
- Observant and competent once focused
- Must not remain a joke after the player chooses how Benedict handles him

## Captain Kittisak Siriwat

- Police captain
- Procedural and disciplined
- Allows observation because the certified accession predates official discovery
- Warns that contradiction is evidence, while accusation requires more

---

# 12. CHAPTER I – ROOM 1807

Status:

`COMPLETE AND PLAYABLE`

## Victim Identity Rule

The Room 1807 victim is not Daniel Voss.

The identity and larger role of the Room 1807 victim may remain unresolved until a later reveal.

## Core Story

North contacts Benedict regarding a possible homicide in Room 1807.

The room is staged. Physical evidence, digital traces and victim behavior do not form one natural sequence.

## Main Evidence

1. Victim's Phone
2. Blood-stained evidence
3. Cleared Laptop
4. Half-packed Suitcase

## Phone Evidence

- “You shouldn't have come here.”
- Three missed calls from `R.`
- Recovered note: “Meet at the pier. 11pm.”

## Main Deduction

- Body moved
- Scene reconstructed
- Laptop history deliberately cleared
- Victim intended to leave
- Phone placed for investigators to find
- Warning may be intended for Benedict and North

## Ending

Unknown caller:

**“You looked in the wrong room.”**

## Narrative Function in the Larger Story

Chapter I establishes the method:

- real objects
- deliberately arranged sequence
- evidence placed for discovery
- a truthful detail can be used inside a false scene

Chapter II then repeats the same philosophy with records and timestamps instead of furniture and physical placement.

## Long-Term Mystery

- `R.` is not confirmed as Ratchata
- `R.` may be routed through Singapore
- `R.` may connect to an intermediary identity such as `Registrar`
- do not reveal `R.` early
- full operational meaning of 1807 remains unresolved

---

# 13. CHAPTER II – THE PERFECT STRANGER

Status:

`COMPLETE AND PLAYABLE`

Ending label:

**THE ELEVEN-MINUTE LIE**

## Victim

Daniel Voss, 38.

Different victim from Chapter I.

## Phase Structure

1. Detective Office
2. Victim's Apartment
3. Orchid Café
4. Police Station – Evidence Division
5. Forensic Science Unit
6. Medical Examiner
7. Chapter II Ending

## Detective Office

North establishes:

- different victim
- Daniel found in his apartment at 06:20
- building accepted temporary profile 18-07 at 05:47
- the access record names a role, not a person
- the pattern resembles the staged logic of Room 1807

Character Journal unlock occurs only after this complete conversation.

## Victim's Apartment

Evidence:

- two coffee mugs
- Temporary Profile 18-07 access record
- Daniel's board linking Hotel 1807 and shell entities
- note: “Ask E. about the corrected time”
- Orchid Café draft
- draft edited at 05:51
- erased recipient field

Continuity:

North matches `E.` to Elena, a forensic analyst in Daniel's contacts, through an actual investigative step. The story must never behave as though North knows the identity without evidence.

## Orchid Café

Daniel asked Elena to verify a toxicology record from one of his archived cases.

The original and corrected copies both validate.

The corrected copy moves `COLLECTION_TIME` from 05:58 to 06:09.

Daniel marked the same shift in three older cases.

Daniel's own Laboratory Accession Record was created at 06:17.

His official discovery was recorded at 06:20.

Elena provides true information and directs the team to:

1. Police certified export and custody envelope
2. Forensic source record

This does not identify her as the killer.

## Police Station

Purpose:

- verify the certified export
- verify the custody envelope
- identify what the export can and cannot prove
- establish accepted Evidence Division permission
- link the event to profile 18-07
- establish FS-12 / Terminal Three naming
- establish that the local session was offline

Player choices:

1. Charm
2. Precision
3. Pressure

All three must remain functional.

Relationship records for Somchai and Kittisak must exist before applying the choice.

## Police → Forensic Handoff

Canonical terms:

- `FS-12` is the system identifier
- Police staff call it `Terminal Three`
- Maintenance removed its network module
- the event presents a trusted machine signature
- the local session could not have originated the command
- the Police record is an export
- Forensic holds the source transaction, workstation audit and instrument batch

The dialogue must not promise a Maintenance Record minigame or evidence item that does not exist.

## Forensic Science

Evidence:

1. Sealed Toxicology Sample
2. Laboratory Accession Record
3. Workstation Audit Trace
4. Instrument Batch Record

Proves:

- physical sample remains sealed
- raw result remains genuine
- accession at 06:17 exists in the source record
- `COLLECTION_TIME` changed from 05:58 to 06:09
- accepted Evidence Division permission was used
- event resolves to temporary profile 18-07
- event claims FS-12
- FS-12 local session was offline
- operator remains unverified
- scientific result and administrative chronology are separate layers

Closing principle:

The database proves what changed. The body determines which timeline is physically credible.

## Medical Examiner

Evidence:

1. Postmortem Indicators
2. Identification and Intake Tag
3. Preliminary Autopsy Report
4. Toxicology Reference Sample

Proves:

- death occurred before the corrected digital collection time
- official discovery recorded at 06:20
- laboratory accession exists at 06:17
- raw result is authentic
- manipulation targeted chronology, not scientific measurement
- body cannot identify the operator

## Chapter II Route Choice

### Timeline

North:

“I'll start with the altered timestamps. Whoever moved them left a route.”

### Old Cases

North:

“I'll pull every archived case Daniel marked. Patterns survive longer than witnesses.”

### Access

North:

“I'll trace who could issue profile 18-07, what permission it carried and where it was used.”

All three routes converge in Chapter III.

---

# 14. CANONICAL DANIEL TIMELINE

This timeline is the central factual spine of Chapters II and III Phase I.

| Time | Canon event |
|---|---|
| 05:47 | Daniel's building access system accepts Temporary Profile 18-07 |
| 05:51 | Daniel's Orchid Café draft is edited |
| 05:58 | Original toxicology sample is collected |
| 06:09 | `COLLECTION_TIME` is changed from 05:58 to 06:09 using accepted Evidence Division permission |
| 06:17 | Laboratory Accession Record is created |
| 06:20 | Daniel is officially reported discovered |

## Terminology Rules

### 05:47

Do not write that “the credential walked into the building.”

Use:

- the building accepted profile 18-07
- profile 18-07 carried a resident-access role
- the event does not establish the person

### 06:09

- Accepted Evidence Division permission
- temporary profile 18-07
- event claims FS-12
- source route unresolved at Forensic
- later traced through Singapore infrastructure
- operator unverified

### 06:17

Always means:

**Laboratory Accession Record created**

Do not casually rename it as:

- police custody time
- sample delivery time
- toxicology report generation
- official case creation

unless a new distinct event is deliberately added to Canon.

### 06:20

Official reported discovery of Daniel.

## Core Contradiction

Daniel's laboratory accession exists three minutes before his official discovery.

The scientific evidence can be genuine while the official chronology around it is false.

---

# 15. TEMPORARY PROFILE 18-07

## Canon Meaning

`18-07` is a **Temporary Operational Profile**.

It is not a confirmed person.

It may carry different accepted permissions or roles across connected systems.

## Current Proven Uses

### 05:47

- accepted by Daniel's building
- resident-access role
- does not identify operator

### 06:09

- carries accepted Evidence Division permission
- changes `COLLECTION_TIME`
- event claims FS-12
- local session offline
- route metadata leads toward Singapore infrastructure

## Identity Principle

A profile, credential or permission can prove:

- the system accepted access
- the event used an allowed route
- the event claimed a device or role

It does not prove:

- who held the device
- who copied the token
- who operated remotely
- who selected the timing
- who authored the larger murder plan

---

# 16. CHAPTER III – THE BORROWED MINUTES

Status:

- Phase I: `IMPLEMENTED`
- Phase II: `IMPLEMENTED`
- Phase III–IX: `PLANNED`

## Three Entry Routes

- `chapter3_timeline`
- `chapter3_old_cases`
- `chapter3_access`

Each route:

- changes the opening emphasis
- acknowledges the Chapter II decision
- preserves the same Canon
- converges into one shared story
- does not become a separate campaign

## Central Mechanism – Reconciliation Window

Singapore is the Infrastructure Nexus for a system capable of attaching real evidence to a false official chronology.

Planned mechanism:

- offline or delayed devices submit Signed Local Events later
- events inside an 11-minute Reconciliation Window are accepted
- accepted events are ordered by Device Timestamp
- late events outside the window are flagged
- attacker exploits the rule to place genuine evidence inside an engineered sequence

This mechanism is planned Canon for the full Chapter III reveal.

Do not over-explain it before the Singapore investigation produces the necessary evidence.

---

# 17. CHAPTER III PHASE I – DETECTIVE OFFICE

Status:

`IMPLEMENTED AND PLAYABLE`

## Day Card

- Day 3
- 08:40 AM
- Bangkok – Detective Office
- The Missing Passenger

## Route Openings

### Timeline route

North traces the eleven-minute change beyond the laboratory.

### Old Cases route

North finds the same external registry in Daniel's archived cases.

### Access route

North establishes that profile 18-07 carried accepted permissions in two countries in one morning.

## Shared Findings

- foreign endpoint is Singapore
- Daniel had a confirmed booking
- passenger record is missing
- team reconstructs the recorded sequence
- Daniel never checked in
- profile 18-07 carried an accepted event through the Singapore node at 06:09
- booking and access trail are not proof that Daniel travelled

## Player Lead Choice after Timeline Puzzle

1. System route
2. Daniel's movements
3. Operator behind profile 18-07

This choice adjusts relationship emphasis and the opening lines of Phase II but does not split the campaign.

## Departure Beat

Final exchange before takeoff:

- Benedict asks for two seats and says this time they verify the passengers
- North has already booked and sent the request to Changi
- Benedict decides to catch up with the record

The transition occurs only after the full dialogue completes.

---

# 18. CHAPTER III TIMELINE RECONSTRUCTION

## Canon Name

**Reconstruct Recorded Sequence**

Thai:

**เรียงลำดับบันทึกเหตุการณ์**

## Player Instruction

Arrange the six verified timestamps.

A valid record may still belong to a false chronology.

## Correct Order

1. 05:47 – Temporary profile 18-07 is accepted by Daniel's building access system.
2. 05:51 – Daniel's Orchid Café draft is edited.
3. 05:58 – The original toxicology sample is collected.
4. 06:09 – `COLLECTION_TIME` is changed from 05:58 to 06:09 using accepted Evidence Division permission.
5. 06:17 – The Laboratory Accession Record is created.
6. 06:20 – Daniel is officially reported discovered.

## Design Rules

- Tap-first
- six events
- remove selected event by tapping it
- reset button
- no permanent fail
- no softlock
- confirm disabled until six events selected
- wrong order gives feedback without destroying progress
- success cue is not the Add to Case File cue

## Meaning

The puzzle reconstructs verified timestamps and recorded events.

It does not claim every record represents physical truth.

---

# 19. CHAPTER III PHASE II – BANGKOK TO SINGAPORE

Status:

`IMPLEMENTED AND PLAYABLE`

## Media

- Takeoff video:
  - `assets/video/chapter-03/phase-02/airplane-takeoff.mp4`
- Takeoff poster:
  - `assets/video/chapter-03/phase-02/airplane-takeoff-poster.jpg`
- Cabin image:
  - `assets/images/chapter-03/phase-02/airplane-cabin.png`
- Cabin loop:
  - WebM preferred
  - MP3 fallback

## Purpose

- shift rhythm and location
- confirm the investigative question
- keep exposition brief
- prepare Changi
- do not become a tourism montage

## Current Canon Findings

- Changi confirms Daniel's booking
- no check-in belongs to Daniel
- no boarding scan belongs to Daniel
- no immigration movement belongs to Daniel
- profile 18-07 carried accepted Evidence Division permission through Singapore infrastructure
- someone wanted two records to read as one journey
- at Changi the team will separate passenger movement from system access
- Singapore Police assigned a liaison
- liaison is not named before formal introduction

## Phase II Completion

Daniel never crossed the border.

His booking and profile 18-07 lead to Changi, where physical movement and system access can be examined separately.

---

# 20. CHAPTER III PHASE III – CHANGI AIRPORT

Status:

`NEXT PLANNED PRODUCTION PHASE`

## Environment

Arrival / Operations Corridor

## Investigation Goals

- inspect booking record
- inspect check-in status
- inspect boarding scan
- inspect immigration movement
- inspect airport CCTV
- inspect airport request/authorization trail
- trace profile 18-07 or connected system access
- demonstrate that digital records and physical passenger movement are separate systems

## Required Conclusion

Daniel did not travel.

A booking and a system route travelled farther than he did.

## Tone

- operational
- controlled
- investigative
- noir tension
- no tourism
- no generic airport montage

## Transition Out

Evidence should justify moving to the Singapore Investigation Office and meeting the assigned liaison.

Do not formally introduce Cheryl before the intended scene unless the owner changes the plan.

---

# 21. CHAPTER III REMAINING BLUEPRINT

## Phase IV – Singapore Investigation Office

Introductions:

- Inspector Cheryl Goh
- Farid Rahman

Story:

- Cheryl questions the cross-border link
- limits access initially
- Farid works with North
- Reconciliation Window discovered
- Dual Log Comparison may begin
- Safe Code appears here only if better than Safehouse placement

## Phase V – Marina Bay

Function:

- investigation transition
- surveillance
- contact setup
- possible indication team is followed
- possible Adrian signal

No tourism montage.

## Phase VI – Serviced Apartment / Safehouse

Evidence:

- Burner Phone
- Architecture Document
- Encrypted Drive
- Fragmented Data

Possible minigame:

Safe Code / Credential Unlock

Answer must be evidence-derived.

## Phase VII – Hawker Centre

Adrian meeting:

- public and populated
- tense despite crowd
- chosen for cameras and witnesses
- Adrian reveals only part of system
- Benedict chooses approach
- North checks claims

No full plot dump.

## Phase VIII – Digital Forensics Lab / Secure Server Facility

Climax:

- access Raw Reconciliation Record
- operational time pressure
- delayed Signed Events
- prove two conflicting logs can both validate
- reveal method
- do not reveal mastermind

Character roles:

- North leads system analysis
- Farid supports reconstruction
- Cheryl provides authority
- Adrian limited or remote assistance
- Benedict connects method to motive and operator behavior

## Phase IX – Chapter End

Proven:

- Singapore is an infrastructure route
- system can validate conflicting chronologies
- evidence can be real while sequence is false
- credential validity does not identify operator
- Adrian knows system but is not mastermind

Elena may contact from Thailand.

Her information is:

- true
- useful
- strategically timed
- not an open confession

Ending question:

Who chose which event would be recorded, and which event would be forgotten?

---

# 22. CHAPTER III MINIGAME PLAN

## Timeline Reconstruction

Implemented in Phase I.

## Safe Code / Credential Unlock

Planned for Safehouse or Investigation Office.

Rules:

- connected to evidence
- possibly profile 18-07
- mobile-friendly
- no arbitrary combination
- no permanent fail

## Dual Log Comparison

Goal:

Compare two log versions that both validate.

Fields:

- timestamp
- signature
- device
- sync route

Learning outcome:

Two conflicting records can both be valid under system rules.

## Fragment Reconstruction

Status:

`OPTIONAL`

Possible sources:

- Architecture Document
- Deleted Message
- Encrypted Drive

Only include if it advances story or deduction.

## Global Minigame Standards

- mobile-friendly
- target 30–60 seconds
- tap option
- no permanent fail
- no softlock
- reset/recovery path
- Puzzle Success and Evidence Collection are separate events
- noir-tech sound
- Save/Load state where safe

---

# 23. EVIDENCE PLAN

## Existing Canon Evidence

### Chapter I

- Victim's Phone
- Blood-stained evidence
- Cleared Laptop
- Suitcase
- phone messages/calls/note

### Chapter II Apartment

- Coffee Mug
- Temporary Profile 18-07 access record
- Investigation Board
- Orchid Café draft

### Police

- Certified Laboratory Accession Extract
- sealed custody envelope context

### Forensic

- Sealed Toxicology Sample
- Laboratory Accession Record
- Workstation Audit Trace
- Instrument Batch Record

### Medical

- Postmortem Indicators
- Identification and Intake Tag
- Preliminary Autopsy Report
- Toxicology Reference Sample

### Chapter III Phase I–II

- verified recorded sequence
- Singapore endpoint
- Daniel's booking
- absence of passenger movement
- profile 18-07 Singapore event

## Planned Chapter III Evidence

- Changi booking record
- check-in/boarding/immigration records
- Airport CCTV still
- Temporary Profile 18-07
- Burner Phone
- two valid versions of one log
- architecture document
- Offline Signature Token
- network module
- archived case file
- Raw Reconciliation Record
- Adrian's encrypted drive

## Evidence Rules

- every item advances investigation
- every item supports a conclusion
- no decorative evidence
- UI, dialogue and Case File names must match
- collection cue plays once
- puzzle completion is not evidence collection
- evidence state survives Save/Load
- exact text or no text in generated visual assets

---

# 24. AUDIO SYSTEM

## Global Channels

- Music
- Ambience
- SFX

## Current Ownership

There are two cooperating legacy layers:

1. `02-audio-save.js`
2. `11-production-stabilization.js`

Future audio work must inspect both.

Do not add a third audio manager.

## UI Click

Current owner:

`08-stability-repair.js`

Behavior:

- embedded WAV
- pointerdown
- immediate
- one physical press equals one playback
- legacy `clickAudio` is muted and disabled
- exact duplicate Android timestamps are ignored

## Evidence / Add to Case File

Current production cue owner:

`11-production-stabilization.js`

Rules:

- one playback
- stop on scene transition
- no second tail sound
- separate from Puzzle Success
- standard across evidence scenes

## Police Ambience

Owner-confirmed result after 0.7.10:

- no silent tail
- no mouse-click tail
- loop continues cleanly

Current code facts:

- `02-audio-save.js` defines clean boundary:
  - start `4.6`
  - end `45.0`
- `11-production-stabilization.js` also contains a Police visit start offset of `12` seconds

Because the current device result is stable, do not alter either layer without tracing the effective runtime and testing the real device.

The non-negotiable result is:

**The player must never hear the silent/click tail after 45 seconds.**

## Room 1807

- dark noir piano loop
- WebM preferred
- MP3 fallback
- no prominent sirens

## Victim Apartment

- soft noir score
- separate from Room 1807
- Café ambience must not leak early
- trimmed loop behavior for MP3 fallback

## Forensic

- controlled chain-of-custody loop
- no sharp whine
- readable dialogue
- WebM preferred, MP3 fallback

## Medical Examiner

- cold refrigeration ambience
- old machine layer suppressed
- scanner soft but audible
- no fatiguing high frequency

## Chapter III Phase II

- takeoff video audio controlled by SFX
- cabin ambience controlled by Music
- dialogue ducking
- WebM preferred
- MP3 fallback
- media stops on exit/restore

## Chapter III Music Path

`assets/audio/chapter-03/modern-noir.mp3`

Preserve this path when used by the main runtime.

## Future Chapter III Audio

- Changi operational ambience
- Singapore Investigation Office room tone
- Marina Bay city ambience
- Safehouse interior
- Hawker Centre
- Digital Forensics Lab
- Puzzle Success
- Evidence Collection
- UI click

---

# 25. UI AND INTERACTION RULES

## Dialogue

- one tap advances one line
- immediate response
- no double advance
- speaker, portrait and emotion match
- side alignment consistent
- `TAP TO CONTINUE` normalization
- narrow mobile support

## Choice Panels

- every visible choice must be tappable
- relationship objects must exist before applying choice math
- no invisible overlay may block pointer events
- capture and bubbling handlers must be inspected
- saving at choice checkpoints must not trap the player

## Hotspots

Before inspection:

- yellow

After inspection/found:

- green

Must not:

- start green from stale state
- remain yellow after inspection
- duplicate audio
- depend on unrelated UI to update

## Evidence Panels

Required flow:

1. Open
2. Inspect
3. Reveal detail
4. Add to Case File
5. Close

## Save Manager

Required exits:

- top `×`
- footer `CLOSE`
- backdrop
- Escape where keyboard exists
- successful Save auto-closes

Do not require the player to press `CANCEL` after a successful save.

## Day / Time / Location Cards

Use only for meaningful transitions:

- Chapter III opening
- Bangkok to Singapore
- major time/location changes

Do not overuse.

## Mobile Layout

- target 9:16
- test 360×800 and 412×915 where possible
- account for address bar
- account for safe-area bottom inset
- primary controls remain inside viewport
- scroll only the intended inner content, not fixed action buttons

---

# 26. VISUAL AND ASSET PLAN

## Background Size

`864 × 1536`

## Style

- noir graphic novel
- cel-shaded
- heavy ink
- angular shadows
- cinematic crime-adventure
- bright enough for mobile

## Approved Chapter III Backgrounds

1. Singapore Investigation Office
2. Changi Airport Arrival / Operations Corridor
3. Marina Bay
4. Plane Flying
5. Serviced Apartment / Safehouse
6. Hawker Centre
7. Digital Forensics Lab / Secure Server Facility Hybrid

## Image Rules

- no embedded UI unless required
- no chapter title baked into background
- use clean Changi background
- inspect signage
- no pseudo-text
- exact match or no text
- remove malformed text
- no unreadable English

## Character Sheet Processing

Approved:

- Adrian: 12 expressions
- Cheryl: 12 expressions
- Farid: 16 expressions

Required:

1. crop each expression separately
2. transparent alpha
3. inspect edges
4. consistent canvas
5. consistent anchor
6. consistent head size
7. emotion filenames
8. test on dark Dialogue UI
9. no white/black/checker background
10. preserve identity

Never use the whole sheet as one portrait.

---

# 27. RESOLVED DEFECTS AND BASELINE HISTORY

## 0.7.6

Major production changes:

- canonical unread Character Journal state
- duplicate North notification repair
- deterministic Police character unlock
- named Save Manager
- IndexedDB saves
- Export/Import
- Chapter III departure dialogue completion

## 0.7.7

Final narrative continuity:

- Room 1807 victim separated from Daniel
- `E.` to Elena continuity
- archived toxicology record correction
- 18-07 terminology locked
- 06:17 terminology locked
- FS-12 / Terminal Three continuity
- Police → Forensic handoff
- Medical evidence scope
- Chapter III recorded-sequence puzzle
- in-flight narrative continuity
- `CHAPTER COMPLETE` wording

## 0.7.8

Save Manager exit repair:

- top close control
- mobile footer
- automatic close after save

This work was rolled into later cumulative builds.

## 0.7.9

Character state leak repair:

- old unlocked characters no longer appear at start
- Chapter I has no Characters
- Chapter II North gate reset
- first Journal contains only Benedict and North
- story-progress filtering
- Developer unlock cleared on fresh Chapter II

## 0.7.10

Police Choice and audio repair:

- added missing Police relationship initializer
- all three Police choices functional
- Police ambience tail removed through clean loop boundary
- Build/cache labels updated

## Owner Confirmation

After 0.7.10 the owner reported:

**No defect in the latest test round.**

Therefore:

- 0.7.10 is the current baseline
- do not revert to 0.7.9 or earlier files
- future patches must begin from latest GitHub, not from old patch ZIPs

---

# 28. KNOWN TECHNICAL RISKS

These are not currently reported defects. They are areas where careless edits can reintroduce defects.

## Multiple Runtime Layers

The game remains a classic-script stack with later files overriding earlier globals.

Do not assume the first definition is the active definition.

## Audio Overlap

`02-audio-save.js` and `11-production-stabilization.js` both affect scene audio.

Current result is stable on the owner's device.

Any audio work must trace both.

## Journal Overlap

Legacy journal helpers exist in `03-journal-progress.js`.

Canonical story gating exists in `06-content-registry-dev.js`.

Do not revive direct legacy unlock paths.

## Dialogue Override

`06-regression-fixes.js` overrides global `runDialogue`.

Any new dialogue runtime must preserve:

- localization
- history
- one-tap progression
- onComplete timing
- active prompt normalization

## Observers

Current observers include:

- dialogue prompt normalization
- screen/journal reconciliation
- story character detection
- portrait repair
- various production state repairs

Do not add a new observer before proving an existing owner cannot handle the requirement.

## Dynamic Chapter III

Chapter III is not statically present in the initial DOM.

Save restore, menu buttons and scene transitions must wait for the dynamic runtime.

## Static WIP Fallback

`chapter3Wip` remains in `index.html` only as an error fallback.

Do not mistake it for the current Chapter III endpoint.

## Legacy Shims

`09` and `10` are disabled.

Do not use them as patch locations.

---

# 29. TESTING STANDARD

## Exact Flow Testing

For every patch test:

- entry into scene
- opening dialogue
- every affected choice
- evidence open/inspect/collect/close
- progress
- Journal unlock/unread
- Save at relevant checkpoint
- Load from that checkpoint
- audio entry
- audio loop
- scene exit
- return to title where relevant
- language switch
- narrow viewport
- real-device owner result

## Syntax and Static Checks

- JavaScript syntax
- HTML validity where practical
- CSS parse
- relative paths
- missing assets
- duplicate IDs
- cache query values
- dynamic runtime errors

## Save Regression

For any state change test:

1. New Game
2. Continue
3. Named Save
4. Load named save
5. Auto Save Continue
6. Export
7. Import
8. stale old state where relevant

## Honesty Rule

Never claim:

- Android test
- live GitHub Pages test
- actual audio listening
- browser compatibility
- full regression
- 100% success

unless actually performed.

The owner's device remains final truth.

---

# 30. NEXT CHAT STARTUP INSTRUCTION

Use this as the first message in the next project chat:

> Continue the LAST WITNESS project from the current Production baseline.  
> Repository: `grolygori789-crypto/last-witness`  
> Production branch: `restore-game-recovered`  
> Live game: `https://grolygori789-crypto.github.io/last-witness/`  
> Current owner-confirmed baseline: `BUILD 0.7.10`, latest regression round reported no defect.  
> First read the latest `GAME_MASTER_PLAN.md`, then fetch the latest `index.html` and every file relevant to the task.  
> Do not patch from memory, an old ZIP or a prior chat attachment.  
> Do not create branches, commit, push, update or delete GitHub files. Work locally and deliver one ZIP for the owner to upload.  
> Preserve the current Save Manager, Character Journal story gates, Police Choice repair, Police clean ambience result, narrative continuity, Chapter III three-route convergence, 11-minute mechanism, Elena's unrevealed mastermind role and Adrian's non-mastermind role.  
> Current playable scope ends after Chapter III Phase II in flight. The next planned production phase is Chapter III Phase III at Changi Airport.

---

# 31. CURRENT CANON SUMMARY

## Confirmed in Game

- LAST WITNESS
- BENEDICT INTERACTIVE
- Chapter I: ROOM 1807
- Chapter II current title: THE PERFECT STRANGER
- Chapter II ending label: THE ELEVEN-MINUTE LIE
- Chapter III: THE BORROWED MINUTES
- Room 1807 was staged
- Room 1807 victim is not Daniel
- Daniel investigated the 1807 pattern
- Daniel asked Elena to verify an archived-case toxicology record
- 18-07 is a temporary operational profile, not a person
- 05:47 building accepts profile 18-07
- 05:51 Café draft edited
- 05:58 original sample collected
- 06:09 collection time revised
- 06:17 laboratory accession created
- 06:20 official discovery
- toxicology is genuine
- physical sample is genuine
- raw scientific result is genuine
- administrative chronology was engineered
- accepted permission does not identify operator
- FS-12 is also called Terminal Three
- local FS-12 session was offline
- Singapore infrastructure appears in the access route
- Daniel had a real Singapore booking
- Daniel did not check in
- Daniel did not board
- no immigration movement belongs to Daniel
- Chapter III has three converging routes
- Phase I recorded-sequence puzzle is implemented
- Phase II in-flight scene is implemented

## Confirmed by Owner but Secret from Player

- Elena is the mastermind
- Elena is the real killer
- do not reveal her in Chapter III
- Adrian is not the mastermind

## Planned

- 11-minute Reconciliation Window full technical reveal
- Changi investigation
- Cheryl formal introduction
- Farid formal introduction
- Adrian meeting
- Safehouse
- Dual Log Comparison
- Digital Forensics climax
- Raw Reconciliation Record

## Intentionally Unresolved for Player

- identity of `R.`
- identity behind Chapter I warning
- purpose of pier meeting
- full meaning of 1807
- operator of each accepted event
- exact method used to acquire/copy/route permissions
- how Elena selected and timed each truth
- final ending

---

# 32. CANON STATUS LABELS

Use:

- `CONFIRMED IN GAME`
- `CONFIRMED BY OWNER`
- `OWNER-TESTED`
- `IMPLEMENTED`
- `PLANNED`
- `PROPOSED`
- `UNRESOLVED`
- `DEPRECATED`
- `DO NOT USE`

Never silently promote a proposal into Canon.

---

# 33. MASTER PLAN UPDATE PROTOCOL

Update this file whenever any of these change:

- Production baseline
- owner device result
- chapter playable boundary
- Canon
- title
- timeline
- character identity or role
- Character Journal gate
- Save schema
- storage key
- dynamic runtime path
- script load order
- audio owner
- asset path
- next production phase
- known defect
- resolved defect
- prohibited workflow

Before replacing this file:

1. Fetch the latest version.
2. Preserve every confirmed Canon item.
3. Preserve unresolved mysteries.
4. Preserve owner secret boundaries.
5. Preserve repository rules.
6. Preserve the complete future Chapter III plan.
7. Add new Production facts.
8. Remove obsolete status only after recording the new baseline.
9. Verify the replacement filename remains exactly:
   - `GAME_MASTER_PLAN.md`

---

# END OF MASTER PLAN

Do not delete or rewrite this file without preserving:

- current Production status
- owner-confirmed test result
- repository rules
- runtime load order
- state ownership
- Save/Load continuity
- Character Journal gates
- audio ownership
- narrative Canon
- unresolved mysteries
- Elena secret boundary
- Adrian boundary
- complete Chapter III blueprint
- next-chat continuation instruction
