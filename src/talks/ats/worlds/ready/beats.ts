/**
 * What the ready world's clicks share (docs/build-handbook.md, section 4). A
 * click brings the whole slide: its beats chain on their own, a story line
 * landing with the beat it explains, and the chain ends on the slide's
 * result. A slide's click puts the last slide's picture away at once and
 * changes the title; nothing carries from one slide to the next. Each
 * slide's moves are in its own module (steps-levels.ts,
 * steps-who-decides.ts, steps-residents.ts, steps-could-be.ts,
 * steps-applied.ts, steps-close.ts).
 */
import type { PartMove } from "@/components/deck/engine/types";
import { EASE, chain, hide, retitle, to, type ChainBeat } from "@/components/deck/kit";
import { COUNTS, PICTURES, groupOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** How long the last slide's picture takes to go. */
export const AWAY = 0.3;

/** A slide's beats as its one click's moves, timed by the kit's chain. */
export const play = (...beats: ChainBeat[]) => ({ moves: chain(beats, { counts: COUNTS }) });

/** The picture before puts its whole picture away at once, its story lines with it. */
export const leave = (pictureId: string): PartMove[] => {
  const { marks, html } = groupOf(pictureId);
  return hide([marks, html], { at: 0, duration: AWAY, stagger: 0 });
};

/** The id of the picture before this one in the world. */
export const before = (pictureId: string) => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  if (i < 1) throw new Error(`"${pictureId}" has no picture before it in this world.`);
  return PICTURES[i - 1].id;
};

/** A white slide's first beat: the slide before puts its picture away at once, and the title changes. */
export const into = (pictureId: string): ChainBeat => ({ moves: [leave(before(pictureId)), retitle(titleKey(before(pictureId)), titleKey(pictureId))] });

export const keys = <T extends { key: string }>(list: readonly T[]) => list.map((entry) => entry.key);

/** A part lands: it fades in from a little high and settles (a marker set down on the lane, a tile on its line). */
export const land = (key: string, at: number, duration = 0.5): PartMove[] => to(key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -14 }, { at, duration, ease: EASE.out });

/** A tag drops onto its place about its hole: it fades in a little high and a little small, and settles. */
export const drop = (key: string, at: number, duration = 0.6): PartMove[] => to(key, { autoAlpha: 1, "--y": 0, "--s": 1 }, { autoAlpha: 0, "--y": -18, "--s": 0.9 }, { at, duration, ease: EASE.out });
