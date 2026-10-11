---
schema: 1
id: set-up-artwork-inventory
kind: prompt
title: "Set up an artwork inventory"
description: "Sets up a simple record system for your artworks: unique codes, fields to record, image naming, where each piece is, consignments, sales and provenance, in a spreadsheet you can keep."
category: visual-art
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [artist]
requires: [none]
inputs: [text, notes]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [artwork-records, art-business, consignment, provenance, spreadsheet]
pairs_with:
  prompts: [price-artwork, plan-print-edition, plan-art-exhibition]
args:
  - name: practice
    description: "How many works you have, media, whether you sell originals, prints or both, and where work goes (galleries on consignment, markets, online, loans to shows)."
    type: text
    required: true
  - name: current_records
    description: "How you track work now, if at all, for example \"photos on my phone and a notebook\". Optional."
    type: text
  - name: tool
    description: "The tool you want to use: a spreadsheet app, a notes app, or a database you already have. Optional; assumes a spreadsheet."
    type: string
output_contract:
  format: markdown
  sections: [Coding system, Inventory fields, Locations and consignments, Images and files, Routine, Getting started]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a studio manager who keeps records for working artists and estates. You know good records pay off when a gallery loses track of a consigned piece, a collector asks for provenance, an insurer asks for a list, tax time arrives, or someone compiles a catalogue of the artist's work later. The core is a unique inventory code per work written on the back and in every file name, a single master list, and a location history. Consignment records matter most: what was sent, on which date, at what retail price and commission, and what came back.

Practice: {{practice}}
{{#current_records}}Current records: {{current_records}}{{/current_records}}
{{#tool}}Tool: {{tool}}{{/tool}}
</context>

<task>
1. Design an inventory code (for example year, medium letter and number, such as 2026-O-014) with rules for prints, editions and series.
2. List inventory fields grouped as essential and useful: code, title, year, medium, support, dimensions (unframed and framed), edition info, status (available, sold, consigned, gifted, destroyed), retail price, current location, buyer and sale date and price, exhibition history, and notes. Present them as spreadsheet column headers.
3. Design the location and consignment records: a separate sheet or columns for consignments with date out, consignee, agreed price and commission, date returned or sold, and payment received, plus how to reconcile with galleries.
4. Images and files: naming files with the code, which photos to keep (front, back with signature, detail, framed), and backups.
5. A routine: what to record on finishing a work, on sending, on selling, and a quarterly check.
6. Getting started: how to catalogue existing work in batches, starting with what is out of the studio.
</task>

<constraints>
- Keep it simple enough for one person to maintain; avoid fields nobody will fill in.
- Do not give tax or legal advice; mention that records help with tax and insurance and that rules vary by country.
- Keep buyer personal data minimal and stored privately; note privacy obligations may apply.
</constraints>

<output_format>
## Coding system
## Inventory fields
A table: column | example | essential or useful.
## Locations and consignments
A table of consignment columns.
## Images and files
## Routine
## Getting started
</output_format>
