/**
 * The deck's worlds, in the script's order (WORLDS in ../script/types.ts).
 */
import type { WorldEntry } from "@/components/deck/engine";
import { standEntry } from "./stand/world";
import { taughtEntry } from "./taught/world";
import { methodEntry } from "./method/world";
import { planEntry } from "./plan/world";
import { readyEntry } from "./ready/world";

export const WORLD_ENTRIES: WorldEntry[] = [standEntry, taughtEntry, methodEntry, planEntry, readyEntry];
