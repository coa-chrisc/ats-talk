/** Establish the infrastructure, then draw the boundaries each agent still needs. */
import { draw, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./moves";
export const fits=()=>picture("fits",{play:play([
 into("fits"),
 {moves:[story("fits",0),story("fits",1)]},
 {moves:[show("fits.foundation",{at:0,duration:0.4}),...[0,1,2,3].flatMap(i=>show(`fits.layer.${i}`,{at:0.45+i*0.45,duration:0.35})),show("fits.agent",{at:2.25,duration:0.4}),...[0,1,2,3].flatMap(i=>[...draw(`fits.connection.${i}`,{at:2.8+i*0.5,duration:0.35}),...show(`fits.control.${i}`,{at:3.05+i*0.5,duration:0.3})]),show("fits.conclusion",{at:5.15,duration:0.4})]},
])});
