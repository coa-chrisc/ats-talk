/**
 * Slide 11's places: the department map unlit, and what is still to
 * establish beside it. At the left, the grid of departments at the map's
 * proportions (department-map.ts), drawn as large as the field's height
 * allows, named inside its top left; a green line round it, the policy,
 * headed by its column's heading over it and named with its caption under
 * it. At the right, the column's other heading over the three dashed
 * plates, each plate's name and caption set inside it. Words are read from
 * the script, by position.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { PLATE, PLATES_H, RING_PAD, gridAt, gridSize, plateColumn } from "../department-map";
import { SAFE, TEXT_LINE, contentTop, layerOf, round, wordsWidth } from "./layout";

const [DEPARTMENTS, IN_PLACE, POLICY, POLICY_CAPTION, TO_ESTABLISH, ...PLATE_WORDS] = shown("track", "play");

const TOP = contentTop("track");
/** The two columns' headings on one row over the drawing, 16 px under its first line. */
const HEAD_Y = TOP + 16;
/** The ring and the plates start 36 px under the drawing's first line, clear of the headings' row. */
const BODY_Y = TOP + 36;
/** The policy's name sits 30 px under the ring's foot, its row ending inside the plates' column's foot. */
const NAME_DROP = 30;

/** The plates' column at the drawing's right edge. */
const PLATES_AT: Point = { x: SAFE.right - PLATE.w, y: BODY_Y };
/** The policy's row: centred so its text line ends 4 px over the plates' foot. */
const POLICY_Y = BODY_Y + PLATES_H - 4 - TEXT_LINE / 2;
/** The ring from the drawing's left edge, its foot the name's drop over the policy's row; the grid inside it as large as that leaves room for. */
const RING_FOOT = POLICY_Y - NAME_DROP;
const SCALE = round((RING_FOOT - BODY_Y - RING_PAD.top - RING_PAD.foot) / gridSize(1).h);
const MAP = gridAt({ x: 96 + RING_PAD.side, y: BODY_Y + RING_PAD.top }, SCALE);
const RING = box(96, BODY_Y, MAP.outline.w + 2 * RING_PAD.side, RING_FOOT - BODY_Y);

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
