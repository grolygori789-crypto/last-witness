# LAST WITNESS — GAME MASTER PLAN

> **CANONICAL MASTER REFERENCE / ZERO-QUESTION CONTINUATION CONTRACT**
>
> **Revision:** 2026-08-19 17:55 ICT  
> **Game:** LAST WITNESS  
> **Studio:** BENEDICT INTERACTIVE  
> **Repository:** `grolygori789-crypto/last-witness`  
> **Production/default branch:** `production-rebuild`  
> **Latest inspected Production HEAD:** `656723b5a41bebb9601e686ab94cd5c999f6b739`  
> **HEAD message:** `Fix CH5P2 persistent audio lifecycle`  
> **Authoritative Production base Runtime:** `0.22.17`  
> **Current Chapter V Phase II module:** `0.22.17-c5p2r13`  
> **Current Chapter V loader:** `0.22.17-c5b23`  
> **Current Narin Character Registry extension:** `0.22.17-nj7`  
> **Current Runtime bootstrap:** `0.22.17-r5`  
> **Current Developer Navigation:** `0.22.17-d9`  
> **Current North QA:** `0.22.17`  
> **Current Runtime Build Label:** `0.22.17`  
> **Current Save Manager:** `0.7.10-s5`, scoped save-facing identity `0.22.17-s9`  
> **Current Chapter V Owner Walkthrough extension:** `0.22.11-c5w4`  
> **Current Chapter V Phase II Hidden Case extension:** `0.22.11-c5h3`  
> **Current playable implementation boundary:** `CHAPTER I → CHAPTER V · PHASE II`  
> **Current owner acceptance boundary:** `CHAPTER I → CHAPTER V · PHASE I accepted/frozen; CH5P2 built but NOT owner-accepted due open physical-Android defects`  
> **Immediate production priority:** `CLOSE CH5P2 BLOCKING DEFECTS BEFORE CH5P3`  
> **Adaptive model:** `P8 CALCULATE → Ch V INFLUENCE → Ch VI DIVERGE → Ch VII RESOLVE`

This revision supersedes the 2026-08-17 Master Plan status while preserving all non-conflicting canon, architecture, UI, QA, Hidden Case, ending, release and regression rules from the earlier plan. Omission is never permission to invent different canon.

---

# 0. SOURCE OF TRUTH / OWNER OVERRIDE

When information conflicts, use this order:

1. **P'Benz's latest explicit instruction or physical-device observation**
2. **current Production Runtime on `production-rebuild`**
3. **this `GAME_MASTER_PLAN.md`**
4. owner-approved binary assets
5. repository history / QA evidence
6. older handoff documents
7. assistant memory

A physical Android result overrides local tests, browser harnesses, static checks, mocked media, source intent, previous assistant confidence and prior validation reports.

## GitHub write rule

Do **not** write GitHub unless P'Benz explicitly authorizes a GitHub write in the current turn.

Normal workflow:

`inspect Production → isolate scope → local repair → test → package → P'Benz uploads → re-inspect landed Production → owner physical test`

Old permission never carries forward.

## Mandatory project-file delivery rule

Every delivered LAST WITNESS project file/package must include a proposed **Commit Name**:

- 50 characters or fewer
- scope-accurate
- in a copyable Markdown code block
- included automatically without waiting for P'Benz to ask

A missing Commit Name is a handoff defect.

## Canon preservation rule

Never silently drop locked detail. When a needed implementation detail is not repeated verbatim here:

1. inspect current Production first
2. inspect this Master Plan and paired Migration Prompt
3. inspect relevant repository history / prior Master Plan only when needed
4. apply the newest owner/status/freeze rule over older detail
5. do not ask P'Benz to repeat recoverable decisions

## QA honesty

Use exact language:

- Node syntax = Node syntax
- static source inspection = static inspection
- Chromium/browser harness = browser harness
- real HTMLMediaElement in browser = browser real-media test
- mocked media = mocked media
- physical Android Chrome = only P'Benz's actual device result

Never call a patch Android-tested or Android-PASS without P'Benz's physical confirmation.

---

# 0A. ZERO-QUESTION NEW-ROOM STARTUP PROTOCOL

A new room must be able to continue without asking P'Benz to restate locked information.

Before doing LAST WITNESS work, the assistant must:

1. read this file completely
2. read `LAST_WITNESS_ROOM_MIGRATION_PROMPT.md` completely
3. inspect current Production HEAD on `production-rebuild`
4. compare it with this handoff baseline `656723b5a41bebb9601e686ab94cd5c999f6b739`
5. determine whether newer commits are runtime-changing or docs-only
6. verify the current base Runtime and every affected linkage endpoint
7. preserve accepted/frozen systems
8. close CH5P2 blocking defects before starting CH5P3 unless P'Benz explicitly changes priority
9. ask a question only when a genuinely new owner-level design/canon choice cannot be recovered from Production, this plan, the migration prompt, approved assets or repository history

Never ask P'Benz to repeat:

- repository / branch
- build/version discipline
- Chapter IV phase count
- Chapter V–VII structure
- Elena historical truth
- Kavin identity
- Rin / `R.` identity
- Hidden Case architecture
- endings
- UI reuse rules
- dialogue geometry freeze
- Save/Load rules
- Owner Dev / North QA separation
- audio lifecycle expectations
- current Phase II defects
- current next objective

---

# 1. PROJECT / VISUAL IDENTITY

LAST WITNESS is:

- mobile-first portrait 9:16
- Android Chrome primary practical target
- modern iOS Safari secondary
- neo-noir graphic-novel / cinematic investigation
- cel-shaded / illustrated realism
- strong ink contours and angular shadows
- restrained dark surfaces
- warm gold + muted blue/cyan accents
- premium mobile readability
- serious crime-adventure tone
- investigation first, spectacle second
- one coherent product language from Chapter I through Chapter VII

The game must feel like one shipped product, not separate chapter prototypes.

---

# 2. REGRESSION FIREWALL / SURGICAL CHANGE — OWNER NON-NEGOTIABLE

The most important engineering rule is:

> **DO NOT TOUCH A WORKING SYSTEM UNLESS THE CURRENT TASK ACTUALLY REQUIRES IT.**

Before every change:

1. identify the exact reproduced defect / requested feature
2. identify the smallest authoritative source that owns it
3. list the intended changed-file allowlist
4. freeze everything outside that allowlist unless linkage forces a narrowly justified change
5. compare changed files against Production
6. test the target behavior and accepted neighboring behavior
7. package only the intended paths

If the owner asks for two changes, make two changes. Do not opportunistically polish a third area.

A correct target fix with collateral regression is a failed release.

## Permanent regression lessons

- CH5P1 r9 proved unrelated “while we are here” polish can invalidate a targeted repair.
- CH4P8 stack repair proved the preferred style: one narrow authoritative fix, fresh linkage, no story/state/audio redesign.
- broad MutationObserver/class-repair strategies that fight the shell caused startup/UI damage in the past and must not return as generic fixes.
- mocked/browser audio success does not override a physical Android failure.
- repeated watchdog/timer additions are not a substitute for repairing actual audio ownership.

---

# 3. INTERFACE / UI PRESERVATION CONTRACT

Operating rule:

> **STUDY THE PROVEN SHELL → PRESERVE THE SHELL → CHANGE ONLY CONTENT / INTERNAL PAYLOAD.**

Before making an ordinary scene, dialogue surface, HUD, Progress UI, card, evidence panel, location/time card or completion card:

1. inspect the closest owner-approved Production implementation
2. reuse its DOM hierarchy / CSS primitives where feasible
3. preserve safe-area behavior and mobile interaction rhythm
4. introduce a new shell only when the existing shell cannot satisfy the requirement

Preferred ordinary-scene foundation:

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

Without explicit owner approval, do not redesign:

- dialogue height / bottom position
- portrait well / grid proportions
- dialogue frame / radius
- Progress geometry
- HUD / Save / Menu geometry
- normal card geometry
- typography hierarchy
- button shapes
- safe-area behavior
- accepted chapter/completion-card language

Minigames may have bespoke mechanics but must remain visibly LAST WITNESS, mobile-readable, no trap states and consistent with the existing shell.

---

# 4. DIALOGUE / PORTRAIT / PRESENTATION LOCK

The accepted Chapters I–IV dialogue geometry remains frozen. Do not move Dialogue to fix unrelated UI.

Portrait QA fails when:

- head/face is unintentionally clipped
- white matte/halo/source edge is visible
- identity drifts
- image stretches
- framing is excessively tight or tiny
- face is badly off-center
- local repair changes every portrait globally

Preferred repair order:

1. preserve dialogue shell
2. verify asset
3. `overflow:hidden`
4. `object-fit` / `object-position`
5. minimal scale/translate
6. keep important head/face complete
7. use another already-approved source only when necessary

## Native bilingual dialogue standard

English and Thai are two native cinematic performances of the same dramatic intent, not literal translations.

Both preserve facts, implication, subtext, emotional temperature and character voice.

Unknown-principal language stays gender-neutral until canon permits otherwise.

---

# 5. CURRENT PRODUCTION BUILD / LINKAGE — 2026-08-19 17:55 ICT

Current authoritative Production:

- HEAD: `656723b5a41bebb9601e686ab94cd5c999f6b739`
- commit: `Fix CH5P2 persistent audio lifecycle`
- Base Runtime: `0.22.17`
- Settings: `LAST WITNESS · BUILD 0.22.17`
- Runtime bootstrap: `0.22.17-r5`
- Save Manager module: `0.7.10-s5`
- save-facing scoped identity: `0.22.17-s9`
- Narin Character Registry: `0.22.17-nj7`
- Developer Navigation: `0.22.17-d9`
- North QA: `0.22.17`
- Runtime Build Label: `0.22.17`
- CH5P2 JS/CSS: `0.22.17-c5p2r13`
- CH5 loader: `0.22.17-c5b23`
- P2 loader cache: `0237c5p2r13`
- CH5 loader cache in `index.html`: `0237c5b23`
- Narin registry cache: `0237nj7`
- bootstrap cache: `0237r5`
- save cache: `0237s9`
- CH5P2 Hidden Case extension: `0.22.11-c5h3`, cache `0231c5h3`
- Chapter V Owner Walkthrough: `0.22.11-c5w4`, cache `0231c5w4`
- CH5P1 core remains `0.22.8-c5p1r10`
- CH5P1 North portrait fix remains `0.22.8-c5n1`
- CH5P1 Police time cue remains `0.22.8-c5t1`
- Phase VIII Matrix Exit remains `0.22.7-m1`
- Chapter IV P7/P8 audio lifecycle remains `0.22.7-a1`
- Hidden Case engine remains `0.21.0`

Independent unchanged modules do not need fake-bumps merely for symmetry. Base-runtime-facing endpoints must agree when the base Runtime changes.

## Atomic base-Runtime synchronization contract

Whenever base Runtime changes, update and validate all applicable endpoints atomically:

- `index.html` visible build
- bootstrap source/version/cache
- `window.LastWitnessRuntimeBuild`
- document runtime dataset
- Settings build
- Runtime Build Label source/cache/expected
- Owner Developer visible base build + compatible module/cache
- North QA visible/base build + module/cache
- Save-facing build metadata
- diagnostics / Copy Test Info
- changed phase/module source version
- changed cache key
- loader expected version
- loader cache key
- affected walkthrough/QA endpoint when applicable
- package filename / manifest / validation / checksum identity

Any affected mismatch is a **RELEASE BLOCKER**.

Do not conceal stale linkage with cosmetic relabeling, polling or MutationObserver text replacement. Fix authoritative source/linkage.

## Documentation-only rule

Updating this Master Plan / Migration Prompt does **not** bump Runtime. Runtime stays `0.22.17` until a runtime package actually lands.

---

# 6. CURRENT UNSHIPPED REPAIR CANDIDATE — IMPORTANT, NON-CANONICAL

A local/library candidate was generated after the latest physical-device defect report but **has not been established as Production canon** at this handoff:

- ZIP: `LAST_WITNESS_CH5P2_R15_BUILD_0.22.18_PRODUCTION_PATCH_2026-08-19.zip`
- target Runtime: `0.22.18`
- target CH5P2: `0.22.18-c5p2r14`
- target CH5 loader: `0.22.18-c5b24`
- Production base used: `656723b5a41bebb9601e686ab94cd5c999f6b739`

Intended repair scope:

1. Track B/Narin physical-Android handoff resilience
2. deterministic visible Narin Journal toast after final Close Contact
3. atomic Runtime linkage to `0.22.18`

Its local validation reported browser/static/package passes, but **physical Android PASS is not claimed**.

New-room rule:

- if current Production HEAD is still `656723b5...`, this candidate may be inspected/revalidated as the latest local starting candidate
- if Production HEAD changed, rebase or discard it
- never call `0.22.18` canonical until P'Benz uploads it and landed Production is re-inspected
- never call the defects closed until P'Benz physically confirms them on Android

---

# 7. SAVE / LOAD / STATE CONTRACT

Do not create a parallel Save system.

Preserve:

- manual Save / Load
- autosave
- checkpoint
- ordinary state
- `state.chapter4`
- Chapter V flags/state
- evidence/found
- relationships
- North public-removal state
- `R.` lead
- Hidden Case / ledger-derived state
- future Rin / Last Record state
- final route only when genuinely resolved

Restore ordering remains conceptually:

1. ordinary state
2. hidden-state migration/ledger
3. ledger uniqueness
4. hidden totals recomputation
5. adaptive state where required
6. scene resume
7. correct active-scene audio

Hidden scoring must be idempotent across Load, re-entry, Restart Current, background/foreground, revisit and choice replay.

---

# 8. AUDIO LIFECYCLE — PRODUCT REQUIREMENT / ZERO TOLERANCE

Player-facing requirement:

- no phase-owned continuous media may audibly continue or unexpectedly reawaken while the app/browser is hidden
- foreground return must automatically restore the correct currently active score/ambience from the correct position/state
- no unrelated user tap should be required to wake music after foreground return
- no old phase/screen music may resurrect
- Return to Title is a hard audio boundary

Implementation method is **not** locked to one API trick. Physical Android behavior is the acceptance criterion.

Every Chapter V–VII phase with continuous media must test:

- normal scene
- dialogue
- modal/minigame
- background/minimize
- long background
- foreground return
- Save/Load
- phase transition
- Return Title

## Current CH5P2 audio status

Track A runtime assets:

- `assets/audio/chapter-05/phase-02/restricted-identity.webm`
- `assets/audio/chapter-05/phase-02/restricted-identity.mp3`

These contain the processed/looped owner-approved source derived from `nature-investigation-255161.mp3` and carry the investigative Restricted Records / Identity Reconciliation half of Phase II.

Track B runtime assets:

- `assets/audio/chapter-05/phase-02/name-changes-everything.webm`
- `assets/audio/chapter-05/phase-02/name-changes-everything.mp3`

Narrative intent:

`Track A → Kavin/Attribution turn → Secure Contact/Narin → Track B → Closing → Phase Complete`

Track B is **the same musical identity heard on the Phase Complete card and must already be playing during Narin**. It must not first appear at the end card.

Secure-call SFX:

- `secure-call-establish.wav`
- must be clearly audible on phone speakers
- should read as secure connection / filtered ringback rather than generic hacker beep
- must not steal music ownership or create a silent handoff

---

# 9. CHARACTER VOICE LOCK

- **Benedict:** experienced, concise, observant, controlled, evidence-boundary thinker, dry when natural
- **North:** calm, analytically exact, understated, sometimes dryly amused, never robotic
- **Cheryl:** precise Singapore investigator, socially perceptive, restrained warmth
- **Maya:** direct Indonesian field/legal authority, grounded and decisive
- **Farid:** low-drama technical verification, only necessary explanation
- **Kittisak:** credible institutional authority, protective logic and suspicion coexist
- **Somchai:** discreet operational professional, economical speech
- **Adrian:** lawful technical architect, exact, liability-conscious
- **Arman:** intelligent broker/toolmaker, selective and controlled
- **Ika:** guarded, capable, terse under pressure, physically credible
- **Narin:** operationally credible, pressured and defensive around real wrongdoing
- **Elena:** ordinary, kind, credible, socially normal, harmlessly fallible until late Chapter VII
- **Rin:** intelligent, frightened, evasive, procedurally compromised, distrustful of institutions
- **Ratchata:** concrete forensic / physical-evidence clarity

Elena must never receive villain cadence, loaded wording, suspicious knowing pauses or unnatural prescience before late Chapter VII.

---

# 10. OWNER DEVELOPER / OWNER WALKTHROUGH / NORTH QA

Owner Developer Mode and North QA are separate products/endpoints.

## Owner Developer

May expose Owner-only Hidden Case diagnostics and synthetic test controls.

Synthetic Hidden Case adjustments must be temporary only, with no canonical Save/ledger/state mutation.

## Owner Walkthrough

Current Chapter V extension: `0.22.11-c5w4`.

It covers Phase I and Phase II and is read-only.

Phase II walkthrough includes:

- Restricted Records / Workstation
- Identity Reconciliation Step 1 solution
- Attribution Boundary Step 2 solution
- Kavin identity reveal
- Narin lead / Secure Contact
- current Phase II endpoint

It may show hint/solution and browse/sync, but must never:

- write Save
- mutate checkpoint/progress/evidence/choices
- mutate Hidden Case
- auto-complete gameplay
- control game audio
- leak into North QA

## North QA

North QA may test routing, dialogue, UI, evidence, media, Save/Load, restart/title, mobile interaction, build label and continuity.

It must never expose:

- hidden scores/deltas
- leader/projected ending
- thresholds
- Elena gates
- choice ledger
- Owner simulator
- Owner Hidden Case controls
- Owner Walkthrough / hints / verified solutions

Blind-test integrity is a product requirement.

---

# 11. HIDDEN CASE ARCHITECTURE

The player does **not** choose the killer from a final list.

The investigation quietly builds evidentiary/legal state. The ending reveals which case the investigation became capable of proving.

Current engine:

- `js/engine/28-hidden-case-architecture.js`
- version `0.21.0`

Properties:

- deterministic
- auditable by owner
- player-invisible
- idempotent
- Save/Load safe
- relationships are not criminal-attribution scores

Principal profiles:

- Kittisak
- Narin
- Adrian
- Arman
- Ika
- Elena

Somchai remains strong cleaner/accomplice/conditional support unless explicitly promoted later.

Case dimensions include attribution, motive, means, opportunity, concealment/obstruction, corroboration, admissibility, evidence breadth, institutional/prosecutability support and contradiction pressure.

Global integrity includes evidenceIntegrity, chainOfCustody, witnessProtection, northSafety, publicRecordControl, institutionalTrust, corroborationBreadth, alternativeHypothesesPreserved, physicalTruthIntegrity, chronologyIntegrity, originalRecordIntegrity and future Rin/Last Record state.

Every scoring source needs a stable unique source ID and auditable reason.

---

# 12. HISTORICAL TRUTH / SPOILER FIREWALL

Historical truth is fixed in every ending:

- Elena is the mastermind / Decision Owner
- Elena killed **Kavin Nopparat**
- Elena killed Daniel Voss
- Elena selected victims
- Elena selected room/timing conditions
- Elena controlled discovery sequence
- Elena controlled cleanup priority

**Canonical spelling supersession:** all older Master Plan references to `Kawin Nopparat` are superseded by **`Kavin Nopparat`**. Thai: **กวิน นพรัตน์**.

Alternate endings change what can be proved or institutionally sustained. They never change history.

Elena visibility target:

- Chapter IV Phase VIII: outside normal Top 3
- Chapter V: low probability
- Chapter VI: below principal false suspects
- early Chapter VII: several non-Elena theories stronger
- late Chapter VII: serious only after cross-class synthesis

Practical blind-play target remains roughly under 10% first-play suspicion until late Chapter VII for most testers.

Prohibited early Elena tells:

- ominous smiles
- villain pauses
- “she knows too much” framing
- suspicious perfect intuition
- conspicuous alibis
- unique technical signature
- secret operator calls
- Elena-named pre-reveal phase
- gendered unknown-principal clues

---

# 13. FALSE PRINCIPALS / CAUSAL ATTRIBUTION

Mandatory false-conviction-capable principals:

1. Kittisak
2. Narin
3. Adrian
4. Arman
5. Ika

Somchai is mandatory high-suspicion cleaner/accomplice/conditional support.

Each false principal needs real wrongdoing, real secret, plausible motive, means, opportunity/delegation, authentic obstruction, several evidence classes, reason for incomplete cooperation and a late contradiction.

The player's error is **causal attribution**, not fact recognition.

Core technical principle:

> **A valid credential proves access, not identity.**

Temporary Operational Profile `18-07` is a profile, not a person.

Historical responsibility layers:

- Adrian = lawful architecture + hidden continuity liability
- Arman = adapted wrapper / blind broker + deeper metadata
- Narin = trusted Bangkok deployment + real wrongdoing/concealment
- Ika = later Aster field/recovery + unresolved pre-Aster history
- Kittisak = off-book institutional continuity/containment
- Somchai = off-book transfer/protected-source handling
- Elena = murder decision, victim selection, physical murders, timing/discovery/cleanup priority

Core mystery discipline:

> **Elena does not create the red herring. She creates conditions in which the red herring creates itself.**

## Locked dark truths / contradictions

### Kittisak

Real truth: off-book continuity/containment, emergency authority beyond normal oversight, protected sources/assets, compartmentalized records, Somchai sealed transfers.

Why he looks guilty: authority, access, audit restriction, information control, intermediary capacity and institutional motive.

Late contradiction: cannot fully explain preselection of both victims/timing across the entire chain.

### Narin

Real truth: trusted Bangkok deployment, bypassed change control, illicit compensation/protected interest, altered/suppressed deployment records, real fear of disclosure.

Why he looks guilty: trusted local access, proximity, deployment capability, motive, record manipulation, opportunity.

Late contradiction: selection/chronology begins before he could know enough to choose both victims and timing.

### Adrian

Real truth: lawful architect who concealed undocumented continuity/emergency path plus liability/regulatory/private-contract exposure.

Why he looks guilty: privileged architecture, hidden failover capability, internally valid record behavior, liability motive.

Late contradiction: cannot fully explain physical victim-selection chronology.

### Arman

Real truth: engineered blind brokerage but retained behavior/payment/urgency/region/return-channel fingerprints and deeper ledger.

Why he looks guilty: tool authorship, sophistication, compartmentalization, identity shielding, obstruction.

Late contradiction: technical concealment cannot explain full physical victim-selection chronology.

### Ika

Real truth: incomplete licensed history, pre-Aster aliases, unlicensed contracts, travel gaps, concealed violent work.

Why she looks guilty: proven violence, field capability, surveillance tradecraft, hidden prior work, North attack.

Late contradiction: hidden work overlaps the case but does not complete the murder act.

### Somchai

Real truth: off-book physical transfers, evidence movement outside normal visibility, protected-source handling, secure routes.

He can plausibly appear as Kittisak's cleaner/physical remover/independent operator using institutional cover, but is not automatically a standalone false-conviction principal.

---

# 14. COOPERATION PARADOX

Central question:

> **Why did people with serious secrets give the team exactly enough truth to move forward?**

Canonical principle:

> **A truthful confession can be a form of concealment.**

Exact locked lines:

North:

`Nobody lied about the part they gave us.`

Benedict:

`That doesn't mean they gave us the whole truth.`

Examples:

- Adrian disclosed authentic lawful architecture but not full continuity liability
- Arman disclosed an authentic package but protected deeper broker metadata
- Ika's later Aster timeline is true but not her full earlier biography
- Kittisak wants the murder solved while protecting an off-book containment program
- Somchai cooperates until protected-source/off-book handling is threatened

Do not over-explain the theme after the lines carry it.

---

# 15. R. / RIN

Through Chapter IV, the lead is only `R.`.

Future identity:

**Rinrada “Rin” Sornchai**

Role:

**Former Identity and Access Registrar · Last Witness**

Rin becomes active in Chapter V and is revealed in Phase V `THE REGISTRAR`.

She retained/copied material she should not possess, may have made an out-of-procedure credential action, hid for self-protection, distrusts institutions and withholds part of the Last Record until custody is trusted.

She is not an exposition machine.

---

# 16. CHAPTER IV CANON / FINAL STATE

Chapter IV has exactly eight phases:

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

No Phase IX without explicit owner approval.

Chapter IV is complete and maintenance-frozen except for reproduced defects, integration blockers, backward-compatible persistence needs or explicit owner request.

Locked final state:

- Jakarta operation closed
- Decision Owner unresolved
- North publicly removed / secretly alive
- false-removal belief preserved
- Adrian viable
- Arman viable
- Ika viable
- Narin viable
- Kittisak active suspect direction
- Somchai custody/execution suspicion
- `R.` next lead
- Elena low-signal / unproven
- Benedict/North depart Indonesia
- Bangkok arrival reserved for Chapter V

Phase VIII maintains Cooperation Paradox, `R.` lead, lawful Indonesia closure and the `NORTH · REMOVED` public-record state.

CH4P8 personnel-card stacking defect is historical/resolved. Current accepted stacking: personnel card below global Menu/Settings; opening Menu/Settings must not dismiss/advance the card.

---

# 17. CHAPTER V — THE MISSING PIECE

Exactly eight phases:

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

---

# 18. CHAPTER V PHASE I — RETURN TO BANGKOK

Status:

`OWNER-ACCEPTED FOR CONTINUATION · MAINTENANCE-FROZEN`

Core remains `0.22.8-c5p1r10` with accepted scoped modules:

- North portrait fix `0.22.8-c5n1`
- Police next-morning cue `0.22.8-c5t1`

Canonical flow:

1. landing cinematic
2. automatic Bangkok arrival card ~3s, no Continue
3. Police daylight scene
4. ~3.2s `NEXT MORNING / DAY 7 · 08:45 ICT / POLICE STATION · EVIDENCE DIVISION` cue
5. Evidence Division
6. Briefing Room
7. return briefing
8. North public cover story
9. Kittisak/Somchai custody thread
10. `CUSTODY WINDOW`
11. investigative emphasis choice
12. walk-to-condo cinematic
13. automatic condo card ~3s
14. Benedict condominium
15. North reveal
16. private debrief
17. Phase Complete
18. Phase II handoff

Timeline anchors:

- arrival `DAY 6 · 21:50 ICT`
- Police `DAY 7 · 08:45 ICT`
- walk `DAY 7 · 20:36 ICT · BANGKOK`
- condo card `DAY 7 · 20:44 ICT`
- condo `DAY 7 · 20:45 ICT`
- North reveal/debrief `SAFE LOCATION · 20:46 ICT`

Custody Window exact solution:

`PROTECTION ORDER → RECORDS SEALED → HAND-CARRY TRANSFER`

Exact conclusion:

`The chain is valid. The timing still deserves review.`

Finding:

- AUTHORITY: VALID
- CUSTODY: DOCUMENTED
- SEQUENCE: PLAUSIBLE
- TIMING: REQUIRES REVIEW

CH5P1 freeze includes landing, arrival timing, Police cue, police/briefing, scene notes, `NORTH · OFF RECORD`, `TAP TO CONTINUE`, Custody Window, walk video, condo cards/scenes, Somchai brightness `.88`, accepted North portraits, audio/HUD/Progress/Save/Menu/Dev/North QA unless a new defect is actually reproduced.

---

# 19. CHAPTER V PHASE II — NAME IN ROOM 1807

## Current status

`IMPLEMENTED / PLAYABLE IN PRODUCTION · NOT OWNER-ACCEPTED · OPEN BLOCKERS`

Current module: `0.22.17-c5p2r13`.

The phase must not be considered complete for production continuation until its open physical-Android blockers are closed.

## Canonical story function

Phase II reveals the Room 1807 victim as:

**Kavin Nopparat / กวิน นพรัตน์**

It sharply raises Narin suspicion without proving murder and without turning the reveal into Elena evidence.

Kavin is a dead archival identity/evidence subject, not a living Character Journal principal.

Narin is a living principal suspect and becomes **ACTIVE SCRUTINY** after the secure contact completes.

Kittisak may have known the protected identity earlier than Benedict was told, but this is suspicion/institutional opacity, not proof of murder.

## Location / continuity lock

Primary physical location:

`POLICE STATION · RESTRICTED RECORDS`

North is **not physically at the police station**. North remains at Benedict's condominium / safe location and communicates remotely.

North remote information should be shown in the dialogue box:

- `NORTH · SECURE COMMS`
- `BENEDICT'S CONDO · SAFE LOCATION · REMOTE`

Do not duplicate the same North remote label as floating scene text above the dialogue; that duplication was removed as presentation clutter.

Narin is also remote. Do not invent an unapproved physical location for Narin.

Secure Contact language may use:

- `NARIN · REMOTE CONTACT`
- `CONTROLLED SECURE LINE · REMOTE ENDPOINT`

## Canonical evidence chain / Identity Reconciliation

The identity proof chain is:

`ROOM 1807 SUBJECT → PROTECTED IDENTITY INDEX → BANGKOK DEPLOYMENT ARCHIVE`

Interpretation:

- Room 1807 record identifies the protected subject chain
- protected identity index resolves the shielded identity path
- Bangkok deployment archive provides the supported operational bridge

Wrong/exhausted sources such as guest manifest/custody log do not create the identity bridge.

### Step 1 exact solution

1. `ROOM 1807 SUBJECT`
2. `PROTECTED IDENTITY INDEX`
3. `BANGKOK DEPLOYMENT ARCHIVE`

### Step 2 exact attribution boundary

Correct answer:

`Narin's access and concealment are supported. Murder attribution is not.`

The game must reject overreach such as:

- altered record proves Narin killed Kavin
- earlier visibility proves Kittisak ordered the concealment

This phase reasserts:

> **A valid credential proves access, not identity.**

Room 1807 and Profile 18-07 are not declared identical merely because the numbering resembles each other.

## Kavin reveal lock

Presentation concept:

- `IDENTITY MATCH CONFIRMED`
- `KAVIN NOPPARAT`
- `ROOM 1807 SUBJECT`
- `IDENTITY STATUS · VERIFIED`

Kavin belongs in Case File/Evidence, not Character Journal as a living person.

## Minigame presentation lock

Current accepted direction:

- one-screen / no internal vertical scroll
- larger readable frame than the early cramped version
- gold-dominant LAST WITNESS styling
- readable source/conclusion cards
- strong touch targets
- `CONFIRM BRIDGE` / `CONFIRM FINDING`
- closing X pauses task without completing it
- state survives reopen
- puzzle logic/answers are frozen unless canon changes explicitly

## Narin Secure Contact visual lock

Current direction:

- bounded `SECURE REMOTE FEED` portrait on left
- muted cyan/blue frame
- Narin with black background, clean silhouette/intentional body outline only
- no accidental long straight artifact line above Narin's head
- current crop/scale/position is acceptable unless a new owner defect is reproduced
- Benedict may appear as a small endpoint portrait when Benedict is speaking
- speaker channel labels such as `SECURE VOICE` / `REMOTE ENDPOINT` support clarity
- Narin Journal thumbnail should visually match Benedict/North scale/presence, not appear tiny in the card

## Narin Character Journal timing — locked requirement

Before Secure Contact completes:

- Narin must **not** be visible in Character Journal
- no “added” feedback should fire early

After the player reaches line `08 / 08` and presses final `CLOSE CONTACT`:

1. commit Narin contact completion
2. unlock Narin in Character Journal
3. set unread/red-dot state
4. visibly inform the player that Narin was added
5. Narin Journal entry persists through Save/Load/reopen

Required visible feedback meaning:

`NARIN HAS BEEN ADDED TO THE CHARACTER JOURNAL`

The red dot and visible feedback belong to the same completion transition. A red dot with no visible confirmation is an incomplete UX state.

## Phase II Owner Walkthrough

Owner Walkthrough must retain the exact Phase II solution and current endpoint, remain Owner-only/read-only and never mutate gameplay.

---

# 20. CH5P2 OPEN DEFECT / ACCEPTANCE MATRIX — HIGHEST CURRENT PRIORITY

These statuses are driven by P'Benz's physical Android observations.

## BLOCKER A — TRACK B SILENT DURING NARIN — CONFIRMED OPEN

**Physical owner result on Production `0.22.17`: FAIL.**

Observed behavior:

- Narin Secure Contact appears
- expected Track B is silent throughout Narin
- music does not return during the conversation
- Track B finally becomes audible only when the Phase Complete card appears

Correct behavior:

`Secure Contact/Narin appears → Track B is already audible → remains continuous through 01/08–08/08 → Closing → Phase Complete`

The Phase Complete card must **continue** Track B, not be the first place it begins.

This has survived multiple local/browser “PASS” attempts. Therefore:

- do not trust `play()` Promise resolution alone
- do not trust `paused === false` alone
- do not keep stacking generic timers/watchdogs as the primary solution
- inspect actual audio ownership and competing pause/fade/transition callers
- study an accepted stable phase implementation before altering architecture
- prove real progression by `currentTime`/audible ownership in the test harness, but physical Android remains final authority

## BLOCKER B — JOURNAL CONFIRMATION MESSAGE MISSING — CONFIRMED OPEN

**Physical owner result on Production `0.22.17`: FAIL.**

Observed behavior:

- after Narin conversation, red dot appears
- Narin can be associated with the Journal state
- visible text confirming `Narin has been added to the Character Journal` does not appear

Correct behavior:

- no unlock/message before final 08/08 Close Contact
- after final Close Contact, Journal unlock + red dot + visible confirmation fire together
- the message must not depend on a scene-note path that may be overwritten/hidden
- it should not duplicate on Load/Resume/Reopen once already acknowledged/committed

## RETEST C — MINIMIZE / FOREGROUND MUSIC AUTO-RESUME — NOT CLOSED

Earlier physical Android builds reproduced:

- minimize/background the app/browser during CH5P2
- return to game
- music remains silent instead of automatically resuming

R14/`0.22.17` attempted a new lifecycle strategy, but the latest owner report did not explicitly close this issue. Therefore it remains **RETEST REQUIRED / NOT OWNER-ACCEPTED**.

Acceptance:

- background produces no rogue audible continuation
- foreground automatically restores the correct active Track A or B
- correct position/state is retained
- no unrelated user tap required
- no old track resurrects

## RETEST D — SECURE-CALL SFX PHONE-SPEAKER AUDIBILITY

Earlier owner report: secure-call connection sound was too quiet on phone speakers.

R14 increased effective WebAudio gain substantially. The latest owner report did not repeat this complaint, but there is no explicit physical PASS recorded in this plan.

Status:

`RETEST / DO NOT REOPEN UNLESS STILL INAUDIBLE`

Acceptance: clearly audible on mobile speaker without clipping and without muting/stealing BGM ownership.

## Immediate release rule

**Do not begin CH5P3 as the default next task until Blocker A and Blocker B are physically accepted by P'Benz.**

Retest C must also be explicitly closed before CH5P2 is declared fully accepted. Retest D is a focused confirmation unless the owner reports it still fails.

---

# 21. CHAPTER V PHASES III–VIII — LOCKED FUTURE PLAN

## Phase III — ROOM / PROFILE CROSS-MAP

Cross:

- Room evidence
- Profile 18-07
- architecture
- wrapper
- deployment
- physical movement
- custody
- institutional access

Board must seriously support Narin, Kittisak, Adrian and Arman.

Elena is not formal board focus.

## Phase IV — DANIEL'S HANDOFF

Daniel prepared an authentic but role-based warning about a gatekeeper/authority layer.

It can plausibly implicate Kittisak, Adrian or Narin depending on causal interpretation.

## Phase V — THE REGISTRAR

Locate `R.` and reveal Rin.

Rin is guarded, frightened, intelligent and procedurally compromised.

She reveals registrar anomalies and the difference between accepted access and physical identity.

She does not solve the case.

## Phase VI — PIER RECONSTRUCTION

Reconstruct the physical event linked to Kavin/Daniel.

Reopen Ika through pre-Aster alias, travel gap, unlicensed field work or capability evidence.

Aster recruitment after the murders remains true.

## Phase VII — WITNESS EXTRACTION

A real threat forces emergency movement of Rin/protected source.

Kittisak orders off-book protection through Somchai.

Intent protective, procedure suspicious.

At the same time:

- Ika-related tradecraft appears
- Narin resists/disappears
- Adrian restricts a system path
- Arman protects/destroys a key

Different suspects behave badly for different real reasons.

## Phase VIII — THE MISSING PIECE

Prove several real concealment systems coexist.

The missing piece is **not Elena**.

End-state target:

- Kittisak top-tier
- Narin top-tier
- Adrian viable
- Arman viable
- Ika viable
- Somchai cleaner/accomplice plausible
- Rin valuable but guarded
- Elena low-suspicion

Open Chapter VI with:

`CASE THEORY WITHOUT A CHARGE`

---

# 22. CHAPTER VI — THE FINAL MOVE

Exactly nine phases:

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

Key rules:

- build serious prosecutable-looking theories around all five false principals
- do not create five disconnected alternate games
- controlled leak produces multiple suspicious reactions
- continuity protocol intersects multiple actors
- Safe Chain attack supports multiple readings
- Evidence Division breach creates the strongest Kittisak spike
- `THE QUIET CHANNEL` replaces old `ELENA KNOWS`
- Elena-compatible facts remain mundane administrative facts
- no direct Elena confrontation
- Two Staging Sites strengthens mastermind/accomplice models
- end with at least three strong non-Elena theories
- Last Witness / Last Record becomes central

---

# 23. CHAPTER VII — LAST WITNESS

Exactly eight phases:

1. THE ROOM REPEATS
2. THE PIER
3. RESCUE / PRESERVE
4. FIVE PRINCIPALS
5. THE LAST RECORD
6. FINAL RECONSTRUCTION
7. THE WEIGHT OF PROOF
8. RECORD OR RELEASE / ENDING

Adaptive mode: **RESOLVE**.

No final killer-choice list.

## FIVE PRINCIPALS

Maximum-strength wrong cases:

- Kittisak
- Narin
- Adrian
- Arman
- Ika

Somchai may appear as cleaner/accomplice/support.

## THE LAST RECORD

Rin / Last Record supplies the first evidence class the five false principals cannot fully absorb.

It does not simply say `Elena did it.`

It exposes structural contradiction across:

- sequence
- physical event
- accepted record
- who could know what when
- decision selection vs later execution

## FINAL RECONSTRUCTION

Only here may Elena become fully serious.

Elena requires several independent evidence classes. No single clue/class is enough.

Backend states:

1. Elena convergence unavailable
2. Elena attribution supported but not prosecutable
3. Elena full convergence

## THE WEIGHT OF PROOF

Backend:

1. finalize evidence/witness state
2. evaluate suspect eligibility
3. compute wrong-case prosecutable strength
4. compute Elena attribution convergence
5. compute Elena prosecutability convergence
6. apply contradictions/admissibility failures
7. resolve strongest sustainable case
8. lock route deterministically

Player sees consequence, never arithmetic.

---

# 24. CHAPTER V–VII CONTINUITY LEDGER

## Chapter V / INFLUENCE must

- return to Bangkok without inventing a Jakarta bridge
- reveal Room 1807 victim as **Kavin Nopparat** in Phase II
- strongly strengthen Narin while keeping Kittisak/Adrian/Arman/Ika viable
- preserve Kittisak protective-but-suspicious institutional logic
- preserve Somchai as documented physical handler / plausible cleaner-accomplice
- cross-map Room 1807 / Profile 18-07 / architecture / wrapper / deployment / physical movement / custody / institutional access
- reveal Rin in `THE REGISTRAR`
- make Rin valuable but incomplete, frightened and procedurally compromised
- reopen Ika through pre-Aster history without invalidating true later Aster recruitment
- create real witness/protected-source danger
- prove multiple concealment systems coexist
- end with the “missing piece” not Elena
- end with Kittisak + Narin top-tier, Adrian/Arman/Ika viable, Somchai plausible support, Rin guarded, Elena low-suspicion

## Chapter VI / DIVERGE must

- build serious theories around five false principals
- use leak/continuity/breach/staging pressure to make actors react suspiciously for different real reasons
- allow adaptive emphasis without changing historical truth
- make Evidence Division Breach a major Kittisak spike
- keep `THE QUIET CHANNEL` mundane, not an Elena reveal
- maintain at least three strong non-Elena theories by the end
- increase Last Witness / Last Record importance without allowing one witness to solve everything

## Chapter VII / RESOLVE must

- reunite room/pier/physical-event patterns
- preserve/rescue witness chain sufficiently for evidence to matter
- present five false principals at maximum plausible strength
- use Last Record as first evidence class they cannot fully absorb
- make Elena fully serious only in Final Reconstruction via multi-class convergence
- run Weight of Proof invisibly/deterministically
- never show a final killer-choice list
- preserve historical truth in every ending

## Design-open details

Do not invent these as canon prematurely:

- exact future room layouts/choreography not already locked
- exact future dialogue lines
- exact future evidence IDs/filenames
- exact future minigame mechanics when no accepted shell exists
- exact micro-branch wording
- exact future Runtime numbers before release classification
- exact unapproved audio/image/video assets
- exact future card timing unless already locked

---

# 25. ENDING ARCHITECTURE

Four families:

1. TRUE CONVICTION
2. RIGHT NAME, NO CASE
3. FALSE CONVICTION
4. THE PERFECT RECORD

FALSE CONVICTION variants:

- Kittisak
- Narin
- Adrian
- Arman
- Ika

No randomness.

TRUE CONVICTION requires Elena attribution convergence, Elena prosecutability convergence, clean multi-class support, chain integrity, Last Record, chronology bridge and physical/legal bridge.

RIGHT NAME, NO CASE: truth understood but legal bridge fails.

FALSE CONVICTION: institution accepts the strongest sustainable wrong case against someone guilty of serious wrongdoing but not the historical murders.

THE PERFECT RECORD: no clean prosecution survives or an accepted wrong institutional narrative becomes too complete to reopen.

---

# 26. EVIDENCE ARCHITECTURE

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

Each false principal should receive at least three independent classes plus real obstruction, dark secret, motive, opportunity/delegation and late contradiction.

Elena proof requires multiple independent classes including physical/human bridge, chronology/decision-order bridge and at least one formerly innocuous latent clue.

Never solve the mystery with one confession, email, CCTV frame, timestamp, recording, witness or database row.

---

# 27. ADAPTIVE STORY RULE

Progression:

- P8 = CALCULATE
- Chapter V = INFLUENCE
- Chapter VI = DIVERGE
- Chapter VII = RESOLVE

Adaptive variation may change emphasis, follow-up dialogue, optional scene, pressure target, suspect-response prominence, evidence foregrounding and legal theory viability.

It may not change historical facts.

Anti-snowball rule: a leader-focused sequence must preserve competition, expose contradiction, strengthen another suspect or create legal risk.

Prefer top-pair/top-three viable theory targeting over a single leader.

No Elena hidden value grants early Elena spotlight.

> **Story creates score consequences. Score does not invent arbitrary story facts.**

---

# 28. CHARACTER DUTY MATRIX

| Character | Phase VIII | Chapter V | Chapter VI | Chapter VII |
|---|---|---|---|---|
| Benedict | disclosure boundaries | rebuild Bangkok case | competing theories | final reconstruction |
| North | Cooperation Paradox | hidden analyst / registrar map | telemetry / contradiction | Last Record reconstruction |
| Elena | ordinary low-signal | useful but not central | mundane latent trace | late synthesis reveal only |
| Kittisak | institutional anomaly | major institutional suspect | strongest internal-control theory | viable false principal |
| Somchai | suspicious handling | off-book transfers | cleaner/custody suspicion | accomplice/support |
| Adrian | cooperation reinterpreted | hidden architecture | Continuity Protocol conflict | viable false principal |
| Arman | controlled disclosure | deeper ledger | broker/technical principal | viable false principal |
| Narin | unresolved Bangkok layer | dominant operational suspect | deployment/motive/evasion | viable false principal |
| Ika | pre-Aster reopened | physical/travel suspicion | field-network principal | viable false principal |
| Rin | unresolved `R.` | guarded reveal | protected witness | Last Witness / Last Record |
| Ratchata | physical evidence | sample continuity | preservation pressure | physical contradiction |
| Cheryl | Singapore chain | admissibility | mirror preservation | original-chain authentication |
| Farid | remote verification | hidden-channel auth | telemetry/mirror integrity | original vs rewrite |
| Maya | closes Jakarta | mostly off-stage | Indonesia support if required | Jakarta chain confirmation |

---

# 29. QA / RELEASE GATE

## Startup

Verify at minimum:

- splash/title
- New Game / Continue / Load as applicable
- Owner Developer access
- North QA blindness
- no startup lock/black screen
- no stale loader/cache mismatch

## Mobile viewport audit

Minimum useful set:

- 360×740 or 360×800
- 360×844
- 393×800
- 412×915
- 430×932
- 690×1300 when useful for tall-layout stress

Check safe area, footer clipping, horizontal overflow, portrait framing, Progress, primary-button reachability, modals, menus and stacking contexts.

## Build-Linkage Gate

Before every runtime package:

1. inspect current Production HEAD
2. classify release: base Runtime / module / scoped maintenance / docs-only
3. declare changed-file allowlist
4. search affected authoritative files for stale versions/cache keys
5. verify source version ↔ cache ↔ loader expected version ↔ loader cache
6. verify Settings/runtime identity
7. verify Owner Developer separately
8. verify North QA separately
9. verify Save-facing identity
10. verify Runtime Label/global/dataset
11. verify diagnostics when applicable
12. verify exact ZIP allowlist
13. verify packaged bytes equal tested source bytes
14. generate manifest/release notes from final identity
15. compute checksum after final archive exists
16. re-open archive/checksum once more
17. deliver only then

## Physical-device acceptance

For CH5P2 specifically, final Android flow should include:

`Phase II start → Track A → minimize/background → foreground auto-resume → minigame → Kavin reveal → Attribution → secure-call SFX → Narin appears with Track B audible → 01/08–08/08 continuous BGM → CLOSE CONTACT → Journal toast + red dot → closing → Phase Complete continues Track B`

Any failure in that sequence keeps Phase II open.

---

# 30. CURRENT MAINTENANCE / EXECUTION MATRIX

## FAMILY A — CHAPTER IV

`CLOSED / FROZEN` unless a new reproduced regression appears.

## FAMILY B — CH5P1

`CLOSED / FROZEN` unless a new reproduced regression appears.

## FAMILY C — CH5P2 VISUAL / MINIGAME / STORY

Current visual/minigame/story presentation is accepted-for-continuation unless P'Benz reports a new issue. Do not reopen it while fixing audio/Journal feedback.

Freeze:

- Restricted Records visual
- workstation physical LCD mapping
- one-screen minigame layout
- Kavin portrait/reveal
- Narin secure feed framing/crop/scale
- Narin Journal thumbnail scale
- North remote clarity
- dialogue canon
- puzzle canon
- Progress gold styling
- Menu/Settings stacking
- Owner Walkthrough content

## FAMILY D — CH5P2 AUDIO

`OPEN / BLOCKING`

Primary blocker: Track B silence during Narin until Phase Complete.

Foreground resume remains not closed until owner confirms.

## FAMILY E — CH5P2 JOURNAL FEEDBACK

`OPEN / BLOCKING`

Primary blocker: red dot appears but visible “Narin added” confirmation does not.

Unlock timing must remain after final 08/08 Close Contact.

---

# 31. IMMEDIATE NEXT-ROOM PRIORITY

Default next-room order:

1. read Master Plan + Migration Prompt
2. inspect current Production HEAD
3. if HEAD remains `656723b5...`, inspect/revalidate the local R15 `0.22.18` candidate if available
4. do **not** reopen accepted CH5P2 visual/minigame/story surfaces
5. close Track B/Narin audio blocker at authoritative ownership level
6. close Journal visible-confirmation blocker without moving unlock timing earlier
7. re-test foreground auto-resume
8. re-test secure-call SFX audibility only as a focused check
9. run regression and atomic build-linkage gate
10. deliver exact patch + Commit Name
11. P'Benz uploads
12. re-inspect landed Production
13. P'Benz performs physical Android acceptance
14. only after Phase II is accepted does default production move to Phase III `ROOM / PROFILE CROSS-MAP`

---

# 32. PROHIBITED SHORTCUTS

Do not:

- reveal Elena in Chapter IV/V
- make Elena dominant in Chapter VI
- name a pre-reveal phase after Elena
- use gendered unknown-principal language
- treat cooperation as innocence
- clear Ika because Aster hired her later
- clear Arman because he “only built a tool”
- clear Adrian because architecture was lawful
- clear Kittisak because he is authority
- clear Somchai because he follows orders
- make Narin harmless
- create fake evidence solely to frame innocents
- make every suspect obstruct identically
- solve with one clue
- make Rin an exposition machine
- use relationships as murderer scores
- create final killer-selection UI
- create Chapter IV Phase IX
- redesign accepted UI when a proven shell fits
- globally patch a local portrait defect
- alter Dialogue to fix Progress
- resurrect broad repair MutationObservers
- call mocked/browser media physical Android E2E
- release mismatched build endpoints
- leak Owner-only data to North QA
- let Walkthrough mutate gameplay
- let Owner Inspector synthetic values mutate canonical state
- require an unrelated user tap to restore score after foreground return
- villain-code Elena early
- change frozen CH5P1 while repairing CH5P2
- change Kavin/Narin visual layout while repairing audio unless a new visual defect is reproduced
- move Narin Journal unlock earlier merely to make the toast easier
- treat red dot alone as sufficient Journal feedback
- treat Phase Complete music as proof Narin music worked
- call CH5P2 accepted before owner physical Android confirmation

---

# 33. MASTER QUALITY STANDARD

The mystery from Phase VIII through Chapter VII should feel:

**nearly impossible before reconstruction, disturbingly inevitable afterward.**

Desired sequence:

1. rejection
2. disorientation
3. recognition
4. inevitability
5. replay aftershock

Every major phase from Phase VIII onward must advance at least one strong non-Elena theory, preserve/strengthen another, plant/preserve/reinterpret a future evidence dependency and keep Elena suspicion within the stage limit.

Canonical final idea:

> **Elena built a crime in which the evidence told the truth about almost everyone except the question that mattered most.**

---

# 34. FINAL NON-NEGOTIABLE SUMMARY

- P'Benz physical-device observation / explicit instruction is the highest authority.
- Repository: `grolygori789-crypto/last-witness`.
- Branch: `production-rebuild`.
- Current Production HEAD: `656723b5a41bebb9601e686ab94cd5c999f6b739`.
- Current Production Runtime: `0.22.17`.
- Documentation update does not bump Runtime.
- CH5P2 is implemented through Phase II but is **not owner-accepted**.
- Confirmed blocker: Track B is silent throughout Narin and first appears at Phase Complete.
- Confirmed blocker: red dot appears but visible Narin-added Journal confirmation is missing.
- Foreground/minimize audio resume remains unclosed until owner physical retest confirms PASS.
- Secure-call SFX loudness is a focused retest item, not automatically a current blocker.
- A local R15/`0.22.18` candidate exists but is non-canonical until uploaded, re-inspected and owner-tested.
- Do not start CH5P3 by default until CH5P2 blockers close.
- CH1–CH4 are accepted/frozen.
- CH5P1 is accepted/frozen.
- Chapter IV has exactly 8 phases. No Phase IX.
- Chapter V has exactly 8 phases, adaptive mode INFLUENCE.
- Chapter VI has exactly 9 phases, adaptive mode DIVERGE.
- Chapter VII has exactly 8 phases, adaptive mode RESOLVE.
- Room 1807 victim canon is **Kavin Nopparat / กวิน นพรัตน์**; older `Kawin` spelling is superseded.
- Narin Journal unlock occurs only after final 08/08 Close Contact.
- Kavin is evidence/case identity, not a living Character Journal principal.
- North is remote from Benedict's condo safe location during CH5P2.
- Track A is the investigative Restricted Records/Identity Reconciliation score derived from `nature-investigation-255161`.
- Track B `name-changes-everything` must begin for the Narin sequence and continue through Phase Complete.
- Identity Reconciliation exact bridge: `ROOM 1807 SUBJECT → PROTECTED IDENTITY INDEX → BANGKOK DEPLOYMENT ARCHIVE`.
- Attribution answer: `Narin's access and concealment are supported. Murder attribution is not.`
- A valid credential proves access, not identity.
- Profile `18-07` is a profile, not a person.
- Hidden Case is deterministic, auditable, idempotent and player-invisible.
- Five false-conviction principals: Kittisak, Narin, Adrian, Arman, Ika.
- Somchai remains cleaner/accomplice/conditional support.
- Rin is `R.` / Last Witness and is revealed in Chapter V Phase V.
- Elena is the historical mastermind/murderer in every route, but remains low-signal until late Chapter VII.
- No final killer-choice list.
- Ending families: TRUE CONVICTION / RIGHT NAME, NO CASE / FALSE CONVICTION / THE PERFECT RECORD.
- Story truth never changes by route; only provability/sustainability changes.
- UI shells are contracts: study proven shell → preserve shell → change only payload.
- Avoid regression by default; do not touch accepted systems unnecessarily.
- Build linkage is atomic. Any affected mismatch is a release blocker.
- GitHub writes require explicit owner authorization in the current turn.
- Every delivered project file includes a scope-accurate Commit Name ≤50 characters.
- New rooms must not ask P'Benz to repeat locked decisions recoverable from this plan/current Production.

This is the canonical zero-question continuation contract as of **2026-08-19 17:55 ICT**.
