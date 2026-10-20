/**
 * The stands world's stage: Part 4, slides 11 to 15, on one plane the size
 * of the stage, never moved by a camera. Each slide's title sits in the
 * deck's place, and each slide's picture is two parts, its marks and its
 * HTML, so it goes in one move when the next slide arrives. Where things go
 * and what they say is in the layout modules, how they move in the steps
 * modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { CommunityHtml, CommunityMarks } from "./scene-community";
import { ControlHtml, ControlMarks } from "./scene-control";
import { ExistsHtml, ExistsMarks } from "./scene-exists";
import { FitsHtml, FitsMarks } from "./scene-fits";
import { FleetHtml, FleetMarks } from "./scene-fleet";
import { InfrastructureHtml, InfrastructureMarks } from "./scene-infrastructure";
import { NoticedHtml, NoticedMarks } from "./scene-noticed";
import { TrackHtml, TrackMarks } from "./scene-track";
import "./stands.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <TrackMarks />
          <ControlMarks />
          <ExistsMarks />
          <NoticedMarks />
          <CommunityMarks />
          <InfrastructureMarks />
          <FitsMarks />
          <FleetMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <TrackHtml />
      <ControlHtml />
      <ExistsHtml />
      <NoticedHtml />
      <CommunityHtml />
      <InfrastructureHtml />
      <FitsHtml />
      <FleetHtml />
    </Plane>
  );
}
