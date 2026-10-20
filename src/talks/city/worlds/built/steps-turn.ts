/**
 * The clicks of slides 6 and 6a, one chain each (beats.ts). Slide 6 opens
 * before any words: a plain wall comes up on the empty stage, strands of
 * spaghetti fly in from the left one after another and hit it, stick a
 * moment, then slide down it and fade, and the wall goes once they have
 * cleared. Only then does the title come up (beats.ts `titleIn`), and the
 * old question comes up alone, greys and steps aside; the loop draws in its
 * place, and one named idea comes in toward it. Slide 6a: the stair rises a step
 * a year, each count landing on its step, then the line of code reused
 * climbs behind it.
 */
import { DUR, EASE, draw, hide, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play, titleIn } from "./beats";
import { keys } from "./layout";
import { TWENTY_STEPS, WRONG } from "./layout-turn";

/**
 * Slide 6's opening, from the click: when the wall comes up; when the first
 * strand is thrown, and each next one after it; how long each flies, then
 * sticks once the last has hit; how long each slides down and off, the next
 * starting this long after; the fade at the end of its slide; and the
 * wall's own fade, ending as the last strand clears.
 */
const OPENING = { wall: 0.2, throw: 0.45, apart: 0.14, flight: 0.55, stick: 0.4, slide: 1.0, slideApart: 0.1, fade: 0.45, wallOut: 0.4 } as const;
const { wall, strands } = WRONG.opening;
/** When the strands start to slide: once the last has hit and stuck a moment. */
const SLIDES = OPENING.throw + (strands.length - 1) * OPENING.apart + OPENING.flight + OPENING.stick;
const CLEARED = SLIDES + (strands.length - 1) * OPENING.slideApart + OPENING.slide;

/** Slide 6: how long the card takes to grey, and to step aside. */
const GREY = 0.6;
const ASIDE = 1.0;
/** When each piece of the loop starts, from the loop's own start: the left place, the way across, the right place, then the way back under them. */
const LOOP = { good: 0, across: 0.5, governed: 0.9, back: 1.5, again: 2.2 } as const;

export const wrongQuestion = picture("wrong-question", {
  play: play(
    into("wrong-question", { title: false }),
    {
      // The wall comes up; each strand is thrown from the left, across on an even pace and climbing a little, and hits the wall; it sticks, then slides down and off it, fading, and the wall goes as the last clears.
      with: true,
      moves: [
        show(wall.key, { at: OPENING.wall }),
        ...strands.flatMap((strand, i) => {
          const thrown = OPENING.throw + i * OPENING.apart;
          const slides = SLIDES + i * OPENING.slideApart;
          return [
            show(strand.key, { at: thrown, duration: 0.15 }),
            to(strand.key, { x: 0 }, { x: strand.from.x }, { at: thrown, duration: OPENING.flight, ease: "none" }),
            to(strand.key, { y: 0 }, { y: strand.from.y }, { at: thrown, duration: OPENING.flight, ease: "sine.out" }),
            to(strand.key, { y: strand.drop }, { y: 0 }, { at: slides, duration: OPENING.slide, ease: "power2.in" }),
            hide(strand.key, { at: slides + OPENING.slide - OPENING.fade, duration: OPENING.fade, ease: "none" }),
          ];
        }),
        hide(wall.key, { at: CLEARED - OPENING.wallOut, duration: OPENING.wallOut }),
      ],
    },
    // The stage is clear: the title comes up.
    { ...titleIn("wrong-question"), hold: 0.15 },
    { with: true, hold: 0.6, moves: [rise(WRONG.ask.key, { at: 0 })] },
    { with: true, hold: 0.4, moves: [story("wrong-question", 0)] },
    {
      // The card greys as it steps aside to the lower left.
      hold: 1.1,
      moves: [
        to(WRONG.ask.key, { "--k": 1 }, { "--k": 0 }, { at: 0, duration: GREY, ease: EASE.soft }),
        to(WRONG.ask.key, { x: WRONG.ask.aside.x, y: WRONG.ask.aside.y }, { x: 0, y: 0 }, { at: 0.2, duration: ASIDE, ease: EASE.page }),
      ],
    },
    {
      // The loop draws in its place, in green: the left place, across, the right place, and the way back under them, named.
      with: true,
      hold: 0.7,
      moves: [
        draw(WRONG.good.key, { at: LOOP.good, duration: 0.6 }),
        rise(WRONG.good.label.key, { at: LOOP.good + 0.2 }),
        draw(WRONG.across.key, { at: LOOP.across, duration: 0.6 }),
        draw(WRONG.governed.key, { at: LOOP.governed, duration: 0.6 }),
        rise(WRONG.governed.label.key, { at: LOOP.governed + 0.2 }),
        draw(WRONG.back.key, { at: LOOP.back, duration: DUR.slow }),
        rise(WRONG.again.key, { at: LOOP.again }),
      ],
    },
    { with: true, hold: 0.6, moves: [story("wrong-question", 1)] },
    // One idea, named on its card, comes in from the left edge on its way into the loop.
    { hold: 0.2, moves: [to(WRONG.idea.key, { x: 0, autoAlpha: 1 }, { x: WRONG.idea.from, autoAlpha: 0 }, { at: 0, duration: DUR.travel, ease: EASE.page })] },
  ),
});

/** Slide 6a: a new step this often; inside a step, its rows rise this far apart, then its count lands. */
const STEP_APART = 0.9;
const ROW_APART = 0.08;
const COUNT_AFTER = 0.35;
/** The line climbs over this long. */
const CLIMB = 1.6;

export const twoToTwenty = picture("two-to-twenty", {
  play: play(
    into("two-to-twenty"),
    {
      // A step a year, left to right: its rows of tiles rise from the floor, its year under it, and its count lands on top.
      with: true,
      hold: 0.5,
      moves: TWENTY_STEPS.steps.flatMap((step, s) => {
        const at = s * STEP_APART;
        return [
          rise(keys(step.rows), { at, duration: 0.6, stagger: ROW_APART }),
          rise(step.year.key, { at: at + 0.1 }),
          to(step.count.key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: step.count.drop }, { at: at + COUNT_AFTER + step.rows.length * ROW_APART, duration: 0.6, ease: EASE.out }),
        ];
      }),
    },
    { with: true, hold: 0.3, moves: [story("two-to-twenty", 0)] },
    {
      // Behind the stair, the line climbs from low at the left edge to the last step, named where it starts and figured at both ends; the tag comes under its end.
      hold: 0.4,
      moves: [
        show(TWENTY_STEPS.line.start.key, { at: 0, duration: 0.3 }),
        rise(TWENTY_STEPS.code.key, { at: 0.1 }),
        rise(TWENTY_STEPS.low.key, { at: 0.25 }),
        draw(TWENTY_STEPS.line.key, { at: 0.1, duration: CLIMB }),
        show(TWENTY_STEPS.line.end.key, { at: 0.1 + CLIMB - 0.1, duration: 0.3 }),
        rise(TWENTY_STEPS.high.key, { at: 0.1 + CLIMB - 0.1 }),
        rise(TWENTY_STEPS.estimate.key, { at: 0.1 + CLIMB + 0.3 }),
      ],
    },
    { with: true, hold: 0.5, moves: [story("two-to-twenty", 1)] },
  ),
});
