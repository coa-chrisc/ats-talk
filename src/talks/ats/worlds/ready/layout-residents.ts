/** Display slide 32: assistance, human responsibility, and resident benefit. */
import { box, type Box } from "@/components/deck/kit";
import { breakAfter } from "../../script/find";
import { groupOf, labelsOf, wordsBox } from "./layout";

const [AI, DRAFT, STAFF, REVIEW, RESIDENT, RECEIVE, ASK, QUESTION] = labelsOf("residents");
const stages = [
  { key: "residents.ai", x: 400, title: AI, lines: breakAfter(DRAFT, "draft") },
  { key: "residents.staff", x: 960, title: STAFF, lines: breakAfter(REVIEW, "responses") },
  { key: "residents.resident", x: 1520, title: RESIDENT, lines: breakAfter(RECEIVE, "information") },
].map((stage) => ({ ...stage, icon: box(stage.x - 48, 540, 96, 128), titleAt: { x: stage.x, y: 716 }, captionY: 770 }));

export const RESIDENTS = {
  ...groupOf("residents"),
  stages,
  arrows: [640, 1200].map((x, i) => ({ key: `residents.arrow.${i}`, d: `M${x} 610H${x + 80}M${x + 64} 596L${x + 80} 610L${x + 64} 624`, at: box(x, 596, 80, 28) })),
  mark: { key: "residents.mark", at: { x: 1036, y: 552 } },
  question: { key: "residents.question", heading: ASK, text: QUESTION, headingAt: { x: 960, y: 902 }, at: { x: 960, y: 950 } },
};

export const RESIDENTS_BOXES: Box[] = [
  ...stages.flatMap((s) => [s.icon, wordsBox(s.titleAt, s.title, 32), ...s.lines.map((line, i) => wordsBox({ x: s.x, y: s.captionY + i * 40 }, line, 32))]),
  ...RESIDENTS.arrows.map((a) => a.at),
  box(1012, 528, 48, 48),
  wordsBox(RESIDENTS.question.headingAt, ASK),
  wordsBox(RESIDENTS.question.at, QUESTION, 32),
];
