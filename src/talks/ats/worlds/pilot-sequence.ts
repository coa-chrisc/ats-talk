/** Helpers for the three explicitly choreographed pilots. Other slides use sequence.ts. */
import { type ChainBeat } from "@/components/deck/kit";
export { TEXT_TO_VISUAL_PAUSE } from "./sequence";
import { story } from "./steps";

export const PILOT_IDS = ["earn", "outcomes", "residents"] as const;
export const PILOT_MAX_SECONDS = 24;

/** Keep the outgoing slide's cleanup, but bring the new title in as one short block. */
export function pilotIntro(beat: ChainBeat): ChainBeat {
  return { ...beat, moves: beat.moves.flat().map(move =>
    "key" in move && move.key.startsWith("title.") && move.on.yPercent === 0
      ? { ...move, duration: 0.55, stagger: 0 }
      : move) };
}

/** Both supporting sentences arrive together and stay fixed for the rest of the slide. */
export function supportingText(id: string): ChainBeat {
  return { hold: 0.45, moves: [story(id, 0, { at: 0, duration: 0.35, stagger: 0 }), story(id, 1, { at: 0, duration: 0.35, stagger: 0 })] };
}

