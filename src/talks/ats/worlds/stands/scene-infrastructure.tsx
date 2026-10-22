/**
 * Slide 13's picture: the fenced yard, named with its caption, and its five
 * tiles, each with its name and any caption; at the right, the round table
 * seen from above (the first world's, drawn solid in navy) with four chairs,
 * a person in each, a nameplate by each chair, and the table's caption.
 */
"use client";

import "../first/first.css";
import { Part } from "@/components/deck/kit";
import { Chair, Sitter, Table } from "../first/parts-room";
import { HEAD, INFRASTRUCTURE, SEAT } from "./layout-infrastructure";
import { Layer, StoryOf, Words } from "./parts";
import { Plate, YardTile } from "./parts-figures";
import { Fence } from "./parts-map";

const I = INFRASTRUCTURE;
const T = I.table;

export function InfrastructureMarks() {
  return (
    <Part id={I.marks}>
      <Fence id={I.fence.key} at={I.fence.at} />
      <Words id={I.name.key} at={I.name.at} text={I.name.text} anchor="start" size="text" strong />
      <Words id={I.caption.key} at={I.caption.at} text={I.caption.text} anchor="start" soft />
      {I.tiles.map((tile) => (
        <YardTile key={tile.key} id={tile.key} at={tile.at}>
          <Words at={tile.name.at} text={tile.name.text} size="text" strong />
          {tile.caption && <Words at={tile.caption.at} text={tile.caption.text} soft />}
        </YardTile>
      ))}
      {T.seats.map((seat) => (
        <Chair key={seat.key} id={seat.key} at={seat.at} deg={seat.deg} size={SEAT}>
          <Sitter id={seat.sitter} head={HEAD} />
        </Chair>
      ))}
      <Table id={T.key} c={T.c} r={T.r} />
      {I.plates.map((plate) => (
        <Plate key={plate.key} id={plate.key} at={plate.at} text={plate.text} />
      ))}
      <Words id={I.met.key} at={I.met.at} text={I.met.text} size="text" />
    </Part>
  );
}

export function InfrastructureHtml() {
  return (
    <Layer id={I.html}>
      <StoryOf picture="infrastructure" />
    </Layer>
  );
}
