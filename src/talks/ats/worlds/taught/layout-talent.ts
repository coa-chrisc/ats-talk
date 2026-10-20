/**
 * Slide 6's places, three zones left to right across the stage. At the
 * left a balance: a post on a foot, a beam on a pivot at the post's top,
 * and at each end of the beam a short stem holding a pan level, the indigo
 * box (with its blank tag) on the left pan and three green people on the
 * right, each named over what it holds. The beam turns about its pivot and
 * the pans ride its ends, staying level. In the middle, the large indigo
 * figure over its caption, and under it the bar in three parts, the middle
 * one twice the others, each named inside, its caption under it. At the
 * right, a plaque with its name and caption. Words are read from the
 * script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, contentTop, layerOf, round } from "./layout";

const [TECHNOLOGY, TALENT_NAME, SIX, OUTPERFORM, BUY, BOOST, BUILD, OWN, BNY, TRAINED] = shown("talent", "play");

export const TOP = contentTop("talent");

/* The balance */

/** The beam tips this many degrees, clockwise: its right end, the people's, goes down. */
export const TIP = 8;
/** The beam's half-length: its ends 180 px either side of the pivot. */
const HALF = 180;
/** A pan: a plate 180 wide and 12 deep, on a stem 40 px over its end of the beam. */
const PAN = { w: 180, h: 12, stem: 40 } as const;
/** What a pan holds: the box, 120 by 92; three people, 40 by 72 each and 18 apart. */
const BOX = { w: 120, h: 92 } as const;
const PERSON = { w: 40, h: 72, gap: 18 } as const;
/** A pan's name sits 12 px over the tallest thing it holds. */
const NAME_GAP = 12;

const rad = (TIP * Math.PI) / 180;
/** The most a pan rises when the beam tips: the left one, by its end's lift. */
const RAISE = Math.ceil(HALF * Math.sin(rad));
/**
 * The pans' plates sit where the left name's top, once that pan has risen,
 * just meets the drawing's top; the pivot is a stem's height under them.
 */
const PLATE_Y = TOP + RAISE + LABEL_LINE + NAME_GAP + BOX.h;
/** 370 across puts the left plate's edge 4 px inside the stage's left edge. */
const PIVOT: Point = { x: 370, y: PLATE_Y + PAN.h + PAN.stem };
/** The post's foot: 160 wide, its top at 940, 20 px over the safe line once its 16 px are added. */
const FOOT = box(PIVOT.x - 80, 940, 160, 16);

/** How far an end of the beam moves when it tips: the left end up, the right end down, each a little in. */
const shift = (side: -1 | 1): Point => ({ x: round(side * HALF * (Math.cos(rad) - 1)), y: round(side * HALF * Math.sin(rad)) });

const panAt = (end: number) => ({ end: { x: end, y: PIVOT.y } as Point, plate: box(end - PAN.w / 2, PLATE_Y, PAN.w, PAN.h) });
const left = panAt(PIVOT.x - HALF);
const right = panAt(PIVOT.x + HALF);
const peopleW = 3 * PERSON.w + 2 * PERSON.gap;
/** A pan's name: centred over it, a gap over the box's height (the taller of the two things held), so both names sit level. */
const nameOver = (plate: Box): Point => ({ x: plate.x + plate.w / 2, y: plate.y - BOX.h - NAME_GAP - LABEL_LINE / 2 });

/* The figure and the bar */

/** The middle zone: 100 px right of the right plate (its right edge at 640), 560 wide, room for the figure's 96 px words (about 520). */
const MID = { x0: 740, x1: 1300 } as const;
/** The figure's 96 px line and its caption 12 px under it; the zone's 352 px of words and bar centred in the 420 px of room. */
const FIGURE_LINE = 104;
const ZONE_H = FIGURE_LINE + 12 + LABEL_LINE + 76 + 72 + 16 + LABEL_LINE;
const FIGURE_TOP = TOP + Math.round((SAFE.bottom - TOP - ZONE_H) / 2);
/** The bar: the zone's width and 72 tall, 76 px under the caption; its parts a quarter, a half and a quarter. */
const BAR = box(MID.x0, FIGURE_TOP + FIGURE_LINE + 12 + LABEL_LINE + 76, MID.x1 - MID.x0, 72);
const SHARES = [0.25, 0.5, 0.25] as const;
const partAt = (i: number): Box => box(BAR.x + SHARES.slice(0, i).reduce((sum, k) => sum + k * BAR.w, 0), BAR.y, SHARES[i] * BAR.w, BAR.h);
/** The bar's caption, 16 px under it, as wide as it (Geist sets the words in about 541 px). */
const BAR_CAPTION = box(MID.x0, BAR.y + BAR.h + 16, MID.x1 - MID.x0, LABEL_LINE);

/* The plaque */

/** At the stage's right, 440 wide and 200 tall (84 px clear of the middle zone), its middle level with the middle zone's; its words inset 24 px. */
const ZONE_MID = FIGURE_TOP + ZONE_H / 2;
const PLAQUE = box(SAFE.right - 440, Math.round(ZONE_MID - 100), 400, 200);

export const TALENT = {
  ...layerOf("talent"),
  /** The post and its foot. */
  post: { key: "talent.post", top: PIVOT, foot: FOOT },
  /** The beam, turning about its pivot. */
  beam: { key: "talent.beam", pivot: PIVOT, x0: left.end.x, x1: right.end.x },
  pans: [
    { key: "talent.pan.0", plateKey: "talent.pan.0.plate", ...left, shift: shift(-1) },
    { key: "talent.pan.1", plateKey: "talent.pan.1.plate", ...right, shift: shift(1) },
  ],
  /** On the left pan, riding with it: the box, its blank tag, and its name over it. */
  technology: {
    key: "talent.technology",
    at: box(left.plate.x + (PAN.w - BOX.w) / 2, PLATE_Y - BOX.h, BOX.w, BOX.h),
    name: { key: "talent.technology.name", text: TECHNOLOGY, at: nameOver(left.plate) },
  },
  /** On the right pan, riding with it: three people, and their name over them. */
  talent: {
    key: "talent.people",
    people: [0, 1, 2].map((i) => box(right.plate.x + (PAN.w - peopleW) / 2 + i * (PERSON.w + PERSON.gap), PLATE_Y - PERSON.h, PERSON.w, PERSON.h)),
    name: { key: "talent.people.name", text: TALENT_NAME, at: nameOver(right.plate) },
  },
  six: {
    key: "talent.six",
    text: SIX,
    at: box(MID.x0, FIGURE_TOP, MID.x1 - MID.x0, FIGURE_LINE),
    caption: { key: "talent.six.caption", text: OUTPERFORM, at: box(MID.x0, FIGURE_TOP + FIGURE_LINE + 12, MID.x1 - MID.x0, LABEL_LINE) },
  },
  bar: {
    key: "talent.bar",
    at: BAR,
    parts: [BUY, BOOST, BUILD].map((text, i) => ({ key: `talent.bar.${i}`, text, at: partAt(i) })),
    /** The middle part's green, filling from its left. */
    fill: "talent.bar.fill",
    caption: { key: "talent.bar.caption", text: OWN, at: BAR_CAPTION },
  },
  plaque: {
    key: "talent.plaque",
    at: PLAQUE,
    /** Its name at 48 px over its caption, inset 24 px from its sides, the two lines' 88 px centred in its height. */
    words: { key: "talent.plaque.words", at: box(PLAQUE.x + 24, PLAQUE.y + (PLAQUE.h - 56 - LABEL_LINE) / 2, PLAQUE.w - 48, 56 + LABEL_LINE) },
    name: BNY,
    caption: TRAINED,
  },
};

/** The balance's whole reach once tipped: the raised left name's top to the foot, the left plate's left to the right plate's right. */
export const balanceBox = (): Box => {
  const top = TALENT.technology.name.at.y - LABEL_LINE / 2 - RAISE;
  return box(left.plate.x, top, right.plate.x + right.plate.w - left.plate.x, FOOT.y + FOOT.h - top);
};
