# LAST WITNESS - GAME MASTER PLAN

> **MASTER REFERENCE / CURRENT SOURCE OF TRUTH**
>
> **Document revision:** 2026-08-13 11:58 ICT
>
> **Repository:** `grolygori789-crypto/last-witness`
>
> **Production / default branch:** `production-rebuild`
>
> **Current repository HEAD observed before this documentation replacement:** `6ad6b5ddbbb8d8eab80cba9cf6a954a88b490f32`
>
> **Current repository HEAD message:** `Update Master Plan for Phase VIII finale`
>
> **Runtime code/assets baseline:** `a810e4d582c03ca1df08163ab6c47f725dc15c8f`
>
> **Runtime baseline message:** `Fix canonical Chapter IV Dev and QA phases`
>
> **Authoritative Runtime build:** `0.20.9`
>
> **Current playable boundary:** `CHAPTER IV · PHASE VII · RELAY FACILITY CLIMAX`
>
> **Owner-reported current status:** `QUICK OVERALL REAL-DEVICE REVIEW ACCEPTED · PHASE VII SATISFACTORY / ACCEPTABLE FOR FORWARD DEVELOPMENT`
>
> **Acceptance limitation:** `NOT A FULL REGRESSION · NOT ALL ROUTES / SAVES / LANGUAGES / VIEWPORTS / BROWSERS / DEVICES CERTIFIED`
>
> **Next production objective:** `CHAPTER IV · PHASE VIII · SHADOW OF THE TRUTH`
>
> **Chapter IV phase count:** `EXACTLY 8 PHASES`
>
> **Phase VIII status:** `FINAL PHASE OF CHAPTER IV`
>
> **Chapter IV Phase IX:** `DOES NOT EXIST WITHOUT EXPLICIT OWNER APPROVAL`
>
> **Story architecture status:** `SEASON 2 MYSTERY + HIDDEN CASE + ADAPTIVE ENDING ARCHITECTURE LOCKED FROM CHAPTER IV PHASE VIII THROUGH CHAPTER VII FINAL`
>
> **Document status:** `CANONICAL REPLACEMENT REQUIRED BEFORE PHASE VIII PRODUCTION · ZERO-QUESTION CONTINUATION REFERENCE`

This document supersedes the 2026-08-12 Master Plan revision.

The immediately preceding Master Plan incorrectly collapsed the Decision Owner reveal into Chapter IV Phase VIII and made Elena too direct a target. That direction is revoked.

This replacement restores the intended long-game structure from Chapter IV through Chapter VII and adds a stronger mystery architecture designed to make multiple false-principal theories genuinely prosecutable while keeping Elena extremely low-suspicion until the final reconstruction.

This is a documentation-only replacement. It changes no Runtime code or asset. The owner uploads the file personally.

---

# 0. OWNER OVERRIDE AND NON-NEGOTIABLE STORY CORRECTION

## 0.1 Owner directive

From Chapter IV Phase VIII through Chapter VII Final, the central mystery must be difficult enough that an intelligent player can reasonably conclude that several different people are the true killer / Decision Owner.

The game must support a high probability of false attribution.

At least five non-Elena characters must be capable of sustaining a coherent false-principal murder theory that can survive long enough to produce a believable false conviction route:

1. Kittisak
2. Narin
3. Adrian
4. Arman
5. Ika

Somchai must also sustain strong suspicion and may function as a conditional principal theory, an accomplice / cleaner theory, or the strongest support layer for the Kittisak theory.

## 0.2 Elena suspicion target

Before the late Chapter VII reconstruction, Elena must not be the dominant suspect.

Design target:

- Chapter IV Phase VIII: Elena should normally remain outside the player's Top 3 suspects.
- Chapter V: Elena should normally remain a low-probability hypothesis.
- Chapter VI: Elena should still remain materially less suspicious than the principal false suspects.
- Early Chapter VII: multiple non-Elena theories must still be stronger than Elena.
- Late Chapter VII: Elena may become available as a serious hypothesis only through multi-class evidence synthesis.

The practical target is that Elena remains below roughly 10% suspicion in the mind of most blind-playtest players until the late Chapter VII reconstruction.

If blind playtesters repeatedly identify Elena as the likely killer before the intended late-game reconstruction, the mystery architecture has failed and must be corrected before further production.

## 0.3 No retrospective Runtime rewrite

Chapter IV Phases I-VII are already implemented and accepted for forward development.

Do not rewrite them merely to improve the mystery.

From Phase VIII onward, repair the story through reinterpretation, newly discovered scope limits, hidden motives, incomplete but truthful prior disclosures, newly revealed side crimes, jurisdictional or institutional constraints, and evidence that changes the meaning of earlier cooperation without contradicting what the player actually saw.

The repair must feel like deeper truth, not retroactive excuse-making.

## 0.4 Core mystery promise

The player must be able to say of several wrong suspects:

> "Everything I had at the time made this person look like the killer."

The player must not need to behave foolishly to reach a false conviction.

False conviction must emerge from real evidence, real wrongdoing, real obstruction, real motive, real opportunity, real access, and incomplete causal attribution.

The game must distinguish being guilty of something serious from being the murderer / Decision Owner.

## 0.5 Hidden Case Architecture directive - non-negotiable

LAST WITNESS does **not** end with the player selecting a killer from a list.

From Chapter I through Chapter VII, the player's ordinary investigative choices, evidence-preservation decisions, trust / access decisions, confrontation style, witness handling, custody decisions and route choices quietly build hidden case states. The player never sees the criminal-attribution arithmetic.

At the end of Chapter VII, the Runtime resolves the principal case automatically from the full accumulated state.

The intended player experience is:

> **The game does not ask who you think the killer is. It reveals which case your entire investigation became capable of proving.**

The hidden system must be deterministic, auditable by the owner, invisible to normal players, and incapable of being reduced to one final button.

## 0.6 No final killer-selection UI

The following are prohibited unless the owner explicitly reverses this rule in a future Master Plan:

- a final screen asking `Who is the killer?`
- direct `Accuse Kittisak / Narin / Adrian / Arman / Ika / Elena` buttons
- a visible suspect score
- a visible route percentage
- a visible ending meter
- a visible Elena-unlock meter
- a final single choice that overrides the accumulated investigation

Final attribution is a backend resolution derived from the entire case history.

## 0.7 Choice-history promise

Choices from **Chapter I through Chapter VII** are part of the ending architecture.

Existing choices from already accepted Runtime are interpreted from their current saved flags / state. They are not rewritten merely to make scoring easier.

New choices from Chapter IV Phase VIII onward are designed with hidden case consequences from the beginning.

No single ordinary choice may decide the final killer by itself.

A uniquely destructive or preservative choice may open or close an evidence gate, but it still must not directly assign the murderer.

## 0.8 Relationship-system freeze

The existing visible relationship system is accepted and remains separate from the Hidden Case Architecture.

Preserve the existing:

- Trust
- Respect
- Affection / Attachment
- Suspicion
- Character Journal relationship presentation

Do **not** repurpose visible relationship values as hidden murderer scores.

A choice may affect both systems for different reasons, but the systems remain conceptually and technically distinct.

---

# 1. PROJECT IDENTITY AND SOURCE OF TRUTH

## 1.1 Product

**Game:** LAST WITNESS  
**Studio:** BENEDICT INTERACTIVE  
**Primary orientation:** Mobile-first portrait 9:16  
**Primary practical test platform:** Android Chrome  
**Additional mobile target:** Modern iOS Safari / iPhone viewport behavior

## 1.2 Visual direction

Core visual language:

- neo-noir graphic novel
- cel-shaded
- strong ink contour
- angular shadow shapes
- cinematic crime-adventure framing
- premium mobile readability
- same established LAST WITNESS visual identity across normal scenes

Only minigames may use a more bespoke premium visual language.

Normal cards, dialogue, HUD, Case File, Journal, progress bar, Save / Menu controls and location / time presentation remain visually continuous.

## 1.3 Source hierarchy

When sources conflict, use:

1. owner's latest real-device observation
2. current Production Runtime
3. this exact Master Plan
4. owner-approved binary assets
5. repository history / QA notes
6. older planning documents
7. assistant memory

## 1.4 GitHub write rule

Do not write to GitHub without exact current-turn authorization.

Normal workflow: inspect Production, repair locally, test locally, provide replacement file, owner uploads personally.

---

# 2. HARD PRODUCTION CONTRACTS

## 2.1 No unintended redesign

Preserve phase intro cards, location cards, date / time presentation, dialogue UI, HUD, gold progress bar, Save / Menu controls, Case File, Character Journal, Dialogue History, evidence interaction language and existing audio architecture.

100% progress must represent genuine completion / checkpoint completion.

## 2.2 Portrait contract

Chapter IV ordinary dialogue continues to use the accepted Original / uniform portrait system unless a specific owner-approved cinematic requires otherwise.

Do not reintroduce Phase V / VI custom portrait sheets into normal Phase VIII dialogue.

## 2.3 Save / Load

Do not build a parallel Save system and do not refactor accepted Save / Load behavior merely to support the new ending architecture.

The Hidden Case Architecture must be added as a backward-compatible persistence extension.

Required future persisted state includes, at minimum:

- `state.chapter4`
- `state.endingProfile` or its canonical successor
- hidden suspect case profiles
- hidden global evidence-integrity state
- hidden Elena convergence state
- choice-ledger / derivation version information
- route-lock state that is genuinely required to resume an adaptive scene

The extension must preserve old saves whenever technically possible.

A legacy save that predates the hidden case engine must be migrated by interpreting already-existing flags / evidence / stored choices. It must not invent choices that were never recorded.

Before Chapter IV completion is accepted, test manual Save inside Phase VIII, Load into Phase VIII, Restart Current, Return to Title, resume from a Phase VII completion save, `state.chapter4` persistence, hidden-case persistence, Chapter IV final evidence flags, Phase VIII completion and Chapter V handoff state.

Hidden case scoring must be **idempotent** across Save / Load and Restart. Loading or re-entering a scene must never double-add score.

## 2.4 Developer Mode / North QA - strict separation

Owner Developer Mode remains the unrestricted owner test route.

North QA remains limited tester access.

### Owner-only hidden-case visibility

Only Owner Developer Mode may display:

- per-choice `+ / -` hidden deltas
- total hidden suspect case scores
- case-dimension scores
- supporting versus contradicting evidence counts
- prosecutability / eligibility state
- route leader / secondary route
- projected adaptive-scene target
- projected ending
- Elena hidden case score
- Elena Convergence Gate status
- missing Elena gate requirements
- choice audit ledger
- legacy migration / backfill diagnostics
- ending resolver dry-run / simulator

These values must not be rendered to normal gameplay UI.

### North QA prohibition

North QA must **not** expose or infer:

- suspect score numbers
- score deltas
- route leader
- projected ending
- thresholds
- Elena gate count
- Elena gate names
- hidden choice ledger
- ending simulator

North QA may test phase access, scene routing, UI, evidence unlocks, dialogue, media, Save / Load, state continuity and other non-secret QA functions. It must remain useful for blind mystery testing.

No hidden-case values should be copied into ordinary DOM text, normal player-facing data attributes, toast notifications, Case File text, Character Journal text or non-owner QA diagnostics. Avoid ordinary `console.log` leakage of secret scoring in production.

This is an in-game confidentiality rule, not a claim of cryptographic secrecy. LAST WITNESS is a client-side web game, so a determined technical user inspecting source may be able to study implementation. The product requirement is that the game UI and North QA never disclose the hidden architecture.

### Canonical Chapter IV order

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

Until Phase VIII is implemented, only the first seven canonical Chapter IV entries appear.

`Token Verification` remains an internal Phase II checkpoint, not a separate phase.

## 2.5 Accepted Runtime protection boundary

The accepted Runtime from **Chapter I through Chapter IV Phase VII** is maintenance locked.

The new Hidden Case Architecture must be additive.

Do not change accepted earlier content merely to make scoring easier. In particular, do not alter accepted:

- story scenes
- dialogue
- choices
- relationship values or relationship UI
- Character Journal behavior
- Case File behavior
- Dialogue History
- evidence interactions
- phase routing
- progress UI
- portraits
- audio
- existing Dev / North QA behavior
- save behavior visible to players

Permitted earlier-Runtime modifications are limited to reproducible defects, integration blockers, required backward-compatible persistence extensions, or a minimal additive hook that does not change player-facing behavior.

Default implementation strategy: **read accepted old state; do not rewrite accepted old scenes.**

---

# 3. FIXED HISTORICAL TRUTH VS PLAYER KNOWLEDGE

## 3.1 Historical truth

Author-level historical truth is fixed:

- Elena is the mastermind / Decision Owner.
- Elena killed Kawin.
- Elena killed Daniel.
- Elena selected victims.
- Elena selected the room / timing conditions.
- Elena controlled the discovery sequence and cleanup priority.

These facts are not player knowledge merely because they are author canon.

## 3.2 Reveal timing

The player must not prove Elena in Chapter IV.

The player must not prove Elena in Chapter V.

The player must not enter Chapter VI with Elena as the obvious answer.

The player must not begin Chapter VII with every other suspect already eliminated.

Elena becomes provable only during the late Chapter VII reconstruction, and only when multiple independent evidence classes are preserved and combined correctly.

## 3.3 `R.` / Rin

`R.` remains unresolved through Chapter IV.

Future identity: `Rinrada "Rin" Sornchai`

Role: `Former Identity and Access Registrar · Last Witness`

Rin enters the active mystery in Chapter V.

## 3.4 Operational Profile 18-07

Temporary Operational Profile 18-07 is an operational profile, not a person.

> **A valid credential proves access, not identity.**

Never collapse credential, role, access, physical operator, author, deployer and Decision Owner into one person without evidence.

---

# 4. SEASON 2 CORE MYSTERY DOCTRINE

## 4.1 False Principal Architecture

Each mandatory false-principal candidate must have:

1. a real serious wrongdoing
2. a real secret worth protecting
3. a plausible motive for the murders
4. plausible means
5. plausible opportunity or delegation path
6. at least one real act of obstruction
7. evidence in more than one class
8. a coherent explanation for why earlier cooperation was limited
9. one or two late contradictions that prevent the theory from being historically complete
10. enough admissible evidence, depending on player choices, to support a false conviction

The five mandatory prosecutable false-principal theories are:

- KITTISAK THEORY
- NARIN THEORY
- ADRIAN THEORY
- ARMAN THEORY
- IKA THEORY

## 4.2 No cardboard red herrings

A false suspect must be dangerous because they actually committed another offence, actually lied, actually obstructed, actually had access, actually benefited from concealment, and their real secret overlaps the murder evidence.

The player's mistake is causal attribution, not fact recognition.

## 4.3 Competing truths

The same evidence must support different theories depending on which causal assumption the player adopts.

A hidden transfer can mean murder cleanup, witness protection, evidence tampering, institutional containment, technical failover or operational recovery.

The event is real. Its purpose is disputed.

## 4.4 No early theory collapse

Until late Chapter VII:

- no single suspect theory may explain every evidence class
- no single contradiction may fully clear a major false suspect
- no clue may uniquely identify Elena
- no scene may announce that the mystery has narrowed to Elena

---

# 5. ELENA CONCEALMENT DOCTRINE

## 5.1 Surface presentation

Elena must appear ordinary, kind, cooperative when naturally appropriate, socially unthreatening, capable but not theatrically brilliant, fallible in harmless ordinary ways, sometimes irrelevant to the current problem, not constantly present, and not protected by conspicuous writing.

The player should not feel that the narrative is asking them to remember Elena as a special mystery object.

## 5.2 Superhuman intelligence must be retrospective

Elena's intelligence must not be displayed as constant visible omniscience.

Her superiority is revealed retrospectively through the realization that she understood institutional incentives, legal boundaries, self-preservation behavior, professional vanity, fear, jurisdictional friction, technical compartmentalization and how an investigator updates beliefs when presented with partial truth.

She does not need to control every person directly.

She creates conditions in which people predictably protect their own secrets.

### 5.2A Cognitive-scale hard canon — non-negotiable

Elena is not merely a genius, a prodigy, or the smartest person in the room. She is a fictional cognitive outlier whose practical reasoning, synthesis, prediction and strategic planning sit far beyond ordinary human comparison. Conventional IQ language is inadequate to describe her.

For internal creative calibration only, if Albert Einstein is used as shorthand for historic intellectual genius, Elena must be conceived as operating on a vastly higher fictional cognitive scale. If Professor James Moriarty is used as shorthand for elite criminal planning, Elena's planning architecture must be conceived as vastly deeper, more adaptive and more multidimensional. These comparisons are writer-room calibration only and must never become boastful player-facing dialogue or literal scientific claims inside the story.

This intelligence standard is mandatory from Chapter IV Phase VIII through Chapter VII Final. No writer, implementation pass or convenience rewrite may reduce Elena into a conventional mastermind who survives because investigators miss obvious clues.

Elena must demonstrate, retrospectively, exceptional ability to:

- maintain multiple competing hypotheses at once
- model second-, third- and higher-order reactions
- predict how intelligent investigators update beliefs after partial truths
- combine human behavior, institutional incentives, law, jurisdiction, technical systems, evidence procedure and timing into one strategic model
- design plans that remain useful across several plausible branches rather than depending on one perfect prediction
- exploit genuine secrets and genuine misconduct already owned by other people
- distinguish historical truth, evidentiary truth, legal truth, public truth and institutional truth
- anticipate which true fact a suspect will voluntarily disclose to protect a more dangerous fact
- create fallback paths that preserve her objective when one operational layer fails
- understand when doing nothing creates a stronger outcome than direct intervention
- deliberately keep her own visible capability profile ordinary and incomplete

Elena must never require everyone else to become stupid. Benedict, North, Kittisak, Adrian, Arman, Narin, Ika, Somchai, Rin, Cheryl, Farid and Maya may all act intelligently within their information and incentives. Elena's superiority comes from reasoning across more layers of the same reality than they realize are connected.

### 5.2B Planning-depth model — mandatory for every major Elena-controlled event

Every major Elena-controlled operation must be auditable across at least these layers:

1. **Physical layer** — what actually happens.
2. **Record layer** — what systems, witnesses and institutions record.
3. **Interpretation layer** — what a competent investigator is likely to infer from that record.
4. **Reaction layer** — how the newly suspected person is likely to protect their own unrelated or partial guilt.
5. **Belief-update layer** — how that reaction changes Benedict's case theory.
6. **Institutional layer** — what police, courts, agencies, employers, media or other authorities can officially accept.
7. **Fallback layer** — what still benefits Elena if the expected branch fails.

A major Elena plan is not production-ready unless later reconstruction can explain these layers without retroactive invention.

Elena does not need to predict one exact future. For every critical operation, the preferred design is that she anticipates several likely branches and arranges the board so that multiple branches still move suspicion away from her or protect the accepted record.

### 5.2C Ordinary-mask doctrine — equally non-negotiable

The greater Elena's hidden intelligence becomes, the more ordinary her visible behavior must remain.

Surface Elena may appear modest, sincere, kind, harmless, socially normal, occasionally naive about low-stakes matters, imperfect, mildly forgetful, late, uncertain, amused, tired, wrong about an ordinary detail, or simply irrelevant to the current scene. She must never perform genius for the audience merely so the script can advertise how brilliant she is.

Her most extraordinary calculations should look, in first-play context, like ordinary choices that do not deserve a detective's spotlight.

The intended contrast is absolute:

> **Visible Elena:** ordinary, trustworthy, low-signal, easy to overlook.
>
> **Actual Elena:** the deepest strategic intelligence in the story by an overwhelming margin.

On replay, the player should discover that her apparent normality was not a fake personality performed every second. It was a real, sustainable social surface under which an extraordinary analytical system was operating.

## 5.3 Incentive geometry

Elena's signature method is **incentive geometry**.

She understands that when pressure arrives:

- Adrian protects architecture and liability
- Arman protects broker identity boundaries and his deeper ledger
- Narin protects deployment crime and personal exposure
- Ika protects her pre-Aster history and operational work
- Kittisak protects an unlawful institutional containment program
- Somchai protects Kittisak's off-book orders and protected sources
- Rin protects the Last Record and her own registrar violation

Elena arranges the murder chain so that the investigation naturally collides with these existing secrets.

Each suspect then creates suspicion against themselves through rational self-protection.

## 5.4 Structural camouflage

Other people already own the visible capabilities:

- Adrian: architecture
- Arman: wrapper / technical abstraction
- Narin: trusted deployment
- Ika: physical recovery / violence
- Kittisak: institutional authority
- Somchai: physical custody / off-book execution
- Rin: registrar history / credential knowledge

Elena's genius lies in selecting moments where these capabilities overlap.

After the reveal, the player should understand:

> Elena did not hide one giant trail. She built a crime that naturally generated other people's trails.

## 5.5 Elena clue budget

Before late Chapter VII, Elena clues must be sparse.

Target principle:

- roughly one Elena-compatible latent clue for every ten or more major clues pointing toward other suspects
- no Elena clue may be uniquely incriminating on discovery
- every Elena clue must have an ordinary explanation at the time
- every Elena clue must initially fit another suspect theory at least as well, preferably better
- no single timestamp, phrase, email, credential, camera frame or metadata event may prove Elena

## 5.6 Prohibited Elena tells

Do not use mysterious smiles, villain-coded pauses, "she knows too much" dialogue, suspiciously perfect intuition, conspicuous early alibi scenes, obvious hidden messages, unexplained disappearance at the exact wrong moment, repeated Elena-named phases, gendered antagonist language, a direct secret call to an operative, or a unique Elena technical signature.

Elena may misunderstand an ordinary detail, be late, be unavailable, make a harmless wrong assumption, disagree with Benedict, fail to solve something, or have unrelated personal priorities. These moments may be genuine.

---

# 6. THE COOPERATION PARADOX

## 6.1 Mandatory reinterpretation of earlier phases

The earlier Runtime made several suspects appear to cooperate too easily.

From Phase VIII onward, this becomes a deliberate investigative question:

> **Why did people with serious secrets give the team exactly enough truth to move forward?**

The answer must not be that Elena ordered everyone to cooperate.

Each person cooperated for a different self-protective reason.

## 6.2 Strategic confession principle

A smart guilty person may reveal a smaller real crime to protect a larger hidden exposure.

> **A truthful confession can be a form of concealment.**

## 6.3 Adrian's prior cooperation

What remains true:

- Adrian's disclosed architecture was lawful.
- The material he supplied was authentic.

New interpretation:

- he supplied the official architecture boundary
- he did not disclose an undocumented continuity / emergency failover branch
- that branch creates liability and institutional exposure
- his early cooperation established the baseline he wanted investigators to treat as complete

## 6.4 Arman's prior cooperation

What remains true:

- Arman built / adapted the wrapper.
- He operated a blind brokerage structure.
- He did not receive a normal client name through the main channel.

New interpretation:

- the blindness was engineered by Arman
- name blindness did not equal behavior blindness
- he retained enough behavioral, payment and deployment metadata to infer more than he admitted
- the cache he handed over was a controlled disclosure
- it proved a lesser offence and pushed investigators toward another layer while protecting his deeper broker ledger

His statements remain technically true. Their apparent completeness becomes doubtful.

## 6.5 Ika's prior cooperation / timeline

What remains true:

- Ika's Aster recruitment began after the earlier murders.
- Ika attacked North.
- Ika was an Aster field / recovery operator.

New interpretation:

- the Aster timeline is not Ika's complete operational biography
- Phase V already established selective gaps in her licensed history
- later evidence may reveal pre-Aster alias work, unlicensed contracts, travel gaps or hidden clients
- admitting the Aster job was safer than exposing earlier off-book work

No prior fact is erased.

## 6.6 Kittisak's prior cooperation

Kittisak genuinely wants the murder solved.

He also has a separate institutional secret that cannot survive unrestricted audit.

Therefore he supports the investigation inside a controlled scope, releases information that helps, withholds information that would expose his off-book containment program, and becomes increasingly resistant when Benedict crosses that boundary.

## 6.7 Somchai's prior cooperation

Somchai cooperates where cooperation does not expose protected-source movements, unlogged evidence relocation, or Kittisak's emergency containment instructions.

When those areas are reached, he becomes evasive and may actively obstruct.

## 6.8 Player discovery method

Phase VIII should let the player reconstruct:

- what each person volunteered
- what that disclosure proved
- what the disclosure conveniently did not address
- where suspicion moved immediately afterward

The player should notice the pattern before dialogue names it.

North may summarize only after the player sees the pattern:

> "Nobody lied about the part they gave us."

Benedict may answer:

> "That doesn't mean they gave us the whole truth."

Do not explain further.

---

# 7. MANDATORY FALSE-PRINCIPAL SUSPECT ARCHITECTURE

## 7.1 KITTISAK THEORY - strongest institutional false principal

### Real dark truth

Kittisak previously authorized an off-book continuity / containment operation after an internal security failure.

The operation used legitimate emergency authority beyond normal oversight, protected sensitive sources and institutional assets, reused or depended on parts of Adrian's architecture, relied on Somchai for sealed physical transfers, and created records that were incomplete, delayed or intentionally compartmentalized.

Kittisak is not innocent of misconduct.

### Why he cooperated earlier

He wanted the murder solved while keeping the investigation inside a boundary that would not expose the containment program.

### Why he can look like the murderer

He has institutional authority, knowledge of investigation progress, access to records and personnel, power to restrict audit scope, plausible ability to use intermediaries, motive to silence Kawin or Daniel if either threatened institutional exposure, a real history of off-book orders, Somchai acting on his instructions, and missing or delayed records around protected operations.

### Required suspicious behavior

From Chapter V onward, Kittisak may narrow warrants, seal a file, classify a source, deny access, remove Benedict from an information loop, order Somchai to move protected material, refuse to explain an off-book operation, pressure the team to use an institutionally acceptable theory, or become angry when Benedict threatens protected-source exposure.

### Late contradiction

Kittisak's actions can explain concealment and institutional record control, but not the complete preselection of victims / timing across the full murder chain.

The contradiction must not become decisive until Chapter VII.

## 7.2 NARIN THEORY - strongest Bangkok operational false principal

### Real dark truth

Narin supplied or executed the trusted Bangkok deployment.

He also bypassed normal change control, accepted illicit compensation or protected a personal interest, altered or suppressed deployment records after learning of the consequences, and had a direct reason to fear Kawin's or Daniel's disclosure.

### Why he can look like the murderer

He has trusted local access, physical proximity, deployment capability, motive to silence exposure, record manipulation, opportunity, knowledge of how the system behaved in Bangkok, and a plausible route to Arman and Adrian layers.

### Required suspicious behavior

Narin must resist strongly once the investigation threatens his real crime. He may flee, delete a local record, pressure a witness, invoke political / professional protection, deny a meeting that later proves real, or shift blame to Adrian or Arman.

### Late contradiction

Key selection / chronology evidence begins before Narin could have known enough to choose both victims and timing.

Do not reveal that contradiction decisively until Chapter VII.

## 7.3 ADRIAN THEORY - architecture mastermind false principal

### Real dark truth

Adrian designed the lawful architecture and retained or concealed an undocumented continuity / emergency path that should have been disclosed or decommissioned.

Exposure may include regulatory violation, private side contract, retained diagnostic access, failure to disclose emergency capability or institutional client protection.

### Why he can look like the murderer

He has unique architectural knowledge, privileged capability, ability to create hidden failover behavior, motive to protect his work and liability, a reason to make the abuse look like downstream misuse, and technical means to make a record appear internally valid.

### Required suspicious behavior

As audit scope expands, Adrian must become harder through lawyer involvement, privilege assertions, refusal of new access, remote shutdown / security justification, challenge to warrant scope, or denial that undocumented components are "part of the system."

### Late contradiction

Adrian can explain system concealment but not all physical victim-selection facts and human chronology.

## 7.4 ARMAN THEORY - technical broker mastermind false principal

### Real dark truth

Arman is a blind broker by design, but the design hides names, not all client fingerprints.

He retained behavioral client patterns, payment / escrow metadata, urgency tiers, deployment regions, return-channel preferences and hidden broker ledgers.

He knows more than he admitted.

### Why he can look like the murderer

He has tool authorship, technical sophistication, broker reach, ability to compartmentalize clients, ability to manufacture distance, reason to silence people who could expose his network, and evidence of deliberate identity shielding.

### Required suspicious behavior

Later, Arman must resist deeper audit. He may destroy a key, move escrow, invoke source protection, disappear from a known address, use Dimas or another proxy, refuse to identify an off-book client fingerprint, or offer a deal that redirects suspicion.

### Late contradiction

Arman can explain the tool and concealment architecture but not the full victim-selection / physical chronology.

## 7.5 IKA THEORY - violent operator false principal

### Real dark truth

Ika's licensed Aster history is incomplete.

Before Aster she had alias work, unlicensed private-security / extraction contracts, travel gaps, clients she refuses to identify, and at least one serious violent incident she concealed.

### Why she can look like the murderer

She has proven willingness to use violence, physical capability, field tradecraft, surveillance skill, hidden prior work, missing travel history, a real attempt to remove North, and plausible contract motive.

### Required suspicious behavior

Ika must not become a cooperative witness. She may evade arrest, refuse client identity, physically resist, threaten exposure of other suspects, offer partial truth only when cornered, or exploit jurisdictional gaps.

### Late contradiction

The final physical / chemical / chronology reconstruction shows that her hidden pre-Aster work overlaps the case but does not complete the murder act.

## 7.6 SOMCHAI THEORY - cleaner / conditional principal

Somchai carried out off-book physical transfers under Kittisak's authority.

He may have moved evidence outside normal visibility, protected a witness without standard logging, backfilled a chain event, used a secure route not recorded in the main system, or withheld the identity of a protected source.

He can appear to be Kittisak's cleaner, the person who physically made records disappear, or an independent operator using Kittisak as cover.

Somchai is a mandatory high-suspicion character.

## 7.7 Rin / `R.` - witness with dangerous ambiguity

Rin must not arrive as a saintly witness.

She retained or copied material she was not authorized to keep, may have issued or preserved a credential action outside procedure, hid for self-protection, may distrust police / institutions, and withholds part of the Last Record until she trusts the chain.

## 7.8 Secondary suspicion paths

Ratchata may carry off-book sample-preservation suspicion.

Cheryl may carry cross-border mirror / sealed-segment suspicion.

Farid may carry technical mirror / metadata-handling suspicion.

Maya may carry bounded local evidence-custody suspicion without retroactively becoming a Bangkok killer.

These secondary paths add uncertainty but must not dilute the five core false-principal cases.

---

# 8. CHAPTER IV - CANONICAL STRUCTURE

Chapter IV contains exactly eight phases.

1. AFTERIMAGE
2. JAKARTA ARRIVAL
3. PACKET TRAIL
4. THE MAN BEHIND THE ALIAS
5. NORTH IS MARKED
6. THE FALSE SUCCESS
7. RELAY FACILITY CLIMAX
8. SHADOW OF THE TRUTH

Phases I-VII are existing Runtime and maintenance locked.

## Phase VIII - SHADOW OF THE TRUTH

**FINAL PHASE OF CHAPTER IV**

### 8.1 Phase mission

Phase VIII closes the Jakarta operational arc.

It does not solve the mastermind.

It must consolidate what JKT-R7 actually proves, expose the Cooperation Paradox, reopen the interpretation of earlier cooperation without rewriting earlier facts, preserve North's false-removal record, keep North secretly alive, leave the adversary believing the public record, keep the higher decision layer unresolved, make `R.` the next major lead, strengthen at least three non-Elena suspect theories, seed Kittisak as a serious future suspect, avoid giving Elena new narrative weight, close Indonesian jurisdiction cleanly, move Benedict and North toward departure from Indonesia, and reserve Bangkok arrival for Chapter V Phase I.

### 8.2 Opening

Begin immediately after JKT-R7.

The team has achieved a real tactical victory through lawful facility access, reader normalization, relay isolation, residual-path observation and physical / digital correlation.

But the residual continuity path proves that the team has identified layers, not the person who arranged the layers.

### 8.3 Cooperation Paradox reconstruction

The Phase VIII investigative centerpiece should let the player compare prior disclosures.

The player reconstructs Adrian's lawful architecture disclosure, Arman's controlled cache and limited admission, Aster / Ika's precise later timeline, and institutional sources that repeatedly provided exactly enough information to move the investigation outward.

Recommended interactive categories:

1. WHAT THEY GAVE
2. WHAT IT PROVED
3. WHAT IT DID NOT PROVE
4. WHO BECAME THE NEXT TARGET OF SUSPICION

The player should notice the pattern before dialogue names it.

### 8.4 New Phase VIII boundaries

**Boundary A - Arman**

His cache proves tool authorship but contains a deliberate broker boundary separating client-behavior data from the handed-over package.

This proves earlier cooperation was not complete transparency.

**Boundary B - Ika**

Aster employment history is precise from recruitment forward but references a prior identity-verification gap or unavailable pre-Aster history.

This reopens a question the player thought was closed.

**Boundary C - Bangkok institutional handling**

A Bangkok-side preservation or access notice arrives under Kittisak's authority and shows that some material has been sealed / moved / compartmentalized for source protection before Benedict returns.

This is legally explainable and suspicious.

### 8.5 Elena handling

Elena receives almost no mystery spotlight in Phase VIII.

Allowed: one ordinary professional check-in or mundane informational exchange.

No unique access, suspicious timing, special camera language, cryptic line, direct JKT-R7 connection, or Decision Owner discussion centered on her.

Preferred direction: Elena may be absent from the majority of Phase VIII.

### 8.6 North false-removal lock

By Phase VIII end:

- public / external record still says North was removed
- North is secretly alive
- the adversary accepts the false record
- North remains operational
- Benedict and North protect the false belief

The prior candidate line `Let her believe the record.` is no longer canonical because gendered wording can leak antagonist gender.

Preferred closing sentiment:

> **"Let them believe the record."**

or another owner-approved gender-neutral equivalent.

### 8.7 `R.` handoff

`R.` becomes the next major lead.

Do not reveal Rin in Chapter IV.

### 8.8 Geography and farewell

Phase VIII ends in Indonesia / departure.

Allowed final geography: JKT-R7 aftermath, secure debrief, transport to airport, airport departure, aircraft leaving Jakarta.

Do not show Bangkok arrival.

Maya remains Jakarta. Cheryl returns Singapore. Farid remains Singapore-side. Benedict and North depart toward Bangkok.

No group hug.

### 8.9 Phase VIII completion state

Phase VIII completes Chapter IV only when Jakarta operational layers are consolidated, Cooperation Paradox is understood, Decision Owner remains unresolved, North false-removal state is preserved, `R.` is established as the next lead, departure state is set, Save / Load state is valid and Chapter V handoff is ready.

---

# 9. CHAPTER V - THE MISSING PIECE

## 9.1 Chapter purpose

Chapter V must return Benedict and North to Bangkok, identify Kawin, introduce Rin, reconstruct the pier event, deepen Narin's role, transform Kittisak into a top-tier suspect, reopen Adrian / Arman / Ika through new evidence without retcon, introduce Somchai's off-book movements, make at least four non-Elena principal theories simultaneously plausible, and keep Elena narratively ordinary and low-suspicion.

## 9.2 Planned phases

1. RETURN TO BANGKOK
2. NAME IN ROOM 1807
3. ROOM / PROFILE CROSS-MAP
4. DANIEL'S HANDOFF
5. THE REGISTRAR
6. PIER RECONSTRUCTION
7. WITNESS EXTRACTION
8. THE MISSING PIECE

## 9.3 Phase 1 - RETURN TO BANGKOK

Open on the return flight / approach / landing / Bangkok arrival.

Kittisak has already ordered selected files sealed or compartmentalized under source-protection authority.

Somchai has physically moved one protected evidence package while Benedict was returning from Jakarta.

Kittisak provides a reasonable explanation.

The player should nevertheless wonder why he needed to move it before Benedict came back.

Elena may appear only in a normal social / professional context if needed.

## 9.4 Phase 2 - NAME IN ROOM 1807

Reveal Kawin Nopparat as the Room 1807 victim.

This phase sharply raises Narin suspicion.

New facts may show Narin knew Kawin professionally or operationally, had reason to fear Kawin's disclosure, deployment activity intersects Kawin's access window, and a record was changed after Kawin disappeared.

Kittisak also becomes more suspicious if he knew Kawin's identity or protected status earlier than Benedict was told.

## 9.5 Phase 3 - ROOM / PROFILE CROSS-MAP

Build the first full multi-theory board crossing room evidence, profile 18-07, architecture, wrapper, deployment, physical movement, custody and institutional access.

The same board must support Narin, Kittisak, Adrian and Arman.

No theory closes.

Elena should not be a formal board focus.

## 9.6 Phase 4 - DANIEL'S HANDOFF

Daniel's prepared material introduces an ambiguous warning about a gatekeeper / authority layer.

The material is authentic but role-based rather than name-based.

It should plausibly implicate Kittisak, Adrian and Narin depending on how the player interprets "authority."

## 9.7 Phase 5 - THE REGISTRAR

Locate `R.` and reveal Rin.

Rin is evasive, frightened, intelligent, not fully cooperative, carrying her own procedural violation, and distrustful of institutional custody.

She reveals registrar anomalies, role / credential history, evidence that accepted access was intentionally separated from physical identity, and a protected action that can be read as institutional interference.

Rin must not immediately solve the case.

## 9.8 Phase 6 - PIER RECONSTRUCTION

Reconstruct a physical event connected to Kawin / Daniel.

This phase reopens Ika aggressively through a pre-Aster alias, travel gap, unlicensed field work or physical-capability evidence.

The player should naturally realize that Aster recruiting Ika later never proved she had no earlier operational history.

## 9.9 Phase 7 - WITNESS EXTRACTION

A real threat to Rin or a protected source forces emergency movement.

Kittisak orders an off-book protective extraction through Somchai.

The order is genuinely intended to protect the witness, but the procedure violates normal visibility / logging, Benedict is not told the whole reason, and Somchai refuses to disclose source identity.

From the player's perspective, it can look exactly like attempted removal / cleanup.

At the same time, Ika-related tradecraft appears in the threat layer, Narin disappears or resists, Adrian restricts a system path, and Arman moves or destroys a key.

Multiple suspects behave badly for different reasons.

## 9.10 Phase 8 - THE MISSING PIECE

Chapter V ends by proving that the case contains multiple real concealment systems.

The missing piece is not Elena.

It is the realization that different people are hiding different crimes inside the same evidence field.

End-state:

- Kittisak: top-tier suspect
- Narin: top-tier suspect
- Adrian: viable principal
- Arman: viable principal
- Ika: viable violent principal
- Somchai: plausible cleaner / accomplice
- Rin: valuable but still not fully trusted
- Elena: still low-suspicion

Open Chapter VI with `CASE THEORY WITHOUT A CHARGE`.

## 9.11 Chapter V adaptive-narrative contract - INFLUENCE

Chapter V is the first chapter where hidden case state may alter scene emphasis.

Chapter V must remain predominantly a shared canonical spine. Target production budget: roughly 75-85% shared content and 15-25% adaptive variation. This is a design budget, not a literal runtime percentage requirement.

Allowed adaptive variation includes:

- which suspect Benedict presses hardest
- which follow-up question appears
- which optional evidence context is inspected first
- which suspect reaction receives additional screen time
- which two theories North compares
- minor dialogue variants based on preserved earlier choices
- optional short scenes that strengthen or weaken a theory

Historical facts must not change because of hidden score.

A high Kittisak score does not cause Kittisak to have committed a new murder. It causes the investigation to encounter, emphasize or interpret real Kittisak-linked facts more strongly.

Chapter V adaptive scenes should usually consider the **top two or top three viable theories**, not only the single current leader. This prevents score snowballing and keeps the mystery dense.

Elena must not receive additional spotlight merely because a hidden Elena value rises. Elena remains governed by the separate clue-budget and reveal rules.

---

# 10. CHAPTER VI - THE FINAL MOVE

## 10.1 Chapter purpose

Chapter VI must expose Continuity Protocol, run a controlled leak, reconstruct authority paths, force simultaneous suspect reactions, preserve competing principal theories, keep all five false-principal candidates capable of carrying the case, allow Somchai to look like a cleaner, keep Elena outside the obvious suspect center, and create the evidence-state differences that later drive the four endings.

## 10.2 Planned phases

1. CASE THEORY WITHOUT A CHARGE
2. CONTROLLED LEAK
3. ALLIANCE ASSIGNMENT
4. CONTINUITY PROTOCOL
5. ATTACK ON SAFE CHAIN
6. EVIDENCE DIVISION BREACH
7. THE QUIET CHANNEL
8. TWO STAGING SITES
9. THE FINAL MOVE

The historical working title `ELENA KNOWS` is revoked.

Do not name a Phase after Elena before the late-game reveal.

## 10.3 Phase 1 - CASE THEORY WITHOUT A CHARGE

The player builds five serious principal cases: Kittisak, Narin, Adrian, Arman and Ika.

Each case must have motive, means, opportunity, evidence, obstruction and unresolved contradiction.

The interface must not tell the player which is the real suspect.

Elena may appear only in a low-information background category, not as a highlighted equal suspect.

## 10.4 Phase 2 - CONTROLLED LEAK

The team distributes different controlled pieces of information through different channels to observe reaction and information movement.

Do not give Elena a uniquely identifiable bait packet.

Reactions:

- Kittisak changes institutional handling
- Narin alters movement / contacts
- Adrian restricts a technical branch
- Arman protects escrow / keys
- Ika-related operators move physically
- Somchai executes a sealed instruction

Every reaction is real and suspicious. None proves murder.

## 10.5 Phase 3 - ALLIANCE ASSIGNMENT

Force the investigation to divide responsibilities across witness, custody, technical verification, institutional warrant path and field movement.

Choices alter chain of custody, witness safety, alliance strength and which suspect theory later becomes easiest to prosecute.

## 10.6 Phase 4 - CONTINUITY PROTOCOL

Reveal a legitimate emergency Continuity Protocol whose history intersects multiple suspects:

- Adrian's architecture
- Arman's abstraction / wrapper compatibility
- Narin's deployment behavior
- Kittisak's institutional emergency use
- Somchai's physical transfer practices
- Ika / Aster recovery touchpoints

This is the central multi-suspect knot.

The same protocol can support five different principal theories.

The protocol itself does not identify Elena.

## 10.7 Phase 5 - ATTACK ON SAFE CHAIN

A protected chain is compromised.

Evidence intentionally supports multiple readings:

- physical tradecraft -> Ika
- technical abstraction -> Arman
- trusted deployment -> Narin
- privileged architecture -> Adrian
- internal timing / access -> Kittisak / Somchai

Do not resolve which layer initiated the event.

## 10.8 Phase 6 - EVIDENCE DIVISION BREACH

A breach exposes Somchai's off-book movement and Kittisak's hidden containment program.

This should create the strongest Kittisak suspicion spike in the game.

The player can reasonably conclude that Kittisak has been controlling evidence since before Benedict understood the case.

That statement may be factually true in the limited context of his containment program.

It still does not prove murder.

## 10.9 Phase 7 - THE QUIET CHANNEL

This replaces `ELENA KNOWS`.

Purpose: introduce one or two Elena-compatible latent clues without spotlight, show a mundane distribution / chronology detail, keep stronger explanations attached to other suspects, and avoid any direct Elena confrontation.

At first play, the clue should look administrative.

Only Chapter VII reconstruction changes its meaning.

## 10.10 Phase 8 - TWO STAGING SITES

Reveal two simultaneous or near-simultaneous staging paths.

This makes simple single-operator theories harder while making mastermind / accomplice theories stronger.

Each major suspect theory must be able to explain the two-site problem differently.

## 10.11 Phase 9 - THE FINAL MOVE

A major action forces the player to decide what to preserve and whom to trust.

Do not reveal Elena.

End Chapter VI with at least three principal theories still fully viable, preferably all five depending on player evidence state, Kittisak and Narin normally among the strongest, one or more evidence chains damaged or protected based on player choices, and Last Witness / Last Record becoming central.

The player should enter Chapter VII uncertain, not merely waiting for Elena confirmation.

## 10.12 Chapter VI adaptive-narrative contract - DIVERGE

Chapter VI is where hidden case state materially changes investigative routing.

Target production budget: roughly 60-70% shared canonical spine and 30-40% adaptive content. Do not create five completely separate Chapters VI. Reuse core locations, evidence events and central story beats while varying focus, response order, optional follow-ups, pressure targets and consequences.

The Controlled Leak and subsequent reaction chain are the primary adaptive engine. Different player histories may make different channels, suspects and reactions narratively dominant.

Two players should be able to finish Chapter VI with sharply different convictions while both having seen historically true events.

Example intended divergence:

- one player sees Kittisak / Somchai institutional handling as the dominant command structure
- another sees Narin's deployment and concealment as the command structure
- another sees Adrian + Arman as architect / broker layers forming the mastermind path
- another sees Ika's hidden pre-Aster work as the physical throughline

Do not allow adaptive routing to feed only the current leader. Every major leader-strengthening sequence must preserve at least one competing interpretation or reveal at least one contradiction.

No Chapter VI branch may permanently remove Elena from historical truth, reveal Elena early, or make an Elena ending mathematically automatic.

---

# 11. CHAPTER VII - LAST WITNESS

## 11.1 Chapter purpose

Chapter VII resolves physical truth, record truth, legal truth, public truth and final attribution.

The chapter must preserve multiple wrong answers until very late.

The player does **not** choose a killer from a list. The accumulated investigation resolves the case.

## 11.2 Planned phases

1. THE ROOM REPEATS
2. THE PIER
3. RESCUE / PRESERVE
4. FIVE PRINCIPALS
5. THE LAST RECORD
6. FINAL RECONSTRUCTION
7. THE WEIGHT OF PROOF
8. RECORD OR RELEASE / ENDING

The historical phase title `FINAL ACCUSATION` is revoked because it implies a direct player killer-selection step.

The historical mid-chapter working beat `ELENA CONFRONTATION` is also revoked as a named phase.

Elena must not be formally confronted before the reconstruction earns it.

## 11.3 Phase 1 - THE ROOM REPEATS

A pattern appears to repeat.

It must be interpretable as Kittisak staging institutional cleanup, Narin recreating the Bangkok method, Adrian exploiting architecture, Arman using brokered technical concealment, or Ika executing a physical pattern.

Do not make the repeat point uniquely to Elena.

Adaptive emphasis may reflect the strongest two or three current case theories, but the physical event remains canonical.

## 11.4 Phase 2 - THE PIER

Complete the physical reconstruction.

Establish that some acts required physical presence, some required prior knowledge, and some required access that could have been delegated.

The player's earlier investigation determines which causal mapping currently feels most persuasive. The game does not ask the player to assign the murderer directly.

## 11.5 Phase 3 - RESCUE / PRESERVE

A high-stakes evidence / witness preservation sequence.

Player choices determine whether the ending retains witness safety, physical evidence, clean custody, original record version and corroborating technical evidence.

This phase materially affects whether Elena can ever be convicted.

A destructive choice may close an evidence gate, but must not directly assign another person as murderer.

## 11.6 Phase 4 - FIVE PRINCIPALS

Present the five false-principal cases at maximum strength.

The game should be able to construct prosecution-grade narratives for Kittisak, Narin, Adrian, Arman and Ika from the player's actual accumulated state.

Somchai may appear as Kittisak accomplice, cleaner or independent conditional principal.

Do not ask the player to choose one.

The scene should make the player feel the pressure of several plausible cases while the hidden resolver continues to evaluate what each case can legally sustain.

If rare latent evidence has survived, the story may acknowledge an unnamed sixth possibility such as `UNRESOLVED DECISION OWNER` without putting Elena's name on a suspect-selection screen.

## 11.7 Phase 5 - THE LAST RECORD

Rin / the Last Record provides the first evidence class that none of the five false-principal theories can fully absorb.

The Last Record must not simply say `Elena did it.`

It should expose a structural contradiction involving sequence, physical event, accepted record, who could know what at which time, and the difference between decision selection and later operational execution.

This is one leg of the Elena proof.

## 11.8 Phase 6 - FINAL RECONSTRUCTION

This is the only point at which the Elena hypothesis may become fully serious.

A legally meaningful Elena case requires multi-class convergence. At minimum, the engine must require independent support from several of these categories:

1. physical / human class
2. chronology class
3. distribution / decision class
4. motive / victim-selection class
5. original-record integrity class

No single class is enough.

No single clue is enough.

The reveal should feel like several ordinary facts suddenly locking together.

The player may experience one of three reconstruction states:

- **Elena convergence unavailable** - the surviving case state cannot responsibly identify her
- **Elena attribution supported but not prosecutable** - enough truth survives to understand her role but not enough clean legal bridge survives to convict
- **Elena full convergence** - attribution and prosecutability gates both survive

These states are backend-derived. They are not selected by the player on a suspect list.

## 11.9 Elena reveal standard

Target reaction:

> `Elena? That makes no sense.`

Then, after reconstruction:

> `Wait. This is the only theory that explains why every other theory is almost right.`

The reveal must recontextualize earlier chapters without requiring retcon.

## 11.10 Phase 7 - THE WEIGHT OF PROOF

This phase replaces `FINAL ACCUSATION`.

Its purpose is to let the case reach the consequence of the player's entire investigation without asking the player to name a killer.

Backend sequence:

1. finalize persisted evidence and witness state
2. compute each suspect's eligibility gates
3. compute prosecutable strength for eligible false principals
4. compute Elena attribution convergence
5. compute Elena prosecutability convergence
6. apply fatal contradictions / admissibility failures
7. resolve the strongest legally sustainable case
8. lock the ending route deterministically

The player sees narrative consequences, not the arithmetic.

If Kittisak is the strongest prosecutable wrong case, the story naturally moves toward Kittisak. If Narin is strongest, it moves toward Narin, and so on.

If Elena full convergence succeeds, the Elena prosecution path becomes available automatically.

If Elena attribution succeeds but legal convergence fails, the story moves toward `RIGHT NAME, NO CASE`.

There is no `Choose Elena` button.

## 11.11 Phase 8 - RECORD OR RELEASE / ENDING

Resolve legal case, public record, institutional record, witness fate, North fate, resolved principal, Elena fate, false-suspect fate, Kittisak / Somchai institutional consequences and Rin / Last Record consequences.

The final scene must correspond to the accumulated evidence, hidden case architecture and resolved legal outcome, not a final button.

The ending route is locked before the player enters the final resolution cinematic / sequence.

## 11.12 Chapter VII adaptive-narrative contract - RESOLVE

Chapter VII uses the strongest adaptive variation of the game.

The opening and core reconstruction may still share locations and events, but dialogue, prosecution framing, confrontation target, evidence presentation, institutional response and final cinematic must reflect the backend-resolved case.

The same historical truth remains fixed in every route: Elena is the actual murderer / Decision Owner.

Alternate endings represent different **provable / accepted case realities**, not alternate historical universes in which Elena literally stops being the historical killer.

---

# 12. ENDING ARCHITECTURE - BACKEND RESOLVED, NEVER PLAYER-SELECTED

Four major ending families remain canonical:

1. TRUE CONVICTION
2. RIGHT NAME, NO CASE
3. FALSE CONVICTION
4. THE PERFECT RECORD

`FALSE CONVICTION` contains five mandatory principal variants.

The ending resolver uses accumulated hidden case state from Chapter I through Chapter VII.

## 12.1 Resolution order

The engine must not simply select the highest raw number.

Resolution order is:

1. reconstruct / validate hidden case state
2. evaluate evidence integrity and route gates
3. determine which suspect cases are legally eligible
4. determine Elena attribution convergence
5. determine Elena prosecutability convergence
6. compute prosecutable strength only among eligible cases
7. apply contradiction penalties and fatal contradiction rules
8. resolve ending family
9. resolve false-conviction identity if applicable
10. freeze final route before final scene

No randomness is allowed in ending identity resolution. Identical canonical state must produce identical outcome.

## 12.2 TRUE CONVICTION

This is the rarest and hardest ending.

It requires **both** Elena attribution convergence and Elena prosecutability convergence.

Minimum conceptual requirements include:

- sufficient hidden Elena attribution strength
- Decision Ownership corroborated
- usable physical / human support
- usable chronology / decision-order support
- usable original-record integrity
- chain of custody survives above threshold
- at least three independent evidence classes survive
- Rin / Last Record survives in usable form
- North's required technical attribution survives
- Narin deployment can be separated from decision selection
- major false-principal contradictions are sufficiently understood
- no fatal legal bridge is broken

The player does not choose Elena. The system earns the Elena route.

## 12.3 RIGHT NAME, NO CASE

This ending occurs when the investigation reaches the historical truth strongly enough to identify Elena's role, but the legal case cannot be sustained.

Possible causes include:

- broken chain of custody
- lost original record
- unusable Last Record
- witness unavailable / compromised
- insufficient admissibility
- missing physical bridge
- missing chronology bridge
- insufficient independent corroboration

The narrative may allow Benedict to understand or confront the truth, but the institution cannot convict Elena.

Again, no player killer-selection screen is used.

## 12.4 FALSE CONVICTION

The institution accepts a coherent case against a culpable but historically wrong principal.

The false principal is selected from the **strongest eligible prosecutable wrong case**, not the highest superficial suspicion value.

Five mandatory variants:

### Kittisak false conviction

Off-book containment + Somchai transfers + institutional access + file sealing + internal information control are interpreted as the murder command structure.

### Narin false conviction

Trusted deployment + physical proximity + record alteration + motive + evasion are interpreted as principal murder responsibility.

### Adrian false conviction

Undocumented continuity path + privileged architecture + liability concealment + technical capability are interpreted as deliberate murder architecture.

### Arman false conviction

Wrapper authorship + broker ledger + engineered blindness + client fingerprint knowledge + obstruction are interpreted as the mastermind network.

### Ika false conviction

Violence + pre-Aster hidden history + travel gaps + field capability + North attack are interpreted as evidence she was the earlier killer and later cleanup operator.

Each false principal is guilty of serious wrongdoing. None is the historical Decision Owner.

### False-conviction tie handling

If multiple wrong cases are eligible and close in raw strength, the resolver must use deterministic legal-quality tie breakers in this order:

1. admissible corroboration breadth
2. clean chain / evidence integrity for that case
3. motive + means + opportunity completeness
4. number and severity of unresolved contradictions
5. strength of surviving human / physical corroboration
6. institutional ability to sustain the charge

Do not use random selection.

## 12.5 THE PERFECT RECORD

Elena wins at the level she values most: the accepted record.

This ending is appropriate when no case can be prosecuted cleanly enough, or when the accepted institutional narrative becomes too complete to reopen despite historical truth remaining elsewhere.

Possible conditions include:

- original evidence lost
- Rin / Last Record destroyed, discredited or unusable
- critical witness chain broken
- competing cases remain too fragmented to charge
- institutional closure pressure overwhelms corroboration
- public record control strongly favors a coherent wrong narrative without a chargeable individual
- Benedict can no longer reopen the case meaningfully

The official story is coherent. It is simply wrong.

## 12.6 No score-only ending

A raw score lead alone cannot guarantee an ending.

Every ending requires a combination of:

- accumulated choices
- evidence state
- evidence quality
- witness state
- chain state
- admissibility
- contradictions
- route gates

The scoring system is a model of case development, not a slot machine.

---

# 13. EVIDENCE ARCHITECTURE

## 13.1 Evidence classes

Major conclusions must distinguish:

1. physical evidence
2. human witness evidence
3. record evidence
4. credential / permission evidence
5. device / timestamp evidence
6. network / route evidence
7. tool / authorship evidence
8. deployment evidence
9. institutional authority evidence
10. financial / broker evidence
11. motive / victim-selection evidence

## 13.2 False-principal minimum

Each of the five mandatory false-principal cases must have at least three independent evidence classes by late Chapter VI, one authentic obstruction event, one authentic dark secret, one plausible murder motive, one plausible opportunity / delegation route and one surviving contradiction.

## 13.3 Elena proof minimum

Elena must never be proven by one class.

The player must need at least three independent classes, including at least one physical / human class, at least one chronology or decision-order class, and at least one latent clue that was previously innocuous.

## 13.4 Evidence asymmetry

False suspects produce dense direct evidence, loud obstruction, visible misconduct and obvious motive.

Elena produces sparse indirect evidence, no obvious operational signature, no loud obstruction, weak apparent motive, and high explanatory power only after final synthesis.

## 13.5 No clue dumping

Do not solve the mystery through one confession, one secret email, one CCTV image, one timestamp, one hidden recording, one convenient witness statement or one database row.

The final truth must emerge from cross-class contradiction.

---

# 14. PLAYER SUSPICION AND BLIND PLAYTEST GATES

## 14.1 Phase VIII gate

PASS if players can name several plausible non-Elena suspects, at least one tester independently questions earlier cooperation, Kittisak / Arman / Ika / Narin / Adrian remain alive as hypotheses, and Elena is not the dominant answer.

FAIL if most testers say "obviously Elena," Phase VIII narrows the case to one mastermind, Cooperation Paradox feels like exposition rather than discovery, or prior cooperation still reads as simple innocence.

## 14.2 Chapter V gate

PASS if Narin and Kittisak are usually stronger suspects than Elena, Adrian / Arman / Ika remain prosecutable possibilities, Somchai is plausibly suspicious, and players disagree about the principal.

## 14.3 Chapter VI gate

PASS if at least three principal theories remain strong for most players, all five false-principal theories remain legally possible in some evidence states, Kittisak can plausibly be the top suspect, Elena remains a minority hypothesis, and evidence-state choices meaningfully affect the final case.

## 14.4 Early Chapter VII gate

PASS if players remain split across multiple suspects, `FIVE PRINCIPALS` feels genuinely difficult, and Elena still lacks a complete prosecution theory.

## 14.5 Final reveal gate

PASS if the player can say:

> "I could have convicted the wrong person and believed I was right."

Best-case reaction:

> "Every false case was built from real guilt, but none of them explained the whole crime."

---

# 15. CHARACTER DUTY MATRIX - SEASON 2

| Character | Chapter IV Phase VIII | Chapter V | Chapter VI | Chapter VII |
|---|---|---|---|---|
| Benedict | notices cooperation boundaries | rebuilds Bangkok case, resists premature closure | manages competing theories | final reconstruction / accusation |
| North | detects disclosure pattern | hidden analyst, supports Rin / registrar map | telemetry, controlled leak, contradiction analysis | technical Last Record reconstruction |
| Elena | ordinary low-signal ally / background | useful but not central | ordinary presence, minimal latent trace | revealed only after late synthesis |
| Kittisak | seeds sealed Bangkok boundary | becomes major institutional suspect | strongest internal-control theory | viable false principal until final reconstruction |
| Somchai | Bangkok handling anomaly | off-book transfers / witness movement | cleaner / custody suspicion | conditional principal / accomplice theory |
| Adrian | prior cooperation reinterpreted | hidden architecture boundary | Continuity Protocol / privilege conflict | viable false principal |
| Arman | controlled disclosure exposed | deeper broker ledger | broker / technical principal theory | viable false principal |
| Narin | Bangkok layer remains unresolved | dominant operational suspect | deployment / motive / evasion | viable false principal |
| Ika | pre-Aster history reopened | physical / travel suspicion | field-network principal theory | viable false principal |
| Rin | unresolved `R.` | introduced, ambiguous, guarded | protected witness / registrar evidence | Last Witness / Last Record |
| Ratchata | physical evidence remains independent | sample continuity questions | evidence preservation pressure | physical contradiction support |
| Cheryl | Singapore custody | cross-border admissibility | mirror / leak preservation | authenticates original chain |
| Farid | remote verification | hidden-channel authentication | telemetry / mirror integrity | proves original versus rewrite |
| Maya | closes Jakarta lawfully | mostly off-stage / jurisdictional support | Indonesia support if required | confirms Jakarta physical chain if needed |

---

# 16. PROHIBITED NARRATIVE SHORTCUTS

Do not:

- reveal Elena in Chapter IV
- reveal Elena in Chapter V
- make Elena the dominant Chapter VI suspect
- title a pre-reveal phase with Elena's name
- use gendered language for the unknown principal when that narrows the field
- treat cooperation as innocence
- treat role separation as exoneration
- clear Ika because Aster recruited her later
- clear Arman because he is a toolmaker
- clear Adrian because original architecture was lawful
- clear Kittisak because he is law enforcement / authority
- clear Somchai because he follows orders
- make Narin merely a deployer with no motive or obstruction
- create false evidence solely to frame innocent people
- have Elena personally micromanage every suspect reaction
- make every suspect obstruct in the same way
- solve the case with one clue
- make Rin a magical exposition witness
- let the player accuse Elena successfully without evidentiary threshold
- make FALSE CONVICTION feel like a bad-choice joke
- undo Phases I-VII through retcon

---

# 17. PHASE VII LOCKED HANDOFF INTO PHASE VIII

Phase VII established:

- Day 6
- 07:22 WIB
- North Jakarta · Indonesia
- JKT-R7 Relay Facility
- maintenance window 07:30-07:45
- false completion receipt accepted at 05:43
- 05:44 North attribution-watch closes
- 05:46 archive 18-07 continuity-transfer queue
- 05:51 one-time handshake to JKT-R7
- contractor Aster Recovery
- Maya owns perimeter / warrant
- Cheryl protects Singapore mirror
- no live credential crosses border
- relay R-18 is physically correlated
- reader clock is normalized
- supported relay is isolated lawfully
- residual path remains active
- secondary continuity is supported
- Decision Owner remains unresolved
- Phase VIII handoff is ready

Required Phase VII flags remain:

- `ch4_p7_facility_lawfully_inspected`
- `ch4_p7_reader_clock_normalized`
- `ch4_p7_r18_correlated`
- `ch4_p7_isolation_order_authorized`
- `ch4_p7_residual_path_observed`
- `ch4_p7_secondary_continuity_supported`
- `ch4_p7_decision_owner_unresolved`
- `ch4_p7_phase8_handoff_ready`

Checkpoint: `ch4_phase7_complete`

---

# 18. CHAPTER IV FINAL END-STATE

When Phase VIII is owner-accepted:

- Jakarta operation closed
- Decision Owner unresolved
- North publicly removed / secretly alive
- false-success belief preserved
- Arman remains suspect
- Adrian remains suspect
- Ika remains suspect
- Narin remains suspect
- Kittisak becomes an active suspect direction
- Somchai carries emerging custody / execution suspicion
- `R.` is next major lead
- Elena remains low-signal and unproven
- Benedict and North depart Indonesia
- Bangkok arrival reserved for Chapter V Phase I

Mark `CHAPTER IV · COMPLETE` and `Phase VIII · SHADOW OF THE TRUTH · Owner-tested and accepted` only after actual owner acceptance.

After Phase VIII acceptance: update Master Plan to Chapter IV complete, lock Chapter IV final flags, lock final geography, lock evidence carried into Chapter V, prepare Chapter V Handoff Brief, and open a new production room for Chapter V Phase I.

---

# 19. HIDDEN CASE ARCHITECTURE / ENDING PROFILE - CANONICAL SYSTEM CONTRACT

## 19.1 Purpose

The Hidden Case Architecture converts the player's investigation history into a set of invisible legal / evidentiary case states.

It exists to answer:

> **Given everything this player actually did and preserved, which principal case can Benedict and the institution now sustain?**

It does not replace visible relationship systems.

## 19.2 Canonical suspect profiles

Track independent hidden profiles for:

- Kittisak
- Narin
- Adrian
- Arman
- Ika
- Somchai as conditional / support route
- Elena as true-principal convergence route

Rin is primarily a witness / record state, not a default false-conviction principal.

## 19.3 Recommended case dimensions

Each principal profile should be able to derive or store these conceptual dimensions:

- `attribution` - how strongly evidence links the person to decision ownership
- `motive` - strength of plausible murder motive
- `means` - capability / delegated capability
- `opportunity` - physical, temporal or command opportunity
- `concealment` - real obstruction / lying / evidence handling
- `corroboration` - cross-source support
- `admissibility` - how much of the case can survive legal scrutiny
- `evidenceBreadth` - number and independence of evidence classes
- `institutionalSupport` - whether the charge can realistically be sustained
- `contradictionPressure` - surviving facts the theory cannot explain

Do not expose these dimensions to players or North QA.

## 19.4 Global integrity state

Preserve and extend existing ending-profile concepts such as:

- `evidenceIntegrity`
- `attributionProof`
- `chainOfCustody`
- `witnessProtection`
- `northSafety`
- `allianceStrength`
- `publicRecordControl`
- `institutionalTrust`
- `corroborationBreadth`
- `alternativeHypothesesPreserved`
- `rinStatus`
- `physicalTruthIntegrity`
- `chronologyIntegrity`
- `originalRecordIntegrity`
- `finalCaseVersion`

The previous conceptual field `finalAccused` is deprecated as a player-choice concept. If retained for compatibility, it must represent the **backend-resolved principal**, never a player-selected name. Preferred future field name: `resolvedPrincipal`.

## 19.5 Mystery-specific tracked state

Recommended conceptual tracking from Phase VIII onward includes:

- `cooperationParadoxRecognized`
- `institutionalContainmentExposed`
- `preAsterIkaHistorySupported`
- `armanDeepLedgerSupported`
- `adrianHiddenContinuitySupported`
- `narinConcealmentSupported`
- `kittisakOffbookProgramSupported`
- `somchaiOffbookTransferSupported`
- `elenaLatentEvidence`
- `elenaDecisionBridge`
- `elenaAttributionConvergence`
- `elenaProsecutabilityConvergence`

Do not add state fields casually. Every field must map to a real gameplay decision, evidence object, narrative dependency, ending consequence and Save / Load behavior.

## 19.6 Hidden Choice Ledger - source of auditability

Every hidden scoring event from the new architecture should have a stable unique source key.

Conceptual ledger entry:

```text
sourceId: ch5_p3_preserve_original_map
chapter: 5
phase: 3
choice: preserve_original
deltas:
  kittisak.attribution +2
  narin.corroboration +1
  adrian.contradictionPressure +1
global:
  originalRecordIntegrity +4
reason: Player preserved the unsanitized mapping instead of accepting the institutional export.
```

The ledger is owner-only diagnostic data.

No score toast or player-visible meter is generated.

## 19.7 Idempotency and restart rules

Scoring must never double-apply because a player:

- loads a save
- revisits a screen
- resumes after backgrounding the app / browser
- restarts a phase
- uses a supported route continuation

Each scoring source needs stable identity.

If the same choice is restored, its contribution is applied once.

If Restart Current legitimately returns to a point before a choice and the player selects a different option, the previous choice contribution must be replaced / reversed consistently rather than stacked.

Derived totals should be reproducible from the canonical ledger + surviving evidence / route state.

## 19.8 Legacy Choice Interpreter - Chapters I through IV Phase VII

Accepted earlier Runtime is not rewritten.

At first hidden-engine initialization, a versioned interpreter reads only facts that the old Runtime actually persisted, such as relevant:

- `state.flags`
- `state.personality`
- `state.found`
- relationships only when an old choice can be unambiguously inferred from a dedicated stored flag
- chapter-specific state already present
- accepted evidence / checkpoint state

The interpreter converts those facts into baseline hidden-case contributions.

Rules:

1. do not infer a choice that was not actually stored
2. do not use current visible relationship percentages as murderer scores
3. do not change relationship values
4. do not rewrite earlier scenes
5. write a `caseProfileVersion` / migration stamp so the same legacy state is not backfilled twice
6. owner Dev Inspector must show which legacy inputs produced which hidden contributions

Chapter I may contribute only from genuinely persisted investigative state. It must not receive arbitrary fabricated score because the chapter contains fewer explicit choices.

## 19.9 Choice influence doctrine

A single choice may affect multiple suspect cases and global integrity values. This is preferred because it prevents transparent `choice A = suspect A` logic.

A choice may:

- strengthen one suspect
- create a contradiction against another
- improve evidence integrity
- damage witness cooperation
- preserve an alternative hypothesis
- change future adaptive-scene eligibility

No ordinary choice should directly write `resolvedPrincipal`.

## 19.10 Eligibility before strength

A false-principal case becomes prosecutable only if minimum gates are satisfied.

Conceptual minimum:

- at least three independent evidence classes by endgame
- plausible motive
- means or delegation capability
- opportunity or decision path
- authentic concealment / obstruction
- adequate admissibility
- no fatal contradiction

Only after eligibility does the resolver compare prosecutable strength.

## 19.11 Elena Convergence Gate - separate and stricter

Elena is not allowed to win merely by having the highest hidden number.

### Attribution convergence

Requires multiple independent truths to converge on Elena as Decision Owner / murderer.

### Prosecutability convergence

Requires enough clean evidence to sustain that historical truth legally.

Canonical conceptual gates include:

- usable physical / human bridge
- usable chronology / decision-order bridge
- usable original-record bridge
- usable Last Record / Rin state
- sufficient chain of custody
- sufficient independent evidence classes
- North technical attribution preserved where required
- at least one latent Elena clue surviving in its original innocuous form
- false-principal contradictions preserved strongly enough to separate execution layers from decision ownership

Owner Dev Mode may display each gate. Normal play and North QA must not.

## 19.12 No early mathematical lock

The case architecture should remain recoverable and competitive deep into the game.

Balance target:

- no ordinary Chapter I-IV choice should mathematically force a final suspect
- Chapter V should influence, not permanently decide
- Chapter VI may make routes substantially stronger or weaker but should preserve multiple viable outcomes
- Chapter VII evidence / preservation decisions finalize legal viability

An early irreversible event is allowed only when it physically destroys or preserves something that cannot plausibly be recreated. Even then it affects proof availability, not historical truth.

## 19.13 Score balancing target by story period

Early choices matter, but the ending must not be predetermined before the mystery matures.

Use this as a balancing principle, not a mandatory arithmetic formula:

- Chapter I-II: foundational influence only
- Chapter III-IV Phase VII: meaningful prior-case shaping but not route lock
- Chapter IV Phase VIII + Chapter V: active case-building influence
- Chapter VI: strongest route divergence
- Chapter VII: legal viability and final resolution

If internal numeric weights are later introduced, they must preserve this progression.

## 19.14 Deterministic resolver

Identical canonical state must always resolve identically.

No random numbers, time-based tie breaks or device-dependent behavior may select the ending.

The resolver output must be explainable in Owner Developer Mode through:

- eligibility
- score / strength
- evidence breadth
- contradictions
- gate status
- tie-break reasoning

## 19.15 Projected ending is diagnostic only

Owner Developer Mode may show `PROJECTED ENDING` during development.

That value is not a permanent lock until the canonical final resolver point in Chapter VII.

Later choices must be capable of changing the projection when logically justified.

---

# 20. PHASE VIII PRODUCTION GATE

Do not begin Phase VIII implementation until the Phase VIII story board passes all of these:

1. No Elena reveal.
2. No Decision Owner proof.
3. Cooperation Paradox is player-discovered.
4. Earlier cooperation is reinterpreted without contradiction.
5. Arman suspicion increases.
6. Ika suspicion reopens through pre-Aster uncertainty.
7. Adrian remains viable.
8. Narin remains viable.
9. Kittisak is seeded as a future top-tier suspect.
10. Somchai receives a plausible suspicious handling path.
11. `R.` becomes the next lead.
12. North false-removal record remains accepted.
13. Elena receives minimal narrative attention.
14. No gendered antagonist clue narrows the principal.
15. Chapter IV ends before Bangkok arrival.
16. Save / Load handoff is planned.
17. At least three future false-principal case lines are materially strengthened.
18. Nothing in Phase VIII prevents five false-conviction variants later.
19. Hidden Case Architecture initialization is planned without modifying accepted P1-P7 player-facing behavior.
20. Legacy choice backfill is versioned and idempotent.
21. Relationship UI remains unchanged.
22. Owner Dev Inspector requirements are defined.
23. North QA receives no hidden score / route / Elena-gate information.
24. Phase VIII does not adaptively branch so aggressively that the Chapter V mystery begins pre-decided.
25. Save / Load persistence for hidden case state is designed before any Phase VIII score becomes canonical.

If any gate fails, Phase VIII story design is not production-ready.

---

# 21. MASTER MYSTERY QUALITY STANDARD

## 21.1 Non-negotiable end-to-end quality bar

The plot from Chapter IV Phase VIII through the final resolution of Chapter VII must be designed as one integrated mystery architecture, not as independent phases connected afterward.

It is not sufficient for individual scenes to be clever. The complete chain must be strong enough that a first-time player can rationally build several wrong murder cases, remain confident in at least several of them deep into Chapter VII, overlook Elena for most of the investigation, and still feel that the final Elena reconstruction was fully earned rather than withheld.

The intended final emotional sequence is:

1. **Rejection:** `Elena? That cannot be right.`
2. **Disorientation:** several earlier certainties begin to change meaning at once.
3. **Recognition:** previously ordinary details lock together across Chapters IV–VII.
4. **Inevitability:** the player realizes the answer was present but distributed below the threshold of suspicion.
5. **Aftershock:** replaying earlier scenes reveals a much deeper causal architecture without changing what factually happened.

The desired reveal is therefore not merely surprising. It must achieve the mystery ideal of feeling **nearly impossible before reconstruction and disturbingly inevitable after reconstruction**.

Every phase from Chapter IV Phase VIII onward must therefore carry all four functions:

- advance at least one strong non-Elena principal theory
- preserve or strengthen at least one competing theory
- plant, preserve or reinterpret a future evidentiary dependency
- avoid increasing Elena's visible suspicion beyond the allowed stage

No major twist may exist only because `Elena predicted it` without a reconstructable mechanism. Every major Elena success must be explainable through prior information, incentives, branching preparation, human behavior or system structure.

No phase may cheaply clear a major suspect. If one theory materially weakens, another credible interpretation, hidden liability or evidentiary bridge must keep the suspect architecture dense unless the endgame has explicitly reached the theory-collapse stage.

Blind playtesting is authoritative for this quality bar. If testers repeatedly identify Elena early, describe one false suspect as obviously fake, or cannot explain why a wrong arrest felt justified, the relevant plot section fails regardless of how clever it appears on paper.

## 21.1A Adaptive-ending quality bar

The adaptive system passes only if:

- different player histories can produce different dominant suspects without changing historical facts
- the route feels causally connected to prior choices
- players cannot easily reverse-engineer hidden scoring from button wording
- a player cannot force Elena merely by acting suspicious of Elena in dialogue
- no single choice dominates the whole ending
- Chapter V variation feels subtle rather than like a branch-selection menu
- Chapter VI variation creates genuinely different theory pressure
- Chapter VII resolution feels like culmination, not surprise arithmetic
- the same save state resolves deterministically
- Save / Load never changes projected ending unless the player's actual canonical state changes

If an ending feels arbitrary when the Owner Inspector's ledger is reviewed, the scoring model fails even if the code is technically correct.

## 21.2 Core mystery standard

The Season 2 story from Chapter IV Phase VIII through Chapter VII must be written to this standard:

> **The smartest visible people in the story are still solving the wrong causal problem for most of the game.**

They can correctly identify the toolmaker, deployer, violent operator, architect, institutional gatekeeper, cleaner and registrar, and still fail to identify the Decision Owner.

Elena's superiority comes from designing a crime in which correct intermediate answers naturally produce the wrong final answer.

The final reveal is successful only if earlier scenes become richer on replay, prior clues remain fair, no retcon is required, false suspects remain genuinely guilty of other serious acts, the player understands why each wrong theory looked complete, Elena's visible footprint was extremely small, and Elena's invisible causal importance becomes enormous only after reconstruction.

The desired end-state is not:

> "Elena fooled everyone because she hid the evidence."

It is:

> **"Elena built a crime in which the evidence told the truth about almost everyone except the question that mattered most."**

That is the canonical mystery direction for LAST WITNESS from Chapter IV Phase VIII through Chapter VII Final.

---

# 22. CURRENT PHASE VII PRODUCTION / QA BASELINE TO PRESERVE

This section records accepted current Runtime facts that must not be lost during the story-architecture correction.

## 22.1 Runtime and repository state

- current documentation HEAD observed before this replacement: `6ad6b5ddbbb8d8eab80cba9cf6a954a88b490f32`
- current Runtime code/assets baseline: `a810e4d582c03ca1df08163ab6c47f725dc15c8f`
- Runtime build: `0.20.9`
- current playable boundary: Chapter IV Phase VII
- Phase VIII is not yet implemented

## 22.2 Phase VII timeline / cards

Canonical Phase VII timing:

- Day 6
- 07:22 WIB
- North Jakarta · Indonesia
- JKT-R7 Relay Facility
- exterior approximately 07:22
- security corridor approximately 07:27
- relay core approximately 07:30
- maintenance window 07:30-07:45

Phase VII uses the established phase / location / time card language.

No extra redesign is authorized.

## 22.3 Phase VII media package

Accepted image paths:

- `assets/images/chapter-04/phase-07/jkt-r7-exterior.jpg`
- `assets/images/chapter-04/phase-07/security-corridor.jpg`
- `assets/images/chapter-04/phase-07/relay-core.jpg`

Opening cinematic:

- H.264 portrait video
- package path remains the accepted Phase VII opening cinematic path in Runtime
- plays between Phase VI handoff and Phase VII location card
- diegetic audio direction remains accepted

Climax cinematic:

- package path: `assets/video/chapter-04/phase-07/climax-relay-anomaly.mp4`
- accepted as-is unless a reproducible owner-reported defect appears

Do not reopen accepted Phase VII cinematic work for optional polishing.

## 22.4 Phase VII audio

Accepted musical direction:

- Industrial Noir loop
- Climax tension loop
- supporting ambience / SFX package

Do not modify Phase VII audio lifecycle without a reproducible defect or Phase VIII integration requirement.

## 22.5 Phase VII minigame

Canonical minigame:

`RELAY ISOLATION MATRIX`

Difficulty target:

approximately medium, around 5/10, with no hard-failure state.

### Step 1 - TIME NORMALISATION

Known values:

- handshake: 05:51:00
- reader clock: 14 seconds slow
- normalized event: 05:50:46

Flag:

`ch4_p7_reader_clock_normalized`

### Step 2 - PHYSICAL CORRELATION

R-18 is the supported match to:

- Queue 18-07
- one-time path
- Aster maintenance window 07:30-07:45

Flag:

`ch4_p7_r18_correlated`

### Step 3 - ISOLATION ORDER

Correct principle:

- isolate R-18 only
- preserve Singapore mirror
- do not transfer a live credential across border

Flag:

`ch4_p7_isolation_order_authorized`

Then play the accepted climax sequence.

## 22.6 Original portrait requirement

Phase VII uses the global Original portrait system.

Phase VIII should continue that system for ordinary dialogue.

Do not use `LastWitnessPhase6PortraitAssets` as the ordinary Phase VIII dialogue source.

## 22.7 Dev / QA baseline

Build `0.20.9` established the canonical Chapter IV Developer Mode / North QA repair.

Preserve:

- exactly seven canonical Chapter IV Dev buttons until Phase VIII is implemented
- no separate internal Token Verification phase button
- state-first Phase II / Phase III shared-lab identification
- no Chapter III preflight flash during Chapter IV direct Dev jump
- no duplicate phase shortcuts

When Phase VIII is implemented and owner-approved for tester access, Chapter IV Developer Mode may expand to exactly eight canonical entries.

## 22.8 Mobile baseline

The accepted Phase VII mobile repair fixed the Step 3 footer / control clipping issue.

Do not regress this layout when sharing components or CSS with Phase VIII.

## 22.9 Thai dialogue baseline

Phase VII Thai dialogue was previously audited and accepted for forward development.

Do not rewrite Phase VII Thai merely because the Master Plan story architecture changes.

## 22.10 Phase VII final Benedict logic

The accepted Phase VII closing interpretation remains:

The important question is not merely who touched one relay, but who needed the operation to continue when the visible operator was absent.

This line of reasoning supports Phase VIII's Cooperation Paradox and layered-responsibility investigation without identifying Elena.

## 22.11 Save risk reminder

The existing Phase VII scoped Chapter IV Save / Restore bridge is not proof that the entire Save Manager serializes every future Chapter IV / ending field correctly.

Phase VIII acceptance must explicitly test:

- manual Save / Load
- resume from Phase VII completion
- Chapter IV object persistence
- `endingProfile` persistence
- Phase VIII evidence persistence
- false-removal state
- `R.` handoff state
- Restart Current
- Return to Title

Do not call Chapter IV complete until these owner-critical paths are tested.

---

# 23. ADAPTIVE NARRATIVE ARCHITECTURE - CALCULATE / INFLUENCE / DIVERGE / RESOLVE

## 23.1 Four-stage model

The canonical adaptive progression is:

### Chapter IV Phase VIII - CALCULATE

- initialize / migrate Hidden Case Architecture
- derive baseline state from accepted Chapters I-IV Phase VII
- do not dramatically branch the story
- begin Cooperation Paradox
- establish future suspect competition

### Chapter V - INFLUENCE

- hidden case state changes emphasis softly
- strongest two or three theories influence follow-ups
- shared spine remains dominant
- no route is treated as final

### Chapter VI - DIVERGE

- hidden state changes pressure targets and investigation routes materially
- Controlled Leak / Continuity Protocol scenes support multiple variants
- suspect reactions differ in prominence
- evidence preservation begins to create serious ending differences

### Chapter VII - RESOLVE

- hidden case states, evidence gates and legal viability determine final path
- no player killer-selection screen
- final route becomes automatic and deterministic

## 23.2 Shared facts, adaptive interpretation

Adaptive scenes may change:

- emphasis
- scene order where continuity allows
- follow-up dialogue
- optional short scene availability
- interrogation pressure
- which suspect reacts on-screen
- which evidence is foregrounded
- which legal theory becomes easiest to prosecute

Adaptive scenes may **not** change:

- who historically committed the murders
- fixed past events
- physical facts already canonically established
- the meaning of an evidence object merely because a score needs to rise

## 23.3 Anti-snowball rule

The leading case must not receive only reinforcing content.

Every substantial leader-focused adaptive sequence must do at least one of the following:

- preserve a competing theory
- expose a contradiction
- strengthen a second suspect
- increase legal risk while increasing narrative suspicion
- improve one evidence class while weakening another

A route should feel alive, not mechanically self-confirming.

## 23.4 Top-pair / top-three targeting

Whenever practical, adaptive scene selection should consider a cluster of viable theories rather than only `highestScore`.

This creates combinations such as:

- Kittisak + Narin pressure
- Adrian + Arman pressure
- Ika + Narin pressure
- Kittisak + Somchai internal-control pressure

The pair or trio can influence dialogue and optional content without changing canonical facts.

## 23.5 Elena exclusion from ordinary adaptive spotlight

Elena hidden values must not cause the system to suddenly give Elena more screen time before Chapter VII.

Her hidden route is governed by latent evidence and convergence, not by ordinary suspect-pressure branching.

A rising Elena backend state should usually remain invisible until FINAL RECONSTRUCTION.

## 23.6 Choice wording rule

Avoid choices that transparently reveal the hidden system, such as:

- `Trust Kittisak`
- `Suspect Narin`
- `Investigate Elena`
- `Build the Arman case`

Prefer choices grounded in investigation behavior, such as preserving an original, widening a warrant, compartmentalizing a witness, confronting a ledger inconsistency, accepting or rejecting a sealed transfer, or choosing which evidentiary risk to tolerate.

## 23.7 Narrative consequence rule

A hidden score should never be the sole reason a scene exists.

The scene must first make sense as story. The scoring model then records what that story event did to the case.

> **Story creates score consequences. Score does not invent arbitrary story facts.**

---

# 24. OWNER DEVELOPER MODE - HIDDEN CASE INSPECTOR CONTRACT

## 24.1 Purpose

The owner must be able to inspect and balance the invisible ending system without exposing it to players or North QA.

## 24.2 Required owner-only dashboard

Recommended sections:

### CURRENT CASE LEADERS

Show each suspect's:

- total derived case strength
- eligibility state
- prosecutability state
- key dimensions
- contradiction pressure
- current rank

### ELENA CONVERGENCE

Show:

- hidden Elena attribution strength
- attribution gate state
- prosecutability gate state
- each required gate PASS / FAIL
- independent evidence class count
- missing legal bridge

### GLOBAL EVIDENCE HEALTH

Show:

- evidence integrity
- original record integrity
- chronology integrity
- physical truth integrity
- chain of custody
- witness state
- Rin / Last Record state
- North state

### CURRENT ADAPTIVE TARGET

Show:

- current top theory
- secondary theory
- optional third theory
- next scene pressure recommendation / resolved variant ID

### PROJECTED ENDING

Show current projection as diagnostic only:

- TRUE CONVICTION
- RIGHT NAME, NO CASE
- FALSE CONVICTION · KITTISAK
- FALSE CONVICTION · NARIN
- FALSE CONVICTION · ADRIAN
- FALSE CONVICTION · ARMAN
- FALSE CONVICTION · IKA
- THE PERFECT RECORD

### CHOICE AUDIT LEDGER

For every contribution, show:

- source ID
- chapter / phase
- player choice / state source
- score delta
- global gate delta
- reason
- whether it came from legacy backfill or new Runtime

## 24.3 Dry-run Ending Simulator

Owner Developer Mode should support a non-destructive `Resolve Current State` diagnostic.

Default behavior must be read-only / dry-run.

It should explain:

- which cases are eligible
- which are blocked
- why Elena is locked / unlocked
- why the projected ending wins
- tie-break reasoning

Do not autosave simulator experimentation into a normal canonical player save.

## 24.4 North QA hard exclusion

North QA must not receive a hidden inspector tab, hidden route preview, suspect scores, gate values or simulator.

North QA exists to test the experience without being told the answer architecture.

## 24.5 No normal-player leakage

Do not render hidden values in:

- Character Journal
- Case File
- Dialogue History
- normal Settings
- player-facing debug toast
- progress bar
- accessible labels intended for normal UI

---

# 25. LEGACY CHOICE BACKFILL PLAN - ACCEPTED CHAPTERS I-IV PHASE VII

## 25.1 Goal

Make choices already completed before the hidden engine existed matter without reopening accepted production.

## 25.2 Method

Create one additive, versioned interpreter that reads current accepted state.

Preferred conceptual implementation boundary:

- one new hidden-case engine module
- one legacy interpreter layer
- one owner inspector layer
- one minimal persistence extension

Do not scatter invasive score patches throughout old scene files unless a genuine integration requirement makes a tiny hook unavoidable.

## 25.3 Backfill hierarchy

Interpret earlier state in this order:

1. dedicated explicit choice flags
2. evidence collected / preserved state
3. chapter-specific explicit outcome flags
4. personality counters only where they directly correspond to stored explicit choices
5. relationship deltas only when a dedicated choice flag independently identifies the source

Never reverse-engineer murderer score from a visible relationship percentage.

## 25.4 Unknown old choice = no invented score

If an earlier decision was not persisted and cannot be determined reliably, assign no fabricated contribution.

Fairness is more important than forcing every old click to count.

## 25.5 Backfill balance

Legacy Chapters I-IV Phase VII establish tendencies, evidence health and initial theory pressure.

They must not make Chapter V-VII irrelevant.

P8 should therefore begin with meaningful but still contestable case states.

## 25.6 Backfill QA

Owner Developer Mode must show a separate `LEGACY BACKFILL` ledger section so the owner can verify exactly what old state generated the initial scores.

Test at least:

- fresh New Game save reaching P8
- existing P7 completion save
- manual save from earlier chapter if available
- load / migrate / load again without double application

---

# 26. HIDDEN CASE SAVE / RESTORE INTEGRITY

## 26.1 Source-of-truth rule

The system must be able to explain derived totals from canonical ledger + evidence / witness / route state.

Do not let opaque accumulated numbers drift independently of the events that created them.

## 26.2 Versioning

Maintain a version such as `caseProfileVersion`.

When calculation rules change during development, provide a controlled migration / rebuild path for owner testing rather than silently mixing score models.

## 26.3 Restore order

On restore:

1. restore ordinary accepted game state
2. restore / migrate hidden architecture state
3. validate ledger uniqueness
4. recompute / validate derived case totals
5. restore adaptive route state only where needed
6. resume scene

Hidden scores must be ready before an adaptive Chapter V-VII scene chooses its variant.

## 26.4 Restart behavior

`Restart Current` must return hidden case state to the canonical state at that restart boundary.

A player must not be able to accumulate score by repeatedly restarting and reselecting choices.

## 26.5 Dev jump behavior

Owner Dev jumps may create synthetic test prerequisites, but synthetic state must be clearly marked in Owner Inspector.

North QA jumps must not reveal hidden state.

Synthetic Dev test state must not accidentally contaminate a normal player's save.

## 26.6 Persistence acceptance matrix

Before the hidden architecture is considered stable, verify:

- New Game -> choices -> save -> load -> identical hidden result
- P7 legacy save -> P8 migration -> save -> load -> identical hidden result
- repeated load does not change score
- repeated scene entry does not change score
- Restart Current does not stack deltas
- changing a replayed choice correctly replaces prior contribution
- language change does not affect hidden score
- device viewport does not affect hidden score
- Owner Inspector does not mutate state while merely viewing

---

# 27. IMPLEMENTATION ORDER - DO NOT SKIP

The production sequence from the current accepted P7 boundary is:

1. **Upload / adopt this Master Plan as canonical documentation.**
2. **Do not modify accepted P1-P7 player-facing Runtime.**
3. Design exact Hidden Case schema and stable source IDs.
4. Design legacy interpreter mapping for persisted Chapter I-P7 choices / evidence.
5. Design deterministic resolver and Elena Convergence Gates.
6. Design Owner-only Dev Inspector.
7. Design minimal backward-compatible Save / Restore extension.
8. Write the complete Phase VIII story board against the new system.
9. Verify P8 Production Gate.
10. Implement Phase VIII.
11. Owner real-device test P8 including Save / Load and hidden inspector.
12. Mark Chapter IV complete only after owner acceptance.
13. Freeze Chapter IV final state and produce Chapter V Handoff Brief.
14. Start Chapter V in a new production room.
15. Implement Chapter V soft adaptive `INFLUENCE` architecture.
16. Blind-test suspicion distribution.
17. Implement Chapter VI `DIVERGE` architecture only after Chapter V state is stable.
18. Implement Chapter VII resolver / endings only after all upstream choice mappings are audited.
19. Run complete ending simulation matrix and blind playtest.
20. Do not call the Season 2 mystery complete until every ending route is explainable from the ledger and emotionally credible.

---

# 28. ENDING BALANCE / SIMULATION MATRIX - REQUIRED BEFORE FINAL PRODUCTION

## 28.1 Minimum route simulations

Create owner test states for at least:

- Kittisak false conviction
- Narin false conviction
- Adrian false conviction
- Arman false conviction
- Ika false conviction
- Elena true conviction
- Elena right-name-no-case
- Perfect Record

## 28.2 Each false conviction must answer

For each route:

- why the player reasonably believed this suspect
- what real crime the suspect committed
- what evidence classes support the case
- what motive appears plausible
- what means / opportunity appears plausible
- what obstruction is authentic
- what contradiction survives
- why the institution still accepts the wrong case
- what later replay detail reveals the deeper truth

## 28.3 Elena true-conviction simulation

Must prove that the route cannot be reached merely by:

- choosing guarded dialogue with Elena
- collecting one Elena clue
- maximizing a visible Suspicion bar
- one Chapter VII choice

It must require distributed investigative quality across multiple chapters.

## 28.4 Balance failure conditions

FAIL if:

- one suspect wins most routes regardless of choices
- Elena is too easy to unlock
- Elena is mathematically impossible to unlock through reasonable high-quality play
- early choices overwhelm late evidence
- late choices erase the significance of the whole prior game
- a one-point tie creates a radically different ending without legal rationale
- the projected ending changes after Save / Load with no player action
- a false conviction lacks prosecution-grade support

---

# 29. ZERO-QUESTION NEW-ROOM CONTINUATION CONTRACT

This section exists so a future production room can continue immediately without asking the owner to repeat established facts.

## 29.1 Project identity

- Game: LAST WITNESS
- Studio: BENEDICT INTERACTIVE
- Repository: `grolygori789-crypto/last-witness`
- Production / default branch: `production-rebuild`
- Mobile-first portrait 9:16
- Primary practical target: Android Chrome
- Additional target: modern iOS Safari
- Art: neo-noir graphic novel / cel-shaded / heavy ink / angular shadows / premium mobile readability

## 29.2 Current production boundary at this revision

- Authoritative accepted Runtime build: `0.20.9`
- Runtime code/assets baseline: `a810e4d582c03ca1df08163ab6c47f725dc15c8f`
- Current playable boundary: Chapter IV Phase VII · RELAY FACILITY CLIMAX
- Phase VII quick owner review: satisfactory / acceptable for forward development
- Not a full regression certification
- Phase VIII not implemented
- Next production objective: Chapter IV Phase VIII · SHADOW OF THE TRUTH
- Chapter IV contains exactly eight phases
- Chapter IV Phase IX does not exist without explicit owner approval

## 29.3 Immutable production boundary

Chapter I through Chapter IV Phase VII is accepted and maintenance locked.

Do not reopen working systems because a new architecture would be easier to implement by rewriting them.

Visible Relationship / Character Journal systems remain unchanged.

## 29.4 Immediate narrative objective

Phase VIII must:

- close Jakarta operationally
- expose Cooperation Paradox
- keep Decision Owner unresolved
- preserve North's public false removal / secret survival
- establish `R.` as next lead
- strengthen Arman, Adrian, Ika, Narin, Kittisak and Somchai suspicion paths
- keep Elena low-signal
- end before Bangkok arrival
- hand off to Chapter V

## 29.5 Historical truth

- Elena is the true mastermind / Decision Owner
- Elena killed Kawin and Daniel
- Elena selected victims, timing, room / discovery conditions and cleanup priority
- Adrian built lawful architecture and concealed a continuity / emergency path
- Arman adapted wrapper / brokerage and knows more than he disclosed
- Narin supplied / executed trusted Bangkok deployment and concealed real wrongdoing
- Ika is a violent later Aster field operator with hidden pre-Aster history but is not historically the Kawin / Daniel killer
- Kittisak has a serious off-book institutional containment secret and must become a top-tier false principal
- Somchai performs off-book transfers / protected handling and must become strongly suspicious
- Rinrada `Rin` Sornchai is future `R.` / Last Witness / former Identity and Access Registrar

## 29.6 Elena standard

Elena is a fictional cognitive outlier vastly beyond conventional genius calibration.

Writer-room calibration:

- far beyond Einstein shorthand on fictional cognitive scale
- planning architecture vastly beyond Moriarty shorthand

Player-facing Elena remains ordinary, kind, credible, fallible in harmless ways, low-signal and easy to overlook.

Her genius is retrospective, branch-aware, multi-layered and reconstructable.

She does not win because everyone else is stupid.

## 29.7 Suspect architecture

Five mandatory false-principal cases:

1. Kittisak
2. Narin
3. Adrian
4. Arman
5. Ika

Somchai is mandatory high-suspicion cleaner / accomplice / conditional principal support.

Elena must remain below roughly 10% first-play suspicion for most blind testers until late Chapter VII.

## 29.8 Hidden Case Architecture

- all meaningful persisted choices from Chapter I-VII contribute where fair and auditable
- no killer-selection screen
- backend resolves ending automatically
- relationship UI stays unchanged
- hidden score is separate
- Phase VIII = CALCULATE
- Chapter V = INFLUENCE
- Chapter VI = DIVERGE
- Chapter VII = RESOLVE
- Elena needs score + separate Convergence Gates
- same canonical state must produce same ending

## 29.9 Visibility rule

Only Owner Developer Mode may see:

- hidden deltas
- suspect totals
- case dimensions
- route leader
- projected ending
- Elena gates
- choice ledger
- resolver diagnostics

Normal play and North QA must not.

## 29.10 Four ending families

1. TRUE CONVICTION
2. RIGHT NAME, NO CASE
3. FALSE CONVICTION
4. THE PERFECT RECORD

FALSE CONVICTION has mandatory Kittisak / Narin / Adrian / Arman / Ika variants.

## 29.11 GitHub rule

Do not write to GitHub without explicit current-turn owner authorization.

Normal workflow remains:

1. inspect Production
2. work locally
3. test
4. package replacement
5. owner uploads personally

## 29.12 New-room startup instruction

A future room receiving this Master Plan should **not ask the owner to repeat** project identity, current phase, hidden scoring rules, Elena canon, suspect canon, ending architecture, Dev / North QA visibility, P1-P7 lock, or GitHub write rule.

It should begin by:

1. reading this Master Plan
2. checking current repository HEAD / Runtime only if the task requires current repository truth
3. preserving the accepted boundary
4. identifying the exact next production objective
5. continuing from that objective

Ask a question only when a genuinely new owner decision is required and cannot be resolved from this document or current Runtime.

---

# 30. FINAL NON-NEGOTIABLE SUMMARY

The following rules override convenience:

- P1 through Chapter IV Phase VII player-facing Runtime is accepted and must not be casually changed.
- Relationship UI remains exactly as accepted.
- Hidden murderer / principal scores are invisible to players.
- Hidden score `+ / -`, totals, projected route and Elena gates are Owner Developer Mode only.
- North QA never sees them.
- The player never chooses the killer from a final list.
- Choices across Chapter I-VII accumulate into hidden case state.
- Ending identity is backend-resolved from eligible prosecutable cases.
- Phase VIII initializes the architecture.
- Chapter V adapts softly.
- Chapter VI diverges materially.
- Chapter VII resolves automatically.
- Kittisak, Narin, Adrian, Arman and Ika must each support a believable false conviction.
- Somchai must be strongly suspicious.
- Elena remains low-signal until late Chapter VII.
- Elena is historically the killer in every route.
- Elena's intelligence is superlative, branch-aware and retrospectively reconstructable.
- Elena cannot be convicted by highest score alone; Convergence Gates are mandatory.
- The final reveal must feel nearly impossible before reconstruction and disturbingly inevitable afterward.
- No retcon may be used merely to rescue weak plotting.
- No single clue solves the mystery.
- No single ordinary choice decides the ending.
- The scoring architecture must be deterministic, auditable, idempotent and Save / Load safe.
- Every alternate ending must be emotionally credible and traceable to the player's entire investigation.

This is the canonical continuation contract for LAST WITNESS from Chapter IV Phase VIII through Chapter VII Final.

