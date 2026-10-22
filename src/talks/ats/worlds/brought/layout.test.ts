/**
 * Where the brought world's slides put things: slide 1's title page centred
 * on navy; slides 2 and 2a's drawings under their story bands and inside
 * the frame's safe area; slide 2's wordmark and caption centred over its
 * four boxes, each name centred in its box under its check; slide 2a's four panels on the geometry slide 28 shares, and
 * the route under them with its stops apart.
 */
import { STAGE, STORY, box, type Box, type Point } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { bottom, bounds, inside, overlaps, right, ringBox, wordsBox } from "./harness";
import { CREDIT_LINE, DRAW_FOOT, LABEL_LINE, LEAD_LINE, OPENING, SAFE, TEXT_LINE, bandFoot, contentTop, titleOf, wordsWidth } from "./layout";
import { COURSE, MODULE, TYPE, WORDMARK } from "./layout-course";
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
  course: [
    C.wordmark.at,
    wordsBox(C.college.at, wordsWidth(C.college.text, TYPE.caption), TYPE.captionLine, "middle"),
    ...C.modules.flatMap((mod) => [mod.at, ringBox(mod.tick.at, TYPE.tick)]),
  ],
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

describe("slide 2, the wordmark, its caption and the four boxes", () => {
  const boxesTop = C.modules[0].at.y;
  const caption = wordsBox(C.college.at, wordsWidth(C.college.text, TYPE.caption), TYPE.captionLine, "middle");
  /** A name's block of lines: its first line's middle is `at.y`, each next line a line under it. */
  const nameBlock = (name: (typeof C.modules)[number]["name"]) => ({ top: name.at.y - TYPE.nameLine / 2, foot: name.at.y + (name.lines.length - 0.5) * TYPE.nameLine });

  it("sets the Carnegie Mellon wordmark at its own proportions, wide enough to read from the back of the room, centred across the stage at the drawing's top", () => {
    const mark = C.wordmark.at;
    expect(C.wordmark.src).toMatch(/\/logos\/cmu\.v1\.svg$/);
    expect(mark.w / mark.h).toBeCloseTo(WORDMARK.w / WORDMARK.h, 6);
    expect(mark.w).toBeGreaterThanOrEqual(360);
    expect(mark.w).toBeLessThanOrEqual(460);
    expect(mark.x + mark.w / 2).toBe(STAGE.w / 2);
    expect(mark.y).toBe(contentTop("course"));
  });

  it("centres one small caption under the wordmark, above the boxes and clear of both, at 18 px or more on a 1366 px screen", () => {
    expect(C.college.at.x).toBe(STAGE.w / 2);
    expect(caption.y).toBeGreaterThanOrEqual(bottom(C.wordmark.at) + 16);
    expect(bottom(caption) + 32).toBeLessThanOrEqual(boxesTop);
    expect((TYPE.caption * 1366) / STAGE.w).toBeGreaterThanOrEqual(18);
    expect(TYPE.caption).toBeLessThan(TYPE.name);
    expect(caption.w).toBeLessThan(STORY.w);
  });

  it("lays the four boxes in a row on slide 2a's four columns, 396 wide and 48 apart from 96 to 1824, under the wordmark", () => {
    expect(C.modules).toHaveLength(4);
    expect(C.modules[0].at.x).toBe(96);
    expect(right(C.modules[3].at)).toBe(1824);
    for (const [i, mod] of C.modules.entries()) {
      expect(mod.at).toEqual(box(96 + i * 444, boxesTop, 396, MODULE.h));
      if (i > 0) expect(mod.at.x - right(C.modules[i - 1].at)).toBe(48);
    }
    expect(boxesTop).toBeGreaterThan(bottom(C.wordmark.at));
  });

  it("centres each name in its box, across and up and down, on two lines at most, broken at a phrase, each line inside the box", () => {
    for (const mod of C.modules) {
      const { name, at } = mod;
      expect(name.lines.join(" "), name.text).toBe(name.text);
      expect(name.lines.length, name.text).toBeLessThanOrEqual(2);
      expect(name.at.x, name.text).toBe(at.x + at.w / 2);
      const block = nameBlock(name);
      expect((block.top + block.foot) / 2, name.text).toBe(at.y + at.h / 2);
      for (const line of name.lines) expect(wordsWidth(line, TYPE.name), line).toBeLessThanOrEqual(at.w - 2 * 24);
      // No line ends on a word that leans on the next.
      for (const line of name.lines.slice(0, -1)) expect(line, name.text).not.toMatch(/\b(?:the|a|of|to)$/);
    }
  });

  it("puts each box's check centred across it, above its name and inside its top, the four checks on one line", () => {
    for (const mod of C.modules) {
      const { tick, at, name } = mod;
      expect(tick.at.x).toBe(at.x + at.w / 2);
      expect(tick.at.y).toBe(C.modules[0].tick.at.y);
      expect(tick.at.y - TYPE.tick, name.text).toBeGreaterThanOrEqual(at.y + 16);
      expect(tick.at.y + TYPE.tick + 12, name.text).toBeLessThanOrEqual(nameBlock(name).top);
      expect(inside(ringBox(tick.at, TYPE.tick), at)).toBe(true);
    }
  });

  it("keeps the boxes clear of the drawing's foot", () => {
    expect(bottom(C.modules[0].at)).toBeLessThanOrEqual(DRAW_FOOT);
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
