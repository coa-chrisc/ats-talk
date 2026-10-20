/**
 * The method world (Part 3, slides 9 to 12) on one plane the size of the
 * stage: what every slide shares. Each slide's own places are in its own
 * module (layout-not-proposing.ts, layout-people.ts, layout-listen.ts,
 * layout-sort.ts). Every word is read from the script; a title's line break
 * is given by the word it falls after. Every id starts with its picture's
 * id, and each picture's parts sit under two ids, its marks and its HTML,
 * so the next slide's click puts the whole of it away in two moves. Colour follows the brand
 * roles (method.css).
 */
import { STORY, storyRows, type Box, type Point, type StoryBand } from "@/components/deck/kit";
import { breakAfter } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("method");

/** The room a drawing keeps from the story band's last line above it and from the frame's safe line below it. */
export const ROOM = 20;
/** The frame's safe area ends at 1016, its footer under it (frame.css). */
const FRAME_FOOT = 1016;
/** The story band's left and right edges, and the lowest line a drawing may reach. */
export const SAFE = { left: STORY.x, right: STORY.x + STORY.w, bottom: FRAME_FOOT - ROOM } as const;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;
export const titleKey = (pictureId: string) => `title.${pictureId}`;

/**
 * A title at 72 px fits one line inside x 1824 only up to about 1728 px of
 * Geist bold; each longer title names the word its first line ends on, so
 * every title here takes two lines.
 */
const BREAKS: Record<string, string[]> = {
  "not-proposing": ["buy an"],
  people: ["practitioner in"],
  listen: ["staff and"],
  sort: ["readiness,"],
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

const storyOf = (pictureId: string) => STORIES.find((entry) => entry.picture === pictureId)!;
export const bandOf = (pictureId: string) => storyOf(pictureId).band;
/** Where a slide's story band ends: a row's pitch under its last row's top. */
export const bandFoot = (pictureId: string) => storyRows(storyOf(pictureId).band, storyOf(pictureId).lines.length).at(-1)!.y + STORY.pitch;
/** Where a slide's drawing may start: the room's height under its story band. */
export const contentTop = (pictureId: string) => bandFoot(pictureId) + ROOM;

/** How many elements carry each id on more than one: a title's lines. A chain times a staggered move by it. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.map((title) => [title.key, title.lines.length] as const));

/** A picture's two parts: its marks (one SVG group) and its HTML (one layer, its story lines in it). */
export const layerOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/* Sizes every slide uses */

/** A line of the 26 px label type is this tall, and a line of the 32 px text. */
export const LABEL_LINE = 32;
export const TEXT_LINE = 45;

/**
 * Roughly how wide a run of words is set in Geist at a size: its average
 * letter at 0.56 of the size, a little over the measured widths for safety.
 * Only boxes that hold words are sized by it (a tag, a bubble); nothing is
 * measured in the browser.
 */
export const wordsWidth = (text: string, size: number) => Math.ceil(text.length * size * 0.56);

export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
export const round = (n: number) => Math.round(n * 100) / 100;
/** A point `r` from `c` at `deg` degrees, 0 to the right and 90 straight down, as the stage's y grows downward. */
export const polar = (c: Point, r: number, deg: number): Point => ({ x: round(c.x + r * Math.cos((deg * Math.PI) / 180)), y: round(c.y + r * Math.sin((deg * Math.PI) / 180)) });
