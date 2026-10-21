/**
 * Where the plan slides' parts (21 to 23) sit: every slide's drawing under its story
 * band and inside the safe area, and the parts that share a slide clear of
 * each other where the eye has to tell them apart.
 */
import { describe, expect, it } from "vitest";
import { STORY, box, type Box } from "@/components/deck/kit";
import { ROOM, bandFoot, contentTop, labelBox,  } from "./layout-plan";
import { BELT, LANES, LANES_BOXES, LANES_FOOT, NAME_LINE, WELL_TEXT, placeX, wellWords } from "./layout-lanes";
import { apart, bottom, inside } from "./harness";

/** Clear of the frame's chrome: under the wordmark, over the footer and the slide number, inside the story band's width. */
const SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w };
const STAGE = box(SAFE.left, SAFE.top, SAFE.right - SAFE.left, SAFE.bottom - SAFE.top);

const SLIDES: [string, Box[]][] = [
  ["lanes", LANES_BOXES],
];

const pairs = <T,>(list: readonly T[]) => list.flatMap((a, i) => list.slice(i + 1).map((b) => [a, b] as const));

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
