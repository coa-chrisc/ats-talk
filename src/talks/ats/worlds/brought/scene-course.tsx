/** Slide 2's picture: the four tiles, each with its name, the college's caption under the row, a bench under each tile and the build's caption under the benches. */
"use client";

import { Part } from "@/components/deck/kit";
import { COURSE, benchPath } from "./layout-course";
import { Bench, Caption, Layer, ModuleTile, Note, StoryOf } from "./parts";

const C = COURSE;

export function CourseMarks() {
  return (
    <Part id={C.marks}>
      {C.tiles.map((tile) => [
        <ModuleTile key={tile.key} id={tile.key} at={tile.at} />,
        <Bench key={tile.bench.key} id={tile.bench.key} d={benchPath(tile.bench.at)} />,
      ])}
      <Caption id={C.college.key} at={C.college.at} text={C.college.text} />
      <Caption id={C.build.key} at={C.build.at} text={C.build.text} />
    </Part>
  );
}

export function CourseHtml() {
  return (
    <Layer id={C.html}>
      <StoryOf picture="course" />
      {C.tiles.map((tile) => (
        <Note key={tile.name.key} id={tile.name.key} at={tile.name.at}>
          {tile.name.text}
        </Note>
      ))}
    </Layer>
  );
}
