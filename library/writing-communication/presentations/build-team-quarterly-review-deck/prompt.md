---
schema: 1
id: build-team-quarterly-review-deck
kind: prompt
title: Build a team quarterly review deck
description: Builds a team or department's quarterly review deck for leadership, with results against goals, what drove them, honest misses, next quarter's priorities and the help needed.
category: presentations
version: 1.0.0
status: incubating
stage: [review, plan]
role: [manager, engineering-manager, operations-manager, product-manager]
requires: [none]
inputs: [notes, dataset, document]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [quarterly-review, okr-review, team-update, executive-audience, asks]
pairs_with:
  prompts: [present-missed-target, build-year-in-review-deck, write-okr-progress-report, plan-backup-slides]
  personas: [presentation-designer]
args:
  - name: goals
    description: The goals, OKRs or targets the team committed to for the quarter, as they were agreed.
    type: text
    required: true
  - name: results
    description: What happened, metrics, launches, incidents, hiring, budget, and anything that changed during the quarter. Notes or a data export are fine.
    type: text
    required: true
  - name: audience
    description: Who you present to and how long you have, for example "VP and peer directors, 20 minutes".
    type: text
    required: true
  - name: next_quarter
    description: Draft priorities or goals for next quarter, if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary slide, Scorecard, Slide plan, Next quarter, Asks, Questions to prepare for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers present a quarterly review (sometimes called a QBR, business review or OKR review) of their own team to leadership. Leaders read these decks quickly and look for three things: did you do what you said, do you understand why, and what do you need from them. Reviews go wrong when the deck is an activity list ("we held 14 workshops"), when goals are quietly re-worded after the fact so everything looks green, when misses are buried on slide 19, when green-amber-red ratings have no stated thresholds, and when the asks are vague ("more support"). Credible reviews start with a one-slide summary, show a scorecard against the goals exactly as agreed, explain the drivers behind the biggest wins and misses, state what the team learned and will change, set a small number of next-quarter priorities, and make specific asks with a decision or owner attached.

<goals>
{{goals}}
</goals>

<results>
{{results}}
</results>

Audience and time: {{audience}}
{{#next_quarter}}
<next_quarter>
{{next_quarter}}
</next_quarter>
{{/next_quarter}}
</context>

<task>
1. Build a scorecard: each goal as originally agreed, target, actual, status, and a one-line driver. Define the status rule (for example on track at 90% or more of target) and apply it consistently. Mark any goal with no measured result as "not measured" rather than guessing.
2. Write the summary slide: the overall verdict in one sentence, the two or three biggest results, the biggest miss, and the main ask.
3. For the most important wins and misses, explain the drivers using the results given, and what the team will repeat or change. Separate things inside the team's control from external factors without using the latter as excuses.
4. Plan the slide order: summary, scorecard, drivers for the top two or three items, other notable work in one slide, lessons, next quarter priorities, asks, appendix with detail. Fit the main slides into about two thirds of the time.
5. Draft next quarter's three to five priorities, from the input if given, each with a measure. If none were given, propose them as clearly labelled suggestions based on the misses and lessons.
6. Write the asks: specific (headcount, budget, a decision, help from another team), with the reason and the impact if not granted.
7. List questions leadership is likely to ask, with where the answer is or what data to bring.
</task>

<constraints>
- Report goals exactly as originally agreed; if a goal changed during the quarter, show the original and the change with the reason.
- Use only figures in the results; mark gaps as [data needed]. Do not round misses into hits.
- Misses appear in the summary, not only in the appendix.
- Every main slide title is a full-sentence conclusion.
- Asks are specific and tied to a result or priority.
</constraints>

<output_format>
## Summary slide
The slide's text.

## Scorecard
Table: Goal | Target | Actual | Status | Driver. Status rule stated above the table.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes.

## Next quarter
Numbered priorities with measures, suggestions labelled.

## Asks
Bullets: ask, reason, impact if not granted.

## Questions to prepare for
Bullets with answer location or data to bring.
</output_format>
