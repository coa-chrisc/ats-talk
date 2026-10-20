/**
 * What Part 4's clicks share (docs/city-build-handbook.md, section 4). A
 * click brings the whole slide: its beats chain on their own, a story line
 * landing with the beat it explains, and the chain ends on the slide's
 * result. A slide's click puts the last slide's picture away at once and
 * changes the title; nothing carries from one slide to the next. Each
 * slide's moves are in its own module (steps-work.ts, steps-fit.ts,
 * steps-close.ts).
 */
import type { PartMove } from "@/components/deck/engine/types";
import { chain, hide, type ChainBeat } from "@/components/deck/kit";
import { TITLES, groupOf } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** How long the last slide's picture takes to go. */
export const AWAY = 0.3;

/** How many elements carry each id on more than one: a title's lines. A chain times a staggered move by it. */
export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.map((title) => [title.key, title.lines.length] as const));

/** A slide's beats as its one click's moves, timed by the kit's chain, the first starting `at` seconds in. */
export const play = (beats: readonly ChainBeat[], at = 0) => ({ moves: chain(beats, { at, counts: COUNTS }) });

/** The slide before puts its whole picture away at once, its story lines with it. */
export const leave = (pictureId: string): PartMove[] => {
  const { marks, html } = groupOf(pictureId);
  return hide([marks, html], { at: 0, duration: AWAY, stagger: 0 });
};

export const keys = <T extends { key: string }>(list: readonly T[]) => list.map((entry) => entry.key);
