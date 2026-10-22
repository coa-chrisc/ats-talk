/** Build complete groups left to right; never return to an earlier group. */
import type { StepDef } from "@/components/deck/engine";
import { draw, mark, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { FLEET as F } from "./layout-fleet";
import { into, land, play } from "./moves";

const C = F.checker;

export const fleet = (): StepDef[] =>
  picture("fleet-defined", {
    play: play([
      into("fleet-defined"),
      {
        moves: [
          // Planning is the first complete group on the left.
          draw(F.leads.desk.key, { at: 0, duration: 0.45 }),
          show(F.leads.keys, { at: 0, duration: 0.45, stagger: 0 }),
          show(F.leads.name.key, { at: 0, duration: 0.45 }),
          // The builders and the gate over them, with its words, appear as one middle group.
          draw(C.rule.key, { at: 1, duration: 0.5 }),
          land(C.gate.key, 1, 0.5),
          show([C.name.key, C.caption.key], { at: 1, duration: 0.5, stagger: 0 }),
          show(F.builders.keys, { at: 1, duration: 0.5, stagger: 0 }),
          show(F.builders.name.key, { at: 1, duration: 0.5 }),
          // Continue right, without sending attention back to the builders.
          draw(F.wall.key, { at: 2.1, duration: 0.45 }),
          show(F.wall.name.key, { at: 2.1, duration: 0.45 }),
          show(F.reviewers.keys, { at: 2.8, duration: 0.45, stagger: 0 }),
          show(F.reviewers.name.key, { at: 2.8, duration: 0.45 }),
          draw(F.person.key, { at: 3.7, duration: 0.5 }),
          mark(F.mark.key, { at: 3.7, duration: 0.5 }),
          story("fleet-defined", 0),
          story("fleet-defined", 1),
        ],
      },
    ]),
  });
