/**
 * What slide 9a draws (layout-rad-evolves.ts): its marks as one SVG part
 * (the two circles, the arrow and the nodes' dots) and its HTML as one
 * layer (the circles' tabs, the tile and the nodes' names). Each circle is
 * drawn from its top. Every word comes from the layout, which reads the
 * script.
 */
"use client";

import { Part } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { RAD_EVOLVES } from "./layout-rad-evolves";
import { Arrow, Group, Label, StoryOf } from "./parts";

export function RadEvolvesMarks() {
  const { home, ring, arrow, nodes } = RAD_EVOLVES;
  return (
    <Part id={groupOf("rad-evolves").marks}>
      {[home, ring].map((circle) => (
        <circle key={circle.key} className="built-rad-circle dk-draw" data-build={circle.key} cx={circle.c.x} cy={circle.c.y} r={circle.r} pathLength={1} transform={`rotate(-90 ${circle.c.x} ${circle.c.y})`} />
      ))}
      <Arrow id={arrow.key} d={arrow.d} end={arrow.end} heading={arrow.heading} />
      {nodes.map((node) => (
        <g key={node.key} data-build={node.key}>
          <circle className="built-dot" cx={node.at.x} cy={node.at.y} r={node.r} />
        </g>
      ))}
    </Part>
  );
}

export function RadEvolvesHtml() {
  const { home, ring, tile, nodes } = RAD_EVOLVES;
  return (
    <Group id={groupOf("rad-evolves").html}>
      {[home.label, ring.label].map((label) => (
        <Label key={label.key} id={label.key} at={label.at} className="built-tab built-word--strong">
          {label.text}
        </Label>
      ))}
      {nodes.map((node) => (
        <Label key={node.name.key} id={node.name.key} at={node.name.at} align={node.name.align} className="built-word--strong">
          {node.name.text}
        </Label>
      ))}
      {nodes.flatMap((node) =>
        node.sub
          ? [
              <Label key={node.sub.key} id={node.sub.key} at={node.sub.at} align={node.sub.align} tone="soft" className="built-rad-sub">
                {node.sub.text}
              </Label>,
            ]
          : [],
      )}
      <Label id={tile.key} at={tile.at} size="text" className="built-rad-tile">
        {tile.text}
      </Label>
      <StoryOf picture="rad-evolves" />
    </Group>
  );
}
