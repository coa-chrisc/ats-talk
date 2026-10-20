/**
 * Slides 31 to 33, what a City team would start with: where every part
 * goes, its id and its words, read from the script by position. Each has a
 * two-line title, so its drawing starts 32 px under the story band, at y 552.
 *
 * 31, Costs: two groups of bars on one scale, each bar on a faint track
 * $500,000 long: on the left what we spend, two slivers; on the right the
 * comparisons, two long ranges, the failed vendor project grey and running
 * on dashed for "or more", the licensing avoided outlined in navy. A dashed
 * tag under the right group.
 *
 * 32, Teaching: a lecture room whose navy seats fill row by row, a strip of
 * four month blocks beside it, and four items on a shelf along the bottom.
 *
 * 33, What exists: a shelf of module rows, each named and drawn to its
 * count, the smaller categories together as one neat block under them; then
 * four binders and a stack of six papers.
 */
import { box, type Box } from "@/components/deck/kit";
import { LABEL_LINE, TAG_H, contentTop, groupOf, labelsOf, tagW } from "./layout";

/* 31. Costs */

const [SPEND, SANDBOX, SANDBOX_COST, PILOT, PILOT_COST, COMPARISONS, VENDOR, VENDOR_COST, LICENSING, LICENSING_COST, PROJECTED] = labelsOf("costs");
const K_TOP = contentTop("costs");
/** One scale for both groups: a track is $500,000 long. */
const TRACK = { w: 720, h: 40, max: 500_000 } as const;
const GROUP_X = [96, 984] as const;
/** A cost too small to see at this scale is drawn as a sliver this wide: $890 would be 1.3 px. */
const SLIVER = 4;
const ROW_Y = [K_TOP + 140, K_TOP + 276] as const;
const scaled = (dollars: number) => Math.max(SLIVER, Math.round((dollars / TRACK.max) * TRACK.w));
/** The dashed run past the track's end that says "or more". */
const MORE = 60;

/** A bar's tone: green for what we spend, grey for a cost others quote, navy for a benefit. */
type CostRow = { name: string; value: string; from: number; to: number; tone: "green" | "grey" | "navy"; more?: boolean };
const row = (group: number, i: number, r: CostRow) => {
  const x = GROUP_X[group];
  const y = ROW_Y[i];
  return {
    key: `costs.bar.${group}.${i}`,
    track: box(x, y, TRACK.w, TRACK.h),
    bar: box(x + (r.from ? scaled(r.from) : 0), y, scaled(r.to) - (r.from ? scaled(r.from) : 0), TRACK.h),
    tone: r.tone,
    more: r.more ? { key: `costs.bar.${group}.${i}.more`, x0: x + TRACK.w, x1: x + TRACK.w + MORE, y: y + TRACK.h / 2 } : undefined,
    name: { key: `costs.bar.${group}.${i}.name`, text: r.name, at: box(x, y - 12 - LABEL_LINE, 420, LABEL_LINE) },
    value: { key: `costs.bar.${group}.${i}.value`, text: r.value, at: box(x + TRACK.w + (r.more ? MORE : 0) - 420, y - 12 - LABEL_LINE, 420, LABEL_LINE) },
  };
};

export const COSTS = {
  ...groupOf("costs"),
  heads: [SPEND, COMPARISONS].map((text, i) => ({ key: `costs.head.${i}`, text, at: box(GROUP_X[i], K_TOP + 20, 400, 40) })),
  bars: [
    row(0, 0, { name: SANDBOX, value: SANDBOX_COST, from: 0, to: 890, tone: "green" }),
    row(0, 1, { name: PILOT, value: PILOT_COST, from: 0, to: 200, tone: "green" }),
    row(1, 0, { name: VENDOR, value: VENDOR_COST, from: 100_000, to: 500_000, tone: "grey", more: true }),
    row(1, 1, { name: LICENSING, value: LICENSING_COST, from: 50_000, to: 500_000, tone: "navy" }),
  ],
  tag: { key: "costs.tag", lines: [PROJECTED], at: box(GROUP_X[1], ROW_Y[1] + TRACK.h + 48, tagW(371), TAG_H) },
};

/* 32. Teaching */

const [STAFF, SERIES, MONTHS, ...SHELF_ITEMS] = labelsOf("teaching");
const T_TOP = contentTop("teaching");
const ROOM = box(96, T_TOP + 28, 600, 248);
const SEAT = { cols: 10, rows: 8, size: 16, pitch: { x: 52, y: 22 } } as const;
const SEATS_X = ROOM.x + (ROOM.w - (SEAT.cols - 1) * SEAT.pitch.x - SEAT.size) / 2;
const SEATS_Y = ROOM.y + 58;
const MONTH = { w: 210, h: 160, gap: 18, y: T_TOP + 80 } as const;
const MONTH_X0 = 1824 - 4 * MONTH.w - 3 * MONTH.gap;
const SHELF_Y = T_TOP + 420;
const ITEM_H = 64;
/** Measured widths of the shelf items' words, in the label type: each item is that and 40 px of room. */
const ITEM_WORDS = [211, 242, 311, 133];
const ITEM_GAP = 28;
const itemsW = ITEM_WORDS.reduce((sum, w) => sum + w + 40, 0) + ITEM_GAP * (ITEM_WORDS.length - 1);

export const TEACHING = {
  ...groupOf("teaching"),
  room: { key: "teaching.room", at: ROOM, screen: { x0: ROOM.x + 150, x1: ROOM.x + ROOM.w - 150, y: ROOM.y + 26 } },
  /** The seats row by row from the front, each row one part. */
  rows: Array.from({ length: SEAT.rows }, (_, r) => ({
    key: `teaching.seats.${r}`,
    seats: Array.from({ length: SEAT.cols }, (_, c) => box(SEATS_X + c * SEAT.pitch.x, SEATS_Y + r * SEAT.pitch.y, SEAT.size, SEAT.size)),
  })),
  staff: { key: "teaching.staff", text: STAFF, at: box(ROOM.x, ROOM.y + ROOM.h + 16, ROOM.w, LABEL_LINE) },
  series: { key: "teaching.series", text: SERIES, at: box(MONTH_X0, T_TOP + 28, 400, LABEL_LINE + 4) },
  /** Four month blocks, each a heading bar and four weeks of five days, one workshop day in each lit green. */
  months: [0, 1, 2, 3].map((i) => {
    const x = MONTH_X0 + i * (MONTH.w + MONTH.gap);
    const days = Array.from({ length: 20 }, (_, n) => box(x + 20 + (n % 5) * 36, MONTH.y + 50 + Math.floor(n / 5) * 26, 26, 16));
    return { key: `teaching.month.${i}`, at: box(x, MONTH.y, MONTH.w, MONTH.h), days, workshop: { key: `teaching.month.${i}.workshop`, at: days[5 + ((i * 2) % 5) + (i % 2) * 5] } };
  }),
  monthsLabel: { key: "teaching.months", text: MONTHS, at: box(MONTH_X0, MONTH.y + MONTH.h + 16, 4 * MONTH.w + 3 * MONTH.gap, LABEL_LINE) },
  shelf: { key: "teaching.shelf", x0: 96, x1: 1824, y: SHELF_Y },
  items: SHELF_ITEMS.map((text, i) => {
    const x = 960 - itemsW / 2 + ITEM_WORDS.slice(0, i).reduce((sum, w) => sum + w + 40 + ITEM_GAP, 0);
    return { key: `teaching.item.${i}`, text, at: box(x, SHELF_Y - 4 - ITEM_H, ITEM_WORDS[i] + 40, ITEM_H) };
  }),
};

/* 33. What exists */

const [AI, FRONTEND, DATA, INFRA, WORKFLOW, SECURITY_ROW, OTHER_WORDS, TOTAL, ...REST] = labelsOf("what-exists");
const REGISTRIES = REST.slice(0, 4);
const PAPERS = REST[4];
const W_TOP = contentTop("what-exists");
const MODULE = { size: 12, pitch: 16, x: 336, labelEnd: 320 } as const;
const NAMED = [
  [AI, 31],
  [FRONTEND, 25],
  [DATA, 16],
  [INFRA, 16],
  [WORKFLOW, 13],
  [SECURITY_ROW, 8],
] as const;
/** The seven smaller categories, 36 modules between them, drawn together as one neat block of three rows of twelve. */
const OTHER = { rows: 3, cols: 12 } as const;
const NAMED_PITCH = 40;
const NAMED_Y = W_TOP + 36;
const OTHER_Y = NAMED_Y + NAMED.length * NAMED_PITCH + 4;
const OTHER_PITCH = MODULE.pitch;
const BINDER = { w: 120, h: 220, pitch: 170, x0: 900, y: W_TOP + 40 } as const;
const SHEET = { w: 160, h: 210, step: 8, x: 1590, count: 6 } as const;
const blocks = (y: number, count: number, h: number): Box[] => Array.from({ length: count }, (_, n) => box(MODULE.x + n * MODULE.pitch, y, MODULE.size, h));

export const MODULES = {
  ...groupOf("what-exists"),
  rows: [
    ...NAMED.map(([text, count], i) => {
      const y = NAMED_Y + i * NAMED_PITCH;
      return { key: `what-exists.row.${i}`, blocks: blocks(y, count, MODULE.size), label: { text, at: box(MODULE.labelEnd - 220, y + MODULE.size / 2 - LABEL_LINE / 2, 220, LABEL_LINE) } };
    }),
  ],
  /** The smaller categories' modules: one block, a row of twelve at a time. */
  others: Array.from({ length: OTHER.rows }, (_, i) => ({ key: `what-exists.other.${i}`, blocks: blocks(OTHER_Y + i * OTHER_PITCH, OTHER.cols, MODULE.size) })),
  other: { key: "what-exists.other", text: OTHER_WORDS, at: box(MODULE.labelEnd - 220, OTHER_Y + ((OTHER.rows - 1) * OTHER_PITCH + MODULE.size) / 2 - LABEL_LINE / 2, 220, LABEL_LINE) },
  total: { key: "what-exists.total", text: TOTAL, at: box(MODULE.x, OTHER_Y + OTHER.rows * OTHER_PITCH + 20, 300, LABEL_LINE + 4) },
  binders: REGISTRIES.map((text, i) => {
    const at = box(BINDER.x0 + i * BINDER.pitch, BINDER.y, BINDER.w, BINDER.h);
    return { key: `what-exists.binder.${i}`, at, label: { key: `what-exists.binder.${i}.label`, text, at: box(at.x + at.w / 2 - 85, at.y + at.h + 16, 170, LABEL_LINE) } };
  }),
  /** The six papers, from the bottom of the stack up: each a step up and to the left of the one under it. */
  sheets: Array.from({ length: SHEET.count }, (_, i) => ({
    key: `what-exists.sheet.${i}`,
    at: box(SHEET.x + (SHEET.count - 1 - i) * SHEET.step, BINDER.y + BINDER.h - SHEET.h - i * SHEET.step, SHEET.w, SHEET.h),
  })),
  papers: { key: "what-exists.papers", text: PAPERS, at: box(SHEET.x + (SHEET.w + (SHEET.count - 1) * SHEET.step) / 2 - 128, BINDER.y + BINDER.h + 16, 256, LABEL_LINE) },
};
