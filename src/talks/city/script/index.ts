import { WHO_I_AM } from "./part-1-who-i-am";
import { WHAT_WE_BUILT } from "./part-2-what-austin-public-health-built";
import { AN_AI_STRATEGY } from "./part-3-an-ai-strategy-for-the-city";
import { WHERE_I_FIT } from "./part-4-where-i-fit";
import { BACKUP_SLIDES } from "./part-5-backup-slides";
import type { Picture } from "./types";

export type { Picture, Step, WorldId } from "./types";
export { WORLDS } from "./types";

/** The five parts, by number from 1, as the script heads them: `PARTS[part - 1]` is a part's name and its length in minutes. */
export const PARTS = [
  { name: "Who I am", minutes: 3 },
  { name: "What Austin Public Health built", minutes: 10 },
  { name: "An AI strategy for the City", minutes: 13 },
  { name: "Where I fit", minutes: 5 },
  { name: "Backup slides", minutes: 30 },
] as const;

/** Every picture of the talk, in the order it is given. */
export const SCRIPT: Picture[] = [...WHO_I_AM, ...WHAT_WE_BUILT, ...AN_AI_STRATEGY, ...WHERE_I_FIT, ...BACKUP_SLIDES];
