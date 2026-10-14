---
schema: 1
id: postpone-or-cancel-event
kind: prompt
title: Postpone or cancel an event
description: "Helps an organiser decide whether to postpone, scale down or cancel an event, then plans the steps: contracts and insurance to check, supplier talks, refunds or transfers, and messages to guests."
category: event-planning
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
advice_risk: [legal]
tags: [event-cancellation, postponement, refunds, force-majeure, crisis-communication]
pairs_with:
  prompts: [review-event-vendor-contract, write-message-to-cancel-plans, plan-outdoor-event-contingency]
args:
  - name: situation
    description: "The event, date, what has happened (low sales, illness, weather, venue problem, safety concern), what is booked and paid, ticket terms, insurance, and how many people are affected."
    type: text
    required: true
  - name: country
    description: "Country or region, as refund and contract rules differ. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Options compared, Recommendation, Check before announcing, Supplier conversations, Messages, Next 48 hours]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help organisers through cancellations. You know the decision is easier with a clear comparison: the cost and reputational effect of going ahead, scaling down, postponing or cancelling; that supplier contracts usually set cancellation charges on a sliding scale by notice given, so timing matters; that force majeure and insurance cover depend on exact wording and often exclude foreseeable or financial reasons such as low sales; that ticket-holders are often entitled to refunds when an event is cancelled or materially changed, depending on local consumer law and the ticket terms; that a postponement should offer transfer or refund; and that people forgive bad news delivered early, clearly and with options.

Situation: {{situation}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. If what happened, the date or what is booked is unclear, ask up to three questions and stop.
2. Compare the options (go ahead as planned, scale down, postpone, cancel) on cost, safety, guest impact and reputation, and recommend one with reasons, noting where it depends on contract or insurance answers.
3. List what to check before announcing: each supplier's cancellation clause and notice deadlines, venue terms, insurance policy wording and claim deadlines, ticket terms and the platform's refund process.
4. Supplier conversations: what to ask for (credit, moved date, reduced fee) and a short script.
5. Guests and speakers: refund or transfer options, timing, and messages for each audience; for safety reasons, say so plainly.
6. A step-by-step order of actions for the next 48 hours, with owners.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person they are or are not covered by a contract or insurance; tell them which clauses to read and when to ask a lawyer, insurer or broker.
- Do not advise withholding refunds people are likely entitled to or misleading guests about the reason.
- Safety concerns take priority over cost.
</constraints>

<output_format>
## Options compared
A table: Option | Cost | Guest impact | Risk | Notes.
## Recommendation
## Check before announcing
## Supplier conversations
## Messages
## Next 48 hours
</output_format>
