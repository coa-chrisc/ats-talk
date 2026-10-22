/** Slide 4a's picture: the agents, the checks and the finished work on one flow line, the exceptions' and the audit trays under them, the person in their own column between those, the documents of the stream and the audit's copies. */
"use client";

import { HumanMark, Part, Person, type Point } from "@/components/deck/kit";
import { AGENT_SCALE, DOC, REVIEW as R, SAMPLES, WORK } from "./layout-review";
import { Layer, StoryOf, Words } from "./parts";
import { HexAgent } from "./parts-figures";

const W = R.words;
const T = R.trays;

/** A tray open at its top: its two walls and its floor. */
const trayPath = (at: { x: number; y: number; w: number; h: number }) => `M${at.x} ${at.y}V${at.y + at.h}H${at.x + at.w}V${at.y}`;
/** An arrowhead 8 px either side, pointing right at `at` or down at it. */
const headRight = (at: Point) => `M${at.x - 12} ${at.y - 8}L${at.x} ${at.y}L${at.x - 12} ${at.y + 8}`;
const headDown = (at: Point) => `M${at.x - 8} ${at.y - 12}L${at.x} ${at.y}L${at.x + 8} ${at.y - 12}`;

/** A document: a navy card with three lines written on it, placed by the moves at its top left corner. */
function Doc({ id }: { id: string }) {
  return (
    <g data-build={id} className="en-stream-item">
      <rect width={DOC.w} height={DOC.h} rx="3" />
      <path d="M6 9H20M6 15H20M6 21H15" />
    </g>
  );
}

export function ReviewMarks() {
  return (
    <Part id={R.marks}>
      <g data-build={R.stage}>
        <Words at={W.agents.at} text={W.agents.text} strong size="text" />
        <path className="en-review-link" d={`M${R.flow.x0} ${R.flow.y}H${R.flow.x1}${headRight({ x: R.flow.x1, y: R.flow.y })}`} fill="none" strokeWidth="2" />
        <rect className="en-stream-check" x={R.check.x} y={R.check.y} width={R.check.w} height={R.check.h} rx="12" />
        <Words at={W.checks.at} text={W.checks.text} strong size="text" />
        <Words at={W.methods.at} text={W.methods.text} tone="soft" />
        <Words at={W.completed.at} text={W.completed.text} strong size="text" />
        <path className="en-stream-tray" d={trayPath(T.done)} />
        <path className="en-review-link" d={`M${R.down.x} ${R.down.y0}V${R.down.y1}${headDown({ x: R.down.x, y: R.down.y1 })}`} fill="none" strokeWidth="2" />
        <path className="en-stream-tray" d={`${trayPath(T.exceptions)}${trayPath(T.audit)}`} />
        <Words at={W.exceptions.at} text={W.exceptions.text} strong />
        <Words at={W.before.at} text={W.before.text} tone="soft" />
        <Words at={W.samples.at} text={W.samples.text} strong />
        <Words at={W.after.at} text={W.after.text} tone="soft" />
        <Words at={W.oversight.at} text={W.oversight.text} strong />
        <Words at={W.illustrative.at} text={W.illustrative.text} anchor="start" tone="soft" />
      </g>
      {R.agents.map((agent) => (
        <HexAgent key={agent.key} id={agent.key} at={agent.at} scale={AGENT_SCALE} />
      ))}
      <Person id={R.human.key} at={R.human.at} />
      <HumanMark id={R.person} at={R.mark} />
      <g data-build={R.audit}>
        <path className="en-review-link" d={`M${R.link.x} ${R.link.y0}V${R.link.y1}`} fill="none" strokeWidth="2" strokeDasharray="8 7" />
        <path className="en-review-link" d={headDown({ x: R.link.x, y: R.link.y1 })} fill="none" strokeWidth="2" />
      </g>
      {WORK.map((item) => (
        <Doc key={item.key} id={item.key} />
      ))}
      {SAMPLES.map((sample) => (
        <Doc key={sample.key} id={sample.key} />
      ))}
    </Part>
  );
}

export function ReviewHtml() {
  return (
    <Layer id={R.html}>
      <StoryOf picture="review" />
      <div data-build={R.forecast.key} className="en-review-forecast" style={{ left: R.forecast.at.x, top: R.forecast.at.y, width: R.forecast.at.w, height: R.forecast.at.h }}>
        <div>{R.forecast.source}</div>
        <strong>{R.forecast.forecast}</strong>
        <p>{R.forecast.scope}</p>
      </div>
    </Layer>
  );
}
