/**
 * Slide 15's places: the department map lit and occupied, and the checks
 * before expanding. Over the top, the grid of departments at the map's
 * proportions (department-map.ts), named over it, its nine lanterns lit as
 * slide 12 lights them and three staff standing in the middle row's unlit
 * boxes; the staff's name and caption beside it; at the right, the
 * sandbox's small fenced yard, named over it, holding three agents, a
 * member of staff and the orange mark, the fleet's name and caption inside
 * it. Under them, one rule from the grid's left edge to the drawing's
 * right, headed at its start, with three closed gates standing on it, each
 * named under it; and the portfolio as a plain line on the drawing's foot,
 * a clear row under the gates' words. Words are read from the script, by
 * position.
 */
import { box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { AGENT, LANTERN, LIT, STAFF, fencePosts, gatePaths, gridAt } from "../department-map";
import { DRAW_FOOT, LABEL_LINE, SAFE, contentTop, layerOf } from "./layout";

const [CAPABILITIES, STAFF_NAME, STAFF_CAPTION, SANDBOX, SANDBOX_CAPTION, FLEET_NAME, FLEET_CAPTION, BEFORE, ...REST] = shown("fleet", "play");
const GATE_WORDS = REST.slice(0, 6);
const PORTFOLIO = REST[6];

const TOP = contentTop("fleet");
/** The headings over the grid and the yard, on one row 16 px under the drawing's first line. */
const HEAD_Y = TOP + 16;
/** A caption's rows are this far apart. */
export const PITCH = 30;

/* The map */

/** The grid at slide 12's size, 36 px under the drawing's first line, from the drawing's left edge. */
const MAP = gridAt({ x: 96, y: TOP + 36 }, 1);
const MAP_FOOT = MAP.outline.y + MAP.outline.h;
const MAP_RIGHT = MAP.outline.x + MAP.outline.w;

/** The nine lanterns slide 12 lights, the six named at the grid's scale and the three others smaller. */
const lanterns = [...LIT.named.map((cell) => ({ cell, scale: MAP.scale })), ...LIT.unnamed.map((cell) => ({ cell, scale: MAP.scale * LANTERN.small }))].map(({ cell, scale }, i) => ({
  key: `fleet.lantern.${i}`,
  cell: MAP.cell(cell[0], cell[1]),
  at: MAP.centre(cell[0], cell[1]),
  scale,
}));

/** A member of staff standing in a box: 3 px inside its top and foot, three quarters as wide as tall. */
const standIn = (col: number, row: number) => {
  const cell = MAP.cell(col, row);
  const h = cell.h - 6;
  const w = Math.round(h * 0.75);
  return box(Math.round(cell.x + (cell.w - w) / 2), cell.y + 3, w, h);
};
const staff = STAFF.map(([col, row], i) => ({ key: `fleet.staff.${i}`, at: standIn(col, row) }));

/** The staff's name and caption 30 px right of the grid, the name a row over the staff's row's middle. */
const STAFF_WORDS: Point = { x: MAP_RIGHT + 30, y: MAP.centre(0, 1).y - 32 };

/* The yard */

/** The yard from 1164 to the drawing's right edge, its foot level with the grid's; named over it and captioned under the name. */
const YARD_X = 1164;
const FENCE = box(YARD_X, TOP + 82, SAFE.right - YARD_X, MAP_FOOT - (TOP + 82));
const YARD_MID = FENCE.y + FENCE.h / 2;
/** Three agents at 0.7 of slide 14's size, 62 apart, their middle on the yard's; a member of staff 48 by 64 after them on the same foot; the mark beside the staff's shoulder. */
const AGENT_SCALE = 0.7;
const AGENT_TOP = Math.round(YARD_MID - (AGENT.h * AGENT_SCALE) / 2);
const agents = [0, 1, 2].map((i) => ({ key: `fleet.agent.${i}`, at: { x: FENCE.x + 40 + i * 62, y: AGENT_TOP } as Point }));
const AGENT_FOOT = Math.round(AGENT_TOP + AGENT.h * AGENT_SCALE);
const KEEPER = box(FENCE.x + 206, AGENT_FOOT - 64, 48, 64);
const MARK: Point = { x: KEEPER.x + KEEPER.w + 34, y: YARD_MID };
/** The fleet's name and caption inside the yard, after the mark. */
const FLEET_WORDS: Point = { x: MARK.x + 50, y: YARD_MID - PITCH };

/* The rule, its gates and the portfolio */

/** The rule 64 px under the grid, its heading over its start; the gates at the hurdle's size, at the middles of three equal slots after the heading, their tops clear of the yard's posts. */
const RULE_Y = MAP_FOOT + 64;
const GATE_SCALE = 1;
const SLOTS = { x: 360, w: (SAFE.right - 360) / 3 } as const;
const GATE_BREAKS = ["and", "application's", "use,"];
const gates = [0, 1, 2].map((i) => {
  const foot: Point = { x: Math.round(SLOTS.x + (i + 0.5) * SLOTS.w), y: RULE_Y };
  return {
    key: `fleet.gate.${i}`,
    foot,
    at: gatePaths(foot, GATE_SCALE).at,
    name: { key: `fleet.gate.${i}.name`, text: GATE_WORDS[2 * i], at: { x: foot.x, y: RULE_Y + 30 } as Point },
    caption: { key: `fleet.gate.${i}.caption`, text: GATE_WORDS[2 * i + 1], rows: breakAfter(GATE_WORDS[2 * i + 1], GATE_BREAKS[i]), at: { x: foot.x, y: RULE_Y + 30 + 32 } as Point },
  };
});

export const FLEET = {
  ...layerOf("fleet"),
  map: MAP,
  grid: { key: "fleet.grid", at: MAP.outline },
  name: { key: "fleet.name", text: CAPABILITIES, at: { x: MAP.outline.x, y: HEAD_Y } as Point },
  lanterns,
  staff,
  staffWords: {
    name: { key: "fleet.staff.name", text: STAFF_NAME, at: STAFF_WORDS },
    caption: { key: "fleet.staff.caption", text: STAFF_CAPTION, rows: breakAfter(STAFF_CAPTION, "practice"), at: { x: STAFF_WORDS.x, y: STAFF_WORDS.y + 32 } as Point },
  },
  yard: {
    key: "fleet.yard",
    at: FENCE,
    posts: fencePosts(FENCE.x, FENCE.w),
    name: { key: "fleet.yard.name", text: SANDBOX, at: { x: FENCE.x, y: HEAD_Y } as Point },
    caption: { key: "fleet.yard.caption", text: SANDBOX_CAPTION, at: { x: FENCE.x, y: HEAD_Y + LABEL_LINE } as Point },
  },
  agents,
  agentScale: AGENT_SCALE,
  keeper: { key: "fleet.keeper", at: KEEPER },
  mark: { key: "fleet.mark", at: MARK },
  fleetWords: {
    name: { key: "fleet.fleet.name", text: FLEET_NAME, at: FLEET_WORDS },
    caption: { key: "fleet.fleet.caption", text: FLEET_CAPTION, rows: breakAfter(FLEET_CAPTION, "workflow"), at: { x: FLEET_WORDS.x, y: FLEET_WORDS.y + PITCH } as Point },
  },
  before: { key: "fleet.before", text: BEFORE, at: { x: 96, y: RULE_Y - 28 } as Point },
  rule: { key: "fleet.rule", from: { x: 96, y: RULE_Y } as Point, to: { x: SAFE.right, y: RULE_Y } as Point },
  gates,
  gateScale: GATE_SCALE,
  portfolio: { key: "fleet.portfolio", text: PORTFOLIO, at: { x: 96, y: DRAW_FOOT - LABEL_LINE / 2 } as Point },
};
