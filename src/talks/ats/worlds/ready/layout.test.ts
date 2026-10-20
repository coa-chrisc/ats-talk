/**
 * Where the ready world's slides put things: every white slide's drawing
 * under its story band and inside the frame's safe area, and on each slide
 * the parts that must not meet kept apart and the parts that sit in another
 * kept inside it. The close is set centred, as the opening is.
 */
import { describe, expect, it } from "vitest";
import { markup } from "./harness";
import { STAGE, STORY, box, storyRows, type Box } from "@/components/deck/kit";
import { FLOOR, SAFE, STORIES, TAG, bandFoot, contentTop, wordsBox, wordsWidth } from "./layout";
import { BLOCK_MIDDLE, CLOSE, OPENING } from "./layout-close";
import { DECISIONS, DECISIONS_BOXES, DISC_R, NUMERAL } from "./layout-decisions";
import { LEVELS, LEVELS_BOXES, LEVELS_MEASURES, LEVEL_AGENT_R } from "./layout-levels";
import { CARD_PLACES, HELPER_R, RESIDENTS, RESIDENTS_BOXES, RESIDENTS_MEASURES } from "./layout-residents";
import { WHO_DECIDES, WHO_DECIDES_BOXES, cardFits } from "./layout-who-decides";

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
  decisions: DECISIONS_BOXES,
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

describe("slide 16, the four levels", () => {
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

describe("slide 17, who decides", () => {
  const W = WHO_DECIDES;

  it("stacks the three tiers one under another, the same width, with their words inside", () => {
    W.tiers.slice(1).forEach((tier, i) => {
      expect(tier.at.y).toBeGreaterThan(bottom(W.tiers[i].at));
      expect(tier.at.x).toBe(W.tiers[i].at.x);
      expect(tier.at.w).toBe(W.tiers[i].at.w);
    });
    for (const tier of W.tiers) {
      expect(inside(wordsBox(tier.name.at, tier.name.text, 32, "start"), tier.at), tier.name.text).toBe(true);
      expect(inside(wordsBox(tier.caption.at, tier.caption.text, 26, "start"), tier.at), tier.caption.text).toBe(true);
    }
  });

  it("puts the orange mark inside the middle tier, clear of its words", () => {
    const tier = W.tiers[1];
    const mark = box(W.mark.at.x - 24, W.mark.at.y - 24, 48, 48);
    expect(inside(mark, tier.at)).toBe(true);
    expect(apart(mark, wordsBox(tier.name.at, tier.name.text, 32, "start"))).toBe(true);
    expect(apart(mark, wordsBox(tier.caption.at, tier.caption.text, 26, "start"))).toBe(true);
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
    expect(right(wordsBox(W.down.label.at, W.down.label.text, 26, "end"))).toBeLessThan(W.down.from.x);
    expect(wordsBox(W.up.label.at, W.up.label.text, 26, "start").x).toBeGreaterThan(W.up.from.x);
  });

  it("lands the three questions in their own zone to the right, one under another, each holding its words", () => {
    const upLabel = wordsBox(W.up.label.at, W.up.label.text, 26, "start");
    W.cards.slice(1).forEach((card, i) => expect(card.at.y).toBeGreaterThan(bottom(W.cards[i].at)));
    for (const card of W.cards) {
      expect(card.at.x).toBeGreaterThan(right(upLabel) + 40);
      expect(cardFits(card), card.text).toBe(true);
    }
  });
});

describe("slide 18, residents", () => {
  const R = RESIDENTS;
  const M = RESIDENTS_MEASURES;
  const desk = R.desk.at;
  const fence = R.fence.at;

  it("draws the scene large: a desk about 560 wide, the people about 170 tall, the helper about 90 across", () => {
    expect(desk.w).toBe(560);
    expect(R.staff.at.h).toBeGreaterThanOrEqual(165);
    expect(R.resident.at.h).toBeGreaterThanOrEqual(165);
    expect(2 * HELPER_R).toBe(90);
  });

  it("seats the member of staff behind the desk, cut by its top at the chest, with the orange mark above them", () => {
    expect(R.staff.at.x).toBeGreaterThan(desk.x);
    expect(right(R.staff.at)).toBeLessThan(right(desk));
    expect(R.staff.at.y).toBeLessThan(desk.y);
    expect(bottom(R.staff.at)).toBeGreaterThan(desk.y);
    expect(R.mark.at.y + 24).toBeLessThan(R.staff.at.y);
  });

  it("puts the helper right beside the member of staff, on the staff side of the desk, over its top", () => {
    const helper = box(R.helper.at.x - HELPER_R, R.helper.at.y - HELPER_R, 2 * HELPER_R, 2 * HELPER_R);
    expect(helper.x - right(R.staff.at)).toBeGreaterThanOrEqual(0);
    expect(helper.x - right(R.staff.at)).toBeLessThan(40);
    expect(right(helper)).toBeLessThanOrEqual(right(desk));
    expect(bottom(wordsBox(R.helper.name.at, R.helper.name.text))).toBeLessThan(desk.y);
  });

  it("stands a low, wide fence on the floor between the desk's front edge and the resident", () => {
    expect(fence.w).toBe(320);
    expect(fence.h).toBe(48);
    expect(R.fence.pickets).toHaveLength(6);
    expect(bottom(fence)).toBe(M.floor);
    expect(fence.x).toBeGreaterThan(M.deskFront);
    expect(right(fence)).toBeLessThan(R.resident.at.x);
    for (const picket of R.fence.pickets) expect(inside(picket, fence)).toBe(true);
    expect(wordsBox(R.fence.name.at, R.fence.name.text).y).toBeGreaterThan(M.floor);
  });

  it("stands the resident on the floor across the fence, and names everyone on one line under the floor", () => {
    expect(bottom(R.resident.at)).toBe(M.floor);
    const names = [R.staff.name, R.resident.name, R.fence.name].map((name) => wordsBox(name.at, name.text));
    for (const name of names) expect(name.y).toBeGreaterThan(M.floor);
    names.forEach((a, i) => names.slice(i + 1).forEach((b) => expect(apart(a, b)).toBe(true)));
  });

  it("starts the card on the helper, lifts it clear of the mark and the fence, and ends it touching the resident, not in the air", () => {
    const helper = box(R.helper.at.x - HELPER_R, R.helper.at.y - HELPER_R, 2 * HELPER_R, 2 * HELPER_R);
    expect(apart(CARD_PLACES.start, helper)).toBe(false);
    expect(apart(CARD_PLACES.lifted, box(R.mark.at.x - 24, R.mark.at.y - 24, 48, 48))).toBe(true);
    expect(apart(CARD_PLACES.start, box(R.mark.at.x - 24, R.mark.at.y - 24, 48, 48))).toBe(true);
    expect(bottom(CARD_PLACES.over)).toBeLessThan(fence.y);
    const served = CARD_PLACES.served;
    expect(right(served)).toBeGreaterThan(R.resident.at.x);
    expect(right(served)).toBeLessThan(R.resident.at.x + R.resident.at.w / 2);
    expect(served.y).toBeGreaterThan(R.resident.at.y);
    expect(bottom(served)).toBeLessThan(fence.y);
  });

  it("sets the test with no box: its heading level with the desk's top, two 32 px lines under it, well apart, clear of the resident", () => {
    const heading = wordsBox(R.list.heading.at, R.list.heading.text, 32, "start");
    expect(heading.y).toBe(desk.y);
    expect(R.list.rows).toHaveLength(2);
    expect(R.list.rows[1].at.y - R.list.rows[0].at.y).toBeGreaterThanOrEqual(64);
    for (const row of R.list.rows) {
      expect(row.at.y).toBeGreaterThan(bottom(heading));
      expect(row.centre.x - row.r).toBe(heading.x);
      expect(heading.x).toBeGreaterThan(right(R.resident.at) + 80);
    }
    expect(markup).not.toContain('data-build="residents.list"');
  });
});

describe("slide 19, four decisions", () => {
  const D = DECISIONS;

  it("fills most of the drawing area with the panel, the grey tag under it on the white ground", () => {
    const area = (SAFE.right - SAFE.left) * (FLOOR - contentTop("decisions"));
    expect((D.panel.at.w * D.panel.at.h) / area).toBeGreaterThan(0.8);
    expect(D.tag.at.y).toBeGreaterThan(bottom(D.panel.at));
  });

  it("sets four rows inside the panel, one under another, each a numeral on its disc, its decision and its nameplate", () => {
    expect(D.rows.map((row) => row.figure)).toEqual([0, 1, 2, 3]);
    for (const row of D.rows) {
      const disc = box(row.disc.x - DISC_R, row.disc.y - DISC_R, 2 * DISC_R, 2 * DISC_R);
      const numeral = box(row.numeral.at.x, row.numeral.at.y - NUMERAL.h, NUMERAL.w, NUMERAL.h);
      const words = wordsBox(row.words, row.text, 32, "start");
      for (const part of [disc, words, row.plate.at]) expect(inside(part, D.panel.at), row.text).toBe(true);
      expect(inside(numeral, disc)).toBe(true);
      expect(right(disc)).toBeLessThan(words.x);
      expect(apart(words, row.plate.at)).toBe(true);
    }
    D.rows.slice(1).forEach((row, i) => expect(row.words.y - 22).toBeGreaterThanOrEqual(bottom(D.rows[i].plate.at)));
  });

  it("names the first two rows' owner with the same plate words", () => {
    expect(D.rows[1].plate.text).toBe(D.rows[0].plate.text);
  });
});

describe("slide 20, the close", () => {
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
