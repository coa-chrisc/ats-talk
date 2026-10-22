/**
 * Slide 13's places. At the left, the fenced yard, named over its top left
 * with its caption beside the name, and five tiles inside it in reading
 * order: the first across the yard's width, then two rows of two, each tile
 * with its name and, where the script gives one, its caption under it. At
 * the right, the round table seen from above, the department map's table
 * drawn smaller, four chairs round it with a person in each and a nameplate
 * by each chair (top, left, right, foot), the table's caption under the
 * lowest plate. Every word is measured as Geist sets it and its box sized
 * from that. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import ADVANCES from "../../script/geist-medium-advances.json";
import { shown } from "../../script/find";
import { TABLE, fenceBox } from "../department-map";
import { SAFE, contentTop, layerOf, wordsWidth } from "./layout";

const [SANDBOX, CANNOT_REACH, RUNNING, RUNNING_CAPTION, AS_CODE, AS_CODE_CAPTION, CONTAINERS, FIREWALL, TOKENS, TOKENS_CAPTION, CITY, MICROSOFT, QUISITIVE, SECURITY, MET] = shown("infrastructure", "play");

const TOP = contentTop("infrastructure");

/* Measuring words */

const ADVANCE: Record<string, number> = ADVANCES.advances;
/** How wide a run of words is set at a size, from Geist Medium's own advances 2 per cent over (6 for the strong, 600, cut): what a box sized to its words is sized from. */
export const setWidth = (text: string, size: number, strong = false) => Math.ceil([...text].reduce((sum, ch) => sum + (ADVANCE[ch] ?? 0.6), 0) * size * (strong ? 1.06 : 1.02));
/** The wider of that and the world's rough measure: the room words are given where nothing is sized to them. */
export const measure = (text: string, size: number, strong = false) => Math.max(wordsWidth(text, size), setWidth(text, size, strong));

/* The yard */

/** The yard's name and caption on one row over its top left, the name at the text size, the caption 24 px after it. */
const NAME_Y = TOP + 24;
/** The yard: from x 96, 1064 wide and 340 tall, its pickets standing clear under the name's row. */
const FENCE = box(96, TOP + 80, 1064, 340);

/** Tiles 16 px inside the fence's sides and foot, 20 under its rail, 14 apart; each 92 tall. */
const TILE = { pad: 16, top: 20, gap: 14, h: 92 } as const;
/**
 * A tile's words, centred across it: its name at the text size (strong) and
 * its caption at the label size. A captioned tile has its name's middle 30 px
 * under its top and its caption's 65, so 14 px are left over the name and
 * under the caption; a tile with a name alone has it in its middle.
 */
export const TILE_WORDS = { inset: 20, nameSize: 32, captionSize: 26, name: 30, caption: 65 } as const;

const INNER = { x: FENCE.x + TILE.pad, w: FENCE.w - 2 * TILE.pad } as const;
const HALF = (INNER.w - TILE.gap) / 2;
const rowY = (row: number) => FENCE.y + TILE.top + row * (TILE.h + TILE.gap);
const tileAt = [box(INNER.x, rowY(0), INNER.w, TILE.h), box(INNER.x, rowY(1), HALF, TILE.h), box(INNER.x + HALF + TILE.gap, rowY(1), HALF, TILE.h), box(INNER.x, rowY(2), HALF, TILE.h), box(INNER.x + HALF + TILE.gap, rowY(2), HALF, TILE.h)];

const tiles = [
  { text: RUNNING, caption: RUNNING_CAPTION },
  { text: AS_CODE, caption: AS_CODE_CAPTION },
  { text: CONTAINERS },
  { text: FIREWALL },
  { text: TOKENS, caption: TOKENS_CAPTION },
].map((entry: { text: string; caption?: string }, i) => {
  const at = tileAt[i];
  const x = at.x + at.w / 2;
  return {
    key: `infrastructure.tile.${i}`,
    at,
    name: { text: entry.text, at: { x, y: at.y + (entry.caption ? TILE_WORDS.name : at.h / 2) } as Point },
    caption: entry.caption ? { text: entry.caption, at: { x, y: at.y + TILE_WORDS.caption } as Point } : null,
  };
});

/* The table, at the right */

/** The department map's table at 0.65 of its size, with four of its chairs and a head in each. */
const SCALE = 0.65;
const R = Math.round(TABLE.r * SCALE);
const RING = Math.round(TABLE.ring * SCALE);
export const SEAT = { w: Math.round(TABLE.seat.w * SCALE), h: Math.round(TABLE.seat.h * SCALE), rx: Math.round(TABLE.seat.rx * SCALE) } as const;
export const HEAD = 9;

/** Nameplates at the label size (strong), 40 px tall, as wide as their words as set and 20 px each side; each 12 px off its chair. */
export const PLATE = { size: 26, h: 40, pad: 20, gap: 12 } as const;
const plateW = (text: string) => setWidth(text, PLATE.size, true) + 2 * PLATE.pad;
/** From the table's middle to a plate's near edge. */
const NEAR = RING + SEAT.w / 2 + PLATE.gap;
/** The table's caption, at the text size, its middle 20 px plus half its size under the lowest plate. */
const MET_DOWN = NEAR + PLATE.h + 20 + 16;

/**
 * The table's middle: across, the group centred between 48 px past the fence
 * and the safe area's right edge; down, the caption's foot level with the
 * fence's.
 */
const GROUP = { x0: FENCE.x + FENCE.w + 48, x1: SAFE.right } as const;
const C: Point = {
  x: Math.round((GROUP.x0 + plateW(MICROSOFT) + NEAR + (GROUP.x1 - plateW(QUISITIVE) - NEAR)) / 2),
  y: FENCE.y + FENCE.h - MET_DOWN - 16,
};

/** The four chairs, in the script's order: top, left, right, foot. */
const SIDES = [-90, 180, 0, 90] as const;
const seats = SIDES.map((deg, i) => {
  const a = (deg * Math.PI) / 180;
  return { key: `infrastructure.seat.${i}`, sitter: `infrastructure.sitter.${i}`, at: { x: Math.round(C.x + RING * Math.cos(a)), y: Math.round(C.y + RING * Math.sin(a)) } as Point, deg };
});

/** Each plate by its chair, on the side away from the table, centred on it. */
const plateAt = (text: string, side: number): Box => {
  const w = plateW(text);
  if (side === 0) return box(C.x - w / 2, C.y - NEAR - PLATE.h, w, PLATE.h);
  if (side === 1) return box(C.x - NEAR - w, C.y - PLATE.h / 2, w, PLATE.h);
  if (side === 2) return box(C.x + NEAR, C.y - PLATE.h / 2, w, PLATE.h);
  return box(C.x - w / 2, C.y + NEAR, w, PLATE.h);
};

export const INFRASTRUCTURE = {
  ...layerOf("infrastructure"),
  name: { key: "infrastructure.name", text: SANDBOX, at: { x: FENCE.x + 16, y: NAME_Y } as Point },
  caption: { key: "infrastructure.caption", text: CANNOT_REACH, at: { x: FENCE.x + 16 + measure(SANDBOX, 32, true) + 24, y: NAME_Y } as Point },
  fence: { key: "infrastructure.fence", at: FENCE, reach: fenceBox(FENCE) },
  tiles,
  table: { key: "infrastructure.table", c: C, r: R, seat: SEAT, seats },
  plates: [CITY, MICROSOFT, QUISITIVE, SECURITY].map((text, i) => ({ key: `infrastructure.plate.${i}`, text, seat: i, at: plateAt(text, i) })),
  met: { key: "infrastructure.met", text: MET, at: { x: C.x, y: C.y + MET_DOWN } as Point },
};
