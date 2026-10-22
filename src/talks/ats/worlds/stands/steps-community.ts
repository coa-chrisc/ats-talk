/** Slide 12b's two clicks. The chips come up left to right, then the cards one after another in reading order, each where it stays; the presenter advances separately to the shared themes, as the chips and cards fade where they are. */
import type { StepDef } from "@/components/deck/engine";
import { draw, hide, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { COMMUNITY as C } from "./layout-community";
import { into, play } from "./moves";

/** The chips' fade and the gap between one chip's start and the next's; the cards' fade, and theirs. */
const CHIPS = { duration: 0.4, stagger: 0.06 } as const;
const CARDS = { duration: 0.5, stagger: 0.25 } as const;

export const community = (): StepDef[] => picture("community", {
  roll: play([
    into("community"),
    { moves: [story("community", 0)] },
    { moves: [show(C.block.key, { at: 0, duration: 0.35 }), show(C.chips.map((chip) => chip.key), { at: 0, ...CHIPS })] },
    { hold: 0.2, moves: [show(C.cards.map((card) => card.key), { at: 0, ...CARDS })] },
  ]),
  themes: play([
    { moves: [hide(C.block.key, { at: 0, duration: 0.35 })] },
    { hold: 0.3, moves: C.themes.flatMap((t, i) => [draw(t.rule.key, { at: i * 0.15, duration: 0.4 }), show(t.key, { at: i * 0.15, duration: 0.4 })]) },
    { moves: [story("community", 1)] },
  ]),
});
