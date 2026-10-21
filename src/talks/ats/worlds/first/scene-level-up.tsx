"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as L, Ink, Sketch, drawingProcess, drawingPaper } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const w=shown("level-up","play");
const t=contentTop("level-up");
export function LevelUpMarks(){return <Part id="level-up.marks">
{[0,1,2].map(i=><g key={i} data-build={`level-up.role.${i}`}><Sketch kind={['person','compass','tools'][i]} x={158} y={t+63+i*122} scale={0.8}/><L text={w[i*2]} x={235} y={t+39+i*122} anchor="start" strong width={620}/><L text={w[i*2+1]} x={235} y={t+77+i*122} anchor="start" width={620}/><Ink d={`M235 ${t+120+i*122}h590`}/></g>)}
<g data-build="level-up.practice"><L text={w[6]} x={1385} y={t+23} width={800} strong/><Sketch kind="document" x={1390} y={t+214} scale={1.25}/></g>
{['M1398 94Q1605 94 1650 178','M1650 202Q1650 325 1402 347','M1378 347Q1130 325 1130 202','M1130 178Q1130 94 1378 94'].map((d,i)=><Ink key={i} id={`level-up.arc.${i}`} d={d.replace(/(\d+) (\d+)/g,(_,x,y)=>`${x} ${Number(y)+t}`)}/>)}
{[0,1,2,3].map(i=>{const points=[[1390,94],[1650,190],[1390,347],[1130,190]];const [x,y]=points[i];return <g key={i} data-build={`level-up.practice.${i}`}><circle cx={x} cy={t+y} r={8} fill={drawingProcess}/><rect x={x-(i%2?150:295)} y={t+y+(i===0?-58:i===2?14:22)} width={i%2?300:590} height={i%2?102:34} fill={drawingPaper}/><L text={w[7+i]} x={x} y={t+y+(i===0?-35:i===2?37:44)} width={i%2?300:590}/></g>;})}
</Part>;}
export function LevelUpHtml(){return <Layer id="level-up.html"><StoryOf picture="level-up"/></Layer>;}
