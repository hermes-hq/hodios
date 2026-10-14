---
schema: 1
id: handle-sponsor-revision-dispute
kind: prompt
title: Handle a sponsor revision dispute
description: Handles a sponsor asking for changes beyond the brief - extra revision rounds, reshoots, new claims, or withheld payment - by checking the agreement, setting options and writing the reply.
category: creator-business
version: 1.0.0
status: incubating
stage: [operate]
role: [content-creator]
inputs: [message, document, notes]
output: [plan, message, checklist]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sponsor-revisions, scope-creep, creative-approval, payment-withheld, brand-relations]
pairs_with:
  prompts: [build-creator-rate-card, review-sponsorship-contract]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: dispute
    description: "What the brand is asking for now and how, and what has happened so far (drafts sent, feedback rounds, dates)."
    type: text
    required: true
  - name: agreement
    description: "What the brief and agreement say about deliverables, revision rounds, approval, deadlines, payment and kill fees (paste relevant clauses), and your country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the agreement says, In scope or not, Options, Reply, Paper trail, If payment is withheld]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Revision disputes are one of the most common ways a sponsorship goes wrong. They usually start with a vague brief, approval rights without a revision limit, or a new person at the brand who wants something different. Experienced creators compare each new request to the written brief and agreement: changes that correct a factual error or a missed requirement are in scope; a new concept, new talking points, new claims, more deliverables, extra rounds beyond the agreed number, or a reshoot because the brand changed its mind are out of scope and can be priced. They answer in writing, calmly, separating what they will fix at no cost from what is a change order, and they never add claims they cannot stand behind to get paid. If the agreement is silent, the conversation becomes a negotiation, not a breach. Payment withheld for content that met the brief is a contract issue; documented dates and drafts matter, and serious amounts may need a lawyer or a creators' association.
</context>

<task>
<dispute>
{{dispute}}
</dispute>

<agreement>
{{agreement}}
</agreement>

1. **What the agreement says:** the relevant terms in plain words (deliverables, rounds, approval, deadlines, payment, kill fee), and where it is silent.
2. **In scope or not:** a table of each requested change, in or out of scope under those terms, and why.
3. **Options:** fix in-scope items, price out-of-scope changes as a change order, offer a compromise, or decline; with the trade-off of each for the relationship and payment.
4. **Reply:** a calm reply that agrees to in-scope fixes with a date, prices or declines the rest, refuses any new claim the creator cannot back, and confirms payment timing.
5. **Paper trail:** what to keep (brief, drafts with dates, feedback, approvals) and moving key decisions from calls or DMs into email.
6. **If payment is withheld:** steps in order: a written reminder citing the delivery and terms, a firm notice, and when to seek a lawyer, a creators' association or small claims, noting that options differ by country.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give a legal opinion on breach; describe what the terms say and when to get advice.
- Never suggest adding claims the creator cannot back to resolve the dispute.
- Base every scope judgement on the terms they pasted; mark gaps instead of assuming.
- Keep the reply professional and short; no threats unless the step plan calls for a formal notice.
</constraints>

<output_format>
## What the agreement says
## In scope or not
Table: request | in scope? | reason.

## Options
## Reply
## Paper trail
Checkbox list.

## If payment is withheld
Numbered steps.
</output_format>
