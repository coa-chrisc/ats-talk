/**
 * Part 5's stage, the backup slides: one plane the size of the stage, never
 * moved by a camera. Every slide's title sits in the same place; each
 * slide's picture is two parts, its marks under the HTML and its HTML, so it
 * goes in one move when the next slide arrives. Each group of slides draws
 * in its own scene module; where things go and what they say is in the
 * layout modules, how they move in the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { CatalogHtml, CatalogMarks, TableHtml, TableMarks } from "./scene-catalog";
import { PartsHtml, PartsMarks, SpendHtml, SpendMarks, TeachHtml, TeachMarks } from "./scene-means";
import { ChannelHtml, ChannelMarks, CharterHtml, CharterMarks, LayersHtml, LayersMarks } from "./scene-rules";
import { AmandaHtml, AmandaMarks, GrantHtml, GrantMarks, ScanHtml, ScanMarks } from "./scene-tools";
import "./backup.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <ScanMarks />
          <GrantMarks />
          <AmandaMarks />
          <LayersMarks />
          <ChannelMarks />
          <CharterMarks />
          <SpendMarks />
          <TeachMarks />
          <PartsMarks />
          <CatalogMarks />
          <TableMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <ScanHtml />
      <GrantHtml />
      <AmandaHtml />
      <LayersHtml />
      <ChannelHtml />
      <CharterHtml />
      <SpendHtml />
      <TeachHtml />
      <PartsHtml />
      <CatalogHtml />
      <TableHtml />
    </Plane>
  );
}
