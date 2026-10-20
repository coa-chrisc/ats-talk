/**
 * Slides 7 and 8, how the tools get built: the person's mark travels from
 * the person to the tool, which then comes to the middle and grows, its
 * mark's name beside it; the board opens under its heading, each folder
 * opens and closes as it is read, and the view closes in on one piece with
 * the small board beside it.
 */
import { describe, expect, it } from "vitest";
import { DUR } from "@/components/deck/kit";
import { labelsOf } from "./layout";
import { AI_BUILDS, SETUP } from "./layout-builds";
import { at, clickOf, endOf, inside, lastOf, overlaps, playOf, startOf } from "./harness";

const BUILDS = clickOf("ai-builds");
const SETUP_CLICK = clickOf("setup");

describe("slide 7, AI that builds the tool", () => {
  const { tool, agents, person, mark, finished, tag } = AI_BUILDS;

  it("sends the mark from the person's hand to the tool's corner along a 0.6 s path, once the person is there", () => {
    const travel = playOf(BUILDS, mark.key).filter((play) => "x" in play.on || "y" in play.on);
    expect(travel).toHaveLength(2);
    for (const play of travel) {
      expect(play.duration).toBe(0.6);
      expect(play.at).toBeGreaterThanOrEqual(startOf(BUILDS, person.key));
    }
    // It sets out next to the person, and lands inside the tool.
    const from = { x: mark.at.x + mark.from.x, y: mark.at.y + mark.from.y };
    expect(Math.abs(from.x - person.at.x)).toBeLessThanOrEqual(24);
    expect(from.y).toBeGreaterThanOrEqual(person.at.y);
    expect(from.y).toBeLessThanOrEqual(person.at.y + person.at.h);
    expect(inside({ x: mark.at.x - 24, y: mark.at.y - 24, w: 48, h: 48 }, AI_BUILDS.app.at)).toBe(true);
    // The two eases differ, so the path curves.
    expect(travel[0].ease).not.toBe(travel[1].ease);
  });

  it("brings the tool to the middle and grows it 1.2 times over 0.75 s, once the agents have faded", () => {
    const [grows] = playOf(BUILDS, tool.key);
    expect(grows.on["--s"]).toBe(1.2);
    expect(grows.duration).toBe(DUR.base);
    expect(grows.at).toBeGreaterThanOrEqual(endOf(BUILDS, agents[2].key));
    expect(tool.grown.x + tool.grown.w / 2).toBe(960);
  });

  it("ends on the grown tool, its mark, the name beside the mark, its own name over it and the tag on its corner", () => {
    const end = at(BUILDS);
    expect(end[tool.key]).toMatchObject({ "--x": tool.to.x, "--y": tool.to.y, "--s": tool.scale });
    expect(end[mark.key]).toMatchObject({ autoAlpha: 1, x: 0, y: 0 });
    for (const key of [person.label.key, finished.key, tag.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[person.key].autoAlpha).toBe(0);
    // The person's name, moved beside the mark where the grown tool carries it.
    const label = { ...person.label.at, x: person.label.at.x + Number(end[person.label.key].x), y: person.label.at.y + Number(end[person.label.key].y) };
    expect(label.x).toBe(tool.grown.x + tool.grown.w + 16);
    expect(label.y + label.h / 2).toBeCloseTo(mark.grown.y, 5);
    expect(finished.at.y + finished.at.h).toBeLessThanOrEqual(tool.grown.y);
    expect(overlaps(finished.at, tag.at)).toBe(false);
    expect(lastOf(BUILDS)).toBeLessThanOrEqual(12);
  });
});

describe("slide 8, how a build runs", () => {
  const { folders, reads, board, piece, marks } = SETUP;
  const [, , , , , , , heading, , , , first, second, approves] = labelsOf("setup");

  it("names the board under its heading, and the three marks by their own names", () => {
    expect(board.heading.text).toBe(heading);
    expect(board.heading.at.y + board.heading.at.h).toBeLessThanOrEqual(board.frame.at.y - 32);
    expect(marks.map((mark) => mark.text)).toEqual([first, second, approves]);
    expect(startOf(SETUP_CLICK, board.heading.key)).toBe(startOf(SETUP_CLICK, board.frame.key));
  });

  it("opens each folder and closes it again over 0.3 s as its reading leaves it", () => {
    folders.forEach((folder, i) => {
      const [opens, closes] = playOf(SETUP_CLICK, folder.key)
        .filter((play) => "--k" in play.on)
        .sort((a, b) => a.at - b.at);
      expect(opens.on["--k"], folder.key).toBe(1);
      expect(closes.on["--k"], folder.key).toBe(0);
      expect(opens.at, folder.key).toBe(playOf(SETUP_CLICK, reads[i].key)[0].at);
      expect(closes.at + closes.duration - opens.at, folder.key).toBeCloseTo(0.3, 5);
      expect(at(SETUP_CLICK)[folder.key]["--k"], folder.key).toBe(0);
    });
  });

  it("ends on the piece and its marks with the small board beside it, the two balanced across the stage, inside 12 s", () => {
    const end = at(SETUP_CLICK);
    expect(end[board.key]).toMatchObject({ "--s": board.small, "--x": board.to.x, "--y": board.to.y });
    expect(end[board.heading.key].autoAlpha).toBe(0);
    const small = board.smallAt;
    expect(overlaps(small, piece.at)).toBe(false);
    const left = piece.at.x;
    const right = small.x + small.w;
    expect(Math.abs((left + right) / 2 - 960)).toBeLessThanOrEqual(24);
    for (const mark of marks) expect(mark.at.x).toBeGreaterThan(piece.at.x);
    for (const mark of marks) expect(mark.at.x).toBeLessThan(piece.at.x + piece.at.w);
    expect(lastOf(SETUP_CLICK)).toBeLessThan(12);
  });
});
