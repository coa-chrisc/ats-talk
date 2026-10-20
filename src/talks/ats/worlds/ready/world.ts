/** The ready world: Part 4, slides 16 to 20, on one plane the size of the stage, the camera never moved. The close is on navy. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { letsTalk } from "./steps-close";
import { decisions } from "./steps-decisions";
import { levels } from "./steps-levels";
import { residents } from "./steps-residents";
import { whoDecides } from "./steps-who-decides";

/** In the order shown (docs/ats-talk-script.md): 16, 17, 18, 19, 20. */
export const ready: WorldDef = { id: "ready", Scene, steps: [...levels, ...whoDecides, ...residents, ...decisions, ...letsTalk] };

export const readyEntry: WorldEntry = { title: worldTitle("ready"), world: ready, copy: copyFor(PICTURES) };
