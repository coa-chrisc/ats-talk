/** A slide-specific visual narrative; shared sequencing keeps reading separate. */
import { draw, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./moves";
export const levelUp=picture("level-up",{play:play(into("level-up"),
 {moves:[story("level-up",0),story("level-up",1)]},
 {moves:[
 show("level-up.role.0",{at:0.0,duration:0.35}),
 show("level-up.role.1",{at:0.5,duration:0.35}),
 show("level-up.role.2",{at:1.0,duration:0.35}),
 show("level-up.practice",{at:1.65,duration:0.35}),
 show("level-up.practice.0",{at:2.1,duration:0.35}),
 draw("level-up.arc.0",{at:2.5,duration:0.35}),
 show("level-up.practice.1",{at:2.85,duration:0.35}),
 draw("level-up.arc.1",{at:3.25,duration:0.35}),
 show("level-up.practice.2",{at:3.6,duration:0.35}),
 draw("level-up.arc.2",{at:4.0,duration:0.35}),
 show("level-up.practice.3",{at:4.35,duration:0.35}),
 draw("level-up.arc.3",{at:4.75,duration:0.35})
 ]})});
