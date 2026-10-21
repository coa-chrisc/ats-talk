"use client";
import { Agent, HumanMark, Part, Person } from "@/components/deck/kit";
import { REVIEW as R, WORK } from "./layout-review";
import { Layer, StoryOf, Words } from "./parts";
const L = R.labels;
export function ReviewMarks() {
  return <Part id={R.marks}>
    <g data-build={R.stage}>
      <Words at={{x:220,y:560}} text={L.agents} strong size="text" />
      {[0,1,2].map(i => <Agent key={i} id={`review.agent.${i}`} at={{x:220,y:608+i*48}} role="builder" />)}
      <path className="en-review-link" d="M290 655H1190 M1178 647L1190 655L1178 663" fill="none" strokeWidth="2" />
      <rect className="en-stream-check" x="720" y="624" width="210" height="88" rx="12" />
      <Words at={{x:825,y:560}} text={L.checks} strong size="text" />
      <Words at={{x:825,y:600}} text={L.methods} />
      <Words at={{x:1470,y:560}} text={L.completed} strong size="text" />
      <path className="en-stream-tray" d="M1208 588V760H1750V588" />
      <path className="en-review-link" d="M825 712V814 M817 802L825 814L833 802" fill="none" strokeWidth="2" />
      <path className="en-stream-tray" d="M704 828V894H934V828 M1220 828V894H1470V828" />
      <Words at={{x:820,y:923}} text={L.exceptions} strong />
      <Words at={{x:820,y:958}} text={L.before} tone="soft" />
      <Words at={{x:1345,y:923}} text={L.samples} strong />
      <Words at={{x:1345,y:958}} text={L.after} tone="soft" />
      <Person id="review.human" at={{x:1052,y:815,w:46,h:78}} />
      <HumanMark id={R.person} at={{x:1075,y:924}} />
      <Words at={{x:1075,y:979}} text={L.oversight} />
      <Words at={{x:96,y:976}} text={L.illustrative} anchor="start" tone="soft" />
    </g>
    <g data-build={R.audit}><path className="en-review-link" d="M1560 770V804H1345V820 M1337 808L1345 820L1353 808" fill="none" strokeWidth="2" strokeDasharray="8 7" /></g>
    {WORK.map(item => <g key={item.key} data-build={item.key} className={`en-stream-item${item.exception >= 0 ? " en-stream-item--exception" : ""}`}>
      <rect width="26" height="30" rx="3" /><path d="M6 9H20M6 15H20M6 21H15" />
    </g>)}
  </Part>;
}
export function ReviewHtml() {
  return <Layer id={R.html}>
    <StoryOf picture="review" />
    <div data-build={R.forecast.key} className="en-review-forecast" style={{left:R.forecast.at.x,top:R.forecast.at.y,width:R.forecast.at.w,height:R.forecast.at.h}}>
      <div>{R.forecast.source}</div><strong>{R.forecast.forecast}</strong><p>{R.forecast.scope}</p>
    </div>
  </Layer>;
}
