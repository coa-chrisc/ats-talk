/**
 * Slide 6b, how rapid application development was born: where every part
 * goes, the id it takes and the words it holds, read from the script by
 * position. Four blocks in a row across the drawing's room: the module
 * library first, an outline in navy filled with small module tiles and
 * carrying its count, then the process's three blocks in green. Under all
 * four, a grey base the width of the row, named on its face. Round the
 * row and its base together, a green ring with round corners, and a small
 * green bubble, named, on the ring's top edge at its right corner.
 */
import { box, type Box } from "@/components/deck/kit";
import { KEY_LINE, LINE, labelsOf } from "./layout";

const [LIBRARY, COUNT, DEPLOY, BUILD, LIFECYCLE, BASE, NAMED] = labelsOf("rad-born");

/**
 * The ring: the drawing's full width, its top a little under the story
 * band's foot (552 under a two-line title) so the bubble on it clears the
 * band, and its foot well over the footer. Its corners are this round.
 */
const RING = box(96, 584, 1728, 402);
const RING_R = 24;
/** The room inside the ring: its sides and foot, and its top, deeper so the bubble standing on the top edge clears the row. */
const INSET = { side: 24, top: 42, foot: 28 };

/** The row: four blocks the width of the ring's inside, a gap between each. */
const ROW = { x: RING.x + INSET.side, w: RING.w - 2 * INSET.side };
const BLOCK = { y: RING.y + INSET.top, h: 244, gap: 48 };
const BLOCK_W = (ROW.w - 3 * BLOCK.gap) / 4;
const BLOCKS: Box[] = Array.from({ length: 4 }, (_, i) => box(ROW.x + i * (BLOCK_W + BLOCK.gap), BLOCK.y, BLOCK_W, BLOCK.h));
const [LIBRARY_AT, ...STEPS_AT] = BLOCKS;

/** Inside the library: its name at the top, a grid of module tiles under it, seven by three, and its count at the foot. */
const MODULE = { side: 24, pitch: 31, cols: 7, rows: 3 };
const GRID_W = MODULE.cols * MODULE.pitch - (MODULE.pitch - MODULE.side);
const GRID_H = MODULE.rows * MODULE.pitch - (MODULE.pitch - MODULE.side);
const GRID = box(LIBRARY_AT.x + (LIBRARY_AT.w - GRID_W) / 2, LIBRARY_AT.y + 72, GRID_W, GRID_H);
const NAME = box(LIBRARY_AT.x + 20, LIBRARY_AT.y + 22, LIBRARY_AT.w - 40, LINE);
const COUNT_AT = box(LIBRARY_AT.x + 20, LIBRARY_AT.y + LIBRARY_AT.h - 16 - KEY_LINE, LIBRARY_AT.w - 40, KEY_LINE);

/** The base: under the row, a clear gap between them, as wide as the row, and the ring's foot the inset under it. */
const BASE_AT = box(ROW.x, BLOCK.y + BLOCK.h + 16, ROW.w, RING.y + RING.h - INSET.foot - (BLOCK.y + BLOCK.h + 16));

/** The bubble: a short pill centred on the ring's top edge, its right end clear of the corner's curve. */
const BUBBLE = { w: 128, h: 52 };
const BUBBLE_AT = box(RING.x + RING.w - RING_R - 16 - BUBBLE.w, RING.y - BUBBLE.h / 2, BUBBLE.w, BUBBLE.h);
/** The ring's line starts under the bubble and runs clockwise, so it closes where the bubble comes up. */
const START_X = BUBBLE_AT.x + BUBBLE.w / 2;

const RING_D = (() => {
  const { x, y, w, h } = RING;
  const r = RING_R;
  const arc = (ex: number, ey: number) => `A${r} ${r} 0 0 1 ${ex} ${ey}`;
  return `M${START_X} ${y}H${x + w - r}${arc(x + w, y + r)}V${y + h - r}${arc(x + w - r, y + h)}H${x + r}${arc(x, y + h - r)}V${y + r}${arc(x + r, y)}H${START_X}`;
})();

/** How far a block falls as it lands. */
const DROP = -32;
/** How small the bubble is as it starts to come up. */
const BUBBLE_FROM = 0.4;

export const RAD_BORN = {
  library: {
    key: "radBorn.library",
    at: LIBRARY_AT,
    name: { key: "radBorn.library.name", text: LIBRARY, at: NAME },
    /** The module tiles, row by row from the top, drawn in the marks with the outline, which lands with them. */
    modules: {
      at: GRID,
      tiles: Array.from({ length: MODULE.cols * MODULE.rows }, (_, i) => box(GRID.x + (i % MODULE.cols) * MODULE.pitch, GRID.y + Math.floor(i / MODULE.cols) * MODULE.pitch, MODULE.side, MODULE.side)),
    },
    count: { key: "radBorn.count", text: COUNT, at: COUNT_AT, drop: -24 },
  },
  steps: [DEPLOY, BUILD, LIFECYCLE].map((text, i) => ({ key: `radBorn.step.${i}`, text, at: STEPS_AT[i] })),
  base: { key: "radBorn.base", text: BASE, at: BASE_AT },
  ring: { key: "radBorn.ring", at: RING, d: RING_D },
  bubble: { key: "radBorn.bubble", text: NAMED, at: BUBBLE_AT, from: BUBBLE_FROM },
  drop: DROP,
};

/** Everything slide 6b draws, for the layout test: each block where it lands and where it falls from, the ring and its bubble. */
export const RAD_BORN_DRAWN: Record<string, Box[]> = {
  "rad-born": [...BLOCKS.flatMap((at) => [at, { ...at, y: at.y + DROP }]), NAME, GRID, COUNT_AT, { ...COUNT_AT, y: COUNT_AT.y + RAD_BORN.library.count.drop }, BASE_AT, RING, BUBBLE_AT],
};
