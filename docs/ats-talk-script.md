# ATS talk script, v1: Agentic AI at the City, what we learned and what we would do first

Draft 1, 2026-10-20. A talk of about 25 minutes for Austin Technology Services leadership, the Deputy CIOs first among them, given by Stefan Wray and Chris Collins. Same web format as the city talk: one click plays a whole slide, every slide stands on its own, and the script is the single source. Austin Technology Services branding, not Austin Public Health (see "Branding" below). The CMU briefing deck Stefan built becomes the backup section for the security discussion and is not rewritten here.

**How to read it.** Each slide has three parts:
- **On screen:** the title, then the story lines that rise under the picture. Someone watching with no speaker should get the slide from these alone.
- **They see:** what the animation shows. One click plays the whole slide, and the slide ends on a still, complete picture.
- **You say:** what the speaker says. It adds detail, and the slide doesn't depend on it.

The `<!-- beat -->` comment under each heading names the part the slide plays in the story. It is for reviewers and never appears on screen. The `Speaker:` line says who voices the slide; it is not parsed and never appears on screen either. `Note:` lines are facts to confirm before the deck is built.

## What the DCIOs should walk away with

Five things, in the order the talk earns them:

1. **An accurate picture of where the City stands.** Enterprise moved from chatbots to agents in about 18 months. The City is behind on operationalizing AI, and it is not starting from zero: there are pockets of staff who have been building for years, and there is already one real control in place.
2. **Three ideas from the course they can repeat in a meeting.** Use the least autonomy that does the job. Talent, not technology, is what separates the organizations that get value from the ones that don't. Govern in proportion to risk, with rules the system enforces.
3. **A method, in plain steps, that does not require an agent, a platform or a reorganization.** Find the practitioners, listen, sort, run two lanes, level up the staff we have, measure outcomes.
4. **Clarity about their own role.** Leadership sets the bright lines, the DCIO decides authority, the CISO owns the controls. Their job is the authority decisions, not the plumbing.
5. **Confidence that Stefan and Chris are the people to run the first steps.** That confidence comes from the method and the evidence, not from a credentials slide. The talk never asks for trust; it demonstrates the thinking and then asks for four decisions.

## The story in five moves

1. Where the City stands: the world moved, we are behind, we are not out of it, the course's own first step is to see what already exists, and one department already runs a fleet of agents.
2. What the course taught: three ideas, and why the order matters.
3. What we would do first: what we are not proposing, then find the people, listen, sort, two lanes, level up, measure.
4. When agents come: the levels, the owners, who decides what, and the line around residents.
5. The ask: four decisions, then the floor.

Move 1 is carried mostly by Chris, move 2 mostly by Stefan, move 3 by Chris, move 4 by Stefan, and the close by both. Handing off every few slides keeps both presenters in the room's eye.

## The three traps the talk is built to avoid

- **Full blast.** Nothing in the main talk proposes deploying an agent, buying an agent platform, or standing up new infrastructure. Slide 9 says so out loud.
- **"It didn't come from us."** The course's own step one is an inventory of what exists, built, bought and employee-made. Slide 4 applies that to people and work, and names Austin Public Health and Austin Energy as departments that have been at this for years. The point lands as CMU's advice, not as a complaint.
- **Vendors will fill the gap.** Slide 6 carries the BCG finding that talent is the differentiator, the buy, boost, build split that puts most value in the enterprise's own knowledge, and BNY training its workforce before granting autonomy. Slide 4a shows the City's own partners (Microsoft and Quisitive, with Amazon joining) working inside City-owned infrastructure, which is the opposite of handing the problem to a vendor.
- **Losing the momentum.** Slide 4a says plainly that the City is not ready to scale the agent fleet, in the course's gate language, and in the same breath that stopping it would lose the infrastructure built over years and the staff who know Azure. Decision 4 on slide 19 makes keeping it going an explicit ask.

## Timing

| Part | Slides | Minutes |
|---|---|---|
| 1. Where the City stands | 1 to 4a | 6 |
| 2. What the course taught | 5 to 8 | 6 |
| 3. What we would do first | 9 to 15 | 9 |
| 4. When agents come, and the ask | 16 to 20 | 6 |
| Backup (the CMU briefing deck) | B1 onward | as needed |

About 21 clicks at a little over a minute each. If it runs long in rehearsal, slides 8 and 15 are the first to fold into neighbors.

## Branding

Austin Technology Services, or City of Austin if ATS has no mark of its own yet. Until a `docs/ats-brand.md` exists, use the City of Austin treatment from the CMU briefing deck: deep navy title and close, off-white content slides, a green rule under titles and a green footer band, the City of Austin wordmark top right. The APH logo does not appear.

**Color cues.** Green is the process and the City's own people at work. Indigo is evidence from the course and the outside world. A deep-green tick means a check passed, and nothing else is deep green. Orange is the mark of a person deciding or approving, and nothing else is orange. Problems, blockers, failures and things we are not proposing are grey, never red. The kit's three further hues, sky, gold and pink, mark the agent levels on slide 16 and nothing else. Every quoted phrase in They see is a label drawn on screen. Color roles are described in plain words and never quoted.

## Facts to confirm before building

- Slide 4: the Austin Energy work. Name it only at the level Austin Energy would recognize, and confirm with them. The same for any other department named as a pocket.
- Slide 4: the practitioner group count (20 people, nine departments) and the Ask About AI attendance (70 to 100) are from Chris's city talk; confirm they are still current.
- Slide 3 and slide 4: the authorized AI tools control is described as the CISO's policy, as in Stefan's deck. Confirm the wording the CISO would use.
- Slide 10: the name of the practitioner group. The script says "AI consortium" because that is the working name; if leadership prefers another, it changes in one place.
- Slide 15: the 2026 Citywide Strategic Plan priority named is High-Performing Government, as in the city talk.
- Slide 4a: Microsoft and Quisitive are in the weekly sessions with the security office. Amazon is new to the fold and the partnership discussions are fresh, so it is drawn apart in a dashed outline as joining the conversation. Firm it up only when the partnership is.

---

## Part 1. Where the City stands (about 5 minutes)

### 1. Title
<!-- beat: opening; two practitioners, one course, and the route the talk will take -->
Speaker: Chris

**On screen:** Agentic AI at the City: what we learned, and what we would do first.
- Stefan Wray and Chris Collins, Austin Technology Services, for the Deputy CIOs and leadership.
- From Carnegie Mellon's course on leading enterprise agentic AI development, October 2026.

**They see:** The slide is navy, with the City of Austin wordmark in white at top right. The title settles in the middle in white with a short green rule under it, and the two story lines rise beneath. Nothing moves after that.

**You say:** Thank you for the time. Stefan and I have spent this fall in Carnegie Mellon's executive course on leading agentic AI development, and we wanted to bring back what is useful to the City rather than everything we heard. We will do that in four parts. First, where the City stands, as plainly as we can put it. Second, three ideas from the course that we think leadership can carry into any meeting. Third, what we would do first, which is deliberately modest. Fourth, what to have ready for the day agents arrive, because they will arrive inside tools we already own. We will close with four decisions. Please interrupt us whenever something catches your interest.

### 2. The world moved
<!-- beat: context; chatbots became agents in about 18 months, and most of the organizations rushing in are stumbling -->
Speaker: Stefan

**On screen:** In about 18 months, enterprise AI moved from answering questions to doing work.
- Four in 10 large organizations now say they are scaling agents, up from 27 percent a year ago.
- Most who rushed are stumbling: Gartner expects over 40 percent of agentic projects to be canceled.

**They see:** A single timeline draws left to right across the slide, from "2023" to "2026". At the left a speech bubble lands, labeled "Chatbot", with the caption "Answers a question". Partway along, a second shape lands, labeled "Copilot", with "A person approves". At the right end a figure with a small tool belt lands, labeled "Agent", with "Does the work". Below the line three indigo figures rise in turn: "40 percent" with the caption "Scaling agents", "91 percent" with "Use agents", and "10 percent" with "Have a strategy for them". Last, a grey figure lands at the far right: "Over 40 percent" with "Canceled by 2027". The slide ends on the timeline and the four figures.

**You say:** In 2023 a chatbot answers a question. A copilot drafts, and a person approves. By 2026 an agent is given a goal, picks its own steps, uses tools and does the work. That is the difference between a chatbot and a coworker, and it is why the risk and the value come from the same place. The numbers show how fast enterprise moved. McKinsey finds 40 percent of large organizations scaling agents, up from 27 percent a year earlier. Okta finds 91 percent of organizations use agents and 10 percent have a strategy for them. And Gartner expects over 40 percent of agentic projects canceled by 2027, for unclear value, rising cost and weak controls. The world moved, and most of it moved badly.

### 3. Behind on operationalizing, not out of the fight
<!-- beat: the honest position; the City is late on operationalizing AI, underinvested, and already holds one real control -->
Speaker: Chris

**On screen:** The City is behind on operationalizing AI, and it is not starting from zero.
- The City has no AI strategy, no AI team and no AI budget line; AI is now 17 percent of IT budgets.
- It already has one real control: staff may use only the AI tools the CISO has authorized.

**They see:** A race track draws as a long oval seen from above. A cluster of small indigo runners labeled "Enterprise" is well along the track. A single green runner labeled "The City" is at the start line, and a grey tag above it reads "No AI strategy, no AI team and no AI budget line". Then a solid fence post lands beside the City's runner, labeled "Authorized tools", and a deep-green tick appears on it. A small indigo figure at the foot of the slide reads "17 percent", with the caption "Of IT budgets". The slide ends on the track, the two runners, the grey tag and the ticked post.

**You say:** We want to be plain about where we are, because the course was plain about it too. The City has no AI strategy, no AI team and no AI budget line. BCG puts AI at 17 percent of enterprise IT budgets now, up from five percent, so we are underinvested by any measure. That is the honest position. It is also not the whole position. The City already holds the first control the course asks for: staff can use only the authorized tools, the AI tools the Chief Information Security Officer has approved, and the system enforces it. The course ranks that kind of control above any instruction or reminder. We are behind on operationalizing AI. We are not out of the fight, and the next slide is why.

### 4. See what already exists
<!-- beat: the course's own first step applied to people and work; pockets of practice exist across departments and are not yet at the table -->
Speaker: Chris

**On screen:** The course's first step is to see what already exists, and the City has more than it knows.
- Departments like Austin Public Health and Austin Energy have been building with AI for years.
- A practitioner group of 20 spans nine departments, and 70 to 100 staff came to each Ask About AI.

**They see:** An outline map of the City's departments draws as a grid of plain boxes, labeled once "Departments". A lantern lights inside one box, labeled "Austin Public Health", with a small caption "20 applications and a sanctioned sandbox"; a second lights, labeled "Austin Energy", with "Years of AI work"; then several smaller lanterns light in other boxes with no names. A ring of nine small dots forms around the grid, labeled "Practitioner group", with the caption "20 people in nine departments". A tag drops under the grid: "70 to 100 staff came to each Ask About AI". A grey tag sits apart at the right: "None of this is yet at one table". The slide ends on the lit grid, the ring, the two tags and the grey tag.

**You say:** The course's first move, in its 90-day playbook, is to see what exists before you set policy: everything built, bought, vendor-embedded and employee-made. We would apply that to people and work first. Austin Public Health has 20 applications and a sanctioned sandbox built with the security office. Austin Energy has years of AI work of its own. Other departments have smaller pockets, some of them employee-made and not on anyone's list. A practitioner group already reaches 20 people in nine departments, and 70 to 100 staff came to each Ask About AI session before those paused for the move into One ATS. None of this is yet at one table. That is the gap, and it is a cheap one to close.

Note: confirm the Austin Energy description with Austin Energy, and the practitioner group and Ask About AI numbers, before building.

### 4a. The City already runs agents, in one place
<!-- beat: proof and candor; APH builds with a fleet of agents today, the City is not ready to scale that, and the work has to continue in the City's own infrastructure or the momentum is lost -->
Speaker: Chris

**On screen:** APH already builds with a fleet of AI agents, and the City is not ready to scale that yet.
- Lead agents plan, build and review in a sandbox built with the security office; a person approves.
- The work continues with Microsoft and Quisitive, and Amazon is joining the conversation.

**They see:** A fenced yard draws in the middle, labeled "Sandbox", with a small caption "Built with the security office". Inside it, three green agents labeled "Lead agents" fill an application outline with blocks, two smaller agents labeled "Reviewers" check it, and a person gives it the orange approval mark with the label "A person approves". Outside the fence two nameplates settle side by side: "Microsoft" and "Quisitive". A third, drawn in a dashed outline, lands a little apart: "Amazon", with the caption "Joining the conversation". To the right a short stair of gates draws: "Explore", "Validate" and "Deploy" light green in turn, and "Scale" stays grey with a tag "Not ready to scale that yet". A tag at the foot of the fence reads "Over years". The slide ends on the yard, the agents at work, the orange mark, the partner nameplates and the stair with its grey top step.

**You say:** One pocket deserves its own slide, because it is further along than the course expects. Since late 2025 Austin Public Health has built its applications with a fleet of AI agents: lead agents read the lessons, permissions and tested modules, build in parallel, two AI reviewers check every change, and a person approves before anyone uses it. It runs inside a sandbox built with the security office over years, with Microsoft and Quisitive in the room every week, and Amazon now joining the conversation. In the course's gates it has passed explore, validate and deploy. The City is not ready to scale that yet, and the gates say not to. The work has to continue in that infrastructure, or the momentum and the people who know Azure go with it.


---

## Part 2. What the course taught (about 6 minutes)

### 5. Use the least autonomy that does the job
<!-- beat: idea one; the autonomy ladder, stop at the first rung that works, and many jobs need a plain tool -->
Speaker: Stefan

**On screen:** Use the least autonomy that does the job, and stop at the first rung that works.
- Automation, then copilot, then workflow, then agent; each rung adds more to govern.
- Many good ideas need a plain tool, built with AI help, with no AI inside at all.

**They see:** Four steps rise left to right like a stair, each a block: "Automation" with the caption "Fixed rules", "Copilot" with "A person approves every step", "Workflow" with "The steps are set", and "Agent" with "Chooses its own steps". A small green figure climbs onto the first step and stops; a deep-green tick appears over it with the label "Stop at the first rung that works". A grey arrow along the top of the stair reads "More to govern". Below the stair a small tool outline fills solid, labeled "Plain tool", with the caption "No AI inside". The slide ends on the stair, the figure on the first step, the grey arrow and the plain tool.

**You say:** The first idea is the one we would want every manager to carry. The course calls it least sufficient agency. There is a ladder: automation with fixed rules, a copilot where a person approves every step, a workflow where the steps are set and the model helps inside them, and an agent that chooses its own steps. Each rung up adds value sometimes and adds things to govern always. The test is to climb one rung at a time and stop at the first rung that works, then ask why not less. The course's first question is whether fixed rules can do the whole job. Often they can. Many of the City's good ideas need a plain tool, built quickly with AI help, with no AI inside at all.

### 6. Talent, not technology
<!-- beat: idea two; the organizations that get value build their own people; vendors cannot supply the City's knowledge -->
Speaker: Chris

**On screen:** The organizations that get value from AI build their own people, and vendors cannot do that for them.
- BCG: only six percent of companies lead on AI, and their edge is talent, not technology.
- Most value comes from pairing AI with the organization's own data and knowledge, not from buying.

**They see:** Two figures stand side by side. The left is an indigo box labeled "Technology" with a vendor tag on it; the right is a group of green people labeled "Talent". A scale draws under them and tips toward "Talent". Above, an indigo figure lands: "Six percent", with the caption "Outperform peers by 9.3 points". Then a bar splits into three parts, labeled "Buy", "Boost" and "Build", and the middle part, the largest, fills green with the caption "The organization's own data and knowledge". A small plaque settles at the right, labeled "BNY", with "Trained its workforce first". The slide ends on the tipped scale, the figure, the three-part bar and the plaque.

**You say:** The second idea answers the question every department asks, which is whether to wait for a vendor. BCG read 4,800 earnings calls and found that only six percent of companies qualify as AI leaders. They outperform peers by 9.3 points, and their greatest differentiator is talent, not technology: enterprise-wide fluency plus a small expert team. The course's buy, boost, build split puts most of the value in the middle, in what it calls boost, pairing a foundation model with the organization's own data and knowledge. That knowledge sits in City staff, not in any vendor. BNY runs more than 130 digital employees today, and the lesson the course drew is that it trained its workforce first. We would do the same.

### 7. Govern in proportion to risk, with rules the system enforces
<!-- beat: idea three; the enforcement ladder, the City's allow list as the model, and light controls for low-risk work -->
Speaker: Stefan

**On screen:** Enforced rules beat rules we ask models to follow, and the controls should fit the risk.
- The City's authorized tools list is already the strongest kind of control: the system enforces it.
- Light controls keep first projects moving; heavy controls go where exposure is high.

**They see:** Four blocks descend left to right like a stair going down: "The system enforces it", "Approval before effect", "A rule told to a model", and "A person checks". A green arrow at the left reads "Strongest". The City's fence post from slide 3 lands on the top block, labeled "Authorized tools list", with a deep-green tick. Below the stair a dial draws with three settings: "Assist-only work" with the caption "Light controls", "Approval" with "Named approvers", and "Exposure is high" with "Heavy controls". The needle rests on the first setting. The slide ends on the descending stair, the ticked post and the dial.

**You say:** The third idea is where the course is firmest. A rule told to a model in a prompt can be ignored or talked around; the course cites adaptive attacks beating tested defenses most of the time. A rule the system enforces, a permission, a network limit, a sandbox, holds. Approval before effect sits between the two. A person checks last, and only counts with time and authority. The City already has the strongest kind: staff cannot use what the system does not allow. The second half is proportion. Light controls for assist-only work, approved tools and data and a lightweight review, so first projects keep moving. Heavy controls, named approvers, tested stops, full logs, go only where exposure is high. The CISO's list and speed are not in conflict.

### 8. Why the order matters
<!-- beat: the evidence; three incidents, each a governance failure before it was a technology failure -->
Speaker: Stefan

**On screen:** Every incident the course studied was a governance failure before it was a technology failure.
- A coding agent deleted a production database in about nine seconds; it had a full-permission token.
- Uber used its full-year AI coding budget in about four months; a usage leaderboard drove the spend.

**They see:** Three plain cards settle in a row, each with a grey stripe at the top. The first reads "PocketOS", with "Deleting the production database" and under it a grey tag "Nothing asked before a destructive action". The second reads "Uber", with "Full-year AI coding budget in about four months" and a grey tag "Rewarded usage". The third reads "Air Canada", with "A refund policy its chatbot invented" and a grey tag "Nothing checked what it promised". A single line draws under all three, labeled "A governance failure before it was a technology failure". The slide ends on the three cards and the line.

**You say:** Three cases, and we chose the ones a City audience will recognize. In April a coding agent at PocketOS hit an error in staging and fixed it by deleting the production database in about nine seconds; it held a full-permission token and nothing asked before a destructive action. Uber spent its full-year AI coding budget in about four months because a leaderboard rewarded usage, and its chief operating officer said the link to shipped value was not there yet. A tribunal held Air Canada liable for a refund policy its chatbot invented; nothing checked what it promised. None of these needed a better model. Each needed a limit, a budget or a check that was not there. The last three slides, in that order, are what prevents them.

---

## Part 3. What we would do first (about 9 minutes)

### 9. What we are not proposing
<!-- beat: disarm the room; no agent, no platform, no reorganization; the first steps cost conversations -->
Speaker: Chris

**On screen:** We are not proposing to deploy agents, buy an agent platform or create a new organization.
- At the City's scale, the course says to manage individually: known use cases and named owners.
- The first steps cost conversations and time, not licenses or infrastructure.

**They see:** Three grey outlines sit in a row, each with a cross through it: "An agent platform", "A new organization", "Deploy agents". They fade back. In front of them a small green scene draws: a table with chairs around it, labeled "Conversations", and a calendar page beside it, labeled "Time". A small indigo tag at the foot reads "Manage individually", with the caption "Below about 10 agents". The slide ends on the three faded outlines behind the table and calendar.

**You say:** Before the method, what it is not. We are not proposing to deploy agents, to buy an agent platform or to create a new organization. The course is explicit that governance grows with population: below about 10 agents you manage individually, with known use cases, named owners and direct oversight, and the registries and control planes come much later. The City is at that early stage, and that is fine. The first steps we would take cost conversations and time rather than licenses or infrastructure, and they are the steps the course puts first anyway. They also do something the course cares about as much as the technology: they make the people who will do this work feel that they were asked.

### 10. Find the people
<!-- beat: method, step one; an open call for every AI practitioner in the City, and one table for them -->
Speaker: Chris

**On screen:** Step one is an open call for every AI practitioner in the City, and one table for them: an AI consortium.
- The course says high-value use cases can emerge from anywhere, so the call goes to every department.
- The consortium brings the pockets together, and the departments that led keep leading.

**They see:** The department grid from slide 4 returns with its lanterns lit. A card labeled "Open call" slides across the grid, and more lanterns light in boxes that were dark, each a small green person. The lit people step out of their boxes and gather around a round table in the middle, labeled "AI consortium". Three of the chairs are drawn a little larger, with the caption "The departments that led". The slide ends on the table, the people around it, and the grid behind them with its boxes now mostly dark.

**You say:** Step one is an open call. The course quotes Shopify giving every employee every tool on the belief that high-value use cases can emerge from anywhere in the company, and it contrasts that with a top-down memo elsewhere whose author later said he had not given enough context. So the call goes to every department, not to a chosen few, and it asks a plain question: who is building, piloting or teaching with AI today? The answers come to one table, which we are calling an AI consortium until leadership picks a better name. The departments that led keep leading inside it. That is how the City uses its own knowledge before it buys anyone else's.

### 11. Listen
<!-- beat: method, step two; department leaders, staff and community, their goals for 2027 and 2028, in their own words -->
Speaker: Chris

**On screen:** Step two is to listen to leaders, staff and the community, and to write it in their words.
- Ask what is slow or broken, where they could do more, and what their goals for 2027 and 2028 are.
- The course calls an honest channel for staff concerns the first no-regrets action, so this is it.

**They see:** Three round tables draw side by side, each with figures seated: "Department leaders", "Staff" and "Community". Over the first, three speech bubbles rise in turn: "What is slow or broken", "Where they could do more" and "Their goals for 2027 and 2028". Over the second, one bubble: "What worries them". Over the third, one bubble: "How it wants the City to use AI". A notebook page beside the tables fills line by line under the heading "In their own words". The slide ends on the three tables, their bubbles and the filled page.

**You say:** Step two is listening, and the course gives it unusual weight. Its first no-regrets workforce action is an honest channel for staff to raise concerns about AI without being labeled resistant, because leaders who create that channel learn early and leaders who don't learn too late. So we would sit with department leaders and ask what is slow or broken, where they could do more, and their goals for 2027 and 2028. We would ask staff what worries them. We would ask the community how it wants the City to use AI, and what it does not want. Everything goes down in their own words, because that language becomes the problem statement and the measure of success later.

### 12. Sort
<!-- beat: method, step three; the course's six criteria and its value-by-readiness chart; start where both are high -->
Speaker: Stefan

**On screen:** Sort the ideas by value and by readiness, and start where both are high.
- Six tests: decision density, impact, friction, data readiness, bounded authority, contained risk.
- Most first picks are assist-only work where a mistake is small and reversible.

**They see:** Idea cards fly in from the left as dots and land on a square chart with two axes, "Value" up the side and "Readiness" along the bottom. The four quadrants label themselves in turn: top right "Scale", top left "Prepare", bottom right "Experiment", bottom left "Defer". The top right fills with a green wash. Beside the chart a short checklist draws with six lines, each getting a deep-green tick: "Decision density", "Impact", "Friction", "Data readiness", "Bounded authority", "Contained risk". The slide ends on the chart with its lit corner and the ticked list.

**You say:** Step three is sorting, and the course hands us the tool. It names six tests for a golden use case: decision density, meaning frequent decisions where speed and consistency pay; measurable impact; friction in the current process; data readiness; bounded authority, meaning the rules for the AI can be written and enforced; and contained risk, meaning errors are recoverable. Then it puts every idea on a chart of value against readiness. Top right you scale. Top left you prepare the foundations first. Bottom right you experiment with a clear learning goal. Bottom left you defer, so it does not consume scarce capacity. For the City, most first picks will be assist-only work where a mistake is small and reversible, and that is the point.

### 13. Two lanes
<!-- beat: the plan's shape; deliver quick wins now while a second lane builds the foundations; the course calls it running two modes at once -->
Speaker: Chris

**On screen:** Run two lanes at once: quick wins now, and the foundations that make the next ones faster.
- Lane one is where we deliver quick wins now: small, reversible tools out of listening and sorting.
- In lane two we build the foundations: training, a software lifecycle, one toolset, infrastructure.

**They see:** Two lanes draw, one above the other. The lower lane is labeled "Deliver quick wins now", and small green boxes ship along it one after another. The upper lane is labeled "Build the foundations", and four pieces fill in turn: "Training", "Software lifecycle", "One toolset", "The infrastructure the City already built". An arrow runs down from each piece into the lower lane, and the boxes there move faster after each arrow lands. A small indigo tag at the right reads "Fast lane and slow lane", with the caption "Both at once". The slide ends on both lanes full and the tag.

**You say:** The plan has two lanes, and the course says to run both at once; it calls them a fast lane and slow lane, rapid experimentation beside structural change. Lane one is what the City can deliver now: small, reversible tools that come out of the listening and the sorting, many of them plain tools built with AI help. Lane two is the longer work that makes lane one faster every quarter: training, a shared software lifecycle, one toolset and the infrastructure the City already built, extended rather than replaced. Each piece of lane two is an arrow into lane one. The course's warning about pilot purgatory applies here: every lane one project names a sponsor accountable for adoption and a transition plan before it starts, not after.

### 14. Level up the people we have
<!-- beat: capacity; three tiers of fluency, developers moving from AI user to AI engineer, and why training beats handing out licenses -->
Speaker: Chris

**On screen:** Level up the staff the City already has, in three tiers, starting with the developers.
- Everyone AI-aware, leads AI-proficient, a small expert team; the course asks where our gaps are.
- Developers move from AI user to AI engineer, with training and a lifecycle, not just licenses.

**They see:** Three tiers draw as a pyramid. The wide base is labeled "AI-aware", with the caption "Everyone"; the middle "AI-proficient", with "Functional leads and process owners"; the top "AI-expert", with "A small expert team". Each tier lights green in turn. Beside the pyramid a row of developer desks draws, labeled "Developers". A grey tag over the row reads "AI user", and as a slab labeled "Training and a lifecycle" slides under the desks, the tag turns green and reads "AI engineer". A small indigo figure sits at the foot: "19 percent slower", with the caption "Tools and no method". The slide ends on the lit pyramid, the lifted row and the figure.

**You say:** Now the people, because the course puts them ahead of the technology. It describes three tiers of fluency. Everyone AI-aware: what it can and cannot do, and the user's governance duty. Functional leads and process owners AI-proficient: able to evaluate a vendor claim, design a workflow and define a success measure. And a small expert team, AI-expert, that builds and governs. The course asks where our gaps are, and ours are at every tier. The developers come first. The course frames their change as moving from AI user to AI engineer, and it cites a study where developers given tools and no method were 19 percent slower while believing they were faster. Training and a lifecycle are what make the tools pay.

### 15. Measure outcomes, not pilots
<!-- beat: direction; every project tied to the Citywide Strategic Plan, with a baseline before a target -->
Speaker: Stefan

**On screen:** Measure outcomes, not pilots, and tie every project to a Citywide Strategic Plan priority.
- The course's mindset shift: from counting pilots and deployments to measuring results.
- Goals first, then a baseline, then a target; a data owner for every measure.

**They see:** Six tiles draw across the top, labeled once "Citywide Strategic Plan". The first tile lights and its name appears: "High-Performing Government". Small project dots rise and attach to the tiles, most to the first. Below, a grey tally labeled "Counting pilots" draws and fades, and in its place a line draws from a point labeled "Baseline" to a point labeled "Target", with a small nameplate under it reading "Data owner". The slide ends on the six tiles, the attached dots and the measure line.

**You say:** The last step of the method is how we would know it worked. The course's table of mindset shifts has one line we would put on the wall: from counting pilots and deployments to measuring business outcomes. So every project ties to one of the six priorities in the 2026 Citywide Strategic Plan, and the closest to this work is High-Performing Government, with its goal of secure, modern, accessible technology. Then goals first, a baseline before any target, and a named data owner for every measure. The course adds that value, adoption, performance and economics should improve together before anything advances. Training attendance and tool counts describe effort. They are not the result.

---

## Part 4. When agents come, and the ask (about 6 minutes)

### 16. When agents come, we will be ready
<!-- beat: the playbook on the shelf; four levels, a named owner for each agent, and manage individually at the City's scale -->
Speaker: Stefan

**On screen:** When agents come inside tools we already own, we will have a playbook on the shelf.
- Classify each one into four levels, from no-go to bounded autonomy, and name a human owner for each.
- At the City's scale that is a list and a set of owners, not a platform.

**They see:** Four bands draw across the slide, each in its own hue: grey "No-go", with the caption "Never without a person"; sky "Assist only", with "Read-only tools"; gold "Execute with approval", with "A named approver signs off"; and pink "Bounded autonomy", with "Strict limits and a tested stop". A short list draws beneath with three rows, each a small agent icon, a level, and a nameplate reading "Owner". A grey tag at the foot reads "A list and a set of owners". The slide ends on the four bands and the short list.

**You say:** Agents will not wait for the City's strategy. Vendors keep adding agent features to products the City already owns, so some will arrive inside authorized tools. For that day the course gives a playbook we would keep on the shelf. Classify each agent into one of four levels: no-go, never without a person, for anything that transacts, decides regulated matters or cannot be undone; assist only, with read-only tools; execute with approval, where a named approver signs off before anything takes effect; and bounded autonomy, with strict limits and a tested stop. Give every agent a named owner, which the course found is often nobody. At the City's scale that is a list and a set of owners, not a platform.

### 17. Who decides what
<!-- beat: roles; leadership sets the bright lines, the DCIO decides authority, the CISO owns the controls; three questions for any proposal -->
Speaker: Stefan

**On screen:** Leadership sets the bright lines, the DCIO decides authority, and the CISO owns the controls.
- Three questions for any AI proposal: what can it touch, what enforces its limits, who would know.
- The decisions on this side of the table are about authority, not plumbing.

**They see:** Three tiers draw as a short stack. The top tier is labeled "Leadership", with the caption "Sets the bright lines". The middle is labeled "DCIO", with "Decides authority", and it gets the orange mark of a person deciding. The bottom is labeled "CISO", with "Owns the controls". Arrows run down the left side labeled "Authority flows down" and up the right side labeled "Evidence flows up". To the right, three cards land in turn: "What can it touch", "What enforces its limits" and "Who would know". The slide ends on the stack, its arrows and the three cards.

**You say:** The course is careful about who owns which decision, and we think this is the most reassuring slide in the talk. Leadership sets the bright lines: what AI may never do without a person, in dollars and in kinds of decision. The DCIO decides authority, meaning how much each system may do on its own and what needs approval. The CISO owns the controls that enforce it, with Stefan's deck in the backup as the working draft of that conversation. Authority flows down, evidence flows up. For any proposal that lands on your desk, the course leaves three questions: what can it touch, what enforces its limits, and who would know if it went wrong? If a vendor cannot answer those, that is the answer.

### 18. Used for residents, never on them
<!-- beat: the line; AI helps staff serve residents, never judges them, and the community's voice from the listening step sets the test -->
Speaker: Chris

**On screen:** Used for residents, never on them.
- AI helps City staff serve residents, and it never judges a resident or replaces a person's decision.
- The test is whether residents would see the City serving them better over the long term.

**They see:** A City staff member sits at a desk, labeled "City staff", with a small green AI helper at their side, labeled "AI". Across the counter a resident steps up, labeled "Resident". A low fence line draws between the helper and the resident, labeled "Never judges a resident". Help still passes over it: a card labeled "In their own language" goes across to the resident, while the helper stays on its own side. The staff member gets the orange mark of a person deciding. A plain checklist appears to one side under the heading "The test", and each line gets a deep-green tick: "Serving them better", "Over the long term". The slide ends on the desk, the fence line, the orange mark and the ticked list.

**You say:** One line runs under all of this, and it is where the community's voice from the listening step comes back. AI at the City is used for residents, never on them. It helps City staff serve more people, and serve them in their own language. It never judges a resident, decides a benefit or replaces a person's decision about one; that is the no-go level, and it is where leadership's bright line belongs. The course would call it the clearest case for a person always in the loop. The test for any project is whether residents would see it as the City serving them better over the long term. If they would not, the City should not build it, however feasible it is.

### 19. Four decisions
<!-- beat: the ask; four decisions that cost conversations and one that costs nothing but permission, each with a named owner in the two presenters -->
Speaker: Chris and Stefan

**On screen:** Four decisions would start this, and none of them needs a budget line yet.
- Sanction the open call and the AI consortium, and sponsor the listening tour with departments.
- Keep the agent work going in the infrastructure the City built, with its Azure staff focused on it.

**They see:** An indigo panel fills the slide under the title. Four numbered lines settle on it one at a time in white with green numerals: "Sanction the open call and the AI consortium", "Sponsor the listening tour", "Pick one first use case lane and adopt the four levels", "Keep the agent work going in the infrastructure". Under each, a small green nameplate lands: "We would run" under the first two, then "Stefan would draft the levels with the CISO", then "The Azure staff keep going". A grey tag at the foot, on the white ground below the panel, reads "None of this needs a budget line yet". The slide ends on the panel, the four lines and their nameplates.

**You say:** We will end with the decisions, and we kept them to four. First, sanction the open call and the AI consortium, so the City's practitioners come to one table with leadership's blessing. Second, sponsor the listening tour: a few weeks of conversations with department leaders, staff and the community that we would run and write up in their words. Third, pick one first use case lane and adopt the four levels now, so the first agent inside an authorized tool has a place to be classified; Stefan would draft the levels with the CISO. Fourth, keep the agent work going in the infrastructure the City built, with its partners, and let the Azure staff keep going on it. None of this needs a budget line yet.

### 20. Let's talk
<!-- beat: close; the floor goes to the room with the first question, and the backup deck is named -->
Speaker: Chris and Stefan

**On screen:** Let's talk.
- We would like to hear what you would most want a City AI strategy to do first.
- We would also like to hear what you would need from us to make these four decisions.

**They see:** The close is navy, with the City of Austin wordmark in white. The title and the two story lines settle in the middle in white, and a small line at the foot reads "Backup slides". Nothing moves after that.

**You say:** That is what we brought back. The world moved fast and mostly moved badly, and the organizations that got value did the foundations first: their own people, honest listening, small reversible wins and controls the system enforces. The City is behind on operationalizing AI and ahead on the thing that matters most, which is staff who have already done this work and are waiting to be asked. We would like to hear what you would most want a City AI strategy to do first, and what you would need from us to make these four decisions. Stefan's deck on the security side is in the backup slides, and we are glad to go as deep as you like.

---

## Backup

The CMU briefing deck, "Five ideas for agentic AI at the City", follows as the backup section for the security discussion: exposure scoring, the lethal trifecta, enforcement at the loop, agent identities, the five-lever kill switch, the policy layer, the gated lifecycle and cost caps. It is kept as built and is not parsed as part of this script.
