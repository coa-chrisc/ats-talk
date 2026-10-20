/**
 * Slide 20a, in the order its They see gives: the lit systems with their
 * people and lanterns, named; the written record opens and the AI helper
 * walks the row, a section of the record filling at each lantern; the two
 * people at the right retire and walk off the edge; new staff step in and the
 * boxes light again; the slab of three parts slides in under the whole row,
 * fills, and the row lifts with it.
 */
import { describe, expect, it } from "vitest";
import { passing } from "./beats";
import { SAFE, labelsOf } from "./layout";
import { KNOWLEDGE, LIFT, READ_AT, poolBox } from "./layout-knowledge";
import { LEAVE, walkOf } from "./steps-knowledge";
import { at, clickOf, endOf, n, playOf, showsAtEnd, startOf, world } from "./harness";

const click = clickOf("knowledge");
const K = KNOWLEDGE;
const leavers = K.keepers.filter((keeper) => keeper.leaves);
const stayers = K.keepers.filter((keeper) => !keeper.leaves);
const walks = leavers.map((keeper) => playOf(click, keeper.key, "x")[0]);
const runs = playOf(click, K.helper.key, "x");
const sectionsFull = () => Math.max(...K.record.sections.map((section) => endOf(click, section.key)));
const gone = () => Math.max(...walks.map((walk) => walk.at + walk.duration));

describe("20a, the staff", () => {
  it("names every part with the script's labels, in its order", () => {
    expect([K.systems.text, K.staff.text, K.know.text, K.record.name.text, K.newcomer.text, ...K.slab.parts.map((part) => part.label.text)]).toEqual(labelsOf("knowledge"));
    expect(K.slab.parts.map((part) => part.label.text)).toEqual(["New tools", "AI enablement", "Process improvement"]);
  });

  it("shows each box lit by the person beside it, and names the systems, the staff and the lantern, before the record opens", () => {
    const opens = startOf(click, K.record.key);
    for (const entry of K.boxes) {
      const [lit] = playOf(click, entry.lit, "autoAlpha");
      expect(lit.on.autoAlpha, entry.key).toBe(1);
      expect(lit.at + lit.duration, entry.key).toBeLessThanOrEqual(opens);
    }
    for (const keeper of K.keepers) expect(endOf(click, keeper.key, "--d"), keeper.key).toBeLessThanOrEqual(opens);
    for (const key of [K.systems.key, K.staff.key, K.know.key]) expect(endOf(click, key), key).toBeLessThanOrEqual(opens);
  });

  it("opens the record, then walks the AI helper along the row in one run, a section of the record filling as it passes each lantern, in turn", () => {
    expect(runs).toHaveLength(1);
    const [run] = runs;
    expect(run.at).toBeGreaterThanOrEqual(endOf(click, K.record.key));
    expect(run.on.x).toBe(K.helper.along);
    expect(READ_AT).toEqual([...READ_AT].sort((a, b) => a - b));
    for (const fraction of READ_AT) {
      expect(fraction).toBeGreaterThan(0);
      expect(fraction).toBeLessThanOrEqual(1);
    }
    const reads = passing(run, READ_AT);
    K.record.sections.forEach((section, i) => expect(playOf(click, section.key, "--k")[0].at, section.key).toBeCloseTo(reads[i], 6));
    for (const section of K.record.sections) expect(showsAtEnd(click, section.key), section.key).toBe(true);
  });

  it("lets the two people at the right retire only once the record is full, the rightmost first, at a steady pace, each box going grey as its person sets off", () => {
    expect(leavers.map((keeper) => K.keepers.indexOf(keeper))).toEqual([3, 4]);
    const leaves = walks.map((walk) => walk.at);
    expect(leaves[1]).toBeLessThan(leaves[0]);
    for (const walk of walks) expect(walk.at).toBeGreaterThanOrEqual(sectionsFull());
    leavers.forEach((keeper, i) => {
      expect(playOf(click, keeper.key, "y"), keeper.key).toEqual([]);
      expect(walks[i].ease, keeper.key).toBe("none");
      expect(walkOf(keeper) / walks[i].duration, keeper.key).toBeCloseTo(LEAVE.speed, 6);
      const lit = K.boxes[K.keepers.indexOf(keeper)].lit;
      const [dim] = playOf(click, lit, "autoAlpha").filter((play) => play.on.autoAlpha === 0);
      expect(dim.at, keeper.key).toBeGreaterThan(walks[i].at);
      expect(dim.at, keeper.key).toBeLessThan(walks[i].at + 0.5);
    });
    for (const keeper of stayers) {
      expect(playOf(click, keeper.key, "x"), keeper.key).toEqual([]);
      expect(showsAtEnd(click, keeper.key), keeper.key).toBe(true);
    }
  });

  it("fades each who retires only over the last 0.25 s, once their light is past the right edge", () => {
    leavers.forEach((keeper, i) => {
      const [fade] = playOf(click, keeper.key, "autoAlpha");
      expect(fade.duration, keeper.key).toBeCloseTo(0.25, 6);
      expect(fade.at + fade.duration, keeper.key).toBeCloseTo(walks[i].at + walks[i].duration, 6);
      const travelled = ((fade.at - walks[i].at) / walks[i].duration) * walkOf(keeper);
      expect(poolBox(keeper.lantern, travelled).x, keeper.key).toBeGreaterThanOrEqual(SAFE.right - 0.5);
      expect(at(click)[keeper.key].autoAlpha, keeper.key).toBe(0);
    });
  });

  it("takes the helper away as the first person sets off, so it is gone at the end", () => {
    const [away] = playOf(click, K.helper.key, "autoAlpha").filter((play) => play.on.autoAlpha === 0);
    expect(away.at).toBeGreaterThanOrEqual(runs[0].at + runs[0].duration);
    expect(away.at).toBeLessThanOrEqual(Math.min(...walks.map((walk) => walk.at)) + 0.3);
    expect(showsAtEnd(click, K.helper.key)).toBe(false);
  });

  it("steps the new staff in beside the two empty boxes once both people have gone, left to right, each box lighting again, the first named", () => {
    expect(K.newcomers.map((person) => person.box)).toEqual([3, 4]);
    const steps = K.newcomers.map((person) => playOf(click, person.key, "x")[0]);
    expect(steps.map((step) => step.at)).toEqual([...steps.map((step) => step.at)].sort((a, b) => a - b));
    K.newcomers.forEach((person, i) => {
      expect(world.states[n(click)][person.key], person.key).toMatchObject({ x: person.from, autoAlpha: 0 });
      expect(steps[i].on.x, person.key).toBe(0);
      expect(startOf(click, person.key), person.key).toBeGreaterThanOrEqual(gone());
      const relit = playOf(click, K.boxes[person.box].lit, "autoAlpha").at(-1)!;
      expect(relit.on.autoAlpha, person.key).toBe(1);
      expect(relit.at, person.key).toBeGreaterThanOrEqual(steps[i].at);
      expect(showsAtEnd(click, person.key), person.key).toBe(true);
    });
    expect(startOf(click, K.newcomer.key)).toBeGreaterThanOrEqual(steps[0].at);
    expect(showsAtEnd(click, K.newcomer.key)).toBe(true);
  });

  it("slides the slab in under the whole row once the new staff are in, fills its three parts in turn, each named, and lifts the row and the slab together", () => {
    const arrived = Math.max(...K.newcomers.map((person) => endOf(click, person.key, "x")));
    const [slide] = playOf(click, K.slab.key, "x");
    expect(world.states[n(click)][K.slab.key]).toMatchObject({ x: K.slab.from, autoAlpha: 0 });
    expect(slide.at).toBeGreaterThanOrEqual(arrived);
    const fills = K.slab.parts.map((part) => startOf(click, part.key));
    expect([...fills].sort((a, b) => a - b)).toEqual(fills);
    K.slab.parts.forEach((part, i) => {
      expect(fills[i], part.key).toBeGreaterThanOrEqual(slide.at);
      expect(startOf(click, part.label.key), part.label.key).toBeGreaterThan(fills[i]);
      expect(showsAtEnd(click, part.key), part.key).toBe(true);
      expect(showsAtEnd(click, part.label.key), part.label.key).toBe(true);
    });
    const [row] = playOf(click, K.row.key, "y");
    const [slab] = playOf(click, K.slab.key, "y");
    expect(row).toMatchObject({ at: slab.at, duration: slab.duration, on: { y: 0 } });
    expect(row.at).toBeGreaterThan(fills[0]);
    expect(world.states[n(click)][K.row.key]).toMatchObject({ y: LIFT });
    expect(world.states[n(click)][K.slab.key]).toMatchObject({ y: LIFT });
    expect(at(click)[K.row.key]).toMatchObject({ y: 0 });
    expect(at(click)[K.slab.key]).toMatchObject({ y: 0, x: 0 });
  });

  it("ends on the full row lit, current and new staff side by side", () => {
    for (const entry of K.boxes) expect(showsAtEnd(click, entry.lit), entry.key).toBe(true);
    for (const person of [...stayers, ...K.newcomers]) expect(showsAtEnd(click, person.key), person.key).toBe(true);
    for (const keeper of leavers) expect(showsAtEnd(click, keeper.key), keeper.key).toBe(false);
  });
});
