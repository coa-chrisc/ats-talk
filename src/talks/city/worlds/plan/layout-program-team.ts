/**
 * Slide 19a of the plan world: where every part goes, the id it takes and
 * the words it holds, read from the script.
 *
 * The org chart starts wide: a box at the top, a trunk down to a bar, and
 * six department boxes hung from the bar, each holding five small people,
 * named once under the row. One person in each department lights, a new box
 * hangs off the trunk, and the lit people step into it. The view then zooms
 * in on that box: the chart grows about one point and falls away, while the
 * new box and its people grow about the same point to fill the middle, so
 * they stay put on the chart as it grows. The box is named; three tiles land
 * under it; a box for the City's leadership draws at its left with a solid
 * line to it; and a box for the developers draws at the right, dotted lines
 * running to it and a question tag under it.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, SAFE_BOTTOM, contentTop, labelBox, labelsOf, personAt } from "./layout";

const [DEPARTMENTS, TEAM, STRATEGY, ARCHITECTURE, CONSULTING, LEADERSHIP, DEVELOPERS, QUESTION] = labelsOf("program-team");
const TOP = contentTop("program-team");

/** How much the view zooms in: the new box on the chart grows by this much to fill the middle. */
export const ZOOM = 2.5;

/** The team box once the view has zoomed in, its people in a row inside it, under its name. */
const TEAM_BOX = box(600, TOP + 36, 640, 184);
const MEMBER = { y: TEAM_BOX.y + 84, x: 666, pitch: 92 } as const;
/** Where the team box hangs on the chart before the zoom, beside the trunk. */
const SMALL = { x: 990, y: 650 } as const;
/** The point the chart and the team box both grow about, so the team box grows out of its small self in place: s·small − big = (s − 1)·origin. */
const ORIGIN: Point = { x: (ZOOM * SMALL.x - TEAM_BOX.x) / (ZOOM - 1), y: (ZOOM * SMALL.y - TEAM_BOX.y) / (ZOOM - 1) };
/** Where a point drawn at its place after the zoom sits on the chart before it. */
const onChart = (p: Point): Point => ({ x: ORIGIN.x + (p.x - ORIGIN.x) / ZOOM, y: ORIGIN.y + (p.y - ORIGIN.y) / ZOOM });

/* The chart, wide */

const HEAD = box(860, TOP + 20, 200, 48);
const TRUNK_X = HEAD.x + HEAD.w / 2;
const BAR_Y = 740;
const DEPT = { y: BAR_Y + 24, w: 258, h: 56, gap: 36, count: 6, people: 5, pitch: 40 } as const;
const deptX = (i: number) => SAFE.left + i * (DEPT.w + DEPT.gap);
/** The small people in a department, at the chart's scale: one in each lights and steps into the team. */
const SMALL_PERSON = 1 / ZOOM;
const smallW = Math.round(48 * SMALL_PERSON);
const SEAT = { inset: (DEPT.w - (DEPT.people - 1) * DEPT.pitch - smallW) / 2, y: DEPT.y + 14 } as const;
const seatAt = (dept: number, seat: number) => personAt(deptX(dept) + SEAT.inset + seat * DEPT.pitch, SEAT.y, SMALL_PERSON);
/** The seat each department's lit person sits in, along its row. */
const LIT_SEAT = [2, 1, 3, 2, 4, 1] as const;
/** The chart's window: as it grows it is cut off at the slide's drawing edges. */
const WINDOW = box(SAFE.left, TOP, SAFE.right - SAFE.left, SAFE_BOTTOM - TOP);
/** The height of the team box's middle on the chart, where the branch from the trunk meets it. */
const BRANCH_Y = onChart({ x: 0, y: TEAM_BOX.y + TEAM_BOX.h / 2 }).y;

/* After the zoom */

const TILE = { y: TEAM_BOX.y + TEAM_BOX.h + 40, w: 200, h: 68, gap: 20 } as const;
const LEAD_BOX = box(136, TEAM_BOX.y + 16, 240, 152);
const DEV_BOX = box(1464, TEAM_BOX.y, SAFE.right - 1464, TEAM_BOX.h);
const DEV = { count: 6, scale: 0.75, pitch: 54 } as const;
const devW = Math.round(48 * DEV.scale);
const DEV_INSET = (DEV_BOX.w - (DEV.count - 1) * DEV.pitch - devW) / 2;
const TAG = box(1484, DEV_BOX.y + DEV_BOX.h + 36, 320, 52);
const DOTTED_Y = [TEAM_BOX.y + 52, TEAM_BOX.y + 132] as const;

export const PROGRAM_TEAM = {
  window: WINDOW,
  origin: ORIGIN,
  zoom: ZOOM,
  chart: {
    key: "program-team.chart",
    head: { key: "program-team.head", at: HEAD },
    /** The trunk from the top box down to the bar, and the bar with a drop to each department. */
    lines: {
      key: "program-team.lines",
      d: [`M${TRUNK_X} ${HEAD.y + HEAD.h}V${BAR_Y}`, `M${deptX(0) + DEPT.w / 2} ${BAR_Y}H${deptX(DEPT.count - 1) + DEPT.w / 2}`, ...Array.from({ length: DEPT.count }, (_, i) => `M${deptX(i) + DEPT.w / 2} ${BAR_Y}V${DEPT.y}`)].join(""),
    },
    depts: Array.from({ length: DEPT.count }, (_, i) => ({
      key: `program-team.dept.${i}`,
      at: box(deptX(i), DEPT.y, DEPT.w, DEPT.h),
      people: {
        key: `program-team.dept.${i}.people`,
        at: Array.from({ length: DEPT.people }, (_, seat) => seat)
          .filter((seat) => seat !== LIT_SEAT[i])
          .map((seat) => seatAt(i, seat)),
      },
    })),
    label: { key: "program-team.departments", text: DEPARTMENTS, at: { x: SAFE.left, y: DEPT.y + DEPT.h + 32 } as Point },
    /** The short line from the trunk to the team box where it hangs on the chart. */
    branch: { key: "program-team.branch", from: { x: TRUNK_X, y: BRANCH_Y } as Point, to: { x: SMALL.x, y: BRANCH_Y } as Point },
  },
  /** The team box, drawn at its place after the zoom; it starts at 1 / ZOOM of its size about the origin, where it hangs on the chart. */
  team: { key: "program-team.team", at: TEAM_BOX, small: 1 / ZOOM, name: { key: "program-team.name", text: TEAM, at: { x: TEAM_BOX.x + TEAM_BOX.w / 2, y: TEAM_BOX.y + 32 } as Point } },
  /** The lit people, one from each department: each is drawn at its place in the team box, and starts small on the chart, `from` px off where the team box's small self would put it, in its department's seat. */
  members: LIT_SEAT.map((seat, i) => {
    const at = personAt(MEMBER.x + i * MEMBER.pitch, MEMBER.y);
    const small = onChart(at);
    const chair = seatAt(i, seat);
    return { key: `program-team.member.${i}`, light: `program-team.member.${i}.light`, at, seat: chair, from: { x: chair.x - small.x, y: chair.y - small.y } as Point };
  }),
  tiles: [STRATEGY, ARCHITECTURE, CONSULTING].map((text, i) => {
    const at = box(TEAM_BOX.x + i * (TILE.w + TILE.gap), TILE.y, TILE.w, TILE.h);
    const x = at.x + at.w / 2;
    return { key: `program-team.tile.${i}`, stub: { key: `program-team.tile.${i}.stub`, from: { x, y: TEAM_BOX.y + TEAM_BOX.h } as Point, to: { x, y: TILE.y } as Point }, text, at, word: { x, y: at.y + at.h / 2 } as Point };
  }),
  lead: {
    key: "program-team.lead",
    at: LEAD_BOX,
    person: personAt(LEAD_BOX.x + LEAD_BOX.w / 2 - 30, LEAD_BOX.y + 16, 1.25),
    label: { key: "program-team.lead.label", text: LEADERSHIP, at: { x: LEAD_BOX.x + LEAD_BOX.w / 2, y: LEAD_BOX.y + LEAD_BOX.h - 28 } as Point },
    line: { key: "program-team.lead.line", from: { x: LEAD_BOX.x + LEAD_BOX.w, y: LEAD_BOX.y + LEAD_BOX.h / 2 } as Point, to: { x: TEAM_BOX.x, y: LEAD_BOX.y + LEAD_BOX.h / 2 } as Point },
  },
  devs: {
    key: "program-team.devs",
    at: DEV_BOX,
    people: { key: "program-team.devs.people", at: Array.from({ length: DEV.count }, (_, i) => personAt(DEV_BOX.x + DEV_INSET + i * DEV.pitch, DEV_BOX.y + 92, DEV.scale)) },
    label: { key: "program-team.devs.label", text: DEVELOPERS, at: { x: DEV_BOX.x + DEV_BOX.w / 2, y: DEV_BOX.y + 36 } as Point },
    /** Dotted lines from the team box across to the developers' box. */
    dotted: DOTTED_Y.map((y, i) => ({ key: `program-team.dotted.${i}`, from: { x: TEAM_BOX.x + TEAM_BOX.w, y } as Point, to: { x: DEV_BOX.x, y } as Point })),
  },
  /** The question tag under the developers' box, a short line up to it; it pops up about the top of its middle. */
  tag: {
    key: "program-team.tag",
    at: TAG,
    text: QUESTION,
    word: { x: TAG.x + TAG.w / 2, y: TAG.y + TAG.h / 2 } as Point,
    pointer: { from: { x: TAG.x + TAG.w / 2, y: TAG.y } as Point, to: { x: TAG.x + TAG.w / 2, y: DEV_BOX.y + DEV_BOX.h } as Point },
    origin: { x: TAG.x + TAG.w / 2, y: TAG.y } as Point,
  },
};

/** Where the team box sits on the chart before the zoom. */
export const SMALL_TEAM: Box = box(onChart(TEAM_BOX).x, onChart(TEAM_BOX).y, TEAM_BOX.w / ZOOM, TEAM_BOX.h / ZOOM);

/** Everything 19a draws under its story band, for the layout test: the chart, wide, and the picture after the zoom. */
export const PROGRAM_TEAM_BOXES: Box[] = [
  HEAD,
  ...PROGRAM_TEAM.chart.depts.map((dept) => dept.at),
  labelBox(PROGRAM_TEAM.chart.label.at, DEPARTMENTS, "start"),
  SMALL_TEAM,
  TEAM_BOX,
  ...PROGRAM_TEAM.tiles.map((tile) => tile.at),
  LEAD_BOX,
  DEV_BOX,
  TAG,
];
