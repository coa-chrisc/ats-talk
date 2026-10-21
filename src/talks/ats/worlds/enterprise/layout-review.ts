/** Illustrative work stream: exceptions branch before completion; audit follows completion. */
import { box } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { layerOf, contentTop } from "./layout";
const [source, forecast, scope, agents, checks, methods, completed, exceptions, before, samples, after, oversight, illustrative] = shown("review", "play");
export const TOP = contentTop("review");
const EXCEPTIONS = [8, 23, 38];
const SAMPLES = [12, 27, 40];
export const WORK = Array.from({length: 42}, (_, i) => {
  const exception = EXCEPTIONS.indexOf(i);
  const sample = SAMPLES.indexOf(i);
  return { key: `review.item.${i}`, index: i, exception, sample,
    // First a trickle, then a sustained stream at shorter intervals.
    start: i < 3 ? 0.8 + i * 0.7 : 2.9 + (i - 3) * 0.12,
    origin: {x: 280, y: 594 + (i % 3) * 48},
    completed: {x: 1240 + (i % 10) * 48, y: 596 + Math.floor(i / 10) * 34},
    end: exception >= 0 ? {x: 745 + exception * 48, y: 850} : sample >= 0 ? {x: 1270 + sample * 48, y: 850} : {x: 1240 + (i % 10) * 48, y: 596 + Math.floor(i / 10) * 34},
  };
});
export const AUDIT_AT = 10.1;
export const REVIEW = {
  ...layerOf("review"),
  forecast: { key: "review.context", at: box(1370, 146, 454, 196), source, forecast, scope },
  stage: "review.stage", audit: "review.audit", person: "review.person",
  // Bounds for the four stationary groups, used by layout verification.
  cards: [
    {at: box(96, TOP, 260, 220)}, {at: box(650, TOP, 360, 220)},
    {at: box(1180, TOP, 644, 220)}, {at: box(650, 790, 1174, 202)},
  ],
  labels: {agents, checks, methods, completed, exceptions, before, samples, after, oversight, illustrative},
};
