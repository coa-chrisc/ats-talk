"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as L, Ink, Sketch, drawingInk, drawingPaper, drawingProcess } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const w=shown("outcomes","play");
const t=contentTop("outcomes");
export function OutcomesMarks(){return <Part id="outcomes.marks">
<g data-build="outcomes.project"><Sketch kind="document" x={145} y={t+51}/><L text={w[0]} x={210} y={t+24} anchor="start" strong width={1580}/><L text={w[1]} x={210} y={t+65} anchor="start" width={1580}/></g>
<g data-build="outcomes.measure"><L text={w[2]} x={96} y={t+130} anchor="start" strong width={380}/><L text={w[3]} x={96} y={t+168} anchor="start" width={470}/></g>
<Ink id="outcomes.ruler" d={`M640 ${t+158}h1090M640 ${t+144}v28M1730 ${t+144}v28`}/>
<g data-build="outcomes.baseline"><L text={w[4]} x={850} y={t+120} strong/><L text={w[5]} x={850} y={t+203} width={440}/><path d={`M850 ${t+145}v26`} stroke={drawingProcess} strokeWidth={4}/></g>
<g data-build="outcomes.target"><L text={w[6]} x={1500} y={t+120} strong/><L text={w[7]} x={1500} y={t+203} width={480}/><circle cx={1500} cy={t+158} r={12} fill={drawingPaper} stroke={drawingInk} strokeWidth={3} strokeDasharray="4 4"/></g>
{[0,1,2].map(i=><g key={i} data-build={`outcomes.check.${i}`}><Sketch kind={['person','magnify','compass'][i]} x={155+i*586} y={t+330} scale={0.75}/><L text={w[8+i*2]} x={215+i*586} y={t+302} anchor="start" strong width={435}/><L text={w[9+i*2]} x={215+i*586} y={t+340} anchor="start" width={435}/></g>)}
</Part>;}
export function OutcomesHtml(){return <Layer id="outcomes.html"><StoryOf picture="outcomes"/></Layer>;}
