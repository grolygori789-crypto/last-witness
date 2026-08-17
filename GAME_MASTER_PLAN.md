# LAST WITNESS - GAME MASTER PLAN

> **CANONICAL MASTER REFERENCE / FINAL ZERO-QUESTION ROOM HANDOFF**
>
> **Revision:** 2026-08-17 12:57 ICT  
> **Game:** LAST WITNESS  
> **Studio:** BENEDICT INTERACTIVE  
> **Repository:** `grolygori789-crypto/last-witness`  
> **Production/default branch:** `production-rebuild`  
> **Latest inspected Production HEAD / runtime-code baseline:** `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e`  
> **HEAD message:** `Sync Chapter V loader cache key`  
> **Authoritative base Runtime:** `0.22.8`  
> **Runtime/bootstrap maintenance generation:** `0.22.8-r2` / cache `0228r2`  
> **Resolved CH4P8 stacking maintenance:** `0.22.8-z1` / cache `0228z1`  
> **Current Chapter V Phase I module:** `0.22.8-c5p1r10`  
> **Current Chapter V loader:** `0.22.8-c5b7`  
> **Current Chapter V loader cache in `index.html`:** `0228c5b7`  
> **Loader cache-linkage status:** `OWNER ANDROID SMOKE PASS`  
> **Current accepted playable boundary:** `CHAPTER V · PHASE I · PRELIMINARILY ACCEPTABLE WITH EXACTLY TWO NORTH PORTRAIT DEFECTS`  
> **Chapter IV status:** `COMPLETE · OWNER ANDROID ACCEPTED · NO CURRENTLY KNOWN OPEN DEFECT`  
> **Only current open maintenance scope:** `CH5P1 NORTH concerned + relieved portrait shots`  
> **Immediate production priority:** repair exactly the two CH5P1 North portrait shots, obtain owner Android acceptance, freeze CH5P1, then begin `CHAPTER V · PHASE II · NAME IN ROOM 1807`  
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

This revision is the final zero-question handoff snapshot for the current room move. It preserves all established story canon, Hidden Case architecture, ending architecture, Interface/UI contract, Developer/North QA separation, Save/Load rules, audio lifecycle, dialogue/subtitle standards, release discipline, build-linkage rules and Chapters IV–VII long-game plan while updating the current Production truth after both the owner-accepted CH4P8 stacking repair and the owner-tested Chapter V loader cache-linkage correction.

The current Production base Runtime is still `0.22.8`. The CH4P8 repair is **scoped maintenance under the same base Runtime**, not a base Runtime bump. Do not downgrade, rebuild from older snapshots, or fake-bump unrelated stable modules merely to make version strings look uniform.

Current final handoff status: the Chapter IV Phase VIII `NORTH · REMOVED` Game Menu / Settings stacking defect is **RESOLVED and physically accepted by P'Benz on Android** after commit `76bbcceff1ad28eb81b921a5d0053da1283f2a2e`. The later linkage-only commit `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e` (`Sync Chapter V loader cache key`) changed exactly the Chapter V loader cache URL in `index.html` from `0228c5b5` to `0228c5b7`; P'Benz then smoke-tested the game on Android and reported it working normally. Base Runtime remains `0.22.8`. The only known open maintenance work is the two named North portrait shots in Chapter V Phase I.

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


## Canon-detail preservation rule — NEVER SILENTLY DROP LOCKED DETAIL

This final revision updates current Production and handoff status. It does **not** revoke detailed canon merely because an older paragraph is condensed, moved or summarized.

The full pre-final Master Plan history, especially the detailed runtime/canon baseline around `1e4afcf94a55c87d684eb3dac3aa1442040c1601` and the preservation documentation commit `1ad81889a0d6d4b3a3dcf5cb03b0eed1da6cc33b`, remains an incorporated historical-detail reference for any locked detail that:

1. does not conflict with P'Benz's newer physical-device observation or explicit instruction,
2. has not been explicitly superseded by this revision,
3. remains compatible with current Production.

A new room must never interpret omission as permission to invent a different canon.

When a detail needed for implementation is not repeated verbatim here:

1. inspect current Production source first,
2. inspect this Master Plan and paired Migration Prompt,
3. inspect relevant repository history / earlier Master Plan only when needed,
4. apply the newest owner/status/freeze rule over older detail,
5. do not ask P'Benz to repeat a decision recoverable from those sources.

This rule exists specifically to prevent documentation cleanup from silently erasing story, UI, QA or release constraints.

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
2. Read the paired `LAST_WITNESS_ROOM_MIGRATION_PROMPT.md` completely.
3. Inspect current Production on:
   - repository: `grolygori789-crypto/last-witness`
   - branch: `production-rebuild`
4. Compare current Production HEAD with the handoff runtime-code baseline:
   - baseline HEAD: `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e`
   - baseline message: `Sync Chapter V loader cache key`
5. P'Benz may upload this final documentation after `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e`. Therefore, if repository HEAD is newer:
   - inspect the diff/history first,
   - if newer commits are documentation/handoff-only, keep `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e` as the latest verified runtime-code baseline,
   - if runtime/code/assets legitimately advanced, use current Production as runtime truth,
   - preserve all locked product/story rules that were not explicitly superseded,
   - never ask P'Benz to explain changes that GitHub can resolve.
6. Confirm current base Runtime and linkage before implementation. At this handoff the base is `0.22.8`, Chapter V loader is `0.22.8-c5b7`, and `index.html` must address it with cache key `0228c5b7`. The previous `0228c5b5` URL is historical and must not be restored.
7. Identify the smallest current task. At this handoff the only known open maintenance items are:
   - North `concerned` portrait at `How bad was he?`
   - North `relieved` portrait at `Good. Then we keep it that way.`
8. Treat CH4P8 stacking as **resolved regression history**, not open work, unless a new physical-device regression is reported.
9. Apply the Source-of-Truth order in Section 0.
10. Ask P'Benz a question only when a genuinely new product/creative decision cannot be resolved from Production, this Master Plan, the Migration Prompt, bundled references or repository history.

Never ask the owner to repeat:

- project/repository identity
- branch
- current Runtime/build policy
- Chapter IV phase count
- Chapters V–VII structure
- current open defects
- CH4P8 resolved status
- Elena/Rin/Hidden Case canon
- ending architecture
- Interface/UI reuse rules
- dialogue geometry freeze
- Dev/North separation
- Save/Load rules
- audio lifecycle
- file-delivery/Commit-Name rule
- build-linkage rule
- current immediate objective

## Handoff artifact contract

For the room move, use the complete final ZIP supplied with this revision. It contains at minimum:

- `GAME_MASTER_PLAN.md`
- `LAST_WITNESS_ROOM_MIGRATION_PROMPT.md`
- `README_HANDOFF.md`
- `HANDOFF_VALIDATION.json`
- `REFERENCE_CH4P8_REMOVAL_CARD_PRE_FIX.jpg` — historical regression evidence only
- `REFERENCE_CH5P1_NORTH_HOW_BAD_WAS_HE.jpg`
- `REFERENCE_CH5P1_NORTH_GOOD_KEEP_IT_THAT_WAY.jpg`
- `REFERENCE_NORTH_PORTRAIT_SOURCE_MAP.md`
- `SHA256SUMS.txt`

The final bundle intentionally does **not** claim to contain a North Expression Sheet unless an actual owner-approved expression-sheet file is present. The new room must not block or ask P'Benz to resend one merely because an older handoff mentioned it. Current Production portrait registry paths, GitHub source/assets and the two owner target screenshots are sufficient to begin diagnosis. If an owner-approved expression sheet is later supplied, it becomes an additional visual reference under the normal Source-of-Truth order.

GitHub remains authoritative for current Production source. Bundled screenshots are owner evidence/reference material.

### First response behavior in a new room

If P'Benz says only:

- `ดำเนินการต่อ`
- `เริ่มได้เลย`
- `แก้ defect ต่อ`
- `ทำงานต่อจากห้องเดิม`

then do **not** ask “ตอนนี้ถึงไหนแล้ว?” or request project status again.

Default actionable order at this handoff:

1. inspect current Production HEAD and confirm no newer runtime change invalidates the handoff
2. inspect the canonical North `concerned` source and target screenshot
3. inspect the canonical North `relieved` source and target screenshot
4. repair **exactly those two portrait shots only** with the smallest safe surface
5. preserve every frozen CH5P1 area
6. run honest local/static/browser checks as available
7. enforce the Build-Linkage Gate before packaging
8. package only intended repository paths
9. provide Commit Name ≤50 characters automatically with every delivered project artifact
10. P'Benz performs physical Android acceptance
11. after both shots pass, freeze CH5P1
12. begin `CHAPTER V · PHASE II · NAME IN ROOM 1807`

### Ambiguity rule

Inspect before asking. Escalate to P'Benz only when:

- two genuinely different owner-level design/canon choices remain after inspection, or
- the request introduces new story/design intent, or
- an actually required asset is unavailable in Production/history/final bundle and no safe existing source can satisfy the task.

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

# 4. CURRENT PRODUCTION BUILD / LINKAGE — ZERO TOLERANCE

## Current authoritative release identity

Base Runtime:

`0.22.8`

Latest inspected Production HEAD / latest verified runtime-code baseline at this handoff:

`7e2e8cd8c79960787cbb812fc4e630537ddd3f4e`

Commit:

`Sync Chapter V loader cache key`

Current verified build/module snapshot:

- Base Runtime / Settings / runtime-facing build: `0.22.8`
- Runtime bootstrap maintenance generation: `0.22.8-r2`
- `index.html` bootstrap cache generation: `0228r2`
- CH4P8 scoped stacking repair: `0.22.8-z1`
- CH4P8 stack-fix stylesheet cache: `0228z1`
- Runtime Build Label: `0.22.8`
- Developer Navigation: `0.22.8-d1`
- North QA: `0.22.8`
- Save Manager: `0.7.10-s2`, save-facing base Runtime identity follows `0.22.8`
- Chapter V Phase I: `0.22.8-c5p1r10`
- Chapter V loader: `0.22.8-c5b7`
- `index.html` Chapter V loader cache: `0228c5b7`
- Chapter V Owner Walkthrough extension: `0.22.8-c5w3`
- Owner Walkthrough base: `0.22.3-w1`
- Phase VIII core: `0.22.2`
- Phase VIII Matrix Exit: `0.22.7-m1`
- P7/P8 Audio Lifecycle: `0.22.7-a1`
- Hidden Case engine: `0.21.0`

The current base Runtime remains `0.22.8`. CH4P8 repair `76bbcceff1ad28eb81b921a5d0053da1283f2a2e` was scoped maintenance. The later `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e` linkage correction changed only the Chapter V loader cache URL in `index.html` to match loader `0.22.8-c5b7`; it did **not** change gameplay logic or bump the base Runtime. P'Benz physically smoke-tested the landed build on Android and reported normal operation. Independent modules do not receive fake bumps merely to imitate the base Runtime.

## Release identity taxonomy — never conflate identities

There are three different version identities:

1. **Base Runtime build**  
   Player/owner/QA/save-facing release identity. Current base: `0.22.8`.

2. **Independent module version**  
   Stable subsystems retain their own version when source is unchanged. Examples: Hidden Case `0.21.0`, Phase VIII core `0.22.2`, Owner Walkthrough `0.22.3-w1`, Matrix Exit `0.22.7-m1`, P7/P8 Audio Lifecycle `0.22.7-a1`.

3. **Scoped maintenance/module generation**  
   An isolated repair under the same base Runtime may carry its own suffix/cache generation when explicitly classified, uniquely versioned, linked and documented. Current example: CH4P8 stacking `0.22.8-z1` / `0228z1`; bootstrap maintenance generation `0.22.8-r2` / `0228r2`.

**Runtime synchronization does not mean fake-bumping every unchanged independent module to the same number.** It means every player/owner/QA/save-facing base identity agrees on the authoritative base Runtime and every changed module has correct compatible source/version/cache/loader linkage. The current Chapter V loader is the concrete example: source `0.22.8-c5b7` and its `index.html` cache URL `0228c5b7` must agree; the old `0228c5b5` URL is stale historical linkage.

If classification is unclear, stop before packaging and resolve whether the work is a base Runtime release, independent module update or scoped maintenance.

## Atomic base-Runtime synchronization contract — OWNER NON-NEGOTIABLE

Whenever the **base Runtime changes**, all applicable endpoints must be updated and validated **atomically in the same release**. Partial linkage is forbidden.

Mandatory matrix:

| Endpoint / identity | Required action when base Runtime changes |
|---|---|
| `index.html` visible/fallback build | update and verify |
| startup/bootstrap Runtime generation | update and verify |
| bootstrap script cache key in `index.html` | fresh key if changed |
| `window.LastWitnessRuntimeBuild` | exact new base Runtime |
| `document.documentElement.dataset.runtimeBuild` | exact new base Runtime |
| Settings visible build | exact new base Runtime |
| Runtime Build Label source/version | exact new base Runtime |
| Runtime Build Label cache/expected version | synchronized |
| Owner Developer visible base build | exact new base Runtime |
| Developer Navigation base-compatible version/cache/expected | synchronized |
| North QA visible/base build | exact new base Runtime |
| North QA source/cache/expected version | synchronized |
| Save-facing Runtime metadata | exact new base Runtime |
| diagnostics / Copy Test Info | exact new base Runtime and current module ids |
| changed phase/module source version | new correct module identity |
| changed phase/module cache key | fresh key |
| loader expected-version check | exact changed module identity |
| loader cache key | fresh if loader changed |
| owner walkthrough extension if affected | source/cache/expected synchronized |
| QA report | same release identity |
| release notes | same release identity |
| ZIP/package filename | same release identity when applicable |
| manifest | same release identity |
| checksum metadata | checksum of final package bytes |
| upload instructions | exact paths/identity for same release |

A mismatch at **any affected endpoint is a `RELEASE BLOCKER`**.

Do not package, publish, call the work complete, or hand it to P'Benz as release-ready until the mismatch is corrected.

Correct sequence:

`FIX → RE-RUN LINKAGE GATE → REPACKAGE → RECHECK FINAL BYTES`

Never conceal a mismatch through:

- cosmetic relabeling
- delayed text replacement
- MutationObserver patches used only to overwrite labels
- polling that masks stale authoritative source
- fallback code that makes UI appear current while loader/source remains stale

Fix the authoritative source and linkage instead.

## Scoped maintenance / module-only change rule

When base Runtime intentionally remains unchanged:

- do not change every base Runtime endpoint merely for visual symmetry
- change only the affected module/file(s) and the loaders/cache keys/expected-version checks that actually address them
- every changed shipped cache-addressed JS/CSS/module receives a fresh cache identity
- update module suffix/version where the project architecture expects one
- update loader expected-version checks when module identity changes
- update release notes/manifest/package metadata to describe the scoped repair
- verify no visible base-build mismatch is introduced

## Current `0.22.8` base-facing endpoint contract

At this handoff, these must resolve coherently to base Runtime `0.22.8`:

- Settings: `LAST WITNESS · BUILD 0.22.8`
- `window.LastWitnessRuntimeBuild`: `0.22.8`
- `document.documentElement.dataset.runtimeBuild`: `0.22.8`
- Runtime Build Label: `0.22.8`
- Owner Developer visible base build: `0.22.8`
- North QA base/runtime report: `0.22.8`
- Save-facing Runtime identity: `0.22.8`
- Developer Navigation: compatible `0.22.8-d1`
- CH5P1: compatible `0.22.8-c5p1r10`
- CH5 loader: compatible `0.22.8-c5b7`
- `index.html` CH5 loader cache: `0228c5b7`
- CH5 Owner Walkthrough extension: compatible `0.22.8-c5w3`

The authoritative Runtime Build Label implementation also synchronizes `window.LastWitnessRuntimeBuild`, the document dataset, Settings, North QA, Owner Developer and Save-facing identity. That does **not** remove the obligation to keep their authoritative source/cache/expected linkage correct.

## Mandatory release stop conditions

STOP and do not package/release when any applicable condition is true:

- Settings and Runtime disagree
- Owner Developer and Runtime disagree
- North QA and Runtime disagree
- Save-facing Runtime is stale
- `window.LastWitnessRuntimeBuild` or document dataset is stale
- changed source version and loader expected version disagree
- changed cache-addressed file still uses previous cache key
- changed loader points at an old module generation
- stale build/cache string remains in an affected authoritative file
- Dev and North endpoints were not checked separately
- scoped maintenance classification is ambiguous
- package contains unintended paths
- packaged bytes differ from validated source
- QA/release/package/manifest/checksum describe conflicting identities
- checksum was computed before the final archive was finalized
- authoritative current version cannot be determined confidently

## Pre-package Build-Linkage Gate — mandatory

Before every release/upload package:

1. inspect current Production HEAD
2. establish exact release classification: base Runtime / module update / scoped maintenance / docs-only
3. identify intended changed-file allowlist
4. search every affected authoritative file for stale prior version/cache strings
5. verify source version ↔ cache key ↔ loader expected version ↔ loader cache key
6. verify Settings/base Runtime identity when applicable
7. verify Owner Developer independently
8. verify North QA independently
9. verify Save-facing identity when applicable
10. verify Runtime Label / `window.LastWitnessRuntimeBuild` / document dataset when applicable
11. verify diagnostics/Copy Test Info when applicable
12. verify ZIP contains exact allowlist and no extra paths
13. verify packaged bytes match the validated local source bytes
14. generate release notes/manifest from the final identity
15. compute checksum **after** the final archive bytes exist
16. reopen/read checksum and package listing once more
17. only then deliver the artifact

## Documentation-only rule

A Master Plan / Migration Prompt / README / validation-only update does **not** bump Runtime or gameplay module versions.

Do not touch runtime source merely to make a documentation commit look like a build release.

## Post-upload rule

After P'Benz uploads any runtime or documentation package:

1. re-read current Production HEAD
2. inspect the landed changed files
3. determine whether the new HEAD is docs-only or runtime-changing
4. verify exact intended files landed
5. if runtime changed, re-run the linkage gate against landed Production
6. only then treat the new state as canonical

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
  **Rejected incident release.** It introduced unacceptable North custom portraits and collateral changes beyond owner scope.

- `1e4afcf94a55c87d684eb3dac3aa1442040c1601`  
  `Fix CH5P1 rollback and landing`  
  Restored normal North portrait-registry routing, restored Somchai brightness `.88`, retained the corrected Chapter V opening clip.

- `1ad81889a0d6d4b3a3dcf5cb03b0eed1da6cc33b`  
  `Complete zero-question master handoff`  
  Documentation-only preservation expansion. It did not change base Runtime.

- `76bbcceff1ad28eb81b921a5d0053da1283f2a2e`  
  `Fix CH4P8 removal card stacking`  
  Added the scoped `0.22.8-z1` CH4P8 stacking stylesheet and bootstrap/cache linkage under base Runtime `0.22.8`. P'Benz physically tested the previously reproduced CH4P8 Game Menu / Settings defect on Android and confirmed it fully resolved.

- `1b31a903c81c05e36fcdf7ba319c3a16f72779a1`  
  `Finalize LAST WITNESS handoff`  
  Documentation-only final-handoff expansion. It did not change Runtime or gameplay source.

- `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e`  
  `Sync Chapter V loader cache key`  
  **Current runtime-code baseline at this handoff.** One-line linkage correction in `index.html`: Chapter V loader URL cache key `0228c5b5` → `0228c5b7`, matching loader source `0.22.8-c5b7`. No gameplay/module source changed. P'Benz then physically smoke-tested the landed game on Android and reported normal operation. Base Runtime remains `0.22.8`.

## Permanent lesson from CH5P1 r9

Never assume “while we are here” polishing is harmless.

When the owner freezes already-working CH5P1 behavior, do not touch Somchai brightness, `TAP TO CONTINUE`, scene-note placement, `NORTH · OFF RECORD`, HUD, Progress, scene brightness, condo timing, audio, dialogue geometry, other North emotions, Save/Load, Dev/North QA, Custody Window or story flow unless the owner explicitly reports a new defect there.

## Historical regression memory — DO NOT REPEAT

These are engineering lessons, not trivia:

- an early Phase VIII package omitted an approved opening MP4; a release is incomplete when an approved binary is missing
- Phase VIII black-screen regressions proved active DOM does not guarantee visible geometry
- phase-level geometry overriding the global `.screen` contract can collapse a visible screen
- broad MutationObserver/class-repair approaches caused startup/UI lock and must not return
- the temporary Phase VIII repair loader was reverted after startup damage; do not resurrect it
- mocked media/static harnesses are never physical playback E2E
- Runtime `0.22.4–0.22.5` dialogue/Progress experiments were rejected on owner Android
- Runtime `0.22.6` restored the pre-adjustment `0.22.3` presentation baseline
- Matrix Exit `0.22.7-m1` solved a trap-state without mutating canonical Matrix progress
- P7/P8 Audio Lifecycle `0.22.7-a1` fixed foreground/background media and is owner Android accepted
- CH5P1 r9 proved collateral polish can invalidate a targeted fix
- CH5P1 r10 is the accepted rollback baseline for the current portrait repair
- CH4P8 stacking `0.22.8-z1` proved the preferred repair style: one narrow authoritative layering correction, fresh cache linkage, no story/state/audio redesign

General rule:

> **ISOLATE THE REPRODUCED DEFECT → REPAIR AUTHORITATIVE SOURCE → UPDATE ONLY REQUIRED LINKAGE → VERIFY → PACKAGE EXACT SCOPE.**

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

## Owner Hidden Case Inspector — detailed safety contract

Owner-only Hidden Case Inspector may present suspect portrait/fallback, suspect name, live score/status, visual score bar, temporary synthetic `− / +` controls, editable synthetic values where implemented, global case dimensions, live leader, simulated leader, projected ending/eligibility diagnostics where already approved, and reset-to-live-state control.

Synthetic adjustment rules are non-negotiable:

- temporary only
- no write to Hidden Case ledger
- no write to Save data
- no write to canonical case state
- no autosave
- no permanent route mutation
- close/reset discards synthetic overrides
- North QA never sees these controls or values

This exists only to accelerate Owner alternate-ending/eligibility testing without contaminating real investigation state.

## Owner Walkthrough — detailed safety contract

Owner Walkthrough may show current step, restrained hint, verified deterministic solution, `NO FAILURE PATH` for non-objective narrative/relationship choices, manual Chapter/Phase browsing, `SYNC TO GAME`, and a minimized guide.

It must never:

- write Save
- mutate checkpoint/progress/evidence/choices
- mutate Hidden Case
- auto-complete gameplay
- inject synthetic gameplay clicks
- control game audio
- leak to North QA

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

## Locked false-principal dark truths / late contradictions

These details remain canon and guide Chapters V–VII writing.

### Kittisak

**Real dark truth:** off-book continuity/containment operation, emergency authority beyond normal oversight, protected sources/assets, compartmentalized records and Somchai sealed transfers.

**Why he can look like mastermind:** authority, access, audit restriction, information control, intermediary capacity and plausible institutional motive.

**Late contradiction:** cannot fully explain preselection of both victims/timing across the entire chain.

### Narin

**Real dark truth:** trusted Bangkok deployment, bypassed change control, illicit compensation/protected interest, altered/suppressed deployment records and real fear of disclosure.

**Why he can look like mastermind:** trusted local access, proximity, deployment capability, motive, record manipulation and opportunity.

**Late contradiction:** selection/chronology begins before he could know enough to choose both victims and timing.

### Adrian

**Real dark truth:** lawful architect who concealed undocumented continuity/emergency path plus liability/regulatory/private-contract exposure.

**Why he can look like mastermind:** privileged architecture, hidden failover capability, internally valid record behavior and motive to protect liability.

**Late contradiction:** cannot fully explain physical victim-selection chronology.

### Arman

**Real dark truth:** engineered blind brokerage but retained behavior/payment/urgency/region/return-channel fingerprints and a deeper ledger.

**Why he can look like mastermind:** tool authorship, sophistication, network compartmentalization, identity shielding and obstruction.

**Late contradiction:** technical concealment cannot explain the full physical victim-selection chronology.

### Ika

**Real dark truth:** incomplete licensed history, pre-Aster aliases, unlicensed contracts, travel gaps and concealed violent work.

**Why she can look like mastermind:** proven violence, field capability, surveillance tradecraft, hidden prior work and the North attack.

**Late contradiction:** hidden work overlaps the case but does not complete the murder act.

### Somchai

**Real dark truth:** off-book physical transfers, evidence movement outside normal visibility, protected-source handling and secure routes.

He can plausibly appear as Kittisak's cleaner, physical remover, or independent operator using institutional cover. He remains cleaner/accomplice/conditional support unless a future explicit owner decision promotes him to a standalone false-conviction principal.

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


### Disclosure Matrix exact canonical answers

#### Adrian

- WHAT THEY GAVE: **Lawful continuity architecture**
- WHAT IT PROVED: **base architecture authentic/authorized**
- WHAT IT DID NOT PROVE: **who used continuity outside documented deployment boundary**
- NEXT TARGET: **implementation / wrapper layer**

#### Arman

- WHAT THEY GAVE: **execution package / wrapper cache**
- WHAT IT PROVED: **delivery package authentic**
- WHAT IT DID NOT PROVE: **who sat behind blind broker / deeper ledger**
- NEXT TARGET: **field deployment layer**

#### Ika

- WHAT THEY GAVE: **Aster employment timeline**
- WHAT IT PROVED: **Aster recruited her after the murders**
- WHAT IT DID NOT PROVE: **operational history before Aster**
- NEXT TARGET: **earlier aliases / travel history**

Interaction remains tap-to-place, mobile-first, safe-area aware, with footer/buttons always reachable.

Hidden method choice after Matrix:

- `boundaries`
- `chronology`
- `custody`

Bangkok custody-response choices:

- `written`
- `parallel`
- `log`

No Matrix or follow-up choice directly names the murderer.

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

### RESOLVED DEFECT — SETTINGS / GAME MENU STACKING

Historical owner Android reproduction on 2026-08-17 showed the persistent `#ch4P8RemovalCard` above Game Menu / Settings because the Phase VIII card used a much higher stacking value than the shared menu/modal shell.

Scoped Production repair landed in:

`76bbcceff1ad28eb81b921a5d0053da1283f2a2e` — `Fix CH4P8 removal card stacking`

Repair identity:

- base Runtime remains `0.22.8`
- scoped repair: `0.22.8-z1`
- stylesheet: `css/chapter-04-phase-08-stack-fix.css`
- repair rule: `.ch4-p8-removal-card{z-index:94}`
- shared global `.drawer,.modal` remains `z-index:95`
- bootstrap maintenance generation: `0.22.8-r2`
- bootstrap cache in `index.html`: `0228r2`
- stack-fix CSS cache: `0228z1`

P'Benz physical Android acceptance after the repair: **PASS / RESOLVED**.

Accepted behavior now locked:

- Game Menu / Settings visually covers the personnel card
- personnel card remains pending underneath
- closing Menu / Settings reveals the same pending card
- the card's own `CONTINUE` still advances normally
- opening Menu / Settings does not dismiss the card
- does not auto-advance narrative
- does not mark evidence complete
- does not mutate Hidden Case / Save / checkpoint merely because Settings/Menu was opened
- Matrix Exit remains accepted
- P7/P8 audio lifecycle remains accepted

The pre-fix screenshot in the final handoff package is **historical regression evidence only**. A new room must not interpret it as an open defect.

Do not reopen, redesign or “clean up” this CH4P8 behavior unless P'Benz reports a new reproducible regression.

---

# 19. CHAPTER IV FINAL STATE

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

`CHAPTER IV COMPLETE · OWNER ANDROID ACCEPTED · MAINTENANCE-FROZEN`

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
- use an owner-approved North Expression Sheet if actually available; otherwise use the current canonical Production source portrait plus bundled owner target screenshot as the basis
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

Reference screenshots are bundled with the room-handoff package.

## Current Production portrait source map — verified

Current r10 routes North through the normal portrait registry in `js/engine/01-runtime-data.js`.

Canonical current source assets:

- `North.concerned` → `assets/images/5a51446056fdcb0a.jpg`
- `North.relieved` → `assets/images/9a859e7e805b89ee.jpg`

Current CH5P1 phase rendering uses `originalPortrait(name, emotion)` and normal registry routing for North in:

`js/chapters/chapter-05/01-return-to-bangkok.js` — `0.22.8-c5p1r10`

Rejected r9 custom assets that still exist in the repository but are **not approved repair sources by default**:

- `assets/images/chapter-05/phase-01/north-concerned-full.png`
- `assets/images/chapter-05/phase-01/north-relieved-full.png`

Do not resurrect those files merely because their filenames sound convenient. Diagnose the current canonical source framing and established dialogue-well crop first. The bundled owner screenshots define the visual defect to solve.

If an owner-approved North Expression Sheet is available in the current room, it may be used as an additional visual identity/expression reference. Its absence from this final ZIP is not a reason to stop or ask P'Benz to resend it when current Production sources plus target screenshots are sufficient.

---

# 27. CHAPTER V PHASE II — NAME IN ROOM 1807

This becomes the immediate story-production objective **only after the two open CH5P1 North portrait shots are accepted on Android**.

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

## Resolved regression guard + current open acceptance checks

### CH4P8 personnel card — RESOLVED REGRESSION GUARD

Do not repair this again proactively. During broad release regression only, verify the already accepted behavior:

1. reach Jakarta departure
2. leave `NORTH · REMOVED` card pending
3. open Game Menu / Settings
4. Menu/Settings covers card
5. close Menu/Settings
6. same pending card returns unchanged
7. press its own `CONTINUE`
8. normal departure continues
9. evidence/state does not change merely from opening Settings
10. Matrix Exit and accepted audio lifecycle remain intact

A failure here is a **new regression**, not continuation of an open 2026-08-17 defect.

### CH5P1 North portraits — CURRENT OPEN GATE

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

Latest inspected Production HEAD and latest verified runtime-code baseline at this final handoff:

`7e2e8cd8c79960787cbb812fc4e630537ddd3f4e`

Message:

`Sync Chapter V loader cache key`

Base Runtime:

`0.22.8`

This commit is linkage-only maintenance under Runtime `0.22.8`; it does not constitute a base Runtime bump or gameplay-logic change. It synchronizes the `index.html` Chapter V loader cache URL with loader `0.22.8-c5b7`. P'Benz physically smoke-tested the landed build on Android and reported normal operation.

Current Chapter V Phase I:

`0.22.8-c5p1r10`

Current Chapter V loader:

`0.22.8-c5b7`

Current build snapshot:

- base Runtime: `0.22.8`
- bootstrap maintenance: `0.22.8-r2`
- bootstrap cache: `0228r2`
- CH4P8 stack repair: `0.22.8-z1`
- CH4P8 stack-fix cache: `0228z1`
- Chapter V loader: `0.22.8-c5b7`
- Chapter V loader cache in `index.html`: `0228c5b7`
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

If P'Benz uploads this final documentation afterward, repository HEAD will advance. A docs-only HEAD does not replace `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e` as the runtime-code baseline. New rooms must inspect the newer commit before deciding.

## Owner acceptance snapshot

Accepted / closed:

- Chapters I–IV continuation baseline
- Chapter IV exactly 8 phases
- CH4P8 NORTH REMOVED card stacking: **RESOLVED / OWNER ANDROID PASS**
- P8 Matrix Close / Resume
- P7/P8 background audio lifecycle
- corrected Chapter V opening clip
- Chapter V loader cache linkage `0.22.8-c5b7` ↔ `0228c5b7`: **OWNER ANDROID SMOKE PASS**
- CH5P1 current flow except two North portrait shots
- Somchai brightness `.88`
- rejected r9 North custom portrait experiment rolled back

Currently open, exactly two items:

1. **CH5P1 North `concerned` portrait at `How bad was he?`**
2. **CH5P1 North `relieved` portrait at `Good. Then we keep it that way.`**

No other Chapter IV or CH5P1 component is open merely because these portraits remain.

---

# 36A. MAINTENANCE EXECUTION MATRIX — EXACT CURRENT WORK

## FAMILY A — CHAPTER IV PHASE VIII STACKING — CLOSED

Status:

`RESOLVED · OWNER PHYSICAL ANDROID PASS`

Historical symptom, repair implementation and regression criteria are preserved in Section 18 and the bundled pre-fix screenshot. This family is **not actionable** unless a new regression is reported.

Do not spend a new-room turn “repairing” or redesigning it again.

## FAMILY B — CHAPTER V PHASE I NORTH PORTRAITS — OPEN

### Scope
Exactly two lower dialogue-panel portraits.

#### Shot 1
- Speaker: `NORTH`
- Emotion: `concerned`
- Line: `How bad was he?`
- Canonical current registry source: `assets/images/5a51446056fdcb0a.jpg`
- Owner target screenshot: `REFERENCE_CH5P1_NORTH_HOW_BAD_WAS_HE.jpg`

#### Shot 2
- Speaker: `NORTH`
- Emotion: `relieved`
- Line: `Good. Then we keep it that way.`
- Canonical current registry source: `assets/images/9a859e7e805b89ee.jpg`
- Owner target screenshot: `REFERENCE_CH5P1_NORTH_GOOD_KEEP_IT_THAT_WAY.jpg`

### Required visual result

For both shots:

- complete head visible
- no left clipping
- no top clipping
- tasteful shoulders / upper torso visible
- attractive fill in established portrait well
- North identity preserved
- correct emotion preserved
- no stretching
- no source/white edge
- no face-only zoom
- no excessive empty space

### Current source routing

CH5P1 r10 uses normal portrait-registry routing. Rejected r9 custom `north-*-full.png` files are not approved defaults.

Before editing:

1. inspect current Production HEAD
2. inspect `js/engine/01-runtime-data.js` North `concerned`/`relieved` registry entries
3. inspect `js/chapters/chapter-05/01-return-to-bangkok.js` r10 render routing
4. inspect the two bundled owner screenshots
5. inspect current CH5P1 CSS portrait fitting
6. determine whether source framing, crop/fitting or both cause the issue
7. choose the smallest repair that affects exactly these two expression routes/assets

### Absolute frozen-area firewall

Do not alter:

- Somchai
- Benedict portrait framing
- any other North emotion
- dialogue shell/geometry
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
- Developer tools
- North QA
- walkthrough behavior
- dialogue/story text

If an extra dependency truly must change, identify that dependency explicitly before changing it and keep it minimal. Convenience is not a dependency.

### Pass gate

Local/static/browser as available:

- verify both target portraits at Production mobile geometry
- full head + upper torso visible
- no target-specific selector leaks to other North emotions
- exact changed-file allowlist
- syntax check where applicable
- source/version/cache/loader linkage correct for every changed shipped file
- base Runtime remains unchanged unless the repair genuinely requires a base release and the full atomic Runtime matrix is completed

Owner Android:

- P'Benz visually accepts both shots
- adjacent CH5P1 dialogue shows no collateral regression

## Queue completion

Do not close CH5P1 from local confidence alone.

Queue closes only after P'Benz physical Android acceptance of both portrait shots.

Then:

`CH5P1 = OWNER-ACCEPTABLE · FREEZE`

Next story work:

`CHAPTER V · PHASE II · NAME IN ROOM 1807`

---

# 37. IMMEDIATE NEXT-ROOM PRIORITY

The new room begins with the two CH5P1 portrait repairs, not Chapter IV and not story expansion.

Order:

1. read this Master Plan and Migration Prompt completely
2. inspect current Production HEAD
3. confirm current runtime-code baseline / newer commit impact
4. inspect canonical North `concerned` source + target screenshot
5. inspect canonical North `relieved` source + target screenshot
6. inspect only the relevant CH5P1 portrait fit/routing
7. repair exactly those two shots
8. do not touch frozen CH5P1 behavior
9. test honestly
10. run the Build-Linkage Gate
11. package exact intended files only
12. provide Commit Name ≤50 characters automatically
13. P'Benz performs physical Android acceptance
14. after both pass, freeze CH5P1
15. begin `CHAPTER V · PHASE II · NAME IN ROOM 1807`

CH4P8 stacking is already resolved and must not be placed back into the open queue unless P'Benz reports a new regression.

Do not start Chapter V Phase II before owner acceptance of the two portraits unless P'Benz explicitly changes priority.

---

# 37A. PROJECT-FILE DELIVERY GATE — MUST PASS BEFORE REPLY

Whenever delivering **any** LAST WITNESS project file/package to P'Benz, verify all applicable items before the final reply.

## Artifact existence / scope

1. file actually exists at the linked path
2. user-visible sandbox download link is present
3. delivered scope matches request exactly
4. no unrelated path entered package
5. changed-file allowlist is explicit or internally verified
6. final archive listing has been re-opened/verified
7. final package bytes are the same bytes that were validated

## Build/linkage

8. current Production baseline was used
9. release classification is explicit: base Runtime / module / scoped maintenance / docs-only
10. changed source version/cache/loader expected linkage is correct
11. every changed cache-addressed shipped file uses a fresh cache identity
12. if base Runtime changed, **every applicable atomic Runtime endpoint in Section 4 is synchronized**
13. Settings / Runtime Label / runtime global / document dataset agree where applicable
14. Owner Developer checked independently
15. North QA checked independently
16. Save-facing build checked where applicable
17. diagnostics / Copy Test Info checked where applicable
18. no stale prior build/cache string remains in affected authoritative files
19. any mismatch = `RELEASE BLOCKER`; fix and repackage before delivery

## QA honesty

20. syntax/static/browser/harness results are labeled exactly as such
21. Android acceptance is never claimed without P'Benz's actual physical-device confirmation
22. Walkthrough pass is never substituted for gameplay pass
23. mocked media is never called physical playback E2E

## Package identity / checksum

24. QA report, release notes, manifest and package identity describe the same release
25. checksum is calculated from final archive bytes after archive is finalized
26. checksum file is checked against the final archive

## Mandatory Commit Name — OWNER NON-NEGOTIABLE

27. a proposed **Commit Name is included automatically every time any project file is delivered**
28. Commit Name is **50 characters or fewer including spaces/punctuation**
29. Commit Name accurately describes the delivered artifact scope
30. Commit Name is in a copyable Markdown code block
31. one atomic package may use one Commit Name
32. independent packages require separate Commit Names
33. do not wait for P'Benz to request the Commit Name
34. a missing or over-length Commit Name is an **incomplete handoff defect** and must be fixed before sending

## GitHub truthfulness

35. never imply a GitHub write occurred unless it actually did
36. GitHub write permission must exist explicitly in the current turn
37. when owner uploads manually, say so accurately
38. after the owner uploads, re-inspect landed Production before calling it canonical

A package containing collateral changes outside owner scope is rejected even if the target defect itself works.

A release with one stale applicable Runtime/build endpoint is rejected even if gameplay appears correct on one screen.

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
- Repository: `grolygori789-crypto/last-witness`.
- Production/default branch: `production-rebuild`.
- Latest inspected runtime-code HEAD at this handoff: `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e` — `Sync Chapter V loader cache key`.
- A later docs-only handoff commit does not automatically replace `7e2e8cd8c79960787cbb812fc4e630537ddd3f4e` as runtime-code baseline.
- Current authoritative base Runtime is `0.22.8`.
- Bootstrap maintenance generation is `0.22.8-r2` / cache `0228r2`.
- CH4P8 scoped stacking maintenance is `0.22.8-z1` / cache `0228z1`.
- Current CH5P1 is `0.22.8-c5p1r10`.
- Current CH5 loader is `0.22.8-c5b7`; `index.html` loader cache key is `0228c5b7` and the landed linkage was owner-smoke-tested on Android.
- Chapter IV has exactly 8 phases. No Phase IX.
- Chapter IV is complete, owner Android accepted and maintenance-frozen unless a new reproducible regression appears.
- CH4P8 `#ch4P8RemovalCard` stacking defect is **RESOLVED / OWNER ANDROID PASS**.
- P8 Matrix Exit remains accepted.
- P7/P8 background audio maintenance remains accepted.
- Chapter V Phase I is preliminarily acceptable except exactly two North portraits.
- Open shot 1: North `concerned` — `How bad was he?`.
- Open shot 2: North `relieved` — `Good. Then we keep it that way.`.
- Canonical current registry sources are `assets/images/5a51446056fdcb0a.jpg` and `assets/images/9a859e7e805b89ee.jpg` respectively.
- Rejected r9 `north-concerned-full.png` / `north-relieved-full.png` must not be resurrected by filename convenience.
- Repair only those two portrait shots; no collateral CH5P1 edits.
- Corrected `bangkok-landing.mp4` is approved and frozen.
- Somchai brightness `.88` is approved and frozen unless owner explicitly changes it.
- After both North portraits pass owner Android, freeze CH5P1 and begin `CHAPTER V · PHASE II · NAME IN ROOM 1807`.
- Interface/UI shells are implementation contracts.
- Dialogue geometry is frozen unless owner explicitly requests change or a reproduced blocker truly requires the smallest necessary change.
- Save/Load and Hidden Case scoring must remain deterministic/idempotent.
- Background/foreground audio lifecycle is zero-tolerance.
- Owner Developer and North QA are separate mandatory endpoints.
- North QA remains blind to Hidden Case/Elena gates/Owner tools/solutions.
- Hidden Case is deterministic, auditable, idempotent and player-invisible.
- Player never chooses the killer from a final list.
- Five false-conviction principals: Kittisak, Narin, Adrian, Arman, Ika.
- Somchai remains strong cleaner/accomplice/conditional support.
- Rin is `R.` / Last Witness and is revealed in Chapter V, not Chapter IV.
- Elena is historical murderer/mastermind in every route.
- Elena remains low-signal through Chapter V and below principal false theories in Chapter VI.
- Elena becomes fully serious only in late Chapter VII cross-class synthesis.
- Alternate endings change what is provable/sustainable, never historical truth.
- Adaptive model: `P8 CALCULATE → Ch V INFLUENCE → Ch VI DIVERGE → Ch VII RESOLVE`.
- No single clue and no single ordinary choice decides the ending.
- Build linkage is atomic. **Any affected mismatch is a RELEASE BLOCKER.**
- A base Runtime change requires complete synchronization across every applicable Runtime-facing endpoint in Section 4 before package/release.
- Independent unchanged modules are not fake-bumped; compatibility/linkage must nevertheless be correct.
- Every changed shipped cache-addressed file receives a fresh cache identity.
- Dev and North linkage are verified separately every affected release.
- Packaged bytes must equal validated source bytes.
- Checksum must be generated from the final package bytes.
- GitHub writes require explicit owner authorization in the current turn.
- Every project file delivery must automatically include a scope-accurate Commit Name ≤50 characters in a copyable code block.
- Missing Commit Name = incomplete handoff.
- New rooms must not ask P'Benz to repeat locked decisions recoverable from this package/current Production.

This is the canonical final zero-question continuation contract as of `2026-08-17 12:57 ICT`.

