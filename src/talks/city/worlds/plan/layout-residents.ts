/**
 * Slide 21a of the plan world: where every part goes, the id it takes and
 * the words it holds, read from the script.
 *
 * On the left a member of staff at a desk, named under it, with a green
 * agent at their side, named under it. A resident walks up from the right,
 * named under them. A fence draws down between the desk and the resident,
 * named at its foot. A card comes up over the desk, lifts over the fence and
 * waits on the resident's side; the member of staff takes the orange mark
 * over their head, so it reads as theirs and not as a second helper, and the
 * card comes down to the resident. On the right a checklist comes up under
 * its heading, and each of its three lines takes a deep-green tick in turn.
 */
import { AGENT_R, box, type Box, type Point } from "@/components/deck/kit";
import { labelBox, labelWidth, labelsOf, personAt } from "./layout";

const [STAFF, HELPER, RESIDENT, FENCE, CARD_WORDS, TEST, ...CHECKS] = labelsOf("residents");

const FLOOR_Y = 812;
const SCALE = 1.5;
const staffAt = personAt(400, 648, SCALE);
const DESK = box(320, 732, 300, FLOOR_Y - 732);
const residentAt = personAt(980, FLOOR_Y - Math.round(64 * SCALE), SCALE);
const RAIL = { x: 760, top: 572, foot: 932, post: 12, pitch: 90 } as const;
const NAME_Y = FLOOR_Y + 32;
/** The card: its words with room round them. It comes up over the desk, lifts clear of the fence's top, crosses, waits, and comes down to the resident. */
const CARD = { h: 56, pad: 22, x: 180, y: 580, lift: 480, across: 800, served: 642 } as const;
/** The kit's orange mark: its ring's radius. */
const MARK_R = 24;
const cardW = labelWidth(CARD_WORDS) + 2 * CARD.pad;
/** The checklist: its heading at the top, then its three lines. */
const LIST = { x: 1400, y: 592, w: 400, h: 290, heading: 640, first: 708, pitch: 66, box: 28 } as const;

export const RESIDENTS = {
  staff: { key: "residents.staff", at: staffAt, name: { key: "residents.staff.name", text: STAFF, at: { x: DESK.x + DESK.w / 2, y: NAME_Y } as Point } },
  desk: { key: "residents.desk", at: DESK },
  helper: { key: "residents.helper", at: { x: 220, y: 732 } as Point, name: { key: "residents.helper.name", text: HELPER, at: { x: 220, y: 732 + AGENT_R + 28 } as Point } },
  /** The resident walks in from `from` px to the right, and stands across the fence from the desk. */
  resident: { key: "residents.resident", at: residentAt, from: 380, name: { key: "residents.resident.name", text: RESIDENT, at: { x: residentAt.x + residentAt.w / 2, y: NAME_Y } as Point } },
  fence: {
    key: "residents.fence",
    d: `M${RAIL.x} ${RAIL.top}V${RAIL.foot}`,
    posts: {
      key: "residents.fence.posts",
      at: Array.from({ length: (RAIL.foot - RAIL.top) / RAIL.pitch + 1 }, (_, i) => box(RAIL.x - RAIL.post / 2, RAIL.top + i * RAIL.pitch - RAIL.post / 2, RAIL.post, RAIL.post)),
    },
    name: { key: "residents.fence.name", text: FENCE, at: { x: RAIL.x, y: RAIL.foot + 32 } as Point },
  },
  /** The card at its start, and the offsets of its legs: up clear of the fence, across, and down to the resident. */
  card: {
    key: "residents.card",
    at: box(CARD.x, CARD.y, cardW, CARD.h),
    text: CARD_WORDS,
    lift: CARD.lift - CARD.y,
    across: CARD.across - CARD.x,
    served: CARD.served - CARD.y,
  },
  /** The orange mark on the member of staff: just over their head, so it is plainly the person's approval and stands apart from the green helper at the desk. */
  mark: { key: "residents.mark", at: { x: staffAt.x + staffAt.w / 2, y: staffAt.y - MARK_R - 6 } as Point },
  list: {
    key: "residents.list",
    at: box(LIST.x, LIST.y, LIST.w, LIST.h),
    heading: { key: "residents.list.heading", text: TEST, at: { x: LIST.x + 36, y: LIST.heading } as Point },
    rows: CHECKS.map((text, i) => {
      const y = LIST.first + i * LIST.pitch;
      return {
        key: `residents.list.${i}`,
        tick: `residents.list.${i}.tick`,
        box: box(LIST.x + 36, y - LIST.box / 2, LIST.box, LIST.box),
        centre: { x: LIST.x + 36 + LIST.box / 2, y } as Point,
        text,
        at: { x: LIST.x + 36 + LIST.box + 24, y } as Point,
      };
    }),
  },
};

/** The fence's top: the card's foot must be over it before the card crosses. */
export const RAIL_TOP = RAIL.top;
export const RAIL_X = RAIL.x;

/** Everything 21a draws under its story band, for the layout test, the card at each of its places. */
export const RESIDENTS_BOXES: Box[] = [
  RESIDENTS.staff.at,
  DESK,
  labelBox(RESIDENTS.staff.name.at, STAFF),
  box(RESIDENTS.helper.at.x - AGENT_R, RESIDENTS.helper.at.y - AGENT_R, 2 * AGENT_R, 2 * AGENT_R),
  labelBox(RESIDENTS.helper.name.at, HELPER),
  RESIDENTS.resident.at,
  labelBox(RESIDENTS.resident.name.at, RESIDENT),
  box(RAIL.x - RAIL.post / 2, RAIL.top - RAIL.post / 2, RAIL.post, RAIL.foot - RAIL.top + RAIL.post),
  labelBox(RESIDENTS.fence.name.at, FENCE),
  RESIDENTS.card.at,
  { ...RESIDENTS.card.at, y: CARD.lift },
  { ...RESIDENTS.card.at, x: CARD.across, y: CARD.lift },
  { ...RESIDENTS.card.at, x: CARD.across, y: CARD.served },
  box(RESIDENTS.mark.at.x - MARK_R, RESIDENTS.mark.at.y - MARK_R, 2 * MARK_R, 2 * MARK_R),
  RESIDENTS.list.at,
  labelBox(RESIDENTS.list.heading.at, TEST, "start"),
  ...RESIDENTS.list.rows.map((row) => labelBox(row.at, row.text, "start")),
];
