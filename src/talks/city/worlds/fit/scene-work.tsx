/** Slide 22's picture: the figure, the five small scenes round it, their labels, and the lines that join them to it. */
"use client";

import { Part, Person, Story } from "@/components/deck/kit";
import { STORIES, groupOf } from "./layout";
import { SCENE, WORK } from "./layout-work";
import { Group, SmallScene, Words } from "./parts";

const ID = "my-work";
const W = WORK;

export function WorkMarks() {
  return (
    <Part id={groupOf(ID).marks}>
      {W.scenes.map((scene) => (
        <path key={scene.line.key} className="fit-link dk-draw" data-build={scene.line.key} d={`M${scene.line.from.x} ${scene.line.from.y}L${scene.line.to.x} ${scene.line.to.y}`} pathLength={1} />
      ))}
      <Person id={W.figure.key} at={W.figure.at} />
      {W.scenes.map((scene) => (
        <SmallScene key={scene.key} id={scene.key} kind={scene.kind} at={scene.at} />
      ))}
      {W.scenes.map(({ label }) => (
        <Words key={label.key} id={label.key} at={{ x: label.at.x + label.at.w / 2, y: label.at.y + SCENE.labelH / 2 }} text={label.text} />
      ))}
    </Part>
  );
}

export function WorkHtml() {
  const band = STORIES.find((entry) => entry.picture === ID)!;
  return (
    <Group id={groupOf(ID).html}>
      <Story id={band.id} band={band.band} lines={band.lines} />
    </Group>
  );
}
