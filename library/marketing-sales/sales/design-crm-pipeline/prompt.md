---
schema: 1
id: design-crm-pipeline
kind: prompt
title: Design a CRM sales pipeline
description: Designs a small team's CRM pipeline - stages defined by buyer actions with exit criteria, required fields per stage, lost reasons and the weekly hygiene rules that keep the data usable.
category: sales
version: 1.0.0
status: incubating
stage: [design]
role: [founder, manager, sales-rep, operations-manager]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [crm-setup, pipeline-stages, exit-criteria, sales-operations, data-hygiene]
pairs_with:
  prompts: [build-sales-playbook, build-crm-pipeline-spreadsheet, review-sales-pipeline, extract-deal-details-to-crm]
args:
  - name: sales_motion
    description: What you sell, deal sizes, typical sales cycle, who buys, how leads come in, team size and roles, and the steps a deal usually goes through today.
    type: text
    required: true
  - name: current_setup
    description: The CRM you use (or plan to), your current stages and fields, and what is going wrong (deals stuck forever, no one updates, forecast is a guess). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Stages, Required fields, Lost reasons, Hygiene rules, Reports to build, Migration steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design CRM pipelines for small sales teams. Most pipelines fail in predictable ways: stages describe the seller's activity ("demo done", "proposal sent") instead of what the buyer has committed to, so deals sit at a stage without real progress; there are too many stages for anyone to tell apart; probabilities are guesses nobody revisits; required fields are either missing (no next step, no close date logic) or so many that reps stop updating; and lost reasons are free text that cannot be analysed. Sales operations people know a pipeline is only as good as its exit criteria, verifiable events like "buyer confirmed budget range" or "decision maker attended demo", and a short weekly routine that keeps stale deals from inflating the forecast.
</context>

<task>
<sales_motion>
{{sales_motion}}
</sales_motion>

{{#current_setup}}<current_setup>
{{current_setup}}
</current_setup>{{/current_setup}}

1. **Stages:** five to seven stages for this motion, each named after the buyer's commitment, with entry criteria, exit criteria phrased as verifiable buyer actions, the typical time a deal should spend there, and a starting win probability to calibrate against your own data after a quarter. Keep lead qualification separate from the deal pipeline if inbound volume is high.
2. **Required fields:** the fields that must be filled to move into each stage (for example next step and date, decision maker, amount, close date, competitor), kept to the minimum that the forecast and analysis need. Use picklists over free text where you will want to report.
3. **Lost reasons:** a short picklist of loss reasons (six to nine), with definitions so reps choose consistently, plus a required short note.
4. **Hygiene rules:** the weekly routine (each rep's review, what makes a deal stale, close dates in the past, missing next steps), who checks, and what happens to deals that break the rules.
5. **Reports to build:** three to five reports or views the manager will actually use weekly (pipeline by stage and age, slipped close dates, conversion by stage, loss reasons).
6. **Migration steps:** how to move existing deals into the new stages without losing history, and how to introduce the change to the team.
</task>

<constraints>
- Fit the design to the motion described; do not import enterprise complexity into a small, short-cycle sale.
- Do not claim features of a specific CRM product; describe what to configure in general terms and tell the user to check how their CRM supports it.
- Label win probabilities as starting assumptions, not benchmarks.
- If the sales motion is unclear (no idea of steps or cycle length), ask the two or three questions needed before designing stages.
</constraints>

<output_format>
## Stages
Table: Stage | Entry criteria | Exit criteria (buyer action) | Expected days | Starting probability.

## Required fields
Table: Field | Type | Required from stage | Why.

## Lost reasons
Table: Reason | Definition.

## Hygiene rules
Bullets with the weekly routine.

## Reports to build
Numbered list with what each answers.

## Migration steps
Numbered list.
</output_format>
