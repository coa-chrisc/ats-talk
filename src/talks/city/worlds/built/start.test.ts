/**
 * Slide 4, starting small: the desk and the lamp draw, the lamp switches
 * on, the four tiles come up on the desk one at a time with their years
 * and names, and the tag drops under the row; the slide ends on the lit
 * row.
 */
import { describe, expect, it } from "vitest";
import { CHAIN, storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { START } from "./layout-start";
import { LEAVE, at, clickOf, endOf, lastOf, playOf, startOf } from "./harness";

const CLICK = clickOf("starting-small");
const { desk, legs, lamp, light, tiles, years, names, zero } = START;
const [lineA, lineB] = storyKeys(storyId("starting-small"), 2);

describe("slide 4, starting small", () => {
  it("draws the desk and the lamp, named, before the lamp switches on, and brings line A up with the light", () => {
    for (const key of [desk.key, legs.key, lamp.key]) expect(endOf(CLICK, key), key).toBeLessThanOrEqual(startOf(CLICK, light.key));
    expect(startOf(CLICK, lamp.label.key)).toBeGreaterThan(startOf(CLICK, lamp.key));
    const [on] = playOf(CLICK, light.key);
    expect(on.on).toMatchObject({ autoAlpha: 1 });
    expect(on.duration).toBeLessThanOrEqual(0.5);
    expect(startOf(CLICK, lineA)).toBeGreaterThanOrEqual(startOf(CLICK, light.key));
    expect(startOf(CLICK, lineA)).toBeLessThan(startOf(CLICK, tiles[0].key));
  });

  it("brings the tiles up in the light one at a time, each year with the first tile over it and each name with its tile, line B with the second year", () => {
    expect(startOf(CLICK, tiles[0].key)).toBeGreaterThanOrEqual(endOf(CLICK, light.key));
    tiles.slice(1).forEach((tile, i) => expect(startOf(CLICK, tile.key), tile.key).toBeGreaterThan(startOf(CLICK, tiles[i].key) + 0.3));
    years.forEach((year, i) => {
      const first = tiles[2 * i].key;
      expect(startOf(CLICK, year.key), year.key).toBeGreaterThanOrEqual(startOf(CLICK, first));
      expect(startOf(CLICK, year.key), year.key).toBeLessThan(startOf(CLICK, tiles[2 * i + 1].key));
    });
    names.forEach((name, i) => {
      const tile = tiles[2 + i].key;
      expect(startOf(CLICK, name.key), name.key).toBeGreaterThan(startOf(CLICK, tile));
      expect(startOf(CLICK, name.key) - startOf(CLICK, tile), name.key).toBeLessThanOrEqual(0.4);
    });
    expect(startOf(CLICK, lineB)).toBe(startOf(CLICK, years[1].key));
  });

  it("drops the tag under the row last, inside the click's 12 s with the world's arrival fade", () => {
    const [drop] = playOf(CLICK, zero.key);
    expect(drop.on).toMatchObject({ autoAlpha: 1, y: 0 });
    expect(zero.drop).toBeLessThan(0);
    expect(startOf(CLICK, zero.key)).toBeGreaterThanOrEqual(Math.max(...tiles.map((tile) => endOf(CLICK, tile.key))));
    expect(lastOf(CLICK) + LEAVE).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("ends on the lamp lighting the row of four tiles, with the tag below", () => {
    const end = at(CLICK);
    expect(end[light.key].autoAlpha).toBe(1);
    for (const key of [desk.key, legs.key, lamp.key]) expect(end[key]["--d"], key).toBe(1);
    for (const key of [...tiles.map((tile) => tile.key), ...years.map((year) => year.key), ...names.map((name) => name.key), zero.key]) expect(end[key], key).toMatchObject({ autoAlpha: 1, y: 0 });
  });
});
