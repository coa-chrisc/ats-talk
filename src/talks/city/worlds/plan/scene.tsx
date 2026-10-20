/**
 * The plan world's stage: one plane the size of the stage, never moved by a
 * camera. Every slide's title sits in the same place; each slide's picture
 * is two parts, its marks and its HTML (its story lines among them), so it
 * goes in one move when the next slide arrives. Each slide's drawing is in
 * its own scene module; where things go and what they say is in the layout
 * modules, how they move in the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { NorthStarHtml, NorthStarMarks, PeopleHtml, PeopleMarks } from "./scene-goals";
import { KnowledgeHtml, KnowledgeMarks } from "./scene-knowledge";
import { LiftHtml, LiftMarks } from "./scene-lift-developers";
import { ProgramTeamHtml, ProgramTeamMarks } from "./scene-program-team";
import { BuiltHtml, BuiltMarks, ReadinessHtml, ReadinessMarks } from "./scene-readiness";
import { ServiceHtml, ServiceMarks } from "./scene-residents";
import { RoadmapHtml, RoadmapMarks } from "./scene-roadmap";
import "../../../bchc/worlds/start/start.css";
import "./plan.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <NorthStarMarks />
          <PeopleMarks />
          <ProgramTeamMarks />
          <LiftMarks />
          <RoadmapMarks />
          <KnowledgeMarks />
          <ReadinessMarks />
          <BuiltMarks />
          <ServiceMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <NorthStarHtml />
      <PeopleHtml />
      <ProgramTeamHtml />
      <LiftHtml />
      <RoadmapHtml />
      <KnowledgeHtml />
      <ReadinessHtml />
      <BuiltHtml />
      <ServiceHtml />
    </Plane>
  );
}
