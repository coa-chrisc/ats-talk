/**
 * Slide 4, starting small: where every part goes, the id it takes and the
 * words it holds, read from the script by position. A dark desk across the
 * drawing's room, a lamp at its left end whose light falls along it, and
 * four small application tiles on it, each its own shape: two over the
 * first year, two over the next, the later two named. A tag under the row.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, labelsOf, round } from "./layout";

const [NIGHT, Y2023, Y2024, TICKET, PIPELINE, ZERO] = labelsOf("starting-small");

/** The desk: its top, the slab drawn along it, and a leg in from each end, down to the floor. */
const DESK_TOP = 850;
const DESK = { left: 200, right: 1500, slab: 20, legInset: 40, floor: 962 };
const UNDER = DESK_TOP + DESK.slab;

/** The lamp on the desk's left end: a base, a lower arm up to the elbow, an upper arm out to the joint, and a shade hung from it, aimed down the desk. */
const BASE = { x: 320, w: 140, h: 18 };
const BASE_TOP = DESK_TOP - BASE.h;
const PIVOT: Point = { x: BASE.x + BASE.w / 2, y: BASE_TOP };
const ELBOW: Point = { x: 350, y: 700 };
const JOINT: Point = { x: 470, y: 610 };
const AIM = (20 * Math.PI) / 180;
const SHADE = { from: 6, length: 70, back: 14, mouth: 40 };
/** A point `d` along the shade's aim from `from`, and `n` across it (down and back for a positive `n`). */
const along = (from: Point, d: number, n: number): Point => ({
  x: round(from.x + d * Math.cos(AIM) - n * Math.sin(AIM)),
  y: round(from.y + d * Math.sin(AIM) + n * Math.cos(AIM)),
});
const BACK_TOP = along(JOINT, SHADE.from, -SHADE.back);
const BACK_LOW = along(JOINT, SHADE.from, SHADE.back);
const MOUTH_TOP = along(JOINT, SHADE.from + SHADE.length, -SHADE.mouth);
const MOUTH_LOW = along(JOINT, SHADE.from + SHADE.length, SHADE.mouth);

/** The light: out of the shade's mouth, its upper edge falling gently (0.1 px a pixel) so the whole row and its names sit in it, to the desk's right end; its lower edge reaches the desk just past the lamp. */
const REACH = DESK.right - 20;
const LIGHT_SLOPE = 0.1;
const LIGHT: Point[] = [MOUTH_TOP, { x: REACH, y: round(MOUTH_TOP.y + LIGHT_SLOPE * (REACH - MOUTH_TOP.x)) }, { x: REACH, y: DESK_TOP }, { x: round(MOUTH_LOW.x + 60), y: DESK_TOP }, MOUTH_LOW];

/** The four tiles, standing on the desk, each a different shape: a square, a tall card, a circle and a wide card, a wider gap between the years' pairs. */
const SQUARE = box(640, DESK_TOP - 100, 100, 100);
const TALL = box(790, DESK_TOP - 140, 76, 140);
const ROUND = box(946, DESK_TOP - 112, 112, 112);
const WIDE = box(1150, DESK_TOP - 100, 200, 100);
/** A tile's short rules, as if it held a few lines of its own: each row is its left end, its height and its length. */
const rules = (rows: readonly (readonly [number, number, number])[]) => rows.map(([x, y, w]) => `M${x} ${y}H${x + w}`).join("");
const TILES = [
  { at: SQUARE, round: false, rules: rules([[SQUARE.x + 22, SQUARE.y + 36, 56], [SQUARE.x + 22, SQUARE.y + 58, 38]]) },
  { at: TALL, round: false, rules: rules([[TALL.x + 18, TALL.y + 36, 40], [TALL.x + 18, TALL.y + 58, 40], [TALL.x + 18, TALL.y + 80, 26]]) },
  { at: ROUND, round: true, rules: rules([[ROUND.x + 30, ROUND.y + 48, 52], [ROUND.x + 30, ROUND.y + 68, 36]]) },
  { at: WIDE, round: false, rules: rules([[WIDE.x + 18, WIDE.y + 30, 164], [WIDE.x + 18, WIDE.y + 54, 102], [WIDE.x + 18, WIDE.y + 74, 78]]) },
];

/** Under the desk: the lamp's label under its base, each year under its pair; over the later pair, each tile's name, inside the light. */
const LABEL_Y = UNDER + 14;
const NAME_Y = 690;
const middle = (a: Box, b: Box) => (a.x + b.x + b.w) / 2;
const centred = (x: number, y: number, w: number) => box(round(x - w / 2), y, w, LABEL_LINE);
/** The tag, under the years, centred on the row: as wide as its words in the label type (about 410 px) and room either side. */
const TAG = box(round(middle(SQUARE, WIDE) - 230), LABEL_Y + LABEL_LINE + 16, 460, 44);

export const START = {
  desk: { key: "start.desk", d: `M${DESK.left} ${DESK_TOP + DESK.slab / 2}H${DESK.right}` },
  legs: { key: "start.legs", d: [DESK.left + DESK.legInset, DESK.right - DESK.legInset].map((x) => `M${x} ${UNDER}V${DESK.floor}`).join("") },
  lamp: {
    key: "start.lamp",
    base: `M${BASE.x} ${DESK_TOP}V${BASE_TOP + 8}Q${BASE.x} ${BASE_TOP} ${BASE.x + 10} ${BASE_TOP}H${BASE.x + BASE.w - 10}Q${BASE.x + BASE.w} ${BASE_TOP} ${BASE.x + BASE.w} ${BASE_TOP + 8}V${DESK_TOP}`,
    arm: `M${PIVOT.x} ${PIVOT.y}L${ELBOW.x} ${ELBOW.y}L${JOINT.x} ${JOINT.y}`,
    joints: [ELBOW, JOINT],
    shade: `M${BACK_TOP.x} ${BACK_TOP.y}L${MOUTH_TOP.x} ${MOUTH_TOP.y}L${MOUTH_LOW.x} ${MOUTH_LOW.y}L${BACK_LOW.x} ${BACK_LOW.y}Z`,
    label: { key: "start.night", text: NIGHT, at: centred(PIVOT.x, LABEL_Y, 190) },
  },
  /** The lamp's light, which comes on at once. */
  light: { key: "start.light", points: LIGHT.map((p) => `${p.x},${p.y}`).join(" "), at: LIGHT },
  tiles: TILES.map((tile, i) => ({ key: `start.tile.${i}`, ...tile })),
  years: [
    { key: "start.year.0", text: Y2023, at: centred(middle(SQUARE, TALL), LABEL_Y, 120) },
    { key: "start.year.1", text: Y2024, at: centred(middle(ROUND, WIDE), LABEL_Y, 120) },
  ],
  names: [
    { key: "start.name.0", text: TICKET, at: centred(ROUND.x + ROUND.w / 2, NAME_Y, 190) },
    { key: "start.name.1", text: PIPELINE, at: centred(WIDE.x + WIDE.w / 2, NAME_Y, 212) },
  ],
  zero: { key: "start.zero", text: ZERO, at: TAG, drop: -24 },
};

/** Everything slide 4 draws, for the layout test. */
export const START_DRAWN: Record<string, Box[]> = {
  "starting-small": [
    box(DESK.left, DESK_TOP, DESK.right - DESK.left, DESK.floor - DESK_TOP),
    box(BASE.x, BASE_TOP, BASE.w, BASE.h),
    box(ELBOW.x, BACK_TOP.y, MOUTH_TOP.x - ELBOW.x, PIVOT.y - BACK_TOP.y),
    box(MOUTH_LOW.x, MOUTH_TOP.y, REACH - MOUTH_LOW.x, DESK_TOP - MOUTH_TOP.y),
    ...TILES.map((tile) => tile.at),
    START.lamp.label.at,
    ...START.years.map((year) => year.at),
    ...START.names.map((name) => name.at),
    TAG,
    { ...TAG, y: TAG.y + START.zero.drop },
  ],
};
