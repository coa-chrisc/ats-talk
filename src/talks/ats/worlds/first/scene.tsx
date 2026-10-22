/**
 * The first world's stage: one plane the size of the stage, never moved by
 * a camera. Every slide's title sits in the same place; each slide's
 * picture is two parts, its marks and its HTML, so it goes in one move when
 * the next slide arrives. Each slide's drawing is in its own scene module;
 * where things go and what they say is in the layout modules, how they move
 * in the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { BudgetHtml, BudgetMarks } from "./scene-budget";
import { ConsortiumHtml, ConsortiumMarks } from "./scene-consortium";
import { LanesHtml, LanesMarks } from "./scene-lanes";
import { LevelUpHtml, LevelUpMarks } from "./scene-level-up";
import { ListenHtml, ListenMarks } from "./scene-listen";
import { NotProposingHtml, NotProposingMarks } from "./scene-not-proposing";
import { OutcomesHtml, OutcomesMarks } from "./scene-outcomes";
import { ProgramTeamHtml, ProgramTeamMarks } from "./scene-program-team";
import { SortHtml, SortMarks } from "./scene-sort";
import "./first.css";
import "./first-plan.css";
import "./first-budget.css";
import "./first-outcomes.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <NotProposingMarks />
          <ConsortiumMarks />
          <ProgramTeamMarks />
          <ListenMarks />
          <SortMarks />
          <LanesMarks />
          <LevelUpMarks />
          <BudgetMarks />
          <OutcomesMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <NotProposingHtml />
      <ConsortiumHtml />
      <ProgramTeamHtml />
      <ListenHtml />
      <SortHtml />
      <LanesHtml />
      <LevelUpHtml />
      <BudgetHtml />
      <OutcomesHtml />
    </Plane>
  );
}
