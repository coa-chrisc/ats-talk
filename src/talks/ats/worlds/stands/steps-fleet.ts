/** A slide-specific visual narrative; shared sequencing keeps reading separate. */
import { draw, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./moves";
export const fleet=() => picture("fleet",{play:play([into("fleet"),
 {moves:[story("fleet",0),story("fleet",1)]},
 {moves:[
 show("fleet.heading",{at:0,duration:0.35}),
 show("fleet.capability.0",{at:0.4,duration:0.35}),
 show("fleet.capability.1",{at:0.9,duration:0.35}),
 show("fleet.capability.2",{at:1.4,duration:0.35}),
 draw("fleet.join",{at:1.95,duration:0.6}),
 draw("fleet.runway",{at:2.6,duration:0.6}),
 show("fleet.readiness.0",{at:3.25,duration:0.35}),
 show("fleet.readiness.1",{at:3.85,duration:0.35}),
 show("fleet.readiness.2",{at:4.45,duration:0.35}),
 show("fleet.portfolio",{at:5,duration:0.35})
 ]}])});
