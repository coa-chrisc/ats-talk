/**
 * Slide 24, the close, on navy, set as the talk's title slide is (slide 1,
 * the who world): the title large and centred across the stage, the short
 * green rule centred under it, and the two story lines centred under that,
 * line A at 40 px in the words' colour and line B at the story size in the
 * softer one. The title here is one line where slide 1's is two, so the
 * block is moved down to sit on the same middle as slide 1's, a little
 * above the stage's. The small line sits centred at the foot, in the
 * secondary colour. The white logo is the frame's (frame.tsx), never drawn
 * here.
 */
import { STAGE, box, storyKeys } from "@/components/deck/kit";
import { pictureOf, shown } from "../../script/find";
import { storyId } from "../steps";
import { titleKey } from "./layout";

const ID = "lets-talk";
const { show, story } = pictureOf(ID);
const [FOOT_TEXT] = shown(ID, "play");

/** Slide 1's measures: the 108 px title's line, the gaps between the parts, the rule, line A's line and line B's (32 px on 1.5). */
export const OPENING = { line: 112, ruleGap: 40, rule: { w: 140, h: 6 }, storyGap: 56, leadLine: 60, creditLine: 48 } as const;
/** Slide 1's block: its two-line title's top at 318, line B's foot under it. Its middle is where this block's goes. */
const SLIDE_1 = { top: 318, lines: 2 } as const;

const blockHeight = (lines: number) => lines * OPENING.line + OPENING.ruleGap + OPENING.rule.h + OPENING.storyGap + OPENING.leadLine + OPENING.creditLine;
/** The middle slide 1's block sits on: a little above the stage's. */
export const BLOCK_MIDDLE = SLIDE_1.top + blockHeight(SLIDE_1.lines) / 2;

const TITLE_LINES = [show];
const TOP = Math.round(BLOCK_MIDDLE - blockHeight(TITLE_LINES.length) / 2);
const RULE_Y = TOP + TITLE_LINES.length * OPENING.line + OPENING.ruleGap;
const LEAD_Y = RULE_Y + OPENING.rule.h + OPENING.storyGap;
const [A, B] = storyKeys(storyId(ID), story.length);

export const CLOSE = {
  title: { key: titleKey(ID), y: TOP, lines: TITLE_LINES },
  rule: { key: `${ID}.rule`, at: box((STAGE.w - OPENING.rule.w) / 2, RULE_Y, OPENING.rule.w, OPENING.rule.h) },
  story: [
    { key: A, y: LEAD_Y, text: story[0], size: "lead" as const },
    { key: B, y: LEAD_Y + OPENING.leadLine, text: story[1], size: "credit" as const },
  ],
  /** 26 px type on a 32 px line, centred, its foot 32 above the safe line. */
  foot: { key: `${ID}.foot`, at: box((STAGE.w - 720) / 2, 952, 720, 32), text: FOOT_TEXT },
} as const;
