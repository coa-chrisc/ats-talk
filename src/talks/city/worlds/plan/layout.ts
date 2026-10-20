/**
 * The plan world (Part 3 from slide 18 to 21a) on one plane the size of the
 * stage: what every slide's layout shares. Each slide's own layout is in its
 * own module (layout-goals.ts for 18 and 19, layout-program-team.ts for 19a,
 * layout-lift-developers.ts for 19b, layout-roadmap.ts for 20,
 * layout-knowledge.ts for 20a, layout-readiness.ts for 20b and 21,
 * layout-residents.ts for 21a). Every word is read from the script; a title's
 * line break is given by the word it falls after. Every id starts with its
 * picture's id, and each slide's picture is gathered under two ids, its marks
 * and its HTML (its story lines among them), so the next slide's click puts
 * the whole of it away in one move. Colour follows docs/bchc-brand.md: words
 * and outlines in navy, green for the AI at work, orange only where a person
 * approves, a deep-green tick only where a check passed, grey for a loss.
 */
import { CONTENT_TOP, STORY, box, type Box, type Point, type StoryBand } from "@/components/deck/kit";
import { breakAfter, pictureOf, shown } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("plan");

/** The stage's lowest safe line, 24 px clear of the footer and slide number (y > 1016), and its left and right edges: nothing is drawn outside them. */
export const SAFE_BOTTOM = 1016 - 24;
export const SAFE = { left: STORY.x, right: STORY.x + STORY.w } as const;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;

/**
 * Titles too long for one line at 72 px inside x 1824, by the word each line
 * ends on. Each runs to two lines; 21a's fits on one.
 */
const BREAKS: Record<string, string[]> = {
  "north-star": ["Plan"],
  people: ["staff"],
  "program-team": ["together"],
  "lift-developers": ["developers"],
  roadmap: ["now,"],
  knowledge: ["them"],
  readiness: ["habits"],
  "built-to-last": ["three"],
};

export const titleKey = (pictureId: string) => `title.${pictureId}`;

export const TITLES = PICTURES.map((picture) => ({ picture: picture.id, key: titleKey(picture.id), lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])) }));

const BANDS = ["one", "two", "three"] as const satisfies readonly StoryBand[];

/** Each slide's story lines, one row each, in the band under its title (one, two or three title lines). */
export const STORIES = PICTURES.map((picture, i) => ({ picture: picture.id, id: storyId(picture.id), band: BANDS[TITLES[i].lines.length - 1], lines: picture.story }));

/** The band a slide's story lines sit in. */
export const bandOf = (pictureId: string): StoryBand => STORIES.find((entry) => entry.picture === pictureId)!.band;

/** How far under the kit's line a drawing starts, so the story lines have room above it. */
const BREATH = 32;

/** Where a slide's drawing may start: the kit's line under its story band, and a little more. */
export const contentTop = (pictureId: string) => CONTENT_TOP[bandOf(pictureId) as keyof typeof CONTENT_TOP] + BREATH;

/** How many elements carry each id that is on more than one: a title's lines. A chain times a staggered move by it. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.map((title) => [title.key, title.lines.length] as const));

/** A slide's whole picture as two parts: its marks (one SVG group) and its HTML (one layer). */
export const groupOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/** The words a slide's click shows, in the order the script gives them. */
export const labelsOf = (pictureId: string) => shown(pictureId, "play");

/** The words a slide's They see quotes, in order. */
export const quoted = (pictureId: string) => pictureOf(pictureId).see.flatMap((line) => [...line.matchAll(/"([^"]+)"/g)].map((match) => match[1]));

/* Measures every layout shares */

/** The kit's person at scale 1, and a line of 26 px label type. */
export const PERSON = { w: 48, h: 64 } as const;
export const LABEL_LINE = 32;
/** A label's width at 26 px, at 0.56 em a letter: a little wider than Geist sets it, so a box built from it always holds the words. */
export const labelWidth = (words: string) => Math.ceil(words.length * 26 * 0.56);

/** The kit's person at a scale, its top left corner at (x, y). */
export const personAt = (x: number, y: number, scale = 1): Box => box(x, y, Math.round(PERSON.w * scale), Math.round(PERSON.h * scale));

/** A label's box, set by its anchor point (vertically centred on it, as `Words` sets it). */
export const labelBox = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle"): Box => {
  const w = labelWidth(words);
  const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : at.x - w / 2;
  return box(Math.round(x), at.y - LABEL_LINE / 2, w, LABEL_LINE);
};

export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
