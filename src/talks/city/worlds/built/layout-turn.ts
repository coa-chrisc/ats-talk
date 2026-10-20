/**
 * Slides 6 and 6a, the turn: where every part goes, the id it takes and the
 * words it holds, read from the script by position. Slide 6 opens on a
 * plain wall in the middle of the empty stage and a few strands of
 * spaghetti, drawn as wavy grey lines, that fly at it, stick, and slide
 * down it and away before any words come. Then: the old
 * question on a card in the middle, which greys and steps aside to the
 * lower left, and the loop that takes its place, drawn in the process's
 * green, with one named idea on its way in. Slide 6a: a stair of
 * application tiles, a step a year with its count on top, and the line of
 * code reused climbing behind it from low at the left edge.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { KEY_LINE, LABEL_LINE, LINE, labelsOf, round } from "./layout";

/* 6. The wrong question */

const [QUESTION, GOOD, GOVERNED, AGAIN, VALUE] = labelsOf("wrong-question");

/** The card, alone in the middle of the drawing's room under a three-line title, and where it steps aside to: the lower left, out of the loop's way. */
const ASK = box(680, 750, 560, 120);
const ASIDE = { x: 96, y: 860 };
/** The loop's two places: ideas on the left, services on the right, at the loop's top. */
const GOOD_AT = box(800, 660, 320, 100);
const GOVERNED_AT = box(1440, 660, 360, 100);
const ACROSS_Y = GOOD_AT.y + GOOD_AT.h / 2;
/** The return under the loop: down from the right place, back along under both, and up into the left one. */
const RETURN_Y = 900;
const BEND = 20;
const LEFT_X = 960;
const RIGHT_X = 1620;
/** The new idea: a card as wide as its name and room either side (about 140 px in the label type), level with the way across, that comes in from the left edge and stops just short of the loop's first place. */
const IDEA = box(580, ACROSS_Y - 32, 200, 64);
const IDEA_FROM = 96 - IDEA.x;

/**
 * The opening, on the empty stage before the title: a plain wall, a panel
 * in the raised grey in the middle of the stage, and the strands stuck on
 * it, each a wavy line about its middle, at its own slant. The wall's
 * room is the stage's, since nothing else is up while it shows.
 */
const WALL = box(700, 290, 520, 500);
/** Each strand where it sticks: its middle, its length, its slant in degrees (0 across, 90 down), how many waves it makes and how deep. */
const STRANDS = [
  { x: 840, y: 400, length: 200, slant: -16, waves: 2.5, depth: 10 },
  { x: 1080, y: 440, length: 180, slant: 64, waves: 2, depth: 12 },
  { x: 930, y: 530, length: 220, slant: 8, waves: 3, depth: 9 },
  { x: 1110, y: 590, length: 170, slant: -40, waves: 2, depth: 11 },
  { x: 820, y: 630, length: 160, slant: 32, waves: 1.5, depth: 12 },
] as const;
/** A strand's line is this thick, and is traced through this many points. */
const STRAND_W = 6;
const STRAND_POINTS = 32;
/** Where a strand flies from: its left end this far in from the stage's left edge, and this much lower, so it climbs a little on its way to the wall. */
const FLY_FROM_X = 120;
const FLY_LIFT = 90;
/** How far a strand slides down the wall and off it as it clears. */
const SLIDE = 170;

const strandPoints = ({ x, y, length, slant, waves, depth }: (typeof STRANDS)[number]): Point[] => {
  const a = (slant * Math.PI) / 180;
  const along = { x: Math.cos(a), y: Math.sin(a) };
  const across = { x: -along.y, y: along.x };
  return Array.from({ length: STRAND_POINTS + 1 }, (_, i) => {
    const t = i / STRAND_POINTS - 0.5;
    const wave = depth * Math.sin(2 * Math.PI * waves * (t + 0.5));
    return { x: round(x + along.x * length * t + across.x * wave), y: round(y + along.y * length * t + across.y * wave) };
  });
};
const boundsOf = (points: readonly Point[]): Box => {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const pad = STRAND_W / 2;
  return box(Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) - Math.min(...xs) + STRAND_W, Math.max(...ys) - Math.min(...ys) + STRAND_W);
};

const OPENING = {
  wall: { key: "wrong.wall", at: WALL },
  strands: STRANDS.map((strand, i) => {
    const points = strandPoints(strand);
    const at = boundsOf(points);
    return {
      key: `wrong.strand.${i}`,
      d: `M${points.map((p) => `${p.x} ${p.y}`).join("L")}`,
      at,
      /** Where it flies from, as an offset from where it sticks; and how far it slides down. */
      from: { x: round(FLY_FROM_X - at.x), y: FLY_LIFT },
      drop: SLIDE,
    };
  }),
};

export const WRONG = {
  ask: {
    key: "wrong.ask",
    at: ASK,
    text: QUESTION,
    /** How far it steps aside. */
    aside: { x: ASIDE.x - ASK.x, y: ASIDE.y - ASK.y },
  },
  good: { key: "wrong.good", at: GOOD_AT, label: { key: "wrong.good.label", text: GOOD, at: GOOD_AT } },
  governed: { key: "wrong.governed", at: GOVERNED_AT, label: { key: "wrong.governed.label", text: GOVERNED, at: GOVERNED_AT } },
  /** Across the top, from ideas to services. */
  across: { key: "wrong.across", d: `M${GOOD_AT.x + GOOD_AT.w + 14} ${ACROSS_Y}H${GOVERNED_AT.x - 14}`, end: { x: GOVERNED_AT.x - 14, y: ACROSS_Y }, heading: 0 },
  back: {
    key: "wrong.back",
    d: `M${RIGHT_X} ${GOVERNED_AT.y + GOVERNED_AT.h + 12}V${RETURN_Y - BEND}Q${RIGHT_X} ${RETURN_Y} ${RIGHT_X - BEND} ${RETURN_Y}H${LEFT_X + BEND}Q${LEFT_X} ${RETURN_Y} ${LEFT_X} ${RETURN_Y - BEND}V${GOOD_AT.y + GOOD_AT.h + 14}`,
    end: { x: LEFT_X, y: GOOD_AT.y + GOOD_AT.h + 14 },
    heading: 270,
  },
  again: { key: "wrong.again", text: AGAIN, at: box((LEFT_X + RIGHT_X) / 2 - 200, RETURN_Y + 16, 400, LABEL_LINE) },
  /** The idea, named on its card, and how far it comes in from. */
  idea: { key: "wrong.idea", text: VALUE, at: IDEA, from: IDEA_FROM },
  /** The opening before the title: the wall and the strands that hit it. */
  opening: OPENING,
};

/* 6a. Two to twenty */

const [Y2023, Y2024, Y2025, TODAY, TWO, FIVE, ELEVEN, TWENTY, CODE, LOW, HIGH, ESTIMATE] = labelsOf("two-to-twenty");

/** An application tile, and the rows a step's tiles stack in, four to a row, from the floor up. */
const TILE = { side: 32, pitch: 38, perRow: 4 };
const FLOOR = 940;
const STEP_W = TILE.perRow * TILE.pitch - (TILE.pitch - TILE.side);
const STEP_X = [560, 820, 1080, 1340];
/** Each year's count of applications, as the tiles show it: two, five, 11 and 20. */
const COUNTS = [2, 5, 11, 20];
const tileTop = (row: number) => FLOOR - TILE.side - row * TILE.pitch;
const stepTop = (s: number) => tileTop(Math.ceil(COUNTS[s] / TILE.perRow) - 1);

/** How far the line of code reused rides over each step's top row, at the step's left and right corners: it climbs as it crosses. */
const OVER = { left: 16, right: 22 };
/** A count's box stands this far over its step's top row, so the line runs between the two. */
const COUNT_OVER = 40;

/** The line of code reused: from low at the left edge, before the first step, over each step's top row, to just past the last step. */
const START: Point = { x: 150, y: FLOOR - 8 };
const END: Point = { x: 1530, y: stepTop(3) - 28 };
const THROUGH: Point[] = [
  START,
  ...STEP_X.flatMap((x, s) => [
    { x: x - 8, y: stepTop(s) - OVER.left },
    ...(s < STEP_X.length - 1 ? [{ x: x + STEP_W + 8, y: stepTop(s) - OVER.right }] : []),
  ]),
  END,
];

/**
 * The line's tangent at each point it passes through, kept monotone
 * (Fritsch and Carlson): between two points the line never rises above the
 * higher or dips below the lower, so it stays over every step's top row and
 * under every count.
 */
const SLOPES = (() => {
  const secants = THROUGH.slice(1).map((p, i) => (p.y - THROUGH[i].y) / (p.x - THROUGH[i].x));
  const slopes = THROUGH.map((_, i) => {
    if (i === 0) return secants[0];
    if (i === THROUGH.length - 1) return secants[i - 1];
    return secants[i - 1] * secants[i] <= 0 ? 0 : (secants[i - 1] + secants[i]) / 2;
  });
  secants.forEach((d, i) => {
    if (d === 0) {
      slopes[i] = 0;
      slopes[i + 1] = 0;
      return;
    }
    const a = slopes[i] / d;
    const b = slopes[i + 1] / d;
    const h = Math.hypot(a, b);
    if (h > 3) {
      slopes[i] = (3 * a * d) / h;
      slopes[i + 1] = (3 * b * d) / h;
    }
  });
  return slopes;
})();

/** Each segment's cubic, its x even in t, so its y is read straight off x. */
const SEGMENTS = THROUGH.slice(1).map((p, i) => {
  const q = THROUGH[i];
  const h = p.x - q.x;
  return { x0: q.x, x1: p.x, y: [q.y, q.y + (SLOPES[i] * h) / 3, p.y - (SLOPES[i + 1] * h) / 3, p.y] };
});

/** The line's height at a given x along it. */
export function reuseAt(x: number): number {
  const seg = SEGMENTS.find((s) => x <= s.x1) ?? SEGMENTS[SEGMENTS.length - 1];
  const t = Math.min(1, Math.max(0, (x - seg.x0) / (seg.x1 - seg.x0)));
  const [a, b, c, d] = seg.y;
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
}

const REUSE_D = `M${START.x} ${START.y}${SEGMENTS.map((seg) => {
  const h = seg.x1 - seg.x0;
  return `C${round(seg.x0 + h / 3)} ${round(seg.y[1])} ${round(seg.x1 - h / 3)} ${round(seg.y[2])} ${seg.x1} ${seg.y[3]}`;
}).join("")}`;

export const TWENTY_STEPS = {
  tile: TILE,
  steps: STEP_X.map((x, s) => {
    const count = COUNTS[s];
    const rows = Math.ceil(count / TILE.perRow);
    const top = stepTop(s);
    return {
      key: `twenty.step.${s}`,
      at: box(x, top, STEP_W, FLOOR - top),
      /** The step's rows, bottom up, each the tiles in it. */
      rows: Array.from({ length: rows }, (_, r) => ({
        key: `twenty.step.${s}.row.${r}`,
        tiles: Array.from({ length: Math.min(TILE.perRow, count - r * TILE.perRow) }, (_, i) => box(x + i * TILE.pitch, tileTop(r), TILE.side, TILE.side)),
      })),
      year: { key: `twenty.year.${s}`, text: [Y2023, Y2024, Y2025, TODAY][s], at: box(x, FLOOR + 16, STEP_W, LABEL_LINE) },
      count: { key: `twenty.count.${s}`, text: [TWO, FIVE, ELEVEN, TWENTY][s], at: box(x, top - COUNT_OVER - KEY_LINE, STEP_W, KEY_LINE), drop: -24 },
    };
  }),
  line: {
    key: "twenty.line",
    d: REUSE_D,
    start: { key: "twenty.line.start", at: START },
    end: { key: "twenty.line.end", at: END },
  },
  /** At the line's start, its name over the low figure; at its end, the high figure with the tag under it. */
  code: { key: "twenty.code", text: CODE, at: box(96, START.y - 110, 300, LINE) },
  low: { key: "twenty.low", text: LOW, at: box(96, START.y - 64, 300, LABEL_LINE) },
  high: { key: "twenty.high", text: HIGH, at: box(END.x + 18, END.y - LABEL_LINE / 2, 260, LABEL_LINE) },
  estimate: { key: "twenty.estimate", text: ESTIMATE, at: box(END.x + 18, END.y + 30, 260, 40) },
};

/**
 * Everything slide 6's opening draws, for the layout test: the wall, and
 * each strand where it flies from, sticks and slides to. It is up only
 * while the stage holds no words (wrong-question.test.ts), so it may use
 * the room the title and story band take later; it stays clear of the
 * frame.
 */
export const OPENING_DRAWN: Box[] = [
  WALL,
  ...OPENING.strands.flatMap((strand) => [strand.at, { ...strand.at, x: strand.at.x + strand.from.x, y: strand.at.y + strand.from.y }, { ...strand.at, y: strand.at.y + strand.drop }]),
];

/** Everything slides 6 and 6a draw, for the layout test. */
export const TURN_DRAWN: Record<string, Box[]> = {
  "wrong-question": [WRONG.ask.at, { ...WRONG.ask.at, x: WRONG.ask.at.x + WRONG.ask.aside.x, y: WRONG.ask.at.y + WRONG.ask.aside.y }, GOOD_AT, GOVERNED_AT, WRONG.again.at, IDEA, { ...IDEA, x: IDEA.x + IDEA_FROM }, box(LEFT_X, GOOD_AT.y + GOOD_AT.h, RIGHT_X - LEFT_X, RETURN_Y - GOOD_AT.y - GOOD_AT.h)],
  "two-to-twenty": [
    ...TWENTY_STEPS.steps.flatMap((step) => [step.at, step.year.at, step.count.at, { ...step.count.at, y: step.count.at.y + step.count.drop }]),
    TWENTY_STEPS.code.at,
    TWENTY_STEPS.low.at,
    TWENTY_STEPS.high.at,
    TWENTY_STEPS.estimate.at,
    box(START.x - 8, END.y - 8, END.x - START.x + 16, START.y - END.y + 16),
  ],
};
