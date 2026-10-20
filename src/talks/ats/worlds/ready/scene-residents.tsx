/** Slide 26's picture: the floor; the member of staff seated behind the desk with the green helper beside them and the orange mark above them; the low fence on the floor; the resident across it; the card that crosses it; and the test's heading with its question under it. */
"use client";

import { Agent, HumanMark, Part } from "@/components/deck/kit";
import { HELPER_R, RESIDENTS } from "./layout-residents";
import { Figure, Layer, StoryOf, Words } from "./parts";
import { TEXT_LINE } from "./layout";
import { Lines } from "./parts-applied";
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
      <Lines id={list.question.key} at={list.question.at} lines={list.question.lines} pitch={TEXT_LINE} size="text" />
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
