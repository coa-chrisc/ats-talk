/**
 * Slide 8's places: three plain cards spanning the stage, a gap between
 * each, each a square-cornered white face with a grey band across
 * its top, its case name large under the band, the one line of what
 * happened under that, and a grey tag across its foot; under all three a
 * single line, its words centred under it. Words are read from the script,
 * by position.
 */
import { box, type Box } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TAG_LINE, TEXT_LINE, contentTop, layerOf } from "./layout";

const [POCKET, DELETING, NOTHING_ASKED, UBER, BUDGET, REWARDED, AIR, REFUND, NOTHING_CHECKED, GOVERNANCE] = shown("incidents", "play");
const CASES = [
  [POCKET, DELETING, NOTHING_ASKED],
  [UBER, BUDGET, REWARDED],
  [AIR, REFUND, NOTHING_CHECKED],
] as const;

export const TOP = contentTop("incidents");

/**
 * A card: 480 wide, so the three with their two 144 px gaps span the band
 * from 96 to 1824. At 416 px inside its 32 px insets, each case name sets at
 * 48 px on one line, each description on one or two lines of 26 px and each
 * tag's words on one or two lines of 24 px.
 */
export const CARD_W = 480;
const GAP = (SAFE.right - SAFE.left - 3 * CARD_W) / 2;
/** The line 28 px under the cards, its words 12 px under it at 32 px, the words' foot 4 px over the safe line: the cards take the rest. */
const LINE_GAP = 28;
const LABEL_GAP = 12;
const CARD_H = SAFE.bottom - 4 - TEXT_LINE - LABEL_GAP - LINE_GAP - TOP;
/** Inside a card: the band, the 32 px inset, the 48 px name's line, the gap, room for the description's 26 px words on up to three lines; the tag's two 24 px lines and its pad, at the foot. */
export const INNER = { band: 16, pad: 32, name: 56, gap: 8, lines: 3, tagPad: 10 } as const;
const TAG_H = 2 * TAG_LINE + 2 * INNER.tagPad;
const LINE_Y = TOP + CARD_H + LINE_GAP;

const cardAt = (i: number): Box => box(SAFE.left + i * (CARD_W + GAP), TOP, CARD_W, CARD_H);

export const INCIDENTS = {
  ...layerOf("incidents"),
  cards: CASES.map(([name, what, tag], i) => {
    const at = cardAt(i);
    const x = at.x + INNER.pad;
    const w = at.w - 2 * INNER.pad;
    const nameY = at.y + INNER.band + INNER.pad;
    const whatY = nameY + INNER.name + INNER.gap;
    return {
      key: `incidents.card.${i}`,
      at,
      /** The grey band across the top. */
      band: box(at.x, at.y, at.w, INNER.band),
      name: { key: `incidents.card.${i}.name`, text: name, at: box(x, nameY, w, INNER.name) },
      what: { key: `incidents.card.${i}.what`, text: what, at: box(x, whatY, w, INNER.lines * LABEL_LINE) },
      tag: { key: `incidents.card.${i}.tag`, text: tag, at: box(x, at.y + at.h - INNER.pad - TAG_H, w, TAG_H) },
    };
  }),
  line: { key: "incidents.line", y: LINE_Y, x0: SAFE.left, x1: SAFE.right },
  label: { key: "incidents.label", text: GOVERNANCE, at: box(SAFE.left, LINE_Y + LABEL_GAP, SAFE.right - SAFE.left, TEXT_LINE) },
};
