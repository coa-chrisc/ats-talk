/**
 * Slides 18 and 19, in the order their They see gives: the tiles, the first
 * lit and named, the project dots, the measure from its first point to the
 * point it aims at; the departments, the form lighting people as it passes,
 * the teams, and one nameplate in each.
 */
import { describe, expect, it } from "vitest";
import { NORTH_STAR, PEOPLE, litFraction } from "./layout-goals";
import { at, clickOf, endOf, playOf, showsAtEnd, startOf } from "./harness";

describe("18, the North Star goals", () => {
  const click = clickOf("north-star");
  const N = NORTH_STAR;

  it("draws the tiles, then lights the first and names it, then brings the dots up", () => {
    expect(startOf(click, N.lit.key)).toBeGreaterThanOrEqual(endOf(click, N.tiles[0].key));
    expect(startOf(click, N.name.key)).toBeGreaterThan(startOf(click, N.lit.key));
    expect(Math.min(...N.dots.map((dot) => startOf(click, dot.key)))).toBeGreaterThanOrEqual(endOf(click, N.name.key));
  });

  it("brings every dot up from below to its tile's foot", () => {
    for (const dot of N.dots) {
      expect(playOf(click, dot.key, "y"), dot.key).toHaveLength(1);
      expect(at(click)[dot.key].y, dot.key).toBe(0);
      expect(showsAtEnd(click, dot.key), dot.key).toBe(true);
    }
  });

  it("rings one dot once they have all landed, drops its leader, and draws its measure from the first point to the point it aims at", () => {
    const landed = Math.max(...N.dots.map((dot) => endOf(click, dot.key)));
    expect(startOf(click, N.chosen.ring.key)).toBeGreaterThanOrEqual(landed);
    expect(startOf(click, N.chosen.leader.key)).toBeGreaterThan(startOf(click, N.chosen.ring.key));
    expect(startOf(click, N.measure.start.key)).toBeGreaterThan(startOf(click, N.chosen.leader.key));
    expect(startOf(click, N.measure.key)).toBeGreaterThanOrEqual(endOf(click, N.measure.startLabel.key));
    expect(startOf(click, N.measure.end.key)).toBeGreaterThan(startOf(click, N.measure.key));
    expect(startOf(click, N.measure.endLabel.key)).toBeGreaterThan(startOf(click, N.measure.end.key));
    for (const key of [N.measure.key, N.measure.end.key, N.measure.endLabel.key, N.chosen.ring.key]) expect(showsAtEnd(click, key), key).toBe(true);
  });
});

describe("19, the people", () => {
  const click = clickOf("people");
  const P = PEOPLE;
  const [travel] = playOf(click, P.form.key, "x");

  it("draws the departments and names the staff before the form sets off", () => {
    expect(travel.at).toBeGreaterThanOrEqual(endOf(click, P.staff.key));
    expect(travel.at).toBeGreaterThanOrEqual(endOf(click, P.depts[2].key));
  });

  it("lights each person found as the form passes over them, left to right, and takes the form away at the end of its pass", () => {
    const lights = P.found.map((found) => ({ found, at: startOf(click, found.light) })).sort((a, b) => a.at - b.at);
    expect(lights.map(({ found }) => found.key)).toEqual([...P.found].sort((a, b) => litFraction(a) - litFraction(b)).map((found) => found.key));
    for (const { found, at: lit } of lights) {
      expect(lit, found.key).toBeGreaterThan(travel.at);
      expect(lit, found.key).toBeLessThan(travel.at + travel.duration);
      expect(litFraction(found), found.key).toBeGreaterThan(0);
      expect(litFraction(found), found.key).toBeLessThan(1);
    }
    expect(at(click)[P.form.key].autoAlpha).toBe(0);
  });

  it("walks the lit people into their teams only once the last is lit, and puts up the nameplates once they have all arrived", () => {
    const lit = Math.max(...P.found.map((found) => endOf(click, found.light)));
    const walks = P.found.map((found) => playOf(click, found.key, "x")[0]);
    for (const walk of walks) expect(walk.at, walk.key).toBeGreaterThanOrEqual(lit);
    const arrived = Math.max(...P.found.map((found) => endOf(click, found.key)));
    for (const team of P.teams) {
      expect(startOf(click, team.plate.key), team.key).toBeGreaterThanOrEqual(arrived);
      expect(showsAtEnd(click, team.plate.key), team.key).toBe(true);
    }
    for (const found of P.found) expect(at(click)[found.key], found.key).toMatchObject(found.to);
  });

  it("sets the walkers off 0.12 s apart, and draws each team's outline only as its first person lands", () => {
    const walks = P.found.map((found) => playOf(click, found.key, "x")[0]).sort((a, b) => a.at - b.at);
    walks.slice(1).forEach((walk, i) => expect(walk.at - walks[i].at, walk.key).toBeCloseTo(0.12, 6));
    P.teams.forEach((team, t) => {
      const lands = Math.min(...P.found.filter((found) => found.team === t).map((found) => endOf(click, found.key, "x")));
      expect(startOf(click, team.key), team.key).toBeGreaterThanOrEqual(lands - 0.2);
      expect(showsAtEnd(click, team.key), team.key).toBe(true);
    });
  });

  it("never has two walkers over each other while both are on their way", async () => {
    await import("@/components/deck/engine/gsap");
    const { gsap } = await import("gsap");
    const walks = P.found.map((found) => ({ found, play: playOf(click, found.key, "x")[0] }));
    const ease = gsap.parseEase(walks[0].play.ease as string);
    const where = ({ found, play }: (typeof walks)[number], t: number) => {
      const k = ease(Math.min(1, Math.max(0, (t - play.at) / play.duration)));
      return { x: found.at.x + found.to.x * k, y: found.at.y + found.to.y * k };
    };
    const from = Math.min(...walks.map(({ play }) => play.at));
    const to = Math.max(...walks.map(({ play }) => play.at + play.duration));
    const moving = ({ play }: (typeof walks)[number], t: number) => t >= play.at && t <= play.at + play.duration;
    const { w, h } = P.found[0].at;
    for (let t = from; t <= to; t += 0.005) {
      const going = walks.filter((walk) => moving(walk, t));
      const spots = going.map((walk) => where(walk, t));
      spots.forEach((a, i) => spots.slice(i + 1).forEach((b, j) => expect(Math.abs(a.x - b.x) >= w || Math.abs(a.y - b.y) >= h, `${going[i].found.key} / ${going[i + 1 + j].found.key} at ${t.toFixed(3)}`).toBe(true)));
    }
  });

  it("keeps the people found lit after they walk", () => {
    for (const found of P.found) expect(showsAtEnd(click, found.light), found.key).toBe(true);
  });
});

describe("the moments things light as a part passes", () => {
  it("are where the house drawing curve has carried the part that far", async () => {
    const { gsap } = await import("gsap");
    const { EASE } = await import("@/components/deck/kit");
    const { passing } = await import("./beats");
    const ease = gsap.parseEase(EASE.draw);
    for (const fraction of [0.05, 0.2, 0.45, 0.5, 0.62, 0.9, 0.98]) expect(ease(passing({ at: 0, duration: 1 }, [fraction])[0]), String(fraction)).toBeCloseTo(fraction, 6);
  });
});
