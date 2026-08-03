# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-08-03 17:49 ICT
>
> **Replaces planning blob:** `09cd4628ccb7fbf9eba8095f5c1cb68a8b18e976`
>
> **Repository:** `grolygori789-crypto/last-witness`
>
> **Production and Default branch:** `production-rebuild`
>
> **Current stable Runtime baseline commit:** `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
>
> **Baseline commit message:** `Fix Phase IV minigame centering`
>
> **Current Runtime repair build:** `0.17.18`
>
> **Base Chapter IV Phase IV story module:** `0.17.0`
>
> **Current playable boundary:** `CHAPTER IV · PHASE IV CURRENT IMPLEMENTATION`
>
> **Owner-device result:** `CURRENT INSPECTED SCOPE PASSED OWNER CHECK · KNOWN REPORTED DEFECTS CLOSED`
>
> **Formal freeze status:** `OWNER-APPROVED CURRENT BASELINE · COMPLETED-SCOPE MAINTENANCE LOCK · FUTURE VERIFIED BUGS MAY REOPEN SCOPED WORK`
>
> **Current route:** `CHAPTER IV · PHASE III -> DIRECT HANDOFF -> CHAPTER IV · PHASE IV`
>
> **Next production objective:** `CHAPTER IV · PHASE V · NORTH IS MARKED`
>
> **Document status:** `CURRENT OWNER-APPROVED RUNTIME BASELINE · FORWARD DEVELOPMENT LOCK · CHAPTER IV PHASE IV NO-REGRESSION`
>
> This revision preserves all locked Canon and the complete historical record from the preceding Master Plan, then promotes Runtime build `0.17.18` as the current owner-approved baseline. It records the accepted Character Added and unread-dot contract, Dialogue History and Case File scrolling, standardized phase-action geometry, the Forensic bottom-stack correction, Chapter III Phase VIII Secure Mirror containment and Chapter IV Phase IV minigame centring.
>
> The owner has confirmed that the currently inspected scope is now satisfactory and that all presently reported defects have passed the latest real-device check. Future production work therefore moves forward to Chapter IV Phase V. Completed Chapters and accepted systems are not to be reopened for elective polish, cleanup or redesign. A completed area may be revisited only for a reproducible bug, blocked continuation, data loss, critical accessibility or compatibility failure, or another owner-approved necessity.
>
> This status is not a permanent claim that no undiscovered defect can exist. A later verified defect may reopen only the smallest proven owner and must preserve this no-regression baseline. Earlier commit `8a70778dffbdea65c7ba37954673be11b547f3b2` remains the historical Arman Journal baseline, and `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f` remains the historical frozen baseline through Chapter IV Phase III.

---

# 0. EXECUTIVE ZERO-EXPLANATION HANDOFF

## Project identity

- Game: **LAST WITNESS**
- Studio: **BENEDICT INTERACTIVE**
- Platform: mobile-first browser game
- Primary test platform: Android Chrome
- Orientation: portrait 9:16
- Genre: Narrative Detective Adventure / Interactive Crime Investigation
- Art direction: neo-noir graphic novel, cel-shaded, heavy ink, angular shadows, cinematic crime-adventure, readable on mobile
- Repository: `grolygori789-crypto/last-witness`
- Branch: `production-rebuild`

## Current approved and owner-confirmed scope

1. Chapter I complete
2. Chapter II complete
3. Chapter III complete
4. Chapter IV Phase I complete
5. Chapter IV Phase II complete
6. Chapter IV Phase III complete
7. Chapter IV Phase IV current implementation complete for the present production boundary and owner-approved on the currently inspected routes
8. Arman Character Journal contract owner-approved
9. Character Added notification and unread red-dot timing owner-approved for the currently implemented discovery routes, including Adrian and Arman
10. Dialogue History and Case File mobile scrolling owner-approved
11. Free-standing phase/review action buttons standardized and centred through Chapter IV Phase IV
12. Chapter II Forensic `CHAIN OF CUSTODY` label and action-button stack corrected
13. Chapter III Phase VIII Secure Mirror Access and Console cards centred and contained
14. Chapter IV Phase IV Cache Review, Persona Triangulation, result and disposition cards centred; mobile header controls remain fully visible

Current stable baseline:

- Commit: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- Message: `Fix Phase IV minigame centering`
- Build: `0.17.18`

Current implementation boundary:

- `CHAPTER IV · PHASE IV · THE MAN BEHIND THE ALIAS`

Next target:

- `CHAPTER IV · PHASE V · NORTH IS MARKED`

## Forward-development policy

- The default production action is now to build the next Chapter/Phase.
- Do not return to owner-approved Chapters I–IV for optional polish, broad refactoring, architecture cleanup or visual redesign.
- Reopen completed scope only for a reproducible defect, blocked story continuation, data loss, serious compatibility/accessibility failure or explicit owner-approved necessity.
- Any repair must target the smallest proven owner and preserve all accepted behavior outside that scope.
- A newly discovered defect does not invalidate the whole baseline; it opens only a scoped maintenance task.

## Approval wording lock

The following statements are allowed:

- `CURRENT OWNER-APPROVED RUNTIME BASELINE`
- `CURRENT INSPECTED SCOPE PASSED OWNER CHECK`
- `KNOWN REPORTED DEFECTS CLOSED FOR THE CURRENT INSPECTED SCOPE`
- `COMPLETED-SCOPE MAINTENANCE LOCK`
- `PHASE IV CURRENT IMPLEMENTATION IS THE NO-REGRESSION BASELINE`
- `FORWARD DEVELOPMENT TARGET: CHAPTER IV PHASE V`

Do not describe the game as permanently bug-free. Do not silently expand the owner approval beyond the routes and behavior actually inspected. A later verified defect may reopen only its proven scope.

## Absolute workflow rule

Before any future code change:

1. read this document from beginning to end
2. fetch the latest Production commit
3. inspect `index.html`
4. inspect static and dynamic load order
5. inspect the latest SHAs of every affected file
6. inspect State, Save/Load, Character Journal, Case File, Audio and Developer Mode owners
7. identify the smallest true implementation owner
8. avoid global wrappers, polling or document-wide observers unless unavoidable and proven
9. test from Title and Chapter I, not only from an isolated harness
10. deliver locally unless the owner explicitly authorizes a GitHub write in the current turn

Do not:

- restore another commit without explicit instruction
- move branch references
- create, delete, merge or rebase branches without explicit instruction
- alter GitHub Pages
- replace owner-approved assets casually
- rewrite Character Journal gates globally to repair one late character
- add global MutationObservers or polling loops as a shortcut
- treat a documentation commit as a Runtime build
- claim Android or live Pages testing unless actually performed
- write to GitHub without exact current-turn authorization

Normal delivery remains local. The owner uploads Production files personally.

## Completed-scope maintenance gate

Before modifying an owner-approved Chapter or shared system, prove at least one of the following:

1. a reproducible Runtime defect exists
2. the next Chapter cannot integrate safely without the change
3. Save/Load, progression, evidence, character discovery, audio or device compatibility is materially at risk
4. the owner explicitly authorizes an essential revision

A preference, cleanup opportunity or hypothetical future benefit is not enough. Preserve the current baseline and move forward by default.

## Core investigative principle

> **A valid credential proves access, not identity.**

Always separate:

1. physical event
2. record claim
3. accepted credential, role or permission
4. device or timestamp claim
5. network route
6. physical operator
7. tool author
8. adapter or broker
9. deployer
10. person who selected victim, room and timing
11. Decision Owner

No single layer may be collapsed into another without corroboration.

## Core ending principle

> **Historical truth is fixed. Legal truth, public truth and institutional truth depend on what survives and what can be proved.**

- Elena is always the real mastermind and killer.
- Other characters may be guilty of real offences without owning the murders.
- Wrong conviction must rest on a coherent alternative case against a genuinely culpable person.
- No single dialogue choice determines an ending.
- Evidence survival, custody, role separation, witness survival, consent, trust, admissibility, final accusation and institutional acceptance accumulate across chapters.

---

# 1. SOURCE OF TRUTH AND WORKFLOW

## Source hierarchy

1. Owner’s latest real-device result
2. Current Production Runtime on `production-rebuild`
3. Latest `GAME_MASTER_PLAN.md`
4. Older handoff files and historical plans
5. Assistant memory

When sources conflict:

- owner-tested behavior wins over stale documentation
- current Runtime wins over older implementation notes
- locked Canon wins over a Runtime defect
- do not rewrite Canon to justify broken behavior
- identify which source is stale
- ask only when evidence cannot resolve the conflict

## Required pre-implementation audit

Before implementation or repair:

1. read this file completely
2. confirm branch and latest commit
3. inspect `index.html`
4. inspect static script order
5. inspect dynamic bootstrap order
6. inspect State initialization and migrations
7. inspect Auto Save, manual Save and restore
8. inspect audio ownership and phase exit cleanup
9. inspect Character Journal gates and persistence
10. inspect Case File ownership
11. inspect Developer Mode and phase jumps
12. inspect the exact scene module involved
13. compare against earlier accepted Chapter and Phase behavior
14. change the fewest files possible
15. run syntax and static checks
16. run a full assembled Runtime smoke flow from Title
17. test clean State, stale State and Developer State
18. state untested limits honestly
19. deliver a local package or document

## Planning-document delivery

- exact filename: `GAME_MASTER_PLAN.md`
- preserve owner secrets
- preserve existing Canon unless explicitly revised
- distinguish implemented, owner-approved, stable, frozen, planned and unresolved
- include the replaced blob SHA
- include local SHA-256
- do not claim Runtime testing for a documentation-only update

---

# 2. CURRENT VERIFIED PRODUCTION SNAPSHOT

## Repository state

- Repository: `grolygori789-crypto/last-witness`
- Production branch: `production-rebuild`
- Default branch: `production-rebuild`
- Current stable Runtime commit: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- Commit message: `Fix Phase IV minigame centering`
- Current Runtime repair build: `0.17.18`
- Historical Arman Journal baseline: `8a70778dffbdea65c7ba37954673be11b547f3b2`
- Historical frozen Phase III baseline: `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
- Historical Phase II baseline: `ffdc94777c5fbaefdc281f1148b59aff3adf8abe`

## Current build chain

- Chapter IV Phase I: `0.13.2`
- Chapter IV Phase II: `0.14.9`
- Phase II portrait guard: `0.15.0`
- Thai localization layer: `0.15.2`
- targeted QC: `0.15.3`
- police portrait alignment: `0.15.4`
- Chapter IV Phase III: `0.16.3`
- base Chapter IV Phase IV story module: `0.17.0`
- Phase III direct handoff: `0.17.0-d2`
- Developer Phase Navigation: `0.17.0-d2`
- full-game Runtime recovery layer: `0.17.6`
- Arman Character Journal contract repair: `0.17.7`
- scoped Character notification contract: `0.17.14`
- Dialogue History and Case File Modal Scroll UX: `0.17.15`
- free-standing Phase Action Standard and Forensic bottom stack: `0.17.16`
- Chapter III Phase VIII Secure Mirror modal containment: `0.17.17`
- Chapter IV Phase IV minigame containment and cache-header fit: `0.17.18`
- compatibility/bootstrap build: `0.17.18`

## Owner-confirmed current behavior

The owner has confirmed that all defects presently identified during the latest inspection have passed on the real device and that the current production state is satisfactory enough to move forward.

Confirmed latest behavior includes:

- game remains playable through the current implemented route
- Chapter I does not expose Character Journal
- Chapter II Character Journal follows the North-introduction gate
- Arman is added after the correct verified introduction point
- Adrian and Arman Character Added notifications appear at the accepted story timing
- unread red dots appear at the accepted timing and do not appear prematurely on the inspected Developer routes
- opening the relevant Character Journal clears unread state and persistence remains intact
- Dialogue History remains chronological, opens at the latest entry and provides `Latest` navigation
- Case File scrolling preserves the accepted reading behavior without forced bottom jumps
- free-standing phase/review buttons use a consistent centred width through the current implementation
- Chapter II Forensic `CHAIN OF CUSTODY` remains visible above `COMPARE RECORDS`
- Chapter III Phase VIII Secure Mirror cards remain fully inside the viewport and centred
- Chapter IV Phase IV Cache Review, Persona Triangulation, result and disposition cards remain centred
- the Chapter IV Phase IV cache header displays its review control completely on mobile
- no regression was reported in the currently inspected surrounding gameplay systems

No active blocker is recorded at this revision. A later reproducible defect may be added as a scoped maintenance item without discarding this baseline.

## Current stable endpoint

> `CHAPTER IV · PHASE IV CURRENT IMPLEMENTATION`

Next:

> `CHAPTER IV · PHASE V · NORTH IS MARKED`

## Approval and maintenance boundary

The current Runtime is the no-regression starting point for all future work. Chapter IV Phase V development must preserve Chapters I–III, Chapter IV Phase I–IV, Character discovery timing, unread behavior, Dialogue History, Case File, action-button geometry, minigame containment, Developer entry, Save/Load, evidence, audio and accepted presentation.

Completed scope is maintenance-locked. It may be reopened only for a proven defect or another essential owner-approved reason. This is an operational forward-development lock, not a claim that undiscovered bugs are impossible.

# 3. LOAD ORDER AND RUNTIME OWNERSHIP

## Static CSS

1. `css/style.css`
2. `css/forensic-phase.css`
3. `css/medical-examiner.css`
4. `css/investigation-lifecycle.css?v=0711`
5. `css/fullscreen-display.css?v=0802`
6. `css/chapter-03-phase-04.css?v=0930`

## Static JavaScript chain

Order-sensitive:

1. Runtime data
2. Audio and Save
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

Do not reorder without a full assembled-Runtime audit.

## Dynamic Chapter III order

1. `js/chapters/chapter-03/01-title-phase1.js`
2. `js/chapters/chapter-03/02-changi-airport.js`
3. `js/chapters/chapter-03/03-singapore-office.js`
4. `js/chapters/chapter-03/04-marina-bay.js`
5. `js/chapters/chapter-03/05-serviced-apartment.js`
6. `js/chapters/chapter-03/06-hawker-centre.js`
7. `js/chapters/chapter-03/07-digital-forensics-lab.js`
8. `js/chapters/chapter-03/08-callback.js`

## Current Chapter IV bootstrap 0.17.18

`js/engine/09-defect-hotfix.js` loads in this order:

1. `js/engine/15-thai-localization.js?v=0152`
2. `js/engine/16-targeted-qc-fixes.js?v=0153`
3. `js/engine/17-police-portrait-alignment.js?v=0154`
4. `js/engine/20-character-journal-story-gate.js?v=0177`
5. `js/engine/21-character-notification-contract.js?v=01714`
6. `js/engine/22-modal-scroll-experience.js?v=01715`
7. `js/chapters/chapter-04/01-afterimage.js?v=0132`
8. `css/chapter-04-phase-02.css?v=0149`
9. `js/chapters/chapter-04/02a-jakarta-portrait-guard.js?v=0150`
10. `js/chapters/chapter-04/02-jakarta-arrival.js?v=0164`
11. `css/chapter-04-phase-03.css?v=0163`
12. `js/chapters/chapter-04/03-packet-provenance.js?v=0163d2`
13. `css/chapter-04-phase-04.css?v=0170`
14. `js/chapters/chapter-04/04-arman-encounter.js?v=0170`
15. `css/chapter-04-phase-04-revision.css?v=0176`
16. `js/chapters/chapter-04/04a-arman-encounter-revision.js?v=0177`
17. `js/engine/19-ch4-phase3-direct-handoff.js?v=0170d2`
18. `js/engine/18-developer-phase-navigation.js?v=0170d2`
19. `css/phase-action-standard.css?v=01718`

The final stylesheet is intentionally late-loaded and owns only the accepted scoped geometry contracts. It must not become a general-purpose global override.

## Ownership rule

- `04-arman-encounter.js` owns Phase IV story, evidence, choices, state, ending-profile effects and Phase V lead.
- `04a-arman-encounter-revision.js` owns accepted Phase IV presentation repair and the scoped Arman Journal extension.
- `20-character-journal-story-gate.js` owns safe early-story visibility protection and compatibility with the current late-character flow.
- `21-character-notification-contract.js` owns the scoped Somchai/Kittisak and Adrian notification timing repairs, including the Hawker pre-verification visual gate and silent Developer behavior.
- `22-modal-scroll-experience.js` owns only Dialogue History and Case File presentation/scroll behavior; it does not own game State or content data.
- `06-content-registry-dev.js` remains the authoritative base Journal, Case File and Dev registry for existing characters.
- `phase-action-standard.css` owns free-standing scene-action geometry, the Chapter II Forensic bottom stack, Chapter III Phase VIII Secure Mirror containment and Chapter IV Phase IV minigame containment/header fit.
- `09-defect-hotfix.js` owns deterministic dynamic load order only.
- `18-developer-phase-navigation.js` owns Developer phase jumps.
- `19-ch4-phase3-direct-handoff.js` owns the Phase III-to-IV direct route.

## Future-module safety lock

A future module must be side-effect-free at definition and preload.

Loading a late module must not:

- alter the active chapter merely because the script loaded
- expose Character Journal in Chapter I
- unlock a future character
- show a Character Added notification
- change current screen
- overwrite restored state
- silently mark unread content as read
- mutate another phase’s audio or progress

Initialization occurs only on a true story transition, valid restore, completed-state bridge or intentional Developer jump.

---

# 4. STATE, SAVE AND ENDING PROFILE

## Existing shared state

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

## Existing cross-chapter ending profile

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
  armanStatus: "unresolved",
  roleSeparation: 0,
  bangkokChainIntegrity: 0,
  institutionalTrust: 0,
  corroborationBreadth: 0,
  alternativeHypothesesPreserved: 0,
  rinStatus: "unknown",
  localDeployerStatus: "unresolved",
  fieldOperatorStatus: "unresolved",
  finalAccused: "",
  finalCaseVersion: ""
};
```

Some fields were introduced by the Phase IV module. Cross-chapter use and ending resolution remain subject to future implementation and migration review.

## Phase IV base state

`state.chapter4.phase4` owns:

- `started`
- `approachComplete`
- `locationCardSeen`
- `stairwellComplete`
- `workshopIntroComplete`
- `triangulationStarted`
- `triangulationAssignments`
- `triangulationIndex`
- `triangulationAttempts`
- `triangulationComplete`
- `proxyExposed`
- `revealStarted`
- `revealComplete`
- `armanUnlocked`
- `dimasDisposition`
- `armanDisposition`
- `cacheDisposition`
- `northResponse`
- `choicesApplied`
- `evidenceCollected`
- `evidenceViewed`
- `activeCacheIndex`
- `cacheReviewComplete`
- `closingDialogueComplete`
- `complete`
- `stage`

## Phase IV Arman Journal state and current preservation

Build `0.17.7` introduced the accepted scoped state contract. Current build `0.17.18` preserves it through the `0.17.14` Character notification layer and the unchanged authoritative persistence owners:

The contract owns or preserves:

- `state.chapter4.phase4.armanJournalUnlocked`
- `state.chapter4.phase4.armanJournalUnread`
- `state.chapter4.phase4.armanJournalNotified`
- `state.flags.ch4_arman_identity_verified`
- `state.flags.ch4_arman_journal_unlocked`
- `state.flags.ch4_arman_journal_notified`

Shared arrays remain synchronized:

- `state.lwCharactersUnlocked`
- `state.lwCharactersUnread`

Registry persistence key remains:

- `lastWitness.contentRegistry.v3`

## Restore rule

Every phase owns:

- defaults
- migration
- checkpoint
- resume bridge
- active modal restoration
- dialogue restoration where supported
- audio restoration
- Developer jump
- completed-state restore

Arman-specific restore must preserve:

- card existence after unlock
- unread dot before first Journal open
- read state after Journal open
- no duplicate notification
- silent Dev unlock
- recovery from a 0.17.6 save where identity was verified but the card was missing

---

# 5. EVIDENCE PHILOSOPHY AND FAIRNESS

## Evidence classes

Every final theory must draw from multiple classes:

1. **Physical**
   - body
   - biological timing
   - scene movement
   - objects
   - location
2. **Digital**
   - signatures
   - logs
   - hashes
   - routes
   - device claims
3. **Procedural**
   - authority
   - custody
   - access scope
   - approval path
   - reporting sequence
4. **Human**
   - witness memory
   - statement
   - behavior
   - relationship
5. **Decision**
   - who selected victim
   - who selected room
   - who selected timing
   - who benefited from the final record

## Proof wording

Every evidence item should show:

- **Observation**
- **What it supports**
- **What it does not prove**

## Final accusation minimum

A valid final accusation requires:

- means
- opportunity or access
- motive
- conduct before or after the event
- at least three evidence classes
- no unexplained fatal contradiction

A wrong suspect may satisfy the minimum through a coherent but incomplete record. The game must show the missing truth.

## Retrospective fairness

Every major reveal must be supported by at least two earlier chapters.

No final reveal may depend on:

- a new fact introduced only during confrontation
- an untaught system rule
- confession replacing proof
- visual villain coding
- a single lucky guess

## Difficulty envelope

Use:

- one reasoning concept per minigame
- 3–5 choices per screen
- step-by-step reconstruction
- visible progress
- Reset
- no softlock
- no permanent fail
- wrong answers that teach one principle
- summaries that reduce memory burden

Avoid:

- dense 20–25 button matrices
- obscure jargon without context
- random codes detached from evidence
- punishment for a reasonable misunderstanding

---

# 6. CHARACTER CANON

## Benedict

- Age: 42
- independent detective and external investigative consultant
- protagonist and final human decision-maker
- psychologically sharp
- dry humour
- reads intention, hesitation, wording, restraint and timing
- does not accuse without evidence
- must not become a passenger while North solves everything
- no statutory police authority in foreign jurisdictions
- works through Kittisak in Bangkok, Cheryl in Singapore and Maya in Indonesia
- may care deeply for Cheryl but does not choose a permanent partner
- no North romance

## North

- Age: 32
- Singaporean
- IT Specialist and Technical Investigator
- Benedict’s trusted long-term partner
- leads technical analysis
- understands Authentication vs Attribution
- rejects unsupported attribution
- becomes an active target in Chapter IV
- never a passive victim
- must consent to false-success planning
- no romance with Farid
- partnership with Benedict is the emotional spine

## Elena Sutham

Public role:

- Senior Forensic Systems Analyst
- Meridian Evidence Systems, Bangkok
- accredited technical liaison
- calm, intelligent, useful and credible
- gives true information
- controls timing and sequence
- no police command authority
- must not appear omniscient

Owner secret:

- mastermind
- physical killer of Kawin and Daniel
- Decision Owner
- selected victim, room, timing and discovery sequence
- used legitimate Bangkok forensic access
- curated true evidence into a false chronology
- does not need to falsify science

Forbidden before earned reveal:

- suspicious smirk
- villain lighting
- villain music
- confession-like phrasing
- theatrical cruelty
- impossible knowledge
- fake scientific evidence

## Police Captain Kittisak Siriwat

- Full name: `Kittisak Siriwat`
- Thai: `กิตติศักดิ์ ศิริวัฒน์`
- Age: 40
- Rank: Police Captain / ร้อยตำรวจเอก
- Position: Investigation Inspector / สารวัตรฝ่ายสืบสวน
- commanding officer of Somchai
- Bangkok operational commander
- controls lawful tasking, warrants, internal reporting, witness protection and custody
- not obstructionist by default
- normal authority does not prove corruption

## Police Senior Sergeant Major Somchai Rattanakul

- Full name: `Somchai Rattanakul`
- Thai: `สมชาย รัตนกุล`
- Age: 48
- Rank: Police Senior Sergeant Major / ดาบตำรวจ
- senior field investigator
- subordinate to Kittisak
- cannot issue warrants or command Kittisak
- experienced, practical and observant
- anchors physical handoff continuity
- operational proximity does not prove command ownership

## Ratchata (Dr. Singh)

Display name exactly:

`Ratchata (Dr. Singh)`

- Full professional identity: Dr. Ratchata Singh
- Age: 43
- Thai Sikh
- Senior Medical Examiner
- dry humour
- independent and scientifically strict
- no police command authority
- not `R.`
- protects physical truth that digital chronology cannot rewrite

## Inspector Cheryl Goh

- Age: 40
- Singaporean Chinese
- Singapore Police liaison
- measured authority
- legally strict
- protects proof boundaries and cross-border admissibility
- respects North
- genuine long-term ally
- Farid’s operational senior in relevant scenes
- romance never overtakes the case

## Farid Rahman

- Age: 31
- Singaporean Malay
- Digital Forensics Specialist
- fast, meticulous and technically serious
- preserves alternatives and raw mirrors
- no romance with North
- remains remote in Singapore during current Jakarta support

Remote labels:

- `Farid Rahman (Remote · Singapore)`
- `Farid Rahman (ต่อสายจากสิงคโปร์)`

## Adrian Tan Wei Ming

- Age: 45
- former Principal Systems Architect
- fugitive and complicit insider
- designed lawful reconciliation architecture
- concealed or delayed reporting of abuse
- may be guilty of enabling, concealment, obstruction and unlawful retention
- not mastermind
- strong false-conviction candidate
- never a coward or cartoon villain

## Arman Suryadi

- Age: 39
- Indonesian
- electronics systems consultant and silent co-owner behind Surya Elektronik
- PALIMPSEST wrapper specialist and broker
- intelligent, dangerous, tired and complicit
- used Dimas as a controlled proxy
- adapted wrapper, scrubbed metadata and protected anonymous handoff
- knew abuse was possible
- did not select Kawin, Daniel, Room 1807 or the eleven-minute events
- not mastermind
- not Decision Owner
- real identity appears in Chapter IV Phase IV
- current Character Journal entry is implemented through the scoped Phase IV extension

## Inspector Maya Pranoto

- Age: 37
- Indonesian
- Indonesian National Police Cybercrime Operations Liaison
- disciplined, practical and intelligent
- owns Indonesian local authority
- professional equal to Cheryl
- not obstructionist
- no romance with Benedict
- no love triangle
- Journal unlocks after formal introduction

## Dimas Wibowo

- Age: 34
- Indonesian
- electronics repair technician and workshop manager
- former apprentice and trusted associate of Arman
- controlled proxy and human witness
- informed enough to screen contact
- not stupid
- not a murderer
- no Character Journal card

## Daniel Voss

- Age at death: 38
- German
- Bangkok resident
- investigative journalist and regional compliance researcher
- second victim
- never returns alive
- continues only through material prepared before death

## Kawin Nopparat

- Age at death: 41
- Thai
- Regional Access Governance and Compliance Auditor
- Chapter I victim
- discovered 18-07 reuse
- planned to meet Rin
- killed by Elena
- identity revealed in Chapter V

## Rinrada “Rin” Sornchai

- Age: 37
- Thai
- former Identity and Access Registrar
- living witness implied by `R.`
- not related to Somchai Rattanakul
- witnessed limited pier facts, not the murder act
- living Last Witness
- introduced in Chapter V
- testimony requires corroboration

## Narin Theerachai

- Age: 41
- Thai
- Senior Continuity Deployment Engineer
- Bangkok Local Deployer
- real accomplice
- handled deployment and concealment
- did not select victims
- strongest non-Elena murder-suspect package
- future identity introduction requires earned verification

## Ika Prameswari

- Age: 34
- Indonesian
- private security and asset-recovery specialist
- Field Watcher / Recovery Operator
- attacks or attempts to remove North
- joined after the earlier murders
- cannot be Kawin or Daniel’s killer
- guilty of real violence and obstruction

---

# 7. BANGKOK INVESTIGATION UNIT · AUTHORITY LOCK

## Command hierarchy

1. Kittisak
   - Police Captain
   - Investigation Inspector
   - command authority
2. Somchai
   - Police Senior Sergeant Major
   - field investigator
   - reports to Kittisak
3. Elena
   - forensic advisory role
   - no police command authority
4. Ratchata
   - independent medical expert
   - no police command authority
5. Benedict
   - narrative Lead Investigator
   - civilian consultant
6. North
   - technical lead
   - civilian consultant

## Dialogue and scene lock

- Somchai addresses Kittisak as a superior.
- Kittisak assigns Somchai’s field work.
- Somchai may advise but cannot authorize institutional action.
- Elena may recommend forensic action but cannot order police.
- Ratchata may reject unsupported science but cannot command police.
- Benedict proposes strategy; Kittisak owns lawful Bangkok execution.
- No character crosses jurisdiction merely to accelerate plot.

## Two-person control after compromise

- no disputed package handled by one person alone
- digital evidence requires independent hash verification
- interpretation and custody approval remain separate
- Elena may analyse but may not be sole custodian
- Kittisak owns command approval
- Somchai transports only under logged instruction
- Ratchata’s medical chain remains separately sealed

---

# 8. CHAPTER III · BANGKOK COMPROMISE PROOF BOUNDARY

## Proven or supported

- dormant watcher entered North’s laptop through a signed forensic package
- package was accepted by the Bangkok Evidence Chain
- cleanup used a valid synchronization credential
- cleanup trigger came through the Bangkok Evidence Chain
- deployment occurred before the team left Bangkok
- adversary anticipated an investigative milestone
- Jakarta infrastructure and Bangkok deployment are separate
- a local deployment path existed inside or adjacent to authorized evidence workflow

## Not proven

- a police officer knowingly cooperated
- Kittisak used the credential
- Somchai used the credential
- Elena used the credential
- Ratchata used the credential
- credential owner was the operator
- Local Deployer selected victims
- Local Deployer was Decision Owner
- the whole Bangkok unit was corrupt

Mandatory interpretation:

> **The Bangkok investigation structure was compromised or used. This does not yet prove a knowing traitor inside the police unit.**

---

# 9. SUSPECT ARCHITECTURE AND FAIR-CLUE MATRIX

## Final-board requirement

By Chapter VII, at least four serious candidates remain:

1. Elena
2. Adrian
3. Arman
4. Narin, the Bangkok Local Deployer

Ika may appear as an operational candidate. Kittisak and Somchai may undergo temporary suspicion but cannot become final murder candidates from access or rank alone.

## Suspect parity rule

Every major suspect receives:

- at least three supporting clue types
- at least one meaningful exculpatory clue
- a real secret or offence
- plausible motive
- plausible opportunity theory
- a contradiction the player must resolve

## Elena

Supporting clues:

- legitimate signed-package access
- links to both victims
- slightly early knowledge
- influence over sequence
- physical presence near pier
- watcher milestone knowledge
- benefit from visible technical suspects

Counterweight:

- science is genuine
- access is legitimate
- no single log identifies her
- assistance produces real breakthroughs

Final truth:

- Decision Owner
- physical killer
- curator of official chronology

## Adrian

Real guilt:

- enabling architecture
- concealment
- delayed reporting
- flight
- retained protected material

Fatal gap:

- no proved local victim selection
- no physical murder path

## Arman

Real guilt:

- wrapper authorship
- brokerage
- metadata scrubbing
- proxy deception
- withholding records

Fatal gap:

- no proved Bangkok presence
- no victim-selection evidence
- no Decision Ownership

## Narin

Real guilt:

- unauthorized deployment
- evidence tampering
- concealment
- cleanup
- continued compliance after knowledge

Fatal gap:

- receives priorities rather than originates them
- no proof he selected or killed victims

## Ika

Real guilt:

- surveillance
- attempted abduction or murder
- evidence destruction
- obstruction

Fatal contradiction:

- recruitment and travel begin after both earlier murders

---

# 10. CHARACTER JOURNAL

## Universal discovery contract

For every implemented new story character:

1. character appears and completes the first meaningful introduction dialogue
2. identity or role reaches the required verification threshold
3. the character is added exactly once
4. one Character Added notification appears
5. one unread red dot appears
6. opening Character Journal clears the unread state
7. closing and reopening Journal preserves the card
8. Save/Load preserves unread or read state
9. repeat dialogue does not notify again
10. Developer Unlock is silent and does not create unread dots

## Chapter I gate

- Character mode hidden
- no Character Cards visible
- no red dot
- no Character Added toast
- Developer Unlock may prepare data but must not expose Character mode
- stale Chapter IV state must not override the active Chapter I screen

## Chapter II gate and order

Character mode first appears only after North’s first Chapter II office conversation is complete.

Order:

1. Benedict, initial entry
2. North after Chapter II office introduction
3. Elena after café introduction
4. Somchai and Kittisak after police introduction
5. Ratchata after medical introduction

## Chapter III order

- Cheryl after formal introduction
- Farid after formal introduction
- Adrian after identity verification
- no PALIMPSEST card
- no alias card

## Chapter IV order

- Maya after formal airport introduction
- Arman after real identity and first verified introduction dialogue complete
- no Dimas card
- no hood-feed card
- no duplicate costume cards
- Farid remains one entry while remote

## Arman 0.17.7 contract preserved in 0.17.18

The accepted `0.17.7` contract remains binding in the current `0.17.18` baseline. Arman is a scoped Chapter IV Character extension because the legacy base registry allow-list was created before Arman existed and could filter a new dynamic ID.

The accepted repair must:

- use the established Character card and Detail visual language
- add Arman after the first verified introduction dialogue completes
- display one notification only
- create one unread dot only
- preserve card and unread state through Save/Load
- clear only the correct unread state when Journal opens
- repair a prior save where identity was verified but the card was missing
- stay silent in Developer Unlock
- never expose Arman in Chapter I
- never create a second global Character manager

## Detail DOM contract

Every custom detail view must preserve:

- `[data-detail-shell]`
- `[data-detail-portrait]`
- `[data-detail-name]`
- `[data-detail-status]`
- `[data-detail-metrics]`
- `[data-detail-notes]`

## Role-label debt

Future scoped correction:

- Somchai: `Police Senior Sergeant Major` / `ดาบตำรวจ`
- Kittisak: `Police Captain · Investigation Inspector` / `ร้อยตำรวจเอก · สารวัตรฝ่ายสืบสวน`

Do not alter stable Runtime solely because the documentation is more complete.

---

# 11. SEASON AND CHAPTER STRUCTURE

## Season 1

1. Chapter I · `ROOM 1807`
2. Chapter II · `THE PERFECT STRANGER`
3. Chapter III · `THE BORROWED MINUTES`

Season 1 complete.

## Season 2

4. Chapter IV · `SHADOW OF THE TRUTH`
5. Chapter V · `THE MISSING PIECE`
6. Chapter VI · `THE FINAL MOVE`
7. Chapter VII · `LAST WITNESS`

## Chapter IV phase-count lock

Exactly eight phases:

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET PROVENANCE / PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

No ninth phase without owner approval.

---

# 12. CORE STORY CANON

## Scientific truth

- toxicology genuine
- samples genuine
- biological findings genuine
- chronology engineered
- solution is not fake science

## Daniel lock

Daniel Voss dies in Chapter II.

He never:

- returns alive
- becomes the Last Witness
- operates the system after death

He may continue through drafts, recordings, archives and scheduled signals prepared before death.

## Room 1807 victim

- not Daniel
- identity remains unknown to player through Chapter IV
- future identity: Kawin Nopparat
- reveal in Chapter V

## `R.`

Through Chapter IV:

- not confirmed as Ratchata
- unresolved to player

Forward truth:

- Rinrada
- Registrar role
- earned reveal in Chapter V

## Temporary Operational Profile 18-07

`18-07` is not a person.

It may carry accepted role, permission, device claim, delayed event and route metadata.

It does not prove physical entry, operator, identity, motive or mastermind.

## Architecture layers

1. Adrian designed legitimate reconciliation architecture.
2. Arman built or adapted the wrapper.
3. Narin supplied or executed trusted Bangkok deployment conditions.
4. Ika handled later surveillance or recovery.
5. Elena selected victim, room, timing, discovery sequence and cleanup priority.

Architecture, authorship, brokerage, deployment, operation and Decision Ownership remain separate.

## North threat escalation

- North separates authorship, route, deployment and Decision Ownership.
- `ANALYST OF RECORD` identifies analytical capability.
- North threatens the attribution gap protecting Elena.
- Elena chooses neutralization.
- attempt remains deniable.
- North remains active.
- North must consent to the false-success plan.
- the attempt creates evidence.

---

# 13. CANONICAL DANIEL TIMELINE

| Time | Canon event |
|---|---|
| 05:47 | Daniel’s building accepts Temporary Operational Profile 18-07 with resident-access role |
| 05:51 | Daniel’s Orchid Café draft is edited |
| 05:58 | original toxicology sample is collected |
| 06:09 | `COLLECTION_TIME` revised from 05:58 to 06:09 using accepted Evidence Division permission |
| 06:17 | Laboratory Accession Record created |
| 06:20 | Daniel officially reported discovered |

Locked interpretation:

- 05:47 proves profile acceptance, not operator identity.
- 06:09 proves accepted permission and a corrected event claim, not operator identity.
- 06:17 is always Laboratory Accession Record creation.
- 06:20 is official reported discovery.

---

# 14. CHAPTER I · ROOM 1807

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

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
- laptop selectively cleared
- departure interrupted
- phone positioned for investigators
- true objects arranged into false order

Ending:

> “You looked in the wrong room.”

Forward truth:

- victim is Kawin
- Kawin audited 18-07 reuse
- Elena killed him
- Elena staged Room 1807
- warning caller is Elena through a masked channel

No-regression lock:

- Character Journal remains hidden throughout Chapter I.
- No late character may leak into Chapter I.
- New Game must clear late-story display state.

---

# 15. CHAPTER II · THE PERFECT STRANGER

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Victim:

Daniel Voss, 38.

Key findings:

- two coffee mugs
- Temporary Profile 18-07
- investigation board
- Room 1807 connection
- `Ask E. about the corrected time`
- café draft edited at 05:51
- certified extract
- sealed custody envelope
- Evidence Division permission
- FS-12
- offline local session
- genuine science
- correction from 05:58 to 06:09
- discovery at 06:20

Character Journal identity:

- Feature first unlocks after North’s initial Chapter II conversation.
- This timing is an iconic game-system contract and must not be changed.

Ending routes:

- `chapter3_timeline`
- `chapter3_old_cases`
- `chapter3_access`

All converge.

---

# 16. CHAPTER III · THE BORROWED MINUTES

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Purpose:

Explain how true evidence survives inside a false chronology without revealing the mastermind.

## Central mechanism

- offline devices create Signed Local Events
- events may arrive later
- events within the eleven-minute Reconciliation Window remain eligible
- accepted events may display by Device Timestamp
- conflicting certified views may both validate
- system can obey rules while official story is false

## Major conclusions

- Daniel did not travel
- records and credentials travelled
- signature and permission can be valid while operator remains unknown
- Adrian’s architecture is not murder proof
- Jakarta is route, not identity
- watcher and cleanup came through the Bangkok Evidence Chain
- deployment and Decision Ownership differ

## Closing proof boundary

Proven or supported:

- signed Bangkok package carried watcher
- cleanup used valid synchronization credential
- deployment predated the team’s departure
- adversary anticipated raw-mirror milestone
- local deployment and Jakarta tool route are separate

Not proven:

- named knowing insider
- Elena
- Kittisak
- Somchai
- Ratchata
- Arman as operator
- Adrian as mastermind

---

# 17. COMPLETE OWNER-LEVEL MYSTERY TRUTH

Secret from player.

## Meridian Evidence Systems

Fictional regional infrastructure provider serving Bangkok, Singapore and Jakarta.

Legitimate purpose:

- preserve signed local events
- support delayed synchronization
- maintain custody continuity
- operate through network failure

Weakness:

- authenticates credentials and signatures
- does not independently prove human operator
- displayed chronology may inherit claimed device time

## Adrian

- legitimate architect
- learned of abuse
- concealed, delayed and fled
- guilty of real enabling or obstruction
- not mastermind

## Arman

PALIMPSEST can preserve records, fail over relays, scrub operator metadata, protect anonymous delivery and survive suppression.

Arman sold, brokered or adapted it.

He did not choose Kawin, Daniel, Room 1807 or the eleven-minute events.

## Narin

- handled or enabled valid local deployment
- connected Bangkok conditions to broker layer
- concealed irregularities
- later assisted cleanup
- did not own final decision

## Elena

Belief:

> Facts do not govern institutions. Records do.

She:

- chose which truth remained visible
- used sequence as authority
- used credibility to guide investigators
- moved from curation to murder
- allowed technical actors to become visible suspects
- used legitimate local access
- controlled discovery timing

## Kawin murder

- discovered 18-07 reuse
- planned to meet Rin
- Elena killed him
- Elena staged Room 1807

## Daniel murder

- continued Kawin’s work
- connected Room 1807, 18-07, `E.`, corrected time and Singapore
- Elena killed him
- attached genuine science to engineered chronology

## Watcher

- deployed through Elena’s legitimate forensic access and local deployment path
- signed package carried dormant watcher
- waited for North’s raw-mirror milestone
- cleanup attempted to erase callback token while preserving official record

---

# 18. CHAPTER IV · SHADOW OF THE TRUTH

## Current status

- Phase I complete and frozen
- Phase II complete and frozen
- Phase III complete and frozen
- Phase IV implemented in current Runtime and passed the latest owner check
- Arman Journal contract owner-approved
- Phase V–VIII planned
- eight phases total

## Phase I · AFTERIMAGE

Status:

`COMPLETE · OWNER-APPROVED · FROZEN`

Route Board:

| Item | Lane |
|---|---|
| Wrapper Fingerprint | Jakarta |
| Rendezvous Token | Jakarta |
| Bangkok Signed Package | Bangkok |
| Cleanup Credential | Bangkok |
| Decision Owner | Unresolved |

North becomes `ANALYST OF RECORD` target.

## Phase II · JAKARTA ARRIVAL

Status:

`COMPLETE · OWNER-APPROVED · FROZEN`

Physical team:

- Benedict
- North
- Cheryl
- Maya

Farid remains remote in Singapore. Maya owns Indonesian authority.

## Phase III · PACKET TRAIL

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Proven or supported:

- PALIMPSEST-family source build
- Jakarta route
- broker handoff
- Bangkok deployment conditions
- Decision Owner unknown
- lawful observation of broker handle

Not proven:

- Arman identity at that point
- Arman as operator
- Arman as murderer
- Elena involvement
- final operator
- Decision Owner

## Phase IV · THE MAN BEHIND THE ALIAS

Status:

`IMPLEMENTED · CURRENT BUILD OWNER-CHECKED · ARMAN JOURNAL CONTRACT OWNER-APPROVED · NO-REGRESSION BASELINE`

Formal whole-phase freeze remains separate from the owner’s latest pass wording.

### Purpose achieved by current implementation

- physical encounter with Arman
- Dimas controlled-proxy confrontation
- identity verification through physical and source-behaviour evidence
- real Arman reveal
- separation of knowledge, access, authorship and Decision Ownership
- Arman culpability without mastermind attribution
- North threat classification
- Phase V location lead
- ending-profile consequence choices

### Accepted opening sequence

1. unobstructed full-screen vehicle approach
2. vehicle stops or Skip completes the same route
3. soft fade
4. dedicated Phase title card
5. professional Day / Location / Time card
6. automatic entry into the building

There is no `ENTER THE BUILDING` button. The location card advances automatically because it is a cinematic transition, not a decision point.

### Accepted interface behavior

- Save and Menu controls present in playable scene HUD
- Settings accessible through the established drawer
- progress bar uses the established gold fill
- no full-screen shade that changes approved scene luminance
- current stairwell and workshop art remain at owner-approved tone
- Return to Title stops Phase IV audio correctly

### Persona Triangulation

Implemented reasoning concept:

- `KNOWLEDGE`
- `ACCESS`
- `AUTHORSHIP`
- `CONTRADICTION`

Correct conclusion:

> `CONTROLLED PROXY`

Standards:

- tap-first
- resettable
- no permanent fail
- wrong answers teach the access-versus-identity distinction
- Benedict and North contribute distinct reasoning

### Dimas rule

- informed proxy
- real witness
- no Character Journal card
- treatment affects reliability and coercion risk
- not a cartoon decoy

### Arman admissions boundary

Arman may admit:

- wrapper authorship or adaptation
- brokerage
- metadata protection
- anonymous delivery
- knowledge that abuse was possible
- receipt of legitimate Bangkok deployment conditions

Arman does not admit:

- selecting victims
- selecting Room 1807
- selecting eleven-minute events
- killing Kawin
- killing Daniel
- knowing final client identity

### Arman Character Journal timing

Unlock occurs after:

- real face is seen
- reveal is complete
- source behaviour supports identity
- first verified Arman introduction dialogue is complete

Then:

- one Character Added notification
- one unread red dot
- one card
- Save/Load persistence
- no repeated notification
- opening Journal clears unread
- Developer Unlock remains silent

### Accepted portrait direction

- no white fringe
- no severed face crop
- face and upper torso dominate
- Benedict-referenced scale and anchor
- Arman Journal card/detail use a professional face-and-torso crop
- North expressions used in Phase IV must not show damaged or incomplete face crops
- Maya bottom-edge contamination must not return

### Phase IV consequence choices

#### Dimas treatment

- protect and separate from mastermind
- pressure for immediate statement
- treat as co-conspirator

#### Arman status

- protected technical witness
- confidential asset
- prime suspect

#### Local cache handling

- seal first, analyse second
- live trace before the window closes
- preserve a private safety clone

#### North response

- withdraw her
- let her design counteroperation
- use her without full informed consent

Ethical lock:

- Benedict cannot use North as uninformed bait without consequences.

### Closing threat beat

```text
SUBJECT: N-32
CAPABILITY: ATTRIBUTION
STATUS: ESCALATED
```

Decision Owner remains unresolved. Elena’s identity remains hidden.

### Phase V lead

Current Phase IV evidence points to the next operational location associated with Aster Recovery and the Aruna coastal setting. Phase V must use this lead rather than invent an unrelated destination.

## Phase V · NORTH IS MARKED

Next production target.

Locked function:

- Indonesian coastal hotel, resort, beach club, pool or surveillance setting
- public leisure cover with operational tension
- adversary attempts deniable removal
- North remains active
- attack creates evidence
- Ika becomes visible or lawfully identifiable
- player distinguishes violence from Decision Ownership

Threat rhythm:

1. arrival under cover
2. false calm
3. anomaly
4. North singled out
5. attempt
6. proof attacker needs a record of removal
7. transition to false success

## Phase VI · THE FALSE SUCCESS

- North consents
- North designs part of deception
- Farid maintains decoy telemetry
- Cheryl and Maya control legal perimeter
- public record may say missing, injured or dead
- North remains alive and operational
- choices affect public-record control and institutional trust

## Phase VII · RELAY FACILITY CLIMAX

- preserve relay authorization echo
- Arman assists under conditions
- cleanup triggers
- North works through hidden channel
- capture Registrar reference `R.`
- prove Bangkok watcher deployment predates Singapore trip
- Elena sends true useful information slightly too early
- no obvious villain reveal

## Phase VIII · SHADOW OF THE TRUTH

- public record says North removed
- North secretly alive
- antagonist believes record
- Benedict returns toward Bangkok
- Jakarta identifies toolmaker, broker and field operation
- Decision Owner remains unresolved
- `R.` becomes next human lead

Closing:

> “Let her believe the record.”


---

# 19. CHAPTER V · THE MISSING PIECE

## Purpose

Supply human continuity that systems cannot manufacture.

## Public and private state

Public:

- North missing, injured or presumed dead after the future false-success operation

Private:

- North alive under protection and analytically active

## Core reveals

- Kawin identity
- why Room 1807 mattered
- `R.` identity
- Registrar role
- pier meeting
- living Last Witness
- first earned suspicion of Elena
- Narin identity or role
- distinction between official-unit compromise and individual intent

## Bangkok team roles

### Kittisak

- commands return-to-Bangkok operation
- opens need-to-know internal audit
- controls warrants and witness protection
- balances case integrity against institutional pressure

### Somchai

- reconstructs physical package path
- checks handoffs, cameras and vehicles
- locates witnesses
- supports Rin extraction

### Ratchata

- identifies Kawin
- compares biological findings
- proves official chronology cannot account for both bodies

### Elena

- helps interpret forensic and custody irregularities
- remains useful
- may correctly point toward Narin
- first suspicion arises through timing and physical presence, not villain coding

## Planned phases

1. Return to Bangkok
2. Name in Room 1807
3. Room/Profile Cross-Map
4. Daniel’s Handoff
5. The Registrar
6. Pier Reconstruction
7. Witness Extraction
8. The Missing Piece

## Planned minigames

### Victim Identity Reconstruction

- connect body, job role, travel preparation and audit trail
- result: Kawin
- no obscure biographical trivia

### Room/Profile Cross-Map

- compare Room 1807, Profile 18-07 and operational reuse
- teach correlation without declaring identity

### Pier Event Reconstruction

- place physical presence, calls, vehicle and witness memory
- distinguish “present” from “killed”
- Rin’s sighting supports Elena’s presence, not complete murder proof

## Chapter ending requirement

The team has:

- human witness
- physical presence evidence
- local deployment suspect
- first earned Elena theory

The team still lacks:

- complete Decision Owner chain
- admissible link between both murders and Elena
- proof surviving institutional challenge

---

# 20. CHAPTER VI · THE FINAL MOVE

## Purpose

Strategic war over the final official record.

## Elena’s Continuity Protocol

Elena attempts to:

- migrate records
- certify final chronology
- frame Adrian, Arman, Narin or North
- erase attribution path
- control public discovery
- turn real offences by others into a complete but false murder theory

## Planned phases

1. Case Theory Without a Charge
2. Controlled Leak
3. Alliance Assignment
4. Continuity Protocol
5. Attack on Safe Chain
6. Evidence Division Breach
7. Elena Knows
8. Two Staging Sites
9. The Final Move

## Controlled Leak logic

The team releases different true but incomplete details through isolated channels.

Purpose:

- identify which channel reaches adversary
- separate police command, forensic access, medical chain and external actors
- avoid treating one leak as final identity proof

Authority:

- Kittisak authorizes
- Somchai executes physical distribution
- North and Farid design telemetry
- Cheryl protects admissibility
- Maya owns Indonesian actions
- Elena participates under apparently normal forensic access

## Authority Chain Reconstruction

Player maps:

- who requested
- who approved
- who handled
- who signed
- who analysed
- who certified
- who benefited

Correct result distinguishes Kittisak’s authority, Somchai’s handling, Elena’s access, Ratchata’s independent findings, Narin’s execution and the hidden Decision Owner.

## Parallel Scene Prioritization

Possible priorities:

- witness safety
- physical evidence
- digital mirror
- Narin capture
- public-record release

No option is obviously stupid. Every option preserves something and risks something else.

---

# 21. CHAPTER VII · LAST WITNESS

## Purpose

Resolve:

- victims
- architecture
- wrapper author
- broker
- deployer
- operator
- Decision Owner
- physical witness
- legal case
- public record

## Opening alerts

1. Room 1807
2. pier

The adversary creates simultaneous crises involving a person, a record, a repeated staging and the Decision Owner.

## Planned phases

1. The Room Repeats
2. The Pier
3. Rescue / Preserve
4. Elena Confrontation
5. The Last Record
6. Final Accusation
7. Record or Release
8. Ending

## Final minigame · THE LAST RECORD

### Part I · What happened physically

- Kawin
- Daniel
- Room 1807
- pier
- body movement
- real collection time

### Part II · What the records claimed

- 18-07
- corrected time
- Singapore trail
- official discovery sequence
- North removal record

### Part III · Who owned each layer

- architect
- wrapper author
- broker
- deployer
- field operator
- physical killer
- Decision Owner

### Part IV · What survives legally

- witness
- physical corroboration
- digital corroboration
- custody
- authority
- contradiction
- final accusation

Interaction standard:

- one section at a time
- saveable between sections
- wrong placement explains missing distinction
- final confirmation warns about unresolved contradictions
- no unsupported “guess the killer” button

## Final accusation board

Serious candidates:

- Elena
- Adrian
- Arman
- Narin

Ika may be selectable only when enough evidence supports a principal theory. Kittisak and Somchai do not become final murder candidates from authority or proximity alone.

---

# 22. CROSS-CHAPTER CLUE CONTINUITY

| Early clue | Later interpretation | Final function |
|---|---|---|
| Room 1807 staged | true objects arranged into false order | model for official false record |
| `R.` calls | Rin and Registrar role | living witness and authority clue |
| pier note | Kawin’s planned meeting | physical-presence reconstruction |
| 18-07 | operational profile | access without identity |
| corrected time | accepted but false chronology | Decision Owner’s timing control |
| Singapore booking | records travelled, Daniel did not | identity and travel separation |
| Adrian architecture | legitimate system later abused | architect is not killer |
| Arman wrapper | anonymity and delivery | toolmaker is not Decision Owner |
| Dimas proxy | physical access can be rehearsed | identity requires corroboration |
| Bangkok signed package | local deployment path | internal compromise inquiry |
| watcher milestone | adversary knew investigation progress | North targeted |
| N-32 classification | capability becomes threat | Phase V removal attempt |
| Aster coastal reservation | operational location lead | Phase V setting |
| North removal record | system needs institutional belief | false-success counteroperation |
| Rin’s sighting | Elena physically present | presence plus corroboration |
| Ratchata findings | body contradicts record | physical proof |
| controlled leak | narrows access path | separates helper, deployer and owner |
| final record | all layers joined | ending determination |

Every chapter answers one earlier question and opens one narrower question.

---

# 23. MINIGAME AND INTELLIGENCE STANDARD

## General standard

Every minigame:

- mobile-friendly
- tap-first
- 30–60 seconds except staged final minigame
- Reset-capable
- no softlock
- no permanent fail
- wrong answers teach logic
- success cue separate from evidence cue
- derived from collected evidence
- mechanically distinct

## Cognitive progression

### Chapter I–II

- observation
- contradiction
- basic sequencing

### Chapter III

- system rules
- access vs identity
- raw order vs display order

### Chapter IV

- route vs deployment
- knowledge vs access vs authorship
- controlled proxy
- threat intent vs attacker identity
- deception ethics

### Chapter V

- identity reconstruction
- physical presence vs action
- witness corroboration

### Chapter VI

- authority
- information leakage
- simultaneous priorities
- admissibility

### Chapter VII

- whole-case synthesis
- accusation
- public record

## Fair answer design

Use concise feedback:

- “This proves access, not the operator.”
- “Presence supports opportunity, not the killing act.”
- “A valid signature does not identify the hand.”
- “The tool explains method, not victim selection.”
- “The witness remembers presence; corroboration must prove action.”

---

# 24. CHOICE ARCHITECTURE

## No single-choice ending

No choice may directly set a good or bad ending.

Each choice affects one or two dimensions such as:

- evidence integrity
- chain of custody
- attribution proof
- role separation
- witness protection
- North safety
- alliance strength
- institutional trust
- public-record control

## Recovery rule

A poor choice may be repaired through corroboration, admission of error, fresh custody, witness rescue, independent copy, corrected accusation or public disclosure. Repair has a cost.

## Choice transparency

Do not reveal ending points. Reveal consequences:

- witness trusts you
- statement challenged as coerced
- hash preserved
- live trace exposed North
- institution rejects private clone
- alternative theory retained
- custody weakened

## Ethical agency

North’s safety decisions require her informed consent. Harmful routes may exist but must not be celebrated as optimal.

---

# 25. ENDING ARCHITECTURE

Historical truth:

- Elena is mastermind
- Elena killed Kawin
- Elena killed Daniel

Variable outcomes:

- evidence survival
- witness survival
- attribution
- admissibility
- final accusation
- institutional acceptance
- public record
- character consequences

## Ending 1 · TRUE CONVICTION

Requirements include:

- Elena accused
- Decision Owner corroborated
- clean or repaired custody
- Rin or equivalent physical corroboration survives
- North evidence survives
- Ratchata evidence survives
- Narin deployment separated from Elena decision
- at least three evidence classes
- institution accepts case

Outcome:

- Elena convicted for murders
- accomplices face proportionate real charges
- official record approaches historical truth

## Ending 2 · RIGHT NAME, NO CASE

- Elena correctly identified
- accusation correct
- essential legal support fails

Possible failures:

- custody
- witness
- local decision path
- physical corroboration
- institutional acceptance

Outcome:

- team knows truth
- Elena avoids murder conviction
- accomplices may still face real charges
- public record remains disputed

## Ending 3 · FALSE CONVICTION

Institution accepts a coherent alternative case against a genuinely culpable person but attributes murders to the wrong principal.

### Adrian variant

Real offences:

- enabling
- concealment
- obstruction
- unlawful retention

Missing truth:

- no local victim selection or physical murder path

### Arman variant

Real offences:

- cybercrime
- brokerage
- metadata scrub
- concealment
- obstruction

Missing truth:

- no Bangkok physical presence
- no victim selection
- no Decision Ownership

### Narin variant

Real offences:

- deployment
- tampering
- concealment
- cleanup
- conspiracy

Missing truth:

- did not select or kill victims
- received curated conditions

Outcome rule:

The epilogue must state which offences were correctly proven and which murder attribution was wrong.

## Ending 4 · THE PERFECT RECORD

Conditions:

- witness lost, silenced or discredited
- North framed or officially removed
- custody destroyed
- physical and digital evidence fail to corroborate
- institution accepts engineered chronology
- player embraces a theory with fatal contradictions or preserves too little

Outcome:

- Elena’s version becomes accepted history
- real objects remain, but their order tells the wrong story

---

# 26. ENDING RESOLUTION LOGIC

## Required dimensions

1. `evidenceIntegrity`
2. `chainOfCustody`
3. `attributionProof`
4. `roleSeparation`
5. `corroborationBreadth`
6. `witnessProtection`
7. `northSafety`
8. `institutionalTrust`
9. `publicRecordControl`
10. `finalAccused`

## Decision sequence

1. determine evidence survival
2. determine admissibility
3. determine witness survival and credibility
4. evaluate role separation
5. evaluate accused against means, opportunity, motive and conduct
6. identify fatal contradiction
7. determine institutional acceptance
8. render ending
9. render character epilogues

Before final confirmation, show warnings such as:

- `DECISION OWNER NOT CORROBORATED`
- `PHYSICAL PRESENCE UNRESOLVED`
- `CUSTODY GAP REMAINS`
- `ALTERNATIVE OPERATOR THEORY NOT ELIMINATED`

---

# 27. RELATIONSHIP AND ALLIANCE DESIGN

## Benedict and North

- central partnership
- trust through inclusion
- North consents to false success
- no romance
- consent violations affect alliance and endings

## Benedict and Cheryl

- respect
- restrained amusement
- trust
- shared risk
- genuine feeling
- no permanent partnership ending for Benedict
- no love triangle

## Maya and Benedict

- professional chemistry only
- no romance
- no harem structure

## North and Farid

- technical respect
- dry banter
- no romance
- remote status remains clear

## North and Arman

- hostility and curiosity
- technical recognition
- skill does not equal innocence

## Benedict and Elena

- psychological duel inside cooperation
- Elena guides sequence
- Benedict tests timing and knowledge
- no accusation before proof

## Kittisak and Somchai

- superior-subordinate relationship
- professional trust
- Somchai may challenge assumptions respectfully
- Kittisak owns final police order

---

# 28. AUDIO GOVERNANCE

Owners:

- `02-audio-save.js`
- `11-production-stabilization.js`
- scene-local modules
- lifecycle guard

Do not create another global audio manager.

## General

- one UI press, one click
- evidence cue once
- puzzle cue separate
- stop phase audio on exit
- dialogue remains dominant
- no villain music for Elena
- no identity-reveal sting implying guilt

## Phase IV accepted behavior

- one continuous principal score
- vehicle clip audio preserved where appropriate
- Arman reveal footsteps preserved
- music louder than rejected early candidate but still below dialogue
- score ducks under dialogue, overlays and reveal
- completion card retains appropriate music behavior
- Return to Title stops Phase IV audio
- no theatrical guilt sting

## Phase V direction

- credible public leisure ambience
- water, distant guests and hotel activity
- restrained tension
- no vacation montage
- no comedy sting
- no sexualized audio coding

---

# 29. MOBILE, UI AND ASSET STANDARD

## Mobile widths

Test where practical:

- 320 CSS px
- 360×800
- 390 CSS px
- 412×915
- 430 CSS px

Account for address bar, Android navigation, safe area, long Thai, two-line buttons and scrollable modal content.

## Background art

Standard:

`864 × 1536`

Style:

- noir graphic novel
- cel-shaded
- heavy ink
- angular shadows
- mobile-readable luminance
- operational, not postcard
- no pseudo-text
- exact text or no text

## Portrait standard

Priority:

1. identity
2. face
3. expression
4. upper torso
5. stable framing
6. clean silhouette

General:

- transparent alpha unless a locked exception exists
- no whole-sheet portrait
- individual expressions
- stable anchor and head scale
- test on black, game navy, mid-grey, white and checkerboard where extraction is involved
- no white fringe
- no missing face area
- no floating or tiny torso

## Phase IV accepted asset lock

- current vehicle approach clip
- current Arman reveal clip
- owner-approved stairwell image
- owner-approved workshop image
- Dimas as proxy
- real Arman asset set
- one continuous Phase IV score
- current corrected portrait scale
- no full-screen darkening over owner-graded scenes

Future asset changes must be narrowly scoped to an owner-reported defect.

---

# 30. TESTING STANDARD

## Static

- JS syntax
- CSS parsing
- HTML validity where practical
- asset existence
- paths
- duplicate IDs
- cache queries
- image dimensions
- alpha behavior
- media references
- changed-file scope

## Full assembled Runtime smoke

Minimum before any future delivery:

1. load Title through actual script chain
2. start New Game
3. play Chapter I opening dialogue
4. verify buttons respond
5. verify Character Journal absent
6. enter Chapter II
7. verify North Journal unlock timing
8. test Save/Load
9. use Developer Mode
10. jump through every implemented Chapter IV Phase
11. verify target screen and State
12. test Return to Title and audio cleanup

## Character regression

1. clean reload
2. Chapter I has no Character mode
3. Chapter II normal North unlock
4. Elena unlock once
5. Somchai and Kittisak unlock once
6. Ratchata unlock once
7. Cheryl and Farid unlock once
8. Adrian unlock once
9. Maya unlock after introduction
10. Arman unlock after verified introduction dialogue
11. each unread dot clears on Journal open
12. repeat conversations do not re-notify
13. Save/Load preserves read status
14. Dev Unlock is silent
15. New Game restores early gate
16. open Maya, return, open every other profile
17. open Arman, return, open every other profile
18. test Thai and English

## Phase IV regression

- direct Phase III handoff
- Developer entry to Phase IV
- vehicle natural end
- vehicle Skip
- dedicated Phase title card
- automatic location card transition
- HUD, Save, Menu and Settings
- gold progress
- Stairwell dialogue
- Workshop dialogue
- Persona Triangulation wrong answer
- Reset
- correct completion
- Dimas choice
- Arman reveal
- Arman first introduction
- Character Added message
- unread dot
- Arman card and detail
- close and reopen Journal
- Save before reading Arman
- Load before reading Arman
- read and Save
- Load after reading
- cache review
- consequence choices
- completion card
- Return to Title
- no stale phase audio

## Honesty lock

Never claim Android, iPhone, live Pages, listening test or complete browser regression unless actually performed.

Owner-device result remains final.

---

# 31. CURRENT ACCEPTED LIMITATIONS AND TECHNICAL DEBT

- iPhone Safari not owner-tested
- iOS Add to Home Screen not owner-tested
- backgrounding may exit fullscreen
- legacy global build label may differ from module build
- static Chapter I intro may still say `HOTEL 1807`; Canon title is `ROOM 1807`
- some CSS headers and cache queries retain historical versions
- do not clean accepted Runtime without a scoped reason
- do not clear Site Data by default
- broad Chapter IV Phase I–II language audit remains unresolved
- Somchai Journal role remains generic in current base registry
- Kittisak full Inspector function may not be displayed everywhere
- Phase V exact attack choreography is not implemented
- Narin and Ika are Canon-locked but not Runtime characters yet
- cross-chapter ending-profile use remains future implementation work
- no undiscovered-defect guarantee exists; later verified bugs become scoped maintenance tasks

Current maintenance status:

- no active blocker is recorded at this revision
- completed scope is owner-approved and maintenance-locked
- optional polish, broad cleanup and speculative refactoring are deferred
- the next normal production task is Chapter IV Phase V

Resolved items no longer belong in active debt:

- vehicle title overlay defect
- manual Enter Building button
- Phase IV missing HUD
- non-gold progress
- rejected scene darkening
- reported Maya bottom white edge
- reported Arman Journal scale defect
- Chapter I Character Journal leak from 0.17.5
- stray Arman Character Added notification in early chapters
- Arman missing from Journal after verified introduction
- Adrian Character Added notification timing
- Adrian unread red-dot absence
- premature Adrian red dot on Hawker Developer entry
- Dialogue History opening far from the latest line
- Dialogue History lack of jump-to-latest control
- Case File scrolling ergonomics
- oversized and inconsistent free-standing phase/review buttons
- Chapter II Forensic `CHAIN OF CUSTODY` overlap
- Chapter III Phase VIII Secure Mirror card overflow and off-centre geometry
- Chapter IV Phase IV minigame cards shifted right
- Chapter IV Phase IV cache-header review control clipping

# 32. PROOF REGRESSION LOCK

Do not equate:

- credential with person
- access with operator
- operator with author
- author with deployer
- deployer with Decision Owner
- route with identity
- Jakarta with Arman
- hood feed with Arman
- Dimas with Arman
- Adrian with mastermind
- Arman with mastermind
- Narin with physical killer
- Ika with earlier murders
- Kittisak’s authority with corruption
- Somchai’s proximity with command
- Elena’s legitimate access with immediate guilt
- Rin’s sighting with complete murder proof
- witness statement with complete legal case
- attack on North with direct Elena proof before corroboration

---

# 33. EXACT NEXT-CHAT OPERATING INSTRUCTION

A new assistant must behave as though the owner has said:

> Continue LAST WITNESS from the current owner-approved Production baseline.
>
> Repository: `grolygori789-crypto/last-witness`.
>
> Branch: `production-rebuild`.
>
> Current stable Runtime baseline: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`.
>
> Current Runtime build: `0.17.18`.
>
> Read `GAME_MASTER_PLAN.md` completely before implementation.
>
> Chapter I through Chapter IV Phase IV are the current no-regression baseline.
>
> The currently inspected defect list has passed owner-device checks and is closed unless a reproducible bug is later found.
>
> The default next task is Chapter IV Phase V, `NORTH IS MARKED`.
>
> Do not return to completed Chapters for optional polish, cleanup or redesign. Reopen only the smallest proven owner for a real bug, blocked continuation or explicit essential approval.
>
> Do not write to GitHub without exact current-turn authorization.
>
> Preserve Chapter I Character hiding, Chapter II North unlock timing and one-time Character discovery behavior.
>
> Preserve Adrian and Arman notification timing, unread dots, read clearing, Save/Load persistence and silent Developer behavior.
>
> Preserve Dialogue History latest-position behavior, `Latest` navigation and Case File scrolling.
>
> Preserve standardized phase-action geometry, the Forensic bottom stack, Secure Mirror containment and Phase IV minigame centring.
>
> Preserve Maya profile switching and Character Detail DOM contract.
>
> Preserve Phase IV HUD, gold progress, automatic location-card transition, owner-approved scenes, portraits and audio behavior.
>
> Farid remains remote in Singapore.
>
> Kittisak is Police Captain and Investigation Inspector.
>
> Somchai is Police Senior Sergeant Major and reports to Kittisak.
>
> Chapter III proves Bangkok Evidence Chain compromise, not a named knowing insider.
>
> Arman is not mastermind.
>
> Historical truth remains Elena.
>
> Four major endings arise from accumulated proof, survival, custody, accusation and institutional acceptance.

# 34. CURRENT CANON SUMMARY

## Confirmed to player after current Phase IV

- Room 1807 was staged
- Room 1807 victim is not Daniel
- Daniel is dead
- 18-07 is a profile
- science is genuine
- chronology engineered
- Daniel did not travel
- records travelled
- eleven-minute policy exists
- raw order differs from display
- Adrian is architect, not proved mastermind
- PALIMPSEST is a tool family
- Jakarta is route, not identity
- watcher entered through trusted Bangkok chain
- Bangkok deployment is supported
- Dimas was a controlled proxy
- Arman is physically identified
- Arman is wrapper specialist and broker
- Arman is culpable but not proved killer
- tool authorship differs from Decision Ownership
- North is classified as an attribution threat
- coastal operational lead exists
- Decision Owner remains unresolved

## Secret owner truth

- Elena mastermind
- Elena killed Kawin
- Elena killed Daniel
- Kawin is Chapter I victim
- Rin is `R.` and Last Witness
- Adrian is not mastermind
- Arman is not Decision Owner
- Narin is real accomplice, not murder owner
- Ika attacks North, not earlier victims
- North targeted because she understands attribution
- historical truth fixed
- four major endings

## Unresolved to player

- Kawin identity
- Rin identity
- warning caller
- full pier event
- operator at 05:47
- operator at 06:09
- knowing insider or stolen access
- Narin identity
- Ika identity
- Decision Owner
- Elena path
- final admissible case
- final ending

---

# 35. MASTER PLAN UPDATE PROTOCOL

Update this file whenever any change occurs to:

- Production branch
- stable Runtime baseline
- owner acceptance
- playable boundary
- Canon
- character rank
- authority
- suspect architecture
- proof boundary
- ending architecture
- Save schema
- load order
- audio owner
- asset path
- implemented phase
- known defect
- next target

Before replacement:

1. fetch latest file
2. preserve Runtime facts
3. preserve Canon
4. preserve owner secrets
5. preserve proof boundaries
6. distinguish approved and proposed
7. record replaced blob SHA
8. keep exact filename
9. compute local SHA-256
10. never silently promote proposal to implementation

---

# 36. CURRENT BASELINE PRESERVATION LOCK

```text
Repository:
grolygori789-crypto/last-witness

Production and Default Branch:
production-rebuild

Current Owner-Approved Runtime Baseline:
f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99

Commit Message:
Fix Phase IV minigame centering

Current Runtime Build:
0.17.18

Base Phase IV Story Module:
0.17.0

Historical Arman Journal Baseline:
8a70778dffbdea65c7ba37954673be11b547f3b2

Historical Frozen Phase III Baseline:
61dfaec35cb8990ac9ea3fafa28d39bee8e4698f

Approved Playable Scope:
Chapter I
Chapter II
Chapter III
Chapter IV Phase I
Chapter IV Phase II
Chapter IV Phase III
Chapter IV Phase IV current implementation

Current Endpoint:
CHAPTER IV · PHASE IV CURRENT IMPLEMENTATION

Next:
CHAPTER IV · PHASE V · NORTH IS MARKED

Owner Result:
CURRENT INSPECTED SCOPE PASSED OWNER CHECK
KNOWN REPORTED DEFECTS CLOSED
CURRENT STATE SATISFACTORY FOR FORWARD DEVELOPMENT

Maintenance Status:
COMPLETED-SCOPE MAINTENANCE LOCK
REOPEN ONLY FOR VERIFIED BUG OR ESSENTIAL OWNER-APPROVED NEED
```

Preserve:

- branch and baseline distinction
- Chapter I Character gate
- Chapter II unlock timing
- one-time Character notification and red-dot contract
- Adrian Hawker pre-verification gate and silent Dev behavior
- Arman scoped Journal bridge
- Dialogue History latest-position and `Latest` control
- Case File scroll behavior
- standardized free-standing action-button width and centring
- Forensic `CHAIN OF CUSTODY` bottom stack
- Phase VIII Secure Mirror modal containment
- Phase IV minigame containment and cache-header fit
- Maya DOM contract
- Farid remote styling
- current load order
- Save/Load continuity
- Phase IV presentation and assets
- Daniel death lock
- Kawin identity lock
- Rin identity lock
- Chapter III proof boundary
- Bangkok hierarchy
- Elena secret and anti-villain-coding rule
- Adrian and Arman boundaries
- Narin and Ika roles
- North threat and false-success continuity
- four endings
- no single-choice ending
- owner-upload workflow
- forward-development default

# 37. RUNTIME OWNERSHIP AND FILE SNAPSHOT APPENDIX

## Current important file snapshot

| Path | Blob SHA | Role |
|---|---|---|
| `index.html` | `e30f3fb1f20399d51de9aba220802361a5da15d9` | static DOM and static load order |
| `js/engine/06-content-registry-dev.js` | `e404cc2c2c47dac9bca12e54874c4e6ee1e1d4f2` | base Journal, Case File and Dev registry |
| `js/engine/09-defect-hotfix.js` | `96a6f22e4097c26a4750f9eb9dbfa150a8eaf943` | dynamic bootstrap `0.17.18` |
| `js/engine/20-character-journal-story-gate.js` | `1f3088012ac911ec8833a2b58d513b91f5040811` | safe Character Journal progression gate `0.17.7` |
| `js/engine/21-character-notification-contract.js` | `8d191d5e3ae773a43dca9bf64d54f348a5fe669d` | scoped Character notification and Hawker gate `0.17.14` |
| `js/engine/22-modal-scroll-experience.js` | `7611f1d1b2378570047c49258beec2eb17736e66` | Dialogue History and Case File scroll UX `0.17.15` |
| `js/chapters/chapter-04/04a-arman-encounter-revision.js` | `908fdbc42ef56cd054dbdd841e2c5f7aafee6df9` | Phase IV presentation and Arman Journal contract `0.17.7` |
| `css/chapter-04-phase-04-revision.css` | `bbba1c320b3870ff4b0412f654415d0344a33ee9` | accepted Phase IV revision styling |
| `css/phase-action-standard.css` | `4c4e3aa82a0c726eebd0e823d66f0f071b7c847d` | action and modal geometry standard `0.17.18` |
| `GAME_MASTER_PLAN.md` replaced blob | `09cd4628ccb7fbf9eba8095f5c1cb68a8b18e976` | previous planning source |

Future assistants must re-fetch current SHAs before editing.

## Shared owners

### `01-runtime-data.js`

Owns base State, localization, base portraits, clue data, audio references and shared globals.

### `02-audio-save.js`

Owns Auto Save, named saves, IndexedDB, localStorage fallback, export/import, deletion, restore and legacy migration.

### `04-ui-dialogue.js`

Owns base screen routing, chapter intros and base dialogue.

### `06-content-registry-dev.js`

Authoritative base owner for:

- Character Journal
- Case File registry
- base story gates
- unread arrays
- red dots
- Character Cards
- Developer unlocks
- persistence

Storage key:

`lastWitness.contentRegistry.v3`

### `20-character-journal-story-gate.js`

Current safe compatibility owner for:

- early Chapter Journal hiding
- stale-state sanitation at early screens
- North gate compatibility
- safe late-character timing support
- no document-body polling

### `04a-arman-encounter-revision.js`

Scoped owner for:

- Phase IV accepted presentation repair
- Arman late-character extension
- Arman card/detail rendering compatibility
- unread dot and notification
- Save/Load recovery
- silent Dev unlock behavior

This is not permission to create parallel Character truth for future characters. Future Runtime should ideally extend the authoritative registry with a planned migration rather than accumulate arbitrary bridges.

---

# 38. SAVE, STORAGE AND IMPLEMENTED STATE APPENDIX

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

Character Registry storage:

`lastWitness.contentRegistry.v3`

## Phase I state

`state.chapter4.phase1` includes started, card flags, intro, choice, board state, query state, closing and stage.

## Phase II state

`state.chapter4.phase2` includes flight, airport, Maya, office, legal brief, verification, evidence, completion and stage.

## Phase III state

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

## Phase IV state

See Section 4 for complete fields.

Critical Journal migration rules:

- do not rename legacy keys without migration
- preserve `armanUnlocked` separately from Journal read state
- identity verification does not automatically mean notification already shown
- Developer unlock does not become story notification
- a 0.17.6 missing-card save must recover without duplicate toast

## Late-chapter restore sequence

1. load modules in narrative order
2. initialize isolated defaults
3. apply migrations
4. restore snapshot
5. call correct resume bridge
6. rebuild screen
7. rebuild audio
8. rebuild dialogue and modals
9. rebuild Journal and Case File extensions
10. preserve completed-state behavior
11. do not let a future module overwrite restored chapter

---

# 39. CHARACTER VISUAL, PHYSICAL AND PORTRAIT CANON

## North

- lean-fit
- agile
- compact silhouette
- natural adult proportions
- no passive pin-up posing

## Cheryl

- athletic-curvy
- strong shoulders
- toned waist
- tomboy confidence
- movement-ready

## Maya

- fuller figure than Cheryl and North
- strong and healthy
- defined waist
- realistic support and weight distribution
- authoritative
- no romance with Benedict

## Body-separation rule

Difference comes from full anatomy, posture, movement, silhouette and garment construction, not one identical body with isolated size changes.

## Maya accepted visual lock

- dark navy suit remains navy
- pure black portrait background exception
- subtle contour preserves bob silhouette
- face and upper torso carry strong visual weight
- no tiny portrait
- no damaged crop
- no white bottom line

## Dimas and Arman current visual lock

- face and upper torso prominent
- stable top anchor
- no white matte fringe
- no floating portrait
- no full expression sheet
- no runtime auto-extraction marketed as final professional asset work
- current owner-accepted presentation is baseline

## Accepted Character card layout

- raw portrait `<img>`
- name and status in established layout
- Relationship summary in original information column
- no global oversized redesign to repair one character

---

# 40. IMPLEMENTED AND PLANNED MINIGAME CATALOG

## Implemented

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
18. Persona Triangulation / Controlled Proxy reconstruction

## Planned

1. Threat Pattern or Decoy Telemetry Control
2. Relay Authorization Preservation
3. Victim Identity Reconstruction
4. Room/Profile Cross-Map
5. Pier Event Reconstruction
6. Controlled Leak Correlation
7. Authority Chain Reconstruction
8. Parallel Scene Prioritization
9. The Last Record

Avoid renamed mechanical duplicates.

---

# 41. BUILD HISTORY AND ACCEPTED TECHNICAL DEBT

## Stable historical chain

### `0.7.x` to `0.12.1`

- Canon separation
- Save Manager
- Journal gates
- Chapter III routes and Season 1

### `0.13.2`

- Chapter IV Phase I AFTERIMAGE
- Evidence Route Board
- Analyst of Record target

### `0.14.9` to `0.16.4`

- Jakarta arrival
- Maya Journal extension
- portrait stabilization
- Phase III Packet Trail
- owner-approved Phase III baseline

## Phase IV implementation and repair chain

### `0cbece8853e8049d5a7af1b2bfa4b954d1bc8586`

- `Add Chapter IV Arman encounter`
- base Phase IV module `0.17.0`
- rejected for major presentation and portrait defects

### `5ea29ca53feaeb3ce8e38f8dc580cd9a0fa02eb8`

- first Developer jump repair
- insufficient

### `ea3b30d617b347ed04df02f4d3e5fff8a321540c`

- Phase III jump and direct handoff `0.17.0-d2`
- materially improved entry

### `cd681faab50153c4e0ef7d5d2d8fa792be01b367`

- `Polish Chapter IV Phase IV experience`
- introduced 0.17.1 presentation candidate
- owner found consistency, HUD and portrait defects

### `090442b6a64f12912ab4bf0b42c3e607c2006836`

- `Repair Chapter IV Phase IV consistency`
- 0.17.3 repair

### `6fe7097376a20d2e59c5d5c077d302920522c959`

- `Fix Phase IV journal and portrait defects`
- 0.17.4 scoped repair
- Character gate remained defective

### `5adfbaa4be1bf4f834323b291a23a51d03b47146`

- `Fix character discovery timing globally`
- 0.17.5 rejected blocker
- global Character Discovery layer caused Chapter I dialogue and buttons to stop responding
- this build must never be restored as a working baseline

### `02e1dcf7e024a3db26572cf035d3449186f2ab6a`

- `Recover runtime and character progression`
- 0.17.6 full-game Runtime recovery
- removed unsafe global discovery implementation
- restored Chapter I–IV playability
- corrected most reported Phase IV defects
- Arman card/unread remained missing

### `8a70778dffbdea65c7ba37954673be11b547f3b2`

- `Fix Arman journal unlock`
- 0.17.7 scoped Arman Journal contract repair
- owner confirmed the Arman Journal contract passed at that stage
- historical accepted Arman Journal baseline; superseded as current Production baseline by `0.17.18`

## Engineering lesson lock

- Synthetic DOM checks are not a substitute for assembled Runtime testing.
- Do not report full regression from a harness that excludes production load order.
- A late-character defect must not be solved by wrapping all Character discovery globally.
- State chapter number cannot be trusted over active screen during stale-save sanitation.
- Registry filtering, persistence and UI rendering must be tested as one contract.
- The owner must not become the first tester of a claimed blocker-free build.

---

# 42. DELIVERY PACKAGE REQUIREMENTS

Every future code package must contain:

- one ZIP
- preserved repository paths
- changed-file manifest
- installation instructions
- test report
- SHA-256
- base branch
- base commit
- changed-file count
- exact tested scope
- exact untested scope
- no unrelated files
- Suggested Commit Name
- commit name no more than 50 characters when required

Planning-document delivery:

- exact filename
- local checksum
- documentation-only status
- replaced blob SHA
- no Runtime-success claim

---

# 43. PHASE IV IMPLEMENTED CONTRACT AND FUTURE EXTENSION CHECKLIST

Phase IV is no longer a narrative-only blueprint. The current implementation contract must be preserved while Phase V is developed.

## Narrative

- Surya Elektronik remains the Arman encounter site
- Dimas remains controlled proxy
- Arman identity is physically and behaviorally corroborated
- Persona Triangulation separates knowledge, access, authorship and contradiction
- Arman admissions remain limited
- North threat classification remains
- Phase V location is justified by Phase IV evidence

## Characters

- Benedict, North, Cheryl and Maya are physically present as established by current scenes
- Farid remains remote
- Maya owns Indonesian authority
- Cheryl protects cross-border admissibility
- Dimas has no Journal card
- Arman unlock timing remains after verified introduction dialogue
- no Elena villain coding

## Evidence

- each item advances story
- each item states support and limit
- Phase IV evidence does not prove Decision Owner
- current cache evidence and choice outcomes persist

## Audio

- current score lifecycle preserved
- reveal footsteps preserved
- dialogue ducking preserved
- scene exit cleanup preserved
- Return to Title cleanup preserved
- no extra global audio owner

## Save and State

- defaults and migrations preserved
- location-card auto-transition preserved
- video-boundary restore preserved where implemented
- Developer jump preserved
- completed-state behavior preserved
- Arman Journal read/unread persistence preserved

## Regression before Phase V delivery

- Chapter I Character hidden
- Chapter II North unlock timing
- all existing Character discovery contracts
- Dev Unlock silent
- Maya-first profile switching
- Arman profile switching
- Phase III completion and handoff
- Phase IV natural and Skip routes
- Thai and English
- mobile widths
- Save export/import where changed code can affect it

---

# 44. AUTHORITATIVE CHARACTER RESPONSIBILITY BIBLE

## Status and precedence

`OWNER-DELEGATED CANON LOCK · AUTHORITATIVE FOR FUTURE WRITING`

This section locks responsibilities, knowledge boundaries, legal limits, narrative functions and ending paths required through Chapter VII. Where this section conflicts with an older broad description, this section wins unless the owner later revises it.

## Universal character-writing contract

Every named or speaking character must have:

1. defined story role
2. defined legal or operational authority
3. personal objective
4. fear or protected interest
5. blind spot
6. knowledge boundary
7. evidence relationship
8. reason for cooperation or resistance
9. consequence path
10. writing prohibition

No character may:

- know facts without a source
- command outside authority
- lose competence to make a puzzle easier
- become suspicious only through lighting or music
- disappear after one clue without explanation
- become murderer because the player accused them
- confess in place of evidence
- solve another specialist’s function without reason

## 44.1 Benedict

### Identity and legal standing

- Age: 42
- independent detective
- external investigative consultant
- Bangkok base
- surname and nationality must not be invented without owner approval

May:

- inspect authorized evidence copies
- attend consensual interviews
- recommend strategy
- conduct voluntary interviews
- make deductions
- act to protect life in emergencies

May not:

- issue police orders
- obtain warrants in his own name
- compel testimony
- seize property
- command foreign police
- certify evidence

### Objective, fear and blind spot

Objective:

- find the person who owned the final decision without sacrificing someone to an easier institutional story

Protected interest:

- North’s agency and survival

Fear:

- being right but legally unusable
- protecting North by excluding her

Blind spot:

- may underestimate how much admissibility controls outcome

### Knowledge boundary

- Chapter I: room staged, warning targets investigators
- Chapter II: Daniel followed Room 1807, 18-07 and corrected time
- Chapter III: architecture, credential and operator differ
- Chapter IV: Dimas is proxy, Arman is toolmaker, North is marked
- Chapter V: learns Kawin, Rin and Elena’s presence theory
- Chapter VI: develops Elena theory but needs joined evidence
- Chapter VII: makes final accusation

He never knows Elena is killer merely from intuition.

### Ending effects

- True Conviction: theory survives legal testing
- Right Name, No Case: identifies Elena but cannot bridge proof gap
- False Conviction: mistakes culpability for murder ownership
- The Perfect Record: loses to broken custody, missing witness or fatal contradiction

### Writing prohibitions

- no magical lie detection
- no police command
- no uninformed use of North as bait
- no flawless deduction without evidence
- no melodramatic speech replacing craft

## 44.2 North

### Identity and authority

- Age: 32
- Singaporean
- Bangkok resident and operational base
- independent IT specialist and technical investigator
- surname must not be invented without owner approval

May:

- analyse lawfully supplied copies
- build isolated forensic models
- compare signatures, routes and event structures
- advise technical teams
- preserve analysis hashes

May not:

- access live systems without local authorization
- initiate intrusion
- seize hardware
- certify police evidence
- treat route or credential as identity

### Objective, fear and blind spot

Objective:

- build a conclusion that remains true when system labels mislead

Protected interest:

- partnership with Benedict and integrity of her work

Fear:

- being protected by exclusion
- analysis used while agency ignored

Blind spot:

- may privilege technical elegance over emotional cost

### Evidence relationship

- uses sanitized copies
- creates reproducible outputs
- cannot replace Farid’s raw mirror
- cannot replace Ratchata’s physical findings
- hidden outputs need authenticated preservation

### Ending effects

- True Conviction: alive, credible and publicly restored
- Right Name, No Case: alive but possibly hidden or hunted
- False Conviction: analysis selectively used against wrong principal
- The Perfect Record: framed, discredited, officially dead or erased

### Writing prohibitions

- never passive
- never helpless hostage
- never unauthorized intrusion merely because she can
- no romance with Farid

## 44.3 Elena Sutham

### Identity

- Full name: Elena Sutham
- Age: 38
- Thai
- Senior Forensic Systems Analyst
- Meridian Evidence Systems, Bangkok
- public role: trusted forensic ally
- owner-secret role: mastermind, physical killer and Decision Owner

### Authority

May:

- review assigned forensic-system records
- validate structure and metadata
- prepare technical interpretations
- submit signed analytical packages
- access continuity tools relevant to assignment

May not:

- command police
- authorize arrests or warrants
- certify Ratchata’s medicine
- remain sole custodian after compromise
- control public release in her own name

### Professional history and ideology

A decade earlier, a truthful mass-casualty evidence project became unusable because records fragmented across agencies. Elena drew the wrong lesson: institutions cannot act on truth unless a stable record tells them what happened.

She moved from preserving continuity to curating certainty, then to deciding which truths institutions were allowed to see.

### Objective, fear and blind spot

Objective:

- produce an official chronology that survives scrutiny and preserves her control over institutional meaning

Protected interest:

- professional legitimacy and Continuity Protocol

Fear:

- a world admitting that a valid record can tell a false story

Blind spot:

- underestimates intimate loyalty, Benedict’s reading of intent and North’s refusal to confuse valid process with true operator

### Genuine limits

Elena does not know:

- every Benedict–North conversation
- all Farid alternative copies
- every inference Rin made
- whether Adrian kept every locator
- how far Arman will cooperate
- which evidence the player preserved outside expected path

### Relationship locks

- Kawin: governance colleague who challenged 18-07 reuse
- Daniel: trusted her due to a prior genuine correction
- Rin: Registrar liaison who could identify emergency path
- Kittisak: respected police commander, neither subordinate nor superior to her professionally
- Somchai: operationally cordial
- Ratchata: scientific respect and methodological conflict
- Adrian: visible architect and plausible scapegoat
- Arman: blind-broker supplier who did not receive her identity
- Narin: local deployment specialist whose crimes can absorb blame
- Ika: compartmentalized operator who does not receive Elena’s identity directly

### Evidence against her

Individually explainable:

- legitimate package access
- slightly early knowledge
- pier presence
- sequence-control recommendations
- links to both victims
- access to Narin requests

Decisive only when combined with:

- Rin corroboration
- Ratchata timeline
- watcher structure
- controlled-leak result
- deployment separation
- motive and opportunity
- discovery-timing ownership

### Writing prohibitions

- no villain coding
- no suspicious smile
- no evil monologue before evidence
- no omniscience
- no false science
- no direct contact with every operative
- no personality replacement at reveal

## 44.4 Police Captain Kittisak Siriwat

### Identity and authority

- Age: 40
- Police Captain / ร้อยตำรวจเอก
- Investigation Inspector / สารวัตรฝ่ายสืบสวน
- Bangkok Metropolitan Special Investigations and Evidence Coordination Unit

May:

- assign police personnel
- coordinate warrants
- authorize internal audits
- request witness protection
- control custody and secure transport
- approve controlled leaks
- recommend official prosecution path

May not:

- command foreign police
- certify medicine or digital findings personally
- allow Benedict police powers
- conceal exculpatory evidence

### Objective, fear, blind spot and secret

Objective:

- bring a case that survives court without sacrificing wrong person

Protected interest:

- officers and legitimacy of investigation

Fear:

- exposing compromise before real operator identified

Blind spot:

- delayed disclosure may look like concealment

Real secret:

- authorized a compartmentalized internal check during Chapter II after seeing 18-07 irregularity

### Ending effects

- True Conviction: submits correct case and accepts scrutiny
- Right Name, No Case: preserves sealed dissent file
- False Conviction: signs or fails to stop alternative case
- The Perfect Record: removed, discredited or forced to certify false chronology

## 44.5 Police Senior Sergeant Major Somchai Rattanakul

### Identity and authority

- Age: 48
- Police Senior Sergeant Major / ดาบตำรวจ
- senior field investigator in Kittisak’s unit
- not related to Rin

May:

- conduct assigned inquiries
- canvass witnesses
- retrieve CCTV through process
- transport and guard evidence under order
- assist arrests
- lead a delegated field detail

May not:

- issue warrants
- command Kittisak
- approve cross-border operations
- certify evidence
- release case information independently

### Objective, fear, blind spot and secret

Objective:

- anchor case to streets, rooms, vehicles and hands

Protected interest:

- field team safety and reputation

Fear:

- practical shortcut interpreted as betrayal

Blind spot:

- may dismiss technical anomaly as paperwork failure

Real secret:

- rerouted a sealed transfer through a service entrance to avoid media and failed to log the intermediate stop, creating a real custody challenge without malicious intent

## 44.6 Ratchata (Dr. Singh)

### Identity and authority

- Full professional identity: Dr. Ratchata Singh
- Age: 43
- Thai Sikh
- Senior Medical Examiner
- Bangkok Metropolitan Medical Examiner Office

May:

- conduct and supervise post-mortem examination
- certify biological findings
- issue independent opinions
- request re-examination and preservation
- refuse unsupported wording

May not:

- command police
- certify digital attribution
- decide final accused
- change scientific times to fit theory

### Objective, fear, blind spot and secret

Objective:

- ensure body is never forced to agree with record

Protected interest:

- scientific independence

Fear:

- valid report used inside false chronology

Blind spot:

- initially treats timing correction as administrative because toxicology is genuine

Real secret:

- noticed discrepancy earlier but delayed escalating it as an administrative issue

## 44.7 Inspector Cheryl Goh

### Identity and authority

- Age: 40
- Singaporean Chinese
- Inspector
- Cross-Border Digital Evidence Liaison

In Singapore may coordinate lawful access, direct support, authorize Farid tasking and preserve sealed copies.

Outside Singapore may liaise, witness transfer and advise admissibility.

May not command Maya or Kittisak, arrest abroad without local authority or turn Singapore possession into foreign identity proof.

### Objective, fear, blind spot and secret

Objective:

- build case surviving every jurisdiction

Protected interest:

- integrity of Singapore originals

Fear:

- urgency creates brilliant but inadmissible answer

Blind spot:

- caution may shrink a volatile opportunity

Real secret:

- knew of an unresolved alert tied to Adrian credentials before his introduction and withheld it until legal basis and identity were sufficient

## 44.8 Farid Rahman

### Identity and authority

- Age: 31
- Singaporean Malay
- civilian Digital Forensics Specialist attached to police operations

May preserve forensic images, calculate hashes, perform documented analysis, maintain lab mirrors and testify to process.

May not command Cheryl, arrest, perform foreign live intrusion, disclose sealed evidence or infer motive from code.

### Objective, fear, blind spot and secret

Objective:

- preserve enough alternatives that system cannot force one explanation

Protected interest:

- raw mirror and reproducibility

Fear:

- clean report erases contradictory data

Blind spot:

- excitement may make possibility sound like conclusion

Real secret:

- created a lawful air-gapped recovery mirror under disaster-recovery protocol before watcher cleanup

## 44.9 Inspector Maya Pranoto

### Identity and authority

- Age: 37
- Indonesian
- Inspector
- Cybercrime Operations Liaison
- Indonesian National Police, Jakarta Cyber Operations Directorate

May authorize observation, coordinate surveillance, seek Indonesian search/arrest authority, seize evidence under process, command local support and limit foreign access.

May not authorize Singapore/Bangkok actions, identify person from IP alone, permit live intrusion for speed or surrender custody without transfer records.

### Objective, fear, blind spot and background

Objective:

- expose Indonesian infrastructure use without turning Indonesia into suspect

Protected interest:

- sovereignty and unit credibility

Fear:

- foreign-led operation contaminates evidence

Blind spot:

- expects technical actors to resemble prior cybercrime suspects and underestimates institutional control

Background:

- unit previously inspected Surya Elektronik district in a counterfeit-device case, giving local familiarity without omniscience

## 44.10 Adrian Tan Wei Ming

### Identity

- Age: 45
- Singaporean Chinese
- former Principal Systems Architect
- former Meridian Evidence Systems

### Real conduct

- designed lawful architecture
- approved external contractor relationship later tied to Arman
- recognized misuse indicators
- delayed reporting
- retained protected material
- fled after fearing framing or silencing

### Relationship with Arman

Met Arman twice during legitimate failover testing. Recognizes coding habits, response grammar and wrapper philosophy. Cannot prove current handle identity, Bangkok user or victim selector.

### Objective, fear and blind spot

Objective:

- expose enough truth to stop abuse without becoming sole explanation

Fear:

- court and public prefer architect as complete answer

Blind spot:

- self-preservation delays disclosure and strengthens suspicion

## 44.11 Arman Suryadi

### Identity

- Age: 39
- Indonesian
- public cover: electronics systems consultant and silent co-owner behind Surya Elektronik
- hidden role: PALIMPSEST wrapper specialist and broker

### Real conduct

- adapted reconciliation wrapper
- added metadata scrubbing and anonymous handoff
- protected clients from attribution
- used Dimas as proxy
- accepted money without full end-use disclosure
- knew abuse was possible
- withheld records after learning of homicide investigation

### Client separation

Received:

- valid Bangkok client certificate
- deployment constraints
- timing tolerances
- delivery conditions
- blind Meridian continuity contact code

Did not receive Elena’s identity.

### Objective, fear and blind spot

Objective:

- survive prosecution and client retaliation without becoming official murderer

Protected interest:

- Dimas, records and distinction between toolmaking and victim selection

Fear:

- cooperation exposes him; silence makes him easiest killer to convict

Blind spot:

- believes controlling information equals controlling risk

### Runtime Journal contract

Current entry is implemented in Chapter IV Phase IV through the scoped `0.17.7` bridge. It must remain one card, one notification, one unread state and one Detail view.

## 44.12 Dimas Wibowo

- Age: 34
- Indonesian
- electronics repair technician and workshop manager
- former apprentice and trusted associate
- screens contact because Arman once saved family workshop after fire
- knows broker vocabulary, workshop routines and prepared script
- does not know architecture, victim names or Decision Owner
- real offences may include obstruction, false statement and concealment
- no Character Journal card
- no advanced system explanations

## 44.13 Daniel Voss

- Age at death: 38
- German
- independent investigative journalist and compliance researcher
- trusted Elena because she previously corrected a genuine metadata error
- knew Kawin/1807/18-07/corrected-time/Singapore links incompletely
- did not know Elena was killer or full architecture
- left board, handoff, draft, archive signal and notes
- never operates system after death

## 44.14 Kawin Nopparat

- Age at death: 41
- Thai
- Regional Access Governance and Compliance Auditor
- found 18-07 reactivation and emergency permissions outside purpose
- contacted Rin for original Registrar explanation
- used Daniel as external publication safeguard
- began suspecting Elena controlled internal review sequence
- carried registrar extract, audit summary and authentication fragment to pier
- Elena removed identity-bearing material and moved body to Room 1807

## 44.15 Rinrada “Rin” Sornchai

- Age: 37
- Thai
- former Identity and Access Registrar
- created or approved original legitimate emergency profile
- saw Elena near pier, Kawin with evidence wallet, Elena leaving service side with wallet and unscheduled Meridian vehicle
- did not see killing act, body movement, profile operation or Daniel murder
- went off-grid because credential could make her look like operator
- memory is incomplete and requires corroboration

## 44.16 Narin Theerachai

- Age: 41
- Thai
- Senior Continuity Deployment Engineer
- legitimate authority over continuity packages, certificates and endpoint configuration
- no authority over victims, science, police or murder records
- Elena presented tasks as continuity validation and anti-tamper deployment
- moved from belief, to suspicion, to knowing concealment after Kawin death
- real offences include unauthorized deployment, tampering, obstruction, concealment and conspiracy
- no proof of victim selection or physical killings

## 44.17 Ika Prameswari

- Age: 34
- Indonesian
- private security and recovery specialist
- receives work through Aster Recovery Solutions and compartmentalized objectives
- initially told North possesses stolen evidence
- objective escalates to disappearance or credible accident
- real offences include surveillance, attempted abduction/murder, evidence destruction and obstruction
- recruitment begins after Daniel murder, creating fatal contradiction to earlier-killer theory

---

# 45. NON-HUMAN, ROLE AND ALIAS ENTITY CANON

## PALIMPSEST

- tool family and alias
- not person
- not autonomous mastermind
- does not choose victims
- may preserve and protect delivery across broken clocks
- signed message does not by itself identify Arman
- no Character Journal card

## UNKNOWN SOURCE / Hood Feed

- digital mask
- not identity evidence
- may represent Arman in one verified session
- cannot generalize to every session
- no Character Journal card

## Temporary Operational Profile 18-07

- role-bearing profile
- originally legitimate
- later restored or reused
- proves accepted access
- does not prove operator
- no Character Journal card

## ANALYST OF RECORD

- role classification generated from analytical behavior
- initially identifies capability, not legal name
- explains why North is targeted
- not person

## CONTINUITY PROTOCOL

- Elena’s operational doctrine
- combines true records into controlled chronology
- functions through people, credentials, policy and timing
- not one sentient application

---

# 46. AUTHORITY MATRIX

| Character | Bangkok command | Singapore command | Indonesia command | Search / arrest | Digital analysis | Medical certification | Evidence custody | Public release |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Benedict | NO | NO | NO | NO | supplied copies | NO | work product | NO |
| North | NO | NO | NO | NO | authorized copies | NO | analysis hashes | NO |
| Elena | NO | NO | NO | NO | assigned advisory access | NO | limited package | NO |
| Kittisak | OWNS | NO | NO | Bangkok process | NO | NO | Bangkok command chain | institutional route |
| Somchai | delegated | NO | NO | under order | NO | NO | handles under log | NO |
| Ratchata | NO | NO | NO | NO | NO | OWNS medical | medical samples | expert report |
| Cheryl | NO | liaison authority | NO | Singapore process | advises | NO | Singapore transfer | SPF route |
| Farid | NO | NO | NO | NO | OWNS lab analysis | NO | lab mirror process | NO |
| Maya | NO | NO | OWNS | Indonesian process | authorizes local act | NO | Indonesian seizure | local institution |
| Adrian | NO | NO | NO | NO | private expertise | NO | personal material | NO |
| Arman | NO | NO | NO | NO | private/criminal expertise | NO | private cache | NO |
| Dimas | NO | NO | NO | NO | limited technician | NO | workshop items | NO |
| Rin | NO | NO | NO | NO | Registrar expertise | NO | witness materials | NO |
| Narin | NO | NO | NO | NO | deployment access | NO | enterprise handling | NO |
| Ika | NO | NO | NO | NO | operational device use | NO | unlawful possession | NO |

Location owners:

- Bangkok: Kittisak
- Singapore coordination: Cheryl
- Singapore lab process: Farid
- Jakarta and Indonesian sites: Maya
- Bangkok medicine: Ratchata for science, Kittisak for police coordination
- narrative final decision: Benedict
- technical attribution interpretation: North

---

# 47. KNOWLEDGE MATRIX

## End of Chapter I

| Character | Knowledge lock |
|---|---|
| Benedict | room staged, body moved, warning aimed at investigators |
| North | laptop selectively cleared, objects curated |
| Kittisak | official homicide facts and consultant involvement |
| Somchai | physical scene and evidence movement |
| Elena | full truth, publicly absent |
| Player | victim unidentified, `R.` unresolved |

## End of Chapter II

| Character | Knowledge lock |
|---|---|
| Benedict | Daniel investigated Room 1807, 18-07 and corrected time |
| North | duplicated profile and unstable chronology |
| Elena | full murder design and expected path |
| Kittisak | irregular authorized access exists |
| Somchai | physical custody route and detour |
| Ratchata | science genuine, timing meaningful |
| Player | Daniel dead, science true, chronology suspicious |

## End of Chapter III

| Character | Knowledge lock |
|---|---|
| Benedict | tool, deployment and Decision Owner differ |
| North | valid records can preserve false story |
| Cheryl | Singapore route and preserved original |
| Farid | raw mirror, watcher capture and alternatives |
| Adrian | architecture abused, wrapper involved |
| Elena | North reached attribution threshold |
| Kittisak | Bangkok chain compromised |
| Player | Jakarta tool route, Bangkok deployment, owner unknown |

## Current Phase IV knowledge

| Character | Knowledge lock |
|---|---|
| Benedict | Dimas is proxy, Arman is toolmaker, North is marked |
| North | threat classification and next operational location |
| Maya | Indonesian route, Arman identity and local authority status |
| Cheryl | encounter admissibility and admissions boundary |
| Farid | source-behavior match, not client identity |
| Arman | team can separate authorship from Decision Ownership |
| Dimas | team knows Arman is present |
| Elena | team reached Arman and North must be neutralized |
| Player | Arman culpable, not proved killer; North targeted |

## End of Chapter V target

- Kawin identified
- Rin testimony available
- Narin role supported
- Elena becomes fair suspect but not dominant certainty

## End of Chapter VI target

- competing complete theories exist
- controlled leak narrows chain
- Continuity Protocol exposed
- Ika operational role known

## Chapter VII pre-accusation lock

Player must access:

- physical event reconstruction
- record claims
- accepted credentials
- architect
- wrapper author
- broker
- deployer
- field operator
- physical witness
- Decision Owner theory
- custody quality
- fatal contradictions

No character supplies complete answer alone.

---

# 48. EVIDENCE OWNERSHIP AND CUSTODY MATRIX

| Evidence | Original lawful custodian | Analysis holder | Certification / testimony | Main risk |
|---|---|---|---|---|
| Room 1807 physical items | Kittisak chain | Benedict / North copies | Somchai, Ratchata where medical | staged order |
| Kawin body and samples | Ratchata medical chain | Ratchata | Ratchata | identity and chronology |
| Daniel apartment evidence | Kittisak chain | Benedict / North | Somchai | curated visibility |
| Original toxicology | Ratchata / lab dual chain | authorized analysts | Ratchata and lab | corrected metadata |
| 05:58 / 06:09 headers | Bangkok evidence system | North / Farid | digital examiners | valid misleading display |
| Singapore raw mirror | SPF lab | Farid | Farid + Cheryl | identity overextension |
| North sanitized clone | North under authorization | North | reproducibility | hidden-channel admissibility |
| Jakarta token capture | Maya chain | North / Farid copies | Maya + Farid | route mistaken for identity |
| Arman local cache | Maya after handoff/seizure | North / Farid | Maya + Arman | client identity absent |
| Dimas statement | Maya | Benedict / Cheryl | Dimas | coercion / self-protection |
| Rin statement | Kittisak protection chain | Benedict / North | Rin plus corroboration | delayed report |
| Narin logs | Kittisak / enterprise chain | North / Farid | Narin / custodian | real guilt overstated |
| Ika devices | Maya | Farid / North | Maya + Ika | later violence mistaken for earlier murders |
| Final Record package | multi-party sealed set | case team | Kittisak submission | one missing pillar changes ending |

Mandatory two-person controls:

- Elena never handles disputed digital evidence alone.
- Narin never deploys without independent logged approval after compromise is known.
- Somchai never transports disputed package without seal and second acknowledgment.
- North hidden outputs require Farid or authorized hash witness.
- final packages require jurisdiction-specific signatures and cross-reference manifest.

---

# 49. CHAPTER DUTY AND HANDOFF MATRIX

| Character | Chapter IV | Chapter V | Chapter VI | Chapter VII |
|---|---|---|---|---|
| Benedict | exposes proxy, negotiates Arman | reconstructs Kawin, earns Rin trust | builds competing theories | confrontation and accusation |
| North | triangulation, marked | hidden analysis, Registrar map | telemetry and leak analysis | technical Last Record |
| Elena | remote ally, secretly orders removal | helps expose Narin, controls interpretation | activates Protocol | defends chronology |
| Kittisak | contains Bangkok chain | commands audit and protection | authorizes leak and breach response | secures official path |
| Somchai | traces physical handling | finds handoff and extraction route | executes distribution | protects site/witness/evidence |
| Ratchata | preserves samples | identifies Kawin | protects medical chain | physical contradiction |
| Cheryl | admissibility and joint authority | Singapore support | cross-border preservation | authenticates records |
| Farid | remote source verification | hidden-channel authentication | telemetry and mirror protection | proves original vs rewrite |
| Maya | local Arman operation | Indonesia-side false success | Ika evidence and transfer | authenticates seizure |
| Adrian | limited architecture help | explains original intent | warns of Protocol | witness or accused |
| Arman | identity reveal and admissions | identifies deployment signature | assists relay or withholds | witness, fugitive or accused |
| Dimas | proxy and workshop witness | optional protected statement | corroborates presence | minor witness |
| Rin | not public | Last Witness introduction | protected witness / target | testimony and survival |
| Narin | operational shadow | identified as deployer | main internal suspect | accomplice, witness or accused |
| Ika | not identified | attacks North | false-success pressure | operational witness or fugitive |

Current Chapter IV deliverables satisfied by implemented Phase IV:

- Arman identity established
- Dimas proxy explained
- authorship separated from murder
- North threat established
- Phase V location justified
- consequence choices stored

---

# 50. SUSPECT CASE PACKAGES

## Elena

Means:

- legitimate forensic access
- sequence and milestone control
- both victims’ context
- ability to direct Narin through legitimate-looking requests

Motive:

- protect Continuity Protocol and institutional control

Opportunity:

- pier presence
- Daniel trust
- timing control

Required corroboration:

- Rin
- Ratchata
- controlled leak
- signed-package path
- victim relationship
- discovery-timing decision

Fatal gap when incomplete:

- presence and access alone do not prove murder or final decision

## Adrian

Means:

- architecture, tokens and system knowledge

Real charges:

- enabling, concealment, obstruction and unlawful retention

Fatal contradiction:

- no proved local victim selection or physical murder path

## Arman

Means:

- wrapper, metadata scrub and broker route

Real charges:

- cybercrime, brokerage, obstruction and concealment

Fatal contradiction:

- no proved Bangkok presence or victim selection

## Narin

Means:

- valid deployment access, packages and cleanup execution

Real charges:

- tampering, obstruction, conspiracy and unauthorized access

Fatal contradiction:

- controlled-leak and target-priority evidence show he receives final decisions

## Ika

Means:

- surveillance, violence, device recovery and accident staging

Real charges:

- attempted murder, abduction and obstruction

Fatal contradiction:

- recruitment begins after earlier murders

---

# 51. ENDING FATE MATRIX

Legend:

- `TC` True Conviction
- `RN` Right Name, No Case
- `FC` False Conviction
- `PR` The Perfect Record

| Character | TC | RN | FC | PR |
|---|---|---|---|---|
| Benedict | correct case survives | knows truth, cannot complete charge | lives with wrong principal | defeated/discredited |
| North | alive and restored | alive, hidden or hunted | analysis misused | framed or erased |
| Elena | convicted | identified but escapes | credible while another convicted | authors accepted history |
| Kittisak | submits correct case | preserves dissent file | institution accepts wrong case | removed or forced to certify |
| Somchai | cleared and recognized | cleared with custody gap | findings support wrong theory | scapegoated |
| Ratchata | anchors physical truth | proves murder, not owner | truth attached to wrong principal | samples excluded/lost |
| Cheryl | authenticates case | preserves sound file | genuine evidence overextended | Singapore file isolated |
| Farid | mirrors corroborate | proves manipulation only | tool evidence overextended | mirrors destroyed/dismissed |
| Maya | supports proportionate charges | convicts Arman/Ika offences | Arman evidence overstated | local evidence excluded |
| Adrian | cooperating witness, real charges | real charges, Elena escapes | convicted as mastermind | permanent scapegoat |
| Arman | convicted for cyber offences | real charges, Elena escapes | convicted as murder principal | accepted foreign mastermind |
| Dimas | reduced charge/immunity | protected/disappears | coerced witness | silenced/absorbed |
| Rin | protected and corroborated | survives without legal bridge | presence used with wrong owner | lost/discredited/blamed |
| Narin | convicted for accomplice offences | real offences only | convicted as murderer | official rogue insider |
| Ika | convicted for North operation | real violence only | overstated hired killer | disappears/lone operative |

False Conviction epilogue must state:

1. real offences correctly proven
2. murder attribution that was wrong

---

# 52. CHARACTER JOURNAL AND DISPLAY LOCK

## Existing Runtime entries

Current authoritative or implemented entries include:

- Benedict
- North
- Elena
- Somchai
- Kittisak Siriwat
- Ratchata (Dr. Singh)
- Inspector Cheryl Goh
- Farid Rahman
- Adrian Tan Wei Ming
- Inspector Maya Pranoto through Chapter IV extension
- Arman Suryadi through Chapter IV Phase IV scoped Journal extension `0.17.7`

## Future entries

- Kawin after Chapter V identity reconstruction
- Rin after physical introduction and consent
- Narin after identity and role verification
- Ika after physical identity or lawful operational identification

## No entry

- Dimas unless owner later promotes him
- PALIMPSEST
- 18-07
- Hood Feed
- Analyst of Record
- Continuity Protocol
- unnamed aliases

## Arman display and persistence lock

- one card only
- one profile only
- role: wrapper specialist / technical broker
- face and upper torso prominent
- card survives registry reconciliation
- card survives Save/Load
- first story unlock generates one notification and unread dot
- Journal open clears unread
- Dev unlock silent
- no Chapter I leakage

## Runtime role-label debt

Kittisak current override:

- `Kittisak Siriwat`
- `กิตติศักดิ์ ศิริวัฒน์`
- `Police Captain`
- `ร้อยตำรวจเอก`

Future display may add Inspector function.

Somchai future scoped correction:

- `Police Senior Sergeant Major`
- `ดาบตำรวจ`

---

# 53. KNOWLEDGE-CONTINUITY WRITING CHECK

Before writing any scene, answer:

1. What does each present character know?
2. From which source?
3. When did they learn it?
4. Has that source been shared?
5. Is information proven, supported or assumed?
6. Does character have authority to act?
7. Who owns evidence?
8. What would character protect?
9. What mistake is plausible?
10. Which later chapter receives consequence?

A scene fails when:

- Elena knows undisclosed private fact without source
- Benedict orders police
- North uses live system without authorization
- Somchai approves warrant
- Kittisak certifies science
- Ratchata identifies digital operator
- Cheryl commands Maya
- Maya seizes Singapore evidence
- Farid infers motive from code
- Adrian knows victim-selection facts
- Arman knows Elena directly without earned evidence
- Dimas explains architecture
- Rin witnesses more than locked pier events
- Narin owns final target selection
- Ika appears before recruitment

---

# 54. FINAL CHAPTER HANDOFF GUARANTEE

## Chapter IV deliverables

Current implementation satisfies:

- Arman identity established
- Dimas proxy explained
- authorship separated from murder
- North threat established
- Phase V location justified
- consequence choices stored
- Arman Character Journal contract active

## Chapter V deliverables

- Kawin identified
- Rin introduced
- pier event reconstructed
- Narin role supported
- Elena becomes fair but not dominant suspect
- physical and human evidence added

## Chapter VI deliverables

- Continuity Protocol explained
- controlled-leak result
- Authority Chain reconstructed
- Ika role established
- at least two plausible principal theories remain
- evidence losses and survivals locked

## Chapter VII deliverables

- Last Record complete
- fatal contradictions visible
- final accused selected
- institution response calculated
- one of four endings rendered
- each major character receives consequence

Absolute final rule:

- correct answer feels earned
- wrong answer feels understandable
- worst ending feels caused
- no ending feels random

---

# 55. CHARACTER RESPONSIBILITY UPDATE RECORD

This Master Plan preserves and locks:

- Benedict authority and final responsibility
- North nationality, legal limits and hidden-channel role
- Elena full identity, ideology, limits and relationships
- Kittisak rank, authority, secret and command role
- Somchai full identity, custody gap and field role
- Ratchata institution and independent physical-truth role
- Cheryl jurisdiction and disclosure boundary
- Farid lawful recovery mirror
- Maya authority and local familiarity
- Adrian relationship to Arman and limits
- Arman cover, client separation and current Journal implementation
- Dimas as fixed Phase IV proxy
- Daniel trust network and posthumous material
- Kawin discovery and Room 1807 logic
- Rin exact witness scope
- Narin as named Local Deployer
- Ika as named Field Watcher
- non-human entity rules
- authority and knowledge matrices
- evidence custody
- duty handoffs
- suspect packages
- ending fate matrix
- current owner-approved Runtime baseline
- defect and recovery history through `0.17.18`

---

# 56. PHASE IV IMPLEMENTATION AND OWNER-DEVICE VERIFICATION LOG

## Status vocabulary

- `DEPLOYED CANDIDATE`: present for repair/testing
- `PRELIMINARY SMOKE PASS`: limited owner observation
- `OWNER-APPROVED CONTRACT`: owner explicitly confirms a named behavior
- `CURRENT STABLE BASELINE`: latest owner-confirmed Runtime starting point
- `FROZEN`: owner approval plus explicit freeze declaration
- `MAINTENANCE-LOCKED`: accepted current scope; reopen only for a verified defect or essential owner-approved need

## History

### Initial Phase IV implementation

- Commit: `0cbece8853e8049d5a7af1b2bfa4b954d1bc8586`
- Build: `0.17.0`
- Result: rejected for visual and consistency defects

### Developer jump repairs

- `5ea29ca53feaeb3ce8e38f8dc580cd9a0fa02eb8`: insufficient
- `ea3b30d617b347ed04df02f4d3e5fff8a321540c`: Phase III and IV entry materially improved

### Presentation and consistency candidates

- `cd681faab50153c4e0ef7d5d2d8fa792be01b367`: owner found title-card inconsistency, missing HUD, portrait and progress defects
- `090442b6a64f12912ab4bf0b42c3e607c2006836`: consistency repair
- `6fe7097376a20d2e59c5d5c077d302920522c959`: scoped Journal and portrait repair, early-story gate still defective

### Rejected global Character discovery build

- Commit: `5adfbaa4be1bf4f834323b291a23a51d03b47146`
- Build: `0.17.5`
- Severity: blocker
- Result: Chapter I dialogue and buttons failed
- Cause: broad global wrapping and observation of Character discovery/state
- Status: rejected, never use as stable baseline

### Full-game recovery

- Commit: `02e1dcf7e024a3db26572cf035d3449186f2ab6a`
- Build: `0.17.6`
- Result:
  - restored playability
  - removed unsafe global discovery system
  - restored Chapter I Journal hiding
  - restored Chapter II timing
  - corrected most Phase IV defects
- Remaining defect: Arman missing from Journal and no unread notification

### Arman Journal contract repair

- Commit: `8a70778dffbdea65c7ba37954673be11b547f3b2`
- Build: `0.17.7`
- Scope:
  - retains Arman card after base registry filtering
  - adds one-time notification
  - adds unread dot
  - preserves Save/Load
  - clears unread on Journal open
  - repairs 0.17.6 missing-card saves
  - keeps Dev unlock silent
  - avoids Chapter I leakage
  - uses scoped Phase IV extension rather than new global manager
- Owner result: latest round passed
- Status: `HISTORICAL OWNER-APPROVED ARMAN JOURNAL BASELINE · PRESERVED IN 0.17.18`

### Character notification and unread-dot repair chain

- Final contract build: `0.17.14`
- Final Production commit in this chain: `0ebebd2109309a3abe76f858d641a81274e54fe9`
- Scope:
  - Somchai and Kittisak story notification timing
  - Adrian dynamic Hawker introduction timing
  - Adrian unread red dot
  - pre-verification Hawker dot suppression
  - silent Developer behavior
  - affected-save recovery without duplicate notification
- Intermediate `0.17.8` through `0.17.13` attempts remain historical and must not be treated as current contracts.
- Owner result: Character Added and unread-dot behavior passed on the latest inspected routes.
- Status: `OWNER-APPROVED CONTRACT · PRESERVED IN CURRENT BASELINE`

### Dialogue History and Case File scroll UX

- Commit: `4cdcaf00c74d206d092d5d5d7dcc06bff55e6bfa`
- Build: `0.17.15`
- Scope:
  - Dialogue History opens at the latest line
  - chronological order remains unchanged
  - manual upward review is not pulled down
  - floating `Latest` control returns to the newest entry
  - Case File keeps accepted reading/scroll behavior
  - top close control remains reachable
- Owner result: passed.
- Status: `OWNER-APPROVED CONTRACT · PRESERVED IN CURRENT BASELINE`

### Phase action and Forensic geometry standard

- Commit: `190dd3bae7573582fae38eafdfda3d9f91db96d1`
- Build: `0.17.16`
- Scope:
  - consistent centred free-standing phase/review buttons
  - mobile width and text fit
  - Chapter II Forensic `CHAIN OF CUSTODY` stack correction
- Owner result: passed in the current inspection.
- Status: `OWNER-APPROVED VISUAL CONTRACT · PRESERVED IN CURRENT BASELINE`

### Chapter III Phase VIII Secure Mirror containment

- Commit: `a9630dd120bff1df2fc7305a7d35337b2d298250`
- Build: `0.17.17`
- Scope:
  - Secure Mirror Access and Console cards contained within the padded modal viewport
  - centred borders and complete right edge
  - no Puzzle, State, Save, evidence or audio ownership changes
- Owner result: passed.
- Status: `OWNER-APPROVED VISUAL CONTRACT · PRESERVED IN CURRENT BASELINE`

### Chapter IV Phase IV minigame containment

- Commit: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- Build: `0.17.18`
- Scope:
  - Cache Review card centring
  - Persona Triangulation card centring
  - result and disposition card centring
  - mobile cache-header control fit with complete review label
  - preservation of all prior geometry contracts
- Owner result: all currently reported defects passed; current state accepted for forward development.
- Status: `CURRENT OWNER-APPROVED RUNTIME BASELINE · MAINTENANCE-LOCKED`

## Current no-regression lock

Future packages must not disturb:

- Chapters I–III gameplay
- Chapter IV Phase I–IV current implementation
- Chapter I Character hiding
- Chapter II North unlock timing
- one-time Character notifications and unread dots
- Maya profile switching
- Arman card, profile, persistence and read state
- Phase III direct handoff
- Developer entries
- Dialogue History and Case File scroll contracts
- centred free-standing action controls
- Forensic, Phase VIII and Phase IV modal geometry contracts
- Save schema outside scoped need
- current audio owners
- accepted portraits, scenes and HUD

---

# 57. CURRENT OWNER-APPROVED RUNTIME BASELINE 0.17.18

## Baseline identity

- Commit: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- Message: `Fix Phase IV minigame centering`
- Branch: `production-rebuild`
- Build: `0.17.18`
- Date recorded: `2026-08-03 17:49 ICT`

## Owner-confirmed current state

- all defects presently identified in the latest inspection passed the owner-device check
- Character Added notifications and unread dots operate at the accepted timing on the inspected routes
- premature Adrian Hawker red-dot behavior is closed
- Dialogue History and Case File scrolling are accepted
- phase/review action widths and centring are accepted
- Chapter II Forensic bottom-stack overlap is closed
- Chapter III Phase VIII Secure Mirror modal overflow is closed
- Chapter IV Phase IV minigame centring and cache-header clipping are closed
- current production state is satisfactory for forward development

## Baseline interpretation

This commit is the required starting point for Chapter IV Phase V and all subsequent work.

Do not:

- branch future work from a historical repair build
- restore an older baseline that lacks the current notification, scroll or geometry contracts
- remove a scoped accepted repair without proving and testing an authoritative replacement
- reopen completed scope for elective polish or architecture cleanup
- treat a later local defect as permission for broad regression-prone rewrites

## Maintenance and freeze boundary

- Chapters I–III remain frozen.
- Chapter IV Phase I–IV are the current owner-approved no-regression baseline.
- Completed scope is maintenance-locked and should remain untouched unless a reproducible defect or essential integration need is proven.
- Current known issues are closed for the inspected scope.
- This is not a permanent guarantee that no undiscovered bug can exist.
- A future verified defect reopens only the smallest affected owner.

---

# 58. RELEASE, MAINTENANCE AND FORWARD-DEVELOPMENT LOCK AFTER OWNER APPROVAL

## Forward-development policy

The project now advances from defect-repair mode to Chapter development mode.

Default action:

> Build Chapter IV Phase V and later content on top of the `0.17.18` baseline.

Do not spend production cycles revisiting accepted work merely because another implementation might be cleaner or prettier. Existing scope may be reopened only when:

1. the owner or a tester can reproduce a real defect
2. the defect blocks progression, corrupts State/Save, misrepresents evidence or character discovery, breaks audio ownership or creates material device incompatibility
3. the next Chapter cannot integrate safely without a scoped change
4. the owner explicitly approves another essential revision

Every maintenance task must state:

- exact reproduction
- affected owner
- smallest file scope
- regression boundary
- tests actually performed
- owner-device status

## Future Phase V entry condition

Phase V implementation may begin only after:

1. latest Production commit re-confirmed
2. this Master Plan read completely
3. Phase IV state and handoff inspected
4. owner-approved assets for Phase V defined
5. threat and legal-authority blueprint approved
6. Save/Load and Dev entry designed
7. no-regression matrix includes Chapters I–IV

## Mandatory pre-delivery matrix

### Natural route

- Title
- New Game
- Chapter I dialogue and buttons
- Chapter II Journal gate
- Chapter III route
- Chapter IV Phase I–IV
- Phase IV completion or Phase V handoff

### Character route

- every current character first unlock
- no duplicate toast
- unread dot
- read clearing
- profile switching
- Thai and English
- Save/Load

### Developer route

- unlock characters
- unlock evidence
- jump every implemented phase
- repeat jumps in non-linear order
- return to Title
- New Game after Dev state

### Save route

- clean save
- stale save
- pre-Arman save
- unread Arman save
- read Arman save
- completed Phase IV save

### Media route

- natural video end
- Skip
- visibility/background interruption
- audio ducking
- phase exit cleanup

## Reporting language

A test report must separate:

- static checks
- synthetic browser checks
- assembled Runtime checks
- owner-device checks
- untested platform behavior

Never call synthetic testing an owner-device pass.

## Final no-regression rule

The owner must never again receive a package described as fully tested when the Production Bootstrap, relevant natural Runtime flow or exact affected ownership contract was not actually exercised.

Future Chapter work must preserve the `0.17.18` baseline. Completed areas are not development playgrounds; they are protected dependencies. Test what the new work can affect, report limits honestly and return to an accepted area only when a verified need exists.

---

# 59. OWNER DECISION · FORWARD DEVELOPMENT FROM 0.17.18

## Decision recorded

- Date: `2026-08-03 17:49 ICT`
- Owner result: current inspected scope passed
- Current satisfaction level: suitable to proceed with production
- Current active blockers: none reported
- Next normal objective: `CHAPTER IV · PHASE V · NORTH IS MARKED`

## Owner direction

- Treat the current game through Chapter IV Phase IV as the working no-regression baseline.
- Move forward to the next Chapter/Phase.
- Do not return to completed scope for optional improvement.
- Revisit completed scope only when a real bug is discovered or another change is genuinely necessary.
- A later discovered bug is handled as a new scoped maintenance item; it does not erase the current approval.

## Protected accepted contracts

- Character Added timing
- unread red-dot timing and read clearing
- silent Developer unlock behavior
- Dialogue History latest-position and `Latest` navigation
- Case File scrolling behavior
- standardized centred phase/review actions
- Forensic bottom-stack separation
- Secure Mirror modal containment
- Chapter IV Phase IV minigame centring and complete cache-header controls
- current Save/Load, audio, evidence, progression and Chapter handoff behavior

## Production posture

> Preserve what passed. Build what comes next. Repair only what can be proved broken.

---

# END OF MASTER PLAN
