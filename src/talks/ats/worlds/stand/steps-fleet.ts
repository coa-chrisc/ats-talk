/**
 * Slide 4a's click: the fence draws round the yard, named; the outline of
 * the application comes up and the lead agents land and fill it block by
 * block, with story line A; the reviewers land and check it, its frame
 * drawing round it; the person stands and gives it the orange mark; the two
 * nameplates settle under the yard and the dashed third wipes on apart,
 * with story line B; the stair draws at the right, its first three gates
 * lighting green in turn and the top one staying grey, its tag dropping
 * over it; and the tag drops under the fence's left foot.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, fill, mark, rise, show, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { FLEET } from "./layout-fleet";
import { drop, into, land, play } from "./moves";

const F = FLEET;
const S = F.stair;

/** The blocks go in one after another, each a little after the last, as three agents work at once. */
const BLOCK = 0.16;
/** Each lit gate a little after the one below. */
const GATE = 0.4;

export const fleet = (): StepDef[] =>
  picture("fleet", {
    play: play([
      into("fleet"),
      // The yard: its fence draws, its name and caption come up.
      { with: true, hold: 0.35, moves: [draw(F.fence.key, { at: 0, duration: 0.9 }), rise(F.name.key, { at: 0.3, duration: 0.6 }), rise(F.built.key, { at: 0.45, duration: 0.6 })] },
      // The leads land, the outline comes up, and they fill it.
      {
        hold: 0.1,
        moves: [
          ...F.leads.keys.flatMap((key, i) => land(key, i * 0.08, 0.5)),
          rise(F.leads.name.key, { at: 0.2, duration: 0.5 }),
          show(F.app.key, { at: 0.2, duration: 0.4 }),
          ...F.leads.keys.flatMap((key, i) => fill(key, { at: 0.45 + i * 0.08, duration: 0.5 })),
          ...F.app.slots.flatMap((slot, i) => fill(slot.key, { at: 0.7 + i * BLOCK, duration: 0.4, ease: EASE.out })),
        ],
      },
      { with: true, hold: 0.9, moves: [story("fleet", 0)] },
      // The reviewers land and check it.
      {
        hold: 0.1,
        moves: [
          ...F.reviewers.keys.flatMap((key, i) => [land(key, i * 0.08, 0.5), fill(key, { at: 0.2 + i * 0.08, duration: 0.45 })]),
          rise(F.reviewers.name.key, { at: 0.15, duration: 0.5 }), draw(F.checked.key, { at: 0.45, duration: 0.6 }),
        ],
      },
      // The person approves it.
      { hold: 0.05, moves: [draw(F.person.key, { at: 0, duration: 0.5 }), mark(F.mark.key, { at: 0.35, duration: 0.7 })] },
      // The two partners settle side by side; the third wipes on apart, with its caption.
      {
        hold: 0.2,
        moves: [
          ...F.plates.flatMap((plate, i) => land(plate.key, i * 0.15, 0.55)),
          wipe(F.joining.key, { at: 0.45, duration: 0.6 }),
          rise(F.joining.caption.key, { at: 0.75, duration: 0.5 }),
        ],
      },
      { with: true, hold: 0.6, moves: [story("fleet", 1)] },
      // The stair: its floor and steps come up; the first three gates light in turn, and the grey tag drops over the top.
      {
        hold: 0.1,
        moves: [
          draw(S.floor.key, { at: 0, duration: 0.4 }),
          ...S.steps.flatMap((entry, i) => rise(entry.key, { at: 0.1 + i * 0.08, duration: 0.5 })),
          ...S.steps.filter((entry) => entry.lit).flatMap((entry, i) => fill(entry.key, { at: 0.75 + i * GATE, duration: 0.45, ease: EASE.out })),
          drop(S.tag.key, 0.75 + 3 * GATE + 0.1, 0.5),
        ],
      },
      // The tag under the fence's left foot.
      { hold: 0.1, moves: [drop(F.overYears.key, 0, 0.5)] },
    ]),
  });
