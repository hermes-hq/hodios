---
schema: 1
id: build-prospect-list
kind: prompt
title: Build a prospect list
description: Builds a targeted prospect list from the ideal customer - qualifying criteria, where to find accounts, columns to capture, buying triggers and a priority score before any outreach.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [text, dataset]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: basic
tags: [prospect-list, ideal-customer-profile, lead-scoring, buying-triggers, account-targeting]
pairs_with:
  prompts: [research-prospect-account, write-cold-outreach, qualify-leads, personalize-cold-email-openers]
args:
  - name: offer
    description: What you sell, the price range, and the problem it solves.
    type: text
    required: true
  - name: best_customers
    description: Your best current or past customers - who they are (industry, size, location, role of the buyer), why they bought, how fast, and any who churned or were a bad fit. Paste a short export if you have one.
    type: text
    required: true
  - name: constraints
    description: Optional. Territory, list size you can work, tools or data sources you already have, channels you will use (email, phone, LinkedIn, in person), and any rules from your company.
    type: text
output_contract:
  format: markdown
  sections: [Who belongs on the list, Where to find them, Columns to capture, Buying triggers, Priority score, First list to build]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a seller build a prospect list worth working. Lists usually fail for three reasons: the criteria are too broad ("companies with 50 to 500 employees"), so reply rates collapse; the list is built from whatever a data tool exports, with stale contacts and no reason to reach out now; or nobody ranks it, so the best accounts get the same effort as the worst. Good lists start from the best existing customers: what they have in common that is observable from outside (industry niche, technology used, number of locations, regulation they face, hiring patterns, funding stage, geography), not just size. They then add buying triggers that signal timing (new leader in the buying role, hiring for a related role, expansion, a funding round, a compliance deadline, a competitor's price rise, bad reviews about a problem you solve). Each row records the source and date of every fact so a rep can personalise and so stale data can be refreshed. Contact data must be collected and used lawfully: rules on cold email and calls, and on storing personal data, differ by country, and some data sources ban scraping.
</context>

<task>
Offer:

<offer>
{{offer}}
</offer>

Best customers:

<best_customers>
{{best_customers}}
</best_customers>

{{#constraints}}
Constraints:

<constraints>
{{constraints}}
</constraints>
{{/constraints}}

1. Define who belongs on the list: must-have criteria, nice-to-have criteria and disqualifiers, each observable from outside the company and drawn from the best-customer pattern. Name the buyer role and one or two influencer roles.
2. List where to find matching accounts and how to filter: industry directories, association member lists, review sites, job boards, public registers, event exhibitor lists, the user's own CRM (closed-lost, old leads, customers' peers), and data tools if they have them. Note terms of use and data rules to check.
3. Specify the columns to capture: account, website, criteria fit fields, trigger, trigger source and date, buyer name and role, contact route, personalisation note, priority score, owner and status.
4. List buying triggers for this offer with how to spot each.
5. Design a simple priority score (fit points plus trigger points) with tiers A, B and C and what effort each tier gets.
6. Plan the first list: target size for the capacity given, how many per tier, a weekly refresh routine, and two or three example rows built only from information the user supplied, with other cells left as [to research].
</task>

<constraints>
- Never invent company names, people, contact details or facts about real companies; example rows use only supplied information or placeholders.
- Tell the user to check local rules on cold outreach and personal data (consent, legitimate interest, opt-out, do-not-call lists) before contacting anyone; do not state them as fact.
- Do not suggest scraping sites whose terms forbid it or buying lists of unknown origin.
- Keep criteria specific; push back if the user's ideal customer is so broad that a list would not be targeted.
</constraints>

<output_format>
## Who belongs on the list
Must-have, nice-to-have and disqualifiers as three short lists, then buyer roles.

## Where to find them
Table: Source | What it gives | How to filter | Rules to check.

## Columns to capture
Table: Column | Example or format.

## Buying triggers
Table: Trigger | Why it signals timing | Where to spot it.

## Priority score
Scoring table and tier rules.

## First list to build
Bullets, then the example rows.
</output_format>
