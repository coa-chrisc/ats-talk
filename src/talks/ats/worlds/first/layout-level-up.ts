/**
 * Slide 22's places. At the left, three staff figures of one size stand on
 * one shared line, each in a column of its own beside the thing its work
 * uses: a screen with an approved tool on it, a checklist held up, a board
 * with a small system drawn on it. Each figure's name and caption sit under
 * the line, centred in its column. At the right, under the developers'
 * heading, a ring with four stops at its compass points, arrowheads between
 * them pointing clockwise, and each stop's words outside the ring beside it.
 * A card rides the ring once, clockwise from the top, kept upright, and
 * stops at the top again. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, contentTop, groupOf, labelBox, labelsOf, wordsWidth } from "./layout-plan";

const [EVERYONE, EVERYONE_DOES, LEADS, LEADS_DO, TEAM, TEAM_DOES, HEADING, ...STOP_WORDS] = labelsOf("level-up");

/** 556: under the two-line title's two story rows. */
const TOP = contentTop("level-up");

/** The 26 px label type, on a 31 px line when it runs over more than one. */
export const WORDS = { size: 26, leading: 31 } as const;
/** Short joining words a line should not end on, so a phrase is never split after its first word. */
const JOINING = new Set(["a", "an", "and", "for", "in", "of", "on", "or", "the", "to", "with"]);
/** Every way to set `words` in order over one or more lines. */
const breakings = (words: readonly string[]): string[][] =>
  words.length <= 1
    ? [[...words]]
    : breakings(words.slice(1)).flatMap((rest) => [[`${words[0]} ${rest[0]}`, ...rest.slice(1)], [words[0], ...rest]]);
/**
 * The words' lines at a width, measured as the plan slides measure a label,
 * so every line's box is inside the width: the fewest lines that fit, no line
 * but the last ending on a joining word, the longest line as short as it can
 * be. Falls back to one word a line when nothing else fits.
 */
const linesOf = (text: string, width: number) => {
  const widest = (lines: readonly string[]) => Math.max(...lines.map((line) => wordsWidth(line, WORDS.size)));
  const fits = breakings(text.split(" ")).filter(
    (lines) => widest(lines) <= width && lines.slice(0, -1).every((line) => !JOINING.has(line.split(" ").at(-1)!.toLowerCase())),
  );
  if (!fits.length) return text.split(" ");
  return fits.reduce((best, lines) => (lines.length < best.length || (lines.length === best.length && widest(lines) < widest(best)) ? lines : best));
};
/** Where a run of lines centred on `at` up and down sets its first line. */
const firstLine = (at: Point, lines: readonly string[]): Point => ({ x: at.x, y: at.y - ((lines.length - 1) * WORDS.leading) / 2 });

/* The three roles */

/** Three columns 324 wide, 10 apart, from the band's left edge: wide enough that every caption sets on three lines. */
export const COLUMN = { w: 324, gap: 10 } as const;
const columnX = (i: number) => SAFE.left + i * (COLUMN.w + COLUMN.gap);
/** The line all three stand on, and its ends: the columns' outer edges. */
export const BASE = TOP + 204;
const GROUND = { from: { x: SAFE.left, y: BASE } as Point, to: { x: columnX(2) + COLUMN.w, y: BASE } as Point };
/** A staff figure, the same size in every column, its feet on the line. */
export const FIGURE = { w: 80, h: 124 } as const;
/** The gap between a figure and the thing beside it. */
const BESIDE = 22;
/** What each figure works with, and how wide it is: the screen and the board stand on the line, the checklist is held up beside the figure. */
export const PROPS = [
  { kind: "screen", w: 112 },
  { kind: "checklist", w: 80 },
  { kind: "board", w: 120 },
] as const;
export type PropKind = (typeof PROPS)[number]["kind"];
/** The name's middle under the line, and the caption's first line under it. */
const NAME_Y = BASE + 36;
const CAPTION_Y = BASE + 76;

const ROLE_WORDS = [
  [EVERYONE, EVERYONE_DOES],
  [LEADS, LEADS_DO],
  [TEAM, TEAM_DOES],
] as const;

const roleAt = (i: number) => {
  const prop = PROPS[i];
  const width = FIGURE.w + BESIDE + prop.w;
  const left = Math.round(columnX(i) + (COLUMN.w - width) / 2);
  const centre = columnX(i) + COLUMN.w / 2;
  const [name, caption] = ROLE_WORDS[i];
  return {
    key: `level-up.role.${i}`,
    figure: box(left, BASE - FIGURE.h, FIGURE.w, FIGURE.h),
    prop: { kind: prop.kind as PropKind, at: box(left + FIGURE.w + BESIDE, BASE - FIGURE.h, prop.w, FIGURE.h) },
    words: {
      key: `level-up.role.${i}.words`,
      name: { text: name, at: { x: centre, y: NAME_Y } as Point },
      caption: { text: caption, lines: linesOf(caption, COLUMN.w), at: { x: centre, y: CAPTION_Y } as Point },
    },
  };
};

/* The practice cycle */

/** The card riding the ring, kept upright, its middle on the ring. */
export const CARD = { w: 40, h: 50 } as const;
/** How far outside the ring a stop's words start: half the card and 10 px more, so the card never covers them. */
const CLEAR = CARD.w / 2 + 10;
/** The right stop's words are set at most this wide, on up to three lines. */
const RIGHT_WIDTH = 212;
/** The gap kept between the roles and the cycle. */
const AISLE = 24;
/** The ring's radius, and its middle: as far right as leaves the right stop's words inside the band, its top 115 px under the field's top, so the heading and the first stop's words sit over it. */
const RADIUS = 90;
export const RING = { c: { x: SAFE.right - RIGHT_WIDTH - CLEAR - RADIUS, y: TOP + 215 } as Point, r: RADIUS } as const;
/** The left stop's words take what is left between the roles' column edge, an aisle off, and the ring. */
const LEFT_WIDTH = RING.c.x - RADIUS - CLEAR - (GROUND.to.x + AISLE);

/** A point on the ring a fraction `f` of a lap clockwise from the top. */
export const onRing = (f: number): Point => ({
  x: Math.round((RING.c.x + RING.r * Math.sin(f * 2 * Math.PI)) * 100) / 100,
  y: Math.round((RING.c.y - RING.r * Math.cos(f * 2 * Math.PI)) * 100) / 100,
});

/** The four stops, a quarter lap apart from the top; each one's words, placed outside the ring beside it. */
const stopAt = (i: number) => {
  const text = STOP_WORDS[i];
  const point = onRing(i / 4);
  const { c, r } = RING;
  const place: { at: Point; anchor: "start" | "middle" | "end"; width: number }[] = [
    { at: { x: c.x, y: c.y - r - CARD.h / 2 - 30 }, anchor: "middle", width: LEFT_WIDTH + RIGHT_WIDTH },
    { at: { x: c.x + r + CLEAR, y: c.y }, anchor: "start", width: RIGHT_WIDTH },
    { at: { x: c.x, y: c.y + r + CARD.h / 2 + 22 }, anchor: "middle", width: LEFT_WIDTH + RIGHT_WIDTH },
    { at: { x: c.x - r - CLEAR, y: c.y }, anchor: "end", width: LEFT_WIDTH },
  ];
  const { at, anchor, width } = place[i];
  const lines = linesOf(text, width);
  return { key: `level-up.stop.${i}`, point, text, lines, at, first: firstLine(at, lines), anchor, arrives: i / 4 };
};

/** The arrowheads, one between each pair of stops, pointing clockwise: where each sits, as a fraction of the lap. */
const ARROWS = [0.125, 0.375, 0.625, 0.875];

/** An arrowhead at `f` of the lap: a chevron across the ring, its tip ahead, clockwise. */
const chevron = (f: number) => {
  const p = onRing(f);
  const a = f * 2 * Math.PI;
  const t = { x: Math.cos(a), y: Math.sin(a) };
  const n = { x: Math.sin(a), y: -Math.cos(a) };
  const r = (v: number) => Math.round(v * 10) / 10;
  const tip = { x: p.x + 7 * t.x, y: p.y + 7 * t.y };
  const arm = (side: number) => ({ x: p.x - 7 * t.x + side * 9 * n.x, y: p.y - 7 * t.y + side * 9 * n.y });
  const [one, two] = [arm(1), arm(-1)];
  return { at: f, d: `M${r(one.x)} ${r(one.y)}L${r(tip.x)} ${r(tip.y)}L${r(two.x)} ${r(two.y)}` };
};

const { c: C, r: R } = RING;

export const LEVEL_UP = {
  ...groupOf("level-up"),
  ground: { key: "level-up.ground", ...GROUND },
  roles: [0, 1, 2].map(roleAt),
  heading: { key: "level-up.heading", text: HEADING, at: { x: C.x, y: TOP + 16 } as Point },
  ring: {
    key: "level-up.ring",
    /** The ring as one path from the top, clockwise, so it draws on the way the card rides. */
    d: `M${C.x} ${C.y - R}A${R} ${R} 0 1 1 ${C.x} ${C.y + R}A${R} ${R} 0 1 1 ${C.x} ${C.y - R}`,
    arrows: ARROWS.map(chevron),
  },
  stops: [0, 1, 2, 3].map(stopAt),
  /** The card, drawn at the top of the ring; it turns about the ring's middle (`--r`, in laps) and back about its own, so it stays upright. */
  card: { key: "level-up.card", at: box(C.x - CARD.w / 2, C.y - R - CARD.h / 2, CARD.w, CARD.h), pivot: C, own: { x: C.x, y: C.y - R } as Point },
};

/** A run of lines' box, `leading` apart, its first line centred on `first` up and down, placed across by its anchor. */
export const linesBox = (first: Point, lines: readonly string[], anchor: "start" | "middle" | "end" = "middle"): Box => {
  const boxes = lines.map((line, i) => labelBox({ x: first.x, y: first.y + i * WORDS.leading }, line, anchor, WORDS.size, WORDS.leading));
  const x = Math.min(...boxes.map((b) => b.x));
  const right = Math.max(...boxes.map((b) => b.x + b.w));
  return box(x, boxes[0].y, right - x, lines.length * WORDS.leading);
};

/** Everything slide 22 draws under its story band, for the layout test: the card at each stop of its lap. */
export const LEVEL_UP_BOXES: Box[] = [
  ...LEVEL_UP.roles.flatMap((role) => [
    role.figure,
    role.prop.at,
    labelBox(role.words.name.at, role.words.name.text, "middle", WORDS.size, WORDS.leading),
    linesBox(role.words.caption.at, role.words.caption.lines),
  ]),
  labelBox(LEVEL_UP.heading.at, HEADING, "middle", WORDS.size, WORDS.leading),
  box(C.x - R, C.y - R, 2 * R, 2 * R),
  ...LEVEL_UP.stops.flatMap((stop) => [
    linesBox(stop.first, stop.lines, stop.anchor),
    box(stop.point.x - CARD.w / 2, stop.point.y - CARD.h / 2, CARD.w, CARD.h),
  ]),
];
