import { describe, expect, it } from "vitest";
import { at, endOf, playOf, startOf } from "./harness";
import { BELT, LANES as L, placeX } from "./layout-lanes";
const click = "lanes.play";
describe("delivery and foundations", () => {
  it("pauses delivery while the foundations are explained", () => {
    const initial = Math.max(...L.parcels.slice(0, 4).map(p => endOf(click, p.key)));
    const foundationsStart = Math.min(...L.pieces.map(p => startOf(click, p.key)));
    const foundationsEnd = Math.max(...L.pieces.map(p => endOf(click, p.arrow.key)));
    expect(foundationsStart).toBeGreaterThan(initial);
    expect(startOf(click, L.parcels[4].key)).toBeGreaterThan(foundationsEnd);
  });
  it("uses the same travel duration for both batches and finishes with eight delivered projects", () => {
    const end = at(click);
    const durations = L.parcels.flatMap(p => playOf(click, p.key, "x").map(m => m.duration));
    expect(new Set(durations).size).toBe(1);
    expect(L.parcels).toHaveLength(BELT.places);
    L.parcels.forEach((p, i) => expect(end[p.key]).toMatchObject({ x: placeX(i), autoAlpha: 1 }));
  });
});
