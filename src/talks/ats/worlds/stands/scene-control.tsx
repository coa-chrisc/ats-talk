/** Slide 11a's picture: the post with its tick and name, the four city nameplates, the grey gauge with its needle, figure and caption; the stair with its name, caption and climber, the indigo figure on two rows and its caption, and the plain tag at the foot. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { BIG, CAPTION_PITCH, CLIMBER, CONTROL, GAUGE } from "./layout-control";
import { Big, Layer, Rows, StoryOf, Stroke, Tagged, Words } from "./parts";
import { ClimbStep, Climber, FencePost, Gauge, Host } from "./parts-figures";

const C = CONTROL;
const G = C.gauge;
const S = C.stair;

export function ControlMarks() {
  return (
    <Part id={C.marks}>
      <FencePost id={C.post.key} x={C.post.x} w={C.post.w} top={C.post.top} foot={C.post.foot} />
      <PassTick id={C.post.tick.key} at={C.post.tick.at} r={C.post.tick.r} />
      <Words id={C.post.name.key} at={C.post.name.at} text={C.post.name.text} anchor="start" size="text" strong />
      {C.cities.map((city) => (
        <Host key={city.key} id={city.key} at={city.at} text={city.text} />
      ))}
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
      <Rows id={C.big.key} at={C.big.at} rows={C.big.rows} pitch={BIG.pitch} anchor="end" size="text" extra="sn-big" />
      <Words id={C.big.caption.key} at={C.big.caption.at} text={C.big.caption.text} anchor="end" soft />
      <Tagged id={C.budget.key} at={C.budget.at} text={C.budget.text} tone="plain" />
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
