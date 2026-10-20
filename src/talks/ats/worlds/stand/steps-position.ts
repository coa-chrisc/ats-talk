/**
 * Slide 3's click: the track draws, its two edges round the lap and its
 * lanes filling with them, then its start line; the pack comes up far
 * round the lap, named; the home runner lands on the start line, named;
 * the grey tag drops over it, with story line A; after a hold the fence
 * post lands beside the runner, its tick on its cap and its name beside
 * it, with story line B; and the budget figure rises at the foot.
 */
import type { StepDef } from "@/components/deck/engine";
import { draw, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { POSITION } from "./layout-position";
import { drop, into, land, play } from "./moves";

const P = POSITION;

/** The pack's runners come up one after another, quickly: a group, not seven events. */
const PACK = 0.06;

export const position = (): StepDef[] =>
  picture("position", {
    play: play([
      into("position"),
      // The track, then its start line.
      { with: true, hold: 0.4, moves: [draw(P.track.key, { at: 0, duration: 1.3 }), draw(P.start.key, { at: 1.1, duration: 0.4 })] },
      // The pack, far round the lap, and its name.
      { hold: 0.2, moves: [...P.pack.keys.flatMap((key, i) => rise(key, { at: i * PACK, duration: 0.6 })), rise(P.pack.name.key, { at: 0.35, duration: 0.6 })] },
      // The home runner, alone at the start, and its name.
      { hold: 0.4, moves: [land(P.city.key, 0), rise(P.city.name.key, { at: 0.2, duration: 0.6 })] },
      // The grey tag drops over it.
      { hold: 0.4, moves: [drop(P.tag.key, 0)] },
      { with: true, hold: 0.3, moves: [story("position", 0)] },
      // The fence post lands beside the runner, its tick on its cap, its name beside it.
      { hold: 1.3, moves: [land(P.post.key, 0, 0.5), rise(P.post.name.key, { at: 0.25, duration: 0.6 }), show(P.post.tick.key, { at: 0.55, duration: 0.4 })] },
      { with: true, hold: 0.65, moves: [story("position", 1)] },
      // The budget figure at the foot.
      { hold: 0.4, moves: [rise(P.budget.key, { at: 0, duration: 0.75 }), rise(P.budget.caption.key, { at: 0.1, duration: 0.75 })] },
    ]),
  });
