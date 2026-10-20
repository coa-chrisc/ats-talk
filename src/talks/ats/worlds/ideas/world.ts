/** The ideas world: Part 3, slides 7 to 10, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { earn } from "./steps-earn";
import { enforce } from "./steps-enforce";
import { ladder } from "./steps-ladder";
import { people } from "./steps-people";

/** In the order shown (docs/ats-talk-script.md): 7, 8, 9, 10. */
export const ideas: WorldDef = { id: "ideas", Scene, steps: [...ladder, ...enforce, ...people, ...earn] };

export const ideasEntry: WorldEntry = { title: worldTitle("ideas"), world: ideas, copy: copyFor(PICTURES) };
