/**
 * The click of slide 5a, one chain (beats.ts): the three names and the
 * stair with its closed door come up; then the calendar fills a week at a
 * time, a meeting landing in each, and as it passes each third a step
 * lights and the figure climbs onto it. The door stays shut, and the tag
 * beside it comes last, with line B.
 */
import { EASE, draw, fill, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { keys } from "./layout";
import { WEEKLY, WEEK_COUNT } from "./layout-weekly";

/** A week every this many seconds, its meeting landing just after it. */
const WEEK = 0.03;
const MEETING_AFTER = 0.12;
/** When the calendar passes each third: a step lights then, and the figure climbs onto it just after. */
const THIRDS = [1, 2, 3].map((third) => Math.round(((WEEK_COUNT * third) / 3) * WEEK * 100) / 100);
const CLIMB_AFTER = 0.3;

export const weekly = picture("weekly", {
  play: play(
    into("weekly"),
    {
      // The three names over where the calendar will be, and on the right the stair, its door shut, the figure at its foot.
      with: true,
      hold: 0.6,
      moves: [
        rise(keys(WEEKLY.names), { at: 0, stagger: 0.15 }),
        draw(WEEKLY.floor.key, { at: 0.1, duration: 0.7 }),
        draw(keys(WEEKLY.steps), { at: 0.2, stagger: 0.15 }),
        rise(WEEKLY.door.key, { at: 0.6 }),
        rise(WEEKLY.door.go.key, { at: 0.7 }),
        draw(WEEKLY.figure.key, { at: 0.8 }),
      ],
    },
    {
      // The calendar fills a week at a time, a row at a time, a meeting landing in each; as it passes each third a step lights, named, and the figure climbs onto it.
      with: true,
      hold: 1.1,
      moves: [
        rise(WEEKLY.every.key, { at: 0 }),
        show(WEEKLY.weeks.key, { at: 0, duration: 0.3, stagger: WEEK }),
        show(WEEKLY.marks.key, { at: MEETING_AFTER, duration: 0.3, stagger: WEEK }),
        ...WEEKLY.steps.flatMap((step, s) => [
          fill(step.key, { at: THIRDS[s] }),
          rise(step.label.key, { at: THIRDS[s] + 0.1 }),
          to(WEEKLY.figure.key, WEEKLY.figure.hops[s], s === 0 ? { x: 0, y: 0 } : undefined, { at: THIRDS[s] + CLIMB_AFTER, duration: 0.6, ease: EASE.out }),
        ]),
      ],
    },
    { with: true, hold: 0.2, moves: [story("weekly", 0)] },
    // With the figure at the shut door, the tag beside it, and line B.
    { hold: 0.3, moves: [rise(WEEKLY.door.demand.key, { at: 0 })] },
    { with: true, hold: 0.3, moves: [story("weekly", 1)] },
  ),
});
