import { stillAllowance } from "../sequence";
/**
 * Each of Part 1's clicks, beat by beat, against what its They see says it
 * shows and in what order, and the flow every click keeps: the stage never
 * still for more than 3 s (flow.test.ts checks only the worlds the deck
 * lists, so it is checked here too).
 */
import { RISE } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { at, before, elements, endOf, ids, playOf, playsAt, startOf, stepOf, world } from "./harness";
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
  const tiles = C.tiles.map((tile) => startOf(id, tile.key));
  const names = C.tiles.map((tile) => startOf(id, tile.name.key));
  const benches = C.tiles.map((tile) => startOf(id, tile.bench.key));

  it("lands the four tiles left to right, each settling down onto its place", () => {
    for (let i = 1; i < tiles.length; i++) expect(tiles[i]).toBeGreaterThan(tiles[i - 1]);
    for (const tile of C.tiles) {
      expect(before(id)[tile.key]).toMatchObject({ autoAlpha: 0, y: -RISE });
      expect(playOf(id, tile.key)[0].on).toMatchObject({ y: 0, autoAlpha: 1 });
    }
  });

  it("reveals each tile with its name, left to right", () => {
    C.tiles.forEach((tile, i) => expect(names[i]).toBe(tiles[i]));
    for (let i = 1; i < names.length; i++) expect(names[i]).toBeGreaterThan(names[i - 1]);
  });

  it("settles the college's caption under the row once the names are up, and raises story line A with it", () => {
    expect(startOf(id, C.college.key)).toBeGreaterThan(Math.max(...C.tiles.map((tile) => endOf(id, tile.name.key))));
  });

  it("then draws a bench under each tile in turn, after a hold to read, story line B rising as they draw", () => {
    for (let i = 1; i < benches.length; i++) expect(benches[i]).toBe(benches[i - 1]);
  });

  it("lands the build's caption under the four benches last, and ends on it", () => {
    const build = startOf(id, C.build.key);
    expect(build).toBeGreaterThan(Math.max(...C.tiles.map((tile) => endOf(id, tile.bench.key))));
    expect(endOf(id, C.build.key)).toBe(Math.max(...playsAt(id).map((play) => play.at + play.duration)));
  });

  it("ends on the four named tiles, the caption and the four benches", () => {
    const end = at(id);
    for (const tile of C.tiles) {
      expect(end[tile.key]).toMatchObject({ autoAlpha: 1, y: 0 });
      expect(end[tile.name.key].autoAlpha).toBe(1);
      expect(end[tile.bench.key]["--d"]).toBe(1);
    }
    expect(end[C.college.key].autoAlpha).toBe(1);
    expect(end[C.build.key].autoAlpha).toBe(1);
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
