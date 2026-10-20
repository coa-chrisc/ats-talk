/**
 * Slides 7 and 8, how the tools get built: where every part goes, the id
 * it takes and the words it holds, read from the script by position.
 * Slide 7: the empty application outline on the right, the agents outside
 * it that fill it with blocks, the person whose mark approves it, and the
 * tag on its corner once it stands alone. Slide 8: the lead agents at a
 * desk with the six folders they read; the board of epics, sprints and
 * waves beside it; and the one finished piece the view closes in on, with
 * the three marks under it.
 */
import { AGENT_R, TILE, box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, LINE, labelsOf } from "./layout";

const PERSON = { w: 48, h: 64 };

/* 7. AI that builds the tool */

const [AGENTS, APPROVES, FINISHED, NO_AI] = labelsOf("ai-builds");

/** The application: an outline with a bar along its top, and its twelve blocks' places, four by three under the bar, clear of the mark's corner. */
const APP = box(940, 612, 540, 280);
const BAR = 36;
const GRID = { x: 1000, y: APP.y + 52, dx: 112, dy: 76, cols: 4, rows: 3 };
/** The agents: one for each row of blocks, outside the outline's left edge, level with its row. */
const AGENT_X = 820;
const AGENT_YS = [0, 1, 2].map((r) => GRID.y + r * GRID.dy + TILE.large.side / 2);
const HALF = TILE.large.side / 2;
/** The person, to the right of the tool, close by the corner its mark goes to: inside the tool's lower right, clear of its blocks. */
const PERSON_AT = box(1600, 776, PERSON.w, PERSON.h);
const MARK_AT: Point = { x: APP.x + APP.w - 34, y: APP.y + APP.h - 34 };
/** Where the mark sets out from: the person's reaching hand. */
const MARK_FROM: Point = { x: PERSON_AT.x - 18, y: PERSON_AT.y + 30 };

/** Once the agents have gone, the tool comes to the middle of the stage and grows: moved and scaled about its own middle. */
const TOOL_ORIGIN: Point = { x: APP.x + APP.w / 2, y: APP.y + APP.h / 2 };
const TOOL_SCALE = 1.2;
const TOOL_TO: Point = { x: 960, y: 780 };
const grown = (p: Point): Point => ({ x: TOOL_TO.x + TOOL_SCALE * (p.x - TOOL_ORIGIN.x), y: TOOL_TO.y + TOOL_SCALE * (p.y - TOOL_ORIGIN.y) });
const GROWN_TOP_LEFT = grown(APP);
const GROWN_APP = box(GROWN_TOP_LEFT.x, GROWN_TOP_LEFT.y, APP.w * TOOL_SCALE, APP.h * TOOL_SCALE);
const GROWN_MARK = grown(MARK_AT);

/** The person's name: under the person at first, set from its left end so that it can go with the mark and sit beside it, right of the grown tool. */
const APPROVES_W = 260;
const APPROVES_AT = box(PERSON_AT.x + PERSON.w / 2 - 112, PERSON_AT.y + PERSON.h + 12, APPROVES_W, LABEL_LINE);
const APPROVES_TO: Point = { x: GROWN_APP.x + GROWN_APP.w + 16, y: GROWN_MARK.y - LABEL_LINE / 2 };

export const AI_BUILDS = {
  app: { key: "builds.app", at: APP, bar: APP.y + BAR },
  /** The tool as a whole, the outline, its blocks and its mark: where it goes, and how much it grows. */
  tool: { key: "builds.tool", origin: TOOL_ORIGIN, to: { x: TOOL_TO.x - TOOL_ORIGIN.x, y: TOOL_TO.y - TOOL_ORIGIN.y }, scale: TOOL_SCALE, grown: GROWN_APP },
  agents: AGENT_YS.map((y, r) => ({ key: `builds.agent.${r}`, at: { x: AGENT_X, y } })),
  agentsLabel: { key: "builds.agents", text: AGENTS, at: box(AGENT_X - 110, AGENT_YS[0] - AGENT_R - 20 - LABEL_LINE, 220, LABEL_LINE) },
  /** Each block's place in the tool, row by row, and how far it starts from it: on the agent of its row. */
  tiles: Array.from({ length: GRID.cols * GRID.rows }, (_, i) => {
    const r = Math.floor(i / GRID.cols);
    const at: Point = { x: GRID.x + (i % GRID.cols) * GRID.dx, y: GRID.y + r * GRID.dy };
    return { key: `builds.tile.${i}`, at, from: { x: AGENT_X - HALF - at.x, y: AGENT_YS[r] - HALF - at.y } };
  }),
  /** Where the agents step back to as they fade. */
  stepBack: -40,
  person: {
    key: "builds.person",
    at: PERSON_AT,
    label: { key: "builds.approves", text: APPROVES, at: APPROVES_AT, by: { x: APPROVES_TO.x - APPROVES_AT.x, y: APPROVES_TO.y - APPROVES_AT.y } },
  },
  /** The mark, where it lands on the tool, and how far from there it sets out: at the person. */
  mark: { key: "builds.mark", at: MARK_AT, from: { x: MARK_FROM.x - MARK_AT.x, y: MARK_FROM.y - MARK_AT.y }, grown: GROWN_MARK },
  /** The tool's name, over the grown tool. */
  finished: { key: "builds.finished", text: FINISHED, at: box(GROWN_APP.x + GROWN_APP.w / 2 - 150, GROWN_APP.y - 12 - LINE, 300, LINE) },
  /** The tag, set across the grown tool's top right corner, and how far it drops into place. */
  tag: { key: "builds.tag", text: NO_AI, at: box(GROWN_APP.x + GROWN_APP.w - 110, GROWN_APP.y - 22, 200, 44), drop: -16 },
};

/* 8. How a build runs */

const [LEADS, ...REST] = labelsOf("setup");
const FOLDER_TEXTS = REST.slice(0, 6);
const [HEADING, EPICS, SPRINTS, WAVES, FIRST, SECOND, PERSON_APPROVES] = REST.slice(6);

/** The desk: a top and two short legs, at the left of the stage under the leads and the pile. */
const DESK = { y: 960, x0: 110, x1: 760 };
/** The lead agents, sitting on the desk at its left end, named over them. */
const LEAD_R = 30;
const LEAD_AT: Point[] = [190, 270].map((x) => ({ x, y: DESK.y - LEAD_R - 6 }));
/** A folder, and the pile's place on the desk: the first lands at the bottom, each next one on top. */
const FOLDER = { x: 400, w: 320, h: 36, pitch: 42 };
const folderAt = (i: number) => box(FOLDER.x, DESK.y - (i + 1) * FOLDER.pitch + (FOLDER.pitch - FOLDER.h), FOLDER.w, FOLDER.h);
/** Where a reading dot ends: just right of the second lead. */
const READ_TO: Point = { x: LEAD_AT[1].x + LEAD_R + 14, y: LEAD_AT[1].y };

/** The board, beside the desk under its heading: three rows of epics, four sprints across, in a frame. */
const HEADING_Y = 556;
const CELL = { x: 1000, y: 664, w: 188, h: 80, dx: 200, dy: 90 };
const COLS = 4;
const ROWS = 3;
const FRAME = box(CELL.x - 12, CELL.y - 12, COLS * CELL.dx + 24 - (CELL.dx - CELL.w), ROWS * CELL.dy + 24 - (CELL.dy - CELL.h));
/** When the view closes in, the board goes small about its top right corner and moves up and in, to stand beside the piece. */
const BOARD_ORIGIN: Point = { x: FRAME.x + FRAME.w, y: FRAME.y };
const BOARD_SMALL = 0.6;
const BOARD_TO: Point = { x: 1700, y: 600 };
const SMALL_BOARD = box(BOARD_TO.x - FRAME.w * BOARD_SMALL, BOARD_TO.y, FRAME.w * BOARD_SMALL, FRAME.h * BOARD_SMALL);
const cellAt = (r: number, c: number) => box(CELL.x + c * CELL.dx, CELL.y + r * CELL.dy, CELL.w, CELL.h);
/** A small agent in each cell of a wave's row, at the cell's left, and its moving dot, which rides to the cell's right end as the cell fills. */
const WORKER_R = 14;
const workerAt = (cell: Box): Point => ({ x: cell.x + 26, y: cell.y + cell.h / 2 });
const dotAt = (cell: Box): Point => ({ x: cell.x + 58, y: cell.y + cell.h / 2 });

/** The finished piece the view closes in on: it grows out of one cell of the middle row to the left of the small board, the two of them balanced across the stage, with its three marks under it. */
const PIECE = box(260, 592, 840, 240);
const FROM_CELL = cellAt(1, 1);
const MARK_Y = PIECE.y + PIECE.h + 48;
const MARK_XS = [-280, 0, 280].map((dx) => PIECE.x + PIECE.w / 2 + dx);

export const SETUP = {
  desk: { key: "setup.desk", d: `M${DESK.x0} ${DESK.y}H${DESK.x1}M${DESK.x0 + 40} ${DESK.y}V${DESK.y + 30}M${DESK.x1 - 40} ${DESK.y}V${DESK.y + 30}` },
  leads: LEAD_AT.map((at, i) => ({ key: `setup.lead.${i}`, at, r: LEAD_R })),
  leadsLabel: { key: "setup.leads", text: LEADS, at: box(LEAD_AT[0].x - LEAD_R - 40, LEAD_AT[0].y - LEAD_R - 16 - LABEL_LINE, LEAD_AT[1].x - LEAD_AT[0].x + 2 * LEAD_R + 80, LABEL_LINE) },
  folders: FOLDER_TEXTS.map((text, i) => ({ key: `setup.folder.${i}`, text, at: folderAt(i) })),
  /** How far a folder drops onto the pile. */
  drop: -40,
  /** Each folder's reading: a dot from its spine to the leads. */
  reads: FOLDER_TEXTS.map((_, i) => {
    const at: Point = { x: FOLDER.x - 12, y: folderAt(i).y + FOLDER.h / 2 };
    return { key: `setup.read.${i}`, at, by: { x: READ_TO.x - at.x, y: READ_TO.y - at.y } };
  }),
  board: {
    key: "setup.board",
    origin: BOARD_ORIGIN,
    heading: { key: "setup.heading", text: HEADING, at: box(FRAME.x, HEADING_Y, FRAME.w, LINE) },
    frame: { key: "setup.frame", at: FRAME },
    /** The lines between the rows, then between the sprints. */
    rows: { key: "setup.rows", d: [1, 2].map((r) => `M${FRAME.x} ${CELL.y + r * CELL.dy - (CELL.dy - CELL.h) / 2}H${FRAME.x + FRAME.w}`).join("") },
    cols: { key: "setup.cols", d: [1, 2, 3].map((c) => `M${CELL.x + c * CELL.dx - (CELL.dx - CELL.w) / 2} ${FRAME.y}V${FRAME.y + FRAME.h}`).join("") },
    epics: { key: "setup.epics", text: EPICS, at: { x: FRAME.x - 20, y: FRAME.y + FRAME.h / 2 } },
    sprints: { key: "setup.sprints", text: SPRINTS, at: { x: FRAME.x + FRAME.w / 2, y: FRAME.y - 22 } },
    waves: { key: "setup.waves", text: WAVES, at: { x: FRAME.x + FRAME.w / 2, y: FRAME.y + FRAME.h + 24 } },
    /** A wave to a row, top down: its agents, its cells' fills and their dots, one id each for the row's four. */
    rowsOfWork: Array.from({ length: ROWS }, (_, r) => {
      const cells = Array.from({ length: COLS }, (_, c) => cellAt(r, c));
      return {
        wave: { key: `setup.wave.${r}`, at: cells.map(workerAt), r: WORKER_R },
        fills: { key: `setup.cells.${r}`, at: cells },
        dots: { key: `setup.dots.${r}`, at: cells.map(dotAt), ride: CELL.w - 58 - 18 },
      };
    }),
    /** How small the board goes, how far it moves, and how faint it goes, once the view closes in. */
    small: BOARD_SMALL,
    to: { x: BOARD_TO.x - BOARD_ORIGIN.x, y: BOARD_TO.y - BOARD_ORIGIN.y },
    faint: 0.45,
    smallAt: SMALL_BOARD,
  },
  piece: {
    key: "setup.piece",
    at: PIECE,
    /** Where it starts: over its cell, as small as the cell. */
    from: { x: FROM_CELL.x - PIECE.x, y: FROM_CELL.y - PIECE.y, scale: Math.round((FROM_CELL.w / PIECE.w) * 1000) / 1000 },
    /** Its header bar, and the lines that stand for what it holds. */
    bar: PIECE.y + 40,
    lines: [0, 1, 2].map((i) => ({ x0: PIECE.x + 48, x1: PIECE.x + PIECE.w - 48 - i * 160, y: PIECE.y + 96 + i * 44 })),
  },
  marks: [
    { key: "setup.first", text: FIRST, at: { x: MARK_XS[0], y: MARK_Y } },
    { key: "setup.second", text: SECOND, at: { x: MARK_XS[1], y: MARK_Y } },
    { key: "setup.approve", text: PERSON_APPROVES, at: { x: MARK_XS[2], y: MARK_Y } },
  ].map((mark) => ({ ...mark, label: { key: `${mark.key}.label`, at: box(mark.at.x - 130, mark.at.y + AGENT_R + 18, 260, LABEL_LINE) } })),
};

/** Everything slides 7 and 8 draw, for the layout test. */
export const BUILDS_DRAWN: Record<string, Box[]> = {
  "ai-builds": [
    APP,
    GROWN_APP,
    ...AI_BUILDS.agents.map((agent) => box(agent.at.x - AGENT_R, agent.at.y - AGENT_R, 2 * AGENT_R, 2 * AGENT_R)),
    AI_BUILDS.agentsLabel.at,
    PERSON_AT,
    AI_BUILDS.person.label.at,
    { ...AI_BUILDS.person.label.at, x: APPROVES_TO.x, y: APPROVES_TO.y },
    AI_BUILDS.finished.at,
    AI_BUILDS.tag.at,
    { ...AI_BUILDS.tag.at, y: AI_BUILDS.tag.at.y + AI_BUILDS.tag.drop },
  ],
  setup: [
    box(DESK.x0, DESK.y - 2, DESK.x1 - DESK.x0, 32),
    ...LEAD_AT.map((at) => box(at.x - LEAD_R, at.y - LEAD_R, 2 * LEAD_R, 2 * LEAD_R)),
    SETUP.leadsLabel.at,
    ...SETUP.folders.map((folder) => folder.at),
    ...SETUP.folders.map((folder) => ({ ...folder.at, y: folder.at.y + SETUP.drop })),
    FRAME,
    SETUP.board.heading.at,
    SMALL_BOARD,
    box(FRAME.x - 20 - 120, FRAME.y + FRAME.h / 2 - LABEL_LINE / 2, 120, LABEL_LINE),
    box(FRAME.x, FRAME.y - 22 - LABEL_LINE / 2, FRAME.w, LABEL_LINE),
    box(FRAME.x, FRAME.y + FRAME.h + 24 - LABEL_LINE / 2, FRAME.w, LABEL_LINE),
    PIECE,
    ...SETUP.marks.flatMap((mark) => [box(mark.at.x - AGENT_R - 2, mark.at.y - AGENT_R - 2, 2 * AGENT_R + 4, 2 * AGENT_R + 4), mark.label.at]),
  ],
};
