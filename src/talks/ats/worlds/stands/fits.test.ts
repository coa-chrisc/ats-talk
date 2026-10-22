/**
 * Slide 14, the controls already in the sandbox: the foundation as four
 * stacked slabs and no rule or bracket round them, nor any green tick at a
 * row's end; the agent's boundary the deck's grey dash; its four controls
 * drawn as the deck's gate, tool screen, member of staff with the orange
 * mark and record, each clear of the right-hand heading; every row of words
 * clear of every other and of every drawing; and the foundation down
 * before the agent comes.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { box, type Box } from "@/components/deck/kit";
import { bottom, endOf, markup, overlaps, right, startOf, stepOf, tagOf } from "./harness";
import { DRAW_FOOT, SAFE } from "./layout";
import { FITS, fitsGlyphs, fitsRows } from "./layout-fits";

const F = FITS;
const id = stepOf("fits");
const own = markup.slice(markup.indexOf(`data-build="${F.marks}"`), markup.indexOf(`data-build="fleet.marks"`));
const rows = fitsRows();
const row = (key: string) => rows.find((entry) => entry.key === key)!.box;
/** The element a row is set in: its own, or, for a row of several, theirs. */
const elementOf = (key: string) => (tagOf(key) ? key : key.replace(/\.\d+$/, ""));
const css = readFileSync(join(import.meta.dirname, "stands-control.css"), "utf8");
const grow = (b: Box, by: number): Box => box(b.x - by, b.y - by, b.w + 2 * by, b.h + 2 * by);

describe("slide 14's drawing", () => {
  it("stacks the foundation as four slabs, with no rule, bracket or green tick round its rows", () => {
    expect(F.layers).toHaveLength(4);
    for (const layer of F.layers) expect(tagOf(layer.key), layer.key).toContain('class="sn-fits__slab"');
    for (let i = 1; i < 4; i++) expect(F.layers[i].at.y).toBeGreaterThan(bottom(F.layers[i - 1].at));
    expect(own).not.toMatch(/ stroke="| stroke-dasharray="/);
    const drawn = new Set([...own.matchAll(/<path class="([^"]+)"/g)].map((match) => match[1]));
    expect([...drawn].sort()).toEqual(["dk-draw", "sn-agent__body", "sn-agent__mouth", "sn-closed-gate__bar", "sn-closed-gate__post", "sn-ledger__line dk-draw", "sn-route dk-draw", "sn-tool__socket dk-draw"]);
    expect(own.match(/<path /g)?.length).toBe(own.match(/<path class="/g)?.length);
  });

  it("draws the agent's boundary in the deck's grey dash", () => {
    expect(tagOf(F.boundary.key)).toContain('class="sn-fits__boundary"');
    const rule = css.match(/\.sn-fits__boundary\s*\{([^}]*)\}/)![1];
    expect(rule).toMatch(/stroke:\s*var\(--dk-soft\)/);
    expect(rule).toMatch(/stroke-dasharray:\s*10 8/);
    expect(rule).toMatch(/stroke-width:\s*3/);
  });

  it("draws the four controls as the deck's gate, tool screen, member of staff with the orange mark, and record", () => {
    expect(tagOf(F.gate.key)).toContain('class="sn-closed-gate"');
    expect(tagOf(F.screen.key)).toContain('class="sn-tool"');
    expect(tagOf(F.approval.key)).toContain('class="dk-person"');
    expect(own.slice(0, own.indexOf(`data-build="${F.approval.key}"`)).endsWith('<g class="sn-staff"><g class="dk-person" ')).toBe(true);
    expect(tagOf(F.approval.mark.key)).toContain('class="dk-human"');
    expect(tagOf(F.record.key)).toContain("sn-ledger");
    expect(F.record.lines).toHaveLength(4);
    expect(tagOf(F.agent.key)).toContain('class="sn-agent"');
    expect(own).not.toMatch(/<circle[^>]*r="22"/);
  });

  it("draws each control at least 56 px tall, so it reads from the back of the room", () => {
    for (const { key, box: b } of fitsGlyphs().filter((glyph) => glyph.key.startsWith("fits.control.") && !glyph.key.endsWith(".mark"))) expect(b.h, key).toBeGreaterThanOrEqual(56);
  });

  it("keeps the right-hand heading clear of the controls' names under it", () => {
    const heading = row(F.define.key);
    for (const control of [F.gate, F.screen]) expect(row(`${control.name.key}.0`).y - bottom(heading), control.key).toBeGreaterThanOrEqual(24);
  });

  it("keeps every row of words clear of every other and of every drawing, and the whole inside the safe area", () => {
    for (let i = 0; i < rows.length; i++) {
      for (let j = i + 1; j < rows.length; j++) {
        const same = elementOf(rows[i].key) === elementOf(rows[j].key);
        if (!same) expect(overlaps(grow(rows[i].box, 4), rows[j].box), `${rows[i].key} / ${rows[j].key}`).toBe(false);
      }
    }
    const glyphs = fitsGlyphs();
    for (const entry of rows) {
      for (const glyph of glyphs.filter((g) => !g.key.startsWith("fits.layer."))) expect(overlaps(grow(entry.box, 6), glyph.box), `${entry.key} / ${glyph.key}`).toBe(false);
    }
    for (const layer of F.layers) {
      for (const words of [row(layer.name.key), row(layer.scope.key)]) {
        expect(words.x, layer.key).toBeGreaterThanOrEqual(layer.at.x + 16);
        expect(right(words), layer.key).toBeLessThanOrEqual(right(layer.at) - 16);
      }
    }
    for (const b of [...rows.map((entry) => entry.box), ...glyphs.map((glyph) => glyph.box)]) {
      expect(b.x).toBeGreaterThanOrEqual(SAFE.left);
      expect(right(b)).toBeLessThanOrEqual(SAFE.right);
      expect(bottom(b)).toBeLessThanOrEqual(DRAW_FOOT);
    }
  });

  it("sets every row of words with the anchor its layout measures it by", () => {
    for (const entry of rows) {
      const key = elementOf(entry.key);
      expect(tagOf(key), key).toContain(`text-anchor="${entry.anchor}"`);
    }
  });

  it("runs each spoke from the agent's side to 16 px short of its control", () => {
    const targets = [F.gate.paths.at, F.screen.at, F.approval.at, F.record.at];
    F.spokes.forEach((spoke, i) => {
      const [x0, x1] = [...spoke.d.matchAll(/[ML]([\d.]+) /g)].map((match) => Number(match[1]));
      const left = i % 2 === 0;
      expect(Math.abs(x0 - (left ? F.agent.box.x : right(F.agent.box))), spoke.key).toBeLessThanOrEqual(5);
      expect(left ? x1 - right(targets[i]) : targets[i].x - x1, spoke.key).toBeCloseTo(16, 0);
    });
  });
});

describe("slide 14's click", () => {
  it("lays the whole foundation before the agent comes, and each control only as its spoke reaches it", () => {
    const stacked = Math.max(...F.layers.flatMap((layer) => [endOf(id, layer.key), endOf(id, layer.name.key), endOf(id, layer.scope.key)]));
    expect(startOf(id, F.agent.key)).toBeGreaterThanOrEqual(stacked);
    expect(startOf(id, F.boundary.key)).toBeGreaterThanOrEqual(stacked);
    for (let i = 1; i < 4; i++) expect(startOf(id, F.layers[i].key)).toBeGreaterThan(startOf(id, F.layers[i - 1].key));
    const controls = [F.gate.key, F.screen.key, F.approval.key, F.record.key];
    F.spokes.forEach((spoke, i) => expect(startOf(id, controls[i]), controls[i]).toBeGreaterThanOrEqual(endOf(id, spoke.key) - 1e-9));
    expect(startOf(id, F.approval.mark.key)).toBeGreaterThan(startOf(id, F.approval.key));
    expect(startOf(id, F.conclusion.key)).toBeGreaterThanOrEqual(Math.max(...F.record.lines.map((line) => endOf(id, line.key))));
  });
});
