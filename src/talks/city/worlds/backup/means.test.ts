/**
 * Slides 31 to 33, what a City team would work with: what building costs,
 * how the teaching spreads, and the parts that already exist. What each one
 * click does, in the order the script's They see gives, and the picture it
 * ends on.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { labelsOf } from "./layout";
import { COSTS, MODULES, TEACHING } from "./layout-means";
import { at, endOf, inside, markup, overlaps, playsAt, startOf, stepOf, tagOf } from "./harness";

const storyAt = (pictureId: string, line: 0 | 1) => storyKeys(storyId(pictureId), 2)[line];
const lastStart = (step: string) => Math.max(...playsAt(step).map((play) => play.at));
const increasing = (values: number[]) => values.every((value, i) => i === 0 || value > values[i - 1]);

describe("31, Costs", () => {
  const P = stepOf("costs");
  const K = COSTS;
  const after = at(P);
  const [sandbox, pilot, vendor, licensing] = K.bars;
  /** A track is $500,000 long. */
  const px = (dollars: number) => (dollars / 500_000) * sandbox.track.w;

  it("draws every bar on one scale: the two costs we pay as slivers, the comparisons as ranges from their low figure", () => {
    for (const b of K.bars) expect(b.track.w, b.key).toBe(sandbox.track.w);
    // $890 and $200 are a pixel or less at this scale, so each is the 4 px sliver, from the track's start.
    for (const b of [sandbox, pilot]) {
      expect(px(890)).toBeLessThan(4);
      expect(b.bar).toMatchObject({ x: b.track.x, w: 4 });
      expect(b.tone, b.key).toBe("green");
    }
    expect(vendor.bar.x - vendor.track.x).toBeCloseTo(px(100_000), 0);
    expect(vendor.bar.x + vendor.bar.w).toBe(vendor.track.x + vendor.track.w);
    expect(licensing.bar.x - licensing.track.x).toBeCloseTo(px(50_000), 0);
    expect(licensing.bar.x + licensing.bar.w).toBe(licensing.track.x + licensing.track.w);
    expect(vendor.tone).toBe("grey");
    // Licensing avoided is a benefit, not a problem: a navy outlined range, never grey.
    expect(licensing.tone).toBe("navy");
    expect(markup).toContain("backup-bar__body--navy");
    expect([sandbox.value.text, licensing.name.text]).toEqual(["$890 a month", "Licensing avoided"]);
    // Only the failed vendor project runs on past the track, dashed: its figure is "or more".
    expect(vendor.more).toBeDefined();
    expect(licensing.more).toBeUndefined();
    expect(vendor.value.text).toMatch(/or more$/);
    expect(markup).toContain(`class="backup-more" data-build="${vendor.more!.key}"`);
  });

  it("brings what we spend first, then the first story line, then the comparisons, each bar growing after its track shows", () => {
    expect(K.heads.map((head) => head.text)).toEqual([labelsOf("costs")[0], labelsOf("costs")[5]]);
    const starts = K.bars.map((b) => startOf(P, b.key));
    expect(increasing(starts)).toBe(true);
    expect(startOf(P, storyAt("costs", 0))).toBeGreaterThan(starts[1]);
    expect(startOf(P, storyAt("costs", 0))).toBeLessThan(starts[2]);
    expect(startOf(P, K.heads[1].key)).toBeGreaterThan(startOf(P, storyAt("costs", 0)));
    for (const b of K.bars) expect(after[b.key], b.key).toMatchObject({ autoAlpha: 1, "--k": 1 });
    expect(startOf(P, vendor.more!.key)).toBeGreaterThanOrEqual(endOf(P, vendor.key));
  });

  it("ends on the projected tag under the comparisons, dashed and grey, the click's last move", () => {
    expect(K.tag.lines).toEqual(labelsOf("costs").slice(-1));
    expect(tagOf(K.tag.key)).toContain("backup-tag--projected");
    expect(K.tag.at.y).toBeGreaterThan(licensing.track.y + licensing.track.h);
    expect(K.tag.at.x).toBe(licensing.track.x);
    expect(startOf(P, K.tag.key)).toBe(lastStart(P));
    expect(startOf(P, K.tag.key)).toBeGreaterThan(startOf(P, storyAt("costs", 1)));
  });
});

describe("32, Teaching", () => {
  const P = stepOf("teaching");
  const T = TEACHING;
  const after = at(P);

  it("draws the room and fills it with navy seats row by row from the front, then names how many come", () => {
    expect(markup).toMatch(/class="backup-seat"/);
    expect(markup).not.toMatch(/backup-seat[^"]*--(grey|green)/);
    expect(T.rows.every((row) => row.seats.every((seat) => inside(seat, T.room.at)))).toBe(true);
    expect(increasing(T.rows.map((row) => row.seats[0].y))).toBe(true);
    expect(increasing(T.rows.map((row) => startOf(P, row.key)))).toBe(true);
    expect(startOf(P, T.rows[0].key)).toBeGreaterThan(startOf(P, T.room.key));
    expect(startOf(P, T.staff.key)).toBeGreaterThan(startOf(P, T.rows[T.rows.length - 1].key));
    expect(T.staff.text).toBe(labelsOf("teaching")[0]);
    expect(after[T.room.key]).toMatchObject({ "--d": 1 });
  });

  it("lays out four months left to right and lights one workshop day in each, in turn", () => {
    expect(T.months).toHaveLength(4);
    expect(increasing(T.months.map((month) => month.at.x))).toBe(true);
    expect(increasing(T.months.map((month) => startOf(P, month.key)))).toBe(true);
    const lit = T.months.map((month) => startOf(P, month.workshop.key));
    expect(increasing(lit)).toBe(true);
    T.months.forEach((month, i) => {
      expect(month.days).toContainEqual(month.workshop.at);
      expect(lit[i], month.key).toBeGreaterThanOrEqual(startOf(P, month.key));
      expect(after[month.workshop.key], month.key).toMatchObject({ autoAlpha: 1 });
    });
    expect(startOf(P, T.series.key)).toBeGreaterThan(startOf(P, storyAt("teaching", 0)));
    expect(startOf(P, T.monthsLabel.key)).toBeGreaterThan(lit[0]);
  });

  it("puts the shelf's four items on it in the script's order, clear of each other, the second story line coming up as they arrive", () => {
    expect(T.items.map((item) => item.text)).toEqual(["Nine-part course", "AI Quickstart Guide", "Public Health AI Network", "GovTechAI"]);
    expect(T.items.map((item) => item.text)).toEqual(labelsOf("teaching").slice(3));
    // Each item wide enough for its words (measured in Geist, semibold, 26 px) and 40 px of room.
    T.items.forEach((item, i) => expect(item.at.w, item.text).toBeGreaterThanOrEqual([211, 242, 311, 133][i] + 40));
    expect(increasing(T.items.map((item) => item.at.x))).toBe(true);
    for (const item of T.items) expect(item.at.y + item.at.h, item.key).toBe(T.shelf.y - 4);
    for (let i = 1; i < T.items.length; i++) expect(overlaps(T.items[i - 1].at, T.items[i].at)).toBe(false);
    expect(increasing(T.items.map((item) => startOf(P, item.key)))).toBe(true);
    expect(startOf(P, T.items[0].key)).toBeGreaterThan(startOf(P, T.shelf.key));
    expect(startOf(P, T.shelf.key)).toBeGreaterThanOrEqual(endOf(P, T.monthsLabel.key) - 0.6);
    for (const item of T.items) expect(after[item.key], item.key).toMatchObject({ autoAlpha: 1, x: 0 });
    expect(startOf(P, storyAt("teaching", 1))).toBeGreaterThan(startOf(P, T.shelf.key));
    expect(startOf(P, T.items[3].key)).toBe(lastStart(P));
  });
});

describe("33, What exists", () => {
  const P = stepOf("what-exists");
  const M = MODULES;
  const after = at(P);

  it("draws 145 modules: the six named categories to their counts, each named, and the seven smaller ones as one neat block under them", () => {
    expect(M.rows).toHaveLength(6);
    expect(M.rows.map((row) => row.blocks.length)).toEqual([31, 25, 16, 16, 13, 8]);
    expect(M.rows.map((row) => row.label.text)).toEqual(labelsOf("what-exists").slice(0, 6));
    expect(M.others).toHaveLength(3);
    expect(M.others.every((row) => row.blocks.length === 12)).toBe(true);
    expect([...M.rows, ...M.others].reduce((sum, row) => sum + row.blocks.length, 0)).toBe(145);
    // The block is square-edged: its rows the same length, starting where the named rows start, and stacked tight.
    for (const row of M.others) expect(row.blocks[0].x).toBe(M.rows[0].blocks[0].x);
    for (let i = 1; i < M.others.length; i++) expect(M.others[i].blocks[0].y - M.others[i - 1].blocks[0].y).toBe(M.others[0].blocks[1].x - M.others[0].blocks[0].x);
    const all = [...M.rows, ...M.others];
    expect(increasing(all.map((row) => row.blocks[0].y))).toBe(true);
    // Its label sits level with the block's middle row, and the total under the block.
    const middle = M.others[1].blocks[0];
    expect(M.other.at.y + M.other.at.h / 2).toBe(middle.y + middle.h / 2);
    expect(M.total.at.y).toBeGreaterThan(M.others[2].blocks[0].y + M.others[2].blocks[0].h);
  });

  it("fills the rows one under another, then names the smaller ones and the total, the first story line coming up as they fill", () => {
    const all = [...M.rows, ...M.others];
    expect(increasing(all.map((row) => startOf(P, row.key)))).toBe(true);
    for (const row of all) expect(after[row.key], row.key).toMatchObject({ autoAlpha: 1, "--k": 1 });
    expect(startOf(P, M.other.key)).toBeGreaterThan(startOf(P, M.others[0].key));
    expect(startOf(P, M.total.key)).toBeGreaterThan(startOf(P, M.others[2].key));
    expect(startOf(P, storyAt("what-exists", 0))).toBeGreaterThan(startOf(P, M.rows[0].key));
    expect(startOf(P, storyAt("what-exists", 0))).toBeLessThan(startOf(P, M.binders[0].key));
  });

  it("stands the four binders up left to right after the first story line, then settles six papers into a stack from the bottom up, ending on their label", () => {
    expect(M.binders.map((binder) => binder.label.text)).toEqual(labelsOf("what-exists").slice(8, 12));
    expect(increasing(M.binders.map((binder) => startOf(P, binder.key)))).toBe(true);
    expect(startOf(P, M.binders[0].key)).toBeGreaterThan(startOf(P, storyAt("what-exists", 0)));
    expect(M.sheets).toHaveLength(6);
    // Each paper sits a step up and to the left of the one under it, and lands after it.
    for (let i = 1; i < M.sheets.length; i++) {
      expect(M.sheets[i].at.x).toBeLessThan(M.sheets[i - 1].at.x);
      expect(M.sheets[i].at.y).toBeLessThan(M.sheets[i - 1].at.y);
    }
    expect(increasing(M.sheets.map((sheet) => startOf(P, sheet.key)))).toBe(true);
    for (const sheet of M.sheets) expect(after[sheet.key], sheet.key).toMatchObject({ autoAlpha: 1, y: 0 });
    // The stack stands on the binders' baseline.
    expect(M.sheets[0].at.y + M.sheets[0].at.h).toBe(M.binders[0].at.y + M.binders[0].at.h);
    expect(startOf(P, M.papers.key)).toBeGreaterThan(startOf(P, M.sheets[5].key));
    expect(startOf(P, storyAt("what-exists", 1))).toBeGreaterThan(startOf(P, M.binders[3].key));
    expect(startOf(P, M.papers.key)).toBe(lastStart(P));
  });
});
