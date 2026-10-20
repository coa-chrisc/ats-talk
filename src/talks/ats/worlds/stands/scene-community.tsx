/** Slide 12b's picture: the column of names in its window, the four quotes beside it with their attributions and leaders; then all of it rolled on out of view, and the three theme rows in the empty band, each its words over a green rule. */
"use client";

import { Part } from "@/components/deck/kit";
import { COMMUNITY, QUOTE } from "./layout-community";
import { Layer, Rows, StoryOf, Stroke, Words } from "./parts";

const C = COMMUNITY;
const W = C.window;

export function CommunityMarks() {
  return (
    <Part id={C.marks}>
      <defs>
        <clipPath id={W.id}>
          <rect x={W.at.x} y={W.at.y} width={W.at.w} height={W.at.h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${W.id})`}>
        <g data-build={C.block.key}>
          <g data-build={C.column.key}>
            {C.column.names.map((name) => (
              <Words key={name.text} at={name.at} text={name.text} anchor="start" size="text" strong />
            ))}
          </g>
          {C.quotes.flatMap((quote) => [
            <Stroke key={quote.leader.key} id={quote.leader.key} from={quote.leader.from} to={quote.leader.to} className="sn-leader" />,
            <g key={quote.key} data-build={quote.key}>
              <Rows at={quote.at} rows={quote.rows} pitch={QUOTE.row} size="text" extra="sn-quote" />
              <Words at={quote.by.at} text={quote.by.text} anchor="start" soft />
            </g>,
          ])}
        </g>
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
