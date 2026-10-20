/**
 * Slide 27's click: the slide before goes and the title changes. The track
 * draws, its two edges round the lap and its lanes filling with them, then
 * its start stripe; the pack comes up on the far straight, named, and the
 * City's runner lands where slide 15 left it on the bend. The dashed runner
 * opens at the pack's tail and its name comes up under it. Then the four
 * markers are set down one at a time along the lane from the solid runner
 * toward the dashed one, each one's leader drawing down to the key and its
 * entry rising as the leader arrives; line A comes in with the first, line
 * B with the fourth, and the slide ends as the last entry lands.
 */
import { draw, rise, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, land, play } from "./beats";
import { COULD_BE } from "./layout-could-be";

const C = COULD_BE;

/** The pack's runners come up one after another, quickly: a group, not seven events. */
const PACK = 0.06;
/** A marker is set down over `land`; its leader draws from `leader` after it starts, and its entry comes up `entry` after it starts, as the leader arrives; the next marker starts `apart` after this one. */
export const MARKERS = { land: 0.5, leader: 0.3, draw: 0.6, entry: 0.6, apart: 1.05 } as const;

export const couldBe = picture("could-be", {
  play: play(
    into("could-be"),
    // The track, then its start stripe.
    { with: true, hold: 0.4, moves: [draw(C.track.key, { at: 0, duration: 1.3 }), draw(C.start.key, { at: 1.1, duration: 0.4 })] },
    // The pack on the far straight, and the City's runner on the bend.
    { hold: 0.2, moves: [...C.pack.keys.flatMap((key, i) => rise(key, { at: i * PACK, duration: 0.6 })), rise(C.pack.name.key, { at: 0.35, duration: 0.6 }), land(C.city.key, 0.3, 0.6)] },
    // The dashed runner at the pack's tail, and its name.
    { hold: 0.4, moves: [wipe(C.dashed.key, { at: 0, duration: 0.7, from: "right" }), rise(C.dashed.name.key, { at: 0.35, duration: 0.6 })] },
    // The markers, one at a time from the solid runner toward the dashed one, each joined to its entry.
    {
      hold: 0.5,
      moves: C.markers.flatMap((marker, i) => [
        land(marker.key, i * MARKERS.apart, MARKERS.land),
        draw(marker.leader.key, { at: i * MARKERS.apart + MARKERS.leader, duration: MARKERS.draw }),
        rise(marker.entry.key, { at: i * MARKERS.apart + MARKERS.entry, duration: 0.6 }),
      ]),
    },
    { with: true, hold: 0.3, moves: [story("could-be", 0)] },
    { with: true, hold: 3 * MARKERS.apart - 0.3, moves: [story("could-be", 1)] },
  ),
});
