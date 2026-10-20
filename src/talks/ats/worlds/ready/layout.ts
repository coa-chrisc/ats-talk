/**
 * The ready world (Part 4, slides 16 to 20) on one plane the size of the
 * stage: what every slide's layout shares. Each slide's own places are in
 * its own module (layout-levels.ts, layout-who-decides.ts,
 * layout-residents.ts, layout-decisions.ts, layout-close.ts). Every word is
 * read from the script, a label by its place in its step's `show`, and a
 * title's line break by the word it falls after. Each white slide's picture
 * is gathered under two ids, its marks and its HTML (its story lines among
 * them), so the next slide's click puts the whole of it away in one move.
 * Colour follows docs/aph-brand-reference.md through the kit's role aliases
 * (ready.css).
 */
import { STORY, box, storyRows, type Box, type Point, type StoryBand } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("ready");

/** The close's id: it sets its own title and story (layout-close.ts). */
export const CLOSE_ID = "lets-talk";

/** The room a drawing keeps under the story band's last row, so the story never reads as part of the picture. */
export const ROOM = 32;
/** The frame's footer and number start under 1016 (frame.css); a drawing stops 24 px over that line. */
export const FLOOR = 1016 - 24;
/** The safe area: under the wordmark, over the floor, inside the story band's width. */
export const SAFE = { top: 64, bottom: FLOOR, left: STORY.x, right: STORY.x + STORY.w } as const;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;
export const titleKey = (pictureId: string) => `title.${pictureId}`;

/**
 * Titles too long for one line at 72 px inside x 1824, by the word each line
 * ends on. Set in Geist bold, the longest line here (slide 17's first) is
 * about 1700 px, inside the 1728 px field. Slides 16, 17 and 19 take two
 * lines; 18 fits on one.
 */
const BREAKS: Record<string, string[]> = {
  levels: ["own,"],
  "who-decides": ["decides"],
  decisions: ["this,"],
};

/** The white slides' titles, at the field's top left; the close sets its own. */
export const TITLES = PICTURES.filter((picture) => picture.id !== CLOSE_ID).map((picture) => ({
  picture: picture.id,
  key: titleKey(picture.id),
  lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])),
}));

const BANDS = ["one", "two", "three"] as const satisfies readonly StoryBand[];

/** Each white slide's story lines, one row each, in the band under its title. */
export const STORIES = TITLES.map((title) => ({
  picture: title.picture,
  id: storyId(title.picture),
  band: BANDS[title.lines.length - 1] as StoryBand,
  lines: PICTURES.find((picture) => picture.id === title.picture)!.story,
}));

const storyEntry = (pictureId: string) => {
  const entry = STORIES.find((band) => band.picture === pictureId);
  if (!entry) throw new Error(`No story band for "${pictureId}".`);
  return entry;
};
/** Where a slide's story band ends: a row's pitch under its last row's top. */
export const bandFoot = (pictureId: string) => storyRows(storyEntry(pictureId).band, storyEntry(pictureId).lines.length).at(-1)!.y + STORY.pitch;
/** Where a slide's drawing may start: the room's width under its story band. */
export const contentTop = (pictureId: string) => bandFoot(pictureId) + ROOM;

/** How many elements carry each id that is on more than one: a title's lines. A chain times a staggered move by it. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.map((title) => [title.key, title.lines.length] as const));

/** A slide's whole picture as two parts: its marks (one SVG group) and its HTML (one layer). */
export const groupOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/** The words a slide's click shows, in the order the script gives them. */
export const labelsOf = (pictureId: string) => shown(pictureId, "play");

/* Measures every layout shares */

/** A line of the 26 px label type is this tall, and a line of the 32 px text. */
export const LABEL_LINE = 32;
export const TEXT_LINE = 45;

/**
 * Roughly how wide a run of words is set in Geist at a size: its average
 * letter at 0.56 of the size, a little over what Geist sets, so a box built
 * from it always holds the words. Nothing is measured in the browser.
 */
export const wordsWidth = (text: string, size = 26) => Math.ceil(text.length * size * 0.56);

/** A run of words' box, set about a point by its anchor, one line of its size tall, centred on the point up and down. */
export const wordsBox = (at: Point, text: string, size = 26, anchor: "start" | "middle" | "end" = "middle"): Box => {
  const w = wordsWidth(text, size);
  const line = size === 26 ? LABEL_LINE : TEXT_LINE;
  const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : at.x - w / 2;
  return box(Math.round(x), at.y - line / 2, w, line);
};

/** The kit's person at scale 1, and the person at a scale, its top left corner at (x, y). */
export const PERSON = { w: 48, h: 64 } as const;
export const personAt = (x: number, y: number, scale = 1): Box => box(x, y, Math.round(PERSON.w * scale), Math.round(PERSON.h * scale));

export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });

/**
 * A grey tag: a label with a pointed left end and a hole by the point, its
 * height, the point's depth, the room from the point to the words and after
 * them. Its width is set by its words.
 */
export const TAG = { h: 40, point: 16, gap: 14, pad: 18 } as const;
export const tagWidth = (text: string) => TAG.point + TAG.gap + wordsWidth(text) + TAG.pad;
