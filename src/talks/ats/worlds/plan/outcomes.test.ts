/**
 * Slide 15, in the order its They see gives: the six tiles, named once; the
 * first lighting and naming itself; project dots rising and attaching, most
 * to the first; the grey tally drawing and fading, and in its place the
 * measure line from its first point to the point it aims at, with the
 * nameplate under it.
 */
import { describe, expect, it } from "vitest";
import { labelsOf } from "./layout";
import { OUTCOMES } from "./layout-outcomes";
import { at, clickOf, endOf, longest, playOf, showsAtEnd, startOf } from "./harness";

const click = clickOf("outcomes");
const O = OUTCOMES;
const M = O.measure;
const end = at(click);

describe("15, measure outcomes, not pilots", () => {
  it("draws the six tiles under the plan's name, then lights the first and names it", () => {
    const tiles = Math.max(...O.tiles.map((tile) => endOf(click, tile.key)));
    expect(startOf(click, O.lit.key)).toBeGreaterThanOrEqual(tiles);
    expect(startOf(click, O.name.key)).toBeGreaterThan(startOf(click, O.lit.key));
    for (const key of [O.plan.key, O.lit.key, O.name.key, ...O.tiles.map((tile) => tile.key)]) expect(showsAtEnd(click, key), key).toBe(true);
  });

  it("raises the project dots from below once the first tile is named, and leaves them attached", () => {
    const named = endOf(click, O.name.key);
    for (const dot of O.dots) {
      expect(startOf(click, dot.key), dot.key).toBeGreaterThanOrEqual(named);
      const [rise] = playOf(click, dot.key, "y");
      expect(rise.on.y).toBe(0);
      expect(showsAtEnd(click, dot.key), dot.key).toBe(true);
      expect(end[dot.key].y).toBe(0);
    }
  });

  it("draws the grey tally stroke by stroke once the dots are on, named, then fades it before the measure comes", () => {
    const dots = Math.max(...O.dots.map((dot) => endOf(click, dot.key)));
    const strokes = O.tally.strokes.map((stroke) => startOf(click, stroke.key));
    expect(strokes[0]).toBeGreaterThanOrEqual(dots);
    strokes.slice(1).forEach((t, i) => expect(t).toBeGreaterThan(strokes[i]));
    const fade = playOf(click, O.tally.key, "autoAlpha").find((play) => play.on.autoAlpha === 0)!;
    expect(fade.at).toBeGreaterThanOrEqual(Math.max(...O.tally.strokes.map((stroke) => endOf(click, stroke.key))));
    expect(startOf(click, M.start.key)).toBeGreaterThan(fade.at);
    expect(startOf(click, M.key)).toBeGreaterThan(fade.at);
    expect(showsAtEnd(click, O.tally.key)).toBe(false);
    expect(showsAtEnd(click, O.tally.label.key)).toBe(false);
  });

  it("draws the measure from its first point to the point it aims at, each named as it comes, then the nameplate under it", () => {
    expect(startOf(click, M.key)).toBeGreaterThan(startOf(click, M.start.key));
    expect(startOf(click, M.startLabel.key)).toBeLessThan(startOf(click, M.key));
    expect(startOf(click, M.end.key)).toBeGreaterThan(startOf(click, M.key));
    expect(startOf(click, M.endLabel.key)).toBeGreaterThan(startOf(click, M.end.key) - 0.2);
    expect(startOf(click, O.plate.key)).toBeGreaterThanOrEqual(endOf(click, M.key));
    for (const key of [M.key, M.start.key, M.end.key, M.startLabel.key, M.endLabel.key, O.plate.key]) expect(showsAtEnd(click, key), key).toBe(true);
    expect(end[M.key]["--d"]).toBe(1);
  });

  it("raises story line A with the tally and B with the measure, and ends on the nameplate", () => {
    const fade = playOf(click, O.tally.key, "autoAlpha").find((play) => play.on.autoAlpha === 0)!;
    expect(startOf(click, "story.outcomes.a")).toBeGreaterThan(startOf(click, O.tally.strokes[0].key));
    expect(startOf(click, "story.outcomes.a")).toBeLessThan(fade.at);
    expect(startOf(click, "story.outcomes.b")).toBeGreaterThan(startOf(click, M.key));
    expect(startOf(click, "story.outcomes.b")).toBeLessThan(startOf(click, O.plate.key));
    expect(longest(click)).toBe(endOf(click, O.plate.key));
  });

  it("shows the script's labels in the order it gives them", () => {
    expect([O.plan.text, O.name.text, O.tally.label.text, M.startLabel.text, M.endLabel.text, O.plate.text]).toEqual(labelsOf("outcomes"));
  });
});
