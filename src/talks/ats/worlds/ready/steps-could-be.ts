/** A slide-specific visual narrative; shared sequencing keeps reading separate. */
import { draw, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
export const couldBe=picture("could-be",{play:play(into("could-be"),
 {moves:[story("could-be",0),story("could-be",1)]},
 {moves:[
 show("could-be.action.0",{at:0.0,duration:0.35}),
 draw("could-be.link.0",{at:0.4,duration:0.4}),
 show("could-be.action.1",{at:0.85,duration:0.35}),
 draw("could-be.link.1",{at:1.25,duration:0.4}),
 show("could-be.action.2",{at:1.7,duration:0.35}),
 draw("could-be.link.2",{at:2.1,duration:0.4}),
 show("could-be.action.3",{at:2.55,duration:0.35}),
 draw("could-be.link.3",{at:2.9499999999999997,duration:0.4}),
 show("could-be.action.4",{at:3.4,duration:0.35}),
 draw("could-be.link.4",{at:3.8,duration:0.4}),
 show("could-be.action.5",{at:4.25,duration:0.35}),
 draw("could-be.underline",{at:4.9,duration:0.7})
 ]})});
