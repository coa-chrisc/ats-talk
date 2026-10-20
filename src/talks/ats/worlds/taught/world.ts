/** The taught world: Part 2, slides 5 to 8, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { enforce } from "./steps-enforce";
import { incidents } from "./steps-incidents";
import { ladder } from "./steps-ladder";
import { talent } from "./steps-talent";

/** In the order shown (docs/ats-talk-script.md): 5, 6, 7, 8. */
export const taught: WorldDef = { id: "taught", Scene, steps: [...ladder, ...talent, ...enforce, ...incidents] };

export const taughtEntry: WorldEntry = { title: worldTitle("taught"), world: taught, copy: copyFor(PICTURES) };
