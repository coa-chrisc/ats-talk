/**
 * Slide 12's places: an outline map of the City's departments as a grid of
 * plain boxes, 7 by 3, named once inside the ring at its top left, the ring
 * at the middle of the stage; a lantern in six named boxes, the grid's left
 * column and its right column, one in each row, and in three unnamed boxes
 * among the rest; the six names, each with its caption under it, in a
 * column each side of the ring, the left column set flush right toward the
 * ring and the right flush left from it, so every leader is one short
 * straight line from its box out through the ring to its own name, and no
 * two leaders meet. A ring of nine dots round the grid, named under it at
 * its left; the tag under that; and a grey tag apart at the stage's lower
 * right. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { GRID as MAP_GRID, LANTERN, LIT, RING_PAD } from "../department-map";
import { DRAW_FOOT, LABEL_LINE, SAFE, TAG, TEXT_LINE, contentTop, layerOf, round, tagWidth, wordsWidth } from "./layout";

const [DEPARTMENTS, ...REST] = shown("exists", "play");
const NAMED = [0, 1, 2, 3, 4, 5].map((i) => ({ text: REST[2 * i], caption: REST[2 * i + 1] }));
const [GROUP, GROUP_CAPTION, STAFF, NOT_AT_TABLE] = REST.slice(12);

/** The ring's top keeps 12 px under the drawing's first line; the grid sits 64 px inside the ring's top, room for the grid's name between them. */
const RING_TOP = contentTop("exists") + 12;
/** A column of names each side of the ring, 420 wide, 43 px from it: 2 * (420 + 43) + the ring's 802 fill the drawing's 1728. */
export const NAMES = { w: 420, gap: 43 } as const;
/** The grid 36 px inside the ring's left; its boxes 94 by 54, 12 apart across and 10 down, so the ring's foot leaves room for its name and both tags over the drawing's foot. */
export const GRID = { x: 96 + NAMES.w + NAMES.gap + RING_PAD.side, y: RING_TOP + RING_PAD.top, ...MAP_GRID } as const;
const PITCH = { x: GRID.box.w + GRID.gap, y: GRID.box.h + GRID.rowGap } as const;
/** The grid's outline: every box inside it, 730 px wide. */
export const GRID_BOX = box(GRID.x, GRID.y, GRID.cols * GRID.box.w + (GRID.cols - 1) * GRID.gap, GRID.rows * GRID.box.h + (GRID.rows - 1) * GRID.rowGap);

export const cellAt = (col: number, row: number): Box => box(GRID.x + col * PITCH.x, GRID.y + row * PITCH.y, GRID.box.w, GRID.box.h);
export const cellCentre = (col: number, row: number): Point => ({ x: GRID.x + col * PITCH.x + GRID.box.w / 2, y: GRID.y + row * PITCH.y + GRID.box.h / 2 });

/** The lit boxes and the lanterns' size are the department map's (department-map.ts): six named in the grid's outer columns, three unnamed among the rest. */
export { LANTERN, LIT };

/** The ring: the grid's outline grown by 36 at the sides and foot and by 64 at the top, its corners rounded; nine dots evenly round it. */
const RING = box(GRID_BOX.x - RING_PAD.side, RING_TOP, GRID_BOX.w + 2 * RING_PAD.side, GRID_BOX.h + RING_PAD.top + RING_PAD.foot);
const RING_R = 40;
export const DOT_R = 10;
/** Where round the ring the first dot sits, as a share of a ninth: set so no dot sits where a leader crosses the ring. */
const DOT_PHASE = 0.5;

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

/* The names, a column each side of the ring */

/** The left column ends 43 px short of the ring (its words set flush right there); the right starts 43 px past it. */
export const COLUMN = { left: RING.x - NAMES.gap, right: RING.x + RING.w + NAMES.gap } as const;
/** A name's caption rows start 38 px under it, 30 apart; a name with two caption rows takes 106 px from the name's top. */
export const CAPTION = { drop: 38, pitch: 30 } as const;
/** The names 122 apart, from 42 px under the drawing's first line, so each block of name and caption keeps 16 px from the next. */
const ROWS = [590, 712, 834] as const;

/**
 * A caption on one row if it fits its column at the label size, otherwise
 * on two, broken at the word that makes the two rows most nearly equal, so
 * no word is left alone on a row.
 */
const fit = (text: string, width: number): string[] => {
  if (wordsWidth(text, 26) <= width) return [text];
  const words = text.split(" ");
  const splits = words.slice(1).map((_, k) => [words.slice(0, k + 1).join(" "), words.slice(k + 1).join(" ")]);
  const longest = (rows: string[]) => Math.max(...rows.map((row) => wordsWidth(row, 26)));
  return splits.reduce((best, rows) => (longest(rows) < longest(best) ? rows : best));
};

/** A leader leaves its box's outer edge 6 px out at the box's middle and stops 14 px short of its name. */
const LEADER = { off: 6, short: 14 } as const;

const named = LIT.named.map(([col, row], i) => {
  const at = cellAt(col, row);
  const left = i < 3;
  const nameAt: Point = { x: left ? COLUMN.left : COLUMN.right, y: ROWS[i % 3] };
  const points: Point[] = left
    ? [
        { x: at.x - LEADER.off, y: at.y + at.h / 2 },
        { x: nameAt.x + LEADER.short, y: nameAt.y },
      ]
    : [
        { x: at.x + at.w + LEADER.off, y: at.y + at.h / 2 },
        { x: nameAt.x - LEADER.short, y: nameAt.y },
      ];
  return {
    key: `exists.lantern.${col}.${row}`,
    col,
    row,
    at,
    centre: cellCentre(col, row),
    anchor: (left ? "end" : "start") as "end" | "start",
    name: { key: `exists.named.${i}`, text: NAMED[i].text, at: nameAt },
    caption: { key: `exists.named.${i}.caption`, text: NAMED[i].caption, rows: fit(NAMED[i].caption, NAMES.w), at: { x: nameAt.x, y: nameAt.y + CAPTION.drop } as Point },
    leader: { key: `exists.named.${i}.leader`, points, d: points.map((p, k) => `${k ? "L" : "M"}${p.x} ${p.y}`).join("") },
  };
});

/** The ring's name under it at its left, its caption beside the name on the same row. */
const GROUP_AT: Point = { x: RING.x + 16, y: RING.y + RING.h + 28 };
const GROUP_CAPTION_AT: Point = { x: GROUP_AT.x + wordsWidth(GROUP, 32) + 16, y: GROUP_AT.y };

/** The tag under the ring's name, in line with it; the grey tag apart at the lower right, ending at the drawing's right edge, its foot on the drawing's lowest line, under the right column. */
const STAFF_AT = box(GROUP_AT.x, GROUP_AT.y + TEXT_LINE / 2 + 2, tagWidth(STAFF), TAG.h);
const APART_AT = box(SAFE.right - 16 - tagWidth(NOT_AT_TABLE), DRAW_FOOT - TAG.h, tagWidth(NOT_AT_TABLE), TAG.h);

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

/** The rows a name and its caption take, for the layout test, each with its left edge (a left-column row is set flush right). */
export const namedRows = (lit: (typeof named)[number]) =>
  [
    { y: lit.name.at.y, line: TEXT_LINE, width: wordsWidth(lit.name.text, 32) },
    ...lit.caption.rows.map((row, k) => ({ y: lit.caption.at.y + k * CAPTION.pitch, line: LABEL_LINE, width: wordsWidth(row, 26) })),
  ].map((row) => ({ ...row, x: lit.anchor === "end" ? lit.name.at.x - row.width : lit.name.at.x }));
