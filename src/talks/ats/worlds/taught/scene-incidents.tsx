/** Slide 8's picture: three tall plain cards standing apart, each with its grey band, its case name, its one line and its grey tag; and the single line under all three with its words. */
"use client";

import { Part } from "@/components/deck/kit";
import { INCIDENTS } from "./layout-incidents";
import { Card, Rule } from "./parts-draw";
import { Layer, Note, StoryOf } from "./parts";

const I = INCIDENTS;

export function IncidentsMarks() {
  return (
    <Part id={I.marks}>
      {I.cards.map((card) => (
        <Card key={card.key} id={card.key} at={card.at} band={card.band} />
      ))}
      <Rule id={I.line.key} y={I.line.y} x0={I.line.x0} x1={I.line.x1} />
    </Part>
  );
}

export function IncidentsHtml() {
  return (
    <Layer id={I.html}>
      <StoryOf picture="incidents" />
      {I.cards.map((card) => (
        <div key={card.key}>
          <Note id={card.name.key} at={card.name.at} size="name">
            {card.name.text}
          </Note>
          <Note id={card.what.key} at={card.what.at}>
            {card.what.text}
          </Note>
          <Note id={card.tag.key} at={card.tag.at} size="tag" className="tg-tag">
            {card.tag.text}
          </Note>
        </div>
      ))}
      <Note id={I.label.key} at={I.label.at} size="text" align="center" strong>
        {I.label.text}
      </Note>
    </Layer>
  );
}
