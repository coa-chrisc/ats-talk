/** Slide 21's picture: the two lanes as light outlines, named in a column at their left, the upper one's four tiles and their names, the arrows down from them, the project cards in the lower lane. */
"use client";

import { Part } from "@/components/deck/kit";
import { LANES, TILE_LEADING } from "./layout-lanes";
import { Layer, StoryOf } from "./parts";
import { Card, DownArrow, Label, Lines, Strip, Tile } from "./parts-plan";

const L = LANES;

export function LanesMarks() {
  return (
    <Part id={L.marks}>
      <Strip id={L.upper.key} at={L.upper.at} className="fs-strip--line" />
      <Label id={L.upper.name.key} at={L.upper.name.at} text={L.upper.name.text} anchor="start" strong size="text" />
      <Strip id={L.lower.key} at={L.lower.at} className="fs-strip--line" />
      <Label id={L.lower.name.key} at={L.lower.name.at} text={L.lower.name.text} anchor="start" strong size="text" />
      {L.pieces.map((piece) => (
        <g key={piece.key}>
          <Tile id={piece.key} at={piece.at} />
          <Lines id={piece.label.key} first={piece.label.first} lines={piece.label.lines} leading={TILE_LEADING} strong size="text" />
        </g>
      ))}
      {L.cards.map((card) => (
        <Card key={card.key} id={card.key} at={card.at} />
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
