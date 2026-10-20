/**
 * Slide 19's click: the slide before goes and the title changes. The indigo
 * panel grows down from its top (hidden until it does, so it is never
 * there on an earlier slide). Then the four rows, one at a time: each
 * row's disc and decision come up, its green numeral rises onto the disc,
 * and its nameplate lands under the decision. Line A comes in with the
 * second row, line B with the fourth, and the grey tag comes up last on the
 * white ground under the panel.
 */
import { EASE, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { DECISIONS } from "./layout-decisions";

const D = DECISIONS;

/** Inside a row: the decision, then its numeral, then its nameplate. */
const ROW = { numeral: 0.15, plate: 0.55 } as const;
/** Seconds between one row's start and the next: long enough to read a decision. */
export const ROW_APART = 1.15;

const row = (entry: (typeof D.rows)[number], hold: number) => ({
  with: true,
  hold,
  moves: [rise(entry.key, { at: 0 }), rise(entry.numeral.key, { at: ROW.numeral }), rise(entry.plate.key, { at: ROW.plate })],
});

export const decisions = picture("decisions", {
  play: play(
    into("decisions"),
    // The panel grows down from its top.
    { with: true, hold: 0.4, moves: [to(D.panel.key, { "--k": 1, autoAlpha: 1 }, { "--k": 0, autoAlpha: 0 }, { at: 0, duration: 0.8, ease: EASE.out })] },
    // The four decisions, one at a time, each with its owner.
    row(D.rows[0], 0.6),
    row(D.rows[1], ROW_APART),
    { with: true, hold: 0.1, moves: [story("decisions", 0)] },
    row(D.rows[2], ROW_APART - 0.1),
    row(D.rows[3], ROW_APART),
    { with: true, hold: 0.1, moves: [story("decisions", 1)] },
    // The grey tag under the panel.
    { hold: 0.2, moves: [rise(D.tag.key, { at: 0 })] },
  ),
});
