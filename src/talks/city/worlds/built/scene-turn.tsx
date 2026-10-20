/**
 * What slides 6 and 6a draw (layout-turn.ts): each slide's marks as one SVG
 * part and its HTML as one layer, so the next slide's click puts it away
 * in two moves. Every word comes from the layout, which reads the script.
 */
"use client";

import { Part } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { TWENTY_STEPS, WRONG } from "./layout-turn";
import { Arrow, Group, Label, StoryOf } from "./parts";

export function WrongMarks() {
  const { ask, good, governed, across, back, opening } = WRONG;
  const { x, y, w, h } = ask.at;
  const { wall, strands } = opening;
  return (
    <Part id={groupOf("wrong-question").marks}>
      {/* The opening, before any words: the wall, and the strands that hit it. */}
      <rect className="built-wall" data-build={wall.key} x={wall.at.x} y={wall.at.y} width={wall.at.w} height={wall.at.h} rx={10} />
      {strands.map((strand) => (
        <path key={strand.key} className="built-strand" data-build={strand.key} d={strand.d} />
      ))}
      <g className="built-ask" data-build={ask.key}>
        <rect className="built-ask__card" x={x} y={y} width={w} height={h} rx={14} />
        <text className="built-ask__words" x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central">
          {ask.text}
        </text>
      </g>
      {[good, governed].map((place) => (
        <rect key={place.key} className="built-place dk-draw" data-build={place.key} x={place.at.x} y={place.at.y} width={place.at.w} height={place.at.h} rx={16} pathLength={1} />
      ))}
      <Arrow id={across.key} d={across.d} end={across.end} heading={across.heading} />
      <Arrow id={back.key} d={back.d} end={back.end} heading={back.heading} />
    </Part>
  );
}

export function WrongHtml() {
  const { good, governed, again, idea } = WRONG;
  return (
    <Group id={groupOf("wrong-question").html}>
      {[good.label, governed.label].map((label) => (
        <Label key={label.key} id={label.key} at={label.at} size="text">
          {label.text}
        </Label>
      ))}
      <Label id={again.key} at={again.at}>
        {again.text}
      </Label>
      <Label id={idea.key} at={idea.at} tone="process" className="built-idea">
        {idea.text}
      </Label>
      <StoryOf picture="wrong-question" />
    </Group>
  );
}

export function TwentyMarks() {
  const { steps, line, tile } = TWENTY_STEPS;
  return (
    <Part id={groupOf("two-to-twenty").marks}>
      {/* The line is drawn first, so the stair stands in front of it. */}
      <path className="built-reuse dk-draw" data-build={line.key} d={line.d} pathLength={1} />
      {[line.start, line.end].map((end) => (
        <circle key={end.key} className="built-reuse__end" data-build={end.key} cx={end.at.x} cy={end.at.y} r={7} />
      ))}
      {steps.flatMap((step) =>
        step.rows.map((row) => (
          <g key={row.key} data-build={row.key}>
            {row.tiles.map((t) => (
              <rect key={t.x} className="built-app" x={t.x} y={t.y} width={tile.side} height={tile.side} rx={6} />
            ))}
          </g>
        )),
      )}
    </Part>
  );
}

export function TwentyHtml() {
  const { steps, code, low, high, estimate } = TWENTY_STEPS;
  return (
    <Group id={groupOf("two-to-twenty").html}>
      {steps.map((step) => (
        <Label key={step.year.key} id={step.year.key} at={step.year.at}>
          {step.year.text}
        </Label>
      ))}
      {steps.map((step) => (
        <Label key={step.count.key} id={step.count.key} at={step.count.at} size="key">
          {step.count.text}
        </Label>
      ))}
      <Label id={code.key} at={code.at} align="left" size="text" tone="process">
        {code.text}
      </Label>
      <Label id={low.key} at={low.at} align="left">
        {low.text}
      </Label>
      <Label id={high.key} at={high.at} align="left">
        {high.text}
      </Label>
      <Label id={estimate.key} at={estimate.at} tone="soft" className="built-tag">
        {estimate.text}
      </Label>
      <StoryOf picture="two-to-twenty" />
    </Group>
  );
}
