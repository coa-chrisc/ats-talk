"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as L, Ink, Sketch, drawingProcess, drawingRule } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const w=shown("track","play");
const t=contentTop("track");
export function TrackMarks(){return <Part id="track.marks">
<g data-build="track.policy"><L text={w[0]} x={290} y={t+25} strong/><path d={`M150 ${t+62}h265v230H150q-38-20 0-40V${t+62}q-35-25 0-25h265v25M150 ${t+252}h265`} fill="none" stroke={drawingProcess} strokeWidth={3}/><Sketch kind="checklist" x={285} y={t+143}/><L text={w[1]} x={290} y={t+332} width={450} strong/><L text={w[2]} x={290} y={t+370} width={450}/></g>
<g data-build="track.plan"><L text={w[3]} x={1175} y={t+25} strong/><Ink d={`M590 ${t+305}h1230M625 ${t+317}h1160`}/><path d={`M660 ${t+275}V${t+93}h1090v182`} fill="none" stroke={drawingRule} strokeWidth={3} strokeDasharray="9 12"/></g>
{[0,1,2].map((i)=><g key={i} data-build={`track.structure.${i}`}><Sketch kind={['compass','team','budget'][i]} x={795+i*420} y={t+152}/><path d={`M${715+i*420} ${t+220}v70h160v-70`} fill="none" stroke={drawingRule} strokeWidth={3} strokeDasharray="8 10"/><L text={w[4+i*2]} x={795+i*420} y={t+250} width={390} strong/><L text={w[5+i*2]} x={795+i*420} y={t+355} width={390}/></g>)}
</Part>;}
export function TrackHtml(){return <Layer id="track.html"><StoryOf picture="track"/></Layer>;}
