/**
 * Slide 6's click: the indigo box with its tag and the three green people
 * come up side by side, each named; the balance draws under them, its post,
 * its beam and the pans they stand on; the beam tips toward the people, the
 * pans riding its ends; the large indigo figure lands with its caption,
 * with the first line; the bar draws, its three parts named, and the middle
 * one fills green, its caption under it, with the second line; the plaque
 * settles at the right with its words.
 */
import { DUR, EASE, draw, fill, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { TALENT, TIP } from "./layout-talent";
import { into, play, travel, turn } from "./moves";

const T = TALENT;
const [left, right] = T.pans;

/** The tip: slow enough to read as weight settling. */
const TIPS = { duration: 1.3, ease: EASE.page } as const;

export const talent = picture("talent", {
  play: play(
    into("talent"),
    // The box and the people come up side by side, each named.
    {
      hold: 0.05,
      moves: [
        show(T.technology.key, { at: 0 }),
        rise(T.technology.name.key, { at: 0.1 }),
        show(T.talent.key, { at: 0.35 }),
        rise(T.talent.name.key, { at: 0.45 }),
      ],
    },
    // The balance draws under them: the post, the beam, then the pans.
    {
      hold: 0.3,
      moves: [draw(T.post.key, { at: 0, duration: 0.7 }), draw(T.beam.key, { at: 0.4, duration: 0.7 }), draw([left.plateKey, right.plateKey], { at: 0.8, duration: 0.5, stagger: 0.1 })],
    },
    // The beam tips toward the people, the pans riding its ends.
    {
      hold: 0.3,
      moves: [
        turn(T.beam.key, TIP, 0, { at: 0, ...TIPS }),
        travel(left.key, left.shift, { x: 0, y: 0 }, { at: 0, ...TIPS }),
        travel(right.key, right.shift, { x: 0, y: 0 }, { at: 0, ...TIPS }),
      ],
    },
    // The large figure lands with its caption.
    { hold: 0.2, moves: [rise(T.six.key, { at: 0, duration: DUR.slow }), rise(T.six.caption.key, { at: 0.2 })] },
    { with: true, hold: 0.3, moves: [story("talent", 0)] },
    // The bar draws, its parts named, and the middle one fills green.
    {
      hold: 1.0,
      moves: [
        show(T.bar.key, { at: 0 }),
        rise(
          T.bar.parts.map((part) => part.key),
          { at: 0.1, stagger: 0.12 },
        ),
        fill(T.bar.fill, { at: 0.6, duration: 0.8 }),
        rise(T.bar.caption.key, { at: 0.9 }),
      ],
    },
    { with: true, hold: 0.9, moves: [story("talent", 1)] },
    // The plaque settles at the right.
    { hold: 0.6, moves: [rise(T.plaque.key, { at: 0 }), rise(T.plaque.words.key, { at: 0.15 })] },
  ),
});
