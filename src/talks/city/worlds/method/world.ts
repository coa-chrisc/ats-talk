/** The method world: Part 3, slides 13 to 17, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { goodIdeas } from "./steps-good-ideas";
import { listen } from "./steps-listen";
import { plainTool } from "./steps-plain-tool";
import { sort } from "./steps-sort";
import { underneath } from "./steps-underneath";

/** In the order shown (docs/city-talk-script.md): 13, 14, 15, 16, 17. */
export const method: WorldDef = { id: "method", Scene, steps: [...goodIdeas, ...listen, ...underneath, ...sort, ...plainTool] };

export const methodEntry: WorldEntry = { title: worldTitle("method"), world: method, copy: copyFor(PICTURES) };
