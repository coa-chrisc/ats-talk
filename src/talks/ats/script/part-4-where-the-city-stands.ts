import type { Picture } from "./types";

/** Part 4. Where the City stands: slides 11 to 15, drawn in the world `stands`. */
export const WHERE_THE_CITY_STANDS: Picture[] = [
  {
    id: "track",
    number: "11",
    part: 4,
    world: "stands",
    name: "The formal starting point",
    show: "The City has not yet established a formal AI program.",
    say: "The City has a starting point: the acceptable use policy limits staff to approved AI tools. We have not yet established a citywide AI strategy, a dedicated program team, or an AI budget line. Those are organizational arrangements, not a measure of whether staff have useful experience. The next slides show work already happening across departments. We should distinguish the formal program we need to establish from the capabilities staff have already developed.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. A faint grid of plain department boxes draws across the left of the stage, labeled \"Departments\", with nothing lit inside. A solid green line draws once around the whole grid, and as it closes the policy's labels appear beside it: \"In place\", \"Acceptable use policy\", \"Approved tools for staff use\". Then \"Still to establish\" appears at the right, and three empty dashed plates trace in one after another, each with its label and caption inside: \"Citywide AI strategy\" with \"Priorities and measures of success\", \"Dedicated program team\" with \"Responsibility and staff capacity\", and \"AI budget line\" with \"Resources for agreed priorities\". The slide ends on the unlit grid ringed in green and the three empty dashed plates."],
    story: [
      "The acceptable use policy establishes approved tools as a starting point.",
      "A citywide strategy, dedicated team, and AI budget line still need to be established.",
    ],
    steps: [
      { id: "play", show: ["Departments", "In place", "Acceptable use policy", "Approved tools for staff use", "Still to establish", "Citywide AI strategy", "Priorities and measures of success", "Dedicated program team", "Responsibility and staff capacity", "AI budget line", "Resources for agreed priorities"] },
    ],
  },
  {
    id: "control",
    number: "11a",
    part: 4,
    world: "stands",
    name: "Approved tools that meet staff needs",
    show: "Staff need approved AI tools that meet their needs.",
    say: "Staff need a practical route to tools that fit their work. Begin with the task and the data it requires. If an approved option fits, use it within the permitted data and actions. If none fits, staff need a clear way to request review of the need, the tool, and its data access. The outcome may be a suitable approved tool or a different approach. Track usage and problems so the City can improve the available options. This is the proposed service path, not a claim that this written process already exists. Restricting tools without a usable route for legitimate needs can leave staff improvising outside the approved process.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. A green staff figure stands at the left with a card: \"A service need\", with \"Staff identify the task and data\". The card carries a small round notch. The route forks. On the upper branch stands a shelf of three tools, labeled \"Approved tools\", each screen marked with a different socket: a circle, a square, and a triangle. The card travels to the shelf; the round socket lights deep green, labeled \"An approved option fits\", and the card clicks into that screen. A dashed green boundary draws around that one screen: \"Use it within its allowed data and actions\". Beneath the screen an activity record fills line by line while the card stays in place: \"Visibility and control\", with \"Track use, access, and problems\". Once that path is complete, a second card with a diamond notch travels along the lower branch beneath the shelf; no socket lights, and it stops at a closed gate labeled \"No approved option fits\", with \"Request a review of the need\". A reviewer looks it over with a magnifier, \"Review the tool and data access\", and an orange mark lands beside the reviewer: \"Approve a suitable option or another approach\". A grey dashed slot then appears at the end of the shelf; its diamond socket turns orange, and the slot becomes a solid screen, so the shelf holds one more tool. A caption at the lower left reads \"The proposed service path\". The slide ends with both branches in view: one card in its matching tool above its record, one stopped at the closed gate, and a new tool on the shelf from the review."],
    story: [
      "Give staff a clear route from a service need to a tool approved for that task and its data.",
      "When no approved option fits, provide a review path instead of leaving staff to improvise.",
    ],
    steps: [
      { id: "play", show: ["A service need", "Staff identify the task and data", "Approved tools", "An approved option fits", "Use it within its allowed data and actions", "Visibility and control", "Track use, access, and problems", "No approved option fits", "Request a review of the need", "Review the tool and data access", "Approve a suitable option or another approach", "The proposed service path"] },
    ],
  },
  {
    id: "exists",
    number: "12",
    part: 4,
    world: "stands",
    name: "What already exists",
    show: "Departments already have AI work under way.",
    say: "Departments already have AI projects under way, but we do not yet have a complete inventory. The course recommends starting with an inventory of purchased tools and work developed by staff. Austin Public Health has 20 applications and an approved test environment isolated from other City systems. Austin Energy has operated AI wildfire detection with Fire since 2024. Development Services has permit pre-checks and is using agents to examine a legacy system. Police has AI-assisted non-emergency reporting. The Library teaches AI literacy and governance. The Budget Office asked residents how the City should use AI through Community in the Loop. Some projects are already in use; others are prototypes. The practitioner group includes 20 staff in nine departments, and each Ask About AI training session drew 70 to 100 staff. These teams have not yet all met together.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. A grid of plain department boxes draws, labeled once \"Departments\", as on slide 11. Six boxes light in turn, each with a window glowing green, and as each lights, its name and a short caption appear in a list at the right: \"Austin Public Health\" with \"20 applications and an approved test environment\"; \"Austin Energy\" with \"Wildfire detection with Fire, in service\"; \"Development Services\" with \"Permit checks and analysis of an older system\"; \"Police\" with \"AI-assisted non-emergency reporting\"; \"Library\" with \"AI literacy and governance\"; and \"Budget Office\" with \"Asked residents how the City should use AI\". A few more boxes light more faintly, with no names. Under the grid a small group of green staff figures gathers, labeled \"Practitioner group\", with \"20 people in nine departments\", and a caption beneath: \"70 to 100 staff at each Ask About AI training\". Beside them an empty round table is drawn in grey dashes, with the grey caption \"These teams have never all been in one room\". The slide ends on the lit grid and its list, the group, and the empty table."],
    story: [
      "Public Health, Energy, Development Services, Police, the Library, and the Budget Office are involved.",
      "The practitioner group includes 20 staff in nine departments. Training sessions drew 70 to 100 staff.",
    ],
    steps: [
      { id: "play", show: ["Departments", "Austin Public Health", "20 applications and an approved test environment", "Austin Energy", "Wildfire detection with Fire, in service", "Development Services", "Permit checks and analysis of an older system", "Police", "AI-assisted non-emergency reporting", "Library", "AI literacy and governance", "Budget Office", "Asked residents how the City should use AI", "Practitioner group", "20 people in nine departments", "70 to 100 staff at each Ask About AI training", "These teams have never all been in one room"] },
    ],
  },
  {
    id: "noticed",
    number: "12a",
    part: 4,
    world: "stands",
    name: "The rest of the country has noticed",
    show: "Outside groups have already recognized the City's AI work.",
    say: "Outside groups have already recognized the City's work, including work in this department. Austin placed seventh among cities over 500,000 in the 2025 Digital Cities Survey, which cited its AI governance pilot and assistant test. The City CIO nominated Austin Public Health's work for the Texas IT Leadership Forum, where it won the Innovative Leader Award. Bloomberg Cities featured the permitting work in September, and Bloomberg Philanthropies selected Austin for its City Data Alliance. NYC Health, Tacoma, Mesa, and the Texas Department of Information Resources have invited the City to present. A citywide AI program would build on staff expertise and work that has already received outside recognition. These are the examples we found by asking around. Our first step is to identify the other AI work happening across departments.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Five plain plaques settle on a wall one at a time, each with a short label: \"Digital Cities Survey\", with the caption \"Seventh among cities over 500,000\"; \"Innovative Leader Award\", with \"Won at the Texas IT Leadership Forum\"; \"Bloomberg Cities\", with \"Featured the permitting work\"; \"City Data Alliance\", with \"Selected by Bloomberg Philanthropies\"; and \"Invited to present\", with four small names under it, \"NYC Health\", \"Tacoma\", \"Mesa\", \"Texas Department of Information Resources\". A grey tag sits apart below the wall: \"Examples identified so far\". The slide ends on the wall of five plaques and the tag."],
    story: [
      "Austin placed seventh among large cities in the 2025 Digital Cities Survey, which cited its AI pilots.",
      "Our first step is to identify the other AI work happening across departments.",
    ],
    steps: [
      { id: "play", show: ["Digital Cities Survey", "Seventh among cities over 500,000", "Innovative Leader Award", "Won at the Texas IT Leadership Forum", "Bloomberg Cities", "Featured the permitting work", "City Data Alliance", "Selected by Bloomberg Philanthropies", "Invited to present", "NYC Health", "Tacoma", "Mesa", "Texas Department of Information Resources", "Examples identified so far"] },
    ],
  },
  {
    id: "community",
    number: "12b",
    part: 4,
    world: "stands",
    name: "A community already at work",
    show: "Staff in nine departments already work with AI.",
    say: "Staff in Austin Public Health, Development Services, Austin Energy, Fire, Police, Austin Water, the Library, the Budget Office, and Technology Services are already working with AI. Here are some of their public comments. Divya Rathanlal, Chief Information Officer at Austin Water: It's always business-driven and technology-enabled. Jose Ruiz-Vazquez, Milwood Branch of the Library: We do governance all the time. We just don't call it that. José Roig, former director of Development Services: If you invest in AI, then you have to use it. Daniel Culotta, Assistant Director in the Budget Office: Austin is taking a proactive approach. We hear three themes in those comments: start with a real need, make oversight part of the work from the start, and put the tools into use. Those are the people and practices a citywide program would build on.",
    see: ["After the first supporting sentence has been read, a stationary column of nine department names appears at the left, in this order: \"Austin Public Health\", \"Development Services\", \"Austin Energy\", \"Fire\", \"Police\", \"Austin Water\", \"Library\", \"Budget Office\", \"Technology Services\". Four stationary quotes appear beside their departments with their connectors, in large type with the speaker's name and title under it: beside Development Services, \"If you invest in AI, then you have to use it.\" with \"José Roig, former Development Services director\"; beside Austin Water, \"It's always business-driven and technology-enabled.\" with \"Divya Rathanlal, Chief Information Officer\"; beside the Library, \"We do governance all the time. We just don't call it that.\" with \"Jose Ruiz-Vazquez, Milwood Branch Library\"; beside the Budget Office, \"Austin is taking a proactive approach.\" with \"Daniel Culotta, Assistant Director\". The click ends with all nine names settled and the four quotes beside them.", "The column and quotes fade out in place. Three green rules and their words appear as one group with a small top-to-bottom stagger, each with its words above it: \"Start with a real need\", \"Make oversight part of the work\", \"Use what you build\". The second supporting sentence appears after the theme rows settle. The slide ends on the three rules."],
    story: [
      "Here is what people in Water, the Library, Development Services, and the Budget Office have said.",
      "Start with a real need, make oversight part of the work, and put the tools into use.",
    ],
    steps: [
      { id: "roll", show: ["Austin Public Health", "Development Services", "Austin Energy", "Fire", "Police", "Austin Water", "Library", "Budget Office", "Technology Services", "If you invest in AI, then you have to use it.", "José Roig, former Development Services director", "It's always business-driven and technology-enabled.", "Divya Rathanlal, Chief Information Officer", "We do governance all the time. We just don't call it that.", "Jose Ruiz-Vazquez, Milwood Branch Library", "Austin is taking a proactive approach.", "Daniel Culotta, Assistant Director"] },
      { id: "themes", show: ["Start with a real need", "Make oversight part of the work", "Use what you build"] },
    ],
  },
  {
    id: "infrastructure",
    number: "13",
    part: 4,
    world: "stands",
    name: "Infrastructure ready for AI",
    show: "Austin Public Health has infrastructure for building AI tools.",
    say: "Austin Public Health built an Azure sandbox with the Information Security Office, Microsoft, and Quisitive. This isolated development environment uses the City's sign-in, access controls, and central logging. It cannot reach other City systems; someone must deliberately place data in it. Azure OpenAI and Azure AI Foundry are already running there, so teams can begin with available AI services. The City's current guidance covers staff use of tools such as Copilot. There is no written process yet for the AI tools we build ourselves. We have a working agreement with security to build and test tools in the sandbox. Production use requires a separate review through the CISO and the DCIO to the CIO. Microsoft and Quisitive, a Microsoft partner, have met with the team every week for over two years. Amazon is now joining those discussions.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. A fenced yard draws across the left two thirds, labeled \"Azure sandbox\", with the caption \"Isolated from other City systems\". Inside it three tiles land in a row: \"AI already running\" with the caption \"Azure OpenAI and Azure AI Foundry\", \"Permission to build\" with \"Agreed with the security team\", and \"Route to production\" with \"Review by CISO, DCIO, and CIO\". Under the fence a calendar of weeks fills as one group, labeled \"Met every week for over two years\", with two nameplates beside it, \"Microsoft\" and \"Quisitive, a Microsoft partner\", and a third in a dashed outline a little apart, \"Amazon\", with the caption \"Joining now\". The slide ends on the yard with its three tiles, the full calendar and the three nameplates."],
    story: [
      "The security team has agreed that we can build in an isolated Azure environment running AI services.",
      "Production use requires review through the CISO, the DCIO, and the CIO.",
    ],
    steps: [
      { id: "play", show: ["Azure sandbox", "Isolated from other City systems", "AI already running", "Azure OpenAI and Azure AI Foundry", "Permission to build", "Agreed with the security team", "Route to production", "Review by CISO, DCIO, and CIO", "Met every week for over two years", "Microsoft", "Quisitive, a Microsoft partner", "Amazon", "Joining now"] },
    ],
  },
  {
    id: "fits",
    number: "14",
    part: 4,
    world: "stands",
    name: "Controls already in the sandbox",
    show: "The sandbox uses controls the course recommends.",
    say: "The sandbox gives us useful foundations. Sign-in and roles govern identity and access, while network controls restrict connections. A person approves a software build, and infrastructure changes are stored as code. Those controls have specific scopes. Approving a build is not the same as approving an agent's later action, and an infrastructure history is not a complete log of agent activity. For each agent system, define the permitted data and actions, the operations requiring approval, and the activity records needed for oversight. Confirm which controls the current implementation already supplies and which must be added. We should build on these foundations without treating them as a complete agent-control design.",
    see: ["The existing infrastructure assembles as four structural layers resting on a foundation. Each layer names the control and its actual scope. Beside it, an agent sits inside a dashed design boundary; four connections draw toward a permission barrier, a tool-access key, a person for sensitive-action approval, and an activity log. The foundation finishes before the agent-control drawing starts. The dashed boundary and closing sentence emphasize that these controls still need to be defined for each system. Labels: \"Existing foundation\", \"What it covers\", \"Define for each agent system\", \"Sign-in and roles\", \"Identity and assigned access\", \"Permitted data and actions\", \"Network restrictions\", \"Connections to approved systems\", \"Tool-level permissions\", \"Build approval\", \"Approval of a software build\", \"Approval of sensitive actions\", \"Infrastructure as code\", \"Recorded infrastructure changes\", \"Agent activity and outcomes\", \"A foundation is not a complete agent-control design\"."],
    story: [
      "The sandbox has access controls, build approvals, and infrastructure changes stored as code.",
      "Agent actions also need defined permissions, approval rules, and appropriate activity records.",
    ],
    steps: [
      { id: "play", show: ["Existing foundation", "What it covers", "Define for each agent system", "Sign-in and roles", "Identity and assigned access", "Permitted data and actions", "Network restrictions", "Connections to approved systems", "Tool-level permissions", "Build approval", "Approval of a software build", "Approval of sensitive actions", "Infrastructure as code", "Recorded infrastructure changes", "Agent activity and outcomes", "A foundation is not a complete agent-control design"] },
    ],
  },
  {
    id: "fleet",
    number: "15",
    part: 4,
    world: "stands",
    name: "Where the City stands",
    show: "The City has people, infrastructure, and a working agent fleet.",
    say: "The City already has experienced staff, the Azure sandbox, and a documented workflow for agents to help build applications with human approval. Austin Public Health reports a portfolio of 20 applications using 145 reusable modules. Those counts describe work produced; they do not tell us that every application is approved for production or ready for citywide use. Before expanding, assign a support team and staff capacity, confirm each application's deployment environment and approvals, and measure reliability, adoption, and service outcomes. We can build on existing work while being precise about what is ready and what still needs to be established.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. The department grid from slide 11 draws again, lit as on slide 12, labeled \"Capabilities to build on\". Three green staff figures appear on the grid: \"Experienced staff\", with \"Departmental practice and shared learning\". A small fenced yard draws beside them: \"Azure sandbox\", with \"An isolated environment for building and testing\". Inside the fence three agents and a staff figure appear, and an orange mark lands beside the person: \"Working agent fleet\", with \"A documented workflow with human approval\". A line then draws rightward from the grid, labeled \"Before expanding\", and three closed gates land on it in turn: \"Assign support\" with \"Name the team and provide staff capacity\", \"Confirm production readiness\" with \"Verify each application's deployment and approvals\", and \"Measure results\" with \"Check reliability, use, and service outcomes\". Nothing passes a gate. The portfolio count appears last as plain text at the foot, apart from the line, as context rather than evidence of production approval: \"Reported portfolio: 20 applications and 145 reusable modules\". The slide ends on the lit grid with its people, the fenced yard, the three closed gates and the count."],
    story: [
      "Staff experience, the Azure sandbox, and a documented agent workflow give us a practical starting point.",
      "Before expanding, assign support, confirm production readiness, and measure results.",
    ],
    steps: [
      { id: "play", show: ["Capabilities to build on", "Experienced staff", "Departmental practice and shared learning", "Azure sandbox", "An isolated environment for building and testing", "Working agent fleet", "A documented workflow with human approval", "Before expanding", "Assign support", "Name the team and provide staff capacity", "Confirm production readiness", "Verify each application's deployment and approvals", "Measure results", "Check reliability, use, and service outcomes", "Reported portfolio: 20 applications and 145 reusable modules"] },
    ],
  },
];
