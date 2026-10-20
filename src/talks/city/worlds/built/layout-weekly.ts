/**
 * Slide 5a, every week: where every part goes, the id it takes and the
 * words it holds, read from the script by position. On the left, a
 * calendar of weeks, two and a half years of them, under the three names
 * that meet in them; on the right, a stair of three steps up to a closed
 * door, the figure that climbs it, and the tag beside the door.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { KEY_LINE, LABEL_LINE, LINE, labelsOf } from "./layout";

const [EVERY, SECURITY, MICROSOFT, QUISITIVE, GO, SANDBOX, PILOTS, PRODUCTION, DEMAND] = labelsOf("weekly");

/** The calendar: 26 weeks to a row, five rows, 130 weeks in all, filled a row at a time from the top left. */
const COLS = 26;
const ROWS = 5;
const CELL = { w: 25, h: 30, pitch: 31, rowPitch: 40 };
/** The names' row, a clear gap under the story band, and the calendar under it. */
const NAMES_Y = 650;
const CAL = { x: 96, y: NAMES_Y + LINE + 17 };
const CAL_W = (COLS - 1) * CELL.pitch + CELL.w;
const CAL_H = (ROWS - 1) * CELL.rowPitch + CELL.h;
const WEEKS: Box[] = Array.from({ length: ROWS * COLS }, (_, i) => box(CAL.x + (i % COLS) * CELL.pitch, CAL.y + Math.floor(i / COLS) * CELL.rowPitch, CELL.w, CELL.h));

/** The stair: three steps, each 56 px higher than the last, standing on one floor, and the door on the top step's far end. */
const FLOOR = 980;
const STEP = { x: 980, w: 230, rise: 56 };
const STEPS: Box[] = [0, 1, 2].map((s) => box(STEP.x + s * STEP.w, FLOOR - (s + 1) * STEP.rise, STEP.w, (s + 1) * STEP.rise));
const DOOR_TOP = 672;
const DOOR = box(1560, DOOR_TOP, 96, FLOOR - 3 * STEP.rise - DOOR_TOP);
/** The tag beside the door, at its upper half, over the figure's head: as wide as its words, about 14 px a letter, its right end 16 px short of the door. */
const DEMAND_W = Math.round(DEMAND.length * 14 + 32);
const DEMAND_AT = box(DOOR.x - 16 - DEMAND_W, DOOR.y + 8, DEMAND_W, 44);
/** The figure: on the floor before the first step, then on each step in turn, short of the door. */
const FIGURE = { w: 48, h: 64 };
const STANDS: Point[] = [
  { x: 920, y: FLOOR },
  { x: STEPS[0].x + 80, y: STEPS[0].y },
  { x: STEPS[1].x + 80, y: STEPS[1].y },
  { x: STEPS[2].x + 40, y: STEPS[2].y },
];

export const WEEKLY = {
  names: [SECURITY, MICROSOFT, QUISITIVE].map((text, i) => ({ key: `weekly.name.${i}`, text, at: box(CAL.x + i * (CAL_W / 3), NAMES_Y, CAL_W / 3, LINE) })),
  /** Each week's outline, and the meeting mark that lands in it: one id each for all 130, so they show in order. */
  weeks: { key: "weekly.weeks", at: WEEKS },
  marks: { key: "weekly.meetings", at: WEEKS.map((week): Point => ({ x: week.x + week.w / 2, y: week.y + week.h / 2 })) },
  every: { key: "weekly.every", text: EVERY, at: box(CAL.x, CAL.y + CAL_H + 18, CAL_W, LABEL_LINE) },
  floor: { key: "weekly.floor", d: `M${STEPS[0].x - 120} ${FLOOR}H${STEPS[2].x + STEP.w}` },
  steps: STEPS.map((at, s) => ({
    key: `weekly.step.${s}`,
    at,
    label: { key: `weekly.step.${s}.label`, text: [SANDBOX, PILOTS, PRODUCTION][s], at: box(at.x, at.y + 14, at.w, LABEL_LINE) },
  })),
  door: {
    key: "weekly.door",
    at: DOOR,
    knob: { x: DOOR.x + DOOR.w - 18, y: DOOR.y + DOOR.h / 2 + 10 },
    go: { key: "weekly.go", text: GO, at: box(DOOR.x, DOOR.y + 18, DOOR.w, KEY_LINE) },
    demand: { key: "weekly.demand", text: DEMAND, at: DEMAND_AT },
  },
  figure: {
    key: "weekly.figure",
    at: box(STANDS[0].x - FIGURE.w / 2, STANDS[0].y - FIGURE.h, FIGURE.w, FIGURE.h),
    /** Each step it climbs to, as the move from where it starts. */
    hops: STANDS.slice(1).map((stand) => ({ x: stand.x - STANDS[0].x, y: stand.y - STANDS[0].y })),
  },
};

/** How many weeks the calendar holds: the steps light as it passes a third of them, two thirds, and the last. */
export const WEEK_COUNT = WEEKS.length;

/** Everything slide 5a draws, for the layout test. */
export const WEEKLY_DRAWN: Record<string, Box[]> = {
  weekly: [
    ...WEEKLY.names.map((name) => name.at),
    box(CAL.x, CAL.y, CAL_W, CAL_H),
    WEEKLY.every.at,
    ...STEPS,
    ...WEEKLY.steps.map((step) => step.label.at),
    DOOR,
    DEMAND_AT,
    ...WEEKLY.figure.hops.map((hop) => ({ ...WEEKLY.figure.at, x: WEEKLY.figure.at.x + hop.x, y: WEEKLY.figure.at.y + hop.y })),
    WEEKLY.figure.at,
  ],
};
