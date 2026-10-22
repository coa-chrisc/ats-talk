import { MAX_BUILD_SECONDS } from "../sequence";
/**
 * The stands world as a whole: its six slides in order, one at a time,
 * every word from the script, the house rules, and the story lines. Each
 * slide's own picture is tested in beats.test.ts; what they share is in
 * harness.ts, where things go in layout.test.ts.
 */
import { HOME } from "@/components/deck/engine/camera";
import { storyKeys, storyRows } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COUNTS } from "./counts";
import { LEAVE, at, built, ids, lastStepOf, longest, markup, n, onStage, pictureHolding, playOf, startOf, stepOf, svgTexts, texts, visible, world } from "./harness";
import { PICTURES, STORIES, TITLES, layerOf, storyKeysOf, titleKey } from "./layout";
import { ARRIVE, partsOf } from "./moves";
import { stands, standsEntry } from "./world";

const dir = import.meta.dirname;
const sources = readdirSync(dir)
  .filter((file) => /\.(tsx?|css)$/.test(file) && !file.endsWith(".test.ts") && file !== "harness.ts")
  .map((file) => [file, readFileSync(join(dir, file), "utf8")] as const);

describe("the stands world", () => {
  it("holds the script's slides 11 to 15 in the order shown, one click each but slide 12b's two", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["11", "11a", "12", "12a", "12b", "13", "14", "15"]);
    expect(PICTURES.map((picture) => picture.id)).toEqual(["track", "control", "exists", "noticed", "community", "infrastructure", "fits", "fleet"]);
    expect(stands.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(PICTURES.flatMap((picture) => picture.steps.map((step) => `${picture.id}.${step.id}`)));
    expect(PICTURES.filter((picture) => picture.steps.length > 1).map((picture) => [picture.id, picture.steps.map((step) => step.id)])).toEqual([["community", ["roll", "themes"]]]);
    expect(standsEntry.world).toBe(stands);
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it", () => {
    const moved = new Set(world.keys);
    /** Shown by their parent: the last slide's picture, which nothing puts away. */
    const byParent = new Set(Object.values(layerOf("fleet")));
    expect([...new Set(built)].filter((key) => !moved.has(key) && !byParent.has(key))).toEqual([]);
  });

  it("gives every part one element, but a title's lines", () => {
    const counted = (key: string) => built.filter((id) => id === key).length;
    expect([...new Set(built)].filter((key) => counted(key) !== (COUNTS[key] ?? 1))).toEqual([]);
  });

  it("keeps the camera at home at every step", () => {
    for (const camera of world.cameras) expect(camera).toEqual(HOME);
    for (const step of stands.steps) expect(step.moves.some((move) => "camera" in move), step.id).toBe(false);
  });

  it.each(ids)("finishes %s inside 12 s, the first counting the world's arrival fade", (id) => {
    expect(longest(id) + (n(id) === 0 ? LEAVE : 0)).toBeLessThanOrEqual(MAX_BUILD_SECONDS);
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    expect(startOf(stepOf("track"), titleKey("track"))).toBe(ARRIVE);
  });

  it("sets every slide on the deck's white", () => {
    expect(stands.steps.map((step) => step.ground)).toEqual(ids.map(() => undefined));
  });

  it("shows no picture file: every slide is drawn", () => {
    expect(markup).not.toMatch(/\.(?:webp|png|jpg|svg)\b/);
  });

  it("draws every shape at a number: no coordinate is missing", () => {
    expect(markup).not.toMatch(/NaN|undefined/);
  });
});

describe("one slide at a time", () => {
  it.each(PICTURES.slice(1).map((picture, i) => [picture.id, PICTURES[i].id]))("puts the whole picture before %s away at its click, and changes the title", (id, previous) => {
    const first = stepOf(id);
    for (const key of partsOf(previous)) {
      const [gone] = playOf(first, key);
      expect(gone, key).toMatchObject({ at: 0, on: { autoAlpha: 0 } });
      for (const later of ids.slice(n(first))) expect(at(later)[key].autoAlpha, `${key} at ${later}`).toBe(0);
    }
    expect(at(first)[titleKey(previous)].autoAlpha).toBe(0);
    expect(at(first)[titleKey(id)].yPercent).toBe(0);
  });

  it("shows on each slide's click only its own parts: nothing carries from the slide before, and a second click keeps only its own slide's", () => {
    for (const id of ids) {
      const own = new Set(stands.steps[n(id)].moves.flatMap((move) => ("key" in move ? [move.key] : [])));
      const picture = id.split(".")[0];
      if (id !== stepOf(picture)) for (const key of world.keys.filter((key) => pictureHolding(key) === picture)) own.add(key);
      if (id !== stepOf(picture)) own.add(titleKey(picture));
      /** A picture's layers only hold its parts, which are each checked here; a layer left up with nothing showing in it draws nothing. */
      const layers = new Set(PICTURES.flatMap((picture) => Object.values(layerOf(picture.id))));
      const strays = world.keys.filter((key) => !layers.has(key) && visible(at(id), key) && !own.has(key));
      expect(strays, id).toEqual([]);
    }
  });

  it("names a picture for every part but the titles, so each part goes with its picture's layers", () => {
    const titles = new Set(TITLES.map((title) => title.key));
    expect(world.keys.filter((key) => !titles.has(key) && !pictureHolding(key))).toEqual([]);
  });

  it("shows each slide's title at its click, and no other title", () => {
    for (const id of ids) {
      const showing = TITLES.filter((title) => onStage(at(id), title.key)).map((title) => title.picture);
      expect(showing, id).toEqual([id.split(".")[0]]);
    }
  });

  it("breaks the titles after the words the layout names, two lines each", () => {
    expect(TITLES.map((title) => title.lines.length)).toEqual([2, 2, 2, 2, 2, 2, 2, 2]);
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => picture.steps.flatMap((step) => step.show));
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...PICTURES.map((picture) => picture.show), ...labels, ...stories];

  it("are each a title row, a story row or a label the script gives these slides", () => {
    expect(texts.length).toBeGreaterThan(80);
    for (const text of texts) expect(allowed.some((words) => words.includes(text)), text).toBe(true);
  });

  it("include every label, once, and every story line, whole", () => {
    /** A label is set once on each slide that shows it: a caption on two rows reads as one SVG text, a dashed plate's name as one HTML text. */
    const set = [...svgTexts, ...texts.filter((text) => !svgTexts.some((whole) => whole.includes(text)))];
    for (const label of new Set(labels)) expect(set.filter((text) => text === label), label).toHaveLength(labels.filter((entry) => entry === label).length);
    const joined = texts.join(" ");
    for (const line of stories) expect(joined, line).toContain(line);
    for (const picture of PICTURES) for (const word of picture.show.split(" ")) expect(joined, picture.show).toContain(word);
  });

  it("are typed only in the script: the scenes, parts, moves and steps hold no string of their own, comments included", () => {
    const files = sources.filter(([file]) => /^(scene.*\.tsx|parts.*\.tsx|moves\.ts|counts\.ts|steps-.*\.ts)$/.test(file));
    expect(files.length).toBeGreaterThan(15);
    for (const [file, source] of files) {
      // A phrase anywhere, comments included; a single word as a string of its own (a kit part may share a one-word label's name).
      for (const words of allowed) expect(words.includes(" ") ? source.includes(words) : source.includes(`"${words}"`), `${file}: ${words}`).toBe(false);
      // JSX text: anything set between a tag's end and the next tag that is not an expression.
      expect(source.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], file).toEqual([]);
    }
  });

  it("keeps every label and story line out of the layouts too", () => {
    for (const [file, source] of sources.filter(([name]) => name.startsWith("layout"))) {
      for (const words of allowed.filter((entry) => entry.includes(" "))) expect(source.includes(words), `${file}: ${words}`).toBe(false);
    }
  });
});

describe("the house rules", () => {
  it("uses the orange only through the kit's HumanMark, once each on slide 11a's review, slide 14's sensitive-action approval and slide 15's fleet, and on slide 11a's added socket; the pass green only on slide 11a's fitting socket and its boundary", () => {
    for (const [file, source] of sources.filter(([name]) => name !== "stands-control.css")) expect(source, file).not.toMatch(/--dk-human|--dk-pass|--fr-|#f4642c|#1f573b/i);
    const control = sources.find(([file]) => file === "stands-control.css")![1].replace(/\/\*[\s\S]*?\*\//g, "");
    expect(control).not.toMatch(/--fr-|#f4642c|#1f573b/i);
    const coloured = [...control.matchAll(/([^{}]+)\{([^}]*)\}/g)].filter(([, , body]) => /--dk-(human|pass)\b/.test(body)).map(([, selectors, body]) => [selectors.trim(), body.match(/--dk-(human|pass)\b/g)!] as const);
    expect(coloured.map(([selectors]) => selectors).sort()).toEqual([".sn-boundary path", ".sn-socket--human", ".sn-socket--pass"]);
    for (const [selectors, tokens] of coloured) expect(new Set(tokens), selectors).toEqual(new Set([selectors.includes("human") ? "--dk-human" : "--dk-pass"]));
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
    expect(sources.filter(([, source]) => /<HumanMark\b/.test(source)).map(([file]) => file).sort()).toEqual(["scene-control.tsx", "scene-fits.tsx", "scene-fleet.tsx"]);
    expect(sources.filter(([, source]) => /<PassTick\b/.test(source)).map(([file]) => file).sort()).toEqual([]);
    expect(markup.match(/class="dk-human"/g) ?? []).toHaveLength(3);
    expect(markup.match(/class="dk-pass-tick"/g) ?? []).toHaveLength(0);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, and no hue beyond green, indigo and grey", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-(lead|review|fix|dept-|share-)|data-hue="(lead|review|fix|dept|share)/);
    for (const [file, source] of sources.filter(([name]) => !name.endsWith(".css"))) expect(source, file).not.toMatch(/--dk-|#[0-9a-f]{3,6}\b/i);
  });

  it("gives slide 14 no colour but its ticks: its words, rules and tag are ink and grey", () => {
    const css = sources.find(([file]) => file === "stands.css")![1];
    for (const rule of [".sn-head-rule", ".sn-join"]) {
      const body = css.slice(css.indexOf(`${rule} {`), css.indexOf("}", css.indexOf(`${rule} {`)));
      expect(body, rule).not.toMatch(/--dk-(process|catalog)/);
    }
  });

  it("fills nothing that draws on but as it draws, so a figure not yet drawn hides nothing behind it", () => {
    const css = sources.filter(([file]) => file.endsWith(".css")).map(([, source]) => source).join("\n").replace(/\/\*[\s\S]*?\*\//g, "");
    const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].filter(([, selectors]) => /\.dk-(?:person|draw)\b/.test(selectors));
    expect(rules.length).toBeGreaterThan(0);
    for (const [, selectors, body] of rules) {
      const fill = body.match(/(?:^|;)\s*fill\s*:\s*([^;]+)/)?.[1].trim();
      if (fill && fill !== "none") expect(body, selectors.trim()).toMatch(/fill-opacity\s*:[^;]*var\(--d\b/);
    }
  });

  it("moves nothing on a clock, a transition or chance, and repeats nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/Math\.random|\bDate\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|\brepeat\b|yoyo/);
  });

  it("draws no gradient and no glow, and blends nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/gradient|drop-shadow|box-shadow|text-shadow|filter\s*:|mix-blend|backdrop/i);
  });

  it("moves parts only through the kit's verbs, never GSAP itself", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/from "gsap"|gsap\./);
  });

  it("keeps every module under 500 lines", () => {
    for (const file of readdirSync(dir).filter((name) => /\.(tsx?|css)$/.test(name))) expect(readFileSync(join(dir, file), "utf8").split("\n").length, file).toBeLessThan(500);
  });

  it("keeps the department map's pieces free of the script, so another world can draw them from the same numbers", () => {
    const source = sources.find(([name]) => name === "parts-map.tsx")![1];
    expect(source).not.toMatch(/script\/|from "\.\/layout|from "\.\.\/steps"/);
  });
});

describe("the story lines", () => {
  it("are set once each, in the band under their title, one row each", () => {
    for (const band of STORIES) {
      const lines = TITLES.find((title) => title.picture === band.picture)!.lines.length;
      expect(band.band, band.picture).toBe(["one", "two", "three"][lines - 1]);
      const rows = storyRows(band.band, band.lines.length);
      storyKeys(band.id, band.lines.length).forEach((key, i) => {
        expect(built.filter((id) => id === key).length, key).toBe(1);
        expect(markup, key).toContain(`top:${rows[i].y}px`);
      });
      expect(band.lines, band.picture).toEqual(PICTURES.find((picture) => picture.id === band.picture)!.story);
    }
  });

  it("come up in their slide's click, A before B, and stay up to the slide's end", () => {
    for (const picture of PICTURES) {
      const [a, b] = storyKeysOf(picture.id);
      const first = stepOf(picture.id);
      const last = lastStepOf(picture.id);
      expect(playOf(first, a), a).toHaveLength(1);
      expect(playOf(last, b), b).toHaveLength(1);
      if (first === last) expect(startOf(first, b), picture.id).toBe(startOf(first, a));
      else expect(at(first)[b].yPercent, `${b} waits for the second click`).toBe(120);
      expect(at(last)[a].yPercent, a).toBe(0);
      expect(at(last)[b].yPercent, b).toBe(0);
    }
  });

  it("go away with their slide's picture", () => {
    for (const [i, picture] of PICTURES.slice(0, -1).entries()) {
      const { html } = layerOf(picture.id);
      for (const key of storyKeysOf(picture.id)) expect(markup.indexOf(`data-build="${html}"`), key).toBeLessThan(markup.indexOf(`data-build="${key}"`));
      expect(at(stepOf(PICTURES[i + 1].id))[html].autoAlpha, html).toBe(0);
    }
  });
});
