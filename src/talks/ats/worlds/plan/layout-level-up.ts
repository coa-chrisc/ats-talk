/**
 * Slide 14's places: two different shapes side by side. At the left, a
 * pyramid of three tiers, the wide base at the foot, each tier named inside
 * and its caption beside its sloping right edge, so the captions step in as
 * the pyramid narrows. At the right, a row of four developers at their desks,
 * named once above the row's left end, a tag over the row's middle (grey,
 * and in the same place green with other words), and under the desks the
 * slab that slides in. The row and the slab are drawn where they end,
 * lifted; they start `LIFT` px lower. The figure and its caption sit at the
 * foot under the row, ending at the right edge. Words are read from the
 * script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, PERSON, SAFE, TAG, contentTop, groupOf, labelBox, labelsOf, round, tagWidth, wordsWidth } from "./layout";

const [AWARE, EVERYONE, PROFICIENT, LEADS, EXPERT, SMALL_TEAM, DEVELOPERS, USER, SLAB_WORDS, ENGINEER, SLOWER, NO_METHOD] = labelsOf("level-up");

/** 556: under the two-line title's two story rows. */
const TOP = contentTop("level-up");

/**
 * The pyramid: 312 tall from 12 px under the field's top, its base 560 wide
 * from the left edge and its flat top 100 wide (so the top tier is still
 * wide enough at its middle for its name). Three tiers 96 tall with 12 px
 * between them.
 */
const PYRAMID = { top: TOP + 12, h: 312, base: 560, apex: 100, tier: 96, gap: 12 } as const;
const AXIS = SAFE.left + PYRAMID.base / 2;
const halfAt = (y: number) => PYRAMID.apex / 2 + ((PYRAMID.base - PYRAMID.apex) / 2) * ((y - PYRAMID.top) / PYRAMID.h);
/** Tier 0 is the base; its top and foot. */
const tierTop = (i: number) => PYRAMID.top + (2 - i) * (PYRAMID.tier + PYRAMID.gap);
const tierPoints = (i: number): Point[] => {
  const y0 = tierTop(i);
  const y1 = y0 + PYRAMID.tier;
  return [
    { x: round(AXIS - halfAt(y0)), y: y0 },
    { x: round(AXIS + halfAt(y0)), y: y0 },
    { x: round(AXIS + halfAt(y1)), y: y1 },
    { x: round(AXIS - halfAt(y1)), y: y1 },
  ];
};
/** A caption starts 28 px right of its tier's edge at the tier's middle. */
const CAPTION_GAP = 28;

/** The right-hand shape starts here: clear of the middle caption, the widest. */
const RIGHT = 1140;
const ROW_W = SAFE.right - RIGHT;

/** How far the row and its slab lift once the slab is under them: a little. */
export const LIFT = 26;
/** The row's name, on the field's first line. */
const NAME_Y = TOP + LABEL_LINE / 2;
/** The tag, centred over the row, 12 px under the name's line. */
const TAG_W = Math.max(tagWidth(USER), tagWidth(ENGINEER));
const TAG_BOX = box(Math.round(RIGHT + ROW_W / 2 - TAG_W / 2), TOP + LABEL_LINE + 12, TAG_W, TAG.h);
/** Four desks across the row, 171 apart. A person sits behind each desk, the desk's top across their middle, a laptop open beside them. */
const DESK = { count: 4, pitch: ROW_W / 4, person: TAG_BOX.y + TAG.h + 22, top: 50, h: 12, foot: 108, w: 148, laptop: { dx: 86, w: 54, h: 34 } } as const;
const deskX = (i: number) => Math.round(RIGHT + i * DESK.pitch + (DESK.pitch - DESK.w) / 2);
const DESK_FOOT = DESK.person + DESK.foot;
/** The slab: under the desks' feet, the row's width, 52 tall. It comes in from `from` px to the left. */
const SLAB = box(RIGHT, DESK_FOOT + 4, ROW_W, 52);
const SLAB_FROM = -120;

/** The figure's line at the foot: the figure ends 24 px short of its caption, which ends at the right edge. */
const FIGURE = { y: SAFE.bottom - 30, size: 44, line: 52 } as const;
const captionX = SAFE.right - wordsWidth(NO_METHOD);

export const LEVEL_UP = {
  ...groupOf("level-up"),
  /** The base first, as the tiers light. */
  tiers: [
    [AWARE, EVERYONE],
    [PROFICIENT, LEADS],
    [EXPERT, SMALL_TEAM],
  ].map(([name, caption], i) => {
    const points = tierPoints(i);
    const mid = tierTop(i) + PYRAMID.tier / 2;
    return {
      key: `level-up.tier.${i}`,
      lit: `level-up.tier.${i}.lit`,
      points,
      name: { key: `level-up.tier.${i}.name`, text: name, at: { x: AXIS, y: mid } as Point },
      caption: { key: `level-up.tier.${i}.caption`, text: caption, at: { x: round(AXIS + halfAt(mid) + CAPTION_GAP), y: mid } as Point },
      /** How wide the tier is at its name's line: its name must fit inside. */
      widthAtName: round(2 * halfAt(mid)),
    };
  }),
  label: { key: "level-up.developers", text: DEVELOPERS, at: { x: RIGHT, y: NAME_Y } as Point },
  tag: { grey: { key: "level-up.tag.user", text: USER }, green: { key: "level-up.tag.engineer", text: ENGINEER }, at: TAG_BOX },
  row: {
    key: "level-up.row",
    lift: LIFT,
    desks: Array.from({ length: DESK.count }, (_, i) => {
      const x = deskX(i);
      const top = box(x, DESK.person + DESK.top, DESK.w, DESK.h);
      return {
        key: `level-up.desk.${i}`,
        person: box(x + 16, DESK.person, PERSON.w, PERSON.h),
        top,
        foot: DESK_FOOT,
        laptop: box(x + DESK.laptop.dx, top.y - DESK.laptop.h, DESK.laptop.w, DESK.laptop.h),
      };
    }),
  },
  slab: { key: "level-up.slab", at: SLAB, from: SLAB_FROM, label: { key: "level-up.slab.label", text: SLAB_WORDS, at: { x: SLAB.x + SLAB.w / 2, y: SLAB.y + SLAB.h / 2 } as Point } },
  figure: { key: "level-up.figure", text: SLOWER, at: { x: captionX - 24, y: FIGURE.y } as Point, size: FIGURE.size, line: FIGURE.line },
  caption: { key: "level-up.figure.caption", text: NO_METHOD, at: { x: captionX, y: FIGURE.y } as Point },
};

const lowered = (b: Box): Box => ({ ...b, y: b.y + LIFT });
const deskBox = (desk: (typeof LEVEL_UP.row.desks)[number]): Box => box(desk.top.x, desk.person.y, desk.top.w, desk.foot - desk.person.y);
export const tierBox = (tier: (typeof LEVEL_UP.tiers)[number]): Box => {
  const xs = tier.points.map((p) => p.x);
  const ys = tier.points.map((p) => p.y);
  return box(Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
};

export const figureBox = () => labelBox(LEVEL_UP.figure.at, SLOWER, "end", FIGURE.size, FIGURE.line);

/** Everything 14 draws under its story band, for the layout test: the row and slab both lifted and before they lift. */
export const LEVEL_UP_BOXES: Box[] = [
  ...LEVEL_UP.tiers.flatMap((tier) => [tierBox(tier), labelBox(tier.name.at, tier.name.text), labelBox(tier.caption.at, tier.caption.text, "start")]),
  labelBox(LEVEL_UP.label.at, DEVELOPERS, "start"),
  TAG_BOX,
  ...LEVEL_UP.row.desks.flatMap((desk) => [deskBox(desk), lowered(deskBox(desk))]),
  SLAB,
  lowered(SLAB),
  figureBox(),
  labelBox(LEVEL_UP.caption.at, NO_METHOD, "start"),
];
