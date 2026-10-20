/**
 * The deck's worlds, in the script's order (WORLDS in ../script/types.ts).
 */
import type { WorldEntry } from "@/components/deck/engine";
import { broughtEntry } from "./brought/world";
import { enterpriseEntry } from "./enterprise/world";
import { ideasEntry } from "./ideas/world";
import { standsEntry } from "./stands/world";
import { firstEntry } from "./first/world";
import { readyEntry } from "./ready/world";

export const WORLD_ENTRIES: WorldEntry[] = [broughtEntry, enterpriseEntry, ideasEntry, standsEntry, firstEntry, readyEntry];
