/**
 * Slide 8's places: the hexagon agent at the left, its caption under it;
 * the shared gate at the centre, closed, named under it, its two bars two
 * lanes: the upper bar's lane for the first card, the lower bar's for the
 * second; the first card's words over its stop and the second card's
 * beside its stop; the second card's place just past the far post, and
 * past that the staff figure's place, the orange mark over them with their
 * words on two lines; the record folder at the far right, its words under it;
 * and under the gate's far side the ledger, headed, with room for two
 * lines. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { gatePaths, AGENT, GATE } from "../department-map";
import { LABEL_LINE, SAFE, contentTop, layerOf, round } from "./layout";

const [HONEST, CHECK, LOG, DELETE, BLOCKED, INTACT, DIFFERENT, WAIT] = shown("enforce", "play");

/** Where the slide's drawing may start: under its story band. */
export const TOP = contentTop("enforce");

/**
 * The line the agent, the gate, the figure and the record stand on: low
 * enough that the gate's lower bar, swung up, still ends under where
 * drawing may start, and high enough to leave a row under it for the
 * captions and the ledger.
 */
const FLOOR = 836;

/* The gate */

/** The department map's gate at three times its size: 120 px tall, 216 px across, its bars at 84 px and 36 px over the floor. */
export const GATE_SCALE = 3;
/** The gate stands a little left of the stage's middle, leaving the far side room for the figure, the second card and the record. */
const GATE_X = 1000;
const gate = gatePaths({ x: GATE_X, y: FLOOR }, GATE_SCALE);
const [UPPER_BAR, LOWER_BAR] = gate.arms;
/** The bars' heights, read from the shared gate: 12 and 28 of its 40. */
const [UPPER_Y, LOWER_Y] = GATE.bars.map((bar) => round(gate.at.y + bar * GATE_SCALE));

/* The cards */

/** A card: 128 by 48, wide enough to hold its stamped word inside its edge. */
export const CARD = { w: 128, h: 48 } as const;
/**
 * The two lanes: the first card rides centred 8 px over the upper bar, the
 * second 6 px under the lower one, so each card crosses its own bar and
 * the two keep 14 px apart while the second stays clear of the floor.
 */
const LANE = { upper: UPPER_Y - 8, lower: LOWER_Y + 6 } as const;

/* The agent */

/** The agent at one and a half times the department map's: 105 by 134, both lanes leaving its side. */
export const AGENT_SCALE = 1.5;
const AGENT_X = 240;
const AGENT_TOP: Point = { x: AGENT_X, y: round(FLOOR - AGENT.h * AGENT_SCALE) };
const AGENT_RIGHT = AGENT_X + (AGENT.w * AGENT_SCALE) / 2;

/** Each card sets off 16 px clear of the agent's side, and stops 20 px short of the gate's near post. */
const START_X = round(AGENT_RIGHT + 16);
const STOP_X = gate.at.x - 20 - CARD.w;
/** The second card's stop past the gate: 16 px clear of the far post, short of the figure, so it never crosses them. */
const BEYOND_X = gate.at.x + gate.at.w + 16;
const cardAt = (lane: number): Box => box(START_X, lane - CARD.h / 2, CARD.w, CARD.h);

/* The figure and the mark */

/** The staff figure at cast scale, 76 by 100, standing on the floor 16 px past the second card's stop; it steps in from 72 px further on. */
const FIGURE = box(BEYOND_X + CARD.w + 16, FLOOR - 100, 76, 100);
const STEP_IN = 72;
/** The mark 12 px over the figure's head, its words on two lines 16 px off its ring, centred on it. */
const MARK_R = 24;
const MARK: Point = { x: FIGURE.x + FIGURE.w / 2, y: FIGURE.y - 12 - MARK_R };

/* The record */

/** The record folder: 150 by 96, standing on the floor at the stage's right, its right edge 14 px in from the safe line. */
const RECORD = box(SAFE.right - 14 - 150, FLOOR - 96, 150, 96);

/* The ledger */

/** The ledger under the gate's far side: 300 by 110, 20 px under the floor, wide enough for its heading, its heading inside its top and two lines under that. */
const LEDGER = box(1140, FLOOR + 20, 300, 110);
const LEDGER_PAD = 16;

/** Captions sit 32 px under the floor, their middles one label line under it. */
const UNDER = FLOOR + 32;

export const ENFORCE = {
  ...layerOf("enforce"),
  floor: FLOOR,
  agent: { key: "enforce.agent", top: AGENT_TOP, scale: AGENT_SCALE, caption: { key: "enforce.agent.caption", text: HONEST, at: { x: AGENT_X, y: UNDER } as Point } },
  gate: {
    key: "enforce.gate",
    posts: gate.posts,
    upper: UPPER_BAR,
    lower: LOWER_BAR,
    at: gate.at,
    bars: { upper: UPPER_Y, lower: LOWER_Y },
    /** The lower bar, which swings up about the near post (`open`). */
    swing: "enforce.gate.swing",
    name: { key: "enforce.gate.name", text: CHECK, at: { x: GATE_X, y: UNDER } as Point },
  },
  cards: {
    blocked: {
      key: "enforce.card.0",
      at: cardAt(LANE.upper),
      stop: STOP_X - START_X,
      /** Its words over its stop, ending 12 px short of its right edge, clear of the lower bar once it swings up along the near post. */
      words: { key: "enforce.card.0.words", text: DELETE, at: { x: STOP_X + CARD.w - 12, y: LANE.upper - CARD.h / 2 - 12 - LABEL_LINE / 2 } as Point },
      /** The stamped word, on the card's face once it has stopped, under the card's top rule. */
      stamp: { key: "enforce.card.0.stamp", text: BLOCKED, at: { x: STOP_X + CARD.w / 2, y: LANE.upper + 6 } as Point },
    },
    approved: {
      key: "enforce.card.1",
      at: cardAt(LANE.lower),
      stop: STOP_X - START_X,
      beyond: BEYOND_X - START_X,
      /** Its words on two lines beside its stop, ending 20 px short of its left edge; they fade as it passes, its wait over. */
      words: { key: "enforce.card.1.words", lines: breakAfter(DIFFERENT, "action"), at: { x: STOP_X - 20, y: LANE.lower - LABEL_LINE / 2 } as Point },
    },
  },
  staff: { key: "enforce.staff", figure: "enforce.staff.figure", at: FIGURE, stepIn: STEP_IN },
  mark: { key: "enforce.mark", at: MARK, r: MARK_R, words: { key: "enforce.mark.words", lines: breakAfter(WAIT, "person"), at: { x: MARK.x + MARK_R + 16, y: MARK.y - LABEL_LINE / 2 } as Point } },
  record: { key: "enforce.record", at: RECORD, words: { key: "enforce.record.words", text: INTACT, at: { x: RECORD.x + RECORD.w, y: UNDER } as Point } },
  ledger: {
    key: "enforce.ledger",
    at: LEDGER,
    heading: { key: "enforce.ledger.heading", text: LOG, at: { x: LEDGER.x + LEDGER_PAD, y: LEDGER.y + 26 } as Point },
    /** The heading's rule, then a line for each thing that happens: the blocked request, then the approved action. */
    rule: LEDGER.y + 46,
    lines: [0, 1].map((i) => ({ key: `enforce.ledger.line.${i}`, from: { x: LEDGER.x + LEDGER_PAD, y: LEDGER.y + 72 + i * 24 } as Point, to: LEDGER.x + LEDGER.w - LEDGER_PAD })),
  },
};
