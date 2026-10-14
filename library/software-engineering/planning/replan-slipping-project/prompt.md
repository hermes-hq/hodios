---
schema: 1
id: replan-slipping-project
kind: prompt
title: Replan a slipping project
description: Diagnoses why an engineering project is behind, compares recovery options (cut scope, move the date, change sequencing, add people) and drafts the replan and the message to stakeholders.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, project-manager]
stack: []
requires: [none]
inputs: [text, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [schedule-slip, replanning, scope-cut, stakeholder-communication, delivery-risk]
pairs_with:
  prompts: [estimate-with-ranges, forecast-roadmap-dates-with-ranges, write-status-report]
  personas: [engineering-manager]
args:
  - name: situation
    description: The original plan and date, what is done, what remains, how far behind you are and what the team believes caused it.
    type: text
    required: true
  - name: constraints
    description: What cannot move - a contractual or launch date, must-have scope, budget, team size - and who decides.
    type: text
  - name: audience
    description: Who needs the message, for example the product director, a customer or the whole company.
    type: string
    default: product and leadership stakeholders
output_contract:
  format: markdown
  sections: [Diagnosis, Realistic forecast, Recovery options, Recommendation, Revised plan, Stakeholder message]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A late project rarely recovers by working harder. A project that is behind at the halfway mark usually slips further, because the remaining work was estimated the same way as the work that already slipped. Experienced leads first find the cause (scope grew, estimates were optimistic, a dependency stalled, people were pulled away, the hard part was discovered late), then re-forecast the remaining work from the team's actual pace, and only then choose between the real levers: cut or defer scope, move the date, change the order of work, or reduce work in progress. Adding people late usually slows a team for weeks (onboarding, communication overhead), so it helps only with well-separated work and enough runway. Stakeholders forgive a slip they hear about early with options; they do not forgive a surprise.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Diagnose the slip: sort the causes into scope growth, estimation error, blocked dependencies, lost capacity and late-discovered complexity. Say which are one-offs and which will keep happening.
2. Re-forecast the remaining work from the pace actually achieved so far, not the original estimates. Give a range (likely and pessimistic date) and the assumptions behind it.
3. List three to five recovery options. For each: what changes, effect on the date, cost and risk, and what it needs from whom. Include "move the date" and "cut scope" even if the user dislikes them. Treat "add people" honestly, with its ramp-up cost.
4. Recommend one option or a combination, tied to the constraints that cannot move.
5. Write the revised plan: remaining scope split into must-ship and deferred, sequence, the next checkpoint date and the signal that would trigger another replan.
6. Draft a short message for {{audience}}: what happened in one or two sentences without blame, the new forecast as a range, the choice they need to make or the decision taken, and the next update date.
</task>

<constraints>
- Do not invent velocity, dates or headcount; compute from the numbers given and mark gaps as questions.
- Never recommend overtime or weekend crunch as the plan; at most mention it as a short-term risk to avoid.
- Do not give a single-date forecast without a range and its assumptions.
- No blame on individuals in the diagnosis or the message.
- If the information is too thin to forecast, say what is missing and give a provisional range.
</constraints>

<output_format>
## Diagnosis
Table: cause | evidence | one-off or ongoing.
## Realistic forecast
Likely and pessimistic dates with assumptions.
## Recovery options
Table: option | what changes | date effect | cost and risk | needs.
## Recommendation
Two to four sentences.
## Revised plan
Must-ship, deferred, sequence, next checkpoint, replan trigger.
## Stakeholder message
The draft, under 200 words.
</output_format>
