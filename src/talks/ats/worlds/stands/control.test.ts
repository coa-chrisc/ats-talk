/**
 * Where slide 11a puts things: the post and its closed gate, the paths worn
 * round it, the gauge under them, and on the right the stair with its
 * climber and eye and the indigo figure. The world's other slides are in
 * layout.test.ts.
 */
import { describe, expect, it } from "vitest";
import { box, type Point } from "@/components/deck/kit";
import { DRAW_FOOT, LABEL_LINE, SAFE, TEXT_LINE, wordsWidth } from "./layout";
import { BIG, CAPTION_PITCH, CLIMBER, CONTROL, EYE, GATE, GAUGE, GAUGE_FIGURE, NEEDLE_TURN } from "./layout-control";
import { TRACK } from "./layout-track";
import { bottom, bounds, right, wordsBox } from "./harness";

const label = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(text, 26), LABEL_LINE, anchor);
const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
const big = (at: Point, words: string, size: number) => box(at.x, at.y - Math.ceil(size * 0.72), Math.ceil(words.length * size * 0.56), Math.ceil(size * 0.72) + 8);
const bigRows = (at: Point, rows: readonly string[], size: number, pitch: number) => {
  const w = Math.max(...rows.map((row) => Math.ceil(row.length * size * 0.56)));
  return box(at.x - w, at.y - size / 2, w, pitch * (rows.length - 1) + size);
};
const T = TRACK;
const C = CONTROL;
const pathBox = (path: (typeof C.paths)[number]) => {
  const nums = [...path.d.matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  return box(Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
};
const eyeBox = box(C.eye.at.x - EYE.w / 2, C.eye.at.y - EYE.h / 2, EYE.w, EYE.h);
const captionRows = C.gauge.caption.rows.map((words, i) => ({ text: words, at: { x: C.gauge.caption.at.x, y: C.gauge.caption.at.y + i * CAPTION_PITCH } as Point }));

describe("slide 11a, the control", () => {
  const post = box(C.post.x, C.post.top, C.post.w, C.post.foot - C.post.top);
  const gauge = box(GAUGE.cx - GAUGE.r - GAUGE.band, GAUGE.cy - GAUGE.r - GAUGE.band / 2, 2 * (GAUGE.r + GAUGE.band), GAUGE.r + GAUGE.band / 2 + GAUGE.hub);
  const stair = bounds(C.stair.steps.map((step) => step.at));
  const figure = bigRows(C.big.at, C.big.rows, BIG.size, BIG.pitch);
  const shadow = bounds([text(C.shadow.at, C.shadow.text, "start"), label(C.shadow.caption.at, C.shadow.caption.text, "start")]);

  it("draws the post as slide 11 does, its tick on its cap and its name to its right, clear of the gate", () => {
    expect([C.post.w, C.post.tick.r]).toEqual([T.post.w, T.post.tick.r]);
    expect(C.post.tick.at.y - C.post.top).toBe(T.post.tick.at.y - T.post.top);
    const name = text(C.post.name.at, C.post.name.text, "start");
    expect(name.x).toBeGreaterThan(right(post) + 16);
    expect(bottom(name)).toBeLessThan(C.gate.latch.top);
  });

  it("hangs the closed gate from the post on the ground line, ended by its latch post", () => {
    expect(C.gate.at.x).toBe(right(post));
    expect(C.gate.at.w).toBe(GATE.w);
    expect(bottom(C.gate.at)).toBe(C.ground.y - GATE.lift);
    expect(C.gate.latch.x).toBe(right(C.gate.at));
    expect(C.gate.latch.foot).toBe(C.ground.y);
    expect(C.post.foot).toBe(C.ground.y);
    expect(C.ground.x1).toBeGreaterThan(C.gate.latch.x + C.gate.latch.w);
  });

  it("wears three paths from in front of the gate round the post's end of the fence and off the stage's left edge, named beside where they start", () => {
    expect(C.paths).toHaveLength(3);
    for (const path of C.paths) {
      expect(path.from.y, path.key).toBeGreaterThan(C.ground.y);
      expect(path.from.x, path.key).toBeGreaterThan(C.gate.at.x + C.gate.at.w / 2);
      expect(path.leave.x, path.key).toBe(SAFE.left);
      expect(path.leave.y, path.key).toBeLessThan(C.ground.y);
      expect(path.d.endsWith(`${path.leave.x} ${path.leave.y}`), path.key).toBe(true);
      expect(bottom(pathBox(path)), path.key).toBeLessThan(gauge.y);
    }
    expect(shadow.x).toBeGreaterThan(Math.max(...C.paths.map((path) => path.from.x)) + 24);
    expect(shadow.x).toBeGreaterThan(C.ground.x1 + 24);
    expect(bottom(shadow)).toBeGreaterThan(C.ground.y);
    expect(right(shadow)).toBeLessThan(960);
  });

  it("hangs the gauge under the paths, its figure and three-row caption to its right, short of the middle line; its needle turns 0.69 of the half circle", () => {
    const fig = big(C.gauge.figure.at, C.gauge.figure.text, GAUGE_FIGURE);
    expect(fig.x).toBeGreaterThan(right(gauge) + 16);
    expect(fig.y).toBeGreaterThan(bottom(shadow));
    expect(C.gauge.caption.rows).toHaveLength(3);
    expect(C.gauge.caption.rows.join(" ")).toBe(C.gauge.caption.text);
    const rows = captionRows.map((row) => label(row.at, row.text, "start"));
    expect(rows[0].y).toBeGreaterThan(bottom(fig) - 8);
    for (let i = 1; i < rows.length; i++) expect(rows[i].y).toBeGreaterThanOrEqual(bottom(rows[i - 1]));
    expect(NEEDLE_TURN).toBeCloseTo(0.69 * 180, 1);
    for (const row of rows) expect(right(row)).toBeLessThan(960);
  });

  it("climbs the stair left to right at the right half, named over it, the climber standing on the first step and going to the second", () => {
    expect(stair.x).toBe(960);
    for (let i = 1; i < C.stair.steps.length; i++) {
      expect(C.stair.steps[i].at.y).toBeLessThan(C.stair.steps[i - 1].at.y);
      expect(C.stair.steps[i].at.x).toBe(right(C.stair.steps[i - 1].at));
    }
    expect(bottom(label(C.stair.caption.at, C.stair.caption.text, "start"))).toBeLessThan(eyeBox.y);
    const [first, second] = C.stair.steps.map((step) => step.at);
    expect(C.climber.at.y).toBe(first.y);
    expect(C.climber.to.y).toBe(second.y);
    expect(Math.abs(C.climber.at.x - (first.x + first.w / 2))).toBeLessThan(1);
    expect(Math.abs(C.climber.to.x - (second.x + second.w / 2))).toBeLessThan(1);
    expect(CLIMBER.w).toBeLessThan(first.w / 2);
  });

  it("settles the eye over the stair, clear of the climber where it ends and of the top step, named to its right", () => {
    expect(eyeBox.x).toBeGreaterThan(stair.x);
    expect(right(eyeBox)).toBeLessThan(right(stair));
    expect(bottom(eyeBox)).toBeLessThan(C.climber.to.y - CLIMBER.h);
    expect(bottom(eyeBox)).toBeLessThan(C.stair.steps[2].at.y);
    const name = text(C.eye.name.at, C.eye.name.text, "start");
    expect(name.x).toBeGreaterThan(right(eyeBox) + 16);
    expect(bottom(name)).toBeLessThan(C.stair.steps[2].at.y);
  });

  it("sets the indigo figure on two rows beside the stair at the right edge, its caption on two rows under it, clear of the eye's name", () => {
    expect(C.big.rows).toHaveLength(2);
    expect(C.big.rows.join(" ")).toBe(C.big.text);
    expect(figure.x).toBeGreaterThan(right(stair) + 24);
    expect(right(figure)).toBe(SAFE.right - 16);
    expect(figure.y).toBeGreaterThan(bottom(text(C.eye.name.at, C.eye.name.text, "start")) + 24);
    expect(C.big.caption.rows).toHaveLength(2);
    expect(C.big.caption.rows.join(" ")).toBe(C.big.caption.text);
    const caption = bounds(C.big.caption.rows.map((row, i) => label({ x: C.big.caption.at.x, y: C.big.caption.at.y + i * CAPTION_PITCH }, row, "end")));
    expect(caption.y).toBeGreaterThan(bottom(figure) - 8);
    expect(caption.x).toBeGreaterThan(right(stair) + 24);
    expect(bottom(caption)).toBeLessThanOrEqual(DRAW_FOOT);
  });
});
