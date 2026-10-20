/**
 * Slide 10's picture: twelve department boxes, two columns each side of an
 * aisle, a lantern in each; the green person in each lit box, drawn at the
 * seat it walks to and moved back into its box until it walks; the round
 * table in the aisle with its ten chairs, the three that grow among them;
 * and the card that slides across the middle row.
 */
"use client";

import { Part, Person } from "@/components/deck/kit";
import { LANTERN, PEOPLE, SEAT_10 } from "./layout-people";
import { Chair, Lantern, Table } from "./parts-room";
import { Layer, StoryOf, Words } from "./parts";

const P = PEOPLE;
const T = P.table;
const C = P.card;
const tilt = (at: { x: number; y: number }) => (Math.atan2(at.y - T.c.y, at.x - T.c.x) * 180) / Math.PI;

export function PeopleMarks() {
  return (
    <Part id={P.marks}>
      {P.boxes.map((b) => (
        <g key={b.key}>
          <rect className="md-dept" data-build={b.key} x={b.at.x} y={b.at.y} width={b.at.w} height={b.at.h} rx={10} />
          <Lantern id={b.lantern.key} at={b.lantern.at} size={LANTERN} />
        </g>
      ))}
      {T.seats.map((seat) => (
        <Chair key={seat.key} id={seat.key} at={seat.at} deg={tilt(seat.at)} size={SEAT_10} grows={seat.leading} />
      ))}
      <Table id={T.key} c={T.c} r={T.r} />
      <Words id={T.name.key} at={T.name.at} text={T.name.text} size="text" strong />
      <Words id={P.caption.key} at={P.caption.at} text={P.caption.text} />
      {P.boxes.map(
        (b) =>
          b.walker && (
            <g key={b.walker.key} data-build={b.walker.key} className="md-walker">
              <Person id={b.walker.glyph} at={b.walker.at} />
            </g>
          ),
      )}
      <g data-build={C.key}>
        <rect className="md-card" x={C.at.x} y={C.at.y} width={C.at.w} height={C.at.h} rx={12} />
        <text className="dk-text md-word md-word--strong" x={C.at.x + C.at.w / 2} y={C.at.y + C.at.h / 2} textAnchor="middle" dominantBaseline="central">
          {C.text}
        </text>
      </g>
    </Part>
  );
}

export function PeopleHtml() {
  return (
    <Layer id={P.html}>
      <StoryOf picture="people" />
    </Layer>
  );
}
