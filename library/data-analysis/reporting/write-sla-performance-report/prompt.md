---
schema: 1
id: write-sla-performance-report
kind: prompt
title: Write an SLA performance report
description: Writes a service level report for a client or internal customer, measuring each SLA exactly as the contract defines it, with breaches, causes, any service credits and the fixes agreed.
category: reporting
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, support-agent, manager, consultant]
inputs: [dataset, document, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [service-levels, sla, client-reporting, service-credits]
pairs_with:
  prompts: [write-service-level-terms-for-contract-clients, set-scorecard-status-thresholds, write-data-correction-notice]
args:
  - name: sla_terms
    description: "The service level definitions as written in the contract or agreement: each measure, how it is calculated, exclusions (planned maintenance, client-caused delays), measurement window, target and any credit or penalty rules."
    type: text
    required: true
  - name: performance_data
    description: "The period's raw or summarised performance data: tickets or incidents with priority, timestamps and status, uptime records, delivery records, plus notes on major incidents."
    type: text
    required: true
  - name: audience
    description: Who reads it (client account manager, client executive, internal service owner) and the tone wanted. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, SLA scorecard, Breaches and causes, Service credits, Improvement actions, Measurement notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An SLA report is read against the contract, so the numbers must be computed exactly the way the contract defines them, not the way the ticketing tool happens to show them. The common disputes come from small definitional choices: business hours versus calendar hours, whether the clock pauses while waiting on the client, how priority changes mid-ticket are handled, whether planned maintenance counts as downtime, rounding (99.94% is not 99.95%), and the measurement window. Experienced service managers report the attainment percentage and the individual breaches behind it, own the breaches caused by their side, are open about credits due, and show the trend so one good month does not hide a slide. Averages hide the long tail that clients feel, so time-based SLAs should also show the worst cases or a high percentile.

{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
<sla_terms>
{{sla_terms}}
</sla_terms>

<performance_data>
{{performance_data}}
</performance_data>

1. Restate how each SLA is measured under the terms, including clock rules and exclusions. List any point where the terms are ambiguous and the interpretation you used.
2. Compute attainment for each SLA for the period, showing the counts behind each percentage (met, missed, excluded and why). For availability SLAs, compute allowed versus actual downtime in minutes.
3. List every breach with the item, the target, the actual, the cause category (our side, client side, third party) and the evidence.
4. Apply any service credit rules exactly as written and show the calculation; if the rules are unclear, show the possible readings and flag them for the contract owner.
5. Show the trend against previous periods if supplied, and the long tail for time-based measures (worst cases or 90th percentile).
6. Propose improvement actions for recurring breach causes, with owner and date.
</task>

<constraints>
- Compute only from the data given and show the numerator and denominator for every percentage.
- Never round attainment upward across a threshold; report to the precision the contract uses.
- Exclusions must be justified item by item; do not exclude breaches to improve the figure.
- Do not interpret the legal effect of the contract beyond applying its stated formulas; flag disputes for the contract owner.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three sentences: SLAs met and missed, the main cause, credits due.

## SLA scorecard
Table: SLA | Target | Actual | Met / missed / excluded | Status | Previous period.

## Breaches and causes
Table: Item | SLA | Target | Actual | Cause category | Note.

## Service credits
Calculation, or "None due".

## Improvement actions
Table: Action | Breach cause addressed | Owner | Date.

## Measurement notes
Bullets: interpretations used and ambiguities to settle.
</output_format>
