/** The plan world: Part 3 from slide 13 to 15, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { lanes } from "./steps-lanes";
import { levelUp } from "./steps-level-up";
import { outcomes } from "./steps-outcomes";

/** In the order shown: 13, 14, 15. */
export const plan: WorldDef = { id: "plan", Scene, steps: [...lanes, ...levelUp, ...outcomes] };

export const planEntry: WorldEntry = { title: worldTitle("plan"), world: plan, copy: copyFor(PICTURES) };
