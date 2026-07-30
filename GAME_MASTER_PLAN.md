# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-07-30  
> **Owner-confirmed playable baseline:** `CHAPTER IV · PHASE II COMPLETE`  
> **Latest owner-accepted Chapter IV module build:** `0.14.7`  
> **Production branch:** `restore-game-recovered`  
> **Current legitimate endpoint:** `CHAPTER IV · PHASE II COMPLETE -> NEXT: PACKET PROVENANCE`  
> **Immediate next production target:** `CHAPTER IV · PHASE III — PACKET PROVENANCE`  
>
> GitHub runtime on `restore-game-recovered` is the Source of Truth for deployed code, assets, paths and load order.
>
> This file is the Source of Truth for Canon, owner-confirmed status, owner-level secrets, workflow, technical governance, chapter continuity, minigame logic, future plot architecture, ending architecture and the exact continuation point for a new chat.
>
> This revision supersedes the 2026-07-27 plan that stopped at Chapter III / Chapter IV planning. Chapter IV Phase I and Phase II are now implemented, uploaded and owner-accepted.

---

# 0. EXECUTIVE ZERO-EXPLANATION HANDOFF

## Project identity

- Game: **LAST WITNESS**
- Studio: **BENEDICT INTERACTIVE**
- Repository: `grolygori789-crypto/last-witness`
- Production branch: `restore-game-recovered`
- Live game: `https://grolygori789-crypto.github.io/last-witness/`
- Planning filename: `GAME_MASTER_PLAN.md`
- Platform: mobile-first browser game
- Primary browser: Chrome
- Primary owner test platform: Android Chrome
- Primary orientation: portrait 9:16
- Genre: Narrative Detective Adventure / Interactive Crime Investigation
- Art direction: neo-noir graphic novel, cel-shaded, heavy ink, angular shadows, cinematic crime-adventure, readable on mobile
- Current playable content:
  1. Chapter I complete
  2. Chapter II complete
  3. Chapter III complete
  4. Chapter IV Phase I complete
  5. Chapter IV Phase II complete
- Current endpoint:
  - `PHASE II COMPLETE`
  - `JAKARTA ARRIVAL`
  - `NEXT · PHASE III · PACKET PROVENANCE`
- There is no playable Chapter IV Phase III yet.

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

## Immediate next job

**Design and implement Chapter IV Phase III — PACKET PROVENANCE.**

The new chat must not restart Chapter IV planning from zero. Phase I and Phase II are approved and complete. Phase III begins from Maya's authorization of a controlled packet capture and the conclusion that the Jakarta endpoint is a receipt, not a meeting place.

---

# 1. OWNER COMMUNICATION AND WORKING STYLE

- Address the owner as **พี่เบนซ์**
- Refer to the assistant as **บิ๊ว**
- Use a feminine Thai voice
- Use direct, natural Thai
- Do not make the owner repeat facts stored in this file
- Do not pretend uncertainty is certainty
- Do not call a static check an Android test
- Do not claim success until the owner tests the build
- Do not claim a file exists before it has actually been created
- Do not say work is complete when only an idea, script or attempted command exists
- Do not ask the owner to perform quality control that should have been done before delivery

## Mandatory efficiency discipline

The owner explicitly requires intelligent, time-efficient work. Long waits with no usable deliverable are unacceptable.

For every task:

1. identify the smallest actual problem
2. inspect the current in-game file before considering regeneration
3. treat owner-supplied images as references unless the owner explicitly says to replace the game asset with that image
4. patch the minimum number of files
5. do not rebuild an entire character set to solve a CSS or color problem unless inspection proves that the source assets are wrong
6. do not touch working characters while repairing another character
7. after one failed approach, diagnose why
8. after two failed attempts, stop repeating the same method and switch to a simpler verified approach
9. if a filesystem or tool error blocks progress, report it immediately and move to a writable clean workspace
10. never keep the owner waiting while silently retrying a broken method
11. produce a concrete artifact before claiming completion
12. include clear QA evidence, changed-file scope and testing limits
13. avoid unnecessary web searches, asset generation, conversion pipelines or full-project repackaging when a local edit is sufficient
14. never use “clever” automation when a direct deterministic edit is safer
15. do not regenerate approved art merely because a reference image was supplied for color, scale or composition guidance

## Defect-response rule

When the owner reports a defect:

1. read every numbered defect
2. inspect screenshots
3. identify whether the defect belongs to:
   - source asset
   - CSS
   - DOM composition
   - audio lifecycle
   - state restore
   - cache query
4. state the actual root cause
5. patch only the owner files
6. preserve accepted assets and systems
7. test the exact reported flow
8. deliver one corrected package
9. never introduce a new defect in unrelated characters or earlier chapters

---

# 2. GITHUB OWNERSHIP AND DELIVERY RULE

For normal code and asset work:

- the owner uploads production files personally
- work locally
- deliver one ZIP
- preserve repository-relative paths
- do not create a branch
- do not push
- do not commit
- do not delete repository files
- do not modify GitHub Pages directly

A planning file may be written directly to GitHub only when the owner explicitly authorizes that exact write in the current conversation.

This document is prepared as a local replacement file. It is not authorization to edit code or assets on GitHub.

## Required code-package contents

Every implementation package must include:

- one ZIP
- preserved repository paths
- changed-file manifest
- installation instructions
- test report
- SHA-256
- exact statement of what was tested
- exact statement of what was not tested

## Planning document delivery

- filename must remain exactly `GAME_MASTER_PLAN.md`
- include a local copy
- include SHA-256
- preserve Canon, secrets, workflow, proof boundaries and future plans

---

# 3. SOURCE-OF-TRUTH HIERARCHY

1. **Latest GitHub runtime on `restore-game-recovered`**
   - current code
   - current assets
   - paths
   - cache queries
   - load order
   - deployed behavior

2. **Latest `GAME_MASTER_PLAN.md`**
   - Canon
   - owner-confirmed acceptance
   - owner-level secrets
   - unresolved mysteries
   - future chapter design
   - workflow
   - ending architecture

3. **Owner's latest real-device result**
   - final truth for visible behavior
   - overrides static assumptions

When sources conflict:

- inspect both
- determine which is stale
- do not rewrite Canon to match a defect
- do not break accepted runtime to match an obsolete plan
- ask only when available evidence cannot resolve the conflict

---

# 4. NON-NEGOTIABLE STARTUP PROCEDURE

Before editing any production file:

1. fetch the latest `GAME_MASTER_PLAN.md`
2. fetch the latest `index.html`
3. confirm branch `restore-game-recovered`
4. inspect current file SHAs
5. inspect load order and cache-query versions
6. fetch every runtime file involved in the task
7. inspect current assets involved in the task
8. inspect:
   - global overrides
   - direct listeners
   - capture listeners
   - bubbling listeners
   - MutationObservers
   - timers
   - state initialization
   - migration
   - Save/Load restore
   - dynamic script loading
   - audio ownership
   - compatibility shims
9. identify the true implementation owner
10. prove the root cause
11. patch the fewest files possible
12. run syntax and static checks
13. test the actual affected flow where the environment permits
14. state exact testing limits
15. deliver locally unless a specific GitHub write is authorized

Never patch from:

- memory alone
- an old ZIP
- an old chat attachment
- an older branch
- a reconstructed imitation of a current runtime file

A local package may be reused only after verifying its base files match current GitHub or after the owner confirms the package is the accepted production base.

---

# 5. CURRENT VERIFIED PRODUCTION SNAPSHOT

Verified on 2026-07-30.

| Path | Blob SHA | Role |
|---|---|---|
| `GAME_MASTER_PLAN.md` | `e386b170cbe6022b32ab9e60e630726b391d8f49` before this replacement | old planning baseline |
| `index.html` | `e30f3fb1f20399d51de9aba220802361a5da15d9` | static DOM and static load order |
| `js/chapters/chapter-02/05-chapter2-integration.js` | `a90af7d17259d54e7525c6d574edc12455c63b23` | Chapter III loader, lifecycle guard, legacy visible build label |
| `js/chapters/chapter-04/01-afterimage.js` | `b61d3e8a9e118e9437b8bdf5eb5cb0a9b99c1df2` | Chapter IV Phase I |
| `js/chapters/chapter-04/02-jakarta-arrival.js` | `763b434cebd1173d4495fbd3d4b0cae97c978ed2` | Chapter IV Phase II, build 0.14.7 |
| `css/chapter-04-phase-02.css` | `ec692df508267781f76193ca0d33d59e47a5e6d9` | Phase II presentation and accepted Maya final rules |
| `js/engine/09-defect-hotfix.js` | `b83cf21d7b2451dedf011d668faa016a39d12b94` | deterministic Chapter IV bootstrap, cache query 0147 |

## Important build-label distinction

- Latest owner-accepted playable module build: `0.14.7`
- Chapter IV Phase I module: `0.13.2`
- Chapter IV Phase II module: `0.14.7`
- Legacy Chapter II/III integration file still declares global visible `BUILD 0.12.1`

Do not interpret the legacy global Settings label as the actual playable boundary. Do not casually change it during Phase III work without auditing Save labels, Developer Mode and global build synchronization.

## Current owner-confirmed acceptance

The owner has played and accepted:

- Chapter I through Chapter III
- Chapter IV Phase I
- Chapter IV Phase II
- Phase II story and minigame
- Maya final in-game portrait correction
- original navy Maya suit color
- pure black portrait background
- visible bob-hair silhouette line
- Maya scale and visual weight after final correction
- takeoff ambience with fade-out before route card / scene transition
- reduced Jakarta Airport ambience
- reduced Jakarta Verification Lab ambience
- Farid remote-from-Singapore label
- Maya role metadata wrapping
- corrected Maya line:
  - “The next phase begins with provenance, not pursuit.”
- Phase II completion and Return to Title

## Current playable boundary

> `CHAPTER IV · PHASE II COMPLETE`

Next card:

> `NEXT · PHASE III · PACKET PROVENANCE`

---

# 6. CURRENT LOAD ORDER

## Static CSS from `index.html`

1. `css/style.css`
2. `css/forensic-phase.css`
3. `css/medical-examiner.css`
4. `css/investigation-lifecycle.css?v=0711`
5. `css/fullscreen-display.css?v=0802`
6. `css/chapter-03-phase-04.css?v=0930`

## Static JavaScript

The legacy static chain is order-sensitive. Do not reorder casually.

It includes:

1. runtime data
2. audio and Save
3. Journal/progress
4. UI/dialogue
5. Developer tools
6. Chapter II modules
7. Chapter I module
8. regression / continuity layers
9. Chapter II integration
10. content registry / Character Canon
11. investigation lifecycle
12. fullscreen owner
13. production stabilization
14. compatibility bootstrap

## Dynamic Chapter III order

1. `js/chapters/chapter-03/01-title-phase1.js`
2. `js/chapters/chapter-03/02-changi-airport.js`
3. `js/chapters/chapter-03/03-singapore-office.js`
4. `js/chapters/chapter-03/04-marina-bay.js`
5. `js/chapters/chapter-03/05-serviced-apartment.js`
6. `js/chapters/chapter-03/06-hawker-centre.js`
7. `js/chapters/chapter-03/07-digital-forensics-lab.js`
8. `js/chapters/chapter-03/08-callback.js`

## Dynamic Chapter IV order

Current bootstrap:

1. `js/chapters/chapter-04/01-afterimage.js?v=0132`
2. `css/chapter-04-phase-02.css?v=0147`
3. `js/chapters/chapter-04/02-jakarta-arrival.js?v=0147`

Phase III must load only after Phase II and must preserve deterministic order.

Recommended future order:

1. Phase I
2. Phase II CSS
3. Phase II JS
4. Phase III CSS
5. Phase III JS
6. later Chapter IV phases in narrative order

Do not turn `09-defect-hotfix.js` into a large repair dump. It is now a disabled legacy shim plus deterministic Chapter IV bootstrap.

---

# 7. RUNTIME OWNERSHIP MAP

## Base/shared systems

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
- `.lwsave` export/import
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

Inspect before changing shared dialogue.

### `07-dialogue-continuity.js`

Owns normalized:

- `TAP TO CONTINUE`
- `แตะเพื่อดำเนินต่อ`

Do not create another prompt observer.

### `08-stability-repair.js`

Owns:

- immediate UI click
- pointerdown response
- duplicate touch suppression
- legacy stability repairs
- dynamic production-stabilization load

### `11-production-stabilization.js`

Primary production owner for:

- scene-aware ambience
- early chapter audio
- evidence cue
- puzzle cue
- scanner cue
- ducking
- one-shot cleanup
- stale-state repair

Do not create another global audio controller.

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

Do not create parallel character truth.

## Integration owner

### `05-chapter2-integration.js`

Owns:

- Chapter II to III transition
- Chapter III dynamic loading
- Chapter III Save/Resume preparation
- legacy visible build label
- Developer jumps through Phase IX
- mobile background lifecycle guard
- rain boundary
- Return to Title bridge

It does not currently own Chapter IV runtime loading. Chapter IV is loaded through `09-defect-hotfix.js`.

## Chapter IV owners

### `01-afterimage.js`

Owns:

- Chapter IV intro
- Phase I AFTERIMAGE
- evidence-route board
- Phase I choice
- Analyst of Record query
- Phase I state and restore
- transition to Phase II

### `02-jakarta-arrival.js`

Owns:

- Singapore → Jakarta flight
- Phase II airport, office and lab scenes
- Maya introduction and Journal extension
- Farid remote label
- Token Verification minigame
- Phase II audio
- Phase II state and restore
- completion screen
- Return to Title
- Phase II Developer jump

### `09-defect-hotfix.js`

Current role:

- legacy repairs disabled
- deterministic Phase I/II bootstrap only

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
- `chapter4`
- `endingProfile`
- `lwCharactersUnlocked`
- `lwCharactersUnread`
- `lwEvidenceUnlocked`
- `lwJournalEnabled`

## Cross-chapter ending profile

Implemented defaults in Chapter IV:

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

Do not expose a crude morality bar. Consequences should appear through evidence, trust, admissibility, witness safety and official-record control.

## `state.chapter4.phase1`

- `started`
- `chapterCardSeen`
- `locationCardSeen`
- `introComplete`
- `choiceMade`
- `choiceApplied`
- `choiceKey`
- `boardAssignments`
- `boardAttempts`
- `boardComplete`
- `boardDebriefSeen`
- `workingTheoryAdded`
- `querySeen`
- `queryCuePlayed`
- `queryAcknowledged`
- `closingDialogueComplete`
- `complete`
- `stage`

## `state.chapter4.phase2`

- `started`
- `flightComplete`
- `routeCardSeen`
- `airportIntroComplete`
- `mayaUnlocked`
- `mayaUnread`
- `officeIntroComplete`
- `choiceMade`
- `choiceApplied`
- `choiceKey`
- `legalBriefComplete`
- `verificationStarted`
- `verificationSteps`
- `consoleWarnings`
- `verificationComplete`
- `evidenceCollected`
- `closingDialogueComplete`
- `complete`
- `stage`

## Recommended `state.chapter4.phase3`

Do not implement blindly. Confirm against the approved Phase III blueprint, then use a compact schema such as:

```js
state.chapter4.phase3 = {
  started: false,
  locationCardSeen: false,
  introComplete: false,
  principleChosen: false,
  principleKey: "",
  captureAuthorized: false,
  packetFragments: [],
  provenanceAssignments: {},
  provenanceAttempts: 0,
  provenanceComplete: false,
  provenanceDebriefSeen: false,
  authorshipMatrix: {},
  authorshipAttempts: 0,
  authorshipComplete: false,
  evidenceCollected: [],
  brokerLeadEstablished: false,
  armanLeadStatus: "unresolved",
  closingDialogueComplete: false,
  complete: false,
  stage: "location-card"
};
```

Each Chapter IV phase must own:

- initializer
- migration
- restore bridge
- checkpoint names
- audio restoration
- modal restoration
- Developer jump
- completed-state resume

---

# 9. SAVE / LOAD

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

## Required features

- multiple named slots
- overwrite confirmation
- Auto Save card
- Load
- Export
- Import
- Delete
- mobile footer
- top close
- backdrop close
- Escape close
- busy protection
- automatic close after successful save

## Restore rule

Before restoring late Chapter III or Chapter IV:

1. load all prior dynamic modules in narrative order
2. initialize state defaults
3. apply migration
4. restore snapshot
5. call the correct phase resume bridge
6. reconstruct active screen
7. reconstruct audio
8. reconstruct dialogue, modal, evidence and puzzle lifecycle
9. reconstruct Journal/Case File extensions
10. preserve completed-state behavior

## Required Save testing for Phase III

- fresh entry from Phase II
- Auto Save at location card
- Continue
- named save
- load during opening dialogue
- load during principle choice
- load before controlled capture
- load during Packet Provenance
- load after wrong answer
- Reset
- load after correct answer
- load during Authorship/Deployment Matrix if included
- load before closing dialogue
- completed-state resume
- Return to Title
- export/import
- stale-state migration

---

# 10. CHARACTER CANON

## Benedict

- Age: 42
- Role: Detective / Lead Investigator
- protagonist
- final human decision-maker
- calm, observant and psychologically sharp
- reads motive, hesitation, wording, restraint and timing
- uses language skillfully without becoming theatrical
- natural restrained humour
- enjoys danger, movement and active cases
- dislikes commitment, binding ties and settled life
- does not accuse without evidence
- must never become a passenger while North solves everything
- strongest scenes combine human inference with technical proof boundaries

### Benedict's long-term romantic Canon

- he may genuinely care for Cheryl
- he may reciprocate part of her feeling
- he does not choose a permanent romantic partner at the end
- he chooses a mobile investigative life
- he is not a careless womanizer
- once avoidance becomes impossible, he is honest
- his final choice is freedom and forward motion, not settling down

## North

- Age: 32
- Role: IT Specialist / Technical Investigator
- Benedict's trusted long-term partner
- serious
- concise
- highly observant
- dry wit
- leads technical analysis
- rejects unsupported attribution
- understands Authentication vs Attribution
- becomes an active target in Chapter IV
- never reduced to a passive victim
- must consent to any fake-success operation
- no romance with Farid
- partnership with Benedict is the emotional spine
- sees Benedict's deepest choice as settling versus perpetual forward movement
- knows he ultimately chooses movement

## Elena

Public role:

- Forensic Analyst
- credible professional ally
- calm
- intelligent
- useful
- gives true information
- controls timing and sequence
- appears trustworthy
- must not be villain-coded before evidence earns suspicion

Owner secret:

- mastermind
- real killer of Chapter I victim
- real killer of Daniel Voss
- decision owner
- selected victim, room and minute
- used legitimate Bangkok evidence access
- deployed watcher logic through a valid signed package
- curated true evidence into a false official chronology
- does not need to falsify the scientific result

Forbidden before earned reveal:

- villain lighting
- suspicious smirk
- obvious confession lines
- theatrical cruelty
- villain music
- fake facts inserted only to make her guilty
- premature direct accusation

## Inspector Cheryl Goh

- Age: 40
- SPF liaison
- measured authority
- disciplined
- sharp
- legally strict without becoming obstructionist
- protects lawful access and proof boundaries
- respects North
- genuine long-term ally
- develops increasingly serious feelings for Benedict through respect
- keeps professional control
- North notices
- romance must never overpower the case
- retains dignity when Benedict chooses no permanent partner
- does not wait forever
- remains an important ally after accepting reality

Accepted expressions include:

- `restrained_amusement`
- `professional_fluster`
- `softened_professional`
- `focused_command`

## Farid Rahman

- Age: 31
- Singaporean Malay
- Digital Forensics Specialist
- fast
- meticulous
- friendly
- technically serious
- respects North
- no romance with North
- not comic relief
- preserves alternative explanations
- remains in Singapore during Chapter IV Phase II
- dialogue label must indicate remote connection:
  - English: `Farid Rahman (Remote · Singapore)`
  - Thai: `Farid Rahman (ต่อสายจากสิงคโปร์)`
- protects the raw mirror and original capture in Singapore

## Ratchata (Dr. Singh)

Display name exactly:

`Ratchata (Dr. Singh)`

- Age: 43
- Senior Medical Examiner
- Thai Sikh forensic pathologist
- dry humour
- independent
- scientifically strict
- not `R.` unless future evidence proves otherwise

Portrait fallback:

1. `assets/images/ratchata/profile.png`
2. `assets/images/ratchata/neutral.png`

## Adrian Tan Wei Ming

- Singaporean Chinese
- age 43-47
- former System Architect
- fugitive
- complicit insider
- key witness
- cautious
- intelligent
- exhausted by hiding
- dry humour
- distrusts police and institutions
- designed the legitimate reconciliation architecture
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
- intelligent
- dangerous
- tired
- dry humour
- complicit
- not mastermind
- did not select victims, rooms or eleven-minute events
- may have sold, adapted, brokered or protected the tool
- real face appears around Chapter IV midpoint
- Chapter III hood feed is a digital mask and cannot identify him
- attribution must come from source-build evidence, live behavior and corroborated records

## Inspector Maya Pranoto

- Indonesian National Police Cybercrime liaison
- Age: 37 in implemented runtime
- disciplined
- practical
- intelligent
- understands Jakarta infrastructure
- understands local legal procedure
- professional equal to Cheryl
- not obstructionist
- skeptical of foreign investigators turning a relay into a suspect
- becomes a regional ally
- no romance with Benedict
- may notice Cheryl's feelings but does not enter a love triangle
- Character Journal unlocks at formal introduction

### Maya accepted visual Canon

The owner has accepted the final 0.14.7 in-game presentation:

- original dark navy suit color from the approved master sheet
- color must remain visibly navy, similar in visual family to Cheryl
- do not recolor the suit black
- do not apply a dark filter that makes it disappear
- pure black portrait background
- subtle external line that preserves the bob haircut silhouette
- hair itself remains black
- face and upper torso have strong visual weight comparable to Benedict
- no tiny distant portrait
- no CSS scaling trick that damages crop
- no cyan, blue or transparent connector under the neck
- no missing shoulders or blazer
- accepted asset set must be frozen unless the owner requests a new change
- do not touch Cheryl or Farid while changing Maya

## Kawin Nopparat

Owner-level future Canon:

- Chapter I Room 1807 victim
- Thai man
- age 41
- Regional Access Governance and Compliance Auditor at fictional `Meridian Evidence Systems`
- discovered repeated use of Temporary Operational Profile 18-07
- planned to leave and meet a registrar contact at the pier
- killed by Elena
- body moved and staged in Room 1807
- identity remains unknown to player until Chapter V

## Rinrada “Rin” Sornchai

Owner-level future Canon:

- Thai woman
- age 37
- former Identity and Access Registrar at Meridian Evidence Systems
- living witness implied by `R.`
- `R.` fairly refers both to Rin and the Registrar role
- saw the emergency credential path
- witnessed Elena's physical presence around the pier meeting with Kawin
- went off-grid to survive
- definitive living **Last Witness**
- physically introduced in Chapter V
- testimony alone is not enough for conviction
- must retain agency

---

# 11. CHARACTER JOURNAL

## Story gates

### Chapter I

- menu hidden
- no Character Cards
- stale entries filtered

### Chapter II

- Benedict and North after office opening
- Elena after Café introduction
- Somchai and Kittisak after Police introduction
- Ratchata at Medical Examiner

### Chapter III

- Cheryl and Farid after formal Phase IV introduction
- Adrian after Phase VII identity verification
- no PALIMPSEST card
- alias/tool family is not a confirmed person

### Chapter IV

- Maya after formal Phase II airport introduction
- Arman only after identity is supported by source evidence and physical encounter
- no hooded UNKNOWN SOURCE card
- no tool-family alias card

### Chapter V

- Kawin when identity is established
- Rinrada after physical introduction and consent to cooperate

## Accepted card layout

- raw portrait `<img>`
- portrait approximately `78 × 88`
- name upper-right
- status beneath name
- Relationship in original information column
- no 54×54 wrapper
- no oversized card redesign
- no unnatural Relationship column
- do not globally resize accepted cards

## Portrait standard

Priority:

1. identity
2. face
3. expression
4. upper torso
5. stable framing
6. clean silhouette
7. useful hands/props only

Standard canvas:

`744 × 1000`

General established standard was true transparent alpha, but Maya Phase II is an approved explicit exception using a pure black in-image background for reliable dark-UI presentation.

Rules:

- fixed canvas
- consistent anchor
- match Benedict/North visual weight
- no stretching
- no checkerboard
- no accidental matte
- inspect on actual dark dialogue UI
- inspect in Character Journal and detail view
- do not assume a good standalone PNG automatically works in the game crop

---

# 12. SEASON AND CHAPTER STRUCTURE

## Season 1

1. Chapter I — `ROOM 1807`
2. Chapter II — `THE PERFECT STRANGER`
3. Chapter III — `THE BORROWED MINUTES`

Season 1 complete.

## Season 2

4. Chapter IV — `SHADOW OF THE TRUTH`
5. Chapter V — `THE MISSING PIECE`
6. Chapter VI — `THE FINAL MOVE`
7. Chapter VII — `LAST WITNESS`

Do not rename Chapter IV to PALIMPSEST.

`PALIMPSEST` is:

- alias
- tool family
- Jakarta hook
- not the chapter title
- not proven human identity in Chapter III

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

# 13. CORE STORY CANON

## Scientific truth

- toxicology is genuine
- samples are genuine
- biological findings are genuine
- chronology around the evidence is engineered
- solution is not fake science

## Daniel lock

Daniel Voss dies in Chapter II.

He must never:

- return alive
- become a living suspect
- become the Last Witness
- operate the system after death

He may continue through:

- drafts
- archived files
- recordings
- contacts
- scheduled signals
- evidence prepared before death

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

It does not prove:

- physical entry
- operator
- identity
- motive
- mastermind

## Architecture layers

1. Adrian designed legitimate offline reconciliation architecture.
2. Arman/PALIMPSEST built or adapted the outer wrapper/tool family.
3. a local actor deployed trusted packages and watcher logic.
4. Elena owned final decisions:
   - victim
   - room
   - timing
   - discovery sequence
   - cleanup priority

Architecture, authorship, brokerage, deployment and decision ownership are separate.

---

# 14. CANONICAL DANIEL TIMELINE

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

Say:

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

Do not casually rename it as delivery, report, custody or case creation.

### 06:20

Official reported discovery.

---

# 15. CHAPTER I — ROOM 1807

Status:

`COMPLETE AND OWNER-TESTED`

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
- laptop activity selectively cleared
- intended departure interrupted
- phone positioned for investigators
- true objects arranged into false order

Ending:

> “You looked in the wrong room.”

Forward truth:

- victim is Kawin
- Kawin audited credential reuse
- discovered 18-07 was operational profile
- arranged pier meeting with Rinrada
- Elena killed him
- Elena staged Room 1807
- unknown warning caller is Elena through masked channel
- Elena wanted Benedict to validate a curated story and flush out the surviving registrar witness

Fair clues:

- 1807 visually echoes 18-07
- phone is too convenient
- suitcase points outward
- `R.` and pier note point outside room
- “wrong room” is literally true and strategically misleading

Known technical debt:

- `index.html` still contains static intro title `HOTEL 1807`
- Canon title is `ROOM 1807`
- correct this only through a scoped, audited change
- do not mix this cleanup into unrelated Phase III logic unless approved

---

# 16. CHAPTER II — THE PERFECT STRANGER

Status:

`COMPLETE AND OWNER-TESTED`

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

Findings:

- two coffee mugs
- Temporary Profile 18-07
- Daniel's investigation board
- Room 1807 connection
- “Ask E. about the corrected time”
- Café draft edited at 05:51
- certified extract
- sealed custody envelope
- accepted Evidence Division permission
- FS-12
- offline local session
- genuine science
- 05:58 → 06:09 correction
- biological window conflicts with corrected time
- discovery at 06:20

Elena continuity:

- North reaches `E.` through investigation
- Elena provides true archived information
- Elena does not know impossible future details
- no villain coding

Ending routes:

- `chapter3_timeline`
- `chapter3_old_cases`
- `chapter3_access`

All converge.

---

# 17. CHAPTER III — THE BORROWED MINUTES

Status:

`COMPLETE AND OWNER-TESTED`

Purpose:

Explain **how** true evidence can survive inside false chronology without revealing mastermind.

## Central mechanism

- delayed/offline devices create Signed Local Events
- signed events may arrive later
- events inside eleven-minute Reconciliation Window remain eligible
- accepted events may display by Device Timestamp
- conflicting certified views may validate
- system obeys its rules
- official story can remain false

## Phase I — Detective Office

Scene:

`THE MISSING PASSENGER`

Timeline minigame solution:

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

## Phase II — Bangkok to Singapore

- operational travel
- no tourism montage
- Benedict/North partnership
- liaison not introduced before formal scene

## Phase III — Changi Airport

Evidence:

- Confirmed Booking and Travel Record
- Passenger Movement and CCTV Index
- Accepted Verification Request

Conclusion:

> Travel identity entered systems. Daniel did not complete the journey.

## Phase IV — Singapore Investigation Office

Introduces Cheryl and Farid.

Evidence:

- Relay Acknowledgement
- Validation Headers
- Policy Marker

Limited Header Comparison:

1. 05:58 → Original Header
2. 06:09 → Corrected Header
3. both validate / corrected claims FS-12 → Shared
4. eleven-minute rule → Policy

Conclusion:

- two versions validate
- rule exists
- raw order, device source and operator unresolved

## Phase V — Marina Bay

Scene:

`THE EXIT IS NOT THE SOURCE`

Correct Confidence Review:

- public gateway exit → PROVEN
- subscriber reacted → SUPPORTED
- operator physically present → UNPROVEN
- token reached serviced-apartment network → PROVEN
- Adrian controlled session → UNPROVEN

## Phase VI — Serviced Apartment

Evidence:

1. Ephemeral Handoff Cache
2. Reconciliation Architecture Document
3. Burner Phone Meeting Fragment
4. Encrypted Architecture Drive

Credential solution:

- profile: `18-07`
- permission: `EVIDENCE DIVISION`
- device: `FS-12`
- window: `11 MINUTES`

Proof:

- network reached unit
- room was handoff
- occupant unverified
- Adrian ownership/operator unproven

## Phase VII — Hawker Centre

Adrian physically introduced.

Claim cross-check:

- window rule → record
- room presence → unverified
- subscriber human control → unverified
- raw-order claim → consistent

Evidence:

- Revoked Offline Signature Token
- Secure Reconciliation Mirror Locator

## Phase VIII — Digital Forensics Lab

Title:

`THE MIRROR REMEMBERS`

Evidence:

1. Raw Reconciliation Receipt Record
2. Subscriber Fork Comparison
3. PALIMPSEST Tool-Family Fingerprint
4. Jakarta Relay Fragment

Raw Receipt Order:

1. original accession received
2. offline device reconnects
3. signed local event received
4. 18-07 permission accepted
5. certified header rebuilt

Trust Layer:

- signature → PROVEN
- permission → PROVEN
- device time → CLAIMED
- display order → DERIVED
- human operator → UNRESOLVED
- credential identity → UNRESOLVED

Wrapper Trace selects:

- adaptive relay failover
- operator metadata scrub
- Jakarta/Indonesian certificate wrapper chain

Does not select:

- digest preservation
- receipt queue handling

Climax:

1. preserve raw mirror
2. capture passive route fragment
3. seal bundle

## Phase IX — Callback

Containment:

1. freeze volatile memory
2. clone outbound packet
3. isolate credential handshake
4. quarantine callback

Revelations:

- watcher entered through signed Bangkok forensic package
- callback woke after raw-mirror milestone
- PALIMPSEST built survival across broken clocks
- someone else taught it to lie
- PALIMPSEST did not choose body, room or minute
- cleanup separate
- Jakarta route and Bangkok decision path separate
- cleanup deployed before team left Bangkok
- dead drop has eleven-minute window

Key warning:

> Look for the person who decided when the room would be found.

Closing:

> One in Jakarta. One in Bangkok.

---

# 18. COMPLETE OWNER-LEVEL MYSTERY TRUTH

Secret from player.

## Meridian Evidence Systems

Fictional regional infrastructure provider serving Bangkok, Singapore and Jakarta.

Legitimate purpose:

- preserve signed local events
- support delayed synchronization
- maintain chain-of-custody continuity
- operate through offline/network failure

Weakness:

- authenticates accepted credentials and signatures
- does not independently prove human operator
- displayed chronology may inherit claimed device time

## Adrian

- created legitimate reconciliation architecture
- learned it was forked
- learned audit subscriber logic was abused
- knew role profiles were reused
- concealed, delayed and fled
- guilty of enabling/concealment
- not murder mastermind

## Arman

PALIMPSEST wrapper can:

- preserve records across broken clocks
- fail over relays
- scrub operator metadata
- protect anonymous delivery
- survive institutional suppression

He sold, brokered or adapted it.

He did not choose Kawin, Daniel, Room 1807 or the eleven-minute events.

## Elena

Origin belief:

- institutions accept the record that survives procedure

Corruption:

- began choosing which truth remained visible
- used sequence as authority
- used credibility to guide investigators
- moved from curation to murder

Belief:

> Facts do not govern institutions. Records do.

Mistake:

- Benedict reads intention
- North reconstructs attribution gaps
- Rinrada remembers physical action
- Cheryl protects proof boundaries
- Farid preserves alternative explanations

## Kawin murder

- discovered 18-07 reuse
- planned to meet Rinrada
- Elena killed him
- Elena staged Room 1807
- room number buried the operational profile in literal location

## Daniel murder

- continued Kawin's work
- linked Room 1807, 18-07, `E.`, corrected time and Singapore
- Elena killed him
- attached true science to engineered chronology

## Watcher

- deployed via Elena's legitimate forensic access
- signed Bangkok package carried dormant watcher
- watcher waited for North's raw-mirror milestone
- cleanup process attempted to erase callback token while preserving official record

## Why Elena allowed investigation

She wanted:

- independent validation of curated narrative
- North to expose technical actors
- Adrian and Arman to become plausible targets
- Rinrada to react
- a public record that survived scrutiny

---

# 19. CHAPTER IV — SHADOW OF THE TRUTH

Status:

- Phase I: complete and accepted
- Phase II: complete and accepted
- Phase III-VIII: planned

Purpose:

1. follow Jakarta tool route and Bangkok decision path
2. reveal Arman without making him mastermind
3. show why North is dangerous
4. make observer pattern personal
5. preserve proof boundaries
6. create fake-success counter-operation
7. make antagonist believe North is neutralized
8. point back to Room 1807 and `R.`

## Phase I — AFTERIMAGE

Status:

`COMPLETE · MODULE 0.13.2 · OWNER-ACCEPTED`

Location:

Singapore Investigation Office.

Opening continuity:

- Dead Drop sealed
- Jakarta agrees to joint token validation
- Farid retains raw mirror and watcher capture
- North separates Jakarta wrapper route from Bangkok deployment path
- Benedict frames two hands

Benedict choice:

- source code
- authorization
- person who fears attribution

All converge.

Route Board correct assignments:

| Item | Lane |
|---|---|
| Wrapper Fingerprint | Jakarta |
| Rendezvous Token | Jakarta |
| Bangkok Signed Package | Bangkok |
| Cleanup Credential | Bangkok |
| Decision Owner | Unresolved |

Debrief:

- Jakarta = tool route
- Bangkok = deployment path
- operator unresolved
- decision owner unresolved

North target beat:

- authenticated subscriber query
- query term: `ANALYST OF RECORD`
- it asks who understood the evidence
- North states she is the search term
- Benedict refuses to use her as bait without consent
- North refuses protection through exclusion

Phase I proof:

- route and deployment are separate
- North is recognized as an analytical role
- no identity result
- legal basis for Jakarta cooperation

## Phase II — JAKARTA ARRIVAL

Status:

`COMPLETE · MODULE 0.14.7 · OWNER-ACCEPTED`

### Scene sequence and time

1. Singapore departure:
   - 23:20 SGT
2. flight:
   - 1 h 50 m
3. Jakarta arrival:
   - 00:10 WIB
4. Cybercrime Operations:
   - 01:05 WIB
5. Verification Lab:
   - 01:18 WIB
6. Day:
   - Day 5

Jakarta is one hour behind Singapore.

### Team arrangement

In Jakarta:

- Benedict
- North
- Cheryl
- Maya

In Singapore, remote:

- Farid
- original raw mirror
- original watcher capture

North carries:

- sanitized analysis clone
- no live credential
- no callback route

### Maya introduction

Role:

`Indonesian National Police Cybercrime Liaison`

She establishes:

- token validation authority
- certificate wrapper access
- one passive response
- no live trace
- no intrusion
- no raid from IP address
- no physical attribution from relay address

### Benedict Phase II choice

Options:

1. trace a tool, not accuse a city
2. jurisdiction first, attribution after preservation
3. someone expects route/person confusion

All converge into lawful verification.

### Token Verification minigame

Correct order:

1. `PRESERVE TOKEN HASH`
2. `CLONE INTO SANDBOX`
3. `SEND PASSIVE CHALLENGE`
4. `COMPARE RESPONSE GRAMMAR`

Rejected dangerous actions:

- `OPEN LIVE RENDEZVOUS`
- `TRACE RESPONDER`

Rules:

- wrong action teaches why it is unauthorized
- no permanent fail
- no softlock
- token remains evidence
- no active contact
- no live route

### Phase II findings

- token genuine
- single-use
- preserved dead drop behavior
- Jakarta broker route real
- response grammar consistent with PALIMPSEST tool family
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

### Corrected transition line

Maya must say:

> “I am authorising a controlled packet capture. The next phase begins with provenance, not pursuit.”

Thai:

> “ฉันอนุมัติการเก็บ Packet แบบควบคุม ขั้นต่อไปต้องเริ่มจากการพิสูจน์ที่มา ไม่ใช่การไล่ล่า”

Do not restore “Phase Three begins...” because it sounds like a character knows the game's phase numbering.

### Phase II closing

Benedict:

> “It was never a meeting place.”

North:

> “No. It is a receipt.”

Maya:

> “Then prove who handled it.”

### Phase II audio accepted state

- Singapore → Jakarta flight uses established takeoff video
- takeoff ambience is a one-shot
- ambience begins with flight scene
- it fades out before route card/scene transition
- it must not drag into airport scene
- arrival music retained
- airport ambience reduced and subordinate to dialogue
- Verification Lab ambience reduced and subordinate to dialogue
- Return to Title stops Phase II audio
- background lifecycle must not restart one-shots

Current runtime mix intent:

- airport custom bed remains restrained
- airport field base barely audible
- lab/office base is background texture only
- dialogue remains dominant

### Phase II Maya accepted asset state

Paths:

`assets/images/chapter-04/phase-02/maya/`

Files:

- `neutral.png`
- `focused.png`
- `skeptical.png`
- `analytical.png`
- `authoritative.png`
- `questioning.png`
- `restrained-approval.png`
- `calm-professional.png`
- `alert.png`
- `decisive.png`
- `guarded.png`
- `softened-respect.png`
- `profile.png`

Accepted final presentation:

- original dark navy suit retained
- pure black background
- hair silhouette readable
- stable face/torso framing
- Journal, detail and dialogue accepted
- role wraps over two clean lines
- do not reprocess unless specifically requested
- do not modify Cheryl/Farid while touching Maya

### Phase II proof boundary

Proven:

- token genuine
- broker route Jakarta-linked
- route is receipt/handoff
- response grammar supports PALIMPSEST family
- system recognizes analytical role
- human identity unresolved

Not proven:

- Arman is sender
- Arman is operator
- Arman personally deployed Bangkok watcher
- Elena involvement
- decision owner
- physical Jakarta endpoint occupant

## Phase III — PACKET PROVENANCE

Status:

`NEXT PRODUCTION TARGET`

### Starting point

Begin immediately after:

- controlled packet capture authorized
- token response preserved
- Farid remote in Singapore
- Maya holds local legal authority
- North leads technical interpretation
- Benedict maintains human inference and final decisions
- Cheryl maintains admissibility and jurisdiction

No repeated long recap.

### Phase purpose

Prove the difference between:

- tool-family authorship
- relay route
- broker distribution
- local deployment
- decision trigger

The phase must move the team toward a lawful encounter with Arman without prematurely calling him the murderer or decision owner.

### Recommended scene flow

1. **Verification Lab continuation**
   - controlled capture begins
   - packet divided into preserved fragments
   - Farid validates original capture hash remotely
   - Maya seals local capture conditions
   - Cheryl records joint authority
2. **Provenance reconstruction**
   - North separates the five layers
   - player classifies evidence
3. **Benedict principle choice**
   - follow build lineage
   - follow broker behavior
   - follow deployment condition
   - all converge, dialogue emphasis changes
4. **Authorship / Deployment Matrix**
   - source build supports tool-family author
   - broker ledger supports distribution path
   - Jakarta authorization echo supports local infrastructure
   - deployment echo points back toward trusted Bangkok conditions
   - decision trigger has no owner
5. **Legal debrief**
   - enough for controlled broker inquiry
   - not enough for arrest or murder attribution
6. **Closing lead**
   - an operational contact path or broker ledger entry points toward the person later established as Arman
   - do not use hood resemblance
   - do not show Arman's real face until Phase IV
7. **Phase III completion**
   - next: THE MAN BEHIND THE ALIAS

### Primary minigame

`PACKET PROVENANCE RECONSTRUCTION`

Player assigns:

| Fragment | Correct layer |
|---|---|
| Source-Build Fingerprint | Tool authorship / build lineage |
| Jakarta Relay Exit | Network route |
| Broker Handoff | Distribution / broker layer |
| Local Deployment Echo | Deployment conditions |
| Decision Trigger | Unresolved decision owner |

Correct lesson:

> Tool authorship, route, brokerage, deployment and decision ownership are different layers.

Wrong answers explain the distinction.

### Secondary minigame

`AUTHORSHIP / DEPLOYMENT MATRIX`

Suggested columns:

- Authored
- Routed
- Brokered
- Deployed
- Decided
- Unresolved

Do not make the player repeat the exact same classification mechanic twice. The second puzzle should use relationships between artifacts, not merely rename the first puzzle.

### Phase III evidence

1. `PALIMPSEST Source-Build Hash`
2. `Broker Ledger Fragment`
3. `Jakarta Authorization Echo`

Optional fourth evidence only if needed:

4. `Deployment Condition Echo`

Do not add decorative evidence.

### Phase III proof boundary

By end, prove:

- source-build belongs to PALIMPSEST family
- Jakarta infrastructure handled or brokered the packet
- distribution path and deployment path differ
- Bangkok deployment condition exists
- decision trigger does not identify its owner
- there is lawful basis to contact or observe a probable toolmaker/broker

Do not prove:

- Arman selected victims
- Arman is mastermind
- Arman is murderer
- Elena involvement
- final operator of 05:47
- final operator of 06:09
- decision owner

### Phase III character balance

- North leads technical reconstruction
- Farid validates from Singapore and preserves alternative explanations
- Maya controls local access and prevents route-to-suspect leaps
- Cheryl protects chain of custody
- Benedict chooses investigative direction and reads human behavior
- no one solves everything alone

### Phase III assets

Do not create assets before blueprint approval.

Likely minimal assets:

- one controlled packet-capture console/UI
- one Jakarta operations/lab background reuse or approved new angle
- evidence cards
- one restrained Phase III audio loop
- puzzle success cue reuse where appropriate

No Arman portrait in Phase III unless the approved story explicitly brings his physical reveal forward, which current Canon does not.

### Phase III technical module recommendation

- `js/chapters/chapter-04/03-packet-provenance.js`
- `css/chapter-04-phase-03.css`
- `assets/images/chapter-04/phase-03/`
- `assets/audio/chapter-04/phase-03/`

Bootstrap after Phase II in deterministic order.

Add:

- Save/Load preparation
- resume bridge
- Developer jump
- Return to Title stop
- Character Journal compatibility
- Case File entries
- TH/EN
- mobile QA

## Phase IV — THE MAN BEHIND THE ALIAS

- physical encounter with Arman
- real face reveal around chapter midpoint
- hood feed explicitly excluded as identification evidence
- North verifies live behavior against source hash
- Benedict reads Arman's fear of being framed as sole murder author
- Arman admits wrapper authorship/adaptation
- Arman knew abuse was possible
- Arman did not choose victims
- legitimate Bangkok client supplied deployment conditions
- he lacks direct proof of client identity

Maya does not fall in love with Benedict.

## Phase V — NORTH IS MARKED

Target:

- North's laptop
- Dead Drop
- source-build correlation

Possible mechanism:

- controlled traffic collision
- hotel intrusion
- extraction attempt
- poisoned device handoff

Avoid cartoon assassin behavior.

North actively participates in survival and analysis.

Evidence:

- Attack Telemetry
- Decoy Credential Probe
- Cleanup Authority Echo

## Phase VI — THE FALSE SUCCESS

Counter-operation:

- attacker believes North removed
- hidden live channel preserved
- Farid maintains decoy telemetry
- Cheryl and Maya control legal perimeter
- North consents and designs deception
- Benedict does not decide over her body

Choices affect:

- North trust
- Cheryl trust
- evidence integrity
- future protection strength

## Phase VII — RELAY FACILITY CLIMAX

- preserve relay authorization echo
- Arman assists under conditions
- cleanup triggers
- North works through hidden channel
- Benedict confronts behavior and motive
- capture Registrar reference `R.`
- prove Bangkok watcher deployment predates Singapore trip
- Elena sends true useful information slightly too early
- do not make this an obvious villain reveal

## Phase VIII — SHADOW OF THE TRUTH

Ending:

- public record says North missing, gravely injured or dead according to counter-operation
- North secretly alive
- antagonist believes record
- Benedict returns toward Bangkok
- Jakarta identifies toolmaker, not decision owner
- `R.` becomes next human lead

Closing direction:

> Let her believe the record.

## Chapter IV evidence set

1. PALIMPSEST Source-Build Hash
2. Broker Ledger Fragment
3. Jakarta Authorization Echo
4. Attack Telemetry
5. Decoy Credential Probe
6. Registrar Reference `R.`
7. Bangkok Watcher Deployment Echo

## Chapter IV minigames

1. Packet Provenance Reconstruction
2. Authorship / Deployment Matrix
3. Decoy Telemetry Control
4. Relay Authorization Preservation

## Chapter IV end proof

Prove:

- Arman strongly linked to tool authorship
- Arman not proven decision owner
- North targeted for knowledge
- Bangkok valid access deployed watcher
- `R.` linked to registrar layer
- antagonist monitors official reporting

Do not prove:

- Elena killed Kawin
- Elena killed Daniel
- Rinrada identity
- final legal case

---

# 20. CHAPTER V — THE MISSING PIECE

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

- North missing/injured/presumed dead

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

`Rinrada “Rin” Sornchai`

Rin saw Elena physically present around the pier exchange but did not witness every murder action.

Testimony requires corroboration.

---

# 21. CHAPTER VI — THE FINAL MOVE

Purpose:

Strategic war over final official record.

Team likely understands Elena is decision owner but needs sufficient legal case.

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

Elena remains controlled and philosophical, not cartoon villain.

Benedict rejects the idea that survivable record equals truth.

---

# 22. CHAPTER VII — LAST WITNESS

Purpose:

Resolve:

- victims
- architecture
- wrapper author
- deployer
- decision owner
- physical witness
- legal case

Opening:

Two alerts:

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

Map each fact into:

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

Historical truth is fixed even when player's legal package is incomplete.

---

# 23. ENDING ARCHITECTURE

Historical truth is fixed:

- Elena is mastermind
- Elena killed Kawin
- Elena killed Daniel

What changes:

- evidence preserved
- survival
- proof
- accusation
- institution acceptance
- public record
- character epilogues

## Ending 1 — TRUE CONVICTION

Requires:

- Elena accused
- strong attribution
- clean chain of custody
- local decision path preserved
- witness survives
- North evidence survives
- physical/digital corroboration

Outcome:

- Elena convicted
- record corrected
- Kawin and Daniel restored as victims of one plan
- Rin survives
- Adrian/Arman face evidence-supported charges only
- Benedict and North continue
- Benedict chooses no permanent romantic partner
- Cheryl remains significant ally with a dignified emotional resolution

## Ending 2 — RIGHT NAME, NO CASE

- team knows truth
- conviction fails
- Elena walks/disappears
- witness may survive
- North may remain hunted

Bittersweet, not failure through stupidity.

## Ending 3 — FALSE CONVICTION

Targets:

- Adrian
- Arman

Conditions:

- persuasive architecture/tool evidence
- weak decision-owner proof
- wrong accusation
- institution accepts easier story

Elena remains free.

## Ending 4 — THE PERFECT RECORD

- witness lost
- North framed/discredited
- evidence chain destroyed
- institution accepts false chronology
- final image echoes Room 1807

Darkest ending.

## Fairness

- no ending changes historical murderer
- Adrian never becomes mastermind
- North never becomes mastermind
- Daniel never returns alive
- wrong endings must be understandable
- proof-boundary players have fair path to conviction
- no single dialogue choice determines ending

---

# 24. RELATIONSHIP AND ALLIANCE DESIGN

## Benedict and North

- central partnership
- trust through inclusion
- North consents to fake-success
- Benedict incorporates technical judgment
- no romance
- final partnership continues

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
- make Benedict commit suddenly
- make North romantic rival
- create love triangle with Maya
- interrupt urgent evidence work

## Maya and Benedict

- professional chemistry only
- no romance
- no harem structure
- Maya may notice Cheryl's feelings and remain outside them

## North and Farid

- technical respect
- dry banter
- no romance

## North and Arman

- hostility and curiosity
- technical recognition
- no confusion of skill and innocence

## Benedict and Elena

- psychological duel hidden inside cooperation
- Elena tries to guide narrative
- Benedict tests timing and knowledge
- no direct accusation before proof

---

# 25. AUDIO GOVERNANCE

Owners:

- `02-audio-save.js`
- `11-production-stabilization.js`
- scene-local modules
- integration lifecycle guard

Do not create another global audio manager.

## UI click

- pointerdown
- immediate
- one press one sound
- no duplicate Android playback
- real click, not synthetic ticking

## Evidence cue

- one playback
- separate from puzzle success
- stop on scene exit
- Inspect does not play collection cue

## Chapter IV Phase II accepted audio

- takeoff ambience must fade out before route card/next scene
- no lingering airplane sound
- airport ambience subdued
- lab ambience subdued
- music and ambience duck under dialogue
- Farid remote dialogue does not create extra ambience owner
- Return to Title stops all Phase II media

## Future Chapter IV

- Jakarta atmosphere without tourist cliché
- intelligent restrained tension
- North threat not horror jumpscare
- no constant alarm
- no villain music for Elena

---

# 26. MOBILE, FULLSCREEN AND UI

## Fullscreen

- begins after user gesture
- Settings control
- menu control
- Save Manager in fullscreen root
- Exit Game fallback
- mobile may leave fullscreen when backgrounded
- no brittle automatic re-entry without gesture

## Mobile widths

Check:

- 320 CSS px
- 360×800
- 390 CSS px
- 412×915
- 430 CSS px where practical

Account for:

- browser address bar
- Android nav bar
- safe-area bottom
- dialogue height
- long Thai
- two-line buttons
- scrollable modal body only

## Background art

Standard:

`864 × 1536`

Style:

- noir graphic novel
- cel-shaded
- heavy ink
- angular shadows
- mobile-bright
- operational, not tourist postcard
- no pseudo-text
- exact text or no text

## Portrait compositing

- actual game crop matters
- black background must be pure black where specified
- dark clothing must remain readable
- hair silhouette must remain readable
- do not add colored portrait backgrounds unless explicitly approved
- do not globally alter working characters
- use Benedict/North visual weight as proportion reference

---

# 27. EVIDENCE AND MINIGAME STANDARD

Every evidence item must:

- advance story
- support deduction
- justify location/decision
- have Case File summary
- preserve proof boundary

No decorative evidence.

Every minigame must be:

- mobile-friendly
- tap-first
- approximately 30–60 seconds
- Reset-capable
- no softlock
- no permanent fail
- wrong answer teaches logic
- success cue separate from evidence cue
- derived from collected evidence
- mechanically distinct from adjacent puzzle

Implemented minigames:

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

Planned:

1. Packet Provenance Reconstruction
2. Authorship / Deployment Matrix
3. Decoy Telemetry Control
4. Relay Authorization Preservation
5. Victim Identity Reconstruction
6. Room/Profile Cross-Map
7. Pier Event Reconstruction
8. Controlled Leak Correlation
9. Authority Chain Reconstruction
10. Parallel Scene Prioritization
11. The Last Record

Avoid renamed duplicates.

---

# 28. TESTING STANDARD

## Static

- JS syntax
- CSS parsing
- HTML validity where practical
- asset existence
- paths
- duplicate IDs
- cache queries
- missing portraits
- image dimensions
- alpha/background behavior
- audio decode
- no pseudo-text
- changed-file scope

## Flow

- fresh entry
- opening dialogue
- choices
- evidence open
- Inspect
- collect
- Close
- reopen
- post-evidence dialogue
- minigame gate
- wrong answer
- Reset
- correct answer
- closing
- transition
- Return to Title

## Save

- Auto Save
- Continue
- named save
- load
- choice state
- investigation state
- before/during/after minigame
- completed resume
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
- transition after return
- one-shots do not replay

## Honesty

Never claim:

- Android test
- iPhone test
- live Pages test
- listening test
- complete browser regression
- 100% success

unless actually performed.

Owner device result is final.

---

# 29. CURRENT ACCEPTED LIMITATIONS AND TECHNICAL DEBT

Accepted / known:

- iPhone Safari not owner-tested
- iOS Add to Home Screen not owner-tested
- fullscreen may exit after backgrounding
- legacy global build label still `0.12.1`
- `index.html` static Chapter I intro still says `HOTEL 1807`
- Canon title is `ROOM 1807`
- Phase II CSS header comment still says `0.14.3` although accepted final rules are appended as `0.14.7`
- some Phase II internal asset queries remain `0146` while bootstrap is `0147`
- do not “clean up” accepted runtime without a scoped reason
- do not clear Site Data by default because it may erase saves

No owner-reported blocking defect after accepted Build 0.14.7.

---

# 30. BUILD HISTORY

## 0.7.x

- Canon separation
- Save Manager
- Journal gates
- timeline
- Chapter III route foundation

## 0.8.x

- Changi
- Passenger Trail
- lifecycle
- fullscreen

## 0.9.x

- Singapore Office
- Cheryl/Farid
- Header Comparison
- portrait rebuild

## 0.10.x

- Marina Bay
- managed handoff
- accepted Journal layout
- mobile audio lifecycle

## 0.11.x

- Serviced Apartment
- Hawker Centre
- Adrian
- Credential Header
- Claim Cross-Check

## 0.12.0–0.12.1

- Digital Forensics Lab
- Callback
- Chapter III completion
- corrected laptop/feed/audio presentation
- owner accepted Season 1

## 0.13.2

- Chapter IV Phase I AFTERIMAGE
- Evidence Route Board
- North becomes Analyst of Record target
- two-hands split

## 0.14.0–0.14.6

- Phase II implementation
- audio balance fixes
- takeoff ambience
- Farid remote label
- Maya role wrapping
- phrase correction
- iterative portrait defects and repairs

## 0.14.7

Owner-accepted Phase II final:

- Maya original navy suit
- black portrait background
- visible hair contour
- accepted proportions
- deterministic cache query 0147
- Phase II dialogue correction
- takeoff fade-out
- airport/lab ambience balance
- current playable endpoint

---

# 31. TECHNICAL RISKS

## Global overrides

Search full chain before editing.

## Dynamic DOM

Chapter III and IV inject DOM at runtime.

Bind only after injection.

## Observer proliferation

Do not add observer when direct binding, CSS, explicit resume or existing lifecycle can solve it.

## Audio overlap

Trace:

- base audio
- stabilization
- scene-local audio
- lifecycle guard

before adding playback.

## Save compatibility

Every Phase III screen must be added to:

- labels
- restore preparation
- resume
- audio reconstruction
- menu/save controls
- state defaults
- Developer jump

## Character regression

Do not:

- add global portrait wrapper
- move Relationship
- resize all cards
- add colored backgrounds
- duplicate red dots
- unlock aliases
- touch Cheryl/Farid for Maya work

## Proof regression

Do not equate:

- Jakarta = Arman
- Arman = PALIMPSEST from hood
- Adrian = mastermind
- 18-07 = person
- valid credential = Elena
- witness statement = complete legal case

---

# 32. EXACT NEXT-CHAT OPERATING INSTRUCTION

A new assistant must behave as though the owner has said:

> Continue LAST WITNESS from owner-confirmed Build 0.14.7.  
> Repository: `grolygori789-crypto/last-witness`.  
> Branch: `restore-game-recovered`.  
> Read this entire file first.  
> Fetch latest GitHub runtime, `index.html`, Chapter IV bootstrap, Phase I, Phase II, CSS, current assets and relevant shared owners.  
> GitHub is code/asset truth. This plan is Canon/future truth.  
> Do not patch from memory or old ZIP.  
> Do not push, commit, branch or delete unless specifically authorized.  
> Work locally and deliver ZIP.  
> Chapter I through Chapter IV Phase II passed owner Android Chrome testing.  
> Current endpoint is `NEXT · PHASE III · PACKET PROVENANCE`.  
> Do not recreate Phase I or Phase II.  
> Do not ask the owner to restate the project.  
> Preserve the final accepted Maya assets.  
> Start by auditing current Phase II handoff and producing a detailed Phase III blueprint before assets or code.  
> Work efficiently. Patch the smallest scope. Do not waste time on repeated failed methods or unrelated regeneration.

---

# 33. COPY-PASTE PROMPT FOR NEW CHAT

```text
บิ๊ว เราจะทำโปรเจกต์ LAST WITNESS ต่อจาก Production ล่าสุดครับ

ก่อนตอบหรือเสนอการแก้ไขใดๆ ให้เปิดและอ่านไฟล์ GAME_MASTER_PLAN.md ล่าสุดจาก GitHub ตั้งแต่ต้นจนจบ แล้วตรวจ GitHub Production ล่าสุดจริง ห้ามใช้ความจำหรือ ZIP เก่าแทนไฟล์บนสาขาปัจจุบัน

ข้อมูลหลัก
- Repository: grolygori789-crypto/last-witness
- Production branch: restore-game-recovered
- Live game: https://grolygori789-crypto.github.io/last-witness/
- Source of Truth ของโค้ด Asset Path Load Order และพฤติกรรมที่ Deploy คือ GitHub ล่าสุด
- Source of Truth ของ Canon Owner Secrets พล็อตระยะยาว Workflow Proof Boundaries และ Alternate Endings คือ GAME_MASTER_PLAN.md ล่าสุด
- Owner-confirmed latest playable module build: 0.14.7
- Chapter I, Chapter II, Chapter III และ Chapter IV Phase I-II ผ่านการทดสอบจริงของพี่บน Android Chrome แล้ว
- จุดจบปัจจุบันคือ PHASE II COMPLETE / JAKARTA ARRIVAL / NEXT: PHASE III — PACKET PROVENANCE
- งานถัดไปคือ CHAPTER IV PHASE III — PACKET PROVENANCE
- ห้ามย้อนกลับไปออกแบบ Phase I หรือ Phase II ใหม่
- ห้ามถามให้พี่เล่า Canon หรือสถานะซ้ำ

กฎการสื่อสาร
1. เรียกพี่ว่า “พี่เบนซ์”
2. เรียกตัวเองว่า “บิ๊ว”
3. ตอบภาษาไทย น้ำเสียงผู้หญิง ตรงไปตรงมา
4. อย่าอ้างว่าเสร็จก่อนมีไฟล์จริง
5. อย่าอ้าง Android test หรือ 100% ผ่าน ถ้ายังไม่ได้ทดสอบจริง
6. ถ้าเจอ Tool Error หรือ Permission Error ให้แจ้งทันที เปลี่ยนวิธีที่ง่ายกว่า และห้ามปล่อยให้พี่รอนานโดยไม่มี Deliverable

กฎ GitHub และไฟล์
1. ตรวจ latest GAME_MASTER_PLAN.md
2. ตรวจ index.html
3. ตรวจไฟล์และ SHA ปัจจุบันของงานที่เกี่ยวข้อง
4. ตรวจ load order, cache query, dynamic injection, Save/Load, audio owner, Character Journal, Case File และ Developer Mode
5. ห้ามสร้าง Branch, Push, Commit, Delete หรือแก้ GitHub โดยตรง เว้นแต่พี่อนุญาตการเขียนรายการนั้นอย่างชัดเจนในข้อความปัจจุบัน
6. ทำงานในเครื่องและส่ง ZIP ให้พี่อัปโหลดเอง
7. ส่ง Manifest, Install Instructions, Test Report และ SHA-256
8. แก้ไฟล์ให้น้อยที่สุด
9. ห้ามเพิ่ม listener, observer, polling, global audio manager หรือ state repair ซ้อนโดยไม่มีหลักฐานว่าจำเป็น

กฎความฉลาดและประสิทธิภาพ
1. แยกให้ออกว่าภาพที่พี่ส่งเป็น “ตัวอย่างอ้างอิง” หรือ “ไฟล์ที่ต้องแทนในเกม”
2. ตรวจไฟล์ในเกมที่มีอยู่ก่อนสร้างหรือ Generate ใหม่
3. ปัญหา CSS ให้แก้ CSS ก่อน อย่าสร้าง Asset ใหม่โดยไม่จำเป็น
4. ปัญหาสีหรือสัดส่วนของตัวละครหนึ่งคน ห้ามไปแตะตัวละครอื่น
5. หลังวิธีแรกพลาด ให้หาสาเหตุ
6. หลังวิธีเดิมพลาดสองครั้ง ให้หยุดและเปลี่ยนแนวทาง
7. ห้ามประมวลผลยาวโดยไม่มีผลลัพธ์
8. ห้ามให้พี่รอแล้วสุดท้ายไม่มีไฟล์
9. ทุกคำว่า “เสร็จแล้ว” ต้องมี Artifact ที่เปิดได้จริง
10. QA ต้องทำก่อนส่ง ไม่ใช่โยนให้พี่เป็นคนตรวจแทนทั้งหมด

Canon สำคัญ
- A valid credential proves access, not identity.
- Benedict อายุ 42 เป็น protagonist และผู้ตัดสินใจมนุษย์คนสุดท้าย อ่านคนและใช้คำพูดเก่ง ไม่กล่าวหาเกินหลักฐาน
- North อายุ 32 เป็น Technical Lead คู่หูหลัก ไม่ใช่ผู้ช่วยรอคำสั่ง ไม่ใช่เหยื่อแบบ passive และไม่มี romance กับ Farid
- Elena คือ Mastermind และฆาตกรจริง แต่ยังต้องดูน่าเชื่อถือ ให้ข้อมูลจริง และห้าม Villain Coding ก่อนหลักฐานพอ
- Adrian เป็นอดีต System Architect ที่มีส่วนผิด แต่ไม่ใช่ Mastermind
- Arman/PALIMPSEST เป็น Toolmaker/Wrapper Specialist ที่อันตรายและมีส่วนผิด แต่ไม่ใช่ผู้เลือกศพ ห้อง หรือเวลา
- ภาพฮู้ด Chapter III เป็น Digital Mask ไม่ใช่หลักฐานตัวตน
- Maya เป็นตำรวจไซเบอร์อินโดนีเซีย เป็น Professional Equal ของ Cheryl ไม่มี romance กับ Benedict
- Cheryl มีความรู้สึกจริงจังต่อ Benedict แต่ควบคุมตัวเองและคดีต้องมาก่อน
- Benedict สุดท้ายไม่เลือกคู่รักถาวร เขาเลือกชีวิตนักสืบที่เคลื่อนไปข้างหน้า
- Farid อยู่สิงคโปร์ใน Phase II และต้องแสดงว่าเป็น Remote · Singapore
- Chapter I victim ไม่ใช่ Daniel และจะเปิดเผยเป็น Kawin Nopparat ใน Chapter V
- R. เชื่อมกับ Rinrada “Rin” Sornchai และ Registrar role
- Elena เป็น Decision Owner
- Historical truth คงที่ทุก Ending

สถานะ Chapter IV
Phase I AFTERIMAGE ผ่านแล้ว
- Jakarta: Wrapper Fingerprint + Rendezvous Token
- Bangkok: Signed Package + Cleanup Credential
- Decision Owner: Unresolved
- North ถูกค้นด้วยบทบาท ANALYST OF RECORD

Phase II JAKARTA ARRIVAL ผ่านแล้ว
- ออก Singapore 23:20 SGT
- ถึง Jakarta 00:10 WIB
- Office 01:05 WIB
- Verification Lab 01:18 WIB
- Farid เก็บ Raw Mirror ใน Singapore
- North พก Sanitised Clone
- Maya จำกัดสิทธิ์เป็น Read Only / Passive Response
- Minigame order:
  1. Preserve Token Hash
  2. Clone Into Sandbox
  3. Send Passive Challenge
  4. Compare Response Grammar
- ห้าม Open Live Rendezvous หรือ Trace Responder
- Token genuine, single-use, Jakarta broker route real
- Human identity unresolved
- Packet แยกเป็น Source-Build Fingerprint, Jakarta Relay Exit, Broker Handoff, Local Deployment Echo, Decision Trigger
- Maya พูดว่า:
  “I am authorising a controlled packet capture. The next phase begins with provenance, not pursuit.”
- Benedict: “It was never a meeting place.”
- North: “No. It is a receipt.”
- Maya: “Then prove who handled it.”

Maya Visual Lock
- ใช้ชุดสีกรมท่าเดิมตาม Master Sheet
- ห้ามทำชุดกลืนเป็นดำ
- พื้นหลัง Portrait เป็นดำ
- มีเส้นขอบบางๆ ให้เห็นทรงผมบ๊อบ
- สัดส่วนหน้าและช่วงตัวมีน้ำหนักระดับเดียวกับ Benedict
- Final 0.14.7 ผ่านแล้ว ห้ามแก้ซ้ำโดยไม่มีคำสั่ง
- ห้ามแตะ Cheryl หรือ Farid เมื่อแก้ Maya

งานแรกของห้องนี้
1. สรุปผลการตรวจ GitHub ล่าสุดแบบสั้นแต่ชัด
2. ตรวจจุดส่งต่อจาก Phase II
3. เสนอ Complete Blueprint ของ CHAPTER IV PHASE III — PACKET PROVENANCE
4. Blueprint ต้องระบุ:
   - จุดเริ่มฉาก
   - เวลาและสถานที่
   - ตัวละครและบทบาท
   - Evidence
   - Minigame
   - คำตอบที่ถูก
   - Proof Boundary
   - Dialogue beats
   - State schema
   - Save/Load
   - Developer jump
   - Audio
   - Asset list ที่จำเป็นจริง
   - จุดจบที่ส่งเข้า Phase IV
5. ห้ามสร้าง Asset หรือเขียนโค้ดจน Blueprint ได้รับอนุมัติ
6. Phase III ต้องนำไปสู่ THE MAN BEHIND THE ALIAS โดยยังไม่เรียก Arman ว่า Mastermind หรือ Killer
7. North นำ Technical Analysis
8. Benedict ยังเป็นผู้ตัดสินใจและอ่านพฤติกรรมมนุษย์
9. Maya และ Cheryl รักษาเขตอำนาจกับหลักฐาน
10. Farid สนับสนุนระยะไกลจาก Singapore

ทำงานฉลาด กระชับ และต้องมีผลลัพธ์จริง อย่าปล่อยให้พี่รอนานแล้วไม่ได้อะไร
```

---

# 34. MASTER PLAN UPDATE PROTOCOL

Update whenever any change occurs to:

- production baseline
- owner acceptance
- playable boundary
- Canon
- owner secret
- character role
- Journal gate
- Save schema
- storage key
- runtime path
- load order
- audio owner
- asset path
- new phase
- known defect
- resolved defect
- next target
- chapter structure
- ending architecture

Before replacing:

1. fetch latest file
2. preserve Canon
3. preserve unresolved mysteries
4. preserve owner secrets
5. preserve workflow
6. preserve technical ownership
7. record owner result
8. keep exact filename

---

# 35. CURRENT CANON SUMMARY

## Confirmed to player

- Room 1807 staged
- Room 1807 victim not Daniel
- Daniel investigated pattern
- Daniel dead
- 18-07 profile, not person
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
- deployment/decision path points Bangkok
- North recognized as analytical role
- token genuine and single-use
- Jakarta broker route real
- Phase II complete

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
- fixed historical truth
- four major ending architecture
- Benedict chooses no permanent romantic partner

## Unresolved to player after Phase II

- Room 1807 victim identity
- identity of `R.`
- warning caller
- pier meeting
- operator at 05:47
- operator at 06:09
- watcher deployment controller
- PALIMPSEST human identity
- Arman identity
- decision owner
- Elena path
- living Last Witness
- final admissible case

---

# END OF MASTER PLAN

Do not replace this file without preserving:

- Build 0.14.7 owner pass
- Chapter IV Phase I-II accepted state
- Maya final visual lock
- current GitHub workflow
- current load order
- Save/Load continuity
- fullscreen/audio lifecycle
- Character Journal layout
- Chapter I-III Canon
- Daniel death lock
- Room 1807 victim separation
- Daniel timeline
- Chapter III puzzle solutions
- Chapter IV Phase I/II solutions and proof boundaries
- Elena secret
- Adrian/Arman boundaries
- Kawin/Rinrada forward Canon
- Benedict/Cheryl/North ending Canon
- Chapter IV-VII plan
- Alternate Ending architecture
- new-chat zero-explanation handoff
- intelligent, minimal, time-efficient working discipline
