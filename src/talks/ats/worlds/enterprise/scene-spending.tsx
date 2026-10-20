/** Slide 3's picture: the two columns on their floor, named over their tops and captioned under it; the large figure beside them with its caption; and the three-part bar at the right, each part named, the middle one bracketed and captioned. */
"use client";

import { Part } from "@/components/deck/kit";
import { FIGURE, SPENDING } from "./layout-spending";
import { BarPart, Bracket, Column, Figure, Layer, Outline, StoryOf, Stroke, Words } from "./parts";

const S = SPENDING;
const B = S.bar;

export function SpendingMarks() {
  return (
    <Part id={S.marks}>
      {S.columns.map((column) => [
        <Column key={column.key} id={column.key} at={column.at} />,
        <Words key={column.name.key} id={column.name.key} at={column.name.at} text={column.name.text} size="text" strong tone="catalog" />,
      ])}
      <Stroke id={S.floor.key} from={{ x: S.floor.x0, y: S.floor.y }} to={{ x: S.floor.x1, y: S.floor.y }} className="en-floor" />
      <Words id={S.ofIt.key} at={S.ofIt.at} text={S.ofIt.text} size="text" />
      <Figure id={S.figure.key} at={S.figure.at} runs={S.figure.runs} size={FIGURE.size} small={FIGURE.small} />
      <Words id={S.figure.caption.key} at={S.figure.caption.at} text={S.figure.caption.text} anchor="start" size="text" />
      {B.parts.map((part) => (
        <BarPart key={part.key} id={part.key} at={part.at} own={part.own} />
      ))}
      <Outline id={B.key} at={B.at} className="en-bar" />
      {B.splits.map((split) => (
        <Stroke key={split.key} id={split.key} from={{ x: split.x, y: B.at.y }} to={{ x: split.x, y: B.at.y + B.at.h }} className="en-split" />
      ))}
      {B.parts.map((part) => (
        <Words key={part.name.key} id={part.name.key} at={part.name.at} text={part.name.text} size="text" strong />
      ))}
      <Bracket id={B.bracket.key} x0={B.bracket.x0} x1={B.bracket.x1} y={B.bracket.y} drop={B.bracket.drop} />
      <Words id={B.caption.key} at={B.caption.at} text={B.caption.text} size="text" />
    </Part>
  );
}

export function SpendingHtml() {
  return (
    <Layer id={S.html}>
      <StoryOf picture="spending" />
    </Layer>
  );
}
