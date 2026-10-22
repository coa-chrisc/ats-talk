/**
 * Slide 4a's places: one stream of work read left to right on one flow
 * line. At the left, three of the deck's hexagon agents in a column; in
 * the middle, the box of checks every document passes through; at the
 * right, the tray of finished work, an 8 by 3 grid of slots that the
 * stream fills, row by row, to the last slot. Under the checks, the tray
 * for exceptions, which branch down before they are finished; under the
 * finished work, the tray for audit samples, which copies of finished
 * documents go down to afterwards, so the grid stays full. Between the two
 * lower trays, in a column of its own with at least 40 px clear either
 * side, the person, the orange mark under them and its name under that.
 * The illustrative caption sits at the drawing's foot, at the left. Words
 * are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { AGENT } from "../department-map";
import { LABEL_LINE, TEXT_LINE, agentBox, contentTop, layerOf, wordsWidth } from "./layout";

const [source, forecast, scope, agents, checks, methods, completed, exceptions, before, samples, after, oversight, illustrative] = shown("review", "play");
export const TOP = contentTop("review");

/** A document: a card 26 by 30, placed by its top left corner. */
export const DOC = { w: 26, h: 30 } as const;
/** The flow line every document runs along, and the row the groups' names sit on, 24 px under the drawing's top at the text size, with the checks' caption under its name. */
const FLOW_Y = TOP + 152;
const NAME_Y = TOP + 24;
const METHODS_Y = NAME_Y + 40;

/** The three columns' middles: the agents, the checks (with the exceptions under them), the finished work (with the audit tray under it). */
const AGENTS_X = 220;
const CHECK_X = 840;
const DONE_X = 1540;
/** The person's column, between the two lower trays. */
const HUMAN_X = 1210;

/** The agents: the map's hexagon at a little over half size, one over another, 62 apart, the middle one on the flow line. */
export const AGENT_SCALE = 0.55;
const AGENT_PITCH = 62;
const agentTops = [-1, 0, 1].map((k): Point => ({ x: AGENTS_X, y: FLOW_Y + k * AGENT_PITCH - (AGENT.h * AGENT_SCALE) / 2 }));
/** Where each agent's documents start: just right of it, level with its middle. */
const originOf = (i: number): Point => ({ x: AGENTS_X + 42, y: FLOW_Y + ((i % 3) - 1) * AGENT_PITCH - DOC.h / 2 });

/** The checks: a box 220 by 88 on the flow line; a document passes its middle. */
const CHECK = box(CHECK_X - 110, FLOW_Y - 44, 220, 88);
const THROUGH: Point = { x: CHECK_X - DOC.w / 2, y: FLOW_Y - DOC.h / 2 };

/** The finished work: 8 slots to a row, 3 rows, 52 apart across and 44 down, centred on the flow line, in a tray 24 px wider each side and 20 px taller. */
const GRID = { cols: 8, rows: 3, dx: 52, dy: 44 } as const;
const GRID_W = (GRID.cols - 1) * GRID.dx + DOC.w;
const GRID_H = (GRID.rows - 1) * GRID.dy + DOC.h;
const GRID_X = DONE_X - GRID_W / 2;
const GRID_Y = FLOW_Y - GRID_H / 2;
const slotAt = (n: number): Point => ({ x: GRID_X + (n % GRID.cols) * GRID.dx, y: GRID_Y + Math.floor(n / GRID.cols) * GRID.dy });
const DONE_TRAY = box(GRID_X - 24, GRID_Y - 20, GRID_W + 48, GRID_H + 40);
export const SLOTS = GRID.cols * GRID.rows;

/** The two lower trays: 64 tall, their names under them on one row and their captions under those; three slots each, 52 apart. */
const LOW = { y: TOP + 258, h: 64, name: TOP + 348, caption: TOP + 382, slotDrop: 17 } as const;
const lowTray = (x: number, w: number) => box(x - w / 2, LOW.y, w, LOW.h);
const lowSlot = (x: number, j: number): Point => ({ x: x + (j - 1) * 52 - DOC.w / 2, y: LOW.y + LOW.slotDrop });
const EXCEPTION_TRAY = lowTray(CHECK_X, 230);
const AUDIT_TRAY = lowTray(DONE_X, 250);
/** Where an exception turns: straight down from the checks, short of its tray, before it goes to its slot. */
const DROP_Y = LOW.y - 26;

/** The person: 46 by 78, standing a little under the finished tray's foot; the mark 40 px under them and its name 48 px under the mark, on the lower trays' caption row. */
const PERSON = box(HUMAN_X - 23, LOW.y - 34, 46, 78);
const MARK: Point = { x: HUMAN_X, y: LOW.y + 84 };
const OVERSIGHT_Y = LOW.caption + 8;

/** The stream: a trickle of three, one from each agent, then the rest at shorter intervals; three of them exceptions, the rest filling the grid in order. */
const EXCEPTIONS = [6, 14, 21] as const;
const COUNT = SLOTS + EXCEPTIONS.length;
export const TRAVEL = { appear: 0.1, toCheck: 0.8, toSlot: 0.7, drop: 0.5, toTray: 0.4 } as const;
const startOf = (i: number) => (i < 3 ? i * 0.55 : 1.5 + (i - 3) * 0.12);

export const WORK = Array.from({ length: COUNT }, (_, i) => {
  const exception = EXCEPTIONS.indexOf(i as (typeof EXCEPTIONS)[number]);
  const slot = exception >= 0 ? -1 : i - EXCEPTIONS.filter((e) => e < i).length;
  return {
    key: `review.item.${i}`,
    index: i,
    exception,
    slot,
    start: startOf(i),
    origin: originOf(i),
    through: THROUGH,
    /** An exception's turn under the checks, before its tray. */
    drop: exception >= 0 ? ({ x: THROUGH.x, y: DROP_Y } as Point) : undefined,
    end: exception >= 0 ? lowSlot(CHECK_X, exception) : slotAt(slot),
  };
});

/** When the last document lands, and when the audit starts: once the stream has stopped. */
export const STREAM_END = Math.max(...WORK.map((item) => item.start + TRAVEL.appear + TRAVEL.toCheck + (item.exception >= 0 ? TRAVEL.drop + TRAVEL.toTray : TRAVEL.toSlot)));
export const AUDIT_AT = Math.round((STREAM_END + 0.35) * 10) / 10;
/** The audit: copies of three finished documents, one from each row, rise off their slots and go down to the audit tray, 0.3 s apart. */
const SAMPLED = [2, 13, 19] as const;
export const SAMPLES = SAMPLED.map((slot, j) => ({ key: `review.sample.${j}`, slot, from: slotAt(slot), end: lowSlot(DONE_X, j), at: AUDIT_AT + j * 0.3 }));

const words = (at: Point, text: string, size: 26 | 32, anchor: "start" | "middle" = "middle"): Box => {
  const w = wordsWidth(text, size);
  const h = size === 32 ? TEXT_LINE : LABEL_LINE;
  return box(anchor === "start" ? at.x : at.x - w / 2, at.y - h / 2, w, h);
};
const label = (text: string, at: Point, anchor: "start" | "middle" = "middle") => ({ text, at, anchor });

export const REVIEW = {
  ...layerOf("review"),
  forecast: { key: "review.context", at: box(1370, 146, 454, 196), source, forecast, scope },
  stage: "review.stage",
  audit: "review.audit",
  person: "review.person",
  human: { key: "review.human", at: PERSON },
  mark: MARK,
  agents: agentTops.map((at, i) => ({ key: `review.agent.${i}`, at })),
  check: CHECK,
  flow: { x0: originOf(1).x, x1: DONE_TRAY.x, y: FLOW_Y },
  trays: { done: DONE_TRAY, exceptions: EXCEPTION_TRAY, audit: AUDIT_TRAY },
  /** The arrow down from the checks to the exceptions' tray, and the dashed link down from the finished tray to the audit tray. */
  down: { x: CHECK_X, y0: CHECK.y + CHECK.h + 4, y1: EXCEPTION_TRAY.y - 8 },
  link: { x: DONE_X, y0: DONE_TRAY.y + DONE_TRAY.h + 4, y1: AUDIT_TRAY.y - 8 },
  words: {
    agents: label(agents, { x: AGENTS_X, y: NAME_Y }),
    checks: label(checks, { x: CHECK_X, y: NAME_Y }),
    methods: label(methods, { x: CHECK_X, y: METHODS_Y }),
    completed: label(completed, { x: DONE_X, y: NAME_Y }),
    exceptions: label(exceptions, { x: CHECK_X, y: LOW.name }),
    before: label(before, { x: CHECK_X, y: LOW.caption }),
    samples: label(samples, { x: DONE_X, y: LOW.name }),
    after: label(after, { x: DONE_X, y: LOW.caption }),
    oversight: label(oversight, { x: HUMAN_X, y: OVERSIGHT_Y }),
    illustrative: label(illustrative, { x: 96, y: TOP + 428 }, "start"),
  },
};

/** Each word's box: the groups' names at the text size, the rest at the label size. */
export const wordBoxes = () => {
  const W = REVIEW.words;
  const big = new Set([W.agents, W.checks, W.completed]);
  return Object.fromEntries(Object.entries(W).map(([name, entry]) => [name, words(entry.at, entry.text, big.has(entry) ? 32 : 26, entry.anchor)])) as Record<keyof typeof W, Box>;
};
/** What each of the slide's groups fills, for the tests: the agents, the checks, the finished work, the two lower trays with their words, the person's column, the caption. */
export const reviewZones = () => {
  const B = wordBoxes();
  const R = REVIEW;
  const around = (boxes: Box[]): Box => {
    const x = Math.min(...boxes.map((b) => b.x));
    const y = Math.min(...boxes.map((b) => b.y));
    return box(x, y, Math.max(...boxes.map((b) => b.x + b.w)) - x, Math.max(...boxes.map((b) => b.y + b.h)) - y);
  };
  return {
    agents: around([B.agents, ...R.agents.map((agent) => agentBox(agent.at, AGENT_SCALE))]),
    checks: around([B.checks, B.methods, R.check]),
    done: around([B.completed, R.trays.done]),
    exceptions: around([R.trays.exceptions, B.exceptions, B.before]),
    audit: around([R.trays.audit, B.samples, B.after]),
    human: around([R.human.at, box(MARK.x - 24, MARK.y - 24, 48, 48), B.oversight]),
    illustrative: B.illustrative,
  };
};
