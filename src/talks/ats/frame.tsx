/**
 * The talk's frame, drawn on every slide: the City of Austin wordmark top
 * left, the footer bottom left and the slide's number bottom right. All
 * three sit in the stage's 64 px edge, outside the safe area the worlds draw
 * in. The number ends short of the window's corner, where the deck's own
 * back and forward buttons and its counter sit. The title and close slides,
 * on navy, carry the wordmark in white and the number, without the footer.
 *
 * The wordmark is set in type until the City of Austin mark is supplied as
 * `public/brand/coa-wordmark.v1.png` and `coa-wordmark-white.v1.png`; then
 * this file swaps the two `<span>`s for `next/image` as the city talk's
 * frame does. Every part stays mounted on both grounds, so the change of
 * ground fades (frame.css) instead of popping.
 */
import type { FrameProps } from "@/components/deck/engine";
import "./frame.css";

/** The wordmark's words, in type: the City, then the department. */
export const WORDMARK = { city: "City of Austin", department: "Austin Technology Services" } as const;

/** The footer's words: the department, then what the talk is about. */
export const FOOTER = { department: "Austin Technology Services", group: "Agentic AI" } as const;

export function Frame({ number, ground }: FrameProps) {
  const mark = (tone: "ink" | "white", shown: boolean) => (
    <p className={`ats-frame__logo ats-frame__logo--${tone}`} aria-hidden={shown ? undefined : true}>
      <b>{WORDMARK.city}</b>
      <span>{WORDMARK.department}</span>
    </p>
  );
  return (
    <div className="ats-frame" data-ground={ground}>
      {mark("ink", !ground)}
      {mark("white", Boolean(ground))}
      <p className="ats-frame__footer" aria-hidden={ground ? true : undefined}>
        <b>{FOOTER.department}</b> · {FOOTER.group}
      </p>
      <p className="ats-frame__number">{number}</p>
    </div>
  );
}
