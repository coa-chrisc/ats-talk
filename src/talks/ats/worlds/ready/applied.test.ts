/**
 * Slide 28, in the order its They see gives: the four panels left to right,
 * each numbered and named as its edge closes; then under each panel in turn
 * its green line, its tile on the line's end and the passed tick on its
 * corner; line A with the first tile, line B with the third; the slide ends
 * on the last tick.
 */
import { storyKeys } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { at, endOf, lastLanding, showsAfter, startOf } from "./harness";
import { APPLIED } from "./layout-applied";
import { TILES } from "./steps-applied";

const click = "applied.play";
const A = APPLIED;
const [LINE_A, LINE_B] = storyKeys("story.applied", 2);
const start = (key: string) => startOf(click, key);

describe("28, the four lessons applied", () => {
  it("reveals the familiar panels together, each numbered and named", () => {
    const starts = A.panels.map((panel) => start(panel.key));
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
    expect(new Set(starts).size).toBe(1);
    for (const panel of A.panels) {
      expect(at(click)[panel.key]["--d"]).toBe(1);
      expect(start(panel.numeral.key)).toBe(start(panel.key));
      expect(start(panel.numeral.key)).toBeLessThan(endOf(click, panel.key));
      expect(start(panel.name.key)).toBe(start(panel.numeral.key));
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

  it("reveals both supporting sentences after the last tick", () => {
    expect(start(LINE_A)).toBeGreaterThan(endOf(click, A.panels[3].tick.key));
    expect(start(LINE_B)).toBe(start(LINE_A));
  });

  it("ends on the supporting text after the last tick", () => {
    expect(endOf(click, LINE_B)).toBe(lastLanding(click));
  });
});
