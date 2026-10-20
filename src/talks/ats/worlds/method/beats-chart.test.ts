/**
 * Slides 11 and 12 as they play: the three tables filling, the questions
 * rising over them in the script's order and the page writing in; then the
 * ideas flying onto the chart, the quarters naming themselves, the corner
 * washing green and the checklist ticking. Each click follows its They see
 * in order and ends on the picture it describes.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { LISTEN } from "./layout-listen";
import { SORT } from "./layout-sort";
import { at, before, endOf, playOf, startOf, stepOf } from "./harness";

const L = LISTEN;
const S = SORT;

describe("slide 11", () => {
  const id = stepOf("listen");
  const end = at(id);
  const [a, b] = storyKeys(storyId("listen"), 2);
  const bubbles = L.tables.flatMap((table) => table.bubbles.map((bubble) => bubble.key));
  const sitters = L.tables.flatMap((table) => table.seats.map((seat) => seat.sitter));

  it("draws the three tables left to right, their people sitting after their chairs, each named", () => {
    const draws = L.tables.map((table) => startOf(id, table.key));
    for (let i = 1; i < draws.length; i++) expect(draws[i]).toBeGreaterThan(draws[i - 1]);
    for (const table of L.tables) {
      expect(Math.min(...table.seats.map((seat) => startOf(id, seat.sitter)))).toBeGreaterThan(Math.min(...table.seats.map((seat) => startOf(id, seat.key))));
      expect(startOf(id, table.name.key)).toBeGreaterThan(startOf(id, table.key));
    }
  });

  it("raises the bubbles in the order the script gives, after everyone is seated", () => {
    const seated = Math.max(...sitters.map((key) => endOf(id, key)));
    const starts = bubbles.map((key) => startOf(id, key));
    expect(starts[0]).toBeGreaterThan(seated);
    for (let i = 1; i < starts.length; i++) expect(starts[i], bubbles[i]).toBeGreaterThan(starts[i - 1]);
  });

  it("brings the first line with the first table's questions and the second with the others'", () => {
    const [first] = L.tables;
    expect(startOf(id, a)).toBeGreaterThan(startOf(id, first.bubbles[0].key));
    expect(startOf(id, a)).toBeLessThan(startOf(id, L.tables[1].bubbles[0].key));
    expect(startOf(id, b)).toBeGreaterThan(startOf(id, L.tables[1].bubbles[0].key));
  });

  it("writes the page line by line under its heading after the last bubble, each line a drawn rule", () => {
    expect(startOf(id, L.page.key)).toBeGreaterThan(endOf(id, bubbles.at(-1)!));
    expect(startOf(id, L.page.heading.key)).toBeGreaterThan(startOf(id, L.page.key));
    const writes = L.page.lines.map((line) => startOf(id, line.key));
    expect(writes[0]).toBeGreaterThan(startOf(id, L.page.heading.key));
    for (let i = 1; i < writes.length; i++) expect(writes[i] - writes[i - 1]).toBeGreaterThan(0.1);
    for (const line of L.page.lines) expect(playOf(id, line.key)[0].on).toEqual({ "--d": 1 });
  });

  it("ends on the three tables, their bubbles and the filled page", () => {
    for (const table of L.tables) expect(end[table.key]["--d"]).toBe(1);
    for (const key of [...sitters, ...bubbles, ...L.tables.map((table) => table.name.key), L.page.key, L.page.heading.key]) expect(end[key].autoAlpha, key).toBe(1);
    for (const line of L.page.lines) expect(end[line.key]["--d"], line.key).toBe(1);
  });
});

describe("slide 12", () => {
  const id = stepOf("sort");
  const end = at(id);
  const [a, b] = storyKeys(storyId("sort"), 2);

  it("draws the axes and names the sides before any idea flies", () => {
    const first = Math.min(...S.dots.map((dot) => startOf(id, dot.key)));
    expect(startOf(id, S.chart.key)).toBeLessThan(first);
    expect(endOf(id, S.chart.value.key)).toBeLessThanOrEqual(first + 0.5);
    expect(startOf(id, S.chart.readiness.key)).toBeLessThan(first);
  });

  it("flies each idea from the left onto the chart, across and up on different curves, one after another, with the first line", () => {
    const starts = S.dots.map((dot) => startOf(id, dot.key));
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(starts[i - 1]);
    for (const dot of S.dots) {
      expect(before(id)[dot.key]).toMatchObject({ autoAlpha: 0, x: dot.from.x, y: dot.from.y });
      const across = playOf(id, dot.key).find((play) => play.on.x === 0)!;
      const up = playOf(id, dot.key).find((play) => play.on.y === 0)!;
      expect(across.at).toBe(up.at);
      expect(across.ease).not.toBe(up.ease);
      expect(end[dot.key]).toMatchObject({ autoAlpha: 1, x: 0, y: 0 });
    }
    expect(startOf(id, a)).toBeGreaterThan(starts[0]);
  });

  it("names the quarters in turn once the ideas have landed: top right, top left, bottom right, bottom left", () => {
    const landed = Math.max(...S.dots.map((dot) => endOf(id, dot.key)));
    const starts = S.quarters.map((quarter) => startOf(id, quarter.key));
    expect(starts[0]).toBeGreaterThan(landed);
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(starts[i - 1]);
  });

  it("washes the top right green after the quarters are named, with the second line", () => {
    expect(startOf(id, S.corner.key)).toBeGreaterThan(endOf(id, S.quarters.at(-1)!.key));
    expect(startOf(id, b)).toBeGreaterThanOrEqual(startOf(id, S.corner.key));
    expect(end[S.corner.key]["--k"]).toBe(1);
  });

  it("draws the checklist row by row after the wash, each row then taking its tick in turn", () => {
    const rows = S.list.map((row) => startOf(id, row.key));
    expect(rows[0]).toBeGreaterThan(startOf(id, S.corner.key));
    for (let i = 1; i < rows.length; i++) expect(rows[i]).toBeGreaterThan(rows[i - 1]);
    const ticks = S.list.map((row) => startOf(id, row.tick.key));
    for (let i = 0; i < ticks.length; i++) expect(ticks[i]).toBeGreaterThan(rows[i]);
    for (let i = 1; i < ticks.length; i++) expect(ticks[i]).toBeGreaterThan(ticks[i - 1]);
  });

  it("ends on the chart with its lit corner and the ticked list", () => {
    expect(end[S.chart.key]["--d"]).toBe(1);
    expect(end[S.chart.mid.key]["--d"]).toBe(1);
    for (const key of [S.chart.value.key, S.chart.readiness.key, ...S.quarters.map((quarter) => quarter.key), ...S.list.map((row) => row.key), ...S.list.map((row) => row.tick.key)]) expect(end[key].autoAlpha, key).toBe(1);
  });
});
