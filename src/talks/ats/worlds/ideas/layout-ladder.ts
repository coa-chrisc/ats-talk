/**
 * Slide 7's places: a floor across the stage, and on it four blocks rising
 * left to right as a stair, each named inside its face with its caption
 * under the name; a patch of floor left of the first block where a small
 * green figure starts, walks to the first riser and steps up once onto the
 * first block; the passed tick over it with its label over that; a grey
 * arrow riding over the stair's noses, its label set along it; and under
 * the floor, at the stair's start, a small tool with its name and caption.
 * Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, contentTop, layerOf, note, round } from "./layout";

const [AUTOMATION, FIXED, COPILOT, APPROVES, WORKFLOW, SET, AGENT, CHOOSES, DONE, MORE, TOOL_NAME, NO_AI] = shown("ladder", "play");
const NAMES = [AUTOMATION, COPILOT, WORKFLOW, AGENT] as const;
const CAPTIONS = [FIXED, APPROVES, SET, CHOOSES] as const;

/** Where the slide's drawing may start: under its story band. */
export const TOP = contentTop("ladder");

/**
 * The floor: low enough that the tool's two lines fit under it inside the
 * safe line (a 16 px gap, then 68 px), and high enough to leave the stair
 * its height.
 */
const FLOOR = 892;
/** The stair starts 160 px in from the stage's left, leaving floor for the figure to stand on before it climbs. */
const STAIR_X = SAFE.left + 160;
/** Four treads share the rest of the width: 392 px each, wide enough that every caption but one sets on one line. */
const TREAD = (SAFE.right - STAIR_X) / 4;
/**
 * The first block holds its name and caption (16 px pad, two 32 px lines,
 * 20 px under); each block after rises 48 px more, so the top block's face
 * ends 92 px under where drawing may start, room for the arrow and its
 * long label over it.
 */
const FIRST = 100;
const RISE = 48;
/** The words' inset in a block's face. */
const PAD = { x: 20, y: 16 } as const;

const blockAt = (i: number): Box => {
  const h = FIRST + i * RISE;
  return box(STAIR_X + i * TREAD, FLOOR - h, TREAD, h);
};

/** The figure: 40 by 64, standing on the floor 20 px in from the stage's left edge. */
const FIGURE = box(SAFE.left + 34, FLOOR - 64, 40, 64);
/** Its walk to the first riser (its right edge 6 px short of it), then its step up, onto the first tread with its middle 74 px in from the tread's start. */
const WALK = STAIR_X - 6 - (FIGURE.x + FIGURE.w);
const CLIMB = { x: STAIR_X + 74 - (FIGURE.x + FIGURE.w / 2), y: -FIRST } as const;
const STANDS = { x: FIGURE.x + FIGURE.w / 2 + CLIMB.x, top: FIGURE.y + CLIMB.y };

/** The tick 22 px over the figure's head once it stands on the first block, and its label 38 px over the tick (the label is four short words, 223 px at 26 px semibold, well clear of the second block). */
const TICK_R = 14;
const TICK: Point = { x: STANDS.x, y: STANDS.top - 8 - TICK_R };
const STOP_AT: Point = { x: STANDS.x, y: TICK.y - TICK_R - 6 - LABEL_LINE / 2 };

/**
 * The arrow rides 24 px over the line through the blocks' top left corners
 * (the stair's noses), from over the second block's tread to over the
 * fourth's, 760 px long, so it climbs as the stair does (7 degrees). Its
 * label rides along it on one line, 26 px off its middle on the side away
 * from the stair, turned to its slope: the label is about 790 px long at
 * 26 px semibold in Geist, so its high end rises about 48 px over its
 * middle and still ends 15 px under where drawing may start, and its low
 * end stays over the arrow's tail, clear of the tick's label at the left.
 */
const NOSE = { x: STAIR_X + TREAD, y: FLOOR - FIRST - RISE } as const;
const SLOPE = RISE / TREAD;
const OVER = 24;
const arrowY = (x: number) => round(NOSE.y - OVER - (x - NOSE.x) * SLOPE);
const TAIL_X = 740;
const HEAD_X = 1500;
const TURN = round((-Math.atan(SLOPE) * 180) / Math.PI);
const LIFT = 26;
const mid = { x: (TAIL_X + HEAD_X) / 2, y: (arrowY(TAIL_X) + arrowY(HEAD_X)) / 2 };
const norm = Math.hypot(1, SLOPE);

/** The tool: 56 px square, 22 px under the floor at the stair's start, its name and caption stacked beside it, 24 px off, the two lines' middles 16 px from its top and its foot; the caption runs on from there as long as it is (about 340 px). */
const TOOL = box(STAIR_X, FLOOR + 22, 56, 56);
const TOOL_WORDS = { x: TOOL.x + TOOL.w + 24, first: TOOL.y + 12 } as const;

export const LADDER = {
  ...layerOf("ladder"),
  floor: { key: "ladder.floor", y: FLOOR, x0: SAFE.left, x1: SAFE.right },
  steps: NAMES.map((name, i) => {
    const at = blockAt(i);
    return {
      key: `ladder.step.${i}`,
      at,
      /** The name and its caption, one part: they arrive with the block. */
      words: { key: `ladder.step.${i}.words`, name, caption: CAPTIONS[i], at: box(at.x + PAD.x, at.y + PAD.y, at.w - 2 * PAD.x, at.h - PAD.y) },
    };
  }),
  walker: { key: "ladder.walker", at: FIGURE, walk: WALK, climb: CLIMB },
  tick: { key: "ladder.tick", at: TICK, r: TICK_R },
  stop: { key: "ladder.stop", text: DONE, at: STOP_AT },
  more: {
    key: "ladder.more",
    tail: { x: TAIL_X, y: arrowY(TAIL_X) } as Point,
    head: { x: HEAD_X, y: arrowY(HEAD_X) } as Point,
    label: { key: "ladder.more.label", text: MORE, turn: TURN, at: { x: round(mid.x - (LIFT * SLOPE) / norm), y: round(mid.y - LIFT / norm) } as Point },
  },
  tool: {
    key: "ladder.tool",
    at: TOOL,
    name: { key: "ladder.tool.name", text: TOOL_NAME, at: { x: TOOL_WORDS.x, y: TOOL_WORDS.first } as Point },
    caption: { key: "ladder.tool.caption", text: NO_AI, at: { x: TOOL_WORDS.x, y: TOOL_WORDS.first + LABEL_LINE } as Point },
  },
};

/** The figure's box once it stands on the first block. */
export const standing = (): Box => ({ ...FIGURE, x: FIGURE.x + CLIMB.x, y: FIGURE.y + CLIMB.y });
/** A block's words as notes, for the layout test: the name line, then the caption's. */
export const wordsOf = (i: number) => {
  const w = LADDER.steps[i].words;
  return [note(`${w.key}.name`, w.name, w.at.x, w.at.y, w.at.w), note(`${w.key}.caption`, w.caption, w.at.x, w.at.y + LABEL_LINE, w.at.w)];
};
