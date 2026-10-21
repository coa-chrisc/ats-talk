/**
 * Slide 10's places, in two zones. Left: a floor and on it a stair of four
 * steps climbing left to right, each a riser box with its name inside it
 * and a small gate standing at the right end of its tread; a patch of floor
 * left of the stair where the green project box starts. On the first two
 * treads, the box's place at the tread's left and the passed tick between
 * it and the gate, the first tick's caption over it. Right: a heading at
 * the label size, and under it a checklist of six rows, each a box, its
 * words and a faint rule under it, the box taking the passed tick. Words
 * are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, contentTop, layerOf } from "./layout";

const [EXPLORE, VALIDATE, DEPLOY, SCALE, RESULTS, HEADING, ...TESTS] = shown("earn", "play");

export const TOP = contentTop("earn");

/* The stair */

/** The floor: on the safe line. */
const FLOOR = SAFE.bottom;
/**
 * Four steps from x 200 on a pitch of 248, the last ending at 1190, 80 px
 * short of the checklist. The first riser is 72 tall, room for its name
 * inside it; each after rises 64 more, so the top tread is at 712 and its
 * gate's top at 672, 116 px under where drawing may start.
 */
const STAIR = { x: 200, pitch: 248, w: 246, first: 72, rise: 64 } as const;
/** A gate: two posts 40 tall, 72 apart, two bars between them, centred 52 px in from its tread's right end. */
export const GATE = { h: 40, span: 72, inset: 52 } as const;
/** A step's name: inside its riser, its middle 30 px under the tread. */
const NAME_DOWN = 30;

const STEPS = [EXPLORE, VALIDATE, DEPLOY, SCALE].map((text, i) => {
  const tread = FLOOR - STAIR.first - i * STAIR.rise;
  const at = box(STAIR.x + i * STAIR.pitch, tread, STAIR.w, FLOOR - tread);
  return {
    key: `earn.step.${i}`,
    text,
    at,
    tread,
    gate: { x: at.x + at.w - GATE.inset, y: tread } as Point,
    name: { x: at.x + at.w / 2, y: tread + NAME_DOWN } as Point,
  };
});

/* The project box and its ticks */

/** The box: 64 by 52, standing on the floor 16 px in from the stage's left edge, 24 px short of the first riser. */
const BOX = box(SAFE.left + 16, FLOOR - 52, 64, 52);
/** On a tread it stands 28 px in from the tread's left. */
const ON_TREAD = 28;
/** Where the box stands on step `i`, as a move from where it starts. */
const placeOn = (i: number): Point => ({ x: STEPS[i].at.x + ON_TREAD - BOX.x, y: STEPS[i].tread - FLOOR });
/**
 * The tick: 18 px across its middle, 44 px right of the box's place, 30 px
 * over the tread. Its caption (about 230 px at 26 px semibold in Geist)
 * reaches past the first step's right end, so its middle sits 104 px over
 * the tick's to clear the box on the second tread.
 */
const TICK_R = 18;
const tickOn = (i: number): Point => ({ x: STEPS[i].at.x + ON_TREAD + BOX.w + 44, y: STEPS[i].tread - 30 });
const CAPTION_UP = 104;
/**
 * On its way from the first step to the second the box rises until its
 * foot is 16 px over the caption's top, so it passes over the caption and
 * the first gate, then settles onto the second tread.
 */
const HOP = { y: tickOn(0).y - CAPTION_UP - LABEL_LINE / 2 - 16 - FLOOR } as const;

/* The checklist */

/**
 * From x 1270 to the band's right edge: the heading's middle 40 px under
 * where drawing may start (its 26 px semibold line is about 400 px long in
 * Geist), then six rows on a pitch of 54 from 56 px under the heading's
 * middle, so the list ends with its last rule 24 px over the safe line. A
 * row is a 40 px box, its words at 32 px 60 px right of the box's left
 * (the longest row is about 475 px in Geist, ending at 1805), and a faint
 * rule 30 px under the words' middle.
 */
const HEADING_AT: Point = { x: 1270, y: TOP + 40 };
const LIST = { x: 1270, top: HEADING_AT.y + 56, pitch: 54, box: 40, words: 60, rule: 30 } as const;

export const EARN = {
  ...layerOf("earn"),
  floor: { key: "earn.floor", y: FLOOR, x0: SAFE.left, x1: STEPS[3].at.x + STEPS[3].at.w + 2 },
  steps: STEPS,
  project: {
    key: "earn.box",
    at: BOX,
    /** Onto the first step, then over the first gate and onto the second. */
    first: placeOn(0),
    hop: HOP.y,
    second: placeOn(1),
  },
  ticks: [0, 1].map((i) => ({ key: `earn.tick.${i}`, at: tickOn(i), r: TICK_R })),
  evidence: { key: "earn.evidence", text: RESULTS, at: { x: tickOn(0).x, y: tickOn(0).y - CAPTION_UP } as Point },
  heading: { key: "earn.heading", text: HEADING, at: HEADING_AT },
  list: TESTS.map((text, i) => {
    const y = LIST.top + i * LIST.pitch;
    const check: Box = box(LIST.x, y - LIST.box / 2, LIST.box, LIST.box);
    return {
      key: `earn.test.${i}`,
      text,
      check,
      tick: { key: `earn.test.${i}.tick`, at: { x: LIST.x + LIST.box / 2, y } as Point },
      words: { x: LIST.x + LIST.words, y } as Point,
      rule: { y: y + LIST.rule, x0: LIST.x, x1: SAFE.right },
    };
  }),
};

export const LIST_BOX = LIST.box;
export const CAPTION_LINE = LABEL_LINE;
/** The box's place once it stands on step `i`, for the layout test. */
export const boxOn = (i: number): Box => ({ ...BOX, x: BOX.x + placeOn(i).x, y: BOX.y + placeOn(i).y });
