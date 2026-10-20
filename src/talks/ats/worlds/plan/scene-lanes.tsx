/** Slide 13's picture: the two lanes, the upper one's four wells and their names, the arrows down from them, the belt of boxes in the lower lane, and the tag with its caption. */
"use client";

import { Part } from "@/components/deck/kit";
import { LANES } from "./layout-lanes";
import { DownArrow, Grow, Layer, Parcel, StoryOf, Strip, TagShape, Words } from "./parts";

const L = LANES;

export function LanesMarks() {
  return (
    <Part id={L.marks}>
      <Strip id={L.upper.key} at={L.upper.at} className="pl-strip--upper" />
      <Words id={L.upper.name.key} at={L.upper.name.at} text={L.upper.name.text} anchor="start" strong size="text" />
      <Strip id={L.lower.key} at={L.lower.at} className="pl-strip--lower" />
      <Words id={L.lower.name.key} at={L.lower.name.at} text={L.lower.name.text} anchor="start" strong size="text" />
      {L.pieces.map((piece) => (
        <g key={piece.key}>
          <rect className="pl-well" x={piece.at.x} y={piece.at.y} width={piece.at.w} height={piece.at.h} rx={10} />
          <Grow id={piece.key} at={piece.at} className="pl-well__fill" rx={10} />
          <Words id={piece.label.key} at={piece.label.at} text={piece.label.text} strong size="text" />
        </g>
      ))}
      {L.parcels.map((parcel) => (
        <Parcel key={parcel.key} id={parcel.key} at={parcel.at} />
      ))}
      {L.pieces.map((piece) => (
        <DownArrow key={piece.arrow.key} id={piece.arrow.key} from={piece.arrow.from} to={piece.arrow.to} />
      ))}
      <TagShape id={L.tag.key} at={L.tag.at} text={L.tag.text} kind="indigo" />
      <Words id={L.caption.key} at={L.caption.at} text={L.caption.text} anchor="end" />
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
