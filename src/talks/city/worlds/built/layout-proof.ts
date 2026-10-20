/**
 * Slides 10 to 12, the proof: where every part goes, the id it takes and
 * the words it holds, read from the script by position. Slide 10: a grid
 * of ten tiles, each with its name, the people it serves and its status.
 * Slide 11: Austin Public Health in the middle, the nine groups that have
 * seen the work and the two universities we research with around it, the
 * departments nearer in, and the practitioner ring at the edge, each
 * joined to the middle. Slide 12: five
 * plaques on a wall.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, labelsOf } from "./layout";

/* 10. What we have built, and for whom */

const [
  FORESIGHT,
  MANAGER,
  SANCTIONED,
  GRANTSCOPE,
  POLICYPULSE,
  RELATIONS,
  PILOT,
  AVTAS,
  FIRE,
  AMANDA,
  DEVELOPMENT,
  THIRD,
  MAYOR,
  PROTOTYPE,
  TRANSCRIBER,
  APH,
  PURCHASING,
  MEDICAL,
  IN_USE,
  CATALOG,
  BCHC,
  LIVE,
] = labelsOf("portfolio");

/** The ten tools in the order they light, each with the people it serves and its status, as They see lists them. */
const TOOLS = [
  [FORESIGHT, MANAGER, SANCTIONED],
  [GRANTSCOPE, RELATIONS, PILOT],
  [POLICYPULSE, RELATIONS, PILOT],
  [AVTAS, FIRE, PILOT],
  [AMANDA, DEVELOPMENT, PILOT],
  [THIRD, MAYOR, PROTOTYPE],
  [TRANSCRIBER, APH, PILOT],
  [PURCHASING, APH, IN_USE],
  [MEDICAL, APH, IN_USE],
  [CATALOG, BCHC, LIVE],
] as const;
/** Five to a row, two rows, filling the width under the story band. */
const TILE = { x: 96, y: 556, w: 326, h: 208, dx: 350, dy: 220 };

export const PORTFOLIO = {
  /** The grid's empty places, which come up first: each tile lights up in its own. */
  slots: { key: "portfolio.slots" },
  tiles: TOOLS.map(([name, people, status], i) => ({
    key: `portfolio.tile.${i}`,
    at: box(TILE.x + (i % 5) * TILE.dx, TILE.y + Math.floor(i / 5) * TILE.dy, TILE.w, TILE.h),
    name,
    people,
    status,
    /** In use: the tile fills with the process's green. The catalog: its edge is the catalog's indigo. */
    inUse: status === IN_USE,
    catalog: name === CATALOG,
  })),
};

/* 11. Who has seen it */

const [CENTRE_NAME, HEALTH_COMMISSION, ASKED, TECH_COMMISSION, SAFETY, BOARD, ATS, AVIATION, ANIMAL, ENERGY, ALLIANCE, TEXAS, ST_EDWARDS, DEPARTMENTS, PRACTITIONERS] = labelsOf("seen");

const CENTRE: Point = { x: 960, y: 756 };
const CENTRE_R = 96;
/** The nine named groups and the two universities on an ellipse round the middle, by angle (0 to the right, 90 down), each named on its outer side; the bottom of the ellipse is kept for the practitioner group. The universities sit halfway down each side, between the middle row and the row under it. */
const RING = { rx: 480, ry: 180 };
const NAMED: { text: string; angle: number; side: "left" | "right" | "below" }[] = [
  { text: HEALTH_COMMISSION, angle: -150, side: "left" },
  { text: TECH_COMMISSION, angle: -30, side: "right" },
  { text: SAFETY, angle: 180, side: "left" },
  { text: BOARD, angle: 0, side: "right" },
  { text: ATS, angle: 150, side: "left" },
  { text: AVIATION, angle: 30, side: "right" },
  { text: ANIMAL, angle: 130, side: "left" },
  { text: ENERGY, angle: 50, side: "right" },
  { text: ALLIANCE, angle: -90, side: "right" },
  { text: TEXAS, angle: 166, side: "left" },
  { text: ST_EDWARDS, angle: 14, side: "right" },
];
function onEllipse(angle: number, rx: number, ry: number): Point {
  return { x: Math.round(CENTRE.x + rx * Math.cos((angle * Math.PI) / 180)), y: Math.round(CENTRE.y + ry * Math.sin((angle * Math.PI) / 180)) };
}
/** A name's box is as wide as its words, about 14 px a letter in the label type. */
const nameBox = (at: Point, side: "left" | "right" | "below", text: string) => {
  const w = Math.round(text.length * 14);
  return side === "left" ? box(at.x - 22 - w, at.y - LABEL_LINE / 2, w, LABEL_LINE) : side === "right" ? box(at.x + 22, at.y - LABEL_LINE / 2, w, LABEL_LINE) : box(at.x - w / 2, at.y + 18, w, LABEL_LINE);
};
/** The departments: smaller dots on a nearer ellipse, at angles between the named groups' lines (none just under the middle row, where the universities' lines run), named once beside the one at the upper right. */
const DEPARTMENT_ANGLES = [-168, -140, -120, -105, -75, -60, -40, -12, 38, 142];
const NEAR = { rx: 300, ry: 140 };
const DEPARTMENTS_DOT = onEllipse(-60, NEAR.rx, NEAR.ry);
/** The practitioner group, a group of people: nine dots round a navy rule, on the outer ellipse at its foot, under the middle, named on its right. */
const RING_CENTRE: Point = onEllipse(90, RING.rx, RING.ry);
const RING_R = 42;

/** A line from the middle's edge out to a dot, stopping short of the dot. */
const spoke = (to: Point, short: number) => {
  const dx = to.x - CENTRE.x;
  const dy = to.y - CENTRE.y;
  const length = Math.hypot(dx, dy);
  const from = { x: CENTRE.x + (dx / length) * CENTRE_R, y: CENTRE.y + (dy / length) * CENTRE_R };
  const end = { x: to.x - (dx / length) * short, y: to.y - (dy / length) * short };
  return `M${Math.round(from.x)} ${Math.round(from.y)}L${Math.round(end.x)} ${Math.round(end.y)}`;
};

export const SEEN = {
  centre: { key: "seen.centre", at: CENTRE, r: CENTRE_R, label: { key: "seen.centre.label", text: CENTRE_NAME, at: box(CENTRE.x - 92, CENTRE.y - 34, 184, 68) } },
  named: NAMED.map(({ text, angle, side }, i) => {
    const at = onEllipse(angle, RING.rx, RING.ry);
    const name = nameBox(at, side, text);
    return {
      key: `seen.dot.${i}`,
      at,
      spoke: { key: `seen.spoke.${i}`, d: spoke(at, 16) },
      name: { key: `seen.name.${i}`, text, at: name, align: side === "left" ? ("right" as const) : side === "right" ? ("left" as const) : ("center" as const) },
    };
  }),
  /** The two commissions that asked us back: a tag directly under each one's name, centred on it. */
  askedBack: [0, 1].map((i) => {
    const name = nameBox(onEllipse(NAMED[i].angle, RING.rx, RING.ry), NAMED[i].side, NAMED[i].text);
    const w = 200;
    return { key: `seen.asked.${i}`, text: ASKED, at: box(Math.round(name.x + name.w / 2 - w / 2), name.y + name.h + 8, w, 40) };
  }),
  departments: {
    key: "seen.departments",
    at: DEPARTMENT_ANGLES.map((angle) => onEllipse(angle, NEAR.rx, NEAR.ry)),
    spokes: { key: "seen.department.spokes", d: DEPARTMENT_ANGLES.map((angle) => onEllipse(angle, NEAR.rx, NEAR.ry)).map((at) => spoke(at, 10)) },
    label: { key: "seen.departments.label", text: DEPARTMENTS, at: box(DEPARTMENTS_DOT.x + 16, DEPARTMENTS_DOT.y - LABEL_LINE / 2 - 14, 180, LABEL_LINE) },
  },
  practitioners: {
    key: "seen.practitioners",
    at: Array.from({ length: 9 }, (_, i): Point => ({ x: Math.round(RING_CENTRE.x + RING_R * Math.cos((i * 2 * Math.PI) / 9 - Math.PI / 2)), y: Math.round(RING_CENTRE.y + RING_R * Math.sin((i * 2 * Math.PI) / 9 - Math.PI / 2)) })),
    centre: RING_CENTRE,
    r: RING_R,
    /** The navy rule round the group, drawn on as it forms. */
    rule: { key: "seen.practitioners.rule" },
    spoke: { key: "seen.practitioners.spoke", d: spoke(RING_CENTRE, RING_R + 4) },
    label: { key: "seen.practitioners.label", text: PRACTITIONERS, at: box(RING_CENTRE.x + RING_R + 18, RING_CENTRE.y - LABEL_LINE / 2, Math.round(PRACTITIONERS.length * 14), LABEL_LINE) },
  },
};

/* 12. Recognition */

const [LEADER, BLOOMBERG, DATA_ALLIANCE, COALITION, INVITED, COALITION_WORK, ...HOSTS] = labelsOf("recognition");

/** The wall's rail, and five plaques hung from it, the width of the band between them. */
const RAIL_Y = 568;
const PLAQUE = { x: 96, y: 612, w: 312, h: 360, dx: 354 };

export const RECOGNITION = {
  rail: { key: "recognition.rail", d: `M96 ${RAIL_Y}H1824` },
  plaques: [LEADER, BLOOMBERG, DATA_ALLIANCE, COALITION, INVITED].map((text, i) => {
    const at = box(PLAQUE.x + i * PLAQUE.dx, PLAQUE.y, PLAQUE.w, PLAQUE.h);
    const cx = at.x + at.w / 2;
    return {
      key: `recognition.plaque.${i}`,
      at,
      text,
      /** The cord it hangs by: from a nail on the rail to its two top corners' insets. */
      cord: { key: `recognition.cord.${i}`, d: `M${at.x + 56} ${at.y}L${cx} ${RAIL_Y + 6}L${at.x + at.w - 56} ${at.y}` },
      /** Under its name in smaller type: the coalition's plaque, what we built with it; the last plaque, its four names. */
      hosts: i === 3 ? [COALITION_WORK] : i === 4 ? HOSTS : [],
    };
  }),
  /** How far each plaque drops as it settles. */
  settle: -30,
};

/** Everything slides 10 to 12 draw, for the layout test. */
export const PROOF_DRAWN: Record<string, Box[]> = {
  portfolio: PORTFOLIO.tiles.map((tile) => tile.at),
  seen: [
    box(CENTRE.x - CENTRE_R, CENTRE.y - CENTRE_R, 2 * CENTRE_R, 2 * CENTRE_R),
    ...SEEN.named.flatMap((dot) => [box(dot.at.x - 10, dot.at.y - 10, 20, 20), dot.name.at]),
    ...SEEN.askedBack.map((tag) => tag.at),
    ...SEEN.departments.at.map((at) => box(at.x - 6, at.y - 6, 12, 12)),
    SEEN.departments.label.at,
    box(RING_CENTRE.x - RING_R - 8, RING_CENTRE.y - RING_R - 8, 2 * RING_R + 16, 2 * RING_R + 16),
    SEEN.practitioners.label.at,
  ],
  recognition: RECOGNITION.plaques.flatMap((plaque) => [plaque.at, { ...plaque.at, y: plaque.at.y + RECOGNITION.settle }]),
};
