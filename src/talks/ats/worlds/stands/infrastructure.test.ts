/**
 * Slide 13 on its own: the fenced yard with its five tiles in reading order,
 * the round table with four chairs and four nameplates, and the caption
 * under it; no calendar of weeks and no dashed partner set apart; every
 * word inside its box with even room round it; nothing meeting; and the
 * click's order, fence first and the caption last.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { box, type Box, type Point } from "@/components/deck/kit";
import { pictureOf, shown } from "../../script/find";
import { at, bottom, endOf, inside, markup, overlaps, playOf, right, startOf, stepOf } from "./harness";
import { DRAW_FOOT, SAFE, contentTop } from "./layout";
import { INFRASTRUCTURE, PLATE, TILE_WORDS, measure, setWidth } from "./layout-infrastructure";
import { InfrastructureMarks } from "./scene-infrastructure";

const I = INFRASTRUCTURE;
const id = stepOf("infrastructure");
/** The words this slide's own marks set, one entry for each `<text>`. */
const slideTexts = [...renderToStaticMarkup(createElement(InfrastructureMarks)).matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(([, inner]) => inner.replace(/<[^>]+>/g, "").trim());

/** A run of words' em box: as wide as it is set, as tall as its size, about its point by its anchor. */
const em = (p: Point, text: string, size: number, strong: boolean, anchor: "start" | "middle" | "end"): Box => {
  const w = measure(text, size, strong);
  return box(anchor === "start" ? p.x : anchor === "end" ? p.x - w : p.x - w / 2, p.y - size / 2, w, size);
};
const tileWords = (tile: (typeof I.tiles)[number]) => [
  em(tile.name.at, tile.name.text, TILE_WORDS.nameSize, true, "middle"),
  ...(tile.caption ? [em(tile.caption.at, tile.caption.text, TILE_WORDS.captionSize, false, "middle")] : []),
];
/** A plate's words as Geist sets them, from the font's own advances (the deck check measures them on screen too). */
const plateWords = (plate: (typeof I.plates)[number]) => {
  const w = setWidth(plate.text, PLATE.size, true);
  return box(plate.at.x + plate.at.w / 2 - w / 2, plate.at.y + plate.at.h / 2 - PLATE.size / 2, w, PLATE.size);
};
const chairBox = (seat: (typeof I.table.seats)[number]) => box(seat.at.x - I.table.seat.w / 2, seat.at.y - I.table.seat.h / 2, I.table.seat.w, I.table.seat.h);
const tableBox = box(I.table.c.x - I.table.r, I.table.c.y - I.table.r, 2 * I.table.r, 2 * I.table.r);
const nameBox = em(I.name.at, I.name.text, 32, true, "start");
const captionBox = em(I.caption.at, I.caption.text, 26, false, "start");
const metBox = em(I.met.at, I.met.text, 32, false, "middle");

describe("slide 13's words, from the script", () => {
  it("names the yard, its five tiles, the four at the table and the caption, in the script's order", () => {
    expect(shown("infrastructure", "play")).toEqual([
      "Azure sandbox",
      "Isolated from other City systems",
      "AI already running",
      "Azure OpenAI and Azure AI Foundry",
      "Infrastructure as code",
      "Every change is recorded",
      "Secure container services",
      "Firewall",
      "Token monitoring",
      "Tracks how much AI is used",
      "City of Austin",
      "Microsoft",
      "Quisitive",
      "Information Security Office",
      "Met weekly for over two years",
    ]);
  });

  it("keeps every label to 60 characters", () => {
    for (const label of shown("infrastructure", "play")) expect(label.length, label).toBeLessThanOrEqual(60);
  });

  it("draws no calendar of weeks and no one set apart in dashes: Amazon is gone from the slide and its notes", () => {
    expect(markup).not.toMatch(/sn-week|infrastructure\.(calendar|weeks|every|amazon)/);
    expect(Object.keys(I)).not.toEqual(expect.arrayContaining(["calendar"]));
    expect(Object.keys(I)).not.toEqual(expect.arrayContaining(["joining"]));
    const slide = pictureOf("infrastructure");
    for (const text of [slide.show, slide.say, ...slide.see, ...slide.story]) expect(text).not.toMatch(/Amazon|calendar|Route to production|Permission to build/);
  });
});

describe("slide 13's layout", () => {
  it("lands five tiles in the yard in reading order: the running AI across the top, the four controls two by two under it", () => {
    expect(I.tiles.map((tile) => tile.name.text)).toEqual(["AI already running", "Infrastructure as code", "Secure container services", "Firewall", "Token monitoring"]);
    expect(I.tiles.map((tile) => tile.caption?.text ?? null)).toEqual(["Azure OpenAI and Azure AI Foundry", "Every change is recorded", null, null, "Tracks how much AI is used"]);
    const [top, a, b, c, d] = I.tiles.map((tile) => tile.at);
    expect([a.y, b.y]).toEqual([a.y, a.y]);
    expect([c.y, d.y]).toEqual([c.y, c.y]);
    expect(a.y).toBeGreaterThan(bottom(top));
    expect(c.y).toBeGreaterThan(bottom(a));
    expect([a.x, c.x]).toEqual([top.x, top.x]);
    expect([right(b), right(d)]).toEqual([right(top), right(top)]);
    expect(b.x).toBeGreaterThan(right(a));
  });

  it("holds every tile inside the fence, below its pickets, the tiles apart", () => {
    const yard = box(I.fence.at.x + 8, I.fence.at.y + 12, I.fence.at.w - 16, I.fence.at.h - 20);
    for (const tile of I.tiles) expect(inside(tile.at, yard), tile.key).toBe(true);
    for (const p of I.tiles) for (const q of I.tiles) if (p !== q) expect(overlaps(p.at, q.at), `${p.key} ${q.key}`).toBe(false);
  });

  it("sets each tile's words inside it with even room: at least the inset each side, the same above as below", () => {
    for (const tile of I.tiles) {
      const words = tileWords(tile);
      const block = { x: Math.min(...words.map((w) => w.x)), y: words[0].y, r: Math.max(...words.map(right)), b: bottom(words.at(-1)!) };
      const room = { left: block.x - tile.at.x, right: right(tile.at) - block.r, top: block.y - tile.at.y, foot: bottom(tile.at) - block.b };
      expect(room.left, tile.name.text).toBeGreaterThanOrEqual(TILE_WORDS.inset);
      expect(room.right, tile.name.text).toBeGreaterThanOrEqual(TILE_WORDS.inset);
      expect(Math.abs(room.left - room.right), tile.name.text).toBeLessThanOrEqual(1);
      expect(Math.min(room.top, room.foot), tile.name.text).toBeGreaterThanOrEqual(12);
      expect(Math.abs(room.top - room.foot), tile.name.text).toBeLessThanOrEqual(2);
      if (words.length > 1) expect(words[1].y - bottom(words[0]), tile.name.text).toBeGreaterThanOrEqual(4);
    }
  });

  it("seats four at the table, a nameplate at each chair, in the script's order: top, left, right, bottom", () => {
    expect(I.table.seats).toHaveLength(4);
    expect(I.plates.map((plate) => plate.text)).toEqual(["City of Austin", "Microsoft", "Quisitive", "Information Security Office"]);
    const [top, left, rightSeat, foot] = I.table.seats.map((seat) => seat.at);
    expect(top.y).toBeLessThan(I.table.c.y);
    expect(left.x).toBeLessThan(I.table.c.x);
    expect(rightSeat.x).toBeGreaterThan(I.table.c.x);
    expect(foot.y).toBeGreaterThan(I.table.c.y);
    for (const [i, plate] of I.plates.entries()) {
      const chair = chairBox(I.table.seats[plate.seat]);
      expect(plate.seat, plate.text).toBe(i);
      // Each plate is the nearest to its own chair, and 8 px clear of it.
      const gap = Math.max(chair.x - right(plate.at), plate.at.x - right(chair), chair.y - bottom(plate.at), plate.at.y - bottom(chair));
      expect(gap, plate.text).toBeGreaterThanOrEqual(8);
      expect(gap, plate.text).toBeLessThanOrEqual(12);
    }
  });

  it("sets each nameplate's words inside it with even room all round, at least its padding at the sides", () => {
    for (const plate of I.plates) {
      expect(plate.at.h, plate.text).toBe(PLATE.h);
      const words = plateWords(plate);
      expect(words.x - plate.at.x, plate.text).toBeGreaterThanOrEqual(PLATE.pad);
      expect(right(plate.at) - right(words), plate.text).toBeGreaterThanOrEqual(PLATE.pad);
      expect(Math.abs(words.x - plate.at.x - (right(plate.at) - right(words))), plate.text).toBeLessThanOrEqual(1);
      expect(words.y - plate.at.y, plate.text).toBeGreaterThanOrEqual(6);
      expect(Math.abs(words.y - plate.at.y - (bottom(plate.at) - bottom(words))), plate.text).toBeLessThanOrEqual(1);
    }
  });

  it("measures words no narrower than Geist sets them: the world's rough measure or the font's own advances, whichever is wider", () => {
    expect(measure("Azure sandbox", 32, true)).toBeGreaterThanOrEqual(243);
    expect(measure("Information Security Office", 26, true)).toBeGreaterThanOrEqual(394);
    expect(measure("Secure container services", 32, true)).toBeGreaterThanOrEqual(449);
  });

  it("keeps the yard, its words, the table, its chairs, the plates and the caption apart", () => {
    const parts: [string, Box][] = [
      ["name", nameBox],
      ["caption", captionBox],
      ["yard", I.fence.reach],
      ["table", tableBox],
      ...I.table.seats.map((seat, i): [string, Box] => [`chair ${i}`, chairBox(seat)]),
      ...I.plates.map((plate): [string, Box] => [plate.text, plate.at]),
      ["met", metBox],
    ];
    for (const [a, p] of parts) for (const [b, q] of parts) if (a !== b) expect(overlaps(p, q), `${a} / ${b}`).toBe(false);
    expect(right(captionBox)).toBeLessThanOrEqual(right(I.fence.at));
    expect(bottom(captionBox)).toBeLessThanOrEqual(I.fence.reach.y - 4);
    expect(bottom(nameBox)).toBeLessThanOrEqual(I.fence.reach.y - 4);
  });

  it("keeps the whole drawing under the story band and inside the safe area, the table's group to the right of the yard", () => {
    const all = [nameBox, captionBox, I.fence.reach, ...I.plates.map((plate) => plate.at), metBox, tableBox, ...I.table.seats.map(chairBox)];
    expect(Math.min(...all.map((b) => b.y))).toBeGreaterThanOrEqual(contentTop("infrastructure"));
    expect(Math.max(...all.map(bottom))).toBeLessThanOrEqual(DRAW_FOOT);
    expect(Math.min(...all.map((b) => b.x))).toBeGreaterThanOrEqual(SAFE.left);
    expect(Math.max(...all.map(right))).toBeLessThanOrEqual(SAFE.right);
    const group = [...I.plates.map((plate) => plate.at), metBox, tableBox];
    expect(Math.min(...group.map((b) => b.x)) - right(I.fence.at)).toBeGreaterThanOrEqual(48);
  });

  it("sets each label once in the slide's marks, and nothing else", () => {
    expect([...slideTexts].sort()).toEqual([...shown("infrastructure", "play")].sort());
  });
});

describe("slide 13's click", () => {
  const tiles = I.tiles.map((tile) => startOf(id, tile.key));
  const seats = I.table.seats.map((seat) => startOf(id, seat.key));
  const plates = I.plates.map((plate) => startOf(id, plate.key));

  it("draws the fence first, its name and caption with it, then lands the tiles one after another in reading order", () => {
    expect(startOf(id, I.name.key)).toBeGreaterThan(startOf(id, I.fence.key));
    expect(startOf(id, I.caption.key)).toBeGreaterThan(startOf(id, I.name.key));
    expect(tiles[0]).toBeGreaterThan(startOf(id, I.fence.key) + 0.6);
    for (let i = 1; i < tiles.length; i++) expect(tiles[i] - tiles[i - 1]).toBeGreaterThanOrEqual(0.4);
  });

  it("then draws the table once the tiles are in, the chairs and the people in them coming round it, and the plates landing in order", () => {
    const table = startOf(id, I.table.key);
    expect(table).toBeGreaterThan(Math.max(...I.tiles.map((tile) => endOf(id, tile.key))));
    for (const [i, seat] of I.table.seats.entries()) {
      expect(seats[i]).toBeGreaterThan(table);
      expect(startOf(id, seat.sitter)).toBeGreaterThan(seats[i]);
    }
    expect(plates[0]).toBeGreaterThan(Math.max(...I.table.seats.map((seat) => endOf(id, seat.sitter))) - 0.2);
    for (let i = 1; i < plates.length; i++) expect(plates[i] - plates[i - 1]).toBeGreaterThanOrEqual(0.25);
  });

  it("brings the caption up last, after every plate, and ends with everything still and in place", () => {
    const met = startOf(id, I.met.key);
    expect(met).toBeGreaterThan(Math.max(...I.plates.map((plate) => endOf(id, plate.key))));
    const end = at(id);
    expect(end[I.fence.key]["--d"]).toBe(1);
    expect(end[I.table.key]["--d"]).toBe(1);
    for (const key of [I.name.key, I.caption.key, ...I.tiles.map((tile) => tile.key), ...I.table.seats.flatMap((seat) => [seat.key, seat.sitter]), ...I.plates.map((plate) => plate.key), I.met.key]) expect(end[key].autoAlpha, key).toBe(1);
    for (const key of [...I.tiles.map((tile) => tile.key), ...I.plates.map((plate) => plate.key), I.met.key]) expect(end[key].y ?? 0, key).toBe(0);
    // Nothing loops: every part moves once in the click.
    for (const key of [I.fence.key, I.table.key, ...I.tiles.map((tile) => tile.key), ...I.plates.map((plate) => plate.key), I.met.key]) expect(playOf(id, key), key).toHaveLength(1);
  });
});
