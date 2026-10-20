/** The stands world: Part 4, slides 11 to 15, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { control } from "./steps-control";
import { exists } from "./steps-exists";
import { fits } from "./steps-fits";
import { fleet } from "./steps-fleet";
import { infrastructure } from "./steps-infrastructure";
import { noticed } from "./steps-noticed";
import { track } from "./steps-track";

/** In the order shown (docs/ats-talk-script.md): 11, 11a, 12, 12a, 13, 14, 15. */
export const stands: WorldDef = { id: "stands", Scene, steps: [...track(), ...control(), ...exists(), ...noticed(), ...infrastructure(), ...fits(), ...fleet()] };

export const standsEntry: WorldEntry = { title: worldTitle("stands"), world: stands, copy: copyFor(PICTURES) };
