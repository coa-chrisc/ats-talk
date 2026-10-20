/**
 * Slide 19b, in the order its They see gives: the row of developers, the
 * stuck marks, the long grey cycle-time bar and the pile; the slab sliding in
 * under the row and its four parts filling in turn; the row lifting with the
 * marks clearing; the bar shortening to green; the program team's box
 * joining, and the pile coming down.
 */
import { describe, expect, it } from "vitest";
import { labelBox, labelsOf } from "./layout";
import { LIFT, LIFT_DEVELOPERS } from "./layout-lift-developers";
import { apart, at, bottom, clickOf, endOf, inside, playOf, showsAtEnd, startOf } from "./harness";

const click = clickOf("lift-developers");
/** Every part as the slide before leaves it: where this slide's parts start. */
const before = at(clickOf("program-team"));
const L = LIFT_DEVELOPERS;

describe("19b, lift the developers", () => {
  it("draws the row, then marks three systems stuck, draws the long grey bar and stacks the pile, before the slab comes in", () => {
    const row = Math.max(...L.units.map((unit) => endOf(click, unit.key)));
    for (const mark of L.stuck) expect(startOf(click, mark.key), mark.key).toBeGreaterThanOrEqual(row);
    expect(startOf(click, L.cycle.key)).toBeGreaterThanOrEqual(row);
    const [slab] = playOf(click, L.slab.key, "x");
    const [long] = playOf(click, L.cycle.key, "--k");
    expect(long.on["--k"]).toBe(1);
    expect(slab.at).toBeGreaterThanOrEqual(long.at + long.duration);
    expect(slab.at).toBeGreaterThanOrEqual(Math.max(...L.backlog.cards.map((card) => startOf(click, card.key))));
    expect(before[L.slab.key].x).toBeLessThan(0);
  });

  it("fills the slab's four parts in turn once it is in, each named as it fills", () => {
    const [slab] = playOf(click, L.slab.key, "x");
    const fills = L.slab.parts.map((part) => startOf(click, part.key));
    expect(fills[0]).toBeGreaterThan(slab.at);
    fills.slice(1).forEach((start, i) => expect(start).toBeGreaterThan(fills[i]));
    L.slab.parts.forEach((part) => {
      expect(startOf(click, part.label.key), part.key).toBeGreaterThan(startOf(click, part.key));
      expect(showsAtEnd(click, part.key), part.key).toBe(true);
      expect(at(click)[part.key]["--k"], part.key).toBe(1);
    });
  });

  it("lifts the row and the slab together once the slab is full, and clears the stuck marks as they rise", () => {
    const [row] = playOf(click, L.row.key, "y");
    const [slab] = playOf(click, L.slab.key, "y");
    expect({ at: slab.at, duration: slab.duration, ease: slab.ease }).toEqual({ at: row.at, duration: row.duration, ease: row.ease });
    expect(before[L.row.key].y).toBe(LIFT);
    expect(before[L.slab.key].y).toBe(LIFT);
    expect(row.at).toBeGreaterThanOrEqual(Math.max(...L.slab.parts.map((part) => endOf(click, part.key))));
    for (const mark of L.stuck) {
      const [gone] = playOf(click, mark.key, "autoAlpha").filter((play) => play.on.autoAlpha === 0);
      expect(gone.at, mark.key).toBeGreaterThan(row.at);
      expect(showsAtEnd(click, mark.key), mark.key).toBe(false);
    }
    expect(showsAtEnd(click, L.stuckLabel.key)).toBe(false);
    expect(at(click)[L.row.key].y).toBe(0);
    expect(at(click)[L.slab.key].y).toBe(0);
  });

  it("shortens the bar from long grey to short green once the row has lifted, then brings the program team in and takes the pile down from the top", () => {
    const [row] = playOf(click, L.row.key, "y");
    const [shrink] = playOf(click, L.cycle.key, "--k").filter((play) => play.on["--k"] !== 1);
    expect(shrink.at).toBeGreaterThanOrEqual(row.at + row.duration);
    expect(shrink.on["--k"]).toBeCloseTo(L.cycle.green.at.w / L.cycle.at.w, 6);
    expect(startOf(click, L.cycle.green.key)).toBeGreaterThan(shrink.at);
    expect(showsAtEnd(click, L.cycle.green.key)).toBe(true);
    expect(startOf(click, L.team.key)).toBeGreaterThanOrEqual(endOf(click, L.cycle.green.key));
    const offs = L.backlog.cards
      .map((card, i) => ({ i, off: playOf(click, card.key, "autoAlpha").find((play) => play.on.autoAlpha === 0) }))
      .filter(({ off }) => off)
      .sort((a, b) => a.off!.at - b.off!.at);
    expect(offs.map(({ i }) => i)).toEqual([7, 6, 5, 4, 3]);
    expect(offs[0].off!.at).toBeGreaterThan(startOf(click, L.team.key));
    L.backlog.cards.forEach((card, i) => expect(showsAtEnd(click, card.key), card.key).toBe(i < 3));
    expect(showsAtEnd(click, L.team.key)).toBe(true);
  });

  it("sets each name inside its shape or clear beside it, the slab under the desks and the team's box clear of the row", () => {
    for (const part of L.slab.parts) expect(inside(labelBox(part.label.at, part.label.text, "start"), part.at), part.label.text).toBe(true);
    for (const unit of L.units) for (const part of L.slab.parts) expect(part.at.y, unit.key).toBeGreaterThan(unit.desk.foot);
    expect(inside(labelBox(L.team.name.at, L.team.name.text), L.team.at)).toBe(true);
    for (const person of L.team.people) {
      expect(inside(person, L.team.at)).toBe(true);
      expect(apart(person, labelBox(L.team.name.at, L.team.name.text), 4)).toBe(true);
    }
    for (const unit of L.units) expect(apart(unit.system, L.team.at, 16), unit.key).toBe(true);
    const stuckLabel = labelBox(L.stuckLabel.at, L.stuckLabel.text);
    expect(apart(stuckLabel, labelBox(L.label.at, L.label.text, "start"), 8)).toBe(true);
    for (const mark of L.stuck) expect(bottom(stuckLabel), mark.key).toBeLessThanOrEqual(mark.at.y - mark.r);
    const backlogLabel = labelBox(L.backlog.label.at, L.backlog.label.text, "start");
    for (const card of L.backlog.cards) expect(apart(backlogLabel, card.at, 16), card.key).toBe(true);
    expect(apart(labelBox(L.cycle.label.at, L.cycle.label.text, "start"), L.cycle.at, 4)).toBe(true);
  });

  it("shows the script's labels in the order it gives them", () => {
    expect([L.label.text, L.stuckLabel.text, L.cycle.label.text, L.backlog.label.text, ...L.slab.parts.map((part) => part.label.text), L.team.name.text]).toEqual(labelsOf("lift-developers"));
  });
});
