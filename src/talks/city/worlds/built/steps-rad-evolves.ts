/**
 * The click of slide 9a, one chain (beats.ts): the small circle draws at
 * the left, named, and the tile comes up inside it; the larger ring draws
 * to the right, named; the arrow draws between them and the tile travels
 * along it into the ring's middle, with line A; then the five nodes settle
 * on the ring one at a time, clockwise, each named as it lands and the last
 * two with their smaller lines, with line B. The slide ends on the tile in
 * the ring with the nodes round it.
 */
import { DUR, EASE, draw, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { RAD_EVOLVES } from "./layout-rad-evolves";

const { home, ring, tile, arrow, nodes } = RAD_EVOLVES;

/** The tile starts along the line once the arrow is part drawn, and travels over this long. */
const TRAVEL_AT = 0.35;
const TRAVEL = 1.6;
/** A node settles this often, over this long; its name comes up as it lands, and its smaller line just after. */
const NODE_APART = 0.55;
const SETTLE = 0.6;
const NAME_AFTER = 0.25;
const SUB_AFTER = 0.4;

export const radEvolves = picture("rad-evolves", {
  play: play(
    into("rad-evolves"),
    {
      // the small circle draws from its top, named, and the tile comes up inside it.
      with: true,
      hold: 0.5,
      moves: [draw(home.key, { at: 0, duration: 0.8 }), rise(home.label.key, { at: 0.3 }), to(tile.key, { autoAlpha: 1 }, { autoAlpha: 0 }, { at: 0.6, duration: DUR.quick })],
    },
    // the larger ring draws to the right, named.
    { hold: 0.3, moves: [draw(ring.key, { at: 0, duration: 0.9 }), rise(ring.label.key, { at: 0.4 })] },
    {
      // the arrow draws between them, and the tile travels along it into the ring's middle.
      hold: 0.3,
      moves: [draw(arrow.key, { at: 0, duration: 0.7 }), to(tile.key, { x: 0 }, { x: tile.from }, { at: TRAVEL_AT, duration: TRAVEL, ease: EASE.page })],
    },
    { with: true, hold: TRAVEL_AT, moves: [story("rad-evolves", 0)] },
    {
      // the five nodes settle on the ring one at a time, clockwise from its upper left, each named as it lands.
      hold: 0.3,
      moves: nodes.flatMap((node, i) => [
        to(node.key, { autoAlpha: 1, x: 0, y: 0 }, { autoAlpha: 0, x: node.from.x, y: node.from.y }, { at: i * NODE_APART, duration: SETTLE, ease: EASE.out }),
        show(node.name.key, { at: i * NODE_APART + NAME_AFTER }),
        ...(node.sub ? [show(node.sub.key, { at: i * NODE_APART + SUB_AFTER })] : []),
      ]),
    },
    { with: true, hold: 0.6, moves: [story("rad-evolves", 1)] },
  ),
});
