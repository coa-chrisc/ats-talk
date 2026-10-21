"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as L, Ink, Sketch, drawingProcess } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const w=shown("fleet","play");
const t=contentTop("fleet");
export function FleetMarks(){return <Part id="fleet.marks">
<g data-build="fleet.heading"><L text={w[0]} x={460} y={t+25} strong/><L text={w[7]} x={1360} y={t+25} strong/></g>
{[0,1,2].map(i=><g key={i} data-build={`fleet.capability.${i}`}><Sketch kind={['team','server','agent'][i]} x={160} y={t+95+i*107} scale={0.8}/><L text={w[1+i*2]} x={225} y={t+77+i*107} anchor="start" strong width={610}/><L text={w[2+i*2]} x={225} y={t+112+i*107} anchor="start" width={610}/></g>)}
<Ink id="fleet.join" d={`M850 ${t+80}Q900 ${t+80} 900 ${t+195}M850 ${t+195}H970M850 ${t+310}Q900 ${t+310} 900 ${t+195}`}/>
<Ink id="fleet.runway" d={`M970 ${t+193}h810M970 ${t+210}h810`}/>
{[0,1,2].map(i=><g key={i} data-build={`fleet.readiness.${i}`}><Sketch kind={['person','gate','magnify'][i]} x={1070+i*300} y={t+133} scale={0.75}/><path d={`M${1070+i*300} ${t+180}v45`} stroke={drawingProcess} strokeWidth={4}/><L text={w[8+i*2]} x={1070+i*300} y={t+245} width={290} strong/><L text={w[9+i*2]} x={1070+i*300} y={t+315} width={290}/></g>)}
<g data-build="fleet.portfolio"><L text={w[14]} x={96} y={t+417} anchor="start" width={1728}/></g>
</Part>;}
export function FleetHtml(){return <Layer id="fleet.html"><StoryOf picture="fleet"/></Layer>;}
