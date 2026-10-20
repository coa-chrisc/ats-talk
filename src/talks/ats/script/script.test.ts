import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PARTS, SCRIPT, WORLDS } from "./index";
import type { Picture, WorldId } from "./index";

/**
 * The script (docs/ats-talk-script.md), read from its document the way a
 * person reads it: the single source of every word on the stage and in the
 * notes. A part is a `## Part N. Name (about M minutes)` heading, a picture
 * a `### N. Name` heading under it (a closing "(new)" or "(two clicks)" is
 * the document's note, not the name). Its On screen line is the title, and
 * the bullets under it are the story lines, A then B, each with its
 * "(click N)" note taken off. Its They see is a paragraph or a numbered
 * list, then any bulleted list under it; every phrase it quotes is a label
 * drawn on the stage. `&amp;` is the document's way of writing an
 * ampersand. Any other `## ` heading (the facts check, the open words) ends
 * the pictures.
 */
function approved() {
  const text = readFileSync(join(import.meta.dirname, "../../../../docs/ats-talk-script.md"), "utf8").replace(/&amp;/g, "&");
  const parts: { name: string; minutes: number }[] = [];
  const pictures: { part: number; number: string; name: string; twoClicks: boolean; show?: string; say?: string; see: string[]; story: string[] }[] = [];
  let part = 0;
  let field = "";
  for (const line of text.split("\n")) {
    const partHeading = line.match(/^## Part (\d)\. (.*) \(about (\d+) minutes\)$/);
    if (line.startsWith("## ")) {
      part = partHeading ? Number(partHeading[1]) : 0;
      if (partHeading) parts.push({ name: partHeading[2], minutes: Number(partHeading[3]) });
      field = "";
    }
    const heading = line.match(/^### (\d+[a-z]?)\. (.*)$/);
    if (part && heading) {
      pictures.push({ part, number: heading[1], name: heading[2].replace(/ \((new|two clicks)\)$/, ""), twoClicks: heading[2].endsWith(" (two clicks)"), see: [], story: [] });
      field = "";
      continue;
    }
    const picture = pictures[pictures.length - 1];
    if (!part || !picture) continue;
    const opens = line.match(/^\*\*(On screen|You say|They see):\*\*\s*(.*)$/);
    const bullet = line.match(/^- (.*)$/);
    const click = line.match(/^\d+\. (.*)$/);
    if (opens) {
      field = opens[1];
      if (field === "On screen") picture.show = opens[2];
      else if (field === "You say") picture.say = opens[2];
      else if (opens[2]) picture.see.push(opens[2]);
    } else if (field === "On screen" && bullet) picture.story.push(bullet[1].replace(/ \*\(click \d\)\*$/, ""));
    else if (field === "They see" && (click || bullet)) picture.see.push((click ?? bullet)![1]);
  }
  return { parts, pictures };
}
const SOURCE = approved();

/** The phrases a picture's They see quotes, each once, in the order it first quotes them: the labels its clicks draw. */
const quotedIn = (see: readonly string[]) => [...new Set([...see.join(" ").matchAll(/"([^"]+)"/g)].map((match) => match[1]))];

/**
 * The pictures and their clicks, in the order shown (docs/ats-talk-script.md):
 * one click a picture, `play`, but slide 12b, the roll, which the script marks "(two clicks)".
 */
const PLAN: [string, string[]][] = [
  ["title", ["play"]],
  ["course", ["play"]],
  ["lessons", ["play"]],
  ["spending", ["play"]],
  ["agents", ["play"]],
  ["review", ["play"]],
  ["fleet-defined", ["play"]],
  ["stumbled", ["play"]],
  ["ladder", ["play"]],
  ["enforce", ["play"]],
  ["people", ["play"]],
  ["earn", ["play"]],
  ["track", ["play"]],
  ["control", ["play"]],
  ["exists", ["play"]],
  ["noticed", ["play"]],
  ["community", ["roll", "themes"]],
  ["infrastructure", ["play"]],
  ["fits", ["play"]],
  ["fleet", ["play"]],
  ["not-proposing", ["play"]],
  ["consortium", ["play"]],
  ["program-team", ["play"]],
  ["listen", ["play"]],
  ["sort", ["play"]],
  ["lanes", ["play"]],
  ["level-up", ["play"]],
  ["outcomes", ["play"]],
  ["levels", ["play"]],
  ["who-decides", ["play"]],
  ["residents", ["play"]],
  ["could-be", ["play"]],
  ["applied", ["play"]],
  ["lets-talk", ["play"]],
];

/** Which world draws each slide: its part's own, but each part is one world. */
const WORLD_OF_SLIDES: [WorldId, string[]][] = [
  ["brought", ["1", "2", "2a"]],
  ["enterprise", ["3", "4", "4a", "5", "6"]],
  ["ideas", ["7", "8", "9", "10"]],
  ["stands", ["11", "11a", "12", "12a", "12b", "13", "14", "15"]],
  ["first", ["16", "17", "18", "19", "20", "21", "22", "23"]],
  ["ready", ["24", "25", "26", "27", "28", "29"]],
];

/** The slides given two clicks: none, as draft 2 of the ATS script writes the script. */
const TWO_CLICKS: string[] = ["12b"];

const labels = SCRIPT.flatMap((picture) => picture.steps.flatMap((step) => step.show));
// Every string the audience reads or the presenter says.
const voicedIn = (picture: Picture) => [picture.show, picture.say, ...picture.story, ...picture.steps.flatMap((step) => step.show)];
const voiced = SCRIPT.flatMap(voicedIn);
// Those, plus the script's headings and its They see.
const everything = [...voiced, ...SCRIPT.flatMap((picture) => [picture.name, ...picture.see])];

/** Labels that are not a run of their picture's words: none, since every label is a phrase its They see quotes. */
const OFF_SCRIPT: string[] = [];

/**
 * Story lines allowed past 100 characters, each measured under 1700 px at 32 px in Geist. A
 * line wider than the band (1728 px, about 105 characters at 32 px) would be
 * broken onto two rows by its world (`breakAfter`).
 */
const LONG_STORY: [string, number][] = [["lessons", 0], ["lessons", 1], ["stumbled", 1], ["applied", 1], ["infrastructure", 0], ["fits", 0], ["lanes", 1], ["levels", 0]];

/** GitHub's own terms the script may name in a speaker's note: nowhere, as draft 2 of the ATS script writes it. */
const GITHUB_TERMS_SAID: string[] = [];

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const BANNED = /\b(leverag\w*|seamless\w*|delv\w*|tapestry|robust|game[- ]chang\w*|cutting[- ]edge|unlock\w*|empower\w*)\b/i;
const FORMAT_WORDS = /powerpoint|slide deck|slideshow/i;
const BRITISH = /\b(colour\w*|prioritis\w*|organis\w*|recognis\w*|licences?|modell\w+|centre\w*|catalogue\w*|whilst|towards)\b/i;
const TIRED = /\bjourney\w*|at the end of the day|\bsimply\b|!/i;
// A lone digit from 2 to 9. Digits inside larger numbers (27, 1,283) and list numbers ("2. ") are not lone.
const LONE_DIGIT = /(?<![\d,.])[2-9](?![\d,.])/;

describe("the talk's script", () => {
  it("is the script, word for word: every picture's heading, On screen, story lines, You say and They see", () => {
    expect(SOURCE.pictures).toHaveLength(34);
    expect(SCRIPT.map(({ part, number, name, show, story, say, see }) => ({ part, number, name, show, story, say, see }))).toEqual(
      SOURCE.pictures.map(({ part, number, name, show, story, say, see }) => ({ part, number, name, show, story, say, see })),
    );
  });

  it("names its parts and their minutes as the script heads them", () => {
    expect(PARTS).toEqual(SOURCE.parts);
  });

  it("puts every phrase its They see quotes on its picture's clicks, once each, in the script's order", () => {
    for (const picture of SCRIPT) expect(picture.steps.flatMap((step) => step.show), picture.id).toEqual(quotedIn(picture.see));
  });

  it("uses the plan's picture ids and step ids, in the plan's order", () => {
    expect(SCRIPT.map((picture) => [picture.id, picture.steps.map((step) => step.id)])).toEqual(PLAN);
  });

  it("gives every picture a unique id in kebab case, since ids are used in the address", () => {
    const ids = SCRIPT.map((picture) => picture.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(KEBAB);
  });

  it("gives every step an id in kebab case that is unique within its picture", () => {
    for (const picture of SCRIPT) {
      const ids = picture.steps.map((step) => step.id);
      expect(new Set(ids).size, picture.id).toBe(ids.length);
      for (const id of ids) expect(id).toMatch(KEBAB);
    }
  });

  it("runs the parts in order and leaves none empty", () => {
    const parts = SCRIPT.map((picture) => picture.part);
    expect(parts).toEqual([...parts].sort((a, b) => a - b));
    expect([...new Set(parts)]).toEqual(PARTS.map((_, index) => index + 1));
  });

  it("sets every picture in its world, in the deck's order of worlds, and keeps each world inside one part", () => {
    expect(WORLD_OF_SLIDES.map(([world]) => world)).toEqual([...WORLDS]);
    expect(SCRIPT.map((picture) => [picture.world, picture.number])).toEqual(WORLD_OF_SLIDES.flatMap(([world, numbers]) => numbers.map((number) => [world, number])));
    for (const world of WORLDS) expect(new Set(SCRIPT.filter((picture) => picture.world === world).map((picture) => picture.part)).size, world).toBe(1);
  });

  it("gives every picture one click, and two only where the script says so: 34 in all", () => {
    expect(SOURCE.pictures.filter((picture) => picture.twoClicks).map((picture) => picture.number)).toEqual(TWO_CLICKS);
    for (const picture of SCRIPT) expect(picture.steps.length, picture.id).toBe(TWO_CLICKS.includes(picture.number) ? 2 : 1);
    expect(SCRIPT.flatMap((picture) => picture.steps)).toHaveLength(35);
  });

  it("leaves no string empty", () => {
    for (const text of everything) expect(text.trim()).not.toBe("");
  });

  it("uses no em or en dashes", () => {
    for (const text of everything) expect(text).not.toMatch(/[–—]/);
  });

  it("keeps the words we avoid out of what is shown and said", () => {
    for (const text of voiced) expect(text).not.toMatch(BANNED);
  });

  it("does not name the format before the last part", () => {
    for (const picture of SCRIPT.filter((picture) => picture.part < PARTS.length)) for (const text of voicedIn(picture)) expect(text, picture.id).not.toMatch(FORMAT_WORDS);
  });

  it("uses American spelling in what is shown and said", () => {
    for (const text of voiced) expect(text).not.toMatch(BRITISH);
  });

  it("keeps tired phrases and exclamation marks out of what is shown and said", () => {
    for (const text of voiced) expect(text).not.toMatch(TIRED);
  });

  it("spells out two to nine and uses numerals from 10, in what is shown and said", () => {
    // A calendar date keeps its numeral ("October 6"); every other lone digit is spelled out.
    const withoutDates = (text: string) => text.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}\b/g, "");
    for (const text of voiced) expect(withoutDates(text)).not.toMatch(LONE_DIGIT);
    for (const text of voiced) expect(text).not.toMatch(/\b(ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty)\b/i);
  });

  it("starts every On screen line with a capital letter", () => {
    for (const picture of SCRIPT) expect(picture.show, picture.id).toMatch(/^[A-Z]/);
  });

  it("names GitHub's own terms nowhere on screen, and in the notes only where the script allows it", () => {
    for (const picture of SCRIPT) for (const text of voicedIn(picture)) if (text !== picture.say || !GITHUB_TERMS_SAID.includes(picture.id)) expect(text, picture.id).not.toMatch(/pull request|\bfork/i);
    for (const id of GITHUB_TERMS_SAID) expect(SCRIPT.find((picture) => picture.id === id)!.say).toMatch(/pull request/);
  });
});

describe("the words a click puts on screen", () => {
  it("are the picture's own words: its On screen line, You say or They see, case and a closing period aside", () => {
    const plain = (text: string) => text.toLowerCase().replace(/\.$/, "");
    for (const picture of SCRIPT) {
      const words = plain([picture.show, picture.say, ...picture.see].join(" "));
      for (const step of picture.steps) for (const label of step.show) if (!OFF_SCRIPT.includes(label)) expect(words, `${picture.id}.${step.id}`).toContain(plain(label));
    }
  });

  it("are short enough to read from the back of the room, with no stray spaces", () => {
    for (const text of labels) {
      expect(text.length, text).toBeLessThanOrEqual(90);
      expect(text).toBe(text.trim());
    }
  });
});

describe("the story lines", () => {
  const listed = (list: [string, number][], id: string, i: number) => list.some(([p, n]) => p === id && n === i);

  it("give each picture one or two, the close included", () => {
    for (const picture of SCRIPT) expect(picture.story.length, picture.id).toBeLessThanOrEqual(2);
    expect(SCRIPT.filter((picture) => picture.story.length === 0).map((picture) => picture.number)).toEqual([]);
  });

  it("are sentences with no stray spaces", () => {
    for (const picture of SCRIPT)
      for (const line of picture.story) {
        expect(line, picture.id).toBe(line.trim());
        expect(line, picture.id).toMatch(/^[A-Z].*\.$/);
      }
  });

  it("each fit one line of 100 characters, but the script's longer ones", () => {
    for (const picture of SCRIPT) picture.story.forEach((line, i) => expect(line.length <= 100 || listed(LONG_STORY, picture.id, i), `${picture.id} ${line.length}`).toBe(true));
    for (const [id, i] of LONG_STORY) expect(SCRIPT.find((picture) => picture.id === id)!.story[i].length).toBeGreaterThan(100);
  });
});
