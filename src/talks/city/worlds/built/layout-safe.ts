/**
 * Slides 5 and 12a, the sandbox: where every part goes, the id it takes and
 * the words it holds, read from the script by position. Slide 5: the City's
 * systems as a row of buildings across the top; well below them, three
 * figures and the fence they put up round an empty yard, its one gate on
 * the right; a box carried in through the gate, which shuts behind it.
 * Slide 12a: the same yard filling the frame, a container in the middle,
 * five rings closing round it one at a time, and the repository it is
 * built from beside them.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, LINE, labelsOf, postsAlong } from "./layout";

/* 5. The sandbox */

const [OTHER, SECURITY, MICROSOFT, QUISITIVE, YARD, CANNOT, DATA] = labelsOf("safe");

/** The row of buildings: nine low blocks of different heights on one base line, from the middle of the stage to its right edge. */
const BASE = 700;
const HEIGHTS = [48, 60, 42, 56, 64, 46, 58, 50, 62];
const BUILDING = { x: 560, w: 100, gap: 36 };
/** Each building's windows: a column of small panes, two to a row, a pane every 18 px from 12 px under its roof. */
const windowsOf = (at: Box): Box[] => {
  const rows = Math.floor((at.h - 16) / 18);
  return Array.from({ length: rows }, (_, r) => [box(at.x + 24, at.y + 12 + r * 18, 18, 10), box(at.x + 58, at.y + 12 + r * 18, 18, 10)]).flat();
};

/** The yard's fence, well over 100 px below the buildings: a rectangle, its one wide gate in the right side, and the two rails that grow from the middle of its left side, one round the top and one round the bottom, to meet at the gate. */
const YARD_AT = box(660, 812, 840, 168);
const GATE = { top: 836, bottom: 956 };
const POST = 10;
const POST_PITCH = 92;
const LEFT_MIDDLE: Point = { x: YARD_AT.x, y: YARD_AT.y + YARD_AT.h / 2 };
const RIGHT = YARD_AT.x + YARD_AT.w;
const BOTTOM = YARD_AT.y + YARD_AT.h;
/** The posts along the fence, the gate's opening left clear. */
const SIDES: [Point, Point][] = [
  [{ x: YARD_AT.x, y: YARD_AT.y }, { x: RIGHT, y: YARD_AT.y }],
  [{ x: YARD_AT.x, y: BOTTOM }, { x: RIGHT, y: BOTTOM }],
  [{ x: YARD_AT.x, y: YARD_AT.y }, { x: YARD_AT.x, y: BOTTOM }],
];
const POSTS: Box[] = [
  ...SIDES.flatMap(([from, to]) => postsAlong(from, to, POST_PITCH)),
  ...postsAlong({ x: RIGHT, y: YARD_AT.y }, { x: RIGHT, y: GATE.top }, POST_PITCH),
  ...postsAlong({ x: RIGHT, y: GATE.bottom }, { x: RIGHT, y: BOTTOM }, POST_PITCH),
]
  .filter((post, i, all) => all.findIndex((other) => other.x === post.x && other.y === post.y) === i)
  .map((post) => box(post.x - POST / 2, post.y - POST / 2, POST, POST));

/** The three figures, side by side to the left of the fence, each named under its feet. */
const FIGURE = { w: 48, h: 64, y: 846 };
const FIGURE_X = [206, 400, 570];
const FIGURE_LABEL_W = [220, 160, 160];

/**
 * The box of data: it comes up outside the gate beyond the leaf's swing, in
 * the middle of the opening, under the open leaf, and is carried to the
 * middle of the yard by a hand under it. Its name comes up over it only
 * once it is set down.
 */
const DATA_BOX = box(1650, 864, 96, 56);
const DATA_TO = 1150;
/**
 * The hand, side on, coming in from the right: the forearm's two edges, the
 * palm flat under the box, and the fingers curled up in front of it. It is
 * drawn as one outline, in the words' ink.
 */
const PALM = DATA_BOX.y + DATA_BOX.h + 3;
const WRIST = DATA_BOX.x + DATA_BOX.w + 70;
const HAND_D = [
  `M${WRIST} ${PALM - 2}H${DATA_BOX.x + DATA_BOX.w + 10}`,
  `M${WRIST} ${PALM + 22}H${DATA_BOX.x + 20}C${DATA_BOX.x - 4} ${PALM + 22} ${DATA_BOX.x - 14} ${PALM + 10} ${DATA_BOX.x - 14} ${PALM - 6}`,
  `C${DATA_BOX.x - 14} ${PALM - 16} ${DATA_BOX.x - 4} ${PALM - 18} ${DATA_BOX.x - 2} ${PALM - 8}`,
  `M${DATA_BOX.x - 2} ${PALM}H${DATA_BOX.x + DATA_BOX.w + 10}`,
].join("");

export const SAFE_YARD = {
  buildings: {
    key: "safe.buildings",
    at: HEIGHTS.map((h, i) => box(BUILDING.x + i * (BUILDING.w + BUILDING.gap), BASE - h, BUILDING.w, h)),
    keyOf: (i: number) => `safe.building.${i}`,
    windowsOf,
  },
  base: { key: "safe.base", d: `M${BUILDING.x - 24} ${BASE}H${BUILDING.x + 9 * (BUILDING.w + BUILDING.gap) - BUILDING.gap + 24}` },
  other: { key: "safe.other", text: OTHER, at: box(160, BASE - 46, 376, LABEL_LINE) },
  cannot: { key: "safe.cannot", text: CANNOT, at: box(800, (BASE + YARD_AT.y - LABEL_LINE) / 2, 560, LABEL_LINE) },
  figures: FIGURE_X.map((x, i) => ({
    key: `safe.figure.${i}`,
    at: box(x - FIGURE.w / 2, FIGURE.y, FIGURE.w, FIGURE.h),
    label: { key: `safe.figure.${i}.label`, text: [SECURITY, MICROSOFT, QUISITIVE][i], at: box(x - FIGURE_LABEL_W[i] / 2, FIGURE.y + FIGURE.h + 12, FIGURE_LABEL_W[i], LABEL_LINE) },
  })),
  fence: {
    at: YARD_AT,
    rails: [
      { key: "safe.rail.top", d: `M${LEFT_MIDDLE.x} ${LEFT_MIDDLE.y}V${YARD_AT.y}H${RIGHT}V${GATE.top}` },
      { key: "safe.rail.bottom", d: `M${LEFT_MIDDLE.x} ${LEFT_MIDDLE.y}V${BOTTOM}H${RIGHT}V${GATE.bottom}` },
    ],
    posts: { key: "safe.posts", at: POSTS },
    gate: { key: "safe.gate", hinge: { x: RIGHT, y: GATE.top }, length: GATE.bottom - GATE.top },
  },
  yard: { key: "safe.yard", text: YARD, at: box(YARD_AT.x + 28, YARD_AT.y + 20, 360, LINE) },
  data: {
    key: "safe.data",
    at: DATA_BOX,
    /** How far it is carried: through the gate to the yard's middle. */
    carry: DATA_TO - DATA_BOX.x,
    /** Its name, over it where it is set down. */
    label: { key: "safe.data.label", text: DATA, at: box(DATA_TO + DATA_BOX.w / 2 - 110, DATA_BOX.y - 42, 220, LABEL_LINE) },
  },
  /** The hand, and how far it slides back toward the gate as it goes. */
  hand: { key: "safe.hand", d: HAND_D, at: box(DATA_BOX.x - 16, PALM - 20, WRIST - DATA_BOX.x + 16, 44), withdraw: 220 },
};

/* 12a. Inside the sandbox */

const [APPLICATION, ROLES, FIREWALLS, PRIVATE, MINIMAL, CODE, DEVOPS, COST] = labelsOf("controls");

/** The yard filling the frame's width, fenced all round, with room under it for the cost tag at the foot of the frame. */
const FULL_YARD = box(120, 638, 1680, 274);
/** The container, in the middle of the rings, and how much each ring stands off the one inside it: a tab's height and a little more, so the tabs on one side never meet. */
const CONTAINER = box(750, 747, 260, 64);
const CENTRE: Point = { x: CONTAINER.x + CONTAINER.w / 2, y: CONTAINER.y + CONTAINER.h / 2 };
const RING_STEP = { x: 56, y: 17 };
const ringAt = (k: number) => box(CONTAINER.x - k * RING_STEP.x, CONTAINER.y - k * RING_STEP.y, CONTAINER.w + 2 * k * RING_STEP.x, CONTAINER.h + 2 * k * RING_STEP.y);
/** A tab is as wide as its words, about 14 px a letter in the label type, with room either side: wide enough to break its ring's line behind them. */
const tabWidth = (text: string) => Math.round(text.length * 14 + 32);
/** The repository, to the right of the rings, with its name under it; the cost tag on its own under the fence, centred on the stage. */
const REPO = box(1420, CENTRE.y - 64, 140, 110);
/** The cost tag is as wide as its words in the label type (about 510 px) with room either side. */
const COST_W = 560;

export const CONTROLS = {
  fence: {
    at: FULL_YARD,
    rails: [{ key: "controls.rail", d: `M${FULL_YARD.x} ${FULL_YARD.y}H${FULL_YARD.x + FULL_YARD.w}V${FULL_YARD.y + FULL_YARD.h}H${FULL_YARD.x}Z` }],
    posts: {
      key: "controls.posts",
      at: [
        ...postsAlong({ x: FULL_YARD.x, y: FULL_YARD.y }, { x: FULL_YARD.x + FULL_YARD.w, y: FULL_YARD.y }, 120),
        ...postsAlong({ x: FULL_YARD.x, y: FULL_YARD.y + FULL_YARD.h }, { x: FULL_YARD.x + FULL_YARD.w, y: FULL_YARD.y + FULL_YARD.h }, 120),
        ...postsAlong({ x: FULL_YARD.x, y: FULL_YARD.y + 92 }, { x: FULL_YARD.x, y: FULL_YARD.y + FULL_YARD.h - 92 }, 92),
        ...postsAlong({ x: FULL_YARD.x + FULL_YARD.w, y: FULL_YARD.y + 92 }, { x: FULL_YARD.x + FULL_YARD.w, y: FULL_YARD.y + FULL_YARD.h - 92 }, 92),
      ].map((post) => box(post.x - POST / 2, post.y - POST / 2, POST, POST)),
    },
  },
  container: { key: "controls.container", at: CONTAINER, label: { key: "controls.application", text: APPLICATION, at: CONTAINER } },
  /** Five rings, inside out, each named on a tab in its edge: the odd ones on top, the even ones underneath, so no two tabs meet. */
  rings: [ROLES, FIREWALLS, PRIVATE, MINIMAL, CODE].map((text, i) => {
    const k = i + 1;
    const at = ringAt(k);
    const edge = k % 2 ? at.y : at.y + at.h;
    const w = tabWidth(text);
    return { key: `controls.ring.${k}`, at, rx: 18 + 6 * k, tab: { key: `controls.ring.${k}.tab`, text, at: box(CENTRE.x - w / 2, edge - LABEL_LINE / 2, w, LABEL_LINE) } };
  }),
  repo: {
    key: "controls.repo",
    at: REPO,
    label: { key: "controls.devops", text: DEVOPS, at: box(REPO.x + REPO.w / 2 - 130, REPO.y + REPO.h + 14, 260, LABEL_LINE) },
    /** From the repository to the outer ring: what it builds goes in. */
    arrow: { key: "controls.arrow", d: `M${REPO.x - 12} ${CENTRE.y}H${ringAt(5).x + ringAt(5).w + 14}`, end: { x: ringAt(5).x + ringAt(5).w + 14, y: CENTRE.y }, heading: 180 },
  },
  cost: { key: "controls.cost", text: COST, at: box(960 - COST_W / 2, FULL_YARD.y + FULL_YARD.h + 28, COST_W, 44) },
};

/** Everything slides 5 and 12a draw, for the layout test. */
export const SAFE_DRAWN: Record<string, Box[]> = {
  safe: [
    ...SAFE_YARD.buildings.at,
    SAFE_YARD.other.at,
    SAFE_YARD.cannot.at,
    ...SAFE_YARD.figures.flatMap((figure) => [figure.at, figure.label.at]),
    YARD_AT,
    SAFE_YARD.yard.at,
    DATA_BOX,
    SAFE_YARD.data.label.at,
    { ...DATA_BOX, x: DATA_TO },
    SAFE_YARD.hand.at,
    { ...SAFE_YARD.hand.at, x: SAFE_YARD.hand.at.x + SAFE_YARD.data.carry },
  ],
  controls: [FULL_YARD, CONTAINER, ...CONTROLS.rings.flatMap((ring) => [ring.at, ring.tab.at]), REPO, CONTROLS.repo.label.at, CONTROLS.cost.at],
};

/** The figures in slide 5 and the rings in slide 12a, for the tests that check they stay apart. */
export const SAFE_APART = { figureLabels: SAFE_YARD.figures.map((figure) => figure.label.at), tabs: CONTROLS.rings.map((ring) => ring.tab.at) };
