# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-08-04 03:06 ICT
>
> **Repository:** `grolygori789-crypto/last-witness`
>
> **Production and Default branch:** `production-rebuild`
>
> **Latest Production HEAD observed:** `794ec30098f2e03704b29aa95343fa954a7ec2dc`
>
> **Latest HEAD message:** `Update Game Master Plan for 0.17.18 baseline`
>
> **Current owner-approved Runtime baseline commit:** `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
>
> **Runtime baseline message:** `Fix Phase IV minigame centering`
>
> **Current Runtime build:** `0.17.18`
>
> **Current playable boundary:** `CHAPTER IV · PHASE IV CURRENT IMPLEMENTATION`
>
> **Next production objective:** `CHAPTER IV · PHASE V · NORTH IS MARKED`
>
> **Phase V asset status:** `VISUAL SOURCE PACKAGE COMPLETE · ESTABLISHING CLIP COMPLETE · MOTION-COMIC SOURCE SET COMPLETE · AUDIO PACKAGE PENDING · RUNTIME NOT YET IMPLEMENTED`
>
> **Document status:** `CURRENT OWNER-APPROVED RUNTIME BASELINE · PHASE V PRODUCTION HANDOFF · ASSET AND MOTION CONTRACT LOCK`
>
> **Replaces latest planning blob:** `9493d9495e39275bb1b979bf7e46cd1e5f36ff1a`
>
> **Also supersedes stale canonical planning blob:** `09cd4628ccb7fbf9eba8095f5c1cb68a8b18e976`

This revision consolidates the latest owner-approved `0.17.18` Runtime baseline with the complete Chapter IV Phase V visual-production handoff agreed on 2026-08-04.

The current repository contains a filename conflict:

- `GAME_MASTER_PLAN.md` is the stale `0.17.7` planning document.
- `GAME_MASTER_PLAN(1).md` is the newer `0.17.18` planning document at blob `9493d9495e39275bb1b979bf7e46cd1e5f36ff1a`.

This replacement file must be uploaded under the exact canonical filename:

`GAME_MASTER_PLAN.md`

After that upload, future assistants must treat this exact filename as authoritative. `GAME_MASTER_PLAN(1).md` must not be treated as a competing source of truth.

This is a documentation-only revision. It does not claim that Phase V code, Save/Load, audio, portrait extraction, cinematic effects or assembled Runtime behavior have been implemented or tested.

---

# 0. EXECUTIVE ZERO-EXPLANATION HANDOFF

## Project identity

- Game: **LAST WITNESS**
- Studio: **BENEDICT INTERACTIVE**
- Platform: mobile-first browser game
- Primary owner test platform: Android Chrome
- Orientation: portrait 9:16
- Genre: Narrative Detective Adventure / Interactive Crime Investigation
- Art direction: neo-noir graphic novel, cel-shaded, heavy ink, angular shadows, cinematic crime-adventure, readable on mobile
- Visual comparison target: the established graphic-novel language associated with *The Wolf Among Us*, without copying protected characters, layouts or exact artwork
- Repository: `grolygori789-crypto/last-witness`
- Branch: `production-rebuild`

## Current owner-approved Runtime baseline

- Runtime commit: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- Runtime build: `0.17.18`
- Current implemented endpoint: Chapter IV Phase IV
- Latest Production HEAD: `794ec30098f2e03704b29aa95343fa954a7ec2dc`
- Latest HEAD is documentation-only and does not replace the Runtime baseline
- Chapters I–III remain frozen
- Chapter IV Phase I–IV form the current owner-approved no-regression baseline
- Completed scope is maintenance-locked
- Current normal production task is Chapter IV Phase V

## Phase V production status

The owner has completed acquisition and approval of the necessary Phase V visual source package.

Current status:

- required Phase V character visual references are present
- required expression sheets are present
- required outdoor undercover character images are present
- required group image is present
- required five location backgrounds are present
- North-alone key CG is present
- Ika visual identity is approved
- Aruna establishing clip is complete
- all source images required for the second 10-second cinematic are complete
- portrait extraction and transparent-PNG preparation remain implementation work
- cinematic still-image effects and final clip assembly remain implementation/post-production work
- external audio acquisition is the only missing asset category
- Phase V Runtime code is not implemented
- Phase V Save/Load, Developer entry, evidence, Journal unlock and audio lifecycle are not yet tested

Allowed status language:

`PHASE V VISUAL SOURCE PACKAGE COMPLETE`

Do not call Phase V implemented, playable, owner-tested or complete until the assembled Runtime has passed the required tests.

## Exact next task

1. Preserve the `0.17.18` Runtime.
2. Carry the approved Phase V visual files into the new working room/package.
3. Acquire or select the Phase V audio package.
4. Lock exact attack choreography and evidence sequence.
5. Design Phase V State, Save/Load, Developer jump and Ika Journal threshold.
6. Prepare portraits from approved sheets.
7. Build the two cinematic files under the motion contract below.
8. Implement Phase V as the smallest isolated future module.
9. Run full no-regression testing from Title through Phase V.

---

# 1. SOURCE OF TRUTH AND WORKFLOW

## Source hierarchy

1. Owner’s latest real-device result
2. Current Production Runtime on `production-rebuild`
3. This exact `GAME_MASTER_PLAN.md`
4. Owner-approved binary visual and audio assets supplied with the implementation package
5. Previous planning files and old handoffs
6. Assistant memory

When sources conflict:

- owner-tested behavior wins over stale documentation
- current Runtime wins over old implementation notes
- locked Canon wins over a Runtime defect
- approved final visual references win over earlier generated drafts
- this plan’s Phase V production contract wins over speculative prior suggestions
- do not invent missing binary assets from filenames alone
- do not claim a file is available unless it is actually attached, mounted or present in the working package

## Mandatory new-room opening audit

Before any Phase V implementation:

1. fetch the latest `production-rebuild` HEAD
2. verify Runtime baseline history and compare against `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
3. fetch and read this file completely
4. inspect `index.html`
5. inspect static and dynamic load order
6. inspect the current Chapter IV bootstrap
7. inspect Phase IV completion and Phase V lead
8. inspect State initialization and migration
9. inspect Auto Save, named saves, restore and completed-state bridge
10. inspect Character Journal discovery, unread and Developer behavior
11. inspect Case File ownership
12. inspect audio owners and exit cleanup
13. inspect Developer Mode phase navigation
14. inventory the actual supplied Phase V asset files
15. verify image dimensions, alpha, crop and mobile readability
16. design the smallest true Phase V module owners
17. avoid global wrappers, polling or document-wide observers
18. test from Title and Chapter I, not only from an isolated Phase V harness
19. report untested limits honestly
20. deliver locally unless the owner explicitly authorizes a GitHub write in the current turn

## GitHub write rule

Do not write to GitHub without exact current-turn authorization.

Normal delivery remains local. The owner uploads Production files personally.

## Completed-scope maintenance gate

Do not reopen accepted Chapters or shared systems for optional polish, cleanup, refactoring or redesign.

A completed area may be modified only for:

1. a reproducible bug
2. blocked Phase V integration
3. State or Save corruption
4. evidence or Character discovery failure
5. material audio lifecycle failure
6. critical device compatibility or accessibility failure
7. another essential owner-approved reason

Every repair must identify:

- exact reproduction
- smallest proven owner
- smallest file scope
- regression boundary
- tests actually performed
- owner-device result

---

# 2. CURRENT VERIFIED PRODUCTION SNAPSHOT

## Repository state

- Repository: `grolygori789-crypto/last-witness`
- Production branch: `production-rebuild`
- Default branch: `production-rebuild`
- Latest observed HEAD: `794ec30098f2e03704b29aa95343fa954a7ec2dc`
- Latest HEAD message: `Update Game Master Plan for 0.17.18 baseline`
- Current owner-approved Runtime baseline: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- Runtime message: `Fix Phase IV minigame centering`
- Current Runtime build: `0.17.18`
- Historical Arman Journal baseline: `8a70778dffbdea65c7ba37954673be11b547f3b2`
- Historical frozen Phase III baseline: `61dfaec35cb8990ac9ea3fafa28d39bee8e4698f`
- Historical Phase II baseline: `ffdc94777c5fbaefdc281f1148b59aff3adf8abe`

## Current build chain

- Chapter IV Phase I: `0.13.2`
- Chapter IV Phase II: `0.14.9`
- Phase II portrait guard: `0.15.0`
- Thai localization: `0.15.2`
- targeted QC: `0.15.3`
- police portrait alignment: `0.15.4`
- Chapter IV Phase III: `0.16.3`
- base Phase IV story: `0.17.0`
- Phase III direct handoff: `0.17.0-d2`
- Developer Phase Navigation: `0.17.0-d2`
- full-game Runtime recovery: `0.17.6`
- Arman Journal contract: `0.17.7`
- scoped Character notification contract: `0.17.14`
- Dialogue History and Case File scroll UX: `0.17.15`
- phase-action and Forensic geometry: `0.17.16`
- Chapter III Phase VIII modal containment: `0.17.17`
- Chapter IV Phase IV minigame containment: `0.17.18`
- compatibility/bootstrap build: `0.17.18`

## Owner-approved current contracts

Preserve:

- Chapter I Character Journal hidden
- Chapter II Journal first appears after North’s initial office conversation
- one-time Character Added notification behavior
- unread red-dot timing and read clearing
- silent Developer unlock behavior
- Adrian Hawker pre-verification gate
- Arman card, unread state and Save/Load persistence
- Maya profile switching
- Character Detail DOM contract
- Dialogue History opens at latest and retains `Latest` navigation
- Case File accepted scrolling
- centered free-standing phase actions
- Chapter II Forensic bottom stack
- Chapter III Phase VIII Secure Mirror containment
- Chapter IV Phase IV minigame centering and complete cache-header controls
- Phase III direct handoff
- Phase IV HUD and gold progress
- Phase IV title/location sequence
- Phase IV accepted portraits and scenes
- Phase IV audio exit cleanup

No active Runtime blocker was recorded in the latest approved `0.17.18` scope.

---

# 3. CORE INVESTIGATIVE AND ENDING PRINCIPLES

## Investigative principle

> **A valid credential proves access, not identity.**

Always separate:

1. physical event
2. record claim
3. credential, role or permission
4. device or timestamp claim
5. network route
6. physical operator
7. tool author
8. broker or adapter
9. deployer
10. person who selected victim, room and timing
11. Decision Owner

No single layer may collapse into another without corroboration.

## Ending principle

> **Historical truth is fixed. Legal truth, public truth and institutional truth depend on what survives and what can be proved.**

Historical truth:

- Elena is mastermind
- Elena killed Kawin
- Elena killed Daniel

Variable outcomes depend on:

- evidence survival
- custody
- attribution
- role separation
- witness survival
- North’s survival and agency
- admissibility
- final accusation
- institutional acceptance
- public-record control

Four major endings remain:

1. TRUE CONVICTION
2. RIGHT NAME, NO CASE
3. FALSE CONVICTION
4. THE PERFECT RECORD

No single dialogue choice directly sets an ending.

---

# 4. CHAPTER AND PHASE STRUCTURE

## Season 1

1. Chapter I · `ROOM 1807`
2. Chapter II · `THE PERFECT STRANGER`
3. Chapter III · `THE BORROWED MINUTES`

Season 1 is complete and frozen.

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

## Current status

- Phase I complete and frozen
- Phase II complete and frozen
- Phase III complete and frozen
- Phase IV implemented and owner-approved as no-regression baseline
- Phase V visual-production package prepared
- Phase V Runtime not implemented
- Phase VI–VIII planned

---

# 5. PHASE IV TO PHASE V HANDOFF

## Phase IV closing proof

Locked threat beat:

```text
SUBJECT: N-32
CAPABILITY: ATTRIBUTION
STATUS: ESCALATED
```

Decision Owner remains unresolved.

Elena’s identity remains hidden.

## Exact operational lead

Phase IV ends with an Aster Recovery lead tied to the Aruna coastal setting.

Locked handoff details:

- Aster Recovery reserved **three rooms**
- Aster Recovery reserved a **poolside cabana**
- destination: **Aruna Coastal Hotel**
- country: **Indonesia**
- operational time reference: **10:30 local**
- Maya’s movement direction: move after sunrise
- no uniforms
- no live credential

Phase V must use this lead. Do not invent an unrelated destination.

---

# 6. PHASE V · NORTH IS MARKED

## Production status

`VISUAL SOURCE PACKAGE COMPLETE · AUDIO PACKAGE PENDING · RUNTIME NOT IMPLEMENTED`

This status means:

- visual acquisition is complete
- approved source imagery exists
- required backgrounds exist
- character references exist
- expression sheets exist
- key CG exists
- cinematic source frames exist
- intro clip exists
- audio still needs acquisition or final selection
- portrait extraction still needs implementation
- effect-driven motion assembly still needs implementation
- code, evidence, Save/Load and testing remain future work

## Locked function

- Indonesian coastal hotel/resort setting
- Aruna Coastal Hotel is the exact location
- public leisure cover with operational tension
- team appears to be on holiday while controlling the area
- adversary attempts deniable removal
- North remains active
- North is never a passive victim
- attack creates evidence
- Ika becomes visible or lawfully identifiable
- player separates violence from Decision Ownership
- Phase ends by creating the basis for THE FALSE SUCCESS

## Threat rhythm

1. arrival under cover
2. false calm
3. anomaly
4. North singled out
5. deniable attempt
6. proof the attacker needs a record of removal
7. transition to false success

## Physical team

- Benedict
- North
- Cheryl
- Maya

Farid remains remote in Singapore.

Maya owns Indonesian authority.

Cheryl protects cross-border admissibility.

## Only new named Phase V character

**Ika Prameswari** is the only new named story character planned for Phase V.

Hotel staff, guests, security and service personnel may appear as unnamed extras. Do not create additional named characters without an explicit story need and owner approval.

## Phase V proof boundary

Phase V may support or prove:

- North was intentionally selected
- a field operator was physically present
- the removal attempt was planned
- the attacker needed a credible official or public record of removal
- Ika performed surveillance or recovery work
- Ika committed real violence and obstruction
- operational evidence can identify Aster Recovery involvement
- later violence and earlier murders belong to different time windows

Phase V does not prove by itself:

- Ika killed Kawin
- Ika killed Daniel
- Ika selected the earlier victims
- Ika is Decision Owner
- Elena personally contacted Ika
- a valid credential identifies the physical attacker
- violence identifies the mastermind

Mandatory interpretation:

> **The person who acts against North may be guilty of real violence without owning the earlier murders or the final decision.**

---

# 7. PHASE V CHARACTER WRITING AND TONE

## Benedict

- age 42
- independent detective and external consultant
- no police authority in Indonesia
- works through Maya
- dry humour
- psychologically sharp
- remains operationally competent
- may briefly lose composure on seeing the undercover looks
- reaction must be subtle, brief and charming
- never creepy
- never turns the operation into a swimsuit joke
- still reads intent and movement

## North

- age 32
- Singaporean
- technical investigator
- Benedict’s trusted long-term partner
- active target
- recognizes surveillance patterns
- remains capable and consenting
- no romance with Benedict
- no romance with Farid
- must have agency in the counteroperation

## Cheryl

- age 40
- Singaporean Chinese
- Inspector and cross-border liaison
- controlled, authoritative and legally strict
- may tease Benedict with restrained amusement
- romance never overtakes the case
- does not command Maya in Indonesia

## Maya

- age 37
- Indonesian
- Inspector and Indonesian operational authority
- direct, confident and practical
- may tease Benedict naturally
- no romance with Benedict
- no love triangle
- no harem structure

## Ika

- age 34
- Indonesian
- private security and recovery specialist
- Field Watcher / Recovery Operator
- receives compartmentalized work through Aster Recovery Solutions
- initially told North possesses stolen evidence
- objective escalates to disappearance or credible accident
- guilty of surveillance, attempted abduction or murder, evidence destruction and obstruction
- recruited after Daniel’s murder
- cannot be Kawin or Daniel’s killer
- does not receive Elena’s identity directly
- must feel controlled, professional and dangerous rather than theatrically evil

## Teasing rhythm

Undercover glamour may create two or three short teasing beats maximum.

Target tonal examples, not mandatory final dialogue:

- Maya may observe that Benedict’s coat had been withholding evidence.
- North may dryly note that the coat was not doing all the work.
- Cheryl may call the disguise more convincing than expected.

The scene must return immediately to operational focus.

---

# 8. OWNER-APPROVED PHASE V VISUAL CANON

## Universal rule

Only the latest owner-approved versions listed here may be used as identity references.

Do not use earlier drafts.

Preserve:

- exact face
- facial structure
- age impression
- skin tone
- hairstyle
- body proportions
- costume
- costume color
- accessories
- expression identity
- approved light grade

No generative transition may reinterpret these attributes.

## Benedict resort lock

- shirtless
- black sunglasses
- black swim shorts
- athletic muscular build
- strong but natural proportions
- short black hair
- mature, composed face
- not an exaggerated bodybuilder
- expression range supplied in the approved resort expression sheet

## North resort lock

- Indian appearance
- warm medium-brown skin
- short wavy dark hair
- slim athletic body
- black bikini with subtle leaf pattern
- small necklace
- confident, analytical and naturally sexy
- expression sheet is the approved identity source
- no passive pin-up behavior in narrative scenes

## Cheryl resort lock

- Singaporean Chinese
- short pixie hair
- burgundy/wine bikini
- sunglasses as shown in the approved references
- athletic-curvy body
- poised, controlled, authoritative
- use the owner-adjusted brighter version as the expression reference

## Maya resort lock

- Indonesian
- warm tan skin
- dark bob haircut
- bright red/orange bikini
- sunglasses resting on top of head
- fullest/curviest silhouette among North, Cheryl and Maya
- direct, confident and visually bold
- no identity drift toward Ika

## Ika final resort lock

The owner-adjusted-light expression sheet dated 2026-08-04 is the primary Ika reference.

Ika must remain visually distinct from Maya, North and Cheryl.

Locked traits:

- Indonesian
- warm medium-tan/brown skin
- sharper cheekbones
- firmer jawline
- straighter brows
- narrower eyes
- thinner lips than Maya
- mature, predatory and controlled face
- long dark hair
- sharp side part
- hair tied in a low ponytail
- a few controlled loose strands
- no bob
- no pixie
- no short wavy hairstyle
- dark olive halter bikini
- gold ring hardware
- sheer olive resort cover-up
- matching wrap/sarong detail
- small gold hoop earrings
- side/hip tattoo visible in the approved sheet
- elegant, capable and dangerous
- not a heroine-squad costume
- not a recolored Maya

## Group-image lock

The approved team group image contains:

- North in black at frame left
- Benedict near center-left
- Cheryl in burgundy behind/right
- Maya in red/orange seated foreground/right
- same Aruna cabana/pool environment
- Benedict subtly looking toward the women
- North noticing the reaction
- Cheryl composed
- Maya knowingly confident

This is the approved payoff composition for the undercover team reveal.

## North-alone key CG lock

Approved composition:

- North dominates the foreground
- afternoon light
- Aruna pool/cabana environment
- North slightly frowns
- brows knit
- lips pressed lightly
- side glance indicates instinctive awareness
- distant watcher appears only as a shadowy slender female silhouette
- watcher partly hidden by architecture and plants
- watcher has an indistinct head covering or draped cloth
- watcher remains eerie and ambiguous
- watcher is not supernatural
- image signals surveillance without proving identity

Evidence lock:

The distant silhouette is an anomaly and threat clue. It is not lawful identity proof for Ika.

---

# 9. PHASE V BACKGROUND PACKAGE

All five required primary backgrounds are present.

## Background 01 · Main Pool and Cabana Wide

Function:

- establishing playable space
- arrival under cover
- false calm
- team positioning
- broad location continuity

Visual features:

- large pool
- central cabana
- hotel architecture
- lounge furniture
- tropical plants
- ocean
- strong afternoon light

Canonical target path:

`assets/images/chapter-04/phase-05/bg-aruna-main-pool.png`

## Background 02 · Cabana Interior and Lounge

Function:

- private team conversation
- briefing
- Benedict/North analysis
- controlled dialogue before or after anomaly

Visual features:

- shaded wooden cabana
- white curtains
- low table
- cushioned seating
- pool and ocean visible beyond
- strong light/shadow separation

Canonical target path:

`assets/images/chapter-04/phase-05/bg-aruna-cabana-interior.png`

## Background 03 · Poolside Deck and Sunbed Zone

Function:

- casual public cover
- team spread
- surveillance scan
- false-calm dialogue
- guest-facing environment

Visual features:

- sunbeds
- umbrellas
- open deck
- pool edge
- cabana and ocean
- bright afternoon readability

Canonical target path:

`assets/images/chapter-04/phase-05/bg-aruna-pool-deck.png`

## Background 04 · Side Access and Service Path

Function:

- anomaly
- suspicious movement
- following a route
- CCTV logic
- operational transition
- possible evidence path

Visual features:

- narrow shaded passage
- timber slats
- stone walls
- tropical plants
- visible CCTV camera
- cabana/pool opening in distance

Canonical target path:

`assets/images/chapter-04/phase-05/bg-aruna-service-path.png`

## Background 05 · Blind Corner / Concealed Approach

Function:

- North singled out
- watcher concealment
- approach toward the pool
- attempted isolation
- stalking/interception beat

Visual features:

- darker foreground
- pool and cabana visible beyond
- plants create visual concealment
- CCTV camera
- strong shadow-to-light route

Canonical target path:

`assets/images/chapter-04/phase-05/bg-aruna-blind-corner.png`

## Background continuity rule

These five images represent one resort and one continuous time window.

Implementation must preserve:

- Aruna architecture
- warm stone
- dark timber
- white curtains
- turquoise pool
- tropical greenery
- ocean proximity
- afternoon light direction
- mobile-readable luminance

Do not color-grade one image into a different time of day without narrative reason.

---

# 10. CHARACTER SOURCE-ASSET MANIFEST

The current chat contained the following approved source images. Filenames may be changed during packaging, but identity mapping must be preserved.

## Expression sheets

Recommended canonical destinations:

- Benedict expression sheet  
  `assets/source/ch04-p05/benedict-resort-expression-sheet.png`

- North expression sheet  
  `assets/source/ch04-p05/north-resort-expression-sheet.png`

- Cheryl expression sheet  
  `assets/source/ch04-p05/cheryl-resort-expression-sheet.png`

- Maya expression sheet  
  `assets/source/ch04-p05/maya-resort-expression-sheet.png`

- Ika owner-adjusted expression sheet  
  `assets/source/ch04-p05/ika-resort-expression-sheet-final.png`

## Full resort references

- Benedict full resort reference  
  `assets/source/ch04-p05/benedict-resort-full.png`

- North full resort reference  
  `assets/source/ch04-p05/north-resort-full.png`

- Cheryl full resort reference  
  `assets/source/ch04-p05/cheryl-resort-full.png`

- Maya full resort reference  
  `assets/source/ch04-p05/maya-resort-full.png`

## Group and key CG

- Undercover team group image  
  `assets/images/chapter-04/phase-05/cg-undercover-team.png`

- North marked key CG  
  `assets/images/chapter-04/phase-05/cg-north-marked.png`

## Binary handoff warning

This Master Plan does not embed image or video bytes.

A new room cannot reconstruct the approved assets from these filenames alone.

Before implementation, the owner must provide:

- the actual approved image files
- the completed establishing clip
- any finished motion-comic export
- selected audio files
- final file naming or permission to rename during packaging

Do not substitute newly generated images for missing approved assets without owner approval.

---

# 11. PORTRAIT EXTRACTION AND PNG CONTRACT

The expression sheets are approved source material, not final Runtime portraits.

Portrait preparation is a normal implementation task and is not a missing visual-source task.

## Required preparation

For each character:

1. crop individual expression cells
2. preserve identical cell geometry
3. remove sheet borders
4. remove background cleanly
5. export transparent PNG
6. preserve face and upper torso
7. maintain stable head scale
8. maintain stable top anchor
9. prevent white fringe
10. test against black, game navy, mid-grey, white and checkerboard
11. keep mobile-readable face size
12. avoid floating torso
13. avoid damaged hair or shoulder edges
14. avoid whole-sheet usage in dialogue UI

## Approved expression needs

### Benedict

- neutral
- dry smile
- serious
- thinking
- suspicious side glance
- briefly caught off guard
- alert
- determined

### North

- neutral
- analytical
- skeptical
- restrained smile
- alert
- suspicious
- surprised but controlled
- determined

### Cheryl

- composed
- sunglasses
- side glance
- skeptical
- mildly amused
- authoritative
- surprised
- alert

### Maya

- neutral
- direct
- thinking
- smirk
- confident
- surprised
- irritated
- determined

### Ika

- unreadable
- watching
- calm warning
- cold smirk
- assessing
- surprised but controlled
- hostile
- ready to move

## Runtime portrait rule

Do not perform generative face repair during extraction.

If an approved sheet cell has a technical defect, report it and seek the smallest owner-approved fix.

---

# 12. CINEMATIC LIMIT AND CLIP CONTRACT

Phase V has exactly **two** cinematic clips.

No third Benedict-only clip.

## Clip 01 · Aruna Coastal Hotel Establishing

- duration target: 10 seconds
- status: owner reports complete
- function: establish Aruna Coastal Hotel
- followed by Phase and Location card
- visual tone: premium neo-noir resort, not travel advertisement
- no text baked into the video unless owner-approved
- Runtime must support natural end and Skip
- Skip and natural end must enter the same State
- audio lifecycle must be controlled by the Phase V module

Recommended canonical path:

`assets/video/ch04-p05-aruna-establishing.mp4`

## Clip 02 · Undercover Team Reveal

- duration target: 10 seconds
- source image package: complete
- final production method: cinematic motion comic / living illustration
- all five approved stills are used
- final export counts as one video
- no generative multi-image interpolation
- no Flow-generated face morphing
- no additional Benedict-only video

Recommended canonical path:

`assets/video/ch04-p05-undercover-team-reveal.mp4`

## Clip 02 timing

- `0.0–1.8 sec` Benedict
- `1.8–3.6 sec` North
- `3.6–5.4 sec` Cheryl
- `5.4–7.2 sec` Maya
- `7.2–10.0 sec` approved group image

The final group frame receives the longest hold.

## Clip 02 performance intention

### Benedict shot

- quiet surveillance posture
- subtle push-in
- physique visible naturally
- calm and capable
- no broad grin
- no exaggerated reaction

### North shot

- cool, analytical and confident
- slight controlled reframing
- no pose morph
- pool reflections may move around her

### Cheryl shot

- poised and authoritative
- restrained emphasis on sunglasses
- no hand regeneration
- no body animation

### Maya shot

- confident and socially fluid
- strong visual presence
- no new shoulder or face movement generated

### Group shot

- Benedict subtly notices the women
- North catches the reaction
- Cheryl remains composed
- Maya appears knowingly amused
- operational tension remains active
- final frame leads directly into dialogue

---

# 13. MOTION-COMIC / LIVING-ILLUSTRATION CONTRACT

## Reason for this method

Multi-image generative video testing changed:

- faces
- body shapes
- proportions
- clothing
- character identity
- group continuity

That method is rejected for Phase V character cinematics.

## Source-of-truth rule

Every approved still image is immutable identity source.

The production process may move:

- camera framing
- environment layers
- light
- shadow
- focus
- grain
- water reflections

It may not regenerate:

- face
- eyes
- mouth
- hair design
- body anatomy
- bikini shape
- costume details
- hands
- pose
- identity

## Permitted effects

- restrained slow push-in
- restrained pan
- subtle crop drift
- safe 2.5D parallax
- pool-water reflection overlay
- moving palm shadow
- gentle cabana-curtain shadow
- subtle light sweep
- controlled focus shift
- shallow depth blur
- restrained heat haze
- fine film grain
- very light vignette when it does not change approved luminance
- hard cut
- crossfade of approximately 2–3 frames maximum

## Prohibited effects

- face animation
- lip movement
- eye regeneration
- body warping
- limb movement
- pose interpolation
- walking generated from a still
- large head turn
- clothing morph
- camera orbit
- fake 3D rotation
- exaggerated zoom
- whip pan
- nightclub transition
- sexualized body scan
- particle clutter
- heavy blur
- full-screen darkening
- style transfer
- repainting approved skin tones

## Outdoor-investigation portrait rule

Approved images of the team operating outside the normal office/investigation room will receive effect-driven treatment where a premium cinematic beat is needed.

The assistant is expected to:

- crop and prepare portraits
- build parallax layers when safe
- animate environment and camera, not anatomy
- preserve exact approved identity
- export one final clip or motion insert
- test mobile readability
- preserve dialogue and HUD transitions

This task is implementation/post-production, not new image generation.

---

# 14. PHASE V AUDIO PACKAGE · ONLY MISSING ASSET CATEGORY

## Status

`PENDING ACQUISITION / FINAL SELECTION`

The visual package is complete. Audio is the remaining external asset category.

## Required ambience palette

- gentle sea breeze
- distant ocean surf
- soft pool-water movement
- faint palm-leaf rustle
- light cabana-curtain movement
- restrained hotel activity
- distant guests kept soft and sparse
- subtle service-area room tone
- controlled tension layer where needed

## Required SFX candidates

- soft UI press
- evidence cue
- anomaly cue
- distant footstep
- fabric movement
- glass or table contact if scripted
- service door or latch if scripted
- phone vibration or device alert if scripted
- brief impact or struggle sound only after choreography is locked
- CCTV/electronic cue only when evidence supports it

## Music policy

- owner may source and add music separately
- motion-comic master may remain silent or ambience-only until final score is selected
- no vacation montage music
- no comedy sting
- no sexualized audio coding
- no villain sting for Ika merely because she appears
- no villain music for Elena
- dialogue remains dominant
- music must duck under dialogue and evidence overlays
- phase audio must stop on Return to Title and phase exit

## Audio ownership

Preserve existing owners:

- `02-audio-save.js`
- `11-production-stabilization.js`
- scene-local modules
- lifecycle guard

Do not create another global audio manager.

---

# 15. IKA INTRODUCTION AND CHARACTER JOURNAL CONTRACT

## Story introduction

Ika may initially appear as:

- distant watcher
- ambiguous guest
- service-route presence
- partial silhouette
- operational anomaly

These appearances do not automatically identify her.

## Identity threshold

Ika may be added to Character Journal only after:

1. physical identity or lawful operational identification is achieved
2. her role reaches the required verification threshold
3. the first meaningful introduction dialogue or equivalent verified encounter completes
4. the game can distinguish Ika from an unnamed silhouette or alias

## Journal behavior

When threshold is met:

- add one Ika card
- show one Character Added notification
- show one unread red dot
- opening Journal clears only Ika unread state
- closing/reopening preserves card
- Save/Load preserves unread or read state
- repeated encounter does not notify again
- Developer Unlock is silent
- no Ika leak into Chapter I
- no duplicate costume card
- no watcher-silhouette card

## No-entry entities

No Character Journal card for:

- unnamed watcher silhouette
- Aster Recovery as a person
- hotel extra
- service staff extra
- PALIMPSEST
- 18-07
- Hood Feed
- Analyst of Record
- Continuity Protocol

---

# 16. PHASE V ATTACK AND EVIDENCE DESIGN BOUNDARY

## Unresolved item

Exact attack choreography is not yet locked.

Do not generate evidence assets or write final code until the attack method is approved.

## Attack requirements

The attempt must:

- remain deniable at first glance
- fit a public luxury resort
- exploit movement, access or environment rather than cartoon force
- single out North
- allow North to act
- allow team response
- create evidence
- support later false-success strategy
- avoid proving Decision Owner directly
- preserve Maya’s legal authority
- preserve Cheryl’s admissibility role

## Evidence requirements

Each evidence item must state:

- Observation
- What it supports
- What it does not prove

Likely evidence categories, subject to choreography approval:

- reservation or cabana record
- access card or service credential
- CCTV still
- service route map
- dropped device or earpiece
- burner phone
- locker token
- Aster Recovery marker
- attempted removal record
- device instruction or compartmentalized objective
- evidence that the attacker needs a credible record of North’s removal

## Evidence caution

Do not create all speculative evidence assets in advance.

Only generate or build an evidence insert after its narrative function, lawful custodian and proof limit are locked.

---

# 17. PHASE V STATE AND SAVE BLUEPRINT

Phase V must own isolated state under a dedicated namespace such as:

`state.chapter4.phase5`

Exact field names require implementation audit, but the phase must cover:

- started
- establishingComplete
- phaseCardSeen
- locationCardSeen
- undercoverRevealComplete
- teamBriefingComplete
- falseCalmComplete
- anomalyDetected
- northMarkedCGSeen
- watcherObserved
- watcherIdentityStatus
- northIsolated
- attemptStarted
- attemptOutcome
- evidenceCollected
- evidenceViewed
- ikaIdentityVerified
- ikaJournalUnlocked
- ikaJournalUnread
- ikaJournalNotified
- removalRecordProof
- threatReasoningComplete
- choiceOutcomes
- closingDialogueComplete
- complete
- stage

## Restore requirements

Support:

- before establishing clip
- during/after establishing boundary
- before/after Phase card
- before/after team reveal
- during false calm
- after anomaly
- after North key CG
- before attempt
- after attempt
- while evidence modal is active
- before/after Ika identity threshold
- unread Ika state
- read Ika state
- completion state
- Developer jump
- Return to Title
- Thai and English

## Media restore

Natural video end and Skip must set identical State.

A restore must never:

- replay Character Added incorrectly
- duplicate evidence
- reset read state
- expose Ika early
- skip required dialogue
- trap the player in a media overlay
- leave audio running after exit

---

# 18. PHASE V UI AND MOBILE CONTRACT

## Target dimensions

Test where practical:

- 320 CSS px
- 360×800
- 390 CSS px
- 412×915
- 430 CSS px

## Background standard

Target:

`864 × 1536`

The supplied backgrounds are portrait-oriented and must be fitted without destroying the approved composition.

## HUD

Preserve:

- Save
- Menu
- Settings access
- gold progress
- mobile-safe header controls
- current visual language

## Cards and modals

Preserve the `0.17.18` geometry contracts:

- centered content
- complete right edge
- no overflow beyond padded viewport
- readable Thai
- two-line button support
- scrollable long content
- close control reachable
- no forced bottom jump

## Character portrait placement

- face and upper torso prominent
- stable top anchor
- no tiny portrait
- no whole-sheet source image
- no white edge
- no severed hair
- no bottom contamination
- no auto-extraction presented as final without inspection

---

# 19. PHASE V DEVELOPMENT OWNERSHIP

A future Phase V package should prefer isolated files, subject to audit.

Recommended ownership pattern:

- one Phase V story/state module
- one scoped Phase V stylesheet
- one optional portrait/asset registry extension if required
- one scoped Character Journal extension only if authoritative registry cannot be safely extended
- one audio owner inside the Phase V scene module
- one Developer navigation update
- one deterministic bootstrap update

## Safety lock

A future module must be side-effect-free when merely loaded.

Preloading Phase V must not:

- alter current chapter
- change current screen
- unlock Ika
- show notification
- mark unread
- play audio
- overwrite restored State
- expose Phase V evidence
- mutate Phase IV completion
- alter Chapter I Character visibility

Initialization occurs only on:

- true Phase IV to Phase V transition
- valid Phase V restore
- completed-state bridge
- intentional Developer jump

---

# 20. CHARACTER AND AUTHORITY CANON

## Benedict

- civilian independent detective
- no statutory authority abroad
- proposes strategy
- final narrative decision-maker
- does not accuse without evidence
- never uses North as uninformed bait

## North

- Singaporean technical investigator
- authorized-copy analysis only
- no unauthorized live intrusion
- never passive
- must consent to false-success plan

## Cheryl

- Singapore Police liaison
- controls Singapore-side admissibility and transfer
- does not command Maya

## Maya

- Indonesian National Police authority
- owns local surveillance, seizure, warrants and local support
- does not identify a person from route or IP alone

## Farid

- remote in Singapore
- preserves raw mirrors and alternative copies
- does not infer motive from code

## Arman

- wrapper specialist and broker
- culpable
- not mastermind
- not Decision Owner
- no Bangkok victim selection evidence

## Ika

- later field operator
- real violence
- no earlier-murder timeline
- no Decision Ownership proof

## Elena

- owner-secret mastermind and physical killer
- publicly credible forensic ally
- no villain coding
- no impossible knowledge
- no confession replacing proof

---

# 21. CORE CHARACTER JOURNAL LOCK

Existing implemented entries include:

- Benedict
- North
- Elena
- Somchai
- Kittisak
- Ratchata
- Cheryl
- Farid
- Adrian
- Maya
- Arman

Future entries:

- Ika after Phase V identity threshold
- Kawin after Chapter V reconstruction
- Rin after physical introduction and consent
- Narin after identity/role verification

Universal discovery contract:

1. meaningful introduction
2. verification threshold
3. one card
4. one notification
5. one unread dot
6. Journal open clears unread
7. reopen preserves card
8. Save/Load preserves state
9. repeat dialogue does not notify
10. Developer Unlock is silent

---

# 22. CORE STORY CANON

## Daniel

- dead in Chapter II
- never returns alive
- continues only through prepared material

## Room 1807 victim

- not Daniel
- Kawin Nopparat
- identity revealed in Chapter V

## `R.`

- unresolved to player through Chapter IV
- future identity is Rinrada
- Registrar role
- Last Witness
- not Ratchata

## 18-07

- operational profile
- not a person
- proves accepted access
- does not prove physical operator

## Architecture layers

1. Adrian designed lawful architecture.
2. Arman adapted the wrapper.
3. Narin supplied/executed trusted Bangkok deployment.
4. Ika handled later surveillance/recovery.
5. Elena selected victims, room, timing, discovery sequence and cleanup priority.

## North threat

- North understands attribution
- her capability threatens Elena’s protective gap
- Elena chooses neutralization
- attempt remains deniable
- North remains alive and active
- attempt creates evidence
- North later consents to false success

---

# 23. CHAPTER III PROOF BOUNDARY

Proven or supported:

- watcher entered through signed Bangkok forensic package
- package was accepted by Bangkok Evidence Chain
- cleanup used valid synchronization credential
- deployment occurred before team left Bangkok
- adversary anticipated analytical milestone
- Jakarta route and Bangkok deployment are separate
- local deployment path existed

Not proven:

- named knowing police insider
- Kittisak operated credential
- Somchai operated credential
- Elena operated credential
- Ratchata operated credential
- credential owner was physical operator
- deployer selected victims
- deployer was Decision Owner
- whole Bangkok unit was corrupt

Mandatory interpretation:

> **The investigation structure was compromised or used. This does not yet prove a knowing traitor inside the police unit.**

---

# 24. SUSPECT AND FAIRNESS LOCK

Serious final candidates:

1. Elena
2. Adrian
3. Arman
4. Narin

Ika may appear as an operational candidate but has a fatal timeline contradiction for the earlier murders.

## Ika contradiction

- recruitment begins after both earlier murders
- real violence is not earlier murder ownership

## Adrian contradiction

- no proved local victim selection
- no physical murder path

## Arman contradiction

- no proved Bangkok presence
- no victim selection
- no Decision Ownership

## Narin contradiction

- receives priorities rather than originates them
- no proof he selected or killed victims

## Elena proof requirement

Access or presence alone is insufficient.

A valid case requires multiple classes such as:

- Rin corroboration
- Ratchata timeline
- watcher structure
- controlled leak
- deployment separation
- victim relationship
- discovery-timing ownership
- motive
- opportunity
- custody

---

# 25. AUDIO GOVERNANCE

General:

- one UI press, one click
- evidence cue once
- puzzle cue separate
- dialogue dominant
- stop phase audio on exit
- no extra global manager
- no guilt sting merely for identity reveal

Phase V:

- credible public-leisure ambience
- restrained tension
- no vacation montage
- no comedy sting
- no sexualized sound design
- no supernatural watcher sound unless story supports it
- no musical proof of Ika’s identity before evidence

---

# 26. TESTING STANDARD FOR PHASE V DELIVERY

## Static

- JS syntax
- CSS parsing
- HTML validity where practical
- asset paths
- media references
- image dimensions
- alpha
- duplicate IDs
- cache queries
- changed-file scope
- exact build labels

## Natural route

1. Title
2. New Game
3. Chapter I dialogue/buttons
4. Chapter II Journal gate
5. Chapter III route
6. Chapter IV Phase I
7. Phase II
8. Phase III
9. Phase IV
10. natural Phase IV completion
11. Phase V establishing clip
12. Phase card
13. location card
14. undercover reveal
15. playable Phase V
16. anomaly
17. North CG
18. attempt
19. evidence
20. Ika threshold
21. Phase completion
22. Return to Title

## Character route

- no Journal in Chapter I
- North unlock timing
- all existing one-time unlocks
- Maya profile switching
- Arman card/read state
- Ika silhouette does not unlock card
- Ika verified introduction unlocks once
- unread clears correctly
- repeat route does not notify
- Thai and English
- Save/Load

## Developer route

- jump to every implemented Chapter IV phase
- direct Phase V entry
- repeat nonlinear jumps
- silent Character unlock
- no stale audio
- Return to Title
- New Game after Developer state

## Save route

- clean save
- stale save
- Phase IV completed save
- before establishing
- after establishing
- after team reveal
- after anomaly
- after North CG
- before attempt
- after attempt
- before Ika verification
- unread Ika
- read Ika
- completed Phase V

## Media route

- natural end
- Skip
- interrupted visibility
- backgrounding
- reload
- audio ducking
- no duplicate transition
- no black trap
- no stale audio

## Honesty lock

Never claim:

- owner-device testing
- Android pass
- iPhone pass
- live Pages pass
- listening test
- complete browser regression

unless actually performed.

---

# 27. NO-REGRESSION LOCK

A Phase V package must not disturb:

- Chapters I–III
- Chapter IV Phase I–IV
- Character Journal gates
- Character notification timing
- unread dots
- Dialogue History
- Case File
- action-button geometry
- Forensic bottom stack
- Secure Mirror containment
- Phase IV minigame centering
- Developer Mode
- Save schema outside scoped need
- current evidence
- current audio owners
- accepted portraits
- accepted backgrounds
- current phase handoffs
- Thai and English behavior

Do not restore rejected `0.17.5`.

Do not branch from a historical repair build.

Do not remove accepted scoped layers without a tested authoritative replacement.

---

# 28. EXACT NEXT-CHAT OPERATING INSTRUCTION

A new assistant must behave as though the owner has said:

> Continue LAST WITNESS from the current Production branch.
>
> Repository: `grolygori789-crypto/last-witness`.
>
> Branch: `production-rebuild`.
>
> Latest observed HEAD: `794ec30098f2e03704b29aa95343fa954a7ec2dc`.
>
> Current owner-approved Runtime baseline: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`.
>
> Runtime build: `0.17.18`.
>
> Read `GAME_MASTER_PLAN.md` completely before implementation.
>
> Do not use the stale `GAME_MASTER_PLAN(1).md` as a competing source after this canonical file is uploaded.
>
> Chapter I through Chapter IV Phase IV are the no-regression baseline.
>
> The next production target is Chapter IV Phase V, `NORTH IS MARKED`.
>
> Exact location: Aruna Coastal Hotel, Indonesia.
>
> Phase IV lead: Aster Recovery reserved three rooms and a poolside cabana for 10:30 local. Move after sunrise. No uniforms. No live credential.
>
> Phase V visual-source acquisition is complete.
>
> The Aruna establishing clip is complete.
>
> Five approved resort backgrounds are complete.
>
> Approved resort visual references and expression sheets exist for Benedict, North, Cheryl, Maya and Ika.
>
> The approved team group image exists.
>
> The approved North-alone marked CG exists.
>
> Ika is the only new named Phase V character.
>
> Ika’s owner-adjusted expression sheet is the final identity reference.
>
> Portrait PNG extraction remains an implementation task.
>
> The second 10-second clip must be assembled from approved stills as a cinematic motion comic.
>
> Do not use generative multi-image interpolation for the characters.
>
> Animate camera, light, water, curtains, shadows and focus only.
>
> Do not regenerate faces, bodies, outfits, hands or poses.
>
> Exactly two Phase V cinematic clips are allowed.
>
> No third Benedict-only clip.
>
> The only missing external asset category is audio.
>
> Music may be added separately by the owner.
>
> Preserve North’s agency.
>
> Preserve Maya’s Indonesian authority.
>
> Preserve Cheryl’s admissibility role.
>
> Farid remains remote in Singapore.
>
> Ika’s violence does not prove earlier murder ownership or Decision Ownership.
>
> A distant silhouette does not unlock Ika’s Journal card.
>
> Do not write to GitHub without exact current-turn authorization.
>
> Do not claim Phase V implemented or tested until the assembled Runtime passes the required routes.
>
> The actual approved binary files must be attached or supplied in the new room/package. This Master Plan does not contain the files.

---

# 29. OWNER ASSET TRANSFER CHECKLIST

Before leaving the current room, preserve or download the actual approved files.

Required transfer set:

## Video

- Aruna establishing clip
- any completed motion-comic/team reveal export
- source stills for team reveal

## Backgrounds

- main pool/cabana wide
- cabana interior
- poolside deck
- service path
- blind corner

## Character sheets

- Benedict
- North
- Cheryl
- Maya
- Ika final owner-adjusted version

## Full references

- Benedict resort full
- North resort full
- Cheryl resort full
- Maya resort full

## CG

- undercover team group
- North marked key CG

## Future audio

- ambience
- SFX
- music/score if selected

## Transfer validation

For every file record:

- exact filename
- dimensions
- format
- file size
- checksum where practical
- intended Runtime path
- approved/rejected status
- whether alpha is required
- whether crop is source-only or final

---

# 30. PLANNING-DOCUMENT UPLOAD INSTRUCTION

Upload this file using the exact path:

`GAME_MASTER_PLAN.md`

Recommended commit message:

`Update Phase V asset handoff`

Do not upload it as:

- `GAME_MASTER_PLAN(1).md`
- `GAME_MASTER_PLAN copy.md`
- `GAME_MASTER_PLAN final.md`

After upload:

1. verify GitHub displays the exact canonical filename
2. verify the header shows revision `2026-08-04 03:06 ICT`
3. verify current Runtime remains `0.17.18`
4. verify Phase V is not described as implemented
5. verify visual-source package is described as complete
6. verify audio remains pending
7. verify the motion-comic contract is present
8. verify the five backgrounds are listed
9. verify Ika final visual lock is present
10. verify the new-room instruction is present

---

# 31. DOCUMENTATION-ONLY DELIVERY RECORD

This revision:

- was prepared from the latest GitHub Production information
- recognizes the latest planning file blob `9493d9495e39275bb1b979bf7e46cd1e5f36ff1a`
- recognizes the stale canonical plan blob `09cd4628ccb7fbf9eba8095f5c1cb68a8b18e976`
- preserves Runtime baseline `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- records Phase V visual acquisition
- records the two-clip limit
- records the rejected generative-video method
- records the accepted living-illustration method
- records the approved character and location visual canon
- records audio as the only missing external asset category
- does not modify Runtime code
- does not modify GitHub
- does not claim Runtime testing
- does not contain binary assets

---

# END OF MASTER PLAN
