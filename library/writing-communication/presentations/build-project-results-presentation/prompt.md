---
schema: 1
id: build-project-results-presentation
kind: prompt
title: Build an end-of-project results presentation
description: Builds the presentation that closes a project for its sponsor and stakeholders, with what was delivered against the plan, the results so far, lessons, the handover and what remains open.
category: presentations
version: 1.0.0
status: incubating
stage: [review, ship]
role: [project-manager, manager, consultant, product-manager]
requires: [none]
inputs: [document, notes]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [project-closure, benefits-realisation, lessons-learned, handover, stakeholders]
pairs_with:
  prompts: [write-project-closeout-report, build-project-kickoff-deck, build-steering-committee-update, write-project-retrospective-writeup]
  personas: [presentation-designer]
args:
  - name: project_plan
    description: What the project set out to do, objectives, scope, budget, timeline and success measures from the business case or kickoff.
    type: text
    required: true
  - name: outcome
    description: What was delivered, final cost and dates, results measured so far, what was descoped, issues and open items.
    type: text
    required: true
  - name: audience
    description: Who will attend and how long you have, for example "sponsor, steering group and the operations team taking it over, 30 minutes".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Headline, Planned versus delivered, Slide plan, Benefits and how they will be tracked, Lessons, Handover and open items, Thanks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help project leads present the end of a project to the sponsor, steering group and the people who will own the result. Closing presentations usually turn into a victory lap: a feature list, team photos and thanks, with no comparison to what was promised. Sponsors want to know whether the money bought what the business case said, which benefits are already visible and which will only show later (and who is accountable for tracking them), what was dropped, what risks and open items are being handed over, and what the organisation should do differently next time. The people taking over want clarity on support, documentation and known issues. Honest closure builds the credibility you need for the next project.

<project_plan>
{{project_plan}}
</project_plan>

<outcome>
{{outcome}}
</outcome>

Audience and time: {{audience}}
</context>

<task>
1. Write a headline: what the project delivered and whether it met its objectives, in one or two sentences.
2. Build a planned versus delivered table covering scope, time, cost and each success measure, with variance and a short reason. Do not convert missing measures into claims; mark them "not yet measured" with when they can be.
3. Separate benefits already realised from benefits expected later, and for expected benefits state the measure, when it should be checked, and who owns tracking it (from the input or as a gap).
4. Plan the slides for the time: headline, what we set out to do, what was delivered (one visual such as a before and after), planned versus delivered, benefits and tracking, what was descoped and why, lessons, handover and open items, thanks, and a formal close request if the sponsor must sign off. Keep main slides to about two thirds of the time.
5. Write three to five lessons as specific, reusable actions ("agree data access before kickoff"), not general sentiments, drawn from the issues in the input.
6. List handover and open items: owner, support arrangement, documentation, known issues, and outstanding risks.
7. Draft a short thanks slide crediting teams and roles by contribution.
</task>

<constraints>
- Compare against the original plan; if the baseline changed through approved change requests, show both and say so.
- Use only figures and results in the input; mark gaps as [data needed]. Do not claim benefits that have not been measured.
- Lessons must be specific and blame-free; do not name individuals for failures.
- Do not declare the project closed on the sponsor's behalf; present closure as a request.
</constraints>

<output_format>
## Headline
One or two sentences.

## Planned versus delivered
Table: Area | Planned | Delivered | Variance | Reason.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes.

## Benefits and how they will be tracked
Table: Benefit | Status (realised or expected) | Measure | Check date | Owner.

## Lessons
Numbered actions.

## Handover and open items
Table: Item | Owner | Due or status.

## Thanks
Draft slide text.
</output_format>
