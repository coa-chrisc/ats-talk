import type { Picture } from "./types";

/** Part 4. Where the City stands: slides 11 to 15, drawn in the world `stands`. */
export const WHERE_THE_CITY_STANDS: Picture[] = [
  {
    id: "track",
    number: "11",
    part: 4,
    world: "stands",
    name: "Where the City looks like it is",
    show: "Measured by strategy, team and budget, the City is at the start line.",
    say: "Measured the way a consultant would measure it, the City is at the start line. There is no AI strategy, no AI team and no AI budget line, while the enterprise pack we just described spends 17 percent of IT budgets. One thing is already in place, and it matters more than it looks. Staff can use only authorized tools, the AI tools the Chief Information Security Officer approved, and the system enforces that rather than a memo asking for it. On the course's ladder of controls that is the strongest kind, and most of the organizations in the cancellation statistics did not have it. Hold this picture. We are going to redraw it twice.",
    see: ["A running track draws as a long oval seen from above, filling the drawing width. A pack of small indigo runners labeled \"Enterprise\" is far along the back straight. A single green runner, twice their size, stands on a white start line at the lower left, labeled \"The City\" beneath the track. A grey tag sits in the infield: \"No AI strategy, no AI team and no AI budget line\". A fence post plants in the ground outside the track beside the start line, a deep-green tick on its cap, labeled \"Authorized tools\". The slide ends on the track, the pack, the City at the line and the ticked post."],
    story: [
      "The City has no AI strategy, no AI team and no AI budget line.",
      "It has one real control already: staff may use only the AI tools the CISO has authorized.",
    ],
    steps: [
      { id: "play", show: ["Enterprise", "The City", "No AI strategy, no AI team and no AI budget line", "Authorized tools"] },
    ],
  },
  {
    id: "control",
    number: "11a",
    part: 4,
    world: "stands",
    name: "The control bought time",
    show: "Authorized tools were the right first control. The next is a pathway, with tiers and a budget.",
    say: "A word about the policy, because the room has heard about it. From the end of October staff may use the Copilot that comes with Microsoft 365 and nothing else. That is the right first control, and the mainstream one: Seattle made the same rule in May; Minnesota, San Francisco and Houston run the same way. It has a shelf life. Gartner finds 69 percent of organizations see staff using prohibited tools anyway, and Microsoft finds 28 percent of staff say no approved option exists. The cities ahead of us added tiers by data sensitivity, with a sanctioned enterprise tool for the data that is not ready to connect, and a budget line. Pennsylvania, in a year, went from 175 to 3,000 staff on a sanctioned enterprise tool.",
    see: ["The fence post from slide 11 stands at the left with its tick, labeled \"Authorized tools\", and four small city nameplates settle beside it: \"Seattle\", \"Minnesota\", \"San Francisco\", \"Houston\". A grey pressure gauge draws under them with its needle swinging toward the high end, labeled \"69 percent\", with the caption \"See staff using tools anyway\". On the right a stair of three steps rises, labeled \"Tiers by data sensitivity\", with the caption \"Boston\"; a green figure climbs from the first step to the second. Beside the stair an indigo figure lands: \"175 to 3,000\", with the caption \"Pennsylvania, in a year\". A plain tag at the foot reads \"A budget line\". The slide ends on the post and nameplates, the gauge, the stair with its climber, the figure and the tag."],
    story: [
      "Seattle, Minnesota and Houston made the same rule. Gartner: 69 percent see staff using tools anyway.",
      "Boston moved to tiers by data sensitivity. Pennsylvania, in a year, went from 175 to 3,000 staff.",
    ],
    steps: [
      { id: "play", show: ["Authorized tools", "Seattle", "Minnesota", "San Francisco", "Houston", "69 percent", "See staff using tools anyway", "Tiers by data sensitivity", "Boston", "175 to 3,000", "Pennsylvania, in a year", "A budget line"] },
    ],
  },
  {
    id: "exists",
    number: "12",
    part: 4,
    world: "stands",
    name: "What already exists",
    show: "The City has more AI practice than it has counted, in pockets across departments.",
    say: "The first correction is people. The course's 90-day playbook starts with an inventory of everything built, bought and employee-made, before anyone sets policy, and the City has more than it has counted. Austin Public Health has 20 applications and a sanctioned sandbox. Austin Energy and Fire run wildfire detection with AI, in service since 2024. Development Services has permit pre-checks in use and a legacy system read by agents. Police has AI-assisted non-emergency reporting. The Library is teaching AI literacy and sitting in governance conversations. The Budget Office ran Community in the Loop with residents. Some of this is in service and some is prototype. A practitioner group reaches 20 people in nine departments. None of it is yet at one table.",
    see: ["A grid of plain department boxes draws, labeled once \"Departments\". Lanterns light inside six boxes in turn, each with its name and a short caption: \"Austin Public Health\" with \"20 applications and a sanctioned sandbox\"; \"Austin Energy\" with \"Wildfire detection with Fire, in service\"; \"Development Services\" with \"Permit pre-checks and a legacy system read by agents\"; \"Police\" with \"AI-assisted non-emergency reporting\"; \"Library\" with \"AI literacy and governance\"; \"Budget Office\" with \"Community in the Loop\". A few smaller lanterns light in other boxes with no names. A ring of nine green dots forms around the grid, labeled \"Practitioner group\", with the caption \"20 people in nine departments\". A tag drops under the grid: \"70 to 100 staff came to each Ask About AI\". A grey tag sits apart at the right: \"Not yet at one table\". The slide ends on the lit grid, the ring, the tag and the grey tag."],
    story: [
      "Public Health, Energy, Fire, Development Services, Police and the Library are all at work on it.",
      "A practitioner group of 20 spans nine departments, and 70 to 100 staff came to each Ask About AI.",
    ],
    steps: [
      { id: "play", show: ["Departments", "Austin Public Health", "20 applications and a sanctioned sandbox", "Austin Energy", "Wildfire detection with Fire, in service", "Development Services", "Permit pre-checks and a legacy system read by agents", "Police", "AI-assisted non-emergency reporting", "Library", "AI literacy and governance", "Budget Office", "Community in the Loop", "Practitioner group", "20 people in nine departments", "70 to 100 staff came to each Ask About AI", "Not yet at one table"] },
    ],
  },
  {
    id: "noticed",
    number: "12a",
    part: 4,
    world: "stands",
    name: "The rest of the country has noticed",
    show: "Other cities and national bodies already treat the City's AI work as a model.",
    say: "The pockets were noticed outside the building before inside it, and some of the recognition is this department's own. Austin placed seventh among cities over 500,000 in the 2025 Digital Cities Survey, which cited the AI governance pilot and the assistant test. The City CIO nominated the Austin Public Health work for the Texas IT Leadership Forum and it won the Innovative Leader Award. Bloomberg Cities featured the permitting work in September. Bloomberg Philanthropies selected Austin for its City Data Alliance. The City has been invited to present by NYC Health, Tacoma, Mesa and Texas DIR. A program that starts here walks into a community with a reputation attached. And this is only what we found by asking around. There is more, and finding it is step one.",
    see: ["Five plain plaques settle on a wall one at a time, each with a short label: \"Digital Cities Survey\", with the caption \"Seventh among cities over 500,000\"; \"Innovative Leader Award\", with \"Texas IT Leadership Forum\"; \"Bloomberg Cities\", with \"Featured the permitting work\"; \"City Data Alliance\", with \"Bloomberg Philanthropies\"; and \"Invited to present\", with four small names under it, \"NYC Health\", \"Tacoma\", \"Mesa\", \"Texas DIR\". A grey tag sits apart below the wall: \"Only what we found by asking around\". The slide ends on the wall of five plaques and the tag."],
    story: [
      "Austin placed seventh among large cities in the 2025 Digital Cities Survey, citing its AI governance pilots.",
      "This is only what we found by asking around. There is more, and finding it is step one.",
    ],
    steps: [
      { id: "play", show: ["Digital Cities Survey", "Seventh among cities over 500,000", "Innovative Leader Award", "Texas IT Leadership Forum", "Bloomberg Cities", "Featured the permitting work", "City Data Alliance", "Bloomberg Philanthropies", "Invited to present", "NYC Health", "Tacoma", "Mesa", "Texas DIR", "Only what we found by asking around"] },
    ],
  },
  {
    id: "infrastructure",
    number: "13",
    part: 4,
    world: "stands",
    name: "Infrastructure ready for AI",
    show: "The City already has infrastructure for AI, built with the security office and partners.",
    say: "The second correction is infrastructure. Austin Public Health built an Azure sandbox with the Information Security Office, Microsoft and Quisitive. It inherits the City's tenant controls, sign-in and central logging, and it cannot reach other City systems; data gets in only when someone places it. Inside it, models are already deployed through Azure OpenAI and Azure AI Foundry, so a team does not start by asking for a model. There is a CISO-approved pilot pathway, and the production route is prepared: landing zone designed, demand request filed, waiting on a decision. The partners have been in the room every week for over two years, and Amazon is now joining the conversation.",
    see: ["A fenced yard draws across the left two thirds, labeled \"Azure sandbox\", with the caption \"Cannot reach other City systems\". Inside it three tiles land in a row: \"Deployed models\" with the caption \"Azure OpenAI and Azure AI Foundry\", \"Pilot pathway\" with \"CISO-approved\", and \"Production route\" with \"Landing zone designed, demand request filed\". Under the fence a calendar strip fills week by week, labeled \"Every week for over two years\", with two nameplates beside it, \"Microsoft\" and \"Quisitive\", and a third in a dashed outline a little apart, \"Amazon\", with the caption \"Joining the conversation\". The slide ends on the yard with its three tiles, the full calendar and the three nameplates."],
    story: [
      "An Azure sandbox with deployed models, a CISO-approved pilot pathway, and a production route.",
      "Weekly sessions with Microsoft and Quisitive for over two years; Amazon is joining the conversation.",
    ],
    steps: [
      { id: "play", show: ["Azure sandbox", "Cannot reach other City systems", "Deployed models", "Azure OpenAI and Azure AI Foundry", "Pilot pathway", "CISO-approved", "Production route", "Landing zone designed, demand request filed", "Every week for over two years", "Microsoft", "Quisitive", "Amazon", "Joining the conversation"] },
    ],
  },
  {
    id: "fits",
    number: "14",
    part: 4,
    world: "stands",
    name: "The four ideas already fit it",
    show: "The course's controls map onto what the sandbox already does.",
    say: "This is the slide I most wanted to show you. The course spends a full day on controls for agents, and when I came home and laid its list against the sandbox, the two matched. The course asks for identity for every actor; the sandbox has single sign-on and roles. It asks for rules the system enforces; the sandbox has allow lists and private networking, and nothing talks to anything it was not allowed to. It asks for approval before effect; a person approves each build. It asks for repeatable and logged; everything is infrastructure as code in Azure DevOps. The foundations are in place. The missing piece is the organization that connects them, and that is leadership's to supply, at a fraction of the cost of the foundations.",
    see: ["Two columns draw. The left column is headed \"The course asks for\" and lists four lines: \"Identity for every actor\", \"Rules the system enforces\", \"Approval before effect\", \"Repeatable and logged\". The right column is headed \"The sandbox has\" and lists four lines that land in turn opposite their partners: \"Single sign-on and roles\", \"Allow lists and private networking\", \"A person approves each build\", \"Infrastructure as code\". A deep-green tick lands between each matched pair. A grey tag at the foot reads \"What connects them\". The slide ends on the two columns, the four ticks and the tag."],
    story: [
      "Sign-on and roles, allow lists and private networking, a person approving each build, all as code.",
      "The foundations the course asks for are in place. The missing piece is what connects them.",
    ],
    steps: [
      { id: "play", show: ["The course asks for", "Identity for every actor", "Rules the system enforces", "Approval before effect", "Repeatable and logged", "The sandbox has", "Single sign-on and roles", "Allow lists and private networking", "A person approves each build", "Infrastructure as code", "What connects them"] },
    ],
  },
  {
    id: "fleet",
    number: "15",
    part: 4,
    world: "stands",
    name: "Where the City stands",
    show: "Counted properly, the City is a third of the way around, with a fleet it can teach.",
    say: "Here is the track redrawn. Since late 2025 Austin Public Health has built its applications with a fleet of the kind we defined earlier: lead agents plan, builders work in parallel, two reviewers check every change, and a person approves. That fleet has produced 20 applications from 145 reusable modules, and the process is written down well enough to teach. The enterprise pack is still ahead. On the course's gates the sandbox has passed explore, validate and deploy. Scale is the one gate it has not earned; it is not ready yet, and should not try until the organization exists. Counted properly, the City is a third of the way around, past three markers: people, infrastructure, a working fleet. The next part is how to close the rest.",
    see: ["The track from slide 11 returns with the same pack, labeled \"Enterprise\". The green City runner now stands a third of the way around the first bend, and behind it along the lane sit three small green markers it has passed: \"People\", \"Infrastructure\", \"A working fleet\". In the infield a short stair of four gates lights three steps green, \"Explore\", \"Validate\", \"Deploy\", with the fourth grey, \"Scale\", and a grey tag beside it, \"Not ready yet\". A tag under the track reads \"20 applications from 145 reusable modules\". The slide ends on the track with the runner moved, the three markers, the gate stair and the tag."],
    story: [
      "Austin Public Health builds with a fleet of agents today: 20 applications from 145 reusable modules.",
      "Explore, validate and deploy are passed. Scale is the gate the City is not ready for yet.",
    ],
    steps: [
      { id: "play", show: ["Enterprise", "People", "Infrastructure", "A working fleet", "Explore", "Validate", "Deploy", "Scale", "Not ready yet", "20 applications from 145 reusable modules"] },
    ],
  },
];
