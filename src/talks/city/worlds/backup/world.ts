/** The backup world: Part 5, slides 25 to 35, on one plane the size of the stage, the camera never moved. */
import type { WorldDef, WorldEntry } from "@/components/deck/engine";
import { copyFor, worldTitle } from "../steps";
import { PICTURES } from "./layout";
import { Scene } from "./scene";
import { credentials, theCatalog } from "./steps-catalog";
import { costs, teaching, whatExists } from "./steps-means";
import { charter, onesdlc, security } from "./steps-rules";
import { amanda, foresight, grantscope } from "./steps-tools";

/** In the order shown (docs/city-talk-script.md): 25 to 35. */
export const backup: WorldDef = {
  id: "backup",
  Scene,
  steps: [...foresight, ...grantscope, ...amanda, ...security, ...onesdlc, ...charter, ...costs, ...teaching, ...whatExists, ...theCatalog, ...credentials],
};

export const backupEntry: WorldEntry = { title: worldTitle("backup"), world: backup, copy: copyFor(PICTURES) };
