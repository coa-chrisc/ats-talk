/**
 * Slide 3's click, the world's first: the title comes up as the world
 * arrives; the floor draws and the two columns rise from it, the shorter
 * first and the taller after it and slower, each named as it tops out, the
 * pair captioned, with story line A; the figure rises beside them with its
 * caption; then, after a hold to read, the bar draws at the right and
 * splits into its three named parts, which fill left to right, the middle
 * one green, its bracket and caption coming with it, with story line B.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, HOLD, draw, fill, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { SPENDING } from "./layout-spending";
import { into, play } from "./moves";

const S = SPENDING;
const B = S.bar;

/** Each column's rise: the taller takes longer, at the same pace, so the two read as measures of one thing. */
const RISE = [
  { at: 0.35, duration: 0.6 },
  { at: 0.55, duration: 1.4 },
] as const;
/** The bar's parts fill one after another, left to right, each in time with its share. */
const PARTS = [
  { at: 1.2, duration: 0.6 },
  { at: 1.85, duration: 0.9 },
  { at: 2.8, duration: 0.3 },
] as const;

export const spending = (): StepDef[] =>
  picture("spending", {
    play: play([
      into("spending"),
      // The floor, the two columns rising from it, each named as it tops out, and their caption.
      {
        with: true,
        hold: 0.35,
        moves: [
          draw(S.floor.key, { at: 0, duration: 0.5 }),
          ...S.columns.flatMap((column, i) => [fill(column.key, { ...RISE[i], ease: EASE.out }), rise(column.name.key, { at: RISE[i].at + RISE[i].duration * 0.7, duration: 0.6 })]),
          rise(S.ofIt.key, { at: 1.1, duration: 0.6 }),
        ],
      },
      { with: true, hold: 0.7, moves: [story("spending", 0)] },
      // The figure beside them, and its caption.
      { hold: 0.5, moves: [rise(S.figure.key, { at: 0, duration: 0.75 }), rise(S.figure.caption.key, { at: 0.15, duration: 0.75 })] },
      // The bar draws, splits into its three named parts, and they fill left to right; the middle one is bracketed and captioned as it fills.
      {
        hold: HOLD.read,
        moves: [
          draw(B.key, { at: 0, duration: 0.8 }),
          ...B.splits.flatMap((split, i) => draw(split.key, { at: 0.6 + i * 0.1, duration: 0.4 })),
          ...B.parts.flatMap((part, i) => rise(part.name.key, { at: 0.75 + i * 0.12, duration: 0.6 })),
          ...B.parts.flatMap((part, i) => fill(part.key, { ...PARTS[i], ease: EASE.draw })),
          draw(B.bracket.key, { at: 2.2, duration: 0.5 }),
          rise(B.caption.key, { at: 2.45, duration: 0.7 }),
        ],
      },
      { with: true, hold: 1.85, moves: [story("spending", 1)] },
    ]),
  });
