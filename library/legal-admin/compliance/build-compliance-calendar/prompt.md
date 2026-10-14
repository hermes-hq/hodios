---
schema: 1
id: build-compliance-calendar
kind: prompt
title: Build a compliance calendar
description: Turns a small organisation's recurring legal and regulatory duties - filings, renewals, reviews, tests, training and reports - into a dated calendar with owners, lead times and evidence to keep.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder, executive]
subject: [law]
requires: [none]
inputs: [text]
output: [table, plan, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [compliance-calendar, recurring-obligations, renewals, regulatory-deadlines, governance]
pairs_with:
  prompts: [build-compliance-checklist, plan-business-tax-calendar, plan-hr-annual-calendar, plan-staff-compliance-training]
  personas: [compliance-officer]
args:
  - name: organisation
    description: The organisation - legal form, country and region, sector, number of staff, premises, whether it handles personal data, food, alcohol, children, vehicles, hazardous materials, client money - and any licences, registrations, certifications or policies it already has.
    type: text
    required: true
  - name: known_duties
    description: Duties and dates you already know about (annual return date, licence renewals, insurance renewal, audit dates, certification surveillance visits). Optional, but they anchor the calendar.
    type: text
  - name: year_start
    description: The month the calendar should start, and the financial year end. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Obligations found, Calendar, Owners and lead times, Evidence log, To confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation stop missing recurring compliance deadlines. Most misses are not ignorance of the law but no owner, no lead time and no reminder: a licence renewal that needs an inspection booked two months earlier, a certification audit that needs evidence gathered all year, or a policy review that slips because nobody owns it. A good calendar groups obligations by source (company law filings, tax, employment, data protection, health and safety, licensing, insurance, sector rules, certifications and contracts), gives each a due date or rule, a lead time, an owner and the evidence that proves it was done. Tax deadlines can sit in a separate tax calendar; this one links to it rather than duplicating it.
</context>

<task>
Organisation:

<organisation>
{{organisation}}
</organisation>
{{#known_duties}}

Known duties and dates:
<known>
{{known_duties}}
</known>
{{/known_duties}}
{{#year_start}}Calendar start and financial year end: {{year_start}}{{/year_start}}

1. Obligations found: list recurring obligations that commonly apply to an organisation like this, grouped by source, each marked "known" (from the user), "likely" (common for this type, to confirm) or "check if applicable". Do not invent precise statutory dates; express unknown ones as rules ("within [X] months of year end, verify").
2. Calendar: a month-by-month table with the obligation, due date or rule, the action month (due date minus lead time), the owner role, and a link to the evidence.
3. Owners and lead times: for each obligation, the owner role, a backup, the lead time and why (booking inspections, gathering evidence, board approval).
4. Evidence log: a simple format to record completion and where the proof is kept.
5. To confirm: a list of items to verify with an accountant, lawyer, licensing authority or insurer, ordered by risk of missing them.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Only "known" items may carry specific dates. All other dates must be rules or [BRACKETS] marked "verify".
- Do not invent licence types, authorities or penalties.
- Keep the calendar practical: one owner per item, realistic lead times, no duplicated tax deadlines if a separate tax calendar exists.
- Recommend confirming the list with a professional adviser at least once, and after any change in activities, size or location.
{{> output/uncertainty}}
</constraints>

<output_format>
## Obligations found
Table: source | obligation | status (known, likely, check) | due date or rule.

## Calendar
Table: month | obligation | due | action by | owner.

## Owners and lead times
Table: obligation | owner | backup | lead time | reason.

## Evidence log
Template table.

## To confirm
Numbered list, highest risk first.
</output_format>
