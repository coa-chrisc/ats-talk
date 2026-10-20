/**
 * Slides 10 to 12, the proof: the two tools in daily use fill with the
 * process's green; each commission's tag sits under its own name, and the
 * practitioner group is a ring of people round a navy rule on the outer
 * ring; the coalition's plaque carries what we built with it, and the last
 * plaque its four names.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { labelsOf } from "./layout";
import { PORTFOLIO, RECOGNITION, SEEN } from "./layout-proof";
import { at, clickOf, markup, overlaps, startOf, tagOf } from "./harness";

const sheet = readFileSync(join(import.meta.dirname, "built-proof.css"), "utf8");

describe("slide 10, what we have built", () => {
  it("fills the two tiles in daily use with the process's green at the active tint, the others left plain", () => {
    const end = at(clickOf("portfolio"));
    const inUse = PORTFOLIO.tiles.filter((tile) => tile.inUse);
    expect(inUse).toHaveLength(2);
    for (const tile of PORTFOLIO.tiles) {
      expect(end[tile.key]["--k"] ?? 0, tile.key).toBe(tile.inUse ? 1 : 0);
      expect(tagOf(tile.key).includes("built-tile--in-use"), tile.key).toBe(tile.inUse);
    }
    const rule = sheet.match(/\.built-tile \{[^}]*\}/)?.[0] ?? "";
    expect(rule).toMatch(/background: color-mix\(in srgb, var\(--dk-process\) calc\(var\(--k, 0\) \* var\(--dk-tint-active\) \* 100%\), var\(--dk-night\)\)/);
    // Not navy: nothing fills with the people's colour as it lights.
    expect(sheet).not.toMatch(/var\(--dk-paper\) calc\(var\(--k/);
  });
});

describe("slide 11, who has seen it", () => {
  const [, health, , tech] = labelsOf("seen");

  it("tags each commission directly under its own name, centred on it, clear of every other name", () => {
    expect(SEEN.named.slice(0, 2).map((dot) => dot.name.text)).toEqual([health, tech]);
    SEEN.askedBack.forEach((tag, i) => {
      const name = SEEN.named[i].name.at;
      expect(tag.at.x + tag.at.w / 2, tag.key).toBeCloseTo(name.x + name.w / 2, 0);
      expect(tag.at.y - (name.y + name.h), tag.key).toBe(8);
      for (const other of SEEN.named) expect(overlaps(tag.at, other.name.at), `${tag.key} ${other.key}`).toBe(false);
    });
  });

  it("forms the practitioner group on the outer ring, round a navy rule drawn as it forms", () => {
    const { centre } = SEEN.practitioners;
    const outer = SEEN.named.map((dot) => dot.at);
    // The ring the named groups sit on: its middle is the stage's middle dot, and the group sits at its foot.
    const rx = Math.max(...outer.map((p) => Math.abs(p.x - SEEN.centre.at.x)));
    const ry = Math.max(...outer.map((p) => Math.abs(p.y - SEEN.centre.at.y)));
    expect(((centre.x - SEEN.centre.at.x) / rx) ** 2 + ((centre.y - SEEN.centre.at.y) / ry) ** 2).toBeCloseTo(1, 2);
    expect(tagOf(SEEN.practitioners.rule.key)).toMatch(/class="built-group dk-draw"/);
    expect(tagOf(SEEN.practitioners.spoke.key)).toMatch(/class="built-spoke/);
    expect(sheet).toMatch(/\.built-group \{[^}]*stroke: var\(--dk-paper\)/);
    const click = clickOf("seen");
    expect(at(click)[SEEN.practitioners.rule.key]["--d"]).toBe(1);
    expect(startOf(click, SEEN.practitioners.rule.key)).toBeLessThan(startOf(click, SEEN.practitioners.key));
  });
});

describe("slide 12, recognition", () => {
  const [, , , coalition, invited, work, ...hosts] = labelsOf("recognition");

  it("puts what we built with the coalition under the coalition's plaque, and only the four names on the last", () => {
    const [, , , fourth, fifth] = RECOGNITION.plaques;
    expect(fourth.text).toBe(coalition);
    expect(fourth.hosts).toEqual([work]);
    expect(fifth.text).toBe(invited);
    expect(fifth.hosts).toEqual(hosts);
    expect(hosts).toHaveLength(4);
    const open = (key: string) => markup.indexOf(`data-build="${key}"`);
    const sub = markup.indexOf(`>${work}<`);
    expect(sub).toBeGreaterThan(open(fourth.key));
    expect(sub).toBeLessThan(open(fifth.key));
  });

  it("hangs the five plaques centred on the stage, the fifth as far from the right edge as the first from the left", () => {
    const first = RECOGNITION.plaques[0].at;
    const last = RECOGNITION.plaques[4].at;
    expect((first.x + last.x + last.w) / 2).toBe(960);
  });
});
