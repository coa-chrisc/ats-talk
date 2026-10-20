/**
 * Slides 25 to 27's clicks. Each plays its whole slide: what the drawing is
 * made of arrives first, then what happens to it, each story line landing
 * with the beat it describes, and the slide's tag last.
 */
import { EASE, RISE, draw, fill, hide, rise, show, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, keys, play } from "./beats";
import { AMANDA, FORESIGHT, GRANTS } from "./layout-tools";

const F = FORESIGHT;
const G = GRANTS;
const A = AMANDA;

/** Slide 25: the sources pour into the funnel, are scored against the priorities, and the few that pass become the brief on the table. */
const scored = [
  draw(F.funnel.key, { at: 0 }),
  draw(F.sieve.key, { at: 0.5, duration: 0.6 }),
  show(keys(F.tiles), { at: 0.8, stagger: 0.06 }),
  rise(F.priorities.key, { at: 0.9 }),
  // A pour of dots drops into the mouth and through the tiles, each tile lighting as it scores them.
  to(F.stream.key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -24 }, { at: 1.1, duration: 0.4, ease: EASE.out }),
  to(F.stream.key, { autoAlpha: 0, y: F.stream.drop }, undefined, { at: 1.5, duration: 0.9, ease: EASE.draw }),
  fill(keys(F.tiles), { at: 1.6, duration: 0.4, stagger: 0.12 }),
  to(F.signals.key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: F.signals.from }, { at: 2.3, duration: 0.75, ease: EASE.out }),
  rise(F.signalsLabel.key, { at: 2.6 }),
];

/** The brief gathers under the spout beside the signals, is written, then travels up and along onto the table: along on the page curve, up on the carry. */
const TRAVEL = { at: 1.3, duration: 1.2 } as const;
const briefed = [
  to(F.page.key, { autoAlpha: 1, y: F.page.below }, { autoAlpha: 0, x: F.page.from, y: F.page.below + RISE }, { at: 0, duration: 0.75, ease: EASE.out }),
  draw(F.page.lines.key, { at: 0.35, duration: 0.8 }),
  draw(F.table.key, { at: 0.8 }),
  to(F.page.key, { x: 0 }, undefined, { ...TRAVEL, ease: EASE.page }),
  to(F.page.key, { y: 0 }, undefined, { ...TRAVEL, ease: EASE.carry }),
  rise(F.reviews.key, { at: 2.1 }),
];

export const foresight = picture("foresight", {
  play: play(
    into("foresight"),
    {
      with: true,
      hold: 0.3,
      moves: [rise(F.band.rowKeys, { at: 0, stagger: 0.12 }), show(F.moon.key, { at: 0.2, duration: 0.6 }), rise(F.sources.key, { at: 0.35 })],
    },
    { moves: scored },
    { with: true, hold: 2.3, moves: [story("foresight", 0)] },
    { moves: briefed },
    { with: true, hold: 1.3, moves: [story("foresight", 1)] },
    { moves: [wipe(F.tag.key, { from: "left" })] },
  ),
});

/** Slide 26, left: the grants are scored one at a time; each strong fit tints and drops into the tray, and the rest fade where they sat. */
const SCORE_EVERY = 0.4;
const graded = [
  rise(keys(G.cards), { at: 0, stagger: 0.08 }),
  draw(G.tray.key, { at: 0.3, duration: 0.7 }),
  ...G.cards.flatMap((card, i) => {
    const at = 0.9 + i * SCORE_EVERY;
    return card.strong
      ? [fill(card.key, { at, duration: 0.4 }), to(card.key, { x: card.to, y: card.drop }, { x: 0, y: 0 }, { at: at + 0.3, duration: 0.8, ease: EASE.page })]
      : [hide(card.key, { at, duration: 0.5 })];
  }),
  rise(G.strongFit.key, { at: 2.0 }),
  rise(G.millions.key, { at: 2.9 }),
];

/** Slide 26, right: three bills come off the stack in turn and each turns into a short summary at its place. */
const TURN_EVERY = 0.55;
const summarised = [
  rise(G.stack.key, { at: 0 }),
  rise(G.bills.key, { at: 0.3 }),
  ...G.turns.flatMap((turn, i) => {
    const at = 0.6 + i * TURN_EVERY;
    return [
      show(turn.key, { at, duration: 0.25 }),
      to(turn.key, { x: turn.to }, { x: 0 }, { at, duration: 0.9, ease: EASE.page }),
      fill(turn.key, { at: at + 0.7, duration: 0.6 }),
    ];
  }),
  rise(G.summary.key, { at: 2.6 }),
];

/** Each panel's tag settles, then its own timeline drops from it and lights: the left panel's one point, then the right panel's two in turn. */
const POINT_EVERY = 0.45;
const points = G.timelines.flatMap((line) => line.points);
const timed = [
  wipe(keys(G.validated), { at: 0, stagger: 0.15 }),
  draw(G.timelines.map((line) => line.join.key), { at: 0.4, duration: 0.4, stagger: 0.1 }),
  draw(keys(G.timelines), { at: 0.7, duration: 0.6, stagger: 0.1 }),
  ...points.flatMap((point, i) => [show(point.key, { at: 1.1 + i * POINT_EVERY, duration: 0.3 }), fill(point.key, { at: 1.2 + i * POINT_EVERY, duration: 0.4 }), rise(point.label.key, { at: 1.2 + i * POINT_EVERY })]),
];

export const grantscope = picture("grantscope", {
  play: play(
    into("grantscope"),
    { with: true, hold: 0.3, moves: [draw(keys(G.panels), { at: 0, stagger: 0.15 }), rise(keys(G.names), { at: 0.4, stagger: 0.15 })] },
    { moves: graded },
    { with: true, hold: 1.6, moves: summarised },
    { with: true, hold: 1.0, moves: [story("grantscope", 0)] },
    { with: true, hold: 1.4, moves: [story("grantscope", 1)] },
    { moves: timed },
  ),
});

/**
 * Slide 27: the code pages turn into documentation page by page while the
 * strip of days fills, then the two bars draw on one baseline, the first
 * story line coming up with them.
 */
const PAGE_EVERY = 0.08;
const PAGE_TURN = 0.45;
const turning = (A.pages.length - 1) * PAGE_EVERY;
const documented = [
  ...A.pages.map((page, i) => fill(page.doc, { at: i * PAGE_EVERY, duration: PAGE_TURN })),
  ...A.days.map((day, i) => fill(day.key, { at: (i * turning) / A.days.length, duration: 0.3 })),
  rise(A.documented.key, { at: 0.6 }),
  rise(A.daysLabel.key, { at: turning }),
];

const costed = [
  draw(A.axis.key, { at: 0, duration: 0.7 }),
  fill(A.ours.key, { at: 0.4, duration: 0.4 }),
  rise(A.oursLabel.key, { at: 0.5 }),
  fill(A.vendor.key, { at: 0.9, duration: 1.1 }),
  rise(A.vendorLabel.key, { at: 1.6 }),
  rise(A.top.key, { at: 1.8 }),
];

export const amanda = picture("amanda", {
  play: play(
    into("amanda"),
    {
      with: true,
      hold: 0.3,
      moves: [rise(A.legacy.key, { at: 0 }), show(keys(A.pages), { at: 0.15, stagger: 0.03 }), show(keys(A.days), { at: 0.4, stagger: 0.015 })],
    },
    { with: true, hold: 0.45, moves: documented },
    { hold: 0, moves: costed },
    { with: true, hold: 0.2, moves: [story("amanda", 0)] },
    { moves: [wipe(A.tag.key, { from: "left" })] },
    { with: true, hold: 0.3, moves: [story("amanda", 1)] },
  ),
});
