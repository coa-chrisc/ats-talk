import type { Picture } from "./types";

/** Part 3. The four lessons: slides 7 to 10, drawn in the world `ideas`. */
export const THE_FOUR_LESSONS: Picture[] = [
  {
    id: "ladder",
    number: "7",
    part: 3,
    world: "ideas",
    name: "Lesson one: the least autonomy that gets the job done",
    show: "Lesson one. Use the least autonomy that gets the job done.",
    say: "Lesson one is the one we would want every manager in the City to carry around. There are four rungs, and they climb like a stair. Automation runs on fixed rules, with no AI in it. A copilot drafts and a person approves every step. In a workflow people set the steps in advance, and AI helps inside them. An agent chooses its own steps. Autonomy is how much the AI decides and does without a person. Each rung up gives the AI more of it, and more autonomy means more that someone has to control, review and answer for. So the course says: climb one rung at a time, stop at the lowest rung that gets the job done, and ask why not less. The point for leadership is that the City needs all four rungs available, so each job can land on the lowest one that works. And some jobs need no AI at all. A plain tool, built fast with AI's help, is often the right answer.",
    see: ["Four steps rise left to right like a stair, each a block: \"Automation\" with the caption \"Fixed rules, no AI\", \"Copilot\" with \"A person approves every step\", \"Workflow\" with \"People set the steps; AI helps inside them\", and \"Agent\" with \"Chooses its own steps\". A small green figure climbs onto the first step and stops; a deep-green tick appears over it with the label \"Stop here if it gets the job done\". A grey arrow along the top of the stair reads \"More autonomy, so more to control, review and answer for\". Below the stair a small tool outline fills solid, labeled \"Plain tool\", with the caption \"Some jobs need no AI at all\". The slide ends on the stair, the figure on the first step, the grey arrow and the plain tool."],
    story: [
      "Autonomy is how much the AI does without a person. Four rungs: automation, a copilot, a workflow, an agent.",
      "Each rung up means more autonomy, and more to control, review and answer for. Stop at the lowest that works.",
    ],
    steps: [
      { id: "play", show: ["Automation", "Fixed rules, no AI", "Copilot", "A person approves every step", "Workflow", "People set the steps; AI helps inside them", "Agent", "Chooses its own steps", "Stop here if it gets the job done", "More autonomy, so more to control, review and answer for", "Plain tool", "Some jobs need no AI at all"] },
    ],
  },
  {
    id: "enforce",
    number: "8",
    part: 3,
    world: "ideas",
    name: "Lesson two: put the rules where the AI cannot break them",
    show: "Lesson two. Put the rules where the AI cannot break them.",
    say: "Lesson two is where the course was firmest. If you tell an AI a rule, in its instructions, it can be talked out of it; the course cites attacks that got past tested defenses most of the time. If the system blocks the action, with a permission it does not have or a network it cannot reach, the rule holds whether the AI cooperates or not. From the strongest control to the weakest, they run: the system blocks it, a person approves first, the AI is told the rule, and a person checks afterward. That last one only counts when the person has the time, the information and the authority to stop what they are looking at. The second half of the lesson is proportion. Where AI only assists, approved tools and data and a quick review are enough, so the work keeps moving. With some risk, a named person signs off. Where a mistake is costly or hard to undo, you require approvals and you block the risky actions in the system.",
    see: ["Four blocks descend left to right like a stair going down: \"The system blocks it\", \"A person approves first\", \"The AI is told the rule\", and \"A person checks afterward\". A green arrow at the left reads \"Strongest control\". Below the stair a dial draws with three settings: \"AI only assists\" with the caption \"Approved tools and a quick review\", \"Some risk\" with \"A named person signs off\", and \"Costly or hard to undo\" with \"Approvals and system blocks\". The needle rests on the first setting. The slide ends on the descending stair and the dial."],
    story: [
      "If you only tell an AI a rule, a clever request can talk it out of it. If the system blocks the action, it cannot.",
      "Where AI only assists, approved tools and a quick review are enough. Where a mistake is costly, add approvals.",
    ],
    steps: [
      { id: "play", show: ["The system blocks it", "A person approves first", "The AI is told the rule", "A person checks afterward", "Strongest control", "AI only assists", "Approved tools and a quick review", "Some risk", "A named person signs off", "Costly or hard to undo", "Approvals and system blocks"] },
    ],
  },
  {
    id: "people",
    number: "9",
    part: 3,
    world: "ideas",
    name: "Lesson three: train your own staff first",
    show: "Lesson three. Train your own staff before you buy an AI product.",
    say: "Lesson three answers the question every department asks us, which is whether to wait for a vendor. BCG read 4,800 earnings calls and found that six percent of companies lead on AI and outperform their peers by 9.3 percentage points in industry-adjusted shareholder returns. What sets them apart is talent: fluency across the whole workforce plus a small expert team, with technology mostly the same as everyone else's. BNY, the bank, trained its staff to work with AI agents before it let any agent act on its own. Now those staff manage more than 130 agents the bank calls digital employees, each one managed the way you would manage a person: a job, limits, and a record of everything it does. The training came first. The City's knowledge of its own services lives in City staff. That is the asset the boost spending puts to work, and no vendor can supply it.",
    see: ["A balance draws on the left with a post, a beam and two pans. The left pan holds an indigo box with a vendor tag, labeled \"Technology\"; the right pan holds three green people, labeled \"Talent\". The beam tips toward Talent. In the middle a large indigo figure lands: \"Six percent\", with the caption \"Of companies lead on AI, with 9.3 percentage points higher shareholder returns\". At the right a plaque settles, labeled \"BNY, a bank\", with \"Its trained staff now manage more than 130 AI agents\". The slide ends on the tipped balance, the figure and the plaque."],
    story: [
      "BCG studied 4,800 earnings calls. The six percent of companies that lead on AI stand apart on talent.",
      "BNY, a bank, trained its staff to work with AI agents. Now those staff manage more than 130 of them.",
    ],
    steps: [
      { id: "play", show: ["Technology", "Talent", "Six percent", "Of companies lead on AI, with 9.3 percentage points higher shareholder returns", "BNY, a bank", "Its trained staff now manage more than 130 AI agents"] },
    ],
  },
  {
    id: "earn",
    number: "10",
    part: 3,
    world: "ideas",
    name: "Lesson four: start where a mistake is cheap",
    show: "Lesson four. Start where a mistake is cheap. Once that works, take on something harder.",
    say: "Lesson four is the course's answer to pilot purgatory, where everything is a proof of concept and nothing ships. Start where a mistake has little impact and costs little to fix. Once the first project works reliably, take on a harder one, and let the results decide when, not hope or a vendor's calendar. The course calls each checkpoint a gate, four of them, explore, validate, deploy and scale, and a project passes each one on results. It also gives six tests for the first use cases: frequent decisions, measurable impact, friction in the current process, ready data, rules that can be written down, and contained risk. Most first picks score well on all six, and most of them are work where AI only assists. Those are the four lessons. The rest of the talk is where the City stands against the four, and it is a better picture than you might think.",
    see: ["A stair of four gates rises left to right, each a step with a small gate drawn on it: \"Explore\", \"Validate\", \"Deploy\", \"Scale\". A small green project box climbs onto the first step, and a deep-green tick lands beside it with the caption \"Passed on results\". The box climbs to the second step and a second tick lands; the third step stays empty. Beside the stair a checklist draws under the heading \"Six tests for the first use cases\", with six lines each taking a deep-green tick in turn: \"Frequent decisions\", \"Measurable impact\", \"Friction in today's process\", \"Ready data\", \"Rules that can be written down\", \"Contained risk\". The slide ends on the stair with the box on its second step and the ticked checklist."],
    story: [
      "Pick work where a mistake has little impact and is cheap to fix. The course gives six tests for finding it.",
      "Once the first project works reliably, take on a harder one. The course calls each checkpoint a gate.",
    ],
    steps: [
      { id: "play", show: ["Explore", "Validate", "Deploy", "Scale", "Passed on results", "Six tests for the first use cases", "Frequent decisions", "Measurable impact", "Friction in today's process", "Ready data", "Rules that can be written down", "Contained risk"] },
    ],
  },
];
