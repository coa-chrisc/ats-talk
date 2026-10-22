/**
 * Where the plan slides' parts (21 to 23) sit: every slide's drawing under its story
 * band and inside the safe area, and the parts that share a slide clear of
 * each other where the eye has to tell them apart.
 */
import { describe, expect, it } from "vitest";
import { STORY, box, type Box } from "@/components/deck/kit";
import { ROOM, bandFoot, contentTop, labelBox,  } from "./layout-plan";
import { BELT, ENTER, LANES, LANES_BOXES, LANES_FOOT, NAME_LINE, NAME_TEXT, TILE_LEADING, placeX, tileWords } from "./layout-lanes";
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
  const nameBox = (lane: typeof L.upper | typeof L.lower) => labelBox(lane.name.at, lane.name.text, "start", NAME_TEXT, NAME_LINE);
  const all = LANES_BOXES;

  it("starts the drawing within 8 px of the field's top and ends it at the lower lane, inside the room over the footer", () => {
    expect(Math.min(...all.map((b) => b.y)) - contentTop("lanes")).toBeLessThanOrEqual(8);
    expect(Math.max(...all.map(bottom))).toBe(LANES_FOOT);
    expect(LANES_FOOT).toBeLessThanOrEqual(SAFE.bottom - ROOM);
  });

  it("runs both lanes from past the names to the band's right edge, about 150 px tall, the foundations over the projects", () => {
    for (const lane of [L.upper, L.lower]) {
      expect(lane.at.x).toBe(L.upper.at.x);
      expect(lane.at.x + lane.at.w).toBe(STORY.x + STORY.w);
      expect(lane.at.w).toBeGreaterThan(0.7 * STORY.w);
      expect(lane.at.h).toBeGreaterThanOrEqual(130);
      expect(lane.at.h).toBeLessThanOrEqual(160);
    }
    expect(bottom(L.upper.at)).toBeLessThan(L.lower.at.y - 60);
  });

  it("names both lanes on the same side, in a column at their left, each name level with its lane's middle, at 32 px", () => {
    for (const lane of [L.upper, L.lower]) {
      expect(lane.name.at.x).toBe(STORY.x);
      expect(lane.name.at.y).toBe(lane.at.y + lane.at.h / 2);
      const name = nameBox(lane);
      expect(name.x + name.w + 24, lane.name.text).toBeLessThanOrEqual(lane.at.x);
    }
  });

  it("sets the four tiles 100 px tall inside the upper lane, apart, each name's lines inside its tile", () => {
    expect(L.pieces).toHaveLength(4);
    for (const piece of L.pieces) {
      expect(piece.at.h).toBe(100);
      expect(inside(piece.at, L.upper.at), piece.key).toBe(true);
      expect(piece.label.lines.join(" ")).toBe(piece.label.text);
      expect(piece.label.lines.length).toBeLessThanOrEqual(2);
      const tall = piece.label.lines.length * TILE_LEADING;
      for (const line of piece.label.lines) {
        const words = { x: piece.label.at.x - tileWords(line) / 2, y: piece.label.at.y - tall / 2, w: tileWords(line), h: tall };
        expect(inside(words, piece.at), line).toBe(true);
      }
    }
    for (const [a, b] of pairs(L.pieces)) expect(apart(a.at, b.at, 40), `${a.key} ${b.key}`).toBe(true);
  });

  it("drops each arrow straight from its tile's foot to the lower lane's top edge, at least 80 px long", () => {
    for (const { arrow, at } of L.pieces) {
      expect(arrow.from.x).toBe(arrow.to.x);
      expect(arrow.from.y).toBeGreaterThanOrEqual(bottom(at));
      expect(arrow.to.y).toBeLessThanOrEqual(L.lower.at.y);
      expect(arrow.to.y - arrow.from.y).toBeGreaterThanOrEqual(80);
    }
  });

  it("carries cards 56 by 72 inside the lower lane at every place, where each enters, and clear of each other", () => {
    const [card] = L.cards;
    expect(card.at.w).toBe(56);
    expect(card.at.h).toBe(72);
    for (let p = 0; p < BELT.places; p++) expect(inside({ ...card.at, x: card.at.x + placeX(p) }, L.lower.at), String(p)).toBe(true);
    expect(inside({ ...card.at, x: card.at.x - ENTER }, L.lower.at)).toBe(true);
    for (let p = 1; p < BELT.places; p++) expect(placeX(p) - placeX(p - 1)).toBeGreaterThan(card.at.w + 60);
  });
});
