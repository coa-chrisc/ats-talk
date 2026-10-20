/**
 * Slide 9's click, the world's first: the title comes up as the world
 * arrives; the three dashed grey outlines open from the left one after
 * another; each is crossed out, stroke by stroke, with the first line; they
 * step back to half strength as the green scene draws in the row below
 * them, the table and its chairs, then the calendar, with the second line;
 * and the indigo tag lands at the right with its caption.
 */
import { EASE, draw, lines, rise, show, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { titleKey } from "./layout";
import { NOT_PROPOSING } from "./layout-not-proposing";
import { ARRIVE, keys, play } from "./moves";

const N = NOT_PROPOSING;
const T = N.table;

/** After their crosses the outlines, crosses and names with them, step back to half strength: still legible in the soft grey, no longer the subject. */
export const SETTLED = 0.5;
const settle = (list: string[]) => to(list, { autoAlpha: SETTLED }, { autoAlpha: 1 }, { at: 0, stagger: 0, duration: 0.5, ease: EASE.soft });

/** The outlines open this far apart. */
const OPEN = 0.25;
/** Each outline's cross: its two strokes this far apart, and the next outline's cross this far after. */
const CROSS = { stroke: 0.2, next: 0.35, duration: 0.35 } as const;

export const notProposing = picture("not-proposing", {
  play: play(
    // The title as the world arrives, and the three outlines opening one after another.
    { moves: [lines(titleKey("not-proposing"), { at: ARRIVE }), wipe(keys(N.outlines), { at: ARRIVE + 0.3, stagger: OPEN, from: "left" })] },
    // Each is crossed out, stroke by stroke, as the first line says why.
    {
      hold: 0.2,
      moves: N.outlines.flatMap((outline, i) => [
        draw(outline.cross.strokes[0].key, { at: i * CROSS.next, duration: CROSS.duration }),
        draw(outline.cross.strokes[1].key, { at: i * CROSS.next + CROSS.stroke, duration: CROSS.duration }),
      ]),
    },
    { with: true, hold: 0.2, moves: [story("not-proposing", 0)] },
    // They step back, and the green scene draws in the row below them: the table and its chairs, then the calendar.
    {
      hold: 0.6,
      moves: [
        settle(keys(N.outlines)),
        draw(T.key, { at: 0.2 }),
        show(keys(T.chairs), { at: 0.5, stagger: 0.07 }),
        rise(T.name.key, { at: 0.9 }),
        rise(N.calendar.key, { at: 0.8 }),
        rise(N.calendar.name.key, { at: 1.1 }),
      ],
    },
    { with: true, hold: 0.6, moves: [story("not-proposing", 1)] },
    // The tag lands at the foot, its caption with it.
    { hold: 0.6, moves: [rise(N.tag.key, { at: 0 }), rise(N.tag.caption.key, { at: 0.25 })] },
  ),
});
