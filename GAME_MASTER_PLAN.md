# LAST WITNESS — GAME MASTER PLAN

> MASTER REFERENCE / SOURCE OF TRUTH
>
> ไฟล์นี้คือเอกสารหลักสำหรับใช้ต่อโปรเจกต์ใน ChatGPT ห้องใหม่
> ต้องอ่านไฟล์นี้และตรวจ GitHub ก่อนแก้โค้ดทุกครั้ง
> เมื่อข้อมูลในแชทขัดกับ GitHub ให้ยึด GitHub branch ที่ใช้งานจริงเป็นหลัก
>
> Last verified production branch: `restore-game-recovered`

---

## 1. PROJECT IDENTITY

### Game Title
**LAST WITNESS**

### Studio / Brand
**BENEDICT INTERACTIVE**

### Tagline
**The dead don't talk. Evidence does.**

ภาษาไทย:
**คนตายพูดไม่ได้ แต่หลักฐานพูดแทนได้**

### Genre
- Narrative Detective Adventure
- Interactive Crime Investigation
- Evidence-based mystery
- Story-driven dialogue
- Light relationship and personality choices
- Mobile-first browser game

### Core Tone
- Crime mystery
- Noir-inspired atmosphere
- Serious investigation mixed with dry humour
- Evidence must support every conclusion
- No supernatural explanation unless later proven by evidence
- Characters should sound intelligent, restrained and professional
- Humour comes mainly from Benedict, North, Somchai and Ratchata
- The story must avoid careless accusations before evidence supports them

### Core Narrative Principle
The game repeatedly separates:

1. What physically happened
2. What official records claim happened
3. Who had permission to alter those records
4. Who actually used that permission

A valid credential proves access, not identity.

---

## 2. REPOSITORY AND PRODUCTION STATE

### Repository
`grolygori789-crypto/last-witness`

### Production Branch
`restore-game-recovered`

This is:
- The default branch
- The GitHub Pages source
- The only branch that should be used for current development
- The last verified playable branch

### Deleted Branches
- `main`
- `restore-forensic-good`

Do not recreate these names unless there is a proven technical requirement.

### Live Game URL
`https://grolygori789-crypto.github.io/last-witness/`

Query strings such as `?recovered=1` do not create a different site.
They only force browsers to request a fresh version.

### GitHub Pages
- Source: Deploy from a branch
- Branch: `restore-game-recovered`
- Folder: `/(root)`

### Current Displayed Build
`LAST WITNESS · BUILD 0.4.0`

### Current Structural Format
- `index.html`
- `css/style.css`
- `css/forensic-phase.css`
- `css/medical-examiner.css`
- `js/engine/`
- `js/chapters/chapter-01/`
- `js/chapters/chapter-02/`
- `assets/images/`
- `assets/audio/`

The game was refactored away from a single Base64 HTML file into external CSS, JavaScript, image and audio files.

Never upload only `index.html` without verifying all referenced folders remain present.

---

## 3. CURRENT DEVELOPMENT STATUS

### Playable
- Title screen
- Thai / English language switching
- Chapter I
- Chapter II
- Chapter II ending
- Chapter III WIP screen
- Save / Load
- Auto Save
- Manual Save
- Dialogue history
- Case File
- Character Journal
- Relationship / personality state
- Developer Console
- Evidence inspection
- Evidence collection
- Evidence comparison
- Phase progression
- Chapter progression
- Audio and ambience system

### Story Completion
- Chapter I: Complete
- Chapter II: Complete in story structure
- Chapter III: Not yet developed
- Chapter III currently shows a WIP screen after Chapter II

### Immediate Development Priority
1. Stabilize all Chapter I and Chapter II regressions
2. Confirm full mobile playthrough
3. Fix remaining portrait, audio, hotspot and dialogue issues
4. Preserve save/load compatibility
5. Design and build Chapter III based on the Chapter II final choice

---

# 4. MAIN CHARACTERS

## Benedict

### Identity
- Age: 42
- Role: Detective
- Status: Lead Investigator
- Player-facing protagonist

### Personality
- Calm
- Observant
- Uses humour under pressure
- Often notices human contradictions
- Should not make unsupported accusations
- His choices shape relationships and investigation tone

### Story Function
Benedict interprets evidence, questions people and makes the final player-facing deductions.

### Player Personality Paths
- Warm
- Observant
- Direct

Choices may change:
- Dialogue responses
- Relationship values
- Character reactions
- Chapter III opening route

---

## North

### Identity
- Age: 32
- Role: IT Specialist / Technical Investigator
- Status: Trusted Partner

### Personality
- Precise
- Analytical
- Dry humour
- Low tolerance for unsupported conclusions
- Often notices technical details Benedict overlooks

### Relationship
North is Benedict's established partner.

Tracked values include:
- Trust
- Respect
- Attachment / affection
- Suspicion

### Journal Rule
North should be added correctly when Chapter II begins.

The red notification dot must:
- Appear only when a genuinely new character entry exists
- Disappear after the new entry has been viewed
- Not remain permanently active
- Not unlock unrelated characters early

---

## Elena

### Identity
- Role: Forensic Analyst
- Status: Professional Contact

### Personality
- Calm
- Precise
- Technically capable
- Prepared
- Dry and restrained sense of humour
- Corrects measurable facts without pretending to know more than the evidence supports

### Introduction
First properly introduced at Orchid Café.

### Story Importance
Daniel Voss contacted Elena to verify an original toxicology report.

She discovers that:
- The corrected toxicology copy shifted the sample collection time
- The shift is exactly eleven minutes
- The scientific result may be authentic
- The administrative timeline around it was altered

### Relationship Paths
- Friendly
- Analytical
- Guarded

Tracked values include:
- Trust
- Respect
- Attachment
- Suspicion

### Critical Dialogue Rule
Every Elena dialogue line must:
- Show Elena's correct portrait
- Use the correct emotion
- Never display Benedict, North or another character's portrait
- Match speaker name, dialogue and portrait on every line

---

## Somchai

### Identity
- Police officer
- Rank used in dialogue: Sergeant / ดาบ
- Cooperative but playful

### Personality
- Flirtatious
- Joking
- Socially confident
- Capable when redirected toward professional work

### Story Function
- Works in the Evidence Division
- Witnesses authorized access to records
- Explains police intake procedure
- Helps verify the impossible timeline

### Player Approaches
- Charm
- Precision
- Pressure

---

## Captain Kittisak Siriwat

### Identity
- Police captain
- Thai dialogue title: ร้อยตำรวจเอก / ผู้กอง as appropriate to established dialogue
- English title: Captain Kittisak Siriwat

### Personality
- Disciplined
- Cautious
- Professional
- Demands evidence before accusation

### Story Function
- Controls access to police evidence
- Preserves the sealed original report
- Warns Benedict that contradiction is evidence, but accusation requires more
- Authorizes access to the laboratory record

### Critical Canon Rule
His Character Journal title/status must not incorrectly display:
- `Reserved`

It must reflect his actual role:
- Captain
- Police Captain
- Commanding Officer
- Equivalent confirmed localized title

---

## Dr. Ratchata Singh

### Identity
- Age: 43
- Role: Senior Medical Examiner
- Thai Sikh forensic pathologist
- Independent expert

### Personality
- Dry-witted
- Eccentric in presentation
- Scientifically strict
- Refuses to make the body prove more than it can
- Uses restrained deadpan humour

### Story Function
- Establishes death timing independently from altered database records
- Confirms the toxicology result is authentic
- Confirms the manipulation targeted chronology, not scientific measurement
- Reveals Daniel was following a pattern across older cases

### Critical Portrait Rule
Use portrait files from:
`assets/images/ratchata/`

Portrait emotion must match every line.

---

## Daniel Voss

### Identity
- Age: 38
- Victim in Chapter II

### Known Facts
- Found dead in his apartment at 06:20
- Was investigating links involving Hotel 1807
- Was following old cases and shell companies
- Had arranged contact concerning an original toxicology report
- Was afraid of someone
- Was killed while following a larger recurring pattern
- The official timeline around his body and sample was manipulated

### Narrative Function
Daniel connects:
- Chapter I's Hotel 1807
- The duplicated building credential
- The altered toxicology timeline
- Police evidence intake
- Laboratory access
- Older cases
- The future conspiracy plot

---

# 5. CHAPTER STRUCTURE

# CHAPTER I — HOTEL 1807

## Status
Complete and playable.

## Main Location
Grandview Hotel — Room 1807

## Opening
North contacts Benedict at the detective office about a possible homicide in Room 1807.

The tone establishes:
- Benedict's humour
- North's dry responses
- Their established partnership
- The investigative style of the game

## Investigation Phase: Hotel Room

### Main Evidence
1. Victim's Phone
2. Blood Pattern / Blood-stained Evidence
3. Cleared Laptop
4. Half-packed Suitcase

### Phone Evidence
- Warning message:
  - “You shouldn't have come here.”
- Three missed calls from `R.`
- Recovered note:
  - “Meet at the pier. 11pm.”

### Key Findings
- The blood pattern is wrong
- The body was moved
- The room was staged
- Laptop recent-file history was deliberately cleared
- The victim intended to leave quickly
- The phone was deliberately left where investigators would find it

## Deduction
The blood pattern, laptop and suitcase do not belong to one natural sequence.

Conclusion:
- Someone reconstructed the scene after death
- Whoever staged the room knew investigators would find the phone
- The warning message may have been intended for Benedict and North, not only the victim

## Ending
An unknown caller tells Benedict:

**“You looked in the wrong room.”**

## Chapter I Story Purpose
- Introduces Benedict and North
- Establishes staged crime scenes as the central motif
- Introduces Hotel 1807
- Establishes that someone is watching the investigation
- Sets up a larger case beyond one murder

---

# CHAPTER II — THE PERFECT STRANGER

## Ending / Case Title
**THE ELEVEN-MINUTE LIE**

Thai:
**คำลวงสิบเอ็ดนาที**

## Status
Complete in current game.

## Central Mystery
Daniel Voss is found dead at 06:20.

However:
- A toxicology report entered official custody at 06:17
- The original sample collection time was 05:58
- A revised record changed it to 06:09
- The difference is exactly eleven minutes
- The revision used a valid internal credential
- The workstation signature points to a machine that was offline
- The raw scientific result remained unchanged

The chapter proves:
- The science is real
- The timeline around the science was engineered
- Someone prepared the official story before the body was officially discovered

---

## CHAPTER II — PHASE 1: DETECTIVE OFFICE — MORNING

### Location
Detective Office — Morning

### Story
North brings Benedict a new case:
- Daniel Voss, 38
- Found dead at 06:20
- Apartment unusually clean
- A report arrived before police requested it
- Someone entered the building at 05:47 using a resident credential that should not exist

### Player Choice
- Warm
- Observant
- Direct

### Purpose
- Establishes player personality path
- Modifies North relationship values
- Unlocks Character Journal
- Adds North correctly
- Sends team to Daniel's apartment

---

## CHAPTER II — PHASE 2: VICTIM'S APARTMENT

### Location
Daniel Voss's apartment

### Main Evidence
1. Two Coffee Mugs
2. Duplicated Access Record
3. Private Investigation Board
4. Unsent Café Draft

### Two Coffee Mugs
- Daniel was not alone
- Visitor stayed long enough for coffee
- Visitor left before the body was reported

### Duplicated Access Record
Credential `18-07` appears:
- Under Daniel Voss
- Under an unnamed temporary resident

Conclusion:
The impossible credential was created within the building's own system.

### Investigation Board
Links:
- Hotel 1807
- Three shell companies
- Note: `Ask E. about the corrected time`

Conclusion:
Daniel was investigating the larger pattern before becoming part of it.

### Unsent Café Draft
- Orchid Café
- 09:30 meeting
- Recipient erased
- Message:
  - “Bring the original report. Come alone.”
- Edited at 05:51
- Four minutes after the unknown credential entered the building

### Phase Deduction
- Coffee for two
- Duplicated credential
- Hotel 1807 connection
- Meeting scheduled after Daniel's apparent death

Next location:
**Orchid Café**

---

## CHAPTER II — PHASE 3: ORCHID CAFÉ

### Scene Label
**FIRST CONTACT**

### Character Introduced
Elena

### Main Story
Elena says:
- Daniel ordered the second coffee
- The estimated time of death is wrong
- She recalculated thermal loss from apartment photos
- Daniel asked her to verify an original toxicology report
- A corrected report changed the collection time by exactly eleven minutes
- The original report is at the police station
- Police evidence intake logged it at 06:17
- This was three minutes before Daniel was officially found

### Player Choice
- Friendly
- Analytical
- Guarded

### Narrative Outcome
Elena joins Benedict and North in the investigation.

Next location:
**Police Station — Evidence Division**

---

## CHAPTER II — PHASE 4: POLICE STATION — EVIDENCE DIVISION

### Main Characters
- Benedict
- North
- Elena
- Somchai
- Captain Kittisak Siriwat

### Character Unlock Rule
Somchai and Kittisak:
- Must remain hidden before their introductory dialogue finishes
- Unlock only after proper introduction
- Must trigger new-character notification correctly
- Must not appear merely because the Police Station screen opened

### Main Evidence
**Original Toxicology Intake Record**

### Verified Timeline
- Original collection: 05:58
- Revised collection: 06:09
- Difference: 11 minutes
- Police intake: 06:17
- Official discovery: 06:20

### Technical Contradiction
- Revision credential is valid
- Workstation signature points to Lab Terminal Three
- Terminal Three was offline
- Its network module had already been removed for maintenance

### Main Deduction
Someone copied or reproduced a trusted workstation signature.

The attacker may have:
- Used a copied credential token
- Used a remote session
- Used delayed synchronization
- Used an authorized system route falsely attributed to an offline machine

The evidence does not yet prove the operator's identity.

### Phase Conclusion
The original report was delivered before the body was found.

This suggests:
- The killer or manipulator knew when Daniel was supposed to be found
- Or believed they controlled when he would be found
- The report was part of a rehearsed official narrative

Next evidence source:
**Laboratory records and maintenance history**

---

## CHAPTER II — PHASE 5: FORENSIC SCIENCE UNIT

### Location
Bangkok City Police Department — Forensic Science Unit

### Scene Label
**CHAIN OF CUSTODY**

### Objective
Trace the original laboratory record.

### Evidence
1. Sealed Toxicology Sample
2. Laboratory Accession Record
3. Workstation Audit Trace
4. Instrument Batch Record

### Sealed Toxicology Sample
- ID: `DV-1807-TX-04`
- Physically sealed
- Label and accession number match original intake
- No visible break in physical chain of custody

### Laboratory Accession Record
- Accepted at 06:17
- Three minutes before official discovery at 06:20
- Impossible timestamp exists in source laboratory data
- It is not merely an error in a police export

### Workstation Audit Trace
- Collection time changed from 05:58 to 06:09
- Valid internal credential accepted
- Attributed to workstation `FS-12`
- Local session recorded as offline
- Source route unresolved
- User identity unverified

### Instrument Batch Record
- Analyzer: `TX-3`
- Batch: `0614-B`
- Raw result hash unchanged
- Instrument data validated
- Scientific measurement authentic

### Central Deduction
The physical sample and raw scientific result remained genuine.

The manipulated layer was:
- Administrative chronology
- Custody timeline
- System metadata
- Official sequence of events

### Player Deduction Choices
1. A valid credential proves access, not identity
2. Physical evidence and digital timeline were handled separately
3. The alteration used a route the system trusted

All three paths must avoid falsely identifying the culprit.

### Phase Conclusion
**THE RECORD SPLITS IN TWO**

The database shows what changed.

The body must explain why the eleven minutes mattered.

Next location:
**Medical Examiner**

---

## CHAPTER II — PHASE 6: MEDICAL EXAMINER

### Location
Bangkok City Medical Examiner

### Scene Label
**THE BODY KEEPS ITS OWN TIME**

Thai:
**ร่างกายมีเวลาของมันเอง**

### Character Introduced
Dr. Ratchata Singh

### Objective
Examine what the body proves independently of the altered system.

### Evidence
1. Postmortem Indicators
2. Identification and Intake Tag
3. Preliminary Autopsy Report
4. Toxicology Reference Sample

### Postmortem Indicators
- Body temperature
- Lividity
- Early rigor

Conclusion:
Daniel died before the corrected digital collection time.

### Identification and Intake Tag
- Official discovery: 06:20
- Laboratory accession: 06:17

Conclusion:
The sample entered the system before the case officially existed.

### Preliminary Autopsy Report
- Narrows time of death independently of altered database fields
- Eleven-minute correction did not change the body
- It changed how the evidence appeared to enter custody

### Toxicology Reference Sample
- Still sealed
- Raw analytical hash matches forensic laboratory result
- Toxicology result is authentic
- Manipulation targeted chronology, not measurement

### Final Medical Deduction
- The body died before the corrected time
- The sample was accepted before official discovery
- The raw test result remained genuine
- A valid result was attached to a false sequence

Benedict's conclusion:

**The lie was not inside the test. It was built around it.**

### Larger Plot Reveal
Daniel was following a similar pattern through older cases.

Someone needed those older records to continue appearing correct on paper.

Daniel was killed before he could finish tracing the pattern.

---

# 6. CHAPTER II ENDING

## Final Screen
**CHAPTER II COMPLETE**

## Case Name
**THE ELEVEN-MINUTE LIE**

## Ending Statement
The science is genuine.

The timeline around it was engineered.

The investigation continues.

## Confirmed Plot Result
- The toxicology test is not fake
- Physical evidence is not necessarily fake
- The manipulation is in chronology and official records
- The conspiracy may span older cases
- Someone has access to trusted institutional systems
- Daniel discovered the recurring pattern
- Hotel 1807 remains connected to the larger case

---

# 7. CHAPTER III — CURRENT PLAN

## Status
Not yet developed.

Current game displays:
- `CHAPTER III`
- Work in progress message
- Chapter II progress saved
- Return to Title button

## Canonical Subtitle
**Not yet confirmed.**

Do not invent or permanently assign a Chapter III subtitle without owner approval.

## Chapter III Entry Routes

The final Medical Examiner choice stores one of three Chapter III flags.

### Route A: Altered Timeline
Flag:
`chapter3_timeline`

Opening lead:
- Digital audit trail
- Timestamp revision history
- Remote or delayed system activity
- Relationship between 05:47, 05:51, 05:58, 06:09, 06:17 and 06:20

### Route B: Older Cases
Flag:
`chapter3_old_cases`

Opening lead:
- Daniel's archived investigations
- Forgotten or deliberately buried case file
- Recurring eleven-minute or chronology anomaly
- Hotel 1807 and shell-company connections

### Route C: Personnel Access
Flag:
`chapter3_access`

Opening lead:
- Who could access the body, sample, evidence system and laboratory
- Conflicting witness statement
- Authorized people whose accounts do not match system history
- Distinguish legitimate access from identity theft or copied credentials

## Chapter III Design Rule
All three routes must converge into the same core chapter without requiring three completely separate games.

Recommended structure:
1. Different opening lead based on stored choice
2. Unique first investigation scene
3. One route-specific piece of evidence
4. Routes converge at a shared contradiction
5. Previous choice remains acknowledged in dialogue
6. No route should be treated as the single “correct” choice

## Chapter III Narrative Objectives
- Identify the recurring pattern in older cases
- Establish why eleven minutes were required
- Connect Hotel 1807 to Daniel's investigation
- Identify the institutional system being exploited
- Narrow suspect access without making premature accusations
- Reveal whether `R.` from Chapter I connects to Ratchata, another person, or a deliberate false lead
- Preserve uncertainty until evidence confirms identity

## Important Unresolved Questions
- Who sent the Chapter I warning?
- Who is `R.` in the missed calls?
- Who arranged the pier meeting?
- Why was Room 1807 staged?
- Why did Daniel connect Hotel 1807 to shell companies?
- Who created the duplicate resident credential?
- Who edited Daniel's café draft at 05:51?
- Who delivered the report at 06:17?
- Who copied the offline terminal signature?
- Why exactly was the timeline shifted by eleven minutes?
- Which older cases contain the same pattern?
- Was Elena targeted, manipulated or merely contacted as an independent analyst?
- Is the conspiracy inside police, forensic, property-management or a network crossing all three?

Do not answer these permanently until the owner confirms the intended master plot.

---

# 8. CORE GAMEPLAY LOOP

Standard phase loop:

1. Enter location
2. Play opening dialogue
3. Show investigation objective
4. Display yellow evidence hotspots
5. Tap hotspot
6. Open evidence panel
7. Inspect evidence
8. Reveal description and observation
9. Collect / add to Case File
10. Change inspected hotspot to green
11. Update progress
12. Unlock review or comparison after all required evidence
13. Play deduction dialogue
14. Present player choice when appropriate
15. Update state, relationships and checkpoint
16. Auto-save
17. Move to next phase

---

# 9. UI AND INTERACTION RULES

## Dialogue
- Tap once advances exactly one line
- Response must be immediate
- No long input delay
- No accidental double advance
- “Tap to continue” should be short and readable
- Speaker name, portrait, emotion and dialogue must always match
- Portrait side/alignment should remain consistent
- Dialogue must be usable on 360 × 800 mobile layout

## Evidence Hotspots
Before inspection:
- Yellow

After inspection or collection:
- Green

Hotspots must not:
- Start green
- Require unrelated actions to update
- Remain yellow after confirmed inspection
- Trigger duplicated sounds

## Evidence Panels
Required order:
1. Open evidence
2. Inspect
3. Reveal details
4. Collect
5. Close

Review button appears only after every required item is complete.

## Character Journal
- Locked during early Chapter I
- Properly unlocked in Chapter II
- Benedict and North are base entries
- Elena unlocks after café introduction
- Somchai and Kittisak unlock after police introduction
- Ratchata unlocks after medical introduction
- Red dot only means genuinely unread character content
- Opening the new entry clears its unread status

## Case File
Evidence must remain grouped by:
- Chapter
- Phase
- Location

Evidence names and descriptions must match the item inspected during gameplay.

## Save / Load
Must preserve:
- Current chapter
- Current screen
- Current phase
- Evidence collected
- Dialogue choices
- Personality values
- Character unlocks
- Unread character status
- Relationship values
- Forensic progress
- Medical progress
- Chapter II completion
- Chapter III route choice

---

# 10. AUDIO RULES

## Global
- Only ambience for the active location may continue looping
- Leaving a phase must stop its ambience
- Returning to title must stop investigation audio
- Title theme and rain may resume on title screen
- Evidence SFX should play once per intended action
- Dialogue advancement should not replay long evidence sounds

## Police Station
Use only the clean beginning of the intended police ambience.

Required edit:
- Keep beginning section
- Cut at first silence
- Remove silence
- Remove click
- Remove ding at tail
- Loop only the clean beginning
- Do not allow the tail sound to replay each loop

## Forensic Science
- Laboratory hum only during forensic phase
- Evidence SFX after inspection as intended
- Stop forensic hum before entering Medical Examiner

## Medical Examiner
- Must not carry Police Station ambience
- Use refrigerator / laboratory background at low volume
- Door beep only on entry
- Barcode sound only for toxicology sample
- Avoid playing multiple overlapping evidence sounds

---

# 11. CONFIRMED DEFECT / POLISH BACKLOG

## Highest Priority

### 1. Dialogue Tap Behaviour
- Immediate advance
- One tap = one line
- No delay
- No double advance
- Short “Tap to continue” label

### 2. Character Journal Notification
- Red dot only for new character
- North correctly unlocks in Chapter II
- No unrelated characters unlock early
- Police characters unlock only after introduction
- Ratchata unlocks after introduction
- Opening entry clears unread state

### 3. Elena Café Dialogue
- Correct dialogue text
- Correct speaker
- Correct Elena portrait for every Elena line
- Verify every speaker/portrait pair throughout the game

### 4. Kittisak Identity
- Must be Captain
- Must not show `Reserved` as his role/title
- Localized title must be consistent

### 5. Police Station Ambience
- Use clean opening only
- Cut at first silence
- Remove silence, click and ding tail
- Seamless loop

### 6. Medical Examiner Audio
- Police audio must stop before entering
- Only Medical Examiner ambience should remain

### 7. Medical Hotspots
- Start yellow
- Turn green immediately after inspect/collect
- Review unlocks after all evidence

---

## Existing Regression Checklist

- Character Journal progressive unlock
- Police characters hidden until introduction
- Police evidence SFX stops correctly
- Forensic evidence SFX plays correctly
- Forensic hotspot turns green immediately
- Compare Records unlocks after all four records
- Medical review works after all four findings
- Somchai portrait vertical alignment
- Kittisak portrait vertical alignment
- Save/load phase state
- Audio lifecycle across every screen
- Chapter II ending screen hides previous HUD
- Chapter III WIP Return to Title works
- Title audio resumes correctly
- Thai and English UI remain synchronized
- No missing assets
- No broken relative file paths

---

# 12. DEVELOPMENT SAFETY RULES

## Mandatory Before Any Change
1. Read `GAME_MASTER_PLAN.md`
2. Check current default branch
3. Confirm GitHub Pages source
4. Fetch the actual target file from GitHub
5. Identify the smallest necessary change
6. Confirm which files will be modified
7. Do not guess current contents
8. Do not rely on filenames from previous chat downloads

## Branch Rules
- Work directly on `restore-game-recovered` unless owner explicitly approves another branch
- Do not create backup branches automatically
- Do not recreate `main`
- Do not recreate `restore-forensic-good`
- Do not change default branch casually
- Do not change Pages source casually

## File Rules
- Do not send standalone HTML files for review
- Do not ask owner to download and re-upload HTML unless no safer method exists
- Never upload a saved ChatGPT webpage as `index.html`
- Before replacing `index.html`, verify that it contains:
  - `<!doctype html>`
  - Last Witness title
  - Game CSS links
  - Game JavaScript links
  - No ChatGPT interface text
- Preserve folder structure and relative paths

## Deployment Rules
Before deploying:
- Verify production branch
- Verify `index.html`
- Verify CSS references
- Verify JS references
- Verify image and audio paths
- Verify Chapter I opens
- Verify Chapter II can start
- Verify console has no fatal startup error

After deploying:
- Open the original Pages URL
- Test with a cache-busting query only when needed
- Confirm the original URL still works without the query
- Never claim deployment succeeded without checking the live page

## Testing Honesty
Never claim:
- Test counts
- Pass percentages
- Regression results
- Browser compatibility
- Mobile compatibility
- Audio correctness

unless those tests were actually performed and documented.

Do not invent results such as:
- `44/44 passed`
- `39/39 passed`

Testing reports in the repository must be treated as historical evidence until rerun against the current branch.

---

# 13. WORKING METHOD FOR FUTURE CHATGPT SESSIONS

At the beginning of every new chat, use:

> Continue the Last Witness project.
> Read `GAME_MASTER_PLAN.md` first.
> Use repository `grolygori789-crypto/last-witness`.
> Production branch is `restore-game-recovered`.
> Do not create branches, change Pages settings or replace index.html without explicit approval.
> Check GitHub source before answering.
> Work one defect at a time.
> Do not claim tests that were not actually run.

## Required Assistant Behaviour
- Use the shortest safe path
- Do not create unnecessary steps
- Do not make the owner repeat screenshots or information already provided
- Give one action at a time during live troubleshooting
- Stop when evidence conflicts
- State uncertainty honestly
- Never present guesses as verified facts
- Protect the working live game before experimenting
- Prefer reversible changes
- Do not create files merely to appear productive
- Do not overwrite working files without checking their current GitHub SHA/content
- Do not send HTML unless it is a verified runnable game build explicitly requested by the owner

---

# 14. NEXT DEVELOPMENT SESSION

## First Task
Run a verified full playthrough of the production branch without changing code.

### Test Order
1. Splash screen
2. Title screen
3. New Game
4. Chapter I office
5. Hotel Room evidence
6. Phone evidence
7. Chapter I deduction
8. Chapter I ending
9. Start Chapter II
10. Character Journal unlock
11. Chapter II office choice
12. Victim's Apartment
13. Orchid Café
14. Elena dialogue and portraits
15. Police Station introduction
16. Somchai and Kittisak journal unlock
17. Police evidence
18. Forensic Science evidence
19. Compare Records
20. Medical Examiner evidence
21. Medical Review
22. Chapter II final choice
23. Chapter II ending
24. Chapter III WIP screen
25. Return to Title
26. Continue / Load saved game
27. Thai / English switching
28. Audio transition between every phase

## Then Fix in This Order
1. Any blocker preventing full playthrough
2. Save/load corruption
3. Wrong dialogue or portrait
4. Evidence progression
5. Character unlock progression
6. Audio leakage
7. Mobile layout
8. Visual polish
9. Chapter III implementation

---

# 15. CANON STATUS LABELS

Use these labels when adding future information:

- `CONFIRMED IN GAME`
- `CONFIRMED BY OWNER`
- `PLANNED`
- `PROPOSED`
- `UNRESOLVED`
- `DEPRECATED`
- `DO NOT USE`

Never silently convert a proposed idea into canon.

---

# 16. CURRENT CANON SUMMARY

## Confirmed
- Chapter I is `HOTEL 1807`
- Room 1807 was staged
- The warning may target the investigators
- Chapter II is `THE PERFECT STRANGER`
- Daniel Voss was investigating Hotel 1807 and linked entities
- Daniel's timeline was manipulated
- Toxicology result is genuine
- Administrative chronology was altered
- Collection time shifted from 05:58 to 06:09
- Police/lab intake recorded at 06:17
- Official discovery recorded at 06:20
- Valid credentials and trusted machine signatures were exploited
- Identity of operator remains unproven
- Daniel was tracing a pattern through older cases
- Chapter II ending case title is `THE ELEVEN-MINUTE LIE`
- Chapter III route depends on the final Medical Examiner choice
- Chapter III subtitle and full plot are not yet confirmed

## Unresolved
- Main antagonist
- Identity behind the warning
- Identity of `R.`
- Purpose of the pier meeting
- Exact connection between Hotel 1807 and Daniel
- Exact reason eleven minutes were needed
- Identity of the credential operator
- Full Chapter III title
- Full long-term chapter count
- Final ending of the complete game

---

# END OF MASTER PLAN

Do not delete or rewrite this file without preserving all confirmed canon, production information, unresolved questions and safety rules.
