/**
 * The ready world's stage: one plane the size of the stage, never moved by a
 * camera. The white slides' titles sit in the same place; each white slide's
 * picture is two parts, its marks and its HTML, so it goes in one move when
 * the next slide arrives. The close is HTML only, on navy. Where things go
 * and what they say is in the layout modules, how they move in the steps
 * modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { CloseHtml } from "./scene-close";
import { AppliedHtml, AppliedMarks } from "./scene-applied";
import { CouldBeHtml, CouldBeMarks } from "./scene-could-be";
import { LevelsHtml, LevelsMarks } from "./scene-levels";
import { ResidentsHtml, ResidentsMarks } from "./scene-residents";
import { WhoDecidesHtml, WhoDecidesMarks } from "./scene-who-decides";
import "./ready.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <LevelsMarks />
          <WhoDecidesMarks />
          <ResidentsMarks />
          <CouldBeMarks />
          <AppliedMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <LevelsHtml />
      <WhoDecidesHtml />
      <ResidentsHtml />
      <CouldBeHtml />
      <AppliedHtml />
      <CloseHtml />
    </Plane>
  );
}
