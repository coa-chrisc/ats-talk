/**
 * Slide 6b, how rapid application development was born: the library block
 * lands first, its count after it, with line A; the process's three blocks
 * land beside it one at a time, with line B; the base opens out under
 * all four; and last the ring draws round the row and its base together,
 * and the bubble comes up on its corner as the line closes.
 */
import { describe, expect, it } from "vitest";
import { CHAIN, covered, storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { RAD_BORN } from "./layout-rad-born";
import { at, clickOf, elements, endOf, lastOf, n, playOf, startOf, world } from "./harness";

const CLICK = clickOf("rad-born");
const { library, steps, base, ring, bubble } = RAD_BORN;
const [lineA, lineB] = storyKeys(storyId("rad-born"), 2);
/** Every part as the click begins. */
const before = world.states[n(CLICK)];
const OPEN = { "--wt": 0, "--wr": 0, "--wb": 0, "--wl": 0 };

describe("slide 6b, how rapid application development was born", () => {
  it("draws the library's outline and its module tiles as one part, and every word as its own", () => {
    for (const key of [library.key, library.name.key, library.count.key, ...steps.map((block) => block.key), base.key, ring.key, bubble.key]) expect(elements(key), key).toBe(1);
  });

  it("lands the library with its name first, then its count, with line A", () => {
    expect(startOf(CLICK, library.key)).toBe(startOf(CLICK, library.name.key));
    expect(startOf(CLICK, library.count.key)).toBeGreaterThan(startOf(CLICK, library.key));
    expect(startOf(CLICK, lineA)).toBeGreaterThan(startOf(CLICK, library.key));
    expect(startOf(CLICK, lineA)).toBeLessThan(startOf(CLICK, steps[0].key));
  });

  it("lands the process's three blocks from above after the library, one at a time from the left, with line B", () => {
    expect(startOf(CLICK, steps[0].key)).toBeGreaterThanOrEqual(endOf(CLICK, library.count.key));
    steps.slice(1).forEach((block, i) => expect(startOf(CLICK, block.key), block.key).toBeGreaterThan(startOf(CLICK, steps[i].key)));
    for (const block of steps) {
      const [drop] = playOf(CLICK, block.key);
      expect(drop.on, block.key).toMatchObject({ autoAlpha: 1, y: 0 });
      expect(before[block.key], block.key).toMatchObject({ autoAlpha: 0, y: RAD_BORN.drop });
    }
    expect(startOf(CLICK, lineB)).toBeGreaterThan(startOf(CLICK, steps[0].key));
    expect(startOf(CLICK, lineB)).toBeLessThan(startOf(CLICK, base.key));
  });

  it("opens the base out from the left under all four once they stand", () => {
    expect(startOf(CLICK, base.key)).toBeGreaterThanOrEqual(endOf(CLICK, steps[2].key));
    const [opens] = playOf(CLICK, base.key);
    expect(opens.on).toEqual(OPEN);
    expect(before[base.key]).toEqual(covered("left"));
  });

  it("draws the ring round the row once the base is under it, then brings the bubble up on its corner as the line closes, last, inside the click's 12 s", () => {
    expect(before[ring.key]).toMatchObject({ "--d": 0 });
    expect(before[bubble.key]).toMatchObject({ autoAlpha: 0, scale: bubble.from });
    expect(startOf(CLICK, ring.key)).toBeGreaterThanOrEqual(endOf(CLICK, base.key));
    expect(startOf(CLICK, bubble.key)).toBeGreaterThan(startOf(CLICK, ring.key));
    expect(startOf(CLICK, bubble.key)).toBeLessThan(endOf(CLICK, ring.key));
    expect(endOf(CLICK, bubble.key)).toBe(lastOf(CLICK));
    expect(lastOf(CLICK)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("ends on the four blocks standing on the base, the count on the library, the ring round them and the bubble on it", () => {
    const end = at(CLICK);
    for (const key of [library.key, library.name.key, library.count.key, ...steps.map((block) => block.key)]) expect(end[key], key).toMatchObject({ autoAlpha: 1, y: 0 });
    expect(end[base.key]).toMatchObject(OPEN);
    expect(end[ring.key]).toMatchObject({ "--d": 1 });
    expect(end[bubble.key]).toMatchObject({ autoAlpha: 1, scale: 1 });
  });
});
