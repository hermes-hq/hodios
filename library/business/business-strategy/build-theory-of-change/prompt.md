---
schema: 1
id: build-theory-of-change
kind: prompt
title: Build a theory of change
description: Builds a theory of change for a nonprofit programme - long-term outcome, preconditions, activities, assumptions and indicators - working backwards, and points out weak causal links.
category: business-strategy
version: 1.0.0
status: incubating
stage: [design, plan]
role: [manager, executive, researcher]
subject: [nonprofit]
requires: [none]
inputs: [text, notes]
output: [diagram, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [theory-of-change, outcomes-chain, impact-measurement, causal-assumptions, programme-design, indicators]
pairs_with:
  prompts: [write-charity-three-year-strategy, write-impact-report, write-case-for-support]
  personas: [nonprofit-advisor, grant-writer]
args:
  - name: programme
    description: The programme or project - what you do, how often, with whom, the change you hope for, and any results or evidence so far.
    type: text
    required: true
  - name: target_group
    description: Who the programme is for - age, situation, location, how they find you, and what barriers they face.
    type: text
    required: true
  - name: horizon
    description: The time frame for the long-term outcome.
    type: enum
    enum: [1-year, 3-year, 5-year]
    default: 3-year
output_contract:
  format: markdown
  sections: [Long-term outcome, Outcomes chain, Activities, Assumptions, Weak links, Indicators, Diagram]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit or social enterprise build a theory of change: a map of how its activities are expected to lead, step by step, to a lasting change for a specific group. Most first drafts go wrong by starting from the activities the organisation already runs and drawing arrows upward, by naming a long-term outcome no programme could own ("end poverty"), by skipping the middle steps where most change actually happens (knowledge, confidence, behaviour, conditions), and by leaving assumptions unstated. You work backwards from the outcome, ask "what must be true first?" at each level, name the assumption behind every arrow, and point out where the logic is weak or the evidence is thin. Horizon: {{horizon}}.
</context>

<task>
<programme>
{{programme}}
</programme>

<target_group>
{{target_group}}
</target_group>

1. Long-term outcome: one specific, plausible change for the target group within the horizon that the programme contributes to. Also name the wider impact it serves, which the programme does not own.
2. Outcomes chain: work backwards in three levels - intermediate outcomes (behaviour or situation change), early outcomes (knowledge, skills, confidence, access), and the preconditions for those (people take part and stay). Each outcome is written as a change in people ("young carers report...", "parents attend..."), not an activity.
3. Activities: map existing activities to the outcomes they serve. Flag activities that serve no outcome and outcomes with no activity.
4. Assumptions: for each main link, the assumption that must hold (for example "people who gain budgeting skills have enough income for them to matter"), and the external factors that could break it.
5. Weak links: rate each link strong, plausible or weak, using the evidence given or known types of evidence, and say what would strengthen it (research to check, a change in design, a partner who covers that step).
6. Indicators: one or two indicators per outcome, with how to collect them proportionately (short validated scales where they exist, attendance data, follow-up calls) and when.
7. Diagram: a text diagram or Mermaid flowchart from activities to long-term outcome.
</task>

<constraints>
- Never invent research findings, statistics or named studies. When citing types of evidence, describe them in general terms and say where to look.
- Keep outcomes in plain language the target group would recognise; avoid jargon.
- Respect dignity: describe people by their situation, not as problems.
- If the target group or intended change is missing, ask for it and stop.
- Prefer a chain of 8-15 boxes; more becomes unreadable.
{{> output/uncertainty}}
</constraints>

<output_format>
## Long-term outcome
One sentence, then one line on the wider impact.
## Outcomes chain
Table: Level | Outcome | Leads to.
## Activities
Table: Activity | Outcomes it serves | Note (gap or orphan).
## Assumptions
Table: Link | Assumption | External factor.
## Weak links
Table: Link | Strength | Why | How to strengthen.
## Indicators
Table: Outcome | Indicator | Method | When.
## Diagram
A Mermaid flowchart (graph BT) or an indented text diagram.
</output_format>
