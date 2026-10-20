/** Slide 13's picture: the fenced yard, named with its caption, three tiles inside it each with its name and caption; under it the calendar of weeks, named, and beside it the two nameplates and the dashed third with its caption. */
"use client";

import { Dashed, Part } from "@/components/deck/kit";
import { INFRASTRUCTURE, TILE_WORDS } from "./layout-infrastructure";
import { Layer, Rows, StoryOf, Words } from "./parts";
import { Fence, Plate, WeekFills, Weeks, YardTile } from "./parts-figures";

const I = INFRASTRUCTURE;

export function InfrastructureMarks() {
  return (
    <Part id={I.marks}>
      <Fence id={I.fence.key} at={I.fence.at} posts={I.fence.posts} />
      <Words id={I.name.key} at={I.name.at} text={I.name.text} anchor="start" size="text" strong />
      <Words id={I.caption.key} at={I.caption.at} text={I.caption.text} anchor="start" soft />
      {I.tiles.map((tile) => (
        <YardTile key={tile.key} id={tile.key} at={tile.at}>
          <Words at={tile.name.at} text={tile.name.text} anchor="start" size="text" strong />
          <Rows at={tile.caption.at} rows={tile.caption.rows} pitch={TILE_WORDS.pitch} soft />
        </YardTile>
      ))}
      <Weeks id={I.calendar.key} at={I.calendar.weeks.at} />
      <WeekFills id={I.calendar.weeks.key} at={I.calendar.weeks.at} />
      <Words id={I.every.key} at={I.every.at} text={I.every.text} anchor="start" />
      {I.plates.map((plate) => (
        <Plate key={plate.key} id={plate.key} at={plate.at} text={plate.text} />
      ))}
      <Words id={I.joining.caption.key} at={I.joining.caption.at} text={I.joining.caption.text} soft />
    </Part>
  );
}

export function InfrastructureHtml() {
  return (
    <Layer id={I.html}>
      <Dashed id={I.joining.key} at={I.joining.at} rx={8}>
        <span className="sn-dashed-name">{I.joining.text}</span>
      </Dashed>
      <StoryOf picture="infrastructure" />
    </Layer>
  );
}
