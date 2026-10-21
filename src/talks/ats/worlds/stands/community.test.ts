/**
 * Slide 12b, the deck's one two-click slide: where its column, quotes and
 * theme rows go, and how its two clicks play, beat by beat.
 */
import type { Point } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { at, bottom, endOf, playOf, right, startOf, wordsBox } from "./harness";
import { DRAW_FOOT, LABEL_LINE, SAFE, TEXT_LINE, contentTop, wordsWidth } from "./layout";
import { COLUMN, COMMUNITY, QUOTE, ROLL, ROLL_ON, THEME, WINDOW } from "./layout-community";

const C = COMMUNITY;
const roll = "community.roll";
const themes = "community.themes";
const nameBox = (p: Point, text: string) => wordsBox(p, wordsWidth(text, COLUMN.size), TEXT_LINE, "start");
const quoteRows = (quote: (typeof C.quotes)[number]) => quote.rows.map((row, k) => wordsBox({ x: quote.at.x, y: quote.at.y + k * QUOTE.row }, Math.ceil(row.length * QUOTE.size * QUOTE.letter), QUOTE.row, "start"));
const byBox = (quote: (typeof C.quotes)[number]) => wordsBox(quote.by.at, wordsWidth(quote.by.text, 26), LABEL_LINE, "start");

describe("slide 12b's layout", () => {
  it("settles the nine names 44 px apart from y 572 to 924, inside the drawing's band", () => {
    const ys = C.column.names.map((name) => name.at.y);
    expect(ys).toHaveLength(9);
    expect([ys[0], ys[8]]).toEqual([572, 924]);
    for (let i = 1; i < 9; i++) expect(ys[i] - ys[i - 1]).toBe(44);
    expect(contentTop("community")).toBe(548);
    for (const name of C.column.names) {
      const b = nameBox(name.at, name.text);
      expect(b.y, name.text).toBeGreaterThanOrEqual(WINDOW.y);
      expect(bottom(b), name.text).toBeLessThanOrEqual(DRAW_FOOT);
    }
  });

  it("starts the column under the window's foot, so nothing of it shows until it rises", () => {
    expect(C.column.names[0].at.y + ROLL.from - TEXT_LINE / 2).toBeGreaterThanOrEqual(bottom(WINDOW));
    expect(bottom(WINDOW)).toBe(DRAW_FOOT);
  });

  it("sets each quote's block within 60 px of its name's height, the blocks in the column's order and apart, inside the drawing", () => {
    for (const [i, quote] of C.quotes.entries()) {
      expect(Math.abs(quote.middle - C.column.names[quote.owner].at.y), quote.text).toBeLessThanOrEqual(60);
      expect(quote.box.y).toBeGreaterThanOrEqual(WINDOW.y);
      expect(bottom(quote.box)).toBeLessThanOrEqual(DRAW_FOOT);
      if (i > 0) {
        expect(quote.owner).toBeGreaterThan(C.quotes[i - 1].owner);
        expect(quote.box.y).toBeGreaterThanOrEqual(bottom(C.quotes[i - 1].box));
      }
      for (const row of [...quoteRows(quote), byBox(quote)]) {
        expect(row.y, quote.text).toBeGreaterThanOrEqual(quote.box.y - 1);
        expect(bottom(row), quote.text).toBeLessThanOrEqual(bottom(quote.box) + 1);
        expect(right(row), quote.text).toBeLessThanOrEqual(QUOTE.x + QUOTE.w);
      }
      expect(quote.rows.join(" ")).toBe(quote.text);
    }
    expect(QUOTE.x + QUOTE.w).toBeLessThanOrEqual(SAFE.right);
  });

  it("joins each quote to its name by a short leader that clears every name and quote", () => {
    const names = C.column.names.map((name) => nameBox(name.at, name.text));
    for (const quote of C.quotes) {
      const { from, to } = quote.leader;
      expect(from.x).toBeGreaterThan(right(names[quote.owner]));
      expect(to.x).toBeLessThan(QUOTE.x);
      expect(Math.hypot(to.x - from.x, to.y - from.y)).toBeLessThan(400);
      expect(from.y).toBe(C.column.names[quote.owner].at.y);
      for (const name of names) expect(name.x + name.w, "names end before the quotes begin").toBeLessThan(QUOTE.x - 60);
    }
  });

  it("lays the three theme rows across the full band, 96 px apart, centred on it, each its words over its rule", () => {
    for (const [i, theme] of C.themes.entries()) {
      expect(theme.rule.x0).toBe(SAFE.left + 16);
      expect(theme.rule.x1).toBe(SAFE.right);
      expect(theme.at.x).toBe(theme.rule.x0);
      if (i > 0) expect(theme.at.y - C.themes[i - 1].at.y).toBe(THEME.pitch);
      const words = wordsBox(theme.at, wordsWidth(theme.text, THEME.size), THEME.line, "start");
      expect(bottom(words)).toBeLessThan(theme.rule.y);
      expect(theme.rule.y - theme.at.y).toBe(THEME.rule);
    }
    const top = C.themes[0].at.y - THEME.line / 2;
    const foot = C.themes[2].rule.y;
    expect(Math.abs((top + foot) / 2 - (WINDOW.y + bottom(WINDOW)) / 2)).toBeLessThanOrEqual(8);
  });

  it("rolls everything in the window out over its top on the second click", () => {
    const lowest = Math.max(...C.quotes.map((quote) => bottom(quote.box)), C.column.names[8].at.y + TEXT_LINE / 2);
    expect(lowest + ROLL_ON.by).toBeLessThanOrEqual(WINDOW.y);
  });
});

describe("stationary staff voices", () => {
  it("reveals names and quotes without translating them", () => {
    for (const key of [C.column.key, ...C.quotes.map(q => q.key)]) {
      expect(playOf(roll, key).every(p => !("x" in p.on) && !("y" in p.on))).toBe(true);
      expect(at(roll)[key].autoAlpha).toBe(1);
    }
    expect(at(roll)["story.community.b"].yPercent).toBe(120);
  });
  it("fades quotes away on the second click before showing themes", () => {
    expect(playOf(themes, C.block.key)[0].on).toEqual({ autoAlpha: 0 });
    for (const t of C.themes) {
      expect(startOf(themes, t.key)).toBeGreaterThan(endOf(themes, C.block.key));
      expect(at(themes)[t.key].autoAlpha).toBe(1);
    }
    expect(startOf(themes, "story.community.b")).toBeGreaterThan(Math.max(...C.themes.map(t => endOf(themes, t.key))));
  });
});
