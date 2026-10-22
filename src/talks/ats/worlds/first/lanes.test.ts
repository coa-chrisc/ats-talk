import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { at, endOf, markup, playOf, startOf, tagOf } from "./harness";
import { BELT, LANES as L, placeX } from "./layout-lanes";
const click = "lanes.play";

/** The declarations first-plan.css gives one selector, across every rule that lists it. */
const css = readFileSync(join(import.meta.dirname, "first-plan.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const ruleOf = (selector: string) =>
  [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)]
    .filter(([, selectors]) => selectors.split(",").map((s) => s.trim()).includes(selector))
    .map(([, , body]) => body)
    .join(";");

describe("delivery and foundations", () => {
  it("pauses delivery while the foundations are explained", () => {
    const initial = Math.max(...L.cards.slice(0, 4).map(p => endOf(click, p.key)));
    const foundationsStart = Math.min(...L.pieces.map(p => startOf(click, p.key)));
    const foundationsEnd = Math.max(...L.pieces.map(p => endOf(click, p.arrow.key)));
    expect(foundationsStart).toBeGreaterThan(initial);
    expect(startOf(click, L.cards[4].key)).toBeGreaterThan(foundationsEnd);
  });
  it("uses the same travel duration for both batches and finishes with eight delivered projects", () => {
    const end = at(click);
    const durations = L.cards.flatMap(p => playOf(click, p.key, "x").map(m => m.duration));
    expect(new Set(durations).size).toBe(1);
    expect(L.cards).toHaveLength(BELT.places);
    L.cards.forEach((p, i) => expect(end[p.key]).toMatchObject({ x: placeX(i), autoAlpha: 1 }));
  });
  it("outlines each foundation tile in turn, its name with it, then its arrow", () => {
    for (const [i, p] of L.pieces.entries()) {
      expect(playOf(click, p.key, "--d")).toHaveLength(1);
      expect(startOf(click, p.label.key)).toBe(startOf(click, p.key));
      expect(startOf(click, p.arrow.key)).toBeGreaterThan(startOf(click, p.key));
      if (i) expect(startOf(click, p.key)).toBeGreaterThan(startOf(click, L.pieces[i - 1].key));
      expect(at(click)[p.key]["--d"]).toBe(1);
    }
  });
  it("draws projects as the shared card, the foundations as plain tiles and the lanes as outlines, none of them the old green parts", () => {
    for (const card of L.cards) expect(tagOf(card.key)).toContain("fs-card");
    for (const lane of [L.upper, L.lower]) expect(tagOf(lane.key)).toContain("fs-strip--line");
    for (const p of L.pieces) expect(tagOf(p.key)).toContain("fs-tile");
    expect(markup).not.toMatch(/fs-parcel|fs-well|fs-strip--lower/);
  });
  it("paints a tile's white face only once its outline starts to draw, so an undrawn tile hides nothing on the world's other slides", () => {
    expect(ruleOf(".fs-tile")).toMatch(/fill-opacity:\s*min\(1, calc\(var\(--d, 0\) \* 100\)\)/);
  });
  it("centres every line of a tile's name on its own row, so a two-line name keeps its leading", () => {
    for (const p of L.pieces) {
      const text = markup.slice(markup.indexOf(tagOf(p.label.key)), markup.indexOf("</text>", markup.indexOf(tagOf(p.label.key))));
      expect(tagOf(p.label.key)).not.toContain("dy=");
      const rows = text.match(/<tspan[^>]*>/g) ?? [];
      expect(rows).toHaveLength(p.label.lines.length);
      for (const row of rows) expect(row).toContain('dy="0.35em"');
    }
  });
});
