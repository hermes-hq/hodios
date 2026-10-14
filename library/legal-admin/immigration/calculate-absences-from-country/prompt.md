---
schema: 1
id: calculate-absences-from-country
kind: prompt
title: Calculate absences from the country
description: Builds a travel history from the dates someone gives and counts days spent outside the country per rolling or calendar period, to check against residence requirements for settlement or citizenship.
category: immigration
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text, dataset]
output: [table, report, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [absence-calculation, travel-history, continuous-residence, settlement, day-counting]
pairs_with:
  prompts: [prepare-citizenship-application, prepare-permit-renewal]
  workflows: [permanent-residence-track]
args:
  - name: trips
    description: Each trip abroad with departure and return dates (passport stamps, boarding passes, booking emails or calendar entries), one per line. Mark dates you are unsure of.
    type: text
    required: true
  - name: rule
    description: The absence rule you need to check against, copied from the official guidance if you have it (for example "no more than 180 days in any 12-month period", "no more than 450 days in the 5 years before applying"), and the qualifying period start and end dates.
    type: text
    required: true
  - name: counting_method
    description: How the official guidance says to count days, if stated (for example whether departure and arrival days count as absences). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Trip table, Totals against the rule, Peak periods, Gaps and uncertain dates, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Settlement and citizenship applications are often refused on absences, and the errors are arithmetic and method, not law: counting the wrong way (whether departure and return days count as days abroad differs by country and route), checking calendar years when the rule uses any rolling 12-month period, forgetting short trips, mixing up the qualifying period's start date, and relying on memory when passport stamps, airline records or employer travel logs exist. Officers often have entry and exit data, so the applicant's list must be complete and honest. The rule itself (limits, periods, exceptions for compelling reasons) comes from the official guidance the user supplies; your job is the careful count.

<trips>
{{trips}}
</trips>

<rule>
{{rule}}
</rule>
{{#counting_method}}
<counting_method>
{{counting_method}}
</counting_method>
{{/counting_method}}
</context>

<task>
1. Assumptions: state the counting method you will use. If the guidance does not say, count whole days outside the country excluding the departure and return days, say that this is an assumption, and show the alternative total that counts them so the user can confirm. Confirm the qualifying period's dates.
2. Trip table: each trip with departure, return and days absent under the chosen method; sort by date; flag overlapping or impossible dates and trips partly outside the qualifying period (count only the days inside it).
3. Totals against the rule: totals for the whole qualifying period and per the rule's period. For a rolling rule, check every 12-month window (or the rule's window) and report the worst window with its start and end dates. Say plainly whether each total is under or over the limit as given, as arithmetic, not as eligibility.
4. Peak periods: the windows closest to the limit and the earliest date when the user would be under the limit if they are over now.
5. Gaps and uncertain dates: trips with uncertain dates and how much they could change the result; records to check (passport stamps, airline accounts, employer travel records, official entry and exit records where available).
6. Questions for an adviser, including whether any absence could be treated as exceptional and what evidence that needs.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Count carefully and show the day count for every trip so it can be checked.
- Use only the rule given. Do not supply absence limits from memory; if none is given, do the count and ask for the rule.
- Do not say the person is eligible; say how the count compares with the rule as given.
- Never suggest leaving out trips.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
## Trip table
Table: # | Departure | Return | Days absent | Inside qualifying period | Note.
## Totals against the rule
## Peak periods
## Gaps and uncertain dates
## Questions for an adviser
</output_format>
