/**
 * Each of Part 4's clicks, beat by beat, against what its They see says it
 * shows and in what order, and the flow every click keeps: the stage never
 * still for more than 3 s (flow.test.ts checks only the worlds the deck
 * lists, so it is checked here too).
 */
import { describe, expect, it } from "vitest";
import { CHAIN, HOLD } from "@/components/deck/kit";
import { storyKeysOf, titleKey } from "./layout";
import { EXISTS } from "./layout-exists";
import { FITS } from "./layout-fits";
import { FLEET, TRIP } from "./layout-fleet";
import { INFRASTRUCTURE } from "./layout-infrastructure";
import { NOTICED } from "./layout-noticed";
import { TRACK } from "./layout-track";
import { ARRIVE } from "./moves";
import { MARKER_AT } from "./steps-fleet";
import { CITY_STANDS } from "./track-geometry";
import { at, before, elements, endOf, ids, playOf, playsAt, startOf, stepOf, world } from "./harness";

const storyAt = (pictureId: string, line: 0 | 1) => startOf(stepOf(pictureId), storyKeysOf(pictureId)[line]);

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
    expect(plays.some((play) => play.at > last - 1)).toBe(true);
  });

  it("changes each slide's title at the start of its click, the old one gone at once; the first comes up as the world arrives", () => {
    expect(startOf(stepOf("track"), titleKey("track"))).toBe(ARRIVE);
    for (const pictureId of ["exists", "noticed", "infrastructure", "fits", "fleet"]) {
      const id = stepOf(pictureId);
      expect(startOf(id, titleKey(pictureId)), pictureId).toBeLessThan(0.5);
      expect(before(id)[titleKey(pictureId)].yPercent, pictureId).toBe(120);
    }
  });
});

describe("slide 11, the track", () => {
  const id = stepOf("track");
  const P = TRACK;

  it("draws the track, then the pack far along it, then the home runner at the start", () => {
    expect(startOf(id, P.start.key)).toBeGreaterThan(startOf(id, P.track.key));
    const pack = Math.min(...P.pack.keys.map((key) => startOf(id, key)));
    expect(pack).toBeGreaterThan(startOf(id, P.track.key) + 0.8);
    expect(startOf(id, P.pack.name.key)).toBeGreaterThan(pack);
    expect(startOf(id, P.city.key)).toBeGreaterThan(Math.max(...P.pack.keys.map((key) => endOf(id, key))) - 0.4);
    expect(startOf(id, P.city.name.key)).toBeGreaterThan(startOf(id, P.city.key));
  });

  it("drops the grey tag after the home runner, with story line A", () => {
    expect(startOf(id, P.tag.key)).toBeGreaterThan(startOf(id, P.city.key));
    expect(storyAt("track", 0)).toBeGreaterThan(startOf(id, P.tag.key));
  });

  it("then, after a hold, lands the post beside the runner, its name and tick with it, with story line B last", () => {
    expect(startOf(id, P.post.key)).toBeGreaterThan(endOf(id, storyKeysOf("track")[0]));
    expect(startOf(id, P.post.tick.key)).toBeGreaterThan(startOf(id, P.post.key));
    expect(startOf(id, P.post.name.key)).toBeGreaterThan(startOf(id, P.post.key));
    expect(storyAt("track", 1)).toBeGreaterThan(startOf(id, P.post.tick.key));
    expect(Math.max(...playsAt(id).map((play) => play.at))).toBe(storyAt("track", 1));
  });

  it("ends on the track, the pack, the City at the line, the grey tag and the ticked post", () => {
    const end = at(id);
    for (const key of [P.track.key, P.start.key]) expect(end[key]["--d"], key).toBe(1);
    for (const key of [...P.pack.keys, P.pack.name.key, P.city.key, P.city.name.key, P.tag.key, P.post.key, P.post.tick.key, P.post.name.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[P.tag.key]).toMatchObject({ "--y": 0, "--s": 1 });
  });
});

describe("slide 12, what exists", () => {
  const id = stepOf("exists");
  const E = EXISTS;

  it("brings the grid up and names it once, before any lantern lights", () => {
    expect(startOf(id, E.name.key)).toBeGreaterThan(startOf(id, E.grid.key));
    expect(Math.min(...[...E.named, ...E.unnamed].map((lit) => startOf(id, lit.key)))).toBeGreaterThan(startOf(id, E.name.key));
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

  it("then the smaller lanterns, then the ring of nine dots as it draws, with story line B, then the tag and the grey tag apart", () => {
    const small = E.unnamed.map((lit) => startOf(id, lit.key));
    expect(small[0]).toBeGreaterThan(startOf(id, E.named[1].caption.key));
    for (let i = 1; i < small.length; i++) expect(small[i]).toBeGreaterThan(small[i - 1]);
    const ring = playOf(id, E.ring.key)[0];
    expect(ring.at).toBeGreaterThan(Math.max(...small));
    for (const dot of E.ring.dots) expect(startOf(id, dot.key)).toBeLessThan(ring.at + ring.duration);
    expect(storyAt("exists", 1)).toBeGreaterThan(ring.at);
    expect(startOf(id, E.staff.key)).toBeGreaterThan(startOf(id, E.ring.name.key));
    expect(startOf(id, E.apart.key) - endOf(id, E.staff.key)).toBeGreaterThanOrEqual(1);
  });
});

describe("slide 12a, the wall", () => {
  const id = stepOf("noticed");
  const N = NOTICED;
  const hung = N.plaques.map((plaque) => startOf(id, plaque.key));

  it("draws the rail first, then settles the plaques one at a time in reading order, each on its cord", () => {
    expect(hung[0]).toBeGreaterThan(startOf(id, N.rail.key));
    for (let i = 1; i < hung.length; i++) expect(hung[i] - hung[i - 1], N.plaques[i].key).toBeGreaterThanOrEqual(0.6);
    for (const [i, plaque] of N.plaques.entries()) {
      expect(startOf(id, plaque.cord.key)).toBeLessThan(hung[i]);
      expect(playOf(id, plaque.key)[0].on).toEqual({ autoAlpha: 1, y: 0 });
    }
  });

  it("raises story line A with the second plaque, and lands the fifth plaque's names in it one after another once it has settled", () => {
    expect(storyAt("noticed", 0)).toBeGreaterThan(hung[1]);
    expect(storyAt("noticed", 0)).toBeLessThan(hung[2]);
    const hosts = N.hosts.map((host) => startOf(id, host.key));
    expect(hosts[0]).toBeGreaterThanOrEqual(endOf(id, N.plaques[4].key) - 1e-9);
    for (let i = 1; i < hosts.length; i++) expect(hosts[i]).toBeGreaterThan(hosts[i - 1]);
  });

  it("drops the grey tag apart after a hold to read the wall, with story line B last", () => {
    const read = Math.max(...N.hosts.map((host) => endOf(id, host.key)));
    expect(startOf(id, N.only.key) - read).toBeGreaterThanOrEqual(0.8);
    expect(storyAt("noticed", 1)).toBeGreaterThan(startOf(id, N.only.key));
    const end = at(id);
    for (const key of [...N.plaques.map((plaque) => plaque.key), ...N.hosts.map((host) => host.key), N.only.key]) expect(end[key].autoAlpha, key).toBe(1);
  });
});

describe("slide 13, the yard", () => {
  const id = stepOf("infrastructure");
  const I = INFRASTRUCTURE;
  const tiles = I.tiles.map((tile) => startOf(id, tile.key));

  it("draws the fence and names the yard, then lands the three tiles inside it in turn, story line A with them", () => {
    expect(startOf(id, I.name.key)).toBeGreaterThan(startOf(id, I.fence.key));
    expect(startOf(id, I.caption.key)).toBeGreaterThan(startOf(id, I.name.key));
    expect(tiles[0]).toBeGreaterThan(startOf(id, I.fence.key) + 0.6);
    for (let i = 1; i < tiles.length; i++) expect(tiles[i] - tiles[i - 1]).toBeGreaterThanOrEqual(0.4);
    expect(storyAt("infrastructure", 0)).toBeGreaterThan(tiles[0]);
    expect(storyAt("infrastructure", 0)).toBeLessThan(tiles[2] + 0.5);
  });

  it("brings the calendar up under the fence once the tiles are in, and fills it week by week, in order, in about two seconds", () => {
    expect(startOf(id, I.calendar.key)).toBeGreaterThan(Math.max(...I.tiles.map((tile) => endOf(id, tile.key))));
    const [fill] = playOf(id, I.calendar.weeks.key);
    expect(fill.at).toBeGreaterThan(startOf(id, I.calendar.key));
    expect(fill.stagger).toBeGreaterThan(0);
    expect(endOf(id, I.calendar.weeks.key) - fill.at).toBeGreaterThan(1.5);
    expect(endOf(id, I.calendar.weeks.key) - fill.at).toBeLessThan(2.5);
  });

  it("settles the two plates once the calendar is full, then wipes the dashed one on apart, its caption after, with story line B", () => {
    const [a, b] = I.plates.map((plate) => startOf(id, plate.key));
    expect(a).toBeGreaterThan(endOf(id, I.calendar.weeks.key));
    expect(b).toBeGreaterThan(a);
    const wiped = playOf(id, I.joining.key)[0];
    expect(wiped.at).toBeGreaterThan(b);
    expect(Object.keys(wiped.on)).toEqual(["--wt", "--wr", "--wb", "--wl"]);
    expect(startOf(id, I.joining.caption.key)).toBeGreaterThan(wiped.at);
    expect(storyAt("infrastructure", 1)).toBeGreaterThan(a);
    const end = at(id);
    expect(end[I.fence.key]["--d"]).toBe(1);
    for (const key of [...I.tiles.map((tile) => tile.key), I.calendar.weeks.key, ...I.plates.map((plate) => plate.key)]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[I.joining.key]).toMatchObject({ "--wt": 0, "--wr": 0, "--wb": 0, "--wl": 0 });
  });
});

describe("slide 14, the two columns", () => {
  const id = stepOf("fits");
  const F = FITS;
  const [left, right] = F.heads;

  it("heads and fills the left column first, its lines in order, then heads the right", () => {
    const asks = F.pairs.map((pair) => startOf(id, pair.ask.key));
    expect(asks[0]).toBeGreaterThan(startOf(id, left.key));
    for (let i = 1; i < asks.length; i++) expect(asks[i]).toBeGreaterThan(asks[i - 1]);
    expect(startOf(id, right.key)).toBeGreaterThan(asks[3]);
    expect(startOf(id, F.pairs[0].has.key)).toBeGreaterThan(startOf(id, right.key));
  });

  it("lands each right line opposite its partner in turn, and only then its joining rules and its tick, story line A with the first", () => {
    const has = F.pairs.map((pair) => startOf(id, pair.has.key));
    for (let i = 1; i < has.length; i++) expect(has[i] - has[i - 1]).toBeGreaterThanOrEqual(0.6);
    for (const [i, pair] of F.pairs.entries()) {
      for (const join of pair.joins) expect(startOf(id, join.key)).toBeGreaterThan(has[i]);
      expect(startOf(id, pair.tick.key)).toBeGreaterThan(Math.max(...pair.joins.map((join) => startOf(id, join.key))));
      if (i < 3) expect(startOf(id, pair.tick.key)).toBeLessThan(has[i + 1]);
    }
    expect(storyAt("fits", 0)).toBeGreaterThan(has[0]);
    expect(storyAt("fits", 0)).toBeLessThan(has[1]);
  });

  it("drops the grey tag after a hold to read the four ticks, with story line B last", () => {
    const ticked = Math.max(...F.pairs.map((pair) => endOf(id, pair.tick.key)));
    expect(startOf(id, F.connects.key) - ticked).toBeGreaterThanOrEqual(HOLD.gap);
    expect(storyAt("fits", 1)).toBeGreaterThan(startOf(id, F.connects.key));
    const end = at(id);
    for (const pair of F.pairs) for (const key of [pair.ask.key, pair.has.key, pair.tick.key]) expect(end[key].autoAlpha, key).toBe(1);
  });
});

describe("slide 15, where the City stands", () => {
  const id = stepOf("fleet");
  const F = FLEET;
  const S = F.stair;
  const runs = playOf(id, F.city.key).filter((play) => "--x" in play.on || "--y" in play.on);
  const [straight] = runs.filter((play) => play.on["--x"] === TRIP.straight.x);

  it("draws the track and the pack again, named, then sets the runner off from the start", () => {
    expect(startOf(id, F.pack.name.key)).toBeGreaterThan(Math.min(...F.pack.keys.map((key) => startOf(id, key))));
    expect(Math.min(...F.pack.keys.map((key) => startOf(id, key)))).toBeGreaterThan(startOf(id, F.track.key));
    expect(startOf(id, F.city.key)).toBeGreaterThan(Math.max(...F.pack.keys.map((key) => startOf(id, key))));
    expect(before(id)[F.city.key]).toMatchObject({ "--x": 0, "--y": 0 });
  });

  it("runs the straight, then the bend, and ends with the runner where it stands on the bend", () => {
    const bend = runs.filter((play) => play.on["--x"] === TRIP.stands.x || play.on["--y"] === TRIP.stands.y);
    expect(bend).toHaveLength(2);
    for (const play of bend) expect(play.at).toBeCloseTo(straight.at + straight.duration, 6);
    const end = at(id)[F.city.key];
    expect({ x: F.city.at.x + Number(end["--x"]), y: F.city.at.y + Number(end["--y"]) }).toEqual(CITY_STANDS);
  });

  it("lands each marker behind the runner as it passes, in order, each named as it lands, story line A with the third", () => {
    const xAt = (t: number) => F.city.at.x + TRIP.straight.x * (1 - Math.cos(((t - straight.at) / straight.duration) * (Math.PI / 2)));
    for (const [i, marker] of F.markers.entries()) {
      const landed = startOf(id, marker.key);
      expect(landed).toBeCloseTo(straight.at + MARKER_AT[i], 6);
      expect(xAt(landed) - 27, marker.key).toBeGreaterThan(marker.at.x + marker.r);
      expect(xAt(landed - 0.4), marker.key).toBeLessThan(marker.at.x + 40);
      expect(startOf(id, marker.name.key)).toBeGreaterThan(landed);
      expect(startOf(id, marker.name.key) - landed).toBeLessThan(0.3);
    }
    expect(storyAt("fleet", 0)).toBeGreaterThan(startOf(id, F.markers[2].key));
  });

  it("then lights the stair's first three steps in turn and leaves the top grey, its tag after, story line B as they light", () => {
    const lit = S.steps.filter((entry) => entry.lit).map((entry) => playOf(id, entry.key).find((play) => "--k" in play.on)!.at);
    expect(Math.min(...S.steps.map((entry) => startOf(id, entry.key)))).toBeGreaterThan(Math.max(...runs.map((play) => play.at)));
    for (let i = 1; i < lit.length; i++) expect(lit[i]).toBeGreaterThan(lit[i - 1]);
    expect(playOf(id, S.steps[3].key).some((play) => "--k" in play.on)).toBe(false);
    expect(startOf(id, S.tag.key)).toBeGreaterThan(lit[2]);
    expect(storyAt("fleet", 1)).toBeGreaterThan(lit[0]);
    expect(storyAt("fleet", 1)).toBeLessThan(startOf(id, S.tag.key) + 0.5);
  });

  it("drops the tag under the track last, and ends on the runner moved, the markers, the stair and the tags", () => {
    expect(startOf(id, F.applications.key)).toBeGreaterThan(startOf(id, S.tag.key));
    const end = at(id);
    for (const key of [F.track.key, F.start.key]) expect(end[key]["--d"], key).toBe(1);
    for (const key of [...F.pack.keys, F.pack.name.key, F.city.key, ...F.markers.flatMap((marker) => [marker.key, marker.name.key]), ...S.steps.map((entry) => entry.key), S.tag.key, F.applications.key]) expect(end[key].autoAlpha, key).toBe(1);
    for (const entry of S.steps) expect(end[entry.key]["--k"] ?? 0, entry.key).toBe(entry.lit ? 1 : 0);
  });
});
