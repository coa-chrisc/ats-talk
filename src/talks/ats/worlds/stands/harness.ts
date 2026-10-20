/**
 * What the stands world's tests share: the world compiled, its scene
 * rendered, and the questions every test file asks of them (when a part
 * moves in a step, where it is after it, how many elements carry its id).
 * Only the test files import it.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compile, type Play } from "@/components/deck/engine/compile";
import type { Vars } from "@/components/deck/engine/types";
import type { Box, Point } from "@/components/deck/kit";
import { stepId } from "../steps";
import { PICTURES, TITLES, layerOf } from "./layout";
import { Scene } from "./scene";
import { stands } from "./world";

export const world = compile(stands);
/** The world before this one fading out: a world's first click plays after it (engine/director.ts). */
export const LEAVE = 0.6;
export const ids = PICTURES.flatMap((picture) => picture.steps.map((step) => stepId(picture.id, step.id)));
export const n = (id: string) => {
  const index = ids.indexOf(id);
  if (index < 0) throw new Error(`No step "${id}".`);
  return index;
};
/** Every part's state once a step has played, and just before it plays. */
export const at = (id: string) => world.states[n(id) + 1];
export const before = (id: string) => world.states[n(id)];
export const playsAt = (id: string) => world.plays[n(id)].flatMap((play) => ("key" in play ? [play] : []));
export const playOf = (id: string, key: string) => playsAt(id).filter((play) => play.key === key);
/** Each slide has one click: its picture's `play`. */
export const stepOf = (pictureId: string) => stepId(pictureId, "play");

export const markup = renderToStaticMarkup(createElement(Scene));
export const built = [...markup.matchAll(/data-build="([^"]+)"/g)].map((match) => match[1]);
export const elements = (key: string) => built.filter((id) => id === key).length;
/** The opening tag of the element a part's id is on. */
export const tagOf = (key: string) => markup.match(new RegExp(`<[^<>]*data-build="${key.replace(/\./g, "\\.")}"[^<>]*>`))?.[0] ?? "";

/** When a play has landed: its last element's start, plus its duration. */
export const ends = (play: Play & { key: string }) => play.at + play.duration + play.stagger * Math.max(0, elements(play.key) - 1);
/** When a part first starts to move in a step, and when the last of its moves there has landed. */
export const startOf = (id: string, key: string) => Math.min(...playOf(id, key).map((play) => play.at));
export const endOf = (id: string, key: string) => Math.max(...playOf(id, key).map(ends));
/** When a step's last move lands. */
export const longest = (id: string) => Math.max(...playsAt(id).map(ends));

/** Whether a part is on the stage in a picture: not faded out, undrawn, unfilled, below its mask, shrunk to nothing or wiped shut. */
export function onStage(state: Record<string, Vars>, key: string): boolean {
  const vars = state[key] ?? {};
  const v = (prop: string) => (prop in vars ? Number(vars[prop]) : undefined);
  if (v("autoAlpha") === 0 || v("--d") === 0 || v("--k") === 0 || v("scaleX") === 0) return false;
  // A wiped part shut toward an edge: its clip covers all of it.
  if (["--wt", "--wr", "--wb", "--wl"].some((inset) => (v(inset) ?? 0) >= 100)) return false;
  return (v("yPercent") ?? 0) < 100;
}

/**
 * The picture a part belongs to, whose two layers hold it: its id starts
 * with the picture's id, or is one of the picture's story lines. A title
 * is no picture's part: it stands on its own.
 */
export const pictureHolding = (key: string) =>
  TITLES.some((title) => title.key === key) ? undefined : PICTURES.find((picture) => key.startsWith(`${picture.id}.`) || key.startsWith(`story.${picture.id}.`))?.id;
/** Whether a part shows in a picture: on the stage, and the layers that hold it too. */
export function visible(state: Record<string, Vars>, key: string): boolean {
  const holder = pictureHolding(key);
  const layers = holder ? Object.values(layerOf(holder)).filter((layer) => layer !== key && layer in state) : [];
  return onStage(state, key) && layers.every((layer) => onStage(state, layer));
}

/** Every word set on the stage, one text node each. */
const decode = (text: string) => text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
export const texts = markup
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map((text) => decode(text).trim())
  .filter(Boolean);
/** The text of each SVG `<text>` element, its runs joined: a figure set in several runs reads as one. */
export const svgTexts = [...markup.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(([, inner]) => decode(inner.replace(/<[^>]+>/g, "")).trim());

/** Whether two boxes overlap, and whether one is inside another. */
export const overlaps = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
export const inside = (inner: Box, outer: Box) => inner.x >= outer.x && inner.y >= outer.y && inner.x + inner.w <= outer.x + outer.w && inner.y + inner.h <= outer.y + outer.h;
export const ringBox = (c: Point, r: number): Box => ({ x: c.x - r, y: c.y - r, w: 2 * r, h: 2 * r });
export const bottom = (b: Box) => b.y + b.h;
export const right = (b: Box) => b.x + b.w;
export const bounds = (boxes: readonly Box[]): Box => {
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  return { x, y, w: Math.max(...boxes.map(right)) - x, h: Math.max(...boxes.map(bottom)) - y };
};
/** A run of words' box, set at a size about a point by its anchor, its height one line of that size. */
export const wordsBox = (at: Point, width: number, line: number, anchor: "start" | "middle" | "end"): Box => ({
  x: anchor === "start" ? at.x : anchor === "end" ? at.x - width : at.x - width / 2,
  y: at.y - line / 2,
  w: width,
  h: line,
});
