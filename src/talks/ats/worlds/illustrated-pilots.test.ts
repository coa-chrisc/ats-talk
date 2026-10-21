import { describe, expect, it } from "vitest";
import { startOf as peopleStart, endOf as peopleEnd, markup as peopleMarkup } from "./ideas/harness";
import { startOf as fitsStart, endOf as fitsEnd, markup as fitsMarkup } from "./stands/harness";
describe("illustrated pilot choreography",()=>{
 it("finishes each staff-learning stage before proceeding to the next",()=>{
  for(let i=0;i<3;i++){
   expect(peopleStart("people.play",`people.link.${i}`)).toBeGreaterThanOrEqual(peopleEnd("people.play",`people.stage.${i}`));
   expect(peopleStart("people.play",`people.stage.${i+1}`)).toBeGreaterThanOrEqual(peopleEnd("people.play",`people.link.${i}`));
  }
  expect(peopleStart("people.play","people.link.2")).toBeGreaterThanOrEqual(peopleEnd("people.play","people.requirement.2"));
  expect(peopleStart("people.play","people.example")).toBeGreaterThanOrEqual(peopleEnd("people.play","people.selection"));
 });
 it("establishes infrastructure before illustrating the additional agent controls",()=>{
  expect(fitsStart("fits.play","fits.agent")).toBeGreaterThanOrEqual(fitsEnd("fits.play","fits.layer.3"));
  expect(fitsStart("fits.play","fits.connection.0")).toBeGreaterThanOrEqual(fitsEnd("fits.play","fits.agent"));
  expect(fitsStart("fits.play","fits.conclusion")).toBeGreaterThanOrEqual(fitsEnd("fits.play","fits.control.3"));
 });
 it("uses the slide-specific illustrations, with no generic panels",()=>{
  expect(peopleMarkup).not.toContain('data-build="people.panel.');
  expect(fitsMarkup).not.toContain('data-build="fits.panel.');
  expect(peopleMarkup).toContain('data-build="people.selection"');
  expect(fitsMarkup).toContain('stroke-dasharray="8 10"');
 });
});

it("stops the deletion request before showing the protected record",()=>{
 expect(peopleStart("enforce.play","enforce.packet")).toBeGreaterThanOrEqual(peopleStart("enforce.play","enforce.barrier"));
 expect(peopleStart("enforce.play","enforce.record")).toBeGreaterThanOrEqual(peopleEnd("enforce.play","enforce.packet"));
 expect(peopleMarkup).not.toContain('data-build="enforce.panel.');
});
it("shows current policy before the missing program structure",()=>{
 expect(fitsStart("track.play","track.plan")).toBeGreaterThanOrEqual(fitsEnd("track.play","track.policy"));
 for(let i=1;i<3;i++) expect(fitsStart("track.play",`track.structure.${i}`)).toBeGreaterThanOrEqual(fitsEnd("track.play",`track.structure.${i-1}`));
});
it("builds capabilities before prerequisites for expansion",()=>{
 expect(fitsStart("fleet.play","fleet.join")).toBeGreaterThanOrEqual(fitsEnd("fleet.play","fleet.capability.2"));
 expect(fitsStart("fleet.play","fleet.readiness.0")).toBeGreaterThanOrEqual(fitsEnd("fleet.play","fleet.runway"));
 expect(fitsStart("fleet.play","fleet.portfolio")).toBeGreaterThanOrEqual(fitsEnd("fleet.play","fleet.readiness.2"));
});
