import { stillAllowance } from "../sequence";
/**
 * Each of Part 4's clicks, beat by beat, against what its They see says it
 * shows and in what order, and the flow every click keeps: the stage never
 * still for more than 3 s (flow.test.ts checks only the worlds the deck
 * lists, so it is checked here too).
 */
import { describe, expect, it } from "vitest";
import { at, before, elements, endOf, ids, playOf, playsAt, startOf, stepOf, world } from "./harness";
import { titleKey } from "./layout";
import { EXISTS } from "./layout-exists";
import { NOTICED } from "./layout-noticed";
import { ARRIVE } from "./moves";

describe("every click", () => {
  it.each(ids)("keeps %s moving: never still for more than 3 s", (id) => {
    let landed = 0;
    let still = 0;
    for (const play of [...world.plays[ids.indexOf(id)]].sort((a, b) => a.at - b.at)) {
      still = Math.max(still, play.at - landed);
      const many = "key" in play ? elements(play.key) : 1;
      landed = Math.max(landed, play.at + play.duration + play.stagger * Math.max(0, many - 1));
    }
    expect(still).toBeLessThanOrEqual(stillAllowance(id));
  });

  it.each(ids)("ends %s on a drawing or a story line landing, not a hold", (id) => {
    const plays = playsAt(id);
    const last = Math.max(...plays.map((play) => play.at + play.duration));
    expect(plays.some((play) => play.at > last - 1)).toBe(true);
  });

  it("changes each slide's title at the start of its click, the old one gone at once; the first comes up as the world arrives", () => {
    expect(startOf(stepOf("track"), titleKey("track"))).toBe(ARRIVE);
    for (const pictureId of ["control", "exists", "noticed", "infrastructure", "fits", "fleet"]) {
      const id = stepOf(pictureId);
      expect(startOf(id, titleKey(pictureId)), pictureId).toBeLessThan(0.5);
      expect(before(id)[titleKey(pictureId)].yPercent, pictureId).toBe(120);
    }
  });
});

describe("slide 12, what exists", () => {
  const id = stepOf("exists");
  const E = EXISTS;
  const G = E.group;

  it("brings the grid up and names it once, before any window lights", () => {
    expect(startOf(id, E.name.key)).toBeGreaterThan(startOf(id, E.grid.key));
    expect(Math.min(...[...E.named, ...E.unnamed].map((lit) => startOf(id, lit.key)))).toBeGreaterThan(startOf(id, E.name.key));
  });

  it("lights the six named windows in turn, each one's entry in the list coming up with it, and leaves each lit full", () => {
    const lit = E.named.map((entry) => startOf(id, entry.key));
    for (let i = 1; i < lit.length; i++) expect(lit[i] - lit[i - 1], E.named[i].entry.key).toBeGreaterThanOrEqual(0.5);
    for (const [i, entry] of E.named.entries()) {
      expect(startOf(id, entry.entry.key) - lit[i], entry.entry.key).toBeGreaterThanOrEqual(0);
      expect(startOf(id, entry.entry.key) - lit[i], entry.entry.key).toBeLessThan(0.2);
      expect(at(id)[entry.key]["--k"], entry.key).toBe(1);
      expect(at(id)[entry.entry.key].autoAlpha, entry.entry.key).toBe(1);
    }
  });

  it("then lights the three unnamed windows in turn, fainter; then draws the cluster with its words; then wipes the empty table on, its caption with it", () => {
    const small = E.unnamed.map((lit) => startOf(id, lit.key));
    expect(small[0]).toBeGreaterThan(startOf(id, E.named[5].entry.key));
    for (let i = 1; i < small.length; i++) expect(small[i]).toBeGreaterThan(small[i - 1]);
    for (const lit of E.unnamed) expect(at(id)[lit.key]["--k"], lit.key).toBe(lit.lit);
    const cluster = Math.min(...E.staff.map((person) => startOf(id, person.key)));
    expect(cluster).toBeGreaterThan(Math.max(...small));
    for (const key of [G.name.key, G.caption.key, G.training.key]) {
      expect(startOf(id, key), key).toBeGreaterThanOrEqual(cluster);
      expect(startOf(id, key) - cluster, key).toBeLessThan(0.6);
    }
    const table = startOf(id, E.table.key);
    expect(table).toBeGreaterThan(Math.max(...E.staff.map((person) => endOf(id, person.key))) - 0.2);
    expect(startOf(id, E.tableCaption.key) - table).toBeLessThan(0.3);
    expect(at(id)[E.table.key]).toMatchObject({ "--wt": 0, "--wr": 0, "--wb": 0, "--wl": 0 });
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
    const hosts = N.hosts.map((host) => startOf(id, host.key));
    expect(hosts[0]).toBeGreaterThanOrEqual(endOf(id, N.plaques[4].key) - 1e-9);
    for (let i = 1; i < hosts.length; i++) expect(hosts[i]).toBeGreaterThan(hosts[i - 1]);
  });

  it("drops the grey tag apart after a hold to read the wall, with story line B last", () => {
    const read = Math.max(...N.hosts.map((host) => endOf(id, host.key)));
    expect(startOf(id, N.only.key) - read).toBeGreaterThanOrEqual(0.8);
    const end = at(id);
    for (const key of [...N.plaques.map((plaque) => plaque.key), ...N.hosts.map((host) => host.key), N.only.key]) expect(end[key].autoAlpha, key).toBe(1);
  });
});
