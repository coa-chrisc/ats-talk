/**
 * Slides 7 to 10 as they play: each click follows its They see in order,
 * a story line rises inside the beat it describes, and the click ends on
 * the picture the script describes.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { LADDER } from "./layout-ladder";
import { ENFORCE } from "./layout-enforce";
import { PEOPLE, TIP } from "./layout-people";
import { EARN } from "./layout-earn";
import { arrived, at, before, endOf, longest, playOf, startOf, stepOf } from "./harness";

const storyOf = (pictureId: string) => storyKeys(storyId(pictureId), 2);

describe("slide 7, the ladder", () => {
  const L = LADDER;
  const id = stepOf("ladder");
  const end = at(id);
  const [a, b] = storyOf("ladder");
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

  it("raises line A with the grey arrow, and line B with the plain tool, last", () => {
    expect(startOf(id, a)).toBeGreaterThan(startOf(id, L.more.key));
    expect(startOf(id, a)).toBeLessThan(endOf(id, L.more.key));
    expect(startOf(id, L.tool.key)).toBeGreaterThan(endOf(id, a));
    expect(startOf(id, b)).toBeGreaterThan(startOf(id, L.tool.key));
    expect(endOf(id, b)).toBe(longest(id));
  });

  it("ends on the stair, the figure standing on the first block, the tick, the arrow and the filled tool", () => {
    for (const key of blocks) expect(end[key]["--k"], key).toBe(1);
    expect(end[L.walker.key]).toMatchObject({ autoAlpha: 1, "--x": L.walker.climb.x, "--y": L.walker.climb.y });
    expect(end[L.tick.key].autoAlpha).toBe(1);
    expect(end[L.more.key]["--d"]).toBe(1);
    expect(end[L.tool.key]).toMatchObject({ "--d": 1, "--k": 1 });
  });
});

describe("slide 8, the descending stair and the dial", () => {
  const E = ENFORCE;
  const D = E.dial;
  const id = stepOf("enforce");
  const end = at(id);
  const [a, b] = storyOf("enforce");

  it("grows the blocks tallest first, left to right, then the arrow up their left", () => {
    const starts = E.steps.map((step) => startOf(id, step.key));
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(starts[i - 1]);
    expect(startOf(id, E.arrow.key)).toBeGreaterThan(Math.max(...E.steps.map((step) => endOf(id, step.name.key))));
    expect(startOf(id, E.arrow.label.key)).toBeGreaterThan(startOf(id, E.arrow.key));
  });

  it("raises line A with the arrow, before the dial draws", () => {
    expect(startOf(id, a)).toBeGreaterThanOrEqual(startOf(id, E.arrow.key));
    expect(startOf(id, a)).toBeLessThan(endOf(id, E.arrow.label.key));
    expect(startOf(id, a)).toBeLessThan(startOf(id, D.key));
  });

  it("draws the dial, its settings in turn, then swings the needle to the first, with line B, last", () => {
    expect(startOf(id, D.key)).toBeGreaterThan(endOf(id, a));
    const settings = D.settings.map((setting) => startOf(id, setting.key));
    for (let i = 1; i < settings.length; i++) expect(settings[i]).toBeGreaterThan(settings[i - 1]);
    const swing = playOf(id, D.needle.key).find((play) => "--r" in play.on)!;
    expect(swing.at).toBeGreaterThan(Math.max(...D.settings.map((setting) => endOf(id, setting.key))) - 0.5);
    expect(before(id)[D.needle.key]["--r"]).toBe(D.needle.from);
    expect(startOf(id, b)).toBeGreaterThanOrEqual(startOf(id, D.needle.key));
    // The click ends as the needle comes to rest, line B landed with it.
    expect(swing.at + swing.duration).toBe(longest(id));
    expect(longest(id) - endOf(id, b)).toBeLessThan(0.2);
  });

  it("ends on the stair and the dial, the needle resting on the first setting", () => {
    for (const step of E.steps) expect(end[step.key]["--k"], step.key).toBe(1);
    expect(end[D.needle.key]).toMatchObject({ autoAlpha: 1, "--r": D.needle.rest });
    for (const tick of D.ticks) expect(end[tick.key]["--d"], tick.key).toBe(1);
  });
});

describe("slide 9, the balance", () => {
  const T = PEOPLE;
  const id = stepOf("people");
  const end = at(id);
  const [a, b] = storyOf("people");
  const [left, right] = T.pans;

  it("shows the box and the people, named, before the balance draws under them", () => {
    expect(startOf(id, T.technology.key)).toBeLessThan(startOf(id, T.talent.key));
    expect(startOf(id, T.post.key)).toBeGreaterThan(endOf(id, T.talent.name.key));
    expect(startOf(id, T.beam.key)).toBeGreaterThan(startOf(id, T.post.key));
  });

  it("tips the beam toward the people once it is drawn, the pans moving with it on the same curve", () => {
    const tip = playOf(id, T.beam.key).find((play) => "--r" in play.on)!;
    expect(tip.on["--r"]).toBe(TIP);
    expect(before(id)[T.beam.key]["--r"]).toBe(0);
    expect(tip.at).toBeGreaterThan(endOf(id, left.plateKey));
    for (const pan of T.pans) {
      const [ride] = playOf(id, pan.key);
      expect(ride, pan.key).toMatchObject({ at: tip.at, duration: tip.duration, ease: tip.ease, on: { "--x": pan.shift.x, "--y": pan.shift.y } });
    }
    expect(right.shift.y).toBeGreaterThan(0);
  });

  it("brings the figure after the tip, its caption with it, with line A, then the plaque, with line B, last", () => {
    const tipped = endOf(id, T.beam.key);
    expect(startOf(id, T.six.key)).toBeGreaterThan(tipped);
    expect(startOf(id, T.six.caption.key)).toBeLessThan(arrived(id, T.six.key));
    expect(startOf(id, a)).toBeGreaterThanOrEqual(startOf(id, T.six.key));
    expect(startOf(id, T.plaque.key)).toBeGreaterThan(endOf(id, a));
    expect(startOf(id, b)).toBeGreaterThan(startOf(id, T.plaque.key));
    expect(endOf(id, b)).toBe(longest(id));
  });

  it("ends on the tipped balance, the figure and the plaque", () => {
    expect(end[T.beam.key]).toMatchObject({ "--d": 1, "--r": TIP });
    for (const pan of T.pans) expect(end[pan.key]).toMatchObject({ "--x": pan.shift.x, "--y": pan.shift.y });
    for (const key of [T.six.key, T.six.caption.key, T.plaque.key, T.plaque.words.key]) expect(end[key].autoAlpha, key).toBe(1);
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
    expect(startOf(id, a)).toBeGreaterThan(startOf(id, tick0));
    expect(startOf(id, a)).toBeLessThan(moving[2].at);
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

  it("draws the checklist after the second tick, its heading first, then row by row, each row's tick in turn after the rows, with line B", () => {
    expect(startOf(id, G.heading.key)).toBeGreaterThan(endOf(id, tick1));
    const rows = G.list.map((row) => startOf(id, row.key));
    for (let i = 1; i < rows.length; i++) expect(rows[i]).toBeGreaterThan(rows[i - 1]);
    expect(rows[0]).toBeGreaterThan(startOf(id, G.heading.key));
    const ticks = G.list.map((row) => startOf(id, row.tick.key));
    for (let i = 1; i < ticks.length; i++) expect(ticks[i]).toBeGreaterThan(ticks[i - 1]);
    G.list.forEach((row, i) => expect(ticks[i], row.key).toBeGreaterThan(rows[i]));
    expect(startOf(id, b)).toBeGreaterThan(rows[0]);
    expect(startOf(id, b)).toBeLessThan(endOf(id, G.list.at(-1)!.tick.key));
  });

  it("ends on the checklist's last tick or line B, nothing after", () => {
    expect(Math.max(endOf(id, G.list.at(-1)!.tick.key), endOf(id, b))).toBe(longest(id));
  });

  it("ends on the stair with the box on its second step, two ticks, the third step empty, and the checklist ticked under its heading", () => {
    for (const step of G.steps) expect(end[step.key].autoAlpha, step.key).toBe(1);
    expect(end[P.key]).toMatchObject({ autoAlpha: 1, "--x": P.second.x, "--y": P.second.y });
    for (const key of [tick0, tick1, G.evidence.key, G.heading.key, ...G.list.flatMap((row) => [row.key, row.tick.key])]) expect(end[key].autoAlpha, key).toBe(1);
  });
});
