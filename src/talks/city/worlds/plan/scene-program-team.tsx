/** Slide 19a's picture: the org chart, wide, with the new team box on it; the team after the zoom, its three tiles, the leadership beside it and the developers across dotted lines, with a question under them. */
"use client";

import { Line, Part, box } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { PROGRAM_TEAM } from "./layout-program-team";
import { Dotted, Figure, Frame, Layer, Silhouette, StoryOf, Words, Writing } from "./parts";

const T = PROGRAM_TEAM;
/** The chart's window, by its own id on the stage. It sits outside the slide's marks, since it paints nothing of its own. */
const WINDOW_ID = "program-team-window";
const about = (p: { x: number; y: number }) => ({ transformOrigin: `${p.x}px ${p.y}px` });

export function ProgramTeamMarks() {
  const { marks } = groupOf("program-team");
  const { chart, team, lead, devs, tag } = T;
  const head = chart.head.at;
  return (
    <>
      <defs>
        <clipPath id={WINDOW_ID}>
          <rect x={T.window.x} y={T.window.y} width={T.window.w} height={T.window.h} />
        </clipPath>
      </defs>
      <Part id={marks}>
        <g clipPath={`url(#${WINDOW_ID})`}>
          <Part id={chart.key} origin={T.origin}>
            <Frame id={chart.head.key} at={head} rx={8}>
              <Writing bars={[box(head.x + 40, head.y + 19, head.w - 80, 10)]} tied />
            </Frame>
            <path className="dk-rule dk-line--paper dk-draw" data-build={chart.lines.key} d={chart.lines.d} pathLength={1} />
            {chart.depts.map((dept) => (
              <g key={dept.key}>
                <Frame id={dept.key} at={dept.at} rx={8} />
                <g data-build={dept.people.key}>
                  {dept.people.at.map((at) => (
                    <Figure key={at.x} at={at} />
                  ))}
                </g>
              </g>
            ))}
            <Words id={chart.label.key} at={chart.label.at} text={chart.label.text} anchor="start" />
            <Line id={chart.branch.key} from={chart.branch.from} to={chart.branch.to} tone="paper" />
          </Part>
        </g>
        <g className="dk-move plan-team" data-build={team.key} style={about(T.origin)}>
          <rect x={team.at.x} y={team.at.y} width={team.at.w} height={team.at.h} rx={14} />
        </g>
        {T.members.map((member) => (
          <g key={member.key} className="dk-move plan-member" data-build={member.key} style={about(T.origin)}>
            <Silhouette id={member.light} at={member.at} />
            <Figure at={member.at} drawn />
          </g>
        ))}
        <Words id={team.name.key} at={team.name.at} text={team.name.text} strong />
        {T.tiles.map((tile) => (
          <g key={tile.key}>
            <Line id={tile.stub.key} from={tile.stub.from} to={tile.stub.to} tone="paper" />
            <g data-build={tile.key}>
              <rect className="plan-role" x={tile.at.x} y={tile.at.y} width={tile.at.w} height={tile.at.h} rx={10} />
              <Words at={tile.word} text={tile.text} />
            </g>
          </g>
        ))}
        <Frame id={lead.key} at={lead.at}>
          <Figure at={lead.person} />
        </Frame>
        <Words id={lead.label.key} at={lead.label.at} text={lead.label.text} />
        <Line id={lead.line.key} from={lead.line.from} to={lead.line.to} tone="paper" />
        <Frame id={devs.key} at={devs.at} />
        <g data-build={devs.people.key}>
          {devs.people.at.map((at) => (
            <Figure key={at.x} at={at} />
          ))}
        </g>
        <Words id={devs.label.key} at={devs.label.at} text={devs.label.text} />
        <g className="dk-move" data-build={tag.key} style={about(tag.origin)}>
          <path className="plan-tag__pointer" d={`M${tag.pointer.from.x} ${tag.pointer.from.y}V${tag.pointer.to.y}`} />
          <rect className="plan-tag" x={tag.at.x} y={tag.at.y} width={tag.at.w} height={tag.at.h} rx={tag.at.h / 2} />
          <Words at={tag.word} text={tag.text} strong />
        </g>
      </Part>
    </>
  );
}

export function ProgramTeamHtml() {
  return (
    <Layer id={groupOf("program-team").html}>
      <StoryOf picture="program-team" />
      {T.devs.dotted.map((line) => (
        <Dotted key={line.key} id={line.key} from={line.from} to={line.to} />
      ))}
    </Layer>
  );
}
