/**
 * Slide 6's places: at the top left a large figure, its first word on a
 * line over its number, its caption under it; to its right three plain
 * cards in a row spanning the rest of the band, a gap between each, each a
 * square-cornered white face with a grey band across its top, its case
 * name large under the band, what happened under that on two or three
 * lines, and a grey tag across its foot naming what was not in place; under the three a single line, its words
 * centred under it. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { SAFE, TAG_LINE, TEXT_LINE, LABEL_LINE, capOf, contentTop, figureRuns, layerOf } from "./layout";

const [OVER, CANCELED, POCKET, DELETED, UBER, BUDGET, AIR, REFUND, NOTHING_ASKED, NOTHING_CAPPED, NOTHING_CHECKED, MISSING] = shown("stumbled", "play");
const CASES = [
  [POCKET, DELETED, NOTHING_ASKED],
  [UBER, BUDGET, NOTHING_CAPPED],
  [AIR, REFUND, NOTHING_CHECKED],
] as const;

export const TOP = contentTop("stumbled");

/**
 * The figure's column: from the band's left edge, 400 wide (its number and
 * the word after it about 360 px), 48 px short of the first card. Its first word at 40 px sits on a baseline 32 px under
 * the drawing's top (its capitals clear the top by 3 px); the number at
 * 128 px and the words after it at 40 px share a second baseline 108 px
 * lower; the caption, at the text size, wraps under that in the column on
 * up to four lines.
 */
export const FIGURE = { size: 128, small: 40, w: 400, lead: 32, drop: 108, captionGap: 22, captionLines: 4 } as const;
const FIGURE_X = SAFE.left + 16;
const FIRST_BASE = TOP + FIGURE.lead;
const SECOND_BASE = FIRST_BASE + FIGURE.drop;

/**
 * A card: 400 wide, so the three with their two 40 px gaps span 544 to 1824.
 * Inside its 28 px insets (a 344 px column) each case name sets at 48 px on
 * one line, each description on two or three lines of 26 px and each tag's
 * words, inside the tag's 10 px pads, on one or two lines of 24 px.
 */
export const CARD = { x: 544, w: 400, gap: 40 } as const;
/** The line 28 px under the cards, its words 12 px under it at 32 px, the words' foot at the drawing's foot: the cards take the rest. */
const LINE_GAP = 28;
const LABEL_GAP = 12;
const CARD_H = SAFE.bottom - 24 - TEXT_LINE - LABEL_GAP - LINE_GAP - TOP;
/** Inside a card: the band, the 28 px inset, the 48 px name's line, the gap, room for the description's 26 px words on up to three lines; the tag's two 24 px lines and its pad, at the foot. */
export const INNER = { band: 16, pad: 28, name: 56, gap: 8, lines: 3, tagPad: 10 } as const;
const TAG_H = 2 * TAG_LINE + 2 * INNER.tagPad;
const LINE_Y = TOP + CARD_H + LINE_GAP;

const cardAt = (i: number): Box => box(CARD.x + i * (CARD.w + CARD.gap), TOP, CARD.w, CARD_H);

export const STUMBLED = {
  ...layerOf("stumbled"),
  figure: {
    key: "stumbled.figure",
    text: OVER,
    runs: figureRuns(OVER),
    /** The first word's baseline, and the number's. */
    first: { x: FIGURE_X, y: FIRST_BASE } as Point,
    second: { x: FIGURE_X, y: SECOND_BASE } as Point,
    caption: { key: "stumbled.figure.caption", text: CANCELED, at: box(FIGURE_X, SECOND_BASE + FIGURE.captionGap, FIGURE.w, FIGURE.captionLines * TEXT_LINE) },
  },
  cards: CASES.map(([name, what, tag], i) => {
    const at = cardAt(i);
    const x = at.x + INNER.pad;
    const w = at.w - 2 * INNER.pad;
    const nameY = at.y + INNER.band + INNER.pad;
    const whatY = nameY + INNER.name + INNER.gap;
    return {
      key: `stumbled.card.${i}`,
      at,
      /** The grey band across the top. */
      band: box(at.x, at.y, at.w, INNER.band),
      name: { key: `stumbled.card.${i}.name`, text: name, at: box(x, nameY, w, INNER.name) },
      what: { key: `stumbled.card.${i}.what`, text: what, at: box(x, whatY, w, INNER.lines * LABEL_LINE) },
      tag: { key: `stumbled.card.${i}.tag`, text: tag, at: box(x, at.y + at.h - INNER.pad - TAG_H, w, TAG_H) },
    };
  }),
  line: { key: "stumbled.line", y: LINE_Y, x0: CARD.x, x1: SAFE.right },
  label: { key: "stumbled.label", text: MISSING, at: box(CARD.x, LINE_Y + LABEL_GAP, SAFE.right - CARD.x, TEXT_LINE) },
};

/** The figure's two baselines' box, for the layout tests: from the first word's capitals to a descender's room under the number. */
export const figureBox = (): Box => box(FIGURE_X, FIRST_BASE - capOf(FIGURE.small), FIGURE.w, SECOND_BASE + 8 - (FIRST_BASE - capOf(FIGURE.small)));
