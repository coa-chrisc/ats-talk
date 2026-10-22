/**
 * Slide 23's picture: the dashed tag at the top left; the line from the
 * navy resident through the green staff figure to the closed gate; the
 * request card, the person's mark by the staff figure; the bracket under
 * the trip with its words, the pin at its end and the dashed tag under the
 * pin; and, by the drawings they name, the owner's words, the magnifier and
 * its words, and the words before the gate.
 */
"use client";

import { HumanMark, Part, Person, type Point } from "@/components/deck/kit";
import { ClosedGate } from "../stands/parts-map";
import { OUTCOMES, LENS, PIN } from "./layout-outcomes";
import { Layer, StoryOf } from "./parts";
import { DashedTag, Lens, Line, Pin, RequestCard } from "./parts-outcomes";
import { Label } from "./parts-plan";

const O = OUTCOMES;
type Group = { key: string; anchor: "start" | "middle" | "end"; name: { text: string; at: Point }; caption: { text: string; at: Point } };

/** A name over its caption, as one part. */
function Named({ group }: { group: Group }) {
  return (
    <g data-build={group.key}>
      <Label at={group.name.at} text={group.name.text} anchor={group.anchor} strong />
      <Label at={group.caption.at} text={group.caption.text} anchor={group.anchor} />
    </g>
  );
}

export function OutcomesMarks() {
  return (
    <Part id={O.marks}>
      <DashedTag id={O.tag.key} at={O.tag.at}>
        <Label at={O.tag.project.at} text={O.tag.project.text} anchor="start" strong />
        <Label at={O.tag.link.at} text={O.tag.link.text} anchor="start" />
      </DashedTag>
      <Line id={O.route.key} d={`M${O.route.from.x} ${O.route.from.y}H${O.route.to.x}`} className="fs-route" />
      <g className="fs-resident fs-cast">
        <Person id={O.resident.key} at={O.resident.at} />
      </g>
      <g className="fs-walker fs-cast">
        <Person id={O.staff.key} at={O.staff.at} />
      </g>
      <ClosedGate id={O.gate.key} foot={O.gate.foot} scale={O.gate.scale} />
      <RequestCard id={O.card.key} at={O.card.from} />
      <HumanMark id={O.mark.key} at={O.mark.at} />
      <Line id={O.bracket.key} d={O.bracket.d} className="fs-bracket" />
      <Named group={O.measure} />
      <Pin id={O.pin.key} top={O.pin.top} head={O.pin.head} r={PIN.r} />
      <Named group={O.baseline} />
      <DashedTag id={O.target.key} at={O.target.at}>
        <Label at={O.target.name.at} text={O.target.name.text} anchor="start" strong />
        <Label at={O.target.caption.at} text={O.target.caption.text} anchor="start" />
      </DashedTag>
      <Named group={O.owner} />
      <Lens id={O.lens.key} at={O.lens.at} r={LENS.r} handle={LENS.handle} />
      <Named group={O.quality} />
      <Named group={O.expansion} />
    </Part>
  );
}

export function OutcomesHtml() {
  return (
    <Layer id={O.html}>
      <StoryOf picture="outcomes" />
    </Layer>
  );
}
