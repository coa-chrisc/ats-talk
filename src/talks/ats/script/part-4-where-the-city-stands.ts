import type { Picture } from "./types";

/** Part 4. Where the City stands: slides 11 to 15, drawn in the world `stands`. */
export const WHERE_THE_CITY_STANDS: Picture[] = [
  {
    id: "track",
    number: "11",
    part: 4,
    world: "stands",
    name: "On paper, the start line",
    show: "On paper, the City is at the start line.",
    say: "On paper, measured the way a consultant would measure it, the City is at the start line. No AI strategy, no AI team, no AI budget line, while the enterprise pack we just described spends 17 percent of its IT budgets. One thing is already in place, and it matters more than it looks. Staff may use only authorized tools, the AI tools the Chief Information Security Officer has approved, and the system enforces that rather than a memo asking for it. On the course's ladder of controls that is the strongest kind, and most of the organizations in Gartner's cancellation statistics did not have it. Hold this picture. We are going to redraw it twice before we are done.",
    see: ["A running track draws as a long oval seen from above, filling the drawing width. A pack of small indigo runners labeled \"Enterprise\" is far along the back straight. A single green runner, twice their size, stands on a white start line at the lower left, labeled \"The City\" beneath the track. A grey tag sits in the infield: \"No AI strategy, no AI team, no AI budget line\". A fence post plants in the ground outside the track beside the start line, a deep-green tick on its cap, labeled \"Authorized tools\". The slide ends on the track, the pack, the City at the line and the ticked post."],
    story: [
      "No AI strategy, no AI team, no AI budget line.",
      "One real control is already in place: staff may use only the AI tools the CISO has authorized.",
    ],
    steps: [
      { id: "play", show: ["Enterprise", "The City", "No AI strategy, no AI team, no AI budget line", "Authorized tools"] },
    ],
  },
  {
    id: "control",
    number: "11a",
    part: 4,
    world: "stands",
    name: "The control bought time",
    show: "Authorized tools was the right first move. The next is tiers by data sensitivity, with a budget.",
    say: "A word about the policy, because the room has heard about it. From the end of October staff may use the Copilot that comes with Microsoft 365 and nothing else. That was the right first move, and the mainstream one. Seattle made the same rule in May; Minnesota, San Francisco and Houston run the same way. But it has a shelf life. Gartner finds 69 percent of organizations see staff use other tools anyway, and Microsoft finds 28 percent of staff say no approved option exists for what they need. The cities ahead of us added tiers by data sensitivity, with a sanctioned enterprise tool for data that is not ready to connect, and a budget to pay for it. Pennsylvania went from 175 staff to 3,000 on one sanctioned tool in a year.",
    see: ["The fence post from slide 11 stands at the left with its tick, labeled \"Authorized tools\", and four small city nameplates settle beside it: \"Seattle\", \"Minnesota\", \"San Francisco\", \"Houston\". A grey pressure gauge draws under them with its needle swinging toward the high end, labeled \"69 percent\", with the caption \"See staff use other tools anyway\". On the right a stair of three steps rises, labeled \"Tiers by data sensitivity\", with the caption \"Boston\"; a green figure climbs from the first step to the second. Beside the stair an indigo figure lands: \"175 staff to 3,000 in a year\", with the caption \"Pennsylvania\". A plain tag at the foot reads \"A budget\". The slide ends on the post and nameplates, the gauge, the stair with its climber, the figure and the tag."],
    story: [
      "Seattle and Houston made the same rule. Gartner finds 69 percent see staff use other tools anyway.",
      "Boston moved to tiers by data sensitivity. Pennsylvania went from 175 staff to 3,000 in a year.",
    ],
    steps: [
      { id: "play", show: ["Authorized tools", "Seattle", "Minnesota", "San Francisco", "Houston", "69 percent", "See staff use other tools anyway", "Tiers by data sensitivity", "Boston", "175 staff to 3,000 in a year", "Pennsylvania", "A budget"] },
    ],
  },
  {
    id: "exists",
    number: "12",
    part: 4,
    world: "stands",
    name: "What already exists",
    show: "Off paper, the City has more AI work under way than anyone has counted.",
    say: "Now the first correction, and it is about people. The course's 90-day playbook starts with an inventory of everything built, bought and employee-made, before anyone sets policy. Off paper, the City has more AI work under way than anyone has counted. Austin Public Health has 20 applications and a sanctioned sandbox. Austin Energy runs AI wildfire detection with Fire, in service since 2024. Development Services has permit pre-checks and a legacy system read by agents. Police has AI-assisted non-emergency reporting. The Library teaches AI literacy and governance. The Budget Office ran Community in the Loop with residents. Some of this is in service and some is prototype. A practitioner group reaches 20 people in nine departments, and 70 to 100 staff at each Ask About AI, every time. It is not yet at one table.",
    see: ["A grid of plain department boxes draws, labeled once \"Departments\". Lanterns light inside six boxes in turn, each with its name and a short caption: \"Austin Public Health\" with \"20 applications and a sanctioned sandbox\"; \"Austin Energy\" with \"Wildfire detection with Fire, in service\"; \"Development Services\" with \"Permit pre-checks and a legacy system read by agents\"; \"Police\" with \"AI-assisted non-emergency reporting\"; \"Library\" with \"AI literacy and governance\"; \"Budget Office\" with \"Community in the Loop\". A few smaller lanterns light in other boxes with no names. A ring of nine green dots forms around the grid, labeled \"Practitioner group\", with the caption \"20 people in nine departments\". A tag drops under the grid: \"70 to 100 staff at each Ask About AI\". A grey tag sits apart at the right: \"Not yet at one table\". The slide ends on the lit grid, the ring, the tag and the grey tag."],
    story: [
      "Public Health, Energy, Fire, Development Services, Police and the Library are all building with it.",
      "A practitioner group of 20 people spans nine departments. Each Ask About AI drew 70 to 100 staff.",
    ],
    steps: [
      { id: "play", show: ["Departments", "Austin Public Health", "20 applications and a sanctioned sandbox", "Austin Energy", "Wildfire detection with Fire, in service", "Development Services", "Permit pre-checks and a legacy system read by agents", "Police", "AI-assisted non-emergency reporting", "Library", "AI literacy and governance", "Budget Office", "Community in the Loop", "Practitioner group", "20 people in nine departments", "70 to 100 staff at each Ask About AI", "Not yet at one table"] },
    ],
  },
  {
    id: "noticed",
    number: "12a",
    part: 4,
    world: "stands",
    name: "The rest of the country has noticed",
    show: "People outside the building noticed before people inside it did.",
    say: "People outside the building noticed this work before people inside it did, and some of the recognition belongs to this department. Austin placed seventh among cities over 500,000 in the 2025 Digital Cities Survey, which cited the AI governance pilot and the assistant test. The City CIO nominated the Austin Public Health work for the Texas IT Leadership Forum, and it won the Innovative Leader Award. Bloomberg Cities featured the permitting work in September. Bloomberg Philanthropies picked Austin for its City Data Alliance. The City has been invited to present by NYC Health, Tacoma, Mesa and Texas DIR. A program that starts here walks into a community with a reputation already attached. And this is only what we found by asking around. There is more, and finding it is step one.",
    see: ["Five plain plaques settle on a wall one at a time, each with a short label: \"Digital Cities Survey\", with the caption \"Seventh among cities over 500,000\"; \"Innovative Leader Award\", with \"Texas IT Leadership Forum\"; \"Bloomberg Cities\", with \"Featured the permitting work\"; \"City Data Alliance\", with \"Bloomberg Philanthropies\"; and \"Invited to present\", with four small names under it, \"NYC Health\", \"Tacoma\", \"Mesa\", \"Texas DIR\". A grey tag sits apart below the wall: \"Only what we found by asking around\". The slide ends on the wall of five plaques and the tag."],
    story: [
      "Austin placed seventh among large cities in the 2025 Digital Cities Survey, its AI pilots cited.",
      "And this is only what we found by asking around. There is more, and finding it is step one.",
    ],
    steps: [
      { id: "play", show: ["Digital Cities Survey", "Seventh among cities over 500,000", "Innovative Leader Award", "Texas IT Leadership Forum", "Bloomberg Cities", "Featured the permitting work", "City Data Alliance", "Bloomberg Philanthropies", "Invited to present", "NYC Health", "Tacoma", "Mesa", "Texas DIR", "Only what we found by asking around"] },
    ],
  },
  {
    id: "community",
    number: "12b",
    part: 4,
    world: "stands",
    name: "A community already at work",
    show: "Staff in nine departments already build, run, govern and teach AI, in their own words.",
    say: "Here is the scale of it. Austin Public Health, Development Services, Austin Energy, Fire, Police, Austin Water, the Library, the Budget Office and Technology Services, in the words of the people doing the work. Divya Rathanlal, Chief Information Officer at Austin Water: It's always business-driven and technology-enabled. Jose Ruiz-Vazquez, Milwood Branch of the Library: We do governance all the time. We just don't call it that. José Roig, former director of Development Services: If you invest in AI, then you have to use it. Daniel Culotta, Assistant Director in the Budget Office: Austin is taking a proactive approach. Three themes run through everything they said. Value to residents. Staff already doing it. Governance in the open. That is the community this program walks into.",
    see: ["A column of nine department names rises slowly up the left of the stage like film credits, in this order: \"Austin Public Health\", \"Development Services\", \"Austin Energy\", \"Fire\", \"Police\", \"Austin Water\", \"Library\", \"Budget Office\", \"Technology Services\". As four of them arrive, a quote slides in from the right beside each, in large type with the speaker's name and title under it: beside Development Services, \"If you invest in AI, then you have to use it.\" with \"José Roig, former director\"; beside Austin Water, \"It's always business-driven and technology-enabled.\" with \"Divya Rathanlal, Chief Information Officer\"; beside the Library, \"We do governance all the time. We just don't call it that.\" with \"Jose Ruiz-Vazquez, Milwood Branch\"; beside the Budget Office, \"Austin is taking a proactive approach.\" with \"Daniel Culotta, Assistant Director\". The click ends with all nine names settled and the four quotes beside them.", "The column and the quotes roll on up and out of view. Three green rules draw across the empty stage one at a time, each with its words above it: \"Value to residents\", \"Staff already doing it\", \"Governance in the open\". The slide ends on the three rules."],
    story: [
      "Water, the Library, Development Services and the Budget Office said in public what they learned.",
      "Three themes run through it all: value to residents, staff already doing it, governance in the open.",
    ],
    steps: [
      { id: "roll", show: ["Austin Public Health", "Development Services", "Austin Energy", "Fire", "Police", "Austin Water", "Library", "Budget Office", "Technology Services", "If you invest in AI, then you have to use it.", "José Roig, former director", "It's always business-driven and technology-enabled.", "Divya Rathanlal, Chief Information Officer", "We do governance all the time. We just don't call it that.", "Jose Ruiz-Vazquez, Milwood Branch", "Austin is taking a proactive approach.", "Daniel Culotta, Assistant Director"] },
      { id: "themes", show: ["Value to residents", "Staff already doing it", "Governance in the open"] },
    ],
  },
  {
    id: "infrastructure",
    number: "13",
    part: 4,
    world: "stands",
    name: "Infrastructure ready for AI",
    show: "The City already has infrastructure for AI, built with the security office and two partners.",
    say: "The second correction is infrastructure. Austin Public Health built an Azure sandbox with the Information Security Office, Microsoft and Quisitive. It inherits the City's tenant controls, sign-in and central logging, and it cannot reach other City systems; data gets in only when someone places it there on purpose. Inside it, AI is already running, through Azure OpenAI and Azure AI Foundry, so a team does not start by asking for one. There is a pilot process the CISO approved, and the route to production is prepared: designed and requested, waiting on a decision. Microsoft and Quisitive have been in the room every week for over two years, and Amazon is joining now.",
    see: ["A fenced yard draws across the left two thirds, labeled \"Azure sandbox\", with the caption \"Cannot reach other City systems\". Inside it three tiles land in a row: \"AI already running\" with the caption \"Azure OpenAI and Azure AI Foundry\", \"Pilot process\" with \"The CISO approved\", and \"Route to production\" with \"Designed and requested\". Under the fence a calendar strip fills week by week, labeled \"Every week for over two years\", with two nameplates beside it, \"Microsoft\" and \"Quisitive\", and a third in a dashed outline a little apart, \"Amazon\", with the caption \"Joining now\". The slide ends on the yard with its three tiles, the full calendar and the three nameplates."],
    story: [
      "An Azure sandbox with AI already running in it, a CISO-approved pilot process, and a route to production.",
      "Microsoft and Quisitive have been in the room every week for over two years. Amazon is joining now.",
    ],
    steps: [
      { id: "play", show: ["Azure sandbox", "Cannot reach other City systems", "AI already running", "Azure OpenAI and Azure AI Foundry", "Pilot process", "The CISO approved", "Route to production", "Designed and requested", "Every week for over two years", "Microsoft", "Quisitive", "Amazon", "Joining now"] },
    ],
  },
  {
    id: "fits",
    number: "14",
    part: 4,
    world: "stands",
    name: "The four lessons already fit it",
    show: "The controls the course teaches are the ones the sandbox already has.",
    say: "This is the slide I most wanted to show you. The course spends a full day on controls for agents, and when I came home and laid its list against the sandbox, the two matched. The course teaches that everything signs in, people and AI alike; the sandbox has one sign-in, with roles. It teaches rules built into the system; the sandbox cannot reach what it should not, because the network and the permissions are set that way. It teaches that a person approves first, before anything takes effect; in the sandbox a person approves each build. It teaches that every change is recorded; in the sandbox there is every change written down as code, in Azure DevOps, so it can be replayed. The foundations are in place. What is missing is the organization that connects them, and that is leadership's to supply, at a fraction of what the foundations cost.",
    see: ["Two columns draw. The left column is headed \"The course teaches\" and lists four lines: \"Everything signs in\", \"Rules built into the system\", \"A person approves first\", \"Every change is recorded\". The right column is headed \"The sandbox has\" and lists four lines that land in turn opposite their partners: \"One sign-in, with roles\", \"Cannot reach what it should not\", \"A person approves each build\", \"Every change written down as code\". A deep-green tick lands between each matched pair. A grey tag at the foot reads \"The organization that connects them\". The slide ends on the two columns, the four ticks and the tag."],
    story: [
      "Everything signs in, nothing reaches what it should not, a person approves each build, every change is recorded.",
      "The foundations are in place. What is missing is the organization that connects them.",
    ],
    steps: [
      { id: "play", show: ["The course teaches", "Everything signs in", "Rules built into the system", "A person approves first", "Every change is recorded", "The sandbox has", "One sign-in, with roles", "Cannot reach what it should not", "A person approves each build", "Every change written down as code", "The organization that connects them"] },
    ],
  },
  {
    id: "fleet",
    number: "15",
    part: 4,
    world: "stands",
    name: "Where the City stands",
    show: "Counted properly, the City is a third of the way around, with a working fleet it can teach.",
    say: "Here is the track redrawn. Since late 2025 Austin Public Health has built its applications with a fleet of the kind we defined earlier: lead agents plan, builders work in parallel, review agents check every change, and a person approves. That fleet has produced 20 applications from 145 reusable modules, and the process is written down well enough to teach. The enterprise pack is still ahead. On the course's gates the sandbox has passed explore, validate and deploy. Scale is the one gate it has not earned. It is not ready yet, and it should not try until the organization exists to carry it. Counted properly, the City is a third of the way around, past three markers: people, infrastructure, and a working fleet. Next, how we would close the rest of the distance.",
    see: ["The track from slide 11 returns with the same pack, labeled \"Enterprise\". The green City runner now stands a third of the way around the first bend, and behind it along the lane sit three small green markers it has passed: \"People\", \"Infrastructure\", \"A working fleet\". In the infield a short stair of four gates lights three steps green, \"Explore\", \"Validate\", \"Deploy\", with the fourth grey, \"Scale\", and a grey tag beside it, \"Not ready yet\". A tag under the track reads \"20 applications from 145 reusable modules\". The slide ends on the track with the runner moved, the three markers, the gate stair and the tag."],
    story: [
      "Austin Public Health builds with a fleet of agents today: 20 applications from 145 reusable modules.",
      "It has passed the explore, validate and deploy gates. Scale is the one it is not ready for yet.",
    ],
    steps: [
      { id: "play", show: ["Enterprise", "People", "Infrastructure", "A working fleet", "Explore", "Validate", "Deploy", "Scale", "Not ready yet", "20 applications from 145 reusable modules"] },
    ],
  },
];
