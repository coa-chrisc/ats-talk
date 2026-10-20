/**
 * What the plan world's clicks share. A click brings the whole slide: its
 * beats chain on their own, a story line landing with the beat it explains,
 * and the chain ends on the slide's result. A slide's click puts the last
 * slide's picture away at once and changes the title; nothing carries from
 * one slide to the next. Each slide's moves are in its own module
 * (steps-goals.ts, steps-program-team.ts, steps-lift-developers.ts,
 * steps-roadmap.ts, steps-knowledge.ts, steps-readiness.ts,
 * steps-residents.ts).
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

/**
 * When a part moving over `duration` on EASE.draw (power2.inOut, a cubic:
 * 4t³ to halfway) has covered each fraction of its way: the moments for what
 * it passes to light. The kit's `behind` inverts a square instead, which puts
 * those moments ahead of the part.
 */
export const passing = (front: { at: number; duration: number }, fractions: readonly number[]): number[] =>
  fractions.map((p) => {
    const k = Math.min(1, Math.max(0, p));
    return front.at + front.duration * (k < 0.5 ? Math.cbrt(k / 4) : 1 - Math.cbrt((1 - k) / 4));
  });
