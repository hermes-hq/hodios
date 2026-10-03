---
schema: 1
id: plan-first-click-test
kind: prompt
title: Plan a first-click test
description: Plans a first-click test with goal-based tasks, correct click areas, success targets, participant numbers, tool setup and how to read heatmaps and misclicks. For UX and product designers.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, image, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [first-click-testing, unmoderated-testing, navigation, findability, heatmaps]
pairs_with:
  prompts: [plan-tree-test, plan-card-sort, design-information-architecture, write-usability-test-plan]
  personas: [ux-researcher]
args:
  - name: screens
    description: The screens or designs to test (describe them or list their main links, buttons and regions), whether they are static images or a prototype, and the device (desktop or mobile).
    type: text
    required: true
  - name: tasks
    description: What users need to do or find on these screens, ideally the most important or most contested tasks, plus any labels or layouts the team is debating.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Objectives, Screens to test, Tasks, Success targets, Participants, Setup, Analysis, Decision rules, Pilot]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a UX researcher who uses first-click testing to check whether people know where to start a task on a page. The method rests on a well-known finding: when the first click is correct, people are far more likely to complete the task than when it is wrong. A first-click test shows one screen per task and records only where people click first and how long they take. It fails when task wording repeats the button label, when nobody defined the correct click areas before launch, when several unrelated tasks are stacked on a screen the participant has already learned, and when 15 responses are read as precise percentages.
</context>

<task>
Plan a first-click test for these screens and tasks.

<screens>
{{screens}}
</screens>

<tasks>
{{tasks}}
</tasks>

If the screens or the tasks are missing, ask for them and stop. If the screens are described too vaguely to define click areas (for example "our homepage" with no list of what is on it), ask for a screenshot description or element list, and mark click areas "pending" in the meantime.

1. **Objectives.** The decisions this test informs (for example "choose between layout A and B", "is the new nav label findable") in 2 to 4 bullet points.
2. **Screens to test.** Which screen goes with which task, at what fidelity, and the device. Use the screen exactly as users would see it at that point in the journey; for comparisons, each participant sees one variant (between-subjects).
3. **Tasks.** 6 to 10 tasks, most important first. Each task is a goal in the user's words that avoids the target label ("You want to change where your parcel is delivered" rather than "Click Manage delivery"). For each, define the correct click area or areas before launch, plausible wrong areas worth watching, and the objective it serves.
4. **Success targets.** Set targets before launch: first-click success (for example 80% or more for core tasks), median time to first click relative to the other tasks, and a post-task confidence rating if used.
5. **Participants.** Behaviour-based criteria matching the real users, and numbers: about 30 to 50 per variant for a usable estimate in an unmoderated test; fewer only for a quick directional read, labelled as such.
6. **Setup.** Randomise task order, one task per screen view, show the task before the screen, allow "I don't know", optional confidence question, short intro saying it tests the design not the person; expected duration under 10 minutes; check the tool records click coordinates and time on the right device size.
7. **Analysis.** Per task: first-click success with a confidence interval (adjusted Wald for small samples), time to first click, the heatmap of all clicks, and clusters of wrong clicks with what attracted them (a label, an image, a position). Compare variants task by task. Look for patterns across tasks that point to one label or region.
8. **Decision rules.** Agreed in advance, for example: a core task below target, or with a large cluster on one wrong element, gets that element redesigned and retested; differences between variants inside their confidence intervals are not treated as wins.
9. **Pilot.** Run with 2 or 3 people to catch ambiguous wording, unclear screens and missing correct areas.
</task>

<constraints>
- Task wording must not contain the target label or an obvious synonym of it.
- Do not invent analytics, baseline rates or results.
- Test the design as it will ship; suggested label or layout changes go in a separate note, not into the stimulus.
{{> output/uncertainty}}
</constraints>

<output_format>
## Objectives
## Screens to test
## Tasks
| # | Task wording | Screen | Correct click area(s) | Wrong areas to watch | Objective |
## Success targets
## Participants
## Setup
## Analysis
## Decision rules
## Pilot
</output_format>
