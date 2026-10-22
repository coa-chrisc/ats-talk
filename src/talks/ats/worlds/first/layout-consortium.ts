/**
 * Slide 17's places: the City's departments as the department map's grid
 * (department-map.ts), seven boxes by three at the size and height slides
 * 11, 12 and 15 draw it, split by an aisle down the middle of the stage: the
 * first four columns where the grid stood, the last three across the aisle.
 * A window in each box, lit as slide 12 lit them, and a small green person
 * beside it once a named or called box is lit; the card that slides across
 * the middle row; and, in the aisle, a round table seen from above with ten
 * chairs round it, the bottom three of them the ones that grow, their
 * caption under them. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { GRID as MAP, LIT, MAP_AT, TABLE as ROUND_TABLE, WINDOW, windowAt } from "../department-map";
import { LABEL_LINE, SAFE, layerOf, polar, round } from "./layout";

const [OPEN_CALL, TABLE_NAME, LED] = shown("consortium", "play");

/**
 * The grid: the map's boxes, 94 by 54, 12 apart across and 10 down, from the
 * map's place. Columns 0 to 3 stand where the grid stands on slides 11, 12
 * and 15; columns 4 to 6 stand as far right of the stage's middle as the
 * first four end left of it, so the aisle between them is the stage's middle.
 */
export const GRID = { w: MAP.box.w, h: MAP.box.h, pitch: { x: MAP.box.w + MAP.gap, y: MAP.box.h + MAP.rowGap }, top: MAP_AT.y, split: 4 } as const;
const LEFT_END = MAP_AT.x + (GRID.split - 1) * GRID.pitch.x + GRID.w;
const RIGHT_START = 960 + (960 - LEFT_END);
const COLUMNS = Array.from({ length: MAP.cols }, (_, c) => (c < GRID.split ? MAP_AT.x + c * GRID.pitch.x : RIGHT_START + (c - GRID.split) * GRID.pitch.x));
const boxAt = (col: number, row: number): Box => box(COLUMNS[col], GRID.top + row * GRID.pitch.y, GRID.w, GRID.h);
/** Where the aisle runs: from the fourth column's right edge to the fifth's left. */
export const AISLE = { x0: LEFT_END, x1: RIGHT_START } as const;

/** A box's corners are rounded as the map's. */
export const BOX_RX = MAP.rx;
/** A person standing in a box, and the same person at the table. */
export const WALKER = { w: 32, h: 42 } as const;

const same = (a: readonly number[], b: readonly number[]) => a[0] === b[0] && a[1] === b[1];
const listed = (cells: readonly (readonly number[])[], col: number, row: number) => cells.some((cell) => same(cell, [col, row]));

/** The boxes the call lights, as [column, row]: two each side of the aisle, among the dark ones. */
const CALLED: readonly (readonly [number, number])[] = [
  [3, 0],
  [1, 2],
  [4, 0],
  [6, 1],
];
/** The three departments that have led, among the named, one in each row. */
const LED_CELLS: readonly (readonly [number, number])[] = [
  [0, 0],
  [4, 1],
  [6, 2],
];

/** The middle row's middle: where the card travels and where the table stands. */
const MIDDLE_ROW = GRID.top + GRID.pitch.y + GRID.h / 2;

/**
 * The table, the department map's (department-map.ts): in the aisle, level
 * with the middle row. Its top is 124 across the radius, wide enough for its
 * name at 32 px; ten chairs stand on a ring of 164 round it, clear of its
 * edge even once the three have grown.
 */
const TABLE = { c: { x: 960, y: MIDDLE_ROW } as Point, r: ROUND_TABLE.r, ring: ROUND_TABLE.ring } as const;
/** A chair seen from above, wide enough for a standing person in it, and how much the three grow. */
export const SEAT_10 = { ...ROUND_TABLE.seat, grow: 1.3 } as const;
const SEATS = ROUND_TABLE.seats;
/** The seats the three led departments take: the bottom three. */
const LEADING_SEATS: readonly number[] = [2, 3, 4];

/** Seats in order round the table, the first just above the right, going round clockwise (the stage's y grows downward). */
const seatAt = (i: number) => polar(TABLE.c, TABLE.ring, (360 / SEATS) * i + ROUND_TABLE.phase);

/**
 * Which seat each person takes, by its box's [column, row]: the led three
 * the bottom three seats, the left side's people the left seats and the
 * top, and the right side's the right seats, each nearest the row it
 * leaves.
 */
const SEAT_OF: readonly { cell: readonly [number, number]; seat: number }[] = [
  { cell: [0, 0], seat: 4 },
  { cell: [1, 2], seat: 5 },
  { cell: [2, 1], seat: 6 },
  { cell: [1, 0], seat: 7 },
  { cell: [3, 0], seat: 8 },
  { cell: [4, 0], seat: 9 },
  { cell: [6, 1], seat: 0 },
  { cell: [5, 2], seat: 1 },
  { cell: [6, 2], seat: 2 },
  { cell: [4, 1], seat: 3 },
];

/**
 * The card: 236 by 72, room for its 32 px words. It enters at the band's
 * left edge on the middle row and slides until its right edge meets the
 * band's, so it is inside the band the whole way, and is put away there.
 */
const CARD = box(SAFE.left, MIDDLE_ROW - 36, 236, 72);
const CARD_TRAVEL = SAFE.right - CARD.w - SAFE.left;

/** In a box: its person 8 px in from its left, its window right of the person, both on its middle line. */
const windowOf = (b: Box, small: boolean): Box => windowAt({ x: b.x + b.w - 28, y: b.y + b.h / 2 }, b.h, small ? WINDOW.small : 1);
const walkerOf = (b: Box): Box => box(b.x + 8, b.y + b.h / 2 - WALKER.h / 2, WALKER.w, WALKER.h);

/** When the card's front edge reaches a column's middle, as a fraction of its trip. */
const passes = (column: number) => Math.max(0, round((COLUMNS[column] + GRID.w / 2 - (CARD.x + CARD.w)) / CARD_TRAVEL));

const BOXES = Array.from({ length: MAP.cols * MAP.rows }, (_, n) => {
  const [col, row] = [n % MAP.cols, Math.floor(n / MAP.cols)];
  const at = boxAt(col, row);
  const named = listed(LIT.named, col, row);
  const faint = listed(LIT.unnamed, col, row);
  const called = listed(CALLED, col, row);
  const home = walkerOf(at);
  const seat = SEAT_OF.find((entry) => same(entry.cell, [col, row]))?.seat ?? -1;
  const to = seat >= 0 ? seatAt(seat) : { x: 0, y: 0 };
  return {
    key: `consortium.box.${n}`,
    at,
    row,
    led: listed(LED_CELLS, col, row),
    /** Lit before the call: the nine slide 12 lit, the three unnamed faintly. */
    early: named || faint,
    lit: named || faint || called,
    column: col,
    window: { key: `consortium.window.${n}`, at: windowOf(at, faint), lit: faint ? WINDOW.faint : 1 },
    /** A named or called box's person, drawn where it ends, at its seat; before the walk it is moved back into its box by `from`. */
    walker:
      named || called
        ? {
            key: `consortium.walker.${n}`,
            glyph: `consortium.walker.${n}.glyph`,
            at: box(round(to.x - WALKER.w / 2), round(to.y - WALKER.h / 2), WALKER.w, WALKER.h),
            from: { x: round(home.x - (to.x - WALKER.w / 2)), y: round(home.y - (to.y - WALKER.h / 2)) },
            home,
            seat,
          }
        : null,
  };
});

export const CONSORTIUM = {
  ...layerOf("consortium"),
  boxes: BOXES,
  /** The boxes lit before the call. */
  early: BOXES.filter((b) => b.early).map((b) => BOXES.indexOf(b)),
  /** The boxes the call lights, in the order it passes them: column by column, top to bottom. */
  called: BOXES.filter((b) => b.lit && !b.early)
    .sort((a, b) => a.column - b.column || a.at.y - b.at.y)
    .map((b) => BOXES.indexOf(b)),
  card: { key: "consortium.card", at: CARD, travel: CARD_TRAVEL, text: OPEN_CALL },
  /** When the card's front passes each column's middle, as a fraction of its trip. */
  passes: COLUMNS.map((_, c) => passes(c)),
  table: {
    key: "consortium.table",
    c: TABLE.c,
    r: TABLE.r,
    name: { key: "consortium.name", text: TABLE_NAME, at: TABLE.c },
    seats: Array.from({ length: SEATS }, (_, i) => ({ key: `consortium.seat.${i}`, at: seatAt(i), leading: LEADING_SEATS.includes(i) })),
  },
  /** The caption under the three bottom chairs, 6 px under the middle one once it has grown. */
  caption: { key: "consortium.led", text: LED, at: { x: TABLE.c.x, y: round(TABLE.c.y + TABLE.ring + (SEAT_10.h * SEAT_10.grow) / 2 + 6 + LABEL_LINE / 2) } },
};
