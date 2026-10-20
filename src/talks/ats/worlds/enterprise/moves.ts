/**
 * What the enterprise world's clicks share. A click brings the whole slide:
 * its beats chain on their own, a story line landing with the beat it
 * explains, and the chain ends on the slide's result. A slide's click puts
 * the last slide's picture away at once and changes the title; nothing
 * carries from one slide to the next. The world's first slide brings its
 * title up as the world arrives, the world before having faded out. Each
 * slide's moves are in its own module (steps-spending.ts, steps-agents.ts,
 * steps-fleet.ts, steps-stumbled.ts).
 */
import type { PartMove } from "@/components/deck/engine/types";
import { EASE, chain, hide, lines, retitle, to, type ChainBeat } from "@/components/deck/kit";
import type { Beat } from "../steps";
import { COUNTS, PICTURES, layerOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** A slide's beats as its one click's moves, timed by the kit's chain. */
export const play = (beats: readonly ChainBeat[]): Beat => ({ moves: chain(beats, { counts: COUNTS }) });

/** The click's first beat: the slide before puts its whole picture away at once, and the title changes; on the world's first slide the title comes up as the world arrives. */
export const into = (pictureId: string): ChainBeat => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  if (i === 0) return { moves: [lines(titleKey(pictureId), { at: ARRIVE })] };
  const before = PICTURES[i - 1].id;
  return { moves: [hide(partsOf(before), { at: 0, stagger: 0, duration: 0.3 }), retitle(titleKey(before), titleKey(pictureId))] };
};

/** What a picture puts on the stage besides its title, as the parts that go when the next slide comes. */
export const partsOf = (pictureId: string): string[] => {
  const { marks, html } = layerOf(pictureId);
  return [marks, html];
};

/** A part lands: it fades in from a little low (a figure on the line, an agent in its place). */
export const land = (key: string, at: number, duration = 0.6): PartMove[] => to(key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 16 }, { at, duration, ease: EASE.out });
