/**
 * What slides 7 and 8 draw (layout-builds.ts): each slide's marks as one
 * SVG part and its HTML as one layer. Every agent is in the process's
 * green, told apart by its role's body; the one orange mark is the kit's
 * human mark. Every word comes from the layout, which reads the script.
 */
"use client";

import { Agent, HumanMark, Part, Person, Tile } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { AI_BUILDS, SETUP } from "./layout-builds";
import { Group, Label, StoryOf, Words } from "./parts";

export function AiBuildsMarks() {
  const { app, tool, agents, tiles, person, mark } = AI_BUILDS;
  return (
    <Part id={groupOf("ai-builds").marks}>
      {agents.map((agent) => (
        <Agent key={agent.key} id={agent.key} at={agent.at} role="builder" hue="process" />
      ))}
      <Person id={person.key} at={person.at} />
      {/* The tool as one part, its outline, blocks and mark, so it can come to the middle and grow once it stands alone. */}
      <Part id={tool.key} origin={tool.origin}>
        <g data-build={app.key}>
          <rect className="built-outline dk-draw" x={app.at.x} y={app.at.y} width={app.at.w} height={app.at.h} rx={12} pathLength={1} />
          <path className="built-outline dk-draw" d={`M${app.at.x} ${app.bar}H${app.at.x + app.at.w}`} pathLength={1} />
        </g>
        {tiles.map((tile) => (
          <Tile key={tile.key} id={tile.key} at={tile.at} size="large" hue="process" />
        ))}
        <HumanMark id={mark.key} at={mark.at} />
      </Part>
    </Part>
  );
}

export function AiBuildsHtml() {
  const { agentsLabel, person, finished, tag } = AI_BUILDS;
  return (
    <Group id={groupOf("ai-builds").html}>
      <Label id={agentsLabel.key} at={agentsLabel.at}>
        {agentsLabel.text}
      </Label>
      <Label id={person.label.key} at={person.label.at} align="left">
        {person.label.text}
      </Label>
      <Label id={finished.key} at={finished.at} size="text">
        {finished.text}
      </Label>
      <Label id={tag.key} at={tag.at} className="built-tag built-tag--solid">
        {tag.text}
      </Label>
      <StoryOf picture="ai-builds" />
    </Group>
  );
}

/** The board: its frame, the lines between its rows and its sprints, its three names, and each wave's agents, fills and dots. */
function Board() {
  const { key, origin, frame, rows, cols, epics, sprints, waves, rowsOfWork } = SETUP.board;
  return (
    <Part id={key} origin={origin}>
      <rect className="built-outline dk-draw" data-build={frame.key} x={frame.at.x} y={frame.at.y} width={frame.at.w} height={frame.at.h} rx={10} pathLength={1} />
      <path className="built-board__line dk-draw" data-build={rows.key} d={rows.d} pathLength={1} />
      <path className="built-board__line dk-draw" data-build={cols.key} d={cols.d} pathLength={1} />
      {rowsOfWork.map((row) =>
        row.fills.at.map((cell) => <rect key={`${row.fills.key} ${cell.x}`} className="built-cell__fill" data-build={row.fills.key} x={cell.x} y={cell.y} width={cell.w} height={cell.h} rx={6} />),
      )}
      {rowsOfWork.map((row) => row.dots.at.map((dot) => <circle key={`${row.dots.key} ${dot.x}`} className="built-cell__dot" data-build={row.dots.key} cx={dot.x} cy={dot.y} r={6} />))}
      {rowsOfWork.map((row) => row.wave.at.map((at) => <Agent key={`${row.wave.key} ${at.x}`} id={row.wave.key} at={at} r={row.wave.r} role="builder" hue="process" />))}
      <Words id={epics.key} at={epics.at} text={epics.text} anchor="end" />
      <Words id={sprints.key} at={sprints.at} text={sprints.text} />
      <Words id={waves.key} at={waves.at} text={waves.text} />
    </Part>
  );
}

/** The finished piece: an outline with a bar along its top and three lines inside, in the process's green, moved and scaled about its top left. */
function Piece() {
  const { key, at, bar, lines } = SETUP.piece;
  return (
    <Part id={key} origin={{ x: at.x, y: at.y }}>
      <rect className="built-piece" x={at.x} y={at.y} width={at.w} height={at.h} rx={14} />
      <path className="built-piece__line" d={`M${at.x} ${bar}H${at.x + at.w}`} />
      {lines.map((line) => (
        <path key={line.y} className="built-piece__line" d={`M${line.x0} ${line.y}H${line.x1}`} />
      ))}
    </Part>
  );
}

export function SetupMarks() {
  const { desk, leads, reads, marks } = SETUP;
  const [first, second, approve] = marks;
  return (
    <Part id={groupOf("setup").marks}>
      <path className="built-ground dk-draw" data-build={desk.key} d={desk.d} pathLength={1} />
      {leads.map((lead) => (
        <Agent key={lead.key} id={lead.key} at={lead.at} r={lead.r} role="planner" hue="process" />
      ))}
      {reads.map((read) => (
        <circle key={read.key} className="built-read" data-build={read.key} cx={read.at.x} cy={read.at.y} r={7} />
      ))}
      <Board />
      <Piece />
      <Agent id={first.key} at={first.at} role="reviewer" hue="process" />
      <Agent id={second.key} at={second.at} role="reviewer" hue="process" />
      <HumanMark id={approve.key} at={approve.at} />
    </Part>
  );
}

export function SetupHtml() {
  const { leadsLabel, folders, marks, board } = SETUP;
  return (
    <Group id={groupOf("setup").html}>
      <Label id={leadsLabel.key} at={leadsLabel.at}>
        {leadsLabel.text}
      </Label>
      <Label id={board.heading.key} at={board.heading.at} size="text">
        {board.heading.text}
      </Label>
      {folders.map((folder) => (
        <Label key={folder.key} id={folder.key} at={folder.at} align="left" className="built-folder">
          {folder.text}
        </Label>
      ))}
      {marks.map((mark) => (
        <Label key={mark.label.key} id={mark.label.key} at={mark.label.at}>
          {mark.text}
        </Label>
      ))}
      <StoryOf picture="setup" />
    </Group>
  );
}
