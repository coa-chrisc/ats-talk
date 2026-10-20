/**
 * What the stand world's clicks share. A click brings the whole slide: its
 * beats chain on their own, a story line landing with the beat it explains,
 * and the chain ends on the slide's result. A slide's click puts the last
 * slide's picture away at once and changes the title; nothing carries from
 * one slide to the next. Each slide's moves are in its own module
 * (steps-title.ts, steps-world-moved.ts, steps-position.ts,
 * steps-exists.ts, steps-fleet.ts).
 */
import type { PartMove } from "@/components/deck/engine/types";
import { EASE, chain, hide, retitle, to, type ChainBeat } from "@/components/deck/kit";
import type { Beat } from "../steps";
import { COUNTS, PICTURES, layerOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** A slide's beats as its one click's moves, timed by the kit's chain, the first starting `at` seconds in. */
export const play = (beats: readonly ChainBeat[], at = 0): Beat => ({ moves: chain(beats, { at, counts: COUNTS }) });

/** The click's first beat: the slide before puts its whole picture away at once, and the title changes. */
export const into = (pictureId: string): ChainBeat => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  const before = PICTURES[i - 1].id;
  return { moves: [hide(partsOf(before), { at: 0, stagger: 0, duration: 0.3 }), retitle(titleKey(before), titleKey(pictureId))] };
};

/** What a picture puts on the stage besides its title, as the parts that go when the next slide comes: slide 1 has no marks, only its HTML (its rule and story lines). */
export const partsOf = (pictureId: string): string[] => {
  const { marks, html } = layerOf(pictureId);
  return pictureId === PICTURES[0].id ? [html] : [marks, html];
};

/** A tag drops onto its place about its hole: it fades in a little high and a little small, and settles. */
export const drop = (key: string, at: number, duration = 0.6): PartMove[] => to(key, { autoAlpha: 1, "--y": 0, "--s": 1 }, { autoAlpha: 0, "--y": -18, "--s": 0.9 }, { at, duration, ease: EASE.out });

/** A part lands: it fades in from a little low and a little small (a figure on the line, a post in the ground). */
export const land = (key: string, at: number, duration = 0.6): PartMove[] => to(key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 16 }, { at, duration, ease: EASE.out });
