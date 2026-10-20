/** The fit world: Part 4, slides 22 to 24, on one plane the size of the stage, the camera never moved. The close is on navy. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { letsTalk } from "./steps-close";
import { fit } from "./steps-fit";
import { myWork } from "./steps-work";

/** In the order shown (docs/city-talk-script.md): 22, 23, 24. */
export const fitWorld: WorldDef = { id: "fit", Scene, steps: [...myWork, ...fit, ...letsTalk] };

export const fitEntry: WorldEntry = { title: worldTitle("fit"), world: fitWorld, copy: copyFor(PICTURES) };
