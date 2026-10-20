/**
 * Part 5's layout: every slide's drawing starts under its story band and
 * stays clear of the frame's chrome, and the parts that must not touch do
 * not. Positions are plain numbers, so this needs no page.
 */
import { describe, expect, it } from "vitest";
import { CONTENT_TOP, STORY, box, storyRows, type Box } from "@/components/deck/kit";
import { PICTURES, SAFE, STORIES, TITLES, bounds, contentTop } from "./layout";
import { CREDENTIAL_ROWS, THE_CATALOG } from "./layout-catalog";
import { COSTS, MODULES, TEACHING } from "./layout-means";
import { CHARTER, ONESDLC, SECURITY } from "./layout-rules";
import { AMANDA, FORESIGHT, GRANTS } from "./layout-tools";

/** Where a slide's story band ends: under its last row. */
const bandFoot = (pictureId: string) => {
  const band = STORIES.find((entry) => entry.picture === pictureId)!;
  return storyRows(band.band, band.lines.flat().length).at(-1)!.y + STORY.pitch;
};
const bottom = (b: Box) => b.y + b.h;
const apart = (a: Box, b: Box) => a.x + a.w <= b.x || b.x + b.w <= a.x || bottom(a) <= b.y || bottom(b) <= a.y;
const dot = (p: { x: number; y: number }, r: number) => box(p.x - r, p.y - r, 2 * r, 2 * r);
const line = (x0: number, x1: number, y: number) => box(x0, y - 2, x1 - x0, 4);

/** Where the footer's type starts on the stage. */
const FOOTER_TOP = 1034;
const F = FORESIGHT;
const G = GRANTS;
const A = AMANDA;

/** What each slide draws under its story band. */
const DRAWN: Record<string, Box[]> = {
  foresight: [
    ...F.band.dots.map((p) => dot(p, F.band.r)),
    F.sources.at,
    dot(F.moon.at, F.moon.r),
    ...F.stream.dots.map((p) => dot({ x: p.x, y: p.y + F.stream.drop }, F.stream.r)),
    ...F.tiles.map((tile) => tile.at),
    F.priorities.at,
    ...F.signals.dots.map((p) => dot(p, F.signals.r)),
    F.signalsLabel.at,
    F.page.at,
    { ...F.page.at, x: F.page.at.x + F.page.from },
    line(F.table.x0, F.table.x1, F.table.y),
    box(F.table.x0, F.table.y, F.table.x1 - F.table.x0, F.table.foot - F.table.y),
    F.reviews.at,
    F.tag.at,
  ],
  grantscope: [
    ...G.panels.map((panel) => panel.at),
    ...G.names.map((name) => name.at),
    ...G.validated.map((tag) => tag.at),
    ...G.cards.map((card) => card.at),
    ...G.cards.map((card) => ({ ...card.at, x: card.at.x + card.to, y: card.at.y + card.drop })),
    G.tray.at,
    G.strongFit.at,
    G.millions.at,
    G.stack.at,
    G.bills.at,
    ...G.turns.map((turn) => ({ ...turn.at, x: turn.at.x + turn.to })),
    G.summary.at,
    ...G.timelines.flatMap((timeline) => [
      line(timeline.x0, timeline.x1, timeline.y),
      box(timeline.join.x - 1, timeline.join.y0, 2, timeline.join.y1 - timeline.join.y0),
      ...timeline.points.flatMap((point) => [dot(point.at, G.r), point.label.at]),
    ]),
  ],
  amanda: [A.legacy.at, ...A.pages.map((page) => page.at), A.documented.at, ...A.days.map((day) => day.at), A.daysLabel.at, A.ours.at, A.oursLabel.at, A.vendor.at, A.vendorLabel.at, A.top.at, A.tag.at],
  security: [
    ...SECURITY.bands.flatMap((band) => [band.at, band.label.at]),
    ...SECURITY.checks.map((check) => check.at),
    ...SECURITY.tiers.flatMap((tier) => [tier.at, tier.name.at, ...tier.tools.map((tool) => tool.at)]),
    SECURITY.empty.at,
    SECURITY.empty.name.at,
    SECURITY.empty.none.at,
  ],
  onesdlc: [
    line(ONESDLC.line.x0, ONESDLC.line.x1, ONESDLC.line.y),
    ...ONESDLC.stages.flatMap((stage) => [dot(stage.at, ONESDLC.r), stage.label.at]),
    ONESDLC.custom.at,
    line(ONESDLC.branch.split, ONESDLC.branch.join, ONESDLC.branch.dip),
    ...ONESDLC.checkpoints.flatMap((point) => [dot(point.at, ONESDLC.diamond), point.label.at]),
    ONESDLC.tag.at,
  ],
  charter: [...CHARTER.roles.flatMap((role) => [role.at, role.person, role.label.at]), ...CHARTER.heads.map((head) => head.at), ...CHARTER.circles.flatMap((circle) => [dot(circle.at, CHARTER.r), circle.label.at]), ...CHARTER.results.map((result) => result.at)],
  costs: [...COSTS.heads.map((head) => head.at), ...COSTS.bars.flatMap((bar) => [bar.track, bar.bar, bar.name.at, bar.value.at]), COSTS.tag.at],
  teaching: [
    TEACHING.room.at,
    ...TEACHING.rows.flatMap((row) => row.seats),
    TEACHING.staff.at,
    TEACHING.series.at,
    ...TEACHING.months.map((month) => month.at),
    TEACHING.monthsLabel.at,
    line(TEACHING.shelf.x0, TEACHING.shelf.x1, TEACHING.shelf.y),
    ...TEACHING.items.map((item) => item.at),
  ],
  "what-exists": [
    ...MODULES.rows.flatMap((row) => [...row.blocks, ...(row.label ? [row.label.at] : [])]),
    ...MODULES.others.flatMap((row) => row.blocks),
    MODULES.other.at,
    MODULES.total.at,
    ...MODULES.binders.flatMap((binder) => [binder.at, binder.label.at]),
    ...MODULES.sheets.map((sheet) => sheet.at),
    MODULES.papers.at,
  ],
  "the-catalog": [THE_CATALOG.frame.at, THE_CATALOG.tag.at, ...THE_CATALOG.sessions.map((session) => session.at), ...THE_CATALOG.feedback.map((mark) => mark.at), THE_CATALOG.live.at],
  credentials: [line(CREDENTIAL_ROWS.top.x0, CREDENTIAL_ROWS.top.x1, CREDENTIAL_ROWS.top.y), ...CREDENTIAL_ROWS.rows.flatMap((row) => [row.at, row.name.at, ...(row.year ? [row.year.at] : []), row.courses.at])],
};

describe("the backup world's layout", () => {
  it("lays out every slide of the world", () => {
    expect(Object.keys(DRAWN)).toEqual(PICTURES.map((picture) => picture.id));
  });

  it("starts every slide's drawing under its story band, at the kit's content top for its title", () => {
    for (const [pictureId, boxes] of Object.entries(DRAWN)) {
      expect(contentTop(pictureId), pictureId).toBeGreaterThanOrEqual(bandFoot(pictureId));
      expect(Math.min(...boxes.map((b) => b.y)), pictureId).toBeGreaterThanOrEqual(contentTop(pictureId));
    }
  });

  it("starts every drawing 32 px lower than the kit's content top, for room under the story band", () => {
    for (const band of STORIES) expect(contentTop(band.picture), band.picture).toBe(CONTENT_TOP[band.band] + 32);
  });

  it("keeps every picture at least 40 px above the footer's type", () => {
    expect(SAFE.bottom).toBeLessThanOrEqual(FOOTER_TOP - 40);
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

  it("sets every title on three lines at most, inside the band's width, and every story line on one row", () => {
    for (const title of TITLES) expect(title.lines.length, title.picture).toBeLessThanOrEqual(3);
    for (const band of STORIES) for (const rows of band.lines) expect(rows, band.picture).toHaveLength(1);
  });
});

describe("parts that must not touch", () => {
  it("25: keeps the labels clear of the funnel's mouth, the brief clear of the table's legs' words, and the tag clear of the moon", () => {
    expect(F.sources.at.x + F.sources.at.w).toBeLessThan(F.band.dots[0].x - F.band.r);
    expect(F.priorities.at.x + F.priorities.at.w).toBeLessThan(F.sieve.left);
    expect(bottom(F.page.at)).toBeLessThanOrEqual(F.table.y);
    expect(apart(F.page.at, F.reviews.at)).toBe(true);
    expect(apart(F.tag.at, dot(F.moon.at, F.moon.r))).toBe(true);
  });

  it("26: keeps each panel's words and tag inside it, the summaries apart, and the timeline under both panels", () => {
    G.panels.forEach((panel, i) => {
      for (const part of [G.names[i].at, G.validated[i].at]) expect(part.x >= panel.at.x && part.x + part.w <= panel.at.x + panel.at.w).toBe(true);
      expect(apart(G.names[i].at, G.validated[i].at)).toBe(true);
    });
    const [left, right] = G.panels.map((panel) => panel.at);
    for (const part of [G.tray.at, G.strongFit.at, G.millions.at, ...G.cards.map((card) => ({ ...card.at, x: card.at.x + card.to, y: card.at.y + card.drop }))]) expect(part.x + part.w).toBeLessThanOrEqual(left.x + left.w);
    for (const part of [G.stack.at, G.bills.at, G.summary.at, ...G.turns.map((turn) => ({ ...turn.at, x: turn.at.x + turn.to }))]) {
      expect(part.x).toBeGreaterThanOrEqual(right.x);
      expect(part.x + part.w).toBeLessThanOrEqual(right.x + right.w);
    }
    const summaries = G.turns.map((turn) => ({ ...turn.at, x: turn.at.x + turn.to }));
    for (let i = 1; i < summaries.length; i++) expect(apart(summaries[i - 1], summaries[i])).toBe(true);
    expect(apart(G.stack.at, summaries[0])).toBe(true);
    // Each timeline under its own panel, its words inside the panel's width and apart.
    G.timelines.forEach((timeline, i) => {
      const panel = G.panels[i].at;
      expect(timeline.y - G.r).toBeGreaterThan(bottom(panel));
      const words = timeline.points.map((point) => point.label.at);
      for (const word of words) expect(word.x + word.w).toBeLessThanOrEqual(panel.x + panel.w);
      for (let j = 1; j < words.length; j++) expect(apart(words[j - 1], dot(timeline.points[j].at, G.r))).toBe(true);
    });
    expect(apart(G.strongFit.at, G.millions.at)).toBe(true);
  });

  it("27: keeps the wall, the strip and its words left of the bars, the tag under the bars' baseline", () => {
    const wall = bounds(A.pages.map((page) => page.at));
    expect(Math.max(wall.x + wall.w, A.daysLabel.at.x + A.daysLabel.at.w)).toBeLessThan(A.axis.x0);
    expect(A.tag.at.y).toBeGreaterThan(A.axis.y);
    expect(apart(A.vendorLabel.at, A.vendor.at)).toBe(true);
    expect(bottom(A.top.at)).toBeLessThanOrEqual(A.vendor.at.y);
  });

  it("28: puts the five checks in the pipeline band, clear of its label, and the tiers right of the bands", () => {
    const pipeline = SECURITY.bands[2];
    for (const check of SECURITY.checks) {
      expect(check.at.y).toBeGreaterThanOrEqual(pipeline.at.y);
      expect(bottom(check.at)).toBeLessThanOrEqual(bottom(pipeline.at));
      expect(check.at.x + check.at.w).toBeLessThanOrEqual(pipeline.at.x + pipeline.at.w);
    }
    expect(SECURITY.checks[0].at.x).toBeGreaterThan(pipeline.label.at.x + 220);
    for (const tier of [...SECURITY.tiers.map((entry) => entry.at), SECURITY.empty.at]) expect(tier.x).toBeGreaterThan(pipeline.at.x + pipeline.at.w);
  });

  it("29: keeps the checkpoints' words apart and clear of the branch's two arms and its run", () => {
    const labels = ONESDLC.checkpoints.map((point) => point.label.at);
    for (let i = 1; i < labels.length; i++) expect(apart(labels[i - 1], labels[i])).toBe(true);
    const { split, join, dip } = ONESDLC.branch;
    const arms = [box(split - 2, ONESDLC.line.y, 4, dip - ONESDLC.line.y), box(join - 2, ONESDLC.line.y, 4, dip - ONESDLC.line.y), line(split, join, dip)];
    for (const label of [...labels, ONESDLC.custom.at, ONESDLC.tag.at]) for (const arm of arms) expect(apart(label, arm)).toBe(true);
  });

  it("30: keeps the roles over both groups, and the circles and the results apart", () => {
    const circles = bounds(CHARTER.circles.map((circle) => dot(circle.at, CHARTER.r)));
    const results = bounds(CHARTER.results.map((result) => result.at));
    for (const role of CHARTER.roles) expect(bottom(role.at)).toBeLessThan(Math.min(circles.y, ...CHARTER.heads.map((head) => head.at.y)));
    expect(apart(circles, results)).toBe(true);
    for (const head of CHARTER.heads) expect(apart(head.at, circles) && apart(head.at, results)).toBe(true);
  });

  it("31: keeps each bar's name and figure on one line apart", () => {
    for (const bar of COSTS.bars) expect(bar.name.at.y).toBe(bar.value.at.y);
  });

  it("32: keeps the room, the strip and the shelf apart", () => {
    const strip = bounds(TEACHING.months.map((month) => month.at));
    expect(apart(TEACHING.room.at, strip)).toBe(true);
    for (const item of TEACHING.items) for (const part of [TEACHING.room.at, TEACHING.staff.at, strip, TEACHING.monthsLabel.at]) expect(apart(item.at, part)).toBe(true);
    for (let i = 1; i < TEACHING.items.length; i++) expect(apart(TEACHING.items[i - 1].at, TEACHING.items[i].at)).toBe(true);
  });

  it("33: keeps the shelf, the binders and the stack apart", () => {
    const shelf = bounds([...MODULES.rows, ...MODULES.others].flatMap((row) => row.blocks));
    const binders = bounds(MODULES.binders.map((binder) => binder.at));
    const stack = bounds(MODULES.sheets.map((sheet) => sheet.at));
    expect(apart(shelf, binders)).toBe(true);
    expect(apart(binders, stack)).toBe(true);
    for (let i = 1; i < MODULES.binders.length; i++) expect(apart(MODULES.binders[i - 1].label.at, MODULES.binders[i].label.at)).toBe(true);
    expect(apart(MODULES.binders[3].label.at, MODULES.papers.at)).toBe(true);
  });

  it("34: keeps the frame, the tag, the cards, the feedback and the catalog live apart", () => {
    const parts = [THE_CATALOG.frame.at, THE_CATALOG.tag.at, ...THE_CATALOG.sessions.map((session) => session.at), ...THE_CATALOG.feedback.map((mark) => mark.at), THE_CATALOG.live.at];
    for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) expect(apart(parts[i], parts[j]), `${i} ${j}`).toBe(true);
  });
});

describe("35's table", () => {
  it("fits its eleven rows on the stage, each row's words apart and inside the row", () => {
    expect(CREDENTIAL_ROWS.rows).toHaveLength(11);
    for (const row of CREDENTIAL_ROWS.rows) {
      const words = [row.name.at, ...(row.year ? [row.year.at] : []), row.courses.at];
      for (const word of words) expect(word.y >= row.at.y && bottom(word) <= bottom(row.at), row.key).toBe(true);
      for (let i = 1; i < words.length; i++) expect(words[i].x, row.key).toBeGreaterThanOrEqual(words[i - 1].x + words[i - 1].w);
      expect(row.courses.at.x + row.courses.at.w, row.key).toBeLessThanOrEqual(SAFE.right);
    }
    expect(bottom(CREDENTIAL_ROWS.rows.at(-1)!.at)).toBeLessThanOrEqual(SAFE.bottom);
  });
});
