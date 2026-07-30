# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-07-30 · Canon Addendum 19:22 ICT  
> **Replaces planning blob:** `9b1942b78736b358c0b9478c8af2ef9075d1cdeb`  
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
> **This revision adds owner-confirmed Chapter IV structure and visual-story Canon:** Chapter IV has eight phases; North becomes a direct elimination target because her analysis threatens the decision owner; Phase V contains a natural undercover resort/pool surveillance sequence in which North, Cheryl and Maya use tourist cover and wear distinct bikini styles consistent with their bodies and personalities. This is a story-integrated operation, not disconnected fan service.

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

## Current playable content

1. Chapter I complete
2. Chapter II complete
3. Chapter III complete
4. Chapter IV Phase I complete
5. Chapter IV Phase II complete

Current endpoint:

- `PHASE II COMPLETE`
- `JAKARTA ARRIVAL`
- `NEXT · PHASE III · PACKET PROVENANCE`

There is no playable Chapter IV Phase III yet.

## Immediate production order

1. Implement Chapter IV Phase III from the approved Phase II handoff.
2. Do not rebuild Phase I or Phase II.
3. Phase III reuses the Jakarta Verification Lab and existing approved audio/portraits unless a later blueprint proves a new asset is necessary.
4. The first clearly missing custom asset package begins with **Chapter IV Phase IV — THE MAN BEHIND THE ALIAS**, particularly Arman’s physical reveal and any new location/audio required by the approved Phase IV blueprint.
5. Phase V requires its own resort/pool/coastal surveillance asset blueprint before image or audio production.
6. Do not request or generate broad asset batches before the relevant phase blueprint is locked.

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
- Keep the owner informed during long tasks
- If a tool or filesystem method fails, state the failure and switch to a simpler method
- Never let the owner wait through repeated failed attempts with no artifact

## Mandatory efficiency discipline

For every task:

1. identify the smallest actual problem
2. inspect the current in-game file before considering regeneration
3. treat owner-supplied images as references unless the owner explicitly says to replace the game asset with that image
4. patch the minimum number of files
5. do not rebuild an entire character set to solve a CSS or color problem unless inspection proves the source assets are wrong
6. do not touch working characters while repairing another character
7. after one failed approach, diagnose why
8. after two failed attempts, stop repeating the same method and switch to a simpler verified approach
9. if a filesystem or permission error blocks progress, report it immediately
10. produce a concrete artifact before claiming completion
11. include QA evidence, changed-file scope and testing limits
12. avoid unnecessary web searches, conversion pipelines, asset generation or repackaging when a local edit is sufficient
13. never use fragile automation when a direct deterministic edit is safer
14. do not regenerate approved art merely because a reference was supplied for color, scale or composition guidance
15. do not let “sexy scene” become an excuse to ignore character identity, story function or project tone

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
- preserve owner-accepted runtime facts
- record any new Canon as owner-confirmed, proposed or unresolved
- do not silently upgrade a proposed blueprint into owner-accepted implementation status

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

3. **Owner’s latest real-device result**
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
| `GAME_MASTER_PLAN.md` | `9b1942b78736b358c0b9478c8af2ef9075d1cdeb` | planning baseline before this local replacement |
| `index.html` | `e30f3fb1f20399d51de9aba220802361a5da15d9` | static DOM and static load order |
| `js/chapters/chapter-02/05-chapter2-integration.js` | `a90af7d17259d54e7525c6d574edc12455c63b23` | Chapter III loader, lifecycle guard, legacy visible build label |
| `js/chapters/chapter-04/01-afterimage.js` | `b61d3e8a9e118e9437b8bdf5eb5cb0a9b99c1df2` | Chapter IV Phase I |
| `js/chapters/chapter-04/02-jakarta-arrival.js` | `763b434cebd1173d4495fbd3d4b0cae97c978ed2` | Chapter IV Phase II, build 0.14.7 |
| `css/chapter-04-phase-02.css` | `ec692df508267781f76193ca0d33d59e47a5e6d9` | Phase II presentation and accepted Maya final rules |
| `js/engine/09-defect-hotfix.js` | `b83cf21d7b2451dedf011d668faa016a39d12b94` | deterministic Chapter IV bootstrap, cache query 0147 |

Latest verified repository commit at time of planning audit:

- commit: `545ac486d1021dd662a10c7df5ea43a6040e4009`
- message: `Add files via upload`
- timestamp: `2026-07-30T11:54:00Z`

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

Phase III files do not yet exist in Production.

Recommended future order:

1. Phase I JS
2. Phase II CSS
3. Phase II JS
4. Phase III CSS
5. Phase III JS
6. later Chapter IV phases in narrative order

Do not turn `09-defect-hotfix.js` into a large repair dump. It is a disabled legacy shim plus deterministic Chapter IV bootstrap.

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

Shared API includes:

- `LastWitnessAudioCue.playInspection`
- `LastWitnessAudioCue.playPuzzleSuccess`
- `LastWitnessProductionAudio.refresh`

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

- Singapore to Jakarta flight
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

Do not expose a crude morality bar. Consequences appear through evidence, trust, admissibility, witness safety and official-record control.

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

## Candidate `state.chapter4.phase3`

This schema belongs to the Phase III blueprint and is not owner-accepted implementation until the owner approves the build.

```js
state.chapter4.phase3 = {
  started: false,
  locationCardSeen: false,
  introComplete: false,
  captureAuthorized: false,
  captureChecks: [],
  captureComplete: false,
  packetFragments: [],
  principleChosen: false,
  principleKey: "",
  principleApplied: false,
  provenanceAssignments: {},
  provenanceAttempts: 0,
  provenanceComplete: false,
  provenanceDebriefSeen: false,
  evidenceCollected: [],
  evidenceViewed: [],
  activeEvidenceId: "",
  authorshipMatrix: {},
  authorshipAttempts: 0,
  authorshipComplete: false,
  legalDebriefSeen: false,
  brokerLeadEstablished: false,
  brokerHandle: "",
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

## Restore rule

Before restoring late Chapter III or Chapter IV:

1. load prior dynamic modules in narrative order
2. initialize state defaults
3. apply migration
4. restore snapshot
5. call the correct phase resume bridge
6. reconstruct active screen
7. reconstruct audio
8. reconstruct dialogue, modal, evidence and puzzle lifecycle
9. reconstruct Journal/Case File extensions
10. preserve completed-state behavior

Chapter IV Phase I wraps the base snapshot to include `chapter4` and `endingProfile`. Phase III must not create a competing global snapshot owner.

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
- load during Authorship/Deployment Matrix
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

### Benedict’s long-term romantic Canon

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
- Benedict’s trusted long-term partner
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
- sees Benedict’s deepest choice as settling versus perpetual forward movement
- knows he ultimately chooses movement

### North physical and swimwear visual Canon

- leanest of North, Cheryl and Maya
- lean-fit rather than thin or fragile
- looks like someone who consistently maintains health and mobility
- flat, naturally athletic midsection
- toned arms and legs without bodybuilder exaggeration
- compact, agile silhouette
- realistic adult proportions
- no enlarged anatomy merely to compete visually with Maya or Cheryl
- bikini direction: minimalist, clean, functional and refined
- the suit must allow believable movement during surveillance
- sexiness comes from confidence, fitness, posture and identity rather than extreme exposure
- no passive pin-up posing that contradicts her alert technical personality

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
- outward energy can read tomboyish or hard-edged without erasing her femininity

Accepted expressions include:

- `restrained_amusement`
- `professional_fluster`
- `softened_professional`
- `focused_command`

### Cheryl physical and swimwear visual Canon

- second most voluptuous of North, Cheryl and Maya
- athletic-curvy physique
- slightly less full-figured than Maya
- excellent overall proportions
- strong shoulders, toned arms and a visibly fit waist
- shapely but operationally believable hips and legs
- looks physically capable, not ornamental
- tomboy confidence remains present even in a bikini
- bikini direction: sporty, assertive and movement-ready, with a strong silhouette
- the design may be revealing enough to provide visual appeal but must still look like a real commercially available athletic two-piece
- her sexiness comes from athletic form, composure and confidence
- do not feminize her into a different person
- do not turn her into a shy caricature because Benedict is nearby

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
- dialogue label:
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
- age 43–47
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
- may notice Cheryl’s feelings but does not enter a love triangle
- Character Journal unlocks at formal introduction

### Maya accepted Phase II visual Canon

- original dark navy suit color from approved master sheet
- color remains visibly navy, similar in visual family to Cheryl
- do not recolor suit black
- do not apply a dark filter that makes it disappear
- pure black portrait background
- subtle external line preserves black bob silhouette
- face and upper torso have strong visual weight comparable to Benedict
- no tiny distant portrait
- no CSS scaling trick that damages crop
- no cyan, blue or transparent connector under neck
- no missing shoulders or blazer
- accepted asset set frozen unless owner requests change
- do not touch Cheryl or Farid while changing Maya

### Maya physical and swimwear visual Canon

- most voluptuous and visually full-figured of North, Cheryl and Maya
- deliberately the most “เอ็กซ์” of the three while remaining a believable adult professional
- full bust, defined waist and fuller hips/thighs
- strong and healthy rather than soft, helpless or anatomically exaggerated
- realistic weight distribution, posture and swimsuit support
- bikini direction: elegant, confident, luxurious and body-emphasizing
- design should look premium and commercially real, not fantasy lingerie disguised as swimwear
- she should remain composed and authoritative even while using a tourist cover
- her visual impact may be strongest, but the framing must not erase her police authority
- no romance with Benedict and no harem coding

## Three-woman visual separation rule

The three bodies must remain unmistakably different:

- **Maya:** voluptuous, elegant, strongest curves
- **Cheryl:** athletic-curvy, tomboy confidence, slightly less voluptuous than Maya
- **North:** lean-fit, agile, health-conscious

The difference must come from:

- shoulder width
- torso length
- waist-to-hip relationship
- muscle tone
- limb mass
- posture
- movement
- swimsuit construction
- personality

Do not create three copies of one body with different breast sizes. Preserve identity, anatomy, biomechanics and realistic commercially available swimwear.

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
- witnessed Elena’s physical presence around the pier meeting with Kawin
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
- no swimwear-specific duplicate Character Cards
- Phase V visual changes are scene costumes, not new identities

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

General standard is true transparent alpha. Maya Phase II is an approved exception using a pure black in-image background for reliable dark-UI presentation.

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
- for Phase V swimwear assets, decide whether the scene requires dialogue portraits, full-body scene sprites, cinematic stills or a combination before generating anything
- never crop or pose the three women identically

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

## Chapter IV phase-count lock

Chapter IV has exactly **eight phases**.

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET PROVENANCE
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

Do not add a ninth phase without owner approval. Internal scenes may exist within a phase.

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

## Chapter IV threat escalation

- By Chapter IV, the decision owner understands that North has moved beyond routine technical analysis.
- North has separated tool authorship, route, deployment and decision ownership.
- The `ANALYST OF RECORD` query proves the adversarial system is identifying the role that understood the pattern.
- North is now a strategic threat because she can expose the attribution gap that protects Elena.
- Elena therefore initiates or authorizes a plan to remove North from the investigation.
- The attempt must remain deniable and consistent with Elena’s preference for records, staging and controlled sequence.
- The attack should resemble accident, operational failure or another actor’s violence rather than an obvious theatrical assassination.
- North must remain active, intelligent and involved in surviving and analyzing the attempt.
- Benedict cannot decide to use North’s body as bait without her consent.
- The attack must produce evidence that advances the case.

---

# 14. CANONICAL DANIEL TIMELINE

| Time | Canon event |
|---|---|
| 05:47 | Daniel’s building accepts Temporary Operational Profile 18-07 with resident-access role |
| 05:51 | Daniel’s Orchid Café draft is edited |
| 05:58 | original toxicology sample is collected |
| 06:09 | `COLLECTION_TIME` revised from 05:58 to 06:09 using accepted Evidence Division permission |
| 06:17 | Laboratory Accession Record created |
| 06:20 | Daniel officially reported discovered |

## Locked wording

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

- Victim’s Phone
- Blood-stained Cloth
- Victim’s Laptop
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
- correct only through scoped audited change
- do not mix into unrelated Phase III work without approval

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
- Daniel’s investigation board
- Room 1807 connection
- “Ask E. about the corrected time”
- Café draft edited at 05:51
- certified extract
- sealed custody envelope
- accepted Evidence Division permission
- FS-12
- offline local session
- genuine science
- 05:58 to 06:09 correction
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

1. 05:58 -> Original Header
2. 06:09 -> Corrected Header
3. both validate / corrected claims FS-12 -> Shared
4. eleven-minute rule -> Policy

Conclusion:

- two versions validate
- rule exists
- raw order, device source and operator unresolved

## Phase V — Marina Bay

Scene:

`THE EXIT IS NOT THE SOURCE`

Correct Confidence Review:

- public gateway exit -> PROVEN
- subscriber reacted -> SUPPORTED
- operator physically present -> UNPROVEN
- token reached serviced-apartment network -> PROVEN
- Adrian controlled session -> UNPROVEN

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

- window rule -> record
- room presence -> unverified
- subscriber human control -> unverified
- raw-order claim -> consistent

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

- signature -> PROVEN
- permission -> PROVEN
- device time -> CLAIMED
- display order -> DERIVED
- human operator -> UNRESOLVED
- credential identity -> UNRESOLVED

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
- room number buried operational profile in literal location

## Daniel murder

- continued Kawin’s work
- linked Room 1807, 18-07, `E.`, corrected time and Singapore
- Elena killed him
- attached true science to engineered chronology

## Watcher

- deployed via Elena’s legitimate forensic access
- signed Bangkok package carried dormant watcher
- watcher waited for North’s raw-mirror milestone
- cleanup process attempted to erase callback token while preserving official record

## Why Elena allowed investigation

She wanted:

- independent validation of curated narrative
- North to expose technical actors
- Adrian and Arman to become plausible targets
- Rinrada to react
- a public record that survived scrutiny

## Why Elena turns against North in Chapter IV

- North no longer merely retrieves data.
- North understands the separation between valid credential, human operator and decision owner.
- North can prevent Arman or Adrian from absorbing all blame.
- North’s analysis threatens Elena’s ability to leave a perfect official record.
- The `ANALYST OF RECORD` query confirms North has been classified as the person who understood the architecture.
- Elena chooses neutralization before North can connect Bangkok deployment conditions to human decision behavior.
- Elena’s attempt must preserve plausible deniability and ideally produce a record that says North is gone.

---

# 19. CHAPTER IV — SHADOW OF THE TRUTH

## Status

- Phase I: complete and accepted
- Phase II: complete and accepted
- Phase III: blueprint proposed, not yet implemented
- Phase IV–VIII: planned
- Total phase count: eight

## Purpose

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

North target beat:

- authenticated subscriber query
- query term: `ANALYST OF RECORD`
- it asks who understood evidence
- North states she is the search term
- Benedict refuses to use her as bait without consent
- North refuses protection through exclusion

Proof:

- route and deployment separate
- North recognized as analytical role
- no identity result
- legal basis for Jakarta cooperation

## Phase II — JAKARTA ARRIVAL

Status:

`COMPLETE · MODULE 0.14.7 · OWNER-ACCEPTED`

### Scene sequence and time

1. Singapore departure: 23:20 SGT
2. flight: 1 h 50 m
3. Jakarta arrival: 00:10 WIB
4. Cybercrime Operations: 01:05 WIB
5. Verification Lab: 01:18 WIB
6. Day: Day 5

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

### Maya authority

- token validation authority
- certificate wrapper access
- one passive response
- no live trace
- no intrusion
- no raid from IP address
- no physical attribution from relay address

### Token Verification minigame

Correct order:

1. `PRESERVE TOKEN HASH`
2. `CLONE INTO SANDBOX`
3. `SEND PASSIVE CHALLENGE`
4. `COMPARE RESPONSE GRAMMAR`

Rejected dangerous actions:

- `OPEN LIVE RENDEZVOUS`
- `TRACE RESPONDER`

### Findings

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

### Correct transition line

Maya:

> “I am authorising a controlled packet capture. The next phase begins with provenance, not pursuit.”

Thai:

> “ฉันอนุมัติการเก็บ Packet แบบควบคุม ขั้นต่อไปต้องเริ่มจากการพิสูจน์ที่มา ไม่ใช่การไล่ล่า”

Closing:

Benedict:

> “It was never a meeting place.”

North:

> “No. It is a receipt.”

Maya:

> “Then prove who handled it.”

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

`NEXT PRODUCTION TARGET · BLUEPRINT PROPOSED · NOT YET OWNER-TESTED`

### Starting card

- `DAY 5 · 01:24 WIB`
- `JAKARTA VERIFICATION LAB`
- `PHASE III · PACKET PROVENANCE`

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

Prove difference between:

- tool-family authorship
- relay route
- broker distribution
- local deployment
- decision trigger

Move toward a lawful encounter with Arman without calling him murderer or decision owner.

### Scene flow

1. Controlled Capture
   - capture conditions sealed
   - joint authority recorded
   - Singapore original hash verified
   - sanitised clone matched
   - five fragments preserved
   - no second passive challenge
   - no additional network activity
2. Benedict principle choice
   - Follow Build Lineage
   - Follow Broker’s Habits
   - Follow Condition That Woke Packet
   - all converge
3. Packet Provenance Reconstruction
4. Evidence review
5. Authorship / Deployment Confidence Matrix
6. Legal debrief
7. controlled broker inquiry lead
8. completion card leading to Phase IV

### Character roles

- North leads technical reconstruction
- Benedict chooses focus and interprets blame architecture
- Maya owns local legal authority
- Cheryl records chain of custody
- Farid validates original hash from Singapore
- no Arman portrait or Journal unlock in Phase III
- no Elena or Adrian appearance required

### Benedict choice effects

- build lineage: `attributionProof +1`
- broker habits: `allianceStrength +1`
- deployment condition: `chainOfCustody +1`

All routes converge.

### Primary minigame

`PACKET PROVENANCE RECONSTRUCTION`

| Fragment | Correct layer |
|---|---|
| Source-Build Fingerprint | Tool Authorship / Build Lineage |
| Jakarta Relay Exit | Network Route |
| Broker Handoff | Distribution / Broker Layer |
| Local Deployment Echo | Deployment Conditions |
| Decision Trigger | Decision Owner · Unresolved |

Lesson:

> Tool authorship, route, brokerage, deployment and decision ownership are different layers.

### Evidence

1. `PALIMPSEST Source-Build Hash`
2. `Broker Ledger Fragment`
3. `Jakarta Authorization Echo`
4. `Deployment Condition Echo` as DOM/CSS record if needed

No decorative evidence.

### Secondary minigame

`AUTHORSHIP / DEPLOYMENT MATRIX`

Use confidence relationships rather than duplicate classification:

- Source-Build Hash ↔ PALIMPSEST family = PROVEN
- Jakarta Authorization Echo ↔ local infrastructure handled handoff = PROVEN
- Broker handle ↔ distributed build = SUPPORTED
- Deployment echo ↔ trusted Bangkok conditions = SUPPORTED
- Decision trigger ↔ person selecting victim/room/time = UNRESOLVED

A candidate operational handle may be used only as an account/handle, not identity proof. `BRK-AS-04` is a proposed placeholder and may be changed before implementation.

### Proof boundary

By end, prove:

- source build belongs to PALIMPSEST family
- Jakarta infrastructure handled or brokered packet
- distribution and deployment paths differ
- Bangkok deployment condition exists
- decision trigger does not identify owner
- lawful basis exists to contact or observe probable toolmaker/broker

Do not prove:

- Arman selected victims
- Arman is mastermind
- Arman is murderer
- Elena involvement
- final operator of 05:47
- final operator of 06:09
- decision owner

### Suggested dialogue beats

- Maya authorizes provenance capture without reopening endpoint.
- Cheryl establishes Singapore-original / Indonesia-analysis custody split.
- Farid confirms original hash and clone match.
- North: “Five fragments. Five functions. None of them is a name.”
- North explains that build, route and broker do not know who chose target.
- Farid preserves an alternative explanation.
- Maya blocks a warrant leap.
- Benedict recognizes that leaving craftsman visible and client blank may be an arrangement of blame.
- Final action authorizes observation or technical interview only.
- Cheryl states: no arrest, no murder allegation, no hood identification.
- Benedict frames the next encounter as meeting the person the record points toward, not the villain it invites them to invent.

### Completion card

- SOURCE BUILD: PALIMPSEST FAMILY
- BROKER HANDLE: UNVERIFIED
- DEPLOYMENT CONDITION: BANGKOK-LINKED
- DECISION OWNER: UNRESOLVED
- `NEXT · PHASE IV · THE MAN BEHIND THE ALIAS`

### Minimal implementation scope

Modify:

- `js/engine/09-defect-hotfix.js`

Add:

- `js/chapters/chapter-04/03-packet-provenance.js`
- `css/chapter-04-phase-03.css`

Do not change `index.html`, Phase I or Phase II unless inspection proves unavoidable.

### Phase III assets

Current blueprint requires no new image or audio package:

- reuse Jakarta Verification Lab background
- reuse approved portraits
- reuse restrained Phase II verification loop through a separate phase-local media element
- reuse shared inspection and puzzle cues
- construct evidence and puzzles in DOM/CSS
- stop Phase II audio on Phase III entry
- no global audio manager
- no new observer or polling system

## Phase IV — THE MAN BEHIND THE ALIAS

Purpose:

- physical encounter with Arman
- real face reveal around chapter midpoint
- hood feed explicitly excluded as identification evidence
- North verifies live behavior against source hash
- Benedict reads Arman’s fear of being framed as sole murder author
- Arman admits wrapper authorship/adaptation
- Arman knew abuse was possible
- Arman did not choose victims
- legitimate Bangkok client supplied deployment conditions
- he lacks direct proof of client identity

Maya does not fall in love with Benedict.

### Phase IV asset boundary

This is the first phase after current Production likely to require a genuinely new custom asset package.

Do not ask the owner to resend broad old folders. Request only the files required by the approved Phase IV blueprint, likely:

- Arman approved physical portrait/expression set
- one or more Phase IV location backgrounds
- phase-local ambience/music if existing tracks do not fit
- evidence art only where DOM/CSS cannot communicate it cleanly

Inspect GitHub first. Existing files must not be resent merely because they were discussed in another room.

## Phase V — NORTH IS MARKED

### Locked narrative function

- North has become a direct strategic threat to the decision owner.
- The adversary begins an operation intended to remove her from the investigation.
- The attempt must be deniable, intelligent and consistent with the case’s record-manipulation theme.
- North remains active and analytical.
- The attack produces usable telemetry or authorization evidence.
- Phase V must feed naturally into Phase VI’s false-success counter-operation.

### Owner-confirmed setting direction

Phase V contains a **natural undercover resort / hotel pool / coastal surveillance sequence** in Indonesia.

Possible location families:

- upscale coastal hotel
- private resort
- beach club
- pool deck attached to a serviced villa
- seaside property used by a broker contact
- luxury hotel with public leisure space and controlled service corridors

The final place must be selected because evidence from Phase IV leads there. It cannot be a random tourist detour.

Indonesia offers a plausible environment for this kind of location, but the scene must avoid generic postcard tourism. It remains noir surveillance under bright leisure camouflage.

### Story justification

- a broker, courier, buyer or protected intermediary uses a resort/hotel location
- the team must blend into the guest population
- formal police clothing would expose surveillance
- North, Cheryl and Maya use tourist cover near the pool or beach
- reclining, sunbathing, swimming or casual movement functions as cover while each watches a different access route
- Benedict uses a separate plausible guest role or observation position
- Farid may support remotely
- the target or attacker begins watching the team back
- the setting creates a false calm before threat escalation

### Bikini scene Canon

North, Cheryl and Maya wear different bikini styles matching their bodies and personalities.

This scene is intentionally sexy and visually memorable, but must remain:

- story-integrated
- adult
- physically believable
- commercially realistic
- character-specific
- consistent with surveillance
- free of accidental harem coding
- free of romance between Maya and Benedict
- free of romance between North and Farid
- respectful of Cheryl’s controlled feelings for Benedict
- cinematic without becoming a disconnected pin-up gallery

#### Maya

- most voluptuous
- elegant and strongest visual impact
- luxury, confident bikini construction
- proper support and realistic fit
- may use a rich, sophisticated color family
- posture remains composed and authoritative

#### Cheryl

- athletic-curvy
- second most voluptuous
- sporty tomboy edge
- assertive, movement-ready bikini
- strong shoulders and toned waist remain visible
- confidence is more important than coy posing

#### North

- lean-fit
- minimalist and functional
- sleek clean lines
- easiest believable movement during surveillance
- visually sexy through health, precision and self-possession
- remains alert rather than decorative

### Camera and presentation rules

- establish the three looks clearly enough that the visual payoff is real
- do not use identical poses
- do not use impossible anatomy
- do not exaggerate Maya until she stops looking human
- do not inflate Cheryl until her athletic identity disappears
- do not make North underweight
- use natural surveillance behavior: adjusting sunglasses, checking reflections, tracking service exits, listening through concealed comms, turning on a lounger to maintain line of sight
- do not center the entire phase on Benedict reacting to their bodies
- restrained character banter is allowed
- no juvenile embarrassment routine
- no voyeuristic hidden-camera framing unless it is narratively the antagonist’s surveillance and clearly treated as threatening evidence
- mobile framing must preserve faces, identity and body distinction

### Threat progression inside Phase V

Recommended rhythm:

1. **Arrival / Cover**
   - establish location and surveillance purpose
   - show three distinct swimwear looks naturally
   - assign observation zones
2. **False Calm**
   - operation appears controlled
   - character interaction offers breathing room
   - player receives visual variety after lab-heavy phases
3. **Anomaly**
   - repeated watcher
   - altered guest wristband
   - suspicious staff route
   - unauthorized device handshake
   - swapped drink, towel, locker key or access token
4. **North singled out**
   - evidence shows attention is concentrated on North
   - attacker is interested in the analyst, not the whole team
5. **Attempt / near-attempt**
   - method must be selected in the Phase V blueprint
   - North detects or survives part of it through intelligence and action
   - Maya and Cheryl contribute professionally
   - Benedict connects method to human intention
6. **Cliff into Phase VI**
   - team realizes the attacker needs a record of North’s removal
   - North proposes or consents to turning that expectation into a controlled false success

### Candidate attack mechanisms

Not locked until blueprint approval:

- controlled traffic collision after leaving resort
- hotel service-corridor extraction attempt
- tampered access wristband routing North into a restricted zone
- poisoned or sedated device/drink handoff
- manipulated pool-safety event staged as accident
- compromised locker or wearable producing false location telemetry
- room intrusion tied to her laptop or source-build correlation

Avoid cartoon assassin behavior, implausible underwater melodrama or random violence with no evidentiary return.

### Phase V evidence candidates

- Attack Telemetry
- Decoy Credential Probe
- Cleanup Authority Echo
- Resort Access Manipulation Record
- Watcher Device Handshake
- Altered Guest Credential

Only include evidence that advances the case.

### Phase V asset plan requirement

Before generating Phase V assets, produce an approved asset blueprint specifying:

- exact location
- time of day
- story function of each background
- whether pool and beach are one location or separate
- exact North/Cheryl/Maya bikini designs
- approved body proportions and identity references
- required expression list
- dialogue portrait versus full-body requirements
- any Benedict/Maya/Cheryl/North cover props
- evidence imagery
- ambience, music and one-shot cues
- mobile crop tests
- file names and GitHub-relative paths

Do not create three large character sets before the scene structure and UI usage are known.

## Phase VI — THE FALSE SUCCESS

Counter-operation:

- attacker believes North removed
- hidden live channel preserved
- Farid maintains decoy telemetry
- Cheryl and Maya control legal perimeter
- North consents and designs deception
- Benedict does not decide over her body
- official or observable record may say North is missing, gravely injured or dead
- North secretly remains alive and operational

Choices affect:

- North trust
- Cheryl trust
- evidence integrity
- future protection strength

The resort/pool attack from Phase V must provide the believable trigger and telemetry for this counter-operation.

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
4. Deployment Condition Echo
5. Attack Telemetry
6. Decoy Credential Probe
7. Cleanup Authority Echo
8. Registrar Reference `R.`
9. Bangkok Watcher Deployment Echo

The resort access or watcher record may replace rather than expand this set if it performs the same proof function.

## Chapter IV minigames

1. Packet Provenance Reconstruction
2. Authorship / Deployment Matrix
3. Decoy Telemetry Control
4. Relay Authorization Preservation

A small surveillance mechanic may be added to Phase V only if mechanically distinct and useful. Do not add a shallow “spot the suspect” puzzle merely because the location is visual.

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
4. Daniel’s Handoff
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

Elena remains controlled and philosophical, not a cartoon villain.

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

Historical truth is fixed even when player’s legal package is incomplete.

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
- Cheryl remains significant ally with dignified emotional resolution

## Ending 2 — RIGHT NAME, NO CASE

- team knows truth
- conviction fails
- Elena walks or disappears
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
- North framed or discredited
- evidence chain destroyed
- institution accepts false chronology
- final image echoes Room 1807

Darkest ending.

## Fairness

- no ending changes historical murderer
- Adrian never becomes mastermind
- Arman never becomes decision owner
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
- Phase V must strengthen partnership through operational trust, not romantic jealousy

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
- use the bikini scene as a cheap jealousy sketch

A brief reaction or dry exchange in Phase V is allowed if it remains mature and subordinate to surveillance.

## Maya and Benedict

- professional chemistry only
- no romance
- no harem structure
- Maya may notice Cheryl’s feelings and remain outside them
- Maya’s stronger curves do not create romantic Canon

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

- takeoff ambience fades before route card/next scene
- no lingering airplane sound
- airport ambience subdued
- lab ambience subdued
- music and ambience duck under dialogue
- Farid remote dialogue does not create extra ambience owner
- Return to Title stops Phase II media

## Phase III

- phase-local audio elements
- reuse verification source if suitable
- separate media IDs
- stop Phase II audio on entry
- no alarm
- no villain sting
- no new global manager
- no observer/polling audio repair

## Phase IV

Select audio after blueprint. Likely requires new location-specific ambience only if existing Jakarta material does not fit physical encounter.

## Phase V resort/pool surveillance

Audio must sell a credible public leisure space while preserving noir tension.

Possible layers:

- restrained pool or beach ambience
- distant guests
- water movement
- soft hotel service activity
- subtle coastal wind where appropriate
- hidden low-tension score
- comms cue
- watcher/anomaly cue
- attack or interruption one-shot
- transition into false-success planning

Rules:

- no tropical vacation montage music
- no comedy “sexy reveal” sting
- no nightclub cliché unless location specifically requires it
- dialogue remains dominant
- ambience must not loop with obvious seams
- music should gradually turn the leisure setting into a threat space
- do not use villain music for Elena
- evidence and puzzle cues remain distinct

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

### Phase V background variation

The resort/pool/coastal location may be brighter than previous scenes, but must remain part of the same visual universe.

- sunlight and leisure color are allowed
- maintain heavy-ink graphic-novel identity
- preserve mobile readability
- use long shadows, reflective glass, service corridors, surveillance sightlines and controlled composition to retain crime tone
- no generic travel-ad image
- no embedded fake hotel signage
- exact text or no text
- location must support the actual attack and surveillance blocking

## Portrait compositing

- actual game crop matters
- black background pure black where specified
- dark clothing readable
- hair silhouette readable
- do not add colored portrait backgrounds without approval
- do not globally alter working characters
- use Benedict/North visual weight as proportion reference
- Phase V swimwear assets require separate crop validation because more torso may be visible
- do not solve full-body requirements by shrinking faces into unreadable portraits

---

# 27. EVIDENCE AND MINIGAME STANDARD

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
- approximately 30–60 seconds
- Reset-capable
- no softlock
- no permanent fail
- wrong answer teaches logic
- success cue separate from evidence cue
- derived from collected evidence
- mechanically distinct from adjacent puzzle

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

## Phase V visual QA

- North, Cheryl and Maya identities remain stable
- body differences match Canon
- anatomy and hands remain correct
- swimwear looks commercially real
- no accidental transparency
- no clipping through bodies or furniture
- pool/beach reflections and shadows coherent
- posture physically plausible
- all three remain readable on mobile
- scene remains surveillance-first
- camera does not reduce faces to tiny details
- no pseudo-text in resort assets
- attack blocking makes spatial sense

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
- do not clean accepted runtime without scoped reason
- do not clear Site Data by default because it may erase saves
- Phase III files do not exist yet
- Phase IV asset requirements are not locked until its blueprint is approved
- Phase V location, exact attack method, bikini colors and asset list are not yet locked
- owner-confirmed body hierarchy and scene purpose are locked

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

## Planning addendum 2026-07-30 19:22 ICT

Owner-confirmed future Canon added:

- Chapter IV locked to eight phases
- decision owner recognizes North as a threat
- plan to eliminate North escalates in Chapter IV
- Phase V uses an undercover Indonesian resort/hotel pool/coastal setting
- North, Cheryl and Maya wear distinct bikini styles as natural tourist cover
- Maya is most voluptuous
- Cheryl is athletic-curvy and slightly less voluptuous than Maya
- North is lean-fit
- scene remains investigative and transitions into North’s attack and Phase VI false success
- Phase III can reuse current assets
- first expected missing custom asset package begins with Phase IV
- Phase V assets require a dedicated approved blueprint

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
- overwrite approved professional portraits with Phase V swimwear art
- use one character’s bikini asset as a reskin template for another

## Proof regression

Do not equate:

- Jakarta = Arman
- Arman = PALIMPSEST from hood
- Adrian = mastermind
- 18-07 = person
- valid credential = Elena
- witness statement = complete legal case
- resort watcher = decision owner without corroboration
- attack on North = direct proof of Elena before evidence earns it

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
> Preserve final accepted Maya assets.  
> Phase III currently reuses approved Jakarta lab, portraits and audio unless inspection proves otherwise.  
> First expected new custom asset package begins with Phase IV after blueprint approval.  
> Chapter IV has eight phases.  
> Phase V contains an undercover resort/pool/coastal surveillance sequence with North, Cheryl and Maya in distinct character-specific bikinis.  
> Maya is most voluptuous, Cheryl athletic-curvy and slightly less voluptuous, North lean-fit.  
> The scene must naturally support surveillance and the attempt to eliminate North.  
> Start by auditing current Phase II handoff and the approved/proposed Phase III blueprint.  
> Work efficiently. Patch the smallest scope.

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
- Chapter IV มีทั้งหมด 8 Phase
- Phase I AFTERIMAGE ผ่านแล้ว
- Phase II JAKARTA ARRIVAL ผ่านแล้ว
- Phase III PACKET PROVENANCE คืองานถัดไป
- Phase IV THE MAN BEHIND THE ALIAS เป็นจุดเผยตัวจริงของ Arman
- Phase V NORTH IS MARKED มีฉากแฝงตัวสืบสวนที่โรงแรม/รีสอร์ต/สระว่ายน้ำหรือสถานที่ริมทะเลในอินโดนีเซีย
- North, Cheryl และ Maya ใช้ภาพลักษณ์นักท่องเที่ยวและใส่บิกินี่คนละสไตล์อย่างเป็นธรรมชาติ
- Maya หุ่นสะบึมและเอ็กซ์ที่สุด
- Cheryl เป็น athletic-curvy ห้าวแบบ tomboy และสะบึมน้อยกว่า Maya เล็กน้อย
- North ลีนที่สุดแต่เป็นหุ่นคนดูแลสุขภาพดี
- ฉากนี้เป็นส่วนของภารกิจ Surveillance ไม่ใช่ Fan Service ที่ลอยจากเนื้อเรื่อง
- ช่วงนี้คนร้ายรู้แล้วว่า North เป็นภัยและเริ่มวางแผนกำจัด
- Phase V ต้องนำไปสู่ Phase VI THE FALSE SUCCESS ซึ่งทำให้คนร้ายเชื่อว่า North ถูกกำจัดแล้ว
- ห้ามทำ North เป็นเหยื่อ passive
- ห้ามทำฉากเป็นฮาเร็ม
- Maya ไม่มี romance กับ Benedict
- ภาพและเสียงถึง Phase II อยู่ใน GitHub แล้ว
- Phase III ตาม Blueprint ปัจจุบันใช้ฉาก Verification Lab และเสียงเดิมได้ ไม่ต้องขอ Asset ใหม่
- ชุด Asset ใหม่ที่คาดว่าจะต้องขอเริ่มที่ Phase IV หลัง Blueprint ผ่าน
- Phase V ต้องทำ Asset Blueprint แยกก่อนสร้างภาพบิกินี่ ฉากรีสอร์ต และเสียง

สถานะ Phase II
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

งานแรกของห้องใหม่
1. สรุปผลการตรวจ GitHub ล่าสุดแบบสั้นแต่ชัด
2. ตรวจจุดส่งต่อจาก Phase II
3. ใช้ Blueprint ของ CHAPTER IV PHASE III — PACKET PROVENANCE ที่บันทึกใน Master Plan
4. ห้ามสร้าง Asset หรือเขียนโค้ดจน Blueprint ได้รับอนุมัติ
5. Phase III ต้องนำไปสู่ THE MAN BEHIND THE ALIAS โดยยังไม่เรียก Arman ว่า Mastermind หรือ Killer
6. North นำ Technical Analysis
7. Benedict ยังเป็นผู้ตัดสินใจและอ่านพฤติกรรมมนุษย์
8. Maya และ Cheryl รักษาเขตอำนาจกับหลักฐาน
9. Farid สนับสนุนระยะไกลจาก Singapore

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
- Character Journal gate
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
- visual/body Canon
- significant costume or undercover-scene Canon
- North threat/false-success operation

Before replacing:

1. fetch latest file
2. preserve Canon
3. preserve unresolved mysteries
4. preserve owner secrets
5. preserve workflow
6. preserve technical ownership
7. record owner result
8. keep exact filename
9. record base blob SHA
10. include SHA-256 of delivered local file

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
- Elena decides North must be removed because she threatens attribution secrecy
- fixed historical truth
- four major ending architecture
- Benedict chooses no permanent romantic partner
- Chapter IV has eight phases
- Phase V contains undercover resort/pool/coastal surveillance
- Maya most voluptuous
- Cheryl athletic-curvy and slightly less voluptuous
- North lean-fit
- Phase V attack enables Phase VI false-success operation

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
- exact form of future attack on North
- exact resort contact and location

---

# 36. OWNER-CONFIRMED CHAPTER IV VISUAL-STORY ADDENDUM

This section has authority over older planning text that omits or contradicts it.

## Locked facts

1. Chapter IV contains exactly eight phases.
2. North becomes a direct threat to the murderer/decision owner because her technical analysis reaches the attribution layer.
3. The adversary plans to eliminate North during Chapter IV.
4. Phase V is the natural placement for the sexy undercover sequence.
5. The scene takes place at an Indonesian hotel, resort, pool, beach club or coastal property selected by evidence from Phase IV.
6. North, Cheryl and Maya use tourist cover and wear distinct bikinis.
7. Maya is the most voluptuous and overtly sexy.
8. Cheryl is athletic-curvy, tomboyish and nearly as voluptuous as Maya, but slightly less full-figured.
9. North is the leanest, with a healthy, fit and agile body.
10. The scene must preserve each woman’s identity and professional competence.
11. The scene must serve surveillance, threat escalation and the attempted elimination of North.
12. It must lead into Phase VI, where the team makes the attacker believe North has been successfully removed.
13. It is not optional disposable fan service.
14. It is not a romance route.
15. It must be planned with realistic anatomy, real swimwear construction and mobile-safe composition.

## Asset timing lock

- Assets already used through owner-accepted Phase II are stored in GitHub and do not need to be resent merely because an old chat is deleted.
- Phase III currently requires no new custom images or audio under the proposed blueprint.
- The first likely new custom asset request begins with Phase IV after the Phase IV blueprint is approved.
- Phase V requires a dedicated asset blueprint before the owner is asked to provide or approve:
  - resort/pool/coastal backgrounds
  - North bikini design
  - Cheryl bikini design
  - Maya bikini design
  - full-body or dialogue portraits
  - expressions
  - props
  - evidence images
  - ambience and score
- Do not request all previous images and sounds again.
- Inspect GitHub paths before asking the owner to resend anything.

---

# END OF MASTER PLAN

Do not replace this file without preserving:

- Build 0.14.7 owner pass
- Chapter IV Phase I-II accepted state
- Maya final Phase II visual lock
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
- Phase III proposed blueprint and implementation boundary
- Elena secret
- Adrian/Arman boundaries
- Kawin/Rinrada forward Canon
- Benedict/Cheryl/North ending Canon
- Chapter IV-VII plan
- Alternate Ending architecture
- Chapter IV eight-phase lock
- North elimination threat
- Phase V resort/pool/coastal undercover scene
- North/Cheryl/Maya body and bikini differentiation
- Phase V to Phase VI false-success continuity
- asset timing and no-resend rule
- new-chat zero-explanation handoff
- intelligent, minimal, time-efficient working discipline
