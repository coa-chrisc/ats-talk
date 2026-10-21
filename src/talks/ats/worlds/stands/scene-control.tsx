"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as L, Ink, Sketch } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const w=shown("control","play");
const t=contentTop("control");
export function ControlMarks(){return <Part id="control.marks">
<g data-build="control.need"><Sketch kind="person" x={205} y={t+165}/><L text={w[0]} x={205} y={t+264} strong/><L text={w[1]} x={205} y={t+304} width={320}/></g>
<Ink id="control.fork" d={`M280 ${t+165}H410Q450 ${t+165} 470 ${t+100}T560 ${t+62}H695M410 ${t+165}Q450 ${t+165} 470 ${t+230}T560 ${t+280}H695`}/>
<g data-build="control.approved"><Sketch kind="tools" x={770} y={t+62}/><L text={w[2]} x={960} y={t+28} width={520} strong/><L text={w[3]} x={960} y={t+124} width={520}/></g>
<Ink id="control.use" d={`M1240 ${t+62}h125m-13-10l13 10-13 10`}/>
<g data-build="control.visibility"><Sketch kind="eye" x={1570} y={t+62}/><L text={w[8]} x={1570} y={t+124} strong/><L text={w[9]} x={1570} y={t+162} width={400}/></g>
<g data-build="control.request"><Sketch kind="document" x={770} y={t+280}/><L text={w[4]} x={960} y={t+247} width={520} strong/><L text={w[5]} x={960} y={t+342} width={520}/></g>
<Ink id="control.review-path" d={`M1240 ${t+280}h125m-13-10l13 10-13 10`}/>
<g data-build="control.review"><Sketch kind="magnify" x={1570} y={t+280}/><L text={w[6]} x={1570} y={t+342} width={460} strong/><L text={w[7]} x={1570} y={t+380} width={460}/></g>
</Part>;}
export function ControlHtml(){return <Layer id="control.html"><StoryOf picture="control"/></Layer>;}
