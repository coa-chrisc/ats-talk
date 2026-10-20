/**
 * The drawings Part 4's slides are made of, for the things the kit has no
 * part for: a slide's HTML as one part, a word on the stage, slide 22's five
 * small scenes, the members in slide 23's chart and its pieces' icons. All are
 * SVG for the plane's marks but the group. A scene is drawn whole and moved
 * as one part; a box or a line that draws on carries `dk-draw` and
 * `pathLength`, so the `--d` of the part it sits in draws it. Every word is
 * passed in from a layout, which reads it from the script. Colours are the
 * deck's tokens (fit.css): navy outlines, the raised grey for a surface,
 * a quiet navy for a bar of writing, and green only for the process.
 */
"use client";

import type { ReactNode } from "react";
import { STAGE, place, type Box, type Point } from "@/components/deck/kit";
import type { SceneKind } from "./layout-work";
import type { PieceIcon } from "./layout-fit";

/** A slide's HTML, gathered as one part. */
export function Group({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="fit-group" data-build={id}>
      {children}
    </div>
  );
}

/** Lines of HTML type set centred across the stage, top at `y`: the 108 px title, or a story line at 40 px (`lead`) or at the story size in the softer colour (`credit`). Each line rises from its mask as the kit's do. */
export function Centred({ id, y, lines, size }: { id: string; y: number; lines: readonly string[]; size: "display" | "lead" | "credit" }) {
  const kit = size === "display" ? "dk-set--display" : "dk-set--text";
  return (
    <p className={`dk-set ${kit} fit-centred fit-centred--${size}`} style={{ left: 0, top: y, width: STAGE.w }}>
      {lines.map((line, i) => (
        <span key={i} className="dk-set__mask">
          <span className="dk-set__line" data-build={id}>
            {line}
          </span>
        </span>
      ))}
    </p>
  );
}

/** The short green rule under a centred title: it grows out from its middle (`scaleX`). */
export function GrowingRule({ id, at }: { id: string; at: Box }) {
  return <div className="fit-rule" data-build={id} style={place(at)} />;
}

/** A word on the stage, in navy: the label type (26 px), or the text type (32 px) for a name the eye looks for. */
export function Words({ id, at, text, anchor = "middle", size = "label" }: { id?: string; at: Point; text: string; anchor?: "start" | "middle"; size?: "label" | "text" }) {
  return (
    <text className={size === "text" ? "dk-text fit-word fit-word--name" : "dk-label fit-word"} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}

/** A rounded box. With `draws` its outline draws on with the part it sits in. */
export function Outline({ at, rx, className, draws = false }: { at: Box; rx: number; className: string; draws?: boolean }) {
  return <rect className={draws ? `${className} dk-draw` : className} x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} pathLength={draws ? 1 : undefined} />;
}

/** A bar of writing, in the quiet navy, its ends round. */
const Bar = ({ x, y, w, h = 8 }: { x: number; y: number; w: number; h?: number }) => <rect className="fit-bar" x={x} y={y} width={w} height={h} rx={h / 2} />;

/** A small head in outline: someone at a table or in a class. */
const Head = ({ x, y, r = 8 }: { x: number; y: number; r?: number }) => <circle className="fit-head" cx={x} cy={y} r={r} />;

/** Slide 22's chart: axes, four bars and the line through their tops, in a raised panel. */
function Chart({ at }: { at: Box }) {
  const base = at.y + at.h - 18;
  const left = at.x + 26;
  const bars = [30, 46, 38, 62].map((h, i) => ({ x: left + 16 + i * 30, h }));
  const tops = bars.map((bar) => `${bar.x + 9} ${base - bar.h}`).join("L");
  return (
    <>
      <Outline at={at} rx={12} className="fit-panel" />
      {bars.map((bar) => (
        <rect key={bar.x} className="fit-bar" x={bar.x} y={base - bar.h} width={18} height={bar.h} rx={3} />
      ))}
      <path className="fit-stroke" d={`M${left} ${at.y + 14}V${base}H${at.x + at.w - 16}`} />
      <path className="fit-stroke" d={`M${tops}`} />
    </>
  );
}

/** Slide 22's application window: a title bar with its three dots, a side bar and lines of writing. */
function AppWindow({ at }: { at: Box }) {
  const bar = 22;
  return (
    <>
      <Outline at={at} rx={10} className="fit-sheet" />
      <path className="fit-stroke" d={`M${at.x} ${at.y + bar}H${at.x + at.w}`} />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="fit-dot" cx={at.x + 14 + i * 12} cy={at.y + bar / 2} r={3.5} />
      ))}
      <rect className="fit-well" x={at.x + 10} y={at.y + bar + 10} width={38} height={at.h - bar - 20} rx={4} />
      <Bar x={at.x + 60} y={at.y + bar + 14} w={92} h={10} />
      <Bar x={at.x + 60} y={at.y + bar + 36} w={104} />
      <Bar x={at.x + 60} y={at.y + bar + 52} w={80} />
      <rect className="fit-well" x={at.x + 60} y={at.y + at.h - 22} width={48} height={12} rx={6} />
    </>
  );
}

/** Slide 22's conference table: an oval table with people round it, three along each side and one at each end. */
function Table({ at }: { at: Box }) {
  const cx = at.x + at.w / 2;
  const cy = at.y + at.h / 2;
  return (
    <>
      <ellipse className="fit-panel" cx={cx} cy={cy} rx={56} ry={22} />
      {[-36, 0, 36].map((dx) => (
        <g key={dx}>
          <Head x={cx + dx} y={cy - 38} />
          <Head x={cx + dx} y={cy + 38} />
        </g>
      ))}
      <Head x={cx - 78} y={cy} />
      <Head x={cx + 78} y={cy} />
    </>
  );
}

/** Slide 22's classroom: a board with writing on it, and two rows of people facing it. */
function Classroom({ at }: { at: Box }) {
  const cx = at.x + at.w / 2;
  const board = { x: cx - 62, y: at.y + 2, w: 124, h: 44 };
  return (
    <>
      <Outline at={board} rx={6} className="fit-panel" />
      <Bar x={board.x + 14} y={board.y + 12} w={70} />
      <Bar x={board.x + 14} y={board.y + 26} w={92} />
      {[0, 1].map((row) =>
        [-44, 0, 44].map((dx) => {
          const x = cx + dx + (row ? 22 : 0) - 11;
          const y = at.y + 60 + row * 24;
          return (
            <g key={`${row}${dx}`}>
              <Head x={x} y={y} r={7} />
              <path className="fit-stroke" d={`M${x - 12} ${y + 17}A12 8 0 0 1 ${x + 12} ${y + 17}`} />
            </g>
          );
        }),
      )}
    </>
  );
}

/** Slide 22's map of cities: a folded map, its cities as dots joined by the routes between them. */
function CityMap({ at }: { at: Box }) {
  const { x, y, w, h } = at;
  const third = w / 3;
  const folds = [x, x + third, x + 2 * third, x + w];
  const outline = `M${folds[0]} ${y + 10}L${folds[1]} ${y}L${folds[2]} ${y + 10}L${folds[3]} ${y}V${y + h - 10}L${folds[2]} ${y + h}L${folds[1]} ${y + h - 10}L${folds[0]} ${y + h}Z`;
  const cities = [
    { x: x + 26, y: y + 40 },
    { x: x + 62, y: y + 72 },
    { x: x + 96, y: y + 36 },
    { x: x + 128, y: y + 70 },
    { x: x + 154, y: y + 30 },
  ];
  return (
    <>
      <path className="fit-panel" d={outline} />
      <path className="fit-fold" d={`M${folds[1]} ${y}V${y + h - 10}M${folds[2]} ${y + 10}V${y + h}`} />
      <path className="fit-route" d={`M${cities.map((city) => `${city.x} ${city.y}`).join("L")}`} />
      {cities.map((city) => (
        <circle key={city.x} className="fit-city" cx={city.x} cy={city.y} r={6} />
      ))}
    </>
  );
}

const SCENES: Record<SceneKind, (props: { at: Box }) => ReactNode> = { chart: Chart, window: AppWindow, table: Table, class: Classroom, map: CityMap };

/** One of slide 22's small scenes, drawn whole in its box, moved as one part. */
export function SmallScene({ id, kind, at }: { id: string; kind: SceneKind; at: Box }) {
  const Drawing = SCENES[kind];
  return (
    <g data-build={id}>
      <Drawing at={at} />
    </g>
  );
}

/**
 * A member of a team in slide 23's chart: a small person in outline, drawn
 * as the kit's person is (head and shoulders in a box), in the quiet navy,
 * its two strokes drawing on with the box it stands in.
 */
export function Member({ at }: { at: Box }) {
  const cx = at.x + at.w / 2;
  const r = at.w * 0.25;
  const head = at.y + r + 2;
  const top = head + r + at.h * 0.1;
  const bottom = at.y + at.h - 2;
  return (
    <>
      <circle className="fit-member dk-draw" cx={cx} cy={head} r={r} pathLength={1} transform={`rotate(-90 ${cx} ${head})`} />
      <path className="fit-member dk-draw" d={`M${at.x + 2} ${bottom}V${top + at.w * 0.42}A${at.w / 2 - 2} ${at.w * 0.42} 0 0 1 ${at.x + at.w - 2} ${top + at.w * 0.42}V${bottom}`} pathLength={1} />
    </>
  );
}

/** A piece's icon in green, in a box `size` square with its top left at `at`: a speech bubble, a stack sorted by size, two lanes with their milestones, a shield. */
export function PieceMark({ icon, at, size }: { icon: PieceIcon; at: Point; size: number }) {
  return (
    <g className="fit-icon" transform={`translate(${at.x} ${at.y}) scale(${size / 32})`}>
      {icon === "bubble" && <path d="M5 6H27a2 2 0 0 1 2 2V20a2 2 0 0 1-2 2H14L8 27V22H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />}
      {icon === "stack" && <path d="M4 8H28M4 16H21M4 24H13" />}
      {icon === "lanes" && (
        <>
          <path d="M3 11H29M3 23H29" />
          <circle className="fit-icon__solid" cx={10} cy={11} r={3.5} />
          <circle className="fit-icon__solid" cx={22} cy={23} r={3.5} />
        </>
      )}
      {icon === "shield" && <path d="M16 3L27 7V15C27 22 22 27 16 29C10 27 5 22 5 15V7Z" />}
    </g>
  );
}
