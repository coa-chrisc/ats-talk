/**
 * The who world's own short-hands over the house verbs: leaving a slide,
 * turning a card face up, lighting a timeline marker, and writing a click as
 * a chain of beats, each beat timed to its last element.
 */
import type { PartMove } from "@/components/deck/engine/types";
import { EASE, chain, draw, fill, hide, rise, show, to, type ChainBeat, type Counts } from "@/components/deck/kit";
import type { Beat } from "../steps";
import { TITLE_LINES } from "./layout";
import { turnOf } from "./parts";

/** The ids several elements carry: a title's lines, and slide 1's story lines. */
export const COUNTS: Counts = TITLE_LINES;

/** One click: its beats in order (kit `chain`), the first starting `at` seconds in. */
export const chained = (beats: readonly ChainBeat[], at = 0): Beat => ({ moves: chain(beats, { at, counts: COUNTS }) });

/** What the last slide left goes at the click, together, before the new title lands. */
export const leave = (keys: readonly string[]): PartMove[] => hide(keys, { at: 0, duration: 0.3, stagger: 0 });

/** How far a card's turn is seen in depth: the eye 900 px off the stage. */
const DEPTH = 900;

/**
 * Cards turn face up, one after another `stagger` apart if there are
 * several: each fades in over the first part of its turn, back first, and
 * settles face up.
 */
export const turnUp = (keys: readonly string[], opts: { at: number; duration?: number; stagger?: number }): PartMove[] => {
  const { at, duration = 0.8, stagger = 0.08 } = opts;
  return [
    ...show(keys, { at, duration: 0.2, stagger }),
    ...to(
      keys.map(turnOf),
      { rotationY: 0, transformPerspective: DEPTH },
      { rotationY: 180, transformPerspective: DEPTH },
      { at, duration, ease: EASE.page, stagger },
    ),
  ];
};

/** A timeline marker lights: its dot fills out of the ring, its stem draws up, and its name comes up at the stem's top, its year over it just after. */
export const lightUp = (marker: { key: string; stem: { key: string }; name: { key: string }; year?: { key: string } }, at: number): PartMove[] => [
  ...fill(marker.key, { at, duration: 0.5, ease: EASE.out }),
  ...draw(marker.stem.key, { at: at + 0.1, duration: 0.45 }),
  ...rise(marker.name.key, { at: at + 0.25, duration: 0.6 }),
  ...(marker.year ? rise(marker.year.key, { at: at + 0.35, duration: 0.6 }) : []),
];
