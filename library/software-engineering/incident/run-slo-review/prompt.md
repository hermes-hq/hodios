---
schema: 1
id: run-slo-review
kind: prompt
title: Run a monthly SLO and error budget review
description: Runs a recurring SLO and error budget review from the period's data, deciding on reliability work, alert changes and SLO adjustments, each with an owner.
category: incident
version: 1.0.0
status: incubating
stage: [operate, review]
role: [sre, engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [slo, error-budget, reliability-review, burn-rate, sli]
pairs_with:
  prompts: [define-slos, report-incident-trends, design-alerting-rules, audit-postmortem-action-items]
  personas: [site-reliability-engineer]
args:
  - name: slo_data
    description: For each SLO in the period - the SLI definition, target, window, achieved value, budget consumed, and the biggest budget-burning events with dates. Paste as a table or text.
    type: text
    required: true
  - name: context
    description: Optional - incidents in the period, releases and changes, the error budget policy if any, alerts that fired for these SLOs, and customer complaints that did not show up in the SLIs.
    type: text
output_contract:
  format: markdown
  sections: [Summary, SLO status, Where the budget went, Signal quality, Decisions, Actions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a recurring SLO review with a team. SLOs only change behaviour if someone looks at them regularly and decides something. The review asks: did we meet each objective, where did the budget go, does the SLI still match what users feel, are the alerts tied to it working, and what will we do differently. Experts read budget consumption, not just pass or fail: a service that met its SLO but burned 90% of its budget in one incident is fragile. They attribute budget to causes (a deploy, a dependency, a capacity limit, a planned maintenance counted wrongly) because the fix depends on the cause. They check the SLI itself: customer complaints while the SLI was green mean it measures the wrong thing; an SLO that is always met with budget to spare may be too loose or measured too generously (counting health checks, excluding failures at the load balancer). A good error budget policy turns this into decisions: slow releases or prioritise reliability work when budget is exhausted, spend spare budget on faster delivery or planned risk.
</context>

<task>
<slo_data>
{{slo_data}}
</slo_data>
{{#context}}
<context_details>
{{context}}
</context_details>
{{/context}}

1. Summary: three to five lines on overall reliability this period, for an engineering manager.
2. SLO status: for each SLO, target, achieved, budget consumed, trend against previous periods if given, and a one-word state (healthy, at risk, exhausted).
3. Where the budget went: attribute burned budget to events and causes, with the share per cause; mark attributions that are inferred.
4. Signal quality: SLIs that did not reflect user pain (complaints with green SLI, or red SLI with no user impact), alerts that fired late, never fired, or fired without budget burn.
5. Decisions: per SLO, apply the error budget policy if one exists (or propose one), and decide between keeping, tightening, loosening or redefining the SLO, with the reason.
6. Actions: concrete reliability work, alert changes and SLI fixes, each with an owner placeholder and due date placeholder; at most five.
</task>

<constraints>
- Compute budget figures only from the data given; show the arithmetic where you derive a number.
- Do not recommend tightening an SLO without evidence that users need it; do not loosen one only because it was missed.
- Planned maintenance counts against budget unless the SLO definition excludes it; say which applies.
- Keep the actions few and specific; no generic "improve monitoring".
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Short paragraph.

## SLO status
Table: SLO | Target | Achieved | Budget used | State.

## Where the budget went
Table: Event or cause | Date | Budget share | Notes.

## Signal quality
Bullets.

## Decisions
Per SLO, decision and reason.

## Actions
Table: Action | Owner | Due | Linked SLO.
</output_format>
