/**
 * Where the built world's drawings sit: every slide's drawing under its
 * story band and clear of the frame's chrome, and the parts that must not
 * meet kept apart. The words and the moves are in world.test.ts.
 */
import { describe, expect, it } from "vitest";
import { STORY, storyRows, type Box } from "@/components/deck/kit";
import { CONTENT_GAP, PICTURES, SAFE, SAFE_BOTTOM, STORIES, contentTop } from "./layout";
import { BUILDS_DRAWN, SETUP } from "./layout-builds";
import { PORTFOLIO, PROOF_DRAWN, RECOGNITION, SEEN } from "./layout-proof";
import { RAD_BORN, RAD_BORN_DRAWN } from "./layout-rad-born";
import { RAD_EVOLVES, RAD_EVOLVES_DRAWN } from "./layout-rad-evolves";
import { SAFE_APART, SAFE_DRAWN } from "./layout-safe";
import { START, START_DRAWN } from "./layout-start";
import { TOO_LONG, TOO_LONG_DRAWN } from "./layout-too-long";
import { OPENING_DRAWN, TURN_DRAWN, TWENTY_STEPS, WRONG, reuseAt } from "./layout-turn";
import { WEEKLY, WEEKLY_DRAWN } from "./layout-weekly";
import { inside, overlaps } from "./harness";

const DRAWN: Record<string, Box[]> = { ...START_DRAWN, ...TURN_DRAWN, ...SAFE_DRAWN, ...WEEKLY_DRAWN, ...BUILDS_DRAWN, ...TOO_LONG_DRAWN, ...PROOF_DRAWN, ...RAD_BORN_DRAWN, ...RAD_EVOLVES_DRAWN };

/** Clear of the frame's chrome: under the logo, over the footer and the slide number (with a margin), inside the story band's width. */
const CHROME = { top: 64, bottom: SAFE_BOTTOM, left: SAFE.left, right: SAFE.right };

const bounds = (boxes: readonly Box[]): Box => {
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  return { x, y, w: Math.max(...boxes.map((b) => b.x + b.w)) - x, h: Math.max(...boxes.map((b) => b.y + b.h)) - y };
};
/** The pairs in a list that meet, by their places in it: none, when all are kept apart. */
const clashes = (boxes: readonly Box[]) => boxes.flatMap((a, i) => boxes.slice(i + 1).flatMap((b, j) => (overlaps(a, b) ? [[i, i + 1 + j]] : [])));

describe("the built world's layout", () => {
  it("knows what every slide draws", () => {
    expect(Object.keys(DRAWN).sort()).toEqual(PICTURES.map((picture) => picture.id).sort());
  });

  it("keeps every slide's drawing clear of the footer, the slide number and the stage's edges", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      const all = bounds(boxes);
      expect(all.y, pictureId).toBeGreaterThanOrEqual(CHROME.top);
      expect(all.y + all.h, pictureId).toBeLessThanOrEqual(CHROME.bottom);
      expect(all.x, pictureId).toBeGreaterThanOrEqual(CHROME.left);
      expect(all.x + all.w, pictureId).toBeLessThanOrEqual(CHROME.right);
    }
  });

  it("starts every slide's drawing a clear gap under its story band's last row", () => {
    for (const band of STORIES) {
      const rows = storyRows(band.band, band.lines.flat().length);
      const foot = rows[rows.length - 1].y + STORY.pitch;
      expect(contentTop(band.picture), band.picture).toBeGreaterThanOrEqual(foot + CONTENT_GAP);
      expect(bounds(DRAWN[band.picture]).y, band.picture).toBeGreaterThanOrEqual(contentTop(band.picture));
    }
  });

  it("slide 4: stands every tile on the desk inside the lamp's light, the names over them in it too, and the words apart", () => {
    const [top, reach] = START.light.at;
    /** The light's upper edge at a point across the stage. */
    const edge = (x: number) => top.y + ((reach.y - top.y) * (x - top.x)) / (reach.x - top.x);
    const tiles = START.tiles.map((tile) => tile.at);
    const desk = Math.max(...tiles.map((tile) => tile.y + tile.h));
    for (const tile of START.tiles) {
      expect(tile.at.y + tile.at.h, tile.key).toBe(desk);
      for (const x of [tile.at.x, tile.at.x + tile.at.w]) expect(edge(x), tile.key).toBeLessThanOrEqual(tile.at.y - 12);
      expect(tile.at.x + tile.at.w, tile.key).toBeLessThanOrEqual(reach.x);
    }
    for (const name of START.names) for (const x of [name.at.x, name.at.x + name.at.w]) expect(edge(x), name.key).toBeLessThanOrEqual(name.at.y - 4);
    expect(clashes([...tiles, ...START.names.map((name) => name.at)])).toEqual([]);
    expect(clashes([START.lamp.label.at, ...START.years.map((year) => year.at), START.zero.at])).toEqual([]);
    for (const year of START.years) expect(year.at.y, year.key).toBeGreaterThan(desk);
    START.names.forEach((name, i) => {
      const tile = tiles[2 + i];
      expect(name.at.x + name.at.w / 2, name.key).toBe(tile.x + tile.w / 2);
      expect(name.at.y + name.at.h, name.key).toBeLessThanOrEqual(tile.y - 12);
    });
  });

  it("slide 6: brings the named idea in level with the way across, from the left edge to just short of the loop's first place, clear of the old question wherever it is", () => {
    const { idea, good, ask } = WRONG;
    expect(idea.at.y + idea.at.h / 2).toBe(good.at.y + good.at.h / 2);
    expect(idea.at.x + idea.at.w).toBeLessThanOrEqual(good.at.x - 16);
    expect(idea.at.x + idea.from).toBe(SAFE.left);
    const sweep = { x: idea.at.x + idea.from, y: idea.at.y, w: idea.at.w - idea.from, h: idea.at.h };
    for (const card of [ask.at, { ...ask.at, x: ask.at.x + ask.aside.x, y: ask.at.y + ask.aside.y }]) expect(overlaps(sweep, card)).toBe(false);
  });

  it("slide 6: keeps the opening's wall and strands clear of the frame wherever they are, each strand sticking inside the wall and thrown from its left", () => {
    const all = bounds(OPENING_DRAWN);
    expect(all.y).toBeGreaterThanOrEqual(CHROME.top);
    expect(all.y + all.h).toBeLessThanOrEqual(CHROME.bottom);
    expect(all.x).toBeGreaterThanOrEqual(CHROME.left);
    expect(all.x + all.w).toBeLessThanOrEqual(CHROME.right);
    const { wall, strands } = WRONG.opening;
    const room = { x: wall.at.x + 24, y: wall.at.y + 24, w: wall.at.w - 48, h: wall.at.h - 48 };
    for (const strand of strands) {
      expect(inside(strand.at, room), strand.key).toBe(true);
      expect(strand.at.x + strand.from.x + strand.at.w, strand.key).toBeLessThan(wall.at.x);
    }
  });

  it("slide 6a: sets each count on its own step and each year under it, and the line's figures clear of the stair", () => {
    for (const step of TWENTY_STEPS.steps) {
      expect(step.count.at.y + step.count.at.h, step.key).toBeLessThanOrEqual(step.at.y);
      expect(step.year.at.y, step.key).toBeGreaterThanOrEqual(step.at.y + step.at.h);
      for (const other of TWENTY_STEPS.steps) expect(overlaps(step.count.at, other.at), `${step.count.key} on ${other.key}`).toBe(false);
    }
    for (const label of [TWENTY_STEPS.code, TWENTY_STEPS.low, TWENTY_STEPS.high, TWENTY_STEPS.estimate]) {
      for (const step of TWENTY_STEPS.steps) expect(overlaps(label.at, step.at), `${label.key} on ${step.key}`).toBe(false);
    }
  });

  it("slide 6a: runs the line of code reused from low at the left edge, before the first step, over every step's top row and under every count", () => {
    for (const step of TWENTY_STEPS.steps) {
      const count = step.count.at;
      for (let x = step.at.x; x <= step.at.x + step.at.w; x += 2) {
        expect(reuseAt(x), `${step.key} at ${x}`).toBeLessThanOrEqual(step.at.y - 12);
        expect(reuseAt(x), `${step.count.key} at ${x}`).toBeGreaterThanOrEqual(count.y + count.h + 12);
      }
    }
    const { start } = TWENTY_STEPS.line;
    const { code, low } = TWENTY_STEPS;
    const [first] = TWENTY_STEPS.steps;
    expect(start.at.x).toBeLessThan(first.at.x);
    expect(start.at.x).toBeLessThan(SAFE.left + 100);
    expect(start.at.y).toBeGreaterThan(first.at.y + first.at.h - 24);
    for (const label of [code, low]) {
      for (let x = label.at.x; x <= label.at.x + 240; x += 4) expect(reuseAt(x) - 8, `${label.key} at ${x}`).toBeGreaterThanOrEqual(label.at.y + label.at.h);
    }
  });

  it("slides 5 and 12a: keeps the three names apart, and every ring's tab apart from the others", () => {
    expect(clashes(SAFE_APART.figureLabels)).toEqual([]);
    expect(clashes(SAFE_APART.tabs)).toEqual([]);
  });

  it("slide 5a: stands the figure on the floor and then on each step, short of the door", () => {
    const { figure, steps, door } = WEEKLY;
    const feet = figure.at.y + figure.at.h;
    figure.hops.forEach((hop, s) => {
      const step = steps[s].at;
      const x = figure.at.x + hop.x;
      expect(feet + hop.y, `hop ${s}`).toBe(step.y);
      expect(x, `hop ${s}`).toBeGreaterThanOrEqual(step.x);
      expect(x + figure.at.w, `hop ${s}`).toBeLessThanOrEqual(Math.min(step.x + step.w, door.at.x));
    });
    expect(door.at.y + door.at.h).toBe(steps[2].at.y);
  });

  it("slide 5a: sets the tag beside the shut door, clear of the figure wherever it stands", () => {
    const { figure, door } = WEEKLY;
    const tag = door.demand.at;
    expect(tag.x + tag.w).toBe(door.at.x - 16);
    expect(tag.y).toBeGreaterThanOrEqual(door.at.y);
    expect(tag.y + tag.h).toBeLessThanOrEqual(door.at.y + door.at.h);
    for (const hop of [{ x: 0, y: 0 }, ...figure.hops]) expect(overlaps(tag, { ...figure.at, x: figure.at.x + hop.x, y: figure.at.y + hop.y })).toBe(false);
  });

  it("slide 8: keeps the leads' name, the folders and the board apart, and the three marks' names apart under the piece", () => {
    const boxes = [SETUP.leadsLabel.at, ...SETUP.folders.map((folder) => folder.at), SETUP.board.frame.at];
    expect(clashes(boxes)).toEqual([]);
    expect(clashes(SETUP.marks.map((mark) => mark.label.at))).toEqual([]);
    for (const mark of SETUP.marks) expect(mark.label.at.y, mark.key).toBeGreaterThan(SETUP.piece.at.y + SETUP.piece.at.h);
  });

  it("slide 9: names the first and last days inside them, stands the people on the strip, and keeps every word and the tile apart", () => {
    const { days, dayNames, team, meets, holds, app, loops, pilot, failed } = TOO_LONG;
    expect(inside(dayNames[0].at, days[0].at)).toBe(true);
    expect(inside(dayNames[1].at, days[4].at)).toBe(true);
    const strip = days[0].at.y;
    for (const figure of [...team, meets, holds]) expect(figure.at.y + figure.at.h, figure.key).toBe(strip);
    for (const figure of [...team, meets]) expect(inside(figure.at, { ...days[0].at, y: 0, h: strip }), figure.key).toBe(true);
    expect(inside(holds.at, { ...days[4].at, y: 0, h: strip })).toBe(true);
    const words = [meets.label.at, app.label.at, ...loops.map((entry) => entry.label.at), pilot.at, failed.at, ...days.map((day) => day.at)];
    expect(clashes(words)).toEqual([]);
    expect(app.label.at.y + app.label.at.h).toBeLessThanOrEqual(holds.at.y - 12);
    // The stakeholder's name beside them, to the right of the table and the figure, level with the figure.
    expect(meets.label.at.x).toBeGreaterThan(meets.at.x + meets.at.w);
    expect(meets.label.at.y).toBeGreaterThanOrEqual(meets.at.y);
    expect(meets.label.at.y + meets.label.at.h).toBeLessThanOrEqual(strip);
    expect(failed.at.y).toBeGreaterThanOrEqual(strip + days[0].at.h + 24);
    expect(Math.min(...loops.map((entry) => entry.label.at.x))).toBeGreaterThan(days[4].at.x + days[4].at.w);
    expect(pilot.at.x + pilot.at.w).toBeLessThanOrEqual(SAFE.right);
  });

  it("slides 10 and 12: keeps the tiles apart and the plaques apart", () => {
    expect(clashes(PORTFOLIO.tiles.map((tile) => tile.at))).toEqual([]);
    expect(clashes(RECOGNITION.plaques.map((plaque) => plaque.at))).toEqual([]);
  });

  it("slide 11: keeps every name, tag and dot apart, and the middle's name inside its circle", () => {
    const named = SEEN.named.flatMap((dot) => [dot.name.at, { x: dot.at.x - 10, y: dot.at.y - 10, w: 20, h: 20 }]);
    const words = [...named, ...SEEN.askedBack.map((tag) => tag.at), SEEN.departments.label.at, SEEN.practitioners.label.at];
    expect(clashes(words)).toEqual([]);
    const { centre } = SEEN;
    const circle = { x: centre.at.x - centre.r, y: centre.at.y - centre.r, w: 2 * centre.r, h: 2 * centre.r };
    expect(inside(centre.label.at, circle)).toBe(true);
  });

  it("slide 11: keeps every department's dot clear of the lines out to the named groups and the practitioner group", () => {
    /** A line's two ends, from its path "Mx yLx y". */
    const ends = (d: string) => {
      const [x1, y1, x2, y2] = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
      return { x1, y1, x2, y2 };
    };
    /** How far a point is from a line between two ends. */
    const apart = (p: { x: number; y: number }, { x1, y1, x2, y2 }: ReturnType<typeof ends>) => {
      const t = Math.max(0, Math.min(1, ((p.x - x1) * (x2 - x1) + (p.y - y1) * (y2 - y1)) / ((x2 - x1) ** 2 + (y2 - y1) ** 2)));
      return Math.hypot(p.x - (x1 + t * (x2 - x1)), p.y - (y1 + t * (y2 - y1)));
    };
    const lines = [...SEEN.named.map((dot) => dot.spoke), SEEN.practitioners.spoke];
    for (const dot of SEEN.departments.at) {
      for (const line of lines) expect(apart(dot, ends(line.d)), `${dot.x} ${dot.y} by ${line.key}`).toBeGreaterThanOrEqual(16);
    }
  });

  it("slide 6b: stands the four blocks in a row apart on the base, the library's name, tiles and count inside it and apart", () => {
    const { library, steps, base } = RAD_BORN;
    const blocks = [library.at, ...steps.map((block) => block.at)];
    expect(clashes(blocks)).toEqual([]);
    for (const block of blocks) {
      expect(block.y, "same row").toBe(library.at.y);
      expect(inside({ ...block, y: base.at.y, h: base.at.h }, base.at), "base under every block").toBe(true);
      expect(base.at.y, "base clear under the row").toBeGreaterThanOrEqual(block.y + block.h + 8);
    }
    const parts = [library.name.at, library.modules.at, library.count.at];
    for (const part of parts) expect(inside(part, library.at)).toBe(true);
    expect(clashes(parts)).toEqual([]);
    for (const tile of library.modules.tiles) expect(inside(tile, library.modules.at)).toBe(true);
  });

  it("slide 6b: rings the row and its base with room inside, and sets the bubble on the ring's top edge at its right corner, clear of the row", () => {
    const { library, steps, base, ring, bubble } = RAD_BORN;
    const blocks = [library.at, ...steps.map((block) => block.at)];
    const room = { x: ring.at.x + 16, y: ring.at.y + 16, w: ring.at.w - 32, h: ring.at.h - 32 };
    for (const part of [...blocks, base.at]) expect(inside(part, room)).toBe(true);
    expect(bubble.at.y).toBeLessThan(ring.at.y);
    expect(bubble.at.y + bubble.at.h).toBeGreaterThan(ring.at.y);
    expect(bubble.at.y + bubble.at.h / 2).toBe(ring.at.y);
    expect(bubble.at.x).toBeGreaterThan(ring.at.x + ring.at.w / 2);
    expect(bubble.at.x + bubble.at.w).toBeLessThanOrEqual(ring.at.x + ring.at.w - 24);
    for (const block of blocks) expect(bubble.at.y + bubble.at.h, "bubble clear over the row").toBeLessThanOrEqual(block.y - 12);
    expect(ring.at.y + ring.at.h + 2, "the ring and its line clear of the footer").toBeLessThanOrEqual(SAFE_BOTTOM);
  });

  it("slide 9a: keeps the tile inside the small circle where it starts and inside the ring where it ends, and every name, smaller line and dot apart and off the circles' insides", () => {
    const { home, ring, tile, nodes } = RAD_EVOLVES;
    /** Whether every corner of a box lies within a circle. */
    const within = (b: Box, c: { x: number; y: number }, r: number) =>
      [
        [b.x, b.y],
        [b.x + b.w, b.y],
        [b.x, b.y + b.h],
        [b.x + b.w, b.y + b.h],
      ].every(([x, y]) => Math.hypot(x - c.x, y - c.y) <= r);
    expect(within(tile.at, ring.c, ring.r)).toBe(true);
    expect(within({ ...tile.at, x: tile.at.x + tile.from }, home.c, home.r)).toBe(true);
    const words = [home.label.at, ring.label.at, ...nodes.flatMap((node) => [node.name.at, ...(node.sub ? [node.sub.at] : [])])];
    const dots = nodes.map((node) => ({ x: node.at.x - node.r, y: node.at.y - node.r, w: 2 * node.r, h: 2 * node.r }));
    expect(clashes([...words, ...dots])).toEqual([]);
    /** The band the tile sweeps on its way along the arrow. */
    const path = { x: tile.at.x + tile.from, y: tile.at.y, w: tile.at.w - tile.from, h: tile.at.h };
    for (const part of [...words, ...dots]) expect(overlaps(part, path), `${part.x} ${part.y} on the tile's path`).toBe(false);
    for (const node of nodes) {
      for (const part of [node.name.at, ...(node.sub ? [node.sub.at] : [])]) expect(within(part, ring.c, ring.r), part === node.name.at ? node.name.key : node.key).toBe(false);
    }
  });
});
