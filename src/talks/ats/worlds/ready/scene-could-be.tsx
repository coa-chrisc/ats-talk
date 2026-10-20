/** Slide 27's picture: the track from above with its start stripe; the pack on the far straight, named; the City's runner on the right bend; the dashed runner at the pack's tail, named in the infield; the markers between the two on the middle lane line, each joined by a leader to its entry in the key under the track. */
"use client";

import { Part } from "@/components/deck/kit";
import { COULD_BE, MARKER_R } from "./layout-could-be";
import { Layer, StoryOf, Words } from "./parts";
import { KeyEntry, Leader } from "./parts-could-be";
import { Marker, Pack, Runner, StartLine, Track } from "./parts-track";
import { RUNNER } from "./track-geometry";

const C = COULD_BE;

export function CouldBeMarks() {
  return (
    <Part id={C.marks}>
      <Track id={C.track.key} />
      <StartLine id={C.start.key} />
      <Pack ids={C.pack.keys} />
      <Words id={C.pack.name.key} at={C.pack.name.at} text={C.pack.name.text} size="text" strong />
      <Runner id={C.dashed.key} at={C.dashed.at} h={RUNNER.large} tone="process" facing="left" dashed />
      <Words id={C.dashed.name.key} at={C.dashed.name.at} text={C.dashed.name.text} size="text" tone="process" strong />
      {C.markers.map((marker) => (
        <g key={marker.key}>
          <Leader id={marker.leader.key} points={marker.leader.points} />
          <Marker id={marker.key} at={marker.at} r={MARKER_R} />
          <KeyEntry id={marker.entry.key} name={marker.entry.name} caption={marker.entry.caption} />
        </g>
      ))}
      <Runner id={C.city.key} at={C.city.at} h={RUNNER.large} tone="process" />
    </Part>
  );
}

export function CouldBeHtml() {
  return (
    <Layer id={C.html}>
      <StoryOf picture="could-be" />
    </Layer>
  );
}
