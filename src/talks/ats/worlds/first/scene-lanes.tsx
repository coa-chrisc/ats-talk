/** Slide 21's picture: the two lanes, the upper one's four wells (drawn in with it) and their names, the arrows down from them, the belt of boxes in the lower lane. */
"use client";

import { Part } from "@/components/deck/kit";
import { LANES } from "./layout-lanes";
import { Layer, StoryOf } from "./parts";
import { DownArrow, Grow, Parcel, Strip, Label } from "./parts-plan";

const L = LANES;

export function LanesMarks() {
  return (
    <Part id={L.marks}>
      <Strip id={L.upper.key} at={L.upper.at} className="fs-strip--upper">
        {L.pieces.map((piece) => (
          <rect key={piece.key} className="fs-well" x={piece.at.x} y={piece.at.y} width={piece.at.w} height={piece.at.h} rx={10} />
        ))}
      </Strip>
      <Label id={L.upper.name.key} at={L.upper.name.at} text={L.upper.name.text} anchor="start" strong size="text" />
      <Strip id={L.lower.key} at={L.lower.at} className="fs-strip--lower" />
      <Label id={L.lower.name.key} at={L.lower.name.at} text={L.lower.name.text} anchor="start" strong size="text" />
      {L.pieces.map((piece) => (
        <g key={piece.key}>
          <Grow id={piece.key} at={piece.at} className="fs-well__fill" rx={10} />
          <Label id={piece.label.key} at={piece.label.at} text={piece.label.text} strong size="text" />
        </g>
      ))}
      {L.parcels.map((parcel) => (
        <Parcel key={parcel.key} id={parcel.key} at={parcel.at} />
      ))}
      {L.pieces.map((piece) => (
        <DownArrow key={piece.arrow.key} id={piece.arrow.key} from={piece.arrow.from} to={piece.arrow.to} />
      ))}
    </Part>
  );
}

export function LanesHtml() {
  return (
    <Layer id={L.html}>
      <StoryOf picture="lanes" />
    </Layer>
  );
}
