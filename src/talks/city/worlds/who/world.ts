/** The who world: Part 1 of the talk, who is speaking (slides 1 to 3). */
import type { WorldEntry } from "@/components/deck/engine";
import { copyFor, picturesOf, worldTitle } from "../steps";
import { Scene } from "./scene";
import { stepsOfWho } from "./steps-who";

export const whoEntry: WorldEntry = {
  title: worldTitle("who"),
  world: { id: "who", Scene, steps: stepsOfWho() },
  copy: copyFor(picturesOf("who")),
};
