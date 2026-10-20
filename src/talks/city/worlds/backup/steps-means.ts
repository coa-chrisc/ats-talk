/**
 * Slides 31 to 33's clicks. Each plays its whole slide, one group at a time,
 * each story line landing with the group it describes.
 */
import { EASE, draw, fill, rise, show, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, keys, play } from "./beats";
import { COSTS, MODULES, TEACHING } from "./layout-means";

const K = COSTS;
const T = TEACHING;
const M = MODULES;

/** One bar: its track shows, the bar grows along it from its start, and its name and figure come up over it. */
const bar = (b: (typeof K.bars)[number], at: number, duration: number) => [
  show(b.key, { at, duration: 0.3 }),
  fill(b.key, { at: at + 0.2, duration }),
  rise([b.name.key, b.value.key], { at: at + 0.1, stagger: 0.12 }),
  ...(b.more ? [show(b.more.key, { at: at + 0.2 + duration, duration: 0.4 })] : []),
].flat();

/** Slide 31: what we spend, two slivers on the track; then the comparisons, two long grey ranges on the same scale; then the tag. */
export const costs = picture("costs", {
  play: play(
    into("costs"),
    { with: true, hold: 0.3, moves: [rise(K.heads[0].key, { at: 0 }), bar(K.bars[0], 0.4, 0.5), bar(K.bars[1], 1.1, 0.5)] },
    { with: true, hold: 1.4, moves: [story("costs", 0)] },
    { moves: [rise(K.heads[1].key, { at: 0 }), bar(K.bars[2], 0.4, 0.9), bar(K.bars[3], 1.2, 0.9)] },
    { with: true, hold: 1.6, moves: [story("costs", 1)] },
    { moves: [wipe(K.tag.key, { from: "left" })] },
  ),
});

/** Slide 32: the room draws and fills with seats row by row; the month strip lights a workshop in each month; the four items line up on the shelf. */
export const teaching = picture("teaching", {
  play: play(
    into("teaching"),
    {
      with: true,
      hold: 0.3,
      moves: [draw(T.room.key, { at: 0 }), rise(keys(T.rows), { at: 0.5, stagger: 0.12 }), rise(T.staff.key, { at: 1.5 })],
    },
    { with: true, hold: 1.5, moves: [story("teaching", 0)] },
    {
      moves: [
        rise(T.series.key, { at: 0 }),
        show(keys(T.months), { at: 0.2, stagger: 0.18, duration: 0.5 }),
        show(T.months.map((month) => month.workshop.key), { at: 0.9, stagger: 0.25, duration: 0.3 }),
        rise(T.monthsLabel.key, { at: 1.4 }),
      ],
    },
    {
      moves: [
        draw(T.shelf.key, { at: 0, duration: 0.8 }),
        to(keys(T.items), { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: 60 }, { at: 0.4, duration: 0.7, ease: EASE.out, stagger: 0.25 }),
      ],
    },
    { with: true, hold: 0.8, moves: [story("teaching", 1)] },
  ),
});

/** Slide 33: the module rows fill one under another, each drawn to its count, the smaller categories as one block under them; then the binders stand up and the papers settle into a stack. */
const ROW_EVERY = 0.14;
export const whatExists = picture("what-exists", {
  play: play(
    into("what-exists"),
    {
      with: true,
      hold: 0.3,
      moves: [
        ...[...M.rows, ...M.others].flatMap((row, i) => [show(row.key, { at: i * ROW_EVERY, duration: 0.3 }), fill(row.key, { at: i * ROW_EVERY, duration: 0.6 })]),
        rise(M.other.key, { at: M.rows.length * ROW_EVERY + 0.2 }),
        rise(M.total.key, { at: (M.rows.length + M.others.length) * ROW_EVERY + 0.5 }),
      ],
    },
    { with: true, hold: 1.6, moves: [story("what-exists", 0)] },
    {
      moves: [
        rise(keys(M.binders), { at: 0, stagger: 0.18 }),
        rise(M.binders.map((binder) => binder.label.key), { at: 0.2, stagger: 0.18 }),
        to(keys(M.sheets), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -36 }, { at: 0.8, duration: 0.45, ease: EASE.out, stagger: 0.12 }),
        rise(M.papers.key, { at: 1.6 }),
      ],
    },
    { with: true, hold: 0.6, moves: [story("what-exists", 1)] },
  ),
});
