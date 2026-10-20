/**
 * Slide 9a, the process grows into One ATS: the small circle draws with the
 * tile inside it, the larger ring draws, the arrow draws between them and
 * the tile travels along it into the ring, with line A; then the five nodes
 * settle on the ring one at a time, each named, with line B.
 */
import { describe, expect, it } from "vitest";
import { CHAIN, storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { RAD_EVOLVES } from "./layout-rad-evolves";
import { at, clickOf, elements, endOf, lastOf, n, playOf, startOf, tagOf, world } from "./harness";

const CLICK = clickOf("rad-evolves");
const { home, ring, tile, arrow, nodes } = RAD_EVOLVES;
const [lineA, lineB] = storyKeys(storyId("rad-evolves"), 2);
/** The tile's travel, its one move along x. */
const travel = () => playOf(CLICK, tile.key).find((play) => "x" in play.on)!;

describe("slide 9a, the process grows into One ATS", () => {
  it("draws both circles and the arrow by their strokes, and gives every node and word its own part", () => {
    for (const key of [home.key, ring.key]) expect(tagOf(key), key).toContain("dk-draw");
    for (const key of [home.key, ring.key, arrow.key, tile.key, home.label.key, ring.label.key, ...nodes.flatMap((node) => [node.key, node.name.key, ...(node.sub ? [node.sub.key] : [])])]) {
      expect(elements(key), key).toBeGreaterThanOrEqual(1);
    }
    expect(nodes.filter((node) => node.sub)).toHaveLength(2);
  });

  it("draws the small circle with the tile coming up inside it, then the larger ring, each named after its line starts", () => {
    expect(startOf(CLICK, tile.key)).toBeGreaterThan(startOf(CLICK, home.key));
    expect(startOf(CLICK, home.label.key)).toBeGreaterThan(startOf(CLICK, home.key));
    expect(startOf(CLICK, ring.key)).toBeGreaterThanOrEqual(endOf(CLICK, home.key));
    expect(startOf(CLICK, ring.label.key)).toBeGreaterThan(startOf(CLICK, ring.key));
  });

  it("moves the tile from the small circle's middle to the ring's along the arrow once it starts to draw, with line A", () => {
    const move = travel();
    expect(world.states[n(CLICK)][tile.key]).toMatchObject({ autoAlpha: 0, x: tile.from });
    expect(move.on).toMatchObject({ x: 0 });
    expect(tile.at.x + tile.at.w / 2).toBe(ring.c.x);
    expect(tile.at.x + tile.from + tile.at.w / 2).toBe(home.c.x);
    expect(tile.at.y + tile.at.h / 2).toBe(ring.c.y);
    expect(home.c.y).toBe(ring.c.y);
    expect(move.at).toBeGreaterThan(startOf(CLICK, arrow.key));
    expect(startOf(CLICK, arrow.key)).toBeGreaterThanOrEqual(endOf(CLICK, ring.key));
    expect(startOf(CLICK, lineA)).toBeGreaterThanOrEqual(move.at);
    expect(startOf(CLICK, lineA)).toBeLessThan(move.at + move.duration);
  });

  it("settles the five nodes on the ring one at a time after the tile arrives, each named as it lands, with line B, inside the click's 12 s", () => {
    const move = travel();
    expect(startOf(CLICK, nodes[0].key)).toBeGreaterThanOrEqual(move.at + move.duration);
    nodes.slice(1).forEach((node, i) => expect(startOf(CLICK, node.key), node.key).toBeGreaterThan(startOf(CLICK, nodes[i].key)));
    for (const node of nodes) {
      expect(Math.hypot(node.at.x - ring.c.x, node.at.y - ring.c.y), node.key).toBeCloseTo(ring.r, 0);
      expect(startOf(CLICK, node.name.key), node.name.key).toBeGreaterThan(startOf(CLICK, node.key));
      if (node.sub) expect(startOf(CLICK, node.sub.key), node.sub.key).toBeGreaterThan(startOf(CLICK, node.name.key));
    }
    expect(startOf(CLICK, lineB)).toBeGreaterThan(startOf(CLICK, nodes[0].key));
    expect(lastOf(CLICK)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("ends on the tile in the ring's middle with the five nodes round it, and the small circle it came from still drawn", () => {
    const end = at(CLICK);
    for (const key of [home.key, ring.key, arrow.key]) expect(end[key]["--d"], key).toBe(1);
    expect(end[tile.key]).toMatchObject({ autoAlpha: 1, x: 0 });
    for (const node of nodes) {
      expect(end[node.key], node.key).toMatchObject({ autoAlpha: 1, x: 0, y: 0 });
      expect(end[node.name.key], node.name.key).toMatchObject({ autoAlpha: 1 });
      if (node.sub) expect(end[node.sub.key], node.sub.key).toMatchObject({ autoAlpha: 1 });
    }
  });
});
