# ATS talk script, v3: Agentic AI at the City, what we learned and what we would do first

Draft 3, 2026-10-20, rewritten to `story-plan-v3.md`. A talk of about 30 minutes for Austin Technology Services leadership, the Deputy CIOs first among them, given by Stefan Wray and Chris Collins. One click plays a whole slide, every slide stands on its own, and this document is the single source of every word on the stage and in the notes. Austin Technology Services branding. The CMU briefing deck Stefan built is the backup section for the security discussion and is not rewritten here.

**How to read it.** Each slide has three parts:
- **On screen:** the title, then the story lines that rise under the picture. Someone watching with no speaker should get the slide from these alone.
- **They see:** what the animation shows. One click plays the whole slide, and the slide ends on a still, complete picture.
- **You say:** what the speaker says. It adds detail, and the slide doesn't depend on it.

The `<!-- beat -->` comment under each heading names the part the slide plays in the story. `Speaker:` says who voices the slide. Neither is parsed or shown. `Note:` lines are facts to confirm before the deck is built.

## What the DCIOs should walk away with

1. Four ideas from the course they can repeat in a meeting, and the sense that they understood each one.
2. An accurate picture of where the City stands: where it looks like it is, where it is once its own work is counted and the outside recognition it already has, and where it could be with organization and a budget line. The program walks into a community; it does not start one.
3. A plan whose first steps are already half done, so each decision reads as a short distance rather than a request.
4. A clear sense of their own part: leadership sets the bright lines, the DCIO decides authority, the CISO owns the controls.
5. Confidence in the people who have been doing this work, and in Stefan and Chris as the ones to organize it. The talk never asks for that; the last slide shows that the plan they just heard was the course applied. The one thing only leadership can add is the connection between the pieces, and the talk hands them that as the decision and the credit.

## The spine

Two devices carry the story and recur on purpose:

- **The four ideas.** Named on slide 2, taught one per slide in Part 3, checked against the City's own infrastructure on slide 14, and returned on slide 28 matched to the plan.
- **The track.** Drawn on slide 11 with the City at the start line, redrawn on slide 15 with the City where it stands once its pockets and infrastructure are counted, and redrawn on slide 27 with where the four decisions would put it. The runner moves; nothing else about the picture changes.

Every part ends with a handoff: the last story line of its last slide names what comes next.

## Copy rules for this draft

Beyond the checker's rules: no title of the form "X, and Y." more than one in five; "the course" named as the source at most twice in story lines; no reassurance or self-commentary on the stage; no line that asserts what a thing is by first saying what it is not, except slide 26's title, which is the deck's one; no false-suspense openers; no tag whose caption restates it.

## Timing

| Part | Slides | Minutes |
|---|---|---|
| 1. What we brought back | 1 to 2 | 2 |
| 2. Where enterprise is | 3 to 6 | 6 |
| 3. The four ideas | 7 to 10 | 5 |
| 4. Where the City stands | 11 to 15 | 8 |
| 5. What we would do first | 16 to 23 | 8 |
| 6. Ready, the ask, the reveal | 24 to 29 | 5 |

About 32 clicks in 34 minutes. To reach 28 minutes, fold slide 5 into slide 4, slide 12a into slide 12, and slide 23 into slide 21.

## Branding and color cues

Austin Technology Services, or City of Austin where ATS has no mark. Navy title and close, off-white content slides, a green rule under titles, the wordmark top left. Green is the City's own people and process at work. Indigo is evidence from the course and the outside world. A deep-green tick means a check passed, and nothing else is deep green. Orange is the mark of a person deciding or approving, and nothing else is orange. Problems, blockers, failures and things we are not proposing are grey, never red. The kit's three further hues, sky, gold and pink, mark the agent levels on slide 24 and nothing else. Every quoted phrase in They see is a label drawn on screen.

## Facts to confirm before building

- Slide 3: BCG, October 2026: AI's share of IT budgets rose from five to 17 percent; companies spend a further 2.8 percent of revenue on AI outside the IT budget. The buy, boost, build split (about 35, 55, 10) is the course's illustrative one.
- Slide 12: the Austin Energy description, the practitioner group (20 people, nine departments) and Ask About AI attendance (70 to 100).
- Slide 4a: Anthropic engineering blog, 13 October 2026 (2,500 to over 30,000 merged changes a day); Faros AI, The Acceleration Whiplash, Q2 2026 (22,000 developers, median review time five times); Gartner, 25 June 2025 (15 percent of day-to-day work decisions by 2028) and 17 March 2026 (humans retain authority over exceptions, appeals and high-risk cases).
- Slide 11a: Gartner, 19 November 2025 (69 percent); Microsoft UK, October 2025 (28 percent say no approved option exists); the City policy's effective date and scope in the CISO's words.
- Slide 12a: each recognition item, confirmed with the department it belongs to; add Austin Energy's or any other department's recognition for AI policy or tooling.
- Slide 13: whether Azure AI Foundry is in use alongside Azure OpenAI; the status of the production landing zone and its ServiceNow demand request, in words the CISO would accept; Amazon's role, drawn apart as joining the conversation.
- Slide 15: 20 applications, 145 modules in 13 categories, as of October 2026.
- Slide 23: the 2026 Citywide Strategic Plan priority named is High-Performing Government.

---

## Part 1. What we brought back (about 2 minutes)

### 1. Title
<!-- beat: opening; two practitioners, one course, and the route -->
Speaker: Chris

**On screen:** Agentic AI at the City: what we learned, and what we would do first.
- Stefan Wray and Chris Collins, Austin Technology Services, for the Deputy CIOs and leadership.
- From Carnegie Mellon's course on leading enterprise agentic AI development, October 2026.

**They see:** The slide is navy, with the City of Austin wordmark in white at top left. The title settles in the middle in white with a short green rule under it, and the two story lines rise beneath. Nothing moves after that.

**You say:** Thank you for the time. Stefan and I spent this fall in Carnegie Mellon's executive course on leading agentic AI development, with chief data officers and technology leaders from banks, manufacturers and hospitals. We came back with more than we can use, so we picked what applies to the City and built this talk around it. We will name four ideas from the course up front and teach each one briefly. Then we will put the City next to them, which turns out to be a better picture than most people in this building expect. Then we will say what we would do first. Please interrupt us whenever something catches your interest.

### 2. Four ideas from the course
<!-- beat: the setup; four ideas named once, so the room can count them, expect them and recognize them when they return -->
Speaker: Stefan

**On screen:** We brought back four ideas. The rest of this talk is those four applied to the City.
- Least autonomy that does the job. Rules the system enforces, scaled to risk.
- People before platforms. Start small and earn the next step.

**They see:** Four tall panels draw across the slide, numbered "One", "Two", "Three" and "Four" in large green numerals at their tops, and each takes its name in turn: "Least autonomy that does the job", "Rules the system enforces, scaled to risk", "People before platforms", "Start small and earn the next step". Under the panels a route draws as a line with three stops that light left to right: "Enterprise now", "The City now", "What we would do first". The slide ends on the four named panels over the lit route.

**You say:** Four ideas. One, use the least autonomy that does the job: most of what the City wants from AI needs far less independence than the word agent suggests. Two, enforce rules in the system and scale the controls to the risk, because a rule a model is asked to follow is a request, and a rule the system enforces is a control. Three, build people before platforms: the organizations getting value trained their own staff first. Four, start where mistakes are small and earn each next step with evidence. That can sound like a lot. We will take them one at a time, in three stops: enterprise now, the City now, and what we would do first.

---

## Part 2. Where enterprise is (about 5 minutes)

### 3. Enterprise is spending big
<!-- beat: context; the money moved, and where it goes; the City's own budget line is zero, said later -->
Speaker: Chris

**On screen:** Enterprise AI spending tripled in two years. Most of it pairs models with a company's own data.
- AI is now 17 percent of enterprise IT budgets, up from five, plus 2.8 percent of revenue outside IT.
- Where it goes: buy about 35 percent, boost about 55 percent, build about 10 percent.

**They see:** Two indigo columns rise side by side on the left, labeled "Five percent" and "17 percent", with the caption "Of IT budgets" under them; the second is more than three times the first. A smaller indigo figure lands beside them: "2.8 percent", with the caption "Of revenue, outside IT". On the right a wide bar splits into three parts labeled "Buy", "Boost" and "Build", sized about 35, 55 and 10, and the middle part fills green with the caption "A company's own data and knowledge". The slide ends on the two columns, the figure and the three-part bar.

**You say:** Money first, because it sets the scale. BCG's October survey puts AI at 17 percent of IT budgets, up from five percent two years ago, with another 2.8 percent of revenue, outside IT. Where it goes matters more than how much. The course splits AI spending into buy, boost and build. Buy is off-the-shelf tools for commodity work. Build is custom systems for the rare case where nothing else will do. Boost is the middle, more than half of the value: pairing models anyone can rent with a company's own data and knowledge, and its staff. That middle is where the City's advantage sits, because nobody sells the City's knowledge of its own services.

### 4. From chatbots to agents
<!-- beat: definition; what an agent is, in one picture, so the word means one thing for the rest of the talk -->
Speaker: Stefan

**On screen:** An agent takes a goal, plans its own steps, uses tools, acts, and stops at a boundary.
- A chatbot answers. A copilot drafts while a person decides. An agent does the work.
- The value and the risk come from the same place: it acts without a person doing each step.

**They see:** A timeline draws left to right from "2023" to "2026" with three figures on it: a speech bubble labeled "Chatbot" with the caption "Answers", a page with a person beside it labeled "Copilot" with "Drafts while a person decides", and a figure with a tool belt labeled "Agent" with "Does the work". Under the agent a loop draws as five small stops joined in a ring, each lighting in turn: "Goal", "Plans", "Tools", "Acts", "Adjusts". A short bar closes the loop, labeled "Stops at a boundary". The slide ends on the timeline and the lit loop.

**You say:** The word agent gets used for everything, so this is the definition we will hold to. In 2023 a chatbot answered a question; by 2026 an agent does the work. A copilot drafts, and a person approves each step. An agent is given a goal, breaks it into steps, chooses tools, takes actions in other systems, checks the result and adjusts, and keeps going until the goal is met or it reaches a boundary someone set. The loop is the whole point. It is why agents are useful, because the person no longer does every step, and it is why they need different controls, because the person no longer sees every step either. Everything in the course follows from that one sentence.

### 4a. Review moved off the person
<!-- beat: the practice changed; a person reviewing every output worked for chatbots, and agents now produce more than staff can read, so review runs in the system first and people take the high-risk cases; idea two before it is named -->
Speaker: Stefan

**On screen:** A person reviewing every AI output worked for chatbots. Agents now produce more than anyone can read.
- Anthropic merged 2,500 code changes a day in May and over 30,000 a day by September.
- Enterprise moved review into the system: a model checks first, and people take the high-risk cases.

**They see:** On the left a short timeline of two bars rises, labeled "May" and "September", the second 12 times the first, with the captions "2,500 a day" and "Over 30,000 a day". In the middle a single person sits at a desk with a stack of pages growing beside them until it towers over the desk, labeled "More than anyone can read". On the right a funnel draws: a wide mouth labeled "A model checks first", narrowing to a small outlet where a person stands with the orange mark of a person deciding, labeled "People take the high-risk cases". Under the funnel an indigo figure lands: "15 percent", with the caption "Of work decisions by 2028". The slide ends on the two bars, the towering stack and the funnel with its figure.

**You say:** One more thing changed, and it is the reason the controls changed with it. When AI was a chatbot, a person read every answer before anything happened, and that was enough. Agents finish days of work in an hour. Anthropic merged 2,500 a day in May and over 30,000 a day by September; a study of 22,000 developers found review time up fivefold. No staff can read that, so enterprise moved the review into the system. A model checks first, programmatic limits catch what it misses, and people take the high-risk cases, which is where Gartner expects human authority to stay: exceptions, appeals and anything that touches a resident. Gartner expects agents to make 15 percent of work decisions by 2028, with people kept on the rest.

### 5. What a fleet is
<!-- beat: definition; a fleet is agents with roles and a person at the end, defined generically before anyone's fleet is credited -->
Speaker: Stefan

**On screen:** A fleet is several agents with separate roles. A person approves the result.
- Lead agents plan the work and split it up. Builders do it in parallel. Reviewers check every change.
- The roles are kept apart on purpose, so no agent grades its own work.

**They see:** Three green lead agents sit at a desk on the left, labeled "Lead agents", with a board beside them splitting into rows. Below, a row of six smaller green agents fill cells of the board in parallel, labeled "Builders". To the right two agents with a different mark check the filled cells, labeled "Reviewers", and a thin wall draws between them and the builders, labeled "Kept apart". At the far right a person stands and the orange approval mark lands, labeled "A person approves". The slide ends on the four groups in a row from left to right with the mark at the end.

**You say:** One more definition, because it comes back later. A fleet is several agents working one job with separate roles. Lead agents read the brief, the rules and the available parts, and split the work into pieces. Builders take the pieces in parallel. Reviewers check every change before it goes anywhere, and the course is firm that the reviewer is never the agent that did the work, for the same reason an auditor is not the bookkeeper. At the end a person approves, and nothing reaches a user before that. The course's own demo was a fleet of five, and it spent as much time on the walls between the agents as on the agents.

### 6. Most who rushed stumbled
<!-- beat: evidence; adoption outran governance, and the failures were missing limits, not weak models; handoff to the four ideas -->
Speaker: Stefan

**On screen:** Most organizations that rushed into agents are stumbling. Each failure was a missing limit.
- Gartner expects over 40 percent of agentic projects to be canceled by the end of 2027.
- A deleted database, a year's budget gone in four months, a chatbot's invented refund policy.

**They see:** A large indigo figure lands at the top left: "Over 40 percent", with the caption "Canceled by the end of 2027". Beside it three plain cards settle in a row, each with a grey band at the top and a case name: "PocketOS" with "Deleted the production database" and a grey tag "Nothing asked before a destructive action"; "Uber" with "A year's AI coding budget in about four months" and a grey tag "Rewarded usage"; "Air Canada" with "Liable for a refund policy its chatbot invented" and a grey tag "Nothing checked what it promised". A line draws under the three cards, labeled "A limit was missing". The slide ends on the figure, the three cards and the line.

**You say:** The spending bought a lot of stumbling. Gartner expects more than 40 percent of agentic projects to be canceled by the end of 2027, for unclear value, rising cost and weak controls. Three cases from the course, chosen because a City audience will recognize them. In April a coding agent at PocketOS hit an error and deleted the production database in about nine seconds; it held a full-permission token, and nothing asked before a destructive action. Uber spent a year's AI coding budget in about four months because a leaderboard rewarded usage. A tribunal held Air Canada liable for a refund policy its chatbot invented; nothing checked what it promised. In each case the model worked as designed and a limit was missing. The four ideas are the limits.

---

## Part 3. The four ideas (about 5 minutes)

### 7. One: use the least autonomy that does the job
<!-- beat: idea one; the ladder, stop at the first rung that works, and many jobs need a plain tool -->
Speaker: Stefan

**On screen:** Idea one: use the least autonomy that does the job. Stop at the first rung that works.
- Automation, then copilot, then workflow, then agent; each rung adds more to govern.
- Many good ideas need a plain tool, built with AI help, with no AI inside at all.

**They see:** Four steps rise left to right like a stair, each a block: "Automation" with the caption "Fixed rules", "Copilot" with "A person approves every step", "Workflow" with "The steps are set", and "Agent" with "Chooses its own steps". A small green figure climbs onto the first step and stops; a deep-green tick appears over it with the label "Stop at the first rung that works". A grey arrow along the top of the stair reads "More to govern". Below the stair a small tool outline fills solid, labeled "Plain tool", with the caption "No AI inside". The slide ends on the stair, the figure on the first step, the grey arrow and the plain tool.

**You say:** Idea one is the one we would want every manager to carry. There is a ladder. Automation runs on fixed rules. A copilot drafts and a person approves every step. In a workflow the steps are set, with a model helping inside them. An agent chooses its own steps. Each rung up adds value sometimes and adds things to govern always, so the course's test is to climb one rung at a time, stop at the first rung that works, and ask why not less. Its first question is whether fixed rules can do the whole job, and often they can. Many of the City's good ideas need a plain tool, built quickly with AI help, with no AI inside at all.

### 8. Two: enforce rules in the system, scaled to risk
<!-- beat: idea two; the enforcement ladder from strongest to weakest, and the dial that fits controls to exposure -->
Speaker: Stefan

**On screen:** Idea two: a rule the system enforces holds. The controls should fit the risk.
- Strongest first: system enforced, approval before effect, a rule told to a model, a person checks.
- Light controls for assist-only work; heavy controls where a mistake would be costly or hard to undo.

**They see:** Four blocks descend left to right like a stair going down: "The system enforces it", "Approval before effect", "A rule told to a model", and "A person checks". A green arrow at the left reads "Strongest". Below the stair a dial draws with three settings: "Assist-only work" with the caption "Light controls", "Approval" with "Named approvers", and "Costly or hard to undo" with "Heavy controls". The needle rests on the first setting. The slide ends on the descending stair and the dial.

**You say:** Idea two is where the course is firmest. A rule told to a model in a prompt can be talked around; the course cites adaptive attacks beating tested defenses most of the time. A permission, a network limit, a sandbox, holds whether or not the model cooperates, because the system enforces it. Approval before effect sits between the two. A person checks last, and that counts only when the person has the time, the information and the authority to stop it. The second half is proportion. Assist-only work gets light controls, approved tools and data and a quick review, so it keeps moving. Heavy controls, with named approvers, go where a mistake would be costly or hard to undo.

### 9. Three: build people before platforms
<!-- beat: idea three; the organizations that get value trained their own staff; vendors cannot supply the organization's knowledge -->
Speaker: Chris

**On screen:** Idea three: the organizations getting value from AI trained their own people first.
- BCG: six percent of companies lead on AI, and their edge is talent rather than technology.
- BNY runs 130 digital employees today. It trained its workforce first, before granting any autonomy.

**They see:** A balance draws on the left with a post, a beam and two pans. The left pan holds an indigo box with a vendor tag, labeled "Technology"; the right pan holds three green people, labeled "Talent". The beam tips toward Talent. In the middle a large indigo figure lands: "Six percent", with the caption "Lead on AI and outperform peers by 9.3 points". At the right a plaque settles, labeled "BNY", with "Trained its workforce first". The slide ends on the tipped balance, the figure and the plaque.

**You say:** Idea three answers the question every department asks, which is whether to wait for a vendor. BCG read 4,800 earnings calls and found that six percent of companies lead on AI and outperform peers by 9.3 points. Their greatest differentiator was talent: fluency across the whole workforce plus a small expert team, with the technology mostly the same as everyone else's. BNY runs more than 130 digital employees today, each with a human manager, and the lesson the course drew is that it trained its people first and granted autonomy afterward. The City's knowledge of its own services lives in City staff. That is the asset the boost spending needs.

### 10. Four: start small and earn the next step
<!-- beat: idea four; gates, the six tests, and the handoff to measuring the City against all four -->
Speaker: Stefan

**On screen:** Idea four: start where mistakes are small. Earn each next step with evidence.
- Four gates, explore, validate, deploy, scale, and a project advances only when the evidence says so.
- Six tests pick the first projects, from decision frequency to whether a mistake can be undone.

**They see:** A stair of four gates rises left to right, each a step with a small gate drawn on it: "Explore", "Validate", "Deploy", "Scale". A small green project box climbs onto the first step, and a deep-green tick lands beside it with the caption "Evidence". The box climbs to the second step and a second tick lands; the third step stays empty. Beside the stair a checklist draws with six lines, each taking a deep-green tick in turn: "Frequent decisions", "Measurable impact", "Friction", "Ready data", "Rules that can be written", "Contained risk". A short line at the foot reads "Where the City stands against the four". The slide ends on the stair with the box on its second step, the checklist and the foot line.

**You say:** Idea four is the course's answer to pilot purgatory, where everything is a proof of concept and nothing ships. Every project passes four gates: explore, validate, deploy and scale, and it advances only when the evidence from the last gate says it should. The course also gives six tests for choosing the first projects: frequent decisions, measurable impact, friction in the current process, ready data, rules that can be written down, and contained risk, meaning a mistake is recoverable. Most first picks score well on all six and are assist-only work. Those are the four ideas. The rest of the talk is where the City stands against the four.

---

## Part 4. Where the City stands (about 6 minutes)

### 11. Where the City looks like it is
<!-- beat: the first track; the honest starting picture: no strategy, team or budget line, one real control already in place -->
Speaker: Chris

**On screen:** Measured by strategy, team and budget, the City is at the start line.
- The City has no AI strategy, no AI team and no AI budget line.
- It has one real control already: staff may use only the AI tools the CISO has authorized.

**They see:** A running track draws as a long oval seen from above, filling the drawing width. A pack of small indigo runners labeled "Enterprise" is far along the back straight. A single green runner, twice their size, stands on a white start line at the lower left, labeled "The City" beneath the track. A grey tag sits in the infield: "No AI strategy, no AI team and no AI budget line". A fence post plants in the ground outside the track beside the start line, a deep-green tick on its cap, labeled "Authorized tools". The slide ends on the track, the pack, the City at the line and the ticked post.

**You say:** Measured the way a consultant would measure it, the City is at the start line. There is no AI strategy, no AI team and no AI budget line, while the enterprise pack we just described spends 17 percent of IT budgets. One thing is already in place, and it matters more than it looks. Staff can use only authorized tools, the AI tools the Chief Information Security Officer approved, and the system enforces that rather than a memo asking for it. On the course's ladder of controls that is the strongest kind, and most of the organizations in the cancellation statistics did not have it. Hold this picture. We are going to redraw it twice.

### 11a. The control bought time
<!-- beat: the honest word about the policy; the authorized tools list is the mainstream first rung and the pressure is now on it; the next rung is tiers with a budget, not a longer ban -->
Speaker: Chris

**On screen:** The authorized tools rule was the right first control. The next control is a pathway, with tiers and a budget.
- Seattle, Minnesota and Houston made the same rule. Gartner: 69 percent see staff using tools anyway.
- Boston moved to tiers by data sensitivity. Pennsylvania, in a year, went from 175 to 3,000 staff.

**They see:** The fence post from slide 11 stands at the left with its tick, labeled "Authorized tools", and four small city nameplates settle beside it: "Seattle", "Minnesota", "San Francisco", "Houston". A grey pressure gauge draws under them with its needle swinging toward the high end, labeled "69 percent", with the caption "See staff using tools anyway". On the right a stair of three steps rises, labeled "Tiers by data sensitivity", with the caption "Boston"; a green figure climbs from the first step to the second. Beside the stair an indigo figure lands: "175 to 3,000", with the caption "Pennsylvania, in a year". A plain tag at the foot reads "A budget line". The slide ends on the post and nameplates, the gauge, the stair with its climber, the figure and the tag.

**You say:** A word about the policy, because the room has heard about it. From the end of October staff may use the Copilot that comes with Microsoft 365 and nothing else. That is the right first control, and the mainstream one: Seattle made the same rule in May; Minnesota, San Francisco and Houston run the same way. It has a shelf life. Gartner finds 69 percent of organizations see staff using prohibited tools anyway, and Microsoft finds 28 percent of staff say no approved option exists. The cities ahead of us added tiers by data sensitivity, with a sanctioned enterprise tool for the data that is not ready to connect, and a budget line. Pennsylvania, in a year, went from 175 to 3,000 staff on a sanctioned enterprise tool.

Note: confirm the City policy's effective date and exact scope in the CISO's words; the city examples are Seattle (May 2026), Minnesota, San Francisco and Houston's 2025 to 2028 contract, Boston's policy v2.1 (March 2026) and Pennsylvania's rollout (StateScoop, April 2026). Sources are in the research notes.

### 12. What already exists
<!-- beat: the first correction to the picture; pockets of practice across departments and a practitioner group, not yet at one table -->
Speaker: Chris

**On screen:** The City has more AI practice than it has counted, in pockets across departments.
- Austin Public Health and Austin Energy have been building with AI for years, and they are not alone.
- A practitioner group of 20 spans nine departments, and 70 to 100 staff came to each Ask About AI.

**They see:** A grid of plain department boxes draws, labeled once "Departments". A lantern lights inside one box, labeled "Austin Public Health", with the caption "20 applications and a sanctioned sandbox"; a second lights, labeled "Austin Energy", with "Years of AI work"; then several smaller lanterns light in other boxes with no names. A ring of nine green dots forms around the grid, labeled "Practitioner group", with the caption "20 people in nine departments". A tag drops under the grid: "70 to 100 staff came to each Ask About AI". A grey tag sits apart at the right: "Not yet at one table". The slide ends on the lit grid, the ring, the tag and the grey tag.

**You say:** The first correction is people. The course's 90-day playbook starts with an inventory of everything built, bought and employee-made, before anyone sets policy, and the City has more than it has counted. Austin Public Health has 20 applications and a sanctioned sandbox, approved by the security office. Austin Energy has years of AI work of its own. Several other departments have smaller pockets, some of them employee-made and on nobody's list. A practitioner group already reaches 20 people in nine departments, and 70 to 100 staff came to each Ask About AI session before those paused for the move into One ATS. These people have been at this for years. They are not yet at one table.

Note: confirm the Austin Energy description with Austin Energy, and the practitioner group and Ask About AI numbers.

### 12a. The rest of the country has noticed
<!-- beat: the proof that the community exists; outside recognition the City has not yet claimed as its own, and the admission that this is only what we found by asking -->
Speaker: Chris

**On screen:** Other cities and national bodies already treat the City's AI work as a model.
- The City CIO nominated the work for a Texas award, and it won. GovEx holds the method up as a model.
- This is only what we found by asking around. There is more, and finding it is step one.

**They see:** Five plain plaques settle on a wall one at a time, each with a short label: "Innovative Leader Award", with the caption "Texas IT Leadership Awards"; "Johns Hopkins GovEx", with "Highlights the method as a model"; "Bloomberg Cities Network", with "Wrote about the City's work"; "CDC", with "Featured the work"; and "Invited to present", with four small names under it, "NYC Health", "Tacoma", "Mesa", "Texas DIR". A grey tag sits apart below the wall: "Only what we found by asking around". The slide ends on the wall of five plaques and the tag.

**You say:** The pockets were noticed outside the building before they were counted inside it. The City CIO nominated the Austin Public Health work for the Texas IT Leadership Awards, and it won the Innovative Leader Award. Johns Hopkins GovEx, through its City Data Alliance, highlights the method as a model for other cities. Bloomberg Cities Network wrote about the City's work. The CDC featured the work. The City has been invited to present by NYC Health, Tacoma, Mesa and Texas DIR, the state's technology department. A program that starts here walks into a community with a national reputation already attached. And this is only what we found by asking around. There is more, and finding it is step one.

Note: confirm each item with the department it belongs to, and add any recognition Austin Energy or other departments have received for AI policy or tooling.

### 13. Infrastructure ready for AI
<!-- beat: the second correction; a sandbox with deployed models, a CISO-approved pilot path and a production route, built with partners over years -->
Speaker: Chris

**On screen:** The City already has infrastructure for AI, built with the security office and partners.
- An Azure sandbox with deployed models, a CISO-approved pilot pathway, and a production route.
- Weekly sessions with Microsoft and Quisitive for over two years; Amazon is joining the conversation.

**They see:** A fenced yard draws across the left two thirds, labeled "Azure sandbox", with the caption "Cannot reach other City systems". Inside it three tiles land in a row: "Deployed models" with the caption "Azure OpenAI and Azure AI Foundry", "Pilot pathway" with "CISO-approved", and "Production route" with "Landing zone designed, demand request filed". Under the fence a calendar strip fills week by week, labeled "Every week for over two years", with two nameplates beside it, "Microsoft" and "Quisitive", and a third in a dashed outline a little apart, "Amazon", with the caption "Joining the conversation". The slide ends on the yard with its three tiles, the full calendar and the three nameplates.

**You say:** The second correction is infrastructure. Austin Public Health built an Azure sandbox with the Information Security Office, Microsoft and Quisitive. It inherits the City's tenant controls, sign-in and central logging, and it cannot reach other City systems; data gets in only when someone places it. Inside it, models are already deployed through Azure OpenAI and Azure AI Foundry, so a team does not start by asking for a model. There is a CISO-approved pilot pathway, and the production route is prepared: landing zone designed, demand request filed, waiting on a decision. The partners have been in the room every week for over two years, and Amazon is now joining the conversation.

Note: confirm Azure AI Foundry's role, the landing zone and demand request status in the CISO's words, and Amazon's status.

### 14. The four ideas already fit it
<!-- beat: the turn; the course's vocabulary maps onto controls the sandbox already has, which is the "further along than you thought" moment -->
Speaker: Stefan

**On screen:** The course's controls map onto what the sandbox already does.
- Sign-on and roles, allow lists and private networking, a person approving each build, all as code.
- The foundations the course asks for are in place. The missing piece is what connects them.

**They see:** Two columns draw. The left column is headed "The course asks for" and lists four lines: "Identity for every actor", "Rules the system enforces", "Approval before effect", "Repeatable and logged". The right column is headed "The sandbox has" and lists four lines that land in turn opposite their partners: "Single sign-on and roles", "Allow lists and private networking", "A person approves each build", "Infrastructure as code". A deep-green tick lands between each matched pair. A grey tag at the foot reads "What connects them". The slide ends on the two columns, the four ticks and the tag.

**You say:** This is the slide I most wanted to show you. The course spends a full day on controls for agents, and when I came home and laid its list against the sandbox, the two matched. The course asks for identity for every actor; the sandbox has single sign-on and roles. It asks for rules the system enforces; the sandbox has allow lists and private networking, and nothing talks to anything it was not allowed to. It asks for approval before effect; a person approves each build. It asks for repeatable and logged; everything is infrastructure as code in Azure DevOps. The foundations are in place. The missing piece is the organization that connects them, and that is leadership's to supply, at a fraction of the cost of the foundations.

### 15. Where the City stands
<!-- beat: the second track; the City redrawn where it is once people, infrastructure and a working fleet are counted -->
Speaker: Chris

**On screen:** Counted properly, the City is a third of the way around, with a fleet it can teach.
- Austin Public Health builds with a fleet of agents today: 20 applications from 145 reusable modules.
- Explore, validate and deploy are passed. Scale is the gate the City is not ready for yet.

**They see:** The track from slide 11 returns with the same pack, labeled "Enterprise". The green City runner now stands a third of the way around the first bend, and behind it along the lane sit three small green markers it has passed: "People", "Infrastructure", "A working fleet". In the infield a short stair of four gates lights three steps green, "Explore", "Validate", "Deploy", with the fourth grey, "Scale", and a grey tag beside it, "Not ready yet". A tag under the track reads "20 applications from 145 reusable modules". The slide ends on the track with the runner moved, the three markers, the gate stair and the tag.

**You say:** Here is the track redrawn. Since late 2025 Austin Public Health has built its applications with a fleet of the kind we defined earlier: lead agents plan, builders work in parallel, two reviewers check every change, and a person approves. That fleet has produced 20 applications from 145 reusable modules, and the process is written down well enough to teach. The enterprise pack is still ahead. On the course's gates the sandbox has passed explore, validate and deploy. Scale is the one gate it has not earned; it is not ready yet, and should not try until the organization exists. Counted properly, the City is a third of the way around, past three markers: people, infrastructure, a working fleet. The next part is how to close the rest.

Note: confirm the application and module counts as of October 2026.

---

## Part 5. What we would do first (about 8 minutes)

### 16. What we are not proposing
<!-- beat: the pivot; no agents, no platform, no reorganization; the first steps cost conversations -->
Speaker: Chris

**On screen:** We are not proposing to deploy agents, buy an agent platform or create a new organization.
- Below about 10 agents, the rule is manage individually: known use cases and named owners.
- The first steps cost conversations and time, not licenses or infrastructure.

**They see:** Three dashed grey outlines span the top of the drawing, each crossed out and settling at half strength: "An agent platform", "A new organization", "Deploy agents". Below them, with clear space between, a green round table with chairs and a green calendar page draw side by side, labeled "Conversations" and "Time", and an indigo tag lands at the right: "Manage individually", with the caption "Below about 10 agents". The slide ends on the faded outlines above the table, the calendar and the tag.

**You say:** Before the plan, what it is not. We are not proposing to deploy agents, to buy an agent platform or to create a new organization. The course is explicit that governance grows with the number of agents. Below about 10 you manage them individually, with known use cases, named owners and direct oversight, and registries and control planes come much later. The City is at that early stage, and the plan respects it. The first steps cost conversations and time rather than licenses or infrastructure, and they are the steps the course puts first anyway. They also do something the course cares about as much as the technology. They start by asking the people who will do the work.

### 17. Make the consortium official
<!-- beat: step one; an open call to every department, and one table for the practitioners who answer -->
Speaker: Chris

**On screen:** Step one is an open call to every department, with one table for the practitioners who answer.
- The program walks into a community that exists. An open call makes it the City's AI consortium.
- The departments that led keep leading inside it, and everyone else is invited in.

**They see:** The department grid from slide 12 returns with its lanterns lit. A card labeled "Open call" slides across the grid, and more lanterns light in boxes that were dark, a small green person beside each. The lit people step out of their boxes and gather around a round table in the middle, labeled "AI consortium". Three of the chairs are drawn larger, with the caption "The departments that led". The slide ends on the table, the people around it, and the grid behind them with its boxes now mostly dark.

**You say:** Step one is an open call. The course quotes Shopify giving every employee every tool on the belief that high-value use cases can emerge from anywhere in the company, and contrasts it with a top-down memo elsewhere whose author later said he had not given enough context. So the call goes to every department and asks one question: who is building, piloting or teaching with AI today? The answers come to one table. The program walks into a community that exists rather than seeding one; sanctioning it makes it the City's AI consortium, and the departments that led keep leading inside it. The people who have carried this work for years should be the first ones leadership thanks and the first ones it asks.

### 18. An AI program team from staff we have
<!-- beat: step two; a small team drawn from the consortium, led by people already doing the work, with the Azure staff kept on the infrastructure -->
Speaker: Chris

**On screen:** Step two is a small AI program team drawn from the consortium, led by staff doing the work.
- Its work is strategy, architecture and consulting. It advises and teaches rather than builds.
- The Azure staff stay on the infrastructure they built, and the team is organized around them.

**They see:** The round table from slide 17 sits at the left with people around it. Four of them light brighter and step out to a box drawn in the middle, labeled "AI program team"; one of the four takes a small nameplate, "Lead". Three tiles land under the box: "Strategy", "Architecture", "Consulting". A line draws from the box to a department outline at the right, labeled "Departments", with the caption "Advises and teaches". Below the team box the fenced yard from slide 13 is drawn small, with two green people inside it and the caption "The Azure staff stay on the infrastructure". The slide ends on the table, the team box with its tiles and lead, the line to the department, and the small yard.

**You say:** Step two gives the consortium a working core. A small AI program team, drawn from it, with one of them as lead and all of them already doing this work, takes on strategy, architecture and consulting with departments. It advises, shows what works and teaches department staff to do it; it does not build for them, because a central team that builds everything becomes the bottleneck. The people who know Azure and Azure AI stay on the infrastructure they built, and the team is organized around them rather than over them. That is the course's third idea in practice. The organizations that got value trained their own people and put them in charge of the work.

### 19. Listen
<!-- beat: step three; department leaders, staff and the community, in their own words -->
Speaker: Chris

**On screen:** Step three is to listen to leaders, staff and the community, in their own words.
- Ask what is slow or broken, where they could do more, and what their goals for 2027 and 2028 are.
- An honest channel for staff concerns comes first, before any tool is chosen.

**They see:** Three round tables draw side by side, each with six chairs: "Department leaders", "Staff" and "Community". Speech bubbles rise over them in turn: three stacked over the first, "What is slow or broken", "Where they could do more" and "Their goals for 2027 and 2028"; one over the second, "What worries them"; one over the third, "How it wants the City to use AI". A notebook page at the right fills with green rules under the heading "In their own words". The slide ends on the three tables, their bubbles and the filled page.

**You say:** Step three is listening, and the course weights it heavily. Its first no-regrets workforce action is an honest channel for staff to raise concerns about AI without being labeled resistant, because leaders who open that channel learn early. So the program team sits with department leaders and asks what is slow or broken, where they could do more, and what their goals for 2027 and 2028 are. It asks staff what worries them. It asks the community how it wants the City to use AI, and what it does not want. Everything goes down in their own words, because that language becomes the problem statement and the measure of success, and it is how departments come to see ATS as their partner.

### 20. Sort
<!-- beat: step four; the six tests and the value-by-readiness chart; start top right -->
Speaker: Stefan

**On screen:** Step four is to sort what we heard by value and readiness. Start where both are high.
- The six tests from idea four pick the first projects.
- Most first picks are assist-only work where a mistake is small and reversible.

**They see:** Idea cards fly in from the left as dots and land on a square chart with two axes, "Value" up the side and "Readiness" along the bottom. The four quadrants name themselves: top right "Scale", top left "Prepare", bottom right "Experiment", bottom left "Defer". The top right fills with a green wash. Beside the chart the six-line checklist from slide 10 returns with its ticks: "Frequent decisions", "Measurable impact", "Friction", "Ready data", "Rules that can be written", "Contained risk". The slide ends on the chart with its lit corner and the ticked list.

**You say:** Step four turns what we heard into a short list. Every idea goes on a chart of value against readiness. Top right we scale. Top left we prepare the foundations first. Bottom right we experiment with a clear learning goal. Bottom left we defer, so it does not consume scarce capacity. The six tests from idea four do the scoring: frequent decisions, measurable impact, friction in the current process, ready data, rules that can be written down, and contained risk. For the City, most first picks will be assist-only work where a mistake is small and reversible, which is exactly where idea one and idea two say to begin. That gives us two lanes.

### 21. Two lanes
<!-- beat: the plan's shape; quick wins now while the foundations lane makes the next ones faster -->
Speaker: Chris

**On screen:** Run two lanes at once: quick wins now, with the foundations that make the next ones faster.
- Lane one is where we deliver quick wins now: small, reversible tools out of listening and sorting.
- In lane two we build the foundations: training, a software lifecycle, one toolset, infrastructure.

**They see:** Two lanes draw, one above the other. The lower lane is labeled "Deliver quick wins now", and small green boxes ship along it one after another. The upper lane is labeled "Build the foundations", and four pieces fill in turn: "Training", "Software lifecycle", "One toolset", "The infrastructure the City already built". An arrow runs down from each piece into the lower lane, and the boxes there move faster after each arrow lands. The slide ends on both lanes full.

**You say:** The plan has two lanes, and the course says to run both at once: rapid experimentation beside structural change. Lane one is what the City can deliver now: small, reversible tools out of the listening and the sorting, many of them plain tools built with AI help, each tied to a department goal we wrote down in its own words. Lane two is the longer work that makes lane one faster every quarter: training, a shared software development lifecycle, one toolset, and the infrastructure the City already built, extended rather than replaced. Each piece of lane two is an arrow into lane one. Every lane one project names a sponsor accountable for adoption before it starts, which is the course's cure for pilot purgatory.

### 22. Level up the staff the City has
<!-- beat: capacity; three tiers of fluency, developers moving from AI user to AI engineer -->
Speaker: Chris

**On screen:** Level up the staff the City already has, in three tiers, starting with the developers.
- Everyone AI-aware, leads AI-proficient, a small expert team. Our gaps are at every tier.
- Developers move from AI user to AI engineer, with training and a lifecycle, not just licenses.

**They see:** Three tiers draw as a pyramid. The wide base is labeled "AI-aware", with the caption "Everyone"; the middle "AI-proficient", with "Functional leads and process owners"; the top "AI-expert", with "A small expert team". Each tier lights green in turn. Beside the pyramid a row of developer desks draws, labeled "Developers". A grey tag over the row reads "AI user", and as a slab labeled "Training and a lifecycle" slides under the desks, the tag turns green and reads "AI engineer". A small indigo figure sits at the foot: "19 percent slower", with the caption "Tools and no method". The slide ends on the lit pyramid, the lifted row and the figure.

**You say:** Lane two begins with people, which is idea three again. The course describes three tiers of fluency. Everyone AI-aware: what it can and cannot do, and the user's duty under the authorized tools rule. Functional leads and process owners AI-proficient: able to evaluate a vendor claim, design a workflow and define a success measure. And a small AI-expert team that builds and governs, which is the program team. Our gaps are at every tier, and the developers come first. The course frames their change as moving from AI user to AI engineer, and it cites a study where developers given tools and no method were 19 percent slower while believing they were faster. Training and a lifecycle make the tools pay.

### 23. Measure outcomes
<!-- beat: direction; every project tied to the Citywide Strategic Plan, with a baseline before a target; handoff to what to have ready -->
Speaker: Stefan

**On screen:** Tie every project to a Citywide Strategic Plan priority and measure outcomes, not pilots.
- Goals first, then a baseline, then a target; a data owner for every measure.
- Training attendance and tool counts describe effort. They are not the result.

**They see:** Six tiles draw across the top, labeled once "Citywide Strategic Plan". The first tile lights and its name appears: "High-Performing Government". Small project dots rise and attach to the tiles, most to the first. Below, a grey tally labeled "Counting pilots" draws and fades, and in its place a line draws from a point labeled "Baseline" to a point labeled "Target", with a small nameplate under it reading "Data owner". The slide ends on the six tiles, the attached dots and the measure line.

**You say:** How we would know it worked. Every project ties to one of the six priorities in the 2026 Citywide Strategic Plan, and the closest to this work is High-Performing Government, with its goal of secure, modern, accessible technology. Then goals first, a baseline before any target, and a named data owner for every measure. The course's table of mindset shifts has one line we would put on the wall, from counting pilots and deployments to measuring business outcomes, and it adds that value, adoption, performance and economics should improve together before anything advances a gate. Training attendance and tool counts describe effort. That is the plan. Three things to have ready before the first agent arrives.

---

## Part 6. Ready, the ask, the reveal (about 5 minutes)

### 24. When agents come
<!-- beat: the playbook on the shelf; four levels, a named owner for each agent -->
Speaker: Stefan

**On screen:** When agents come inside tools we already own, we will have a playbook on the shelf.
- Classify each one into four levels, from no-go to bounded autonomy, and name a human owner for each.
- At the City's scale that is a list and a set of owners, not a platform.

**They see:** Four bands draw across the slide, each in its own hue: grey "No-go", with the caption "Never without a person"; sky "Assist only", with "Read-only tools"; gold "Execute with approval", with "A named approver signs off"; and pink "Bounded autonomy", with "Strict limits and a tested stop". A short list draws beneath with three rows, each a small agent icon, a level, and a nameplate reading "Owner". A grey tag at the foot reads "A list and a set of owners". The slide ends on the four bands and the short list.

**You say:** Agents will not wait for the City's strategy. Vendors keep adding agent features to products the City already owns, so some will arrive inside authorized tools whether or not we are ready. For that day the course gives a playbook we would keep on the shelf. Classify each agent into one of four levels: no-go, never without a person, for anything that transacts, decides regulated matters or cannot be undone; assist only, with read-only tools; execute with approval, where a named approver signs off before anything takes effect; and bounded autonomy, with strict limits and a tested stop. Give every agent a named human owner, which the course found is often nobody. At the City's scale that is a list and a set of owners.

### 25. Who decides what
<!-- beat: roles; leadership sets the bright lines, the DCIO decides authority, the CISO owns the controls; three questions for any proposal -->
Speaker: Stefan

**On screen:** Leadership sets the bright lines, the DCIO decides authority, and the CISO owns the controls.
- Three questions for any AI proposal: what can it touch, what enforces its limits, who would know.
- The decisions on this side of the table are about authority.

**They see:** Three tiers draw as a short stack. The top tier is labeled "Leadership", with the caption "Sets the bright lines". The middle is labeled "DCIO", with "Decides authority", and it gets the orange mark of a person deciding. The bottom is labeled "CISO", with "Owns the controls". Arrows run down the left side labeled "Authority flows down" and up the right side labeled "Evidence flows up". To the right, three cards land in turn: "What can it touch", "What enforces its limits" and "Who would know". The slide ends on the stack, its arrows and the three cards.

**You say:** The course is careful about who owns which decision. Leadership sets the bright lines: what AI may never do without a person, in dollars and in kinds of decision. The DCIO decides authority, meaning how much each system may do on its own and what needs approval. The CISO owns the controls that enforce it, and Stefan's deck in the backup is the working draft of that conversation with him. Authority flows down and evidence flows up. For any proposal that reaches your desk, three questions from the course do most of the work: what can it touch, what enforces its limits, and who would know if it went wrong. A vendor who cannot answer them has answered.

### 26. Used for residents, never on them
<!-- beat: the line; AI helps staff serve residents and never judges them; the community's voice from the listening step sets the test -->
Speaker: Chris

**On screen:** Used for residents, never on them.
- AI helps City staff serve residents, and it never judges a resident or replaces a person's decision.
- The test is whether residents would see the City serving them better over the long term.

**They see:** A City staff member sits behind a wide counter, labeled "City staff", with a small green AI helper right beside them, labeled "AI". A resident stands across the counter, labeled "Resident". A low picket fence draws on the floor between the counter and the resident, labeled "Never judges a resident". A card labeled "In their own language" travels from the helper over the fence and lands in the resident's hands; the staff member gets the orange mark of a person deciding. At the right, under the heading "The test", two lines take deep-green ticks: "Serving them better", "Over the long term". The slide ends on the counter scene, the fence, the orange mark and the ticked test.

**You say:** One line runs under all of this, and it is where the community's voice from the listening step comes back. AI at the City is used for residents, never on them. It helps City staff serve more people, and serve them in their own language. It never judges a resident, decides a benefit or replaces a person's decision about one; that is the no-go level on slide 24, and it is where leadership's bright line belongs. The test for any project is whether residents would see it as the City serving them better over the long term. If they would not, the City should not build it, however feasible it is, and the listening step is how we would know.

### 27. Where the City could be
<!-- beat: the third track; the five decisions drawn as the distance they close, each already half done -->
Speaker: Chris and Stefan

**On screen:** Five decisions, each already half done, would put the City with the pack within a year.
- Sanction the consortium and the program team. Sponsor the listening tour. Adopt the four levels.
- Keep the agent work going in the infrastructure the City built. Policy tiers and a budget.

**They see:** The track from slide 15 returns with the City runner a third of the way around and the pack ahead, labeled "Enterprise". A dashed green outline of the runner draws well ahead, at the tail of the pack, labeled "Within a year". Along the lane between the solid runner and the dashed one, five green markers land in turn, and as each lands its name and caption rise in a row under the track, joined to the marker by a thin leader line: "The consortium and the program team" with "Exists informally today", "Listening tour" with "Calendar time", "Four levels" with "Stefan drafts them with the CISO", "The infrastructure" with "Already running", "Policy tiers and a budget" with "The first tier is in place". The slide ends on the track with the solid runner, the five markers and their row, and the dashed runner at the pack's tail.

**You say:** Five decisions would move the City from where it stands to the tail of the enterprise pack within a year, and each is already half done. Sanction the consortium and the program team; the group exists informally today and the leaders are already in it. Sponsor the listening tour; it costs calendar time, and we would run it. Adopt the four levels; Stefan drafts them with the CISO. Keep the agent work going in the infrastructure the City built, with the Azure staff on it; it is already running. Policy tiers and a budget, with a sanctioned enterprise tool for data that is not ready; the first tier is in place. None of this starts from zero. All of it starts from work your own staff already did.

### 28. That was the course, applied
<!-- beat: the reveal; the four ideas from slide 2 return, each matched to what was proposed -->
Speaker: Stefan

**On screen:** The plan you just heard was the four ideas from the course, applied to the City.
- Least autonomy: plain tools first. Enforced rules: the sandbox and the four levels.
- People first: the consortium and the program team. Earn the next step: the gates and the two lanes.

**They see:** The four panels from slide 2 return across the top, numbered "One", "Two", "Three" and "Four", with their names: "Least autonomy that does the job", "Rules the system enforces, scaled to risk", "People before platforms", "Start small and earn the next step". Under each, a green line draws down to a tile that lands in turn: "Plain tools and assist-only work", "The sandbox and the four levels", "The consortium and the program team", "The gates and the two lanes". A deep-green tick lands on each panel. The slide ends on the four panels, their four tiles and the four ticks.

**You say:** One more look at slide 2. Idea one, the least autonomy that does the job: the plan starts with plain tools and assist-only work, and climbs only when the evidence says so. Idea two, rules the system enforces, scaled to risk: the sandbox already enforces them, and the four levels scale them. Idea three, people before platforms: the consortium, the program team, the three tiers of training, and the Azure staff kept on what they built. Idea four, start small and earn the next step: the four gates and the two lanes. We did not add the course to the plan afterward. We built the plan from it, and the City's own staff had already laid most of the ground.

### 29. Let's talk
<!-- beat: close; the floor goes to the room -->
Speaker: Chris and Stefan

**On screen:** Let's talk.
- We would like to hear what you would most want a City AI strategy to do first.
- We would also like to hear what you would need from us to make these five decisions.

**They see:** The close is navy, with the City of Austin wordmark in white. The title and the two story lines settle in the middle in white, and a small line at the foot reads "Backup slides". Nothing moves after that.

**You say:** That is what we brought back. The City is further along than its org chart shows, because people across departments did the work before anyone asked, and the infrastructure they built already meets the standard the course teaches. Connecting those pieces is the decision in front of you, and a program with a national reputation already attached comes with it. With that and a budget line to match, the City can deliver on the strategic plan while it shores up practice, training and security, with the community's voice in the room. We would like to hear what you would most want a City AI strategy to do first, and what you would need from us to make these five decisions. Stefan's security deck is in the backup slides.

---

## Backup

The CMU briefing deck, "Five ideas for agentic AI at the City", follows as the backup section for the security discussion: exposure scoring, the lethal trifecta, enforcement at the loop, agent identities, the five-lever kill switch, the policy layer, the gated lifecycle and cost caps. It is kept as built and is not parsed as part of this script.
