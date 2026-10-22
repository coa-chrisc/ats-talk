/**
 * Slide 27's places: the six requests, and the gaps slide 11 named beside
 * them. At the right, the column's heading over the three dashed plates of
 * what is still to establish, slide 11's plates at their height and gaps
 * (department-map.ts) but narrower, so the requests have the room; each
 * holds its name only. To their left, six cards in two rows of three, in
 * the script's order: each a miniature of the slide that brought its idea
 * in, at the card's top left and most of its height; beside the miniature
 * the request's name, an empty dashed ring before its first row, the size
 * of a row; and the caption across the card under them. Words are read from
 * the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter } from "../../script/find";
import { PLATE } from "../department-map";
import { FLOOR, SAFE, contentTop, groupOf, labelsOf } from "./layout";

const [TO_ESTABLISH, ...REST] = labelsOf("could-be");
const PLATE_NAMES = REST.slice(0, 3);
const REQUESTS = REST.slice(3);

const TOP = contentTop("could-be");

/* The plates */

/** The plates 368 wide (about 260 px at 1366), room for the longest name at 26 px medium (about 315 px) inside the insets; slide 11's height and gap. */
export const PLATE_W = 368;
/** The plates' heading 16 px under the drawing's first line; the plates 36 under it, at the drawing's right edge. */
const PLATES_AT: Point = { x: SAFE.right - PLATE_W, y: TOP + 36 };
const plates = [0, 1, 2].map((i) => box(PLATES_AT.x, PLATES_AT.y + i * (PLATE.h + PLATE.gap), PLATE_W, PLATE.h));

/* The cards */

/** Six cards in two rows of three, 16 apart across and 12 down, from the drawing's left edge to 28 px short of the plates, the two rows filling the field's height. */
const CARDS = { x: SAFE.left, right: PLATES_AT.x - 28, gap: 16, rowGap: 12 } as const;
const CARD_W = Math.floor((CARDS.right - CARDS.x - 2 * CARDS.gap) / 3);
const CARD_H = Math.floor((FLOOR - TOP - CARDS.rowGap) / 2);
/**
 * Inside a card: 12 px in from its edges; the miniature in the top left;
 * 12 px after it the ring, 13 px across the radius, and 10 px after the ring
 * the name, its rows 30 apart and centred on the miniature's middle; the
 * caption's rows 30 apart across the card, its first 12 px under the
 * miniature (a row's half height, 16, under that).
 */
export const CARD = { w: CARD_W, h: CARD_H, pad: 12, gap: 12, pitch: 30, ring: 13, ringGap: 10, under: 12 } as const;
/** The miniature's room: 76 by 120 (about 54 by 85 px at 1366), so each drawing is big enough to know from its slide. */
export const MINI = { w: 76, h: 120 } as const;

/** Where a name or caption breaks, after the word the layout names, so no row runs past its measure and none ends on a little word; the first name takes three rows. */
const BREAKS: string[][] = [
  ["Authorize", "consortium"],
  ["a lead"],
  ["Sponsor"],
  ["available"],
  ["four"],
  ["approve"],
  ["Continue"],
  ["support"],
  ["Approve"],
  ["data"],
  [],
  ["budget,"],
];
const rowsOf = (i: number) => breakAfter(REQUESTS[i], ...BREAKS[i]);

/** The miniature each card holds, in the script's order: the round table, the table with its speech bubble, the four bands, the fence, the record with its key, the ledger page with its empty row. */
export const MINIATURES = ["table", "listening", "levels", "fence", "record", "ledger"] as const;
export type Miniature = (typeof MINIATURES)[number];

const cards = MINIATURES.map((kind, i) => {
  const at = box(CARDS.x + (i % 3) * (CARD_W + CARDS.gap), TOP + Math.floor(i / 3) * (CARD_H + CARDS.rowGap), CARD_W, CARD_H);
  const mini = box(at.x + CARD.pad, at.y + CARD.pad, MINI.w, MINI.h);
  const name = rowsOf(2 * i);
  const caption = rowsOf(2 * i + 1);
  const ringX = mini.x + mini.w + CARD.gap + CARD.ring;
  const nameAt: Point = { x: ringX + CARD.ring + CARD.ringGap, y: mini.y + mini.h / 2 - ((name.length - 1) * CARD.pitch) / 2 };
  return {
    key: `could-be.card.${i}`,
    kind,
    at,
    mini,
    ring: { x: ringX, y: nameAt.y } as Point,
    name: { text: REQUESTS[2 * i], rows: name, at: nameAt },
    caption: { text: REQUESTS[2 * i + 1], rows: caption, at: { x: at.x + CARD.pad, y: mini.y + mini.h + CARD.under + 16 } as Point },
  };
});

export const COULD_BE = {
  ...groupOf("could-be"),
  gaps: { key: "could-be.gaps", text: TO_ESTABLISH, at: { x: PLATES_AT.x, y: TOP + 16 } as Point },
  plates: plates.map((at, i) => ({ key: `could-be.plate.${i}`, at, name: PLATE_NAMES[i] })),
  cards,
  rings: { key: "could-be.rings", at: cards.map((card) => card.ring) },
};

/** What the slide draws, for the layout test. */
export const COULD_BE_BOXES: Box[] = [...COULD_BE.plates.map((plate) => plate.at), ...cards.map((card) => card.at)];
