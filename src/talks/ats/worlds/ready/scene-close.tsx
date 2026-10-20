/** Slide 20, the close, set as the opening is: its title centred, the green rule under it, its two story lines and the small line at the foot, on the navy the step asks for. */
"use client";

import { STAGE, place, type Box } from "@/components/deck/kit";
import { CLOSE } from "./layout-close";

/** Lines of HTML type set centred across the stage, top at `y`: the 108 px title, or a story line at 40 px (`line`) or at the story size in the softer colour (`credit`). Each line rises from its mask as the kit's do. */
function Centred({ id, y, lines, size }: { id: string; y: number; lines: readonly string[]; size: "display" | "line" | "credit" }) {
  const kit = size === "display" ? "dk-set--display" : "dk-set--text";
  return (
    <p className={`dk-set ${kit} rd-centred rd-centred--${size}`} style={{ left: 0, top: y, width: STAGE.w }}>
      {lines.map((line, i) => (
        <span key={i} className="dk-set__mask">
          <span className="dk-set__line" data-build={id}>
            {line}
          </span>
        </span>
      ))}
    </p>
  );
}

/** The short green rule under a centred title: it grows out from its middle (`scaleX`). */
function GrowingRule({ id, at }: { id: string; at: Box }) {
  return <div className="rd-rule" data-build={id} style={place(at)} />;
}

/** The small line at the foot: a short grey rule over its words, centred, coming up as one part. */
function Foot({ id, at, rule, text }: { id: string; at: Box; rule: Box; text: string }) {
  return (
    <div data-build={id}>
      <div className="rd-foot__rule" style={place(rule)} />
      <div className="dk-block dk-block--label dk-block--line rd-centred" style={place(at)}>
        {text}
      </div>
    </div>
  );
}

export function CloseHtml() {
  const { title, rule, story, foot } = CLOSE;
  return (
    <>
      <Centred id={title.key} y={title.y} lines={title.lines} size="display" />
      <GrowingRule id={rule.key} at={rule.at} />
      {story.map((line) => (
        <Centred key={line.key} id={line.key} y={line.y} lines={[line.text]} size={line.size} />
      ))}
      <Foot id={foot.key} at={foot.at} rule={foot.rule} text={foot.text} />
    </>
  );
}
