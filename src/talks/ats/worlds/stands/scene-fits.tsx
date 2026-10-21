"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as Label, Ink, drawingInk, drawingPaper, drawingProcess, drawingRule } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const words=shown("fits","play");
const top=contentTop("fits");
const ports=[{x:1190,y:top+110},{x:1675,y:top+110},{x:1190,y:top+285},{x:1675,y:top+285}];
export function FitsMarks(){return <Part id="fits.marks">
 <g data-build="fits.foundation">
  <Label text={words[0]} x={116} y={top+24} strong anchor="start" width={360}/>
  <Label text={words[1]} x={505} y={top+24} strong anchor="start" width={390}/>
  <Ink d={`M108 ${top+47}v306h805M130 ${top+365}h760M155 ${top+376}h710`}/>
 </g>
 {[0,1,2,3].map(i=>{const y=top+70+i*72;return <g key={i} data-build={`fits.layer.${i}`}>
   <path d={`M125 ${y+45}h755l24 -13M125 ${y+45}v-15M880 ${y+45}v-15`} fill="none" stroke={drawingProcess} strokeWidth={3}/>
   <Label text={words[3+i*3]} x={145} y={y} anchor="start" strong width={350}/>
   <Label text={words[4+i*3]} x={505} y={y} anchor="start" width={380}/>
 </g>;})}
 <g data-build="fits.agent">
  <Label text={words[2]} x={1440} y={top+24} width={720} strong/>
  <ellipse cx={1440} cy={top+198} rx={268} ry={90} fill="none" stroke={drawingRule} strokeWidth={3} strokeDasharray="8 10"/>
  <path d={`M1405 ${top+173}l35-20 35 20v49l-35 20-35-20z`} fill={drawingPaper} stroke={drawingInk} strokeWidth={3}/>
  <circle cx={1428} cy={top+194} r={4} fill={drawingProcess}/><circle cx={1452} cy={top+194} r={4} fill={drawingProcess}/>
  <Ink d={`M1425 ${top+214}h30`}/>
 </g>
 {ports.map((p,i)=><g key={i}>
  <Ink id={`fits.connection.${i}`} d={`M${i%2?1475:1405} ${top+198}L${p.x} ${p.y}`}/>
  <g data-build={`fits.control.${i}`}>
   <circle cx={p.x} cy={p.y} r={22} fill={drawingPaper} stroke={drawingInk} strokeWidth={3}/>
   {i===0 && <path d={`M${p.x-10} ${p.y-9}v18M${p.x+10} ${p.y-9}v18M${p.x-10} ${p.y}h20`} stroke={drawingProcess} strokeWidth={3}/>}
   {i===1 && <g fill="none" stroke={drawingProcess} strokeWidth={2.5}><circle cx={p.x-6} cy={p.y} r={6}/><path d={`M${p.x} ${p.y}h13v6M${p.x+7} ${p.y}v5`}/></g>}
   {i===2 && <g fill="none" stroke={drawingProcess} strokeWidth={2.5}><circle cx={p.x} cy={p.y-7} r={5}/><path d={`M${p.x-10} ${p.y+11}v-5q10-10 20 0v5`}/></g>}
   {i===3 && <path d={`M${p.x-9} ${p.y-12}h18v24h-18zM${p.x-5} ${p.y-5}h10M${p.x-5} ${p.y+1}h10M${p.x-5} ${p.y+7}h10`} fill="none" stroke={drawingProcess} strokeWidth={2}/>}

   <Label text={words[5+i*3]} x={p.x} y={i<2?top+48:top+329} width={320}/>
  </g>
 </g>)}
 <g data-build="fits.conclusion"><Label text={words[15]} x={960} y={top+414} width={1700} strong/></g>
 </Part>;}
export function FitsHtml(){return <Layer id="fits.html"><StoryOf picture="fits"/></Layer>;}
