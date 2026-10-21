/**
 * Slide 28's click: the slide before goes and the title changes. The four
 * panels draw left to right, each one's numeral and name coming up as its
 * edge closes. Then, one panel at a time from the left, a green line draws
 * down from its foot, its tile lands on the line's end, and the passed tick
 * lands on the panel's top right corner; line A comes in with the first
 * panel's tile, line B with the third's. The slide ends on the last tick.
 */
import { draw, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, land, play } from "./beats";
import { APPLIED } from "./layout-applied";

const A = APPLIED;

/** The panels draw one after another; each one's numeral and name come up as its edge nears closing. */
const PANELS = { apart: 0, draw: 0.5, numeral: 0, name: 0 } as const;
/** A panel's tile: its line draws down, the tile lands where the line ends, the tick lands after it; the next panel starts `apart` after. */
export const TILES = { line: 0.45, tile: 0.35, land: 0.5, tick: 0.85, apart: 1.25 } as const;

export const applied = picture("applied", {
  play: play(
    into("applied"),
    // The four panels, left to right, each numbered and named.
    {
      with: true,
      hold: 0.45,
      moves: A.panels.flatMap((panel, i) => [
        ...draw(panel.key, { at: i * PANELS.apart, duration: PANELS.draw }),
        ...rise(panel.numeral.key, { at: i * PANELS.apart + PANELS.numeral }),
        ...rise(panel.name.key, { at: i * PANELS.apart + PANELS.name }),
      ]),
    },
    // Under each panel in turn: its line, its tile, and its tick.
    {
      hold: 0.4,
      moves: A.panels.flatMap((panel, i) => {
        const t = i * TILES.apart;
        return [
          ...draw(panel.line.key, { at: t, duration: TILES.line }),
          ...land(panel.tile.key, t + TILES.tile, TILES.land),
          ...show(panel.tick.key, { at: t + TILES.tick, duration: 0.4 }),
        ];
      }),
    },
    { with: true, hold: TILES.tile, moves: [story("applied", 0)] },
    { with: true, hold: 2 * TILES.apart, moves: [story("applied", 1)] },
  ),
});
