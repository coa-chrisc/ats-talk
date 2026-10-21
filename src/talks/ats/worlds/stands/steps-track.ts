/** A slide-specific visual narrative; shared sequencing keeps reading separate. */
import { show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./moves";
export const track=() => picture("track",{play:play([into("track"),
 {moves:[story("track",0),story("track",1)]},
 {moves:[
 show("track.policy",{at:0,duration:0.35}),
 show("track.plan",{at:0.6,duration:0.35}),
 show("track.structure.0",{at:1.2,duration:0.35}),
 show("track.structure.1",{at:1.85,duration:0.35}),
 show("track.structure.2",{at:2.5,duration:0.35})
 ]}])});
