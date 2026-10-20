/** Slide 19's picture: the indigo panel; on it four rows, each a green numeral on a white disc, its decision in white and a green nameplate under it; and the grey tag on the white ground under the panel. */
"use client";

import { Part } from "@/components/deck/kit";
import { DECISIONS, DECISION_PLATE, DISC_R } from "./layout-decisions";
import { GreyTag, Layer, Nameplate, Numeral, StoryOf, Words } from "./parts";

const D = DECISIONS;

export function DecisionsMarks() {
  return (
    <Part id={D.marks}>
      <rect className="rd-panel" data-build={D.panel.key} style={{ transformOrigin: `${D.panel.at.x}px ${D.panel.at.y}px` }} x={D.panel.at.x} y={D.panel.at.y} width={D.panel.at.w} height={D.panel.at.h} rx={D.panel.rx} />
      {D.rows.map((row) => (
        <g key={row.key}>
          <g data-build={row.key}>
            <circle className="rd-disc" cx={row.disc.x} cy={row.disc.y} r={DISC_R} />
            <Words at={row.words} text={row.text} anchor="start" size="text" tone="white" strong />
          </g>
          <Numeral id={row.numeral.key} at={row.numeral.at} figure={row.figure} />
          <Nameplate id={row.plate.key} at={row.plate.at} text={row.plate.text} pad={DECISION_PLATE.pad} icon={DECISION_PLATE.icon} />
        </g>
      ))}
      <GreyTag id={D.tag.key} at={D.tag.at} text={D.tag.text} />
    </Part>
  );
}

export function DecisionsHtml() {
  return (
    <Layer id={D.html}>
      <StoryOf picture="decisions" />
    </Layer>
  );
}
