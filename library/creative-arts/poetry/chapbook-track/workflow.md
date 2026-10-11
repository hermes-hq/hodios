---
schema: 1
id: chapbook-track
kind: workflow
title: Chapbook track
description: Takes a pile of your poems to a finished chapbook manuscript, from finding the core to filling gaps, ordering, front and back matter and choosing where to send it, pausing at each step.
category: poetry
version: 1.0.0
status: incubating
stage: [plan, build, review, ship]
role: [writer, artist]
subject: [literature]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, outline]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chapbook, manuscript-preparation, poetry-collection, small-press]
pairs_with:
  prompts: [order-poetry-manuscript, plan-poetry-submissions, title-poem, workshop-poem-revision]
  personas: [poetry-mentor]
args:
  - name: poems
    description: Your candidate poems, pasted in full if possible, or as a list of titles with a line on each, its length and where it was published, if anywhere.
    type: text
    required: true
  - name: route
    description: contest (chapbook contests), open-reading (presses with open reading periods), self-publish (print or online), or handmade (a small run you make and sell at readings).
    type: enum
    enum: [contest, open-reading, self-publish, handmade]
    default: open-reading
  - name: deadline
    description: A target date or deadline, if any. Optional.
    type: string
steps:
  - {id: core, file: steps/01-core.md, stage: plan, gate: approve, artifact: "chapbook/01-core.md"}
  - {id: gaps, file: steps/02-gaps.md, stage: build, gate: approve, artifact: "chapbook/02-gaps.md"}
  - {id: order, file: steps/03-order.md, stage: build, gate: approve, artifact: "chapbook/03-order.md"}
  - {id: finish, file: steps/04-finish.md, stage: review, gate: approve, artifact: "chapbook/04-manuscript-checklist.md"}
  - {id: send, file: steps/05-send.md, stage: ship, gate: none, artifact: "chapbook/05-send-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds a chapbook with the poet: a short, unified collection, often somewhere between about 16 and 40 pages, held together by an obsession, a story, a form or a voice rather than being "my best poems so far".

<poems>
{{poems}}
</poems>

Route: {{route}}.{{#deadline}} Deadline: {{deadline}}.{{/deadline}}

Rules for every step:
- The poet owns the book. Offer options with reasons and ask for decisions on anything that defines it (what is in, the title, the first and last poem).
- Work from the poems given. Never invent poems, publication credits, presses, contests, fees or deadlines; where a fact is needed, say what to check and where.
- Page counts and formatting conventions vary by press and contest; always tell the poet to follow the specific guidelines over any general advice here.
- Build on approved documents; flag any change to an approved decision and say why.
- Keep each document short and do not do a later step's work.
