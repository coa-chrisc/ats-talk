/**
 * Slide 24's click, the world's first: the title comes up as the world
 * arrives. The four bands grow across the field one under another, top to
 * bottom, each named and captioned as it grows; line A comes in with them.
 * Then three agents, one at a time: each lands in its band, drops straight
 * down into its row of the list, and its level's name and its owner's
 * nameplate come up beside it. Last, the grey tag comes up at the list's
 * left with line B.
 */
import { EASE, fill, lines, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { ARRIVE, play } from "./beats";
import { titleKey } from "./layout";
import { LEVELS } from "./layout-levels";

const L = LEVELS;

/** The bands grow one after another, each over `grow`; its name and caption come up just behind its front. */
const BANDS = { apart: 0.32, grow: 0.7, name: 0.2, caption: 0.35 } as const;
/** An agent: it shows in its band, waits there to be read, drops into its row, and its level and nameplate come up as it lands. */
const AGENT = { show: 0.4, wait: 0.35, drop: 0.6, name: 0.15, plate: 0.3 } as const;
/** Seconds between one agent's start and the next: the one before has landed in its row first. */
export const AGENT_APART = 1.4;

const agent = (row: (typeof L.rows)[number], i: number) => {
  const t = i * AGENT_APART;
  const dropAt = t + AGENT.show + AGENT.wait;
  return [
    ...to(row.agent.key, { autoAlpha: 1 }, { autoAlpha: 0, y: row.agent.drop }, { at: t, duration: AGENT.show, ease: EASE.soft }),
    ...fill(row.agent.key, { at: t, duration: AGENT.show + AGENT.wait }),
    ...to(row.agent.key, { y: 0 }, undefined, { at: dropAt, duration: AGENT.drop, ease: EASE.page }),
    ...rise(row.name.key, { at: dropAt + AGENT.drop - AGENT.name }),
    ...rise(row.plate.key, { at: dropAt + AGENT.drop + AGENT.plate - AGENT.name }),
  ];
};

export const levels = picture("levels", {
  play: play(
    { moves: [lines(titleKey("levels"), { at: ARRIVE })] },
    // The four bands grow, top to bottom, each named and captioned.
    {
      with: true,
      hold: 0.9,
      moves: L.bands.flatMap((band, i) => [
        ...fill(band.key, { at: i * BANDS.apart, duration: BANDS.grow, ease: EASE.out }),
        ...rise(band.name.key, { at: i * BANDS.apart + BANDS.name }),
        ...rise(band.caption.key, { at: i * BANDS.apart + BANDS.caption }),
      ]),
    },
    { with: true, hold: 0.9, moves: [story("levels", 0)] },
    // Three agents, each put in a level and dropped into the list with its owner.
    { hold: 0.3, moves: L.rows.flatMap(agent) },
    // The grey tag at the list's left, and line B.
    { hold: 0.2, moves: [rise(L.tag.key, { at: 0 })] },
    { with: true, hold: 0.25, moves: [story("levels", 1)] },
  ),
});
