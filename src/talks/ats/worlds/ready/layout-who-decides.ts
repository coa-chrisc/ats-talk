/**
 * Slide 25's places, in two zones. On the left, a short stack of three tiers
 * in the middle of the zone, top to bottom, each its name over its caption
 * (the middle tier's caption on two lines); the middle tier takes the orange
 * mark at its right end. A long arrow runs down the stack's left side, its
 * label to its left, and another up its right side, its label to its right
 * on two lines. On the right, the second zone: a heading, and under it three
 * question cards, each with a stripe down its left edge, that land one under
 * another. Words are read from the script, by position. The two zones fill
 * the field, so their words are placed by their widths as Geist sets them
 * (from the font's advance widths, at the kit's weights and tracking), not
 * the wide estimate: see MEASURED.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter } from "../../script/find";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, groupOf, labelsOf, wordsWidth } from "./layout";

const [LEADERSHIP, LINES, DCIO, AUTHORITY, CISO, CONTROLS, DOWN, UP, HEADING, ...QUESTIONS] = labelsOf("who-decides");

const TOP = contentTop("who-decides");

/** Where the two long labels break, by the word a line ends on: the middle tier's caption, and the up arrow's label. */
const AUTHORITY_LINES = breakAfter(AUTHORITY, "each");
const UP_LINES = breakAfter(UP, "incidents");

/**
 * The words' widths as Geist sets them, line by line: the tiers' names and
 * the heading at 32 px semibold, the captions at 26 px medium and the
 * arrows' labels at 26 px semibold with the label's 0.01em, the cards'
 * words at 32 px medium.
 */
const MEASURED: Readonly<Record<string, number>> = {
  [LEADERSHIP]: 174,
  [LINES]: 440,
  [DCIO]: 80,
  [AUTHORITY_LINES[0]]: 304,
  [AUTHORITY_LINES[1]]: 326,
  [CISO]: 78,
  [CONTROLS]: 231,
  [DOWN]: 266,
  [UP_LINES[0]]: 278,
  [UP_LINES[1]]: 200,
  [HEADING]: 546,
  [QUESTIONS[0]]: 268,
  [QUESTIONS[1]]: 363,
  [QUESTIONS[2]]: 508,
};
/** A line of words' box by its measured width (the estimate where none is measured), one line of its size tall, centred on the point up and down. */
export const measuredBox = (at: Point, text: string, size: 26 | 32, anchor: "start" | "middle" | "end" = "start"): Box => {
  const w = MEASURED[text] ?? wordsWidth(text, size);
  const line = size === 26 ? LABEL_LINE : TEXT_LINE;
  const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : at.x - w / 2;
  return box(Math.round(x), at.y - line / 2, w, line);
};
/** A run of lines' boxes, each line's middle a label line under the last. */
export const linesBoxes = (at: Point, lines: readonly string[], size: 26 | 32, anchor: "start" | "end" = "start"): Box[] =>
  lines.map((line, i) => measuredBox({ x: at.x, y: at.y + i * LABEL_LINE }, line, size, anchor));

/**
 * Across the field, left to right: the down arrow's label (266) from x 100,
 * ending 18 short of its arrow at 384; the tiers 24 on, from 408, 488 wide
 * (the longest caption, 440, from 32 in, with 16 to spare); the up arrow 24
 * past them at 920 and its label 18 on, ending about 1216; the cards from
 * 1256, 40 clear of it, to the field's right edge.
 */
const TIER = { x: 408, w: 488, h: 132, gap: 12, first: TOP + 12, inset: 32 } as const;
/** In a tier: a one-line caption's name 44 down and its caption 90 down; with a two-line caption, the name 32 down and the caption's lines 74 and 106 down. */
const IN_TIER = { one: { name: 44, caption: 90 }, two: { name: 32, caption: 74 } } as const;
const stackFoot = TIER.first + 3 * TIER.h + 2 * TIER.gap;
/** The arrows: 24 px either side of the stack, running its whole height; a label 18 outside its arrow. */
const ARROW = { left: TIER.x - 24, right: TIER.x + TIER.w + 24, top: TIER.first, foot: stackFoot, label: 18 } as const;
const MIDDLE = (ARROW.top + ARROW.foot) / 2;
/**
 * The question zone: the heading on a 45 px line, 20 over the first card;
 * the cards 96 tall and 24 apart, from x 1256 to the field's right edge;
 * the whole centred on the stack's middle; each card's words 24 after its
 * stripe, so the longest (508) ends 28 inside its card.
 */
const CARD = { x: 1256, h: 96, gap: 24, stripe: 8, words: 24, under: 20 } as const;
const zoneH = TEXT_LINE + CARD.under + 3 * CARD.h + 2 * CARD.gap;
const zoneTop = Math.round(MIDDLE - zoneH / 2);
const cardsTop = zoneTop + TEXT_LINE + CARD.under;
/** The orange mark, 56 in from the middle tier's right end. */
const MARK_IN = 56;

const tierTop = (i: number) => TIER.first + i * (TIER.h + TIER.gap);

export const WHO_DECIDES = {
  ...groupOf("who-decides"),
  tiers: [
    [LEADERSHIP, [LINES]],
    [DCIO, AUTHORITY_LINES],
    [CISO, [CONTROLS]],
  ].map(([name, caption], i) => {
    const at = box(TIER.x, tierTop(i), TIER.w, TIER.h);
    const lines = caption as string[];
    const places = lines.length > 1 ? IN_TIER.two : IN_TIER.one;
    return {
      key: `who-decides.tier.${i}`,
      at,
      name: { key: `who-decides.tier.${i}.name`, text: name as string, at: { x: at.x + TIER.inset, y: at.y + places.name } as Point },
      caption: { key: `who-decides.tier.${i}.caption`, lines, at: { x: at.x + TIER.inset, y: at.y + places.caption } as Point },
    };
  }),
  mark: { key: "who-decides.mark", at: { x: TIER.x + TIER.w - MARK_IN, y: tierTop(1) + TIER.h / 2 } as Point },
  down: {
    key: "who-decides.down",
    from: { x: ARROW.left, y: ARROW.top } as Point,
    to: { x: ARROW.left, y: ARROW.foot } as Point,
    label: { key: "who-decides.down.label", lines: [DOWN], at: { x: ARROW.left - ARROW.label, y: MIDDLE } as Point },
  },
  up: {
    key: "who-decides.up",
    from: { x: ARROW.right, y: ARROW.foot } as Point,
    to: { x: ARROW.right, y: ARROW.top } as Point,
    label: { key: "who-decides.up.label", lines: UP_LINES, at: { x: ARROW.right + ARROW.label, y: MIDDLE - ((UP_LINES.length - 1) * LABEL_LINE) / 2 } as Point },
  },
  heading: { key: "who-decides.heading", text: HEADING, at: { x: CARD.x, y: zoneTop + TEXT_LINE / 2 } as Point },
  cards: QUESTIONS.map((text, i) => {
    const at = box(CARD.x, cardsTop + i * (CARD.h + CARD.gap), SAFE.right - CARD.x, CARD.h);
    return { key: `who-decides.card.${i}`, at, stripe: CARD.stripe, text, words: { x: at.x + CARD.stripe + CARD.words, y: at.y + at.h / 2 } as Point };
  }),
};

/** An arrowhead's reach past its line's end. */
const HEAD = 14;

/** Everything slide 25 draws under its story band, for the layout test. */
export const WHO_DECIDES_BOXES: Box[] = [
  ...WHO_DECIDES.tiers.flatMap((tier) => [tier.at, measuredBox(tier.name.at, tier.name.text, 32), ...linesBoxes(tier.caption.at, tier.caption.lines, 26)]),
  box(WHO_DECIDES.mark.at.x - 24, WHO_DECIDES.mark.at.y - 24, 48, 48),
  box(ARROW.left - HEAD, ARROW.top, 2 * HEAD, ARROW.foot - ARROW.top),
  box(ARROW.right - HEAD, ARROW.top, 2 * HEAD, ARROW.foot - ARROW.top),
  ...linesBoxes(WHO_DECIDES.down.label.at, WHO_DECIDES.down.label.lines, 26, "end"),
  ...linesBoxes(WHO_DECIDES.up.label.at, WHO_DECIDES.up.label.lines, 26),
  measuredBox(WHO_DECIDES.heading.at, HEADING, 32),
  ...WHO_DECIDES.cards.flatMap((card) => [card.at, measuredBox(card.words, card.text, 32)]),
];

/** Each card's words fit inside it with room at its right. */
export const cardFits = (card: (typeof WHO_DECIDES.cards)[number]) => card.words.x + measuredBox(card.words, card.text, 32).w <= card.at.x + card.at.w - 20 && TEXT_LINE <= card.at.h;
