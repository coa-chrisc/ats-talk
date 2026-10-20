/**
 * Slide 9, Monday to Friday: where every part goes, the id it takes and
 * the words it holds, read from the script by position. A week strip of
 * five days across the left of the stage, the first and last named; on
 * the first day the team and the stakeholder at a table, the stakeholder
 * named; on the last, the stakeholder again with a small working app in
 * hand, named. After the strip, two loops on the line out of it, each
 * named, and at the far right a solid tile it arrives at, named on its
 * face. A tag under the strip.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, labelsOf, round } from "./layout";

const [MONDAY, FRIDAY, STAKEHOLDER, PROTOTYPE, FEEDBACK, PILOT, FAILED] = labelsOf("too-long");

/** The strip: five days in a row from the left edge, a small gap between them, its middle the line the loops ride. */
const DAY = { w: 228, h: 60, gap: 8 };
const STRIP = { x: 96, y: 760 };
const DAYS: Box[] = Array.from({ length: 5 }, (_, i) => box(STRIP.x + i * (DAY.w + DAY.gap), STRIP.y, DAY.w, DAY.h));
const STRIP_RIGHT = DAYS[4].x + DAY.w;
const AXIS = STRIP.y + DAY.h / 2;

/** A figure, as the other slides draw one, standing on the strip. */
const FIGURE = { w: 40, h: 56 };
const standing = (cx: number) => box(cx - FIGURE.w / 2, STRIP.y - FIGURE.h, FIGURE.w, FIGURE.h);

/** The first day: the team of two on the left of a small table, the stakeholder across it on the right, all on the first day's block. */
const TEAM = [124, 168].map(standing);
const TABLE = { left: 198, right: 258, top: 732, legs: [206, 250] };
const MEETS = standing(288);
/** The last day: the stakeholder again, the app held in front, its right side. */
const HOLDS = standing(DAYS[4].x + 90);
const APP = box(HOLDS.x + 30, STRIP.y - 46, 30, 42);
/** The stakeholder is named beside them, to their right, at their middle, so the name is theirs and not the table's; the app is named over the last day's figure. */
const NAME_Y = HOLDS.y - 16 - LABEL_LINE;

/** The loops: the line runs on out of the strip's right end and, after the last day, makes two loops above itself, then arrives at the tile. */
const LOOP_R = 34;
const LOOP_X = [1340, 1490];
const loop = (cx: number) => `H${cx}A${LOOP_R} ${LOOP_R} 0 0 0 ${cx} ${AXIS - 2 * LOOP_R}A${LOOP_R} ${LOOP_R} 0 0 0 ${cx} ${AXIS}`;
const BETWEEN = round((LOOP_X[0] + LOOP_X[1]) / 2);
/** The tile at the far right, on the line, its name on its face: as wide as its name in the label type (about 200 px) and room either side. */
const TILE = box(1576, AXIS - 50, 240, 100);
const ARRIVE: Point = { x: TILE.x - 14, y: AXIS };

/** The tag under the strip, centred on it: as wide as its words in the label type (about 290 px) and room either side. */
const TAG = box(round((STRIP.x + STRIP_RIGHT) / 2 - 170), STRIP.y + DAY.h + 32, 340, 44);

export const TOO_LONG = {
  days: DAYS.map((at, i) => ({ key: `tooLong.day.${i}`, at, fill: `tooLong.day.${i}.fill` })),
  dayNames: [
    { key: "tooLong.day.0.name", text: MONDAY, at: box(DAYS[0].x, AXIS - LABEL_LINE / 2, DAY.w, LABEL_LINE) },
    { key: "tooLong.day.4.name", text: FRIDAY, at: box(DAYS[4].x, AXIS - LABEL_LINE / 2, DAY.w, LABEL_LINE) },
  ],
  team: TEAM.map((at, i) => ({ key: `tooLong.team.${i}`, at })),
  table: { key: "tooLong.table", d: `M${TABLE.left} ${TABLE.top}H${TABLE.right}${TABLE.legs.map((x) => `M${x} ${TABLE.top}V${STRIP.y}`).join("")}` },
  meets: { key: "tooLong.meets", at: MEETS, label: { key: "tooLong.meets.name", text: STAKEHOLDER, at: box(MEETS.x + FIGURE.w + 12, MEETS.y + FIGURE.h / 2 - LABEL_LINE / 2, 170, LABEL_LINE) } },
  holds: { key: "tooLong.holds", at: HOLDS },
  /** The app: it lands in the stakeholder's hands from this far above. */
  app: {
    key: "tooLong.app",
    at: APP,
    rules: `M${APP.x + 8} ${APP.y + 14}H${APP.x + 22}M${APP.x + 8} ${APP.y + 24}H${APP.x + 18}`,
    drop: -40,
    label: { key: "tooLong.app.name", text: PROTOTYPE, at: box(round(APP.x + APP.w / 2 - 125), NAME_Y, 250, LABEL_LINE) },
  },
  loops: [
    { key: "tooLong.loop.0", d: `M${STRIP_RIGHT + 8} ${AXIS}${loop(LOOP_X[0])}H${BETWEEN}` },
    { key: "tooLong.loop.1", d: `M${BETWEEN} ${AXIS}${loop(LOOP_X[1])}H${ARRIVE.x}` },
  ].map((entry, i) => ({ ...entry, label: { key: `tooLong.loop.${i}.name`, text: FEEDBACK, at: box(LOOP_X[i] - 65, AXIS + 16, 130, LABEL_LINE) } })),
  /** Where the second loop's line ends, its head pointing into the tile. */
  arrive: { end: ARRIVE, heading: 0 },
  pilot: { key: "tooLong.pilot", text: PILOT, at: TILE, drop: -24 },
  failed: { key: "tooLong.failed", text: FAILED, at: TAG, drop: -24 },
};

/** Everything slide 9 draws, for the layout test. */
export const TOO_LONG_DRAWN: Record<string, Box[]> = {
  "too-long": [
    ...DAYS,
    ...TOO_LONG.dayNames.map((name) => name.at),
    ...TEAM,
    box(TABLE.left, TABLE.top, TABLE.right - TABLE.left, STRIP.y - TABLE.top),
    MEETS,
    TOO_LONG.meets.label.at,
    HOLDS,
    APP,
    { ...APP, y: APP.y + TOO_LONG.app.drop },
    TOO_LONG.app.label.at,
    ...LOOP_X.map((cx) => box(cx - LOOP_R, AXIS - 2 * LOOP_R, 2 * LOOP_R, 2 * LOOP_R)),
    box(STRIP_RIGHT, AXIS - 2, ARRIVE.x - STRIP_RIGHT, 4),
    ...TOO_LONG.loops.map((entry) => entry.label.at),
    TILE,
    { ...TILE, y: TILE.y + TOO_LONG.pilot.drop },
    TAG,
    { ...TAG, y: TAG.y + TOO_LONG.failed.drop },
  ],
};
