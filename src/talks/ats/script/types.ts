/**
 * The talk's worlds, in the order the deck gives them: one for each part,
 * but Part 3, which turns at slide 13 from the method (`method`, slides 9
 * to 12) to the plan (`plan`, slides 13 to 15).
 */
export const WORLDS = ["stand", "taught", "method", "plan", "ready"] as const;
export type WorldId = (typeof WORLDS)[number];

/**
 * One click. A click brings a whole picture, its beats chaining on their
 * own, so a picture has one step, `play`, unless the script marks the slide
 * "(two clicks)" (none does yet). `id` is the step's id; with its picture's
 * id it is the step's address (`picture.step`). `show` is every label the
 * click puts on the stage besides the picture's title and its story lines,
 * in the order they arrive: each phrase its They see quotes, once, in the
 * order the script first quotes it. Scenes take their words from here
 * (`shown()`), never from a literal.
 */
export type Step = { id: string; show: string[] };

/**
 * One slide of the script (docs/ats-talk-script.md), word for word. `show`
 * is its On screen line, `say` its You say, and `see` its They see: one
 * entry for the paragraph, then one per item of a list under it. `number`
 * is the script's own ("1", "6a"), and `name` its heading. `story` is the
 * slide's story lines, zero to two, so the deck reads without a speaker:
 * the script's bullets under its On screen line, word for word. `steps` are
 * the clicks, in order.
 */
export type Picture = { id: string; number: string; part: number; world: WorldId; name: string; show: string; say: string; see: string[]; story: string[]; steps: Step[] };
