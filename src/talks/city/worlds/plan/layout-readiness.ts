/**
 * Slides 20b and 21 of the plan world: where every part goes, the id it
 * takes and the words it holds, read from the script.
 *
 * 20b: a spear tip comes in from the left, named on its face, its shaft line
 * drawing behind it; then four shafts fill in one at a time along that line,
 * each from its front end back, each named inside and each ending behind the
 * tip. On the right a person, named over their head, walks up to a front
 * counter named on its face, and the person behind the counter turns their
 * head toward them and steps across.
 *
 * 21: a small building rises on a named foundation, on named ground; a
 * nameplate goes up over its door. A path is laid along the ground from it to
 * the dashed outline of a second building, named on its own plate, which
 * then fills in.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { SAFE, labelBox, labelWidth, labelsOf, personAt } from "./layout";

/* 20b. AI readiness */

const [TIP, ...REST] = labelsOf("readiness");
const SHAFT_NAMES = REST.slice(0, 4);
const [VISITOR, DESK] = REST.slice(4);

/** The spear's middle line: the shaft line runs along it, and the counter's scene stands on the same height. */
const SPEAR_Y = 790;
/** The tip: a triangle whose base stands just past the shafts' ends, taller than the shafts together, so it leads them. */
const TIP_BASE = { x: 820, half: 140 } as const;
const TIP_POINT = { x: TIP_BASE.x + 280, y: SPEAR_Y } as const;
/** The four shafts, two over the shaft line and two under it, each ending behind the tip: the inner two closer, the outer two farther back. */
const SHAFT = { h: 44, gap: 4, line: 16, inner: { from: SAFE.left + 40, back: 32 }, outer: { from: SAFE.left + 80, back: 72 } } as const;
const shaftY = [
  SPEAR_Y - SHAFT.line / 2 - 2 * SHAFT.h - SHAFT.gap,
  SPEAR_Y - SHAFT.line / 2 - SHAFT.h,
  SPEAR_Y + SHAFT.line / 2,
  SPEAR_Y + SHAFT.line / 2 + SHAFT.h + SHAFT.gap,
] as const;
const shaftAt = (i: number) => {
  const { from, back } = i === 1 || i === 2 ? SHAFT.inner : SHAFT.outer;
  return box(from, shaftY[i], TIP_BASE.x - back - from, SHAFT.h);
};
/** The tip comes in from the field's left edge, the shaft line drawing behind it as it goes. */
const TIP_FROM = SAFE.left - TIP_BASE.x;
/** The socket where the shaft line meets the tip. */
const SOCKET = { w: 16, half: 22 } as const;
const FLOOR = { y: 900, from: 1200, to: SAFE.right } as const;
const COUNTER = { x: 1540, w: 240, top: 806 } as const;
const VISITOR_SCALE = 1.5;
const visitorEnd = personAt(1420, 0, VISITOR_SCALE);
const helperAt = personAt(1640, 0, VISITOR_SCALE);
const helperBox = { ...helperAt, y: COUNTER.top + 22 - helperAt.h };
/** The staff member's head, which turns: its middle, its radius (as `Figure` draws it), and a nose that shows which way it faces. */
const head = { x: helperBox.x + helperBox.w / 2, y: helperBox.y + helperBox.w * 0.25 + 2, r: helperBox.w * 0.25 };

export const READINESS = {
  tip: {
    key: "readiness.tip",
    d: `M${TIP_BASE.x} ${SPEAR_Y - TIP_BASE.half}L${TIP_POINT.x} ${TIP_POINT.y}L${TIP_BASE.x} ${SPEAR_Y + TIP_BASE.half}Z`,
    socket: box(TIP_BASE.x - SOCKET.w, SPEAR_Y - SOCKET.half, SOCKET.w, 2 * SOCKET.half),
    from: TIP_FROM,
    name: { text: TIP, at: { x: TIP_BASE.x + 100, y: TIP_POINT.y } as Point },
  },
  /** The shaft line behind the tip, from the field's left edge to the socket. */
  line: { key: "readiness.line", from: { x: SAFE.left, y: SPEAR_Y } as Point, to: { x: TIP_BASE.x - SOCKET.w, y: SPEAR_Y } as Point },
  /** Each shaft fills in from its front end, by the tip, back toward the left. */
  shafts: SHAFT_NAMES.map((text, i) => ({
    key: `readiness.shaft.${i}`,
    at: shaftAt(i),
    name: { key: `readiness.shaft.${i}.name`, text, at: { x: shaftAt(i).x + 24, y: shaftY[i] + SHAFT.h / 2 } as Point },
  })),
  floor: { key: "readiness.floor", from: { x: FLOOR.from, y: FLOOR.y } as Point, to: { x: FLOOR.to, y: FLOOR.y } as Point },
  counter: { key: "readiness.counter", at: box(COUNTER.x, COUNTER.top, COUNTER.w, FLOOR.y - COUNTER.top), name: { text: DESK, at: { x: COUNTER.x + COUNTER.w / 2, y: (COUNTER.top + FLOOR.y) / 2 + 6 } as Point } },
  /** The person behind the counter, shown from the chest up over it, facing away at first; their head turns (`face`) toward the visitor, then they step `step` px across. */
  helper: {
    key: "readiness.helper",
    at: helperBox,
    step: -56,
    face: { key: "readiness.helper.face", head, nose: `M${head.x + head.r - 1} ${head.y - 6}L${head.x + head.r + 8} ${head.y + 3}L${head.x + head.r - 1} ${head.y + 6}Z` },
  },
  /** The visitor walks in from `from` px to the left of where they stop, their name centred over their head going with them. */
  visitor: {
    key: "readiness.visitor",
    at: { ...visitorEnd, y: FLOOR.y - visitorEnd.h },
    from: -220,
    name: { text: VISITOR, at: { x: visitorEnd.x + visitorEnd.w / 2, y: FLOOR.y - visitorEnd.h - 26 } as Point },
  },
};

/** Everything 20b draws under its story band, for the layout test, the visitor where they stop and where they set off. */
export const READINESS_BOXES: Box[] = [
  box(TIP_BASE.x, SPEAR_Y - TIP_BASE.half, TIP_POINT.x - TIP_BASE.x, 2 * TIP_BASE.half),
  ...READINESS.shafts.map((shaft) => shaft.at),
  READINESS.counter.at,
  READINESS.helper.at,
  READINESS.visitor.at,
  { ...READINESS.visitor.at, x: READINESS.visitor.at.x + READINESS.visitor.from },
  labelBox(READINESS.visitor.name.at, VISITOR),
  labelBox({ ...READINESS.visitor.name.at, x: READINESS.visitor.name.at.x + READINESS.visitor.from }, VISITOR),
  box(FLOOR.from, FLOOR.y - 2, FLOOR.to - FLOOR.from, 4),
];

/** Whether the tip's name fits inside the triangle at its height: its right end left of the slanted side there. */
export const TIP_FITS = READINESS.tip.name.at.x + labelWidth(TIP) / 2 <= TIP_POINT.x - ((TIP_POINT.x - TIP_BASE.x) * 14) / TIP_BASE.half;
export const SHAFTS = {
  top: shaftY[0],
  foot: shaftY[3] + SHAFT.h,
  end: Math.max(...READINESS.shafts.map((shaft) => shaft.at.x + shaft.at.w)),
  tipBase: TIP_BASE.x,
  tip: { top: SPEAR_Y - TIP_BASE.half, foot: SPEAR_Y + TIP_BASE.half, middle: SPEAR_Y, point: TIP_POINT.x },
} as const;

/* 21. Built to last */

const [FOUNDATION, PLATE_WORDS, GROUND, NEXT] = labelsOf("built-to-last");

const GROUND_BAND = { y: 912, h: 64 } as const;
/** Low enough that the roof stands well clear of the story lines. */
const HOUSE = { foundation: { x: 220, w: 480, h: 60 }, body: { inset: 60, h: 184 }, eave: 24, roof: 72, door: { w: 100, h: 80 }, plate: { h: 40, pad: 12, gap: 8 }, window: { w: 60, h: 26, y: 16 } } as const;
/** The second building stands this far right of the first. */
const SECOND = 1040;
/** The path's stones, in the ground just under its line, from one foundation's edge to the other's: `inset` px from each, about `gap` apart. */
const STONE = { w: 40, h: 10, gap: 24, y: GROUND_BAND.y + 12, inset: 6 } as const;

const houseAt = (dx: number) => {
  const f = box(HOUSE.foundation.x + dx, GROUND_BAND.y - HOUSE.foundation.h, HOUSE.foundation.w, HOUSE.foundation.h);
  const body = box(f.x + HOUSE.body.inset, f.y - HOUSE.body.h, f.w - 2 * HOUSE.body.inset, HOUSE.body.h);
  const mid = f.x + f.w / 2;
  const door = box(mid - HOUSE.door.w / 2, f.y - HOUSE.door.h, HOUSE.door.w, HOUSE.door.h);
  const plateW = (words: string) => labelWidth(words) + 2 * HOUSE.plate.pad;
  return {
    foundation: f,
    body,
    roof: `M${body.x - HOUSE.eave} ${body.y}L${mid} ${body.y - HOUSE.roof}L${body.x + body.w + HOUSE.eave} ${body.y}Z`,
    door,
    windows: [body.x + 40, body.x + body.w - 40 - HOUSE.window.w].map((x) => box(x, body.y + HOUSE.window.y, HOUSE.window.w, HOUSE.window.h)),
    plate: (words: string) => box(Math.round(mid - plateW(words) / 2), door.y - HOUSE.plate.gap - HOUSE.plate.h, plateW(words), HOUSE.plate.h),
    /** Where the building rises from: the foot of its body, at its middle. */
    base: { x: mid, y: f.y } as Point,
    top: body.y - HOUSE.roof,
    mid,
  };
};

const FIRST = houseAt(0);
const NEXT_HOUSE = houseAt(SECOND);

export const BUILT = {
  ground: { key: "built-to-last.ground", at: box(SAFE.left, GROUND_BAND.y, SAFE.right - SAFE.left, GROUND_BAND.h), name: { key: "built-to-last.ground.name", text: GROUND, at: { x: SAFE.left + 24, y: GROUND_BAND.y + GROUND_BAND.h - 22 } as Point } },
  first: {
    foundation: { key: "built-to-last.first.foundation", at: FIRST.foundation, name: { key: "built-to-last.first.foundation.name", text: FOUNDATION, at: { x: FIRST.mid, y: FIRST.foundation.y + FIRST.foundation.h / 2 } as Point } },
    house: { key: "built-to-last.first.house", ...FIRST },
    plate: { key: "built-to-last.first.plate", text: PLATE_WORDS, at: FIRST.plate(PLATE_WORDS) },
  },
  /** The path along the ground, stone by stone, from the first building's foundation to the second's. */
  path: (() => {
    const from = FIRST.foundation.x + FIRST.foundation.w + STONE.inset;
    const room = NEXT_HOUSE.foundation.x - STONE.inset - from;
    const count = Math.floor((room + STONE.gap) / (STONE.w + STONE.gap));
    /** The gap that puts the first stone at one foundation and the last at the other. */
    const gap = (room - count * STONE.w) / (count - 1);
    return Array.from({ length: count }, (_, i) => ({ key: `built-to-last.path.${i}`, at: box(Math.round(from + i * (STONE.w + gap)), STONE.y, STONE.w, STONE.h) }));
  })(),
  next: {
    outline: { key: "built-to-last.next.outline", at: box(NEXT_HOUSE.foundation.x, NEXT_HOUSE.top, NEXT_HOUSE.foundation.w, GROUND_BAND.y - NEXT_HOUSE.top) },
    foundation: { key: "built-to-last.next.foundation", at: NEXT_HOUSE.foundation },
    house: { key: "built-to-last.next.house", ...NEXT_HOUSE },
    plate: { key: "built-to-last.next.plate", text: NEXT, at: NEXT_HOUSE.plate(NEXT) },
  },
};

/** The second building's outline as one path in its own box's pixels: foundation, walls and roof. */
export const outlinePath = (() => {
  const h = NEXT_HOUSE;
  const o = BUILT.next.outline.at;
  const x = (v: number) => v - o.x;
  const y = (v: number) => v - o.y;
  const f = h.foundation;
  return [
    `M${x(f.x)} ${y(f.y)}H${x(f.x + f.w)}V${y(f.y + f.h)}H${x(f.x)}Z`,
    `M${x(h.body.x)} ${y(f.y)}V${y(h.body.y)}H${x(h.body.x + h.body.w)}V${y(f.y)}`,
    `M${x(h.body.x - HOUSE.eave)} ${y(h.body.y)}L${x(h.mid)} ${y(h.top)}L${x(h.body.x + h.body.w + HOUSE.eave)} ${y(h.body.y)}Z`,
  ].join("");
})();

/** Everything 21 draws under its story band, for the layout test. */
export const BUILT_BOXES: Box[] = [
  BUILT.ground.at,
  labelBox(BUILT.ground.name.at, GROUND, "start"),
  BUILT.next.outline.at,
  box(FIRST.foundation.x, FIRST.top, FIRST.foundation.w, GROUND_BAND.y - FIRST.top),
  BUILT.first.plate.at,
  BUILT.next.plate.at,
  ...BUILT.path.map((stone) => stone.at),
];
