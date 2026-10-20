/**
 * The brought world's stage: Part 1, slides 1, 2 and 2a, on one plane the
 * size of the stage, never moved by a camera. Slide 1's title page is set
 * on navy in the stage's middle (scene-title.tsx); the white slides' titles
 * sit in the deck's place, and each picture is two parts, its marks and its
 * HTML. Where things go and what they say is in the layout modules, how
 * they move in the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { PICTURES, TITLE, titleOf } from "./layout";
import { CourseHtml, CourseMarks } from "./scene-course";
import { LessonsHtml, LessonsMarks } from "./scene-lessons";
import { TitleHtml } from "./scene-title";
import "./brought.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <CourseMarks />
          <LessonsMarks />
        </>
      }
    >
      <TitleHtml />
      {PICTURES.slice(1).map((picture) => {
        const title = titleOf(picture.id);
        return <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />;
      })}
      <CourseHtml />
      <LessonsHtml />
    </Plane>
  );
}
