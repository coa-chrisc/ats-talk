/** The plan world: Part 3 from slide 18 to 21a, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { northStar, people } from "./steps-goals";
import { knowledge } from "./steps-knowledge";
import { liftDevelopers } from "./steps-lift-developers";
import { programTeam } from "./steps-program-team";
import { built, readiness } from "./steps-readiness";
import { residents } from "./steps-residents";
import { roadmap } from "./steps-roadmap";

/** In the order shown: 18, 19, 19a, 19b, 20, 20a, 20b, 21, 21a. */
export const plan: WorldDef = { id: "plan", Scene, steps: [...northStar, ...people, ...programTeam, ...liftDevelopers, ...roadmap, ...knowledge, ...readiness, ...built, ...residents] };

export const planEntry: WorldEntry = { title: worldTitle("plan"), world: plan, copy: copyFor(PICTURES) };
