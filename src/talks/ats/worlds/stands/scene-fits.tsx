/** Slide 14's picture: the two columns, headed and ruled, each pair across the middle line joined to its passed tick; the grey tag at the foot. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { FITS } from "./layout-fits";
import { Layer, StoryOf, Stroke, Tagged, Words } from "./parts";

const F = FITS;

export function FitsMarks() {
  return (
    <Part id={F.marks}>
      {F.heads.flatMap((head) => [
        <Words key={head.key} id={head.key} at={head.at} text={head.text} anchor={head.anchor} size="text" strong />,
        <Stroke key={head.rule.key} id={head.rule.key} from={head.rule.from} to={head.rule.to} className="sn-head-rule" />,
      ])}
      {F.pairs.flatMap((pair) => [
        <Words key={pair.ask.key} id={pair.ask.key} at={pair.ask.at} text={pair.ask.text} anchor="end" size="text" />,
        <Words key={pair.has.key} id={pair.has.key} at={pair.has.at} text={pair.has.text} anchor="start" size="text" />,
        ...pair.joins.map((join) => <Stroke key={join.key} id={join.key} from={join.from} to={join.to} className="sn-join" />),
        <PassTick key={pair.tick.key} id={pair.tick.key} at={pair.tick.at} r={pair.tick.r} />,
      ])}
      <Tagged id={F.connects.key} at={F.connects.at} text={F.connects.text} tone="grey" />
    </Part>
  );
}

export function FitsHtml() {
  return (
    <Layer id={F.html}>
      <StoryOf picture="fits" />
    </Layer>
  );
}
