/**
 * Slide 21a, in the order its They see gives: staff at a desk with the AI
 * helper, and a resident; the fence between them; the card crosses the
 * fence; the orange mark lands on the member of staff; the card reaches the
 * resident only after it; the checklist takes its ticks in turn.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { STORIES } from "./layout";
import { RESIDENTS } from "./layout-residents";
import { at, clickOf, endOf, markup, playOf, showsAtEnd, startOf } from "./harness";

const click = clickOf("residents");
const R = RESIDENTS;
/** The card's own legs: up clear of the fence and down to the resident (its y), and across (its x); not its rise into view. */
const moves = (prop: "x" | "y") => playOf(click, R.card.key, prop).filter((play) => [R.card.lift, R.card.served, R.card.across].includes(play.on[prop] as number)).sort((a, b) => a.at - b.at);

describe("21a, residents", () => {
  it("sets the desk side up, then the resident walks in, then the fence draws between them", () => {
    const [walk] = playOf(click, R.resident.key, "x");
    expect(walk.at).toBeGreaterThan(startOf(click, R.helper.key));
    expect(startOf(click, R.fence.key)).toBeGreaterThanOrEqual(walk.at + walk.duration);
  });

  it("lifts the card clear of the fence before it crosses, and holds it on the resident's side", () => {
    const [lift, served] = moves("y");
    const [across] = moves("x");
    expect(lift.at).toBeGreaterThanOrEqual(endOf(click, R.fence.name.key));
    expect(across.at).toBeGreaterThanOrEqual(lift.at + lift.duration);
    expect(served.at).toBeGreaterThan(across.at + across.duration);
  });

  it("lands the orange mark on the member of staff after the card has crossed and before it reaches the resident", () => {
    const [across] = moves("x");
    const [, served] = moves("y");
    const mark = startOf(click, R.mark.key);
    expect(mark).toBeGreaterThanOrEqual(across.at + across.duration);
    expect(served.at).toBeGreaterThanOrEqual(endOf(click, R.mark.key));
    expect(markup).toMatch(new RegExp(`class="dk-human"[^>]*data-build="${R.mark.key.replace(/\./g, "\\.")}"|data-build="${R.mark.key.replace(/\./g, "\\.")}"[^>]*class="dk-human"`));
    expect(at(click)[R.card.key]).toMatchObject({ x: R.card.across, y: R.card.served });
  });

  it("brings the checklist up once the card is served, and ticks its lines in turn", () => {
    const [, served] = moves("y");
    expect(startOf(click, R.list.key)).toBeGreaterThanOrEqual(served.at + served.duration);
    const ticks = R.list.rows.map((row) => startOf(click, row.tick));
    expect(ticks[0]).toBeGreaterThanOrEqual(Math.max(...R.list.rows.map((row) => endOf(click, row.key))));
    expect([...ticks].sort((a, b) => a - b)).toEqual(ticks);
    expect(new Set(ticks).size).toBe(3);
    ticks.slice(1).forEach((tick, i) => expect(tick - ticks[i]).toBeCloseTo(0.2, 5));
    for (const row of R.list.rows) expect(showsAtEnd(click, row.tick), row.tick).toBe(true);
  });

  it("brings the first story line in as the resident walks up, before the fence draws", () => {
    const band = STORIES.find((entry) => entry.picture === "residents")!;
    const [a] = storyKeys(band.id, band.lines.length);
    const [walk] = playOf(click, R.resident.key, "x");
    expect(startOf(click, a)).toBeLessThan(walk.at + walk.duration);
    expect(startOf(click, a)).toBeLessThan(startOf(click, R.fence.key));
  });

  it("raises the checklist's heading with the checklist, before its lines", () => {
    expect(startOf(click, R.list.heading.key)).toBeGreaterThanOrEqual(startOf(click, R.list.key));
    expect(startOf(click, R.list.heading.key)).toBeLessThan(Math.min(...R.list.rows.map((row) => startOf(click, row.key))));
    expect(showsAtEnd(click, R.list.heading.key)).toBe(true);
  });
});
