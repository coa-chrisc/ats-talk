/**
 * Slide 2's places: the Carnegie Mellon wordmark centred across the stage
 * at the drawing's top, one small caption centred under it, and under that
 * four boxes in a row on slide 2a's four columns. Each box holds its name,
 * centred in it across and up and down on one or two lines, and the passed
 * tick, centred across it above the name. Words are read from the script,
 * by position: the caption, then the four names.
 */
import { STAGE, box, type Box, type Point } from "@/components/deck/kit";
import { withBase } from "@/lib/base-path";
import { breakAfter, shown } from "../../script/find";
import { SAFE, contentTop, layerOf } from "./layout";

const [CAPTION, ...NAMES] = shown("course", "play");

/** The drawing's top: under a two-line title and two story lines. */
export const TOP = contentTop("course");

/** The wordmark file and its own size (its viewBox), set 40 px tall: so 446.25 wide, to read from the back of the room. */
export const WORDMARK = { src: "/logos/cmu.v1.svg", alt: "Carnegie Mellon University", w: 178.5, h: 16, set: 40 } as const;
const MARK_W = (WORDMARK.set * WORDMARK.w) / WORDMARK.h;

/**
 * Type sizes: the caption at the kit's label size (26 px, 18.5 px on a
 * 1366 px screen) on a 32 px line; a name at the 32 px text, semibold, on
 * 42 px lines; the tick's radius.
 */
export const TYPE = { caption: 26, captionLine: 32, name: 32, nameLine: 42, tick: 24 } as const;

/** The caption's line starts this far under the wordmark's foot; the boxes start this far under the caption's line. */
const CAPTION_GAP = 20;
const BOXES_GAP = 52;
const CAPTION_Y = TOP + WORDMARK.set + CAPTION_GAP + TYPE.captionLine / 2;
const BOXES_TOP = CAPTION_Y + TYPE.captionLine / 2 + BOXES_GAP;

/**
 * A box: on slide 2a's four columns, 396 wide with 48 between, so the row
 * spans 96 to 1824; 256 tall. A two-line name, centred, then has 86 px over
 * it, room for the tick 44 under the box's top with 18 px between the two.
 */
export const MODULE = { w: 396, gap: 48, h: 256, tickDown: 44 } as const;
const boxAt = (i: number): Box => box(SAFE.left + 16 + i * (MODULE.w + MODULE.gap), BOXES_TOP, MODULE.w, MODULE.h);

/** Where each name breaks onto a second line, by the word its first line ends on, at the end of a phrase; a name with none fits one line. */
const NAME_BREAKS: readonly (readonly string[])[] = [[], ["and"], ["Security,"], ["and"]];

export const COURSE = {
  ...layerOf("course"),
  wordmark: { key: "course.wordmark", src: withBase(WORDMARK.src), alt: WORDMARK.alt, at: box((STAGE.w - MARK_W) / 2, TOP, MARK_W, WORDMARK.set) },
  college: { key: "course.college", text: CAPTION, at: { x: STAGE.w / 2, y: CAPTION_Y } as Point },
  modules: NAMES.map((name, i) => {
    const at = boxAt(i);
    const lines = breakAfter(name, ...NAME_BREAKS[i]);
    const middle = { x: at.x + at.w / 2, y: at.y + at.h / 2 };
    return {
      key: `course.module.${i}`,
      at,
      turn: { key: `course.module.${i}.turn` },
      /** `at` is the first line's middle; each next line sits a line under it, so the block's middle is the box's. */
      name: { text: name, lines, at: { x: middle.x, y: middle.y - ((lines.length - 1) * TYPE.nameLine) / 2 } as Point, line: TYPE.nameLine },
      tick: { key: `course.module.${i}.tick`, at: { x: middle.x, y: at.y + MODULE.tickDown } as Point },
    };
  }),
};
