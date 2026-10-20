/**
 * The City talk: one world for each run of the script drawn as one picture
 * (WORLDS in script/types.ts), listed in worlds/index.ts as they are built.
 * A step's address, its name and its speaker note all come from the script
 * (script/). Only the frame (the Austin Public Health logo, footer and slide
 * number) persists across worlds: the deck has no persistent layer and no
 * backdrop, so the ground is the kit's plain one (docs/bchc-brand.md).
 */
import type { DeckDef } from "@/components/deck/engine";
import { withBase } from "@/lib/base-path";
import { Frame } from "./frame";
import { WORLD_ENTRIES } from "./worlds";

export const deck: DeckDef = {
  id: "city",
  title: "Building with AI at the City of Austin",
  notesPath: withBase("/notes/"),
  Frame,
  worlds: WORLD_ENTRIES,
};
