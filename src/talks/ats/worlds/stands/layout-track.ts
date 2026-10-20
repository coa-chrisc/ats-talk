/**
 * Slide 11's places: the track (track-geometry.ts) with its start stripe;
 * the pack far round the lap, named under them in the infield; the City's
 * large runner at the start stripe, named right under it outside the track;
 * the grey tag centred in the infield; and a fence post in the ground just
 * outside the track beside the start, its tick on its cap and its name to
 * its right. Words are read from the script, by position.
 *
 * The title is one line, so the story band ends higher here than on slide
 * 15, but the track keeps its fixed place (TRACK_TOP, 548) so that slides
 * 11, 15 and 27 draw it pixel for pixel the same; the room over it is
 * left open.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DRAW_FOOT, TAG, layerOf, round, tagWidth } from "./layout";
import { CITY_AT, INNER, MIDDLE, OUTER, PACK, PACK_NAME, START } from "./track-geometry";

const [ENTERPRISE, CITY, NO_STRATEGY, AUTHORIZED] = shown("track", "play");

/** The grey tag centred in the infield, under the pack's name's row. */
const NO_STRATEGY_AT = box(round(960 - tagWidth(NO_STRATEGY) / 2), INNER.y + 76, tagWidth(NO_STRATEGY), TAG.h);
/** The home runner's name right under it, outside the track. */
const CITY_NAME: Point = { x: CITY_AT.x, y: OUTER.y + OUTER.h + 30 };

/** The fence post: in the ground just outside the track, right of the City's name, its foot at the drawing's lowest line, nothing of it on the lane. */
const POST = { x: CITY_AT.x + 112, w: 18, top: OUTER.y + OUTER.h + 24, foot: DRAW_FOOT } as const;
/** The passed tick on the post's cap, clear of the track's edge. */
const TICK = { at: { x: POST.x + POST.w / 2, y: POST.top - 2 } as Point, r: 16 };
/** Its name to its right, level with the post's middle. */
const POST_NAME: Point = { x: POST.x + POST.w + 24, y: Math.round((POST.top + POST.foot) / 2) };

export const TRACK = {
  ...layerOf("track"),
  track: { key: "track.track", outer: OUTER, inner: INNER, middle: MIDDLE },
  start: { key: "track.start", ...START },
  pack: { keys: PACK.map((_, i) => `track.pack.${i}`), at: PACK, name: { key: "track.pack.name", text: ENTERPRISE, at: PACK_NAME } },
  city: { key: "track.city", at: CITY_AT, name: { key: "track.city.name", text: CITY, at: CITY_NAME } },
  tag: { key: "track.tag", text: NO_STRATEGY, at: NO_STRATEGY_AT },
  post: { key: "track.post", ...POST, name: { key: "track.post.name", text: AUTHORIZED, at: POST_NAME }, tick: { key: "track.post.tick", ...TICK } },
};
