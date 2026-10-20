/**
 * Each slide's one click, in the order They see gives it: on slide 22 the
 * figure, then each scene's line, the scene and its label, one scene after
 * another; on slide 23 the chart, the dashed new box joining its row, the
 * figure stepping into it, then each line and its piece; on the close the title, its rule, line A, line B and the foot,
 * and nothing after the foot.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { titleKey } from "./layout";
import { CLOSE } from "./layout-close";
import { FIT, ORG } from "./layout-fit";
import { WORK } from "./layout-work";
import { LEAVE, at, endOf, ends, lastLanding, playOf, playsAt, startOf } from "./harness";

const [WORK_A, WORK_B] = storyKeys("story.my-work", 2);
const [FIT_A, FIT_B] = storyKeys("story.fit", 2);
const [CLOSE_A, CLOSE_B] = storyKeys("story.lets-talk", 2);

describe("slide 22's click", () => {
  const click = "my-work.play";
  const start = (key: string) => startOf(click, key);

  it("draws the figure first, under the title", () => {
    expect(start(WORK.figure.key)).toBeGreaterThanOrEqual(start(titleKey("my-work")));
    for (const scene of WORK.scenes) expect(start(scene.line.key)).toBeGreaterThan(start(WORK.figure.key));
    expect(at(click)[WORK.figure.key]["--d"]).toBe(1);
  });

  it("brings each scene in turn: its line draws, then the scene, then its label", () => {
    for (const [i, scene] of WORK.scenes.entries()) {
      expect(start(scene.key), `scene ${i}`).toBeGreaterThan(start(scene.line.key));
      expect(start(scene.label.key), `scene ${i}`).toBeGreaterThan(start(scene.key));
      if (i) expect(start(scene.line.key), `scene ${i}`).toBeGreaterThan(start(WORK.scenes[i - 1].label.key));
    }
  });

  it("lands line A with the first scene, inside 3 s of the click, and line B once all five are there", () => {
    expect(start(WORK_A)).toBeGreaterThan(start(WORK.scenes[0].line.key));
    expect(start(WORK_A)).toBeLessThan(start(WORK.scenes[1].line.key));
    expect(endOf(click, WORK_A) + LEAVE).toBeLessThanOrEqual(3.5);
    expect(start(WORK_B)).toBeGreaterThanOrEqual(endOf(click, WORK.scenes[4].label.key));
  });

  it("ends on the figure with all five scenes, their labels and their lines", () => {
    const state = at(click);
    for (const scene of WORK.scenes) {
      expect(state[scene.line.key]["--d"]).toBe(1);
      for (const key of [scene.key, scene.label.key]) expect(state[key]).toMatchObject({ autoAlpha: 1 });
    }
  });
});

describe("slide 23's click", () => {
  const click = "fit.play";
  const start = (key: string) => startOf(click, key);
  const units = ORG.units.map((unit) => unit.key);
  const chart = [ORG.head.key, ORG.name.key, ORG.links.key, ...units];

  it("draws the chart from its head down, its name in the head, the row's boxes one after another", () => {
    expect(start(ORG.name.key)).toBeGreaterThan(start(ORG.head.key));
    expect(start(ORG.links.key)).toBeGreaterThan(start(ORG.head.key));
    for (const [i, key] of units.entries()) {
      expect(start(key)).toBeGreaterThan(start(ORG.links.key));
      if (i) expect(start(key)).toBeGreaterThan(start(units[i - 1]));
    }
  });

  it("then joins the new box to the row by its line, opens its dashed outline from the top, and the figure steps in", () => {
    const drawn = Math.max(...chart.map((key) => endOf(click, key)));
    expect(start(ORG.join.key)).toBeGreaterThanOrEqual(drawn);
    expect(start(FIT.role.key)).toBeGreaterThan(start(ORG.join.key));
    expect(at("my-work.play")[FIT.role.key]).toMatchObject({ "--wt": 0, "--wb": 100 });
    expect(start(FIT.figure.key)).toBeGreaterThanOrEqual(endOf(click, FIT.role.key) - 0.2);
    const step = playOf(click, FIT.figure.key).find((play) => "x" in play.on)!;
    expect(at("my-work.play")[FIT.figure.key].x).toBeGreaterThan(0);
    expect(step.on.x).toBe(0);
  });

  it("reaches each line out in turn once the figure is in, its piece rising at its end", () => {
    for (const [i, piece] of FIT.pieces.entries()) {
      const [line] = playOf(click, piece.line.key);
      const [rise] = playOf(click, piece.key);
      expect(line.at, piece.key).toBeGreaterThanOrEqual(endOf(click, FIT.figure.key));
      expect(rise.at, piece.key).toBeGreaterThan(line.at);
      expect(rise.at, piece.key).toBeLessThan(ends(line));
      if (i) expect(line.at, piece.key).toBeGreaterThan(start(FIT.pieces[i - 1].line.key));
    }
  });

  it("lands line A as the figure steps in and line B with the pieces", () => {
    expect(start(FIT_A)).toBeGreaterThanOrEqual(start(FIT.figure.key));
    expect(start(FIT_A)).toBeLessThan(endOf(click, FIT.figure.key));
    expect(start(FIT_B)).toBeGreaterThan(Math.max(...FIT.pieces.map((piece) => start(piece.line.key))));
  });

  it("ends on the figure inside its dashed box, joined to the chart and to the four pieces", () => {
    const state = at(click);
    for (const key of [...chart.filter((key) => key !== ORG.name.key), ORG.join.key, FIT.figure.key, ...FIT.pieces.map((piece) => piece.line.key)]) expect(state[key]["--d"], key).toBe(1);
    expect(state[FIT.figure.key].x).toBe(0);
    expect(state[FIT.role.key]).toMatchObject({ "--wt": 0, "--wr": 0, "--wb": 0, "--wl": 0 });
    for (const piece of FIT.pieces) expect(state[piece.key], piece.key).toMatchObject({ autoAlpha: 1 });
  });
});

describe("the close's click", () => {
  const click = "lets-talk.play";
  const start = (key: string) => startOf(click, key);

  it("settles the title once slide 23 is gone, grows the rule 0.75 s after it, then line A, line B and the foot", () => {
    expect(start(CLOSE.title.key)).toBeGreaterThanOrEqual(endOf(click, "fit.marks"));
    const [rule] = playOf(click, CLOSE.rule.key);
    expect(rule).toMatchObject({ on: { scaleX: 1 }, duration: 0.7, ease: "expo.out" });
    expect(rule.at - start(CLOSE.title.key)).toBeCloseTo(0.75, 9);
    expect(at(click)[CLOSE.rule.key].scaleX).toBe(1);
    expect(start(CLOSE_A)).toBeGreaterThan(rule.at);
    expect(start(CLOSE_B)).toBeGreaterThan(start(CLOSE_A));
    expect(start(CLOSE.foot.key)).toBeGreaterThan(start(CLOSE_B));
  });

  it("moves nothing once the foot has landed", () => {
    expect(endOf(click, CLOSE.foot.key)).toBe(lastLanding(click));
    for (const play of playsAt(click)) expect(play.at, play.key).toBeLessThanOrEqual(start(CLOSE.foot.key));
  });
});
