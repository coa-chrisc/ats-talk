/**
 * Each of Part 1's clicks, beat by beat, against what its They see says it
 * shows and in what order, and the flow every click keeps: the stage never
 * still for more than 3 s (flow.test.ts checks only the worlds the deck
 * lists, so it is checked here too).
 */
import { describe, expect, it } from "vitest";
import { CHAIN, HOLD, storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { OPENING, storyKeysOf, titleKey } from "./layout";
import { EXISTS } from "./layout-exists";
import { FLEET } from "./layout-fleet";
import { POSITION } from "./layout-position";
import { WORLD_MOVED } from "./layout-world-moved";
import { ARRIVE } from "./moves";
import { at, before, elements, endOf, ids, playOf, playsAt, startOf, stepOf, tagOf, world } from "./harness";
import { headOf, personOf } from "./parts-figures";

const storyAt = (pictureId: string, line: 0 | 1) => startOf(stepOf(pictureId), storyKeys(storyId(pictureId), 2)[line]);

describe("every click", () => {
  it.each(ids)("keeps %s moving: never still for more than 3 s", (id) => {
    let landed = 0;
    let still = 0;
    for (const play of [...world.plays[ids.indexOf(id)]].sort((a, b) => a.at - b.at)) {
      still = Math.max(still, play.at - landed);
      const many = "key" in play ? elements(play.key) : 1;
      landed = Math.max(landed, play.at + play.duration + play.stagger * Math.max(0, many - 1));
    }
    expect(still).toBeLessThanOrEqual(CHAIN.still);
  });

  it.each(ids)("ends %s on a drawing or a story line landing, not a hold", (id) => {
    const plays = playsAt(id);
    const last = Math.max(...plays.map((play) => play.at + play.duration));
    // Something is still arriving within the last second of the chain.
    expect(plays.some((play) => play.at > last - 1)).toBe(true);
  });
});

describe("slide 1, the title", () => {
  const id = stepOf("title");
  it("brings the title up first, then grows the rule, then story line A, then B, and moves nothing else", () => {
    expect(startOf(id, OPENING.title.key)).toBe(ARRIVE);
    expect(startOf(id, OPENING.rule.key)).toBeGreaterThan(startOf(id, OPENING.title.key));
    expect(storyAt("title", 0)).toBeGreaterThan(startOf(id, OPENING.rule.key));
    expect(storyAt("title", 1)).toBeGreaterThan(storyAt("title", 0));
    expect([...new Set(playsAt(id).map((play) => play.key))].sort()).toEqual([OPENING.html, OPENING.title.key, OPENING.rule.key, ...storyKeysOf("title")].sort());
  });
});

describe("slide 2, the world moved", () => {
  const id = stepOf("world-moved");
  const W = WORLD_MOVED;
  const draw = playOf(id, W.line.key)[0];
  const landing = W.figures.map((entry) => startOf(id, entry.key));

  it("draws the line left to right, its first year as it starts and its last as it ends", () => {
    expect(startOf(id, W.years[0].key)).toBeLessThan(draw.at + 0.3);
    expect(startOf(id, W.years[1].key)).toBeGreaterThan(draw.at + draw.duration - 0.3);
  });

  it("lands each figure on the line in turn as the line's front passes it, each named with its caption as it lands", () => {
    for (let i = 1; i < landing.length; i++) expect(landing[i] - landing[i - 1]).toBeGreaterThan(0.5);
    for (const [i, entry] of W.figures.entries()) {
      expect(landing[i]).toBeGreaterThan(draw.at);
      expect(landing[i]).toBeLessThan(draw.at + draw.duration);
      expect(startOf(id, entry.name.key)).toBeGreaterThan(landing[i]);
      expect(startOf(id, entry.caption.key)).toBeGreaterThan(startOf(id, entry.name.key));
      expect(startOf(id, entry.caption.key) - landing[i]).toBeLessThan(0.6);
    }
    expect(startOf(id, personOf(W.figures[1].key))).toBeGreaterThan(landing[1]);
    expect(startOf(id, headOf(W.figures[2].key))).toBeGreaterThan(landing[2]);
  });

  it("raises the three indigo figures in turn once the line is done, story line A with the first", () => {
    const stats = W.stats.map((stat) => startOf(id, stat.key));
    expect(stats[0]).toBeGreaterThan(endOf(id, W.line.key));
    for (let i = 1; i < 3; i++) expect(stats[i]).toBeGreaterThan(stats[i - 1]);
    for (const stat of W.stats) expect(startOf(id, stat.caption.key) - startOf(id, stat.key)).toBeLessThanOrEqual(0.2);
    expect(storyAt("world-moved", 0)).toBeGreaterThan(stats[0]);
    expect(storyAt("world-moved", 0)).toBeLessThan(stats[1] + 0.2);
  });

  it("lands the grey figure last, after a hold to read the first three", () => {
    const grey = startOf(id, W.stats[3].key);
    const read = Math.max(...W.stats.slice(0, 3).flatMap((stat) => [endOf(id, stat.key), endOf(id, stat.caption.key)]));
    expect(grey - read).toBeGreaterThanOrEqual(HOLD.read - 1e-9);
    expect(grey).toBeGreaterThan(endOf(id, storyKeysOf("world-moved")[0]));
    expect(storyAt("world-moved", 1)).toBeGreaterThan(grey);
    expect(tagOf(W.stats[3].key)).toContain("sd-figure--grey");
    for (const stat of W.stats.slice(0, 3)) expect(tagOf(stat.key)).toContain("sd-figure--catalog");
  });
});

describe("slide 3, the position", () => {
  const id = stepOf("position");
  const P = POSITION;

  it("draws the track, then the pack far along it, then the home runner at the start", () => {
    expect(startOf(id, P.start.key)).toBeGreaterThan(startOf(id, P.track.key));
    const pack = Math.min(...P.pack.keys.map((key) => startOf(id, key)));
    expect(pack).toBeGreaterThan(startOf(id, P.track.key) + 0.8);
    expect(startOf(id, P.pack.name.key)).toBeGreaterThan(pack);
    expect(startOf(id, P.city.key)).toBeGreaterThan(Math.max(...P.pack.keys.map((key) => endOf(id, key))) - 0.4);
    expect(startOf(id, P.city.name.key)).toBeGreaterThan(startOf(id, P.city.key));
  });

  it("drops the grey tag over the home runner, with story line A", () => {
    expect(startOf(id, P.tag.key)).toBeGreaterThan(startOf(id, P.city.key));
    expect(storyAt("position", 0)).toBeGreaterThan(startOf(id, P.tag.key));
  });

  it("then, after a hold, lands the post beside the runner, its name and tick with it, with story line B", () => {
    expect(startOf(id, P.post.key)).toBeGreaterThan(endOf(id, storyKeysOf("position")[0]));
    expect(startOf(id, P.post.tick.key)).toBeGreaterThan(startOf(id, P.post.key));
    expect(startOf(id, P.post.name.key)).toBeGreaterThan(startOf(id, P.post.key));
    expect(storyAt("position", 1)).toBeGreaterThan(startOf(id, P.post.tick.key));
    expect(tagOf(P.post.tick.key)).toContain("dk-pass-tick");
  });

  it("raises the budget figure at the foot last, its caption with it", () => {
    expect(startOf(id, P.budget.key)).toBeGreaterThan(startOf(id, P.post.key));
    expect(startOf(id, P.budget.caption.key) - startOf(id, P.budget.key)).toBeLessThanOrEqual(0.2);
  });

  it("ends on the track, both runners, the grey tag, the ticked post and the figure", () => {
    const end = at(id);
    for (const key of [P.track.key, P.start.key]) expect(end[key]["--d"], key).toBe(1);
    for (const key of [...P.pack.keys, P.city.key, P.tag.key, P.post.key, P.post.tick.key, P.budget.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[P.tag.key]).toMatchObject({ "--y": 0, "--s": 1 });
  });
});

describe("slide 4, what exists", () => {
  const id = stepOf("exists");
  const E = EXISTS;

  it("brings the grid up and names it once, before any lantern lights", () => {
    expect(startOf(id, E.name.key)).toBeGreaterThan(startOf(id, E.grid.key));
    const first = Math.min(...[...E.named, ...E.unnamed].map((lit) => startOf(id, lit.key)));
    expect(first).toBeGreaterThan(startOf(id, E.name.key));
    expect(playOf(id, E.name.key)).toHaveLength(1);
  });

  it("lights the first named box, then the second, each named as it lights, story line A between them", () => {
    const [a, b] = E.named;
    expect(startOf(id, b.key)).toBeGreaterThan(startOf(id, a.key));
    for (const lit of E.named) {
      expect(startOf(id, lit.leader.key)).toBeGreaterThan(startOf(id, lit.key));
      expect(startOf(id, lit.name.key)).toBeGreaterThan(startOf(id, lit.leader.key));
      expect(startOf(id, lit.caption.key)).toBeGreaterThan(startOf(id, lit.name.key));
    }
    expect(storyAt("exists", 0)).toBeGreaterThan(startOf(id, a.key));
    expect(storyAt("exists", 0)).toBeLessThan(startOf(id, b.key));
  });

  it("then the smaller lanterns light one after another, after both named ones", () => {
    const small = E.unnamed.map((lit) => startOf(id, lit.key));
    expect(small[0]).toBeGreaterThan(startOf(id, E.named[1].caption.key));
    for (let i = 1; i < small.length; i++) expect(small[i]).toBeGreaterThan(small[i - 1]);
  });

  it("forms the ring of nine dots round the grid as it draws, named, with story line B", () => {
    const ring = playOf(id, E.ring.key)[0];
    expect(ring.at).toBeGreaterThan(Math.max(...E.unnamed.map((lit) => startOf(id, lit.key))));
    const dots = E.ring.dots.map((dot) => startOf(id, dot.key));
    for (let i = 1; i < dots.length; i++) expect(dots[i]).toBeGreaterThan(dots[i - 1]);
    for (const t of dots) expect(t).toBeLessThan(ring.at + ring.duration);
    expect(storyAt("exists", 1)).toBeGreaterThan(ring.at);
  });

  it("drops the tag under the grid, then after a hold the grey tag apart", () => {
    expect(startOf(id, E.staff.key)).toBeGreaterThan(startOf(id, E.ring.name.key));
    expect(startOf(id, E.apart.key) - endOf(id, E.staff.key)).toBeGreaterThanOrEqual(1);
  });

  it("ends on the lit grid, the ring, the two tags and the grey tag", () => {
    const end = at(id);
    for (const lit of [...E.named, ...E.unnamed]) expect(end[lit.key]["--k"], lit.key).toBe(1);
    expect(end[E.ring.key]["--d"]).toBe(1);
    for (const key of [E.grid.key, ...E.ring.dots.map((dot) => dot.key), E.staff.key, E.apart.key]) expect(end[key].autoAlpha, key).toBe(1);
  });
});

describe("slide 4a, the fleet", () => {
  const id = stepOf("fleet");
  const F = FLEET;
  const S = F.stair;

  it("draws the fence, then the leads fill the outline block by block, story line A as they do", () => {
    const blocks = F.app.slots.map((slot) => startOf(id, slot.key));
    expect(Math.min(...F.leads.keys.map((key) => startOf(id, key)))).toBeGreaterThan(startOf(id, F.fence.key));
    expect(blocks[0]).toBeGreaterThan(startOf(id, F.app.key));
    for (let i = 1; i < blocks.length; i++) expect(blocks[i]).toBeGreaterThan(blocks[i - 1]);
    expect(storyAt("fleet", 0)).toBeGreaterThan(blocks[0]);
  });

  it("brings the reviewers in once the application is built, then the person and the orange mark", () => {
    const built = Math.max(...F.app.slots.map((slot) => endOf(id, slot.key)));
    const reviewers = Math.min(...F.reviewers.keys.map((key) => startOf(id, key)));
    expect(reviewers).toBeGreaterThan(built - 0.5);
    expect(startOf(id, F.checked.key)).toBeGreaterThan(reviewers);
    expect(startOf(id, F.person.key)).toBeGreaterThan(startOf(id, F.checked.key));
    expect(startOf(id, F.mark.key)).toBeGreaterThan(startOf(id, F.person.key));
  });

  it("settles the two plates side by side, then wipes the dashed one on apart, with story line B", () => {
    const [a, b] = F.plates.map((plate) => startOf(id, plate.key));
    expect(a).toBeGreaterThan(startOf(id, F.mark.key));
    expect(b).toBeGreaterThan(a);
    const wiped = playOf(id, F.joining.key)[0];
    expect(wiped.at).toBeGreaterThan(b);
    expect(Object.keys(wiped.on)).toEqual(["--wt", "--wr", "--wb", "--wl"]);
    expect(storyAt("fleet", 1)).toBeGreaterThan(wiped.at);
  });

  it("lights the first three gates green in turn and leaves the top grey, its tag dropping after", () => {
    const lit = S.steps.filter((entry) => entry.lit).map((entry) => playOf(id, entry.key).find((play) => "--k" in play.on)!.at);
    for (let i = 1; i < lit.length; i++) expect(lit[i]).toBeGreaterThan(lit[i - 1]);
    expect(playOf(id, S.steps[3].key).some((play) => "--k" in play.on)).toBe(false);
    expect(startOf(id, S.tag.key)).toBeGreaterThan(lit[2]);
    expect(lit[0]).toBeGreaterThan(storyAt("fleet", 1) - 1);
  });

  it("ends on the yard, the agents at work, the orange mark, the plates and the stair with its grey top step, the fence tag last", () => {
    const end = at(id);
    expect(startOf(id, F.overYears.key)).toBeGreaterThan(startOf(id, S.tag.key));
    expect(end[F.fence.key]["--d"]).toBe(1);
    for (const slot of F.app.slots) expect(end[slot.key]["--k"], slot.key).toBe(1);
    expect(end[F.mark.key]).toMatchObject({ autoAlpha: 1, "--d": 1 });
    for (const entry of S.steps) expect(end[entry.key]["--k"] ?? 0, entry.key).toBe(entry.lit ? 1 : 0);
    expect(end[F.joining.key]).toMatchObject({ "--wt": 0, "--wr": 0, "--wb": 0, "--wl": 0 });
    for (const key of [...F.plates.map((plate) => plate.key), S.tag.key, F.overYears.key]) expect(end[key].autoAlpha, key).toBe(1);
  });
});

describe("the white slides' titles", () => {
  it("change at the start of each click, the old one gone at once", () => {
    for (const pictureId of ["world-moved", "position", "exists", "fleet"]) {
      const id = stepOf(pictureId);
      expect(startOf(id, titleKey(pictureId)), pictureId).toBeLessThan(0.5);
      expect(before(id)[titleKey(pictureId)].yPercent, pictureId).toBe(120);
    }
  });
});
