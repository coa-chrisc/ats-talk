import type { Picture } from "./types";

/** Part 1. Where the City stands: slides 1 to 4a, drawn in the world `stand`. */
export const WHERE_THE_CITY_STANDS: Picture[] = [
  {
    id: "title",
    number: "1",
    part: 1,
    world: "stand",
    name: "Title",
    show: "Agentic AI at the City: what we learned, and what we would do first.",
    say: "Thank you for the time. Stefan and I have spent this fall in Carnegie Mellon's executive course on leading agentic AI development, and we wanted to bring back what is useful to the City rather than everything we heard. We will do that in four parts. First, where the City stands, as plainly as we can put it. Second, three ideas from the course that we think leadership can carry into any meeting. Third, what we would do first, which is deliberately modest. Fourth, what to have ready for the day agents arrive, because they will arrive inside tools we already own. We will close with four decisions. Please interrupt us whenever something catches your interest.",
    see: ["The slide is navy, with the City of Austin wordmark in white at top right. The title settles in the middle in white with a short green rule under it, and the two story lines rise beneath. Nothing moves after that."],
    story: [
      "Stefan Wray and Chris Collins, Austin Technology Services, for the Deputy CIOs and leadership.",
      "From Carnegie Mellon's course on leading enterprise agentic AI development, October 2026.",
    ],
    steps: [
      { id: "play", show: [] },
    ],
  },
  {
    id: "world-moved",
    number: "2",
    part: 1,
    world: "stand",
    name: "The world moved",
    show: "In about 18 months, enterprise AI moved from answering questions to doing work.",
    say: "In 2023 a chatbot answers a question. A copilot drafts, and a person approves. By 2026 an agent is given a goal, picks its own steps, uses tools and does the work. That is the difference between a chatbot and a coworker, and it is why the risk and the value come from the same place. The numbers show how fast enterprise moved. McKinsey finds 40 percent of large organizations scaling agents, up from 27 percent a year earlier. Okta finds 91 percent of organizations use agents and 10 percent have a strategy for them. And Gartner expects over 40 percent of agentic projects canceled by 2027, for unclear value, rising cost and weak controls. The world moved, and most of it moved badly.",
    see: ["A single timeline draws left to right across the slide, from \"2023\" to \"2026\". At the left a speech bubble lands, labeled \"Chatbot\", with the caption \"Answers a question\". Partway along, a second shape lands, labeled \"Copilot\", with \"A person approves\". At the right end a figure with a small tool belt lands, labeled \"Agent\", with \"Does the work\". Below the line three indigo figures rise in turn: \"40 percent\" with the caption \"Scaling agents\", \"91 percent\" with \"Use agents\", and \"10 percent\" with \"Have a strategy for them\". Last, a grey figure lands at the far right: \"Over 40 percent\" with \"Canceled by 2027\". The slide ends on the timeline and the four figures."],
    story: [
      "Four in 10 large organizations now say they are scaling agents, up from 27 percent a year ago.",
      "Most who rushed are stumbling: Gartner expects over 40 percent of agentic projects to be canceled.",
    ],
    steps: [
      { id: "play", show: ["2023", "2026", "Chatbot", "Answers a question", "Copilot", "A person approves", "Agent", "Does the work", "40 percent", "Scaling agents", "91 percent", "Use agents", "10 percent", "Have a strategy for them", "Over 40 percent", "Canceled by 2027"] },
    ],
  },
  {
    id: "position",
    number: "3",
    part: 1,
    world: "stand",
    name: "Behind on operationalizing, not out of the fight",
    show: "The City is behind on operationalizing AI, and it is not starting from zero.",
    say: "We want to be plain about where we are, because the course was plain about it too. The City has no AI strategy, no AI team and no AI budget line. BCG puts AI at 17 percent of enterprise IT budgets now, up from five percent, so we are underinvested by any measure. That is the honest position. It is also not the whole position. The City already holds the first control the course asks for: staff can use only the authorized tools, the AI tools the Chief Information Security Officer has approved, and the system enforces it. The course ranks that kind of control above any instruction or reminder. We are behind on operationalizing AI. We are not out of the fight, and the next slide is why.",
    see: ["A race track draws as a long oval seen from above. A cluster of small indigo runners labeled \"Enterprise\" is well along the track. A single green runner labeled \"The City\" is at the start line, and a grey tag above it reads \"No AI strategy, no AI team and no AI budget line\". Then a solid fence post lands beside the City's runner, labeled \"Authorized tools\", and a deep-green tick appears on it. A small indigo figure at the foot of the slide reads \"17 percent\", with the caption \"Of IT budgets\". The slide ends on the track, the two runners, the grey tag and the ticked post."],
    story: [
      "The City has no AI strategy, no AI team and no AI budget line; AI is now 17 percent of IT budgets.",
      "It already has one real control: staff may use only the AI tools the CISO has authorized.",
    ],
    steps: [
      { id: "play", show: ["Enterprise", "The City", "No AI strategy, no AI team and no AI budget line", "Authorized tools", "17 percent", "Of IT budgets"] },
    ],
  },
  {
    id: "exists",
    number: "4",
    part: 1,
    world: "stand",
    name: "See what already exists",
    show: "The course's first step is to see what already exists, and the City has more than it knows.",
    say: "The course's first move, in its 90-day playbook, is to see what exists before you set policy: everything built, bought, vendor-embedded and employee-made. We would apply that to people and work first. Austin Public Health has 20 applications and a sanctioned sandbox built with the security office. Austin Energy has years of AI work of its own. Other departments have smaller pockets, some of them employee-made and not on anyone's list. A practitioner group already reaches 20 people in nine departments, and 70 to 100 staff came to each Ask About AI session before those paused for the move into One ATS. None of this is yet at one table. That is the gap, and it is a cheap one to close.",
    see: ["An outline map of the City's departments draws as a grid of plain boxes, labeled once \"Departments\". A lantern lights inside one box, labeled \"Austin Public Health\", with a small caption \"20 applications and a sanctioned sandbox\"; a second lights, labeled \"Austin Energy\", with \"Years of AI work\"; then several smaller lanterns light in other boxes with no names. A ring of nine small dots forms around the grid, labeled \"Practitioner group\", with the caption \"20 people in nine departments\". A tag drops under the grid: \"70 to 100 staff came to each Ask About AI\". A grey tag sits apart at the right: \"None of this is yet at one table\". The slide ends on the lit grid, the ring, the two tags and the grey tag."],
    story: [
      "Departments like Austin Public Health and Austin Energy have been building with AI for years.",
      "A practitioner group of 20 spans nine departments, and 70 to 100 staff came to each Ask About AI.",
    ],
    steps: [
      { id: "play", show: ["Departments", "Austin Public Health", "20 applications and a sanctioned sandbox", "Austin Energy", "Years of AI work", "Practitioner group", "20 people in nine departments", "70 to 100 staff came to each Ask About AI", "None of this is yet at one table"] },
    ],
  },
  {
    id: "fleet",
    number: "4a",
    part: 1,
    world: "stand",
    name: "The City already runs agents, in one place",
    show: "Austin Public Health already builds with a fleet of AI agents, and the City is not ready to scale that yet.",
    say: "One pocket deserves its own slide, because it is further along than the course expects. Since late 2025 Austin Public Health has built its applications with a fleet of AI agents: lead agents read the lessons, permissions and tested modules, build in parallel, two AI reviewers check every change, and a person approves before anyone uses it. It runs inside a sandbox built with the security office over years, with Microsoft and Quisitive in the room every week, and Amazon now joining the conversation. In the course's gates it has passed explore, validate and deploy. The City is not ready to scale that yet, and the gates say not to. The work has to continue in that infrastructure, or the momentum and the people who know Azure go with it.",
    see: ["A fenced yard draws in the middle, labeled \"Sandbox\", with a small caption \"Built with the security office\". Inside it, three green agents labeled \"Lead agents\" fill an application outline with blocks, two smaller agents labeled \"Reviewers\" check it, and a person gives it the orange approval mark with the label \"A person approves\". Outside the fence two nameplates settle side by side: \"Microsoft\" and \"Quisitive\". A third, drawn in a dashed outline, lands a little apart: \"Amazon\", with the caption \"Joining the conversation\". To the right a short stair of gates draws: \"Explore\", \"Validate\" and \"Deploy\" light green in turn, and \"Scale\" stays grey with a tag \"Not ready to scale that yet\". A tag at the foot of the fence reads \"Over years\". The slide ends on the yard, the agents at work, the orange mark, the partner nameplates and the stair with its grey top step."],
    story: [
      "Lead agents plan, build and review in a sandbox built with the security office; a person approves.",
      "The work continues with Microsoft and Quisitive, and Amazon is joining the conversation.",
    ],
    steps: [
      { id: "play", show: ["Sandbox", "Built with the security office", "Lead agents", "Reviewers", "A person approves", "Microsoft", "Quisitive", "Amazon", "Joining the conversation", "Explore", "Validate", "Deploy", "Scale", "Not ready to scale that yet", "Over years"] },
    ],
  },
];
