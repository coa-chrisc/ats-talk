/** ATS-only phase policy: read one block, follow one visual explanation, then stop. */
import type { Move, PartMove } from "@/components/deck/engine/types";
import { span } from "@/components/deck/kit";

export const MAX_BUILD_SECONDS = 24;
export const TEXT_FIRST = new Set(["review", "course", "lessons", "stumbled", "ladder", "enforce", "track", "control", "exists", "noticed", "infrastructure", "fits", "fleet", "not-proposing", "consortium", "program-team", "listen", "sort", "lanes", "level-up", "budget", "levels", "who-decides", "could-be"]);
/** Brief separation between text and motion, independent of word count. */
export const TEXT_TO_VISUAL_PAUSE = 0.6;
export const textFirst = (id: string, click: string) => TEXT_FIRST.has(id) || (id === "community" && click === "roll") || id === "earn";
const part = (m: Move): m is PartMove => "key" in m;

/** Source moves already have absolute times from chain(). Preserve local causal timing and all end states. */
export function sequence(id: string, click: string, moves: Move[], counts: Readonly<Record<string, number>> = {}): Move[] {
  // These two reviewed sequences already declare their phases explicitly.
  if (["earn", "residents"].includes(id)) return moves;
  const own = moves.filter(part);
  const texts = own.filter(m => m.key.startsWith(`story.${id}.`));
  if (!texts.length) return moves;
  const title = own.filter(m => m.key === `title.${id}`).map(m => ({ ...m, duration: 0.55, stagger: 0 }));
  const diagram = own.filter(m => m.key.startsWith(`${id}.`) && m.key !== `title.${id}` && !m.key.endsWith(".html") && !m.key.endsWith(".marks") && !m.key.endsWith(".context"));
  const selected = new Set([...texts, ...own.filter(m => m.key === `title.${id}`), ...diagram]);
  const setup = moves.filter(m => !selected.has(m as PartMove));
  const titleEnd = title.length ? span(title, counts) : 0;
  const first = textFirst(id, click);
  const textAt = titleEnd + 0.45;
  const read = first ? TEXT_TO_VISUAL_PAUSE : 0;
  const start = first ? textAt + 0.35 + read : titleEnd + 0.45;
  const earliest = Math.min(...diagram.map(m => (m.at ?? 0) + (m.lag ?? 0)));
  const visual = diagram.map(m => ({ ...m, at: (m.at ?? 0) + start - earliest }));
  const after = span(visual, counts) + 0.45;
  const text = texts.map(m => ({ ...m, at: first ? textAt : after, lag: 0, duration: 0.35, stagger: 0 }));
  // The opening and closing footer stay with the final reading block.
  if (id === "lets-talk") for (const m of visual) if (m.key.endsWith(".foot")) { m.at = after; m.duration = 0.35; }
  return [...setup, ...title, ...visual, ...text];
}

/** Still time is intentional only for the declared reading phase. */
export function stillAllowance(stepId: string): number {
  const [id, click] = stepId.split(".");
  return textFirst(id, click) ? Math.max(3, TEXT_TO_VISUAL_PAUSE) + 1e-8 : 3;
}
