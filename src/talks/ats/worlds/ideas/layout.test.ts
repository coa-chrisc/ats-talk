/**
 * Where the ideas world's slides put things: every drawing under its story
 * band and inside the frame's safe area, and on each slide the parts that
 * must not meet kept apart, the words inside what holds them.
 */
import { describe, expect, it } from "vitest";
import { STORY, box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, TEXT_LINE, contentTop, linesIn, wordsWidth } from "./layout";
import { LADDER, standing } from "./layout-ladder";
import { ANGLES, ENFORCE, needleTip } from "./layout-enforce";
import { FIGURE_LINE, NAME_LINE, PEOPLE, TIP, balanceBox } from "./layout-people";
import { CAPTION_LINE, EARN, GATE, boxOn } from "./layout-earn";
import { bandFoot, bottom, bounds, inside, overlaps, ringBox, wordsBox } from "./harness";

/** Clear of the frame's chrome: under the logo, over the footer and the slide number, inside the story band's width. */
const SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w };
/** The room a drawing keeps from the story band's foot and from the footer's top. */
const ROOM = 40;

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);

const L = LADDER;
const T = PEOPLE;
const E = ENFORCE;
const G = EARN;
const D = E.dial;

/** The turned label along the arrow: the four corners of its line, turned about its place by the arrow's slope. */
const turnedCorners = (): Point[] => {
  const { at, text, turn } = L.more.label;
  const half = wordsWidth(text, 26) / 2;
  const a = (turn * Math.PI) / 180;
  const along = { x: Math.cos(a) * half, y: Math.sin(a) * half };
  const up = { x: -Math.sin(a) * (LABEL_LINE / 2), y: Math.cos(a) * (LABEL_LINE / 2) };
  return [1, -1].flatMap((s) => [1, -1].map((t) => ({ x: at.x + s * along.x + t * up.x, y: at.y + s * along.y + t * up.y })));
};
/** The turned label's axis-aligned bounds, for the slide's extent. */
const turnedLabel = () => {
  const corners = turnedCorners();
  const x0 = Math.min(...corners.map((c) => c.x));
  const y0 = Math.min(...corners.map((c) => c.y));
  return box(x0, y0, Math.max(...corners.map((c) => c.x)) - x0, Math.max(...corners.map((c) => c.y)) - y0);
};
const within = (p: Point, b: Box) => p.x > b.x && p.x < b.x + b.w && p.y > b.y && p.y < b.y + b.h;

/** A gate on a step: its posts' span and height over the tread. */
const gateBox = (step: (typeof G.steps)[number]) => box(step.gate.x - GATE.span / 2, step.gate.y - GATE.h, GATE.span, GATE.h);
/** Where the box passes on its way to the second step: its foot at the hop's height, from over the first tread to over the second. */
const hopBox = () => {
  const from = boxOn(0);
  const to = boxOn(1);
  const foot = G.project.at.y + G.project.at.h + G.project.hop;
  return box(from.x, foot - G.project.at.h, to.x + to.w - from.x, G.project.at.h);
};
const evidenceBox = () => label(G.evidence.at, G.evidence.text);

/** What each slide draws under its story band, at the end of its click and on the way. */
const DRAWN: Record<string, Box[]> = {
  ladder: [
    ...L.steps.map((step) => step.at),
    L.walker.at,
    standing(),
    ringBox(L.tick.at, L.tick.r),
    label(L.stop.at, L.stop.text),
    box(L.more.tail.x, L.more.head.y - 12, L.more.head.x - L.more.tail.x, L.more.tail.y - L.more.head.y + 24),
    turnedLabel(),
    L.tool.at,
    label(L.tool.name.at, L.tool.name.text, "start"),
    label(L.tool.caption.at, L.tool.caption.text, "start"),
  ],
  enforce: [
    ...E.steps.map((step) => step.at),
    box(E.arrow.x - 12, E.arrow.y1, 24, E.arrow.y0 - E.arrow.y1),
    E.arrow.label.at,
    box(D.hub.x - D.r - 16, D.hub.y - D.r, 2 * D.r + 32, D.r),
    ...D.settings.map((setting) => setting.at),
  ],
  people: [balanceBox(), T.six.at, T.six.caption.at, T.plaque.at],
  earn: [
    ...G.steps.map((step) => step.at),
    ...G.steps.map(gateBox),
    G.project.at,
    boxOn(0),
    boxOn(1),
    hopBox(),
    ...G.ticks.map((tick) => ringBox(tick.at, tick.r)),
    evidenceBox(),
    ...G.list.map((row) => row.check),
    // A row's words are checked against the band's edge in their own test, where the rough measure is corrected; its rule runs to the edge.
    ...G.list.map((row) => box(row.rule.x0, row.rule.y - 1, row.rule.x1 - row.rule.x0, 2)),
    label(G.heading.at, G.heading.text, "start"),
  ],
};

describe("the ideas world's layout", () => {
  it("starts every slide's drawing well under its story band, where the layout says drawing starts", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      expect(contentTop(pictureId), pictureId).toBeGreaterThanOrEqual(bandFoot(pictureId) + ROOM);
      expect(Math.min(...boxes.map((b) => b.y)), pictureId).toBeGreaterThanOrEqual(contentTop(pictureId));
    }
  });

  it("ends every slide's drawing well over the footer", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) expect(bottom(bounds(boxes)), pictureId).toBeLessThanOrEqual(SAFE.bottom - ROOM);
  });

  it("keeps every slide's drawing clear of the stage's edges", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      const all = bounds(boxes);
      expect(all.y, pictureId).toBeGreaterThanOrEqual(SAFE.top);
      expect(all.x, pictureId).toBeGreaterThanOrEqual(SAFE.left);
      expect(all.x + all.w, pictureId).toBeLessThanOrEqual(SAFE.right);
    }
  });

  it("uses the stage: every slide's drawing spans at least four fifths of its width", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) expect(bounds(boxes).w, pictureId).toBeGreaterThanOrEqual(0.8 * STORY.w);
  });
});

describe("slide 7, the ladder", () => {
  it("rises left to right, each block on the floor, the next taller by the same step, touching the last", () => {
    for (const step of L.steps) expect(bottom(step.at), step.key).toBe(L.floor.y);
    for (let i = 1; i < L.steps.length; i++) {
      expect(L.steps[i].at.x).toBe(L.steps[i - 1].at.x + L.steps[i - 1].at.w);
      expect(L.steps[i].at.h - L.steps[i - 1].at.h).toBe(L.steps[1].at.h - L.steps[0].at.h);
    }
  });

  it("sets each block's name and caption inside its face, on no more lines than the face holds", () => {
    for (const step of L.steps) {
      const { at } = step.words;
      expect(inside(at, step.at), step.key).toBe(true);
      const rows = linesIn(step.words.name, 26, at.w) + linesIn(step.words.caption, 26, at.w);
      expect(rows * LABEL_LINE, step.key).toBeLessThanOrEqual(at.h);
    }
  });

  it("starts the figure on the floor left of the stair and ends it standing on the first block, on its tread and clear of the second", () => {
    expect(bottom(L.walker.at)).toBe(L.floor.y);
    expect(L.walker.at.x + L.walker.at.w).toBeLessThan(L.steps[0].at.x);
    const on = standing();
    expect(bottom(on)).toBe(L.steps[0].at.y);
    expect(on.x).toBeGreaterThan(L.steps[0].at.x);
    expect(on.x + on.w).toBeLessThan(L.steps[1].at.x);
    // The walk ends at the riser, short of it: the step up is what puts it on the block.
    expect(L.walker.at.x + L.walker.at.w + L.walker.walk).toBeLessThanOrEqual(L.steps[0].at.x);
  });

  it("puts the tick over the standing figure and its label over the tick, clear of the second block", () => {
    const on = standing();
    expect(L.tick.at.x).toBe(on.x + on.w / 2);
    expect(L.tick.at.y + L.tick.r).toBeLessThan(on.y);
    const stop = label(L.stop.at, L.stop.text);
    expect(bottom(stop)).toBeLessThan(L.tick.at.y - L.tick.r);
    expect(overlaps(stop, L.steps[1].at)).toBe(false);
  });

  it("runs the arrow up over the stair, climbing as it does, clear of every block, its label clear of the blocks and the tick's label", () => {
    expect(L.more.head.x).toBeGreaterThan(L.more.tail.x);
    expect(L.more.head.y).toBeLessThan(L.more.tail.y);
    const slope = (L.more.tail.y - L.more.head.y) / (L.more.head.x - L.more.tail.x);
    for (const step of L.steps) {
      const x = Math.max(step.at.x, L.more.tail.x);
      if (x > L.more.head.x) continue;
      const y = L.more.tail.y - (x - L.more.tail.x) * slope;
      expect(y + 12, step.key).toBeLessThan(step.at.y);
    }
    // The label runs parallel to the arrow on the side away from the stair, its line clear of the arrow, so its corners say where it is.
    const lift = Math.hypot(L.more.label.at.x - (L.more.tail.x + L.more.head.x) / 2, L.more.label.at.y - (L.more.tail.y + L.more.head.y) / 2);
    expect(lift).toBeGreaterThan(LABEL_LINE / 2 + 6);
    expect(L.more.label.at.y).toBeLessThan((L.more.tail.y + L.more.head.y) / 2);
    for (const corner of turnedCorners()) {
      for (const step of L.steps) expect(within(corner, step.at), step.key).toBe(false);
      expect(within(corner, label(L.stop.at, L.stop.text))).toBe(false);
      expect(corner.y).toBeGreaterThanOrEqual(contentTop("ladder"));
    }
    expect(overlaps(turnedLabel(), label(L.stop.at, L.stop.text))).toBe(false);
  });

  it("sets the tool under the floor at the stair's start, its two lines beside it", () => {
    expect(L.tool.at.y).toBeGreaterThan(L.floor.y + 12);
    expect(L.tool.at.x).toBe(L.steps[0].at.x);
    expect(label(L.tool.name.at, L.tool.name.text, "start").x).toBeGreaterThan(L.tool.at.x + L.tool.at.w);
  });
});

describe("slide 8, the descending stair and the dial", () => {
  it("steps down left to right, strongest first, each block on the floor, touching the last", () => {
    for (const step of E.steps) expect(bottom(step.at), step.key).toBe(E.floor.y);
    for (let i = 1; i < E.steps.length; i++) {
      expect(E.steps[i].at.h).toBeLessThan(E.steps[i - 1].at.h);
      expect(E.steps[i].at.x).toBe(E.steps[i - 1].at.x + E.steps[i - 1].at.w);
    }
  });

  it("names each block inside its face, on no more lines than the shortest face holds", () => {
    expect(E.steps.at(-1)!.at.h).toBe(2 * LABEL_LINE + 32);
    for (const step of E.steps) {
      expect(inside(step.name.at, step.at), step.key).toBe(true);
      expect(linesIn(step.name.text, 26, step.name.at.w) * LABEL_LINE, step.key).toBeLessThanOrEqual(step.name.at.h);
    }
  });

  it("points the arrow up the stair's left, beside the tallest block, its label centred over its head on two lines, clear of the stair", () => {
    expect(E.arrow.y1).toBeLessThan(E.arrow.y0);
    expect(E.arrow.x + 12).toBeLessThan(E.steps[0].at.x);
    const words = E.arrow.label.at;
    expect(bottom(words)).toBeLessThan(E.arrow.y1);
    expect(words.x + words.w / 2).toBe(E.arrow.x);
    expect(words.x + words.w).toBeLessThan(E.steps[0].at.x);
    expect(linesIn(E.arrow.label.text, 26, words.w) * LABEL_LINE).toBeLessThanOrEqual(words.h);
    // Its longer word sets on one line: Geist sets it at 0.9 of the rough measure or less.
    const longest = Math.max(...E.arrow.label.text.split(" ").map((word) => wordsWidth(word, 26)));
    expect(longest * 0.9).toBeLessThanOrEqual(words.w);
  });

  it("draws the dial right of the stair, no smaller than its first 150 px, three ticks on its arc, the needle resting on the first", () => {
    expect(D.r).toBeGreaterThanOrEqual(150);
    expect(D.hub.x - D.r - 16).toBeGreaterThan(E.steps.at(-1)!.at.x + E.steps.at(-1)!.at.w + 80);
    expect(D.ticks).toHaveLength(3);
    expect(D.needle.rest).toBe(ANGLES[0]);
    const tip = needleTip(D.needle.rest);
    expect(tip.x).toBeLessThan(D.hub.x);
    expect(Math.hypot(tip.x - D.hub.x, tip.y - D.hub.y)).toBeLessThan(D.r - 20);
  });

  it("sets the three settings apart, none on the arc, each name and caption inside its box", () => {
    const arc = box(D.hub.x - D.r, D.hub.y - D.r, 2 * D.r, D.r);
    for (const a of D.settings) {
      expect(overlaps(a.at, arc), a.key).toBe(false);
      for (const b of D.settings) if (a !== b) expect(overlaps(a.at, b.at), `${a.key} ${b.key}`).toBe(false);
      // The name over the caption, each wrapping in the box, on no more lines than the box holds.
      expect((linesIn(a.name, 26, a.at.w) + linesIn(a.caption, 26, a.at.w)) * LABEL_LINE, a.key).toBeLessThanOrEqual(a.at.h);
      // No word wider than the box.
      for (const word of `${a.name} ${a.caption}`.split(" ")) expect(wordsWidth(word, 26), word).toBeLessThanOrEqual(a.at.w);
    }
  });
});

describe("slide 9, the balance", () => {
  it("hangs a pan at each end of the beam, the beam's middle on the post, and tips its right end down", () => {
    const [left, right] = T.pans;
    expect(left.end.x).toBe(T.beam.x0);
    expect(right.end.x).toBe(T.beam.x1);
    expect(T.beam.pivot.x).toBe((T.beam.x0 + T.beam.x1) / 2);
    expect(T.post.top).toEqual(T.beam.pivot);
    expect(TIP).toBeGreaterThan(0);
    expect(right.shift.y).toBeGreaterThan(0);
    expect(left.shift.y).toBeCloseTo(-right.shift.y, 6);
  });

  it("draws the balance larger than its first 360 px beam, and it takes the stage's left third", () => {
    expect(T.beam.x1 - T.beam.x0).toBeGreaterThanOrEqual(440);
    expect(balanceBox().w).toBeGreaterThanOrEqual(640);
  });

  it("stands the box on the left pan and the people on the right, each inside its pan's width, its name over it", () => {
    const [left, right] = T.pans;
    const name = (at: Point, words: string) => wordsBox(at, wordsWidth(words, 32), NAME_LINE, "middle");
    expect(bottom(T.technology.at)).toBe(left.plate.y);
    expect(T.technology.at.x).toBeGreaterThanOrEqual(left.plate.x);
    expect(T.technology.at.x + T.technology.at.w).toBeLessThanOrEqual(left.plate.x + left.plate.w);
    for (const person of T.talent.people) {
      expect(bottom(person)).toBe(right.plate.y);
      expect(person.x).toBeGreaterThanOrEqual(right.plate.x);
      expect(person.x + person.w).toBeLessThanOrEqual(right.plate.x + right.plate.w);
    }
    expect(bottom(name(T.technology.name.at, T.technology.name.text))).toBeLessThan(T.technology.at.y);
    expect(bottom(name(T.talent.name.at, T.talent.name.text))).toBeLessThan(Math.min(...T.talent.people.map((p) => p.y)));
  });

  it("keeps three zones apart, generously: the balance, the figure over its caption, and the plaque", () => {
    const balance = balanceBox();
    const middle = bounds([T.six.at, T.six.caption.at]);
    expect(middle.x - (balance.x + balance.w)).toBeGreaterThanOrEqual(80);
    expect(T.plaque.at.x - (middle.x + middle.w)).toBeGreaterThanOrEqual(80);
  });

  it("sets the figure larger than its first 96 px, a word to a line, its caption under it on no more than three lines", () => {
    expect(FIGURE_LINE).toBeGreaterThanOrEqual(130);
    expect(T.six.at.h).toBe(2 * FIGURE_LINE);
    // A word to a line: the whole figure does not fit the zone's width, its longer word does (the rough measure runs wide at 128 px bold).
    expect(wordsWidth(T.six.text, 128) * 0.85).toBeGreaterThan(T.six.at.w);
    const longest = Math.max(...T.six.text.split(" ").map((word) => wordsWidth(word, 128)));
    expect(longest * 0.85).toBeLessThanOrEqual(T.six.at.w);
    expect(T.six.caption.at.y).toBeGreaterThanOrEqual(bottom(T.six.at));
    expect(linesIn(T.six.caption.text, 32, T.six.caption.at.w) * TEXT_LINE).toBeLessThanOrEqual(T.six.caption.at.h);
  });

  it("keeps the plaque's words inside it, the name on one line and the caption on no more than three", () => {
    expect(inside(T.plaque.words.at, T.plaque.at)).toBe(true);
    // The rough measure runs wide at 26 px: Geist sets the caption's lines at 0.9 of it or less, on three lines in the column.
    const lines = linesIn(T.plaque.caption, 26, T.plaque.words.at.w / 0.9);
    expect(lines).toBeLessThanOrEqual(3);
    expect(lines * LABEL_LINE + 56).toBeLessThanOrEqual(T.plaque.words.at.h);
    // The name at 48 px bold sets in about 275 px in Geist, under 0.9 of the rough measure.
    expect(wordsWidth(T.plaque.name, 48) * 0.9).toBeLessThanOrEqual(T.plaque.words.at.w);
  });
});

describe("slide 10, the stair of gates and the checklist", () => {
  it("rises left to right, each step on the floor, the next taller by the same step, touching the last", () => {
    for (const step of G.steps) expect(bottom(step.at), step.key).toBe(G.floor.y);
    for (let i = 1; i < G.steps.length; i++) {
      expect(G.steps[i].at.x - (G.steps[i - 1].at.x + G.steps[i - 1].at.w)).toBeLessThanOrEqual(2);
      expect(G.steps[i].at.h - G.steps[i - 1].at.h).toBe(G.steps[1].at.h - G.steps[0].at.h);
    }
  });

  it("stands a gate on every tread, inside it, and names each step inside its riser", () => {
    for (const step of G.steps) {
      const gate = gateBox(step);
      expect(bottom(gate), step.key).toBe(step.tread);
      expect(gate.x, step.key).toBeGreaterThan(step.at.x);
      expect(gate.x + gate.w, step.key).toBeLessThan(step.at.x + step.at.w);
      const name = label(step.name, step.text);
      expect(inside(name, step.at), step.key).toBe(true);
    }
  });

  it("starts the box on the floor left of the stair, and stands it on the first tread, then the second, left of each gate", () => {
    expect(bottom(G.project.at)).toBe(G.floor.y);
    expect(G.project.at.x + G.project.at.w).toBeLessThan(G.steps[0].at.x);
    for (const i of [0, 1]) {
      const on = boxOn(i);
      const step = G.steps[i];
      expect(bottom(on), step.key).toBe(step.tread);
      expect(on.x, step.key).toBeGreaterThan(step.at.x);
      expect(on.x + on.w, step.key).toBeLessThan(gateBox(step).x);
    }
  });

  it("lands each tick on its tread between the box and the gate, the caption over the first, clear of both", () => {
    G.ticks.forEach((tick, i) => {
      const ring = ringBox(tick.at, tick.r);
      const step = G.steps[i];
      expect(ring.x, tick.key).toBeGreaterThan(boxOn(i).x + boxOn(i).w);
      expect(ring.x + ring.w, tick.key).toBeLessThan(gateBox(step).x);
      expect(bottom(ring), tick.key).toBeLessThan(step.tread);
    });
    const caption = evidenceBox();
    expect(caption.h).toBe(CAPTION_LINE);
    expect(bottom(caption)).toBeLessThan(G.ticks[0].at.y - G.ticks[0].r);
    expect(overlaps(caption, boxOn(0))).toBe(false);
    expect(overlaps(caption, gateBox(G.steps[0]))).toBe(false);
    expect(overlaps(caption, G.steps[1].at)).toBe(false);
  });

  it("lifts the box clear of the caption and the first gate on its way to the second step", () => {
    const hop = hopBox();
    expect(overlaps(hop, evidenceBox())).toBe(false);
    expect(overlaps(hop, gateBox(G.steps[0]))).toBe(false);
    expect(bottom(hop)).toBeLessThan(G.steps[1].tread);
  });

  it("sets the checklist right of the stair, six rows, each row's words inside the band", () => {
    const stair = G.steps.at(-1)!.at;
    expect(G.list).toHaveLength(6);
    for (const row of G.list) {
      expect(row.check.x - (stair.x + stair.w), row.key).toBeGreaterThanOrEqual(80);
      const words = text(row.words, row.text, "start");
      // The rough measure runs wide at 32 px: Geist sets the longest row in about 475 px, at 0.88 of it.
      expect(words.x + words.w * 0.9, row.key).toBeLessThanOrEqual(SAFE.right);
      expect(row.rule.y, row.key).toBeGreaterThan(row.check.y + row.check.h);
    }
    for (let i = 1; i < G.list.length; i++) expect(G.list[i].check.y).toBeGreaterThan(G.list[i - 1].rule.y);
  });

  it("sets the heading over the checklist, on the list's left edge, on one line inside the band, clear of the first row", () => {
    const heading = label(G.heading.at, G.heading.text, "start");
    expect(heading.x).toBe(G.list[0].check.x);
    // The rough measure runs wide at 26 px: Geist sets the heading in about 400 px.
    expect(heading.x + heading.w * 0.9).toBeLessThanOrEqual(SAFE.right);
    expect(bottom(heading)).toBeLessThan(G.list[0].check.y);
    for (const row of G.list) expect(overlaps(heading, text(row.words, row.text, "start")), row.key).toBe(false);
    expect(heading.y).toBeGreaterThanOrEqual(contentTop("earn"));
  });
});
