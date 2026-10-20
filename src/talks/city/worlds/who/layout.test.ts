/**
 * Where Part 1 draws: slide 1's block centred on the navy stage, and on
 * slides 2 and 3 every drawing under its story band and clear of the
 * frame's chrome, with the words on each slide clear of one another, and on
 * slide 3 every logo on its tile, sized by its height, from a file that is there.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { STAGE, STORY, box, storyRows, type Box } from "@/components/deck/kit";
import { BASE_PATH } from "@/lib/base-path";
import { shown } from "../../script/find";
import { CREDIT_LINE, LEAD_LINE, OPENING, bandOf, titleOf } from "./layout";
import { CAREER, HALO_R, LINE_Y, NAME_SIZE, SMALL_SIZE, careerBoxes, markerWords, textBox } from "./layout-career";
import { FACE, FACE_TYPE, HEAD, LEARNING, LOGO_BOX, TILE, TOP, logoSize, typeWidth } from "./layout-learning";

/** Where a slide's story band ends: under its last row. */
const bandFoot = (pictureId: string) => storyRows(bandOf(pictureId), 2).at(-1)!.y + STORY.pitch;
const bottom = (b: Box) => b.y + b.h;
const right = (b: Box) => b.x + b.w;
/** Two boxes at least `gap` apart, side by side or one over the other. */
const apart = (a: Box, b: Box, gap = 0) => right(a) + gap <= b.x || right(b) + gap <= a.x || bottom(a) + gap <= b.y || bottom(b) + gap <= a.y;
const inside = (a: Box, b: Box) => a.x >= b.x && a.y >= b.y && right(a) <= right(b) && bottom(a) <= bottom(b);
const pairs = <T,>(list: readonly T[]) => list.flatMap((a, i) => list.slice(i + 1).map((b) => [a, b] as const));
/** Where the site serves its files from. */
const PUBLIC = join(import.meta.dirname, "../../../../../public");

/** Clear of the frame's chrome: under the logo, over the footer and the slide number, inside the story band's width. */
const SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w };
const safe = (b: Box) => b.x >= SAFE.left && right(b) <= SAFE.right && b.y >= SAFE.top && bottom(b) <= SAFE.bottom;

describe("slide 1, the title on navy", () => {
  it("centres its rule across the stage, and its block a little over the stage's middle", () => {
    expect(OPENING.rule.x + OPENING.rule.w / 2).toBe(STAGE.w / 2);
    const middle = (OPENING.title.y + OPENING.credit.foot) / 2;
    expect(middle).toBeLessThanOrEqual(STAGE.h / 2);
    expect(middle).toBeGreaterThan(STAGE.h / 2 - 32);
  });

  it("stacks title, rule and story lines in order, apart, and keeps the block clear of the logo and the footer", () => {
    const titleFoot = OPENING.title.y + OPENING.title.lines.length * OPENING.title.line;
    expect(OPENING.rule.y).toBeGreaterThan(titleFoot);
    expect(OPENING.lead.y).toBeGreaterThan(OPENING.rule.y + OPENING.rule.h + 24);
    expect(OPENING.credit.y).toBeGreaterThanOrEqual(OPENING.lead.y + OPENING.lead.lines.length * LEAD_LINE + 16);
    expect(OPENING.credit.foot).toBe(OPENING.credit.y + OPENING.credit.lines.length * CREDIT_LINE);
    expect(OPENING.title.y).toBeGreaterThan(SAFE.top + 120);
    expect(OPENING.credit.foot).toBeLessThan(SAFE.bottom - 120);
  });

  it("sets every line, title and story, inside the story band's width at its own size, erring wide", () => {
    for (const line of titleOf("title").lines) expect(line.length * 108 * 0.56, line).toBeLessThan(STORY.w);
    for (const line of OPENING.lead.lines) expect(line.length * 40 * 0.56, line).toBeLessThan(STORY.w);
    for (const line of OPENING.credit.lines) expect(line.length * 32 * 0.56, line).toBeLessThan(STORY.w);
  });

  it("breaks each story line into two rows of like length, so neither row is a stub", () => {
    for (const lines of [OPENING.lead.lines, OPENING.credit.lines]) {
      expect(lines).toHaveLength(2);
      const [a, b] = lines.map((line) => line.length);
      expect(Math.min(a, b) / Math.max(a, b)).toBeGreaterThan(0.6);
    }
  });
});

describe("slide 2, the career timeline", () => {
  const names = CAREER.markers.map((marker) => ({ ...marker, box: textBox(marker.name.text, marker.name.at, NAME_SIZE) }));
  const captions = CAREER.markers.flatMap((marker) => (marker.caption ? [textBox(marker.caption.text, marker.caption.at, SMALL_SIZE)] : []));
  const years = CAREER.markers.flatMap((marker) => (marker.year ? [textBox(marker.year.text, marker.year.at, SMALL_SIZE)] : []));
  const now = textBox(CAREER.now.text, CAREER.now.at, SMALL_SIZE, "start");

  it("draws everything under the story band and inside the safe area", () => {
    for (const b of careerBoxes()) {
      expect(b.y, JSON.stringify(b)).toBeGreaterThanOrEqual(bandFoot("career"));
      expect(safe(b), JSON.stringify(b)).toBe(true);
    }
  });

  it("keeps the names clear of each other, and every year and the caption clear of every other marker's words, by at least 24 px", () => {
    for (const [a, b] of pairs(names.map((name) => name.box))) expect(apart(a, b, 24), `${JSON.stringify(a)} ${JSON.stringify(b)}`).toBe(true);
    for (const marker of CAREER.markers) {
      const own = markerWords(marker);
      const others = CAREER.markers.filter((other) => other.key !== marker.key).flatMap(markerWords);
      for (const word of own) for (const other of others) expect(apart(word, other, 24), `${marker.key} ${JSON.stringify(other)}`).toBe(true);
    }
  });

  it("runs every stem from its ring up to just under its own words, and past no other marker's words", () => {
    for (const marker of names) {
      const own = marker.caption ? textBox(marker.caption.text, marker.caption.at, SMALL_SIZE) : marker.box;
      expect(marker.stem.to, marker.key).toBeGreaterThan(bottom(own));
      expect(marker.stem.to, marker.key).toBeLessThan(marker.stem.from);
      expect(marker.stem.from, marker.key).toBeLessThan(LINE_Y);
      const others = CAREER.markers.filter((other) => other.key !== marker.key).flatMap(markerWords);
      for (const other of others) {
        const crosses = marker.x >= other.x - 12 && marker.x <= right(other) + 12 && other.y < marker.stem.from && bottom(other) > marker.stem.to;
        expect(crosses, `${marker.key} through ${JSON.stringify(other)}`).toBe(false);
      }
    }
  });

  it("sets the caption right under its marker's name", () => {
    const marker = names.find((entry) => entry.caption)!;
    const caption = textBox(marker.caption!.text, marker.caption!.at, SMALL_SIZE);
    expect(caption.y).toBeGreaterThan(bottom(marker.box));
    expect(caption.y - bottom(marker.box)).toBeLessThan(16);
    expect(marker.caption!.at.x).toBe(marker.x);
  });

  it("keeps the first three markers close and gives the other four the room", () => {
    const gaps = names.slice(1).map((marker, i) => marker.x - names[i].x);
    expect(Math.max(...gaps.slice(0, 2))).toBeLessThan(Math.min(...gaps.slice(2)));
    for (const gap of gaps) expect(gap).toBeGreaterThan(2 * HALO_R + 24);
  });

  it("sets no year under the line as a tick: each marker the script dates carries its year right over its name, and the last year ends the line", () => {
    const dated = CAREER.markers.filter((marker) => marker.year).map((marker) => [marker.name.text, marker.year!.text]);
    expect(dated).toEqual([
      [names[0].name.text, "2000"],
      [names[1].name.text, "2011"],
      [names[3].name.text, "2018"],
      [names[6].name.text, "2023"],
    ]);
    for (const marker of names.filter((entry) => entry.year)) {
      const year = textBox(marker.year!.text, marker.year!.at, SMALL_SIZE);
      expect(marker.year!.at.x).toBe(marker.x);
      expect(bottom(year)).toBeLessThan(marker.box.y);
      expect(marker.box.y - bottom(year)).toBeLessThan(16);
    }
    for (const year of years) expect(bottom(year)).toBeLessThan(LINE_Y - HALO_R);
    expect(CAREER.now.text).toBe("2026");
    expect(now.x).toBeGreaterThan(CAREER.end.x);
    expect(now.y).toBeLessThan(LINE_Y);
    expect(bottom(now)).toBeGreaterThan(LINE_Y);
  });

  it("leaves the markers the script gives no year undated", () => {
    expect(names.filter((marker) => !marker.year).map((marker) => marker.name.text)).toEqual([names[2], names[4], names[5]].map((marker) => marker.name.text));
    expect(captions).toHaveLength(1);
  });
});

describe("slide 3, the courses and the partners", () => {
  const { courses, big, partners } = LEARNING;
  const tiles = [...courses.tiles, ...partners.tiles];
  const ats = tiles.map((tile) => tile.at);
  const words = shown("learning", "play");
  /** The frame's footer starts at y 1034 (frame.css); the drawing stays 40 px over it. */
  const FOOTER_TOP = 1034;
  const span = (list: readonly Box[]) => {
    const x = Math.min(...list.map((at) => at.x));
    const y = Math.min(...list.map((at) => at.y));
    return box(x, y, Math.max(...list.map(right)) - x, Math.max(...list.map(bottom)) - y);
  };
  const grid = span(courses.tiles.map((tile) => tile.at));
  const drawing = [...ats, big.at, courses.head.at, partners.head.at, big.school.at, big.when.at];

  it("draws everything under the story band, from the world's content top, inside the safe area and at least 40 px over the footer", () => {
    for (const b of drawing) {
      expect(b.y, JSON.stringify(b)).toBeGreaterThanOrEqual(bandFoot("learning"));
      expect(b.y, JSON.stringify(b)).toBeGreaterThanOrEqual(TOP);
      expect(safe(b), JSON.stringify(b)).toBe(true);
      expect(bottom(b), JSON.stringify(b)).toBeLessThanOrEqual(FOOTER_TOP - 40);
    }
    expect(courses.head.at.y).toBe(TOP);
  });

  it("names each heading and tile with the click's words in the script's order: the courses heading, its seven logos, the card's four, the partners heading, its 11", () => {
    expect(courses.tiles).toHaveLength(7);
    expect(partners.tiles).toHaveLength(11);
    expect([courses.head.text, ...courses.tiles.map((tile) => tile.text), big.logo.text, big.title.lines.join(" "), big.school.text, big.when.text, partners.head.text, ...partners.tiles.map((tile) => tile.text)]).toEqual(words);
  });

  it("serves every logo from a file that is there", () => {
    for (const src of [...tiles.map((tile) => tile.src), big.logo.src]) {
      // The address carries the deck's base path; the file under public/ does not.
      expect(src.startsWith(BASE_PATH), src).toBe(true);
      const file = src.slice(BASE_PATH.length);
      expect(file, src).toMatch(/^\/logos\/[a-z-]+\.v\d+\.(svg|png)$/);
      expect(existsSync(join(PUBLIC, file)), src).toBe(true);
    }
  });

  it("makes every tile, in both groups, the same size", () => {
    for (const at of ats) expect([at.w, at.h]).toEqual([TILE.w, TILE.h]);
  });

  it("sets the courses four over three and the partners six over five, each second row centred under its first, every row on one pitch", () => {
    const pitch = TILE.w + TILE.gap;
    for (const [list, first] of [[courses.tiles.map((tile) => tile.at), 4], [partners.tiles.map((tile) => tile.at), 6]] as const) {
      const [top, under] = [list.slice(0, first), list.slice(first)];
      expect(under).toHaveLength(first - 1);
      for (const at of top) expect(at.y).toBe(top[0].y);
      for (const at of under) expect(at.y).toBe(top[0].y + TILE.h + TILE.down);
      for (const row of [top, under]) for (let i = 1; i < row.length; i += 1) expect(row[i].x - row[i - 1].x).toBe(pitch);
      expect(top[0].x).toBe(STORY.x);
      expect((under[0].x + right(under.at(-1)!)) / 2).toBe((top[0].x + right(top.at(-1)!)) / 2);
    }
    for (const [a, b] of pairs(ats)) expect(apart(a, b, TILE.down), `${JSON.stringify(a)} ${JSON.stringify(b)}`).toBe(true);
  });

  it("sets each heading at the band's left edge over its own group, and the partners clear of the courses", () => {
    for (const group of [courses, partners]) {
      expect(group.head.at.x).toBe(STORY.x);
      expect(group.tiles[0].at.y - bottom(group.head.at)).toBe(HEAD.gap);
      expect(group.head.at.w).toBeLessThan(TILE.w * 3);
    }
    expect(partners.head.at.y - Math.max(bottom(grid), bottom(big.at))).toBeGreaterThanOrEqual(24);
    expect(HEAD.size).toBeGreaterThanOrEqual(26);
  });

  it("sizes each logo by its height inside its tile, with room round it, a wider logo standing no taller than a narrower one", () => {
    // The one logo that draws to its own edges is held in further (layout-learning.ts), so it stands out of the order.
    const sized = tiles.filter((tile) => !tile.src.includes("icagile")).sort((a, b) => a.size.h / a.size.w - b.size.h / b.size.w);
    for (const tile of tiles) {
      expect(tile.size.w, tile.text).toBeLessThanOrEqual(LOGO_BOX.w);
      expect(tile.size.h, tile.text).toBeLessThanOrEqual(LOGO_BOX.h);
      expect(tile.size.h, tile.text).toBeGreaterThanOrEqual(24);
      expect(TILE.w - tile.size.w, tile.text).toBeGreaterThanOrEqual(48);
      expect(TILE.h - tile.size.h, tile.text).toBeGreaterThanOrEqual(16);
    }
    for (let i = 1; i < sized.length; i += 1) expect(sized[i].size.h, sized[i].text).toBeGreaterThanOrEqual(sized[i - 1].size.h);
    expect(logoSize("square.svg", 1).h).toBe(LOGO_BOX.h);
    expect(logoSize("wide.svg", 3).h).toBe(46);
  });

  it("sets the larger card at the right of the courses, as tall as their two rows, over the partners' fifth and sixth columns and edge to edge with them, at least 8 px inside the safe edge", () => {
    expect(big.at.y).toBe(grid.y);
    expect(bottom(big.at)).toBe(bottom(grid));
    expect(big.at.x).toBe(partners.tiles[4].at.x);
    expect(right(big.at)).toBe(right(partners.tiles[5].at));
    expect(big.at.x - right(grid)).toBeGreaterThanOrEqual(TILE.gap);
    expect(right(big.at)).toBeLessThanOrEqual(SAFE.right - 8);
    expect(big.at.w).toBeGreaterThan(TILE.w);
    expect(big.at.h).toBeGreaterThan(TILE.h);
  });

  it("fits the card's logo, title, school and when inside its face, apart, the logo at least 24 px tall", () => {
    const face = box(big.at.x + FACE.edge, big.at.y + FACE.edge, big.at.w - 2 * FACE.edge, big.at.h - 2 * FACE.edge);
    const inner = [big.logo.at, big.title.at, big.school.at, big.when.at];
    for (const b of inner) expect(inside(b, big.inner) && inside(b, face), JSON.stringify(b)).toBe(true);
    for (const [a, b] of pairs(inner)) expect(apart(a, b), `${JSON.stringify(a)} ${JSON.stringify(b)}`).toBe(true);
    expect(big.logo.at.h).toBeGreaterThanOrEqual(24);
    for (const line of big.title.lines) expect(typeWidth(line, FACE_TYPE.title), line).toBeLessThanOrEqual(big.inner.w);
    expect(FACE_TYPE.small).toBeGreaterThanOrEqual(26);
  });

  it("gives the courses the left two thirds or so and centres the whole drawing in the safe area", () => {
    const width = SAFE.right - SAFE.left;
    expect(grid.w / width).toBeGreaterThan(0.6);
    expect(grid.w / width).toBeLessThan(0.75);
    const all = span([...ats, big.at]);
    expect(Math.abs((all.x + right(all)) / 2 - (SAFE.left + SAFE.right) / 2)).toBeLessThanOrEqual(12);
  });
});
