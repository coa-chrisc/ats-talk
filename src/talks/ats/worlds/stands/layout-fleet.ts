/**
 * Slide 15's places: the department map lit and occupied, and the checks
 * before expanding. At the left, the grid of departments where slides 11 and
 * 12 set it (department-map.ts), named over it, its nine windows lit as
 * slide 12 lights them and three staff standing in the middle row's unlit
 * boxes; the staff's name and caption directly under it, and the portfolio
 * as plain words on the drawing's foot under them. At the right, the
 * sandbox's small fenced yard, named beside it, holding three agents, a
 * member of staff and the orange mark in a row; the fleet's name and caption
 * under the fence. Under the yard, one rule from the grid's right edge to the
 * drawing's right, headed over its start, with three closed gates standing
 * on it across the width it runs, each named under it. Words are read from
 * the script, by position.
 */
import { box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { AGENT, LIT, MAP_AT, STAFF, WINDOW, fenceBox, gatePaths, gridAt, windowAt } from "../department-map";
import { DRAW_FOOT, LABEL_LINE, SAFE, contentTop, layerOf, tagWords } from "./layout";

const [CAPABILITIES, STAFF_NAME, STAFF_CAPTION, SANDBOX, SANDBOX_CAPTION, FLEET_NAME, FLEET_CAPTION, BEFORE, ...REST] = shown("fleet", "play");
const GATE_WORDS = REST.slice(0, 6);
const PORTFOLIO = REST[6];

const TOP = contentTop("fleet");
/** A caption's rows are this far apart. */
export const PITCH = 30;

/* The map */

/** The grid at the map's place, named 30 px over it. */
const MAP = gridAt(MAP_AT, 1);
const MAP_FOOT = MAP.outline.y + MAP.outline.h;
const MAP_RIGHT = MAP.outline.x + MAP.outline.w;

/** The nine windows slide 12 lights, the six named full and the three others smaller and faint. */
const windows = [...LIT.named.map((cell) => ({ cell, small: false })), ...LIT.unnamed.map((cell) => ({ cell, small: true }))].map(({ cell, small }, i) => ({
  key: `fleet.window.${i}`,
  cell: MAP.cell(cell[0], cell[1]),
  at: windowAt(MAP.centre(cell[0], cell[1]), MAP.cell(0, 0).h, small ? WINDOW.small : 1),
  lit: small ? WINDOW.faint : 1,
}));

/** A member of staff standing in a box: 3 px inside its top and foot, three quarters as wide as tall. */
const standIn = (col: number, row: number) => {
  const cell = MAP.cell(col, row);
  const h = cell.h - 6;
  const w = Math.round(h * 0.75);
  return box(Math.round(cell.x + (cell.w - w) / 2), cell.y + 3, w, h);
};
const staff = STAFF.map(([col, row], i) => ({ key: `fleet.staff.${i}`, at: standIn(col, row) }));

/** The staff's name 32 px under the grid, its caption on one row under the name. */
const STAFF_WORDS: Point = { x: MAP.outline.x, y: MAP_FOOT + 32 };

/** The portfolio on two rows, its last at the drawing's foot. */
const PORTFOLIO_ROWS = breakAfter(PORTFOLIO, "applications");
const PORTFOLIO_AT: Point = { x: MAP.outline.x, y: DRAW_FOOT - LABEL_LINE / 2 - (PORTFOLIO_ROWS.length - 1) * PITCH };

/* The yard */

/** The yard 44 px right of the grid, its fence's pickets 20 px under the drawing's top. */
const YARD_X = MAP_RIGHT + 44;
const YARD_Y = TOP + 40;
/** Inside it, 28 px from its rails: three agents at 0.6 of slide 14's size, 56 apart, their middle on the yard's; a member of staff 42 by 56 after them on the same foot; the mark 30 past the staff's side. */
const INSET = 28;
const AGENT_SCALE = 0.6;
const AGENT_W = AGENT.w * AGENT_SCALE;
const AGENT_H = AGENT.h * AGENT_SCALE;
const YARD_H = 84;
const YARD_MID = YARD_Y + YARD_H / 2;
const AGENT_TOP = Math.round(YARD_MID - AGENT_H / 2);
const agents = [0, 1, 2].map((i) => ({ key: `fleet.agent.${i}`, at: { x: Math.round(YARD_X + INSET + AGENT_W / 2 + i * 56), y: AGENT_TOP } as Point }));
const AGENT_FOOT = Math.round(AGENT_TOP + AGENT_H);
const KEEPER = box(Math.round(agents[2].at.x + AGENT_W / 2 + 14), AGENT_FOOT - 56, 42, 56);
const MARK: Point = { x: KEEPER.x + KEEPER.w + 30, y: YARD_MID };
const FENCE = box(YARD_X, YARD_Y, MARK.x + 24 + INSET - YARD_X, YARD_H);
const FENCE_RIGHT = FENCE.x + FENCE.w;

/** The yard's name and caption 28 px right of the fence, the name level with the rail's top, the caption on two rows under it. */
const YARD_WORDS: Point = { x: FENCE_RIGHT + 28, y: FENCE.y + LABEL_LINE / 2 };

/** The fleet's name 28 px under the fence, its caption under the name. */
const FLEET_WORDS: Point = { x: FENCE.x, y: FENCE.y + FENCE.h + 28 };

/* The rule and its gates */

/** The rule from the grid's right edge, 20 px under its foot, to the drawing's right; headed over its start, clear over the gates' tops. */
const RULE_Y = MAP_FOOT + 20;
const GATE_SCALE = 1;
/** Each gate's caption broken at a phrase so no row runs wider than the middle gate's name: the first on three rows, the others on two. */
const GATE_BREAKS = [["team", "provide"], ["application's"], ["use,"]];
const GATE_LABELS = [0, 1, 2].map((i) => ({ name: GATE_WORDS[2 * i], rows: breakAfter(GATE_WORDS[2 * i + 1], ...GATE_BREAKS[i]) }));
/**
 * A gate's words are as wide as their longest row, measured as a tag's
 * words are. The gates spread across the rule: the first's words start 24
 * px past the rule's start, the last's end 16 px short of the drawing's
 * right edge, and the room left over is shared out evenly between them.
 */
const LABEL_W = GATE_LABELS.map(({ name, rows }) => Math.max(...[name, ...rows].map((row) => tagWords(row, 26))));
const LABELS_FROM = MAP_RIGHT + 24;
const LABELS_TO = SAFE.right - 16;
const GATE_GAP = (LABELS_TO - LABELS_FROM - LABEL_W.reduce((sum, w) => sum + w, 0)) / (LABEL_W.length - 1);
const GATE_X = LABEL_W.map((w, i) => LABELS_FROM + LABEL_W.slice(0, i).reduce((sum, v) => sum + v + GATE_GAP, 0) + w / 2);
const gates = GATE_LABELS.map(({ name, rows }, i) => {
  const foot: Point = { x: Math.round(GATE_X[i]), y: RULE_Y };
  return {
    key: `fleet.gate.${i}`,
    foot,
    at: gatePaths(foot, GATE_SCALE).at,
    name: { key: `fleet.gate.${i}.name`, text: name, at: { x: foot.x, y: RULE_Y + 30 } as Point },
    caption: { key: `fleet.gate.${i}.caption`, text: GATE_WORDS[2 * i + 1], rows, at: { x: foot.x, y: RULE_Y + 30 + 32 } as Point },
  };
});
/** The heading's row 16 px over the gates' tops, in line with the first gate's words, 24 px past the rule's start and clear of the grid. */
const BEFORE_AT: Point = { x: LABELS_FROM, y: Math.min(...gates.map((gate) => gate.at.y)) - 16 - LABEL_LINE / 2 };

export const FLEET = {
  ...layerOf("fleet"),
  map: MAP,
  grid: { key: "fleet.grid", at: MAP.outline },
  name: { key: "fleet.name", text: CAPABILITIES, at: { x: MAP.outline.x, y: MAP.outline.y - 30 } as Point },
  windows,
  staff,
  staffWords: {
    name: { key: "fleet.staff.name", text: STAFF_NAME, at: STAFF_WORDS },
    caption: { key: "fleet.staff.caption", text: STAFF_CAPTION, rows: [STAFF_CAPTION], at: { x: STAFF_WORDS.x, y: STAFF_WORDS.y + 32 } as Point },
  },
  yard: {
    key: "fleet.yard",
    at: FENCE,
    reach: fenceBox(FENCE),
    name: { key: "fleet.yard.name", text: SANDBOX, at: YARD_WORDS },
    caption: { key: "fleet.yard.caption", text: SANDBOX_CAPTION, rows: breakAfter(SANDBOX_CAPTION, "environment"), at: { x: YARD_WORDS.x, y: YARD_WORDS.y + 32 } as Point },
  },
  agents,
  agentScale: AGENT_SCALE,
  keeper: { key: "fleet.keeper", at: KEEPER },
  mark: { key: "fleet.mark", at: MARK },
  fleetWords: {
    name: { key: "fleet.fleet.name", text: FLEET_NAME, at: FLEET_WORDS },
    caption: { key: "fleet.fleet.caption", text: FLEET_CAPTION, rows: [FLEET_CAPTION], at: { x: FLEET_WORDS.x, y: FLEET_WORDS.y + PITCH } as Point },
  },
  before: { key: "fleet.before", text: BEFORE, at: BEFORE_AT },
  rule: { key: "fleet.rule", from: { x: MAP_RIGHT, y: RULE_Y } as Point, to: { x: SAFE.right, y: RULE_Y } as Point },
  gates,
  gateScale: GATE_SCALE,
  portfolio: { key: "fleet.portfolio", text: PORTFOLIO, rows: PORTFOLIO_ROWS, at: PORTFOLIO_AT },
};
