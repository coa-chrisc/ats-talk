/**
 * Slide 19's picture: three round tables seen from above, each with its six
 * chairs and a person seated in each, named under it; the speech bubbles
 * over them; and the notebook page at the right, its heading over the lines
 * that write in.
 */
"use client";

import { Part } from "@/components/deck/kit";
import { LISTEN, SITTER } from "./layout-listen";
import { Bubble, Chair, Page, Sitter, Table, Writing } from "./parts-room";
import { Layer, StoryOf, Words } from "./parts";

const L = LISTEN;

export function ListenMarks() {
  return (
    <Part id={L.marks}>
      {L.tables.map((table) => (
        <g key={table.key}>
          {table.seats.map((seat) => (
            <Chair key={seat.key} id={seat.key} at={seat.at} deg={seat.deg} size={SITTER.chair}>
              <Sitter id={seat.sitter} head={SITTER.head} />
            </Chair>
          ))}
          <Table id={table.key} c={table.c} r={table.r} />
          <Words id={table.name.key} at={table.name.at} text={table.name.text} strong />
          {table.bubbles.map((bubble) => (
            <Bubble key={bubble.key} id={bubble.key} at={bubble.at} text={bubble.text} tail={bubble.tail} />
          ))}
        </g>
      ))}
      <Page id={L.page.key} at={L.page.at} rings={L.page.rings} rule={L.page.rule} ruled={L.page.lines.map((line) => line.y)} />
      <Words id={L.page.heading.key} at={L.page.heading.at} text={L.page.heading.text} anchor="start" size="text" strong />
      {L.page.lines.map((line) => (
        <Writing key={line.key} id={line.key} x0={line.x0} x1={line.x1} y={line.y} />
      ))}
    </Part>
  );
}

export function ListenHtml() {
  return (
    <Layer id={L.html}>
      <StoryOf picture="listen" />
    </Layer>
  );
}
