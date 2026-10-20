/** Slide 12b's picture: the column of names in its window, the four quotes beside it with their attributions and leaders; then the three theme rows on their white bands, each its words over a green rule. */
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
        <g data-build={C.column.key}>
          {C.column.names.map((name) => (
            <Words key={name.text} at={name.at} text={name.text} anchor="start" size="text" strong />
          ))}
        </g>
      </g>
      {C.quotes.flatMap((quote) => [
        <Stroke key={quote.leader.key} id={quote.leader.key} from={quote.leader.from} to={quote.leader.to} className="sn-leader" />,
        <g key={quote.key} data-build={quote.key}>
          <Rows at={quote.at} rows={quote.rows} pitch={QUOTE.row} size="text" extra="sn-quote" />
          <Words at={quote.by.at} text={quote.by.text} anchor="start" soft />
        </g>,
      ])}
      {C.themes.flatMap((theme) => [
        <rect key={theme.band.key} className="sn-theme-band" data-build={theme.band.key} x={theme.band.at.x} y={theme.band.at.y} width={theme.band.at.w} height={theme.band.at.h} />,
        <Stroke key={theme.rule.key} id={theme.rule.key} from={{ x: theme.rule.x0, y: theme.rule.y }} to={{ x: theme.rule.x1, y: theme.rule.y }} className="sn-theme-rule" />,
        <Words key={theme.key} id={theme.key} at={theme.at} text={theme.text} anchor="start" size="text" strong />,
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
