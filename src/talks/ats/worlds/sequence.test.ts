import { compile } from "@/components/deck/engine/compile";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { WORLD_ENTRIES } from ".";
import { MAX_BUILD_SECONDS, TEXT_TO_VISUAL_PAUSE, textFirst } from "./sequence";

describe("every slide separates reading from diagram motion", () => {
  for (const { world } of WORLD_ENTRIES) for (const step of world.steps) it(`${world.id}/${step.id}`, () => {
    const [id, click] = step.id.split(".");
    const compiled = compile(world);
    const plays = compiled.plays[world.steps.indexOf(step)];
    const html = renderToStaticMarkup(createElement(world.Scene));
    const counts = [...html.matchAll(/data-build="([^"]+)"/g)].reduce<Record<string, number>>((all, m) => ({...all, [m[1]]: (all[m[1]] ?? 0) + 1}), {});
    const timed = plays.filter(p => "key" in p).map(p => ({...p, end: p.at + p.duration + p.stagger * Math.max(0, (counts[p.key] ?? 1) - 1)}));
    const title = timed.filter(p => p.key === `title.${id}`);
    const text = timed.filter(p => p.key.startsWith(`story.${id}.`));
    const diagram = timed.filter(p => p.key.startsWith(`${id}.`) && p.key !== `title.${id}` && !p.key.endsWith(".html") && !p.key.endsWith(".marks") && !p.key.endsWith(".context"));
    expect(text).toHaveLength(id === "community" ? 1 : 2);
    for (const t of text) { expect(t.at).toBe(text[0].at); expect(t.end).toBe(text[0].end); }
    if (title.length) expect(Math.min(...diagram.map(p => p.at), ...text.map(p => p.at))).toBeGreaterThan(Math.max(...title.map(p => p.end)));
    if (textFirst(id, click)) {
      expect(Math.min(...diagram.map(p => p.at)) - text[0].end).toBeCloseTo(TEXT_TO_VISUAL_PAUSE);
    } else {
      const visual = diagram.filter(p => id !== "lets-talk" || !p.key.endsWith(".foot"));
      expect(text[0].at - Math.max(...visual.map(p => p.end))).toBeGreaterThanOrEqual(0.4);
      expect(Math.max(...timed.map(p => p.end))).toBeCloseTo(text[0].end);
    }
    expect(Math.max(...timed.map(p => p.end))).toBeLessThanOrEqual(MAX_BUILD_SECONDS);
  });
});

// A short transition is intentional here; do not restore a word-count reading hold.
it("keeps the text-to-animation pause short throughout the deck", () => {
  expect(TEXT_TO_VISUAL_PAUSE).toBe(0.6);
});
