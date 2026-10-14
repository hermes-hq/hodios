---
schema: 1
id: plan-end-of-quarter-deal-push
kind: prompt
title: Plan the end-of-quarter deal push
description: Plans the final weeks of a sales quarter - which deals can really close, the actions, signatures and approvals each needs, discount guardrails and a daily close plan.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, manager, founder]
requires: [none]
inputs: [dataset, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [quarter-end, deal-closing, close-plan, discount-guardrails, sales-forecast]
pairs_with:
  prompts: [review-sales-pipeline, write-mutual-action-plan, calculate-discount-break-even, navigate-procurement-process]
args:
  - name: deals
    description: The open deals you hope to close this quarter - account, value, stage, next step and date, who has to sign, what is outstanding (legal, security review, procurement, budget), and the buyer's own deadline if any.
    type: text
    required: true
  - name: target
    description: Your quota or target, what is already closed, the quarter-end date, and today's date.
    type: text
    required: true
  - name: rules
    description: Optional. Discount limits and who approves more, approval turnaround times, standard terms you can and cannot change, and any company rules on incentives.
    type: text
output_contract:
  format: markdown
  sections: [Where you stand, Deal triage, Close plan per deal, Daily rhythm, Discount and concession guardrails, Risks to the next quarter]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a seller or sales leader plan the last weeks of a quarter. Quarter-end plans go wrong in familiar ways: effort spread across every open deal instead of the few that can truly sign; deals counted as closable when the buyer has no reason to sign this quarter; paperwork steps (legal redlines, security questionnaires, procurement onboarding, signature routing, purchase orders) that take longer than the days left; discounts offered without a trade, which teaches buyers to wait for the next quarter end; and deals pulled forward by over-discounting that leave the next quarter empty. A deal that can close has a confirmed buyer reason to act by a date, a known signer and process, and outstanding steps that fit in the time left. The best quarter-end tactic is usually a shared close plan with the buyer listing each remaining step, owner and date, plus internal approvals lined up in advance. Concessions, if any, should be traded for something the seller values (signature by a date, longer term, case study, upfront payment).
</context>

<task>
Deals:

<deals>
{{deals}}
</deals>

Target and dates:

<target>
{{target}}
</target>

{{#rules}}
Rules:

<rules>
{{rules}}
</rules>
{{/rules}}

1. Show where the seller stands: target, closed, gap, working days left, and the total of deals by triage group.
2. Triage every deal into commit (can close with normal effort), push (can close only with specific actions), and next quarter (cannot realistically close), each with the evidence and the missing proof. Flag any deal where the buyer has no reason to sign by quarter end.
3. For each commit and push deal, write a close plan: remaining steps on both sides with owner and date, the signer and signing method, internal approvals to request now, and the single question to ask the buyer this week to confirm timing.
4. Give a daily rhythm for the remaining days: which deals to touch, internal reviews, approval deadlines, and a cut-off date after which a deal moves to next quarter.
5. Set discount and concession guardrails: what can be offered within rules, what each concession must be traded for, and the walk-away; note the effect of each discount on margin if figures are given.
6. List risks to the next quarter: pulled-forward deals, discount precedent, and the follow-up for deals that slip.
</task>

<constraints>
- Use only the deals and facts given; never invent buyer statements, signers or dates. Put unknowns in [brackets].
- Be honest about the gap: if the target is out of reach with realistic deals, say so and show the best realistic outcome.
- Do not recommend misleading buyers about price rises, expiring offers or availability, or booking deals that are not signed.
- Respect the stated discount limits and approval rules.
</constraints>

<output_format>
## Where you stand
Short table: Target | Closed | Gap | Days left | Commit total | Push total.

## Deal triage
Table: Deal | Value | Group | Evidence | Missing proof.

## Close plan per deal
A short block per deal: steps with owner and date, signer, approvals, question to ask.

## Daily rhythm
Day-by-day bullets until quarter end.

## Discount and concession guardrails
Table: Concession | Allowed? | Trade for | Margin effect.

## Risks to the next quarter
Bullets.
</output_format>
