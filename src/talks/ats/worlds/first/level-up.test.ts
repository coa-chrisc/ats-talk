/**
 * Slide 22, in the order its They see gives: the pyramid's tiers lighting
 * green in turn from the base, each named and captioned; the row of
 * developers at their desks beside it, named once, under the grey tag; the
 * slab sliding under the desks, the row lifting, and the tag turning green
 * with its new words; the figure at the foot.
 */
import { describe, expect, it } from "vitest";
import { labelsOf } from "./layout-plan";
import { LEVEL_UP, LIFT } from "./layout-level-up";
import { at, clickOf, endOf, longest, playOf, showsAtEnd, startOf } from "./harness";

const click = clickOf("level-up");
const L = LEVEL_UP;
const before = at(clickOf("lanes"));
const end = at(click);

describe("22, level up the staff the City has", () => {
  it("draws the pyramid, then lights its tiers green in turn from the base, each named and captioned as it lights", () => {
    const outlines = Math.max(...L.tiers.map((tier) => endOf(click, tier.key)));
    const lights = L.tiers.map((tier) => startOf(click, tier.lit));
    expect(lights[0]).toBeGreaterThanOrEqual(outlines);
    lights.slice(1).forEach((t, i) => expect(t).toBeGreaterThan(lights[i]));
    L.tiers.forEach((tier, i) => {
      expect(startOf(click, tier.name.key)).toBeGreaterThan(lights[i]);
      expect(startOf(click, tier.caption.key)).toBeGreaterThan(lights[i]);
      if (i < 2) expect(startOf(click, tier.name.key)).toBeLessThan(lights[i + 1]);
      for (const key of [tier.lit, tier.name.key, tier.caption.key]) expect(showsAtEnd(click, key), key).toBe(true);
    });
  });

  it("draws the row of developers once the pyramid is lit, named once, the grey tag over them", () => {
    const lit = Math.max(...L.tiers.map((tier) => endOf(click, tier.lit)));
    for (const desk of L.row.desks) {
      expect(startOf(click, desk.key), desk.key).toBeGreaterThanOrEqual(lit);
      expect(end[desk.key]["--d"]).toBe(1);
      expect(end[`${desk.key}.person`]["--d"]).toBe(1);
    }
    const desks = Math.max(...L.row.desks.map((desk) => startOf(click, desk.key)));
    expect(startOf(click, L.label.key)).toBeGreaterThan(startOf(click, L.row.desks[0].key));
    expect(startOf(click, L.tag.grey.key)).toBeGreaterThan(desks);
  });

  it("slides the slab in under the desks from the left once the row is drawn, the row and slab starting low", () => {
    const row = Math.max(...L.row.desks.map((desk) => endOf(click, desk.key)));
    const [slide] = playOf(click, L.slab.key, "x");
    expect(slide.at).toBeGreaterThanOrEqual(row);
    const [tag] = playOf(click, L.tag.grey.key, "autoAlpha");
    expect(slide.at).toBeGreaterThanOrEqual(tag.at + tag.duration);
    expect(before[L.slab.key].x).toBe(L.slab.from);
    expect(before[L.row.key].y).toBe(LIFT);
    expect(before[L.slab.key].y).toBe(LIFT);
  });

  it("lifts the row and the slab together once the slab is under them, and turns the tag green with its new words as they rise", () => {
    const [slide] = playOf(click, L.slab.key, "x");
    const [row] = playOf(click, L.row.key, "y");
    const [slab] = playOf(click, L.slab.key, "y");
    expect({ at: slab.at, duration: slab.duration, ease: slab.ease }).toEqual({ at: row.at, duration: row.duration, ease: row.ease });
    expect(row.at).toBeGreaterThanOrEqual(slide.at + slide.duration);
    const grey = playOf(click, L.tag.grey.key, "autoAlpha").find((play) => play.on.autoAlpha === 0)!;
    const green = startOf(click, L.tag.green.key);
    expect(grey.at).toBeGreaterThan(row.at);
    expect(green).toBeGreaterThan(grey.at);
    expect(green).toBeLessThan(row.at + row.duration);
    expect(end[L.row.key].y).toBe(0);
    expect(end[L.slab.key].y).toBe(0);
    expect(showsAtEnd(click, L.tag.grey.key)).toBe(false);
    expect(showsAtEnd(click, L.tag.green.key)).toBe(true);
  });

  it("brings the figure and its caption up together at the foot last, and ends on them", () => {
    const [row] = playOf(click, L.row.key, "y");
    expect(startOf(click, L.figure.key)).toBeGreaterThan(row.at + row.duration);
    expect(startOf(click, L.caption.key)).toBe(startOf(click, L.figure.key));
    expect(longest(click)).toBe(endOf(click, L.figure.key));
  });

  it("raises story line A with the tiers and B with the lift", () => {
    const [row] = playOf(click, L.row.key, "y");
    expect(startOf(click, "story.level-up.a")).toBeGreaterThan(startOf(click, L.tiers[0].lit));
    expect(startOf(click, "story.level-up.a")).toBeLessThan(startOf(click, L.row.desks[0].key));
    expect(startOf(click, "story.level-up.b")).toBeGreaterThan(row.at);
    expect(startOf(click, "story.level-up.b")).toBeLessThan(startOf(click, L.figure.key));
  });

  it("shows the script's labels in the order it gives them", () => {
    expect([...L.tiers.flatMap((tier) => [tier.name.text, tier.caption.text]), L.label.text, L.tag.grey.text, L.slab.label.text, L.tag.green.text, L.figure.text, L.caption.text]).toEqual(labelsOf("level-up"));
  });
});
