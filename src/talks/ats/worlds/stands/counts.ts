/**
 * How many elements carry each id that more than one does: a title's
 * lines. A move's stagger runs across all of them.
 */
import { TITLES } from "./layout";

export const COUNTS: Readonly<Record<string, number>> = Object.fromEntries(TITLES.map((title) => [title.key, title.lines.length] as const).filter(([, count]) => count > 1));
