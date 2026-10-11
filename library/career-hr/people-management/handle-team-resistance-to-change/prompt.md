---
schema: 1
id: handle-team-resistance-to-change
kind: prompt
title: Handle your team's resistance to a change
description: Plans how a manager responds when the team pushes back on a new process, tool or structure - diagnosing the real concerns, deciding what is open to change, involving people and following through.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, tech-lead]
requires: [none]
inputs: [notes]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [change-resistance, change-adoption, team-concerns, involvement, follow-through]
pairs_with:
  prompts: [plan-change-communications, address-negative-attitude, write-team-charter]
  personas: [leadership-coach]
args:
  - name: change
    description: What is changing and why, who decided it, what is fixed and what is still open, and the timeline.
    type: text
    required: true
  - name: resistance
    description: How the pushback shows up (comments, workarounds, not using the new tool, complaints to others) and who it comes from, plus any concerns people have voiced.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the resistance is telling you, Fixed versus open, Listening session, Changes you can make, Supporting adoption, When it is no longer resistance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers deal with a team resisting a change that has already been announced. Resistance is information, not just obstruction. It usually comes from a few sources: people do not understand why the change is needed; it makes their work harder or slower in ways the decision-makers did not see; they lose something (status, skill value, autonomy, a familiar way of working); they were not consulted; they have seen past changes fail; or the change is genuinely flawed. Managers tend to either push harder with more announcements, or quietly let people go back to the old way. Both fail. What works is separating the concerns, being clear about what is fixed and what can still be shaped, asking people to help solve the practical problems, fixing what is fixable quickly and visibly, supporting the learning curve, and then holding a clear expectation once the real concerns have been heard.

<change>
{{change}}
</change>
<resistance>
{{resistance}}
</resistance>
</context>

<task>
1. What the resistance is telling you: a table of each form of pushback, the likely underlying concern (understanding, practical cost, loss, lack of voice, past failures, genuine flaw), and how to check.
2. Fixed versus open: what is decided and why, and what the team can still shape (how, when, details, exceptions). If this is unclear, what to clarify with whoever decided.
3. Listening session: a plan for a team session or one-on-ones to surface concerns, with questions and how to respond without becoming defensive or over-promising.
4. Changes you can make: concrete adjustments within the manager's power (training, timing, workarounds removed, pilots, feedback loops) and concerns to take upward with evidence.
5. Supporting adoption: champions, practical help, measures of adoption, and how to show the team that their input changed something.
6. When it is no longer resistance: how to tell when concerns have been heard and addressed, and how to set and hold a clear expectation with individuals who still do not adopt the change.
</task>

<constraints>
- Use only the facts given; mark gaps [X].
- Do not frame all resistance as negativity; take genuine flaws seriously and escalate them.
- Do not promise to reverse decisions the manager does not control.
- Address individuals' continued non-adoption privately, not in front of the team.
</constraints>

<output_format>
## What the resistance is telling you
Table: Pushback | Likely concern | How to check.
## Fixed versus open
## Listening session
## Changes you can make
## Supporting adoption
## When it is no longer resistance
</output_format>
