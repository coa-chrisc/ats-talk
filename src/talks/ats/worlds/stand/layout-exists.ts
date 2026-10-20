/**
 * Slide 4's places: an outline map of the City's departments as a grid of
 * plain boxes, named once inside the ring at its top left; a lantern in
 * seven of the boxes, two of them named to the right of the ring with
 * leader lines to their boxes; a ring of nine dots round the grid, named
 * at the ring's right; a tag under the grid; and a grey tag apart at the
 * stage's lower right. Words are read from the script, by position.
 *
 * THE GRID IS SHARED. The method world's slide 10 draws this grid again, as
 * its own copy of these numbers (a world never imports another world's
 * layout). To copy it, take GRID and LIT exactly:
 *
 *   GRID = { x: 176, y: 624, cols: 7, rows: 3, box: { w: 104, h: 68 }, gap: 14, rx: 8 }
 *   box (col, row) at x = 176 + col * 118, y = 624 + row * 82, 104 by 68
 *   grid outline: x 176 to 988, y 624 to 856 (812 by 232)
 *   lit boxes, as [col, row]: named [6, 0] and [6, 1]; unnamed [1, 0],
 *   [3, 0], [4, 1], [0, 2], [2, 2]. A lantern sits at its box's middle.
 *
 * Each box's centre is `cellCentre(col, row)`. The grid's y is set for a
 * two-line title with two story lines (content top 548); a slide that
 * draws it under another band can move it as one by its offset.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TAG, TEXT_LINE, contentTop, layerOf, round, tagWidth } from "./layout";

const [DEPARTMENTS, APH, APH_CAPTION, ENERGY, ENERGY_CAPTION, GROUP, GROUP_CAPTION, STAFF, NOT_AT_TABLE] = shown("exists", "play");

/** The ring's top keeps 12 px under the drawing's first line; the grid sits 64 px inside the ring's top, room for the grid's name between them. */
const RING_TOP = contentTop("exists") + 12;
export const GRID = { x: 176, y: RING_TOP + 64, cols: 7, rows: 3, box: { w: 104, h: 68 }, gap: 14, rx: 8 } as const;
const PITCH = { x: GRID.box.w + GRID.gap, y: GRID.box.h + GRID.gap } as const;
/** The grid's outline: every box inside it. */
export const GRID_BOX = box(GRID.x, GRID.y, GRID.cols * GRID.box.w + (GRID.cols - 1) * GRID.gap, GRID.rows * GRID.box.h + (GRID.rows - 1) * GRID.gap);

export const cellAt = (col: number, row: number): Box => box(GRID.x + col * PITCH.x, GRID.y + row * PITCH.y, GRID.box.w, GRID.box.h);
export const cellCentre = (col: number, row: number): Point => ({ x: GRID.x + col * PITCH.x + GRID.box.w / 2, y: GRID.y + row * PITCH.y + GRID.box.h / 2 });

/** The lit boxes: the two named in the right column, so their leaders run straight out of the grid to their names; the five unnamed ones scattered through the rest. */
export const LIT = {
  named: [
    [6, 0],
    [6, 1],
  ],
  unnamed: [
    [1, 0],
    [3, 0],
    [4, 1],
    [0, 2],
    [2, 2],
  ],
} as const;

/** A lantern's size at full scale (the named ones); an unnamed one is drawn at 0.72 of it. */
export const LANTERN = { w: 30, h: 44, small: 0.72 } as const;

/** The ring: the grid's outline grown by 36 at the sides and foot and by 64 at the top, its corners rounded; nine dots evenly round it, the first half a step past the top's middle, so none sits where a leader crosses the ring. */
const RING = box(GRID_BOX.x - 36, RING_TOP, GRID_BOX.w + 72, GRID_BOX.h + 64 + 36);
const RING_R = 40;
export const DOT_R = 10;

/** A point a fraction of the way round a rounded rectangle, clockwise from the top's middle. */
function roundRectAt(b: Box, r: number, t: number): Point {
  const straightW = b.w - 2 * r;
  const straightH = b.h - 2 * r;
  const arc = (Math.PI * r) / 2;
  const total = 2 * straightW + 2 * straightH + 4 * arc;
  let d = (((t % 1) + 1) % 1) * total;
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
  function corner(cx: number, cy: number, a: number): Point {
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }
  for (const [length, at] of segments) {
    if (d <= length) {
      const p = at(d);
      return { x: round(p.x), y: round(p.y) };
    }
    d -= length;
  }
  return { x: b.x + b.w / 2, y: b.y };
}

/** The names column right of the ring, and its rows: each name at the text size with its caption under it. */
const NAMES_X = RING.x + RING.w + 56;
const NAME_ROWS = [GRID.y + 4, GRID.y + 4 + PITCH.y + 18] as const;
const CAPTION_DROP = TEXT_LINE / 2 + LABEL_LINE / 2 - 4;
/** The ring's name at its right, level with the ring's lower part. */
const GROUP_Y = RING.y + RING.h - 44;

/** The tag under the ring, centred on the grid; the grey tag apart at the lower right, ending at the drawing's right edge. */
const STAFF_AT = box(round(GRID_BOX.x + GRID_BOX.w / 2 - tagWidth(STAFF) / 2), RING.y + RING.h + 28, tagWidth(STAFF), TAG.h);
const APART_AT = box(SAFE.right - 16 - tagWidth(NOT_AT_TABLE), STAFF_AT.y, tagWidth(NOT_AT_TABLE), TAG.h);

const named = [
  { text: APH, caption: APH_CAPTION },
  { text: ENERGY, caption: ENERGY_CAPTION },
];

export const EXISTS = {
  ...layerOf("exists"),
  grid: { key: "exists.grid", at: GRID_BOX },
  name: { key: "exists.name", text: DEPARTMENTS, at: { x: GRID.x, y: GRID.y - 30 } as Point },
  boxes: Array.from({ length: GRID.cols * GRID.rows }, (_, n) => {
    const col = n % GRID.cols;
    const row = Math.floor(n / GRID.cols);
    return { key: `exists.box.${n}`, col, row, at: cellAt(col, row) };
  }),
  named: LIT.named.map(([col, row], i) => {
    const at = cellAt(col, row);
    const nameY = NAME_ROWS[i];
    return {
      key: `exists.lantern.${col}.${row}`,
      col,
      row,
      at,
      centre: cellCentre(col, row),
      name: { key: `exists.named.${i}`, text: named[i].text, at: { x: NAMES_X, y: nameY } as Point },
      caption: { key: `exists.named.${i}.caption`, text: named[i].caption, at: { x: NAMES_X, y: nameY + CAPTION_DROP } as Point },
      /** From the box's right edge, at its middle, out to just short of the name. */
      leader: { key: `exists.named.${i}.leader`, from: { x: at.x + at.w + 8, y: at.y + at.h / 2 } as Point, to: { x: NAMES_X - 16, y: nameY + CAPTION_DROP / 2 } as Point },
    };
  }),
  unnamed: LIT.unnamed.map(([col, row]) => ({ key: `exists.lantern.${col}.${row}`, col, row, at: cellAt(col, row), centre: cellCentre(col, row) })),
  ring: {
    key: "exists.ring",
    at: RING,
    r: RING_R,
    dots: Array.from({ length: 9 }, (_, i) => ({ key: `exists.dot.${i}`, at: roundRectAt(RING, RING_R, (i + 0.5) / 9) })),
    name: { key: "exists.ring.name", text: GROUP, at: { x: NAMES_X, y: GROUP_Y } as Point },
    caption: { key: "exists.ring.caption", text: GROUP_CAPTION, at: { x: NAMES_X, y: GROUP_Y + CAPTION_DROP } as Point },
  },
  staff: { key: "exists.staff", text: STAFF, at: STAFF_AT },
  apart: { key: "exists.apart", text: NOT_AT_TABLE, at: APART_AT },
};
