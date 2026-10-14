---
schema: 1
id: write-gap-analysis-report
kind: prompt
title: Write a gap analysis report
description: Writes a gap analysis comparing the current state with a target, standard or requirement, with each gap evidenced, rated by impact and effort, and turned into a prioritised action plan.
category: business-writing
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [consultant, business-analyst, operations-manager, manager]
requires: [none]
inputs: [notes, document, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gap-analysis, current-vs-target, readiness-assessment, impact-effort, action-plan]
pairs_with:
  prompts: [write-consulting-report, write-executive-summary, write-project-proposal]
args:
  - name: target
    description: What you are measuring against, such as a standard's requirements, a policy, a strategy goal, a capability model or a competitor benchmark. Paste or summarise the requirements.
    type: text
    required: true
  - name: current_state
    description: What exists today, with evidence, such as documents, interview notes, data, observations and what is planned already.
    type: text
    required: true
  - name: constraints
    description: Deadline, budget, team capacity or anything that limits the action plan. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Gap analysis, Evidence limits, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A gap analysis answers "where are we against where we need to be, and what do we do first?". It is used before certification audits, new regulations, system changes, strategy plans and capability building. Consultants and quality managers know where it goes wrong: the target is described loosely so gaps are opinions; the current state is taken from what people say rather than evidence; every requirement is reported at the same level of detail so the important gaps drown; "partially met" hides how far off something is; and the action plan ignores dependencies and capacity. A useful gap analysis breaks the target into checkable requirements, states the evidence for each status, rates gaps by impact and effort, and sequences actions so quick wins and dependencies are visible.
</context>

<task>
Write a gap analysis.

<target>
{{target}}
</target>

<current_state>
{{current_state}}
</current_state>
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. If either the target or the current state is missing, ask in one short message and stop.
2. Break the target into numbered requirements, using its own numbering if it has any.
3. For each requirement: current state, status (met, partly met, not met, unknown), the evidence and whether it was seen (document, data, observation) or reported (interview), and the gap described specifically. Unknown is not the same as not met.
4. Rate each gap: impact (high, medium, low, with the reason, such as compliance, customer, cost or safety) and effort (high, medium, low).
5. Summary: overall readiness, counts by status, the three to five most important gaps, and themes (common causes across gaps).
6. Action plan: actions grouped into now (high impact, low effort, or blocking others), next, and later, with owner role and timing, respecting the constraints and dependencies.
7. List the limits of the evidence and what further checks would raise confidence.
</task>

<constraints>
- Use only the information given. Never invent requirements, evidence, or the content of a standard or regulation; if the target is a named standard that is only named and not supplied, ask for its requirements or mark them `[NEEDED: requirement text]`.
- Distinguish evidence seen from statements made.
- Do not claim certification or compliance readiness; describe readiness against the requirements as supplied.
- Main report under about 1,500 words; the requirement table can be longer.
</constraints>

<output_format>
## Gap analysis
Summary; Scope and method; Requirement table (# · Requirement · Current state · Status · Evidence · Gap · Impact · Effort); Themes; Action plan (table: Phase · Action · Requirements addressed · Owner · Timing · Depends on).
## Evidence limits
Where the analysis is weakest and how to strengthen it.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
