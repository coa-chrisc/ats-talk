/** The stand world: Part 1, slides 1 to 4a, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { exists } from "./steps-exists";
import { fleet } from "./steps-fleet";
import { position } from "./steps-position";
import { title } from "./steps-title";
import { worldMoved } from "./steps-world-moved";

/** In the order shown (docs/ats-talk-script.md): 1, 2, 3, 4, 4a. */
export const stand: WorldDef = { id: "stand", Scene, steps: [...title(), ...worldMoved(), ...position(), ...exists(), ...fleet()] };

export const standEntry: WorldEntry = { title: worldTitle("stand"), world: stand, copy: copyFor(PICTURES) };
