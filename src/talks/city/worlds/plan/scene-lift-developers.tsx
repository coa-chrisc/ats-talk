/** Slide 19b's picture: the row of developers at their desks with their systems, the stuck marks, the slab of four parts under the row, the cycle-time bar, the pile of requests and the program team's box. */
"use client";

import { Part, box } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { LIFT_DEVELOPERS } from "./layout-lift-developers";
import { Figure, Grow, Layer, StoryOf, Words, Writing } from "./parts";

const L = LIFT_DEVELOPERS;
const about = (p: { x: number; y: number }) => ({ transformOrigin: `${p.x}px ${p.y}px` });

export function LiftMarks() {
  const { marks } = groupOf("lift-developers");
  const { slab, cycle, backlog, team } = L;
  return (
    <Part id={marks}>
      <Words id={L.label.key} at={L.label.at} text={L.label.text} anchor="start" />
      <g data-build={slab.key}>
        {slab.parts.map((part) => (
          <g key={part.key}>
            <rect className="plan-slab" x={part.at.x} y={part.at.y} width={part.at.w} height={part.at.h} rx={6} />
            <Grow id={part.key} from={{ x: part.at.x, y: part.at.y }} axis="x">
              <rect className="plan-slab__fill" x={part.at.x} y={part.at.y} width={part.at.w} height={part.at.h} rx={6} />
            </Grow>
            <Words id={part.label.key} at={part.label.at} text={part.label.text} anchor="start" />
          </g>
        ))}
      </g>
      <g data-build={L.row.key}>
        {L.units.map((unit) => (
          <Desk key={unit.key} unit={unit} />
        ))}
        {L.stuck.map((mark) => (
          <g key={mark.key} className="dk-move plan-stuck" data-build={mark.key} style={about(mark.at)}>
            <circle cx={mark.at.x} cy={mark.at.y} r={mark.r} />
            <path d={`M${mark.at.x - 5} ${mark.at.y - 5}L${mark.at.x + 5} ${mark.at.y + 5}M${mark.at.x + 5} ${mark.at.y - 5}L${mark.at.x - 5} ${mark.at.y + 5}`} />
          </g>
        ))}
        <Words id={L.stuckLabel.key} at={L.stuckLabel.at} text={L.stuckLabel.text} />
      </g>
      <Words id={cycle.label.key} at={cycle.label.at} text={cycle.label.text} anchor="start" />
      <Grow id={cycle.key} from={{ x: cycle.at.x, y: cycle.at.y }} axis="x" className="plan-cycle">
        <rect x={cycle.at.x} y={cycle.at.y} width={cycle.at.w} height={cycle.at.h} rx={6} />
      </Grow>
      <rect className="plan-cycle__short" data-build={cycle.green.key} x={cycle.green.at.x} y={cycle.green.at.y} width={cycle.green.at.w} height={cycle.green.at.h} rx={6} />
      {backlog.cards.map((card) => (
        <rect key={card.key} className="plan-request" data-build={card.key} x={card.at.x} y={card.at.y} width={card.at.w} height={card.at.h} rx={4} />
      ))}
      <Words id={backlog.label.key} at={backlog.label.at} text={backlog.label.text} anchor="start" />
      <g data-build={team.key}>
        <rect className="plan-crew" x={team.at.x} y={team.at.y} width={team.at.w} height={team.at.h} rx={12} />
        <Words at={team.name.at} text={team.name.text} strong />
        {team.people.map((at) => (
          <Figure key={at.x} at={at} drawn />
        ))}
      </g>
    </Part>
  );
}

/** One developer at a desk beside a system: the person, the desk's top and legs, and the system's case with two lines of its screen; all of it draws on (`draw`). */
function Desk({ unit }: { unit: (typeof LIFT_DEVELOPERS.units)[number] }) {
  const { desk, system } = unit;
  return (
    <g data-build={unit.key}>
      <Figure at={unit.person} />
      <path className="plan-desk dk-draw" d={`M${desk.top.x} ${desk.top.y}H${desk.top.x + desk.top.w}V${desk.top.y + desk.top.h}H${desk.top.x}Z`} pathLength={1} />
      <path className="plan-desk__legs dk-draw" d={desk.legs.map((x) => `M${x} ${desk.top.y + desk.top.h}V${desk.foot}`).join("")} pathLength={1} />
      <rect className="plan-system dk-draw" x={system.x} y={system.y} width={system.w} height={system.h} rx={6} pathLength={1} />
      <Writing bars={[box(system.x + 12, system.y + 20, system.w - 24, 8), box(system.x + 12, system.y + 36, system.w - 34, 8)]} tied />
    </g>
  );
}

export function LiftHtml() {
  return (
    <Layer id={groupOf("lift-developers").html}>
      <StoryOf picture="lift-developers" />
    </Layer>
  );
}
