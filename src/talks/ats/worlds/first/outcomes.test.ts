/**
 * Slide 23, measuring outcomes: one trip from a resident to a staff
 * figure, the card stopping there under a person's mark and never passing
 * the closed gate; the bracket under the trip as the only scale, with no
 * number on it; the baseline pinned at its end and the target off it; each
 * of the rest beside the drawing it names; every part in the field and
 * clear of the rest.
 */
import { describe, expect, it } from "vitest";
import { box } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { apart, arrived, at, endOf, inside, markup, playOf, startOf, texts } from "./harness";
import { OUTCOMES as O, OUTCOMES_PARTS as P } from "./layout-outcomes";
import { SAFE, contentTop } from "./layout-plan";

const CLICK = "outcomes.play";
/** Times are sums of floating-point steps: "not before" allows this much early. */
const EARLY = -1e-9;
const FIELD = box(SAFE.left, contentTop("outcomes"), SAFE.right - SAFE.left, SAFE.bottom - contentTop("outcomes"));
const pairs = <T,>(list: readonly T[]) => list.flatMap((a, i) => list.slice(i + 1).map((b) => [a, b] as const));
const right = (b: { x: number; w: number }) => b.x + b.w;

describe("23, measuring outcomes", () => {
  it("sets the script's fourteen labels, in order, each whole, with no number among them", () => {
    const words = shown("outcomes", "play");
    expect(words).toHaveLength(14);
    expect(words[0]).toMatch(/^Illustrative project:/);
    const own = texts.filter((text) => words.includes(text));
    expect(own).toEqual(words);
    for (const label of words) expect(label, label).not.toMatch(/[0-9%]/);
    expect(markup).not.toContain('data-build="outcomes.panel.');
  });

  it("sends the request card along the line once, to the staff figure, where it stops and waits short of the gate", () => {
    const travels = playOf(CLICK, O.card.key, "x");
    expect(travels).toHaveLength(1);
    expect(travels[0].at).toBeGreaterThanOrEqual(EARLY + startOf(CLICK, O.route.key));
    expect(at(CLICK)[O.card.key].x).toBe(O.card.travel);
    expect(O.card.from.x + O.card.travel).toBe(P.card.x);
    expect(right(P.card)).toBeLessThanOrEqual(P.staff.x);
    expect(right(P.card)).toBeLessThan(P.gate.x);
    expect(P.staff.x + P.staff.w).toBeLessThan(P.gate.x);
  });

  it("lands the person's mark by the staff figure once the card has stopped, clear of the card", () => {
    expect(startOf(CLICK, O.mark.key)).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, O.card.key, "x"));
    expect(apart(P.mark, P.card, 8)).toBe(true);
    expect(P.mark.x).toBeLessThan(P.staff.x);
    expect(right(P.mark)).toBeGreaterThan(P.staff.x);
    expect(at(CLICK)[O.mark.key]["--d"]).toBe(1);
  });

  it("draws the bracket under the trip from the request to the approval, then pins the baseline at its end and sets the target off it", () => {
    expect(startOf(CLICK, O.bracket.key)).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, O.mark.key));
    expect(O.bracket.x0).toBe(P.cardFrom.x + P.cardFrom.w / 2);
    expect(O.bracket.x1).toBe(P.staff.x + P.staff.w / 2);
    expect(startOf(CLICK, O.measure.key)).toBeGreaterThanOrEqual(EARLY + startOf(CLICK, O.bracket.key));
    expect(startOf(CLICK, O.pin.key)).toBeGreaterThanOrEqual(EARLY + endOf(CLICK, O.bracket.key));
    expect(P.pin.x + P.pin.w / 2).toBe(O.bracket.x1);
    expect(startOf(CLICK, O.target.key)).toBeGreaterThanOrEqual(EARLY + arrived(CLICK, O.pin.key));
    // Off the bracket: the target's tag starts right of the bracket's end and under the pin.
    expect(P.target.x).toBeGreaterThan(O.bracket.x1);
    expect(P.target.y).toBeGreaterThan(P.pin.y + P.pin.h);
  });

  it("then gives the rest in turn, each by its drawing: the owner, the magnifier over the waiting card, the closed gate", () => {
    const order = [O.target.key, O.owner.key, O.lens.key, O.quality.key, O.gate.key, O.expansion.key];
    for (let i = 1; i < order.length; i++) expect(startOf(CLICK, order[i]), order[i]).toBeGreaterThanOrEqual(EARLY + startOf(CLICK, order[i - 1]));
    expect(startOf(CLICK, O.owner.key)).toBeGreaterThanOrEqual(EARLY + arrived(CLICK, O.target.key));
    // The magnifier passes once and comes to rest over the card.
    expect(playOf(CLICK, O.lens.key, "x")).toHaveLength(1);
    expect(at(CLICK)[O.lens.key].x).toBe(0);
    expect(O.lens.at).toEqual({ x: P.card.x + P.card.w / 2, y: P.card.y + P.card.h / 2 });
    // The owner's words over the staff figure, the gate's before it on the line.
    expect(P.owner[1].y + P.owner[1].h).toBeLessThanOrEqual(P.staff.y);
    expect(right(P.expansion[1])).toBeLessThan(P.gate.x);
    expect(at(CLICK)[O.gate.key].autoAlpha).toBe(1);
  });

  it("lets each person's white come in only as its line draws, so an undrawn one never covers another slide", () => {
    for (const key of [O.resident.key, O.staff.key, "budget.person.0", "budget.person.1", "budget.person.2"])
      expect(markup, key).toMatch(new RegExp(`<g class="[^"]*\\bfs-cast\\b[^"]*"><g class="dk-person" data-build="${key.replace(/\./g, "\\.")}"`));
  });

  it("keeps every part in the field, under the story band and over the frame's foot", () => {
    expect(contentTop("outcomes")).toBe(556);
    const all = [P.tag, P.resident, P.staff, P.cardFrom, P.card, P.mark, P.bracket, P.pin, P.target, P.lens, P.gate, ...P.tagWords, ...P.measure, ...P.baseline, ...P.targetWords, ...P.owner, ...P.quality, ...P.expansion];
    for (const b of all) expect(inside(b, FIELD), JSON.stringify(b)).toBe(true);
  });

  it("keeps every run of words clear of every other, inside its tag where it has one, and clear of the drawings", () => {
    const loose = [...P.measure, ...P.baseline, ...P.owner, ...P.quality, ...P.expansion];
    const words = [...P.tagWords, ...P.targetWords, ...loose];
    for (const [a, b] of pairs(words)) expect(apart(a, b), `${JSON.stringify(a)} ${JSON.stringify(b)}`).toBe(true);
    for (const w of P.tagWords) expect(inside(w, P.tag)).toBe(true);
    for (const w of P.targetWords) expect(inside(w, P.target)).toBe(true);
    for (const w of loose) for (const d of [P.tag, P.target, P.resident, P.staff, P.card, P.mark, P.bracket, P.pin, P.gate, P.lens]) expect(apart(w, d, 4), `${JSON.stringify(w)} ${JSON.stringify(d)}`).toBe(true);
  });
});
