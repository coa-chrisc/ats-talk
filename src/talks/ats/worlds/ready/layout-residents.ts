/**
 * Slide 18's places: a counter scene seen from the front, large, on a floor
 * line, with the parts that must touch drawn touching. Every word is read
 * from the script, by position.
 *
 * On the left, a member of staff seated behind a desk, with only their head
 * and shoulders over its top, named under the desk. The orange mark is above
 * their head. The green helper sits right beside them on the staff's side,
 * named under it. To the right of the desk's front edge, a low picket fence
 * stands on the floor, named under it. Across the fence a resident stands on
 * the floor, named under them. The card comes out of the helper, rises over
 * everything, crosses over the fence and comes down so its leading end
 * touches the resident at chest height. At the right, the test is a heading
 * level with the desk's top and two ticked lines under it, with no box.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { TEXT_LINE, groupOf, labelsOf, personAt, wordsBox, wordsWidth } from "./layout";

const [STAFF, HELPER, RESIDENT, FENCE, CARD_WORDS, TEST, ...CHECKS] = labelsOf("residents");

/** The floor everyone stands on; the names sit on one line 32 under it. */
const FLOOR_Y = 900;
const NAME_Y = FLOOR_Y + 32;
/** The floor line: from under the desk's back to past the resident. */
const FLOOR = { x0: 150, x1: 1400 } as const;
/** The people at about 170 px tall: the kit's 64 px person at 170/64. */
const SCALE = 170 / 64;
/** The desk: 560 wide, a navy top slab 24 thick at 720, and a raised front panel down to the floor, set in 20 from each end. */
const DESK = { x: 200, w: 560, top: 720, slab: 24, inset: 20 } as const;
/** The member of staff, seated behind the desk: their middle at x 380, their top at 560, so the desk's top cuts them at the chest. */
const staffAt = personAt(316, 560, SCALE);
/** The helper: the kit's agent at a 45 px radius (about 90 px across), right beside the member of staff, 12 clear of their shoulder, its ring 26 over the desk's top; its name 30 under its middle, still over the desk's top. */
export const HELPER_R = 45;
const HELPER_AT = { x: 501, y: 625 } as const;
/** The fence: 320 wide and 48 tall, standing on the floor 80 past the desk's front edge; six pickets 12 wide, and a rail 18 over the floor. */
const PICKETS = { x: 840, w: 320, h: 48, count: 6, picket: 12, rail: 18 } as const;
/** The resident stands on the floor across the fence, 60 clear of it. */
const residentAt = personAt(1220, FLOOR_Y - Math.round(64 * SCALE), SCALE);
/**
 * The card: its words with 22 px each side. It starts with its left end at
 * the helper's left edge, so it comes out of the helper and rises clear of
 * the orange mark; it rises to 492, crosses, and comes down so its leading
 * end overlaps the resident's near shoulder by 30 px, its middle at 816, its
 * foot 8 over the fence's top.
 */
const CARD = { h: 56, pad: 22, lift: 492, into: 30, served: 816 } as const;
const MARK_R = 24;
const cardW = wordsWidth(CARD_WORDS) + 2 * CARD.pad;
const cardStart = box(HELPER_AT.x - HELPER_R, HELPER_AT.y - CARD.h / 2, cardW, CARD.h);
const cardEnd = { x: residentAt.x + CARD.into - cardW, y: CARD.served - CARD.h / 2 };
/** The test: the heading's top level with the desk's top, at x 1434; the lines 72 apart under it, each with a 16 px tick and its words 30 right of the tick. */
const TEST_AT = { x: 1434, first: 818, pitch: 72, tick: 16, words: 1480 } as const;

const pickets = Array.from({ length: PICKETS.count }, (_, i) => {
  const x = PICKETS.x + (i * (PICKETS.w - PICKETS.picket)) / (PICKETS.count - 1);
  return box(x, FLOOR_Y - PICKETS.h, PICKETS.picket, PICKETS.h);
});

export const RESIDENTS = {
  ...groupOf("residents"),
  floor: { key: "residents.floor", d: `M${FLOOR.x0} ${FLOOR_Y}H${FLOOR.x1}` },
  staff: { key: "residents.staff", at: staffAt, name: { key: "residents.staff.name", text: STAFF, at: { x: DESK.x + DESK.w / 2, y: NAME_Y } as Point } },
  desk: {
    key: "residents.desk",
    at: box(DESK.x, DESK.top, DESK.w, FLOOR_Y - DESK.top),
    slab: box(DESK.x, DESK.top, DESK.w, DESK.slab),
    body: box(DESK.x + DESK.inset, DESK.top + DESK.slab, DESK.w - 2 * DESK.inset, FLOOR_Y - DESK.top - DESK.slab),
  },
  helper: { key: "residents.helper", at: HELPER_AT as Point, name: { key: "residents.helper.name", text: HELPER, at: { x: HELPER_AT.x, y: HELPER_AT.y + HELPER_R + 30 } as Point } },
  /** The resident walks in from `from` px to the right, and stands across the fence from the desk. */
  resident: { key: "residents.resident", at: residentAt, from: 300, name: { key: "residents.resident.name", text: RESIDENT, at: { x: residentAt.x + residentAt.w / 2, y: NAME_Y } as Point } },
  fence: {
    key: "residents.fence",
    at: box(PICKETS.x, FLOOR_Y - PICKETS.h, PICKETS.w, PICKETS.h),
    rail: { key: "residents.fence.rail", d: `M${PICKETS.x} ${FLOOR_Y - PICKETS.rail}H${PICKETS.x + PICKETS.w}` },
    pickets,
    /** The pickets grow up from the floor: their origin. */
    origin: { x: PICKETS.x, y: FLOOR_Y } as Point,
    name: { key: "residents.fence.name", text: FENCE, at: { x: PICKETS.x + PICKETS.w / 2, y: NAME_Y } as Point },
  },
  /** The card at its start, on the helper, and the offsets of its legs: up, across, and down to the resident. */
  card: {
    key: "residents.card",
    at: cardStart,
    text: CARD_WORDS,
    lift: CARD.lift - cardStart.y,
    across: cardEnd.x - cardStart.x,
    served: cardEnd.y - cardStart.y,
  },
  /** The orange mark just above the member of staff's head, so it is plainly theirs and stands apart from the green helper. */
  mark: { key: "residents.mark", at: { x: staffAt.x + staffAt.w / 2, y: staffAt.y - MARK_R - 8 } as Point },
  list: {
    heading: { key: "residents.list.heading", text: TEST, at: { x: TEST_AT.x, y: DESK.top + TEXT_LINE / 2 } as Point },
    rows: CHECKS.map((text, i) => {
      const y = TEST_AT.first + i * TEST_AT.pitch;
      return {
        key: `residents.list.${i}`,
        tick: `residents.list.${i}.tick`,
        centre: { x: TEST_AT.x + TEST_AT.tick, y } as Point,
        r: TEST_AT.tick,
        text,
        at: { x: TEST_AT.words, y } as Point,
      };
    }),
  },
};

/** The card's places, as boxes: at its start on the helper, raised, raised over the resident's side, and served. */
export const CARD_PLACES = {
  start: cardStart,
  lifted: { ...cardStart, y: CARD.lift },
  over: { ...cardStart, x: cardEnd.x, y: CARD.lift },
  served: { ...cardStart, x: cardEnd.x, y: cardEnd.y },
};

/** Measures the layout test checks against. */
export const RESIDENTS_MEASURES = { floor: FLOOR_Y, deskFront: DESK.x + DESK.w, scale: SCALE } as const;

/** Everything slide 18 draws under its story band, for the layout test, the card at each of its places. */
export const RESIDENTS_BOXES: Box[] = [
  RESIDENTS.staff.at,
  RESIDENTS.desk.at,
  wordsBox(RESIDENTS.staff.name.at, STAFF),
  box(HELPER_AT.x - HELPER_R, HELPER_AT.y - HELPER_R, 2 * HELPER_R, 2 * HELPER_R),
  wordsBox(RESIDENTS.helper.name.at, HELPER),
  RESIDENTS.resident.at,
  wordsBox(RESIDENTS.resident.name.at, RESIDENT),
  RESIDENTS.fence.at,
  wordsBox(RESIDENTS.fence.name.at, FENCE),
  box(FLOOR.x0, FLOOR_Y - 2, FLOOR.x1 - FLOOR.x0, 4),
  ...Object.values(CARD_PLACES),
  box(RESIDENTS.mark.at.x - MARK_R, RESIDENTS.mark.at.y - MARK_R, 2 * MARK_R, 2 * MARK_R),
  wordsBox(RESIDENTS.list.heading.at, TEST, 32, "start"),
  ...RESIDENTS.list.rows.flatMap((row) => [box(row.centre.x - row.r, row.centre.y - row.r, 2 * row.r, 2 * row.r), wordsBox(row.at, row.text, 32, "start")]),
];
