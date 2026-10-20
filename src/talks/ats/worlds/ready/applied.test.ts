/**
 * Slide 28, in the order its They see gives: the four panels left to right,
 * each numbered and named as its edge closes; then under each panel in turn
 * its green line, its tile on the line's end and the passed tick on its
 * corner; line A with the first tile, line B with the third; the slide ends
 * on the last tick.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { APPLIED } from "./layout-applied";
import { TILES } from "./steps-applied";
import { at, endOf, lastLanding, showsAfter, startOf } from "./harness";

const click = "applied.play";
const A = APPLIED;
const [LINE_A, LINE_B] = storyKeys("story.applied", 2);
const start = (key: string) => startOf(click, key);

describe("28, the four ideas applied", () => {
  it("draws the panels left to right, each numbered and named before its edge has closed", () => {
    const starts = A.panels.map((panel) => start(panel.key));
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
    expect(new Set(starts).size).toBe(4);
    for (const panel of A.panels) {
      expect(at(click)[panel.key]["--d"]).toBe(1);
      expect(start(panel.numeral.key)).toBeGreaterThan(start(panel.key));
      expect(start(panel.numeral.key)).toBeLessThan(endOf(click, panel.key));
      expect(start(panel.name.key)).toBeGreaterThan(start(panel.numeral.key));
      expect(start(panel.name.key)).toBeLessThan(endOf(click, panel.key));
    }
  });

  it("then, panel by panel from the left, draws the line down, lands the tile on its end and lands the tick", () => {
    const last = Math.max(...A.panels.flatMap((panel) => [endOf(click, panel.key), endOf(click, panel.name.key)]));
    A.panels.forEach((panel, i) => {
      expect(start(panel.line.key)).toBeGreaterThanOrEqual(last);
      expect(start(panel.tile.key)).toBeGreaterThan(start(panel.line.key));
      expect(start(panel.tile.key)).toBeLessThan(endOf(click, panel.line.key));
      expect(start(panel.tick.key)).toBeGreaterThanOrEqual(endOf(click, panel.tile.key));
      if (i > 0) {
        expect(start(panel.line.key) - start(A.panels[i - 1].line.key)).toBeCloseTo(TILES.apart, 5);
        expect(start(panel.line.key) + 1e-9).toBeGreaterThanOrEqual(endOf(click, A.panels[i - 1].tick.key));
      }
      for (const key of [panel.line.key, panel.tile.key, panel.tick.key]) expect(showsAfter(click, key), key).toBe(true);
    });
  });

  it("brings line A with the first tile and line B with the third", () => {
    expect(start(LINE_A)).toBeCloseTo(start(A.panels[0].tile.key), 5);
    expect(start(LINE_B)).toBeCloseTo(start(A.panels[2].tile.key), 5);
  });

  it("ends on the last tick", () => {
    expect(endOf(click, A.panels[3].tick.key)).toBe(lastLanding(click));
  });
});
