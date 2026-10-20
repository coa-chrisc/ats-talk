/** Slides 20b and 21's pictures: the spear tip, its shaft line and its four shafts, and the counter where a department is helped; the two buildings on their ground and the path between them. */
"use client";

import { Line, Part, type Box } from "@/components/deck/kit";
import { DashedShape } from "../../../bchc/worlds/start/parts-figures";
import { groupOf } from "./layout";
import { BUILT, READINESS, outlinePath } from "./layout-readiness";
import { Figure, Frame, Grow, Layer, StoryOf, Words } from "./parts";

const S = READINESS;
const B = BUILT;

export function ReadinessMarks() {
  const { marks } = groupOf("readiness");
  const { tip, line, counter, visitor, helper } = S;
  return (
    <Part id={marks}>
      <path className="plan-spear dk-draw" data-build={line.key} d={`M${line.from.x} ${line.from.y}H${line.to.x}`} pathLength={1} />
      {S.shafts.map((shaft) => (
        <g key={shaft.key}>
          <Grow id={shaft.key} from={{ x: shaft.at.x + shaft.at.w, y: shaft.at.y }} axis="x">
            <rect className="plan-shaft" x={shaft.at.x} y={shaft.at.y} width={shaft.at.w} height={shaft.at.h} rx={6} />
          </Grow>
          <Words id={shaft.name.key} at={shaft.name.at} text={shaft.name.text} anchor="start" />
        </g>
      ))}
      <g data-build={tip.key}>
        <rect className="plan-tip" x={tip.socket.x} y={tip.socket.y} width={tip.socket.w} height={tip.socket.h} rx={3} />
        <path className="plan-tip" d={tip.d} />
        <Words at={tip.name.at} text={tip.name.text} tone="white" strong />
      </g>
      <Line id={S.floor.key} from={S.floor.from} to={S.floor.to} tone="paper" />
      <Figure id={helper.key} at={helper.at}>
        <g className="plan-face" data-build={helper.face.key} style={{ transformOrigin: `${helper.face.head.x}px ${helper.face.head.y}px` }}>
          <path d={helper.face.nose} />
        </g>
      </Figure>
      <g data-build={counter.key}>
        <rect className="plan-counter" x={counter.at.x} y={counter.at.y} width={counter.at.w} height={counter.at.h} rx={4} />
        <rect className="plan-counter__top" x={counter.at.x - 10} y={counter.at.y - 6} width={counter.at.w + 20} height={12} rx={3} />
        <Words at={counter.name.at} text={counter.name.text} strong />
      </g>
      <g data-build={visitor.key}>
        <Figure at={visitor.at} drawn />
        <Words at={visitor.name.at} text={visitor.name.text} />
      </g>
    </Part>
  );
}

export function ReadinessHtml() {
  return (
    <Layer id={groupOf("readiness").html}>
      <StoryOf picture="readiness" />
    </Layer>
  );
}

type House = (typeof BUILT)["first"]["house"];

/** A building above its foundation: white walls, a navy roof, its door and two windows, rising from its foot (`fill`). */
function Building({ house }: { house: House }) {
  return (
    <Grow id={house.key} from={house.base} axis="y">
      <path className="plan-house__roof" d={house.roof} />
      <rect className="plan-house__body" x={house.body.x} y={house.body.y} width={house.body.w} height={house.body.h} />
      {house.windows.map((window: Box) => (
        <rect key={window.x} className="plan-house__window" x={window.x} y={window.y} width={window.w} height={window.h} rx={3} />
      ))}
      <rect className="plan-house__door" x={house.door.x} y={house.door.y} width={house.door.w} height={house.door.h} rx={3} />
    </Grow>
  );
}

/** A nameplate: a white plate edged in navy with its words. */
function Plate({ id, at, text }: { id: string; at: Box; text: string }) {
  return (
    <g data-build={id}>
      <rect className="plan-plate" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      <Words at={{ x: at.x + at.w / 2, y: at.y + at.h / 2 }} text={text} strong />
    </g>
  );
}

export function BuiltMarks() {
  const { marks } = groupOf("built-to-last");
  const { ground, first, next } = B;
  return (
    <Part id={marks}>
      <g data-build={ground.key}>
        <rect className="plan-ground" x={ground.at.x} y={ground.at.y} width={ground.at.w} height={ground.at.h} />
        <path className="plan-ground__edge dk-draw" d={`M${ground.at.x} ${ground.at.y}H${ground.at.x + ground.at.w}`} pathLength={1} />
      </g>
      <Words id={ground.name.key} at={ground.name.at} text={ground.name.text} anchor="start" />
      {B.path.map((stone) => (
        <rect key={stone.key} className="plan-stone" data-build={stone.key} x={stone.at.x} y={stone.at.y} width={stone.at.w} height={stone.at.h} rx={stone.at.h / 2} />
      ))}
      <Frame id={first.foundation.key} at={first.foundation.at} rx={4} className="plan-frame--tint" />
      <Words id={first.foundation.name.key} at={first.foundation.name.at} text={first.foundation.name.text} strong />
      <Building house={first.house} />
      <Plate id={first.plate.key} at={first.plate.at} text={first.plate.text} />
      <Frame id={next.foundation.key} at={next.foundation.at} rx={4} className="plan-frame--tint" />
      <Building house={next.house} />
      <Plate id={next.plate.key} at={next.plate.at} text={next.plate.text} />
    </Part>
  );
}

export function BuiltHtml() {
  return (
    <Layer id={groupOf("built-to-last").html}>
      <StoryOf picture="built-to-last" />
      <DashedShape id={B.next.outline.key} at={B.next.outline.at} d={outlinePath} />
    </Layer>
  );
}
