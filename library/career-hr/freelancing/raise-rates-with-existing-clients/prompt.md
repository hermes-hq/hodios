---
schema: 1
id: raise-rates-with-existing-clients
kind: prompt
title: Raise your rates with existing clients
description: Plans a freelance rate increase across current clients - who gets what new rate and when, grandfathering choices, the notice message per client and replies to pushback.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [consultant, designer, writer, copywriter]
requires: [none]
inputs: [text, preferences]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [rate-increase, client-retention, notice-period, client-communication]
pairs_with:
  prompts: [price-services, pitch-retainer-to-client, respond-to-discount-request]
args:
  - name: clients
    description: Each current client with what you do for them, current rate or fee, how long you have worked together, share of your income, how much you like the work, and any contract notice terms. Names can be letters.
    type: text
    required: true
  - name: new_rate_and_reason
    description: The rate you want to move to (or a range), why now (demand, experience, costs, new skills), and when you want it in effect.
    type: text
    required: true
  - name: risk_appetite
    description: How many clients you could afford to lose, for example "none", "one small one", "happy to lose the bottom two".
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Rate plan, Risk check, Messages, Pushback replies, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer raise rates with the clients they already have, which is harder than pricing new work because the relationship and the old number are both on the table. What experienced freelancers know: most clients accept a reasonable, well-announced increase; the ones who leave are usually the lowest-paying and most demanding; a rise sent with 30 to 60 days' notice and a clear effective date lands better than one sprung on the next invoice; you never apologise for or over-justify the number; and contract terms (fixed-price projects in flight, notice clauses, annual review dates) must be respected. Not every client needs the same treatment: a loved long-term anchor client might get a smaller step or a later date, a client below your floor might get the full rise or a polite exit.

Client loss tolerance: {{risk_appetite}}
</context>

<task>
<clients>
{{clients}}
</clients>

<new_rate>
{{new_rate_and_reason}}
</new_rate>

1. Sort clients into tiers: below your floor, core, anchor (large share of income or strategic). Note any contract terms or work in progress that limit when a change can apply. If key facts are missing (current rates, income share), ask before planning.
2. For each client propose the new rate or fee, the effective date, and whether to grandfather, phase (two steps) or apply in full. Explain the choice in one line.
3. Risk check: income if every client accepts, and if the clients most likely to leave do leave, against the stated tolerance. Use only the user's numbers; show the arithmetic.
4. Write the notice message for each tier in the freelancer's voice: short, warm, states the new rate and effective date, one sentence of reason at most, thanks them, and offers a call only if useful. No apology, no discount offer in the first message.
5. Write replies to the likely pushback: "we don't have budget", "can you hold it for six months", "we'll look elsewhere", and silence. Each reply offers a trade (less scope, longer commitment, a later date) rather than a straight climbdown.
6. Give a timeline: when to send each message, when to follow up, when the new rate first appears on an invoice.
</task>

<constraints>
- Do not invent market rates or claim what "the industry" charges. Use the freelancer's figures; if they want a benchmark, tell them where to look (peer surveys, professional bodies, asking peers).
- Do not break existing contract terms: projects already quoted at a fixed price stay at that price unless the contract allows a change.
- Messages must not threaten, guilt-trip or hint at reduced quality if the client says no.
- If the planned rise would cost more income than the stated tolerance allows, say so plainly and propose a slower path.
- Keep each message under 150 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rate plan
Table: client | tier | current | new | effective date | approach (full, phased, grandfathered) | reason.

## Risk check
Two scenarios with income figures and the arithmetic.

## Messages
One message per tier, ready to send, with [placeholders] for names.

## Pushback replies
Each objection with a short reply.

## Timeline
Dated or week-numbered list.
</output_format>
