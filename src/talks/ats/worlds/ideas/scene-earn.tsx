/** Slide 10's picture: the floor and the stair of four steps, each named, a gate on each tread; the green project box that climbs it; the two passed ticks and the first one's caption; the checklist of six rows, with neutral markers, under its heading. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { EARN, GATE } from "./layout-earn";
import { Layer, StoryOf, Words } from "./parts";
import { Floor, GateStep, ListRow, ProjectBox } from "./parts-draw";

const E = EARN;

export function EarnMarks() {
  return (
    <Part id={E.marks}>
      {E.steps.map((step) => (
        <GateStep key={step.key} id={step.key} at={step.at} gate={step.gate} name={step.name} text={step.text} size={GATE} />
      ))}
      <Floor id={E.floor.key} y={E.floor.y} x0={E.floor.x0} x1={E.floor.x1} />
      {E.ticks.map((tick) => (
        <PassTick key={tick.key} id={tick.key} at={tick.at} r={tick.r} />
      ))}
      <Words id={E.evidence.key} at={E.evidence.at} text={E.evidence.text} strong />
      <ProjectBox id={E.project.key} at={E.project.at} />
      <Words id={E.heading.key} at={E.heading.at} text={E.heading.text} anchor="start" strong />
      {E.list.map((row) => (
        <ListRow key={row.key} id={row.key} check={row.check} rule={row.rule}>
          <Words at={row.words} text={row.text} anchor="start" size="text" />
        </ListRow>
      ))}

    </Part>
  );
}

export function EarnHtml() {
  return (
    <Layer id={E.html}>
      <StoryOf picture="earn" />
    </Layer>
  );
}
