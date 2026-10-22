/**
 * Slide 22a's click. The left side first: its words, the three developers
 * drawing on, a seat badge landing on each, the terms under them. Then the
 * right: its words, the yard's fence, the agent, the meter; each small
 * piece of work the agent sends travels into the next cell, which fills as
 * it arrives, three cells of four. The boundary wipes down between the
 * sides with its name, and last the empty table wipes on under it with its
 * words. The story lines are placed by sequence.ts, before the drawing.
 */
import type { Move } from "@/components/deck/engine/types";
import { EASE, draw, fill, hide, rise, show, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { BUDGET as B } from "./layout-budget";
import { into, play } from "./moves";

/** When the first piece of work leaves the agent, how far apart they leave, and how long each takes to reach its cell. */
const SEND = { from: 4.1, pitch: 0.75, travel: 0.45 } as const;

const sent: Move[] = B.metered.tokens.flatMap((token, i) => {
  const at = SEND.from + i * SEND.pitch;
  return [
    ...show(token.key, { at, duration: 0.15 }),
    ...to(token.key, { x: token.travel }, { x: 0 }, { at, duration: SEND.travel, ease: EASE.carry }),
    ...hide(token.key, { at: at + SEND.travel, duration: 0.15 }),
    ...fill(B.metered.cells[i].key, { at: at + SEND.travel - 0.05, duration: 0.3 }),
  ];
});

export const budget = picture("budget", {
  play: play(
    into("budget"),
    { moves: [story("budget", 0), story("budget", 1)] },
    {
      moves: [
        ...show(B.seats.name.key, { at: 0 }),
        ...show(B.seats.caption.key, { at: 0.1 }),
        ...B.seats.people.flatMap((p, i) => draw(p.key, { at: 0.2 + i * 0.15, duration: 0.6 })),
        ...B.seats.people.flatMap((p, i) => rise(p.badge.key, { at: 0.9 + i * 0.15, duration: 0.5 })),
        ...show(B.seats.included.key, { at: 1.5 }),
        ...show(B.metered.name.key, { at: 2.1 }),
        ...show(B.metered.caption.key, { at: 2.2 }),
        ...draw(B.metered.yard.key, { at: 2.3 }),
        ...rise(B.metered.agent.key, { at: 3.2, duration: 0.5 }),
        ...draw(B.metered.meter.key, { at: 3.5, duration: 0.5 }),
        ...show(B.metered.paid.key, { at: 3.7 }),
        ...sent,
        ...wipe(B.boundary.key, { at: 6.4, duration: 0.6, from: "top" }),
        ...show(B.boundary.name.key, { at: 6.5 }),
        ...wipe(B.table.key, { at: 7.1, duration: 0.7 }),
        ...show(B.table.name.key, { at: 7.4 }),
        ...show(B.table.caption.key, { at: 7.5 }),
      ],
    },
  ),
});
