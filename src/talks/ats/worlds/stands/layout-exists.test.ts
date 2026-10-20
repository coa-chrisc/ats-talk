/**
 * Where slide 12 puts things: the grid of departments, its six named
 * lanterns and their columns of names either side of the ring, the leaders
 * that join them without crossing anything, the ring of dots and the two
 * tags. The world's
 * other slides are in layout.test.ts.
 */
import { describe, expect, it } from "vitest";
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, SAFE, TEXT_LINE, wordsWidth } from "./layout";
import { COLUMN, DOT_R, EXISTS, GRID, GRID_BOX, LANTERN, LIT, NAMES, cellAt, namedRows } from "./layout-exists";
import { bottom, bounds, inside, overlaps, right, wordsBox } from "./harness";

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
const E = EXISTS;

describe("slide 12, the departments", () => {
  const blockOf = (lit: (typeof E.named)[number]) => bounds(namedRows(lit).map((row) => box(row.x, row.y - row.line / 2, row.width, row.line)));
  const blocks = E.named.map(blockOf);

  it("lays out the 7 by 3 grid about 740 px wide, its boxes apart", () => {
    expect([GRID.cols, GRID.rows]).toEqual([7, 3]);
    expect(GRID_BOX.w).toBeGreaterThanOrEqual(720);
    expect(GRID_BOX.w).toBeLessThanOrEqual(760);
    expect(cellAt(6, 2)).toEqual({ x: GRID.x + 6 * (GRID.box.w + GRID.gap), y: GRID.y + 2 * (GRID.box.h + GRID.rowGap), w: GRID.box.w, h: GRID.box.h });
    expect(E.boxes).toHaveLength(21);
    for (const a of E.boxes) for (const b of E.boxes) if (a !== b) expect(overlaps(a.at, b.at), `${a.key} ${b.key}`).toBe(false);
  });

  it("lights six named boxes, the grid's outer columns top to bottom, and three unnamed ones among the rest, each a different box, each lantern inside its box", () => {
    const lit = [...LIT.named, ...LIT.unnamed].map(([col, row]) => `${col}.${row}`);
    expect(new Set(lit).size).toBe(9);
    expect(LIT.named.map(([col, row]) => [col, row])).toEqual([[0, 0], [0, 1], [0, 2], [6, 0], [6, 1], [6, 2]]);
    for (const [col] of LIT.unnamed) expect(col > 0 && col < 6).toBe(true);
    for (const lantern of [...E.named, ...E.unnamed]) expect(inside(box(lantern.centre.x - LANTERN.w / 2, lantern.centre.y - LANTERN.h / 2, LANTERN.w, LANTERN.h), lantern.at), lantern.key).toBe(true);
  });

  it("sets three names each side of the ring, the left flush right toward it and the right flush left from it, each caption under its name on at most two rows inside its column, the blocks apart and clear of the ring", () => {
    expect(COLUMN.left).toBe(E.ring.at.x - 43);
    expect(COLUMN.right).toBe(right(E.ring.at) + 43);
    expect(COLUMN.left - NAMES.w).toBeGreaterThanOrEqual(SAFE.left + 16);
    expect(COLUMN.right + NAMES.w).toBeLessThanOrEqual(SAFE.right);
    for (const [i, lit] of E.named.entries()) {
      expect(lit.name.at.x, lit.name.text).toBe(i < 3 ? COLUMN.left : COLUMN.right);
      expect(lit.anchor, lit.name.text).toBe(i < 3 ? "end" : "start");
      expect(lit.caption.rows.length, lit.caption.text).toBeLessThanOrEqual(2);
      expect(lit.caption.rows.join(" "), lit.caption.text).toBe(lit.caption.text);
      for (const row of namedRows(lit)) expect(row.width, lit.name.text).toBeLessThanOrEqual(NAMES.w);
      expect(overlaps(blocks[i], E.ring.at), lit.name.text).toBe(false);
    }
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) expect(overlaps(blocks[i], blocks[j]), `${i} ${j}`).toBe(false);
  });

  it("joins each name to its box by a leader that starts at the box's edge, ends short of the name, and crosses no box but its own and no other name", () => {
    const segments = (points: readonly Point[]) => points.slice(1).map((p, k) => [points[k], p] as const);
    const hits = (b: Box, [p, q]: readonly [Point, Point]) => {
      // A segment meets a box if any of 40 points along it is inside the box.
      for (let t = 0; t <= 40; t++) {
        const x = p.x + ((q.x - p.x) * t) / 40;
        const y = p.y + ((q.y - p.y) * t) / 40;
        if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h) return true;
      }
      return false;
    };
    for (const [i, lit] of E.named.entries()) {
      const pts = lit.leader.points;
      const end = pts.at(-1)!;
      expect(pts, lit.key).toHaveLength(2);
      const gap = lit.anchor === "end" ? end.x - lit.name.at.x : lit.name.at.x - end.x;
      expect(gap, lit.key).toBeGreaterThan(0);
      expect(gap, lit.key).toBeLessThanOrEqual(16);
      expect(end.y).toBe(lit.name.at.y);
      for (const cell of E.boxes) if (cell.col !== lit.col || cell.row !== lit.row) for (const seg of segments(pts)) expect(hits(cell.at, seg), `${lit.key} ${cell.key}`).toBe(false);
      for (const [j, block] of blocks.entries()) if (j !== i) for (const seg of segments(pts)) expect(hits(block, seg), `${lit.key} ${E.named[j].name.text}`).toBe(false);
      for (const other of E.named) if (other !== lit) for (const a of segments(pts)) for (const b of segments(other.leader.points)) {
        const cross = (o: Point, p: Point, q: Point) => (p.x - o.x) * (q.y - o.y) - (p.y - o.y) * (q.x - o.x);
        const meets = cross(a[0], a[1], b[0]) * cross(a[0], a[1], b[1]) < 0 && cross(b[0], b[1], a[0]) * cross(b[0], b[1], a[1]) < 0;
        expect(meets, `${lit.key} ${other.key}`).toBe(false);
      }
    }
  });

  it("rings the grid with nine dots, none where a leader crosses the ring, names the ring under it, and sets the tag under that and the grey tag apart at the right", () => {
    expect(E.ring.dots).toHaveLength(9);
    expect(inside(GRID_BOX, E.ring.at)).toBe(true);
    for (const side of [E.ring.at.x, right(E.ring.at)]) {
      for (const lit of E.named) {
        const pts = lit.leader.points;
        for (let k = 1; k < pts.length; k++) {
          const [p, q] = [pts[k - 1], pts[k]];
          if ((p.x - side) * (q.x - side) > 0) continue;
          const y = q.x === p.x ? p.y : p.y + ((q.y - p.y) * (side - p.x)) / (q.x - p.x);
          for (const dot of E.ring.dots) expect(Math.hypot(dot.at.x - side, dot.at.y - y), `${lit.key} ${dot.key}`).toBeGreaterThan(DOT_R + 6);
        }
      }
    }
    expect(text(E.ring.name.at, E.ring.name.text, "start").y).toBeGreaterThan(bottom(E.ring.at) + DOT_R - 6);
    expect(label(E.ring.caption.at, E.ring.caption.text, "start").x).toBeGreaterThan(right(text(E.ring.name.at, E.ring.name.text, "start")));
    expect(E.staff.at.y).toBeGreaterThan(bottom(text(E.ring.name.at, E.ring.name.text, "start")) - 4);
    // The grey tag a row lower than the tag, at the right; the two keep 24 px between them.
    expect(E.apart.at.y).toBeGreaterThanOrEqual(bottom(E.staff.at) + 24);
    expect(right(E.apart.at)).toBe(SAFE.right - 16);
    expect(right(E.apart.at)).toBeGreaterThan(right(E.staff.at) + 400);
    for (const block of blocks) expect(overlaps(E.apart.at, block)).toBe(false);
    for (const block of blocks) expect(overlaps(E.staff.at, block)).toBe(false);
  });
});

