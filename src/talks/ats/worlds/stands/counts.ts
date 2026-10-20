/**
 * How many elements carry each id that more than one does: a title's
 * lines, and slide 13's weeks, which fill one after another under one id.
 * A move's stagger runs across all of them.
 */
import { TITLES } from "./layout";
import { INFRASTRUCTURE } from "./layout-infrastructure";

export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(
  [...TITLES.map((title) => [title.key, title.lines.length] as const), [INFRASTRUCTURE.calendar.weeks.key, INFRASTRUCTURE.calendar.weeks.at.length] as const].filter(([, count]) => count > 1),
);
