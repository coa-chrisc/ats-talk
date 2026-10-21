import type { Picture } from "./types";

/** Part 6. Ready, the ask, the reveal: slides 24 to 29, drawn in the world `ready`. */
export const READY_THE_ASK_THE_REVEAL: Picture[] = [
  {
    id: "levels",
    number: "24",
    part: 6,
    world: "ready",
    name: "When agents come",
    show: "Prepare for agents in tools the City already uses.",
    say: "Vendors are adding agent features to products the City already uses. We should decide how to manage those features before they arrive. Assign each agent to one of four levels. No-go means decisions reserved for people, such as determining benefits or deciding regulated matters. Assist only means the agent can retrieve information and prepare material, but cannot change official records or carry out a decision. Act with approval means it may take a specified action after the person responsible approves. Act alone within limits means it may perform permitted actions independently, with defined permissions and a tested way to stop it. Assign someone to oversee each agent. Start with a register showing the agent, its level, its permitted actions, and the person responsible. We do not need a new platform to begin keeping that record.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Four bands draw across the slide, each in its own hue: grey \"No-go\", with the caption \"Decisions reserved for people\"; sky \"Assist only\", with \"Retrieves and drafts; changes no records\"; gold \"Act with approval\", with \"A person approves each action\"; and pink \"Act alone within limits\", with \"Defined limits and a tested way to stop\". A short list appears beneath with three complete rows, each a stationary agent icon, its matching level, and a nameplate reading \"Owner\". A grey tag at the foot reads \"Record who is responsible\". The slide ends on the four bands and the short list."],
    story: [
      "Assign each agent to one of four levels based on what it may do without approval.",
      "Keep a register of agents, their permitted actions, and the person responsible for each.",
    ],
    steps: [
      { id: "play", show: ["No-go", "Decisions reserved for people", "Assist only", "Retrieves and drafts; changes no records", "Act with approval", "A person approves each action", "Act alone within limits", "Defined limits and a tested way to stop", "Owner", "Record who is responsible"] },
    ],
  },
  {
    id: "who-decides",
    number: "25",
    part: 6,
    world: "ready",
    name: "Who decides what",
    show: "Leadership sets the limits. The CISO oversees their enforcement.",
    say: "Leadership sets the limits on AI use. Here, leadership means the CIO, the CTO, the DCIOs, and the City Manager's Office. They determine which decisions remain with people, which actions require approval, and any limits on spending. For each system, its DCIO decides what AI may do independently and what requires a person's approval. The CISO is responsible for the controls that enforce those limits. The backup slides contain the draft controls we are discussing with the CISO. Teams report results and incidents to the people responsible for oversight. For any proposal, ask three questions: what data can it access and what actions can it take; what enforces its limits; and who would know if something went wrong? Ask the vendor to answer those questions before approving the proposal.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Three tiers draw as a short stack. The top tier is labeled \"Leadership\", with the caption \"Sets the limits on AI use\". The middle is labeled \"DCIO\", with \"Decides how much each system may do on its own\", and it gets the orange mark of a person deciding. The bottom is labeled \"CISO\", with \"Owns the controls\". Arrows run down the left side labeled \"Decisions flow down\" and up the right side labeled \"Results and incidents are reported up\". To the right, under the heading \"Three questions for any AI proposal\", three cards land in turn: \"What can it access and do?\", \"What enforces its limits\" and \"Who would know if it went wrong\". The slide ends on the stack, its arrows and the three cards."],
    story: [
      "Leadership means the CIO, the CTO, the DCIOs, and the City Manager's Office.",
      "For each system, its DCIO decides what AI may do independently and what requires approval.",
    ],
    steps: [
      { id: "play", show: ["Leadership", "Sets the limits on AI use", "DCIO", "Decides how much each system may do on its own", "CISO", "Owns the controls", "Decisions flow down", "Results and incidents are reported up", "Three questions for any AI proposal", "What can it access and do?", "What enforces its limits", "Who would know if it went wrong"] },
    ],
  },
  {
    id: "residents",
    number: "26",
    part: 6,
    world: "ready",
    name: "Help staff serve residents",
    show: "Use AI to help staff serve residents.",
    say: "Residents' needs should guide how the City uses AI. AI can help staff serve more people and communicate in residents' own languages. Decisions about residents remain with accountable staff. AI should not determine a resident's eligibility for a benefit or replace the staff member responsible for that decision. That is the distinction behind the no-go level: some decisions are reserved for people. Ask residents whether the changes improve the services they receive over the long term. Their answers should help determine which projects the City pursues. A project being technically possible is not enough reason to build it.",
    see: ["After the title settles, a three-stage explanation unfolds from left to right. A document icon appears with \"AI\" and \"Helps draft and translate\". An arrow leads to a staff member labeled \"City staff\" with \"Review responses and make decisions\"; the orange human-decision mark appears with the staff member. After that stage settles, a second arrow leads to a resident labeled \"Residents\" with \"Receive clear information in their language\". The icons and captions stay in place. Beneath the stages, \"Ask residents\" appears with \"Is the service better?\". After the question settles, both supporting sentences appear together. The slide ends with no further motion."],
    story: [
      "Keep decisions about residents with accountable staff, including decisions about benefits.",
      "Ask residents whether the changes improve the services they receive over the long term.",
    ],
    steps: [
      { id: "play", show: ["AI", "Helps draft and translate", "City staff", "Review responses and make decisions", "Residents", "Receive clear information in their language", "Ask residents", "Is the service better?"] },
    ],
  },
  {
    id: "could-be",
    number: "27",
    part: 6,
    world: "ready",
    name: "Where the City could be",
    show: "Leadership can authorize the next phase of work.",
    say: "We are asking leadership to authorize the next phase of work. First, make the consortium and program team official, with a designated lead and clear staff responsibilities. Second, sponsor the listening tour and make staff time available for meetings and follow-up. Third, review and adopt the four authority levels being drafted with the CISO. Fourth, continue the Azure work with infrastructure support and the appropriate review path. Fifth, approve rules specifying which data each AI tool may use. Sixth, agree a funded scope, a budget, and an accountable sponsor. We are separating the data-access and funding decisions so each can receive a clear answer. The scope and resource amounts still need agreement; this slide does not assume they are already approved.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. At the right, \"Still to establish\" returns with the three dashed plates from slide 11, still empty: \"Citywide AI strategy\", \"Dedicated program team\", and \"AI budget line\". To their left six cards land one after another in two rows of three, in reading order. Each is a small drawing of the slide that introduced the idea and arrives with its request and explanation: the round table, \"Authorize the consortium and team\", with \"Designate a lead and staff responsibilities\"; a table with a speech bubble, \"Sponsor the listening tour\", with \"Make staff time available for meetings and follow-up\"; the stack of four authority levels in their colors, \"Adopt the four authority levels\", with \"Review and approve the draft with the CISO\"; the sandbox fence, \"Continue the Azure work\", with \"Retain infrastructure support and the review path\"; a record with a key, \"Approve data-access rules\", with \"Specify which data each tool may use\"; and a grey ledger row, \"Allocate funding\", with \"Agree the scope, budget, and accountable sponsor\". Then an empty grey dashed ring appears beside each card, waiting for an answer. No line connects the cards, and nothing is filled in. The slide ends on the three empty plates, the six requests and the six empty rings."],
    story: [
      "Authorize coordination and staff time, adopt authority levels, and continue the Azure work.",
      "Approve rules for data access and allocate funding for the agreed scope.",
    ],
    steps: [
      { id: "play", show: ["Still to establish", "Citywide AI strategy", "Dedicated program team", "AI budget line", "Authorize the consortium and team", "Designate a lead and staff responsibilities", "Sponsor the listening tour", "Make staff time available for meetings and follow-up", "Adopt the four authority levels", "Review and approve the draft with the CISO", "Continue the Azure work", "Retain infrastructure support and the review path", "Approve data-access rules", "Specify which data each tool may use", "Allocate funding", "Agree the scope, budget, and accountable sponsor"] },
    ],
  },
  {
    id: "applied",
    number: "28",
    part: 6,
    world: "ready",
    name: "That was the course, applied",
    show: "The four lessons shaped this plan for the City.",
    say: "The four lessons shaped this plan. Give AI only the independence the task requires: choose simple tools where they work and define what each agent may do. Design the system to enforce the agent's limits: use permissions and network restrictions, as the sandbox already does. Train your own staff before buying an AI product: organize the consortium and program team, provide training at each level, and retain the Azure team's expertise. Start with tasks where mistakes have little impact and are easy to fix: deliver manageable projects, review results before expanding, and prepare the skills and infrastructure needed for the next projects. This plan applies the course's lessons to work City staff have already done.",
    see: ["The title settles before the visual sequence begins. The four panels from slide 2a return across the top, numbered \"One\", \"Two\", \"Three\" and \"Four\", with their names: \"Only the independence the task needs\", \"Design the system to enforce limits\", \"Train your own staff first\", \"Start with tasks where mistakes are easy to fix\". Under each, a green line draws down to a tile that lands in turn: \"Simple tools and defined authority\", \"The sandbox's built-in controls\", \"The consortium and the program team\", \"Review results and prepare to expand\". A deep-green tick lands on each panel. The slide ends on the four panels, their four tiles and the four ticks. After the visual sequence finishes, both supporting sentences appear together; nothing moves afterward."],
    story: [
      "Choose only the autonomy needed. Enforce limits through the system.",
      "Develop staff skills. Start with manageable projects and review results before expanding.",
    ],
    steps: [
      { id: "play", show: ["One", "Two", "Three", "Four", "Only the independence the task needs", "Design the system to enforce limits", "Train your own staff first", "Start with tasks where mistakes are easy to fix", "Simple tools and defined authority", "The sandbox's built-in controls", "The consortium and the program team", "Review results and prepare to expand"] },
    ],
  },
  {
    id: "lets-talk",
    number: "29",
    part: 6,
    world: "ready",
    name: "Let's talk",
    show: "Let's talk.",
    say: "Staff across departments have built experience, applications, and infrastructure we can use. A citywide program would connect that work and build on the recognition it has already received. With clear responsibility and funding, we can support the Strategic Plan while improving how teams work, training staff, strengthening security, and involving residents in decisions. What should the City prioritize in its AI strategy? What information do you need from us to make these decisions? Stefan's security presentation is available separately for the discussion.",
    see: ["The close is navy, with the City of Austin wordmark in white. The title and the two story lines settle in the middle in white, and a small line at the foot reads \"Security briefing available separately\". Nothing moves after that."],
    story: [
      "What should the City prioritize in its AI strategy?",
      "What information do you need from us to make these decisions?",
    ],
    steps: [
      { id: "play", show: ["Security briefing available separately"] },
    ],
  },
];
