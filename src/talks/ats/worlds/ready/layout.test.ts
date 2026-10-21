/**
 * Where the ready world's slides put things: every white slide's drawing
 * under its story band and inside the frame's safe area, and on each slide
 * the parts that must not meet kept apart and the parts that sit in another
 * kept inside it. The close is set centred, as the opening is.
 */
import { STAGE, STORY, box, storyRows, type Box } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { FLOOR, SAFE, STORIES, TAG, bandFoot, contentTop, labelsOf, wordsBox, wordsWidth } from "./layout";
import { APPLIED, APPLIED_BOXES, PANEL, TICK, TILE, linesBoxes, numeralBox } from "./layout-applied";
import { BLOCK_MIDDLE, CLOSE, OPENING } from "./layout-close";
import { LEVELS, LEVELS_BOXES, LEVELS_MEASURES, LEVEL_AGENT_R } from "./layout-levels";
import { RESIDENTS, RESIDENTS_BOXES } from "./layout-residents";
import { WHO_DECIDES, WHO_DECIDES_BOXES, cardFits, linesBoxes as decidesLines, measuredBox } from "./layout-who-decides";

const bottom = (b: Box) => b.y + b.h;
const right = (b: Box) => b.x + b.w;
const apart = (a: Box, b: Box) => right(a) <= b.x || right(b) <= a.x || bottom(a) <= b.y || bottom(b) <= a.y;
const inside = (a: Box, b: Box) => a.x >= b.x && a.y >= b.y && right(a) <= right(b) && bottom(a) <= bottom(b);
const SAFE_BOX = box(SAFE.left, SAFE.top, SAFE.right - SAFE.left, SAFE.bottom - SAFE.top);

/** What each white slide draws under its band. */
const DRAWN: Record<string, Box[]> = {
  levels: LEVELS_BOXES,
  "who-decides": WHO_DECIDES_BOXES,
  residents: RESIDENTS_BOXES,
  "could-be": [box(96, contentTop("could-be"), 1728, 412)],
  applied: APPLIED_BOXES,
};

describe("the white slides' drawings", () => {
  it("cover every white slide", () => {
    expect(Object.keys(DRAWN)).toEqual(STORIES.map((band) => band.picture));
  });

  it("keep at least 24 px above the footer and slide number, which start under y 1016", () => {
    expect(FLOOR).toBe(1016 - 24);
    expect(SAFE.bottom).toBe(FLOOR);
  });

  it.each(Object.keys(DRAWN))("start under %s's story band, a full row clear of it, and stay inside the safe area", (id) => {
    expect(contentTop(id)).toBeGreaterThanOrEqual(bandFoot(id) + 32);
    expect(bandFoot(id)).toBe(storyRows(STORIES.find((band) => band.picture === id)!.band, 2)[1].y + STORY.pitch);
    for (const drawn of DRAWN[id]) {
      expect(drawn.y, `${id} ${JSON.stringify(drawn)}`).toBeGreaterThanOrEqual(contentTop(id));
      expect(inside(drawn, SAFE_BOX), `${id} ${JSON.stringify(drawn)}`).toBe(true);
    }
  });
});

describe("slide 24, the four levels", () => {
  const L = LEVELS;

  it("stacks four full-width bands, top to bottom, none touching the next", () => {
    expect(L.bands.map((band) => band.hue)).toEqual(["grey", "review", "lead", "fix"]);
    for (const band of L.bands) {
      expect(band.at.x).toBe(SAFE.left);
      expect(right(band.at)).toBe(SAFE.right);
    }
    L.bands.slice(1).forEach((band, i) => expect(band.at.y).toBeGreaterThan(bottom(L.bands[i].at)));
  });

  it("sets each band's name and caption inside it, the caption clear of the name, both clear of where the agents land", () => {
    for (const band of L.bands) {
      const name = wordsBox(band.name.at, band.name.text, 32, "start");
      const caption = wordsBox(band.caption.at, band.caption.text, 26, "start");
      expect(inside(name, band.at), band.name.text).toBe(true);
      expect(inside(caption, band.at), band.caption.text).toBe(true);
      expect(right(name)).toBeLessThan(caption.x);
      expect(right(caption)).toBeLessThan(L.rows[0].agent.at.x - LEVEL_AGENT_R - 40);
    }
  });

  it("drops each agent from the middle of its own band into its row under the bands, and puts none in the no-go band", () => {
    expect(L.rows.map((row) => row.band)).toEqual([1, 2, 3]);
    for (const row of L.rows) {
      const band = L.bands[row.band].at;
      expect(row.agent.at.y + row.agent.drop).toBe(band.y + band.h / 2);
      expect(row.agent.at.y - LEVEL_AGENT_R).toBeGreaterThan(LEVELS_MEASURES.bandsFoot);
      expect(row.hue).toBe(L.bands[row.band].hue);
    }
  });

  it("keeps the short list small: each row's level and nameplate clear of the agent and of each other, the rows apart", () => {
    for (const row of L.rows) {
      const name = wordsBox(row.name.at, row.name.text, 26, "start");
      expect(name.x).toBeGreaterThan(row.agent.at.x + LEVEL_AGENT_R);
      expect(apart(name, row.plate.at), row.name.text).toBe(true);
      expect(row.plate.at.w).toBeGreaterThanOrEqual(wordsWidth(row.plate.text) + 40);
    }
    L.rows.slice(1).forEach((row, i) => expect(apart(row.plate.at, L.rows[i].plate.at)).toBe(true));
    expect(L.rows[1].agent.at.y - L.rows[0].agent.at.y).toBeLessThan(L.bands[1].at.y - L.bands[0].at.y);
  });

  it("puts the grey tag at the list's left, clear of the list", () => {
    expect(L.tag.at.h).toBe(TAG.h);
    expect(L.tag.at.y).toBeGreaterThan(LEVELS_MEASURES.bandsFoot);
    for (const row of L.rows) expect(right(L.tag.at)).toBeLessThan(row.agent.at.x - LEVEL_AGENT_R - 40);
  });
});

describe("slide 25, who decides", () => {
  const W = WHO_DECIDES;

  it("stacks the three tiers one under another, the same width, with their words inside", () => {
    W.tiers.slice(1).forEach((tier, i) => {
      expect(tier.at.y).toBeGreaterThan(bottom(W.tiers[i].at));
      expect(tier.at.x).toBe(W.tiers[i].at.x);
      expect(tier.at.w).toBe(W.tiers[i].at.w);
    });
    for (const tier of W.tiers) {
      expect(inside(measuredBox(tier.name.at, tier.name.text, 32), tier.at), tier.name.text).toBe(true);
      for (const line of decidesLines(tier.caption.at, tier.caption.lines, 26)) {
        expect(inside(line, tier.at), tier.caption.lines.join(" ")).toBe(true);
        expect(apart(line, measuredBox(tier.name.at, tier.name.text, 32))).toBe(true);
      }
    }
    expect(W.tiers[1].caption.lines).toHaveLength(2);
  });

  it("puts the orange mark inside the middle tier, clear of its words", () => {
    const tier = W.tiers[1];
    const mark = box(W.mark.at.x - 24, W.mark.at.y - 24, 48, 48);
    expect(inside(mark, tier.at)).toBe(true);
    expect(apart(mark, measuredBox(tier.name.at, tier.name.text, 32))).toBe(true);
    for (const line of decidesLines(tier.caption.at, tier.caption.lines, 26)) expect(apart(mark, line)).toBe(true);
  });

  it("runs one arrow down the stack's left side and one up its right, each the stack's height, their labels outside them", () => {
    const top = W.tiers[0].at.y;
    const foot = bottom(W.tiers[2].at);
    expect(W.down.from).toEqual({ x: W.down.to.x, y: top });
    expect(W.down.to.y).toBe(foot);
    expect(W.down.from.x).toBeLessThan(W.tiers[0].at.x);
    expect(W.up.from).toEqual({ x: W.up.to.x, y: foot });
    expect(W.up.to.y).toBe(top);
    expect(W.up.from.x).toBeGreaterThan(right(W.tiers[0].at));
    for (const line of decidesLines(W.down.label.at, W.down.label.lines, 26, "end")) expect(right(line)).toBeLessThan(W.down.from.x - 14);
    for (const line of decidesLines(W.up.label.at, W.up.label.lines, 26)) expect(line.x).toBeGreaterThan(W.up.from.x + 14);
  });

  it("sets the heading over the three questions in their own zone to the right, the cards one under another, each holding its words", () => {
    const upLabel = decidesLines(W.up.label.at, W.up.label.lines, 26);
    const heading = measuredBox(W.heading.at, W.heading.text, 32);
    expect(heading.x).toBe(W.cards[0].at.x);
    expect(right(heading)).toBeLessThanOrEqual(SAFE.right);
    expect(bottom(heading)).toBeLessThan(W.cards[0].at.y);
    W.cards.slice(1).forEach((card, i) => expect(card.at.y).toBeGreaterThan(bottom(W.cards[i].at)));
    for (const card of W.cards) {
      for (const line of upLabel) expect(card.at.x).toBeGreaterThan(right(line) + 30);
      expect(cardFits(card), card.text).toBe(true);
    }
  });
});

describe("slide 26, residents", () => {
  it("keeps each caption under its own stage without touching adjacent captions", () => {
    const stages = RESIDENTS.stages;
    for (const s of stages) {
      expect(s.captionY).toBeGreaterThan(bottom(s.icon) + 70);
      for (const line of s.lines) expect(wordsWidth(line, 32)).toBeLessThan(480);
    }
    expect(stages[0].x).toBeLessThan(stages[1].x);
    expect(stages[1].x).toBeLessThan(stages[2].x);
    expect(RESIDENTS.question.headingAt.y).toBeGreaterThan(stages[2].captionY + 80);
  });
  it("renders every stage caption from the script without dropping words", () => {
    const labels = labelsOf("residents");
    RESIDENTS.stages.forEach((s, i) => {
      expect(s.title).toBe(labels[2 * i]);
      expect(s.lines.join(" ")).toBe(labels[2 * i + 1]);
    });
  });
});

describe("slide 28, the four lessons applied", () => {
  const A = APPLIED;

  it("sets the four panels on slide 2's numbers: 396 wide, 48 apart, from x 96 to 1824, 300 tall from the content top", () => {
    expect(A.panels.map((panel) => panel.at.x)).toEqual([0, 1, 2, 3].map((i) => 96 + i * 444));
    expect(A.panels.map((panel) => panel.numeral.text)).toEqual(["One", "Two", "Three", "Four"]);
    expect(right(A.panels[3].at)).toBe(1824);
    for (const panel of A.panels) {
      expect(panel.at.w).toBe(396);
      expect(panel.at.h).toBe(300);
      expect(panel.at.y).toBe(contentTop("applied"));
    }
  });

  it("puts each numeral at its panel's top left, 28 in, and its name's column from 104 down, 340 wide, inside the panel", () => {
    for (const panel of A.panels) {
      expect(panel.numeral.at.x).toBe(panel.at.x + 28);
      expect(panel.numeral.at.y).toBe(panel.at.y + 64);
      expect(inside(numeralBox(panel.numeral), panel.at)).toBe(true);
      expect(panel.name.at).toEqual(box(panel.at.x + 28, panel.at.y + 104, 340, 4 * PANEL.nameLine));
      expect(panel.name.at.y).toBeGreaterThan(panel.numeral.at.y);
      expect(inside(panel.name.at, panel.at)).toBe(true);
      // Each name on one line at the 0.56 estimate runs past the column, so it wraps, to four lines at most.
      expect(wordsWidth(panel.name.text, 32)).toBeGreaterThan(PANEL.column);
      expect(wordsWidth(panel.name.text, 32)).toBeLessThanOrEqual(4 * PANEL.column);
    }
  });

  it("joins each panel to its tile by a 48 px line down from the middle of its foot, the tile its width, its words on one or two lines centred inside it", () => {
    for (const panel of A.panels) {
      expect(panel.line.from).toEqual({ x: panel.at.x + panel.at.w / 2, y: bottom(panel.at) });
      expect(panel.line.to.y - panel.line.from.y).toBe(TILE.line);
      expect(panel.tile.at.y).toBe(panel.line.to.y);
      expect(panel.tile.at.x).toBe(panel.at.x);
      expect(panel.tile.at.w).toBe(panel.at.w);
      expect(bottom(panel.tile.at)).toBeLessThanOrEqual(FLOOR);
      expect(panel.tile.lines.length).toBeGreaterThanOrEqual(1);
      expect(panel.tile.lines.length).toBeLessThanOrEqual(2);
      expect(panel.tile.lines.join(" ")).toBe(panel.tile.text);
      const lines = linesBoxes(panel.tile.words, panel.tile.lines, 26, 32);
      for (const line of lines) expect(inside(line, panel.tile.at)).toBe(true);
      // Centred up and down: as much room over the first line as under the last.
      expect(lines[0].y - panel.tile.at.y).toBe(bottom(panel.tile.at) - bottom(lines.at(-1)!));
    }
  });

  it("lands each tick on its panel's top right corner, inside the panel, clear of the numeral and the name", () => {
    for (const panel of A.panels) {
      const tick = box(panel.tick.at.x - TICK.r, panel.tick.at.y - TICK.r, 2 * TICK.r, 2 * TICK.r);
      expect(inside(tick, panel.at)).toBe(true);
      expect(panel.tick.at.x).toBeGreaterThan(panel.at.x + panel.at.w * 0.8);
      expect(panel.tick.at.y).toBeLessThan(panel.at.y + 60);
      expect(apart(tick, numeralBox(panel.numeral))).toBe(true);
      expect(apart(tick, panel.name.at)).toBe(true);
    }
  });
});

describe("slide 29, the close", () => {
  it("sets the title block on the opening's middle, and the rule centred under the title", () => {
    const top = CLOSE.title.y;
    const foot = CLOSE.story[1].y + OPENING.creditLine;
    expect(Math.abs((top + foot) / 2 - BLOCK_MIDDLE)).toBeLessThanOrEqual(1);
    expect(CLOSE.rule.at.x + CLOSE.rule.at.w / 2).toBe(STAGE.w / 2);
    expect(CLOSE.rule.at.y).toBeGreaterThan(top + OPENING.line);
  });

  it("sets the small line at the foot, centred, inside the safe area", () => {
    expect(CLOSE.foot.at.x + CLOSE.foot.at.w / 2).toBe(STAGE.w / 2);
    expect(bottom(CLOSE.foot.at)).toBeLessThanOrEqual(FLOOR);
    expect(CLOSE.foot.at.y).toBeGreaterThan(CLOSE.story[1].y + OPENING.creditLine + 200);
    expect(bottom(CLOSE.foot.rule)).toBeLessThan(CLOSE.foot.at.y);
  });
});
