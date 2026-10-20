import type { Picture } from "./types";

/** Part 3. The four ideas: slides 7 to 10, drawn in the world `ideas`. */
export const THE_FOUR_IDEAS: Picture[] = [
  {
    id: "ladder",
    number: "7",
    part: 3,
    world: "ideas",
    name: "One: use the least autonomy that does the job",
    show: "Idea one: use the least autonomy that does the job. Stop at the first rung that works.",
    say: "Idea one is the one we would want every manager to carry. There is a ladder. Automation runs on fixed rules. A copilot drafts and a person approves every step. In a workflow the steps are set, with a model helping inside them. An agent chooses its own steps. Each rung up adds value sometimes and adds things to govern always, so the course's test is to climb one rung at a time, stop at the first rung that works, and ask why not less. Its first question is whether fixed rules can do the whole job, and often they can. Many of the City's good ideas need a plain tool, built quickly with AI help, with no AI inside at all.",
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
    id: "enforce",
    number: "8",
    part: 3,
    world: "ideas",
    name: "Two: enforce rules in the system, scaled to risk",
    show: "Idea two: a rule the system enforces holds. The controls should fit the risk.",
    say: "Idea two is where the course is firmest. A rule told to a model in a prompt can be talked around; the course cites adaptive attacks beating tested defenses most of the time. A permission, a network limit, a sandbox, holds whether or not the model cooperates, because the system enforces it. Approval before effect sits between the two. A person checks last, and that counts only when the person has the time, the information and the authority to stop it. The second half is proportion. Assist-only work gets light controls, approved tools and data and a quick review, so it keeps moving. Heavy controls, with named approvers, go where a mistake would be costly or hard to undo.",
    see: ["Four blocks descend left to right like a stair going down: \"The system enforces it\", \"Approval before effect\", \"A rule told to a model\", and \"A person checks\". A green arrow at the left reads \"Strongest\". Below the stair a dial draws with three settings: \"Assist-only work\" with the caption \"Light controls\", \"Approval\" with \"Named approvers\", and \"Costly or hard to undo\" with \"Heavy controls\". The needle rests on the first setting. The slide ends on the descending stair and the dial."],
    story: [
      "Strongest first: system enforced, approval before effect, a rule told to a model, a person checks.",
      "Light controls for assist-only work; heavy controls where a mistake would be costly or hard to undo.",
    ],
    steps: [
      { id: "play", show: ["The system enforces it", "Approval before effect", "A rule told to a model", "A person checks", "Strongest", "Assist-only work", "Light controls", "Approval", "Named approvers", "Costly or hard to undo", "Heavy controls"] },
    ],
  },
  {
    id: "people",
    number: "9",
    part: 3,
    world: "ideas",
    name: "Three: build people before platforms",
    show: "Idea three: the organizations getting value from AI trained their own people first.",
    say: "Idea three answers the question every department asks, which is whether to wait for a vendor. BCG read 4,800 earnings calls and found that six percent of companies lead on AI and outperform peers by 9.3 points. Their greatest differentiator was talent: fluency across the whole workforce plus a small expert team, with the technology mostly the same as everyone else's. BNY runs more than 130 digital employees today, each with a human manager, and the lesson the course drew is that it trained its people first and granted autonomy afterward. The City's knowledge of its own services lives in City staff. That is the asset the boost spending needs.",
    see: ["A balance draws on the left with a post, a beam and two pans. The left pan holds an indigo box with a vendor tag, labeled \"Technology\"; the right pan holds three green people, labeled \"Talent\". The beam tips toward Talent. In the middle a large indigo figure lands: \"Six percent\", with the caption \"Lead on AI and outperform peers by 9.3 points\". At the right a plaque settles, labeled \"BNY\", with \"Trained its workforce first\". The slide ends on the tipped balance, the figure and the plaque."],
    story: [
      "BCG: six percent of companies lead on AI, and their edge is talent rather than technology.",
      "BNY runs 130 digital employees today. It trained its workforce first, before granting any autonomy.",
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
    name: "Four: start small and earn the next step",
    show: "Idea four: start where mistakes are small. Earn each next step with evidence.",
    say: "Idea four is the course's answer to pilot purgatory, where everything is a proof of concept and nothing ships. Every project passes four gates: explore, validate, deploy and scale, and it advances only when the evidence from the last gate says it should. The course also gives six tests for choosing the first projects: frequent decisions, measurable impact, friction in the current process, ready data, rules that can be written down, and contained risk, meaning a mistake is recoverable. Most first picks score well on all six and are assist-only work. Those are the four ideas. The rest of the talk is where the City stands against the four.",
    see: ["A stair of four gates rises left to right, each a step with a small gate drawn on it: \"Explore\", \"Validate\", \"Deploy\", \"Scale\". A small green project box climbs onto the first step, and a deep-green tick lands beside it with the caption \"Evidence\". The box climbs to the second step and a second tick lands; the third step stays empty. Beside the stair a checklist draws with six lines, each taking a deep-green tick in turn: \"Frequent decisions\", \"Measurable impact\", \"Friction\", \"Ready data\", \"Rules that can be written\", \"Contained risk\". A short line at the foot reads \"Where the City stands against the four\". The slide ends on the stair with the box on its second step, the checklist and the foot line."],
    story: [
      "Four gates, explore, validate, deploy, scale, and a project advances only when the evidence says so.",
      "Six tests pick the first projects, from decision frequency to whether a mistake can be undone.",
    ],
    steps: [
      { id: "play", show: ["Explore", "Validate", "Deploy", "Scale", "Evidence", "Frequent decisions", "Measurable impact", "Friction", "Ready data", "Rules that can be written", "Contained risk", "Where the City stands against the four"] },
    ],
  },
];
