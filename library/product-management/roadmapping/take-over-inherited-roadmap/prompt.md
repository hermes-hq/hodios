---
schema: 1
id: take-over-inherited-roadmap
kind: prompt
title: Take over an inherited roadmap
description: Helps a product manager who has inherited a roadmap find what is really committed, who promised what, what is stale or unfunded, and plan the first 30 days before changing anything.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, review]
role: [product-manager, engineering-manager, manager]
requires: [none]
inputs: [document, notes, text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [new-role, handover, roadmap-audit, commitments, first-30-days]
pairs_with:
  prompts: [audit-customer-commitments, critique-roadmap, plan-stakeholder-alignment, roadmap-reset-track]
args:
  - name: roadmap
    description: The roadmap you inherited, in whatever form it exists (slides, tracker export, spreadsheet), plus any handover notes.
    type: text
    required: true
  - name: situation
    description: How you came to own it (new job, reorg, predecessor left), the team, your manager's expectations, and anything you have already heard from stakeholders.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [First read, Item inventory, Questions to answer, Who to talk to, First 30 days, What not to do yet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a product manager who has just inherited a roadmap from someone else. The document they receive is rarely the real plan: some items were promised to customers or executives in conversations nobody wrote down, some are already half built, some have quietly lost their sponsor, and some were never funded. New owners fail in two ways: they rewrite the roadmap in week two and break promises they did not know existed, or they defend it unchanged for months and own a plan they do not believe in. The better path is to find out what each item really is (committed, in progress, aspirational, dead), who cares about it and why, then change the plan openly once the facts are clear, usually within the first month or two.
</context>

<task>
Inherited roadmap:

<roadmap>
{{roadmap}}
</roadmap>

Situation:

<situation>
{{situation}}
</situation>

1. Give a first read: what the roadmap seems to be trying to achieve, how current it looks, and the obvious warning signs (no outcomes, stale dates, items with no owner, overload).
2. Build an item inventory. For each item, record what is known and unknown: status (not started, in progress, shipped but not announced), evidence of a commitment (to a customer, executive, partner or contract), sponsor, size, and your initial classification: likely committed, in progress, aspirational, or likely dead.
3. List the questions to answer per item and overall, worded so they can be asked directly, for example "Has anyone outside the team been told a date for this?"
4. List who to talk to (predecessor, engineering lead, sales, support, key executives, a few customers) and what to ask each.
5. Lay out a first-30-days plan by week: learn, verify commitments, form a view, then propose changes with the evidence.
6. List what not to do yet, such as public date changes or cancelling items before checking for commitments.
</task>

<constraints>
- Work only from what the user provided. Mark every classification as provisional until verified; never assume an item is safe to drop.
- Do not invent customers, contracts or promises. Where the material hints at one, flag it to verify.
- Keep the tone respectful of the predecessor; the aim is understanding, not blame.
{{> output/uncertainty}}
</constraints>

<output_format>
## First read
Short paragraph and bullets of warning signs.

## Item inventory
Table: item | status | commitment evidence | sponsor | size | provisional class | unknowns.

## Questions to answer
Bullets grouped by item or theme.

## Who to talk to
Table: person or group | why | what to ask.

## First 30 days
Week-by-week bullets.

## What not to do yet
Bullets.
</output_format>
