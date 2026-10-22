/**
 * Slide 18's places, in three zones across the stage. At the left, slide
 * 17's round table drawn small, seen from above: ten chairs round it, the
 * bottom three larger, a green person standing at each. In the middle, the
 * team's box, named inside its top, with four places in a row where the
 * four who step out from the table stand, a nameplate under the first; the
 * three tiles under the box; and under them the fenced yard of slide 13
 * drawn small, two green people in it and its caption under it. At the
 * right, the departments' outline with its name and three of its staff,
 * and the line from the team's box to it, its caption under the line. Words
 * are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { FENCE, fenceBox } from "../department-map";
import { LABEL_LINE, SAFE, contentTop, layerOf, polar, round, wordsWidth } from "./layout";

const [TEAM, LEAD, STRATEGY, ARCHITECTURE, CONSULTING, DEPARTMENTS, ADVISES, AZURE] = shown("program-team", "play");

/** Where the slide's drawing starts, under its story band: 536. */
const TOP = contentTop("program-team");

/* The table, left */

/** A person standing at the table or in the box: the kit's person, a little smaller than slide 17's 36 by 48. */
export const MEMBER = { w: 32, h: 43 } as const;
/** A chair seen from above, a little smaller than slide 17's 56, and how much the three bottom ones are grown, as slide 17 left them. */
export const SEAT_18 = { w: 44, h: 44, rx: 10, grow: 1.3 } as const;
const SEATS = 10;
/** The bottom three seats, the ones slide 17 grew. */
const LEADING_SEATS: readonly number[] = [2, 3, 4];

/**
 * The table: its top 88 across the radius, the chairs on a ring of 122. Its
 * middle stands so the top chair clears the drawing's top by 4 px, and far
 * enough in from the band's left edge for the left chair.
 */
const RING = 122;
const TABLE = { c: { x: 290, y: TOP + RING + SEAT_18.w / 2 + 4 } as Point, r: 88 } as const;
/** Seats round the table as slide 17 set them: the first just above the right, going round clockwise. */
const seatAt = (i: number) => polar(TABLE.c, RING, (360 / SEATS) * i - 18);

/* The team's box, middle */

/** The box: from x 600 to 1180, from 4 px under the drawing's top, 168 tall: its name's line, a row of four people, and the nameplate's line. */
const TEAM_BOX = box(600, TOP + 4, 580, 168);
const NAME_Y = TEAM_BOX.y + 32;
/** The four places in the box, a quarter of its width each, the people standing 60 px under its top. */
const PLACE_Y = TEAM_BOX.y + 60;
const placeX = (i: number) => round(TEAM_BOX.x + TEAM_BOX.w / 8 + (i * TEAM_BOX.w) / 4);
/**
 * Which seat each place's person leaves: the four nearest the box, the top
 * of the table round to just below its right. The first place, the lead,
 * takes the one from just above the right, so no two paths cross on the way.
 */
const FROM_SEAT: readonly number[] = [0, 9, 8, 1];
/** The nameplate under the lead, 10 px under the person's feet, as wide as its word and some. */
const PLATE = { h: 34, pad: 20, gap: 10 } as const;
const PLATE_W = wordsWidth(LEAD, 26) + 2 * PLATE.pad;

/** The three tiles under the box: 16 px under it, the box's width between them, 20 apart, 56 tall. */
const TILE = { gap: 20, h: 56, y: TEAM_BOX.y + TEAM_BOX.h + 16 } as const;
const TILE_W = (TEAM_BOX.w - 2 * TILE.gap) / 3;

/**
 * The yard under the tiles: slide 13's fence drawn small, 520 by 88, under
 * the box's middle, its pickets at 0.8 of slide 13's, their tips 25 px
 * under the tiles. It is as wide as its long caption (about 640
 * px at 26 px) less a little each side, so the caption reads as the yard's
 * and not as a line across the stage. Two people stand inside it, 72 px
 * each side of its middle, its caption 14 px under its foot.
 */
const FENCE_SCALE = 0.8;
const YARD = box(TEAM_BOX.x + TEAM_BOX.w / 2 - 260, TILE.y + TILE.h + 25 + round(FENCE.picket.rise * FENCE_SCALE), 520, 88);
const YARD_PEOPLE = [YARD.x + YARD.w / 2 - 72, YARD.x + YARD.w / 2 + 72];

/* The departments, right */

/** The departments' outline: from x 1480 to the band's edge, level with the team's box; its name inside its top, three of its staff under it. */
const DEPT = box(1480, TEAM_BOX.y, SAFE.right - 1480, TEAM_BOX.h);
const STAFF_X = [0, 1, 2].map((i) => round(DEPT.x + DEPT.w / 6 + (i * DEPT.w) / 3));

/** The line from the box's right edge to the outline's left, level with the people's middles; its head 4 px short of the outline. */
const LINE_Y = PLACE_Y + MEMBER.h / 2;
const LINE = { from: { x: TEAM_BOX.x + TEAM_BOX.w + 4, y: LINE_Y } as Point, to: { x: DEPT.x - 6, y: LINE_Y } as Point };

const standing = (x: number, y: number): Box => box(round(x - MEMBER.w / 2), y, MEMBER.w, MEMBER.h);

/** The table's people: each at its seat, but the four who step out, drawn at their place in the box and moved back to their seat by `from` until they walk. */
const MEMBERS = Array.from({ length: SEATS }, (_, seat) => {
  const place = FROM_SEAT.indexOf(seat);
  const at = seatAt(seat);
  const home = box(round(at.x - MEMBER.w / 2), round(at.y - MEMBER.h / 2), MEMBER.w, MEMBER.h);
  const end = place < 0 ? home : standing(placeX(place), PLACE_Y);
  return {
    key: `program-team.member.${seat}`,
    glyph: `program-team.member.${seat}.glyph`,
    seat,
    place,
    at: end,
    home,
    from: { x: round(home.x - end.x), y: round(home.y - end.y) },
  };
});

export const PROGRAM_TEAM = {
  ...layerOf("program-team"),
  table: {
    key: "program-team.table",
    c: TABLE.c,
    r: TABLE.r,
    seats: Array.from({ length: SEATS }, (_, i) => ({ key: `program-team.seat.${i}`, at: seatAt(i), leading: LEADING_SEATS.includes(i) })),
  },
  members: MEMBERS,
  /** The four who step out, in the order of their places, the lead first. */
  team: FROM_SEAT.map((seat) => MEMBERS[seat]),
  /** The six who stay at the table. */
  stay: MEMBERS.filter((member) => member.place < 0),
  box: { key: "program-team.box", at: TEAM_BOX, name: { key: "program-team.box.name", text: TEAM, at: { x: TEAM_BOX.x + TEAM_BOX.w / 2, y: NAME_Y } as Point } },
  plate: { key: "program-team.plate", text: LEAD, at: box(round(placeX(0) - PLATE_W / 2), PLACE_Y + MEMBER.h + PLATE.gap, PLATE_W, PLATE.h) },
  tiles: [STRATEGY, ARCHITECTURE, CONSULTING].map((text, i) => {
    const at = box(round(TEAM_BOX.x + i * (TILE_W + TILE.gap)), TILE.y, round(TILE_W), TILE.h);
    return { key: `program-team.tile.${i}`, text, at, words: { x: at.x + at.w / 2, y: at.y + at.h / 2 } as Point };
  }),
  line: { key: "program-team.line", ...LINE, caption: { key: "program-team.line.caption", text: ADVISES, at: { x: (LINE.from.x + LINE.to.x) / 2, y: LINE_Y + 18 + LABEL_LINE / 2 } as Point } },
  dept: {
    key: "program-team.dept",
    at: DEPT,
    name: { key: "program-team.dept.name", text: DEPARTMENTS, at: { x: DEPT.x + DEPT.w / 2, y: NAME_Y } as Point },
    staff: STAFF_X.map((x, i) => ({ key: `program-team.staff.${i}`, at: standing(x, PLACE_Y) })),
  },
  yard: {
    key: "program-team.yard",
    at: YARD,
    /** The fence at its scale, and what it covers, its pickets' tips included. */
    scale: FENCE_SCALE,
    reach: fenceBox(YARD, FENCE_SCALE),
    people: YARD_PEOPLE.map((x, i) => ({ key: `program-team.yard.person.${i}`, at: standing(x, YARD.y + (YARD.h - MEMBER.h) / 2) })),
    caption: { key: "program-team.yard.caption", text: AZURE, at: { x: YARD.x + YARD.w / 2, y: YARD.y + YARD.h + 14 + LABEL_LINE / 2 } as Point },
  },
};
