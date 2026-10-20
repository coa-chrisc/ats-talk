import type { Picture } from "./types";

/** Part 3. What we would do first: slides 9 to 15, drawn in the worlds `method` and `plan`. */
export const WHAT_WE_WOULD_DO_FIRST: Picture[] = [
  {
    id: "not-proposing",
    number: "9",
    part: 3,
    world: "method",
    name: "What we are not proposing",
    show: "We are not proposing to deploy agents, buy an agent platform or create a new organization.",
    say: "Before the method, what it is not. We are not proposing to deploy agents, to buy an agent platform or to create a new organization. The course is explicit that governance grows with population: below about 10 agents you manage individually, with known use cases, named owners and direct oversight, and the registries and control planes come much later. The City is at that early stage, and that is fine. The first steps we would take cost conversations and time rather than licenses or infrastructure, and they are the steps the course puts first anyway. They also do something the course cares about as much as the technology: they make the people who will do this work feel that they were asked.",
    see: ["Three grey outlines sit in a row, each with a cross through it: \"An agent platform\", \"A new organization\", \"Deploy agents\". They fade back. In front of them a small green scene draws: a table with chairs around it, labeled \"Conversations\", and a calendar page beside it, labeled \"Time\". A small indigo tag at the foot reads \"Manage individually\", with the caption \"Below about 10 agents\". The slide ends on the three faded outlines behind the table and calendar."],
    story: [
      "At the City's scale, the course says to manage individually: known use cases and named owners.",
      "The first steps cost conversations and time, not licenses or infrastructure.",
    ],
    steps: [
      { id: "play", show: ["An agent platform", "A new organization", "Deploy agents", "Conversations", "Time", "Manage individually", "Below about 10 agents"] },
    ],
  },
  {
    id: "people",
    number: "10",
    part: 3,
    world: "method",
    name: "Find the people",
    show: "Step one is an open call for every AI practitioner in the City, and one table for them: an AI consortium.",
    say: "Step one is an open call. The course quotes Shopify giving every employee every tool on the belief that high-value use cases can emerge from anywhere in the company, and it contrasts that with a top-down memo elsewhere whose author later said he had not given enough context. So the call goes to every department, not to a chosen few, and it asks a plain question: who is building, piloting or teaching with AI today? The answers come to one table, which we are calling an AI consortium until leadership picks a better name. The departments that led keep leading inside it. That is how the City uses its own knowledge before it buys anyone else's.",
    see: ["The department grid from slide 4 returns with its lanterns lit. A card labeled \"Open call\" slides across the grid, and more lanterns light in boxes that were dark, each a small green person. The lit people step out of their boxes and gather around a round table in the middle, labeled \"AI consortium\". Three of the chairs are drawn a little larger, with the caption \"The departments that led\". The slide ends on the table, the people around it, and the grid behind them with its boxes now mostly dark."],
    story: [
      "The course says high-value use cases can emerge from anywhere, so the call goes to every department.",
      "The consortium brings the pockets together, and the departments that led keep leading.",
    ],
    steps: [
      { id: "play", show: ["Open call", "AI consortium", "The departments that led"] },
    ],
  },
  {
    id: "listen",
    number: "11",
    part: 3,
    world: "method",
    name: "Listen",
    show: "Step two is to listen: to department leaders, to staff and to the community, and to write it down in their words.",
    say: "Step two is listening, and the course gives it unusual weight. Its first no-regrets workforce action is an honest channel for staff to raise concerns about AI without being labeled resistant, because leaders who create that channel learn early and leaders who don't learn too late. So we would sit with department leaders and ask what is slow or broken, where they could do more, and their goals for 2027 and 2028. We would ask staff what worries them. We would ask the community how it wants the City to use AI, and what it does not want. Everything goes down in their own words, because that language becomes the problem statement and the measure of success later.",
    see: ["Three round tables draw side by side, each with figures seated: \"Department leaders\", \"Staff\" and \"Community\". Over the first, three speech bubbles rise in turn: \"What is slow or broken\", \"Where they could do more\" and \"Their goals for 2027 and 2028\". Over the second, one bubble: \"What worries them\". Over the third, one bubble: \"How it wants the City to use AI\". A notebook page beside the tables fills line by line under the heading \"In their own words\". The slide ends on the three tables, their bubbles and the filled page."],
    story: [
      "Ask what is slow or broken, where they could do more, and what their goals for 2027 and 2028 are.",
      "The course calls an honest channel for staff concerns the first no-regrets action, so this is it.",
    ],
    steps: [
      { id: "play", show: ["Department leaders", "Staff", "Community", "What is slow or broken", "Where they could do more", "Their goals for 2027 and 2028", "What worries them", "How it wants the City to use AI", "In their own words"] },
    ],
  },
  {
    id: "sort",
    number: "12",
    part: 3,
    world: "method",
    name: "Sort",
    show: "Sort the ideas by value and by readiness, and start where both are high.",
    say: "Step three is sorting, and the course hands us the tool. It names six tests for a golden use case: decision density, meaning frequent decisions where speed and consistency pay; measurable impact; friction in the current process; data readiness; bounded authority, meaning the rules for the AI can be written and enforced; and contained risk, meaning errors are recoverable. Then it puts every idea on a chart of value against readiness. Top right you scale. Top left you prepare the foundations first. Bottom right you experiment with a clear learning goal. Bottom left you defer, so it does not consume scarce capacity. For the City, most first picks will be assist-only work where a mistake is small and reversible, and that is the point.",
    see: ["Idea cards fly in from the left as dots and land on a square chart with two axes, \"Value\" up the side and \"Readiness\" along the bottom. The four quadrants label themselves in turn: top right \"Scale\", top left \"Prepare\", bottom right \"Experiment\", bottom left \"Defer\". The top right fills with a green wash. Beside the chart a short checklist draws with six lines, each getting a deep-green tick: \"Decision density\", \"Impact\", \"Friction\", \"Data readiness\", \"Bounded authority\", \"Contained risk\". The slide ends on the chart with its lit corner and the ticked list."],
    story: [
      "Six tests: decision density, impact, friction, data readiness, bounded authority, contained risk.",
      "Most first picks are assist-only work where a mistake is small and reversible.",
    ],
    steps: [
      { id: "play", show: ["Value", "Readiness", "Scale", "Prepare", "Experiment", "Defer", "Decision density", "Impact", "Friction", "Data readiness", "Bounded authority", "Contained risk"] },
    ],
  },
  {
    id: "lanes",
    number: "13",
    part: 3,
    world: "plan",
    name: "Two lanes",
    show: "Run two lanes at once: deliver quick wins now, and build the foundations that make the next ones faster.",
    say: "The plan has two lanes, and the course says to run both at once; it calls them a fast lane and slow lane, rapid experimentation beside structural change. Lane one is what the City can deliver now: small, reversible tools that come out of the listening and the sorting, many of them plain tools built with AI help. Lane two is the longer work that makes lane one faster every quarter: training, a shared software lifecycle, one toolset and the infrastructure the City already built, extended rather than replaced. Each piece of lane two is an arrow into lane one. The course's warning about pilot purgatory applies here: every lane one project names a sponsor accountable for adoption and a transition plan before it starts, not after.",
    see: ["Two lanes draw, one above the other. The lower lane is labeled \"Deliver quick wins now\", and small green boxes ship along it one after another. The upper lane is labeled \"Build the foundations\", and four pieces fill in turn: \"Training\", \"Software lifecycle\", \"One toolset\", \"The infrastructure the City already built\". An arrow runs down from each piece into the lower lane, and the boxes there move faster after each arrow lands. A small indigo tag at the right reads \"Fast lane and slow lane\", with the caption \"Both at once\". The slide ends on both lanes full and the tag."],
    story: [
      "Lane one ships small, reversible tools that come out of listening and sorting.",
      "Lane two builds training, a shared software lifecycle, one toolset and the infrastructure.",
    ],
    steps: [
      { id: "play", show: ["Deliver quick wins now", "Build the foundations", "Training", "Software lifecycle", "One toolset", "The infrastructure the City already built", "Fast lane and slow lane", "Both at once"] },
    ],
  },
  {
    id: "level-up",
    number: "14",
    part: 3,
    world: "plan",
    name: "Level up the people we have",
    show: "Level up the staff the City already has, in three tiers, starting with the developers.",
    say: "Now the people, because the course puts them ahead of the technology. It describes three tiers of fluency. Everyone AI-aware: what it can and cannot do, and the user's governance duty. Functional leads and process owners AI-proficient: able to evaluate a vendor claim, design a workflow and define a success measure. And a small expert team, AI-expert, that builds and governs. The course asks where our gaps are, and ours are at every tier. The developers come first. The course frames their change as moving from AI user to AI engineer, and it cites a study where developers given tools and no method were 19 percent slower while believing they were faster. Training and a lifecycle are what make the tools pay.",
    see: ["Three tiers draw as a pyramid. The wide base is labeled \"AI-aware\", with the caption \"Everyone\"; the middle \"AI-proficient\", with \"Functional leads and process owners\"; the top \"AI-expert\", with \"A small expert team\". Each tier lights green in turn. Beside the pyramid a row of developer desks draws, labeled \"Developers\". A grey tag over the row reads \"AI user\", and as a slab labeled \"Training and a lifecycle\" slides under the desks, the tag turns green and reads \"AI engineer\". A small indigo figure sits at the foot: \"19 percent slower\", with the caption \"Tools and no method\". The slide ends on the lit pyramid, the lifted row and the figure."],
    story: [
      "Everyone AI-aware, leads AI-proficient, a small expert team; the course asks where our gaps are.",
      "Developers move from AI user to AI engineer, with training and a lifecycle, not just licenses.",
    ],
    steps: [
      { id: "play", show: ["AI-aware", "Everyone", "AI-proficient", "Functional leads and process owners", "AI-expert", "A small expert team", "Developers", "AI user", "Training and a lifecycle", "AI engineer", "19 percent slower", "Tools and no method"] },
    ],
  },
  {
    id: "outcomes",
    number: "15",
    part: 3,
    world: "plan",
    name: "Measure outcomes, not pilots",
    show: "Measure outcomes, not pilots, and tie every project to a Citywide Strategic Plan priority.",
    say: "The last step of the method is how we would know it worked. The course's table of mindset shifts has one line we would put on the wall: from counting pilots and deployments to measuring business outcomes. So every project ties to one of the six priorities in the 2026 Citywide Strategic Plan, and the closest to this work is High-Performing Government, with its goal of secure, modern, accessible technology. Then goals first, a baseline before any target, and a named data owner for every measure. The course adds that value, adoption, performance and economics should improve together before anything advances. Training attendance and tool counts describe effort. They are not the result.",
    see: ["Six tiles draw across the top, labeled once \"Citywide Strategic Plan\". The first tile lights and its name appears: \"High-Performing Government\". Small project dots rise and attach to the tiles, most to the first. Below, a grey tally labeled \"Counting pilots\" draws and fades, and in its place a line draws from a point labeled \"Baseline\" to a point labeled \"Target\", with a small nameplate under it reading \"Data owner\". The slide ends on the six tiles, the attached dots and the measure line."],
    story: [
      "The course's mindset shift: from counting pilots and deployments to measuring results.",
      "Goals first, then a baseline, then a target; a data owner for every measure.",
    ],
    steps: [
      { id: "play", show: ["Citywide Strategic Plan", "High-Performing Government", "Counting pilots", "Baseline", "Target", "Data owner"] },
    ],
  },
];
