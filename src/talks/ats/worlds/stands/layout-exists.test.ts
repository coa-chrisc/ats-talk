/**
 * Where slide 12 puts things: the department map's grid at the drawing's
 * top left, a window lit in six named boxes and, fainter, in three unnamed
 * ones; the six names in a list down the right, each behind its bullet; the
 * cluster of staff under the grid with its words; and the empty table
 * beside them, its caption under it. Every row of words clear of every
 * other and of every drawn thing. The world's other slides are in
 * layout.test.ts.
 */
import { describe, expect, it } from "vitest";
import { box, type Box } from "@/components/deck/kit";
import { DRAW_FOOT, SAFE, contentTop } from "./layout";
import { EXISTS, EXISTS_FOOT, FIGURE, LEFT_END, LIST, MAP_SCALE, TABLE_SCALE, existsRows } from "./layout-exists";
import { GRID, LIT, TABLE, WINDOW, gridSize } from "../department-map";
import { bottom, bounds, inside, overlaps, right, ringBox } from "./harness";

const E = EXISTS;
const rows = existsRows();
/** The block a row belongs to: a name, its caption and their rows set one under another; rows in a block touch, blocks keep apart. */
const blockOf = (key: string) => key.replace(/\.\d+$/, "").replace(/\.(name|caption|words)$/, "").replace(/^exists\.training$/, "exists.group");
const grow = (b: Box, by: number): Box => box(b.x - by, b.y - by, b.w + 2 * by, b.h + 2 * by);
const table = ringBox(E.table.c, E.table.reach);
const cluster = bounds(E.staff.map((person) => person.at));
const glyphs: { key: string; box: Box }[] = [
  { key: E.grid.key, box: E.map.outline },
  ...E.staff.map((person) => ({ key: person.key, box: person.at })),
  { key: E.table.key, box: table },
  ...E.named.map((lit) => ({ key: `${lit.entry.key}.bullet`, box: lit.entry.bullet })),
];

describe("slide 12, the departments", () => {
  it("draws the 7 by 3 grid at the map's proportions, scaled to fit, its boxes apart", () => {
    expect([GRID.cols, GRID.rows]).toEqual([7, 3]);
    expect(E.map.cells).toHaveLength(21);
    expect(E.map.outline.w).toBeCloseTo(gridSize(MAP_SCALE).w, 0);
    expect(E.map.outline.w / E.map.outline.h).toBeCloseTo(gridSize(1).w / gridSize(1).h, 2);
    for (const a of E.map.cells) for (const b of E.map.cells) if (a !== b) expect(overlaps(a.at, b.at), `${a.n} ${b.n}`).toBe(false);
  });

  it("lights a window in six named boxes, the grid's outer columns, and smaller and fainter in three unnamed ones among the rest, each inside its box with room round it", () => {
    expect(E.named.map((lit) => [lit.col, lit.row])).toEqual(LIT.named.map(([col, row]) => [col, row]));
    expect(E.unnamed.map((lit) => [lit.col, lit.row])).toEqual(LIT.unnamed.map(([col, row]) => [col, row]));
    expect(new Set([...E.named, ...E.unnamed].map((lit) => lit.key)).size).toBe(9);
    for (const lit of [...E.named, ...E.unnamed]) expect(inside(grow(lit.at, 6), lit.cell), lit.key).toBe(true);
    for (const lit of E.named) expect(lit.lit).toBe(1);
    for (const lit of E.unnamed) {
      expect(lit.lit).toBe(WINDOW.faint);
      expect(lit.at.w).toBeLessThan(E.named[0].at.w);
    }
  });

  it("lists the six names down the right, each caption under its name on one row, each behind a bullet the window's shape, the list inside the stage's right edge", () => {
    for (const [i, lit] of E.named.entries()) {
      const { bullet, name, caption } = lit.entry;
      expect(bullet.w).toBe(LIST.bullet);
      expect(bullet.h).toBe(LIST.bullet);
      expect(bullet.y + bullet.h / 2, lit.entry.key).toBe(name.at.y);
      expect(right(bullet) + LIST.gap).toBe(name.at.x);
      expect(caption.at.x).toBe(name.at.x);
      expect(caption.at.y).toBeGreaterThan(name.at.y);
      if (i > 0) expect(name.at.y).toBeGreaterThan(E.named[i - 1].entry.caption.at.y);
    }
    for (const row of rows.filter((entry) => entry.key.startsWith("exists.entry."))) expect(right(row.box), row.key).toBeLessThanOrEqual(SAFE.right);
  });

  it("keeps the drawing's left side, the grid, the cluster, its words and the table, short of the list's bullets", () => {
    const bullets = Math.min(...E.named.map((lit) => lit.entry.bullet.x));
    expect(LEFT_END).toBeLessThanOrEqual(bullets - 40);
    const left = [E.map.outline, cluster, table, ...rows.filter((row) => !row.key.startsWith("exists.entry.")).map((row) => row.box)];
    for (const b of left) expect(right(b)).toBeLessThanOrEqual(LEFT_END);
  });

  it("stands the cluster under the grid, its words beside it and the table beside them, each clear of the next", () => {
    expect(E.staff).toHaveLength(5);
    for (const person of E.staff) expect([person.at.w, person.at.h]).toEqual([FIGURE.w, FIGURE.h]);
    expect(cluster.y).toBeGreaterThanOrEqual(bottom(E.map.outline) + 24);
    const words = bounds(rows.filter((row) => row.key.startsWith("exists.group.") || row.key.startsWith("exists.training")).map((row) => row.box));
    expect(words.x).toBeGreaterThanOrEqual(right(cluster) + 24);
    expect(table.x).toBeGreaterThanOrEqual(right(words) + 24);
  });

  it("draws the empty table at slide 17's proportions, its caption under it", () => {
    expect(E.table.scale).toBe(TABLE_SCALE);
    expect(E.table.reach).toBeCloseTo(Math.hypot(TABLE.ring + TABLE.seat.h / 2, TABLE.seat.w / 2) * TABLE_SCALE, 1);
    const caption = bounds(rows.filter((row) => row.key.startsWith(E.tableCaption.key)).map((row) => row.box));
    expect(caption.y).toBeGreaterThanOrEqual(bottom(table) + 8);
    expect(caption.x + caption.w / 2).toBeCloseTo(E.table.c.x, 0);
  });

  it("keeps every row of words clear of every other row and of every drawn thing, with room to spare", () => {
    for (const a of rows) for (const b of rows) if (a !== b) expect(overlaps(blockOf(a.key) === blockOf(b.key) ? a.box : grow(a.box, 4), b.box), `${a.key} / ${b.key}`).toBe(false);
    for (const row of rows) for (const glyph of glyphs) expect(overlaps(grow(row.box, 8), glyph.box), `${row.key} / ${glyph.key}`).toBe(false);
    for (const lit of E.named) for (const row of rows) expect(overlaps(grow(row.box, 8), lit.cell), `${row.key} / ${lit.key}`).toBe(false);
  });

  it("fills the field: from under the story band to the drawing's foot", () => {
    const all = bounds([...rows.map((row) => row.box), ...glyphs.map((glyph) => glyph.box)]);
    expect(all.y).toBeGreaterThanOrEqual(contentTop("exists"));
    expect(EXISTS_FOOT).toBeLessThanOrEqual(DRAW_FOOT);
    expect(bottom(all)).toBeLessThanOrEqual(DRAW_FOOT);
    expect(bottom(all)).toBeGreaterThan(DRAW_FOOT - 40);
    expect(all.x).toBeGreaterThanOrEqual(SAFE.left);
    expect(right(all)).toBeLessThanOrEqual(SAFE.right);
  });
});
