/**
 * Slide 9a, the process grows into One ATS: where every part goes, the id
 * it takes and the words it holds, read from the script by position. A
 * small circle at the left, named on a tab in its top edge, with the green
 * tile inside it; a larger ring to the right, named the same way; an arrow
 * between them on the line the tile travels; and five nodes on the ring,
 * clockwise from its upper left, each named on its outer side, the last two
 * with a smaller line under their names.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, labelsOf, round } from "./layout";

const [HOME_NAME, TILE_NAME, RING_NAME, INFRA, SECURITY, AI, TSP, TSP_SUB, EPMO, EPMO_SUB] = labelsOf("rad-evolves");

/** The line the tile travels along, level with both circles' middles. */
const AXIS = 740;
/** Where the process starts, a small circle, and the larger ring it moves into. */
const HOME = { c: { x: 330, y: AXIS } as Point, r: 130 };
const RING = { c: { x: 1250, y: AXIS } as Point, r: 160 };

/** A circle's name on a tab across its top edge: as wide as its words in the label type (about 14 px a letter) and room either side. */
const tab = (c: Point, r: number, w: number) => box(c.x - w / 2, c.y - r - LABEL_LINE / 2, w, LABEL_LINE);

/** The tile: as wide as its name in 32 px type (about 196 px) with room either side; it ends in the ring's middle and starts in the small circle's. */
const TILE = box(RING.c.x - 120, AXIS - 36, 240, 72);
const TRAVEL = HOME.c.x - RING.c.x;

/** The arrow: from just outside the small circle to just outside the ring, its head at the ring. */
const ARROW_FROM = HOME.c.x + HOME.r + 16;
const ARROW_TO = RING.c.x - RING.r - 16;

/** A sub-line under a name is set in a smaller type, this tall. */
const SUB_LINE = 28;
/** A name's box is as wide as its words, about 16 px a letter in the label type (capitals run wider); a sub-line's, about 12 px a letter in its smaller type. */
const nameWidth = (text: string) => Math.max(60, Math.round(text.length * 16) + 16);
const subWidth = (text: string) => Math.round(text.length * 12) + 16;

/** The nodes, by their angle on the ring (0 to the right, 90 down), and the side of the dot their name sits on. */
const NODES: { text: string; sub?: string; angle: number; side: "left" | "right" | "below" }[] = [
  { text: INFRA, angle: -150, side: "left" },
  { text: SECURITY, angle: -30, side: "right" },
  { text: AI, angle: 30, side: "right" },
  { text: TSP, sub: TSP_SUB, angle: 90, side: "below" },
  { text: EPMO, sub: EPMO_SUB, angle: 150, side: "left" },
];
const DOT_R = 10;
/** How far out a node starts before it settles on the ring. */
const SETTLE = 28;
const GAP = 22;

const onRing = (angle: number, r = RING.r): Point => ({ x: round(RING.c.x + r * Math.cos((angle * Math.PI) / 180)), y: round(RING.c.y + r * Math.sin((angle * Math.PI) / 180)) });

export const RAD_EVOLVES = {
  home: { key: "radEvolves.home", c: HOME.c, r: HOME.r, label: { key: "radEvolves.home.name", text: HOME_NAME, at: tab(HOME.c, HOME.r, 300) } },
  ring: { key: "radEvolves.ring", c: RING.c, r: RING.r, label: { key: "radEvolves.ring.name", text: RING_NAME, at: tab(RING.c, RING.r, 150) } },
  /** The tile where it ends, and how far along the line it starts. */
  tile: { key: "radEvolves.tile", text: TILE_NAME, at: TILE, from: TRAVEL },
  arrow: { key: "radEvolves.arrow", d: `M${ARROW_FROM} ${AXIS}H${ARROW_TO}`, end: { x: ARROW_TO, y: AXIS } as Point, heading: 0 },
  nodes: NODES.map(({ text, sub, angle, side }, i) => {
    const at = onRing(angle);
    const start = onRing(angle, RING.r + SETTLE);
    const w = nameWidth(text);
    const name =
      side === "left" ? box(at.x - GAP - w, at.y - LABEL_LINE / 2, w, LABEL_LINE) : side === "right" ? box(at.x + GAP, at.y - LABEL_LINE / 2, w, LABEL_LINE) : box(at.x - w / 2, at.y + GAP - 4, w, LABEL_LINE);
    const align = side === "left" ? ("right" as const) : side === "right" ? ("left" as const) : ("center" as const);
    const subAt = sub ? (side === "left" ? box(name.x + name.w - subWidth(sub), name.y + LABEL_LINE + 2, subWidth(sub), SUB_LINE) : box(at.x - subWidth(sub) / 2, name.y + LABEL_LINE + 2, subWidth(sub), SUB_LINE)) : undefined;
    return {
      key: `radEvolves.node.${i}`,
      at,
      r: DOT_R,
      /** Where the dot settles from: out along its own line from the ring's middle. */
      from: { x: start.x - at.x, y: start.y - at.y },
      name: { key: `radEvolves.node.${i}.name`, text, at: name, align },
      sub: sub && subAt ? { key: `radEvolves.node.${i}.sub`, text: sub, at: subAt, align } : undefined,
    };
  }),
};

/** Everything slide 9a draws, for the layout test. */
export const RAD_EVOLVES_DRAWN: Record<string, Box[]> = {
  "rad-evolves": [
    box(HOME.c.x - HOME.r, HOME.c.y - HOME.r, 2 * HOME.r, 2 * HOME.r),
    box(RING.c.x - RING.r, RING.c.y - RING.r, 2 * RING.r, 2 * RING.r),
    RAD_EVOLVES.home.label.at,
    RAD_EVOLVES.ring.label.at,
    TILE,
    { ...TILE, x: TILE.x + TRAVEL },
    box(ARROW_FROM, AXIS - 10, ARROW_TO - ARROW_FROM, 20),
    ...RAD_EVOLVES.nodes.flatMap((node) => [
      box(node.at.x - DOT_R, node.at.y - DOT_R, 2 * DOT_R, 2 * DOT_R),
      box(node.at.x + node.from.x - DOT_R, node.at.y + node.from.y - DOT_R, 2 * DOT_R, 2 * DOT_R),
      node.name.at,
      ...(node.sub ? [node.sub.at] : []),
    ]),
  ],
};
