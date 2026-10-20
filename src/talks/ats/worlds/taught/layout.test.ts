/**
 * Where the taught world's slides put things: every drawing under its story
 * band and inside the frame's safe area, and on each slide the parts that
 * must not meet kept apart, the words inside what holds them.
 */
import { describe, expect, it } from "vitest";
import { STORY, box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, TAG_LINE, TEXT_LINE, contentTop, linesIn, wordsWidth } from "./layout";
import { LADDER, standing } from "./layout-ladder";
import { TALENT, TIP, balanceBox } from "./layout-talent";
import { ANGLES, ENFORCE, needleTip } from "./layout-enforce";
import { INCIDENTS, INNER } from "./layout-incidents";
import { bandFoot, bottom, bounds, inside, overlaps, ringBox, wordsBox } from "./harness";

/** Clear of the frame's chrome: under the logo, over the footer and the slide number, inside the story band's width. */
const SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w };
/** The room a drawing keeps from the story band's foot and from the footer's top. */
const ROOM = 40;

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);

const L = LADDER;
const T = TALENT;
const E = ENFORCE;
const I = INCIDENTS;
const D = E.dial;

/** The turned label along the arrow: its box before the turn, widened by the turn's lean. */
const turnedLabel = () => {
  const flat = label(L.more.label.at, L.more.label.text);
  const lean = (flat.w / 2) * Math.sin((Math.abs(L.more.label.turn) * Math.PI) / 180);
  return box(flat.x, flat.y - lean, flat.w, flat.h + 2 * lean);
};

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
  talent: [balanceBox(), T.six.at, T.six.caption.at, T.bar.at, T.bar.caption.at, T.plaque.at],
  enforce: [
    ...E.steps.map((step) => step.at),
    box(E.arrow.x - 12, E.arrow.y1, 24, E.arrow.y0 - E.arrow.y1),
    label(E.arrow.label.at, E.arrow.label.text),
    { ...E.post.at, y: E.post.at.y + E.post.drop },
    label(E.list.at, E.list.text, "start"),
    box(D.hub.x - D.r - 16, D.hub.y - D.r, 2 * D.r + 32, D.r),
    ...D.settings.map((setting) => setting.at),
  ],
  incidents: [...I.cards.map((card) => card.at), I.label.at],
};

describe("the taught world's layout", () => {
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

describe("slide 5, the ladder", () => {
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
    for (const step of L.steps) expect(overlaps(turnedLabel(), step.at), step.key).toBe(false);
    expect(overlaps(turnedLabel(), label(L.stop.at, L.stop.text))).toBe(false);
  });

  it("sets the tool under the floor at the stair's start, its two lines beside it", () => {
    expect(L.tool.at.y).toBeGreaterThan(L.floor.y + 12);
    expect(L.tool.at.x).toBe(L.steps[0].at.x);
    expect(label(L.tool.name.at, L.tool.name.text, "start").x).toBeGreaterThan(L.tool.at.x + L.tool.at.w);
  });
});

describe("slide 6, the balance", () => {
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

  it("stands the box on the left pan and the people on the right, each inside its pan's width, its name over it", () => {
    const [left, right] = T.pans;
    expect(bottom(T.technology.at)).toBe(left.plate.y);
    expect(T.technology.at.x).toBeGreaterThanOrEqual(left.plate.x);
    expect(T.technology.at.x + T.technology.at.w).toBeLessThanOrEqual(left.plate.x + left.plate.w);
    for (const person of T.talent.people) {
      expect(bottom(person)).toBe(right.plate.y);
      expect(person.x).toBeGreaterThanOrEqual(right.plate.x);
      expect(person.x + person.w).toBeLessThanOrEqual(right.plate.x + right.plate.w);
    }
    expect(bottom(label(T.technology.name.at, T.technology.name.text))).toBeLessThan(T.technology.at.y);
    expect(bottom(label(T.talent.name.at, T.talent.name.text))).toBeLessThan(Math.min(...T.talent.people.map((p) => p.y)));
  });

  it("keeps four zones apart, generously: the balance, the figure over the bar, and the plaque", () => {
    const balance = balanceBox();
    const middle = bounds([T.six.at, T.six.caption.at, T.bar.at, T.bar.caption.at]);
    expect(middle.x - (balance.x + balance.w)).toBeGreaterThanOrEqual(80);
    expect(T.plaque.at.x - (middle.x + middle.w)).toBeGreaterThanOrEqual(80);
  });

  it("sets the figure large over its caption, the bar under them, and its caption under the bar", () => {
    // The rough measure runs wide at 96 px bold: Geist sets these words in about 520 px.
    expect(wordsWidth(T.six.text, 96) * 0.9).toBeLessThanOrEqual(T.six.at.w);
    expect(T.six.caption.at.y).toBeGreaterThanOrEqual(bottom(T.six.at));
    expect(T.bar.at.y).toBeGreaterThan(bottom(T.six.caption.at) + 40);
    expect(T.bar.caption.at.y).toBeGreaterThan(bottom(T.bar.at));
  });

  it("splits the bar in three, the middle part largest and twice each other, each name inside its part", () => {
    const [buy, boost, build] = T.bar.parts.map((part) => part.at);
    expect(boost.w).toBe(2 * buy.w);
    expect(boost.w).toBe(2 * build.w);
    expect(buy.x + buy.w + boost.w + build.w).toBe(T.bar.at.x + T.bar.at.w);
    for (const part of T.bar.parts) expect(wordsWidth(part.text, 26) + 16, part.text).toBeLessThanOrEqual(part.at.w);
  });

  it("keeps the plaque's words inside it", () => {
    expect(inside(T.plaque.words.at, T.plaque.at)).toBe(true);
    expect(linesIn(T.plaque.caption, 26, T.plaque.words.at.w)).toBe(1);
  });
});

describe("slide 7, the descending stair and the dial", () => {
  it("steps down left to right, strongest first, each block on the floor, touching the last", () => {
    for (const step of E.steps) expect(bottom(step.at), step.key).toBe(E.floor.y);
    for (let i = 1; i < E.steps.length; i++) {
      expect(E.steps[i].at.h).toBeLessThan(E.steps[i - 1].at.h);
      expect(E.steps[i].at.x).toBe(E.steps[i - 1].at.x + E.steps[i - 1].at.w);
    }
  });

  it("names each block inside its face, on no more lines than the shortest face holds", () => {
    for (const step of E.steps) {
      expect(inside(step.name.at, step.at), step.key).toBe(true);
      expect(linesIn(step.name.text, 26, step.name.at.w) * LABEL_LINE, step.key).toBeLessThanOrEqual(step.name.at.h);
    }
  });

  it("points the arrow up the stair's left, beside the tallest block, its label over its head", () => {
    expect(E.arrow.y1).toBeLessThan(E.arrow.y0);
    expect(E.arrow.x + 12).toBeLessThan(E.steps[0].at.x);
    expect(bottom(label(E.arrow.label.at, E.arrow.label.text))).toBeLessThan(E.arrow.y1);
  });

  it("drops the post onto the top block, its tick on it and its label clear of the next block's top", () => {
    expect(bottom(E.post.at)).toBe(E.steps[0].at.y);
    expect(E.post.drop).toBeLessThan(0);
    expect(E.post.at.x).toBeGreaterThan(E.steps[0].at.x);
    expect(E.tick.at.x).toBe(E.post.at.x + E.post.at.w / 2);
    const list = label(E.list.at, E.list.text, "start");
    expect(bottom(list)).toBeLessThan(E.steps[0].at.y);
    expect(list.x + list.w).toBeLessThan(E.steps[2].at.x);
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
      for (const words of [a.name, a.caption]) expect(wordsWidth(words, 26) * 0.95, words).toBeLessThanOrEqual(a.at.w);
    }
  });
});

describe("slide 8, the three incidents", () => {
  it("spans the band with three 480 px cards and two 144 px gaps, the text inset 32 px", () => {
    expect(I.cards).toHaveLength(3);
    expect(I.cards[0].at.x).toBe(STORY.x);
    expect(I.cards[2].at.x + I.cards[2].at.w).toBe(STORY.x + STORY.w);
    for (const card of I.cards) {
      expect(card.at.w, card.key).toBe(480);
      expect(card.name.at.x - card.at.x, card.key).toBe(32);
      expect(card.at.x + card.at.w - (card.name.at.x + card.name.at.w), card.key).toBe(32);
      expect(card.name.at.y - (card.band.y + card.band.h), card.key).toBe(32);
    }
    for (let i = 1; i < I.cards.length; i++) expect(I.cards[i].at.x - (I.cards[i - 1].at.x + I.cards[i - 1].at.w)).toBe(144);
  });

  it("sets each card's name on one line, its line and its tag inside it, the tag at the foot and clear of the line", () => {
    for (const card of I.cards) {
      for (const part of [card.name.at, card.what.at, card.tag.at]) expect(inside(part, card.at), card.key).toBe(true);
      expect(wordsWidth(card.name.text, 48) * 0.85, card.name.text).toBeLessThanOrEqual(card.name.at.w);
      expect(linesIn(card.what.text, 26, card.what.at.w) * LABEL_LINE, card.what.text).toBeLessThanOrEqual(card.what.at.h);
      expect(card.tag.at.y, card.key).toBeGreaterThan(bottom(card.what.at));
      expect(linesIn(card.tag.text, 24, card.tag.at.w - 24) * TAG_LINE + 2 * INNER.tagPad, card.tag.text).toBeLessThanOrEqual(card.tag.at.h);
    }
  });

  it("draws one line under all three, across the stage, its words under it", () => {
    for (const card of I.cards) expect(I.line.y, card.key).toBeGreaterThan(bottom(card.at));
    expect(I.line.x0).toBeLessThanOrEqual(I.cards[0].at.x);
    expect(I.line.x1).toBeGreaterThanOrEqual(I.cards[2].at.x + I.cards[2].at.w);
    expect(I.label.at.y).toBeGreaterThan(I.line.y);
    expect(I.label.at.h).toBe(TEXT_LINE);
  });
});
