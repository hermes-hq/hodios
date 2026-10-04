---
schema: 1
id: plan-acceptance-sampling
kind: prompt
title: Plan acceptance sampling for incoming goods or batches
description: Plans acceptance sampling for incoming goods or production batches with sample size, acceptance number, producer and consumer risks from the operating characteristic curve, and a results record.
category: statistics
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [operations-manager, researcher]
subject: [statistics]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [acceptance-sampling, quality-control, aql, oc-curve, incoming-inspection, lot-inspection]
pairs_with:
  prompts: [build-control-chart, calculate-sample-size, calculate-measurement-uncertainty]
  personas: [statistician]
args:
  - name: lot_size
    description: Number of units in a lot or batch.
    type: number
    required: true
  - name: acceptable_quality
    description: The quality level the plan should accept most of the time, and if known the level it should reject, for example "AQL 1.0% defective; we must reject lots at 5% defective at least 90% of the time".
    type: string
    required: true
  - name: inspection_type
    description: attribute means each unit passes or fails; variable means a measurement is compared with a specification limit.
    type: enum
    enum: [attribute, variable]
    default: attribute
  - name: context
    description: What is inspected and why, the defect definitions, the cost of inspection versus a bad lot getting through, whether testing is destructive, and any standard or customer requirement you must follow.
    type: text
output_contract:
  format: markdown
  sections: [Quality targets, Proposed plan, Operating characteristic, Alternatives, Procedure, Results record, Assumptions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Acceptance sampling decides whether to accept a lot from a sample, so it always carries two risks: rejecting a good lot (the producer's risk, usually set at the acceptable quality level) and accepting a bad one (the consumer's risk, at the rejectable or limiting quality level). Common mistakes: believing an AQL guarantees lots are that good, choosing a sample size by habit ("inspect 10%"), which gives very different protection for small and large lots, sampling only from the top of the pallet, never looking at the operating characteristic curve, and ignoring the switching rules that published sampling standards depend on. Published standards (ISO 2859-1 or ANSI/ASQ Z1.4 for attributes, ISO 3951 or ANSI/ASQ Z1.9 for variables) give tabulated plans, and their current editions must be consulted directly.
</context>

<task>
Plan acceptance sampling for lots of {{lot_size}} units, {{inspection_type}} inspection, with this quality target: {{acceptable_quality}}.
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Quality targets: state the acceptable quality level and the producer's risk (default 5% unless given), and the rejectable quality level and consumer's risk (default 10% unless given). If no rejectable level is given, propose one from the context, mark it as proposed, and explain the trade-off.
2. Proposed plan: for attribute inspection, find a single sampling plan (sample size n and acceptance number c) that meets both risk points, using the hypergeometric distribution when the sample is a large share of the lot and the binomial otherwise; show the calculation of the acceptance probability at both quality levels. For variable inspection, give the known-sigma or unknown-sigma plan structure (sample size and acceptability constant k), the formula for the decision, and the assumption of normality to check.
3. Operating characteristic: a table of the probability of acceptance at five to eight quality levels from 0 to beyond the rejectable level, and the average outgoing quality if rejected lots are fully inspected and defectives replaced.
4. Alternatives: compare with a zero-acceptance-number plan (c = 0), and with the standard's tabulated plan if one applies: name the lot-size range, inspection level and how to look up the code letter, and tell the user to read n and the acceptance number from the current edition rather than trusting a quoted value. Mention double or sequential sampling if inspection is costly or destructive.
5. Procedure: how to draw a random sample across the whole lot (positions, layers, time of production), what counts as a defect (critical, major, minor classes if relevant), what happens to a rejected lot (return, rework, 100% screening, concession), and switching between normal, tightened and reduced inspection if a standard is used.
6. Results record: a template for each lot: lot id, supplier, date, lot size, sample size, defects found by class, decision, inspector, and the running record that drives switching rules.
7. Assumptions to confirm: the defaults you used and what the user must decide.
8. Before you answer, recompute the acceptance probabilities at both risk points and confirm the plan meets them; if it does not exactly, say how close it is and what the next plan up would give.
</task>

<constraints>
- Show the probability calculations so they can be checked; offer a short spreadsheet formula or code snippet that reproduces them.
- Do not quote tabulated plans from a standard as authoritative; tell the user to verify against the current edition.
- Say plainly that acceptance sampling controls the risk of accepting bad lots but does not make lots good; recommend working with the supplier on process control where defects recur.
- If the lot size or quality target is missing or unclear (for example "good quality"), ask for it and stop.
</constraints>

<output_format>
Markdown with the sections in the output contract. The plan as a short block (n, c, risks achieved). The operating characteristic as a table (Lot percent defective | Probability of acceptance). The results record as a table template.
</output_format>
