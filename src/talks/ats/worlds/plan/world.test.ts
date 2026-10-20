/**
 * The plan world as a whole: its three slides in order, one at a time,
 * every word from the script, the house rules, and the story lines. Each
 * slide's own picture is tested in its own file (lanes, level-up and
 * outcomes .test.ts); what they share is in harness.ts, where things go in
 * layout.test.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME } from "@/components/deck/engine/camera";
import { CHAIN, storyKeys, storyRows } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { picturesOf } from "../steps";
import { ARRIVE } from "./beats";
import { COUNTS, PICTURES, STORIES, TITLES, groupOf, labelsOf, titleKey } from "./layout";
import { LEVEL_UP } from "./layout-level-up";
import { LEAVE, at, built, clickOf, ends, hiddenAt, ids, longest, markup, n, nodes, pictureOfKey, playOf, playsAt, startOf, texts, world } from "./harness";
import { plan } from "./world";

const dir = import.meta.dirname;
const own = readdirSync(dir).filter((file) => /\.(tsx?|css)$/.test(file) && !file.endsWith(".test.ts") && file !== "harness.ts");
const sourceOf = (file: string) => readFileSync(join(dir, file), "utf8");
const elementsOf = (key: string) => built.filter((id) => id === key).length;

describe("the plan world", () => {
  it("holds the script's pictures 13, 14 and 15 in the order shown, one click each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["13", "14", "15"]);
    expect(PICTURES.map((picture) => picture.id)).toEqual(["lanes", "level-up", "outcomes"]);
    expect(PICTURES).toEqual(picturesOf("plan"));
    expect(plan.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(PICTURES.map((picture) => clickOf(picture.id)));
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it, but the last slide's two groups", () => {
    const moved = new Set(world.keys);
    const last = new Set(Object.values(groupOf("outcomes")));
    expect([...new Set(built)].filter((key) => !moved.has(key) && !last.has(key))).toEqual([]);
  });

  it("gives every part one element, but a title's lines", () => {
    expect([...new Set(built)].filter((key) => elementsOf(key) !== (COUNTS[key] ?? 1))).toEqual([]);
  });

  it("keeps the camera at home at every step", () => {
    for (const camera of world.cameras) expect(camera).toEqual(HOME);
  });

  it.each(ids)("finishes %s inside 12 s, the first counting the world's arrival fade", (id) => {
    expect(longest(id) + (n(id) === 0 ? LEAVE : 0)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("never leaves the stage still for more than 3 s in a click", () => {
    for (const id of ids) {
      let landed = 0;
      for (const play of [...playsAt(id)].sort((a, b) => a.at - b.at)) {
        expect(play.at - landed, `${id} before ${play.key}`).toBeLessThanOrEqual(CHAIN.still);
        landed = Math.max(landed, ends(play));
      }
    }
  });

  it("ends every click on a drawing or a story line, not on a hold", () => {
    for (const id of ids) {
      const last = Math.max(...playsAt(id).map(ends));
      const finishers = playsAt(id).filter((play) => Math.abs(ends(play) - last) < 1e-9);
      expect(finishers.length, id).toBeGreaterThan(0);
    }
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    const [title] = playOf(clickOf("lanes"), titleKey("lanes"));
    expect(title.at).toBe(ARRIVE);
  });

  it("shows no picture file: every slide is drawn", () => {
    expect(markup).not.toMatch(/\.(?:webp|png|jpg|svg)\b/);
  });
});

describe("one slide at a time", () => {
  it.each(PICTURES.slice(1).map((picture, i) => [picture.id, PICTURES[i].id]))("puts the whole picture before %s away at the start of its click, and changes the title", (id, before) => {
    const click = clickOf(id);
    for (const key of Object.values(groupOf(before))) {
      const [gone] = playOf(click, key);
      expect(gone, key).toMatchObject({ at: 0, on: { autoAlpha: 0 } });
      for (const later of ids.slice(n(click))) expect(at(later)[key].autoAlpha, `${key} at ${later}`).toBe(0);
    }
    expect(at(click)[titleKey(before)].autoAlpha).toBe(0);
    expect(at(click)[titleKey(id)].yPercent).toBe(0);
  });

  it("shows each slide's title through its click, and no other title", () => {
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

  it("breaks the titles after the words chosen, each on two lines, none wider than the band", () => {
    const lines = (id: string) => TITLES.find((title) => title.picture === id)!.lines;
    expect(lines("lanes")).toEqual(["Run two lanes at once: quick wins now, and", "the foundations that make the next ones faster."]);
    for (const id of ["lanes", "level-up", "outcomes"]) expect(lines(id), id).toHaveLength(2);
    for (const band of STORIES) expect(band.band, band.picture).toBe("two");
    // At 72 px Geist bold a line of about 50 characters is as wide as the band: none is longer.
    for (const title of TITLES) for (const line of title.lines) expect(line.length, line).toBeLessThanOrEqual(50);
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => [picture.show, ...picture.steps.flatMap((step) => step.show)]);
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...labels, ...stories];

  it("are each a title, a story line or a label the script gives this world", () => {
    for (const text of texts) expect(allowed.some((words) => words.includes(text)), text).toBe(true);
  });

  it("include every title, story line and label the script gives this world", () => {
    const shown = texts.join(" ");
    for (const words of allowed) for (const word of words.split(" ")) expect(shown, words).toContain(word);
  });

  it("set each slide's labels whole, as the script gives them, but the first tile's name broken over two lines", () => {
    const split = labelsOf("outcomes")[1];
    for (const picture of PICTURES) for (const label of labelsOf(picture.id).filter((words) => words !== split)) expect(texts, label).toContain(label);
    expect(texts).toContain(split.slice(0, split.lastIndexOf(" ")));
    expect(texts).toContain(split.slice(split.lastIndexOf(" ") + 1));
  });

  it("are typed only in the script: the scenes, parts and moves hold no string of their own, comments included", () => {
    const files = own.filter((file) => /^(scene.*\.tsx|parts.*\.tsx|beats\.ts|steps-.*\.ts)$/.test(file));
    expect(files.length).toBeGreaterThanOrEqual(9);
    for (const file of files) {
      const source = sourceOf(file);
      for (const words of allowed) expect(source.includes(words), `${file}: ${words}`).toBe(false);
      // JSX text: anything set between a tag's end and the next tag that is not an expression.
      expect(source.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], file).toEqual([]);
    }
  });

  it("are navy, but white on a filled shape and the course's figure in indigo", () => {
    const words = [...markup.matchAll(/<text class="([^"]*)"[^>]*>([^<]*)</g)].map(([, classes, text]) => ({ classes: classes.split(" "), text: text.replace(/&#x27;/g, "'") }));
    expect(words.length).toBeGreaterThanOrEqual(25);
    expect(words.filter(({ classes }) => !classes.some((name) => /^pl-word--(navy|white|indigo)$/.test(name))).map(({ text }) => text)).toEqual([]);
    expect(words.filter(({ classes }) => classes.includes("pl-word--indigo")).map(({ text }) => text)).toEqual([LEVEL_UP.figure.text]);
    expect(words.filter(({ classes }) => classes.includes("pl-word--white")).map(({ text }) => text)).toEqual([labelsOf("lanes")[6], LEVEL_UP.slab.label.text]);
  });

  it("are never set under the kit's 26 px label size", () => {
    const css = sourceOf("pl.css");
    for (const [, size] of css.matchAll(/font-size:\s*(\d+)px/g)) expect(Number(size)).toBeGreaterThanOrEqual(26);
  });
});

describe("the house rules", () => {
  const sources = own.map((file) => [file, sourceOf(file)] as const);

  it("uses no orange and no deep pass green, since nobody approves and no check passes here, and no provider colour or literal colour", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-human|--dk-pass|HumanMark|PassTick|--fr-|#[0-9a-f]{3,8}\b|rgba?\(/i);
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, gold never", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-lead|--dk-dept-c|--dk-share-sauce/);
  });

  it("keeps indigo for the course's evidence: the tag on 13 and the figure on 14", () => {
    const css = sourceOf("pl.css").replace(/\/\*[\s\S]*?\*\//g, "");
    const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].filter(([, , body]) => body.includes("--dk-catalog")).map(([, selector]) => selector.trim());
    expect(rules).toEqual([".dk-label.pl-word--indigo", ".pl-tag--indigo .pl-tag__shape"]);
  });

  it("moves nothing on a clock, a transition or chance, and nothing more than once over", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/Math\.random|Date\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|repeat|yoyo|gsap/);
  });

  it("draws no gradient, no shadow and no glow, and blends nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/gradient|drop-shadow|box-shadow|filter\s*:|mix-blend|backdrop/i);
  });

  it("keeps every module under 500 lines", () => {
    for (const file of readdirSync(dir).filter((name) => /\.(tsx?|css)$/.test(name))) expect(sourceOf(file).split("\n").length, file).toBeLessThan(500);
  });

  it("prefixes every class of its own with pl-, and styles the kit's only where one of its own is on it too", () => {
    const css = sourceOf("pl.css").replace(/\/\*[\s\S]*?\*\//g, "");
    const classes = [...css.matchAll(/\.([a-z][a-z0-9_-]*)/g)].map(([, name]) => name);
    expect(classes.filter((name) => !name.startsWith("pl-") && !name.startsWith("dk-"))).toEqual([]);
    const selectors = [...css.matchAll(/([^{}]+)\{/g)].flatMap(([, list]) => list.split(",").map((one) => one.trim()));
    expect(selectors.filter((one) => !one.includes(".pl-"))).toEqual([]);
    for (const [file, source] of sources) expect(source, file).not.toMatch(/["\s.]plan-/);
  });

  it("never sets a keyed part's opacity from its own values in CSS, since a move sets it", () => {
    const css = sourceOf("pl.css");
    const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].filter(([, , body]) => /(^|[\s;])opacity:\s*(var|calc|clamp)\(/.test(body));
    const keyedClasses = new Set(nodes.flatMap((node) => node.classes));
    for (const [, selector] of rules) {
      const last = selector.trim().split(/\s+/).at(-1)!.replace(/^\./, "");
      expect(keyedClasses.has(last), selector.trim()).toBe(false);
    }
  });
});

describe("the story lines", () => {
  it("are set once each, one row each, in the band under their title", () => {
    for (const band of STORIES) {
      expect(band.band, band.picture).toBe(["one", "two", "three"][TITLES.find((title) => title.picture === band.picture)!.lines.length - 1]);
      const rows = storyRows(band.band, band.lines.length);
      storyKeys(band.id, band.lines.length).forEach((key, i) => {
        expect(elementsOf(key), key).toBe(1);
        expect(markup, key).toContain(`top:${rows[i].y}px`);
      });
      expect(band.lines, band.picture).toEqual(PICTURES.find((picture) => picture.id === band.picture)!.story);
    }
  });

  it("come up in their slide's click, A before B, and stay up to the slide's end", () => {
    for (const band of STORIES) {
      const click = clickOf(band.picture);
      const [a, b] = storyKeys(band.id, 2);
      expect(playOf(click, a), a).toHaveLength(1);
      expect(playOf(click, b), b).toHaveLength(1);
      expect(startOf(click, b), band.picture).toBeGreaterThan(startOf(click, a));
      expect(at(click)[a].yPercent, a).toBe(0);
      expect(at(click)[b].yPercent, b).toBe(0);
    }
  });

  it("go away with their slide's picture", () => {
    for (const band of STORIES.slice(0, -1)) {
      const { html } = groupOf(band.picture);
      expect(markup.indexOf(`data-build="${html}"`), band.picture).toBeLessThan(markup.indexOf(`data-build="${storyKeys(band.id, 1)[0]}"`));
      const next = PICTURES[PICTURES.findIndex((picture) => picture.id === band.picture) + 1];
      expect(at(clickOf(next.id))[html].autoAlpha, html).toBe(0);
    }
  });
});
