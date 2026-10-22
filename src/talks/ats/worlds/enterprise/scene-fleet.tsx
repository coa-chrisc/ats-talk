/** Slide 5's picture: the leads at their desk, the builders in a row under the line the closed gate stands on, the checker's name and caption over it, the dividing line, the reviewers past it, and the person with the orange mark at the end, each group named. */
"use client";

import { HumanMark, Part, Person } from "@/components/deck/kit";
import { AGENT_SCALE, FLEET } from "./layout-fleet";
import { Desk, Layer, StoryOf, Stroke, Words } from "./parts";
import { ClosedGate, HexAgent } from "./parts-figures";

const F = FLEET;
const C = F.checker;

export function FleetMarks() {
  return (
    <Part id={F.marks}>
      {F.leads.keys.map((key, i) => (
        <HexAgent key={key} id={key} at={F.leads.at[i]} scale={AGENT_SCALE} />
      ))}
      <Desk id={F.leads.desk.key} x0={F.leads.desk.x0} x1={F.leads.desk.x1} y={F.leads.desk.y} legs={F.leads.desk.legs} inset={F.leads.desk.inset} />
      <Words id={F.leads.name.key} at={F.leads.name.at} text={F.leads.name.text} size="text" strong />
      <Stroke id={C.rule.key} from={{ x: C.rule.x0, y: C.rule.y }} to={{ x: C.rule.x1, y: C.rule.y }} className="en-wall" />
      <ClosedGate id={C.gate.key} foot={C.gate.foot} scale={C.gate.scale} />
      <Words id={C.name.key} at={C.name.at} text={C.name.text} size="text" strong />
      <Words id={C.caption.key} at={C.caption.at} text={C.caption.text} tone="soft" />
      {F.builders.keys.map((key, i) => (
        <HexAgent key={key} id={key} at={F.builders.at[i]} scale={AGENT_SCALE} />
      ))}
      <Words id={F.builders.name.key} at={F.builders.name.at} text={F.builders.name.text} size="text" strong />
      <Stroke id={F.wall.key} from={{ x: F.wall.x, y: F.wall.y0 }} to={{ x: F.wall.x, y: F.wall.y1 }} className="en-wall" />
      <Words id={F.wall.name.key} at={F.wall.name.at} text={F.wall.name.text} strong />
      {F.reviewers.keys.map((key, i) => (
        <HexAgent key={key} id={key} at={F.reviewers.at[i]} scale={AGENT_SCALE} />
      ))}
      <Words id={F.reviewers.name.key} at={F.reviewers.name.at} text={F.reviewers.name.text} size="text" strong />
      <Person id={F.person.key} at={F.person.at} />
      <HumanMark id={F.mark.key} at={F.mark.at} label={F.mark.text} />
    </Part>
  );
}

export function FleetHtml() {
  return (
    <Layer id={F.html}>
      <StoryOf picture="fleet-defined" />
    </Layer>
  );
}
