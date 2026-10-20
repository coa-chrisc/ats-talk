/**
 * Slides 28 to 30, the rules a City team would work under: the four
 * security layers and three tiers, OneSDLC with the RAD branch, and the
 * charter. What each one click does, in the order the script's They see
 * gives, and the picture it ends on.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { SAFE, labelsOf } from "./layout";
import { CHARTER, ONESDLC, SECURITY } from "./layout-rules";
import { at, endOf, inside, markup, overlaps, playOf, playsAt, startOf, stepOf, tagOf } from "./harness";

const storyAt = (pictureId: string, line: 0 | 1) => storyKeys(storyId(pictureId), 2)[line];
const lastStart = (step: string) => Math.max(...playsAt(step).map((play) => play.at));
const increasing = (values: number[]) => values.every((value, i) => i === 0 || value > values[i - 1]);

describe("28, Security", () => {
  const P = stepOf("security");
  const S = SECURITY;
  const after = at(P);

  it("stacks the four bands from the bottom up, tenant controls first and AI controls on top", () => {
    expect(S.bands.map((band) => band.label.text)).toEqual(labelsOf("security").slice(0, 4));
    expect(increasing(S.bands.map((band) => -band.at.y))).toBe(true);
    expect(increasing(S.bands.map((band) => startOf(P, band.key)))).toBe(true);
    for (const band of S.bands) expect(after[band.key], band.key).toMatchObject({ autoAlpha: 1, y: 0 });
  });

  it("runs the pipeline through its band and passes its five checks in turn, each ticked after its box is up", () => {
    const pipeline = S.bands[2].at;
    expect(S.checks).toHaveLength(5);
    expect(S.pipe.y).toBe(pipeline.y + pipeline.h / 2);
    for (const check of S.checks) expect(inside(check.at, pipeline), check.key).toBe(true);
    expect(startOf(P, S.pipe.key)).toBeGreaterThanOrEqual(endOf(P, S.bands[3].key) - 0.5);
    const ticks = S.checks.map((check) => startOf(P, check.tick.key));
    expect(increasing(ticks)).toBe(true);
    S.checks.forEach((check, i) => expect(ticks[i], check.key).toBeGreaterThanOrEqual(endOf(P, check.key)));
    // The ticks are the kit's passed tick, the only deep green on the slide.
    expect(markup.match(/data-build="security\.tick\.\d"/g)).toHaveLength(5);
    // The first story line, which names the layers and the checks, comes up while the checks pass.
    expect(startOf(P, storyAt("security", 0))).toBeGreaterThan(startOf(P, S.pipe.key));
  });

  it("brings the three tiers in after the first story line, the third an empty dashed box that says why", () => {
    const tiers = [...S.tiers.map((tier) => tier.key), S.empty.key];
    expect(tiers).toHaveLength(3);
    expect(increasing(tiers.map((key) => startOf(P, key)))).toBe(true);
    expect(startOf(P, S.tiers[0].key)).toBeGreaterThan(startOf(P, storyAt("security", 0)));
    expect(S.tiers.every((tier) => tier.tools.length === 2)).toBe(true);
    for (const tier of S.tiers) for (const tool of tier.tools) expect(inside(tool.at, tier.at), tool.text).toBe(true);
    expect(tagOf(S.empty.key)).toContain("dk-dashed");
    expect(startOf(P, S.empty.none.key)).toBeGreaterThan(startOf(P, S.empty.name.key));
    expect(inside(S.empty.none.at, S.empty.at)).toBe(true);
    expect(startOf(P, storyAt("security", 1))).toBe(lastStart(P));
  });
});

describe("29, OneSDLC", () => {
  const P = stepOf("onesdlc");
  const O = ONESDLC;
  const after = at(P);

  it("draws the line left to right and shows each of the five stages as the line reaches it", () => {
    expect(O.stages.map((stage) => stage.label.text)).toEqual(labelsOf("onesdlc").slice(0, 5));
    const [line] = playOf(P, O.line.key);
    // The line draws on the house curve, power2.inOut: how much of it is drawn at a moment.
    expect(line.ease).toBe("power2.inOut");
    const drawn = (time: number) => {
      const t = Math.min(1, Math.max(0, (time - line.at) / line.duration));
      return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) ** 2;
    };
    for (const stage of O.stages) {
      const fraction = (stage.at.x - O.line.x0) / (O.line.x1 - O.line.x0);
      expect(drawn(startOf(P, stage.key)), stage.key).toBeCloseTo(fraction, 2);
    }
    expect(increasing(O.stages.map((stage) => stage.at.x))).toBe(true);
  });

  it("branches the custom-builds channel off at Route and brings it back into the line before Run, after the first story line", () => {
    const route = O.stages[1].at;
    const [build, run] = [O.stages[2].at, O.stages[3].at];
    const [, mx, my] = O.branch.d.match(/^M([\d.]+) ([\d.]+)/)!.map(Number);
    expect([mx, my]).toEqual([route.x, route.y + O.r]);
    expect(O.branch.split).toBe(route.x);
    // It comes up into the production review's diamond, between Build and Run.
    expect(O.branch.d).toMatch(new RegExp(`V${O.line.y + O.diamond}$`));
    expect(O.branch.join).toBeGreaterThan(build.x);
    expect(O.branch.join).toBeLessThan(run.x);
    expect(O.branch.dip).toBeGreaterThan(O.line.y);
    expect(startOf(P, O.branch.key)).toBeGreaterThan(startOf(P, storyAt("onesdlc", 0)));
    expect(startOf(P, O.custom.key)).toBeGreaterThan(startOf(P, O.branch.key));
    expect(after[O.branch.key]).toMatchObject({ "--d": 1 });
  });

  it("sets intake on the line before the split, the first-version and pilot reviews on the branch itself, and the production review where it rejoins", () => {
    expect(O.checkpoints.map((point) => point.label.text)).toEqual(labelsOf("onesdlc").slice(6, 10));
    const [intake, first, pilot, production] = O.checkpoints;
    expect(intake.at.y).toBe(O.line.y);
    expect(intake.at.x).toBeGreaterThan(O.stages[0].at.x);
    expect(intake.at.x).toBeLessThan(O.branch.split);
    // The custom-builds branch passes through both reviews: they sit on its run under the line, clear of its bends.
    for (const point of [first, pilot]) {
      expect(point.on, point.key).toBe("branch");
      expect(point.at.y, point.key).toBe(O.branch.dip);
      expect(point.at.x - O.diamond, point.key).toBeGreaterThan(O.branch.split + 40);
      expect(point.at.x + O.diamond, point.key).toBeLessThan(O.branch.join - 40);
    }
    expect([production.at.x, production.at.y]).toEqual([O.branch.join, O.line.y]);
    expect(increasing(O.checkpoints.map((point) => point.at.x))).toBe(true);
    // Each word under its diamond, clear of the others, of the branch's name, and of the branch's rising arm.
    const words = [...O.checkpoints.map((point) => point.label.at), O.custom.at, O.tag.at];
    for (let i = 0; i < words.length; i++) for (let j = i + 1; j < words.length; j++) expect(overlaps(words[i], words[j]), `${i} ${j}`).toBe(false);
    for (const point of [first, pilot]) expect(point.label.at.y, point.key).toBeGreaterThan(O.branch.dip + O.diamond);
    expect(production.label.at.x).toBeGreaterThan(O.branch.join + 4);
    for (const box of words) expect(box.y + box.h, "inside the safe area").toBeLessThanOrEqual(SAFE.bottom);
  });

  it("lands the four checkpoints in turn after the second story line, and ends on the tag", () => {
    expect(increasing(O.checkpoints.map((point) => startOf(P, point.key)))).toBe(true);
    expect(startOf(P, O.checkpoints[0].key)).toBeGreaterThan(startOf(P, storyAt("onesdlc", 1)));
    expect(startOf(P, O.tag.key)).toBe(lastStart(P));
    expect(O.tag.lines).toEqual(["Draft proposes a stand-up in FY27 Q1"]);
    expect(O.tag.lines).toEqual(labelsOf("onesdlc").slice(-1));
  });
});

describe("30, The charter", () => {
  const P = stepOf("charter");
  const C = CHARTER;
  const after = at(P);
  /** The widest line of words set in a circle, and each result's words, measured in Geist at 26 px. */
  const WIDEST_IN_CIRCLE = 227;
  const RESULT_WORDS: Record<string, number> = { "Current-state assessment": 322, "Participation model": 240, Governance: 147, "Learning plan": 167, "Prioritized roadmap": 242 };

  it("brings the two role cards with their people first, then the first story line", () => {
    expect(C.roles).toHaveLength(2);
    expect(increasing(C.roles.map((role) => startOf(P, role.key)))).toBe(true);
    for (const role of C.roles) expect(startOf(P, `${role.key}.person`)).toBeGreaterThan(startOf(P, role.key));
    expect(startOf(P, storyAt("charter", 0))).toBeGreaterThan(startOf(P, C.roles[1].key));
  });

  it("draws four overlapping circles left to right, each word set clear of its neighbours' outlines", () => {
    expect(C.circles).toHaveLength(4);
    expect(increasing(C.circles.map((circle) => startOf(P, circle.key)))).toBe(true);
    expect(startOf(P, C.circles[0].key)).toBeGreaterThan(startOf(P, storyAt("charter", 0)));
    for (let i = 1; i < C.circles.length; i++) {
      const pitch = C.circles[i].at.x - C.circles[i - 1].at.x;
      expect(pitch).toBeLessThan(2 * C.r);
      expect(pitch - C.r, `circle ${i}`).toBeGreaterThanOrEqual(WIDEST_IN_CIRCLE / 2 + 4);
    }
    for (const circle of C.circles) {
      expect(circle.label.at.w, circle.key).toBeGreaterThanOrEqual(WIDEST_IN_CIRCLE);
      expect(after[circle.key], circle.key).toMatchObject({ "--d": 1 });
    }
    // Clear of the role cards above and the results below.
    for (const circle of C.circles) {
      const disc = { x: circle.at.x - C.r, y: circle.at.y - C.r, w: 2 * C.r, h: 2 * C.r };
      for (const other of [...C.roles.map((role) => role.at), ...C.results.map((result) => result.at)]) expect(overlaps(disc, other), circle.key).toBe(false);
    }
  });

  it("sets the circles and the results as two groups apart, each under a heading in the second story line's words", () => {
    expect(C.heads.map((head) => head.lines)).toEqual([["four activities"], ["five initial results"]]);
    for (const head of C.heads) expect(tagOf(head.key)).toContain("backup-label--head");
    const [activities, initial] = C.heads.map((head) => head.at);
    const right = Math.max(...C.circles.map((circle) => circle.at.x + C.r));
    const column = C.results.map((result) => result.at);
    // The results stand in their own column, well right of the last circle.
    for (const result of column) expect(result.x, "apart from the circles").toBeGreaterThanOrEqual(right + 96);
    // Each heading sits over its own group, clear of it and of the other group.
    expect(activities.y + activities.h).toBeLessThanOrEqual(Math.min(...C.circles.map((circle) => circle.at.y - C.r)));
    expect(activities.x + activities.w).toBeLessThan(column[0].x);
    expect(initial.x).toBe(column[0].x);
    expect(initial.y + initial.h).toBeLessThanOrEqual(column[0].y);
    for (const head of C.heads) for (const role of C.roles) expect(overlaps(head.at, role.at)).toBe(false);
  });

  it("lines up the five results last, one under another, each card wide enough for its words with room each side, inside the safe area", () => {
    expect(C.results.map((result) => result.text)).toEqual(labelsOf("charter").slice(-5));
    for (const result of C.results) {
      expect(result.at.w, result.text).toBeGreaterThanOrEqual(RESULT_WORDS[result.text] + 48);
      expect(result.at.x).toBeGreaterThanOrEqual(SAFE.left);
      expect(result.at.x + result.at.w).toBeLessThanOrEqual(SAFE.right);
      expect(result.at.y + result.at.h).toBeLessThanOrEqual(SAFE.bottom);
    }
    for (let i = 1; i < C.results.length; i++) expect(C.results[i].at.y).toBeGreaterThan(C.results[i - 1].at.y + C.results[i - 1].at.h);
    expect(startOf(P, C.heads[0].key)).toBeLessThanOrEqual(startOf(P, C.circles[0].key));
    expect(startOf(P, C.heads[1].key)).toBeGreaterThan(startOf(P, storyAt("charter", 1)));
    expect(increasing(C.results.map((result) => startOf(P, result.key)))).toBe(true);
    expect(startOf(P, C.results[0].key)).toBeGreaterThan(startOf(P, C.heads[1].key));
    expect(startOf(P, C.results[4].key)).toBe(lastStart(P));
    for (const result of C.results) expect(after[result.key], result.key).toMatchObject({ autoAlpha: 1, y: 0 });
  });
});
