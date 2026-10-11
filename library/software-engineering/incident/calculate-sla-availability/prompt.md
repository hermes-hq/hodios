---
schema: 1
id: calculate-sla-availability
kind: prompt
title: Calculate availability against an SLA
description: Calculates a period's availability against the SLA text you paste, applying its own downtime definition, exclusions and measurement rules, and shows each step so credits can be checked.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, engineering-manager, support-agent]
stack: []
requires: [none]
inputs: [document, dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sla, availability, uptime, service-credits, downtime]
pairs_with:
  prompts: [define-slos, report-incident-trends, write-incident-update]
args:
  - name: sla_text
    description: The availability clause of the SLA as written, including how downtime is defined, exclusions such as scheduled maintenance, the measurement period and the credit table.
    type: text
    required: true
  - name: outage_records
    description: The incidents or monitoring data in the period, with start and end times, time zone, affected regions or features and the share of requests failing if known.
    type: text
    required: true
  - name: period
    description: The measurement period, for example "October 2026, calendar month, UTC".
    type: string
    required: true
---
<context>
You calculate whether a service met its contractual availability, for either the provider or the customer checking a claim. The number depends entirely on the contract's own definitions, and they vary: downtime may count only full unavailability, or any minute with error rates above a threshold; minutes may be counted per region, per customer or globally; short blips under a minimum duration are often excluded; scheduled maintenance with notice, customer-caused issues and force majeure are usually excluded; the period may be a calendar month with 28 to 31 days. Small definitional choices move the result across a credit tier, so every step must be visible. 99.9% of a 30-day month allows about 43 minutes of downtime; 99.95% about 22.

<sla_text>
{{sla_text}}
</sla_text>

<outage_records>
{{outage_records}}
</outage_records>

Period: {{period}}
</context>

<task>
1. Extract the SLA's rules: the availability target, how a downtime minute is defined, the minimum duration that counts, how partial outages are treated, scope (global, per region, per customer), exclusions, rounding, the measurement period and the credit table. Quote the clause behind each rule.
2. List every ambiguity that changes the result, for example partial degradation when the SLA only defines "unavailable".
3. Convert all records to one time zone and clip them to the period. Merge overlapping windows so no minute is counted twice.
4. Classify each window as counted, excluded (with the clause) or ambiguous.
5. Compute total minutes in the period, counted downtime minutes and availability to three decimal places. If there is an ambiguity, compute the result under each reading.
6. Map the result to the credit tier, and show the downtime budget remaining or exceeded.
7. List what evidence would settle the ambiguous windows and what the claimant usually must do, such as filing within a deadline, if the SLA says so.
</task>

<constraints>
- Apply only the SLA text provided. Do not assume standard terms; if a needed rule is missing, say so and show the result under the reasonable readings.
- Show the arithmetic so anyone can check it.
- Do not invent outage times, credit percentages or claim deadlines.
- This is a calculation, not legal advice on the contract; if the parties dispute the meaning of a clause, say that it needs the contract owner or legal review.
{{> output/uncertainty}}
</constraints>

<output_format>
## Result
Availability, target, met or missed, credit tier, under each reading if ambiguous.
## SLA rules applied
Table: rule | value | quoted clause.
## Ambiguities
Bullets with the effect of each on the result.
## Downtime windows
Table: start | end | minutes | counted, excluded or ambiguous | reason.
## Calculation
Step-by-step arithmetic.
## Evidence and next steps
Bullets.
</output_format>
