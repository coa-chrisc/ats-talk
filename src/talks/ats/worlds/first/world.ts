/** The first world: Part 5, slides 16 to 23, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { consortium } from "./steps-consortium";
import { lanes } from "./steps-lanes";
import { levelUp } from "./steps-level-up";
import { listen } from "./steps-listen";
import { notProposing } from "./steps-not-proposing";
import { outcomes } from "./steps-outcomes";
import { programTeam } from "./steps-program-team";
import { sort } from "./steps-sort";

/** In the order shown (docs/ats-talk-script.md): 16 to 23. */
export const first: WorldDef = { id: "first", Scene, steps: [...notProposing, ...consortium, ...programTeam, ...listen, ...sort, ...lanes, ...levelUp, ...outcomes] };

export const firstEntry: WorldEntry = { title: worldTitle("first"), world: first, copy: copyFor(PICTURES) };
