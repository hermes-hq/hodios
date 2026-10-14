---
schema: 1
id: move-client-from-hourly-to-fixed-price
kind: prompt
title: Move a client from hourly to fixed or retainer pricing
description: Plans moving one existing freelance client from hourly billing to project or monthly retainer pricing, with the maths from past invoices, scope limits, the conversation and the written offer.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, dataset]
output: [plan, table, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [fixed-price, value-pricing, pricing-model, billing-change, client-conversation]
pairs_with:
  prompts: [price-services, pitch-retainer-to-client, prepare-price-increase-conversation, write-statement-of-work]
  personas: [freelance-business-advisor]
args:
  - name: history
    description: The client's billing history - hours and invoices per month or per project for the last 6 to 12 months - and the kinds of work you do for them.
    type: text
    required: true
  - name: goals
    description: Why you want to change (unpredictable income, being punished for working faster, time tracking disputes), your hourly rate, and the minimum you would accept per month or project.
    type: text
    required: true
  - name: client_context
    description: How the client buys (budget cycles, purchase orders), how they feel about your invoices today, and how important they are to your income. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Usage analysis, Proposed model, Scope and limits, Conversation plan, Written offer, Risks and fallbacks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help freelancers change how they bill an existing client, the way an experienced independent consultant does. What they know: hourly billing caps income at hours worked and penalises getting faster, while clients often prefer fixed prices because they can budget; a fixed or retainer price must be built from real history (average, spread, peaks) plus a margin for risk, not from today's hourly rate times a guess; the scope has to be defined by outputs or a work allowance, with what is excluded, how overflow is handled, whether unused time rolls over (usually not, or capped) and a review date; clients accept the change when it is framed around their benefit (predictable costs, no invoice surprises, priority access) and when a short trial lowers the risk; and a client whose work is very irregular may be better served by fixed prices per project than by a monthly retainer.

<history>
{{history}}
</history>

<goals>
{{goals}}
</goals>
{{#client_context}}
<client_context>
{{client_context}}
</client_context>
{{/client_context}}
</context>

<task>
1. Usage analysis: from the history, compute monthly average, minimum, maximum and the spread of hours and billing, and identify recurring versus one-off work. Show the arithmetic. If the history is too short or irregular, say so.
2. Proposed model: recommend a monthly retainer, fixed price per project or deliverable, or a hybrid, with the reason, and set the price from the analysis plus a stated margin. Compare the client's likely cost and your income with the hourly model in a typical, quiet and busy month.
3. Scope and limits: what is included (outputs or an hours allowance), exclusions, overflow handling and rate, rollover rule, response times, minimum term and notice, and a review after three months.
4. Conversation plan: when to raise it, the opening framed around the client's benefit, answers to likely objections ("will we pay for hours we don't use?", "what if we need more?"), and a trial offer.
5. Written offer: a short email or one-page offer with the model, price, scope, start date and review.
6. Risks and fallbacks: what to do if the client says no (stay hourly with a minimum, a pre-paid block of hours), and the risk of underpricing.
</task>

<constraints>
- Use only the billing figures given; never invent history, market rates or client opinions. Show calculations.
- Do not set a price below the user's stated minimum.
- No pressure tactics or false claims about other clients.
{{> output/uncertainty}}
</constraints>

<output_format>
## Usage analysis
Table: Period | Hours | Billed. Then summary figures.
## Proposed model
Table: Month type | Client cost hourly | Client cost new | Your income new.
## Scope and limits
## Conversation plan
## Written offer
Ready to send.
## Risks and fallbacks
</output_format>
