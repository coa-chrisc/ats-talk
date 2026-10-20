/** Slide 2's picture: the four tall panels, each with its numeral and its name, and the route under them with its three named stops. */
"use client";

import { Part } from "@/components/deck/kit";
import { FOUR_IDEAS, ROUTE } from "./layout-four-ideas";
import { Layer, Note, Panel, Stop, StoryOf, Stroke, Words } from "./parts";

const F = FOUR_IDEAS;
const R = F.route;

export function FourIdeasMarks() {
  return (
    <Part id={F.marks}>
      {F.panels.map((panel) => [
        <Panel key={panel.key} id={panel.key} at={panel.at} />,
        <Words key={panel.numeral.key} id={panel.numeral.key} at={panel.numeral.at} text={panel.numeral.text} anchor="start" kind="numeral" />,
      ])}
      <Stroke id={R.key} from={{ x: R.x0, y: R.y }} to={{ x: R.x1, y: R.y }} className="br-route" />
      {R.stops.map((stop) => [
        <Stop key={stop.key} id={stop.key} at={stop.at} r={ROUTE.stop} />,
        <Words key={stop.name.key} id={stop.name.key} at={stop.name.at} text={stop.name.text} />,
      ])}
    </Part>
  );
}

export function FourIdeasHtml() {
  return (
    <Layer id={F.html}>
      <StoryOf picture="four-ideas" />
      {F.panels.map((panel) => (
        <Note key={panel.name.key} id={panel.name.key} at={panel.name.at}>
          {panel.name.text}
        </Note>
      ))}
    </Layer>
  );
}
