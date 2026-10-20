/**
 * The ideas world as a whole: its four slides in order, one at a time,
 * every word from the script, the house rules, and the story lines. Each
 * slide's own picture is tested in beats.test.ts; what they share is in
 * harness.ts, where things go in layout.test.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME } from "@/components/deck/engine/camera";
import { CHAIN, storyKeys, storyRows } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { COUNTS, PICTURES, STORIES, TITLES, layerOf, titleKey } from "./layout";
import { ARRIVE } from "./moves";
import { LEAVE, at, built, ids, longest, markup, n, playOf, startOf, stepOf, texts, world } from "./harness";
import { ideas, ideasEntry } from "./world";

describe("the ideas world", () => {
  it("holds the script's slides 7 to 10 in the order shown, one click each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["7", "8", "9", "10"]);
    expect(ideas.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(PICTURES.map((picture) => stepOf(picture.id)));
    expect(ideasEntry.world).toBe(ideas);
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it", () => {
    const moved = new Set(world.keys);
    /** Shown by their parent: the last slide's picture, which nothing puts away. */
    const byParent = new Set(Object.values(layerOf("earn")));
    expect([...new Set(built)].filter((key) => !moved.has(key) && !byParent.has(key))).toEqual([]);
  });

  it("gives every part one element, but a title's lines", () => {
    const counted = (key: string) => built.filter((id) => id === key).length;
    expect([...new Set(built)].filter((key) => counted(key) !== (COUNTS[key] ?? 1))).toEqual([]);
  });

  it("keeps the camera at home at every step", () => {
    for (const camera of world.cameras) expect(camera).toEqual(HOME);
  });

  it.each(ids)("finishes %s inside 12 s, the first counting the world's arrival fade", (id) => {
    expect(longest(id) + (n(id) === 0 ? LEAVE : 0)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it.each(ids)("never leaves the stage still for more than 3 s inside %s", (id) => {
    let landed = 0;
    let still = 0;
    for (const play of [...world.plays[n(id)]].sort((a, b) => a.at - b.at)) {
      still = Math.max(still, play.at - landed);
      const many = "key" in play ? built.filter((key) => key === play.key).length || 1 : 1;
      landed = Math.max(landed, play.at + play.duration + play.stagger * Math.max(0, many - 1));
    }
    expect(still).toBeLessThanOrEqual(CHAIN.still);
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    const [title] = playOf(stepOf("ladder"), titleKey("ladder"));
    expect(title.at).toBe(ARRIVE);
  });

  it("shows no picture file: every slide is drawn", () => {
    expect(markup).not.toMatch(/\.(?:webp|png|jpg|svg)\b/);
  });
});

describe("one slide at a time", () => {
  it.each(PICTURES.slice(1).map((picture, i) => [picture.id, PICTURES[i].id]))("puts the whole picture before %s away at its click, and changes the title", (id, before) => {
    const first = stepOf(id);
    for (const key of Object.values(layerOf(before))) {
      const [gone] = playOf(first, key);
      expect(gone, key).toMatchObject({ at: 0, on: { autoAlpha: 0 } });
      for (const later of ids.slice(n(first))) expect(at(later)[key].autoAlpha, `${key} at ${later}`).toBe(0);
    }
    expect(at(first)[titleKey(before)].autoAlpha).toBe(0);
    expect(at(first)[titleKey(id)].yPercent).toBe(0);
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

  it("breaks every title on two lines, after the word the layout names", () => {
    const lines = (id: string) => TITLES.find((title) => title.picture === id)!.lines;
    expect(lines("ladder")[0].endsWith("one.")).toBe(true);
    expect(lines("enforce")[0].endsWith("two.")).toBe(true);
    expect(lines("people")[0].endsWith("three.")).toBe(true);
    expect(lines("earn")[0].endsWith("cheap.")).toBe(true);
    for (const id of ["ladder", "enforce", "people", "earn"]) expect(lines(id), id).toHaveLength(2);
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => [picture.show, ...picture.steps.flatMap((step) => step.show)]);
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...labels, ...stories];

  it("are each a title, a story line or a label the script gives these slides", () => {
    for (const text of texts) expect(allowed.some((words) => words.includes(text)), text).toBe(true);
  });

  it("include every title, story line and label the script gives these slides, whole", () => {
    for (const words of [...PICTURES.flatMap((picture) => picture.steps.flatMap((step) => step.show)), ...stories]) expect(texts, words).toContain(words);
    const shown = texts.join(" ");
    for (const picture of PICTURES) for (const word of picture.show.split(" ")) expect(shown, picture.show).toContain(word);
  });

  it("are typed only in the script: the scenes, parts and moves hold no string of their own, in code or in comments", () => {
    const dir = import.meta.dirname;
    const files = readdirSync(dir).filter((file) => /^(scene.*\.tsx|parts.*\.tsx|moves\.ts|steps-.*\.ts)$/.test(file));
    expect(files.length).toBeGreaterThanOrEqual(12);
    for (const file of files) {
      const source = readFileSync(join(dir, file), "utf8");
      for (const words of allowed) expect(source.includes(words), `${file}: ${words}`).toBe(false);
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

  it("uses no orange, no deep pass green but the kit's PassTick, and no provider colour: nobody decides on these slides", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-human|--dk-pass|--fr-|#f4642c|#1f573b|HumanMark/i);
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
  });

  it("puts the deep-green tick only on the checks that passed: the first rung, the project's two gates and the six tests", () => {
    const ticks = [...markup.matchAll(/class="dk-pass-tick" data-build="([^"]+)"/g)].map((match) => match[1]);
    expect(ticks).toEqual(["ladder.tick", "earn.tick.0", "earn.tick.1", ...[0, 1, 2, 3, 4, 5].map((i) => `earn.test.${i}.tick`)]);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, and gives the outside evidence, the indigo, only to slide 9", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
    for (const [file, source] of sources.filter(([name]) => !/people|ideas\.css|parts/.test(name))) expect(source, file).not.toMatch(/--dk-catalog|"catalog"/);
    for (const hue of ["--dk-lead", "--dk-review", "--dk-fix", "--dk-dept", "--dk-share"]) for (const [file, source] of sources) expect(source, `${file} ${hue}`).not.toContain(hue);
  });

  it("moves nothing on a clock, a transition or chance, and repeats nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/Math\.random|Date\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|repeat|yoyo/);
  });

  it("draws no gradient and no glow, and blends nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/gradient|drop-shadow|box-shadow|filter\s*:|mix-blend|backdrop/i);
  });

  it("moves parts only through the kit's verbs, never GSAP itself", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/from "gsap"|gsap\./);
  });

  it("sets no word under 22 px", () => {
    const css = readFileSync(join(dir, "ideas.css"), "utf8");
    for (const [, size] of css.matchAll(/font-size:\s*(\d+)px/g)) expect(Number(size)).toBeGreaterThanOrEqual(22);
  });

  it("keeps every module under 500 lines", () => {
    const all = readdirSync(dir).filter((file) => /\.(tsx?|css)$/.test(file));
    for (const file of all) expect(readFileSync(join(dir, file), "utf8").split("\n").length, file).toBeLessThan(500);
  });
});

describe("the story lines", () => {
  it("are set once each, in the band under their title, one row each", () => {
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
