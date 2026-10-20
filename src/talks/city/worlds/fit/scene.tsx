/**
 * Part 4's stage: one plane the size of the stage, never moved by a camera.
 * The two white slides' titles sit in the same place; each white slide's
 * picture is two parts, its marks and its HTML, so it goes in one move when
 * the next slide arrives. The close is HTML only. Where things go and what
 * they say is in the layout modules, how they move in the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { CloseHtml } from "./scene-close";
import { FitHtml, FitMarks } from "./scene-fit";
import { WorkHtml, WorkMarks } from "./scene-work";
import "./fit.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <WorkMarks />
          <FitMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <WorkHtml />
      <FitHtml />
      <CloseHtml />
    </Plane>
  );
}
