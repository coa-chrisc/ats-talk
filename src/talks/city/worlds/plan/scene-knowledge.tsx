/** Slide 20a's picture: the names above the row; the row of systems, each lit by the lantern of the person beside it, with the new staff who step in at the right; the slab of three parts under the row; the written record with its sections, and the green helper. The people who retire are drawn after the boxes, so they walk in front of the row. */
"use client";

import { Agent, Part, box, type Box } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { KNOWLEDGE } from "./layout-knowledge";
import { Figure, Frame, Grow, Lantern, Layer, StoryOf, Words, Writing } from "./parts";

const K = KNOWLEDGE;

/** A system's face: a header bar and two lines, grey, in with its outline. */
const systemBars = (at: Box) => [box(at.x + 20, at.y + 20, at.w - 40, 12), box(at.x + 20, at.y + 48, at.w - 70, 10), box(at.x + 20, at.y + 68, at.w - 100, 10)];

export function KnowledgeMarks() {
  const { marks } = groupOf("knowledge");
  const { record, helper, slab } = K;
  return (
    <Part id={marks}>
      {[K.know, K.staff, K.newcomer].map((name) => (
        <Words key={name.key} id={name.key} at={name.at} text={name.text} />
      ))}
      <Words id={K.systems.key} at={K.systems.at} text={K.systems.text} anchor="start" />
      <Grow id={record.key} from={{ x: record.at.x, y: record.at.y }} axis="y">
        <rect className="plan-page" x={record.at.x} y={record.at.y} width={record.at.w} height={record.at.h} rx={8} />
      </Grow>
      {record.sections.map((section) => (
        <Grow key={section.key} id={section.key} from={{ x: section.at.x, y: section.at.y }} axis="x">
          <Writing bars={section.lines} />
        </Grow>
      ))}
      <Words id={record.name.key} at={record.name.at} text={record.name.text} anchor="start" />
      <g data-build={slab.key}>
        {slab.parts.map((part) => (
          <g key={part.key}>
            <rect className="plan-slab" x={part.at.x} y={part.at.y} width={part.at.w} height={part.at.h} rx={6} />
            <Grow id={part.key} from={{ x: part.at.x, y: part.at.y }} axis="x">
              <rect className="plan-slab__fill" x={part.at.x} y={part.at.y} width={part.at.w} height={part.at.h} rx={6} />
            </Grow>
            <Words id={part.label.key} at={part.label.at} text={part.label.text} anchor="start" />
          </g>
        ))}
      </g>
      <g data-build={K.row.key}>
        {K.boxes.map((entry) => (
          <g key={entry.key}>
            <Frame id={entry.key} at={entry.at} className="plan-frame--grey">
              <Writing bars={systemBars(entry.at)} tied />
            </Frame>
            <rect className="plan-alight" data-build={entry.lit} x={entry.at.x} y={entry.at.y} width={entry.at.w} height={entry.at.h} rx={10} />
          </g>
        ))}
        {K.newcomers.map((person) => (
          <Figure key={person.key} id={person.key} at={person.at} drawn solid>
            <Lantern {...person.lantern} />
          </Figure>
        ))}
        {K.keepers.map((keeper) => (
          <Figure key={keeper.key} id={keeper.key} at={keeper.at} solid>
            <Lantern {...keeper.lantern} />
          </Figure>
        ))}
      </g>
      <Agent id={helper.key} at={helper.at} role="builder" hue="process" />
    </Part>
  );
}

export function KnowledgeHtml() {
  return (
    <Layer id={groupOf("knowledge").html}>
      <StoryOf picture="knowledge" />
    </Layer>
  );
}
