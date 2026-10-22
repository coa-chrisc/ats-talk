/**
 * Slide 14's places. On the left, the foundation: four slabs stacked under
 * two headings, each slab a control already in the sandbox, its name and
 * its scope on one row in two columns; the closing sentence under the
 * stack. On the right, under its heading, an agent inside a dashed grey
 * boundary, the design still to define; four spokes run out of it to the
 * four controls each agent system needs, drawn in the deck's own
 * vocabulary: the closed gate for the data and actions it may use, a tool
 * screen with its socket for the tools it may call, a member of staff with
 * the orange mark for the sensitive actions a person approves, and the
 * record for what it did. The upper two are named over them, the lower two
 * under them. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { AGENT, gatePaths } from "../department-map";
import { LABEL_LINE, contentTop, layerOf, round, wordsWidth } from "./layout";
import { LEDGER, recordLines, shapePath } from "./layout-control";

const words = shown("fits", "play");
const [FOUNDATION, COVERS, DEFINE] = words;
const CONCLUSION = words[15];

const TOP = contentTop("fits");
export const PITCH = LABEL_LINE;
/** The headings on the field's first row. */
const HEAD_Y = TOP + LABEL_LINE / 2;

/* The foundation */

/** A slab: 852 wide and 66 tall, rounded 8, the slabs 10 apart, the first 16 px under the headings' row; a slab's name 24 px in, its scope in a second column 352 px past that. */
export const SLAB = { x: 104, w: 852, h: 66, gap: 10, rx: 8, inset: 24, column: 352 } as const;
const SLAB_TOP = TOP + LABEL_LINE + 16;
const NAME_X = SLAB.x + SLAB.inset;
const SCOPE_X = NAME_X + SLAB.column;
const slabAt = (i: number): Box => box(SLAB.x, SLAB_TOP + i * (SLAB.h + SLAB.gap), SLAB.w, SLAB.h);
const STACK_FOOT = SLAB_TOP + 4 * SLAB.h + 3 * SLAB.gap;

/* The agent and its boundary */

/** The agent at 1.2 of the department map's, its middle 1412 across and 242 px under the field's top; the boundary round it 124 by 92 across the radii. */
export const AGENT_SCALE = 1.2;
const MIDDLE: Point = { x: 1412, y: TOP + 242 };
const AGENT_AT: Point = { x: MIDDLE.x, y: round(MIDDLE.y - (AGENT.h * AGENT_SCALE) / 2) };
const AGENT_HALF = (AGENT.w * AGENT_SCALE) / 2;
export const BOUNDARY = { c: MIDDLE, rx: 124, ry: 92 } as const;

/* The four controls */

/** The controls in two columns, 292 px either side of the agent; the upper two with their middles 170 px under the field's top, the lower two 320. */
const SPREAD = 292;
const LEFT = MIDDLE.x - SPREAD;
const RIGHT = MIDDLE.x + SPREAD;
const UPPER_Y = TOP + 170;
const LOWER_Y = TOP + 320;
/** The upper controls' names over them, on two rows ending 16 px over their drawings; the lower ones' under them, 16 px clear. */
const NAMED_OVER = TOP + LABEL_LINE + 24 + LABEL_LINE / 2;
const NAMED_UNDER = TOP + 360 + LABEL_LINE / 2;
/** A spoke stops this far short of what it reaches. */
const REACH = 16;

/** The closed gate, at 1.4 of the department map's. */
export const GATE_SCALE = 1.4;
const gateFoot: Point = { x: LEFT, y: UPPER_Y + 28 };
const gate = gatePaths(gateFoot, GATE_SCALE);
/** The tool screen: a frame 92 by 68, its circle socket in its middle. */
const SCREEN = box(RIGHT - 46, UPPER_Y - 34, 92, 68);
/** The member of staff, 54 by 72, and the orange mark beside them on the outer side, level with their shoulders. */
const STAFF = box(LEFT - 27, LOWER_Y - 48, 54, 72);
const MARK: Point = { x: STAFF.x - 36, y: STAFF.y + 16 };
/** The record, the size of slide 11a's. */
const RECORD = box(RIGHT - LEDGER.w / 2, LOWER_Y - 46, LEDGER.w, LEDGER.h);

/** A spoke from the agent's side, 4 px out from it, to `to`. */
const spoke = (i: number, from: Point, to: Point) => ({ key: `fits.connection.${i}`, d: `M${round(from.x)} ${round(from.y)}L${round(to.x)} ${round(to.y)}`, length: round(Math.hypot(to.x - from.x, to.y - from.y)) });
const SIDE_UPPER = AGENT_AT.y + AGENT.h * AGENT_SCALE * 0.32;
const SIDE_LOWER = AGENT_AT.y + AGENT.h * AGENT_SCALE * 0.7;

const name = (i: number, at: Point, after: string) => {
  const text = words[5 + i * 3];
  return { key: `fits.control.${i}.name`, text, rows: breakAfter(text, after), at };
};

export const FITS = {
  ...layerOf("fits"),
  heads: [
    { key: "fits.head.0", text: FOUNDATION, at: { x: NAME_X, y: HEAD_Y } as Point },
    { key: "fits.head.1", text: COVERS, at: { x: SCOPE_X, y: HEAD_Y } as Point },
  ] as const,
  layers: [0, 1, 2, 3].map((i) => {
    const at = slabAt(i);
    const y = at.y + at.h / 2;
    return {
      key: `fits.layer.${i}`,
      at,
      name: { key: `fits.layer.${i}.name`, text: words[3 + i * 3], at: { x: NAME_X, y } as Point },
      scope: { key: `fits.layer.${i}.scope`, text: words[4 + i * 3], at: { x: SCOPE_X, y } as Point },
    };
  }),
  conclusion: { key: "fits.conclusion", text: CONCLUSION, at: { x: NAME_X, y: STACK_FOOT + 24 + LABEL_LINE / 2 } as Point },
  define: { key: "fits.define", text: DEFINE, at: { x: MIDDLE.x, y: HEAD_Y } as Point },
  agent: { key: "fits.agent", at: AGENT_AT, box: box(MIDDLE.x - AGENT_HALF, AGENT_AT.y, 2 * AGENT_HALF, AGENT.h * AGENT_SCALE) },
  boundary: { key: "fits.boundary", ...BOUNDARY },
  gate: { key: "fits.control.0", foot: gateFoot, paths: gate, name: name(0, { x: LEFT, y: NAMED_OVER }, "data") },
  screen: { key: "fits.control.1", at: SCREEN, socket: shapePath("circle", { x: SCREEN.x + SCREEN.w / 2, y: SCREEN.y + SCREEN.h / 2 }), name: name(1, { x: RIGHT, y: NAMED_OVER }, "Tool-level") },
  approval: { key: "fits.control.2", at: STAFF, mark: { key: "fits.control.2.mark", at: MARK }, name: name(2, { x: LEFT, y: NAMED_UNDER }, "Approval") },
  record: { key: "fits.control.3", at: RECORD, lines: recordLines("fits.control.3", RECORD), name: name(3, { x: RIGHT, y: NAMED_UNDER }, "activity") },
  spokes: [
    spoke(0, { x: MIDDLE.x - AGENT_HALF - 4, y: SIDE_UPPER }, { x: gate.at.x + gate.at.w + REACH, y: UPPER_Y }),
    spoke(1, { x: MIDDLE.x + AGENT_HALF + 4, y: SIDE_UPPER }, { x: SCREEN.x - REACH, y: UPPER_Y }),
    spoke(2, { x: MIDDLE.x - AGENT_HALF - 4, y: SIDE_LOWER }, { x: STAFF.x + STAFF.w + REACH, y: LOWER_Y - 12 }),
    spoke(3, { x: MIDDLE.x + AGENT_HALF + 4, y: SIDE_LOWER }, { x: RECORD.x - REACH, y: LOWER_Y - 12 }),
  ] as const,
};

type Anchor = "start" | "middle" | "end";

/** Every row of words the slide sets, with its anchor and its box, for the tests. */
export const fitsRows = (): { key: string; text: string; anchor: Anchor; box: Box }[] => {
  const F = FITS;
  const one = (key: string, text: string, at: Point, anchor: Anchor) => {
    const w = wordsWidth(text, 26);
    const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : round(at.x - w / 2);
    return { key, text, anchor, box: box(x, at.y - LABEL_LINE / 2, w, LABEL_LINE) };
  };
  const rows = (key: string, list: readonly string[], at: Point) => list.map((text, k) => one(`${key}.${k}`, text, { x: at.x, y: at.y + k * PITCH }, "middle"));
  return [
    ...F.heads.map((head) => one(head.key, head.text, head.at, "start")),
    ...F.layers.flatMap((layer) => [one(layer.name.key, layer.name.text, layer.name.at, "start"), one(layer.scope.key, layer.scope.text, layer.scope.at, "start")]),
    one(F.conclusion.key, F.conclusion.text, F.conclusion.at, "start"),
    one(F.define.key, F.define.text, F.define.at, "middle"),
    ...[F.gate, F.screen, F.approval, F.record].flatMap((control) => rows(control.name.key, control.name.rows, control.name.at)),
  ];
};

/** Every drawn thing's box, for the tests. */
export const fitsGlyphs = (): { key: string; box: Box }[] => {
  const F = FITS;
  const b = F.boundary;
  return [
    ...F.layers.map((layer) => ({ key: layer.key, box: layer.at })),
    { key: F.agent.key, box: F.agent.box },
    { key: F.boundary.key, box: box(b.c.x - b.rx - 2, b.c.y - b.ry - 2, 2 * b.rx + 4, 2 * b.ry + 4) },
    { key: F.gate.key, box: F.gate.paths.at },
    { key: F.screen.key, box: F.screen.at },
    { key: F.approval.key, box: F.approval.at },
    { key: F.approval.mark.key, box: box(F.approval.mark.at.x - 26, F.approval.mark.at.y - 26, 52, 52) },
    { key: F.record.key, box: F.record.at },
  ];
};
