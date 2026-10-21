/** Slide 11a's picture: a member of staff with a card, named under them; the route forking. On the upper branch the gate that opens, named over it; slide 11's screen, its caption over it; the record, named over it, its lines drawing in. On the lower branch the gate that stays closed, named under it; the reviewer, named under the line, with the magnifier; the orange mark and its words; the line from the mark back up into the upper branch. The honesty caption at the lower left. The cards are drawn before the screen, so one passing behind it is hidden. */
"use client";

import { HumanMark, Part, Person } from "@/components/deck/kit";
import { CONTROL, GATE_SCALE, PITCH } from "./layout-control";
import { Layer, Rows, StoryOf, Words } from "./parts";
import { Card, Ledger, LedgerLine, Magnifier, Route, Screen } from "./parts-control";
import { ClosedGate } from "./parts-map";

const C = CONTROL;

export function ControlMarks() {
  return (
    <Part id={C.marks}>
      <Words id={C.honesty.key} at={C.honesty.at} text={C.honesty.text} anchor="start" soft />
      <g className="sn-staff">
        <Person id={C.staff.key} at={C.staff.at} />
      </g>
      <Words id={C.staff.name.key} at={C.staff.name.at} text={C.staff.name.text} anchor="start" strong />
      <Rows id={C.staff.caption.key} at={C.staff.caption.at} rows={C.staff.caption.rows} pitch={PITCH} soft />
      <Route id={C.routes.stem.key} d={C.routes.stem.d} />
      <Route id={C.routes.upper.key} d={C.routes.upper.d} />
      <Route id={C.routes.lower.key} d={C.routes.lower.d} />
      <Route id={C.routes.join.key} d={C.routes.join.d} />
      <ClosedGate id={C.gates.open.key} foot={C.gates.open.foot} scale={GATE_SCALE} opens />
      <Words id={C.gates.open.name.key} at={C.gates.open.name.at} text={C.gates.open.name.text} strong />
      <ClosedGate id={C.gates.closed.key} foot={C.gates.closed.foot} scale={GATE_SCALE} />
      <Words id={C.gates.closed.name.key} at={C.gates.closed.name.at} text={C.gates.closed.name.text} strong />
      <Words id={C.gates.closed.caption.key} at={C.gates.closed.caption.at} text={C.gates.closed.caption.text} soft />
      {C.cards.map((card) => (
        <Card key={card.key} id={card.key} at={card.at} />
      ))}
      <Screen id={C.screen.key} at={C.screen.at} />
      <Rows id={C.screen.caption.key} at={C.screen.caption.at} rows={C.screen.caption.rows} pitch={PITCH} anchor="middle" soft />
      <Ledger id={C.ledger.key} at={C.ledger.at} />
      {C.ledger.lines.map((line) => (
        <LedgerLine key={line.key} id={line.key} d={line.d} />
      ))}
      <Words id={C.ledger.name.key} at={C.ledger.name.at} text={C.ledger.name.text} strong />
      <Rows id={C.ledger.caption.key} at={C.ledger.caption.at} rows={C.ledger.caption.rows} pitch={PITCH} anchor="middle" soft />
      <g className="sn-staff">
        <Person id={C.reviewer.key} at={C.reviewer.at} />
      </g>
      <Rows id={C.reviewer.name.key} at={C.reviewer.name.at} rows={C.reviewer.name.rows} pitch={PITCH} anchor="middle" extra="sn-word--strong" />
      <Magnifier id={C.lens.key} at={C.lens.at} />
      <HumanMark id={C.mark.key} at={C.mark.at} />
      <Rows id={C.mark.words.key} at={C.mark.words.at} rows={C.mark.words.rows} pitch={PITCH} soft />
    </Part>
  );
}

export function ControlHtml() {
  return (
    <Layer id={C.html}>
      <StoryOf picture="control" />
    </Layer>
  );
}
