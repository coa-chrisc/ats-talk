/**
 * Slide 22a's places. The field, 604 to 976 under the title and the story
 * band's three rows, holds two sides and what lies between and under them.
 * On the left, the developers: three green figures on one line, a navy seat
 * badge on each one's chest, the side's name and caption over them and the
 * terms under them. On the right, the City's cloud: the fenced yard of
 * slide 13, its name and caption over it, and inside it an agent sending
 * small pieces of work into a meter that steps up one cell for each. A
 * dashed boundary runs down between the sides under its name. Under the
 * boundary, the empty round table of slide 12 in grey dashes, its name and
 * caption beside it. Words are read from the script, by position.
 */
import { box, type Point } from "@/components/deck/kit";
import { AGENT, FENCE, fenceBox, tableReach } from "../department-map";
import { PERSON_CAST, setBox } from "./layout-outcomes";
import { LABEL_LINE, SAFE, contentTop, groupOf, labelsOf, round } from "./layout-plan";

const [SEATS, SEATS_CAPTION, INCLUDED, METERED, METERED_CAPTION, PAID, LINE, TABLE_NAME, TABLE_CAPTION] = labelsOf("budget");

/** 604: under the two-line title and the story band's three rows (its first line is set on two). */
const TOP = contentTop("budget");

type Words = { key: string; text: string; at: Point };
const words = (key: string, text: string, at: Point): Words => ({ key, text, at });

/** Each side's name on the field's first label line, its caption on the next. */
const NAME_Y = TOP + 4 + LABEL_LINE / 2;
const CAPTION_Y = NAME_Y + LABEL_LINE;

/* The developers, on the left */

/** The three figures stand 120 apart on one line, 32 under the caption's line; the first 24 in from the band's edge. */
const PEOPLE = { from: SAFE.left + 24, pitch: 120, top: CAPTION_Y + LABEL_LINE / 2 + 18 } as const;
/** A seat badge: a small navy card on the chest, 32 by 22, its top 66 under the figure's. */
export const BADGE = { w: 32, h: 22, drop: 66, rx: 4 } as const;
const person = (i: number) => {
  const at = box(PEOPLE.from + i * PEOPLE.pitch, PEOPLE.top, PERSON_CAST.w, PERSON_CAST.h);
  const cx = at.x + at.w / 2;
  return { key: `budget.person.${i}`, at, badge: { key: `budget.badge.${i}`, at: box(cx - BADGE.w / 2, at.y + BADGE.drop, BADGE.w, BADGE.h) } };
};
const PEOPLE_FOOT = PEOPLE.top + PERSON_CAST.h;

/* The boundary between the sides */

/** The boundary's line: its name on the first label line, the dashes from under it to 12 over the table's top. */
const BOUNDARY_X = 850;
/** The empty table, about two thirds of slide 12's size, under the boundary; its top's foot 2 over the field's. */
const TABLE_SCALE = 0.34;
const TABLE_REACH = tableReach(TABLE_SCALE);
const TABLE_C: Point = { x: BOUNDARY_X, y: round(SAFE.bottom - 2 - TABLE_REACH) };
const BOUNDARY = box(BOUNDARY_X - 2, NAME_Y + LABEL_LINE / 2 + 10, 4, round(TABLE_C.y - TABLE_REACH - 12 - (NAME_Y + LABEL_LINE / 2 + 10)));

/* The City's cloud, on the right */

/** The right side starts 210 past the boundary; the yard runs from there to the band's right edge, its pickets (at slide 24's scale) 10 under the caption's line, its foot where the old post fence's was. */
const RIGHT = BOUNDARY_X + 210;
const FENCE_SCALE = 0.8;
const RISE = round(FENCE.picket.rise * FENCE_SCALE);
const YARD = box(RIGHT, CAPTION_Y + LABEL_LINE / 2 + 10 + RISE, SAFE.right - RIGHT, 150 - RISE);
/** The agent in the yard, 60 in from its left fence, its top 22 under the rail. */
const AGENT_AT: Point = { x: YARD.x + 60 + AGENT.w / 2, y: YARD.y + 22 };
/** The meter: an outline of four cells, 95 each, 70 past the agent, level with the agent's eyes; its words under it. */
export const METER = { cells: 4, cell: 95, h: 34, inset: 4, rx: 8 } as const;
const METER_AT = box(AGENT_AT.x + AGENT.w / 2 + 70, AGENT_AT.y + 10, METER.cells * METER.cell, METER.h);
const cellAt = (i: number) => box(METER_AT.x + i * METER.cell + METER.inset, METER_AT.y + METER.inset, METER.cell - 2 * METER.inset, METER.h - 2 * METER.inset);
/** Three pieces of work: each leaves the agent's side and stops in the next empty cell, which fills. The meter ends three cells up of four. */
export const TOKEN = { r: 8, sent: 3 } as const;
const TOKEN_FROM: Point = { x: AGENT_AT.x + AGENT.w / 2 + 14, y: METER_AT.y + METER.h / 2 };
const tokenTo = (i: number) => round(cellAt(i).x + cellAt(i).w / 2 - TOKEN_FROM.x);

export const BUDGET = {
  ...groupOf("budget"),
  seats: {
    name: words("budget.seats.name", SEATS, { x: SAFE.left, y: NAME_Y }),
    caption: words("budget.seats.caption", SEATS_CAPTION, { x: SAFE.left, y: CAPTION_Y }),
    people: [0, 1, 2].map(person),
    included: words("budget.seats.included", INCLUDED, { x: SAFE.left, y: PEOPLE_FOOT + 16 + LABEL_LINE / 2 }),
  },
  boundary: {
    key: "budget.boundary",
    at: BOUNDARY,
    name: words("budget.boundary.name", LINE, { x: BOUNDARY_X, y: NAME_Y }),
  },
  metered: {
    name: words("budget.metered.name", METERED, { x: RIGHT, y: NAME_Y }),
    caption: words("budget.metered.caption", METERED_CAPTION, { x: RIGHT, y: CAPTION_Y }),
    yard: { key: "budget.yard", at: YARD, scale: FENCE_SCALE },
    agent: { key: "budget.agent", at: AGENT_AT, scale: 1 },
    meter: { key: "budget.meter", at: METER_AT, ticks: [1, 2, 3].map((i) => round(METER_AT.x + i * METER.cell)) },
    /** Only the cells a piece of work fills are parts; the fourth stays empty, the meter's outline round it. */
    cells: Array.from({ length: TOKEN.sent }, (_, i) => ({ key: `budget.cell.${i}`, at: cellAt(i) })),
    tokens: Array.from({ length: TOKEN.sent }, (_, i) => ({ key: `budget.token.${i}`, at: TOKEN_FROM, travel: tokenTo(i) })),
    paid: words("budget.paid", PAID, { x: METER_AT.x, y: METER_AT.y + METER.h + 18 + LABEL_LINE / 2 }),
  },
  table: {
    key: "budget.table",
    c: TABLE_C,
    scale: TABLE_SCALE,
    reach: TABLE_REACH,
    name: words("budget.table.name", TABLE_NAME, { x: BOUNDARY_X + TABLE_REACH + 26, y: TABLE_C.y - LABEL_LINE / 2 }),
    caption: words("budget.table.caption", TABLE_CAPTION, { x: BOUNDARY_X + TABLE_REACH + 26, y: TABLE_C.y + LABEL_LINE / 2 }),
  },
} as const;

const B = BUDGET;
const name = (w: Words, anchor: "start" | "middle" = "start") => setBox(w.at, w.text, anchor, true);
const caption = (w: Words) => setBox(w.at, w.text, "start");

/** Every place the slide draws in, for the layout's tests: each drawing and each run of words. */
export const BUDGET_PARTS = {
  seats: [name(B.seats.name), caption(B.seats.caption), caption(B.seats.included)],
  people: B.seats.people.map((p) => p.at),
  badges: B.seats.people.map((p) => p.badge.at),
  boundary: BOUNDARY,
  boundaryName: name(B.boundary.name, "middle"),
  metered: [name(B.metered.name), caption(B.metered.caption)],
  yard: fenceBox(YARD, FENCE_SCALE),
  agent: box(AGENT_AT.x - AGENT.w / 2, AGENT_AT.y, AGENT.w, AGENT.h),
  meter: METER_AT,
  token: box(TOKEN_FROM.x - TOKEN.r, TOKEN_FROM.y - TOKEN.r, 2 * TOKEN.r, 2 * TOKEN.r),
  paid: caption(B.metered.paid),
  table: box(TABLE_C.x - TABLE_REACH, TABLE_C.y - TABLE_REACH, 2 * TABLE_REACH, 2 * TABLE_REACH),
  tableWords: [name(B.table.name), caption(B.table.caption)],
} as const;
