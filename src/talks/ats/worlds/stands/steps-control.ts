/**
 * Slide 11a's click: the title, then both story lines together, and after
 * the reading pause the picture. The member of staff draws on with the
 * card beside them, their words with them, and the honesty caption with
 * them. The route draws out of them and forks; both gates land on their
 * branches, the screen and the record draw on the upper one, each with its
 * words. The card rides the upper branch at one speed: it reaches the gate,
 * the gate opens, it rides on to the screen, rests, and rides behind the
 * screen to the record, whose lines draw in as it arrives. A second card
 * rides the lower branch and stops dead at the closed gate; after a still
 * moment the reviewer draws on past the gate, named; the magnifier comes
 * up in their hand, moves over the card once and comes back to rest in
 * their hand; the orange mark lands, its
 * words with it; and last the line draws from the mark back up into the
 * upper branch, before the screen.
 */
import type { StepDef } from "@/components/deck/engine";
import type { PartMove } from "@/components/deck/engine/types";
import { draw, mark, open, rise, show, type Point } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { CONTROL } from "./layout-control";
import { into, land, play, travel } from "./moves";

const C = CONTROL;
const [UPPER, LOWER] = C.cards;

/** A card rides at 700 px a second; a route draws at 1100. */
const SPEED = 700;
const DRAW_SPEED = 1100;
/** The card rests this long at the screen; the stopped card is this still before the reviewer comes. */
const REST = 0.4;
export const STILL = 0.6;
/** The gate opens in the kit's base time. */
const OPEN = 0.75;

const apart = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);
const drawFor = (length: number) => Math.max(0.3, length / DRAW_SPEED);

/**
 * A card's ride from `from` through `stops`, from `at`: every leg at the
 * one speed and without easing, so the card moves as one steady thing; the
 * last leg eases out over twice its plain time, so it arrives at the same
 * speed and slows to its stop, unless `dead`, when it stops as it reaches
 * it. Returns the moves and when the card stops.
 */
const ride = (key: string, from: Point, stops: readonly Point[], at: number, dead = false): { moves: PartMove[]; end: number } => {
  let t = at;
  let here = from;
  const moves = stops.flatMap((stop, i) => {
    const last = i === stops.length - 1;
    const plain = apart(here, stop) / SPEED;
    const duration = last && !dead ? 2 * plain : plain;
    const move = travel(key, stop, { at: t, duration, ease: last && !dead ? "power1.out" : "none" });
    t += duration;
    here = stop;
    return move;
  });
  return { moves, end: t };
};

/* The timeline, in the picture's own seconds. */

const STEM = 0.8;
const BRANCHES = STEM + drawFor(C.routes.stem.length);
const GATES = 1.5;
const SCREEN = 1.9;
const LEDGER = 2.3;

const ORIGIN: Point = { x: 0, y: 0 };
const up = UPPER.stops;
const toGate = ride(UPPER.key, ORIGIN, [up.fork, up.branch, up.gate], 2.9);
const GATE_OPENS = toGate.end;
const toScreen = ride(UPPER.key, up.gate, [up.screen], GATE_OPENS + OPEN);
const toLedger = ride(UPPER.key, up.screen, [up.ledger], toScreen.end + REST);
/** The record's lines draw in as the card slows into it. */
const LINES = toLedger.end - 0.3;

const SECOND = toLedger.end + 0.3;
const lo = LOWER.stops;
const toClosed = ride(LOWER.key, ORIGIN, [lo.fork, lo.branch, lo.gate], SECOND + 0.35, true);
export const STOPPED = toClosed.end;
export const REVIEWER = STOPPED + STILL;
const LENS = REVIEWER + 0.5;
const LENS_MOVES = LENS + 0.3;
/** Each of the magnifier's legs, out to the card and back to the hand, eases into its stop over twice its plain time; it holds over the card a moment between. */
const LENS_TIME = (2 * Math.hypot(C.lens.to.x, C.lens.to.y)) / SPEED;
const LENS_HOLD = 0.3;
const LENS_BACK = LENS_MOVES + LENS_TIME + LENS_HOLD;
const MARK = LENS_BACK + LENS_TIME + 0.2;
const JOIN = MARK + 0.6;

export const control = (): StepDef[] =>
  picture("control", {
    play: play([
      into("control"),
      { moves: [story("control", 0), story("control", 1)] },
      {
        moves: [
          // The member of staff and their card, named; the honesty caption with them.
          draw(C.staff.key, { at: 0, duration: 0.6 }),
          rise(C.honesty.key, { at: 0, duration: 0.6 }),
          rise(C.staff.name.key, { at: 0.1, duration: 0.6 }),
          rise(C.staff.caption.key, { at: 0.2, duration: 0.6 }),
          show(UPPER.key, { at: 0.35, duration: 0.3 }),
          // The route out of them, forking.
          draw(C.routes.stem.key, { at: STEM, duration: drawFor(C.routes.stem.length), ease: "none" }),
          draw(C.routes.upper.key, { at: BRANCHES, duration: drawFor(C.routes.upper.length), ease: "none" }),
          draw(C.routes.lower.key, { at: BRANCHES, duration: drawFor(C.routes.lower.length), ease: "none" }),
          // Both gates on their branches, each named.
          ...land(C.gates.open.key, GATES, 0.5),
          rise(C.gates.open.name.key, { at: GATES + 0.05, duration: 0.5 }),
          ...land(C.gates.closed.key, GATES + 0.1, 0.5),
          rise(C.gates.closed.name.key, { at: GATES + 0.15, duration: 0.5 }),
          rise(C.gates.closed.caption.key, { at: GATES + 0.25, duration: 0.5 }),
          // The screen and the record on the upper branch, each with its words.
          draw(C.screen.key, { at: SCREEN, duration: 0.9 }),
          rise(C.screen.caption.key, { at: SCREEN + 0.05, duration: 0.6 }),
          draw(C.ledger.key, { at: LEDGER, duration: 0.75 }),
          rise(C.ledger.name.key, { at: LEDGER + 0.05, duration: 0.6 }),
          rise(C.ledger.caption.key, { at: LEDGER + 0.15, duration: 0.6 }),
          // The card to the gate; the gate opens; on to the screen, and behind it to the record.
          ...toGate.moves,
          ...open(C.gates.open.key, { at: GATE_OPENS, duration: OPEN }),
          ...toScreen.moves,
          ...toLedger.moves,
          ...C.ledger.lines.flatMap((line, i) => draw(line.key, { at: LINES + i * 0.12, duration: 0.35, ease: "none" })),
          // The second card, stopped dead at the closed gate.
          show(LOWER.key, { at: SECOND, duration: 0.3 }),
          ...toClosed.moves,
          // After a still moment, the reviewer; the magnifier over the card and back to the hand; the mark; the line back up.
          draw(C.reviewer.key, { at: REVIEWER, duration: 0.6 }),
          rise(C.reviewer.name.key, { at: REVIEWER + 0.05, duration: 0.6 }),
          show(C.lens.key, { at: LENS, duration: 0.3 }),
          ...travel(C.lens.key, C.lens.to, { at: LENS_MOVES, duration: LENS_TIME, ease: "power1.out" }),
          ...travel(C.lens.key, ORIGIN, { at: LENS_BACK, duration: LENS_TIME, ease: "power1.out" }),
          mark(C.mark.key, { at: MARK, duration: 0.6 }),
          rise(C.mark.words.key, { at: MARK + 0.05, duration: 0.6 }),
          draw(C.routes.join.key, { at: JOIN, duration: 0.6 }),
        ],
      },
    ]),
  });
