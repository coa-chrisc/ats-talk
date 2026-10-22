/** Slide 8's picture: the hexagon agent and its honesty caption, slate; the closed gate, named under it; the record folder and its words; the ledger, headed, and its two lines; the staff figure past the far post, and the orange mark over them with their words; the two cards, the first's words over its stop and its stamped word, the second's words beside its stop. The cards are drawn last, so they pass over the gate's posts. */
"use client";

import { HumanMark, Part, Person } from "@/components/deck/kit";
import { ENFORCE } from "./layout-enforce";
import { Layer, StoryOf, Words } from "./parts";
import { Card, CheckGate, Folder, Hexagon, Ledger, LedgerLine, Stamp, WordLines } from "./parts-enforce";

const E = ENFORCE;
const { blocked, approved } = E.cards;

export function EnforceMarks() {
  return (
    <Part id={E.marks}>
      <Hexagon id={E.agent.key} top={E.agent.top} scale={E.agent.scale} />
      <g className="id-honest">
        <Words id={E.agent.caption.key} at={E.agent.caption.at} text={E.agent.caption.text} />
      </g>
      <CheckGate id={E.gate.key} swing={E.gate.swing} posts={E.gate.posts} upper={E.gate.upper} lower={E.gate.lower} />
      <Words id={E.gate.name.key} at={E.gate.name.at} text={E.gate.name.text} strong />
      <Folder id={E.record.key} at={E.record.at} />
      <Words id={E.record.words.key} at={E.record.words.at} text={E.record.words.text} anchor="end" />
      <Ledger id={E.ledger.key} at={E.ledger.at} rule={E.ledger.rule} />
      <Words id={E.ledger.heading.key} at={E.ledger.heading.at} text={E.ledger.heading.text} anchor="start" strong />
      {E.ledger.lines.map((line) => (
        <LedgerLine key={line.key} id={line.key} from={line.from} to={line.to} />
      ))}
      <g className="id-staff dk-move" data-build={E.staff.key}>
        <Person id={E.staff.figure} at={E.staff.at} />
      </g>
      <HumanMark id={E.mark.key} at={E.mark.at} />
      <WordLines id={E.mark.words.key} at={E.mark.words.at} lines={E.mark.words.lines} anchor="start" />
      <Words id={blocked.words.key} at={blocked.words.at} text={blocked.words.text} anchor="end" strong />
      <WordLines id={approved.words.key} at={approved.words.at} lines={approved.words.lines} anchor="end" />
      <Card id={blocked.key} at={blocked.at} />
      <Stamp id={blocked.stamp.key} at={blocked.stamp.at} text={blocked.stamp.text} />
      <Card id={approved.key} at={approved.at} />
    </Part>
  );
}

export function EnforceHtml() {
  return (
    <Layer id={E.html}>
      <StoryOf picture="enforce" />
    </Layer>
  );
}
