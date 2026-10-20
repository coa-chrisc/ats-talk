/**
 * Slide 22's click, the world's first: the title comes up as the world
 * arrives, the figure draws in the middle, and then the five scenes come one
 * at a time, in the labels' order: for each, a thin line draws out from the
 * figure, the scene rises at its end, and its label rises under it. Line A
 * lands with the first scene, so the story starts early; line B once all
 * five are there.
 */
import { draw, lines, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { ARRIVE, play } from "./beats";
import { titleKey } from "./layout";
import { WORK } from "./layout-work";

const ID = "my-work";
const W = WORK;

/** Seconds between one scene's start and the next. */
export const SCENE_APART = 0.85;
/** Inside a scene's beat: the line draws, the scene rises at its end, then the label. */
export const SCENE_BEAT = { line: 0.6, scene: 0.35, label: 0.55 } as const;

const scene = (i: number, hold: number) => {
  const { line, key, label } = W.scenes[i];
  return {
    with: true,
    hold,
    moves: [draw(line.key, { at: 0, duration: SCENE_BEAT.line }), rise(key, { at: SCENE_BEAT.scene }), rise(label.key, { at: SCENE_BEAT.label })],
  };
};

export const myWork = picture(ID, {
  play: play(
    [
      { moves: [lines(titleKey(ID), { at: 0 })] },
      { with: true, hold: 0.7, moves: [draw(W.figure.key, { at: 0, duration: 1.0 })] },
      scene(0, 0.8),
      { with: true, hold: 0.3, moves: [story(ID, 0)] },
      scene(1, SCENE_APART - 0.3),
      scene(2, SCENE_APART),
      scene(3, SCENE_APART),
      scene(4, SCENE_APART),
      { hold: 0.3, moves: [story(ID, 1)] },
    ],
    ARRIVE,
  ),
});
