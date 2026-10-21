/**
 * Slide 28's places: the four numbered panels on the same pixels as slide
 * 2 draws them, four square-cornered 396 px panels 48 apart across the
 * field from x 96 to 1824, their tops at the content top and 300 tall; each
 * one's numeral at its top left, 28 in on a 72 px line, and its name from
 * 104 down in a 340 px column of 42 px lines, set in HTML and balanced by
 * the browser as slide 2's are, so the two slides break them alike. Under
 * each panel, a green line 48 long from the middle of its foot down to a
 * square tile the panel's width, whose words are set on one or two lines,
 * centred in it up and down; and on each
 * panel's top right corner, inside it, the passed tick. Words are read from
 * the script, by position: the four numerals, the four names, then the
 * four tiles.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter } from "../../script/find";
import { LABEL_LINE, SAFE, contentTop, groupOf, labelsOf, wordsBox, wordsWidth } from "./layout";

const LABELS = labelsOf("applied");
const NUMERALS = LABELS.slice(0, 4);
const NAMES = LABELS.slice(4, 8);
const TILES = LABELS.slice(8, 12);

/** The panels, as slide 2 sets them; a name runs to four 42 px lines at most. */
export const PANEL = { w: 396, gap: 48, h: 300, inset: 28, name: 104, column: 340, nameLine: 42, nameLines: 4 } as const;
/** The numeral, as slide 2 sets it: 56 px type centred on the middle of a 72 px line under the 28 px inset, so its middle is 64 under the panel's top. */
export const NUMERAL = { size: 56, slot: 72, middle: 28 + 36 } as const;
/** The line from a panel's foot down to its tile, and the tile, 88 tall, its lines of words 24 in and 32 apart, centred in it. */
export const TILE = { line: 48, h: 88, rx: 0, inset: 24 } as const;
/** The passed tick: radius 20, centred 40 in from the panel's top right corner, so it sits on the corner and inside the drawing's top. */
export const TICK = { r: 20, in: 40 } as const;

/** Where each tile's words break, by the word a line ends on, at the end of a phrase: set in Geist SemiBold at 26 px, a tile's lines measure at most about 260 px, inside its 348 px of room. */
const TILE_BREAKS: readonly (readonly string[])[] = [["and"], ["sandbox's"], ["and"], ["and"]];

const TOP = contentTop("applied");
const panelX = (i: number) => SAFE.left + i * (PANEL.w + PANEL.gap);
const TILE_TOP = TOP + PANEL.h + TILE.line;

export const APPLIED = {
  ...groupOf("applied"),
  panels: NAMES.map((name, i) => {
    const at = box(panelX(i), TOP, PANEL.w, PANEL.h);
    const mid = at.x + at.w / 2;
    const tile = box(at.x, TILE_TOP, PANEL.w, TILE.h);
    const tileLines = breakAfter(TILES[i], ...TILE_BREAKS[i]);
    return {
      key: `applied.panel.${i}`,
      at,
      numeral: { key: `applied.panel.${i}.numeral`, text: NUMERALS[i], at: { x: at.x + PANEL.inset, y: at.y + NUMERAL.middle } as Point },
      name: { key: `applied.panel.${i}.name`, text: name, at: box(at.x + PANEL.inset, at.y + PANEL.name, PANEL.column, PANEL.nameLines * PANEL.nameLine) },
      line: { key: `applied.line.${i}`, from: { x: mid, y: at.y + at.h } as Point, to: { x: mid, y: TILE_TOP } as Point },
      tile: {
        key: `applied.tile.${i}`,
        at: tile,
        text: TILES[i],
        lines: tileLines,
        words: { x: tile.x + TILE.inset, y: tile.y + (tile.h - tileLines.length * LABEL_LINE) / 2 + LABEL_LINE / 2 } as Point,
      },
      tick: { key: `applied.tick.${i}`, at: { x: at.x + at.w - TICK.in, y: at.y + TICK.in } as Point },
    };
  }),
};

/** A numeral's box: its words at 56 px, a 72 px line tall, about its middle. */
export const numeralBox = (numeral: { at: Point; text: string }): Box => box(numeral.at.x, numeral.at.y - NUMERAL.slot / 2, wordsWidth(numeral.text, NUMERAL.size), NUMERAL.slot);

/** A run of lines' boxes, each line's middle a pitch under the last. */
export const linesBoxes = (at: Point, lines: readonly string[], size: number, pitch: number): Box[] => lines.map((line, i) => wordsBox({ x: at.x, y: at.y + i * pitch }, line, size, "start"));

/** Everything slide 28 draws under its story band, for the layout test. */
export const APPLIED_BOXES: Box[] = APPLIED.panels.flatMap((panel) => [
  panel.at,
  numeralBox(panel.numeral),
  panel.name.at,
  panel.tile.at,
  ...linesBoxes(panel.tile.words, panel.tile.lines, 26, LABEL_LINE),
  box(panel.tick.at.x - TICK.r, panel.tick.at.y - TICK.r, 2 * TICK.r, 2 * TICK.r),
]);
