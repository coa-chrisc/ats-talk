/**
 * What slide 6b draws (layout-rad-born.ts): its marks as one SVG part (the
 * library's outline and its module tiles, which land as one, and the ring
 * round the whole row, which draws on) and its HTML as one layer, the
 * bubble on the ring's corner among it. Every word comes from the layout,
 * which reads the script.
 */
"use client";

import { Part } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { RAD_BORN } from "./layout-rad-born";
import { Group, Label, StoryOf } from "./parts";

export function RadBornMarks() {
  const { library, ring } = RAD_BORN;
  const { x, y, w, h } = library.at;
  return (
    <Part id={groupOf("rad-born").marks}>
      <path className="built-rad-ring dk-draw" data-build={ring.key} d={ring.d} pathLength={1} />
      <g data-build={library.key}>
        <rect className="built-rad-library" x={x} y={y} width={w} height={h} rx={16} />
        {library.modules.tiles.map((tile) => (
          <rect key={`${tile.x} ${tile.y}`} className="built-app" x={tile.x} y={tile.y} width={tile.w} height={tile.h} rx={6} />
        ))}
      </g>
    </Part>
  );
}

export function RadBornHtml() {
  const { library, steps, base, bubble } = RAD_BORN;
  return (
    <Group id={groupOf("rad-born").html}>
      <Label id={library.name.key} at={library.name.at} size="text" className="built-word--strong">
        {library.name.text}
      </Label>
      <Label id={library.count.key} at={library.count.at} size="key">
        {library.count.text}
      </Label>
      {steps.map((block) => (
        <Label key={block.key} id={block.key} at={block.at} size="text" className="built-rad-step">
          {block.text}
        </Label>
      ))}
      <Label id={base.key} at={base.at} size="text" className="dk-wipe built-rad-base">
        {base.text}
      </Label>
      <Label id={bubble.key} at={bubble.at} size="text" className="built-rad-bubble">
        {bubble.text}
      </Label>
      <StoryOf picture="rad-born" />
    </Group>
  );
}
