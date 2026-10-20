/**
 * Slide 23's picture, left to right across the field: the organization as
 * a chart (its head box carries its name, and one row of boxes hangs from
 * it, each holding three members, so it reads as people in teams); one
 * more box at the row's end, in a dashed outline, joined to the same split
 * by a line like the others, with the figure standing in it; and four lines
 * from that box's right side to four pieces stacked down the right of the
 * field, each a card with its icon and its label. Every place is a literal
 * number on the stage, or worked out from one; the field runs from the
 * content line (y 630) to the floor (y 994).
 */
import { box, route, type Box } from "@/components/deck/kit";
import { shown } from "../../script/find";

const ID = "fit";

/** The step's labels, in order: the organization's name, then the four pieces. */
const [ORG_NAME, ...PIECE_NAMES] = shown(ID, "play");

/**
 * The chart's row: five boxes of one size, 36 apart from x 96, the last
 * the new one. Each is tall enough to hold the figure with room round it.
 * The lines from the head split at `busY` and drop to each box's top.
 */
export const ROW = { x: 96, y: 772, w: 150, h: 180, gap: 36, busY: 738 } as const;

const slot = (i: number) => box(ROW.x + i * (ROW.w + ROW.gap), ROW.y, ROW.w, ROW.h);
const middleOf = (b: Box) => b.x + b.w / 2;
const dropTo = (b: Box) => `M${middleOf(b)} ${ROW.busY}V${ROW.y}`;

/** The new box, the row's fifth. */
const ROLE = slot(4);

/** The head box, centred over the whole row, the new box included, its top just under the content line. */
const HEAD = box((ROW.x + ROLE.x + ROLE.w) / 2 - 150, 640, 300, 64);
const HEAD_X = middleOf(HEAD);

/** A member: a small person in outline, three to a box, side by side and centred in it. */
export const MEMBER = { w: 36, h: 54, apart: 42 } as const;

const UNITS = [0, 1, 2, 3].map((i) => {
  const at = slot(i);
  const top = at.y + (at.h - MEMBER.h) / 2;
  return {
    key: `${ID}.org.unit.${i}`,
    at,
    /** The drop from the split to the box's top, drawn with the box. */
    drop: dropTo(at),
    members: [-1, 0, 1].map((k) => box(middleOf(at) + k * MEMBER.apart - MEMBER.w / 2, top, MEMBER.w, MEMBER.h)),
  };
});

const FIRST = middleOf(UNITS[0].at);
const LAST = middleOf(UNITS[3].at);

export const ORG = {
  head: { key: `${ID}.org.head`, at: HEAD },
  name: { key: `${ID}.org.name`, text: ORG_NAME, at: HEAD },
  /** From the head down to the split, then out along it to the first and the fourth box. */
  links: { key: `${ID}.org.links`, d: [`M${HEAD_X} ${HEAD.y + HEAD.h}V${ROW.busY}`, `M${HEAD_X} ${ROW.busY}H${FIRST}`, `M${HEAD_X} ${ROW.busY}H${LAST}`] },
  units: UNITS,
  /** The split running on from the fourth box's drop to the new box's, and down to it: one line, drawn as the new box joins. */
  join: { key: `${ID}.org.join`, d: `M${LAST} ${ROW.busY}H${middleOf(ROLE)}V${ROW.y}` },
} as const;

/** The figure, centred across the new box and a little low in it, its feet clear of the box's foot. */
const FIGURE = box(middleOf(ROLE) - 40, ROW.y + 34, 80, 120);

/* The pieces, down the right of the field. */

/** A piece's card: an icon at its left, its label beside it. */
export const PIECE = { x: 1480, w: 320, h: 60, gap: 24, icon: 32, pad: 18 } as const;
/** The column of pieces, centred in the field between the content line and the floor. */
const PIECE_TOP = 812 - (4 * PIECE.h + 3 * PIECE.gap) / 2;

/** What each piece's icon draws (parts.tsx `PieceIcon`), in the labels' order. */
export type PieceIcon = "bubble" | "stack" | "lanes" | "shield";
const ICONS: readonly PieceIcon[] = ["bubble", "stack", "lanes", "shield"];

/** Where the four lines leave the new box's right side: 28 apart about its middle, so they read as four lines from the start. */
const LEAVE_APART = 28;
const ROLE_MIDDLE = ROLE.y + ROLE.h / 2;

export const FIT = {
  /** The new box: a dashed outline, so HTML that opens by its clip (the kit's `Dashed`). */
  role: { key: `${ID}.role`, at: ROLE, rx: 10 },
  figure: { key: `${ID}.figure`, at: FIGURE },
  pieces: PIECE_NAMES.map((text, i) => {
    const at = box(PIECE.x, PIECE_TOP + i * (PIECE.h + PIECE.gap), PIECE.w, PIECE.h);
    const from = box(ROLE.x + ROLE.w, ROLE_MIDDLE + (i - 1.5) * LEAVE_APART, 0, 0);
    return {
      key: `${ID}.piece.${i}`,
      at,
      icon: ICONS[i],
      text,
      line: { key: `${ID}.reach.${i}`, d: route(from, at, "h", 0).d },
    };
  }),
} as const;
