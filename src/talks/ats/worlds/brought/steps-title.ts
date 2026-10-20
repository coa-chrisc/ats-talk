/** Slide 1's click, on navy: the title comes up line by line, the green rule grows out under it, then the two story lines rise beneath. */
import type { StepDef } from "@/components/deck/engine";
import { EASE, lines, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { OPENING } from "./layout";
import { ARRIVE, play } from "./moves";

export const title = (): StepDef[] =>
  picture(
    "title",
    {
      play: play(
        [
          { moves: [show(OPENING.html, { at: 0, duration: 0.01 }), lines(OPENING.title.key, { at: 0, stagger: 0.14 })] },
          { with: true, hold: 0.75, moves: [to(OPENING.rule.key, { scaleX: 1 }, { scaleX: 0 }, { at: 0, duration: 0.7, ease: EASE.out })] },
          { with: true, hold: 0.5, moves: [story("title", 0)] },
          { with: true, hold: 0.7, moves: [story("title", 1)] },
        ],
        ARRIVE,
      ),
    },
    { ground: "navy" },
  );
