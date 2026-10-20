/** Slide 14's picture: the five questions down the left in speech bubbles; the round table from above, its chairs filling one at a time with seated figures, named once over it; and the notebook page beside it, filling under its heading. */
"use client";

import { Part } from "@/components/deck/kit";
import { LISTEN } from "./layout-listen";
import { Bubble, Page, Seat, Table, Writing } from "./parts-room";
import { Layer, StoryOf, Words } from "./parts";

const L = LISTEN;

export function ListenMarks() {
  return (
    <Part id={L.marks}>
      {L.seats.map((seat) => (
        <Seat key={seat.key} id={seat.key} sitter={seat.sitter} at={seat.at} />
      ))}
      <Table id={L.table.key} c={L.table.c} r={L.table.r} />
      <Words id={L.name.key} at={L.name.at} text={L.name.text} anchor="middle" strong />
      {L.bubbles.map((bubble) => (
        <Bubble key={bubble.key} id={bubble.key} at={bubble.at} text={bubble.text} tail={bubble.tail} />
      ))}
      <Page id={L.page.key} at={L.page.at} rings={L.page.rings} rule={L.page.rule} ruled={L.page.lines.map((line) => line.ruled)} />
      <Words id={L.page.heading.key} at={L.page.heading.at} text={L.page.heading.text} anchor="start" size="text" strong />
      {L.page.lines.map((line) => (
        <Writing key={line.key} id={line.key} at={line.at} />
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
