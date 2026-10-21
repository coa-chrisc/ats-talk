/**
 * Where slide 11a puts things: the member of staff at the left with the
 * card, the route forking, the gate that opens, the screen and the record
 * on the upper branch, the closed gate, the reviewer and the mark on the
 * lower, the line back up joining before the screen, and the honesty
 * caption at the lower left. Every row of words clear of every other and of
 * every drawn thing, wherever a card or the magnifier stops.
 */
import { describe, expect, it } from "vitest";
import { box, type Box } from "@/components/deck/kit";
import { DRAW_FOOT, LABEL_LINE, SAFE, contentTop, wordsWidth } from "./layout";
import { BRANCH_X, CARD, CONTROL, FORK, GAP, LINE, controlGlyphs, controlRows } from "./layout-control";
import { bottom, bounds, overlaps, right } from "./harness";

const C = CONTROL;
const rows = controlRows();
const glyphs = controlGlyphs();
/** The block a row belongs to: a name, its caption and their rows set one under another; rows in a block touch, blocks keep apart. */
const blockOf = (key: string) => key.replace(/\.\d+$/, "").replace(/\.(name|caption|words)$/, "");
const grow = (b: Box, by: number): Box => box(b.x - by, b.y - by, b.w + 2 * by, b.h + 2 * by);
/** A route's band: its line and its stroke. */
const along = (x0: number, x1: number, y: number): Box => box(x0, y - 3, x1 - x0, 6);
/** A slanted run, as eight small boxes along it. */
const slant = (key: string, toY: number) =>
  Array.from({ length: 8 }, (_, i) => {
    const t = (i + 0.5) / 8;
    return { key, box: box(FORK.x + t * FORK.run - 6, LINE.stem + t * (toY - LINE.stem) - 6, 12, 12) };
  });
const routes = [
  { key: C.routes.stem.key, box: along(right(C.staff.at), FORK.x, LINE.stem) },
  ...slant(C.routes.upper.key, LINE.upper),
  ...slant(C.routes.lower.key, LINE.lower),
  { key: C.routes.upper.key, box: along(BRANCH_X, C.ledger.at.x, LINE.upper) },
  { key: C.routes.lower.key, box: along(BRANCH_X, right(C.reviewer.at), LINE.lower) },
  { key: C.routes.join.key, box: box(C.mark.at.x - 3, LINE.upper - 3, 30, C.mark.at.y - 28 - LINE.upper + 3) },
];

describe("slide 11a, approved tools", () => {
  it("rides each card on its line, its foot just over it, and stops each short of what it reaches", () => {
    const [upper, lower] = C.cards;
    const at = (b: Box, by: { x: number; y: number }) => box(b.x + by.x, b.y + by.y, b.w, b.h);
    expect(bottom(at(upper.at, upper.stops.gate))).toBe(LINE.upper - CARD.lift);
    expect(bottom(at(lower.at, lower.stops.gate))).toBe(LINE.lower - CARD.lift);
    // Each stop in plain sight: a clear gap, past the stroke, before the gate's post, the screen and the record.
    expect(GAP).toBeGreaterThanOrEqual(20);
    expect(right(at(upper.at, upper.stops.gate))).toBe(C.gates.open.paths.at.x - GAP);
    expect(right(at(lower.at, lower.stops.gate))).toBe(C.gates.closed.paths.at.x - GAP);
    expect(right(at(upper.at, upper.stops.screen))).toBe(C.screen.at.x - GAP);
    expect(right(at(upper.at, upper.stops.ledger))).toBe(C.ledger.at.x - GAP);
    // Behind the screen as it passes: the screen is taller than the card at the card's height.
    expect(C.screen.at.y).toBeLessThan(at(upper.at, upper.stops.screen).y);
    expect(bottom(C.screen.at)).toBeGreaterThan(bottom(at(upper.at, upper.stops.screen)));
  });

  it("stands both gates in one column, the open one on the upper line and the closed one on the lower", () => {
    expect(C.gates.open.foot.x).toBe(C.gates.closed.foot.x);
    expect(bottom(C.gates.open.paths.at)).toBe(LINE.upper);
    expect(bottom(C.gates.closed.paths.at)).toBe(LINE.lower);
  });

  it("names the open gate over it and the closed gate under its branch, each centred on its gate, nothing named in the band between the branches", () => {
    const row = (key: string) => rows.find((entry) => entry.key === key)!.box;
    const open = row(C.gates.open.name.key);
    expect(open.x + open.w / 2).toBeCloseTo(C.gates.open.foot.x, 0);
    expect(bottom(open)).toBeLessThanOrEqual(C.gates.open.boomTop - 12);
    for (const key of [C.gates.closed.name.key, C.gates.closed.caption.key]) {
      const b = row(key);
      expect(b.x + b.w / 2, key).toBeCloseTo(C.gates.closed.foot.x, 0);
      expect(b.y, key).toBeGreaterThan(LINE.lower + 12);
    }
    const band = box(BRANCH_X, LINE.upper, right(C.reviewer.at) - BRANCH_X, LINE.lower - LINE.upper);
    for (const entry of rows) expect(overlaps(entry.box, band), entry.key).toBe(false);
  });

  it("brings the magnifier back to rest in the reviewer's hand, off the card and the gate", () => {
    const rest = box(C.lens.at.x - 20, C.lens.at.y - 20, 54, 54);
    expect(overlaps(rest, C.gates.closed.paths.at)).toBe(false);
    const [, lower] = C.cards;
    expect(overlaps(rest, box(lower.at.x + lower.stops.gate.x, lower.at.y + lower.stops.gate.y, CARD.w, CARD.h))).toBe(false);
    expect(C.lens.at.x).toBeGreaterThan(right(C.gates.closed.paths.at) + 120);
    expect(Math.abs(C.lens.at.x - C.reviewer.at.x)).toBeLessThanOrEqual(24);
  });

  it("puts the fork near the middle of the field and the staff's words under them", () => {
    expect(Math.abs(LINE.stem - (contentTop("control") + DRAW_FOOT) / 2)).toBeLessThanOrEqual(40);
    const words = rows.filter((entry) => entry.key.startsWith("control.staff.")).map((entry) => entry.box);
    for (const b of words) expect(b.y).toBeGreaterThan(bottom(C.staff.at));
  });

  it("joins the line from the mark into the upper branch past the gate and before the screen", () => {
    expect(C.routes.join.joins.y).toBe(LINE.upper);
    expect(C.routes.join.joins.x).toBeGreaterThan(right(C.gates.open.paths.at) + 40);
    expect(C.routes.join.joins.x).toBeLessThan(C.screen.at.x - 40);
  });

  it("sets every row of words on one or two rows, each caption's rows even", () => {
    for (const list of [C.staff.caption.rows, C.screen.caption.rows, C.ledger.caption.rows, C.reviewer.name.rows, C.mark.words.rows]) {
      expect(list.length).toBeLessThanOrEqual(2);
      const widths = list.map((row) => wordsWidth(row, 26));
      expect(Math.min(...widths) / Math.max(...widths), list.join(" / ")).toBeGreaterThan(0.6);
    }
  });

  it("sets the honesty caption at the lower left, slate, at the label size", () => {
    const row = rows.find((entry) => entry.key === C.honesty.key)!;
    expect(row.box.x).toBe(SAFE.left);
    expect(row.box.h).toBe(LABEL_LINE);
    expect(bottom(row.box)).toBeGreaterThan(DRAW_FOOT - 40);
  });

  it("keeps every row of words clear of every other row, of every drawn thing wherever it stops, and of the routes, with room to spare", () => {
    for (const a of rows) for (const b of rows) if (a !== b) expect(overlaps(blockOf(a.key) === blockOf(b.key) ? a.box : grow(a.box, 6), b.box), `${a.key} / ${b.key}`).toBe(false);
    for (const row of rows) for (const glyph of [...glyphs, ...routes]) expect(overlaps(grow(row.box, 12), glyph.box), `${row.key} / ${glyph.key}`).toBe(false);
  });

  it("fills the field: from under the story band to the drawing's foot, inside the safe area", () => {
    const all = bounds([...rows.map((row) => row.box), ...glyphs.map((glyph) => glyph.box)]);
    expect(all.y).toBeGreaterThanOrEqual(contentTop("control"));
    expect(all.y).toBeLessThan(contentTop("control") + 40);
    expect(bottom(all)).toBeLessThanOrEqual(DRAW_FOOT);
    expect(bottom(all)).toBeGreaterThan(DRAW_FOOT - 40);
    expect(all.x).toBeGreaterThanOrEqual(SAFE.left);
    expect(right(all)).toBeLessThanOrEqual(SAFE.right);
  });
});
