/** Slide 16's picture: slide 13's wall again, smaller, its cards turning into dots; the square chart they fly onto, its two sides named; and its top right quarter, washed green and named. */
"use client";

import { Part } from "@/components/deck/kit";
import { DOT_R, SORT } from "./layout-sort";
import { Dot, GreyTag, IdeaCard } from "./parts-cards";
import { Layer, StoryOf, Words } from "./parts";

const S = SORT;
const C = S.chart;

export function SortMarks() {
  return (
    <Part id={S.marks}>
      <rect className="method-corner" data-build={S.corner.key} x={S.corner.at.x} y={S.corner.at.y} width={S.corner.at.w} height={S.corner.at.h} />
      <path className="method-mid dk-draw" data-build={C.mid.key} d={C.mid.d} pathLength={1} />
      <path className="method-axes dk-draw" data-build={C.key} d={C.d} pathLength={1} />
      <Words id={C.impact.key} at={C.impact.at} text={C.impact.text} strong turn={-90} />
      <Words id={C.feasibility.key} at={C.feasibility.at} text={C.feasibility.text} anchor="start" strong />
      <Words id={S.start.key} at={S.start.at} text={S.start.text} anchor="start" size="text" strong />
      <g data-build={S.wall.key}>
        <rect className="method-wall" x={S.wall.at.x} y={S.wall.at.y} width={S.wall.at.w} height={S.wall.at.h} rx={10} />
        {S.cards.map((card) => (
          <IdeaCard key={card.key} id={card.key} at={card.at} tilt={card.tilt}>
            {card.tag && <GreyTag at={card.tag} />}
          </IdeaCard>
        ))}
      </g>
      {S.cards.map((card) => (
        <Dot key={card.dot.key} id={card.dot.key} at={card.dot.at} r={DOT_R} />
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
