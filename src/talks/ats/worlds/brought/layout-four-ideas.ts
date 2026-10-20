/**
 * Slide 2's places: four tall panels across the drawing width, a numeral
 * at each one's top left and its name under that, wrapping in a column;
 * and under the panels a route, one line across the full width with three
 * stops on it, each named under it. The panels' geometry is shared with
 * slide 28, which draws the same four, so it is fixed here in plain
 * numbers. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { SAFE, TEXT_LINE, contentTop, layerOf } from "./layout";

const LABELS = shown("four-ideas", "play");
const NUMERALS = LABELS.slice(0, 4);
const NAMES = LABELS.slice(4, 8);
const STOPS = LABELS.slice(8);

export const TOP = contentTop("four-ideas");

/**
 * A panel: 396 wide with 48 between, so the four span 96 to 1824 exactly;
 * 300 tall from the drawing's top. Inside it the numeral sits 28 px in from
 * its top left on a 72 px line, set at 56 px, and the name starts 120 px
 * down in a 340 px column at 32 px semibold on 42 px lines: two lines for
 * three of the names and three for the longest (about 640 px on one line),
 * its foot still 54 px over the panel's.
 */
export const PANEL = { w: 396, gap: 48, h: 300, inset: 28, numeral: 56, numeralLine: 72, nameDown: 120, nameW: 340, nameLine: 42 } as const;
const panelAt = (i: number): Box => box(SAFE.left + 16 + i * (PANEL.w + PANEL.gap), TOP, PANEL.w, PANEL.h);

/**
 * The route: one line across the full drawing width, 56 px under the
 * panels' foot; its three stops a sixth, a half and five sixths along it,
 * each a ring of 14 px on the line, named at the text size under it, the
 * name's foot about 17 px over the drawing's foot.
 */
export const ROUTE = { gap: 56, stop: 14, nameGap: 12 } as const;
const LINE_Y = TOP + PANEL.h + ROUTE.gap;
const LINE = { x0: SAFE.left + 16, x1: SAFE.right, y: LINE_Y } as const;
const ALONG = [1 / 6, 1 / 2, 5 / 6] as const;
const NAME_Y = LINE_Y + ROUTE.stop + ROUTE.nameGap + TEXT_LINE / 2;

export const FOUR_IDEAS = {
  ...layerOf("four-ideas"),
  panels: NAMES.map((name, i) => {
    const at = panelAt(i);
    return {
      key: `four-ideas.panel.${i}`,
      at,
      numeral: { key: `four-ideas.panel.${i}.numeral`, text: NUMERALS[i], at: { x: at.x + PANEL.inset, y: at.y + PANEL.inset + PANEL.numeralLine / 2 } as Point },
      name: { key: `four-ideas.panel.${i}.name`, text: name, at: box(at.x + PANEL.inset, at.y + PANEL.nameDown, PANEL.nameW, 3 * PANEL.nameLine) },
    };
  }),
  route: {
    key: "four-ideas.route",
    ...LINE,
    stops: STOPS.map((text, i) => {
      const x = Math.round(LINE.x0 + ALONG[i] * (LINE.x1 - LINE.x0));
      return {
        key: `four-ideas.stop.${i}`,
        along: ALONG[i],
        at: { x, y: LINE_Y } as Point,
        name: { key: `four-ideas.stop.${i}.name`, text, at: { x, y: NAME_Y } as Point },
      };
    }),
  },
};
