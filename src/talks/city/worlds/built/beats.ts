/**
 * What the built world's clicks share (docs/city-build-handbook.md, section
 * 4). A click brings the whole slide: its beats chain on their own, a story
 * line landing with the beat it explains, and the chain ends on the slide's
 * result. A slide's click puts the last slide's picture away at once and
 * changes the title; nothing carries from one slide to the next. Each
 * slide's moves are in its own module (steps-*.ts).
 */
import { RETITLE, chain, hide, lines, retitle, type ChainBeat } from "@/components/deck/kit";
import { COUNTS } from "./counts";
import { PICTURES, groupOf, titleKey } from "./layout";

/** The world's first title waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** A slide's beats as its one click's moves, timed by the kit's chain. */
export const play = (...beats: ChainBeat[]) => ({ moves: chain(beats, { counts: COUNTS }) });

/**
 * The click's first beat. On the world's first slide its title comes up as
 * the world arrives; on any other, the slide before puts its whole picture
 * away at once, and the title changes. With `title: false` the old title
 * goes and the new one waits, for a slide that opens on a beat with no
 * words: its own beat (`titleIn`) brings the title up once that has played.
 */
export const into = (pictureId: string, opts: { title?: boolean } = {}): ChainBeat => {
  const i = PICTURES.findIndex((entry) => entry.id === pictureId);
  if (i < 0) throw new Error(`The built world has no picture "${pictureId}".`);
  const title = opts.title ?? true;
  if (i === 0) return { moves: title ? [lines(titleKey(pictureId), { at: ARRIVE, duration: RETITLE.in })] : [] };
  const before = PICTURES[i - 1].id;
  const { marks, html } = groupOf(before);
  const change = title ? retitle(titleKey(before), titleKey(pictureId)) : hide(titleKey(before), { at: 0, duration: RETITLE.out });
  return { moves: [hide([marks, html], { at: 0, stagger: 0 }), change] };
};

/** A slide's title comes up on its own, as `retitle` brings one: for a click whose first beat kept it back (`into(id, { title: false })`). */
export const titleIn = (pictureId: string): ChainBeat => ({ moves: [lines(titleKey(pictureId), { at: 0, duration: RETITLE.in })] });
