/**
 * The click of slide 4, one chain (beats.ts): the desk draws across and
 * the lamp draws at its left end, named; the lamp switches on and its
 * light falls along the desk, with line A; the four tiles come up on the
 * desk one at a time, each year with its first tile and each later name
 * with its tile, line B with the second year; the tag drops under the row,
 * and the slide ends on the lit row.
 */
import { EASE, draw, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { START } from "./layout-start";

const { desk, legs, lamp, light, tiles, years, names, zero } = START;

/** When each tile comes up, from the first: a pair, a breath, then the next pair. */
const TILE_AT = [0, 0.6, 1.3, 1.9];

export const startingSmall = picture("starting-small", {
  play: play(
    into("starting-small"),
    {
      // The desk draws across, its legs under it, and the lamp at its left end, named.
      with: true,
      hold: 0.5,
      moves: [draw(desk.key, { at: 0, duration: 0.9 }), draw(legs.key, { at: 0.4, duration: 0.5 }), draw(lamp.key, { at: 0.3 }), rise(lamp.label.key, { at: 0.8 })],
    },
    // The lamp switches on.
    { hold: 0.3, moves: [show(light.key, { at: 0, duration: 0.4 })] },
    { with: true, hold: 0.2, moves: [story("starting-small", 0)] },
    {
      // The tiles, one at a time: each year comes with the first tile over it, each name with its tile.
      hold: 0.3,
      moves: [
        ...tiles.map((tile, i) => rise(tile.key, { at: TILE_AT[i] })),
        rise(years[0].key, { at: TILE_AT[0] + 0.1 }),
        rise(years[1].key, { at: TILE_AT[2] + 0.1 }),
        rise(names[0].key, { at: TILE_AT[2] + 0.2 }),
        rise(names[1].key, { at: TILE_AT[3] + 0.2 }),
      ],
    },
    { with: true, hold: TILE_AT[2] + 0.1, moves: [story("starting-small", 1)] },
    // Under the row, the tag drops.
    { hold: 0.3, moves: [to(zero.key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: zero.drop }, { at: 0, duration: 0.6, ease: EASE.out })] },
  ),
});
