/**
 * Slide 22a's picture: on the left three green developers, a seat badge on
 * each, their side's words over and under them; on the right the fenced
 * yard, its agent sending small pieces of work into the meter, its side's
 * words over it and the meter's under it; the boundary's name between them.
 * Its HTML holds the dashed boundary and the empty table under it, the
 * table's words beside it in the marks.
 */
"use client";

import { Part, Person } from "@/components/deck/kit";
import { Agent, EmptyTable } from "../stands/parts-map";
import { BADGE, BUDGET, METER, TOKEN } from "./layout-budget";
import { Layer, StoryOf } from "./parts";
import { Boundary, Meter, SeatBadge, Token } from "./parts-budget";
import { Grow, Label } from "./parts-plan";
import { Fence } from "./parts-team";

const B = BUDGET;
type Words = { key: string; text: string; at: { x: number; y: number } };
const Name = ({ w, anchor = "start" }: { w: Words; anchor?: "start" | "middle" }) => <Label id={w.key} at={w.at} text={w.text} anchor={anchor} strong />;
const Caption = ({ w }: { w: Words }) => <Label id={w.key} at={w.at} text={w.text} anchor="start" />;

export function BudgetMarks() {
  return (
    <Part id={B.marks}>
      <Name w={B.seats.name} />
      <Caption w={B.seats.caption} />
      {B.seats.people.map((p) => (
        <g key={p.key} className="fs-walker fs-cast">
          <Person id={p.key} at={p.at} />
        </g>
      ))}
      {B.seats.people.map((p) => (
        <SeatBadge key={p.badge.key} id={p.badge.key} at={p.badge.at} rx={BADGE.rx} />
      ))}
      <Caption w={B.seats.included} />
      <Name w={B.boundary.name} anchor="middle" />
      <Name w={B.metered.name} />
      <Caption w={B.metered.caption} />
      <Fence id={B.metered.yard.key} at={B.metered.yard.at} scale={B.metered.yard.scale} />
      <Agent id={B.metered.agent.key} at={B.metered.agent.at} scale={B.metered.agent.scale} />
      {B.metered.cells.map((cell) => (
        <Grow key={cell.key} id={cell.key} at={cell.at} className="fs-meter__cell" rx={4} />
      ))}
      <Meter id={B.metered.meter.key} at={B.metered.meter.at} ticks={B.metered.meter.ticks} rx={METER.rx} />
      {B.metered.tokens.map((token) => (
        <Token key={token.key} id={token.key} at={token.at} r={TOKEN.r} />
      ))}
      <Caption w={B.metered.paid} />
      <Name w={B.table.name} />
      <Caption w={B.table.caption} />
    </Part>
  );
}

export function BudgetHtml() {
  return (
    <Layer id={B.html}>
      <StoryOf picture="budget" />
      <Boundary id={B.boundary.key} at={B.boundary.at} />
      <EmptyTable id={B.table.key} c={B.table.c} scale={B.table.scale} reach={B.table.reach} />
    </Layer>
  );
}
