/** Slide 23's picture: the plan's six tiles, named once; the first lit and named; the bracket under the other five with its caption; the project dots; the grey tally, named; and the measure line from its first point to the point it aims at, each named, with the nameplate under it. */
"use client";

import { Part } from "@/components/deck/kit";
import { OUTCOMES } from "./layout-outcomes";
import { Layer, StoryOf } from "./parts";
import { Plate, Strip, Label } from "./parts-plan";

const O = OUTCOMES;
const M = O.measure;

export function OutcomesMarks() {
  return (
    <Part id={O.marks}>
      <Label id={O.plan.key} at={O.plan.at} text={O.plan.text} anchor="start" strong />
      {O.tiles.map((tile) => (
        <Strip key={tile.key} id={tile.key} at={tile.at} rx={10} className="fs-strip--tile" />
      ))}
      <rect className="fs-lit" data-build={O.lit.key} x={O.lit.at.x} y={O.lit.at.y} width={O.lit.at.w} height={O.lit.at.h} rx={10} />
      <g data-build={O.name.key}>
        {O.name.lines.map((line) => (
          <Label key={line.text} at={line.at} text={line.text} strong />
        ))}
      </g>
      <path className="fs-brace dk-draw" data-build={O.others.key} d={O.others.d} pathLength={1} />
      <Label id={O.others.caption.key} at={O.others.caption.at} text={O.others.caption.text} />
      {O.dots.map((dot) => (
        <circle key={dot.key} className="fs-project" data-build={dot.key} cx={dot.at.x} cy={dot.at.y} r={O.dot.r} />
      ))}
      <g data-build={O.tally.key}>
        {O.tally.strokes.map((stroke) => (
          <path key={stroke.key} className="fs-tally dk-draw" data-build={stroke.key} d={stroke.d} pathLength={1} />
        ))}
      </g>
      <Label id={O.tally.label.key} at={O.tally.label.at} text={O.tally.label.text} anchor="end" />
      <path className="fs-measure dk-draw" data-build={M.key} d={`M${M.from.x} ${M.from.y}L${M.to.x} ${M.to.y}`} pathLength={1} />
      <circle className="fs-point" data-build={M.start.key} cx={M.start.at.x} cy={M.start.at.y} r={M.start.r} />
      <circle className="fs-target" data-build={M.end.key} cx={M.end.at.x} cy={M.end.at.y} r={M.end.r} />
      <Label id={M.startLabel.key} at={M.startLabel.at} text={M.startLabel.text} anchor="end" strong />
      <Label id={M.endLabel.key} at={M.endLabel.at} text={M.endLabel.text} anchor="start" strong />
      <Plate id={O.plate.key} at={O.plate.at} text={O.plate.text} />
    </Part>
  );
}

export function OutcomesHtml() {
  return (
    <Layer id={O.html}>
      <StoryOf picture="outcomes" />
    </Layer>
  );
}
