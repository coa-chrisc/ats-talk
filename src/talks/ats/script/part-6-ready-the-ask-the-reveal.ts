import type { Picture } from "./types";

/** Part 6. Ready, the ask, the reveal: slides 24 to 29, drawn in the world `ready`. */
export const READY_THE_ASK_THE_REVEAL: Picture[] = [
  {
    id: "levels",
    number: "24",
    part: 6,
    world: "ready",
    name: "When agents come",
    show: "Agents will show up inside tools we already own. We should have a playbook ready for that day.",
    say: "Agents will not wait for the City's strategy. Vendors keep adding agent features to products the City already owns, so some will show up inside authorized tools whether or not we are ready. For that day the course gives a playbook we would keep on the shelf. Sort each agent into one of four levels. No-go, never without a person, for anything that transacts, decides regulated matters or cannot be undone. Assist only, with read-only tools. Execute with approval, where a named approver signs off before anything takes effect. And bounded autonomy, meaning it may act on its own inside strict limits and a tested off switch. Give every agent a named human owner, which the course found is more often nobody than you would think. At the City's scale that is a list and a set of owners.",
    see: ["Four bands draw across the slide, each in its own hue: grey \"No-go\", with the caption \"Never without a person\"; sky \"Assist only\", with \"Read-only tools\"; gold \"Execute with approval\", with \"A named approver signs off\"; and pink \"Bounded autonomy\", with \"Strict limits and a tested off switch\". A short list draws beneath with three rows, each a small agent icon, a level, and a nameplate reading \"Owner\". A grey tag at the foot reads \"A list and a set of owners\". The slide ends on the four bands and the short list."],
    story: [
      "Sort each one into four levels, from no-go to acting alone within strict limits, and give it a human owner.",
      "At the City's scale that is a list and a set of owners, not a platform.",
    ],
    steps: [
      { id: "play", show: ["No-go", "Never without a person", "Assist only", "Read-only tools", "Execute with approval", "A named approver signs off", "Bounded autonomy", "Strict limits and a tested off switch", "Owner", "A list and a set of owners"] },
    ],
  },
  {
    id: "who-decides",
    number: "25",
    part: 6,
    world: "ready",
    name: "Who decides what",
    show: "Leadership sets the bright lines. The DCIO decides authority. The CISO owns the controls.",
    say: "The course is careful about who owns which decision. Leadership sets the bright lines: what AI may never do without a person, in dollars and in kinds of decision. The DCIO decides authority, meaning how much each system may do on its own and what needs approval. The CISO owns the controls that enforce it, and Stefan's deck in the backup is the working draft of that conversation with him. Authority flows down and evidence flows up. For any proposal that reaches your desk, three questions from the course do most of the work: what can it touch, what enforces its limits, and who would know if it went wrong. If a vendor cannot answer those three questions, that tells you what you need to know.",
    see: ["Three tiers draw as a short stack. The top tier is labeled \"Leadership\", with the caption \"Sets the bright lines\". The middle is labeled \"DCIO\", with \"Decides authority\", and it gets the orange mark of a person deciding. The bottom is labeled \"CISO\", with \"Owns the controls\". Arrows run down the left side labeled \"Authority flows down\" and up the right side labeled \"Evidence flows up\". To the right, three cards land in turn: \"What can it touch\", \"What enforces its limits\" and \"Who would know\". The slide ends on the stack, its arrows and the three cards."],
    story: [
      "Three questions for any AI proposal: what can it touch, what enforces its limits, who would know.",
      "The decisions on this side of the table are about authority.",
    ],
    steps: [
      { id: "play", show: ["Leadership", "Sets the bright lines", "DCIO", "Decides authority", "CISO", "Owns the controls", "Authority flows down", "Evidence flows up", "What can it touch", "What enforces its limits", "Who would know"] },
    ],
  },
  {
    id: "residents",
    number: "26",
    part: 6,
    world: "ready",
    name: "Used for residents, never on them",
    show: "Used for residents, never on them.",
    say: "One line runs under all of this, and it is where the community's voice from the listening step comes back. AI at the City is used for residents, never on them. It helps City staff serve more people, and serve them in their own language. It never judges a resident, decides a benefit or replaces a person's decision about one. That is the no-go level from two slides ago, and it is where leadership's bright line belongs. The test for any project is whether residents would see it as the City serving them better over the long term. If they would not, the City should not build it, however feasible it is, and the listening step is how we would know.",
    see: ["A City staff member sits behind a wide counter, labeled \"City staff\", with a small green AI helper right beside them, labeled \"AI\". A resident stands across the counter, labeled \"Resident\". A low picket fence draws on the floor between the counter and the resident, labeled \"Never judges a resident\". A card labeled \"In their own language\" travels from the helper over the fence and lands in the resident's hands; the staff member gets the orange mark of a person deciding. At the right, under the heading \"The test\", two lines take deep-green ticks: \"Serving them better\", \"Over the long term\". The slide ends on the counter scene, the fence, the orange mark and the ticked test."],
    story: [
      "AI helps City staff serve residents. It never judges a resident or replaces a person's decision.",
      "The test is whether residents would see the City serving them better over the long term.",
    ],
    steps: [
      { id: "play", show: ["City staff", "AI", "Resident", "Never judges a resident", "In their own language", "The test", "Serving them better", "Over the long term"] },
    ],
  },
  {
    id: "could-be",
    number: "27",
    part: 6,
    world: "ready",
    name: "Where the City could be",
    show: "Five decisions, each already half done, would put the City with the pack within a year.",
    say: "Five decisions would move the City from where it stands to the tail of the enterprise pack within a year, and each is already half done. Sanction the consortium and the program team; the group exists informally today and the leaders are already in it. Sponsor the listening tour; it costs calendar time, and we would run it. Adopt the four levels; they are drafted with the CISO, and Stefan is doing that now. Keep the agent work going on the infrastructure the City built, with the Azure staff on it; it is already running. Add policy tiers and a budget line, with a sanctioned enterprise tool for data that is not ready; the first tier is in place. None of this starts from zero. All of it starts from work your own staff already did.",
    see: ["The track from slide 15 returns with the City runner a third of the way around and the pack ahead, labeled \"Enterprise\". A dashed green outline of the runner draws well ahead, at the tail of the pack, labeled \"Within a year\". Along the lane between the solid runner and the dashed one, five green markers land in turn, and as each lands its name and caption rise in a row under the track, joined to the marker by a thin leader line: \"The consortium and the program team\" with \"Exists informally today\", \"Listening tour\" with \"Calendar time\", \"Four levels\" with \"Drafted with the CISO\", \"The infrastructure\" with \"Already running\", \"Policy tiers and a budget line\" with \"The first tier is in place\". The slide ends on the track with the solid runner, the five markers and their row, and the dashed runner at the pack's tail."],
    story: [
      "Sanction the consortium and the program team. Sponsor the listening tour. Adopt the four levels.",
      "Keep the agent work going on the infrastructure the City built. Add policy tiers and a budget line.",
    ],
    steps: [
      { id: "play", show: ["Enterprise", "Within a year", "The consortium and the program team", "Exists informally today", "Listening tour", "Calendar time", "Four levels", "Drafted with the CISO", "The infrastructure", "Already running", "Policy tiers and a budget line", "The first tier is in place"] },
    ],
  },
  {
    id: "applied",
    number: "28",
    part: 6,
    world: "ready",
    name: "That was the course, applied",
    show: "The plan you just heard is the four lessons, applied to the City.",
    say: "One more look at the four lessons. Lesson one, the least autonomy that gets the job done: the plan starts with plain tools first and work where AI only assists, and climbs only when the evidence says so. Lesson two, build the rules into the system: the sandbox already does, and the four levels scale them to the risk. Lesson three, train your own people first: the consortium and the program team, the three tiers of training, and the Azure staff kept on what they built. Lesson four, start small, earn each next step: the four gates and the two lanes. We did not add the course to the plan afterward. We built the plan from it, and the City's own staff had already laid most of the ground.",
    see: ["The four panels from slide 2a return across the top, numbered \"One\", \"Two\", \"Three\" and \"Four\", with their names: \"The least autonomy that gets the job done\", \"Build the rules into the system\", \"Train your own people first\", \"Start small, earn each next step\". Under each, a green line draws down to a tile that lands in turn: \"Plain tools first\", \"The sandbox and the four levels\", \"The consortium and the program team\", \"The gates and the two lanes\". A deep-green tick lands on each panel. The slide ends on the four panels, their four tiles and the four ticks."],
    story: [
      "Least autonomy: plain tools first. Rules built into the system: the sandbox and the four levels.",
      "Your own people: the consortium and program team. Earn the next step: the gates and the two lanes.",
    ],
    steps: [
      { id: "play", show: ["One", "Two", "Three", "Four", "The least autonomy that gets the job done", "Build the rules into the system", "Train your own people first", "Start small, earn each next step", "Plain tools first", "The sandbox and the four levels", "The consortium and the program team", "The gates and the two lanes"] },
    ],
  },
  {
    id: "lets-talk",
    number: "29",
    part: 6,
    world: "ready",
    name: "Let's talk",
    show: "Let's talk.",
    say: "That is what we brought back. The City is further along than its org chart shows, because people across departments did the work before anyone asked, and the infrastructure they built already meets the standard the course teaches. Connecting those pieces is the decision in front of you, and a program with a national reputation already attached comes with it. With that and a budget line to match, the City can deliver on the strategic plan while it shores up practice, training and security, with the community's voice in the room. We would like to hear what you would most want a City AI strategy to do first, and what you would need from us to make these five decisions. Stefan's security deck is in the backup slides.",
    see: ["The close is navy, with the City of Austin wordmark in white. The title and the two story lines settle in the middle in white, and a small line at the foot reads \"Backup slides\". Nothing moves after that."],
    story: [
      "We would like to hear what you would most want a City AI strategy to do first.",
      "We would also like to hear what you would need from us to make these five decisions.",
    ],
    steps: [
      { id: "play", show: ["Backup slides"] },
    ],
  },
];
