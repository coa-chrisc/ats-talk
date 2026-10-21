/** Slide 27's picture: six cards in two rows of three, each a request with a miniature of the slide that brought it in, its name and caption under it; an empty dashed ring on each; and at the right, under its heading, slide 11's three dashed plates of what is still to establish, their names only. */
"use client";

import { Part } from "@/components/deck/kit";
import { COULD_BE } from "./layout-could-be";
import { Layer, StoryOf, Words } from "./parts";
import { EmptyRings, GapPlate, RequestCard } from "./parts-could-be";

const C = COULD_BE;

export function CouldBeMarks() {
  return (
    <Part id={C.marks}>
      <Words id={C.gaps.key} at={C.gaps.at} text={C.gaps.text} anchor="start" strong />
      {C.cards.map((card) => (
        <RequestCard key={card.key} id={card.key} at={card.at} kind={card.kind} mini={card.mini} name={card.name} caption={card.caption} />
      ))}
      <EmptyRings id={C.rings.key} at={C.rings.at} />
    </Part>
  );
}

export function CouldBeHtml() {
  return (
    <Layer id={C.html}>
      {C.plates.map((plate) => (
        <GapPlate key={plate.key} id={plate.key} at={plate.at} name={plate.name} />
      ))}
      <StoryOf picture="could-be" />
    </Layer>
  );
}
