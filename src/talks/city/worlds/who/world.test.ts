/**
 * Part 1 as a whole: its three slides in order, one click each, every word
 * from the script, the house rules (12 s, words, colour, motion, carries)
 * and the story lines. Each slide's beats are tested in beats.test.ts and
 * its places in layout.test.ts; what they share is in harness.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { compile } from "@/components/deck/engine/compile";
import { HOME } from "@/components/deck/engine/camera";
import { CHAIN } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { LEAVE, compiled, keyOf, markup, onStage, parts, pictures, stateAfter, stepIndex, texts, timesOf, world } from "./harness";
import { TITLES, storyKeysOf, titleKey } from "./layout";
import { COUNTS } from "./moves";
import { ARRIVE } from "./steps-who";

const dir = import.meta.dirname;
const sources = readdirSync(dir)
  .filter((name) => /\.(tsx?|css)$/.test(name) && !name.endsWith(".test.ts") && name !== "harness.ts")
  .map((name) => ({ name, text: readFileSync(join(dir, name), "utf8") }));
const css = sources.find((source) => source.name === "who.css")!.text;

describe("the who world", () => {
  it("holds the script's three pictures of Part 1, one click each, in the script's order", () => {
    expect(pictures.map((picture) => picture.id)).toEqual(["title", "career", "learning"]);
    expect(world.steps.map((step) => step.id)).toEqual(pictures.flatMap((picture) => picture.steps.map((step) => `${picture.id}.${step.id}`)));
  });

  it("compiles, with a starting value for everything a step moves", () => {
    expect(() => compile(world)).not.toThrow();
  });

  it("names only parts the scene has", () => {
    expect(compiled.keys.filter((key) => !parts[key])).toEqual([]);
  });

  it("moves every part the scene has, so nothing sits on the stage all talk", () => {
    expect(Object.keys(parts).filter((key) => !compiled.keys.includes(key))).toEqual([]);
  });

  it("gives every part one element, but a title's lines", () => {
    expect(Object.entries(parts).filter(([key, count]) => count !== (COUNTS[key] ?? 1))).toEqual([]);
    expect(Object.entries(COUNTS).filter(([key, count]) => parts[key] !== count)).toEqual([]);
  });

  it("finishes every click inside 12 s, the first counting the world's arrival fade", () => {
    world.steps.forEach((step, i) => {
      const end = Math.max(0, ...compiled.plays[i].map((play) => play.at + play.duration + play.stagger * Math.max(0, ("key" in play ? parts[play.key] : 1) - 1)));
      expect(end + (i === 0 ? LEAVE : 0), step.id).toBeLessThanOrEqual(CHAIN.longest);
    });
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    expect(Math.min(...timesOf("title").map((play) => play.at))).toBe(ARRIVE);
  });

  it("keeps the camera at home", () => {
    for (const step of world.steps) expect(step.moves.some((move) => "camera" in move), step.id).toBe(false);
    for (const camera of compiled.cameras) expect(camera).toEqual(HOME);
  });

  it("sets slide 1 on navy and the other two on the deck's white", () => {
    expect(world.steps.map((step) => step.ground)).toEqual(["navy", undefined, undefined]);
  });

  it("clears each slide's picture before the next one: on a slide's click only its own parts are on the stage, nothing carried", () => {
    for (const picture of pictures) {
      const own = new Set(world.steps[stepIndex(picture.id)].moves.flatMap((move) => ("key" in move ? [move.key] : [])));
      const strays = compiled.keys.filter((key) => onStage(stateAfter(picture.id), key) && !own.has(key));
      expect(strays, picture.id).toEqual([]);
    }
  });

  it("shows each slide's title through its click and no other title", () => {
    for (const picture of pictures) {
      const showing = TITLES.filter((title) => onStage(stateAfter(picture.id), title.key)).map((title) => title.picture);
      expect(showing, picture.id).toEqual([picture.id]);
    }
  });

  it("changes the title at the start of each click after the first", () => {
    for (const [n, picture] of pictures.entries()) {
      if (n === 0) continue;
      const plays = timesOf(picture.id);
      const gone = plays.find((play) => keyOf(play) === titleKey(pictures[n - 1].id));
      const comes = plays.find((play) => keyOf(play) === titleKey(picture.id));
      expect(gone?.at, picture.id).toBe(0);
      expect(comes!.at, picture.id).toBeLessThan(0.5);
    }
  });
});

describe("the story lines", () => {
  it("come up inside their own slide's click, A before B, and are gone on the next", () => {
    for (const [n, picture] of pictures.entries()) {
      const keys = storyKeysOf(picture.id);
      expect(keys, picture.id).toHaveLength(2);
      const plays = timesOf(picture.id);
      const up = keys.map((key) => plays.filter((play) => keyOf(play) === key && "on" in play && play.on.yPercent === 0));
      for (const [i, list] of up.entries()) expect(list, keys[i]).toHaveLength(1);
      expect(up[1][0].at, picture.id).toBeGreaterThan(up[0][0].at);
      for (const key of keys) expect(onStage(stateAfter(picture.id), key), key).toBe(true);
      const next = pictures[n + 1];
      if (next) for (const key of keys) expect(onStage(stateAfter(next.id), key), `${key} on ${next.id}`).toBe(false);
    }
  });

  it("are set word for word as the script gives them, whole or over rows that follow each other", () => {
    const runs = texts.flatMap((_, i) => Array.from({ length: Math.min(4, texts.length - i) }, (_, n) => texts.slice(i, i + n + 1).join(" ")));
    for (const picture of pictures) for (const line of picture.story) expect(runs, line).toContain(line);
  });
});

describe("the words on the stage", () => {
  const labels = pictures.flatMap((picture) => picture.steps.flatMap((step) => step.show));
  const allowed = [...pictures.flatMap((picture) => [picture.show, ...picture.story]), ...labels];

  it("are each a title line, a story line or a label the click shows, or a row of one", () => {
    expect(texts.length).toBeGreaterThan(30);
    const titleRows = TITLES.flatMap((title) => title.lines);
    const isRow = (text: string) => allowed.some((words) => words === text || words.startsWith(`${text} `) || words.endsWith(` ${text}`) || words.includes(` ${text} `));
    expect(texts.filter((text) => !titleRows.includes(text) && !isRow(text))).toEqual([]);
  });

  it("include every label each click shows, once, whole or set over rows that follow each other", () => {
    const rows = (label: string) => texts.flatMap((_, i) => Array.from({ length: texts.length - i }, (_, n) => texts.slice(i, i + n + 1).join(" "))).filter((run) => run === label);
    for (const label of labels) expect(rows(label), label).toHaveLength(1);
  });

  it("are typed only in the script: no source of the world holds a title, story line or label, comments included (a layout may name the word a title breaks after), and no scene types JSX text", () => {
    expect(sources.length).toBeGreaterThan(8);
    for (const { name, text } of sources) {
      // A layout may name the single word a title breaks after (`breakAfter`); a phrase stays out of every source.
      const typed = /^layout/.test(name) ? allowed.filter((words) => words.includes(" ")) : allowed;
      for (const words of typed) expect(text.includes(words), `${name}: ${words}`).toBe(false);
      if (name.endsWith(".tsx")) expect(text.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], name).toEqual([]);
    }
  });
});

describe("the house rules", () => {
  it("uses no orange, no pass green, no catalog colour and no provider colour", () => {
    for (const { name, text } of sources) expect(text, name).not.toMatch(/--dk-human|dk-human-text|HumanMark|--dk-pass|--dk-catalog|--fr-|#f4642c|#1f573b/i);
    for (const { name, text } of sources) expect(text, name).not.toMatch(VENDOR_COLOURS);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, and the process's green only on slide 1's rule", () => {
    for (const { name, text } of sources) expect(strayTokens(text), name).toEqual([]);
    const green = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{[^}]*--dk-process[^}]*\}/g)].map(([, selector]) => selector.trim());
    expect(green).toEqual([".who-rule"]);
    for (const { name, text } of sources.filter((source) => source.name !== "who.css")) expect(text, name).not.toMatch(/--dk-|data-hue|#[0-9a-f]{3,6}\b/i);
  });

  it("turns a card on a light back, the raised tint inside a rule-coloured edge, so the turn never flashes a dark shape", () => {
    const back = css.match(/\.who-card__back \{([^}]*)\}/)![1];
    expect(back).toMatch(/background: var\(--dk-raised\);/);
    expect(back).toMatch(/border: [^;]*var\(--dk-rule\);/);
    expect(back).not.toMatch(/--dk-paper|--dk-ink/);
  });

  it("draws no gradient, no shadow and no glow", () => {
    for (const { name, text } of sources) expect(text, name).not.toMatch(/gradient|drop-shadow|box-shadow|text-shadow|filter\s*:/i);
  });

  it("moves nothing on a clock, a transition or chance, and repeats nothing", () => {
    for (const { name, text } of sources) expect(text, name).not.toMatch(/Math\.random|\bDate\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|\brepeat\b|yoyo/);
  });

  it("leaves a part's own opacity to show and hide: a part that fades by a variable fades its fill, not its opacity", () => {
    const fading = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)]
      .filter(([, , body]) => /(^|[^-])opacity:\s*var\(--/m.test(body))
      .flatMap(([, selector]) => [...selector.matchAll(/\.([\w-]+)\s*(?=,|$)/g)].map(([, name]) => name));
    const parted = [...markup.matchAll(/<[^>]*>/g)].map(([tag]) => tag).filter((tag) => tag.includes("data-build="));
    expect(fading.filter((name) => parted.some((tag) => new RegExp(`class="([^"]* )?${name}( [^"]*)?"`).test(tag)))).toEqual([]);
  });

  it("paints nothing a drawn stroke has not drawn yet", () => {
    const filled = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)]
      .filter(([, , body]) => [...body.matchAll(/(?:^|[^-])fill:\s*([^;\s]+)/gm)].some(([, value]) => value !== "none"))
      .flatMap(([, selector]) => [...selector.matchAll(/\.([\w-]+)\s*(?=,|$)/g)].map(([, name]) => name));
    const drawn = [...markup.matchAll(/class="([^"]*\bdk-draw\b[^"]*)"/g)].flatMap(([, names]) => names.split(" "));
    expect(filled.filter((name) => drawn.includes(name))).toEqual([]);
  });

  it("keeps every module under 500 lines", () => {
    for (const file of readdirSync(dir).filter((name) => /\.(tsx?|css)$/.test(name))) expect(readFileSync(join(dir, file), "utf8").split("\n").length, file).toBeLessThan(500);
  });
});
