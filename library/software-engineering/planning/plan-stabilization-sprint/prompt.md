---
schema: 1
id: plan-stabilization-sprint
kind: prompt
title: Plan a stabilisation sprint
description: Plans a time-boxed stabilisation period after a run of bad releases or incidents, with entry rules, prioritised fixes by user impact, exit criteria and how to stop needing another.
category: planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [engineering-manager, tech-lead, sre]
stack: []
requires: [none]
inputs: [text, notes, logs]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [stabilization, reliability, quality-recovery, feature-freeze, bug-triage]
pairs_with:
  prompts: [plan-bug-bash, assess-technical-debt, audit-postmortem-action-items]
args:
  - name: situation
    description: What has been going wrong - incidents, rollbacks, bug counts, customer complaints - and over what period.
    type: text
    required: true
  - name: length
    description: How long the stabilisation period can last.
    type: string
    default: 2 weeks
  - name: team
    description: Team size and any work that cannot pause, such as contractual deliveries or on-call.
    type: string
output_contract:
  format: markdown
  sections: [Why and goal, Rules for the period, Prioritised work, Exit criteria, Communication, Preventing the next one]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A stabilisation sprint (also called a hardening or quality sprint) pauses most feature work to bring a product back to a trustworthy state. It goes wrong when it becomes a vague "fix bugs" fortnight: the team picks the easiest tickets, features creep back in, and a month later the same causes produce the same incidents. A useful one has a measurable goal tied to what users felt, works on the causes behind several failures (flaky deploys, missing tests in a hot area, alert noise) rather than single symptoms, protects the time from new feature requests, and ends with explicit criteria and changes to the normal process so it is not needed again.
</context>

<task>
<situation>
{{situation}}
</situation>
Length: {{length}}.
{{#team}}
Team: {{team}}
{{/team}}

1. State why the period is needed in two sentences and set a measurable goal tied to user impact, for example change failure rate, crash-free sessions, open severe bugs or incidents per week.
2. Set the rules for the period: what is frozen, what may continue, who can grant an exception, and how on-call and urgent requests are handled.
3. Build the prioritised work list, grouping symptoms into underlying causes. Rank by user impact and recurrence, and include fixes to the delivery system (tests, deploy safety, alerting) where they caused failures.
4. Define exit criteria that are measured, not "the list is done", plus what happens to unfinished items.
5. Plan communication: a note to stakeholders on why features pause and what they get, and a short daily or twice-weekly progress update.
6. List the process changes that would prevent the next stabilisation sprint, such as a quality budget per sprint, a change to the definition of done, or an error budget policy.
</task>

<constraints>
- Do not invent metrics or baselines; use the numbers given or mark where to measure first.
- Keep feature work frozen except named exceptions; say who decides.
- Do not promise the period will fix everything; state what it will not cover.
- Fit the plan to the stated length and team.
</constraints>

<output_format>
## Why and goal
Two sentences and the measurable goal.
## Rules for the period
Bullets.
## Prioritised work
Table: cause | symptoms it explains | fix | impact | size.
## Exit criteria
Checklist.
## Communication
Bullets plus a short stakeholder note.
## Preventing the next one
Bullets.
</output_format>
