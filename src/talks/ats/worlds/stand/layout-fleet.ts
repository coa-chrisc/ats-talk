/**
 * Slide 4a's places, in three zones. Left: the fenced yard, named over its
 * top left, holding the application outline in the middle, three lead
 * agents to its left, two reviewers to its right and the person who
 * approves beyond them, the person's mark under the person; a tag hung
 * under the fence's left foot. Under that: two nameplates side by
 * side, and a third in a dashed outline a little apart, its caption beside
 * it. Right: a stair of four steps climbing left to right, a gate standing
 * on each tread and the step's name inside its riser; the grey tag over the
 * top step. Words are read from the script, by position.
 *
 * The drawing has y 548 to 992: the yard and its tag over the partners at
 * the left, the stair standing the full height at the right, and the zones
 * keep 48 px or more apart.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DRAW_FOOT, SAFE, TAG, contentTop, layerOf, tagWidth } from "./layout";

const [SANDBOX, BUILT_WITH, LEADS, REVIEWERS, APPROVES, MICROSOFT, QUISITIVE, AMAZON, JOINING, EXPLORE, VALIDATE, DEPLOY, SCALE, NOT_READY, OVER_YEARS] = shown("fleet", "play");

const TOP = contentTop("fleet");

/* The yard */

/** The yard's name and caption on one row over its top left, the name at the text size. */
const NAME_Y = TOP + 30;
/** The yard: from the stage's left to x 1176, 188 px tall under its name, wide enough for the leads, the outline, the reviewers and the person with the mark's label. Posts every 72 px along its rails. */
const FENCE = box(96, TOP + 68, 1080, 196);
const POST_PITCH = 72;

/** The application outline: three slots by two, each 60 by 48, 12 apart inside a 12 px margin. */
const SLOT = { w: 60, h: 48, gap: 12, pad: 12, cols: 3, rows: 2 } as const;
const APP = box(384, FENCE.y + 26, SLOT.pad * 2 + SLOT.cols * SLOT.w + (SLOT.cols - 1) * SLOT.gap, SLOT.pad * 2 + SLOT.rows * SLOT.h + (SLOT.rows - 1) * SLOT.gap);
/** The order the leads fill the slots in: the top row left to right, then the bottom row. */
const slotAt = (n: number): Box => {
  const col = n % SLOT.cols;
  const row = Math.floor(n / SLOT.cols);
  return box(APP.x + SLOT.pad + col * (SLOT.w + SLOT.gap), APP.y + SLOT.pad + row * (SLOT.h + SLOT.gap), SLOT.w, SLOT.h);
};

/** The leads: three agents at full size, 72 apart, level with the outline's middle; their name under them. */
const AGENT_Y = APP.y + APP.h / 2 - 12;
const LEADS_AT: Point[] = [190, 262, 334].map((x) => ({ x, y: AGENT_Y }));
/** The reviewers: two smaller agents right of the outline, their name (about 135 px) clear of its frame. */
export const REVIEWER_R = 16;
const REVIEWERS_AT: Point[] = [702, 754].map((x) => ({ x, y: AGENT_Y }));
const AGENT_NAME_Y = AGENT_Y + 60;

/** The person beyond the reviewers, the mark under them, its label to its right inside the yard. */
const PERSON = box(850, FENCE.y + 22, 44, 60);
const MARK: Point = { x: PERSON.x + PERSON.w / 2, y: PERSON.y + PERSON.h + 46 };

/** The tag hung under the fence's left foot, 22 px under the rail, clear of the posts' feet (10 px under it) and over the partner plates. */
const OVER_YEARS_AT = box(FENCE.x + 20, FENCE.y + FENCE.h + 22, tagWidth(OVER_YEARS), TAG.h);

/* The partners, under the yard */

/** The plates sit 34 px under the tag. */
const PLATE_Y = OVER_YEARS_AT.y + TAG.h + 34;
const PLATE = { h: 52, w: 196 } as const;
const MICROSOFT_AT = box(FENCE.x + 64, PLATE_Y, PLATE.w, PLATE.h);
const QUISITIVE_AT = box(MICROSOFT_AT.x + MICROSOFT_AT.w + 16, PLATE_Y, PLATE.w, PLATE.h);
/** The dashed plate, 64 px apart from the two, its caption 20 px to its right. */
const AMAZON_AT = box(QUISITIVE_AT.x + QUISITIVE_AT.w + 64, PLATE_Y, 160, PLATE.h);
const JOINING_AT: Point = { x: AMAZON_AT.x + AMAZON_AT.w + 20, y: PLATE_Y + PLATE.h / 2 };

/* The stair, right */

/** Four steps, 140 apart, climbing 64 at each, on a floor line at the drawing's foot, 64 px right of the yard. */
const STAIR = { x: 1240, step: 140, w: 138, rise: 64, floor: DRAW_FOOT - 24 } as const;
/** The lowest tread stands 60 over the floor, room for its name inside its riser. */
const FIRST = 64;
/** A gate on a tread: two posts 36 tall, 72 apart, two bars between them. */
export const GATE = { h: 36, span: 72 } as const;

const steps = [EXPLORE, VALIDATE, DEPLOY, SCALE];
const STEPS = steps.map((text, i) => {
  const tread = STAIR.floor - FIRST - i * STAIR.rise;
  const at = box(STAIR.x + i * STAIR.step, tread, STAIR.w, STAIR.floor - tread);
  return { text, at, tread, cx: at.x + at.w / 2 };
});
const TOP_STEP = STEPS[3];
/** The grey tag over the top step's gate, ending at the drawing's right edge. */
const NOT_READY_AT = box(SAFE.right - 16 - tagWidth(NOT_READY), TOP_STEP.tread - GATE.h - 14 - TAG.h, tagWidth(NOT_READY), TAG.h);

export const FLEET = {
  ...layerOf("fleet"),
  name: { key: "fleet.name", text: SANDBOX, at: { x: FENCE.x + 16, y: NAME_Y } as Point },
  built: { key: "fleet.built", text: BUILT_WITH, at: { x: FENCE.x + 172, y: NAME_Y } as Point },
  fence: {
    key: "fleet.fence",
    at: FENCE,
    posts: Array.from({ length: Math.floor(FENCE.w / POST_PITCH) + 1 }, (_, i) => Math.min(FENCE.x + i * POST_PITCH, FENCE.x + FENCE.w)),
  },
  app: { key: "fleet.app", at: APP, slots: Array.from({ length: SLOT.cols * SLOT.rows }, (_, n) => ({ key: `fleet.slot.${n}`, at: slotAt(n) })) },
  /** The reviewers' check: a second, heavier frame round the outline, 8 px out. */
  checked: { key: "fleet.checked", at: box(APP.x - 8, APP.y - 8, APP.w + 16, APP.h + 16) },
  leads: { keys: LEADS_AT.map((_, i) => `fleet.lead.${i}`), at: LEADS_AT, name: { key: "fleet.leads.name", text: LEADS, at: { x: LEADS_AT[1].x, y: AGENT_NAME_Y } as Point } },
  reviewers: {
    keys: REVIEWERS_AT.map((_, i) => `fleet.reviewer.${i}`),
    at: REVIEWERS_AT,
    name: { key: "fleet.reviewers.name", text: REVIEWERS, at: { x: (REVIEWERS_AT[0].x + REVIEWERS_AT[1].x) / 2, y: AGENT_NAME_Y } as Point },
  },
  person: { key: "fleet.person", at: PERSON },
  mark: { key: "fleet.mark", at: MARK, text: APPROVES },
  overYears: { key: "fleet.over-years", text: OVER_YEARS, at: OVER_YEARS_AT },
  plates: [
    { key: "fleet.plate.0", text: MICROSOFT, at: MICROSOFT_AT },
    { key: "fleet.plate.1", text: QUISITIVE, at: QUISITIVE_AT },
  ],
  joining: { key: "fleet.amazon", text: AMAZON, at: AMAZON_AT, caption: { key: "fleet.amazon.caption", text: JOINING, at: JOINING_AT } },
  stair: {
    floor: { key: "fleet.floor", x0: STAIR.x - 16, x1: STEPS[3].at.x + STEPS[3].at.w + 2, y: STAIR.floor },
    steps: STEPS.map((entry, i) => ({
      key: `fleet.step.${i}`,
      text: entry.text,
      at: entry.at,
      lit: i < 3,
      gate: { key: `fleet.gate.${i}`, at: { x: entry.cx, y: entry.tread } as Point },
      name: { at: { x: entry.cx, y: entry.tread + 30 } as Point },
    })),
    tag: { key: "fleet.not-ready", text: NOT_READY, at: NOT_READY_AT },
  },
};
