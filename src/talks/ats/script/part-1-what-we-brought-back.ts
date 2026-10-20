import type { Picture } from "./types";

/** Part 1. What we brought back: slides 1 to 2, drawn in the world `brought`. */
export const WHAT_WE_BROUGHT_BACK: Picture[] = [
  {
    id: "title",
    number: "1",
    part: 1,
    world: "brought",
    name: "Title",
    show: "Agentic AI at the City: what we learned, and what we would do first.",
    say: "Thank you for the time. Stefan and I spent this fall in Carnegie Mellon's executive course on leading agentic AI development, with chief data officers and technology leaders from banks, manufacturers and hospitals. We came back with more than we can use, so we picked what applies to the City and built this talk around it. We will name four ideas from the course up front and teach each one briefly. Then we will put the City next to them, which turns out to be a better picture than most people in this building expect. Then we will say what we would do first. Please interrupt us whenever something catches your interest.",
    see: ["The slide is navy, with the City of Austin wordmark in white at top left. The title settles in the middle in white with a short green rule under it, and the two story lines rise beneath. Nothing moves after that."],
    story: [
      "Stefan Wray and Chris Collins, Austin Technology Services, for the Deputy CIOs and leadership.",
      "From Carnegie Mellon's course on leading enterprise agentic AI development, October 2026.",
    ],
    steps: [
      { id: "play", show: [] },
    ],
  },
  {
    id: "four-ideas",
    number: "2",
    part: 1,
    world: "brought",
    name: "Four ideas from the course",
    show: "We brought back four ideas. The rest of this talk is those four applied to the City.",
    say: "Four ideas. One, use the least autonomy that does the job: most of what the City wants from AI needs far less independence than the word agent suggests. Two, enforce rules in the system and scale the controls to the risk, because a rule a model is asked to follow is a request, and a rule the system enforces is a control. Three, build people before platforms: the organizations getting value trained their own staff first. Four, start where mistakes are small and earn each next step with evidence. That can sound like a lot. We will take them one at a time, in three stops: enterprise now, the City now, and what we would do first.",
    see: ["Four tall panels draw across the slide, numbered \"One\", \"Two\", \"Three\" and \"Four\" in large green numerals at their tops, and each takes its name in turn: \"Least autonomy that does the job\", \"Rules the system enforces, scaled to risk\", \"People before platforms\", \"Start small and earn the next step\". Under the panels a route draws as a line with three stops that light left to right: \"Enterprise now\", \"The City now\", \"What we would do first\". The slide ends on the four named panels over the lit route."],
    story: [
      "Least autonomy that does the job. Rules the system enforces, scaled to risk.",
      "People before platforms. Start small and earn the next step.",
    ],
    steps: [
      { id: "play", show: ["One", "Two", "Three", "Four", "Least autonomy that does the job", "Rules the system enforces, scaled to risk", "People before platforms", "Start small and earn the next step", "Enterprise now", "The City now", "What we would do first"] },
    ],
  },
];
