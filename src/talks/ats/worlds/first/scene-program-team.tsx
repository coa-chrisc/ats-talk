/**
 * Slide 18's picture: the small round table with its chairs and a green
 * person at each, the four who step out drawn at their places in the team's
 * box and moved back to their seats until they walk; the team's box, named,
 * the lead's nameplate and the three tiles under it; the small fenced yard
 * with its two people and caption; and at the right the departments'
 * outline with its staff, and the line to it with its caption.
 */
"use client";

import { Part, Person } from "@/components/deck/kit";
import { POSTS, PROGRAM_TEAM, SEAT_18 } from "./layout-program-team";
import { Chair, Table } from "./parts-room";
import { Fence, Frame, Nameplate, Reach, TeamTile } from "./parts-team";
import { Layer, StoryOf, Words } from "./parts";

const P = PROGRAM_TEAM;
const T = P.table;
const tilt = (at: { x: number; y: number }) => (Math.atan2(at.y - T.c.y, at.x - T.c.x) * 180) / Math.PI;

export function ProgramTeamMarks() {
  return (
    <Part id={P.marks}>
      {T.seats.map((seat) => (
        <Chair key={seat.key} id={seat.key} at={seat.at} deg={tilt(seat.at)} size={SEAT_18} grows={seat.leading} />
      ))}
      <Table id={T.key} c={T.c} r={T.r} />
      <Frame id={P.box.key} at={P.box.at} tone="green" />
      <Words id={P.box.name.key} at={P.box.name.at} text={P.box.name.text} size="text" strong />
      <Nameplate id={P.plate.key} at={P.plate.at} text={P.plate.text} />
      {P.tiles.map((tile) => (
        <TeamTile key={tile.key} id={tile.key} at={tile.at} text={tile.text} words={tile.words} />
      ))}
      <Fence id={P.yard.key} at={P.yard.at} posts={P.yard.posts} reach={POSTS.reach} />
      {P.yard.people.map((person) => (
        <g key={person.key} className="fs-walker">
          <Person id={person.key} at={person.at} />
        </g>
      ))}
      <Words id={P.yard.caption.key} at={P.yard.caption.at} text={P.yard.caption.text} />
      <Frame id={P.dept.key} at={P.dept.at} tone="plain" />
      <Words id={P.dept.name.key} at={P.dept.name.at} text={P.dept.name.text} size="text" strong />
      {P.dept.staff.map((person) => (
        <Person key={person.key} id={person.key} at={person.at} />
      ))}
      <Reach id={P.line.key} from={P.line.from} to={P.line.to} />
      <Words id={P.line.caption.key} at={P.line.caption.at} text={P.line.caption.text} />
      {P.members.map((member) => (
        <g key={member.key} data-build={member.key} className="fs-walker fs-member">
          <Person id={member.glyph} at={member.at} />
        </g>
      ))}
    </Part>
  );
}

export function ProgramTeamHtml() {
  return (
    <Layer id={P.html}>
      <StoryOf picture="program-team" />
    </Layer>
  );
}
