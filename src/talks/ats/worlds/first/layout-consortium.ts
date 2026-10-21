/**
 * Slide 17's places: the City's departments as a grid of twelve plain
 * boxes, four columns by three rows, split by an aisle down the middle of
 * the stage, two columns each side; a window in each box, as on slides 12
 * and 15, and a small green person beside it once it is lit; the card that slides across the middle
 * row; and, in the aisle, a round table seen from above with ten chairs
 * round it, the bottom three of them the ones that grow, their caption
 * under them. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { TABLE as ROUND_TABLE, windowAt } from "../department-map";
import { LABEL_LINE, SAFE, contentTop, layerOf, polar, round } from "./layout";

const [OPEN_CALL, TABLE_NAME, LED] = shown("consortium", "play");

/** Where the slide's drawing starts, under its story band. */
const TOP = contentTop("consortium");

/**
 * The grid: boxes of 248 by 120 with gaps of 20, three rows from 20 px
 * under the drawing's top. Two columns sit against each edge of the band,
 * so the aisle between them is the stage's middle, 696 wide.
 */
export const GRID = { w: 248, h: 120, gap: 20, top: TOP + 20 } as const;
const COLUMNS = [SAFE.left, SAFE.left + GRID.w + GRID.gap, SAFE.right - 2 * GRID.w - GRID.gap, SAFE.right - GRID.w] as const;
const boxAt = (n: number): Box => box(COLUMNS[n % 4], GRID.top + Math.floor(n / 4) * (GRID.h + GRID.gap), GRID.w, GRID.h);
/** Where the aisle runs: from the second column's right edge to the third's left. */
export const AISLE = { x0: COLUMNS[1] + GRID.w, x1: COLUMNS[2] } as const;

/** A box's corners are rounded 10. */
export const BOX_RX = 10;
/** A person standing in a box, and the same person at the table. */
export const WALKER = { w: 36, h: 48 } as const;

/** The boxes already lit as the slide opens, as slide 12 left them: five of the twelve. */
const LIT_BOXES: readonly number[] = [1, 4, 6, 8, 11];
/** Of those, the three departments that have led, one in each row. */
const LED_BOXES: readonly number[] = [1, 6, 8];
/** The boxes the call never lights. */
const DARK_BOXES: readonly number[] = [3, 10];

/** The middle row's middle: where the card travels and where the table stands. */
const MIDDLE_ROW = GRID.top + GRID.h + GRID.gap + GRID.h / 2;

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
 * Which seat each lit box's person takes: the led three the bottom three
 * seats, the left side's people the left seats and the top, and the right
 * side's the right seats.
 */
const SEAT_OF: Readonly<Record<number, number>> = { 1: 3, 6: 2, 8: 4, 9: 5, 4: 6, 0: 7, 5: 8, 2: 9, 7: 0, 11: 1 };

/**
 * The card: 236 by 72, room for its 32 px words. It enters at the band's
 * left edge on the middle row and slides until its right edge meets the
 * band's, so it is inside the band the whole way, and is put away there.
 */
const CARD = box(SAFE.left, MIDDLE_ROW - 36, 236, 72);
const CARD_TRAVEL = SAFE.right - CARD.w - SAFE.left;

/** In a box: its person at its left, its window at its right, both on its middle line. */
const windowOf = (b: Box): Box => windowAt({ x: b.x + b.w - 60, y: b.y + b.h / 2 }, b.h);
const walkerOf = (b: Box): Box => box(b.x + 48, b.y + b.h / 2 - WALKER.h / 2, WALKER.w, WALKER.h);

/** When the card's front edge reaches a column's middle, as a fraction of its trip. */
const passes = (column: number) => Math.max(0, round((COLUMNS[column] + GRID.w / 2 - (CARD.x + CARD.w)) / CARD_TRAVEL));

const BOXES = Array.from({ length: 12 }, (_, n) => {
  const at = boxAt(n);
  const lit = !DARK_BOXES.includes(n);
  const home = walkerOf(at);
  const seat = lit ? SEAT_OF[n] : -1;
  const to = lit ? seatAt(seat) : { x: 0, y: 0 };
  return {
    key: `consortium.box.${n}`,
    at,
    led: LED_BOXES.includes(n),
    early: LIT_BOXES.includes(n),
    lit,
    column: n % 4,
    window: { key: `consortium.window.${n}`, at: windowOf(at) },
    /** A lit box's person, drawn where it ends, at its seat; before the walk it is moved back into its box by `from`. */
    walker: lit
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
  early: LIT_BOXES,
  /** The boxes the call lights, in the order it passes them: column by column, top to bottom. */
  called: BOXES.filter((b) => b.lit && !b.early)
    .sort((a, b) => a.column - b.column || a.at.y - b.at.y)
    .map((b) => BOXES.indexOf(b)),
  card: { key: "consortium.card", at: CARD, travel: CARD_TRAVEL, text: OPEN_CALL },
  /** When the card's front passes each column's middle, as a fraction of its trip. */
  passes: [0, 1, 2, 3].map(passes),
  table: {
    key: "consortium.table",
    c: TABLE.c,
    r: TABLE.r,
    name: { key: "consortium.name", text: TABLE_NAME, at: TABLE.c },
    seats: Array.from({ length: SEATS }, (_, i) => ({ key: `consortium.seat.${i}`, at: seatAt(i), leading: LEADING_SEATS.includes(i) })),
  },
  /** The caption under the three bottom chairs, 6 px under the middle one once it has grown: the lowest the safe line allows. */
  caption: { key: "consortium.led", text: LED, at: { x: TABLE.c.x, y: round(TABLE.c.y + TABLE.ring + (SEAT_10.h * SEAT_10.grow) / 2 + 6 + LABEL_LINE / 2) } },
};
