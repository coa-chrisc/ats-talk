/** Slide 2's picture: the timeline across the stage with its two years, the three figures standing on it, each named with its caption, and the four large figures under it. */
"use client";

import { Part } from "@/components/deck/kit";
import { FIGURE, WORLD_MOVED } from "./layout-world-moved";
import { Figure, Layer, StoryOf, Stroke, Words } from "./parts";
import { BeltedAgent, ChatBubble, DraftAndSigner } from "./parts-figures";

const W = WORLD_MOVED;
const DRAWINGS = { bubble: ChatBubble, draft: DraftAndSigner, belted: BeltedAgent } as const;

export function WorldMovedMarks() {
  return (
    <Part id={W.marks}>
      <Stroke id={W.line.key} from={{ x: W.line.x0, y: W.line.y }} to={{ x: W.line.x1, y: W.line.y }} className="sd-line" />
      {W.ticks.map((tick) => (
        <Stroke key={tick.key} id={tick.key} from={{ x: tick.at.x, y: tick.at.y - tick.h }} to={{ x: tick.at.x, y: tick.at.y + tick.h }} className="sd-line" />
      ))}
      {W.years.map((year) => (
        <Words key={year.key} id={year.key} at={year.at} text={year.text} anchor={year.anchor} size="text" soft />
      ))}
      {W.figures.map((figure) => {
        const Drawing = DRAWINGS[figure.kind];
        return [
          <Drawing key={figure.key} id={figure.key} at={figure.at} />,
          <Words key={figure.name.key} id={figure.name.key} at={figure.name.at} text={figure.name.text} size="text" strong />,
          <Words key={figure.caption.key} id={figure.caption.key} at={figure.caption.at} text={figure.caption.text} soft />,
        ];
      })}
      {W.stats.map((stat) => [
        <Figure key={stat.key} id={stat.key} at={stat.at} runs={stat.runs} size={FIGURE.size} small={FIGURE.small} tone={stat.grey ? "grey" : "catalog"} anchor={stat.anchor} />,
        <Words key={stat.caption.key} id={stat.caption.key} at={stat.caption.at} text={stat.caption.text} anchor={stat.anchor} size="text" />,
      ])}
    </Part>
  );
}

export function WorldMovedHtml() {
  return (
    <Layer id={W.html}>
      <StoryOf picture="world-moved" />
    </Layer>
  );
}
