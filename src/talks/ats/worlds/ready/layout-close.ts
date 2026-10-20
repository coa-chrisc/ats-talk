/**
 * Slide 29, the close, on navy, set as the talk's title slide is: the title
 * large and centred across the stage, the short green rule centred under it,
 * and the two story lines centred under that, line A at 40 px in the words'
 * colour and line B at the story size in the softer one. The block sits on
 * the middle of a two-line title block whose top is at 318, a little above
 * the stage's middle. The small line sits centred at the foot, in the
 * secondary colour. The white wordmark is the frame's (frame.tsx), never
 * drawn here.
 */
import { STAGE, box, storyKeys } from "@/components/deck/kit";
import { pictureOf } from "../../script/find";
import { storyId } from "../steps";
import { CLOSE_ID, labelsOf, titleKey } from "./layout";

const { show, story } = pictureOf(CLOSE_ID);
const [FOOT_TEXT] = labelsOf(CLOSE_ID);

/** The opening's measures: the 108 px title's line, the gaps between the parts, the rule, line A's line and line B's (32 px on 1.5). */
export const OPENING = { line: 112, ruleGap: 40, rule: { w: 140, h: 6 }, storyGap: 56, leadLine: 60, creditLine: 48 } as const;
/** A two-line opening block's top: its middle is where this block's goes. */
const OPENING_BLOCK = { top: 318, lines: 2 } as const;

const blockHeight = (lines: number) => lines * OPENING.line + OPENING.ruleGap + OPENING.rule.h + OPENING.storyGap + OPENING.leadLine + OPENING.creditLine;
export const BLOCK_MIDDLE = OPENING_BLOCK.top + blockHeight(OPENING_BLOCK.lines) / 2;

const TITLE_LINES = [show];
const TOP = Math.round(BLOCK_MIDDLE - blockHeight(TITLE_LINES.length) / 2);
const RULE_Y = TOP + TITLE_LINES.length * OPENING.line + OPENING.ruleGap;
const LEAD_Y = RULE_Y + OPENING.rule.h + OPENING.storyGap;
const [A, B] = storyKeys(storyId(CLOSE_ID), story.length);

export const CLOSE = {
  title: { key: titleKey(CLOSE_ID), y: TOP, lines: TITLE_LINES },
  rule: { key: `${CLOSE_ID}.rule`, at: box((STAGE.w - OPENING.rule.w) / 2, RULE_Y, OPENING.rule.w, OPENING.rule.h) },
  story: [
    { key: A, y: LEAD_Y, text: story[0], size: "line" as const },
    { key: B, y: LEAD_Y + OPENING.leadLine, text: story[1], size: "credit" as const },
  ],
  /** The small line at the foot: a short rule over its words, centred, 26 px type on a 32 px line, its foot 40 over the floor. */
  foot: { key: `${CLOSE_ID}.foot`, at: box((STAGE.w - 720) / 2, 920, 720, 32), text: FOOT_TEXT, rule: box((STAGE.w - 64) / 2, 896, 64, 2) },
} as const;
