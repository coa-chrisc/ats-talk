/**
 * Slide 24's click, the close, timed as slide 1's: the step puts the stage
 * on navy, slide 23's picture and title go, and the title settles; 0.75 s
 * after it starts, the green rule grows out from its middle under it; then
 * line A, then line B, then the small line at the foot. The chain ends
 * there and nothing moves after it.
 */
import { EASE, hide, lines, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { AWAY, leave, play } from "./beats";
import { titleKey } from "./layout";
import { CLOSE } from "./layout-close";

const ID = "lets-talk";

/** The title waits for the last picture to be gone; the rule grows 0.75 s after the title starts, as slide 1's does. */
export const SETTLE = { title: AWAY + 0.15, duration: 1.1, rule: 0.75, grow: 0.7 } as const;

export const letsTalk = picture(
  ID,
  {
    play: play([
      { moves: [leave("fit"), hide(titleKey("fit"), { at: 0, duration: AWAY })] },
      { with: true, hold: SETTLE.title, moves: [lines(CLOSE.title.key, { at: 0, duration: SETTLE.duration })] },
      { with: true, hold: SETTLE.rule, moves: [to(CLOSE.rule.key, { scaleX: 1 }, { scaleX: 0 }, { at: 0, duration: SETTLE.grow, ease: EASE.out })] },
      { with: true, hold: 0.5, moves: [story(ID, 0)] },
      { with: true, hold: 0.6, moves: [story(ID, 1)] },
      { hold: 0.4, moves: [rise(CLOSE.foot.key, { at: 0 })] },
    ]),
  },
  { ground: "navy" },
);
