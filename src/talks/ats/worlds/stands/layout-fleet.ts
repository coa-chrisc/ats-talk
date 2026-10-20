/**
 * Slide 15's places: slide 11's track and pack, named where slide 11 names it (track-geometry.ts), the
 * City's runner moved a third of the way round onto the right bend, and
 * the three markers it has passed on the near straight's middle line, each
 * named under the track. In the infield left of the middle, a short stair
 * of four steps climbing left to right, a gate standing on each tread and
 * the step's name inside its riser, the grey tag beside the top step; and
 * the tag under the track at the right, under the markers' names. Words
 * are read from the script, by position.
 *
 * The runner travels: it is drawn where slide 11 left it, at the start
 * stripe, and moved by `--x` and `--y`, along the near straight to the
 * bend (rising from the outer half of both lanes onto the middle line as
 * it goes) and up the bend's middle line to where it stands.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DRAW_FOOT, SAFE, TAG, layerOf, tagWidth } from "./layout";
import { BEND, CITY_AT, CITY_STANDS, INNER, MARKER_R, MARKER_X, NEAR_MIDDLE, OUTER, PACK, PACK_NAME, START } from "./track-geometry";

const [ENTERPRISE, PEOPLE, INFRASTRUCTURE, WORKING_FLEET, EXPLORE, VALIDATE, DEPLOY, SCALE, NOT_READY, APPLICATIONS] = shown("fleet", "play");

/** The markers' names on one row 22 px under the track's outer edge. */
const MARKER_NAME_Y = OUTER.y + OUTER.h + 22;
/** The tag under the markers' names, ending 16 px inside the drawing's right edge, its foot on the drawing's lowest line. */
const APPLICATIONS_AT = box(SAFE.right - 16 - tagWidth(APPLICATIONS), DRAW_FOOT - TAG.h, tagWidth(APPLICATIONS), TAG.h);

/* The stair, in the infield */

/** Four steps 124 wide, from x 300 (clear of the infield's left bend, which ends at x 268), climbing 18 at each, on a floor 8 px over the infield's foot. */
const STAIR = { x: 300, w: 124, rise: 18, first: 40, floor: INNER.y + INNER.h - 8 } as const;
/** A gate on a tread: two posts 24 tall, 44 apart, two bars between them. */
export const GATE = { h: 24, span: 44 } as const;
const STEPS = [EXPLORE, VALIDATE, DEPLOY, SCALE].map((text, i) => {
  const tread = STAIR.floor - STAIR.first - i * STAIR.rise;
  const at = box(STAIR.x + i * STAIR.w, tread, STAIR.w, STAIR.floor - tread);
  return { text, at, tread, cx: at.x + at.w / 2 };
});
const TOP_STEP = STEPS[3];
/**
 * The grey tag beside the top step, 16 px right of it, level with its
 * riser's middle: the infield is too shallow (152 px) to hold a tag over
 * the top step's gate, and at this height it clears the pack's name.
 */
const NOT_READY_AT = box(TOP_STEP.at.x + TOP_STEP.at.w + 16, Math.round(TOP_STEP.tread + TOP_STEP.at.h / 2 - TAG.h / 2), tagWidth(NOT_READY), TAG.h);

/**
 * The runner's trip, as offsets from where it is drawn (slide 11's place):
 * along the near straight to where the right bend begins, rising onto the
 * middle line; then up the bend to where it stands.
 */
const STRAIGHT_END: Point = { x: BEND.right, y: NEAR_MIDDLE };
export const TRIP = {
  from: CITY_AT,
  straight: { x: STRAIGHT_END.x - CITY_AT.x, y: STRAIGHT_END.y - CITY_AT.y },
  stands: { x: CITY_STANDS.x - CITY_AT.x, y: CITY_STANDS.y - CITY_AT.y },
} as const;

export const FLEET = {
  ...layerOf("fleet"),
  track: { key: "fleet.track" },
  start: { key: "fleet.start", ...START },
  /** The pack where slide 11 drew it, named where slide 11 names it. */
  pack: { keys: PACK.map((_, i) => `fleet.pack.${i}`), at: PACK, name: { key: "fleet.pack.name", text: ENTERPRISE, at: PACK_NAME } },
  city: { key: "fleet.city", at: CITY_AT, stands: CITY_STANDS },
  markers: [PEOPLE, INFRASTRUCTURE, WORKING_FLEET].map((text, i) => ({
    key: `fleet.marker.${i}`,
    at: { x: MARKER_X[i], y: NEAR_MIDDLE } as Point,
    r: MARKER_R,
    name: { key: `fleet.marker.${i}.name`, text, at: { x: MARKER_X[i], y: MARKER_NAME_Y } as Point },
  })),
  stair: {
    floor: { key: "fleet.floor", x0: STAIR.x - 12, x1: TOP_STEP.at.x + TOP_STEP.at.w + 2, y: STAIR.floor },
    steps: STEPS.map((entry, i) => ({
      key: `fleet.step.${i}`,
      text: entry.text,
      at: entry.at,
      lit: i < 3,
      gate: { at: { x: entry.cx, y: entry.tread } as Point },
      name: { at: { x: entry.cx, y: entry.tread + 20 } as Point },
    })),
    tag: { key: "fleet.not-ready", text: NOT_READY, at: NOT_READY_AT },
  },
  applications: { key: "fleet.applications", text: APPLICATIONS, at: APPLICATIONS_AT },
};
