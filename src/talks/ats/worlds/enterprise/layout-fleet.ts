/**
 * Slide 5's places, the groups read left to right, every agent the deck's
 * one hexagon at the same size, their tops on one line, so what tells
 * their roles is their names and where they stand. Left: three lead agents
 * at a desk. Beside them: six builders in a row, and over the whole row a
 * line with the deck's closed gate standing on it, the permission
 * checker's name and caption over the gate. Then a thin dividing line,
 * named directly under its foot. Past it: two reviewers. Last: a person,
 * centred on the agents' middles, the approval mark under them with its
 * words to its right. The leads', builders' and reviewers' names and the
 * mark share one row. Words are read from the script, by position.
 *
 * The drawing has y 548 to 992: the checker's name and caption at the top
 * (572 and 612), the gate on its line under them (640 to 690), the agents'
 * tops at 720 and their feet at 791, the names' row at 868, and the
 * dividing line's name at 946.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { AGENT } from "../department-map";
import { contentTop, layerOf, round } from "./layout";

const [LEADS, BUILDERS, REVIEWERS, APART, KEYS, TOUCH, APPROVES] = shown("fleet-defined", "play");

const TOP = contentTop("fleet-defined");

/** Every agent: the map's hexagon at 0.8 of its size, 56 by 71, its top point on one line. */
export const AGENT_SCALE = 0.8;
const AGENT_TOP = TOP + 172;
const AGENT_MID = AGENT_TOP + (AGENT.h * AGENT_SCALE) / 2;
const topAt = (x: number): Point => ({ x, y: AGENT_TOP });

/** The row the groups' names and the mark sit on, 77 px under the agents' feet. */
const NAMES_Y = TOP + 320;

/** The leads: three agents 80 apart; the desk's top 9 px under their feet, 252 wide, its legs 32 px tall. */
const LEADS_X = [150, 230, 310] as const;
const DESK = { x0: 104, x1: 356, y: TOP + 252, legs: 32, inset: 24 } as const;

/** The builders: six agents 76 apart, centred on x 700. */
const BUILDERS_X0 = 510;
const BUILDER_PITCH = 76;
const BUILDERS_X = Array.from({ length: 6 }, (_, i) => BUILDERS_X0 + i * BUILDER_PITCH);
const BUILDERS_MID = (BUILDERS_X[0] + BUILDERS_X[5]) / 2;

/**
 * The permission checker: a line over the whole row of builders, 30 px over
 * their tops and 30 px past the outer builders' sides, and the closed gate
 * standing on it over the row's middle at 1.25 times the map's size (90
 * wide, 50 tall). Its name at the text size 24 px under the drawing's top,
 * its caption at the label size 40 px under that, both centred over the
 * gate.
 */
export const GATE_SCALE = 1.25;
const RULE = { x0: BUILDERS_X[0] - 58, x1: BUILDERS_X[5] + 58, y: AGENT_TOP - 30 } as const;

/** The dividing line: x 1010, from 20 px over the agents' tops to 52 px under the names' row, past their words; its name 26 px under its foot. */
const WALL = { x: 1010, y0: AGENT_TOP - 20, y1: NAMES_Y + 52 } as const;

/** The reviewers: two agents 80 apart, past the line. */
const REVIEWERS_X = [1130, 1210] as const;

/** The person: 56 by 96, centred on the agents' middles at x 1480; the mark on the names' row under them, its words to its right. */
const PERSON = box(1452, round(AGENT_MID - 48), 56, 96);
const MARK: Point = { x: PERSON.x + PERSON.w / 2, y: NAMES_Y };

export const FLEET = {
  ...layerOf("fleet-defined"),
  agentTop: AGENT_TOP,
  leads: {
    keys: LEADS_X.map((_, i) => `fleet-defined.lead.${i}`),
    at: LEADS_X.map(topAt),
    desk: { key: "fleet-defined.desk", ...DESK },
    name: { key: "fleet-defined.leads.name", text: LEADS, at: { x: (DESK.x0 + DESK.x1) / 2, y: NAMES_Y } as Point },
  },
  builders: {
    keys: BUILDERS_X.map((_, i) => `fleet-defined.builder.${i}`),
    at: BUILDERS_X.map(topAt),
    name: { key: "fleet-defined.builders.name", text: BUILDERS, at: { x: BUILDERS_MID, y: NAMES_Y } as Point },
  },
  checker: {
    rule: { key: "fleet-defined.rule", ...RULE },
    gate: { key: "fleet-defined.gate", foot: { x: BUILDERS_MID, y: RULE.y } as Point, scale: GATE_SCALE },
    name: { key: "fleet-defined.checker.name", text: KEYS, at: { x: BUILDERS_MID, y: TOP + 24 } as Point },
    caption: { key: "fleet-defined.checker.caption", text: TOUCH, at: { x: BUILDERS_MID, y: TOP + 64 } as Point },
  },
  wall: { key: "fleet-defined.wall", ...WALL, name: { key: "fleet-defined.wall.name", text: APART, at: { x: WALL.x, y: WALL.y1 + 26 } as Point } },
  reviewers: {
    keys: REVIEWERS_X.map((_, i) => `fleet-defined.reviewer.${i}`),
    at: REVIEWERS_X.map(topAt),
    name: { key: "fleet-defined.reviewers.name", text: REVIEWERS, at: { x: (REVIEWERS_X[0] + REVIEWERS_X[1]) / 2, y: NAMES_Y } as Point },
  },
  person: { key: "fleet-defined.person", at: PERSON },
  mark: { key: "fleet-defined.mark", text: APPROVES, at: MARK },
};
