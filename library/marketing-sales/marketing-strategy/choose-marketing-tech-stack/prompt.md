---
schema: 1
id: choose-marketing-tech-stack
kind: prompt
title: Choose a marketing tool stack for a small team
description: Chooses the marketing tools a small team needs (CRM, email, analytics, forms, scheduling, social, ads tracking) by job to be done, integration, data ownership and cost, and says what to skip.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, operations-manager]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [martech, marketing-tools, crm-selection, tool-consolidation, data-ownership]
pairs_with:
  prompts: [define-marketing-kpis, plan-marketing-team-structure, write-marketing-sales-sla]
  personas: [fractional-cmo]
args:
  - name: business_and_team
    description: What the business sells and how (online, sales-led, local), team size and technical skill, and the marketing activities you actually run each week.
    type: text
    required: true
  - name: current_tools
    description: Tools you use now, what each costs per month, what annoys you, and data that lives in spreadsheets or inboxes.
    type: text
    required: true
  - name: budget
    description: Monthly budget for tools, and any must-haves or constraints (region for data hosting, existing website platform, accounting software). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommended stack, Jobs to cover, Options by job, Integration and data flow, What to skip or cancel, Migration plan, Checks before buying]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing operations consultant for small teams. Small teams buy tools for features they will never use, run five tools that each hold part of the customer record, and end up with no single answer to "where did this customer come from". A good stack starts from the weekly jobs (capture leads, store contacts and deals, send email, publish, schedule meetings, measure), chooses one system of record for contacts, prefers fewer tools that integrate natively over many that need fragile automation, and checks that the business can export its data. Price at the current tier is misleading: check the price at the contact count or seats expected in 18 months. Product names and prices change often, so recommendations are stated as categories with examples to verify, not as current facts.
</context>

<task>
<business_and_team>
{{business_and_team}}
</business_and_team>

<current_tools>
{{current_tools}}
</current_tools>

{{#budget}}
<budget>
{{budget}}
</budget>
{{/budget}}

1. If you cannot tell what marketing activities the team runs, ask up to three questions and stop.
2. Jobs to cover: list the jobs the stack must do now, and the ones that can wait. Mark which job holds the system of record for contacts.
3. Options by job: for each job, the type of tool (all-in-one suite versus best-of-breed), two or three example products to evaluate, and the selection criteria that matter here (integration with the system of record, ease for this team, pricing at expected scale, data export, data hosting region if relevant). Say that prices and features must be checked on the vendor's site.
4. Integration and data flow: how a lead moves from first touch to customer across the tools, which fields carry source and campaign, and where reporting comes from.
5. What to skip or cancel: overlapping tools in the current list, features already covered elsewhere, and tools to postpone until a named trigger.
6. Migration plan: order of changes, data export and clean-up, a parallel-run period, and who owns the stack.
7. Checks before buying: trial with real data, contract length and exit terms, price at 18-month scale, user permissions, privacy and consent features for the user's region.
</task>

<constraints>
- Do not state current prices or feature lists as fact; name example products and tell the user to verify.
- Keep total cost within the stated budget or say clearly that it cannot fit and what to drop.
- Prefer fewer tools; justify each one by a weekly job.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommended stack
A table: Job | Tool type | Examples to evaluate | Why.

## Jobs to cover

## Options by job

## Integration and data flow

## What to skip or cancel

## Migration plan

## Checks before buying
</output_format>
