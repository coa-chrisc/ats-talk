/**
 * Where the plan slides' parts (21 to 23) sit: every slide's drawing under its story
 * band and inside the safe area, and the parts that share a slide clear of
 * each other where the eye has to tell them apart.
 */
import { describe, expect, it } from "vitest";
import { STORY, box, type Box } from "@/components/deck/kit";
import { LABEL_LINE, ROOM, bandFoot, contentTop, labelBox, wordsWidth } from "./layout-plan";
import { BELT, LANES, LANES_BOXES, LANES_FOOT, NAME_LINE, WELL_TEXT, placeX, wellWords } from "./layout-lanes";
import { LEVEL_UP, LEVEL_UP_BOXES, LIFT, figureBox, tierBox } from "./layout-level-up";
import { DOTS, OUTCOMES, OUTCOMES_BOXES, dotBox } from "./layout-outcomes";
import { apart, bottom, inside } from "./harness";

/** Clear of the frame's chrome: under the wordmark, over the footer and the slide number, inside the story band's width. */
const SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w };
const STAGE = box(SAFE.left, SAFE.top, SAFE.right - SAFE.left, SAFE.bottom - SAFE.top);

const SLIDES: [string, Box[]][] = [
  ["lanes", LANES_BOXES],
  ["level-up", LEVEL_UP_BOXES],
  ["outcomes", OUTCOMES_BOXES],
];

const pairs = <T,>(list: readonly T[]) => list.flatMap((a, i) => list.slice(i + 1).map((b) => [a, b] as const));
const clear = (boxes: Record<string, Box>, gap = 0) =>
  pairs(Object.entries(boxes))
    .filter(([[, a], [, b]]) => !apart(a, b, gap))
    .map(([[p], [q]]) => `${p} / ${q}`);

describe("each of the plan slides, 21 to 23", () => {
  it.each(SLIDES)("starts %s's drawing well under its story band", (id, boxes) => {
    expect(contentTop(id)).toBe(bandFoot(id) + ROOM);
    for (const b of boxes) expect(b.y, JSON.stringify(b)).toBeGreaterThanOrEqual(contentTop(id));
  });

  /** Slide 21 uses the field down to 990, 26 px over the frame's footer line; the others keep the room's width over it. */
  const FOOT: Record<string, number> = { lanes: LANES_FOOT, "level-up": SAFE.bottom - ROOM, outcomes: SAFE.bottom - ROOM };

  it.each(SLIDES)("keeps %s inside the safe area and over the footer", (id, boxes) => {
    expect(boxes.length).toBeGreaterThan(6);
    for (const b of boxes) {
      expect(inside(b, STAGE), JSON.stringify(b)).toBe(true);
      expect(bottom(b), JSON.stringify(b)).toBeLessThanOrEqual(FOOT[id]);
    }
  });

  it.each(SLIDES)("uses the stage's width on %s: its drawing spans most of the band", (_, boxes) => {
    const left = Math.min(...boxes.map((b) => b.x));
    const right = Math.max(...boxes.map((b) => b.x + b.w));
    expect(right - left).toBeGreaterThan(0.9 * STORY.w);
  });
});

describe("21, two lanes", () => {
  const L = LANES;
  const nameBox = (lane: typeof L.upper | typeof L.lower) => labelBox(lane.name.at, lane.name.text, "start", 32, NAME_LINE);
  const all = LANES_BOXES;

  it("fills the field from under the story band to 990: the drawing's top within 8 px of it and its foot within 8 px of 990", () => {
    expect(Math.min(...all.map((b) => b.y)) - contentTop("lanes")).toBeLessThanOrEqual(8);
    expect(LANES_FOOT - Math.max(...all.map(bottom))).toBeLessThanOrEqual(8);
  });

  it("runs both lanes the full width of the band, about 150 px tall, the foundations over the quick wins", () => {
    for (const lane of [L.upper, L.lower]) {
      expect(lane.at.x).toBe(STORY.x);
      expect(lane.at.w).toBe(STORY.w);
      expect(lane.at.h).toBeGreaterThanOrEqual(130);
      expect(lane.at.h).toBeLessThanOrEqual(160);
    }
    expect(bottom(L.upper.at)).toBeLessThan(L.lower.at.y - 60);
  });

  it("names the upper lane above its left end and the lower under it, at 32 px", () => {
    expect(bottom(nameBox(L.upper))).toBeLessThanOrEqual(L.upper.at.y);
    expect(nameBox(L.lower).y).toBeGreaterThanOrEqual(bottom(L.lower.at));
  });

  it("sets the four wells about 90 px tall inside the upper lane, apart, each 32 px name inside its well", () => {
    expect(L.pieces).toHaveLength(4);
    for (const piece of L.pieces) {
      expect(piece.at.h).toBeGreaterThanOrEqual(84);
      expect(piece.at.h).toBeLessThanOrEqual(96);
      expect(inside(piece.at, L.upper.at), piece.key).toBe(true);
      const words = { x: piece.label.at.x - wellWords(piece.label.text) / 2, y: piece.label.at.y - WELL_TEXT * 0.625, w: wellWords(piece.label.text), h: WELL_TEXT * 1.25 };
      expect(inside(words, piece.at), piece.label.text).toBe(true);
    }
    for (const [a, b] of pairs(L.pieces)) expect(apart(a.at, b.at, 40), `${a.key} ${b.key}`).toBe(true);
  });

  it("drops each arrow straight from its well's foot to the lower lane's top edge, at least 80 px long", () => {
    for (const { arrow, at } of L.pieces) {
      expect(arrow.from.x).toBe(arrow.to.x);
      expect(arrow.from.y).toBeGreaterThanOrEqual(bottom(at));
      expect(arrow.to.y).toBeLessThanOrEqual(L.lower.at.y);
      expect(arrow.to.y - arrow.from.y).toBeGreaterThanOrEqual(80);
    }
  });

  it("carries boxes about 64 px square inside the lower lane at every place on the belt, clear of each other", () => {
    const [parcel] = L.parcels;
    expect(parcel.at.w).toBe(64);
    expect(parcel.at.h).toBe(64);
    for (let p = 0; p <= BELT.places; p++) expect(inside({ ...parcel.at, x: parcel.at.x + placeX(p) }, L.lower.at), String(p)).toBe(true);
    for (let p = 1; p < BELT.places; p++) expect(placeX(p) - placeX(p - 1)).toBeGreaterThan(parcel.at.w + 60);
  });
});

describe("22, level up the staff the City has", () => {
  const L = LEVEL_UP;
  const tiers = L.tiers.map(tierBox);

  it("draws a pyramid: three tiers stacked, the base widest, each narrower going up, its sides sloping in", () => {
    expect(tiers[0].w).toBeGreaterThan(tiers[1].w);
    expect(tiers[1].w).toBeGreaterThan(tiers[2].w);
    expect(tiers[0].y).toBeGreaterThan(tiers[1].y);
    expect(tiers[1].y).toBeGreaterThan(tiers[2].y);
    for (const tier of L.tiers) {
      const [tl, tr, br, bl] = tier.points;
      expect(tr.x - tl.x, tier.key).toBeLessThan(br.x - bl.x);
    }
    for (const [a, b] of pairs(tiers)) expect(apart(a, b, 8)).toBe(true);
  });

  it("sets each tier's name inside it and its caption clear beside its sloping edge, clear of the row", () => {
    for (const tier of L.tiers) {
      const name = labelBox(tier.name.at, tier.name.text);
      expect(name.w, tier.name.text).toBeLessThanOrEqual(tier.widthAtName - 16);
      const caption = labelBox(tier.caption.at, tier.caption.text, "start");
      expect(caption.x, tier.caption.text).toBeGreaterThan(Math.max(...tier.points.map((p) => p.x)) - 1e-9 - 60);
      expect(caption.x + caption.w, tier.caption.text).toBeLessThanOrEqual(L.label.at.x);
    }
  });

  it("puts the row beside the pyramid, not under it: two shapes side by side", () => {
    const pyramid = { x: tiers[0].x, y: tiers[2].y, w: tiers[0].w, h: bottom(tiers[0]) - tiers[2].y };
    for (const desk of L.row.desks) {
      expect(desk.top.x).toBeGreaterThan(pyramid.x + pyramid.w + 200);
      expect(desk.person.y).toBeLessThan(bottom(pyramid));
    }
  });

  it("sets the people behind their desks, the laptops beside them, the desks apart", () => {
    for (const desk of L.row.desks) {
      expect(desk.top.y).toBeGreaterThan(desk.person.y);
      expect(desk.top.y).toBeLessThan(bottom(desk.person));
      expect(apart(desk.laptop, desk.person, 12), desk.key).toBe(true);
      expect(inside({ ...desk.laptop, h: desk.laptop.h - 1 }, box(desk.top.x, 0, desk.top.w, desk.top.y))).toBe(true);
    }
    for (const [a, b] of pairs(L.row.desks)) expect(apart(a.top, b.top, 16)).toBe(true);
  });

  it("hangs the tag over the row's middle, clear of its name and of the people, both words inside it", () => {
    const name = labelBox(L.label.at, L.label.text, "start");
    expect(apart(L.tag.at, name, 8)).toBe(true);
    for (const desk of L.row.desks) expect(bottom(L.tag.at)).toBeLessThan(desk.person.y);
    for (const words of [L.tag.grey.text, L.tag.green.text]) expect(L.tag.at.w).toBeGreaterThanOrEqual(wordsWidth(words) + 32);
  });

  it("slides the slab in right under the desks' feet, the row's width, its name inside it", () => {
    for (const desk of L.row.desks) {
      expect(L.slab.at.y).toBeGreaterThan(desk.foot);
      expect(L.slab.at.y - desk.foot).toBeLessThanOrEqual(8);
      expect(desk.top.x).toBeGreaterThanOrEqual(L.slab.at.x);
      expect(desk.top.x + desk.top.w).toBeLessThanOrEqual(L.slab.at.x + L.slab.at.w);
    }
    expect(inside(labelBox(L.slab.label.at, L.slab.label.text), L.slab.at)).toBe(true);
    expect(LIFT).toBeGreaterThan(16);
    expect(LIFT).toBeLessThan(40);
  });

  it("sets the figure large under the lifted slab at the row's left edge, its caption under it on two lines, clear of the pyramid", () => {
    const figure = figureBox();
    const lines = L.caption.lines.map((line) => labelBox(line.at, line.text, "start"));
    expect(L.caption.lines.map((line) => line.text).join(" ")).toBe(L.caption.text);
    expect(L.figure.size).toBeGreaterThanOrEqual(40);
    expect(figure.x).toBe(L.slab.at.x);
    expect(figure.y).toBeGreaterThanOrEqual(bottom(L.slab.at) + 12);
    for (const line of lines) {
      expect(line.x).toBe(figure.x);
      expect(line.x + line.w, line.y.toString()).toBeLessThanOrEqual(L.slab.at.x + L.slab.at.w);
    }
    expect(lines[0].y).toBeGreaterThanOrEqual(bottom(figure) + 12);
    expect(lines[1].y).toBeGreaterThanOrEqual(lines[0].y + LABEL_LINE);
    for (const tier of tiers) expect(apart(figure, tier, 24)).toBe(true);
  });
});

describe("23, measure outcomes", () => {
  const O = OUTCOMES;

  it("sets six tiles across the band, apart, named once over the first, its name inside it on two lines", () => {
    expect(O.tiles).toHaveLength(6);
    for (const [a, b] of pairs(O.tiles)) expect(apart(a.at, b.at, 20)).toBe(true);
    expect(labelBox(O.plan.at, O.plan.text, "start").y + LABEL_LINE).toBeLessThanOrEqual(O.tiles[0].at.y);
    expect(O.name.lines).toHaveLength(2);
    for (const line of O.name.lines) expect(inside(labelBox(line.at, line.text), O.tiles[0].at), line.text).toBe(true);
  });

  it("hangs one bracket under the other five tiles, its caption centred under it, clear of the measure", () => {
    const tiles = O.tiles.slice(1);
    const foot = Math.max(...tiles.map((tile) => bottom(tile.at)));
    const [x0, y0] = O.others.d.match(/[\d.]+/g)!.map(Number);
    expect(x0).toBe(tiles[0].at.x);
    expect(y0).toBeGreaterThan(foot);
    const caption = labelBox(O.others.caption.at, O.others.caption.text);
    expect(O.others.caption.at.x).toBeCloseTo((tiles[0].at.x + tiles.at(-1)!.at.x + tiles.at(-1)!.at.w) / 2, 6);
    expect(caption.y).toBeGreaterThan(foot + 20);
    const M = O.measure;
    for (const other of [box(M.to.x - M.end.r, M.to.y - M.end.r, 2 * M.end.r, 2 * M.end.r), labelBox(M.endLabel.at, M.endLabel.text, "start"), O.tally.at]) expect(apart(caption, other, 8)).toBe(true);
  });

  it("attaches each dot inside its own tile's foot, most to the first, clear of the first tile's name", () => {
    for (let tile = 1; tile < DOTS.length; tile++) expect(DOTS[0]).toBeGreaterThan(DOTS[tile]);
    for (const dot of O.dots) {
      const tile = O.tiles[dot.tile].at;
      expect(inside(dotBox(dot.at), box(tile.x + 8, tile.y, tile.w - 16, tile.h - 8)), dot.key).toBe(true);
    }
    for (const line of O.name.lines) for (const dot of O.dots.filter((d) => d.tile === 0)) expect(apart(labelBox(line.at, line.text), dotBox(dot.at), 8)).toBe(true);
  });

  it("draws the tally and the measure line in the same place under the tiles, the line rising from left to right", () => {
    const M = O.measure;
    expect(M.to.y).toBeLessThan(M.from.y);
    expect(M.to.x - M.from.x).toBeGreaterThan(600);
    const mid = { x: (M.from.x + M.to.x) / 2, y: (M.from.y + M.to.y) / 2 };
    expect(inside(box(mid.x, mid.y, 0, 0), O.tally.at)).toBe(true);
    for (const tile of O.tiles) expect(O.tally.at.y).toBeGreaterThan(bottom(tile.at) + 40);
    expect(M.to.y - M.end.r).toBeGreaterThan(bottom(O.tiles[0].at) + 40);
  });

  it("names both points on their outer sides, the tally at its left, and hangs the nameplate under the line, all clear", () => {
    const M = O.measure;
    const labels = {
      baseline: labelBox(M.startLabel.at, M.startLabel.text, "end"),
      target: labelBox(M.endLabel.at, M.endLabel.text, "start"),
      plate: O.plate.at,
      pilots: labelBox(O.tally.label.at, O.tally.label.text, "end"),
    };
    expect(clear(labels, 12)).toEqual([]);
    expect(apart(labels.pilots, O.tally.at, 12)).toBe(true);
    expect(labels.baseline.x + labels.baseline.w).toBeLessThan(M.from.x - M.start.r);
    expect(labels.target.x).toBeGreaterThan(M.to.x + M.end.r);
    expect(O.plate.at.w).toBeGreaterThanOrEqual(wordsWidth(O.plate.text) + 24);
    // The line passes over the plate: at the plate's two top corners it is still above it.
    const lineY = (x: number) => M.from.y + ((M.to.y - M.from.y) * (x - M.from.x)) / (M.to.x - M.from.x);
    for (const x of [O.plate.at.x, O.plate.at.x + O.plate.at.w]) expect(lineY(x) + 12).toBeLessThan(O.plate.at.y);
  });
});
