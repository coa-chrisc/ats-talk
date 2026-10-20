/**
 * Slide 8's places. The room under the story band is 420 px tall: the
 * stair takes the stage's left and the dial its right, side by side, the
 * dial's baseline near the stair's floor, so the strongest control and the
 * light setting read along one line. At the left a green arrow pointing up
 * beside the tallest block, its label over its head; four blocks on a floor
 * stepping down left to right, each named inside its face. At the right a
 * half-circle dial on its baseline, three ticks on its arc, the middle
 * setting's name and caption over the arc's top and the outer two's under
 * the baseline, each under its tick; and the needle from its hub, turned to a
 * setting. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, contentTop, layerOf, round } from "./layout";

const [BLOCKS, APPROVAL_FIRST, TYPED, CHECKS, STRONGEST, ASSIST, LIGHT, APPROVAL, NAMED, COSTLY, HEAVY] = shown("enforce", "play");
const NAMES = [BLOCKS, APPROVAL_FIRST, TYPED, CHECKS] as const;

export const TOP = contentTop("enforce");

/* The stair */

/** The floor: 16 px over the safe line. */
const FLOOR = 960;
/**
 * The stair from 228 (room at its left for the arrow and its label, which
 * ends at 214) to 1220: four treads of 248 px. Each name sets on two lines
 * in the 220 px inside a face: the longest first line among the four names
 * is 214 px at 26 px semibold with the notes' tracking (measured in Geist),
 * so each wraps once and no more.
 */
const STAIR = { x0: 228, x1: 1220 } as const;
const TREAD = (STAIR.x1 - STAIR.x0) / 4;
/**
 * The lowest block holds a name on two lines (16 px pad over and under two
 * 32 px lines); each to its left is 64 px taller, so the tallest is 288 px
 * and its top leaves 116 px over it for the arrow's head and its label.
 */
const LOW = 96;
const STEP = 64;
const PAD = { x: 14, y: 16 } as const;
const blockAt = (i: number): Box => {
  const h = LOW + (3 - i) * STEP;
  return box(STAIR.x0 + i * TREAD, FLOOR - h, TREAD, h);
};

/** The arrow: up the stair's left, 78 px clear of it, from the floor to level with the tallest block's top; its label 20 px over its head. */
const ARROW_X = 150;
const top0 = blockAt(0);
const ARROW = { x: ARROW_X, y0: FLOOR - 8, y1: top0.y + 18 } as const;

/* The dial */

/**
 * The dial: a 160 px radius, its settings' words centred over its top and
 * under its two outer ticks (at 160 and 20 degrees a tick stands 150 px
 * out from the hub, so the outer words sit 10 px in from the arc's ends).
 * The boxes differ: the light setting's words need about 190 px, the heavy
 * setting's name about 290 (Geist at 26 px semibold with the notes'
 * tracking), so the boxes are 200, 240 and 300 wide, and the heavy one ends
 * 2 px inside the stage's right edge, which puts the hub at 1522 and 50 px
 * between the two outer boxes. The light setting's box then starts 36 px
 * right of the floor's end. The middle setting's two lines sit 12 px over
 * the arc's top, the outer two's 12 px under the baseline, at 880, so the
 * words run from 644 to 956 down the stage.
 */
const R = 160;
/** How far out from the hub the outer ticks stand: 160 times the cosine of 20 degrees. */
const END = 150;
const SETTING_W = [200, 240, 300] as const;
const HUB: Point = { x: SAFE.right - 2 - SETTING_W[2] / 2 - END, y: 880 };
/** The settings' angles, counterclockwise from the hub's right: the first (light) at the left. */
export const ANGLES = [160, 90, 20] as const;
/** The needle points up, at the middle setting, before it settles on the first. */
export const NEEDLE_FROM = 90;
const NEEDLE = R - 34;
const at = (angle: number, r: number): Point => ({ x: round(HUB.x + r * Math.cos((angle * Math.PI) / 180)), y: round(HUB.y - r * Math.sin((angle * Math.PI) / 180)) });
/** Where a setting's words sit: the middle's over the arc's top, the outer two's under the baseline, each under its tick. */
const wordsAt = (i: number): Box =>
  i === 1
    ? box(HUB.x - SETTING_W[1] / 2, HUB.y - R - 12 - 2 * LABEL_LINE, SETTING_W[1], 2 * LABEL_LINE)
    : box(HUB.x + (i === 0 ? -END : END) - SETTING_W[i] / 2, HUB.y + 12, SETTING_W[i], 2 * LABEL_LINE);

export const ENFORCE = {
  ...layerOf("enforce"),
  floor: { key: "enforce.floor", y: FLOOR, x0: STAIR.x0 - 16, x1: STAIR.x1 + 16 },
  steps: NAMES.map((name, i) => {
    const b = blockAt(i);
    return { key: `enforce.step.${i}`, at: b, name: { key: `enforce.step.${i}.name`, text: name, at: box(b.x + PAD.x, b.y + PAD.y, b.w - 2 * PAD.x, 2 * LABEL_LINE) } };
  }),
  arrow: { key: "enforce.arrow", ...ARROW, label: { key: "enforce.arrow.label", text: STRONGEST, at: { x: ARROW_X, y: ARROW.y1 - 20 - LABEL_LINE / 2 } as Point } },
  dial: {
    key: "enforce.dial",
    hub: HUB,
    r: R,
    ticks: ANGLES.map((angle, i) => ({ key: `enforce.dial.tick.${i}`, from: at(angle, R - 18), to: at(angle, R + 2) })),
    settings: [
      [ASSIST, LIGHT],
      [APPROVAL, NAMED],
      [COSTLY, HEAVY],
    ].map(([name, caption], i) => ({ key: `enforce.dial.setting.${i}`, name, caption, at: wordsAt(i) })),
    needle: { key: "enforce.dial.needle", length: NEEDLE, from: NEEDLE_FROM, rest: ANGLES[0] },
  },
};

/** The needle's tip at an angle, for the layout test. */
export const needleTip = (angle: number) => at(angle, NEEDLE);
