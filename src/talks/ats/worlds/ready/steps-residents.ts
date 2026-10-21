/** Display slide 32: one focal stage at a time, then the question and supporting text. */
import { draw, mark, show } from "@/components/deck/kit";
import { pilotIntro, supportingText } from "../pilot-sequence";
import { picture } from "../steps";
import { into, play } from "./beats";
import { RESIDENTS as R } from "./layout-residents";

export const residents = picture("residents", {
  play: play(
    pilotIntro(into("residents")),
    { hold: 0.55, moves: [show(R.stages[0].key, { at: 0, duration: 0.5 })] },
    { hold: 1.1, moves: [draw(R.arrows[0].key, { at: 0, duration: 0.45 })] },
    { hold: 0, moves: [show(R.stages[1].key, { at: 0, duration: 0.5 }), mark(R.mark.key, { at: 0, duration: 0.5 })] },
    { hold: 1.5, moves: [draw(R.arrows[1].key, { at: 0, duration: 0.45 })] },
    { hold: 0, moves: [show(R.stages[2].key, { at: 0, duration: 0.5 })] },
    { hold: 1.5, moves: [show(R.question.key, { at: 0, duration: 0.5 })] },
    supportingText("residents"),
  ),
});
