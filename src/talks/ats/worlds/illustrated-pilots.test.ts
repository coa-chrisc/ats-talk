import { describe, expect, it } from "vitest";
import { startOf as peopleStart, endOf as peopleEnd, markup as peopleMarkup } from "./ideas/harness";
import { startOf as fitsStart, endOf as fitsEnd, markup as fitsMarkup, playsAt } from "./stands/harness";
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
  expect(fitsMarkup).toContain('class="sn-fits__boundary" data-build="fits.boundary"');
 });
});

it("stops the deletion request at the drawn gate before saying the record stays intact",()=>{
 const gate=peopleEnd("enforce.play","enforce.gate"), card=peopleEnd("enforce.play","enforce.card.0");
 expect(Number.isFinite(gate)&&Number.isFinite(card)).toBe(true);
 expect(peopleStart("enforce.play","enforce.card.0")).toBeGreaterThanOrEqual(gate);
 expect(peopleStart("enforce.play","enforce.record.words")).toBeGreaterThanOrEqual(peopleEnd("enforce.play","enforce.card.0.stamp"));
 expect(peopleMarkup).not.toContain('data-build="enforce.panel.');
});
it("shows current policy before the missing program structure",()=>{
 expect(playsAt("track.play").filter(p=>p.key==="track.policy")).toHaveLength(1);
 expect(fitsStart("track.play","track.gaps")).toBeGreaterThanOrEqual(fitsEnd("track.play","track.policy"));
 expect(fitsStart("track.play","track.plate.0")).toBeGreaterThanOrEqual(fitsStart("track.play","track.gaps"));
 for(let i=1;i<3;i++) expect(fitsStart("track.play",`track.plate.${i}`)).toBeGreaterThan(fitsStart("track.play",`track.plate.${i-1}`));
});
it("builds capabilities before prerequisites for expansion",()=>{
 for(const key of ["fleet.staff.2","fleet.yard","fleet.agent.2","fleet.mark","fleet.rule","fleet.gate.2","fleet.portfolio"]) expect(playsAt("fleet.play").some(p=>p.key===key),key).toBe(true);
 expect(fitsStart("fleet.play","fleet.rule")).toBeGreaterThanOrEqual(fitsStart("fleet.play","fleet.mark"));
 expect(fitsStart("fleet.play","fleet.gate.0")).toBeGreaterThanOrEqual(fitsEnd("fleet.play","fleet.rule"));
 for(let i=1;i<3;i++) expect(fitsStart("fleet.play",`fleet.gate.${i}`)).toBeGreaterThanOrEqual(fitsEnd("fleet.play",`fleet.gate.${i-1}`));
 expect(fitsStart("fleet.play","fleet.portfolio")).toBeGreaterThanOrEqual(fitsEnd("fleet.play","fleet.gate.2.caption"));
});
