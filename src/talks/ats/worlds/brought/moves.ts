/**
 * What the brought world's clicks share. A click brings the whole slide:
 * its beats chain on their own, a story line landing with the beat it
 * explains, and the chain ends on the slide's result. Slide 2's click puts
 * slide 1's picture away at once and changes the title; nothing carries
 * from one slide to the next. Each slide's moves are in its own module
 * (steps-title.ts, steps-four-ideas.ts).
 */
import { chain, hide, retitle, type ChainBeat } from "@/components/deck/kit";
import type { Beat } from "../steps";
import { COUNTS, PICTURES, layerOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** A slide's beats as its one click's moves, timed by the kit's chain, the first starting `at` seconds in. */
export const play = (beats: readonly ChainBeat[], at = 0): Beat => ({ moves: chain(beats, { at, counts: COUNTS }) });

/** What a picture puts on the stage besides its title, as the parts that go when the next slide comes: slide 1 has no marks, only its HTML (its rule and story lines). */
export const partsOf = (pictureId: string): string[] => {
  const { marks, html } = layerOf(pictureId);
  return pictureId === PICTURES[0].id ? [html] : [marks, html];
};

/** The click's first beat: the slide before puts its whole picture away at once, and the title changes. */
export const into = (pictureId: string): ChainBeat => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  const before = PICTURES[i - 1].id;
  return { moves: [hide(partsOf(before), { at: 0, stagger: 0, duration: 0.3 }), retitle(titleKey(before), titleKey(pictureId))] };
};
