/**
 * What Part 4's tests share (world.test.ts, layout.test.ts, beats.test.ts):
 * the world compiled, its stage's markup parsed into its keyed parts, and
 * the questions every test asks of them (when a part moves in a click,
 * where it is after it, whether it shows). Test code only; the world never
 * imports it.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compile, type Play } from "@/components/deck/engine/compile";
import type { Vars } from "@/components/deck/engine/types";
import { stepId } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { fitWorld } from "./world";

export const world = compile(fitWorld);
/** The world before this one fading out: a world's first click plays after it (engine/director.ts). */
export const LEAVE = 0.6;
export const ids = PICTURES.flatMap((picture) => picture.steps.map((step) => stepId(picture.id, step.id)));
export const n = (id: string) => {
  const index = ids.indexOf(id);
  if (index < 0) throw new Error(`No step "${id}".`);
  return index;
};
/** Every part's state once a click has played. */
export const at = (id: string) => world.states[n(id) + 1];
export type PartPlay = Extract<Play, { key: string }>;
export const playsAt = (id: string) => world.plays[n(id)].filter((play): play is PartPlay => "key" in play);
export const playOf = (id: string, key: string) => playsAt(id).filter((play) => play.key === key);

export const markup = renderToStaticMarkup(createElement(Scene));
export const built = [...markup.matchAll(/data-build="([^"]+)"/g)].map((match) => match[1]);
export const elements = (key: string) => built.filter((id) => id === key).length;

/** When a play has landed: its last element's start, plus its duration. */
export const ends = (play: PartPlay) => play.at + play.duration + play.stagger * Math.max(0, elements(play.key) - 1);
/** When a part first starts to move in a click, and when the last of its moves there has landed. */
export const startOf = (id: string, key: string) => Math.min(...playOf(id, key).map((play) => play.at));
export const endOf = (id: string, key: string) => Math.max(...playOf(id, key).map(ends));
/** When a click's last move has landed. */
export const lastLanding = (id: string) => Math.max(...playsAt(id).map(ends));

/** Every word set on the stage, one text node each. */
const decode = (text: string) => text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
export const texts = markup
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map((text) => decode(text).trim())
  .filter(Boolean);

/* The stage's keyed parts, each with the keyed part it sits inside, and whether it paints anything of its own. */

export type Node = { key: string; classes: string[]; parent: Node | null; paints: boolean };

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
/** Elements that put something on the stage; the rest (g, div, svg, span, p) only hold other things. */
const PAINT = new Set(["path", "circle", "rect", "line", "polyline", "polygon", "ellipse", "text", "img", "image"]);

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

/** Whether a wiped part's clip covers it: its insets from opposite edges meet. */
const covered = (vars: Vars) => Number(vars["--wt"] ?? 0) + Number(vars["--wb"] ?? 0) >= 100 || Number(vars["--wl"] ?? 0) + Number(vars["--wr"] ?? 0) >= 100;
/** Hidden by its own values: gone, undrawn, under its mask, shut by its clip. */
const shut = (vars: Vars | undefined) => !!vars && (vars.autoAlpha === 0 || vars["--d"] === 0 || Number(vars.yPercent ?? 0) >= 100 || covered(vars));

/** Whether a part is hidden in a picture: by its own values or by a part it sits in. */
export const hiddenAt = (state: Record<string, Vars>, node: Node | null): boolean => !!node && (shut(state[node.key]) || hiddenAt(state, node.parent));
/** Whether a part shows at the end of a click. */
export const showsAfter = (id: string, key: string) => !hiddenAt(at(id), nodeOf(key));

/** The picture a key belongs to: a title's, a story line's, or the first segment of its own. */
export const pictureOfKey = (key: string) => (key.startsWith("title.") ? key.slice(6) : key.startsWith("story.") ? key.split(".")[1] : key.split(".")[0]);
