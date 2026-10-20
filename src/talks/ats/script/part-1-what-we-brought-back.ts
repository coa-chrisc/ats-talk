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
    say: "Thank you for the time. Stefan and I spent this fall in an executive course at Carnegie Mellon on leading agentic AI in large organizations, alongside chief data officers and technology leaders from banks, manufacturers and hospitals. We came back with more than we can use, so we picked what applies to the City and built this talk around it. We will tell you what the course was, then the four things we took from it. Then we will put the City next to those four, which turns out to be a better picture than most people in this building expect. Then we will say what we would do first. Please interrupt us whenever something catches your interest.",
    see: ["The slide is navy, with the City of Austin wordmark in white at top left. The title settles in the middle in white with a short green rule under it, and the two story lines rise beneath. Nothing moves after that."],
    story: [
      "Stefan Wray and Chris Collins, Austin Technology Services, for the Deputy CIOs and leadership.",
      "October 2026.",
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
    show: "Carnegie Mellon's course for executives who have to decide what AI agents may do.",
    say: "First, what the course was. Carnegie Mellon's Heinz College runs a certificate program called Leading Enterprise Agentic AI Development. It is built for executives who have to decide what AI agents may do inside their organizations, not for engineers. There were four half-day modules: foundations, data and architecture, security, risk and trust, and strategy and transformation. What made it worth the time is that every module ended with a build you do yourself. We each specified an agent, gave it tools, set its limits and watched it work, and then watched it get attacked. You come out knowing what an agent is because you ran one, and knowing what goes wrong because you saw it. That is the experience we are trying to pass on in the next half hour.",
    see: ["Four indigo tiles land in a row across the stage, numbered along the top and each named in turn: \"Foundations\", \"Data and architecture\", \"Security, risk and trust\", \"Strategy and transformation\". Under the row a caption settles: \"Heinz College\". A green workbench outline draws beneath each tile in turn, and one caption sits under the four benches: \"A build you do yourself\". The slide ends on the four tiles, the caption and the four benches."],
    story: [
      "Four half-day modules at Heinz College: foundations, data and architecture, security, and strategy.",
      "Every module ends with a build you do yourself, so you learn what an agent is by running one.",
    ],
    steps: [
      { id: "play", show: ["Foundations", "Data and architecture", "Security, risk and trust", "Strategy and transformation", "Heinz College", "A build you do yourself"] },
    ],
  },
  {
    id: "lessons",
    number: "2a",
    part: 1,
    world: "brought",
    name: "Four lessons",
    show: "We boiled it down to four lessons for the City.",
    say: "Here are the four lessons. One, use the least autonomy that gets the job done. Most of what the City wants from AI needs far less independence than the word agent suggests, and some of it needs no AI at all. Two, make the system enforce the rules, not the model. A rule you type into a prompt is a request. A permission the system enforces is a control. Three, train your own people first, before you buy a platform. The organizations getting value from AI did exactly that. Four, start small, earn each next step with evidence. We will teach each one in a minute or two. Then we will use them in three stops: enterprise now, the City now, and what we would do first.",
    see: ["Four tall panels draw across the slide, numbered \"One\", \"Two\", \"Three\" and \"Four\" in large green numerals at their tops, and each takes its name in turn: \"The least autonomy that gets the job done\", \"Make the system enforce the rules\", \"Train your own people first\", \"Start small, earn each next step\". Under the panels a route draws as a line with three stops that light left to right: \"Enterprise now\", \"The City now\", \"What we would do first\". The slide ends on the four named panels over the lit route."],
    story: [
      "Use the least autonomy that gets the job done. Make the system enforce the rules, not the model.",
      "Train your own people before you buy a platform. Start small, and earn each next step with evidence.",
    ],
    steps: [
      { id: "play", show: ["One", "Two", "Three", "Four", "The least autonomy that gets the job done", "Make the system enforce the rules", "Train your own people first", "Start small, earn each next step", "Enterprise now", "The City now", "What we would do first"] },
    ],
  },
];
