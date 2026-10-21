/** A slide-specific visual narrative; shared sequencing keeps reading separate. */
import { draw, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./moves";
export const control=() => picture("control",{play:play([into("control"),
 {moves:[story("control",0),story("control",1)]},
 {moves:[
 show("control.need",{at:0,duration:0.35}),
 draw("control.fork",{at:0.45,duration:0.7}),
 show("control.approved",{at:1.2,duration:0.35}),
 draw("control.use",{at:1.65,duration:0.5}),
 show("control.visibility",{at:2.2,duration:0.35}),
 show("control.request",{at:2.8,duration:0.35}),
 draw("control.review-path",{at:3.25,duration:0.5}),
 show("control.review",{at:3.8,duration:0.35})
 ]}])});
