/**
 * What the plan world's tests share: the world compiled, its scene rendered
 * and parsed into its keyed parts, and the questions every test file asks of
 * them (when a part moves in a click, where it is after it, whether it shows,
 * how many elements carry its id). Only the test files import it.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect } from "vitest";
import { compile, type Play } from "@/components/deck/engine/compile";
import type { Vars } from "@/components/deck/engine/types";
import type { Box } from "@/components/deck/kit";
import { stepId } from "../steps";
import { PICTURES } from "./layout";
import { plan } from "./world";

export const world = compile(plan);
/** The world before this one fading out: a world's first click plays after it (engine/director.ts). */
export const LEAVE = 0.6;
export const ids = PICTURES.flatMap((picture) => picture.steps.map((step) => stepId(picture.id, step.id)));
export const n = (id: string) => {
  const index = ids.indexOf(id);
  if (index < 0) throw new Error(`No step "${id}".`);
  return index;
};
/** Every part's state once a step has played. */
export const at = (id: string) => world.states[n(id) + 1];
export type PartPlay = Extract<Play, { key: string }>;
export const playsAt = (id: string) => world.plays[n(id)].filter((play): play is PartPlay => "key" in play);
export const playOf = (id: string, key: string, prop?: string) => playsAt(id).filter((play) => play.key === key && (!prop || prop in play.on));
export const only = (plays: PartPlay[]) => {
  expect(plays).toHaveLength(1);
  return plays[0];
};
/** A slide's one click. */
export const clickOf = (pictureId: string) => stepId(pictureId, "play");

export const markup = renderToStaticMarkup(createElement(plan.Scene));
export const built = [...markup.matchAll(/data-build="([^"]+)"/g)].map((match) => match[1]);
export const elements = (key: string) => built.filter((id) => id === key).length;

/** When a play has landed: its last element's start, plus its duration. */
export const ends = (play: PartPlay) => play.at + play.duration + play.stagger * Math.max(0, elements(play.key) - 1);
/** When a part first starts to move in a click, and when the last of its moves there has landed. */
export const startOf = (id: string, key: string, prop?: string) => Math.min(...playOf(id, key, prop).map((play) => play.at));
export const endOf = (id: string, key: string, prop?: string) => Math.max(...playOf(id, key, prop).map(ends));
/** When a click has landed: its last part. */
export const longest = (id: string) => Math.max(0, ...playsAt(id).map(ends));

/** Every word set on the stage, one text node each. */
const decode = (text: string) => text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
export const texts = markup
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map((text) => decode(text).trim())
  .filter(Boolean);

/* The stage's keyed parts: what each holds, and whether it shows. */

/** A part of the stage: its key, its classes, the part it sits in, and whether it paints anything of its own. */
export type Node = { key: string; classes: string[]; parent: Node | null; paints: boolean };

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
/** Elements that put something on the stage; the rest (g, div, svg, span) only hold other things. */
const PAINT = new Set(["path", "circle", "rect", "line", "polyline", "polygon", "ellipse", "text", "img", "image"]);

/** Every keyed part in the markup, each with the keyed part it sits inside. */
function parse(source: string) {
  const nodes: Node[] = [];
  const stack: (Node | null)[] = [];
  const keyed = () => stack.findLast((node) => node) ?? null;
  const paint = (node: Node | null) => {
    const owner = node ?? keyed();
    if (owner) owner.paints = true;
  };
  for (const [, close, tag, attrs, selfClosing, words] of source.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>|([^<]+)/g)) {
    if (words !== undefined) {
      if (words.trim()) paint(null);
    } else if (close) {
      stack.pop();
    } else {
      const key = attrs.match(/data-build="([^"]+)"/)?.[1];
      const node = key ? { key, classes: attrs.match(/class="([^"]+)"/)?.[1].split(/\s+/) ?? [], parent: keyed(), paints: false } : null;
      if (node) nodes.push(node);
      if (PAINT.has(tag.toLowerCase())) paint(node);
      if (!selfClosing && !VOID.has(tag.toLowerCase())) stack.push(node);
    }
  }
  return nodes;
}

export const nodes = parse(markup);
export const nodeOf = (key: string) => nodes.find((node) => node.key === key) ?? null;

/** The picture a key belongs to: its first segment, or the picture a title or a story line is for. */
export const pictureOfKey = (key: string) => (key.startsWith("title.") ? key.slice(6) : key.startsWith("story.") ? key.split(".")[1] : key.split(".")[0]);

/** Parts whose whole picture grows with `--k`: at 0 they are not there. */
const GROWS = /^plan-grow$/;

/** Hidden by its own values: gone, undrawn, under its mask, wiped shut, or not yet grown. */
const shut = (vars: Vars | undefined, node: Node) =>
  !!vars &&
  (vars.autoAlpha === 0 ||
    vars["--d"] === 0 ||
    Number(vars.yPercent ?? 0) >= 100 ||
    ["--wt", "--wr", "--wb", "--wl"].some((inset) => vars[inset] === 100) ||
    (vars["--k"] === 0 && node.classes.some((name) => GROWS.test(name))));

export const hiddenAt = (state: Record<string, Vars>, node: Node | null): boolean => !!node && (shut(state[node.key], node) || hiddenAt(state, node.parent));
/** Whether a part shows at the end of a click. */
export const showsAtEnd = (id: string, key: string) => !hiddenAt(at(id), nodeOf(key));

/* Boxes */

export const bottom = (b: Box) => b.y + b.h;
/** Whether two boxes are clear of each other, `gap` px at least. */
export const apart = (a: Box, b: Box, gap = 0) => a.x + a.w + gap <= b.x || b.x + b.w + gap <= a.x || bottom(a) + gap <= b.y || bottom(b) + gap <= a.y;
export const inside = (inner: Box, outer: Box) => inner.x >= outer.x && inner.y >= outer.y && inner.x + inner.w <= outer.x + outer.w && bottom(inner) <= bottom(outer);
