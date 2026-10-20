import type { Picture } from "./types";

/** Part 4. Where I fit: slides 22 to 24, drawn in the world `fit`. */
export const WHERE_I_FIT: Picture[] = [
  {
    id: "my-work",
    number: "22",
    part: 4,
    world: "fit",
    name: "What I have been doing",
    show: "Over three years my work has covered data science, building applications, advising executives and teaching.",
    say: "As for me, some weeks I'm doing data science and investigative work, pulling an answer out of messy data for a leader who needs it. Some weeks I'm building applications. A good share of it is advising executives on what AI can do today and what it can't yet. I led the work that built Austin Public Health's system for making software with AI, from our sandbox to the review process. Teaching is how the capability spreads beyond me, so I've taught our staff and shared courses with other governments. I've also represented Austin in national conversations about AI in government. Put together, that's architecture, delivery, strategy and teaching, often in the same week. It's also why the work is hard to fit into one job on today's org chart.",
    see: ["One figure stands in the middle. Five small scenes appear around it one at a time, each with its label: a chart, \"Data science\"; an application window, \"Building applications\"; a conference table, \"Advising executives\"; a classroom, \"Teaching\"; a map of cities, \"National conversations\". A thin line joins each scene to the figure. The slide ends on the figure with all five scenes around it."],
    story: [
      "That work has reached departments across the City and the staff inside them.",
      "I led the way Austin Public Health makes software with AI, and shared it nationally.",
    ],
    steps: [
      { id: "play", show: ["Data science", "Building applications", "Advising executives", "Teaching", "National conversations"] },
    ],
  },
  {
    id: "fit",
    number: "23",
    part: 4,
    world: "fit",
    name: "Where I fit",
    show: "I am now part of One ATS, and I would like to put my experience to work on the City's AI strategy with you.",
    say: "I'm glad to be part of One ATS now, and I'd welcome the chance to work on the City's AI strategy with you, alongside the people already doing this work. The parts I know best are the ones we just walked through: to listen to departments, sort the ideas, build the roadmap, and support the security and governance work with the Information Security Office, Microsoft and Quisitive. Those are the pieces I've done for three years at Austin Public Health, and they are where a City strategy begins. I'd like to put that experience where it helps the City most, and you know better than I do where that is.",
    see: ["The One ATS organization draws as a chart of boxes across the top, labelled \"One ATS\". A new box in a dashed outline draws as part of the chart, joined to it by a line like the others, and one figure steps into it. Four lines reach out from the dashed box to four pieces from Part 3, each with its label: \"Listen\", \"Sort\", \"Roadmap\", \"Security\". The slide ends on the figure inside its dashed new-role outline, joined to the One ATS chart and to the four pieces."],
    story: [
      "For three years I have led AI architecture, delivery and strategy work at Austin Public Health.",
      "I can help build the roadmap and support the security work with the Information Security Office.",
    ],
    steps: [
      { id: "play", show: ["One ATS", "Listen", "Sort", "Roadmap", "Security"] },
    ],
  },
  {
    id: "lets-talk",
    number: "24",
    part: 4,
    world: "fit",
    name: "Let's talk",
    show: "Let's talk.",
    say: "We learned that good ideas are plentiful, and that a few steps help the City choose and deliver the right ones, so it turns good ideas into governed services, again and again. AI readiness can strengthen delivery across ATS and keep the City's system knowledge with its own staff, and all of it is used for residents, never on them. The backup slides follow, for anything you want to look at more closely. So here is my first question for you. What would you most want a City AI strategy to do first?",
    see: ["The close is navy, with the Austin Public Health logo in white. The title and the two story lines settle in the middle in white, and a small line at the foot reads \"Backup slides follow\". Nothing moves after that."],
    story: [
      "I would like to hear what you would most want a City AI strategy to do first.",
      "I would also like to hear where my experience could help most, and what you would need from me.",
    ],
    steps: [
      { id: "play", show: ["Backup slides follow"] },
    ],
  },
];
