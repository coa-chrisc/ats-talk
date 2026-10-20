/** Slide 6's picture: the large figure at the top left with its caption; three plain cards to its right, each with its grey band, its case name, its one line and its grey tag; and the single line under the three with its words. */
"use client";

import { Part } from "@/components/deck/kit";
import { FIGURE, STUMBLED } from "./layout-stumbled";
import { Card, Figure, Layer, Note, StoryOf, Stroke } from "./parts";

const S = STUMBLED;

export function StumbledMarks() {
  return (
    <Part id={S.marks}>
      <Figure id={S.figure.key} at={S.figure.first} second={S.figure.second} runs={S.figure.runs} size={FIGURE.size} small={FIGURE.small} />
      {S.cards.map((card) => (
        <Card key={card.key} id={card.key} at={card.at} band={card.band} />
      ))}
      <Stroke id={S.line.key} from={{ x: S.line.x0, y: S.line.y }} to={{ x: S.line.x1, y: S.line.y }} className="en-rule" />
    </Part>
  );
}

export function StumbledHtml() {
  return (
    <Layer id={S.html}>
      <StoryOf picture="stumbled" />
      <Note id={S.figure.caption.key} at={S.figure.caption.at} size="text">
        {S.figure.caption.text}
      </Note>
      {S.cards.map((card) => (
        <div key={card.key}>
          <Note id={card.name.key} at={card.name.at} size="name">
            {card.name.text}
          </Note>
          <Note id={card.what.key} at={card.what.at}>
            {card.what.text}
          </Note>
          <Note id={card.tag.key} at={card.tag.at} size="tag" className="en-tag">
            {card.tag.text}
          </Note>
        </div>
      ))}
      <Note id={S.label.key} at={S.label.at} size="text" align="center" strong>
        {S.label.text}
      </Note>
    </Layer>
  );
}
