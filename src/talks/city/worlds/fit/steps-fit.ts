/**
 * Slide 23's click: slide 22's picture goes and the title changes; the
 * organization's chart draws from its head down, its name rising in the
 * head, then its row's boxes one after another, each with its members;
 * then the split runs on to the new box, its dashed outline opens from the
 * top, and the figure steps into it from the right with line A; after a
 * pause to read, four lines reach out from the new box one after another,
 * each piece rising at its line's end, and line B lands with the last of
 * them. The chain ends on the figure in its dashed box, joined to the
 * chart and to the four pieces.
 */
import { EASE, draw, retitle, rise, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { keys, leave, play } from "./beats";
import { titleKey } from "./layout";
import { FIT, ORG } from "./layout-fit";

const ID = "fit";

/** Seconds between one line's start and the next, and how far into its line a piece rises. */
export const REACH = { apart: 0.3, piece: 0.45, line: 0.7 } as const;

/** The new box joining the row: its line, then its outline opening from the top as the line reaches it. */
export const JOIN = { line: 0.6, open: 0.45, opening: 0.7 } as const;

/** How far right of its place the figure starts as it steps in, and how long the step takes. */
export const STEP_IN = { from: 56, duration: 0.9 } as const;

export const fit = picture(ID, {
  play: play([
    { moves: [leave("my-work"), retitle(titleKey("my-work"), titleKey(ID))] },
    {
      with: true,
      hold: 0.4,
      moves: [
        draw(ORG.head.key, { at: 0, duration: 0.7 }),
        rise(ORG.name.key, { at: 0.45 }),
        draw(ORG.links.key, { at: 0.7, duration: 0.6 }),
        draw(keys(ORG.units), { at: 1.1, duration: 0.7, stagger: 0.15 }),
      ],
    },
    {
      hold: 0.2,
      moves: [draw(ORG.join.key, { at: 0, duration: JOIN.line }), wipe(FIT.role.key, { at: JOIN.open, duration: JOIN.opening, from: "top" })],
    },
    {
      hold: 0.1,
      moves: [
        draw(FIT.figure.key, { at: 0, duration: STEP_IN.duration }),
        to(FIT.figure.key, { x: 0 }, { x: STEP_IN.from }, { at: 0, duration: STEP_IN.duration, ease: EASE.out }),
      ],
    },
    { with: true, hold: 0.3, moves: [story(ID, 0)] },
    {
      hold: 0.8,
      moves: [
        draw(
          FIT.pieces.map((piece) => piece.line.key),
          { at: 0, duration: REACH.line, stagger: REACH.apart },
        ),
        rise(keys(FIT.pieces), { at: REACH.piece, stagger: REACH.apart }),
      ],
    },
    { with: true, hold: 1.0, moves: [story(ID, 1)] },
  ]),
});
