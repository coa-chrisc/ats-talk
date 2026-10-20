/**
 * The plan world as a whole: its nine slides in order, one at a time, every
 * word from the script, the house rules, and the story lines. Each slide's
 * own picture is tested in its own file (goals, program-team,
 * lift-developers, roadmap, knowledge, readiness and residents .test.ts); what they share is in harness.ts.
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
import { ROADMAP } from "./layout-roadmap";
import { LEAVE, at, built, clickOf, ends, hiddenAt, ids, longest, markup, n, nodes, pictureOfKey, playOf, playsAt, startOf, texts, world } from "./harness";
import { plan } from "./world";

const dir = import.meta.dirname;
const own = readdirSync(dir).filter((file) => /\.(tsx?|css)$/.test(file) && !file.endsWith(".test.ts") && file !== "harness.ts");
const sourceOf = (file: string) => readFileSync(join(dir, file), "utf8");

describe("the plan world", () => {
  it("holds the script's nine pictures from 18 to 21a in the order shown, one click each", () => {
    expect(PICTURES.map((picture) => picture.number)).toEqual(["18", "19", "19a", "19b", "20", "20a", "20b", "21", "21a"]);
    expect(PICTURES).toEqual(picturesOf("plan"));
    expect(plan.steps.map((step) => step.id)).toEqual(ids);
    expect(ids).toEqual(PICTURES.map((picture) => clickOf(picture.id)));
  });

  it("has in its scene every part a step names", () => {
    expect(world.keys.filter((key) => !built.includes(key))).toEqual([]);
  });

  it("moves every part in its scene, so none shows by default where no step put it, but the last slide's two groups", () => {
    const moved = new Set(world.keys);
    const last = new Set(Object.values(groupOf("residents")));
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

  it("brings the first title up once the world's arrival fade is under way", () => {
    const [title] = playOf(clickOf("north-star"), titleKey("north-star"));
    expect(title.at).toBe(ARRIVE);
  });
});

const elementsOf = (key: string) => built.filter((id) => id === key).length;

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

  it("breaks the long titles after the words chosen, each over two lines, and sets 21a on one", () => {
    const lines = (id: string) => TITLES.find((title) => title.picture === id)!.lines;
    expect(lines("residents")).toHaveLength(1);
    for (const id of ["north-star", "people", "program-team", "lift-developers", "roadmap", "knowledge", "readiness", "built-to-last"]) expect(lines(id), id).toHaveLength(2);
    expect(lines("knowledge")).toEqual(["Grow the City's own staff, and give them", "the knowledge and tools to get better results."]);
    expect(lines("roadmap")).toEqual(["A roadmap in two lanes: deliver projects now,", "and build long-term infrastructure and enablement."]);
    // At 72 px a line of about 50 characters is as wide as the band: none is longer.
    for (const title of TITLES) for (const line of title.lines) expect(line.length, line).toBeLessThanOrEqual(51);
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
    const split = labelsOf("north-star")[1];
    for (const picture of PICTURES) for (const label of labelsOf(picture.id).filter((words) => words !== split)) expect(texts, label).toContain(label);
    expect(split.split(" ").slice(-1)[0]).toBe(texts[texts.indexOf(split.slice(0, split.lastIndexOf(" "))) + 1]);
  });

  it("are typed only in the script: the scenes, parts and moves hold no string of their own", () => {
    const files = own.filter((file) => /^(scene.*\.tsx|parts.*\.tsx|beats\.ts|steps-.*\.ts)$/.test(file));
    expect(files.length).toBeGreaterThanOrEqual(13);
    for (const file of files) {
      const source = sourceOf(file);
      for (const words of allowed) expect(source.includes(words), `${file}: ${words}`).toBe(false);
      // JSX text: anything set between a tag's end and the next tag that is not an expression.
      expect(source.match(/>[ \t]*[A-Za-z][^<>{}]*<\//g) ?? [], file).toEqual([]);
    }
  });

  it("are navy, but the door's word in the process's green and the tip's name in white on its navy", () => {
    const words = [...markup.matchAll(/<text class="([^"]*)"[^>]*>([^<]*)</g)].map(([, classes, text]) => ({ classes: classes.split(" "), text }));
    expect(words.length).toBeGreaterThanOrEqual(40);
    expect(words.filter(({ classes }) => !classes.some((name) => /^plan-word--(navy|process|white)$/.test(name))).map(({ text }) => text)).toEqual([]);
    expect(words.filter(({ classes }) => classes.includes("plan-word--process")).map(({ text }) => text)).toEqual([ROADMAP.door.word.text]);
    expect(words.filter(({ classes }) => classes.includes("plan-word--white")).map(({ text }) => text)).toEqual([labelsOf("readiness")[0]]);
  });
});

describe("the house rules", () => {
  const sources = own.map((file) => [file, sourceOf(file)] as const);

  it("uses orange only through the kit's human mark, the deep pass green only through its tick, no catalog indigo and no provider colour", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/--dk-human|--dk-pass|--dk-catalog|"catalog"|--fr-|#[0-9a-f]{3,8}\b|rgba?\(/i);
    for (const [file, source] of sources) expect(source, file).not.toMatch(VENDOR_COLOURS);
    expect(markup.match(/class="dk-human"/g)).toHaveLength(1);
  });

  it("paints otherwise only with the deck's tokens and the role aliases", () => {
    for (const [file, source] of sources) expect(strayTokens(source), file).toEqual([]);
  });

  it("moves nothing on a clock, a transition or chance, and nothing more than once over", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/Math\.random|Date\b|setTimeout|setInterval|requestAnimationFrame|transition\s*:|animation\s*:|repeat|yoyo|gsap/);
  });

  it("draws no gradient, no shadow and no glow", () => {
    for (const [file, source] of sources) expect(source, file).not.toMatch(/gradient|drop-shadow|box-shadow|filter\s*:|mix-blend/i);
  });

  it("keeps every module under 500 lines", () => {
    for (const file of readdirSync(dir).filter((name) => /\.(tsx?|css)$/.test(name))) expect(sourceOf(file).split("\n").length, file).toBeLessThan(500);
  });

  it("prefixes every class of its own with plan-, and styles the kit's only where one of its own is on it too", () => {
    const css = sourceOf("plan.css").replace(/\/\*[\s\S]*?\*\//g, "");
    const classes = [...css.matchAll(/\.([a-z][a-z0-9_-]*)/g)].map(([, name]) => name);
    expect(classes.filter((name) => !name.startsWith("plan-") && !name.startsWith("dk-"))).toEqual([]);
    const selectors = [...css.matchAll(/([^{}]+)\{/g)].flatMap(([, list]) => list.split(",").map((one) => one.trim()));
    expect(selectors.filter((one) => !one.includes(".plan-"))).toEqual([]);
  });

  it("sets its words in their tone over the kit's slate label type", () => {
    const css = sourceOf("plan.css");
    for (const tone of ["navy", "process", "white"]) expect(css, tone).toContain(`.dk-label.plan-word--${tone}`);
  });

  it("fills a solid person only as they draw on, so a person not yet drawn leaves no white shape on another slide", () => {
    const css = sourceOf("plan.css").replace(/\/\*[\s\S]*?\*\//g, "");
    const rule = (selector: string) => css.match(new RegExp(`(^|\\})\\s*${selector.replace(/[.-]/g, "\\$&")}\\s*\\{([^}]*)\\}`))?.[2] ?? "";
    expect(rule(".plan-figure--solid .plan-figure__line")).toMatch(/fill-opacity:\s*var\(--d,\s*0\)/);
    expect(rule(".plan-figure--drawn.plan-figure--solid .plan-figure__line")).toMatch(/fill-opacity:\s*1/);
  });

  it("never sets a keyed part's opacity from its own values in CSS, since a move sets it", () => {
    const css = sourceOf("plan.css");
    const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].filter(([, , body]) => /(^|[\s;])opacity:\s*(var|calc)\(/.test(body));
    const keyedClasses = new Set(nodes.flatMap((node) => node.classes));
    for (const [, selector] of rules) {
      const last = selector.trim().split(/\s+/).at(-1)!.replace(/^\./, "");
      expect(keyedClasses.has(last), selector.trim()).toBe(false);
    }
  });

  it("brings a drawn outline's ground in with its line, never a solid ground under an undrawn edge", () => {
    const css = sourceOf("plan.css");
    for (const name of ["plan-frame__ground", "plan-ground"]) {
      const bodies = [...css.matchAll(new RegExp(`\\.${name}\\s*\\{([^}]*)\\}`, "g"))].map(([, body]) => body);
      expect(bodies.length, name).toBeGreaterThan(0);
      for (const body of bodies) expect(body, name).toMatch(/fill-opacity: (calc\()?var\(--d, 0\)/);
    }
    for (const variant of ["plan-frame--tint", "plan-frame--solid"]) expect(css, variant).toMatch(new RegExp(`\\.${variant} \\.plan-frame__ground \\{[^}]*fill-opacity: (calc\\()?var\\(--d, 0\\)`));
  });

  it("gives every agent the process's colour, and fills its ring once it has arrived", () => {
    const agents = [...markup.matchAll(/<g class="dk-agent" data-build="([^"]+)"( data-role="([^"]+)")?/g)].map(([, key, , role]) => ({ key, role }));
    expect(agents.map(({ key }) => key)).toEqual(["knowledge.helper", "residents.helper"]);
    for (const { key, role } of agents) {
      expect(role, key).toBe("process");
      const click = clickOf(pictureOfKey(key));
      const [ring] = playOf(click, key, "--k");
      expect(ring.on["--k"], key).toBe(1);
      expect(ring.at, key).toBeGreaterThan(startOf(click, key, "autoAlpha"));
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
