/** Slide 22's picture: three staff figures on one line, each beside what its work uses and named under it, and the developers' practice ring with the card that rides it once. */
"use client";

import { Part } from "@/components/deck/kit";
import { LEVEL_UP as U, WORDS } from "./layout-level-up";
import { Layer, StoryOf } from "./parts";
import { Ground, Prop, RidingCard, Ring, StaffFigure } from "./parts-level-up";
import { Label, Lines } from "./parts-plan";

export function LevelUpMarks() {
  return (
    <Part id={U.marks}>
      <Ground id={U.ground.key} from={U.ground.from} to={U.ground.to} />
      {U.roles.map((role) => (
        <g key={role.key}>
          <g data-build={role.key}>
            <StaffFigure at={role.figure} />
            <Prop kind={role.prop.kind} at={role.prop.at} />
          </g>
          <g data-build={role.words.key}>
            <Label at={role.words.name.at} text={role.words.name.text} strong />
            <Lines first={role.words.caption.at} lines={role.words.caption.lines} leading={WORDS.leading} />
          </g>
        </g>
      ))}
      <Label id={U.heading.key} at={U.heading.at} text={U.heading.text} strong />
      <Ring id={U.ring.key} d={U.ring.d} stops={U.stops} arrows={U.ring.arrows} />
      {U.stops.map((stop) => (
        <Lines key={stop.key} id={stop.key} first={stop.first} lines={stop.lines} leading={WORDS.leading} anchor={stop.anchor} />
      ))}
      <RidingCard id={U.card.key} at={U.card.at} pivot={U.card.pivot} own={U.card.own} />
    </Part>
  );
}

export function LevelUpHtml() {
  return (
    <Layer id={U.html}>
      <StoryOf picture="level-up" />
    </Layer>
  );
}
