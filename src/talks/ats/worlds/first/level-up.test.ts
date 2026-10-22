/**
 * Slide 22: three equal staff figures on one line, then the developers'
 * practice ring, round which one card rides a single lap at one pace, each
 * stop's words arriving with it, and stops where it started. Nothing ticks.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { box } from "@/components/deck/kit";
import { apart, at, before, bottom, endOf, inside, markup, only, playOf, playsAt, startOf, tagOf } from "./harness";
import { BASE, CARD, FIGURE, LEVEL_UP as U, LEVEL_UP_BOXES, RING, WORDS, linesBox, onRing } from "./layout-level-up";
import { SAFE, contentTop, labelBox } from "./layout-plan";
import { LAP, LAP_START } from "./steps-level-up";

const click = "level-up.play";
/** When the lap's moves start: the card's turn is the one move that sets `--r`. */
const lap = () => only(playOf(click, U.card.key, "--r"));


/** The declarations first-plan.css gives one selector, across every rule that lists it. */
const css = readFileSync(join(import.meta.dirname, "first-plan.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const ruleOf = (selector: string) =>
  [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)]
    .filter(([, selectors]) => selectors.split(",").map((s) => s.trim()).includes(selector))
    .map(([, , body]) => body)
    .join(";");

describe("22, build staff skills: the roles", () => {
  it("stands three figures of one size on one shared line, each with what it works with beside it", () => {
    expect(U.roles).toHaveLength(3);
    for (const role of U.roles) {
      expect(role.figure).toMatchObject({ w: FIGURE.w, h: FIGURE.h });
      expect(bottom(role.figure)).toBe(BASE);
      expect(bottom(role.prop.at)).toBe(BASE);
      expect(apart(role.figure, role.prop.at, 16), role.key).toBe(true);
    }
    expect(U.ground.from.y).toBe(BASE);
    expect(U.ground.to.y).toBe(BASE);
    expect(U.ground.from.x).toBeLessThanOrEqual(Math.min(...U.roles.map((r) => r.figure.x)));
    expect(U.ground.to.x).toBeGreaterThanOrEqual(Math.max(...U.roles.map((r) => r.prop.at.x + r.prop.at.w)));
    expect(new Set(U.roles.map((r) => r.prop.kind)).size).toBe(3);
  });

  it("draws the line, then each figure in turn with its words rising as it lands", () => {
    expect(startOf(click, U.roles[0].key)).toBeGreaterThan(startOf(click, U.ground.key));
    for (const [i, role] of U.roles.entries()) {
      expect(playOf(click, role.key, "--d")).toHaveLength(1);
      expect(startOf(click, role.words.key)).toBeGreaterThan(startOf(click, role.key));
      if (i) expect(startOf(click, role.key)).toBeGreaterThan(startOf(click, U.roles[i - 1].key));
      expect(at(click)[role.key]["--d"]).toBe(1);
      expect(at(click)[role.words.key].autoAlpha).toBe(1);
    }
  });

  it("paints a figure's and a prop's white faces only once they start to draw, so undrawn roles hide nothing on the world's other slides", () => {
    for (const selector of [".fs-staff circle", ".fs-staff path", ".fs-prop .fs-prop__face"]) expect(ruleOf(selector), selector).toMatch(/fill-opacity:\s*min\(1, calc\(var\(--d, 0\) \* 100\)\)/);
  });

  it("keeps each role's words under the line, centred in its column, clear of the next column's", () => {
    const words = U.roles.map((role) => [labelBox(role.words.name.at, role.words.name.text, "middle", WORDS.size, WORDS.leading), linesBox(role.words.caption.at, role.words.caption.lines)]);
    for (const [name, caption] of words) {
      expect(name.y).toBeGreaterThan(BASE);
      expect(caption.y).toBeGreaterThanOrEqual(bottom(name));
    }
    for (let i = 1; i < words.length; i++) for (const a of words[i - 1]) for (const b of words[i]) expect(apart(a, b, 8)).toBe(true);
  });
});

describe("22, build staff skills: the practice cycle", () => {
  it("draws the ring only once the roles are in", () => {
    const rolesIn = Math.max(...U.roles.map((role) => Math.max(endOf(click, role.key), endOf(click, role.words.key))));
    expect(startOf(click, U.heading.key)).toBeGreaterThanOrEqual(rolesIn);
    expect(startOf(click, U.ring.key)).toBeGreaterThanOrEqual(rolesIn);
    expect(only(playOf(click, U.ring.key))).toMatchObject({ on: { "--d": 1 } });
  });

  it("marks four stops a quarter lap apart from the top, with an arrowhead pointing clockwise between each pair", () => {
    expect(U.stops.map((stop) => stop.arrives)).toEqual([0, 0.25, 0.5, 0.75]);
    expect(U.stops.map((stop) => stop.point)).toEqual([onRing(0), onRing(0.25), onRing(0.5), onRing(0.75)]);
    expect(U.ring.arrows.map((arrow) => arrow.at)).toEqual([0.125, 0.375, 0.625, 0.875]);
    // The ring's path starts at the top and sweeps clockwise (sweep flag 1).
    expect(U.ring.d.startsWith(`M${RING.c.x} ${RING.c.y - RING.r}A`)).toBe(true);
    expect(U.ring.d).toContain(`A${RING.r} ${RING.r} 0 1 1 `);
  });

  it("brings one card up at the top once the ring is drawn and rides it one lap, at one pace, ending where it started", () => {
    expect(startOf(click, U.card.key)).toBeGreaterThanOrEqual(endOf(click, U.ring.key));
    const turn = lap();
    expect(turn).toMatchObject({ on: { "--r": 1 }, ease: "none", duration: LAP });
    expect(before(click)[U.card.key]["--r"]).toBe(0);
    expect(turn.at - startOf(click, U.card.key)).toBeCloseTo(LAP_START, 6);
    expect(at(click)[U.card.key]).toMatchObject({ "--r": 1, autoAlpha: 1 });
    expect(playOf(click, U.card.key, "x")).toEqual([]);
    expect(playOf(click, U.card.key, "y")).toEqual([]);
  });

  it("raises each stop's words as the card reaches it, in order round the ring", () => {
    const start = lap().at;
    expect(startOf(click, U.stops[0].key)).toBeLessThanOrEqual(start);
    for (const stop of U.stops.slice(1)) expect(startOf(click, stop.key)).toBeCloseTo(start + stop.arrives * LAP, 6);
    for (const stop of U.stops) expect(at(click)[stop.key].autoAlpha).toBe(1);
  });

  it("ticks nothing, fills nothing and counts nothing: the cycle claims no gain", () => {
    const keys = playsAt(click).filter((p) => p.key.startsWith("level-up.")).flatMap((p) => Object.keys(p.on));
    expect(keys.filter((key) => !["--d", "--r", "autoAlpha", "y"].includes(key))).toEqual([]);
    expect(markup).not.toMatch(/dk-tick|fs-tick|dk-pass/);
    expect(tagOf(U.card.key)).toContain("fs-orbit");
  });

  it("keeps every stop's words clear of the ring and of the card wherever it rides", () => {
    const ring = box(RING.c.x - RING.r, RING.c.y - RING.r, 2 * RING.r, 2 * RING.r);
    const cards = Array.from({ length: 16 }, (_, i) => onRing(i / 16)).map((p) => box(p.x - CARD.w / 2, p.y - CARD.h / 2, CARD.w, CARD.h));
    for (const stop of U.stops) {
      const words = linesBox(stop.first, stop.lines, stop.anchor);
      expect(stop.lines.length, stop.text).toBeLessThanOrEqual(3);
      expect(apart(words, ring, 8), stop.text).toBe(true);
      for (const card of cards) expect(apart(words, card, 4), stop.text).toBe(true);
    }
  });
});

describe("22, build staff skills: the words' lines", () => {
  it("never ends a line on a short joining word, so no phrase splits after its first word", () => {
    const sets = [...U.roles.map((role) => role.words.caption.lines), ...U.stops.map((stop) => stop.lines)];
    for (const lines of sets) for (const line of lines.slice(0, -1)) expect(line, lines.join(" / ")).not.toMatch(/ (a|an|and|for|in|of|on|or|the|to|with)$/i);
  });
});

describe("22, build staff skills: where it sits", () => {
  it("starts under the story band and stays inside the safe area, over the room above the footer", () => {
    const stage = box(SAFE.left, contentTop("level-up"), SAFE.right - SAFE.left, SAFE.bottom - contentTop("level-up"));
    for (const b of LEVEL_UP_BOXES) expect(inside(b, stage), JSON.stringify(b)).toBe(true);
  });

  it("keeps the roles and the cycle apart, side by side", () => {
    const roles = LEVEL_UP_BOXES.slice(0, 12);
    const cycle = LEVEL_UP_BOXES.slice(12);
    const rolesRight = Math.max(...roles.map((b) => b.x + b.w));
    const cycleLeft = Math.min(...cycle.map((b) => b.x));
    expect(cycleLeft - rolesRight).toBeGreaterThanOrEqual(24);
  });
});
