/**
 * Where the stands world's slides put things: every slide's drawing under
 * its story band and inside the frame's safe area; the track fixed where
 * slides 11, 15 and 27 all draw it; and on each slide the parts that must
 * not meet kept apart, and the parts that hold others holding them.
 */
import { describe, expect, it } from "vitest";
import { STORY, box, type Box, type Point } from "@/components/deck/kit";
import { DRAW_FOOT, LABEL_LINE, SAFE, TAG, TEXT_LINE, bandFoot, contentTop, tagWidth, tagWords, wordsWidth } from "./layout";
import { controlGlyphs, controlRows } from "./layout-control";
import { fitsGlyphs, fitsRows } from "./layout-fits";
import { EXISTS, existsRows } from "./layout-exists";
import { INFRASTRUCTURE } from "./layout-infrastructure";
import { HOST, NOTICED } from "./layout-noticed";
import { FLEET, PITCH } from "./layout-fleet";
import { TRACK } from "./layout-track";
import { AGENT, FENCE, GRID, MAP_AT, PLATE, RING_PAD, fenceBox, fencePickets, gridSize } from "../department-map";
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
const yardWords = bounds([label(F.yard.name.at, F.yard.name.text, "start"), rowsBox(F.yard.caption.at, F.yard.caption.rows)]);
const portfolio = rowsBox(F.portfolio.at, F.portfolio.rows);

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
    F.yard.reach,
    fleetWords,
    label(F.before.at, F.before.text, "start"),
    box(F.rule.from.x, F.rule.from.y - 2, F.rule.to.x - F.rule.from.x, 4),
    ...F.gates.map((gate) => gate.at),
    ...gateLabels,
    portfolio,
  ],
  control: [...controlRows().map((row) => row.box), ...controlGlyphs().map((glyph) => glyph.box)],
  fits: [...fitsRows().map((row) => row.box), ...fitsGlyphs().map((glyph) => glyph.box)],
  exists: [
    E.map.outline,
    ...existsRows().map((row) => row.box),
    ...E.staff.map((person) => person.at),
    ringBox(E.table.c, E.table.reach),
  ],
  noticed: [
    box(N.rail.x0, N.rail.y - 2, N.rail.x1 - N.rail.x0, 4),
    ...N.plaques.flatMap((plaque) => [plaque.at, { ...plaque.at, y: plaque.at.y - 24 }, ringBox(plaque.cord.nail, 4)]),
    N.only.at,
  ],
  infrastructure: [
    text(I.name.at, I.name.text, "start"),
    label(I.caption.at, I.caption.text, "start"),
    I.fence.reach,
    ringBox(I.table.c, I.table.r),
    ...I.plates.map((plate) => plate.at),
    text(I.met.at, I.met.text),
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
    for (const tag of [N.only]) {
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

describe("the department map on slides 11, 12 and 15", () => {
  it("draws the grid at the map's full size and at the map's place on all three", () => {
    for (const map of [T.map, E.map, F.map]) {
      expect([map.outline.w, map.outline.h]).toEqual([gridSize(1).w, gridSize(1).h]);
      expect([map.outline.x, map.outline.y]).toEqual([MAP_AT.x, MAP_AT.y]);
      expect(map.cells).toHaveLength(GRID.cols * GRID.rows);
    }
  });
});

describe("the picket fence, slides 13, 15 and 18", () => {
  for (const [name, at, scale] of [
    ["slide 13", I.fence.at, 1],
    ["slide 15", F.yard.at, 1],
    ["slide 18 (small)", box(0, 100, 520, 88), 0.8],
  ] as const) {
    it(`${name}: stands its pickets on the top rail, their tips clear over it, nothing under the foot rail, evenly along the rail inside its corners`, () => {
      const { pickets, reach } = fencePickets(at, scale);
      expect(pickets.length).toBeGreaterThanOrEqual(2);
      expect(fenceBox(at, scale)).toEqual(box(at.x, at.y - reach, at.w, at.h + reach));
      expect(reach).toBeGreaterThanOrEqual(12);
      for (const picket of pickets) {
        const ys = [...picket.d.matchAll(/[MVL](?:[\d.-]+ )?([\d.-]+)/g)].map((m) => Number(m[1]));
        expect(Math.min(...ys), picket.d).toBe(at.y - reach);
        expect(Math.max(...ys), picket.d).toBeLessThan(at.y + at.h / 2);
        expect(picket.x).toBeGreaterThan(at.x + FENCE.rx * scale);
        expect(picket.x).toBeLessThan(at.x + at.w - FENCE.rx * scale);
        expect(picket.at).toBeGreaterThan(0);
        expect(picket.at).toBeLessThan(0.5);
      }
      const gaps = pickets.slice(1).map((p, i) => p.x - pickets[i].x);
      expect(Math.max(...gaps) - Math.min(...gaps)).toBeLessThanOrEqual(1);
      expect(Math.min(...gaps)).toBeGreaterThan(FENCE.picket.w * scale * 2);
    });
  }
});

describe("slide 11, the map on paper", () => {
  it("fills the field's height: the ring from the map's place to the policy's row, the plates the same height down to the drawing's foot", () => {
    expect(T.ring.at.y).toBe(T.plates[0].at.y);
    expect(bottom(text(T.policy.name.at, T.policy.name.text, "start"))).toBeLessThanOrEqual(bottom(T.plates[2].at));
    expect(bottom(T.plates[2].at)).toBeGreaterThan(DRAW_FOOT - 8);
    expect(text(T.policy.name.at, T.policy.name.text, "start").y).toBeGreaterThan(bottom(T.ring.at) + 4);
  });

  it("holds the grid inside the ring, its name between them, and keeps the ring and its words clear of the plates", () => {
    const grid = T.map.outline;
    expect([grid.x - T.ring.at.x, grid.y - T.ring.at.y, right(T.ring.at) - right(grid), bottom(T.ring.at) - bottom(grid)]).toEqual([RING_PAD.side, RING_PAD.top, RING_PAD.side, RING_PAD.foot]);
    expect(label(T.name.at, T.name.text, "start").y).toBeGreaterThanOrEqual(T.ring.at.y + 12);
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
  it("keeps the map, the staff's words, the yard, its words and the fleet's words apart", () => {
    const parts = [F.map.outline, staffWords, F.yard.reach, yardWords, fleetWords, portfolio];
    for (const a of parts) for (const b of parts) if (a !== b) expect(overlaps(a, b)).toBe(false);
  });

  it("sets the staff's words directly under the grid, from its left edge, and the portfolio under them", () => {
    expect(staffWords.x).toBe(F.map.outline.x);
    expect(staffWords.y).toBeGreaterThanOrEqual(bottom(F.map.outline) + 8);
    expect(staffWords.y).toBeLessThanOrEqual(bottom(F.map.outline) + 24);
    expect(portfolio.x).toBe(F.map.outline.x);
    expect(portfolio.y).toBeGreaterThanOrEqual(bottom(staffWords) + 8);
    expect(F.portfolio.rows.join(" ")).toBe(F.portfolio.text);
  });

  it("names the yard beside its fence, and sets the fleet's words under the fence, clear of the mark", () => {
    expect(yardWords.x).toBeGreaterThanOrEqual(right(F.yard.at) + 24);
    expect(yardWords.y).toBeGreaterThanOrEqual(F.yard.reach.y);
    expect(F.yard.caption.rows.join(" ")).toBe(F.yard.caption.text);
    expect(fleetWords.x).toBe(F.yard.at.x);
    expect(fleetWords.y).toBeGreaterThanOrEqual(bottom(F.yard.at) + 8);
    expect(overlaps(fleetWords, ringBox(F.mark.at, 32))).toBe(false);
    expect(right(fleetWords)).toBeLessThanOrEqual(SAFE.right);
  });

  it("stands each member of staff inside an unlit box of the grid", () => {
    const lit = F.windows.map((window) => window.cell);
    for (const person of F.staff) {
      const cell = F.map.cells.find((c) => inside(person.at, c.at));
      expect(cell, person.key).toBeDefined();
      expect(lit.some((b) => b.x === cell!.at.x && b.y === cell!.at.y), person.key).toBe(false);
    }
  });

  it("holds the agents, the member of staff and the mark inside the yard, in a row, apart", () => {
    const yard = box(F.yard.at.x + 12, F.yard.at.y + 12, F.yard.at.w - 24, F.yard.at.h - 24);
    const agents = F.agents.map((agent) => box(agent.at.x - (AGENT.w * F.agentScale) / 2, agent.at.y, AGENT.w * F.agentScale, AGENT.h * F.agentScale));
    const row = [...agents, F.keeper.at, ringBox(F.mark.at, 24)];
    for (const b of row) expect(inside(b, yard)).toBe(true);
    for (let i = 1; i < row.length; i++) expect(row[i].x).toBeGreaterThanOrEqual(right(row[i - 1]) + 6);
  });

  it("runs the rule from the grid's right edge to the drawing's, headed over its start, three closed gates standing on it across that width, each named under it, apart", () => {
    const before = label(F.before.at, F.before.text, "start");
    expect(F.rule.from.x).toBe(right(F.map.outline));
    expect(F.rule.to.x).toBe(SAFE.right);
    expect(before.x, "in line with the first gate's words, clear of the grid").toBe(F.rule.from.x + 24);
    expect(Math.abs(before.x - gateLabels[0].x)).toBeLessThanOrEqual(1);
    for (const gate of F.gates) {
      expect(bottom(gate.at)).toBe(F.rule.from.y);
      expect(bottom(before), gate.key).toBeLessThanOrEqual(gate.at.y - 12);
      expect(gate.at.y, `${gate.key} clear of the fleet's words`).toBeGreaterThanOrEqual(bottom(fleetWords) + 24);
    }
    for (const b of gateLabels) expect(b.y).toBeGreaterThan(F.rule.from.y + 4);
    const gaps = gateLabels.slice(1).map((b, i) => b.x - right(gateLabels[i]));
    for (const gap of gaps) expect(gap).toBeGreaterThanOrEqual(32);
    expect(Math.max(...gaps) - Math.min(...gaps), "the room shared evenly").toBeLessThanOrEqual(2);
    expect(gateLabels[0].x).toBeGreaterThanOrEqual(F.rule.from.x + 24);
    expect(right(gateLabels[2])).toBeLessThanOrEqual(SAFE.right);
    for (const gate of F.gates) expect(gate.caption.rows.join(" ")).toBe(gate.caption.text);
  });

  it("keeps the staff's words and the portfolio left of the gates' words, the portfolio's last row on the drawing's foot", () => {
    for (const b of [staffWords, portfolio]) expect(right(b) + 24).toBeLessThanOrEqual(gateLabels[0].x);
    expect(bottom(portfolio)).toBeLessThanOrEqual(DRAW_FOOT);
    expect(bottom(portfolio)).toBeGreaterThan(DRAW_FOOT - 24);
  });
});
