/** The method world: Part 3's first run, slides 9 to 12, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { listen } from "./steps-listen";
import { notProposing } from "./steps-not-proposing";
import { people } from "./steps-people";
import { sort } from "./steps-sort";

/** In the order shown (docs/ats-talk-script.md): 9, 10, 11, 12. */
export const method: WorldDef = { id: "method", Scene, steps: [...notProposing, ...people, ...listen, ...sort] };

export const methodEntry: WorldEntry = { title: worldTitle("method"), world: method, copy: copyFor(PICTURES) };
