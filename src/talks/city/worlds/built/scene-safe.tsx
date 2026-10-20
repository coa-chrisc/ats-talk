/**
 * What slides 5 and 12a draw (layout-safe.ts): each slide's marks as one SVG
 * part and its HTML as one layer. Every word comes from the layout, which
 * reads the script.
 */
"use client";

import { Part, Person } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { CONTROLS, SAFE_YARD } from "./layout-safe";
import { Arrow, Fence, FenceGate, Group, Label, StoryOf } from "./parts";

export function SafeMarks() {
  const { buildings, base, figures, fence, data, hand } = SAFE_YARD;
  return (
    <Part id={groupOf("safe").marks}>
      <path className="built-ground dk-draw" data-build={base.key} d={base.d} pathLength={1} />
      {buildings.at.map((at, i) => (
        <g key={at.x} className="built-building" data-build={buildings.keyOf(i)}>
          <rect className="built-building__body" x={at.x} y={at.y} width={at.w} height={at.h} rx={3} />
          {buildings.windowsOf(at).map((pane) => (
            <rect key={`${pane.x} ${pane.y}`} className="built-building__pane" x={pane.x} y={pane.y} width={pane.w} height={pane.h} rx={1.5} />
          ))}
        </g>
      ))}
      {figures.map((figure) => (
        <Person key={figure.key} id={figure.key} at={figure.at} />
      ))}
      <Fence rails={fence.rails} posts={fence.posts} />
      <FenceGate id={fence.gate.key} hinge={fence.gate.hinge} length={fence.gate.length} />
      <rect className="built-data" data-build={data.key} x={data.at.x} y={data.at.y} width={data.at.w} height={data.at.h} rx={8} />
      <path className="built-hand" data-build={hand.key} d={hand.d} />
    </Part>
  );
}

export function SafeHtml() {
  const { other, cannot, figures, yard, data } = SAFE_YARD;
  return (
    <Group id={groupOf("safe").html}>
      <Label id={other.key} at={other.at} align="right">
        {other.text}
      </Label>
      <Label id={cannot.key} at={cannot.at}>
        {cannot.text}
      </Label>
      {figures.map((figure) => (
        <Label key={figure.label.key} id={figure.label.key} at={figure.label.at}>
          {figure.label.text}
        </Label>
      ))}
      <Label id={yard.key} at={yard.at} align="left" size="text">
        {yard.text}
      </Label>
      <Label id={data.label.key} at={data.label.at}>
        {data.label.text}
      </Label>
      <StoryOf picture="safe" />
    </Group>
  );
}

export function ControlsMarks() {
  const { fence, container, rings, repo } = CONTROLS;
  const { x, y, w, h } = repo.at;
  return (
    <Part id={groupOf("controls").marks}>
      <Fence rails={fence.rails} posts={fence.posts} />
      {rings.map((ring) => (
        <rect key={ring.key} className="built-layer" data-build={ring.key} x={ring.at.x} y={ring.at.y} width={ring.at.w} height={ring.at.h} rx={ring.rx} />
      ))}
      <rect className="built-container" data-build={container.key} x={container.at.x} y={container.at.y} width={container.at.w} height={container.at.h} rx={12} />
      <g className="built-repo" data-build={repo.key}>
        <rect className="built-repo__body" x={x} y={y} width={w} height={h} rx={10} />
        <path className="built-repo__branch" d={`M${x + 48} ${y + 28}V${y + 82}M${x + 48} ${y + 70}C${x + 48} ${y + 52} ${x + 94} ${y + 60} ${x + 94} ${y + 42}`} />
        <circle className="built-repo__node" cx={x + 48} cy={y + 28} r={8} />
        <circle className="built-repo__node" cx={x + 48} cy={y + 82} r={8} />
        <circle className="built-repo__node" cx={x + 94} cy={y + 36} r={8} />
      </g>
      <Arrow id={repo.arrow.key} d={repo.arrow.d} end={repo.arrow.end} heading={repo.arrow.heading} />
    </Part>
  );
}

export function ControlsHtml() {
  const { container, rings, repo, cost } = CONTROLS;
  return (
    <Group id={groupOf("controls").html}>
      <Label id={container.label.key} at={container.label.at} size="text">
        {container.label.text}
      </Label>
      {rings.map((ring) => (
        <Label key={ring.tab.key} id={ring.tab.key} at={ring.tab.at} className="built-tab">
          {ring.tab.text}
        </Label>
      ))}
      <Label id={repo.label.key} at={repo.label.at}>
        {repo.label.text}
      </Label>
      <Label id={cost.key} at={cost.at} tone="soft" className="built-tag">
        {cost.text}
      </Label>
      <StoryOf picture="controls" />
    </Group>
  );
}
