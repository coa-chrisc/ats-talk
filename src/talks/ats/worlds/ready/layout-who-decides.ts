/**
 * Slide 25's places, in two zones. On the left, a short stack of three tiers
 * in the middle of the zone, top to bottom, each its name over its caption;
 * the middle tier takes the orange mark at its right end. A long arrow runs
 * down the stack's left side, its label to its left, and another up its
 * right side, its label to its right. On the right, the second zone: three
 * question cards, each with a stripe down its left edge, that land one under
 * another. Words are read from the script, by position. The two zones
 * fill the field, so their words are placed by their measured widths
 * (Geist at the kit's weights and tracking, from the font's advance widths),
 * not the wide estimate: see MEASURED.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, TEXT_LINE, contentTop, groupOf, labelsOf, wordsWidth } from "./layout";

const [LEADERSHIP, LINES, DCIO, AUTHORITY, CISO, CONTROLS, DOWN, UP, ...QUESTIONS] = labelsOf("who-decides");

const TOP = contentTop("who-decides");

/** The words' widths as Geist sets them: names at 32 px semibold, captions and the arrows' labels at 26 px medium with the label's 0.01em, the cards' words at 32 px medium. */
const MEASURED: Readonly<Record<string, number>> = {
  [LEADERSHIP]: 174,
  [LINES]: 440,
  [DCIO]: 80,
  [AUTHORITY]: 223,
  [CISO]: 78,
  [CONTROLS]: 231,
  [DOWN]: 271,
  [UP]: 230,
  [QUESTIONS[0]]: 268,
  [QUESTIONS[1]]: 363,
  [QUESTIONS[2]]: 508,
};
/** A run of words' box by its measured width (the estimate where none is measured), one line of its size tall, centred on the point up and down. */
export const measuredBox = (at: Point, text: string, size: 26 | 32, anchor: "start" | "middle" | "end" = "start"): Box => {
  const w = MEASURED[text] ?? wordsWidth(text, size);
  const line = size === 26 ? 32 : TEXT_LINE;
  const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : at.x - w / 2;
  return box(Math.round(x), at.y - line / 2, w, line);
};

/** The tiers: 496 wide (the longest caption, 440, from 36 in, with 20 to spare), 120 tall, 16 apart, from x 424 so the down arrow's label (271) ends 9 inside the field at its left; the first 12 under the drawing's top. */
const TIER = { x: 424, w: 496, h: 120, gap: 16, first: TOP + 12 } as const;
/** The name 34 over a tier's middle and the caption 26 under it; both from the tier's left plus 36. */
const IN_TIER = { name: -20, caption: 26, x: 36 } as const;
const stackFoot = TIER.first + 3 * TIER.h + 2 * TIER.gap;
/** The arrows: 28 px either side of the stack, running its whole height; a label 20 outside its arrow. */
const ARROW = { left: TIER.x - 28, right: TIER.x + TIER.w + 28, top: TIER.first, foot: stackFoot, label: 20 } as const;
const MIDDLE = (ARROW.top + ARROW.foot) / 2;
/** The question cards: from x 1256, 58 clear of the up arrow's label (ends 1198), to the field's right edge, 96 tall and 28 apart, centred on the stack's middle so they do not line up with its tiers; the words 24 after the stripe, so the longest (508) ends 28 inside the card. */
const CARD = { x: 1256, h: 96, gap: 28, stripe: 8, words: 24 } as const;
const cardsTop = MIDDLE - (3 * CARD.h + 2 * CARD.gap) / 2;
/** The orange mark, 56 in from the middle tier's right end. */
const MARK_IN = 56;

const tierTop = (i: number) => TIER.first + i * (TIER.h + TIER.gap);

export const WHO_DECIDES = {
  ...groupOf("who-decides"),
  tiers: [
    [LEADERSHIP, LINES],
    [DCIO, AUTHORITY],
    [CISO, CONTROLS],
  ].map(([name, caption], i) => {
    const at = box(TIER.x, tierTop(i), TIER.w, TIER.h);
    const mid = at.y + at.h / 2;
    return {
      key: `who-decides.tier.${i}`,
      at,
      name: { key: `who-decides.tier.${i}.name`, text: name, at: { x: at.x + IN_TIER.x, y: mid + IN_TIER.name } as Point },
      caption: { key: `who-decides.tier.${i}.caption`, text: caption, at: { x: at.x + IN_TIER.x, y: mid + IN_TIER.caption } as Point },
    };
  }),
  mark: { key: "who-decides.mark", at: { x: TIER.x + TIER.w - MARK_IN, y: tierTop(1) + TIER.h / 2 } as Point },
  down: {
    key: "who-decides.down",
    from: { x: ARROW.left, y: ARROW.top } as Point,
    to: { x: ARROW.left, y: ARROW.foot } as Point,
    label: { key: "who-decides.down.label", text: DOWN, at: { x: ARROW.left - ARROW.label, y: MIDDLE } as Point },
  },
  up: {
    key: "who-decides.up",
    from: { x: ARROW.right, y: ARROW.foot } as Point,
    to: { x: ARROW.right, y: ARROW.top } as Point,
    label: { key: "who-decides.up.label", text: UP, at: { x: ARROW.right + ARROW.label, y: MIDDLE } as Point },
  },
  cards: QUESTIONS.map((text, i) => {
    const at = box(CARD.x, cardsTop + i * (CARD.h + CARD.gap), SAFE.right - CARD.x, CARD.h);
    return { key: `who-decides.card.${i}`, at, stripe: CARD.stripe, text, words: { x: at.x + CARD.stripe + CARD.words, y: at.y + at.h / 2 } as Point };
  }),
};

/** An arrowhead's reach past its line's end. */
const HEAD = 14;

/** Everything slide 25 draws under its story band, for the layout test. */
export const WHO_DECIDES_BOXES: Box[] = [
  ...WHO_DECIDES.tiers.flatMap((tier) => [tier.at, measuredBox(tier.name.at, tier.name.text, 32), measuredBox(tier.caption.at, tier.caption.text, 26)]),
  box(WHO_DECIDES.mark.at.x - 24, WHO_DECIDES.mark.at.y - 24, 48, 48),
  box(ARROW.left - HEAD, ARROW.top, 2 * HEAD, ARROW.foot - ARROW.top),
  box(ARROW.right - HEAD, ARROW.top, 2 * HEAD, ARROW.foot - ARROW.top),
  measuredBox(WHO_DECIDES.down.label.at, DOWN, 26, "end"),
  measuredBox(WHO_DECIDES.up.label.at, UP, 26),
  ...WHO_DECIDES.cards.flatMap((card) => [card.at, measuredBox(card.words, card.text, 32)]),
];

/** Each card's words fit inside it with room at its right. */
export const cardFits = (card: (typeof WHO_DECIDES.cards)[number]) => card.words.x + measuredBox(card.words, card.text, 32).w <= card.at.x + card.at.w - 20 && TEXT_LINE <= card.at.h;
