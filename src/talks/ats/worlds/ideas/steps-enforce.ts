/** A slide-specific visual narrative; shared sequencing keeps reading separate. */
import { EASE, draw, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./moves";
export const enforce=picture("enforce",{play:play(into("enforce"),
 {moves:[story("enforce",0),story("enforce",1)]},
 {moves:[
 show("enforce.request",{at:0,duration:0.35}),
 draw("enforce.approach",{at:0.4,duration:0.5}),
 show("enforce.barrier",{at:0.9,duration:0.35}),
 show("enforce.packet",{at:0.95,duration:0.35}),
 to("enforce.packet",{x:395},{x:0},{at:1.3,duration:1.1,ease:EASE.out}),
 show("enforce.record",{at:2.5,duration:0.35}),
 show("enforce.approval",{at:3.1,duration:0.35}),
 show("enforce.log",{at:3.7,duration:0.35})
 ]})});
