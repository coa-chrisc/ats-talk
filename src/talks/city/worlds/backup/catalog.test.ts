/**
 * Slides 34 and 35: BCHC's catalog picture as this deck draws it (the home
 * page drawn empty, three working sessions each answered by feedback, on to
 * the catalog live), and the table of certificates built row by row.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { pictureOf } from "../../script/find";
import { storyId } from "../steps";
import { labelsOf } from "./layout";
import { CREDENTIAL_ROWS, THE_CATALOG } from "./layout-catalog";
import { at, endOf, inside, markup, overlaps, playOf, playsAt, startOf, stepOf, tagOf } from "./harness";

const storyAt = (pictureId: string, line: 0 | 1) => storyKeys(storyId(pictureId), 2)[line];
const lastStart = (step: string) => Math.max(...playsAt(step).map((play) => play.at));
const increasing = (values: number[]) => values.every((value, i) => i === 0 || value > values[i - 1]);

describe("34, The catalog", () => {
  const P = stepOf("the-catalog");
  const C = THE_CATALOG;
  const after = at(P);

  it("wipes the home page in first, drawn as its search bar and empty card frames only, nothing written in it, with the tag beside it", () => {
    // No screenshot, no entries, figures or fine print: the frame holds only an outline, a header band, the search bar and empty cards.
    expect(markup).not.toMatch(/<img|catalog-grid|\.webp/);
    const frame = markup.match(new RegExp(`<div[^>]*data-build="${C.frame.key.replace(/\./g, "\\.")}"[^>]*>([\\s\\S]*?)</div>`))![1];
    expect(frame.replace(/<[^>]+>/g, "").trim()).toBe("");
    expect(frame.match(/class="backup-home__card"/g)).toHaveLength(6);
    expect(frame).toContain('class="backup-home__search"');
    expect(frame).toContain('class="backup-brand--edge"');
    for (const card of C.frame.home.cards) expect(inside(card, { x: 0, y: 0, w: C.frame.at.w, h: C.frame.at.h })).toBe(true);
    expect(inside(C.frame.home.search, { x: 0, y: 0, w: C.frame.at.w, h: C.frame.at.h })).toBe(true);
    expect(startOf(P, C.frame.key)).toBeLessThan(startOf(P, C.tag.key));
    // The tag is a plain navy tag on two lines, with no rule leading off it.
    expect(C.tag.lines).toEqual(["Built with", "the coalition"]);
    expect(C.tag.lines.join(" ")).toBe(labelsOf("the-catalog")[0]);
    expect(tagOf(C.tag.key)).toContain("backup-tag--solid");
    expect(markup).not.toContain("backup-catalog-tag");
    expect(C.tag.at.x).toBeGreaterThan(C.frame.at.x + C.frame.at.w);
    expect(C.tag.at.x + C.tag.at.w).toBeLessThan(C.sessions[0].at.x);
    expect(startOf(P, storyAt("the-catalog", 0))).toBeGreaterThan(startOf(P, C.frame.key));
    expect(startOf(P, storyAt("the-catalog", 0))).toBeLessThan(startOf(P, C.sessions[0].key));
  });

  it("runs three working sessions top to bottom, each card drawn and tinted, then its feedback, then the arrow on to the next", () => {
    expect(C.sessions).toHaveLength(3);
    expect(increasing(C.sessions.map((session) => session.at.y))).toBe(true);
    const drawn = C.sessions.map((session) => startOf(P, session.key));
    expect(increasing(drawn)).toBe(true);
    for (let i = 1; i < drawn.length; i++) expect(drawn[i] - drawn[i - 1]).toBeCloseTo(1.3, 5);
    C.sessions.forEach((session, i) => {
      const mark = C.feedback[i];
      const tint = playOf(P, session.key).find((play) => play.on["--k"] === 1)!;
      expect(tint.at, session.key).toBeGreaterThan(drawn[i]);
      expect(startOf(P, mark.key), mark.key).toBeGreaterThan(tint.at);
      expect(startOf(P, mark.onward.key), mark.onward.key).toBeGreaterThan(startOf(P, mark.key));
      // The arrow from this session's feedback reaches the next card before the next session starts there.
      if (i < 2) expect(startOf(P, mark.onward.key)).toBeLessThan(drawn[i + 1] + 1.3);
      expect(after[session.key], session.key).toMatchObject({ "--d": 1, "--k": 1 });
      expect(after[mark.key], mark.key).toMatchObject({ autoAlpha: 1, y: 0 });
      expect(mark.text).toBe(labelsOf("the-catalog")[1]);
      // Each feedback sits beside its card, at its height.
      expect(mark.at.x).toBeGreaterThan(session.at.x + session.at.w);
      expect(mark.at.y + mark.at.h / 2).toBe(session.at.y + session.at.h / 2);
    });
    // Each arrow leads from a feedback into the next card, and the last on into the catalog live.
    expect(C.feedback.map((mark) => mark.onward.to)).toEqual([C.sessions[1].at, C.sessions[2].at, C.live.at]);
  });

  it("draws each session's page as BCHC does, inside its card: what the session made in green, the catalog's header last", () => {
    for (const session of C.sessions) for (const part of session.page.parts) expect(inside(part.at, session.at), session.key).toBe(true);
    const tones = C.sessions.map((session) => session.page.parts.map((part) => part.tone));
    expect(tones[0].every((tone) => tone === "process")).toBe(true);
    expect(tones[1].filter((tone) => tone === "process")).toHaveLength(3);
    expect(tones[2][0]).toBe("catalog");
    expect(tones[2].slice(1).every((tone) => tone === "rule")).toBe(true);
    for (let i = 1; i < C.sessions.length; i++) expect(C.sessions[i].page.parts.length).toBeGreaterThan(C.sessions[i - 1].page.parts.length - 1);
  });

  it("ends on the catalog live, after the last arrow lands, with the second story line, and keeps every part clear of the others", () => {
    expect(C.live.text).toBe(labelsOf("the-catalog")[2]);
    expect(startOf(P, C.live.key)).toBeGreaterThanOrEqual(endOf(P, C.feedback[2].onward.key) - 0.3);
    expect(startOf(P, storyAt("the-catalog", 1))).toBe(startOf(P, C.live.key));
    expect(startOf(P, C.live.key)).toBe(lastStart(P));
    const boxes = [C.frame.at, C.tag.at, ...C.sessions.map((session) => session.at), ...C.feedback.map((mark) => mark.at), C.live.at];
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) expect(overlaps(boxes[i], boxes[j]), `${i} and ${j}`).toBe(false);
  });
});

describe("35, Credentials", () => {
  const P = stepOf("credentials");
  const R = CREDENTIAL_ROWS;
  const after = at(P);
  const labels = labelsOf("credentials");
  const [first, second] = pictureOf("credentials").story;

  it("builds the table row by row under its top rule, each row's rule drawing after its words", () => {
    expect(R.rows).toHaveLength(11);
    expect(startOf(P, R.top.key)).toBeLessThanOrEqual(startOf(P, R.rows[0].key));
    expect(increasing(R.rows.map((row) => startOf(P, row.key)))).toBe(true);
    expect(increasing(R.rows.map((row) => row.at.y))).toBe(true);
    for (const row of R.rows) {
      expect(startOf(P, row.rule.key), row.key).toBeGreaterThan(startOf(P, row.key));
      expect(row.rule.y, row.key).toBe(row.at.y + row.at.h);
      expect(after[row.key], row.key).toMatchObject({ autoAlpha: 1, y: 0 });
      expect(after[row.rule.key], row.key).toMatchObject({ "--d": 1 });
    }
  });

  it("brings the seven rows the first story line names, then that line, then the rest, the second line once the rows it names are up", () => {
    for (const row of R.rows.slice(0, 7)) expect(first, row.name.text).toContain(row.name.text);
    expect(startOf(P, storyAt("credentials", 0))).toBeGreaterThan(startOf(P, R.rows[6].key));
    expect(startOf(P, storyAt("credentials", 0))).toBeLessThan(startOf(P, R.rows[7].key));
    // The second line comes up once every row it names is up.
    const named = R.rows.slice(7).filter((row) => second.includes(row.name.text));
    expect(named.map((row) => row.name.text)).toEqual(["Coursera with Vanderbilt", "LinkedIn Learning", "Carnegie Mellon"]);
    for (const row of named) expect(startOf(P, storyAt("credentials", 1)), row.key).toBeGreaterThan(startOf(P, row.key));
  });

  it("sets one row per institution: its name, its year where the script gives one, and its course names in small type, never an empty year cell", () => {
    expect(R.rows.map((row) => row.name.text)).toEqual(["Scrum Alliance", "ICAgile", "Google", "Stanford", "Duke", "IBM", "Microsoft", "Coursera with Vanderbilt", "LinkedIn Learning", "Carnegie Mellon", "PHEP and FEMA"]);
    expect(R.rows.map((row) => row.year?.text)).toEqual(["2022", "2023", "2023", "2023", "2023", "2023", "2023 and later", undefined, "2021 to 2026", "2026", undefined]);
    expect(R.rows.map((row) => row.courses.text)).toHaveLength(11);
    for (const row of R.rows) {
      expect(labels, row.courses.text).toContain(row.courses.text);
      // Where there is no year, the course names start in the year's column instead.
      expect(row.courses.at.x, row.key).toBe(row.year ? R.rows[0].courses.at.x : R.rows[0].year!.at.x);
    }
    expect(markup.match(/backup-word--small/g)).toHaveLength(11);
    // The table sets every one of the step's labels and nothing else (a year the step shows once, such as 2023, stands in several rows).
    expect(new Set(R.rows.flatMap((row) => [row.name.text, ...(row.year ? [row.year.text] : []), row.courses.text]))).toEqual(new Set(labels));
  });

  it("sets nothing resembling a secret: no identifiers, numbers or links", () => {
    const words = R.rows.flatMap((row) => [row.name.text, ...(row.year ? [row.year.text] : []), row.courses.text]);
    expect(words.join(" ")).not.toMatch(/https?:|@|#|[A-Z0-9]{8,}|\d{5,}/);
  });
});
