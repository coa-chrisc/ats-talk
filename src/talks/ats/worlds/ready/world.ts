/** The ready world: Part 6, slides 24 to 29, on one plane the size of the stage, the camera never moved. The close is on navy. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { letsTalk } from "./steps-close";
import { applied } from "./steps-applied";
import { couldBe } from "./steps-could-be";
import { levels } from "./steps-levels";
import { residents } from "./steps-residents";
import { whoDecides } from "./steps-who-decides";

/** In the order shown (docs/ats-talk-script.md): 24, 25, 26, 27, 28, 29. */
export const ready: WorldDef = { id: "ready", Scene, steps: [...levels, ...whoDecides, ...residents, ...couldBe, ...applied, ...letsTalk] };

export const readyEntry: WorldEntry = { title: worldTitle("ready"), world: ready, copy: copyFor(PICTURES) };
