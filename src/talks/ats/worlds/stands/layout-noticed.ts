/**
 * Slide 12a's places: a wall of five plaques hung as a gallery hangs them,
 * three over two, the fifth as wide as two and the gap between them. A
 * thin rail runs the wall's width over the top row, and each top plaque
 * hangs from a nail on it by a cord; each bottom plaque hangs by its own
 * cord from a nail in the wall above it. Each plaque holds its name and,
 * under it, its caption; the fifth holds four small nameplates in a row
 * instead. A grey tag sits apart under the wall, at its middle. Words are
 * read from the script, by position.
 *
 * The drawing has y 548 to 988: the rail at 568, the rows at 600 and 784,
 * the tag at 952.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { TAG, contentTop, layerOf, round, tagWidth, wordsWidth } from "./layout";

const [AWARD, TEXAS, GOVEX, HIGHLIGHTS, BLOOMBERG, WROTE, CDC, FEATURED, INVITED, ...REST] = shown("noticed", "play");
const HOSTS = REST.slice(0, 4);
const [ONLY] = REST.slice(4);

const TOP = contentTop("noticed");

/** The rail 20 px under the drawing's first line, across the whole wall. */
const RAIL_Y = TOP + 20;
/** Three columns of 536 with 60 between them fill the 1728 px wall; a plaque is 140 tall, and the rows 44 apart, room for the bottom row's nails and cords. */
const COL = { x: 96, w: 536, gap: 60 } as const;
const PLAQUE_H = 140;
const ROWS = [RAIL_Y + 32, RAIL_Y + 32 + PLAQUE_H + 44] as const;
const colX = (col: number) => COL.x + col * (COL.w + COL.gap);

/** Where each plaque hangs: the top row's three, then the bottom row's two, the fifth spanning the last two columns. */
const PLACES: Box[] = [
  box(colX(0), ROWS[0], COL.w, PLAQUE_H),
  box(colX(1), ROWS[0], COL.w, PLAQUE_H),
  box(colX(2), ROWS[0], COL.w, PLAQUE_H),
  box(colX(0), ROWS[1], COL.w, PLAQUE_H),
  box(colX(1), ROWS[1], 2 * COL.w + COL.gap, PLAQUE_H),
];

/** A plaque's name 56 px under its top, at the text size; its caption 40 under that, at the label size. */
export const PLAQUE = { name: 56, caption: 96, settle: -24, inset: 10 } as const;

/** The cord's two ends on the plaque, this far in from its sides; its nail on the rail for the top row, 24 px over the plaque's top for the bottom row. */
const CORD_IN = 120;
const NAIL_UP = 24;

/** The fifth plaque's nameplates: 38 px tall, the words' width and 16 a side, 16 apart, centred in a row 38 px under the plaque's name. */
export const HOST = { h: 38, pad: 16, gap: 16, size: 26 } as const;
const hostW = (text: string) => wordsWidth(text, HOST.size) + 2 * HOST.pad;

const words = [
  { text: AWARD, caption: TEXAS },
  { text: GOVEX, caption: HIGHLIGHTS },
  { text: BLOOMBERG, caption: WROTE },
  { text: CDC, caption: FEATURED },
  { text: INVITED, caption: undefined },
];

const plaques = PLACES.map((at, i) => {
  const cx = at.x + at.w / 2;
  const nail: Point = { x: cx, y: at.y === ROWS[0] ? RAIL_Y : at.y - NAIL_UP };
  return {
    key: `noticed.plaque.${i}`,
    at,
    name: { text: words[i].text, at: { x: cx, y: at.y + (i === 4 ? 44 : PLAQUE.name) } as Point },
    caption: words[i].caption ? { text: words[i].caption!, at: { x: cx, y: at.y + PLAQUE.caption } as Point } : undefined,
    /** The cord from the plaque's top, up to its nail and down again. */
    cord: { key: `noticed.cord.${i}`, nail, d: `M${at.x + CORD_IN} ${at.y}L${nail.x} ${nail.y}L${at.x + at.w - CORD_IN} ${at.y}` },
  };
});

const FIFTH = PLACES[4];
const hostsW = HOSTS.reduce((sum, text) => sum + hostW(text), 0) + (HOSTS.length - 1) * HOST.gap;
const HOSTS_Y = FIFTH.y + 78;
let hostX = round(FIFTH.x + FIFTH.w / 2 - hostsW / 2);
const hosts = HOSTS.map((text, i) => {
  const at = box(hostX, HOSTS_Y, hostW(text), HOST.h);
  hostX += at.w + HOST.gap;
  return { key: `noticed.host.${i}`, text, at };
});

/** The grey tag 28 px under the bottom row, centred on the wall. */
const ONLY_AT = box(round(960 - tagWidth(ONLY) / 2), ROWS[1] + PLAQUE_H + 28, tagWidth(ONLY), TAG.h);

export const NOTICED = {
  ...layerOf("noticed"),
  rail: { key: "noticed.rail", x0: COL.x, x1: colX(2) + COL.w, y: RAIL_Y },
  plaques,
  hosts,
  only: { key: "noticed.only", text: ONLY, at: ONLY_AT },
};
