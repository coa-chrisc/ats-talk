/** A left-to-right explanation; captions stay attached to the people and work they describe. */
"use client";
import { HumanMark, Part } from "@/components/deck/kit";
import { RESIDENTS as R } from "./layout-residents";
import { Figure, Layer, StoryOf, Words } from "./parts";

export function ResidentsMarks() {
  return (
    <Part id={R.marks}>
      {R.stages.map((s, i) => (
        <g key={s.key} data-build={s.key}>
          {i === 0 ? <g className="rd-draft">
            <rect x={s.icon.x} y={s.icon.y} width={s.icon.w} height={s.icon.h} rx={8} />
            <path d={`M${s.x - 25} 574h50M${s.x - 25} 598h50M${s.x - 25} 622h32`} />
          </g> : <Figure at={s.icon} drawn />}
          <Words at={s.titleAt} text={s.title} size="text" strong />
          {s.lines.map((line, n) => <Words key={line} at={{ x: s.x, y: s.captionY + n * 40 }} text={line} size="text" />)}
        </g>
      ))}
      {R.arrows.map((a) => <path key={a.key} data-build={a.key} className="rd-service-arrow dk-draw" d={a.d} pathLength={1} />)}
      <HumanMark id={R.mark.key} at={R.mark.at} />
      <g data-build={R.question.key}>
        <Words at={R.question.headingAt} text={R.question.heading} strong />
        <Words at={R.question.at} text={R.question.text} size="text" strong />
      </g>
    </Part>
  );
}
export function ResidentsHtml() {
  return <Layer id={R.html}><StoryOf picture="residents" /></Layer>;
}
