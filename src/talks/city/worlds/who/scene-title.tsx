/**
 * What slide 1 draws on the navy ground (layout.ts, OPENING): the title,
 * set large and centred, the short green rule under it, and the two story
 * lines under that. The frame puts the white logo in the corner.
 */
import { box } from "@/components/deck/kit";
import { OPENING } from "./layout";
import { Centred, TitleRule } from "./parts";

export function TitleHtml() {
  const { title, rule, lead, credit } = OPENING;
  return (
    <>
      <Centred id={title.key} y={title.y} lines={title.lines} size="display" />
      <TitleRule id={rule.key} at={box(rule.x, rule.y, rule.w, rule.h)} />
      <Centred id={lead.key} y={lead.y} lines={lead.lines} size="lead" />
      <Centred id={credit.key} y={credit.y} lines={credit.lines} size="credit" />
    </>
  );
}
