/**
 * Slide 11a's places: a member of staff at the drawing's left with a card,
 * named under them; the route out of them forking into an upper and a
 * lower branch, the fork near the field's middle. The upper branch runs
 * into a shelf: three tool screens standing on it, each with its own
 * socket (a circle, a square, a triangle, left to right), and room at the
 * shelf's end for a fourth, the diamond; the shelf named once, past its
 * end. The sockets, the cards and their holes are drawn large, so the
 * shapes match from the back of a room. The first screen's own words over
 * it; the boundary's words beside the boundary's upper corner, on its
 * left, alone there. The record hangs under the first screen, its words
 * beside it on its right. On the lower branch, under the shelf, the gate
 * that stays closed, named under it; the reviewer past it, under the
 * shelf's end, named under the line, clear of the gate's words; the
 * magnifier in the reviewer's hand; the orange mark beside the reviewer,
 * its words beside it. The honesty caption at the drawing's lower left. A
 * card travels by `--x` and `--y` from where it is drawn, at the staff,
 * its foot 4 px over the line; each card carries a hole the shape of its
 * socket. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { gatePaths } from "../department-map";
import { LABEL_LINE, SAFE, contentTop, layerOf, round, wordsWidth } from "./layout";

const [NEED, NEED_CAPTION, TOOLS, FITS, USE, VISIBILITY, TRACK, NO_FIT, REQUEST, REVIEW, APPROVE, HONESTY] = shown("control", "play");

const TOP = contentTop("control");
/** Rows of words are this far apart. */
export const PITCH = LABEL_LINE;

/* The shelf's screens, and the lines */

/** A tool screen: a frame 136 by 108 standing on the shelf, rounded 8, a panel inset 9 in it, so a seated card sits in it with room round it; the screens 28 apart. */
export const TOOL = { w: 136, h: 108, gap: 28, rx: 8, inset: 9 } as const;
/** The boundary round the first screen: 10 px out from it on three sides, open at the shelf. */
export const BOUNDARY = { pad: 10, rx: 10 } as const;
/** The first screen's words on the field's first row; the boundary 13 px under it, clear of its words; the screens under that. */
const NAME_Y = TOP + LABEL_LINE / 2;
const BOUNDARY_TOP = TOP + LABEL_LINE + 13;
const TOOL_TOP = BOUNDARY_TOP + BOUNDARY.pad;

/** The upper branch's line is the shelf the screens stand on; the stem 98 under it and the lower branch 98 under that, room between for the record and its words and, under them, a card riding the lower branch; the fork 340 px in, each branch rising or falling 98 px over 98 px. */
const UPPER = TOOL_TOP + TOOL.h;
const BRANCH = 98;
export const LINE = { upper: UPPER, stem: UPPER + BRANCH, lower: UPPER + 2 * BRANCH } as const;
export const FORK = { x: 340, run: BRANCH } as const;
export const BRANCH_X = FORK.x + FORK.run;
/** A branch's slanted run, at 45 degrees. */
const DIAGONAL = round(FORK.run * Math.SQRT2);

/** The first screen 800 px across, so the boundary's words fit on its left clear of the fork; the four screens in a row from there, the fourth the shelf's empty place until the review fills it. */
const TOOL_X = 800;
const TOOLS_AT: Box[] = [0, 1, 2, 3].map((i) => box(TOOL_X + i * (TOOL.w + TOOL.gap), TOOL_TOP, TOOL.w, TOOL.h));
/** The shelf: a plank on the upper line from 16 px before the first screen to 16 px past the fourth. */
export const SHELF = { from: TOOL_X - 16, to: TOOLS_AT[3].x + TOOL.w + 16, width: 6 } as const;

/* The cards and the sockets */

/** A card: a navy document 64 by 80, rounded 5, riding with its foot 4 px over the line; a line across its top, 14 px down, and a hole 50 px down it, the shape of its socket. */
export const CARD = { w: 64, h: 80, lift: 4, rx: 5, hole: 50, line: 14 } as const;
/** The card's middle sits this far over the line it rides. */
const RIDE = CARD.lift + CARD.h / 2;

/** The sockets' shapes, each about 40 across, twice what they were, so the room can tell a circle from a diamond from its back rows. */
export type Shape = "circle" | "square" | "triangle" | "diamond";
export const SOCKET = { r: 20, square: 17, diamond: 22, apex: 22, base: 15 } as const;
/** A socket's outline about its middle `c`, as a path: the card's hole is the same path, so a seated card's hole lies on its socket. */
export const shapePath = (shape: Shape, c: Point): string => {
  const { x, y } = c;
  const r = SOCKET.r;
  if (shape === "circle") return `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
  if (shape === "square") return `M${x - SOCKET.square} ${y - SOCKET.square}h${2 * SOCKET.square}v${2 * SOCKET.square}h${-2 * SOCKET.square}Z`;
  if (shape === "triangle") return `M${x} ${y - SOCKET.apex}L${x + SOCKET.apex} ${y + SOCKET.base}L${x - SOCKET.apex} ${y + SOCKET.base}Z`;
  return `M${x} ${y - SOCKET.diamond}L${x + SOCKET.diamond} ${y}L${x} ${y + SOCKET.diamond}L${x - SOCKET.diamond} ${y}Z`;
};
/** The screens' sockets, left to right: the circle first, nearest the route, the diamond on the screen the review adds. */
const SHAPES: readonly Shape[] = ["circle", "square", "triangle", "diamond"];
/** A seated card stands in the middle of its screen; its socket is where the seated card's hole is. */
const SEAT_Y = TOOL_TOP + (TOOL.h - CARD.h) / 2;
const socketAt = (tool: Box): Point => ({ x: tool.x + tool.w / 2, y: SEAT_Y + CARD.hole });

/** A rounded box's outline as a path, so a hole can be cut in it. */
const roundBox = ({ x, y, w, h }: Box, r: number) => `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;

/* The staff, and where the cards start */

/** The staff, cast scale, standing on the stem at the drawing's left; the card beside them, 8 px off. */
const STAFF = box(SAFE.left, LINE.stem - 100, 76, 100);
const START: Point = { x: STAFF.x + STAFF.w + 8 + CARD.w / 2, y: LINE.stem };
const cardAt = (foot: Point): Box => box(round(foot.x - CARD.w / 2), round(foot.y - RIDE - CARD.h / 2), CARD.w, CARD.h);
/** A card drawn at the start: its page with its hole cut, and its line. */
const cardOf = (key: string, shape: Shape) => {
  const at = cardAt(START);
  return { key, shape, at, page: `${roundBox(at, CARD.rx)}${shapePath(shape, { x: at.x + CARD.w / 2, y: at.y + CARD.hole })}`, line: `M${at.x + CARD.line} ${at.y + CARD.line}H${at.x + CARD.w - CARD.line}` };
};

/** A card stops this far short of what it reaches, in plain sight. */
export const GAP = 24;

/* The gate */

/** The closed gate at 1.4 of the department map's, on the lower branch 960 px across the stage. */
export const GATE_SCALE = 1.4;
const GATE_X = 960;
const gate = gatePaths({ x: GATE_X, y: LINE.lower }, GATE_SCALE);
const AT_GATE = round(gate.at.x - GAP - CARD.w / 2);

/* The record */

/** The record: a page 64 by 68 hanging 16 px under the first screen, on its middle; four lines in it, the last shorter. */
export const LEDGER = { w: 64, h: 68, inset: 13, first: 16, pitch: 12, lines: [1, 1, 1, 0.6] } as const;
const LEDGER_AT = box(TOOLS_AT[0].x + (TOOL.w - LEDGER.w) / 2, UPPER + 16, LEDGER.w, LEDGER.h);
/** A record's lines, each its own part under `key`, in a record at `at`. */
export const recordLines = (key: string, at: Box) =>
  LEDGER.lines.map((share, i) => {
    const y = at.y + LEDGER.first + i * LEDGER.pitch;
    const x0 = at.x + LEDGER.inset;
    return { key: `${key}.line.${i}`, d: `M${x0} ${y}H${round(x0 + (LEDGER.w - 2 * LEDGER.inset) * share)}` };
  });

/** The boundary's words end 16 px before the boundary, right-aligned, their first row level with its top. */
const WORDS_X = TOOL_X - BOUNDARY.pad - 16;
/** The record's words start 20 px past it, on its right, under the second screen, their first row level with its top. */
const RECORD_X = LEDGER_AT.x + LEDGER.w + 20;

/* The reviewer, the magnifier and the mark */

/** The reviewer, cast scale, standing on the lower branch under the shelf's end, far enough past the closed gate that their name, under them, keeps well clear of the gate's words. */
const REVIEWER = box(1282, LINE.lower - 100, 76, 100);
/** The magnifier's lens, 20 across the radius, in the reviewer's hand, where it comes back to rest; it travels to over the stopped card's top half and back. */
export const LENS = { r: 20, handle: 18 } as const;
const LENS_AT: Point = { x: REVIEWER.x - 20, y: LINE.lower - 36 };
const LENS_TO: Point = { x: AT_GATE, y: LINE.lower - RIDE - 12 };
/** The mark beside the reviewer, 52 px past it and 10 px over the line; its words 44 px past the mark's middle. */
const MARK: Point = { x: REVIEWER.x + REVIEWER.w + 52, y: LINE.lower - 34 };

/** An offset from the start, for `travel`. */
const from = (p: Point): Point => ({ x: round(p.x - START.x), y: round(p.y - START.y) });

/** The first card's stops: the fork, the branch's top, short of the first screen, in it at the riding height, and seated in its middle. */
const first = TOOLS_AT[0];
const UPPER_STOPS = {
  fork: from({ x: FORK.x, y: LINE.stem }),
  branch: from({ x: BRANCH_X, y: LINE.upper }),
  shelf: from({ x: first.x - GAP - CARD.w / 2, y: LINE.upper }),
  tool: from({ x: first.x + first.w / 2, y: LINE.upper }),
  seat: from({ x: first.x + first.w / 2, y: SEAT_Y + RIDE + CARD.h / 2 }),
};
/** The second card's: the fork, the branch's foot and the closed gate. */
const LOWER_STOPS = {
  fork: from({ x: FORK.x, y: LINE.stem }),
  branch: from({ x: BRANCH_X, y: LINE.lower }),
  gate: from({ x: AT_GATE, y: LINE.lower }),
};

const tool = (i: number) => ({ key: `control.tool.${i}`, at: TOOLS_AT[i], shape: SHAPES[i], socket: socketAt(TOOLS_AT[i]), rim: shapePath(SHAPES[i], socketAt(TOOLS_AT[i])) });

export const CONTROL = {
  ...layerOf("control"),
  staff: {
    key: "control.staff",
    at: STAFF,
    name: { key: "control.staff.name", text: NEED, at: { x: SAFE.left, y: LINE.stem + 36 } as Point },
    caption: { key: "control.staff.caption", text: NEED_CAPTION, rows: breakAfter(NEED_CAPTION, "identify"), at: { x: SAFE.left, y: LINE.stem + 36 + PITCH } as Point },
  },
  cards: [
    { ...cardOf("control.card.0", "circle"), stops: UPPER_STOPS },
    { ...cardOf("control.card.1", "diamond"), stops: LOWER_STOPS },
  ] as const,
  routes: {
    stem: { key: "control.route.stem", d: `M${STAFF.x + STAFF.w + 4} ${LINE.stem}H${FORK.x}`, length: FORK.x - (STAFF.x + STAFF.w + 4) },
    upper: { key: "control.route.upper", d: `M${FORK.x} ${LINE.stem}L${BRANCH_X} ${LINE.upper}H${SHELF.from}`, length: round(DIAGONAL + SHELF.from - BRANCH_X) },
    lower: { key: "control.route.lower", d: `M${FORK.x} ${LINE.stem}L${BRANCH_X} ${LINE.lower}H${REVIEWER.x + REVIEWER.w}`, length: round(DIAGONAL + REVIEWER.x + REVIEWER.w - BRANCH_X) },
  },
  shelf: {
    key: "control.shelf",
    d: `M${SHELF.from} ${LINE.upper}H${SHELF.to}`,
    length: SHELF.to - SHELF.from,
    /** Past the shelf's end, level with the screens' middle: the first row over the shelf is the first screen's own. */
    name: { key: "control.shelf.name", text: TOOLS, at: { x: SHELF.to + 24, y: TOOL_TOP + TOOL.h / 2 } as Point },
  },
  /** The three screens on the shelf from the start, and the fourth, which the review adds. */
  tools: [tool(0), tool(1), tool(2), tool(3)] as const,
  /** The first screen's socket lighting; the fourth's, grey with its slot and then orange. */
  sockets: {
    lit: { key: "control.socket.lit", d: shapePath(SHAPES[0], socketAt(TOOLS_AT[0])) },
    added: { key: "control.socket.added", d: shapePath(SHAPES[3], socketAt(TOOLS_AT[3])) },
  },
  slot: { key: "control.slot", at: TOOLS_AT[3], rx: TOOL.rx },
  /** Over the first screen, on its middle, on the field's first row. */
  fits: { key: "control.fits", text: FITS, at: { x: first.x + first.w / 2, y: NAME_Y } as Point },
  boundary: {
    key: "control.boundary",
    at: box(first.x - BOUNDARY.pad, BOUNDARY_TOP, first.w + 2 * BOUNDARY.pad, UPPER - BOUNDARY_TOP),
    caption: { key: "control.boundary.caption", text: USE, rows: breakAfter(USE, "allowed"), at: { x: WORDS_X, y: BOUNDARY_TOP + LABEL_LINE / 2 } as Point },
  },
  ledger: {
    key: "control.ledger",
    at: LEDGER_AT,
    lines: recordLines("control.ledger", LEDGER_AT),
    name: { key: "control.ledger.name", text: VISIBILITY, at: { x: RECORD_X, y: LEDGER_AT.y + LABEL_LINE / 2 } as Point },
    caption: { key: "control.ledger.caption", text: TRACK, rows: breakAfter(TRACK, "access,"), at: { x: RECORD_X, y: LEDGER_AT.y + LABEL_LINE / 2 + PITCH } as Point },
  },
  gate: {
    key: "control.gate",
    foot: { x: GATE_X, y: LINE.lower } as Point,
    paths: gate,
    name: { key: "control.gate.name", text: NO_FIT, at: { x: GATE_X, y: LINE.lower + 36 } as Point },
    caption: { key: "control.gate.caption", text: REQUEST, at: { x: GATE_X, y: LINE.lower + 36 + PITCH } as Point },
  },
  reviewer: {
    key: "control.reviewer",
    at: REVIEWER,
    name: { key: "control.reviewer.name", text: REVIEW, rows: breakAfter(REVIEW, "tool"), at: { x: REVIEWER.x + REVIEWER.w / 2, y: LINE.lower + 36 } as Point },
  },
  lens: { key: "control.lens", at: LENS_AT, to: { x: round(LENS_TO.x - LENS_AT.x), y: round(LENS_TO.y - LENS_AT.y) } as Point },
  mark: {
    key: "control.mark",
    at: MARK,
    words: { key: "control.mark.words", text: APPROVE, rows: breakAfter(APPROVE, "option"), at: { x: MARK.x + 44, y: MARK.y - PITCH / 2 } as Point },
  },
  honesty: { key: "control.honesty", text: HONESTY, at: { x: SAFE.left, y: SAFE.bottom - 24 - LABEL_LINE / 2 } as Point },
};

type Anchor = "start" | "middle" | "end";

/** Every row of words the slide sets, with its box, for the layout tests. */
export const controlRows = (): { key: string; text: string; anchor: Anchor; box: Box }[] => {
  const C = CONTROL;
  const one = (key: string, text: string, at: Point, anchor: Anchor) => {
    const w = wordsWidth(text, 26);
    const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : round(at.x - w / 2);
    return { key, text, anchor, box: box(x, at.y - LABEL_LINE / 2, w, LABEL_LINE) };
  };
  const rows = (key: string, list: readonly string[], at: Point, anchor: Anchor) => list.map((text, k) => one(`${key}.${k}`, text, { x: at.x, y: at.y + k * PITCH }, anchor));
  return [
    one(C.staff.name.key, C.staff.name.text, C.staff.name.at, "start"),
    ...rows(C.staff.caption.key, C.staff.caption.rows, C.staff.caption.at, "start"),
    one(C.shelf.name.key, C.shelf.name.text, C.shelf.name.at, "start"),
    ...rows(C.boundary.caption.key, C.boundary.caption.rows, C.boundary.caption.at, "end"),
    one(C.fits.key, C.fits.text, C.fits.at, "middle"),
    one(C.ledger.name.key, C.ledger.name.text, C.ledger.name.at, "start"),
    ...rows(C.ledger.caption.key, C.ledger.caption.rows, C.ledger.caption.at, "start"),
    one(C.gate.name.key, C.gate.name.text, C.gate.name.at, "middle"),
    one(C.gate.caption.key, C.gate.caption.text, C.gate.caption.at, "middle"),
    ...rows(C.reviewer.name.key, C.reviewer.name.rows, C.reviewer.name.at, "middle"),
    ...rows(C.mark.words.key, C.mark.words.rows, C.mark.words.at, "start"),
    one(C.honesty.key, C.honesty.text, C.honesty.at, "start"),
  ];
};

/** A card's box at one of its stops. */
export const cardBox = (card: (typeof CONTROL.cards)[number], stop: Point): Box => box(round(card.at.x + stop.x), round(card.at.y + stop.y), card.at.w, card.at.h);

/**
 * Every drawn thing's box, for the layout tests: the two figures; the
 * cards wherever they rest (the first card's pass along the branch and its
 * stop before the shelf come before the boundary's words, as
 * control.test.ts checks); the four screens and the boundary; the record;
 * the gate; the magnifier where it starts and where it ends; the mark.
 */
export const controlGlyphs = (): { key: string; box: Box }[] => {
  const C = CONTROL;
  const [upper, lower] = C.cards;
  const lensBox = (c: Point) => box(c.x - LENS.r - 2, c.y - LENS.r - 2, 2 * LENS.r + LENS.handle + 4, 2 * LENS.r + LENS.handle + 4);
  const rests = [
    [upper, { start: { x: 0, y: 0 }, fork: upper.stops.fork, tool: upper.stops.tool, seat: upper.stops.seat }],
    [lower, { start: { x: 0, y: 0 }, ...lower.stops }],
  ] as const;
  return [
    { key: C.staff.key, box: C.staff.at },
    { key: C.reviewer.key, box: C.reviewer.at },
    ...rests.flatMap(([card, stops]) => Object.entries(stops).map(([stop, by]) => ({ key: `${card.key}@${stop}`, box: cardBox(card, by) }))),
    ...C.tools.map((entry) => ({ key: entry.key, box: entry.at })),
    { key: C.boundary.key, box: C.boundary.at },
    { key: C.ledger.key, box: C.ledger.at },
    { key: C.gate.key, box: C.gate.paths.at },
    { key: `${C.lens.key}@start`, box: lensBox(C.lens.at) },
    { key: `${C.lens.key}@card`, box: lensBox({ x: C.lens.at.x + C.lens.to.x, y: C.lens.at.y + C.lens.to.y }) },
    { key: C.mark.key, box: box(C.mark.at.x - 26, C.mark.at.y - 26, 52, 52) },
  ];
};
