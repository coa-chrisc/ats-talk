/**
 * Slides 20b and 21, in the order their They see gives: the spear tip and
 * its four shafts, a visitor at the counter and the staff member turning to
 * help; the building on its foundation and ground with its plate, the path
 * laid stone by stone, left to right, to the next team's outline, which
 * fills in.
 */
import { describe, expect, it } from "vitest";
import { BUILT, READINESS } from "./layout-readiness";
import { at, clickOf, endOf, playOf, showsAtEnd, startOf } from "./harness";

describe("20b, AI readiness", () => {
  const click = clickOf("readiness");
  const S = READINESS;

  it("brings the tip in before its shafts, and fills the shafts one at a time", () => {
    const fills = S.shafts.map((shaft) => startOf(click, shaft.key));
    expect(fills[0]).toBeGreaterThanOrEqual(endOf(click, S.tip.key));
    expect([...fills].sort((a, b) => a - b)).toEqual(fills);
    for (const shaft of S.shafts) expect(at(click)[shaft.key]["--k"], shaft.key).toBe(1);
  });

  it("sets up the counter, walks the visitor to it, and only then the person behind it steps across", () => {
    const [walk] = playOf(click, S.visitor.key, "x");
    expect(walk.at).toBeGreaterThanOrEqual(endOf(click, S.counter.key));
    expect(walk.at).toBeGreaterThanOrEqual(endOf(click, S.shafts[3].name.key));
    const [step] = playOf(click, S.helper.key, "x");
    expect(step.at).toBeGreaterThanOrEqual(walk.at + walk.duration);
    expect(at(click)[S.helper.key].x).toBe(S.helper.step);
    expect(at(click)[S.visitor.key].x).toBe(0);
  });

  it("draws the shaft line behind the tip on the tip's own curve and time, so the tip leads it", () => {
    const [tip] = playOf(click, S.tip.key, "x");
    const [line] = playOf(click, S.line.key, "--d");
    expect(line).toMatchObject({ at: tip.at, duration: tip.duration, ease: tip.ease });
    expect(at(click)[S.line.key]["--d"]).toBe(1);
  });

  it("names each shaft only as its fill nears the far end, from the tip back", () => {
    for (const shaft of S.shafts) {
      const [fill] = playOf(click, shaft.key, "--k");
      expect(startOf(click, shaft.name.key) - fill.at, shaft.key).toBeGreaterThanOrEqual(fill.duration * 0.7);
    }
  });

  it("walks the visitor in over 0.8 s, then turns the helper's head over 0.3 s before they step across", () => {
    const [walk] = playOf(click, S.visitor.key, "x");
    const [turn] = playOf(click, S.helper.face.key);
    const [step] = playOf(click, S.helper.key, "x");
    expect(walk.duration).toBe(0.8);
    expect(turn.duration).toBe(0.3);
    expect(turn.at).toBeGreaterThanOrEqual(walk.at + walk.duration);
    expect(step.at).toBeGreaterThanOrEqual(turn.at + turn.duration);
    expect(at(click)[S.helper.face.key]["--k"]).toBe(1);
  });
});

describe("21, built to last", () => {
  const click = clickOf("built-to-last");
  const B = BUILT;

  it("lays the foundation before the building rises on it, and puts the plate up once it stands", () => {
    expect(startOf(click, B.first.house.key)).toBeGreaterThan(startOf(click, B.first.foundation.key));
    expect(startOf(click, B.first.plate.key)).toBeGreaterThanOrEqual(endOf(click, B.first.house.key));
  });

  it("draws the path to the next building's outline, names it, and then builds it and lets the outline go", () => {
    const stones = B.path.map((stone) => startOf(click, stone.key));
    expect([...stones].sort((a, b) => a - b)).toEqual(stones);
    expect(startOf(click, B.next.outline.key)).toBeGreaterThan(stones[0]);
    expect(startOf(click, B.next.plate.key)).toBeGreaterThan(startOf(click, B.next.outline.key));
    expect(startOf(click, B.next.house.key)).toBeGreaterThanOrEqual(endOf(click, B.next.plate.key));
    expect(at(click)[B.next.house.key]["--k"]).toBe(1);
    expect(at(click)[B.next.outline.key].autoAlpha).toBe(0);
    for (const key of [B.first.plate.key, B.next.plate.key, ...B.path.map((stone) => stone.key), B.ground.name.key]) expect(showsAtEnd(click, key), key).toBe(true);
  });
});
