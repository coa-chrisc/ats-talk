/** Slide 5's picture: the floor and the four blocks rising as a stair, each named; the small green figure that climbs onto the first; the passed tick over it with its label; the grey arrow over the stair with its label; and the plain tool under the floor with its name and caption. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { LADDER } from "./layout-ladder";
import { Arrow, Block, Floor, Hammer, Walker } from "./parts-draw";
import { Layer, Note, StoryOf, Words } from "./parts";

const L = LADDER;

export function LadderMarks() {
  return (
    <Part id={L.marks}>
      {L.steps.map((step) => (
        <Block key={step.key} id={step.key} at={step.at} />
      ))}
      <Floor id={L.floor.key} y={L.floor.y} x0={L.floor.x0} x1={L.floor.x1} />
      <Walker id={L.walker.key} at={L.walker.at} />
      <PassTick id={L.tick.key} at={L.tick.at} r={L.tick.r} />
      <Words id={L.stop.key} at={L.stop.at} text={L.stop.text} strong />
      <Arrow id={L.more.key} from={L.more.tail} to={L.more.head} tone="soft" />
      <Words id={L.more.label.key} at={L.more.label.at} text={L.more.label.text} turn={L.more.label.turn} strong />
      <Hammer id={L.tool.key} at={L.tool.at} />
      <Words id={L.tool.name.key} at={L.tool.name.at} text={L.tool.name.text} anchor="start" strong />
      <Words id={L.tool.caption.key} at={L.tool.caption.at} text={L.tool.caption.text} anchor="start" />
    </Part>
  );
}

/** Each block's name and caption are HTML, so a caption wraps inside its block. */
export function LadderHtml() {
  return (
    <Layer id={L.html}>
      <StoryOf picture="ladder" />
      {L.steps.map((step) => (
        <Note key={step.words.key} id={step.words.key} at={step.words.at}>
          <b>{step.words.name}</b>
          <span>{step.words.caption}</span>
        </Note>
      ))}
    </Layer>
  );
}
