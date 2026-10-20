/** Slide 12a's picture: the rail across the wall, five plaques hung from it and under it on their cords, each with its name and caption, the fifth with its four small nameplates; the grey tag apart under the wall. */
"use client";

import { Part } from "@/components/deck/kit";
import { NOTICED, PLAQUE } from "./layout-noticed";
import { Layer, StoryOf, Stroke, Tagged, Words } from "./parts";
import { Cord, Host, Plaque } from "./parts-figures";

const N = NOTICED;

export function NoticedMarks() {
  return (
    <Part id={N.marks}>
      <Stroke id={N.rail.key} from={{ x: N.rail.x0, y: N.rail.y }} to={{ x: N.rail.x1, y: N.rail.y }} className="sn-rail" />
      {N.plaques.map((plaque) => (
        <Cord key={plaque.cord.key} id={plaque.cord.key} d={plaque.cord.d} nail={plaque.cord.nail} />
      ))}
      {N.plaques.map((plaque) => (
        <Plaque key={plaque.key} id={plaque.key} at={plaque.at} inset={PLAQUE.inset}>
          <Words at={plaque.name.at} text={plaque.name.text} size="text" strong />
          {plaque.caption && <Words at={plaque.caption.at} text={plaque.caption.text} soft />}
        </Plaque>
      ))}
      {N.hosts.map((host) => (
        <Host key={host.key} id={host.key} at={host.at} text={host.text} />
      ))}
      <Tagged id={N.only.key} at={N.only.at} text={N.only.text} tone="grey" />
    </Part>
  );
}

export function NoticedHtml() {
  return (
    <Layer id={N.html}>
      <StoryOf picture="noticed" />
    </Layer>
  );
}
