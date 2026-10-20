/**
 * The brought world (Part 1, slides 1 and 2) on one plane the size of the
 * stage: what both slides share. Slide 1's own places (the navy title page)
 * are here too; slide 2's drawing is in its own module
 * (layout-four-ideas.ts). Every word is read from the script; a title's
 * line break is given by the word it falls after. Every id starts with its
 * picture's id, and each picture's parts sit under two ids, its marks and
 * its HTML, so the next slide's click puts the whole of it away in two
 * moves.
 */
import { STAGE, STORY, storyKeys, storyRows, type StoryBand } from "@/components/deck/kit";
import { breakAfter, storyOf as scriptStory } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("brought");

/** The room a drawing keeps under its story band's last line, so the two never read as one. */
export const ROOM = 32;
/** The frame's safe area ends at 1016 (frame.css); a drawing stops this far above it, clear of the footer. */
export const FOOT_ROOM = 24;
export const SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w } as const;
/** The lowest line any drawing reaches. */
export const DRAW_FOOT = SAFE.bottom - FOOT_ROOM;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;
export const titleKey = (pictureId: string) => `title.${pictureId}`;

/**
 * Where each title breaks, by the word a line ends on. Slide 1 is set at
 * 108 px across the middle of the stage and takes three lines (about 1130,
 * 1090 and 1200 px in Geist Bold). Slide 2 is set at 72 px and breaks at
 * its first sentence's end: its second line runs about 1720 px, inside the
 * band's 1728.
 */
const BREAKS: Record<string, string[]> = {
  title: ["City:", "and"],
  "four-ideas": ["ideas."],
};

export const TITLES = PICTURES.map((picture) => ({ picture: picture.id, key: titleKey(picture.id), lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])) }));
export const titleOf = (pictureId: string) => TITLES.find((title) => title.picture === pictureId)!;

const BANDS = ["one", "two", "three"] as const satisfies readonly StoryBand[];

/** The white slide's story lines, in the band under its title: one row each, as each line fits the band's 1728 px at 32 px. */
export const STORIES = PICTURES.slice(1).map((picture) => ({
  picture: picture.id,
  id: storyId(picture.id),
  band: BANDS[titleOf(picture.id).lines.length - 1] as StoryBand,
  lines: picture.story,
}));

const bandOf = (pictureId: string) => STORIES.find((entry) => entry.picture === pictureId)!;
/** Where a slide's story band ends: a row's pitch under its last row's top. */
export const bandFoot = (pictureId: string) => storyRows(bandOf(pictureId).band, bandOf(pictureId).lines.length).at(-1)!.y + STORY.pitch;
/** Where a slide's drawing may start: the room's height under its story band. */
export const contentTop = (pictureId: string) => bandFoot(pictureId) + ROOM;

/** A picture's two parts: its marks (one SVG group) and its HTML (one layer, its story lines in it). */
export const layerOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/** A picture's story line ids, A then B. */
export const storyKeysOf = (pictureId: string) => storyKeys(storyId(pictureId), scriptStory(pictureId).length);

/* Slide 1 on navy */

/**
 * Slide 1: the title set at 108 px and centred on the stage on three lines,
 * the deck's short green rule under it, then the two story lines centred
 * under that: line A at 40 px, broken after the speakers' department, as
 * it runs to about 1800 px on one line; line B at the story size on one
 * line (about 1400 px). The block, title top to line B's foot, sits on the
 * stage's middle a little high, as a title page's optical middle does.
 */
const DISPLAY_LINE = 112;
const OPENING_TOP = 214;
const RULE_GAP = 36;
const RULE = { w: 140, h: 6 };
const STORY_GAP = 52;
/** Line A's rows (40 px on a 1.3 line) and line B's (the story size on its 48 px row), and the room between the two lines. */
export const LEAD_LINE = 52;
export const CREDIT_LINE = 48;
const LINE_GAP = 22;
const LEAD_BREAKS = ["Services,"];

const ruleY = OPENING_TOP + titleOf("title").lines.length * DISPLAY_LINE + RULE_GAP;
const [LEAD_KEY, CREDIT_KEY] = storyKeysOf("title");
const leadLines = breakAfter(scriptStory("title")[0], ...LEAD_BREAKS);
const creditLines = [scriptStory("title")[1]];
const leadY = ruleY + RULE.h + STORY_GAP;
const creditY = leadY + leadLines.length * LEAD_LINE + LINE_GAP;

export const OPENING = {
  ...layerOf("title"),
  title: { key: titleKey("title"), y: OPENING_TOP, lines: titleOf("title").lines, line: DISPLAY_LINE },
  rule: { key: "title.rule", x: (STAGE.w - RULE.w) / 2, y: ruleY, ...RULE },
  lead: { key: LEAD_KEY, y: leadY, lines: leadLines },
  credit: { key: CREDIT_KEY, y: creditY, lines: creditLines, foot: creditY + creditLines.length * CREDIT_LINE },
};

/** How many elements carry each id that more than one does: a title's lines, and slide 1's line A. A move's stagger runs across all of them. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(
  [...TITLES.map((title) => [title.key, title.lines.length] as const), [LEAD_KEY, leadLines.length] as const, [CREDIT_KEY, creditLines.length] as const].filter(([, count]) => count > 1),
);

/* Sizes slide 2 uses */

/** A line of the 26 px label type is this tall, and a line of the 32 px text. */
export const LABEL_LINE = 32;
export const TEXT_LINE = 45;

/**
 * Roughly how wide a run of words is set in Geist at a size: its average
 * letter at 0.56 of the size, a little over the measured 0.46 to 0.52 for
 * safety. Only the layout tests and the boxes that hold words are sized by
 * it; nothing is measured in the browser.
 */
export const wordsWidth = (text: string, size: number) => Math.ceil(text.length * size * 0.56);
