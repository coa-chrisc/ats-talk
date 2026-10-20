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
    say: "Lesson one is the one we would want every manager to carry around. There is a range of ways to automate work, and it is a ladder. Automation runs on fixed rules. A copilot drafts and a person approves every step. In a workflow the steps are set, with a model helping inside them. An agent chooses its own steps. Each step up adds value sometimes and adds things to govern always. So the course says climb one step at a time, stop as soon as it gets the job done, and ask why not less. The point for leadership is that the City needs the whole range available, so that each job can land on the lowest step that works. And some jobs need no AI at all: a plain tool, built fast with AI's help, is often the right answer.",
    see: ["Four steps rise left to right like a stair, each a block: \"Automation\" with the caption \"Fixed rules\", \"Copilot\" with \"A person approves every step\", \"Workflow\" with \"The steps are set\", and \"Agent\" with \"Chooses its own steps\". A small green figure climbs onto the first step and stops; a deep-green tick appears over it with the label \"Gets the job done\". A grey arrow along the top of the stair reads \"More to govern\". Below the stair a small tool outline fills solid, labeled \"Plain tool\", with the caption \"No AI at all\". The slide ends on the stair, the figure on the first step, the grey arrow and the plain tool."],
    story: [
      "Keep the whole range on hand: automation, copilot, workflow, agent. Each step up is more to govern.",
      "Some jobs need no AI at all. A plain tool, built fast with AI's help, is often the right answer.",
    ],
    steps: [
      { id: "play", show: ["Automation", "Fixed rules", "Copilot", "A person approves every step", "Workflow", "The steps are set", "Agent", "Chooses its own steps", "Gets the job done", "More to govern", "Plain tool", "No AI at all"] },
    ],
  },
  {
    id: "enforce",
    number: "8",
    part: 3,
    world: "ideas",
    name: "Lesson two: make the system enforce the rules",
    show: "Lesson two. Make the system enforce the rules, not the model.",
    say: "Lesson two is where the course is firmest. A rule typed into a prompt can be talked around; the course cites adaptive attacks beating tested defenses most of the time. A permission, a network limit or a sandbox holds whether or not the model cooperates, because the system blocks it. From strongest to weakest: the system blocks it, approval before it takes effect, a rule typed into a prompt, and a person checks afterward. That last one only counts when the person has the time, the information and the authority to stop it. The second half of the lesson is proportion. Where AI only assists, light controls, approved tools and data and a quick review, so the work keeps moving. Heavy controls, with named approvers, go where a mistake is costly or hard to undo.",
    see: ["Four blocks descend left to right like a stair going down: \"The system blocks it\", \"Approval before it takes effect\", \"A rule typed into a prompt\", and \"A person checks afterward\". A green arrow at the left reads \"Strongest\". Below the stair a dial draws with three settings: \"AI only assists\" with the caption \"Light controls\", \"Approval\" with \"Named approvers\", and \"Costly or hard to undo\" with \"Heavy controls\". The needle rests on the first setting. The slide ends on the descending stair and the dial."],
    story: [
      "A rule typed into a prompt is a request. A permission, a network limit or a sandbox is a control.",
      "Match the controls to the risk: light where AI only assists, heavy where a mistake is hard to undo.",
    ],
    steps: [
      { id: "play", show: ["The system blocks it", "Approval before it takes effect", "A rule typed into a prompt", "A person checks afterward", "Strongest", "AI only assists", "Light controls", "Approval", "Named approvers", "Costly or hard to undo", "Heavy controls"] },
    ],
  },
  {
    id: "people",
    number: "9",
    part: 3,
    world: "ideas",
    name: "Lesson three: train your own people first",
    show: "Lesson three. Train your own people before you buy a platform.",
    say: "Lesson three answers the question every department asks, which is whether to wait for a vendor. BCG read 4,800 earnings calls and found that six percent of companies lead on AI and outperform peers by 9.3 points. What sets them apart is talent: fluency across the whole workforce plus a small expert team, with the technology mostly the same as everyone else's. BNY runs more than 130 digital employees today, each with a human manager, and the lesson the course drew is that it trained its workforce first and granted autonomy afterward. The City's knowledge of its own services lives in City staff. That is the asset the boost spending needs, and nobody can sell it to us.",
    see: ["A balance draws on the left with a post, a beam and two pans. The left pan holds an indigo box with a vendor tag, labeled \"Technology\"; the right pan holds three green people, labeled \"Talent\". The beam tips toward Talent. In the middle a large indigo figure lands: \"Six percent\", with the caption \"Lead on AI and outperform peers by 9.3 points\". At the right a plaque settles, labeled \"BNY\", with \"Trained its workforce first\". The slide ends on the tipped balance, the figure and the plaque."],
    story: [
      "BCG: six percent of companies lead on AI, and what sets them apart is talent, not technology.",
      "BNY runs 130 digital employees today. It trained its workforce before it gave any of them autonomy.",
    ],
    steps: [
      { id: "play", show: ["Technology", "Talent", "Six percent", "Lead on AI and outperform peers by 9.3 points", "BNY", "Trained its workforce first"] },
    ],
  },
  {
    id: "earn",
    number: "10",
    part: 3,
    world: "ideas",
    name: "Lesson four: start small and earn each next step",
    show: "Lesson four. Start where mistakes are small, and earn each next step with evidence.",
    say: "Lesson four is the course's answer to pilot purgatory, where everything is a proof of concept and nothing ships. Every project passes four gates, explore, validate, deploy and scale, and it moves up only when the evidence from the last gate says it should. The course also gives six tests for choosing the first projects: frequent decisions, measurable impact, friction in the current process, ready data, rules that can be written down, and contained risk, meaning a mistake can be undone. Most first picks score well on all six, and most of them are work where AI only assists. Those are the four lessons. The rest of the talk is where the City stands against the four, and it is a better picture than you might think.",
    see: ["A stair of four gates rises left to right, each a step with a small gate drawn on it: \"Explore\", \"Validate\", \"Deploy\", \"Scale\". A small green project box climbs onto the first step, and a deep-green tick lands beside it with the caption \"Evidence\". The box climbs to the second step and a second tick lands; the third step stays empty. Beside the stair a checklist draws with six lines, each taking a deep-green tick in turn: \"Frequent decisions\", \"Measurable impact\", \"Friction\", \"Ready data\", \"Rules that can be written\", \"Contained risk\". A short line at the foot reads \"Where the City stands against the four\". The slide ends on the stair with the box on its second step, the checklist and the foot line."],
    story: [
      "Four gates: explore, validate, deploy, scale. A project moves up only when the evidence says so.",
      "Six tests pick the first projects, from how often a decision recurs to how easy a mistake is to fix.",
    ],
    steps: [
      { id: "play", show: ["Explore", "Validate", "Deploy", "Scale", "Evidence", "Frequent decisions", "Measurable impact", "Friction", "Ready data", "Rules that can be written", "Contained risk", "Where the City stands against the four"] },
    ],
  },
];
