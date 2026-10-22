/**
 * Where slide 11a puts things: the member of staff at the left with the
 * card, the route forking, the shelf on the upper branch with its screens
 * and its room for one more, the boundary round the first screen and the
 * record under it, the closed gate, the reviewer and the mark on the lower
 * branch under the shelf, and the honesty caption at the lower left. Every
 * row of words clear of every other and of every drawn thing, wherever a
 * card or the magnifier rests.
 */
import { describe, expect, it } from "vitest";
import { box, type Box } from "@/components/deck/kit";
import { DRAW_FOOT, LABEL_LINE, SAFE, contentTop, wordsWidth } from "./layout";
import { BRANCH_X, CARD, CONTROL, FORK, GAP, LINE, SHELF, cardBox, controlGlyphs, controlRows } from "./layout-control";
import { bottom, bounds, inside, overlaps, right } from "./harness";

const C = CONTROL;
const rows = controlRows();
const glyphs = controlGlyphs();
const row = (key: string) => rows.find((entry) => entry.key === key)!.box;
/** The block a row belongs to: a name, its caption and their rows set one under another; rows in a block touch, blocks keep apart. */
const blockOf = (key: string) => key.replace(/\.\d+$/, "").replace(/\.(name|caption|words)$/, "");
const grow = (b: Box, by: number): Box => box(b.x - by, b.y - by, b.w + 2 * by, b.h + 2 * by);
const middle = (b: Box) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
/** A route's band: its line and its stroke. */
const along = (x0: number, x1: number, y: number, half = 3): Box => box(x0, y - half, x1 - x0, 2 * half);
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
  { key: C.routes.upper.key, box: along(BRANCH_X, SHELF.from, LINE.upper) },
  { key: C.shelf.key, box: along(SHELF.from, SHELF.to, LINE.upper, SHELF.width / 2) },
  { key: C.routes.lower.key, box: along(BRANCH_X, right(C.reviewer.at), LINE.lower) },
];

describe("slide 11a, approved tools", () => {
  const [upper, lower] = C.cards;
  const [first, , , added] = C.tools;

  it("rides each card on its line, its foot just over it, and stops each short of what it reaches", () => {
    expect(bottom(cardBox(upper, upper.stops.shelf))).toBe(LINE.upper - CARD.lift);
    expect(bottom(cardBox(lower, lower.stops.gate))).toBe(LINE.lower - CARD.lift);
    expect(GAP).toBeGreaterThanOrEqual(20);
    expect(right(cardBox(upper, upper.stops.shelf))).toBe(first.at.x - GAP);
    expect(right(cardBox(lower, lower.stops.gate))).toBe(C.gate.paths.at.x - GAP);
  });

  it("seats the first card inside the first screen, its round hole on the screen's round socket", () => {
    const seat = cardBox(upper, upper.stops.seat);
    expect(inside(seat, first.at)).toBe(true);
    expect(middle(seat).x).toBe(middle(first.at).x);
    expect(Math.abs(middle(seat).y - middle(first.at).y)).toBeLessThanOrEqual(1);
    expect({ x: seat.x + CARD.w / 2, y: seat.y + CARD.hole }).toEqual(first.socket);
    // The slide in is short: across the gap and into the screen's middle.
    expect(upper.stops.tool.x - upper.stops.shelf.x).toBe(GAP + CARD.w / 2 + first.at.w / 2);
    // At the riding height inside the screen too, before it snaps up.
    expect(inside(cardBox(upper, upper.stops.tool), box(first.at.x, first.at.y, first.at.w, first.at.h + 1))).toBe(true);
  });

  it("stands the four screens on the shelf in one row, evenly, the added one at its end inside its span", () => {
    for (const tool of C.tools) expect(bottom(tool.at), tool.key).toBe(LINE.upper);
    const gaps = C.tools.slice(1).map((tool, i) => tool.at.x - right(C.tools[i].at));
    expect(new Set(gaps).size).toBe(1);
    expect(first.at.x).toBeGreaterThanOrEqual(SHELF.from);
    expect(right(added.at)).toBeLessThanOrEqual(SHELF.to);
    expect(C.slot.at).toEqual(added.at);
    expect(SHELF.from).toBeGreaterThan(BRANCH_X);
  });

  it("names the shelf once, over its three screens, centred on them", () => {
    const name = row(C.shelf.name.key);
    expect(middle(name).x).toBeCloseTo((first.at.x + right(C.tools[2].at)) / 2, 0);
    expect(bottom(name)).toBeLessThan(C.boundary.at.y);
  });

  it("draws the boundary round the first screen alone, open at the shelf", () => {
    expect(inside(first.at, C.boundary.at)).toBe(true);
    expect(bottom(C.boundary.at)).toBe(LINE.upper);
    expect(overlaps(C.boundary.at, C.tools[1].at)).toBe(false);
  });

  it("hangs the record directly under the first screen, under the shelf, and above the second card where it stops", () => {
    expect(middle(C.ledger.at).x).toBe(middle(first.at).x);
    expect(C.ledger.at.y).toBeGreaterThan(LINE.upper + 6);
    expect(bottom(C.ledger.at)).toBeLessThan(cardBox(lower, lower.stops.gate).y - 20);
  });

  it("sets the first screen's and the record's words just left of them, each block level with what it names", () => {
    const fits = row(C.fits.key);
    expect(right(fits)).toBe(C.boundary.at.x - 16);
    expect(Math.abs(middle(fits).y - first.socket.y)).toBeLessThanOrEqual(4);
    const use = [0, 1].map((k) => row(`${C.boundary.caption.key}.${k}`));
    for (const b of use) expect(right(b)).toBe(C.boundary.at.x - 16);
    expect(bottom(use[1])).toBeLessThanOrEqual(fits.y);
    expect(use[0].y).toBeLessThan(C.boundary.at.y + 16);
    const ledger = [row(C.ledger.name.key), row(`${C.ledger.caption.key}.0`), row(`${C.ledger.caption.key}.1`)];
    for (const b of ledger) expect(right(b)).toBe(C.boundary.at.x - 16);
    expect(ledger[0].y).toBe(C.ledger.at.y);
    expect(bottom(ledger[2])).toBeLessThanOrEqual(bottom(C.ledger.at) + LABEL_LINE / 2);
  });

  it("names the closed gate under its branch, centred on it, and puts the reviewer under the added screen", () => {
    for (const key of [C.gate.name.key, C.gate.caption.key]) {
      const b = row(key);
      expect(middle(b).x, key).toBeCloseTo(C.gate.foot.x, 0);
      expect(b.y, key).toBeGreaterThan(LINE.lower + 12);
    }
    expect(bottom(C.gate.paths.at)).toBe(LINE.lower);
    expect(Math.abs(middle(C.reviewer.at).x - middle(added.at).x)).toBeLessThanOrEqual(40);
  });

  it("brings the magnifier back to rest in the reviewer's hand, off the card and the gate", () => {
    const rest = box(C.lens.at.x - 20, C.lens.at.y - 20, 54, 54);
    expect(overlaps(rest, C.gate.paths.at)).toBe(false);
    expect(overlaps(rest, cardBox(lower, lower.stops.gate))).toBe(false);
    expect(C.lens.at.x).toBeGreaterThan(right(C.gate.paths.at) + 120);
    expect(Math.abs(C.lens.at.x - C.reviewer.at.x)).toBeLessThanOrEqual(24);
  });

  it("puts the fork near the middle of the field and the staff's words under them", () => {
    expect(Math.abs(LINE.stem - (contentTop("control") + DRAW_FOOT) / 2)).toBeLessThanOrEqual(40);
    const words = rows.filter((entry) => entry.key.startsWith("control.staff.")).map((entry) => entry.box);
    for (const b of words) expect(b.y).toBeGreaterThan(bottom(C.staff.at));
  });

  it("sets every row of words on one or two rows, each caption's rows even", () => {
    for (const list of [C.staff.caption.rows, C.boundary.caption.rows, C.ledger.caption.rows, C.reviewer.name.rows, C.mark.words.rows]) {
      expect(list.length).toBeLessThanOrEqual(2);
      const widths = list.map((entry) => wordsWidth(entry, 26));
      expect(Math.min(...widths) / Math.max(...widths), list.join(" / ")).toBeGreaterThan(0.6);
    }
  });

  it("sets the honesty caption at the lower left, slate, at the label size", () => {
    const honesty = row(C.honesty.key);
    expect(honesty.x).toBe(SAFE.left);
    expect(honesty.h).toBe(LABEL_LINE);
    expect(bottom(honesty)).toBeGreaterThan(DRAW_FOOT - 40);
  });

  it("keeps every row of words clear of every other row, of every drawn thing wherever it rests, and of the routes and the shelf, with room to spare", () => {
    for (const a of rows) for (const b of rows) if (a !== b) expect(overlaps(blockOf(a.key) === blockOf(b.key) ? a.box : grow(a.box, 6), b.box), `${a.key} / ${b.key}`).toBe(false);
    for (const entry of rows) for (const glyph of [...glyphs, ...routes]) expect(overlaps(grow(entry.box, 12), glyph.box), `${entry.key} / ${glyph.key}`).toBe(false);
  });

  it("keeps the drawn things apart: the record off the shelf, the reviewer and the mark off the shelf and the screens", () => {
    const shelf = routes.find((entry) => entry.key === C.shelf.key)!.box;
    for (const b of [C.ledger.at, C.reviewer.at, box(C.mark.at.x - 26, C.mark.at.y - 26, 52, 52)]) {
      expect(overlaps(b, shelf)).toBe(false);
      for (const tool of C.tools) expect(overlaps(b, tool.at)).toBe(false);
    }
  });

  it("fills the field: from under the story band to the drawing's foot, inside the safe area", () => {
    const all = bounds([...rows.map((entry) => entry.box), ...glyphs.map((glyph) => glyph.box)]);
    expect(all.y).toBeGreaterThanOrEqual(contentTop("control"));
    expect(all.y).toBeLessThan(contentTop("control") + 40);
    expect(bottom(all)).toBeLessThanOrEqual(DRAW_FOOT);
    expect(bottom(all)).toBeGreaterThan(DRAW_FOOT - 40);
    expect(all.x).toBeGreaterThanOrEqual(SAFE.left);
    expect(right(all)).toBeLessThanOrEqual(SAFE.right);
  });
});
