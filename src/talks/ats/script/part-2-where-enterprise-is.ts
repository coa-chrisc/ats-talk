import type { Picture } from "./types";

/** Part 2. Where enterprise is: slides 3 to 6, drawn in the world `enterprise`. */
export const WHERE_ENTERPRISE_IS: Picture[] = [
  {
    id: "spending",
    number: "3",
    part: 2,
    world: "enterprise",
    name: "Enterprise is spending big",
    show: "Companies are investing in AI and connecting it to their own data.",
    say: "BCG's October survey puts AI investment at 17 percent of IT budgets in 2026, up from five percent in 2025. The course describes three ways to invest: buy, boost, and build. It illustrates the split as roughly 35, 55, and 10 percent. Buy means off-the-shelf tools for common tasks. Build means custom systems when existing products do not meet the need. Boost means connecting commercial AI services to the organization's own data and helping staff use them. That is the largest share in the course's example. The same distinction matters for the City. City staff know how our services work, and we need that knowledge to make these tools useful. Later we will return to the City's own AI budget line, which is currently zero.",
    see: ["The title settles before the visual sequence begins. Two indigo columns rise side by side on the left, labeled \"2025\" and \"2026\" under their feet, each column carrying the label \"AI investment\" and its figure, \"Five percent\" and \"17 percent\"; the second column is more than three times the first. One caption sits under both columns: \"Of IT budgets\". On the right, under the heading \"Where that money is going\", a wide bar splits into three parts labeled \"Buy\", \"Boost\" and \"Build\", sized about 35, 55 and 10, each with a caption: \"Off-the-shelf tools\", \"AI connected to your data\", \"Custom systems\". The middle part fills green. The slide ends on the two columns and the three-part bar. After the visual sequence finishes, both supporting sentences appear together; nothing moves afterward."],
    story: [
      "Much of that work helps staff use commercial AI services with their own data.",
      "City staff know how our services work. We need their knowledge to make these tools useful.",
    ],
    steps: [
      { id: "play", show: ["2025", "2026", "AI investment", "Five percent", "17 percent", "Of IT budgets", "Where that money is going", "Buy", "Boost", "Build", "Off-the-shelf tools", "AI connected to your data", "Custom systems"] },
    ],
  },
  {
    id: "agents",
    number: "4",
    part: 2,
    world: "enterprise",
    name: "From chatbots to agents",
    show: "A chatbot answers a question. An agent works toward a goal.",
    say: "The word agent gets used for many things, so this is the definition we will use. A chatbot answers a question. A copilot drafts work for a person to review and approve. An agent is given a goal and can carry out several steps toward it. It plans, chooses tools, acts inside other systems, checks the result, and adjusts. It stops when it reaches the goal or when the next action needs permission. The important difference is that it uses the result of one step to decide what to do next. That is useful because people do not have to perform every step by hand. It also means we need controls on what the agent can access and do between human checkpoints.",
    see: ["The title settles before the visual sequence begins. A timeline draws left to right from \"2023\" to \"2026\" with three figures on it: a speech bubble labeled \"Chatbot\" with the caption \"Answers a question\", a page with a person beside it labeled \"Copilot\" with \"Drafts for a person to approve\", and a hexagon agent labeled \"Agent\" with \"Does the work\". Centred under the agent, a larger loop draws as a ring, clockwise from its left side, past five small stops, each lighting in turn: \"Goal\", \"Plans\", \"Tools\", \"Acts\", \"Adjusts\". Where the ring comes back to its left side, a closed gate lands across it, its green posts either side and its two navy bars across the ring, labeled \"Stops when permission is needed\". The slide ends on the timeline and the lit loop. After the visual sequence finishes, both supporting sentences appear together; nothing moves afterward."],
    story: [
      "An agent plans its steps, uses tools, acts in other systems, checks the result, and adjusts.",
      "It can complete several steps without a person, so we need controls on what it can do.",
    ],
    steps: [
      { id: "play", show: ["2023", "2026", "Chatbot", "Answers a question", "Copilot", "Drafts for a person to approve", "Agent", "Does the work", "Goal", "Plans", "Tools", "Acts", "Adjusts", "Stops when permission is needed"] },
    ],
  },
  {
    id: "review",
    number: "4a",
    part: 2,
    world: "enterprise",
    name: "Reviewing agent output",
    show: "Human oversight has to scale with agent work.",
    say: "Human oversight has to scale with agent work. Gartner forecasts that by 2028, agents will make at least 15 percent of day-to-day work decisions autonomously. That is a forecast, not a result we have measured. As agents take on more work, asking a person to approve every routine action becomes impractical. We can use rules and a second language model to flag work that needs attention. A second model can also be wrong, so its review is not a guarantee. Routine work can proceed within approved limits. High-risk decisions and exceptions go to people before the work proceeds; they can approve it, correct it, or stop it. People also audit samples of completed routine work to find problems the automated checks missed and improve the controls. Technical controls still enforce what agents are allowed to do. People remain accountable; their attention goes where judgment is needed, rather than to approving every action.",
    see: ["The title and stationary top-right callout appear first: \"Gartner forecast\", \"At least 15% by 2028\", and \"Of day-to-day work decisions made autonomously by agents\". Both supporting sentences appear together, followed by a brief 0.6-second pause. Three hexagon agents labeled \"Agents at work\" produce a few documents, then a growing stream. The documents, all navy, travel through \"Automated checks\", captioned \"Rules and a second model\", into a visibly growing grid labeled \"Completed work\", which ends full, with no gaps. Occasional documents branch downward before completion into a tray labeled \"Exceptions and high-risk work\", captioned \"Review before proceeding\". After the stream finishes, copies of several completed documents move into a separate tray labeled \"Audit samples\", captioned \"Review after completion\"; the completed grid stays full. In their own column between the two trays, a person and approval mark are labeled \"Human oversight\". A small caption states \"Illustrative flow, not measured throughput\". The animation runs once, then holds on the accumulated work and both trays. It shows increasing output without implying measured speed, error rates, or sampling ratios."],
    story: [
      "Automated checks flag work that needs human review.",
      "People review high-risk decisions and exceptions, and audit samples of routine work.",
    ],
    steps: [
      { id: "play", show: ["Gartner forecast", "At least 15% by 2028", "Of day-to-day work decisions made autonomously by agents", "Agents at work", "Automated checks", "Rules and a second model", "Completed work", "Exceptions and high-risk work", "Review before proceeding", "Audit samples", "Review after completion", "Human oversight", "Illustrative flow, not measured throughput"] },
    ],
  },
  {
    id: "fleet-defined",
    number: "5",
    part: 2,
    world: "enterprise",
    name: "What a fleet is",
    show: "A fleet is a team of agents with different jobs.",
    say: "A fleet is a team of agents working on a shared task, each with its own role. Lead agents read the brief and rules, then divide the work into tasks. Builder agents complete those tasks in parallel. Review agents check the changes before they are used. The reviewer is separate from the agent that did the work, for the same reason an auditor is separate from the bookkeeper. A permission checker screens attempted actions: routine actions can proceed, while risky actions pause until a person approves them. A person also approves the final result before it reaches a user. The course demonstrated a fleet of five agents. It gave as much attention to separating their permissions and responsibilities as to the work each agent performed.",
    see: ["The title settles, then complete groups appear from left to right. Every agent is drawn as the same hexagon; the labels and where each group stands tell their roles. The planning group is labeled \"Lead agents\"; the work group is labeled \"Builders\"; independent reviewers are labeled \"Review agents\", with a dividing line labeled \"No agent grades its own work\" set at the line's foot. Above the builders, a closed gate stands on a line over the whole work group, and the \"Permission checker\" and its caption \"Risky actions wait for approval\" sit above the gate; they appear with the entire work group. At the far right, the person and approval mark appear together, labeled \"A person approves\". The planning group appears first; the builders and permission checker arrive together next; then the dividing line, reviewers, and person. Nothing changes in an earlier group after the next one starts. After the visual finishes, both supporting sentences appear together."],
    story: [
      "Lead agents plan the work. Builders complete tasks. Review agents check the changes.",
      "Permission checks pause risky actions for approval. A person approves the final result.",
    ],
    steps: [
      { id: "play", show: ["Lead agents", "Builders", "Review agents", "No agent grades its own work", "Permission checker", "Risky actions wait for approval", "A person approves"] },
    ],
  },
  {
    id: "stumbled",
    number: "6",
    part: 2,
    world: "enterprise",
    name: "Failures in controls",
    show: "These failures show why AI needs effective controls.",
    say: "Despite the spending, companies ran into serious problems. Gartner expects more than 40 percent of agentic AI projects to be canceled by the end of 2027, citing unclear value, rising costs, and weak controls. These three cases from the course illustrate failures in controls. At PocketOS, a coding agent with full delete permissions wiped the production database in about nine seconds while trying to fix an error. It could delete the database without a person's approval. At Uber, coding agents consumed a year's AI coding budget in four months. A leaderboard rewarded usage, and no one had set a spending cap. Air Canada's chatbot promised refunds the airline's policy did not allow, and a tribunal held the airline responsible. The problem reached customers before the airline corrected it. These were not hacks. They show why we need to control permissions, costs, and customer-facing output. The four lessons explain how to approach those controls.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. A large indigo figure lands at the top left: \"More than 40 percent\", with the caption \"Of agentic AI projects will be canceled by the end of 2027, Gartner expects\". Beside it three plain cards settle in a row, each with a grey band at the top, a company name and what happened: \"PocketOS\" with \"A coding agent with full delete permissions wiped the production database\"; \"Uber\" with \"Coding agents spent a year's AI coding budget in four months\"; \"Air Canada\" with \"Its chatbot promised refunds outside policy\". Under each, a grey tag names what was not in place: \"Deletion needed no human approval\"; \"No one had set a spending cap\"; \"No one reviewed what it told customers\". A line draws under the three cards, labeled \"No one had limited what the AI could do\". The slide ends on the figure, the three cards and the line."],
    story: [
      "Gartner expects more than 40 percent of agentic AI projects to be canceled by the end of 2027.",
      "It cites unclear value, rising costs, and weak controls. These cases illustrate failures in controls.",
    ],
    steps: [
      { id: "play", show: ["More than 40 percent", "Of agentic AI projects will be canceled by the end of 2027, Gartner expects", "PocketOS", "A coding agent with full delete permissions wiped the production database", "Uber", "Coding agents spent a year's AI coding budget in four months", "Air Canada", "Its chatbot promised refunds outside policy", "Deletion needed no human approval", "No one had set a spending cap", "No one reviewed what it told customers", "No one had limited what the AI could do"] },
    ],
  },
];
