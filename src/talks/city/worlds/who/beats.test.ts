/**
 * Each of Part 1's clicks, beat by beat, against what They see says it
 * shows and in what order: the title, the timeline's line and markers,
 * the two groups of logos and the larger card.
 */
import { describe, expect, it } from "vitest";
import { CHAIN, EASE, behind } from "@/components/deck/kit";
import { endOf, keyOf, lastEnd, moved, onStage, startOf, stateAfter, timesOf, world } from "./harness";
import { OPENING, storyKeysOf, titleKey } from "./layout";
import { CAREER, along } from "./layout-career";
import { LEARNING } from "./layout-learning";
import { turnOf } from "./parts";
import { ARRIVE, turns } from "./steps-who";

/** When a story line comes up in a click. */
const storyAt = (plays: ReturnType<typeof timesOf>, pictureId: string, i: number) => moved(plays, storyKeysOf(pictureId)[i], "yPercent").find((play) => play.on.yPercent === 0)!.at;

describe("slide 1, the title", () => {
  const plays = timesOf("title");

  it("brings the title up first, then grows the rule under it, then story line A, then B", () => {
    const title = startOf(plays, OPENING.title.key);
    const rule = startOf(plays, OPENING.rule.key);
    expect(title).toBe(ARRIVE);
    expect(rule).toBeGreaterThan(title);
    expect(storyAt(plays, "title", 0)).toBeGreaterThan(rule);
    expect(storyAt(plays, "title", 1)).toBeGreaterThan(storyAt(plays, "title", 0));
  });

  it("grows the rule out from nothing to its full width", () => {
    const [grow] = moved(plays, OPENING.rule.key, "scaleX");
    expect(grow.on.scaleX).toBe(1);
    expect(onStage(stateAfter("title"), OPENING.rule.key)).toBe(true);
  });

  it("moves only the title, the rule and the two story lines", () => {
    expect([...new Set(plays.map(keyOf))].sort()).toEqual([OPENING.title.key, OPENING.rule.key, ...storyKeysOf("title")].sort());
  });
});

describe("slide 2, the career timeline", () => {
  const plays = timesOf("career");
  const { line, end, now, markers } = CAREER;
  const [draw] = moved(plays, line.key, "--d");
  const lit = markers.map((marker) => moved(plays, marker.key, "--k")[0].at);
  /** When the drawing line's front reaches a point along it, on the drawing's ease. */
  const reach = (x: number) => behind(draw, [along(x)])[0];

  it("hands the title on at the click and draws the line left to right, its end tick last", () => {
    expect(startOf(plays, titleKey("career"))).toBeLessThan(0.5);
    expect(draw.on["--d"]).toBe(1);
    expect(draw.at).toBeLessThan(Math.min(...lit));
    expect(startOf(plays, end.key)).toBeGreaterThanOrEqual(reach(end.x) - 0.15);
  });

  it("shows each ring as the line's front reaches it, and the last year as the line ends", () => {
    for (const marker of markers) expect(Math.abs(startOf(plays, marker.ring.key) - reach(marker.x)), marker.key).toBeLessThan(0.05);
    expect(startOf(plays, now.key)).toBeGreaterThanOrEqual(startOf(plays, end.key));
    expect(startOf(plays, now.key)).toBeLessThan(Math.min(...lit));
  });

  it("lights the seven markers in turn, once the line has drawn, the first three closer together than the other four", () => {
    expect(Math.min(...lit)).toBeGreaterThanOrEqual(endOf(plays, line.key));
    for (let i = 1; i < lit.length; i += 1) expect(lit[i], markers[i].key).toBeGreaterThan(lit[i - 1]);
    const gaps = lit.slice(1).map((at, i) => at - lit[i]);
    expect(Math.max(gaps[0], gaps[1])).toBeLessThan(Math.min(...gaps.slice(3)));
  });

  it("draws each marker's stem as it lights, and brings its name up the stem after it, its year and caption after the name", () => {
    for (const [i, marker] of markers.entries()) {
      const stem = startOf(plays, marker.stem.key);
      expect(stem, marker.key).toBeGreaterThan(lit[i]);
      expect(startOf(plays, marker.name.key), marker.key).toBeGreaterThan(stem);
      if (marker.year) expect(startOf(plays, marker.year.key), marker.key).toBeGreaterThan(startOf(plays, marker.name.key));
      if (marker.year && i + 1 < markers.length) expect(startOf(plays, marker.year.key), marker.key).toBeLessThan(lit[i + 1] + 0.5);
      if (marker.caption) expect(startOf(plays, marker.caption.key)).toBeGreaterThan(startOf(plays, marker.name.key));
    }
  });

  it("brings story line A up as the third marker lights and B with the other four", () => {
    expect(storyAt(plays, "career", 0)).toBeGreaterThanOrEqual(lit[2]);
    expect(storyAt(plays, "career", 0)).toBeLessThan(lit[3]);
    expect(storyAt(plays, "career", 1)).toBeGreaterThan(lit[3]);
  });

  it("ends on the full line with all seven markers lit, each stem drawn and each name up", () => {
    const state = stateAfter("career");
    for (const key of [line.key, end.key, now.key]) expect(onStage(state, key), key).toBe(true);
    for (const marker of markers) {
      expect(state[marker.key]["--k"], marker.key).toBe(1);
      expect(state[marker.stem.key]["--d"], marker.key).toBe(1);
      for (const key of [marker.ring.key, marker.name.key, ...(marker.year ? [marker.year.key] : []), ...(marker.caption ? [marker.caption.key] : [])]) expect(onStage(state, key), key).toBe(true);
    }
  });

  it("finishes the click on its last story line's hold, nothing moving after the last marker has landed but that line", () => {
    const last = markers.at(-1)!;
    const lastMarker = Math.max(endOf(plays, last.name.key), last.year ? endOf(plays, last.year.key) : 0);
    const after = plays.filter((play) => play.end > lastMarker + 0.01).map(keyOf);
    expect([...new Set(after)].every((key) => storyKeysOf("career").includes(key))).toBe(true);
    expect(lastEnd(plays)).toBeLessThanOrEqual(12);
  });
});

describe("slide 3, the courses and the partners", () => {
  const plays = timesOf("learning");
  const { courses, big, partners } = LEARNING;
  const turn = moved(plays, turnOf(big.key), "rotationY")[0];
  const risenAt = (key: string) => moved(plays, key, "y").find((play) => play.on.y === 0)!;
  const courseUp = courses.tiles.map((tile) => risenAt(tile.key));
  const partnerUp = partners.tiles.map((tile) => risenAt(tile.key));

  it("raises each group's logos one at a time, in the script's order, 0.3 s apart in a row, on the house ease, each heading just before its group", () => {
    for (const [list, rows] of [[courseUp, [[0, 4], [4, 7]]], [partnerUp, [[0, 11]]]] as const) {
      for (let i = 1; i < list.length; i += 1) expect(list[i].at).toBeGreaterThan(list[i - 1].at);
      for (const [from, to] of rows) for (let i = from + 1; i < to; i += 1) expect(Math.abs(list[i].at - list[i - 1].at - 0.3)).toBeLessThanOrEqual(0.01);
      for (const play of list) {
        expect(play.on.autoAlpha).toBe(1);
        expect(play.ease).toBe(EASE.out);
      }
    }
    for (const [head, first] of [[courses.head.key, courseUp[0]], [partners.head.key, partnerUp[0]]] as const) {
      const at = risenAt(head).at;
      expect(at).toBeLessThan(first.at);
      expect(first.at - at).toBeLessThanOrEqual(0.5);
    }
  });

  it("brings story line A up after the top row of courses, and B after the card has turned, before the partners", () => {
    expect(storyAt(plays, "learning", 0)).toBeGreaterThan(courseUp[3].at);
    expect(storyAt(plays, "learning", 0)).toBeLessThan(courseUp[4].at);
    expect(storyAt(plays, "learning", 1)).toBeGreaterThanOrEqual(turn.at + turn.duration);
    expect(storyAt(plays, "learning", 1)).toBeLessThan(startOf(plays, partners.head.key));
  });

  it("turns the card in once every course logo has landed, from a light back to its face, sets its foot lines once it has turned, and only then starts the partners", () => {
    const landed = Math.max(...courses.tiles.map((tile) => endOf(plays, tile.key)));
    expect(turn.at).toBeGreaterThanOrEqual(landed);
    expect(turn.on.rotationY).toBe(0);
    expect(startOf(plays, big.key)).toBe(turn.at);
    expect(endOf(plays, big.key)).toBeLessThan(turn.end);
    expect(startOf(plays, big.school.key)).toBeGreaterThan(turn.at + turn.duration / 2);
    expect(startOf(plays, big.when.key)).toBeGreaterThan(startOf(plays, big.school.key));
    expect(startOf(plays, partners.head.key)).toBeGreaterThanOrEqual(turn.end);
  });

  it("lands the whole click inside 10 s, the stage never still for 3 s on the way", () => {
    expect(lastEnd(plays)).toBeLessThan(10);
    const sorted = [...plays].sort((a, b) => a.at - b.at);
    let reached = 0;
    for (const play of sorted) {
      expect(play.at - reached, keyOf(play)).toBeLessThan(CHAIN.still);
      reached = Math.max(reached, play.end);
    }
  });

  it("ends with both headings and every logo up, the card face up and every word on the stage", () => {
    const state = stateAfter("learning");
    for (const key of turns()) expect(state[key].rotationY, key).toBe(0);
    for (const key of [courses.head.key, partners.head.key, ...courses.tiles.map((tile) => tile.key), ...partners.tiles.map((tile) => tile.key), big.key, big.school.key, big.when.key]) {
      expect(onStage(state, key), key).toBe(true);
    }
  });
});

describe("the one part that turns", () => {
  it("is the larger card alone", () => {
    const turning = world.steps.flatMap((step) => step.moves.flatMap((move) => ("key" in move && "on" in move && "rotationY" in move.on ? [move.key] : [])));
    expect([...new Set(turning)]).toEqual(turns());
  });
});
