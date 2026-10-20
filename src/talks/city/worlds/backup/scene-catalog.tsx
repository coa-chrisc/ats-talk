/**
 * Slides 34 and 35's pictures: the coalition's catalog with its three
 * working sessions, after BCHC's catalog pictures, its home page drawn
 * empty; and the table of credentials. Each is its marks under the HTML and its HTML.
 */
"use client";

import { Block, Connector, Part } from "@/components/deck/kit";
import { CREDENTIAL_ROWS, THE_CATALOG } from "./layout-catalog";
import { Group, StoryOf, Tag, Word } from "./scene-parts";

const C = THE_CATALOG;
const R = CREDENTIAL_ROWS;

const PAGE_TONE = { rule: "dk-rule", process: "backup-built", catalog: "backup-brand" } as const;

/** The catalog's page as a session left it, drawn with its card: its outline and header rule, and its parts, each in the tone of the session that made it. */
function SessionPage({ page }: { page: (typeof C.sessions)[number]["page"] }) {
  const { at, header, parts } = page;
  return (
    <>
      <rect className="backup-page dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={6} pathLength={1} />
      <path className="dk-rule dk-draw" d={`M${at.x} ${header}H${at.x + at.w}`} pathLength={1} />
      {parts.map((part) => (
        <rect key={`${part.at.x} ${part.at.y}`} className={`${PAGE_TONE[part.tone]} dk-draw`} x={part.at.x} y={part.at.y} width={part.at.w} height={part.at.h} rx={part.at.h > 12 ? 4 : 5} pathLength={1} />
      ))}
    </>
  );
}

export function CatalogMarks() {
  return (
    <Part id={C.marks}>
      {C.sessions.map((session) => (
        <g key={session.key} data-build={session.key}>
          <rect className="backup-session__fill" x={session.at.x} y={session.at.y} width={session.at.w} height={session.at.h} rx={8} />
          <rect className="backup-session dk-draw" x={session.at.x} y={session.at.y} width={session.at.w} height={session.at.h} rx={8} pathLength={1} />
          <SessionPage page={session.page} />
        </g>
      ))}
      {C.feedback.map(({ onward }) => (
        <Connector key={onward.key} id={onward.key} from={onward.from} to={onward.to} tone="catalog" />
      ))}
    </Part>
  );
}

/** The catalog's home page as drawn: its outline with the catalog's edge, its header band, its search bar and empty card frames, nothing written in them. */
function HomePage({ id, at, home }: { id: string; at: (typeof C)["frame"]["at"]; home: (typeof C)["frame"]["home"] }) {
  const { header, search, cards } = home;
  return (
    <Block id={id} at={at} className="dk-wipe backup-home">
      <svg width={at.w} height={at.h} viewBox={`0 0 ${at.w} ${at.h}`} aria-hidden="true">
        <rect className="backup-home__band" x={header.x} y={header.y} width={header.w} height={header.h} />
        <rect className="backup-home__search" x={search.x} y={search.y} width={search.w} height={search.h} rx={search.h / 2} />
        <circle className="backup-home__lens" cx={search.x + 26} cy={search.y + search.h / 2 - 2} r={8} />
        <path className="backup-home__lens" d={`M${search.x + 32} ${search.y + search.h / 2 + 4}l7 7`} />
        {cards.map((card) => (
          <rect key={`${card.x} ${card.y}`} className="backup-home__card" x={card.x} y={card.y} width={card.w} height={card.h} rx={8} />
        ))}
        <rect className="backup-brand--edge" x={1.5} y={1.5} width={at.w - 3} height={at.h - 3} rx={10} />
      </svg>
    </Block>
  );
}

export function CatalogHtml() {
  const { frame, tag, live } = C;
  return (
    <Group id={C.html}>
      <StoryOf picture="the-catalog" />
      <HomePage id={frame.key} at={frame.at} home={frame.home} />
      <Tag id={tag.key} at={tag.at} kind="solid" lines={tag.lines} />
      {C.feedback.map((mark) => (
        <Block key={mark.key} id={mark.key} at={mark.at} className="dk-block--label dk-block--center backup-feedback">
          {mark.text}
        </Block>
      ))}
      <Block id={live.key} at={live.at} className="dk-block--label dk-block--center backup-live">
        {live.text}
      </Block>
    </Group>
  );
}

export function TableMarks() {
  return (
    <Part id={R.marks}>
      <path className="backup-line dk-draw" data-build={R.top.key} d={`M${R.top.x0} ${R.top.y}H${R.top.x1}`} pathLength={1} />
      {R.rows.map((row) => (
        <g key={row.key}>
          <g data-build={row.key}>
            <Word at={row.name.at} text={row.name.text} tone="strong" />
            {row.year && <Word at={row.year.at} text={row.year.text} />}
            <Word at={row.courses.at} text={row.courses.text} tone="small" />
          </g>
          <path className="dk-rule dk-draw" data-build={row.rule.key} d={`M${row.rule.x0} ${row.rule.y}H${row.rule.x1}`} pathLength={1} />
        </g>
      ))}
    </Part>
  );
}

export function TableHtml() {
  return (
    <Group id={R.html}>
      <StoryOf picture="credentials" />
    </Group>
  );
}
