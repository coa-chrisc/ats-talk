/** Slide 15's picture: the grid of departments, named, its windows lit and three staff standing in it, their name and caption under it and the portfolio at the foot under them; the fenced yard, named beside it, holding three agents, a member of staff and the orange mark, the fleet's name and caption under it; the rule from the grid's edge, headed, its three closed gates each named under it. */
"use client";

import { HumanMark, Part, Person } from "@/components/deck/kit";
import { FLEET, PITCH } from "./layout-fleet";
import { Layer, Rows, StoryOf, Stroke, Words } from "./parts";
import { Agent, ClosedGate, Fence, LitWindow } from "./parts-map";

const F = FLEET;

export function FleetMarks() {
  return (
    <Part id={F.marks}>
      <g data-build={F.grid.key}>
        {F.map.cells.map((cell) => (
          <rect key={cell.n} className="sn-box" x={cell.at.x} y={cell.at.y} width={cell.at.w} height={cell.at.h} rx={F.map.rx} />
        ))}
      </g>
      <Words id={F.name.key} at={F.name.at} text={F.name.text} anchor="start" strong />
      {F.windows.map((lit) => (
        <LitWindow key={lit.key} id={lit.key} cell={lit.cell} at={lit.at} rx={F.map.rx} />
      ))}
      <g className="sn-staff">
        {F.staff.map((person) => (
          <Person key={person.key} id={person.key} at={person.at} />
        ))}
      </g>
      <Words id={F.staffWords.name.key} at={F.staffWords.name.at} text={F.staffWords.name.text} anchor="start" strong />
      <Rows id={F.staffWords.caption.key} at={F.staffWords.caption.at} rows={F.staffWords.caption.rows} pitch={PITCH} soft />
      <Fence id={F.yard.key} at={F.yard.at} />
      <Words id={F.yard.name.key} at={F.yard.name.at} text={F.yard.name.text} anchor="start" strong />
      <Rows id={F.yard.caption.key} at={F.yard.caption.at} rows={F.yard.caption.rows} pitch={PITCH} soft />
      {F.agents.map((agent) => (
        <Agent key={agent.key} id={agent.key} at={agent.at} scale={F.agentScale} />
      ))}
      <g className="sn-staff">
        <Person id={F.keeper.key} at={F.keeper.at} />
      </g>
      <HumanMark id={F.mark.key} at={F.mark.at} />
      <Words id={F.fleetWords.name.key} at={F.fleetWords.name.at} text={F.fleetWords.name.text} anchor="start" strong />
      <Rows id={F.fleetWords.caption.key} at={F.fleetWords.caption.at} rows={F.fleetWords.caption.rows} pitch={PITCH} soft />
      <Words id={F.before.key} at={F.before.at} text={F.before.text} anchor="start" strong />
      <Stroke id={F.rule.key} from={F.rule.from} to={F.rule.to} className="sn-gate-rule" />
      {F.gates.flatMap((gate) => [
        <ClosedGate key={gate.key} id={gate.key} foot={gate.foot} scale={F.gateScale} />,
        <Words key={gate.name.key} id={gate.name.key} at={gate.name.at} text={gate.name.text} strong />,
        <Rows key={gate.caption.key} id={gate.caption.key} at={gate.caption.at} rows={gate.caption.rows} pitch={PITCH} anchor="middle" soft />,
      ])}
      <Rows id={F.portfolio.key} at={F.portfolio.at} rows={F.portfolio.rows} pitch={PITCH} />
    </Part>
  );
}

export function FleetHtml() {
  return (
    <Layer id={F.html}>
      <StoryOf picture="fleet" />
    </Layer>
  );
}
