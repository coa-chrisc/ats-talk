import { WHAT_WE_BROUGHT_BACK } from "./part-1-what-we-brought-back";
import { WHERE_ENTERPRISE_IS } from "./part-2-where-enterprise-is";
import { THE_FOUR_LESSONS } from "./part-3-the-four-lessons";
import { WHERE_THE_CITY_STANDS } from "./part-4-where-the-city-stands";
import { WHAT_WE_WOULD_DO_FIRST } from "./part-5-what-we-would-do-first";
import { READY_THE_ASK_THE_REVEAL } from "./part-6-ready-the-ask-the-reveal";
import type { Picture } from "./types";

export type { Picture, Step, WorldId } from "./types";
export { WORLDS } from "./types";

/** The six parts, by number from 1, as the script heads them: `PARTS[part - 1]` is a part's name and its length in minutes. */
export const PARTS = [
  { name: "What we brought back", minutes: 3 },
  { name: "Where enterprise is", minutes: 6 },
  { name: "The four lessons", minutes: 5 },
  { name: "Where the City stands", minutes: 9 },
  { name: "What we would do first", minutes: 9 },
  { name: "Ready, the ask, the reveal", minutes: 5 },
] as const;

/** Every picture of the talk, in the order it is given. */
export const SCRIPT: Picture[] = [...WHAT_WE_BROUGHT_BACK, ...WHERE_ENTERPRISE_IS, ...THE_FOUR_LESSONS, ...WHERE_THE_CITY_STANDS, ...WHAT_WE_WOULD_DO_FIRST, ...READY_THE_ASK_THE_REVEAL];
