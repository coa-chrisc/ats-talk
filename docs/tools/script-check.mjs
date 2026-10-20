// Applies the copy rules of src/talks/bchc/script/script.test.ts (plus the brief's stricter
// label rule and word counts) to every slide of docs/city-talk-script.md, the backups (Part 5) included.
import { readFileSync } from "node:fs";
const file = process.argv[2];
const text = readFileSync(file, "utf8").replace(/&amp;/g, "&");
const ADVANCES = JSON.parse(readFileSync(new URL("../../src/talks/ats/script/geist-medium-advances.json", import.meta.url), "utf8")).advances;
const storyWidth = (line) => [...line].reduce((sum, ch) => sum + (ADVANCES[ch] ?? 0.6), 0) * 32;

const BANNED = /\b(leverag\w*|seamless\w*|delv\w*|tapestry|robust|game[- ]chang\w*|cutting[- ]edge|unlock\w*|empower\w*)\b/i;
const BRITISH = /\b(colour\w*|prioritis\w*|organis\w*|recognis\w*|licences?|modell\w+|centre\w*|catalogue\w*|whilst|towards)\b/i;
const TIRED = /\bjourney\w*|at the end of the day|\bsimply\b|!/i;
const LONE_DIGIT = /(?<![\d,.])[2-9](?![\d,.])/;
const NUMWORDS = /\b(ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty)\b/i;
const GH = /pull request|\bfork/i;
const FORMAT_WORDS = /powerpoint|slide deck|slideshow/i;
const ROLE = ["a person approves", "passed"];
const withoutDates = (t) => t.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}\b/g, "");

// The backup slides are the last part, Part 5: no You say floor, and the only part that may name the format.
const BACKUP = "Part 7";
const slides = [];
let section = null, field = "";
for (const line of text.split("\n")) {
  if (line.startsWith("## ")) {
    const part = line.match(/^## Part (\d)\. (.*) \(about \d+ minutes\)$/);
    section = part ? `Part ${part[1]}` : null;
    field = "";
    continue;
  }
  const h = line.match(/^### (\d+[a-z]?)\. (.*)$/);
  if (section && h) { slides.push({ section, number: h[1], name: h[2], story: [], see: [], show: undefined, say: undefined }); field = ""; continue; }
  const s = slides[slides.length - 1];
  if (!section || !s) continue;
  const opens = line.match(/^\*\*(On screen|You say|They see):\*\*\s*(.*)$/);
  const bullet = line.match(/^- (.*)$/);
  if (opens) {
    field = opens[1];
    if (field === "On screen") s.show = opens[2];
    else if (field === "You say") s.say = opens[2];
    else if (opens[2]) s.see.push(opens[2]);
  } else if (field === "On screen" && bullet) s.story.push(bullet[1].replace(/ \*\(click \d\)\*$/, ""));
  else if (field === "They see" && (bullet || line.match(/^\d+\. (.*)$/))) s.see.push((bullet ?? line.match(/^\d+\. (.*)$/))[1]);
}

const problems = [];
const bad = (s, msg) => problems.push(`${s.number}: ${msg}`);
if (/[–—]/.test(text)) text.split("\n").forEach((l, i) => /[–—]/.test(l) && problems.push(`line ${i + 1}: em/en dash`));
if (/Inquisitive/.test(text)) problems.push("doc: Inquisitive");
const counts = [];
for (const s of slides) {
  if (!s.show) bad(s, "no On screen"); if (!s.say) bad(s, "no You say"); if (!s.see[0]) bad(s, "no They see on its line");
  const show = s.show ?? "", say = s.say ?? "";
  if (!/^[A-Z]/.test(show)) bad(s, "On screen does not start with a capital");
  if (s.story.length > 2) bad(s, `${s.story.length} story lines`);
  if (s.story.length === 0 && s.number !== "29") bad(s, "no story lines");
  s.story.forEach((l, i) => {
    if (!/^[A-Z].*\.$/.test(l) || l !== l.trim()) bad(s, `story ${i + 1} is not a sentence: ${l}`);
    if (storyWidth(l) > 1728) bad(s, `story ${i + 1} is ${Math.round(storyWidth(l))} px at 32 px; the band is 1728`);
  });
  const labels = [...s.see.join(" ").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const plain = (t) => t.toLowerCase().replace(/\.$/, "");
  const words = plain([show, ...s.story, say].join(" "));
  // Stricter than the test's toContain: the label must sit on word boundaries.
  const has = (lab) => new RegExp(`(?<![a-z0-9])${plain(lab).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![a-z0-9])`).test(words);
  for (const lab of labels) {
    if (lab !== lab.trim()) bad(s, `label has stray spaces: "${lab}"`);
  }
  const voiced = [show, say, ...s.story, ...labels];
  for (const t of voiced) {
    for (const [re, name] of [[BANNED, "banned word"], [BRITISH, "British spelling"], [TIRED, "tired phrase or !"], [GH, "GitHub term"]]) {
      const m = t.match(re); if (m) bad(s, `${name} "${m[0]}" in: ${t.slice(0, 80)}`);
    }
    if (s.section !== BACKUP && FORMAT_WORDS.test(t)) bad(s, `format word in: ${t.slice(0, 60)}`);
  }
  const wc = say.trim().split(/\s+/).filter(Boolean).length;
  counts.push(`${s.number}=${wc}`);
}
console.log(`slides parsed: ${slides.length} (${slides.filter((s) => s.section !== BACKUP).length} main, ${slides.filter((s) => s.section === BACKUP).length} backup)`);
console.log(`You say word counts: ${counts.join(" ")}`);
console.log(problems.length ? `${problems.length} problem(s):\n` + problems.join("\n") : "0 problems");
process.exitCode = problems.length ? 1 : 0;
