/**
 * The stands world (Part 4, slides 11 to 15) on one plane the size of the
 * stage: what every slide shares. Each slide's drawing is in its own module
 * (layout-track.ts, layout-control.ts, layout-exists.ts, layout-noticed.ts,
 * layout-infrastructure.ts, layout-fits.ts, layout-fleet.ts). Every word is
 * read from the script; a title's line break is given by the word it falls
 * after. Every id starts with its picture's id, and each picture's parts sit
 * under two ids, its marks and its HTML, so the next slide's click puts the
 * whole of it away in two moves.
 */
import { STORY, storyKeys, storyRows, type Box, type Point, type StoryBand } from "@/components/deck/kit";
import { breakAfter, storyOf as scriptStory } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("stands");

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
 * Where each title breaks, by the words a line ends on. Titles are set in
 * Geist Bold at 72 px and must end by x 1824, 1728 px from their left edge;
 * the widths in the comments are measured from the font's advances.
 */
const BREAKS: Record<string, string[]> = {
  /** 1374 and 893 px. */
  track: ["budget,"],
  /** 1505 and 1565 px. */
  control: ["control."],
  /** 1396 and 1082 px: after the second "has", not the first. */
  exists: ["it has"],
  /** 1352 and 1175 px. */
  noticed: ["already"],
  /** 1406 and 1432 px. */
  infrastructure: ["AI,"],
  /** 1065 and 1084 px. */
  fits: ["onto"],
  /** 1292 and 1368 px. */
  fleet: ["third of"],
};

export const TITLES = PICTURES.map((picture) => ({ picture: picture.id, key: titleKey(picture.id), lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])) }));
export const titleOf = (pictureId: string) => TITLES.find((title) => title.picture === pictureId)!;

const BANDS = ["one", "two", "three"] as const satisfies readonly StoryBand[];

/** Each slide's story lines, in the band under its title: one row each, as every line fits the band's 1728 px at 32 px (the longest, slide 12a's line A, is 1565 px). */
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

/* Sizes every slide uses */

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
/** A tag's words are measured closer (0.52), so a tag is not left with a long empty tail; the tests check its words still fit at that rate. */
export const tagWords = (text: string, size: number) => Math.ceil(text.length * size * 0.52);

export const round = (n: number) => Math.round(n * 100) / 100;
export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });

/** A tag: a label with a pointed left end and a hole, its height, the point's depth, the room from the point to the words and after them, and the words' size (the label size). */
export const TAG = { h: 36, point: 14, gap: 10, pad: 16, size: 26 } as const;
export const tagWidth = (text: string) => TAG.point + TAG.gap + tagWords(text, TAG.size) + TAG.pad;
/** Where a tag's hole is, from its box: near its point, on its middle line. */
export const holeOf = (at: Box): Point => ({ x: round(at.x + TAG.point * 0.85), y: at.y + at.h / 2 });
