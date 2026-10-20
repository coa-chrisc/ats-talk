/**
 * What the stands world's clicks share. A click brings the whole slide: its
 * beats chain on their own, a story line landing with the beat it explains,
 * and the chain ends on the slide's result. A slide's click puts the last
 * slide's picture away at once and changes the title; nothing carries from
 * one slide to the next. Each slide's moves are in its own module
 * (steps-track.ts, steps-exists.ts, steps-noticed.ts,
 * steps-infrastructure.ts, steps-fits.ts, steps-fleet.ts).
 */
import type { PartMove } from "@/components/deck/engine/types";
import type { MoveOpts } from "@/components/deck/engine/types";
import { EASE, chain, hide, lines, retitle, to, type ChainBeat } from "@/components/deck/kit";
import type { Beat } from "../steps";
import { COUNTS } from "./counts";
import { PICTURES, layerOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** A slide's beats as its one click's moves, timed by the kit's chain. */
export const play = (beats: readonly ChainBeat[]): Beat => ({ moves: chain(beats, { counts: COUNTS }) });

/** The click's first beat: the slide before puts its whole picture away at once, and the title changes. The world's first slide has nothing before it: its title comes up as the world arrives. */
export const into = (pictureId: string): ChainBeat => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  if (i === 0) return { moves: [lines(titleKey(pictureId), { at: ARRIVE })] };
  const before = PICTURES[i - 1].id;
  return { moves: [hide(partsOf(before), { at: 0, stagger: 0, duration: 0.3 }), retitle(titleKey(before), titleKey(pictureId))] };
};

/** What a picture puts on the stage besides its title, as the parts that go when the next slide comes. */
export const partsOf = (pictureId: string): string[] => Object.values(layerOf(pictureId));

/** A tag drops onto its place about its hole: it fades in a little high and a little small, and settles. */
export const drop = (key: string, at: number, duration = 0.6): PartMove[] => to(key, { autoAlpha: 1, "--y": 0, "--s": 1 }, { autoAlpha: 0, "--y": -18, "--s": 0.9 }, { at, duration, ease: EASE.out });

/** A part lands: it fades in from a little low (a figure on the line, a post in the ground, a tile in the yard). */
export const land = (key: string, at: number, duration = 0.6): PartMove[] => to(key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 16 }, { at, duration, ease: EASE.out });

/** A part settles from a little high, as a plaque does onto its cord. */
export const settle = (key: string, from: number, at: number, duration = 0.7): PartMove[] => to(key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: from }, { at, duration, ease: EASE.out });

/** A part comes in from the side it reads from: from `dx` px off its place, fading up (a line landing opposite its partner). */
export const slideIn = (key: string, dx: number, opts: MoveOpts): PartMove[] => to(key, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: dx }, { duration: 0.6, ease: EASE.out, ...opts });

/** A part travels by `--x` and `--y` (the kit's `dk-move`) to an offset from where it is drawn. */
export const travel = (key: string, place: { x?: number; y?: number }, opts: MoveOpts) => {
  const on: Record<string, number> = {};
  if (place.x !== undefined) on["--x"] = place.x;
  if (place.y !== undefined) on["--y"] = place.y;
  return to(key, on, { "--x": 0, "--y": 0 }, opts);
};
