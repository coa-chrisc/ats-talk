/**
 * Part 2 of the City talk, what Austin Public Health built (docs/city-talk-script.md,
 * slides 4 to 12a), on one plane the size of the stage: what every slide
 * shares. Each slide's own layout is in its own module (layout-start.ts,
 * layout-safe.ts, layout-weekly.ts, layout-turn.ts, layout-builds.ts,
 * layout-too-long.ts, layout-proof.ts, layout-rad-born.ts,
 * layout-rad-evolves.ts). Every word is read from the
 * script; a line break is given by the word it falls after.
 * Each slide's picture is gathered under two ids, its marks under the HTML
 * and its HTML (its story lines among them), so the next slide's click puts
 * the whole of it away in one move. Colour follows docs/bchc-brand.md: words
 * and outlines in navy (paper), the process and agents in green, the catalog
 * in indigo, problems in grey, and orange only where a person approves.
 */
import { CONTENT_TOP, STORY, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("built");

/** The stage's lowest safe line, 24 px clear of the footer and slide number (y > 1016), and its left and right edges: nothing is drawn outside them. */
export const SAFE_BOTTOM = 1016 - 24;
export const SAFE = { left: 96, right: 1824 } as const;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;

/**
 * Where each title breaks, by the word each line ends on. Geist bold at
 * 72 px sets about 50 characters in the 1728 px band, so every title here
 * takes two lines, and the two that cannot fit two take three: slides 5a
 * and 6. Each break keeps every line inside the band with room to spare,
 * measured in Geist, and falls where the sentence reads on.
 */
const BREAKS: Record<string, string[]> = {
  "starting-small": ["application"],
  safe: ["needed"],
  weekly: ["Security", "week"],
  "wrong-question": ["sandbox,", "wall"],
  "two-to-twenty": ["them,"],
  "rad-born": ["became"],
  "ai-builds": ["AI"],
  setup: ["again,"],
  "too-long": ["and"],
  "rad-evolves": ["is"],
  portfolio: ["across"],
  seen: ["boards"],
  recognition: ["country"],
  controls: ["application"],
};

export const titleKey = (pictureId: string) => `title.${pictureId}`;

export const TITLES = PICTURES.map((picture) => ({
  picture: picture.id,
  key: titleKey(picture.id),
  lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])),
}));

/** The story band under a title of one, two or three lines. */
const BANDS = ["one", "two", "three"] as const;

/** Each slide's story lines, in the band under its title, each line one row: the longest, about 1540 px at 32 px, fits the 1728 px band. */
export const STORIES = PICTURES.map((picture, i) => ({
  picture: picture.id,
  id: storyId(picture.id),
  band: BANDS[TITLES[i].lines.length - 1],
  lines: picture.story.map((line) => [line]),
}));

const storyOfPicture = (pictureId: string) => {
  const band = STORIES.find((entry) => entry.picture === pictureId);
  if (!band) throw new Error(`The built world has no picture "${pictureId}".`);
  return band;
};

/** The clear space between a slide's last story row and its drawing, so a label at the top of the drawing never reads as one more story line. */
export const CONTENT_GAP = 32;

/** Where a slide's drawing may start: the kit's CONTENT_TOP under two story rows, a row lower for each row more, and the content gap under that. */
export const contentTop = (pictureId: string) => {
  const band = storyOfPicture(pictureId);
  return CONTENT_TOP[band.band] + (band.lines.flat().length - 2) * STORY.pitch + CONTENT_GAP;
};

/** How many elements carry each title's id and each story line's: a chain times a staggered move by it. */
export const TEXT_COUNTS: Readonly<Record<string, number>> = Object.fromEntries([
  ...TITLES.map((title) => [title.key, title.lines.length] as const),
  ...STORIES.flatMap((band) => band.lines.map((rows, n) => [`${band.id}.${String.fromCharCode(97 + n)}`, rows.length] as const)),
]);

/** A slide's whole picture as two parts: its marks under the HTML, and its HTML. */
export const groupOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/** The labels a slide's click brings on, in the script's order: a layout takes them by position. */
export const labelsOf = (pictureId: string) => shown(pictureId, "play");

/** A line of 26 px label type is this tall; a line of 32 px text; a line of the 48 px key type. */
export const LABEL_LINE = 32;
export const LINE = 45;
export const KEY_LINE = 56;

export const round = (n: number) => Math.round(n * 10) / 10;
export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
export const keys = <T extends { key: string }>(list: readonly T[]) => list.map((entry) => entry.key);

/** Posts at even steps along a side, from `from` to `to`, both ends included: the centre of each. */
export function postsAlong(from: Point, to: Point, pitch: number): Point[] {
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const count = Math.max(1, Math.round(length / pitch));
  return Array.from({ length: count + 1 }, (_, i) => ({
    x: Math.round(from.x + ((to.x - from.x) * i) / count),
    y: Math.round(from.y + ((to.y - from.y) * i) / count),
  }));
}
