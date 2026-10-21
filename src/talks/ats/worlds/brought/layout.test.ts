/**
 * Where the brought world's slides put things: slide 1's title page centred
 * on navy; slides 2 and 2a's drawings under their story bands and inside
 * the frame's safe area; slide 2's tiles, benches and captions in a row
 * and apart; slide 2a's four panels on the geometry slide 28 shares, and
 * the route under them with its stops apart.
 */
import { STAGE, STORY, box, type Box, type Point } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { bottom, bounds, inside, overlaps, right, ringBox, wordsBox } from "./harness";
import { CREDIT_LINE, DRAW_FOOT, LABEL_LINE, LEAD_LINE, OPENING, SAFE, TEXT_LINE, bandFoot, contentTop, titleOf, wordsWidth } from "./layout";
import { BENCH, COURSE, TILE } from "./layout-course";
import { LESSONS, PANEL, ROUTE, TOP } from "./layout-lessons";

const text = (at: Point, words: string, anchor: "start" | "middle" | "end" = "middle") => wordsBox(at, wordsWidth(words, 32), TEXT_LINE, anchor);
const F = LESSONS;
const R = F.route;
const C = COURSE;

/** How many lines a name wraps to in its column at 32 px semibold, its average letter at 0.54 of the size (measured in Geist SemiBold: 0.48 to 0.51). */
function linesIn(words: string, width: number): number {
  const letter = 32 * 0.54;
  let lines = 1;
  let run = 0;
  for (const word of words.split(" ")) {
    const w = word.length * letter;
    if (run === 0) run = w;
    else if (run + letter + w <= width) run += letter + w;
    else {
      lines += 1;
      run = w;
    }
  }
  return lines;
}

const DRAWN: Record<string, Box[]> = {
  course: [...C.tiles.flatMap((tile) => [tile.at, tile.name.at, tile.bench.at]), text(C.college.at, C.college.text), text(C.build.at, C.build.text)],
  lessons: [
    ...F.panels.flatMap((panel) => [panel.at, wordsBox(panel.numeral.at, wordsWidth(panel.numeral.text, PANEL.numeral), PANEL.numeralLine, "start"), panel.name.at]),
    box(R.x0, R.y - ROUTE.stop, R.x1 - R.x0, 2 * ROUTE.stop),
    ...R.stops.flatMap((stop) => [ringBox(stop.at, ROUTE.stop), text(stop.name.at, stop.name.text)]),
  ],
};

describe("the brought world's layout", () => {
  it("starts each white slide's drawing under its story band, where the layout says drawing starts", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      expect(contentTop(pictureId), pictureId).toBeGreaterThanOrEqual(bandFoot(pictureId) + 32);
      expect(Math.min(...boxes.map((b) => b.y)), pictureId).toBeGreaterThanOrEqual(contentTop(pictureId));
    }
  });

  it("keeps each drawing inside the safe area, clear of the footer, the slide number and the stage's edges", () => {
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

  it("sets every title line inside the band's width at 72 px bold, erring wide of Geist Bold's measured 0.46 to 0.49 of the size per letter", () => {
    for (const pictureId of ["course", "lessons"]) for (const line of titleOf(pictureId).lines) expect(line.length * 72 * 0.5, line).toBeLessThan(STORY.w);
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

  it("sets every line inside the story band's width at its own size, erring wide (the title at Geist Bold's measured 0.46 to 0.49 of the size per letter)", () => {
    expect(OPENING.title.lines).toHaveLength(3);
    expect(OPENING.lead.lines).toHaveLength(1);
    expect(OPENING.credit.lines).toHaveLength(1);
    for (const line of titleOf("title").lines) expect(line.length * 108 * 0.5, line).toBeLessThan(STORY.w);
    for (const line of OPENING.lead.lines) expect(line.length * 40 * 0.56, line).toBeLessThan(STORY.w);
    for (const line of OPENING.credit.lines) expect(line.length * 32 * 0.56, line).toBeLessThan(STORY.w);
  });
});

describe("slide 2, the four tiles, the benches and the captions", () => {
  it("lays the four tiles on slide 2a's four columns: 396 wide, 48 apart, 96 to 1824, from the drawing's top", () => {
    expect(C.tiles).toHaveLength(4);
    expect(C.tiles[0].at.x).toBe(96);
    expect(right(C.tiles[3].at)).toBe(1824);
    for (const [i, tile] of C.tiles.entries()) {
      expect(tile.at).toEqual(box(96 + i * 444, contentTop("course"), 396, TILE.h));
      if (i > 0) expect(tile.at.x - right(C.tiles[i - 1].at)).toBe(48);
    }
  });

  it("names each tile inside it, in a 340 px column on two lines at most, clear of the tile's foot", () => {
    for (const tile of C.tiles) {
      expect(tile.name.at.x).toBe(tile.at.x + TILE.inset);
      expect(tile.name.at.w).toBe(340);
      const lines = linesIn(tile.name.text, TILE.nameW);
      expect(lines, tile.name.text).toBeLessThanOrEqual(2);
      expect(tile.name.at.y, tile.name.text).toBeGreaterThanOrEqual(tile.at.y + 28);
      expect(tile.name.at.y + lines * TILE.nameLine, tile.name.text).toBeLessThanOrEqual(bottom(tile.at) - 28);
      expect(inside(tile.name.at, tile.at), tile.name.text).toBe(true);
    }
  });

  it("centres the college's caption on the stage under the row, clear of the tiles and the benches", () => {
    const caption = text(C.college.at, C.college.text);
    expect(C.college.at.x).toBe(STAGE.w / 2);
    expect(caption.y).toBeGreaterThan(bottom(C.tiles[0].at) + 16);
    expect(bottom(caption)).toBeLessThan(C.tiles[0].bench.at.y - 16);
  });

  it("puts a bench under each tile, centred on it, 300 wide, its legs in from the slab's ends, the four on one line", () => {
    for (const tile of C.tiles) {
      const bench = tile.bench.at;
      expect(bench.w).toBe(BENCH.w);
      expect(bench.x + bench.w / 2).toBe(tile.at.x + tile.at.w / 2);
      expect(bench.y).toBe(C.tiles[0].bench.at.y);
      expect(bench.h).toBe(BENCH.slab + BENCH.leg);
      expect(inside(bench, box(tile.at.x, bench.y, tile.at.w, bench.h))).toBe(true);
      expect(BENCH.legIn).toBeGreaterThan(0);
      expect(BENCH.stretcher).toBeLessThan(BENCH.leg);
    }
  });

  it("centres the build's caption on the stage under the four benches, clear of them", () => {
    const caption = text(C.build.at, C.build.text);
    expect(C.build.at.x).toBe(STAGE.w / 2);
    expect(caption.y).toBeGreaterThan(bottom(C.tiles[0].bench.at) + 16);
    expect(bottom(caption)).toBeLessThanOrEqual(DRAW_FOOT);
  });
});

describe("slide 2a, the four panels and the route", () => {
  it("lays the four panels on the shared geometry: 396 wide, 48 apart, 96 to 1824, 300 tall from the drawing's top", () => {
    expect(TOP).toBe(contentTop("lessons"));
    expect(F.panels).toHaveLength(4);
    expect(F.panels[0].at.x).toBe(96);
    expect(right(F.panels[3].at)).toBe(1824);
    for (const [i, panel] of F.panels.entries()) {
      expect(panel.at).toEqual(box(96 + i * 444, TOP, 396, 300));
      if (i > 0) expect(panel.at.x - right(F.panels[i - 1].at)).toBe(48);
    }
  });

  it("sets each numeral 28 px into its panel's top left on its 72 px line, and its name in a 340 px column 104 px down", () => {
    for (const panel of F.panels) {
      expect(panel.numeral.at).toEqual({ x: panel.at.x + 28, y: panel.at.y + 28 + 36 });
      expect(panel.name.at.x).toBe(panel.at.x + 28);
      expect(panel.name.at.y).toBe(panel.at.y + 104);
      expect(panel.name.at.w).toBe(340);
      expect(PANEL.numeral).toBe(56);
    }
  });

  it("numbers the panels in order and gives each one of the script's four names, every name on three lines at most, inside its panel", () => {
    expect(F.panels.map((panel) => panel.numeral.text)).toEqual(["One", "Two", "Three", "Four"]);
    for (const panel of F.panels) {
      const lines = linesIn(panel.name.text, PANEL.nameW);
      expect(lines, panel.name.text).toBeLessThanOrEqual(3);
      expect(panel.name.at.y + lines * PANEL.nameLine, panel.name.text).toBeLessThan(bottom(panel.at) - 28);
      expect(inside(panel.name.at, panel.at), panel.name.text).toBe(true);
    }
  });

  it("runs the route across the full drawing width under the panels, its stops a sixth, a half and five sixths along it, left to right", () => {
    expect(R.x0).toBe(96);
    expect(R.x1).toBe(1824);
    expect(R.y - ROUTE.stop).toBeGreaterThan(bottom(F.panels[0].at) + 32);
    expect(R.stops.map((stop) => stop.at.x)).toEqual([384, 960, 1536]);
    for (const stop of R.stops) expect(stop.at.y).toBe(R.y);
  });

  it("names each stop under it, the names apart and clear of the line", () => {
    const names = R.stops.map((stop) => text(stop.name.at, stop.name.text));
    for (const [i, name] of names.entries()) {
      expect(name.y, R.stops[i].name.text).toBeGreaterThan(R.y + ROUTE.stop);
      if (i > 0) expect(overlaps(name, names[i - 1])).toBe(false);
      expect(name.h).toBe(TEXT_LINE);
    }
    expect(LABEL_LINE).toBeLessThan(TEXT_LINE);
  });
});
