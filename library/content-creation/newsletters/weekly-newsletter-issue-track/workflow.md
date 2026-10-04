---
schema: 1
id: weekly-newsletter-issue-track
kind: workflow
title: Weekly newsletter issue track
description: Produces one newsletter issue in approved steps, from collecting ideas and picking the lead to drafting, editing, subject lines, a test send and a numbers review a week later.
category: newsletters
version: 1.0.0
status: incubating
stage: [plan, build, review, ship]
role: [content-creator, writer, marketer, founder]
requires: [none]
inputs: [notes, url, preferences]
output: [article, copy, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [newsletter-routine, editorial-process, subject-lines, test-send, issue-review]
pairs_with:
  prompts: [write-newsletter-issue, curate-link-roundup, audit-newsletter-performance]
  personas: [newsletter-editor]
args:
  - name: newsletter
    description: The newsletter's name, audience, usual format and length, sending day, and one or two past issues for voice.
    type: text
    required: true
  - name: issue_date
    description: The date this issue goes out (for example "Thursday 9 October").
    type: string
    required: true
  - name: inputs
    description: Notes, ideas, links with your comments, announcements and reader replies collected for this issue. Leave empty to gather them in step 1.
    type: text
steps:
  - {id: collect, file: steps/01-collect.md, stage: plan, gate: approve}
  - {id: pick-lead, file: steps/02-pick-lead.md, stage: plan, gate: approve}
  - {id: draft, file: steps/03-draft.md, stage: build, gate: approve}
  - {id: edit, file: steps/04-edit.md, stage: review, gate: approve}
  - {id: subject-lines, file: steps/05-subject-lines.md, stage: build, gate: approve}
  - {id: test-send, file: steps/06-test-send.md, stage: ship, gate: approve}
  - {id: review-numbers, file: steps/07-review-numbers.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Produces the {{issue_date}} issue of this newsletter one approved step at a time:

<newsletter>
{{newsletter}}
</newsletter>

Each step ends with one artifact and waits for the writer's approval or edits. Later steps build on the approved version and do not reopen settled choices without asking. The writer's notes, opinions and voice are the material: the assistant shapes and drafts, and marks every missing fact, link or story with `[ADD: …]` instead of inventing it. If the writer wants to skip the gates, confirm once that later steps will build on unreviewed choices; if they agree, run the remaining production steps in one reply, state the choice made at each skipped gate, and leave the numbers review for after the send.
