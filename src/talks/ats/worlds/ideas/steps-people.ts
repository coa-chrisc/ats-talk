/** Staff practice produces requirements before the product comparison begins. */
import { draw, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./moves";
export const people=picture("people",{play:play(
 into("people"),
 {moves:[story("people",0),story("people",1)]},
 {moves:[show("people.stage.0",{at:0,duration:0.4}),draw("people.link.0",{at:0.45,duration:0.45}),show("people.stage.1",{at:0.9,duration:0.4}),draw("people.link.1",{at:1.4,duration:0.45}),show("people.stage.2",{at:1.85,duration:0.4}),draw(["people.requirement.0","people.requirement.1","people.requirement.2"],{at:2.25,duration:0.25,stagger:0.15}),draw("people.link.2",{at:2.9,duration:0.45}),show("people.stage.3",{at:3.35,duration:0.4}),draw("people.selection",{at:3.8,duration:0.65}),show("people.foundation",{at:4.6,duration:0.4}),show("people.example",{at:5.1,duration:0.4})]},
)});
