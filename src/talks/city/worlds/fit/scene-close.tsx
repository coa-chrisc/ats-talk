/** Slide 24, the close, set as slide 1 is: its title centred, the green rule under it, its two story lines and the small line at the foot, on the navy the step asks for. */
"use client";

import { Block } from "@/components/deck/kit";
import { CLOSE } from "./layout-close";
import { Centred, GrowingRule } from "./parts";

export function CloseHtml() {
  const { title, rule, story, foot } = CLOSE;
  return (
    <>
      <Centred id={title.key} y={title.y} lines={title.lines} size="display" />
      <GrowingRule id={rule.key} at={rule.at} />
      {story.map((line) => (
        <Centred key={line.key} id={line.key} y={line.y} lines={[line.text]} size={line.size} />
      ))}
      <Block id={foot.key} at={foot.at} className="dk-block--label dk-block--line fit-centred">
        {foot.text}
      </Block>
    </>
  );
}
