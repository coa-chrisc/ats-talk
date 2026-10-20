/**
 * Slide 27's places: the deck's running track (track-geometry.ts, copied
 * whole from the stands world, so the oval, its stripe, the pack and the
 * pack's name land on the same pixels as slides 11 and 15). The City's
 * runner stands where slide 15 left it, a third of the way round the lap on
 * the right bend; a dashed outline of it, at its size, stands at the pack's
 * tail, named in the infield under the pack's name. Between the two, on the
 * middle lane line, five small green markers at equal steps round the bend
 * and along the far straight. The track fills the drawing's width, so there
 * is no room beside it, and the infield is too small for five names and
 * captions; so they are set off the lanes, in a key row under the track,
 * each joined to its marker by a thin leader, the row set from the right in
 * the order the markers land. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, TEXT_LINE, contentTop, groupOf, labelsOf, wordsBox } from "./layout";
import { BEND, CITY_STANDS, INNER, LANES, MARKER_R, MIDDLE, OUTER, PACK, PACK_NAME, R, RUNNER, START } from "./track-geometry";

const [ENTERPRISE, WITHIN, ...REST] = labelsOf("could-be");
/** The markers' names and captions, in the order they land. */
const PAIRS = Array.from({ length: REST.length / 2 }, (_, i) => ({ name: REST[2 * i], caption: REST[2 * i + 1] }));

/** The track sits under a two-line title with two story lines; its file fixes it there. */
export const TRACK_TOP = contentTop("could-be");

const round = (n: number) => Math.round(n * 100) / 100;
/** The right bend's middle lane line. */
const MIDDLE_R = R - LANES / 2;
const CITY_DEGREES = 60;
/** A point on the right bend's middle lane line, `degrees` round it from where the near straight ends. */
const onBend = (degrees: number): Point => {
  const a = (degrees * Math.PI) / 180;
  return { x: BEND.right + MIDDLE_R * Math.sin(a), y: BEND.cy + MIDDLE_R * Math.cos(a) };
};

/**
 * The dashed runner at the pack's tail, facing the pack's way: the City's
 * own runner at its own size, so it reads as the same runner further on.
 * At that size it stands across both lanes of the far straight, its foot 10
 * inside the inner edge as the runner's foot is at the start on slide 11.
 * Its x is 20 further back than a pack-sized outline would stand (1210), so
 * its reaching hand keeps 16 px clear of the rearmost runner's back foot.
 */
const DASHED_AT: Point = { x: 1230, y: INNER.y - 10 };

/**
 * The markers, at equal steps along the middle lane line from the City's
 * runner to the pack's tail, so the run is cut in one more step than there
 * are markers. The way runs up the bend (from 60 to 180 degrees) and then
 * left along the far straight.
 */
const BEND_RUN = (MIDDLE_R * Math.PI * (180 - CITY_DEGREES)) / 180;
/** The markers' run ends where a pack-sized outline would stand, at the pack's tail. */
const TAIL_X = 1210;
const STRAIGHT_RUN = BEND.right - TAIL_X;
const STEP = (BEND_RUN + STRAIGHT_RUN) / (PAIRS.length + 1);
const markerAt = (s: number): Point => {
  if (s <= BEND_RUN) {
    const p = onBend(CITY_DEGREES + (s / MIDDLE_R) * (180 / Math.PI));
    return { x: round(p.x), y: round(p.y) };
  }
  return { x: round(BEND.right - (s - BEND_RUN)), y: MIDDLE.y };
};
const MARKERS = PAIRS.map((_, i) => markerAt(STEP * (i + 1)));
/** A marker's disc, slide 15's size, in a white ring so it reads on the grey lanes. */
export { MARKER_R };

/**
 * The key row under the track: names on a row 34 under the oval's foot,
 * captions a label line under them, so the captions end 2 over the floor.
 * The row is set from the right edge leftward, in landing order, as the
 * markers run leftward round the lap. Each entry's room is its longer line
 * as Geist sets it at 26 px (measured from the font, the names in
 * semibold); the five fill the field with 30 between them.
 */
const KEY = { name: OUTER.y + OUTER.h + 34, caption: OUTER.y + OUTER.h + 34 + LABEL_LINE, gap: 30 } as const;
export const KEY_MEASURED = [482, 177, 404, 231, 313] as const;
const entryX = KEY_MEASURED.reduce<number[]>((xs, w, i) => [...xs, (i === 0 ? OUTER.x + OUTER.w : xs[i - 1] - KEY.gap) - w], []);
/** Where a leader ends: over the middle of its entry, 4 over the name's line. */
const footOf = (i: number): Point => ({ x: Math.round(entryX[i] + KEY_MEASURED[i] / 2), y: KEY.name - LABEL_LINE / 2 - 4 });

/**
 * The leaders: a thin rule from each marker to its entry, so a reader pairs
 * them by position. Each runs straight down from its marker into the
 * infield, left along its own channel near the infield's foot, then
 * straight down across the near straight to its entry. The channels step
 * down 9 px from the last marker's (768, under the dashed runner's name) to
 * the first's (804), so no leader crosses another. The first marker is on
 * the bend over the City's runner, so its leader first runs in from it to
 * (1700, 700), inside the infield's round end, then down at x 1700, which
 * keeps it clear of the runner, whose drawing starts about 1730.
 */
const CHANNEL = PAIRS.map((_, i) => 804 - 9 * i);
const FIRST_TURN = { x: 1700, y: 700 } as const;
const leaderOf = (at: Point, i: number): Point[] => {
  const foot = footOf(i);
  if (i === 0) {
    const dx = FIRST_TURN.x - at.x;
    const dy = FIRST_TURN.y - at.y;
    const d = Math.hypot(dx, dy);
    return [{ x: round(at.x + (dx / d) * MARKER_R), y: round(at.y + (dy / d) * MARKER_R) }, FIRST_TURN, { x: FIRST_TURN.x, y: CHANNEL[0] }, { x: foot.x, y: CHANNEL[0] }, foot];
  }
  return [{ x: at.x, y: at.y + MARKER_R }, { x: at.x, y: CHANNEL[i] }, { x: foot.x, y: CHANNEL[i] }, foot];
};

/**
 * The dashed runner's name on the infield's second row, under the pack's
 * name's row, centred 30 short of the dashed runner's foot, so the last
 * marker's leader passes clear of its right end.
 */
const WITHIN_AT: Point = { x: DASHED_AT.x - 30, y: PACK_NAME.y + 50 };

export const COULD_BE = {
  ...groupOf("could-be"),
  track: { key: "could-be.track", outer: OUTER, inner: INNER, middle: MIDDLE },
  start: { key: "could-be.start", ...START },
  pack: { keys: PACK.map((_, i) => `could-be.pack.${i}`), at: PACK, name: { key: "could-be.pack.name", text: ENTERPRISE, at: PACK_NAME } },
  city: { key: "could-be.city", at: CITY_STANDS },
  dashed: { key: "could-be.dashed", at: DASHED_AT, name: { key: "could-be.dashed.name", text: WITHIN, at: WITHIN_AT } },
  markers: PAIRS.map((pair, i) => ({
    key: `could-be.marker.${i}`,
    at: MARKERS[i],
    leader: { key: `could-be.leader.${i}`, points: leaderOf(MARKERS[i], i) },
    entry: {
      key: `could-be.entry.${i}`,
      at: box(entryX[i], KEY.name - LABEL_LINE / 2, KEY_MEASURED[i], 2 * LABEL_LINE),
      name: { text: pair.name, at: { x: entryX[i], y: KEY.name } as Point },
      caption: { text: pair.caption, at: { x: entryX[i], y: KEY.caption } as Point },
    },
  })),
  /** The arc length between markers, and where their run ends, for the test. */
  step: STEP,
  tail: TAIL_X,
};

/** A runner's drawing's box, from its foot point and height: its strokes reach 14 of the drawing's 40 units behind the foot and 9 ahead, a little more with their round caps, and rise 40 units. */
export const runnerBox = (at: Point, h: number, facing: "left" | "right" = "right"): Box => {
  const k = h / 40;
  const back = 17 * k;
  const front = 12 * k;
  return box(Math.round(facing === "left" ? at.x - front : at.x - back), Math.round(at.y - 41 * k), Math.round(back + front), Math.round(42 * k));
};

/** Everything slide 27 draws under its story band, for the layout test: an entry's words by their measured widths, as the 0.56 estimate runs the row past the field's edge. */
export const COULD_BE_BOXES: Box[] = [
  OUTER,
  runnerBox(CITY_STANDS, RUNNER.large),
  runnerBox(DASHED_AT, RUNNER.large, "left"),
  wordsBox(PACK_NAME, ENTERPRISE, 32),
  ...COULD_BE.pack.at.map((at) => runnerBox(at, RUNNER.small, "left")),
  wordsBox(WITHIN_AT, WITHIN, 32),
  ...COULD_BE.markers.flatMap((marker) => [box(marker.at.x - MARKER_R, marker.at.y - MARKER_R, 2 * MARKER_R, 2 * MARKER_R), marker.entry.at]),
];

/** The text line is the 32 px name's; the key's lines are the label's. */
export const COULD_BE_MEASURES = { textLine: TEXT_LINE, labelLine: LABEL_LINE, key: KEY } as const;
