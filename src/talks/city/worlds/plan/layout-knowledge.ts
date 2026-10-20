/**
 * Slide 20a of the plan world: where every part goes, the id it takes and
 * the words it holds, read from the script.
 *
 * A row of five system boxes, each with a person beside it holding up a
 * lantern whose light falls on the box. One line of names runs above the
 * row: the systems over the first box, the light over the second lantern,
 * the staff over the third person, and later the new staff over the fourth.
 * A page of writing opens under the row, named at its left, and a green
 * helper walks along between the row and the page, a section of the page
 * filling as it passes each lantern. The two people at the right retire,
 * walking off the right edge, and their boxes go grey; two new people step
 * in where they stood, and the boxes light again. A slab of three parts
 * slides in under the whole row, and the row and the slab lift together.
 * The row and the slab are drawn where they end, lifted; they start `LIFT`
 * px lower.
 */
import { AGENT_R, box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, contentTop, labelBox, labelsOf, personAt } from "./layout";

const [SYSTEMS, STAFF, KNOW, RECORD, NEWCOMER, ...PARTS] = labelsOf("knowledge");
const TOP = contentTop("knowledge");

/** How far the row and its slab lift once the slab is under them. */
export const LIFT = 20;

/** The line of names above the row. */
const NAME_Y = TOP + 16;
const ROW = { y: TOP + 44, w: 190, h: 96, pitch: 320, count: 5 } as const;
const ROW_FOOT = ROW.y + ROW.h;
const rowX = (i: number) => SAFE.left + i * ROW.pitch;
/** A person stands this far right of their box, room for the lantern between. */
const FIGURE = { scale: 1.25, gap: 56 } as const;
/** The lantern, held up at head height in the near hand, between the person and the box; its light is a round pool `pool` px in radius. */
const LANTERN = { w: 16, h: 22, from: 26, up: 14, pool: 24 } as const;
/** The people at these places retire; new staff step in there. */
const RETIRE = [3, 4] as const;
/** A new person steps in from this far to the left of their place, clear of the box. */
const STEP_IN = -36;

const figureAt = (i: number) => {
  const at = personAt(rowX(i) + ROW.w + FIGURE.gap, 0, FIGURE.scale);
  return { ...at, y: ROW_FOOT - at.h };
};
/** The lantern's middle, beside the person's head. */
const lanternAt = (i: number): Point => ({ x: rowX(i) + ROW.w + LANTERN.from, y: figureAt(i).y + LANTERN.up });
/** The hand that holds it up: the person's near shoulder. */
const handAt = (i: number): Point => ({ x: figureAt(i).x + 4, y: figureAt(i).y + figureAt(i).h * 0.72 });
const lanternOf = (i: number) => ({ at: lanternAt(i), hand: handAt(i), w: LANTERN.w, h: LANTERN.h, pool: LANTERN.pool });
const middleOf = (b: Box) => b.x + b.w / 2;

/** The row's right side: the last person's. */
const ROW_RIGHT = figureAt(ROW.count - 1).x + figureAt(ROW.count - 1).w;
/** The slab: three parts side by side across the whole row, just under the people's feet; it comes in from this far left. */
const SLAB = { y: ROW_FOOT + 4, h: 46, gap: 4, from: -80 } as const;
const SLAB_W = (ROW_RIGHT - SAFE.left - 2 * SLAB.gap) / 3;
const partAt = (i: number) => box(SAFE.left + i * (SLAB_W + SLAB.gap), SLAB.y, SLAB_W, SLAB.h);

/** The helper's path: under the row's feet before it lifts, above the page. */
const WALK_Y = ROW_FOOT + LIFT + 30;
const START_X = SAFE.left + AGENT_R;
/** The page, right of its name, and its five sections of writing, one for each system. */
const PAGE = { x: 340, y: WALK_Y + AGENT_R + 36, w: ROW_RIGHT - 340, h: 100 } as const;
const SECTION = { x: PAGE.x + 20, pitch: 264, w: 236 } as const;
const sectionAt = (i: number) => box(SECTION.x + i * SECTION.pitch, PAGE.y + 18, SECTION.w, PAGE.h - 36);
/** A section's writing: three lines, the last shorter. */
const sectionLines = (at: Box): Box[] => [0, 1, 2].map((row) => box(at.x, at.y + 4 + row * 24, row === 2 ? at.w - 90 : at.w, 10));

/** A lantern's light as a box: the round pool round its middle. */
export const poolBox = (lantern: { at: Point; pool: number }, dx = 0): Box => box(lantern.at.x - lantern.pool + dx, lantern.at.y - lantern.pool, 2 * lantern.pool, 2 * lantern.pool);

/** How far the helper walks: from the row's left end to the last lantern. */
const ALONG = lanternAt(ROW.count - 1).x - START_X;
/** Where along the helper's run it passes each lantern, as fractions of the run: the moments each section of the page fills. */
export const READ_AT = Array.from({ length: ROW.count }, (_, i) => (lanternAt(i).x - START_X) / ALONG);

export const KNOWLEDGE = {
  systems: { key: "knowledge.systems", text: SYSTEMS, at: { x: rowX(0), y: NAME_Y } as Point },
  know: { key: "knowledge.know", text: KNOW, at: { x: lanternAt(1).x, y: NAME_Y } as Point },
  staff: { key: "knowledge.staff", text: STAFF, at: { x: middleOf(figureAt(2)), y: NAME_Y } as Point },
  newcomer: { key: "knowledge.newcomer.name", text: NEWCOMER, at: { x: middleOf(figureAt(RETIRE[0])), y: NAME_Y } as Point },
  /** The row as one part, for the lift: its boxes, its people and the new people. */
  row: { key: "knowledge.row", lift: LIFT },
  boxes: Array.from({ length: ROW.count }, (_, i) => ({
    key: `knowledge.box.${i}`,
    lit: `knowledge.box.${i}.lit`,
    at: box(rowX(i), ROW.y, ROW.w, ROW.h),
  })),
  /**
   * The people who know the systems, each with a lantern. The two who retire
   * walk right along the row: `edge` px takes their light past the safe
   * area's right edge.
   */
  keepers: Array.from({ length: ROW.count }, (_, i) => ({
    key: `knowledge.keeper.${i}`,
    at: figureAt(i),
    lantern: lanternOf(i),
    leaves: (RETIRE as readonly number[]).includes(i),
    edge: SAFE.right - poolBox(lanternOf(i)).x,
  })),
  record: {
    key: "knowledge.record",
    at: box(PAGE.x, PAGE.y, PAGE.w, PAGE.h),
    name: { key: "knowledge.record.name", text: RECORD, at: { x: SAFE.left, y: PAGE.y + PAGE.h / 2 } as Point },
    sections: Array.from({ length: ROW.count }, (_, i) => ({ key: `knowledge.record.${i}`, at: sectionAt(i), lines: sectionLines(sectionAt(i)) })),
  },
  /** The helper: it comes up at the row's left end and walks `along` px to the last lantern in one run. */
  helper: { key: "knowledge.helper", at: { x: START_X, y: WALK_Y } as Point, along: ALONG },
  /** The new people, each with a lantern, standing where the people who retired stood; each steps in from `from` px to the left. */
  newcomers: RETIRE.map((i) => ({ key: `knowledge.newcomer.${i}`, box: i, at: figureAt(i), lantern: lanternOf(i), from: STEP_IN })),
  slab: {
    key: "knowledge.slab",
    from: SLAB.from,
    parts: PARTS.map((text, i) => {
      const at = partAt(i);
      return { key: `knowledge.part.${i}`, at, label: { key: `knowledge.part.${i}.label`, text, at: { x: at.x + 20, y: at.y + at.h / 2 } as Point } };
    }),
  },
};

const lowered = (b: Box): Box => ({ ...b, y: b.y + LIFT });

/** Everything 20a draws under its story band, for the layout test: the row and its slab both lifted and before they lift, the retiring people where they start. */
export const KNOWLEDGE_BOXES: Box[] = [
  labelBox(KNOWLEDGE.systems.at, SYSTEMS, "start"),
  labelBox(KNOWLEDGE.know.at, KNOW),
  labelBox(KNOWLEDGE.staff.at, STAFF),
  labelBox(KNOWLEDGE.newcomer.at, NEWCOMER),
  ...KNOWLEDGE.boxes.flatMap((entry) => [entry.at, lowered(entry.at)]),
  ...KNOWLEDGE.keepers.flatMap((keeper) => [keeper.at, lowered(keeper.at), poolBox(keeper.lantern), lowered(poolBox(keeper.lantern))]),
  ...KNOWLEDGE.slab.parts.flatMap((part) => [part.at, lowered(part.at)]),
  KNOWLEDGE.record.at,
  labelBox(KNOWLEDGE.record.name.at, RECORD, "start"),
  ...[0, ALONG].map((dx) => box(START_X + dx - AGENT_R, WALK_Y - AGENT_R, 2 * AGENT_R, 2 * AGENT_R)),
];
