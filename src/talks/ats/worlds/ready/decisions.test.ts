/**
 * Slide 19, in the order its They see gives: the panel, then the four rows
 * one at a time, each decision with its numeral and then its nameplate;
 * line A with the second row, line B with the fourth; the grey tag last.
 * The slide's ground stays white: only the title and the close are navy.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { DECISIONS } from "./layout-decisions";
import { ROW_APART } from "./steps-decisions";
import { at, endOf, lastLanding, showsAfter, startOf } from "./harness";
import { ready } from "./world";

const click = "decisions.play";
const D = DECISIONS;
const [A, B] = storyKeys("story.decisions", 2);
const start = (key: string) => startOf(click, key);

describe("19, four decisions", () => {
  it("stays on the deck's white ground", () => {
    expect(ready.steps.find((step) => step.id === click)!.ground).toBeUndefined();
  });

  it("grows the panel before any row", () => {
    expect(at(click)[D.panel.key]).toMatchObject({ "--k": 1, autoAlpha: 1 });
    for (const row of D.rows) expect(start(row.key)).toBeGreaterThanOrEqual(endOf(click, D.panel.key) - 0.2 - 1e-9);
  });

  it("settles the rows one at a time, far enough apart to read each, its numeral with it and its nameplate after", () => {
    const starts = D.rows.map((row) => start(row.key));
    starts.slice(1).forEach((t, i) => expect(t - starts[i]).toBeGreaterThanOrEqual(ROW_APART - 0.1));
    for (const row of D.rows) {
      expect(start(row.numeral.key)).toBeLessThan(start(row.plate.key));
      expect(start(row.plate.key)).toBeGreaterThan(start(row.key));
    }
  });

  it("brings line A with the second row and line B with the fourth", () => {
    expect(start(A)).toBeGreaterThanOrEqual(start(D.rows[1].key));
    expect(start(A)).toBeLessThan(start(D.rows[2].key));
    expect(start(B)).toBeGreaterThanOrEqual(start(D.rows[3].key));
  });

  it("ends on the grey tag, after every nameplate, with the four rows showing", () => {
    expect(start(D.tag.key)).toBeGreaterThanOrEqual(Math.max(...D.rows.map((row) => endOf(click, row.plate.key))));
    expect(endOf(click, D.tag.key)).toBe(lastLanding(click));
    for (const row of D.rows) for (const key of [row.key, row.numeral.key, row.plate.key]) expect(showsAfter(click, key), key).toBe(true);
  });
});
