/**
 * The who world's stage: Part 1, slides 1 to 3, on one plane at HOME. The
 * white slides' titles and story bands, then each slide's own drawing
 * (scene-title.tsx, scene-career.tsx, scene-learning.tsx). Nothing here
 * moves on its own; the steps move it.
 */
"use client";

import { Plane, SetText, Story } from "@/components/deck/kit";
import { storyOf } from "../../script/find";
import { storyId } from "../steps";
import { PICTURES, TITLE, bandOf, titleOf } from "./layout";
import { CareerMarks } from "./scene-career";
import { LearningHtml } from "./scene-learning";
import { TitleHtml } from "./scene-title";
import "./who.css";

/** Slides 2 and 3: each title at the deck's place, with its story band under it. Slide 1 sets its own (scene-title.tsx). */
function Titles() {
  return PICTURES.slice(1).map((picture) => {
    const title = titleOf(picture.id);
    return [
      <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />,
      <Story key={storyId(picture.id)} id={storyId(picture.id)} band={bandOf(picture.id)} lines={storyOf(picture.id)} />,
    ];
  });
}

export function Scene() {
  return (
    <Plane marks={<CareerMarks />}>
      <TitleHtml />
      <Titles />
      <LearningHtml />
    </Plane>
  );
}
