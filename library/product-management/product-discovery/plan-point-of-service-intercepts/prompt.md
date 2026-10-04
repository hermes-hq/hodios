---
schema: 1
id: plan-point-of-service-intercepts
kind: prompt
title: Plan point-of-service intercept interviews
description: Plans short intercept interviews where a service happens, such as a shop counter, station or clinic waiting room, with permissions, a three-minute script, time-slot sampling and a note grid.
category: product-discovery
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [product-manager, ux-researcher, operations-manager, designer]
subject: [retail, hospitality, healthcare, public-sector]
requires: [none]
inputs: [text]
output: [plan, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [intercept-interviews, in-context-research, sampling, field-research, service-moments]
pairs_with:
  prompts: [plan-guerrilla-usability-test, plan-contextual-inquiry, synthesize-customer-interviews]
  personas: [service-designer]
args:
  - name: service_and_location
    description: The service and the place you will intercept people (shop counter, station platform, clinic waiting room, hotel lobby, library, market stall), plus opening hours and who manages the space.
    type: text
    required: true
  - name: what_to_learn
    description: What you need to learn and the decision it informs.
    type: text
    required: true
  - name: number_of_sessions
    description: How many on-site sessions (half-days or shifts) you can run.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Focus questions, Permissions and setup, Sampling schedule, Approach and script, Note grid, Same-day synthesis]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a field researcher who runs intercept interviews where a service is actually used. Intercepts are powerful because memory is fresh and context is visible, but they go wrong in three ways: researchers only catch people who look willing or idle (so the busy, stressed and hurried, often the people with the worst experience, are missing); sessions all happen at the same convenient time of day; and the script drifts into general opinions instead of the moment the person just lived. People are on their way somewhere, so three minutes is the realistic limit.

Sessions available: {{number_of_sessions}}
</context>

<task>
Service and location:

<service_and_location>
{{service_and_location}}
</service_and_location>

What to learn:

<what_to_learn>
{{what_to_learn}}
</what_to_learn>

1. Focus questions: two or three things to learn per intercept, each tied to the moment just experienced.
2. Permissions and setup: who must agree (site manager, landlord, transport operator, clinical lead), staff briefing so they do not steer customers to you, where to stand so you do not block flow or exits, ID badge, a sign explaining who you are, and rules in sensitive places (in a clinic or pharmacy: no approaching people visibly unwell or distressed, never ask about their health condition; with children: speak to the accompanying adult).
3. Sampling schedule across the {{number_of_sessions}} sessions: spread across days of the week and times (peak, off-peak, opening, closing), and a fixed rule for who to approach (for example "every third person to leave the counter") so the interviewer does not pick the friendly-looking ones. Track refusals by rough category so you can see who is missing.
4. Approach and script, under three minutes: an opening line (who you are, how long it takes, that it is optional and anonymous), a screening question if needed, three to five questions about what just happened ("What did you come in for today?", "What was the hardest part of that?", "What did you do when...?"), one probe each, and a thank-you. Include how to accept a "no" gracefully and how to end politely when someone needs to go.
5. Note grid: one row per intercept with time, slot, approach number, what they came to do, key moment, quote, observed behaviour and the researcher's interpretation kept in a separate column.
6. Same-day synthesis: 20-30 minutes after each session to cluster notes, count patterns by time slot, and adjust the next session.
</task>

<constraints>
- Questions are about the experience just lived, not opinions on a future service or hypothetical features.
- Do not collect names or contact details unless the person volunteers to be contacted later, and then only with clear consent and a separate sheet.
- No audio or video recording in public or clinical spaces unless the site allows it and the person agrees; default to notes.
- If the location, its owner or the learning goal is missing, ask for it and stop. Do not invent opening hours or footfall.
- Incentives, if any, are small and given to everyone who takes part, not only to the people who give long answers.
</constraints>

<output_format>
## Focus questions
Numbered.

## Permissions and setup
Checklist.

## Sampling schedule
Table: session | day | time slot | why this slot | approach rule. Then the refusal tracker columns.

## Approach and script
The script as the interviewer would say it, timed, with probes.

## Note grid
Table header with one example row marked as an example.

## Same-day synthesis
Short steps.
</output_format>
