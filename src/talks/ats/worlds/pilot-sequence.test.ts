import { compile } from "@/components/deck/engine/compile";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { WORLD_ENTRIES } from ".";
import { PILOT_IDS, TEXT_TO_VISUAL_PAUSE } from "./pilot-sequence";

describe("the three pilot slides separate reading and diagram motion", () => {
  for (const id of PILOT_IDS) it(id, () => {
    const { world } = WORLD_ENTRIES.find(entry => entry.world.steps.some(s => s.id === `${id}.play`))!;
    const compiled = compile(world);
    const plays = compiled.plays[world.steps.findIndex(s => s.id === `${id}.play`)];
    const html = renderToStaticMarkup(createElement(world.Scene));
    const counts = [...html.matchAll(/data-build="([^"]+)"/g)].reduce<Record<string, number>>((all, m) => ({...all, [m[1]]: (all[m[1]] ?? 0) + 1}), {});
    const timed = plays.filter(p => "key" in p).map(p => ({...p, end: p.at + p.duration + p.stagger * Math.max(0, (counts[p.key] ?? 1) - 1)}));
    const title = timed.filter(p => p.key === `title.${id}`);
    const text = timed.filter(p => p.key.startsWith(`story.${id}.`));
    const diagram = timed.filter(p => p.key.startsWith(`${id}.`));
    expect(text).toHaveLength(2);
    expect(text[0].at).toBe(text[1].at);
    expect(text[0].end).toBe(text[1].end);
    expect(Math.min(...diagram.map(p => p.at), ...text.map(p => p.at))).toBeGreaterThan(Math.max(...title.map(p => p.end)));
    if (id === "earn") {
      expect(Math.min(...diagram.map(p => p.at)) - text[0].end).toBeCloseTo(TEXT_TO_VISUAL_PAUSE);
    } else {
      expect(text[0].at - Math.max(...diagram.map(p => p.end))).toBeGreaterThanOrEqual(0.4);
      expect(Math.max(...timed.map(p => p.end))).toBe(text[0].end);
    }
  });
});
