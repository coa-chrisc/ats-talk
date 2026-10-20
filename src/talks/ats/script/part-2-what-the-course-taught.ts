import type { Picture } from "./types";

/** Part 2. What the course taught: slides 5 to 8, drawn in the world `taught`. */
export const WHAT_THE_COURSE_TAUGHT: Picture[] = [
  {
    id: "ladder",
    number: "5",
    part: 2,
    world: "taught",
    name: "Use the least autonomy that does the job",
    show: "Use the least autonomy that does the job, and stop at the first rung that works.",
    say: "The first idea is the one we would want every manager to carry. The course calls it least sufficient agency. There is a ladder: automation with fixed rules, a copilot where a person approves every step, a workflow where the steps are set and the model helps inside them, and an agent that chooses its own steps. Each rung up adds value sometimes and adds things to govern always. The test is to climb one rung at a time and stop at the first rung that works, then ask why not less. The course's first question is whether fixed rules can do the whole job. Often they can. Many of the City's good ideas need a plain tool, built quickly with AI help, with no AI inside at all.",
    see: ["Four steps rise left to right like a stair, each a block: \"Automation\" with the caption \"Fixed rules\", \"Copilot\" with \"A person approves every step\", \"Workflow\" with \"The steps are set\", and \"Agent\" with \"Chooses its own steps\". A small green figure climbs onto the first step and stops; a deep-green tick appears over it with the label \"Stop at the first rung that works\". A grey arrow along the top of the stair reads \"More to govern\". Below the stair a small tool outline fills solid, labeled \"Plain tool\", with the caption \"No AI inside\". The slide ends on the stair, the figure on the first step, the grey arrow and the plain tool."],
    story: [
      "Automation, then copilot, then workflow, then agent; each rung adds more to govern.",
      "Many good ideas need a plain tool, built with AI help, with no AI inside at all.",
    ],
    steps: [
      { id: "play", show: ["Automation", "Fixed rules", "Copilot", "A person approves every step", "Workflow", "The steps are set", "Agent", "Chooses its own steps", "Stop at the first rung that works", "More to govern", "Plain tool", "No AI inside"] },
    ],
  },
  {
    id: "talent",
    number: "6",
    part: 2,
    world: "taught",
    name: "Talent, not technology",
    show: "The organizations that get value from AI build their own people, and vendors cannot do that for them.",
    say: "The second idea answers the question every department asks, which is whether to wait for a vendor. BCG read 4,800 earnings calls and found that only six percent of companies qualify as AI leaders. They outperform peers by 9.3 points, and their greatest differentiator is talent, not technology: enterprise-wide fluency plus a small expert team. The course's buy, boost, build split puts most of the value in the middle, in what it calls boost, pairing a foundation model with the organization's own data and knowledge. That knowledge sits in City staff, not in any vendor. BNY runs more than 130 digital employees today, and the lesson the course drew is that it trained its workforce first. We would do the same.",
    see: ["Two figures stand side by side. The left is an indigo box labeled \"Technology\" with a vendor tag on it; the right is a group of green people labeled \"Talent\". A scale draws under them and tips toward \"Talent\". Above, an indigo figure lands: \"Six percent\", with the caption \"Outperform peers by 9.3 points\". Then a bar splits into three parts, labeled \"Buy\", \"Boost\" and \"Build\", and the middle part, the largest, fills green with the caption \"The organization's own data and knowledge\". A small plaque settles at the right, labeled \"BNY\", with \"Trained its workforce first\". The slide ends on the tipped scale, the figure, the three-part bar and the plaque."],
    story: [
      "BCG: only six percent of companies lead on AI, and their edge is talent, not technology.",
      "Most value comes from pairing AI with the organization's own data and knowledge, not from buying.",
    ],
    steps: [
      { id: "play", show: ["Technology", "Talent", "Six percent", "Outperform peers by 9.3 points", "Buy", "Boost", "Build", "The organization's own data and knowledge", "BNY", "Trained its workforce first"] },
    ],
  },
  {
    id: "enforce",
    number: "7",
    part: 2,
    world: "taught",
    name: "Govern in proportion to risk, with rules the system enforces",
    show: "Rules the system enforces beat rules we ask people or models to follow, and the controls should fit the risk.",
    say: "The third idea is where the course is firmest. A rule told to a model in a prompt can be ignored or talked around; the course cites adaptive attacks beating tested defenses most of the time. A rule the system enforces, a permission, a network limit, a sandbox, holds. Approval before effect sits between the two. A person checks last, and only counts with time and authority. The City already has the strongest kind: staff cannot use what the system does not allow. The second half is proportion. Light controls for assist-only work, approved tools and data and a lightweight review, so first projects keep moving. Heavy controls, named approvers, tested stops, full logs, go only where exposure is high. The CISO's list and speed are not in conflict.",
    see: ["Four blocks descend left to right like a stair going down: \"The system enforces it\", \"Approval before effect\", \"A rule told to a model\", and \"A person checks\". A green arrow at the left reads \"Strongest\". The City's fence post from slide 3 lands on the top block, labeled \"Authorized tools list\", with a deep-green tick. Below the stair a dial draws with three settings: \"Assist-only work\" with the caption \"Light controls\", \"Approval\" with \"Named approvers\", and \"Exposure is high\" with \"Heavy controls\". The needle rests on the first setting. The slide ends on the descending stair, the ticked post and the dial."],
    story: [
      "The City's authorized tools list is already the strongest kind of control: the system enforces it.",
      "Light controls keep first projects moving; heavy controls go where exposure is high.",
    ],
    steps: [
      { id: "play", show: ["The system enforces it", "Approval before effect", "A rule told to a model", "A person checks", "Strongest", "Authorized tools list", "Assist-only work", "Light controls", "Approval", "Named approvers", "Exposure is high", "Heavy controls"] },
    ],
  },
  {
    id: "incidents",
    number: "8",
    part: 2,
    world: "taught",
    name: "Why the order matters",
    show: "Every incident the course studied was a governance failure before it was a technology failure.",
    say: "Three cases, and we chose the ones a City audience will recognize. In April a coding agent at PocketOS hit an error in staging and fixed it by deleting the production database in about nine seconds; it held a full-permission token and nothing asked before a destructive action. Uber spent its full-year AI coding budget in about four months because a leaderboard rewarded usage, and its chief operating officer said the link to shipped value was not there yet. A tribunal held Air Canada liable for a refund policy its chatbot invented; nothing checked what it promised. None of these needed a better model. Each needed a limit, a budget or a check that was not there. The last three slides, in that order, are what prevents them.",
    see: ["Three plain cards settle in a row, each with a red stripe at the top. The first reads \"PocketOS\", with \"Deleting the production database\" and under it a grey tag \"Nothing asked before a destructive action\". The second reads \"Uber\", with \"Full-year AI coding budget in about four months\" and a grey tag \"Rewarded usage\". The third reads \"Air Canada\", with \"A refund policy its chatbot invented\" and a grey tag \"Nothing checked what it promised\". A single line draws under all three, labeled \"A governance failure before it was a technology failure\". The slide ends on the three cards and the line."],
    story: [
      "A coding agent deleted a production database in about nine seconds; it had a full-permission token.",
      "Uber used its full-year AI coding budget in about four months; a usage leaderboard drove the spend.",
    ],
    steps: [
      { id: "play", show: ["PocketOS", "Deleting the production database", "Nothing asked before a destructive action", "Uber", "Full-year AI coding budget in about four months", "Rewarded usage", "Air Canada", "A refund policy its chatbot invented", "Nothing checked what it promised", "A governance failure before it was a technology failure"] },
    ],
  },
];
