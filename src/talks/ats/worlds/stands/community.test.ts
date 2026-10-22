/**
 * Slide 12b, the deck's one two-click slide: where its department chips,
 * quote cards and theme rows go, that every word sits inside the shape that
 * holds it, and how its two clicks play, beat by beat.
 */
import type { Box } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { at, bottom, endOf, inside, markup, overlaps, playOf, right, startOf, visible, wordsBox } from "./harness";
import { DRAW_FOOT, LABEL_LINE, SAFE, contentTop, wordsWidth } from "./layout";
import { CARD, CHIP, COMMUNITY, FIELD, MEASURED, THEME, room, rowWidth } from "./layout-community";

const C = COMMUNITY;
const roll = "community.roll";
const themes = "community.themes";

/** A card's lines as boxes: each one its measured room wide (the margin in it), its line's height tall, about its middle. */
const lineBox = (x: number, y: number, text: string, line: number): Box => wordsBox({ x, y }, room(text), line, "start");
const cardLines = (card: (typeof C.cards)[number]) => [
  lineBox(card.dept.at.x, card.dept.at.y, card.dept.text, LABEL_LINE),
  ...card.quote.rows.map((row, k) => lineBox(card.quote.at.x, card.quote.at.y + k * CARD.row, row, CARD.row)),
  lineBox(card.by.at.x, card.by.at.y, card.by.text, LABEL_LINE),
];
/** A card's inside: its outline less the padding on every side. */
const innerOf = (card: (typeof C.cards)[number]): Box => ({ x: card.at.x + CARD.padX, y: card.at.y + CARD.padY, w: card.at.w - 2 * CARD.padX, h: card.at.h - 2 * CARD.padY });

describe("slide 12b's chips, click one", () => {
  it("sets the nine departments in the script's order, full names, the four quoted ones lit", () => {
    expect(C.chips.map((chip) => chip.text)).toEqual(["Austin Public Health", "Development Services", "Austin Energy", "Fire", "Police", "Austin Water", "Library", "Budget Office", "Technology Services"]);
    expect(C.chips.filter((chip) => chip.lit).map((chip) => chip.text)).toEqual(["Development Services", "Austin Water", "Library", "Budget Office"]);
  });

  it("needs two rows, as nine chips at the label size are wider than the field, and fills them in reading order from the content edge", () => {
    expect(rowWidth(C.chips.map((chip) => chip.text))).toBeGreaterThan(FIELD.w);
    const rows = [...new Set(C.chips.map((chip) => chip.at.y))];
    expect(rows).toHaveLength(2);
    expect(rows[0]).toBe(contentTop("community"));
    expect(rows[1] - rows[0]).toBe(CHIP.h + CHIP.rowGap);
    for (const y of rows) {
      const row = C.chips.filter((chip) => chip.at.y === y);
      expect(row[0].at.x, "each row starts at the content edge").toBe(FIELD.x);
      for (let i = 1; i < row.length; i++) expect(row[i].at.x - right(row[i - 1].at), row[i].text).toBe(CHIP.gap);
      expect(right(row.at(-1)!.at)).toBeLessThanOrEqual(FIELD.x + FIELD.w);
    }
    // Reading order: down the rows, then along each.
    for (let i = 1; i < C.chips.length; i++) {
      const [a, b] = [C.chips[i - 1].at, C.chips[i].at];
      expect(b.y > a.y || (b.y === a.y && b.x > a.x), C.chips[i].text).toBe(true);
    }
  });

  it("splits the rows where the wider one is narrowest", () => {
    const names = C.chips.map((chip) => chip.text);
    const split = C.chips.findIndex((chip) => chip.at.y !== C.chips[0].at.y);
    const widest = (k: number) => Math.max(rowWidth(names.slice(0, k)), rowWidth(names.slice(k)));
    for (let k = 1; k < names.length; k++) expect(widest(split), `split after ${k}`).toBeLessThanOrEqual(widest(k));
  });

  it("holds every name inside its chip with even room either side: its measured width, a margin over it, the padding round it", () => {
    for (const chip of C.chips) {
      expect(MEASURED.has(chip.text), chip.text).toBe(true);
      expect(room(chip.text), chip.text).toBeGreaterThanOrEqual(MEASURED.get(chip.text)!.w * CHIP.margin);
      expect(chip.at.w, chip.text).toBe(room(chip.text) + 2 * CHIP.pad);
      // Centred, so the room left of the words equals the room right of them, whatever the words measure.
      expect(chip.words.x, chip.text).toBe(chip.at.x + chip.at.w / 2);
      expect(chip.words.y, chip.text).toBe(chip.at.y + chip.at.h / 2);
      const words = wordsBox(chip.words, MEASURED.get(chip.text)!.w, CHIP.size, "middle");
      expect(inside(words, chip.at), chip.text).toBe(true);
      expect(words.x - chip.at.x, chip.text).toBeGreaterThanOrEqual(CHIP.pad);
      expect(right(chip.at) - right(words), chip.text).toBeGreaterThanOrEqual(CHIP.pad);
      expect(chip.at.h - CHIP.size, `${chip.text}: room over and under the letters`).toBeGreaterThanOrEqual(10);
    }
  });

  it("keeps the chips apart and inside the safe area", () => {
    for (const [i, a] of C.chips.entries()) {
      expect(a.at.x).toBeGreaterThanOrEqual(SAFE.left);
      expect(right(a.at)).toBeLessThanOrEqual(SAFE.right);
      for (const b of C.chips.slice(i + 1)) expect(overlaps(a.at, b.at), `${a.text} and ${b.text}`).toBe(false);
    }
  });
});

describe("slide 12b's quote cards, click one", () => {
  it("lays four cards in a two-by-two grid, in reading order: Development Services, Austin Water, Library, Budget Office", () => {
    expect(C.cards.map((card) => card.dept.text)).toEqual(["Development Services", "Austin Water", "Library", "Budget Office"]);
    const [tl, tr, bl, br] = C.cards.map((card) => card.at);
    expect([tl.x, bl.x]).toEqual([FIELD.x, FIELD.x]);
    expect(tr.x).toBe(br.x);
    expect([tl.y, bl.y]).toEqual([tr.y, br.y]);
    expect(tr.x - right(tl)).toBe(CARD.gap);
    expect(bl.y - bottom(tl)).toBe(CARD.rowGap);
    expect(right(tr)).toBe(FIELD.x + FIELD.w);
    for (const card of C.cards) expect([card.at.w, card.at.h]).toEqual([tl.w, tl.h]);
  });

  it("sets the cards under the chips, apart from them and each other, inside the drawing", () => {
    const chipsFoot = Math.max(...C.chips.map((chip) => bottom(chip.at)));
    for (const [i, card] of C.cards.entries()) {
      expect(card.at.y - chipsFoot, card.dept.text).toBeGreaterThanOrEqual(CARD.below);
      expect(bottom(card.at), card.dept.text).toBeLessThanOrEqual(DRAW_FOOT);
      expect(card.at.x).toBeGreaterThanOrEqual(SAFE.left);
      expect(right(card.at)).toBeLessThanOrEqual(SAFE.right);
      for (const chip of C.chips) expect(overlaps(card.at, chip.at), `${card.dept.text} and ${chip.text}`).toBe(false);
      for (const other of C.cards.slice(i + 1)) expect(overlaps(card.at, other.at), `${card.dept.text} and ${other.dept.text}`).toBe(false);
    }
  });

  it("gives each card its department's header, the quote whole and the speaker verbatim, the quote broken at a phrase", () => {
    expect(C.cards.map((card) => card.quote.rows)).toEqual([
      ["If you invest in AI,", "then you have to use it."],
      ["It's always business-driven", "and technology-enabled."],
      ["We do governance all the time.", "We just don't call it that."],
      ["Austin is taking a proactive approach."],
    ]);
    expect(C.cards.map((card) => card.by.text)).toEqual(["José Roig, former Development Services director", "Divya Rathanlal, Chief Information Officer", "Jose Ruiz-Vazquez, Milwood Branch Library", "Daniel Culotta, Assistant Director"]);
    for (const card of C.cards) expect(C.chips.find((chip) => chip.text === card.dept.text)?.lit, card.dept.text).toBe(true);
  });

  it("holds every line of every card inside the card's padding, each at its measured width with the margin, the lines apart", () => {
    for (const card of C.cards) {
      const lines = cardLines(card);
      for (const [k, line] of lines.entries()) {
        const text = [card.dept.text, ...card.quote.rows, card.by.text][k];
        expect(MEASURED.has(text), text).toBe(true);
        expect(inside(line, innerOf(card)), text).toBe(true);
        if (k > 0) expect(line.y, text).toBeGreaterThanOrEqual(bottom(lines[k - 1]));
      }
      // Even room over the header and under the speaker.
      expect(card.dept.at.y - card.at.y).toBe(bottom(card.at) - card.by.at.y);
      expect(card.dept.at.x).toBe(card.at.x + CARD.padX);
      expect([card.quote.at.x, card.by.at.x]).toEqual([card.dept.at.x, card.dept.at.x]);
    }
  });

  it("measures every word it sets as Geist does, plausibly for its size, never wider than the deck's estimate", () => {
    for (const [text, { w, size }] of MEASURED) {
      expect(w / (text.length * size), text).toBeGreaterThan(0.38);
      expect(w, text).toBeLessThanOrEqual(wordsWidth(text, size));
    }
  });

  it("draws no column of names, no connector and no clipping window", () => {
    const keys = [...markup.matchAll(/data-build="(community\.[^"]+)"/g)].map((match) => match[1]);
    expect(keys.filter((key) => /leader|column|window/.test(key))).toEqual([]);
    expect(markup).not.toMatch(/sn-leader|sn-community-window|clipPath/);
  });
});

describe("slide 12b's themes, click two", () => {
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
    expect(Math.abs((top + foot) / 2 - (contentTop("community") + DRAW_FOOT) / 2)).toBeLessThanOrEqual(8);
  });
});

describe("slide 12b's two clicks", () => {
  const chipKeys = () => C.chips.map((chip) => chip.key);
  const cardKeys = () => C.cards.map((card) => card.key);

  it("brings the chips and then the cards in place, without moving them, and ends with them still", () => {
    for (const key of [C.block.key, ...chipKeys(), ...cardKeys()]) {
      expect(playOf(roll, key).length, key).toBeGreaterThan(0);
      expect(playOf(roll, key).every((p) => !("x" in p.on) && !("y" in p.on)), key).toBe(true);
      expect(visible(at(roll), key), key).toBe(true);
    }
    expect(at(roll)["story.community.b"].yPercent).toBe(120);
  });

  it("lands the chips first, left to right, then the cards one after another in reading order", () => {
    const [chips, cards] = [chipKeys(), cardKeys()];
    for (let i = 1; i < chips.length; i++) expect(startOf(roll, chips[i]), chips[i]).toBeGreaterThan(startOf(roll, chips[i - 1]));
    expect(startOf(roll, cards[0])).toBeGreaterThanOrEqual(Math.max(...chips.map((key) => endOf(roll, key))));
    for (let i = 1; i < cards.length; i++) {
      expect(startOf(roll, cards[i]) - startOf(roll, cards[i - 1]), cards[i]).toBeGreaterThan(0);
      expect(startOf(roll, cards[i]) - startOf(roll, cards[i - 1]), cards[i]).toBeLessThanOrEqual(0.4);
    }
  });

  it("fades the chips and cards out in place on the second click before the themes come", () => {
    expect(playOf(themes, C.block.key)[0].on).toEqual({ autoAlpha: 0 });
    expect(at(themes)[C.block.key].autoAlpha).toBe(0);
    // Every chip and card is drawn inside the block that fades, which closes before the theme rows begin.
    const block = markup.slice(markup.indexOf(`data-build="${C.block.key}"`), markup.indexOf(`data-build="${C.themes[0].rule.key}"`));
    for (const key of [...chipKeys(), ...cardKeys()]) expect(block, key).toContain(`data-build="${key}"`);
    for (const t of C.themes) {
      expect(startOf(themes, t.key)).toBeGreaterThan(endOf(themes, C.block.key));
      expect(at(themes)[t.key].autoAlpha).toBe(1);
    }
    expect(startOf(themes, "story.community.b")).toBeGreaterThan(Math.max(...C.themes.map((t) => endOf(themes, t.key))));
  });
});
