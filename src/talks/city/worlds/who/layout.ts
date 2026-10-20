/**
 * The who world (Part 1, slides 1 to 3) on one plane the size of the
 * stage: every slide's title and story band, and slide 1's own place on the
 * navy ground. Slide 2's timeline is in layout-career.ts and slide 3's
 * cards in layout-learning.ts. Every word is read from the script; a line
 * break is given by the word it falls after. Every id starts with its
 * picture's id, so what a slide leaves behind is easy to name.
 */
import { STAGE, storyKeys, type StoryBand } from "@/components/deck/kit";
import { breakAfter, storyOf } from "../../script/find";
import { picturesOf, storyId } from "../steps";

export const PICTURES = picturesOf("who");

/** A white-ground title's top left, as every deck slide sets it. */
export const TITLE = { x: 96, y: 152 };
export const titleKey = (pictureId: string) => `title.${pictureId}`;

/**
 * Where each title breaks, by the word a line ends on. Slide 1's is set at
 * 108 px, so it breaks before it would run past a centred column; slides 2
 * and 3 are set at 72 px and would run past x 1824 on one line.
 */
const BREAKS: Record<string, string[]> = {
  title: ["AI"],
  career: ["Dell"],
  learning: ["credentials"],
};

export const TITLES = PICTURES.map((picture) => ({ picture: picture.id, key: titleKey(picture.id), lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])) }));
export const titleOf = (pictureId: string) => TITLES.find((title) => title.picture === pictureId)!;

/** A white-ground slide's story band: under its title, one line or two (kit `Story`). */
export const bandOf = (pictureId: string): StoryBand => (titleOf(pictureId).lines.length > 1 ? "two" : "one");

/** A picture's story line ids, A then B. */
export const storyKeysOf = (pictureId: string) => storyKeys(storyId(pictureId), storyOf(pictureId).length);

/**
 * Slide 1 on navy: the title set large and centred on the stage, the
 * deck's short green rule under it, and its two story lines centred under
 * that, line A at 40 px in the words' colour and line B at the story size
 * in the softer one. Each story line runs past the stage's width on one
 * line, so each is set on two: A after the speaker's home, B before what
 * the reorganization brings together. The block (title top to line B's
 * foot) is centred on the stage's middle, a little high, as a title page's
 * optical middle is.
 */
const DISPLAY_LINE = 112;
const OPENING_TOP = 252;
const RULE_GAP = 40;
const RULE = { w: 140, h: 6 };
const STORY_GAP = 56;
/** Line A's rows (40 px on a 1.3 line) and line B's (the story size on its 48 px row), and the room between the two lines. */
export const LEAD_LINE = 52;
export const CREDIT_LINE = 48;
const LINE_GAP = 24;
const LEAD_BREAKS = ["Health,"];
const CREDIT_BREAKS = ["bringing"];

const ruleY = OPENING_TOP + titleOf("title").lines.length * DISPLAY_LINE + RULE_GAP;
const [LEAD_KEY, CREDIT_KEY] = storyKeysOf("title");
const leadLines = breakAfter(storyOf("title")[0], ...LEAD_BREAKS);
const creditLines = breakAfter(storyOf("title")[1], ...CREDIT_BREAKS);
const leadY = ruleY + RULE.h + STORY_GAP;
const creditY = leadY + leadLines.length * LEAD_LINE + LINE_GAP;

export const OPENING = {
  title: { key: titleKey("title"), y: OPENING_TOP, lines: titleOf("title").lines, line: DISPLAY_LINE },
  rule: { key: "title.rule", x: (STAGE.w - RULE.w) / 2, y: ruleY, ...RULE },
  lead: { key: LEAD_KEY, y: leadY, lines: leadLines },
  credit: { key: CREDIT_KEY, y: creditY, lines: creditLines, foot: creditY + creditLines.length * CREDIT_LINE },
};

/** How many elements carry each id that more than one does: a title's lines, and slide 1's story lines. A move's stagger runs across all of them. */
export const TITLE_LINES: Record<string, number> = Object.fromEntries(
  [...TITLES.map((title) => [title.key, title.lines.length] as const), [LEAD_KEY, leadLines.length] as const, [CREDIT_KEY, creditLines.length] as const].filter(([, count]) => count > 1),
);
