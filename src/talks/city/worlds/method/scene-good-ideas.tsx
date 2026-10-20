/** Slide 13's picture: the wall of idea cards, named once; the four grey tags; and the hand that lifts the first card off the wall and holds it up. */
"use client";

import { Part } from "@/components/deck/kit";
import { GOOD_IDEAS, LIFTED } from "./layout-good-ideas";
import { centreOf } from "./layout";
import { GreyTag, Hand, IdeaCard } from "./parts-cards";
import { Layer, StoryOf, Words } from "./parts";

const G = GOOD_IDEAS;

export function GoodIdeasMarks() {
  const lifted = G.cards[LIFTED];
  return (
    <Part id={G.marks}>
      <rect className="method-wall" data-build={G.wall.key} x={G.wall.at.x} y={G.wall.at.y} width={G.wall.at.w} height={G.wall.at.h} rx={12} />
      <Words id={G.name.key} at={G.name.at} text={G.name.text} anchor="start" strong />
      {G.cards
        .filter((card) => card !== lifted)
        .map((card) => (
          <IdeaCard key={card.key} id={card.key} at={card.at} tilt={card.tilt} />
        ))}
      {G.tags.map((tag) => {
        const card = G.cards[tag.card];
        const c = centreOf(card.at);
        return (
          <g key={tag.key} transform={card.tilt ? `rotate(${card.tilt} ${c.x} ${c.y})` : undefined}>
            <GreyTag id={tag.key} at={tag.at} text={tag.text} />
          </g>
        );
      })}
      {/* The lifted card goes over the rest, so nothing on the wall crosses it as it is carried. */}
      <IdeaCard id={lifted.key} at={lifted.at} tilt={lifted.tilt} origin={G.lift.origin} />
      <Hand id={G.hand.key} grip={G.hand.grip} />
    </Part>
  );
}

export function GoodIdeasHtml() {
  return (
    <Layer id={G.html}>
      <StoryOf picture="good-ideas" />
    </Layer>
  );
}
