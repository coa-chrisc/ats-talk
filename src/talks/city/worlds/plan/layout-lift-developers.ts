/**
 * Slide 19b of the plan world: where every part goes, the id it takes and
 * the words it holds, read from the script.
 *
 * A row of five desks across the left, each a developer at a desk beside a
 * system, named once over the row; three of the systems carry a grey stuck
 * mark, named once. At the right a long grey bar for the cycle time, and
 * under it a pile for the backlog. A slab of four parts slides in under the
 * row and its parts fill in turn, each named; the row and the slab lift
 * together, the stuck marks clear, the bar shortens to a short green one,
 * the program team's box comes up beside the row, and the pile shrinks. The
 * row and the slab are drawn where they end, lifted; they start `lift` px
 * lower.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, SAFE_BOTTOM, contentTop, labelBox, labelsOf, personAt } from "./layout";

const [DEVELOPERS, STUCK, CYCLE, BACKLOG, ...REST] = labelsOf("lift-developers");
const FOUNDATIONS = REST.slice(0, 4);
const TEAM = REST[4];
const TOP = contentTop("lift-developers");

/** How far the row and its slab lift once the slab is under them. */
export const LIFT = 40;

/** Five desks side by side, each a developer, a desk and a system beside it. */
const UNIT = { w: 200, count: 5, top: TOP + 61 } as const;
const unitX = (u: number) => SAFE.left + u * UNIT.w;
const PERSON_SCALE = 1.2;
const DESK = { y: UNIT.top + 77, h: 12, foot: UNIT.top + 137 } as const;
const SYSTEM = { dx: 124, w: 64, y: UNIT.top + 33 } as const;
/** The units whose systems carry a stuck mark, at the system's top right corner. */
const STUCK_UNITS = [1, 2, 4] as const;
const MARK_R = 14;
/** The slab: four parts in two rows of two, just under the desks' feet. */
const SLAB = { y: DESK.foot + 4, h: 46, gap: 4, w: (UNIT.count * UNIT.w - 4) / 2 } as const;
const partAt = (i: number) => box(SAFE.left + (i % 2) * (SLAB.w + SLAB.gap), SLAB.y + Math.floor(i / 2) * (SLAB.h + SLAB.gap), SLAB.w, SLAB.h);
/** The slab comes in from this far left. */
const SLAB_FROM = -80;

/** The program team's box, beside the row, level with it once it has lifted. */
const TEAM_BOX = box(unitX(UNIT.count) + 28, UNIT.top + 5, 250, 132);
const TEAM_PEOPLE = { scale: 0.75, pitch: 54, y: TEAM_BOX.y + 62 } as const;
const teamW = Math.round(48 * TEAM_PEOPLE.scale);
const teamX0 = TEAM_BOX.x + TEAM_BOX.w / 2 - (2 * TEAM_PEOPLE.pitch + teamW) / 2;

/** The cycle-time bar: long and grey, then short and green. */
const BAR = box(1440, TOP + 52, SAFE.right - 1440, 36);
const SHORT_W = 120;
/** The backlog: eight cards stacked at the right, the top five taken off one by one. */
const CARD = { x: 1600, w: SAFE.right - 1600, h: 22, pitch: 28, count: 8, gone: 5 } as const;
const cardY = (i: number) => SAFE_BOTTOM - 16 - CARD.h - i * CARD.pitch;

export const LIFT_DEVELOPERS = {
  label: { key: "lift-developers.label", text: DEVELOPERS, at: { x: SAFE.left, y: TOP + 28 } as Point },
  row: { key: "lift-developers.row", lift: LIFT },
  units: Array.from({ length: UNIT.count }, (_, u) => {
    const x = unitX(u);
    return {
      key: `lift-developers.unit.${u}`,
      person: personAt(x + 27, UNIT.top, PERSON_SCALE),
      desk: { top: box(x + 4, DESK.y, 104, DESK.h), legs: [x + 14, x + 98], foot: DESK.foot },
      system: box(x + SYSTEM.dx, SYSTEM.y, SYSTEM.w, DESK.foot - SYSTEM.y),
    };
  }),
  stuck: STUCK_UNITS.map((u) => ({ key: `lift-developers.stuck.${u}`, at: { x: unitX(u) + SYSTEM.dx + SYSTEM.w, y: SYSTEM.y } as Point, r: MARK_R })),
  /** The stuck marks' one name, over the first of them. */
  stuckLabel: { key: "lift-developers.stuck.label", text: STUCK, at: { x: unitX(STUCK_UNITS[0]) + SYSTEM.dx + SYSTEM.w, y: SYSTEM.y - MARK_R - 22 } as Point },
  slab: {
    key: "lift-developers.slab",
    from: SLAB_FROM,
    parts: FOUNDATIONS.map((text, i) => {
      const at = partAt(i);
      return { key: `lift-developers.part.${i}`, at, label: { key: `lift-developers.part.${i}.label`, text, at: { x: at.x + 20, y: at.y + at.h / 2 } as Point } };
    }),
  },
  cycle: {
    key: "lift-developers.cycle",
    at: BAR,
    /** How much of its length the bar keeps once it shortens. */
    short: SHORT_W / BAR.w,
    green: { key: "lift-developers.cycle.short", at: box(BAR.x, BAR.y, SHORT_W, BAR.h) },
    label: { key: "lift-developers.cycle.label", text: CYCLE, at: { x: BAR.x, y: BAR.y - 24 } as Point },
  },
  backlog: {
    cards: Array.from({ length: CARD.count }, (_, i) => ({ key: `lift-developers.backlog.${i}`, at: box(CARD.x, cardY(i), CARD.w, CARD.h) })),
    /** How many cards come off the top, the top one first. */
    gone: CARD.gone,
    label: { key: "lift-developers.backlog.label", text: BACKLOG, at: { x: BAR.x, y: cardY(0) + CARD.h / 2 } as Point },
  },
  team: {
    key: "lift-developers.team",
    at: TEAM_BOX,
    from: LIFT,
    name: { text: TEAM, at: { x: TEAM_BOX.x + TEAM_BOX.w / 2, y: TEAM_BOX.y + 30 } as Point },
    people: Array.from({ length: 3 }, (_, i) => personAt(teamX0 + i * TEAM_PEOPLE.pitch, TEAM_PEOPLE.y, TEAM_PEOPLE.scale)),
  },
};

const lowered = (b: Box): Box => ({ ...b, y: b.y + LIFT });
const unitBox = (unit: (typeof LIFT_DEVELOPERS.units)[number]): Box => box(unit.desk.top.x, unit.person.y, UNIT.w - 4, DESK.foot - unit.person.y);
const markBox = (mark: (typeof LIFT_DEVELOPERS.stuck)[number]): Box => box(mark.at.x - mark.r, mark.at.y - mark.r, 2 * mark.r, 2 * mark.r);

/** Everything 19b draws under its story band, for the layout test: the row and its slab both lifted and before they lift. */
export const LIFT_DEVELOPERS_BOXES: Box[] = [
  labelBox(LIFT_DEVELOPERS.label.at, DEVELOPERS, "start"),
  ...LIFT_DEVELOPERS.units.flatMap((unit) => [unitBox(unit), lowered(unitBox(unit))]),
  ...LIFT_DEVELOPERS.stuck.flatMap((mark) => [markBox(mark), lowered(markBox(mark))]),
  labelBox(LIFT_DEVELOPERS.stuckLabel.at, STUCK),
  ...LIFT_DEVELOPERS.slab.parts.flatMap((part) => [part.at, lowered(part.at)]),
  BAR,
  labelBox(LIFT_DEVELOPERS.cycle.label.at, CYCLE, "start"),
  ...LIFT_DEVELOPERS.backlog.cards.map((card) => card.at),
  labelBox(LIFT_DEVELOPERS.backlog.label.at, BACKLOG, "start"),
  TEAM_BOX,
  lowered(TEAM_BOX),
];
