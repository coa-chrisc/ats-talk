/**
 * The ready world as a whole: its six slides in order, one click each,
 * every word from the script, the house rules, and the story lines. Each
 * slide's own picture is tested in its own file (levels, who-decides,
 * residents, could-be, applied and close .test.ts), its places in layout.test.ts;
 * what they share is in harness.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME } from "@/components/deck/engine/camera";
import { CHAIN, storyKeys, storyRows } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { ARRIVE } from "./beats";
import { CLOSE_ID, COUNTS, PICTURES, STORIES, TITLES, groupOf, titleKey } from "./layout";
import { CLOSE } from "./layout-close";
import { LEAVE, at, built, ends, hiddenAt, ids, lastLanding, markup, n, nodes, pictureOfKey, playOf, playsAt, startOf, texts, world } from "./harness";
import { ready } from "./world";

const dir = import.meta.dirname;
const sources = readdirSync(dir)
  .filter((file) => /\.(tsx?|css)$/.test(file) && !file.endsWith(".test.ts") && file !== "harness.ts")
  .map((file) => [file, readFileSync(join(dir, file), "utf8")] as const);
const source = (file: string) => sources.find(([name]) => name === file)![1];

describe("the ready world", () => {
  it("holds the script's slides 24 to 29 in the order shown, one click each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["24", "25", "26", "27", "28", "29"]);
    expect(ready.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(["levels.play", "who-decides.play", "residents.play", "could-be.play", "applied.play", "lets-talk.play"]);
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

  it.each(ids)("never leaves the stage still for more than 3 s inside %s, staggers counted", (id) => {
    let landed = 0;
    let still = 0;
    for (const play of [...playsAt(id)].sort((a, b) => a.at - b.at)) {
      still = Math.max(still, play.at - landed);
      landed = Math.max(landed, ends(play));
    }
    expect(still).toBeLessThanOrEqual(CHAIN.still + 1e-9);
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    const [title] = playOf("levels.play", titleKey("levels"));
    expect(title.at).toBe(ARRIVE);
  });

  it("puts only the close on navy, the other slides on the deck's white", () => {
    expect(ready.steps.map((step) => step.ground ?? "white")).toEqual(["white", "white", "white", "white", "white", "navy"]);
  });

  it("shows no picture file: every slide is drawn", () => {
    expect(markup).not.toMatch(/\.(?:webp|png|jpg|svg)\b/);
  });
});

describe("one slide at a time", () => {
  it.each(PICTURES.slice(1).map((picture, i) => [picture.id, PICTURES[i].id]))("puts the whole picture before %s away at its click, and its title", (id, before) => {
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

  it("breaks the long titles after the words the layout names, on two or three lines", () => {
    const lines = (id: string) => TITLES.find((title) => title.picture === id)!.lines;
    expect(lines("levels")).toHaveLength(2);
    expect(lines("levels")[0].endsWith("own.")).toBe(true);
    expect(lines("who-decides")).toHaveLength(2);
    expect(lines("who-decides")[0].endsWith("cross.")).toBe(true);
    expect(lines("residents")).toHaveLength(1);
    expect(lines("could-be")).toHaveLength(2);
    expect(lines("could-be")[0].endsWith("done,")).toBe(true);
    expect(lines("applied")).toHaveLength(2);
    expect(lines("applied")[0].endsWith("lessons,")).toBe(true);
    expect(CLOSE.title.lines).toHaveLength(1);
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => [picture.show, ...picture.steps.flatMap((step) => step.show)]);
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...labels, ...stories];
  const named = PICTURES.flatMap((picture) => picture.steps.flatMap((step) => step.show));

  it("are each a title, a story line or a label the script gives this part", () => {
    for (const text of texts) expect(allowed.some((words) => words.includes(text)), text).toBe(true);
  });

  it("include every title, story line and label the script gives this part, whole or broken over consecutive lines", () => {
    const over = (words: string) => texts.some((_, i) => [2, 3].some((k) => texts.slice(i, i + k).join(" ") === words));
    for (const words of [...named, ...stories]) expect(texts.includes(words) || over(words), words).toBe(true);
    const shown = texts.join(" ");
    for (const picture of PICTURES) for (const word of picture.show.split(" ")) expect(shown, picture.show).toContain(word);
  });

  it("are typed only in the script: the scenes, parts, beats and steps hold no phrase of their own, comments included", () => {
    const drawing = sources.filter(([file]) => /^(scene.*\.tsx|parts.*\.tsx|beats\.ts|steps-.*\.ts)$/.test(file));
    expect(drawing.length).toBeGreaterThan(12);
    for (const [file, text] of drawing) {
      // Every phrase of two words or more, anywhere; a one-word label as a string of its own.
      for (const words of allowed.filter((entry) => entry.includes(" "))) expect(text.includes(words), `${file}: ${words}`).toBe(false);
      for (const word of named.filter((entry) => !entry.includes(" "))) expect(text.includes(`"${word}"`), `${file}: ${word}`).toBe(false);
      // JSX text: anything set between a tag's end and the next tag that is not an expression.
      expect(text.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], file).toEqual([]);
    }
  });

  it("quote no step label in any module, even in a comment", () => {
    for (const [file, text] of sources) for (const label of named) expect(text.includes(`"${label}"`), `${file}: ${label}`).toBe(false);
  });
});

describe("the house rules", () => {
  it("uses orange only through the kit's HumanMark, on slides 25 and 26, and the pass green only through its PassTick, on slides 26 and 28", () => {
    for (const [file, text] of sources) expect(text, file).not.toMatch(/--dk-human|--dk-pass|#f4642c|#1f573b/i);
    expect(sources.filter(([, text]) => /<HumanMark\b/.test(text)).map(([file]) => file)).toEqual(["scene-residents.tsx", "scene-who-decides.tsx"]);
    expect(sources.filter(([, text]) => /<PassTick\b/.test(text)).map(([file]) => file)).toEqual(["scene-applied.tsx", "scene-residents.tsx"]);
    for (const [file, text] of sources) expect(text, file).not.toMatch(VENDOR_COLOURS);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, and no literal colour", () => {
    for (const [file, text] of sources) expect(strayTokens(text), file).toEqual([]);
    for (const [file, text] of sources.filter(([file]) => file.endsWith(".css"))) expect(text, file).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(/i);
  });

  it("puts the level hues on slide 24's bands and agents only, and indigo on slide 27's pack only", () => {
    for (const [file, text] of sources.filter(([file]) => file !== "layout-levels.ts")) expect(text, file).not.toMatch(/"(?:review|lead|fix)"/);
    const css = source("ready.css").replace(/\/\*[\s\S]*?\*\//g, "");
    expect(css).not.toMatch(/--dk-(?:review|lead|fix|dept-[abc])\b/);
    const indigo = [...css.matchAll(/([^{}]+)\{[^}]*--dk-catalog[^}]*\}/g)].map(([, selector]) => selector.trim());
    expect(indigo).toEqual([".rd-runner--catalog .rd-runner__head", ".rd-runner--catalog .rd-runner__limb"]);
  });

  it("moves nothing on a clock, a transition or chance, and repeats nothing", () => {
    for (const [file, text] of sources) expect(text, file).not.toMatch(/Math\.random|Date\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|repeat|yoyo/);
  });

  it("moves through the kit's verbs only, never GSAP itself", () => {
    for (const [file, text] of sources) expect(text, file).not.toMatch(/from "gsap"|gsap\./);
  });

  it("draws no gradient, glow or blend", () => {
    for (const [file, text] of sources) expect(text, file).not.toMatch(/gradient|drop-shadow|box-shadow|filter\s*:|mix-blend|backdrop/i);
  });

  it("paints no fill on a line that draws on, but one that comes in with its drawing, so an undrawn part is not there", () => {
    const css = source("ready.css").replace(/\/\*[\s\S]*?\*\//g, "");
    const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map(([, selectors, body]) => ({ selectors: selectors.split(",").map((one) => one.trim()), body }));
    const drawn = new Set([...markup.matchAll(/class="([^"]*\bdk-draw\b[^"]*)"/g)].flatMap(([, list]) => list.split(/\s+/).filter((name) => name.startsWith("rd-"))));
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

  it("prefixes every class of its own with rd-", () => {
    const classes = [...markup.matchAll(/class="([^"]+)"/g)].flatMap(([, list]) => list.split(/\s+/));
    expect([...new Set(classes.filter((name) => !/^(rd-|dk-)/.test(name)))]).toEqual([]);
    const own = [...source("ready.css").replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/\.([a-z][\w-]*)/g)].map(([, name]) => name).filter((name) => !name.startsWith("dk-"));
    expect(own.filter((name) => !name.startsWith("rd-"))).toEqual([]);
  });
});

describe("the story lines", () => {
  const bands = [...STORIES, { picture: CLOSE_ID, id: `story.${CLOSE_ID}`, lines: PICTURES.at(-1)!.story }];

  it("are set once each on the white slides, in the band under their title, one row each", () => {
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
    const keys = storyKeys(`story.${CLOSE_ID}`, 2);
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
