/**
 * Part 2 of the City talk as a whole: its fourteen slides in order, one at a
 * time, every word from the script, the house rules, and the story lines.
 * Each picture is tested in its own file (start, safe, builds, too-long
 * and proof .test.ts); where the drawings sit is in layout.test.ts; what
 * they share is in harness.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME } from "@/components/deck/engine/camera";
import { CHAIN, storyKeys, storyRows } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { stepId } from "../steps";
import { ARRIVE } from "./beats";
import { COUNTS } from "./counts";
import { PICTURES, STORIES, TITLES, groupOf, titleKey } from "./layout";
import { LEAVE, at, built, clickOf, decode, ends, ids, markup, n, playOf, playsAt, startOf, texts, world } from "./harness";
import { built as builtWorld } from "./world";

describe("the built world", () => {
  it("holds the script's fourteen pictures of Part 2 in the order shown, one click each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["4", "5", "5a", "6", "6a", "6b", "7", "8", "9", "9a", "10", "11", "12", "12a"]);
    expect(builtWorld.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(PICTURES.map((picture) => `${picture.id}.play`));
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it", () => {
    const moved = new Set(world.keys);
    /** Shown by their parent: the last slide's picture, which nothing puts away. */
    const byParent = new Set(Object.values(groupOf(PICTURES[PICTURES.length - 1].id)));
    expect([...new Set(built)].filter((key) => !moved.has(key) && !byParent.has(key))).toEqual([]);
  });

  it("gives every part one element, but where it is counted: a title's lines, and a picture's repeated marks", () => {
    const counted = (key: string) => built.filter((id) => id === key).length;
    expect([...new Set(built)].filter((key) => counted(key) !== (COUNTS[key] ?? 1))).toEqual([]);
    for (const key of Object.keys(COUNTS)) expect(built, key).toContain(key);
  });

  it("keeps the camera at home at every step", () => {
    for (const camera of world.cameras) expect(camera).toEqual(HOME);
  });

  it.each(ids)("finishes %s inside 12 s, the first counting the world's arrival fade", (id) => {
    const longest = Math.max(...playsAt(id).map(ends));
    expect(longest + (n(id) === 0 ? LEAVE : 0)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    const [title] = playOf(clickOf(PICTURES[0].id), titleKey(PICTURES[0].id));
    expect(title.at).toBe(ARRIVE);
  });
});

describe("one slide at a time", () => {
  it.each(PICTURES.slice(1).map((picture, i) => [picture.id, PICTURES[i].id]))("puts the whole picture before %s away at its first click, and changes the title", (id, before) => {
    const click = clickOf(id);
    for (const key of Object.values(groupOf(before))) {
      const [gone] = playOf(click, key);
      expect(gone, key).toMatchObject({ at: 0, on: { autoAlpha: 0 } });
      for (const later of ids.slice(n(click))) expect(at(later)[key].autoAlpha, `${key} at ${later}`).toBe(0);
    }
    expect(at(click)[titleKey(before)].autoAlpha).toBe(0);
    expect(at(click)[titleKey(id)].yPercent).toBe(0);
  });

  it("keeps every mark of a later slide unseen until its click: each shape is drawn by its line, follows a value its part starts at 0, or sits in a part that starts hidden", () => {
    const groups = new Set(PICTURES.map((picture) => groupOf(picture.id).marks));
    const start = world.states[0];
    const shapes = new Set(["rect", "circle", "ellipse", "path", "line", "polygon", "polyline", "text"]);
    /** Shapes whose paint follows a value (--d or --k) rather than autoAlpha: the kit's agent, an arrow's head, a cell's fill. */
    const gated = /class="[^"]*\b(dk-agent__track|dk-agent__fill|dk-agent__body|built-arrow__head|built-cell__fill)\b/;
    /** A drawn shape's own fill shows before its line does, unless it is none or follows --d. */
    const sheets = ["built.css", "built-proof.css", "built-rad.css"].map((name) => readFileSync(join(import.meta.dirname, name), "utf8")).join("\n");
    const filled = (attrs: string) =>
      (attrs.match(/class="([^"]+)"/)?.[1].split(" ") ?? []).some((name) => {
        const rule = sheets.match(new RegExp(`\\.${name} \\{([^}]*)\\}`))?.[1] ?? "";
        return /\bfill: (?!none)/.test(rule) && !/fill-opacity:[^;]*--d/.test(rule);
      });
    const stack: { key?: string }[] = [];
    const seen: string[] = [];
    for (const [, close, tag, attrs, self] of markup.matchAll(/<(\/?)([a-zA-Z]+)([^<>]*?)(\/?)>/g)) {
      if (close) {
        stack.pop();
        continue;
      }
      const key = attrs.match(/data-build="([^"]+)"/)?.[1];
      const path = [...stack, { key }];
      const group = path.findIndex((entry) => entry.key && groups.has(entry.key));
      const parts = path.slice(group + 1).flatMap((entry) => (entry.key ? [start[entry.key]] : []));
      const hidden = parts.some((state) => state?.autoAlpha === 0);
      const drawn = /class="[^"]*\bdk-draw\b/.test(attrs) && !filled(attrs);
      const follows = gated.test(attrs) && parts.some((state) => state?.["--d"] === 0 || state?.["--k"] === 0);
      if (group >= 0 && shapes.has(tag) && !hidden && !drawn && !follows) seen.push(`${path[group].key}: <${tag}${attrs.slice(0, 60)}`);
      if (!self) stack.push({ key });
    }
    expect(seen).toEqual([]);
  });

  it("brings every label a step names onto the stage in its click, in its own slide's picture: up when the click ends, or brought up in it and put away by the click itself where the slide's picture says so (slide 7's agents step back and fade)", () => {
    /** Each piece of text in the scene, with the parts it sits in, outermost first. */
    const placed: { text: string; parts: string[] }[] = [];
    const stack: (string | undefined)[] = [];
    for (const [, close, , attrs, self, text] of markup.matchAll(/<(\/?)([a-zA-Z]+)([^<>]*?)(\/?)>|([^<>]+)/g)) {
      if (text !== undefined) {
        placed.push({ text: decode(text).trim(), parts: stack.flatMap((key) => (key ? [key] : [])) });
        continue;
      }
      if (close) {
        stack.pop();
        continue;
      }
      if (!self) stack.push(attrs.match(/data-build="([^"]+)"/)?.[1]);
    }
    for (const picture of PICTURES) {
      const groups = Object.values(groupOf(picture.id));
      for (const step of picture.steps) {
        const id = stepId(picture.id, step.id);
        const state = at(id);
        /** A part on the stage at the click's end, or brought up during the click. */
        const up = (key: string) => state[key]?.autoAlpha !== 0 || playOf(id, key).some((play) => play.on.autoAlpha === 1);
        for (const label of step.show) {
          const seen = placed.filter((entry) => entry.text === label && groups.some((group) => entry.parts.includes(group)) && entry.parts.every(up));
          expect(seen.length, `${picture.id}: ${label}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("shows each slide's title at its click, and no other title", () => {
    for (const id of ids) {
      const showing = PICTURES.filter((picture) => {
        const state = at(id)[titleKey(picture.id)];
        return state.yPercent === 0 && state.autoAlpha !== 0;
      });
      expect(showing.map((picture) => picture.id), id).toEqual([id.split(".")[0]]);
    }
  });

  it("sets the two longest titles on three lines and every other on two, each line inside the band", () => {
    const three = ["weekly", "wrong-question"];
    for (const title of TITLES) expect(title.lines, title.picture).toHaveLength(three.includes(title.picture) ? 3 : 2);
    expect(TITLES.map((title) => title.lines.join(" "))).toEqual(PICTURES.map((picture) => picture.show));
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => picture.steps.flatMap((step) => step.show));
  const titles = PICTURES.map((picture) => picture.show);
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...labels, ...titles, ...stories];

  it("are each a title, a story line or a label the script gives this part", () => {
    const pieces = [...TITLES.flatMap((title) => title.lines), ...labels, ...stories];
    for (const text of texts) expect(pieces, text).toContain(text);
  });

  it("include every title, story line and label the script gives this part", () => {
    for (const words of [...TITLES.flatMap((title) => title.lines), ...labels, ...stories]) expect(texts, words).toContain(words);
  });

  it("are typed only in the script: the scenes and the moves hold no phrase of their own, comments included", () => {
    const dir = import.meta.dirname;
    const files = readdirSync(dir).filter((file) => /^(scene.*\.tsx|parts.*\.tsx|beats\.ts|steps-.*\.ts)$/.test(file));
    expect(files.length).toBeGreaterThan(10);
    /** A phrase as a whole word or words, matched exactly: a label that is only a number (a year, a count) cannot be told from a number in the code, so it is left to the layout test that reads it from the script. A phrase joined to an underscore is part of a name in the code (AI_BUILDS), not words. */
    const phrases = allowed.filter((words) => !/^\d+$/.test(words));
    const asWords = (words: string) => new RegExp(`(^|[^A-Za-z0-9_])${words.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^A-Za-z0-9_])`);
    for (const file of files) {
      const source = readFileSync(join(dir, file), "utf8");
      for (const words of phrases) expect(asWords(words).test(source), `${file}: ${words}`).toBe(false);
      // JSX text: anything set between a tag's end and the next tag that is not an expression.
      expect(source.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], file).toEqual([]);
    }
  });
});

describe("the house rules", () => {
  const dir = import.meta.dirname;
  const sources = readdirSync(dir)
    .filter((file) => /\.(tsx?|css)$/.test(file) && !file.endsWith(".test.ts"))
    .map((file) => [file, readFileSync(join(dir, file), "utf8")] as const);

  it("uses orange only through the kit's human mark, and no deep pass green or provider colour", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-human|--dk-pass|--fr-|#f4642c|#1f573b/i);
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
  });

  it("paints otherwise only with the deck's tokens and the role aliases", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
    for (const [file, source] of sources) expect(source, file).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(/i);
  });

  it("moves nothing on a clock, a transition or chance, and repeats nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/Math\.random|Date\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|repeat|yoyo/);
  });

  it("draws no gradient, no glow and no blend", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/gradient|drop-shadow|box-shadow|filter\s*:|mix-blend|backdrop/i);
  });

  it("names its classes for this world, so a copied rule cannot meet another world's", () => {
    const css = sources.filter(([file]) => file.endsWith(".css"));
    expect(css.length).toBeGreaterThan(0);
    for (const [file, source] of css) for (const [, name] of source.matchAll(/\.([a-z][a-z0-9_-]*)/g)) expect(name, file).toMatch(/^(built-|dk-)/);
  });

  it("keeps every module under 500 lines", () => {
    const all = readdirSync(dir).filter((file) => /\.(tsx?|css)$/.test(file));
    for (const file of all) expect(readFileSync(join(dir, file), "utf8").split("\n").length, file).toBeLessThan(500);
  });
});

describe("the story lines", () => {
  it("are set once each, in the band under their title, two title lines or three", () => {
    for (const band of STORIES) {
      expect(band.band, band.picture).toBe(["one", "two", "three"][TITLES.find((title) => title.picture === band.picture)!.lines.length - 1]);
      const rows = storyRows(band.band, band.lines.flat().length);
      let row = 0;
      storyKeys(band.id, band.lines.length).forEach((key, i) => {
        expect(built.filter((id) => id === key).length, key).toBe(band.lines[i].length);
        expect(markup, key).toContain(`top:${rows[row].y}px`);
        row += band.lines[i].length;
      });
      expect(band.lines.map((rows) => rows.join(" ")), band.picture).toEqual(PICTURES.find((picture) => picture.id === band.picture)!.story);
    }
  });

  it("come up in their slide's click, A before B, and stay up to the slide's end", () => {
    for (const band of STORIES) {
      const click = clickOf(band.picture);
      const [a, b] = storyKeys(band.id, band.lines.length);
      expect(b, band.picture).toBeDefined();
      expect(playOf(click, a), a).toHaveLength(1);
      expect(playOf(click, b), b).toHaveLength(1);
      expect(at(click)[a].yPercent, a).toBe(0);
      expect(at(click)[b].yPercent, b).toBe(0);
      expect(startOf(click, b), band.picture).toBeGreaterThan(startOf(click, a));
    }
  });

  it("go away with their slide's picture", () => {
    for (const band of STORIES.slice(0, -1)) {
      const { html } = groupOf(band.picture);
      const open = markup.indexOf(`data-build="${html}"`);
      expect(open, band.picture).toBeGreaterThan(-1);
      expect(open, band.picture).toBeLessThan(markup.indexOf(`data-build="${storyKeys(band.id, 1)[0]}"`));
      const next = PICTURES[PICTURES.findIndex((picture) => picture.id === band.picture) + 1];
      expect(at(clickOf(next.id))[html].autoAlpha, html).toBe(0);
    }
  });
});
