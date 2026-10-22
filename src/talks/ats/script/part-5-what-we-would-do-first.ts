import type { Picture } from "./types";

/** Part 5. What we would do first: slides 16 to 23, drawn in the world `first`. */
export const WHAT_WE_WOULD_DO_FIRST: Picture[] = [
  {
    id: "not-proposing",
    number: "16",
    part: 5,
    world: "first",
    name: "Start with staff time and coordination",
    show: "The first steps require staff time and coordination.",
    say: "We are not proposing a citywide agent rollout, a new agent platform, or a separate organization. The course recommends managing agents individually when there are fewer than about 10: give each one a known purpose, someone responsible for it, and direct oversight. More elaborate management tools can come later as the number grows. The proposal starts with that individual oversight. Our first steps require staff time to meet, compare work, and agree on priorities. They do not start with buying licenses or infrastructure. They start by asking the people who will do the work what they need.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Three dashed grey outlines span the top of the drawing, each crossed out and settling at half strength: \"An agent platform\", \"A new organization\", \"Roll out agents citywide\". Below them, with clear space between, a green round table with chairs and a green calendar page draw side by side, labeled \"Conversations\" and \"Time to meet\", and an indigo tag lands at the right: \"Manage each agent individually\", with the caption \"Fewer than about 10 agents\". The slide ends on the faded outlines above the table, the calendar and the tag."],
    story: [
      "We are not proposing a citywide agent rollout, a new platform, or a separate organization.",
      "For fewer than about 10 agents, the course recommends managing each one individually.",
    ],
    steps: [
      { id: "play", show: ["An agent platform", "A new organization", "Roll out agents citywide", "Conversations", "Time to meet", "Manage each agent individually", "Fewer than about 10 agents"] },
    ],
  },
  {
    id: "consortium",
    number: "17",
    part: 5,
    world: "first",
    name: "Make the consortium official",
    show: "Step one. Bring the people working with AI together.",
    say: "Invite staff in every department who are building, piloting, or teaching with AI. Bring the people who respond together as a standing practitioner group: the City's AI consortium. The course emphasizes that useful ideas can come from anywhere in an organization. It contrasts Shopify's broad access to tools with a top-down directive elsewhere that lacked enough context. For the City, the immediate step is to identify and connect the people already doing the work. The program would organize a community that already exists. Staff from departments that have led this work should help lead the group. Leadership should recognize their contribution and ask them what would help them do more.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. The department grid from slide 12 returns with its windows lit. A card labeled \"Open call\" slides across the grid, and more windows light in boxes that were dark, a small green person beside each. The lit people step out of their boxes and gather around a round table in the middle, labeled \"AI consortium\". Three of the chairs are drawn larger, with the caption \"Staff with experience leading this work\". The slide ends on the table, the people around it, and the grid behind them with its windows still lit."],
    story: [
      "Invite staff in every department who are building, piloting, or teaching with AI.",
      "Form a standing practitioner group: the City's AI consortium. It could start now.",
    ],
    steps: [
      { id: "play", show: ["Open call", "AI consortium", "Staff with experience leading this work"] },
    ],
  },
  {
    id: "program-team",
    number: "18",
    part: 5,
    world: "first",
    name: "An AI program team from staff we have",
    show: "Step two. Form a program team from staff already doing the work.",
    say: "Choose a small team from the consortium and designate a lead. These staff would develop the AI strategy, guide system design, and advise departments. They would teach and support department staff, rather than becoming a central team expected to build every application. The existing Azure team would continue maintaining the infrastructure. The program team would coordinate with it. Staff already doing this work could form the initial consortium and program team without waiting for a program manager to be hired. This applies the third lesson: develop the people who know the work and give them responsibility for putting AI to use.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. The round table from slide 17 sits at the left with people around it. Four of them light brighter and step out to a box drawn in the middle, labeled \"AI program team\"; one of the four takes a small nameplate, \"Lead\". Three tiles land under the box: \"Strategy\", \"Architecture\", \"Consulting\". A line draws from the box to a department outline at the right, labeled \"Departments\", with the caption \"Advises and teaches\". Below the team box the fenced yard from slide 13 is drawn small, with two green people inside it and the caption \"The Azure team maintains the infrastructure\". The slide ends on the table, the team box with its tiles and lead, the line to the department, and the small yard."],
    story: [
      "Choose a small team from the consortium to guide strategy, system design, and advice to departments.",
      "The existing Azure team continues to maintain the infrastructure.",
    ],
    steps: [
      { id: "play", show: ["AI program team", "Lead", "Strategy", "Architecture", "Consulting", "Departments", "Advises and teaches", "The Azure team maintains the infrastructure"] },
    ],
  },
  {
    id: "listen",
    number: "19",
    part: 5,
    world: "first",
    name: "Listen",
    show: "Step three. Ask leaders, staff, and residents what they need.",
    say: "The course recommends giving staff a way to raise concerns about AI without being labeled resistant. That helps leaders identify problems before choosing tools. The program team should ask department leaders where work slows down, what they would like to accomplish but cannot do today, and what they want to achieve by 2027 and 2028. Ask staff what worries them. Ask residents how they want the City to use AI and what uses they would oppose. Record their descriptions in their own words. Use those descriptions to define the problem and agree on what a successful result would look like. That gives ATS and departments shared priorities for the work.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Three round tables draw side by side, each with six chairs: \"Department leaders\", \"Staff\" and \"Community\". Speech bubbles rise over them in turn: three stacked over the first, \"Where does work slow down?\", \"What can you not do today?\" and \"What do you want done by 2028?\"; one over the second, \"What worries you?\"; one over the third, \"How should the City use AI?\". A notebook page at the right fills with green rules under the heading \"What people said\". The slide ends on the three tables, their bubbles and the filled page."],
    story: [
      "Ask where work slows down, what they cannot do today, and what they want to achieve by 2027 and 2028.",
      "Give staff a way to raise concerns about AI without being labeled resistant.",
    ],
    steps: [
      { id: "play", show: ["Department leaders", "Staff", "Community", "Where does work slow down?", "What can you not do today?", "What do you want done by 2028?", "What worries you?", "How should the City use AI?", "What people said"] },
    ],
  },
  {
    id: "sort",
    number: "20",
    part: 5,
    world: "first",
    name: "Sort",
    show: "Step four. Assess each idea by its value and readiness.",
    say: "Assess each idea by its value and readiness. Start with ideas that offer high value and are ready to implement. For valuable ideas that are not ready, prepare the data, skills, or other prerequisites first. For lower-value ideas that are easy to try, run an experiment only if there is a clear learning goal. Defer ideas that are low on both measures. Use the six criteria from lesson four to guide the assessment: frequent decisions, measurable impact, delays in the current process, suitable data, clear rules, and limited consequences if something goes wrong. Many first projects will use AI to assist staff, with mistakes that are easy to correct. Some projects can begin now; others need preparation. We can deliver the first group while preparing for the second.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. The criteria are presented first as a stationary list with neutral boxes. A square chart draws with two axes, \"Value\" up the side and \"Readiness\" along the bottom. The four quadrants are labeled before the illustrative idea dots are placed: top right \"Start here\", top left \"Prepare\", bottom right \"Experiment\", bottom left \"Defer\". The top right fills with a green wash. Beside the chart the six criteria from slide 10 remain visible: \"Frequent decisions\", \"Measurable impact\", \"Delays in the current process\", \"Suitable data available\", \"Rules that can be written down\", \"Limited consequences of error\". The slide ends on the chart with its lit corner and the criteria list. The boxes are unfilled because no particular project has been assessed here."],
    story: [
      "Use the six criteria to assess each idea, then plot it on the chart.",
      "Start with useful projects that are ready to implement and where mistakes are easy to correct.",
    ],
    steps: [
      { id: "play", show: ["Value", "Readiness", "Start here", "Prepare", "Experiment", "Defer", "Frequent decisions", "Measurable impact", "Delays in the current process", "Suitable data available", "Rules that can be written down", "Limited consequences of error"] },
    ],
  },
  {
    id: "lanes",
    number: "21",
    part: 5,
    world: "first",
    name: "Two lanes",
    show: "Deliver useful projects while preparing for the next ones.",
    say: "Deliver small, useful projects now while building the skills and infrastructure needed for future projects. The first group comes from the needs departments described and the ideas we assessed. Choose tasks where mistakes have little impact and are easy to fix. Many will be ordinary software tools built with AI's help. Alongside delivery, train staff, establish a shared development process, provide approved tools, and extend the existing infrastructure. Those investments help teams deliver later projects more efficiently. Before each project starts, assign a sponsor responsible for helping staff put it into use. That gives the project an owner beyond the pilot.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Two lanes draw, one above the other. The lower lane is labeled \"Useful projects now\", and small green boxes ship along it one after another. The upper lane is labeled \"The foundations\", and four pieces fill in turn: \"Training\", \"Shared development process\", \"Approved tools\", \"Existing infrastructure\". An arrow runs down from each piece into the lower lane, while the lower lane pauses. Once the foundations are explained, a second batch of projects arrives at the same pace as the first; the motion does not claim a measured speed increase. The slide ends on both lanes full."],
    story: [
      "One group of projects delivers small, useful tools based on what departments need.",
      "Alongside that work, develop staff skills, a shared development process, approved tools, and infrastructure.",
    ],
    steps: [
      { id: "play", show: ["Useful projects now", "The foundations", "Training", "Shared development process", "Approved tools", "Existing infrastructure"] },
    ],
  },
  {
    id: "level-up",
    number: "22",
    part: 5,
    world: "first",
    name: "Build staff skills",
    show: "Build staff skills for the work they need to do.",
    say: "Training should prepare staff for their responsibilities. Everyone needs safe everyday use, an understanding of limitations, and familiarity with approved tools. Leads and process owners need to assess needs, vendor claims, workflows, and results. The program team needs specialist system-design and support capabilities. These are different responsibilities, not a ranking of people. Start developer training with a bounded task. Have developers build with AI, review the result, and measure both time and quality. Use what the team learns to improve the method before expanding. Access to a tool is not itself a training program, and training is not proof of better performance; that is why measurement belongs in the process.",
    see: ["Three equally weighted role illustrations establish the capabilities each group needs. Beside them, a document sits inside a practice cycle: choose a bounded task, build and review, measure time and quality, then improve. The cycle draws once and stops; it does not imply measured gains. Labels: \"Everyone\", \"Use approved tools and recognize limitations\", \"Leads and process owners\", \"Assess needs, vendors, workflows, and results\", \"Program team\", \"Design systems, advise departments, and support controls\", \"Developers: practice on real work\", \"Choose a bounded task\", \"Build with AI and review the result\", \"Measure time and quality\", \"Improve the method before expanding\"."],
    story: [
      "Teach each group the capabilities it needs, from safe everyday use to system design and support.",
      "Start developer training with a bounded task, review the result, and measure the effect.",
    ],
    steps: [
      { id: "play", show: ["Everyone", "Use approved tools and recognize limitations", "Leads and process owners", "Assess needs, vendors, workflows, and results", "Program team", "Design systems, advise departments, and support controls", "Developers: practice on real work", "Choose a bounded task", "Build with AI and review the result", "Measure time and quality", "Improve the method before expanding"] },
    ],
  },
  {
    id: "budget",
    number: "22a",
    part: 5,
    world: "first",
    name: "Pay for AI by the work and the data",
    show: "How we pay for AI depends on the work and the data it touches.",
    say: "Paying for AI is not one decision. For coding work that does not involve City documents or resident data, a few developer subscriptions, such as Claude Code or Codex, can cost far less than paying per token. Each subscription includes usage that would cost much more at metered rates. When we build AI into a City tool, handle City or resident data, or run agents of our own, that work belongs in metered capacity in the City's cloud, in Azure or AWS, where it stays inside our sign-in, access controls, and logging. Metered use also makes sense for agent processes that run on their own. The right balance depends on the work, the data, and the volume. That is a conversation the City still needs to have: a token consumption strategy and a token security strategy. This slide does not settle it. It shows where the line falls and why the conversation matters.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. On the left, three green developer figures draw, and a navy seat badge lands on each: \"Developer subscriptions\", with \"Coding work with no City or resident data\", and under the badges \"Usage included, at a fixed price per person\". The fenced yard from slide 13 then draws on the right: \"Metered capacity in Azure or AWS\", with \"AI in City tools, City data, and agents we run\". Inside it a hexagon agent lands and works; each small piece of work it sends ticks a meter up one step: \"Paid for each token used\". Between the two sides a dashed boundary draws down the middle, labeled \"City or resident data\". Below, the empty round table from slide 12 draws again, in grey dashes: \"Token consumption and security strategy\", with \"A conversation the City still needs to have\". The slide shows no prices and no token counts. It ends on both sides, the boundary between them, and the empty table."],
    story: [
      "For coding work that involves no City or resident data, developer subscriptions can cost far less than metered use.",
      "AI built into City tools and agents we run need metered capacity in our cloud, so we need a token strategy.",
    ],
    steps: [
      { id: "play", show: ["Developer subscriptions", "Coding work with no City or resident data", "Usage included, at a fixed price per person", "Metered capacity in Azure or AWS", "AI in City tools, City data, and agents we run", "Paid for each token used", "City or resident data", "Token consumption and security strategy", "A conversation the City still needs to have"] },
    ],
  },
  {
    id: "outcomes",
    number: "23",
    part: 5,
    world: "first",
    name: "Measure outcomes",
    show: "Measure how each project improves City services.",
    say: "Consider an illustrative project that helps staff draft responses to service requests. It could support High-Performing Government by improving how staff deliver the service. Choose a measure such as the time from a request to a staff-approved response. Measure current performance before starting the pilot, then agree a target and assign a service owner to track the result. Faster responses are not enough: review accuracy, accessibility, and the corrections staff must make. Before expanding, compare service results, cost, and whether staff actually use the tool. This worksheet is an example of how to plan measurement; it reports no baseline, target, or improvement that has already been established.",
    see: ["A dashed tag lands at the top left, saying the project is an example: \"Illustrative project: help staff draft service responses\", with \"Strategic link: High-Performing Government\". Below it a line draws from a navy resident to a green staff figure. The resident sends a request card along the line; it travels to the staff figure, stops and waits there, and an orange mark lands beside the staff figure. The card goes no further. A bracket then draws under the trip, from the request to the approval: \"Service measure\", with \"Time from request to a staff-approved response\". The bracket is the only scale, and it carries no numbers. A pin lands at the bracket's end: \"Baseline\", with \"Measure current performance before the pilot\". A dashed tag appears under it, off the bracket, so it claims no value: \"Target\", with \"Agree after measuring the baseline\". Then the drawings take the rest in turn: beside the staff figure and its mark, \"Responsible role\", with \"Assign a service owner to track results\"; a magnifier passes once over the waiting card, \"Quality check\", with \"Review accuracy, accessibility, and corrections\"; and a closed gate lands on the line beyond the staff figure, \"Expansion decision\", with \"Compare results, cost, and staff use\". Nothing passes the gate. Both supporting sentences appear last, and the slide ends on the measured trip, the pin, the dashed target, the owner, the magnifier and the closed gate."],
    story: [
      "Choose a service measure, establish a baseline, agree a target, and assign responsibility.",
      "Measure quality alongside speed, then decide whether the project should expand.",
    ],
    steps: [
      { id: "play", show: ["Illustrative project: help staff draft service responses", "Strategic link: High-Performing Government", "Service measure", "Time from request to a staff-approved response", "Baseline", "Measure current performance before the pilot", "Target", "Agree after measuring the baseline", "Responsible role", "Assign a service owner to track results", "Quality check", "Review accuracy, accessibility, and corrections", "Expansion decision", "Compare results, cost, and staff use"] },
    ],
  },
];
