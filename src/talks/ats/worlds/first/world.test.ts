/**
 * The first world as a whole: its eight slides in order, one at a time,
 * every word from the script, the house rules, and the story lines. Each
 * slide's own picture is tested in its own file (beats-scene.test.ts for
 * slides 16 and 17, beats-team.test.ts for 18, beats-chart.test.ts for 19
 * and 20, lanes, level-up and outcomes .test.ts for 21 to 23); what they
 * share is in harness.ts, where things go in layout.test.ts and
 * layout-plan.test.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME } from "@/components/deck/engine/camera";
import { CHAIN, storyKeys, storyRows } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { picturesOf } from "../steps";
import { COUNTS, PICTURES, STORIES, TITLES, labelsOf, layerOf, titleKey } from "./layout";
import { LEVEL_UP } from "./layout-level-up";
import { ARRIVE } from "./moves";
import { LEAVE, at, built, elements, ends, hiddenAt, ids, longest, markup, n, nodes, pictureOfKey, playOf, playsAt, startOf, stepOf, texts, world } from "./harness";
import { first } from "./world";

const dir = import.meta.dirname;
const own = readdirSync(dir).filter((file) => /\.(tsx?|css)$/.test(file) && !file.endsWith(".test.ts") && file !== "harness.ts");
const sourceOf = (file: string) => readFileSync(join(dir, file), "utf8");
const CSS = ["first.css", "first-plan.css"];

describe("the first world", () => {
  it("holds the script's slides 16 to 23 in the order shown, one click each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["16", "17", "18", "19", "20", "21", "22", "23"]);
    expect(PICTURES.map((picture) => picture.id)).toEqual(["not-proposing", "consortium", "program-team", "listen", "sort", "lanes", "level-up", "outcomes"]);
    expect(PICTURES).toEqual(picturesOf("first"));
    expect(first.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(PICTURES.map((picture) => stepOf(picture.id)));
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it, but the last slide's two groups", () => {
    const moved = new Set(world.keys);
    const last = new Set(Object.values(layerOf("outcomes")));
    expect([...new Set(built)].filter((key) => !moved.has(key) && !last.has(key))).toEqual([]);
  });

  it("gives every part one element, but a title's lines", () => {
    expect([...new Set(built)].filter((key) => elements(key) !== (COUNTS[key] ?? 1))).toEqual([]);
  });

  it("keeps the camera at home at every step", () => {
    for (const camera of world.cameras) expect(camera).toEqual(HOME);
  });

  it.each(ids)("finishes %s inside 12 s, the first counting the world's arrival fade", (id) => {
    expect(longest(id) + (n(id) === 0 ? LEAVE : 0)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it.each(ids)("never leaves the stage still for more than 3 s inside %s, staggers counted", (id) => {
    let landed = 0;
    let still = 0;
    for (const play of [...playsAt(id)].sort((x, y) => x.at - y.at)) {
      still = Math.max(still, play.at - landed);
      landed = Math.max(landed, ends(play));
    }
    expect(still).toBeLessThanOrEqual(CHAIN.still);
  });

  it.each(ids)("ends %s on a drawing or a story line, not a hold", (id) => {
    expect(longest(id) - Math.max(...playsAt(id).map((play) => play.at))).toBeLessThan(1.6);
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    const [title] = playOf(stepOf("not-proposing"), titleKey("not-proposing"));
    expect(title.at).toBe(ARRIVE);
  });

  it("shows no picture file: every slide is drawn", () => {
    expect(markup).not.toMatch(/\.(?:webp|png|jpg|svg)\b/);
  });
});

describe("one slide at a time", () => {
  it.each(PICTURES.slice(1).map((picture, i) => [picture.id, PICTURES[i].id]))("puts the whole picture before %s away at its click, and changes the title", (id, before) => {
    const click = stepOf(id);
    for (const key of Object.values(layerOf(before))) {
      const [gone] = playOf(click, key);
      expect(gone, key).toMatchObject({ at: 0, on: { autoAlpha: 0 } });
      for (const later of ids.slice(n(click))) expect(at(later)[key].autoAlpha, `${key} at ${later}`).toBe(0);
    }
    expect(at(click)[titleKey(before)].autoAlpha).toBe(0);
    expect(at(click)[titleKey(id)].yPercent).toBe(0);
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

  it("shows only the slide's own picture at the end of each click", () => {
    const strays = ids.flatMap((id) => {
      const state = at(id);
      const picture = id.split(".")[0];
      return nodes.filter((node) => node.paints && pictureOfKey(node.key) !== picture && !hiddenAt(state, node)).map((node) => `${id}: ${node.key}`);
    });
    expect(strays).toEqual([]);
  });

  it("breaks every title onto two lines after the word the layout names", () => {
    const lines = (id: string) => TITLES.find((title) => title.picture === id)!.lines;
    const ends: Record<string, string> = {
      "not-proposing": "citywide,",
      consortium: "department,",
      "program-team": "team,",
      listen: "words,",
      sort: "by value",
      lanes: "now, and",
      "level-up": "has,",
      outcomes: "priority.",
    };
    for (const [id, words] of Object.entries(ends)) {
      expect(lines(id), id).toHaveLength(2);
      expect(lines(id)[0].endsWith(words), id).toBe(true);
    }
    for (const band of STORIES) expect(band.band, band.picture).toBe("two");
    // At 72 px Geist bold a line of about 52 characters is as wide as the band: none is longer (slide 17's first line, 51, measures 1710 px of the 1728).
    for (const title of TITLES) for (const line of title.lines) expect(line.length, line).toBeLessThanOrEqual(52);
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => [picture.show, ...picture.steps.flatMap((step) => step.show)]);
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...labels, ...stories];

  it("are each a title, a story line or a label the script gives these slides", () => {
    for (const text of texts) expect(allowed.some((words) => words.includes(text)), text).toBe(true);
  });

  it("include every title, story line and label the script gives these slides, whole, but the first tile's name on slide 23 and the figure's caption on slide 22, each broken over two lines", () => {
    const split = labelsOf("outcomes")[1];
    const caption = LEVEL_UP.caption;
    for (const words of [...PICTURES.flatMap((picture) => picture.steps.flatMap((step) => step.show)).filter((words) => words !== split && words !== caption.text), ...stories]) expect(texts, words).toContain(words);
    expect(texts).toContain(split.slice(0, split.lastIndexOf(" ")));
    expect(texts).toContain(split.slice(split.lastIndexOf(" ") + 1));
    expect(caption.lines).toHaveLength(2);
    for (const line of caption.lines) expect(texts).toContain(line.text);
    const shown = texts.join(" ");
    for (const picture of PICTURES) for (const word of picture.show.split(" ")) expect(shown, picture.show).toContain(word);
  });

  it("are typed only in the script: the scenes, parts and moves hold no string of their own, comments included", () => {
    const files = own.filter((file) => /^(scene.*\.tsx|parts.*\.tsx|moves\.ts|steps-.*\.ts)$/.test(file));
    expect(files.length).toBeGreaterThan(20);
    for (const file of files) {
      const source = sourceOf(file);
      // A whole run of the script's words, not part of a longer word (an SVG attribute such as dominantBaseline).
      for (const words of allowed) expect(new RegExp(`(^|[^A-Za-z])${words.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^A-Za-z])`).test(source), `${file}: ${words}`).toBe(false);
      // JSX text: anything set between a tag's end and the next tag that is not an expression.
      expect(source.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], file).toEqual([]);
    }
  });

  it("are never set under the kit's 26 px label size", () => {
    for (const file of CSS) for (const [, size] of sourceOf(file).matchAll(/font-size:\s*(\d+)px/g)) expect(Number(size), file).toBeGreaterThanOrEqual(26);
  });

  it("set the course's figure on slide 22 in indigo, and words on the slab in white", () => {
    const words = [...markup.matchAll(/<text class="([^"]*)"[^>]*>([^<]*)</g)].map(([, classes, text]) => ({ classes: classes.split(" "), text: text.replace(/&#x27;/g, "'") }));
    expect(words.filter(({ classes }) => classes.includes("fs-label--indigo")).map(({ text }) => text)).toEqual([LEVEL_UP.figure.text]);
    expect(words.filter(({ classes }) => classes.includes("fs-label--white")).map(({ text }) => text)).toEqual([LEVEL_UP.slab.label.text]);
  });
});

describe("the house rules", () => {
  const sources = own.map((file) => [file, sourceOf(file)] as const);
  const css = (file: string) => sourceOf(file).replace(/\/\*[\s\S]*?\*\//g, "");
  const rulesWith = (file: string, token: string) => [...css(file).matchAll(/([^{}]+)\{([^}]*)\}/g)].filter(([, , body]) => body.includes(token)).map(([, selector]) => selector.trim());

  it("uses no orange, no deep pass green but the kit's PassTick on slide 20's checklist, and no provider or literal colour", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-human|--dk-pass|--fr-|#f4642c|#1f573b|HumanMark|#[0-9a-f]{3,8}\b|rgba?\(/i);
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
    const ticks = sources.filter(([file, source]) => file.endsWith(".tsx") && source.includes("PassTick")).map(([file]) => file);
    expect(ticks).toEqual(["scene-sort.tsx"]);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, and none of the agent hues", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-(lead|review|fix|dept-[abc]|share-[a-z]+)\b/);
  });

  it("keeps indigo for the course's evidence: the tag on slide 16 and the figure on slide 22", () => {
    expect(rulesWith("first.css", "--dk-catalog")).toEqual([".fs-tag", ".fs-tag__hole"]);
    expect(rulesWith("first-plan.css", "--dk-catalog")).toEqual([".dk-label.fs-label--indigo"]);
  });

  it("draws what is not proposed in grey: the outlines and their crosses in slate", () => {
    const sheet = sourceOf("first.css");
    expect(sheet).toMatch(/\.fs-outline \.fs-outline__edge \{[^}]*stroke: var\(--dk-soft\)[^}]*stroke-dasharray/);
    expect(sheet).toMatch(/\.fs-cross \{[^}]*stroke: var\(--dk-soft\)/);
  });

  it("moves nothing on a clock, a transition or chance, and repeats nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/Math\.random|Date\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|repeat|yoyo/);
  });

  it("draws no gradient, no shadow and no glow, and blends nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/gradient|drop-shadow|box-shadow|filter\s*:|mix-blend|backdrop/i);
  });

  it("moves parts only through the kit's verbs, never GSAP itself", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/from "gsap"|gsap\./);
  });

  it("keeps every module under 500 lines", () => {
    for (const file of readdirSync(dir).filter((name) => /\.(tsx?|css)$/.test(name))) expect(sourceOf(file).split("\n").length, file).toBeLessThan(500);
  });

  it("prefixes every class of its own with fs-, and styles the kit's only where one of its own is on it too", () => {
    for (const file of CSS) {
      const classes = [...css(file).matchAll(/\.([a-z][a-z0-9_-]*)/g)].map(([, name]) => name);
      expect(classes.filter((name) => !name.startsWith("fs-") && !name.startsWith("dk-")), file).toEqual([]);
      const selectors = [...css(file).matchAll(/([^{}]+)\{/g)].flatMap(([, list]) => list.split(",").map((one) => one.trim()));
      expect(selectors.filter((one) => !one.includes(".fs-")), file).toEqual([]);
    }
    for (const [file, source] of sources) expect(source, file).not.toMatch(/["\s.](md|pl|sd)-[a-z]/);
  });

  it("never sets a keyed part's opacity from its own values in CSS, since a move sets it", () => {
    const keyedClasses = new Set(nodes.flatMap((node) => node.classes));
    for (const file of CSS) {
      const rules = [...sourceOf(file).matchAll(/([^{}]+)\{([^}]*)\}/g)].filter(([, , body]) => /(^|[\s;])opacity:\s*(var|calc|clamp|min)\(/.test(body));
      for (const [, selector] of rules) {
        const last = selector.trim().split(/\s+/).at(-1)!.replace(/^\./, "");
        expect(keyedClasses.has(last), selector.trim()).toBe(false);
      }
    }
  });
});

describe("the story lines", () => {
  it("are set once each, in the band under their title, one row each", () => {
    for (const band of STORIES) {
      expect(band.band, band.picture).toBe(["one", "two", "three"][TITLES.find((title) => title.picture === band.picture)!.lines.length - 1]);
      const rows = storyRows(band.band, band.lines.length);
      storyKeys(band.id, band.lines.length).forEach((key, i) => {
        expect(elements(key), key).toBe(1);
        expect(markup, key).toContain(`top:${rows[i].y}px`);
      });
      expect(band.lines, band.picture).toEqual(PICTURES.find((picture) => picture.id === band.picture)!.story);
    }
  });

  it("come up in their slide's click, A before B, and stay up to the slide's end", () => {
    for (const band of STORIES) {
      const [a, b] = storyKeys(band.id, band.lines.length);
      const id = stepOf(band.picture);
      expect(playOf(id, a), a).toHaveLength(1);
      expect(playOf(id, b), b).toHaveLength(1);
      expect(startOf(id, b), band.picture).toBeGreaterThan(startOf(id, a));
      expect(at(id)[a].yPercent, a).toBe(0);
      expect(at(id)[b].yPercent, b).toBe(0);
    }
  });

  it("go away with their slide's picture", () => {
    for (const band of STORIES.slice(0, -1)) {
      const { html } = layerOf(band.picture);
      expect(markup.indexOf(`data-build="${html}"`), band.picture).toBeLessThan(markup.indexOf(`data-build="${storyKeys(band.id, 1)[0]}"`));
      const next = PICTURES[PICTURES.findIndex((picture) => picture.id === band.picture) + 1];
      expect(at(stepOf(next.id))[html].autoAlpha, html).toBe(0);
    }
  });
});
