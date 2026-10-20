/**
 * What slide 4 draws (layout-start.ts): its marks as one SVG part and its
 * HTML as one layer. The light is drawn first, so the desk, the lamp and
 * the tiles stand in it. Every word comes from the layout, which reads the
 * script.
 */
"use client";

import { Part } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { START } from "./layout-start";
import { Group, Label, StoryOf } from "./parts";

export function StartMarks() {
  const { light, desk, legs, lamp, tiles } = START;
  return (
    <Part id={groupOf("starting-small").marks}>
      <polygon className="built-light" data-build={light.key} points={light.points} />
      <path className="built-desk dk-draw" data-build={desk.key} d={desk.d} pathLength={1} />
      <path className="built-desk__legs dk-draw" data-build={legs.key} d={legs.d} pathLength={1} />
      <g className="built-lamp" data-build={lamp.key}>
        <path className="dk-draw" d={lamp.base} pathLength={1} />
        <path className="dk-draw" d={lamp.arm} pathLength={1} />
        {lamp.joints.map((joint) => (
          <circle key={`${joint.x} ${joint.y}`} className="dk-draw" cx={joint.x} cy={joint.y} r={7} pathLength={1} />
        ))}
        <path className="dk-draw" d={lamp.shade} pathLength={1} />
      </g>
      {tiles.map((tile) => (
        <g key={tile.key} data-build={tile.key}>
          {tile.round ? (
            <circle className="built-start__tile" cx={tile.at.x + tile.at.w / 2} cy={tile.at.y + tile.at.h / 2} r={tile.at.w / 2} />
          ) : (
            <rect className="built-start__tile" x={tile.at.x} y={tile.at.y} width={tile.at.w} height={tile.at.h} rx={10} />
          )}
          <path className="built-start__rule" d={tile.rules} />
        </g>
      ))}
    </Part>
  );
}

export function StartHtml() {
  const { lamp, years, names, zero } = START;
  return (
    <Group id={groupOf("starting-small").html}>
      {[lamp.label, ...years, ...names].map((label) => (
        <Label key={label.key} id={label.key} at={label.at}>
          {label.text}
        </Label>
      ))}
      <Label id={zero.key} at={zero.at} tone="soft" className="built-tag">
        {zero.text}
      </Label>
      <StoryOf picture="starting-small" />
    </Group>
  );
}
