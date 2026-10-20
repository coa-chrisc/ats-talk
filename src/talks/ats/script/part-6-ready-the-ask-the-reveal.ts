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
    say: "Agents will not wait for the City's strategy. Vendors keep adding agent features to products the City already owns, so some will show up inside authorized tools whether or not we are ready. For that day the course gives a playbook we would keep on the shelf. Sort each agent into one of four levels by how much it may do on its own. No-go: work no agent may do on its own, such as moving money, deciding a regulated matter or anything that cannot be undone. Assist only: it can look things up but change nothing. Act with approval: it can act once a named person approves. Act alone within limits: strict limits and a tested off switch. Give every agent a named human owner; the course found that many agents have none. At the City's scale that is a list and a set of owners.",
    see: ["Four bands draw across the slide, each in its own hue: grey \"No-go\", with the caption \"Work no agent may do on its own\"; sky \"Assist only\", with \"It can look things up but change nothing\"; gold \"Act with approval\", with \"It can act once a named person approves\"; and pink \"Act alone within limits\", with \"Strict limits and a tested off switch\". A short list draws beneath with three rows, each a small agent icon, a level, and a nameplate reading \"Owner\". A grey tag at the foot reads \"A list and a set of owners\". The slide ends on the four bands and the short list."],
    story: [
      "Sort each one into four levels by how much it may do on its own, and give each one a named human owner.",
      "At the City's scale that is a list and a set of owners, not a platform.",
    ],
    steps: [
      { id: "play", show: ["No-go", "Work no agent may do on its own", "Assist only", "It can look things up but change nothing", "Act with approval", "It can act once a named person approves", "Act alone within limits", "Strict limits and a tested off switch", "Owner", "A list and a set of owners"] },
    ],
  },
  {
    id: "who-decides",
    number: "25",
    part: 6,
    world: "ready",
    name: "Who decides what",
    show: "Leadership draws the lines AI may never cross. The CISO owns the controls that hold them.",
    say: "The course is careful about who owns which decision. At the City, leadership means the CIO, the CTO, the DCIOs and the City Manager's Office. Leadership draws the lines AI may never cross: what it may never do without a person, in dollars and in kinds of decision. For each system, its DCIO decides how much the AI may do on its own and what needs a person's approval. The CISO owns the controls that enforce it, and my deck in the backup is the working draft of that conversation with the CISO. Decisions flow down, and results and incidents are reported up. For any proposal that reaches your desk, three questions from the course do most of the work: what can it touch, what enforces its limits, and who would know if it went wrong. If a vendor cannot answer them, do not approve the proposal until they can.",
    see: ["Three tiers draw as a short stack. The top tier is labeled \"Leadership\", with the caption \"Draws the lines AI may never cross\". The middle is labeled \"DCIO\", with \"Decides how much each system may do on its own\", and it gets the orange mark of a person deciding. The bottom is labeled \"CISO\", with \"Owns the controls\". Arrows run down the left side labeled \"Decisions flow down\" and up the right side labeled \"Results and incidents are reported up\". To the right, under the heading \"Three questions for any AI proposal\", three cards land in turn: \"What can it touch\", \"What enforces its limits\" and \"Who would know if it went wrong\". The slide ends on the stack, its arrows and the three cards."],
    story: [
      "Leadership here means the CIO, the CTO, the DCIOs and the City Manager's Office.",
      "For each system, its DCIO decides how much the AI may do on its own, and what needs a person's approval.",
    ],
    steps: [
      { id: "play", show: ["Leadership", "Draws the lines AI may never cross", "DCIO", "Decides how much each system may do on its own", "CISO", "Owns the controls", "Decisions flow down", "Results and incidents are reported up", "Three questions for any AI proposal", "What can it touch", "What enforces its limits", "Who would know if it went wrong"] },
    ],
  },
  {
    id: "residents",
    number: "26",
    part: 6,
    world: "ready",
    name: "Used for residents, never on them",
    show: "Used for residents, never on them.",
    say: "One line runs under all of this, and it is where the community's voice from the listening step comes back. AI at the City is used for residents, never on them. It helps City staff serve more people, and serve them in their own language. It never judges a resident, decides a benefit or replaces a person's decision about one. That is the no-go level from two slides ago, work no agent may do on its own, and it is one of the lines leadership draws. The test for any project is whether residents would say the City serves them better, over the long term. If they would not, the City should not build it, however feasible it is, and the listening step is how we would know.",
    see: ["A City staff member sits behind a wide counter, labeled \"City staff\", with a small green AI helper right beside them, labeled \"AI\". A resident stands across the counter, labeled \"Resident\". A low picket fence draws on the floor between the counter and the resident, labeled \"Never judges a resident\". A card labeled \"In their own language\" travels from the helper over the fence and lands in the resident's hands; the staff member gets the orange mark of a person deciding. At the right, under the heading \"The test\", one question settles: \"Would residents say the City serves them better, over the long term?\" The slide ends on the counter scene, the fence, the orange mark and the question."],
    story: [
      "AI helps City staff serve residents. It never judges a resident or replaces a staff member's decision about one.",
      "The test is whether residents would see the City serving them better over the long term.",
    ],
    steps: [
      { id: "play", show: ["City staff", "AI", "Resident", "Never judges a resident", "In their own language", "The test", "Would residents say the City serves them better, over the long term?"] },
    ],
  },
  {
    id: "could-be",
    number: "27",
    part: 6,
    world: "ready",
    name: "Where the City could be",
    show: "Five decisions, each already half done, would put the City with the pack within a year.",
    say: "Five decisions would move the City from where it stands to the tail of the enterprise pack within a year, and each is already half done. Make the consortium and program team official; the people are ready now and could start without waiting for a hire. Sponsor the listening tour; it costs only calendar time, and we would run it. Adopt the four levels; they are drafted with the CISO, and Stefan is doing that now. Keep Austin Public Health's agent work running on the infrastructure it built, with the Azure staff on it; it is already running. Add data tiers and a budget line, with an approved enterprise AI tool for data that cannot yet be connected safely; the authorized-tools rule is tier one. None of this starts from zero. All of it starts from work your own staff already did.",
    see: ["The track from slide 15 returns with the City runner a third of the way around and the pack ahead, labeled \"Enterprise\". A dashed green outline of the runner draws well ahead, at the tail of the pack, labeled \"Within a year\". Along the lane between the solid runner and the dashed one, five green markers land in turn, and as each lands its name and caption rise in a row under the track, joined to the marker by a thin leader line: \"Consortium and program team\" with \"The people are ready now\", \"Listening tour\" with \"Costs only calendar time\", \"Four levels\" with \"Drafted with the CISO\", \"Keep the Azure work running\" with \"Already running\", \"Data tiers and a budget line\" with \"Authorized tools are tier one\". The slide ends on the track with the solid runner, the five markers and their row, and the dashed runner at the pack's tail."],
    story: [
      "Leadership can make the consortium and program team official, sponsor the listening tour, and adopt the levels.",
      "It can keep Austin Public Health's agent work running, and add data tiers and a budget line.",
    ],
    steps: [
      { id: "play", show: ["Enterprise", "Within a year", "Consortium and program team", "The people are ready now", "Listening tour", "Costs only calendar time", "Four levels", "Drafted with the CISO", "Keep the Azure work running", "Already running", "Data tiers and a budget line", "Authorized tools are tier one"] },
    ],
  },
  {
    id: "applied",
    number: "28",
    part: 6,
    world: "ready",
    name: "That was the course, applied",
    show: "The plan you just heard is the four lessons, applied to the City.",
    say: "One more look at the four lessons. Lesson one, the least autonomy that gets the job done: the plan starts with plain tools and work where AI only assists, and the four levels set how much each agent may do on its own. Lesson two, put the rules where AI cannot break them: the sandbox, built before the course, already does, and the course is why that matters. Lesson three, train your own staff first: the consortium and the program team, the three tiers of training, and the Azure staff kept on what they built. Lesson four, start where a mistake is cheap and then take on harder work: the four gates and the two lanes. We built the plan on the four lessons, and on ground the City's own staff had already laid.",
    see: ["The four panels from slide 2a return across the top, numbered \"One\", \"Two\", \"Three\" and \"Four\", with their names: \"The least autonomy that gets the job done\", \"Put the rules where AI cannot break them\", \"Train your own staff first\", \"Start where a mistake is cheap\". Under each, a green line draws down to a tile that lands in turn: \"Plain tools first and the four levels\", \"The sandbox's built-in controls\", \"The consortium and the program team\", \"The gates and the two lanes\". A deep-green tick lands on each panel. The slide ends on the four panels, their four tiles and the four ticks."],
    story: [
      "Lesson one gave us plain tools first and the four levels. Lesson two is why the sandbox's controls matter.",
      "Lesson three gave us the consortium and the program team. Lesson four gave us the gates and the two lanes.",
    ],
    steps: [
      { id: "play", show: ["One", "Two", "Three", "Four", "The least autonomy that gets the job done", "Put the rules where AI cannot break them", "Train your own staff first", "Start where a mistake is cheap", "Plain tools first and the four levels", "The sandbox's built-in controls", "The consortium and the program team", "The gates and the two lanes"] },
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
