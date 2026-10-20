/**
 * Slide 10's places, in two zones over one line at the foot. Left: a floor
 * and on it a stair of four steps climbing left to right, each a riser box
 * with its name inside it and a small gate standing at the right end of its
 * tread; a patch of floor left of the stair where the green project box
 * starts. On the first two treads, the box's place at the tread's left and
 * the passed tick between it and the gate, the first tick's caption over
 * it. Right: a checklist of six rows, each a box, its words and a faint
 * rule under it, the box taking the passed tick. Under the stair, the foot
 * line at the text size. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, layerOf, note } from "./layout";

const [EXPLORE, VALIDATE, DEPLOY, SCALE, EVIDENCE, ...REST] = shown("earn", "play");
/** The six tests, then the foot line. */
const TESTS = REST.slice(0, 6);
const FOOT_WORDS = REST[6];

export const TOP = contentTop("earn");

/* The foot line */

/** At the text size, its 45 px line ending on the safe line, left at the stage's edge. */
const FOOT_LINE = note("earn.foot", FOOT_WORDS, SAFE.left, SAFE.bottom - TEXT_LINE, 720, 1, TEXT_LINE);

/* The stair */

/** The floor: 55 px over the foot line's top, so the two never read as one. */
const FLOOR = 876;
/**
 * Four steps from x 200 on a pitch of 264, the last ending at 1256, 84 px
 * short of the checklist. The first riser is 72 tall, room for its name
 * inside it; each after rises 64 more, so the top tread is at 612 and its
 * gate's top at 572, 16 px under where drawing may start.
 */
const STAIR = { x: 200, pitch: 264, w: 262, first: 72, rise: 64 } as const;
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
/** The tick: 18 px across its middle, 44 px right of the box's place, 30 px over the tread; the caption's middle 42 px over the tick's. */
const TICK_R = 18;
const tickOn = (i: number): Point => ({ x: STEPS[i].at.x + ON_TREAD + BOX.w + 44, y: STEPS[i].tread - 30 });
const CAPTION_UP = 42;
/**
 * On its way from the first step to the second the box rises until its
 * foot is 16 px over the caption's top, so it passes over the caption and
 * the first gate, then settles onto the second tread.
 */
const HOP = { y: tickOn(0).y - CAPTION_UP - LABEL_LINE / 2 - 16 - FLOOR } as const;

/* The checklist */

/**
 * From x 1340 to the band's right edge, six rows on a pitch of 58 from
 * 620, so the list stands beside the stair's middle and ends over the
 * safe line. A row is a 40 px box, its words at 32 px 64 px right of the
 * box's left, and a faint rule 30 px under the words' middle.
 */
const LIST = { x: 1340, top: 620, pitch: 58, box: 40, words: 64, rule: 30 } as const;

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
  evidence: { key: "earn.evidence", text: EVIDENCE, at: { x: tickOn(0).x, y: tickOn(0).y - CAPTION_UP } as Point },
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
  foot: FOOT_LINE,
};

export const LIST_BOX = LIST.box;
export const CAPTION_LINE = LABEL_LINE;
/** The box's place once it stands on step `i`, for the layout test. */
export const boxOn = (i: number): Box => ({ ...BOX, x: BOX.x + placeOn(i).x, y: BOX.y + placeOn(i).y });
