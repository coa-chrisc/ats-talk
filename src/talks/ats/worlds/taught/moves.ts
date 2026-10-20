/**
 * What the taught world's clicks share. A click brings the whole slide: its
 * beats chain on their own, a story line landing with the beat it explains,
 * and the chain ends on the slide's result. A slide's click puts the last
 * slide's picture away at once and changes the title; nothing carries from
 * one slide to the next. Each slide's moves are in its own module
 * (steps-ladder.ts, steps-talent.ts, steps-enforce.ts, steps-incidents.ts).
 */
import { chain, hide, retitle, to, type ChainBeat } from "@/components/deck/kit";
import type { MoveOpts } from "@/components/deck/engine/types";
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

/** A part turns from `from` degrees to `angle` (its CSS reads `--r`). */
export const turn = (key: string, angle: number, from: number, opts?: MoveOpts) => to(key, { "--r": angle }, { "--r": from }, opts);

/** A part travels by `--x` and `--y` (the kit's `dk-move`) from `from` to `place`. */
export const travel = (key: string, place: { x?: number; y?: number }, from: { x: number; y: number }, opts?: MoveOpts) => {
  const on: Record<string, number> = {};
  if (place.x !== undefined) on["--x"] = place.x;
  if (place.y !== undefined) on["--y"] = place.y;
  return to(key, on, { "--x": from.x, "--y": from.y }, opts);
};
