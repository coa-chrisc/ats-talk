/**
 * What slides 10 to 12 draw (layout-proof.ts): each slide's marks as one
 * SVG part and its HTML as one layer. Every word comes from the layout,
 * which reads the script.
 */
"use client";

import { Block, Part } from "@/components/deck/kit";
import { groupOf } from "./layout";
import { PORTFOLIO, RECOGNITION, SEEN } from "./layout-proof";
import { Group, Label, StoryOf } from "./parts";

export function PortfolioMarks() {
  return (
    <Part id={groupOf("portfolio").marks}>
      {PORTFOLIO.tiles.map((tile) => (
        <rect key={tile.key} className="built-slot" data-build={PORTFOLIO.slots.key} x={tile.at.x} y={tile.at.y} width={tile.at.w} height={tile.at.h} rx={14} />
      ))}
    </Part>
  );
}

export function PortfolioHtml() {
  return (
    <Group id={groupOf("portfolio").html}>
      {PORTFOLIO.tiles.map((tile) => (
        <Block key={tile.key} id={tile.key} at={tile.at} className={`built-tile${tile.inUse ? " built-tile--in-use" : ""}${tile.catalog ? " built-tile--catalog" : ""}`}>
          <span className="built-tile__name">{tile.name}</span>
          <span className="built-tile__people">{tile.people}</span>
          <span className="built-tile__status">{tile.status}</span>
        </Block>
      ))}
      <StoryOf picture="portfolio" />
    </Group>
  );
}

export function SeenMarks() {
  const { centre, named, departments, practitioners } = SEEN;
  return (
    <Part id={groupOf("seen").marks}>
      {departments.spokes.d.map((d) => (
        <path key={d} className="built-spoke built-spoke--near dk-draw" data-build={departments.spokes.key} d={d} pathLength={1} />
      ))}
      {named.map((dot) => (
        <path key={dot.spoke.key} className="built-spoke dk-draw" data-build={dot.spoke.key} d={dot.spoke.d} pathLength={1} />
      ))}
      <path className="built-spoke dk-draw" data-build={practitioners.spoke.key} d={practitioners.spoke.d} pathLength={1} />
      <circle className="built-centre dk-draw" data-build={centre.key} cx={centre.at.x} cy={centre.at.y} r={centre.r} pathLength={1} transform={`rotate(-90 ${centre.at.x} ${centre.at.y})`} />
      {named.map((dot) => (
        <circle key={dot.key} className="built-dot" data-build={dot.key} cx={dot.at.x} cy={dot.at.y} r={10} />
      ))}
      {departments.at.map((at) => (
        <circle key={`${at.x} ${at.y}`} className="built-dot built-dot--small" data-build={departments.key} cx={at.x} cy={at.y} r={6} />
      ))}
      <circle className="built-group dk-draw" data-build={practitioners.rule.key} cx={practitioners.centre.x} cy={practitioners.centre.y} r={practitioners.r} pathLength={1} transform={`rotate(-90 ${practitioners.centre.x} ${practitioners.centre.y})`} />
      {practitioners.at.map((at) => (
        <circle key={`${at.x} ${at.y}`} className="built-dot built-dot--process" data-build={practitioners.key} cx={at.x} cy={at.y} r={8} />
      ))}
    </Part>
  );
}

export function SeenHtml() {
  const { centre, named, askedBack, departments, practitioners } = SEEN;
  return (
    <Group id={groupOf("seen").html}>
      <Label id={centre.label.key} at={centre.label.at} className="built-word--strong">
        {centre.label.text}
      </Label>
      {named.map((dot) => (
        <Label key={dot.name.key} id={dot.name.key} at={dot.name.at} align={dot.name.align}>
          {dot.name.text}
        </Label>
      ))}
      {askedBack.map((tag) => (
        <Label key={tag.key} id={tag.key} at={tag.at} tone="soft" className="built-tag">
          {tag.text}
        </Label>
      ))}
      <Label id={departments.label.key} at={departments.label.at} tone="soft">
        {departments.label.text}
      </Label>
      <Label id={practitioners.label.key} at={practitioners.label.at} align="left">
        {practitioners.label.text}
      </Label>
      <StoryOf picture="seen" />
    </Group>
  );
}

export function RecognitionMarks() {
  const { rail, plaques } = RECOGNITION;
  return (
    <Part id={groupOf("recognition").marks}>
      <path className="built-ground dk-draw" data-build={rail.key} d={rail.d} pathLength={1} />
      {plaques.map((plaque) => (
        <path key={plaque.cord.key} className="built-cord dk-draw" data-build={plaque.cord.key} d={plaque.cord.d} pathLength={1} />
      ))}
    </Part>
  );
}

export function RecognitionHtml() {
  return (
    <Group id={groupOf("recognition").html}>
      {RECOGNITION.plaques.map((plaque) => (
        <Block key={plaque.key} id={plaque.key} at={plaque.at} className="built-plaque">
          <span className="built-plaque__name">{plaque.text}</span>
          {plaque.hosts.map((host) => (
            <span key={host} className="built-plaque__host">
              {host}
            </span>
          ))}
        </Block>
      ))}
      <StoryOf picture="recognition" />
    </Group>
  );
}
