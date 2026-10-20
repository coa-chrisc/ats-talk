/**
 * What slide 9 draws (layout-too-long.ts): its marks as one SVG part and
 * its HTML as one layer. Each day is an outline drawn on, with a fill
 * behind it that grows from its left as the day passes. Every word comes
 * from the layout, which reads the script.
 */
"use client";

import { Part, Person } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { TOO_LONG } from "./layout-too-long";
import { Arrow, Group, Label, StoryOf } from "./parts";

export function TooLongMarks() {
  const { days, team, table, meets, holds, app, loops, arrive } = TOO_LONG;
  const [first, second] = loops;
  return (
    <Part id={groupOf("too-long").marks}>
      {days.map((day) => (
        <rect key={day.fill} className="built-cell__fill" data-build={day.fill} x={day.at.x} y={day.at.y} width={day.at.w} height={day.at.h} rx={8} />
      ))}
      {days.map((day) => (
        <rect key={day.key} className="built-weekday dk-draw" data-build={day.key} x={day.at.x} y={day.at.y} width={day.at.w} height={day.at.h} rx={8} pathLength={1} />
      ))}
      {team.map((figure) => (
        <Person key={figure.key} id={figure.key} at={figure.at} />
      ))}
      <path className="built-table dk-draw" data-build={table.key} d={table.d} pathLength={1} />
      <Person id={meets.key} at={meets.at} />
      <Person id={holds.key} at={holds.at} />
      <g data-build={app.key}>
        <rect className="built-app-held" x={app.at.x} y={app.at.y} width={app.at.w} height={app.at.h} rx={5} />
        <path className="built-app-held__rule" d={app.rules} />
      </g>
      <path className="built-loop dk-draw" data-build={first.key} d={first.d} pathLength={1} />
      <Arrow id={second.key} d={second.d} end={arrive.end} heading={arrive.heading} />
    </Part>
  );
}

export function TooLongHtml() {
  const { dayNames, meets, app, loops, pilot, failed } = TOO_LONG;
  return (
    <Group id={groupOf("too-long").html}>
      {[...dayNames, app.label, ...loops.map((entry) => entry.label)].map((label) => (
        <Label key={label.key} id={label.key} at={label.at}>
          {label.text}
        </Label>
      ))}
      <Label id={meets.label.key} at={meets.label.at} align="left">
        {meets.label.text}
      </Label>
      <Label id={pilot.key} at={pilot.at} className="built-pilot">
        {pilot.text}
      </Label>
      <Label id={failed.key} at={failed.at} tone="soft" className="built-tag">
        {failed.text}
      </Label>
      <StoryOf picture="too-long" />
    </Group>
  );
}
