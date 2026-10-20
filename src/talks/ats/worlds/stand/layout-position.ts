/**
 * Slide 3's places: a running track seen from above, a long oval of two
 * lanes across the whole drawing width; a white start stripe across the
 * near straight, near its left end; a cluster of small runners far round
 * the lap, on the far straight, named under them in the infield; one large
 * runner at the start stripe, named right under it outside the track; the
 * grey tag centred in the infield; a fence post in the ground just outside
 * the track beside the start, its tick on its cap and its name to its
 * right; and the budget figure inside the infield at its right. Words are
 * read from the script, by position.
 *
 * Runners go round anticlockwise, as on any track: right along the near
 * (bottom) straight from the start, up the right bend, and left along the
 * far straight. So a runner on the far straight is more than half a lap on.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DRAW_FOOT, TAG, contentTop, figureRuns, layerOf, round, tagWidth } from "./layout";

const [ENTERPRISE, CITY, NO_STRATEGY, AUTHORIZED, SEVENTEEN, OF_BUDGETS] = shown("position", "play");

const TOP = contentTop("position");

/**
 * The oval's outer edge: the full drawing width, from x 96 to 1824, from
 * just under the story band to 344 px lower, so its bends are half circles
 * of radius 172. The two lanes together are 96 px wide; the inner edge is
 * the outer one inset by that, a smaller oval of radius 76, its infield
 * 152 px tall: room for the pack's name, the grey tag and the budget
 * figure, each in its own part of it.
 */
const OUTER = box(96, TOP + 16, 1728, 344);
const LANES = 96;
const R = OUTER.h / 2;
const INNER = box(OUTER.x + LANES, OUTER.y + LANES, OUTER.w - 2 * LANES, OUTER.h - 2 * LANES);
/** The line between the two lanes, halfway across them. */
const MIDDLE = box(OUTER.x + LANES / 2, OUTER.y + LANES / 2, OUTER.w - LANES, OUTER.h - LANES);

/** An oval (a stadium) as one path, drawn from the near straight's left end, rightwards, anticlockwise as the runners go: right along the bottom, up the right bend, left along the top, down the left bend. */
export const stadium = (b: Box): string => {
  const r = b.h / 2;
  const left = b.x + r;
  const right = b.x + b.w - r;
  const bottom = b.y + b.h;
  return `M${left} ${bottom}H${right}A${r} ${r} 0 0 0 ${right} ${b.y}H${left}A${r} ${r} 0 0 0 ${left} ${bottom}Z`;
};

/** The far straight's two lane centres. */
const FAR = { inner: INNER.y - LANES / 4, outer: OUTER.y + LANES / 4 };

/** The start line: a short white stripe across both lanes of the near straight, 48 px into it from where the left bend ends. */
const START_X = OUTER.x + R + 48;

/**
 * A runner's drawing is this tall, its foot at its point. A pack runner
 * stands in one lane (48 px); the home runner, the slide's subject, is more
 * than twice as tall and stands across both lanes of the near straight.
 */
export const RUNNER = { small: 34, large: 76 } as const;

/** The home runner just past the start stripe (its back foot 7 px clear of it), its foot 10 px inside the outer edge, its head inside the inner edge. */
const CITY_AT: Point = { x: START_X + 44, y: OUTER.y + OUTER.h - 10 };

/**
 * The enterprise cluster: seven runners bunched on the far straight, well
 * round the lap, two lanes deep, a little apart from each other in x, so
 * they read as a pack. On the far straight they run leftward, so they face
 * left.
 */
const PACK_X = [1040, 1086, 1132, 1178, 1063, 1109, 1155] as const;
const PACK_LANE = [FAR.outer, FAR.outer, FAR.outer, FAR.outer, FAR.inner, FAR.inner, FAR.inner] as const;
const PACK: Point[] = PACK_X.map((x, i) => ({ x, y: round(PACK_LANE[i] + RUNNER.small / 2) }));

/** The pack's name on the infield's top row, right under the pack. */
const ENTERPRISE_NAME: Point = { x: 1109, y: INNER.y + 26 };
/** The grey tag centred in the infield, under the pack's name's row. */
const NO_STRATEGY_AT = box(round(960 - tagWidth(NO_STRATEGY) / 2), INNER.y + 76, tagWidth(NO_STRATEGY), TAG.h);
/** The home runner's name right under it, outside the track. */
const CITY_NAME: Point = { x: CITY_AT.x, y: OUTER.y + OUTER.h + 30 };

/** The fence post: in the ground just outside the track, right of the home runner's name, its foot at the drawing's lowest line, nothing of it on the lane. */
const POST = { x: CITY_AT.x + 112, w: 18, top: OUTER.y + OUTER.h + 24, foot: DRAW_FOOT } as const;
/** The passed tick on the post's cap, clear of the track's edge. */
const TICK = { at: { x: POST.x + POST.w / 2, y: POST.top - 2 } as Point, r: 16 };
/** Its name to its right, level with the post's middle. */
const POST_NAME: Point = { x: POST.x + POST.w + 24, y: Math.round((POST.top + POST.foot) / 2) };

/** The budget figure inside the infield at its right, ending where the infield's right bend begins, its caption under it. */
export const BUDGET = { size: 96, small: 36 } as const;
const BUDGET_END = INNER.x + INNER.w - INNER.h / 2 - 4;
const BUDGET_BASE = INNER.y + 12 + 70;

export const POSITION = {
  ...layerOf("position"),
  track: {
    key: "position.track",
    outer: OUTER,
    inner: INNER,
    middle: MIDDLE,
    d: { outer: stadium(OUTER), inner: stadium(INNER), middle: stadium(MIDDLE) },
  },
  /** The start line across both lanes of the near straight. */
  start: { key: "position.start", x: START_X, y0: INNER.y + INNER.h, y1: OUTER.y + OUTER.h },
  pack: { keys: PACK.map((_, i) => `position.pack.${i}`), at: PACK, facing: "left" as const, name: { key: "position.pack.name", text: ENTERPRISE, at: ENTERPRISE_NAME } },
  city: { key: "position.city", at: CITY_AT, name: { key: "position.city.name", text: CITY, at: CITY_NAME } },
  tag: { key: "position.tag", text: NO_STRATEGY, at: NO_STRATEGY_AT },
  post: { key: "position.post", ...POST, name: { key: "position.post.name", text: AUTHORIZED, at: POST_NAME }, tick: { key: "position.post.tick", ...TICK } },
  budget: {
    key: "position.budget",
    text: SEVENTEEN,
    runs: figureRuns(SEVENTEEN),
    at: { x: BUDGET_END, y: BUDGET_BASE } as Point,
    caption: { key: "position.budget.caption", text: OF_BUDGETS, at: { x: BUDGET_END, y: BUDGET_BASE + 36 } as Point },
  },
};
