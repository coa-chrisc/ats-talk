/**
 * Slides 19 and 20 as they play: the three tables filling, the questions
 * rising over them in the script's order and the page writing in; then the
 * ideas flying onto the chart, the quarters naming themselves, the corner
 * washing green and the checklist ticking. Each click follows its They see
 * in order and ends on the picture it describes.
 */
import { describe, expect, it } from "vitest";
import { at, endOf, playOf, startOf, stepOf } from "./harness";
import { LISTEN } from "./layout-listen";
import { SORT } from "./layout-sort";

const L = LISTEN;

describe("slide 19", () => {
  const id = stepOf("listen");
  const end = at(id);
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

describe("slide 20, assess ideas", () => {
  const id = stepOf("sort");
  const S = SORT;
  it("shows neutral criteria before the fully labeled chart and illustrative idea placements", () => {
    const criteriaEnd = Math.max(...S.list.map(row => endOf(id, row.key)));
    expect(startOf(id, S.chart.key)).toBeGreaterThan(criteriaEnd);
    const labelsEnd = Math.max(...S.quarters.map(q => endOf(id, q.key)));
    for (const dot of S.dots) {
      expect(startOf(id, dot.key)).toBeGreaterThan(labelsEnd);
      expect(at(id)[dot.key]).toMatchObject({ autoAlpha: 1, x: 0, y: 0 });
    }
    expect(startOf(id, S.corner.key)).toBeGreaterThan(Math.max(...S.dots.map(dot => endOf(id, dot.key))));
    for (const row of S.list) expect(playOf(id, row.tick.key)).toHaveLength(0);
  });
});
