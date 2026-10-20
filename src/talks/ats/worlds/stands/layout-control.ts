/**
 * Slide 11a's places, in two halves. Left: the fence post as slide 11 draws
 * it, its tick on its cap and its name to its right, a closed gate hung
 * from it on the ground line, and three grey paths worn into the ground
 * that come up to the gate from the right, swing round the post's end of
 * the fence and run off the stage's left edge, named beside where they
 * start, with their caption; under them the grey gauge, a half circle whose
 * needle swings from the low end toward the high end, its figure and its
 * caption on three rows to its right. Right: a stair of three steps on a
 * floor, named over it with its caption, a green figure standing on the
 * first step (it climbs to the second), a green eye over the stair named to
 * its right, and the indigo figure on two rows at the right edge with its
 * caption on two rows under it. Words are read from the script, by
 * position.
 *
 * The drawing has y 548 to 992, under a two-line title with two story lines.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { DRAW_FOOT, SAFE, contentTop, layerOf } from "./layout";

const [APPROVED, SHADOW, UNSEEN, PERCENT, FIND, RANGE, MATCHED, VISIBILITY, GREW, PENNSYLVANIA] = shown("control", "play");

const TOP = contentTop("control");

/* Left: the post, its gate and the worn paths */

/** The post as slide 11 draws it, 18 wide with a pointed cap, its tick 16 px in radius on the cap; its foot on the ground line 192 px under the drawing's first line. */
const GROUND = TOP + 192;
const POST = { x: 196, w: 18, top: TOP + 42, foot: GROUND } as const;
const TICK = { at: { x: POST.x + POST.w / 2, y: POST.top - 2 } as Point, r: 16 };
/** Its name to its right, level with its cap, at the text size. */
const NAME: Point = { x: POST.x + POST.w + 28, y: POST.top + 18 };

/** The gate, closed: hung from the post, 220 wide and 72 tall, its foot 6 px over the ground; a latch post 12 wide ends it, a little shorter than the post. */
export const GATE = { x: POST.x + POST.w, w: 220, h: 72, lift: 6, bars: 4 } as const;
const GATE_AT = box(GATE.x, GROUND - GATE.lift - GATE.h, GATE.w, GATE.h);
const LATCH = { x: GATE.x + GATE.w, w: 12, top: GROUND - 96, foot: GROUND } as const;
/** The ground line, from the drawing's left edge to 60 px past the latch post. */
const GROUND_LINE = { x0: SAFE.left + 16, x1: LATCH.x + LATCH.w + 60, y: GROUND } as const;

/**
 * Three paths worn in the ground: each comes up from the right, in front of
 * the gate (under the ground line), sweeps left past the post's foot and
 * turns up round the fence's end, leaving the stage at its left edge behind
 * the fence, in one smooth curve. Where each starts, how low it runs, and
 * the height it leaves at.
 */
const PATH_STARTS: Point[] = [
  { x: 470, y: GROUND + 40 },
  { x: 500, y: GROUND + 58 },
  { x: 440, y: GROUND + 24 },
];
const PATH_LOW = [GROUND + 60, GROUND + 76, GROUND + 48] as const;
const PATH_LEAVES = [GROUND - 64, GROUND - 30, GROUND - 98] as const;
const pathD = (from: Point, low: number, leave: number) => `M${from.x} ${from.y}C${from.x - 180} ${low} ${SAFE.left + 70} ${low} ${SAFE.left} ${leave}`;
const paths = PATH_STARTS.map((from, i) => ({ key: `control.path.${i}`, d: pathD(from, PATH_LOW[i], PATH_LEAVES[i]), from, leave: { x: SAFE.left, y: PATH_LEAVES[i] } as Point }));
/** The paths' name beside where they start, its caption under it. */
const SHADOW_AT: Point = { x: 540, y: GROUND + 14 };
const UNSEEN_AT: Point = { x: SHADOW_AT.x, y: SHADOW_AT.y + 36 };

/* Left: the gauge */

/** The gauge: a half circle of radius 124 on a base 30 px over the drawing's foot, its centre under the post. Its needle swings from the low end (pointing left) to 0.69 of the way round. */
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
/** Its figure at 48 px, 40 px right of the gauge, its baseline 100 px over the gauge's base; its caption on three rows under it, 32 apart, the last ending over the drawing's foot. */
export const GAUGE_FIGURE = 48;
export const CAPTION_PITCH = 32;
const FIGURE_AT: Point = { x: GAUGE.cx + GAUGE.r + GAUGE.band + 40, y: GAUGE.cy - 100 };
const FIND_AT: Point = { x: FIGURE_AT.x, y: FIGURE_AT.y + 40 };
/** The caption broken where its phrases end: whole, it would run over the stage's middle line. */
const FIND_ROWS = breakAfter(FIND, "staff", "tools,");

/* Right: the stair, its climber, the eye and the figure */

/** Three steps 104 wide, each 76 higher than the last, on a floor 16 px over the drawing's foot, from the stage's middle line. */
const STAIR = { x: 960, w: 104, rise: 76, first: 76, floor: DRAW_FOOT - 16 } as const;
const steps: Box[] = [0, 1, 2].map((i) => {
  const tread = STAIR.floor - STAIR.first - i * STAIR.rise;
  return box(STAIR.x + i * STAIR.w, tread, STAIR.w, STAIR.floor - tread);
});
/** The stair's name over it at the text size, its caption under the name. */
const RANGE_AT: Point = { x: STAIR.x, y: TOP + 26 };
const MATCHED_AT: Point = { x: STAIR.x, y: RANGE_AT.y + 38 };
/** The climber: 34 wide and 64 tall, standing on the first step's middle; it climbs to the second's. */
export const CLIMBER = { w: 34, h: 64 } as const;
const STANDS: Point = { x: steps[0].x + steps[0].w / 2, y: steps[0].y };
const CLIMBS: Point = { x: steps[1].x + steps[1].w / 2, y: steps[1].y };

/** The eye: 84 wide and 48 tall, over the second step, its middle 52 px over the top step's tread; its name 32 px right of it. */
export const EYE = { w: 84, h: 48, iris: 13, pupil: 5 } as const;
const EYE_AT: Point = { x: steps[1].x + steps[1].w / 2, y: steps[2].y - 52 };
const VISIBILITY_AT: Point = { x: EYE_AT.x + EYE.w / 2 + 32, y: EYE_AT.y };

/**
 * The indigo figure at 48 px on two rows (the words run 796 px at 60 on
 * one row, wider than the room beside the stair), broken after the count,
 * ending at the drawing's right edge, its rows 54 apart about their
 * middles, the second row's middle 20 px over the second step's tread; its
 * caption on two rows under it, flush right.
 */
export const BIG = { size: 48, pitch: 54 } as const;
const BIG_ROWS = breakAfter(GREW, "3,000");
const BIG_AT: Point = { x: SAFE.right - 16, y: steps[0].y - 20 - BIG.pitch };
const PENNSYLVANIA_AT: Point = { x: BIG_AT.x, y: BIG_AT.y + BIG.pitch + 47 };
const PENNSYLVANIA_ROWS = breakAfter(PENNSYLVANIA, "staff");

export const CONTROL = {
  ...layerOf("control"),
  post: { key: "control.post", ...POST, tick: { key: "control.post.tick", ...TICK }, name: { key: "control.post.name", text: APPROVED, at: NAME } },
  ground: { key: "control.ground", ...GROUND_LINE },
  gate: { key: "control.gate", at: GATE_AT, bars: GATE.bars, latch: LATCH },
  paths,
  shadow: { key: "control.shadow", text: SHADOW, at: SHADOW_AT, caption: { key: "control.shadow.caption", text: UNSEEN, at: UNSEEN_AT } },
  gauge: {
    key: "control.gauge",
    ...GAUGE,
    track: `M${low.x} ${low.y}A${GAUGE.r} ${GAUGE.r} 0 0 1 ${high.x} ${high.y}`,
    reached: { key: "control.gauge.reached", d: `M${low.x} ${low.y}A${GAUGE.r} ${GAUGE.r} 0 0 1 ${reached.x} ${reached.y}` },
    needle: { key: "control.gauge.needle", turn: NEEDLE_TURN },
    figure: { key: "control.gauge.figure", text: PERCENT, at: FIGURE_AT },
    caption: { key: "control.gauge.caption", text: FIND, rows: FIND_ROWS, at: FIND_AT },
  },
  stair: {
    floor: { key: "control.floor", x0: STAIR.x - 16, x1: steps[2].x + steps[2].w + 2, y: STAIR.floor },
    steps: steps.map((at, i) => ({ key: `control.step.${i}`, at })),
    name: { key: "control.range", text: RANGE, at: RANGE_AT },
    caption: { key: "control.matched", text: MATCHED, at: MATCHED_AT },
  },
  climber: { key: "control.climber", at: STANDS, to: CLIMBS, rise: CLIMBS.y - STANDS.y, run: CLIMBS.x - STANDS.x },
  eye: { key: "control.eye", at: EYE_AT, name: { key: "control.eye.name", text: VISIBILITY, at: VISIBILITY_AT } },
  big: { key: "control.big", text: GREW, rows: BIG_ROWS, at: BIG_AT, caption: { key: "control.big.caption", text: PENNSYLVANIA, rows: PENNSYLVANIA_ROWS, at: PENNSYLVANIA_AT } },
};
