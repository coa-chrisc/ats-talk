/**
 * Slide 21's places: two lanes the full width of the stage, one above the
 * other. The upper lane is named above its left end and holds four empty
 * wells, spread across it, that fill in turn, each named inside. The lower
 * lane is named under its left end and runs like a belt: small boxes enter
 * at its left end, the whole belt steps one place to the right at a time,
 * and a box that steps past the last place leaves at the right end. An
 * arrow runs down from each well into the lower lane, landing on its top
 * edge between the belt's places. Words are read from the script, by
 * position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, contentTop, groupOf, labelBox, labelsOf } from "./layout-plan";

const [NOW, FOUNDATIONS, ...PIECE_WORDS] = labelsOf("lanes");

/** 556: under the two-line title's two story rows. */
const TOP = contentTop("lanes");
const FULL = SAFE.right - SAFE.left;

/**
 * The field runs from 556 down to 990, the line the frame's footer sits
 * under, and the slide uses all of it: the upper lane's name, the upper
 * lane, the drop between the lanes, the lower lane, and its name's row
 * under it. 40 + 4 + 134 + 68 + 134 + 8 + 44 = 432 of the 434 px.
 */
export const LANES_FOOT = 990;
/** The lane names are set at 32 px, on a 40 px line. */
export const NAME_LINE = 40;
/** The upper lane's name, on the first line of the field. */
const UPPER_NAME_Y = TOP + NAME_LINE / 2;
/** The upper lane, 4 px under its name's line, 134 tall: a 90 px well with 22 px over and under it. */
const UPPER = box(SAFE.left, TOP + NAME_LINE + 4, FULL, 134);
/** The lower lane, 68 px under the upper, so each arrow, from 4 px under a well's foot to 2 px over the lane's top, runs 84 px. */
const LOWER = box(SAFE.left, UPPER.y + UPPER.h + 68, FULL, 134);
/** The row under the lower lane, its name at the left: the row's foot at 988, as tall as a 44 px tag would be. */
const FOOT_ROW = 44;
const FOOT_Y = LOWER.y + LOWER.h + 8 + FOOT_ROW / 2;

/**
 * The four wells, 90 tall, their names at 32 px: each as wide as its name
 * plus 20 px a side, spread across the upper lane with equal gaps (about
 * 54 px) and 16 px from its ends, so the four arrows land far apart along the belt. The
 * names are measured in Geist 600 at 0.50 to 0.53 of the size a letter, so
 * 0.55 (`WELL_FACTOR`) keeps each inside its well; the house 0.62 would
 * leave the four wells almost touching.
 */
export const WELL_FACTOR = 0.55;
export const WELL_TEXT = 32;
const WELL = { h: 90, pad: 20, inset: 16 } as const;
export const wellWords = (text: string) => Math.ceil(text.length * WELL_TEXT * WELL_FACTOR);
const wellWidths = PIECE_WORDS.map((text) => wellWords(text) + 2 * WELL.pad);
const wellGap = (FULL - 2 * WELL.inset - wellWidths.reduce((a, b) => a + b, 0)) / (PIECE_WORDS.length - 1);
const wellX = (i: number) => Math.round(UPPER.x + WELL.inset + wellWidths.slice(0, i).reduce((a, b) => a + b, 0) + i * wellGap);
const wellAt = (i: number) => box(wellX(i), UPPER.y + (UPPER.h - WELL.h) / 2, wellWidths[i], WELL.h);

/**
 * The belt: eight places 200 apart from 28 px inside the lane's left end, a
 * box 64 px square in each, centred up and down. A box that steps on from
 * the last place moves one more place and fades: it leaves, its far edge
 * 36 px short of the lane's right end.
 */
export const BELT = { places: 8, pitch: 200, first: LOWER.x + 28, box: { w: 64, h: 64 } } as const;
/** How far left of the first place a box starts, faded, before it steps in. */
export const ENTER = 40;
/** How many boxes the belt carries in all: it steps once for each. Set by the click's timing (steps-lanes.ts) and checked there. */
export const PARCELS = 15;

const parcelAt = box(BELT.first, LOWER.y + (LOWER.h - BELT.box.h) / 2, BELT.box.w, BELT.box.h);

export const LANES = {
  ...groupOf("lanes"),
  upper: { key: "lanes.upper", at: UPPER, name: { key: "lanes.upper.name", text: FOUNDATIONS, at: { x: UPPER.x, y: UPPER_NAME_Y } as Point } },
  lower: { key: "lanes.lower", at: LOWER, name: { key: "lanes.lower.name", text: NOW, at: { x: LOWER.x, y: FOOT_Y } as Point } },
  /** Each well, empty with the lane and filled in turn, named in its middle; its arrow runs from its foot's middle to the lower lane's top edge. */
  pieces: PIECE_WORDS.map((text, i) => {
    const at = wellAt(i);
    const x = at.x + at.w / 2;
    return {
      key: `lanes.piece.${i}`,
      at,
      label: { key: `lanes.piece.${i}.label`, text, at: { x, y: at.y + at.h / 2 } as Point },
      arrow: { key: `lanes.arrow.${i}`, from: { x, y: at.y + at.h + 4 } as Point, to: { x, y: LOWER.y - 2 } as Point },
    };
  }),
  /** The belt's boxes, all drawn at the first place: a box at place `p` is `p * pitch` to the right. */
  parcels: Array.from({ length: PARCELS }, (_, i) => ({ key: `lanes.parcel.${i}`, at: parcelAt })),
};

/** Where a box stands at place `p` (a fraction while it leaves). */
export const placeX = (p: number) => p * BELT.pitch;

/** Everything slide 21 draws under its story band, for the layout test: the belt's boxes at their first and last places and where they enter and leave. */
export const LANES_BOXES: Box[] = [
  labelBox(LANES.upper.name.at, FOUNDATIONS, "start", 32, NAME_LINE),
  UPPER,
  LOWER,
  ...LANES.pieces.map((piece) => piece.at),
  labelBox(LANES.lower.name.at, NOW, "start", 32, NAME_LINE),
  { ...parcelAt, x: parcelAt.x - ENTER },
  { ...parcelAt, x: parcelAt.x + placeX(BELT.places) },
];
