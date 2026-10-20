/**
 * Part 5, the backup slides (docs/city-talk-script.md, slides 25 to 35), on
 * one plane the size of the stage that the camera never moves: what every
 * slide shares. Each slide's own layout is in its group's module
 * (layout-tools.ts for 25 to 27, layout-rules.ts for 28 to 30,
 * layout-means.ts for 31 to 33, layout-catalog.ts for 34 and 35). Every word
 * is read from the script; a title's line break is given by the word it
 * falls after. Each slide's picture is gathered under two ids, its marks
 * under the HTML and its HTML (its story lines among them), so the next
 * slide's click puts the whole of it away in one move. Colour follows
 * docs/bchc-brand.md: words and outlines in navy, the process and the
 * agents' work in green, the catalog in indigo on slide 34 only, a deep
 * green tick only where a check passed, and grey for what waits or costs.
 */
import { CONTENT_TOP, STORY, box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, pictureOf, shown } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("backup");

/**
 * The stage's safe area: under the logo, more than 40 px clear of the
 * footer and the slide number (their type starts at y 1034), and inside the
 * story band's width.
 */
export const SAFE = { top: 64, bottom: 1034 - 42, left: 96, right: STORY.x + STORY.w } as const;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;

/**
 * Each title is set at the kit's 72 px and broken where it would run past
 * x 1824 (measured in Geist bold), at the word that balances the lines:
 * three lines for the four longest, two for most, one for slide 35.
 */
const BREAKS: Record<string, string[]> = {
  foresight: ["research and", "and scores"],
  grantscope: ["opportunities,", "federal bills"],
  amanda: ["lines of", "AMANDA system"],
  security: ["four layers,"],
  onesdlc: ["would fit"],
  charter: ["Sixth Draft,", "executive discussion"],
  costs: ["costs little,"],
  teaching: ["capability spreads"],
  "what-exists": ["would start"],
  "the-catalog": ["Coalition's"],
};

export const titleKey = (pictureId: string) => `title.${pictureId}`;

export const TITLES = PICTURES.map((picture) => ({
  picture: picture.id,
  key: titleKey(picture.id),
  lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])),
}));

/** The story band under a title of one, two or three lines. */
const BANDS = ["one", "two", "three"] as const;

/** Each slide's story lines, in the band under its title, each line on one row (the longest is 1446 px of the band's 1728). */
export const STORIES = PICTURES.map((picture, i) => ({
  picture: picture.id,
  id: storyId(picture.id),
  band: BANDS[TITLES[i].lines.length - 1],
  lines: picture.story.map((line) => [line]),
}));

/** How far under the kit's CONTENT_TOP a backup slide's drawing starts, so the second story row has air under it. */
export const CLEAR = 32;

/** Where a slide's drawing may start: the kit's CONTENT_TOP under its title's two story rows, and the clearance under that. */
export const contentTop = (pictureId: string) => CONTENT_TOP[STORIES.find((entry) => entry.picture === pictureId)!.band] + CLEAR;

/** How many elements carry each id that is on more than one: a title's lines. A chain times a staggered move by it. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.filter((title) => title.lines.length > 1).map((title) => [title.key, title.lines.length] as const));

/** A slide's whole picture as two parts: its marks under the HTML, and its HTML. */
export const groupOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/* Words */

/** The words a slide's They see quotes, in order. */
export const quoted = (pictureId: string) => pictureOf(pictureId).see.flatMap((line) => [...line.matchAll(/"([^"]+)"/g)].map((match) => match[1]));

/** A slide's labels, in the order its click brings them on: its step's `show`, read by position. */
export const labelsOf = (pictureId: string) => shown(pictureId, "play");

/** A line of 26 px label type is this tall, and a line of 32 px text. */
export const LABEL_LINE = 32;
export const LINE = 45;

/* Geometry */

export const round = (n: number) => Math.round(n * 10) / 10;
export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
/** A label's box centred on a point, `w` wide and one label line tall. */
export const labelAt = (c: Point, w: number, h: number = LABEL_LINE): Box => box(round(c.x - w / 2), round(c.y - h / 2), w, h);
/** The box round a set of boxes. */
export const bounds = (boxes: readonly Box[]): Box => {
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  return box(x, y, Math.max(...boxes.map((b) => b.x + b.w)) - x, Math.max(...boxes.map((b) => b.y + b.h)) - y);
};

/**
 * A tag: a few words in a rounded outline, its size fixed so it never
 * depends on a measured width. `solid` is a plain navy outline;
 * `projected` is a grey dashed outline (a figure not booked).
 */
export type TagKind = "solid" | "projected";
export const TAG_H = 48;
/** A tag's width for words of a given width in the 26 px label type (measured in Geist): 24 px of room each side. */
export const tagW = (words: number) => words + 48;
