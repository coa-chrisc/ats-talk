/**
 * What slide 5a draws (layout-weekly.ts): its marks as one SVG part and its
 * HTML as one layer. Every word comes from the layout, which reads the
 * script.
 */
"use client";

import { Part, Person } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { WEEKLY } from "./layout-weekly";
import { Group, Label, StoryOf } from "./parts";

export function WeeklyMarks() {
  const { weeks, marks, floor, steps, door, figure } = WEEKLY;
  return (
    <Part id={groupOf("weekly").marks}>
      {weeks.at.map((week) => (
        <rect key={`${week.x} ${week.y}`} className="built-week" data-build={weeks.key} x={week.x} y={week.y} width={week.w} height={week.h} rx={4} />
      ))}
      {marks.at.map((mark) => (
        <circle key={`${mark.x} ${mark.y}`} className="built-meeting" data-build={marks.key} cx={mark.x} cy={mark.y} r={5} />
      ))}
      <path className="built-ground dk-draw" data-build={floor.key} d={floor.d} pathLength={1} />
      {steps.map((step) => (
        <rect key={step.key} className="built-step dk-draw" data-build={step.key} x={step.at.x} y={step.at.y} width={step.at.w} height={step.at.h} pathLength={1} />
      ))}
      <g className="built-door" data-build={door.key}>
        <rect className="built-door__leaf" x={door.at.x} y={door.at.y} width={door.at.w} height={door.at.h} rx={4} />
        <circle className="built-door__knob" cx={door.knob.x} cy={door.knob.y} r={6} />
      </g>
      <Person id={figure.key} at={figure.at} />
    </Part>
  );
}

export function WeeklyHtml() {
  const { names, every, steps, door } = WEEKLY;
  return (
    <Group id={groupOf("weekly").html}>
      {names.map((name) => (
        <Label key={name.key} id={name.key} at={name.at} size="text">
          {name.text}
        </Label>
      ))}
      <Label id={every.key} at={every.at} align="left">
        {every.text}
      </Label>
      {steps.map((step) => (
        <Label key={step.label.key} id={step.label.key} at={step.label.at} className="built-word--strong">
          {step.label.text}
        </Label>
      ))}
      <Label id={door.go.key} at={door.go.at} size="key">
        {door.go.text}
      </Label>
      <Label id={door.demand.key} at={door.demand.at} tone="soft" className="built-tag">
        {door.demand.text}
      </Label>
      <StoryOf picture="weekly" />
    </Group>
  );
}
