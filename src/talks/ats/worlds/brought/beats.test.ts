import { stillAllowance } from "../sequence";
/**
 * Each of Part 1's clicks, beat by beat, against what its They see says it
 * shows and in what order, and the flow every click keeps: the stage never
 * still for more than 3 s (flow.test.ts checks only the worlds the deck
 * lists, so it is checked here too).
 */
import { RISE } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { at, before, elements, endOf, ids, markup, playOf, playsAt, startOf, stepOf, world } from "./harness";
import { OPENING, titleKey } from "./layout";
import { COURSE } from "./layout-course";
import { LESSONS } from "./layout-lessons";
import { ARRIVE } from "./moves";

describe("every click", () => {
  it.each(ids)("keeps %s moving: never still for more than 3 s", (id) => {
    let landed = 0;
    let still = 0;
    for (const play of [...world.plays[ids.indexOf(id)]].sort((a, b) => a.at - b.at)) {
      still = Math.max(still, play.at - landed);
      const many = "key" in play ? elements(play.key) : 1;
      landed = Math.max(landed, play.at + play.duration + play.stagger * Math.max(0, many - 1));
    }
    expect(still).toBeLessThanOrEqual(stillAllowance(id));
  });

  it.each(ids)("ends %s on a drawing or a story line landing, not a hold", (id) => {
    const plays = playsAt(id);
    const last = Math.max(...plays.map((play) => play.at + play.duration));
    expect(plays.some((play) => play.at > last - 1)).toBe(true);
  });
});

describe("slide 1, the title", () => {
  const id = stepOf("title");
  it("brings the title up first, then grows the rule, then story line A, then B, and moves nothing else", () => {
    expect(startOf(id, OPENING.title.key)).toBe(ARRIVE);
    expect(startOf(id, OPENING.rule.key)).toBeGreaterThan(startOf(id, OPENING.title.key));
  });
});

describe("slide 2, the course", () => {
  const id = stepOf("course");
  const C = COURSE;
  const boxes = C.modules.map((mod) => startOf(id, mod.key));
  const turns = C.modules.map((mod) => startOf(id, mod.turn.key));
  const ticks = C.modules.map((mod) => startOf(id, mod.tick.key));
  /** The drawing's moves: every part under the picture's id but its two layers. */
  const drawing = playsAt(id).filter((play) => play.key.startsWith("course.") && !play.key.endsWith(".marks") && !play.key.endsWith(".html"));

  it("brings the wordmark and its caption first, before any box", () => {
    const first = Math.min(...drawing.map((play) => play.at));
    expect(startOf(id, C.wordmark.key)).toBe(first);
    expect(startOf(id, C.college.key)).toBeGreaterThanOrEqual(first);
    expect(startOf(id, C.college.key)).toBeLessThan(first + 0.5);
    expect(Math.max(endOf(id, C.wordmark.key), endOf(id, C.college.key))).toBeLessThanOrEqual(Math.min(...boxes));
  });

  it("lands the four boxes left to right as dashed outlines, each with its name, before any turns green", () => {
    for (let i = 1; i < boxes.length; i++) expect(boxes[i]).toBeGreaterThan(boxes[i - 1]);
    for (const mod of C.modules) {
      expect(before(id)[mod.key]).toMatchObject({ autoAlpha: 0, y: -RISE });
      expect(playOf(id, mod.key)[0].on).toMatchObject({ autoAlpha: 1, y: 0 });
      expect(before(id)[mod.turn.key]["--k"]).toBe(0);
      expect(before(id)[mod.tick.key].autoAlpha).toBe(0);
    }
    expect(Math.max(...C.modules.map((mod) => endOf(id, mod.key)))).toBeLessThanOrEqual(Math.min(...turns));
  });

  it("turns the boxes green one at a time, left to right, about half a second apart, a check landing in each as it turns", () => {
    for (let i = 1; i < turns.length; i++) {
      expect(turns[i] - turns[i - 1]).toBeGreaterThanOrEqual(0.4);
      expect(turns[i] - turns[i - 1]).toBeLessThanOrEqual(0.6);
      expect(ticks[i]).toBeGreaterThan(ticks[i - 1]);
    }
    C.modules.forEach((mod, i) => {
      expect(playOf(id, mod.turn.key)[0].on).toMatchObject({ "--k": 1 });
      expect(ticks[i]).toBeGreaterThanOrEqual(turns[i]);
      expect(ticks[i]).toBeLessThan(endOf(id, mod.turn.key));
      if (i + 1 < turns.length) expect(ticks[i]).toBeLessThan(turns[i + 1]);
    });
  });

  it("ends on the wordmark and caption over the four green boxes, each with its check, and on the last check landing", () => {
    const end = at(id);
    expect(end[C.wordmark.key].autoAlpha).toBe(1);
    expect(end[C.college.key].autoAlpha).toBe(1);
    expect(C.modules).toHaveLength(4);
    for (const mod of C.modules) {
      expect(end[mod.key]).toMatchObject({ autoAlpha: 1, y: 0 });
      expect(end[mod.turn.key]["--k"]).toBe(1);
      expect(end[mod.tick.key]).toMatchObject({ autoAlpha: 1, y: 0 });
    }
    expect(endOf(id, C.modules[3].tick.key)).toBe(Math.max(...playsAt(id).map((play) => play.at + play.duration)));
  });

  it("draws no workbenches, no indigo tiles and no caption about the build", () => {
    expect(markup).not.toMatch(/data-build="course\.(?:bench|build|tile)/);
    expect(world.keys.filter((key) => /^course\.(?:bench|build|tile)/.test(key))).toEqual([]);
  });

  it("changes the title at the start of its click, slide 1's gone at once", () => {
    expect(startOf(id, titleKey("title"))).toBe(0);
    expect(at(id)[titleKey("title")].autoAlpha).toBe(0);
    expect(at(id)[titleKey("course")].yPercent).toBe(0);
  });
});

describe("slide 2a, the four lessons", () => {
  const id = stepOf("lessons");
  const F = LESSONS;
  const R = F.route;
  const panels = F.panels.map((panel) => startOf(id, panel.key));
  const names = F.panels.map((panel) => startOf(id, panel.name.key));

  it("draws the four panels left to right, each numeral landing as its panel draws", () => {
    for (let i = 1; i < panels.length; i++) expect(panels[i]).toBeGreaterThan(panels[i - 1]);
    for (const [i, panel] of F.panels.entries()) {
      expect(startOf(id, panel.numeral.key)).toBe(panels[i]);
      expect(startOf(id, panel.numeral.key)).toBeLessThan(endOf(id, panel.key));
    }
  });

  it("reveals each panel numeral and name together", () => {
    F.panels.forEach((panel, i) => expect(names[i]).toBe(startOf(id, panel.numeral.key)));
    for (let i = 1; i < names.length; i++) expect(names[i]).toBeGreaterThan(names[i - 1]);
  });


  it("then draws the route left to right, each stop arriving as the front reaches it and named, and lights each stop as it arrives, without a second sweep", () => {
    const line = playOf(id, R.key)[0];
    const arrive = R.stops.map((stop) => playOf(id, stop.key).find((play) => "autoAlpha" in play.on)!.at);
    const light = R.stops.map((stop) => playOf(id, stop.key).find((play) => "--k" in play.on)!.at);
    for (const [i, stop] of R.stops.entries()) {
      expect(arrive[i]).toBeGreaterThan(line.at);
      expect(arrive[i]).toBeLessThan(line.at + line.duration);
      expect(startOf(id, stop.name.key)).toBeGreaterThan(arrive[i]);
      expect(light[i]).toBe(arrive[i]);
      if (i > 0) {
        expect(arrive[i] - arrive[i - 1]).toBeGreaterThan(0.1);
        expect(light[i]).toBeGreaterThan(light[i - 1]);
      }
    }
  });

  it("ends on the four named panels over the lit route", () => {
    const end = at(id);
    for (const panel of F.panels) {
      expect(end[panel.key]["--d"]).toBe(1);
      expect(end[panel.numeral.key].autoAlpha).toBe(1);
      expect(end[panel.name.key].autoAlpha).toBe(1);
    }
    expect(end[R.key]["--d"]).toBe(1);
    for (const stop of R.stops) {
      expect(end[stop.key]).toMatchObject({ autoAlpha: 1, "--k": 1 });
      expect(end[stop.name.key].autoAlpha).toBe(1);
    }
  });

  it("changes the title at the start of its click, slide 2's gone at once", () => {
    expect(startOf(id, titleKey("course"))).toBe(0);
    expect(at(id)[titleKey("course")].autoAlpha).toBe(0);
    expect(at(id)[titleKey("lessons")].yPercent).toBe(0);
  });
});
