/**
 * What the ideas world's tests share: the world compiled, its scene
 * rendered, and the questions every test file asks of them (when a part
 * moves in a step, where it is after it, how many elements carry its id).
 * Only the test files import it.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compile, type Play } from "@/components/deck/engine/compile";
import type { Box, Point } from "@/components/deck/kit";
import { stepId } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { ideas } from "./world";

export const world = compile(ideas);
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
export const playsAt = (id: string) => world.plays[n(id)].flatMap((play) => ("key" in play ? [play] : []));
export const playOf = (id: string, key: string) => playsAt(id).filter((play) => play.key === key);
/** Each slide has one click: its picture's `play`. */
export const stepOf = (pictureId: string) => stepId(pictureId, "play");

export const markup = renderToStaticMarkup(createElement(Scene));
export const built = [...markup.matchAll(/data-build="([^"]+)"/g)].map((match) => match[1]);
export const elements = (key: string) => built.filter((id) => id === key).length;
/** The opening tag of the element a part's id is on. */
export const tagOf = (key: string) => markup.match(new RegExp(`<[^<>]*data-build="${key.replace(/\./g, "\\.")}"[^<>]*>`))?.[0] ?? "";
/** The markup inside the element a part's id is on, up to the end of the scene: what follows its opening tag. */
export const after = (key: string) => markup.slice(markup.indexOf(tagOf(key)) + tagOf(key).length);
/** Every part's state just before a step plays: where the click starts from. */
export const before = (id: string) => world.states[n(id)];

/** When a play has landed: its last element's start, plus its duration. */
export const ends = (play: Play & { key: string }) => play.at + play.duration + play.stagger * Math.max(0, elements(play.key) - 1);
/** When a part first starts to move in a step, and when the last of its moves there has landed. */
export const startOf = (id: string, key: string) => Math.min(...playOf(id, key).map((play) => play.at));
export const endOf = (id: string, key: string) => Math.max(...playOf(id, key).map(ends));
/** When a part's first move in a step has landed: its arrival, where it moves again later. */
export const arrived = (id: string, key: string) => ends(playOf(id, key)[0]);
/** When a step's last move lands. */
export const longest = (id: string) => Math.max(...playsAt(id).map(ends));

/** Every word set on the stage, one text node each. */
const decode = (text: string) => text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
export const texts = markup
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map((text) => decode(text).trim())
  .filter(Boolean);

/** Whether two boxes overlap. */
export const overlaps = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
export const inside = (inner: Box, outer: Box) => inner.x >= outer.x && inner.y >= outer.y && inner.x + inner.w <= outer.x + outer.w && inner.y + inner.h <= outer.y + outer.h;
export const ringBox = (c: Point, r: number): Box => ({ x: c.x - r, y: c.y - r, w: 2 * r, h: 2 * r });
export const bottom = (b: Box) => b.y + b.h;
export const bounds = (boxes: readonly Box[]): Box => {
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  return { x, y, w: Math.max(...boxes.map((b) => b.x + b.w)) - x, h: Math.max(...boxes.map(bottom)) - y };
};

export { bandFoot } from "./layout";

/** A run of words' box, set at a size about a point by its anchor, its height one line of that size. */
export const wordsBox = (at: Point, width: number, line: number, anchor: "start" | "middle" | "end"): Box => ({
  x: anchor === "start" ? at.x : anchor === "end" ? at.x - width : at.x - width / 2,
  y: at.y - line / 2,
  w: width,
  h: line,
});
