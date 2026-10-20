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
import { CITY_STANDS, PACK_NAME, RUNNER } from "./track-geometry";
import { BLOCK_MIDDLE, CLOSE, OPENING } from "./layout-close";
import { APPLIED, APPLIED_BOXES, PANEL, TICK, TILE, linesBoxes, numeralBox } from "./layout-applied";
import { COULD_BE, COULD_BE_BOXES, KEY_MEASURED, MARKER_R, TRACK_TOP, runnerBox } from "./layout-could-be";
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
  "could-be": COULD_BE_BOXES,
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

describe("slide 26, residents", () => {
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

describe("slide 27, where the City could be", () => {
  const C = COULD_BE;
  const T = C.track;
  const near = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

  it("draws the deck's one track: its oval, lanes, start stripe, pack and pack's name on the numbers slides 11 and 15 use", () => {
    expect(contentTop("could-be")).toBe(TRACK_TOP);
    expect(T.outer).toEqual(box(96, 564, 1728, 344));
    expect(T.inner).toEqual(box(192, 660, 1536, 152));
    expect(T.middle).toEqual(box(144, 612, 1632, 248));
    expect(C.start.x).toBe(96 + 172 + 48);
    expect(C.pack.at.map((at) => at.x)).toEqual([1040, 1086, 1132, 1178, 1063, 1109, 1155]);
    expect(C.pack.name.at).toEqual(PACK_NAME);
    expect(C.pack.name.at).toEqual({ x: 1109, y: 686 });
  });

  it("stands the City's runner where slide 15 does, 60 degrees up the right bend on the middle lane line", () => {
    expect(C.city.at).toEqual(CITY_STANDS);
    expect(C.city.at).toEqual({ x: 1759, y: 798 });
  });

  it("stands the dashed runner at the pack's tail, the City's runner's size, on the far straight and clear of the pack", () => {
    const dashed = runnerBox(C.dashed.at, RUNNER.large, "left");
    expect(C.dashed.at).toEqual({ x: 1230, y: T.inner.y - 10 });
    expect(dashed.y).toBeGreaterThanOrEqual(T.outer.y);
    expect(bottom(dashed)).toBeLessThanOrEqual(T.inner.y);
    for (const at of C.pack.at) expect(dashed.x - right(runnerBox(at, RUNNER.small, "left")), JSON.stringify(at)).toBeGreaterThanOrEqual(12);
  });

  it("names the dashed runner in the infield under it, clear of the pack's name", () => {
    const name = wordsBox(C.dashed.name.at, C.dashed.name.text, 32);
    expect(inside(name, T.inner)).toBe(true);
    expect(apart(name, wordsBox(C.pack.name.at, C.pack.name.text, 32))).toBe(true);
    expect(name.x).toBeLessThan(C.dashed.at.x);
    expect(right(name)).toBeGreaterThan(C.dashed.at.x);
  });

  it("sets one marker for each decision on the middle lane line, at equal steps from the City's runner to the pack's tail, round the bend and along the far straight", () => {
    expect(C.markers).toHaveLength(5);
    const onBend = C.markers.filter((marker) => marker.at.x > 1652);
    const onStraight = C.markers.filter((marker) => marker.at.x <= 1652);
    expect(onBend.length).toBeGreaterThan(0);
    for (const marker of onBend) expect(Math.abs(near(marker.at, { x: 1652, y: 736 }) - 124)).toBeLessThan(0.5);
    for (const marker of onStraight) expect(marker.at.y).toBe(612);
    const xs = [...onStraight.map((marker) => marker.at.x), C.tail];
    for (let i = 0; i < xs.length - 1; i++) expect(xs[i] - xs[i + 1]).toBeCloseTo(C.step, 1);
    expect(C.markers.at(-1)!.at.x).toBeGreaterThan(C.tail);
    expect(C.tail).toBe(1210);
  });

  it("keeps the markers clear of the runners", () => {
    for (const marker of C.markers) {
      const disc = box(marker.at.x - MARKER_R, marker.at.y - MARKER_R, 2 * MARKER_R, 2 * MARKER_R);
      expect(apart(disc, runnerBox(C.city.at, RUNNER.large))).toBe(true);
      expect(apart(disc, runnerBox(C.dashed.at, RUNNER.large, "left"))).toBe(true);
      for (const at of C.pack.at) expect(apart(disc, runnerBox(at, RUNNER.small, "left"))).toBe(true);
    }
  });

  it("sets the key off the lanes, under the track, from the right edge leftward in landing order, its entries apart", () => {
    const entries = C.markers.map((marker) => marker.entry.at);
    C.markers.forEach((marker, i) => expect(marker.entry.at.w).toBe(KEY_MEASURED[i]));
    for (const entry of entries) {
      expect(entry.y).toBeGreaterThan(bottom(T.outer));
      expect(bottom(entry)).toBeLessThanOrEqual(FLOOR);
      expect(entry.x).toBeGreaterThanOrEqual(SAFE.left);
    }
    expect(right(entries[0])).toBeLessThanOrEqual(SAFE.right);
    entries.slice(1).forEach((entry, i) => expect(right(entry) + 30).toBeLessThanOrEqual(entries[i].x));
  });

  it("joins each marker to its entry by a leader that starts at the marker, ends on the entry's small marker, and crosses no other leader, word or runner", () => {
    type P = { x: number; y: number };
    const segments = (points: readonly P[]) => points.slice(1).map((p, i) => [points[i], p] as const);
    const hits = (a: readonly [P, P], b: Box) => {
      for (let t = 0; t <= 1; t += 0.01) {
        const x = a[0].x + (a[1].x - a[0].x) * t;
        const y = a[0].y + (a[1].y - a[0].y) * t;
        if (x > b.x && x < right(b) && y > b.y && y < bottom(b)) return true;
      }
      return false;
    };
    const cross = (a: readonly [P, P], b: readonly [P, P]) => {
      const d = (p: P, q: P, r: P) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
      return d(a[0], a[1], b[0]) * d(a[0], a[1], b[1]) < 0 && d(b[0], b[1], a[0]) * d(b[0], b[1], a[1]) < 0;
    };
    const blocks = [
      wordsBox(C.pack.name.at, C.pack.name.text, 32),
      wordsBox(C.dashed.name.at, C.dashed.name.text, 32),
      runnerBox(C.city.at, RUNNER.large),
      runnerBox(C.dashed.at, RUNNER.large, "left"),
    ];
    C.markers.forEach((marker, i) => {
      const points = marker.leader.points;
      expect(near(points[0], marker.at)).toBeCloseTo(MARKER_R, 1);
      const foot = points.at(-1)!;
      expect(foot.x).toBe(Math.round(marker.entry.at.x + marker.entry.at.w / 2));
      expect(foot.y).toBeGreaterThan(bottom(T.outer));
      expect(foot.y).toBeLessThan(marker.entry.at.y);
      for (const segment of segments(points)) for (const block of blocks) expect(hits(segment, block), `${i} ${JSON.stringify(block)}`).toBe(false);
      C.markers.forEach((other, j) => {
        if (j === i) return;
        for (const a of segments(points)) for (const b of segments(other.leader.points)) expect(cross(a, b), `${i} ${j}`).toBe(false);
        expect(segments(points).some((segment) => hits(segment, box(other.at.x - MARKER_R, other.at.y - MARKER_R, 2 * MARKER_R, 2 * MARKER_R)))).toBe(false);
      });
    });
  });

});

describe("slide 28, the four ideas applied", () => {
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

  it("puts each numeral at its panel's top left, 28 in, and its name's column from 120 down, 340 wide, inside the panel", () => {
    for (const panel of A.panels) {
      expect(panel.numeral.at.x).toBe(panel.at.x + 28);
      expect(panel.numeral.at.y).toBe(panel.at.y + 64);
      expect(inside(numeralBox(panel.numeral), panel.at)).toBe(true);
      expect(panel.name.at).toEqual(box(panel.at.x + 28, panel.at.y + 120, 340, 3 * PANEL.nameLine));
      expect(panel.name.at.y).toBeGreaterThan(panel.numeral.at.y);
      expect(inside(panel.name.at, panel.at)).toBe(true);
      // Each name on one line at the 0.56 estimate runs past the column, so it wraps, to three lines at most.
      expect(wordsWidth(panel.name.text, 32)).toBeGreaterThan(PANEL.column);
      expect(wordsWidth(panel.name.text, 32)).toBeLessThanOrEqual(3 * PANEL.column);
    }
  });

  it("joins each panel to its tile by a 48 px line down from the middle of its foot, the tile its width, its words on two lines inside it", () => {
    for (const panel of A.panels) {
      expect(panel.line.from).toEqual({ x: panel.at.x + panel.at.w / 2, y: bottom(panel.at) });
      expect(panel.line.to.y - panel.line.from.y).toBe(TILE.line);
      expect(panel.tile.at.y).toBe(panel.line.to.y);
      expect(panel.tile.at.x).toBe(panel.at.x);
      expect(panel.tile.at.w).toBe(panel.at.w);
      expect(bottom(panel.tile.at)).toBeLessThanOrEqual(FLOOR);
      expect(panel.tile.lines).toHaveLength(2);
      expect(panel.tile.lines.join(" ")).toBe(panel.tile.text);
      for (const line of linesBoxes(panel.tile.words, panel.tile.lines, 26, 32)) expect(inside(line, panel.tile.at)).toBe(true);
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
