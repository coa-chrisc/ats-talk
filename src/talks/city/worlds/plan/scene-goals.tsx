/** Slides 18 and 19's pictures: the plan's six tiles with the projects that tie to them and one project's measure; the departments, the form that finds people in them, and the teams those people form. */
"use client";

import { Line, Part, box } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { NORTH_STAR, PEOPLE } from "./layout-goals";
import { Figure, Frame, Layer, Silhouette, StoryOf, Words, Writing } from "./parts";

const N = NORTH_STAR;
const P = PEOPLE;

/** Two bars of writing in a tile the slide does not name. */
const tileBars = (at: { x: number; y: number; w: number; h: number }) => [box(at.x + 28, at.y + at.h / 2 - 16, at.w - 76, 10), box(at.x + 28, at.y + at.h / 2 + 8, at.w - 124, 10)];

export function NorthStarMarks() {
  const { marks } = groupOf("north-star");
  const { measure, chosen } = N;
  return (
    <Part id={marks}>
      <Words id={N.plan.key} at={N.plan.at} text={N.plan.text} anchor="start" />
      {N.tiles.map((tile, i) => (
        <Frame key={tile.key} id={tile.key} at={tile.at}>
          {i > 0 && <Writing bars={tileBars(tile.at)} tied />}
        </Frame>
      ))}
      <rect className="plan-lit" data-build={N.lit.key} x={N.lit.at.x} y={N.lit.at.y} width={N.lit.at.w} height={N.lit.at.h} rx={10} />
      <g data-build={N.name.key}>
        {N.name.lines.map((line) => (
          <Words key={line.text} at={line.at} text={line.text} strong />
        ))}
      </g>
      <Line id={chosen.leader.key} from={chosen.leader.from} to={chosen.leader.to} tone="paper" />
      <path className="plan-measure dk-draw" data-build={measure.key} d={`M${measure.from.x} ${measure.from.y}L${measure.to.x} ${measure.to.y}`} pathLength={1} />
      {N.dots.map((dot) => (
        <circle key={dot.key} className="plan-dot" data-build={dot.key} cx={dot.at.x} cy={dot.at.y} r={N.dot.r} />
      ))}
      <circle className="plan-ring dk-draw" data-build={chosen.ring.key} cx={chosen.ring.at.x} cy={chosen.ring.at.y} r={chosen.ring.r} pathLength={1} transform={`rotate(-90 ${chosen.ring.at.x} ${chosen.ring.at.y})`} />
      <circle className="plan-point" data-build={measure.start.key} cx={measure.start.at.x} cy={measure.start.at.y} r={measure.start.r} />
      <circle className="plan-target" data-build={measure.end.key} cx={measure.end.at.x} cy={measure.end.at.y} r={measure.end.r} />
      <Words id={measure.startLabel.key} at={measure.startLabel.at} text={measure.startLabel.text} />
      <Words id={measure.endLabel.key} at={measure.endLabel.at} text={measure.endLabel.text} />
    </Part>
  );
}

export function NorthStarHtml() {
  return (
    <Layer id={groupOf("north-star").html}>
      <StoryOf picture="north-star" />
    </Layer>
  );
}

export function PeopleMarks() {
  const { marks } = groupOf("people");
  return (
    <Part id={marks}>
      {P.teams.map((team) => (
        <Frame key={team.key} id={team.key} at={team.at} />
      ))}
      {P.depts.map((dept) => (
        <g key={dept.key}>
          <Frame id={dept.key} at={dept.at} hue={dept.hue} />
          <g data-build={`${dept.key}.people`}>
            {dept.stay.map((at) => (
              <Figure key={at.x} at={at} />
            ))}
          </g>
        </g>
      ))}
      <Words id={P.staff.key} at={P.staff.at} text={P.staff.text} anchor="start" />
      {P.found.map((found) => (
        <g key={found.key} data-build={found.key}>
          <Silhouette id={found.light} at={found.at} hue={found.hue} />
          <Figure id={`${found.key}.person`} at={found.at} />
        </g>
      ))}
      {P.teams.map(({ plate }) => (
        <g key={plate.key} data-build={plate.key}>
          <rect className="plan-plate" x={plate.at.x} y={plate.at.y} width={plate.at.w} height={plate.at.h} rx={8} />
          <Words at={{ x: plate.at.x + plate.at.w / 2, y: plate.at.y + plate.at.h / 2 }} text={plate.text} strong />
        </g>
      ))}
      <Form />
    </Part>
  );
}

/** The form: a page with a dark header and three lines to tick, its name over it; it travels as one. */
function Form() {
  const { at, label, key } = P.form;
  const rows = [0, 1, 2].map((i) => at.y + 44 + i * 24);
  return (
    <g data-build={key}>
      <rect className="plan-form__page" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      <rect className="plan-form__head" x={at.x + 12} y={at.y + 12} width={at.w - 24} height={14} rx={3} />
      {rows.map((y) => (
        <g key={y}>
          <rect className="plan-form__box" x={at.x + 12} y={y} width={12} height={12} rx={2} />
          <rect className="plan-form__bar" x={at.x + 32} y={y + 2} width={at.w - 46} height={8} rx={4} />
        </g>
      ))}
      <Words at={label.at} text={label.text} anchor="start" />
    </g>
  );
}

export function PeopleHtml() {
  return (
    <Layer id={groupOf("people").html}>
      <StoryOf picture="people" />
    </Layer>
  );
}
