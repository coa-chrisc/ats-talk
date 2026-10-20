/**
 * Part 4, on one plane the size of the stage (docs/city-talk-script.md,
 * slides 22 to 24): what every slide of the world shares. Each slide's own
 * layout is in its own module (layout-work.ts, layout-fit.ts,
 * layout-close.ts). Every word is read from the script, a label by its
 * place in its step's `show`, and a title's line break by the word it falls
 * after. Each white slide's picture is gathered under two ids, its marks and
 * its HTML (its story lines among them), so the next slide's click puts the
 * whole of it away in one move. Colour follows docs/bchc-brand.md: words and
 * outlines in navy (paper), the process in green, and the close on navy.
 */
import { CONTENT_TOP, STORY, box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter } from "../../script/find";
import { picturesOf, storyId } from "../steps";

/** The pictures this world holds, in the script's order. */
export const PICTURES = picturesOf("fit");

/** Where the frame's footer and slide number start (frame.css). */
const FOOTER_TOP = 1034;
/** The lowest line a picture reaches: 40 px clear of the footer. */
export const FLOOR = FOOTER_TOP - 40;

/** The safe area: under the logo, over the floor, inside the story band's width. */
export const SAFE = { top: 64, bottom: FLOOR, left: STORY.x - 16, right: STORY.x + STORY.w } as const;

/* Titles and story lines */

export const TITLE = { x: 96, y: 152 } as const;

/**
 * Slides 22 and 23 run past the field on one line at 72 px, so each is set
 * on three, broken by the words given, the lines about as long as each
 * other. The close's title is one short line.
 */
const BREAKS: Record<string, string[]> = { "my-work": ["covered", "applications,"], fit: ["would", "work on"] };

export const titleKey = (pictureId: string) => `title.${pictureId}`;

/** The white slides' titles, at the field's top left; the close sets its own (layout-close.ts). */
export const TITLES = PICTURES.filter((picture) => picture.id !== "lets-talk").map((picture) => ({
  picture: picture.id,
  key: titleKey(picture.id),
  lines: breakAfter(picture.show, ...(BREAKS[picture.id] ?? [])),
}));

/** The story band under a title of one, two or three lines. */
const BANDS = ["one", "two", "three"] as const;

/** Each white slide's story lines, in the band under its title, each on one row. */
export const STORIES = TITLES.map((title) => ({
  picture: title.picture,
  id: storyId(title.picture),
  band: BANDS[title.lines.length - 1],
  lines: PICTURES.find((picture) => picture.id === title.picture)!.story,
}));

/** How much lower than the kit's line a drawing starts, so the story's last row has room to breathe over the picture. */
const UNDER_STORY = 32;

/** Where a white slide's drawing may start: the kit's line under its band, and the extra room under the story. */
export const contentTop = (pictureId: string) => CONTENT_TOP[STORIES.find((entry) => entry.picture === pictureId)!.band] + UNDER_STORY;

/** A slide's whole picture as two parts: its marks, and its HTML. */
export const groupOf = (pictureId: string) => ({ marks: `${pictureId}.marks`, html: `${pictureId}.html` });

/* Geometry */

export const round = (n: number) => Math.round(n * 10) / 10;
export const centreOf = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
/** A box grown by `pad` on every side. */
export const grow = (b: Box, pad: number): Box => box(b.x - pad, b.y - pad, b.w + 2 * pad, b.h + 2 * pad);
/** The smallest box holding all the boxes given. */
export const bounds = (boxes: readonly Box[]): Box => {
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  return box(x, y, Math.max(...boxes.map((b) => b.x + b.w)) - x, Math.max(...boxes.map((b) => b.y + b.h)) - y);
};

/**
 * Where the straight line from `a` to `b` crosses the edge of `edge`, a box
 * one of them is inside: so a line that joins two things starts and stops
 * just clear of each, on the line between their middles.
 */
export function edgePoint(a: Point, b: Point, edge: Box): Point {
  const inside = (p: Point) => p.x >= edge.x && p.x <= edge.x + edge.w && p.y >= edge.y && p.y <= edge.y + edge.h;
  const [from, to] = inside(a) ? [a, b] : [b, a];
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const exits = [
    dx > 0 ? (edge.x + edge.w - from.x) / dx : dx < 0 ? (edge.x - from.x) / dx : Infinity,
    dy > 0 ? (edge.y + edge.h - from.y) / dy : dy < 0 ? (edge.y - from.y) / dy : Infinity,
  ];
  const t = Math.min(...exits);
  return { x: round(from.x + t * dx), y: round(from.y + t * dy) };
}
