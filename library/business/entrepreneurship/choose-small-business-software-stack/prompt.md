---
schema: 1
id: choose-small-business-software-stack
kind: prompt
title: Choose software for a new business
description: Chooses the starter software for a new business - payments, invoicing and accounting, booking or online store, customer list and email - sized to budget, skills and the next two years of growth.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
requires: [none]
inputs: [text]
output: [table, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [business-tools, saas-selection, accounting-software, booking-system, tool-sprawl]
pairs_with:
  prompts: [plan-online-store, automate-business-workflow, estimate-startup-costs]
  personas: [small-business-advisor]
args:
  - name: business
    description: What the business sells and how - in person, online, by appointment, by invoice - the country, team size now and in a year, and expected number of customers or orders a month.
    type: text
    required: true
  - name: preferences
    description: Monthly software budget, devices you use, tools you already know or pay for, your accountant's preferred software if any, and anything you hate doing by hand. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Jobs the software must do, Recommended setup, Selection checklist, Setup order, Monthly cost and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help new business owners set up their first software. The two common failures are tool sprawl (a dozen subscriptions that do not talk to each other, each holding part of the customer data) and outgrowing a free tool within months and migrating painfully. A sensible starter setup covers a few jobs well: taking payment, invoicing and bookkeeping that an accountant can work with, the sales channel itself (booking system, online store or point of sale), a single customer list, email or messaging, and file storage. The best choice usually favours an all-in-one tool where the business fits its pattern, local tax support in accounting, data export, and integrations between payments, sales and accounting.

<business>
{{business}}
</business>
{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}
</context>

<task>
1. List the jobs the software must do for this business, ranked by importance, and the jobs that can stay manual for now (a spreadsheet or paper is fine).
2. Recommend a setup by tool category, not brand: what each tool does, whether an all-in-one tool could cover several jobs, and how they connect. Where the founder named tools they already use, assess them against the jobs.
3. Give a selection checklist to compare options in each category: local tax and invoicing compliance, payment fees structure, data export, integrations with the other tools, user seats and price at the next size, support hours, offline use if relevant, and what the accountant can work with.
4. Setup order: what to set up before the first sale, in the first month and later.
5. Monthly cost and review: a budget line per category to fill in from real quotes, and a rule for when to review (for example at a customer or staff threshold).
</task>

<constraints>
- Do not recommend specific brands as the answer or quote their prices; describe categories and criteria so the founder can compare current options in their country. If the founder asks about named tools, compare them only on the criteria they can verify.
- Accounting and invoicing must meet local tax rules; tell the founder to confirm the choice with their accountant or tax authority guidance.
- Keep the setup as small as the business allows; justify every paid tool.
- Mention data protection basics (who has access, backups, two-factor login) briefly.
</constraints>

<output_format>
## Jobs the software must do
Table: Job | Importance | Tool needed now or manual for now.
## Recommended setup
Table: Category | What it does here | Connects to | Notes.
## Selection checklist
Checklist grouped by category.
## Setup order
## Monthly cost and review
</output_format>
