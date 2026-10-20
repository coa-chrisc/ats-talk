/**
 * Slides 34 and 35's clicks. Slide 34 opens the catalog's home page with its
 * tag, then plays the three working sessions one after another, each with
 * the coalition's feedback after it, the last leading to the catalog live.
 * Slide 35 builds the table row by row.
 */
import { draw, fill, rise, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { CREDENTIAL_ROWS, THE_CATALOG } from "./layout-catalog";

const C = THE_CATALOG;
const R = CREDENTIAL_ROWS;

/** A session every 1.3 s: its card draws and tints, its feedback comes up beside it, and the arrow runs on to the next card. */
const SESSION_EVERY = 1.3;
const sessions = C.sessions.flatMap((session, i) => {
  const at = i * SESSION_EVERY;
  const mark = C.feedback[i];
  return [draw(session.key, { at }), fill(session.key, { at: at + 0.5, duration: 0.6 }), rise(mark.key, { at: at + 0.8 }), draw(mark.onward.key, { at: at + 1.1, duration: 0.6 })];
});

export const theCatalog = picture("the-catalog", {
  play: play(
    into("the-catalog"),
    { with: true, hold: 0.3, moves: [wipe(C.frame.key, { at: 0, from: "left" }), wipe(C.tag.key, { at: 0.6, from: "left" })] },
    { with: true, hold: 0.7, moves: [story("the-catalog", 0)] },
    { moves: [...sessions, rise(C.live.key, { at: 2 * SESSION_EVERY + 1.5 })] },
    { with: true, hold: 2 * SESSION_EVERY + 1.5, moves: [story("the-catalog", 1)] },
  ),
});

/** A row every 0.28 s: its words come up and the rule under it draws. */
const ROW_EVERY = 0.28;
const rows = (from: number, to: number) => R.rows.slice(from, to).flatMap((row, i) => [rise(row.key, { at: i * ROW_EVERY }), draw(row.rule.key, { at: i * ROW_EVERY + 0.1, duration: 0.6 })]);
/** The first seven rows are the ones the first story line names. */
const FIRST = 7;

export const credentials = picture("credentials", {
  play: play(
    into("credentials"),
    { with: true, hold: 0.3, moves: [draw(R.top.key, { at: 0, duration: 0.6 }), ...rows(0, FIRST)] },
    { with: true, hold: 2.0, moves: [story("credentials", 0)] },
    { moves: rows(FIRST, R.rows.length) },
    { with: true, hold: 0.6, moves: [story("credentials", 1)] },
  ),
});
