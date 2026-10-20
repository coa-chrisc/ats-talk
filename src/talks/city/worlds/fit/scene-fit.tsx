/** Slide 23's picture: the organization's chart, its row of teams, the dashed new box joined into the row with the figure in it, and the four lines to the four pieces. */
"use client";

import { Dashed, Part, Person, Story } from "@/components/deck/kit";
import { STORIES, groupOf } from "./layout";
import { FIT, ORG, PIECE } from "./layout-fit";
import { Group, Member, Outline, PieceMark, Words } from "./parts";

const ID = "fit";

function Org() {
  return (
    <>
      <g data-build={ORG.head.key}>
        <Outline at={ORG.head.at} rx={12} className="fit-box" draws />
      </g>
      <Words id={ORG.name.key} at={{ x: ORG.name.at.x + ORG.name.at.w / 2, y: ORG.name.at.y + ORG.name.at.h / 2 }} text={ORG.name.text} size="text" />
      <g data-build={ORG.links.key}>
        {ORG.links.d.map((d) => (
          <path key={d} className="fit-org-link dk-draw" d={d} pathLength={1} />
        ))}
      </g>
      {ORG.units.map((unit) => (
        <g key={unit.key} data-build={unit.key}>
          <path className="fit-org-link dk-draw" d={unit.drop} pathLength={1} />
          <Outline at={unit.at} rx={10} className="fit-box" draws />
          {unit.members.map((member) => (
            <Member key={member.x} at={member} />
          ))}
        </g>
      ))}
      <path className="fit-org-link dk-draw" data-build={ORG.join.key} d={ORG.join.d} pathLength={1} />
    </>
  );
}

export function FitMarks() {
  return (
    <Part id={groupOf(ID).marks}>
      <Org />
      <Person id={FIT.figure.key} at={FIT.figure.at} />
      {FIT.pieces.map((piece) => (
        <path key={piece.line.key} className="fit-reach dk-draw" data-build={piece.line.key} d={piece.line.d} pathLength={1} />
      ))}
      {FIT.pieces.map((piece) => (
        <g key={piece.key} data-build={piece.key}>
          <Outline at={piece.at} rx={12} className="fit-piece" />
          <PieceMark icon={piece.icon} at={{ x: piece.at.x + PIECE.pad, y: piece.at.y + (piece.at.h - PIECE.icon) / 2 }} size={PIECE.icon} />
          <Words at={{ x: piece.at.x + PIECE.pad + PIECE.icon + 16, y: piece.at.y + piece.at.h / 2 }} text={piece.text} anchor="start" size="text" />
        </g>
      ))}
    </Part>
  );
}

/** The story lines, and the new box's dashed outline: a dashed stroke cannot draw on, so it is HTML that opens by its clip, in navy. */
export function FitHtml() {
  const band = STORIES.find((entry) => entry.picture === ID)!;
  return (
    <Group id={groupOf(ID).html}>
      <Dashed id={FIT.role.key} at={FIT.role.at} rx={FIT.role.rx} tone="paper" />
      <Story id={band.id} band={band.band} lines={band.lines} />
    </Group>
  );
}
