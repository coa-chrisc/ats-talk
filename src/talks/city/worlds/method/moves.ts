/**
 * What the method world's clicks share. A click brings the whole slide: its
 * beats chain on their own, a story line landing with the beat it explains,
 * and the chain ends on the slide's result. A slide's click puts the last
 * slide's picture away at once and changes the title; nothing carries from
 * one slide to the next. Each slide's moves are in its own module
 * (steps-good-ideas.ts, steps-listen.ts, steps-underneath.ts, steps-sort.ts,
 * steps-plain-tool.ts).
 */
import { chain, hide, retitle, type ChainBeat } from "@/components/deck/kit";
import { COUNTS, PICTURES, layerOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** A slide's beats as its one click's moves, timed by the kit's chain. */
export const play = (...beats: ChainBeat[]) => ({ moves: chain(beats, { counts: COUNTS }) });

/** The click's first beat: the slide before puts its whole picture away at once, and the title changes. */
export const into = (pictureId: string): ChainBeat => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  const before = PICTURES[i - 1].id;
  const { marks, html } = layerOf(before);
  return { moves: [hide([marks, html], { at: 0, stagger: 0 }), retitle(titleKey(before), titleKey(pictureId))] };
};

export const keys = <T extends { key: string }>(list: readonly T[]) => list.map((entry) => entry.key);
