/**
 * Slide 15's click: the title, then both story lines together, and after
 * the reading pause the picture. The grid of departments comes up with its
 * windows lighting, named; three staff draw on in it, their name and
 * caption with them; the yard's fence draws, named; inside it three agents
 * land, a member of staff draws on and the orange mark lands, the fleet's
 * name and caption with it. Then the rule draws rightward under its
 * heading, three closed gates land on it in turn, each with its name and
 * caption; nothing passes a gate. Last, the portfolio comes up at the foot.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, fill, mark, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { FLEET } from "./layout-fleet";
import { into, land, play } from "./moves";

const F = FLEET;

/** The gates land this far apart. */
const GATE = 0.6;

export const fleet = (): StepDef[] =>
  picture("fleet", {
    play: play([
      into("fleet"),
      { moves: [story("fleet", 0), story("fleet", 1)] },
      {
        moves: [
          // The map, lit, and its name.
          rise(F.grid.key, { at: 0, duration: 0.6 }),
          rise(F.name.key, { at: 0.2, duration: 0.6 }),
          ...F.windows.flatMap((lit, i) => fill(lit.key, { at: 0.2 + i * 0.06, duration: 0.45, ease: EASE.out, to: lit.lit })),
          // Three staff in it, named.
          ...F.staff.flatMap((person, i) => draw(person.key, { at: 1.1 + i * 0.1, duration: 0.6 })),
          rise(F.staffWords.name.key, { at: 1.2, duration: 0.6 }),
          rise(F.staffWords.caption.key, { at: 1.3, duration: 0.6 }),
          // The sandbox's yard, named.
          draw(F.yard.key, { at: 1.7, duration: 0.6 }),
          rise(F.yard.name.key, { at: 1.8, duration: 0.6 }),
          rise(F.yard.caption.key, { at: 1.9, duration: 0.6 }),
          // Inside it, the agents, a member of staff, and the mark: a person approves.
          ...F.agents.flatMap((agent, i) => land(agent.key, 2.3 + i * 0.12, 0.5)),
          draw(F.keeper.key, { at: 2.6, duration: 0.5 }),
          mark(F.mark.key, { at: 2.9, duration: 0.5 }),
          rise(F.fleetWords.name.key, { at: 2.95, duration: 0.6 }),
          rise(F.fleetWords.caption.key, { at: 3.05, duration: 0.6 }),
          // The rule under its heading, and the closed gates on it in turn.
          rise(F.before.key, { at: 3.2, duration: 0.5 }),
          draw(F.rule.key, { at: 3.2, duration: 0.6, ease: "none" }),
          ...F.gates.flatMap((gate, i) => [land(gate.key, 3.8 + i * GATE, 0.5), rise(gate.name.key, { at: 3.85 + i * GATE, duration: 0.5 }), rise(gate.caption.key, { at: 3.95 + i * GATE, duration: 0.5 })]),
          // The portfolio, plain, at the foot.
          rise(F.portfolio.key, { at: 5.7, duration: 0.6 }),
        ],
      },
    ]),
  });
