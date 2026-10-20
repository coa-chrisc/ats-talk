import { WHERE_THE_CITY_STANDS } from "./part-1-where-the-city-stands";
import { WHAT_THE_COURSE_TAUGHT } from "./part-2-what-the-course-taught";
import { WHAT_WE_WOULD_DO_FIRST } from "./part-3-what-we-would-do-first";
import { WHEN_AGENTS_COME } from "./part-4-when-agents-come";
import type { Picture } from "./types";

export type { Picture, Step, WorldId } from "./types";
export { WORLDS } from "./types";

/** The four parts, by number from 1, as the script heads them: `PARTS[part - 1]` is a part's name and its length in minutes. */
export const PARTS = [
  { name: "Where the City stands", minutes: 5 },
  { name: "What the course taught", minutes: 6 },
  { name: "What we would do first", minutes: 9 },
  { name: "When agents come, and the ask", minutes: 6 },
] as const;

/** Every picture of the talk, in the order it is given. */
export const SCRIPT: Picture[] = [...WHERE_THE_CITY_STANDS, ...WHAT_THE_COURSE_TAUGHT, ...WHAT_WE_WOULD_DO_FIRST, ...WHEN_AGENTS_COME];
