/** Slide 18's picture: the floor; the member of staff seated behind the desk with the green helper beside them and the orange mark above them; the low fence on the floor; the resident across it; the card that crosses it; and the checklist heading with its two ticked lines. */
"use client";

import { Agent, HumanMark, Part, PassTick } from "@/components/deck/kit";
import { HELPER_R, RESIDENTS } from "./layout-residents";
import { Figure, Layer, StoryOf, Words } from "./parts";
import { Desk, Floor, PicketFence, ServiceCard } from "./parts-residents";

const R = RESIDENTS;

export function ResidentsMarks() {
  const { floor, staff, desk, helper, resident, fence, card, list } = R;
  return (
    <Part id={R.marks}>
      <Floor id={floor.key} d={floor.d} />
      <Figure id={staff.key} at={staff.at} />
      <Desk id={desk.key} slab={desk.slab} body={desk.body} />
      <Words id={staff.name.key} at={staff.name.at} text={staff.name.text} strong />
      <Agent id={helper.key} at={helper.at} role="builder" hue="process" r={HELPER_R} />
      <Words id={helper.name.key} at={helper.name.at} text={helper.name.text} tone="process" strong />
      <g data-build={resident.key}>
        <Figure at={resident.at} drawn />
      </g>
      <Words id={resident.name.key} at={resident.name.at} text={resident.name.text} strong />
      <PicketFence id={fence.key} rail={fence.rail} pickets={fence.pickets} origin={fence.origin} />
      <Words id={fence.name.key} at={fence.name.at} text={fence.name.text} />
      <Words id={list.heading.key} at={list.heading.at} text={list.heading.text} anchor="start" size="text" strong />
      {list.rows.map((row) => (
        <Words key={row.key} id={row.key} at={row.at} text={row.text} anchor="start" size="text" />
      ))}
      {list.rows.map((row) => (
        <PassTick key={row.tick} id={row.tick} at={row.centre} r={row.r} />
      ))}
      <ServiceCard id={card.key} at={card.at} text={card.text} />
      <HumanMark id={R.mark.key} at={R.mark.at} />
    </Part>
  );
}

export function ResidentsHtml() {
  return (
    <Layer id={R.html}>
      <StoryOf picture="residents" />
    </Layer>
  );
}
