/**
 * What the plan world's clicks share. A click brings the whole slide: its
 * beats chain on their own, a story line landing with the beat it explains,
 * and the chain ends on the slide's result. A slide's click puts the last
 * slide's picture away at once and changes the title; nothing carries from
 * one slide to the next. Each slide's moves are in its own module
 * (steps-lanes.ts, steps-level-up.ts, steps-outcomes.ts).
 */
import { chain, hide, retitle, type ChainBeat } from "@/components/deck/kit";
import { COUNTS, PICTURES, groupOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** A slide's beats as its one click's moves, timed by the kit's chain. */
export const play = (...beats: ChainBeat[]) => ({ moves: chain(beats, { counts: COUNTS }) });

/** The click's first beat: the slide before puts its whole picture away at once, and the title changes. */
export const into = (pictureId: string): ChainBeat => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  const before = PICTURES[i - 1].id;
  const { marks, html } = groupOf(before);
  return { moves: [hide([marks, html], { at: 0, stagger: 0 }), retitle(titleKey(before), titleKey(pictureId))] };
};

export const keys = <T extends { key: string }>(list: readonly T[]) => list.map((entry) => entry.key);

/** A part that comes up from below by `by` px as it fades in. */
export const comeUp = (by: number) => ({ on: { autoAlpha: 1, y: 0 }, off: { autoAlpha: 0, y: by } });
