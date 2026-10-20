/**
 * Slides 25 to 27, three tools: where every part goes, its id and its
 * words, read from the script by position. Every slide here has a three-line
 * title, so its drawing starts 32 px under the story band, at y 630.
 *
 * 25, Foresight: a band of source dots under a small moon pours into a
 * funnel, is scored against a row of City priorities that crosses it, and a
 * few signals drop out of the spout; they become one page, the brief, which
 * gathers below the spout and right of the tube, then slides up onto the
 * quarterly-review table, clear of the funnel's wall. The tag stands under
 * the table.
 *
 * 26, GrantScope and PolicyPulse: two panels. On the left, grant cards are
 * scored one at a time: the strong ones tint and drop into a tray, the rest
 * fade; on the right, bills come off a stack and turn into short summaries.
 * A Validated tag settles on each panel, and each panel gets its own short
 * timeline under it, joined to its foot: GrantScope's one point, then
 * PolicyPulse's two.
 *
 * 27, AMANDA: a wall of code pages turns page by page into documentation
 * while a strip of 21 days fills; then two bars, a sliver for what the
 * agents cost and a tall grey bar for the vendor quotes, with a dashed tag
 * under them.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, TAG_H, contentTop, groupOf, labelAt, labelsOf, tagW } from "./layout";

/* 25. Foresight */

const [SOURCES, PRIORITIES, SIGNALS, BRIEF, REVIEWS, MONTHLY] = labelsOf("foresight");
const F_TOP = contentTop("foresight");

/** The funnel: its mouth across the source band's width, its walls narrowing to the spout, and a short tube under it. */
const FUNNEL = { cx: 820, mouth: { y: F_TOP + 70, half: 350 }, spout: { y: F_TOP + 176, half: 36 }, tube: F_TOP + 194 } as const;
/** Where the funnel's left and right walls are at a height. */
const wallsAt = (y: number) => {
  const k = (y - FUNNEL.mouth.y) / (FUNNEL.spout.y - FUNNEL.mouth.y);
  const half = FUNNEL.mouth.half + (FUNNEL.spout.half - FUNNEL.mouth.half) * k;
  return { left: FUNNEL.cx - half, right: FUNNEL.cx + half };
};

/** The source band over the funnel's mouth: three rows of small dots. */
const BAND = { cols: 36, rows: 3, x: 470, y: F_TOP + 10, pitch: 18, r: 4 } as const;
/** What pours: three rows of dots in the mouth, under the band, that drop into the funnel and are gone. */
const STREAM = { cols: 12, rows: 3, x: 612, y: F_TOP + 82, pitch: { x: 36, y: 12 }, r: 4, drop: 40 } as const;
/** The City priorities: a row of five tiles across the funnel, which everything poured is scored against. */
const SIEVE_Y = F_TOP + 126;
const TILE = { w: 40, h: 24, pitch: 52 } as const;
const TILE_XS = [0, 1, 2, 3, 4].map((i) => FUNNEL.cx - (5 * TILE.w + 4 * (TILE.pitch - TILE.w)) / 2 + i * TILE.pitch);
/** The signals out of the spout: four dots over three, under the tube. */
const SIGNAL_DOTS: Point[] = [
  ...[-24, -8, 8, 24].map((dx) => ({ x: FUNNEL.cx + dx, y: F_TOP + 212 })),
  ...[-16, 0, 16].map((dx) => ({ x: FUNNEL.cx + dx, y: F_TOP + 226 })),
];
/**
 * The brief: a page that gathers beside the signals, under the funnel's
 * spout and right of its tube, so it never crosses a wall; it then slides
 * up and along onto the table. The table stands on the right, the tag under
 * it.
 */
const PAGE = { w: 104, h: 112 } as const;
const TABLE = { x0: 1240, x1: 1680, y: F_TOP + 236, legs: [1272, 1648], foot: F_TOP + 282 } as const;
const PAGE_END = box(1408, TABLE.y - 2 - PAGE.h, PAGE.w, PAGE.h);
const PAGE_START = { x: 884, y: F_TOP + 198 } as const;

export const FORESIGHT = {
  ...groupOf("foresight"),
  band: {
    key: "foresight.band",
    dots: Array.from({ length: BAND.cols * BAND.rows }, (_, n) => ({ x: BAND.x + (n % BAND.cols) * BAND.pitch, y: BAND.y + Math.floor(n / BAND.cols) * BAND.pitch })),
    r: BAND.r,
    rows: BAND.rows,
    /** Each row of the band is its own part, so the band comes in a row at a time. */
    rowKeys: [0, 1, 2].map((row) => `foresight.band.${row}`),
  },
  sources: { key: "foresight.sources", text: SOURCES, at: box(260, BAND.y + BAND.pitch - LABEL_LINE / 2, 190, LABEL_LINE) },
  moon: { key: "foresight.moon", at: { x: 1236, y: BAND.y + 18 }, r: 22 },
  funnel: {
    key: "foresight.funnel",
    d: `M${FUNNEL.cx - FUNNEL.mouth.half} ${FUNNEL.mouth.y}L${FUNNEL.cx - FUNNEL.spout.half} ${FUNNEL.spout.y}V${FUNNEL.tube}M${FUNNEL.cx + FUNNEL.mouth.half} ${FUNNEL.mouth.y}L${FUNNEL.cx + FUNNEL.spout.half} ${FUNNEL.spout.y}V${FUNNEL.tube}`,
    mouth: FUNNEL.mouth,
    spout: FUNNEL.spout,
    tube: FUNNEL.tube,
    wallsAt,
  },
  stream: {
    key: "foresight.stream",
    dots: Array.from({ length: STREAM.cols * STREAM.rows }, (_, n) => ({ x: STREAM.x + (n % STREAM.cols) * STREAM.pitch.x + (Math.floor(n / STREAM.cols) % 2) * 20, y: STREAM.y + Math.floor(n / STREAM.cols) * STREAM.pitch.y })),
    r: STREAM.r,
    drop: STREAM.drop,
  },
  tiles: TILE_XS.map((x, i) => ({ key: `foresight.tile.${i}`, at: box(x, SIEVE_Y - TILE.h / 2, TILE.w, TILE.h) })),
  /** The row of tiles crosses the funnel from wall to wall. */
  sieve: { key: "foresight.sieve", y: SIEVE_Y, ...wallsAt(SIEVE_Y) },
  priorities: { key: "foresight.priorities", text: PRIORITIES, at: box(wallsAt(SIEVE_Y).left - 24 - 190, SIEVE_Y - LABEL_LINE / 2, 190, LABEL_LINE) },
  signals: { key: "foresight.signals", dots: SIGNAL_DOTS, r: 5, from: -44 },
  signalsLabel: { key: "foresight.signals.label", text: SIGNALS, at: box(FUNNEL.cx - 48 - 170, F_TOP + 219 - LABEL_LINE / 2, 170, LABEL_LINE) },
  page: {
    key: "foresight.page",
    at: PAGE_END,
    /** How far left of and below its place on the table the page is gathered, beside the signals. */
    from: PAGE_START.x - PAGE_END.x,
    below: PAGE_START.y - PAGE_END.y,
    title: { text: BRIEF, at: box(PAGE_END.x + 14, PAGE_END.y + 10, PAGE.w - 28, LABEL_LINE) },
    /** Its lines of writing, written as the signals gather into it. */
    lines: { key: "foresight.page.lines", rows: [52, 70, 88].map((dy, i) => ({ x: PAGE_END.x + 14, y: PAGE_END.y + dy, w: [76, 64, 48][i] })) },
  },
  table: { key: "foresight.table", ...TABLE },
  reviews: { key: "foresight.reviews", text: REVIEWS, at: labelAt({ x: (TABLE.legs[0] + TABLE.legs[1]) / 2, y: TABLE.y + 24 }, 240) },
  /** The tag stands under the table, the slide's last word. */
  tag: { key: "foresight.tag", lines: [MONTHLY], at: box((TABLE.x0 + TABLE.x1) / 2 - tagW(256) / 2, TABLE.foot + 14, tagW(256), TAG_H) },
};

/* 26. GrantScope and PolicyPulse */

const [GRANTSCOPE, STRONG_FIT, MILLIONS, POLICYPULSE, BILLS, SUMMARY, VALIDATED, DEMAND, FIRST_BUILT, PILOT_USERS] = labelsOf("grantscope");
const G_TOP = contentTop("grantscope");
const PANEL_H = 244;
const PANELS = [box(96, G_TOP, 840, PANEL_H), box(984, G_TOP, 840, PANEL_H)] as const;
const [LEFT, RIGHT] = PANELS;
const HEAD_Y = LEFT.y + 16;
const VALIDATED_W = tagW(128);
/** The grants in a row under the panel's name, and the tray under them that the strong fits drop into, its three places. */
const CARD = { w: 64, h: 48 } as const;
const ROW_Y = LEFT.y + 76;
const CARD_XS = [124, 204, 284, 364, 444];
const TRAY = box(124, LEFT.y + 156, 264, 68);
const TRAY_XS = [140, 224, 308];
/** Which grants are a strong fit. */
const STRONG = [true, false, true, true, false] as const;

/** A bill: a page with lines of writing; a summary keeps two short green lines. */
const BILL = { w: 128, h: 100 } as const;
const STACK = box(RIGHT.x + 28, RIGHT.y + 76, BILL.w, BILL.h);
const SUMMARY_XS = [1260, 1440, 1620];

/**
 * Each panel's own timeline, directly under it and joined to it by a thin
 * line down from the panel's foot: GrantScope's one point, PolicyPulse's
 * two, each named under it.
 */
const TIMELINE_Y = LEFT.y + PANEL_H + 56;
const timeline = (panel: Box, i: number, points: readonly [string, number][]) => ({
  key: `grantscope.timeline.${i}`,
  join: { key: `grantscope.join.${i}`, x: panel.x + 48, y0: panel.y + panel.h, y1: TIMELINE_Y },
  x0: panel.x + 48,
  x1: panel.x + panel.w - 48,
  y: TIMELINE_Y,
  points: points.map(([text, x]) => ({ text, x })),
});
const TIMELINES = [timeline(LEFT, 0, [[DEMAND, 300]]), timeline(RIGHT, 1, [[FIRST_BUILT, 1150], [PILOT_USERS, 1470]])];

export const GRANTS = {
  ...groupOf("grantscope"),
  panels: PANELS.map((at, i) => ({ key: `grantscope.panel.${i}`, at })),
  names: [GRANTSCOPE, POLICYPULSE].map((text, i) => ({ key: `grantscope.name.${i}`, text, at: box(PANELS[i].x + 28, HEAD_Y, 300, LABEL_LINE + 4) })),
  validated: PANELS.map((at, i) => ({ key: `grantscope.validated.${i}`, lines: [VALIDATED], at: box(at.x + at.w - 24 - VALIDATED_W, HEAD_Y - 6, VALIDATED_W, TAG_H) })),
  cards: CARD_XS.map((x, i) => {
    const place = STRONG.slice(0, i).filter(Boolean).length;
    return {
      key: `grantscope.card.${i}`,
      at: box(x, ROW_Y, CARD.w, CARD.h),
      strong: STRONG[i],
      /** A strong fit moves along and down into its place in the tray; the rest stay in the row and fade. */
      to: STRONG[i] ? TRAY_XS[place] - x : 0,
      drop: STRONG[i] ? TRAY.y + 10 - ROW_Y : 0,
    };
  }),
  tray: { key: "grantscope.tray", at: TRAY },
  strongFit: { key: "grantscope.strong", text: STRONG_FIT, at: box(TRAY.x + TRAY.w + 20, TRAY.y + TRAY.h / 2 - LABEL_LINE / 2, 150, LABEL_LINE) },
  millions: { key: "grantscope.millions", text: MILLIONS, at: box(LEFT.x + LEFT.w - 28 - 380, ROW_Y + CARD.h / 2 - 20, 380, 40) },
  stack: { key: "grantscope.stack", at: STACK },
  bills: { key: "grantscope.bills", text: BILLS, at: box(STACK.x, STACK.y + STACK.h + 20, 320, LABEL_LINE) },
  /** Three bills come off the stack in turn and become summaries at their places. */
  turns: SUMMARY_XS.map((x, i) => ({ key: `grantscope.turn.${i}`, at: STACK, to: x - STACK.x })),
  summary: { key: "grantscope.summary", text: SUMMARY, at: labelAt({ x: (SUMMARY_XS[0] + SUMMARY_XS[2] + BILL.w) / 2, y: STACK.y + STACK.h + 20 + LABEL_LINE / 2 }, 340) },
  timelines: TIMELINES.map((line) => ({
    ...line,
    points: line.points.map((point, j) => ({
      key: `${line.key}.point.${j}`,
      at: { x: point.x, y: line.y } as Point,
      /** Its words centred under it, below the rule, so the rule never runs through them. */
      label: { key: `${line.key}.point.${j}.label`, text: point.text, at: labelAt({ x: point.x, y: line.y + 14 + LABEL_LINE / 2 }, 280) as Box },
    })),
  })),
  r: 10,
};

/* 27. AMANDA code intelligence */

const [LEGACY, DOCUMENTED, DAYS, OURS, VENDOR, TWO_MILLION, PROJECTED] = labelsOf("amanda");
const A_TOP = contentTop("amanda");
const WALL = { cols: 8, rows: 2, x: 96, y: A_TOP + 44, w: 64, h: 84, pitch: { x: 80, y: 96 } } as const;
/** A code page's lines: offsets from its left and top, and lengths. Indented as code is. */
const CODE_LINES = [
  { x: 10, y: 16, w: 36 },
  { x: 18, y: 28, w: 30 },
  { x: 18, y: 40, w: 38 },
  { x: 26, y: 52, w: 22 },
  { x: 10, y: 64, w: 28 },
] as const;
/** A documented page: a heading bar and lines of writing. */
const DOC_LINES = [
  { x: 10, y: 34, w: 44 },
  { x: 10, y: 46, w: 40 },
  { x: 10, y: 58, w: 44 },
  { x: 10, y: 70, w: 28 },
] as const;
const STRIP = { x: 96, y: A_TOP + 284, cell: 20, pitch: 30, count: 21 } as const;
const BASE_Y = A_TOP + 270;
const BAR_W = 120;
const TALL = 210;
/** Two million dollars against about $1,000 is two thousand to one: drawn to scale the short bar would be a tenth of a pixel, so it is a sliver of 4 px. */
const SLIVER = 4;
const OURS_X = 1040;
const VENDOR_X = 1300;

export const AMANDA = {
  ...groupOf("amanda"),
  legacy: { key: "amanda.legacy", text: LEGACY, at: box(WALL.x, A_TOP, 240, LABEL_LINE) },
  pages: Array.from({ length: WALL.cols * WALL.rows }, (_, n) => {
    const at = box(WALL.x + (n % WALL.cols) * WALL.pitch.x, WALL.y + Math.floor(n / WALL.cols) * WALL.pitch.y, WALL.w, WALL.h);
    return {
      key: `amanda.page.${n}`,
      doc: `amanda.page.${n}.doc`,
      at,
      code: CODE_LINES.map((line) => ({ x: at.x + line.x, y: at.y + line.y, w: line.w })),
      heading: { x: at.x + 10, y: at.y + 14, w: 36 },
      lines: DOC_LINES.map((line) => ({ x: at.x + line.x, y: at.y + line.y, w: line.w })),
    };
  }),
  documented: { key: "amanda.documented", text: DOCUMENTED, at: box(WALL.x, WALL.y + WALL.pitch.y + WALL.h + 8, 240, LABEL_LINE) },
  days: Array.from({ length: STRIP.count }, (_, i) => ({ key: `amanda.day.${i}`, at: box(STRIP.x + i * STRIP.pitch, STRIP.y, STRIP.cell, STRIP.cell) })),
  daysLabel: { key: "amanda.days", text: DAYS, at: box(STRIP.x + (STRIP.count - 1) * STRIP.pitch + STRIP.cell + 20, STRIP.y + STRIP.cell / 2 - LABEL_LINE / 2, 140, LABEL_LINE) },
  axis: { key: "amanda.axis", x0: OURS_X - 60, x1: VENDOR_X + BAR_W + 60, y: BASE_Y },
  ours: { key: "amanda.ours", at: box(OURS_X, BASE_Y - SLIVER, BAR_W, SLIVER) },
  oursLabel: { key: "amanda.ours.label", text: OURS, at: labelAt({ x: OURS_X + BAR_W / 2, y: BASE_Y - SLIVER - 28 }, 200) },
  vendor: { key: "amanda.vendor", at: box(VENDOR_X, BASE_Y - TALL, BAR_W, TALL) },
  vendorLabel: { key: "amanda.vendor.label", text: VENDOR, at: box(VENDOR_X + BAR_W + 24, BASE_Y - TALL / 2 - LABEL_LINE / 2, 220, LABEL_LINE) },
  top: { key: "amanda.top", text: TWO_MILLION, at: labelAt({ x: VENDOR_X + BAR_W / 2, y: BASE_Y - TALL - 28 }, 420) },
  tag: { key: "amanda.tag", lines: [PROJECTED], at: box((OURS_X + VENDOR_X + BAR_W) / 2 - tagW(278) / 2, BASE_Y + 20, tagW(278), TAG_H) },
};
