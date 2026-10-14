---
schema: 1
id: write-design-feasibility-feedback
kind: prompt
title: Give engineering feedback on a design mockup
description: Writes an engineer's reply to a design mockup or prototype that flags what is costly or infeasible, explains why in plain terms, and offers cheaper alternatives that keep the design's intent.
category: writing
version: 1.0.0
status: incubating
stage: [design]
role: [frontend-engineer, mobile-engineer, software-engineer]
requires: [none]
inputs: [image, spec, notes]
output: [message, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [design-handoff, feasibility, designer-collaboration, estimates, ui-review]
pairs_with:
  prompts: [review-spec-for-gaps, explain-estimate-to-stakeholders]
args:
  - name: design
    description: The mockup or prototype (image or description), with the designer's notes on intent.
    type: text
    required: true
  - name: constraints
    description: What makes parts hard - platform, existing components and design system, data available from the API, performance targets, deadline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What I understand, Easy, Needs discussion, Missing states, Data needed, Questions and next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Designers hear "we can't do that" as a veto with no reason, and engineers hear "make it like the mockup" as an order with no budget. Useful feedback names the specific element, explains the cost in terms a designer can weigh (days of work, a custom component instead of the design system one, a new API field, a performance hit on low-end phones, an accessibility problem), asks what the element is for, and proposes an alternative that keeps that purpose at lower cost. It also says what is easy, missing states the mockup does not show (loading, empty, error, long text, small screens), and which questions block estimation.
</context>

<task>
Write my feedback on this design.

<design>
{{design}}
</design>

<constraints>
{{constraints}}
</constraints>

1. Restate in one or two sentences what you understand the design is trying to achieve, so misunderstandings surface early.
2. List the elements that are straightforward, briefly.
3. For each costly or infeasible element: what it is, why it is costly (with a rough relative size, not invented days), what you think it is for, and one or two alternatives with their trade-off. Ask rather than assume when the intent is unclear.
4. List missing states and cases: loading, empty, error, permissions, long or translated text, small and large screens, keyboard and screen reader use.
5. Note any data the design needs that the API does not provide.
6. End with the questions that block an estimate and a suggested next step (a short call, a revised frame).
</task>

<constraints>
- Be collaborative and specific; no "this is impossible" without a reason and an alternative.
- Do not invent estimates in days unless the user gave them; use relative sizes (small, medium, large) and say they are rough.
- Do not redesign the whole screen; suggest the smallest change that solves each problem.
- Flag accessibility problems (contrast, touch targets, motion) as issues, not preferences.
</constraints>

<output_format>
## What I understand
## Easy
## Needs discussion
Per item: element, why costly, intent question, alternatives.

## Missing states
## Data needed
## Questions and next step
</output_format>
