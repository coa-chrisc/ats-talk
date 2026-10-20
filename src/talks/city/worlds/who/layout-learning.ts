/**
 * Slide 3, how he keeps learning: two groups of logos under the two-line
 * title's story band, each under its own heading. The courses group: seven
 * logo tiles, four in the top row and three centred under them, and the
 * larger card at the right as tall as both rows, the institution's logo on
 * its face with its course title, school and when. The partners group under
 * it: 11 logo tiles, six in a row and five centred under them, on the
 * courses' pitch. Every tile is the same size and every logo is sized by
 * its height (`logoSize`). Every word is the click's own (`shown`), read by
 * position; each logo's file is named by its place in that list.
 */
import { STORY, box, type Box } from "@/components/deck/kit";
import { withBase } from "@/lib/base-path";
import { breakAfter, shown } from "../../script/find";

const WORDS = shown("learning", "play");
const [COURSES_HEAD, ...REST] = WORDS;
const COURSES = REST.slice(0, 7);
const [BIG_NAME, BIG_TITLE, BIG_SCHOOL, BIG_WHEN, PARTNERS_HEAD, ...PARTNERS] = REST.slice(7);

/**
 * Each logo's file under public/logos/ (docs/city-logos.md) and its
 * natural width over height, in the order the click shows them: the
 * courses, the larger card's, then the partners.
 */
const FILES: [file: string, aspect: number][] = [
  ["microsoft.v1.svg", 337.6 / 72],
  ["duke.v1.svg", 200.758 / 87.716],
  ["google.v1.svg", 272 / 92],
  ["scrum-alliance.v1.svg", 218.56 / 37.14],
  ["stanford.v1.svg", 640 / 134.115],
  ["ibm.v1.svg", 1075 / 401.15],
  ["icagile.v1.svg", 373.39 / 181.31],
  ["cmu.v1.svg", 178.5 / 16],
  ["jhu.v1.svg", 375.152 / 64.6],
  ["cdc.v1.svg", 299.33 / 235.8],
  ["bchc.v1.png", 1236 / 1244],
  ["bloomberg-philanthropies.v1.svg", 575 / 180],
  ["ut-austin.v1.svg", 278 / 78],
  ["st-edwards.v1.png", 1080 / 181],
  ["gartner.v1.svg", 100 / 23],
  ["quisitive.v1.svg", 132 / 20],
  ["aws.v1.svg", 304 / 182],
  ["anthropic.v1.svg", 1024.2 / 115],
  ["openai.v1.svg", 269.659 / 72.516],
];
const LOGO_DIR = withBase("/logos/");

/** Where the drawing starts under the story band: the courses heading's top. */
export const TOP = 548;

/** A heading over its group: 28 px (who.css `.who-text--heading`) on a 32 px line, 10 px over its tiles, and 26 px of room over the partners heading. */
export const HEAD = { size: 28, line: 32, gap: 10, before: 26 } as const;

/** The tiles: 270 by 78 on a 20 px gap across and 10 px down, every row on one pitch. */
export const TILE = { w: 270, h: 78, gap: 20, down: 10 } as const;
const PITCH = TILE.w + TILE.gap;

/**
 * A logo inside its tile: no wider than the tile less 24 px a side, no taller
 * than the tile less 8 px above and below. Within those, a logo's height
 * falls as its shape widens, by the cube root of its width over its height,
 * so a long wordmark and a square mark carry about the same weight of ink:
 * a 3:1 logo stands 46 px tall, a square one is held at the box's 62 px.
 * One logo that draws to its own edges is held in by a further 6 px.
 */
export const LOGO_BOX = { w: TILE.w - 48, h: TILE.h - 16 } as const;
const WEIGHT = 66;
const EDGE_TO_EDGE = new Set(["icagile.v1.svg"]);
export function logoSize(file: string, aspect: number, room: { w: number; h: number } = LOGO_BOX) {
  const inset = EDGE_TO_EDGE.has(file) ? 6 : 0;
  const h = Math.min(room.h - inset, (room.w - inset) / aspect, WEIGHT / Math.cbrt(aspect));
  return { w: Math.round(h * aspect), h: Math.round(h) };
}

/** A row of `count` tiles at `y`, from the band's left edge, moved right by `indent` pitches. */
const row = (count: number, y: number, indent = 0) => Array.from({ length: count }, (_, i) => box(STORY.x + (indent + i) * PITCH, y, TILE.w, TILE.h));
const rowsOf = (first: number, second: number, y: number) => [...row(first, y), ...row(second, y + TILE.h + TILE.down, (first - second) / 2)];

const coursesTop = TOP + HEAD.line + HEAD.gap;
const coursesFoot = coursesTop + 2 * TILE.h + TILE.down;
const partnersHeadTop = coursesFoot + HEAD.before;
const partnersTop = partnersHeadTop + HEAD.line + HEAD.gap;

/** A logo tile: its place in its group gives its id, its place in the click's words its file. */
const logoAt = (group: "course" | "partner", i: number, text: string, at: Box) => {
  const [file, aspect] = FILES[group === "course" ? i : COURSES.length + 1 + i];
  return { key: `learning.${group}.${i}`, text, at, src: `${LOGO_DIR}${file}`, size: logoSize(file, aspect) };
};

/**
 * The larger card: as tall as the courses' two rows and as wide as two
 * tiles and the gap between them, over the partners' fifth and sixth tiles,
 * so its right edge lines up with theirs, 8 px inside the safe edge (x 1824).
 * Its face: a 3 px edge and 12 px by 24 px of padding;
 * the logo at the top, the course title on two lines under it, and the
 * school and when side by side at the foot.
 */
const BIG_X = STORY.x + 4 * PITCH;
const BIG = box(BIG_X, coursesTop, 2 * TILE.w + TILE.gap, coursesFoot - coursesTop);
export const FACE = { edge: 3, padX: 24, padY: 12 } as const;
const inner = box(BIG.x + FACE.edge + FACE.padX, BIG.y + FACE.edge + FACE.padY, BIG.w - 2 * (FACE.edge + FACE.padX), BIG.h - 2 * (FACE.edge + FACE.padY));
/** The face's type: the title at 28 px on a 30 px line, 10 px under the logo, the school and when at the label size (26 px) on a 30 px line, the when 24 px after the school. */
export const FACE_TYPE = { title: 28, titleLine: 30, logoGap: 10, small: 26, smallLine: 30, apart: 24 } as const;
/** A line's width, erring wide: Geist at 600 runs to about 0.56 of its size a character at most. */
export const typeWidth = (text: string, size: number) => Math.ceil(text.length * size * 0.56);
const CMU = FILES[COURSES.length];
const bigLogo = logoSize(CMU[0], CMU[1], { w: inner.w, h: 26 });
const bigLines = breakAfter(BIG_TITLE, "agentic");
const titleTop = inner.y + bigLogo.h + FACE_TYPE.logoGap;
const footTop = inner.y + inner.h - FACE_TYPE.smallLine;
const schoolW = typeWidth(BIG_SCHOOL, FACE_TYPE.small);

export const LEARNING = {
  courses: {
    head: { key: "learning.head.courses", text: COURSES_HEAD, at: box(STORY.x, TOP, typeWidth(COURSES_HEAD, HEAD.size), HEAD.line) },
    tiles: rowsOf(4, 3, coursesTop).map((at, i) => logoAt("course", i, COURSES[i], at)),
  },
  big: {
    key: "learning.big",
    at: BIG,
    inner,
    logo: { text: BIG_NAME, src: `${LOGO_DIR}${CMU[0]}`, at: box(inner.x, inner.y, bigLogo.w, bigLogo.h) },
    title: { lines: bigLines, at: box(inner.x, titleTop, Math.max(...bigLines.map((line) => typeWidth(line, FACE_TYPE.title))), bigLines.length * FACE_TYPE.titleLine) },
    school: { key: "learning.big.school", text: BIG_SCHOOL, at: box(inner.x, footTop, schoolW, FACE_TYPE.smallLine) },
    when: { key: "learning.big.when", text: BIG_WHEN, at: box(inner.x + schoolW + FACE_TYPE.apart, footTop, typeWidth(BIG_WHEN, FACE_TYPE.small), FACE_TYPE.smallLine) },
  },
  partners: {
    head: { key: "learning.head.partners", text: PARTNERS_HEAD, at: box(STORY.x, partnersHeadTop, typeWidth(PARTNERS_HEAD, HEAD.size), HEAD.line) },
    tiles: rowsOf(6, 5, partnersTop).map((at, i) => logoAt("partner", i, PARTNERS[i], at)),
  },
};
