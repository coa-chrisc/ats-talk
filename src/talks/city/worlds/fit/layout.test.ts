/**
 * Where Part 4's drawings sit: under each white slide's story band and
 * inside the safe area, nothing on top of anything else, and each slide's
 * picture as They see it in the script: the scenes round the figure on
 * slide 22, the figure inside a dashed new box joined into the chart's row
 * on slide 23, the close set centred as slide 1 is.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CONTENT_TOP, STAGE, STORY, box, storyRows, type Box } from "@/components/deck/kit";
import { FLOOR, SAFE, STORIES, bounds, centreOf, contentTop, grow } from "./layout";
import { BLOCK_MIDDLE, CLOSE, OPENING } from "./layout-close";
import { CloseHtml } from "./scene-close";
import { FIT, MEMBER, ORG, PIECE, ROW } from "./layout-fit";
import { SCENE, WORK } from "./layout-work";

const bottom = (b: Box) => b.y + b.h;
const right = (b: Box) => b.x + b.w;
const apart = (a: Box, b: Box) => right(a) <= b.x || right(b) <= a.x || bottom(a) <= b.y || bottom(b) <= a.y;
const inside = (a: Box, b: Box) => a.x >= b.x && a.y >= b.y && right(a) <= right(b) && bottom(a) <= bottom(b);
const SAFE_BOX = box(SAFE.left, SAFE.top, SAFE.right - SAFE.left, SAFE.bottom - SAFE.top);

/** Where a white slide's story band ends: under its last row. */
const bandFoot = (pictureId: string) => {
  const band = STORIES.find((entry) => entry.picture === pictureId)!;
  return storyRows(band.band, band.lines.length).at(-1)!.y + STORY.pitch;
};

/** A label's words as set: 26 px type, about 15 px a character, centred in its row. */
const wordsBox = (label: { at: Box; text: string }) => {
  const w = label.text.length * 15;
  return box(label.at.x + (label.at.w - w) / 2, label.at.y, w, label.at.h);
};

const scenes = WORK.scenes.map((scene) => bounds([scene.at, wordsBox(scene.label)]));
const chart = bounds([ORG.head.at, ...ORG.units.map((unit) => unit.at), FIT.role.at]);

/** What each white slide draws under its band. */
const DRAWN: Record<string, Box[]> = {
  "my-work": [WORK.figure.at, ...scenes],
  fit: [chart, FIT.figure.at, ...FIT.pieces.map((piece) => piece.at)],
};

describe("the white slides' drawings", () => {
  it("start 32 px lower than the kit's line under a band of three rows, the room the reviewers asked for under the story", () => {
    for (const id of Object.keys(DRAWN)) expect(contentTop(id), id).toBe(CONTENT_TOP.three + 32);
  });

  it("keep at least 40 px above the footer, whose type starts at y 1034", () => {
    expect(FLOOR).toBe(1034 - 40);
    expect(SAFE.bottom).toBe(FLOOR);
  });

  it.each(Object.keys(DRAWN))("start under %s's story band and stay inside the safe area", (id) => {
    for (const drawn of DRAWN[id]) {
      expect(drawn.y, id).toBeGreaterThanOrEqual(contentTop(id));
      expect(drawn.y, id).toBeGreaterThan(bandFoot(id));
      expect(bottom(drawn), id).toBeLessThanOrEqual(FLOOR);
      expect(inside(drawn, SAFE_BOX), JSON.stringify(drawn)).toBe(true);
    }
  });
});

describe("slide 22", () => {
  it("sets the five scenes, each with its label, clear of each other and of the figure", () => {
    for (const [i, a] of scenes.entries()) {
      expect(apart(a, WORK.figure.at), `scene ${i}`).toBe(true);
      for (const b of scenes.slice(i + 1)) expect(apart(a, b), `scene ${i}`).toBe(true);
    }
  });

  it("puts the figure in the middle, the scenes round it from left to right", () => {
    expect(centreOf(WORK.figure.at).x).toBe(STAGE.w / 2);
    const xs = WORK.scenes.map((scene) => centreOf(scene.at).x);
    expect(xs).toEqual([...xs].sort((a, b) => a - b));
    expect(xs[0]).toBeLessThan(centreOf(WORK.figure.at).x);
    expect(xs[4]).toBeGreaterThan(centreOf(WORK.figure.at).x);
    for (const scene of WORK.scenes) expect(centreOf(scene.at).y).toBeLessThan(bottom(WORK.figure.at));
  });

  it("sets each label under its own scene", () => {
    for (const scene of WORK.scenes) {
      expect(scene.label.at.y).toBe(bottom(scene.at) + SCENE.labelGap);
      expect(centreOf(scene.label.at).x).toBe(centreOf(scene.at).x);
    }
  });

  it("joins each scene to the figure with a line that touches neither", () => {
    const figure = grow(WORK.figure.at, 8);
    for (const [i, scene] of WORK.scenes.entries()) {
      const { from, to } = scene.line;
      const length = Math.hypot(to.x - from.x, to.y - from.y);
      expect(length, `line ${i}`).toBeGreaterThan(60);
      for (const end of [from, to]) {
        expect(apart(box(end.x, end.y, 0, 0), figure) || end === from, `line ${i}`).toBe(true);
        for (const near of scenes) expect(inside(box(end.x, end.y, 0, 0), near), `line ${i}`).toBe(false);
      }
      // Its far end stops just short of its own scene, and of no other.
      for (const [j, near] of scenes.entries()) expect(inside(box(to.x, to.y, 0, 0), grow(near, 16)), `line ${i} by scene ${j}`).toBe(i === j);
    }
  });
});

describe("slide 23", () => {
  const slots = [...ORG.units.map((unit) => unit.at), FIT.role.at];

  it("sets the chart as a head box carrying its name over one row of boxes, all clear of each other", () => {
    const boxes = [ORG.head.at, ...slots];
    for (const [i, a] of boxes.entries()) for (const b of boxes.slice(i + 1)) expect(apart(a, b)).toBe(true);
    expect(ORG.name.at).toEqual(ORG.head.at);
    for (const slot of slots) expect(slot.y).toBeGreaterThan(bottom(ORG.head.at) + 48);
    expect(centreOf(ORG.head.at).x).toBe(centreOf(bounds(slots)).x);
  });

  it("fills each of the row's boxes with three members, so the chart reads as people in teams", () => {
    for (const unit of ORG.units) {
      expect(unit.members).toHaveLength(3);
      for (const [i, member] of unit.members.entries()) {
        expect(member).toMatchObject({ w: MEMBER.w, h: MEMBER.h });
        expect(inside(grow(member, 4), unit.at), unit.key).toBe(true);
        if (i) expect(apart(member, unit.members[i - 1])).toBe(true);
      }
    }
  });

  it("joins the dashed new box into the row as one more box like the others, its line from the same split", () => {
    expect(FIT.role.at).toMatchObject({ y: ROW.y, w: ROW.w, h: ROW.h });
    for (const unit of ORG.units) expect(unit.at).toMatchObject({ y: ROW.y, w: ROW.w, h: ROW.h });
    expect(FIT.role.at.x).toBe(right(ORG.units[3].at) + ROW.gap);
    const drop = (b: Box) => b.x + b.w / 2;
    for (const unit of ORG.units) expect(unit.drop).toBe(`M${drop(unit.at)} ${ROW.busY}V${ROW.y}`);
    // The split runs on from the last box's drop to the new box's, then down to it.
    expect(ORG.join.d).toBe(`M${drop(ORG.units[3].at)} ${ROW.busY}H${drop(FIT.role.at)}V${ROW.y}`);
  });

  it("stands the figure inside the dashed new box, inside the chart", () => {
    expect(inside(grow(FIT.figure.at, 24), FIT.role.at)).toBe(true);
    expect(inside(FIT.figure.at, chart)).toBe(true);
  });

  it("stacks the four pieces down the right, clear of each other and of the chart, each line running from the new box to its piece", () => {
    const pieces = FIT.pieces.map((piece) => piece.at);
    for (const [i, a] of pieces.entries()) {
      expect(a.x).toBe(PIECE.x);
      expect(a.x).toBeGreaterThan(right(chart) + 240);
      if (i) expect(a.y).toBe(bottom(pieces[i - 1]) + PIECE.gap);
    }
    for (const piece of FIT.pieces) {
      const [start, end] = [piece.line.d.match(/^M([\d.]+) ([\d.]+)/)!, piece.line.d.match(/([\d.]+) ([\d.]+)$/)!].map((m) => ({ x: Number(m[1]), y: Number(m[2]) }));
      expect(start.x).toBe(right(FIT.role.at));
      expect(start.y).toBeGreaterThan(FIT.role.at.y);
      expect(start.y).toBeLessThan(bottom(FIT.role.at));
      expect(end).toEqual({ x: piece.at.x, y: piece.at.y + piece.at.h / 2 });
    }
  });
});

describe("slide 24, the close", () => {
  const [a, b] = CLOSE.story;
  const blockFoot = b.y + OPENING.creditLine;

  it("sets the title, the rule, line A and line B one under another at slide 1's measures, and the foot under them inside the safe area", () => {
    expect(CLOSE.title.lines).toHaveLength(1);
    expect(CLOSE.rule.at.y).toBe(CLOSE.title.y + OPENING.line + OPENING.ruleGap);
    expect(CLOSE.rule.at).toMatchObject({ w: 140, h: 6 });
    expect(a.y).toBe(bottom(CLOSE.rule.at) + OPENING.storyGap);
    expect(b.y).toBe(a.y + OPENING.leadLine);
    expect(CLOSE.foot.at.y).toBeGreaterThan(blockFoot + 48);
    expect(CLOSE.title.y).toBeGreaterThan(SAFE.top);
    expect(inside(CLOSE.foot.at, SAFE_BOX)).toBe(true);
  });

  it("centres the block on slide 1's middle, a little above the stage's", () => {
    const middle = (CLOSE.title.y + blockFoot) / 2;
    expect(Math.abs(middle - BLOCK_MIDDLE)).toBeLessThanOrEqual(1);
    expect(middle).toBeLessThan(STAGE.h / 2);
    expect(middle).toBeGreaterThan(STAGE.h / 2 - 40);
  });

  it("centres everything across the stage: the type's rows span it, the rule and the foot sit on its middle", () => {
    const markup = renderToStaticMarkup(createElement(CloseHtml));
    const rows = [...markup.matchAll(/<p class="([^"]+)" style="([^"]+)"/g)];
    expect(rows).toHaveLength(3);
    for (const [, classes, style] of rows) {
      expect(classes.split(" ")).toContain("fit-centred");
      expect(style).toContain("left:0");
      expect(style).toContain(`width:${STAGE.w}px`);
    }
    expect(centreOf(CLOSE.rule.at).x).toBe(STAGE.w / 2);
    expect(centreOf(CLOSE.foot.at).x).toBe(STAGE.w / 2);
    expect(markup).toMatch(/class="[^"]*fit-centred[^"]*" data-build="lets-talk.foot"/);
  });
});
