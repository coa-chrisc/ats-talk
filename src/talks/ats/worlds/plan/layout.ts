/**
 * The plan world (Part 3 from slide 13 to 15) on one plane the size of the
 * stage: what every slide's layout shares. Each slide's own places are in
 * its own module (layout-lanes.ts, layout-level-up.ts, layout-outcomes.ts).
 * Every word is read from the script; a title's line break is given by the
 * word it falls after. Every id starts with its picture's id, and each
 * picture's parts sit under two ids, its marks and its HTML (its story lines
 * among them), so the next slide's click puts the whole of it away in two
 * moves. Colour follows docs/aph-brand-reference.md and the script's colour
 * cues (pl.css): green for the City's own work, indigo for the course's
 * evidence, grey for what is left behind.
 */
import { STORY, box, storyRows, type Box, type Point, type StoryBand } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("plan");

/** The room a drawing keeps from the story band's last line above it and from the frame's foot below it, so neither reads as part of it. */
export const ROOM = 40;
/** The frame's safe area ends at 1016, its footer under it (frame.css). */
const FRAME_FOOT = 1016;
/** The story band's left and right edges, and the lowest line a drawing may reach. */
export const SAFE = { left: STORY.x, right: STORY.x + STORY.w, bottom: FRAME_FOOT - ROOM } as const;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;
export const titleKey = (pictureId: string) => `title.${pictureId}`;

/**
 * Where each title breaks, by the word a line ends on. At 72 px Geist bold a
 * line holds about 1728 px: slide 13's title splits into two lines of about
 * 1460 and 1630 px, slide 14's of about 1310 and 1450, slide 15's of about
 * 1480 and 1500.
 */
const BREAKS: Record<string, string[]> = {
  lanes: ["and"],
  "level-up": ["has,"],
  outcomes: ["every"],
};

export const TITLES = PICTURES.map((picture) => ({ picture: picture.id, key: titleKey(picture.id), lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])) }));

const BANDS = ["one", "two", "three"] as const satisfies readonly StoryBand[];

/** Each slide's story lines, one row each in the band under its title: every line here is under 1500 px at 32 px. */
export const STORIES = PICTURES.map((picture, i) => ({ picture: picture.id, id: storyId(picture.id), band: BANDS[TITLES[i].lines.length - 1] as StoryBand, lines: picture.story }));

const bandEntry = (pictureId: string) => STORIES.find((entry) => entry.picture === pictureId)!;
export const bandOf = (pictureId: string) => bandEntry(pictureId).band;
/** Where a slide's story band ends: a row's pitch under its last row's top. */
export const bandFoot = (pictureId: string) => storyRows(bandEntry(pictureId).band, bandEntry(pictureId).lines.length).at(-1)!.y + STORY.pitch;
/** Where a slide's drawing may start: the room's width under its story band (556 under each slide's two-line title). */
export const contentTop = (pictureId: string) => bandFoot(pictureId) + ROOM;

/** How many elements carry each id on more than one: a title's lines. A chain times a staggered move by it. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.map((title) => [title.key, title.lines.length] as const));

/** A picture's two parts: its marks (one SVG group) and its HTML (one layer, its story lines in it). */
export const groupOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/** The words a slide's click shows, in the order the script gives them. */
export const labelsOf = (pictureId: string) => shown(pictureId, "play");

/* Sizes every slide uses */

/** A line of the 26 px label type is this tall. */
export const LABEL_LINE = 32;
/**
 * Roughly how wide a run of words is at a size. Measured in Geist, a 26 px
 * label runs 0.47 to 0.61 of its size a letter ("Government" at 600 is the
 * widest); 0.62 keeps every box built from it wide enough. Nothing is
 * measured in the browser.
 */
export const wordsWidth = (text: string, size = 26) => Math.ceil(text.length * size * 0.62);

/** A label's box, centred on its point up and down as `Words` sets it, and placed across by its anchor. */
export const labelBox = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle", size = 26, line = LABEL_LINE): Box => {
  const w = wordsWidth(text, size);
  const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : at.x - w / 2;
  return box(Math.round(x), at.y - line / 2, w, line);
};

/** The kit's person at scale 1. */
export const PERSON = { w: 48, h: 64 } as const;

/** A tag: a label in a box with a pointed end. Its height, the point's depth, and the room before and after the words. */
export const TAG = { h: 44, point: 16, pad: 18 } as const;
/** A tag's width for its words: the point, the words, room either side. */
export const tagWidth = (text: string) => TAG.point + 2 * TAG.pad + wordsWidth(text);

export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
export const round = (n: number) => Math.round(n * 100) / 100;
