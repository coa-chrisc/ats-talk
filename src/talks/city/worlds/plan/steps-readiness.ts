/**
 * Slides 20b and 21's clicks.
 *
 * 20b: the spear tip comes in from the left, named on its face, its shaft
 * line drawing behind it; behind it the four shafts fill in one at a time,
 * each named. On the right the floor draws, the counter comes up with the
 * person behind it, a visitor walks up to the counter, and the person behind
 * it turns their head to the visitor and steps across to them.
 *
 * 21: the ground draws; the first foundation draws, named, and the building
 * rises on it; its nameplate comes up over the door; the ground is named.
 * The path is laid along the ground, stone by stone, to the dashed outline of a second
 * building, which comes up with its own plate; then it is built on its own
 * foundation and the outline goes.
 */
import { EASE, draw, fill, hide, open, rise, show, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, keys, play } from "./beats";
import { BUILT, READINESS } from "./layout-readiness";

const S = READINESS;
const B = BUILT;

/** The tip travels in over this long, its shaft line drawing behind it on the same curve, so the line's front stays at the tip; the shafts then fill one after another. */
const TIP = 1.0;
const SHAFTS = { duration: 0.6, apart: 0.3 } as const;
/** The visitor walks to the counter over this long; the staff member's head turns over `turn`, and they step across over `step`. */
const WALK = 0.8;
const HELP = { turn: 0.3, step: 0.6 } as const;

export const readiness = picture("readiness", {
  play: play(
    into("readiness"),
    // The spear tip comes in from the left, its shaft line drawing behind it.
    {
      with: true,
      hold: 0.4,
      moves: [
        show(S.tip.key, { at: 0, duration: 0.4 }),
        to(S.tip.key, { x: 0 }, { x: S.tip.from }, { at: 0, duration: TIP, ease: EASE.page }),
        draw(S.line.key, { at: 0, duration: TIP, ease: EASE.page }),
      ],
    },
    // Behind it the four shafts fill in along the line, one at a time, each from the tip back, named as it reaches its far end.
    {
      hold: 0.2,
      moves: S.shafts.flatMap((shaft, i) => [...fill(shaft.key, { at: i * SHAFTS.apart, duration: SHAFTS.duration }), ...rise(shaft.name.key, { at: i * SHAFTS.apart + SHAFTS.duration - 0.15 })]),
    },
    { with: true, hold: 0.2, moves: [story("readiness", 0)] },
    // On the right, the counter, with someone behind it.
    {
      hold: 0.4,
      moves: [draw(S.floor.key, { at: 0, duration: 0.7 }), draw(S.helper.key, { at: 0.2, duration: 0.7 }), rise(S.counter.key, { at: 0.3 })],
    },
    // The visitor walks up to it.
    { hold: 0.3, moves: [show(S.visitor.key, { at: 0, duration: 0.3 }), to(S.visitor.key, { x: 0 }, { x: S.visitor.from }, { at: 0, duration: WALK, ease: EASE.draw })] },
    { with: true, hold: 0.5, moves: [story("readiness", 1)] },
    // The person behind the counter turns their head to the visitor, and steps across to help.
    {
      hold: 0.1,
      moves: [
        open(S.helper.face.key, { at: 0, duration: HELP.turn }),
        to(S.helper.key, { x: S.helper.step }, { x: 0 }, { at: HELP.turn + 0.1, duration: HELP.step, ease: EASE.page }),
      ],
    },
  ),
});

/** A building rises over this long. */
const RISE = 0.9;

export const built = picture("built-to-last", {
  play: play(
    into("built-to-last"),
    // The ground, and on it the first foundation, named; the building rises on it.
    {
      with: true,
      hold: 0.4,
      moves: [
        draw(B.ground.key, { at: 0, duration: 0.8 }),
        draw(B.first.foundation.key, { at: 0.3, duration: 0.6 }),
        rise(B.first.foundation.name.key, { at: 0.6 }),
        fill(B.first.house.key, { at: 0.9, duration: RISE, ease: EASE.out }),
      ],
    },
    { with: true, hold: 0.9, moves: [story("built-to-last", 0)] },
    // Its nameplate goes up over the door, and the ground is named.
    { hold: 0.2, moves: [rise(B.first.plate.key, { at: 0 }), rise(B.ground.name.key, { at: 0.5 })] },
    // A path is laid along the ground to the outline of a second building, named.
    {
      hold: 0.4,
      moves: [
        show(keys(B.path), { at: 0, duration: 0.3, stagger: 0.1 }),
        wipe(B.next.outline.key, { from: "bottom", at: 0.9, duration: 0.7 }),
        rise(B.next.plate.key, { at: 1.3 }),
      ],
    },
    { with: true, hold: 0.6, moves: [story("built-to-last", 1)] },
    // It fills in on the same path, and its outline goes.
    {
      hold: 0.3,
      moves: [
        draw(B.next.foundation.key, { at: 0, duration: 0.6 }),
        fill(B.next.house.key, { at: 0.3, duration: RISE, ease: EASE.out }),
        hide(B.next.outline.key, { at: 0.3 + RISE - 0.2, duration: 0.4 }),
      ],
    },
  ),
});
