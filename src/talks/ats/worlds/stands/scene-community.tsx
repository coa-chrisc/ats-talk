/** Slide 12b's picture: the strip of department chips, the four lit, and the four quote cards under it in a two-by-two grid, all in one block that fades; then the three theme rows in the band, each its words over a green rule. */
"use client";

import { Part } from "@/components/deck/kit";
import { CARD, CHIP, COMMUNITY } from "./layout-community";
import { Layer, Rows, StoryOf, Stroke, Words } from "./parts";

const C = COMMUNITY;

export function CommunityMarks() {
  return (
    <Part id={C.marks}>
      <g data-build={C.block.key}>
        {C.chips.map((chip) => (
          <g key={chip.key} data-build={chip.key}>
            <rect className={`sn-chip${chip.lit ? " sn-chip--lit" : ""}`} x={chip.at.x} y={chip.at.y} width={chip.at.w} height={chip.at.h} rx={CHIP.h / 2} />
            <Words at={chip.words} text={chip.text} strong extra={chip.lit ? "sn-word--lit" : ""} />
          </g>
        ))}
        {C.cards.map((card) => (
          <g key={card.key} data-build={card.key}>
            <rect className="sn-card" x={card.at.x} y={card.at.y} width={card.at.w} height={card.at.h} rx={CARD.r} />
            <Words at={card.dept.at} text={card.dept.text} anchor="start" strong extra="sn-word--lit" />
            <Rows at={card.quote.at} rows={card.quote.rows} pitch={CARD.row} size="text" />
            <Words at={card.by.at} text={card.by.text} anchor="start" soft />
          </g>
        ))}
      </g>
      {C.themes.flatMap((theme) => [
        <Stroke key={theme.rule.key} id={theme.rule.key} from={{ x: theme.rule.x0, y: theme.rule.y }} to={{ x: theme.rule.x1, y: theme.rule.y }} className="sn-theme-rule" />,
        <text key={theme.key} className="dk-text sn-word sn-theme" data-build={theme.key} x={theme.at.x} y={theme.at.y} dominantBaseline="central">
          {theme.text}
        </text>,
      ])}
    </Part>
  );
}

export function CommunityHtml() {
  return (
    <Layer id={C.html}>
      <StoryOf picture="community" />
    </Layer>
  );
}
