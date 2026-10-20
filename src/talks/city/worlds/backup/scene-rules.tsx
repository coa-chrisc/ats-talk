/**
 * Slides 28 to 30's pictures: the four bands and three tiers; the line of
 * stages with its branch and checkpoints; the two roles over two groups,
 * the four circles and the five results, each under its heading. Each is its marks under the HTML and its HTML.
 */
"use client";

import { Dashed, Part, PassTick, Person } from "@/components/deck/kit";
import { CHARTER, ONESDLC, SECURITY } from "./layout-rules";
import { Group, Label, StoryOf, Tag, Word } from "./scene-parts";

const S = SECURITY;
const O = ONESDLC;
const C = CHARTER;

export function LayersMarks() {
  return (
    <Part id={S.marks}>
      {S.bands.map((band) => (
        <g key={band.key} data-build={band.key}>
          <rect className="backup-band" x={band.at.x} y={band.at.y} width={band.at.w} height={band.at.h} rx={8} />
          <Word at={band.label.at} text={band.label.text} tone="strong" />
        </g>
      ))}
      <path className="backup-line dk-draw" data-build={S.pipe.key} d={`M${S.pipe.x0} ${S.pipe.y}H${S.pipe.x1}`} pathLength={1} />
      {S.checks.map((check) => (
        <rect key={check.key} className="backup-check" data-build={check.key} x={check.at.x} y={check.at.y} width={check.at.w} height={check.at.h} rx={6} />
      ))}
      {S.checks.map((check) => (
        <PassTick key={check.tick.key} id={check.tick.key} at={check.tick.at} r={14} />
      ))}
      {S.tiers.map((tier) => (
        <g key={tier.key} data-build={tier.key}>
          <rect className="backup-box" x={tier.at.x} y={tier.at.y} width={tier.at.w} height={tier.at.h} rx={10} />
          <Word at={tier.name.at} text={tier.name.text} tone="strong" />
          {tier.tools.map((tool) => (
            <g key={tool.text}>
              <rect className="backup-chip" x={tool.at.x} y={tool.at.y} width={tool.at.w} height={tool.at.h} rx={tool.at.h / 2} />
              <Word at={tool.at} text={tool.text} anchor="middle" />
            </g>
          ))}
        </g>
      ))}
      <Word id={S.empty.name.key} at={S.empty.name.at} text={S.empty.name.text} tone="strong" />
      <Word id={S.empty.none.key} at={S.empty.none.at} text={S.empty.none.text} tone="light" />
    </Part>
  );
}

export function LayersHtml() {
  return (
    <Group id={S.html}>
      <StoryOf picture="security" />
      <Dashed id={S.empty.key} at={S.empty.at} rx={10} tone="soft" />
    </Group>
  );
}

export function ChannelMarks() {
  return (
    <Part id={O.marks}>
      <path className="backup-line backup-line--heavy dk-draw" data-build={O.line.key} d={`M${O.line.x0} ${O.line.y}H${O.line.x1}`} pathLength={1} />
      <path className="backup-branch dk-draw" data-build={O.branch.key} d={O.branch.d} pathLength={1} />
      {O.stages.map((stage) => (
        <g key={stage.key}>
          <circle className="backup-node" data-build={stage.key} cx={stage.at.x} cy={stage.at.y} r={O.r} />
          <Word id={stage.label.key} at={stage.label.at} text={stage.label.text} anchor="middle" tone="strong" />
        </g>
      ))}
      <Word id={O.custom.key} at={O.custom.at} text={O.custom.text} anchor="middle" />
      {O.checkpoints.map((point, i) => (
        <g key={point.key}>
          <path className="backup-diamond" data-build={point.key} d={`M${point.at.x} ${point.at.y - O.diamond}l${O.diamond} ${O.diamond}l${-O.diamond} ${O.diamond}l${-O.diamond} ${-O.diamond}Z`} />
          <Word id={point.label.key} at={point.label.at} text={point.label.text} anchor={i === O.checkpoints.length - 1 ? "start" : "middle"} />
        </g>
      ))}
    </Part>
  );
}

export function ChannelHtml() {
  return (
    <Group id={O.html}>
      <StoryOf picture="onesdlc" />
      <Tag id={O.tag.key} at={O.tag.at} kind="solid" lines={O.tag.lines} />
    </Group>
  );
}

export function CharterMarks() {
  return (
    <Part id={C.marks}>
      {C.roles.map((role) => (
        <g key={role.key}>
          <g data-build={role.key}>
            <rect className="backup-card" x={role.at.x} y={role.at.y} width={role.at.w} height={role.at.h} rx={10} />
            <Word at={role.label.at} text={role.label.text} tone="strong" />
          </g>
          <Person id={`${role.key}.person`} at={role.person} />
        </g>
      ))}
      {C.circles.map((circle) => (
        <g key={circle.key} className="backup-circle" data-build={circle.key}>
          <circle cx={circle.at.x} cy={circle.at.y} r={C.r} pathLength={1} transform={`rotate(-90 ${circle.at.x} ${circle.at.y})`} />
        </g>
      ))}
      {C.results.map((result) => (
        <g key={result.key} data-build={result.key}>
          <rect className="backup-card backup-card--result" x={result.at.x} y={result.at.y} width={result.at.w} height={result.at.h} rx={10} />
          <Word at={result.at} text={result.text} anchor="middle" />
        </g>
      ))}
    </Part>
  );
}

export function CharterHtml() {
  return (
    <Group id={C.html}>
      <StoryOf picture="charter" />
      {C.heads.map((head) => (
        <Label key={head.key} id={head.key} at={head.at} lines={head.lines} align="left" strong head />
      ))}
      {C.circles.map((circle) => (
        <Label key={circle.label.key} id={circle.label.key} at={circle.label.at} lines={circle.label.lines} strong />
      ))}
    </Group>
  );
}
