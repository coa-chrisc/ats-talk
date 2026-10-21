/** Slide 12's picture: the grid of department boxes, named; a window lit in nine of them, the six named in a list down the right, each behind its bullet; the cluster of staff under the grid, named, with its caption and the training's; and the empty table beside them, its caption under it. */
"use client";

import { Part, Person } from "@/components/deck/kit";
import { EXISTS, PITCH } from "./layout-exists";
import { Layer, Rows, StoryOf, Words } from "./parts";
import { EmptyTable, LitWindow } from "./parts-map";

const E = EXISTS;
const G = E.group;

export function ExistsMarks() {
  return (
    <Part id={E.marks}>
      <g data-build={E.grid.key}>
        {E.map.cells.map((cell) => (
          <rect key={cell.n} className="sn-box" x={cell.at.x} y={cell.at.y} width={cell.at.w} height={cell.at.h} rx={E.map.rx} />
        ))}
      </g>
      <Words id={E.name.key} at={E.name.at} text={E.name.text} anchor="start" strong />
      {[...E.named, ...E.unnamed].map((lit) => (
        <LitWindow key={lit.key} id={lit.key} cell={lit.cell} at={lit.at} rx={E.map.rx} />
      ))}
      {E.named.map(({ entry }) => (
        <g key={entry.key} data-build={entry.key}>
          <rect className="sn-bullet" x={entry.bullet.x} y={entry.bullet.y} width={entry.bullet.w} height={entry.bullet.h} rx={3} />
          <Words at={entry.name.at} text={entry.name.text} anchor="start" strong />
          <Words at={entry.caption.at} text={entry.caption.text} anchor="start" soft />
        </g>
      ))}
      {E.staff.map((person) => (
        <g key={person.key} className="sn-staff">
          <Person id={person.key} at={person.at} />
        </g>
      ))}
      <Words id={G.name.key} at={G.name.at} text={G.name.text} anchor="start" strong />
      <Words id={G.caption.key} at={G.caption.at} text={G.caption.text} anchor="start" soft />
      <Rows id={G.training.key} at={G.training.at} rows={G.training.rows} pitch={PITCH} soft />
      <Rows id={E.tableCaption.key} at={E.tableCaption.at} rows={E.tableCaption.rows} pitch={PITCH} anchor="middle" soft />
    </Part>
  );
}

export function ExistsHtml() {
  return (
    <Layer id={E.html}>
      <StoryOf picture="exists" />
      <EmptyTable id={E.table.key} c={E.table.c} scale={E.table.scale} reach={E.table.reach} />
    </Layer>
  );
}
