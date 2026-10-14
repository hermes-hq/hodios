---
schema: 1
id: write-customer-support-report
kind: prompt
title: Write a monthly customer support report
description: Writes a monthly support report for stakeholders with contact rate, response and resolution times, CSAT, backlog, top contact drivers and the fixes requested from other teams.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [support-agent, manager, operations-manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [support-metrics, csat, contact-drivers, first-response-time, repeat-contacts]
pairs_with:
  prompts: [analyze-contact-centre-data, write-voice-of-customer-report, write-sla-performance-report, write-monthly-business-review]
args:
  - name: support_data
    description: "The month's helpdesk figures: contacts by channel, response and resolution times (median and 90th percentile if available), reopen rate, CSAT with response count, backlog size and age, contact reasons with counts, and previous months."
    type: text
    required: true
  - name: business_volume
    description: "The demand base to normalise against: orders, active customers or active users this month and last. Optional but strongly recommended."
    type: text
  - name: context
    description: "Team size and hours, launches or incidents this month, service targets, and who reads the report (support lead, product, executives). Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Volume and demand, Speed and quality, Top contact drivers, Requests to other teams, Team and capacity, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A useful support report shows whether customers are getting help fast and well, and what the rest of the company should fix so they need less help. Support leads know that raw ticket volume rises with growth, so the honest demand measure is contact rate: contacts per 1,000 orders or per 100 active customers. Response and resolution times are skewed, so medians and the 90th percentile tell the truth where averages do not, and business-hours and calendar-hours clocks give very different numbers. A fast first response that does not resolve anything shows up as a high reopen or repeat-contact rate. CSAT is answered by a minority, often the very happy and the very unhappy, so report the response count and rate beside the score, and look at CSAT by contact reason, because a policy customers dislike scores badly however good the agent was. Backlog age matters more than backlog size. The most valuable section is the contact drivers: the top reasons, their share, the trend, and which ones another team could remove through a product fix, clearer copy or self-service.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<support_data>
{{support_data}}
</support_data>

{{#business_volume}}<business_volume>
{{business_volume}}
</business_volume>{{/business_volume}}

1. Report contact volume by channel and, if business volume is given, the contact rate and its trend; say whether volume moved because of demand or because of contact rate.
2. Report first response and resolution times as median and 90th percentile where available, naming the clock (business or calendar hours), against target and last month.
3. Report quality: reopen or repeat-contact rate, CSAT with response count and rate, and CSAT by contact reason where the data allows.
4. Rank the top contact drivers by volume with share and trend, and mark which are avoidable by a product, policy, content or self-service change.
5. Turn the avoidable drivers into specific requests to named teams, each with the ticket count that justifies it and the expected reduction stated as an estimate.
6. Summarise backlog size and age and whether staffing matched demand.
</task>

<constraints>
- Compute only from the data given; show counts behind percentages.
- Do not present an average time without the median, and do not mix business-hours and calendar-hours figures.
- Do not treat CSAT as representative without the response rate; say when the sample is too small to compare months.
- Do not name or rank individual agents in a stakeholder report.
- Do not invent contact reasons or estimated savings; label estimates as estimates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: demand, speed, quality, the top avoidable driver and the main ask.

## Volume and demand
Table: Channel | Contacts | Last month | Change | Contact rate. One sentence on demand versus rate.

## Speed and quality
Table: Measure | Median | 90th percentile | Target | Last month. Then CSAT with response count, and reopen rate.

## Top contact drivers
Table: Driver | Contacts | Share | Trend | Avoidable? | CSAT.

## Requests to other teams
Table: Request | Team | Driver | Contacts this month | Expected effect.

## Team and capacity
Backlog size and age, staffing against demand, notable incidents.

## Data notes
Bullets: clock used, tagging gaps, CSAT sample, anything not comparable.
</output_format>
