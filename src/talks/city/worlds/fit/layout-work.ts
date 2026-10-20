/**
 * Slide 22's picture: one figure low in the middle of the field, and five
 * small scenes on an arc round it and above it, each with its label under
 * it and a thin line from the figure to it. The scenes are, in the order
 * they come and the order of the step's labels: a chart, an application's
 * window, a table with people round it, a classroom and a map of cities.
 * Every place is a literal number on the stage; the lines are worked out
 * from them, each leaving the figure and stopping short of its scene on the
 * line between their middles.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { centreOf, edgePoint, grow } from "./layout";

const ID = "my-work";

/** What each scene draws (parts.tsx `SceneDrawing`). */
export type SceneKind = "chart" | "window" | "table" | "class" | "map";
const KINDS: readonly SceneKind[] = ["chart", "window", "table", "class", "map"];

/** The five labels, in the step's order: one for each scene. */
const LABELS = shown(ID, "play");

/** A scene's drawing, and its label's row under it: 26 px type on a 32 px line, 10 below the drawing. */
export const SCENE = { w: 176, h: 104, labelGap: 10, labelH: 32, labelW: 330 } as const;

/** The figure: a person, low in the middle, so the arc of scenes stands over and round it; its feet just over the floor (layout.ts, y 994). */
const FIGURE = box(920, 872, 80, 120);

/**
 * Each scene's middle, on an arc over the figure: the outer two level with
 * the figure's head, the next two higher, the middle one highest, straight
 * over it, its top on the content line (y 630). Neighbours' labels sit on
 * different rows, so the long ones never meet.
 */
const MIDDLES: readonly Point[] = [
  { x: 338, y: 860 },
  { x: 594, y: 722 },
  { x: 960, y: 682 },
  { x: 1326, y: 722 },
  { x: 1582, y: 860 },
];

/** How far a line stops short of the figure and of a scene. */
const CLEAR = { figure: 16, scene: 14 } as const;

const sceneBox = (middle: Point): Box => box(middle.x - SCENE.w / 2, middle.y - SCENE.h / 2, SCENE.w, SCENE.h);
const labelBox = (drawing: Box): Box => box(drawing.x + (drawing.w - SCENE.labelW) / 2, drawing.y + drawing.h + SCENE.labelGap, SCENE.labelW, SCENE.labelH);

/**
 * About how wide a label's words are set: 26 px Geist at weight 500 runs
 * under 15 px a character, so this errs wide. The words are centred in
 * their row, which is wider than any of them.
 */
const wordsWide = (text: string) => Math.ceil(text.length * 15);

/** What a line from the figure must stop short of: the drawing, and the label's words under it. */
const footprint = (drawing: Box, label: Box, text: string): Box => {
  const w = Math.max(drawing.w, wordsWide(text));
  return box(drawing.x + (drawing.w - w) / 2, drawing.y, w, label.y + label.h - drawing.y);
};

export const WORK = {
  figure: { key: `${ID}.figure`, at: FIGURE },
  scenes: MIDDLES.map((middle, i) => {
    const at = sceneBox(middle);
    const label = labelBox(at);
    const near = footprint(at, label, LABELS[i]);
    const from = edgePoint(centreOf(FIGURE), centreOf(near), grow(FIGURE, CLEAR.figure));
    const to = edgePoint(centreOf(near), centreOf(FIGURE), grow(near, CLEAR.scene));
    return {
      key: `${ID}.scene.${i}`,
      kind: KINDS[i],
      at,
      label: { key: `${ID}.label.${i}`, text: LABELS[i], at: label },
      line: { key: `${ID}.line.${i}`, from, to },
    };
  }),
} as const;
