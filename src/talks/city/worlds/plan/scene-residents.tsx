/** Slide 21a's picture: the desk with its member of staff and their agent, the resident across the fence, the card that crosses it, the orange mark over the member of staff, and the checklist under its heading. */
"use client";

import { Agent, HumanMark, Part, PassTick } from "@/components/deck/kit";
import { Fence } from "../../../bchc/worlds/start/parts-safe";
import { groupOf } from "./layout";
import { RESIDENTS } from "./layout-residents";
import { Figure, Frame, Layer, StoryOf, Words } from "./parts";

const R = RESIDENTS;

export function ServiceMarks() {
  const { marks } = groupOf("residents");
  const { staff, desk, helper, resident, fence, card, list } = R;
  return (
    <Part id={marks}>
      <Figure id={staff.key} at={staff.at} />
      <Frame id={desk.key} at={desk.at} rx={4} className="plan-frame--solid" />
      <Words id={staff.name.key} at={staff.name.at} text={staff.name.text} />
      <Agent id={helper.key} at={helper.at} role="builder" hue="process" />
      <Words id={helper.name.key} at={helper.name.at} text={helper.name.text} />
      <g data-build={resident.key}>
        <Figure at={resident.at} drawn />
      </g>
      <Words id={resident.name.key} at={resident.name.at} text={resident.name.text} />
      <Fence id={fence.key} d={fence.d} posts={fence.posts} />
      <Words id={fence.name.key} at={fence.name.at} text={fence.name.text} />
      <Frame id={list.key} at={list.at} className="plan-frame--solid" />
      <Words id={list.heading.key} at={list.heading.at} text={list.heading.text} anchor="start" strong />
      {list.rows.map((row) => (
        <g key={row.key} data-build={row.key}>
          <rect className="plan-tickbox" x={row.box.x} y={row.box.y} width={row.box.w} height={row.box.h} rx={4} />
          <Words at={row.at} text={row.text} anchor="start" />
        </g>
      ))}
      {list.rows.map((row) => (
        <PassTick key={row.tick} id={row.tick} at={row.centre} r={16} />
      ))}
      <g data-build={card.key}>
        <rect className="plan-card" x={card.at.x} y={card.at.y} width={card.at.w} height={card.at.h} rx={10} />
        <Words at={{ x: card.at.x + card.at.w / 2, y: card.at.y + card.at.h / 2 }} text={card.text} strong />
      </g>
      <HumanMark id={R.mark.key} at={R.mark.at} />
    </Part>
  );
}

export function ServiceHtml() {
  return (
    <Layer id={groupOf("residents").html}>
      <StoryOf picture="residents" />
    </Layer>
  );
}
