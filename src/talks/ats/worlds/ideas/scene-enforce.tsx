"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as L, Ink, Sketch, drawingProcess } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const w=shown("enforce","play");
const t=contentTop("enforce");
export function EnforceMarks(){return <Part id="enforce.marks">
<g data-build="enforce.request"><Sketch kind="agent" x={180} y={t+83}/><L text={w[0]} x={300} y={t+175} strong/><L text={w[1]} x={300} y={t+211}/></g>
<Ink id="enforce.approach" d={`M235 ${t+83}h440`}/>
<g data-build="enforce.packet"><Sketch kind="document" x={300} y={t+83} scale={0.65}/></g>
<g data-build="enforce.barrier"><path d={`M745 ${t+12}v140M767 ${t+12}v140M726 ${t+25}h60M726 ${t+138}h60`} fill="none" stroke={drawingProcess} strokeWidth={5}/><L text={w[2]} x={755} y={t+175} strong/><L text={w[3]} x={755} y={t+211}/></g>
<g data-build="enforce.record"><Sketch kind="document" x={1290} y={t+83} scale={1.5}/><L text={w[4]} x={985} y={t+93} strong width={240}/><L text={w[5]} x={1290} y={t+211}/></g>
<g data-build="enforce.approval"><Sketch kind="person" x={155} y={t+315}/><L text={w[6]} x={230} y={t+302} width={680} anchor="start" strong/><L text={w[7]} x={230} y={t+343} width={680} anchor="start"/></g>
<g data-build="enforce.log"><Sketch kind="checklist" x={1060} y={t+315}/><L text={w[8]} x={1140} y={t+302} width={670} anchor="start" strong/><L text={w[9]} x={1140} y={t+343} width={670} anchor="start"/></g>
</Part>;}
export function EnforceHtml(){return <Layer id="enforce.html"><StoryOf picture="enforce"/></Layer>;}
