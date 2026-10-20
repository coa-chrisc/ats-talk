/**
 * Slide 19a, in the order its They see gives: the chart, wide; one person in
 * each department lit; the new box on the chart and the lit people stepping
 * into it; the zoom, with the box and its people held to the chart as it
 * grows; the box named, its three tiles, the leadership, and the developers
 * across dotted lines with the question under them.
 */
import { describe, expect, it } from "vitest";
import { labelBox, labelsOf } from "./layout";
import { PROGRAM_TEAM, SMALL_TEAM, ZOOM } from "./layout-program-team";
import { apart, at, clickOf, endOf, inside, playOf, showsAtEnd, startOf } from "./harness";

const click = clickOf("program-team");
/** Every part as the slide before leaves it: where this slide's parts start. */
const before = at(clickOf("people"));
const T = PROGRAM_TEAM;
const onChart = (p: { x: number; y: number }) => ({ x: T.origin.x + (p.x - T.origin.x) / ZOOM, y: T.origin.y + (p.y - T.origin.y) / ZOOM });

describe("19a, an AI program team: the chart", () => {
  it("draws the chart and its departments, then lights one person in each, then hangs the new box and walks them into it", () => {
    const drawn = Math.max(...T.chart.depts.map((dept) => endOf(click, dept.people.key)));
    const lights = T.members.map((member) => member.light);
    for (const light of lights) expect(startOf(click, light), light).toBeGreaterThanOrEqual(drawn);
    const lit = Math.max(...lights.map((light) => endOf(click, light)));
    expect(startOf(click, T.team.key)).toBeGreaterThanOrEqual(lit);
    for (const member of T.members) expect(startOf(click, member.key, "--x"), member.key).toBeGreaterThan(startOf(click, T.team.key));
  });

  it("walks the lit people in together, on one curve, so none crosses another, each from its department's seat", () => {
    const walks = T.members.map((member) => playOf(click, member.key, "--x")[0]);
    for (const walk of walks) expect({ at: walk.at, duration: walk.duration, ease: walk.ease }, walk.key).toEqual({ at: walks[0].at, duration: walks[0].duration, ease: walks[0].ease });
    T.members.forEach((member, i) => {
      expect(T.chart.depts[i].at.x, member.key).toBeLessThanOrEqual(member.seat.x);
      expect(inside(member.seat, T.chart.depts[i].at), member.key).toBe(true);
      const small = onChart(member.at);
      expect(small.x + member.from.x, member.key).toBeCloseTo(member.seat.x, 6);
      expect(small.y + member.from.y, member.key).toBeCloseTo(member.seat.y, 6);
      if (i > 0) {
        expect(member.seat.x, member.key).toBeGreaterThan(T.members[i - 1].seat.x);
        expect(member.at.x, member.key).toBeGreaterThan(T.members[i - 1].at.x);
      }
      expect(at(click)[member.key], member.key).toMatchObject({ "--x": 0, "--y": 0, "--s": 1 });
    });
  });

  it("hangs the small box beside the trunk, clear of the top box and the bar, with every lit person's small self inside it", () => {
    expect(apart(SMALL_TEAM, T.chart.head.at, 12)).toBe(true);
    for (const dept of T.chart.depts) expect(apart(SMALL_TEAM, dept.at, 24), dept.key).toBe(true);
    expect(SMALL_TEAM.x).toBe(T.chart.branch.to.x);
    expect(T.chart.branch.from.y).toBeGreaterThan(SMALL_TEAM.y);
    expect(T.chart.branch.from.y).toBeLessThan(SMALL_TEAM.y + SMALL_TEAM.h);
    for (const member of T.members) {
      const small = onChart(member.at);
      expect(inside({ x: small.x, y: small.y, w: member.at.w / ZOOM, h: member.at.h / ZOOM }, SMALL_TEAM), member.key).toBe(true);
    }
  });
});

describe("19a, an AI program team: the zoom", () => {
  it("grows the chart, the box and its people about one point, together and on one curve, so the box stays where it hangs on the chart", () => {
    const [chart] = playOf(click, T.chart.key, "--s");
    const [team] = playOf(click, T.team.key, "--s");
    const members = T.members.map((member) => playOf(click, member.key, "--s")[0]);
    for (const play of [team, ...members]) {
      expect({ at: play.at, duration: play.duration, ease: play.ease }, play.key).toEqual({ at: chart.at, duration: chart.duration, ease: chart.ease });
      expect(play.on["--s"], play.key).toBe(1);
      expect(before[play.key]["--s"], play.key).toBe(1 / ZOOM);
    }
    expect(chart.on["--s"]).toBe(ZOOM);
    expect(before[T.chart.key]["--s"]).toBe(1);
    // The team box's small self is the box at 1 / ZOOM about the origin.
    const corner = onChart(T.team.at);
    expect(corner.x).toBeCloseTo(SMALL_TEAM.x, 6);
    expect(corner.y).toBeCloseTo(SMALL_TEAM.y, 6);
  });

  it("lets the chart fall away as it grows, starting the zoom once everyone is in the box", () => {
    const [chart] = playOf(click, T.chart.key, "--s");
    expect(chart.at).toBeGreaterThanOrEqual(Math.max(...T.members.map((member) => endOf(click, member.key, "--x"))));
    const [fade] = playOf(click, T.chart.key, "autoAlpha").filter((play) => play.on.autoAlpha === 0);
    expect(fade.at).toBeGreaterThan(chart.at);
    expect(fade.at + fade.duration).toBeLessThanOrEqual(chart.at + chart.duration);
    expect(at(click)[T.chart.key].autoAlpha).toBe(0);
    expect(showsAtEnd(click, T.chart.label.key)).toBe(false);
  });

  it("names the box as the zoom lands", () => {
    const [chart] = playOf(click, T.chart.key, "--s");
    expect(startOf(click, T.team.name.key)).toBeGreaterThan(chart.at + chart.duration / 2);
    expect(inside(labelBox(T.team.name.at, T.team.name.text), T.team.at)).toBe(true);
  });
});

describe("19a, an AI program team: after the zoom", () => {
  it("lands the three tiles in turn, then the leadership and its line, then the developers, the dotted lines and the question", () => {
    const tiles = T.tiles.map((tile) => startOf(click, tile.key));
    tiles.slice(1).forEach((start, i) => expect(start).toBeGreaterThan(tiles[i]));
    expect(tiles[0]).toBeGreaterThanOrEqual(endOf(click, T.team.name.key) - 0.6);
    expect(startOf(click, T.lead.key)).toBeGreaterThan(tiles[2]);
    expect(startOf(click, T.lead.line.key)).toBeGreaterThan(startOf(click, T.lead.key));
    expect(startOf(click, T.devs.key)).toBeGreaterThanOrEqual(endOf(click, T.lead.line.key));
    for (const line of T.devs.dotted) expect(startOf(click, line.key), line.key).toBeGreaterThan(startOf(click, T.devs.key));
    expect(startOf(click, T.tag.key)).toBeGreaterThan(Math.max(...T.devs.dotted.map((line) => startOf(click, line.key))));
  });

  it("ends on the team, its tiles, the leadership, the dotted lines and the developers with the question", () => {
    const keys = [T.team.key, T.team.name.key, ...T.members.map((member) => member.light), ...T.tiles.flatMap((tile) => [tile.key, tile.stub.key]), T.lead.key, T.lead.label.key, T.lead.line.key, T.devs.key, T.devs.people.key, T.devs.label.key, ...T.devs.dotted.map((line) => line.key), T.tag.key];
    for (const key of keys) expect(showsAtEnd(click, key), key).toBe(true);
    expect(at(click)[T.tag.key]["--s"]).toBe(1);
  });

  it("sets every name inside its shape, the tiles under the box, and the dotted lines from the box to the developers", () => {
    T.tiles.forEach((tile) => {
      expect(inside(labelBox(tile.word, tile.text), tile.at), tile.text).toBe(true);
      expect(tile.at.y, tile.key).toBeGreaterThan(T.team.at.y + T.team.at.h);
    });
    expect(inside(labelBox(T.lead.label.at, T.lead.label.text), T.lead.at)).toBe(true);
    expect(inside(T.lead.person, T.lead.at)).toBe(true);
    expect(apart(T.lead.person, labelBox(T.lead.label.at, T.lead.label.text), 4)).toBe(true);
    expect(inside(labelBox(T.devs.label.at, T.devs.label.text), T.devs.at)).toBe(true);
    for (const person of T.devs.people.at) {
      expect(inside(person, T.devs.at), JSON.stringify(person)).toBe(true);
      expect(apart(person, labelBox(T.devs.label.at, T.devs.label.text), 4)).toBe(true);
    }
    expect(inside(labelBox(T.tag.word, T.tag.text), T.tag.at)).toBe(true);
    for (const member of T.members) expect(inside(member.at, T.team.at), member.key).toBe(true);
    for (const member of T.members) expect(apart(member.at, labelBox(T.team.name.at, T.team.name.text), 4), member.key).toBe(true);
    for (const line of T.devs.dotted) {
      expect(line.from.x, line.key).toBe(T.team.at.x + T.team.at.w);
      expect(line.to.x, line.key).toBe(T.devs.at.x);
    }
    expect(T.lead.line.from.x).toBe(T.lead.at.x + T.lead.at.w);
    expect(T.lead.line.to.x).toBe(T.team.at.x);
  });

  it("shows the script's labels in the order it gives them", () => {
    expect([T.chart.label.text, T.team.name.text, ...T.tiles.map((tile) => tile.text), T.lead.label.text, T.devs.label.text, T.tag.text]).toEqual(labelsOf("program-team"));
  });
});
