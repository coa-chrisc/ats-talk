/**
 * Slide 15's places: two idea cards side by side, each sitting on a stack
 * of three layers it covers until it lifts. The stack, from the bottom: the
 * data, the security round it, and who owns it, so the card lifting uncovers
 * them in the script's order. Under each stack, the card's verdict. Words
 * are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { CARD, contentTop, layerOf } from "./layout";

const [DATA, SECURITY, OWNER, READY, NEEDS_WORK] = shown("underneath", "play");

/** Slide 13's card a little larger, as the subject here. */
export const SCALE = 1.15;
const W = CARD.w * SCALE;
const H = CARD.h * SCALE;
/** The two stacks' middles. */
const COLUMNS = [560, 1360] as const;
/** A layer: wider than the card, as a floor it stands on; three of them a pitch apart, the lowest's foot leaving room for the verdict over the safe line. */
const LAYER = { w: 460, h: 54, pitch: 64, foot: 888, rx: 10 } as const;
/** The card, lifted: its top where the slide's drawing starts, under its story band. */
const LIFTED_TOP = contentTop("underneath");
/** A tick, or the gap mark, sits inside a layer's right end; the layer's name inside its left. */
const MARK = { r: 16, inset: 38 } as const;
const NAME_INSET = 26;
/** The verdict sits under the stack. */
const VERDICT_GAP = 26;

/** The layers bottom up, in the order the card uncovers them and the order the script names them. */
const NAMES = [DATA, SECURITY, OWNER] as const;

const stack = (cx: number, column: number) =>
  NAMES.map((text, i) => {
    const at: Box = box(cx - LAYER.w / 2, LAYER.foot - LAYER.h - i * LAYER.pitch, LAYER.w, LAYER.h);
    const mark: Point = { x: at.x + at.w - MARK.inset, y: at.y + at.h / 2 };
    return { key: `underneath.layer.${column}.${i}`, text, at, name: { x: at.x + NAME_INSET, y: at.y + at.h / 2 }, mark: { key: `underneath.mark.${column}.${i}`, at: mark } };
  });

/** Where the card sits before it lifts: on the stack, its foot at the stack's foot, so it covers the layers. */
const SITS_TOP = LAYER.foot - H;

export const UNDERNEATH = {
  ...layerOf("underneath"),
  mark: MARK,
  layer: LAYER,
  cards: COLUMNS.map((cx, column) => {
    const lifted = box(cx - W / 2, LIFTED_TOP, W, H);
    const layers = stack(cx, column);
    return {
      key: `underneath.card.${column}`,
      /** Drawn where it is once lifted, and set down on its stack before the click by `lift`. */
      at: lifted,
      origin: { x: cx, y: LIFTED_TOP + H / 2 },
      lift: SITS_TOP - LIFTED_TOP,
      layers,
      verdict: { key: `underneath.verdict.${column}`, text: column === 0 ? READY : NEEDS_WORK, at: { x: cx, y: LAYER.foot + VERDICT_GAP + 16 } },
    };
  }),
  /** The second card's data layer: it has a gap, so it is dashed in grey where the others are solid. */
  gap: { column: 1, layer: 0, key: "underneath.gap" },
};
