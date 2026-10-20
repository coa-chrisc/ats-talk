/**
 * The brought world as a whole: its three slides in order, one at a time,
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
import { COUNTS, PICTURES, STORIES, TITLES, layerOf, storyKeysOf, titleKey } from "./layout";
import { ARRIVE, partsOf } from "./moves";
import { LEAVE, at, built, ids, longest, markup, n, onStage, pictureHolding, playOf, startOf, stepOf, svgTexts, texts, visible, world } from "./harness";
import { brought } from "./world";

const dir = import.meta.dirname;
const sources = readdirSync(dir)
  .filter((file) => /\.(tsx?|css)$/.test(file) && !file.endsWith(".test.ts") && file !== "harness.ts")
  .map((file) => [file, readFileSync(join(dir, file), "utf8")] as const);

describe("the brought world", () => {
  it("holds the script's slides 1, 2 and 2a in the order shown, one click each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["1", "2", "2a"]);
    expect(PICTURES.map((picture) => picture.id)).toEqual(["title", "course", "lessons"]);
    expect(brought.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(PICTURES.map((picture) => stepOf(picture.id)));
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it", () => {
    const moved = new Set(world.keys);
    /** Shown by their parent: the last slide's picture, which nothing puts away. */
    const byParent = new Set(Object.values(layerOf("lessons")));
    expect([...new Set(built)].filter((key) => !moved.has(key) && !byParent.has(key))).toEqual([]);
  });

  it("gives every part one element, but a title's lines", () => {
    const counted = (key: string) => built.filter((id) => id === key).length;
    expect([...new Set(built)].filter((key) => counted(key) !== (COUNTS[key] ?? 1))).toEqual([]);
  });

  it("keeps the camera at home at every step", () => {
    for (const camera of world.cameras) expect(camera).toEqual(HOME);
    for (const step of brought.steps) expect(step.moves.some((move) => "camera" in move), step.id).toBe(false);
  });

  it.each(ids)("finishes %s inside 12 s, the first counting the world's arrival fade", (id) => {
    expect(longest(id) + (n(id) === 0 ? LEAVE : 0)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    expect(startOf(stepOf("title"), titleKey("title"))).toBe(ARRIVE);
  });

  it("sets slide 1 on navy and slides 2 and 2a on the deck's white", () => {
    expect(brought.steps.map((step) => step.ground)).toEqual(["navy", undefined, undefined]);
  });

  it("shows no picture file: every slide is drawn", () => {
    expect(markup).not.toMatch(/\.(?:webp|png|jpg|svg)\b/);
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

  it("shows on each slide's click only its own parts: nothing carries from the slide before", () => {
    for (const id of ids) {
      const own = new Set(brought.steps[n(id)].moves.flatMap((move) => ("key" in move ? [move.key] : [])));
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

  it("breaks the titles after the words the layout names: three lines on slide 1, two on slide 2 and one on slide 2a", () => {
    expect(TITLES.map((title) => title.lines.length)).toEqual([3, 2, 1]);
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => picture.steps.flatMap((step) => step.show));
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...PICTURES.map((picture) => picture.show), ...labels, ...stories];

  it("are each a title row, a story row or a label the script gives these slides", () => {
    expect(texts.length).toBeGreaterThan(15);
    for (const text of texts) expect(allowed.some((words) => words.includes(text)), text).toBe(true);
  });

  it("include every label, once, and every story line, whole", () => {
    /** A label is set once on each slide that shows it: a figure in runs reads as one SVG text, a dashed plate's name as one HTML text. */
    const set = [...svgTexts, ...texts.filter((text) => !svgTexts.some((whole) => whole.includes(text)))];
    for (const label of new Set(labels)) expect(set.filter((text) => text === label), label).toHaveLength(labels.filter((entry) => entry === label).length);
    const joined = texts.join(" ");
    for (const line of stories) expect(joined, line).toContain(line);
    const shown = texts.join(" ");
    for (const picture of PICTURES) for (const word of picture.show.split(" ")) expect(shown, picture.show).toContain(word);
  });

  it("are typed only in the script: the scenes, parts, moves and steps hold no string of their own, comments included", () => {
    const files = sources.filter(([file]) => /^(scene.*\.tsx|parts.*\.tsx|moves\.ts|steps-.*\.ts)$/.test(file));
    expect(files.length).toBeGreaterThan(5);
    for (const [file, source] of files) {
      // A phrase anywhere, comments included; a single word as a string of its own (a kit part may share a one-word label's name).
      for (const words of allowed) expect(words.includes(" ") ? source.includes(words) : source.includes(`"${words}"`), `${file}: ${words}`).toBe(false);
      // JSX text: anything set between a tag's end and the next tag that is not an expression.
      expect(source.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], file).toEqual([]);
    }
  });

  it("keeps every label and story line out of the layouts too, but the single words a title breaks after", () => {
    for (const [file, source] of sources.filter(([name]) => name.startsWith("layout"))) {
      for (const words of allowed.filter((entry) => entry.includes(" "))) expect(source.includes(words), `${file}: ${words}`).toBe(false);
    }
  });
});

describe("the house rules", () => {
  it("uses no orange and no pass green: nobody decides and nothing is checked on these slides", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-human|--dk-pass|--fr-|#f4642c|#1f573b/i);
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
    for (const [file, source] of sources) expect(source, file).not.toMatch(/<HumanMark\b|<PassTick\b/);
    expect(markup).not.toMatch(/class="dk-human"|class="dk-pass-tick"/);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, and no hue beyond green, the catalog's indigo and navy", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-(lead|review|fix|dept-|share-)|data-hue="(lead|review|fix|dept|share)/);
    for (const [file, source] of sources.filter(([name]) => name !== "brought.css")) expect(source, file).not.toMatch(/--dk-|#[0-9a-f]{3,6}\b/i);
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
});

describe("the story lines", () => {
  it("are set once each, in the band under their title, one row each, on the white slides", () => {
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
    for (const picture of PICTURES) {
      const [a, b] = storyKeysOf(picture.id);
      const id = stepOf(picture.id);
      expect(playOf(id, a), a).toHaveLength(1);
      expect(playOf(id, b), b).toHaveLength(1);
      expect(startOf(id, b), picture.id).toBeGreaterThan(startOf(id, a));
      expect(at(id)[a].yPercent, a).toBe(0);
      expect(at(id)[b].yPercent, b).toBe(0);
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
