/** Slide 4's picture: the timeline across the stage with its two years, the three figures standing on it, each named with its caption, and under the agent the loop: its ring, its five named stops and the bar where it closes, named. */
"use client";

import { Part } from "@/components/deck/kit";
import { AGENTS, LOOP_RING } from "./layout-agents";
import { Layer, Ring, Stop, StoryOf, Stroke, Words } from "./parts";
import { BeltedAgent, ChatBubble, DraftAndSigner } from "./parts-figures";

const A = AGENTS;
const L = A.loop;
const DRAWINGS = { bubble: ChatBubble, draft: DraftAndSigner, belted: BeltedAgent } as const;

export function AgentsMarks() {
  return (
    <Part id={A.marks}>
      <Stroke id={A.line.key} from={{ x: A.line.x0, y: A.line.y }} to={{ x: A.line.x1, y: A.line.y }} className="en-line" />
      {A.ticks.map((tick) => (
        <Stroke key={tick.key} id={tick.key} from={{ x: tick.at.x, y: tick.at.y - tick.h }} to={{ x: tick.at.x, y: tick.at.y + tick.h }} className="en-line" />
      ))}
      {A.years.map((year) => (
        <Words key={year.key} id={year.key} at={year.at} text={year.text} anchor={year.anchor} size="text" tone="soft" />
      ))}
      {A.figures.map((figure) => {
        const Drawing = DRAWINGS[figure.kind];
        return [
          <Drawing key={figure.key} id={figure.key} at={figure.at} />,
          <Words key={figure.name.key} id={figure.name.key} at={figure.name.at} text={figure.name.text} size="text" strong />,
          <Words key={figure.caption.key} id={figure.caption.key} at={figure.caption.at} text={figure.caption.text} tone="soft" />,
        ];
      })}
      <Ring id={L.key} at={L.centre} r={L.r} />
      <Stroke id={L.bar.key} from={L.bar.from} to={L.bar.to} className="en-boundary" />
      <Words id={L.bar.name.key} at={L.bar.name.at} text={L.bar.name.text} anchor="end" strong />
      {L.stops.map((stop) => [
        <Stop key={stop.key} id={stop.key} at={stop.at} r={LOOP_RING.stop} />,
        <Words key={stop.name.key} id={stop.name.key} at={stop.name.at} text={stop.name.text} anchor={stop.name.anchor} strong />,
      ])}
    </Part>
  );
}

export function AgentsHtml() {
  return (
    <Layer id={A.html}>
      <StoryOf picture="agents" />
    </Layer>
  );
}
