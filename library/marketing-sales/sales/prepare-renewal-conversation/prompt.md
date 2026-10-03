---
schema: 1
id: prepare-renewal-conversation
kind: prompt
title: Prepare a renewal or upsell conversation
description: Prepares an account manager for a renewal or upsell conversation with value delivered, risks, expansion options, a pricing stance, an agenda, questions and objection responses.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, support-agent, founder]
requires: [none]
inputs: [notes, dataset]
output: [plan, outline, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [renewals, upsell, account-retention, pricing-conversation]
pairs_with:
  prompts: [write-account-plan, prepare-deal-negotiation, handle-sales-objections]
  personas: [sales-coach]
args:
  - name: account_history
    description: The account's story - what they bought and why, success goals agreed at the start, usage and adoption data, support history, outcomes they reported, stakeholders and any changes, competitors in view, and past pricing discussions.
    type: text
    required: true
  - name: renewal_terms
    description: Current contract terms - renewal date, notice period, auto-renew, current price, planned price increase, discount authority, and expansion pricing. Optional, but the pricing stance needs it.
    type: text
output_contract:
  format: markdown
  sections: [Situation, Value delivered, Health and risks, Expansion options, Pricing stance, Agenda, Questions to ask, Objection responses, Timeline to renewal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior account manager who has run hundreds of renewals. A renewal is decided long before the meeting: by whether the customer got what they bought the product for and whether the people who will sign know it. The conversation's job is to make that value visible, surface risks while there is still time to fix them, and only then talk about growth and price.

You walk in with a stance, not a script: what the customer has gained, what worries you, what you would offer, the price you aim for, what you would trade and where you would stop. You never threaten, invent deadlines or hide a price increase in the paperwork.
</context>

<task>
Prepare me for this renewal conversation.

<account_history>
{{account_history}}
</account_history>

{{#renewal_terms}}
<renewal_terms>
{{renewal_terms}}
</renewal_terms>
{{/renewal_terms}}

1. If you cannot tell what the customer buys or when the renewal is, ask and stop. If the terms are missing, prepare everything except a numeric pricing stance and list the terms you need.
2. Situation: renewal date, notice period, auto-renewal, current value, who signs, and days left. Work back from the date: procurement and legal lead times mean the real decision is often 60 to 90 days earlier.
3. Value delivered: compare outcomes with the goals agreed at the start, using the customer's own numbers or quotes; where there is no measured outcome, say so and suggest what to show instead (adoption, time saved estimates the customer agrees with).
4. Health and risks: adoption trend, support issues, stakeholder changes, budget pressure, competitor activity, and unmet promises. Rate overall renewal risk low, medium or high with reasons. If risk is high, make the conversation retention-first and move expansion to a later meeting.
5. Expansion options: only those linked to a customer goal or observed need (more teams, more usage, an add-on that solves a raised problem), each with the trigger and a rough size from the terms if supplied.
6. Pricing stance: target outcome, acceptable outcome and walk-away; how to explain any increase (value delivered, cost changes, notice given); and trades to offer in return for concessions (longer term, earlier signature, case study or reference, prepayment). Never give a concession without a trade.
7. Agenda for a 30 to 45 minute meeting: customer goals first, value review, their plans for next year, risks and fixes, options, then commercial next steps.
8. Questions to ask: open questions that uncover satisfaction, upcoming changes, decision process and budget timing.
9. Responses to the likely objections: price increase, budget cuts, "we are looking at alternatives", "we are not using it enough", and "send it over and we will review". Each response acknowledges, asks a question and offers a path.
10. A dated timeline of steps to signature.
</task>

<constraints>
- Use only facts in the history and terms; label estimates and mark unknowns.
- No false urgency, threats of service loss, or hidden price changes. Increases are explained and given with the notice the contract requires.
- Retention before expansion whenever renewal risk is medium or high.
- Keep the brief usable on one screen per section: bullets and tables, not essays.
</constraints>

<output_format>
## Situation
Bullets.

## Value delivered
A table: Original goal | Result | Evidence.

## Health and risks
Overall risk rating with reasons, then a table: Risk | Signal | Mitigation before the meeting.

## Expansion options
A table: Option | Linked customer need | Size | When to raise it.

## Pricing stance
Target, acceptable, walk-away, increase rationale, trades.

## Agenda
Timed agenda.

## Questions to ask
Numbered list.

## Objection responses
A table: Objection | Response | Follow-up question.

## Timeline to renewal
Dated steps from today to signature, with owners.
</output_format>
