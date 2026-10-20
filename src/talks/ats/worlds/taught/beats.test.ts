/**
 * Slides 5 to 8 as they play: each click follows its They see in order,
 * a story line rises inside the beat it describes, and the click ends on
 * the picture the script describes.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { LADDER } from "./layout-ladder";
import { TALENT, TIP } from "./layout-talent";
import { ENFORCE } from "./layout-enforce";
import { INCIDENTS } from "./layout-incidents";
import { arrived, at, before, endOf, longest, playOf, startOf, stepOf } from "./harness";

const storyOf = (pictureId: string) => storyKeys(storyId(pictureId), 2);

describe("slide 5, the ladder", () => {
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

describe("slide 6, the balance", () => {
  const T = TALENT;
  const id = stepOf("talent");
  const end = at(id);
  const [a, b] = storyOf("talent");
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

  it("brings the figure after the tip, with line A, then the bar, its middle filling, with line B, then the plaque", () => {
    const tipped = endOf(id, T.beam.key);
    expect(startOf(id, T.six.key)).toBeGreaterThan(tipped);
    expect(startOf(id, T.six.caption.key)).toBeLessThan(arrived(id, T.six.key));
    expect(startOf(id, a)).toBeGreaterThanOrEqual(startOf(id, T.six.key));
    expect(startOf(id, T.bar.key)).toBeGreaterThan(endOf(id, a));
    expect(startOf(id, T.bar.fill)).toBeGreaterThan(startOf(id, T.bar.parts[2].key));
    expect(startOf(id, b)).toBeGreaterThanOrEqual(startOf(id, T.bar.key));
    expect(startOf(id, T.plaque.key)).toBeGreaterThan(endOf(id, T.bar.fill));
  });

  it("ends on the tipped balance, the figure, the bar with its middle green, and the plaque", () => {
    expect(end[T.beam.key]).toMatchObject({ "--d": 1, "--r": TIP });
    for (const pan of T.pans) expect(end[pan.key]).toMatchObject({ "--x": pan.shift.x, "--y": pan.shift.y });
    for (const key of [T.six.key, T.six.caption.key, T.bar.key, T.bar.caption.key, T.plaque.key, T.plaque.words.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[T.bar.fill]["--k"]).toBe(1);
  });
});

describe("slide 7, the descending stair and the dial", () => {
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

  it("drops the post onto the top block, then its tick and label land, with line A", () => {
    expect(startOf(id, E.post.key)).toBeGreaterThan(endOf(id, E.arrow.label.key));
    expect(before(id)[E.post.key]["--y"]).toBe(E.post.drop);
    const landed = endOf(id, E.post.key);
    expect(startOf(id, E.tick.key)).toBeGreaterThanOrEqual(landed);
    expect(startOf(id, E.list.key)).toBeGreaterThan(startOf(id, E.tick.key));
    expect(startOf(id, a)).toBeGreaterThan(startOf(id, E.post.key));
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

  it("ends on the stair, the ticked post and the dial, the needle resting on the first setting", () => {
    for (const step of E.steps) expect(end[step.key]["--k"], step.key).toBe(1);
    expect(end[E.post.key]).toMatchObject({ autoAlpha: 1, "--y": 0 });
    expect(end[E.tick.key].autoAlpha).toBe(1);
    expect(end[D.needle.key]).toMatchObject({ autoAlpha: 1, "--r": D.needle.rest });
    for (const tick of D.ticks) expect(end[tick.key]["--d"], tick.key).toBe(1);
  });
});

describe("slide 8, the three incidents", () => {
  const I = INCIDENTS;
  const id = stepOf("incidents");
  const end = at(id);
  const [a, b] = storyOf("incidents");

  it("settles the cards one after another, each with its name, its line, then its grey tag", () => {
    const starts = I.cards.map((card) => startOf(id, card.key));
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(endOf(id, I.cards[i - 1].tag.key));
    for (const card of I.cards) {
      expect(startOf(id, card.name.key)).toBeGreaterThan(startOf(id, card.key));
      expect(startOf(id, card.what.key)).toBeGreaterThan(startOf(id, card.name.key));
      expect(startOf(id, card.tag.key)).toBeGreaterThan(startOf(id, card.what.key));
    }
  });

  it("raises line A with the first card and line B with the second", () => {
    expect(startOf(id, a)).toBeGreaterThan(startOf(id, I.cards[0].key));
    expect(startOf(id, a)).toBeLessThan(startOf(id, I.cards[1].key));
    expect(startOf(id, b)).toBeGreaterThan(startOf(id, I.cards[1].key));
    expect(startOf(id, b)).toBeLessThan(startOf(id, I.cards[2].key));
  });

  it("draws the line under all three last, its words under it, and ends there", () => {
    expect(startOf(id, I.line.key)).toBeGreaterThan(endOf(id, I.cards[2].tag.key));
    expect(startOf(id, I.label.key)).toBeGreaterThan(startOf(id, I.line.key));
    expect(endOf(id, I.label.key)).toBe(longest(id));
    for (const card of I.cards) for (const key of [card.key, card.name.key, card.what.key, card.tag.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[I.line.key]["--d"]).toBe(1);
  });
});
