/**
 * Slide 11a's places: a member of staff at the drawing's left with a card,
 * named under them; the route out of them forking into an upper and a
 * lower branch, the fork near the field's middle. On the upper branch the
 * gate (department-map.ts) that opens, named over it; slide 11's screen,
 * its caption over it; and the record at the branch's end, named over it.
 * On the lower branch the gate that stays closed, named under it; the
 * reviewer past it, named under the line; the magnifier in the reviewer's
 * hand; the orange mark beside the reviewer, its words beside it; and the
 * line from the mark back up into the upper branch, before the screen.
 * Nothing is named in the band between the branches. The honesty caption at the
 * drawing's lower left. A card travels along a branch by `--x` and `--y`
 * from where it is drawn, at the staff, its foot 4 px over the line. Words
 * are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { GATE, gatePaths } from "../department-map";
import { LABEL_LINE, SAFE, contentTop, layerOf, round, wordsWidth } from "./layout";

const [NEED, NEED_CAPTION, FITS, USE, VISIBILITY, TRACK, NO_FIT, REQUEST, REVIEW, APPROVE, HONESTY] = shown("control", "play");

const TOP = contentTop("control");
/** Rows of words are this far apart. */
export const PITCH = LABEL_LINE;

/** The upper branch's line, as high as the words over the open gate and the record allow; the stem 60 under it and the lower 60 under that; the fork 340 px in, each branch rising or falling 60 px over 60 px. */
const UPPER = TOP + 192;
export const LINE = { upper: UPPER, stem: UPPER + 60, lower: UPPER + 120 } as const;
export const FORK = { x: 340, run: LINE.stem - LINE.upper } as const;
export const BRANCH_X = FORK.x + FORK.run;
/** A branch's slanted run, rising or falling at 45 degrees. */
const DIAGONAL = round(FORK.run * Math.SQRT2);

/** A card: a small document 40 by 50, riding with its foot 4 px over the line. */
export const CARD = { w: 40, h: 50, lift: 4 } as const;
/** The card's middle sits this far over the line it rides. */
const RIDE = CARD.lift + CARD.h / 2;

/* The staff, and where the cards start */

/** The staff, cast scale, standing on the stem at the drawing's left; the card beside them, 8 px off. */
const STAFF = box(SAFE.left, LINE.stem - 100, 76, 100);
const START: Point = { x: STAFF.x + STAFF.w + 8 + CARD.w / 2, y: LINE.stem };
const cardAt = (foot: Point): Box => box(round(foot.x - CARD.w / 2), round(foot.y - RIDE - CARD.h / 2), CARD.w, CARD.h);

/* The gates */

/** Both gates at 1.4 of the department map's, in one column 640 px across the stage. */
export const GATE_SCALE = 1.4;
const GATE_X = 640;
const upperGate = gatePaths({ x: GATE_X, y: LINE.upper }, GATE_SCALE);
const lowerGate = gatePaths({ x: GATE_X, y: LINE.lower }, GATE_SCALE);
/** A card stops this far short of what it reaches, in plain sight. */
export const GAP = 24;
const AT_GATE = round(upperGate.at.x - GAP - CARD.w / 2);
/** The open gate's boom: its upper bar stood up over the left post, reaching the gate's width over where it crossed. */
const BOOM_TOP = round(upperGate.at.y + GATE.bars[0] * GATE_SCALE - upperGate.at.w);

/* The screen and the record */

/** Slide 11's screen: a monitor 126 by 88 on a neck 20 tall, its base 170 wide from 21 px left of it; the panel in it and its three lines. Its middle level with a riding card's. */
export const SCREEN = { w: 126, h: 88, neck: 20, base: { dx: -21, w: 170 }, panel: { x: 28, y: 22, w: 69, h: 45 }, lines: [[40, 35, 43], [40, 46, 32], [40, 57, 38]] } as const;
const SCREEN_X = 1270;
const SCREEN_AT = box(SCREEN_X - SCREEN.w / 2, LINE.upper - RIDE - SCREEN.h / 2, SCREEN.w, SCREEN.h);
const AT_SCREEN = SCREEN_AT.x - GAP - CARD.w / 2;

/** The record: a page 80 by 96 at the upper branch's end, its middle level with a riding card's; four lines in it, the last shorter. */
export const LEDGER = { w: 80, h: 96, inset: 16, first: 22, pitch: 18, lines: [1, 1, 1, 0.6] } as const;
const LEDGER_AT = box(1620, LINE.upper - RIDE - LEDGER.h / 2, LEDGER.w, LEDGER.h);
const AT_LEDGER = LEDGER_AT.x - GAP - CARD.w / 2;
/** The record's name and caption, three rows, end 16 px over it. */
const LEDGER_NAME_Y = round(LEDGER_AT.y - 16 - LABEL_LINE / 2 - 2 * PITCH);

/* The reviewer, the magnifier and the mark */

/** The reviewer, cast scale, standing on the lower branch far enough past the closed gate that their name, under them, keeps clear of the gate's words. */
const REVIEWER = box(950, LINE.lower - 100, 76, 100);
/** The magnifier's lens, 18 across the radius, in the reviewer's hand, where it comes back to rest; it travels to over the stopped card's top half and back. */
export const LENS = { r: 18, handle: 16 } as const;
const LENS_AT: Point = { x: REVIEWER.x - 20, y: LINE.lower - 36 };
const LENS_TO: Point = { x: AT_GATE, y: LINE.lower - RIDE - 7 };
/** The mark beside the reviewer, 52 px past it and 10 px over the line; its words 44 px past the mark's middle. */
const MARK: Point = { x: REVIEWER.x + REVIEWER.w + 52, y: LINE.lower - 34 };

/** An offset from the start, for `travel`. */
const from = (p: Point): Point => ({ x: round(p.x - START.x), y: round(p.y - START.y) });

/** The upper card's stops: the fork, the branch's top, the gate, the screen and the record. */
const UPPER_STOPS = {
  fork: from({ x: FORK.x, y: LINE.stem }),
  branch: from({ x: BRANCH_X, y: LINE.upper }),
  gate: from({ x: AT_GATE, y: LINE.upper }),
  screen: from({ x: AT_SCREEN, y: LINE.upper }),
  ledger: from({ x: AT_LEDGER, y: LINE.upper }),
};
/** The lower card's: the fork, the branch's foot and the closed gate. */
const LOWER_STOPS = {
  fork: from({ x: FORK.x, y: LINE.stem }),
  branch: from({ x: BRANCH_X, y: LINE.lower }),
  gate: from({ x: AT_GATE, y: LINE.lower }),
};

/** The line from the mark back up: from 4 px over the mark's ring, up to 24 px under the upper branch, and round into it. */
const JOIN_TOP = MARK.y - 24 - 4;

export const CONTROL = {
  ...layerOf("control"),
  staff: {
    key: "control.staff",
    at: STAFF,
    name: { key: "control.staff.name", text: NEED, at: { x: SAFE.left, y: LINE.stem + 36 } as Point },
    caption: { key: "control.staff.caption", text: NEED_CAPTION, rows: breakAfter(NEED_CAPTION, "identify"), at: { x: SAFE.left, y: LINE.stem + 36 + PITCH } as Point },
  },
  cards: [
    { key: "control.card.0", at: cardAt(START), stops: UPPER_STOPS },
    { key: "control.card.1", at: cardAt(START), stops: LOWER_STOPS },
  ] as const,
  routes: {
    stem: { key: "control.route.stem", d: `M${STAFF.x + STAFF.w + 4} ${LINE.stem}H${FORK.x}`, length: FORK.x - (STAFF.x + STAFF.w + 4) },
    upper: { key: "control.route.upper", d: `M${FORK.x} ${LINE.stem}L${BRANCH_X} ${LINE.upper}H${LEDGER_AT.x}`, length: round(DIAGONAL + LEDGER_AT.x - BRANCH_X) },
    lower: { key: "control.route.lower", d: `M${FORK.x} ${LINE.stem}L${BRANCH_X} ${LINE.lower}H${REVIEWER.x + REVIEWER.w}`, length: round(DIAGONAL + REVIEWER.x + REVIEWER.w - BRANCH_X) },
    join: { key: "control.route.join", d: `M${MARK.x} ${JOIN_TOP}V${LINE.upper + 24}Q${MARK.x} ${LINE.upper} ${MARK.x + 24} ${LINE.upper}`, joins: { x: MARK.x + 24, y: LINE.upper } as Point, length: round(JOIN_TOP - LINE.upper - 24 + 12 * Math.PI) },
  },
  gates: {
    open: {
      key: "control.gate.open",
      foot: { x: GATE_X, y: LINE.upper } as Point,
      paths: upperGate,
      boomTop: BOOM_TOP,
      name: { key: "control.gate.open.name", text: FITS, at: { x: GATE_X, y: BOOM_TOP - 16 - LABEL_LINE / 2 } as Point },
    },
    closed: {
      key: "control.gate.closed",
      foot: { x: GATE_X, y: LINE.lower } as Point,
      paths: lowerGate,
      name: { key: "control.gate.closed.name", text: NO_FIT, at: { x: GATE_X, y: LINE.lower + 36 } as Point },
      caption: { key: "control.gate.closed.caption", text: REQUEST, at: { x: GATE_X, y: LINE.lower + 36 + PITCH } as Point },
    },
  },
  screen: {
    key: "control.screen",
    at: SCREEN_AT,
    caption: { key: "control.screen.caption", text: USE, rows: breakAfter(USE, "allowed"), at: { x: SCREEN_X, y: round(SCREEN_AT.y - 23 - LABEL_LINE / 2 - PITCH) } as Point },
  },
  ledger: {
    key: "control.ledger",
    at: LEDGER_AT,
    lines: LEDGER.lines.map((share, i) => {
      const y = LEDGER_AT.y + LEDGER.first + i * LEDGER.pitch;
      const x0 = LEDGER_AT.x + LEDGER.inset;
      return { key: `control.ledger.line.${i}`, d: `M${x0} ${y}H${round(x0 + (LEDGER.w - 2 * LEDGER.inset) * share)}` };
    }),
    name: { key: "control.ledger.name", text: VISIBILITY, at: { x: LEDGER_AT.x + LEDGER.w / 2, y: LEDGER_NAME_Y } as Point },
    caption: { key: "control.ledger.caption", text: TRACK, rows: breakAfter(TRACK, "access,"), at: { x: LEDGER_AT.x + LEDGER.w / 2, y: LEDGER_NAME_Y + PITCH } as Point },
  },
  reviewer: {
    key: "control.reviewer",
    at: REVIEWER,
    name: { key: "control.reviewer.name", text: REVIEW, rows: breakAfter(REVIEW, "tool"), at: { x: REVIEWER.x + REVIEWER.w / 2, y: LINE.lower + 40 } as Point },
  },
  lens: { key: "control.lens", at: LENS_AT, to: { x: round(LENS_TO.x - LENS_AT.x), y: round(LENS_TO.y - LENS_AT.y) } as Point },
  mark: {
    key: "control.mark",
    at: MARK,
    words: { key: "control.mark.words", text: APPROVE, rows: breakAfter(APPROVE, "option"), at: { x: MARK.x + 44, y: MARK.y - PITCH / 2 } as Point },
  },
  honesty: { key: "control.honesty", text: HONESTY, at: { x: SAFE.left, y: SAFE.bottom - 24 - LABEL_LINE / 2 } as Point },
};

/** Every row of words the slide sets, with its box, for the layout tests. */
export const controlRows = (): { key: string; text: string; box: Box }[] => {
  const C = CONTROL;
  const one = (key: string, text: string, at: Point, anchor: "start" | "middle") => {
    const w = wordsWidth(text, 26);
    return { key, text, box: box(anchor === "start" ? at.x : round(at.x - w / 2), at.y - LABEL_LINE / 2, w, LABEL_LINE) };
  };
  const rows = (key: string, list: readonly string[], at: Point, anchor: "start" | "middle") => list.map((text, k) => one(`${key}.${k}`, text, { x: at.x, y: at.y + k * PITCH }, anchor));
  return [
    one(C.staff.name.key, C.staff.name.text, C.staff.name.at, "start"),
    ...rows(C.staff.caption.key, C.staff.caption.rows, C.staff.caption.at, "start"),
    one(C.gates.open.name.key, C.gates.open.name.text, C.gates.open.name.at, "middle"),
    ...rows(C.screen.caption.key, C.screen.caption.rows, C.screen.caption.at, "middle"),
    one(C.ledger.name.key, C.ledger.name.text, C.ledger.name.at, "middle"),
    ...rows(C.ledger.caption.key, C.ledger.caption.rows, C.ledger.caption.at, "middle"),
    one(C.gates.closed.name.key, C.gates.closed.name.text, C.gates.closed.name.at, "middle"),
    one(C.gates.closed.caption.key, C.gates.closed.caption.text, C.gates.closed.caption.at, "middle"),
    ...rows(C.reviewer.name.key, C.reviewer.name.rows, C.reviewer.name.at, "middle"),
    ...rows(C.mark.words.key, C.mark.words.rows, C.mark.words.at, "start"),
    one(C.honesty.key, C.honesty.text, C.honesty.at, "start"),
  ];
};

/**
 * Every drawn thing's box, for the layout tests: the two figures; the
 * cards wherever they stop; both gates, the open one with its boom stood
 * up; the screen with its stand; the record; the magnifier where it starts
 * and where it ends; the mark.
 */
export const controlGlyphs = (): { key: string; box: Box }[] => {
  const C = CONTROL;
  const shift = (b: Box, by: Point): Box => box(round(b.x + by.x), round(b.y + by.y), b.w, b.h);
  const up = C.gates.open.paths.at;
  const lensBox = (c: Point) => box(c.x - LENS.r - 2, c.y - LENS.r - 2, 2 * LENS.r + LENS.handle + 4, 2 * LENS.r + LENS.handle + 4);
  return [
    { key: C.staff.key, box: C.staff.at },
    { key: C.reviewer.key, box: C.reviewer.at },
    ...C.cards.flatMap((card) => [{ key: `${card.key}@start`, box: card.at }, ...Object.entries(card.stops).map(([stop, by]) => ({ key: `${card.key}@${stop}`, box: shift(card.at, by) }))]),
    { key: C.gates.open.key, box: box(up.x - 3, C.gates.open.boomTop - 3, up.w + 6, round(up.y + up.h - C.gates.open.boomTop) + 3) },
    { key: C.gates.closed.key, box: C.gates.closed.paths.at },
    { key: C.screen.key, box: box(C.screen.at.x + SCREEN.base.dx, C.screen.at.y, SCREEN.base.w, SCREEN.h + SCREEN.neck) },
    { key: C.ledger.key, box: C.ledger.at },
    { key: `${C.lens.key}@start`, box: lensBox(C.lens.at) },
    { key: `${C.lens.key}@card`, box: lensBox({ x: C.lens.at.x + C.lens.to.x, y: C.lens.at.y + C.lens.to.y }) },
    { key: C.mark.key, box: box(C.mark.at.x - 26, C.mark.at.y - 26, 52, 52) },
  ];
};
