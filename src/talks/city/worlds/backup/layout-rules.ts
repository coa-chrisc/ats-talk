/**
 * Slides 28 to 30, the rules a City team would work under: where every part
 * goes, its id and its words, read from the script by position. 28 and 29
 * have a two-line title, so their drawing starts 32 px under the story band,
 * at y 552; 30's title runs to three lines, so its drawing starts at y 630.
 *
 * 28, Security: four bands stacked from the bottom up, the pipeline band
 * holding five checks that each take the deep-green tick; three tier boxes
 * on the right, the third an empty dashed box.
 *
 * 29, OneSDLC: five stages along a line, a green branch that leaves at the
 * second and rejoins the line before the fourth, four checkpoint diamonds:
 * intake on the line, the first-version and pilot reviews on the branch, the
 * production review where the branch rejoins; and a tag under it.
 *
 * 30, The charter: two role cards at the top; under them two groups apart,
 * each under a heading in the second story line's words: four overlapping
 * circles on the left, five result cards in a column on the right.
 */
import { box, type Point } from "@/components/deck/kit";
import { pictureOf } from "../../script/find";
import { LABEL_LINE, TAG_H, contentTop, groupOf, labelAt, labelsOf, tagW } from "./layout";

/* 28. Security */

const [TENANT, DECLARATIONS, PIPELINE, AI_CONTROLS, TIER_ONE, T1A, T1B, TIER_TWO, T2A, T2B, TIER_THREE, NONE] = labelsOf("security");
const S_TOP = contentTop("security");
const BAND = { x: 96, w: 1084, h: 88, gap: 14 } as const;
/** The bands from the bottom up, in the order they arrive: the lowest first. */
const BAND_Y = (i: number) => S_TOP + 3 * (BAND.h + BAND.gap) - i * (BAND.h + BAND.gap);
const PIPE_Y = BAND_Y(2) + BAND.h / 2;
const CHECK = { size: 44, x0: 620, pitch: 124 } as const;
const TIER = { x: 1244, w: 580, h: 124, gap: 14 } as const;
const tierY = (i: number) => S_TOP + i * (TIER.h + TIER.gap);
/** A tool's chip in a tier: its name in a rounded outline, 20 px of room each side of the measured words. */
const CHIP_H = 44;
const chips = (y: number, names: readonly [string, number][]) => {
  let x = TIER.x + 24;
  return names.map(([text, w]) => {
    const at = box(x, y, w + 40, CHIP_H);
    x += w + 40 + 16;
    return { text, at };
  });
};

export const SECURITY = {
  ...groupOf("security"),
  bands: [TENANT, DECLARATIONS, PIPELINE, AI_CONTROLS].map((text, i) => ({
    key: `security.band.${i}`,
    at: box(BAND.x, BAND_Y(i), BAND.w, BAND.h),
    label: { text, at: box(BAND.x + 28, BAND_Y(i) + BAND.h / 2 - LABEL_LINE / 2, 400, LABEL_LINE) },
  })),
  pipe: { key: "security.pipe", x0: CHECK.x0 - 40, x1: CHECK.x0 + 4 * CHECK.pitch + CHECK.size + 20, y: PIPE_Y },
  checks: [0, 1, 2, 3, 4].map((i) => {
    const at = box(CHECK.x0 + i * CHECK.pitch, PIPE_Y - CHECK.size / 2, CHECK.size, CHECK.size);
    return { key: `security.check.${i}`, at, tick: { key: `security.tick.${i}`, at: { x: at.x + at.w / 2, y: at.y + at.h / 2 } as Point } };
  }),
  tiers: [
    { name: TIER_ONE, tools: chips(tierY(0) + 62, [[T1A, 117], [T1B, 147]]) },
    { name: TIER_TWO, tools: chips(tierY(1) + 62, [[T2A, 143], [T2B, 162]]) },
  ].map((tier, i) => ({
    key: `security.tier.${i}`,
    at: box(TIER.x, tierY(i), TIER.w, TIER.h),
    name: { text: tier.name, at: box(TIER.x + 24, tierY(i) + 16, 200, LABEL_LINE) },
    tools: tier.tools,
  })),
  /** The third tier: an empty dashed box, its name and the words that say why it is empty. */
  empty: {
    key: "security.tier.2",
    at: box(TIER.x, tierY(2), TIER.w, TIER.h),
    name: { key: "security.tier.2.name", text: TIER_THREE, at: box(TIER.x + 24, tierY(2) + 16, 200, LABEL_LINE) },
    none: { key: "security.tier.2.none", text: NONE, at: box(TIER.x + 24, tierY(2) + 62 + CHIP_H / 2 - LABEL_LINE / 2, 360, LABEL_LINE) },
  },
};

/* 29. OneSDLC */

const [DECIDE, ROUTE, BUILD, RUN, RETIRE, CUSTOM, INTAKE, FIRST_REVIEW, PILOT_REVIEW, PRODUCTION_REVIEW, STANDUP] = labelsOf("onesdlc");
const O_TOP = contentTop("onesdlc");
const LINE_Y = O_TOP + 84;
const STAGE_XS = [200, 520, 900, 1480, 1740];
const NODE_R = 16;
/** Where the branch leaves the line (at Route) and comes back into it (at the production review, before Run), and how far under the line it runs. */
const SPLIT_X = STAGE_XS[1];
const JOIN_X = 1240;
const DIP = LINE_Y + 180;
const BEND = 40;
/** A checkpoint's diamond: half its width. */
const DIAMOND = 14;
/**
 * The four checkpoints in turn: intake on the line before the branch
 * leaves it, the first-version and pilot reviews on the branch itself, so
 * every custom build passes through both, and the production review where
 * the branch comes back into the line, before Run.
 */
const CHECKS: { x: number; y: number; on: "line" | "branch" }[] = [
  { x: 360, y: LINE_Y, on: "line" },
  { x: 740, y: DIP, on: "branch" },
  { x: 1020, y: DIP, on: "branch" },
  { x: JOIN_X, y: LINE_Y, on: "line" },
];

export const ONESDLC = {
  ...groupOf("onesdlc"),
  line: { key: "onesdlc.line", x0: 120, x1: 1800, y: LINE_Y },
  stages: [DECIDE, ROUTE, BUILD, RUN, RETIRE].map((text, i) => ({
    key: `onesdlc.stage.${i}`,
    at: { x: STAGE_XS[i], y: LINE_Y } as Point,
    label: { key: `onesdlc.stage.${i}.label`, text, at: labelAt({ x: STAGE_XS[i], y: LINE_Y - 52 }, 160) },
  })),
  r: NODE_R,
  /** The branch for custom builds: down from Route, along under the line, and back up into the line at the production review. */
  branch: {
    key: "onesdlc.branch",
    split: SPLIT_X,
    join: JOIN_X,
    dip: DIP,
    d: `M${SPLIT_X} ${LINE_Y + NODE_R}V${DIP - BEND}Q${SPLIT_X} ${DIP} ${SPLIT_X + BEND} ${DIP}H${JOIN_X - BEND}Q${JOIN_X} ${DIP} ${JOIN_X} ${DIP - BEND}V${LINE_Y + DIAMOND}`,
  },
  /** Its name inside the loop it makes, over its run. */
  custom: { key: "onesdlc.custom", text: CUSTOM, at: labelAt({ x: (SPLIT_X + JOIN_X) / 2, y: DIP - 40 }, 220) },
  diamond: DIAMOND,
  checkpoints: [INTAKE, FIRST_REVIEW, PILOT_REVIEW, PRODUCTION_REVIEW].map((text, i) => {
    const { x, y, on } = CHECKS[i];
    /** Each word under its diamond; the production review's starts right of the branch's rising arm, which comes up into the diamond from below. */
    const at = i === 3 ? box(JOIN_X + 20, y + 28, 260, LABEL_LINE) : labelAt({ x, y: y + 44 }, 280);
    return { key: `onesdlc.check.${i}`, at: { x, y } as Point, on, label: { key: `onesdlc.check.${i}.label`, text, at } };
  }),
  tag: { key: "onesdlc.tag", lines: [STANDUP], at: box(1824 - tagW(470), DIP + 72, tagW(470), TAG_H) },
};

/* 30. The charter */

const [MANAGER, ARCHITECT, UNDERSTAND, DEVELOP, ENABLE, REVIEW, ...RESULTS] = labelsOf("charter");
/** The two groups' headings, in the second story line's own words: its four activities and its five initial results. */
const [ACTIVITIES, INITIAL_RESULTS] = [/four activities/, /five initial results/].map((words) => pictureOf("charter").story[1].match(words)![0]);
const C_TOP = contentTop("charter");
/** Its title runs to three lines, so the picture is packed into the 360 px between the story band and the safe area's foot. */
const ROLE = { w: 360, h: 56, gap: 48, y: C_TOP } as const;
const HEAD_Y = C_TOP + ROLE.h + 14;
/**
 * The four activities: overlapping circles in a row on the left. They
 * overlap by 4 px less than a radius, which leaves the longest word in a
 * circle (227 px) clear of its neighbours' outlines.
 */
const CIRCLE = { r: 124, pitch: 244, cy: HEAD_Y + LABEL_LINE + 10 + 124 } as const;
const CIRCLE_XS = [0, 1, 2, 3].map((i) => 96 + CIRCLE.r + i * CIRCLE.pitch);
/** The five results: a column of cards on the right, under their own heading, one under another in the script's order. */
const RESULT = { x: 1264, w: 560, h: 40, gap: 10, y: HEAD_Y + LABEL_LINE + 10 } as const;
/** A label's lines in a circle: the long one broken after its first word. */
const circleLines = (text: string) => (text.includes(" ") && text.length > 12 ? [text.slice(0, text.indexOf(" ")), text.slice(text.indexOf(" ") + 1)] : [text]);

export const CHARTER = {
  ...groupOf("charter"),
  roles: [MANAGER, ARCHITECT].map((text, i) => {
    const x = 960 - ROLE.w - ROLE.gap / 2 + i * (ROLE.w + ROLE.gap);
    return {
      key: `charter.role.${i}`,
      at: box(x, ROLE.y, ROLE.w, ROLE.h),
      person: box(x + 24, ROLE.y + 10, 36, ROLE.h - 20),
      label: { text, at: box(x + 80, ROLE.y + ROLE.h / 2 - LABEL_LINE / 2, ROLE.w - 96, LABEL_LINE) },
    };
  }),
  /** Each group's heading over it: the activities over the circles, the results over their cards. */
  heads: [
    { key: "charter.head.0", lines: [ACTIVITIES], at: box(96, HEAD_Y, 4 * CIRCLE.pitch, LABEL_LINE) },
    { key: "charter.head.1", lines: [INITIAL_RESULTS], at: box(RESULT.x, HEAD_Y, RESULT.w, LABEL_LINE) },
  ],
  circles: [UNDERSTAND, DEVELOP, ENABLE, REVIEW].map((text, i) => ({
    key: `charter.circle.${i}`,
    at: { x: CIRCLE_XS[i], y: CIRCLE.cy } as Point,
    label: { key: `charter.circle.${i}.label`, lines: circleLines(text), at: labelAt({ x: CIRCLE_XS[i], y: CIRCLE.cy }, 236, circleLines(text).length * LABEL_LINE) },
  })),
  r: CIRCLE.r,
  results: RESULTS.map((text, i) => ({ key: `charter.result.${i}`, text, at: box(RESULT.x, RESULT.y + i * (RESULT.h + RESULT.gap), RESULT.w, RESULT.h) })),
};
