/**
 * Slide 14's click: the title, then both story lines together, and after
 * the reading pause the picture. The foundation first: its two headings,
 * then the four slabs rising one by one from the top, each with its name
 * and its scope. Once the stack is down, the right-hand heading; the
 * dashed grey boundary and the agent inside it. Then the four spokes draw
 * out of the agent one after another, each to its control as it comes:
 * the closed gate lands, the tool screen draws on, the member of staff
 * draws on and the orange mark lands beside them, the record draws on and
 * its lines draw in; each control's name with it. Last, the closing
 * sentence under the stack.
 */
import { draw, mark, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { FITS } from "./layout-fits";
import { into, land, play } from "./moves";

const F = FITS;

/* The timeline, in the picture's own seconds. */

const LAYERS = 0.3;
const LAYER_GAP = 0.35;
const LAYER_TIME = 0.45;
const STACKED = LAYERS + 3 * LAYER_GAP + 0.1 + LAYER_TIME;
const AGENT = STACKED + 0.15;
const SPOKES = AGENT + 0.7;
const SPOKE_GAP = 0.5;
const SPOKE_TIME = 0.3;
/** A control comes as its spoke reaches it. */
const reached = (i: number) => SPOKES + i * SPOKE_GAP + SPOKE_TIME;
const CLOSING = reached(3) + 0.75;

export const fits = () =>
  picture("fits", {
    play: play([
      into("fits"),
      { moves: [story("fits", 0), story("fits", 1)] },
      {
        moves: [
          // The foundation: its headings, then its slabs from the top, each named and scoped.
          ...F.heads.map((head, i) => rise(head.key, { at: i * 0.05, duration: 0.45 })),
          ...F.layers.flatMap((layer, i) => [
            rise(layer.key, { at: LAYERS + i * LAYER_GAP, duration: LAYER_TIME }),
            rise(layer.name.key, { at: LAYERS + i * LAYER_GAP + 0.05, duration: LAYER_TIME }),
            rise(layer.scope.key, { at: LAYERS + i * LAYER_GAP + 0.1, duration: LAYER_TIME }),
          ]),
          // The agent in its dashed boundary, the design still to define, under its heading.
          rise(F.define.key, { at: AGENT, duration: 0.45 }),
          show(F.boundary.key, { at: AGENT + 0.1, duration: 0.4 }),
          ...land(F.agent.key, AGENT + 0.2, 0.45),
          // The spokes, one by one, each to its control as it comes, named.
          ...F.spokes.map((spoke, i) => draw(spoke.key, { at: SPOKES + i * SPOKE_GAP, duration: SPOKE_TIME, ease: "none" })),
          ...land(F.gate.key, reached(0), 0.45),
          draw(F.screen.key, { at: reached(1), duration: 0.45 }),
          draw(F.approval.key, { at: reached(2), duration: 0.45 }),
          mark(F.approval.mark.key, { at: reached(2) + 0.3, duration: 0.45 }),
          draw(F.record.key, { at: reached(3), duration: 0.35 }),
          ...F.record.lines.map((line, i) => draw(line.key, { at: reached(3) + 0.2 + i * 0.1, duration: 0.25, ease: "none" })),
          ...[F.gate, F.screen, F.approval, F.record].map((control, i) => rise(control.name.key, { at: reached(i) + 0.05, duration: 0.45 })),
          // The closing sentence under the stack.
          rise(F.conclusion.key, { at: CLOSING, duration: 0.5 }),
        ],
      },
    ]),
  });
