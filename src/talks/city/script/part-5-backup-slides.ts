import type { Picture } from "./types";

/** Part 5. Backup slides: slides 25 to 35, drawn in the world `backup`. */
export const BACKUP_SLIDES: Picture[] = [
  {
    id: "foresight",
    number: "25",
    part: 5,
    world: "backup",
    name: "Foresight",
    show: "Foresight scans news, research and government sources every night and scores what it finds against City priorities.",
    say: "Foresight serves the City Manager's Office and Budget and Organizational Excellence. It sits in our lowest risk tier and runs on Azure OpenAI inside the City tenant. Its answers carry citations, so a reader can trace every claim in a brief back to its source.",
    see: ["A wide band of small source dots across the top, labelled \"9,158 sources\", pours into a funnel under a small moon. The funnel scores them against a row of tiles labelled \"City priorities\", and a smaller set drops out of the bottom, labelled \"585 signals\". The signals gather into one page labelled \"Brief\", which slides onto a table labelled \"Quarterly reviews\". A tag in the corner reads \"Under $100 a month\". The slide ends on the funnel, the brief and the tag."],
    story: [
      "It has drawn 585 signals from 9,158 sources, with cited answers and briefs, for under $100 a month.",
      "It is a sanctioned pilot, used in Results ATX quarterly reviews.",
    ],
    steps: [
      { id: "play", show: ["9,158 sources", "City priorities", "585 signals", "Brief", "Quarterly reviews", "Under $100 a month"] },
    ],
  },
  {
    id: "grantscope",
    number: "26",
    part: 5,
    world: "backup",
    name: "GrantScope and PolicyPulse",
    show: "GrantScope finds and scores grant opportunities, and PolicyPulse tracks Texas and federal bills with a plain-language summary of their impact.",
    say: "GrantScope scores each grant for fit, and a person triages the ones with a strong fit. Government Relations took it to the City Manager's Office, and an FY27 demand request is filed. Both tools are validated. We first built PolicyPulse in a day, in February 2025, and it has four to five pilot users at Austin Public Health today. Austin Public Health manages about $39.4 million a year in federal grants, so grant discovery matters a great deal to us.",
    see: ["Two panels sit side by side. On the left, under \"GrantScope\", a stream of grant cards passes a scoring bar, and the high scorers drop into a tray labelled \"Strong fit\", while a counter reads \"More than $300 million\". On the right, under \"PolicyPulse\", a stack labelled \"More than 26,000 bills\" turns card by card into short summaries labelled \"Plain-language summary\". A tag reading \"Validated\" settles on each panel. Each panel then gets its own short timeline directly beneath it, joined to it by a thin line. Under GrantScope, one point lights: \"FY27 demand request\". Under PolicyPulse, two points light in turn: \"First built\", then \"Pilot users\". The slide ends on the two panels, each with its own timeline."],
    story: [
      "GrantScope has flagged more than $300 million in opportunities, identified but not awarded.",
      "PolicyPulse tracks more than 26,000 bills, and both tools have been validated.",
    ],
    steps: [
      { id: "play", show: ["GrantScope", "Strong fit", "More than $300 million", "PolicyPulse", "More than 26,000 bills", "Plain-language summary", "Validated", "FY27 demand request", "First built", "Pilot users"] },
    ],
  },
  {
    id: "amanda",
    number: "27",
    part: 5,
    world: "backup",
    name: "AMANDA code intelligence",
    show: "Agents documented about 500,000 lines of Oracle PL/SQL from the AMANDA system in 21 days, for about $1,000.",
    say: "The agents read the AMANDA system's legacy code and wrote documentation a new team could follow. The pilot is waiting on the production landing zone, and GovEx Academy published a case study on it in May 2026. Development Services speaks for its own results, and the vendor figure covers only part of the work. The savings are projected, not booked, because this has not been implemented at scale yet.",
    see: ["A wall of code files labelled \"Legacy code\", with the label in the normal label color rather than grey, turns page by page into readable documentation labelled \"Documented\", while a counter runs up to \"21 days\". Two bars then draw beside it: a short one labelled \"About $1,000\" and a tall grey one labelled \"Vendor quotes\", topped with \"More than two million dollars\". A tag under the bars reads \"Projected, not booked\". The slide ends on the documentation and the two bars."],
    story: [
      "Vendor quotes for a portion of comparable work came to more than two million dollars.",
      "Featured by Bloomberg Cities Network, September 2026.",
    ],
    steps: [
      { id: "play", show: ["Legacy code", "Documented", "21 days", "About $1,000", "Vendor quotes", "More than two million dollars", "Projected, not booked"] },
    ],
  },
  {
    id: "security",
    number: "28",
    part: 5,
    world: "backup",
    name: "Security, four layers",
    show: "Security is built in four layers, and every application inherits them.",
    say: "The City and Quisitive maintain the tenant controls, and each application declares its own settings as code. Every change passes the pipeline checks before release. Tier one holds Foresight and GrantScope, tier two holds PolicyPulse and transcription, and tier three holds none today, by design. Our security documents map to NIST CSF 2.0, OWASP ASVS and the OWASP Top 10 for large language model applications.",
    see: ["Four bands stack from the bottom up, each with its label: \"Tenant controls\", \"Per-application declarations\", \"Pipeline checks\", \"AI controls\". The pipeline band shows five small checks, and each gets a deep-green tick. Three tier boxes then appear to the right: \"Tier one\" holding \"Foresight\" and \"GrantScope\", \"Tier two\" holding \"PolicyPulse\" and \"Transcription\", and \"Tier three\" empty, with \"None today, by design\". The slide ends on the four bands and the three tiers."],
    story: [
      "Tenant controls, per-application declarations, five blocking pipeline checks and AI controls.",
      "There are three risk tiers, and the highest has no applications today, by design.",
    ],
    steps: [
      { id: "play", show: ["Tenant controls", "Per-application declarations", "Pipeline checks", "AI controls", "Tier one", "Foresight", "GrantScope", "Tier two", "PolicyPulse", "Transcription", "Tier three", "None today, by design"] },
    ],
  },
  {
    id: "onesdlc",
    number: "29",
    part: 5,
    world: "backup",
    name: "Where RAD fits in OneSDLC",
    show: "Rapid application development (RAD) would fit inside OneSDLC as the channel for custom builds.",
    say: "OneSDLC runs Decide, Route, Build, Run and Retire. The four checkpoints are intake, first-version review, pilot review and production review, with the register in ServiceNow. The draft proposes a stand-up in FY27 Q1, on RAD's own live work. OneSDLC sits under Strategic Portfolio Management, which decides what to invest in, and the Technology Selection Process, which decides build or buy. RAD can provide a pilot stage before that decision, with AI-assisted generation against curated patterns shipped through pipelines that check the work.",
    see: ["Five stages draw along a line: \"Decide\", \"Route\", \"Build\", \"Run\", \"Retire\". At \"Route\" a branch splits off, labelled \"Custom builds\", and rejoins the line at \"Run\". Four checkpoint marks land in turn: \"Intake\" on the line where the branch splits off, then \"First-version review\" and \"Pilot review\" on the \"Custom builds\" branch itself, so the branch passes through both, then \"Production review\" where the branch rejoins the line before \"Run\". A small tag beneath reads \"Draft proposes a stand-up in FY27 Q1\". The slide ends on the line, its branch and its four checkpoints."],
    story: [
      "OneSDLC is a draft of one software development lifecycle for One ATS, with four checkpoints.",
      "RAD would handle custom user experiences, AI, external integrations and novel data models.",
    ],
    steps: [
      { id: "play", show: ["Decide", "Route", "Build", "Run", "Retire", "Custom builds", "Intake", "First-version review", "Pilot review", "Production review", "Draft proposes a stand-up in FY27 Q1"] },
    ],
  },
  {
    id: "charter",
    number: "30",
    part: 5,
    world: "backup",
    name: "The AI Program Charter, Sixth Draft",
    show: "Our AI Program Charter, in its Sixth Draft, was prepared for executive discussion in September 2026.",
    say: "The four activities are to understand the current landscape, develop recommendations and a practical roadmap, enable approved work and build capability, and review evidence and adjust. The five initial results are a current-state assessment, a service and participation model, governance arrangements, a workforce learning plan and a prioritized roadmap. The charter works through existing governance and names the Information Security Office and Data Governance as partners. It sets measures with baselines before targets.",
    see: ["Two person cards sit side by side at the top: \"Program manager\" and \"AI architect\". Four overlapping circles draw beneath them: \"Understand\", \"Develop recommendations\", \"Enable\", \"Review\". Five result cards drop into a column to the right of the circles: \"Current-state assessment\", \"Participation model\", \"Governance\", \"Learning plan\", \"Prioritized roadmap\". The slide ends on the two roles, the four circles and the five results."],
    story: [
      "It pairs a dedicated program manager with a full-time AI architect, with departmental liaisons.",
      "Its sponsor is awaiting confirmation, and it sets four activities and five initial results.",
    ],
    steps: [
      { id: "play", show: ["Program manager", "AI architect", "Understand", "Develop recommendations", "Enable", "Review", "Current-state assessment", "Participation model", "Governance", "Learning plan", "Prioritized roadmap"] },
    ],
  },
  {
    id: "costs",
    number: "31",
    part: 5,
    world: "backup",
    name: "What it costs",
    show: "Building in the sandbox costs little, and so does a pilot that fails.",
    say: "What we spend is small. Austin Public Health funds the sandbox at under $1,000 a month for more than 10 projects. The comparisons come from our earlier decks: a failed vendor project at $100,000 to $500,000 or more, and licensing avoided at $50,000 to $500,000 per application. They are estimates, which is why they stay here in backup.",
    see: ["Two groups of bars draw one bar at a time. On the left, under \"What we spend\", two short bars: \"Sandbox\" with \"$890 a month\", and \"Failed pilot\" with \"About $200\". On the right, under \"Comparisons\", two long grey range bars: \"Failed vendor project\" with \"$100,000 to $500,000 or more\", and \"Licensing avoided\" with \"$50,000 to $500,000\". A tag under the right group reads \"Projected rather than booked\". The slide ends on both groups and the tag."],
    story: [
      "The sandbox costs about $890 a month, and a failed pilot about $200 in infrastructure.",
      "Savings are projected rather than booked, because these platforms are not yet at scale.",
    ],
    steps: [
      { id: "play", show: ["What we spend", "Sandbox", "$890 a month", "Failed pilot", "About $200", "Comparisons", "Failed vendor project", "$100,000 to $500,000 or more", "Licensing avoided", "$50,000 to $500,000", "Projected rather than booked"] },
    ],
  },
  {
    id: "teaching",
    number: "32",
    part: 5,
    world: "backup",
    name: "Teaching",
    show: "Teaching is how the capability spreads beyond one team.",
    say: "Ask About AI is on hold for now, during the move into One ATS, and its schedule varied, so I quote attendance per session. The AI Workshop Series runs from September to December 2026. We also publish a nine-part course, our harness course, and the AI Quickstart Guide, and more than 15 one-hour training sessions are documented, along with an AI tools curriculum for Budget and Organizational Excellence. We built the culture before we built the technology, and when the tools were ready, the people were ready too.",
    see: ["A lecture room fills with seats, labelled \"70 to 100 staff each\". A calendar strip draws beside it, labelled \"AI Workshop Series\", spanning \"September to December 2026\". Four items then line up on a shelf below: \"Nine-part course\", \"AI Quickstart Guide\", \"Public Health AI Network\", \"GovTechAI\". The slide ends on the room, the strip and the shelf."],
    story: [
      "Ask About AI lunch sessions drew 70 to 100 staff each, and the AI Workshop Series runs this fall.",
      "We taught courses for the Public Health AI Network and presented to the GovTechAI cohort.",
    ],
    steps: [
      { id: "play", show: ["70 to 100 staff each", "AI Workshop Series", "September to December 2026", "Nine-part course", "AI Quickstart Guide", "Public Health AI Network", "GovTechAI"] },
    ],
  },
  {
    id: "what-exists",
    number: "33",
    part: 5,
    world: "backup",
    name: "What already exists",
    show: "A new City team would start from parts that already exist.",
    say: "The biggest groups among the 145 modules are AI with 31, frontend with 25, data pipeline and infrastructure with 16 each, workflow with 13 and security with eight, plus other categories. The templates are the City AI Application Template and the public Civic AI Starter. Six security documents map to NIST CSF 2.0 and OWASP. The stack is React with Vite, FastAPI on Python, Azure OpenAI and Docker on Azure Container Apps, deployed through Bicep and pipelines. Behind these parts sit 58 governed Azure resources and over a million lines of code.",
    see: ["A shelf fills row by row with modules, each row labelled with its kind and drawn to its length: \"AI\", \"Frontend\", \"Data pipeline\", \"Infrastructure\", \"Workflow\", \"Security\", then a few shorter rows labelled \"Other categories\". A total under the shelf reads \"145 modules\". Beside the shelf, four binders stand up: \"Applications\", \"Modules\", \"Exceptions\", \"Decisions\". A stack of six papers labelled \"Security documents\" settles next to them. The slide ends on the shelf, the binders and the stack."],
    story: [
      "There are 145 tested modules in 13 categories, plus templates and the Austin Design System.",
      "Four registries track applications, modules, exceptions and decisions.",
    ],
    steps: [
      { id: "play", show: ["AI", "Frontend", "Data pipeline", "Infrastructure", "Workflow", "Security", "Other categories", "145 modules", "Applications", "Modules", "Exceptions", "Decisions", "Security documents"] },
    ],
  },
  {
    id: "the-catalog",
    number: "34",
    part: 5,
    world: "backup",
    name: "The Big Cities Health Coalition catalog",
    show: "We built the Big Cities Health Coalition's AI use case catalog in three working sessions.",
    say: "It was built with the coalition and with Microsoft and CDC partners, and each working session ended with feedback from the coalition before the catalog went live. The same process that builds our City tools built this one, with agents doing the heavy lifting and people making the decisions. It is human-reviewed and lives on GitHub, so the coalition runs it without a server of its own.",
    see: ["The catalog's home page wipes in on the left, drawn as its search bar and empty card frames only, with no entries, names or figures in the frames, and a small tag beside it: \"Built with the coalition\". On the right, three session cards appear one after another, with a \"Feedback\" mark from the coalition after each, and the last mark leads to \"Live\". The slide ends on the home page and the three sessions."],
    story: [
      "Health departments post the AI tools and data projects they have built, so others can find them.",
      "The coalition owns it, and it launched on August 27, 2026.",
    ],
    steps: [
      { id: "play", show: ["Built with the coalition", "Feedback", "Live"] },
    ],
  },
  {
    id: "credentials",
    number: "35",
    part: 5,
    world: "backup",
    name: "Full credential list",
    show: "Certificates and courses, by institution and year.",
    say: "The courses track the work. In 2022 I earned the Certified ScrumMaster and Certified Scrum Product Owner credentials. In 2023 came agile project and delivery management, supervised machine learning, AI product management and machine learning projects, Python for data science, and data science and Python. The Microsoft courses, taken in 2023 and later, cover Azure AI, generative AI and AI agents. Coursera with Vanderbilt covered agentic AI for leaders and AI-powered products. The LinkedIn Learning courses, from 2021 to 2026, cover agile, facilitation, Azure AI and responsible AI. The Carnegie Mellon certificate in leading enterprise agentic AI development finishes in fall 2026. PHEP and FEMA certification covers emergency response. I'm glad to send the full list.",
    see: ["A table builds row by row, one row per institution. Each row shows the institution, then its year where there is one, then its course names in small type. The rows, in order:", "\"Scrum Alliance\", \"2022\", \"Certified ScrumMaster and Certified Scrum Product Owner\".", "\"ICAgile\", \"2023\", \"Agile project and delivery management\".", "\"Google\", \"2023\", \"Data science and Python\".", "\"Stanford\", \"2023\", \"Supervised machine learning\".", "\"Duke\", \"2023\", \"AI product management and machine learning projects\".", "\"IBM\", \"2023\", \"Python for data science\".", "\"Microsoft\", \"2023 and later\", \"Azure AI, generative AI and AI agents\".", "\"Coursera with Vanderbilt\", with no year, \"Agentic AI for leaders and AI-powered products\".", "\"LinkedIn Learning\", \"2021 to 2026\", \"Agile, facilitation, Azure AI and responsible AI\".", "\"Carnegie Mellon\", \"2026\", \"Leading enterprise agentic AI development\".", "\"PHEP and FEMA\", with no year, \"Emergency response\"."],
    story: [
      "Scrum Alliance, ICAgile, Stanford, Duke, IBM, Google and Microsoft, since 2022.",
      "Carnegie Mellon, Coursera with Vanderbilt, and about 45 LinkedIn Learning courses since 2021.",
    ],
    steps: [
      { id: "play", show: ["Scrum Alliance", "2022", "Certified ScrumMaster and Certified Scrum Product Owner", "ICAgile", "2023", "Agile project and delivery management", "Google", "Data science and Python", "Stanford", "Supervised machine learning", "Duke", "AI product management and machine learning projects", "IBM", "Python for data science", "Microsoft", "2023 and later", "Azure AI, generative AI and AI agents", "Coursera with Vanderbilt", "Agentic AI for leaders and AI-powered products", "LinkedIn Learning", "2021 to 2026", "Agile, facilitation, Azure AI and responsible AI", "Carnegie Mellon", "2026", "Leading enterprise agentic AI development", "PHEP and FEMA", "Emergency response"] },
    ],
  },
];
