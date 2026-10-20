/**
 * Slide 20a's click: the row of systems draws, named, each lit by the
 * lantern of the person beside it, the staff and their light named. The
 * written record opens under the row, named, and the green helper comes up
 * at the row's left and walks along it in one run, a section of the record
 * filling as it passes each lantern. The two people at the right retire,
 * the rightmost first, walking off the right edge at a steady pace, and each
 * box goes grey as its person sets off; the helper goes as the first sets
 * off. Two new people step in beside the empty boxes, named, and the boxes
 * light again. The slab slides in under the whole row and its three parts
 * fill in turn, each named, and the row and the slab lift together.
 */
import { EASE, draw, fill, hide, open, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, keys, passing, play } from "./beats";
import { KNOWLEDGE, READ_AT } from "./layout-knowledge";

const K = KNOWLEDGE;

/**
 * The people who retire walk at `speed` px a second, the next setting off
 * `apart` after; each fades over the last `fade` of the walk, once their
 * light is past the edge. A box goes grey `dims` after its person sets off,
 * over `grey`.
 */
export const LEAVE = { speed: 820, apart: 0.36, fade: 0.25, dims: 0.15, grey: 0.5 } as const;
/** The helper walks the row in one run, a section of the record filling over `section` as it passes each lantern. */
const RUN = { at: 0.8, duration: 2.0, section: 0.35 } as const;
/** The new people step in this far apart, each over `duration`; their box lights `lights` after they set off. */
const STEP = { apart: 0.3, duration: 0.5, lights: 0.3 } as const;
/** The slab's parts fill this far apart, each over `duration`; the row and the slab lift at `lift`, over `rises`. */
const PARTS = { at: 0.6, duration: 0.5, apart: 0.35, lift: 1.0, rises: 0.8 } as const;

const run = { at: RUN.at, duration: RUN.duration };
const reads = passing(run, READ_AT);

type Keeper = (typeof K.keepers)[number];
/** The rightmost person retires first. */
const leaving = K.keepers.filter((keeper) => keeper.leaves).reverse();
/** How far a person who retires walks: on past the edge for as long as they fade. */
export const walkOf = (keeper: Keeper) => keeper.edge + LEAVE.fade * LEAVE.speed;

export const knowledge = picture("knowledge", {
  play: play(
    into("knowledge"),
    // The row of systems, named, each lit by the lantern of the person beside it; the light and the staff named.
    {
      with: true,
      hold: 0.4,
      moves: [
        rise(K.systems.key, { at: 0 }),
        draw(keys(K.boxes), { at: 0.1, duration: 0.7, stagger: 0.1 }),
        show(
          K.boxes.map((entry) => entry.lit),
          { at: 0.5, stagger: 0.1 },
        ),
        draw(keys(K.keepers), { at: 0.4, duration: 0.8, stagger: 0.1 }),
        rise(K.know.key, { at: 1.0 }),
        rise(K.staff.key, { at: 1.2 }),
      ],
    },
    { with: true, hold: 0.8, moves: [story("knowledge", 0)] },
    // The written record opens under the row, named; the helper comes up at the row's left and walks along it, a section filling at each lantern.
    {
      hold: 0.2,
      moves: [
        open(K.record.key, { at: 0 }),
        rise(K.record.name.key, { at: 0.2 }),
        rise(K.helper.key, { at: 0.2, duration: 0.5 }),
        fill(K.helper.key, { at: 0.4, duration: 0.6 }),
        to(K.helper.key, { x: K.helper.along }, { x: 0 }, { ...run, ease: EASE.draw }),
        ...K.record.sections.map((section, i) => fill(section.key, { at: reads[i], duration: RUN.section })),
      ],
    },
    // The two people at the right retire, the rightmost first, and each box goes grey as its person sets off; the helper goes.
    {
      hold: 0.2,
      moves: [
        hide(K.helper.key, { at: 0, duration: 0.3 }),
        ...leaving.flatMap((keeper, i) => {
          const at = i * LEAVE.apart;
          const duration = walkOf(keeper) / LEAVE.speed;
          const lit = K.boxes[K.keepers.indexOf(keeper)].lit;
          return [
            ...to(keeper.key, { x: walkOf(keeper) }, { x: 0 }, { at, duration, ease: "none" }),
            ...hide(keeper.key, { at: at + duration - LEAVE.fade, duration: LEAVE.fade, ease: "none" }),
            ...hide(lit, { at: at + LEAVE.dims, duration: LEAVE.grey }),
          ];
        }),
      ],
    },
    // Two new people step in beside the empty boxes, the first named, and the boxes light again.
    {
      hold: 0.2,
      moves: [
        ...K.newcomers.flatMap((person, i) => {
          const at = i * STEP.apart;
          return [
            ...to(person.key, { x: 0 }, { x: person.from }, { at, duration: STEP.duration, ease: EASE.out }),
            ...show(person.key, { at, duration: 0.3 }),
            ...show(K.boxes[person.box].lit, { at: at + STEP.lights, duration: 0.4 }),
          ];
        }),
        rise(K.newcomer.key, { at: 0.3 }),
      ],
    },
    { with: true, hold: 0.3, moves: [story("knowledge", 1)] },
    // The slab slides in under the whole row, its three parts fill in turn, each named, and the row and the slab lift together.
    {
      hold: 0.2,
      moves: [
        to(K.slab.key, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: K.slab.from }, { at: 0, duration: 0.8, ease: EASE.page }),
        fill(keys(K.slab.parts), { at: PARTS.at, duration: PARTS.duration, stagger: PARTS.apart }),
        rise(
          K.slab.parts.map((part) => part.label.key),
          { at: PARTS.at + PARTS.duration - 0.2, stagger: PARTS.apart },
        ),
        to([K.row.key, K.slab.key], { y: 0 }, { y: K.row.lift }, { at: PARTS.lift, duration: PARTS.rises, ease: EASE.page, stagger: 0 }),
      ],
    },
  ),
});
