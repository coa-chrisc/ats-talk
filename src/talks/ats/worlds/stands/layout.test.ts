/**
 * Where the stands world's slides put things: every slide's drawing under
 * its story band and inside the frame's safe area; the track fixed where
 * slides 11, 15 and 27 all draw it; and on each slide the parts that must
 * not meet kept apart, and the parts that hold others holding them.
 */
import { describe, expect, it } from "vitest";
import { STORY, box, type Box, type Point } from "@/components/deck/kit";
import { DRAW_FOOT, LABEL_LINE, SAFE, TAG, TEXT_LINE, bandFoot, contentTop, tagWidth, wordsWidth } from "./layout";
import { DOT_R, EXISTS, GRID, GRID_BOX, LANTERN, LIT, cellAt } from "./layout-exists";
import { FITS, ROW, TICK_R } from "./layout-fits";
import { FLEET, GATE } from "./layout-fleet";
import { INFRASTRUCTURE, TILE_WORDS, WEEK, tileRows } from "./layout-infrastructure";
import { HOST, NOTICED } from "./layout-noticed";
import { TRACK } from "./layout-track";
import { BEND, CITY_AT, CITY_STANDS, INNER, LANES, MARKER_R, MARKER_X, MIDDLE, NEAR_MIDDLE, OUTER, PACK, R, RUNNER, START, START_X, TRACK_TOP } from "./track-geometry";
import { bottom, bounds, inside, overlaps, right, ringBox, wordsBox } from "./harness";

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
const runnerBox = (at: Point, h: number) => box(at.x - h * 0.4, at.y - h, h * 0.8, h);
const T = TRACK;
const E = EXISTS;
const N = NOTICED;
const I = INFRASTRUCTURE;
const F = FITS;
const L = FLEET;

const DRAWN: Record<string, Box[]> = {
  track: [
    OUTER,
    text(T.city.name.at, T.city.name.text),
    box(T.post.x, T.post.top, T.post.w, T.post.foot - T.post.top),
    ringBox(T.post.tick.at, T.post.tick.r),
    label(T.post.name.at, T.post.name.text, "start"),
  ],
  exists: [
    E.ring.at,
    ...E.ring.dots.map((dot) => ringBox(dot.at, DOT_R)),
    label(E.name.at, E.name.text, "start"),
    ...E.named.flatMap((lit) => [text(lit.name.at, lit.name.text, "start"), label(lit.caption.at, lit.caption.text, "start")]),
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
  fits: [
    ...F.heads.flatMap((head) => [text(head.at, head.text, head.anchor), box(Math.min(head.rule.from.x, head.rule.to.x), head.rule.from.y - 2, Math.abs(head.rule.to.x - head.rule.from.x), 4)]),
    ...F.pairs.flatMap((pair) => [text(pair.ask.at, pair.ask.text, "end"), text(pair.has.at, pair.has.text, "start"), ringBox(pair.tick.at, pair.tick.r)]),
    F.connects.at,
  ],
  fleet: [
    OUTER,
    runnerBox(CITY_STANDS, RUNNER.large),
    ...L.markers.map((marker) => label(marker.name.at, marker.name.text)),
    L.applications.at,
    L.stair.tag.at,
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
    for (const tag of [T.tag, E.staff, E.apart, N.only, F.connects, L.stair.tag, L.applications]) {
      expect(tag.at.h, tag.text).toBe(TAG.h);
      expect(tag.at.w, tag.text).toBe(tagWidth(tag.text));
      // Measured in Geist at 26 px the longest letter runs average 0.48 of the size: the tag's 0.52 holds them with room.
      expect(tag.at.w - TAG.point - TAG.gap - TAG.pad, tag.text).toBeGreaterThanOrEqual(tag.text.length * TAG.size * 0.5);
    }
  });
});

describe("the track, fixed for slides 11, 15 and 27", () => {
  it("stands under a two-line title's story band on both its slides here, at the documented numbers", () => {
    expect(TRACK_TOP).toBe(contentTop("track"));
    expect(TRACK_TOP).toBe(contentTop("fleet"));
    expect(OUTER).toEqual({ x: 96, y: 564, w: 1728, h: 344 });
    expect([LANES, R]).toEqual([96, 172]);
    expect(INNER).toEqual({ x: 192, y: 660, w: 1536, h: 152 });
    expect(MIDDLE).toEqual({ x: 144, y: 612, w: 1632, h: 248 });
    expect(START_X).toBe(316);
    expect(PACK.map((at) => at.x)).toEqual([1040, 1086, 1132, 1178, 1063, 1109, 1155]);
    expect(CITY_AT).toEqual({ x: 360, y: 898 });
    expect(CITY_STANDS).toEqual({ x: 1759, y: 798 });
    expect([...MARKER_X]).toEqual([576, 876, 1176]);
  });

  it("draws the track large: the whole drawing width, two lanes inside its outer edge", () => {
    expect(OUTER.x).toBe(SAFE.left + 16);
    expect(right(OUTER)).toBe(SAFE.right);
    expect(inside(INNER, MIDDLE) && inside(MIDDLE, OUTER)).toBe(true);
  });

  it("puts slide 15's runner on the right bend's middle line, 60 degrees up it", () => {
    const d = Math.hypot(CITY_STANDS.x - BEND.right, CITY_STANDS.y - BEND.cy);
    expect(Math.abs(d - (R - LANES / 2))).toBeLessThan(1);
    expect(CITY_STANDS.x).toBeGreaterThan(BEND.right);
    expect(CITY_STANDS.y).toBeGreaterThan(BEND.cy);
  });

  it("puts the pack on the far straight, each runner in one lane", () => {
    for (const at of PACK) {
      const b = runnerBox(at, RUNNER.small);
      expect(b.y).toBeGreaterThanOrEqual(OUTER.y);
      expect(bottom(b)).toBeLessThanOrEqual(INNER.y);
      expect(at.x).toBeGreaterThan(BEND.left);
      expect(at.x).toBeLessThan(BEND.right);
    }
  });
});

describe("slide 11, the track", () => {
  const infield = box(INNER.x + INNER.h / 2, INNER.y, INNER.w - INNER.h, INNER.h);
  const home = runnerBox(T.city.at, RUNNER.large);
  const post = box(T.post.x, T.post.top, T.post.w, T.post.foot - T.post.top);

  it("makes the home runner more than twice a pack runner's size, standing on the near straight at the start stripe", () => {
    expect(RUNNER.large).toBeGreaterThanOrEqual(2 * RUNNER.small);
    expect(home.y).toBeGreaterThan(bottom(INNER));
    expect(bottom(home)).toBeLessThanOrEqual(bottom(OUTER));
    expect(START.y0).toBe(bottom(INNER));
    expect(START.y1).toBe(bottom(OUTER));
    expect(home.x).toBeGreaterThan(START.x + 7);
    expect(home.x - START.x).toBeLessThan(24);
  });

  it("names the pack under it in the infield, and the home runner right under it, outside the track", () => {
    expect(inside(text(T.pack.name.at, T.pack.name.text), infield)).toBe(true);
    const name = text(T.city.name.at, T.city.name.text);
    expect(T.city.name.at.x).toBe(T.city.at.x);
    expect(name.y).toBeGreaterThan(bottom(OUTER));
    expect(name.y - bottom(OUTER)).toBeLessThan(24);
  });

  it("plants the post just outside the track beside the start, its tick on its cap and its name to its right, none of it on the lane or the home runner's name", () => {
    expect(T.post.top - T.post.tick.r - 2).toBeGreaterThanOrEqual(bottom(OUTER));
    expect(Math.abs(T.post.tick.at.x - (T.post.x + T.post.w / 2))).toBeLessThan(1);
    const name = label(T.post.name.at, T.post.name.text, "start");
    expect(name.x).toBeGreaterThan(right(post));
    expect(post.x).toBeGreaterThan(right(text(T.city.name.at, T.city.name.text)) + 12);
    expect(post.x - START.x).toBeLessThan(260);
  });

  it("centres the grey tag in the infield, clear of the pack's name", () => {
    expect(T.tag.at.x + T.tag.at.w / 2).toBeCloseTo(960, 0);
    expect(inside(T.tag.at, infield)).toBe(true);
    expect(overlaps(T.tag.at, text(T.pack.name.at, T.pack.name.text))).toBe(false);
  });
});

describe("slide 12, the departments", () => {
  it("lays the grid out as the documented numbers, so slide 17 can copy it", () => {
    expect(GRID).toEqual({ x: 176, y: 624, cols: 7, rows: 3, box: { w: 104, h: 68 }, gap: 14, rx: 8 });
    expect(GRID_BOX).toEqual({ x: 176, y: 624, w: 812, h: 232 });
    expect(cellAt(6, 2)).toEqual({ x: 884, y: 788, w: 104, h: 68 });
    expect(E.boxes).toHaveLength(21);
    for (const a of E.boxes) for (const b of E.boxes) if (a !== b) expect(overlaps(a.at, b.at), `${a.key} ${b.key}`).toBe(false);
  });

  it("lights two named boxes and five unnamed ones, each a different box, each lantern inside its box", () => {
    const lit = [...LIT.named, ...LIT.unnamed].map(([col, row]) => `${col}.${row}`);
    expect(new Set(lit).size).toBe(7);
    for (const lantern of [...E.named, ...E.unnamed]) expect(inside(box(lantern.centre.x - LANTERN.w / 2, lantern.centre.y - LANTERN.h / 2, LANTERN.w, LANTERN.h), lantern.at), lantern.key).toBe(true);
  });

  it("names the two lit boxes to the ring's right, each leader from its box's edge to its name, the names apart", () => {
    for (const lit of E.named) {
      expect(lit.leader.from.x).toBeGreaterThan(right(lit.at));
      expect(lit.leader.to.x).toBeLessThan(lit.name.at.x);
      expect(lit.name.at.x).toBeGreaterThan(right(E.ring.at) + 24);
      expect(right(label(lit.caption.at, lit.caption.text, "start"))).toBeLessThanOrEqual(SAFE.right);
    }
    const [a, b] = E.named.map((lit) => bounds([text(lit.name.at, lit.name.text, "start"), label(lit.caption.at, lit.caption.text, "start")]));
    expect(bottom(a) + 12).toBeLessThan(b.y);
    expect(text(E.ring.name.at, E.ring.name.text, "start").y).toBeGreaterThan(bottom(b) + 12);
  });

  it("rings the grid with nine dots, and sets the tag under the ring and the grey tag apart at the right", () => {
    expect(E.ring.dots).toHaveLength(9);
    expect(inside(GRID_BOX, E.ring.at)).toBe(true);
    expect(E.staff.at.y).toBeGreaterThan(bottom(E.ring.at) + DOT_R);
    expect(E.apart.at.x).toBeGreaterThan(right(E.staff.at) + 200);
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
        const caption = label(plaque.caption.at, plaque.caption.text);
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
    expect(partners.y).toBeGreaterThan(bottom(yard) + 16);
    for (const plate of [...I.plates, I.joining]) expect(plate.at.w, plate.text).toBeGreaterThanOrEqual(wordsWidth(plate.text, 32) + 24);
    expect(label(I.joining.caption.at, I.joining.caption.text).y).toBeGreaterThan(bottom(I.joining.at));
    expect(overlaps(label(I.joining.caption.at, I.joining.caption.text), label(I.every.at, I.every.text, "start"))).toBe(false);
  });
});

describe("slide 14, the two columns", () => {
  it("sets every line at the text size, each row 80 px under the last, the pairs level across the middle line", () => {
    expect(ROW).toBe(80);
    for (const [i, pair] of F.pairs.entries()) {
      expect(pair.ask.at.y).toBe(pair.has.at.y);
      expect(pair.tick.at.y).toBe(pair.ask.at.y);
      if (i > 0) expect(pair.ask.at.y - F.pairs[i - 1].ask.at.y).toBe(ROW);
    }
    expect(F.pairs[0].ask.at.y - F.heads[0].at.y).toBe(ROW);
  });

  it("puts the ticks on the middle line between the columns, each joined to both its lines, clear of the words", () => {
    for (const pair of F.pairs) {
      expect(pair.tick.at.x).toBe(960);
      const ask = text(pair.ask.at, pair.ask.text, "end");
      const has = text(pair.has.at, pair.has.text, "start");
      expect(right(ask)).toBeLessThan(pair.tick.at.x - TICK_R - 40);
      expect(has.x).toBeGreaterThan(pair.tick.at.x + TICK_R + 40);
      const [left, rightJoin] = pair.joins;
      expect(left.from.x).toBeGreaterThan(right(ask));
      expect(left.to.x).toBeLessThan(pair.tick.at.x - TICK_R);
      expect(rightJoin.from.x).toBeLessThan(has.x);
      expect(rightJoin.to.x).toBeGreaterThan(pair.tick.at.x + TICK_R);
    }
  });

  it("heads each column over its lines with a rule, and sets the grey tag under the ticks, clear of the last row", () => {
    for (const head of F.heads) expect(head.rule.from.y).toBeGreaterThan(text(head.at, head.text).y + TEXT_LINE - 8);
    expect(F.pairs[0].ask.at.y - TEXT_LINE / 2).toBeGreaterThan(F.heads[0].rule.from.y + 8);
    expect(F.connects.at.x + F.connects.at.w / 2).toBeCloseTo(960, 0);
    expect(F.connects.at.y).toBeGreaterThan(F.pairs[3].ask.at.y + TEXT_LINE / 2 + 16);
  });
});

describe("slide 15, where the City stands", () => {
  const infield = box(INNER.x + INNER.h / 2, INNER.y, INNER.w - INNER.h, INNER.h);
  const packName = text(L.pack.name.at, L.pack.name.text);

  it("names the pack where slide 11 does, and draws the runner where slide 11 left it and carries it to where it stands", () => {
    expect(L.pack.name.at).toEqual(T.pack.name.at);
    expect(L.pack.name.text).toBe(T.pack.name.text);
    expect(L.city.at).toEqual(CITY_AT);
    expect(L.city.stands).toEqual(CITY_STANDS);
  });

  it("sets the three markers on the near straight's middle line, behind the runner, named under the track", () => {
    for (const [i, marker] of L.markers.entries()) {
      expect(marker.at).toEqual({ x: MARKER_X[i], y: NEAR_MIDDLE });
      expect(marker.r).toBe(MARKER_R);
      expect(marker.at.x).toBeLessThan(BEND.right);
      const name = label(marker.name.at, marker.name.text);
      expect(name.y).toBeGreaterThan(bottom(OUTER));
      expect(marker.name.at.x).toBe(marker.at.x);
    }
    for (let i = 1; i < L.markers.length; i++) expect(label(L.markers[i].name.at, L.markers[i].name.text).x).toBeGreaterThan(right(label(L.markers[i - 1].name.at, L.markers[i - 1].name.text)) + 40);
  });

  it("stands the stair in the infield left of its middle, climbing left to right, each name inside its riser and each gate on its tread", () => {
    const steps = L.stair.steps;
    for (let i = 1; i < steps.length; i++) {
      expect(steps[i].at.y).toBeLessThan(steps[i - 1].at.y);
      expect(steps[i].at.x).toBeGreaterThanOrEqual(right(steps[i - 1].at));
    }
    for (const entry of steps) {
      expect(inside(entry.at, infield), entry.text).toBe(true);
      expect(inside(label(entry.name.at, entry.text), box(entry.at.x + 2, entry.at.y + 2, entry.at.w - 4, entry.at.h - 4)), entry.text).toBe(true);
      expect(inside(box(entry.gate.at.x - GATE.span / 2, entry.gate.at.y - GATE.h, GATE.span, GATE.h), infield), entry.text).toBe(true);
    }
    expect(right(steps[3].at)).toBeLessThan(960);
    expect(steps.map((entry) => entry.lit)).toEqual([true, true, true, false]);
  });

  it("sets the grey tag beside the top step, inside the infield, clear of the pack's name", () => {
    const top = L.stair.steps[3];
    expect(L.stair.tag.at.x).toBeGreaterThan(right(top.at));
    expect(L.stair.tag.at.y).toBeGreaterThanOrEqual(top.at.y);
    expect(inside(L.stair.tag.at, infield)).toBe(true);
    expect(overlaps(L.stair.tag.at, packName)).toBe(false);
  });

  it("sets the tag under the track at the right, under the markers' names", () => {
    expect(right(L.applications.at)).toBe(SAFE.right - 16);
    expect(L.applications.at.x).toBeGreaterThan(960);
    for (const marker of L.markers) expect(overlaps(L.applications.at, label(marker.name.at, marker.name.text)), marker.name.text).toBe(false);
    expect(L.applications.at.y).toBeGreaterThan(bottom(OUTER) + 32);
  });
});
