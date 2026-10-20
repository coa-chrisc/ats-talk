/**
 * What Part 5's tests share: the world compiled, its scene rendered, and
 * the questions every test file asks of them (when a part moves in a step,
 * where it is after it, how many elements carry its id). Only the test
 * files import it.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compile, type Play } from "@/components/deck/engine/compile";
import type { Box } from "@/components/deck/kit";
import { stepId } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { backup } from "./world";

export const world = compile(backup);
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
/** Every backup slide has one step, `play`. */
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
/** How long a step's click plays, from the click to its last move landing. */
export const lengthOf = (id: string) => Math.max(...playsAt(id).map(ends));

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
