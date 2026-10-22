/** Four complete authority bands, followed by stationary register rows with a responsible person for each agent. */
import { EASE, fill, lines, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { ARRIVE, play } from "./beats";
import { titleKey } from "./layout";
import { LEVELS } from "./layout-levels";

const L = LEVELS;

/** The bands grow one after another, each over `grow`; its name and caption come up just behind its front. */
const BANDS = { apart: 0.32, grow: 0.7, name: 0.2, caption: 0.35 } as const;
/** A register row arrives in place: its agent, its level's name and its owner appear together. */
const AGENT = { show: 0.4 } as const;
/** Seconds between one agent's start and the next: the one before has landed in its row first. */
export const AGENT_APART = 0.8;

const agent = (row: (typeof L.rows)[number], i: number) => {
  const t = i * AGENT_APART;
  return [
    ...to(row.agent.key, { autoAlpha: 1 }, { autoAlpha: 0, y: 0 }, { at: t, duration: AGENT.show, ease: EASE.soft }),
    ...rise(row.name.key, { at: t }),
    ...rise(row.plate.key, { at: t }),
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
    // Three stationary register rows, each paired with its level and owner.
    { hold: 0.3, moves: L.rows.flatMap(agent) },
    // The grey tag at the list's left, and line B.
    { hold: 0.2, moves: [rise(L.tag.key, { at: 0 })] },
    { with: true, hold: 0.25, moves: [story("levels", 1)] },
  ),
});
