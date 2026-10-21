"use client";
import { Part } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { DrawingLabel as Label, Ink } from "../story-drawing";
import { contentTop } from "./layout";
import { Layer, StoryOf } from "./parts";
const words=shown("people","play");
const top=contentTop("people");
const centers=[285,720,1150,1585];
function Colleague({x,y}:{x:number;y:number}) {return <g fill="none" stroke="var(--dk-process)" strokeWidth={4}><circle cx={x} cy={y} r={14}/><path d={`M${x-25} ${y+65}v-28q25 -24 50 0v28`}/></g>;}
export function PeopleMarks() {return <Part id="people.marks">
 {centers.map((x,i)=><g key={i} data-build={`people.stage.${i}`}>
  <Label text={words[i*2]} x={x} y={top+220} strong size={28}/>
  <Label text={words[i*2+1]} x={x} y={top+258} width={390}/>
  {i===0 && <g>
   <Colleague x={x-74} y={top+36}/><Colleague x={x} y={top+22}/><Colleague x={x+74} y={top+36}/>
   <Ink d={`M${x-140} ${top+118}h280M${x-110} ${top+118}v58M${x+110} ${top+118}v58`}/>
   <path d={`M${x-30} ${top+83}h60l15 26h-90z`} fill="var(--dk-night)" stroke="var(--dk-paper)" strokeWidth={3}/>
  </g>}
  {i===1 && <g>
   <Colleague x={x-70} y={top+38}/>
   <Ink d={`M${x-9} ${top+40}h126v88H${x-9}zM${x-30} ${top+148}h170M${x+54} ${top+128}v20`}/>
   <Ink d={`M${x+19} ${top+62}h69v45H${x+19}zM${x+31} ${top+75}h43M${x+31} ${top+86}h32M${x+31} ${top+97}h38`}/>
  </g>}
  {i===2 && <g>
   <path d={`M${x-67} ${top+16}h104l30 30v130H${x-67}zM${x+37} ${top+16}v30h30`} fill="var(--dk-night)" stroke="var(--dk-paper)" strokeWidth={3}/>
   {[0,1,2].map(j=><Ink key={j} d={`M${x-14} ${top+65+j*37}h53`}/>)}
  </g>}
  {i===3 && <g>
   {[-69,69].map((dx,j)=><g key={dx} fill="none" stroke={j?"var(--dk-process)":"var(--dk-rule)"} strokeWidth={3}>
    <path d={`M${x+dx-45} ${top+52}l45 -24 45 24v82l-45 24-45-24zM${x+dx-45} ${top+52}l45 24 45-24M${x+dx} ${top+76}v82`}/>
   </g>)}
  </g>}
 </g>)}
 {[0,1,2].map(i=><Ink key={i} id={`people.link.${i}`} d={`M${centers[i]+155} ${top+105}h110m-12 -9l12 9-12 9`}/>)}
 {[0,1,2].map(i=><Ink key={i} id={`people.requirement.${i}`} d={`M1110 ${top+62+i*37}l8 8 15-18`}/>)}
 <Ink id="people.selection" d={`M1677 ${top+16}C1770 ${top+31} 1771 ${top+168} 1673 ${top+188}C1574 ${top+203} 1552 ${top+34} 1644 ${top+16}`}/>
 <g data-build="people.foundation">
  <Ink d={`M96 ${top+318}h1030`}/>
  <Label text={words[8]} x={96} y={top+349} anchor="start" strong width={1030}/>
  <Label text={words[9]} x={96} y={top+383} anchor="start" width={1100}/>
 </g>
 <g data-build="people.example">
  <path d={`M1210 ${top+326}v80`} stroke="var(--dk-catalog)" strokeWidth={5}/>
  <Label text={words[10]} x={1235} y={top+349} anchor="start" strong width={580}/>
  <Label text={words[11]} x={1235} y={top+383} anchor="start" width={580}/>
 </g>
 </Part>;}
export function PeopleHtml(){return <Layer id="people.html"><StoryOf picture="people"/></Layer>;}
