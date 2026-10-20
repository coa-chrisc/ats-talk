/** The enterprise world: Part 2, slides 3 to 6 and 4a, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { agents } from "./steps-agents";
import { fleet } from "./steps-fleet";
import { review } from "./steps-review";
import { spending } from "./steps-spending";
import { stumbled } from "./steps-stumbled";

/** In the order shown (docs/ats-talk-script.md): 3, 4, 4a, 5, 6. */
export const enterprise: WorldDef = { id: "enterprise", Scene, steps: [...spending(), ...agents(), ...review(), ...fleet(), ...stumbled()] };

export const enterpriseEntry: WorldEntry = { title: worldTitle("enterprise"), world: enterprise, copy: copyFor(PICTURES) };
