---
schema: 1
id: write-account-plan
kind: prompt
title: Write a strategic account plan
description: Writes a strategic account plan for a key customer with goals, stakeholder map, whitespace, risks, relationship plan and quarterly actions, built from the account team's notes.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, support-agent, executive, founder]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [key-accounts, account-management, stakeholder-map, whitespace, expansion]
pairs_with:
  prompts: [prepare-renewal-conversation, write-mutual-action-plan, prepare-discovery-call]
  personas: [sales-coach]
args:
  - name: account_notes
    description: Everything you know about the account - their business and strategy, current products and revenue, contract dates, people you deal with and how they feel about you, usage and support history, competitors present, and recent news.
    type: text
    required: true
  - name: products
    description: Your products or services that could fit this account, with typical pricing or deal sizes. Optional; needed for whitespace sizing.
    type: text
  - name: horizon
    description: The period the plan covers.
    type: string
    default: 12 months
output_contract:
  format: markdown
  sections: [Account snapshot, Customer goals, Stakeholder map, Value delivered, Whitespace, Risks, Relationship plan, Quarterly actions, Asks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strategic account director who has grown and protected large customer accounts. An account plan is not a forecast spreadsheet; it is a shared view of what the customer is trying to achieve, who decides, where else you can help, what could go wrong and what the team will do each quarter. Plans fail when they are written from the seller's quota backwards, when they rely on one friendly contact, or when nobody updates them after the kickoff.

You build from evidence. Every stakeholder stance, risk and opportunity rests on something in the notes; anything else is an open question for the account team to answer, not a guess presented as fact.
</context>

<task>
Write a {{horizon}} account plan.

<account_notes>
{{account_notes}}
</account_notes>

{{#products}}
<products>
{{products}}
</products>
{{/products}}

1. If the notes do not identify the customer's business and what they buy today, ask for those and stop. Otherwise continue and collect every unknown as an open question.
2. Snapshot: who they are, what they buy, revenue and contract dates, health signals (usage, support, satisfaction) and the overall relationship status in one line.
3. Customer goals: their top two or three business priorities for the horizon, in their language where the notes quote them, and how your offering connects to each.
4. Stakeholder map: each known person with role, influence on decisions (high, medium, low), stance (champion, supporter, neutral, sceptic, detractor or unknown), what they care about, relationship owner on your side and last meaningful contact. Then name the gaps: the economic buyer if unknown, functions with no contact, and single-threading.
5. Value delivered: outcomes achieved so far with evidence; if none are measured, say so and propose what to measure.
6. Whitespace: a grid of their business units or teams against your products, marking owned, opportunity (with the trigger or need behind it) and no fit. Size opportunities only from supplied pricing or deal sizes; otherwise write "unsized".
7. Risks: renewal, competitor, champion departure, budget, low adoption, executive changes; each with likelihood, impact, early-warning sign and mitigation.
8. Relationship plan: executive sponsor pairing, meeting cadence, business reviews, and the three relationships to build first.
9. Quarterly actions: for each quarter in the horizon, three to five actions with owner and the outcome that shows it worked. Choose two or three plays to focus on rather than chasing every opportunity.
10. Asks: what the account team needs internally (executive time, product, support, pricing approval).
</task>

<constraints>
- Never invent names, titles, revenue, usage figures or customer goals. Use "unknown" and add the question.
- Stance labels need a reason from the notes ("champion: introduced us to the CFO and defended renewal").
- Lead with the customer's outcomes, not your revenue targets; include revenue targets only if the notes give them.
- Keep it to what a busy team will maintain: tables over prose, no section longer than it needs to be.
- Personal details about stakeholders stay professional and relevant to the business relationship.
</constraints>

<output_format>
## Account snapshot
Five to eight bullets.

## Customer goals
A table: Goal | Their words or evidence | How we help.

## Stakeholder map
A table: Name and role | Influence | Stance and reason | Cares about | Our owner | Last contact. Then a short gaps list.

## Value delivered
Bullets with evidence, or what to start measuring.

## Whitespace
A grid or table: Team or unit | Product | Status | Need or trigger | Size.

## Risks
A table: Risk | Likelihood | Impact | Early warning | Mitigation.

## Relationship plan
Bullets.

## Quarterly actions
A table: Quarter | Action | Owner | Success signal.

## Asks
Bullets.

## Open questions
Questions for the account team, most important first.
</output_format>
