/**
 * Slide 4a's places, in four zones left to right. Left: two bars on a
 * floor line, the second 12 times the first, each named under the floor
 * at the text size and captioned over its top at the label size. Middle: a
 * person seated behind a desk, and on the desk beside them a stack of
 * pages, thin rules one over another, that towers over the desk and the
 * person, named over its top on two lines. Right: a funnel, a wide mouth
 * named over it narrowing to a small outlet, a person standing under the
 * outlet with the approval mark beside them and their words under them on
 * two lines. Last, on its own at the right edge, 60 px or more clear of
 * the funnel and its words: a large figure with its caption wrapping
 * under it. Words are read from the script, by position.
 *
 * The drawing has y 548 to 992: the bars' captions and the funnel's name
 * sit on one line 24 px under the drawing's top, the stack's name on two
 * lines from 8 px under it; the funnel draws from 52 px under it.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, contentTop, figureRuns, layerOf } from "./layout";

const [MAY, SEPTEMBER, FEW, MANY, UNREAD, MODEL, PEOPLE_WORDS, SHARE, DECISIONS] = shown("review", "play");

export const TOP = contentTop("review");
/** The line every zone's name sits on, and where every zone's drawing starts. */
const NAME_Y = TOP + 24;
const DRAW_TOP = TOP + 52;

/* Left: the two bars */

/** The floor the bars stand on; their names 30 px under it at the text size. */
const FLOOR_Y = 900;
/**
 * The bars: 100 wide, 270 apart, from the drawing's left edge; the taller
 * from about the drawing's top to the floor, a whole number of twelfths,
 * the shorter one twelfth of it. Each caption sits 28 px over its own
 * bar's top at the label size: the first set from its bar's left edge, so
 * it ends (about 330 px, 350 measured wide) clear of the second bar; the
 * second centred on its bar (about 300 px, 320 measured wide).
 */
export const BARS = { x: 96, w: 100, gap: 270, ratio: 12, nameGap: 30, captionGap: 28 } as const;
const TALL = BARS.ratio * Math.floor((FLOOR_Y - DRAW_TOP) / BARS.ratio);
const barAt = (i: number): Box => {
  const h = i === 0 ? TALL / BARS.ratio : TALL;
  return box(BARS.x + i * (BARS.w + BARS.gap), FLOOR_Y - h, BARS.w, h);
};

/* Middle: the desk and the stack */

/** The desk: its top at y 880 from x 716 to 1016, 40 px past the second bar's caption, its legs 40 px; the person seated behind it at its left, 56 by 96, their foot on the desk's line. */
const DESK = { x0: 716, x1: 1016, y: 880, legs: 40, inset: 24 } as const;
const SEATED = box(728, DESK.y - 96, 56, 96);
/**
 * The stack: pages 170 wide from x 830, one every 8 px from just over the
 * desk up to 84 px under the drawing's top, so it stands well over twice
 * the person's height. Its name wraps onto two lines of the label type in
 * a 300 px box centred on it, from 8 px under the drawing's top, its foot
 * 12 px over the top page.
 */
export const STACK = { x: 830, w: 170, pitch: 8, top: TOP + 84, nameW: 300, nameTop: TOP + 8, nameLines: 2 } as const;
const PAGES = Math.floor((DESK.y - 8 - STACK.top) / STACK.pitch) + 1;

/* Right: the funnel and the person at its outlet */

/** The funnel: a closed outline, a mouth 300 wide from x 1100, 35 px right of the stack's name, its sides 90 px down to a neck 48 wide and 18 px long. Its name (about 305 px, 350 measured wide) is centred over the mouth. */
export const FUNNEL = { x0: 1100, x1: 1400, outlet: 48, depth: 90, spout: 18 } as const;
const FUNNEL_C = (FUNNEL.x0 + FUNNEL.x1) / 2;
const OUTLET_Y = DRAW_TOP + FUNNEL.depth;
/** The person stands 10 px under the neck, 40 by 64; the mark beside them, 50 px right of their middle; their words on two lines of the label type in a 280 px box centred under them, 12 px under their foot. */
const STANDING = box(FUNNEL_C - 20, OUTLET_Y + FUNNEL.spout + 10, 40, 64);
const MARK: Point = { x: FUNNEL_C + 50, y: STANDING.y + STANDING.h / 2 };
export const PEOPLE = { w: 280, gap: 12, lines: 2 } as const;

/* Apart: the figure */

/**
 * The figure, in its own column from x 1484 to the drawing's right edge
 * (340 px, its digits at 112 px and its word at 40 px about 337 px
 * measured wide), 59 px clear of the funnel's name, the widest thing in
 * the funnel's zone. Its baseline sits 190 px under the drawing's top, so
 * the figure and its caption stand level with the funnel and the person
 * under it; the caption (about 1000 px of label type) wraps onto four
 * lines in the column, 12 px under the baseline, set from the column's
 * left edge as the figure is.
 */
export const FIGURE = { x: 1484, size: 112, small: 40, base: TOP + 190, captionGap: 12, captionLines: 4 } as const;
const FIGURE_W = SAFE.right - FIGURE.x;

export const REVIEW = {
  ...layerOf("review"),
  floor: { key: "review.floor", x0: BARS.x - 16, x1: BARS.x + 2 * BARS.w + BARS.gap + 16, y: FLOOR_Y },
  bars: [
    [MAY, FEW],
    [SEPTEMBER, MANY],
  ].map(([name, caption], i) => {
    const at = barAt(i);
    const x = at.x + at.w / 2;
    return {
      key: `review.bar.${i}`,
      at,
      name: { key: `review.bar.${i}.name`, text: name, at: { x, y: FLOOR_Y + BARS.nameGap } as Point },
      caption: { key: `review.bar.${i}.caption`, text: caption, at: { x: i === 0 ? at.x : x, y: at.y - BARS.captionGap } as Point, anchor: i === 0 ? ("start" as const) : ("middle" as const) },
    };
  }),
  desk: { key: "review.desk", ...DESK },
  seated: { key: "review.seated", at: SEATED },
  stack: {
    pages: Array.from({ length: PAGES }, (_, i) => ({ key: `review.page.${i}`, x0: STACK.x, x1: STACK.x + STACK.w, y: DESK.y - 8 - i * STACK.pitch })),
    name: { key: "review.unread", text: UNREAD, at: box(STACK.x + STACK.w / 2 - STACK.nameW / 2, STACK.nameTop, STACK.nameW, STACK.nameLines * LABEL_LINE) },
  },
  funnel: {
    key: "review.funnel",
    ...FUNNEL,
    top: DRAW_TOP,
    outletY: OUTLET_Y,
    centre: FUNNEL_C,
    name: { key: "review.model", text: MODEL, at: { x: FUNNEL_C, y: NAME_Y } as Point },
  },
  standing: { key: "review.standing", at: STANDING },
  mark: { key: "review.mark", at: MARK },
  people: { key: "review.people", text: PEOPLE_WORDS, at: box(FUNNEL_C - PEOPLE.w / 2, STANDING.y + STANDING.h + PEOPLE.gap, PEOPLE.w, PEOPLE.lines * LABEL_LINE) },
  figure: {
    key: "review.figure",
    text: SHARE,
    runs: figureRuns(SHARE),
    at: { x: FIGURE.x, y: FIGURE.base } as Point,
    caption: { key: "review.figure.caption", text: DECISIONS, at: box(FIGURE.x, FIGURE.base + FIGURE.captionGap, FIGURE_W, FIGURE.captionLines * LABEL_LINE) },
  },
};
