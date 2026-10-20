/** Slide 4a's picture: the fenced yard with the leads building the application, the reviewers checking it and the person approving it; the tag on the fence; the partner plates under it, the dashed one apart; and the stair of gates at the right with its grey tag. */
"use client";

import { Agent, Dashed, HumanMark, Part, Person } from "@/components/deck/kit";
import { FLEET, GATE, REVIEWER_R } from "./layout-fleet";
import { Layer, StoryOf, Stroke, Tagged, Words } from "./parts";
import { Fence, Plate, Slot, StairStep } from "./parts-figures";

const F = FLEET;
const S = F.stair;

export function FleetMarks() {
  return (
    <Part id={F.marks}>
      <Fence id={F.fence.key} at={F.fence.at} posts={F.fence.posts} />
      <Words id={F.name.key} at={F.name.at} text={F.name.text} anchor="start" size="text" strong />
      <Words id={F.built.key} at={F.built.at} text={F.built.text} anchor="start" soft />
      <rect className="sd-app" data-build={F.app.key} x={F.app.at.x} y={F.app.at.y} width={F.app.at.w} height={F.app.at.h} rx={8} />
      {F.app.slots.map((slot) => (
        <Slot key={slot.key} id={slot.key} at={slot.at} />
      ))}
      <rect className="sd-checked" data-build={F.checked.key} x={F.checked.at.x} y={F.checked.at.y} width={F.checked.at.w} height={F.checked.at.h} rx={12} pathLength={1} />
      {F.leads.keys.map((key, i) => (
        <Agent key={key} id={key} at={F.leads.at[i]} role="builder" hue="process" />
      ))}
      <Words id={F.leads.name.key} at={F.leads.name.at} text={F.leads.name.text} strong />
      {F.reviewers.keys.map((key, i) => (
        <Agent key={key} id={key} at={F.reviewers.at[i]} role="reviewer" r={REVIEWER_R} />
      ))}
      <Words id={F.reviewers.name.key} at={F.reviewers.name.at} text={F.reviewers.name.text} strong />
      <Person id={F.person.key} at={F.person.at} />
      <HumanMark id={F.mark.key} at={F.mark.at} label={F.mark.text} />
      <Tagged id={F.overYears.key} at={F.overYears.at} text={F.overYears.text} tone="plain" />
      {F.plates.map((plate) => (
        <Plate key={plate.key} id={plate.key} at={plate.at} text={plate.text} />
      ))}
      <Words id={F.joining.caption.key} at={F.joining.caption.at} text={F.joining.caption.text} anchor="start" soft />
      <Stroke id={S.floor.key} from={{ x: S.floor.x0, y: S.floor.y }} to={{ x: S.floor.x1, y: S.floor.y }} className="sd-floor" />
      {S.steps.map((step) => (
        <StairStep key={step.key} id={step.key} at={step.at} gate={step.gate.at} name={step.name.at} text={step.text} size={GATE} />
      ))}
      <Tagged id={S.tag.key} at={S.tag.at} text={S.tag.text} tone="grey" />
    </Part>
  );
}

export function FleetHtml() {
  return (
    <Layer id={F.html}>
      <Dashed id={F.joining.key} at={F.joining.at} rx={8}>
        <span className="sd-dashed-name">{F.joining.text}</span>
      </Dashed>
      <StoryOf picture="fleet" />
    </Layer>
  );
}
