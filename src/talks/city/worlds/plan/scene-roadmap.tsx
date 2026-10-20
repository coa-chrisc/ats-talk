/** Slide 20's picture: two lanes, lane two's named pieces over lane one's boxes and the arrows between them, the band of the process under both with its checkpoints, and the door at the last. */
"use client";

import { Connector, Part } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { ROADMAP } from "./layout-roadmap";
import { Door, Doorway, Frame, Grow, Layer, StoryOf, Words } from "./parts";

const R = ROADMAP;

export function RoadmapMarks() {
  const { marks } = groupOf("roadmap");
  const { band, door } = R;
  return (
    <Part id={marks}>
      {R.lanes.map((lane) => (
        <g key={lane.key}>
          <Frame id={lane.key} at={lane.at} />
          <Words id={lane.name.key} at={lane.name.at} text={lane.name.text} anchor="start" />
        </g>
      ))}
      {R.pieces.map((piece) => (
        <g key={piece.key}>
          <Grow id={piece.key} from={{ x: piece.at.x, y: piece.at.y }} axis="x">
            <rect className="plan-slab__fill" x={piece.at.x} y={piece.at.y} width={piece.at.w} height={piece.at.h} rx={6} />
          </Grow>
          <Words id={piece.label.key} at={piece.label.at} text={piece.label.text} />
        </g>
      ))}
      <Frame id={band.key} at={band.at} hue="process" className="plan-frame--tint" />
      <Words id={band.name.key} at={band.name.at} text={band.name.text} anchor="start" />
      {R.checks.slice(0, 3).map((check) => (
        <g key={check.key} className="plan-check" data-build={check.key}>
          <circle className="plan-check__edge" cx={check.at.x} cy={check.at.y} r={check.r} />
          <circle className="plan-check__fill" cx={check.at.x} cy={check.at.y} r={check.r - 4} />
        </g>
      ))}
      {R.checks.map((check) => (
        <Words key={check.name.key} id={check.name.key} at={check.name.at} text={check.name.text} />
      ))}
      <Doorway id={door.way} at={door.at} />
      {[...R.boxes, R.refill].map((entry) => (
        <rect key={entry.key} className="plan-box" data-build={entry.key} x={entry.at.x} y={entry.at.y} width={entry.at.w} height={entry.at.h} rx={6} />
      ))}
      {R.arrows.map((arrow) => (
        <Connector key={arrow.key} id={arrow.key} from={arrow.from} to={arrow.to} axis="v" tone="paper" />
      ))}
      <Door id={door.key} leaf={door.leaf} at={door.at} />
      <Words id={door.word.key} at={door.word.at} text={door.word.text} tone="process" strong />
    </Part>
  );
}

export function RoadmapHtml() {
  return (
    <Layer id={groupOf("roadmap").html}>
      <StoryOf picture="roadmap" />
    </Layer>
  );
}
