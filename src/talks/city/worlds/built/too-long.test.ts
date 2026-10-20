/**
 * Slide 9, Monday to Friday: the week strip draws across, the first day's
 * meeting comes up on it, the days fill in turn and on the last the app
 * lands in the stakeholder's hands; then the two loops, one after the
 * other, the tile at the far right, and the tag under the strip.
 */
import { describe, expect, it } from "vitest";
import { CHAIN, storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { TOO_LONG } from "./layout-too-long";
import { at, clickOf, endOf, lastOf, overlaps, playOf, startOf } from "./harness";

const CLICK = clickOf("too-long");
const { days, dayNames, team, table, meets, holds, app, loops, pilot, failed } = TOO_LONG;
const [lineA, lineB] = storyKeys(storyId("too-long"), 2);

describe("slide 9, Monday to Friday", () => {
  it("draws the strip a day at a time from the left, each end day named as it draws, before anyone comes", () => {
    days.slice(1).forEach((day, i) => expect(startOf(CLICK, day.key), day.key).toBeGreaterThan(startOf(CLICK, days[i].key)));
    expect(startOf(CLICK, dayNames[0].key)).toBeGreaterThanOrEqual(startOf(CLICK, days[0].key));
    expect(startOf(CLICK, dayNames[1].key)).toBeGreaterThanOrEqual(startOf(CLICK, days[4].key));
    for (const key of [...team.map((figure) => figure.key), table.key, meets.key]) expect(startOf(CLICK, key), key).toBeGreaterThanOrEqual(endOf(CLICK, days[4].key));
  });

  it("seats the first day's meeting, then fills the days in turn, and only then brings the app to the last day", () => {
    expect(startOf(CLICK, meets.label.key)).toBeGreaterThan(startOf(CLICK, meets.key));
    expect(startOf(CLICK, days[0].fill)).toBeGreaterThanOrEqual(endOf(CLICK, meets.label.key) - 0.5);
    days.slice(1).forEach((day, i) => expect(startOf(CLICK, day.fill), day.fill).toBeGreaterThan(startOf(CLICK, days[i].fill)));
    expect(startOf(CLICK, holds.key)).toBeGreaterThanOrEqual(startOf(CLICK, days[4].fill));
    expect(startOf(CLICK, app.key)).toBeGreaterThan(startOf(CLICK, holds.key));
    expect(startOf(CLICK, app.label.key)).toBeGreaterThan(startOf(CLICK, app.key));
  });

  it("lands the app from above into the hands of the stakeholder on the last day", () => {
    const [drop] = playOf(CLICK, app.key);
    expect(drop.on).toMatchObject({ autoAlpha: 1, y: 0 });
    expect(app.drop).toBeLessThan(0);
    expect(overlaps(app.at, holds.at)).toBe(true);
  });

  it("draws the two loops after the week, one after the other, each named as it closes, with line A, and lands the tile as the second reaches it", () => {
    expect(startOf(CLICK, loops[0].key)).toBeGreaterThanOrEqual(endOf(CLICK, app.label.key));
    expect(startOf(CLICK, loops[1].key)).toBeGreaterThanOrEqual(endOf(CLICK, loops[0].key) - 0.01);
    for (const entry of loops) expect(startOf(CLICK, entry.label.key), entry.label.key).toBeGreaterThan(startOf(CLICK, entry.key));
    expect(startOf(CLICK, lineA)).toBeGreaterThan(startOf(CLICK, loops[0].key));
    expect(startOf(CLICK, lineA)).toBeLessThan(startOf(CLICK, loops[1].key));
    expect(Math.abs(startOf(CLICK, pilot.key) - endOf(CLICK, loops[1].key))).toBeLessThanOrEqual(0.3);
  });

  it("drops the tag under the strip last, with line B, inside the click's 12 s", () => {
    const [drop] = playOf(CLICK, failed.key);
    expect(drop.on).toMatchObject({ autoAlpha: 1, y: 0 });
    expect(startOf(CLICK, failed.key)).toBeGreaterThanOrEqual(endOf(CLICK, pilot.key));
    expect(startOf(CLICK, lineB)).toBeGreaterThanOrEqual(startOf(CLICK, failed.key));
    expect(lastOf(CLICK)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("ends on the filled week, the two loops and the tile, with the tag below", () => {
    const end = at(CLICK);
    for (const day of days) {
      expect(end[day.key]["--d"], day.key).toBe(1);
      expect(end[day.fill]["--k"], day.fill).toBe(1);
    }
    for (const entry of loops) expect(end[entry.key]["--d"], entry.key).toBe(1);
    for (const key of [app.key, pilot.key, failed.key]) expect(end[key], key).toMatchObject({ autoAlpha: 1, y: 0 });
  });
});
