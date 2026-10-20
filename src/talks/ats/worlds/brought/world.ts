/** The brought world: Part 1, slides 1, 2 and 2a, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { course } from "./steps-course";
import { lessons } from "./steps-lessons";
import { title } from "./steps-title";

/** In the order shown (docs/ats-talk-script.md): 1, 2, 2a. */
export const brought: WorldDef = { id: "brought", Scene, steps: [...title(), ...course(), ...lessons()] };

export const broughtEntry: WorldEntry = { title: worldTitle("brought"), world: brought, copy: copyFor(PICTURES) };
