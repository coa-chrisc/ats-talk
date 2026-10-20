/**
 * Where the method world's slides put things: every drawing under its story
 * band and inside the frame's safe area, and on each slide the parts that
 * must not meet kept apart.
 */
import { describe, expect, it } from "vitest";
import { AGENT_R, STORY, box, type Box, type Point } from "@/components/deck/kit";
import { CARD, LABEL_LINE, TAG, TEXT_LINE, contentTop, wordsWidth } from "./layout";
import { GOOD_IDEAS, LIFTED, heldBox } from "./layout-good-ideas";
import { FIGURE, LISTEN } from "./layout-listen";
import { PLAIN_TOOL } from "./layout-plain-tool";
import { DOT_R, SORT } from "./layout-sort";
import { UNDERNEATH } from "./layout-underneath";
import { bandFoot, bottom, bounds, inside, overlaps, ringBox, wordsBox } from "./harness";

/** Clear of the frame's chrome: under the logo, over the footer and the slide number, inside the story band's width. */
const SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w };
/** The room a drawing keeps from the story band's foot and from the footer's top, so neither reads as part of the other. */
const ROOM = 40;

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);

/** The hand's reach about its grip (parts-cards.tsx): its thumb to the left, its sleeve to the right. */
const handAt = (grip: Point): Box => box(grip.x - 56, grip.y - 48, 214, 112);
/** A chair and the figure seated in it, upright about its seat point. */
const seatBox = (at: Point): Box => box(at.x - FIGURE.w / 2, at.y - FIGURE.h / 2, FIGURE.w, FIGURE.h);

const G = GOOD_IDEAS;
const L = LISTEN;
const U = UNDERNEATH;
const S = SORT;
const P = PLAIN_TOOL;

const heldGrip = { x: G.hand.grip.x + G.hand.carry.x, y: G.hand.grip.y + G.hand.carry.y };

/** What each slide draws under its story band, at the end of its click and on the way. */
const DRAWN: Record<string, Box[]> = {
  "good-ideas": [label(G.name.at, G.name.text, "start"), G.wall.at, ...G.tags.map((tag) => tag.at), heldBox(), handAt(G.hand.grip), handAt(heldGrip), handAt({ x: G.hand.grip.x + G.hand.reach, y: G.hand.grip.y })],
  listen: [
    ...L.seats.map((seat) => seatBox(seat.at)),
    ringBox(L.table.c, L.table.r),
    label(L.name.at, L.name.text),
    ...L.bubbles.map((bubble) => bubble.at),
    ...L.bubbles.flatMap((bubble) => (bubble.tail ? [box(bubble.tail.tip.x, bubble.tail.tip.y, 0, 0)] : [])),
    L.page.at,
    box(L.page.at.x, L.page.at.y - 14, L.page.at.w, 26),
  ],
  underneath: U.cards.flatMap((card) => [card.at, { ...card.at, y: card.at.y + card.lift }, ...card.layers.map((layer) => layer.at), text(card.verdict.at, card.verdict.text)]),
  sort: [
    S.wall.at,
    S.chart.at,
    ...S.cards.map((card) => ringBox(card.dot.at, DOT_R)),
    // The side's name, turned up the side.
    wordsBox(S.chart.impact.at, LABEL_LINE, wordsWidth(S.chart.impact.text, 26), "middle"),
    label(S.chart.feasibility.at, S.chart.feasibility.text, "start"),
    text(S.start.at, S.start.text, "start"),
  ],
  "plain-tool": [
    ...[P.months, P.days].flatMap((bar) => [bar.at, label(bar.name.at, bar.name.text, "start")]),
    ...P.tools.flatMap((tool) => [tool.at, label(tool.name.at, tool.name.text, "start")]),
    P.team.person.at,
    ...P.team.agents.map((agent) => ringBox(agent.at, AGENT_R)),
    label(P.team.name.at, P.team.name.text, "start"),
  ],
};

describe("the method world's layout", () => {
  it("starts every slide's drawing well under its story band, where the layout says drawing starts", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      expect(contentTop(pictureId), pictureId).toBeGreaterThanOrEqual(bandFoot(pictureId) + ROOM);
      expect(Math.min(...boxes.map((b) => b.y)), pictureId).toBeGreaterThanOrEqual(contentTop(pictureId));
    }
  });

  it("ends every slide's drawing well over the footer", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) expect(bottom(bounds(boxes)), pictureId).toBeLessThanOrEqual(SAFE.bottom - ROOM);
  });

  it("keeps every slide's drawing clear of the footer, the slide number and the stage's edges", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      const all = bounds(boxes);
      expect(all.y, pictureId).toBeGreaterThanOrEqual(SAFE.top);
      expect(bottom(all), pictureId).toBeLessThanOrEqual(SAFE.bottom);
      expect(all.x, pictureId).toBeGreaterThanOrEqual(SAFE.left);
      expect(all.x + all.w, pictureId).toBeLessThanOrEqual(SAFE.right);
    }
  });
});

describe("slide 13", () => {
  it("hangs a dozen cards on the wall, inside it and none on another", () => {
    expect(G.cards).toHaveLength(12);
    for (const card of G.cards) expect(inside(card.at, G.wall.at), card.key).toBe(true);
    for (const a of G.cards) for (const b of G.cards) if (a !== b) expect(overlaps(a.at, b.at), `${a.key} ${b.key}`).toBe(false);
  });

  it("brings the cards in waves, each bigger than the last, the lifted card first", () => {
    expect(G.waves.flat().sort((a, b) => a - b)).toEqual(G.cards.map((_, n) => n));
    expect(G.waves[0]).toEqual([LIFTED]);
    for (let w = 1; w < G.waves.length; w++) expect(G.waves[w].length).toBeGreaterThan(G.waves[w - 1].length);
  });

  it("tags four cards, none the lifted one, each tag inside its own card's edges and its words inside the tag", () => {
    expect(G.tags).toHaveLength(4);
    for (const tag of G.tags) {
      const card = G.cards[tag.card].at;
      expect(tag.card).not.toBe(LIFTED);
      // A card hangs a degree or two off true, and its tag turns with it: a margin of 8 keeps the tag on its face.
      expect(inside(tag.at, box(card.x + 8, card.y + 8, card.w - 16, card.h - 16)), tag.text).toBe(true);
      expect(tag.at.h).toBe(TAG.h);
      expect(tag.at.w, tag.text).toBeGreaterThanOrEqual(TAG.point + TAG.gap + wordsWidth(tag.text, TAG.size) + TAG.pad);
    }
  });

  it("holds the lifted card up in the open stage right of the wall, the hand at its edge", () => {
    const held = heldBox();
    expect(held.x).toBeGreaterThan(G.wall.at.x + G.wall.at.w + 40);
    expect(held.w).toBeGreaterThan(CARD.w);
    expect(heldGrip.x).toBeCloseTo(held.x + held.w, 6);
    expect(heldGrip.y).toBeCloseTo(held.y + held.h / 2, 6);
    expect(G.hand.grip.x).toBe(G.cards[LIFTED].at.x + CARD.w);
  });

  it("names the wall once, inside the wall at its top, over the cards and well clear of the story band", () => {
    const name = label(G.name.at, G.name.text, "start");
    expect(inside(name, G.wall.at)).toBe(true);
    for (const card of G.cards) expect(bottom(name), card.key).toBeLessThan(card.at.y);
    expect(name.y).toBeGreaterThanOrEqual(bandFoot("good-ideas") + ROOM);
  });
});

describe("slide 14", () => {
  it("sets eight seated figures round the table, none on it, on another or on the name", () => {
    expect(L.seats).toHaveLength(8);
    /** The nearest a seat's box comes to the table's middle. */
    const nearest = (b: Box) => Math.hypot(Math.max(b.x - L.table.c.x, 0, L.table.c.x - (b.x + b.w)), Math.max(b.y - L.table.c.y, 0, L.table.c.y - bottom(b)));
    for (const seat of L.seats) expect(nearest(seatBox(seat.at)), seat.key).toBeGreaterThan(L.table.r + 2);
    for (const a of L.seats) for (const b of L.seats) if (a !== b) expect(overlaps(seatBox(a.at), seatBox(b.at)), `${a.key} ${b.key}`).toBe(false);
    for (const seat of L.seats) expect(overlaps(label(L.name.at, L.name.text), seatBox(seat.at)), seat.key).toBe(false);
  });

  it("draws each figure as a head over shoulders inside its chair's box", () => {
    expect(FIGURE.head.y - FIGURE.head.r).toBeGreaterThan(-FIGURE.h / 2);
    expect(FIGURE.head.y + FIGURE.head.r).toBeLessThan(FIGURE.shoulders.top);
    expect(FIGURE.shoulders.w).toBeLessThanOrEqual(FIGURE.w);
    expect(FIGURE.shoulders.foot).toBeLessThanOrEqual(FIGURE.h / 2);
  });

  it("names the figures once, centred over the table and clear of the top seat", () => {
    const name = label(L.name.at, L.name.text);
    expect(L.name.at.x).toBe(L.table.c.x);
    expect(bottom(name)).toBeLessThan(Math.min(...L.seats.map((seat) => seatBox(seat.at).y)) - 16);
  });

  it("stands the five questions in one column at the stage's left, in the order they are asked, their words inside and apart", () => {
    expect(L.bubbles.map((bubble) => bubble.text)).toEqual(["Where is work slow?", "Where could you do more?", "What tools or processes are broken?", "What are your strategic goals?", "What are the goals of our residents?"]);
    for (const bubble of L.bubbles) {
      expect(bubble.at.x, bubble.text).toBe(L.bubbles[0].at.x);
      expect(bubble.at.w, bubble.text).toBeGreaterThanOrEqual(wordsWidth(bubble.text, 32) + 40);
      expect(bubble.at.h, bubble.text).toBeGreaterThan(TEXT_LINE);
    }
    for (let i = 1; i < L.bubbles.length; i++) expect(L.bubbles[i].at.y, L.bubbles[i].key).toBeGreaterThanOrEqual(bottom(L.bubbles[i - 1].at) + 16);
  });

  it("gives only the last question, the one nearest the table, a tail, and keeps every bubble and the tail clear of the table, the chairs and the name", () => {
    expect(L.bubbles.map((bubble) => Boolean(bubble.tail))).toEqual([false, false, false, false, true]);
    const last = L.bubbles.at(-1)!;
    expect(last.tail!.tip.y).toBeGreaterThan(bottom(last.at));
    expect(last.tail!.tip.x).toBeLessThan(last.at.x + last.at.w);
    const room = [ringBox(L.table.c, L.table.r), ...L.seats.map((seat) => seatBox(seat.at)), label(L.name.at, L.name.text)];
    const right = Math.max(...L.bubbles.map((bubble) => bubble.at.x + bubble.at.w));
    expect(right + 80).toBeLessThan(Math.min(...room.map((b) => b.x)));
    for (const bubble of L.bubbles) for (const b of room) expect(overlaps(bubble.at, b), bubble.key).toBe(false);
  });

  it("keeps the page clear of the table, its heading and lines inside it", () => {
    expect(L.page.at.x).toBeGreaterThan(Math.max(...L.seats.map((seat) => seat.at.x)) + FIGURE.w / 2 + 80);
    for (const bubble of L.bubbles) expect(L.page.at.x, bubble.key).toBeGreaterThan(bubble.at.x + bubble.at.w + 80);
    expect(L.page.at.x).toBeGreaterThan(label(L.name.at, L.name.text).x + label(L.name.at, L.name.text).w);
    expect(inside(text(L.page.heading.at, L.page.heading.text, "start"), L.page.at)).toBe(true);
    for (const line of L.page.lines) expect(inside(line.at, L.page.at), line.key).toBe(true);
    expect(L.page.lines[0].at.y).toBeGreaterThan(L.page.rule.y);
  });
});

describe("slide 15", () => {
  it("stacks three layers under each card, bottom up in the script's order, apart", () => {
    for (const card of U.cards) {
      expect(card.layers.map((layer) => layer.text)).toEqual(U.cards[0].layers.map((layer) => layer.text));
      for (let i = 1; i < card.layers.length; i++) expect(bottom(card.layers[i].at)).toBeLessThan(card.layers[i - 1].at.y);
    }
  });

  it("sits each card on its stack's foot before it lifts, and lifts it clear of the stack", () => {
    for (const card of U.cards) {
      const sitting = { ...card.at, y: card.at.y + card.lift };
      expect(bottom(sitting)).toBe(bottom(card.layers[0].at));
      for (const layer of card.layers) expect(overlaps(card.at, layer.at), layer.key).toBe(false);
    }
  });

  it("puts each mark inside its layer's right end, clear of its name, and the verdict under the stack", () => {
    for (const card of U.cards) {
      for (const layer of card.layers) {
        expect(inside(ringBox(layer.mark.at, U.mark.r), layer.at), layer.key).toBe(true);
        expect(label(layer.name, layer.text, "start").x + wordsWidth(layer.text, 26)).toBeLessThan(layer.mark.at.x - U.mark.r);
      }
      expect(text(card.verdict.at, card.verdict.text).y).toBeGreaterThan(bottom(card.layers[0].at));
    }
  });

  it("keeps the two stacks apart", () => {
    const [a, b] = U.cards.map((card) => bounds([card.at, ...card.layers.map((layer) => layer.at), text(card.verdict.at, card.verdict.text)]));
    expect(a.x + a.w + 80).toBeLessThan(b.x);
  });
});

describe("slide 16", () => {
  const corner = S.corner.at;
  const inCorner = (p: Point) => p.x > corner.x + DOT_R && p.x < corner.x + corner.w - DOT_R && p.y > corner.y + DOT_R && p.y < corner.y + corner.h - DOT_R;
  const lower = (p: Point) => p.y > S.chart.at.y + S.chart.at.h / 2 + DOT_R;

  it("draws slide 13's wall again, the same cards and the same four tagged, inside the chart's room", () => {
    expect(S.cards.map((card) => card.tilt)).toEqual(G.cards.map((card) => card.tilt));
    expect(S.cards.flatMap((card, n) => (card.tag ? [n] : []))).toEqual(G.tags.map((tag) => tag.card).sort((a, b) => a - b));
    for (const card of S.cards) expect(inside(card.at, S.wall.at), card.key).toBe(true);
  });

  it("settles every dot inside the chart, the grey-tagged ones low and slide 13's lifted card top right, and none on another", () => {
    for (const card of S.cards) expect(inside(ringBox(card.dot.at, DOT_R), S.chart.at), card.dot.key).toBe(true);
    for (const card of S.cards.filter((entry) => entry.tagged)) expect(lower(card.dot.at), card.dot.key).toBe(true);
    expect(inCorner(S.cards[LIFTED].dot.at)).toBe(true);
    expect(S.cards.filter((card) => inCorner(card.dot.at)).length).toBeGreaterThanOrEqual(3);
    for (const a of S.cards) for (const b of S.cards) if (a !== b) expect(Math.hypot(a.dot.at.x - b.dot.at.x, a.dot.at.y - b.dot.at.y), `${a.key} ${b.key}`).toBeGreaterThan(3 * DOT_R);
  });

  it("makes the chart a square of the full room, centred on the stage", () => {
    expect(S.chart.at.w).toBe(S.chart.at.h);
    expect(S.chart.at.w).toBeGreaterThanOrEqual(400);
    expect(S.chart.at.x + S.chart.at.w / 2).toBe(960);
  });

  it("hangs every card, so every dot before it flies, clear of both axes and the upright quarter line", () => {
    const { x, y, w, h } = S.chart.at;
    for (const card of S.cards) {
      expect(Math.abs(card.centre.x - x), card.key).toBeGreaterThan(DOT_R + 24);
      expect(Math.abs(card.centre.y - (y + h)), card.key).toBeGreaterThan(DOT_R + 24);
      expect(Math.abs(card.centre.x - (x + w / 2)), card.key).toBeGreaterThan(DOT_R + 24);
    }
  });

  it("starts each dot at its card's middle", () => {
    for (const card of S.cards) {
      expect(card.dot.at.x + card.dot.from.x).toBeCloseTo(card.centre.x, 1);
      expect(card.dot.at.y + card.dot.from.y).toBeCloseTo(card.centre.y, 1);
    }
  });

  it("names the sides outside the chart, up the side and at the foot's far end, and the corner at its right", () => {
    expect(S.chart.impact.at.x + LABEL_LINE / 2).toBeLessThan(S.chart.at.x);
    expect(S.chart.impact.at.y).toBe(S.chart.at.y + S.chart.at.h / 2);
    expect(S.chart.feasibility.at.x).toBeGreaterThan(S.chart.at.x + S.chart.at.w);
    expect(S.chart.feasibility.at.y).toBe(bottom(S.chart.at));
    expect(S.start.at.x).toBeGreaterThan(S.chart.at.x + S.chart.at.w);
    expect(S.start.at.y).toBeCloseTo(corner.y + corner.h / 2, 6);
    expect(overlaps(text(S.start.at, S.start.text, "start"), label(S.chart.feasibility.at, S.chart.feasibility.text, "start"))).toBe(false);
  });
});

describe("slide 17", () => {
  it("sets the three tools in a row, apart, each named over it", () => {
    for (let i = 1; i < P.tools.length; i++) expect(P.tools[i].at.x).toBeGreaterThan(P.tools[i - 1].at.x + P.tools[i - 1].at.w + 20);
    for (const tool of P.tools) {
      const name = label(tool.name.at, tool.name.text, "start");
      expect(bottom(name)).toBeLessThanOrEqual(tool.at.y);
      expect(name.w).toBeLessThan(tool.at.w);
    }
  });

  it("draws the months bar across the stage's width and the days bar under it from the same edge, far shorter", () => {
    expect(P.months.at.x).toBe(STORY.x);
    expect(P.months.at.x + P.months.at.w).toBe(STORY.x + STORY.w);
    expect(P.days.at.x).toBe(P.months.at.x);
    expect(P.days.at.h).toBe(P.months.at.h);
    expect(P.days.at.y).toBeGreaterThanOrEqual(bottom(P.months.at) + 12);
    expect(P.days.at.w * 10).toBeLessThanOrEqual(P.months.at.w);
  });

  it("names each bar inside it, at its start", () => {
    for (const bar of [P.months, P.days]) {
      const name = label(bar.name.at, bar.name.text, "start");
      expect(inside(name, box(bar.at.x + 12, bar.at.y + 4, bar.at.w - 24, bar.at.h - 8)), bar.name.text).toBe(true);
    }
  });

  it("sets the bars over the tools, clear of their names", () => {
    for (const tool of P.tools) expect(label(tool.name.at, tool.name.text, "start").y, tool.key).toBeGreaterThanOrEqual(bottom(P.days.at) + 32);
  });

  it("stands the team beside the last tool, inside the tools' height, clear of the stage's edge", () => {
    const last = P.tools.at(-1)!.at;
    const team = bounds([P.team.person.at, ...P.team.agents.map((agent) => ringBox(agent.at, AGENT_R)), label(P.team.name.at, P.team.name.text, "start")]);
    expect(team.x).toBeGreaterThanOrEqual(last.x + last.w + 64);
    expect(team.y).toBeGreaterThanOrEqual(last.y);
    expect(bottom(team)).toBeLessThanOrEqual(bottom(last));
    expect(team.x + team.w).toBeLessThanOrEqual(STORY.x + STORY.w);
  });

  it("names the team once, under it, from the person's left", () => {
    const name = label(P.team.name.at, P.team.name.text, "start");
    expect(P.team.name.at.x).toBe(P.team.person.at.x);
    expect(name.y).toBeGreaterThan(bottom(P.team.person.at));
    for (const agent of P.team.agents) expect(name.y).toBeGreaterThan(agent.at.y + AGENT_R);
  });
});
