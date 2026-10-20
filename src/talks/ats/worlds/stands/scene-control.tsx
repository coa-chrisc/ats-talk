/** Slide 11a's picture: the post with its tick and name, its closed gate on the ground line and the grey paths worn round it, named; the grey gauge with its needle, figure and caption; the stair with its name, caption and climber, the green eye over it with its name, and the indigo figure with its caption. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { BIG, CAPTION_PITCH, CLIMBER, CONTROL, EYE, GAUGE } from "./layout-control";
import { Big, Layer, Rows, StoryOf, Stroke, Words } from "./parts";
import { ClimbStep, Climber, Eye, FencePost, Gate, Gauge, WornPath } from "./parts-figures";

const C = CONTROL;
const G = C.gauge;
const S = C.stair;

export function ControlMarks() {
  return (
    <Part id={C.marks}>
      {C.paths.map((path) => (
        <WornPath key={path.key} id={path.key} d={path.d} />
      ))}
      <Stroke id={C.ground.key} from={{ x: C.ground.x0, y: C.ground.y }} to={{ x: C.ground.x1, y: C.ground.y }} className="sn-floor" />
      <FencePost id={C.post.key} x={C.post.x} w={C.post.w} top={C.post.top} foot={C.post.foot} />
      <PassTick id={C.post.tick.key} at={C.post.tick.at} r={C.post.tick.r} />
      <Words id={C.post.name.key} at={C.post.name.at} text={C.post.name.text} anchor="start" size="text" strong />
      <Gate id={C.gate.key} at={C.gate.at} bars={C.gate.bars} latch={C.gate.latch} />
      <Words id={C.shadow.key} at={C.shadow.at} text={C.shadow.text} anchor="start" size="text" strong />
      <Words id={C.shadow.caption.key} at={C.shadow.caption.at} text={C.shadow.caption.text} anchor="start" soft />
      <Gauge id={G.key} track={G.track} reached={{ id: G.reached.key, d: G.reached.d }} needle={{ id: G.needle.key }} cx={G.cx} cy={G.cy} length={GAUGE.needle} hub={GAUGE.hub} />
      <Big id={G.figure.key} at={G.figure.at} text={G.figure.text} className="sn-gauge-figure" />
      <Rows id={G.caption.key} at={G.caption.at} rows={G.caption.rows} pitch={CAPTION_PITCH} soft />
      <Stroke id={S.floor.key} from={{ x: S.floor.x0, y: S.floor.y }} to={{ x: S.floor.x1, y: S.floor.y }} className="sn-floor" />
      {S.steps.map((step) => (
        <ClimbStep key={step.key} id={step.key} at={step.at} />
      ))}
      <Words id={S.name.key} at={S.name.at} text={S.name.text} anchor="start" size="text" strong />
      <Words id={S.caption.key} at={S.caption.at} text={S.caption.text} anchor="start" soft />
      <Climber id={C.climber.key} at={C.climber.at} w={CLIMBER.w} h={CLIMBER.h} />
      <Eye id={C.eye.key} at={C.eye.at} w={EYE.w} h={EYE.h} iris={EYE.iris} pupil={EYE.pupil} />
      <Words id={C.eye.name.key} at={C.eye.name.at} text={C.eye.name.text} anchor="start" size="text" strong />
      <Rows id={C.big.key} at={C.big.at} rows={C.big.rows} pitch={BIG.pitch} anchor="end" size="text" extra="sn-big" />
      <Rows id={C.big.caption.key} at={C.big.caption.at} rows={C.big.caption.rows} pitch={CAPTION_PITCH} anchor="end" soft />
    </Part>
  );
}

export function ControlHtml() {
  return (
    <Layer id={C.html}>
      <StoryOf picture="control" />
    </Layer>
  );
}
