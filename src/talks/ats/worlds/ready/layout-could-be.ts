/**
 * Slide 27's places: the six requests, and the gaps slide 11 named beside
 * them. At the right, the column's heading over the three dashed plates of
 * what is still to establish, at slide 11's size (department-map.ts), each
 * holding its name only. To their left, six cards in two rows of three, in
 * the script's order: each a miniature of the slide that brought its idea
 * in, at the card's top left; an empty dashed ring at its top right, the
 * orange mark's size; and the request's name and its caption under them.
 * Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter } from "../../script/find";
import { PLATE, plateColumn } from "../department-map";
import { FLOOR, SAFE, contentTop, groupOf, labelsOf } from "./layout";

const [TO_ESTABLISH, ...REST] = labelsOf("could-be");
const PLATE_NAMES = REST.slice(0, 3);
const REQUESTS = REST.slice(3);

const TOP = contentTop("could-be");

/* The plates */

/** The plates' heading 16 px under the drawing's first line; the plates 36 under it, at the drawing's right edge. */
const PLATES_AT: Point = { x: SAFE.right - PLATE.w, y: TOP + 36 };

/* The cards */

/** Six cards in two rows of three, 20 apart across and 12 down, from the drawing's left edge to 32 px short of the plates, the two rows filling the field's height. */
const CARDS = { x: SAFE.left, right: PLATES_AT.x - 32, gap: 20, rowGap: 12 } as const;
const CARD_W = Math.floor((CARDS.right - CARDS.x - 2 * CARDS.gap) / 3);
const CARD_H = Math.floor((FLOOR - TOP - CARDS.rowGap) / 2);
/** Inside a card: 16 px in from its edges, a 56 px band for the miniature at the left and the ring at the right, then the words, their rows 30 apart, the caption 4 under the name. */
export const CARD = { w: CARD_W, h: CARD_H, pad: 16, band: 56, words: 97, pitch: 30, gap: 4, ring: 24 } as const;
/** The miniature's room in the band. */
export const MINI = { w: 150, h: CARD.band } as const;

/** Where a name or caption that would run past the card's measure breaks, after the word the layout names. */
const BREAKS: string[][] = [
  ["consortium"],
  ["lead and"],
  [],
  ["available"],
  ["four"],
  ["approve"],
  [],
  ["infrastructure"],
  [],
  ["data"],
  [],
  ["budget,"],
];
const rowsOf = (i: number) => breakAfter(REQUESTS[i], ...BREAKS[i]);

/** The miniature each card holds, in the script's order: the round table, the table with its speech bubble, the four bands, the fence, the record with its key, the ledger's row. */
export const MINIATURES = ["table", "listening", "levels", "fence", "record", "ledger"] as const;
export type Miniature = (typeof MINIATURES)[number];

const cards = MINIATURES.map((kind, i) => {
  const at = box(CARDS.x + (i % 3) * (CARD_W + CARDS.gap), TOP + Math.floor(i / 3) * (CARD_H + CARDS.rowGap), CARD_W, CARD_H);
  const name = rowsOf(2 * i);
  const caption = rowsOf(2 * i + 1);
  const nameAt: Point = { x: at.x + CARD.pad, y: at.y + CARD.words };
  return {
    key: `could-be.card.${i}`,
    kind,
    at,
    mini: box(at.x + CARD.pad, at.y + CARD.pad, MINI.w, MINI.h),
    ring: { x: at.x + at.w - CARD.pad - CARD.ring, y: at.y + CARD.pad + CARD.ring } as Point,
    name: { text: REQUESTS[2 * i], rows: name, at: nameAt },
    caption: { text: REQUESTS[2 * i + 1], rows: caption, at: { x: nameAt.x, y: nameAt.y + name.length * CARD.pitch + CARD.gap } as Point },
  };
});

export const COULD_BE = {
  ...groupOf("could-be"),
  gaps: { key: "could-be.gaps", text: TO_ESTABLISH, at: { x: PLATES_AT.x, y: TOP + 16 } as Point },
  plates: plateColumn(PLATES_AT).map((at, i) => ({ key: `could-be.plate.${i}`, at, name: PLATE_NAMES[i] })),
  cards,
  rings: { key: "could-be.rings", at: cards.map((card) => card.ring) },
};

/** What the slide draws, for the layout test. */
export const COULD_BE_BOXES: Box[] = [...COULD_BE.plates.map((plate) => plate.at), ...cards.map((card) => card.at)];
