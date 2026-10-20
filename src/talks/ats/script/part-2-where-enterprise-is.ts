import type { Picture } from "./types";

/** Part 2. Where enterprise is: slides 3 to 6, drawn in the world `enterprise`. */
export const WHERE_ENTERPRISE_IS: Picture[] = [
  {
    id: "spending",
    number: "3",
    part: 2,
    world: "enterprise",
    name: "Enterprise is spending big",
    show: "Enterprise AI spending has tripled. Most of it goes to putting their own data to work.",
    say: "Money first, because it sets the scale. BCG's October survey puts AI investment at 17 percent of IT budgets in 2026, up from five percent in 2025, more than three times as much. Where that money is going matters more than how much there is. The course splits it three ways. Buy is off-the-shelf tools for commodity work, about a third of the spending. Build is custom systems for the rare case where nothing on the market will do, about a tenth. Boost is the middle and the largest share: your own data on rented AI, the same models anyone can pay to use, in the hands of your own staff. So the money is not mostly buying new AI. It is paying to connect AI to what a company already knows. That is where the City's value lies too, because no vendor can sell the City its knowledge of its own services. Hold that thought until we get to the City's own budget line, which is zero.",
    see: ["Two indigo columns rise side by side on the left, labeled \"2025\" and \"2026\" under their feet, each column carrying the label \"AI investment\" and its figure, \"Five percent\" and \"17 percent\"; the second column is more than three times the first. One caption sits under both columns: \"Of IT budgets\". On the right, under the heading \"Where that money is going\", a wide bar splits into three parts labeled \"Buy\", \"Boost\" and \"Build\", sized about 35, 55 and 10, each with a caption: \"Off-the-shelf tools\", \"Your own data on rented AI\", \"Custom systems\". The middle part fills green. The slide ends on the two columns and the three-part bar."],
    story: [
      "Most companies rent the AI and spend the money pairing it with their own data and their own staff.",
      "That is where the City's value lies too: no vendor can sell the City its knowledge of its own services.",
    ],
    steps: [
      { id: "play", show: ["2025", "2026", "AI investment", "Five percent", "17 percent", "Of IT budgets", "Where that money is going", "Buy", "Boost", "Build", "Off-the-shelf tools", "Your own data on rented AI", "Custom systems"] },
    ],
  },
  {
    id: "agents",
    number: "4",
    part: 2,
    world: "enterprise",
    name: "From chatbots to agents",
    show: "A chatbot answers a question. An agent is given a goal and does the work.",
    say: "The word agent gets used for everything, so here is the definition we will hold to. In 2023 a chatbot answered a question. A copilot drafts while a person decides, one step at a time. By 2026 an agent does the work. You give it a goal. It plans its own steps, picks its tools, acts inside other systems, checks the result and adjusts, and it keeps going until the goal is met or it stops at a limit someone set. The loop is the whole point. It is why agents are useful, because nobody is doing each step by hand anymore, and it is why they need different controls, because nobody is watching each step either. Everything else in the course follows from that.",
    see: ["A timeline draws left to right from \"2023\" to \"2026\" with three figures on it: a speech bubble labeled \"Chatbot\" with the caption \"Answers a question\", a page with a person beside it labeled \"Copilot\" with \"Drafts while a person decides\", and a figure with a tool belt labeled \"Agent\" with \"Does the work\". Under the agent a loop draws as five small stops joined in a ring, each lighting in turn: \"Goal\", \"Plans\", \"Tools\", \"Acts\", \"Adjusts\". A short bar closes the loop, labeled \"Stops at a limit someone set\". The slide ends on the timeline and the lit loop."],
    story: [
      "It plans its own steps, uses tools, acts inside other systems, checks the result and adjusts.",
      "That is both the value and the risk: no person is doing each step anymore, and no person is watching each one.",
    ],
    steps: [
      { id: "play", show: ["2023", "2026", "Chatbot", "Answers a question", "Copilot", "Drafts while a person decides", "Agent", "Does the work", "Goal", "Plans", "Tools", "Acts", "Adjusts", "Stops at a limit someone set"] },
    ],
  },
  {
    id: "review",
    number: "4a",
    part: 2,
    world: "enterprise",
    name: "Review moved off the person",
    show: "Human in the loop worked for chatbots. Agents produce more than anyone can feasibly review.",
    say: "One more thing changed, and it explains why the controls changed with it. When AI was a chatbot, a person read every answer before anything happened, and that was enough. Agents finish days of work in an hour. Anthropic, which makes one of the leading models, went from 2,500 merged code changes a day in May to more than 30,000 a day in September. A study of 22,000 developers found review time up fivefold. No staff can read that volume. So enterprise moved the review into the system. A second AI checks the first one's work, hard limits catch what it misses, and people handle the high-risk cases, which is exactly where Gartner expects human authority to stay: exceptions, appeals and anything that touches a resident. Gartner expects agents to make 15 percent of day-to-day work decisions by 2028.",
    see: ["On the left two bars rise, labeled \"May\" and \"September\", the second 12 times the first, with the captions \"2,500 code changes a day\" and \"More than 30,000 a day\". In the middle a single person sits at a desk with a stack of pages growing beside them until it towers over the desk, labeled \"More than anyone can feasibly review\". On the right a funnel draws: a wide mouth labeled \"A second AI checks first\", narrowing to a small outlet where a person stands with the orange mark of a person deciding, labeled \"People handle the high-risk cases\". Under the funnel an indigo figure lands: \"15 percent\", with the caption \"Of day-to-day work decisions will be made by agents by 2028, Gartner expects\". The slide ends on the two bars, the towering stack and the funnel with its figure."],
    story: [
      "One AI company went from 2,500 code changes a day in May to more than 30,000 a day in September.",
      "So review moved into the system. A second AI checks first, and people handle the high-risk cases.",
    ],
    steps: [
      { id: "play", show: ["May", "September", "2,500 code changes a day", "More than 30,000 a day", "More than anyone can feasibly review", "A second AI checks first", "People handle the high-risk cases", "15 percent", "Of day-to-day work decisions will be made by agents by 2028, Gartner expects"] },
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
    show: "Plenty of organizations rushed in and stumbled. Each time, no one had limited what the AI could do.",
    say: "All that spending bought a lot of stumbling. Gartner expects more than 40 percent of agentic AI projects to be canceled by the end of 2027, for unclear value, rising cost and weak controls. Here are three cases from the course. At a company called PocketOS, a coding agent with full delete permissions wiped the production database in about nine seconds while trying to fix an error. No step required a person to confirm first. At Uber, coding agents spent a year's budget in four months because a leaderboard rewarded whoever used them most, and no one had set a spending cap. Air Canada found out its chatbot promised refunds that did not exist when a tribunal made the airline honor them; no one reviewed what it told customers before they read it, so the first review was the tribunal's. None of these were hacks. In each case the AI did what it was built to do, and no one had limited what the AI could do. The four lessons are about setting those limits.",
    see: ["A large indigo figure lands at the top left: \"More than 40 percent\", with the caption \"Canceled by the end of 2027\". Beside it three plain cards settle in a row, each with a grey band at the top, a company name and what happened: \"PocketOS\" with \"A coding agent with full delete permissions wiped the production database\"; \"Uber\" with \"Coding agents spent a year's budget in four months\"; \"Air Canada\" with \"Its chatbot promised refunds that did not exist\". Under each, a grey tag names what was not in place: \"No step required a person to confirm first\"; \"No one had set a spending cap\"; \"No one reviewed what it told customers\". A line draws under the three cards, labeled \"No one had limited what the AI could do\". The slide ends on the figure, the three cards and the line."],
    story: [
      "Gartner expects more than 40 percent of agentic AI projects to be canceled by the end of 2027.",
      "One deleted its database. One spent a year's budget in four months. One promised refunds that did not exist.",
    ],
    steps: [
      { id: "play", show: ["More than 40 percent", "Canceled by the end of 2027", "PocketOS", "A coding agent with full delete permissions wiped the production database", "Uber", "Coding agents spent a year's budget in four months", "Air Canada", "Its chatbot promised refunds that did not exist", "No step required a person to confirm first", "No one had set a spending cap", "No one reviewed what it told customers", "No one had limited what the AI could do"] },
    ],
  },
];
