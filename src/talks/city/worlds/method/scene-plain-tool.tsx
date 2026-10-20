/** Slide 17's picture: the long months bar and the short days bar under it, each named inside; three dashed outlines in a row, each named; the finished tools; and the small team, one person and two green agents, named once, beside them. */
"use client";

import { Agent, Dashed, Part, Person } from "@/components/deck/kit";
import { PLAIN_TOOL } from "./layout-plain-tool";
import { Bar, Built, Inside } from "./parts-room";
import { Layer, StoryOf, Words } from "./parts";

const P = PLAIN_TOOL;

export function PlainToolMarks() {
  return (
    <Part id={P.marks}>
      <Bar id={P.months.key} at={P.months.at} tone="then" />
      <Words id={P.months.name.key} at={P.months.name.at} text={P.months.name.text} anchor="start" strong />
      <Bar id={P.days.key} at={P.days.at} tone="now" />
      <Words id={P.days.name.key} at={P.days.name.at} text={P.days.name.text} anchor="start" strong />
      {P.tools.map((tool) => (
        <g key={tool.key}>
          <Words id={tool.name.key} at={tool.name.at} text={tool.name.text} anchor="start" strong />
          <Built id={tool.built} at={tool.at} />
          <Inside id={tool.inside} at={tool.at} kind={tool.kind} />
        </g>
      ))}
      <g data-build={P.team.key}>
        <Person id={P.team.person.key} at={P.team.person.at} />
        {P.team.agents.map((agent) => (
          <Agent key={agent.key} id={agent.key} at={agent.at} role="builder" hue="process" />
        ))}
        <Words id={P.team.name.key} at={P.team.name.at} text={P.team.name.text} anchor="start" strong />
      </g>
    </Part>
  );
}

/** The outlines are dashed, so they are HTML that opens by its clip. */
export function PlainToolHtml() {
  return (
    <Layer id={P.html}>
      <StoryOf picture="plain-tool" />
      {P.tools.map((tool) => (
        <Dashed key={tool.outline} id={tool.outline} at={tool.at} rx={8} tone="paper" />
      ))}
    </Layer>
  );
}
