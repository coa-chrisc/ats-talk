/**
 * Slide 22's click: the pyramid's outline draws from the base up; each tier
 * lights green in turn from the base, its name and caption coming up with
 * it. Beside it the row of developers draws at their desks, named once, and
 * the grey tag comes up over them. The slab slides in under the desks from
 * the left, named; the row and the slab lift together, and as they rise the
 * grey tag gives way to the green one in its place. Last, the figure and its
 * caption come up at the foot.
 */
import { EASE, draw, hide, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, keys, play } from "./moves";
import { LEVEL_UP } from "./layout-level-up";

const L = LEVEL_UP;
const desks = keys(L.row.desks);
const people = L.row.desks.map((desk) => `${desk.key}.person`);

/** Each tier lights this long after the one under it. */
const TIERS = { apart: 0.55, light: 0.45, name: 0.1, caption: 0.2 } as const;
/** The slab slides in over this long; the lift takes this long. */
const SLAB = 0.8;
const LIFT = 0.8;

export const levelUp = picture("level-up", {
  play: play(
    into("level-up"),
    // The pyramid's three outlines draw from the base up.
    { with: true, hold: 0.4, moves: [draw(keys(L.tiers), { at: 0, duration: 0.7, stagger: 0.15 })] },
    // Each tier lights green in turn from the base, named and captioned as it lights.
    {
      hold: 0.1,
      moves: L.tiers.flatMap((tier, i) => [
        ...show(tier.lit, { at: i * TIERS.apart, duration: TIERS.light }),
        ...rise(tier.name.key, { at: i * TIERS.apart + TIERS.name }),
        ...rise(tier.caption.key, { at: i * TIERS.apart + TIERS.caption }),
      ]),
    },
    { with: true, hold: 0.3, moves: [story("level-up", 0)] },
    // The row of developers draws at their desks, named once, and the grey tag comes up over them.
    {
      hold: 0.3,
      moves: [
        draw(desks, { at: 0, duration: 0.8, stagger: 0.12 }),
        draw(people, { at: 0, duration: 0.8, stagger: 0.12 }),
        rise(L.label.key, { at: 0.3 }),
        rise(L.tag.grey.key, { at: 0.7 }),
      ],
    },
    // The slab slides in under the desks, named.
    { hold: 0.4, moves: [to(L.slab.key, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: L.slab.from, y: L.row.lift }, { at: 0, duration: SLAB, ease: EASE.page })] },
    // The row and the slab lift together; as they rise the grey tag gives way to the green one.
    {
      hold: 0.23,
      moves: [
        to([L.row.key, L.slab.key], { y: 0 }, { y: L.row.lift }, { at: 0, duration: LIFT, ease: EASE.page, stagger: 0 }),
        hide(L.tag.grey.key, { at: 0.3, duration: 0.35 }),
        show(L.tag.green.key, { at: 0.4, duration: 0.4 }),
      ],
    },
    { with: true, hold: 0.3, moves: [story("level-up", 1)] },
    // The figure and its caption come up at the foot.
    { hold: 0.6, moves: [rise(L.figure.key, { at: 0 }), rise(L.caption.key, { at: 0 })] },
  ),
});
