/**
 * Slide 24's places: four bands across the whole field, stacked from the
 * least autonomy at the top to the most at the foot, each in its own hue
 * with its level's name at its left and its caption in a column after it.
 * Three agents are put in a level each, in the short list under the bands:
 * each row the talk's hexagon agent (department-map.ts), standing still,
 * with its level's name and an owner's nameplate.
 * The grey tag sits at the list's left, level with its middle row. Words
 * are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { AGENT } from "../department-map";
import { LABEL_LINE, SAFE, TAG, contentTop, groupOf, labelsOf, tagWidth, wordsBox, wordsWidth } from "./layout";

const [NO_GO, NO_GO_CAPTION, ASSIST, ASSIST_CAPTION, APPROVAL, APPROVAL_CAPTION, BOUNDED, BOUNDED_CAPTION, OWNER, LIST_TAG] = labelsOf("levels");

/** The kit's role each band is painted in, top to bottom; the first is grey, which no role names (ready.css). */
export type BandHue = "grey" | "review" | "lead" | "fix";

const TOP = contentTop("levels");
/** Each band: 64 tall, a 32 px name on it with about 10 px over and under; 10 between bands, so they read as four and as one stack. */
const BAND = { h: 64, gap: 10 } as const;
/** The name's left edge, 32 in from the band's; the captions' column, clear of the longest name (about 350 px at 32 px semibold, 412 by the wide estimate) by 44. */
const NAME_X = SAFE.left + 32;
const CAPTION_X = 584;
/** Where an agent lands in its band: right of the longest caption (about 520 px from 584) with room to spare, in the band's open right third. */
const AGENT_X = 1240;
/** The hexagon agent as a row glyph: 0.4 of its size, 28 by 36, so it fits a 50 px list row with room over and under (about 25 px tall at 1366). */
export const LEVEL_AGENT_SCALE = 0.4;
/** Half the glyph's height, which bounds it both ways: the room the layout keeps round an agent's middle. */
export const LEVEL_AGENT_R = Math.ceil((AGENT.h * LEVEL_AGENT_SCALE) / 2);
/** The glyph's box about its middle `c`. */
const agentBox = (c: Point): Box => box(c.x - (AGENT.w * LEVEL_AGENT_SCALE) / 2, c.y - (AGENT.h * LEVEL_AGENT_SCALE) / 2, AGENT.w * LEVEL_AGENT_SCALE, AGENT.h * LEVEL_AGENT_SCALE);
/** The list: three rows 50 apart, the first 40 under the bands' foot, so the last row's agent ends 2 px over the floor. */
const LIST = { gap: 40, pitch: 50 } as const;
/** In a row: the level's name 36 right of the agent's middle, and the nameplate after the longest name (about 290 px at 26 px semibold). */
const ROW = { name: AGENT_X + 36, plate: AGENT_X + 380 } as const;
/** The nameplate: a small person's head and shoulders, then the word, 34 tall. */
export const PLATE = { h: 34, pad: 14, icon: 22 } as const;

const bandTop = (i: number) => TOP + i * (BAND.h + BAND.gap);
const bandsFoot = bandTop(4) - BAND.gap;
const rowY = (i: number) => bandsFoot + LIST.gap + i * LIST.pitch;
/** The plate's word as Geist sets it at 26 px semibold with the label's tracking (85 px, from the font), so it keeps its pad on both sides. */
const OWNER_W = Math.max(85, wordsWidth(OWNER));
const plateW = PLATE.pad + PLATE.icon + 10 + OWNER_W + PLATE.pad;

const BANDS = [
  { hue: "grey" as BandHue, name: NO_GO, caption: NO_GO_CAPTION },
  { hue: "review" as BandHue, name: ASSIST, caption: ASSIST_CAPTION },
  { hue: "lead" as BandHue, name: APPROVAL, caption: APPROVAL_CAPTION },
  { hue: "fix" as BandHue, name: BOUNDED, caption: BOUNDED_CAPTION },
];

export const LEVELS = {
  ...groupOf("levels"),
  bands: BANDS.map((band, i) => {
    const at = box(SAFE.left, bandTop(i), SAFE.right - SAFE.left, BAND.h);
    const mid = at.y + at.h / 2;
    return {
      key: `levels.band.${i}`,
      hue: band.hue,
      at,
      name: { key: `levels.band.${i}.name`, text: band.name, at: { x: NAME_X, y: mid } as Point },
      caption: { key: `levels.band.${i}.caption`, text: band.caption, at: { x: CAPTION_X, y: mid } as Point },
    };
  }),
  /** One agent in each band but the first: nothing runs at that level without a person, so no agent is put there. */
  rows: [1, 2, 3].map((band, i) => {
    const y = rowY(i);
    const from = bandTop(band) + BAND.h / 2;
    const level = BANDS[band];
    return {
      band,
      hue: level.hue,
      /** The agent's middle in its row, and its hexagon's top point, where the drawing is set from; `drop` is how far above the row its band's middle is. */
      agent: { key: `levels.row.${i}.agent`, at: { x: AGENT_X, y } as Point, top: { x: AGENT_X, y: y - (AGENT.h * LEVEL_AGENT_SCALE) / 2 } as Point, drop: from - y },
      name: { key: `levels.row.${i}.name`, text: level.name, at: { x: ROW.name, y } as Point },
      plate: { key: `levels.row.${i}.plate`, text: OWNER, at: box(ROW.plate, y - PLATE.h / 2, plateW, PLATE.h) },
    };
  }),
  /** The grey tag at the list's foot, on its left, level with the middle row. */
  tag: { key: "levels.tag", text: LIST_TAG, at: box(NAME_X, rowY(1) - TAG.h / 2, tagWidth(LIST_TAG), TAG.h) },
};

/** Everything slide 24 draws under its story band, for the layout test: each agent in its band and in its row. */
export const LEVELS_BOXES: Box[] = [
  ...LEVELS.bands.flatMap((band) => [band.at, wordsBox(band.name.at, band.name.text, 32, "start"), wordsBox(band.caption.at, band.caption.text, 26, "start")]),
  ...LEVELS.rows.flatMap((row) => [
    agentBox(row.agent.at),
    agentBox({ x: row.agent.at.x, y: row.agent.at.y + row.agent.drop }),
    wordsBox(row.name.at, row.name.text, 26, "start"),
    row.plate.at,
  ]),
  LEVELS.tag.at,
];

/** The bands' foot and the list rows' line, for the layout test. */
export const LEVELS_MEASURES = { bandsFoot, line: LABEL_LINE } as const;
