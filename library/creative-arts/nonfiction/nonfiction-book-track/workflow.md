---
schema: 1
id: nonfiction-book-track
kind: workflow
title: Nonfiction book track
description: Takes a nonfiction book from premise to finished manuscript in gated steps - reader promise, outline, proposal or publishing plan, research log, chapter drafting, structural revision and launch.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan, build, review, ship]
role: [writer, researcher]
requires: [none]
inputs: [notes, text]
output: [plan, outline, article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [book-proposal, research-log, manuscript-revision, book-launch]
pairs_with:
  prompts: [outline-nonfiction-book, write-nonfiction-book-proposal, draft-nonfiction-chapter, plan-nonfiction-book-launch]
  personas: [nonfiction-book-coach]
args:
  - name: book_premise
    description: The book's subject and big idea, who it is for, why you are the one to write it, and what material you already have (notes, interviews, data, chapters). Fragments are fine.
    type: text
    required: true
  - name: route
    description: traditional (sell on a proposal to an agent or publisher before finishing the book) or self-published (write the whole book first and publish it yourself). Changes step 3 and the launch.
    type: enum
    enum: [traditional, self-published]
    default: traditional
  - name: months
    description: How many months you have from today to a finished manuscript. The drafting schedule is built to fit it.
    type: number
    default: 12
steps:
  - {id: reader-promise, file: steps/01-reader-promise.md, stage: plan, gate: approve, artifact: "book/01-reader-promise.md"}
  - {id: outline, file: steps/02-outline.md, stage: plan, gate: approve, artifact: "book/02-outline.md"}
  - {id: proposal-or-plan, file: steps/03-proposal-or-plan.md, stage: plan, gate: approve, artifact: "book/03-proposal-or-publishing-plan.md"}
  - {id: research-log, file: steps/04-research-log.md, stage: build, gate: approve, artifact: "book/04-research-log.md"}
  - {id: drafting, file: steps/05-drafting.md, stage: build, gate: approve, artifact: "book/05-drafting-schedule-and-chapters.md"}
  - {id: structural-revision, file: steps/06-structural-revision.md, stage: review, gate: approve, artifact: "book/06-structural-revision.md"}
  - {id: launch, file: steps/07-launch.md, stage: ship, gate: none, artifact: "book/07-launch-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a nonfiction book from premise to a launch-ready manuscript in the order a good editor would: promise, structure, route to readers, research, drafting, structural revision, launch.

<book_premise>
{{book_premise}}
</book_premise>
Route: {{route}}. Time to a finished manuscript: {{months}} months.

Rules for every step:
- The book is the author's. Diagnose and offer options; draft only what a step asks for, in the author's voice once a sample exists.
- Never invent studies, statistics, quotes, people, credentials, comparable titles or sales figures. Mark unsourced claims [source needed] and anything you are unsure exists [verify].
- Never contradict an approved step without naming the change and asking first.
- Keep each step's document readable in about ten minutes and end it with the decisions you need from the author.
- If the author wants to skip ahead, say in one line what the skipped step protects, offer a quick version, and keep every gate.
- Make no promises about agents, deals, sales or rankings.
