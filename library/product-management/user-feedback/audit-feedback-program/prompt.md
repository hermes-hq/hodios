---
schema: 1
id: audit-feedback-program
kind: prompt
title: Audit a feedback programme
description: Audits how an organisation collects and uses customer feedback - coverage, latency, tagging quality, links to accounts, decisions influenced and loop closure - and lists fixes in order.
category: user-feedback
version: 1.0.0
status: incubating
stage: [review]
role: [product-manager, operations-manager, executive, manager]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [product-ops, voice-of-customer-program, process-audit, health-check, feedback-governance]
pairs_with:
  prompts: [build-feedback-intake-process, design-feedback-tagging-taxonomy, check-feedback-sampling-bias]
  personas: [product-operations-lead]
args:
  - name: program_description
    description: How feedback is collected and used today - channels, tools, who triages, how it reaches roadmap decisions, how customers hear back - and any known problems.
    type: text
    required: true
  - name: metrics
    description: Any numbers you have, such as items per month by channel, untriaged backlog, tag usage, time to triage, share of roadmap items linked to feedback, or a sample of tagged items. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope and evidence, Scorecard, Findings, Root causes, Fixes in order, Measures to track]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit customer feedback programmes for product organisations. Programmes decay quietly: channels multiply, tags drift until "other" is the biggest bucket, items sit untriaged for months, feedback is not linked to accounts so nobody can weigh it, product managers stop reading it because it is noisy, and customer-facing staff stop logging because nothing happens. The useful health dimensions are coverage (which segments and channels are heard, including churned users and non-users), latency (intake to triage to decision), data quality (verbatim, context, consistent tags, duplicates merged), linkage (to accounts, revenue, usage), influence (roadmap decisions that cite feedback), closure (customers and staff told the outcome) and trust (do people still contribute). An audit scores each on evidence, not impressions, and ends with a short ordered list of fixes.

Programme:

<program_description>
{{program_description}}
</program_description>
{{#metrics}}

Metrics:

<metrics>
{{metrics}}
</metrics>
{{/metrics}}
</context>

<task>
1. Define the scope and the evidence available, and list the evidence you would gather to complete the audit (for example a random sample of 50 tagged items re-tagged by a second person, the last two quarters of roadmap items, a short survey of staff who log feedback).
2. Score each dimension (coverage, latency, data quality, linkage, influence, closure, trust) as healthy, at risk or broken, with the evidence for the score and what is unknown. Do not score a dimension as healthy without evidence.
3. Write the main findings: the three to five problems that matter most, each with evidence and its effect on decisions.
4. Find the root causes behind the findings (ownership, tool sprawl, taxonomy, incentives, missing cadence, no feedback to contributors) and show which findings each cause explains.
5. List fixes in order: quick wins for the next 30 days, structural fixes for the quarter, and what to stop doing. Each fix has an owner role, effort, and the finding it addresses.
6. Define measures to track programme health from now on, with a definition and how to collect each.
</task>

<constraints>
- Every score needs evidence or must be marked "unknown".
- Do not invent metrics or benchmarks; label targets as proposals.
- Keep the fix list to what a small team can do; no more than eight fixes.
- Do not recommend buying a tool unless the findings show the tool is the cause.
</constraints>

<output_format>
## Scope and evidence
Bullets, including evidence still to gather.

## Scorecard
A table: dimension | score | evidence | unknowns.

## Findings
Numbered, with evidence.

## Root causes
Bullets linked to findings.

## Fixes in order
A table: fix | horizon | owner | effort | finding addressed.

## Measures to track
A table: measure | definition | how to collect.
</output_format>
