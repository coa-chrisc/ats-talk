/** Slide 14's picture: on the left the foundation, four slabs stacked under their two headings, each named and scoped, the closing sentence under them; on the right, under its heading, the agent inside its dashed grey boundary, and the four spokes out of it to the closed gate, the tool screen, the member of staff with the orange mark and the record, each named. */
"use client";

import { HumanMark, Part, Person } from "@/components/deck/kit";
import { FITS, GATE_SCALE, AGENT_SCALE, PITCH } from "./layout-fits";
import { Layer, Rows, StoryOf, Words } from "./parts";
import { Ledger, LedgerLine, Route, ToolScreen } from "./parts-control";
import { Agent, ClosedGate } from "./parts-map";

const F = FITS;

export function FitsMarks() {
  return (
    <Part id={F.marks}>
      {F.heads.map((head) => (
        <Words key={head.key} id={head.key} at={head.at} text={head.text} anchor="start" strong />
      ))}
      {F.layers.map((layer) => (
        <g key={layer.key}>
          <rect className="sn-fits__slab" data-build={layer.key} x={layer.at.x} y={layer.at.y} width={layer.at.w} height={layer.at.h} rx={8} />
          <Words id={layer.name.key} at={layer.name.at} text={layer.name.text} anchor="start" strong />
          <Words id={layer.scope.key} at={layer.scope.at} text={layer.scope.text} anchor="start" soft />
        </g>
      ))}
      <Words id={F.conclusion.key} at={F.conclusion.at} text={F.conclusion.text} anchor="start" strong />
      <Words id={F.define.key} at={F.define.at} text={F.define.text} strong />
      <ellipse className="sn-fits__boundary" data-build={F.boundary.key} cx={F.boundary.c.x} cy={F.boundary.c.y} rx={F.boundary.rx} ry={F.boundary.ry} />
      {F.spokes.map((spoke) => (
        <Route key={spoke.key} id={spoke.key} d={spoke.d} />
      ))}
      <Agent id={F.agent.key} at={F.agent.at} scale={AGENT_SCALE} />
      <ClosedGate id={F.gate.key} foot={F.gate.foot} scale={GATE_SCALE} />
      <ToolScreen id={F.screen.key} at={F.screen.at} socket={F.screen.socket} />
      <g className="sn-staff">
        <Person id={F.approval.key} at={F.approval.at} />
      </g>
      <HumanMark id={F.approval.mark.key} at={F.approval.mark.at} />
      <Ledger id={F.record.key} at={F.record.at} />
      {F.record.lines.map((line) => (
        <LedgerLine key={line.key} id={line.key} d={line.d} />
      ))}
      {[F.gate, F.screen, F.approval, F.record].map((control) => (
        <Rows key={control.name.key} id={control.name.key} at={control.name.at} rows={control.name.rows} pitch={PITCH} anchor="middle" />
      ))}
    </Part>
  );
}

export function FitsHtml() {
  return (
    <Layer id={F.html}>
      <StoryOf picture="fits" />
    </Layer>
  );
}
