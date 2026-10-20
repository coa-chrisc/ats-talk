/**
 * Where the stand world's slides put things: slide 1's title page centred
 * on navy; every white slide's drawing under its story band and inside the
 * frame's safe area; and on each slide the parts that must not meet kept
 * apart, and the parts that hold others holding them.
 */
import { describe, expect, it } from "vitest";
import { AGENT_R, STAGE, STORY, box, type Box, type Point } from "@/components/deck/kit";
import { CREDIT_LINE, DRAW_FOOT, bandFoot, LABEL_LINE, LEAD_LINE, OPENING, SAFE, TAG, TEXT_LINE, capOf, contentTop, figureWidth, tagWidth, titleOf, wordsWidth } from "./layout";
import { DOT_R, EXISTS, GRID, GRID_BOX, LANTERN, LIT, cellAt } from "./layout-exists";
import { FLEET, GATE, REVIEWER_R } from "./layout-fleet";
import { BUDGET, POSITION, RUNNER } from "./layout-position";
import { FIGURE, WORLD_MOVED } from "./layout-world-moved";
import { bottom, bounds, inside, overlaps, right, ringBox, wordsBox } from "./harness";

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
/** A large figure's box: its numerals' cap height over its baseline, a descender's room under it. */
const figure = (at: Point, runs: Parameters<typeof figureWidth>[0], size: number, small: number, anchor: "start" | "end"): Box => {
  const w = figureWidth(runs, size, small);
  return box(anchor === "start" ? at.x : at.x - w, at.y - capOf(size), w, capOf(size) + 8);
};
const W = WORLD_MOVED;
const P = POSITION;
const E = EXISTS;
const F = FLEET;

const DRAWN: Record<string, Box[]> = {
  "world-moved": [
    box(W.line.x0, W.line.y - 14, W.line.x1 - W.line.x0, 28),
    ...W.years.map((year) => text(year.at, year.text, year.anchor)),
    ...W.figures.flatMap((entry) => [entry.at, text(entry.name.at, entry.name.text), label(entry.caption.at, entry.caption.text)]),
    ...W.stats.flatMap((stat) => [figure(stat.at, stat.runs, FIGURE.size, FIGURE.small, stat.anchor), text(stat.caption.at, stat.caption.text, stat.anchor)]),
  ],
  position: [
    P.track.outer,
    text(P.city.name.at, P.city.name.text),
    box(P.post.x, P.post.top, P.post.w, P.post.foot - P.post.top),
    ringBox(P.post.tick.at, P.post.tick.r),
    label(P.post.name.at, P.post.name.text, "start"),
    figure(P.budget.at, P.budget.runs, BUDGET.size, BUDGET.small, "end"),
    text(P.budget.caption.at, P.budget.caption.text, "end"),
  ],
  exists: [
    E.ring.at,
    ...E.ring.dots.map((dot) => ringBox(dot.at, DOT_R)),
    label(E.name.at, E.name.text, "start"),
    ...E.named.flatMap((lit) => [text(lit.name.at, lit.name.text, "start"), label(lit.caption.at, lit.caption.text, "start")]),
    text(E.ring.name.at, E.ring.name.text, "start"),
    label(E.ring.caption.at, E.ring.caption.text, "start"),
    E.staff.at,
    E.apart.at,
  ],
  fleet: [
    text(F.name.at, F.name.text, "start"),
    label(F.built.at, F.built.text, "start"),
    box(F.fence.at.x, F.fence.at.y - 10, F.fence.at.w, F.fence.at.h + 20),
    ...F.plates.map((plate) => plate.at),
    F.joining.at,
    label(F.joining.caption.at, F.joining.caption.text, "start"),
    ...F.stair.steps.flatMap((entry) => [entry.at, box(entry.gate.at.x - GATE.span / 2, entry.gate.at.y - GATE.h, GATE.span, GATE.h)]),
    F.stair.tag.at,
    F.overYears.at,
    box(F.stair.floor.x0, F.stair.floor.y - 2, F.stair.floor.x1 - F.stair.floor.x0, 4),
  ],
};

describe("the stand world's layout", () => {
  it("starts every white slide's drawing under its story band, where the layout says drawing starts", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      expect(contentTop(pictureId), pictureId).toBeGreaterThanOrEqual(bandFoot(pictureId) + 32);
      expect(Math.min(...boxes.map((b) => b.y)), pictureId).toBeGreaterThanOrEqual(contentTop(pictureId));
    }
  });

  it("keeps every white slide's drawing inside the safe area, clear of the footer, the slide number and the stage's edges", () => {
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

  it("sizes every tag for its words, at the label size", () => {
    for (const tag of [P.tag, E.staff, E.apart, F.overYears, F.stair.tag]) {
      expect(tag.at.h, tag.text).toBe(TAG.h);
      expect(tag.at.w, tag.text).toBe(tagWidth(tag.text));
      // Measured in Geist at 26 px the longest letter runs average 0.48 of the size: the tag's 0.52 holds them with room.
      expect(tag.at.w - TAG.point - TAG.gap - TAG.pad, tag.text).toBeGreaterThanOrEqual(tag.text.length * TAG.size * 0.5);
    }
  });
});

describe("slide 1, the title page on navy", () => {
  it("centres the rule on the stage and the block a little over the stage's middle", () => {
    expect(OPENING.rule.x + OPENING.rule.w / 2).toBe(STAGE.w / 2);
    const middle = (OPENING.title.y + OPENING.credit.foot) / 2;
    expect(middle).toBeLessThan(STAGE.h / 2);
    expect(middle).toBeGreaterThan(STAGE.h / 2 - 60);
  });

  it("stacks title, rule and story lines in order, apart, clear of the wordmark and the foot", () => {
    const titleFoot = OPENING.title.y + OPENING.title.lines.length * OPENING.title.line;
    expect(OPENING.rule.y).toBeGreaterThan(titleFoot);
    expect(OPENING.lead.y).toBeGreaterThan(OPENING.rule.y + OPENING.rule.h + 24);
    expect(OPENING.credit.y).toBeGreaterThanOrEqual(OPENING.lead.y + OPENING.lead.lines.length * LEAD_LINE + 16);
    expect(OPENING.credit.foot).toBe(OPENING.credit.y + OPENING.credit.lines.length * CREDIT_LINE);
    expect(OPENING.title.y).toBeGreaterThan(SAFE.top + 120);
    expect(OPENING.credit.foot).toBeLessThan(SAFE.bottom - 120);
  });

  it("sets every line inside the story band's width at its own size, erring wide", () => {
    for (const line of titleOf("title").lines) expect(line.length * 108 * 0.56, line).toBeLessThan(STORY.w);
    for (const line of OPENING.lead.lines) expect(line.length * 40 * 0.56, line).toBeLessThan(STORY.w);
    for (const line of OPENING.credit.lines) expect(line.length * 32 * 0.56, line).toBeLessThan(STORY.w);
  });
});

describe("slide 2, the timeline", () => {
  it("runs the line across the full drawing width, its years at its two ends under it", () => {
    expect(W.line.x0).toBe(SAFE.left + 16);
    expect(W.line.x1).toBe(SAFE.right);
    expect(W.years[0].at.x).toBe(W.line.x0);
    expect(W.years[1].at.x).toBe(W.line.x1);
    for (const year of W.years) expect(year.at.y).toBeGreaterThan(W.line.y);
  });

  it("stands the three figures on the line in order, left to right, far apart, each drawing over it and its words under it", () => {
    const xs = W.figures.map((entry) => entry.foot.x);
    for (let i = 1; i < xs.length; i++) expect(xs[i] - xs[i - 1]).toBeGreaterThan(500);
    for (const entry of W.figures) {
      expect(bottom(entry.at)).toBeLessThan(W.line.y);
      expect(entry.at.x + entry.at.w / 2).toBe(entry.foot.x);
      expect(entry.name.at.y).toBeGreaterThan(W.line.y);
      expect(entry.caption.at.y).toBeGreaterThan(entry.name.at.y);
    }
  });

  it("keeps the figures' words clear of the years", () => {
    for (const entry of W.figures) for (const year of W.years) {
      expect(overlaps(text(entry.name.at, entry.name.text), text(year.at, year.text, year.anchor)), `${entry.name.text} ${year.text}`).toBe(false);
      expect(overlaps(label(entry.caption.at, entry.caption.text), text(year.at, year.text, year.anchor)), `${entry.caption.text} ${year.text}`).toBe(false);
    }
  });

  it("sets the four statistics large, far larger than the years, in a row under the line, apart, the grey one last at the right edge", () => {
    expect(FIGURE.size).toBeGreaterThanOrEqual(3 * 32);
    const boxes = W.stats.map((stat) => figure(stat.at, stat.runs, FIGURE.size, FIGURE.small, stat.anchor));
    const captions = W.stats.map((stat) => text(stat.caption.at, stat.caption.text, stat.anchor));
    for (const b of boxes) for (const entry of W.figures) expect(b.y, entry.caption.text).toBeGreaterThan(label(entry.caption.at, entry.caption.text).y + LABEL_LINE + 40);
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i].x, W.stats[i].text).toBeGreaterThan(right(boxes[i - 1]) + 40);
      expect(captions[i].x, W.stats[i].caption.text).toBeGreaterThan(right(captions[i - 1]) + 24);
    }
    expect(W.stats.map((stat) => stat.grey)).toEqual([false, false, false, true]);
    expect(right(boxes[3])).toBeLessThanOrEqual(SAFE.right);
    expect(boxes[3].x - right(boxes[2])).toBeGreaterThan(boxes[2].x - right(boxes[1]));
  });
});

describe("slide 3, the track", () => {
  const T = P.track;
  const runnerBox = (at: Point, h: number) => box(at.x - h * 0.4, at.y - h, h * 0.8, h);
  const infield = box(T.inner.x + T.inner.h / 2, T.inner.y, T.inner.w - T.inner.h, T.inner.h);
  const home = runnerBox(P.city.at, RUNNER.large);
  const post = box(P.post.x, P.post.top, P.post.w, P.post.foot - P.post.top);
  const budget = figure(P.budget.at, P.budget.runs, BUDGET.size, BUDGET.small, "end");
  const budgetCaption = text(P.budget.caption.at, P.budget.caption.text, "end");

  it("draws the track large: the whole drawing width, two lanes inside its outer edge", () => {
    expect(T.outer.x).toBe(SAFE.left + 16);
    expect(right(T.outer)).toBe(SAFE.right);
    expect(T.outer.h).toBeGreaterThanOrEqual(320);
    expect(inside(T.inner, T.outer)).toBe(true);
    expect(inside(T.inner, T.middle) && inside(T.middle, T.outer)).toBe(true);
  });

  it("makes the home runner more than twice a pack runner's size, standing on the near straight at the start stripe", () => {
    expect(RUNNER.large).toBeGreaterThanOrEqual(2 * RUNNER.small);
    expect(home.y).toBeGreaterThan(bottom(T.inner));
    expect(bottom(home)).toBeLessThanOrEqual(bottom(T.outer));
    expect(P.start.y0).toBe(bottom(T.inner));
    expect(P.start.y1).toBe(bottom(T.outer));
    expect(home.x).toBeGreaterThan(P.start.x + 7);
    expect(home.x - P.start.x).toBeLessThan(24);
  });

  it("puts the pack on the far straight, far round the lap, each runner in one lane, named under them in the infield", () => {
    for (const at of P.pack.at) {
      const b = runnerBox(at, RUNNER.small);
      expect(b.y, `${at.x}`).toBeGreaterThanOrEqual(T.outer.y);
      expect(bottom(b), `${at.x}`).toBeLessThanOrEqual(T.inner.y);
      // On the far straight, past the right bend: more than half a lap on from the start.
      expect(at.x, `${at.x}`).toBeGreaterThan(T.outer.x + T.outer.h / 2);
      expect(at.x, `${at.x}`).toBeLessThan(right(T.outer) - T.outer.h / 2);
    }
    expect(inside(text(P.pack.name.at, P.pack.name.text), infield)).toBe(true);
  });

  it("names the home runner right under it, outside the track, with no leader", () => {
    const name = text(P.city.name.at, P.city.name.text);
    expect(P.city.name.at.x).toBe(P.city.at.x);
    expect(name.y).toBeGreaterThan(bottom(T.outer));
    expect(name.y - bottom(T.outer)).toBeLessThan(24);
  });

  it("plants the post just outside the track beside the start, its tick on its cap and its name to its right, none of it on the lane or the home runner's name", () => {
    expect(P.post.top - P.post.tick.r - 2).toBeGreaterThanOrEqual(bottom(T.outer));
    expect(Math.abs(P.post.tick.at.x - (P.post.x + P.post.w / 2))).toBeLessThan(1);
    expect(Math.abs(P.post.tick.at.y - P.post.top)).toBeLessThanOrEqual(P.post.tick.r);
    const name = label(P.post.name.at, P.post.name.text, "start");
    expect(name.x).toBeGreaterThan(right(post));
    expect(name.y).toBeGreaterThan(bottom(T.outer));
    expect(post.x).toBeGreaterThan(right(text(P.city.name.at, P.city.name.text)) + 12);
    expect(post.x - P.start.x).toBeLessThan(260);
  });

  it("centres the grey tag in the infield, clear of the pack's name and the budget figure", () => {
    expect(P.tag.at.x + P.tag.at.w / 2).toBeCloseTo(960, 0);
    expect(inside(P.tag.at, infield)).toBe(true);
    expect(overlaps(P.tag.at, text(P.pack.name.at, P.pack.name.text))).toBe(false);
    expect(overlaps(P.tag.at, budget)).toBe(false);
    expect(overlaps(P.tag.at, budgetCaption)).toBe(false);
  });

  it("sets the budget figure large inside the infield at its right, its caption under it", () => {
    expect(BUDGET.size).toBeGreaterThanOrEqual(96);
    expect(inside(budget, infield)).toBe(true);
    expect(inside(budgetCaption, infield)).toBe(true);
    expect(budgetCaption.y).toBeGreaterThanOrEqual(bottom(budget) - 8);
    expect(budget.x).toBeGreaterThan(right(P.tag.at) + 40);
    expect(budget.x).toBeGreaterThan(right(text(P.pack.name.at, P.pack.name.text)) + 40);
  });
});

describe("slide 4, the departments", () => {
  it("lays the grid out as the documented numbers, so slide 10 can copy it", () => {
    expect(GRID).toEqual({ x: 176, y: 624, cols: 7, rows: 3, box: { w: 104, h: 68 }, gap: 14, rx: 8 });
    expect(GRID_BOX).toEqual({ x: 176, y: 624, w: 812, h: 232 });
    expect(cellAt(6, 2)).toEqual({ x: 884, y: 788, w: 104, h: 68 });
    expect(E.boxes).toHaveLength(21);
    for (const cell of E.boxes) expect(inside(cell.at, GRID_BOX), cell.key).toBe(true);
    for (const a of E.boxes) for (const b of E.boxes) if (a !== b) expect(overlaps(a.at, b.at), `${a.key} ${b.key}`).toBe(false);
  });

  it("lights two named boxes and five unnamed ones, each a different box, each lantern inside its box", () => {
    const lit = [...LIT.named, ...LIT.unnamed].map(([col, row]) => `${col}.${row}`);
    expect(new Set(lit).size).toBe(7);
    for (const lantern of [...E.named, ...E.unnamed]) expect(inside(box(lantern.centre.x - LANTERN.w / 2, lantern.centre.y - LANTERN.h / 2, LANTERN.w, LANTERN.h), lantern.at), lantern.key).toBe(true);
  });

  it("names the two lit boxes to the ring's right, each leader from its box's edge to its name, the names apart", () => {
    for (const lit of E.named) {
      expect(lit.leader.from.x).toBeGreaterThan(right(lit.at));
      expect(lit.leader.to.x).toBeLessThan(lit.name.at.x);
      expect(lit.name.at.x).toBeGreaterThan(right(E.ring.at) + 24);
      expect(right(label(lit.caption.at, lit.caption.text, "start"))).toBeLessThanOrEqual(SAFE.right);
    }
    const [a, b] = E.named.map((lit) => bounds([text(lit.name.at, lit.name.text, "start"), label(lit.caption.at, lit.caption.text, "start")]));
    expect(bottom(a) + 12).toBeLessThan(b.y);
    expect(text(E.ring.name.at, E.ring.name.text, "start").y).toBeGreaterThan(bottom(b) + 12);
  });

  it("rings the grid with nine dots on the ring, the grid and its name inside it", () => {
    expect(E.ring.dots).toHaveLength(9);
    expect(inside(GRID_BOX, E.ring.at)).toBe(true);
    expect(inside(label(E.name.at, E.name.text, "start"), E.ring.at)).toBe(true);
    expect(bottom(label(E.name.at, E.name.text, "start"))).toBeLessThanOrEqual(GRID.y);
    for (const dot of E.ring.dots) {
      const onEdge = [dot.at.x - E.ring.at.x, right(E.ring.at) - dot.at.x, dot.at.y - E.ring.at.y, bottom(E.ring.at) - dot.at.y];
      expect(Math.min(...onEdge.map(Math.abs)), dot.key).toBeLessThan(13);
    }
  });

  it("drops the tag under the ring and sets the grey tag apart at the right, clear of everything", () => {
    expect(E.staff.at.y).toBeGreaterThan(bottom(E.ring.at) + DOT_R);
    expect(E.apart.at.x).toBeGreaterThan(right(E.staff.at) + 200);
    expect(E.apart.at.x).toBeGreaterThan(right(E.ring.at) + 200);
  });
});

describe("slide 4a, the fleet, in three zones", () => {
  const yard = box(F.fence.at.x, F.fence.at.y - 10, F.fence.at.w, F.fence.at.h + 20);
  const partners = bounds([...F.plates.map((plate) => plate.at), F.joining.at, label(F.joining.caption.at, F.joining.caption.text, "start")]);
  const yardTag = F.overYears.at;
  const stair = bounds([...F.stair.steps.flatMap((entry) => [entry.at, box(entry.gate.at.x - GATE.span / 2, entry.gate.at.y - GATE.h, GATE.span, GATE.h)]), F.stair.tag.at]);

  it("keeps the yard at the left, the partners under it and the stair at the right, with room between", () => {
    expect(partners.y).toBeGreaterThan(bottom(yard) + 48);
    expect(right(partners)).toBeLessThanOrEqual(right(yard));
    expect(stair.x).toBeGreaterThan(right(yard) + 48);
    expect(stair.x).toBeGreaterThan(right(yardTag) + 48);
    expect(stair.x).toBeGreaterThan(right(partners) + 48);
  });

  it("holds everything at work inside the yard, apart: the leads, the outline, the reviewers, the person and the mark's label", () => {
    const inner = box(F.fence.at.x + 8, F.fence.at.y + 8, F.fence.at.w - 16, F.fence.at.h - 16);
    const leads = bounds([...F.leads.at.map((at) => ringBox(at, AGENT_R)), label(F.leads.name.at, F.leads.name.text)]);
    const reviewers = bounds([...F.reviewers.at.map((at) => ringBox(at, REVIEWER_R)), label(F.reviewers.name.at, F.reviewers.name.text)]);
    const person = bounds([F.person.at, ringBox(F.mark.at, 24), label({ x: F.mark.at.x + 44, y: F.mark.at.y }, F.mark.text, "start")]);
    const app = F.checked.at;
    const parts = [leads, app, reviewers, person];
    for (const b of parts) expect(inside(b, inner), `${b.x}`).toBe(true);
    for (let i = 1; i < parts.length; i++) expect(parts[i].x, `${i}`).toBeGreaterThan(right(parts[i - 1]) + 16);
    for (const slot of F.app.slots) expect(inside(slot.at, F.app.at), slot.key).toBe(true);
  });

  it("names the yard over its top left, clear of the fence's posts", () => {
    expect(bottom(text(F.name.at, F.name.text, "start"))).toBeLessThanOrEqual(F.fence.at.y - 10);
    expect(label(F.built.at, F.built.text, "start").x).toBeGreaterThan(right(text(F.name.at, F.name.text, "start")) + 8);
  });

  it("hangs the tag under the fence's left foot, clear of the rail and the posts' feet, and over the partner plates", () => {
    expect(F.overYears.at.y).toBeGreaterThanOrEqual(bottom(F.fence.at) + 10 + 8);
    expect(F.overYears.at.x).toBeLessThan(F.fence.at.x + 120);
    for (const plate of [...F.plates, F.joining]) {
      expect(overlaps(F.overYears.at, plate.at), plate.text).toBe(false);
      expect(plate.at.y, plate.text).toBeGreaterThanOrEqual(bottom(F.overYears.at) + 24);
    }
  });

  it("sets the two plates side by side and the dashed one apart, its caption beside it", () => {
    const [a, b] = F.plates.map((plate) => plate.at);
    expect(b.y).toBe(a.y);
    expect(b.x - right(a)).toBeLessThanOrEqual(20);
    expect(F.joining.at.x - right(b)).toBeGreaterThanOrEqual(48);
    for (const plate of [...F.plates, F.joining]) expect(plate.at.w, plate.text).toBeGreaterThanOrEqual(wordsWidth(plate.text, 32) + 24);
  });

  it("climbs the stair left to right, each step higher, its name inside its riser and its gate on its tread; the top step is the only one unlit", () => {
    const steps = F.stair.steps;
    for (let i = 1; i < steps.length; i++) {
      expect(steps[i].at.y).toBeLessThan(steps[i - 1].at.y);
      expect(steps[i].at.x).toBeGreaterThanOrEqual(right(steps[i - 1].at));
    }
    for (const entry of steps) {
      expect(inside(label(entry.name.at, entry.text), box(entry.at.x + 4, entry.at.y + 4, entry.at.w - 8, entry.at.h - 4)), entry.text).toBe(true);
      expect(entry.gate.at.y).toBe(entry.at.y);
      expect(GATE.span).toBeLessThan(entry.at.w);
    }
    expect(steps.map((entry) => entry.lit)).toEqual([true, true, true, false]);
    expect(steps.every((entry) => bottom(entry.at) === F.stair.floor.y)).toBe(true);
  });

  it("sets the grey tag over the top step, clear of its gate and the step below", () => {
    const top = F.stair.steps[3];
    expect(bottom(F.stair.tag.at)).toBeLessThan(top.gate.at.y - GATE.h);
    expect(F.stair.tag.at.x).toBeLessThan(top.at.x + top.at.w);
    expect(right(F.stair.tag.at)).toBeGreaterThan(top.at.x);
    const third = F.stair.steps[2];
    expect(bottom(F.stair.tag.at)).toBeLessThan(third.gate.at.y - GATE.h);
  });
});
