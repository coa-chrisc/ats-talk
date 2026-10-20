/**
 * Slide 19's places: one indigo panel across the whole field, from under the
 * story band to just over the grey tag at the foot, holding four numbered
 * rows; each row is a large green numeral on a white disc at the left, its
 * decision in white beside it, and under the decision a green nameplate
 * saying who carries it. The grey tag sits under the panel at its left, on
 * the white ground. The deck keeps navy for the title and the close, so the
 * slide's own ground stays white. Words are read from the script, by
 * position: the script's nameplates name the first two rows' owner once, so
 * the second row takes the first plate's words again.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, TAG, contentTop, groupOf, labelsOf, tagWidth, wordsBox, wordsWidth } from "./layout";

const [FIRST, SECOND, THIRD, FOURTH, WE_RUN, DRAFT, KEEP_GOING, NO_BUDGET] = labelsOf("decisions");

const TOP = contentTop("decisions");
/** The tag at the foot, 16 under the panel. */
const TAG_GAP = 16;
const PANEL = { x: SAFE.left, y: TOP, w: SAFE.right - SAFE.left, h: SAFE.bottom - TAG.h - TAG_GAP - TOP, rx: 16 } as const;
/** Four rows, 92 apart, the first 22 under the panel's top, so the last plate ends 10 over the panel's foot. */
const ROW = { first: PANEL.y + 22, pitch: 92 } as const;
/** In a row: the disc's middle 68 in and 40 down; the decision 136 in and 22 down; the plate 46 down. */
const IN_ROW = { disc: 68, discY: 40, words: 136, line: 22, plate: 46 } as const;
/** The white disc a numeral sits on: big enough for the 56 px figure with room round it. */
export const DISC_R = 36;
/** The numerals' figure at 56 px semibold: about 40 tall and 36 wide; it sits centred on its disc. */
export const NUMERAL = { h: 40, w: 36 } as const;
/** The nameplate: a small head and shoulders, then the words, 34 tall. */
export const DECISION_PLATE = { h: 34, pad: 14, icon: 22 } as const;

const plateW = (text: string) => DECISION_PLATE.pad + DECISION_PLATE.icon + 10 + wordsWidth(text) + DECISION_PLATE.pad;

const ROWS = [
  [FIRST, WE_RUN],
  [SECOND, WE_RUN],
  [THIRD, DRAFT],
  [FOURTH, KEEP_GOING],
] as const;

export const DECISIONS = {
  ...groupOf("decisions"),
  panel: { key: "decisions.panel", at: box(PANEL.x, PANEL.y, PANEL.w, PANEL.h), rx: PANEL.rx },
  rows: ROWS.map(([text, owner], i) => {
    const top = ROW.first + i * ROW.pitch;
    const x = PANEL.x + IN_ROW.words;
    const disc = { x: PANEL.x + IN_ROW.disc, y: top + IN_ROW.discY } as Point;
    return {
      key: `decisions.row.${i}`,
      /** Which figure the numeral draws, 0 for the first. */
      figure: i,
      disc,
      numeral: { key: `decisions.row.${i}.numeral`, at: { x: disc.x - NUMERAL.w / 2, y: disc.y + NUMERAL.h / 2 } as Point },
      text,
      words: { x, y: top + IN_ROW.line } as Point,
      plate: { key: `decisions.row.${i}.plate`, text: owner, at: box(x, top + IN_ROW.plate, plateW(owner), DECISION_PLATE.h) },
    };
  }),
  tag: { key: "decisions.tag", text: NO_BUDGET, at: box(PANEL.x, PANEL.y + PANEL.h + TAG_GAP, tagWidth(NO_BUDGET), TAG.h) },
};

/** Everything slide 19 draws under its story band, for the layout test. */
export const DECISIONS_BOXES: Box[] = [
  DECISIONS.panel.at,
  ...DECISIONS.rows.flatMap((row) => [box(row.disc.x - DISC_R, row.disc.y - DISC_R, 2 * DISC_R, 2 * DISC_R), wordsBox(row.words, row.text, 32, "start"), row.plate.at]),
  DECISIONS.tag.at,
];
