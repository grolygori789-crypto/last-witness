# LAST WITNESS — GAME MASTER PLAN

> **MASTER REFERENCE / SOURCE OF TRUTH**
>
> เอกสารฉบับนี้รวมข้อมูล Production, Canon, Gameplay, Character, Audio, UI, Save/Load, Chapter III Blueprint และกฎการพัฒนาที่ได้รับการยืนยันล่าสุดจากเจ้าของโปรเจกต์
>
> ก่อนแก้โค้ดทุกครั้ง ต้องตรวจ GitHub branch ปัจจุบันและไฟล์จริงใน Repository เสมอ  
> GitHub เป็น Source of Truth สำหรับโค้ดและ Asset ที่ใช้งานจริง  
> ข้อมูลที่ระบุว่า `CONFIRMED BY OWNER` ในเอกสารนี้คือ Canon ด้านเนื้อเรื่องและการออกแบบล่าสุด

---

# 1. PROJECT IDENTITY

## Game Title
**LAST WITNESS**

## Studio / Brand
**BENEDICT INTERACTIVE**

## Tagline
**The dead don't talk. Evidence does.**

ภาษาไทย:

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
- Mobile-first
- Portrait orientation
- Primary layout target: 9:16
- Important UI must remain accessible when the mobile browser address bar is visible

## Core Tone
- Crime mystery
- Noir-inspired atmosphere
- Serious investigation mixed with restrained dry humour
- Intelligent, professional characters
- Evidence must support every conclusion
- No careless accusation before evidence supports it
- Singapore scenes must remain part of the investigation, not become tourism sequences

## Core Narrative Principle

The game repeatedly separates:

1. What physically happened
2. What official records claim happened
3. Who had permission to alter those records
4. Who actually used that permission

> **A valid credential proves access, not identity.**

A valid credential proves that the system permitted access. It does not prove who actually used that permission.

---

# 2. REPOSITORY AND PRODUCTION RULES

## Repository
`grolygori789-crypto/last-witness`

## Production Branch
`restore-game-recovered`

## Live Game
`https://grolygori789-crypto.github.io/last-witness/`

## Primary Planning File
`GAME_MASTER_PLAN.md`

## Source-of-Truth Rules
- GitHub is the Source of Truth for code and files used by the game.
- Never patch from memory, an old ZIP, or a previous chat attachment.
- Always fetch the latest files from `restore-game-recovered`.
- Story Canon confirmed by the owner must be preserved in this Master Plan.
- When runtime code conflicts with the plan, inspect both before deciding whether the code or plan is outdated.

## Mandatory Procedure Before Any Code Change
1. Inspect the latest `restore-game-recovered` branch.
2. Read `GAME_MASTER_PLAN.md`.
3. Inspect `index.html`.
4. Confirm CSS, JavaScript, Audio and module load order.
5. Inspect every file related to the reported defect.
6. Check for overlapping listeners, observers, timers, audio overrides, state repairs and legacy systems.
7. Explain the verified root cause before changing code.
8. Patch the fewest files necessary while fixing the real cause.
9. Test the exact reported runtime flow, not syntax alone.
10. Report honestly what was tested and what was not.
11. Deliver modified files as a ZIP only.

## Prohibited Actions
- Do not create a branch.
- Do not push or modify GitHub directly.
- Do not modify GitHub Pages directly.
- Do not delete files or restructure the repository without owner approval.
- Do not add a new hotfix, observer, polling loop or audio controller merely to override an unresolved legacy conflict.
- Do not claim a defect is fixed 100% before the owner tests it on the real device.
- Do not claim mobile or audio testing unless it was actually performed.
- The owner uploads files to GitHub personally.

---

# 3. CURRENT PRODUCTION STATUS

## Current Patch Under Test
**Last Witness Core Audio & State Fix 0.5.5**

Status:

`WAITING FOR OWNER DEVICE TEST AFTER SITE DATA CLEAR`

Do not assume patch 0.5.5 is successful until the owner confirms the result from the real device.

## Defects Reported Before 0.5.5
1. UI click sound missing
2. Add to Case File sound missing
3. Victim Apartment ambience unsuitable
4. Café ambience leaking before Victim Apartment ends
5. Medical Examiner hotspots starting green due to stale state
6. Toxicology scanner beep too loud
7. Ratchata Character Journal image loading inconsistently

## Current Priority
1. Receive the owner's 0.5.5 test result
2. Reinspect the latest GitHub branch before any further patch
3. Stabilize Chapters I and II
4. Preserve Save/Load compatibility
5. Replace the Chapter III WIP transition with the approved Chapter III implementation
6. Build Chapter III only after its Blueprint and required Assets are confirmed

---

# 4. CHAPTER TITLE GOVERNANCE

## Current Chapter Titles

### Chapter I
**ROOM 1807**  
Status: `CANON`

### Chapter II
**THE PERFECT STRANGER**  
Status: `WORKING TITLE CURRENTLY USED`

### Chapter III
**THE BORROWED MINUTES**  
Thai: **สิบเอ็ดนาทีที่ถูกยืม**  
Status: `CONFIRMED CHAPTER III CANON PLAN / ACTIVE IMPLEMENTATION TITLE`

### Longer-Term Working Title Pool
The owner has also proposed the following working titles for later chapters:

- **BROKEN ALIBI**
- **THE MISSING PIECE**
- **SHADOW OF THE TRUTH**
- **THE FINAL MOVE**
- **LAST WITNESS**

These titles remain working titles until their final chapter numbers are explicitly locked by the owner.

## Title Conflict Rule
An earlier proposed list assigned `BROKEN ALIBI` to Chapter III. However, Chapter III planning and active development already use `THE BORROWED MINUTES`.

Until the owner explicitly orders a rename across code, UI, documentation and assets:

- Chapter III remains **THE BORROWED MINUTES**
- `BROKEN ALIBI` remains available for a later chapter
- Do not silently rename Chapter III
- Do not silently renumber the remaining working titles

## Chapter II Case Name
Chapter II may end with the investigative case label:

**THE ELEVEN-MINUTE LIE**

This is a case/ending label, not the current Chapter II title.

---

# 5. MAIN CHARACTERS

## Benedict

### Identity
- Age: 42
- Role: Detective
- Status: Lead Investigator
- Player-facing protagonist

### Personality
- Calm
- Observant
- Uses natural humour under pressure
- Playful without becoming a clown
- Notices human contradictions
- Does not accuse without evidence

### Narrative Function
- Main protagonist
- Questions witnesses and suspects
- Makes the major player-facing decisions
- Connects technical evidence to motive, opportunity and the real operator
- Must remain essential even when North leads technical analysis

### Player Approaches
- Warm
- Observant
- Direct

Choices may affect:
- Dialogue
- Relationships
- Character reactions
- Investigation tone
- Chapter III opening route acknowledgement

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
- Neither character should solve everything alone

### Chapter III Role
- Discovers the Singapore endpoint
- Leads system analysis
- Explains Authentication versus Attribution
- Works closely with Farid
- Tests Adrian's statements against the logs
- Leads technical work during the lab climax

### Balance Rule
North leads technical interpretation. Benedict remains the protagonist and final decision-maker.

---

## Elena

### Public Identity
- Role: Forensic Analyst
- Status: Intelligent and trusted professional collaborator
- Calm, precise and technically capable
- Provides real information
- Appears professional and credible

### Owner-Level Secret
`CONFIRMED BY OWNER — DO NOT REVEAL IN CHAPTER III`

Elena is the mastermind and the real killer.

### Long-Term Writing Rules
- Do not reveal this in Chapter III.
- Do not use obvious villain dialogue.
- Do not use villain lighting, facial expressions or suspicious staging.
- Do not make her suddenly evasive in a theatrical way.
- Elena gives true information but controls which truth arrives, when it arrives and in what order.
- Clues must feel fair in retrospect.
- Clues must remain subtle enough that Chapter III does not expose her easily.
- Elena is likely to remain in Thailand and assist remotely.
- She does not need to travel to Singapore with Benedict and North.
- Her late-Chapter-III contact may be factually correct while strategically timed.

---

## Adrian Tan Wei Ming

### Identity
- Singaporean Chinese man
- Age: approximately 43–47
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
- Distrusts both police and the system he helped build
- Appears to know more than he says
- Must not be written as cowardly or cartoonishly evil

### Approved Visual Direction
- Middle-aged Asian man
- Grey shirt
- Dark blazer or coat
- Senior technical expert appearance
- Visible stress and lack of sleep
- Approved Character Sheet: 12 expressions

### Story Function
- Met at a Hawker Centre
- Understands the Reconciliation Window
- Explains Signed Local Events
- May possess an Encrypted Drive or Architecture Document
- Can appear to be a major suspect
- Later evidence shows he is fleeing the person controlling the system

### Guilt Boundary
Adrian may be guilty of:
- Concealment
- Failure to report
- Enabling the system
- Fleeing
- Other complicity supported by evidence

He did not design the complete murder plan and is not the mastermind.

---

## Inspector Cheryl Goh

### Identity
- Singaporean Chinese woman
- Age: approximately 38–42
- Singapore Police Force Liaison
- Cross-border case coordinator

### Personality
- Sharp
- Emotionally controlled
- Authoritative
- Skeptical
- Rejects unsupported conclusions
- Not impressed by Benedict's reputation or charm alone
- Develops respect for North after seeing her technical ability
- Must not become a flat obstructive officer or villain

### Approved Visual Direction
- Asian woman around 40
- Pixie cut
- Navy or dark-blue clothing
- SPF badge
- Professional authority
- Approved Character Sheet: 12 expressions

### Story Function
- Meets the team at Singapore Investigation Office
- Questions why a Thai case reaches Singapore infrastructure
- Restricts access initially
- Opens access to the Digital Forensics Lab or Secure Server Facility after sufficient evidence
- May become an important ally in later chapters

---

## Farid Rahman

### Identity
- Singaporean Malay man
- Age: approximately 29–34
- Digital Forensics Specialist
- Not Indian

### Personality
- Friendly
- Fast-working
- Speaks quickly when excited by data
- Highly capable in digital forensics
- Uses restrained jokes about systems, technology and logging
- Respects North as a specialist
- Must not become the team's comic relief

### Relationship Boundary
- No romance with North

### Approved Visual Direction
- Singaporean Malay man
- Olive jacket
- Dark T-shirt
- SPF badge
- Tablet
- Coffee may appear in some expressions
- Approved Character Sheet: 16 expressions

### Story Function
- Works with North on logs
- Demonstrates two different logs that are both valid under system rules
- Explains Offline Signature Token
- Investigates the Singapore node and Temporary Credential 18-07
- Plays an important role in the Digital Forensics Lab climax

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
- Establishes time of death independently
- Supports the conclusion that chronology was engineered

### Character Journal Rule
Display name must be:

**Ratchata (Dr. Singh)**

Use a verified existing file from:
`assets/images/ratchata/`

Preferred stable candidates:
- `profile.png`
- `neutral.png`

The actual path must be confirmed in the latest GitHub branch before use.

---

# 6. CHARACTER JOURNAL RULES

- Chapter I has no Characters menu.
- At the start of Chapter II, while the first North conversation is still running, the Characters menu remains hidden.
- After the Detective Office conversation with North ends, unlock Characters.
- Menu order: Case File → Characters → Settings.
- A red dot appears only when a genuinely new character entry exists.
- The red dot clears when the new entry is opened.
- Character Cards show an average percentage.
- Character detail screens include multiple metrics, such as:
  - Trust
  - Respect
  - Affection
  - Suspicion
- Characters unlock only after proper introduction.
- Save/Load must preserve unlock and unread status.
- Ratchata's image must load consistently.

---

# 7. CHAPTER I — ROOM 1807

Status: `COMPLETE AND PLAYABLE`

## Main Location
Grandview Hotel — Room 1807

## Core Story
North contacts Benedict about a possible homicide in Room 1807.

The room is staged. Physical evidence, digital traces and victim behaviour do not form one natural sequence.

## Main Evidence
1. Victim's Phone
2. Blood Pattern / Blood-stained Evidence
3. Cleared Laptop
4. Half-packed Suitcase

## Phone Evidence
- Warning: “You shouldn't have come here.”
- Three missed calls from `R.`
- Recovered note: “Meet at the pier. 11pm.”

## Main Deduction
- Body moved
- Scene reconstructed
- Laptop history deliberately cleared
- Victim intended to leave
- Phone placed where investigators would find it
- Warning may be intended for Benedict and North

## Ending
Unknown caller:

**“You looked in the wrong room.”**

## Long-Term Mystery
- `R.` is not confirmed as Ratchata
- `R.` may be routed through Singapore
- `R.` may connect to an intermediary identity such as `Registrar`
- Do not reveal the identity of `R.` too early

---

# 8. CHAPTER II — THE PERFECT STRANGER

Status: `COMPLETE IN CURRENT STORY STRUCTURE`

## Case Ending Label
**THE ELEVEN-MINUTE LIE**

Thai:

**คำลวงสิบเอ็ดนาที**

## Central Mystery
Daniel Voss is officially discovered at 06:20.

Verified sequence:
- 05:47 — Temporary Credential 18-07 enters Daniel's building
- 05:51 — Daniel's Orchid Café draft is edited
- 05:58 — Original toxicology sample is collected
- 06:09 — `COLLECTION_TIME` is revised by eleven minutes
- 06:17 — Laboratory accession record is created
- 06:20 — Daniel is officially reported discovered

## Proven Chapter II Conclusions
- Toxicology result is genuine
- Physical sample remains genuine
- Raw scientific data remains valid
- Chronology and administrative metadata were manipulated
- A valid credential was used
- Trusted machine attribution was exploited
- The operator's identity remains unproven
- Daniel was investigating similar anomalies in older cases
- Hotel 1807 remains connected to the larger system

## Phase Structure
1. Detective Office
2. Victim's Apartment
3. Orchid Café
4. Police Station — Evidence Division
5. Forensic Science Unit
6. Medical Examiner
7. Chapter II Ending

## Chapter II Ending Requirements
Display two buttons:
- `CONTINUE TO CHAPTER III`
- `RETURN TO TITLE`

When Continue is selected:
1. Stop Chapter II audio
2. Open Chapter III Intro
3. Show `THE BORROWED MINUTES`
4. Show Day / Location / Time card
5. Start Chapter III Phase I at the Detective Office in Bangkok

---

# 9. CHAPTER III — THE BORROWED MINUTES

Thai:

**สิบเอ็ดนาทีที่ถูกยืม**

Status: `COMPLETE CANON PLAN — NOT YET FULLY IMPLEMENTED`

## Entry Routes
- `chapter3_timeline`
- `chapter3_old_cases`
- `chapter3_access`

Each route:
- Uses a slightly different opening
- Provides a different starting lead or evidence emphasis
- Acknowledges the player's Chapter II choice
- Converges into one shared Chapter III story
- Must not become a completely separate full campaign

## Central Mechanism: Reconciliation Window

Singapore is the Infrastructure Nexus of a system capable of attaching real evidence to a false official chronology.

System behaviour:
- Offline or delayed devices can submit Signed Local Events later.
- Events received within an 11-minute Reconciliation Window are accepted.
- Accepted events are ordered by Device Timestamp.
- Events arriving outside the window are flagged for review.
- The attacker exploits this rule to place genuine evidence inside an engineered timeline.

## Identity Principle
A valid credential proves access, not identity.

Authentication proves the credential was accepted. Attribution asks who actually used it.

## Meaning of 1807
`1807` may be more than a hotel room number.

Possible roles:
- Operational Identity
- Credential Route
- Temporary Access Profile
- System namespace or routing label

Temporary Credential `18-07` is connected to the Singapore node.

---

# 10. CHAPTER III PHASE BLUEPRINT

## PHASE 1 — BANGKOK / DETECTIVE OFFICE

### Route-Based Opening
Each saved route changes:
- Opening dialogue
- Initial focus
- First evidence emphasis

All routes then converge.

### Core Events
- North identifies the Singapore endpoint.
- Daniel has a booking to Singapore.
- No passenger check-in record exists.
- Temporary Credential 18-07 was used through a Singapore node.
- Timeline Reconstruction Minigame begins.
- Team concludes Daniel never boarded the plane.
- His Access Trail travelled to Singapore.
- Benedict and North decide to travel.

### Character Balance
- North leads technical discovery.
- Benedict evaluates implications and makes the decision to proceed.

---

## PHASE 2 — PLANE TRANSITION

- Use plane or travel background.
- Use Day / Time / Location card.
- Keep Benedict and North dialogue brief.
- Use this phase only to shift rhythm and location.
- Do not turn it into a long exposition scene.

---

## PHASE 3 — CHANGI AIRPORT

### Environment
Arrival / Operations Corridor

### Investigation
- Booking Record
- Missing Passenger Record
- Airport CCTV
- Travel permissions or documents exist
- Daniel himself does not appear
- Temporary Credential or Access Route may appear under `18-07`

### Tone
Operational, controlled and investigative. Not tourism.

---

## PHASE 4 — SINGAPORE INVESTIGATION OFFICE

### Introductions
- Inspector Cheryl Goh
- Farid Rahman

### Story
- Cheryl questions the Thai case's connection to Singapore infrastructure.
- Cheryl limits access at first.
- Farid works with North.
- Team discovers the Reconciliation Window.
- A Dual Log Comparison may begin here.
- A Safe Code puzzle should appear here only if it serves the evidence flow better than the Safehouse phase.

---

## PHASE 5 — MARINA BAY

### Function
- Investigation transition
- Surveillance sequence
- Contact setup
- Possible indication the team is being followed
- Possible signal from Adrian

### Tone Rule
- Noir crime atmosphere
- No travel montage
- No sightseeing dialogue without investigative purpose

---

## PHASE 6 — SERVICED APARTMENT / SAFEHOUSE

### Evidence
- Burner Phone
- Architecture Document
- Encrypted Drive
- Fragmented Data

### Possible Minigame
Safe Code / Credential Unlock

The answer must come from evidence already discovered. It must not be a random number puzzle.

---

## PHASE 7 — HAWKER CENTRE

### Adrian Meeting
- Public, real and populated environment
- Tense despite the crowd
- Adrian chose the location because of cameras and witnesses
- Adrian reveals only part of the system
- Benedict chooses how to approach him
- North checks his claims against the logs

### Writing Rule
Adrian must not dump the entire plot in one conversation.

---

## PHASE 8 — DIGITAL FORENSICS LAB / SECURE SERVER FACILITY

### Chapter Climax
- Team accesses the Raw Reconciliation Record.
- An 11-minute countdown or operational time pressure begins.
- Delayed Signed Events become central.
- Player proves that two conflicting logs can both pass validation.
- The method is revealed.
- The mastermind is not revealed.

### Character Roles
- North leads system analysis.
- Farid supports forensic reconstruction.
- Cheryl provides authority and access.
- Adrian may help remotely or participate in a limited capacity.
- Benedict connects the method to motive, operator behaviour and the larger investigation.

---

## PHASE 9 — CHAPTER END / RETURN TRANSITION

### Proven Conclusions
- Singapore is an Infrastructure Route.
- The system can validate conflicting chronologies.
- The evidence can be real while its sequence is false.
- Credential validity does not establish operator identity.
- Adrian knows the system but is not proven to be the mastermind.

### Elena
Elena may contact the team from Thailand.

Her information:
- Is true
- Is useful
- Arrives at a strategically selected moment
- Must not expose her as the mastermind

### Ending Question
Who chose which event would be recorded, and which event would be forgotten?

### Chapter IV Setup
Open the next chapter without permanently assigning its final title unless the owner has locked it.

---

# 11. CHAPTER III MINIGAMES

## 1. Timeline Reconstruction

### Phase
Chapter III Phase I

### Format
- Six events
- Tap-first
- Drag may be optional but not required
- Reset button
- No permanent fail
- No softlock
- Target duration: 30–60 seconds

### Correct Order
1. 05:47 — Temporary Credential 18-07 enters Daniel's building
2. 05:51 — Daniel's Orchid Café draft is edited
3. 05:58 — Original toxicology sample is collected
4. 06:09 — `COLLECTION_TIME` is revised by eleven minutes
5. 06:17 — Laboratory accession record is created
6. 06:20 — Daniel is officially reported discovered

---

## 2. Safe Code / Credential Unlock

### Phase
Serviced Apartment / Safehouse

### Rules
- Connected to Temporary Credential 18-07
- Evidence-derived answer
- No arbitrary combination
- Mobile-friendly
- No permanent fail

---

## 3. Dual Log Comparison

### Goal
Compare two log versions that both validate.

### Fields
- Timestamp
- Signature
- Device
- Sync Route

### Learning Outcome
The player understands how two conflicting records can both be valid under the system's rules.

---

## 4. Fragment Reconstruction

Status: `OPTIONAL`

Possible sources:
- Architecture Document
- Deleted Message
- Encrypted Drive

Only include this minigame if it advances the story or deduction. Do not include it merely to extend playtime.

---

## Global Minigame Standards
- Mobile-friendly
- 30–60 seconds
- Tap option
- No permanent fail
- No softlock
- Reset or recovery path
- Puzzle-success cue must be separate from Add to Case File
- Noir-tech audio tone
- Puzzle completion and Evidence collection are separate events

---

# 12. CHAPTER III EVIDENCE PLAN

Possible evidence:
- Daniel's Singapore travel or boarding record
- Airport CCTV still
- Temporary Credential 18-07
- Burner phone
- Two valid versions of the same log
- Old system architecture document
- Offline signature token
- Network module
- Archived old case file
- Raw reconciliation record
- Adrian's encrypted drive

## Evidence Rules
- Do not overproduce assets before the Blueprint is complete.
- Every evidence item must advance the investigation.
- Every evidence item must support a player conclusion.
- No decorative evidence without investigative value.
- Evidence names in UI, Case File and dialogue must remain consistent.
- Evidence SFX plays only at collection, not puzzle completion.

---

# 13. VISUAL AND BACKGROUND PLAN

## Background Size
`864 × 1536`

## Orientation
Portrait 9:16

## Style
- Noir graphic novel
- Cel-shaded
- Heavy ink lines
- Angular shadows
- Cinematic crime-adventure
- Bright enough for mobile viewing

## Approved Chapter III Backgrounds
1. Singapore Detective / Investigation Office
2. Changi Airport — Arrival / Operations Corridor
3. Marina Bay
4. Plane Flying
5. Serviced Apartment / Safehouse
6. Hawker Centre
7. Digital Forensics Lab / Secure Server Facility Hybrid

## Image Rules
- No embedded UI unless explicitly required.
- No chapter title embedded into a background.
- Use the clean Changi version without Chapter UI.
- Inspect signs and labels for pseudo-text.
- Exact Match or No Text.
- Remove text when exact rendering cannot be guaranteed.
- Do not accept malformed English or unreadable signage.

---

# 14. CHARACTER SHEET PROCESSING

Approved sheets:
- Adrian: 12 expressions
- Cheryl: 12 expressions
- Farid: 16 expressions

## Required Processing
1. Crop every expression separately.
2. Remove the background into true transparent alpha.
3. Inspect hair, clothing, ears and face edges.
4. Use one consistent canvas size.
5. Use one consistent anchor position.
6. Preserve consistent head size and camera distance.
7. Use clear emotion-based filenames.
8. Test portraits against the dark Dialogue UI.
9. Confirm no white, black or checkerboard background remains.
10. Preserve identity across every expression.

## Prohibition
Never use the entire Character Sheet as a dialogue portrait.

---

# 15. AUDIO SYSTEM

## Global Channels
- Music
- Ambience
- SFX

## Mixing Principles
- Dialogue must remain easy to read and follow.
- Ambience establishes location without tiring the player.
- Music supports mood without remaining at full intensity.
- Duck music and ambience gently during dialogue where appropriate.
- Avoid abrupt loop cuts unless the story or scene transition requires one.
- Evidence SFX must stop immediately when leaving a scene.
- Puzzle Success and Add to Case File must use different cues.

## UI Click
- Real mouse click sound
- Trigger on `pointerdown`
- One press equals one playback
- Must work on:
  - Splash / first screen
  - Title menu
  - Main buttons
  - Tap to Continue
- Low, controlled volume
- Must not sound like a synthetic tick

## Add to Case File
- Play once
- One shared standard across all evidence scenes
- Required in:
  - Room 1807
  - Victim Apartment
  - Police Station
  - Forensic
  - Medical Examiner
  - Chapter III evidence scenes
- No overlap
- No second tail sound
- Stop immediately on scene transition

## Existing Location Rules

### Room 1807
- Room ambience without prominent sirens

### Victim Apartment
- Soft noir score
- Must not reuse unsuitable Room 1807 ambience
- Café ambience must not leak in early

### Forensic
- No sharp whine or fatiguing frequency

### Medical Examiner
- Low refrigeration / room ambience
- Toxicology scanner beep soft but audible

## Chapter III Music File
`assets/audio/chapter-03/modern-noir.mp3`

Preserve this path when used by the main runtime.

## Chapter III Required Audio
- Detective Office ambience / score
- Plane transition ambience
- Changi airport ambience
- Singapore Investigation Office room tone
- Marina Bay city ambience
- Serviced Apartment interior ambience
- Hawker Centre ambience
- Digital Forensics Lab ambience
- Puzzle success cue
- Evidence Add to Case File cue
- UI click

---

# 16. UI AND INTERACTION RULES

## Dialogue
- One tap advances one line.
- Response must feel immediate.
- No accidental double advance.
- Speaker name, portrait, emotion and dialogue must match.
- Portrait side and alignment remain consistent.
- Tap-to-continue text stays short.
- Must work on narrow mobile layouts.

## Hotspots
Before inspection:
- Yellow

After inspection or collection:
- Green

Hotspots must not:
- Start green due to stale state
- Remain yellow after confirmed completion
- Trigger duplicated sounds
- Depend on unrelated actions to update

## Evidence Panels
Required flow:
1. Open
2. Inspect
3. Reveal detail
4. Add to Case File
5. Close

## Day / Time / Location Cards
Use only for meaningful transitions:
- Chapter III opening
- Bangkok to Singapore travel
- Major time or location shift

Do not overuse them between minor beats.

---

# 17. SAVE / LOAD CONTINUITY

Save/Load must preserve:
- Current chapter
- Current phase
- Current screen
- Dialogue position where supported
- Evidence collected
- Evidence inspection state
- Hotspot state
- Dialogue choices
- Personality values
- Character unlocks
- Character unread state
- Relationship values
- Chapter II completion
- Chapter III route
- Chapter III phase
- Minigame completion
- Puzzle state where safe
- Current location
- Audio lifecycle should be reconstructed correctly, not blindly resumed from stale state

## Chapter III Entry
The route selected at the Medical Examiner must survive:
- Chapter II ending
- Continue to Chapter III
- Reload
- Manual save
- Auto-save
- Return to title and Continue

---

# 18. CHAPTER III DEVELOPMENT RULES

- Always inspect the latest GitHub branch.
- Do not develop from memory alone.
- Preserve all three routes.
- Preserve Elena's secret twist.
- Adrian is not the mastermind.
- Benedict remains protagonist.
- North receives a stronger but balanced role.
- Cheryl and Farid must sound distinctly different.
- Farid has no romantic storyline with North.
- Singapore is part of the case, not tourism.
- Every location change needs a story reason.
- Use Day / Time cards only for major transitions.
- Calculate every timestamp carefully.
- Do not contradict the 11-minute mechanism.
- Preserve Save/Load compatibility.
- Test mobile portrait 9:16.
- Keep critical UI clear of the browser address bar.
- Build the Blueprint before overproducing assets.
- Do not reveal `R.` prematurely.
- Do not expose Elena through villain coding.

---

# 19. TESTING AND DELIVERY RULES

## Runtime Testing
For every patch, test the exact affected flow:
- Entry into scene
- Dialogue progression
- Evidence interaction
- Audio source
- Playback count
- Scene transition
- Save state
- Reload state
- Exit to title where relevant

## Syntax Testing
- HTML validity checks where practical
- JavaScript syntax
- Module imports
- CSS parse issues
- Relative file paths
- Missing assets

## Honesty Rule
Never claim:
- Mobile testing
- Audio listening
- Device testing
- Browser compatibility
- Full regression coverage
- 100% success

unless actually performed.

## Delivery
- Modify files locally only.
- Create one ZIP.
- List every file the owner must upload.
- State exactly what was tested.
- State exactly what was not tested.
- The owner performs the GitHub upload.

---

# 20. CURRENT CANON SUMMARY

## Confirmed
- Game title: LAST WITNESS
- Studio: BENEDICT INTERACTIVE
- Chapter I: ROOM 1807
- Chapter II current working title: THE PERFECT STRANGER
- Chapter II case ending label: THE ELEVEN-MINUTE LIE
- Chapter III: THE BORROWED MINUTES
- Chapter III Thai title: สิบเอ็ดนาทีที่ถูกยืม
- Room 1807 was staged
- Daniel Voss investigated Hotel 1807 and linked entities
- Toxicology result is genuine
- Administrative chronology was altered
- Collection time changed from 05:58 to 06:09
- Laboratory accession occurred at 06:17
- Official discovery occurred at 06:20
- Singapore is an Infrastructure Nexus / Route
- Reconciliation Window is 11 minutes
- Temporary Credential 18-07 links to the Singapore node
- A valid credential proves access, not identity
- Chapter III has three converging routes
- North discovers the Singapore endpoint
- Elena is the mastermind and real killer
- Elena remains unrevealed in Chapter III
- Adrian Tan is a complicit insider and fugitive, not the mastermind
- Cheryl Goh is an SPF liaison
- Farid Rahman is a Singaporean Malay digital forensics specialist
- Farid has no romance with North
- Ratchata Journal name is Ratchata (Dr. Singh)

## Intentionally Unresolved for the Player
- Identity of `R.`
- Identity behind the Chapter I warning
- Purpose of the pier meeting
- Full operational meaning of `1807`
- Exact identity of the credential operator in each event
- How Elena selected and timed each truth
- Final ending of the complete game

## Working Titles Not Yet Number-Locked
- BROKEN ALIBI
- THE MISSING PIECE
- SHADOW OF THE TRUTH
- THE FINAL MOVE
- LAST WITNESS

---

# 21. CANON STATUS LABELS

Use:
- `CONFIRMED IN GAME`
- `CONFIRMED BY OWNER`
- `PLANNED`
- `PROPOSED`
- `UNRESOLVED`
- `DEPRECATED`
- `DO NOT USE`

Never silently convert a proposal into Canon.

---

# 22. NEW CHAT CONTINUATION INSTRUCTION

Use this at the beginning of a future project chat:

> Continue the LAST WITNESS project.  
> Repository: `grolygori789-crypto/last-witness`  
> Production branch: `restore-game-recovered`  
> Read `GAME_MASTER_PLAN.md` and inspect the latest GitHub files before proposing or applying changes.  
> GitHub is the Source of Truth for runtime files.  
> Preserve the Chapter III Canon Plan, the three routes, the 11-minute Reconciliation Window, Elena's unrevealed mastermind role and Adrian's non-mastermind role.  
> Do not create branches or push changes.  
> Work locally and deliver approved changes as a ZIP for the owner to upload.  
> Do not claim tests that were not actually performed.

---

# END OF MASTER PLAN

Do not delete or rewrite this file without preserving confirmed Production information, owner-confirmed Canon, unresolved mysteries, safety rules, Save/Load continuity and the complete Chapter III plan.
