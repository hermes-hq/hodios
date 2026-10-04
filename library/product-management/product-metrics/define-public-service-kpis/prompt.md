---
schema: 1
id: define-public-service-kpis
kind: prompt
title: Define public service KPIs
description: Defines KPIs for a public or charity service - completion, take-up by channel, cost per transaction, satisfaction, time to outcome and failure demand - split by user group to show who is left out.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, manager, operations-manager, business-analyst]
subject: [public-sector, nonprofit, social-care]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [service-kpis, digital-take-up, cost-per-transaction, completion-rate, digital-inclusion, outcome-measures]
pairs_with:
  prompts: [set-up-failure-demand-tracking, check-kpi-for-perverse-incentives, set-metric-targets-from-baseline]
args:
  - name: service
    description: The service, who it is for, what outcome it exists to achieve (for example "eligible families receive free school meals from the start of term"), and the main steps a user goes through.
    type: text
    required: true
  - name: channels
    description: How people can use the service (online, phone, in person, paper, through an intermediary) and roughly how volume splits between them.
    type: text
    required: true
  - name: available_data
    description: Optional. What data you already have (case system, web analytics, call logs, finance data, surveys, demographic fields) and known gaps.
    type: text
output_contract:
  format: markdown
  sections: [Outcome and users, KPI set, Splits by user group, Data sources and gaps, Baselines and targets, Counter-measures, Reporting routine, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define a small KPI set for a public or charity service. Several governments use a common core of service measures (completion rate, digital take-up, cost per transaction and user satisfaction), but used alone they can reward the wrong thing: pushing people online raises take-up while those who cannot use digital channels fall through, and a high completion rate says nothing about whether people got the outcome.

A good set measures the outcome for everyone. It adds time to outcome and failure demand, splits every measure by user group and channel so exclusion shows up, and pairs each efficiency measure with one for quality or access.
</context>

<task>
<service>
{{service}}
</service>

<channels>
{{channels}}
</channels>

{{#available_data}}
<available_data>
{{available_data}}
</available_data>
{{/available_data}}

1. Restate the outcome in one sentence a user would recognise, and list the user groups, including those likely to struggle (older people, disabled people, people with limited literacy or language, people without devices or data, people in crisis).
2. Propose 6-8 KPIs, each with an exact formula, numerator and denominator, and what "good" moves look like. Start from: completion rate (started to successfully finished, by channel), time to outcome (application to outcome, median and 90th percentile), outcome achieved (share who get the outcome they were entitled to), take-up among the eligible population (where it can be estimated), digital take-up (share of transactions online, reported alongside assisted channel use), cost per transaction (all channels, including staff time), user satisfaction or ease at the end of the journey, and failure demand (share of contacts caused by a failure in the service).
3. Splits: for each KPI, which user groups and channels to split by, and where the data for that split will come from. If demographic data is not collected, propose a light, voluntary way to collect it or a periodic sample.
4. Data sources and gaps: the system for each KPI, how often it can be refreshed, and the gaps.
5. Baselines and targets: how to set a baseline (three to six months of data), and targets that include a floor for the worst-served group, not just an average.
6. Counter-measures: pair each efficiency KPI with a quality or access KPI (digital take-up with assisted-digital outcomes; cost per transaction with repeat contact; time to outcome with error and appeal rate).
7. Reporting: a monthly one-page view, who reviews it, and when a gap between groups triggers action.
</task>

<constraints>
- Do not invent baselines, targets or national benchmarks. Mark unknown values as [X] and say how to get them.
- Do not recommend closing a non-digital channel as a KPI goal.
- Keep personal data collection to what is needed, voluntary where possible, and say to check equality and data protection rules locally.
- If the service outcome or channels are not described, ask for them and stop.
</constraints>

<output_format>
## Outcome and users
One sentence outcome, then bullets of user groups marked "at risk of exclusion" where relevant.

## KPI set
Table: KPI | formula | split by | good direction | paired with.

## Splits by user group
Table: user group | how identified | KPIs split | data source.

## Data sources and gaps
Table: KPI | source | refresh | gap.

## Baselines and targets
How to baseline and the target rule, including the worst-served group floor.

## Counter-measures
Bullets: efficiency KPI and its paired quality or access KPI.

## Reporting routine
Monthly view, audience, action triggers.

## Questions
What to confirm.
</output_format>
