/** Slide 12's picture: the grid of department boxes, named; the lanterns lit in nine of them, six named in a column each side of the ring, each joined to its box by a straight leader; the ring of nine dots round the grid, named; the tag under it and the grey tag apart. */
"use client";

import { Part } from "@/components/deck/kit";
import { CAPTION, DOT_R, EXISTS, LANTERN } from "./layout-exists";
import { Layer, Rows, StoryOf, Tagged, Words } from "./parts";
import { Lantern } from "./parts-figures";

const E = EXISTS;
const R = E.ring;

export function ExistsMarks() {
  return (
    <Part id={E.marks}>
      <g data-build={E.grid.key}>
        {E.boxes.map((cell) => (
          <rect key={cell.key} className="sn-box" x={cell.at.x} y={cell.at.y} width={cell.at.w} height={cell.at.h} rx={8} />
        ))}
      </g>
      <Words id={E.name.key} at={E.name.at} text={E.name.text} anchor="start" strong />
      {E.named.map((lit) => (
        <Lantern key={lit.key} id={lit.key} cell={lit.at} at={lit.centre} scale={1} />
      ))}
      {E.unnamed.map((lit) => (
        <Lantern key={lit.key} id={lit.key} cell={lit.at} at={lit.centre} scale={LANTERN.small} />
      ))}
      {E.named.flatMap((lit) => [
        <path key={lit.leader.key} className="sn-leader dk-draw" data-build={lit.leader.key} d={lit.leader.d} pathLength={1} />,
        <Words key={lit.name.key} id={lit.name.key} at={lit.name.at} text={lit.name.text} anchor={lit.anchor} size="text" strong />,
        <Rows key={lit.caption.key} id={lit.caption.key} at={lit.caption.at} rows={lit.caption.rows} pitch={CAPTION.pitch} anchor={lit.anchor} soft />,
      ])}
      <rect className="sn-ring" data-build={R.key} x={R.at.x} y={R.at.y} width={R.at.w} height={R.at.h} rx={R.r} pathLength={1} />
      {R.dots.map((dot) => (
        <circle key={dot.key} className="sn-dot" data-build={dot.key} cx={dot.at.x} cy={dot.at.y} r={DOT_R} />
      ))}
      <Words id={R.name.key} at={R.name.at} text={R.name.text} anchor="start" size="text" strong />
      <Words id={R.caption.key} at={R.caption.at} text={R.caption.text} anchor="start" soft />
      <Tagged id={E.staff.key} at={E.staff.at} text={E.staff.text} tone="plain" />
      <Tagged id={E.apart.key} at={E.apart.at} text={E.apart.text} tone="grey" />
    </Part>
  );
}

export function ExistsHtml() {
  return (
    <Layer id={E.html}>
      <StoryOf picture="exists" />
    </Layer>
  );
}
