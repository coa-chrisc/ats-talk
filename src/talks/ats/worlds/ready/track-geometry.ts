/**
 * The running track that slides 11, 15 and 27 draw: one picture in three
 * places, so its numbers are fixed here and nowhere else. Script-free: no
 * words, only positions. The ready world copies this file (and
 * parts-track.tsx) for slide 27; copy it whole, do not vary a number.
 *
 * The track is seen from above: a long oval of two lanes across the whole
 * drawing width, under a two-line title with two story lines. Runners go
 * round it anticlockwise, as on any track: right along the near (bottom)
 * straight from the start, up the right bend, and left along the far (top)
 * straight. A runner on the far straight is more than half a lap on.
 *
 *   TRACK_TOP  548              the drawing's first line (contentTop of a
 *                               two-line title with two story lines)
 *   OUTER      x 96, y 564, w 1728, h 344   the oval's outer edge
 *   LANES      96               both lanes together; one lane is 48
 *   R          172              the outer bends' radius
 *   INNER      x 192, y 660, w 1536, h 152  the infield's edge (radius 76)
 *   MIDDLE     x 144, y 612, w 1632, h 248  the line between the lanes (radius 124)
 *   START_X    316              the start stripe, across the near straight
 *   PACK       x 1040 to 1178 on the far straight's two lane centres
 *   CITY_AT    (360, 898)       slide 11's large runner, just past the stripe
 *   CITY_STANDS (1759, 798)     slide 15's large runner, 60 degrees up the
 *                               right bend on the middle line
 *   MARKER_X   576, 876, 1176   slide 15's three markers, on the middle line
 *                               of the near straight (y 860)
 */
import { box, type Box, type Point } from "@/components/deck/kit";

const round = (n: number) => Math.round(n * 100) / 100;

/** The drawing's first line: the story band's foot (420 + 2 rows of 48) plus the 32 px room under it. */
export const TRACK_TOP = 548;

/**
 * The oval's outer edge: the full drawing width, from x 96 to 1824, from
 * 16 px under the drawing's first line to 344 px lower, so its bends are
 * half circles of radius 172.
 */
export const OUTER: Box = box(96, TRACK_TOP + 16, 1728, 344);
/** The two lanes together. */
export const LANES = 96;
export const R = OUTER.h / 2;
/** The infield's edge: the outer edge inset by both lanes, an oval of radius 76, 152 px tall. */
export const INNER: Box = box(OUTER.x + LANES, OUTER.y + LANES, OUTER.w - 2 * LANES, OUTER.h - 2 * LANES);
/** The line between the two lanes, halfway across them: an oval of radius 124. */
export const MIDDLE: Box = box(OUTER.x + LANES / 2, OUTER.y + LANES / 2, OUTER.w - LANES, OUTER.h - LANES);

/** Where the near straight ends at each side, and the bends' centres' height. */
export const BEND = { left: OUTER.x + R, right: OUTER.x + OUTER.w - R, cy: OUTER.y + R } as const;

/** An oval (a stadium) as one path, drawn from the near straight's left end, rightwards, anticlockwise as the runners go: right along the bottom, up the right bend, left along the top, down the left bend. */
export const stadium = (b: Box): string => {
  const r = b.h / 2;
  const left = b.x + r;
  const right = b.x + b.w - r;
  const bottom = b.y + b.h;
  return `M${left} ${bottom}H${right}A${r} ${r} 0 0 0 ${right} ${b.y}H${left}A${r} ${r} 0 0 0 ${left} ${bottom}Z`;
};

/** The far straight's two lane centres. */
export const FAR = { inner: INNER.y - LANES / 4, outer: OUTER.y + LANES / 4 } as const;
/** The near straight's middle line. */
export const NEAR_MIDDLE = MIDDLE.y + MIDDLE.h;

/** The start line: a short white stripe across both lanes of the near straight, 48 px into it from where the left bend ends. */
export const START_X = OUTER.x + R + 48;
export const START = { x: START_X, y0: INNER.y + INNER.h, y1: OUTER.y + OUTER.h } as const;

/**
 * A runner's drawing is this tall, its foot at its point. A pack runner
 * stands in one lane (48 px); the City's runner, the slides' subject, is
 * more than twice as tall and stands across both lanes.
 */
export const RUNNER = { small: 34, large: 76 } as const;

/** Slide 11: the City's runner just past the start stripe (its back foot 7 px clear of it), its foot 10 px inside the outer edge, its head inside the inner edge. */
export const CITY_AT: Point = { x: START_X + 44, y: OUTER.y + OUTER.h - 10 };

/**
 * Slide 15 (and 27): the City's runner a third of the way round, on the
 * right bend's middle line, 60 degrees up it from where the near straight
 * ends.
 */
const STANDS_ANGLE = Math.PI / 3;
const MIDDLE_R = R - LANES / 2;
export const CITY_STANDS: Point = { x: Math.round(BEND.right + MIDDLE_R * Math.sin(STANDS_ANGLE)), y: Math.round(BEND.cy + MIDDLE_R * Math.cos(STANDS_ANGLE)) };

/** Slide 15: the three markers the runner has passed, on the near straight's middle line behind it. */
export const MARKER_X = [START_X + 260, START_X + 560, START_X + 860] as const;
export const MARKER_R = 12;

/**
 * The enterprise pack: seven runners bunched on the far straight, well
 * round the lap, two lanes deep, a little apart from each other in x, so
 * they read as a pack. On the far straight they run leftward, so they face
 * left. Slide 27's dashed runner stands at its tail, x 1210 on FAR.outer.
 */
export const PACK_X = [1040, 1086, 1132, 1178, 1063, 1109, 1155] as const;
const PACK_LANE = [FAR.outer, FAR.outer, FAR.outer, FAR.outer, FAR.inner, FAR.inner, FAR.inner] as const;
export const PACK: Point[] = PACK_X.map((x, i) => ({ x, y: round(PACK_LANE[i] + RUNNER.small / 2) }));
export const PACK_FACING = "left" as const;
/** The pack's name on the infield's top row, right under the pack. */
export const PACK_NAME: Point = { x: 1109, y: INNER.y + 26 };

/** The track's three outlines as paths. */
export const TRACK_D = { outer: stadium(OUTER), inner: stadium(INNER), middle: stadium(MIDDLE) } as const;
