/**
 * Slides 31 to 33's pictures: the two groups of cost bars; the lecture room,
 * the month strip and the shelf; the module rows, binders and papers. Each
 * is its marks under the HTML and its HTML.
 */
"use client";

import { Part } from "@/components/deck/kit";
import { COSTS, MODULES, TEACHING } from "./layout-means";
import { Group, StoryOf, Tag, Word } from "./scene-parts";

const K = COSTS;
const T = TEACHING;
const M = MODULES;

export function SpendMarks() {
  return (
    <Part id={K.marks}>
      {K.heads.map((head) => (
        <Word key={head.key} id={head.key} at={head.at} text={head.text} tone="big" />
      ))}
      {K.bars.map((bar) => (
        <g key={bar.key}>
          <g className="backup-bar backup-bar--across" data-build={bar.key}>
            <rect className="backup-track" x={bar.track.x} y={bar.track.y} width={bar.track.w} height={bar.track.h} rx={4} />
            <rect className={`backup-bar__body backup-bar__body--${bar.tone}`} x={bar.bar.x} y={bar.bar.y} width={bar.bar.w} height={bar.bar.h} rx={bar.bar.w > 8 ? 4 : 1} />
          </g>
          {bar.more && <path className="backup-more" data-build={bar.more.key} d={`M${bar.more.x0} ${bar.more.y}H${bar.more.x1}`} />}
          <Word id={bar.name.key} at={bar.name.at} text={bar.name.text} />
          <Word id={bar.value.key} at={bar.value.at} text={bar.value.text} anchor="end" tone="strong" />
        </g>
      ))}
    </Part>
  );
}

export function SpendHtml() {
  return (
    <Group id={K.html}>
      <StoryOf picture="costs" />
      <Tag id={K.tag.key} at={K.tag.at} kind="projected" lines={K.tag.lines} />
    </Group>
  );
}

export function TeachMarks() {
  const { room } = T;
  return (
    <Part id={T.marks}>
      <g data-build={room.key}>
        <rect className="backup-panel backup-panel--ink dk-draw" x={room.at.x} y={room.at.y} width={room.at.w} height={room.at.h} rx={10} pathLength={1} />
        <path className="backup-line backup-line--heavy dk-draw" d={`M${room.screen.x0} ${room.screen.y}H${room.screen.x1}`} pathLength={1} />
      </g>
      {T.rows.map((row) => (
        <g key={row.key} data-build={row.key}>
          {row.seats.map((seat) => (
            <rect key={seat.x} className="backup-seat" x={seat.x} y={seat.y} width={seat.w} height={seat.h} rx={4} />
          ))}
        </g>
      ))}
      <Word id={T.staff.key} at={T.staff.at} text={T.staff.text} anchor="middle" />
      <Word id={T.series.key} at={T.series.at} text={T.series.text} tone="big" />
      {T.months.map((month) => (
        <g key={month.key}>
          <g data-build={month.key}>
            <rect className="backup-box" x={month.at.x} y={month.at.y} width={month.at.w} height={month.at.h} rx={8} />
            <rect className="backup-band" x={month.at.x} y={month.at.y} width={month.at.w} height={32} rx={8} />
            {month.days.map((day) => (
              <rect key={`${day.x}.${day.y}`} className="backup-day" x={day.x} y={day.y} width={day.w} height={day.h} rx={3} />
            ))}
          </g>
          <rect className="backup-day backup-day--lit" data-build={month.workshop.key} x={month.workshop.at.x} y={month.workshop.at.y} width={month.workshop.at.w} height={month.workshop.at.h} rx={3} />
        </g>
      ))}
      <Word id={T.monthsLabel.key} at={T.monthsLabel.at} text={T.monthsLabel.text} anchor="middle" />
      <path className="backup-line backup-line--heavy dk-draw" data-build={T.shelf.key} d={`M${T.shelf.x0} ${T.shelf.y}H${T.shelf.x1}`} pathLength={1} />
      {T.items.map((item) => (
        <g key={item.key} data-build={item.key}>
          <rect className="backup-card backup-card--item" x={item.at.x} y={item.at.y} width={item.at.w} height={item.at.h} rx={8} />
          <Word at={item.at} text={item.text} anchor="middle" tone="strong" />
        </g>
      ))}
    </Part>
  );
}

export function TeachHtml() {
  return (
    <Group id={T.html}>
      <StoryOf picture="teaching" />
    </Group>
  );
}

export function PartsMarks() {
  return (
    <Part id={M.marks}>
      {M.rows.map((row) => (
        <g key={row.key} className="backup-row" data-build={row.key}>
          <g className="backup-row__blocks">
            {row.blocks.map((block) => (
              <rect key={block.x} className="backup-module" x={block.x} y={block.y} width={block.w} height={block.h} rx={2} />
            ))}
          </g>
          <Word at={row.label.at} text={row.label.text} anchor="end" />
        </g>
      ))}
      {M.others.map((row) => (
        <g key={row.key} className="backup-row" data-build={row.key}>
          <g className="backup-row__blocks">
            {row.blocks.map((block) => (
              <rect key={block.x} className="backup-module" x={block.x} y={block.y} width={block.w} height={block.h} rx={2} />
            ))}
          </g>
        </g>
      ))}
      <Word id={M.other.key} at={M.other.at} text={M.other.text} anchor="end" />
      <Word id={M.total.key} at={M.total.at} text={M.total.text} tone="big" />
      {M.binders.map((binder) => (
        <g key={binder.key}>
          <g data-build={binder.key}>
            <rect className="backup-sheet backup-sheet--binder" x={binder.at.x} y={binder.at.y} width={binder.at.w} height={binder.at.h} rx={8} />
            <rect className="backup-band" x={binder.at.x + 4} y={binder.at.y + 4} width={22} height={binder.at.h - 8} rx={4} />
            <rect className="backup-chip" x={binder.at.x + 42} y={binder.at.y + 28} width={binder.at.w - 62} height={44} rx={4} />
          </g>
          <Word id={binder.label.key} at={binder.label.at} text={binder.label.text} anchor="middle" />
        </g>
      ))}
      {M.sheets.map((sheet) => (
        <g key={sheet.key} data-build={sheet.key}>
          <rect className="backup-sheet" x={sheet.at.x} y={sheet.at.y} width={sheet.at.w} height={sheet.at.h} rx={4} />
          {[28, 52, 76, 100].map((dy, i) => (
            <path key={dy} className="backup-writing backup-writing--soft" d={`M${sheet.at.x + 18} ${sheet.at.y + dy}h${sheet.at.w - 36 - (i === 3 ? 40 : 0)}`} />
          ))}
        </g>
      ))}
      <Word id={M.papers.key} at={M.papers.at} text={M.papers.text} anchor="middle" />
    </Part>
  );
}

export function PartsHtml() {
  return (
    <Group id={M.html}>
      <StoryOf picture="what-exists" />
    </Group>
  );
}
