/**
 * Slides 18 and 19 of the plan world: where every part goes, the id it
 * takes and the words it holds, read from the script.
 *
 * 18: six tiles of the City's plan across the top, the first lit and named;
 * project dots come up from below and attach inside the tiles' feet, most to the
 * first; one project's measure draws along the foot, from its first point to
 * the point it aims at.
 *
 * 19: three departments side by side, each a row of people; a form passes
 * over the rows and lights three people in each; the lit people step out and
 * gather in the middle into three teams of three, one from each department,
 * and one person in each team takes a nameplate.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { PERSON, SAFE, labelBox, labelsOf, personAt } from "./layout";

/* 18. North Star goals */

const [PLAN, PRIORITY, BASELINE, TARGET] = labelsOf("north-star");

/** Six tiles edge to edge across the field, under the plan's name. */
const TILE = { y: 624, w: 258, h: 148, gap: 36, count: 6 } as const;
const tileX = (i: number) => SAFE.left + i * (TILE.w + TILE.gap);
const TILE_FOOT = TILE.y + TILE.h;
/** How many project dots each tile takes: most of them the first. */
const DOTS = [5, 2, 1, 2, 1, 1];
/** Each dot sits inside its tile, `inset` px up from its foot, clear of the edge; it comes up from `from` px below. */
const DOT = { r: 12, pitch: 34, from: 190, inset: 12 } as const;
const DOT_Y = TILE_FOOT - DOT.inset - DOT.r;
/** The first tile's name, on two lines inside it: broken at its last space. */
const nameLines = (() => {
  const at = PRIORITY.lastIndexOf(" ");
  return [PRIORITY.slice(0, at), PRIORITY.slice(at + 1)];
})();
/** The measure line: from its first point, under the chosen dot, up to the point it aims at near the field's right edge. */
const MEASURE = { from: 916, to: { x: 1640, y: 852 }, r: { from: 10, to: 16 } } as const;

const dotsOf = (tile: number) =>
  Array.from({ length: DOTS[tile] }, (_, i) => {
    const cx = tileX(tile) + TILE.w / 2 + (i - (DOTS[tile] - 1) / 2) * DOT.pitch;
    return { key: `north-star.dot.${tile}.${i}`, at: { x: cx, y: DOT_Y } as Point };
  });

const DOT_LIST = Array.from({ length: TILE.count }, (_, tile) => dotsOf(tile)).flat();
/** The one project whose measure is drawn: the first tile's first dot. */
const CHOSEN = DOT_LIST[0];

export const NORTH_STAR = {
  plan: { key: "north-star.plan", text: PLAN, at: { x: SAFE.left, y: TILE.y - 30 } as Point },
  tiles: Array.from({ length: TILE.count }, (_, i) => ({
    key: `north-star.tile.${i}`,
    at: box(tileX(i), TILE.y, TILE.w, TILE.h),
  })),
  /** The first tile lights (a heavier edge and a tint), and its name comes up inside it. */
  lit: { key: "north-star.lit", at: box(tileX(0), TILE.y, TILE.w, TILE.h) },
  name: {
    key: "north-star.name",
    text: PRIORITY,
    lines: nameLines.map((text, i) => ({ text, at: { x: tileX(0) + TILE.w / 2, y: TILE.y + 40 + i * 34 } as Point })),
  },
  /** Each dot sits inside its tile near its foot, attached; it comes up from `from` px below. */
  dots: DOT_LIST,
  dot: DOT,
  chosen: {
    key: CHOSEN.key,
    ring: { key: "north-star.chosen.ring", at: CHOSEN.at, r: 22 },
    /** A leader from the ringed dot straight down to the measure's first point. */
    leader: { key: "north-star.leader", from: { x: CHOSEN.at.x, y: CHOSEN.at.y + 22 }, to: { x: CHOSEN.at.x, y: MEASURE.from - MEASURE.r.from } },
  },
  measure: {
    key: "north-star.measure",
    from: { x: CHOSEN.at.x, y: MEASURE.from } as Point,
    to: MEASURE.to as Point,
    start: { key: "north-star.baseline", at: { x: CHOSEN.at.x, y: MEASURE.from } as Point, r: MEASURE.r.from },
    end: { key: "north-star.target", at: MEASURE.to as Point, r: MEASURE.r.to },
    startLabel: { key: "north-star.baseline.label", text: BASELINE, at: { x: CHOSEN.at.x + 8, y: MEASURE.from + 36 } as Point },
    endLabel: { key: "north-star.target.label", text: TARGET, at: { x: MEASURE.to.x, y: MEASURE.to.y - MEASURE.r.to - 26 } as Point },
  },
};

/** Everything 18 draws under its story band, for the layout test. */
export const NORTH_STAR_BOXES: Box[] = [
  labelBox(NORTH_STAR.plan.at, PLAN, "start"),
  ...NORTH_STAR.tiles.map((tile) => tile.at),
  ...DOT_LIST.map((dot) => box(dot.at.x - DOT.r, dot.at.y - DOT.r, 2 * DOT.r, 2 * DOT.r)),
  labelBox(NORTH_STAR.measure.startLabel.at, BASELINE),
  labelBox(NORTH_STAR.measure.endLabel.at, TARGET),
  box(NORTH_STAR.measure.end.at.x - MEASURE.r.to, NORTH_STAR.measure.end.at.y - MEASURE.r.to, 2 * MEASURE.r.to, 2 * MEASURE.r.to),
];

/* 19. The people */

const [STAFF, SURVEY, OWNER] = labelsOf("people");

/** Three departments side by side across the field, each holding a row of six people. */
const DEPT = { y: 608, w: 540, h: 132, gap: 54, people: 6, pitch: 80, inset: 46 } as const;
const deptX = (i: number) => SAFE.left + i * (DEPT.w + DEPT.gap);
const PEOPLE_Y = DEPT.y + 34;
/** The people the survey finds in each department: three each, in different places along the row. */
const FOUND = [
  [1, 3, 4],
  [0, 2, 5],
  [1, 2, 4],
] as const;
/** Each department's colour: its outline and the people found in it keep it, so a team shows where its people came from. */
export const DEPT_HUES = ["dept-a", "dept-b", "dept-c"] as const;
/** Three teams in the middle under the departments, three people each, one from each department. */
const TEAM = { y: 800, w: 300, h: 150, centres: [480, 960, 1440], pitch: 84 } as const;
const PLATE = { w: 120, h: 40, below: 14 } as const;
/** The form that passes over the rows: a page with a header and lines to tick, its name over it. It goes from the first department's left edge to where the last person found is behind it. */
const FORM = { w: 92, h: 120, y: 604, from: SAFE.left, to: 1630 } as const;

const seatX = (dept: number, seat: number) => deptX(dept) + DEPT.inset + seat * DEPT.pitch;
const memberX = (team: number, member: number) => TEAM.centres[team] - (3 * PERSON.w + 2 * (TEAM.pitch - PERSON.w)) / 2 + member * TEAM.pitch;
const MEMBER_Y = TEAM.y + 22;

export const PEOPLE = {
  staff: { key: "people.staff", text: STAFF, at: { x: SAFE.left, y: DEPT.y + DEPT.h + 28 } as Point },
  depts: Array.from({ length: 3 }, (_, i) => ({
    key: `people.dept.${i}`,
    hue: DEPT_HUES[i],
    at: box(deptX(i), DEPT.y, DEPT.w, DEPT.h),
    /** The people the form does not light: they stay in the row all slide. */
    stay: Array.from({ length: DEPT.people }, (_, seat) => seat)
      .filter((seat) => !(FOUND[i] as readonly number[]).includes(seat))
      .map((seat) => personAt(seatX(i, seat), PEOPLE_Y)),
  })),
  /** The people found, by department: each lights where it stands, then walks to its place in its team (`to` is the offset). */
  found: FOUND.flatMap((seats, dept) =>
    seats.map((seat, team) => {
      const at = personAt(seatX(dept, seat), PEOPLE_Y);
      return {
        key: `people.found.${dept}.${team}`,
        light: `people.found.${dept}.${team}.light`,
        hue: DEPT_HUES[dept],
        dept,
        team,
        at,
        to: { x: memberX(team, dept) - at.x, y: MEMBER_Y - at.y },
      };
    }),
  ),
  teams: TEAM.centres.map((cx, t) => {
    /** Team t's owner is the person from department t, so each department gives one owner. */
    const owner = memberX(t, t);
    return {
      key: `people.team.${t}`,
      at: box(cx - TEAM.w / 2, TEAM.y, TEAM.w, TEAM.h),
      plate: {
        key: `people.team.${t}.owner`,
        text: OWNER,
        at: box(owner + PERSON.w / 2 - PLATE.w / 2, MEMBER_Y + PERSON.h + PLATE.below, PLATE.w, PLATE.h),
      },
    };
  }),
  form: {
    key: "people.form",
    at: box(FORM.from, FORM.y, FORM.w, FORM.h),
    travel: FORM.to - FORM.from,
    label: { text: SURVEY, at: { x: FORM.from, y: FORM.y - 24 } as Point },
  },
};

/**
 * The order the people found set off in: the outer teams first and the middle
 * one last, and in each team whoever has farthest to go first, so no two of
 * them pass over each other on the way.
 */
export const WALK_ORDER = [...PEOPLE.found].sort((a, b) => {
  const outer = (team: number) => Math.abs(TEAM.centres[team] - TEAM.centres[1]);
  return outer(b.team) - outer(a.team) || a.team - b.team || Math.abs(b.to.x) - Math.abs(a.to.x) || a.dept - b.dept;
});

/** When the form's middle reaches each found person's middle, as a fraction of its travel: they light as it passes. */
export const litFraction = (found: (typeof PEOPLE.found)[number]) => (found.at.x + found.at.w / 2 - (FORM.from + FORM.w / 2)) / PEOPLE.form.travel;

/** Everything 19 draws under its story band, for the layout test, the form at both ends of its pass. */
export const PEOPLE_BOXES: Box[] = [
  labelBox(PEOPLE.staff.at, STAFF, "start"),
  ...PEOPLE.depts.map((dept) => dept.at),
  ...PEOPLE.teams.flatMap((team) => [team.at, team.plate.at]),
  PEOPLE.form.at,
  { ...PEOPLE.form.at, x: PEOPLE.form.at.x + PEOPLE.form.travel },
  labelBox(PEOPLE.form.label.at, SURVEY, "start"),
  labelBox({ x: PEOPLE.form.label.at.x + PEOPLE.form.travel, y: PEOPLE.form.label.at.y }, SURVEY, "start"),
];
