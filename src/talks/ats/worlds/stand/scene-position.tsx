/** Slide 3's picture: the track from above, its white start stripe, the pack far round the lap and the large home runner at the start, each named; the grey tag in the infield; the fence post beside the start with its tick and name; the budget figure in the infield. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { BUDGET, POSITION, RUNNER } from "./layout-position";
import { Figure, Layer, StoryOf, Tagged, Words } from "./parts";
import { FencePost, Runner } from "./parts-figures";

const P = POSITION;
const T = P.track;

export function PositionMarks() {
  return (
    <Part id={P.marks}>
      <g data-build={T.key}>
        <path className="sd-track__lanes" d={`${T.d.outer}${T.d.inner}`} />
        <path className="sd-track__lane" d={T.d.middle} />
        <path className="sd-track__edge dk-draw" d={T.d.outer} pathLength={1} />
        <path className="sd-track__edge dk-draw" d={T.d.inner} pathLength={1} />
      </g>
      <g data-build={P.start.key}>
        <path className="sd-start dk-draw" d={`M${P.start.x} ${P.start.y0}V${P.start.y1}`} pathLength={1} />
        <path className="sd-start sd-start--stripe dk-draw" d={`M${P.start.x} ${P.start.y0 + 3}V${P.start.y1 - 3}`} pathLength={1} />
      </g>
      {P.pack.keys.map((key, i) => (
        <Runner key={key} id={key} at={P.pack.at[i]} h={RUNNER.small} tone="catalog" facing={P.pack.facing} />
      ))}
      <Words id={P.pack.name.key} at={P.pack.name.at} text={P.pack.name.text} size="text" strong />
      <Runner id={P.city.key} at={P.city.at} h={RUNNER.large} tone="process" />
      <Words id={P.city.name.key} at={P.city.name.at} text={P.city.name.text} size="text" strong />
      <Tagged id={P.tag.key} at={P.tag.at} text={P.tag.text} tone="grey" />
      <FencePost id={P.post.key} x={P.post.x} w={P.post.w} top={P.post.top} foot={P.post.foot} />
      <Words id={P.post.name.key} at={P.post.name.at} text={P.post.name.text} anchor="start" strong />
      <PassTick id={P.post.tick.key} at={P.post.tick.at} r={P.post.tick.r} />
      <Figure id={P.budget.key} at={P.budget.at} runs={P.budget.runs} size={BUDGET.size} small={BUDGET.small} tone="catalog" anchor="end" />
      <Words id={P.budget.caption.key} at={P.budget.caption.at} text={P.budget.caption.text} anchor="end" size="text" />
    </Part>
  );
}

export function PositionHtml() {
  return (
    <Layer id={P.html}>
      <StoryOf picture="position" />
    </Layer>
  );
}
