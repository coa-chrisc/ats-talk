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
    say: "Thank you for the time. Stefan and I spent this fall in an executive course at Carnegie Mellon on leading agentic AI in large organizations. We covered a lot, so for this talk we chose the lessons most relevant to the City. We will explain the course and the four lessons we took from it, then look at how they apply to work already under way here. Finally, we will explain what we recommend doing first. Please interrupt whenever something catches your interest.",
    see: ["The slide is navy, with the City of Austin wordmark in white at top left. The title settles in the middle in white with a short green rule under it, and both supporting lines appear together beneath it. Nothing moves after that."],
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
    show: "We took Carnegie Mellon's course on leading AI agents.",
    say: "Carnegie Mellon's Heinz College runs a certificate program called Leading Enterprise Agentic AI Development. It is designed for executives who decide what AI agents may do inside their organizations. An agent can use tools to carry out a task without a person directing every step. Our classmates were chief data officers and technology leaders from banks, hospitals, and manufacturers. Four half-day modules covered foundations, the data and system architecture agents need, security and trust, and strategy and transformation. In each module, we built and tested an agent ourselves. We specified its task, gave it tools, set its limits, and watched it work. We also tested how it responded to attacks. That practical work helped us understand both what agents can do and what can go wrong.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Four indigo tiles land in a row across the stage, each named in turn: \"Foundations\", \"Data and architecture\", \"Security, risk and trust\", \"Strategy and transformation\". Under the row a caption settles: \"Heinz College\". The four green workbench outlines draw together beneath the tiles, and one caption sits under the four benches: \"Build and test an agent\". The slide ends on the four tiles, the caption and the four benches."],
    story: [
      "Four half-day modules covered foundations, data and architecture, security, and strategy.",
      "In each module, we built and tested an agent ourselves.",
    ],
    steps: [
      { id: "play", show: ["Foundations", "Data and architecture", "Security, risk and trust", "Strategy and transformation", "Heinz College", "Build and test an agent"] },
    ],
  },
  {
    id: "lessons",
    number: "2a",
    part: 1,
    world: "brought",
    name: "Four lessons",
    show: "We came back with four lessons for the City.",
    say: "Here are the four lessons we would ask you to remember. One: give AI only the independence the task requires. Most of what the City wants to do needs less autonomy than a fully independent agent, and some tasks need no AI at all. Two: design the system to enforce the agent's limits. Instructions tell an agent what it should do; permissions and system controls restrict what it can do. Three: train your own staff before buying an AI product. The successful organizations discussed in the course invested in their people first. Four: start with tasks where mistakes have little impact and are easy to fix. Once you can do that work reliably, take on more complex work. We will look at how companies are using AI, what the City is doing now, and what we recommend doing next.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Four tall panels draw across the slide, numbered \"One\", \"Two\", \"Three\" and \"Four\" in large green numerals at their tops, and each takes its name in turn: \"Only the independence the task needs\", \"Design the system to enforce limits\", \"Train your own staff first\", \"Start with tasks where mistakes are easy to fix\". Under the panels a route draws as a line with three stops that light left to right: \"Enterprise now\", \"The City now\", \"What we would do first\". The slide ends on the four named panels over the lit route."],
    story: [
      "Give AI only the independence it needs. Design the system to enforce its limits.",
      "Train staff before buying tools. Start with tasks where mistakes have little impact and are easy to fix.",
    ],
    steps: [
      { id: "play", show: ["One", "Two", "Three", "Four", "Only the independence the task needs", "Design the system to enforce limits", "Train your own staff first", "Start with tasks where mistakes are easy to fix", "Enterprise now", "The City now", "What we would do first"] },
    ],
  },
];
