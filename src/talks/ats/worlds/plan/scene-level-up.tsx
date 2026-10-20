/** Slide 14's picture: the pyramid's three tiers, each with its lit fill, name and caption; the row of developers at their desks, named once; the tag over the row in its two states; the slab under the desks; and the figure with its caption at the foot. */
"use client";

import { Part, Person } from "@/components/deck/kit";
import { LEVEL_UP } from "./layout-level-up";
import { Desk, Layer, Outline, Shape, StoryOf, TagShape, Words } from "./parts";

const L = LEVEL_UP;

export function LevelUpMarks() {
  return (
    <Part id={L.marks}>
      {L.tiers.map((tier) => (
        <g key={tier.key}>
          <Outline id={tier.key} points={tier.points} className="pl-tier" />
          <Shape id={tier.lit} points={tier.points} className="pl-tier__lit" />
          <Words id={tier.name.key} at={tier.name.at} text={tier.name.text} strong />
          <Words id={tier.caption.key} at={tier.caption.at} text={tier.caption.text} anchor="start" />
        </g>
      ))}
      <Words id={L.label.key} at={L.label.at} text={L.label.text} anchor="start" strong />
      <TagShape id={L.tag.grey.key} at={L.tag.at} text={L.tag.grey.text} kind="grey" />
      <TagShape id={L.tag.green.key} at={L.tag.at} text={L.tag.green.text} kind="green" />
      <g data-build={L.slab.key}>
        <rect className="pl-slab" x={L.slab.at.x} y={L.slab.at.y} width={L.slab.at.w} height={L.slab.at.h} rx={8} />
        <Words at={L.slab.label.at} text={L.slab.label.text} tone="white" strong />
      </g>
      <g data-build={L.row.key}>
        {L.row.desks.map((desk) => (
          <g key={desk.key} data-build={desk.key}>
            <Person id={`${desk.key}.person`} at={desk.person} />
            <Desk top={desk.top} foot={desk.foot} laptop={desk.laptop} />
          </g>
        ))}
      </g>
      <Words id={L.figure.key} at={L.figure.at} text={L.figure.text} anchor="end" tone="indigo" strong size="figure" />
      <Words id={L.caption.key} at={L.caption.at} text={L.caption.text} anchor="start" />
    </Part>
  );
}

export function LevelUpHtml() {
  return (
    <Layer id={L.html}>
      <StoryOf picture="level-up" />
    </Layer>
  );
}
