/**
 * Part 5 as a whole: its eleven backup slides in order, one at a time,
 * every word from the script, the house rules, and the story lines. Each
 * group's pictures are tested in their own file (tools, rules, means and
 * catalog .test.ts); what they share is in harness.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME } from "@/components/deck/engine/camera";
import { CHAIN, storyKeys, storyRows } from "@/components/deck/kit";
import { VENDOR_COLOURS, strayTokens } from "@/components/deck/kit/palette";
import { WORLD_ENTRIES } from "../index";
import { ARRIVE } from "./beats";
import { COUNTS, PICTURES, STORIES, TITLES, groupOf, titleKey } from "./layout";
import { LEAVE, at, built, ids, lengthOf, markup, n, playOf, playsAt, startOf, stepOf, texts, world } from "./harness";
import { backup, backupEntry } from "./world";

describe("the backup world", () => {
  it("holds the script's eleven backup slides, 25 to 35, in the order shown, one step each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"]);
    expect(backup.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(PICTURES.map((picture) => `${picture.id}.play`));
  });

  it("is listed among the deck's worlds", () => {
    expect(WORLD_ENTRIES).toContain(backupEntry);
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it", () => {
    const moved = new Set(world.keys);
    /** Shown by their parent: the last slide's picture, which nothing puts away. */
    const byParent = new Set(Object.values(groupOf("credentials")));
    expect([...new Set(built)].filter((key) => !moved.has(key) && !byParent.has(key))).toEqual([]);
  });

  it("starts every part a slide shows hidden, undrawn or empty, so nothing of a later slide shows before its click", () => {
    const first = world.states[0];
    const showing = Object.entries(first).filter(([key, state]) => {
      if (Object.values(groupOf(key.split(".")[0])).includes(key) || key.startsWith("title.")) return false;
      const s = state as Record<string, number>;
      const hidden = s.autoAlpha === 0 || s["--d"] === 0 || s["--k"] === 0 || s.yPercent === 120 || s["--wl"] === 100 || s["--wr"] === 100 || s["--wt"] === 100 || s["--wb"] === 100;
      return !hidden;
    });
    expect(showing.map(([key]) => key)).toEqual([]);
  });

  it("gives every part one element, but a title's lines", () => {
    const counted = (key: string) => built.filter((id) => id === key).length;
    expect([...new Set(built)].filter((key) => counted(key) !== (COUNTS[key] ?? 1))).toEqual([]);
  });

  it("keeps the camera at home at every step", () => {
    for (const camera of world.cameras) expect(camera).toEqual(HOME);
  });

  it.each(ids)("finishes %s inside 12 s, the first counting the world's arrival fade", (id) => {
    expect(lengthOf(id) + (n(id) === 0 ? LEAVE : 0)).toBeLessThanOrEqual(CHAIN.longest);
  });

  it("brings the first title up once the world's arrival fade is under way", () => {
    const [title] = playOf(stepOf("foresight"), titleKey("foresight"));
    expect(title.at).toBe(ARRIVE);
  });

  it("shows no stills: the catalog's home page is drawn, so no screenshot's entries or figures reach the stage", () => {
    expect(markup.match(/\.(?:webp|png|jpg)\b/g)).toBeNull();
    expect(markup).not.toMatch(/<img/);
  });
});

describe("one slide at a time", () => {
  it.each(PICTURES.slice(1).map((picture, i) => [picture.id, PICTURES[i].id]))("puts the whole picture before %s away at its click, and changes the title", (id, before) => {
    const step = stepOf(id);
    for (const key of Object.values(groupOf(before))) {
      const [gone] = playOf(step, key);
      expect(gone, key).toMatchObject({ at: 0, on: { autoAlpha: 0 } });
      for (const later of ids.slice(n(step))) expect(at(later)[key].autoAlpha, `${key} at ${later}`).toBe(0);
    }
    expect(at(step)[titleKey(before)].autoAlpha).toBe(0);
    expect(at(step)[titleKey(id)].yPercent).toBe(0);
  });

  it("shows each slide's title at its step, and no other title", () => {
    for (const id of ids) {
      const showing = PICTURES.filter((picture) => {
        const state = at(id)[titleKey(picture.id)];
        return state.yPercent === 0 && state.autoAlpha !== 0;
      });
      expect(showing.map((picture) => picture.id), id).toEqual([id.split(".")[0]]);
    }
  });

  it("brings a slide's picture back whole when the speaker jumps straight to it", () => {
    for (const picture of PICTURES) for (const key of Object.values(groupOf(picture.id))) expect(at(stepOf(picture.id))[key]?.autoAlpha ?? 1, key).toBe(1);
  });
});

describe("the words on the stage", () => {
  const labels = PICTURES.flatMap((picture) => picture.steps.flatMap((step) => step.show));
  const titles = PICTURES.map((picture) => picture.show);
  const stories = PICTURES.flatMap((picture) => picture.story);
  const allowed = [...titles, ...labels, ...stories];

  it("are each a title, a story line or a label the script gives this part", () => {
    for (const text of texts) expect(allowed.some((words) => words.includes(text)), text).toBe(true);
  });

  it("include every title, story line and label the script gives this part", () => {
    const shown = texts.join(" ");
    for (const words of allowed) for (const word of words.split(" ")) expect(shown, words).toContain(word);
    for (const label of labels) expect(texts.some((text) => text === label || label.startsWith(text) || label.endsWith(text)), label).toBe(true);
  });

  it("set each title's lines in the script's own words, broken only between them", () => {
    for (const title of TITLES) expect(title.lines.join(" "), title.picture).toBe(PICTURES.find((picture) => picture.id === title.picture)!.show);
  });

  it("are typed only in the script: the scenes and the moves hold no string of their own", () => {
    const dir = import.meta.dirname;
    const files = readdirSync(dir).filter((file) => /^(scene.*\.tsx|beats\.ts|steps-.*\.ts)$/.test(file));
    expect(files.length).toBeGreaterThanOrEqual(10);
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

  it("uses orange only through the kit's human mark, the deep green only through its tick, and no provider colour", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-human|--dk-pass|--fr-|#f4642c|#1f573b/i);
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
  });

  it("paints otherwise only with the deck's tokens and the role aliases, and names no colour by its value", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
    for (const [file, source] of sources) expect(source, file).not.toMatch(/#[0-9a-f]{3,8}\b|rgb\(|hsl\(/i);
  });

  it("uses the catalog's colour on slide 34 only", () => {
    for (const [file, source] of sources.filter(([name]) => !/catalog|backup\.css/.test(name))) expect(source, file).not.toMatch(/--dk-catalog|tone="catalog"|edge="catalog"/);
    const css = sources.find(([name]) => name === "backup.css")![1];
    const rules = css.split("}").filter((rule) => rule.includes("--dk-catalog"));
    for (const rule of rules) expect(rule, rule).toMatch(/backup-(brand|catalog-tag|feedback|live)/);
  });

  it("moves nothing on a clock, a transition or chance, and repeats nothing", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/Math\.random|Date\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|repeat|yoyo/);
  });

  it("moves only with the kit's verbs, never GSAP itself", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/from "gsap"|gsap\./);
  });

  it("draws no gradient, glow, filter or blend", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/gradient|drop-shadow|box-shadow|filter\s*:|mix-blend/i);
  });

  it("names its own classes with the world's prefix", () => {
    for (const [file, source] of sources.filter(([name]) => name.endsWith(".css"))) {
      const classes = [...source.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/\.([a-z][a-z0-9_-]*)/g)].map((match) => match[1]).filter((name) => !name.startsWith("dk-"));
      for (const name of classes) expect(name, file).toMatch(/^backup-/);
    }
  });

  it("keeps every module under 500 lines", () => {
    const all = readdirSync(dir).filter((file) => /\.(tsx?|css)$/.test(file));
    for (const file of all) expect(readFileSync(join(dir, file), "utf8").split("\n").length, file).toBeLessThan(500);
  });
});

describe("the story lines", () => {
  it("are set once each, in the band under their title, one title line, two or three", () => {
    for (const band of STORIES) {
      expect(band.band, band.picture).toBe(["one", "two", "three"][TITLES.find((title) => title.picture === band.picture)!.lines.length - 1]);
      const rows = storyRows(band.band, band.lines.flat().length);
      storyKeys(band.id, band.lines.length).forEach((key, i) => {
        expect(built.filter((id) => id === key).length, key).toBe(1);
        expect(markup, key).toContain(`top:${rows[i].y}px`);
      });
      expect(band.lines.map((rows) => rows.join(" ")), band.picture).toEqual(PICTURES.find((picture) => picture.id === band.picture)!.story);
    }
  });

  it("come up inside their slide's click, A before B, and stay up to its end", () => {
    for (const band of STORIES) {
      const step = stepOf(band.picture);
      const [a, b] = storyKeys(band.id, band.lines.length);
      expect(playOf(step, a), a).toHaveLength(1);
      expect(playOf(step, b), b).toHaveLength(1);
      expect(startOf(step, b), band.picture).toBeGreaterThan(startOf(step, a));
      expect(at(step)[a].yPercent, a).toBe(0);
      expect(at(step)[b].yPercent, b).toBe(0);
    }
  });

  it("go away with their slide's picture", () => {
    for (const band of STORIES.slice(0, -1)) {
      const { html } = groupOf(band.picture);
      expect(markup.indexOf(`data-build="${html}"`), band.picture).toBeLessThan(markup.indexOf(`data-build="${storyKeys(band.id, 1)[0]}"`));
      const next = PICTURES[PICTURES.findIndex((picture) => picture.id === band.picture) + 1];
      expect(at(stepOf(next.id))[html].autoAlpha, html).toBe(0);
    }
  });

  it("each land after the slide's title has started to come up", () => {
    for (const band of STORIES) {
      const step = stepOf(band.picture);
      const [a] = storyKeys(band.id, band.lines.length);
      expect(startOf(step, a)).toBeGreaterThan(startOf(step, titleKey(band.picture)));
    }
  });

  it("leave every click with a moment of the finished picture inside the 12 s", () => {
    for (const id of ids) expect(Math.max(...playsAt(id).map((play) => play.at)), id).toBeLessThan(CHAIN.longest - 1);
  });
});
