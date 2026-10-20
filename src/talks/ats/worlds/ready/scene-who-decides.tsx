/** Slide 25's picture, in two zones: the stack of three tiers with the orange mark on the middle one and an arrow down its left side and up its right, each named; and the heading and three question cards on the right. */
"use client";

import { HumanMark, Part, type Point } from "@/components/deck/kit";
import { WHO_DECIDES } from "./layout-who-decides";
import { LABEL_LINE } from "./layout";
import { Layer, StoryOf, Words } from "./parts";
import { Lines } from "./parts-applied";

const W = WHO_DECIDES;

/** A long arrow that draws on from `from` to `to`, straight up or down, its head arriving with its front. */
function Arrow({ id, from, to }: { id: string; from: Point; to: Point }) {
  const down = to.y > from.y;
  const tip = to.y;
  const back = down ? tip - 16 : tip + 16;
  return (
    <g data-build={id}>
      <path className="rd-arrow dk-draw" d={`M${from.x} ${from.y}V${to.y}`} pathLength={1} />
      <path className="rd-arrow rd-arrow__head" d={`M${to.x - 11} ${back}L${to.x} ${tip}L${to.x + 11} ${back}`} />
    </g>
  );
}

export function WhoDecidesMarks() {
  return (
    <Part id={W.marks}>
      {W.tiers.map((tier) => (
        <g key={tier.key} data-build={tier.key}>
          <rect className="rd-tier__ground" x={tier.at.x} y={tier.at.y} width={tier.at.w} height={tier.at.h} rx={10} />
          <rect className="rd-tier__edge dk-draw" x={tier.at.x} y={tier.at.y} width={tier.at.w} height={tier.at.h} rx={10} pathLength={1} />
        </g>
      ))}
      {W.tiers.map((tier) => (
        <g key={tier.name.key}>
          <Words id={tier.name.key} at={tier.name.at} text={tier.name.text} anchor="start" size="text" strong />
          <Lines id={tier.caption.key} at={tier.caption.at} lines={tier.caption.lines} pitch={LABEL_LINE} size="label" />
        </g>
      ))}
      <HumanMark id={W.mark.key} at={W.mark.at} />
      <Arrow id={W.down.key} from={W.down.from} to={W.down.to} />
      <Lines id={W.down.label.key} at={W.down.label.at} lines={W.down.label.lines} pitch={LABEL_LINE} size="label" anchor="end" strong />
      <Arrow id={W.up.key} from={W.up.from} to={W.up.to} />
      <Lines id={W.up.label.key} at={W.up.label.at} lines={W.up.label.lines} pitch={LABEL_LINE} size="label" strong />
      <Words id={W.heading.key} at={W.heading.at} text={W.heading.text} anchor="start" size="text" strong />
      {W.cards.map((card) => (
        <g key={card.key} data-build={card.key}>
          <rect className="rd-question__ground" x={card.at.x} y={card.at.y} width={card.at.w} height={card.at.h} rx={10} />
          <rect className="rd-question__stripe" x={card.at.x} y={card.at.y} width={card.stripe} height={card.at.h} rx={4} />
          <Words at={card.words} text={card.text} anchor="start" size="text" />
        </g>
      ))}
    </Part>
  );
}

export function WhoDecidesHtml() {
  return (
    <Layer id={W.html}>
      <StoryOf picture="who-decides" />
    </Layer>
  );
}
