/**
 * Slide 2, the career: one timeline across the stage under the two-line
 * title's story band, and seven markers along it, each on a stem up to its
 * name. Every word is the click's own (`shown`), read by position: the five
 * years first, then the markers' names in the order they light, the first
 * City marker's caption after its name.
 *
 * The line is a sequence, not a scale: the first three markers share a
 * short stretch on the left and the other four get the room, as the story
 * is told. So no year sits under the line as a tick, where the spacing
 * would read as years passing. Each year is set over the name of the
 * marker it dates (the first, the second, the fourth and the seventh), and
 * the last is the line's own end, beside its end tick. A name sits on one
 * of two rows over the line, so a long name never runs into its
 * neighbour's: a high row's stem rises between the names on the low row
 * either side of it.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";

const WORDS = shown("career", "play");
const YEARS = WORDS.slice(0, 5);
const NAMES = WORDS.slice(5);

/** The line's height, and the dot every marker is: an outline ring on the line, filled when it lights. */
export const LINE_Y = 812;
export const RING_R = 11;
/** The lit marker's soft disc round its dot. */
export const HALO_R = 22;

/** The line runs from the first marker to a short upright tick, with the last year set just past the tick. */
const LINE = { from: 160, to: 1720 };
const END_TICK = 14;
const END_GAP = 16;

/** Type sizes on the timeline: a marker's name at the text size, a year and the caption at the label size. */
export const NAME_SIZE = 32;
export const SMALL_SIZE = 26;

/** The rows a name sits on: its middle's height. The caption sits under its name on the low row, a marker's year over its name. */
const ROW_Y = { low: 716, high: 620 } as const;
const CAPTION_Y = 752;
const YEAR_RISE = 38;
/** How far a stem stops short of the words over it. */
const STEM_GAP = 14;

type Row = keyof typeof ROW_Y;

/**
 * Each marker's place on the line and its row, in the order they light.
 * The first three stand 150 px apart, the rest 270 to 280; the fourth has
 * the caption under its name.
 */
const MARKERS: { x: number; row: Row }[] = [
  { x: 160, row: "low" },
  { x: 310, row: "high" },
  { x: 460, row: "low" },
  { x: 760, row: "low" },
  { x: 1030, row: "high" },
  { x: 1300, row: "low" },
  { x: 1580, row: "high" },
];
/** Which marker has the caption, and the year each marker is dated by (`null`: none; the last year is the line's end). */
const CAPTIONED = 3;
const DATES: (number | null)[] = [0, 1, null, 2, null, null, 3];
const END_YEAR = 4;

/**
 * A line of type's box, for the layout tests' spacing checks: Geist at
 * weight 500 runs to about 0.56 of its size a character, so this errs
 * wide, and the box is as tall as the type.
 */
export const textBox = (text: string, at: Point, size: number, anchor: "start" | "middle" = "middle"): Box => {
  const w = Math.ceil(text.length * size * 0.56);
  return box(anchor === "middle" ? at.x - w / 2 : at.x, at.y - size / 2, w, size);
};

/** The caption is the word after its marker's name in the click's list; the names are the rest, in order. */
const captionWords = NAMES[CAPTIONED + 1];
const names = NAMES.filter((_, i) => i !== CAPTIONED + 1);

export const CAREER = {
  line: { key: "career.line", from: { x: LINE.from, y: LINE_Y }, to: { x: LINE.to, y: LINE_Y } },
  end: { key: "career.end", x: LINE.to, from: LINE_Y - END_TICK, to: LINE_Y + END_TICK },
  /** The last year, set from just past the end tick, on the line's height. */
  now: { key: "career.now", text: YEARS[END_YEAR], at: { x: LINE.to + END_GAP, y: LINE_Y } },
  markers: MARKERS.map(({ x, row }, i) => {
    const caption = i === CAPTIONED ? { key: `career.marker.${i}.caption`, text: captionWords, at: { x, y: CAPTION_Y } } : undefined;
    const top = (caption ? CAPTION_Y + SMALL_SIZE / 2 : ROW_Y[row] + NAME_SIZE / 2) + STEM_GAP;
    const dated = DATES[i];
    return {
      key: `career.marker.${i}`,
      x,
      row,
      ring: { key: `career.marker.${i}.ring`, at: { x, y: LINE_Y } },
      stem: { key: `career.marker.${i}.stem`, x, from: LINE_Y - RING_R, to: top },
      name: { key: `career.marker.${i}.name`, text: names[i], at: { x, y: ROW_Y[row] } },
      year: dated === null ? undefined : { key: `career.marker.${i}.year`, text: YEARS[dated], at: { x, y: ROW_Y[row] - YEAR_RISE } },
      caption,
    };
  }),
};

/** Where along the line each marker stands, as a fraction of its length: when the drawing line reaches it. */
export const along = (x: number) => (x - LINE.from) / (LINE.to - LINE.from);

/** The words over a marker, as boxes: its year, its name and its caption. */
export const markerWords = (marker: (typeof CAREER.markers)[number]): Box[] => [
  ...(marker.year ? [textBox(marker.year.text, marker.year.at, SMALL_SIZE)] : []),
  textBox(marker.name.text, marker.name.at, NAME_SIZE),
  ...(marker.caption ? [textBox(marker.caption.text, marker.caption.at, SMALL_SIZE)] : []),
];

/** Everything the slide draws, as boxes, for the layout tests. */
export const careerBoxes = (): Box[] => [
  box(LINE.from - HALO_R, LINE_Y - HALO_R, LINE.to - LINE.from + 2 * HALO_R, 2 * HALO_R),
  textBox(CAREER.now.text, CAREER.now.at, SMALL_SIZE, "start"),
  ...CAREER.markers.flatMap(markerWords),
];
