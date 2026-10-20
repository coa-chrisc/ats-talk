/**
 * Slides 25 to 27's pictures: the scan's funnel, brief and table; the grant
 * and bill panels, each with its own timeline; the wall of code pages and
 * the two cost bars. Each is its marks under the HTML and its HTML (its story lines
 * and tags), so the next slide puts it away in one move.
 */
"use client";

import { Part } from "@/components/deck/kit";
import { AMANDA, FORESIGHT, GRANTS } from "./layout-tools";
import { Group, StoryOf, Tag, Word } from "./scene-parts";

const F = FORESIGHT;
const G = GRANTS;
const A = AMANDA;

/** A small page: its outline, and lines of writing across it. */
function Sheet({ x, y, w, h, rows, tone = "soft" }: { x: number; y: number; w: number; h: number; rows: readonly { x: number; y: number; w: number }[]; tone?: "soft" | "green" }) {
  return (
    <>
      <rect className="backup-sheet" x={x} y={y} width={w} height={h} rx={4} />
      {rows.map((row) => (
        <path key={`${row.x}.${row.y}`} className={`backup-writing backup-writing--${tone}`} d={`M${row.x} ${row.y}h${row.w}`} />
      ))}
    </>
  );
}

/** A bill's lines of writing: four long rows, as a bill reads before it is summarised. */
const billRows = (x: number, y: number, w: number) => [20, 40, 60, 80].map((dy, i) => ({ x: x + 16, y: y + dy, w: w - 32 - (i === 3 ? 40 : 0) }));
/** A summary's two short rows. */
const summaryRows = (x: number, y: number, w: number) => [36, 60].map((dy, i) => ({ x: x + 16, y: y + dy, w: (w - 32) * (i === 0 ? 0.6 : 0.4) }));

export function ScanMarks() {
  const [left, right] = F.funnel.d
    .split("M")
    .filter(Boolean)
    .map((piece) => `M${piece}`);
  const { moon, page, table } = F;
  return (
    <Part id={F.marks}>
      {F.band.rowKeys.map((key, row) => (
        <g key={key} data-build={key}>
          {F.band.dots
            .filter((_, n) => Math.floor(n / (F.band.dots.length / F.band.rows)) === row)
            .map((dot) => (
              <circle key={`${dot.x}.${dot.y}`} className="backup-dot" cx={dot.x} cy={dot.y} r={F.band.r} />
            ))}
        </g>
      ))}
      <Word id={F.sources.key} at={F.sources.at} text={F.sources.text} anchor="end" />
      <path className="backup-moon" data-build={moon.key} d={`M${moon.at.x} ${moon.at.y - moon.r}A${moon.r} ${moon.r} 0 1 0 ${moon.at.x} ${moon.at.y + moon.r}A${moon.r * 0.42} ${moon.r} 0 1 1 ${moon.at.x} ${moon.at.y - moon.r}Z`} />
      <g data-build={F.funnel.key}>
        <path className="backup-line dk-draw" d={left} pathLength={1} />
        <path className="backup-line dk-draw" d={right} pathLength={1} />
      </g>
      <g data-build={F.stream.key}>
        {F.stream.dots.map((dot) => (
          <circle key={`${dot.x}.${dot.y}`} className="backup-dot" cx={dot.x} cy={dot.y} r={F.stream.r} />
        ))}
      </g>
      <path className="dk-rule dk-draw" data-build={F.sieve.key} d={`M${F.sieve.left} ${F.sieve.y}H${F.sieve.right}`} pathLength={1} />
      {F.tiles.map((tile) => (
        <g key={tile.key} className="backup-tile" data-build={tile.key}>
          <rect className="backup-tile__ground" x={tile.at.x} y={tile.at.y} width={tile.at.w} height={tile.at.h} rx={4} />
          <rect className="backup-tile__fill" x={tile.at.x} y={tile.at.y} width={tile.at.w} height={tile.at.h} rx={4} />
        </g>
      ))}
      <Word id={F.priorities.key} at={F.priorities.at} text={F.priorities.text} anchor="end" />
      <g data-build={F.signals.key}>
        {F.signals.dots.map((dot) => (
          <circle key={`${dot.x}.${dot.y}`} className="backup-dot backup-dot--green" cx={dot.x} cy={dot.y} r={F.signals.r} />
        ))}
      </g>
      <Word id={F.signalsLabel.key} at={F.signalsLabel.at} text={F.signalsLabel.text} anchor="end" />
      <g data-build={table.key}>
        <path className="backup-line backup-line--heavy dk-draw" d={`M${table.x0} ${table.y}H${table.x1}`} pathLength={1} />
        {table.legs.map((x) => (
          <path key={x} className="backup-line dk-draw" d={`M${x} ${table.y}V${table.foot}`} pathLength={1} />
        ))}
      </g>
      <Word id={F.reviews.key} at={F.reviews.at} text={F.reviews.text} anchor="middle" />
      <g data-build={page.key}>
        <rect className="backup-sheet backup-sheet--raised" x={page.at.x} y={page.at.y} width={page.at.w} height={page.at.h} rx={4} />
        <Word at={page.title.at} text={page.title.text} tone="strong" />
        <g data-build={page.lines.key}>
          {page.lines.rows.map((row) => (
            <path key={row.y} className="backup-writing backup-writing--green dk-draw" d={`M${row.x} ${row.y}h${row.w}`} pathLength={1} />
          ))}
        </g>
      </g>
    </Part>
  );
}

export function ScanHtml() {
  return (
    <Group id={F.html}>
      <StoryOf picture="foresight" />
      <Tag id={F.tag.key} at={F.tag.at} kind="solid" lines={F.tag.lines} />
    </Group>
  );
}

export function GrantMarks() {
  return (
    <Part id={G.marks}>
      {G.panels.map((panel) => (
        <rect key={panel.key} className="backup-panel dk-draw" data-build={panel.key} x={panel.at.x} y={panel.at.y} width={panel.at.w} height={panel.at.h} rx={10} pathLength={1} />
      ))}
      {G.names.map((name) => (
        <Word key={name.key} id={name.key} at={name.at} text={name.text} tone="big" />
      ))}
      <path className="backup-line dk-draw" data-build={G.tray.key} d={`M${G.tray.at.x} ${G.tray.at.y}V${G.tray.at.y + G.tray.at.h}H${G.tray.at.x + G.tray.at.w}V${G.tray.at.y}`} pathLength={1} />
      {G.cards.map((card) => (
        <g key={card.key} className="backup-tile" data-build={card.key}>
          <rect className="backup-tile__ground" x={card.at.x} y={card.at.y} width={card.at.w} height={card.at.h} rx={5} />
          <rect className="backup-tile__fill" x={card.at.x} y={card.at.y} width={card.at.w} height={card.at.h} rx={5} />
          <path className="backup-writing backup-writing--soft" d={`M${card.at.x + 12} ${card.at.y + 17}h40M${card.at.x + 12} ${card.at.y + 31}h24`} />
        </g>
      ))}
      <Word id={G.strongFit.key} at={G.strongFit.at} text={G.strongFit.text} />
      <Word id={G.millions.key} at={G.millions.at} text={G.millions.text} anchor="end" tone="big" />
      <g data-build={G.stack.key}>
        {[8, 4, 0].map((d) => (
          <rect key={d} className="backup-sheet" x={G.stack.at.x + d} y={G.stack.at.y - d} width={G.stack.at.w} height={G.stack.at.h} rx={4} />
        ))}
        {billRows(G.stack.at.x, G.stack.at.y, G.stack.at.w).map((row) => (
          <path key={row.y} className="backup-writing backup-writing--soft" d={`M${row.x} ${row.y}h${row.w}`} />
        ))}
      </g>
      <Word id={G.bills.key} at={G.bills.at} text={G.bills.text} />
      {G.turns.map((turn) => (
        <g key={turn.key} className="backup-turn" data-build={turn.key}>
          <rect className="backup-sheet backup-sheet--turn" x={turn.at.x} y={turn.at.y} width={turn.at.w} height={turn.at.h} rx={4} />
          <g className="backup-turn__long">
            {billRows(turn.at.x, turn.at.y, turn.at.w).map((row) => (
              <path key={row.y} className="backup-writing backup-writing--soft" d={`M${row.x} ${row.y}h${row.w}`} />
            ))}
          </g>
          <g className="backup-turn__short">
            {summaryRows(turn.at.x, turn.at.y, turn.at.w).map((row) => (
              <path key={row.y} className="backup-writing backup-writing--green backup-writing--heavy" d={`M${row.x} ${row.y}h${row.w}`} />
            ))}
          </g>
        </g>
      ))}
      <Word id={G.summary.key} at={G.summary.at} text={G.summary.text} anchor="middle" />
      {G.timelines.map((line) => (
        <g key={line.key}>
          <path className="dk-rule dk-draw" data-build={line.join.key} d={`M${line.join.x} ${line.join.y0}V${line.join.y1}`} pathLength={1} />
          <path className="dk-rule dk-draw" data-build={line.key} d={`M${line.x0} ${line.y}H${line.x1}`} pathLength={1} />
          {line.points.map((point) => (
            <g key={point.key}>
              <g className="backup-point" data-build={point.key}>
                <circle className="backup-point__ring" cx={point.at.x} cy={point.at.y} r={G.r} />
                <circle className="backup-point__fill" cx={point.at.x} cy={point.at.y} r={G.r - 4} />
              </g>
              <Word id={point.label.key} at={point.label.at} text={point.label.text} anchor="middle" />
            </g>
          ))}
        </g>
      ))}
    </Part>
  );
}

export function GrantHtml() {
  return (
    <Group id={G.html}>
      <StoryOf picture="grantscope" />
      {G.validated.map((tag) => (
        <Tag key={tag.key} id={tag.key} at={tag.at} kind="solid" lines={tag.lines} />
      ))}
    </Group>
  );
}

export function AmandaMarks() {
  return (
    <Part id={A.marks}>
      <Word id={A.legacy.key} at={A.legacy.at} text={A.legacy.text} tone="strong" />
      {A.pages.map((page) => (
        <g key={page.key} data-build={page.key}>
          <Sheet {...page.at} rows={page.code} />
          <g className="backup-doc" data-build={page.doc}>
            <rect className="backup-doc__page" x={page.at.x} y={page.at.y} width={page.at.w} height={page.at.h} rx={4} />
            <path className="backup-writing backup-writing--green backup-writing--heavy" d={`M${page.heading.x} ${page.heading.y}h${page.heading.w}`} />
            {page.lines.map((row) => (
              <path key={row.y} className="backup-writing backup-writing--green" d={`M${row.x} ${row.y}h${row.w}`} />
            ))}
          </g>
        </g>
      ))}
      <Word id={A.documented.key} at={A.documented.at} text={A.documented.text} tone="strong" />
      {A.days.map((day) => (
        <g key={day.key} className="backup-tile" data-build={day.key}>
          <rect className="backup-tile__ground" x={day.at.x} y={day.at.y} width={day.at.w} height={day.at.h} rx={3} />
          <rect className="backup-tile__fill" x={day.at.x} y={day.at.y} width={day.at.w} height={day.at.h} rx={3} />
        </g>
      ))}
      <Word id={A.daysLabel.key} at={A.daysLabel.at} text={A.daysLabel.text} />
      <path className="dk-rule dk-draw" data-build={A.axis.key} d={`M${A.axis.x0} ${A.axis.y}H${A.axis.x1}`} pathLength={1} />
      <g className="backup-bar" data-build={A.ours.key}>
        <rect className="backup-bar__body backup-bar__body--green" x={A.ours.at.x} y={A.ours.at.y} width={A.ours.at.w} height={A.ours.at.h} />
      </g>
      <Word id={A.oursLabel.key} at={A.oursLabel.at} text={A.oursLabel.text} anchor="middle" tone="strong" />
      <g className="backup-bar" data-build={A.vendor.key}>
        <rect className="backup-bar__body backup-bar__body--grey" x={A.vendor.at.x} y={A.vendor.at.y} width={A.vendor.at.w} height={A.vendor.at.h} />
      </g>
      <Word id={A.vendorLabel.key} at={A.vendorLabel.at} text={A.vendorLabel.text} />
      <Word id={A.top.key} at={A.top.at} text={A.top.text} anchor="middle" tone="strong" />
    </Part>
  );
}

export function AmandaHtml() {
  return (
    <Group id={A.html}>
      <StoryOf picture="amanda" />
      <Tag id={A.tag.key} at={A.tag.at} kind="projected" lines={A.tag.lines} />
    </Group>
  );
}
