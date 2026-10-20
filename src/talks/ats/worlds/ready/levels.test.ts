/**
 * Slide 16, in the order its They see gives: the four bands top to bottom,
 * each with its name and caption; then the short list, each agent landing
 * in its band and dropping into its row before its level and nameplate come
 * up; the grey tag last; line A with the bands, line B with the tag.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { LEVELS } from "./layout-levels";
import { at, endOf, movesOf, playOf, showsAfter, startOf, world } from "./harness";

const click = "levels.play";
const L = LEVELS;
const [A, B] = storyKeys("story.levels", 2);
const start = (key: string) => startOf(click, key);

describe("16, the four levels", () => {
  it("grows the bands one after another, top to bottom, each from its left edge", () => {
    const starts = L.bands.map((band) => start(band.key));
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
    expect(new Set(starts).size).toBe(4);
    for (const band of L.bands) expect(at(click)[band.key]["--k"]).toBe(1);
  });

  it("names and captions each band as it grows, not after a pause", () => {
    for (const band of L.bands) {
      expect(start(band.name.key)).toBeGreaterThan(start(band.key));
      expect(start(band.name.key)).toBeLessThan(endOf(click, band.key));
      expect(start(band.caption.key)).toBeLessThan(endOf(click, band.key));
    }
  });

  it("brings line A in with the bands, before any agent", () => {
    expect(start(A)).toBeGreaterThan(start(L.bands[0].key));
    expect(start(A)).toBeLessThan(Math.min(...L.rows.map((row) => start(row.agent.key))));
  });

  it("puts each agent in its band, then drops it into its row, then names its level and owner", () => {
    for (const row of L.rows) {
      const [shown] = movesOf(click, row.agent.key, "autoAlpha");
      const [drop] = movesOf(click, row.agent.key, "y");
      expect(world.states[0][row.agent.key]).toMatchObject({ y: row.agent.drop, autoAlpha: 0 });
      expect(drop.on.y).toBe(0);
      expect(drop.at).toBeGreaterThanOrEqual(shown.at + shown.duration);
      expect(start(row.name.key)).toBeGreaterThan(drop.at);
      expect(start(row.plate.key)).toBeGreaterThan(start(row.name.key));
      expect(at(click)[row.agent.key]).toMatchObject({ y: 0, autoAlpha: 1 });
    }
    // One agent at a time: each is put in its band only once the one before has landed in its row.
    L.rows.slice(1).forEach((row, i) => expect(start(row.agent.key)).toBeGreaterThanOrEqual(endOf(click, L.rows[i].agent.key)));
  });

  it("brings the grey tag after the list, and line B with it, and ends on the bands and the list", () => {
    expect(start(L.tag.key)).toBeGreaterThanOrEqual(Math.max(...L.rows.map((row) => endOf(click, row.plate.key))));
    expect(start(B)).toBeGreaterThanOrEqual(start(L.tag.key));
    expect(playOf(click, B)).toHaveLength(1);
    for (const key of [L.tag.key, ...L.rows.flatMap((row) => [row.agent.key, row.name.key, row.plate.key])]) expect(showsAfter(click, key), key).toBe(true);
  });
});
