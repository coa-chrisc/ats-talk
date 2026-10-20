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
    say: "Lesson one is the one we would want every manager in the City to carry around. There are four rungs, and they climb like a stair. Plain automation runs on fixed rules. A copilot drafts and a person approves every step. In a workflow the steps are set in advance, with a model helping inside them. An agent chooses its own steps. Each rung up adds value sometimes and adds things to govern always. So the course says: climb one rung at a time, stop as soon as the job gets done, and ask why not less. The point for leadership is that the City needs all four rungs available, so each job can land on the lowest one that works. And some jobs need no AI at all. A plain tool, built fast with AI's help, is often the right answer.",
    see: ["Four steps rise left to right like a stair, each a block: \"Automation\" with the caption \"Fixed rules\", \"Copilot\" with \"A person approves every step\", \"Workflow\" with \"The steps are set\", and \"Agent\" with \"Chooses its own steps\". A small green figure climbs onto the first step and stops; a deep-green tick appears over it with the label \"Stop here if it gets the job done\". A grey arrow along the top of the stair reads \"Each rung up is more to govern\". Below the stair a small tool outline fills solid, labeled \"Plain tool\", with the caption \"No AI at all\". The slide ends on the stair, the figure on the first step, the grey arrow and the plain tool."],
    story: [
      "Four rungs: plain automation, a copilot, a workflow, an agent. Keep all four; each rung up is more to govern.",
      "Some jobs need no AI at all. A plain tool, built fast with AI's help, is often the right answer.",
    ],
    steps: [
      { id: "play", show: ["Automation", "Fixed rules", "Copilot", "A person approves every step", "Workflow", "The steps are set", "Agent", "Chooses its own steps", "Stop here if it gets the job done", "Each rung up is more to govern", "Plain tool", "No AI at all"] },
    ],
  },
  {
    id: "enforce",
    number: "8",
    part: 3,
    world: "ideas",
    name: "Lesson two: build the rules into the system",
    show: "Lesson two. Build the rules into the system, where the AI cannot break them.",
    say: "Lesson two is where the course was firmest. If you tell an AI a rule, in its instructions, it can be talked out of it; the course cites attacks that got past tested defenses most of the time. If the system blocks the action, with a permission it does not have or a network it cannot reach, the rule holds whether the AI cooperates or not. From strongest to weakest, the controls run: the system blocks it, a person approves first, the AI is told the rule, and a person checks afterward. That last one only counts when the person has the time, the information and the authority to stop what they are looking at. The second half of the lesson is proportion. Where AI only assists, use light controls, approved tools and data and a quick review, so the work keeps moving. In the middle, a person approves, with named approvers. Heavy controls belong where a mistake is costly or hard to undo.",
    see: ["Four blocks descend left to right like a stair going down: \"The system blocks it\", \"A person approves first\", \"The AI is told the rule\", and \"A person checks afterward\". A green arrow at the left reads \"Strongest\". Below the stair a dial draws with three settings: \"AI only assists\" with the caption \"Light controls\", \"A person approves\" with \"Named approvers\", and \"Costly or hard to undo\" with \"Heavy controls\". The needle rests on the first setting. The slide ends on the descending stair and the dial."],
    story: [
      "If you tell an AI a rule, it can be talked out of it. If the system blocks the action, it cannot.",
      "Match the controls to the risk: light where AI only assists, heavy where a mistake is hard to undo.",
    ],
    steps: [
      { id: "play", show: ["The system blocks it", "A person approves first", "The AI is told the rule", "A person checks afterward", "Strongest", "AI only assists", "Light controls", "A person approves", "Named approvers", "Costly or hard to undo", "Heavy controls"] },
    ],
  },
  {
    id: "people",
    number: "9",
    part: 3,
    world: "ideas",
    name: "Lesson three: train your own people first",
    show: "Lesson three. Train your own people before you buy a platform.",
    say: "Lesson three answers the question every department asks us, which is whether to wait for a vendor. BCG read 4,800 earnings calls and found that six percent of companies lead on AI and outperform their peers by 9.3 points. What sets them apart is talent: fluency across the whole workforce plus a small expert team, with technology mostly the same as everyone else's. BNY runs more than 130 digital employees today, each with a human manager, and the lesson the course drew is that the bank trained its workforce first and granted autonomy afterward. The City's knowledge of its own services lives in City staff. That is the asset the boost spending puts to work, and no vendor can supply it.",
    see: ["A balance draws on the left with a post, a beam and two pans. The left pan holds an indigo box with a vendor tag, labeled \"Technology\"; the right pan holds three green people, labeled \"Talent\". The beam tips toward Talent. In the middle a large indigo figure lands: \"Six percent\", with the caption \"Of companies lead on AI and outperform their peers by 9.3 points\". At the right a plaque settles, labeled \"BNY\", with \"Trained its workforce first\". The slide ends on the tipped balance, the figure and the plaque."],
    story: [
      "BCG found that six percent of companies lead on AI, and what sets them apart is talent, not technology.",
      "BNY runs 130 digital employees today. It trained its workforce before it gave any of them autonomy.",
    ],
    steps: [
      { id: "play", show: ["Technology", "Talent", "Six percent", "Of companies lead on AI and outperform their peers by 9.3 points", "BNY", "Trained its workforce first"] },
    ],
  },
  {
    id: "earn",
    number: "10",
    part: 3,
    world: "ideas",
    name: "Lesson four: start where a mistake costs little",
    show: "Lesson four. Start where a mistake costs little. Once that works, take on something harder.",
    say: "Lesson four is the course's answer to pilot purgatory, where everything is a proof of concept and nothing ships. Start where a mistake has little impact and costs little to fix. When you have command of that use case, take on a more complex one, and let the results decide when, not hope or a vendor's calendar. The course calls each move a gate, four of them, explore, validate, deploy and scale, and a project passes each one on results. It also gives six tests for the first use cases: frequent decisions, measurable impact, friction in the current process, ready data, rules that can be written down, and contained risk. Most first picks score well on all six, and most of them are work where AI only assists. Those are the four lessons. The rest of the talk is where the City stands against the four, and it is a better picture than you might think.",
    see: ["A stair of four gates rises left to right, each a step with a small gate drawn on it: \"Explore\", \"Validate\", \"Deploy\", \"Scale\". A small green project box climbs onto the first step, and a deep-green tick lands beside it with the caption \"Results\". The box climbs to the second step and a second tick lands; the third step stays empty. Beside the stair a checklist draws under the heading \"Six tests for the first use cases\", with six lines each taking a deep-green tick in turn: \"Frequent decisions\", \"Measurable impact\", \"Friction\", \"Ready data\", \"Rules that can be written\", \"Contained risk\". The slide ends on the stair with the box on its second step and the ticked checklist."],
    story: [
      "Pick work where a mistake has little impact and costs little to fix. Six tests help pick the first use cases.",
      "When you have command of that use case, take on a more complex one. The course calls each move up a gate.",
    ],
    steps: [
      { id: "play", show: ["Explore", "Validate", "Deploy", "Scale", "Results", "Six tests for the first use cases", "Frequent decisions", "Measurable impact", "Friction", "Ready data", "Rules that can be written", "Contained risk"] },
    ],
  },
];
