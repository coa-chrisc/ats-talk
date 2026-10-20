/**
 * Slide 4a's places, in three zones left to right. Left: two bars on a
 * floor line, each named under the floor and captioned over its top, the
 * second 12 times the first. Middle: a person seated behind a desk, and on
 * the desk beside them a stack of pages, thin rules one over another, that
 * towers over the desk and the person, named over its top. Right: a funnel,
 * a wide mouth named over it narrowing to a small outlet, a person standing
 * under the outlet with the approval mark beside them and their words under
 * them; and under all of that, centred under the funnel, a large figure
 * with its caption under it.
 * Words are read from the script, by position.
 *
 * The drawing has y 548 to 992: every
 * zone names its subject on one line 24 px under the drawing's top, and
 * draws from 52 px under it.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { contentTop, figureRuns, layerOf } from "./layout";

const [MAY, SEPTEMBER, FEW, MANY, UNREAD, MODEL, PEOPLE, SHARE, DECISIONS] = shown("review", "play");

export const TOP = contentTop("review");
/** The line every zone's name sits on, and where every zone's drawing starts. */
const NAME_Y = TOP + 24;
const DRAW_TOP = TOP + 52;

/* Left: the two bars */

/** The floor the bars stand on; their names 30 px under it at the text size. */
const FLOOR_Y = 900;
/** The bars: 100 wide, 40 apart, from x 130; the taller from about the drawing's top to the floor, a whole number of twelfths, the shorter one twelfth of it. Each caption sits 28 px over its bar's top. */
export const BARS = { x: 130, w: 100, gap: 40, ratio: 12, nameGap: 30, captionGap: 28 } as const;
const TALL = BARS.ratio * Math.floor((FLOOR_Y - DRAW_TOP) / BARS.ratio);
const barAt = (i: number): Box => {
  const h = i === 0 ? TALL / BARS.ratio : TALL;
  return box(BARS.x + i * (BARS.w + BARS.gap), FLOOR_Y - h, BARS.w, h);
};

/* Middle: the desk and the stack */

/** The desk: its top at y 880 from x 520 to 900, its legs 40 px; the person seated behind it at its left, 56 by 96, their foot on the desk's line. */
const DESK = { x0: 520, x1: 900, y: 880, legs: 40, inset: 24 } as const;
const SEATED = box(560, DESK.y - 96, 56, 96);
/** The stack: pages 180 wide from x 680, one every 8 px from just over the desk to the drawing's top, so it stands twice the person's height. */
export const STACK = { x: 680, w: 180, pitch: 8 } as const;
const PAGES = Math.floor((DESK.y - 8 - DRAW_TOP) / STACK.pitch) + 1;

/* Right: the funnel, the person at its outlet, and the figure */

/** The funnel: a mouth 460 wide from x 1180 at the drawing's top, centred in the zone right of the stack, 90 px down to an outlet 56 wide, a spout 18 px under it. */
export const FUNNEL = { x0: 1180, x1: 1640, outlet: 56, depth: 90, spout: 18 } as const;
const FUNNEL_C = (FUNNEL.x0 + FUNNEL.x1) / 2;
const OUTLET_Y = DRAW_TOP + FUNNEL.depth;
/** The person stands 10 px under the spout, 40 by 64; the mark beside them, 50 px right of their middle; their words 28 px under their foot, at the label size. */
const STANDING = box(FUNNEL_C - 20, OUTLET_Y + FUNNEL.spout + 10, 40, 64);
const MARK: Point = { x: FUNNEL_C + 50, y: STANDING.y + STANDING.h / 2 };
/**
 * The figure: the digits at 112 px and its word at 40 px, centred under the
 * funnel by its width measured wide (about 340 px), its baseline 110 px
 * under the person's words so its numerals clear them by about 20 px; its
 * caption 38 px under it at the label size, its foot 18 px over the
 * drawing's foot.
 */
export const FIGURE = { half: 168, size: 112, small: 40, drop: 110, captionGap: 38 } as const;
const PEOPLE_Y = STANDING.y + STANDING.h + 28;
const FIGURE_X = FUNNEL_C - FIGURE.half;
const FIGURE_BASE = PEOPLE_Y + FIGURE.drop;

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
      caption: { key: `review.bar.${i}.caption`, text: caption, at: { x, y: at.y - BARS.captionGap } as Point },
    };
  }),
  desk: { key: "review.desk", ...DESK },
  seated: { key: "review.seated", at: SEATED },
  stack: {
    pages: Array.from({ length: PAGES }, (_, i) => ({ key: `review.page.${i}`, x0: STACK.x, x1: STACK.x + STACK.w, y: DESK.y - 8 - i * STACK.pitch })),
    name: { key: "review.unread", text: UNREAD, at: { x: STACK.x + STACK.w / 2, y: NAME_Y } as Point },
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
  people: { key: "review.people", text: PEOPLE, at: { x: FUNNEL_C, y: PEOPLE_Y } as Point },
  figure: {
    key: "review.figure",
    text: SHARE,
    runs: figureRuns(SHARE),
    at: { x: FIGURE_X, y: FIGURE_BASE } as Point,
    caption: { key: "review.figure.caption", text: DECISIONS, at: { x: FIGURE_X, y: FIGURE_BASE + FIGURE.captionGap } as Point },
  },
};
