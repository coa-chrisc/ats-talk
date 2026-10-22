/**
 * Slide 13's click: the story lines, then the yard draws with its name and
 * caption; its tiles land one after another in reading order; the table
 * draws, its chairs come round it and a person sits in each; the nameplates
 * land in order; the table's caption comes up last. Nothing moves after.
 */
import type { StepDef } from "@/components/deck/engine";
import { draw, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { INFRASTRUCTURE } from "./layout-infrastructure";
import { into, land, play } from "./moves";

const I = INFRASTRUCTURE;
const T = I.table;

/** The tiles land this far apart; the chairs come this far apart; the plates land this far apart. */
const TILE = 0.45;
const SEAT = 0.15;
const PLATE = 0.35;

export const infrastructure = (): StepDef[] =>
  picture("infrastructure", {
    play: play([
      into("infrastructure"),
      { moves: [story("infrastructure", 0), story("infrastructure", 1)] },
      // The yard: its fence draws, its name and caption come up.
      { hold: 0.3, moves: [draw(I.fence.key, { at: 0, duration: 0.9 }), rise(I.name.key, { at: 0.3, duration: 0.6 }), rise(I.caption.key, { at: 0.45, duration: 0.6 })] },
      // The five tiles land inside it, in reading order.
      { hold: 0.2, moves: I.tiles.flatMap((tile, i) => land(tile.key, i * TILE, 0.6)) },
      // The table draws, its chairs come round it, a person sits in each.
      {
        hold: 0.4,
        moves: [
          draw(T.key, { at: 0, duration: 0.8 }),
          ...T.seats.flatMap((seat, i) => [rise(seat.key, { at: 0.3 + i * SEAT, duration: 0.5 }), show(seat.sitter, { at: 0.55 + i * SEAT, duration: 0.3 })]),
        ],
      },
      // A nameplate lands at each chair in turn.
      { hold: 0, moves: I.plates.flatMap((plate, i) => land(plate.key, i * PLATE, 0.55)) },
      // Last, the table's caption.
      { hold: 0.3, moves: [rise(I.met.key, { at: 0, duration: 0.6 })] },
    ]),
  });
