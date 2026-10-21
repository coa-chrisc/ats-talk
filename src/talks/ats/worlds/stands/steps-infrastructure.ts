/** Show the isolated environment and services, then a grouped calendar fill and partners. Text is a separate reading phase. */
import type { StepDef } from "@/components/deck/engine";
import { draw, rise, show, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { INFRASTRUCTURE } from "./layout-infrastructure";
import { into, land, play } from "./moves";

const I = INFRASTRUCTURE;

/** The tiles land this far apart. */
const TILE = 0.5;
/** The weeks fill this far apart, so 116 of them take about two seconds: quick enough to read as time passing, slow enough to see it fill in order. */
const WEEK = 0;

export const infrastructure = (): StepDef[] =>
  picture("infrastructure", {
    play: play([
      into("infrastructure"),
      // The yard: its fence draws, its name and caption come up.
      { with: true, hold: 0.45, moves: [draw(I.fence.key, { at: 0, duration: 0.9 }), rise(I.name.key, { at: 0.3, duration: 0.6 }), rise(I.caption.key, { at: 0.45, duration: 0.6 })] },
      // The three tiles land inside it in turn, with story line A.
      { hold: 0, moves: I.tiles.flatMap((tile, i) => land(tile.key, i * TILE, 0.6)) },
      { with: true, hold: 0.35, moves: [story("infrastructure", 0)] },
      // The calendar's weeks under the fence, named, then filling week by week.
      { hold: 0.6, moves: [rise(I.calendar.key, { at: 0, duration: 0.5 }), rise(I.every.key, { at: 0.15, duration: 0.6 }), show(I.calendar.weeks.key, { at: 0.4, duration: 0.25, stagger: WEEK })] },
      // The two partners settle beside it; the third wipes on apart, its caption under it; story line B.
      { hold: 0.2, moves: [...I.plates.flatMap((plate, i) => land(plate.key, i * 0.15, 0.55)), wipe(I.joining.key, { at: 0.5, duration: 0.6 }), rise(I.joining.caption.key, { at: 0.8, duration: 0.5 })] },
      { with: true, hold: 0.6, moves: [story("infrastructure", 1)] },
    ]),
  });
