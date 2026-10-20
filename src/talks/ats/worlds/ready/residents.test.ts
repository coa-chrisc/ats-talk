/**
 * Slide 26, in the order its They see gives: the floor, staff behind a desk
 * with the AI helper beside them, and a resident; the fence between them; the card crosses the
 * fence while the helper stays at the desk; the orange mark lands on the
 * member of staff; the card reaches the resident only after it; the
 * checklist takes its ticks in turn.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { RESIDENTS } from "./layout-residents";
import { TICKS } from "./steps-residents";
import { at, endOf, markup, movesOf, playOf, showsAfter, startOf, world } from "./harness";

const click = "residents.play";
const R = RESIDENTS;
const [A] = storyKeys("story.residents", 2);
/** The card's own legs: up clear of the fence and down to the resident (its y), and across (its x); not its rise into view. */
const legs = (prop: "x" | "y") => movesOf(click, R.card.key, prop).filter((play) => [R.card.lift, R.card.served, R.card.across].includes(play.on[prop] as number));

describe("26, residents", () => {
  it("sets the desk side up, then the resident walks in, then the fence rises between them", () => {
    const [walk] = movesOf(click, R.resident.key, "x");
    expect(walk.at).toBeGreaterThan(startOf(click, R.helper.key));
    expect(startOf(click, R.fence.key)).toBeGreaterThanOrEqual(walk.at + walk.duration);
  });

  it("lifts the card clear of the fence before it crosses, holds it on the resident's side, and never moves the helper", () => {
    const [lift, served] = legs("y");
    const [across] = legs("x");
    expect(lift.at).toBeGreaterThanOrEqual(endOf(click, R.fence.name.key));
    expect(world.states[0][R.card.key]).toMatchObject({ x: 0, y: 0, autoAlpha: 0 });
    expect(across.at).toBeGreaterThanOrEqual(lift.at + lift.duration);
    expect(served.at).toBeGreaterThan(across.at + across.duration);
    expect(playOf(click, R.helper.key).every((play) => !("x" in play.on) && !("y" in play.on) || play.on.y === 0)).toBe(true);
  });

  it("lands the orange mark on the member of staff after the card has crossed and before it reaches the resident", () => {
    const [across] = legs("x");
    const [, served] = legs("y");
    expect(startOf(click, R.mark.key)).toBeGreaterThanOrEqual(across.at + across.duration);
    expect(served.at).toBeGreaterThanOrEqual(endOf(click, R.mark.key));
    expect(markup).toMatch(new RegExp(`class="dk-human" data-build="${R.mark.key.replace(/\./g, "\\.")}"`));
    expect(at(click)[R.card.key]).toMatchObject({ x: R.card.across, y: R.card.served });
  });

  it("brings the test up once the card is served, heading first, and ticks its lines in turn", () => {
    const [, served] = legs("y");
    expect(startOf(click, R.list.heading.key)).toBeGreaterThanOrEqual(served.at + served.duration);
    for (const row of R.list.rows) expect(startOf(click, row.key)).toBeGreaterThan(startOf(click, R.list.heading.key));
    const ticks = R.list.rows.map((row) => startOf(click, row.tick));
    expect(ticks[0]).toBeGreaterThanOrEqual(Math.max(...R.list.rows.map((row) => endOf(click, row.key))));
    expect(ticks[1] - ticks[0]).toBeCloseTo(TICKS, 5);
    for (const row of R.list.rows) expect(showsAfter(click, row.tick), row.tick).toBe(true);
  });

  it("brings the first story line in as the resident walks up, before the fence draws", () => {
    const [walk] = movesOf(click, R.resident.key, "x");
    expect(startOf(click, A)).toBeLessThan(walk.at + walk.duration);
    expect(startOf(click, A)).toBeLessThan(startOf(click, R.fence.key));
  });
});
