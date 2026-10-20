/**
 * Slide 12b's two clicks. Click one, `roll`: the column of names rises
 * through its window at one steady pace, like film credits, and settles;
 * each quote slides in from the right to its place as its department comes
 * fully into view, story line A with the first; once the column has
 * settled each leader draws from its name to its quote. Click two,
 * `themes`: the column, the quotes and the leaders step back; the three
 * theme rows come one after another, each band up, its rule drawing across
 * the band and its words rising over it, story line B with the first.
 */
import type { StepDef } from "@/components/deck/engine";
import { dim, draw, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { COLUMN, COMMUNITY, ROLL } from "./layout-community";
import { DRAW_FOOT } from "./layout";
import { into, play, slideIn } from "./moves";

const C = COMMUNITY;

/** The roll starts this long into the click, as the title comes up. */
const START = 0.5;
/** A quote slides in once its name has risen 32 px clear of the window's foot. */
const CLEAR = DRAW_FOOT - 32;
/** When a name, at its place's height `y`, is `CLEAR` high on its way up: the column moves at one pace. */
const reaches = (y: number) => ROLL.seconds * (1 - (CLEAR - y) / ROLL.from);
export const QUOTE_AT = C.quotes.map((quote) => START + reaches(COLUMN.top + quote.owner * COLUMN.pitch));
/** The leaders draw one after another once the column has settled. */
const LEADER = 0.15;
/** Each theme row this long after the last. */
const THEME = 0.9;
/** A theme row: its band comes up, its rule draws across, its words rise over it. */
const themeRow = (theme: (typeof C.themes)[number]) => [show(theme.band.key, { at: 0, duration: 0.3 }), draw(theme.rule.key, { at: 0.1, duration: 0.8 }), rise(theme.key, { at: 0.3, duration: 0.6 })];

export const community = (): StepDef[] =>
  picture("community", {
    roll: play([
      into("community"),
      {
        with: true,
        hold: 0,
        moves: [
          show(C.column.key, { at: START, duration: 0.2 }),
          to(C.column.key, { y: 0 }, { y: ROLL.from }, { at: START, duration: ROLL.seconds, ease: "none" }),
          ...C.quotes.flatMap((quote, i) => slideIn(quote.key, 64, { at: QUOTE_AT[i] })),
          ...C.quotes.flatMap((quote, i) => draw(quote.leader.key, { at: START + ROLL.seconds + 0.1 + i * LEADER, duration: 0.45 })),
        ],
      },
      { with: true, hold: QUOTE_AT[0] + 0.3, moves: [story("community", 0)] },
    ]),
    themes: play([
      { moves: [dim([C.column.key, ...C.quotes.flatMap((quote) => [quote.key, quote.leader.key])], { at: 0, stagger: 0 })] },
      { with: true, hold: 0.3, moves: themeRow(C.themes[0]) },
      { with: true, hold: 0.4, moves: [story("community", 1)] },
      { with: true, hold: THEME - 0.4, moves: themeRow(C.themes[1]) },
      { with: true, hold: THEME, moves: themeRow(C.themes[2]) },
    ]),
  });
