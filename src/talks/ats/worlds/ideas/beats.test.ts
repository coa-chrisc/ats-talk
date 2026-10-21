/**
 * Slides 7 to 10 as they play: each click follows its They see in order,
 * a story line rises inside the beat it describes, and the click ends on
 * the picture the script describes.
 */
import { storyKeys } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { TEXT_TO_VISUAL_PAUSE } from "../pilot-sequence";
import { storyId } from "../steps";
import { at, endOf, longest, playOf, startOf, stepOf } from "./harness";
import { EARN } from "./layout-earn";
import { LADDER } from "./layout-ladder";

const storyOf = (pictureId: string) => storyKeys(storyId(pictureId), 2);

describe("slide 7, the ladder", () => {
  const L = LADDER;
  const id = stepOf("ladder");
  const end = at(id);
  const blocks = L.steps.map((step) => step.key);
  const walker = playOf(id, L.walker.key);
  const moving = walker.filter((play) => "--x" in play.on || "--y" in play.on);

  it("grows the blocks left to right, each named as it stands", () => {
    const starts = blocks.map((key) => startOf(id, key));
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(starts[i - 1]);
    for (const step of L.steps) expect(startOf(id, step.words.key), step.key).toBeGreaterThan(startOf(id, step.key));
  });

  it("starts the figure once the stair stands, walks it to the riser, then steps it up once", () => {
    const stood = Math.max(...blocks.map((key) => endOf(id, key)));
    expect(startOf(id, L.walker.key)).toBeGreaterThan(stood);
    const [walk, ...climb] = moving;
    expect(walk.on).toEqual({ "--x": L.walker.walk });
    expect(climb.map((play) => play.on)).toEqual([{ "--y": L.walker.climb.y }, { "--x": L.walker.climb.x }]);
    for (const step of climb) expect(step.at).toBeGreaterThanOrEqual(walk.at + walk.duration);
    // It steps up once, and moves no more.
    expect(moving).toHaveLength(3);
  });

  it("lands the tick once the figure has stopped, its label with it, before the arrow", () => {
    const stopped = Math.max(...moving.map((play) => play.at + play.duration));
    expect(startOf(id, L.tick.key)).toBeGreaterThan(stopped);
    expect(startOf(id, L.stop.key)).toBeGreaterThan(startOf(id, L.tick.key));
    expect(startOf(id, L.more.key)).toBeGreaterThan(endOf(id, L.stop.key));
  });


  it("ends on the stair, the figure standing on the first block, the tick, the arrow and the filled tool", () => {
    for (const key of blocks) expect(end[key]["--k"], key).toBe(1);
    expect(end[L.walker.key]).toMatchObject({ autoAlpha: 1, "--x": L.walker.climb.x, "--y": L.walker.climb.y });
    expect(end[L.tick.key].autoAlpha).toBe(1);
    expect(end[L.more.key]["--d"]).toBe(1);
    expect(end[L.tool.key]).toMatchObject({ "--d": 1, "--k": 1 });
  });
});

describe("slide 10, the stair of gates and the checklist", () => {
  const G = EARN;
  const P = G.project;
  const id = stepOf("earn");
  const end = at(id);
  const [a, b] = storyOf("earn");
  const box = playOf(id, P.key);
  const moving = box.filter((play) => "--x" in play.on || "--y" in play.on);
  const [tick0, tick1] = G.ticks.map((tick) => tick.key);

  it("brings the steps up left to right, once the floor is drawing", () => {
    const starts = G.steps.map((step) => startOf(id, step.key));
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(starts[i - 1]);
    expect(starts[0]).toBeGreaterThan(startOf(id, G.floor.key));
  });

  it("climbs the box onto the first step once the stair stands: up, then onto the tread", () => {
    const stood = Math.max(...G.steps.map((step) => endOf(id, step.key)));
    expect(startOf(id, P.key)).toBeGreaterThan(stood);
    const [up, over] = moving;
    expect(up.on).toEqual({ "--y": P.first.y });
    expect(over.on).toEqual({ "--x": P.first.x });
    expect(over.at).toBeGreaterThan(up.at);
  });

  it("lands the first tick once the box stands on the first step, its caption with it, with line A", () => {
    const [up, over] = moving;
    const stood = Math.max(up.at + up.duration, over.at + over.duration);
    expect(startOf(id, tick0)).toBeGreaterThanOrEqual(stood);
    expect(startOf(id, G.evidence.key)).toBeGreaterThan(startOf(id, tick0));
    expect(endOf(id, a)).toBeLessThan(moving[0].at);
  });

  it("climbs the box to the second step only after the first tick, over the first gate, and then lands the second tick", () => {
    const climb = moving.slice(2);
    expect(climb.map((play) => play.on)).toEqual([{ "--y": P.hop }, { "--x": P.second.x }, { "--y": P.second.y }]);
    expect(climb[0].at).toBeGreaterThan(endOf(id, G.evidence.key));
    const settled = Math.max(...climb.map((play) => play.at + play.duration));
    expect(startOf(id, tick1)).toBeGreaterThanOrEqual(settled);
    // It climbs twice and moves no more: the third step stays empty.
    expect(moving).toHaveLength(5);
  });

  it("reveals the complete text together, holds it for reading, then shows neutral criteria before the climb", () => {
    expect(startOf(id, a)).toBe(startOf(id, b));
    expect(startOf(id, G.heading.key) - endOf(id, b)).toBeCloseTo(TEXT_TO_VISUAL_PAUSE);
    for (const row of G.list) {
      expect(startOf(id, row.key)).toBe(startOf(id, G.heading.key));
      expect(endOf(id, row.key)).toBeLessThan(startOf(id, G.floor.key));
      expect(playOf(id, row.tick.key)).toHaveLength(0);
    }
  });

  it("ends on the project's second check, with no late text or diagram events", () => {
    expect(endOf(id, tick1)).toBe(longest(id));
  });

  it("ends on the stair with the box on its second step, two ticks, the third step empty, and the criteria under their heading", () => {
    for (const step of G.steps) expect(end[step.key].autoAlpha, step.key).toBe(1);
    expect(end[P.key]).toMatchObject({ autoAlpha: 1, "--x": P.second.x, "--y": P.second.y });
    for (const key of [tick0, tick1, G.evidence.key, G.heading.key, ...G.list.map((row) => row.key)]) expect(end[key].autoAlpha, key).toBe(1);
  });
});
