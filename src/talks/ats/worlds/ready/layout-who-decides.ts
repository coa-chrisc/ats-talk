/**
 * Slide 17's places, in two zones. On the left, a short stack of three tiers
 * in the middle of the zone, top to bottom, each its name over its caption;
 * the middle tier takes the orange mark at its right end. A long arrow runs
 * down the stack's left side, its label to its left, and another up its
 * right side, its label to its right. On the right, the second zone: three
 * question cards, each with a stripe down its left edge, that land one under
 * another. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, TEXT_LINE, contentTop, groupOf, labelsOf, wordsBox, wordsWidth } from "./layout";

const [LEADERSHIP, LINES, DCIO, AUTHORITY, CISO, CONTROLS, DOWN, UP, ...QUESTIONS] = labelsOf("who-decides");

const TOP = contentTop("who-decides");
/** The tiers: 460 wide, 120 tall, 16 apart, from x 470 so the down arrow's label (about 300 px) ends inside the field at its left; the first 12 under the drawing's top. */
const TIER = { x: 470, w: 460, h: 120, gap: 16, first: TOP + 12 } as const;
/** The name 34 over a tier's middle and the caption 26 under it; both from the tier's left plus 36. */
const IN_TIER = { name: -20, caption: 26, x: 36 } as const;
const stackFoot = TIER.first + 3 * TIER.h + 2 * TIER.gap;
/** The arrows: 32 px either side of the stack, running its whole height. */
const ARROW = { left: TIER.x - 32, right: TIER.x + TIER.w + 32, top: TIER.first, foot: stackFoot } as const;
const MIDDLE = (ARROW.top + ARROW.foot) / 2;
/** The question cards: from x 1300, 66 clear of the up arrow's label, to the field's right edge, 96 tall and 28 apart, centred on the stack's middle so they do not line up with its tiers. */
const CARD = { x: 1300, h: 96, gap: 28, stripe: 8 } as const;
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
    label: { key: "who-decides.down.label", text: DOWN, at: { x: ARROW.left - 24, y: MIDDLE } as Point },
  },
  up: {
    key: "who-decides.up",
    from: { x: ARROW.right, y: ARROW.foot } as Point,
    to: { x: ARROW.right, y: ARROW.top } as Point,
    label: { key: "who-decides.up.label", text: UP, at: { x: ARROW.right + 24, y: MIDDLE } as Point },
  },
  cards: QUESTIONS.map((text, i) => {
    const at = box(CARD.x, cardsTop + i * (CARD.h + CARD.gap), SAFE.right - CARD.x, CARD.h);
    return { key: `who-decides.card.${i}`, at, stripe: CARD.stripe, text, words: { x: at.x + CARD.stripe + 28, y: at.y + at.h / 2 } as Point };
  }),
};

/** An arrowhead's reach past its line's end. */
const HEAD = 14;

/** Everything slide 17 draws under its story band, for the layout test. */
export const WHO_DECIDES_BOXES: Box[] = [
  ...WHO_DECIDES.tiers.flatMap((tier) => [tier.at, wordsBox(tier.name.at, tier.name.text, 32, "start"), wordsBox(tier.caption.at, tier.caption.text, 26, "start")]),
  box(WHO_DECIDES.mark.at.x - 24, WHO_DECIDES.mark.at.y - 24, 48, 48),
  box(ARROW.left - HEAD, ARROW.top, 2 * HEAD, ARROW.foot - ARROW.top),
  box(ARROW.right - HEAD, ARROW.top, 2 * HEAD, ARROW.foot - ARROW.top),
  wordsBox(WHO_DECIDES.down.label.at, DOWN, 26, "end"),
  wordsBox(WHO_DECIDES.up.label.at, UP, 26, "start"),
  ...WHO_DECIDES.cards.flatMap((card) => [card.at, wordsBox(card.words, card.text, 32, "start")]),
];

/** Each card's words fit inside it with room at its right. */
export const cardFits = (card: (typeof WHO_DECIDES.cards)[number]) => card.words.x + wordsWidth(card.text, 32) <= card.at.x + card.at.w - 20 && TEXT_LINE <= card.at.h;
