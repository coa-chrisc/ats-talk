/**
 * Slides 13 and 16 as they play: the wall filling, its tags and the card the
 * hand lifts; then the same wall turning into dots on the chart. Each click
 * follows its They see in order and ends on the picture it describes.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { GOOD_IDEAS, LIFTED } from "./layout-good-ideas";
import { SORT } from "./layout-sort";
import { arrived, at, before, endOf, markup, playOf, startOf, stepOf, tagOf } from "./harness";

const G = GOOD_IDEAS;
const S = SORT;

describe("slide 13", () => {
  const id = stepOf("good-ideas");
  const end = at(id);
  const [a, b] = storyKeys(storyId("good-ideas"), 2);
  const cards = G.cards.map((card) => card.key);
  const tags = G.tags.map((tag) => tag.key);

  it("names the wall once as it comes, before any card", () => {
    expect(startOf(id, G.name.key)).toBeLessThan(Math.min(...cards.map((key) => startOf(id, key))));
    expect(playOf(id, G.name.key)).toHaveLength(1);
  });

  it("fills the wall in waves that come faster and faster, the first card first", () => {
    const waveStart = G.waves.map((wave) => Math.min(...wave.map((n) => startOf(id, cards[n]))));
    for (let w = 1; w < waveStart.length; w++) expect(waveStart[w]).toBeGreaterThan(waveStart[w - 1]);
    const gaps = waveStart.slice(1).map((t, w) => t - waveStart[w]);
    for (let w = 1; w < gaps.length; w++) expect(gaps[w]).toBeLessThan(gaps[w - 1]);
    expect(startOf(id, cards[LIFTED])).toBe(waveStart[0]);
  });

  it("tags the four cards once the wall is full, one after another, with the first line", () => {
    const full = Math.max(...cards.map((key) => arrived(id, key)));
    const starts = tags.map((key) => startOf(id, key));
    expect(starts[0]).toBeGreaterThan(full);
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(starts[i - 1]);
    expect(startOf(id, a)).toBeGreaterThan(starts[0]);
    expect(startOf(id, a)).toBeLessThan(endOf(id, tags[3]));
  });

  it("brings the hand in after the tags, and lifts the card with it, the two moving as one", () => {
    expect(startOf(id, G.hand.key)).toBeGreaterThan(endOf(id, tags[3]));
    const [, carry] = playOf(id, G.hand.key);
    const lift = playOf(id, cards[LIFTED]).find((play) => "--s" in play.on)!;
    expect(lift).toMatchObject({ at: carry.at, duration: carry.duration, ease: carry.ease });
    expect(startOf(id, b)).toBeGreaterThan(lift.at);
  });

  it("ends on the crowded wall with its four tags and the one card held up by the hand", () => {
    for (const key of [G.wall.key, G.name.key, ...cards, ...tags, G.hand.key]) expect(end[key].autoAlpha, key).toBe(1);
    for (const key of tags) expect(end[key]["--s"], key).toBe(1);
    expect(end[cards[LIFTED]]).toMatchObject({ "--x": G.lift.x, "--y": G.lift.y, "--s": G.lift.scale });
    expect(end[G.hand.key]).toMatchObject({ "--x": G.hand.carry.x, "--y": G.hand.carry.y });
    for (const card of G.cards.filter((_, n) => n !== LIFTED)) expect(end[card.key]["--x"], card.key).toBe(0);
  });
});

describe("slide 16", () => {
  const id = stepOf("sort");
  const end = at(id);
  const [a, b] = storyKeys(storyId("sort"), 2);
  const turned = (card: (typeof S.cards)[number]) => playOf(id, card.dot.key)[0];
  const flown = (card: (typeof S.cards)[number]) => playOf(id, card.dot.key)[1];

  it("shows slide 13's wall again before its cards turn into dots, each dot where its card hung", () => {
    const shown = arrived(id, S.wall.key);
    for (const card of S.cards) {
      expect(startOf(id, card.key), card.key).toBeGreaterThan(shown);
      expect(before(id)[card.dot.key], card.dot.key).toMatchObject({ x: card.dot.from.x, y: card.dot.from.y, autoAlpha: 0 });
      expect(turned(card).at, card.dot.key).toBeGreaterThan(startOf(id, card.key));
    }
  });

  it("flies the dots as soon as the last card has turned, the chart drawing under them as they go, its sides named with the first line", () => {
    const lastTurn = Math.max(...S.cards.map((card) => turned(card).at + turned(card).duration));
    const firstFlight = Math.min(...S.cards.map((card) => flown(card).at));
    const lastFlight = Math.max(...S.cards.map((card) => flown(card).at));
    expect(firstFlight - lastTurn).toBeLessThanOrEqual(0.5);
    // The dots are already moving when the axes start, and the axes start while the first are still in the air.
    expect(startOf(id, S.chart.key)).toBeGreaterThanOrEqual(firstFlight);
    expect(startOf(id, S.chart.key)).toBeLessThan(firstFlight + flown(S.cards[0]).duration);
    // The quarter lines cross the wall's middle row, so they draw only once every dot is on its way.
    expect(startOf(id, S.chart.mid.key)).toBeGreaterThan(lastFlight);
    expect(startOf(id, S.chart.impact.key)).toBeLessThan(startOf(id, S.chart.feasibility.key));
    expect(startOf(id, a)).toBeGreaterThan(startOf(id, S.chart.key));
  });

  it("colours every dot alike, as the script names no difference between them", () => {
    const classes = new Set(S.cards.map((card) => tagOf(card.dot.key).match(/class="([^"]+)"/)?.[1]));
    expect([...classes]).toEqual(["method-dot"]);
    expect(markup).not.toContain("method-dot--");
  });

  it("lights the top right once the dots have settled, then names it, with the second line", () => {
    const settled = Math.max(...S.cards.map((card) => flown(card).at + flown(card).duration));
    expect(startOf(id, S.corner.key)).toBeGreaterThan(settled);
    expect(startOf(id, S.start.key)).toBeGreaterThan(startOf(id, S.corner.key));
    expect(startOf(id, b)).toBeGreaterThan(startOf(id, S.start.key));
  });

  it("ends on the chart with its dots settled and the top right corner lit, the wall gone", () => {
    expect(end[S.wall.key].autoAlpha).toBe(0);
    for (const card of S.cards) expect(end[card.dot.key], card.dot.key).toMatchObject({ autoAlpha: 1, x: 0, y: 0 });
    for (const key of [S.chart.key, S.chart.mid.key]) expect(end[key]["--d"], key).toBe(1);
    for (const key of [S.chart.impact.key, S.chart.feasibility.key, S.start.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[S.corner.key]["--k"]).toBe(1);
  });
});
