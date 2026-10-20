import type { Picture } from "./types";

/** Part 1. What we brought back: slides 1 to 2a, drawn in the world `brought`. */
export const WHAT_WE_BROUGHT_BACK: Picture[] = [
  {
    id: "title",
    number: "1",
    part: 1,
    world: "brought",
    name: "Title",
    show: "Agentic AI at the City: what we learned at Carnegie Mellon, and what we would do first.",
    say: "Thank you for the time. Stefan and I spent this fall in an executive course at Carnegie Mellon on leading agentic AI in large organizations. We came back with more than we can use, so we picked out what applies to the City and built this talk around it. We will start with what the course was and the four lessons we took from it. Then we will put the City next to those four lessons, and the picture is better than most people in this building expect. Then we will tell you what we would do first. Please interrupt whenever something catches your interest.",
    see: ["The slide is navy, with the City of Austin wordmark in white at top left. The title settles in the middle in white with a short green rule under it, and the two story lines rise beneath. Nothing moves after that."],
    story: [
      "Stefan Wray and Chris Collins, Austin Technology Services.",
      "For the Deputy CIOs and leadership, October 2026.",
    ],
    steps: [
      { id: "play", show: [] },
    ],
  },
  {
    id: "course",
    number: "2",
    part: 1,
    world: "brought",
    name: "The course",
    show: "This fall we took Carnegie Mellon's executive course on leading agentic AI.",
    say: "First, what the course was. Carnegie Mellon's Heinz College runs a certificate program called Leading Enterprise Agentic AI Development. It is written for executives who have to decide what AI agents may do inside their organizations, rather than for the engineers who build them. Our classmates were chief data officers and technology leaders from banks, hospitals and manufacturers. Four half-day modules covered the foundations, the data and architecture underneath, security, risk and trust, and strategy and transformation. What made it worth the time is that each module ended with a build of our own. We each specified an agent, gave it tools, set its limits, watched it work, and then watched it get attacked. You come out knowing what an agent is because you ran one, and knowing what goes wrong because you saw it happen.",
    see: ["Four indigo tiles land in a row across the stage, each named in turn: \"Foundations\", \"Data and architecture\", \"Security, risk and trust\", \"Strategy and transformation\". Under the row a caption settles: \"Heinz College\". A green workbench outline draws beneath each tile in turn, and one caption sits under the four benches: \"A build of our own\". The slide ends on the four tiles, the caption and the four benches."],
    story: [
      "Four half-day modules at Heinz College: foundations, data and architecture, security, and strategy.",
      "Each module ended with a build of our own, so we learned what an agent is by running one.",
    ],
    steps: [
      { id: "play", show: ["Foundations", "Data and architecture", "Security, risk and trust", "Strategy and transformation", "Heinz College", "A build of our own"] },
    ],
  },
  {
    id: "lessons",
    number: "2a",
    part: 1,
    world: "brought",
    name: "Four lessons",
    show: "We came back with four lessons for the City.",
    say: "Here are the four lessons we would ask you to remember. One: use the least autonomy that gets the job done. Most of what the City wants from AI needs far less independence than the word agent suggests, and some of it needs no AI at all. Two: build the rules into the system, where the AI cannot break them. If you tell an AI a rule, it can be talked out of it. If the system blocks the action, it cannot. Three: train your own people first, before you buy a platform. Every organization the course held up as a success did that. Four: start where a mistake costs little, and when you have command of that use case, take on a more complex one. We will spend a minute or two on each. Then we will use them at three stops: enterprise now, the City now, and what we would do first.",
    see: ["Four tall panels draw across the slide, numbered \"One\", \"Two\", \"Three\" and \"Four\" in large green numerals at their tops, and each takes its name in turn: \"The least autonomy that gets the job done\", \"Build the rules into the system\", \"Train your own people first\", \"Start where a mistake costs little\". Under the panels a route draws as a line with three stops that light left to right: \"Enterprise now\", \"The City now\", \"What we would do first\". The slide ends on the four named panels over the lit route."],
    story: [
      "Use the least autonomy that gets the job done. Build the rules into the system, where the AI cannot break them.",
      "Train your own people before you buy a platform. Start where a mistake costs little, then take on harder work.",
    ],
    steps: [
      { id: "play", show: ["One", "Two", "Three", "Four", "The least autonomy that gets the job done", "Build the rules into the system", "Train your own people first", "Start where a mistake costs little", "Enterprise now", "The City now", "What we would do first"] },
    ],
  },
];
