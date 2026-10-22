/** Slide 2's picture: the wordmark and its caption over the four module boxes, each with its name and the tick it takes when it turns green. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { COURSE, TYPE } from "./layout-course";
import { Caption, Layer, Module, StoryOf, Wordmark } from "./parts";

const C = COURSE;

export function CourseMarks() {
  return (
    <Part id={C.marks}>
      <Caption id={C.college.key} at={C.college.at} text={C.college.text} />
      {C.modules.map((mod) => [
        <Module key={mod.key} id={mod.key} turn={mod.turn.key} at={mod.at} name={mod.name} />,
        <g key={mod.tick.key} className="br-check">
          <PassTick id={mod.tick.key} at={mod.tick.at} r={TYPE.tick} />
        </g>,
      ])}
    </Part>
  );
}

export function CourseHtml() {
  return (
    <Layer id={C.html}>
      <StoryOf picture="course" />
      <Wordmark id={C.wordmark.key} at={C.wordmark.at} src={C.wordmark.src} alt={C.wordmark.alt} />
    </Layer>
  );
}
