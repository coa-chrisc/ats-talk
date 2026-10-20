/**
 * Slide 15's click: slide 11's track draws again, its start line with it,
 * and the pack comes up where it was, named; the City's runner appears at the
 * start and runs: along the near straight, picking up speed, each marker
 * landing behind it as it passes and named under the track, story line A
 * rising with the third; then up the bend to where it stands. In the
 * infield the stair comes up, its first three steps lighting green in turn
 * and the top one staying grey, its tag dropping beside it, story line B
 * rising as the steps light; and the tag drops under the track at the
 * right.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, fill, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { FLEET, TRIP } from "./layout-fleet";
import { drop, into, play, travel } from "./moves";

const F = FLEET;
const S = F.stair;

/** The pack's runners come up one after another, quickly: a group, not seven events. */
const PACK = 0.06;

/**
 * The run. Along the straight on a sine-in curve, so it leaves the line
 * slowly and gathers speed; up the bend on a sine-out curve in x and a
 * sine-in curve in y, as a point on a circle moves, its speed into the bend
 * about the speed it left the straight with (1292 px at its end speed of
 * about 850 px/s takes the bend's 130 px in about 0.3 s).
 */
const RUN = { straight: 2.4, bend: 0.32, onto: 0.9 } as const;
/** A marker lands once the runner's back foot (about 27 px behind its point) is past it and its ring. */
const PAST = 44;
/** When the runner's point reaches `x` on the straight, seconds from the run's start: the sine-in curve, inverted. */
const reaches = (x: number) => ((2 * RUN.straight) / Math.PI) * Math.acos(1 - (x - TRIP.from.x) / TRIP.straight.x);
export const MARKER_AT = F.markers.map((marker) => reaches(marker.at.x + PAST));

/** Each lit step a little after the one below. */
const STEP = 0.4;

export const fleet = (): StepDef[] =>
  picture("fleet", {
    play: play([
      into("fleet"),
      // The track and its start line, and the pack where it was.
      { with: true, hold: 0.5, moves: [draw(F.track.key, { at: 0, duration: 1.2 }), draw(F.start.key, { at: 1.0, duration: 0.4 })] },
      { hold: -0.2, moves: [...F.pack.keys.flatMap((key, i) => rise(key, { at: i * PACK, duration: 0.6 })), rise(F.pack.name.key, { at: 0.35, duration: 0.6 })] },
      // The runner at the start, then its run: along the straight, the markers landing behind it, then up the bend.
      {
        hold: 0.1,
        moves: [
          show(F.city.key, { at: 0, duration: 0.3 }),
          travel(F.city.key, { x: TRIP.straight.x }, { at: 0.3, duration: RUN.straight, ease: "sine.in" }),
          travel(F.city.key, { y: TRIP.straight.y }, { at: 0.3, duration: RUN.onto, ease: EASE.soft }),
          travel(F.city.key, { x: TRIP.stands.x }, { at: 0.3 + RUN.straight, duration: RUN.bend, ease: "sine.out" }),
          travel(F.city.key, { y: TRIP.stands.y }, { at: 0.3 + RUN.straight, duration: RUN.bend, ease: "sine.in" }),
          ...F.markers.flatMap((marker, i) => [
            to(marker.key, { autoAlpha: 1, "--s": 1 }, { autoAlpha: 0, "--s": 0.4 }, { at: 0.3 + MARKER_AT[i], duration: 0.4, ease: EASE.out }),
            rise(marker.name.key, { at: 0.4 + MARKER_AT[i], duration: 0.5 }),
          ]),
        ],
      },
      { with: true, hold: 0.3 + MARKER_AT[2] + 0.2, moves: [story("fleet", 0)] },
      // The stair in the infield: its floor and steps, the first three lighting in turn, the top one's tag beside it.
      {
        hold: 0.3,
        moves: [
          draw(S.floor.key, { at: 0, duration: 0.4 }),
          ...S.steps.flatMap((entry, i) => rise(entry.key, { at: 0.1 + i * 0.08, duration: 0.5 })),
          ...S.steps.filter((entry) => entry.lit).flatMap((entry, i) => fill(entry.key, { at: 0.75 + i * STEP, duration: 0.45, ease: EASE.out })),
          drop(S.tag.key, 0.75 + 3 * STEP + 0.1, 0.5),
        ],
      },
      { with: true, hold: 0.9, moves: [story("fleet", 1)] },
      // The tag under the track at the right.
      { hold: 0.3, moves: [drop(F.applications.key, 0)] },
    ]),
  });
