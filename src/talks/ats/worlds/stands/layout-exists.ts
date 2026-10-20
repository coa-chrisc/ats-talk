/**
 * Slide 12's places: an outline map of the City's departments as a grid of
 * plain boxes, 7 by 3, named once inside the ring at its top left; a lantern
 * in six named boxes spread across the grid and in three unnamed ones; the
 * six names, each with its caption under it, in two columns of three to the
 * right of the ring, each joined to its box by a leader; a ring of nine dots
 * round the grid, named under it; a tag under that; and a grey tag apart at
 * the stage's lower right. Words are read from the script, by position.
 *
 * The leaders. The first column's three boxes stand in the grid's right
 * column, one in each row, so each leader runs straight out of its box to
 * its name. The second column's boxes stand further in; each leader leaves
 * its box's top into the gap over its row, runs right along that gap and
 * out of the ring, turns once in the space between the ring and the names,
 * and crosses the first column in the gap above one of its names. So the
 * second column sits 33 px higher than the first, each of its names level
 * with one of those gaps.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TAG, TEXT_LINE, contentTop, layerOf, round, tagWidth, wordsWidth } from "./layout";

const [DEPARTMENTS, ...REST] = shown("exists", "play");
const NAMED = [0, 1, 2, 3, 4, 5].map((i) => ({ text: REST[2 * i], caption: REST[2 * i + 1] }));
const [GROUP, GROUP_CAPTION, STAFF, NOT_AT_TABLE] = REST.slice(12);

/** The ring's top keeps 12 px under the drawing's first line; the grid sits 64 px inside the ring's top, room for the grid's name between them. */
const RING_TOP = contentTop("exists") + 12;
export const GRID = { x: 132, y: RING_TOP + 64, cols: 7, rows: 3, box: { w: 94, h: 60 }, gap: 12, rx: 8 } as const;
const PITCH = { x: GRID.box.w + GRID.gap, y: GRID.box.h + GRID.gap } as const;
/** The grid's outline: every box inside it, 730 px wide. */
export const GRID_BOX = box(GRID.x, GRID.y, GRID.cols * GRID.box.w + (GRID.cols - 1) * GRID.gap, GRID.rows * GRID.box.h + (GRID.rows - 1) * GRID.gap);

export const cellAt = (col: number, row: number): Box => box(GRID.x + col * PITCH.x, GRID.y + row * PITCH.y, GRID.box.w, GRID.box.h);
export const cellCentre = (col: number, row: number): Point => ({ x: GRID.x + col * PITCH.x + GRID.box.w / 2, y: GRID.y + row * PITCH.y + GRID.box.h / 2 });

/** The lit boxes: the first column's names in the grid's right column, the second column's spread through the rest, and three unnamed ones among them. */
export const LIT = {
  named: [
    [6, 0],
    [6, 1],
    [6, 2],
    [1, 0],
    [3, 1],
    [4, 2],
  ],
  unnamed: [
    [0, 1],
    [2, 2],
    [5, 0],
  ],
} as const;

/** A lantern's size at full scale (the named ones); an unnamed one is drawn at 0.72 of it. */
export const LANTERN = { w: 30, h: 44, small: 0.72 } as const;

/** The ring: the grid's outline grown by 36 at the sides and foot and by 64 at the top, its corners rounded; nine dots evenly round it. */
const RING = box(GRID_BOX.x - 36, RING_TOP, GRID_BOX.w + 72, GRID_BOX.h + 64 + 36);
const RING_R = 40;
export const DOT_R = 10;
/** Where round the ring the first dot sits, as a share of a ninth: set so no dot sits where a leader crosses the ring. */
const DOT_PHASE = 0.05;

/** A point a fraction of the way round a rounded rectangle, clockwise from the top's middle. */
function roundRectAt(b: Box, r: number, t: number): Point {
  const straightW = b.w - 2 * r;
  const straightH = b.h - 2 * r;
  const arc = (Math.PI * r) / 2;
  const total = 2 * straightW + 2 * straightH + 4 * arc;
  let d = (((t % 1) + 1) % 1) * total;
  const corner = (cx: number, cy: number, a: number): Point => ({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  const segments: [number, (s: number) => Point][] = [
    [straightW / 2, (s) => ({ x: b.x + b.w / 2 + s, y: b.y })],
    [arc, (s) => corner(b.x + b.w - r, b.y + r, -Math.PI / 2 + s / r)],
    [straightH, (s) => ({ x: b.x + b.w, y: b.y + r + s })],
    [arc, (s) => corner(b.x + b.w - r, b.y + b.h - r, s / r)],
    [straightW, (s) => ({ x: b.x + b.w - r - s, y: b.y + b.h })],
    [arc, (s) => corner(b.x + r, b.y + b.h - r, Math.PI / 2 + s / r)],
    [straightH, (s) => ({ x: b.x, y: b.y + b.h - r - s })],
    [arc, (s) => corner(b.x + r, b.y + r, Math.PI + s / r)],
    [straightW / 2, (s) => ({ x: b.x + r + s, y: b.y })],
  ];
  for (const [length, at] of segments) {
    if (d <= length) {
      const p = at(d);
      return { x: round(p.x), y: round(p.y) };
    }
    d -= length;
  }
  return { x: b.x + b.w / 2, y: b.y };
}

/* The names, in two columns right of the ring */

/** The columns: the first 62 px right of the ring, the second 434 px on, to the drawing's right edge; a caption breaks to fit its column, at most two rows. */
export const NAMES = { a: RING.x + RING.w + 62, b: RING.x + RING.w + 62 + 434, w: 414 } as const;
/** A name's caption rows start 38 px under it, 30 apart; a name with two caption rows takes 106 px from the name's top. */
export const CAPTION = { drop: 38, pitch: 30 } as const;
/** The first column's names 128 apart; the second's 33 above each of them, level with the gap over each first-column name. */
const ROW_A = [606, 734, 862] as const;
const ROW_B = ROW_A.map((y) => y - 33);

/** A caption broken to fit its column at the label size, at the word that would run past it. */
const fit = (text: string, width: number): string[] => {
  const rows: string[] = [];
  for (const word of text.split(" ")) {
    const last = rows.at(-1);
    if (last !== undefined && wordsWidth(`${last} ${word}`, 26) <= width) rows[rows.length - 1] = `${last} ${word}`;
    else rows.push(word);
  }
  return rows;
};

/** The space between the ring and the first column, where the second column's leaders turn: one lane each. */
const LANES = [RING.x + RING.w + 12, RING.x + RING.w + 20, RING.x + RING.w + 28] as const;

const named = LIT.named.map(([col, row], i) => {
  const at = cellAt(col, row);
  const second = i >= 3;
  const nameAt: Point = { x: second ? NAMES.b : NAMES.a, y: second ? ROW_B[i - 3] : ROW_A[i] };
  /** The first column's: straight from the box's right edge to just short of the name. The second's: up from the box's top into the gap over its row, along it, out to its lane, to its name's height and across. */
  const gapY = at.y - GRID.gap / 2;
  const lane = LANES[(i + 3) % 3];
  const points: Point[] = second
    ? [
        { x: at.x + at.w - 12, y: at.y - 1 },
        { x: at.x + at.w - 12, y: gapY },
        { x: lane, y: gapY },
        { x: lane, y: nameAt.y },
        { x: nameAt.x - 14, y: nameAt.y },
      ]
    : [
        { x: at.x + at.w + 6, y: at.y + at.h / 2 },
        { x: nameAt.x - 14, y: nameAt.y },
      ];
  return {
    key: `exists.lantern.${col}.${row}`,
    col,
    row,
    at,
    centre: cellCentre(col, row),
    name: { key: `exists.named.${i}`, text: NAMED[i].text, at: nameAt },
    caption: { key: `exists.named.${i}.caption`, text: NAMED[i].caption, rows: fit(NAMED[i].caption, NAMES.w), at: { x: nameAt.x, y: nameAt.y + CAPTION.drop } as Point },
    leader: { key: `exists.named.${i}.leader`, points, d: points.map((p, k) => `${k ? "L" : "M"}${p.x} ${p.y}`).join("") },
  };
});

/** The ring's name under it at its left, its caption beside the name on the same row. */
const GROUP_AT: Point = { x: RING.x + 16, y: RING.y + RING.h + 28 };
const GROUP_CAPTION_AT: Point = { x: GROUP_AT.x + wordsWidth(GROUP, 32) + 16, y: GROUP_AT.y };

/** The tag under the ring's name, centred on the grid; the grey tag apart at the lower right, ending at the drawing's right edge. */
const STAFF_AT = box(round(GRID_BOX.x + GRID_BOX.w / 2 - tagWidth(STAFF) / 2), GROUP_AT.y + TEXT_LINE / 2 + 10, tagWidth(STAFF), TAG.h);
const APART_AT = box(SAFE.right - 16 - tagWidth(NOT_AT_TABLE), STAFF_AT.y + 20, tagWidth(NOT_AT_TABLE), TAG.h);

export const EXISTS = {
  ...layerOf("exists"),
  grid: { key: "exists.grid", at: GRID_BOX },
  name: { key: "exists.name", text: DEPARTMENTS, at: { x: GRID.x, y: GRID.y - 30 } as Point },
  boxes: Array.from({ length: GRID.cols * GRID.rows }, (_, n) => {
    const col = n % GRID.cols;
    const row = Math.floor(n / GRID.cols);
    return { key: `exists.box.${n}`, col, row, at: cellAt(col, row) };
  }),
  named,
  unnamed: LIT.unnamed.map(([col, row]) => ({ key: `exists.lantern.${col}.${row}`, col, row, at: cellAt(col, row), centre: cellCentre(col, row) })),
  ring: {
    key: "exists.ring",
    at: RING,
    r: RING_R,
    dots: Array.from({ length: 9 }, (_, i) => ({ key: `exists.dot.${i}`, at: roundRectAt(RING, RING_R, (i + DOT_PHASE) / 9) })),
    name: { key: "exists.ring.name", text: GROUP, at: GROUP_AT },
    caption: { key: "exists.ring.caption", text: GROUP_CAPTION, at: GROUP_CAPTION_AT },
  },
  staff: { key: "exists.staff", text: STAFF, at: STAFF_AT },
  apart: { key: "exists.apart", text: NOT_AT_TABLE, at: APART_AT },
};

/** The rows a name and its caption take, for the layout test. */
export const namedRows = (lit: (typeof named)[number]) => [
  { y: lit.name.at.y, line: TEXT_LINE, width: wordsWidth(lit.name.text, 32) },
  ...lit.caption.rows.map((row, k) => ({ y: lit.caption.at.y + k * CAPTION.pitch, line: LABEL_LINE, width: wordsWidth(row, 26) })),
];
