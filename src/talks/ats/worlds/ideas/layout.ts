/**
 * The ideas world (Part 3, slides 7 to 10) on one plane the size of the
 * stage: what every slide shares. Each slide's own places are in its own
 * module (layout-ladder.ts, layout-enforce.ts, layout-people.ts,
 * layout-earn.ts). Every word is read from the script; a title's line
 * break is given by the word it falls after. Every id starts with its
 * picture's id, and each picture's parts sit under two ids, its marks and
 * its HTML, so the next slide's click puts the whole of it away in two
 * moves. Colour follows docs/aph-brand-reference.md (ideas.css).
 */
import { STORY, storyRows, type Box, type Point, type StoryBand } from "@/components/deck/kit";
import { breakAfter } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("ideas");

/** The room a drawing keeps from the story band's last line above it and from the frame's foot below it, so neither reads as part of it. */
export const ROOM = 40;
/** The frame's safe area ends at 1016, its footer under it (frame.css, frame.test.ts). */
const FRAME_FOOT = 1016;
/** The stage's left and right edges (the story band's), and the lowest line a drawing may reach. */
export const SAFE = { left: 96, right: 1824, bottom: FRAME_FOOT - ROOM } as const;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;
export const titleKey = (pictureId: string) => `title.${pictureId}`;

/**
 * Where each title breaks, on two lines each. At 72 px bold a line holds
 * 1728 px, the band's width (measured in Geist bold with the title's
 * tracking): slides 7, 8 and 9 break after the lesson's number, their first
 * sentence (402 and 1585 px, 408 and 1704 px, 460 and 1659 px); slide 10's
 * second sentence is too long for a line, so it breaks at the comma inside
 * it (1513 and 1327 px).
 */
const BREAKS: Record<string, string[]> = {
  ladder: ["one."],
  enforce: ["two."],
  people: ["three."],
  earn: ["small,"],
};

export const TITLES = PICTURES.map((picture) => ({ picture: picture.id, key: titleKey(picture.id), lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])) }));

const BANDS = ["one", "two", "three"] as const satisfies readonly StoryBand[];

/** Each slide's story lines, in the band under its title: one row each, as every line here fits the band's 1728 px at 32 px. */
export const STORIES = PICTURES.map((picture, i) => ({
  picture: picture.id,
  id: storyId(picture.id),
  band: BANDS[TITLES[i].lines.length - 1] as StoryBand,
  lines: picture.story,
}));

const bandEntry = (pictureId: string) => STORIES.find((entry) => entry.picture === pictureId)!;
export const bandOf = (pictureId: string) => bandEntry(pictureId).band;
/** Where a slide's story band ends: a row's pitch under its last row's top. */
export const bandFoot = (pictureId: string) => storyRows(bandEntry(pictureId).band, bandEntry(pictureId).lines.length).at(-1)!.y + STORY.pitch;
/** Where a slide's drawing may start: the room's width under its story band. */
export const contentTop = (pictureId: string) => bandFoot(pictureId) + ROOM;

/** How many elements carry each id on more than one: a title's lines. A chain times a staggered move by it. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.map((title) => [title.key, title.lines.length] as const));

/** A picture's two parts: its marks (one SVG group) and its HTML (one layer, its story lines in it). */
export const layerOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/* Sizes every slide uses */

/** A line of the 26 px label type is this tall, a line of the 32 px text, and a line of the 24 px tag type. */
export const LABEL_LINE = 32;
export const TEXT_LINE = 45;
export const TAG_LINE = 30;

/**
 * Roughly how wide a run of words is set in Geist at a size: its average
 * letter at 0.56 of the size, a little over for safety. Only boxes that
 * hold words are checked by it; nothing is measured in the browser.
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

export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
export const round = (n: number) => Math.round(n * 100) / 100;

/** A run of words set in HTML: its id, words, and the box its top left and width give it (it wraps inside that width). */
export type Note = { key: string; text: string; at: Box };
export const note = (key: string, text: string, x: number, y: number, w: number, lines = 1, line = LABEL_LINE): Note => ({ key, text, at: { x, y, w, h: lines * line } });
