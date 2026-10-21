/** One finite stream: increasing output, pre-completion exceptions, post-completion audit. */
import type { StepDef } from "@/components/deck/engine";
import { draw, fill, mark, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { REVIEW as R, WORK, AUDIT_AT } from "./layout-review";
import { into, play } from "./moves";
export const review = (): StepDef[] => picture("review", {
  play: play([
    { ...into("review"), moves: [...into("review").moves, ...show(R.forecast.key, { at: 0.3, duration: 0.35 })] },
    { moves: [story("review", 0), story("review", 1),
      show(R.stage, {at:0,duration:0.4}),
      ...[0,1,2].flatMap(i => [...show(`review.agent.${i}`, {at:0,duration:0.4}), ...fill(`review.agent.${i}`, {at:0,duration:0.4})]),
      draw("review.human", {at:0,duration:0.4}), mark(R.person, {at:0,duration:0.4}),
      ...WORK.flatMap(item => [
        ...to(item.key, {autoAlpha:1,x:item.origin.x,y:item.origin.y}, {autoAlpha:0,x:item.origin.x,y:item.origin.y}, {at:item.start,duration:0.1}),
        ...to(item.key, {x:812,y:640}, undefined, {at:item.start+0.1,duration:0.9,ease:"none"}),
        ...to(item.key, {x:item.exception >= 0 ? 812 : item.completed.x,y:item.exception >= 0 ? 800 : item.completed.y}, undefined, {at:item.start+1.1,duration:0.8,ease:"none"}),
        ...(item.exception >= 0 ? to(item.key, {x:item.end.x,y:item.end.y}, undefined, {at:item.start+1.9,duration:0.4,ease:"power1.out"}) : []),
        ...(item.sample >= 0 ? [
          ...to(item.key, {x:item.completed.x,y:800}, undefined, {at:AUDIT_AT+item.sample*0.4,duration:0.5,ease:"power1.inOut"}),
          ...to(item.key, {x:item.end.x,y:item.end.y}, undefined, {at:AUDIT_AT+item.sample*0.4+0.5,duration:0.7,ease:"power1.out"}),
        ] : []),
      ]),
      show(R.audit, {at:AUDIT_AT-0.3,duration:0.3}),
    ] },
  ]),
});
