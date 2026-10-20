/**
 * The deck's worlds, in the script's order (WORLDS in ../script/types.ts).
 */
import type { WorldEntry } from "@/components/deck/engine";
import { whoEntry } from "./who/world";
import { builtEntry } from "./built/world";
import { methodEntry } from "./method/world";
import { planEntry } from "./plan/world";
import { fitEntry } from "./fit/world";
import { backupEntry } from "./backup/world";

export const WORLD_ENTRIES: WorldEntry[] = [whoEntry, builtEntry, methodEntry, planEntry, fitEntry, backupEntry];
