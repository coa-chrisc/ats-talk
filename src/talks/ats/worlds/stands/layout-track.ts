/**
 * Slide 11's places: the department map unlit, and what is still to
 * establish beside it. At the left, the grid of departments at the map's
 * size and place, where slides 12 and 15 set it too (department-map.ts),
 * named inside its top left; a green line round it, the policy, headed by
 * its column's heading over it and named with its caption under it. At the
 * right, the column's other heading over the three dashed plates, each
 * plate's name and caption set inside it, the column from the ring's top to
 * the drawing's foot. Words are read from the script, by position.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { MAP_AT, PLATE, RING_PAD, gridAt, plateColumn } from "../department-map";
import { SAFE, contentTop, layerOf, wordsWidth } from "./layout";

const [DEPARTMENTS, IN_PLACE, POLICY, POLICY_CAPTION, TO_ESTABLISH, ...PLATE_WORDS] = shown("track", "play");

const TOP = contentTop("track");
/** The two columns' headings on one row over the drawing, 16 px under its first line. */
const HEAD_Y = TOP + 16;
/** The policy's name sits 30 px under the ring's foot. */
const NAME_DROP = 30;

/** The grid at the map's size and place; the ring round it, the ring's pad out from it at the sides and foot and at the top room for the grid's name. */
const MAP = gridAt(MAP_AT, 1);
const RING = box(MAP.outline.x - RING_PAD.side, MAP.outline.y - RING_PAD.top, MAP.outline.w + 2 * RING_PAD.side, MAP.outline.h + RING_PAD.top + RING_PAD.foot);
const RING_FOOT = RING.y + RING.h;
/** The policy's row: its text line's middle the name's drop under the ring. */
const POLICY_Y = RING_FOOT + NAME_DROP;
/** The plates' column at the drawing's right edge, level with the ring's top. */
const PLATES_AT: Point = { x: SAFE.right - PLATE.w, y: RING.y };

export const TRACK = {
  ...layerOf("track"),
  map: MAP,
  grid: { key: "track.grid", at: MAP.outline },
  name: { key: "track.name", text: DEPARTMENTS, at: { x: MAP.outline.x, y: MAP.outline.y - 30 } as Point },
  ring: { key: "track.policy", at: RING, r: 24 },
  place: { key: "track.place", text: IN_PLACE, at: { x: RING.x, y: HEAD_Y } as Point },
  policy: {
    name: { key: "track.policy.name", text: POLICY, at: { x: RING.x + 16, y: POLICY_Y } as Point },
    caption: { key: "track.policy.caption", text: POLICY_CAPTION, at: { x: RING.x + 16 + wordsWidth(POLICY, 32) + 16, y: POLICY_Y } as Point },
  },
  gaps: { key: "track.gaps", text: TO_ESTABLISH, at: { x: PLATES_AT.x, y: HEAD_Y } as Point },
  plates: plateColumn(PLATES_AT).map((at, i) => ({ key: `track.plate.${i}`, at, name: PLATE_WORDS[2 * i], caption: PLATE_WORDS[2 * i + 1] })),
};
