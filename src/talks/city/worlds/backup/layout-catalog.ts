/**
 * Slides 34 and 35: where every part goes, its id and its words, read from
 * the script by position.
 *
 * 34, the coalition's catalog, after BCHC's catalog pictures (its slide 2
 * and its three working sessions, worlds/catalog/layout.ts): the catalog's
 * home page drawn on the left as its search bar and empty card frames only,
 * with the catalog's 3 px edge, and a two-line tag beside it; on the right
 * three session cards one under another, each holding the catalog's page as
 * that session left it, a feedback box in the catalog's colour beside each,
 * an arrow from each feedback back into the next card's side, and the last
 * feedback leading to the catalog live. The script gives the sessions no
 * names, so the cards carry none.
 *
 * 35, the credentials: a table, one row per institution: its name, its year
 * where the script gives one, then its course names in small type. Where
 * the script gives no year, the course names start in the year's column, so
 * no cell is left empty.
 */
import { box, type Box } from "@/components/deck/kit";
import { LABEL_LINE, contentTop, groupOf, labelsOf, quoted, tagW } from "./layout";

/* 34. The catalog */

const [BUILT_WITH, FEEDBACK, LIVE] = labelsOf("the-catalog");
const C_TOP = contentTop("the-catalog");
/** The home page: an outline in the catalog's colour, its header band, its search bar and two rows of three empty card frames, in the page's own pixels. */
const FRAME = box(96, C_TOP, 640, 360);
const HOME = {
  header: box(0, 0, FRAME.w, 44),
  search: box(40, 72, FRAME.w - 80, 44),
  cards: [0, 1].flatMap((row) => [0, 1, 2].map((col) => box(40 + col * 192, 140 + row * 112, 168, 92))),
};
const TAG = box(FRAME.x + FRAME.w + 24, FRAME.y + FRAME.h / 2 - 38, tagW(164), 76);
const CARD = { x: 1076, w: 300, h: 120, pitch: 140 } as const;
const CARDS = [0, 1, 2].map((i) => box(CARD.x, C_TOP + i * CARD.pitch, CARD.w, CARD.h));
const FEEDBACK_BOX = { x: 1440, w: 168, h: 56 } as const;
const LIVE_BOX = { w: 144, h: 64 } as const;

/**
 * The page inside a session card, in the page's own pixels (256 by 100), as
 * BCHC draws it: the rule under its header and a row of cards per session's
 * work. `tone`: "rule" for what an earlier session made, "process" for what
 * this one made, "catalog" for the catalog's own header, made last.
 */
const PAGE = { w: 256, h: 100 } as const;
type PagePart = { at: Box; tone: "rule" | "process" | "catalog" };
const pageCards = (y: number, tone: PagePart["tone"]): PagePart[] => [12, 92, 172].map((x) => ({ at: box(x, y, 72, 20), tone }));
const PAGE_PARTS: PagePart[][] = [
  [{ at: box(12, 30, 140, 10), tone: "process" }, ...pageCards(50, "process")],
  [{ at: box(12, 30, 140, 10), tone: "rule" }, ...pageCards(50, "rule"), ...pageCards(74, "process")],
  [{ at: box(0, 0, PAGE.w, 20), tone: "catalog" }, { at: box(12, 30, 140, 10), tone: "rule" }, ...pageCards(50, "rule"), ...pageCards(74, "rule")],
];

const feedbackAt = (card: Box) => box(FEEDBACK_BOX.x, card.y + (card.h - FEEDBACK_BOX.h) / 2, FEEDBACK_BOX.w, FEEDBACK_BOX.h);
const LAST = feedbackAt(CARDS[2]);
const LIVE_AT = box(1824 - LIVE_BOX.w, LAST.y + (LAST.h - LIVE_BOX.h) / 2, LIVE_BOX.w, LIVE_BOX.h);

export const THE_CATALOG = {
  ...groupOf("the-catalog"),
  frame: { key: "the-catalog.frame", at: FRAME, home: HOME },
  /** Broken after its second word, as BCHC's tag is set on two lines. */
  tag: { key: "the-catalog.tag", lines: [BUILT_WITH.split(" ").slice(0, 2).join(" "), BUILT_WITH.split(" ").slice(2).join(" ")], at: TAG },
  sessions: CARDS.map((at, i) => {
    const page = box(at.x + (at.w - PAGE.w) / 2, at.y + (at.h - PAGE.h) / 2, PAGE.w, PAGE.h);
    return {
      key: `the-catalog.session.${i}`,
      at,
      page: { at: page, header: page.y + 20, parts: PAGE_PARTS[i].map(({ at: part, tone }) => ({ at: box(page.x + part.x, page.y + part.y, part.w, part.h), tone })) },
    };
  }),
  feedback: CARDS.map((card, i) => {
    const at = feedbackAt(card);
    const next = CARDS[i + 1] ?? LIVE_AT;
    return {
      key: `the-catalog.feedback.${i}`,
      text: FEEDBACK,
      at,
      /** From the feedback back into the next card's side, or on into the catalog live. */
      onward: { key: `the-catalog.feedback.${i}.onward`, from: at, to: next },
    };
  }),
  live: { key: "the-catalog.live", text: LIVE, at: LIVE_AT },
};

/* 35. The credentials */

/**
 * The table's rows, in the order the They see quotes them: each row is an
 * institution, then its year where the script gives one, then its course
 * names. A year is the quote that starts with one. The words are the
 * step's labels; the quotes only say which row each belongs to (a year the
 * step shows once, such as 2023, stands in several rows).
 */
const YEAR = /^20\d\d/;
const CREDENTIAL_LABELS = labelsOf("credentials");
const labelled = (text: string) => {
  const label = CREDENTIAL_LABELS.find((entry) => entry === text);
  if (!label) throw new Error(`"${text}" is not one of slide 35's labels.`);
  return label;
};
type CredentialRow = { name: string; year?: string; courses: string };
const rowsOf = (quotes: readonly string[]): CredentialRow[] => {
  if (!quotes.length) return [];
  const [name, ...rest] = quotes;
  const year = YEAR.test(rest[0]) ? rest[0] : undefined;
  const [courses, ...next] = year ? rest.slice(1) : rest;
  return [{ name, year, courses }, ...rowsOf(next)];
};
const ROWS = rowsOf(quoted("credentials").map(labelled));
const R_TOP = contentTop("credentials") + 8;
/** One row 44 px tall: the institution in semibold, the year, and the course names in small type, in three columns across the band's width. */
const TABLE = { x: 96, w: 1728, pitch: 44, name: 120, year: 520, courses: 760 } as const;
const SMALL_LINE = 28;

export const CREDENTIAL_ROWS = {
  ...groupOf("credentials"),
  rows: ROWS.map((entry, i) => {
    const y = R_TOP + i * TABLE.pitch;
    const mid = y + TABLE.pitch / 2;
    const coursesX = entry.year ? TABLE.courses : TABLE.year;
    return {
      key: `credentials.row.${i}`,
      at: box(TABLE.x, y, TABLE.w, TABLE.pitch),
      rule: { key: `credentials.row.${i}.rule`, x0: TABLE.x, x1: TABLE.x + TABLE.w, y: y + TABLE.pitch },
      name: { text: entry.name, at: box(TABLE.name, mid - LABEL_LINE / 2, TABLE.year - TABLE.name - 24, LABEL_LINE) },
      year: entry.year ? { text: entry.year, at: box(TABLE.year, mid - LABEL_LINE / 2, TABLE.courses - TABLE.year - 24, LABEL_LINE) } : undefined,
      courses: { text: entry.courses, at: box(coursesX, mid - SMALL_LINE / 2, TABLE.x + TABLE.w - 24 - coursesX, SMALL_LINE) },
    };
  }),
  /** The rule over the first row: the table's top. */
  top: { key: "credentials.top", x0: TABLE.x, x1: TABLE.x + TABLE.w, y: R_TOP },
};
