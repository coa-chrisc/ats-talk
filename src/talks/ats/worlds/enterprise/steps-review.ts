/**
 * Slide 4a's click: the floor draws and the two bars rise from it, the
 * second far taller and slower, each named and captioned as it tops out,
 * with story line A; the person sits at the desk and the stack of pages
 * beside them grows page by page until it towers over the desk, named once
 * it does; then the funnel draws from its mouth down to its outlet, named
 * at the mouth, the person stands under the outlet and the mark lands, with
 * story line B; and the figure lands on its own at the right with its
 * caption.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, fill, mark, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { REVIEW } from "./layout-review";
import { into, play } from "./moves";

const R = REVIEW;

/** Each bar's rise: the taller takes longer, at about the same pace. */
const RISE = [
  { at: 0.3, duration: 0.4 },
  { at: 0.5, duration: 1.4 },
] as const;
/** A page lands on the stack this long after the one under it, so the stack keeps growing for about two seconds. */
const PAGE_NEXT = 0.08;

export const review = (): StepDef[] =>
  picture("review", {
    play: play([
      into("review"),
      // The floor and the two bars, each named and captioned as it tops out.
      {
        with: true,
        hold: 0.35,
        moves: [
          draw(R.floor.key, { at: 0, duration: 0.5 }),
          ...R.bars.flatMap((bar, i) => [
            fill(bar.key, { ...RISE[i], ease: EASE.out }),
            rise(bar.name.key, { at: RISE[i].at + 0.1, duration: 0.5 }),
            rise(bar.caption.key, { at: RISE[i].at + RISE[i].duration * 0.7, duration: 0.6 }),
          ]),
        ],
      },
      { with: true, hold: 0.8, moves: [story("review", 0)] },
      // The person sits at the desk, and the stack beside them grows until it towers; its name once it has.
      {
        hold: 0.5,
        moves: [
          draw(R.desk.key, { at: 0, duration: 0.5 }),
          draw(R.seated.key, { at: 0.15, duration: 0.5 }),
          ...R.stack.pages.flatMap((page, i) => show(page.key, { at: 0.5 + i * PAGE_NEXT, duration: 0.15 })),
          rise(R.stack.name.key, { at: 0.5 + R.stack.pages.length * PAGE_NEXT, duration: 0.6 }),
        ],
      },
      // The funnel draws from its mouth to its outlet, named at the mouth; the person stands under it and the mark lands.
      {
        hold: 0.5,
        moves: [
          draw(R.funnel.key, { at: 0, duration: 0.8 }),
          rise(R.funnel.name.key, { at: 0.1, duration: 0.6 }),
          draw(R.standing.key, { at: 0.7, duration: 0.5 }),
          mark(R.mark.key, { at: 1, duration: 0.7 }),
          rise(R.people.key, { at: 1.15, duration: 0.6 }),
        ],
      },
      { with: true, hold: 0.9, moves: [story("review", 1)] },
      // The figure on its own at the right, and its caption.
      { hold: 0.3, moves: [rise(R.figure.key, { at: 0, duration: 0.75 }), rise(R.figure.caption.key, { at: 0.15, duration: 0.75 })] },
    ]),
  });
