---
schema: 1
id: build-user-story-map
kind: prompt
title: Build a user story map
description: Builds a user story map with a backbone of user activities and tasks, a walking skeleton and release slices tied to outcomes, plus the questions to settle before planning.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, designer, tech-lead, business-analyst]
requires: [none]
inputs: [spec, text, notes]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [story-mapping, walking-skeleton, release-planning, backlog]
pairs_with:
  prompts: [define-mvp-scope, plan-release, build-outcome-roadmap, write-shaped-pitch]
args:
  - name: product_scope
    description: The product or feature, the problem it solves, what is in and out of scope, known constraints (deadline, team, platforms), and any existing backlog items.
    type: text
    required: true
  - name: users
    description: The main user types and their goal, if not clear from the scope. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Users and narrative, Backbone, Story map, Walking skeleton, Release slices, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You facilitate story mapping in the way Jeff Patton describes it. A flat backlog hides the user's journey; a story map lays it out. The backbone is the sequence of big user activities, left to right in the order a user experiences them. Under each activity sit the user tasks (verb phrases: "Compare delivery options"), and under each task the stories and details, most essential at the top. Horizontal slices then cut across the whole map: the first, the walking skeleton, is the thinnest version that lets a user complete the journey end to end. Each later slice is a release defined by the outcome it achieves, not by a feature list. Maps go wrong when activities are system components ("Database", "Admin"), when the first release is the whole left column built perfectly, and when slices have no outcome.
</context>

<task>
<product_scope>
{{product_scope}}
</product_scope>
{{#users}}

Users: {{users}}
{{/users}}

If you cannot tell who the user is or what they are trying to get done, ask and stop.

1. **Users and narrative.** Name the primary user (and secondary users if their journey differs) and tell the journey as a short narrative in plain language, from trigger to goal achieved.
2. **Backbone.** Five to nine user activities in narrative order, each with its user tasks (verb phrases, from the user's point of view). Include tasks outside the product that the journey depends on (for example "Gets approval from manager"), marked as outside.
3. **Story map.** Under each task, the stories or details that could implement it, ordered from essential to nice to have. Write each as a short phrase; use "As a…, I want…, so that…" only where the user or reason would be unclear otherwise. Mark stories from the existing backlog.
4. **Walking skeleton.** Select the minimum stories, at least one per task the journey cannot do without, that let a user complete the whole journey, even crudely (manual steps behind the scenes are allowed and marked). Explain what makes it usable rather than a demo.
5. **Release slices.** Two to four further slices. For each: the target outcome (what users can now do, and the metric that would show it), the stories in it, and what is deliberately left out.
6. **Open questions.** Assumptions and unknowns that would change the map, each with who can answer it.
</task>

<constraints>
- Activities and tasks describe what users do, never system components or teams.
- Stay within the stated scope; put out-of-scope ideas in a "Later or out of scope" note rather than in slices.
- Do not estimate effort or dates unless the input gives the team's capacity; slices are about outcomes and order.
- Mark any story you invented beyond the input as "proposed".
{{> output/uncertainty}}
</constraints>

<output_format>
## Users and narrative
## Backbone
Activities as a numbered list, each with its tasks.

## Story map
| Activity | Task | Walking skeleton | Slice 2 | Slice 3 | Later |
One row per task; cells hold story phrases.

## Walking skeleton
## Release slices
For each slice: outcome and metric, stories, left out.
## Open questions
</output_format>
