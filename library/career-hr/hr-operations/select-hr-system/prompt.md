---
schema: 1
id: select-hr-system
kind: prompt
title: Select an HR system
description: Turns an organisation's HR processes into requirements for an HR information system, a weighted scorecard, a scripted demo plan and the data-protection and migration questions to put to vendors.
category: hr-operations
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [operations-manager, founder, project-manager]
requires: [none]
inputs: [text]
output: [table, checklist, questions, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hris, vendor-selection, requirements-gathering, scorecard, data-migration]
pairs_with:
  prompts: [plan-hr-annual-calendar, define-hr-metrics]
args:
  - name: organisation
    description: Headcount now and in two years, countries, types of workers (salaried, hourly, contractors), current tools (spreadsheets, payroll provider, other systems) and who will run the system.
    type: text
    required: true
  - name: pain_points
    description: What is going wrong today and which processes the system must handle, for example leave requests, onboarding, documents, performance reviews, time tracking, payroll integration, reporting.
    type: text
    required: true
  - name: shortlist
    description: Vendors you are already considering and the budget per employee per month, if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Requirements, Scorecard, Demo script, Vendor questions, Migration and rollout, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help organisations choose an HR information system the way an experienced HR operations lead does. Selections go wrong when the buyer watches the vendor's polished demo instead of making the vendor run the buyer's own scenarios, when nobody separates must-haves from nice-to-haves, when payroll integration and multi-country support are assumed rather than proven, and when data migration and the admin time to run the system are underestimated. Employee data is personal data: where it is hosted, who at the vendor can access it, how long it is kept and how it is exported at the end of the contract matter as much as features. Price is usually per employee per month with minimums, implementation fees and modules sold separately.

<organisation>
{{organisation}}
</organisation>

<pain_points>
{{pain_points}}
</pain_points>
{{#shortlist}}
<shortlist>
{{shortlist}}
</shortlist>
{{/shortlist}}
</context>

<task>
1. Requirements: turn the pain points and organisation into requirements grouped by process (core records, leave and absence, onboarding and documents, performance, time, payroll integration, reporting, self-service and mobile, security and permissions). Mark each as must-have or nice-to-have and say why. Note requirements driven by headcount growth or multiple countries.
2. Scorecard: weighted criteria (fit to must-haves, usability for employees and managers, payroll and other integrations, multi-country support, data protection, total cost over three years, vendor support and implementation, exit and data export) with weights that sum to 100 and a scoring guide. If a shortlist is given, add columns for each vendor left blank for the buyer to score; do not score vendors yourself.
3. Demo script: five to eight scenarios from the buyer's own processes that every vendor must run live (for example "a part-time employee in a second country requests leave that crosses a public holiday"), with what good looks like.
4. Vendor questions: pricing (minimums, modules, implementation, price rises), data hosting location, sub-processors, security certifications, access controls, retention and deletion, export format at exit, support hours, and references from similar customers.
5. Migration and rollout: what data to migrate and clean first, parallel running with the old process, admin roles, training, and a realistic timeline.
6. Risks and how to reduce them.
</task>

<constraints>
- Do not claim what any named vendor does or costs; you do not have current product or pricing information. Turn those points into questions for the vendor.
- Flag that a data processing agreement and a privacy review are needed before employee data is loaded, with requirements varying by location.
- Keep the requirement list proportional to the organisation's size; do not push an enterprise suite on a 20-person company.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements
Table: Process | Requirement | Must or nice | Why.
## Scorecard
Table: Criterion | Weight | What scores 5 | What scores 1 | then one blank column per shortlisted vendor.
## Demo script
Numbered scenarios with what good looks like.
## Vendor questions
Grouped bullets.
## Migration and rollout
## Risks
</output_format>
