# LAST WITNESS - GAME MASTER PLAN

> **CANONICAL MASTER REFERENCE / ZERO-QUESTION ROOM HANDOFF**
>
> **Revision:** 2026-08-17 10:51 ICT  
> **Game:** LAST WITNESS  
> **Studio:** BENEDICT INTERACTIVE  
> **Repository:** `grolygori789-crypto/last-witness`  
> **Production/default branch:** `production-rebuild`  
> **Latest inspected Production HEAD:** `1e4afcf94a55c87d684eb3dac3aa1442040c1601`  
> **HEAD message:** `Fix CH5P1 rollback and landing`  
> **Authoritative base Runtime:** `0.22.8`  
> **Current Chapter V Phase I module:** `0.22.8-c5p1r10`  
> **Current Chapter V loader:** `0.22.8-c5b7`  
> **Current accepted playable boundary:** `CHAPTER V · PHASE I · PRELIMINARILY ACCEPTABLE WITH TWO NORTH PORTRAIT DEFECTS`  
> **Open maintenance defect:** `CHAPTER IV · PHASE VIII · NORTH REMOVED CARD STACKS ABOVE GAME MENU / SETTINGS`  
> **Immediate production priority:** repair the two isolated defects above, obtain owner Android acceptance, then begin `CHAPTER V · PHASE II · NAME IN ROOM 1807`  
> **Chapter IV:** exactly 8 phases; no Phase IX without explicit owner approval  
> **Hidden Case engine:** `0.21.0`  
> **Phase VIII core:** `0.22.2`  
> **Developer Navigation:** `0.22.8-d1`  
> **North QA:** `0.22.8`  
> **Runtime Build Label:** `0.22.8`  
> **Save Manager:** `0.7.10-s2`, save-facing Runtime identity follows `0.22.8`  
> **Owner Walkthrough base:** `0.22.3-w1`  
> **Chapter V Owner Walkthrough extension:** `0.22.8-c5w3`  
> **Phase VIII Matrix Exit:** `0.22.7-m1`  
> **Chapter IV P7/P8 Audio Lifecycle:** `0.22.7-a1`  
> **Adaptive model:** `P8 CALCULATE → Ch V INFLUENCE → Ch VI DIVERGE → Ch VII RESOLVE`

This revision supersedes older Master Plan runtime/status snapshots while preserving the established story canon, Hidden Case architecture, ending architecture, Interface/UI contract, Developer/North QA separation, Save/Load contract, audio-lifecycle rules, Chapter IV canon and Chapters V–VII long-game plan.

The owner has already moved Production beyond the old Runtime `0.22.7` handoff. **Do not downgrade or rebuild to `0.22.7`.** Runtime `0.22.8` is the current Production truth.

The most important change in this revision is not merely a version bump. It records the exact owner-accepted state after the Chapter V Phase I repair/rollback cycle, identifies the only two remaining Chapter V Phase I portrait defects, records the newly reproduced Chapter IV Phase VIII stacking defect, and freezes everything else that is currently acceptable so a new room does not reopen working systems.

---

# 0. SOURCE OF TRUTH / OWNER OVERRIDE

When sources conflict, use this order:

1. **P'Benz's latest physical-device observation / explicit owner instruction**
2. **current Production Runtime on `production-rebuild`**
3. **this `GAME_MASTER_PLAN.md`**
4. owner-approved binary assets
5. repository history / QA evidence
6. older handoff documents
7. assistant memory

A physical Android result overrides local confidence, static checks, browser harnesses, mocked media, assumptions and earlier assistant claims.

## GitHub write rule

Do not write GitHub unless P'Benz explicitly authorizes a GitHub write **in the current turn**.

Normal workflow:

`inspect Production → isolate scope → local repair → test → package → owner uploads → re-inspect landed Production`

Old GitHub permission never carries forward automatically.

Commit messages must be **50 characters or fewer**.

## Mandatory file-delivery Commit Name rule — OWNER NON-NEGOTIABLE

Every time the assistant delivers **any project file** to P'Benz, the response must include a proposed **Commit Name** that matches the actual delivered scope.

This applies to all project artifacts, including but not limited to:

- upload ZIP / source ZIP
- patch bundle
- JavaScript / CSS / HTML
- image / video / audio asset replacement
- Markdown / Master Plan / migration / handoff document
- QA report / validation report
- manifest / checksum
- emergency rollback package
- documentation-only package

Rules:

1. **Never omit the Commit Name when a project file is delivered.**
2. Commit Name must be **50 characters or fewer**, including spaces and punctuation.
3. Commit Name must describe the **actual scope of that delivered artifact** and must not claim unrelated work.
4. If several delivered files belong to one atomic release/package, provide one Commit Name for that package.
5. If the response delivers multiple independent packages with different scopes, provide a separate Commit Name for each package.
6. The Commit Name must still be provided even when the assistant did **not** write to GitHub and P'Benz will upload the files manually.
7. Present the Commit Name in a copyable code block.
8. Do not wait for P'Benz to ask for it.
9. Before sending the final response, perform a release-handoff check: **file link present + Commit Name present + Commit Name ≤ 50 characters + scope matches delivered files**.
10. A missing or over-length Commit Name is a **handoff defect** and must be corrected before the delivery is considered complete.

This rule is part of the project delivery contract, not a stylistic preference.

## No owner repetition

A new room must not ask P'Benz to repeat decisions already locked here, including:

- repository / branch
- Chapter IV phase count
- Chapter V–VII story structure
- Elena historical truth
- Rin / `R.` identity
- Hidden Case architecture
- ending architecture
- Interface/UI reuse rules
- dialogue geometry freeze
- build-linkage contract
- Owner Developer / North QA separation
- audio background lifecycle
- Save/Load expectations
- Phase VIII Matrix Exit
- current Chapter V Phase I flow
- current known defects
- current next objective

Ask only when a genuinely new product/creative decision is required.

## QA honesty

Never call a patch Android-tested unless it was actually tested on P'Benz's physical Android device.

Be precise:

- Node syntax = Node syntax
- static source inspection = static inspection
- browser harness = browser harness
- mocked media = mocked media
- local viewport test = local viewport test
- owner Android Chrome = physical-device acceptance

P'Benz is the final acceptance authority.

## Surgical-change rule

When the owner identifies a narrow defect, change only the smallest necessary surface.

**If the owner asks for two changes, make two changes. Do not opportunistically polish a third area.**

The Chapter V Phase I r9 incident is now a permanent regression lesson: a correct requested change can still become a bad release if unrelated accepted behavior is touched.

---

# 0A. NEW-ROOM ZERO-QUESTION STARTUP PROTOCOL — MANDATORY

The purpose of this handoff is that a new room can begin work **without asking P'Benz to restate any already-locked information**.

Before replying to the first LAST WITNESS task in a new room, the assistant must perform this sequence internally:

1. Read this `GAME_MASTER_PLAN.md` completely.
2. Read the paired `LAST_WITNESS_ROOM_MIGRATION_PROMPT.md`.
3. Inspect current Production on:
   - repository: `grolygori789-crypto/last-witness`
   - branch: `production-rebuild`
4. Compare current Production HEAD with the recorded handoff HEAD:
   - recorded handoff HEAD: `1e4afcf94a55c87d684eb3dac3aa1442040c1601`
   - recorded message: `Fix CH5P1 rollback and landing`
5. If Production has advanced:
   - do **not** assume this handoff is obsolete
   - inspect the new commits/files
   - preserve this file's locked story/product rules
   - use current Production as runtime/source truth where code has legitimately advanced
   - do not ask P'Benz to explain changes that can be resolved from GitHub history/current source
6. Identify whether the owner's request concerns:
   - one of the two known open defect families
   - a new reproducible defect
   - Chapter V Phase II or later story implementation
   - documentation/release work
7. Use the Source-of-Truth order in Section 0 to resolve any conflict.
8. Ask P'Benz a question **only** when a genuinely new creative/product decision is required and cannot be resolved from:
   - current Production
   - this Master Plan
   - the Migration Prompt
   - bundled reference screenshots
   - accepted release history
9. Never ask the owner to repeat:
   - project/repository identity
   - current branch
   - current Runtime/build policy
   - Chapter IV phase count
   - Chapter V–VII phase structure
   - current known defects
   - Elena/Rin/Hidden Case canon
   - UI/UX reuse rules
   - Dev/North separation
   - Save/Load rules
   - audio-lifecycle rules
   - file-delivery/Commit-Name rule
   - current immediate next objective

### First response behavior in a new room

If P'Benz says only something like:

- `ดำเนินการต่อ`
- `เริ่มได้เลย`
- `แก้ defect ต่อ`
- `ทำงานต่อจากห้องเดิม`

the assistant must **not ask “ตอนนี้ถึงไหนแล้ว?”** or ask for the project state again.

Instead, it must infer the current actionable state from this handoff and current Production inspection.

At this handoff revision, the default actionable order is:

1. CH4P8 Game Menu / Settings stacking defect
2. CH5P1 North portrait defect: `How bad was he?`
3. CH5P1 North portrait defect: `Good. Then we keep it that way.`
4. owner physical Android acceptance
5. freeze CH5P1
6. begin CH5P2 `NAME IN ROOM 1807`

If P'Benz's new-room message names one of these specifically, work on that exact item only.

### Ambiguity rule

When an ambiguity can be resolved by inspecting code, assets, Git history, bundled screenshots or this Master Plan, **inspect first; do not push the work back to the owner**.

Only escalate to P'Benz when:
- two equally valid canon/product choices remain after inspection, or
- the request introduces genuinely new story/design intent, or
- a required asset is actually missing and cannot be recovered from current Production/handoff files.

---

# 1. PROJECT / VISUAL IDENTITY

LAST WITNESS is:

- mobile-first portrait 9:16
- Android Chrome primary practical target
- modern iOS Safari secondary target
- neo-noir graphic novel / cinematic investigation
- cel-shaded / illustrated realism
- strong ink contours and angular shadows
- restrained dark surfaces
- warm gold and muted blue UI accents
- premium mobile readability
- serious crime-adventure tone
- investigation first, spectacle second
- one coherent product language from Chapter I through Chapter VII

The game must feel like one shipped product, not a collection of separately designed chapters.

---

# 2. INTERFACE / UI PRESERVATION CONTRACT — NON-NEGOTIABLE

For Chapters V–VII, the established LAST WITNESS interface is an **implementation contract**, not loose inspiration.

Operating rule:

> **STUDY THE PROVEN SHELL → PRESERVE THE SHELL → CHANGE ONLY CONTENT / INTERNAL PAYLOAD.**

Before creating or repairing an ordinary scene, dialogue surface, HUD, Progress UI, card, evidence panel, location/time card, flight route, completion card or transition:

1. inspect the closest owner-approved Production implementation
2. reuse its DOM hierarchy and CSS primitives
3. preserve geometry, safe-area behavior and interaction rhythm
4. change only what the new content truly requires
5. introduce a new shell only when no accepted primitive can satisfy the requirement

Preferred ordinary-scene foundation from Chapter IV:

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

Do not casually override global `.screen` geometry. A historical Phase VIII regression used phase-level geometry that collapsed visible screens into black output.

## Without explicit owner permission, do not redesign

- dialogue height
- dialogue bottom position
- portrait well
- dialogue grid proportions
- dialogue frame / border / radius
- Progress geometry
- HUD / topbar geometry
- Save/Menu icon language
- normal card geometry
- location/time card language
- typography hierarchy
- button shapes
- safe-area behavior
- normal transition rhythm
- established scene-note style
- accepted scene brightness
- accepted chapter-card language
- accepted completion-card language

## Phase/chapter card rule

Do not invent novelty square symbols, abstract sigils, decorative icon blocks or unrelated visual language unless owner explicitly requests them.

A card is a continuity device, not an art-design experiment.

## Minigame exception

Minigames may have bespoke internal mechanics, but must remain visibly and behaviorally LAST WITNESS:

- compatible palette
- established type family
- premium mobile spacing
- clear Close / Resume behavior when appropriate
- safe-area correct
- touch targets appropriate for phones
- no trap states
- no leak of Owner-only mystery internals

---

# 3. DIALOGUE / PROGRESS PRESENTATION FREEZE

The accepted Chapters I–IV dialogue geometry is frozen.

Runtime `0.22.4–0.22.5` experimented with lower dialogue placement and dialogue-time Progress presentation. Owner Android review rejected the combined experiment.

Runtime `0.22.6` restored the pre-adjustment Runtime `0.22.3` presentation baseline.

Therefore:

- do not load/revive `css/chapter-04-dialogue-positioning.css`
- do not normalize every phase merely for mathematical symmetry
- do not move Dialogue to solve a Progress/HUD issue
- a future Progress repair must be isolated to Progress/HUD and audited across Chapters I–IV
- Chapter IV Phase VIII's slightly different accepted ordinary-dialogue position is not by itself a defect
- Phase VI cinematic CG dialogue remains a special isolated surface

A local portrait defect must not become a dialogue-shell redesign.

---

# 4. CURRENT PRODUCTION BUILD / LINKAGE

Current authoritative base Runtime:

`0.22.8`

Latest inspected Production HEAD:

`1e4afcf94a55c87d684eb3dac3aa1442040c1601`

Commit:

`Fix CH5P1 rollback and landing`

Current verified build-facing modules:

- Runtime Build Label: `0.22.8`
- Developer Navigation: `0.22.8-d1`
- North QA: `0.22.8`
- Save Manager: `0.7.10-s2`, scoped save repair follows Runtime `0.22.8`
- Chapter V Phase I: `0.22.8-c5p1r10`
- Chapter V loader: `0.22.8-c5b7`
- Chapter V Owner Walkthrough extension: `0.22.8-c5w3`
- Owner Walkthrough base: `0.22.3-w1`
- Phase VIII core: `0.22.2`
- Phase VIII Matrix Exit: `0.22.7-m1`
- P7/P8 Audio Lifecycle: `0.22.7-a1`
- Hidden Case engine: `0.21.0`

Independent modules do not receive fake version bumps merely to imitate the Runtime shell.

## Atomic build-linkage contract

When the **base Runtime** changes, all applicable player/owner/QA/save-facing endpoints must synchronize before release:

- `index.html` fallback/visible build
- startup/bootstrap generation
- `window.LastWitnessRuntimeBuild`
- `document.documentElement.dataset.runtimeBuild`
- Runtime Build Label source/cache/expectation
- Settings build
- Owner Developer build
- Developer Navigation base version/cache/expectation
- North QA build/version/cache/expectation
- Save-facing build metadata
- changed phase/module versions
- changed phase/module cache keys
- loader expected-version checks
- diagnostics / Copy Test Info values
- QA report
- release notes
- ZIP/package names
- manifest/checksum identities

Any affected mismatch is a **RELEASE BLOCKER**.

Never hide a mismatch through cosmetic relabeling, polling, MutationObservers or post-load text patching.

## Post-upload rule

After P'Benz uploads a package, re-read current Production HEAD and landed authoritative files before treating the release as canonical.

---

# 5. CURRENT RELEASE / INCIDENT HISTORY

Important recent chronology:

- `4034fc263a75118f143e8ce6d1d908ff5598c33d`  
  `Fix P7 P8 background audio lifecycle`  
  Physical Android accepted.

- `fcd10e851a28e8d5c2704ee043013af6f909b074`  
  `Fix CH5P1 layout and bump runtime to 0.22.8`  
  Established Runtime `0.22.8` Chapter V Phase I baseline.

- `6a32555ef5f73b23fd74d0fa5b60db4867cf4c39`  
  `Fix CH5P1 landing and North portraits`  
  **Rejected incident release.** It introduced unacceptable North custom portraits and included collateral changes beyond the owner's requested scope.

- `1e4afcf94a55c87d684eb3dac3aa1442040c1601`  
  `Fix CH5P1 rollback and landing`  
  Current Production. It restored normal North portrait-registry routing, restored Somchai brightness to the accepted `.88`, and retained the corrected Chapter V opening airplane clip.

## Permanent lesson from r9

Never assume "while we are here" polishing is harmless.

When the owner freezes already-working CH5P1 behavior, do not touch:

- Somchai brightness
- `TAP TO CONTINUE`
- scene-note placement
- `NORTH · OFF RECORD`
- HUD
- Progress
- scene brightness
- condo-card timing
- audio
- dialogue geometry
- other North emotions
- Save/Load
- Dev/North QA
- Custody Window
- story flow

unless the owner explicitly identifies a new defect in that area.

---

# 6. SAVE / LOAD / STATE CONTRACT

Do not create a parallel Save system.

Preserve existing manual Save, Load, autosave and checkpoint behavior.

Persist as applicable:

- ordinary state
- `state.chapter4`
- Chapter V state/flags
- evidence/found
- relationship state
- checkpoint
- phase-specific state
- North public-removal state
- `R.` lead
- Hidden Case / ledger-derived state
- future Rin / Last Record state
- final route only once genuinely resolved

Restore order:

1. ordinary state
2. hidden-state migration/ledger
3. ledger uniqueness
4. hidden totals recomputation
5. adaptive route state where required
6. scene resume
7. correct scene audio

Hidden scoring must remain idempotent across:

- Load
- re-entry
- Restart Current
- background/foreground
- evidence revisit
- choice replay

Replayed changed choices replace prior contribution rather than stacking.

Unknown legacy choice = no invented score.

---

# 7. AUDIO LIFECYCLE — ZERO TOLERANCE

No LAST WITNESS phase music, ambience or continuous phase-owned media may continue/reawaken after the browser/app is hidden, backgrounded or minimized.

This is a permanent product rule.

## Leaving foreground

- pause phase-owned continuous media
- preserve `currentTime`
- preserve information required to restore correct volume/ducking
- do not reset simply because the app was backgrounded
- no timer/controller/fade loop may reawaken media while hidden
- suppress/re-pause scoped `play()` attempts while hidden

## Returning foreground

- resume the correct currently active media automatically
- continue from preserved playback position
- restore current dialogue/modal/minigame ducking
- no unrelated user tap should be required
- never resurrect media from an old screen/phase

Accepted maintenance model:

`0.22.7-a1`

Owner physical Android accepted:

- P7 background pause
- P7 automatic foreground resume
- P8 background pause
- P8 Matrix Exit no longer reawakens media
- P8 automatic foreground resume

Return to Title is a hard audio boundary.

Every Chapter V–VII phase containing continuous media must be tested for normal, dialogue, modal, minigame, background, long-background timer, foreground, Save/Load, phase transition and Return Title behavior.

---

# 8. PORTRAIT / DIALOGUE VISUAL CONTRACT

A portrait fails QA if:

- head/face unintentionally clipped
- white matte/halo visible
- source edge exposed
- identity drifts
- portrait stretched
- framing is excessively tight
- portrait floats awkwardly with too much empty space
- face is badly off-center
- source image cannot fill the accepted well attractively

Repair preference:

1. preserve the established dialogue shell
2. verify the source asset itself
3. use `overflow:hidden` appropriately
4. use `object-fit` / `object-position`
5. scale only as needed
6. translate only as needed
7. preserve the complete important head/face
8. show shoulders/upper torso when owner asks
9. if a source cannot frame attractively, use another already-approved source/expression
10. never fix a local portrait problem by globally changing all portraits

## Native bilingual dialogue standard

Thai and English are two native cinematic performances of the same dramatic intent, not literal translations.

Both must preserve:

- facts
- investigative implication
- subtext
- emotional temperature
- relationship dynamic
- character voice

English: natural serious-crime-thriller speech, concise and speakable.

Thai: natural contemporary Thai subtitle rhythm, not translated English syntax.

Unknown-principal language remains gender-neutral until canon permits otherwise.

---

# 9. CHARACTER VOICE LOCK

- **Benedict**: experienced, concise, observant, controlled, evidence-boundary thinker, dry when natural
- **North**: calm, analytically exact, understated, dryly amused at times, never robotic
- **Cheryl**: precise Singapore investigator, socially perceptive, restrained warmth
- **Maya**: direct Indonesian field/legal authority, grounded and decisive
- **Farid**: low-drama technical verification, only necessary explanation
- **Kittisak**: credible institutional authority, protective logic and suspicion coexist
- **Somchai**: discreet operational professional, economical speech
- **Adrian**: lawful technical architect, exact, liability-conscious
- **Arman**: intelligent broker/toolmaker, selective and controlled
- **Ika**: guarded, capable, terse under pressure, physically credible
- **Narin**: operationally credible, pressured and defensive around real wrongdoing
- **Elena**: ordinary, kind, credible, socially normal, harmlessly fallible until late Chapter VII
- **Rin**: intelligent, frightened, evasive, procedurally compromised, distrustful of institutions
- **Ratchata**: concrete forensic/physical-evidence clarity

Elena must never receive villain cadence, loaded wording, suspicious knowing pauses or unnatural prescience before late Chapter VII.

---

# 10. OWNER DEVELOPER MODE

Owner Developer Mode is unrestricted owner test access and is distinct from North QA.

Chapter IV canonical entries remain exactly:

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

No Phase IX without explicit owner approval.

Owner Dev may expose Hidden Case internals and Owner-only diagnostics.

Owner Walkthrough:

- base `0.22.3-w1`
- Chapter V extension `0.22.8-c5w3`
- read-only
- no Save write
- no Hidden Case write
- no gameplay mutation
- no puzzle auto-completion
- no audio control
- no leak to North QA

---

# 11. NORTH QA

Current North QA base: `0.22.8`.

North QA is blind-tester access.

May test:

- routing
- chapter/phase entry
- dialogue
- normal UI
- evidence
- media
- Save/Load
- Restart / Return Title
- mobile interaction
- build label
- continuity

Must never expose:

- hidden scores
- score deltas
- route leader
- projected ending
- thresholds
- Elena gates
- choice ledger
- Owner ending simulator
- Owner Hidden Case controls
- Owner Walkthrough / hints / verified solutions

Blind-test integrity is a product requirement.

---

# 12. HIDDEN CASE ARCHITECTURE

LAST WITNESS does **not** end by asking the player to choose the killer.

Ordinary investigation quietly builds evidentiary/legal state.

At the end:

> **The game reveals which case the entire investigation became capable of proving.**

Current engine:

`js/engine/28-hidden-case-architecture.js`

Version:

`0.21.0`

Properties:

- deterministic
- auditable by owner
- player-invisible
- idempotent
- Save/Load safe
- visible relationship values are not criminal-attribution values

Principal profiles:

- Kittisak
- Narin
- Adrian
- Arman
- Ika
- Elena

Somchai remains a strong cleaner/accomplice/conditional-support path unless owner later promotes him to a standalone false-conviction principal.

Case dimensions include:

- attribution
- motive
- means
- opportunity
- concealment/obstruction
- corroboration
- admissibility
- evidence breadth
- institutional/prosecutability support
- contradiction pressure

Global integrity includes:

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

Every scoring source needs a stable unique source ID and auditable reason.

---

# 13. HISTORICAL TRUTH / SPOILER FIREWALL

Historical truth is fixed in every ending:

- Elena is the mastermind / Decision Owner
- Elena killed Kawin Nopparat
- Elena killed Daniel Voss
- Elena selected victims
- Elena selected room/timing conditions
- Elena controlled discovery sequence
- Elena controlled cleanup priority

Alternate endings change what can be proved or institutionally sustained. They never change history.

Elena visibility target:

- Phase VIII: outside normal Top 3
- Chapter V: low probability
- Chapter VI: below principal false suspects
- early Chapter VII: several non-Elena theories stronger
- late Chapter VII: serious only after cross-class synthesis

Practical blind-play target: roughly under 10% first-play suspicion until late Chapter VII for most testers.

Prohibited early Elena tells:

- ominous smiles
- villain pauses
- "she knows too much" framing
- suspicious perfect intuition
- conspicuous alibis
- unique technical signature
- secret operator calls
- Elena-named pre-reveal phase
- gendered unknown-principal clues

Sensitive canon stays Owner-only / Master-Plan-only and never leaks into North QA or normal player UI.

---

# 14. FALSE PRINCIPALS / CAUSAL ATTRIBUTION

Mandatory false-conviction-capable principals:

1. Kittisak
2. Narin
3. Adrian
4. Arman
5. Ika

Somchai is mandatory high-suspicion cleaner/accomplice/conditional support.

Each false principal needs:

- real serious wrongdoing
- real secret
- plausible motive
- means
- opportunity/delegation
- authentic obstruction
- several evidence classes
- reason for incomplete cooperation
- late contradiction

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

---

# 15. COOPERATION PARADOX

Central question:

> **Why did people with serious secrets give the team exactly enough truth to move forward?**

Canonical principle:

> **A truthful confession can be a form of concealment.**

North:

`Nobody lied about the part they gave us.`

Benedict:

`That doesn't mean they gave us the whole truth.`

Examples:

- Adrian disclosed authentic lawful architecture but not full continuity liability
- Arman disclosed an authentic package but protected deeper broker metadata
- Ika's later Aster timeline is true but not her complete earlier biography
- Kittisak genuinely wants the murder solved while protecting an off-book containment program
- Somchai cooperates until protected-source/off-book handling is threatened

Do not over-explain this theme after the lines already carry it.

---

# 16. R. / RIN

Through Chapter IV, the lead is only:

`R.`

Future identity:

**Rinrada “Rin” Sornchai**

Role:

**Former Identity and Access Registrar · Last Witness**

Rin enters active mystery in Chapter V.

She is not an exposition machine.

She retained/copied material she should not possess, may have made an out-of-procedure credential action, hid for self-protection, distrusts institutions and withholds part of the Last Record until custody is trusted.

Do not reveal her name before the planned Chapter V reveal.

---

# 17. CHAPTER IV CANON

Exactly eight phases:

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

Chapters I–IV are accepted for continuation.

They are maintenance locked except for:

- reproducible defects
- integration blockers
- backward-compatible persistence needs
- explicit owner-requested changes

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

Required flags remain canonical:

- `ch4_p7_facility_lawfully_inspected`
- `ch4_p7_reader_clock_normalized`
- `ch4_p7_r18_correlated`
- `ch4_p7_isolation_order_authorized`
- `ch4_p7_residual_path_observed`
- `ch4_p7_secondary_continuity_supported`
- `ch4_p7_decision_owner_unresolved`
- `ch4_p7_phase8_handoff_ready`

Checkpoint:

`ch4_phase7_complete`

---

# 18. CHAPTER IV PHASE VIII — SHADOW OF THE TRUTH

Phase VIII closes Jakarta operationally without solving the mastermind.

It:

- consolidates JKT-R7 proof
- exposes Cooperation Paradox
- preserves North's public false removal / secret survival
- keeps Decision Owner unresolved
- establishes `R.` as next lead
- strengthens multiple non-Elena theories
- seeds Kittisak suspicion
- closes Indonesia lawfully
- ends before Bangkok arrival

Core remains:

`0.22.2`

Files:

- `js/chapters/chapter-04/08-shadow-of-truth.js`
- `css/chapter-04-phase-08.css`

## Opening / Debrief

Sequence:

`P7 → approved statement-return cinematic → location/time card → Secure Debrief`

No extra Phase VIII title card.

Secure Debrief:

- DAY 6
- 09:18 WIB
- NORTH JAKARTA · INDONESIA
- JKT-R7 · SECURE DEBRIEF
- POST-INCIDENT STATEMENT CLEARED · EVIDENCE RECONCILIATION

Cheryl is physically in Jakarta. Farid is remote in Singapore.

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

Canonical interpretation remains unchanged.

Matrix Exit maintenance:

`0.22.7-m1`

Accepted behavior:

- explicit Close
- return to Secure Debrief without completing/resetting Matrix
- Resume control
- placements and attempts preserved
- no canonical state mutation

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

Can read as legitimate protection or evidence control through correct paperwork.

## R. lead

Cross-map:

- Room 1807
- Profile 18-07
- pier contact
- registrar activity

`R.` becomes next lawful lead.

Do not reveal Rin by name here.

## Departure / NORTH REMOVED card

Departure:

- SOEKARNO-HATTA · INTERNATIONAL DEPARTURES
- DAY 6 · 16:42 WIB

The personnel card is:

- `PUBLIC PERSONNEL RECORD`
- `NORTH`
- `REMOVED`
- `No correction published`
- `CONTINUE`

DOM:

`#ch4P8RemovalCard`

Its narrative persistence is intentional. It remains until the player presses its own `CONTINUE`.

### OPEN DEFECT — SETTINGS / GAME MENU STACKING

Owner physical Android reproduced a layering defect on 2026-08-17.

Current source:

- `.ch4-p8-removal-card` has `z-index:420`
- global `.drawer,.modal` shell has `z-index:95`

Result:

the NORTH REMOVED personnel card remains **above** Game Menu / Settings and covers the menu.

This is wrong.

Required behavior:

- Game Menu / Settings must visually stack above `#ch4P8RemovalCard`
- the card may stay pending underneath
- closing Menu / Settings reveals the same pending card
- player still presses the card's own `CONTINUE`
- opening Menu / Settings must not auto-dismiss the card
- must not auto-advance narrative
- must not mark evidence complete
- must not mutate Hidden Case / Save / checkpoint merely due to opening settings

Repair as a **surgical stacking-context defect only**.

Do not redesign:

- removal card
- Game Menu
- Settings
- Phase VIII departure
- Matrix Exit
- Phase VIII audio
- Phase VIII evidence/state logic

This defect reopens only this narrow Phase VIII presentation behavior, not Chapter IV globally.

---

# 19. CHAPTER IV FINAL STATE

Canonical Chapter IV end-state remains:

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

Status:

`CHAPTER IV COMPLETE · ACCEPTED BASELINE + ISOLATED P8 STACKING DEFECT`

---

# 20. CHAPTER V — THE MISSING PIECE

Exactly eight phases:

1. RETURN TO BANGKOK
2. NAME IN ROOM 1807
3. ROOM / PROFILE CROSS-MAP
4. DANIEL'S HANDOFF
5. THE REGISTRAR
6. PIER RECONSTRUCTION
7. WITNESS EXTRACTION
8. THE MISSING PIECE

Adaptive mode:

**INFLUENCE**

Target:

roughly 75–85% shared canonical spine, 15–25% adaptive emphasis.

---

# 21. CHAPTER V PHASE I — RETURN TO BANGKOK

Current Production module:

`0.22.8-c5p1r10`

Current loader:

`0.22.8-c5b7`

This phase is now **preliminarily acceptable except for exactly two North portrait shots** listed below.

Everything else is frozen for now unless P'Benz reproduces another defect.

## Current canonical flow

1. landing cinematic
2. automatic Bangkok arrival card, approximately 3 seconds, **no Continue**
3. Evidence Division
4. Briefing Room
5. Singapore/Jakarta return briefing
6. North public cover story
7. Kittisak / Somchai custody thread
8. `CUSTODY WINDOW`
9. investigative emphasis choice
10. walk-to-condo cinematic
11. automatic condo card, approximately 3 seconds, **no Continue**
12. Benedict condominium interior
13. North reveal
14. private debrief
15. Phase Complete
16. Phase II teaser

Working Bangkok arrival:

`DAY 6 · 21:50 ICT`

Walk-to-condo overlay:

`DAY 7 · 20:36 ICT · BANGKOK`

## Approved opening clip

Current approved asset:

`assets/video/chapter-05/phase-01/bangkok-landing.mp4`

This is the corrected clip supplied by P'Benz after the earlier aircraft-motion logic issue was fixed by reversing the video and rebuilding its sound afterward.

**Do not reverse, replace, retime, recolor, re-edit or otherwise alter this clip without a new owner instruction.**

## Walk clip

Current walk-to-condo cinematic remains accepted.

Do not alter it without a new reproduced defect.

---

# 22. CHAPTER V PHASE I AUDIO

Locked score assets:

- `Opening Scene C5P1.mp3`
- `Walk to condo scene.mp3`

Production paths:

- `assets/audio/chapter-05/phase-01/opening-scene-c5p1.mp3`
- `assets/audio/chapter-05/phase-01/walk-to-condo-scene.mp3`

Intent:

- Opening score carries landing through police/briefing
- Walk score carries walk-to-condo through Phase Complete
- MP4 embedded ambience/SFX remain
- dialogue/minigame duck rather than abrupt stop
- scene-aware gain
- smooth fades/crossfades
- background pauses media while preserving position
- foreground resumes correct active media automatically

Do not claim Android pass unless P'Benz confirms it.

---

# 23. CUSTODY WINDOW — EXACT CANON

Step 1 exact sequence:

**PROTECTION ORDER → RECORDS SEALED → HAND-CARRY TRANSFER**

Step 2 exact conclusion:

**The chain is valid. The timing still deserves review.**

Finding:

- AUTHORITY: VALID
- CUSTODY: DOCUMENTED
- SEQUENCE: PLAUSIBLE
- TIMING: REQUIRES REVIEW

Wrong answer:

`NOT SUPPORTED BY THE RECORD`

Do not rewrite these accepted validator answers unless story canon changes explicitly.

---

# 24. CH5P1 DEV / NORTH QA / WALKTHROUGH

Chapter V Phase I is available after Chapter IV Phase VIII.

Hidden Case Owner internals remain separate.

Owner Walkthrough Chapter V extension:

`0.22.8-c5w3`

Base Owner Walkthrough remains:

`0.22.3-w1`

Chapter V Phase I walkthrough steps:

1. landing / auto arrival
2. Evidence Division / return briefing
3. North public cover story
4. Custody Window exact solution
5. private route / North reveal
6. Phase Complete / Phase II handoff

Owner Dev and North QA remain separate release endpoints.

No Owner Hidden Case internals or Owner Walkthrough solutions leak into North QA.

---

# 25. CH5P1 CURRENT ACCEPTANCE / FREEZE

Current r10 status after rollback:

- corrected airplane opening clip: accepted
- arrival card auto timing: accepted-for-now
- police/briefing flow: accepted-for-now
- scene notes: accepted-for-now
- `NORTH · OFF RECORD`: accepted-for-now
- `TAP TO CONTINUE`: accepted-for-now
- condominium card auto timing: accepted-for-now
- condominium scenes: accepted-for-now
- scene brightness: accepted-for-now
- Somchai portrait framing/brightness: accepted-for-now
- Custody Window: accepted-for-now
- audio behavior: accepted-for-now pending future reproduced issues
- Save/Load linkage: current Production baseline
- Dev/North QA linkage: current Production baseline

### Somchai lock

Current Production scoped Somchai presentation:

`filter: brightness(.88)`

This is the restored accepted value after r9 collateral damage.

**Do not alter Somchai brightness unless P'Benz explicitly requests it again.**

### Rejected r9 North custom portraits

The r9 custom North portrait experiment is rejected.

Do not reuse/reintroduce those assets merely because they exist in repository history or local artifacts.

Current r10 routes North through the normal portrait registry.

---

# 25A. CH5P1 FROZEN-AREA MATRIX — DO NOT TOUCH DURING CURRENT REPAIR

The following areas are considered acceptable-for-now and are frozen during the current two-portrait repair:

| Area | Current status | Current repair permission |
|---|---|---|
| corrected landing clip | accepted | NO |
| landing → arrival transition | accepted-for-now | NO |
| arrival card ~3s auto | accepted-for-now | NO |
| Police scene | accepted-for-now | NO |
| Briefing scene | accepted-for-now | NO |
| secondary scene-note style | accepted-for-now | NO |
| `NORTH · OFF RECORD` | accepted-for-now | NO |
| `TAP TO CONTINUE` | accepted-for-now | NO |
| Custody Window | accepted-for-now | NO |
| walk-to-condo video | accepted-for-now | NO |
| condo auto card ~3s | accepted-for-now | NO |
| condo scene brightness | accepted-for-now | NO |
| Somchai brightness `.88` | accepted | NO |
| Benedict portrait | accepted-for-now | NO |
| other North emotions | accepted-for-now | NO |
| CH5P1 music/ducking | accepted-for-now | NO |
| HUD / Save / Menu | accepted-for-now | NO |
| Progress | accepted-for-now | NO |
| Save/Load wiring | current baseline | NO |
| Dev / North QA | current baseline | NO |
| North `concerned` target shot | OPEN DEFECT | YES |
| North `relieved` target shot | OPEN DEFECT | YES |

A new room must treat this table as a **scope firewall**.

If a repair requires touching a frozen area merely because it is convenient, stop and find a more surgical method. Ask the owner only if a frozen-area change is genuinely unavoidable and materially necessary.

---

# 26. ONLY REMAINING CH5P1 DEFECT

P'Benz identified exactly two North dialogue portraits in the lower dialogue panel that still require improvement:

### Defect A

Speaker: **NORTH**  
Emotion: `concerned`  
Dialogue:

`How bad was he?`

### Defect B

Speaker: **NORTH**  
Emotion: `relieved`  
Dialogue:

`Good. Then we keep it that way.`

## Owner requirement

For these **two shots only**:

- entire North head visible
- no left-side head clipping
- no top clipping
- show a tasteful amount of shoulders / upper torso
- portrait should fill the established well attractively
- preserve approved North identity
- preserve the correct emotion
- preserve graphic-novel visual language
- use the approved North Expression Sheet / correct source portrait as basis
- do not simply zoom the face to hide a crop issue
- do not modify unrelated North emotions
- do not modify dialogue shell geometry

## Absolute collateral-change prohibition for this repair

Do **not** touch:

- Somchai
- Benedict portrait framing
- other North emotions
- scene-note positions/style
- `NORTH · OFF RECORD`
- `TAP TO CONTINUE`
- HUD
- Progress
- dialogue geometry
- condo card timing
- scene brightness
- audio
- opening clip
- walk clip
- Custody Window
- Save/Load
- Developer tools
- North QA
- story copy/flow

After these two portraits pass P'Benz's Android inspection, Chapter V Phase I may be treated as owner-acceptable for continuation unless another real-device defect is reported.

Reference screenshots are bundled with the room-handoff package when available.

---

# 27. CHAPTER V PHASE II — NAME IN ROOM 1807

This becomes the immediate story-production objective **only after the two open maintenance defects are accepted on Android**.

Reveal Room 1807 victim:

**Kawin Nopparat**

Raise Narin suspicion sharply.

Narin may have:

- known Kawin operationally/professionally
- had reason to fear disclosure
- deployment intersecting Kawin access window
- a record changed after disappearance

Kittisak may also have known protected identity earlier than Benedict was told.

Do not turn the reveal into Elena evidence.

---

# 28. CHAPTER V PHASES III–VIII

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

Reconstruct the physical event linked to Kawin/Daniel.

Reopen Ika through pre-Aster alias, travel gap, unlicensed field work or capability evidence.

Aster recruitment after the murders remains true.

## Phase VII — WITNESS EXTRACTION

A real threat forces emergency movement of Rin/protected source.

Kittisak orders off-book protection through Somchai.

Intent protective, procedure suspicious.

Simultaneously:

- Ika-related tradecraft appears
- Narin resists/disappears
- Adrian restricts system path
- Arman protects/destroys a key

Different suspects behave badly for different reasons.

## Phase VIII — THE MISSING PIECE

Prove that several real concealment systems coexist.

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

# 29. CHAPTER VI — THE FINAL MOVE

Nine phases:

1. CASE THEORY WITHOUT A CHARGE
2. CONTROLLED LEAK
3. ALLIANCE ASSIGNMENT
4. CONTINUITY PROTOCOL
5. ATTACK ON SAFE CHAIN
6. EVIDENCE DIVISION BREACH
7. THE QUIET CHANNEL
8. TWO STAGING SITES
9. THE FINAL MOVE

Adaptive mode:

**DIVERGE**

Target roughly 60–70% shared spine, 30–40% adaptive variation.

Do not create five entirely separate Chapter VIs.

Key rules:

- construct five serious principal cases
- controlled leak produces multiple suspicious reactions
- continuity protocol intersects multiple actors
- Safe Chain attack supports multiple readings
- Evidence Division breach creates strongest Kittisak spike
- `THE QUIET CHANNEL` replaces old `ELENA KNOWS`
- Elena-compatible facts remain mundane administrative details
- no direct Elena confrontation
- Two Staging Sites strengthens mastermind/accomplice models
- end with at least three strong non-Elena theories
- Last Witness / Last Record becomes central

---

# 30. CHAPTER VII — LAST WITNESS

Eight phases:

1. THE ROOM REPEATS
2. THE PIER
3. RESCUE / PRESERVE
4. FIVE PRINCIPALS
5. THE LAST RECORD
6. FINAL RECONSTRUCTION
7. THE WEIGHT OF PROOF
8. RECORD OR RELEASE / ENDING

Adaptive mode:

**RESOLVE**

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

Rin / Last Record provides first evidence class the five false principals cannot fully absorb.

It does not simply say:

`Elena did it.`

It exposes structural contradiction across:

- sequence
- physical event
- accepted record
- who could know what when
- decision selection vs later execution

## FINAL RECONSTRUCTION

Only here may Elena become fully serious.

Elena requires several independent evidence classes.

No single clue/class is enough.

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

# 31. ENDING ARCHITECTURE

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

TRUE CONVICTION requires:

- Elena attribution convergence
- Elena prosecutability convergence
- clean multi-class support
- chain integrity
- Last Record
- chronology bridge
- physical/legal bridge

RIGHT NAME, NO CASE:

truth understood, legal bridge fails.

FALSE CONVICTION:

institution accepts strongest sustainable wrong case against a person guilty of serious wrongdoing but not the historical murders.

THE PERFECT RECORD:

no clean prosecution survives or an accepted wrong institutional narrative becomes too complete to reopen.

---

# 32. EVIDENCE ARCHITECTURE

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

Each false principal should receive at least three independent classes plus:

- authentic obstruction
- dark secret
- motive
- opportunity/delegation
- late contradiction

Elena proof requires multiple independent classes including:

- physical/human bridge
- chronology/decision-order bridge
- at least one formerly innocuous latent clue

Never solve the mystery with one confession, email, CCTV frame, timestamp, recording, witness or database row.

---

# 33. ADAPTIVE STORY RULE

Progression:

- P8 = CALCULATE
- Chapter V = INFLUENCE
- Chapter VI = DIVERGE
- Chapter VII = RESOLVE

Adaptive variation may change:

- emphasis
- follow-up dialogue
- optional scene
- pressure target
- suspect-response prominence
- evidence foregrounding
- legal theory viability

It may not change historical facts.

Anti-snowball:

a leader-focused sequence must preserve competition, expose contradiction, strengthen another suspect or create legal risk.

Prefer top-pair / top-three viable theory targeting over a single leader.

No Elena hidden value grants early Elena spotlight.

> **Story creates score consequences. Score does not invent arbitrary story facts.**

---

# 34. CHARACTER DUTY MATRIX

| Character | Phase VIII | Chapter V | Chapter VI | Chapter VII |
|---|---|---|---|---|
| Benedict | disclosure boundaries | rebuild Bangkok case | competing theories | final reconstruction |
| North | Cooperation Paradox | hidden analyst / registrar map | telemetry / contradiction | technical Last Record reconstruction |
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

# 35. CURRENT QA / RELEASE GATE

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

## Build linkage

Verify all affected:

- Runtime
- Settings
- Owner Dev
- North QA
- Save-facing identity
- changed module versions
- cache generations
- loader expectations
- packaged artifact naming
- manifest/checksum

Mismatch = blocker.

## Mobile viewports

At minimum:

- 360×740
- 375×812
- 390×844
- 412×915
- 430×932

Check:

- safe area
- footer clipping
- horizontal overflow
- portrait framing
- Progress
- primary-button reachability
- route cards
- modals
- menus
- stacking contexts

## Open defect regression checks

### CH4P8 personnel card

Reproduce:

1. reach Jakarta departure
2. leave `NORTH · REMOVED` card pending
3. open Game Menu / Settings
4. verify Menu/Settings fully covers the card
5. close Menu/Settings
6. verify pending card returns unchanged
7. press its own `CONTINUE`
8. verify normal departure flow
9. verify evidence/state not changed merely by opening Settings
10. verify Matrix Exit and audio lifecycle still behave as previously accepted

### CH5P1 North portraits

Inspect only:

- `How bad was he?`
- `Good. Then we keep it that way.`

Acceptance:

- full head visible
- shoulders/upper torso visible
- attractive fill
- no left/top clipping
- identity/expression correct
- no dialogue-shell regression
- no collateral visual changes elsewhere

Physical Android Chrome remains final acceptance.

---

# 36. CURRENT PRODUCTION STATUS — 2026-08-17

Production HEAD:

`1e4afcf94a55c87d684eb3dac3aa1442040c1601`

Message:

`Fix CH5P1 rollback and landing`

Current base Runtime:

`0.22.8`

Current Chapter V Phase I:

`0.22.8-c5p1r10`

Current Chapter V loader:

`0.22.8-c5b7`

Current build snapshot:

- Runtime Build Label: `0.22.8`
- Developer Navigation: `0.22.8-d1`
- North QA: `0.22.8`
- Save Manager: `0.7.10-s2`
- Owner Walkthrough base: `0.22.3-w1`
- Chapter V walkthrough extension: `0.22.8-c5w3`
- Phase VIII core: `0.22.2`
- Hidden Case: `0.21.0`
- Matrix Exit: `0.22.7-m1`
- P7/P8 Audio Lifecycle: `0.22.7-a1`

## Owner acceptance snapshot

Accepted / closed:

- Chapters I–IV overall continuation baseline
- P8 Matrix Close / Resume
- P7/P8 background audio maintenance
- current corrected Chapter V opening clip
- CH5P1 current flow except two North portrait shots
- Somchai brightness restored to `.88`
- rejected r9 North custom portrait experiment rolled back

Open:

1. **CH4P8 Game Menu / Settings must cover NORTH REMOVED card**
2. **CH5P1 North portrait at “How bad was he?”**
3. **CH5P1 North portrait at “Good. Then we keep it that way.”**

These are the immediate known defects at this handoff.

No other CH5P1 component should be reopened merely because these defects remain.

---

# 36A. OPEN-DEFECT EXECUTION MATRIX — EXACT FIRST WORK

This matrix is the authoritative maintenance queue at the moment of handoff.

## DEFECT FAMILY A — CHAPTER IV PHASE VIII

### Symptom
At Jakarta airport/departure, the persistent personnel card:

- `PUBLIC PERSONNEL RECORD`
- `NORTH`
- `REMOVED`
- `No correction published`
- `CONTINUE`

remains visible until its own `CONTINUE` is pressed.

When Game Menu / Settings is opened before pressing `CONTINUE`, the card currently stacks above the menu.

### Reference
Bundled screenshot:

`REFERENCE_CH4P8_REMOVAL_CARD_SETTINGS.jpg`

### Known source target
Card DOM:

`#ch4P8RemovalCard`

Primary phase files:

- `js/chapters/chapter-04/08-shadow-of-truth.js`
- `css/chapter-04-phase-08.css`

Global menu/modal shell is defined in the shared UI layer.

### Known source relationship at handoff
- `.ch4-p8-removal-card` uses `z-index:420`
- global `.drawer,.modal` uses `z-index:95`

This is a strong source-level explanation for the reproduced Android symptom.

### Required repair
Fix the stacking relationship so:

1. Game Menu / Settings covers the personnel card.
2. The personnel card remains pending underneath.
3. Closing Menu / Settings reveals the same pending card.
4. The card's own `CONTINUE` still advances normally.
5. Opening Settings does not dismiss the card.
6. Opening Settings does not auto-advance the story.
7. Opening Settings does not mutate evidence/checkpoint/Hidden Case merely by opening.
8. No Phase VIII redesign.

### Forbidden collateral changes
Do not alter:

- personnel-card copy
- card geometry unless technically required for stacking only
- Departure scene
- takeoff flow
- route card
- Matrix validator
- Matrix Close/Resume
- Phase VIII audio lifecycle
- Save schema
- Hidden Case
- Chapter IV story
- global menu appearance

### Pass gate
Local/static:
- source stacking inspected
- only intended CSS/JS paths changed
- syntax check passes where applicable
- no stale version/cache mismatch for changed shipped source

Owner Android:
- Settings fully covers card
- card returns unchanged after Settings closes
- Continue still works
- no new overlay/audio/state regression

---

## DEFECT FAMILY B — CHAPTER V PHASE I NORTH PORTRAITS

### Scope
Exactly two lower dialogue-panel portraits.

#### Shot 1
Speaker: `NORTH`  
Emotion: `concerned`  
Line:

`How bad was he?`

Bundled screenshot:

`REFERENCE_CH5P1_NORTH_HOW_BAD_WAS_HE.jpg`

#### Shot 2
Speaker: `NORTH`  
Emotion: `relieved`  
Line:

`Good. Then we keep it that way.`

Bundled screenshot:

`REFERENCE_CH5P1_NORTH_GOOD_KEEP_IT_THAT_WAY.jpg`

### Required visual result
For both shots:

- complete head visible
- no left-side clipping
- no top clipping
- shoulders / upper torso visible
- portrait fills accepted portrait well attractively
- North identity preserved
- correct emotion preserved
- no stretching
- no white/source edge
- no face-only zoom
- no awkward excessive empty space

### Source rule
Current r10 uses normal portrait-registry routing.

The rejected r9 custom North portrait assets are **not approved repair sources**.

Before editing:
1. inspect the actual source asset for `concerned`
2. inspect the actual source asset for `relieved`
3. inspect the approved North expression sheet/reference
4. determine whether the defect is:
   - source export framing
   - dialogue-well fit/crop
   - or both
5. repair only these two expression routes/assets as needed

### Forbidden collateral changes
Do not alter:

- Somchai
- Benedict
- any other North emotion
- dialogue shell
- `TAP TO CONTINUE`
- scene notes
- `NORTH · OFF RECORD`
- HUD
- Progress
- scene brightness
- condo timing
- audio
- landing clip
- walk clip
- Custody Window
- Save/Load
- Dev
- North QA
- walkthrough behavior
- dialogue/story text

### Pass gate
Local:
- verify both target portraits at production mobile geometry
- full head / upper torso visible
- compare only intended files against current Production
- package allowlist exact
- syntax/build linkage unaffected or correctly updated where applicable

Owner Android:
- P'Benz visually accepts both shots
- no collateral regression in adjacent CH5P1 dialogue

---

## DEFECT QUEUE COMPLETION RULE

Do not mark the queue closed because local tests look correct.

Queue closes only when P'Benz confirms physical Android acceptance.

After both defect families pass:

`CH5P1 = OWNER-ACCEPTABLE FOR CONTINUATION`

Then proceed to:

`CHAPTER V · PHASE II · NAME IN ROOM 1807`

---

# 37. IMMEDIATE NEXT-ROOM PRIORITY

The new room must begin with maintenance, not story expansion.

Order:

1. read this Master Plan
2. inspect current Production HEAD
3. reproduce/inspect the CH4P8 stacking issue from source and owner screenshot
4. repair only the stacking relationship
5. repair only the two named North CH5P1 portrait shots
6. do not touch unrelated accepted CH5P1 behavior
7. test locally honestly
8. package the exact intended files only
9. provide commit name ≤ 50 characters
10. P'Benz performs physical Android acceptance
11. once both defect families pass, freeze CH5P1
12. begin `CHAPTER V · PHASE II · NAME IN ROOM 1807`

Do not start Chapter V Phase II before the owner accepts these maintenance defects unless P'Benz explicitly changes priority.

---

# 37A. PROJECT-FILE DELIVERY GATE — MUST PASS BEFORE REPLY

Whenever delivering any LAST WITNESS file/package to P'Benz, verify all applicable items before the final reply:

1. file actually exists
2. user-visible sandbox download link is provided
3. delivered scope matches the owner's request exactly
4. no unrelated file slipped into the package
5. changed-file allowlist is stated or internally verified
6. final archive bytes are checksummed when the package is release/upload oriented
7. current Production baseline was used for repair work
8. changed source version/cache/loader linkage is consistent where applicable
9. testing is described honestly
10. Android acceptance is never claimed without P'Benz confirming it
11. a proposed **Commit Name** is included automatically
12. Commit Name is **50 characters or fewer**
13. Commit Name matches the actual delivered scope
14. Commit Name appears in a copyable code block
15. if multiple independent packages are delivered, each receives the correct Commit Name
16. no GitHub write is implied unless actually authorized/performed
17. if the owner uploads manually, the response says so accurately
18. after a landed upload, inspect Production before treating it as canonical

A file delivery missing its Commit Name or download link is **incomplete**.

A package containing collateral changes outside the owner-requested scope is **rejected**, even if the requested defect itself is fixed.

---

# 38. PROHIBITED SHORTCUTS

Do not:

- reveal Elena in Chapter IV/V
- make Elena dominant in Chapter VI
- name pre-reveal phase after Elena
- use gendered unknown-principal language
- treat cooperation as innocence
- clear Ika because Aster hired her later
- clear Arman because he only built a tool
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
- resurrect reverted Phase VIII repair loader
- call mocked media physical E2E
- release mismatched build endpoints
- leak Owner-only data to North QA
- let Walkthrough mutate gameplay
- let Owner Inspector synthetic values mutate canonical state
- let background audio continue/reawaken
- require user tap to wake score after foreground return
- write stiff translator-like Thai/English
- villain-code Elena early
- change Somchai brightness without explicit instruction
- resurrect rejected r9 North custom portraits
- change `TAP TO CONTINUE` while fixing North
- change `NORTH · OFF RECORD` while fixing North
- change scene-note positioning while fixing North
- change CH5P1 timing/audio/HUD/Progress while fixing North
- auto-dismiss the CH4P8 NORTH REMOVED card merely because Settings opens
- auto-advance Phase VIII while repairing the z-index defect
- assume an accepted chapter can never have a later isolated defect
- interpret one isolated defect as permission to reopen an entire chapter

---

# 39. MASTER QUALITY STANDARD

The mystery from Phase VIII through Chapter VII should feel:

**nearly impossible before reconstruction, disturbingly inevitable afterward.**

Desired sequence:

1. rejection
2. disorientation
3. recognition
4. inevitability
5. replay aftershock

Every major phase from Phase VIII onward must:

- advance at least one strong non-Elena theory
- preserve/strengthen another
- plant/preserve/reinterpret a future evidence dependency
- keep Elena visible suspicion within stage limit

Canonical final idea:

> **Elena built a crime in which the evidence told the truth about almost everyone except the question that mattered most.**

---

# 40. FINAL NON-NEGOTIABLE SUMMARY

- Owner physical Android evidence is highest authority.
- Current Production HEAD is `1e4afcf94a55c87d684eb3dac3aa1442040c1601`.
- Current authoritative Runtime is `0.22.8`.
- Current CH5P1 is `0.22.8-c5p1r10`.
- Current CH5 loader is `0.22.8-c5b7`.
- Chapter IV has exactly 8 phases.
- Chapters I–IV remain accepted continuation baseline with isolated maintenance allowed.
- Phase VIII Matrix Exit remains accepted.
- P7/P8 background audio maintenance remains accepted.
- Chapter V Phase I is preliminarily acceptable except two North portraits.
- The two North shots are `How bad was he?` and `Good. Then we keep it that way.`
- Repair those two portrait shots only; no collateral CH5P1 edits.
- Current corrected `bangkok-landing.mp4` is approved and frozen.
- Somchai brightness is restored to `.88` and frozen unless owner says otherwise.
- Rejected r9 North custom portraits must not be resurrected.
- CH4P8 `#ch4P8RemovalCard` currently stacks above Settings/Game Menu and must be surgically fixed so Menu/Settings cover it while it remains pending underneath.
- Opening Settings must not dismiss/advance/mutate the personnel card state.
- After both defect families pass owner Android, freeze CH5P1 and begin Chapter V Phase II.
- Interface/UI shells are implementation contracts.
- Build linkage is atomic and mismatches block release.
- Owner Developer and North QA are separate mandatory endpoints.
- Hidden Case is deterministic, auditable, idempotent and player-invisible.
- Player never chooses killer from a final list.
- Five false principals: Kittisak, Narin, Adrian, Arman, Ika.
- Somchai remains strong cleaner/accomplice/support.
- Rin is `R.` / Last Witness and is revealed in Chapter V, not Chapter IV.
- Elena is historical murderer/mastermind in every route.
- Elena remains low-signal through Chapter V and below principal false theories in Chapter VI.
- Elena becomes fully serious only in late Chapter VII synthesis.
- Alternate endings change what is provable/sustainable, never historical truth.
- P8 = CALCULATE; Ch V = INFLUENCE; Ch VI = DIVERGE; Ch VII = RESOLVE.
- No single clue and no single ordinary choice decides the ending.
- Commit names are ≤ 50 characters.
- Every project file delivery must include a scope-accurate Commit Name of 50 characters or fewer, without waiting for the owner to ask.
- GitHub writes require explicit authorization in the current turn.
- New rooms must not ask the owner to repeat locked decisions contained here.

This is the canonical zero-question continuation contract as of 2026-08-17.
