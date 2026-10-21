# ATS talk: language and tone review

Reviewed October 20, 2026 against GitHub main snapshot `c72bca20e15c7c53801416b00a0c84df9c4eb8ef`.

## Assessment

The talk has a useful argument: apply the course's lessons to work City staff have already started, organize that work, and ask leadership for specific decisions. Its best voice is an experienced practitioner talking candidly with colleagues. Keep that voice, the recognition of departmental work, the four-lesson structure, and the invitation to discuss.

The copy is not yet ready for presentation without revision. The main issue is credibility, not grammar. Several passages turn a sound recommendation into a universal rule, a technical guarantee, a claim of proven maturity, or a promise about the future. Other passages sound defensive about staffing and infrastructure. Those shifts could draw the room into disputes about authority and evidence instead of the proposed work.

Recommended voice: direct, informed, collaborative, and specific. State what exists, give staff credit, distinguish what is proposed, and explain what leadership would authorize. Confidence should come from concrete examples and clear limits.

This is a source-based editorial review, not a completed external fact check or a visual layout review. Suggested copy below is proposed wording, not an approved policy or a verified replacement fact. No slide content has been changed.

## Coverage and checks

- Read all 34 main slides in `docs/ats-talk-script.md`: titles, story lines, drawing labels, speaker notes, and confirmation notes.
- Compared all 34 slides with the six `src/talks/ats/script/part-*.ts` modules. Titles, story lines, narration, picture descriptions, and quoted labels match. There are 35 animation steps because slide 12b has two.
- Ran `node docs/tools/script-check.mjs docs/ats-talk-script.md`: 34 main slides, zero problems. That checks copy conventions and measured story-line widths; it does not validate tone, claims, or rendered layout.
- The speaker notes contain 4,832 whitespace-delimited words. At an illustrative 130–150 words per minute, that is about 32–37 minutes of speech before questions and pauses. The README's 25-minute description is stale relative to the current script's 36-minute plan.
- The referenced CMU backup presentation is not included as reviewable slides in this snapshot. It is mentioned at the end of the script, but the active deck contains the six ATS parts. Its wording remains unreviewed.

## Changes to make before presenting

### 1. Replace security guarantees with precise control language

“Put the rules where AI cannot break them” is memorable, but it sounds like a guarantee. “The technical controls are in place” and “already meets the standard the course teaches” go further than the listed evidence establishes. A build approval, a network boundary, and code history each address particular risks; they do not by themselves establish every agent control discussed in the talk.

Use a consistent lesson name: **Enforce limits through permissions and system controls.** In the explanation: “Instructions tell an agent what it should do. Permissions and system controls restrict what it can do.” Identify the controls actually confirmed, then name what still requires assessment. Apply this across 2a, 8, 14, 28, and the closing narration.

### 2. Separate examples, forecasts, and findings

Slide 3 presents the course's illustrative buy/boost/build split as measured spending. Its year labels are expressly unconfirmed in the script. Slide 4a turns one company's reported experience into “enterprise moved the review into the system.” Slide 6 assigns a single cause to several incidents without supplying the underlying evidence in the repository. Slide 22 adds “no method” and a training remedy to a study result without showing support for those conclusions.

Keep source, population, date, and uncertainty attached to each number. Attribute the investment split to the course and label it illustrative. Present company examples as examples. Treat the existing confirmation list as unresolved, even where the narration sounds certain.

### 3. Remove false precision from the track story

“A third of the way” and “with the pack within a year” imply a defined benchmark and a forecast. No scoring model, comparison group, or delivery plan is supplied. Preserve the track as an illustration if desired, but label it illustrative and remove numeric maturity claims.

Suggested slide 15 title: **The City already has practitioners, infrastructure, and experience building with agents.**

Suggested slide 27 title: **Five decisions would connect the work already under way and support the next stage.**

A one-year ambition can return as a target once it has milestones, accountable owners, resources, and a baseline.

### 4. Describe existing work fairly, without defending territory

“No AI team” discounts the practitioners introduced later unless it means no formally designated citywide program team. “One real control” dismisses other controls the talk itself later describes. “Counted properly” suggests others have counted improperly. “Before anyone asked” assumes facts about other departments' direction and sponsorship.

Similarly, repeated statements about not waiting for a program manager and keeping Azure staff where they are can sound like an argument over jobs. Frame these as delivery requirements: designated coordination, protected staff time, and continuity for infrastructure operations. Confirm the current organizational facts before using a revised claim.

### 5. Distinguish recommendations from adopted authority

Slides 24–26 state proposed authority levels, decision rights, and resident protections as if they were adopted City policy. Introduce them explicitly as recommendations for leadership's consideration.

Resolve “No-go”: does it mean prohibited even with approval, or prohibited from acting without approval? The current definition overlaps “Act with approval.” Also distinguish the degree of autonomy from the consequences of a mistake. An assistive output can still have high consequences.

### 6. Make the five decisions concrete

“Costs only calendar time” understates the staff commitment, and a later request for a budget contradicts the impression of a cost-free plan. “Each already half done” is an unsupported measurement. Data tiers and a budget arrive together late, although they are separate decisions.

For slide 27, describe five decision areas with an owner and next deliverable: designate the consortium and program team; sponsor listening and allocate staff time; commission or approve the authority framework at the appropriate stage; maintain the existing work under confirmed controls; commission the data-access and funding proposal. The exact authority and commitments need owner confirmation. Avoid presenting draft work with the CISO as the CISO's endorsement.

## Slide-by-slide review

Slide identifiers follow the script rather than the numerical position in the deck. “Revise” means an editorial change is needed; “priority” means the current wording could materially mislead or distract the audience; “keep/refine” means the main wording works with limited cleanup.

| Slide | Assessment | Finding and recommended direction |
|---|---|---|
| 1 | Keep/refine | The title and speaker identification work. In the notes, replace “better than most people in this building expect,” which presumes the audience's beliefs, with “We will look at the work already under way and what it would take to connect it.” Keep the invitation to interrupt if the schedule allows it. |
| 2 | Revise | “AI that does work on its own” leaves out delegated authority. Use “AI that can carry out tasks using tools, within limits people set.” The practical learning account is useful; confirm course format, dates, classmates, and the claim that every module ended with a build. |
| 2a | Priority | Keep the four lessons, but replace the unbreakable-rules promise, the absolute purchase sequence, and “cheap” as the sole risk measure. Suggested names: “Use the least autonomy the task needs”; “Enforce limits through permissions and system controls”; “Build staff capability alongside the technology”; “Start with work where mistakes have limited impact and are easy to correct.” Use the same names on their teaching slides and slide 28. |
| 3 | Priority | The story treats an illustrative course allocation as measured industry spending and supplies years the notes say are unconfirmed. Separate the survey result from the course framework. Replace “no vendor can sell...” with “City staff's knowledge of services is essential to choosing and applying these tools.” “Rented AI” could become “commercial AI services.” |
| 4 | Revise | The definition is useful, but “no person is watching each one” is unnecessarily absolute and creates tension with approvals later. Use “An agent can carry out several steps between human checkpoints.” Avoid making the 2023–2026 timeline look like fixed historical boundaries between overlapping technologies. |
| 4a | Priority | “Human in the loop worked for chatbots” and “that was enough” imply universal sufficiency. One company's volume does not establish that no staff could review it or that all enterprise adopted the same approach. Suggested title: “As agents produce more work, review needs automation and clear human checkpoints.” Describe AI review as one layer, alongside checks and approvals. Keep forecasts explicitly attributed. |
| 5 | Revise | Explain this as the fleet design being proposed or used, not a universal definition of fleets. “No agent grades its own work” is clear but needs the limit that a separate reviewer is not proof of correctness. “Routine actions run” should mean actions within an approved policy, not anything a checker happens to label routine. Clarify when people approve actions and when they approve final results. |
| 6 | Priority | “The best-known failures share one cause” is broader than the evidence shown. The notes' “AI did what it was built to do” can also excuse or misdescribe failures. Suggested title: “These cases show why permissions, spending limits, and customer-facing checks matter.” Verify each claimed mechanism and identify the chatbot case as such. Remove “the first review was the tribunal's,” a clever but unestablished claim. |
| 7 | Revise | The main principle is strong. The drawing conflates increasing technical flexibility with increasing autonomy: fixed automation can also act without approval. Explain these as approaches with different control needs, rather than an inevitable maturity ladder. Replace “climb one rung at a time” with “Choose the simplest approach that meets the need.” |
| 8 | Priority | Replace “cannot break” and “a quick review [is] enough.” Controls should follow consequences and data sensitivity as well as autonomy. Suggested body: “Use permissions and system controls to restrict actions. Add review and approval requirements based on the data involved and the consequences of an error.” An after-the-fact reviewer cannot stop the original action; revise that explanation too. |
| 9 | Revise | “Train ... before you buy” turns a staffing principle into an inflexible procurement rule. Keep the emphasis on staff knowledge, but use “Build staff capability alongside the technology.” Confirm the BNY training sequence and avoid presenting correlation with returns as proof that training caused the difference. |
| 10 | Revise | Keep limited-impact, reversible work as the entry point. Progressing through explore/validate/deploy/scale is different from choosing a harder project; the copy mixes them. Say “Move each project forward when its results and controls meet the next checkpoint.” Define gates briefly as review points. The six tests are useful screening criteria, not a complete scoring method by themselves. |
| 11 | Priority | Confirm the organizational claims. If accurate, say “The City has not yet established a dedicated citywide AI program, strategy, or budget.” Replace “One real control” with “The approved-tools policy provides a starting point.” Remove the dismissive “measured the way a consultant would measure it.” |
| 11a | Revise | “Strict limits alone push staff” is categorical and may sound like criticism of security colleagues. Use “When approved tools do not meet a need, staff may turn to unapproved tools.” Approved choices can improve visibility; they do not guarantee “real control.” Define shadow IT by lack of approval or oversight, not solely inability to see it. Confirm the population and question behind each survey number. |
| 12 | Priority | “Off paper” is awkward; “more ... than anyone has counted” cannot be established from the examples. Use “Departments already have AI services, pilots, and prototypes under way.” Put that maturity distinction on screen, not only in the notes. Teaching AI and consulting residents about AI are activities, not necessarily deployed AI uses. Confirm the assertion that these teams have never met together. |
| 12a | Revise | Keep recognition and departmental credit. Separate awards, coverage, participation in programs, and invitations; do not imply each is an award for AI. “There is more” should become “An inventory would help us understand the full picture.” Use the precise scope of each recognition once confirmed. |
| 12b | Keep/refine | Staff voices help the talk feel collaborative. Keep quotations verbatim and confirm their context, attribution, current titles, and intended notice to speakers. “Govern as you go” could sound like deploying before controls exist; label the synthesis “Build governance into the work.” The ninth-department count should be reconciled with the practitioner-group count rather than assumed to describe the same membership. |
| 13 | Priority | Good concrete foundation, but “cannot reach other City systems” is an absolute technical claim requiring confirmation. Name the confirmed boundary. Distinguish permission to experiment from approval to deploy. “The capacity to deploy is here” is ambiguous after acknowledging no written process. Prefer “The sandbox supports development; production use requires the City's approval process,” subject to confirmation of that process. Explain Azure as Microsoft's cloud on first use if needed. |
| 14 | Priority | “The controls ... are the ones the sandbox already has” and “technical controls are in place” overstate equivalence. Use “The sandbox provides several foundations the course recommends.” Source code history is not necessarily a record of every runtime action, and approval of a build is not approval of every action an agent might take. Name confirmed controls separately from remaining checks. The heading also promises all four lessons but shows four security controls instead. |
| 15 | Priority | Remove the unsupported one-third score and “counted properly.” Distinguish applications built with AI from applications that operate as agents. Counts of applications and modules do not establish passed gates; identify the criteria and approver or describe development/testing/deployment status without certification language. Suggested title: “The City already has practitioners, infrastructure, and experience building with agents.” |
| 16 | Priority | “No new organization” conflicts with the following program-team proposal. Say “We propose a small coordinating team drawn from existing staff.” Replace the implied zero cost with “The first phase needs designated staff time and coordination; it does not start with a platform purchase.” Do not state the City's agent count before the inventory exists. Frame the course's ten-agent threshold as guidance, not a universal rule. |
| 17 | Keep/refine | The open call is clear and actionable. Define consortium once as the standing practitioner group; after that, use one name consistently. Consider including staff evaluating or operating AI, not only building, piloting, or teaching. The Shopify anecdote distracts from the locally grounded proposal and could imply endorsement of unrestricted tool access. Equal chairs would better support the inclusive wording than larger chairs for favored departments. |
| 18 | Revise | The proposed team has a useful role. Replace “does not need to wait for a program manager” and “could assemble themselves” with “Leadership can designate an interim lead and allocate time from existing staff.” “It does not build” conflicts with the expert team “who build and govern” on slide 22; distinguish advice, shared foundations, and departmental delivery. Describe continuity for Azure operations once, without territorial repetition. |
| 19 | Keep/refine | Listening and a safe way to raise concerns are among the strongest passages. Simplify the title to “Listen to department leaders, staff, and residents before choosing projects.” “What is slow or broken” can become “Where does the work slow down, and what would help?” Replace the partner/gatekeeper contrast with a positive statement about agreeing priorities together. |
| 20 | Revise | The value/readiness chart is clear, but “six tests ... score” implies a rubric not supplied. Use “Assess each idea's value and readiness using the six criteria.” Give risk an explicit stopping role: high value and readiness should not override unacceptable consequences. Define readiness as data, ownership, skills, and approvals. |
| 21 | Revise | Preserve simultaneous delivery and foundational work. “One approved toolset” conflicts with slide 11a's range of approved tools. Prefer “A shared development approach and approved tools matched to the work.” Replace repeated “quick wins” with “small, useful projects” where possible, and say benefits will be measured instead of promising faster delivery every quarter. |
| 22 | Priority | “Level up” sounds casual relative to the rest of the executive talk; use “Build staff skills for the work they need to do.” Explain why developers are the first cohort while retaining a basic training path for everyone. The METR reference needs its study population and conditions; remove “no method” and the implied proof that training fixes the effect unless the source supports both. Align the expert team's role with slide 18. |
| 23 | Keep/refine | Goals, baselines, targets, and owners give the audience a practical standard. Add one illustrative service measure, such as turnaround time paired with error rate, without inventing a target. Keep activity counts as useful inputs rather than dismissing their value entirely. Verify the Strategic Plan title and priority name. Replace the abrupt “Three things” ending with a named transition to agent authority, ownership, and resident protections. |
| 24 | Priority | Fix “Sort each one into four levels” to “Assign each agent to one of four levels.” Label the scheme proposed. Resolve whether “No-go” means prohibited activity or activity requiring human authority, because its current definition overlaps the approval level. “Assist only” could include drafting, not just looking things up. Avoid “at the City's scale” until the inventory supports it. |
| 25 | Priority | Label decision rights as proposed and confirm them with the relevant leaders. “May never cross” differs from “may never do without a person”; settle that distinction. Keep the three practical questions. The CISO's standards/oversight role should not accidentally imply that the security office operates every control or owns every service risk. |
| 26 | Priority | The resident-centered intent is strong, but the slogan can imply every AI-assisted assessment is prohibited while slide 24 allows action with approval. Prefer “We propose keeping decisions that affect residents under accountable human authority.” Specify any prohibited uses separately. Present multilingual service as an application requiring quality checks, not an automatic benefit. Residents' feedback is essential but is not the only test of a project's merits. |
| 27 | Priority | Remove “each already half done” and “with the pack within a year.” Make each decision's owner, commitment, and next deliverable clear. “Calendar time” is staff capacity. “The approved tools list is tier one” does not establish a data-classification scheme. Separate maintaining approved existing work from granting wider operating authority. |
| 28 | Revise | Keep the return to the four lessons; it gives the narrative closure. Apply the revised lesson names exactly. Replace “the sandbox ... already does” with the specific controls it demonstrably provides. Tie lesson three to training as well as organizational structure; creating a team alone does not establish staff capability. |
| 29 | Keep/refine | Keep “Let's talk” and the two discussion questions. Trim the narration's unsupported maturity and reputation claims. Suggested closing: “Staff across departments have already built useful experience. We propose connecting that work, agreeing the controls, and giving the next phase clear ownership and staff time. What should we prioritize, and what would you need to make these decisions?” Do not promise accessible backup slides until they are actually included or available separately. |

## Consistency to carry through the next edit

- Use “we propose” for recommendations and “today” only for confirmed current facts. Use “could” for possibilities and “target” for ambitions.
- Keep the four lessons identical at introduction, teaching, and return. Do not rename them into a different claim mid-deck.
- Distinguish building software with AI agents from running AI agents inside resident-facing services.
- Distinguish controls on agent actions from approval of code and builds.
- Use “citywide” consistently. Define consortium, autonomy, sandbox, and gates once. Explain vendor/product names only as far as this audience needs.
- Use “AI program team” consistently; the notes currently introduce “governance team” without explaining whether it is the same body.
- Use “approved tools matched to the work and data” consistently, rather than alternating between a range and a single toolset.
- Use fewer references to what “the course says.” Attribute particular findings where needed, but let the presenters own their recommendations.
- Avoid repeated anticipatory praise: “better than you might think,” “the slide I most wanted to show,” and “a national reputation already attached.” Show the supporting work and let the audience assess it.
- Preserve natural, complete sentences. Do not shorten to meet a test if the shorter wording loses the meaning. Any approved copy revision must update the script and modules together and then be checked in the rendered deck.

## Evidence and owner confirmations still needed

The script has a facts-to-confirm list, but several of those unresolved points are stated as settled on screen. Before marking the presentation validated, resolve: the BCG dates and populations; the illustrative spending split; Anthropic/Faros metrics and definitions; incident causes; BNY sequence and figures; the METR interpretation; all City deployment/maturity claims; current team, strategy, budget and approval status; precise sandbox controls; award/quote provenance; and the proposed decision rights. A course attribution does not substitute for evidence when the slide asserts a current City fact.

This review identifies where wording outruns the evidence supplied. It does not certify the external claims or infer that an unresolved claim is false.
