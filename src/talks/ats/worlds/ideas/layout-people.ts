/**
 * Slide 9's places, three zones left to right across the stage. At the
 * left a balance: a post on a foot, a beam on a pivot at the post's top,
 * and at each end of the beam a short stem holding a pan level, the indigo
 * box (with its blank tag) on the left pan and three green people on the
 * right, each named over what it holds. The beam turns about its pivot and
 * the pans ride its ends, staying level. In the middle, the large indigo
 * figure on two lines over its caption, the zone nearly as tall as the room
 * under the story band. At the right, a plaque with its name and caption. Words
 * are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, layerOf, round } from "./layout";

const [TECHNOLOGY, TALENT_NAME, SIX, OUTPERFORM, BNY, TRAINED] = shown("people", "play");

export const TOP = contentTop("people");

/* The balance */

/** The beam tips this many degrees, clockwise: its right end, the people's, goes down. */
export const TIP = 8;
/** The beam's half-length: its ends 220 px either side of the pivot. */
const HALF = 220;
/** A pan: a plate 220 wide and 14 deep, on a stem 44 px over its end of the beam. */
const PAN = { w: 220, h: 14, stem: 44 } as const;
/** What a pan holds: the box, 140 by 108; three people, 48 by 86 each and 20 apart. */
const BOX = { w: 140, h: 108 } as const;
const PERSON = { w: 48, h: 86, gap: 20 } as const;
/** A pan's name, set at the 32 px text size, sits 12 px over the tallest thing it holds. */
const NAME_GAP = 12;
export const NAME_LINE = TEXT_LINE;

const rad = (TIP * Math.PI) / 180;
/** The most a pan rises when the beam tips: the left one, by its end's lift. */
const RAISE = Math.ceil(HALF * Math.sin(rad));
/**
 * The pans' plates sit where the left name's top, once that pan has risen,
 * just meets the drawing's top; the pivot is a stem's height under them.
 */
const PLATE_Y = TOP + RAISE + NAME_LINE + NAME_GAP + BOX.h;
/** 430 across puts the left plate's edge 4 px inside the stage's left edge. */
const PIVOT: Point = { x: 430, y: PLATE_Y + PAN.h + PAN.stem };
/** The post's foot: 200 wide, its top at 940, 20 px over the safe line once its 16 px are added. */
const FOOT = box(PIVOT.x - 100, 940, 200, 16);

/** How far an end of the beam moves when it tips: the left end up, the right end down, each a little in. */
const shift = (side: -1 | 1): Point => ({ x: round(side * HALF * (Math.cos(rad) - 1)), y: round(side * HALF * Math.sin(rad)) });

const panAt = (end: number) => ({ end: { x: end, y: PIVOT.y } as Point, plate: box(end - PAN.w / 2, PLATE_Y, PAN.w, PAN.h) });
const left = panAt(PIVOT.x - HALF);
const right = panAt(PIVOT.x + HALF);
const peopleW = 3 * PERSON.w + 2 * PERSON.gap;
/** A pan's name: centred over it, a gap over the box's height (the taller of the two things held), so both names sit level. */
const nameOver = (plate: Box): Point => ({ x: plate.x + plate.w / 2, y: plate.y - BOX.h - NAME_GAP - NAME_LINE / 2 });

/* The figure */

/**
 * The middle zone: 84 px right of the right plate (its right edge at 760)
 * to 84 px short of the plaque, 500 wide. The figure is set at 128 px on
 * two 130 px lines, one word each (Geist bold sets the longer in about
 * 485 px); its caption at the 32 px text size 16 px under it, on three
 * lines (about 990 px of words at 32 px in Geist). The zone's 411 px of
 * words are centred in the 420 px of room under the story band.
 */
const MID = { x0: 844, x1: 1344 } as const;
export const FIGURE_LINE = 130;
const CAPTION_GAP = 16;
const CAPTION_LINES = 3;
const ZONE_H = 2 * FIGURE_LINE + CAPTION_GAP + CAPTION_LINES * TEXT_LINE;
const FIGURE_TOP = TOP + Math.round((SAFE.bottom - TOP - ZONE_H) / 2);

/* The plaque */

/**
 * At the stage's right, 396 wide and 240 tall, its middle level with the
 * middle zone's; its words inset 24 px in a 348 px column, the name at
 * 48 px (about 275 px in Geist bold) over the caption's three lines (its
 * longest line about 320 px at 26 px with the notes' tracking).
 */
const ZONE_MID = FIGURE_TOP + ZONE_H / 2;
const PLAQUE = box(SAFE.right - 396, Math.round(ZONE_MID - 120), 396, 240);
const PLAQUE_WORDS_H = 56 + 3 * LABEL_LINE;

export const PEOPLE = {
  ...layerOf("people"),
  /** The post and its foot. */
  post: { key: "people.post", top: PIVOT, foot: FOOT },
  /** The beam, turning about its pivot. */
  beam: { key: "people.beam", pivot: PIVOT, x0: left.end.x, x1: right.end.x },
  pans: [
    { key: "people.pan.0", plateKey: "people.pan.0.plate", ...left, shift: shift(-1) },
    { key: "people.pan.1", plateKey: "people.pan.1.plate", ...right, shift: shift(1) },
  ],
  /** On the left pan, riding with it: the box, its blank tag, and its name over it. */
  technology: {
    key: "people.technology",
    at: box(left.plate.x + (PAN.w - BOX.w) / 2, PLATE_Y - BOX.h, BOX.w, BOX.h),
    name: { key: "people.technology.name", text: TECHNOLOGY, at: nameOver(left.plate) },
  },
  /** On the right pan, riding with it: three people, and their name over them. */
  talent: {
    key: "people.people",
    people: [0, 1, 2].map((i) => box(right.plate.x + (PAN.w - peopleW) / 2 + i * (PERSON.w + PERSON.gap), PLATE_Y - PERSON.h, PERSON.w, PERSON.h)),
    name: { key: "people.people.name", text: TALENT_NAME, at: nameOver(right.plate) },
  },
  six: {
    key: "people.six",
    text: SIX,
    at: box(MID.x0, FIGURE_TOP, MID.x1 - MID.x0, 2 * FIGURE_LINE),
    caption: { key: "people.six.caption", text: OUTPERFORM, at: box(MID.x0, FIGURE_TOP + 2 * FIGURE_LINE + CAPTION_GAP, MID.x1 - MID.x0, CAPTION_LINES * TEXT_LINE) },
  },
  plaque: {
    key: "people.plaque",
    at: PLAQUE,
    /** Its name over its caption, inset 24 px from its sides, the words centred in its height. */
    words: { key: "people.plaque.words", at: box(PLAQUE.x + 24, PLAQUE.y + (PLAQUE.h - PLAQUE_WORDS_H) / 2, PLAQUE.w - 48, PLAQUE_WORDS_H) },
    name: BNY,
    caption: TRAINED,
  },
};

/** The balance's whole reach once tipped: the raised left name's top to the foot, the left plate's left to the right plate's right. */
export const balanceBox = (): Box => {
  const top = PEOPLE.technology.name.at.y - NAME_LINE / 2 - RAISE;
  return box(left.plate.x, top, right.plate.x + right.plate.w - left.plate.x, FOOT.y + FOOT.h - top);
};
