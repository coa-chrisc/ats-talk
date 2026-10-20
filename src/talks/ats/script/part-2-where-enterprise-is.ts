import type { Picture } from "./types";

/** Part 2. Where enterprise is: slides 3 to 6, drawn in the world `enterprise`. */
export const WHERE_ENTERPRISE_IS: Picture[] = [
  {
    id: "spending",
    number: "3",
    part: 2,
    world: "enterprise",
    name: "Enterprise is spending big",
    show: "Enterprise AI spending tripled in two years. Most of it pairs models with a company's own data.",
    say: "Money first, because it sets the scale. BCG's October survey puts AI at 17 percent of IT budgets, up from five percent two years ago, with another 2.8 percent of revenue, outside IT. Where it goes matters more than how much. The course splits AI spending into buy, boost and build. Buy is off-the-shelf tools for commodity work. Build is custom systems for the rare case where nothing else will do. Boost is the middle, more than half of the value: pairing models anyone can rent with a company's own data and knowledge, and its staff. That middle is where the City's advantage sits, because nobody sells the City's knowledge of its own services.",
    see: ["Two indigo columns rise side by side on the left, labeled \"Five percent\" and \"17 percent\", with the caption \"Of IT budgets\" under them; the second is more than three times the first. A smaller indigo figure lands beside them: \"2.8 percent\", with the caption \"Of revenue, outside IT\". On the right a wide bar splits into three parts labeled \"Buy\", \"Boost\" and \"Build\", sized about 35, 55 and 10, and the middle part fills green with the caption \"A company's own data and knowledge\". The slide ends on the two columns, the figure and the three-part bar."],
    story: [
      "AI is now 17 percent of enterprise IT budgets, up from five, plus 2.8 percent of revenue outside IT.",
      "Where it goes: buy about 35 percent, boost about 55 percent, build about 10 percent.",
    ],
    steps: [
      { id: "play", show: ["Five percent", "17 percent", "Of IT budgets", "2.8 percent", "Of revenue, outside IT", "Buy", "Boost", "Build", "A company's own data and knowledge"] },
    ],
  },
  {
    id: "agents",
    number: "4",
    part: 2,
    world: "enterprise",
    name: "From chatbots to agents",
    show: "An agent takes a goal, plans its own steps, uses tools, acts, and stops at a boundary.",
    say: "The word agent gets used for everything, so this is the definition we will hold to. In 2023 a chatbot answered a question; by 2026 an agent does the work. A copilot drafts, and a person approves each step. An agent is given a goal, breaks it into steps, chooses tools, takes actions in other systems, checks the result and adjusts, and keeps going until the goal is met or it reaches a boundary someone set. The loop is the whole point. It is why agents are useful, because the person no longer does every step, and it is why they need different controls, because the person no longer sees every step either. Everything in the course follows from that one sentence.",
    see: ["A timeline draws left to right from \"2023\" to \"2026\" with three figures on it: a speech bubble labeled \"Chatbot\" with the caption \"Answers\", a page with a person beside it labeled \"Copilot\" with \"Drafts while a person decides\", and a figure with a tool belt labeled \"Agent\" with \"Does the work\". Under the agent a loop draws as five small stops joined in a ring, each lighting in turn: \"Goal\", \"Plans\", \"Tools\", \"Acts\", \"Adjusts\". A short bar closes the loop, labeled \"Stops at a boundary\". The slide ends on the timeline and the lit loop."],
    story: [
      "A chatbot answers. A copilot drafts while a person decides. An agent does the work.",
      "The value and the risk come from the same place: it acts without a person doing each step.",
    ],
    steps: [
      { id: "play", show: ["2023", "2026", "Chatbot", "Answers", "Copilot", "Drafts while a person decides", "Agent", "Does the work", "Goal", "Plans", "Tools", "Acts", "Adjusts", "Stops at a boundary"] },
    ],
  },
  {
    id: "review",
    number: "4a",
    part: 2,
    world: "enterprise",
    name: "Review moved off the person",
    show: "Review by a person worked for chatbots. Agents produce more than anyone can read.",
    say: "One more thing changed, and it is the reason the controls changed with it. When AI was a chatbot, a person read every answer before anything happened, and that was enough. Agents finish days of work in an hour. Anthropic merged 2,500 a day in May and over 30,000 a day by September; a study of 22,000 developers found review time up fivefold. No staff can read that, so enterprise moved the review into the system. A model checks first, programmatic limits catch what it misses, and people take the high-risk cases, which is where Gartner expects human authority to stay: exceptions, appeals and anything that touches a resident. Gartner expects agents to make 15 percent of work decisions by 2028, with people kept on the rest.",
    see: ["On the left a short timeline of two bars rises, labeled \"May\" and \"September\", the second 12 times the first, with the captions \"2,500 a day\" and \"Over 30,000 a day\". In the middle a single person sits at a desk with a stack of pages growing beside them until it towers over the desk, labeled \"More than anyone can read\". On the right a funnel draws: a wide mouth labeled \"A model checks first\", narrowing to a small outlet where a person stands with the orange mark of a person deciding, labeled \"People take the high-risk cases\". Under the funnel an indigo figure lands: \"15 percent\", with the caption \"Of work decisions by 2028\". The slide ends on the two bars, the towering stack and the funnel with its figure."],
    story: [
      "Anthropic merged 2,500 code changes a day in May and over 30,000 a day by September.",
      "Enterprise moved review into the system: a model checks first, and people take the high-risk cases.",
    ],
    steps: [
      { id: "play", show: ["May", "September", "2,500 a day", "Over 30,000 a day", "More than anyone can read", "A model checks first", "People take the high-risk cases", "15 percent", "Of work decisions by 2028"] },
    ],
  },
  {
    id: "fleet-defined",
    number: "5",
    part: 2,
    world: "enterprise",
    name: "What a fleet is",
    show: "A fleet is several agents with separate roles. A person approves the result.",
    say: "One more definition, because it comes back later. A fleet is several agents working one job with separate roles. Lead agents read the brief, the rules and the available parts, and split the work into pieces. Builders take the pieces in parallel. Reviewers check every change before it goes anywhere, and the course is firm that the reviewer is never the agent that did the work, for the same reason an auditor is not the bookkeeper. At the end a person approves, and nothing reaches a user before that. The course's own demo was a fleet of five, and it spent as much time on the walls between the agents as on the agents.",
    see: ["Three green lead agents sit at a desk on the left, labeled \"Lead agents\", with a board beside them splitting into rows. Below, a row of six smaller green agents fill cells of the board in parallel, labeled \"Builders\". To the right two agents with a different mark check the filled cells, labeled \"Reviewers\", and a thin wall draws between them and the builders, labeled \"Kept apart\". At the far right a person stands and the orange approval mark lands, labeled \"A person approves\". The slide ends on the four groups in a row from left to right with the mark at the end."],
    story: [
      "Lead agents plan the work and split it up. Builders do it in parallel. Reviewers check every change.",
      "The roles are kept apart on purpose, so no agent grades its own work.",
    ],
    steps: [
      { id: "play", show: ["Lead agents", "Builders", "Reviewers", "Kept apart", "A person approves"] },
    ],
  },
  {
    id: "stumbled",
    number: "6",
    part: 2,
    world: "enterprise",
    name: "Most who rushed stumbled",
    show: "Most organizations that rushed into agents are stumbling. Each failure was a missing limit.",
    say: "The spending bought a lot of stumbling. Gartner expects more than 40 percent of agentic projects to be canceled by the end of 2027, for unclear value, rising cost and weak controls. Three cases from the course, chosen because a City audience will recognize them. In April a coding agent at PocketOS hit an error and deleted the production database in about nine seconds; it held a full-permission token, and nothing asked before a destructive action. Uber spent a year's AI coding budget in about four months because a leaderboard rewarded usage. A tribunal held Air Canada liable for a refund policy its chatbot invented; nothing checked what it promised. In each case the model worked as designed and a limit was missing. The four ideas are the limits.",
    see: ["A large indigo figure lands at the top left: \"Over 40 percent\", with the caption \"Canceled by the end of 2027\". Beside it three plain cards settle in a row, each with a grey band at the top and a case name: \"PocketOS\" with \"Deleted the production database\" and a grey tag \"Nothing asked before a destructive action\"; \"Uber\" with \"A year's AI coding budget in about four months\" and a grey tag \"Rewarded usage\"; \"Air Canada\" with \"Liable for a refund policy its chatbot invented\" and a grey tag \"Nothing checked what it promised\". A line draws under the three cards, labeled \"A limit was missing\". The slide ends on the figure, the three cards and the line."],
    story: [
      "Gartner expects over 40 percent of agentic projects to be canceled by the end of 2027.",
      "A deleted database, a year's budget gone in four months, a chatbot's invented refund policy.",
    ],
    steps: [
      { id: "play", show: ["Over 40 percent", "Canceled by the end of 2027", "PocketOS", "Deleted the production database", "Nothing asked before a destructive action", "Uber", "A year's AI coding budget in about four months", "Rewarded usage", "Air Canada", "Liable for a refund policy its chatbot invented", "Nothing checked what it promised", "A limit was missing"] },
    ],
  },
];
