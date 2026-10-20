/** Slide 5's picture: the leads at their desk, the board beside them split into rows, the builders over it, the keys agent in its gate over them with a line to each builder, the wall, the reviewers past it, and the person with the orange mark at the end, each group named. */
"use client";

import { Agent, Cell, HumanMark, Part, Person } from "@/components/deck/kit";
import { BUILDER_R, FLEET } from "./layout-fleet";
import { Desk, Gate, KeyRing, Layer, Outline, StoryOf, Stroke, Words } from "./parts";

const F = FLEET;
const B = F.board;
const K = F.keys;

export function FleetMarks() {
  return (
    <Part id={F.marks}>
      {F.leads.keys.map((key, i) => (
        <Agent key={key} id={key} at={F.leads.at[i]} role="planner" hue="process" />
      ))}
      <Desk id={F.leads.desk.key} x0={F.leads.desk.x0} x1={F.leads.desk.x1} y={F.leads.desk.y} legs={F.leads.desk.legs} inset={F.leads.desk.inset} />
      <Words id={F.leads.name.key} at={F.leads.name.at} text={F.leads.name.text} size="text" strong />
      <Outline id={B.key} at={B.box} className="en-board" />
      {F.splits.map((split) => (
        <Stroke key={split.key} id={split.key} from={{ x: split.x0, y: split.y }} to={{ x: split.x1, y: split.y }} className="en-split" />
      ))}
      {B.rows.flatMap((row) => row.cells.map((cell) => <Cell key={cell.key} cell={cell} holder="process" />))}
      {F.builders.keys.map((key, i) => (
        <Agent key={key} id={key} at={F.builders.at[i]} role="builder" r={BUILDER_R} hue="process" />
      ))}
      <Words id={F.builders.name.key} at={F.builders.name.at} text={F.builders.name.text} size="text" strong />
      <Gate id={K.gate.key} x0={K.gate.x0} x1={K.gate.x1} top={K.gate.top} foot={K.gate.foot} />
      <Agent id={K.key} at={K.at} role="tester" hue="process" />
      <KeyRing id={K.ring.key} at={K.ring.at} />
      {K.lines.map((line) => (
        <Stroke key={line.key} id={line.key} from={line.from} to={line.to} className="en-key-line" />
      ))}
      <Words id={K.name.key} at={K.name.at} text={K.name.text} anchor="start" size="text" strong />
      <Words id={K.caption.key} at={K.caption.at} text={K.caption.text} anchor="start" tone="soft" />
      <Stroke id={F.wall.key} from={{ x: F.wall.x, y: F.wall.y0 }} to={{ x: F.wall.x, y: F.wall.y1 }} className="en-wall" />
      <Words id={F.wall.name.key} at={F.wall.name.at} text={F.wall.name.text} strong />
      {F.reviewers.keys.map((key, i) => (
        <Agent key={key} id={key} at={F.reviewers.at[i]} role="reviewer" />
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
