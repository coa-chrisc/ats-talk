/**
 * Slide 11a's click: the title, then both story lines together, and after
 * the reading pause the picture. The member of staff draws on with the
 * card beside them, their words with them, and the honesty caption with
 * them. The route draws out of them and forks; the upper branch runs into
 * the shelf, which draws on with its three screens and their name; the
 * closed gate lands on the lower branch, named. The card rides the upper
 * branch at one speed and stops short of the first screen; its socket
 * lights; the card slides into the screen and snaps up into its seat, the
 * socket's words with it. The boundary wipes round that screen, its words
 * with it; the record draws on under it, named, and its lines draw in one
 * by one while the card stays seated. Then a second card rides the lower
 * branch and stops dead at the closed gate; after a still moment the
 * reviewer draws on past the gate, named; the magnifier comes up in their
 * hand, moves over the card once and comes back to rest in their hand; the
 * orange mark lands, its words with it. Last the dashed slot wipes on at
 * the shelf's end with its grey socket; the socket fills orange; the
 * screen draws on in the slot and the dashes go.
 */
import type { StepDef } from "@/components/deck/engine";
import type { PartMove } from "@/components/deck/engine/types";
import { draw, fill, hide, mark, rise, show, wipe, type Point } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { CONTROL } from "./layout-control";
import { into, land, play, travel } from "./moves";

const C = CONTROL;
const [UPPER, LOWER] = C.cards;
const [FIRST, SECOND_TOOL, THIRD, ADDED] = C.tools;

/** A card rides at 700 px a second; a route draws at 1100. */
const SPEED = 700;
const DRAW_SPEED = 1100;
export const STILL = 0.6;

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
const SHELF = BRANCHES + drawFor(C.routes.upper.length);
const TOOLS = SHELF + 0.15;
const TOOL_GAP = 0.1;
const TOOL_TIME = 0.6;
const GATE = 1.6;
/** The card sets off once the third screen is drawn. */
const SETS_OFF = TOOLS + 2 * TOOL_GAP + TOOL_TIME;

const ORIGIN: Point = { x: 0, y: 0 };
const up = UPPER.stops;
const toShelf = ride(UPPER.key, ORIGIN, [up.fork, up.branch, up.shelf], SETS_OFF);
/** The socket lights as the card stops before the screen; the card slides in and snaps up into its seat. */
export const LIGHT = toShelf.end;
const SLIDE = LIGHT + 0.3;
const SLIDE_TIME = 0.35;
const SNAP = SLIDE + SLIDE_TIME;
const SNAP_TIME = 0.12;
export const SEATED = SNAP + SNAP_TIME;
/** The boundary round the screen; the record under it, its lines one by one. */
const BOUNDARY = SEATED + 0.1;
const RECORD = BOUNDARY + 0.4;
const LINES = RECORD + 0.25;
const LINE_GAP = 0.15;
const LINE_TIME = 0.3;
const RECORDED = LINES + (C.ledger.lines.length - 1) * LINE_GAP + LINE_TIME;

const SECOND = RECORDED + 0.3;
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
/** The slot at the shelf's end, its socket orange, the screen solid in it. */
const SLOT = MARK + 0.7;
const ORANGE = SLOT + 0.7;
const SOLID = ORANGE + 0.5;

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
          // The route out of them, forking; the shelf at the upper branch's end, its three screens on it, named.
          draw(C.routes.stem.key, { at: STEM, duration: drawFor(C.routes.stem.length), ease: "none" }),
          draw(C.routes.upper.key, { at: BRANCHES, duration: drawFor(C.routes.upper.length), ease: "none" }),
          draw(C.routes.lower.key, { at: BRANCHES, duration: drawFor(C.routes.lower.length), ease: "none" }),
          draw(C.shelf.key, { at: SHELF, duration: drawFor(C.shelf.length), ease: "none" }),
          ...[FIRST, SECOND_TOOL, THIRD].flatMap((tool, i) => draw(tool.key, { at: TOOLS + i * TOOL_GAP, duration: TOOL_TIME })),
          rise(C.shelf.name.key, { at: TOOLS + 0.05, duration: 0.6 }),
          // The closed gate on the lower branch, named.
          ...land(C.gate.key, GATE, 0.5),
          rise(C.gate.name.key, { at: GATE + 0.05, duration: 0.5 }),
          rise(C.gate.caption.key, { at: GATE + 0.15, duration: 0.5 }),
          // The card to the shelf; its socket lights; into the screen and up into its seat.
          ...toShelf.moves,
          ...fill(C.sockets.lit.key, { at: LIGHT, duration: 0.3 }),
          ...travel(UPPER.key, up.tool, { at: SLIDE, duration: SLIDE_TIME, ease: "power2.out" }),
          ...travel(UPPER.key, up.seat, { at: SNAP, duration: SNAP_TIME, ease: "power2.in" }),
          rise(C.fits.key, { at: SNAP, duration: 0.5 }),
          // The boundary round that screen; the record under it, its lines one by one.
          ...wipe(C.boundary.key, { at: BOUNDARY, duration: 0.5 }),
          rise(C.boundary.caption.key, { at: BOUNDARY + 0.1, duration: 0.5 }),
          draw(C.ledger.key, { at: RECORD, duration: 0.4 }),
          rise(C.ledger.name.key, { at: RECORD + 0.05, duration: 0.5 }),
          rise(C.ledger.caption.key, { at: RECORD + 0.15, duration: 0.5 }),
          ...C.ledger.lines.flatMap((line, i) => draw(line.key, { at: LINES + i * LINE_GAP, duration: LINE_TIME, ease: "none" })),
          // The second card, stopped dead at the closed gate.
          show(LOWER.key, { at: SECOND, duration: 0.3 }),
          ...toClosed.moves,
          // After a still moment, the reviewer; the magnifier over the card and back to the hand; the mark.
          draw(C.reviewer.key, { at: REVIEWER, duration: 0.6 }),
          rise(C.reviewer.name.key, { at: REVIEWER + 0.05, duration: 0.6 }),
          show(C.lens.key, { at: LENS, duration: 0.3 }),
          ...travel(C.lens.key, C.lens.to, { at: LENS_MOVES, duration: LENS_TIME, ease: "power1.out" }),
          ...travel(C.lens.key, ORIGIN, { at: LENS_BACK, duration: LENS_TIME, ease: "power1.out" }),
          mark(C.mark.key, { at: MARK, duration: 0.6 }),
          rise(C.mark.words.key, { at: MARK + 0.05, duration: 0.6 }),
          // The slot at the shelf's end with its grey socket; the socket orange; the screen solid in the slot.
          ...wipe(C.slot.key, { at: SLOT, duration: 0.6 }),
          show(C.sockets.added.key, { at: SLOT + 0.2, duration: 0.3 }),
          ...fill(C.sockets.added.key, { at: ORANGE, duration: 0.4 }),
          draw(ADDED.key, { at: SOLID, duration: 0.6 }),
          hide(C.slot.key, { at: SOLID + 0.3, duration: 0.3 }),
        ],
      },
    ]),
  });
