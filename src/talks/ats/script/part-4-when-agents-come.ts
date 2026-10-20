import type { Picture } from "./types";

/** Part 4. When agents come, and the ask: slides 16 to 20, drawn in the world `ready`. */
export const WHEN_AGENTS_COME: Picture[] = [
  {
    id: "levels",
    number: "16",
    part: 4,
    world: "ready",
    name: "When agents come, we will be ready",
    show: "When agents come, and they will come inside tools we already own, we will have a playbook on the shelf.",
    say: "Agents will not wait for the City's strategy. Vendors keep adding agent features to products the City already owns, so some will arrive inside authorized tools. For that day the course gives a playbook we would keep on the shelf. Classify each agent into one of four levels: no-go, never without a person, for anything that transacts, decides regulated matters or cannot be undone; assist only, with read-only tools; execute with approval, where a named approver signs off before anything takes effect; and bounded autonomy, with strict limits and a tested stop. Give every agent a named owner, which the course found is often nobody. At the City's scale that is a list and a set of owners, not a platform.",
    see: ["Four bands draw across the slide, each in its own hue: grey \"No-go\", with the caption \"Never without a person\"; sky \"Assist only\", with \"Read-only tools\"; gold \"Execute with approval\", with \"A named approver signs off\"; and pink \"Bounded autonomy\", with \"Strict limits and a tested stop\". A short list draws beneath with three rows, each a small agent icon, a level, and a nameplate reading \"Owner\". A grey tag at the foot reads \"A list and a set of owners\". The slide ends on the four bands and the short list."],
    story: [
      "Classify each one into four levels, from no-go to bounded autonomy, and name a human owner for each.",
      "At the City's scale that is a list and a set of owners, not a platform.",
    ],
    steps: [
      { id: "play", show: ["No-go", "Never without a person", "Assist only", "Read-only tools", "Execute with approval", "A named approver signs off", "Bounded autonomy", "Strict limits and a tested stop", "Owner", "A list and a set of owners"] },
    ],
  },
  {
    id: "who-decides",
    number: "17",
    part: 4,
    world: "ready",
    name: "Who decides what",
    show: "Leadership sets the bright lines, the DCIO decides authority, and the CISO owns the controls.",
    say: "The course is careful about who owns which decision, and we think this is the most reassuring slide in the talk. Leadership sets the bright lines: what AI may never do without a person, in dollars and in kinds of decision. The DCIO decides authority, meaning how much each system may do on its own and what needs approval. The CISO owns the controls that enforce it, with Stefan's deck in the backup as the working draft of that conversation. Authority flows down, evidence flows up. For any proposal that lands on your desk, the course leaves three questions: what can it touch, what enforces its limits, and who would know if it went wrong? If a vendor cannot answer those, that is the answer.",
    see: ["Three tiers draw as a short stack. The top tier is labeled \"Leadership\", with the caption \"Sets the bright lines\". The middle is labeled \"DCIO\", with \"Decides authority\", and it gets the orange mark of a person deciding. The bottom is labeled \"CISO\", with \"Owns the controls\". Arrows run down the left side labeled \"Authority flows down\" and up the right side labeled \"Evidence flows up\". To the right, three cards land in turn: \"What can it touch\", \"What enforces its limits\" and \"Who would know\". The slide ends on the stack, its arrows and the three cards."],
    story: [
      "Three questions for any AI proposal: what can it touch, what enforces its limits, who would know.",
      "The decisions on this side of the table are about authority, not plumbing.",
    ],
    steps: [
      { id: "play", show: ["Leadership", "Sets the bright lines", "DCIO", "Decides authority", "CISO", "Owns the controls", "Authority flows down", "Evidence flows up", "What can it touch", "What enforces its limits", "Who would know"] },
    ],
  },
  {
    id: "residents",
    number: "18",
    part: 4,
    world: "ready",
    name: "Used for residents, never on them",
    show: "Used for residents, never on them.",
    say: "One line runs under all of this, and it is where the community's voice from the listening step comes back. AI at the City is used for residents, never on them. It helps City staff serve more people, and serve them in their own language. It never judges a resident, decides a benefit or replaces a person's decision about one; that is the no-go level, and it is where leadership's bright line belongs. The course would call it the clearest case for a person always in the loop. The test for any project is whether residents would see it as the City serving them better over the long term. If they would not, the City should not build it, however feasible it is.",
    see: ["A City staff member sits at a desk, labeled \"City staff\", with a small green AI helper at their side, labeled \"AI\". Across the counter a resident steps up, labeled \"Resident\". A low fence line draws between the helper and the resident, labeled \"Never judges a resident\". Help still passes over it: a card labeled \"In their own language\" goes across to the resident, while the helper stays on its own side. The staff member gets the orange mark of a person deciding. A plain checklist appears to one side under the heading \"The test\", and each line gets a deep-green tick: \"Serving them better\", \"Over the long term\". The slide ends on the desk, the fence line, the orange mark and the ticked list."],
    story: [
      "AI helps City staff serve residents, and it never judges a resident or replaces a person's decision.",
      "The test is whether residents would see the City serving them better over the long term.",
    ],
    steps: [
      { id: "play", show: ["City staff", "AI", "Resident", "Never judges a resident", "In their own language", "The test", "Serving them better", "Over the long term"] },
    ],
  },
  {
    id: "decisions",
    number: "19",
    part: 4,
    world: "ready",
    name: "Four decisions",
    show: "Four decisions would start this, and none of them needs a budget line yet.",
    say: "We will end with the decisions, and we kept them to four. First, sanction the open call and the AI consortium, so the City's practitioners come to one table with leadership's blessing. Second, sponsor the listening tour: a few weeks of conversations with department leaders, staff and the community that we would run and write up in their words. Third, pick one first use case lane and adopt the four levels now, so the first agent inside an authorized tool has a place to be classified; Stefan would draft the levels with the CISO. Fourth, keep the agent work going in the infrastructure the City built, with its partners, and let the Azure staff keep going on it. None of this needs a budget line yet.",
    see: ["The slide is navy. Four numbered lines settle one at a time in white with green numerals: \"Sanction the open call and the AI consortium\", \"Sponsor the listening tour\", \"Pick one first use case lane and adopt the four levels\", \"Keep the agent work going in the infrastructure\". Under each, a small green nameplate lands: \"We would run\", \"We would run\", \"Stefan would draft the levels with the CISO\", \"The Azure staff keep going\". A grey tag at the foot reads \"None of this needs a budget line yet\". The slide ends on the four lines and their nameplates."],
    story: [
      "Sanction the open call and the AI consortium, and sponsor the listening tour with departments.",
      "Keep the agent work going in the infrastructure the City built, with its Azure staff focused on it.",
    ],
    steps: [
      { id: "play", show: ["Sanction the open call and the AI consortium", "Sponsor the listening tour", "Pick one first use case lane and adopt the four levels", "Keep the agent work going in the infrastructure", "We would run", "Stefan would draft the levels with the CISO", "The Azure staff keep going", "None of this needs a budget line yet"] },
    ],
  },
  {
    id: "lets-talk",
    number: "20",
    part: 4,
    world: "ready",
    name: "Let's talk",
    show: "Let's talk.",
    say: "That is what we brought back. The world moved fast and mostly moved badly, and the organizations that got value did the foundations first: their own people, honest listening, small reversible wins and controls the system enforces. The City is behind on operationalizing AI and ahead on the thing that matters most, which is staff who have already done this work and are waiting to be asked. We would like to hear what you would most want a City AI strategy to do first, and what you would need from us to make these four decisions. Stefan's deck on the security side is in the backup slides, and we are glad to go as deep as you like.",
    see: ["The close is navy, with the City of Austin wordmark in white. The title and the two story lines settle in the middle in white, and a small line at the foot reads \"The backup slides\". Nothing moves after that."],
    story: [
      "We would like to hear what you would most want a City AI strategy to do first.",
      "We would also like to hear what you would need from us to make these four decisions.",
    ],
    steps: [
      { id: "play", show: ["The backup slides"] },
    ],
  },
];
