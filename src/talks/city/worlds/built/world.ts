/** The built world: Part 2 of the talk, what Austin Public Health built (slides 4 to 12a). */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { aiBuilds, setup } from "./steps-builds";
import { radBorn } from "./steps-rad-born";
import { radEvolves } from "./steps-rad-evolves";
import { portfolio, recognition, seen } from "./steps-proof";
import { controls, safe } from "./steps-safe";
import { startingSmall } from "./steps-start";
import { tooLong } from "./steps-too-long";
import { twoToTwenty, wrongQuestion } from "./steps-turn";
import { weekly } from "./steps-weekly";

export const built: WorldDef = {
  id: "built",
  Scene,
  steps: [...startingSmall, ...safe, ...weekly, ...wrongQuestion, ...twoToTwenty, ...radBorn, ...aiBuilds, ...setup, ...tooLong, ...radEvolves, ...portfolio, ...seen, ...recognition, ...controls],
};

export const builtEntry: WorldEntry = { title: worldTitle("built"), world: built, copy: copyFor(PICTURES) };
