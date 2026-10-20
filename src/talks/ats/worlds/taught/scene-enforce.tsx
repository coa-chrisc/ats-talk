/** Slide 7's picture: the four blocks stepping down on their floor, each named; the green arrow up their left with its label; the fence post on the top block with the passed tick and its label; and the dial, its three ticks, its three settings and its needle. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { ENFORCE } from "./layout-enforce";
import { Arrow, Block, Dial, DialTick, FencePost, Floor, Needle } from "./parts-draw";
import { Layer, Note, StoryOf, Words } from "./parts";

const E = ENFORCE;
const D = E.dial;

export function EnforceMarks() {
  return (
    <Part id={E.marks}>
      {E.steps.map((step) => (
        <Block key={step.key} id={step.key} at={step.at} />
      ))}
      <Floor id={E.floor.key} y={E.floor.y} x0={E.floor.x0} x1={E.floor.x1} />
      <Arrow id={E.arrow.key} from={{ x: E.arrow.x, y: E.arrow.y0 }} to={{ x: E.arrow.x, y: E.arrow.y1 }} tone="process" />
      <Words id={E.arrow.label.key} at={E.arrow.label.at} text={E.arrow.label.text} strong />
      <FencePost id={E.post.key} at={E.post.at} />
      <PassTick id={E.tick.key} at={E.tick.at} r={E.tick.r} />
      <Words id={E.list.key} at={E.list.at} text={E.list.text} anchor="start" strong />
      <Dial id={D.key} hub={D.hub} r={D.r} />
      {D.ticks.map((tick) => (
        <DialTick key={tick.key} id={tick.key} from={tick.from} to={tick.to} />
      ))}
      <Needle id={D.needle.key} hub={D.hub} length={D.needle.length} />
    </Part>
  );
}

/** The blocks' names and the dial's settings are HTML, so each wraps inside its box. */
export function EnforceHtml() {
  return (
    <Layer id={E.html}>
      <StoryOf picture="enforce" />
      {E.steps.map((step) => (
        <Note key={step.name.key} id={step.name.key} at={step.name.at} strong>
          {step.name.text}
        </Note>
      ))}
      {D.settings.map((setting) => (
        <Note key={setting.key} id={setting.key} at={setting.at} align="center">
          <b>{setting.name}</b>
          <span>{setting.caption}</span>
        </Note>
      ))}
    </Layer>
  );
}
