/** Slide 4's picture: the timeline across the stage with its two years, the three figures standing on it, each named with its caption, and under the agent the loop: its ring, its five named stops and the closed gate where it starts and stops, named. */
"use client";

import { Part } from "@/components/deck/kit";
import { AGENTS, AGENT_SCALE, LOOP_RING } from "./layout-agents";
import { Layer, Ring, Stop, StoryOf, Stroke, Words } from "./parts";
import { ChatBubble, ClosedGate, DraftAndSigner, HexAgent } from "./parts-figures";

const A = AGENTS;
const L = A.loop;

/** Each figure's drawing: the bubble and the draft fill their box; the agent stands in its box, its top point on the box's top. */
const drawingOf = (figure: (typeof A.figures)[number]) =>
  figure.kind === "agent" ? (
    <HexAgent key={figure.key} id={figure.key} at={{ x: figure.foot.x, y: figure.at.y }} scale={AGENT_SCALE} />
  ) : figure.kind === "draft" ? (
    <DraftAndSigner key={figure.key} id={figure.key} at={figure.at} />
  ) : (
    <ChatBubble key={figure.key} id={figure.key} at={figure.at} />
  );

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
      {A.figures.map((figure) => [
        drawingOf(figure),
        <Words key={figure.name.key} id={figure.name.key} at={figure.name.at} text={figure.name.text} size="text" strong />,
        <Words key={figure.caption.key} id={figure.caption.key} at={figure.caption.at} text={figure.caption.text} tone="soft" />,
      ])}
      <Ring id={L.key} at={L.centre} r={L.r} />
      {L.stops.map((stop) => [
        <Stop key={stop.key} id={stop.key} at={stop.at} r={LOOP_RING.stop} />,
        <Words key={stop.name.key} id={stop.name.key} at={stop.name.at} text={stop.name.text} anchor={stop.name.anchor} strong />,
      ])}
      <ClosedGate id={L.gate.key} foot={L.gate.foot} scale={L.gate.scale} />
      <Words id={L.gate.name.key} at={L.gate.name.at} text={L.gate.name.text} anchor="end" strong />
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
