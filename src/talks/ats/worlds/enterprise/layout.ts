/**
 * The enterprise world (Part 2, slides 3 to 6) on one plane the size of the
 * stage: what every slide shares. Each slide's own places are in its own
 * module (layout-spending.ts, layout-agents.ts, layout-review.ts, layout-fleet.ts,
 * layout-stumbled.ts). Every word is read from the script; a title's line
 * break is given by the word it falls after. Every id starts with its
 * picture's id, and each picture's parts sit under two ids, its marks and
 * its HTML, so the next slide's click puts the whole of it away in two
 * moves.
 */
import { STORY, storyKeys, storyRows, type Box, type Point, type StoryBand } from "@/components/deck/kit";
import { breakAfter, storyOf as scriptStory } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("enterprise");

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
 * Where each title breaks, by the word a line ends on. At 72 px bold a line
 * holds the band's 1728 px (measured in Geist from the font's advance
 * widths with the kit's tracking, less the 2 per cent the browser kerns
 * away): slide 3 breaks at its first sentence's end (about 1485 and 1620
 * px); slide 4 at its first sentence's end (about 1010 and 1430 px); slide
 * 4a after its second sentence's first word, since that sentence alone runs
 * about 1825 px (about 1570 and 1570 px); slide 5 at its second comma
 * (about 1615 and 1270 px); slide 6 at its colon (about 1390 and 1315 px).
 */
const BREAKS: Record<string, string[]> = {
  spending: ["tripled."],
  agents: ["question."],
  review: ["Agents"],
  "fleet-defined": ["job,"],
  stumbled: ["cause:"],
};

export const TITLES = PICTURES.map((picture) => ({ picture: picture.id, key: titleKey(picture.id), lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])) }));
export const titleOf = (pictureId: string) => TITLES.find((title) => title.picture === pictureId)!;

const BANDS = ["one", "two", "three"] as const satisfies readonly StoryBand[];

/** Each slide's story lines, in the band under its title: one row each, as every line here fits the band's 1728 px at 32 px (the longest about 1560 px). */
export const STORIES = PICTURES.map((picture) => ({
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

/** How many elements carry each id that more than one does: a title's lines. A move's stagger runs across all of them. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.map((title) => [title.key, title.lines.length] as const).filter(([, count]) => count > 1));

/* Sizes every slide uses */

/** A line of the 26 px label type is this tall, a line of the 32 px text, and a line of the 24 px tag type. */
export const LABEL_LINE = 32;
export const TEXT_LINE = 45;
export const TAG_LINE = 30;

/**
 * Roughly how wide a run of words is set in Geist at a size: its average
 * letter at 0.56 of the size, a little over the measured 0.46 to 0.52 for
 * safety. Only the layout tests and the boxes that hold words are sized by
 * it; nothing is measured in the browser.
 */
export const wordsWidth = (text: string, size: number) => Math.ceil(text.length * size * 0.56);

/**
 * How many lines a run of words wraps to at a size in a column this wide,
 * word by word, its average letter at half the size: Geist at weight 500
 * sets these labels at 0.48 to 0.49 of the size (measured), so half is a
 * little over and still close enough to count lines by.
 */
export function linesIn(text: string, size: number, width: number): number {
  const letter = size / 2;
  let lines = 1;
  let run = 0;
  for (const word of text.split(" ")) {
    const w = word.length * letter;
    if (run === 0) run = w;
    else if (run + letter + w <= width) run += letter + w;
    else {
      lines += 1;
      run = w;
    }
  }
  return lines;
}

export const round = (n: number) => Math.round(n * 100) / 100;
export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });

/**
 * A large figure, a number and the words round it (`Over`, `percent`): the
 * number at `size`, the words at `small`, on one baseline. The number is
 * what reads first; the words say what it counts.
 */
export type FigureRun = { text: string; big: boolean };
/** A figure's label cut into its runs: anything before the number, the number (a decimal point in it kept), and what follows, each run keeping its own spaces. */
export function figureRuns(label: string): FigureRun[] {
  const match = label.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) throw new Error(`"${label}" holds no number.`);
  const [, before, digits, after] = match;
  return [...(before ? [{ text: before, big: false }] : []), { text: digits, big: true }, ...(after ? [{ text: after, big: false }] : [])];
}
/** A run's width, erring wide: a digit of Geist Bold at 0.7 of its size, the words as any label. */
export const runWidth = (run: FigureRun, size: number, small: number) => Math.ceil(run.big ? run.text.length * size * 0.7 : wordsWidth(run.text, small));
/** A figure's width on one baseline, erring wide. */
export const figureWidth = (runs: readonly FigureRun[], size: number, small: number) => runs.reduce((sum, run) => sum + runWidth(run, size, small), 0);
/** How far a figure's numerals rise above its baseline: Geist's cap height, 0.71 of the size, rounded up. */
export const capOf = (size: number) => Math.ceil(size * 0.72);
