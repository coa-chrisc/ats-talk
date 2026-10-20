/**
 * Slide 20's picture: the square chart, its two sides named, the lines
 * between its quarters and each quarter's name; its top right quarter's
 * green wash; the ideas as dots, drawn where they settle and moved back to
 * the column at the left until they fly; and the checklist at the right,
 * each row a box, its words and a rule, the box taking the passed tick.
 */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { DOT_R, LIST_BOX, SORT } from "./layout-sort";
import { Layer, StoryOf, Words } from "./parts";

const S = SORT;
const C = S.chart;

export function SortMarks() {
  return (
    <Part id={S.marks}>
      <rect className="fs-corner" data-build={S.corner.key} x={S.corner.at.x} y={S.corner.at.y} width={S.corner.at.w} height={S.corner.at.h} />
      <path className="fs-mid dk-draw" data-build={C.mid.key} d={C.mid.d} pathLength={1} />
      <path className="fs-axes dk-draw" data-build={C.key} d={C.d} pathLength={1} />
      <Words id={C.value.key} at={C.value.at} text={C.value.text} size="text" strong turn={-90} />
      <Words id={C.readiness.key} at={C.readiness.at} text={C.readiness.text} anchor="start" size="text" strong />
      {S.quarters.map((quarter) => (
        <Words key={quarter.key} id={quarter.key} at={quarter.name} text={quarter.text} size="text" strong />
      ))}
      {S.dots.map((dot) => (
        <circle key={dot.key} className="fs-dot" data-build={dot.key} cx={dot.at.x} cy={dot.at.y} r={DOT_R} />
      ))}
      {S.list.map((row) => (
        <g key={row.key} data-build={row.key}>
          <path className="fs-list__rule" d={row.rule.d} />
          <rect className="fs-list__box" x={row.check.x} y={row.check.y} width={row.check.w} height={row.check.h} rx={8} />
          <text className="dk-text fs-word" x={row.words.x} y={row.words.y} dominantBaseline="central">
            {row.text}
          </text>
        </g>
      ))}
      {S.list.map((row) => (
        <PassTick key={row.tick.key} id={row.tick.key} at={row.tick.at} r={LIST_BOX / 2 - 2} />
      ))}
    </Part>
  );
}

export function SortHtml() {
  return (
    <Layer id={S.html}>
      <StoryOf picture="sort" />
    </Layer>
  );
}
