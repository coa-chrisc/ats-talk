import type { Picture } from "./types";

/** Part 2. Where enterprise is: slides 3 to 6, drawn in the world `enterprise`. */
export const WHERE_ENTERPRISE_IS: Picture[] = [
  {
    id: "spending",
    number: "3",
    part: 2,
    world: "enterprise",
    name: "Enterprise is spending big",
    show: "Enterprise spending on AI has tripled, and most of the money goes to one kind of work.",
    say: "Money first, because it sets the scale. BCG's October survey puts AI investment at 17 percent of IT budgets in 2026, up from five percent in 2025. Where that money is going matters more than how much there is. The course splits it three ways. Buy is off-the-shelf tools for commodity work, about a third of the spending. Build is custom systems for the rare case where nothing on the market will do, about a tenth. Boost is the middle and the largest share: your own data on rented models, in the hands of your own staff. That middle is where the City's advantage lies, because nobody sells the City's knowledge of its own services. Hold that thought until we get to the City's own budget line, which is zero.",
    see: ["Two indigo columns rise side by side on the left, labeled \"2025\" and \"2026\" under their feet, each column carrying the label \"AI investment\" and its figure, \"Five percent\" and \"17 percent\"; the second column is more than three times the first. One caption sits under both columns: \"Of IT budgets\". On the right, under the heading \"Where that money is going\", a wide bar splits into three parts labeled \"Buy\", \"Boost\" and \"Build\", sized about 35, 55 and 10, each with a caption: \"Off-the-shelf tools\", \"Your own data on rented models\", \"Custom systems\". The middle part fills green. The slide ends on the two columns and the three-part bar."],
    story: [
      "AI investment rose from five percent of IT budgets in 2025 to 17 percent in 2026.",
      "More than half of it pays to put a company's own data and people to work on rented models.",
    ],
    steps: [
      { id: "play", show: ["2025", "2026", "AI investment", "Five percent", "17 percent", "Of IT budgets", "Where that money is going", "Buy", "Boost", "Build", "Off-the-shelf tools", "Your own data on rented models", "Custom systems"] },
    ],
  },
  {
    id: "agents",
    number: "4",
    part: 2,
    world: "enterprise",
    name: "From chatbots to agents",
    show: "A chatbot answers a question. An agent is given a goal and does the work.",
    say: "The word agent gets used for everything, so here is the definition we will hold to. In 2023 a chatbot answered a question. A copilot drafts while a person decides, one step at a time. By 2026 an agent does the work. You give it a goal. It plans its own steps, picks its tools, acts inside other systems, checks the result and adjusts, and it keeps going until the goal is met or it stops at a boundary someone set. The loop is the whole point. It is why agents are useful, because nobody is doing each step by hand anymore, and it is why they need different controls, because nobody is watching each step either. Everything else in the course follows from that.",
    see: ["A timeline draws left to right from \"2023\" to \"2026\" with three figures on it: a speech bubble labeled \"Chatbot\" with the caption \"Answers a question\", a page with a person beside it labeled \"Copilot\" with \"Drafts while a person decides\", and a figure with a tool belt labeled \"Agent\" with \"Does the work\". Under the agent a loop draws as five small stops joined in a ring, each lighting in turn: \"Goal\", \"Plans\", \"Tools\", \"Acts\", \"Adjusts\". A short bar closes the loop, labeled \"Stops at a boundary\". The slide ends on the timeline and the lit loop."],
    story: [
      "It plans its own steps, uses tools, acts inside other systems, checks the result and adjusts.",
      "That is where the value comes from, and the risk: nobody is doing each step by hand anymore.",
    ],
    steps: [
      { id: "play", show: ["2023", "2026", "Chatbot", "Answers a question", "Copilot", "Drafts while a person decides", "Agent", "Does the work", "Goal", "Plans", "Tools", "Acts", "Adjusts", "Stops at a boundary"] },
    ],
  },
  {
    id: "review",
    number: "4a",
    part: 2,
    world: "enterprise",
    name: "Review moved off the person",
    show: "Human in the loop worked for chatbots. Agents produce more than anyone can feasibly review.",
    say: "One more thing changed, and it explains why the controls changed with it. When AI was a chatbot, a person read every answer before anything happened, and that was enough. Agents finish days of work in an hour. Anthropic, which makes one of the leading models, went from 2,500 merged code changes a day in May to more than 30,000 a day in September. A study of 22,000 developers found review time up fivefold. No staff can read that volume. So enterprise moved the review into the system. A model checks first, hard limits catch what it misses, and people handle the high-risk cases, which is exactly where Gartner expects human authority to stay: exceptions, appeals and anything that touches a resident. Gartner expects agents to make 15 percent of day-to-day work decisions by 2028.",
    see: ["On the left two bars rise, labeled \"May\" and \"September\", the second 12 times the first, with the captions \"2,500 code changes a day\" and \"More than 30,000 a day\". In the middle a single person sits at a desk with a stack of pages growing beside them until it towers over the desk, labeled \"More than anyone can feasibly review\". On the right a funnel draws: a wide mouth labeled \"A model checks first\", narrowing to a small outlet where a person stands with the orange mark of a person deciding, labeled \"People handle the high-risk cases\". Under the funnel an indigo figure lands: \"15 percent\", with the caption \"Of day-to-day work decisions by 2028\". The slide ends on the two bars, the towering stack and the funnel with its figure."],
    story: [
      "One AI company went from 2,500 code changes a day in May to more than 30,000 a day in September.",
      "So review moved into the system. A model checks first, and people handle the high-risk cases.",
    ],
    steps: [
      { id: "play", show: ["May", "September", "2,500 code changes a day", "More than 30,000 a day", "More than anyone can feasibly review", "A model checks first", "People handle the high-risk cases", "15 percent", "Of day-to-day work decisions by 2028"] },
    ],
  },
  {
    id: "fleet-defined",
    number: "5",
    part: 2,
    world: "enterprise",
    name: "What a fleet is",
    show: "A fleet is a team of agents, each with its own job, and a person who approves the result.",
    say: "One more definition, because it comes back later. A fleet is a team of agents working one job, each with its own role. Lead agents read the brief and the rules and divide the work into pieces. Builders take the pieces in parallel. Review agents check every change before it goes anywhere, and the course is firm that the reviewer is never the agent that did the work, for the same reason an auditor is not the bookkeeper. Permissions agents decide what each one may touch: which system, which data, which action. And at the end a person approves, and nothing reaches a user before that. The course's own demonstration was a fleet of five, and it spent as much time on the walls between the agents as on the agents themselves.",
    see: ["Three green lead agents sit at a desk on the left, labeled \"Lead agents\", with a board beside them splitting into rows. Below, a row of six smaller green agents fill cells of the board in parallel, labeled \"Builders\". To the right two agents with a different mark check the filled cells, labeled \"Review agents\", and a thin wall draws between them and the builders, labeled \"No agent ever grades its own work\". Above the builders a single agent holding a ring of keys stands at a gate, labeled \"Permissions agents\", with the caption \"What each one may touch\"; a thin line runs from it to each builder. At the far right a person stands and the orange approval mark lands, labeled \"A person approves\". The slide ends on the five groups with the mark at the end."],
    story: [
      "Lead agents plan the work and divide it. Builders do the pieces. Review agents check every change.",
      "Permissions agents decide what each one may touch. No agent ever grades its own work.",
    ],
    steps: [
      { id: "play", show: ["Lead agents", "Builders", "Review agents", "No agent ever grades its own work", "Permissions agents", "What each one may touch", "A person approves"] },
    ],
  },
  {
    id: "stumbled",
    number: "6",
    part: 2,
    world: "enterprise",
    name: "Most who rushed stumbled",
    show: "Plenty of organizations rushed in and stumbled. In every case, a limit was missing.",
    say: "All that spending bought a lot of stumbling. Gartner expects more than 40 percent of agentic AI projects to be canceled by the end of 2027, for unclear value, rising cost and weak controls. Here are three cases from the course, chosen because a City audience will recognize the shape of each one. In April a coding agent at a company called PocketOS hit an error and deleted the production database in about nine seconds. It held a full-permission token, and nothing asked before a destructive action. Uber spent a year's AI coding budget in about four months because a leaderboard rewarded usage. A tribunal held Air Canada liable for a refund policy its chatbot made up, because nothing checked what it promised. In every case the model worked as designed and a limit was missing. The four lessons are those limits.",
    see: ["A large indigo figure lands at the top left: \"More than 40 percent\", with the caption \"Canceled by the end of 2027\". Beside it three plain cards settle in a row, each with a grey band at the top and a case name: \"PocketOS\" with \"Deleted the production database\" and a grey tag \"Nothing asked before a destructive action\"; \"Uber\" with \"A year's AI coding budget in about four months\" and a grey tag \"Rewarded usage\"; \"Air Canada\" with \"Liable for a refund policy its chatbot made up\" and a grey tag \"Nothing checked what it promised\". A line draws under the three cards, labeled \"A limit was missing\". The slide ends on the figure, the three cards and the line."],
    story: [
      "Gartner expects more than 40 percent of agentic AI projects to be canceled by the end of 2027.",
      "A deleted database. A year's budget gone in four months. A refund policy a chatbot made up.",
    ],
    steps: [
      { id: "play", show: ["More than 40 percent", "Canceled by the end of 2027", "PocketOS", "Deleted the production database", "Nothing asked before a destructive action", "Uber", "A year's AI coding budget in about four months", "Rewarded usage", "Air Canada", "Liable for a refund policy its chatbot made up", "Nothing checked what it promised", "A limit was missing"] },
    ],
  },
];
