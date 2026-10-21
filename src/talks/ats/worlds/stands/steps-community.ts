/** Quotes remain stationary. The presenter advances separately to the shared themes. */
import type { StepDef } from "@/components/deck/engine";
import { draw, hide, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { COMMUNITY as C } from "./layout-community";
import { into, play } from "./moves";
export const community = (): StepDef[] => picture("community", {
  roll: play([
    into("community"),
    { moves: [story("community", 0)] },
    { moves: [show(C.block.key, { at: 0, duration: 0.35 }), show(C.column.key, { at: 0, duration: 0.35 }), ...C.quotes.flatMap(q => [show(q.key, { at: 0, duration: 0.35 }), draw(q.leader.key, { at: 0, duration: 0.35 })])] },
  ]),
  themes: play([
    { moves: [hide(C.block.key, { at: 0, duration: 0.35 })] },
    { hold: 0.3, moves: C.themes.flatMap((t, i) => [draw(t.rule.key, { at: i * 0.15, duration: 0.4 }), show(t.key, { at: i * 0.15, duration: 0.4 })]) },
    { moves: [story("community", 1)] },
  ]),
});
