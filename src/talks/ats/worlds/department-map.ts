/**
 * The department map: the drawings the talk returns to across worlds, as
 * numbers only. The grid of departments (slides 11, 12 and 15), the lit
 * window in a box (12, 15 and 17), the policy line round it (11), the three
 * dashed plates of what is still to establish (11 and 27), the sandbox's
 * fence (13, 15 and 27), the gate, closed (11a and 15) or open (11a), and
 * the round table (12, empty, and 17).
 * A world carries nothing to the next, so each draws these in its own
 * classes from the same proportions here, and an audience that has learned
 * a shape meets it again unchanged. Script-free: no word is set here.
 */
import { box, type Box, type Point } from "@/components/deck/kit";

const round = (n: number) => Math.round(n * 100) / 100;

/* The grid */

/** Seven departments across and three down, each box 94 by 54 at scale 1 (slide 12's size), 12 apart across and 10 down. */
export const GRID = { cols: 7, rows: 3, box: { w: 94, h: 54 }, gap: 12, rowGap: 10, rx: 8 } as const;

/** The boxes slide 12 lights, as [column, row]: six named, in the grid's outer columns, and three unnamed among the rest. */
export const LIT = {
  named: [
    [0, 0],
    [0, 1],
    [0, 2],
    [6, 0],
    [6, 1],
    [6, 2],
  ],
  unnamed: [
    [2, 1],
    [3, 0],
    [4, 2],
  ],
} as const;

/** The boxes slide 15's staff stand in: the middle row's unlit ones, spread evenly. */
export const STAFF = [
  [1, 1],
  [3, 1],
  [5, 1],
] as const;

/**
 * A lit window (slides 12, 15 and 17): a square 0.42 of its box's height,
 * its corners rounded at 0.15 of its side, that fills green as it lights
 * while the whole box takes a soft green wash. An unnamed box's window is
 * 0.72 of a named one's and lights half as strongly.
 */
export const WINDOW = { size: 0.42, rx: 0.15, small: 0.72, faint: 0.5 } as const;

/** A window's square about `centre`, in a box `h` tall, times `scale`. */
export const windowAt = (centre: Point, h: number, scale = 1): Box => {
  const side = round(h * WINDOW.size * scale);
  return box(round(centre.x - side / 2), round(centre.y - side / 2), side, side);
};

/** The line round the grid (slide 11's policy, slide 12's ring): this far out at the sides and foot, and at the top room for the grid's name. */
export const RING_PAD = { side: 36, top: 64, foot: 36 } as const;

/** The grid drawn with its top left box at `origin`, every measure times `scale`. */
export function gridAt(origin: Point, scale = 1) {
  const w = round(GRID.box.w * scale);
  const h = round(GRID.box.h * scale);
  const pitch = { x: round((GRID.box.w + GRID.gap) * scale), y: round((GRID.box.h + GRID.rowGap) * scale) };
  const cell = (col: number, row: number): Box => box(round(origin.x + col * pitch.x), round(origin.y + row * pitch.y), w, h);
  const centre = (col: number, row: number): Point => ({ x: round(origin.x + col * pitch.x + w / 2), y: round(origin.y + row * pitch.y + h / 2) });
  const outline = box(origin.x, origin.y, round((GRID.cols - 1) * pitch.x + w), round((GRID.rows - 1) * pitch.y + h));
  const cells = Array.from({ length: GRID.cols * GRID.rows }, (_, n) => ({ n, col: n % GRID.cols, row: Math.floor(n / GRID.cols), at: cell(n % GRID.cols, Math.floor(n / GRID.cols)) }));
  return { scale, rx: round(GRID.rx * scale), cell, centre, outline, cells };
}

/** The grid's size at a scale, before it is placed. */
export const gridSize = (scale = 1) => {
  const { outline } = gridAt({ x: 0, y: 0 }, scale);
  return { w: outline.w, h: outline.h };
};

/* The plates */

/**
 * A dashed plate of what is still to establish: 450 by 126, three in a
 * column 14 apart; its name and caption set 16 px inside its dashes, so each
 * caption reads on one row. The plates hold words only: nothing is drawn in
 * them until the script says a gap is closed.
 */
export const PLATE = { w: 450, h: 126, gap: 14, rx: 10, inset: 16 } as const;

/** The three plates in their column, the first's top left corner at `at`. */
export const plateColumn = (at: Point): Box[] => [0, 1, 2].map((i) => box(at.x, at.y + i * (PLATE.h + PLATE.gap), PLATE.w, PLATE.h));

/** The column's height: three plates and the two gaps between. */
export const PLATES_H = 3 * PLATE.h + 2 * PLATE.gap;

/* The agent, the fence and the gate */

/** An agent (slide 14): a hexagon 70 wide and 89 tall at scale 1, its top point at the middle of its width. */
export const AGENT = { w: 70, h: 89 } as const;

/** The sandbox's fence (slide 13): posts every 72 px along its rails, standing 10 px past them, its corners rounded 6. */
export const FENCE = { postPitch: 72, overhang: 10, rx: 6 } as const;

/** Where a fence's posts stand along a rail from `x` over `w`, one at each end. */
export const fencePosts = (x: number, w: number, pitch: number = FENCE.postPitch) => Array.from({ length: Math.floor(w / pitch) + 1 }, (_, i) => Math.min(round(x + i * pitch), round(x + w)));

/** The gate (slide 10's hurdle): two posts 72 apart, 40 tall, and two bars across them 12 and 28 px under the posts' tops. Opened, it works as a boom barrier: both bars swing up together about the left post until they stand upright over it, one boom, and the right post stands alone. */
export const GATE = { h: 40, span: 72, bars: [12, 28] } as const;

/** A gate standing on a line at `foot` (its middle), every measure times `scale`: its posts' and bars' path, each bar on its own path (to swing up about the left post), and its box closed. */
export const gatePaths = (foot: Point, scale = 1) => {
  const half = round((GATE.span * scale) / 2);
  const top = round(foot.y - GATE.h * scale);
  const [x0, x1] = [round(foot.x - half), round(foot.x + half)];
  return {
    posts: `M${x0} ${foot.y}V${top}M${x1} ${foot.y}V${top}`,
    bars: GATE.bars.map((bar) => `M${x0} ${round(top + bar * scale)}H${x1}`).join(""),
    arms: GATE.bars.map((bar) => `M${x0} ${round(top + bar * scale)}H${x1}`),
    at: box(x0, top, round(x1 - x0), round(foot.y - top)),
  };
};

/* The table */

/**
 * The consortium's round table seen from above (slide 17): its top 124
 * across the radius, ten chairs 56 square, rounded 12, on a ring of 164 round
 * it, the first 18 degrees above the right and the rest going round
 * clockwise (the stage's y grows downward).
 */
export const TABLE = { r: 124, ring: 164, seats: 10, phase: -18, seat: { w: 56, h: 56, rx: 12 } } as const;

/** How far the table reaches from its middle, times `scale`: to a chair's outer corners, as each chair faces the table. */
export const tableReach = (scale = 1) => round(Math.hypot(TABLE.ring + TABLE.seat.h / 2, TABLE.seat.w / 2) * scale);

/** The chairs round a table at `c`, times `scale`: each one's middle and the angle it stands at. */
export const tableSeats = (c: Point, scale = 1) =>
  Array.from({ length: TABLE.seats }, (_, i) => {
    const deg = (360 / TABLE.seats) * i + TABLE.phase;
    const a = (deg * Math.PI) / 180;
    return { at: { x: round(c.x + TABLE.ring * scale * Math.cos(a)), y: round(c.y + TABLE.ring * scale * Math.sin(a)) } as Point, deg };
  });
