/**
 * Where the enterprise world's slides put things: every slide's drawing
 * under its story band and inside the frame's safe area; and on each slide
 * the parts that must not meet kept apart, and the parts that hold others
 * holding them.
 */
import { describe, expect, it } from "vitest";
import { AGENT_R, STORY, box, type Box, type Point } from "@/components/deck/kit";
import { DRAW_FOOT, LABEL_LINE, SAFE, TAG_LINE, TEXT_LINE, bandFoot, capOf, contentTop, figureWidth, linesIn, titleOf, wordsWidth } from "./layout";
import { AGENTS, CAPTION_Y, LOOP_RING } from "./layout-agents";
import { BUILDER_R, FLEET } from "./layout-fleet";
import { BARS, FIGURE as SHARE, FUNNEL, REVIEW, STACK } from "./layout-review";
import { BAR, COLUMN, SPENDING, figureBox as spendingFigure } from "./layout-spending";
import { CARD, FIGURE as BIG, INNER, STUMBLED, figureBox as stumbledFigure } from "./layout-stumbled";
import { bottom, bounds, inside, overlaps, right, ringBox, wordsBox } from "./harness";

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
const S = SPENDING;
const A = AGENTS;
const L = A.loop;
const F = FLEET;
const R = REVIEW;
const reviewMark = () => box(R.mark.at.x - 24, R.mark.at.y - 24, 48, 48);
const shareBox = () => box(R.figure.at.x, R.figure.at.y - capOf(SHARE.size), figureWidth(R.figure.runs, SHARE.size, SHARE.small), capOf(SHARE.size) + 8);
const reviewZones = () => ({
  left: bounds([...R.bars.flatMap((bar) => [bar.at, text(bar.name.at, bar.name.text), text(bar.caption.at, bar.caption.text)]), box(R.floor.x0, R.floor.y - 2, R.floor.x1 - R.floor.x0, 4)]),
  middle: bounds([R.seated.at, box(R.desk.x0, R.desk.y, R.desk.x1 - R.desk.x0, R.desk.legs), ...R.stack.pages.map((page) => box(page.x0, page.y - 2, page.x1 - page.x0, 4)), text(R.stack.name.at, R.stack.name.text)]),
  right: bounds([box(FUNNEL.x0, R.funnel.top, FUNNEL.x1 - FUNNEL.x0, R.funnel.outletY + FUNNEL.spout - R.funnel.top), text(R.funnel.name.at, R.funnel.name.text), R.standing.at, reviewMark(), label(R.people.at, R.people.text), shareBox(), label(R.figure.caption.at, R.figure.caption.text, "start")]),
});
const T = STUMBLED;

/** The person's mark: its ring, and its words to its right (the kit sets them 44 px from its middle). */
const markBox = () => box(F.mark.at.x - 24, F.mark.at.y - 24, 48, 48);
const markWords = () => label({ x: F.mark.at.x + 44, y: F.mark.at.y }, F.mark.text, "start");

const DRAWN: Record<string, Box[]> = {
  spending: [
    ...S.columns.flatMap((column) => [column.at, text(column.name.at, column.name.text)]),
    box(S.floor.x0, S.floor.y - 2, S.floor.x1 - S.floor.x0, 4),
    text(S.ofIt.at, S.ofIt.text),
    spendingFigure(),
    text(S.figure.caption.at, S.figure.caption.text, "start"),
    S.bar.at,
    ...S.bar.parts.map((part) => text(part.name.at, part.name.text)),
    text(S.bar.caption.at, S.bar.caption.text),
  ],
  agents: [
    box(A.line.x0, A.line.y - 14, A.line.x1 - A.line.x0, 28),
    ...A.years.map((year) => text(year.at, year.text, year.anchor)),
    ...A.figures.flatMap((entry) => [entry.at, text(entry.name.at, entry.name.text), label(entry.caption.at, entry.caption.text)]),
    ringBox(L.centre, L.r),
    ...L.stops.flatMap((stop) => [ringBox(stop.at, LOOP_RING.stop), label(stop.name.at, stop.name.text, stop.name.anchor)]),
    label(L.bar.name.at, L.bar.name.text, "end"),
  ],
  review: Object.values(reviewZones()),
  "fleet-defined": [
    ...F.leads.at.map((at) => ringBox(at, AGENT_R)),
    box(F.leads.desk.x0, F.leads.desk.y, F.leads.desk.x1 - F.leads.desk.x0, F.leads.desk.legs),
    text(F.leads.name.at, F.leads.name.text),
    F.board.box,
    ...F.builders.at.map((at) => ringBox(at, BUILDER_R)),
    text(F.builders.name.at, F.builders.name.text),
    box(F.wall.x - 2, F.wall.y0, 4, F.wall.y1 - F.wall.y0),
    label(F.wall.name.at, F.wall.name.text),
    ...F.reviewers.at.map((at) => ringBox(at, AGENT_R)),
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
    spending: [["Enterprise AI spending tripled in two years.", 1430], ["Most of it pairs models with a company's own data.", 1691]],
    agents: [["An agent takes a goal, plans its own steps,", 1410], ["uses tools, acts, and stops at a boundary.", 1368]],
    review: [["Review by a person worked for chatbots.", 1364], ["Agents produce more than anyone can read.", 1467]],
    "fleet-defined": [["A fleet is several agents with separate roles.", 1485], ["A person approves the result.", 983]],
    stumbled: [["Most organizations that rushed into agents are", 1568], ["stumbling. Each failure was a missing limit.", 1419]],
  };

  it("sets every title on two lines, each inside the band", () => {
    for (const [id, measured] of Object.entries(MEASURED)) {
      expect(titleOf(id).lines, id).toEqual(measured.map(([line]) => line));
      for (const [line, w] of measured) expect(96 + w, line).toBeLessThanOrEqual(STORY.x + STORY.w);
    }
  });
});

describe("slide 3, the spending", () => {
  it("stands the two columns on their floor side by side, the second 3.4 times the first, each named over its top", () => {
    const [five, seventeen] = S.columns;
    expect(bottom(five.at)).toBe(S.floor.y);
    expect(bottom(seventeen.at)).toBe(S.floor.y);
    expect(seventeen.at.h / five.at.h).toBeGreaterThan(3);
    expect(seventeen.at.h).toBe(COLUMN.tallest);
    expect(seventeen.at.x - right(five.at)).toBe(COLUMN.gap);
    for (const column of S.columns) {
      expect(column.name.at.x).toBe(column.at.x + column.at.w / 2);
      expect(bottom(text(column.name.at, column.name.text))).toBeLessThan(column.at.y);
    }
  });

  it("captions the pair under the floor, and sets the figure beside them on the floor with its caption on the same line", () => {
    expect(S.ofIt.at.y).toBeGreaterThan(S.floor.y + TEXT_LINE / 2);
    expect(S.figure.at.y).toBe(S.floor.y);
    expect(S.figure.caption.at.y).toBe(S.ofIt.at.y);
    expect(spendingFigure().x).toBeGreaterThan(right(S.columns[1].at) + 48);
    expect(overlaps(text(S.ofIt.at, S.ofIt.text), text(S.figure.caption.at, S.figure.caption.text, "start"))).toBe(false);
  });

  it("splits the bar into three parts by their shares, left to right, filling its width, on the floor, apart from the figure", () => {
    const parts = S.bar.parts.map((part) => part.at);
    expect(parts[0].x).toBe(BAR.x);
    expect(Math.abs(right(parts[2]) - BAR.end)).toBeLessThanOrEqual(1);
    for (let i = 1; i < parts.length; i++) expect(Math.abs(parts[i].x - right(parts[i - 1]))).toBeLessThanOrEqual(1);
    expect(parts.map((part) => Math.round((100 * part.w) / S.bar.at.w))).toEqual([35, 55, 10]);
    expect(bottom(S.bar.at)).toBe(S.floor.y);
    expect(S.bar.at.x).toBeGreaterThan(right(spendingFigure()) + 40);
    expect(S.bar.parts.map((part) => part.own)).toEqual([false, true, false]);
  });

  it("names each part over it, the names apart, and brackets and captions the middle part under the bar", () => {
    const names = S.bar.parts.map((part) => text(part.name.at, part.name.text));
    for (let i = 1; i < names.length; i++) expect(overlaps(names[i], names[i - 1])).toBe(false);
    for (const name of names) expect(bottom(name)).toBeLessThan(S.bar.at.y);
    const own = S.bar.parts[1].at;
    expect(S.bar.bracket.x0).toBeGreaterThan(own.x);
    expect(S.bar.bracket.x1).toBeLessThan(right(own));
    expect(S.bar.bracket.y - S.bar.bracket.drop).toBeGreaterThan(bottom(own));
    expect(S.bar.caption.at.x).toBe(own.x + own.w / 2);
    expect(text(S.bar.caption.at, S.bar.caption.text).y).toBeGreaterThan(S.bar.bracket.y);
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

  it("keeps the figures' words clear of the years", () => {
    for (const entry of A.figures) for (const year of A.years) {
      expect(overlaps(text(entry.name.at, entry.name.text), text(year.at, year.text, year.anchor)), `${entry.name.text} ${year.text}`).toBe(false);
      expect(overlaps(label(entry.caption.at, entry.caption.text), text(year.at, year.text, year.anchor)), `${entry.caption.text} ${year.text}`).toBe(false);
    }
  });

  it("centres the loop under the agent, under its caption, with five stops a fifth of the ring apart from the top, clockwise", () => {
    const agent = A.figures[2];
    expect(L.centre.x).toBe(agent.foot.x);
    expect(L.centre.y - L.r - LOOP_RING.stop).toBeGreaterThan(CAPTION_Y + LABEL_LINE / 2 + 24);
    expect(L.stops).toHaveLength(5);
    for (const [i, stop] of L.stops.entries()) {
      const deg = -90 + 72 * i;
      expect(stop.at.x).toBeCloseTo(L.centre.x + L.r * Math.cos((deg * Math.PI) / 180), 1);
      expect(stop.at.y).toBeCloseTo(L.centre.y + L.r * Math.sin((deg * Math.PI) / 180), 1);
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

  it("crosses the ring with the bar between the last stop and the first, its name to its left, clear of the stops' names", () => {
    const mid = { x: (L.bar.from.x + L.bar.to.x) / 2, y: (L.bar.from.y + L.bar.to.y) / 2 };
    expect(Math.hypot(mid.x - L.centre.x, mid.y - L.centre.y)).toBeCloseTo(L.r, 0);
    expect(mid.x).toBeLessThan(L.centre.x);
    expect(mid.y).toBeLessThan(L.stops[4].at.y);
    expect(mid.x).toBeGreaterThan(L.stops[4].at.x);
    const name = label(L.bar.name.at, L.bar.name.text, "end");
    expect(right(name)).toBeLessThan(Math.min(L.bar.from.x, L.bar.to.x));
    for (const stop of L.stops) expect(overlaps(name, label(stop.name.at, stop.name.text, stop.name.anchor)), stop.name.text).toBe(false);
  });
});

describe("slide 4a, the review in three zones", () => {
  it("keeps the three zones left to right, 40 px or more apart", () => {
    const { left, middle, right: rightZone } = reviewZones();
    expect(middle.x).toBeGreaterThan(right(left) + 40);
    expect(rightZone.x).toBeGreaterThan(right(middle) + 4);
    expect(FUNNEL.x0).toBeGreaterThan(right(middle) + 24);
  });

  it("stands the two bars on the floor, the second 12 times the first, each captioned over its top and named under the floor", () => {
    const [may, september] = R.bars;
    expect(bottom(may.at)).toBe(R.floor.y);
    expect(bottom(september.at)).toBe(R.floor.y);
    expect(september.at.h / may.at.h).toBe(BARS.ratio);
    for (const bar of R.bars) {
      expect(bottom(text(bar.caption.at, bar.caption.text))).toBeLessThan(bar.at.y);
      expect(text(bar.name.at, bar.name.text).y).toBeGreaterThan(R.floor.y);
    }
  });

  it("stacks the pages on the desk beside the seated person, up to twice the person's height, named over the top", () => {
    const pages = R.stack.pages;
    expect(pages[0].y).toBeLessThan(R.desk.y);
    for (let i = 1; i < pages.length; i++) expect(pages[i - 1].y - pages[i].y).toBe(STACK.pitch);
    const height = R.desk.y - pages.at(-1)!.y;
    expect(height).toBeGreaterThanOrEqual(2 * R.seated.at.h);
    expect(STACK.x).toBeGreaterThan(right(R.seated.at) + 40);
    expect(bottom(text(R.stack.name.at, R.stack.name.text))).toBeLessThan(pages.at(-1)!.y);
  });

  it("narrows the funnel from a wide mouth to a small outlet, the person under it with the mark beside them and their words under them, the figure under all of it", () => {
    expect(FUNNEL.x1 - FUNNEL.x0).toBeGreaterThan(6 * FUNNEL.outlet);
    expect(bottom(text(R.funnel.name.at, R.funnel.name.text))).toBeLessThan(R.funnel.top);
    expect(R.standing.at.x + R.standing.at.w / 2).toBe(R.funnel.centre);
    expect(R.standing.at.y).toBeGreaterThan(R.funnel.outletY + FUNNEL.spout);
    expect(overlaps(reviewMark(), R.standing.at)).toBe(false);
    const people = label(R.people.at, R.people.text);
    expect(people.y).toBeGreaterThan(bottom(R.standing.at));
    expect(overlaps(people, reviewMark())).toBe(false);
    const share = shareBox();
    expect(share.y).toBeGreaterThan(bottom(people) + 8);
    expect(share.x).toBeGreaterThan(FUNNEL.x0);
    expect(right(share)).toBeLessThan(FUNNEL.x1);
    expect(Math.abs(share.x + share.w / 2 - R.funnel.centre)).toBeLessThanOrEqual(4);
    expect(label(R.figure.caption.at, R.figure.caption.text, "start").y).toBeGreaterThan(R.figure.at.y);
  });
});

describe("slide 5, the fleet, four groups in a row", () => {
  it("puts the groups left to right, apart: the leads, the board and its builders, the wall, the reviewers, the person", () => {
    const leads = bounds([...F.leads.at.map((at) => ringBox(at, AGENT_R)), box(F.leads.desk.x0, F.leads.desk.y, F.leads.desk.x1 - F.leads.desk.x0, F.leads.desk.legs)]);
    const reviewers = bounds(F.reviewers.at.map((at) => ringBox(at, AGENT_R)));
    expect(F.board.box.x).toBeGreaterThan(right(leads) + 48);
    expect(F.wall.x).toBeGreaterThan(right(F.board.box) + 48);
    expect(reviewers.x).toBeGreaterThan(F.wall.x + 48);
    expect(F.person.at.x).toBeGreaterThan(right(reviewers) + 120);
  });

  it("splits the board into three rows of six cells, a builder under each column, the builders under the board", () => {
    expect(F.board.rows).toHaveLength(3);
    for (const row of F.board.rows) {
      expect(row.cells).toHaveLength(6);
      for (const cell of row.cells) expect(inside(cell, F.board.box)).toBe(true);
    }
    expect(F.splits.map((split) => split.y)).toEqual(F.board.rows.slice(1).map((row) => row.box.y));
    for (const [i, at] of F.builders.at.entries()) {
      const cell = F.board.rows[0].cells[i];
      expect(at.x).toBe(cell.x + cell.w / 2);
      expect(at.y - BUILDER_R).toBeGreaterThan(bottom(F.board.box) + 16);
    }
    expect(BUILDER_R).toBeLessThan(AGENT_R);
  });

  it("stands the wall the board's height and more, its name under its foot", () => {
    expect(F.wall.y0).toBeLessThanOrEqual(F.board.box.y);
    expect(F.wall.y1).toBeGreaterThan(bottom(F.board.box));
    expect(label(F.wall.name.at, F.wall.name.text).y).toBeGreaterThan(F.wall.y1);
  });

  it("names the groups on two lines, each name clear of every drawing and every other name", () => {
    const names = [text(F.leads.name.at, F.leads.name.text), text(F.builders.name.at, F.builders.name.text), label(F.wall.name.at, F.wall.name.text), text(F.reviewers.name.at, F.reviewers.name.text), markWords()];
    expect(new Set([F.leads.name.at.y, F.reviewers.name.at.y, F.mark.at.y]).size).toBe(1);
    expect(F.builders.name.at.y).toBe(F.wall.name.at.y);
    const drawings = [...F.leads.at.map((at) => ringBox(at, AGENT_R)), box(F.leads.desk.x0, F.leads.desk.y, F.leads.desk.x1 - F.leads.desk.x0, F.leads.desk.legs), F.board.box, ...F.builders.at.map((at) => ringBox(at, BUILDER_R)), ...F.reviewers.at.map((at) => ringBox(at, AGENT_R)), F.person.at, markBox()];
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
    expect(linesIn(T.figure.caption.text, 32, BIG.w)).toBeLessThanOrEqual(2);
  });

  it("spans the rest of the band with three 384 px cards and two 48 px gaps, the text inset 32 px", () => {
    expect(T.cards).toHaveLength(3);
    expect(T.cards[0].at.x).toBe(CARD.x);
    expect(right(T.cards[2].at)).toBe(STORY.x + STORY.w);
    for (const card of T.cards) {
      expect(card.at.w, card.key).toBe(384);
      expect(card.name.at.x - card.at.x, card.key).toBe(32);
      expect(right(card.at) - right(card.name.at), card.key).toBe(32);
      expect(card.name.at.y - bottom(card.band), card.key).toBe(32);
    }
    for (let i = 1; i < T.cards.length; i++) expect(T.cards[i].at.x - right(T.cards[i - 1].at)).toBe(48);
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
