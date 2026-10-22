/**
 * Slide 22's click: the line and the three figures draw on in turn, each
 * one's words rising as it lands; then the developers' heading and the ring
 * draw; then the card appears at the top and rides the ring once at a steady
 * pace, each stop's words rising as the card reaches it, and stops at the top.
 * Nothing is ticked and nothing grows.
 */
import { draw, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { LEVEL_UP as U } from "./layout-level-up";
import { into, play } from "./moves";

/** One lap of the ring, in seconds, at one pace: no ease, so no stretch of it reads as faster. */
export const LAP = 3.6;
/** When the lap starts, after the card has come up at the top. */
export const LAP_START = 0.3;

export const levelUp = picture("level-up", {
  play: play(
    into("level-up"),
    { moves: [story("level-up", 0), story("level-up", 1)] },
    {
      moves: [
        draw(U.ground.key, { at: 0, duration: 0.6 }),
        ...U.roles.flatMap((role, i) => [draw(role.key, { at: 0.3 + i * 0.45, duration: 0.8 }), rise(role.words.key, { at: 0.5 + i * 0.45, duration: 0.4 })]),
      ],
    },
    { hold: 0.3, moves: [rise(U.heading.key, { at: 0, duration: 0.4 }), draw(U.ring.key, { at: 0.2, duration: 1.0 })] },
    {
      hold: 0.2,
      moves: [
        show(U.card.key, { at: 0, duration: 0.3 }),
        to(U.card.key, { "--r": 1 }, { "--r": 0 }, { at: LAP_START, duration: LAP, ease: "none" }),
        ...U.stops.map((stop) => rise(stop.key, { at: stop.arrives ? LAP_START + stop.arrives * LAP : 0, duration: 0.4 })),
      ],
    },
  ),
});
