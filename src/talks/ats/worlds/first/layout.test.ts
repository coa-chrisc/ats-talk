/**
 * Where the first world's slides put things: every drawing under its story
 * band and inside the frame's safe area, and on each slide the parts that
 * must not meet kept apart.
 */
import { STORY, box, type Box, type Point } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { bandFoot, bottom, bounds, inside, overlaps, ringBox, wordsBox } from "./harness";
import { LABEL_LINE, TEXT_LINE, centreOf, contentTop, wordsWidth } from "./layout";
import { GRID as MAP, LIT, MAP_AT, WINDOW } from "../department-map";
import { FLEET } from "../stands/layout-fleet";
import { AISLE, CONSORTIUM, SEAT_10, WALKER } from "./layout-consortium";
import { LISTEN, SITTER } from "./layout-listen";
import { CHAIR_9, NOT_PROPOSING } from "./layout-not-proposing";
import { MEMBER, PROGRAM_TEAM, SEAT_18 } from "./layout-program-team";
import { DOT_R, LIST_BOX, SORT } from "./layout-sort";

/** Clear of the frame's chrome: under the wordmark, over the footer and the slide number, inside the story band's width. */
const SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w };
/** The room a drawing keeps from the story band's foot. */
const ROOM = 20;

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
/** A chair's reach about its middle, whichever way it is turned. */
const chairBox = (at: Point, size: { w: number }, scale = 1): Box => ringBox(at, (size.w / 2) * scale);

const N = NOT_PROPOSING;
const P = CONSORTIUM;
const L = LISTEN;
const S = SORT;
const T = PROGRAM_TEAM;

/** What each slide draws under its story band, at the end of its click and on the way. */
const DRAWN: Record<string, Box[]> = {
  "not-proposing": [
    ...N.outlines.map((outline) => box(outline.at.x - 4, outline.at.y - 4, outline.at.w + 8, outline.at.h + 8)),
    ...N.table.chairs.map((chair) => chairBox(chair.at, CHAIR_9)),
    text(N.table.name.at, N.table.name.text),
    box(N.calendar.at.x, N.calendar.at.y - 14, N.calendar.at.w, N.calendar.at.h + 14),
    text(N.calendar.name.at, N.calendar.name.text),
    N.tag.at,
    label(N.tag.caption.at, N.tag.caption.text),
  ],
  consortium: [
    ...P.boxes.map((b) => b.at),
    ...P.boxes.map((b) => b.window.at),
    ...P.table.seats.map((seat) => chairBox(seat.at, SEAT_10, seat.leading ? SEAT_10.grow : 1)),
    label(P.caption.at, P.caption.text),
    P.card.at,
    { ...P.card.at, x: P.card.at.x + P.card.travel },
  ],
  "program-team": [
    ...T.table.seats.map((seat) => chairBox(seat.at, SEAT_18, seat.leading ? SEAT_18.grow : 1)),
    ...T.members.flatMap((member) => [member.at, member.home]),
    T.box.at,
    text(T.box.name.at, T.box.name.text),
    T.plate.at,
    ...T.tiles.map((tile) => tile.at),
    T.yard.reach,
    label(T.yard.caption.at, T.yard.caption.text),
    T.dept.at,
    label(T.line.caption.at, T.line.caption.text),
  ],
  listen: [
    ...L.tables.flatMap((table) => [...table.seats.map((seat) => chairBox(seat.at, SITTER.chair)), label(table.name.at, table.name.text), ...table.bubbles.map((bubble) => bubble.at)]),
    box(L.page.at.x, L.page.at.y - 14, L.page.at.w, L.page.at.h + 14),
  ],
  sort: [
    S.chart.at,
    wordsBox(S.chart.value.at, TEXT_LINE, wordsWidth(S.chart.value.text, 32), "middle"),
    text(S.chart.readiness.at, S.chart.readiness.text, "start"),
    ...S.dots.flatMap((dot) => [ringBox(dot.at, DOT_R), ringBox(dot.start, DOT_R)]),
    ...S.list.flatMap((row) => [row.check, text(row.words, row.text, "start")]),
  ],
};

describe("the first world's layout", () => {
  it("starts every slide's drawing under its story band, where the layout says drawing starts", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      expect(contentTop(pictureId), pictureId).toBeGreaterThanOrEqual(bandFoot(pictureId) + ROOM);
      expect(Math.min(...boxes.map((b) => b.y)), pictureId).toBeGreaterThanOrEqual(contentTop(pictureId));
    }
  });

  it("keeps every slide's drawing clear of the footer, the slide number and the stage's edges", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      const all = bounds(boxes);
      expect(all.y, pictureId).toBeGreaterThanOrEqual(SAFE.top);
      expect(bottom(all), pictureId).toBeLessThanOrEqual(SAFE.bottom - ROOM);
      expect(all.x, pictureId).toBeGreaterThanOrEqual(SAFE.left);
      expect(all.x + all.w, pictureId).toBeLessThanOrEqual(SAFE.right);
    }
  });
});

describe("slide 16", () => {
  it("sets the three outlines in one row across the band, apart, in the script's order", () => {
    expect(N.outlines.map((outline) => outline.text)).toEqual(["An agent platform", "A new organization", "Roll out agents citywide"]);
    for (let i = 1; i < N.outlines.length; i++) expect(N.outlines[i].at.x).toBeGreaterThan(N.outlines[i - 1].at.x + N.outlines[i - 1].at.w + 40);
    for (const outline of N.outlines) expect(outline.at.y).toBe(N.outlines[0].at.y);
  });

  it("crosses each outline with two strokes inside it", () => {
    for (const outline of N.outlines) {
      expect(outline.cross.strokes).toHaveLength(2);
      for (const stroke of outline.cross.strokes) {
        const [x0, y0, x1, y1] = stroke.d.match(/[\d.]+/g)!.map(Number);
        for (const [x, y] of [
          [x0, y0],
          [x1, y1],
        ])
          expect(inside(box(x, y, 0, 0), outline.at), stroke.key).toBe(true);
      }
    }
  });

  it("keeps each outline 150 px tall, its name inside it", () => {
    for (const outline of N.outlines) {
      expect(outline.at.h).toBe(150);
      expect(inside(text(outline.name.at, outline.text), outline.at), outline.text).toBe(true);
    }
  });

  it("sets the real steps in a second row, at least 56 px under the outlines, nothing overlapping them", () => {
    const outlinesFoot = Math.max(...N.outlines.map((outline) => bottom(outline.at) + 4));
    const below = [
      ...N.table.chairs.map((chair) => chairBox(chair.at, CHAIR_9)),
      box(N.calendar.at.x, N.calendar.at.y - 14, N.calendar.at.w, N.calendar.at.h + 14),
      text(N.table.name.at, N.table.name.text),
      text(N.calendar.name.at, N.calendar.name.text),
      N.tag.at,
      label(N.tag.caption.at, N.tag.caption.text),
    ];
    expect(Math.min(...below.map((b) => b.y))).toBeGreaterThanOrEqual(outlinesFoot + 56);
  });

  it("puts the table and calendar side by side left of centre, and the tag at the right, apart", () => {
    for (const chair of N.table.chairs) expect(overlaps(chairBox(chair.at, CHAIR_9), N.calendar.at), chair.key).toBe(false);
    expect(N.calendar.at.x + N.calendar.at.w).toBeLessThan(960);
    expect(N.table.name.at.y).toBe(N.calendar.name.at.y);
    const lowest = Math.max(...N.table.chairs.map((chair) => bottom(chairBox(chair.at, CHAIR_9))));
    expect(text(N.table.name.at, N.table.name.text).y).toBeGreaterThan(lowest);
    expect(text(N.calendar.name.at, N.calendar.name.text).y).toBeGreaterThanOrEqual(bottom(N.calendar.at));
    const tag = bounds([N.tag.at, label(N.tag.caption.at, N.tag.caption.text)]);
    expect(tag.x).toBeGreaterThan(N.calendar.at.x + N.calendar.at.w + 200);
  });

  it("sets the tag's words inside it, past its point", () => {
    const words = text(N.tag.words, N.tag.text, "start");
    expect(words.x + words.w).toBeLessThanOrEqual(N.tag.at.x + N.tag.at.w);
    expect(words.x).toBeGreaterThan(N.tag.at.x + 30);
  });
});

describe("slide 17", () => {
  it("draws the department map's 21 boxes, four columns left and three right of an aisle down the stage's middle, none on another", () => {
    expect(P.boxes).toHaveLength(MAP.cols * MAP.rows);
    expect((AISLE.x0 + AISLE.x1) / 2).toBe(960);
    for (const a of P.boxes) for (const b of P.boxes) if (a !== b) expect(overlaps(a.at, b.at), `${a.key} ${b.key}`).toBe(false);
    for (const b of P.boxes) expect(b.at.x + b.at.w <= AISLE.x0 || b.at.x >= AISLE.x1, b.key).toBe(true);
    expect(P.boxes.filter((b) => b.at.x + b.at.w <= AISLE.x0)).toHaveLength(4 * MAP.rows);
  });

  it("draws the boxes at the map's size, its left half where slides 11, 12 and 15 set the grid", () => {
    const left = P.boxes.filter((b) => b.column < 4);
    for (const b of P.boxes) expect([b.at.w, b.at.h], b.key).toEqual([MAP.box.w, MAP.box.h]);
    for (const b of left) {
      const cell = FLEET.map.cell(b.column, b.row);
      expect([b.at.x, b.at.y], b.key).toEqual([cell.x, cell.y]);
    }
    expect(Math.min(...P.boxes.map((b) => b.at.y))).toBe(MAP_AT.y);
  });

  it("lights, as the slide opens, the windows slide 12 left lit: the six named full, the three unnamed faint", () => {
    const at = (cells: readonly (readonly number[])[]) => cells.map(([col, row]) => P.boxes.find((b) => b.column === col && b.row === row)!);
    for (const b of at(LIT.named)) expect([b.early, b.window.lit, b.walker !== null], b.key).toEqual([true, 1, true]);
    for (const b of at(LIT.unnamed)) {
      expect([b.early, b.window.lit, b.walker], b.key).toEqual([true, WINDOW.faint, null]);
      expect(b.window.at.w).toBeLessThan(at(LIT.named)[0].window.at.w);
    }
    expect(P.early).toHaveLength(LIT.named.length + LIT.unnamed.length);
  });

  it("sets each window inside its box, a person beside it, apart", () => {
    for (const b of P.boxes) {
      const window = b.window.at;
      expect(inside(window, b.at), b.key).toBe(true);
      if (b.walker) {
        expect(inside(b.walker.home, b.at), b.key).toBe(true);
        expect(overlaps(b.walker.home, window), b.key).toBe(false);
      }
    }
  });

  it("puts the table in the aisle, its chairs clear of its edge and the chairs and caption clear of every box", () => {
    for (const seat of P.table.seats) expect(Math.hypot(seat.at.x - P.table.c.x, seat.at.y - P.table.c.y) - (SEAT_10.w / 2) * (seat.leading ? SEAT_10.grow : 1), seat.key).toBeGreaterThan(P.table.r);
    const room = [ringBox(P.table.c, P.table.r), ...P.table.seats.map((seat) => chairBox(seat.at, SEAT_10, seat.leading ? SEAT_10.grow : 1)), label(P.caption.at, P.caption.text)];
    for (const b of room) {
      expect(b.x, "aisle").toBeGreaterThan(AISLE.x0 + 20);
      expect(b.x + b.w, "aisle").toBeLessThan(AISLE.x1 - 20);
    }
    for (const a of P.table.seats) for (const b of P.table.seats) if (a !== b) expect(overlaps(chairBox(a.at, SEAT_10, a.leading ? SEAT_10.grow : 1), chairBox(b.at, SEAT_10, b.leading ? SEAT_10.grow : 1)), `${a.key} ${b.key}`).toBe(false);
  });

  it("keeps the table's name inside its top", () => {
    const name = text(P.table.name.at, P.table.name.text);
    expect(name.w).toBeLessThan(2 * P.table.r - 8);
  });

  it("grows the three bottom chairs, and sets their caption under the middle one", () => {
    const leading = P.table.seats.filter((seat) => seat.leading);
    expect(leading).toHaveLength(3);
    for (const seat of leading) expect(seat.at.y).toBeGreaterThan(P.table.c.y + P.table.r);
    const caption = label(P.caption.at, P.caption.text);
    for (const seat of leading) expect(caption.y, seat.key).toBeGreaterThan(bottom(chairBox(seat.at, SEAT_10, SEAT_10.grow)) - 24);
    expect(P.caption.at.x).toBe(P.table.c.x);
  });

  it("seats each named or called box's person on its own chair, the led departments on the three that grow", () => {
    const walkers = P.boxes.flatMap((b) => (b.walker ? [b] : []));
    expect(walkers.length).toBe(P.table.seats.length);
    expect(new Set(walkers.map((b) => b.walker!.seat)).size).toBe(walkers.length);
    for (const b of walkers) {
      const seat = P.table.seats[b.walker!.seat];
      expect(b.walker!.at.x + WALKER.w / 2).toBeCloseTo(seat.at.x, 1);
      expect(b.walker!.at.y + WALKER.h / 2).toBeCloseTo(seat.at.y, 1);
      expect(b.walker!.at.x + b.walker!.from.x).toBeCloseTo(b.walker!.home.x, 1);
      expect(b.walker!.at.y + b.walker!.from.y).toBeCloseTo(b.walker!.home.y, 1);
      expect(seat.leading, b.key).toBe(b.led);
    }
  });

  it("leaves eight boxes dark, lit nine before the call and four as the card passes their column", () => {
    expect(P.boxes.filter((b) => !b.lit)).toHaveLength(8);
    expect(P.early).toHaveLength(9);
    expect(P.called).toHaveLength(4);
    for (const n of P.called) expect(P.boxes[n].walker, P.boxes[n].key).not.toBeNull();
    for (const n of P.called) expect(P.early.includes(n)).toBe(false);
    for (let i = 1; i < P.called.length; i++) expect(P.boxes[P.called[i]].column).toBeGreaterThanOrEqual(P.boxes[P.called[i - 1]].column);
  });

  it("slides the card across the middle row inside the band", () => {
    expect(P.card.at.x).toBe(STORY.x);
    expect(P.card.at.x + P.card.travel + P.card.at.w).toBe(STORY.x + STORY.w);
    expect(text({ x: P.card.at.x + P.card.at.w / 2, y: 0 }, P.card.text).w).toBeLessThan(P.card.at.w);
  });
});

describe("slide 18", () => {
  const seatBox = (seat: (typeof T.table.seats)[number]) => chairBox(seat.at, SEAT_18, seat.leading ? SEAT_18.grow : 1);
  const table = bounds([ringBox(T.table.c, T.table.r), ...T.table.seats.map(seatBox), ...T.members.map((member) => member.home)]);

  it("draws slide 17's table small at the left: ten chairs, the bottom three grown, a person at each, none on another", () => {
    expect(T.table.seats).toHaveLength(10);
    expect(T.table.seats.filter((seat) => seat.leading).every((seat) => seat.at.y > T.table.c.y + T.table.r)).toBe(true);
    for (const seat of T.table.seats) expect(Math.hypot(seat.at.x - T.table.c.x, seat.at.y - T.table.c.y) - (SEAT_18.w / 2) * (seat.leading ? SEAT_18.grow : 1), seat.key).toBeGreaterThan(T.table.r);
    for (const a of T.table.seats) for (const b of T.table.seats) if (a !== b) expect(overlaps(seatBox(a), seatBox(b)), `${a.key} ${b.key}`).toBe(false);
    for (const member of T.members) {
      const seat = T.table.seats[member.seat];
      expect(member.home.x + MEMBER.w / 2).toBeCloseTo(seat.at.x, 1);
      expect(member.home.y + MEMBER.h / 2).toBeCloseTo(seat.at.y, 1);
      expect(member.at.x + member.from.x).toBeCloseTo(member.home.x, 1);
      expect(member.at.y + member.from.y).toBeCloseTo(member.home.y, 1);
    }
    expect(table.x + table.w).toBeLessThan(T.box.at.x - 120);
  });

  it("stands the four who step out in a row inside the team's box, under its name, none of them from a grown chair, the plate under the first", () => {
    expect(T.team).toHaveLength(4);
    expect(T.stay).toHaveLength(6);
    const name = text(T.box.name.at, T.box.name.text);
    expect(inside(name, T.box.at)).toBe(true);
    for (const member of T.team) {
      expect(inside(member.at, T.box.at), member.key).toBe(true);
      expect(member.at.y, member.key).toBeGreaterThan(bottom(name));
      expect(T.table.seats[member.seat].leading, member.key).toBe(false);
    }
    for (let i = 1; i < T.team.length; i++) expect(T.team[i].at.x).toBeGreaterThan(T.team[i - 1].at.x + MEMBER.w + 40);
    expect(inside(T.plate.at, T.box.at)).toBe(true);
    expect(T.plate.at.y).toBeGreaterThan(bottom(T.team[0].at));
    expect(T.plate.at.x + T.plate.at.w / 2).toBeCloseTo(T.team[0].at.x + MEMBER.w / 2, 0);
    expect(label(centreOf(T.plate.at), T.plate.text).w).toBeLessThan(T.plate.at.w - 12);
  });

  it("hangs the three tiles under the box, the box's width between them, apart, each word inside its tile", () => {
    expect(T.tiles.map((tile) => tile.text)).toEqual(["Strategy", "Architecture", "Consulting"]);
    expect(T.tiles[0].at.x).toBe(T.box.at.x);
    expect(T.tiles[2].at.x + T.tiles[2].at.w).toBeCloseTo(T.box.at.x + T.box.at.w, 0);
    for (const tile of T.tiles) {
      expect(tile.at.y - bottom(T.box.at), tile.text).toBeGreaterThanOrEqual(12);
      expect(wordsWidth(tile.text, 26), tile.text).toBeLessThanOrEqual(tile.at.w - 4);
    }
    for (let i = 1; i < T.tiles.length; i++) expect(T.tiles[i].at.x - (T.tiles[i - 1].at.x + T.tiles[i - 1].at.w)).toBeGreaterThanOrEqual(16);
  });

  it("draws the small yard under the tiles, under the box's middle, its two people inside it and its caption under it", () => {
    const tilesFoot = Math.max(...T.tiles.map((tile) => bottom(tile.at)));
    expect(T.yard.reach.y).toBeGreaterThan(tilesFoot + 16);
    expect(bottom(T.yard.reach)).toBe(bottom(T.yard.at));
    expect(T.yard.at.x + T.yard.at.w / 2).toBe(T.box.at.x + T.box.at.w / 2);
    expect(T.yard.at.w).toBeLessThan(T.box.at.w);
    for (const person of T.yard.people) expect(inside(person.at, T.yard.at), person.key).toBe(true);
    expect(overlaps(T.yard.people[0].at, T.yard.people[1].at)).toBe(false);
    expect(label(T.yard.caption.at, T.yard.caption.text).y).toBeGreaterThan(bottom(T.yard.reach) + 8);
  });

  it("sets the departments at the right, level with the box, named inside, its staff under the name; the line from the box to it, its caption under the line between them", () => {
    expect(T.dept.at.x + T.dept.at.w).toBe(SAFE.right);
    expect(T.dept.at.y).toBe(T.box.at.y);
    expect(inside(text(T.dept.name.at, T.dept.name.text), T.dept.at)).toBe(true);
    for (const person of T.dept.staff) expect(inside(person.at, T.dept.at), person.key).toBe(true);
    expect(T.line.from.y).toBe(T.line.to.y);
    expect(T.line.from.x).toBeGreaterThanOrEqual(T.box.at.x + T.box.at.w);
    expect(T.line.to.x).toBeLessThanOrEqual(T.dept.at.x);
    expect(T.line.to.x - T.line.from.x).toBeGreaterThan(240);
    const caption = label(T.line.caption.at, T.line.caption.text);
    expect(caption.x).toBeGreaterThan(T.box.at.x + T.box.at.w);
    expect(caption.x + caption.w).toBeLessThan(T.dept.at.x);
    expect(caption.y).toBeGreaterThan(T.line.from.y + 8);
  });
});

describe("slide 19", () => {
  it("draws three tables side by side, apart, named in the script's order", () => {
    expect(L.tables.map((table) => table.name.text)).toEqual(["Department leaders", "Staff", "Community"]);
    const reach = (table: (typeof L.tables)[number]) => bounds([...table.seats.map((seat) => chairBox(seat.at, SITTER.chair)), label(table.name.at, table.name.text, "middle")]);
    for (let i = 1; i < L.tables.length; i++) expect(reach(L.tables[i]).x).toBeGreaterThan(reach(L.tables[i - 1]).x + reach(L.tables[i - 1]).w + 40);
    for (const table of L.tables) expect(table.c.y).toBe(L.tables[0].c.y);
  });

  it("draws each table about 220 px across with its chairs, six chairs round it, none on the table or on another", () => {
    for (const table of L.tables) {
      expect(table.seats).toHaveLength(6);
      const across = bounds(table.seats.map((seat) => chairBox(seat.at, SITTER.chair)));
      expect(across.w).toBeGreaterThanOrEqual(220);
      for (const seat of table.seats) expect(Math.hypot(seat.at.x - table.c.x, seat.at.y - table.c.y) - SITTER.chair.h / 2, seat.key).toBeGreaterThan(table.r + 4);
      for (const a of table.seats) for (const b of table.seats) if (a !== b) expect(overlaps(chairBox(a.at, SITTER.chair, 0.8), chairBox(b.at, SITTER.chair, 0.8)), `${a.key} ${b.key}`).toBe(false);
      for (const seat of table.seats) expect(SITTER.head, seat.key).toBeLessThan(SITTER.chair.h / 2);
    }
  });

  it("asks three questions over the first table and one over each of the others, in the script's order", () => {
    expect(L.tables.map((table) => table.bubbles.map((bubble) => bubble.text))).toEqual([
      ["Where does work slow down?", "What can you not do today?", "What do you want done by 2028?"],
      ["What worries you?"],
      ["How should the City use AI?"],
    ]);
  });

  it("stacks the first table's bubbles 12 px apart on one left edge, centres the others' over their tables, the lowest pointing down at its table, all apart", () => {
    const all = L.tables.flatMap((table) => table.bubbles);
    for (const a of all) for (const b of all) if (a !== b) expect(overlaps(a.at, b.at), `${a.key} ${b.key}`).toBe(false);
    const [first, ...others] = L.tables;
    for (const bubble of first.bubbles) expect(bubble.at.x, bubble.text).toBe(STORY.x);
    for (let i = 1; i < first.bubbles.length; i++) expect(first.bubbles[i].at.y - bottom(first.bubbles[i - 1].at)).toBe(12);
    for (const table of others) for (const bubble of table.bubbles) expect(bubble.at.x + bubble.at.w / 2).toBeCloseTo(table.c.x, 6);
    for (const table of L.tables) {
      const top = Math.min(...table.seats.map((seat) => chairBox(seat.at, SITTER.chair).y));
      for (const bubble of table.bubbles) expect(bubble.at.w, bubble.text).toBeGreaterThanOrEqual(wordsWidth(bubble.text, 26) + 20);
      const lowest = table.bubbles.at(-1)!;
      expect(lowest.tail).toBeDefined();
      expect(lowest.tail!.base).toBeGreaterThan(lowest.at.x + 14);
      expect(lowest.tail!.base + 20).toBeLessThan(lowest.at.x + lowest.at.w - 14);
      expect(lowest.tail!.tip.y).toBeLessThan(top);
      for (const bubble of table.bubbles.slice(0, -1)) expect(bubble.tail).toBeUndefined();
    }
  });

  it("makes the page as tall as the tables, their bubbles and names", () => {
    expect(L.page.at.y).toBeLessThanOrEqual(L.tables[0].bubbles[0].at.y + 16);
    expect(bottom(L.page.at)).toBe(bottom(label(L.tables[0].name.at, L.tables[0].name.text)));
  });

  it("keeps the page clear of the tables and the bubbles, its heading and lines inside it", () => {
    const left = Math.max(...L.tables.flatMap((table) => [...table.bubbles.map((bubble) => bubble.at.x + bubble.at.w), ...table.seats.map((seat) => seat.at.x + SITTER.chair.w)]));
    expect(L.page.at.x).toBeGreaterThan(left + 40);
    expect(inside(text(L.page.heading.at, L.page.heading.text, "start"), L.page.at)).toBe(true);
    for (const line of L.page.lines) {
      expect(inside(box(line.x0, line.y - 4, line.x1 - line.x0, 8), L.page.at), line.key).toBe(true);
      expect(line.y).toBeGreaterThan(L.page.rule.y);
    }
  });
});

describe("slide 20", () => {
  it("draws a large square chart, its four quarters named in the order they label themselves", () => {
    expect(S.chart.at.w).toBe(S.chart.at.h);
    expect(S.chart.at.w).toBeGreaterThanOrEqual(456);
    expect(S.quarters.map((quarter) => quarter.text)).toEqual(["Start here", "Prepare", "Experiment", "Defer"]);
    const [scale, prepare, experiment, defer] = S.quarters.map((quarter) => quarter.at);
    expect(scale.x).toBeGreaterThan(prepare.x);
    expect(scale.y).toBeLessThan(experiment.y);
    expect(defer.x).toBe(S.chart.at.x);
    expect(bottom(defer)).toBe(bottom(S.chart.at));
    expect(S.corner.at).toEqual(scale);
  });

  it("names each quarter inside its top, and the sides outside the chart", () => {
    for (const quarter of S.quarters) expect(inside(text(quarter.name, quarter.text), quarter.at), quarter.text).toBe(true);
    expect(S.chart.value.at.x + TEXT_LINE / 2).toBeLessThan(S.chart.at.x);
    expect(S.chart.value.at.y).toBe(S.chart.at.y + S.chart.at.h / 2);
    expect(S.chart.readiness.at.x).toBeGreaterThan(S.chart.at.x + S.chart.at.w);
    expect(bottom(text(S.chart.readiness.at, S.chart.readiness.text, "start"))).toBe(bottom(S.chart.at));
  });

  it("settles every dot inside the chart, clear of the middle lines, the quarters' names and each other, some in each quarter", () => {
    const mid = { x: S.chart.at.x + S.chart.at.w / 2, y: S.chart.at.y + S.chart.at.h / 2 };
    for (const dot of S.dots) {
      expect(inside(ringBox(dot.at, DOT_R), S.chart.at), dot.key).toBe(true);
      expect(Math.abs(dot.at.x - mid.x), dot.key).toBeGreaterThan(DOT_R + 4);
      expect(Math.abs(dot.at.y - mid.y), dot.key).toBeGreaterThan(DOT_R + 4);
      for (const quarter of S.quarters) expect(overlaps(ringBox(dot.at, DOT_R), text(quarter.name, quarter.text)), `${dot.key} ${quarter.text}`).toBe(false);
    }
    for (const a of S.dots) for (const b of S.dots) if (a !== b) expect(Math.hypot(a.at.x - b.at.x, a.at.y - b.at.y), `${a.key} ${b.key}`).toBeGreaterThan(2 * DOT_R + 8);
    for (const quarter of S.quarters) expect(S.dots.some((dot) => inside(ringBox(dot.at, DOT_R), quarter.at)), quarter.text).toBe(true);
  });

  it("starts every dot at the left of the chart, clear of the side's name", () => {
    const value = wordsBox(S.chart.value.at, TEXT_LINE, wordsWidth(S.chart.value.text, 32), "middle");
    for (const dot of S.dots) {
      expect(dot.start.x + DOT_R, dot.key).toBeLessThan(value.x - 20);
      expect(dot.at.x + dot.from.x).toBeCloseTo(dot.start.x, 1);
      expect(dot.at.y + dot.from.y).toBeCloseTo(dot.start.y, 1);
    }
  });

  it("sets the six tests beside the chart, in the script's order, at 32 px, apart, each with its tick in its box", () => {
    expect(S.list.map((row) => row.text)).toEqual(["Frequent decisions", "Measurable impact", "Delays in the current process", "Suitable data available", "Rules that can be written down", "Limited consequences of error"]);
    expect(S.list[0].check.x).toBeGreaterThan(text(S.chart.readiness.at, S.chart.readiness.text, "start").x + 120);
    for (let i = 1; i < S.list.length; i++) expect(S.list[i].check.y).toBeGreaterThan(bottom(text(S.list[i - 1].words, S.list[i - 1].text, "start")) - 8);
    for (const row of S.list) {
      expect(row.check.w).toBe(LIST_BOX);
      expect(inside(box(row.tick.at.x, row.tick.at.y, 0, 0), row.check)).toBe(true);
      expect(text(row.words, row.text, "start").x + wordsWidth(row.text, 32)).toBeLessThanOrEqual(SAFE.right);
    }
  });
});
