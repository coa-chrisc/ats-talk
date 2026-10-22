/** Slide 11a's picture: a member of staff with a card, named under them; the route forking. The upper branch runs into the shelf: three tool screens with their sockets, named over them, and room for a fourth; the first screen's socket fill, the boundary round it and their words; the record under it, named beside it, its lines drawing in. On the lower branch the gate that stays closed, named under it; the reviewer, named under the line, with the magnifier; the orange mark and its words. The fourth screen, its socket and its dashed slot. The honesty caption at the lower left. The cards are drawn over the screens, so a seated card's hole shows its socket. */
"use client";

import { Dashed, HumanMark, Part, Person } from "@/components/deck/kit";
import { CONTROL, GATE_SCALE, PITCH } from "./layout-control";
import { Layer, Rows, StoryOf, Words } from "./parts";
import { AddedSocket, Boundary, Card, Ledger, LedgerLine, LitSocket, Magnifier, Route, ToolScreen } from "./parts-control";
import { ClosedGate } from "./parts-map";

const C = CONTROL;
const ADDED = C.tools[3];

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
      <Route id={C.shelf.key} d={C.shelf.d} shelf />
      <Words id={C.shelf.name.key} at={C.shelf.name.at} text={C.shelf.name.text} strong />
      {C.tools.slice(0, 3).map((tool) => (
        <ToolScreen key={tool.key} id={tool.key} at={tool.at} socket={tool.rim} />
      ))}
      <ToolScreen id={ADDED.key} at={ADDED.at} />
      <LitSocket id={C.sockets.lit.key} d={C.sockets.lit.d} />
      <AddedSocket id={C.sockets.added.key} d={C.sockets.added.d} />
      <Words id={C.fits.key} at={C.fits.at} text={C.fits.text} anchor="end" strong />
      <Rows id={C.boundary.caption.key} at={C.boundary.caption.at} rows={C.boundary.caption.rows} pitch={PITCH} anchor="end" soft />
      <Ledger id={C.ledger.key} at={C.ledger.at} />
      {C.ledger.lines.map((line) => (
        <LedgerLine key={line.key} id={line.key} d={line.d} />
      ))}
      <Words id={C.ledger.name.key} at={C.ledger.name.at} text={C.ledger.name.text} anchor="end" strong />
      <Rows id={C.ledger.caption.key} at={C.ledger.caption.at} rows={C.ledger.caption.rows} pitch={PITCH} anchor="end" soft />
      <ClosedGate id={C.gate.key} foot={C.gate.foot} scale={GATE_SCALE} />
      <Words id={C.gate.name.key} at={C.gate.name.at} text={C.gate.name.text} strong />
      <Words id={C.gate.caption.key} at={C.gate.caption.at} text={C.gate.caption.text} soft />
      <g className="sn-staff">
        <Person id={C.reviewer.key} at={C.reviewer.at} />
      </g>
      <Rows id={C.reviewer.name.key} at={C.reviewer.name.at} rows={C.reviewer.name.rows} pitch={PITCH} anchor="middle" extra="sn-word--strong" />
      {C.cards.map((card) => (
        <Card key={card.key} id={card.key} page={card.page} line={card.line} />
      ))}
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
      <Boundary id={C.boundary.key} at={C.boundary.at} />
      <Dashed id={C.slot.key} at={C.slot.at} rx={C.slot.rx} tone="soft" />
    </Layer>
  );
}
