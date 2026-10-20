/**
 * Slide 13's places: a wall of a dozen idea cards on the left, named once
 * inside its top, four of them tagged in grey with why an idea stalls, and
 * the open stage on the right, where a hand holds up the one card it has
 * lifted off the wall. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { CARD, LABEL_LINE, TAG, centreOf, contentTop, layerOf, tagWidth } from "./layout";

const [WALL_NAME, ...REASONS] = shown("good-ideas", "play");

/** The wall: four columns and three rows of cards, packed close, a margin round them, and over the cards a line for the wall's name and a gap under it. */
const GRID = { cols: 4, rows: 3, gap: 12, pad: 18, name: LABEL_LINE + 14 } as const;
/** The wall's top: where the slide's drawing starts, under its story band. */
const TOP = contentTop("good-ideas");
const WALL = box(96, TOP, 2 * GRID.pad + GRID.cols * CARD.w + (GRID.cols - 1) * GRID.gap, 2 * GRID.pad + GRID.name + GRID.rows * CARD.h + (GRID.rows - 1) * GRID.gap);
/** Each card is pinned a little off true, as cards on a wall are; the card the hand lifts hangs straight. */
const TILTS = [-1.5, 1, -0.5, 2, 1.5, -2, 0.5, 0, 1, -1.5, 2, -0.5] as const;
/** The card the hand lifts: the right end of the middle row, nearest the open stage. */
export const LIFTED = 7;
/** The order the cards arrive in: the lifted card first, then one wave after another, each bigger than the last, so the wall fills faster and faster. */
const WAVES = [[LIFTED], [0, 10], [2, 5, 9], [1, 3, 4, 6, 8, 11]] as const;
/** Which cards take a grey tag, in the order the tags come: one reason each, in the script's order. */
const TAGGED = [0, 2, 5, 10] as const;
/** How far a tag sits in from its card's left and bottom edges. */
const TAG_INSET = 12;
/** How far a card slides in from, along the wall. */
const SLIDE = -56;

const cardAt = (n: number): Box => {
  const col = n % GRID.cols;
  const row = Math.floor(n / GRID.cols);
  return box(WALL.x + GRID.pad + col * (CARD.w + GRID.gap), WALL.y + GRID.pad + GRID.name + row * (CARD.h + GRID.gap), CARD.w, CARD.h);
};

/** Where the lifted card is held: in the open stage right of the wall, far enough left that the hand holding it stays on the stage, a little higher than it hung, and nearer. */
const HELD = { at: { x: 1500, y: 744 } as Point, scale: 1.12 };
const lifted = cardAt(LIFTED);
const from = centreOf(lifted);
/** The hand takes the card by its right edge, at its middle: there before the lift, and there once the card is held. */
const GRIP: Point = { x: lifted.x + lifted.w, y: from.y };
const HELD_GRIP: Point = { x: HELD.at.x + (CARD.w / 2) * HELD.scale, y: HELD.at.y };
/** The hand comes in from this far to the right of its grip. */
const REACH = 300;

export const GOOD_IDEAS = {
  ...layerOf("good-ideas"),
  wall: { key: "good-ideas.wall", at: WALL },
  /** The wall's name, inside its top left, over the cards, as part of the picture. */
  name: { key: "good-ideas.wall.name", text: WALL_NAME, at: { x: WALL.x + GRID.pad + 4, y: WALL.y + GRID.pad + LABEL_LINE / 2 } },
  cards: Array.from({ length: GRID.cols * GRID.rows }, (_, n) => ({
    key: `good-ideas.card.${n}`,
    at: cardAt(n),
    tilt: TILTS[n],
    wave: WAVES.findIndex((wave) => (wave as readonly number[]).includes(n)),
    slide: SLIDE,
  })),
  waves: WAVES,
  /** Each tag sits inside its card's lower left, under the card's writing, the longest still inside the card's right edge. */
  tags: TAGGED.map((n, i) => {
    const card = cardAt(n);
    return { key: `good-ideas.tag.${i}`, card: n, text: REASONS[i], at: box(card.x + TAG_INSET, card.y + card.h - TAG.h - TAG_INSET, tagWidth(REASONS[i]), TAG.h) };
  }),
  /** The lifted card's move about its middle: across to where it is held, and up to its held size. */
  lift: { card: LIFTED, origin: from, x: HELD.at.x - from.x, y: HELD.at.y - from.y, scale: HELD.scale },
  /** The hand: drawn at its grip on the card where it hangs, coming in from the right, then carrying the card to where it is held. */
  hand: { key: "good-ideas.hand", grip: GRIP, reach: REACH, carry: { x: HELD_GRIP.x - GRIP.x, y: HELD_GRIP.y - GRIP.y } },
};

/** The held card's box on the stage, at its held size. */
export const heldBox = (): Box => {
  const w = CARD.w * HELD.scale;
  const h = CARD.h * HELD.scale;
  return box(HELD.at.x - w / 2, HELD.at.y - h / 2, w, h);
};
