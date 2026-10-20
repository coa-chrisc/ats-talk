/**
 * What the backup slides' clicks share (docs/city-build-handbook.md,
 * section 4). A click brings the whole slide: its beats chain on their own,
 * a story line landing with the beat it explains, and the chain ends on the
 * slide's finished picture. A slide's click puts the last slide's picture
 * away at once and changes the title; nothing carries from one backup slide
 * to the next, since the speaker may jump straight to any of them.
 */
import { chain, hide, lines, retitle, type ChainBeat } from "@/components/deck/kit";
import { COUNTS, PICTURES, groupOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** A slide's beats as its one click's moves, timed by the kit's chain. */
export const play = (...beats: ChainBeat[]) => ({ moves: chain(beats, { counts: COUNTS }) });

/**
 * The click's first beat: the slide before puts its whole picture away at
 * once and the title changes. The world's first slide has no slide before
 * it, so its title simply comes up once the arrival fade is under way.
 */
export const into = (pictureId: string): ChainBeat => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  if (i === 0) return { moves: [lines(titleKey(pictureId), { at: ARRIVE, duration: 0.9 })] };
  const before = PICTURES[i - 1].id;
  const { marks, html } = groupOf(before);
  return { moves: [hide([marks, html], { at: 0, stagger: 0 }), retitle(titleKey(before), titleKey(pictureId))] };
};

/** The ids of a list of parts. */
export const keys = <T extends { key: string }>(list: readonly T[]) => list.map((entry) => entry.key);
