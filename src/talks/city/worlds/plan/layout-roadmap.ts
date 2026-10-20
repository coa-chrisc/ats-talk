/**
 * Slide 20 of the plan world: where every part goes, the id it takes and the
 * words it holds, read from the script.
 *
 * Two lanes across the upper field, lane two (long-term infrastructure and
 * enablement) over lane one (deliver now), each named just above it at its
 * left. Boxes ship into lane one one after another from its empty left end;
 * lane two's five named pieces fill in one at a time, and an arrow runs down
 * from each piece into the box under it, the last two boxes coming up where
 * their arrows land. Under both lanes runs the band of the City's project
 * process, its first three checkpoints on it and the fourth a door. The first
 * box drops into the band at the left, passes each checkpoint (each fills as
 * it goes by), the door opens, and the box goes through. A new box ships into
 * the place the first one left, so lane one stays full.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, SAFE, contentTop, labelBox, labelsOf } from "./layout";

const [NOW, LONG_TERM, ...REST] = labelsOf("roadmap");
/** Lane two's five pieces, then the band's name, its four checkpoints and the door's word, the last thing the slide shows. */
const PIECE_WORDS = REST.slice(0, 5);
const PROCESS = REST[5];
const CHECKS = REST.slice(6, 10);
const DOOR_WORD = REST[10];

const TOP = contentTop("roadmap");
/** A lane's name sits on the line just above it; the lanes run from the safe edge to clear of the door. */
const NAME_GAP = 6;
const LANE = { x: SAFE.left, w: 1412, h: 84, far: TOP + LABEL_LINE + NAME_GAP, near: TOP + 2 * LABEL_LINE + 2 * NAME_GAP + 84 + 14 } as const;
/** Five columns in each lane, right of its empty left end: a piece in lane two over a box in lane one. */
const COLUMN = { x: 200, pitch: 260, w: 240 } as const;
const columnX = (i: number) => COLUMN.x + i * COLUMN.pitch;
const PIECE = { h: 56 } as const;
const BOX = { w: 110, h: 44 } as const;
/** The boxes that ship first; the last two come up under their arrows. */
export const SHIPPED = 3;
/** Where a shipping box sets off from: the empty left end of lane one. */
const SHIP_FROM = LANE.x + 12;
const BAND = { y: LANE.near + LANE.h + 36, h: 56 } as const;
const BAND_MID = BAND.y + BAND.h / 2;
/** The checkpoints along the band: three marks and, at the fourth, the door. */
const CHECK_X = [560, 900, 1240, 1620] as const;
const CHECK_R = 11;
const DOOR = { w: 130, top: LANE.near + 16 } as const;
/** Where the first box comes to rest, through the door. */
const THROUGH_X = 1700;

const pieceAt = (i: number) => box(columnX(i), LANE.far + (LANE.h - PIECE.h) / 2, COLUMN.w, PIECE.h);
const boxAt = (i: number) => box(columnX(i) + (COLUMN.w - BOX.w) / 2, LANE.near + (LANE.h - BOX.h) / 2, BOX.w, BOX.h);
const nameAt = (laneY: number): Point => ({ x: LANE.x, y: laneY - NAME_GAP - LABEL_LINE / 2 });

const first = boxAt(0);
const doorX = CHECK_X[3] - DOOR.w / 2;

export const ROADMAP = {
  /** Lane two above, then lane one. */
  lanes: [
    { key: "roadmap.lane.far", at: box(LANE.x, LANE.far, LANE.w, LANE.h), name: { key: "roadmap.lane.far.name", text: LONG_TERM, at: nameAt(LANE.far) } },
    { key: "roadmap.lane.near", at: box(LANE.x, LANE.near, LANE.w, LANE.h), name: { key: "roadmap.lane.near.name", text: NOW, at: nameAt(LANE.near) } },
  ],
  /** Lane two's pieces, each named in its middle. */
  pieces: PIECE_WORDS.map((text, i) => {
    const at = pieceAt(i);
    return { key: `roadmap.piece.${i}`, at, label: { key: `roadmap.piece.${i}.label`, text, at: { x: at.x + at.w / 2, y: at.y + at.h / 2 } as Point } };
  }),
  /** Each box in its place in lane one. One that ships slides in from `from` px to its left; one that comes up under an arrow rises there. */
  boxes: Array.from({ length: 5 }, (_, i) => ({ key: `roadmap.box.${i}`, at: boxAt(i), from: SHIP_FROM - boxAt(i).x })),
  /** The box that ships into the first box's place once that one has gone down to the band, so the lane stays full. */
  refill: { key: "roadmap.box.refill", at: first, from: SHIP_FROM - first.x },
  /** An arrow from each piece down to the box under it. */
  arrows: PIECE_WORDS.map((_, i) => ({ key: `roadmap.arrow.${i}`, from: pieceAt(i), to: boxAt(i), box: i })),
  band: { key: "roadmap.band", at: box(SAFE.left, BAND.y, SAFE.right - SAFE.left, BAND.h), name: { key: "roadmap.band.name", text: PROCESS, at: { x: LANE.x + 24, y: BAND_MID } as Point } },
  /** The four checkpoints: a mark on the band for the first three (it fills as the box passes), the door at the fourth; each named under the band. */
  checks: CHECKS.map((text, i) => ({
    key: `roadmap.check.${i}`,
    at: { x: CHECK_X[i], y: BAND_MID } as Point,
    r: CHECK_R,
    name: { key: `roadmap.check.${i}.name`, text, at: { x: CHECK_X[i], y: BAND.y + BAND.h + 28 } as Point },
  })),
  door: {
    key: "roadmap.door",
    leaf: "roadmap.door.leaf",
    way: "roadmap.door.way",
    at: box(doorX, DOOR.top, DOOR.w, BAND.y + BAND.h - DOOR.top),
    word: { key: "roadmap.door.word", text: DOOR_WORD, at: { x: CHECK_X[3], y: DOOR.top - 26 } as Point },
  },
  /** The first box's way to the door: down into the band, then along it and through. */
  journey: { down: BAND_MID - BOX.h / 2 - first.y, along: THROUGH_X - first.x },
};

/** Where along the first box's run each checkpoint and the door's near jamb are passed, as fractions of the run: its middle reaches a checkpoint, its front reaches the jamb. */
export const passAt = (() => {
  const start = first.x + BOX.w / 2;
  const run = ROADMAP.journey.along;
  return {
    checks: CHECK_X.slice(0, 3).map((x) => (x - start) / run),
    jamb: (doorX - BOX.w - first.x) / run,
  };
})();

/** Everything 20 draws under its story band, for the layout test, the first box at the end of its run. */
export const ROADMAP_BOXES: Box[] = [
  ...ROADMAP.lanes.flatMap((lane) => [lane.at, labelBox(lane.name.at, lane.name.text, "start")]),
  ...ROADMAP.pieces.flatMap((piece) => [piece.at, labelBox(piece.label.at, piece.label.text)]),
  ROADMAP.band.at,
  ...ROADMAP.checks.map((check) => labelBox(check.name.at, check.name.text)),
  ROADMAP.door.at,
  labelBox(ROADMAP.door.word.at, DOOR_WORD),
  { ...first, x: first.x + ROADMAP.journey.along, y: first.y + ROADMAP.journey.down },
];
