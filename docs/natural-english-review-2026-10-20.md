# Natural-English review of the ATS slides

Reviewed October 20, 2026. This pass focuses on awkward phrasing, compressed reasoning, unclear references, and metaphors that obscure the intended meaning. It replaces the emphasis of the earlier review with the lens agreed in this conversation.

All 34 main slides were reread, including titles, story lines, visible labels, and speaker notes. The numbered headings below use presentation order; the script identifier is included because its inserted slides use numbers such as 2a and 12b. Your lesson-two example is displayed slide 10, script slide 8.

These are suggested edits, not changes to the deck. Unlisted wording can generally stay for this language pass. Natural idioms and concise labels are not problems by themselves; the test is whether the reader can understand the intended action or relationship without reconstructing it. Numerical claims and policy choices are not being revalidated here.

Where the original could mean two different things, the ambiguity is identified instead of silently choosing a new meaning. Quoted statements attributed to other people on slide 17 are preserved.

## Recurring lesson names

Use the same wording when the four lessons first appear, when each is explained, and when they return near the end:

1. Give the AI only as much independence as the task requires.
2. Design the system to enforce the agent’s limits.
3. Train your own staff before buying an AI product.
4. Start with tasks where mistakes have little impact and are easy to fix.

The third lesson is already natural English. Its recommendation is preserved here; this pass is not changing the purchasing policy it advocates.

## Passage-by-passage suggestions

### Slide 1: Title (script 1)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| Notes | “We came back with more than we can use” | Sounds as though the learning is unusable; the intended point is selecting what is relevant. | We covered a lot in the course. For this talk, we chose the lessons most relevant to the City. |
| Notes | “Then we will put the City next to those four lessons” | A city cannot literally be put beside lessons; the comparison is left unstated. | Then we will look at how those lessons apply to the work already under way at the City. |

### Slide 2: The course (script 2)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen and notes | “Each module ended with a build of our own” | “A build” substitutes a development noun for what the participants actually did. | In each module, we built and tested an agent ourselves. |
| Notes | “the data and architecture underneath” | Underneath what? The technical relationship is missing. | the data and system architecture agents need |
| Label | “A build of our own” | Same compressed noun on the drawing. | Building and testing an agent |

### Slide 3: Four lessons (script 2a)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Give AI the least freedom to act on its own that gets the job done.” | The long modifier makes “freedom” sound like the thing doing the job. | Give an agent only as much independence as it needs to complete the task. |
| On screen, label and notes | “Put the rules where AI cannot break them” | Rules are treated as objects whose location prevents a violation. The missing idea is system design and enforcement. | Design the system to enforce the agent’s limits |
| On screen and label | “Start where a mistake is cheap” | “Where” and “cheap” hide which work to choose and what makes a mistake acceptable. | Start with tasks where mistakes have little impact and are easy to fix |
| Notes | “when you have command of that use case” | An unnatural way of saying the team has learned to deliver the work reliably. | once you can do that work reliably |
| Notes | “Then we will use them at three stops” | The route metaphor replaces the actual structure of the talk. | We will look at how companies are using AI, what the City is doing now, and what we recommend doing next. |

### Slide 4: Enterprise is spending big (script 3)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Most of the money pays to connect AI that companies rent to their own data and their own staff.” | “Connect AI to staff” does not describe the work. The sentence also nests several possessives. | Much of that spending helps staff use commercial AI services with their organization’s own data. |
| On screen and notes | “no vendor can sell the City its knowledge of its own services” | A clever construction that makes ownership of the knowledge difficult to follow. | City staff know how our services work. We need their knowledge to make these tools useful. |
| Label and notes | “Your own data on rented AI” | “Data on AI” does not say how the two are used together. | Commercial AI connected to your organization’s data |
| Notes | “So the money is not mostly buying new AI.” | Money is made the actor, and “new AI” is undefined. | Much of the work is adapting existing AI services to the organization’s needs. |

### Slide 5: From chatbots to agents (script 4)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| Label and notes | “Drafts while a person decides” | Decides what? The contrast omits the person’s actual role. | Drafts work for a person to review and approve |
| Label | “Stops at a limit someone set” | The metaphor leaves the behavior unclear. | Stops when the next action needs permission |
| Notes | “The loop is the whole point.” | Names the drawing instead of explaining why the repeated process matters. | The agent checks what happened and uses that result to decide what to do next. |

### Slide 6: Review moved off the person (script 4a)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Human in the loop worked for chatbots.” | Uses an unexplained technical label as a complete explanation. | With a chatbot, a person can review an answer before using it. |
| On screen | “people take the risky ones” | “Take” hides the action: review, decide, approve, or perform? | people review changes that could have serious consequences |
| Notes | “settings that block risky actions catch what it misses” | Settings do not catch missed review findings; controls prevent particular actions. | Separate controls block actions the agent is not allowed to take, even if the AI reviewer misses a problem. |
| Notes | “So enterprise moved the review into the system.” | An abstract collective actor and a spatial metaphor obscure the mechanism. | Companies began automating parts of the review process. |

### Slide 7: What a fleet is (script 5)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Builders do the pieces.” | The object is vague and the verb is filler. | Builder agents complete the assigned tasks. |
| On screen | “A permission checker lets routine actions run and holds risky ones for a person.” | “Holds ... for a person” omits what the person must do. | A permission checker allows routine actions and pauses risky actions until a person approves them. |
| Notes | “it spent as much time on the walls between the agents as on the agents themselves” | The course cannot spend time on figurative walls without explaining what they represent. | The demonstration gave as much attention to separating the agents’ permissions and responsibilities as to the work each agent performed. |

### Slide 8: Most who rushed stumbled (script 6)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| Notes | “All that spending bought a lot of stumbling.” | Forced wordplay substitutes for a statement about outcomes. | Despite that spending, companies ran into serious problems. |
| On screen | “These three cases show the last one.” | The listener must look back through a list to identify the subject. | These three cases illustrate failures in controls. |
| Label and notes | “No step required a person to confirm first” | No object for “confirm”; the permission failure remains vague. | The agent could delete the database without a person’s approval. |
| Label and notes | “Its chatbot promised refunds that did not exist” | Refunds are described as nonexistent objects; the issue is eligibility or policy. | Its chatbot promised refunds the airline’s policy did not allow. |

### Slide 9: Lesson one: the least autonomy that gets the job done (script 7)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Use the least autonomy that gets the job done.” | Autonomy is made the thing that gets the job done. | Give the AI only as much independence as the task requires. |
| On screen | “Each rung up means more autonomy, and more to control, review and answer for.” | “More” lacks an object three times. | As AI makes more decisions on its own, staff need to control its actions, review its work, and remain accountable for the results. |
| Notes | “There are four rungs, and they climb like a stair.” | Rungs do not climb; the sentence also mixes a ladder with a staircase. | The diagram shows four approaches, from fixed automation to agents that choose their own steps. |
| Notes | “ask why not less” | Compressed past the point of a natural question. | Ask whether the task could be done with less autonomy. |
| Notes | “so each job can land on the lowest one that works” | A task is made to land on a rung instead of someone choosing an approach. | so teams can choose the simplest approach that meets the need. |

### Slide 10: Lesson two: put the rules where the AI cannot break them (script 8)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Put the rules where the AI cannot break them.” | The central example: it replaces designing enforceable limits with an incoherent instruction to locate rules. | Design the system to enforce the agent’s limits. |
| On screen | “If you only tell an AI a rule, a clever request can talk it out of it. If the system blocks the action, it cannot.” | Repeated “it” has shifting referents; the second sentence leaves the prohibited action unstated. | An agent may ignore a rule written in its instructions. Permissions and system controls can prevent it from taking the prohibited action. |
| Notes | “with a permission it does not have or a network it cannot reach” | The system does not block something “with” a missing permission. | by denying the required permission or blocking access to the network |
| Notes | “the authority to stop what they are looking at” | “What they are looking at” hides what the reviewer can actually stop, especially after an action has occurred. | the authority to stop further action and require corrections |
| Notes | “The second half of the lesson is proportion.” | An abstract noun stands in for the practical instruction. | The level of control should match the consequences of a mistake. |
| Label | “Approvals and system blocks” | “System blocks” is not a natural description of the mechanism. | Required approvals and technical restrictions |

### Slide 11: Lesson three: train your own staff first (script 9)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “stand apart on talent” | Corporate shorthand that does not explain the difference. | have staff with the skills to put AI to use |
| Notes | “fluency across the whole workforce plus a small expert team” | “Fluency” is undefined, and the fragment compresses two distinct requirements. | Staff throughout the organization understand how to use AI, and a small expert team provides specialist support. |
| Notes | “That is the asset the boost spending puts to work” | Stacks three abstractions: asset, boost spending, and putting something to work. | Connecting AI to City data is useful because staff know how to apply that data to City services. |

### Slide 12: Lesson four: start where a mistake is cheap (script 10)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Start where a mistake is cheap. Once that works, take on something harder.” | “That” refers vaguely to starting somewhere; the cost and work are both implicit. | Start with tasks where mistakes have little impact and are easy to fix. Take on more complex work once the first project runs reliably. |
| Label | “Passed on results” | Reads like a fragment of an idiom and does not identify what passed or why. | Results meet the requirements for the next stage |
| Notes | “a project passes each one on results” | “Passes on results” is not a natural way to describe evaluation. | The team checks the project’s results before approving it for the next stage. |
| Labels | “Friction in today's process” | A compressed abstraction; name the problem being sought. | Delays or difficulties in the current process |
| Labels | “Ready data” | Does not specify ready for what. | Data available and suitable for the task |
| Labels | “Contained risk” | Does not tell the reader what containment means here. | Mistakes have limited consequences |
| Notes | “The rest of the talk is where the City stands against the four” | An awkward comparison with an omitted noun. | Next, we will look at how the City’s current work compares with these four lessons. |

### Slide 13: On paper, the start line (script 11)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “On paper, the City is at the start line.” | The metaphor leaves “on paper” undefined. The next bullet provides the missing meaning. | The City has not yet established an AI strategy, a dedicated AI team, or an AI budget. |
| Notes | “the enterprise pack we just described spends 17 percent of its IT budgets” | Treats a racing pack as an organization with budgets. | the companies we just discussed are already allocating substantial IT funding to AI |

### Slide 14: Limits alone breed shadow IT (script 11a)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Shadow IT is tools staff use on their own that IT cannot see.” | Awkward definition and an unexplained metaphor about visibility. | Shadow IT means staff use tools without IT’s knowledge or approval. |
| On screen | “gives the City visibility and real control” | Names benefits without saying what the City can actually do. | helps the City track which tools staff use and control what data those tools can access |
| Notes | “staff have a sanctioned way to do the work” | “Sanctioned way” is stilted and less clear than the concrete object. | staff have approved tools that meet their needs |

### Slide 15: What already exists (script 12)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen and notes | “Off paper, the City has more AI work under way than anyone has counted.” | “Off paper” is an invented opposite to “on paper”; the intended contrast is formal structure versus actual work. | Departments already have AI projects under way, but we do not yet have a complete inventory. |
| Label and notes | “a legacy system read by agents” | Agents may inspect source code or retrieve records. “Read a system” conceals which activity is meant. | If this means records: “Agents retrieve information from an older system.” If this means code: “Agents help staff understand an older system’s code.” |
| Notes | “Some of this is in service and some is prototype.” | Missing noun and unnatural parallelism. | Some projects are already in use; others are still prototypes. |
| Notes | “A practitioner group reaches 20 people in nine departments” | “Reaches” suggests outreach rather than membership. | The practitioner group includes 20 staff from nine departments. |

Meaning to resolve: “a legacy system read by agents” needs the author to specify whether agents inspect code, retrieve records, or do something else.

### Slide 16: The rest of the country has noticed (script 12a)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| Notes | “A program that starts here walks into a community with a reputation already attached.” | Programs do not walk, and reputations are not attachments. The actual benefit is obscured. | A citywide AI program would build on staff expertise and work that has already received outside recognition. |
| On screen and notes | “There is more, and finding it is step one.” | “More” and “it” leave the object vague. | Our first step is to identify the other AI work happening across departments. |

### Slide 17: A community already at work (two clicks) (script 12b)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen, label and notes | “govern as you go” | Could mean integrating oversight throughout the work or improvising rules after deployment. | Make oversight part of the work from the start |
| Notes | “That is the community this program walks into.” | Repeats the personification rather than explaining how the program relates to existing staff. | Those are the people and practices a citywide program would build on. |

### Slide 18: Infrastructure ready for AI (script 13)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “A walled-off Azure sandbox with AI running in it, and an agreement with security to build there.” | A fragment that combines a place, a service, and an agreement without a main verb. | We have an isolated Azure environment running AI services, and the security team has agreed that we can develop tools there. |
| On screen | “To go live, they go through the CISO and DCIO to the CIO.” | Tools are made to travel through people; the actual action is review and approval. | Production use requires review through the CISO, the DCIO, and the CIO. |
| Notes | “so a team does not start by asking for one” | “One” has no clear singular antecedent: AI, model, service, or sandbox? | so teams can begin with AI services already available in the sandbox |
| Notes | “The City's guardrails today speak to broad use, the Copilot everyone has.” | Guardrails do not speak, and “broad use” leaves the scope unclear. | The City’s current guidance covers staff use of tools such as Copilot. |
| Notes | “So the capacity to deploy is here.” | Does not say whether deployment means testing or production; the preceding sentences distinguish them. | We can build and test tools in the sandbox. Putting them into production requires a separate approval. |

### Slide 19: The four lessons already fit it (script 14)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Every person and AI signs in, the network blocks what it should not reach, and a person approves each build.” | “Every AI” is an awkward noun, and the network appears to be the thing trying to reach something. | People and agents authenticate before gaining access. Network controls restrict connections, and a person approves each build. |
| Notes | “when I came home and laid its list against the sandbox, the two matched” | A physical comparison substitutes for comparing specific controls. | When I compared the controls taught in the course with those in the sandbox, I found the same approaches in use. |
| Label | “One sign-in, with roles” | Conflates a sign-in mechanism with permissions without explaining their relationship. | Sign-in and permissions based on each user’s role |
| Label | “Cannot reach what it should not” | Both the actor and the destination are missing. | Network access restricted to approved systems |
| Notes | “there is every change written down as code, in Azure DevOps, so it can be replayed” | Unnatural sentence structure; “every change” and “replayed” obscure the type of record and operation. | Infrastructure changes are stored as code in Azure DevOps, so the team can review and repeat them. |
| Notes | “that is leadership's to supply” | An awkward possessive that hides the decision required. | Leadership can establish that team and authorize it to develop the process. |

Meaning to resolve: the Azure DevOps rewrite assumes the intended subject is infrastructure changes stored as code. If the intended claim is logging runtime actions, say “The system logs the actions each agent takes” instead, only if that describes the actual setup.

### Slide 20: Where the City stands (script 15)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Counted properly, the City is a third of the way to the enterprise pack, with a working agent fleet.” | What is being counted? The racing metaphor replaces a description of current capability. | The City already has experienced staff, AI infrastructure, and a working team of agents. |
| On screen | “Scale is the one it is not ready for.” | “Scale” is treated as a self-explanatory destination, and “it” is vague. | The next step is preparing to support this work more widely. |
| Notes | “Scale is the one gate it has not earned.” | A project does not earn a gate; it meets requirements or receives approval. | The work is not yet ready to expand to more teams. |
| Notes | “it should not try until the organization exists to carry it” | Neither “it” has a clear actor, and an organization carrying work is too vague. | Before expanding, we need a team responsible for supporting the work. |

### Slide 21: What we are not proposing (script 16)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen and notes | “The first steps cost conversations and calendar time” | Conversations are an activity, not a unit of cost. “Calendar time” hides staff effort. | The first steps require staff time to meet, compare work, and agree on priorities. |
| Notes | “the plan respects it” | A plan is personified instead of saying how its scope fits the situation. | The proposal starts with managing the agents individually. |

### Slide 22: Make the consortium official (script 17)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “An open call to every department, and one table for the people who answer.” | A fragment with no actual instruction; “one table” stands in for forming a group. | Invite staff working with AI in every department to join a citywide practitioner group. |
| Notes | “The answers come to one table.” | Answers are made to gather at a table instead of the people who respond. | Bring the people who respond together. |
| Notes | “the program walks into it rather than seeding it” | Mixes walking and planting metaphors. | The program would organize a community that already exists. |
| Notes | “the departments that led keep leading inside it” | “Led” has no object, and “inside it” makes the group sound like a container. | Staff from departments that have led this work should help lead the group. |

### Slide 23: An AI program team from staff we have (script 18)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| Notes | “An AI program team, drawn from it, with one of them as lead and all of them already doing this work, takes on strategy, architecture and consulting with departments.” | Nested clauses and shifting pronouns make a simple staffing proposal hard to follow. | Choose a small team from the consortium and designate a lead. These staff would develop the AI strategy, guide system design, and advise departments. |
| Label and notes | “The staff who built the Azure infrastructure stay on it” | “Stay on it” is vague about responsibility. | The existing Azure team continues to maintain the infrastructure. |
| Notes | “the team is organized around them rather than over them” | Spatial language hides the intended division of responsibilities. | The program team would coordinate with the Azure team while that team continues to manage the infrastructure. |
| Notes | “the consortium and a governance team could assemble themselves now” | Teams cannot literally create their own authority or membership; the actor is missing. | Staff already doing this work could form the initial consortium and program team. |

### Slide 24: Listen (script 19)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Listen, in their own words, to department leaders, staff and the community.” | “In their own words” is attached to listening instead of to how people describe their experience. | Ask department leaders, staff, and residents to describe their needs in their own words. |
| On screen and notes | “where they could do more” | More of what: volume, services, quality? | what they would like to accomplish but cannot do today |
| Notes | “Its first no-regrets workforce action is an honest channel for staff to raise concerns about AI without being labeled resistant, because leaders who open that channel learn early.” | Consulting jargon, a metaphorical channel, and an unfinished claim about what leaders learn. | The course recommends giving staff a way to raise concerns about AI without being labeled resistant. That helps leaders identify problems before choosing tools. |
| Notes | “that language becomes the problem statement and the measure of success” | Words do not themselves become a measurement. The intervening work is missing. | We use their descriptions to define the problem and agree on what a successful result would look like. |

### Slide 25: Sort (script 20)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “The six tests from lesson four score each idea's value and readiness, and that places it on the chart.” | Tests are made to perform the scoring; the human evaluation is missing. | Use the six criteria from lesson four to assess each idea’s value and readiness, then plot it on the chart. |
| Notes | “Top right, high on both, we start.” | Compressed presenter shorthand. | Start with ideas that offer high value and are ready to implement. |
| Notes | “That gives us two lanes.” | The sentence jumps from prioritizing ideas to two workstreams without explaining the connection. | Some projects are ready to begin. Others need better data, tools, or skills first. We can deliver the first group while preparing for the second. |

### Slide 26: Two lanes (script 21)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Then run two lanes at once: quick wins now, and the foundations that make the next ones faster.” | “Run two lanes” makes the drawing do the explanatory work. | Deliver small, useful projects now while building the skills and infrastructure needed for future projects. |
| Notes | “Each piece of lane two is an arrow into lane one.” | Describes a graphic instead of the relationship it is supposed to show. | Training, shared tools, and reliable infrastructure help teams deliver the next project more efficiently. |
| Notes | “Every lane one project names a sponsor accountable for adoption before it starts, which is the course's cure for pilot purgatory.” | Projects do not name sponsors, and the slogan hides why the role matters. | Before each project starts, assign a sponsor responsible for helping staff put it into use. That gives the project an owner beyond the pilot. |

### Slide 27: Level up the staff the City has (script 22)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Three tiers: everyone aware of AI, leads who can judge and design with it, and the program team as the experts.” | “Aware” is weak, while “judge and design” lacks objects. | Everyone should understand the basics. Team leads should be able to assess AI tools and design workflows. The program team provides specialist expertise. |
| On screen | “from using AI tools to building with them” | The distinction is not clear: building with a tool is also using it. | Help developers move from asking AI for individual answers to using it throughout software development and review. |
| Notes | “Training and a way of working are what make the tools pay.” | “A way of working” and “pay” hide the practical benefit. | Training and a shared development process help staff use the tools effectively. |

Interpretation: the developer rewrite takes “building with AI” to mean using AI throughout software delivery. If the intent is building applications that contain AI, use “Train developers to build applications that use AI, as well as to use AI tools themselves.”

### Slide 28: Measure outcomes (script 23)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Goals first, then a baseline, then a target, with a named person responsible for each measure.” | The sequence is useful but reduced to nouns rather than instructions. | Define the goal, measure current performance, set a target, and assign someone to track the result. |
| On screen | “Training attendance and tool counts measure effort. They are not the result.” | “The result” is left unnamed. | Attendance and tool counts show activity. We also need to measure whether the work improves City services. |
| Notes | “value, adoption, performance and economics should improve together before anything moves up a gate” | Abstract nouns and a physically awkward gate metaphor hide the evaluation. | Before expanding a project, check whether people use it, whether it works well, and whether its benefits justify its cost. |

### Slide 29: When agents come (script 24)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Sort each one into four levels by how much it may do on its own” | Literally assigns each agent to four levels rather than one. | Assign each agent to one of four levels based on what it may do without approval. |
| On screen and notes | “At the City's scale that is a list and a set of owners” | The compressed noun phrase omits what should be recorded and who is responsible. | Start with a register showing each agent, its permitted actions, and the person responsible for it. |
| Notes | “Agents will not wait for the City's strategy.” | Personifies agents as impatient participants; the next sentence contains the real cause. | Vendors are adding agent features to products the City already uses. |
| Label | “Strict limits and a tested off switch” | “Off switch” may be a useful metaphor, but the action should be explicit. | Defined permissions and a tested way to stop the agent |

Meaning to resolve: “No-go” currently means work an agent may not do on its own, which also describes “Act with approval.” If it means prohibited work, say “Tasks agents are not allowed to perform.” If it means human-only decisions, say “Decisions reserved for people.” This needs an intended distinction, not just a smoother label.

### Slide 30: Who decides what (script 25)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Leadership draws the lines AI may never cross. The CISO owns the controls that hold them.” | Controls do not “hold” lines; the relationship is decision versus enforcement. | Leadership sets the limits on AI use. The CISO is responsible for the controls that enforce those limits. |
| Notes | “what it may never do without a person, in dollars and in kinds of decision” | “Without a person” omits approval; “in dollars and in kinds” awkwardly compresses two limits. | which decisions require human approval and how much an agent may spend without it |
| Label and notes | “What can it touch” | Vague enough to obscure data access versus authority to act. | What data can it access, and what actions can it take? |
| Notes | “my deck in the backup is the working draft of that conversation with the CISO” | A deck is not a draft of a conversation; it contains proposals for discussion. | The backup slides contain the draft controls we are discussing with the CISO. |

### Slide 31: Used for residents, never on them (script 26)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Used for residents, never on them.” | An arresting slogan, but “on them” does not identify the prohibited conduct. | Use AI to help staff serve residents. Keep decisions about residents with accountable staff. |
| Notes | “It never judges a resident, decides a benefit or replaces a person's decision about one.” | “Decides a benefit” is not idiomatic, and “one” could mean a resident or a benefit. | AI should not determine a resident’s eligibility for a benefit or replace the staff member responsible for that decision. |
| Notes | “One line runs under all of this, and it is where the community's voice from the listening step comes back.” | The opening spends its words on the presentation structure instead of the principle. | Residents’ needs should guide how the City uses AI. |

### Slide 32: Where the City could be (script 27)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Five decisions, each already half done, would put the City with the pack within a year.” | A decision is not half done because preparatory work exists. “With the pack” does not name a desired capability. | We are asking for five decisions to support the next year of work. Staff have already laid the groundwork for each. |
| On screen | “add data tiers and a budget” | “Add” leaves both the policy and the funding action implicit. | define which data each AI tool may use and allocate funding for the work |
| Label | “Costs only calendar time” | Time belongs to people; “calendar time” evades the actual commitment. | Requires staff time for meetings and follow-up |
| Label and notes | “the approved tools list is tier one” | A tool list is not self-evidently a data tier. The intended relationship is missing. | Build on the approved-tools list by specifying which types of data each tool may handle. |
| Notes | “with the Azure staff on it” | Pronoun shorthand obscures the continuing responsibility. | with the Azure team continuing to support the infrastructure |

### Slide 33: That was the course, applied (script 28)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “Lesson one gave us plain tools first and the four levels.” | A lesson is made to generate objects; the reasoning connecting it to the proposal is missing. | Using only the autonomy a task needs means starting with simple tools and defining what each agent may do. |
| On screen | “Lesson three gave us the consortium and the program team. Lesson four gave us the gates and the two lanes.” | Names diagram elements instead of explaining how the lessons shaped the plan. | Developing staff skills is the reason for the consortium and program team. Starting with manageable projects is the reason for reviewing results before expanding. |
| Notes | “the sandbox, built before the course, already does, and the course is why that matters” | “Does” reaches back to an already awkward phrase; “why that matters” provides no actual reason. | The sandbox already uses permissions and network restrictions to limit access. Those are examples of the system enforcing the agent’s limits. |
| Notes | “on ground the City's own staff had already laid” | People lay foundations, not ground; the mixed metaphor hides their work. | on work City staff had already done |

### Slide 34: Let's talk (script 29)

| Location | Current wording | Why it is awkward | Suggested rewrite |
|---|---|---|---|
| On screen | “what you would most want a City AI strategy to do first” | A strategy is treated as the actor, and the layered conditional is cumbersome. | What should the City prioritize in its AI strategy? |
| On screen | “what you would need from us to make these five decisions” | Clear meaning, but the surrounding “We would also like to hear” makes the question unnecessarily indirect. | What information do you need from us to make these five decisions? |
| Notes | “a program with a national reputation already attached comes with it” | Abstract nouns are stacked into a promise without stating whose work earned recognition. | The program would build on City work that has already received national recognition. |
| Notes | “while it shores up practice, training and security, with the community's voice in the room” | Several metaphors cover several concrete activities. | while improving how teams work, training staff, strengthening security, and involving residents in decisions. |

## A complete rewrite of the lesson-two example

**Title:** Lesson two. Design the system to enforce the agent’s limits.

**On screen:**

- Give the agent access only to the data and actions it needs. Require approval before it can do anything beyond those permissions.
- Match the controls to the task. The more serious the consequences of an error, the more carefully access and approvals need to be designed.

**Speaker notes:**

Writing a rule in an agent’s instructions is different from enforcing it in the system. If the agent should not delete records, do not give it permission to delete them. If an action needs someone’s approval, make the system wait for that approval before it proceeds. The permissions and approval process need to enforce the limits we set. We also need to match those controls to the work: drafting an internal summary and changing an official record have different consequences if something goes wrong.

The examples in this proposed paragraph explain the principle; they are not claims that these particular controls are deployed in the City’s sandbox.

## Applying the edits

Keep enough words to explain the idea. A longer sentence with a clear actor, action, and object is preferable to a short slogan the audience has to decode. In particular, replace descriptions of the drawings with explanations of the work: people meet, teams assess projects, controls restrict actions, leaders approve proposals, and staff use the results.

When edits are selected, apply them to the source script and matching slide modules together, including repeated lesson names and drawing labels. Some suggestions are deliberately longer and will need layout adjustments; they have not been shortened to fit the existing text boxes.

Coverage: all 34 main slides. The separately referenced CMU backup deck was not available in the source reviewed.
