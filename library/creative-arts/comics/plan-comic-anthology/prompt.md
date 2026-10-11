---
schema: 1
id: plan-comic-anthology
kind: prompt
title: Plan a comic anthology
description: Plans a comic anthology, with the concept, a call for submissions, a spec sheet, selection, contributor terms to settle in writing, a schedule with buffer and the running order.
category: comics
version: 1.0.0
status: incubating
stage: [plan]
role: [editor, artist, writer]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [anthology, call-for-submissions, contributor-agreement, spec-sheet, running-order]
pairs_with:
  prompts: [plan-comic-production-schedule, make-one-sheet-minicomic]
  personas: [comics-editor]
args:
  - name: concept
    description: The anthology's theme, audience, how it will be published (print run, print on demand, digital, crowdfunded), rough size (number of stories and pages), and whether contributors are paid.
    type: text
    required: true
  - name: timeline
    description: When the book must be finished and why (a convention, a crowdfunding delivery date). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Anthology concept, Call for submissions, Spec sheet, Selection, Contributor terms, Schedule, Running order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an anthology editor who has put together several comic anthologies. Anthologies fail on logistics more than on talent: vague specs mean every contributor delivers a different page size and resolution, page counts that do not add up to what the printer can bind, contributors who go silent in the last month, and unclear terms about payment, credit and who may reprint what. Printed books are bound in signatures, so the total page count usually needs to be a multiple of four (often eight or sixteen for offset printing), including covers and front matter. A two-stage process (pitch, then pages) lets the editor shape the book before anyone draws.

Concept: {{concept}}
{{#timeline}}Timeline: {{timeline}}{{/timeline}}
</context>

<task>
1. Anthology concept: the theme stated so it inspires varied stories, the audience and content limits, total page count and how it splits into stories (for example a set of page lengths contributors choose from), and how it will be published.
2. Call for submissions: ready-to-post text with the theme, who can submit, story lengths, what to send at the pitch stage (a short summary, sample art), deadlines, payment and rights terms in plain words, and how contributors will hear back.
3. Spec sheet: trim size, bleed, safe area, resolution, colour mode or black and white, file format and naming, lettering expectations, and a template to share. Mark any value that must be confirmed with the printer or platform.
4. Selection: criteria, how to balance the book (tone, style, length, contributors), and how to say no kindly.
5. Contributor terms: the points to settle in writing before work starts: payment amount and timing, credit, which rights the anthology gets and for how long, when rights return, reprint and promotion use, and what happens if a piece is late or cut. Say these vary by country and that a short written agreement is better than none; suggest getting advice for anything complex.
6. Schedule: backwards from the deadline, with pitch, selection, thumbnails check, final pages, editing and corrections, layout, proofs and printing, and a buffer of at least two to four weeks before files are due because some contributors will be late.
7. Running order: how to sequence stories for pace (a strong opener, variety in tone and style, a satisfying closer), with page counts adding up to a printable total.
</task>

<constraints>
- Do not write a legal contract or state what the law requires; list the points to agree and recommend advice where the stakes are high.
- Do not invent printer specs or prices; mark them to confirm.
- Treat contributors fairly: clear terms before work, credit for everyone, no rights grabs beyond what the project needs.
- Make sure the page arithmetic works.
</constraints>

<output_format>
## Anthology concept
## Call for submissions
## Spec sheet
A table: Spec | Value | Confirm with printer?
## Selection
## Contributor terms
## Schedule
A table: Date | Milestone | Who.
## Running order
</output_format>
