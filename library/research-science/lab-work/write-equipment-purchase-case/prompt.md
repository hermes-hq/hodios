---
schema: 1
id: write-equipment-purchase-case
kind: prompt
title: Write a lab equipment purchase case
description: Writes the case for buying a lab instrument, comparing options on specification, total cost of ownership, usage and alternatives such as core facilities, for a department or funder decision.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, operations-manager]
requires: [none]
inputs: [text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [equipment-purchase, business-case, total-cost-of-ownership, instrument-quotes, core-facility]
pairs_with:
  prompts: [estimate-experiment-reagent-costs, set-up-equipment-booking-rules, plan-instrument-calibration-schedule]
  personas: [lab-manager]
args:
  - name: need
    description: What the instrument is for, who would use it, how often, and what you do now without it (outsourcing, a core facility, borrowing).
    type: text
    required: true
  - name: options
    description: The instruments or quotes you are comparing, with prices, specifications, service contracts, consumables and installation needs as quoted.
    type: text
    required: true
  - name: audience
    description: Who decides and what they care about, for example "department equipment committee, needs shared use" or "grant equipment line". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Need and users, Options compared, Total cost of ownership, Alternatives considered, Risks and requirements, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Equipment committees reject cases that only show the purchase price and a wish list. They want evidence of use (hours per week, how many groups), a fair comparison against renting time at a core facility or outsourcing, and the full cost over the instrument's life: service contracts after warranty, proprietary consumables, software licences, installation (power, bench space, gases, ventilation), training and the staff time to run it. A specification that matches the actual experiments beats the top model, and shared use usually strengthens a case.
</context>

<task>
<need>
{{need}}
</need>

<options>
{{options}}
</options>
{{#audience}}

<audience>
{{audience}}
</audience>
{{/audience}}

1. Summary: the request, the cost and the recommended option in three sentences.
2. Need and users: experiments it enables, expected usage, groups and projects, and what happens without it.
3. Options compared: a table of the key specifications that matter for the stated experiments, not every specification.
4. Total cost of ownership over a stated period (for example five years): purchase, installation, service after warranty, consumables, software, training, staff time. Use only the quoted figures; mark gaps.
5. Alternatives considered: core facility time, outsourcing, refurbished or shared purchase, with their costs if given and their trade-offs (turnaround, access, data control).
6. Risks and requirements: site requirements, who maintains it, booking rules, end-of-life.
7. Recommendation with conditions (for example "subject to confirming the service quote").
</task>

<constraints>
- Use only the prices and specifications provided; never invent a quote, a model name or a feature. Missing numbers are marked "to obtain".
- Do not overstate usage; if usage is an estimate, say so and how it was estimated.
- Keep vendor comparisons factual and based on the quotes.
</constraints>

<output_format>
## Summary
## Need and users
## Options compared
| Criterion | Option A | Option B |
## Total cost of ownership
| Cost item | Option A | Option B |
## Alternatives considered
## Risks and requirements
## Recommendation
</output_format>
