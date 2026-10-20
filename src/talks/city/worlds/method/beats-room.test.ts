/**
 * Slides 14, 15 and 17 as they play: the table filling, the five questions
 * asked and the page written; the two cards lifted to show what is under
 * them; the long months bar, then the short days bar while the three tools
 * are built. Each
 * click follows its They see in order and ends on the picture it describes.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { LISTEN } from "./layout-listen";
import { PLAIN_TOOL } from "./layout-plain-tool";
import { UNDERNEATH } from "./layout-underneath";
import { after, at, before, endOf, markup, playOf, startOf, stepOf, tagOf } from "./harness";

const L = LISTEN;
const U = UNDERNEATH;
const P = PLAIN_TOOL;

describe("slide 14", () => {
  const id = stepOf("listen");
  const end = at(id);
  const [a, b] = storyKeys(storyId("listen"), 2);
  const sitters = L.seats.map((seat) => seat.sitter);

  it("fills the chairs one at a time once they are round the table, and names them once", () => {
    const sits = sitters.map((key) => startOf(id, key));
    for (let i = 1; i < sits.length; i++) expect(sits[i] - sits[i - 1], sitters[i]).toBeGreaterThan(0.1);
    expect(sits[0]).toBeGreaterThan(Math.max(...L.seats.map((seat) => startOf(id, seat.key))));
    expect(startOf(id, L.name.key)).toBeGreaterThan(sits[0]);
  });

  it("asks the five questions one at a time, about 0.9 s apart, once the table is full, with the first line", () => {
    const full = Math.max(...sitters.map((key) => endOf(id, key)));
    const asks = L.bubbles.map((bubble) => startOf(id, bubble.key));
    expect(asks).toHaveLength(5);
    expect(asks[0]).toBeGreaterThan(full);
    for (let i = 1; i < asks.length; i++) expect(asks[i] - asks[i - 1], L.bubbles[i].key).toBeCloseTo(0.9, 6);
    expect(startOf(id, a)).toBeGreaterThan(asks[0]);
    expect(startOf(id, a)).toBeLessThan(asks[1]);
  });

  it("writes the page line by line under its heading after the last question, with the second line", () => {
    expect(startOf(id, L.page.key)).toBeGreaterThan(endOf(id, L.bubbles.at(-1)!.key));
    expect(startOf(id, L.page.heading.key)).toBeGreaterThan(startOf(id, L.page.key));
    const writes = L.page.lines.map((line) => startOf(id, line.key));
    expect(writes[0]).toBeGreaterThan(startOf(id, L.page.heading.key));
    for (let i = 1; i < writes.length; i++) expect(writes[i] - writes[i - 1], L.page.lines[i].key).toBeGreaterThan(0.1);
    expect(startOf(id, b)).toBeGreaterThan(startOf(id, L.page.key));
  });

  it("ends on the full table and the filled page", () => {
    expect(end[L.table.key]["--d"]).toBe(1);
    for (const seat of L.seats) expect(end[seat.key].autoAlpha, seat.key).toBe(1);
    for (const key of sitters) expect(end[key]["--d"], key).toBe(1);
    for (const line of L.page.lines) expect(end[line.key]["--k"], line.key).toBe(1);
    for (const key of [L.name.key, ...L.bubbles.map((bubble) => bubble.key), L.page.key, L.page.heading.key]) expect(end[key].autoAlpha, key).toBe(1);
  });
});

describe("slide 15", () => {
  const id = stepOf("underneath");
  const end = at(id);
  const [a, b] = storyKeys(storyId("underneath"), 2);
  const [first, second] = U.cards;
  const gapMark = second.layers[U.gap.layer].mark.key;
  const lifted = (card: (typeof U.cards)[number]) => playOf(id, card.key).find((play) => play.on["--y"] === 0)!;

  it("sets both cards down on their stacks, then lifts the first, then the second", () => {
    for (const card of U.cards) expect(before(id)[card.key], card.key).toMatchObject({ autoAlpha: 0, "--y": card.lift });
    expect(lifted(first).at).toBeGreaterThan(startOf(id, first.key));
    expect(lifted(second).at).toBeGreaterThan(endOf(id, first.verdict.key) - 0.75);
  });

  it("shows each card's layers only as it lifts, from the bottom up, in the script's order", () => {
    for (const card of U.cards) {
      const starts = card.layers.map((layer) => startOf(id, layer.key));
      expect(starts[0], card.key).toBeGreaterThan(lifted(card).at);
      for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(starts[i - 1]);
    }
  });

  it("ticks the first card's three layers in turn, then calls it ready, with the first line as it lifts", () => {
    const ticks = first.layers.map((layer) => startOf(id, layer.mark.key));
    for (let i = 1; i < ticks.length; i++) expect(ticks[i]).toBeGreaterThan(ticks[i - 1]);
    expect(ticks[0]).toBeGreaterThan(endOf(id, first.layers.at(-1)!.key) - 0.01);
    expect(startOf(id, first.verdict.key)).toBeGreaterThan(ticks.at(-1)!);
    expect(startOf(id, a)).toBeGreaterThan(lifted(first).at);
    expect(startOf(id, a)).toBeLessThan(ticks[0]);
  });

  it("ticks the second card's other layers, then marks its gap, with the second line, then its verdict", () => {
    const ticks = second.layers.filter((_, i) => i !== U.gap.layer).map((layer) => startOf(id, layer.mark.key));
    expect(startOf(id, U.gap.key)).toBeGreaterThan(Math.max(...ticks));
    expect(startOf(id, gapMark)).toBeGreaterThan(startOf(id, U.gap.key));
    expect(startOf(id, b)).toBeGreaterThan(startOf(id, gapMark));
    expect(startOf(id, second.verdict.key)).toBeGreaterThan(startOf(id, gapMark));
  });

  it("draws the gap only on the second card's data layer, as a grey mark and never a tick", () => {
    expect(tagOf(gapMark)).toContain("method-gap");
    expect(tagOf(gapMark)).not.toContain("dk-pass-tick");
    expect(markup.match(/dk-pass-tick"/g) ?? []).toHaveLength(5);
    expect(tagOf(U.gap.key)).toContain("method-stratum--gap");
    expect(after(second.layers[U.gap.layer].key).indexOf(`data-build="${U.gap.key}"`)).toBeLessThan(after(second.layers[U.gap.layer].key).indexOf("</g>"));
  });

  it("ends on the two cards lifted, their layers showing, five ticks, one gap and both verdicts", () => {
    for (const card of U.cards) {
      expect(end[card.key], card.key).toMatchObject({ autoAlpha: 1, "--y": 0 });
      for (const layer of card.layers) expect(end[layer.key].autoAlpha, layer.key).toBe(1);
      for (const layer of card.layers) expect(end[layer.mark.key].autoAlpha, layer.mark.key).toBe(1);
      expect(end[card.verdict.key].autoAlpha, card.verdict.key).toBe(1);
    }
    expect(end[U.gap.key].autoAlpha).toBe(1);
    expect(end[gapMark]["--s"]).toBe(1);
  });
});

describe("slide 17", () => {
  const id = stepOf("plain-tool");
  const end = at(id);
  const [a, b] = storyKeys(storyId("plain-tool"), 2);
  const builds = P.tools.map((tool) => startOf(id, tool.built));
  /** What an element holds: the markup from its opening tag to the end tag that closes it. */
  const inner = (key: string) => {
    const rest = after(key);
    let depth = 1;
    for (const match of rest.matchAll(/<(\/?)g\b[^>]*>/g)) {
      depth += match[1] ? -1 : 1;
      if (depth === 0) return rest.slice(0, match.index);
    }
    return rest;
  };

  it("opens the three outlines, named, before the months bar draws", () => {
    for (const tool of P.tools) {
      expect(startOf(id, tool.outline), tool.outline).toBeLessThan(startOf(id, P.months.key));
      expect(startOf(id, tool.name.key), tool.name.key).toBeLessThan(startOf(id, P.months.key));
    }
  });

  it("draws the months bar slowly, its name coming up on it, and builds nothing while it draws", () => {
    const [months] = playOf(id, P.months.key);
    expect(months.duration).toBeGreaterThanOrEqual(2);
    expect(startOf(id, P.months.name.key)).toBeGreaterThan(months.at);
    expect(startOf(id, P.months.name.key)).toBeLessThan(endOf(id, P.months.key));
    for (const [i, tool] of P.tools.entries()) expect(builds[i], tool.built).toBeGreaterThanOrEqual(endOf(id, P.months.key));
  });

  it("brings the team up, named, after the months bar and before the days bar", () => {
    expect(startOf(id, P.team.key)).toBeGreaterThanOrEqual(endOf(id, P.months.key));
    expect(endOf(id, P.team.name.key)).toBeLessThanOrEqual(startOf(id, P.days.key));
    expect(startOf(id, P.team.name.key)).toBeGreaterThanOrEqual(startOf(id, P.team.key));
    expect(inner(P.team.key)).toContain(`data-build="${P.team.name.key}"`);
    expect(playOf(id, P.team.name.key)).toHaveLength(1);
  });

  it("draws the days bar far quicker than the months bar, and builds the three tools in turn while it draws, each outline going as its tool fills", () => {
    const [days] = playOf(id, P.days.key);
    const [months] = playOf(id, P.months.key);
    expect(days.duration).toBeLessThan(months.duration);
    expect(startOf(id, P.days.name.key)).toBeGreaterThan(days.at);
    P.tools.forEach((tool, i) => {
      expect(builds[i], tool.built).toBeGreaterThanOrEqual(days.at);
      expect(builds[i], tool.built).toBeLessThan(days.at + days.duration);
      if (i > 0) expect(builds[i], tool.built).toBeGreaterThan(builds[i - 1]);
      const [, gone] = playOf(id, tool.outline);
      expect(gone.at, tool.outline).toBeGreaterThan(builds[i]);
    });
    for (const agent of P.team.agents) expect(startOf(id, agent.key) <= days.at + 0.5 && endOf(id, agent.key) > days.at, agent.key).toBe(true);
  });

  it("never moves the team once it is up", () => {
    expect(playOf(id, P.team.key)).toHaveLength(1);
    expect(playOf(id, P.team.key)[0].on).toEqual({ autoAlpha: 1 });
  });

  it("tells the first line as the days bar draws and the second once the last tool is built", () => {
    expect(startOf(id, a)).toBeGreaterThan(startOf(id, P.days.key));
    expect(startOf(id, a)).toBeLessThan(endOf(id, P.days.key));
    expect(startOf(id, b)).toBeGreaterThanOrEqual(endOf(id, P.tools[2].built));
  });

  it("gives no finished tool a badge or a word: what each shows is drawn", () => {
    for (const tool of P.tools) {
      const start = markup.indexOf(tagOf(tool.built));
      const stop = markup.indexOf(tagOf(tool.inside)) + tagOf(tool.inside).length;
      const drawn = markup.slice(start, markup.indexOf("</g>", stop));
      expect(drawn, tool.key).not.toMatch(/<text|dk-agent|data-role/);
    }
  });

  it("ends on the long months bar over the short days bar, both named, and the three finished tools beside their team", () => {
    for (const bar of [P.months, P.days]) {
      expect(end[bar.key]["--k"], bar.key).toBe(1);
      expect(end[bar.name.key].autoAlpha, bar.name.key).toBe(1);
    }
    for (const tool of P.tools) {
      expect(end[tool.outline].autoAlpha, tool.outline).toBe(0);
      expect(end[tool.built], tool.built).toMatchObject({ "--d": 1, "--k": 1 });
      expect(end[tool.inside].autoAlpha, tool.inside).toBe(1);
      expect(end[tool.name.key].autoAlpha, tool.name.key).toBe(1);
    }
    expect(end[P.team.key].autoAlpha).toBe(1);
    expect(end[P.team.person.key]["--d"]).toBe(1);
    expect(end[P.team.name.key].autoAlpha).toBe(1);
    for (const agent of P.team.agents) expect(end[agent.key], agent.key).toMatchObject({ autoAlpha: 1, "--k": 1 });
  });
});
