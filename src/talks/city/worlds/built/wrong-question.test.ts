/**
 * Slide 6, the turn: before any words, a few strands of spaghetti fly in
 * from the left and hit a plain wall, stick, slide down it and clear, and
 * the wall goes with them; only then does the title come up, and the
 * slide plays on: the old question, line A, the card greying aside, the
 * loop, line B, and the one idea on its way in.
 */
import { describe, expect, it } from "vitest";
import { CHAIN, storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { groupOf, titleKey } from "./layout";
import { WRONG } from "./layout-turn";
import { at, clickOf, elements, endOf, lastOf, markup, n, playOf, startOf, tagOf, world } from "./harness";

const CLICK = clickOf("wrong-question");
const { wall, strands } = WRONG.opening;
const opening = [wall.key, ...strands.map((strand) => strand.key)];
const [lineA, lineB] = storyKeys(storyId("wrong-question"), 2);
const title = titleKey("wrong-question");
/** Every part as the click begins. */
const before = world.states[n(CLICK)];
/** When a part's move that sets a value starts, by the value it sets. */
const startSetting = (key: string, prop: string, value: number) => {
  const plays = playOf(CLICK, key).filter((play) => play.on[prop] === value);
  if (!plays.length) throw new Error(`"${key}" never sets ${prop} to ${value}.`);
  return Math.min(...plays.map((play) => play.at));
};
const endSetting = (key: string, prop: string, value: number) => Math.max(...playOf(CLICK, key).filter((play) => play.on[prop] === value).map((play) => play.at + play.duration));

describe("slide 6, the turn", () => {
  it("draws the wall and each strand as one part with no words on it, in the slide's marks", () => {
    for (const key of opening) {
      expect(elements(key), key).toBe(1);
      // A shape closed straight after it opens holds no text.
      const shape = tagOf(key).match(/^<(rect|path)\b/)?.[1];
      expect(shape, key).toBeDefined();
      expect(markup, key).toContain(`${tagOf(key)}</${shape}>`);
    }
    const marks = markup.indexOf(`data-build="${groupOf("wrong-question").marks}"`);
    for (const key of opening) expect(markup.indexOf(tagOf(key)), key).toBeGreaterThan(marks);
  });

  it("starts with the wall and the strands unseen, each strand off to the left and lower down", () => {
    for (const key of opening) expect(before[key]?.autoAlpha, key).toBe(0);
    for (const strand of strands) {
      expect(before[strand.key], strand.key).toMatchObject({ x: strand.from.x, y: strand.from.y });
      expect(strand.from.x, strand.key).toBeLessThan(-300);
      expect(strand.from.y, strand.key).toBeGreaterThan(0);
    }
  });

  it("brings the wall up first, then flies the strands in from the left one after another to hit it", () => {
    const firstFlight = Math.min(...strands.map((strand) => startSetting(strand.key, "x", 0)));
    expect(endSetting(wall.key, "autoAlpha", 1)).toBeLessThanOrEqual(firstFlight + 0.2);
    strands.slice(1).forEach((strand, i) => expect(startSetting(strand.key, "x", 0), strand.key).toBeGreaterThan(startSetting(strands[i].key, "x", 0)));
    for (const strand of strands) expect(startSetting(strand.key, "autoAlpha", 1), strand.key).toBe(startSetting(strand.key, "x", 0));
  });

  it("holds each strand stuck on the wall for a moment, then slides it down and fades it out, and the wall goes once the last has cleared", () => {
    for (const strand of strands) {
      const landed = endSetting(strand.key, "x", 0);
      const slides = startSetting(strand.key, "y", strand.drop);
      expect(slides - landed, strand.key).toBeGreaterThanOrEqual(0.5);
      expect(startSetting(strand.key, "autoAlpha", 0), strand.key).toBeGreaterThan(slides);
      expect(endSetting(strand.key, "autoAlpha", 0), strand.key).toBeCloseTo(endSetting(strand.key, "y", strand.drop), 6);
    }
    const cleared = Math.max(...strands.map((strand) => endSetting(strand.key, "autoAlpha", 0)));
    expect(startSetting(wall.key, "autoAlpha", 0)).toBeGreaterThan(Math.min(...strands.map((strand) => startSetting(strand.key, "y", strand.drop))));
    expect(endSetting(wall.key, "autoAlpha", 0)).toBeGreaterThanOrEqual(cleared - 0.4);
  });

  it("shows no words until the wall and the strands are gone: the old title leaves at the click, the new one comes up after", () => {
    const gone = Math.max(...opening.map((key) => endOf(CLICK, key)));
    expect(startOf(CLICK, title)).toBeGreaterThanOrEqual(gone);
    for (const key of [WRONG.ask.key, lineA, lineB, WRONG.good.label.key, WRONG.governed.label.key, WRONG.again.key, WRONG.idea.key]) expect(startOf(CLICK, key), key).toBeGreaterThan(startOf(CLICK, title));
    const [leaves] = playOf(CLICK, titleKey("weekly"));
    expect(leaves).toMatchObject({ at: 0, on: { autoAlpha: 0 } });
    expect(leaves.at + leaves.duration).toBeLessThanOrEqual(Math.min(...strands.map((strand) => startSetting(strand.key, "x", 0))));
  });

  it("then plays the slide: the old question with line A, the card greying aside, the loop with line B, and the idea last, inside the click's 12 s", () => {
    expect(startOf(CLICK, WRONG.ask.key)).toBeLessThan(startOf(CLICK, lineA));
    const aside = playOf(CLICK, WRONG.ask.key).find((play) => play.on.x !== undefined)!;
    expect(aside.at).toBeGreaterThan(endOf(CLICK, lineA));
    expect(startOf(CLICK, WRONG.good.key)).toBeGreaterThan(aside.at);
    expect(startOf(CLICK, lineB)).toBeGreaterThan(startOf(CLICK, WRONG.good.key));
    expect(endOf(CLICK, WRONG.idea.key)).toBe(lastOf(CLICK));
    expect(lastOf(CLICK)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("ends with the wall and every strand gone, the title up, and the loop, the idea and the grey card aside in place", () => {
    const end = at(CLICK);
    for (const key of opening) expect(end[key].autoAlpha, key).toBe(0);
    expect(end[title].yPercent).toBe(0);
    expect(end[WRONG.ask.key]).toMatchObject({ "--k": 1, x: WRONG.ask.aside.x, y: WRONG.ask.aside.y });
    expect(end[WRONG.back.key]).toMatchObject({ "--d": 1 });
    expect(end[WRONG.idea.key]).toMatchObject({ x: 0, autoAlpha: 1 });
  });
});
