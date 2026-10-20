import type { Picture } from "./types";

/** Part 1. Who I am: slides 1 to 3, drawn in the world `who`. */
export const WHO_I_AM: Picture[] = [
  {
    id: "title",
    number: "1",
    part: 1,
    world: "who",
    name: "Title",
    show: "Building with AI at the City of Austin.",
    say: "Thank you for the time. I'm Chris Collins, and I'm now part of One ATS. For three years at Austin Public Health I've been building a safe way for the City to make its own software with AI. We do it inside an Azure sandbox that the Information Security Office helped us stand up. I'll spend about 10 minutes on what we built and how we kept it safe. Then I'll spend most of our time on what we learned, and how the City could use those lessons in its AI strategy. I'll finish with where I think I fit in One ATS. The backup slides are there for our discussion, so please stop me whenever something catches your interest. First, a little about how I got here.",
    see: ["The slide is navy, with the Austin Public Health logo in white at top left. The title settles in the middle in white with a short green rule under it, and the two story lines rise beneath. Nothing moves after that."],
    story: [
      "Chris Collins, Austin Public Health, now part of One ATS, for the Deputy CIO and the CTO.",
      "One ATS is the reorganization bringing the City's technology teams into one organization.",
    ],
    steps: [
      { id: "play", show: [] },
    ],
  },
  {
    id: "career",
    number: "2",
    part: 1,
    world: "who",
    name: "Twenty-five years in IT",
    show: "My 25 years in IT took me from Dell to the City of Austin, and then to AI.",
    say: "I was at Dell from 2000 to 2011, then worked at Austin startups and ran my own business, Gadget Guys. We did consumer electronics service and computer consulting for small and medium-sized businesses. I came to the City in 2018 through the wireless shop, doing communications and technology work for Austin Police, Fire and EMS. There I led the citywide FirstNet and Axon body-camera rollout. When COVID hit, I served as Communications Section Chief for Austin Public Health's response, then moved into technology strategy. Austin Public Health works on a smaller budget, and we saw a huge opportunity in AI to scale our services and meet more needs. I began that AI work in 2023, and by 2026 it had grown into AI leadership and strategy, which keeps me learning.",
    see: ["One timeline draws left to right across the slide, with each year sitting just above its marker and the last year ending the line: \"2000\", \"2011\", \"2018\", \"2023\", \"2026\". Seven markers light up along it in turn. The first three sit close together on the left and share one short stretch of line: \"Dell\", \"Austin startups\", \"Gadget Guys\". The other four get the room: \"The wireless shop\", with a small caption \"Police, Fire and EMS\", then \"Communications Section Chief\", then \"Technology strategy\", then \"AI leadership\". Each marker stays lit once it appears. The slide ends on the full line with all seven markers lit."],
    story: [
      "After 11 years at Dell and time at Austin startups, I ran my own business, Gadget Guys.",
      "At the City I moved from the wireless shop to Communications Section Chief during COVID, then to AI.",
    ],
    steps: [
      { id: "play", show: ["2000", "2011", "2018", "2023", "2026", "Dell", "Austin startups", "Gadget Guys", "The wireless shop", "Police, Fire and EMS", "Communications Section Chief", "Technology strategy", "AI leadership"] },
    ],
  },
  {
    id: "learning",
    number: "3",
    part: 1,
    world: "who",
    name: "How I keep learning",
    show: "I keep learning, with more than 65 credentials and course completions since 2021.",
    say: "Microsoft taught me Azure AI, generative AI and AI agents, which our sandbox runs on. Duke covered AI product management, Google and IBM gave me data science and Python, and Stanford taught me supervised machine learning. Scrum Alliance certified me as a ScrumMaster and a Product Owner, and ICAgile added delivery management. I'm finishing this fall with Carnegie Mellon's executive certificate in leading enterprise agentic AI development at Heinz College. Our partners teach me too: Johns Hopkins, the CDC, the Big Cities Health Coalition and Bloomberg. Locally, we partner with UT Austin and St. Edward's University. The City uses Gartner consulting, and Quisitive is Microsoft's partner on our sandbox. We work with AWS, and we have met and worked with Anthropic and OpenAI. Let me start at the beginning.",
    see: ["Two groups of logos fill the slide under the story lines. Under the heading \"Courses and certificates\", seven logos rise one at a time, four in the top row and three centered under them: \"Microsoft\", \"Duke\", \"Google\", \"Scrum Alliance\", \"Stanford\", \"IBM\", \"ICAgile\". Then a larger card turns in on the right beside them, carrying the \"Carnegie Mellon\" logo and reading \"Leading enterprise agentic AI development\", with \"Heinz College\" and \"Finishing this fall\" beneath. Under the heading \"Partners\", 11 logos rise one at a time, six in a row and five centered under them: \"Johns Hopkins\", \"CDC\", \"Big Cities Health Coalition\", \"Bloomberg\", \"UT Austin\", \"St. Edward's\", \"Gartner\", \"Quisitive\", \"AWS\", \"Anthropic\", \"OpenAI\". Each logo sits on a plain white tile with a thin light gray outline, sized so the long wordmarks and the square marks read at the same weight. The slide ends with both groups and the Carnegie Mellon card showing."],
    story: [
      "Courses and certificates from Stanford, Duke, Google, IBM, Microsoft and Carnegie Mellon.",
      "I learn with public health partners, two Austin universities, Gartner, Quisitive, AWS and AI labs.",
    ],
    steps: [
      { id: "play", show: ["Courses and certificates", "Microsoft", "Duke", "Google", "Scrum Alliance", "Stanford", "IBM", "ICAgile", "Carnegie Mellon", "Leading enterprise agentic AI development", "Heinz College", "Finishing this fall", "Partners", "Johns Hopkins", "CDC", "Big Cities Health Coalition", "Bloomberg", "UT Austin", "St. Edward's", "Gartner", "Quisitive", "AWS", "Anthropic", "OpenAI"] },
    ],
  },
];
