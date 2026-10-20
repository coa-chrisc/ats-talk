/**
 * Slide 2's places: four indigo tiles in a row across the drawing width,
 * each named inside; a caption centred under
 * the row; a green workbench under each tile, drawn as one outline; and
 * one caption centred under the four benches. Words are read from the
 * script, by position.
 */
import { STAGE, box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { SAFE, contentTop, layerOf } from "./layout";

const LABELS = shown("course", "play");
const NAMES = LABELS.slice(0, 4);
const [COLLEGE, BUILD] = LABELS.slice(4);

/** The drawing's top: under a two-line title and two story lines. */
export const TOP = contentTop("course");

/**
 * A tile: on the same four columns as slide 2a's panels, 396 wide with 48
 * between, so the row spans 96 to 1824; 168 tall. Its name starts 42 px
 * down in a 340 px column at 32 px semibold on 42 px lines, two lines at
 * most (the longest name runs about 440 px, measured in Geist SemiBold),
 * so a two-line name's foot is 42 px over the tile's, as far as its top
 * is under the tile's.
 */
export const TILE = { w: 396, gap: 48, h: 168, inset: 28, nameDown: 42, nameW: 340, nameLine: 42, nameLines: 2 } as const;
const tileAt = (i: number): Box => box(SAFE.left + 16 + i * (TILE.w + TILE.gap), TOP, TILE.w, TILE.h);

/** A caption's middle sits this far under what it captions, on the text size's 45 px line. */
const CAPTION_DOWN = 44;
/** The college's caption, centred on the stage under the row. */
const COLLEGE_Y = TOP + TILE.h + CAPTION_DOWN;

/**
 * A workbench under each tile, 92 px under the row so the college's
 * caption sits between, about 20 px clear of each: a slab 300 wide and
 * 12 deep centred under the tile, two legs 24 px in from the slab's ends
 * down 70 px, and a stretcher between them 38 px under the slab. The
 * build's caption is centred under the four benches, its foot about 35 px
 * over the drawing's foot.
 */
export const BENCH = { gap: 92, w: 300, slab: 12, legIn: 24, leg: 70, stretcher: 38 } as const;
const BENCH_TOP = TOP + TILE.h + BENCH.gap;
const BENCH_FOOT = BENCH_TOP + BENCH.slab + BENCH.leg;
const BUILD_Y = BENCH_FOOT + CAPTION_DOWN;

/** A bench's outline as one path: the slab round its edge, then each leg down from it, then the stretcher across. */
export function benchPath(at: Box): string {
  const slabFoot = at.y + BENCH.slab;
  const left = at.x + BENCH.legIn;
  const right = at.x + at.w - BENCH.legIn;
  const foot = at.y + at.h;
  const bar = slabFoot + BENCH.stretcher;
  return `M${at.x} ${at.y}H${at.x + at.w}V${slabFoot}H${at.x}ZM${left} ${slabFoot}V${foot}M${right} ${slabFoot}V${foot}M${left} ${bar}H${right}`;
}

export const COURSE = {
  ...layerOf("course"),
  tiles: NAMES.map((name, i) => {
    const at = tileAt(i);
    const bench = box(at.x + (TILE.w - BENCH.w) / 2, BENCH_TOP, BENCH.w, BENCH.slab + BENCH.leg);
    return {
      key: `course.tile.${i}`,
      at,
      name: { key: `course.tile.${i}.name`, text: name, at: box(at.x + TILE.inset, at.y + TILE.nameDown, TILE.nameW, TILE.nameLines * TILE.nameLine) },
      bench: { key: `course.bench.${i}`, at: bench },
    };
  }),
  college: { key: "course.college", text: COLLEGE, at: { x: STAGE.w / 2, y: COLLEGE_Y } as Point },
  build: { key: "course.build", text: BUILD, at: { x: STAGE.w / 2, y: BUILD_Y } as Point },
};
