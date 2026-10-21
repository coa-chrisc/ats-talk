/**
 * Slide 12's places: the department map's grid of plain boxes, 7 by 3
 * (department-map.ts), at the drawing's top left, named once over it; a
 * window lit in six named boxes, the grid's left column and its right
 * column, and smaller and fainter in three unnamed boxes among the rest;
 * the six names, each with its caption under it, in a list down the
 * drawing's right side, each behind a bullet the shape of the window. Under
 * the grid a cluster of the City's staff, named beside it, its caption and
 * the training's under the name; and beside them an empty round table in
 * grey dashes, at slide 17's proportions, its caption under it. Words are
 * read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { LIT, WINDOW, gridAt, tableReach, windowAt } from "../department-map";
import { DRAW_FOOT, LABEL_LINE, SAFE, contentTop, layerOf, round, wordsWidth } from "./layout";

const [DEPARTMENTS, ...REST] = shown("exists", "play");
const NAMED = [0, 1, 2, 3, 4, 5].map((i) => ({ text: REST[2 * i], caption: REST[2 * i + 1] }));
const [GROUP, GROUP_CAPTION, TRAINING, NOT_IN_ROOM] = REST.slice(12);

const TOP = contentTop("exists");
/** A row of words, name or caption, is this far from the next. */
export const PITCH = LABEL_LINE;

/* The grid */

/** The grid at 0.92 of slide 12's first size, so the cluster and the table fit under it; its name on the drawing's first row, the grid 46 px under the drawing's top. */
export const MAP_SCALE = 0.92;
const MAP = gridAt({ x: SAFE.left, y: TOP + 46 }, MAP_SCALE);
const MAP_FOOT = MAP.outline.y + MAP.outline.h;

/* The list */

/** The list's words end at the stage's right edge, its longest caption setting where they start; the bullet 32 px before them, 20 square. */
const LIST_WIDTH = Math.max(...NAMED.flatMap((entry) => [wordsWidth(entry.text, 26), wordsWidth(entry.caption, 26)]));
export const LIST = { x: SAFE.right - LIST_WIDTH, bullet: 20, gap: 12, pitch: 76 } as const;
const BULLET_X = LIST.x - LIST.gap - LIST.bullet;
/** The drawing's left side ends 40 px short of the bullets. */
export const LEFT_END = BULLET_X - 40;

/** A lit box: its window, full for the six named and smaller for the three unnamed, which light half as strongly. */
const windowOf = (col: number, row: number, small: boolean) => ({
  key: `exists.window.${col}.${row}`,
  col,
  row,
  cell: MAP.cell(col, row),
  at: windowAt(MAP.centre(col, row), MAP.cell(0, 0).h, small ? WINDOW.small : 1),
  lit: small ? WINDOW.faint : 1,
});

const named = LIT.named.map(([col, row], i) => {
  const y = TOP + 16 + i * LIST.pitch;
  return {
    ...windowOf(col, row, false),
    entry: {
      key: `exists.entry.${i}`,
      bullet: box(BULLET_X, y - LIST.bullet / 2, LIST.bullet, LIST.bullet),
      name: { text: NAMED[i].text, at: { x: LIST.x, y } as Point },
      caption: { text: NAMED[i].caption, at: { x: LIST.x, y: y + PITCH } as Point },
    },
  };
});

/* Under the grid */

/** The cluster's top, 30 px under the grid. */
const UNDER = round(MAP_FOOT + 30);
/** The staff, cast scale: a front row of three, a back row of two raised 26 px between them, each 66 px from the next, so no two bodies in a row meet. */
export const FIGURE = { w: 63, h: 84, pitch: 66, raise: 26 } as const;
const staff = [
  ...[0, 1].map((i) => box(SAFE.left + FIGURE.pitch / 2 + i * FIGURE.pitch, UNDER, FIGURE.w, FIGURE.h)),
  ...[0, 1, 2].map((i) => box(SAFE.left + i * FIGURE.pitch, UNDER + FIGURE.raise, FIGURE.w, FIGURE.h)),
].map((at, i) => ({ key: `exists.staff.${i}`, at }));
const CLUSTER_RIGHT = SAFE.left + 2 * FIGURE.pitch + FIGURE.w;

/** The group's name 28 px right of the cluster, level with its top; its caption and the training's two rows under it. */
const GROUP_AT: Point = { x: CLUSTER_RIGHT + 28, y: UNDER + PITCH / 2 };
const TRAINING_ROWS = breakAfter(TRAINING, "each");

/** The empty table at half slide 17's size; its caption 28 px under it on two rows, its last row at the drawing's foot and its right end at the drawing's left side's end. */
export const TABLE_SCALE = 0.5;
const REACH = tableReach(TABLE_SCALE);
const TABLE_ROWS = breakAfter(NOT_IN_ROOM, "never");
const TABLE_X = round(LEFT_END - Math.max(...TABLE_ROWS.map((row) => wordsWidth(row, 26))) / 2 - 12);
const TABLE_CAPTION_AT: Point = { x: TABLE_X, y: DRAW_FOOT - LABEL_LINE / 2 - (TABLE_ROWS.length - 1) * PITCH };
const TABLE_C: Point = { x: TABLE_X, y: round(TABLE_CAPTION_AT.y - 28 - REACH) };

export const EXISTS = {
  ...layerOf("exists"),
  map: MAP,
  grid: { key: "exists.grid", at: MAP.outline },
  name: { key: "exists.name", text: DEPARTMENTS, at: { x: MAP.outline.x, y: TOP + 16 } as Point },
  named,
  unnamed: LIT.unnamed.map(([col, row]) => windowOf(col, row, true)),
  staff,
  group: {
    name: { key: "exists.group.name", text: GROUP, at: GROUP_AT },
    caption: { key: "exists.group.caption", text: GROUP_CAPTION, at: { x: GROUP_AT.x, y: GROUP_AT.y + PITCH } as Point },
    training: { key: "exists.training", text: TRAINING, rows: TRAINING_ROWS, at: { x: GROUP_AT.x, y: GROUP_AT.y + 2 * PITCH } as Point },
  },
  table: { key: "exists.table", c: TABLE_C, scale: TABLE_SCALE, reach: REACH },
  tableCaption: { key: "exists.table.caption", text: NOT_IN_ROOM, rows: TABLE_ROWS, at: TABLE_CAPTION_AT },
};

/** Every row of words the slide sets, with its box, for the layout tests: the grid's name, each entry's name and caption, the group's words and the table's caption. */
export const existsRows = (): { key: string; text: string; box: Box }[] => {
  const row = (key: string, text: string, at: Point, anchor: "start" | "middle") => {
    const w = wordsWidth(text, 26);
    return { key, text, box: box(anchor === "start" ? at.x : round(at.x - w / 2), at.y - LABEL_LINE / 2, w, LABEL_LINE) };
  };
  const E = EXISTS;
  return [
    row(E.name.key, E.name.text, E.name.at, "start"),
    ...E.named.flatMap((lit) => [row(`${lit.entry.key}.name`, lit.entry.name.text, lit.entry.name.at, "start"), row(`${lit.entry.key}.caption`, lit.entry.caption.text, lit.entry.caption.at, "start")]),
    row(E.group.name.key, E.group.name.text, E.group.name.at, "start"),
    row(E.group.caption.key, E.group.caption.text, E.group.caption.at, "start"),
    ...E.group.training.rows.map((text, k) => row(`${E.group.training.key}.${k}`, text, { x: E.group.training.at.x, y: E.group.training.at.y + k * PITCH }, "start")),
    ...E.tableCaption.rows.map((text, k) => row(`${E.tableCaption.key}.${k}`, text, { x: E.tableCaption.at.x, y: E.tableCaption.at.y + k * PITCH }, "middle")),
  ];
};

/** The lowest the slide reaches: the table's caption's last row's foot, at or above the drawing's foot. */
export const EXISTS_FOOT = round(TABLE_CAPTION_AT.y + (TABLE_ROWS.length - 1) * PITCH + LABEL_LINE / 2);
