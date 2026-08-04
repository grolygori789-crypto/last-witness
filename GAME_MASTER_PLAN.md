# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-08-05 00:46 ICT
>
> **Repository:** `grolygori789-crypto/last-witness`
>
> **Production and Default branch:** `production-rebuild`
>
> **Latest Production HEAD observed:** `7928a24622f258cfc1a6b825f9445ed246817866`
>
> **Latest HEAD message:** `Fix Phase V portraits and time (0.18.5)`
>
> **Current Runtime candidate:** `0.18.5`
>
> **Current playable boundary:** `CHAPTER IV · PHASE V · NORTH IS MARKED`
>
> **Current owner-reported status:** `PHASE V FUNCTIONALLY ACCEPTED EXCEPT DIALOGUE PORTRAIT CUTOUTS`
>
> **Only known active defect:** `CHAPTER IV PHASE V DIALOGUE PORTRAIT EXTRACTION / TRUE-ALPHA CUTOUT QUALITY`
>
> **Last fully accepted pre-Phase-V no-regression baseline:** `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99` · build `0.17.18`
>
> **Document status:** `CURRENT CANONICAL HANDOFF · OWNER-RESULT OVERRIDE · PHASE V PORTRAIT REPAIR LOCK`

This document replaces the previous canonical planning revision dated 2026-08-04 08:40 ICT.

The previous revision correctly preserved long-range Canon and the accepted `0.17.18` baseline, but its Phase V implementation status is now historical. Chapter IV Phase V has since been implemented through Production candidate `0.18.5`.

Whenever an older statement conflicts with the status in Sections 0, 1, 2, 8, 9, 10 or 26 of this document, the newer owner-reported status in this revision wins.

This is a documentation-only update. It does not modify Runtime code, assets or GitHub.

---

# 0. CURRENT OWNER-RESULT OVERRIDE

## 0.1 Latest owner result

The owner's latest test result for Chapter IV Phase V is authoritative:

- the Phase V implementation is present and playable
- the combat sequence is correct and accepted
- the current dialogue portrait scale is acceptable
- no other current problem has been reported
- the remaining blocker is the quality of character cutouts used in the Phase V dialogue box

`NO OTHER CURRENT DEFECT REPORTED` means no other defect was observed in the owner's latest test. It is not a guarantee that no undiscovered defect exists.

## 0.2 Only active defect

The only known active defect is:

`CHAPTER IV · PHASE V · DIALOGUE PORTRAIT CUTOUT FAILURE`

Observed symptoms:

- heads are clipped or partially missing
- the top of the skull or hairstyle is cut away
- parts of shoulders, torso or body disappear
- portrait silhouettes look unnaturally thin or incomplete
- dark or black hair merges into the black portrait background
- remnants of the original gray background or contaminated edge color remain visible
- the extraction does not look like a clean professional transparent PNG cutout
- some expressions lose different body or hair regions, causing visible inconsistency between dialogue lines

The current `0.18.5` portrait repair is not owner-accepted as final.

## 0.3 Scope lock

The next repair must address only the Phase V portrait asset preparation and the smallest directly necessary portrait-loading reference.

Do not modify unless a proven portrait-specific dependency requires it:

- story or dialogue text
- Canon
- combat logic
- combat images
- combat timing
- combat controls
- combat feedback
- current portrait scale
- dialogue-box layout
- HUD
- Save, Menu or Settings
- audio behavior
- scene progression
- Phase V time continuity at `DAY 5 · 14:30 WIB`
- evidence
- Case File
- Character Journal behavior
- State or Save/Load schema
- Developer Mode
- backgrounds
- CGs
- video assets
- Chapters I–III
- Chapter IV Phases I–IV

Combat is accepted. Do not reopen it.

The current portrait size is accepted. Do not solve extraction defects by shrinking, enlarging or aggressively repositioning the portraits.

## 0.4 Proven repair direction

Treat this as a source-asset extraction failure, not a CSS-decoration problem.

The correct repair direction is:

1. return to the latest owner-approved expression-sheet or full-reference source for each character
2. extract each required expression again from source
3. preserve the complete visible head, hair silhouette, neck, shoulders and intended upper torso
4. create true alpha from the source boundary
5. manually protect dark hair against accidental transparency removal
6. remove original gray or colored background contamination without deleting real hair or anatomy
7. keep consistent canvas, head scale and top anchor across expressions
8. inspect the final PNG at the exact in-game size inside the actual dialogue UI
9. compare every expression against its approved source before delivery

Do not use aggressive automatic background removal as the final method without manual correction.

Do not use generative face, hair, body or costume reconstruction unless the owner explicitly authorizes a specific source defect repair.

## 0.5 Prohibited cosmetic concealment

Do not hide a bad cutout with:

- gray plates
- cyan or white outlines
- broad glow
- blur halos
- feathered fog around the body
- black paint that erases dark hair
- blend modes
- heavy drop shadows
- CSS masking that cuts the head or shoulders
- enlarging the image beyond the safe crop
- cropping the source more tightly
- adding a fake solid background inside the PNG

A subtle natural separation at the pixel edge may be used only when it comes from correct edge decontamination and does not create a visible artificial outline.

## 0.6 Acceptance criteria

The portrait repair is acceptable only when all applicable Phase V dialogue portraits meet all of these conditions:

- the complete intended head is visible
- the complete approved hairstyle silhouette is visible
- dark hair remains readable against the black portrait well
- no scalp, hair mass, face, neck, shoulder or intended torso region is accidentally missing
- no floating body fragments
- no holes inside hair or clothing caused by faulty alpha
- no gray residue from the source sheet
- no white fringe
- no cyan fringe
- no muddy halo
- no ragged stair-step edge at normal mobile viewing distance
- no artificial glow or outline
- exact approved identity is preserved
- exact approved expression is preserved
- costume and accessories remain unchanged
- existing accepted portrait scale and general placement remain stable
- transitions between expressions do not produce visible head-size or body-position jumps

## 0.7 Required portrait audit set

Audit every Phase V dialogue expression for:

- Benedict
- North
- Cheryl
- Maya
- Ika

The Phase V package currently uses eight indexed expressions per character. Inspect the complete dialogue set, not only one sample per character.

Profile PNGs must be checked only for the same extraction defect. Do not redesign Character Journal portraits when they are already correct.

## 0.8 Required visual proof

Before claiming the repair is complete, provide:

- a contact sheet showing every repaired dialogue portrait on transparency
- a second contact sheet showing every repaired portrait on pure black
- a third check on mid-gray or checkerboard to reveal contamination and missing alpha
- screenshots from the actual Phase V dialogue UI at the owner’s normal mobile viewport
- at least one screenshot for every character
- close inspection of the darkest hair regions

Synthetic alpha statistics are supporting evidence only. They do not replace visual inspection.

---

# 1. SOURCE OF TRUTH AND WORKFLOW

## 1.1 Source hierarchy

1. owner's latest real-device result
2. current Production Runtime on `production-rebuild`
3. this exact `GAME_MASTER_PLAN.md`
4. latest owner-approved binary assets
5. current repository history and QA records
6. older planning revisions
7. assistant memory

When sources conflict:

- the owner's observed behavior wins over a prior automated QA claim
- current Production wins over old implementation notes
- locked Canon wins over a Runtime defect
- latest owner-approved visual references win over generated or extracted derivatives
- a portrait PNG that passes structural checks but fails visually is defective

## 1.2 Mandatory opening audit before any repair

Before editing:

1. fetch the latest `production-rebuild` HEAD
2. verify that the current HEAD still descends from or matches the observed `0.18.5` candidate
3. fetch and read this file completely
4. inspect `index.html`
5. inspect static and dynamic load order
6. inspect `js/engine/09-defect-hotfix.js`
7. inspect `js/chapters/chapter-04/05-north-is-marked.js`
8. inspect `css/chapter-04-phase-05.css`
9. inspect all current Phase V portrait PNGs
10. inspect the latest approved expression-sheet or full-reference sources actually supplied in the working package
11. compare every Runtime portrait against its source
12. prove which extraction operation removed each missing region
13. choose the smallest true owner of the defect
14. repair locally
15. test in the assembled Runtime, not only in an image viewer
16. report tested and untested scope honestly

## 1.3 GitHub write rule

Do not write to GitHub without exact current-turn authorization.

Normal delivery remains local. The owner uploads Production files personally.

Do not:

- create a branch
- push commits
- modify GitHub Pages directly
- delete repository files
- rename the Production branch

## 1.4 Delivery rule

For a code or asset repair, deliver one ZIP with preserved repository-relative paths.

Include:

- changed-file manifest
- installation/upload instructions
- test report
- SHA-256 checksum
- base branch and commit
- exact changed-file count
- tested scope
- untested scope
- suggested commit message

Do not include unrelated files.

---

# 2. CURRENT VERIFIED PRODUCTION SNAPSHOT

## 2.1 Repository state

- Repository: `grolygori789-crypto/last-witness`
- Production branch: `production-rebuild`
- Default branch: `production-rebuild`
- Latest observed HEAD: `7928a24622f258cfc1a6b825f9445ed246817866`
- Latest observed HEAD message: `Fix Phase V portraits and time (0.18.5)`
- Current Phase V Runtime candidate: `0.18.5`
- Last fully accepted pre-Phase-V baseline: `f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99`
- Pre-Phase-V baseline build: `0.17.18`

Re-fetch all identifiers before editing. Do not use these values as a substitute for the latest GitHub state.

## 2.2 Current implementation boundary

Implemented and present:

- Chapters I–III
- Chapter IV Phase I
- Chapter IV Phase II
- Chapter IV Phase III
- Chapter IV Phase IV
- Chapter IV Phase V, `NORTH IS MARKED`

Current observed Phase V build chain:

- `0.18.0` Phase V initial implementation
- `0.18.1` visual and continuity repair
- `0.18.2` presentation repair
- `0.18.3` HUD and combat repair
- `0.18.4` portrait and combat-direction repair
- `0.18.5` portrait and time repair

## 2.3 Current owner acceptance boundary

Accepted in the latest owner report:

- Phase V general flow
- combat behavior and presentation
- current dialogue portrait scale
- all other currently observed Phase V behavior

Not accepted:

- dialogue portrait cutout quality

Do not convert “no other problem currently observed” into a claim of complete cross-browser regression.

## 2.4 No-regression baseline

Chapters I–III and Chapter IV Phases I–IV remain protected.

Preserve:

- Chapter I Character Journal hidden
- Chapter II Journal first appears after North’s initial office conversation
- one-time Character Added notification behavior
- unread red-dot timing and read clearing
- silent Developer unlock behavior
- Adrian pre-verification gate
- Arman card, unread state and Save/Load persistence
- Maya profile switching
- Dialogue History latest-position behavior
- Case File scrolling
- accepted action-button geometry
- Forensic bottom stack
- Secure Mirror containment
- Phase IV minigame centering
- Phase III direct handoff
- Phase IV HUD, progress and title/location sequence
- Phase IV audio cleanup

---

# 3. PROJECT IDENTITY

- Game: **LAST WITNESS**
- Studio: **BENEDICT INTERACTIVE**
- Platform: mobile-first browser game
- Primary owner test platform: Android Chrome
- Orientation: portrait 9:16
- Genre: Narrative Detective Adventure / Interactive Crime Investigation
- Art direction: neo-noir graphic novel, cel-shaded, heavy ink, angular shadows, cinematic crime-adventure, readable on mobile

Core investigative principle:

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
10. victim and timing selector
11. Decision Owner

Core ending principle:

> **Historical truth is fixed. Legal truth, public truth and institutional truth depend on what survives and what can be proved.**

Historical truth:

- Elena is the mastermind
- Elena killed Kawin
- Elena killed Daniel

---

# 4. CHAPTER STRUCTURE

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

## Chapter IV phase lock

Exactly eight phases:

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET PROVENANCE / PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

No ninth Phase without owner approval.

Current status:

- Phase I complete
- Phase II complete
- Phase III complete
- Phase IV complete and protected
- Phase V implemented through candidate `0.18.5`, portrait repair still open
- Phases VI–VIII planned

---

# 5. CORE STORY CANON

## 5.1 Daniel Voss

- dead in Chapter II
- never returns alive
- continues only through prepared pre-death material

## 5.2 Room 1807 victim

- not Daniel
- Kawin Nopparat
- identity revealed in Chapter V
- killed by Elena

## 5.3 `R.`

- unresolved to the player through Chapter IV
- future identity is Rinrada “Rin” Sornchai
- former Identity and Access Registrar
- Last Witness
- not Ratchata

## 5.4 Temporary Operational Profile 18-07

- operational profile
- not a person
- proves accepted access
- does not prove the physical operator

## 5.5 Responsibility layers

1. Adrian designed lawful architecture.
2. Arman adapted the wrapper.
3. Narin supplied or executed trusted Bangkok deployment.
4. Ika handled later surveillance and recovery work.
5. Elena selected victims, room, timing, discovery sequence and cleanup priority.

## 5.6 North threat

- North understands attribution
- her capability threatens Elena’s protective gap
- Elena chooses neutralization
- the attempt remains deniable
- North remains alive and active
- the attempt creates evidence
- North later consents to the false-success plan

## 5.7 Scientific truth

- toxicology is genuine
- samples are genuine
- biological findings are genuine
- chronology is engineered
- the solution is not fake science

## 5.8 Canonical Daniel timeline

| Time | Event |
|---|---|
| 05:47 | building accepts Temporary Operational Profile 18-07 |
| 05:51 | Orchid Café draft edited |
| 05:58 | original toxicology sample collected |
| 06:09 | collection time revised using accepted permission |
| 06:17 | Laboratory Accession Record created |
| 06:20 | Daniel officially reported discovered |

Interpretation:

- 05:47 proves profile acceptance, not operator identity
- 06:09 proves an accepted permission changed the event claim, not who used it
- 06:17 is accession creation
- 06:20 is the official report

---

# 6. CHARACTER CANON

## Benedict

- age 42
- independent detective and external consultant
- protagonist and final human decision-maker
- composed, observant and dryly humorous
- does not accuse without evidence
- has no foreign police authority
- works through Kittisak, Cheryl and Maya
- never uses North as uninformed bait
- no romance with North

## North

- age 32
- Singaporean
- IT Specialist and Technical Investigator
- Benedict’s trusted long-term partner
- understands Authentication versus Attribution
- active and capable
- never a passive victim
- must consent to the false-success plan
- no romance with Benedict or Farid

## Elena Sutham

Public identity:

- age 38
- Thai
- Senior Forensic Systems Analyst
- Meridian Evidence Systems
- credible, calm and useful
- no police command authority

Owner-secret truth:

- mastermind
- Decision Owner
- physical killer of Kawin and Daniel
- selected victims, room, timing and discovery sequence
- used legitimate access
- curated true evidence into a false chronology

Forbidden before earned reveal:

- villain smirk
- villain music
- false science
- impossible knowledge
- confession-like dialogue
- abrupt personality replacement

## Kittisak Siriwat

- age 40
- Police Captain and Investigation Inspector
- Bangkok operational commander
- Somchai’s superior
- owns warrants, police tasking, protection and custody
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
- controlled and authoritative
- does not command Maya in Indonesia

## Farid Rahman

- age 31
- Singaporean Malay
- Digital Forensics Specialist
- preserves raw mirrors and alternative copies
- remote in Singapore during Jakarta operations
- does not infer motive from code

## Adrian Tan Wei Ming

- age 45
- former Principal Systems Architect
- enabled architecture and concealed abuse
- fled
- not mastermind
- strong false-conviction candidate

## Arman Suryadi

- age 39
- Indonesian
- electronics consultant and silent co-owner
- PALIMPSEST wrapper specialist and broker
- used Dimas as proxy
- guilty of brokerage, metadata protection and concealment
- no victim selection
- not mastermind or Decision Owner

## Inspector Maya Pranoto

- age 37
- Indonesian
- Cybercrime Operations Liaison
- owns Indonesian authority
- direct, practical and confident
- professional equal to Cheryl
- no Benedict romance

## Dimas Wibowo

- age 34
- Indonesian
- electronics technician and workshop manager
- controlled proxy and human witness
- not murderer
- no Character Journal card

## Daniel Voss

- age 38 at death
- German
- investigative journalist and compliance researcher
- dies in Chapter II

## Kawin Nopparat

- age 41 at death
- Thai
- Access Governance and Compliance Auditor
- Chapter I victim
- discovered 18-07 reuse
- killed by Elena

## Rinrada “Rin” Sornchai

- age 37
- Thai
- former Identity and Access Registrar
- living witness implied by `R.`
- not related to Somchai
- saw limited pier facts
- did not see the murder act
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
- guilty of later surveillance, violence and obstruction
- recruited after Daniel’s murder
- cannot be the earlier killer
- not Decision Owner

---

# 7. AUTHORITY AND KNOWLEDGE LOCK

## Benedict

May:

- inspect authorized copies
- attend consensual interviews
- recommend strategy
- protect life in emergencies

May not:

- issue police orders
- obtain warrants
- compel testimony
- seize foreign property
- certify evidence

## North

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

## Kittisak

Owns Bangkok police command, warrants, tasking, protection and custody.

## Cheryl

Owns Singapore-side liaison, admissibility and lawful transfer. She does not command foreign police.

## Maya

Owns Indonesian observation, seizure, warrants and local support. She does not identify a person from IP or route alone.

## Ratchata

Owns medical science and certification. He does not choose the accused.

## Farid

Owns documented lab analysis and preserved mirrors. He does not command or arrest.

## Elena

Has technical advisory access only. She does not command police, certify medicine or control disputed evidence alone.

## Operational rule

No character may:

- know a fact without a source
- command outside their authority
- lose competence for puzzle convenience
- confess in place of proof
- solve another specialist’s role without narrative reason

---

# 8. CHAPTER IV PHASE V IMPLEMENTED CONTRACT

## 8.1 Identity

- Chapter IV Phase V title: `NORTH IS MARKED`
- exact location: Aruna Coastal Hotel, Indonesia
- Phase IV lead: Aster Recovery reserved three rooms and a poolside cabana
- reservation time reference: 10:30 local
- playable resort insertion time in `0.18.5`: `DAY 5 · 14:30 WIB`
- Maya’s team enters after perimeter setup
- no uniforms
- no live credential

## 8.2 Physical team

- Benedict
- North
- Cheryl
- Maya

Farid remains remote in Singapore.

Maya owns Indonesian authority.

Cheryl protects cross-border admissibility.

## 8.3 Phase function

- public leisure cover with operational tension
- false calm
- North is singled out
- deniable removal attempt
- North acts and fights back
- the team responds
- attack creates evidence
- Ika becomes identifiable at the correct threshold
- the player separates real violence from Decision Ownership
- Phase V creates the basis for `THE FALSE SUCCESS`

## 8.4 Proof boundary

Phase V may support:

- North was intentionally selected
- a field operator was physically present
- the removal attempt was planned
- the attacker needed a credible record of removal
- Ika performed surveillance or recovery work
- Ika committed real violence and obstruction
- Aster Recovery was involved operationally

Phase V does not prove by itself:

- Ika killed Kawin
- Ika killed Daniel
- Ika selected earlier victims
- Ika is Decision Owner
- Elena personally contacted Ika
- a valid credential identifies the physical attacker
- violence identifies the mastermind

Mandatory interpretation:

> **The person who acts against North may be guilty of real violence without owning the earlier murders or the final decision.**

## 8.5 Accepted combat lock

The owner reports that combat is correct.

Preserve:

- North’s left/right combat readability
- opposing fighter direction
- three-exchange logic
- accepted actions and response flow
- HP/progress presentation
- accepted effects
- accepted combat images
- current combat audio behavior

Do not include combat assets in the portrait repair ZIP.

## 8.6 Accepted portrait geometry lock

The owner reports that the current dialogue portrait scale is acceptable.

Preserve:

- current overall portrait size
- current dialogue-box relationship
- current left/right speaker placement
- current mobile face readability

Only make a per-image canvas correction when required to restore missing source content while keeping the same apparent scale.

---

# 9. PHASE V VISUAL CANON

## Universal rule

Use only the latest owner-approved source references.

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

## Benedict resort lock

- shirtless
- black sunglasses where shown
- black swim shorts
- athletic muscular build
- short black hair
- mature composed face
- not an exaggerated bodybuilder

## North resort lock

- Indian appearance
- warm medium-brown skin
- short wavy dark hair
- slim athletic body
- black bikini with subtle leaf pattern
- small necklace
- confident and analytical
- never passive pin-up behavior

## Cheryl resort lock

- Singaporean Chinese
- short pixie hair
- burgundy or wine bikini
- sunglasses where shown
- athletic-curvy body
- poised and authoritative

## Maya resort lock

- Indonesian
- warm tan skin
- dark bob haircut
- bright red or orange bikini
- sunglasses resting on top of head
- fullest silhouette among North, Cheryl and Maya
- direct and confident
- no identity drift toward Ika

## Ika resort lock

- Indonesian
- warm medium-tan or brown skin
- sharper cheekbones
- firmer jawline
- straighter brows
- narrower eyes
- thinner lips than Maya
- long dark hair
- sharp side part
- low ponytail
- controlled loose strands
- dark olive halter bikini
- gold ring hardware
- sheer olive cover-up
- small gold hoop earrings
- side or hip tattoo where shown
- controlled, professional and dangerous
- not a recolored Maya

## Dark-hair extraction rule

Dark hair is part of identity, not removable background.

For Benedict, North, Cheryl, Maya and Ika:

- use luminance, color, edge continuity and source comparison together
- do not classify near-black hair pixels as background merely because the destination well is black
- retain fine hair strands when visible in the approved source
- retain the full outer hairstyle mass even when internal detail is dark
- use manual alpha painting around ambiguous hair boundaries
- inspect at 100%, 200% and actual in-game display size

---

# 10. PORTRAIT PNG TECHNICAL CONTRACT

## 10.1 Output format

- PNG
- RGBA
- true alpha
- consistent canvas dimensions across the expression set
- transparent outer canvas
- no baked dialogue background
- no color-profile surprise that changes skin or hair in browser rendering

## 10.2 Geometry

Each character’s expression set must maintain:

- stable head scale
- stable eye-line
- stable top anchor
- stable shoulder baseline where the source permits
- consistent body width appropriate to the actual pose
- sufficient transparent safety margin above hair
- sufficient safety margin at left and right edges
- no accidental bottom clipping of the intended upper torso

## 10.3 Alpha quality

Reject a portrait when it has:

- fully transparent holes inside real hair or clothing
- semi-transparent gray contamination from the source background
- jagged edge chatter
- visible matte color unrelated to the source
- over-eroded hair
- missing anatomy
- accidental disconnected body islands

## 10.4 Edge decontamination

Edge decontamination may remove source-background color spill, but must not:

- replace dark hair with transparency
- turn skin edges gray
- create a bright outline
- create a cyan outline
- soften the silhouette into fog
- change the approved hairstyle

## 10.5 Browser rendering

Runtime CSS must remain neutral:

- `filter: none`
- `mix-blend-mode: normal`
- no glow pseudo-element
- no synthetic outline
- black portrait well may remain black

The PNG itself must be correct before Runtime styling.

---

# 11. CHARACTER JOURNAL AND EVIDENCE LOCK

Existing Character Journal entries include:

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

Ika unlock rule:

- a distant silhouette does not unlock Ika
- physical identity or lawful operational identification is required
- first meaningful verified encounter must complete
- unlock once
- notify once
- unread dot once
- opening Journal clears only Ika unread state
- Save/Load preserves read state
- Developer Unlock is silent
- no duplicate costume card

No Journal card for:

- unnamed watcher silhouette
- Aster Recovery as a person
- hotel extra
- service staff extra
- PALIMPSEST
- 18-07
- Hood Feed
- Analyst of Record
- Continuity Protocol

Every evidence item must state:

- Observation
- What it supports
- What it does not prove

---

# 12. STATE, SAVE AND MEDIA LOCK

Phase V State belongs under a dedicated Chapter IV Phase V namespace.

Preserve current implemented behavior for:

- entry from Phase IV
- Developer jump
- establishing media completion
- Phase and location cards
- undercover reveal
- false-calm sequence
- anomaly
- North marked CG
- combat
- evidence
- Ika identity threshold
- completion
- Return to Title
- Thai and English

Natural video end and Skip must enter the same State.

Restore must never:

- replay Character Added incorrectly
- duplicate evidence
- reset read state
- expose Ika early
- skip required dialogue
- trap the player in a media overlay
- leave audio running after exit

The portrait repair must not alter State or Save data.

---

# 13. AUDIO GOVERNANCE

Preserve existing audio owners.

Do not create another global audio manager.

General rules:

- one UI press per input
- evidence cue once
- puzzle cue separate
- dialogue dominant
- stop phase audio on exit
- no guilt sting merely for identity reveal
- no villain music for Elena
- no musical proof of Ika’s identity before evidence

The current portrait repair has no audio scope.

---

# 14. EVIDENCE AND FAIRNESS PHILOSOPHY

A final theory must use multiple evidence classes:

1. Physical
2. Digital
3. Procedural
4. Human
5. Decision

A valid accusation requires:

- means
- opportunity or access
- motive
- conduct before or after the event
- at least three evidence classes
- no unexplained fatal contradiction

Every major reveal must be supported by at least two earlier Chapters.

Do not rely on:

- a new fact introduced only during confrontation
- an untaught rule
- confession replacing proof
- villain lighting
- one lucky guess

---

# 15. SUSPECT FAIRNESS LOCK

Serious final candidates:

1. Elena
2. Adrian
3. Arman
4. Narin

Ika may appear as an operational candidate but has a fatal earlier-murder timeline contradiction.

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

A valid case requires corroboration such as:

- Rin
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

# 16. ENDING ARCHITECTURE

Four major endings remain:

1. TRUE CONVICTION
2. RIGHT NAME, NO CASE
3. FALSE CONVICTION
4. THE PERFECT RECORD

## TRUE CONVICTION

Requires:

- Elena accused
- Decision Ownership corroborated
- clean or repaired custody
- Rin or equivalent corroboration
- North evidence survives
- Ratchata evidence survives
- Narin deployment separated from Elena’s decisions
- at least three evidence classes
- institution accepts the case

## RIGHT NAME, NO CASE

- Elena correctly identified
- legal support fails
- historical truth is known
- murder conviction fails
- accomplice charges may survive

## FALSE CONVICTION

- institution accepts a coherent case against a culpable person
- murders are attributed to the wrong principal
- Adrian, Arman or Narin variants remain possible
- epilogue distinguishes real guilt from wrong murder attribution

## THE PERFECT RECORD

Possible conditions:

- witness lost
- North framed or officially removed
- custody destroyed
- physical and digital evidence fail to corroborate
- institution accepts engineered chronology
- player embraces a theory with a fatal contradiction

No single choice directly sets an ending.

---

# 17. FUTURE CHAPTER DIRECTION

## Chapter IV Phase VI · THE FALSE SUCCESS

- North consents
- North designs the deception
- Farid maintains decoy telemetry
- Cheryl and Maya control legal perimeter
- public record may say missing, injured or dead
- North remains alive
- choices affect public-record control and trust

## Chapter IV Phase VII · RELAY FACILITY CLIMAX

- preserve relay authorization echo
- Arman assists under conditions
- cleanup triggers
- North works through hidden channel
- capture Registrar reference `R.`
- prove watcher deployment predates Singapore trip
- Elena sends useful information slightly too early
- no obvious villain reveal

## Chapter IV Phase VIII · SHADOW OF THE TRUTH

- public record says North was removed
- North is secretly alive
- antagonist believes the record
- Benedict moves toward Bangkok
- Jakarta identifies toolmaker, broker and field operation
- Decision Owner remains unresolved
- `R.` becomes the next lead

Closing line:

> “Let her believe the record.”

## Chapter V · THE MISSING PIECE

Purpose:

- identify Kawin
- introduce Rin
- reconstruct pier event
- support Narin role
- make Elena fair but not dominant as a suspect
- add human and physical evidence

## Chapter VI · THE FINAL MOVE

Purpose:

- expose Continuity Protocol
- run controlled leak
- reconstruct authority chain
- force simultaneous priorities
- preserve competing theories

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

Final minigame:

`THE LAST RECORD`

---

# 18. NO-REGRESSION LOCK

A Phase V portrait repair must not disturb:

- Chapters I–III
- Chapter IV Phases I–IV
- Phase V story flow
- Phase V time continuity
- Phase V combat
- Character Journal gates
- Character notification timing
- unread dots
- Dialogue History
- Case File
- action-button geometry
- Developer Mode
- Save schema
- evidence
- audio owners
- backgrounds
- CGs
- videos
- Thai and English behavior

Do not restore rejected historical global hotfix patterns.

Do not add:

- global portrait observer
- polling
- document-wide mutation observer
- second dialogue engine
- global image-repair layer
- CSS filter stack intended to conceal asset defects

---

# 19. PORTRAIT REPAIR FILE-SCOPE GUIDANCE

Expected changed scope:

- `assets/images/chapter-04/phase-05/portraits/*.png`

Potentially changed only when required for cache refresh or exact asset reference:

- `js/chapters/chapter-04/05-north-is-marked.js`
- `js/engine/09-defect-hotfix.js`

CSS should not need redesign. Modify:

- `css/chapter-04-phase-05.css`

only when a proven portrait-specific CSS rule itself clips or distorts the corrected PNGs.

Do not include combat files.

Do not replace every Phase V file merely because the previous patch did.

---

# 20. PORTRAIT REPAIR TEST PLAN

## 20.1 Source audit

For every dialogue portrait:

- identify character
- identify expression index
- identify exact approved source cell
- record source dimensions
- compare full hair and upper-body boundary
- confirm whether the current PNG already lost source pixels

## 20.2 Static checks

- file exists
- PNG decodes
- RGBA mode
- expected dimensions
- transparent outer canvas
- no fully opaque rectangle
- no accidental alpha holes inside real subject regions
- no missing indexed filename
- cache query matches new asset version if changed

## 20.3 Visual checks

Inspect each portrait against:

- transparency checkerboard
- pure black `#000000`
- game navy
- mid-gray
- white

Inspect at:

- 100%
- 200%
- actual in-game scale

## 20.4 Runtime route

Test the assembled Phase V dialogue route in English and Thai.

At minimum:

1. enter Phase V through Developer Mode
2. reach every speaking character
3. cycle through every used expression
4. verify left/right placement
5. verify no head or body clipping
6. verify dark hair readability on black
7. verify no jump between expressions
8. verify Tap to Continue remains functional
9. verify Save/Menu remain unchanged
10. verify combat remains unchanged
11. return to Title and confirm audio cleanup remains unchanged

## 20.5 Mobile viewports

Test where practical:

- 320 CSS px width
- 360×800
- 390 CSS px width
- 412×915
- 430 CSS px width

Owner-device validation remains required before final acceptance.

## 20.6 Honesty lock

Never claim:

- owner-device pass
- Android pass
- iPhone pass
- live Pages pass
- complete browser regression

unless actually performed.

A contact sheet or synthetic harness does not prove that the actual dialogue UI is correct.

---

# 21. DELIVERY ACCEPTANCE RECORD

A portrait repair package may be described as a candidate only after:

- all changed portraits pass source comparison
- all changed portraits pass black-background inspection
- all required dialogue expressions render in the assembled Runtime
- no combat file changed
- no unrelated Runtime file changed
- changed-file manifest is complete
- SHA-256 is supplied
- tested and untested scope are separated

Allowed pre-owner-test language:

`PHASE V PORTRAIT REPAIR CANDIDATE`

Do not call it:

- final
- perfect
- completely fixed
- 100% solved
- owner-approved

until the owner confirms the real-device result.

---

# 22. EXACT NEXT-CHAT OPERATING INSTRUCTION

A new assistant must behave as though the owner has said:

> Continue LAST WITNESS from the current Production branch.
>
> Repository: `grolygori789-crypto/last-witness`.
>
> Branch: `production-rebuild`.
>
> Latest observed HEAD at this handoff: `7928a24622f258cfc1a6b825f9445ed246817866`.
>
> Latest observed build: `0.18.5`.
>
> Re-fetch GitHub before editing because the branch may have advanced.
>
> Read `GAME_MASTER_PLAN.md` completely before doing any work.
>
> Chapter IV Phase V is implemented.
>
> The combat sequence is correct and must not be changed.
>
> The current portrait scale is acceptable and must not be redesigned.
>
> The only known active defect is the dialogue portrait cutout quality in Chapter IV Phase V.
>
> Portrait heads and hair are clipped, parts of bodies disappear, and dark hair merges into the black background.
>
> Treat the defect as faulty source extraction and alpha preparation.
>
> Re-extract the affected PNGs from the latest owner-approved source sheets.
>
> Preserve complete heads, hairstyles, shoulders and intended upper torsos.
>
> Do not hide the defect with glow, outline, gray plates, blur, CSS masking or scaling changes.
>
> Do not alter story, Canon, combat, timing, HUD, audio, State, Save/Load, evidence, Journal, backgrounds or earlier Chapters.
>
> Test every Phase V dialogue expression in the real dialogue UI.
>
> Deliver locally as one ZIP with repository-relative paths, manifest, QA report and SHA-256.
>
> Do not write to GitHub. The owner uploads files personally.
>
> Do not claim owner-device success before the owner tests the candidate.

---

# 23. CURRENT DEFECT RECORD

## Owner report date

`2026-08-05 00:46 ICT`

## Current build under test

`0.18.5`

## Active defect

`PHASE V DIALOGUE CHARACTER CUTOUTS REMAIN SEVERELY DEFECTIVE`

## Observed failure

- clipped heads
- missing hair
- missing body regions
- dark hair lost against black
- extraction quality remains visibly poor

## Explicitly accepted / no current problem reported

- Combat
- portrait scale
- remaining observed Phase V behavior

## Repair priority

`BLOCKER · HIGHEST CURRENT PRIORITY`

## Closure condition

This defect remains open until the owner tests the repaired package on the real game and confirms that the portrait cutouts are visually correct.

---

# 24. BASELINE PRESERVATION LOCK

```text
Repository:
grolygori789-crypto/last-witness

Branch:
production-rebuild

Latest observed Production HEAD:
7928a24622f258cfc1a6b825f9445ed246817866

Latest observed Production message:
Fix Phase V portraits and time (0.18.5)

Current Runtime candidate:
0.18.5

Current implemented endpoint:
CHAPTER IV · PHASE V · NORTH IS MARKED

Last fully accepted pre-Phase-V baseline:
f4a7a1df997cddc0d2b53da23cd5c9f0b7cdba99

Pre-Phase-V baseline build:
0.17.18

Only known active defect:
CHAPTER IV PHASE V DIALOGUE PORTRAIT CUTOUTS

Accepted and locked:
COMBAT
CURRENT PORTRAIT SCALE
ALL OTHER CURRENTLY OBSERVED PHASE V BEHAVIOR
```

Re-fetch the repository before any repair. This snapshot records the handoff moment and must not be mistaken for a permanent branch pointer.

---

# 25. DOCUMENTATION-ONLY DELIVERY RECORD

This revision:

- updates the canonical branch name to the verified current branch
- records current Production candidate `0.18.5`
- records Phase V as implemented
- preserves `0.17.18` as the protected pre-Phase-V baseline
- records the owner’s latest observed result
- makes dialogue portrait extraction the only known active blocker
- locks combat against unnecessary changes
- locks current portrait scale against unnecessary changes
- defines exact portrait repair acceptance criteria
- forbids cosmetic concealment of bad cutouts
- preserves story Canon, authority, proof boundaries and ending architecture
- preserves the owner-upload workflow
- modifies no Runtime file
- modifies no asset
- writes nothing to GitHub
- makes no new Runtime-testing claim

---

# 26. PRECEDENCE RULE

For current work, use this order:

1. Section 0, Current Owner-Result Override
2. Section 2, Current Verified Production Snapshot
3. Section 8, Phase V Implemented Contract
4. Section 10, Portrait PNG Technical Contract
5. Section 18, No-Regression Lock
6. Section 20, Portrait Repair Test Plan
7. Section 22, Exact Next-Chat Operating Instruction
8. remaining Canon and architecture sections
9. historical Git commits and older planning revisions

Any older statement saying that Phase V is not implemented, that attack choreography is still unresolved, or that audio is the only missing category is historical and superseded.

---


# 27. COMPLETE RUNTIME OWNERSHIP SNAPSHOT

This section preserves the accepted `0.17.18` ownership model that remains the no-regression foundation under Phase V.

## 27.1 Static CSS order

1. `css/style.css`
2. `css/forensic-phase.css`
3. `css/medical-examiner.css`
4. `css/investigation-lifecycle.css?v=0711`
5. `css/fullscreen-display.css?v=0802`
6. `css/chapter-03-phase-04.css?v=0930`

Do not reorder shared CSS without an assembled-Runtime audit.

## 27.2 Static JavaScript ownership order

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

Do not reorder shared owners merely to repair Phase V portraits.

## 27.3 Dynamic Chapter III order

1. `js/chapters/chapter-03/01-title-phase1.js`
2. `js/chapters/chapter-03/02-changi-airport.js`
3. `js/chapters/chapter-03/03-singapore-office.js`
4. `js/chapters/chapter-03/04-marina-bay.js`
5. `js/chapters/chapter-03/05-serviced-apartment.js`
6. `js/chapters/chapter-03/06-hawker-centre.js`
7. `js/chapters/chapter-03/07-digital-forensics-lab.js`
8. `js/chapters/chapter-03/08-callback.js`

## 27.4 Chapter IV bootstrap ownership

Before Phase V, the accepted bootstrap order was:

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

The current `0.18.5` bootstrap additionally loads:

- `css/chapter-04-phase-05.css?v=0185`
- `js/chapters/chapter-04/05-north-is-marked.js?v=0185`

Re-fetch the current bootstrap before editing. The version list above records ownership, not permission to restore stale cache values.

## 27.5 Shared owner responsibilities

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

It must not be replaced by body-wide polling.

### `21-character-notification-contract.js`

Owns accepted scoped notification behavior for:

- Somchai and Kittisak
- Adrian
- Hawker pre-verification suppression
- silent Developer routes
- affected-save recovery

### `22-modal-scroll-experience.js`

Owns presentation behavior for Dialogue History and Case File scrolling. It does not own content or State.

### `04a-arman-encounter-revision.js`

Scoped owner for accepted Phase IV presentation and Arman’s late-character extension. It is not blanket permission to create parallel Character systems.

### `05-north-is-marked.js`

Scoped Phase V owner for:

- Phase V story flow
- Phase V screens
- Phase V State integration
- Phase V dialogue selection
- Phase V evidence and Ika threshold integration
- Phase V combat orchestration
- Phase V audio synchronization
- Phase V portrait asset references

A portrait repair must not expand this module’s authority.

---

# 28. STATE, SAVE, STORAGE AND ENDING PROFILE

## 28.1 Existing shared State

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

## 28.2 Ending profile

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

Cross-Chapter use requires migration review.

## 28.3 Storage

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

## 28.4 Late-chapter restore sequence

1. load modules in narrative order
2. initialize isolated defaults
3. apply migrations
4. restore snapshot
5. call the correct resume bridge
6. rebuild screen
7. rebuild audio
8. rebuild dialogue and active modal
9. rebuild Journal and Case File extensions
10. preserve completed-state behavior
11. prevent a later module from overwriting restored chapter State

## 28.5 Universal restore rule

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

A portrait-only repair must not change these contracts.

---

# 29. AUTHORITATIVE CHARACTER RESPONSIBILITY BIBLE

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

## 29.1 Benedict responsibility

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

## 29.2 North responsibility

Objective:

- produce a conclusion that survives misleading labels

Fear:

- being protected through exclusion

Blind spot:

- may privilege technical elegance over emotional cost

Writing prohibitions:

- never passive
- never helpless hostage
- no unauthorized intrusion merely because it is possible

## 29.3 Elena responsibility

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

## 29.4 Kittisak responsibility

Objective:

- build a case that survives court

Fear:

- exposing compromise before the operator is identified

Blind spot:

- delayed disclosure may look like concealment

Real secret:

- authorized a compartmentalized internal check during Chapter II

## 29.5 Somchai responsibility

Objective:

- anchor the case to rooms, vehicles and hands

Fear:

- a practical shortcut becoming evidence of betrayal

Blind spot:

- may treat a technical anomaly as paperwork

Real secret:

- rerouted a sealed transfer and failed to log an intermediate stop

## 29.6 Ratchata responsibility

Objective:

- prevent the body from being forced to agree with the record

Real secret:

- noticed an early discrepancy but initially treated it as administrative

## 29.7 Cheryl responsibility

Objective:

- build a case that survives jurisdictional challenge

Fear:

- urgency producing an inadmissible answer

Real secret:

- withheld an unresolved Adrian-linked alert until legal basis existed

## 29.8 Farid responsibility

Objective:

- preserve alternatives

Real secret:

- created a lawful air-gapped recovery mirror before watcher cleanup

## 29.9 Maya responsibility

Objective:

- expose Indonesian infrastructure use without making Indonesia the suspect

Fear:

- foreign-led contamination

Blind spot:

- may initially expect a conventional cybercrime profile

## 29.10 Adrian responsibility

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

## 29.11 Arman responsibility

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

## 29.12 Dimas responsibility

- knows workshop routines and prepared scripts
- does not know architecture, victim names or Decision Owner
- may face obstruction or false-statement charges
- no advanced technical exposition
- no Journal card

## 29.13 Daniel responsibility

- trusted Elena after a genuine prior correction
- knew links incompletely
- did not know Elena was the killer
- leaves only pre-death material

## 29.14 Kawin responsibility

- discovered 18-07 reactivation
- contacted Rin
- used Daniel as publication safeguard
- began suspecting Elena’s sequence control
- carried evidence to the pier
- identity-bearing material was removed after death

## 29.15 Rin responsibility

- created or approved the original emergency profile
- saw Elena near the pier
- saw Kawin with an evidence wallet
- saw Elena leave the service side with the wallet
- saw an unscheduled Meridian vehicle
- did not see the killing or body movement
- memory remains incomplete

## 29.16 Narin responsibility

- legitimate deployment authority
- no authority over victims or murder records
- initially believed Elena’s tasks were continuity work
- moved from belief to suspicion to knowing concealment
- real accomplice
- not victim selector

## 29.17 Ika responsibility

- receives Aster objectives
- initially believes North has stolen evidence
- objective escalates to disappearance or credible accident
- no direct Elena identity
- no earlier-murder timeline
- real violence but no Decision Ownership

---

# 30. NON-HUMAN, ROLE AND ALIAS ENTITY CANON

## PALIMPSEST

- tool family and alias
- not a person
- not autonomous mastermind
- does not choose victims
- a signed message does not identify Arman by itself
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

# 31. AUTHORITY MATRIX

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

# 32. KNOWLEDGE MATRIX

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

## End of Chapter IV Phase IV

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

## End of Chapter IV Phase V

The player may know:

- North was intentionally singled out
- a field operator acted
- Ika is visible or lawfully identifiable
- removal required a credible record
- later violence does not solve earlier murder ownership
- Decision Owner remains unresolved

No character supplies the complete answer alone.

---

# 33. EVIDENCE OWNERSHIP AND CUSTODY MATRIX

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
| Ika devices | Maya | Farid/North | Maya/Ika | later violence mistaken for earlier murders |
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

# 34. CHAPTER DUTY AND HANDOFF MATRIX

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

# 35. SUSPECT PACKAGES AND ENDING FATE MATRIX

## 35.1 Elena case

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

## 35.2 Adrian case

Real charges:

- enabling
- concealment
- obstruction
- unlawful retention

Fatal contradiction:

- no local victim selection
- no physical murder path

## 35.3 Arman case

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

## 35.4 Narin case

Real charges:

- unauthorized deployment
- tampering
- cleanup
- obstruction
- conspiracy

Fatal contradiction:

- receives priorities rather than originates them

## 35.5 Ika case

Real charges:

- surveillance
- attempted abduction or murder
- evidence destruction
- obstruction

Fatal contradiction:

- recruitment begins after the earlier murders

## 35.6 Ending fate matrix

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

# 36. COMPLETE CHAPTER CANON

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
- warning caller is Elena through a masked channel

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

Implemented through Phase V.

Phase V has one active visual blocker: dialogue portrait extraction.

## Chapter V · THE MISSING PIECE

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

Planned phases:

1. The Room Repeats
2. The Pier
3. Rescue / Preserve
4. Elena Confrontation
5. The Last Record
6. Final Accusation
7. Record or Release
8. Ending

---

# 37. CROSS-CHAPTER CLUE CONTINUITY

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

# 38. MINIGAME AND CHOICE ARCHITECTURE

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
19. Phase V coverage/reasoning interactions
20. Phase V combat exchanges

## Planned minigames

1. Decoy Telemetry Control
2. Relay Authorization Preservation
3. Victim Identity Reconstruction
4. Room/Profile Cross-Map
5. Pier Event Reconstruction
6. Controlled Leak Correlation
7. Authority Chain Reconstruction
8. Parallel Scene Prioritization
9. The Last Record

Use:

- one reasoning concept per minigame
- three to five choices per screen where practical
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
- mechanically duplicated puzzles with renamed labels

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

Show consequences, not hidden ending points.

North’s safety decisions require informed consent.

---

# 39. RELATIONSHIP AND ALLIANCE DESIGN

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
- no permanent-partner ending
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

- superior and subordinate
- professional trust
- Somchai may challenge respectfully
- Kittisak owns the final police order

---

# 40. PHASE IV IMPLEMENTED CONTRACT

Phase IV remains an implemented no-regression dependency.

Narrative:

- Surya Elektronik remains encounter site
- Dimas remains proxy
- Arman identity is physically and behaviorally corroborated
- Persona Triangulation separates knowledge, access, authorship and contradiction
- Arman admissions remain limited
- North threat remains
- Phase V location is justified

Opening sequence:

1. unobstructed vehicle approach
2. natural end or Skip reaches the same State
3. soft fade
4. dedicated Phase title card
5. Day/Location/Time card
6. automatic building entry

No `ENTER THE BUILDING` button.

Persona Triangulation categories:

- KNOWLEDGE
- ACCESS
- AUTHORSHIP
- CONTRADICTION

Correct conclusion:

`CONTROLLED PROXY`

Phase IV consequence choices preserve meaningful dimensions for:

- Dimas treatment
- Arman status
- cache handling
- North response

The route that uses North without full consent has consequences and is never celebrated.

---

# 41. BUILD HISTORY AND ENGINEERING LESSONS

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

### `0.17.0–0.17.18`

- Phase IV implementation and repair chain
- direct handoff
- Runtime recovery
- Arman Journal
- notification contract
- modal scrolling
- action geometry
- Secure Mirror containment
- Phase IV minigame centering

### Rejected `0.17.5`

- global Character wrapping broke Chapter I
- never use as stable baseline

### `0.18.0`

- Phase V initial implementation

### `0.18.1`

- Phase V visual and continuity repair

### `0.18.2`

- Phase V presentation repair

### `0.18.3`

- Phase V HUD and combat repair

### `0.18.4`

- Phase V portrait and combat-direction repair

### `0.18.5`

- Phase V portrait and time repair
- owner still reports unacceptable dialogue cutouts

## Engineering lessons

- synthetic DOM checks are not full Runtime tests
- alpha statistics are not visual acceptance
- late-character bugs must not be solved globally
- active screen may outrank stale chapter State
- registry, persistence and UI are one contract
- the owner must not be the first tester of a claimed blocker-free build
- dark hair cannot be safely extracted by naive black-background thresholding
- a transparent border does not prove that the subject was preserved
- “45/45 RGBA PNG” does not prove that heads and bodies are intact

---

# 42. ACCEPTED LIMITATIONS AND TECHNICAL DEBT

Current known active blocker:

- Chapter IV Phase V dialogue portrait cutouts remain unacceptable in `0.18.5`

Other standing limitations:

- iPhone Safari not owner-tested
- iOS Add to Home Screen not owner-tested
- backgrounding may exit fullscreen
- legacy global build label may differ
- Chapter I intro may still say `HOTEL 1807`
- some CSS headers/cache queries are historical
- broad Phase I–II language audit remains unresolved
- Somchai role may remain generic in Runtime Journal
- Kittisak Inspector function may not display everywhere
- cross-Chapter ending profile remains future implementation
- no undiscovered-bug guarantee

Resolved historical issues include:

- vehicle overlay
- manual building button
- missing Phase IV HUD
- non-gold progress
- rejected darkening
- Maya white edge in earlier scope
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
- Phase V HUD and combat layout defects
- Phase V time continuity corrected to 14:30 WIB

A resolved historical issue may be reopened only when the owner reproduces it in the current build.

---

# 43. FULL DELIVERY AND REGRESSION REQUIREMENTS

## Static

- JavaScript syntax
- CSS parsing
- HTML validity where practical
- asset paths
- media references
- image dimensions
- alpha integrity
- duplicate IDs
- cache queries
- changed-file scope
- exact build labels

## Full assembled smoke

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
- silent Developer unlock
- Maya and Arman profile switching
- Ika threshold
- Thai and English
- Save/Load

## Phase V portrait regression

- all five characters
- all eight dialogue expressions per character
- black-background inspection
- checkerboard inspection
- actual dialogue UI inspection
- current scale preserved
- no head loss
- no body loss
- no hair loss
- no gray contamination
- no outline or glow

## Reporting honesty

Separate:

- static checks
- image-structure checks
- visual contact-sheet checks
- synthetic browser checks
- assembled Runtime checks
- owner-device checks
- untested behavior

Never call one category another.

---

# 44. FULL-MERGE PRESERVATION RECORD

This revision preserves the binding substance of the previous full-merge canonical plan, including:

- accepted `0.17.18` Runtime ownership
- load-order protection
- State, Save and storage contracts
- complete owner-secret Canon
- Character responsibilities
- authority boundaries
- knowledge boundaries
- evidence custody
- suspect packages
- ending fate logic
- chapter structure and future direction
- clue continuity
- minigame philosophy
- relationship rules
- build history and engineering lessons
- technical-debt honesty
- testing and delivery rules
- owner-upload workflow
- Phase V visual identity
- two-clip and motion-comic historical contracts where still relevant
- North’s agency
- Ika’s fatal earlier-murder timeline contradiction

It updates the status layer to reflect that Phase V is now implemented through `0.18.5` and that the only currently reported blocker is the Phase V dialogue portrait cutout quality.

No historical “Phase V not implemented” statement has authority over the current owner-result override.

---

# 45. FINAL CURRENT-STATE HANDOFF

```text
LAST WITNESS

SOURCE OF TRUTH:
GAME_MASTER_PLAN.md

REPOSITORY:
grolygori789-crypto/last-witness

BRANCH:
production-rebuild

LATEST OBSERVED HEAD:
7928a24622f258cfc1a6b825f9445ed246817866

LATEST OBSERVED BUILD:
0.18.5

CURRENT IMPLEMENTED ENDPOINT:
CHAPTER IV · PHASE V · NORTH IS MARKED

OWNER-ACCEPTED:
COMBAT
CURRENT DIALOGUE PORTRAIT SCALE
ALL OTHER CURRENTLY OBSERVED PHASE V BEHAVIOR

ONLY KNOWN ACTIVE BLOCKER:
PHASE V DIALOGUE PORTRAIT CUTOUTS

VISIBLE FAILURES:
HEADS CLIPPED
BODY REGIONS MISSING
DARK HAIR LOST AGAINST BLACK
GRAY SOURCE CONTAMINATION / POOR ALPHA EDGES

REPAIR OWNER:
PORTRAIT SOURCE EXTRACTION AND TRUE-ALPHA PREPARATION

DO NOT TOUCH:
COMBAT
STORY
CANON
TIMING
HUD
AUDIO
STATE
SAVE/LOAD
EVIDENCE
JOURNAL
BACKGROUNDS
VIDEOS
EARLIER CHAPTERS

DELIVERY:
LOCAL ZIP ONLY
OWNER UPLOADS GITHUB
NO SUCCESS CLAIM BEFORE OWNER TEST
```

---

# END OF MASTER PLAN
