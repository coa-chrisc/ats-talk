import type { Picture } from "./types";

/** Part 5. What we would do first: slides 16 to 23, drawn in the world `first`. */
export const WHAT_WE_WOULD_DO_FIRST: Picture[] = [
  {
    id: "not-proposing",
    number: "16",
    part: 5,
    world: "first",
    name: "What we are not proposing",
    show: "We are not proposing to deploy agents, buy an agent platform or create a new organization.",
    say: "Before the plan, what it is not. We are not proposing to deploy agents, to buy an agent platform or to create a new organization. The course is explicit that governance grows with the number of agents. Below about 10 you manage them individually, with known use cases, named owners and direct oversight, and registries and control planes come much later. The City is at that early stage, and the plan respects it. The first steps cost conversations and time rather than licenses or infrastructure, and they are the steps the course puts first anyway. They also do something the course cares about as much as the technology. They start by asking the people who will do the work.",
    see: ["Three dashed grey outlines span the top of the drawing, each crossed out and settling at half strength: \"An agent platform\", \"A new organization\", \"Deploy agents\". Below them, with clear space between, a green round table with chairs and a green calendar page draw side by side, labeled \"Conversations\" and \"Time\", and an indigo tag lands at the right: \"Manage individually\", with the caption \"Below about 10 agents\". The slide ends on the faded outlines above the table, the calendar and the tag."],
    story: [
      "Below about 10 agents, the rule is manage individually: known use cases and named owners.",
      "The first steps cost conversations and time, not licenses or infrastructure.",
    ],
    steps: [
      { id: "play", show: ["An agent platform", "A new organization", "Deploy agents", "Conversations", "Time", "Manage individually", "Below about 10 agents"] },
    ],
  },
  {
    id: "consortium",
    number: "17",
    part: 5,
    world: "first",
    name: "Make the consortium official",
    show: "Step one is an open call to every department, with one table for the practitioners who answer.",
    say: "Step one is an open call. The course quotes Shopify giving every employee every tool on the belief that high-value use cases can emerge from anywhere in the company, and contrasts it with a top-down memo elsewhere whose author later said he had not given enough context. So the call goes to every department and asks one question: who is building, piloting or teaching with AI today? The answers come to one table. The practitioner group exists informally; sanctioning it makes it the City's AI consortium, and the departments that led keep leading inside it. The people who have carried this work for years should be the first ones leadership thanks and the first ones it asks.",
    see: ["The department grid from slide 12 returns with its lanterns lit. A card labeled \"Open call\" slides across the grid, and more lanterns light in boxes that were dark, a small green person beside each. The lit people step out of their boxes and gather around a round table in the middle, labeled \"AI consortium\". Three of the chairs are drawn larger, with the caption \"The departments that led\". The slide ends on the table, the people around it, and the grid behind them with its boxes now mostly dark."],
    story: [
      "The practitioner group exists informally today. An open call makes it the City's AI consortium.",
      "The departments that led keep leading inside it, and everyone else is invited in.",
    ],
    steps: [
      { id: "play", show: ["Open call", "AI consortium", "The departments that led"] },
    ],
  },
  {
    id: "program-team",
    number: "18",
    part: 5,
    world: "first",
    name: "An AI program team from staff we have",
    show: "Step two is a small AI program team drawn from the consortium, led by staff already doing the work.",
    say: "Step two gives the consortium a working core. A small AI program team, drawn from it, with one of them as lead and all of them already doing this work, takes on strategy, architecture and consulting with departments. It advises, shows what works and teaches department staff to do it; it does not build for them, because a central team that builds everything becomes the bottleneck. The people who know Azure and Azure AI stay on the infrastructure they built, and the team is organized around them rather than over them. That is the course's third idea in practice. The organizations that got value trained their own people and put them in charge of the work.",
    see: ["The round table from slide 17 sits at the left with people around it. Four of them light brighter and step out to a box drawn in the middle, labeled \"AI program team\"; one of the four takes a small nameplate, \"Lead\". Three tiles land under the box: \"Strategy\", \"Architecture\", \"Consulting\". A line draws from the box to a department outline at the right, labeled \"Departments\", with the caption \"Advises and teaches\". Below the team box the fenced yard from slide 13 is drawn small, with two green people inside it and the caption \"The Azure staff stay on the infrastructure\". The slide ends on the table, the team box with its tiles and lead, the line to the department, and the small yard."],
    story: [
      "Its work is strategy, architecture and consulting. It advises and teaches rather than builds.",
      "The Azure staff stay on the infrastructure they built, and the team is organized around them.",
    ],
    steps: [
      { id: "play", show: ["AI program team", "Lead", "Strategy", "Architecture", "Consulting", "Departments", "Advises and teaches", "The Azure staff stay on the infrastructure"] },
    ],
  },
  {
    id: "listen",
    number: "19",
    part: 5,
    world: "first",
    name: "Listen",
    show: "Step three is to listen to leaders, staff and the community, in their own words.",
    say: "Step three is listening, and the course weights it heavily. Its first no-regrets workforce action is an honest channel for staff to raise concerns about AI without being labeled resistant, because leaders who open that channel learn early. So the program team sits with department leaders and asks what is slow or broken, where they could do more, and what their goals for 2027 and 2028 are. It asks staff what worries them. It asks the community how it wants the City to use AI, and what it does not want. Everything goes down in their own words, because that language becomes the problem statement and the measure of success, and it is how departments come to see ATS as their partner.",
    see: ["Three round tables draw side by side, each with six chairs: \"Department leaders\", \"Staff\" and \"Community\". Speech bubbles rise over them in turn: three stacked over the first, \"What is slow or broken\", \"Where they could do more\" and \"Their goals for 2027 and 2028\"; one over the second, \"What worries them\"; one over the third, \"How it wants the City to use AI\". A notebook page at the right fills with green rules under the heading \"In their own words\". The slide ends on the three tables, their bubbles and the filled page."],
    story: [
      "Ask what is slow or broken, where they could do more, and what their goals for 2027 and 2028 are.",
      "An honest channel for staff concerns comes first, before any tool is chosen.",
    ],
    steps: [
      { id: "play", show: ["Department leaders", "Staff", "Community", "What is slow or broken", "Where they could do more", "Their goals for 2027 and 2028", "What worries them", "How it wants the City to use AI", "In their own words"] },
    ],
  },
  {
    id: "sort",
    number: "20",
    part: 5,
    world: "first",
    name: "Sort",
    show: "Step four is to sort what we heard by value and readiness. Start where both are high.",
    say: "Step four turns what we heard into a short list. Every idea goes on a chart of value against readiness. Top right we scale. Top left we prepare the foundations first. Bottom right we experiment with a clear learning goal. Bottom left we defer, so it does not consume scarce capacity. The six tests from idea four do the scoring: frequent decisions, measurable impact, friction in the current process, ready data, rules that can be written down, and contained risk. For the City, most first picks will be assist-only work where a mistake is small and reversible, which is exactly where idea one and idea two say to begin. That gives us two lanes.",
    see: ["Idea cards fly in from the left as dots and land on a square chart with two axes, \"Value\" up the side and \"Readiness\" along the bottom. The four quadrants name themselves: top right \"Scale\", top left \"Prepare\", bottom right \"Experiment\", bottom left \"Defer\". The top right fills with a green wash. Beside the chart the six-line checklist from slide 10 returns with its ticks: \"Frequent decisions\", \"Measurable impact\", \"Friction\", \"Ready data\", \"Rules that can be written\", \"Contained risk\". The slide ends on the chart with its lit corner and the ticked list."],
    story: [
      "The six tests from idea four pick the first projects.",
      "Most first picks are assist-only work where a mistake is small and reversible.",
    ],
    steps: [
      { id: "play", show: ["Value", "Readiness", "Scale", "Prepare", "Experiment", "Defer", "Frequent decisions", "Measurable impact", "Friction", "Ready data", "Rules that can be written", "Contained risk"] },
    ],
  },
  {
    id: "lanes",
    number: "21",
    part: 5,
    world: "first",
    name: "Two lanes",
    show: "Run two lanes at once: quick wins now, with the foundations that make the next ones faster.",
    say: "The plan has two lanes, and the course says to run both at once: rapid experimentation beside structural change. Lane one is what the City can deliver now: small, reversible tools out of the listening and the sorting, many of them plain tools built with AI help, each tied to a department goal we wrote down in its own words. Lane two is the longer work that makes lane one faster every quarter: training, a shared software development lifecycle, one toolset, and the infrastructure the City already built, extended rather than replaced. Each piece of lane two is an arrow into lane one. Every lane one project names a sponsor accountable for adoption before it starts, which is the course's cure for pilot purgatory.",
    see: ["Two lanes draw, one above the other. The lower lane is labeled \"Deliver quick wins now\", and small green boxes ship along it one after another. The upper lane is labeled \"Build the foundations\", and four pieces fill in turn: \"Training\", \"Software lifecycle\", \"One toolset\", \"The infrastructure the City already built\". An arrow runs down from each piece into the lower lane, and the boxes there move faster after each arrow lands. The slide ends on both lanes full."],
    story: [
      "Lane one is where we deliver quick wins now: small, reversible tools out of listening and sorting.",
      "In lane two we build the foundations: training, a software lifecycle, one toolset, infrastructure.",
    ],
    steps: [
      { id: "play", show: ["Deliver quick wins now", "Build the foundations", "Training", "Software lifecycle", "One toolset", "The infrastructure the City already built"] },
    ],
  },
  {
    id: "level-up",
    number: "22",
    part: 5,
    world: "first",
    name: "Level up the staff the City has",
    show: "Level up the staff the City already has, in three tiers, starting with the developers.",
    say: "Lane two begins with people, which is idea three again. The course describes three tiers of fluency. Everyone AI-aware: what it can and cannot do, and the user's duty under the authorized tools rule. Functional leads and process owners AI-proficient: able to evaluate a vendor claim, design a workflow and define a success measure. And a small AI-expert team that builds and governs, which is the program team. Our gaps are at every tier, and the developers come first. The course frames their change as moving from AI user to AI engineer, and it cites a study where developers given tools and no method were 19 percent slower while believing they were faster. Training and a lifecycle make the tools pay.",
    see: ["Three tiers draw as a pyramid. The wide base is labeled \"AI-aware\", with the caption \"Everyone\"; the middle \"AI-proficient\", with \"Functional leads and process owners\"; the top \"AI-expert\", with \"A small expert team\". Each tier lights green in turn. Beside the pyramid a row of developer desks draws, labeled \"Developers\". A grey tag over the row reads \"AI user\", and as a slab labeled \"Training and a lifecycle\" slides under the desks, the tag turns green and reads \"AI engineer\". A small indigo figure sits at the foot: \"19 percent slower\", with the caption \"Tools and no method\". The slide ends on the lit pyramid, the lifted row and the figure."],
    story: [
      "Everyone AI-aware, leads AI-proficient, a small expert team. Our gaps are at every tier.",
      "Developers move from AI user to AI engineer, with training and a lifecycle, not just licenses.",
    ],
    steps: [
      { id: "play", show: ["AI-aware", "Everyone", "AI-proficient", "Functional leads and process owners", "AI-expert", "A small expert team", "Developers", "AI user", "Training and a lifecycle", "AI engineer", "19 percent slower", "Tools and no method"] },
    ],
  },
  {
    id: "outcomes",
    number: "23",
    part: 5,
    world: "first",
    name: "Measure outcomes",
    show: "Tie every project to a Citywide Strategic Plan priority and measure outcomes, not pilots.",
    say: "How we would know it worked. Every project ties to one of the six priorities in the 2026 Citywide Strategic Plan, and the closest to this work is High-Performing Government, with its goal of secure, modern, accessible technology. Then goals first, a baseline before any target, and a named data owner for every measure. The course's table of mindset shifts has one line we would put on the wall, from counting pilots and deployments to measuring business outcomes, and it adds that value, adoption, performance and economics should improve together before anything advances a gate. Training attendance and tool counts describe effort. That is the plan. Three things to have ready before the first agent arrives.",
    see: ["Six tiles draw across the top, labeled once \"Citywide Strategic Plan\". The first tile lights and its name appears: \"High-Performing Government\". Small project dots rise and attach to the tiles, most to the first. Below, a grey tally labeled \"Counting pilots\" draws and fades, and in its place a line draws from a point labeled \"Baseline\" to a point labeled \"Target\", with a small nameplate under it reading \"Data owner\". The slide ends on the six tiles, the attached dots and the measure line."],
    story: [
      "Goals first, then a baseline, then a target; a data owner for every measure.",
      "Training attendance and tool counts describe effort. They are not the result.",
    ],
    steps: [
      { id: "play", show: ["Citywide Strategic Plan", "High-Performing Government", "Counting pilots", "Baseline", "Target", "Data owner"] },
    ],
  },
];
