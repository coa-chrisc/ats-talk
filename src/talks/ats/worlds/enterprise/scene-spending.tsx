/** Slide 3's picture: the two columns on their floor, each carrying its name and figure over its top and its year under its foot, the pair captioned under the years; and under a heading the three-part bar at the right, each part named over it and captioned under the floor. */
"use client";

import { Part } from "@/components/deck/kit";
import { SPENDING } from "./layout-spending";
import { BarPart, Column, Layer, Outline, StoryOf, Stroke, Words } from "./parts";

const S = SPENDING;
const B = S.bar;

export function SpendingMarks() {
  return (
    <Part id={S.marks}>
      <Stroke id={S.floor.key} from={{ x: S.floor.x0, y: S.floor.y }} to={{ x: S.floor.x1, y: S.floor.y }} className="en-floor" />
      {S.columns.map((column) => [
        <Column key={column.key} id={column.key} at={column.at} />,
        <Words key={column.name.key} id={column.name.key} at={column.name.at} text={column.name.text} tone="soft" />,
        <Words key={column.figure.key} id={column.figure.key} at={column.figure.at} text={column.figure.text} size="text" strong tone="catalog" />,
        <Words key={column.year.key} id={column.year.key} at={column.year.at} text={column.year.text} size="text" strong />,
      ])}
      <Words id={S.ofIt.key} at={S.ofIt.at} text={S.ofIt.text} size="text" />
      <Words id={S.heading.key} at={S.heading.at} text={S.heading.text} anchor="start" size="text" strong />
      {B.parts.map((part) => (
        <BarPart key={part.key} id={part.key} at={part.at} own={part.own} />
      ))}
      <Outline id={B.key} at={B.at} className="en-bar" />
      {B.splits.map((split) => (
        <Stroke key={split.key} id={split.key} from={{ x: split.x, y: B.at.y }} to={{ x: split.x, y: B.at.y + B.at.h }} className="en-split" />
      ))}
      {B.parts.map((part) => [
        <Words key={part.name.key} id={part.name.key} at={part.name.at} text={part.name.text} size="text" strong />,
        <Words key={part.caption.key} id={part.caption.key} at={part.caption.at} text={part.caption.text} anchor={part.caption.anchor} tone="soft" />,
      ])}
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
