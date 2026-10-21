/** A slide-specific visual narrative; shared sequencing keeps reading separate. */
import { draw, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./moves";
export const outcomes=picture("outcomes",{play:play(into("outcomes"),
 {moves:[story("outcomes",0),story("outcomes",1)]},
 {moves:[
 show("outcomes.project",{at:0,duration:0.35}),
 show("outcomes.measure",{at:0.5,duration:0.35}),
 draw("outcomes.ruler",{at:1,duration:0.7}),
 show("outcomes.baseline",{at:1.8,duration:0.35}),
 show("outcomes.target",{at:2.4,duration:0.35}),
 show("outcomes.check.0",{at:3.0,duration:0.35}),
 show("outcomes.check.1",{at:3.6,duration:0.35}),
 show("outcomes.check.2",{at:4.2,duration:0.35})
 ]})});
