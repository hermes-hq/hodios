---
schema: 1
id: prune-team-backlog
kind: prompt
title: Prune a team backlog
description: Cleans an overgrown engineering backlog into close, merge, keep and needs-owner groups with reasons, drafts closing notes, and sets rules that stop it growing back.
category: planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [engineering-manager, tech-lead, product-manager]
stack: []
requires: [none]
inputs: [ticket, text, dataset]
output: [table, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [backlog-grooming, ticket-hygiene, stale-tickets, duplicates]
pairs_with:
  prompts: [refine-backlog-ticket, size-backlog-items, plan-sprint]
args:
  - name: tickets
    description: An export or list of backlog tickets with id, title, age, last update, type and any labels or votes.
    type: text
    required: true
  - name: team_focus
    description: What the team owns and is aiming for in the next six months, so out-of-scope tickets can be spotted.
    type: text
  - name: stale_after_months
    description: Age in months after which an untouched ticket counts as stale.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Summary, Close, Merge, Move or needs owner, Keep, Closing notes, Rules going forward]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A backlog of hundreds of tickets is not a plan; it is a pile of guilt that hides the few items that matter. Teams keep tickets "in case", but anything untouched for many months is very unlikely to be done, and an important problem will be reported again. Pruning well means closing with a kind, specific note rather than silently, merging duplicates into the clearest ticket, moving work that belongs to another team, and keeping only what the team would realistically consider in the next planning cycles. Some old tickets must stay regardless: security issues, data-loss bugs and legal or accessibility obligations need an explicit decision, not an automatic close.
</context>

<task>
<tickets>
{{tickets}}
</tickets>
{{#team_focus}}
Team focus: {{team_focus}}
{{/team_focus}}
Stale after: {{stale_after_months}} months without updates.

1. Give a summary: counts by type and age, and the share that is stale.
2. Propose tickets to close: stale with no recent votes or links, already fixed, obsolete after product changes, or vague with no reporter response. Give the reason per ticket.
3. Find duplicates and near-duplicates, and propose which ticket to keep as the main one.
4. List tickets that belong to another team or have no clear owner, with the suggested destination.
5. List what to keep, grouped by theme, and flag any that are old but must not be closed (security, data loss, legal, accessibility), with the decision they need.
6. Draft short closing notes: one general template and variants for duplicate, obsolete and won't-do, each inviting the reporter to reopen with new information.
7. Propose rules to keep the backlog healthy: a size cap, a regular pruning slot, an auto-stale policy and what new tickets need to be accepted.
</task>

<constraints>
- Never propose closing security, data-loss, legal or accessibility tickets automatically; flag them.
- Base every decision on the ticket data given; when a ticket is ambiguous, put it under "needs owner" rather than guessing.
- The output is a proposal for the team to review, not a bulk action.
- Closing notes must be polite and specific, never dismissive.
</constraints>

<output_format>
## Summary
Counts and stale share.
## Close
Table: ticket | reason.
## Merge
Table: keep | merge into it | reason.
## Move or needs owner
Table: ticket | suggested owner | reason.
## Keep
Grouped bullets, with flagged items and their decision needed.
## Closing notes
Templates.
## Rules going forward
Bullets.
</output_format>
