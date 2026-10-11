---
schema: 1
id: write-capital-grant-application
kind: prompt
title: Write a capital grant application for a building or equipment
description: Drafts a capital grant application for building works, a vehicle or equipment, covering readiness, quotes, tenure, permissions, procurement, running costs and how much the asset will be used.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, executive, founder, writer]
requires: [none]
inputs: [text, document]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [capital-grant, equipment-funding, building-project, procurement, running-costs]
pairs_with:
  prompts: [build-grant-budget, plan-grant-match-funding, write-grant-risk-register]
  personas: [grant-writer]
args:
  - name: capital_project
    description: What you want to buy, build or refurbish, why, who will use it and how often, the quotes you have, the site and whether you own or lease it (and for how long), permissions needed, and the timeline.
    type: text
    required: true
  - name: organisation
    description: The organisation, its finances, current use of the space or equipment, and who will manage the project.
    type: text
    required: true
  - name: funder_guidance
    description: The funder's eligibility rules, sections, limits, required quotes, tenure and match requirements, and conditions on the asset. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Readiness check, Application sections, Cost table, Running costs, Conditions to note, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer who has worked on community buildings and equipment bids. Capital funders look for different things from revenue funders. They want to know the project is ready: that the organisation owns the site or has a lease long enough to satisfy their rules, that planning or building permissions are in place or in progress, that costs come from real quotes (often two or three are required), that procurement is fair, and that VAT or sales tax has been handled correctly for the organisation's status. They also want to know the asset will be well used and affordable to run: usage numbers, a maintenance and replacement plan, insurance and the extra running costs after it is built or bought. Many attach conditions such as a charge on the property, a clawback if the asset is sold or stops being used for the purpose, and acknowledgement signage. Contingency for building works is usually expected.

<capital_project>
{{capital_project}}
</capital_project>

<organisation>
{{organisation}}
</organisation>
{{#funder_guidance}}
<funder_guidance>
{{funder_guidance}}
</funder_guidance>
{{/funder_guidance}}
</context>

<task>
1. Readiness check: tenure (ownership or lease length against the funder's rule), permissions (planning, building control, landlord consent, listed status), quotes (number and date), procurement method, VAT or sales tax treatment, match funding, project management, and timeline. Mark each ready, in progress or missing, with what to do.
2. Application sections in the funder's order (or: need for the asset, what will be bought or built, who benefits and how use will grow, readiness, cost and value for money, project management, running and maintenance, environmental impact, risks).
3. Cost table: items with quote source and amount, contingency, professional fees, VAT or tax, other funding, and the amount requested. Check the arithmetic.
4. Running costs: additional annual costs (energy, insurance, maintenance, staffing, depreciation or replacement fund) and how they will be paid.
5. Conditions to note: likely funder conditions on the asset (charge, clawback period, use restrictions, signage) for the board to accept knowingly.
6. Gaps: missing items, marked [NEEDED: ...].
</task>

<constraints>
- Use only quotes and figures given; never invent prices, suppliers or permissions.
- Do not give definitive tax or legal advice on VAT, leases or charges; say what to confirm with an accountant, solicitor or the funder.
- Flag any cost that looks ineligible under the funder's rules.
- Stay within limits and report approximate counts.
</constraints>

<output_format>
## Readiness check
Table: Item | Status | Action.
## Application sections
## Cost table
## Running costs
## Conditions to note
## Gaps
</output_format>
