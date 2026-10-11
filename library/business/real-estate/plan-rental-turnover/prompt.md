---
schema: 1
id: plan-rental-turnover
kind: prompt
title: Plan a rental turnover between tenants
description: Plans the changeover between tenants as a dated schedule from notice to new move-in, overlapping marketing with works to cut the empty period, with a ready-to-let checklist.
category: real-estate
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, operations-manager]
subject: [real-estate]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [landlord, void-period, make-ready, re-letting, scheduling]
pairs_with:
  prompts: [write-rental-listing, write-property-inspection-report, set-up-rental-maintenance-process]
  personas: [property-manager]
args:
  - name: turnover
    description: Current tenant's move-out date, monthly rent, property type and age, known condition and works needed (paint, cleaning, repairs, appliance replacement), contractors available and their lead times, and whether viewings can happen before the tenant leaves.
    type: text
    required: true
  - name: country
    description: Country or region, for notice and access rules and the safety checks usually due between tenancies. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Cost of each empty day, Turnover schedule, Works plan, Ready-to-let checklist, Risks to the date]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan a turnover the way an experienced property manager runs one: as a project with a critical path, not a to-do list. The empty period is usually the largest avoidable cost of a rental. The tricks that shorten it are known: start marketing when notice is given, with viewings during the last weeks of the tenancy if the lease and local rules allow and the outgoing tenant gets proper notice; do a pre-move-out visit to scope works and order long-lead items before the keys come back; book trades in the right order (repairs, then decoration, then flooring, then the clean, then safety checks and photos); and set the new tenancy start date only after the works plan is credible. Cutting corners on safety checks or the check-in inventory to save a day costs far more later.

<turnover>
{{turnover}}
</turnover>
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
1. Calculate the cost of each empty day (monthly rent times 12 divided by 365) and of a one-week, two-week and four-week void, so trade-offs are concrete.
2. Build a dated schedule from today to the target new move-in: notice confirmation, pre-move-out inspection, marketing start, viewings window, move-out and check-out inspection, works in sequence, final clean, safety checks, photos, check-in. Show which tasks overlap and which are on the critical path.
3. Write the works plan: each job, trade, lead time, order dependency, rough duration, and who supplies materials. Flag any job that could be done while the tenant is still in with their agreement, and long-lead items to order now.
4. Write a ready-to-let checklist: repairs signed off, clean, smoke and carbon monoxide alarms tested, gas, electrical and other safety certificates current where required, meters read, keys and fobs counted, manuals and welcome information in place, photos and check-in inventory done.
5. List the risks to the target date and a fallback for each (contractor no-show, worse condition than expected, deposit dispute delaying works evidence).
</task>

<constraints>
- Use only the dates, rent and works given. Where a lead time is missing, state the assumption and mark it.
- Viewings and pre-move-out access only with the notice the lease and local law require and with respect for the outgoing tenant; never suggest entering without it.
- Before any works that would change the condition, the check-out inspection must be done and photographed, so deposit evidence is preserved.
- Mark safety-check requirements as `[CHECK locally]` rather than stating the law.
- Keep it practical: one page of schedule, not a narrative.
</constraints>

<output_format>
## Cost of each empty day
Per day and for one, two and four weeks.

## Turnover schedule
Table: date, task, owner, depends on, critical path yes or no.

## Works plan
Table: job, trade, lead time, sequence, duration, materials.

## Ready-to-let checklist
Checkboxes.

## Risks to the date
Bullets: risk, fallback.
</output_format>
