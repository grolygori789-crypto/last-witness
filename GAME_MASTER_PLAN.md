# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-08-04 08:40 ICT
>
> **Repository:** `grolygori789-crypto/last-witness`
>
> **Production and Default branch:** `production-rebuild`
>
> **Latest Production HEAD observed:** `577acce59436040fa0b6cebcb2116795530ba535`
>
> **Latest HEAD message:** `Add files via upload`
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
> **Document status:** `FULL-MERGE CANONICAL SOURCE · CURRENT OWNER-APPROVED RUNTIME BASELINE · PHASE V PRODUCTION HANDOFF · ASSET AND MOTION CONTRACT LOCK`
>
> **Replaces canonical planning blob:** `9f8508b8e3a2f3a1ce3d1639d5432cf740a0f626`
>
> **Fully merges companion planning blob:** `9493d9495e39275bb1b979bf7e46cd1e5f36ff1a`
>
> **Historical stale canonical blob:** `09cd4628ccb7fbf9eba8095f5c1cb68a8b18e976`

This revision performs a full planning merge. It preserves the detailed `0.17.18` Runtime, Canon, authority, evidence, ending, testing and repair-history material from `GAME_MASTER_PLAN(1).md`, while retaining and expanding the newer Chapter IV Phase V visual-production handoff from the canonical `GAME_MASTER_PLAN.md`.

Verified repository state before this replacement:

- canonical `GAME_MASTER_PLAN.md` exists at blob `9f8508b8e3a2f3a1ce3d1639d5432cf740a0f626`
- companion `GAME_MASTER_PLAN(1).md` exists at blob `9493d9495e39275bb1b979bf7e46cd1e5f36ff1a`
- latest Production commit observed is `577acce59436040fa0b6cebcb2116795530ba535`
- owner-approved Runtime baseline remains `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`, build `0.17.18`

This file must be uploaded under the exact canonical filename:

`GAME_MASTER_PLAN.md`

After the uploaded canonical file is fetched back from GitHub and its revision, merge status and checksum are verified, `GAME_MASTER_PLAN(1).md` may be deleted. Do not delete the companion file before that post-upload verification.

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

`Merge Phase V master plan`

Do not upload it as:

- `GAME_MASTER_PLAN(1).md`
- `GAME_MASTER_PLAN copy.md`
- `GAME_MASTER_PLAN final.md`

After upload:

1. verify GitHub displays the exact canonical filename
2. verify the header shows revision `2026-08-04 08:40 ICT`
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
- replaces canonical blob `9f8508b8e3a2f3a1ce3d1639d5432cf740a0f626`
- fully merges companion blob `9493d9495e39275bb1b979bf7e46cd1e5f36ff1a`
- retains historical reference to stale canonical blob `09cd4628ccb7fbf9eba8095f5c1cb68a8b18e976`
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

---

# 32. FULL-MERGE PRECEDENCE, COVERAGE AND DELETION GATE

## Merge purpose

This section closes the gap between the two planning documents that previously coexisted in Production.

The canonical Phase V handoff document was newer in visual-production facts, but shorter in long-range Canon and Runtime history. The companion `GAME_MASTER_PLAN(1).md` was richer in:

- complete `0.17.18` Runtime ownership
- load order
- State and Save contracts
- Character responsibility bible
- authority and knowledge matrices
- evidence custody
- suspect packages
- ending fate logic
- build and defect history
- technical debt
- owner-device verification records

This merged document preserves both layers.

## Precedence after upload

After this exact file is uploaded and verified:

1. owner’s latest real-device result
2. current Production Runtime
3. canonical `GAME_MASTER_PLAN.md`
4. approved binary assets
5. historical commits and deleted planning copies
6. assistant memory

`GAME_MASTER_PLAN(1).md` becomes redundant only after verification.

## Safe deletion gate for `GAME_MASTER_PLAN(1).md`

Delete the companion only after all are true:

- canonical filename is exactly `GAME_MASTER_PLAN.md`
- revision is `2026-08-04 08:40 ICT`
- header states `FULLY MERGES companion planning blob`
- Runtime baseline remains `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- Phase V remains `RUNTIME NOT YET IMPLEMENTED`
- five backgrounds are listed
- two-clip cap is present
- motion-comic contract is present
- Ika final visual lock is present
- detailed Runtime ownership appendix is present
- Character responsibility bible is present
- ending, custody and testing matrices are present
- downloaded canonical checksum matches the uploaded file

Until those checks pass, retain the companion file.

---

# 33. COMPLETE 0.17.18 RUNTIME OWNERSHIP SNAPSHOT

## Static CSS order

1. `css/style.css`
2. `css/forensic-phase.css`
3. `css/medical-examiner.css`
4. `css/investigation-lifecycle.css?v=0711`
5. `css/fullscreen-display.css?v=0802`
6. `css/chapter-03-phase-04.css?v=0930`

## Static JavaScript ownership order

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

Do not reorder without an assembled-Runtime audit.

## Dynamic Chapter III order

1. `js/chapters/chapter-03/01-title-phase1.js`
2. `js/chapters/chapter-03/02-changi-airport.js`
3. `js/chapters/chapter-03/03-singapore-office.js`
4. `js/chapters/chapter-03/04-marina-bay.js`
5. `js/chapters/chapter-03/05-serviced-apartment.js`
6. `js/chapters/chapter-03/06-hawker-centre.js`
7. `js/chapters/chapter-03/07-digital-forensics-lab.js`
8. `js/chapters/chapter-03/08-callback.js`

## Current Chapter IV bootstrap `0.17.18`

`js/engine/09-defect-hotfix.js` loads:

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

The final stylesheet is deliberately late and scoped. It must not become a general global override.

## Current important file snapshot

| Path | Blob SHA | Role |
|---|---|---|
| `index.html` | `e30f3fb1f20399d51de9aba220802361a5da15d9` | static DOM and static load order |
| `js/engine/06-content-registry-dev.js` | `e404cc2c2c47dac9bca12e54874c4e6ee1e1d4f2` | base Journal, Case File and Dev registry |
| `js/engine/09-defect-hotfix.js` | `96a6f22e4097c26a4750f9eb9dbfa150a8eaf943` | dynamic bootstrap `0.17.18` |
| `js/engine/20-character-journal-story-gate.js` | `1f3088012ac911ec8833a2b58d513b91f5040811` | early-story Journal gate |
| `js/engine/21-character-notification-contract.js` | `8d191d5e3ae773a43dca9bf64d54f348a5fe669d` | scoped Character notification contract |
| `js/engine/22-modal-scroll-experience.js` | `7611f1d1b2378570047c49258beec2eb17736e66` | Dialogue History and Case File scrolling |
| `js/chapters/chapter-04/04a-arman-encounter-revision.js` | `908fdbc42ef56cd054dbdd841e2c5f7aafee6df9` | Phase IV presentation and Arman Journal |
| `css/chapter-04-phase-04-revision.css` | `bbba1c320b3870ff4b0412f654415d0344a33ee9` | accepted Phase IV revision styling |
| `css/phase-action-standard.css` | `4c4e3aa82a0c726eebd0e823d66f0f071b7c847d` | geometry standard `0.17.18` |
| canonical plan before this merge | `9f8508b8e3a2f3a1ce3d1639d5432cf740a0f626` | Phase V handoff source |
| companion plan | `9493d9495e39275bb1b979bf7e46cd1e5f36ff1a` | detailed `0.17.18` source |

Re-fetch all SHAs before editing Runtime.

## Shared owners

### `01-runtime-data.js`

Owns base State, localization, portraits, clue data, audio references and shared globals.

### `02-audio-save.js`

Owns Auto Save, named saves, IndexedDB, localStorage fallback, export/import, deletion, restore and legacy migration.

### `04-ui-dialogue.js`

Owns base routing, chapter intros and base dialogue.

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

Owns:

- early Chapter Journal hiding
- stale-state sanitation on early screens
- North-gate compatibility
- safe late-character timing support
- no body-wide polling

### `21-character-notification-contract.js`

Owns the accepted scoped notification behavior for:

- Somchai and Kittisak
- Adrian
- Hawker pre-verification suppression
- silent Developer routes
- affected-save recovery

### `22-modal-scroll-experience.js`

Owns presentation behavior only for:

- Dialogue History latest-position
- manual upward review
- `Latest` control
- Case File scrolling
- reachable close controls

It does not own content or State.

### `04a-arman-encounter-revision.js`

Scoped owner for:

- accepted Phase IV presentation
- Arman late-character extension
- card/detail compatibility
- unread dot and notification
- Save/Load recovery
- silent Dev unlock

This is not blanket permission to create parallel Character systems for future characters.

---

# 34. STATE, SAVE, STORAGE AND ENDING PROFILE

## Existing shared State

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

## Existing ending profile

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

Cross-chapter use remains future implementation work and requires migration review.

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

Character Registry:

`lastWitness.contentRegistry.v3`

## Phase III State contract

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

## Phase IV State fields

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

Arman Journal preservation:

- `state.chapter4.phase4.armanJournalUnlocked`
- `state.chapter4.phase4.armanJournalUnread`
- `state.chapter4.phase4.armanJournalNotified`
- `state.flags.ch4_arman_identity_verified`
- `state.flags.ch4_arman_journal_unlocked`
- `state.flags.ch4_arman_journal_notified`

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
11. prevent a future module from overwriting restored chapter

## Universal restore rule

Every phase owns:

- defaults
- migration
- checkpoint
- resume bridge
- active-modal restoration
- dialogue restoration where supported
- audio restoration
- Developer jump
- completed-state restore

---

# 35. EVIDENCE PHILOSOPHY, FAIRNESS AND DIFFICULTY

## Evidence classes

A final theory must use multiple classes:

1. Physical
2. Digital
3. Procedural
4. Human
5. Decision

## Evidence wording

Every evidence item should state:

- Observation
- What it supports
- What it does not prove

## Final accusation minimum

A valid accusation requires:

- means
- opportunity or access
- motive
- conduct before or after the event
- at least three evidence classes
- no unexplained fatal contradiction

A wrong suspect may meet the visible minimum through a coherent but incomplete record. The epilogue must expose the missing truth.

## Retrospective fairness

Every major reveal must be supported by at least two earlier Chapters.

Do not rely on:

- a new fact introduced only in confrontation
- an untaught rule
- confession replacing proof
- villain lighting
- one lucky guess

## Minigame envelope

Use:

- one reasoning concept per minigame
- three to five choices per screen
- visible progress
- Reset
- no softlock
- no permanent fail
- explanatory wrong answers
- summaries that reduce memory burden

Avoid:

- dense button matrices
- unexplained jargon
- random codes detached from evidence
- punishment for reasonable misunderstanding

---

# 36. COMPLETE CHARACTER CANON INDEX

## Benedict

- age 42
- independent detective and external consultant
- protagonist and final human decision-maker
- dry humour
- reads intention, wording, hesitation and timing
- no foreign police authority
- works through Kittisak, Cheryl and Maya
- no North romance
- may care deeply for Cheryl without permanent-partner ending

## North

- age 32
- Singaporean
- IT Specialist and Technical Investigator
- Benedict’s trusted long-term partner
- understands Authentication versus Attribution
- never passive
- active target in Chapter IV
- must consent to false success
- no Farid romance

## Elena Sutham

Public:

- age 38
- Thai
- Senior Forensic Systems Analyst
- Meridian Evidence Systems
- useful, credible and calm
- no police command authority

Owner secret:

- mastermind
- Decision Owner
- physical killer of Kawin and Daniel
- selected victim, room, timing and discovery sequence
- used legitimate access
- curated true evidence into false chronology

Forbidden before earned reveal:

- villain smirk
- villain music
- false science
- impossible knowledge
- confession-like dialogue
- personality replacement

## Kittisak Siriwat

- age 40
- Police Captain
- Investigation Inspector
- Bangkok operational commander
- Somchai’s superior
- owns warrants, tasking, protection and custody
- normal authority does not prove corruption

## Somchai Rattanakul

- age 48
- Police Senior Sergeant Major
- senior field investigator
- subordinate to Kittisak
- cannot issue warrants
- anchors physical continuity
- proximity does not prove command ownership

## Ratchata (Dr. Singh)

- age 43
- Thai Sikh
- Senior Medical Examiner
- independent and scientifically strict
- not `R.`
- protects physical truth

## Inspector Cheryl Goh

- age 40
- Singaporean Chinese
- Singapore Police liaison
- protects admissibility and cross-border boundaries
- Farid’s operational senior where relevant
- genuine ally
- romance never overtakes case

## Farid Rahman

- age 31
- Singaporean Malay
- Digital Forensics Specialist
- preserves raw mirrors and alternatives
- remote in Singapore during Jakarta operations
- no North romance

## Adrian Tan Wei Ming

- age 45
- former Principal Systems Architect
- enabled architecture and concealed abuse
- fled
- not mastermind
- strong false-conviction candidate
- never cartoonishly cowardly

## Arman Suryadi

- age 39
- Indonesian
- electronics consultant and silent co-owner
- PALIMPSEST wrapper specialist and broker
- used Dimas as proxy
- guilty of brokerage, metadata protection and concealment
- no victim selection
- not mastermind
- not Decision Owner

## Inspector Maya Pranoto

- age 37
- Indonesian
- Cybercrime Operations Liaison
- owns Indonesian authority
- professional equal to Cheryl
- no Benedict romance
- no love triangle

## Dimas Wibowo

- age 34
- Indonesian
- electronics technician and workshop manager
- controlled proxy and human witness
- not stupid
- not murderer
- no Journal card

## Daniel Voss

- age 38 at death
- German
- investigative journalist and compliance researcher
- dies in Chapter II
- never returns alive
- continues only through prepared material

## Kawin Nopparat

- age 41 at death
- Thai
- Access Governance and Compliance Auditor
- Chapter I victim
- discovered 18-07 reuse
- killed by Elena
- identity revealed in Chapter V

## Rinrada “Rin” Sornchai

- age 37
- Thai
- former Identity and Access Registrar
- living witness implied by `R.`
- not related to Somchai
- saw limited pier facts
- did not see murder act
- testimony requires corroboration

## Narin Theerachai

- age 41
- Thai
- Senior Continuity Deployment Engineer
- Bangkok Local Deployer
- real accomplice
- handled deployment and concealment
- did not select victims

## Ika Prameswari

- age 34
- Indonesian
- private security and recovery specialist
- Field Watcher / Recovery Operator
- receives compartmentalized objectives through Aster Recovery
- real violence and obstruction
- recruited after Daniel’s murder
- cannot be earlier killer
- not Decision Owner

---

# 37. AUTHORITATIVE CHARACTER RESPONSIBILITY BIBLE

Status:

`OWNER-DELEGATED CANON LOCK · AUTHORITATIVE FOR FUTURE WRITING`

Every named or speaking character requires:

1. story role
2. authority
3. objective
4. protected interest
5. fear
6. blind spot
7. knowledge boundary
8. evidence relationship
9. consequence path
10. writing prohibition

No character may know facts without a source, command outside authority, lose competence for puzzle convenience, confess instead of proof or solve another specialist’s role without reason.

## Benedict responsibility

May:

- inspect authorized copies
- attend consensual interviews
- recommend strategy
- conduct voluntary interviews
- protect life in emergencies

May not:

- issue police orders
- obtain warrants
- compel testimony
- seize foreign property
- certify evidence

Objective:

- identify the Decision Owner without sacrificing an easier scapegoat

Protected interest:

- North’s agency and survival

Fear:

- being correct but legally unusable
- protecting North by excluding her

Blind spot:

- may underestimate admissibility

Writing prohibitions:

- no magical lie detection
- no police command
- no uninformed bait
- no flawless unsupported deduction

## North responsibility

May:

- analyse authorized copies
- build isolated models
- compare signatures and event structures
- preserve analysis hashes

May not:

- access live systems without authority
- initiate intrusion
- seize hardware
- certify police evidence
- equate route with identity

Objective:

- produce a conclusion that survives misleading labels

Fear:

- being protected through exclusion

Blind spot:

- may privilege technical elegance over emotional cost

Writing prohibitions:

- never passive
- never helpless hostage
- no unauthorized intrusion merely because possible

## Elena responsibility

May:

- review assigned records
- validate metadata structure
- submit technical interpretations
- access relevant continuity tools

May not:

- command police
- authorize arrest
- certify medicine
- remain sole custodian after compromise
- control public release in her name

Ideology:

> Facts do not govern institutions. Records do.

Objective:

- maintain a chronology that institutions accept

Fear:

- a world admitting that valid records can tell a false story

Blind spot:

- underestimates loyalty and attribution discipline

Genuine limits:

- does not know every private team conversation
- does not know every Farid mirror
- does not know all Rin inferences
- does not know how far Arman will cooperate
- does not know every independently preserved asset

Writing prohibitions:

- no villain coding
- no omniscience
- no false science
- no direct contact with every operative
- no personality swap at reveal

## Kittisak responsibility

May:

- assign police
- coordinate warrants
- authorize internal audit
- request protection
- control custody
- approve controlled leaks
- recommend prosecution

May not:

- command foreign police
- certify medicine or digital findings personally
- grant Benedict police powers
- conceal exculpatory evidence

Objective:

- build a case that survives court

Fear:

- exposing compromise before operator is identified

Blind spot:

- delayed disclosure may look like concealment

Real secret:

- authorized a compartmentalized internal check during Chapter II

## Somchai responsibility

May:

- conduct assigned inquiries
- canvass witnesses
- retrieve CCTV through process
- transport evidence under order
- assist arrests
- lead delegated field detail

May not:

- issue warrants
- command Kittisak
- authorize cross-border operations
- certify evidence
- release case information

Objective:

- anchor the case to rooms, vehicles and hands

Fear:

- a practical shortcut becoming evidence of betrayal

Blind spot:

- may treat a technical anomaly as paperwork

Real secret:

- rerouted a sealed transfer and failed to log an intermediate stop

## Ratchata responsibility

May:

- conduct post-mortem examination
- certify biological findings
- issue independent opinions
- demand preservation
- reject unsupported wording

May not:

- command police
- certify digital attribution
- choose final accused
- alter science to fit theory

Objective:

- prevent the body from being forced to agree with the record

Real secret:

- noticed an early discrepancy but initially treated it as administrative

## Cheryl responsibility

In Singapore may:

- coordinate lawful access
- task Farid
- preserve sealed copies

Outside Singapore may:

- liaise
- witness transfer
- advise admissibility

May not:

- command Maya or Kittisak
- arrest abroad without authority
- turn possession into identity proof

Objective:

- build a case that survives jurisdictional challenge

Fear:

- urgency producing an inadmissible answer

Real secret:

- withheld an unresolved Adrian-linked alert until legal basis existed

## Farid responsibility

May:

- preserve images
- calculate hashes
- perform documented analysis
- maintain lab mirrors
- testify to process

May not:

- command Cheryl
- arrest
- perform foreign live intrusion
- disclose sealed evidence
- infer motive from code

Objective:

- preserve alternatives

Real secret:

- created a lawful air-gapped recovery mirror before watcher cleanup

## Maya responsibility

May:

- authorize observation
- coordinate surveillance
- seek local search/arrest authority
- seize under process
- command local support
- limit foreign access

May not:

- authorize Bangkok or Singapore action
- identify a person from IP alone
- permit live intrusion for speed
- surrender custody without transfer record

Objective:

- expose Indonesian infrastructure use without making Indonesia the suspect

Fear:

- foreign-led contamination

Blind spot:

- may initially expect a conventional cybercrime profile

## Adrian responsibility

Real conduct:

- designed lawful architecture
- approved a contractor relationship tied to Arman
- recognized misuse
- delayed reporting
- retained protected material
- fled

Relationship with Arman:

- met him twice in legitimate testing
- recognizes coding habits
- cannot prove current handle, Bangkok user or victim selector

Objective:

- expose enough truth without becoming the complete explanation

## Arman responsibility

Real conduct:

- adapted wrapper
- added metadata scrub
- protected anonymous handoff
- used Dimas
- accepted money without full end-use disclosure
- withheld records after homicide became known

Received:

- valid client certificate
- deployment constraints
- timing tolerances
- delivery conditions
- blind continuity contact code

Did not receive Elena’s identity.

Objective:

- survive prosecution and client retaliation without becoming murderer of record

Protected interest:

- Dimas and role separation

## Dimas responsibility

- knows workshop routines and prepared scripts
- does not know architecture, victim names or Decision Owner
- may face obstruction/false-statement charges
- no advanced technical exposition
- no Journal card

## Daniel responsibility

- trusted Elena after a genuine prior correction
- knew links incompletely
- did not know Elena was killer
- leaves only pre-death material

## Kawin responsibility

- discovered 18-07 reactivation
- contacted Rin
- used Daniel as publication safeguard
- began suspecting Elena’s sequence control
- carried evidence to pier
- identity-bearing material was removed after death

## Rin responsibility

- created or approved original emergency profile
- saw Elena near pier
- saw Kawin with evidence wallet
- saw Elena leave service side with wallet
- saw an unscheduled Meridian vehicle
- did not see the killing or body movement
- memory remains incomplete

## Narin responsibility

- legitimate deployment authority
- no authority over victims or murder records
- initially believed Elena’s tasks were continuity work
- moved from belief to suspicion to knowing concealment
- real accomplice
- not victim selector

## Ika responsibility

- receives Aster objectives
- initially believes North has stolen evidence
- objective escalates to disappearance or credible accident
- no direct Elena identity
- no earlier-murder timeline
- real violence but no Decision Ownership

---

# 38. NON-HUMAN, ROLE AND ALIAS ENTITY CANON

## PALIMPSEST

- tool family and alias
- not a person
- not autonomous mastermind
- does not choose victims
- signed message does not identify Arman by itself
- no Journal card

## UNKNOWN SOURCE / Hood Feed

- digital mask
- not identity evidence
- may represent Arman in one verified session
- cannot generalize to every session
- no Journal card

## Temporary Operational Profile 18-07

- role-bearing profile
- originally legitimate
- later restored or reused
- proves accepted access
- does not prove operator
- no Journal card

## ANALYST OF RECORD

- capability classification
- identifies analytical behavior, not legal identity
- explains why North is targeted
- not a person

## CONTINUITY PROTOCOL

- Elena’s doctrine
- combines true records into controlled chronology
- acts through people, policy, credentials and timing
- not one sentient application

---

# 39. AUTHORITY MATRIX

| Character | Bangkok command | Singapore command | Indonesia command | Search/arrest | Digital analysis | Medical certification | Evidence custody | Public release |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Benedict | NO | NO | NO | NO | supplied copies | NO | work product | NO |
| North | NO | NO | NO | NO | authorized copies | NO | analysis hashes | NO |
| Elena | NO | NO | NO | NO | advisory access | NO | limited package | NO |
| Kittisak | OWNS | NO | NO | Bangkok process | NO | NO | Bangkok command chain | institutional route |
| Somchai | delegated | NO | NO | under order | NO | NO | handles under log | NO |
| Ratchata | NO | NO | NO | NO | NO | OWNS | medical samples | expert report |
| Cheryl | NO | liaison authority | NO | Singapore process | advises | NO | Singapore transfer | SPF route |
| Farid | NO | NO | NO | NO | OWNS lab work | NO | lab mirror process | NO |
| Maya | NO | NO | OWNS | Indonesian process | authorizes local act | NO | Indonesian seizure | local institution |
| Adrian | NO | NO | NO | NO | private expertise | NO | personal material | NO |
| Arman | NO | NO | NO | NO | criminal/private expertise | NO | private cache | NO |
| Dimas | NO | NO | NO | NO | limited technician | NO | workshop items | NO |
| Rin | NO | NO | NO | NO | Registrar expertise | NO | witness material | NO |
| Narin | NO | NO | NO | NO | deployment access | NO | enterprise handling | NO |
| Ika | NO | NO | NO | NO | operational devices | NO | unlawful possession | NO |

Location owners:

- Bangkok police: Kittisak
- Singapore coordination: Cheryl
- Singapore lab: Farid
- Indonesia: Maya
- Bangkok medicine: Ratchata for science, Kittisak for police coordination
- narrative final decision: Benedict
- technical attribution interpretation: North

---

# 40. KNOWLEDGE MATRIX

## End of Chapter I

| Character | Knowledge |
|---|---|
| Benedict | room staged, body moved, warning targets investigators |
| North | laptop selectively cleared, objects curated |
| Kittisak | official homicide facts |
| Somchai | physical scene and handling |
| Elena | full truth, publicly absent |
| Player | victim unknown, `R.` unresolved |

## End of Chapter II

| Character | Knowledge |
|---|---|
| Benedict | Daniel followed 1807, 18-07 and corrected time |
| North | duplicated profile and unstable chronology |
| Elena | full design and expected path |
| Kittisak | irregular authorized access |
| Somchai | physical custody route |
| Ratchata | genuine science, meaningful timing |
| Player | Daniel dead, science true, chronology suspicious |

## End of Chapter III

| Character | Knowledge |
|---|---|
| Benedict | tool, deployment and Decision Owner differ |
| North | valid records can preserve a false story |
| Cheryl | Singapore route and preserved original |
| Farid | raw mirror and watcher capture |
| Adrian | architecture abused, wrapper involved |
| Elena | North reached attribution threshold |
| Kittisak | Bangkok chain compromised |
| Player | Jakarta route, Bangkok deployment, owner unknown |

## End of current Phase IV

| Character | Knowledge |
|---|---|
| Benedict | Dimas is proxy, Arman is toolmaker, North is marked |
| North | threat classification and Aruna lead |
| Maya | Arman identity and local authority status |
| Cheryl | encounter admissibility and admission limit |
| Farid | source-behavior match, not client identity |
| Arman | team can separate authorship from ownership |
| Dimas | team knows Arman is present |
| Elena | team reached Arman; North must be neutralized |
| Player | Arman culpable, not proved killer; North targeted |

## Phase V target knowledge

By Phase V end, the player may know:

- North was intentionally singled out
- a field operator acted
- Ika is visible or lawfully identifiable
- removal required a credible record
- later violence does not solve earlier murder ownership
- Decision Owner remains unresolved

No character supplies the complete answer alone.

---

# 41. EVIDENCE OWNERSHIP AND CUSTODY MATRIX

| Evidence | Original lawful custodian | Analysis holder | Certification/testimony | Main risk |
|---|---|---|---|---|
| Room 1807 items | Kittisak chain | Benedict/North copies | Somchai/Ratchata | staged order |
| Kawin body/samples | Ratchata chain | Ratchata | Ratchata | identity and chronology |
| Daniel apartment evidence | Kittisak chain | Benedict/North | Somchai | curated visibility |
| toxicology original | medical/lab dual chain | authorized analysts | Ratchata/lab | corrected metadata |
| 05:58/06:09 headers | Bangkok system | North/Farid | digital examiners | valid misleading display |
| Singapore raw mirror | SPF lab | Farid | Farid/Cheryl | identity overextension |
| North sanitized clone | authorized North custody | North | reproducibility | hidden-channel admissibility |
| Jakarta token capture | Maya chain | North/Farid copies | Maya/Farid | route mistaken for identity |
| Arman cache | Maya after seizure | North/Farid | Maya/Arman | client identity absent |
| Dimas statement | Maya | Benedict/Cheryl | Dimas | coercion/self-protection |
| future Ika devices | Maya | Farid/North | Maya/Ika | later violence mistaken for earlier murders |
| Rin statement | Kittisak protection | Benedict/North | Rin plus corroboration | delayed report |
| Narin logs | Kittisak/enterprise | North/Farid | Narin/custodian | real guilt overstated |
| Final Record | multi-party sealed set | case team | Kittisak submission | one missing pillar changes ending |

Mandatory controls:

- Elena never handles disputed digital evidence alone
- Narin never deploys alone after compromise is known
- Somchai never transports disputed evidence without seal and second acknowledgment
- North hidden outputs require Farid or authorized hash witness
- final packages require jurisdiction-specific signatures and cross-reference manifest

---

# 42. CHAPTER DUTY AND HANDOFF MATRIX

| Character | Chapter IV | Chapter V | Chapter VI | Chapter VII |
|---|---|---|---|---|
| Benedict | exposes proxy, negotiates Arman | reconstructs Kawin, earns Rin trust | builds competing theories | confrontation and accusation |
| North | triangulation, marked | hidden analysis, Registrar map | telemetry and leak analysis | technical Last Record |
| Elena | remote ally, secretly orders removal | helps expose Narin, controls interpretation | activates Protocol | defends chronology |
| Kittisak | contains Bangkok chain | commands audit/protection | authorizes leak/breach response | secures official path |
| Somchai | traces handling | finds handoff/extraction route | executes distribution | protects site/witness/evidence |
| Ratchata | preserves samples | identifies Kawin | protects medical chain | physical contradiction |
| Cheryl | admissibility | Singapore support | cross-border preservation | authenticates records |
| Farid | remote source verification | hidden-channel authentication | telemetry/mirror protection | proves original versus rewrite |
| Maya | local Arman operation | Indonesia false-success side | Ika evidence/transfer | authenticates seizure |
| Adrian | architecture help | explains original intent | warns of Protocol | witness or accused |
| Arman | identity/admissions | identifies deployment signature | assists relay or withholds | witness, fugitive or accused |
| Dimas | proxy witness | optional protected statement | corroborates presence | minor witness |
| Rin | not public | Last Witness introduction | protected witness/target | testimony and survival |
| Narin | operational shadow | identified as deployer | main internal suspect | accomplice, witness or accused |
| Ika | Phase V field operation | consequences continue | false-success pressure | witness or fugitive |

---

# 43. SUSPECT PACKAGES AND ENDING FATE

## Elena case

Means:

- legitimate access
- sequence control
- victim context
- ability to direct deployment through legitimate-looking work

Motive:

- protect Continuity Protocol and institutional control

Opportunity:

- pier presence
- Daniel’s trust
- discovery timing

Required corroboration:

- Rin
- Ratchata
- controlled leak
- watcher path
- victim relationship
- discovery-timing ownership

Fatal gap when incomplete:

- access and presence do not alone prove murder

## Adrian case

Real charges:

- enabling
- concealment
- obstruction
- unlawful retention

Fatal contradiction:

- no local victim selection
- no physical murder path

## Arman case

Real charges:

- cybercrime
- brokerage
- metadata scrub
- obstruction
- concealment

Fatal contradiction:

- no Bangkok presence
- no victim selection
- no Decision Ownership

## Narin case

Real charges:

- unauthorized deployment
- tampering
- cleanup
- obstruction
- conspiracy

Fatal contradiction:

- receives priorities rather than originates them

## Ika case

Real charges:

- surveillance
- attempted abduction or murder
- evidence destruction
- obstruction

Fatal contradiction:

- recruitment begins after the earlier murders

## Ending fate matrix

| Character | TRUE CONVICTION | RIGHT NAME, NO CASE | FALSE CONVICTION | THE PERFECT RECORD |
|---|---|---|---|---|
| Benedict | correct case survives | knows truth, lacks legal bridge | lives with wrong principal | defeated/discredited |
| North | alive and restored | alive, hidden or hunted | analysis misused | framed or erased |
| Elena | convicted | identified, escapes charge | credible while another is convicted | authors accepted history |
| Kittisak | submits correct case | preserves dissent file | institution accepts wrong case | removed/forced to certify |
| Somchai | cleared | cleared with custody gap | findings support wrong theory | scapegoated |
| Ratchata | anchors physical truth | proves murder, not owner | truth attached to wrong principal | samples excluded/lost |
| Cheryl | authenticates case | preserves sound file | genuine evidence overextended | Singapore file isolated |
| Farid | mirrors corroborate | proves manipulation only | tool evidence overextended | mirrors destroyed/dismissed |
| Maya | proportionate charges | real local charges | Arman evidence overstated | local evidence excluded |
| Adrian | witness plus real charges | real charges | convicted as mastermind | permanent scapegoat |
| Arman | cyber offences | real charges | convicted as murder principal | accepted foreign mastermind |
| Dimas | reduced charge/immunity | protected/disappears | coerced witness | silenced/absorbed |
| Rin | protected/corroborated | survives without bridge | presence used against wrong owner | lost/discredited |
| Narin | accomplice conviction | real offences only | convicted as murderer | official rogue insider |
| Ika | convicted for North operation | real violence only | overstated hired killer | disappears/lone operative |

Every False Conviction epilogue must name:

1. real offences correctly proven
2. murder attribution that was wrong

---

# 44. COMPLETE STORY AND CHAPTER CANON

## Scientific truth

- toxicology is genuine
- samples are genuine
- biological findings are genuine
- chronology is engineered
- solution is not fake science

## Canonical Daniel timeline

| Time | Event |
|---|---|
| 05:47 | building accepts Temporary Operational Profile 18-07 |
| 05:51 | Orchid Café draft edited |
| 05:58 | original toxicology sample collected |
| 06:09 | collection time revised using accepted permission |
| 06:17 | Laboratory Accession Record created |
| 06:20 | Daniel officially reported discovered |

Interpretation:

- 05:47 proves profile acceptance, not operator
- 06:09 proves accepted permission and a changed event claim, not operator
- 06:17 is always accession creation
- 06:20 is official report

## Chapter I · ROOM 1807

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Locked findings:

- body moved
- room staged
- laptop selectively cleared
- departure interrupted
- true objects arranged into false order

Forward truth:

- victim is Kawin
- Elena killed him
- Elena staged Room 1807
- warning caller is Elena through masked channel

## Chapter II · THE PERFECT STRANGER

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Locked findings:

- Daniel is dead
- 18-07 duplicated profile
- corrected time
- genuine science
- engineered chronology
- North Journal gate first appears after office introduction

## Chapter III · THE BORROWED MINUTES

Status:

`COMPLETE · OWNER-TESTED · OWNER-APPROVED · FROZEN`

Central mechanism:

- signed local events
- delayed synchronization
- eleven-minute reconciliation window
- device timestamp display
- two valid views may conflict
- architecture is not operator
- route is not identity
- deployment is not Decision Ownership

## Chapter IV · SHADOW OF THE TRUTH

Exactly eight phases.

Implemented through Phase IV.

Phase V production facts are locked elsewhere in this plan.

### Phase VI · THE FALSE SUCCESS

- North consents
- North designs deception
- Farid maintains decoy telemetry
- Cheryl and Maya control legal perimeter
- public record may say missing, injured or dead
- North remains alive
- choices affect public-record control and trust

### Phase VII · RELAY FACILITY CLIMAX

- preserve relay authorization echo
- Arman assists under conditions
- cleanup triggers
- North works through hidden channel
- capture Registrar reference `R.`
- prove watcher deployment predates Singapore trip
- Elena sends useful information slightly too early
- no obvious villain reveal

### Phase VIII · SHADOW OF THE TRUTH

- public record says North removed
- North secretly alive
- antagonist believes record
- Benedict moves toward Bangkok
- Jakarta identifies toolmaker, broker and field operation
- Decision Owner unresolved
- `R.` becomes next lead

Closing:

> “Let her believe the record.”

## Chapter V · THE MISSING PIECE

Purpose:

- identify Kawin
- introduce Rin
- reconstruct pier event
- support Narin role
- make Elena a fair but not dominant suspect
- add human and physical evidence

Planned phases:

1. Return to Bangkok
2. Name in Room 1807
3. Room/Profile Cross-Map
4. Daniel’s Handoff
5. The Registrar
6. Pier Reconstruction
7. Witness Extraction
8. The Missing Piece

## Chapter VI · THE FINAL MOVE

Purpose:

- expose Continuity Protocol
- run controlled leak
- reconstruct authority chain
- force simultaneous priorities
- preserve competing theories

Planned phases:

1. Case Theory Without a Charge
2. Controlled Leak
3. Alliance Assignment
4. Continuity Protocol
5. Attack on Safe Chain
6. Evidence Division Breach
7. Elena Knows
8. Two Staging Sites
9. The Final Move

## Chapter VII · LAST WITNESS

Purpose:

- resolve physical events
- record claims
- architecture
- wrapper
- broker
- deployer
- field operator
- physical killer
- Decision Owner
- legal case
- public record

Planned phases:

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

Parts:

1. what happened physically
2. what records claimed
3. who owned each layer
4. what survives legally

---

# 45. CROSS-CHAPTER CLUE CONTINUITY

| Early clue | Later interpretation | Final function |
|---|---|---|
| Room 1807 staged | true objects arranged into false order | model for false official record |
| `R.` calls | Rin and Registrar | living witness and authority |
| pier note | Kawin’s meeting | physical reconstruction |
| 18-07 | operational profile | access without identity |
| corrected time | accepted false chronology | timing control |
| Singapore booking | records travelled | travel/identity separation |
| Adrian architecture | legitimate system abused | architect is not killer |
| Arman wrapper | anonymity and delivery | toolmaker not Decision Owner |
| Dimas proxy | access can be rehearsed | identity requires corroboration |
| Bangkok signed package | local deployment path | internal compromise inquiry |
| watcher milestone | adversary knew progress | North targeted |
| N-32 | capability becomes threat | Phase V attempt |
| Aster reservation | operational lead | Aruna setting |
| North removal record | institution must believe removal | false-success operation |
| Rin sighting | Elena present | presence plus corroboration |
| Ratchata findings | body contradicts record | physical truth |
| controlled leak | narrows access path | separates helper/deployer/owner |
| final record | all layers joined | ending determination |

---

# 46. MINIGAME AND CHOICE ARCHITECTURE

## Implemented minigames

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
18. Persona Triangulation

## Planned minigames

1. Threat Pattern or Decoy Telemetry Control
2. Relay Authorization Preservation
3. Victim Identity Reconstruction
4. Room/Profile Cross-Map
5. Pier Event Reconstruction
6. Controlled Leak Correlation
7. Authority Chain Reconstruction
8. Parallel Scene Prioritization
9. The Last Record

Avoid mechanically duplicated puzzles with renamed labels.

## No single-choice ending

Choices affect dimensions such as:

- evidence integrity
- custody
- attribution
- role separation
- witness protection
- North safety
- alliance strength
- institutional trust
- public-record control

A poor choice may be repaired, but repair costs something.

Show consequences, not hidden ending points.

North’s safety decisions require informed consent.

---

# 47. ENDING ARCHITECTURE AND RESOLUTION

## Ending 1 · TRUE CONVICTION

Requires:

- Elena accused
- Decision Ownership corroborated
- clean or repaired custody
- Rin or equivalent corroboration
- North evidence survives
- Ratchata evidence survives
- Narin deployment separated from Elena’s decisions
- at least three evidence classes
- institution accepts case

## Ending 2 · RIGHT NAME, NO CASE

- Elena correctly identified
- legal support fails
- truth known
- murder conviction fails
- accomplice charges may survive

## Ending 3 · FALSE CONVICTION

- institution accepts a coherent case against a culpable person
- murders attributed to wrong principal
- Adrian, Arman or Narin variants remain valid
- epilogue distinguishes real guilt from wrong murder attribution

## Ending 4 · THE PERFECT RECORD

Possible conditions:

- witness lost
- North framed or officially removed
- custody destroyed
- physical and digital evidence fail to corroborate
- institution accepts engineered chronology
- player embraces a theory with fatal contradiction

## Resolution dimensions

1. evidence integrity
2. custody
3. attribution proof
4. role separation
5. corroboration breadth
6. witness protection
7. North safety
8. institutional trust
9. public-record control
10. final accused

Before final confirmation, show warnings such as:

- `DECISION OWNER NOT CORROBORATED`
- `PHYSICAL PRESENCE UNRESOLVED`
- `CUSTODY GAP REMAINS`
- `ALTERNATIVE OPERATOR THEORY NOT ELIMINATED`

---

# 48. RELATIONSHIP AND ALLIANCE DESIGN

## Benedict and North

- central partnership
- trust through inclusion
- no romance
- consent violations affect alliance and endings

## Benedict and Cheryl

- respect
- restrained amusement
- shared risk
- genuine feeling
- no permanent partnership ending
- no love triangle

## Maya and Benedict

- professional chemistry
- no romance
- no harem structure

## North and Farid

- technical respect
- dry banter
- no romance

## North and Arman

- hostility and technical recognition
- skill does not equal innocence

## Benedict and Elena

- psychological duel inside cooperation
- Benedict tests timing and knowledge
- no accusation before proof

## Kittisak and Somchai

- superior/subordinate
- professional trust
- Somchai may challenge respectfully
- Kittisak owns final police order

---

# 49. PHASE IV IMPLEMENTED CONTRACT

Phase IV is an implemented no-regression dependency.

## Narrative

- Surya Elektronik remains encounter site
- Dimas remains proxy
- Arman identity is physically and behaviorally corroborated
- Persona Triangulation separates knowledge, access, authorship and contradiction
- Arman admissions remain limited
- North threat remains
- Phase V location is justified

## Opening sequence

1. unobstructed vehicle approach
2. natural end or Skip reaches same State
3. soft fade
4. dedicated Phase title card
5. Day/Location/Time card
6. automatic building entry

No `ENTER THE BUILDING` button.

## UI

- Save/Menu present
- Settings available
- gold progress
- approved luminance
- no global dark shade
- Return to Title stops audio

## Persona Triangulation

Categories:

- KNOWLEDGE
- ACCESS
- AUTHORSHIP
- CONTRADICTION

Correct conclusion:

`CONTROLLED PROXY`

## Phase IV consequence choices

Dimas treatment:

- protect/separate
- pressure
- treat as co-conspirator

Arman status:

- protected technical witness
- confidential asset
- prime suspect

Cache:

- seal first
- live trace
- private safety clone

North:

- withdraw
- let her design counteroperation
- use without full consent

The last route has consequences and is never celebrated.

---

# 50. BUILD HISTORY AND OWNER VERIFICATION

## Historical chain

### `0.7.x–0.12.1`

- Canon separation
- Save Manager
- Journal gates
- Season 1

### `0.13.2`

- Chapter IV Phase I

### `0.14.9–0.16.4`

- Jakarta arrival
- Maya extension
- portrait stabilization
- Phase III

## Phase IV repair chain

### `0cbece8853e8049d5a7af1b2bfa4b954d1bc8586`

- base Phase IV `0.17.0`
- rejected for presentation defects

### `5ea29ca53feaeb3ce8e38f8dc580cd9a0fa02eb8`

- first Dev jump repair
- insufficient

### `ea3b30d617b347ed04df02f4d3e5fff8a321540c`

- direct handoff materially improved

### `cd681faab50153c4e0ef7d5d2d8fa792be01b367`

- polish candidate
- owner found HUD/portrait/consistency defects

### `090442b6a64f12912ab4bf0b42c3e607c2006836`

- consistency repair

### `6fe7097376a20d2e59c5d5c077d302920522c959`

- scoped Journal and portrait repair
- early gate still defective

### `5adfbaa4be1bf4f834323b291a23a51d03b47146`

- `0.17.5`
- rejected blocker
- global Character wrapping broke Chapter I
- never use as stable baseline

### `02e1dcf7e024a3db26572cf035d3449186f2ab6a`

- `0.17.6`
- restored playability
- removed unsafe global layer
- Arman Journal still incomplete

### `8a70778dffbdea65c7ba37954673be11b547f3b2`

- `0.17.7`
- fixed Arman Journal
- historical accepted Arman baseline

### `0ebebd2109309a3abe76f858d641a81274e54fe9`

- `0.17.14`
- final notification/unread contract
- Somchai/Kittisak/Adrian timing
- silent Developer behavior

### `4cdcaf00c74d206d092d5d5d7dcc06bff55e6bfa`

- `0.17.15`
- Dialogue History and Case File scrolling

### `190dd3bae7573582fae38eafdfda3d9f91db96d1`

- `0.17.16`
- action geometry and Forensic stack

### `a9630dd120bff1df2fc7305a7d35337b2d298250`

- `0.17.17`
- Secure Mirror containment

### `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`

- `0.17.18`
- Phase IV minigame centering
- current owner-approved Runtime baseline

## Engineering lessons

- synthetic DOM checks are not full Runtime tests
- late-character bugs must not be solved globally
- active screen may outrank stale chapter State
- registry, persistence and UI are one contract
- the owner must not be the first tester of a claimed blocker-free build

---

# 51. ACCEPTED LIMITATIONS AND TECHNICAL DEBT

- iPhone Safari not owner-tested
- iOS Add to Home Screen not owner-tested
- backgrounding may exit fullscreen
- legacy global build label may differ
- Chapter I intro may still say `HOTEL 1807`
- some CSS headers/cache queries are historical
- broad Phase I–II language audit unresolved
- Somchai role may remain generic in Runtime Journal
- Kittisak Inspector function may not display everywhere
- exact Phase V attack choreography unresolved
- Ika not yet a Runtime character
- Narin not yet a Runtime character
- cross-Chapter ending profile remains future implementation
- no undiscovered-bug guarantee

Resolved issues include:

- vehicle overlay
- manual building button
- missing Phase IV HUD
- non-gold progress
- rejected darkening
- Maya white edge
- Arman portrait scale
- Chapter I Journal leak
- premature notifications
- missing Arman card
- Adrian notification/red-dot defects
- Dialogue History position/navigation
- Case File scrolling
- inconsistent action widths
- Forensic overlap
- Secure Mirror overflow
- Phase IV minigame shift
- cache-header clipping

Completed scope remains maintenance-locked.

---

# 52. DELIVERY AND TESTING REQUIREMENTS

## Future code package

Include:

- one ZIP
- preserved repository paths
- changed-file manifest
- installation instructions
- test report
- SHA-256
- base branch/commit
- changed-file count
- tested scope
- untested scope
- no unrelated files
- suggested commit name

## Full assembled smoke

Minimum:

1. Title
2. New Game
3. Chapter I interaction
4. Chapter I Journal hidden
5. Chapter II North gate
6. Save/Load
7. Developer Mode
8. every implemented Chapter IV Phase
9. Phase IV to Phase V handoff
10. Phase V natural and Developer entry
11. Return to Title
12. audio cleanup

## Character regression

- every first unlock once
- unread dots
- read clearing
- no duplicate toast
- silent Dev unlock
- Maya/Arman profile switching
- future Ika threshold
- Thai and English
- Save/Load

## Phase V-specific regression

Use Section 26 of this plan in full.

## Reporting honesty

Separate:

- static checks
- synthetic browser checks
- assembled Runtime checks
- owner-device checks
- untested behavior

Never call a synthetic test an owner-device pass.

---

# 53. CURRENT BASELINE PRESERVATION LOCK

```text
Repository:
grolygori789-crypto/last-witness

Branch:
production-rebuild

Latest Production HEAD observed before this merge:
577acce59436040fa0b6cebcb2116795530ba535

Current owner-approved Runtime baseline:
f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99

Runtime build:
0.17.18

Implemented endpoint:
CHAPTER IV · PHASE IV

Next target:
CHAPTER IV · PHASE V · NORTH IS MARKED

Phase V status:
VISUAL SOURCE PACKAGE COMPLETE
ESTABLISHING CLIP COMPLETE
MOTION-COMIC SOURCE SET COMPLETE
AUDIO PACKAGE PENDING
RUNTIME NOT YET IMPLEMENTED

Canonical plan replaced:
9f8508b8e3a2f3a1ce3d1639d5432cf740a0f626

Companion plan fully merged:
9493d9495e39275bb1b979bf7e46cd1e5f36ff1a
```

Preserve:

- all `0.17.18` accepted contracts
- complete Canon
- owner-secret truth
- authority boundaries
- proof boundaries
- custody matrices
- ending architecture
- Phase V visual identity
- two-clip limit
- motion-comic method
- audio-pending status
- North agency
- Ika timeline contradiction
- owner-upload workflow

---

# 54. POST-UPLOAD VERIFICATION AND COMPANION DELETION

After uploading this file:

1. fetch `GAME_MASTER_PLAN.md` from `production-rebuild`
2. confirm revision `2026-08-04 08:40 ICT`
3. confirm the fetched blob differs from `9f8508b8e3a2f3a1ce3d1639d5432cf740a0f626`
4. compare downloaded SHA-256 against the local checksum supplied with this delivery
5. search for `FULLY MERGES companion planning blob`
6. search for `# 37. AUTHORITATIVE CHARACTER RESPONSIBILITY BIBLE`
7. search for `# 39. AUTHORITY MATRIX`
8. search for `# 41. EVIDENCE OWNERSHIP AND CUSTODY MATRIX`
9. search for `# 43. SUSPECT PACKAGES AND ENDING FATE`
10. search for `# 50. BUILD HISTORY AND OWNER VERIFICATION`
11. search for `# 13. MOTION-COMIC / LIVING-ILLUSTRATION CONTRACT`
12. search for Ika’s owner-adjusted-light visual lock
13. confirm Phase V remains not implemented
14. confirm audio remains pending
15. confirm no Runtime commit was changed

Only then delete:

`GAME_MASTER_PLAN(1).md`

Recommended deletion commit:

`Remove merged master plan copy`

Git history retains the old companion blob, but the working tree must have one canonical source of truth.

---

# 55. FULL-MERGE DELIVERY RECORD

This revision:

- preserves the detailed `0.17.18` plan
- preserves Runtime ownership and load order
- preserves State, Save and storage contracts
- preserves full Character responsibilities
- preserves authority, knowledge, custody and duty matrices
- preserves suspect and ending logic
- preserves chapter and timeline Canon
- preserves build history and repair lessons
- preserves technical debt and testing rules
- adds the complete Phase V visual and motion handoff
- locks Aruna Coastal Hotel
- locks the Aster reservation lead
- locks the five backgrounds
- locks final resort identities
- locks Ika’s owner-adjusted reference
- locks the North marked CG meaning
- locks exactly two cinematics
- rejects generative character interpolation
- specifies effect-driven still animation
- records audio as the only missing external asset category
- distinguishes asset readiness from Runtime implementation
- provides a safe deletion gate for the `(1)` file
- contains no binary assets
- makes no new Runtime-testing claim

---

# END OF MASTER PLAN
