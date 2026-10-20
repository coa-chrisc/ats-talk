/** Slide 16's picture: four bands stacked across the field, each in its level's hue, named and captioned; three agents, each put in a band and dropped into the short list under them with its level and an owner's nameplate; and the grey tag at the list's left. */
"use client";

import { Agent, Part } from "@/components/deck/kit";
import { LEVELS, LEVEL_AGENT_R, PLATE } from "./layout-levels";
import { GreyTag, Layer, Nameplate, StoryOf, Words } from "./parts";

const L = LEVELS;
/** A band's solid cap at its left end. */
const CAP = 12;

export function LevelsMarks() {
  return (
    <Part id={L.marks}>
      {L.bands.map((band) => (
        <g key={band.key} className="rd-band" data-build={band.key} data-hue={band.hue} style={{ transformOrigin: `${band.at.x}px ${band.at.y}px` }}>
          <rect className="rd-band__body" x={band.at.x} y={band.at.y} width={band.at.w} height={band.at.h} rx={6} />
          <rect className="rd-band__cap" x={band.at.x} y={band.at.y} width={CAP} height={band.at.h} rx={3} />
        </g>
      ))}
      {L.bands.map((band) => (
        <Words key={band.name.key} id={band.name.key} at={band.name.at} text={band.name.text} anchor="start" size="text" strong />
      ))}
      {L.bands.map((band) => (
        <Words key={band.caption.key} id={band.caption.key} at={band.caption.at} text={band.caption.text} anchor="start" />
      ))}
      {L.rows.map((row) => (
        <g key={row.name.key}>
          <Words id={row.name.key} at={row.name.at} text={row.name.text} anchor="start" strong />
          <Nameplate id={row.plate.key} at={row.plate.at} text={row.plate.text} pad={PLATE.pad} icon={PLATE.icon} />
        </g>
      ))}
      {L.rows.map((row) => (
        <Agent key={row.agent.key} id={row.agent.key} at={row.agent.at} role="builder" hue={row.hue === "grey" ? undefined : row.hue} r={LEVEL_AGENT_R} />
      ))}
      <GreyTag id={L.tag.key} at={L.tag.at} text={L.tag.text} />
    </Part>
  );
}

export function LevelsHtml() {
  return (
    <Layer id={L.html}>
      <StoryOf picture="levels" />
    </Layer>
  );
}
