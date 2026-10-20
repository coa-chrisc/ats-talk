/** Slide 15's picture: two idea cards, each sitting on the stack of three layers it lifts to show; a deep-green tick on each layer that passes and a grey gap mark where one does not; and each card's verdict under its stack. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { UNDERNEATH } from "./layout-underneath";
import { GapMark, IdeaCard, Stratum } from "./parts-cards";
import { Layer, StoryOf, Words } from "./parts";

const U = UNDERNEATH;
const isGap = (column: number, layer: number) => column === U.gap.column && layer === U.gap.layer;

export function UnderneathMarks() {
  return (
    <Part id={U.marks}>
      {U.cards.map((card, column) => (
        <g key={card.key}>
          {card.layers.map((layer, i) => (
            <Stratum key={layer.key} id={layer.key} at={layer.at} text={layer.text} name={layer.name} gap={isGap(column, i) ? U.gap.key : undefined} />
          ))}
          {card.layers.map((layer, i) =>
            isGap(column, i) ? <GapMark key={layer.mark.key} id={layer.mark.key} at={layer.mark.at} r={U.mark.r} /> : <PassTick key={layer.mark.key} id={layer.mark.key} at={layer.mark.at} r={U.mark.r} />,
          )}
          <IdeaCard id={card.key} at={card.at} origin={card.origin} />
          <Words id={card.verdict.key} at={card.verdict.at} text={card.verdict.text} size="text" strong />
        </g>
      ))}
    </Part>
  );
}

export function UnderneathHtml() {
  return (
    <Layer id={U.html}>
      <StoryOf picture="underneath" />
    </Layer>
  );
}
