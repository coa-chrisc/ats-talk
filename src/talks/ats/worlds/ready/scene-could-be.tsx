"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as L, Ink, Sketch } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const w=shown("could-be","play");
const t=contentTop("could-be");
export function CouldBeMarks(){return <Part id="could-be.marks">
{[0,1,2,3,4,5].map(i=><g key={i} data-build={`could-be.action.${i}`}><Sketch kind={['team','calendar','gate','server','key','budget'][i]} x={240+i*286} y={t+57}/><L text={w[i*2]} x={240+i*286} y={t+153} width={262} strong/><L text={w[i*2+1]} x={240+i*286} y={t+258} width={262}/></g>)}
{[0,1,2,3,4].map(i=><Ink key={i} id={`could-be.link.${i}`} d={`M${305+i*286} ${t+57}h150m-12-9l12 9-12 9`}/>)}
<Ink id="could-be.underline" d={`M120 ${t+402}h1660`}/>
</Part>;}
export function CouldBeHtml(){return <Layer id="could-be.html"><StoryOf picture="could-be"/></Layer>;}
