/**
 * Slide 12b, the deck's one two-click slide: where its column, quotes and
 * theme rows go, and how its two clicks play, beat by beat.
 */
import { describe, expect, it } from "vitest";
import type { Point } from "@/components/deck/kit";
import { DRAW_FOOT, LABEL_LINE, SAFE, TEXT_LINE, contentTop, wordsWidth } from "./layout";
import { COLUMN, COMMUNITY, QUOTE, ROLL, THEME, WINDOW } from "./layout-community";
import { QUOTE_AT } from "./steps-community";
import { at, before, bottom, endOf, overlaps, playOf, playsAt, right, startOf, wordsBox } from "./harness";

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

  it("lays the three theme rows across the full band, 64 px apart, each band holding its words and rule, the bands apart", () => {
    for (const [i, theme] of C.themes.entries()) {
      expect(theme.rule.x0).toBe(SAFE.left + 16);
      expect(theme.rule.x1).toBe(SAFE.right);
      expect(theme.at.x).toBe(theme.rule.x0);
      if (i > 0) expect(theme.at.y - C.themes[i - 1].at.y).toBe(THEME.pitch);
      const words = wordsBox(theme.at, wordsWidth(theme.text, 32), TEXT_LINE, "start");
      expect(words.y).toBeGreaterThanOrEqual(theme.band.at.y);
      expect(theme.rule.y).toBeLessThan(bottom(theme.band.at));
      expect(theme.rule.y).toBeGreaterThan(theme.at.y);
      if (i > 0) expect(overlaps(theme.band.at, C.themes[i - 1].band.at)).toBe(false);
    }
    expect(C.themes[0].band.at.y).toBeGreaterThanOrEqual(WINDOW.y);
    expect(bottom(C.themes[2].band.at)).toBeLessThanOrEqual(DRAW_FOOT);
  });
});

describe("slide 12b's first click, the roll", () => {
  const [rise] = playOf(roll, C.column.key).filter((play) => "y" in play.on);

  it("rolls the whole column up at one pace, linearly, over 6 s, and settles it in place", () => {
    expect(rise.ease).toBe("none");
    expect(rise.duration).toBe(ROLL.seconds);
    expect(before(roll)[C.column.key].y).toBe(ROLL.from);
    expect(at(roll)[C.column.key]).toMatchObject({ y: 0, autoAlpha: 1 });
  });

  it("slides each quote in from the right to its place, in the column's order, as its name rises into view, story line A with the first", () => {
    for (const [i, quote] of C.quotes.entries()) {
      const [slide] = playOf(roll, quote.key);
      expect(slide.at).toBeCloseTo(QUOTE_AT[i], 6);
      expect(slide.on).toEqual({ autoAlpha: 1, x: 0 });
      expect(before(roll)[quote.key].x).toBeGreaterThan(0);
      // Where the name is when its quote lands: risen into the window, 32 px clear of its foot.
      const y = C.column.names[quote.owner].at.y + ROLL.from * (1 - (slide.at - rise.at) / rise.duration);
      expect(y).toBeCloseTo(DRAW_FOOT - 32, 6);
      if (i > 0) expect(slide.at).toBeGreaterThan(QUOTE_AT[i - 1] + 0.3);
    }
    expect(startOf(roll, "story.community.a")).toBeGreaterThan(QUOTE_AT[0]);
    expect(startOf(roll, "story.community.a")).toBeLessThan(QUOTE_AT[1]);
  });

  it("draws each leader once the column has settled, and ends with every name and quote in place, the themes still to come", () => {
    for (const quote of C.quotes) expect(startOf(roll, quote.leader.key)).toBeGreaterThanOrEqual(rise.at + rise.duration);
    const end = at(roll);
    for (const quote of C.quotes) expect(end[quote.key].autoAlpha, quote.key).toBe(1);
    for (const theme of C.themes) expect(end[theme.key].autoAlpha, theme.key).toBe(0);
    expect(end["story.community.b"].yPercent).toBe(120);
  });
});

describe("slide 12b's second click, the themes", () => {
  it("steps the column, the quotes and the leaders back at once, and moves nothing else of the first click", () => {
    const dims = [C.column.key, ...C.quotes.flatMap((quote) => [quote.key, quote.leader.key])];
    for (const key of dims) {
      expect(startOf(themes, key), key).toBe(0);
      expect(at(themes)[key].autoAlpha, key).toBe(0.45);
    }
    const moved = new Set(playsAt(themes).map((play) => play.key));
    expect([...moved].filter((key) => !dims.includes(key) && !C.themes.some((theme) => key.startsWith(theme.key)) && key !== "story.community.b")).toEqual([]);
  });

  it("brings the three theme rows one after another, each band up, its rule drawing across, its words over it, story line B with the first", () => {
    const rows = C.themes.map((theme) => startOf(themes, theme.band.key));
    for (let i = 1; i < 3; i++) expect(rows[i] - rows[i - 1]).toBeGreaterThanOrEqual(0.6);
    for (const theme of C.themes) {
      expect(startOf(themes, theme.rule.key)).toBeGreaterThan(startOf(themes, theme.band.key));
      expect(startOf(themes, theme.key)).toBeGreaterThan(startOf(themes, theme.rule.key));
      expect(at(themes)[theme.rule.key]["--d"]).toBe(1);
    }
    expect(startOf(themes, "story.community.b")).toBeGreaterThan(rows[0]);
    expect(startOf(themes, "story.community.b")).toBeLessThan(rows[1]);
    expect(endOf(themes, C.themes[2].key)).toBeLessThan(12);
  });
});
