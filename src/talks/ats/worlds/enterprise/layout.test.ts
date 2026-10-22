/**
 * Where the enterprise world's slides put things: every slide's drawing
 * under its story band and inside the frame's safe area; and on each slide
 * the parts that must not meet kept apart, and the parts that hold others
 * holding them.
 */
import { STORY, box, type Box, type Point } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { bottom, bounds, inside, overlaps, right, ringBox, wordsBox } from "./harness";
import { DRAW_FOOT, LABEL_LINE, SAFE, TAG_LINE, TEXT_LINE, agentBox, bandFoot, contentTop, gateBox, linesIn, titleOf, wordsWidth } from "./layout";
import { AGENTS, AGENT_SCALE as FIGURE_SCALE, CAPTION_Y, LOOP_RING } from "./layout-agents";
import { AGENT_SCALE as FLEET_SCALE, FLEET } from "./layout-fleet";
import { DOC, REVIEW, SAMPLES, SLOTS, WORK, reviewZones, wordBoxes } from "./layout-review";
import { BAR, COLUMN, SPENDING } from "./layout-spending";
import { FIGURE as BIG, CARD, INNER, STUMBLED, figureBox as stumbledFigure } from "./layout-stumbled";

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
const S = SPENDING;
const A = AGENTS;
const L = A.loop;
const F = FLEET;
const C = F.checker;
const R = REVIEW;
const T = STUMBLED;

/** The person's mark: its ring, and its words to its right (the kit sets them 44 px from its middle). */
const markBox = () => box(F.mark.at.x - 24, F.mark.at.y - 24, 48, 48);
const markWords = () => label({ x: F.mark.at.x + 44, y: F.mark.at.y }, F.mark.text, "start");
/** The agents on slide 5, each the hexagon at the slide's one size; the checker's gate on its line; slide 4's gate across the ring. */
const fleetAgent = (at: Point) => agentBox(at, FLEET_SCALE);
const checkerGate = () => gateBox(C.gate.foot, C.gate.scale);
const loopGate = () => gateBox(L.gate.foot, L.gate.scale);

const DRAWN: Record<string, Box[]> = {
  spending: [
    ...S.columns.flatMap((column) => [column.at, label(column.name.at, column.name.text), text(column.figure.at, column.figure.text), text(column.year.at, column.year.text)]),
    box(S.floor.x0, S.floor.y - 2, S.floor.x1 - S.floor.x0, 4),
    text(S.ofIt.at, S.ofIt.text),
    text(S.heading.at, S.heading.text, "start"),
    S.bar.at,
    ...S.bar.parts.flatMap((part) => [text(part.name.at, part.name.text), label(part.caption.at, part.caption.text, part.caption.anchor)]),
  ],
  agents: [
    box(A.line.x0, A.line.y - 14, A.line.x1 - A.line.x0, 28),
    ...A.years.map((year) => text(year.at, year.text, year.anchor)),
    ...A.figures.flatMap((entry) => [entry.at, text(entry.name.at, entry.name.text), label(entry.caption.at, entry.caption.text)]),
    ringBox(L.centre, L.r),
    ...L.stops.flatMap((stop) => [ringBox(stop.at, LOOP_RING.stop), label(stop.name.at, stop.name.text, stop.name.anchor)]),
    loopGate(),
    label(L.gate.name.at, L.gate.name.text, "end"),
  ],
  review: [...Object.values(reviewZones()), ...WORK.map((item) => box(item.end.x, item.end.y, DOC.w, DOC.h)), ...SAMPLES.map((sample) => box(sample.end.x, sample.end.y, DOC.w, DOC.h))],
  "fleet-defined": [
    ...F.leads.at.map(fleetAgent),
    box(F.leads.desk.x0, F.leads.desk.y, F.leads.desk.x1 - F.leads.desk.x0, F.leads.desk.legs),
    text(F.leads.name.at, F.leads.name.text),
    ...F.builders.at.map(fleetAgent),
    text(F.builders.name.at, F.builders.name.text),
    box(C.rule.x0, C.rule.y - 2, C.rule.x1 - C.rule.x0, 4),
    checkerGate(),
    text(C.name.at, C.name.text),
    label(C.caption.at, C.caption.text),
    box(F.wall.x - 2, F.wall.y0, 4, F.wall.y1 - F.wall.y0),
    label(F.wall.name.at, F.wall.name.text),
    ...F.reviewers.at.map(fleetAgent),
    text(F.reviewers.name.at, F.reviewers.name.text),
    F.person.at,
    markBox(),
    markWords(),
  ],
  stumbled: [stumbledFigure(), T.figure.caption.at, ...T.cards.map((card) => card.at), T.label.at],
};

describe("the enterprise world's layout", () => {
  it("starts every slide's drawing under its story band, where the layout says drawing starts", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      expect(contentTop(pictureId), pictureId).toBeGreaterThanOrEqual(bandFoot(pictureId) + 32);
      expect(Math.min(...boxes.map((b) => b.y)), pictureId).toBeGreaterThanOrEqual(contentTop(pictureId));
    }
  });

  it("keeps every slide's drawing inside the safe area, clear of the footer, the slide number and the stage's edges", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      const all = bounds(boxes);
      expect(all.y, pictureId).toBeGreaterThanOrEqual(SAFE.top);
      expect(bottom(all), pictureId).toBeLessThanOrEqual(DRAW_FOOT);
      expect(all.x, pictureId).toBeGreaterThanOrEqual(SAFE.left);
      expect(right(all), pictureId).toBeLessThanOrEqual(SAFE.right);
    }
  });

  it("sets the safe area as the frame does: the story band's width, the 64 px edge, the footer under 1016", () => {
    expect(SAFE).toEqual({ top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w });
  });

  /**
   * Each title line's width in Geist Bold at 72 px with the title's
   * tracking: the font's advance widths, less 2 per cent for its kerning
   * (the browser set v2's titles 2 per cent under their advance widths).
   * A changed title fails here until it is measured again.
   */
  const MEASURED: Record<string, readonly [string, number][]> = {
  "spending": [
    [
      "Companies are investing in AI",
      987
    ],
    [
      "and connecting it to their own data.",
      1180
    ]
  ],
  "agents": [
    [
      "A chatbot answers a question.",
      1007
    ],
    [
      "An agent works toward a goal.",
      1007
    ]
  ],
  "review": [
    [
      "Human oversight has to scale",
      1013
    ],
    [
      "with agent work.",
      810
    ]
  ],
  "fleet-defined": [
    [
      "A fleet is a team of agents",
      876
    ],
    [
      "with different jobs.",
      629
    ]
  ],
  "stumbled": [
    [
      "These failures show why",
      821
    ],
    [
      "AI needs effective controls.",
      918
    ]
  ]
};

  it("sets every title on two lines, each inside the band", () => {
    for (const [id, measured] of Object.entries(MEASURED)) {
      expect(titleOf(id).lines, id).toEqual(measured.map(([line]) => line));
      for (const [line, w] of measured) expect(96 + w, line).toBeLessThanOrEqual(STORY.x + STORY.w);
    }
  });
});

describe("slide 3, the spending", () => {
  it("stands the two columns on their floor side by side, the second 3.4 times the first, each carrying its figure over its top and the one name over that", () => {
    const [five, seventeen] = S.columns;
    expect(bottom(five.at)).toBe(S.floor.y);
    expect(bottom(seventeen.at)).toBe(S.floor.y);
    expect(seventeen.at.h / five.at.h).toBeGreaterThan(3);
    expect(seventeen.at.h).toBe(COLUMN.tallest);
    expect(seventeen.at.x - right(five.at)).toBe(COLUMN.gap);
    expect(five.name.text).toBe(seventeen.name.text);
    for (const column of S.columns) {
      expect(column.figure.at.x).toBe(column.at.x + column.at.w / 2);
      expect(column.name.at.x).toBe(column.figure.at.x);
      const figure = text(column.figure.at, column.figure.text);
      const name = label(column.name.at, column.name.text);
      expect(bottom(figure)).toBeLessThan(column.at.y);
      expect(bottom(name)).toBeLessThan(figure.y);
      expect(figure.w).toBeLessThanOrEqual(column.at.w);
    }
    // The shorter column's words stay clear of the taller column beside it.
    expect(overlaps(text(five.figure.at, five.figure.text), seventeen.at)).toBe(false);
    expect(overlaps(label(five.name.at, five.name.text), seventeen.at)).toBe(false);
  });

  it("sets each year under its column's foot, on one line under the floor, and captions the pair under the years", () => {
    for (const column of S.columns) {
      expect(column.year.at.x).toBe(column.at.x + column.at.w / 2);
      expect(text(column.year.at, column.year.text).y).toBeGreaterThan(S.floor.y);
    }
    expect(S.columns[0].year.at.y).toBe(S.columns[1].year.at.y);
    expect(overlaps(text(S.columns[0].year.at, S.columns[0].year.text), text(S.columns[1].year.at, S.columns[1].year.text))).toBe(false);
    expect(S.ofIt.at.x).toBe((S.columns[0].at.x + right(S.columns[1].at)) / 2);
    expect(text(S.ofIt.at, S.ofIt.text).y).toBeGreaterThanOrEqual(bottom(text(S.columns[0].year.at, S.columns[0].year.text)));
  });

  it("splits the bar into three parts by their shares, left to right, filling its width, on the floor, under its heading and clear of the columns", () => {
    const parts = S.bar.parts.map((part) => part.at);
    expect(parts[0].x).toBe(BAR.x);
    expect(Math.abs(right(parts[2]) - BAR.end)).toBeLessThanOrEqual(1);
    for (let i = 1; i < parts.length; i++) expect(Math.abs(parts[i].x - right(parts[i - 1]))).toBeLessThanOrEqual(1);
    expect(parts.map((part) => Math.round((100 * part.w) / S.bar.at.w))).toEqual([35, 55, 10]);
    expect(bottom(S.bar.at)).toBe(S.floor.y);
    expect(S.bar.at.x).toBeGreaterThan(S.floor.x1 + 48);
    expect(S.bar.parts.map((part) => part.own)).toEqual([false, true, false]);
    const heading = text(S.heading.at, S.heading.text, "start");
    expect(heading.x).toBe(S.bar.at.x);
    expect(bottom(heading)).toBeLessThan(Math.min(...S.bar.parts.map((part) => text(part.name.at, part.name.text).y)));
  });

  it("names each part over it and captions each under the floor, the names apart and the captions apart, the last caption ending at the bar's end", () => {
    const names = S.bar.parts.map((part) => text(part.name.at, part.name.text));
    const captions = S.bar.parts.map((part) => label(part.caption.at, part.caption.text, part.caption.anchor));
    for (let i = 1; i < names.length; i++) expect(overlaps(names[i], names[i - 1])).toBe(false);
    for (let i = 1; i < captions.length; i++) expect(overlaps(captions[i], captions[i - 1]), S.bar.parts[i].caption.text).toBe(false);
    for (const name of names) expect(bottom(name)).toBeLessThan(S.bar.at.y);
    for (const [i, caption] of captions.entries()) {
      expect(caption.y).toBeGreaterThan(S.floor.y);
      expect(S.bar.parts[i].caption.at.y).toBe(S.columns[0].year.at.y);
      if (i < 2) expect(S.bar.parts[i].caption.at.x).toBe(S.bar.parts[i].at.x + S.bar.parts[i].at.w / 2);
    }
    expect(S.bar.parts[2].caption.anchor).toBe("end");
    expect(right(captions[2])).toBe(BAR.end);
    expect(captions[0].x).toBeGreaterThan(right(text(S.ofIt.at, S.ofIt.text)) + 24);
  });
});

describe("slide 4, the timeline and the loop", () => {
  it("runs the line across the full drawing width, its years at its two ends under it", () => {
    expect(A.line.x0).toBe(SAFE.left + 16);
    expect(A.line.x1).toBe(SAFE.right);
    expect(A.years[0].at.x).toBe(A.line.x0);
    expect(A.years[1].at.x).toBe(A.line.x1);
    for (const year of A.years) expect(year.at.y).toBeGreaterThan(A.line.y);
  });

  it("stands the three figures on the line in order, left to right, far apart, each drawing over it and its words under it", () => {
    const xs = A.figures.map((entry) => entry.foot.x);
    for (let i = 1; i < xs.length; i++) expect(xs[i] - xs[i - 1]).toBeGreaterThan(500);
    for (const entry of A.figures) {
      expect(bottom(entry.at)).toBeLessThan(A.line.y);
      expect(entry.at.x + entry.at.w / 2).toBe(entry.foot.x);
      expect(entry.name.at.y).toBeGreaterThan(A.line.y);
      expect(entry.caption.at.y).toBeGreaterThan(entry.name.at.y);
    }
  });

  it("draws the agent as the deck's hexagon, standing in its figure's box, as tall as the box", () => {
    const agent = A.figures[2];
    const drawn = agentBox({ x: agent.foot.x, y: agent.at.y }, FIGURE_SCALE);
    expect(inside(drawn, agent.at)).toBe(true);
    expect(agent.at.h - drawn.h).toBeLessThan(1);
  });

  it("keeps the figures' words clear of the years", () => {
    for (const entry of A.figures) for (const year of A.years) {
      expect(overlaps(text(entry.name.at, entry.name.text), text(year.at, year.text, year.anchor)), `${entry.name.text} ${year.text}`).toBe(false);
      expect(overlaps(label(entry.caption.at, entry.caption.text), text(year.at, year.text, year.anchor)), `${entry.caption.text} ${year.text}`).toBe(false);
    }
  });

  it("centres the loop, half as wide again as before, under the agent on the line's right half, under its caption and over the drawing's foot", () => {
    const agent = A.figures[2];
    expect(L.centre.x).toBe(agent.foot.x);
    expect(L.centre.x).toBeGreaterThan((A.line.x0 + A.line.x1) / 2);
    expect(L.r).toBeGreaterThanOrEqual(1.5 * 80);
    expect(L.centre.y - L.r).toBeGreaterThan(CAPTION_Y + LABEL_LINE / 2 + 24);
    expect(L.centre.y + L.r + 2).toBeLessThanOrEqual(DRAW_FOOT);
  });

  it("sets five stops a sixth of the ring apart, clockwise from the gate's place at its left side", () => {
    expect(L.stops).toHaveLength(5);
    for (const [i, stop] of L.stops.entries()) {
      const deg = 180 + 60 * (i + 1);
      expect(stop.at.x).toBeCloseTo(L.centre.x + L.r * Math.cos((deg * Math.PI) / 180), 1);
      expect(stop.at.y).toBeCloseTo(L.centre.y + L.r * Math.sin((deg * Math.PI) / 180), 1);
      expect(stop.along).toBeCloseTo((i + 1) / 6, 5);
      expect(stop.at.y + LOOP_RING.stop).toBeLessThanOrEqual(DRAW_FOOT);
    }
  });

  it("names each stop outside the ring, clear of the agent's caption, the ring's other stops and each other", () => {
    const caption = label(A.figures[2].caption.at, A.figures[2].caption.text);
    const names = L.stops.map((stop) => label(stop.name.at, stop.name.text, stop.name.anchor));
    for (const [i, name] of names.entries()) {
      expect(overlaps(name, caption), L.stops[i].name.text).toBe(false);
      for (const [j, stop] of L.stops.entries()) expect(overlaps(name, ringBox(stop.at, LOOP_RING.stop)), `${L.stops[i].name.text} on stop ${j}`).toBe(false);
      for (const other of names.slice(i + 1)) expect(overlaps(name, other)).toBe(false);
      // Outside the ring: its near edge further from the centre than the ring.
      const nearX = L.stops[i].name.anchor === "start" ? name.x : right(name);
      expect(Math.hypot(nearX - L.centre.x, L.stops[i].name.at.y - L.centre.y), L.stops[i].name.text).toBeGreaterThan(L.r);
    }
  });

  it("stands the closed gate across the ring at its left side, its bars across the ring's line, its name to its left, clear of every other word and stop", () => {
    const gate = loopGate();
    expect(L.gate.at).toEqual({ x: L.centre.x - L.r, y: L.centre.y });
    expect(gate.x).toBeLessThan(L.gate.at.x);
    expect(right(gate)).toBeGreaterThan(L.gate.at.x);
    expect(gate.y).toBeLessThan(L.gate.at.y);
    expect(bottom(gate)).toBeGreaterThan(L.gate.at.y);
    for (const stop of L.stops) expect(overlaps(gate, ringBox(stop.at, LOOP_RING.stop)), stop.name.text).toBe(false);
    const name = label(L.gate.name.at, L.gate.name.text, "end");
    expect(right(name)).toBeLessThanOrEqual(gate.x - 16);
    expect(name.x).toBeGreaterThanOrEqual(SAFE.left);
    const others = [...L.stops.map((stop) => label(stop.name.at, stop.name.text, stop.name.anchor)), ...A.figures.flatMap((entry) => [text(entry.name.at, entry.name.text), label(entry.caption.at, entry.caption.text)])];
    for (const other of others) expect(overlaps(name, other)).toBe(false);
  });
});

/** How far apart two boxes are: 0 where they meet. */
const apart = (a: Box, b: Box) => Math.hypot(Math.max(0, b.x - right(a), a.x - right(b)), Math.max(0, b.y - bottom(a), a.y - bottom(b)));

describe("slide 4a, the review stream", () => {
  const Z = reviewZones();
  const B = wordBoxes();

  it("distinguishes review before completion from audit after completion", () => {
    expect(R.words.before.text).toBe("Review before proceeding");
    expect(R.words.after.text).toBe("Review after completion");
  });

  it("keeps every group apart, and the forecast above the story", () => {
    const zones = Object.entries(Z);
    for (const [i, [name, zone]] of zones.entries()) for (const [other, next] of zones.slice(i + 1)) expect(overlaps(zone, next), `${name} ${other}`).toBe(false);
    expect(bottom(R.forecast.at)).toBeLessThan(contentTop("review") - 100);
    expect(right(R.forecast.at)).toBeLessThanOrEqual(SAFE.right);
  });

  it("gives the person, the mark and its name their own column, at least 40 px clear of every other group", () => {
    const column = [R.human.at, box(R.mark.x - 24, R.mark.y - 24, 48, 48), B.oversight];
    for (const part of column) for (const [name, zone] of Object.entries(Z).filter(([name]) => name !== "human")) expect(apart(part, zone), name).toBeGreaterThanOrEqual(40);
    // Between the two lower trays: right of the exceptions' words, left of the audit's.
    expect(Z.human.x).toBeGreaterThan(right(Z.exceptions));
    expect(right(Z.human)).toBeLessThan(Z.audit.x);
  });

  it("fills the finished grid whole: 24 documents, one in each slot of an 8 by 3 grid, inside its tray", () => {
    const done = WORK.filter((item) => item.exception < 0);
    expect(SLOTS).toBe(24);
    expect(done).toHaveLength(SLOTS);
    expect(new Set(done.map((item) => item.slot))).toEqual(new Set(Array.from({ length: SLOTS }, (_, i) => i)));
    const xs = [...new Set(done.map((item) => item.end.x))].sort((a, b) => a - b);
    const ys = [...new Set(done.map((item) => item.end.y))].sort((a, b) => a - b);
    expect([xs.length, ys.length]).toEqual([8, 3]);
    for (const item of done) expect(inside(box(item.end.x, item.end.y, DOC.w, DOC.h), R.trays.done), item.key).toBe(true);
  });

  it("sends the three exceptions into their own tray and three copies of finished documents, one from each row, into the audit tray", () => {
    const exceptions = WORK.filter((item) => item.exception >= 0);
    expect(exceptions).toHaveLength(3);
    for (const item of exceptions) expect(inside(box(item.end.x, item.end.y, DOC.w, DOC.h), R.trays.exceptions), item.key).toBe(true);
    expect(SAMPLES).toHaveLength(3);
    const slots = WORK.filter((item) => item.exception < 0).map((item) => item.end);
    for (const sample of SAMPLES) {
      expect(slots, sample.key).toContainEqual(sample.from);
      expect(inside(box(sample.end.x, sample.end.y, DOC.w, DOC.h), R.trays.audit), sample.key).toBe(true);
    }
    expect(new Set(SAMPLES.map((sample) => sample.from.y)).size).toBe(3);
  });

  it("runs every document through the checks, on the flow line", () => {
    for (const item of WORK) expect(inside(box(item.through.x, item.through.y, DOC.w, DOC.h), R.check), item.key).toBe(true);
    expect(R.check.y).toBeLessThan(R.flow.y);
    expect(bottom(R.check)).toBeGreaterThan(R.flow.y);
  });
});

describe("slide 5, the fleet, five groups", () => {
  const leads = () => bounds([...F.leads.at.map(fleetAgent), box(F.leads.desk.x0, F.leads.desk.y, F.leads.desk.x1 - F.leads.desk.x0, F.leads.desk.legs)]);
  const builders = () => bounds(F.builders.at.map(fleetAgent));
  const reviewers = () => bounds(F.reviewers.at.map(fleetAgent));

  it("puts the groups left to right, apart: the leads, the builders under the gate's line, the dividing line, the reviewers, the person", () => {
    expect(C.rule.x0).toBeGreaterThan(right(leads()) + 48);
    expect(F.wall.x).toBeGreaterThan(C.rule.x1 + 48);
    expect(reviewers().x).toBeGreaterThan(F.wall.x + 48);
    expect(F.person.at.x).toBeGreaterThan(right(reviewers()) + 120);
  });

  it("stands every agent on one line at one size: the leads, the six builders and the two reviewers", () => {
    const all = [...F.leads.at, ...F.builders.at, ...F.reviewers.at];
    expect([F.leads.at.length, F.builders.at.length, F.reviewers.at.length]).toEqual([3, 6, 2]);
    for (const at of all) expect(at.y).toBe(F.agentTop);
    const xs = all.map((at) => at.x);
    for (let i = 1; i < xs.length; i++) expect(fleetAgent(all[i]).x, `agent ${i}`).toBeGreaterThan(right(fleetAgent(all[i - 1])));
  });

  it("stands the closed gate on a line over the whole row of builders, its name and caption centred over it", () => {
    const gate = checkerGate();
    expect(C.rule.x0).toBeLessThan(builders().x);
    expect(C.rule.x1).toBeGreaterThan(right(builders()));
    expect(C.rule.y).toBeLessThan(builders().y - 16);
    expect(C.gate.foot).toEqual({ x: (F.builders.at[0].x + F.builders.at[5].x) / 2, y: C.rule.y });
    const name = text(C.name.at, C.name.text);
    const caption = label(C.caption.at, C.caption.text);
    expect([C.name.at.x, C.caption.at.x]).toEqual([C.gate.foot.x, C.gate.foot.x]);
    expect(name.y).toBeGreaterThanOrEqual(contentTop("fleet-defined"));
    expect(caption.y).toBeGreaterThanOrEqual(bottom(name) - 8);
    expect(bottom(caption)).toBeLessThan(gate.y);
  });

  it("stands the dividing line from over the agents' tops to under their names, its name directly under its foot", () => {
    const words = label(F.wall.name.at, F.wall.name.text);
    expect(F.wall.y0).toBeLessThan(F.agentTop);
    expect(F.wall.y1).toBeGreaterThan(bottom(text(F.leads.name.at, F.leads.name.text)));
    expect(F.wall.name.at.x).toBe(F.wall.x);
    expect(words.y).toBeGreaterThan(F.wall.y1);
    expect(words.y - F.wall.y1).toBeLessThan(16);
  });

  it("names the groups on one row, each name clear of every drawing and every other name", () => {
    const names = [text(F.leads.name.at, F.leads.name.text), text(F.builders.name.at, F.builders.name.text), label(F.wall.name.at, F.wall.name.text), text(F.reviewers.name.at, F.reviewers.name.text), markWords(), text(C.name.at, C.name.text), label(C.caption.at, C.caption.text)];
    expect(new Set([F.leads.name.at.y, F.builders.name.at.y, F.reviewers.name.at.y, F.mark.at.y]).size).toBe(1);
    const drawings = [...[...F.leads.at, ...F.builders.at, ...F.reviewers.at].map(fleetAgent), box(F.leads.desk.x0, F.leads.desk.y, F.leads.desk.x1 - F.leads.desk.x0, F.leads.desk.legs), box(C.rule.x0, C.rule.y - 2, C.rule.x1 - C.rule.x0, 4), checkerGate(), F.person.at, markBox(), box(F.wall.x - 2, F.wall.y0, 4, F.wall.y1 - F.wall.y0)];
    for (const [i, name] of names.entries()) {
      for (const drawing of drawings) expect(overlaps(name, drawing), `name ${i}`).toBe(false);
      for (const other of names.slice(i + 1)) expect(overlaps(name, other), `name ${i}`).toBe(false);
    }
  });

  it("sets the mark under the person, its words inside the drawing's right edge", () => {
    expect(F.mark.at.x).toBe(F.person.at.x + F.person.at.w / 2);
    expect(markBox().y).toBeGreaterThan(bottom(F.person.at));
    expect(right(markWords())).toBeLessThanOrEqual(SAFE.right);
  });
});

describe("slide 6, the figure and the three incidents", () => {
  it("sets the figure large in the top left, its caption under it, all inside its column, 48 px short of the first card", () => {
    expect(BIG.size).toBeGreaterThanOrEqual(4 * 32);
    const figure = stumbledFigure();
    expect(figure.x).toBe(STORY.x);
    expect(T.figure.caption.at.y).toBeGreaterThan(T.figure.second.y);
    expect(right(T.figure.caption.at)).toBeLessThanOrEqual(CARD.x - 48);
    expect(right(figure)).toBeLessThanOrEqual(CARD.x - 48);
    // Its number and the words after it on the second baseline, at most 0.7 of the size a digit and 0.56 a letter.
    expect(2 * BIG.size * 0.7 + wordsWidth(" percent", BIG.small)).toBeLessThan(BIG.w);
    expect(linesIn(T.figure.caption.text, 32, BIG.w)).toBeLessThanOrEqual(BIG.captionLines);
  });

  it("spans the rest of the band with three 400 px cards and two 40 px gaps, the text inset 28 px", () => {
    expect(T.cards).toHaveLength(3);
    expect(T.cards[0].at.x).toBe(CARD.x);
    expect(right(T.cards[2].at)).toBe(STORY.x + STORY.w);
    for (const card of T.cards) {
      expect(card.at.w, card.key).toBe(400);
      expect(card.name.at.x - card.at.x, card.key).toBe(28);
      expect(right(card.at) - right(card.name.at), card.key).toBe(28);
      expect(card.name.at.y - bottom(card.band), card.key).toBe(28);
    }
    for (let i = 1; i < T.cards.length; i++) expect(T.cards[i].at.x - right(T.cards[i - 1].at)).toBe(40);
  });

  it("fits each card's words inside it: the name on one line, the description in its lines, the tag in two, apart", () => {
    for (const card of T.cards) {
      expect(card.name.text.length * 48 * 0.56, card.name.text).toBeLessThan(card.name.at.w);
      expect(linesIn(card.what.text, 26, card.what.at.w), card.what.text).toBeLessThanOrEqual(INNER.lines);
      expect(linesIn(card.tag.text, 24, card.tag.at.w - 24), card.tag.text).toBeLessThanOrEqual(2);
      expect(card.tag.at.h).toBe(2 * TAG_LINE + 2 * INNER.tagPad);
      expect(card.tag.at.y, card.key).toBeGreaterThan(card.what.at.y + linesIn(card.what.text, 26, card.what.at.w) * LABEL_LINE + 16);
      for (const part of [card.name.at, card.what.at, card.tag.at]) expect(inside(part, card.at), card.key).toBe(true);
    }
  });

  it("draws the line under the three cards only, its words centred under it", () => {
    expect(T.line.x0).toBe(CARD.x);
    expect(T.line.x1).toBe(SAFE.right);
    for (const card of T.cards) expect(T.line.y).toBeGreaterThan(bottom(card.at) + 16);
    expect(T.label.at.x).toBe(T.line.x0);
    expect(right(T.label.at)).toBe(T.line.x1);
    expect(T.label.at.y).toBeGreaterThan(T.line.y);
  });
});
