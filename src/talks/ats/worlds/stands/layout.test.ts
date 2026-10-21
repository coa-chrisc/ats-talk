/**
 * Where the stands world's slides put things: every slide's drawing under
 * its story band and inside the frame's safe area; the track fixed where
 * slides 11, 15 and 27 all draw it; and on each slide the parts that must
 * not meet kept apart, and the parts that hold others holding them.
 */
import { describe, expect, it } from "vitest";
import { STORY, box, type Box, type Point } from "@/components/deck/kit";
import { DRAW_FOOT, LABEL_LINE, SAFE, TAG, TEXT_LINE, bandFoot, contentTop, tagWidth, tagWords, wordsWidth } from "./layout";
import { DOT_R, EXISTS, namedRows } from "./layout-exists";
import { INFRASTRUCTURE, TILE_WORDS, WEEK, tileRows } from "./layout-infrastructure";
import { HOST, NOTICED } from "./layout-noticed";
import { FLEET, PITCH } from "./layout-fleet";
import { TRACK } from "./layout-track";
import { AGENT, GRID, PLATE, gridSize } from "../department-map";
import { bottom, bounds, inside, overlaps, right, ringBox, wordsBox } from "./harness";

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
const E = EXISTS;
const N = NOTICED;
const I = INFRASTRUCTURE;
const T = TRACK;
const F = FLEET;
/** Rows of a caption, the first at `at`, each measured as a tag's words are (0.52 of the size a letter; Geist measures 0.48 at 26 px). */
const rowsBox = (at: Point, rows: readonly string[], anchor: "start" | "middle" = "start") => bounds(rows.map((row, i) => wordsBox({ x: at.x, y: at.y + i * PITCH }, tagWords(row, 26), LABEL_LINE, anchor)));
const gateLabels = F.gates.map((gate) => bounds([wordsBox(gate.name.at, tagWords(gate.name.text, 26), LABEL_LINE, "middle"), rowsBox(gate.caption.at, gate.caption.rows, "middle")]));
const staffWords = bounds([label(F.staffWords.name.at, F.staffWords.name.text, "start"), rowsBox(F.staffWords.caption.at, F.staffWords.caption.rows)]);
const fleetWords = bounds([label(F.fleetWords.name.at, F.fleetWords.name.text, "start"), rowsBox(F.fleetWords.caption.at, F.fleetWords.caption.rows)]);
const yardWords = bounds([label(F.yard.name.at, F.yard.name.text, "start"), wordsBox(F.yard.caption.at, tagWords(F.yard.caption.text, 26), LABEL_LINE, "start")]);
const fence = (at: Box) => box(at.x, at.y - 10, at.w, at.h + 20);

const DRAWN: Record<string, Box[]> = {
  track: [
    T.ring.at,
    label(T.name.at, T.name.text, "start"),
    label(T.place.at, T.place.text, "start"),
    text(T.policy.name.at, T.policy.name.text, "start"),
    label(T.policy.caption.at, T.policy.caption.text, "start"),
    label(T.gaps.at, T.gaps.text, "start"),
    ...T.plates.map((plate) => plate.at),
  ],
  fleet: [
    label(F.name.at, F.name.text, "start"),
    F.map.outline,
    staffWords,
    yardWords,
    fence(F.yard.at),
    fleetWords,
    label(F.before.at, F.before.text, "start"),
    box(F.rule.from.x, F.rule.from.y - 2, F.rule.to.x - F.rule.from.x, 4),
    ...F.gates.map((gate) => gate.at),
    ...gateLabels,
    label(F.portfolio.at, F.portfolio.text, "start"),
  ],
  exists: [
    E.ring.at,
    ...E.ring.dots.map((dot) => ringBox(dot.at, DOT_R)),
    label(E.name.at, E.name.text, "start"),
    ...E.named.flatMap((lit) => namedRows(lit).map((row) => box(lit.name.at.x, row.y - row.line / 2, row.width, row.line))),
    text(E.ring.name.at, E.ring.name.text, "start"),
    label(E.ring.caption.at, E.ring.caption.text, "start"),
    E.staff.at,
    E.apart.at,
  ],
  noticed: [
    box(N.rail.x0, N.rail.y - 2, N.rail.x1 - N.rail.x0, 4),
    ...N.plaques.flatMap((plaque) => [plaque.at, { ...plaque.at, y: plaque.at.y - 24 }, ringBox(plaque.cord.nail, 4)]),
    N.only.at,
  ],
  infrastructure: [
    text(I.name.at, I.name.text, "start"),
    label(I.caption.at, I.caption.text, "start"),
    box(I.fence.at.x, I.fence.at.y - 10, I.fence.at.w, I.fence.at.h + 20),
    I.calendar.at,
    label(I.every.at, I.every.text, "start"),
    ...I.plates.map((plate) => plate.at),
    I.joining.at,
    label(I.joining.caption.at, I.joining.caption.text),
  ],
};

describe("the stands world's layout", () => {
  it("starts every slide's drawing under its story band, where the layout says drawing starts", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      expect(contentTop(pictureId), pictureId).toBeGreaterThanOrEqual(bandFoot(pictureId) + 32);
      expect(Math.min(...boxes.map((b) => b.y)), pictureId).toBeGreaterThanOrEqual(contentTop(pictureId));
    }
  });

  it("keeps every slide's drawing inside the safe area, clear of the footer, the slide number and the stage's edges", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      const all = bounds(boxes);
      expect(all.y, pictureId).toBeGreaterThanOrEqual(SAFE.top);
      expect(bottom(all), pictureId).toBeLessThanOrEqual(DRAW_FOOT);
      expect(all.x, pictureId).toBeGreaterThanOrEqual(SAFE.left);
      expect(right(all), pictureId).toBeLessThanOrEqual(SAFE.right);
    }
  });

  it("sets the safe area as the frame does: the story band's width, the 64 px edge, the footer under 1016", () => {
    expect(SAFE).toEqual({ top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w });
  });

  it("sizes every tag for its words, at the label size", () => {
    for (const tag of [E.staff, E.apart, N.only]) {
      expect(tag.at.h, tag.text).toBe(TAG.h);
      expect(tag.at.w, tag.text).toBe(tagWidth(tag.text));
      // Measured in Geist at 26 px the longest letter runs average 0.48 of the size: the tag's 0.52 holds them with room.
      expect(tag.at.w - TAG.point - TAG.gap - TAG.pad, tag.text).toBeGreaterThanOrEqual(tag.text.length * TAG.size * 0.5);
    }
  });
});

describe("slide 12a, the wall", () => {
  const [a, b, c, d, e] = N.plaques.map((plaque) => plaque.at);

  it("hangs three plaques over two, the fifth as wide as two columns and the gap between, the wall the drawing's full width", () => {
    expect([a.y, b.y, c.y]).toEqual([a.y, a.y, a.y]);
    expect([d.y, e.y]).toEqual([d.y, d.y]);
    expect(d.y).toBeGreaterThan(bottom(a) + 24);
    expect(e.w).toBe(right(c) - b.x);
    expect(d.x).toBe(a.x);
    expect(e.x).toBe(b.x);
    expect([a.x, right(c)]).toEqual([SAFE.left + 16, SAFE.right]);
    for (const p of N.plaques) for (const q of N.plaques) if (p !== q) expect(overlaps(p.at, q.at), `${p.key} ${q.key}`).toBe(false);
  });

  it("runs the rail across the wall over the top row, each top plaque's nail on it, each bottom plaque's nail in the gap above it", () => {
    expect([N.rail.x0, N.rail.x1]).toEqual([a.x, right(c)]);
    expect(N.rail.y).toBeLessThan(a.y - 16);
    for (const plaque of N.plaques.slice(0, 3)) expect(plaque.cord.nail.y).toBe(N.rail.y);
    for (const plaque of N.plaques.slice(3)) {
      expect(plaque.cord.nail.y).toBeGreaterThan(bottom(a) + 4);
      expect(plaque.cord.nail.y).toBeLessThan(plaque.at.y - 8);
    }
  });

  it("sets each plaque's name and caption inside it, apart, and the fifth's four nameplates in a row inside it", () => {
    const inner = (at: Box) => box(at.x + 16, at.y + 16, at.w - 32, at.h - 32);
    for (const plaque of N.plaques) {
      const name = text(plaque.name.at, plaque.name.text);
      expect(inside(name, inner(plaque.at)), plaque.name.text).toBe(true);
      if (plaque.caption) {
        // A plaque's caption is one centred row, measured as a tag's words are (0.52 of the size a letter; Geist measures 0.48 at 26 px).
        const caption = wordsBox(plaque.caption.at, tagWords(plaque.caption.text, 26), LABEL_LINE, "middle");
        expect(inside(caption, inner(plaque.at)), plaque.caption.text).toBe(true);
        expect(caption.y).toBeGreaterThanOrEqual(bottom(name) - 6);
      }
    }
    expect(N.plaques.map((plaque) => Boolean(plaque.caption))).toEqual([true, true, true, true, false]);
    expect(N.hosts).toHaveLength(4);
    for (const host of N.hosts) {
      expect(inside(host.at, inner(e)), host.text).toBe(true);
      expect(host.at.y).toBeGreaterThan(bottom(text(N.plaques[4].name.at, N.plaques[4].name.text)) - 6);
      expect(host.at.w).toBeGreaterThanOrEqual(wordsWidth(host.text, HOST.size) + 2 * HOST.pad);
    }
    for (let i = 1; i < N.hosts.length; i++) expect(N.hosts[i].at.x).toBeGreaterThanOrEqual(right(N.hosts[i - 1].at) + HOST.gap);
  });

  it("sets the grey tag apart under the wall, at its middle", () => {
    expect(N.only.at.y).toBeGreaterThanOrEqual(bottom(d) + 24);
    expect(N.only.at.x + N.only.at.w / 2).toBeCloseTo(960, 0);
  });
});

describe("slide 13, the yard", () => {
  const fence = I.fence.at;
  const yard = box(fence.x, fence.y - 10, fence.w, fence.h + 20);
  const partners = bounds([...I.plates.map((plate) => plate.at), I.joining.at, label(I.joining.caption.at, I.joining.caption.text)]);

  it("spans the left two thirds with the yard, named over its top left, the caption beside the name", () => {
    expect(fence.x).toBe(SAFE.left + 16);
    expect(right(fence)).toBe(96 + (1728 * 2) / 3);
    expect(bottom(text(I.name.at, I.name.text, "start"))).toBeLessThanOrEqual(fence.y - 10);
    expect(label(I.caption.at, I.caption.text, "start").x).toBeGreaterThan(right(text(I.name.at, I.name.text, "start")));
  });

  it("lands three tiles in a row inside the fence, apart, each holding its name and its caption's rows", () => {
    expect(I.tiles).toHaveLength(3);
    for (const tile of I.tiles) {
      expect(inside(tile.at, box(fence.x + 8, fence.y + 8, fence.w - 16, fence.h - 16)), tile.key).toBe(true);
      for (const row of tileRows(tile)) expect(row.y - row.line / 2, tile.key).toBeGreaterThanOrEqual(tile.at.y + 4);
      const last = tileRows(tile).at(-1)!;
      expect(last.y + last.line / 2, tile.key).toBeLessThanOrEqual(bottom(tile.at) - 4);
      expect(tile.caption.rows.length, tile.caption.text).toBeLessThanOrEqual(2);
      for (const row of tile.caption.rows) expect(TILE_WORDS.inset + wordsWidth(row, 26), row).toBeLessThanOrEqual(tile.at.w - 8);
      expect(TILE_WORDS.inset + wordsWidth(tile.name.text, 32), tile.name.text).toBeLessThanOrEqual(tile.at.w - 8);
      expect(tile.caption.rows.join(" "), tile.key).toBe(tile.caption.text);
    }
    for (let i = 1; i < I.tiles.length; i++) expect(I.tiles[i].at.x).toBeGreaterThan(right(I.tiles[i - 1].at) + 16);
  });

  it("lays the calendar under the fence, a row of 52 weeks for each year and more, named under it", () => {
    expect(I.calendar.at.y).toBeGreaterThan(bottom(yard) + 16);
    expect(WEEK.weeks).toBeGreaterThan(2 * WEEK.cols);
    expect(I.calendar.weeks.at).toHaveLength(WEEK.weeks);
    for (const week of I.calendar.weeks.at) expect(inside(week, I.calendar.at)).toBe(true);
    expect(label(I.every.at, I.every.text, "start").y).toBeGreaterThan(bottom(I.calendar.at));
  });

  it("sets the two plates side by side beside the strip and the dashed one apart, its caption under it, all under the yard", () => {
    const [m, q] = I.plates.map((plate) => plate.at);
    expect(m.x).toBeGreaterThan(right(I.calendar.at) + 32);
    expect(q.y).toBe(m.y);
    expect(q.x - right(m)).toBeLessThanOrEqual(20);
    expect(I.joining.at.x - right(q)).toBeGreaterThanOrEqual(48);
    expect(right(I.joining.at)).toBe(SAFE.right - 16);
    expect(partners.y).toBeGreaterThan(bottom(yard) + 16);
    for (const plate of [...I.plates, I.joining]) expect(plate.at.w, plate.text).toBeGreaterThanOrEqual(wordsWidth(plate.text, 32) + 24);
    expect(label(I.joining.caption.at, I.joining.caption.text).y).toBeGreaterThan(bottom(I.joining.at));
    expect(overlaps(label(I.joining.caption.at, I.joining.caption.text), label(I.every.at, I.every.text, "start"))).toBe(false);
  });
});

describe("the department map on slides 11 and 15", () => {
  it("draws the grid at the map's proportions on both, as slide 12 does", () => {
    for (const map of [T.map, F.map]) {
      expect(map.outline.w / map.outline.h).toBeCloseTo(gridSize(1).w / gridSize(1).h, 2);
      expect(map.cells).toHaveLength(GRID.cols * GRID.rows);
    }
    expect([F.map.outline.w, F.map.outline.h]).toEqual([EXISTS.grid.at.w, EXISTS.grid.at.h]);
  });
});

describe("slide 11, the map on paper", () => {
  it("fills the field's height: the ring from the drawing's top to the policy's row, the plates the same height, the policy's row at the field's foot", () => {
    expect(T.ring.at.y).toBe(T.plates[0].at.y);
    expect(bottom(text(T.policy.name.at, T.policy.name.text, "start"))).toBeLessThanOrEqual(bottom(T.plates[2].at));
    expect(bottom(T.plates[2].at)).toBeGreaterThan(DRAW_FOOT - 8);
    expect(text(T.policy.name.at, T.policy.name.text, "start").y).toBeGreaterThan(bottom(T.ring.at) + 4);
  });

  it("holds the grid inside the ring, its name between them, and keeps the ring and its words clear of the plates", () => {
    const grid = T.map.outline;
    expect(inside(grid, box(T.ring.at.x + 24, T.ring.at.y + 24, T.ring.at.w - 48, T.ring.at.h - 48))).toBe(true);
    expect(inside(label(T.name.at, T.name.text, "start"), T.ring.at)).toBe(true);
    expect(bottom(label(T.name.at, T.name.text, "start"))).toBeLessThanOrEqual(grid.y - 4);
    for (const b of [T.ring.at, label(T.policy.caption.at, T.policy.caption.text, "start"), label(T.place.at, T.place.text, "start")]) expect(right(b)).toBeLessThan(T.plates[0].at.x - 48);
    expect(bottom(label(T.place.at, T.place.text, "start"))).toBeLessThanOrEqual(T.ring.at.y);
    expect(bottom(label(T.gaps.at, T.gaps.text, "start"))).toBeLessThanOrEqual(T.plates[0].at.y - 4);
  });

  it("sets each plate's name and caption inside its dashes, the caption on two rows at most", () => {
    const measure = PLATE.w - 2 * PLATE.inset;
    for (const plate of T.plates) {
      expect(plate.at.w).toBe(PLATE.w);
      expect(tagWords(plate.name, 26), plate.name).toBeLessThanOrEqual(measure);
      const rows = Math.ceil(tagWords(plate.caption, 26) / measure);
      expect(rows, plate.caption).toBeLessThanOrEqual(2);
      expect(30 * (1 + rows) + 4, plate.caption).toBeLessThanOrEqual(PLATE.h - 2 * 12);
    }
    for (let i = 1; i < T.plates.length; i++) expect(T.plates[i].at.y).toBe(bottom(T.plates[i - 1].at) + PLATE.gap);
    expect(right(T.plates[0].at)).toBe(SAFE.right);
  });
});

describe("slide 15, the map lit and occupied", () => {
  it("keeps the map, the staff's words, the yard and its words apart, and the rule's band under them all", () => {
    const top = [F.map.outline, staffWords, bounds([yardWords, fence(F.yard.at)])];
    for (const a of top) for (const b of top) if (a !== b) expect(overlaps(a, b)).toBe(false);
    for (const b of top) expect(bottom(b)).toBeLessThan(label(F.before.at, F.before.text, "start").y - 8);
    expect(right(F.map.outline) + 24).toBeLessThanOrEqual(staffWords.x);
    expect(right(staffWords) + 16).toBeLessThanOrEqual(F.yard.at.x);
    expect(bottom(yardWords)).toBeLessThanOrEqual(F.yard.at.y - 10);
  });

  it("stands each member of staff inside an unlit box of the grid", () => {
    const lit = F.lanterns.map((lantern) => lantern.cell);
    for (const person of F.staff) {
      const cell = F.map.cells.find((c) => inside(person.at, c.at));
      expect(cell, person.key).toBeDefined();
      expect(lit.some((b) => b.x === cell!.at.x && b.y === cell!.at.y), person.key).toBe(false);
    }
  });

  it("holds the agents, the member of staff, the mark and the fleet's words inside the yard, in a row, apart", () => {
    const yard = box(F.yard.at.x + 12, F.yard.at.y + 12, F.yard.at.w - 24, F.yard.at.h - 24);
    const agents = F.agents.map((agent) => box(agent.at.x - (AGENT.w * F.agentScale) / 2, agent.at.y, AGENT.w * F.agentScale, AGENT.h * F.agentScale));
    const row = [...agents, F.keeper.at, ringBox(F.mark.at, 24), fleetWords];
    for (const b of row) expect(inside(b, yard)).toBe(true);
    for (let i = 1; i < row.length; i++) expect(row[i].x).toBeGreaterThanOrEqual(right(row[i - 1]) + 6);
  });

  it("stands three closed gates on the rule after its heading, clear of the yard, each named under it, apart, the portfolio a clear row under them off the rule", () => {
    const before = label(F.before.at, F.before.text, "start");
    expect(bottom(before)).toBeLessThanOrEqual(F.rule.from.y - 4);
    expect(F.rule.from.x).toBe(F.map.outline.x);
    expect(F.rule.to.x).toBe(SAFE.right);
    for (const gate of F.gates) {
      expect(bottom(gate.at)).toBe(F.rule.from.y);
      expect(gate.at.x).toBeGreaterThan(right(before) + 24);
    }
    for (const b of gateLabels) expect(b.y).toBeGreaterThan(F.rule.from.y + 4);
    for (let i = 1; i < gateLabels.length; i++) expect(gateLabels[i].x).toBeGreaterThan(right(gateLabels[i - 1]) + 24);
    for (const gate of F.gates) expect(gate.caption.rows.join(" ")).toBe(gate.caption.text);
    const portfolio = label(F.portfolio.at, F.portfolio.text, "start");
    for (const b of gateLabels) expect(portfolio.y, "a clear row under the gates' words").toBeGreaterThanOrEqual(bottom(b) + 16);
    for (const gate of F.gates) expect(gate.at.y, `${gate.key} clear of the yard's posts`).toBeGreaterThanOrEqual(bottom(F.yard.at) + 10 + 12);
    expect(bottom(portfolio)).toBeLessThanOrEqual(DRAW_FOOT);
  });
});
