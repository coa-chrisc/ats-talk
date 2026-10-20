/** Slide 15's picture: slide 11's track and pack again; the City's runner, drawn at the start and carried round to the bend; the three markers behind it, each named under the track; the stair in the infield with its grey tag; the tag under the track at the right. */
"use client";

import { Part } from "@/components/deck/kit";
import { FLEET, GATE } from "./layout-fleet";
import { Layer, StoryOf, Stroke, Tagged, Words } from "./parts";
import { StairStep } from "./parts-figures";
import { Marker, Pack, Runner, StartLine, Track } from "./parts-track";
import { RUNNER } from "./track-geometry";

const F = FLEET;
const S = F.stair;

export function FleetMarks() {
  return (
    <Part id={F.marks}>
      <Track id={F.track.key} />
      <StartLine id={F.start.key} />
      <Pack ids={F.pack.keys} />
      <Words id={F.pack.name.key} at={F.pack.name.at} text={F.pack.name.text} size="text" strong />
      {F.markers.flatMap((marker) => [
        <Marker key={marker.key} id={marker.key} at={marker.at} r={marker.r} />,
        <Words key={marker.name.key} id={marker.name.key} at={marker.name.at} text={marker.name.text} strong />,
      ])}
      <g className="dk-move" data-build={F.city.key}>
        <Runner at={F.city.at} h={RUNNER.large} tone="process" />
      </g>
      <Stroke id={S.floor.key} from={{ x: S.floor.x0, y: S.floor.y }} to={{ x: S.floor.x1, y: S.floor.y }} className="sn-floor" />
      {S.steps.map((step) => (
        <StairStep key={step.key} id={step.key} at={step.at} gate={step.gate.at} name={step.name.at} text={step.text} size={GATE} />
      ))}
      <Tagged id={S.tag.key} at={S.tag.at} text={S.tag.text} tone="grey" />
      <Tagged id={F.applications.key} at={F.applications.at} text={F.applications.text} tone="plain" />
    </Part>
  );
}

export function FleetHtml() {
  return (
    <Layer id={F.html}>
      <StoryOf picture="fleet" />
    </Layer>
  );
}
