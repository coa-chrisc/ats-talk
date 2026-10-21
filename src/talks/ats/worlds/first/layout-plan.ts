/**
 * What the plan's three slides (21 to 23: layout-lanes.ts,
 * layout-level-up.ts, layout-outcomes.ts) share beyond layout.ts. They keep
 * 40 px of room under their story band and over the frame's foot, wider
 * than the first five slides' 20, and size their words a little more
 * generously. Colour follows docs/aph-brand-reference.md and the script's
 * colour cues (first-plan.css): green for the City's own work, indigo for
 * the course's evidence, grey for what is left behind.
 */
import { STORY, box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, bandFoot, layerOf } from "./layout";

export { LABEL_LINE,bandFoot,centreOf,labelsOf,round,titleKey } from "./layout";

/** The room a drawing keeps from the story band's last line above it and from the frame's foot below it, so neither reads as part of it. */
export const ROOM = 40;
/** The frame's safe area ends at 1016, its footer under it (frame.css). */
const FRAME_FOOT = 1016;
/** The story band's left and right edges, and the lowest line a drawing may reach. */
export const SAFE = { left: STORY.x, right: STORY.x + STORY.w, bottom: FRAME_FOOT - ROOM } as const;

/** Where one of these slides' drawing may start: the room's width under its story band (556 under each slide's two-line title). */
export const contentTop = (pictureId: string) => bandFoot(pictureId) + ROOM;

/** A picture's two parts: its marks (one SVG group) and its HTML (one layer, its story lines in it). */
export const groupOf = layerOf;

/* Sizes these slides use */

/**
 * Roughly how wide a run of words is at a size. Measured in Geist, a 26 px
 * label runs 0.47 to 0.61 of its size a letter ("Government" at 600 is the
 * widest); 0.62 keeps every box built from it wide enough. Nothing is
 * measured in the browser.
 */
export const wordsWidth = (text: string, size = 26) => Math.ceil(text.length * size * 0.62);

/** A label's box, centred on its point up and down as `Label` sets it, and placed across by its anchor. */
export const labelBox = (at: Point, text: string, anchor: "start" | "middle" | "end" = "middle", size = 26, line = LABEL_LINE): Box => {
  const w = wordsWidth(text, size);
  const x = anchor === "start" ? at.x : anchor === "end" ? at.x - w : at.x - w / 2;
  return box(Math.round(x), at.y - line / 2, w, line);
};

/** The kit's person at scale 1. */
export const PERSON = { w: 48, h: 64 } as const;

/** A tag: a label in a box with a pointed end. Its height, the point's depth, and the room before and after the words. */
export const TAG = { h: 44, point: 16, pad: 18 } as const;
/** A tag's width for its words: the point, the words, room either side. */
export const tagWidth = (text: string) => TAG.point + 2 * TAG.pad + wordsWidth(text);
