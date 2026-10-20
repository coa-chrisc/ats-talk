/**
 * Part 4 as a whole: its three slides in order, one click each, every word
 * from the script, the house rules, and the story lines. Each slide's own
 * picture is tested in beats.test.ts and its places in layout.test.ts; what
 * they share is in harness.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME } from "@/components/deck/engine/camera";
import { CHAIN, storyKeys, storyRows } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { ARRIVE, COUNTS } from "./beats";
import { PICTURES, STORIES, TITLES, groupOf, titleKey } from "./layout";
import { CLOSE } from "./layout-close";
import { LEAVE, at, built, hiddenAt, ids, lastLanding, markup, n, nodes, pictureOfKey, playOf, startOf, texts, world } from "./harness";
import { fitWorld } from "./world";

const dir = import.meta.dirname;
const sources = readdirSync(dir)
  .filter((file) => /\.(tsx?|css)$/.test(file) && !file.endsWith(".test.ts") && file !== "harness.ts")
  .map((file) => [file, readFileSync(join(dir, file), "utf8")] as const);

describe("the fit world", () => {
  it("holds the script's three pictures of Part 4 in the order shown, one click each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["22", "23", "24"]);
    expect(fitWorld.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(["my-work.play", "fit.play", "lets-talk.play"]);
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it", () => {
    const moved = new Set(world.keys);
    expect([...new Set(built)].filter((key) => !moved.has(key))).toEqual([]);
  });

  it("gives every part one element, but a title's lines", () => {
    const counted = (key: string) => built.filter((id) => id === key).length;
    expect([...new Set(built)].filter((key) => counted(key) !== (COUNTS[key] ?? 1))).toEqual([]);
  });

  it("keeps the camera at home at every step", () => {
    for (const camera of world.cameras) expect(camera).toEqual(HOME);
  });

  it.each(ids)("finishes %s inside 12 s, the first counting the world's arrival fade", (id) => {
    expect(lastLanding(id) + (n(id) === 0 ? LEAVE : 0)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    const [title] = playOf("my-work.play", titleKey("my-work"));
    expect(title.at).toBe(ARRIVE);
  });

  it("puts only the close on navy, the white slides on the deck's white", () => {
    expect(fitWorld.steps.map((step) => step.ground ?? "white")).toEqual(["white", "white", "navy"]);
  });
});

describe("one slide at a time", () => {
  it.each([
    ["fit", "my-work"],
    ["lets-talk", "fit"],
  ])("puts the whole picture before %s away at its click, and its title", (id, before) => {
    const click = `${id}.play`;
    for (const key of [...Object.values(groupOf(before)), titleKey(before)]) {
      const [gone] = playOf(click, key);
      expect(gone, key).toMatchObject({ at: 0, on: { autoAlpha: 0 } });
      for (const later of ids.slice(n(click))) expect(at(later)[key].autoAlpha, `${key} at ${later}`).toBe(0);
    }
  });

  it("shows each slide's title in its own click, and no other title", () => {
    for (const id of ids) {
      const showing = PICTURES.filter((picture) => {
        const state = at(id)[titleKey(picture.id)];
        return state.yPercent === 0 && state.autoAlpha !== 0;
      });
      expect(showing.map((picture) => picture.id), id).toEqual([id.split(".")[0]]);
    }
  });

  it("leaves on the stage at each click's end only that slide's own parts", () => {
    for (const id of ids) {
      const state = at(id);
      const strays = nodes.filter((node) => node.paints && !hiddenAt(state, node) && pictureOfKey(node.key) !== id.split(".")[0]);
      expect(strays.map((node) => node.key), id).toEqual([]);
    }
  });

  it("breaks the two long titles after the words given, each over three lines", () => {
    const lines = (id: string) => TITLES.find((title) => title.picture === id)!.lines;
    expect(lines("my-work")).toHaveLength(3);
    expect(lines("my-work")[0].endsWith("covered")).toBe(true);
    expect(lines("fit")).toHaveLength(3);
    expect(lines("fit")[0].endsWith("would")).toBe(true);
    expect(CLOSE.title.lines).toHaveLength(1);
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => [picture.show, ...picture.steps.flatMap((step) => step.show)]);
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...labels, ...stories];

  it("are each a title, a story line or a label the script gives this part", () => {
    for (const text of texts) expect(allowed.some((words) => words.includes(text)), text).toBe(true);
  });

  it("include every title, story line and label the script gives this part", () => {
    const shown = texts.join(" ");
    for (const words of allowed) for (const word of words.split(" ")) expect(shown, words).toContain(word);
  });

  it("are typed only in the script: no module holds a string or a phrase of its own, comments included", () => {
    expect(sources.length).toBeGreaterThan(10);
    for (const [file, source] of sources) {
      for (const words of allowed) expect(source.includes(words), `${file}: ${words}`).toBe(false);
      // JSX text: anything set between a tag's end and the next tag that is not an expression.
      expect(source.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], file).toEqual([]);
    }
  });

  it("quote no step label in a module, even in a comment", () => {
    const named = PICTURES.flatMap((picture) => picture.steps.flatMap((step) => step.show));
    for (const [file, source] of sources) for (const label of named) expect(source.includes(`"${label}"`), `${file}: ${label}`).toBe(false);
  });
});

describe("the house rules", () => {
  it("uses no orange, deep pass green, indigo or provider colour", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-human|--dk-pass|--dk-catalog|--fr-|#f4642c|#1f573b/i);
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, and no literal colour", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
    for (const [file, source] of sources.filter(([file]) => file.endsWith(".css"))) expect(source, file).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(/i);
  });

  it("moves nothing on a clock, a transition or chance, and repeats nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/Math\.random|Date\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|repeat|yoyo/);
  });

  it("moves through the kit's verbs only, never GSAP itself", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/from "gsap"|gsap\./);
  });

  it("draws no gradient, glow or blend", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/gradient|drop-shadow|box-shadow|filter\s*:|mix-blend/i);
  });

  it("paints no fill on a line that draws on, but one that comes in with its drawing, so an undrawn part is not there", () => {
    const css = sources.find(([file]) => file === "fit.css")![1].replace(/\/\*[\s\S]*?\*\//g, "");
    const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map(([, selectors, body]) => ({ selectors: selectors.split(",").map((one) => one.trim()), body }));
    const drawn = new Set([...markup.matchAll(/class="([^"]*\bdk-draw\b[^"]*)"/g)].flatMap(([, list]) => list.split(/\s+/).filter((name) => name.startsWith("fit-"))));
    expect(drawn.size).toBeGreaterThan(3);
    for (const name of drawn)
      for (const rule of rules.filter((entry) => entry.selectors.some((selector) => new RegExp(`\\.${name}(?![\\w-])`).test(selector)))) {
        const fill = rule.body.match(/(?:^|;)\s*fill\s*:\s*([^;]+)/)?.[1].trim();
        if (fill && fill !== "none") expect(rule.body, name).toMatch(/fill-opacity\s*:[^;]*var\(--d\b/);
      }
  });

  it("keeps every module under 500 lines", () => {
    const all = readdirSync(dir).filter((file) => /\.(tsx?|css)$/.test(file));
    for (const file of all) expect(readFileSync(join(dir, file), "utf8").split("\n").length, file).toBeLessThan(500);
  });

  it("prefixes every class of its own with fit-", () => {
    const classes = [...markup.matchAll(/class="([^"]+)"/g)].flatMap(([, list]) => list.split(/\s+/));
    expect([...new Set(classes.filter((name) => !/^(fit-|dk-)/.test(name)))]).toEqual([]);
    const css = sources.find(([file]) => file === "fit.css")![1];
    const own = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/\.([a-z][\w-]*)/g)].map(([, name]) => name).filter((name) => !name.startsWith("dk-"));
    expect(own.filter((name) => !name.startsWith("fit-"))).toEqual([]);
  });
});

describe("the story lines", () => {
  const bands = [...STORIES, { picture: "lets-talk", id: `story.lets-talk`, lines: PICTURES.at(-1)!.story }];

  it("are set once each on the white slides, in the band under their title, each on one row", () => {
    for (const band of STORIES) {
      expect(band.band, band.picture).toBe(["one", "two", "three"][TITLES.find((title) => title.picture === band.picture)!.lines.length - 1]);
      const rows = storyRows(band.band, band.lines.length);
      storyKeys(band.id, band.lines.length).forEach((key, i) => {
        expect(built.filter((id) => id === key).length, key).toBe(1);
        expect(markup, key).toContain(`top:${rows[i].y}px`);
      });
      expect(band.lines, band.picture).toEqual(PICTURES.find((picture) => picture.id === band.picture)!.story);
    }
  });

  it("are set once each on the close, under its title", () => {
    const keys = storyKeys("story.lets-talk", 2);
    expect(CLOSE.story.map((line) => line.key)).toEqual(keys);
    for (const key of keys) expect(built.filter((id) => id === key).length, key).toBe(1);
    expect(CLOSE.story.map((line) => line.text)).toEqual(PICTURES.at(-1)!.story);
  });

  it("come up inside their slide's click, A before B, and stay up to its end", () => {
    for (const band of bands) {
      const click = `${band.picture}.play`;
      const [a, b] = storyKeys(band.id, band.lines.length);
      expect(playOf(click, a), a).toHaveLength(1);
      expect(playOf(click, b), b).toHaveLength(1);
      expect(startOf(click, b), band.picture).toBeGreaterThan(startOf(click, a));
      expect(at(click)[a].yPercent, a).toBe(0);
      expect(at(click)[b].yPercent, b).toBe(0);
    }
  });

  it("go away with their slide's picture", () => {
    for (const band of STORIES) {
      const { html } = groupOf(band.picture);
      expect(markup.indexOf(`data-build="${html}"`), band.picture).toBeLessThan(markup.indexOf(`data-build="${storyKeys(band.id, 1)[0]}"`));
      const next = PICTURES[PICTURES.findIndex((picture) => picture.id === band.picture) + 1];
      expect(at(`${next.id}.play`)[html].autoAlpha, html).toBe(0);
    }
  });

});
