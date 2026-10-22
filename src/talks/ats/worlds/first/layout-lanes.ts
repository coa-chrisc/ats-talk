/**
 * Slide 21's places: two lanes drawn as light outlines, one above the
 * other, both named in a column at the drawing's left, each name level with
 * the middle of its lane. The upper lane holds four plain tiles, spread
 * across it, outlined in turn, each named inside on one or two lines. The
 * lower lane carries the project cards: each enters a little left of its
 * place, faded, and slides into it, so the lane fills from the left. An
 * arrow runs down from each tile into the lower lane, landing on its top
 * edge. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, contentTop, groupOf, labelBox, labelsOf, wordsWidth } from "./layout-plan";

const [NOW, FOUNDATIONS, ...PIECE_WORDS] = labelsOf("lanes");

/** 556: under the two-line title's two story rows. */
const TOP = contentTop("lanes");

/** The lane names are set at 32 px, on a 40 px line, in a column as wide as the longer name. */
export const NAME_TEXT = 32;
export const NAME_LINE = 40;
const NAME_COLUMN = Math.max(wordsWidth(NOW, NAME_TEXT), wordsWidth(FOUNDATIONS, NAME_TEXT));
/** The lanes start 36 px past the name column and run to the safe area's right edge. */
const LANE_X = SAFE.left + NAME_COLUMN + 36;
const LANE_W = SAFE.right - LANE_X;
/** Each lane is 150 tall; the gap between them, 96, is where the arrows run. */
const LANE_H = 150;
const UPPER = box(LANE_X, TOP + 4, LANE_W, LANE_H);
const LOWER = box(LANE_X, UPPER.y + LANE_H + 96, LANE_W, LANE_H);
/** The foot of the drawing: the lower lane's bottom edge, 20 px over the safe area's foot. */
export const LANES_FOOT = UPPER.y + LANE_H + 96 + LANE_H;

/**
 * The four tiles, 100 tall, their names at 32 px on a 38 px line. A name
 * wider than `TILE_LINE` breaks at its last space that keeps the first line
 * under it. Each tile is as wide as its longer line plus 20 px a side, the
 * four spread across the upper lane with equal gaps, 16 px from its ends.
 * Geist 600 measures 0.50 to 0.53 of the size a letter, so 0.55
 * (`TILE_FACTOR`) keeps each name inside its tile.
 */
export const TILE_FACTOR = 0.55;
export const TILE_TEXT = 32;
export const TILE_LEADING = 38;
const TILE_LINE = 330;
const TILE = { h: 100, pad: 20, inset: 16 } as const;
export const tileWords = (text: string) => Math.ceil(text.length * TILE_TEXT * TILE_FACTOR);
/** A tile's name as the lines it is set on. */
export const tileLines = (text: string): string[] => {
  if (tileWords(text) <= TILE_LINE / 1.2) return [text];
  const words = text.split(" ");
  for (let cut = words.length - 1; cut > 0; cut--) {
    const head = words.slice(0, cut).join(" ");
    if (tileWords(head) <= TILE_LINE) return [head, words.slice(cut).join(" ")];
  }
  return [text];
};
const tileWidths = PIECE_WORDS.map((text) => Math.max(...tileLines(text).map(tileWords)) + 2 * TILE.pad);
const tileGap = (LANE_W - 2 * TILE.inset - tileWidths.reduce((a, b) => a + b, 0)) / (PIECE_WORDS.length - 1);
const tileX = (i: number) => Math.round(UPPER.x + TILE.inset + tileWidths.slice(0, i).reduce((a, b) => a + b, 0) + i * tileGap);
const tileAt = (i: number) => box(tileX(i), UPPER.y + (LANE_H - TILE.h) / 2, tileWidths[i], TILE.h);

/**
 * The cards: eight places 168 apart from 44 px inside the lower lane's left
 * end, a card 56 by 72 in each, centred up and down, the last about 40 px
 * short of the lane's right end. A card enters 32 px left of its place, so
 * even the first starts inside the lane.
 */
export const BELT = { places: 8, pitch: 168, first: LOWER.x + 44, card: { w: 56, h: 72 } } as const;
/** How far left of its place a card starts, faded, before it slides in. */
export const ENTER = 32;
/** How many cards the lane carries in all, one to a place. */
export const CARDS = BELT.places;

const cardAt = box(BELT.first, LOWER.y + (LOWER.h - BELT.card.h) / 2, BELT.card.w, BELT.card.h);

export const LANES = {
  ...groupOf("lanes"),
  upper: { key: "lanes.upper", at: UPPER, name: { key: "lanes.upper.name", text: FOUNDATIONS, at: { x: SAFE.left, y: UPPER.y + LANE_H / 2 } as Point } },
  lower: { key: "lanes.lower", at: LOWER, name: { key: "lanes.lower.name", text: NOW, at: { x: SAFE.left, y: LOWER.y + LANE_H / 2 } as Point } },
  /** Each tile, outlined in turn and named in its middle; its arrow runs from its foot's middle to the lower lane's top edge. */
  pieces: PIECE_WORDS.map((text, i) => {
    const at = tileAt(i);
    const x = at.x + at.w / 2;
    return {
      key: `lanes.piece.${i}`,
      at,
      label: { key: `lanes.piece.${i}.label`, text, lines: tileLines(text), at: { x, y: at.y + at.h / 2 } as Point, first: { x, y: at.y + at.h / 2 - ((tileLines(text).length - 1) * TILE_LEADING) / 2 } as Point },
      arrow: { key: `lanes.arrow.${i}`, from: { x, y: at.y + at.h + 4 } as Point, to: { x, y: LOWER.y - 2 } as Point },
    };
  }),
  /** The cards, all drawn at the first place: a card at place `p` is `p * pitch` to the right. */
  cards: Array.from({ length: CARDS }, (_, i) => ({ key: `lanes.card.${i}`, at: cardAt })),
};

/** Where a card stands at place `p`. */
export const placeX = (p: number) => p * BELT.pitch;

/** Everything slide 21 draws under its story band, for the layout test: the cards at their first and last places and where the first enters. */
export const LANES_BOXES: Box[] = [
  labelBox(LANES.upper.name.at, FOUNDATIONS, "start", NAME_TEXT, NAME_LINE),
  UPPER,
  LOWER,
  ...LANES.pieces.map((piece) => piece.at),
  labelBox(LANES.lower.name.at, NOW, "start", NAME_TEXT, NAME_LINE),
  { ...cardAt, x: cardAt.x - ENTER },
  { ...cardAt, x: cardAt.x + placeX(BELT.places - 1) },
];
