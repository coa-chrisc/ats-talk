/**
 * Where the plan world's parts sit: every slide's drawing under its story
 * band and inside the safe area, and the parts that share a slide clear of
 * each other where the eye has to tell them apart.
 */
import { describe, expect, it } from "vitest";
import { AGENT_R, CONTENT_TOP, STORY, box, type Box } from "@/components/deck/kit";
import { SAFE, SAFE_BOTTOM, bandOf, contentTop, labelBox, labelsOf } from "./layout";
import { NORTH_STAR, NORTH_STAR_BOXES, PEOPLE, PEOPLE_BOXES } from "./layout-goals";
import { LIFT_DEVELOPERS_BOXES } from "./layout-lift-developers";
import { PROGRAM_TEAM_BOXES } from "./layout-program-team";
import { KNOWLEDGE, KNOWLEDGE_BOXES, LIFT, poolBox } from "./layout-knowledge";
import { BUILT, BUILT_BOXES, READINESS, READINESS_BOXES, SHAFTS, TIP_FITS } from "./layout-readiness";
import { RAIL_TOP, RAIL_X, RESIDENTS, RESIDENTS_BOXES } from "./layout-residents";
import { ROADMAP, ROADMAP_BOXES, SHIPPED } from "./layout-roadmap";
import { apart, bottom, inside } from "./harness";

const SLIDES: [string, Box[]][] = [
  ["north-star", NORTH_STAR_BOXES],
  ["people", PEOPLE_BOXES],
  ["program-team", PROGRAM_TEAM_BOXES],
  ["lift-developers", LIFT_DEVELOPERS_BOXES],
  ["roadmap", ROADMAP_BOXES],
  ["knowledge", KNOWLEDGE_BOXES],
  ["readiness", READINESS_BOXES],
  ["built-to-last", BUILT_BOXES],
  ["residents", RESIDENTS_BOXES],
];

const STAGE = box(SAFE.left, 64, SAFE.right - SAFE.left, SAFE_BOTTOM - 64);
const pairs = <T,>(list: T[]) => list.flatMap((a, i) => list.slice(i + 1).map((b) => [a, b] as const));
const named = (boxes: Record<string, Box>) => Object.entries(boxes);
const clear = (boxes: Record<string, Box>, gap = 0) => pairs(named(boxes)).filter(([[, a], [, b]]) => !apart(a, b, gap)).map(([[p], [q]]) => `${p} / ${q}`);

describe("every slide of the plan world", () => {
  it.each(SLIDES)("starts %s's drawing 32 px under the kit's line, so its story lines have room above it", (id) => {
    expect(contentTop(id)).toBe(CONTENT_TOP[bandOf(id) as keyof typeof CONTENT_TOP] + 32);
  });

  it.each(SLIDES)("draws %s under its story band and inside the safe area", (id, boxes) => {
    expect(boxes.length).toBeGreaterThan(4);
    for (const b of boxes) {
      expect(b.y, JSON.stringify(b)).toBeGreaterThanOrEqual(contentTop(id));
      expect(inside(b, STAGE), JSON.stringify(b)).toBe(true);
    }
  });
});

describe("18, the North Star goals", () => {
  it("keeps the six tiles apart, the first one's name inside it, and most dots on the first", () => {
    expect(NORTH_STAR.tiles).toHaveLength(6);
    for (const [a, b] of pairs(NORTH_STAR.tiles)) expect(apart(a.at, b.at, 24)).toBe(true);
    for (const line of NORTH_STAR.name.lines) expect(inside(labelBox(line.at, line.text), NORTH_STAR.tiles[0].at), line.text).toBe(true);
    const count = (tile: number) => NORTH_STAR.dots.filter((dot) => dot.key.startsWith(`north-star.dot.${tile}.`)).length;
    for (let tile = 1; tile < 6; tile++) expect(count(0)).toBeGreaterThan(count(tile));
  });

  it("sets each dot inside its tile, 12 px clear of its edges, its ring inside too, and the measure's two words clear of everything else", () => {
    const { r, inset } = NORTH_STAR.dot;
    expect(inset).toBeGreaterThanOrEqual(12);
    for (const dot of NORTH_STAR.dots) {
      const tile = NORTH_STAR.tiles[Number(dot.key.split(".")[2])].at;
      expect(dot.at.y + r + inset, dot.key).toBe(bottom(tile));
      expect(dot.at.x - r, dot.key).toBeGreaterThanOrEqual(tile.x + inset);
      expect(dot.at.x + r, dot.key).toBeLessThanOrEqual(tile.x + tile.w - inset);
    }
    const { ring } = NORTH_STAR.chosen;
    expect(inside(box(ring.at.x - ring.r, ring.at.y - ring.r, 2 * ring.r, 2 * ring.r), NORTH_STAR.tiles[0].at)).toBe(true);
    for (const line of NORTH_STAR.name.lines) for (const dot of NORTH_STAR.dots.filter((entry) => entry.key.startsWith("north-star.dot.0."))) expect(apart(labelBox(line.at, line.text), box(dot.at.x - r, dot.at.y - r, 2 * r, 2 * r), 8), dot.key).toBe(true);
    const { measure } = NORTH_STAR;
    expect(measure.to.y).toBeLessThan(measure.from.y);
    expect(
      clear({
        plan: labelBox(NORTH_STAR.plan.at, NORTH_STAR.plan.text, "start"),
        tiles: box(SAFE.left, NORTH_STAR.tiles[0].at.y, SAFE.right - SAFE.left, NORTH_STAR.tiles[0].at.h + NORTH_STAR.dot.r),
        start: labelBox(measure.startLabel.at, measure.startLabel.text),
        end: labelBox(measure.endLabel.at, measure.endLabel.text),
      }, 8),
    ).toEqual([]);
  });
});

describe("19, the people", () => {
  it("lines the departments up apart, each found person inside their department, three from each", () => {
    for (const [a, b] of pairs(PEOPLE.depts)) expect(apart(a.at, b.at, 24)).toBe(true);
    for (const dept of PEOPLE.depts) for (const person of dept.stay) expect(inside(person, dept.at)).toBe(true);
    for (const person of PEOPLE.found) expect(inside(person.at, PEOPLE.depts[person.dept].at), person.key).toBe(true);
    for (let dept = 0; dept < 3; dept++) expect(PEOPLE.found.filter((person) => person.dept === dept)).toHaveLength(3);
  });

  it("gathers each team inside its own box, one from each department, under the departments, with its nameplate inside it", () => {
    for (const [a, b] of pairs(PEOPLE.teams)) expect(apart(a.at, b.at, 24)).toBe(true);
    for (const team of PEOPLE.teams) {
      expect(team.at.y).toBeGreaterThan(bottom(PEOPLE.depts[0].at) + 24);
      expect(inside(team.plate.at, team.at), team.key).toBe(true);
      expect(inside(labelBox({ x: team.plate.at.x + team.plate.at.w / 2, y: team.plate.at.y + team.plate.at.h / 2 }, team.plate.text), team.plate.at), team.key).toBe(true);
    }
    for (const person of PEOPLE.found) {
      const end = { ...person.at, x: person.at.x + person.to.x, y: person.at.y + person.to.y };
      expect(inside(end, PEOPLE.teams[person.team].at), person.key).toBe(true);
      expect(apart(end, PEOPLE.teams[person.team].plate.at), person.key).toBe(true);
    }
    expect(PEOPLE.teams.map((_, t) => PEOPLE.found.filter((person) => person.team === t).map((person) => person.dept).sort())).toEqual([
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
    ]);
  });

  it("names the staff once, under the first department, clear of the teams", () => {
    const staff = labelBox(PEOPLE.staff.at, PEOPLE.staff.text, "start");
    expect(staff.y).toBeGreaterThan(bottom(PEOPLE.depts[0].at));
    for (const team of PEOPLE.teams) expect(apart(staff, team.at, 8), team.key).toBe(true);
  });
});

describe("20, the roadmap", () => {
  it("keeps the lanes, the band and the door apart, the door at the last checkpoint", () => {
    const [far, near] = ROADMAP.lanes.map((lane) => lane.at);
    expect(apart(far, near, 16)).toBe(true);
    expect(apart(near, ROADMAP.band.at, 16)).toBe(true);
    expect(apart(near, ROADMAP.door.at, 32)).toBe(true);
    expect(ROADMAP.door.at.x + ROADMAP.door.at.w / 2).toBe(ROADMAP.checks[3].at.x);
    expect(apart(labelBox(ROADMAP.door.word.at, ROADMAP.door.word.text), near, 16)).toBe(true);
  });

  it("names each checkpoint under the band, the names clear of each other and of the band's own name", () => {
    const names = ROADMAP.checks.map((check) => labelBox(check.name.at, check.name.text));
    for (const name of names) expect(name.y).toBeGreaterThan(bottom(ROADMAP.band.at));
    for (const [a, b] of pairs(names)) expect(apart(a, b, 16)).toBe(true);
    expect(apart(labelBox(ROADMAP.band.name.at, ROADMAP.band.name.text, "start"), box(ROADMAP.checks[0].at.x - 11, ROADMAP.band.at.y, 22, ROADMAP.band.at.h), 16)).toBe(true);
  });

  it("sets each piece inside lane two with its name inside it, apart from the next, and over the box in lane one it feeds", () => {
    const [far] = ROADMAP.lanes;
    ROADMAP.pieces.forEach((piece, i) => {
      expect(inside(piece.at, far.at), piece.key).toBe(true);
      expect(inside(labelBox(piece.label.at, piece.label.text), piece.at), piece.label.text).toBe(true);
      const b = ROADMAP.boxes[i].at;
      expect(b.x + b.w / 2).toBe(piece.at.x + piece.at.w / 2);
    });
    for (const [a, b] of pairs(ROADMAP.pieces.map((piece) => piece.at))) expect(apart(a, b, 12)).toBe(true);
  });

  it("names each lane above it, at its left, clear of the other lane and of every arrow", () => {
    const [far, near] = ROADMAP.lanes;
    for (const lane of ROADMAP.lanes) {
      const name = labelBox(lane.name.at, lane.name.text, "start");
      expect(bottom(name), lane.key).toBeLessThanOrEqual(lane.at.y);
      expect(lane.at.y - bottom(name), lane.key).toBeLessThanOrEqual(16);
      expect(name.x, lane.key).toBe(lane.at.x);
    }
    const nearName = labelBox(near.name.at, near.name.text, "start");
    expect(apart(nearName, far.at, 4)).toBe(true);
    for (const arrow of ROADMAP.arrows) {
      const line = box(arrow.from.x + arrow.from.w / 2 - 2, bottom(arrow.from), 4, arrow.to.y - bottom(arrow.from));
      expect(apart(nearName, line, 24), arrow.key).toBe(true);
    }
  });

  it("starts the shipping boxes inside lane one, from its empty left end", () => {
    const [, near] = ROADMAP.lanes;
    for (const entry of [...ROADMAP.boxes.slice(0, SHIPPED), ROADMAP.refill]) {
      const from = entry.at.x + entry.from;
      expect(from, entry.key).toBeGreaterThan(near.at.x);
      expect(from, entry.key).toBeLessThan(ROADMAP.pieces[0].at.x);
    }
  });

  it("runs the first box through the door's opening and out beyond it", () => {
    const end = { ...ROADMAP.boxes[0].at, x: ROADMAP.boxes[0].at.x + ROADMAP.journey.along, y: ROADMAP.boxes[0].at.y + ROADMAP.journey.down };
    expect(inside(end, ROADMAP.band.at)).toBe(true);
    expect(end.x).toBeGreaterThan(ROADMAP.door.at.x + ROADMAP.door.at.w);
    expect(end.y).toBeGreaterThan(ROADMAP.door.at.y);
  });
});

describe("20b, AI readiness", () => {
  it("centres the visitor's name over them, and sets the spear's middle level with the counter scene", () => {
    const { visitor, helper, floor, line } = READINESS;
    expect(visitor.name.at.x).toBe(visitor.at.x + visitor.at.w / 2);
    expect(line.from.y).toBe(SHAFTS.tip.middle);
    expect(SHAFTS.tip.middle).toBeGreaterThan(helper.at.y);
    expect(SHAFTS.tip.middle).toBeLessThan(floor.from.y);
  });
});

describe("20a, the staff", () => {
  const K = KNOWLEDGE;
  const r = AGENT_R;
  const lowered = (b: Box): Box => ({ ...b, y: b.y + LIFT });

  it("keeps the boxes, their people and lanterns apart, each lantern's light between its person and its box", () => {
    const things = K.boxes.flatMap((entry, i) => [entry.at, K.keepers[i].at, poolBox(K.keepers[i].lantern)]);
    for (const [a, b] of pairs(things)) expect(apart(a, b, 0)).toBe(true);
    K.keepers.forEach((keeper, i) => {
      const pool = poolBox(keeper.lantern);
      expect(pool.x).toBeGreaterThanOrEqual(K.boxes[i].at.x + K.boxes[i].at.w);
      expect(pool.x + pool.w).toBeLessThanOrEqual(keeper.at.x);
      expect(keeper.lantern.at.y, keeper.key).toBeLessThan(keeper.at.y + keeper.at.h / 2);
      expect(bottom(keeper.at), keeper.key).toBe(bottom(K.boxes[0].at));
    });
  });

  it("names the systems, the lantern, the staff and the new staff on one line above the row, each over what it names, clear of each other", () => {
    const names = [labelBox(K.systems.at, K.systems.text, "start"), labelBox(K.know.at, K.know.text), labelBox(K.staff.at, K.staff.text), labelBox(K.newcomer.at, K.newcomer.text)];
    for (const name of names) {
      expect(name.y).toBe(names[0].y);
      expect(name.y).toBeGreaterThanOrEqual(contentTop("knowledge"));
      expect(bottom(name) + 12).toBeLessThanOrEqual(poolBox(K.keepers[1].lantern).y);
      expect(bottom(name) + 12).toBeLessThanOrEqual(K.boxes[0].at.y);
    }
    for (const [a, b] of pairs(names)) expect(apart(a, b, 16)).toBe(true);
    expect(K.systems.at.x).toBe(K.boxes[0].at.x);
    expect(K.know.at.x).toBe(K.keepers[1].lantern.at.x);
    expect(K.staff.at.x).toBe(K.keepers[2].at.x + K.keepers[2].at.w / 2);
    expect(K.newcomer.at.x).toBe(K.newcomers[0].at.x + K.newcomers[0].at.w / 2);
    expect(K.keepers[1].leaves || K.keepers[2].leaves).toBe(false);
  });

  it("sets the slab just under the people's feet, across the whole row, each part's name inside it", () => {
    const feet = bottom(K.boxes[0].at);
    const right = K.keepers.at(-1)!.at.x + K.keepers.at(-1)!.at.w;
    for (const part of K.slab.parts) {
      expect(part.at.y, part.key).toBe(feet + 4);
      expect(inside(labelBox(part.label.at, part.label.text, "start"), part.at), part.label.text).toBe(true);
    }
    for (const [a, b] of pairs(K.slab.parts.map((part) => part.at))) expect(apart(a, b, 4)).toBe(true);
    expect(K.slab.parts[0].at.x).toBe(K.boxes[0].at.x);
    expect(K.slab.parts.at(-1)!.at.x + K.slab.parts.at(-1)!.at.w).toBeCloseTo(right, 6);
  });

  it("walks the helper under the row before it lifts and above the record, its writing inside the page, the page's name clear of it", () => {
    expect(K.helper.at.y - r).toBeGreaterThan(bottom(lowered(K.boxes[0].at)));
    expect(K.helper.at.y + r).toBeLessThan(K.record.at.y);
    expect(bottom(lowered(K.slab.parts[0].at))).toBeLessThan(K.record.at.y);
    for (const section of K.record.sections) expect(inside(section.at, K.record.at), section.key).toBe(true);
    for (const [a, b] of pairs(K.record.sections.map((section) => section.at))) expect(apart(a, b, 12)).toBe(true);
    expect(apart(labelBox(K.record.name.at, K.record.name.text, "start"), K.record.at, 12)).toBe(true);
  });

  it("steps each new person in from the left, clear of their box, where the person who retired stood", () => {
    for (const person of K.newcomers) {
      expect(person.at).toEqual(K.keepers[person.box].at);
      expect(K.boxes[person.box].at.x + K.boxes[person.box].at.w, person.key).toBeLessThan(person.at.x + person.from);
    }
  });
});

describe("20b, AI readiness", () => {
  it("sets the tip's name inside the tip, the shafts ending before it, and each shaft's name inside its shaft", () => {
    expect(TIP_FITS).toBe(true);
    expect(SHAFTS.end).toBeLessThan(SHAFTS.tipBase);
    for (const shaft of READINESS.shafts) expect(inside(labelBox(shaft.name.at, shaft.name.text, "start"), shaft.at), shaft.key).toBe(true);
  });

  it("names the counter on its face, and stops the visitor short of it, their name clear of the helper", () => {
    expect(inside(labelBox(READINESS.counter.name.at, READINESS.counter.name.text), READINESS.counter.at)).toBe(true);
    const { visitor, helper } = READINESS;
    expect(visitor.at.x + visitor.at.w).toBeLessThan(READINESS.counter.at.x);
    expect(apart(labelBox(visitor.name.at, visitor.name.text), { ...helper.at, x: helper.at.x + helper.step }, 8)).toBe(true);
    expect(visitor.at.x + visitor.from).toBeGreaterThan(SHAFTS.tipBase + 300);
  });
});

describe("21, built to last", () => {
  it("puts each plate on its building's front above the door, and the foundation's name inside it", () => {
    expect(inside(BUILT.first.plate.at, BUILT.first.house.body)).toBe(true);
    expect(bottom(BUILT.first.plate.at)).toBeLessThanOrEqual(BUILT.first.house.door.y);
    expect(inside(BUILT.next.plate.at, BUILT.next.house.body)).toBe(true);
    expect(inside(labelBox(BUILT.first.foundation.name.at, BUILT.first.foundation.name.text), BUILT.first.foundation.at)).toBe(true);
    for (const plate of [BUILT.first.plate, BUILT.next.plate]) expect(inside(labelBox({ x: plate.at.x + plate.at.w / 2, y: plate.at.y + plate.at.h / 2 }, plate.text), plate.at), plate.key).toBe(true);
  });

  it("keeps the two buildings apart, both on the ground, the ground's name clear of the path", () => {
    const first = box(BUILT.first.foundation.at.x, BUILT.first.house.top, BUILT.first.foundation.at.w, BUILT.ground.at.y - BUILT.first.house.top);
    expect(apart(first, BUILT.next.outline.at, 120)).toBe(true);
    expect(bottom(BUILT.first.foundation.at)).toBe(BUILT.ground.at.y);
    expect(bottom(BUILT.next.outline.at)).toBe(BUILT.ground.at.y);
    expect(labelBox(BUILT.ground.name.at, BUILT.ground.name.text, "start").y).toBeGreaterThan(BUILT.ground.at.y + 16);
  });
});

describe("21a, residents", () => {
  const { card } = RESIDENTS;
  const lifted = { ...card.at, y: card.at.y + card.lift };
  const across = { ...lifted, x: card.at.x + card.across };
  const served = { ...across, y: card.at.y + card.served };

  it("lifts the card clear of the fence's top before it crosses, and brings it down on the resident's side", () => {
    expect(bottom(lifted)).toBeLessThan(RAIL_TOP - 8);
    expect(across.x).toBeGreaterThan(RAIL_X + 16);
    expect(served.x).toBeGreaterThan(RAIL_X + 16);
    expect(bottom(served)).toBeLessThan(RESIDENTS.resident.at.y);
    expect(served.x).toBeLessThan(RESIDENTS.resident.at.x + RESIDENTS.resident.at.w);
    expect(served.x + served.w).toBeGreaterThan(RESIDENTS.resident.at.x);
  });

  it("keeps the desk side, the resident's side and the checklist apart, the fence between the first two", () => {
    const desk = [RESIDENTS.staff.at, RESIDENTS.desk.at, labelBox(RESIDENTS.staff.name.at, RESIDENTS.staff.name.text), labelBox(RESIDENTS.helper.name.at, RESIDENTS.helper.name.text)];
    const resident = [RESIDENTS.resident.at, labelBox(RESIDENTS.resident.name.at, RESIDENTS.resident.name.text), served];
    for (const b of desk) expect(b.x + b.w).toBeLessThan(RAIL_X - 16);
    for (const b of resident) expect(b.x).toBeGreaterThan(RAIL_X + 16);
    for (const b of resident) expect(b.x + b.w).toBeLessThan(RESIDENTS.list.at.x - 24);
    expect(apart(labelBox(RESIDENTS.staff.name.at, RESIDENTS.staff.name.text), labelBox(RESIDENTS.helper.name.at, RESIDENTS.helper.name.text), 12)).toBe(true);
  });

  it("heads the checklist with the script's heading, inside it and above its first line", () => {
    const { heading, rows, at } = RESIDENTS.list;
    expect(heading.text).toBe(labelsOf("residents").at(-4));
    const words = labelBox(heading.at, heading.text, "start");
    expect(inside(words, at)).toBe(true);
    expect(bottom(words)).toBeLessThan(rows[0].box.y - 12);
  });

  it("sets the orange mark just over the member of staff's head, and well apart from the green helper", () => {
    const { mark, staff, helper } = RESIDENTS;
    expect(mark.at.x).toBe(staff.at.x + staff.at.w / 2);
    expect(mark.at.y + 24).toBeLessThan(staff.at.y);
    expect(staff.at.y - (mark.at.y + 24)).toBeLessThanOrEqual(8);
    expect(Math.hypot(mark.at.x - helper.at.x, mark.at.y - helper.at.y)).toBeGreaterThan(200);
  });

  it("sets the checklist's three lines inside it, in the script's order, each with its box", () => {
    expect(RESIDENTS.list.rows.map((row) => row.text)).toEqual(labelsOf("residents").slice(-3));
    for (const row of RESIDENTS.list.rows) {
      expect(inside(labelBox(row.at, row.text, "start"), RESIDENTS.list.at), row.text).toBe(true);
      expect(inside(row.box, RESIDENTS.list.at), row.text).toBe(true);
    }
  });
});

describe("the path on 21", () => {
  it("starts the path at the first foundation and ends it at the second", () => {
    const { path, first, next } = BUILT;
    expect(path[0].at.x - (first.foundation.at.x + first.foundation.at.w)).toBeLessThanOrEqual(8);
    expect(next.foundation.at.x - (path.at(-1)!.at.x + path.at(-1)!.at.w)).toBeLessThanOrEqual(8);
  });

  it("keeps the roof's peak 80 px clear of the story band's last line", () => {
    expect(BUILT.first.house.top - (STORY.top.two + STORY.pitch + STORY.pitch)).toBeGreaterThanOrEqual(80 - STORY.pitch);
  });

  it("lays the path's stones apart, inside the ground, between the two foundations and clear of the ground's name", () => {
    const { path, ground, first, next } = BUILT;
    expect(path.length).toBeGreaterThanOrEqual(6);
    for (const [a, b] of pairs(path)) expect(apart(a.at, b.at, 12)).toBe(true);
    for (const stone of path) {
      expect(inside(stone.at, ground.at), stone.key).toBe(true);
      expect(stone.at.x, stone.key).toBeGreaterThan(first.foundation.at.x + first.foundation.at.w);
      expect(stone.at.x + stone.at.w, stone.key).toBeLessThan(next.foundation.at.x);
      expect(apart(stone.at, labelBox(ground.name.at, ground.name.text, "start"), 12), stone.key).toBe(true);
    }
  });
});
