/**
 * Slide 11a's places, in two halves. Left: slide 11's fence post with its
 * tick on its cap, named to its right, and four small city nameplates in a
 * row under its name; under them a grey gauge, a half circle whose needle
 * swings from the low end toward the high end, its figure and two-row
 * caption to its right. Right: a stair of three steps on a floor, named over it with
 * its caption, a green figure standing on the first step (it climbs to the
 * second); beside the stair, the indigo figure on two rows with its caption
 * under it; and a plain tag at the foot, at the right. Words are read from
 * the script, by position.
 *
 * The drawing has y 548 to 992, under a two-line title with two story lines.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { DRAW_FOOT, SAFE, TAG, contentTop, layerOf, tagWidth, wordsWidth } from "./layout";

const [AUTHORIZED, ...REST] = shown("control", "play");
const CITIES = REST.slice(0, 4);
const [PERCENT, ANYWAY, TIERS, BOSTON, GREW, PENNSYLVANIA, BUDGET] = REST.slice(4);

const TOP = contentTop("control");

/* Left: the post, its name and the cities */

/** The post as slide 11 draws it, 18 wide with a pointed cap, its tick 16 px in radius on the cap, 30 px under the drawing's first line. */
const POST = { x: 120, w: 18, top: TOP + 34, foot: TOP + 230 } as const;
const TICK = { at: { x: POST.x + POST.w / 2, y: POST.top - 2 } as Point, r: 16 };
/** Its name to its right, level with its upper part, at the text size. */
const NAME: Point = { x: POST.x + POST.w + 28, y: POST.top + 22 };

/** The four nameplates in a row 30 px under the name: 40 tall, the name's width and 16 a side, 12 apart. */
export const CITY = { h: 40, pad: 16, gap: 12, size: 26 } as const;
const CITIES_Y = NAME.y + 34;
let cityX = NAME.x;
const cities = CITIES.map((text, i) => {
  const at = box(cityX, CITIES_Y, wordsWidth(text, CITY.size) + 2 * CITY.pad, CITY.h);
  cityX += at.w + CITY.gap;
  return { key: `control.city.${i}`, text, at };
});

/* Left: the gauge */

/** The gauge: a half circle of radius 124 on a base 30 px over the drawing's foot, its centre under the post's right. Its needle swings from the low end (pointing left) to 0.69 of the way round. */
export const GAUGE = { cx: 236, cy: DRAW_FOOT - 30, r: 124, band: 14, needle: 102, hub: 10 } as const;
const SHARE = 0.69;
export const NEEDLE_TURN = Math.round(SHARE * 180 * 10) / 10;
const arcPoint = (share: number): Point => {
  const a = Math.PI * (1 - share);
  return { x: Math.round((GAUGE.cx + GAUGE.r * Math.cos(a)) * 100) / 100, y: Math.round((GAUGE.cy - GAUGE.r * Math.sin(a)) * 100) / 100 };
};
const low = arcPoint(0);
const high = arcPoint(1);
const reached = arcPoint(SHARE);
/** Its figure at 48 px and its caption on two rows under it, 40 px right of the gauge, the figure's baseline 70 px over the gauge's base; the caption's rows 32 apart (a label line), the second ending over the drawing's foot. */
export const GAUGE_FIGURE = 48;
export const CAPTION_PITCH = 32;
const FIGURE_AT: Point = { x: GAUGE.cx + GAUGE.r + GAUGE.band + 40, y: GAUGE.cy - 70 };
const ANYWAY_AT: Point = { x: FIGURE_AT.x, y: FIGURE_AT.y + 40 };
/** The caption broken after its fourth word: whole, it would run past the stage's middle line. */
const ANYWAY_ROWS = breakAfter(ANYWAY, "staff");

/* Right: the stair, its climber, the figure and the tag */

/** Three steps 104 wide, each 76 higher than the last, on a floor 92 px over the drawing's foot, from the stage's middle line: the stair ends at 1272, leaving the figure its room at the right. */
const STAIR = { x: 960, w: 104, rise: 76, first: 76, floor: DRAW_FOOT - 92 } as const;
const steps: Box[] = [0, 1, 2].map((i) => {
  const tread = STAIR.floor - STAIR.first - i * STAIR.rise;
  return box(STAIR.x + i * STAIR.w, tread, STAIR.w, STAIR.floor - tread);
});
/** The stair's name over its first two steps, its caption under the name. */
const TIERS_AT: Point = { x: STAIR.x, y: TOP + 26 };
const BOSTON_AT: Point = { x: STAIR.x, y: TIERS_AT.y + 38 };
/** The climber: 34 wide and 64 tall, standing on the first step's middle; it climbs to the second's. */
export const CLIMBER = { w: 34, h: 64 } as const;
const STANDS: Point = { x: steps[0].x + steps[0].w / 2, y: steps[0].y };
const CLIMBS: Point = { x: steps[1].x + steps[1].w / 2, y: steps[1].y };

/**
 * The indigo figure at 48 px on two rows (the words run 796 px at 60 on
 * one row, wider than the room beside the stair), broken after the count,
 * ending at the drawing's right edge, its rows 54 apart about their
 * middles, the second row's middle 28 px over the second step's tread;
 * its caption under the second row.
 */
export const BIG = { size: 48, pitch: 54 } as const;
const BIG_ROWS = breakAfter(GREW, "3,000");
const BIG_AT: Point = { x: SAFE.right - 16, y: steps[1].y - 28 - BIG.pitch };
const PENNSYLVANIA_AT: Point = { x: BIG_AT.x, y: BIG_AT.y + BIG.pitch + 47 };
/** The plain tag at the foot, ending at the drawing's right edge. */
const BUDGET_AT = box(SAFE.right - 16 - tagWidth(BUDGET), DRAW_FOOT - TAG.h, tagWidth(BUDGET), TAG.h);

export const CONTROL = {
  ...layerOf("control"),
  post: { key: "control.post", ...POST, tick: { key: "control.post.tick", ...TICK }, name: { key: "control.post.name", text: AUTHORIZED, at: NAME } },
  cities,
  gauge: {
    key: "control.gauge",
    ...GAUGE,
    track: `M${low.x} ${low.y}A${GAUGE.r} ${GAUGE.r} 0 0 1 ${high.x} ${high.y}`,
    reached: { key: "control.gauge.reached", d: `M${low.x} ${low.y}A${GAUGE.r} ${GAUGE.r} 0 0 1 ${reached.x} ${reached.y}` },
    needle: { key: "control.gauge.needle", turn: NEEDLE_TURN },
    figure: { key: "control.gauge.figure", text: PERCENT, at: FIGURE_AT },
    caption: { key: "control.gauge.caption", text: ANYWAY, rows: ANYWAY_ROWS, at: ANYWAY_AT },
  },
  stair: {
    floor: { key: "control.floor", x0: STAIR.x - 16, x1: steps[2].x + steps[2].w + 2, y: STAIR.floor },
    steps: steps.map((at, i) => ({ key: `control.step.${i}`, at })),
    name: { key: "control.tiers", text: TIERS, at: TIERS_AT },
    caption: { key: "control.boston", text: BOSTON, at: BOSTON_AT },
  },
  climber: { key: "control.climber", at: STANDS, to: CLIMBS, rise: CLIMBS.y - STANDS.y, run: CLIMBS.x - STANDS.x },
  big: { key: "control.big", text: GREW, rows: BIG_ROWS, at: BIG_AT, caption: { key: "control.big.caption", text: PENNSYLVANIA, at: PENNSYLVANIA_AT } },
  budget: { key: "control.budget", text: BUDGET, at: BUDGET_AT },
};
