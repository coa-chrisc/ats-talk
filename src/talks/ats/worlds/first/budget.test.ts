/**
 * Slide 22a, paying for AI by the work and the data: the two sides in turn,
 * each piece of work stepping the meter up as it arrives, the boundary
 * between the sides and the empty table under it last; every part in the
 * field and clear of the rest; and no price or count on the slide.
 */
import { describe, expect, it } from "vitest";
import { box, type Box } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { apart, at, bottom, endOf, inside, playOf, startOf, texts } from "./harness";
import { BUDGET as B, BUDGET_PARTS as P, METER } from "./layout-budget";
import { SAFE, contentTop } from "./layout-plan";

const CLICK = "budget.play";
/** Times are sums of floating-point steps: "not before" allows this much early. */
const EARLY = -1e-9;
const FIELD = box(SAFE.left, contentTop("budget"), SAFE.right - SAFE.left, SAFE.bottom - contentTop("budget"));
const pairs = <T,>(list: readonly T[]) => list.flatMap((a, i) => list.slice(i + 1).map((b) => [a, b] as const));
const right = (b: Box) => b.x + b.w;

describe("22a, paying for AI by the work and the data", () => {
  it("sets the script's nine labels, each whole, none over 60 characters, and no price or count among them", () => {
    const words = shown("budget", "play");
    expect(words).toHaveLength(9);
    for (const label of words) {
      expect(texts.filter((text) => text === label), label).toHaveLength(1);
      expect(label.length, label).toBeLessThanOrEqual(60);
      expect(label, label).not.toMatch(/[0-9$£€%]/);
    }
  });

  it("builds the developers' side before the metered side, and each side's words before its drawing", () => {
    expect(startOf(CLICK, B.seats.people[0].key)).toBeGreaterThanOrEqual(EARLY + startOf(CLICK, B.seats.name.key));
    for (const p of B.seats.people) expect(startOf(CLICK, p.badge.key), p.badge.key).toBeGreaterThanOrEqual(EARLY + startOf(CLICK, p.key));
    expect(startOf(CLICK, B.metered.name.key)).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, B.seats.included.key));
    expect(startOf(CLICK, B.metered.yard.key)).toBeGreaterThanOrEqual(EARLY + startOf(CLICK, B.metered.caption.key));
    expect(startOf(CLICK, B.metered.agent.key)).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, B.metered.yard.key));
  });

  it("steps the meter up one cell as each piece of work arrives, in turn, and leaves it three cells up of four", () => {
    expect(METER.cells).toBe(4);
    expect(B.metered.cells).toHaveLength(3);
    B.metered.tokens.forEach((token, i) => {
      const [travel] = playOf(CLICK, token.key, "x");
      expect(travel.at, token.key).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, B.metered.meter.key));
      if (i > 0) expect(travel.at, token.key).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, B.metered.tokens[i - 1].key));
      const cell = B.metered.cells[i];
      expect(startOf(CLICK, cell.key), cell.key).toBeGreaterThanOrEqual(EARLY + travel.at + travel.duration - 0.1);
      expect(at(CLICK)[cell.key]["--k"], cell.key).toBe(1);
      expect(at(CLICK)[token.key].autoAlpha, token.key).toBe(0);
      // The piece stops in the middle of its cell.
      expect(token.at.x + token.travel).toBeCloseTo(cell.at.x + cell.at.w / 2, 0);
    });
  });

  it("draws the boundary between the sides once the meter has stopped, and the empty table under it last", () => {
    const lastCell = B.metered.cells.at(-1)!.key;
    expect(startOf(CLICK, B.boundary.key)).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, lastCell));
    expect(startOf(CLICK, B.table.key)).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, B.boundary.key));
    expect(at(CLICK)[B.boundary.key]["--wb"]).toBe(0);
    expect(at(CLICK)[B.table.key]["--wr"]).toBe(0);
  });

  it("keeps every part in the field, under the story band's three rows and over the frame's foot", () => {
    expect(contentTop("budget")).toBe(604);
    const all = [...P.seats, ...P.people, ...P.badges, P.boundary, P.boundaryName, ...P.metered, P.yard, P.agent, P.meter, P.token, P.paid, P.table, ...P.tableWords];
    for (const b of all) expect(inside(b, FIELD), JSON.stringify(b)).toBe(true);
  });

  it("keeps the developers left of the boundary's name and line, the metered side right of them, and the table under the line", () => {
    for (const b of [...P.seats, ...P.people]) expect(right(b), JSON.stringify(b)).toBeLessThan(P.boundaryName.x);
    for (const b of [...P.metered, P.yard]) expect(b.x, JSON.stringify(b)).toBeGreaterThan(right(P.boundaryName));
    expect(P.table.x).toBeLessThan(P.boundary.x);
    expect(right(P.table)).toBeGreaterThan(right(P.boundary));
    expect(bottom(P.boundary)).toBeLessThan(P.table.y);
  });

  it("keeps every run of words clear of every other and of the drawings it is not set in", () => {
    const words = [...P.seats, P.boundaryName, ...P.metered, P.paid, ...P.tableWords];
    for (const [a, b] of pairs(words)) expect(apart(a, b), `${JSON.stringify(a)} ${JSON.stringify(b)}`).toBe(true);
    for (const w of words) for (const d of [...P.people, P.boundary, P.agent, P.meter, P.table]) expect(apart(w, d, 4), `${JSON.stringify(w)} ${JSON.stringify(d)}`).toBe(true);
    // The meter's words sit in the yard, under the meter.
    expect(inside(P.paid, P.yard)).toBe(true);
    expect(inside(P.agent, P.yard) && inside(P.meter, P.yard)).toBe(true);
  });

  it("sets each badge on its developer's chest", () => {
    P.badges.forEach((badge, i) => {
      const person = P.people[i];
      expect(inside(badge, person), `badge ${i}`).toBe(true);
      expect(badge.x + badge.w / 2).toBe(person.x + person.w / 2);
    });
  });
});
