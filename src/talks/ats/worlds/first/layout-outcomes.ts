/**
 * Slide 23's places. The field, 556 to 976 under the title and the story
 * band, holds one measured trip. A dashed tag at the top left says the
 * project is an example. Under it a line runs from a navy resident to a
 * green staff figure and on to a closed gate; the resident's request card
 * travels the line to the staff figure and waits there, a person's mark
 * beside the figure. A bracket under the trip, from the request to the
 * approval, is the only scale: its words under its middle, a pin at its end
 * for the baseline, and a dashed tag under the pin, off the bracket, for the
 * target. The rest is set beside the drawing it names: the responsible role
 * over the staff figure, the quality check left of the waiting card (a
 * magnifier passing over it), the expansion decision over the line before
 * the gate. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import ADVANCES from "../../script/geist-medium-advances.json";
import { LABEL_LINE, SAFE, contentTop, groupOf, labelsOf, round } from "./layout-plan";

const [PROJECT, LINK, MEASURE, MEASURE_CAPTION, BASELINE, BASELINE_CAPTION, TARGET, TARGET_CAPTION, ROLE, ROLE_CAPTION, QUALITY, QUALITY_CAPTION, EXPANSION, EXPANSION_CAPTION] =
  labelsOf("outcomes");

/** 556: under the two-line title and the story band's two rows. */
const TOP = contentTop("outcomes");

/**
 * How wide a run of words is set at a size, from Geist Medium's own advances
 * (script/geist-medium-advances.json), 2 per cent over; the strong (600) cut
 * runs about 5 per cent wider, so it is taken 6 per cent over. Slides 22a and
 * 23 size their tags and test their words' room by it.
 */
const ADVANCE: Record<string, number> = ADVANCES.advances;
export const setWidth = (text: string, size = 26, strong = false) => Math.ceil([...text].reduce((sum, ch) => sum + (ADVANCE[ch] ?? 0.6), 0) * size * (strong ? 1.06 : 1.02));
/** A run of words' box, centred on its point up and down as `Label` sets it, and placed across by its anchor. */
export const setBox = (at: Point, text: string, anchor: "start" | "middle" | "end", strong = false): Box => {
  const w = setWidth(text, 26, strong);
  const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : at.x - w / 2;
  return box(Math.round(x), at.y - LABEL_LINE / 2, w, LABEL_LINE);
};

/** The people on these slides (22a and 23): the kit's person, a little over half again its plain size. */
export const PERSON_CAST = { w: 76, h: 100 } as const;

type Words = { key: string; text: string; at: Point };
/** A name over its caption, each a label line apart, set from `at` by `anchor`. */
const named = (key: string, name: string, caption: string, at: Point, anchor: "start" | "middle" | "end") => ({
  key,
  anchor,
  name: { text: name, at } as Omit<Words, "key">,
  caption: { text: caption, at: { x: at.x, y: at.y + LABEL_LINE } } as Omit<Words, "key">,
});

/* The tag */

/** The dashed tag: 24 in from its edge, 6 over and 12 under its two lines. */
const TAG_PAD = { x: 24, top: 6, foot: 12 } as const;
const TAG_LINES: Point = { x: SAFE.left + TAG_PAD.x, y: TOP + TAG_PAD.top + LABEL_LINE / 2 };
const TAG_AT = box(SAFE.left, TOP, TAG_PAD.x * 2 + Math.max(setWidth(PROJECT, 26, true), setWidth(LINK)), TAG_PAD.top + 2 * LABEL_LINE + TAG_PAD.foot);

/* The trip */

/** The line the people stand on, across the band from the resident to its right edge. */
const LINE_Y = 760;
const RESIDENT = box(SAFE.left, LINE_Y - PERSON_CAST.h, PERSON_CAST.w, PERSON_CAST.h);
const STAFF = box(1000, LINE_Y - PERSON_CAST.h, PERSON_CAST.w, PERSON_CAST.h);
/** The request card: a small page, 40 by 50, 12 past the resident and 4 over the line; it travels to 10 short of the staff figure. */
export const CARD = { w: 40, h: 50 } as const;
const CARD_FROM = box(RESIDENT.x + RESIDENT.w + 12, LINE_Y - 4 - CARD.h, CARD.w, CARD.h);
const CARD_TRAVEL = STAFF.x - 10 - CARD.w - CARD_FROM.x;
const CARD_AT = box(CARD_FROM.x + CARD_TRAVEL, CARD_FROM.y, CARD.w, CARD.h);
/** The person's mark: a ring of 24, by the staff figure's head, its right edge 4 past the figure's left and clear over the waiting card. */
const MARK_AT: Point = { x: STAFF.x - 20, y: STAFF.y + 8 };
export const MARK_R = 24;

/** The gate on the line beyond the staff figure, near the band's right edge: slide 10's gate, times 1.4. */
const GATE_SCALE = 1.4;
const GATE_FOOT: Point = { x: 1748, y: LINE_Y };

/* The bracket and what hangs from it */

/** The bracket: 12 under the line, 16 deep, from the card's middle where it set out to the staff figure's middle; a nib 12 down from its middle. */
const BRACKET = { y: LINE_Y + 12, drop: 16, nib: 12, x0: round(CARD_FROM.x + CARD.w / 2), x1: round(STAFF.x + STAFF.w / 2) } as const;
const BRACKET_FOOT = BRACKET.y + BRACKET.drop;
const BRACKET_MID = round((BRACKET.x0 + BRACKET.x1) / 2);
/** The pin at the bracket's end: a stem 22 down from it and a head of 8. */
export const PIN = { stem: 22, r: 8 } as const;
const PIN_HEAD: Point = { x: BRACKET.x1, y: BRACKET_FOOT + PIN.stem + PIN.r };
/** The target's dashed tag: under the pin's words, 12 right of the pin, off the bracket. */
const TARGET_LINES: Point = { x: BRACKET.x1 + 12 + TAG_PAD.x, y: 900 };
const TARGET_AT = box(BRACKET.x1 + 12, TARGET_LINES.y - TAG_PAD.top - LABEL_LINE / 2, 2 * TAG_PAD.x + Math.max(setWidth(TARGET, 26, true), setWidth(TARGET_CAPTION)), TAG_PAD.top + 2 * LABEL_LINE + TAG_PAD.foot);

/** The magnifier: a lens of 15, inside the card's edge at rest, and its handle; the lens 44 left of the card's middle when it shows, passing to rest over it. */
export const LENS = { r: 15, handle: 12, pass: 44 } as const;
const LENS_AT: Point = { x: CARD_AT.x + CARD.w / 2, y: CARD_AT.y + CARD.h / 2 };

export const OUTCOMES = {
  ...groupOf("outcomes"),
  tag: { key: "outcomes.tag", at: TAG_AT, project: { text: PROJECT, at: TAG_LINES }, link: { text: LINK, at: { x: TAG_LINES.x, y: TAG_LINES.y + LABEL_LINE } } },
  route: { key: "outcomes.route", from: { x: RESIDENT.x + RESIDENT.w + 6, y: LINE_Y } as Point, to: { x: SAFE.right, y: LINE_Y } as Point },
  resident: { key: "outcomes.resident", at: RESIDENT },
  staff: { key: "outcomes.staff", at: STAFF },
  card: { key: "outcomes.card", from: CARD_FROM, at: CARD_AT, travel: round(CARD_TRAVEL) },
  mark: { key: "outcomes.mark", at: MARK_AT },
  bracket: { key: "outcomes.bracket", d: `M${BRACKET.x0} ${BRACKET.y}V${BRACKET_FOOT}H${BRACKET.x1}V${BRACKET.y}M${BRACKET_MID} ${BRACKET_FOOT}V${BRACKET_FOOT + BRACKET.nib}`, x0: BRACKET.x0, x1: BRACKET.x1, foot: BRACKET_FOOT },
  measure: named("outcomes.measure", MEASURE, MEASURE_CAPTION, { x: BRACKET_MID, y: BRACKET_FOOT + BRACKET.nib + 10 + LABEL_LINE / 2 }, "middle"),
  pin: { key: "outcomes.pin", top: { x: BRACKET.x1, y: BRACKET_FOOT } as Point, head: PIN_HEAD },
  baseline: named("outcomes.baseline", BASELINE, BASELINE_CAPTION, { x: BRACKET.x1 + 24, y: PIN_HEAD.y }, "start"),
  target: { ...named("outcomes.target", TARGET, TARGET_CAPTION, TARGET_LINES, "start"), at: TARGET_AT },
  owner: named("outcomes.owner", ROLE, ROLE_CAPTION, { x: STAFF.x, y: STAFF.y - 70 }, "start"),
  lens: { key: "outcomes.lens", at: LENS_AT, pass: LENS.pass },
  quality: named("outcomes.quality", QUALITY, QUALITY_CAPTION, { x: CARD_AT.x - 54, y: 676 }, "end"),
  gate: { key: "outcomes.gate", foot: GATE_FOOT, scale: GATE_SCALE },
  expansion: named("outcomes.expansion", EXPANSION, EXPANSION_CAPTION, { x: GATE_FOOT.x - 72, y: 690 }, "end"),
} as const;

const O = OUTCOMES;
const wordsOf = (group: ReturnType<typeof named>) => [setBox(group.name.at, group.name.text, group.anchor, true), setBox(group.caption.at, group.caption.text, group.anchor)];

/** The gate's box, times its scale: its posts 72 apart and 40 tall. */
export const gateBox = (): Box => {
  const half = round((72 * GATE_SCALE) / 2);
  return box(GATE_FOOT.x - half, round(GATE_FOOT.y - 40 * GATE_SCALE), 2 * half, round(40 * GATE_SCALE));
};

/** Every place the slide draws in, for the layout's tests: each drawing and each run of words. */
export const OUTCOMES_PARTS = {
  tag: O.tag.at,
  tagWords: [setBox(O.tag.project.at, PROJECT, "start", true), setBox(O.tag.link.at, LINK, "start")],
  resident: RESIDENT,
  staff: STAFF,
  cardFrom: CARD_FROM,
  card: CARD_AT,
  mark: box(MARK_AT.x - MARK_R, MARK_AT.y - MARK_R, 2 * MARK_R, 2 * MARK_R),
  bracket: box(BRACKET.x0, BRACKET.y, BRACKET.x1 - BRACKET.x0, BRACKET.drop + BRACKET.nib),
  measure: wordsOf(O.measure),
  pin: box(PIN_HEAD.x - PIN.r, BRACKET_FOOT, 2 * PIN.r, PIN.stem + 2 * PIN.r),
  baseline: wordsOf(O.baseline),
  target: TARGET_AT,
  targetWords: wordsOf(O.target),
  owner: wordsOf(O.owner),
  lens: box(LENS_AT.x - LENS.r, LENS_AT.y - LENS.r, 2 * LENS.r + LENS.handle, 2 * LENS.r + LENS.handle),
  quality: wordsOf(O.quality),
  gate: gateBox(),
  expansion: wordsOf(O.expansion),
} as const;
