/** Slide 11's picture: the grid of departments unlit, named; the green policy line round it, headed and named with its caption; the other column's heading and the three empty dashed plates, each with its name and caption inside. */
"use client";

import { Part } from "@/components/deck/kit";
import { TRACK } from "./layout-track";
import { Layer, StoryOf, Words } from "./parts";
import { DashedPlate } from "./parts-map";

const T = TRACK;

export function TrackMarks() {
  return (
    <Part id={T.marks}>
      <g data-build={T.grid.key}>
        {T.map.cells.map((cell) => (
          <rect key={cell.n} className="sn-box" x={cell.at.x} y={cell.at.y} width={cell.at.w} height={cell.at.h} rx={T.map.rx} />
        ))}
      </g>
      <Words id={T.name.key} at={T.name.at} text={T.name.text} anchor="start" strong />
      <rect className="sn-policy dk-draw" data-build={T.ring.key} x={T.ring.at.x} y={T.ring.at.y} width={T.ring.at.w} height={T.ring.at.h} rx={T.ring.r} pathLength={1} />
      <Words id={T.place.key} at={T.place.at} text={T.place.text} anchor="start" strong />
      <Words id={T.policy.name.key} at={T.policy.name.at} text={T.policy.name.text} anchor="start" size="text" strong />
      <Words id={T.policy.caption.key} at={T.policy.caption.at} text={T.policy.caption.text} anchor="start" soft />
      <Words id={T.gaps.key} at={T.gaps.at} text={T.gaps.text} anchor="start" strong />
    </Part>
  );
}

export function TrackHtml() {
  return (
    <Layer id={T.html}>
      {T.plates.map((plate) => (
        <DashedPlate key={plate.key} id={plate.key} at={plate.at} name={plate.name} caption={plate.caption} />
      ))}
      <StoryOf picture="track" />
    </Layer>
  );
}
