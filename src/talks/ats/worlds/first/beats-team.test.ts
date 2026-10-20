/**
 * Slide 18 as it plays: the small table with its people, four of them
 * filling green while the rest step back, the team's box drawing and the
 * four walking to it, the lead's plate, the three tiles, the line to the
 * departments, and the small yard last. The click follows its They see in
 * order and ends on the picture it describes.
 */
import { describe, expect, it } from "vitest";
import { EASE, storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { PROGRAM_TEAM, SEAT_18 } from "./layout-program-team";
import { at, before, endOf, longest, playOf, showsAtEnd, startOf, stepOf } from "./harness";

const P = PROGRAM_TEAM;

describe("slide 18", () => {
  const id = stepOf("program-team");
  const end = at(id);
  const [a, b] = storyKeys(storyId("program-team"), 2);
  const lit = (key: string) => playOf(id, key, "--k")[0];
  const walk = (key: string) => playOf(id, key, "x").find((play) => play.on.x === 0)!;

  it("opens on the table with its chairs, the bottom three grown as slide 17 left them, and a person at every seat", () => {
    for (const seat of P.table.seats) expect(before(id)[seat.key]["--s"], seat.key).toBe(seat.leading ? SEAT_18.grow : 1);
    for (const member of P.members) {
      expect(before(id)[member.key], member.key).toMatchObject({ autoAlpha: 0, x: member.from.x, y: member.from.y });
      expect(startOf(id, member.key), member.key).toBeGreaterThan(startOf(id, P.table.key));
    }
  });

  it("fills the four green once everyone is at the table, and steps the other six back", () => {
    const seated = Math.max(...P.members.map((member) => endOf(id, member.glyph)));
    for (const member of P.team) {
      expect(lit(member.key).at, member.key).toBeGreaterThanOrEqual(seated);
      expect(end[member.key]["--k"], member.key).toBe(1);
    }
    for (const member of P.stay) {
      expect(playOf(id, member.key, "--k"), member.key).toHaveLength(0);
      expect(end[member.key].autoAlpha, member.key).toBe(0.45);
    }
  });

  it("draws the box, then walks the four out to it, across and up on different curves, the farthest place first", () => {
    const filled = Math.max(...P.team.map((member) => endOf(id, member.key, "--k")));
    expect(startOf(id, P.box.key)).toBeGreaterThanOrEqual(filled);
    const starts = P.team.map((member) => walk(member.key).at);
    for (const member of P.team) {
      const across = walk(member.key);
      const up = playOf(id, member.key, "y").find((play) => play.on.y === 0)!;
      expect(across.at).toBeGreaterThan(startOf(id, P.box.key));
      expect(across.at).toBe(up.at);
      expect([across.ease, up.ease]).toEqual([EASE.draw, EASE.out]);
      expect(end[member.key], member.key).toMatchObject({ autoAlpha: 1, x: 0, y: 0 });
    }
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeLessThan(starts[i - 1]);
  });

  it("gives the lead the nameplate once the four are in the box", () => {
    const arrived = Math.max(...P.team.map((member) => endOf(id, member.key, "x")));
    expect(startOf(id, P.plate.key)).toBeGreaterThanOrEqual(arrived);
  });

  it("lands the three tiles under the box in turn after the plate, with the first line", () => {
    const tiles = P.tiles.map((tile) => startOf(id, tile.key));
    expect(tiles[0]).toBeGreaterThan(startOf(id, P.plate.key));
    for (let i = 1; i < tiles.length; i++) expect(tiles[i]).toBeGreaterThan(tiles[i - 1]);
    expect(startOf(id, a)).toBeGreaterThanOrEqual(tiles[0]);
    expect(startOf(id, a)).toBeLessThan(startOf(id, P.dept.key));
  });

  it("draws the departments, then the line to them from the box, its caption after it", () => {
    const tiles = Math.max(...P.tiles.map((tile) => endOf(id, tile.key)));
    expect(startOf(id, P.dept.key)).toBeGreaterThan(tiles);
    expect(startOf(id, P.line.key)).toBeGreaterThan(startOf(id, P.dept.key));
    expect(startOf(id, P.line.caption.key)).toBeGreaterThan(startOf(id, P.line.key));
  });

  it("draws the small yard last, its two people in it and its caption, with the second line", () => {
    expect(startOf(id, P.yard.key)).toBeGreaterThan(endOf(id, P.line.key));
    for (const person of P.yard.people) expect(startOf(id, person.key)).toBeGreaterThan(startOf(id, P.yard.key));
    expect(startOf(id, P.yard.caption.key)).toBeGreaterThan(startOf(id, P.yard.key));
    expect(startOf(id, b)).toBeGreaterThanOrEqual(startOf(id, P.yard.key));
  });

  it("ends on the table, the team's box with its tiles and lead, the line to the departments, and the small yard", () => {
    const shown = [
      P.table.key,
      ...P.table.seats.map((seat) => seat.key),
      ...P.members.map((member) => member.key),
      P.box.key,
      P.box.name.key,
      P.plate.key,
      ...P.tiles.map((tile) => tile.key),
      P.dept.key,
      P.dept.name.key,
      ...P.dept.staff.map((person) => person.key),
      P.line.key,
      P.line.caption.key,
      P.yard.key,
      ...P.yard.people.map((person) => person.key),
      P.yard.caption.key,
    ];
    for (const key of shown) expect(showsAtEnd(id, key), key).toBe(true);
    expect(longest(id)).toBeLessThan(11.6);
  });
});
