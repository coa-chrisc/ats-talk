"use client";
import { wrapLabel } from "./drawing-text";
export const drawingInk = "var(--dk-paper)";
export const drawingPaper = "var(--dk-night)";
export const drawingProcess = "var(--dk-process)";
export const drawingRule = "var(--dk-rule)";
/** Typesetting only: each slide owns its composition and choreography. */
export function DrawingLabel({text,x,y,width=380,strong=false,size=26,anchor="middle"}:{text:string;x:number;y:number;width?:number;strong?:boolean;size?:number;anchor?:"middle"|"start"}) {
 const lines=wrapLabel(text,width,size);
 return <text x={x} y={y} textAnchor={anchor} fill="var(--dk-paper)" fontSize={size} fontWeight={strong?650:400}>{lines.map((s,i)=><tspan key={i} x={x} dy={i?31:0}>{s}{i<lines.length-1?" ":""}</tspan>)}</text>;
}
export function Ink({d,id,dashed=false}:{d:string;id?:string;dashed?:boolean}) {
 return <path d={d} data-build={id} className={id?"dk-draw":undefined} pathLength={id?1:undefined} fill="none" stroke="var(--dk-paper)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed?"8 9":undefined}/>;
}

/** Small line illustrations, composed differently by each slide. */
export function Sketch({kind,x,y,scale=1}:{kind:string;x:number;y:number;scale?:number}) {
 const paths:Record<string,string>={
  person:"M-12-22a12 12 0 1 0 24 0a12 12 0 1 0-24 0M-28 35V8q28-24 56 0v27",
  team:"M-10-24a10 10 0 1 0 20 0a10 10 0 1 0-20 0M-22 26V0q22-18 44 0v26M-41-13a8 8 0 1 0 16 0a8 8 0 1 0-16 0M-49 32V10q12-12 24 0M25-13a8 8 0 1 0 16 0a8 8 0 1 0-16 0M25 10q12-12 24 0v22",
  document:"M-29-40h40l18 18v62h-58zM11-40v18h18M-17-9h34M-17 5h34M-17 19h25",
  server:"M-40-38h80v25h-80zM-40-1h80v25h-80zM-40 36h80M-28-25h3M-28 12h3M-10-25h35M-10 12h35",
  key:"M-10 0a20 20 0 1 0-40 0a20 20 0 1 0 40 0M-10 0h60v18M30 0v12",
  budget:"M-35-24q35-20 70 0q-35 20-70 0v55q35 20 70 0v-55M-35-4q35 20 70 0M-35 14q35 20 70 0",
  compass:"M0-42a42 42 0 1 0 1 0M-15 16L-5-11 18-21 6 7z",
  magnify:"M-4-32a28 28 0 1 0 1 0M17 18l30 30",
  checklist:"M-30-42h60v84h-60zM-20-21l5 5 10-12M3-21h17M-20 0l5 5 10-12M3 0h17M-20 21l5 5 10-12M3 21h17",
  eye:"M-48 0Q0-48 48 0Q0 48-48 0M-15 0a15 15 0 1 0 30 0a15 15 0 1 0-30 0",
  gate:"M-34 40v-80M34 40v-80M-34-20h68M-34 18h68M-14-20v38M14-20v38",
  calendar:"M-36-31h72v67h-72zM-36-12h72M-20-42v22M20-42v22M-19 3h8M9 3h8M-19 20h8M9 20h8",
  agent:"M-32-24L0-42 32-24v48L0 42-32 24zM-14-7h5M9-7h5M-14 14h28",
  tools:"M-35 26l55-55M-25-30l55 55M-35-33l13 2 5 13M18 18l15 4 4 13",
 };
 return <g transform={`translate(${x} ${y}) scale(${scale})`}><Ink d={paths[kind]??paths.document}/></g>;
}
