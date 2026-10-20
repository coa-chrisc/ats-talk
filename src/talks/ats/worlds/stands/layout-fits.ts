/**
 * Slide 14's places: two columns that meet at the stage's middle line.
 * The left column is set flush right against it, the right column flush
 * left from it, so each pair reads across as one line; a passed tick sits
 * on the middle line between each pair, a short rule joining it to each
 * side. Each column is headed, with a rule under its head. A grey tag sits
 * at the foot, centred under the ticks. Words are read from the script, by
 * position.
 *
 * Every line is set at the text size (32 px), each row 80 px tall: the
 * heads at y 580, the rows at 660 to 900, the tag at 952.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { TAG, contentTop, layerOf, round, tagWidth } from "./layout";

const [ASKS_FOR, ...REST] = shown("fits", "play");
const ASKS = REST.slice(0, 4);
const [HAS] = REST.slice(4, 5);
const HAS_LINES = REST.slice(5, 9);
const [CONNECTS] = REST.slice(9);

const TOP = contentTop("fits");

/** The middle line, where the ticks sit; each column keeps 140 px from it, room for the tick and a short rule each side of it. */
const MID = 960;
const GUTTER = 140;
const LEFT_END = MID - GUTTER;
const RIGHT_START = MID + GUTTER;
/** The heads' rules run 520 px out from each column's inner edge: the longest line's width. */
const RULE_W = 520;

/** The heads 32 px under the drawing's first line, their rules 36 under them, the first row 80 under the heads. */
const HEAD_Y = TOP + 32;
const RULE_Y = HEAD_Y + 36;
export const ROW = 80;
const ROW_Y = (i: number) => HEAD_Y + ROW * (i + 1);

/** The tick on the middle line; its joining rules stop 10 px short of it and 16 px short of the words. */
export const TICK_R = 18;
const JOIN = { words: 16, tick: 10 } as const;

export const FITS = {
  ...layerOf("fits"),
  heads: [
    { key: "fits.head.0", text: ASKS_FOR, at: { x: LEFT_END, y: HEAD_Y } as Point, anchor: "end" as const, rule: { key: "fits.rule.0", from: { x: LEFT_END, y: RULE_Y } as Point, to: { x: LEFT_END - RULE_W, y: RULE_Y } as Point } },
    { key: "fits.head.1", text: HAS, at: { x: RIGHT_START, y: HEAD_Y } as Point, anchor: "start" as const, rule: { key: "fits.rule.1", from: { x: RIGHT_START, y: RULE_Y } as Point, to: { x: RIGHT_START + RULE_W, y: RULE_Y } as Point } },
  ],
  pairs: ASKS.map((ask, i) => {
    const y = ROW_Y(i);
    return {
      ask: { key: `fits.ask.${i}`, text: ask, at: { x: LEFT_END, y } as Point },
      has: { key: `fits.has.${i}`, text: HAS_LINES[i], at: { x: RIGHT_START, y } as Point },
      joins: [
        { key: `fits.join.${i}.0`, from: { x: LEFT_END + JOIN.words, y } as Point, to: { x: MID - TICK_R - JOIN.tick, y } as Point },
        { key: `fits.join.${i}.1`, from: { x: RIGHT_START - JOIN.words, y } as Point, to: { x: MID + TICK_R + JOIN.tick, y } as Point },
      ],
      tick: { key: `fits.tick.${i}`, at: { x: MID, y } as Point, r: TICK_R },
    };
  }),
  /** The grey tag 30 px under the last row's foot, centred on the middle line. */
  connects: { key: "fits.connects", text: CONNECTS, at: box(round(MID - tagWidth(CONNECTS) / 2), ROW_Y(3) + 52, tagWidth(CONNECTS), TAG.h) },
  geometry: { mid: MID, leftEnd: LEFT_END, rightStart: RIGHT_START, ruleW: RULE_W },
};
